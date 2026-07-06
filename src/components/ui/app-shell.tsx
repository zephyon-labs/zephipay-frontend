import type { ReactNode } from "react";
import { AmbientBackdrop } from "./ambient-backdrop";
import { resolveAmbientPhase } from "@/lib/ambient";
import type { AmbientPhase, AmbientPreference } from "@/types/ambient";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
  phase?: AmbientPhase;
  preference?: AmbientPreference;
  className?: string;
};

export function AppShell({
  children,
  phase,
  preference = "auto",
  className,
}: AppShellProps) {
  const resolvedPhase = phase ?? resolveAmbientPhase(preference);

  return (
    <AmbientBackdrop phase={resolvedPhase}>
      <main
        className={cn(
          "relative min-h-screen px-5 py-6 text-white",
          className,
        )}
      >
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col">
          {children}
        </div>
      </main>
    </AmbientBackdrop>
  );
}