import { expect, test } from "@playwright/test";

const mockRestaurantsBody = JSON.stringify({
  ok: true,
  businesses: [
    {
      id: "mock-1",
      name: "Mock Cafe",
      rating: 4.5,
      reviewCount: 42,
      address: "123 Test St",
      latitude: 25.7617,
      longitude: -80.1918,
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
});

test.describe("search (API mocked in browser)", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      (url) => url.pathname === "/api/restaurants",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: mockRestaurantsBody,
        });
      },
    );
  });

  test("typing a city (after debounce) shows mocked results", async ({ page }) => {
    await page.goto("/");
    const input = page.getByPlaceholder("e.g. Miami, FL or Austin");
    await input.fill("Miami");
    // Desktop viewport shows the data grid; mobile markup (h3 cards) stays in DOM but hidden.
    const table = page.locator("table");
    await expect(table.getByText("Mock Cafe", { exact: true })).toBeVisible({
      timeout: 15_000,
    });
    await expect(table.getByText("123 Test St")).toBeVisible();
  });
});
