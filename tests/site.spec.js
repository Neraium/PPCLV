const { test, expect } = require("@playwright/test");
const { spawnSync } = require("node:child_process");
const { readdir, readFile } = require("node:fs/promises");
const { join } = require("node:path");

const productionOrigin = "https://professionalpoolcare.com";
const corePages = ["/index.html", "/services.html", "/properties.html", "/about.html", "/contact.html", "/faq.html"];
const utilityPages = ["/privacy.html", "/terms.html"];
const publicPages = [...corePages, ...utilityPages];
const requiredWidths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const archivedExpandedNames = ["industries.html", "our-work.html", "gallery.html", "faq.html", "commercial-pool-service-las-vegas.html"];
const nonPublicExpandedNames = archivedExpandedNames.filter((name) => name !== "faq.html");

const validContactFields = {
  name: "Ada Manager",
  company: "Commercial Property",
  email: "manager@professionalpoolcare.com",
  phone: "702-555-0100",
  service_needed: "Commercial Pool Maintenance",
  property_type: "Apartment or multifamily community",
  message: "Please contact me about commercial pool maintenance for our property.",
  privacy_consent: "on",
  website: ""
};

const makeContactRequest = (fields = validContactFields) =>
  new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    body: new URLSearchParams(fields)
  });

const makeZohoEnv = () => ({
  ZOHO_CLIENT_ID: "__server_only_client_id__",
  ZOHO_CLIENT_SECRET: "__server_only_client_secret__",
  ZOHO_REFRESH_TOKEN: "__server_only_refresh_token__",
  ZOHO_ACCOUNT_ID: "1234567890123456789",
  ZOHO_DATA_CENTER: "us"
});

const makeZohoFetch = ({ tokenStatus = 200, sendStatus = 200, providerCode = sendStatus } = {}) => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url: String(url), options });
    if (String(url).endsWith("/oauth/v2/token")) {
      return new Response(JSON.stringify(tokenStatus === 200 ? {
        access_token: "__short_lived_access_token__",
        expires_in: 3600
      } : {
        error: "invalid_client"
      }), {
        status: tokenStatus,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      status: { code: providerCode, description: providerCode === 200 ? "success" : "provider failure" },
      data: providerCode === 200 ? { messageId: "test-message" } : undefined
    }), {
      status: sendStatus,
      headers: { "Content-Type": "application/json" }
    });
  };
  return { calls, fetchImpl };
};

async function waitForPage(page, path) {
  const response = await page.goto(path);
  expect(response.ok(), `${path} should load`).toBeTruthy();
  await page.evaluate(() => document.fonts.ready);
}

test("Essential navigation promotes exactly five marketing pages", async ({ page }) => {
  for (const path of publicPages) {
    await waitForPage(page, path);
    const links = await page.locator("#primary-menu a:not(.mobile-menu-cta)").evaluateAll((anchors) => anchors.map((anchor) => ({ text: anchor.textContent.trim(), href: anchor.getAttribute("href") })));
    expect(links).toEqual([
      { text: "Home", href: "/" },
      { text: "Services", href: "services.html" },
      { text: "Properties", href: "properties.html" },
      { text: "About", href: "about.html" },
      { text: "Contact", href: "contact.html" }
    ]);
  }
});

test("footer is compact and includes FAQ without changing the five-page primary journey", async ({ page }) => {
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
    expect(links.map((text) => text.trim())).toEqual(["Home", "Services", "Properties", "About", "Contact", "FAQ"]);
    await expect(footer.getByRole("link", { name: "Request Service" })).toHaveCount(1);
  }
});

test("homepage retains the required commercial journey", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Commercial Pool & Spa Service");
  await expect(page.getByRole("link", { name: "Request Service" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "View Services" }).first()).toHaveAttribute("href", "services.html");
  await expect(page.locator(".services-row-intro > p:last-child")).toHaveText("PPC provides pool and spa service for resorts, hospitality properties, communities, commercial aquatic facilities, and large private estates throughout the Greater Las Vegas Area.");
  const properties = page.locator(".property-showcase");
  await expect(properties.locator(".eyebrow")).toHaveText("PROPERTIES WE SERVE");
  await expect(properties.getByRole("heading", { name: "Trusted across Las Vegas properties." })).toBeVisible();
  await expect(properties.locator(".property-showcase-intro > p")).toHaveText("PPC provides pool and spa service across a broad portfolio of resorts, hospitality properties, communities, and aquatic facilities throughout the Greater Las Vegas Area.");
  await expect(properties.locator(".property-preview-card")).toHaveCount(4);
  await expect(properties.locator("figcaption")).toHaveText([
    "Golden Nugget Las Vegas Hotel & Casino",
    "Palms Casino Resort",
    "Red Rock Casino Resort and Spa",
    "Durango Casino & Resort"
  ]);
  expect(await properties.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("src")))).toEqual([
    "images/temp-property-reference/temp-golden-nugget.webp",
    "images/temp-property-reference/temp-palms.webp",
    "images/temp-property-reference/temp-red-rock.webp",
    "images/temp-property-reference/temp-durango.webp"
  ]);
  await expect(properties.getByRole("link", { name: "View Properties We Serve" })).toHaveAttribute("href", "properties.html");
  await expect(properties).not.toContainText("Station Casinos");
});

