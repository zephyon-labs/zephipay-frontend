"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const purpose = params.get("purpose");
  const receipt = params.get("receipt");

  const shortReceipt = receipt
    ? `${receipt.slice(0, 6)}...${receipt.slice(-6)}`
    : "Unavailable";

  const shortRecipient = recipient
    ? `${recipient.slice(0, 6)}...${recipient.slice(-6)}`
    : "Unknown";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),#000] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
            Receipt Secured
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Payment Receipt
          </h1>

          <p className="text-gray-400">
            Your payment was completed and recorded with a deterministic receipt.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5 shadow-[0_0_50px_rgba(34,211,238,0.08)]">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Status</span>
            <span className="text-cyan-300 font-medium">Delivered</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">${amount || "0.00"}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Purpose</span>
            <span className="font-medium">{purpose || "General"}</span>
          </div>

          <div className="border-t border-white/10 pt-5 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Recipient</p>
              <p className="mt-1 font-mono text-sm text-gray-300">
                {shortRecipient}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Receipt ID</p>
              <p className="mt-1 font-mono text-sm text-cyan-300">
                {shortReceipt}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            Back Home
          </button>

          <button
            onClick={() => router.push("/send")}
            className="w-full rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Send Another Payment
          </button>
        </div>

        <p className="text-center text-xs text-gray-600">
          Powered by Zephyon Protocol · Solana devnet
        </p>
      </section>
    </main>
  );
}