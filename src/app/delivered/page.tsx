"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function DeliveredPage() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        
        <h2 className="text-2xl font-semibold">
          Delivered
        </h2>

        <p className="text-gray-400">
          ${amount} sent to {recipient}
        </p>

        <button
          onClick={() =>
            router.push(`/receipt?recipient=${recipient}&amount=${amount}`)
          }
          className="px-6 py-3 bg-white text-black rounded-xl font-medium"
        >
          View Receipt
        </button>

      </div>
    </main>
  );
}