test("homepage service cards share one neutral default treatment and reveal emphasis only on interaction", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await waitForPage(page, "/index.html");
  const cards = page.locator(".service-line-item");
  await expect(cards).toHaveCount(3);
  await expect(page.locator(".service-line-item.featured-service")).toHaveCount(0);

  const defaultStyles = await cards.evaluateAll((elements) => elements.map((element) => {
    const style = getComputedStyle(element);
    return {
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderStyle: style.borderStyle,
      borderWidth: style.borderWidth,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow,
      transform: style.transform
    };
  }));
  expect(new Set(defaultStyles.map((style) => JSON.stringify(style))).size).toBe(1);
  expect(defaultStyles[0]).toMatchObject({
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "rgb(200, 220, 231)",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "6px",
    boxShadow: "none",
    transform: "none"
  });

  await cards.first().hover();
  await expect(cards.first()).toHaveCSS("border-color", "rgb(40, 124, 158)");
  const hoverStyle = await cards.first().evaluate((element) => {
    const style = getComputedStyle(element);
    return { borderColor: style.borderColor, boxShadow: style.boxShadow, transform: style.transform };
  });
  expect(hoverStyle.borderColor).toBe("rgb(40, 124, 158)");
  expect(hoverStyle.boxShadow).not.toBe("none");
  expect(hoverStyle.transform).not.toBe("none");
  await expect(cards.nth(1)).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("FAQ presents the exact 20 approved questions with native keyboard behavior and schema parity", async ({ page }) => {
  await waitForPage(page, "/faq.html");
  const expectedQuestions = [
    "What types of commercial pools and spas does PPC service?",
    "What areas does Professional Pool Care LLC serve?",
    "Does PPC provide Certified Pool Operator (CPO) services?",
    "Does PPC handle commercial pool equipment troubleshooting and repair?",
    "Does PPC service chemical feed and pool automation systems?",
    "Does PPC provide pool deck cleaning?",
    "How does PPC clean commercial pool decks?",
    "Does PPC provide emergency pool and spa service?",
    "Does PPC handle biological contamination and bio cleanup?",
    "Can PPC help prepare a commercial pool or spa for inspection?",
    "Does PPC provide acid washing and surface restoration?",
    "Can PPC work around hotel, resort, HOA, community, and facility operating schedules?",
    "How do I request commercial pool or spa service from PPC?",
    "Does PPC service residential pools?",
    "Does PPC service private estates?",
    "What services can PPC provide for large private estates?",
    "How often should a commercial pool or spa be serviced?",
    "Why is CPO coverage important for a commercial aquatic facility?",
    "Can PPC troubleshoot water-quality problems as well as equipment issues?",
    "Does PPC service hotels, resorts, casinos, communities, aquatic facilities, and large private estates?"
  ];
  const details = page.locator(".faq-list details");
  await expect(details).toHaveCount(20);
  await expect(details.locator("summary")).toHaveText(expectedQuestions);

  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(schema["@type"]).toBe("FAQPage");
  expect(schema["@id"]).toBe("https://professionalpoolcare.com/faq.html#faq");
  expect(schema.mainEntity).toHaveLength(20);
  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const visible = await details.evaluateAll((elements) => elements.map((element) => ({
    question: element.querySelector("summary").innerText,
    answer: element.querySelector("p").textContent
  })));
  expect(schema.mainEntity.map((entry) => entry.name)).toEqual(visible.map((entry) => normalize(entry.question)));
  expect(schema.mainEntity.map((entry) => entry.acceptedAnswer.text)).toEqual(visible.map((entry) => normalize(entry.answer)));

  const firstSummary = details.first().locator("summary");
  await firstSummary.focus();
  await expect(firstSummary).toBeFocused();
  expect((await firstSummary.boundingBox()).height).toBeGreaterThanOrEqual(48);
  await page.keyboard.press("Enter");
  await expect(details.first()).toHaveJSProperty("open", true);
  await page.keyboard.press("Space");
  await expect(details.first()).toHaveJSProperty("open", false);
});

test("structured data defines one restrained entity graph and five supported services", async ({ page }) => {
  await waitForPage(page, "/index.html");
  const homeSchema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(homeSchema["@graph"].map((node) => node["@type"])).toEqual(["Organization", "ImageObject", "Place", "WebSite"]);
  const organization = homeSchema["@graph"].find((node) => node["@type"] === "Organization");
  expect(organization).toMatchObject({
    "@id": "https://professionalpoolcare.com/#organization",
    name: "Professional Pool Care LLC",
    alternateName: "PPC LLC",
    url: "https://professionalpoolcare.com/",
    telephone: "+1-702-357-7027",
    email: "Adria@ProfessionalPoolCare.com",
    foundingDate: "2003",
    description: "Professional Pool Care LLC serves commercial aquatic facilities, resorts, hospitality properties, communities, and large private estates throughout the Greater Las Vegas Area.",
    slogan: "PPC LLC, The Difference Is Clear."
  });
  const prohibitedSchemaTerms = new Set(["LocalBusiness", "address", "geo", "sameAs", "review", "rating", "price", "openingHours", "credential"]);
  const schemaTerms = [];
  const collectSchemaTerms = (value) => {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      schemaTerms.push(key);
      if (key === "@type") schemaTerms.push(...(Array.isArray(child) ? child : [child]));
      collectSchemaTerms(child);
    }
  };
  collectSchemaTerms(homeSchema);
  expect(schemaTerms.some((term) => prohibitedSchemaTerms.has(term))).toBeFalsy();

  await waitForPage(page, "/services.html");
  const serviceSchema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(serviceSchema["@graph"]).toHaveLength(5);
  expect(serviceSchema["@graph"].every((node) => node["@type"] === "Service")).toBeTruthy();
  expect(serviceSchema["@graph"].map((node) => node.name)).toEqual([
    "Commercial Pool and Spa Maintenance",
    "Commercial Pool Equipment and Restoration Support",
    "Certified Pool Operator and Inspection-Readiness Support",
    "Emergency Commercial Pool and Spa Service and Bio Cleanup",
    "Large Private Estate Pool and Spa Service"
  ]);
  for (const service of serviceSchema["@graph"]) {
    expect(service.provider).toEqual({ "@id": "https://professionalpoolcare.com/#organization" });
    expect(service.areaServed).toEqual({ "@id": "https://professionalpoolcare.com/#greater-las-vegas-area" });
  }
  expect(JSON.stringify(serviceSchema)).not.toMatch(/Offer|price|review|rating|availability|openingHours|guarantee/i);
});

