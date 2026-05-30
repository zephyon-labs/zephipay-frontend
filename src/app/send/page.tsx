"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicKey } from "@solana/web3.js";

export default function SendPage() {
  const router = useRouter();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("Personal");
  const [error, setError] = useState("");

  const handleContinue = () => {
    const trimmedRecipient = recipient.trim();
    const trimmedAmount = amount.trim();

    setError("");

    if (!trimmedRecipient || !trimmedAmount) {
      setError("Please complete all fields.");
      return;
    }

    try {
      new PublicKey(trimmedRecipient);
    } catch {
      setError("Please enter a valid Solana wallet address.");
      return;
    }

    router.push(
      `/confirm?recipient=${encodeURIComponent(
        trimmedRecipient
      )}&amount=${encodeURIComponent(
        trimmedAmount
      )}&purpose=${encodeURIComponent(purpose)}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[170px]" />
        <div className="absolute bottom-[-22rem] left-[-12rem] h-[34rem] w-[34rem] rounded-full bg-fuchsia-700/8 blur-[190px]" />
        <div className="absolute bottom-[-22rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-indigo-700/8 blur-[190px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              Send Payment
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Move money simply
            </h1>

            <p className="leading-relaxed text-zinc-400">
              Fast, receipt-backed payments powered by Solana infrastructure.
            </p>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(34,211,238,0.06)] backdrop-blur-sm">
            <div className="space-y-2">
              <label className="text-sm text-zinc-500">Recipient</label>

              <input
                type="text"
                placeholder="Enter a Solana wallet address"
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  if (error) setError("");
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/40 focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-500">Amount (USD)</label>

              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError("");
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/40 focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-500">Payment Purpose</label>

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-cyan-300/40 focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
              >
                <option>Personal</option>
                <option>Business</option>
                <option>Contractor</option>
                <option>Expense Split</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleContinue}
            className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
          >
            Continue
          </button>

          <p className="text-center text-xs text-zinc-600">
            ZephiPay secures deterministic receipts through Zephyon Protocol.
          </p>
        </div>
      </section>
    </main>
  );
}