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