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

  const recipient = params.get("recipient") || "";
  const amount = params.get("amount") || "0.00";
  const purpose = params.get("purpose") || "General";
  const receipt = params.get("receipt") || "";
  const signature = params.get("signature") || params.get("tx") || "";

  const receiptDisplay = receipt
    ? `ZP-${receipt.slice(0, 6).toUpperCase()}`
    : "ZP-PENDING";

  const explorerUrl = signature
    ? `https://explorer.solana.com/tx/${signature}?cluster=devnet`
    : "";

  const receiptUrl = `/receipt?recipient=${encodeURIComponent(
    recipient
  )}&amount=${encodeURIComponent(amount)}&purpose=${encodeURIComponent(
    purpose
  )}&receipt=${encodeURIComponent(receipt)}&signature=${encodeURIComponent(
    signature
  )}`;

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
            Your payment was completed on Solana devnet and secured through
            Zephyon Protocol receipt infrastructure.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-4 text-left shadow-[0_0_50px_rgba(34,211,238,0.08)]">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">${amount}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Purpose</span>
            <span className="font-medium text-right">{purpose}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Receipt ID</span>
            <span className="font-medium text-cyan-300">{receiptDisplay}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Transaction</span>
            <span className="font-medium text-right text-gray-300">
              {shorten(signature)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Status</span>
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
            className="w-full rounded-2xl px-6 py-3 text-sm font-medium text-gray-500 transition hover:text-white"
          >
            Back Home
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Powered by Solana devnet · Receipt-backed payment infrastructure
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