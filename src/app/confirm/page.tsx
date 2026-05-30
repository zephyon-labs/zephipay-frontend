"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ConfirmContent() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const purpose = params.get("purpose");

  const shortRecipient = recipient
    ? `${recipient.slice(0, 6)}...${recipient.slice(-6)}`
    : "Unknown";

  const handleSend = () => {
    router.push(
      `/sending?recipient=${encodeURIComponent(
        recipient || ""
      )}&amount=${encodeURIComponent(
        amount || ""
      )}&purpose=${encodeURIComponent(purpose || "")}`
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
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
              Confirm Transfer
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Review payment
            </h1>

            <p className="leading-relaxed text-zinc-400">
              Verify the payment details before ZephiPay secures your receipt.
            </p>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(34,211,238,0.06)] backdrop-blur-sm">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Amount</span>
              <span className="text-xl font-medium">${amount || "0.00"}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Purpose</span>
              <span className="font-medium">{purpose || "General"}</span>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <div>
                <p className="text-sm text-zinc-500">Recipient</p>

                <p className="mt-1 break-all font-mono text-sm text-zinc-300">
                  {shortRecipient}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Settlement</p>

                <p className="mt-1 text-sm text-cyan-300">
                  Solana devnet · Receipt-backed
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSend}
              className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
            >
              Send Payment
            </button>

            <button
              onClick={() => router.back()}
              className="w-full rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Edit Details
            </button>
          </div>

          <p className="text-center text-xs text-zinc-600">
            ZephiPay generates deterministic receipts through Zephyon Protocol.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading confirmation...
        </main>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}