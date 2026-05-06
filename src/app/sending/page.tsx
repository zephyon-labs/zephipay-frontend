"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SendingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const hasSent = useRef(false);

  const recipient = params.get("recipient");
  const amount = params.get("amount");

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;

    const sendPayment = async () => {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient, amount }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(
          `/delivered?recipient=${recipient}&amount=${amount}&receipt=${data.receiptId}`
        );
      }
    };

    sendPayment();
  }, [router, recipient, amount]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-lg">Sending...</p>
        <p className="text-gray-500 text-sm">Securing receipt</p>
      </div>
    </main>
  );
}