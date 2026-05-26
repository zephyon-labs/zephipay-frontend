"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BACKEND_URL = "https://zephipay-backend-production.up.railway.app/api/send";

function getBackendValue(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

function SendingContent() {
  const router = useRouter();
  const params = useSearchParams();

  const recipient = params.get("recipient") || "";
  const amount = params.get("amount") || "";
  const purpose = params.get("purpose") || "General";

  const hasSent = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;

    const sendPayment = async () => {
      try {
        if (!recipient || !amount) {
          throw new Error("Missing recipient or amount.");
        }

        const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient,
            amount,
            purpose,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          throw new Error(data.error || "Payment could not be completed.");
        }

        const receipt = getBackendValue(data, [
          "receiptId",
          "receipt",
          "receiptPda",
          "receiptPDA",
        ]);

        const signature = getBackendValue(data, [
          "signature",
          "txSignature",
          "transactionSignature",
          "tx",
        ]);

        router.push(
          `/delivered?recipient=${encodeURIComponent(
            recipient
          )}&amount=${encodeURIComponent(amount)}&purpose=${encodeURIComponent(
            purpose
          )}&receipt=${encodeURIComponent(
            receipt
          )}&signature=${encodeURIComponent(signature)}`
        );
      } catch (err) {
        console.error("Send failed:", err);
        setError("Payment could not be completed. Please try again.");
      }
    };

    sendPayment();
  }, [router, recipient, amount, purpose]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(34,211,238,0.10),transparent_30%),radial-gradient(circle_at_bottom_center,rgba(168,85,247,0.05),transparent_40%),#000] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md text-center space-y-8">
        {!error ? (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_50px_rgba(34,211,238,0.16)]">
              <div className="h-10 w-10 animate-pulse rounded-full bg-cyan-300/70 shadow-[0_0_35px_rgba(34,211,238,0.35)]" />
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
                Processing
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">
                Sending payment
              </h1>

              <p className="text-gray-400 leading-relaxed">
                ZephyPay is routing your payment and securing a receipt on
                Solana devnet.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left space-y-3 shadow-[0_0_40px_rgba(34,211,238,0.06)]">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">${amount || "0.00"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Purpose</span>
                <span className="font-medium text-right">
                  {purpose || "General"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-cyan-300">
                  Securing receipt
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600">
              Please keep this window open while your receipt is generated.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-400/5">
              <span className="text-3xl">!</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-red-300/70">
                Interrupted
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">
                Payment not completed
              </h1>

              <p className="text-gray-400 leading-relaxed">{error}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/send")}
                className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90"
              >
                Return to Send
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Back Home
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default function SendingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Preparing payment...
        </main>
      }
    >
      <SendingContent />
    </Suspense>
  );
}