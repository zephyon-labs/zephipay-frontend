"use client";

import { WalletCards } from "lucide-react";
import { AppShell } from "@/components/ui/app-shell";
import { BalanceCard } from "@/components/ui/balance-card";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { useAccount } from "@/state/account-provider";

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function WalletPage() {
  const { account, isReady } = useAccount();

  const availableBalance = isReady
    ? formatUsd(account.balances.availableUsd)
    : "$0.00";

  return (
    <AppShell>
      <section className="flex flex-1 flex-col gap-5 pb-4 pt-1">
        <header>
          <p className="text-sm font-medium text-zp-cyan/80">
            ZephiPay
          </p>

          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.055em] text-zp-text">
            Wallet
          </h1>

          <p className="mt-2 text-sm text-zp-subtle">
            Your assets, ready when you are.
          </p>
        </header>

        <BalanceCard
          label="Available Today"
          amount={availableBalance}
          sublabel="Account ready for testing."
        />

        <section className="rounded-[30px] border border-white/8 bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
              <WalletCards size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-zp-text">
                Assets
              </h2>

              <p className="mt-1 text-xs text-zp-subtle">
                Balances for the active account.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <AssetRow
              name="USDC"
              value={formatUsd(account.balances.usdc)}
              detail="Available"
            />

            <AssetRow
              name="SOL"
              value={`${account.balances.sol.toFixed(2)} SOL`}
              detail="Devnet balance"
            />

            <AssetRow
              name="ZERA"
              value={
                account.balances.zera === null
                  ? "Coming Soon"
                  : account.balances.zera.toLocaleString()
              }
              detail="Protocol utility"
            />
          </div>
        </section>

        <BottomNavigation />
      </section>
    </AppShell>
  );
}

function AssetRow({
  name,
  value,
  detail,
}: {
  name: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] p-4">
      <div>
        <p className="text-sm font-semibold text-zp-text">
          {name}
        </p>

        <p className="mt-1 text-xs text-zp-subtle">
          {detail}
        </p>
      </div>

      <p className="text-sm font-semibold text-zp-text">
        {value}
      </p>
    </div>
  );
}