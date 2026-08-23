const { existsSync } = require("node:fs");
const { defineConfig, devices, firefox } = require("@playwright/test");

const projects = [
  {
    name: "chromium-desktop",
    use: { ...devices["Desktop Chrome"] }
  },
  {
    name: "chromium-mobile",
    use: { ...devices["Pixel 5"] }
  },
  {
    name: "webkit",
    use: { ...devices["Desktop Safari"] }
  }
];

if (existsSync(firefox.executablePath())) {
  projects.push({
    name: "firefox",
    use: { ...devices["Desktop Firefox"] }
  });
}

module.exports = defineConfig({
  testDir: "./tests",
  outputDir: "test-artifacts/playwright-results",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"], ["html", { outputFolder: "test-artifacts/playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
    trace: "retain-on-failure"
  },
  projects,
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1",
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: true
  }
});