test("FAQ and estate discovery remain contextual and commercial-first", async ({ page }) => {
  await waitForPage(page, "/index.html");
  await expect(page.locator(".home-faq-preview details")).toHaveCount(0);
  await expect(page.locator(".home-faq-preview article")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "View All FAQs" })).toHaveAttribute("href", "faq.html");

  await waitForPage(page, "/services.html");
  await expect(page.getByRole("link", { name: "Read Service FAQ" })).toHaveAttribute("href", "faq.html");
  await expect(page.locator("#large-private-estates")).toBeVisible();
  await expect(page.locator(".service-page-hero .lead")).toHaveText("PPC provides commercial pool and spa service for resorts, hospitality properties, communities, aquatic facilities, and large private estates across the Greater Las Vegas Area.");

  await waitForPage(page, "/contact.html");
  await expect(page.getByRole("link", { name: "Read the service FAQ" })).toHaveAttribute("href", "faq.html");
  await expect(page.locator('[name="property_type"]')).toContainText("Private Estate");

  await waitForPage(page, "/about.html");
  await expect(page.getByRole("link", { name: "commercial pool and spa services" })).toHaveAttribute("href", "services.html");
  await expect(page.locator(".about-page-hero .lead")).toContainText("commercial aquatic facilities, resorts, hospitality properties, communities, and large private estates");

  const publicText = [];
  for (const path of publicPages) {
    await waitForPage(page, path);
    publicText.push(await page.locator("body").textContent());
  }
  const combined = publicText.join("\n");
  expect(combined).toContain("PPC's primary focus is commercial aquatic facilities and large private estates rather than routine residential pool service.");
  expect(combined).not.toMatch(/residential pool cleaning|backyard pool service|weekly home pool service|offers? routine residential service/i);
});

test("Properties page presents the exact seven featured properties and broader portfolio", async ({ page }) => {
  await waitForPage(page, "/properties.html");
  await expect(page.locator("h1")).toHaveText("Commercial pool and spa service across Las Vegas.");
  await expect(page.locator(".properties-page-hero .lead")).toHaveText("PPC supports a broad portfolio of commercial properties across the Greater Las Vegas Area, including major resorts, hospitality properties, communities, and aquatic facilities.");
  await expect(page.getByRole("heading", { level: 2, name: "Featured Properties" })).toBeVisible();
  const cards = page.locator(".featured-property-card");
  await expect(cards).toHaveCount(7);
  await expect(cards.locator("figcaption")).toHaveText([
    "Aliante Casino Hotel Spa",
    "Golden Nugget Las Vegas Hotel & Casino",
    "Palms Casino Resort",
    "The Vistas Pool at The Vistas Community Center",
    "Sam's Town Hotel & Gambling Hall",
    "Durango Casino & Resort",
    "Red Rock Casino Resort and Spa"
  ]);
  expect(await cards.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("src")))).toEqual([
    "images/temp-property-reference/temp-aliante.webp",
    "images/temp-property-reference/temp-golden-nugget.webp",
    "images/temp-property-reference/temp-palms.webp",
    "images/temp-property-reference/temp-vistas.webp",
    "images/temp-property-reference/temp-sams-town.webp",
    "images/temp-property-reference/temp-durango.webp",
    "images/temp-property-reference/temp-red-rock.webp"
  ]);
  await expect(page.getByRole("heading", { level: 2, name: "Additional Properties We Serve" })).toBeVisible();
  await expect(page.locator(".additional-properties p:last-child")).toHaveText("PPC supports additional commercial pools, spas, and aquatic facilities throughout the Greater Las Vegas Area.");
  await expect(page.locator("main img")).toHaveCount(7);
  expect(await page.locator("main img").evaluateAll((images) => images.every((image) => image.alt.trim() && image.naturalWidth === 1200 && image.naturalHeight === 675))).toBeTruthy();
});

test("property cards retain a cohesive responsive grid and unclipped names", async ({ page }) => {
  const cases = [
    { width: 390, columns: 1 },
    { width: 768, columns: 2 },
    { width: 1440, columns: 3 }
  ];
  for (const { width, columns } of cases) {
    await page.setViewportSize({ width, height: 1000 });
    await waitForPage(page, "/properties.html");
    const cards = page.locator(".featured-property-card");
    const firstRowY = (await cards.nth(0).boundingBox()).y;
    const firstRowCount = (await cards.evaluateAll((elements, y) => elements.filter((element) => Math.abs(element.getBoundingClientRect().y - y) < 2).length, firstRowY));
    expect(firstRowCount).toBe(columns);
    expect(await cards.locator("img").evaluateAll((images) => images.every((image) => Math.abs(image.getBoundingClientRect().width / image.getBoundingClientRect().height - 16 / 9) < 0.02))).toBeTruthy();
    expect(await cards.locator("figcaption").evaluateAll((captions) => captions.every((caption) => caption.scrollHeight <= caption.clientHeight && caption.scrollWidth <= caption.clientWidth))).toBeTruthy();
  }
});

test("homepage imagery is commercial, lazy below the hero, and not duplicated", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await waitForPage(page, "/index.html");
  const hero = page.locator(".hero-image-panel img");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  await expect(hero).toHaveAttribute("srcset", /resort-hotel-pool-deck-960\.webp 960w, images\/resort-hotel-pool-deck\.webp 1440w/);
  expect(await hero.evaluate((image) => /resort-hotel-pool-deck(?:-960)?\.webp$/.test(new URL(image.currentSrc).pathname))).toBeTruthy();
  const sources = await page.locator("main img").evaluateAll((images) => images.map((image) => image.getAttribute("src")));
  expect(new Set(sources).size).toBe(sources.length);
  const belowFoldLoading = await page.locator("main img:not(.hero-image-panel img)").evaluateAll((images) => images.map((image) => image.loading));
  expect(belowFoldLoading.every((value) => value === "lazy")).toBeTruthy();
  const altText = await page.locator("main img").evaluateAll((images) => images.map((image) => image.alt.trim()));
  expect(altText.every(Boolean)).toBeTruthy();
  expect(altText.every((alt) => /commercial|resort|apartment|spa|municipal|aquatic|pool|mechanical/i.test(alt))).toBeTruthy();
});

