"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  QrCode,
  Send,
  WalletCards,
} from "lucide-react";
import { FundAccountSheet } from "./fund-account-sheet";
import { QuickAction } from "./quick-action";

export function QuickActions() {
  const router = useRouter();
  const [fundingOpen, setFundingOpen] = useState(false);

  return (
    <>
      <section className="grid grid-cols-4 gap-3">
        <QuickAction
          label="Send"
          icon={Send}
          onClick={() => router.push("/send")}
        />

        <QuickAction
          label="Request"
          icon={WalletCards}
          onClick={() => router.push("/request")}
        />

        <QuickAction
          label="Fund"
          icon={Banknote}
          onClick={() => setFundingOpen(true)}
        />

        <QuickAction
          label="Scan"
          icon={QrCode}
          onClick={() => router.push("/scan")}
        />
      </section>

      <FundAccountSheet
        open={fundingOpen}
        onClose={() => setFundingOpen(false)}
      />
    </>
  );
}
