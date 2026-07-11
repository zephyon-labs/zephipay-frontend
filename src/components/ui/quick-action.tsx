import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickActionProps = {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
};

export function QuickAction({
  label,
  icon: Icon,
  onClick,
  className,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group flex flex-col items-center justify-center gap-3",
        "rounded-[24px]",
        "border border-white/8",
        "bg-white/[0.035]",
        "p-5",
        "backdrop-blur-xl",
        "transition-all duration-300",
        "hover:border-zp-cyan/40",
        "hover:bg-white/[0.05]",
        className,
      )}
    >
      <Icon
        size={24}
        className="text-zp-cyan transition-transform duration-300 group-hover:scale-110"
      />

      <span className="text-sm font-medium text-zp-text">
        {label}
      </span>
    </button>
  );
}
