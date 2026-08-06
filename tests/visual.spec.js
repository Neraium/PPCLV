const { test, expect } = require("@playwright/test");
const { mkdir } = require("node:fs/promises");

const output = "test-artifacts/screenshots/essential-review";
const widths = [390, 430, 768, 1024, 1440];
const reviewPages = [
  { name: "home", path: "/index.html" },
  { name: "services", path: "/services.html" },
  { name: "about", path: "/about.html" },
  { name: "contact", path: "/contact.html" }
];

async function preparePage(page, path) {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const reviewPage of reviewPages) {
  for (const width of widths) {
    test(`${reviewPage.name} Essential review at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 768 ? 900 : 1000 });
      await preparePage(page, reviewPage.path);
      await mkdir(output, { recursive: true });
      await page.screenshot({ path: `${output}/${reviewPage.name}-${width}.jpg`, type: "jpeg", quality: 82, fullPage: true });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
    });
  }
}

for (const width of [390, 430]) {
  test(`mobile navigation review at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await preparePage(page, "/index.html");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await mkdir(output, { recursive: true });
    await page.screenshot({ path: `${output}/mobile-navigation-open-${width}.jpg`, type: "jpeg", quality: 86 });
  });
}
