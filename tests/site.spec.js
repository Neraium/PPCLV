const { test, expect } = require("@playwright/test");
const { readdir, readFile } = require("node:fs/promises");
const { join } = require("node:path");

const productionOrigin = "https://professionalpoolcare.com";
const corePages = ["/index.html", "/services.html", "/about.html", "/contact.html"];
const utilityPages = ["/privacy.html", "/terms.html"];
const publicPages = [...corePages, ...utilityPages];
const requiredWidths = [390, 430, 768, 1024, 1440];
const expandedNames = ["industries.html", "our-work.html", "gallery.html", "faq.html", "commercial-pool-service-las-vegas.html"];

async function waitForPage(page, path) {
  const response = await page.goto(path);
  expect(response.ok(), `${path} should load`).toBeTruthy();
  await page.evaluate(() => document.fonts.ready);
}

test("Essential navigation promotes exactly four marketing pages", async ({ page }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    const links = await page.getByRole("navigation", { name: "Primary navigation" }).locator("a:not(.mobile-menu-cta)").evaluateAll((anchors) => anchors.map((anchor) => ({ text: anchor.textContent.trim(), href: anchor.getAttribute("href") })));
    expect(links).toEqual([
      { text: "Home", href: "index.html" },
      { text: "Services", href: "services.html" },
      { text: "About", href: "about.html" },
      { text: "Contact", href: "contact.html" }
    ]);
  }
});

test("footer is compact and promotes only the four-page journey", async ({ page }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    const footer = page.locator("footer");
    await expect(footer.getByText("Professional Pool Care LLC", { exact: true })).toBeVisible();
    await expect(footer.getByText("PPC LLC, The Difference Is Clear.", { exact: true })).toBeVisible();
    await expect(footer.getByText("Family owned and operated in Las Vegas since 2003.", { exact: true })).toBeVisible();
    await expect(footer.getByText("Greater Las Vegas Area", { exact: true })).toBeVisible();
    await expect(footer.getByRole("link", { name: "702-357-7027" })).toHaveAttribute("href", "tel:+17023577027");
    await expect(footer.getByRole("link", { name: "Adria@ProfessionalPoolCare.com" })).toHaveAttribute("href", "mailto:Adria@ProfessionalPoolCare.com");
    await expect(footer.getByText("Monday-Friday, 8:00 AM-4:00 PM", { exact: true })).toBeVisible();
    const links = await footer.getByRole("navigation", { name: "Footer navigation" }).locator("a").allTextContents();
    expect(links.map((text) => text.trim())).toEqual(["Home", "Services", "About", "Contact"]);
    await expect(footer.getByRole("link", { name: "Request Service" })).toHaveCount(1);
  }
});

