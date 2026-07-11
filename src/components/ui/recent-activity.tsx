"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransactions } from "@/state/transaction-provider";
import type { Transaction } from "@/types/transaction";

type RecentActivityProps = {
  className?: string;
};

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function shortenRecipient(recipient: string): string {
  if (recipient.length <= 14) {
    return recipient;
  }

  return `${recipient.slice(0, 6)}...${recipient.slice(-6)}`;
}

function formatActivityDate(timestamp: string): string {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const today = new Date();

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday) {
    return "Today";
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getActivityTitle(transaction: Transaction): string {
  if (transaction.direction === "received") {
    return `Received from ${shortenRecipient(
      transaction.recipient,
    )}`;
  }

  return `Paid ${shortenRecipient(transaction.recipient)}`;
}

function getStatusLabel(transaction: Transaction): string {
  switch (transaction.status) {
    case "confirmed":
      return "Delivered";
    case "processing":
      return "Processing";
    case "failed":
      return "Not completed";
    default:
      return "Draft";
  }
}

export function RecentActivity({
  className,
}: RecentActivityProps) {
  const { transactions, isReady } = useTransactions();

  const recentTransactions = transactions.slice(0, 3);

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-zp-text">
          Recent Activity
        </h2>

        {recentTransactions.length > 0 && (
          <button
            type="button"
            className="text-sm font-medium text-zp-cyan/80 transition hover:text-zp-cyan"
          >
            View all
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.035] backdrop-blur-2xl">
        {!isReady ? (
          <div
            className="flex items-center gap-3 p-5"
            aria-label="Loading recent activity"
          >
            <div className="grid size-10 place-items-center rounded-full bg-white/5 text-zp-subtle">
              <History size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-zp-text">
                Loading activity
              </p>
              <p className="mt-0.5 text-xs text-zp-subtle">
                Restoring your payment history.
              </p>
            </div>
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="flex items-center gap-3 p-5">
            <div className="grid size-10 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
              <History size={18} />
            </div>

            <div>
              <p className="text-sm font-medium text-zp-text">
                No activity yet
              </p>
              <p className="mt-0.5 text-xs text-zp-subtle">
                Completed payments will appear here.
              </p>
            </div>
          </div>
        ) : (
          recentTransactions.map((transaction, index) => (
            <button
              key={transaction.id}
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-white/[0.04]",
                index !== recentTransactions.length - 1 &&
                  "border-b border-white/6",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-zp-cyan/10 text-zp-cyan">
                  <CheckCircle2 size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zp-text">
                    {getActivityTitle(transaction)}
                  </p>

                  <p className="mt-0.5 text-xs text-zp-subtle">
                    {formatActivityDate(transaction.createdAt)}
                    {" • "}
                    {getStatusLabel(transaction)}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <p className="text-sm font-semibold text-zp-text">
                  {transaction.direction === "sent" ? "−" : "+"}
                  {formatUsd(transaction.amountUsd)}
                </p>

                <ArrowUpRight
                  size={15}
                  className="text-zp-subtle"
                />
              </div>
            </button>
          ))
        )}
      </div>
    </section>
  );
}
