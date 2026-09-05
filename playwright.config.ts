import { defineConfig, devices } from "@playwright/test";

const URL = `http://localhost:${process.env.PORT}`;

export default defineConfig({
  fullyParallel: true,
  retries: 1,
  workers: "25%",
  timeout: 10000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.1,
    },
  },
  reporter: "json",
  use: {
    baseURL: URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm preview",
    url: URL,
  },
});
