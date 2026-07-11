"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function shorten(value: string | null, front = 6, back = 6) {
  if (!value) return "Unavailable";
  if (value.length <= front + back) return value;
  return `${value.slice(0, front)}...${value.slice(-back)}`;
}

function DeliveredContent() {
  const params = useSearchParams();
  const router = useRouter();

  const mode = params.get("mode") || "devnet";
  const recipient = params.get("recipient") || "";
  const amount = params.get("amount") || "0.00";
  const purpose = params.get("purpose") || "General";
  const receipt = params.get("receipt") || "";
  const signature = params.get("signature") || params.get("tx") || "";

  const isSimulation = mode === "simulation";

  const receiptDisplay = receipt
    ? `ZP-${receipt.slice(0, 6).toUpperCase()}`
    : "ZP-PENDING";

  const explorerUrl =
    signature && !isSimulation
      ? `https://explorer.solana.com/tx/${signature}?cluster=${mode}`
      : "";

  const receiptUrl = `/receipt?recipient=${encodeURIComponent(
    recipient
  )}&amount=${encodeURIComponent(amount)}&purpose=${encodeURIComponent(
    purpose
  )}&receipt=${encodeURIComponent(receipt)}&signature=${encodeURIComponent(
    signature
  )}&mode=${encodeURIComponent(mode)}`;

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
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_70px_rgba(34,211,238,0.18)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300 text-black shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              <span className="text-3xl font-semibold">✓</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              Delivered
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Payment Delivered
            </h1>

            <p className="leading-relaxed text-zinc-400">
              {isSimulation
                ? "Your test payment was completed and a Verified Receipt was generated."
                : "Your payment was settled and a Verified Receipt was generated."}
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-sm">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Amount</span>
              <span className="font-medium">${amount}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Purpose</span>
              <span className="text-right font-medium">{purpose}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Receipt ID</span>
              <span className="font-medium text-cyan-300">
                {receiptDisplay}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">
                {isSimulation ? "Simulation ID" : "Transaction"}
              </span>
              <span className="text-right font-medium text-zinc-300">
                {shorten(signature)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">Status</span>
              <span className="font-medium text-cyan-300">Confirmed</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push(receiptUrl)}
              className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              View Receipt
            </button>

            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-2xl border border-cyan-300/20 px-6 py-4 font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
              >
                View on Solana Explorer
              </a>
            )}

            <button
              onClick={() => router.push("/send")}
              className="w-full rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Send Again
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full rounded-2xl px-6 py-3 text-sm font-medium text-zinc-500 transition hover:text-white"
            >
              Back Home
            </button>
          </div>

          <p className="text-xs text-zinc-600">
            {isSimulation
              ? "Simulation Mode · No real funds were moved"
              : "Verified by Zephyon Protocol"}
          </p>
        </div>
      </section>
    </main>
  );
}

export default function DeliveredPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Loading receipt confirmation...
        </main>
      }
    >
      <DeliveredContent />
    </Suspense>
  );
}