test("services are organized into the nine approved offerings with one scope note", async ({ page }) => {
  await waitForPage(page, "/services.html");
  await expect(page.locator(".service-group")).toHaveCount(3);
  await expect(page.locator(".service-items section")).toHaveCount(9);
  await expect(page.locator(".service-items h3")).toHaveText([
    "Commercial Pool Maintenance",
    "Commercial Spa Maintenance",
    "Equipment Repair & Troubleshooting",
    "Chemical Feed & Automation Support",
    "Acid Washing & Surface Restoration",
    "Pool Deck Cleaning",
    "Emergency Service & Bio Cleanup",
    "Certified Pool Operator (CPO) Services",
    "Inspection-Readiness & Compliance Support"
  ]);
  await expect(page.locator(".service-group > .service-group-image")).toHaveCount(3);
  await expect(page.locator(".scope-note")).toHaveText("PPC supports maintenance and inspection readiness. Property owners and operators remain responsible for applicable regulatory requirements.");
  await expect(page.locator("#large-private-estates")).toContainText("large private estates");
  await expect(page.locator("#pool-deck-cleaning p")).toHaveText("Commercial pool deck power washing using cleaning solutions selected for compatibility with pool areas, deck surfaces, and surrounding décor, focused on helping remove dirt, buildup, organic debris, and surface staining. Surface material and condition affect compatibility and results, and complete stain removal is not promised.");
  await expect(page.locator("#pool-deck-cleaning p")).not.toContainText("pool-, deck-, and décor-safe");
});

test("contact form is simple, accessible, and posts to the Worker endpoint", async ({ page }) => {
  let requestBody = "";
  let submittedService = "";
  let submittedPropertyType = "";
  await page.route("**/contact-request", async (route) => {
    const request = route.request();
    requestBody = request.postData() || "";
    const submittedForm = await new Response(request.postDataBuffer(), {
      headers: { "Content-Type": request.headers()["content-type"] }
    }).formData();
    submittedService = String(submittedForm.get("service_needed") || "");
    submittedPropertyType = String(submittedForm.get("property_type") || "");
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
    "Pool Deck Cleaning",
    "Emergency Service & Bio Cleanup",
    "Certified Pool Operator (CPO) Services",
    "Inspection-Readiness & Compliance Support"
  ]);
  await expect(form.locator('[name="property_type"] option:not([value=""])')).toHaveText([
    "Resort or hotel",
    "Apartment or multifamily community",
    "HOA aquatic facility",
    "Municipal or public facility",
    "Other commercial property",
    "Private Estate"
  ]);
  await page.getByRole("button", { name: "Request Service" }).last().click();
  await expect(form.locator('[name="name"]')).toBeFocused();
  await form.locator('[name="name"]').fill("Test User");
  await form.locator('[name="company"]').fill("Test Property");
  await form.locator('[name="service_needed"]').selectOption("Pool Deck Cleaning");
  await form.locator('[name="property_type"]').selectOption("Private Estate");
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
  expect(submittedService).toBe("Pool Deck Cleaning");
  expect(submittedPropertyType).toBe("Private Estate");
  expect(requestBody).not.toContain("Adria%40ProfessionalPoolCare.com");
});

test("contact form preserves actionable server errors and handles malformed responses", async ({ page }) => {
  let responseMode = "field-error";
  await page.route("**/contact-request", async (route) => {
    if (responseMode === "field-error") {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          message: "Please complete or correct the highlighted fields before submitting.",
          errors: ["Phone is too long."]
        })
      });
      return;
    }
    await route.fulfill({ status: 502, contentType: "text/html", body: "<h1>Bad gateway</h1>" });
  });

  await waitForPage(page, "/contact.html#quote");
  const form = page.locator("[data-quote-form]");
  await expect(form.locator('[name="name"]')).toHaveAttribute("maxlength", "120");
  await expect(form.locator('[name="company"]')).toHaveAttribute("maxlength", "160");
  await expect(form.locator('[name="email"]')).toHaveAttribute("maxlength", "180");
  await expect(form.locator('[name="phone"]')).toHaveAttribute("maxlength", "40");
  await expect(form.locator('[name="message"]')).toHaveAttribute("minlength", "10");
  await expect(form.locator('[name="message"]')).toHaveAttribute("maxlength", "2000");

  await form.locator('[name="name"]').fill("Test User");
  await form.locator('[name="company"]').fill("Test Property");
  await form.locator('[name="phone"]').fill("702-555-0100");
  await form.locator('[name="service_needed"]').selectOption({ index: 1 });
  await form.locator('[name="message"]').fill("Routine commercial service request.");
  await form.locator('[name="privacy_consent"]').check();
  await form.getByRole("button", { name: "Request Service" }).click();
  await expect(page.getByRole("status")).toHaveText("Please complete or correct the highlighted fields before submitting.");
  await expect(form.locator('[name="phone"]')).toHaveAttribute("aria-invalid", "true");
  await expect(form.locator('[name="phone"]')).toBeFocused();

  responseMode = "malformed";
  await form.getByRole("button", { name: "Request Service" }).click();
  await expect(page.getByRole("status")).toHaveText("We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com.");
  await expect(page.getByRole("status")).toBeFocused();
});

test("contact form prevents duplicate submissions while a request is pending", async ({ page }) => {
  let requestCount = 0;
  let releaseRequest;
  await page.route("**/contact-request", async (route) => {
    requestCount += 1;
    await new Promise((resolve) => { releaseRequest = resolve; });
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Request received." })
    });
  });

  await waitForPage(page, "/contact.html#quote");
  const form = page.locator("[data-quote-form]");
  await form.locator('[name="name"]').fill("Test User");
  await form.locator('[name="company"]').fill("Test Property");
  await form.locator('[name="email"]').fill("manager@professionalpoolcare.com");
  await form.locator('[name="service_needed"]').selectOption({ index: 1 });
  await form.locator('[name="message"]').fill("Routine commercial service request.");
  await form.locator('[name="privacy_consent"]').check();
  await form.evaluate((element) => {
    element.requestSubmit();
    element.requestSubmit();
  });
  await expect(form.getByRole("button", { name: "Sending..." })).toBeDisabled();
  await expect.poll(() => requestCount).toBe(1);
  releaseRequest();
  await expect(page.getByRole("status")).toHaveText("Request received.");
  await expect(form.getByRole("button", { name: "Request Service" })).toBeEnabled();
  expect(requestCount).toBe(1);
});

