import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Lock,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IdentitySheetProps = {
  open: boolean;
  onClose?: () => void;
};

export function IdentitySheet({ open, onClose }: IdentitySheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          <motion.aside
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[36px] border-t border-white/10 bg-zp-surface p-6 shadow-2xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          >
            <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-white/15" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-zp-cyan/10 text-xl font-semibold text-zp-cyan">
                  Z
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-zp-text">
                    Zephdek
                  </h2>

                  <div className="mt-1 flex items-center gap-2 text-sm text-zp-muted">
                    <BadgeCheck size={16} className="text-zp-success" />
                    Verified
                  </div>

                  <p className="mt-1 text-sm text-zp-cyan">
                    Level 18 • Builder
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 text-zp-muted transition hover:text-zp-text"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <Stat label="ZTS" value="96" />
              <Stat label="ZP" value="4,260" />
              <Stat label="Trust" value="Strong" />
            </div>

            <div className="mt-8 space-y-2">
              <Action icon={User} label="Profile" />
              <Action icon={Award} label="Achievements" />
              <Action icon={Shield} label="Security Center" />
              <Action icon={Settings} label="Settings" />
              <Action icon={Lock} label="Privacy" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-center">
      <p className="text-xs text-zp-subtle">{label}</p>
      <p className="mt-2 text-lg font-semibold text-zp-text">{value}</p>
    </div>
  );
}

function Action({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button className="flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition hover:border-zp-cyan/30">
      <Icon size={18} className="text-zp-cyan" />
      <span className="text-zp-text">{label}</span>
    </button>
  );
}