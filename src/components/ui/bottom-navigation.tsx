import Link from "next/link";
import { ArrowLeftRight, House, UserRound, WalletCards } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", icon: House, href: "/" },
  { label: "Wallet", icon: WalletCards, href: "/wallet" },
  { label: "Activity", icon: ArrowLeftRight, href: "/activity" },
  { label: "Profile", icon: UserRound, href: "/profile" },
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
        {items.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 py-4 transition-colors hover:text-zp-cyan"
          >
            <Icon size={20} className="text-zp-subtle" />

            <span className="text-xs text-zp-subtle">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}