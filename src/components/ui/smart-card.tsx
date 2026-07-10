"use client";

import { useState } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Gift,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SmartCardItem = {
  label: string;
  description: string;
};

type SmartCardProps = {
  title: string;
  subtitle: string;
  items: SmartCardItem[];
};

const icons = {
  "AI Assist": Bot,
  Subscriptions: Repeat,
  Tipping: Gift,
  Receipts: FileText,
};

export function SmartCard({ title, subtitle, items }: SmartCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-[30px] border border-zp-cyan/15 bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <h2 className="text-sm font-semibold text-zp-text">{title}</h2>
          <p className="mt-1 text-xs text-zp-subtle">{subtitle}</p>
        </div>

        <ChevronDown
          size={18}
          className={cn(
            "text-zp-cyan transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          {items.map((item) => {
            const Icon = icons[item.label as keyof typeof icons] ?? Bot;

            return (
              <button
                key={item.label}
                className="rounded-2xl border border-white/8 bg-white/[0.025] p-3 text-left transition hover:border-zp-cyan/30"
              >
                <Icon size={17} className="text-zp-cyan" />
                <p className="mt-3 text-xs font-semibold text-zp-text">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-zp-subtle">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}