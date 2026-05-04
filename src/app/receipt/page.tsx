"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function ReceiptPage() {
  const params = useSearchParams();

  const recipient = params.get("recipient");
  const amount = params.get("amount");

  const receiptId = `R-${amount}-${recipient}`;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Receipt</h2>

        <div className="text-gray-400 space-y-2">
          <p>Amount: ${amount}</p>
          <p>To: {recipient}</p>
          <p>Receipt ID: {receiptId}</p>
        </div>
      </div>
    </main>
  );
}