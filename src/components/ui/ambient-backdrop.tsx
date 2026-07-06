import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AmbientPhase } from "@/types/ambient";

type AmbientBackdropProps = {
  phase: AmbientPhase;
  children: ReactNode;
  className?: string;
};

const phaseStyles: Record<
  AmbientPhase,
  {
    background: string;
    glow: string;
  }
> = {
  morning: {
    background:
      "bg-[radial-gradient(circle_at_top,#3b82f622_0%,transparent_45%),#05070a]",
    glow: "from-amber-300/15 via-cyan-300/10 to-transparent",
  },

  day: {
    background:
      "bg-[radial-gradient(circle_at_top,#60a5fa18_0%,transparent_40%),#05070a]",
    glow: "from-cyan-200/10 via-transparent to-transparent",
  },

  evening: {
    background:
      "bg-[radial-gradient(circle_at_top,#fb923c18_0%,transparent_42%),#05070a]",
    glow: "from-orange-300/15 via-cyan-300/8 to-transparent",
  },

  night: {
    background:
      "bg-[radial-gradient(circle_at_top,#22d3ee20_0%,transparent_45%),#05070a]",
    glow: "from-cyan-400/20 via-blue-400/8 to-transparent",
  },
};

export function AmbientBackdrop({
  phase,
  children,
  className,
}: AmbientBackdropProps) {
  const style = phaseStyles[phase];

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden",
        style.background,
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-b",
          style.glow,
        )}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}