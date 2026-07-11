import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AccountProvider } from "@/state/account-provider";
import { TransactionProvider } from "@/state/transaction-provider";
import ZephiWalletProvider from "./wallet-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZephiPay",
  description:
    "Simple, receipt-backed payments powered by Zephyon Protocol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ZephiWalletProvider>
          <AccountProvider>
            <TransactionProvider>
              {children}
            </TransactionProvider>
          </AccountProvider>
        </ZephiWalletProvider>
      </body>
    </html>
  );
}
