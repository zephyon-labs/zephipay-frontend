"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const purpose = params.get("purpose");

  const handleSend = () => {
    router.push(
      `/sending?recipient=${recipient}&amount=${amount}&purpose=${purpose}`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Confirm Payment</h2>

        <p className="text-gray-400">
          Sending <span className="text-white font-medium">${amount}</span> to
        </p>

        <p className="text-white text-lg break-all">{recipient}</p>

        <p className="text-sm text-gray-500">Purpose: {purpose}</p>

        <button
          onClick={handleSend}
          className="w-full py-3 bg-white text-black rounded-xl font-medium"
        >
          Send Now
        </button>
      </div>
    </main>
  );
}