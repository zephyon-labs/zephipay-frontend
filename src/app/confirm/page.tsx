"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ConfirmPage() {
  const params = useSearchParams();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const router = useRouter();
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        
        <h2 className="text-2xl font-semibold">
          Confirm Payment
        </h2>

        <p className="text-gray-400">
          Sending <span className="text-white font-medium">${amount}</span> to
        </p>

        <p className="text-white text-lg">
          {recipient}
        </p>

        <button
  onClick={() =>
    router.push(`/sending?recipient=${recipient}&amount=${amount}`)
  }
  className="w-full py-3 bg-white text-black rounded-xl font-medium"
>
  Send Now
</button>

      </div>
    </main>
  );
}