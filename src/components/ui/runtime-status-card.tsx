import { CheckCircle2, CircleDot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type RuntimeEngine = {
  name: string;
  state: string;
  healthy: boolean;
};

type RuntimeStatusCardProps = {
  name: string;
  status: string;
  updated: string;
  engines: RuntimeEngine[];
  className?: string;
};

export function RuntimeStatusCard({
  name,
  status,
  updated,
  engines,
  className,
}: RuntimeStatusCardProps) {
  return (
    <section
      className={cn(
        "rounded-[30px] border border-zp-cyan/15 bg-white/[0.035] p-5",
        "shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
            <Zap size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zp-text">{name}</h2>

            <div className="mt-1 flex items-center gap-2 text-xs text-zp-muted">
              <CircleDot size={12} className="text-zp-success" />
              {status}
            </div>
          </div>
        </div>

        <p className="text-xs text-zp-subtle">{updated}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {engines.map((engine) => (
          <div
            key={engine.name}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-3"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={14}
                className={engine.healthy ? "text-zp-success" : "text-zp-warning"}
              />
              <p className="text-xs font-medium text-zp-text">{engine.name}</p>
            </div>

            <p className="mt-1 text-xs text-zp-subtle">{engine.state}</p>
          </div>
        ))}
      </div>
    </section>
  );
}