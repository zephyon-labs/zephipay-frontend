import { AppShell } from "@/components/ui/app-shell";
import { BalanceCard } from "@/components/ui/balance-card";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { WalletCards } from "lucide-react";

export default function WalletPage() {
  return (
    <AppShell>
      <section className="flex flex-1 flex-col gap-5 pb-4 pt-1">
        <header>
          <p className="text-sm font-medium text-zp-cyan/80">ZephiPay</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.055em] text-zp-text">
            Wallet
          </h1>
          <p className="mt-2 text-sm text-zp-subtle">
            Your assets, ready when you are.
          </p>
        </header>

        <BalanceCard
          label="Available Today"
          amount="$482.14"
          sublabel="Ready to send, spend, or save."
        />

        <section className="rounded-[30px] border border-white/8 bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
              <WalletCards size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-zp-text">Assets</h2>
              <p className="mt-1 text-xs text-zp-subtle">
                Stablecoins, SOL, and future ZERA support.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <AssetRow name="USDC" value="$482.14" detail="Available" />
            <AssetRow name="SOL" value="1.84 SOL" detail="Devnet balance" />
            <AssetRow name="ZERA" value="Coming Soon" detail="Protocol utility" />
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
        <p className="text-sm font-semibold text-zp-text">{name}</p>
        <p className="mt-1 text-xs text-zp-subtle">{detail}</p>
      </div>

      <p className="text-sm font-semibold text-zp-text">{value}</p>
    </div>
  );
}