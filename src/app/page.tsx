import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top glow */}
        <div className="absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[170px]" />

        {/* Bottom left glow */}
        <div className="absolute bottom-[-22rem] left-[-12rem] h-[34rem] w-[34rem] rounded-full bg-fuchsia-700/8 blur-[190px]" />

        {/* Bottom right glow */}
        <div className="absolute bottom-[-22rem] right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-indigo-700/8 blur-[190px]" />

        {/* Ambient fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_40%)]" />

        {/* Dark layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10">
        {/* Header */}
        <div className="text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.34em] text-violet-300/65">
            Solana-Powered Payments
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            ZephiPay
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            Simple, receipt-backed payments built on fast blockchain rails.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/send"
            className="group flex items-center justify-center rounded-2xl bg-white px-9 py-4 text-sm font-semibold text-black shadow-lg shadow-violet-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-100"
          >
            Send Payment

            <span className="ml-2 transition duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/receipt"
            className="flex items-center justify-center rounded-2xl border border-violet-400/15 bg-white/[0.015] px-9 py-4 text-sm font-semibold text-white transition duration-300 hover:border-violet-300/25 hover:bg-white/[0.03]"
          >
            View Receipt
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid w-full max-w-5xl gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/7 bg-white/[0.02] p-6 backdrop-blur-sm transition duration-300 hover:border-violet-300/12 hover:bg-white/[0.03]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/7 text-2xl text-violet-300">
              ⚡
            </div>

            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Speed
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Fast settlement
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Solana-native transfers with near-instant confirmation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/7 bg-white/[0.02] p-6 backdrop-blur-sm transition duration-300 hover:border-violet-300/12 hover:bg-white/[0.03]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/7 text-2xl text-violet-300">
              🛡
            </div>

            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Trust
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Deterministic receipts
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Every payment generates verifiable receipt-backed records.
            </p>
          </div>

          <div className="rounded-3xl border border-white/7 bg-white/[0.02] p-6 backdrop-blur-sm transition duration-300 hover:border-violet-300/12 hover:bg-white/[0.03]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/7 text-2xl text-violet-300">
              ◉
            </div>

            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              Experience
            </p>

            <h3 className="mt-3 text-xl font-semibold">
              Crypto stays invisible
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              A clean payment experience with blockchain rails underneath.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/7 bg-black/20 px-7 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Network
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-zinc-200">
                Solana
              </span>

              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/7 bg-black/20 px-7 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Mode
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-zinc-200">
                Devnet
              </span>

              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/7 bg-black/20 px-7 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Status
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-zinc-200">
                Live
              </span>

              <div className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/12 bg-white/[0.025] text-lg font-semibold text-violet-100">
            Z
          </div>

          <p className="text-[10px] uppercase tracking-[0.30em] text-zinc-500">
            Zephyon Labs · Receipt-Backed Payments
          </p>
        </div>
      </section>
    </main>
  );
}