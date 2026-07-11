"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialTransactionState,
  type CompletedTransactionInput,
  type Transaction,
  type TransactionState,
} from "@/types/transaction";

const STORAGE_KEY = "zephipay-transaction-state-v1";

type TransactionContextValue = {
  transactions: Transaction[];
  activeTransaction: Transaction | null;
  isReady: boolean;
  recordCompletedTransaction: (
    input: CompletedTransactionInput,
  ) => Transaction;
  resetTransactions: () => void;
};

const TransactionContext =
  createContext<TransactionContextValue | null>(null);

type TransactionProviderProps = {
  children: ReactNode;
};

function normalizeAmount(amount: number): number {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.max(0, Math.round(amount * 100) / 100);
}

function createId(prefix: string): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function normalizeStoredState(
  state: TransactionState,
): TransactionState {
  const transactions = Array.isArray(state.transactions)
    ? state.transactions.filter(
        (transaction): transaction is Transaction =>
          Boolean(
            transaction &&
              typeof transaction.id === "string" &&
              typeof transaction.recipient === "string" &&
              typeof transaction.amountUsd === "number",
          ),
      )
    : [];

  return {
    transactions,
    activeTransactionId:
      typeof state.activeTransactionId === "string"
        ? state.activeTransactionId
        : null,
  };
}

export function TransactionProvider({
  children,
}: TransactionProviderProps) {
  const [state, setState] = useState<TransactionState>(
    initialTransactionState,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      try {
        const storedState =
          window.localStorage.getItem(STORAGE_KEY);

        if (storedState) {
          const parsedState = JSON.parse(
            storedState,
          ) as TransactionState;

          setState(normalizeStoredState(parsedState));
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
  if (!isReady) {
    return;
  }

  const isEmpty =
    state.transactions.length === 0 &&
    state.activeTransactionId === null;

  if (isEmpty) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state),
  );
}, [state, isReady]);

  const value = useMemo<TransactionContextValue>(() => {
    const activeTransaction =
      state.transactions.find(
        (transaction) =>
          transaction.id === state.activeTransactionId,
      ) ?? null;

    return {
      transactions: state.transactions,
      activeTransaction,
      isReady,

      recordCompletedTransaction(input) {
        const timestamp = new Date().toISOString();
        const transactionId = createId("txn");
        const receiptId = createId("receipt");

        const transaction: Transaction = {
          id: transactionId,
          recipient: input.recipient.trim(),
          amountUsd: normalizeAmount(input.amountUsd),
          purpose: input.purpose.trim() || "General",
          direction: "sent",
          status: "confirmed",
          rail: input.rail ?? "solana-devnet",
          createdAt: timestamp,
          completedAt: timestamp,
          receipt: {
            id: receiptId,
            receiptAddress:
              input.receiptAddress?.trim() || null,
            transactionSignature:
              input.transactionSignature?.trim() || null,
            createdAt: timestamp,
          },
        };

        setState((current) => ({
          transactions: [
            transaction,
            ...current.transactions,
          ].slice(0, 100),
          activeTransactionId: transaction.id,
        }));

        return transaction;
      },

      resetTransactions() {
        setState(initialTransactionState);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    };
  }, [state, isReady]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions(): TransactionContextValue {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider.",
    );
  }

  return context;
}