test("homepage retains the required commercial journey", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Commercial Pool & Spa Service");
  await expect(page.getByRole("link", { name: "Request Service" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View Services" }).first()).toHaveAttribute("href", "services.html");
  await expect(page.getByRole("heading", { name: "Properties We Serve" })).toBeVisible();
  await expect(page.locator(".property-collage figure")).toHaveCount(4);
  await expect(page.locator(".property-collage figcaption")).toHaveText(["Apartment Community", "Commercial Spa", "Municipal Facility", "Commercial Facility"]);
});

test("homepage imagery is commercial, lazy below the hero, and not duplicated", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForPage(page, "/index.html");
  const hero = page.locator(".hero-image-panel img");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  expect(await hero.evaluate((image) => image.currentSrc.endsWith("resort-hotel-pool-deck-960.webp"))).toBeTruthy();
  const sources = await page.locator("main img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(new Set(sources).size).toBe(sources.length);
  const belowFoldLoading = await page.locator("main img:not(.hero-image-panel img)").evaluateAll((images) => images.map((image) => image.loading));
  expect(belowFoldLoading.every((value) => value === "lazy")).toBeTruthy();
  const altText = await page.locator("main img").evaluateAll((images) => images.map((image) => image.alt.trim()));
  expect(altText.every(Boolean)).toBeTruthy();
  expect(altText.every((alt) => /commercial|resort|apartment|spa|municipal|aquatic|pool|mechanical/i.test(alt))).toBeTruthy();
});

test("services are organized into the eight approved offerings with one scope note", async ({ page }) => {
  await waitForPage(page, "/services.html");
  await expect(page.locator(".service-group")).toHaveCount(3);
  await expect(page.locator(".service-items section")).toHaveCount(8);
  await expect(page.locator(".service-items h3")).toHaveText([
    "Commercial Pool Maintenance",
    "Commercial Spa Maintenance",
    "Equipment Repair & Troubleshooting",
    "Chemical Feed & Automation Support",
    "Acid Washing & Surface Restoration",
    "Emergency Service & Bio Cleanup",
    "Certified Pool Operator (CPO) Services",
    "Inspection-Readiness & Compliance Support"
  ]);
  await expect(page.locator(".service-group > .service-group-image")).toHaveCount(3);
  await expect(page.locator(".scope-note")).toHaveText("PPC supports maintenance and inspection readiness. Property owners and operators remain responsible for applicable regulatory requirements.");
});

test("contact form is simple, accessible, and posts to the Worker endpoint", async ({ page }) => {
  let requestBody = "";
  await page.route("**/contact-request", async (route) => {
    requestBody = route.request().postData() || "";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Thank you. PPC received your request and will follow up using the contact information provided."
      })
    });
  });

  await waitForPage(page, "/contact.html#quote");
  const form = page.locator("[data-quote-form]");
  await expect(form).toHaveAttribute("action", "/contact-request");
  await expect(form).toHaveAttribute("method", "post");
  await expect(form).toHaveAttribute("data-endpoint-configured", "true");
  for (const name of ["name", "company", "email", "phone", "service_needed", "message", "property_type", "privacy_consent", "website"]) {
    await expect(form.locator(`[name="${name}"]`)).toHaveCount(1);
  }
  for (const removedName of ["pools", "spas", "urgency", "preferred_contact"]) {
    await expect(form.locator(`[name="${removedName}"]`)).toHaveCount(0);
  }
  await expect(form.locator('[name="service_needed"] option:not([value=""])')).toHaveText([
    "Commercial Pool Maintenance",
    "Commercial Spa Maintenance",
    "Equipment Repair & Troubleshooting",
    "Chemical Feed & Automation Support",
    "Acid Washing & Surface Restoration",
    "Emergency Service & Bio Cleanup",
    "Certified Pool Operator (CPO) Services",
    "Inspection-Readiness & Compliance Support"
  ]);
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(form.locator('[name="name"]')).toBeFocused();
  await form.locator('[name="name"]').fill("Test User");
  await form.locator('[name="company"]').fill("Test Property");
  await form.locator('[name="service_needed"]').selectOption({ index: 1 });
  await form.locator('[name="message"]').fill("Routine commercial service request.");
  await form.locator('[name="privacy_consent"]').check();
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(page.getByRole("status")).toContainText("email address or phone number");
  await expect(form.locator('[name="email"]')).toBeFocused();
  await form.locator('[name="email"]').fill("manager@professionalpoolcare.com");
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(page.getByRole("status")).toHaveText("Thank you. PPC received your request and will follow up using the contact information provided.");
  expect(requestBody).toContain("Test User");
  expect(requestBody).toContain("Test Property");
  expect(requestBody).not.toContain("Adria%40ProfessionalPoolCare.com");
});

