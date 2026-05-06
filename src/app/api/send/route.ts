import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const PROTOCOL_DIR = "/home/zeranova/dev/zephyon/zephyon-protocol";
const MINT = "2w2nqMemQzjwKMk3jEmtXnBqGBXGJLs8FNfb5Khb8E7J";
const DEFAULT_RECIPIENT = "DWLaEPUUyLgPqhoJDGni8PRaL58FdfSmXdL6Qtrp1hJ8";

export async function POST(req: Request) {
  const body = await req.json();
  const { recipient, amount } = body;

  const recipientPubkey = recipient || DEFAULT_RECIPIENT;
  const amountRaw = amount || "50";

  try {
    const { stdout, stderr } = await execFileAsync(
      "npx",
      [
        "ts-node-esm",
        "scripts/pay_devnet.ts",
        MINT,
        recipientPubkey,
        String(amountRaw),
      ],
      {
        cwd: PROTOCOL_DIR,
      }
    );

    if (stderr) {
      console.warn(stderr);
    }

    const marker = "--- JSON_RESULT ---";
    const jsonText = stdout.split(marker)[1]?.trim();

    if (!jsonText) {
      throw new Error("No JSON_RESULT found in protocol script output.");
    }

    const result = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      signature: result.tx,
      receiptId: result.receiptPda,
      treasury: result.treasury,
      mint: result.mint,
      recipient: result.recipient,
      amountRaw: result.amountRaw,
      payCountBefore: result.payCountBefore,
      payCountAfter: result.payCountAfter,
    });
  } catch (error) {
    console.error("Real devnet send failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Real devnet send failed",
      },
      { status: 500 }
    );
  }
}