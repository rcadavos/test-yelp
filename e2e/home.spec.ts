import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("shows hero, search form, and short-query hint", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Discover restaurants worth/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Search by city" })).toBeVisible();
    await expect(
      page.getByRole("search", { name: /Restaurant Finder.*search by city/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("e.g. Miami, FL or Austin")).toBeVisible();
    await expect(
      page.getByText("Enter at least two characters to search."),
    ).toBeVisible();
  });
});
