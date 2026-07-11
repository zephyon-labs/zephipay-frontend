import { expect, test } from "@playwright/test";

test.describe("ZephiPay mobile experience", () => {
  test("home loads with zero balance", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Zephdek" }),
    ).toBeVisible();

    await expect(page.getByText("$0.00")).toBeVisible();

    await expect(
      page.getByText("Account ready for testing."),
    ).toBeVisible();
  });

  test("smart card expands and collapses", async ({ page }) => {
    await page.goto("/");

    const smartCardButton = page.getByRole("button", {
      name: /Smart Card/i,
    });

    await expect(page.getByText("AI Assist")).not.toBeVisible();

    await smartCardButton.click();

    await expect(page.getByText("AI Assist")).toBeVisible();
    await expect(page.getByText("Subscriptions")).toBeVisible();
    await expect(page.getByText("Tipping")).toBeVisible();
    await expect(page.getByText("Receipts")).toBeVisible();

    await smartCardButton.click();

    await expect(page.getByText("AI Assist")).not.toBeVisible();
  });

  test("wallet navigation works and preserves the balance", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Wallet" })
      .click();

    await expect(page).toHaveURL(/\/wallet$/);

    await expect(
      page.getByRole("heading", { name: "Wallet" }),
    ).toBeVisible();

    await expect(page.getByText("$0.00").first()).toBeVisible();
    await expect(page.getByText("0.00 SOL")).toBeVisible();
  });

  test("profile sheet opens and closes", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: "Open profile" })
      .click();

    const profileSheet = page.getByRole("complementary", {
      name: "Profile panel",
    });

    await expect(profileSheet).toBeVisible();

    await expect(
      profileSheet.getByRole("heading", { name: "Zephdek" }),
    ).toBeVisible();

    await expect(
      profileSheet.getByText("Verified"),
    ).toBeVisible();

    await expect(
      profileSheet.getByText("ZTS"),
    ).toBeVisible();

    await expect(
      profileSheet.getByText("4,260"),
    ).toBeVisible();

    await profileSheet
      .getByRole("button", { name: "Close profile" })
      .click();

    await expect(profileSheet).not.toBeVisible();
  });
});

test("completed transaction appears in recent activity and survives refresh", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "zephipay-transaction-state-v1",
      JSON.stringify({
        transactions: [
          {
            id: "txn-e2e-001",
            recipient:
              "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgRhX",
            amountUsd: 24.5,
            purpose: "Personal",
            direction: "sent",
            status: "confirmed",
            rail: "solana-devnet",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            receipt: {
              id: "receipt-e2e-001",
              receiptAddress: "receipt-address-e2e",
              transactionSignature: "signature-e2e",
              createdAt: new Date().toISOString(),
            },
          },
        ],
        activeTransactionId: "txn-e2e-001",
      }),
    );
  });

  await page.goto("/");

  await expect(
    page.getByText("Paid 7xKXtg...osgRhX"),
  ).toBeVisible();

  await expect(page.getByText("$24.50")).toBeVisible();
  await expect(page.getByText("Today • Delivered")).toBeVisible();

  await page.reload();

  await expect(
    page.getByText("Paid 7xKXtg...osgRhX"),
  ).toBeVisible();

  await expect(page.getByText("$24.50")).toBeVisible();
});

test("funding the beta account updates and persists the balance", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Fund" }).click();

  await expect(
    page.getByRole("dialog", { name: "Fund Test Account" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "$25" }).click();
  await page.getByRole("button", { name: "Add Test Funds" }).click();

  await expect(page.getByText("$25.00").first()).toBeVisible();

  await page.getByRole("link", { name: "Wallet" }).click();

  await expect(page).toHaveURL(/\/wallet$/);
  await expect(page.getByText("$25.00").first()).toBeVisible();

  await page.reload();

  await expect(page.getByText("$25.00").first()).toBeVisible();
});

test("send form accepts a broad recipient and normalizes the amount", async ({
  page,
}) => {
  await page.goto("/send");

  await page
    .getByLabel("Who are you paying?")
    .fill("@zephdek");

  await page.getByLabel("Amount").fill("12.5");

  await page
    .getByLabel("Payment purpose")
    .selectOption("Personal");

  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(
    /\/confirm\?recipient=%40zephdek&amount=12\.50&purpose=Personal/,
  );

  await expect(page.getByText("$12.50")).toBeVisible();
  await expect(page.getByText("@zephdek")).toBeVisible();
});

