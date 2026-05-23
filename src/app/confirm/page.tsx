"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmPage() {
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(168,85,247,0.05),transparent_40%),#000] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
            Confirm Transfer
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Review payment
          </h1>

          <p className="text-gray-400 leading-relaxed">
            Verify the payment details before ZephiPay secures your receipt.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5 shadow-[0_0_50px_rgba(34,211,238,0.06)]">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium text-xl">
              ${amount || "0.00"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Purpose</span>
            <span className="font-medium">
              {purpose || "General"}
            </span>
          </div>

          <div className="border-t border-white/10 pt-5 space-y-3">
            <div>
              <p className="text-sm text-gray-500">
                Recipient
              </p>

              <p className="mt-1 font-mono text-sm text-gray-300 break-all">
                {shortRecipient}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Settlement
              </p>

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

        <p className="text-center text-xs text-gray-600">
          ZephiPay generates deterministic receipts through Zephyon Protocol.
        </p>
      </section>
    </main>
  );
}