"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ReceiptPage() {
  const params = useSearchParams();
  const router = useRouter();

  const recipient = params.get("recipient");
  const amount = params.get("amount");
  const receipt = params.get("receipt");

  const shortRecipient = recipient
    ? `${recipient.slice(0, 5)}...${recipient.slice(-4)}`
    : "";

  const shortReceipt = receipt
    ? `${receipt.slice(0, 5)}...${receipt.slice(-4)}`
    : "";

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Receipt</h2>
          <p className="text-gray-500 text-sm">Confirmed on Solana Devnet</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Amount</p>
            <p className="text-lg">${amount}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Recipient</p>
            <p className="text-gray-300">{shortRecipient}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Receipt PDA</p>
            <p className="text-green-400 break-all">{shortReceipt}</p>
          </div>

          {receipt && (
            <a
              href={`https://explorer.solana.com/address/${receipt}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 underline text-sm"
            >
              View on Solana Explorer
            </a>
          )}
        </div>

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