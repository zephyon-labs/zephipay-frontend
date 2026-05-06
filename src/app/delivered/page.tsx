"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const receipt = params.get("receipt");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Receipt</h2>

        <p>Amount: ${amount}</p>
        <p>To:</p>
        <p className="text-sm text-gray-400 break-all">{recipient}</p>

        <p className="mt-4">Receipt ID:</p>
        <p className="text-sm text-green-400 break-all">{receipt}</p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-white text-black rounded-xl"
        >
          Back Home
        </button>
      </div>
    </main>
  );
}