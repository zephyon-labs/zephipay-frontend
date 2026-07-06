import { cn } from "@/lib/utils";

type BalanceCardProps = {
  label?: string;
  amount: string;
  sublabel?: string;
  className?: string;
};

export function BalanceCard({
  label = "Available Today",
  amount,
  sublabel = "Ready to send, spend, or save.",
  className,
}: BalanceCardProps) {
  return (
    <section
      className={cn(
        "rounded-[30px] border border-white/8 bg-white/[0.035] p-6",
        "shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
        className,
      )}
    >
      <p className="text-sm font-medium text-zp-muted">{label}</p>

      <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-zp-text">
        {amount}
      </p>

      <p className="mt-3 text-sm text-zp-subtle">{sublabel}</p>
    </section>
  );
}