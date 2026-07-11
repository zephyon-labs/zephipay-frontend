"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  isSimulationMode,
  runtimeEnvironment,
} from "@/lib/runtime-environment";
import { useAccount } from "@/state/account-provider";
import { useTransactions } from "@/state/transaction-provider";

const BACKEND_URL =
  "https://zephipay-backend-production.up.railway.app/api/send";

function getBackendValue(
  data: Record<string, unknown>,
  keys: string[],
) {
  for (const key of keys) {
    const value = data[key];

    if (
      typeof value === "string" &&
      value.length > 0
    ) {
      return value;
    }
  }

  return "";
}

function createSimulationIdentifier(prefix: string): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function SendingContent() {
  const router = useRouter();
  const params = useSearchParams();

  const recipient = params.get("recipient") || "";
  const amount = params.get("amount") || "";
  const purpose = params.get("purpose") || "General";

  const {
    account,
    isReady: accountIsReady,
    subtractFunds,
  } = useAccount();

  const { recordCompletedTransaction } =
    useTransactions();

  const hasSent = useRef(false);
  const [error, setError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!accountIsReady || hasSent.current) {
      return;
    }

    hasSent.current = true;

    async function sendPayment() {
      try {
        const numericAmount = Number(amount);

        if (
          !recipient ||
          !Number.isFinite(numericAmount) ||
          numericAmount <= 0
        ) {
          throw new Error(
            "Missing or invalid payment details.",
          );
        }

        if (isSimulationMode) {
          if (
            numericAmount >
            account.balances.availableUsd
          ) {
            throw new Error(
              `Insufficient test balance. You have $${account.balances.availableUsd.toFixed(
                2,
              )} available.`,
            );
          }

          await wait(900);

          const deducted =
            subtractFunds(numericAmount);

          if (!deducted) {
            throw new Error(
              "The test balance could not cover this payment.",
            );
          }

          const receiptAddress =
            createSimulationIdentifier(
              "sim-receipt",
            );

          const transactionSignature =
            createSimulationIdentifier(
              "sim-transaction",
            );

          const transaction =
            recordCompletedTransaction({
              recipient,
              amountUsd: numericAmount,
              purpose,
              receiptAddress,
              transactionSignature,
              rail: "prototype",
            });

          router.push(
            `/delivered?mode=simulation&transactionId=${encodeURIComponent(
              transaction.id,
            )}&recipient=${encodeURIComponent(
              recipient,
            )}&amount=${encodeURIComponent(
              numericAmount.toFixed(2),
            )}&purpose=${encodeURIComponent(
              purpose,
            )}&receipt=${encodeURIComponent(
              receiptAddress,
            )}&signature=${encodeURIComponent(
              transactionSignature,
            )}`,
          );

          return;
        }

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient,
            amount: numericAmount.toFixed(2),
            purpose,
            environment: runtimeEnvironment,
          }),
        });

        const data =
          (await response.json()) as Record<
            string,
            unknown
          >;

        if (!response.ok || data.ok !== true) {
          throw new Error(
            typeof data.error === "string"
              ? data.error
              : "Payment could not be completed.",
          );
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

        const transaction =
          recordCompletedTransaction({
            recipient,
            amountUsd: numericAmount,
            purpose,
            receiptAddress: receipt,
            transactionSignature: signature,
            rail:
              runtimeEnvironment === "testnet"
                ? "solana-testnet"
                : runtimeEnvironment === "mainnet"
                  ? "solana-mainnet"
                  : "solana-devnet",
          });

        subtractFunds(numericAmount);

        router.push(
          `/delivered?mode=${encodeURIComponent(
            runtimeEnvironment,
          )}&transactionId=${encodeURIComponent(
            transaction.id,
          )}&recipient=${encodeURIComponent(
            recipient,
          )}&amount=${encodeURIComponent(
            numericAmount.toFixed(2),
          )}&purpose=${encodeURIComponent(
            purpose,
          )}&receipt=${encodeURIComponent(
            receipt,
          )}&signature=${encodeURIComponent(
            signature,
          )}`,
        );
      } catch (caughtError) {
        console.error(
          "Payment execution failed:",
          caughtError,
        );

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Payment could not be completed. Please try again.",
        );
      }
    }

    void sendPayment();
  }, [
    account.balances.availableUsd,
    accountIsReady,
    amount,
    purpose,
    recipient,
    recordCompletedTransaction,
    router,
    subtractFunds,
  ]);

  const processingDescription = isSimulationMode
    ? "ZephiPay is executing your test payment and generating a Verified Receipt."
    : "ZephiPay is securely routing your payment and generating a Verified Receipt.";

  const statusLabel = isSimulationMode
    ? "Executing simulation"
    : "Securing settlement";

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
                  {processingDescription}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left shadow-[0_0_40px_rgba(34,211,238,0.06)] backdrop-blur-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Amount
                  </span>
                  <span className="font-medium">
                    ${amount || "0.00"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Purpose
                  </span>
                  <span className="text-right font-medium">
                    {purpose}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Mode
                  </span>
                  <span className="font-medium capitalize text-zinc-300">
                    {runtimeEnvironment}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">
                    Status
                  </span>
                  <span className="font-medium text-cyan-300">
                    {statusLabel}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600">
                Please keep this window open while your
                Verified Receipt is generated.
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

                <p
                  role="alert"
                  className="leading-relaxed text-zinc-400"
                >
                  {error}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/send")
                  }
                  className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90"
                >
                  Return to Send
                </button>

                <button
                  type="button"
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