test("all public pages have exact unique production metadata", async ({ page }) => {
  const expected = new Map([
    ["/index.html", {
      title: "Commercial Pool & Spa Service Las Vegas | PPC LLC",
      description: "Commercial pool and spa maintenance, CPO coverage, equipment support, emergency service, and large private estate care from PPC across Greater Las Vegas.",
      canonical: `${productionOrigin}/`,
      image: `${productionOrigin}/images/resort-hotel-pool-deck.webp`,
      imageAlt: "Large commercial resort pool deck with hospitality seating"
    }],
    ["/services.html", {
      title: "Commercial Pool & Spa Services Las Vegas | PPC LLC",
      description: "PPC commercial pool and spa maintenance, CPO service, equipment support, deck cleaning, emergency service, and large private estate care in Greater Las Vegas.",
      canonical: `${productionOrigin}/services.html`,
      image: `${productionOrigin}/images/commercial-equipment-room-service.jpg`,
      imageAlt: "Commercial pool equipment room with pumps and service access"
    }],
    ["/properties.html", {
      title: "Las Vegas Commercial Pool Properties | PPC LLC",
      description: "Explore featured Las Vegas resorts, communities, and aquatic facilities served by Professional Pool Care LLC across the Greater Las Vegas Area.",
      canonical: `${productionOrigin}/properties.html`,
      image: `${productionOrigin}/images/resort-hotel-pool-deck.webp`,
      imageAlt: "Large commercial resort pool deck with hospitality seating"
    }],
    ["/about.html", {
      title: "About Professional Pool Care LLC | Las Vegas",
      description: "PPC has served commercial aquatic facilities, resorts, hospitality properties, communities, and large private estates across Greater Las Vegas since 2003.",
      canonical: `${productionOrigin}/about.html`,
      image: `${productionOrigin}/images/commercial-equipment-room-service.jpg`,
      imageAlt: "Commercial pool equipment room with pumps, piping, and service access"
    }],
    ["/contact.html", {
      title: "Request Pool & Spa Service in Las Vegas | PPC LLC",
      description: "Request commercial pool, spa, CPO, equipment, or large private estate service from Professional Pool Care LLC in the Greater Las Vegas Area.",
      canonical: `${productionOrigin}/contact.html`,
      image: `${productionOrigin}/images/resort-hotel-pool-deck.webp`,
      imageAlt: "Large commercial resort pool deck with hospitality seating"
    }],
    ["/faq.html", {
      title: "Commercial Pool & Spa Service FAQ | PPC LLC Las Vegas",
      description: "Answers about PPC commercial pool and spa maintenance, CPO coverage, equipment, deck cleaning, emergency service, and large private estates in Las Vegas.",
      canonical: `${productionOrigin}/faq.html`,
      image: `${productionOrigin}/images/commercial-water-testing.jpg`,
      imageAlt: "Water-condition thermometer beside a large commercial pool"
    }],
    ["/privacy.html", {
      title: "Privacy Policy | PPC LLC",
      description: "Read how Professional Pool Care LLC handles information submitted through its commercial pool and spa service request form.",
      canonical: `${productionOrigin}/privacy.html`,
      image: `${productionOrigin}/images/resort-hotel-pool-deck.webp`,
      imageAlt: "Large commercial resort pool deck with hospitality seating"
    }],
    ["/terms.html", {
      title: "Website Terms | PPC LLC",
      description: "Read the website terms for Professional Pool Care LLC service information and commercial pool and spa inquiries.",
      canonical: `${productionOrigin}/terms.html`,
      image: `${productionOrigin}/images/resort-hotel-pool-deck.webp`,
      imageAlt: "Large commercial resort pool deck with hospitality seating"
    }]
  ]);
  const descriptions = [];
  const titles = [];
  for (const path of publicPages) {
    const metadata = expected.get(path);
    await waitForPage(page, path);
    await expect(page).toHaveTitle(metadata.title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", metadata.canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", metadata.canonical);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", metadata.title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", metadata.description);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", metadata.image);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", metadata.imageAlt);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Professional Pool Care LLC");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBe(metadata.description);
    const schemaSources = await page.locator('script[type="application/ld+json"]').allTextContents();
    if (path !== "/faq.html") expect(schemaSources.every((source) => !source.includes('"FAQPage"'))).toBeTruthy();
    descriptions.push(description);
    titles.push(metadata.title);
  }
  expect(new Set(descriptions).size).toBe(publicPages.length);
  expect(new Set(titles).size).toBe(publicPages.length);
  for (const path of utilityPages) {
    await waitForPage(page, path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  }
});

