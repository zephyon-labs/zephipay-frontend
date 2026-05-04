"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SendingPage() {
  const router = useRouter();
  const params = useSearchParams();

  const recipient = params.get("recipient");
  const amount = params.get("amount");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/delivered?recipient=${recipient}&amount=${amount}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, recipient, amount]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-lg">Sending...</p>
      </div>
    </main>
  );
}