test("core pages have exact unique SEO titles and descriptions", async ({ page }) => {
  const expectedTitles = new Map([
    ["/index.html", "PPC LLC | Commercial Pool & Spa Service in Las Vegas"],
    ["/services.html", "Commercial Pool & Spa Services | PPC LLC"],
    ["/about.html", "About PPC LLC | Professional Pool Care"],
    ["/contact.html", "Contact PPC LLC | Request Commercial Pool Service"]
  ]);
  const descriptions = [];
  for (const path of corePages) {
    await waitForPage(page, path);
    await expect(page).toHaveTitle(expectedTitles.get(path));
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const expectedCanonical = path === "/index.html" ? `${productionOrigin}/` : `${productionOrigin}${path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedCanonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expectedCanonical);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toMatch(/^https:\/\/professionalpoolcare\.com\/images\/.+/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description.trim().length).toBeGreaterThan(70);
    descriptions.push(description);
  }
  expect(new Set(descriptions).size).toBe(corePages.length);
});

test("public pages contain no expanded links, visible development language, em dashes, or conflict markers", async ({ page }) => {
  const forbiddenVisible = /website concept|concept form|endpoint not configured|not yet connected|production setup|\bplaceholder\b|\bpreview\b|\bdemo\b|\btemporary\b|request a call/i;
  for (const path of publicPages) {
    await waitForPage(page, path);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(forbiddenVisible);
    expect(text).not.toContain("—");
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")));
    for (const expandedName of expandedNames) expect(hrefs.some((href) => href.includes(expandedName))).toBeFalsy();
    const source = await page.content();
    const conflictMarkers = ["<".repeat(7), "=".repeat(7), ">".repeat(7)];
    expect(conflictMarkers.some((marker) => source.includes(marker))).toBeFalsy();
    expect(source).not.toContain("neraium.github.io");
    expect(source).not.toContain("localhost");
    expect(source).not.toContain("FORM_ENDPOINT");
  }
});

test("all internal links and fragments resolve", async ({ page, request }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    const hrefs = await page.locator('a[href]:not([href^="mailto:"]):not([href^="tel:"])').evaluateAll((anchors) => [...new Set(anchors.map((anchor) => anchor.getAttribute("href")))]);
    for (const href of hrefs) {
      const url = new URL(href, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;
      const response = await request.get(url.href.split("#")[0]);
      expect(response.ok(), `${path}: ${href} should load`).toBeTruthy();
      if (url.hash) {
        await page.goto(url.href);
        await expect(page.locator(url.hash)).toHaveCount(1);
      }
    }
  }
});

for (const width of requiredWidths) {
  for (const path of corePages) {
    test(`${path} has no overflow or broken imagery at ${width}px`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        const sourceUrl = message.location().url;
        if (message.type() === "error" && (!sourceUrl || new URL(sourceUrl).origin === new URL(page.url()).origin)) errors.push(message.text());
      });
      await page.setViewportSize({ width, height: width < 768 ? 860 : 950 });
      await waitForPage(page, path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
      for (const image of await page.locator("img").all()) await image.scrollIntoViewIfNeeded();
      const failedImages = await page.locator("img").evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
      expect(failedImages).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("mobile header is centered, stable, and keeps Request Service inside the menu", async ({ page }) => {
  for (const width of [390, 430, 768]) {
    await page.setViewportSize({ width, height: 860 });
    await waitForPage(page, "/index.html");
    const header = page.locator("[data-site-header]");
    const initial = await header.boundingBox();
    const logo = await page.locator(".logo-link").boundingBox();
    const logoImage = await page.locator(".site-logo").boundingBox();
    const naturalLogoSize = await page.locator(".site-logo").evaluate((image) => ({ width: image.naturalWidth, height: image.naturalHeight }));
    expect(Math.abs((logo.x + logo.width / 2) - width / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs((logoImage.x + logoImage.width / 2) - width / 2)).toBeLessThanOrEqual(1);
    expect(logoImage.width).toBeGreaterThanOrEqual(width <= 430 ? 260 : 275);
    expect(logoImage.height).toBeLessThanOrEqual(initial.height * 1.6);
    expect(logo.y).toBeGreaterThanOrEqual(initial.y);
    expect(logo.y + logo.height).toBeLessThanOrEqual(initial.y + initial.height);
    expect(naturalLogoSize.width).toBeGreaterThan(logoImage.width);
    expect(naturalLogoSize.height).toBeGreaterThan(logoImage.height);
    await expect(page.locator(".header-cta")).toBeHidden();
    const toggle = page.getByRole("button", { name: "Menu" });
    const toggleBox = await toggle.boundingBox();
    expect(toggleBox.x - (logo.x + logo.width)).toBeGreaterThanOrEqual(24);
    expect(Math.abs((toggleBox.y + toggleBox.height / 2) - (initial.y + initial.height / 2))).toBeLessThanOrEqual(2);
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".mobile-menu-cta")).toBeVisible();
    const open = await header.boundingBox();
    expect(Math.abs(open.height - initial.height)).toBeLessThanOrEqual(1);
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrolled = await header.boundingBox();
    expect(Math.abs(scrolled.height - initial.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(scrolled.y)).toBeLessThanOrEqual(1);
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
  }
});

test("desktop header remains stable during scroll", async ({ page }) => {
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await waitForPage(page, "/index.html");
    const header = page.locator("[data-site-header]");
    const initial = await header.boundingBox();
    const logoImage = await page.locator(".site-logo").boundingBox();
    expect(logoImage.width).toBeGreaterThanOrEqual(220);
    expect(logoImage.height).toBeLessThanOrEqual(initial.height * 1.3);
    await page.evaluate(() => window.scrollTo(0, 600));
    const scrolled = await header.boundingBox();
    expect(Math.abs(scrolled.height - initial.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(scrolled.y)).toBeLessThanOrEqual(1);
  }
});

test("sitemap and robots use the production domain", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(locations).toEqual([
    "https://professionalpoolcare.com/",
    "https://professionalpoolcare.com/services.html",
    "https://professionalpoolcare.com/about.html",
    "https://professionalpoolcare.com/contact.html"
  ]);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://professionalpoolcare.com/sitemap.xml");
  expect(`${sitemap}\n${robots}`).not.toContain("neraium.github.io");
});

test("expanded sources are noindexed and excluded from the built site", async () => {
  const archiveDirectory = join(process.cwd(), "archive", "expanded");
  for (const name of expandedNames) {
    const source = await readFile(join(archiveDirectory, name), "utf8");
    expect(source).toMatch(/<meta name="robots" content="noindex, (?:nofollow|follow)">/);
  }
  const builtHtml = (await readdir(join(process.cwd(), "dist"))).filter((name) => name.endsWith(".html")).sort();
  expect(builtHtml).toEqual(["about.html", "contact.html", "index.html", "privacy.html", "services.html", "terms.html"]);
  const builtImages = await readdir(join(process.cwd(), "dist", "images"));
  expect(builtImages).not.toContain("README.md");
  expect(builtImages).not.toContain("logo.png");
});

test("keyboard focus is visibly styled", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((element) => getComputedStyle(element).outlineWidth);
  expect(parseFloat(outline)).toBeGreaterThanOrEqual(2);
});

test("Worker contact endpoint validates, rejects spam, sends to Adria only, and fails gracefully without binding", async () => {
  const worker = await import("../worker/index.mjs");
  const makeRequest = (fields) => {
    const form = new URLSearchParams(fields);
    return new Request("https://professionalpoolcare.com/contact-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: form
    });
  };

  const validFields = {
    name: "Ada Manager",
    company: "Commercial Property",
    email: "manager@professionalpoolcare.com",
    phone: "",
    service_needed: "Commercial Pool Maintenance",
    property_type: "Apartment or multifamily community",
    message: "Please contact me about commercial pool maintenance for our property.",
    privacy_consent: "on",
    website: ""
  };

  const sentMessages = [];
  const success = await worker.handleContactRequest(makeRequest(validFields), {
    PPC_CONTACT_EMAIL: {
      send: async (message) => {
        sentMessages.push(message);
        return { messageId: "test-message" };
      }
    }
  });
  expect(success.status).toBe(200);
  expect(await success.json()).toMatchObject({ ok: true });
  expect(sentMessages).toHaveLength(1);
  expect(sentMessages[0].to).toEqual({
    email: "Adria@ProfessionalPoolCare.com",
    name: "Professional Pool Care LLC"
  });
  expect(sentMessages[0].from.email).toBe("Adria@ProfessionalPoolCare.com");
  expect(sentMessages[0].replyTo.email).toBe("manager@professionalpoolcare.com");

  const invalid = await worker.handleContactRequest(makeRequest({ ...validFields, email: "", phone: "", message: "short" }), {
    PPC_CONTACT_EMAIL: { send: async () => ({ messageId: "not-used" }) }
  });
  expect(invalid.status).toBe(400);
  const invalidBody = await invalid.json();
  expect(invalidBody.errors).toContain("Email or phone is required.");
  expect(invalidBody.errors).toContain("Message is too short.");

  const spam = await worker.handleContactRequest(makeRequest({ ...validFields, website: "https://spam.invalid" }), {
    PPC_CONTACT_EMAIL: { send: async () => ({ messageId: "not-used" }) }
  });
  expect(spam.status).toBe(400);
  expect(await spam.json()).toMatchObject({ ok: false, message: "Submission blocked. Please refresh and try again." });

  const noBinding = await worker.handleContactRequest(makeRequest(validFields), {});
  expect(noBinding.status).toBe(503);
  expect(await noBinding.json()).toMatchObject({
    ok: false,
    message: "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com."
  });
});

test("production build excludes source-only and development artifacts", async () => {
  const builtFiles = await readdir(join(process.cwd(), "dist"));
  expect(builtFiles).toEqual(expect.arrayContaining(["index.html", "services.html", "about.html", "contact.html", "privacy.html", "terms.html", "robots.txt", "sitemap.xml", "styles.css", "script.js", "images"]));
  for (const forbidden of ["node_modules", ".planning", "tests", "test-artifacts", "archive", "README.md", "package.json", "wrangler.jsonc"]) {
    expect(builtFiles).not.toContain(forbidden);
  }
});