test("public pages contain no expanded links, visible development language, em dashes, or conflict markers", async ({ page }) => {
  const forbiddenVisible = /website concept|concept form|endpoint not configured|not yet connected|production setup|\bplaceholder\b|\bpreview\b|\bdemo\b|\btemporary\b|request a call/i;
  for (const path of publicPages) {
    await waitForPage(page, path);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(forbiddenVisible);
    expect(text).not.toContain("—");
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")));
    for (const expandedName of nonPublicExpandedNames) expect(hrefs.some((href) => href.includes(expandedName))).toBeFalsy();
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
  for (const path of publicPages) {
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
    const logoArtwork = await page.locator(".logo-artwork").boundingBox();
    const brandName = page.locator(".brand-name");
    const brandNameBox = await brandName.boundingBox();
    expect(initial.height).toBeCloseTo(97, 0);
    expect(Math.abs((logo.x + logo.width / 2) - width / 2)).toBeLessThanOrEqual(1);
    expect(Math.abs((logoArtwork.x + logoArtwork.width / 2) - width / 2)).toBeLessThanOrEqual(1);
    expect(logoArtwork.width).toBeCloseTo(164, 0);
    expect(logoArtwork.height).toBeCloseTo(72, 0);
    await expect(brandName).toHaveText("Professional Pool Care LLC");
    expect(brandNameBox.y).toBeGreaterThanOrEqual(logoArtwork.y + logoArtwork.height);
    expect(await brandName.evaluate((element) => getComputedStyle(element).whiteSpace)).toBe("nowrap");
    expect(logo.y).toBeGreaterThanOrEqual(initial.y);
    expect(logo.y + logo.height).toBeLessThanOrEqual(initial.y + initial.height);
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

test("mobile menu closes on outside click, navigation, and desktop resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 860 });
  await waitForPage(page, "/index.html");
  const toggle = page.getByRole("button", { name: "Menu" });
  const menu = page.locator("#primary-menu");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator("footer").click({ position: { x: 5, y: 5 } });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(menu).not.toHaveClass(/is-open/);

  await toggle.click();
  await menu.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/services\.html$/);
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");

  await page.getByRole("button", { name: "Menu" }).click();
  await page.setViewportSize({ width: 1024, height: 860 });
  await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).not.toHaveClass(/is-open/);
});

test("desktop header remains stable during scroll", async ({ page }) => {
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await waitForPage(page, "/index.html");
    const header = page.locator("[data-site-header]");
    const initial = await header.boundingBox();
    const logoArtwork = await page.locator(".logo-artwork").boundingBox();
    const brandNameBox = await page.locator(".brand-name").boundingBox();
    expect(initial.height).toBeCloseTo(87, 0);
    expect(logoArtwork.width).toBeCloseTo(132, 0);
    expect(logoArtwork.height).toBeCloseTo(58, 0);
    expect(brandNameBox.y).toBeGreaterThanOrEqual(logoArtwork.y + logoArtwork.height);
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
    "https://professionalpoolcare.com/properties.html",
    "https://professionalpoolcare.com/about.html",
    "https://professionalpoolcare.com/contact.html",
    "https://professionalpoolcare.com/faq.html"
  ]);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://professionalpoolcare.com/sitemap.xml");
  expect(`${sitemap}\n${robots}`).not.toContain("neraium.github.io");
});

test("expanded sources are noindexed and excluded from the built site", async () => {
  const archiveDirectory = join(process.cwd(), "archive", "expanded");
  for (const name of archivedExpandedNames) {
    const source = await readFile(join(archiveDirectory, name), "utf8");
    expect(source).toMatch(/<meta name="robots" content="noindex, (?:nofollow|follow)">/);
  }
  const builtHtml = (await readdir(join(process.cwd(), "dist"))).filter((name) => name.endsWith(".html")).sort();
  expect(builtHtml).toEqual(["about.html", "contact.html", "faq.html", "index.html", "privacy.html", "properties.html", "services.html", "terms.html"]);
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

test("Worker contact endpoint delivers through Zoho OAuth API to Adria only", async () => {
  const worker = await import("../worker/index.mjs");
  const { calls, fetchImpl } = makeZohoFetch();
  const success = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    message: "Please help with <script>alert('unsafe')</script> and the pool equipment.",
    recipient: "attacker@example.com",
    toAddress: "attacker@example.com",
    replyTo: "attacker@example.com"
  }), makeZohoEnv(), fetchImpl);
  expect(success.status).toBe(200);
  expect(await success.json()).toMatchObject({ ok: true });
  expect(calls).toHaveLength(2);

  const tokenCall = calls[0];
  expect(tokenCall.url).toBe("https://accounts.zoho.com/oauth/v2/token");
  expect(tokenCall.url).not.toContain("__server_only");
  expect(Object.fromEntries(new URLSearchParams(tokenCall.options.body))).toEqual({
    refresh_token: "__server_only_refresh_token__",
    client_id: "__server_only_client_id__",
    client_secret: "__server_only_client_secret__",
    grant_type: "refresh_token"
  });

  const sendCall = calls[1];
  expect(sendCall.url).toBe("https://mail.zoho.com/api/accounts/1234567890123456789/messages");
  expect(sendCall.options.headers.Authorization).toBe("Zoho-oauthtoken __short_lived_access_token__");
  const message = JSON.parse(sendCall.options.body);
  expect(message).toMatchObject({
    fromAddress: "Adria@ProfessionalPoolCare.com",
    toAddress: "Adria@ProfessionalPoolCare.com",
    subject: "New PPC Website Inquiry — Ada Manager / Commercial Property",
    mailFormat: "html",
    encoding: "UTF-8"
  });
  expect(message).not.toHaveProperty("replyTo");
  expect(message.content).toContain("manager@professionalpoolcare.com");
  expect(message.content).toContain("702-555-0100");
  expect(message.content).toContain("Apartment or multifamily community");
  expect(message.content).toContain("&lt;script&gt;alert(&#39;unsafe&#39;)&lt;/script&gt;");
  expect(message.content).not.toContain("<script>");
  expect(sendCall.options.body).not.toContain("attacker@example.com");
});

test("Worker accepts Pool Deck Cleaning for a Private Estate property", async () => {
  const worker = await import("../worker/index.mjs");
  const { calls, fetchImpl } = makeZohoFetch();
  const success = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    service_needed: "Pool Deck Cleaning",
    property_type: "Private Estate"
  }), makeZohoEnv(), fetchImpl);
  expect(success.status).toBe(200);
  expect(calls).toHaveLength(2);
  expect(JSON.parse(calls[1].options.body).content).toContain("Pool Deck Cleaning");
  expect(JSON.parse(calls[1].options.body).content).toContain("Private Estate");
});

test("Worker omits unsupported Reply-To for every valid submission", async () => {
  const worker = await import("../worker/index.mjs");
  const { calls, fetchImpl } = makeZohoFetch();
  const success = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    email: "manager@professionalpoolcare.com"
  }), makeZohoEnv(), fetchImpl);
  expect(success.status).toBe(200);
  expect(calls).toHaveLength(2);
  expect(JSON.parse(calls[1].options.body)).not.toHaveProperty("replyTo");
});

