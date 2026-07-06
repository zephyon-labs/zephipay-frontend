import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

type HomeHeaderProps = {
  name: string;
  greeting?: string;
  onProfileClick?: () => void;
  className?: string;
};

export function HomeHeader({
  name,
  greeting = "Good evening,",
  onProfileClick,
  className,
}: HomeHeaderProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={cn(
        "flex items-start justify-between gap-4",
        className
      )}
    >
      <div>
        <p className="text-sm font-medium text-zp-cyan/80">
          {greeting}
        </p>

        <h1 className="mt-1 text-4xl font-semibold tracking-[-0.055em] text-zp-text">
          {name}
        </h1>

        <p className="mt-2 text-sm text-zp-subtle">
          Everything looks good.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className={cn(
            "grid size-11 place-items-center rounded-full",
            "border border-white/8",
            "bg-white/[0.035]",
            "text-zp-muted",
            "backdrop-blur-xl",
            "transition-all duration-300",
            "hover:border-zp-cyan/35",
            "hover:text-zp-cyan"
          )}
        >
          <Bell size={18} />
        </button>

        <button
          aria-label="Open profile"
          onClick={onProfileClick}
          className={cn(
            "grid size-12 place-items-center rounded-full",
            "border border-zp-cyan/20",
            "bg-zp-cyan/10",
            "text-sm font-semibold text-zp-cyan",
            "shadow-[0_0_28px_rgba(99,230,255,0.18)]",
            "backdrop-blur-xl",
            "transition-all duration-300",
            "hover:border-zp-cyan/45",
            "hover:scale-[1.03]"
          )}
        >
          {initials}
        </button>
      </div>
    </header>
  );
}