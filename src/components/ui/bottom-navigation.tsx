import { ArrowLeftRight, Compass, House, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", icon: House, active: true },
  { label: "Payments", icon: ArrowLeftRight },
  { label: "Discover", icon: Compass },
  { label: "Profile", icon: UserRound },
];

export function BottomNavigation() {
  return (
    <nav
      className={cn(
        "sticky bottom-4 mt-auto rounded-[30px]",
        "border border-white/8 bg-white/[0.045]",
        "shadow-[0_18px_70px_rgba(0,0,0,.45)] backdrop-blur-3xl",
      )}
    >
      <div className="grid grid-cols-4">
        {items.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 py-4 transition-colors"
          >
            <Icon
              size={20}
              className={active ? "text-zp-cyan" : "text-zp-subtle"}
            />

            <span
              className={
                active
                  ? "text-xs font-medium text-zp-cyan"
                  : "text-xs text-zp-subtle"
              }
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}