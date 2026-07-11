"use client";

import { useState } from "react";
import { Banknote, X } from "lucide-react";
import { useAccount } from "@/state/account-provider";

type FundAccountSheetProps = {
  open: boolean;
  onClose: () => void;
};

const presetAmounts = [10, 25, 50, 100];

function normalizeAmount(value: string): number {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.max(0, Math.round(amount * 100) / 100);
}

export function FundAccountSheet({
  open,
  onClose,
}: FundAccountSheetProps) {
  const { addFunds } = useAccount();

  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    25,
  );
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const amount =
    selectedAmount ?? normalizeAmount(customAmount);

  function handleClose() {
    setSelectedAmount(25);
    setCustomAmount("");
    setError("");
    onClose();
  }

  function handlePreset(amountValue: number) {
    setSelectedAmount(amountValue);
    setCustomAmount("");
    setError("");
  }

  function handleCustomAmount(value: string) {
    setSelectedAmount(null);
    setCustomAmount(value);
    setError("");
  }

  function handleFundAccount() {
    if (amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    if (amount > 1000) {
      setError("Beta funding is limited to $1,000 at a time.");
      return;
    }

    addFunds(amount);
    handleClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="fund-account-title"
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-zinc-950 p-6 shadow-[0_25px_100px_rgba(0,0,0,0.75)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
              <Banknote size={20} />
            </div>

            <div>
              <h2
                id="fund-account-title"
                className="text-lg font-semibold text-zp-text"
              >
                Fund Test Account
              </h2>

              <p className="mt-1 text-xs text-zp-subtle">
                Load simulated funds for beta testing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close funding sheet"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-zp-subtle transition hover:bg-white/5 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {presetAmounts.map((preset) => {
            const selected = selectedAmount === preset;

            return (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className={[
                  "rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                  selected
                    ? "border-zp-cyan/50 bg-zp-cyan/10 text-zp-cyan"
                    : "border-white/10 bg-white/[0.025] text-zp-text hover:border-zp-cyan/30",
                ].join(" ")}
              >
                ${preset}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label
            htmlFor="custom-funding-amount"
            className="text-xs font-medium text-zp-subtle"
          >
            Custom amount
          </label>

          <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-black/30 px-4 focus-within:border-zp-cyan/40">
            <span className="text-zp-subtle">$</span>

            <input
              id="custom-funding-amount"
              type="number"
              inputMode="decimal"
              min="0"
              max="1000"
              step="0.01"
              placeholder="0.00"
              value={customAmount}
              onChange={(event) =>
                handleCustomAmount(event.target.value)
              }
              className="w-full bg-transparent px-2 py-4 text-zp-text outline-none placeholder:text-zp-subtle/50"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zp-subtle">
              Amount to add
            </span>

            <span className="text-lg font-semibold text-zp-text">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleFundAccount}
          className="mt-4 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:scale-[1.01] hover:opacity-90"
        >
          Add Test Funds
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-zp-subtle">
          Test funds are simulated and have no real-world value.
        </p>
      </section>
    </div>
  );
}