test("Worker contact endpoint rejects malformed and missing submissions before provider calls", async () => {
  const worker = await import("../worker/index.mjs");
  const failIfCalled = async () => {
    throw new Error("Provider must not be called for invalid submissions.");
  };
  const malformed = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(validContactFields)
  }), makeZohoEnv(), failIfCalled);
  expect(malformed.status).toBe(415);

  const missing = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    name: "",
    company: "",
    email: "",
    phone: "",
    service_needed: "",
    message: "",
    privacy_consent: ""
  }), makeZohoEnv(), failIfCalled);
  expect(missing.status).toBe(400);
  const missingBody = await missing.json();
  expect(missingBody.errors).toEqual(expect.arrayContaining([
    "Name is required.",
    "Company or property is required.",
    "Email or phone is required.",
    "Select a valid service.",
    "Message is required.",
    "Privacy consent is required."
  ]));
});

test("Worker contact endpoint rejects invalid email and honeypot spam", async () => {
  const worker = await import("../worker/index.mjs");
  const failIfCalled = async () => {
    throw new Error("Provider must not be called for invalid submissions.");
  };
  const invalidEmail = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    email: "not-an-email"
  }), makeZohoEnv(), failIfCalled);
  expect(invalidEmail.status).toBe(400);
  expect((await invalidEmail.json()).errors).toContain("Enter a valid email address.");

  const spam = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    website: "https://spam.invalid"
  }), makeZohoEnv(), failIfCalled);
  expect(spam.status).toBe(400);
  expect(await spam.json()).toMatchObject({ ok: false, message: "Submission blocked. Please refresh and try again." });
});

test("Worker enforces methods, media types, malformed forms, and actual body size", async () => {
  const worker = await import("../worker/index.mjs");
  const failIfCalled = async () => {
    throw new Error("Provider must not be called for rejected requests.");
  };

  const methodResponse = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "PUT",
    headers: { Accept: "application/json" }
  }), makeZohoEnv(), failIfCalled);
  expect(methodResponse.status).toBe(405);
  expect(methodResponse.headers.get("allow")).toBe("POST");

  const wrongMediaType = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: { "Content-Type": "text/plain", Accept: "application/json" },
    body: new URLSearchParams(validContactFields).toString()
  }), makeZohoEnv(), failIfCalled);
  expect(wrongMediaType.status).toBe(415);

  const malformedMultipart = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
    body: "not-a-valid-multipart-body"
  }), makeZohoEnv(), failIfCalled);
  expect(malformedMultipart.status).toBe(400);

  const oversizedBody = new URLSearchParams({ ...validContactFields, message: "x".repeat(33_000) }).toString();
  const noDeclaredLength = new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: oversizedBody
  });
  expect(noDeclaredLength.headers.get("content-length")).toBeNull();
  const tooLarge = await worker.handleContactRequest(noDeclaredLength, makeZohoEnv(), failIfCalled);
  expect(tooLarge.status).toBe(413);

  const { fetchImpl } = makeZohoFetch();
  const caseInsensitiveMediaType = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "POST",
    headers: { "Content-Type": "Application/X-WWW-Form-Urlencoded; Charset=UTF-8", Accept: "application/json" },
    body: new URLSearchParams(validContactFields)
  }), makeZohoEnv(), fetchImpl);
  expect(caseInsensitiveMediaType.status).toBe(200);
});

test("Worker rejects every overlong field and meaningful low-quality input", async () => {
  const worker = await import("../worker/index.mjs");
  const failIfCalled = async () => {
    throw new Error("Provider must not be called for invalid submissions.");
  };
  const cases = [
    ["name", "n".repeat(121), "Name is too long."],
    ["company", "c".repeat(161), "Company or property is too long."],
    ["email", `${"a".repeat(171)}@example.com`, "Email is too long."],
    ["phone", "1".repeat(41), "Phone is too long."],
    ["property_type", "p".repeat(81), "Property type is too long."],
    ["message", "m".repeat(2001), "Message is too long."]
  ];
  for (const [field, value, expectedError] of cases) {
    const response = await worker.handleContactRequest(makeContactRequest({ ...validContactFields, [field]: value }), makeZohoEnv(), failIfCalled);
    expect(response.status, field).toBe(400);
    expect((await response.json()).errors, field).toContain(expectedError);
  }

  const invalidPhoneAndShortMessage = await worker.handleContactRequest(makeContactRequest({
    ...validContactFields,
    email: "",
    phone: "12-AB",
    message: "short"
  }), makeZohoEnv(), failIfCalled);
  expect(invalidPhoneAndShortMessage.status).toBe(400);
  expect((await invalidPhoneAndShortMessage.json()).errors).toEqual(expect.arrayContaining([
    "Enter a valid phone number.",
    "Message is too short."
  ]));
});

test("Worker bounds Zoho endpoints and account paths to server configuration", async () => {
  const worker = await import("../worker/index.mjs");
  for (const invalidEnv of [
    { ...makeZohoEnv(), ZOHO_DATA_CENTER: "https://attacker.example" },
    { ...makeZohoEnv(), ZOHO_ACCOUNT_ID: "123/messages?to=attacker" }
  ]) {
    let fetchCalls = 0;
    const response = await worker.handleContactRequest(makeContactRequest(), invalidEnv, async () => {
      fetchCalls += 1;
      throw new Error("Invalid configuration must not reach a provider.");
    });
    expect(response.status).toBe(503);
    expect(fetchCalls).toBe(0);
    expect(await response.json()).toEqual({
      ok: false,
      message: "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com."
    });
  }
});

test("Worker fails safely for Zoho authorization and non-JSON responses", async () => {
  const worker = await import("../worker/index.mjs");
  const providerCases = [
    async () => new Response(JSON.stringify({ error: "invalid_client", client_secret: "must-not-leak" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    }),
    async () => new Response("<html>upstream proxy error</html>", {
      status: 502,
      headers: { "Content-Type": "text/html" }
    })
  ];
  for (const fetchImpl of providerCases) {
    const response = await worker.handleContactRequest(makeContactRequest(), makeZohoEnv(), fetchImpl);
    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.message).toContain("We could not send your request right now.");
    expect(JSON.stringify(body)).not.toMatch(/invalid_client|client_secret|upstream proxy/i);
  }
});

