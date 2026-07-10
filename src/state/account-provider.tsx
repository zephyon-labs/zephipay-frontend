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
  initialAccountState,
  type AccountState,
} from "@/types/account";

const STORAGE_KEY = "zephipay-account-state-v1";

type AccountContextValue = {
  account: AccountState;
  isReady: boolean;
  setAvailableBalance: (amount: number) => void;
  addFunds: (amount: number) => void;
  subtractFunds: (amount: number) => boolean;
  resetAccount: () => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

type AccountProviderProps = {
  children: ReactNode;
};

function normalizeAmount(amount: number): number {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.max(0, Math.round(amount * 100) / 100);
}

function createTimestamp(): string {
  return new Date().toISOString();
}

function normalizeStoredAccount(account: AccountState): AccountState {
  return {
    balances: {
      availableUsd: normalizeAmount(account.balances?.availableUsd ?? 0),
      usdc: normalizeAmount(account.balances?.usdc ?? 0),
      sol: normalizeAmount(account.balances?.sol ?? 0),
      zera:
        typeof account.balances?.zera === "number"
          ? normalizeAmount(account.balances.zera)
          : null,
    },
    dataSource: account.dataSource ?? "prototype",
    lastUpdatedAt: account.lastUpdatedAt ?? null,
  };
}

export function AccountProvider({ children }: AccountProviderProps) {
  const [account, setAccount] =
    useState<AccountState>(initialAccountState);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      try {
        const storedAccount =
          window.localStorage.getItem(STORAGE_KEY);

        if (storedAccount) {
          const parsedAccount = JSON.parse(
            storedAccount,
          ) as AccountState;

          setAccount(normalizeStoredAccount(parsedAccount));
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

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(account),
    );
  }, [account, isReady]);

  const value = useMemo<AccountContextValue>(
    () => ({
      account,
      isReady,

      setAvailableBalance(amount) {
        const normalizedAmount = normalizeAmount(amount);

        setAccount((current) => ({
          ...current,
          balances: {
            ...current.balances,
            availableUsd: normalizedAmount,
            usdc: normalizedAmount,
          },
          lastUpdatedAt: createTimestamp(),
        }));
      },

      addFunds(amount) {
        const normalizedAmount = normalizeAmount(amount);

        setAccount((current) => {
          const nextBalance = normalizeAmount(
            current.balances.availableUsd + normalizedAmount,
          );

          return {
            ...current,
            balances: {
              ...current.balances,
              availableUsd: nextBalance,
              usdc: nextBalance,
            },
            lastUpdatedAt: createTimestamp(),
          };
        });
      },

      subtractFunds(amount) {
        const normalizedAmount = normalizeAmount(amount);

        if (normalizedAmount > account.balances.availableUsd) {
          return false;
        }

        setAccount((current) => {
          const nextBalance = normalizeAmount(
            current.balances.availableUsd - normalizedAmount,
          );

          return {
            ...current,
            balances: {
              ...current.balances,
              availableUsd: nextBalance,
              usdc: nextBalance,
            },
            lastUpdatedAt: createTimestamp(),
          };
        });

        return true;
      },

      resetAccount() {
        setAccount(initialAccountState);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [account, isReady],
  );

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextValue {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error(
      "useAccount must be used inside AccountProvider.",
    );
  }

  return context;
}