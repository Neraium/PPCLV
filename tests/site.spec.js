const { test, expect } = require("@playwright/test");

const pages = [
  "/index.html", "/services.html", "/industries.html", "/our-work.html",
  "/about.html", "/faq.html", "/contact.html",
  "/commercial-pool-service-las-vegas.html", "/privacy.html", "/terms.html"
];

test("homepage loads with its primary journey", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page).toHaveTitle(/PPC LLC/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Commercial Pool");
  await expect(page.getByRole("link", { name: "Request Service" }).first()).toBeVisible();
});

test("desktop navigation and every primary CTA reach their destination", async ({ page }) => {
  await page.goto("/index.html");
  for (const name of ["Services", "Industries", "Our Work", "About", "FAQ", "Contact"]) {
    const link = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", /\.html/);
  }
  const hrefs = await page.locator('a.btn-primary, a.header-cta, a.mobile-menu-cta').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
  for (const href of hrefs) {
    const response = await page.request.get(new URL(href, page.url()).href.split("#")[0]);
    expect(response.ok(), `${href} should load`).toBeTruthy();
  }
});

test("mobile menu opens, closes with Escape, and has usable targets", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/index.html");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  const targetHeight = await toggle.evaluate((element) => element.getBoundingClientRect().height);
  expect(targetHeight).toBeGreaterThanOrEqual(44);
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("form has native validation and honest endpoint feedback", async ({ page }) => {
  await page.goto("/contact.html#quote");
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(page.locator('input[name="name"]')).toBeFocused();
  await page.locator('input[name="name"]').fill("Test User");
  await page.locator('input[name="company"]').fill("Test Property");
  await page.locator('input[name="email"]').fill("test@example.com");
  await page.locator('input[name="phone"]').fill("7025550100");
  await page.locator('select[name="property_type"]').selectOption({ index: 1 });
  await page.locator('select[name="service_needed"]').selectOption({ index: 1 });
  await page.locator('select[name="urgency"]').selectOption({ index: 1 });
  await page.locator('textarea[name="message"]').fill("Routine commercial service request.");
  await page.locator('input[name="privacy_consent"]').check();
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(page.getByRole("status")).toContainText("not yet connected");
});

for (const path of pages) {
  test(`${path} has one H1, no overflow, broken images, or browser errors`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width: 320, height: 800 });
    const response = await page.goto(path);
    expect(response.ok()).toBeTruthy();
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
    const failedImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(failedImages).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("keyboard focus is visibly styled", async ({ page }) => {
  await page.goto("/index.html");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  expect(await skip.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
});

for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`homepage layout holds at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/index.html");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-site-header]")).toBeVisible();
  });
}

test("all internal links and fragments resolve", async ({ page, request }) => {
  for (const path of pages) {
    await page.goto(path);
    const links = await page.locator('a[href]:not([href^="mailto:"]):not([href^="tel:"])').evaluateAll((anchors) => [...new Set(anchors.map((anchor) => anchor.getAttribute("href")))]);
    for (const href of links) {
      const url = new URL(href, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      const response = await request.get(url.href.split("#")[0]);
      expect(response.ok(), `${path}: ${href}`).toBeTruthy();
      if (url.hash && url.pathname !== "/gallery.html") {
        await page.goto(url.href);
        await expect(page.locator(url.hash)).toHaveCount(1);
      }
    }
  }
});