test("Worker invalidates a cached Zoho token after an unauthorized send", async () => {
  const worker = await import("../worker/index.mjs");
  const originalFetch = globalThis.fetch;
  let tokenCalls = 0;
  let sendCalls = 0;
  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/oauth/v2/token")) {
      tokenCalls += 1;
      return Response.json({ access_token: `token-${tokenCalls}`, expires_in: 3600 });
    }
    sendCalls += 1;
    if (sendCalls === 1) return Response.json({ status: { code: 401 } }, { status: 401 });
    return Response.json({ status: { code: 200 }, data: { messageId: "retry-success" } });
  };
  try {
    const failed = await worker.handleContactRequest(makeContactRequest(), makeZohoEnv());
    expect(failed.status).toBe(503);
    const retried = await worker.handleContactRequest(makeContactRequest(), makeZohoEnv());
    expect(retried.status).toBe(200);
    expect(tokenCalls).toBe(2);
    expect(sendCalls).toBe(2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Worker returns accessible HTML fallbacks and security headers on every route", async () => {
  const worker = await import("../worker/index.mjs");
  const fallback = await worker.handleContactRequest(new Request("https://professionalpoolcare.com/contact-request", {
    method: "GET",
    headers: { Accept: "text/html" }
  }), makeZohoEnv());
  expect(fallback.status).toBe(405);
  expect(fallback.headers.get("content-type")).toContain("text/html");
  const markup = await fallback.text();
  expect(markup).toContain('<html lang="en">');
  expect(markup).toContain("Return to contact form");
  expect(markup).not.toContain("undefined");

  const assetResponse = await worker.default.fetch(new Request("https://professionalpoolcare.com/index.html"), {
    ASSETS: { fetch: async () => new Response("asset", { headers: { "Content-Type": "text/plain" } }) }
  });
  for (const response of [fallback, assetResponse]) {
    expect(response.headers.get("content-security-policy")).toContain("frame-ancestors 'none'");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("permissions-policy")).toContain("camera=()");
  }
});

test("Worker contact endpoint fails safely on Zoho configuration and provider errors", async () => {
  const worker = await import("../worker/index.mjs");
  const missingConfiguration = await worker.handleContactRequest(makeContactRequest(), {}, async () => {
    throw new Error("No request should occur without configuration.");
  });
  expect(missingConfiguration.status).toBe(503);
  expect(await missingConfiguration.json()).toMatchObject({
    ok: false,
    message: "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com."
  });

  const { fetchImpl } = makeZohoFetch({ sendStatus: 502, providerCode: 500 });
  const providerFailure = await worker.handleContactRequest(makeContactRequest(), makeZohoEnv(), fetchImpl);
  expect(providerFailure.status).toBe(503);
  const failureBody = await providerFailure.json();
  expect(failureBody).toEqual({
    ok: false,
    message: "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com."
  });
  expect(JSON.stringify(failureBody)).not.toContain("provider failure");
});

test("production build excludes source-only and development artifacts", async () => {
  const builtFiles = await readdir(join(process.cwd(), "dist"));
  expect(builtFiles).toEqual(expect.arrayContaining(["index.html", "services.html", "properties.html", "about.html", "contact.html", "faq.html", "privacy.html", "terms.html", "robots.txt", "sitemap.xml", "styles.css", "script.js", "images"]));
  for (const forbidden of ["node_modules", ".planning", "tests", "test-artifacts", "archive", "README.md", "package.json", "wrangler.jsonc"]) {
    expect(builtFiles).not.toContain(forbidden);
  }

  const textFiles = builtFiles.filter((name) => /\.(?:html|css|js|xml|txt)$/.test(name));
  const publicOutput = (await Promise.all(textFiles.map((name) => readFile(join(process.cwd(), "dist", name), "utf8")))).join("\n");
  for (const serverOnlyValue of [
    "ZOHO_CLIENT_ID",
    "ZOHO_CLIENT_SECRET",
    "ZOHO_REFRESH_TOKEN",
    "ZOHO_ACCOUNT_ID",
    "__server_only",
    "Zoho-oauthtoken"
  ]) {
    expect(publicOutput).not.toContain(serverOnlyValue);
  }
});

test("production-readiness guard detects temporary property references and supports clean replacements", async () => {
  const guard = await import("../scripts/check-production-readiness.mjs");
  const guardSource = await readFile(join(process.cwd(), "scripts", "check-production-readiness.mjs"), "utf8");
  expect(guardSource).toContain('"faq.html"');
  expect(guard.scanTextForTemporaryReferences('<img src="images/temp-property-reference/temp-example.webp">')).toBeTruthy();
  expect(guard.scanTextForTemporaryReferences('<img src="images/properties/approved-example.webp">')).toBeFalsy();
  const failures = await guard.findTemporaryImageReferences();
  expect(failures).toEqual(expect.arrayContaining([expect.stringMatching(/^index\.html:/), expect.stringMatching(/^properties\.html:/)]));
  const command = spawnSync(process.execPath, ["scripts/check-production-readiness.mjs"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
  expect(command.status).toBe(1);
  expect(command.stderr).toContain("PRODUCTION READINESS: FAIL");
  expect(command.stderr).toContain("NOT CLEARED FOR PUBLIC LAUNCH");
});

test("Worker configuration preserves static assets, the form route, and only Zoho delivery settings", async () => {
  const workerSource = await readFile(join(process.cwd(), "worker", "index.mjs"), "utf8");
  const wranglerConfig = JSON.parse(await readFile(join(process.cwd(), "wrangler.jsonc"), "utf8"));
  expect(wranglerConfig.main).toBe("worker/index.mjs");
  expect(wranglerConfig.assets).toEqual({
    directory: "./dist",
    binding: "ASSETS",
    run_worker_first: ["/contact-request"]
  });
  expect(JSON.stringify(wranglerConfig)).not.toMatch(/send_email|email_destination|email_binding/i);
  expect([...workerSource.matchAll(/requireZohoSetting\(env, "([A-Z0-9_]+)"\)/g)].map((match) => match[1]).sort()).toEqual([
    "ZOHO_ACCOUNT_ID",
    "ZOHO_CLIENT_ID",
    "ZOHO_CLIENT_SECRET",
    "ZOHO_REFRESH_TOKEN"
  ]);
  expect(workerSource).not.toMatch(/EmailMessage|send_email/i);
});
