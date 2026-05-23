"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function DeliveredContent() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const purpose = params.get("purpose");
  const receipt = params.get("receipt");

  const receiptUrl = `/receipt?recipient=${encodeURIComponent(
    recipient || ""
  )}&amount=${encodeURIComponent(amount || "")}&purpose=${encodeURIComponent(
    purpose || ""
  )}&receipt=${encodeURIComponent(receipt || "")}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(168,85,247,0.05),transparent_40%),#000] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md text-center space-y-8">
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

          <p className="text-gray-400 leading-relaxed">
            Your payment was completed and a receipt was secured through
            Zephyon Protocol.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4 text-left shadow-[0_0_50px_rgba(34,211,238,0.08)]">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">${amount || "0.00"}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Purpose</span>
            <span className="font-medium">{purpose || "General"}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-cyan-300">Receipt secured</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push(receiptUrl)}
            className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            View Receipt
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Back Home
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Powered by Solana devnet · Built for fast, receipt-backed payments
        </p>
      </section>
    </main>
  );
}

export default function DeliveredPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading receipt confirmation...
        </main>
      }
    >
      <DeliveredContent />
    </Suspense>
  );
}