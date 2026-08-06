const { test, expect } = require("@playwright/test");

const publicPages = [
  "/index.html",
  "/services.html",
  "/industries.html",
  "/our-work.html",
  "/about.html",
  "/faq.html",
  "/contact.html",
  "/commercial-pool-service-las-vegas.html",
  "/privacy.html",
  "/terms.html"
];

const headerWidths = [320, 375, 390, 430, 768, 1024, 1440];

async function waitForPage(page, path) {
  const response = await page.goto(path);
  expect(response.ok(), `${path} should load`).toBeTruthy();
  await page.evaluate(() => document.fonts.ready);
}

test("homepage loads with a clear primary journey", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await expect(page).toHaveTitle(/PPC LLC/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Commercial Pool");
  await expect(page.getByRole("link", { name: "Request Service" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore Services" })).toHaveAttribute("href", "services.html");
});

test("homepage prioritizes a responsive hero and defers below-fold images", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await waitForPage(page, "/index.html");
  const hero = page.locator(".hero-image-panel img");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  expect(await hero.evaluate((image) => image.currentSrc.endsWith("resort-hotel-pool-deck-960.webp"))).toBeTruthy();
  const belowFoldLoading = await page.locator("main img").evaluateAll((images) => images.filter((image) => !image.closest(".hero-image-panel")).map((image) => image.loading));
  expect(belowFoldLoading.every((value) => value === "lazy")).toBeTruthy();
});

test("every primary navigation route loads", async ({ page, request }) => {
  await waitForPage(page, "/index.html");
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  for (const name of ["Services", "Industries", "Our Work", "About", "FAQ", "Contact"]) {
    const link = navigation.getByRole("link", { name, exact: true });
    const href = await link.getAttribute("href");
    expect(href).toMatch(/\.html/);
    expect((await request.get(new URL(href, page.url()).href)).ok(), `${name} should load`).toBeTruthy();
  }
});

test("all service CTAs resolve across the public site", async ({ page, request }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    const hrefs = await page.locator("a.btn, a.header-cta, a.mobile-menu-cta, a.footer-service-link").evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
    for (const href of hrefs) {
      const destination = new URL(href, page.url());
      const response = await request.get(destination.href.split("#")[0]);
      expect(response.ok(), `${path}: ${href} should load`).toBeTruthy();
    }
  }
});

test("mobile menu is accessible, stable, and uses comfortable targets", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await waitForPage(page, "/index.html");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(menu).toBeVisible();
  const targetHeights = await page.locator(".menu-toggle, .primary-nav a, .header-cta").evaluateAll((elements) => elements.filter((element) => getComputedStyle(element).display !== "none").map((element) => element.getBoundingClientRect().height));
  expect(targetHeights.every((height) => height >= 44)).toBeTruthy();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("contact form has native validation and honest unconfigured feedback", async ({ page }) => {
  await waitForPage(page, "/contact.html#quote");
  const form = page.locator("[data-quote-form]");
  await expect(form).toHaveAttribute("data-endpoint-configured", "false");
  await expect(page.getByText("This concept form would be connected")).toBeVisible();
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
  await expect(page.getByRole("status")).toContainText("not yet connected to a live inbox");
});

for (const path of publicPages) {
  test(`${path} has one H1, no overflow, broken images, or browser errors`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width: 320, height: 800 });
    await waitForPage(page, path);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
    for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
    const failedImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(failedImages).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("legacy gallery URL resolves to the Our Work page", async ({ page }) => {
  await page.goto("/gallery.html");
  await page.waitForURL(/our-work\.html$/);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("keyboard focus is visibly styled", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  const focusStyle = await skip.evaluate((element) => getComputedStyle(element));
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(parseFloat(focusStyle.outlineWidth)).toBeGreaterThanOrEqual(2);
});

for (const width of headerWidths) {
  test(`header and homepage layout remain stable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await waitForPage(page, "/index.html");
    const header = page.locator("[data-site-header]");
    const initial = await header.boundingBox();
    expect(initial.height).toBeLessThanOrEqual(90);
    expect(await page.locator(".logo-link").evaluate((element) => element.getBoundingClientRect().width)).toBeGreaterThanOrEqual(108);
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    const scrolled = await header.boundingBox();
    expect(Math.abs(scrolled.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(scrolled.height - initial.height)).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
  });
}

test("all internal links, fragments, and footer routes resolve", async ({ page, request }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    await expect(page.getByRole("navigation", { name: "Footer navigation" })).toBeVisible();
    const links = await page.locator('a[href]:not([href^="mailto:"]):not([href^="tel:"])').evaluateAll((anchors) => [...new Set(anchors.map((anchor) => anchor.getAttribute("href")))]);
    for (const href of links) {
      const url = new URL(href, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      const response = await request.get(url.href.split("#")[0]);
      expect(response.ok(), `${path}: ${href}`).toBeTruthy();
      if (url.hash) {
        await page.goto(url.href);
        await expect(page.locator(url.hash)).toHaveCount(1);
      }
    }
  }
});

test("representative-image source disclaimers remain intact", async ({ request }) => {
  const homepage = await (await request.get("/index.html")).text();
  const workPage = await (await request.get("/our-work.html")).text();
  expect(homepage).toContain("Temporary commercial resort hero image");
  expect(homepage).toContain("do not imply this is a PPC project until verified");
  expect(workPage).toContain("before implying the image shows PPC work");
  expect(workPage).toContain("not presented as completed PPC projects");
});
