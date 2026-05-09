import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),#000] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-3xl text-center space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">
            Solana-powered payments
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            ZephiPay
          </h1>

          <p className="mx-auto max-w-xl text-lg md:text-xl text-gray-400 leading-relaxed">
            Simple, receipt-backed payments built on fast blockchain rails.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/send">
            <button className="w-48 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] hover:opacity-90 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              Send Payment
            </button>
          </Link>

          <Link href="/receipt">
            <button className="w-48 rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
              View Receipt
            </button>
          </Link>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 pt-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_35px_rgba(34,211,238,0.04)]">
            <p className="text-sm text-gray-500">Speed</p>
            <p className="mt-2 font-medium">Fast settlement</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_35px_rgba(34,211,238,0.04)]">
            <p className="text-sm text-gray-500">Trust</p>
            <p className="mt-2 font-medium">Deterministic receipts</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_35px_rgba(34,211,238,0.04)]">
            <p className="text-sm text-gray-500">Experience</p>
            <p className="mt-2 font-medium">Crypto stays invisible</p>
          </div>
        </div>

        <p className="text-xs text-gray-600">
          Devnet MVP preview · Zephyon Protocol infrastructure
        </p>
      </section>
    </main>
  );
}