"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendPage() {
  const router = useRouter();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("Personal");
  const [error, setError] = useState("");

  function handleContinue() {
    const trimmedRecipient = recipient.trim();
    const trimmedAmount = amount.trim();
    const numericAmount = Number(trimmedAmount);

    setError("");

    if (!trimmedRecipient || !trimmedAmount) {
      setError("Please complete all fields.");
      return;
    }

    if (trimmedRecipient.length < 3) {
      setError("Please enter a valid recipient.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    router.push(
      `/confirm?recipient=${encodeURIComponent(
        trimmedRecipient,
      )}&amount=${encodeURIComponent(
        numericAmount.toFixed(2),
      )}&purpose=${encodeURIComponent(purpose)}`,
    );
  }

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
          <header className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              Send Payment
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Send money with confidence
            </h1>

            <p className="leading-relaxed text-zinc-400">
              Fast, secure payments with a Verified Receipt.
            </p>
          </header>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(34,211,238,0.06)] backdrop-blur-sm">
            <div className="space-y-2">
              <label
                htmlFor="recipient"
                className="text-sm text-zinc-500"
              >
                Who are you paying?
              </label>

              <input
                id="recipient"
                name="recipient"
                type="text"
                autoComplete="off"
                placeholder="Name, username, wallet, phone, or email"
                value={recipient}
                onChange={(event) => {
                  setRecipient(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/40 focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
              />

              <p className="text-xs leading-relaxed text-zinc-600">
                Wallet addresses work in the current Devnet beta.
                ZephiPay identity resolution is coming next.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm text-zinc-500"
              >
                Amount
              </label>

              <div className="flex items-center rounded-2xl border border-white/10 bg-black/40 px-4 transition focus-within:border-cyan-300/40 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.12)]">
                <span className="text-zinc-500">$</span>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  className="w-full bg-transparent px-2 py-4 text-white outline-none placeholder:text-zinc-600"
                />

                <span className="text-xs font-medium text-zinc-600">
                  USD
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="payment-purpose"
                className="text-sm text-zinc-500"
              >
                Payment purpose
              </label>

              <select
                id="payment-purpose"
                name="payment-purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
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
            <div
              role="alert"
              className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
          >
            Continue
          </button>

          <p className="text-center text-xs text-zinc-600">
            Every completed payment includes a Verified Receipt.
          </p>
        </div>
      </section>
    </main>
  );
}
