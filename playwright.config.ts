import { defineConfig, devices } from "@playwright/test";

/** Default avoids clashing with a developer's `next dev` on :3000. */
const E2E_PORT = Number(process.env.E2E_PORT ?? "3010");
const baseURL = `http://127.0.0.1:${E2E_PORT}`;

/**
 * Browser E2E tests (Playwright is not a unit-test runner; use Vitest/Jest for units).
 * Uses `next start` so tests can run while another `next dev` is already running (Next.js allows one dev server per app dir).
 * @see https://playwright.dev/docs/intro
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npm run start -- -p ${E2E_PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
