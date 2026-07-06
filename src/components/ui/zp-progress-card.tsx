import { cn } from "@/lib/utils";

type ZpProgressCardProps = {
  level: number;
  title: string;
  points: string;
  progress: number;
  nextLevelText: string;
  className?: string;
};

export function ZpProgressCard({
  level,
  title,
  points,
  progress,
  nextLevelText,
  className,
}: ZpProgressCardProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <section
      className={cn(
        "rounded-[30px] border border-zp-cyan/15 bg-white/[0.035] p-5",
        "shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-medium text-zp-text">
          Level {level} <span className="text-zp-cyan">• {title}</span>
        </p>
        <p className="text-zp-muted">{points} ZP</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-zp-cyan shadow-[0_0_22px_rgba(99,230,255,0.68)]"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-zp-subtle">{nextLevelText}</p>
    </section>
  );
}