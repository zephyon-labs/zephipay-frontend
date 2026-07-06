import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityItem = {
  title: string;
  subtitle: string;
  amount: string;
};

const sampleActivity: ActivityItem[] = [
  {
    title: "Paid Sarah",
    subtitle: "Today • Delivered",
    amount: "$24.50",
  },
  {
    title: "Coffee House",
    subtitle: "Yesterday • Receipt ready",
    amount: "$6.18",
  },
  {
    title: "Creator Membership",
    subtitle: "Monday • Renewed",
    amount: "$10.00",
  },
];

type RecentActivityProps = {
  className?: string;
};

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-zp-text">
          Recent Activity
        </h2>

        <button className="text-sm font-medium text-zp-cyan/80 transition hover:text-zp-cyan">
          View all
        </button>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.035] backdrop-blur-2xl">
        {sampleActivity.map((item, index) => (
          <button
            key={item.title}
            className={cn(
              "flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-white/[0.04]",
              index !== sampleActivity.length - 1 && "border-b border-white/6",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-zp-text">{item.title}</p>
                <p className="mt-0.5 text-xs text-zp-subtle">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-zp-text">
                {item.amount}
              </p>
              <ArrowUpRight size={15} className="text-zp-subtle" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}