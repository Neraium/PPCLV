const { test, expect } = require("@playwright/test");
const { mkdir } = require("node:fs/promises");

for (const width of [375, 390, 430, 1024, 1440]) {
  test(`homepage screenshot at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 900 : 1000 });
    await page.goto("/index.html");
    for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
    await expect(page.locator("img").last()).toHaveJSProperty("complete", true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await mkdir("test-artifacts/screenshots", { recursive: true });
    await page.screenshot({ path: `test-artifacts/screenshots/home-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  });
}
