const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  outputDir: "test-artifacts/playwright-results",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"], ["html", { outputFolder: "test-artifacts/playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    headless: true,
    trace: "retain-on-failure"
  },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1",
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: true
  }
});
