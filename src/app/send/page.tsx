"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!recipient || !amount) return;

    router.push(`/confirm?recipient=${recipient}&amount=${amount}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        
        <h2 className="text-2xl font-semibold text-center">
          Send Money
        </h2>

        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-white text-black rounded-xl font-medium"
        >
          Continue
        </button>

      </div>
    </main>
  );
}