import { beforeEach, describe, expect, it } from "vitest";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  TransactionProvider,
  useTransactions,
} from "@/state/transaction-provider";

function TransactionHarness() {
  const {
    transactions,
    activeTransaction,
    isReady,
    recordCompletedTransaction,
    resetTransactions,
  } = useTransactions();

  return (
    <div>
      <p data-testid="ready">{String(isReady)}</p>
      <p data-testid="count">{transactions.length}</p>
      <p data-testid="active-id">
        {activeTransaction?.id ?? "none"}
      </p>
      <p data-testid="recipient">
        {activeTransaction?.recipient ?? "none"}
      </p>
      <p data-testid="amount">
        {activeTransaction?.amountUsd ?? 0}
      </p>
      <p data-testid="purpose">
        {activeTransaction?.purpose ?? "none"}
      </p>
      <p data-testid="status">
        {activeTransaction?.status ?? "none"}
      </p>
      <p data-testid="rail">
        {activeTransaction?.rail ?? "none"}
      </p>
      <p data-testid="receipt-address">
        {activeTransaction?.receipt?.receiptAddress ?? "none"}
      </p>
      <p data-testid="signature">
        {activeTransaction?.receipt?.transactionSignature ??
          "none"}
      </p>

      <button
        onClick={() =>
          recordCompletedTransaction({
            recipient:
              "  7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgRhX  ",
            amountUsd: 24.5,
            purpose: "  Personal  ",
            receiptAddress: "receipt-address-123",
            transactionSignature: "signature-123",
          })
        }
      >
        Record transaction
      </button>

      <button
        onClick={() =>
          recordCompletedTransaction({
            recipient: "wallet-two",
            amountUsd: -50,
            purpose: "",
          })
        }
      >
        Record normalized transaction
      </button>

      <button onClick={resetTransactions}>
        Reset transactions
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <TransactionProvider>
      <TransactionHarness />
    </TransactionProvider>,
  );
}

async function waitUntilReady() {
  await waitFor(() => {
    expect(screen.getByTestId("ready")).toHaveTextContent(
      "true",
    );
  });
}

describe("TransactionProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with no transactions", async () => {
    renderProvider();
    await waitUntilReady();

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("active-id")).toHaveTextContent(
      "none",
    );
  });

  it("records a completed transaction and receipt", async () => {
    const user = userEvent.setup();

    renderProvider();
    await waitUntilReady();

    await user.click(
      screen.getByRole("button", {
        name: "Record transaction",
      }),
    );

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("recipient")).toHaveTextContent(
      "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgRhX",
    );
    expect(screen.getByTestId("amount")).toHaveTextContent(
      "24.5",
    );
    expect(screen.getByTestId("purpose")).toHaveTextContent(
      "Personal",
    );
    expect(screen.getByTestId("status")).toHaveTextContent(
      "confirmed",
    );
    expect(screen.getByTestId("rail")).toHaveTextContent(
      "solana-devnet",
    );
    expect(
      screen.getByTestId("receipt-address"),
    ).toHaveTextContent("receipt-address-123");
    expect(screen.getByTestId("signature")).toHaveTextContent(
      "signature-123",
    );

    expect(
      screen.getByTestId("active-id").textContent,
    ).not.toBe("none");
  });

  it("normalizes negative amounts and blank purposes", async () => {
    const user = userEvent.setup();

    renderProvider();
    await waitUntilReady();

    await user.click(
      screen.getByRole("button", {
        name: "Record normalized transaction",
      }),
    );

    expect(screen.getByTestId("amount")).toHaveTextContent("0");
    expect(screen.getByTestId("purpose")).toHaveTextContent(
      "General",
    );
    expect(
      screen.getByTestId("receipt-address"),
    ).toHaveTextContent("none");
    expect(screen.getByTestId("signature")).toHaveTextContent(
      "none",
    );
  });

  it("persists transaction state in local storage", async () => {
    const user = userEvent.setup();

    const firstRender = renderProvider();
    await waitUntilReady();

    await user.click(
      screen.getByRole("button", {
        name: "Record transaction",
      }),
    );

    await waitFor(() => {
      const storedState = window.localStorage.getItem(
        "zephipay-transaction-state-v1",
      );

      expect(storedState).not.toBeNull();
      expect(storedState).toContain(
        "receipt-address-123",
      );
    });

    firstRender.unmount();

    renderProvider();
    await waitUntilReady();

    expect(screen.getByTestId("count")).toHaveTextContent("1");
    expect(screen.getByTestId("recipient")).toHaveTextContent(
      "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgRhX",
    );
  });

  it("resets transactions and removes persisted state", async () => {
    const user = userEvent.setup();

    renderProvider();
    await waitUntilReady();

    await user.click(
      screen.getByRole("button", {
        name: "Record transaction",
      }),
    );

    expect(screen.getByTestId("count")).toHaveTextContent("1");

    await user.click(
      screen.getByRole("button", {
        name: "Reset transactions",
      }),
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
    expect(screen.getByTestId("active-id")).toHaveTextContent(
      "none",
    );

    await waitFor(() => {
      expect(
        window.localStorage.getItem(
          "zephipay-transaction-state-v1",
        ),
      ).toBeNull();
    });
  });
});
