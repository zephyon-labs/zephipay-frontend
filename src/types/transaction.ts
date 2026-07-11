
export type TransactionStatus =
  | "draft"
  | "processing"
  | "confirmed"
  | "failed";

export type TransactionDirection = "sent" | "received";

export type TransactionRail =
  | "prototype"
  | "solana-devnet"
  | "solana-testnet"
  | "solana-mainnet";

export type PaymentReceipt = {
  id: string;
  receiptAddress: string | null;
  transactionSignature: string | null;
  createdAt: string;
};

export type Transaction = {
  id: string;
  recipient: string;
  amountUsd: number;
  purpose: string;
  direction: TransactionDirection;
  status: TransactionStatus;
  rail: TransactionRail;
  createdAt: string;
  completedAt: string | null;
  receipt: PaymentReceipt | null;
};

export type CompletedTransactionInput = {
  recipient: string;
  amountUsd: number;
  purpose: string;
  receiptAddress?: string | null;
  transactionSignature?: string | null;
  rail?: TransactionRail;
};

export type TransactionState = {
  transactions: Transaction[];
  activeTransactionId: string | null;
};

export const initialTransactionState: TransactionState = {
  transactions: [],
  activeTransactionId: null,
};
