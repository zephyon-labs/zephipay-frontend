export type AccountDataSource =
  | "prototype"
  | "devnet"
  | "testnet"
  | "mainnet";

export type AccountBalances = {
  availableUsd: number;
  usdc: number;
  sol: number;
  zera: number | null;
};

export type AccountState = {
  balances: AccountBalances;
  dataSource: AccountDataSource;
  lastUpdatedAt: string | null;
};

export const initialAccountState: AccountState = {
  balances: {
    availableUsd: 0,
    usdc: 0,
    sol: 0,
    zera: null,
  },
  dataSource: "prototype",
  lastUpdatedAt: null,
};