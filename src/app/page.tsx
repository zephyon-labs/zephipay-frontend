import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-wide">
          ZephiPay
        </h1>

        <p className="text-gray-400">
          Send. Delivered. Done.
        </p>

        <Link href="/send">
  <button className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:opacity-90 transition">
    Send
  </button>
</Link>
      </div>
    </main>
  );
}
