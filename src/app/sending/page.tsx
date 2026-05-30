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

                <p className="leading-relaxed text-zinc-400">
                  ZephiPay is routing your payment and securing a receipt on
                  Solana devnet.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left shadow-[0_0_40px_rgba(34,211,238,0.06)] backdrop-blur-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Amount</span>
                  <span className="font-medium">${amount || "0.00"}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Purpose</span>
                  <span className="text-right font-medium">
                    {purpose || "General"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Status</span>
                  <span className="font-medium text-cyan-300">
                    Securing receipt
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600">
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

                <p className="leading-relaxed text-zinc-400">{error}</p>
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
        </div>
      </section>
    </main>
  );
}

export default function SendingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-white">
          Preparing payment...
        </main>
      }
    >
      <SendingContent />
    </Suspense>
  );
}