const PPC_CONTACT_EMAIL = "Adria@ProfessionalPoolCare.com";
const PPC_SENDER_EMAIL = "Adria@ProfessionalPoolCare.com";
const MAX_BODY_BYTES = 32_000;
const TOKEN_EXPIRY_SKEW_MS = 60_000;
const SECURITY_HEADERS = Object.freeze({
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY"
});

const ZOHO_DATA_CENTERS = Object.freeze({
  us: { accountsOrigin: "https://accounts.zoho.com", mailOrigin: "https://mail.zoho.com" },
  eu: { accountsOrigin: "https://accounts.zoho.eu", mailOrigin: "https://mail.zoho.eu" },
  in: { accountsOrigin: "https://accounts.zoho.in", mailOrigin: "https://mail.zoho.in" },
  au: { accountsOrigin: "https://accounts.zoho.com.au", mailOrigin: "https://mail.zoho.com.au" },
  jp: { accountsOrigin: "https://accounts.zoho.jp", mailOrigin: "https://mail.zoho.jp" },
  ca: { accountsOrigin: "https://accounts.zohocloud.ca", mailOrigin: "https://mail.zohocloud.ca" },
  cn: { accountsOrigin: "https://accounts.zoho.com.cn", mailOrigin: "https://mail.zoho.com.cn" },
  ae: { accountsOrigin: "https://accounts.zoho.ae", mailOrigin: "https://mail.zoho.ae" },
  sa: { accountsOrigin: "https://accounts.zoho.sa", mailOrigin: "https://mail.zoho.sa" }
});

let cachedZohoAccessToken;

const APPROVED_SERVICES = new Set([
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

const textLimits = {
  name: 120,
  company: 160,
  email: 180,
  phone: 40,
  service_needed: 80,
  property_type: 80,
  message: 2000
};

const responseHeaders = (headers = {}) => ({ ...SECURITY_HEADERS, ...headers });

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers
    })
  });

const html = (title, message, status = 200, headers = {}) =>
  new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)} | PPC LLC</title><link rel="stylesheet" href="/styles.css"></head><body><main class="section legal-content"><div class="container narrow"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><p><a class="btn btn-primary" href="/contact.html#quote">Return to contact form</a></p></div></main></body></html>`,
    {
      status,
      headers: responseHeaders({
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        ...headers
      })
    }
  );

const prefersJson = (request) => {
  const accept = request.headers.get("accept") || "";
  const requestedWith = request.headers.get("x-requested-with") || "";
  return accept.includes("application/json") || requestedWith.toLowerCase() === "fetch";
};

const respond = (request, status, message, details = {}, headers = {}) => {
  if (prefersJson(request)) {
    return json({ ok: status >= 200 && status < 300, message, ...details }, status, headers);
  }
  return html(status >= 200 && status < 300 ? "Request Received" : "Request Not Sent", message, status, headers);
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

const normalize = (value, maxLength) =>
  (typeof value === "string" ? value : "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength ?? Infinity);

const getField = (formData, name) => normalize(formData.get(name));

const hasConsent = (value) => {
  const normalized = String(value || "").toLowerCase();
  return ["on", "true", "yes", "1", "consent"].includes(normalized);
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);

const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 20 && /^[0-9()+.\-\s]+$/.test(value);
};

const parseForm = async (request) => {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return { error: "The request is too large.", status: 413 };
  }

  const contentType = request.headers.get("content-type") || "";
  const mediaType = contentType.split(";", 1)[0].trim().toLowerCase();
  if (!["application/x-www-form-urlencoded", "multipart/form-data"].includes(mediaType)) {
    return { error: "Submit the form using the PPC contact page.", status: 415 };
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) {
    return { error: "The request is too large.", status: 413 };
  }

  const formData = await new Request(request.url, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body
  }).formData();
  return { formData };
};

export const validateContactForm = (formData) => {
  const submission = {
    name: getField(formData, "name"),
    company: getField(formData, "company"),
    email: getField(formData, "email"),
    phone: getField(formData, "phone"),
    serviceNeeded: getField(formData, "service_needed"),
    propertyType: getField(formData, "property_type"),
    message: typeof formData.get("message") === "string" ? formData.get("message").trim() : "",
    privacyConsent: hasConsent(formData.get("privacy_consent")),
    website: normalize(formData.get("website"), 200)
  };

  const errors = [];

  if (submission.website) {
    return { submission, errors: ["Submission blocked."], spam: true };
  }

  if (!submission.name) errors.push("Name is required.");
  if (submission.name.length > textLimits.name) errors.push("Name is too long.");
  if (!submission.company) errors.push("Company or property is required.");
  if (submission.company.length > textLimits.company) errors.push("Company or property is too long.");
  if (!submission.email && !submission.phone) errors.push("Email or phone is required.");
  if (submission.email && !isValidEmail(submission.email)) errors.push("Enter a valid email address.");
  if (submission.email.length > textLimits.email) errors.push("Email is too long.");
  if (submission.phone && !isValidPhone(submission.phone)) errors.push("Enter a valid phone number.");
  if (submission.phone.length > textLimits.phone) errors.push("Phone is too long.");
  if (!APPROVED_SERVICES.has(submission.serviceNeeded)) errors.push("Select a valid service.");
  if (submission.propertyType.length > textLimits.property_type) errors.push("Property type is too long.");
  if (!submission.message) {
    errors.push("Message is required.");
  } else if (submission.message.length < 10) {
    errors.push("Message is too short.");
  } else if (submission.message.length > textLimits.message) {
    errors.push("Message is too long.");
  }
  if (!submission.privacyConsent) errors.push("Privacy consent is required.");

  return { submission, errors, spam: false };
};

const formatHtmlEmail = (submission, request) => `
  <div style="font-family:Arial,sans-serif;line-height:1.5;color:#16212b">
    <h1 style="font-size:22px">New PPC website service request</h1>
    <table style="border-collapse:collapse" role="presentation">
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Name</th><td style="padding:4px 0">${escapeHtml(submission.name)}</td></tr>
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Company / Property</th><td style="padding:4px 0">${escapeHtml(submission.company)}</td></tr>
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Email</th><td style="padding:4px 0">${submission.email ? `<a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a>` : "Not provided"}</td></tr>
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Phone</th><td style="padding:4px 0">${escapeHtml(submission.phone || "Not provided")}</td></tr>
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Service Needed</th><td style="padding:4px 0">${escapeHtml(submission.serviceNeeded)}</td></tr>
      <tr><th style="padding:4px 16px 4px 0;text-align:left;vertical-align:top">Property Type</th><td style="padding:4px 0">${escapeHtml(submission.propertyType || "Not provided")}</td></tr>
    </table>
    <h2 style="font-size:18px">Message</h2>
    <p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="font-size:13px;color:#4b5563">Submitted from: ${escapeHtml(`${new URL(request.url).origin}/contact.html#quote`)}<br>Submitted at: ${escapeHtml(new Date().toISOString())}</p>
  </div>
`;

const requireZohoSetting = (env, name) => {
  const value = typeof env[name] === "string" ? env[name].trim() : "";
  if (!value) {
    throw Object.assign(new Error("Zoho email delivery is not configured."), {
      code: "E_ZOHO_CONFIG"
    });
  }
  return value;
};

const getZohoEndpoints = (env) => {
  const dataCenter = String(env.ZOHO_DATA_CENTER || "us").trim().toLowerCase();
  const endpoints = ZOHO_DATA_CENTERS[dataCenter];
  if (!endpoints) {
    throw Object.assign(new Error("Zoho email delivery is not configured."), {
      code: "E_ZOHO_DATA_CENTER"
    });
  }
  return endpoints;
};

const getZohoAccessToken = async (env, fetchImpl) => {
  const clientId = requireZohoSetting(env, "ZOHO_CLIENT_ID");
  const clientSecret = requireZohoSetting(env, "ZOHO_CLIENT_SECRET");
  const refreshToken = requireZohoSetting(env, "ZOHO_REFRESH_TOKEN");
  const { accountsOrigin } = getZohoEndpoints(env);
  const useProductionCache = fetchImpl === fetch;

  if (useProductionCache && cachedZohoAccessToken?.expiresAt > Date.now()) {
    return cachedZohoAccessToken.value;
  }

  const tokenResponse = await fetchImpl(`${accountsOrigin}/oauth/v2/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token"
    }),
    cache: "no-store"
  });
  const tokenPayload = await tokenResponse.json().catch(() => null);
  const accessToken = typeof tokenPayload?.access_token === "string" ? tokenPayload.access_token.trim() : "";
  if (!tokenResponse.ok || !accessToken) {
    throw Object.assign(new Error("Zoho authorization failed."), {
      code: "E_ZOHO_AUTH"
    });
  }

  if (useProductionCache) {
    const expiresInSeconds = Number(tokenPayload.expires_in) || 3600;
    cachedZohoAccessToken = {
      value: accessToken,
      expiresAt: Date.now() + Math.max(0, expiresInSeconds * 1000 - TOKEN_EXPIRY_SKEW_MS)
    };
  }

  return accessToken;
};

export const sendNotification = async (submission, request, env, fetchImpl = fetch) => {
  const accountId = requireZohoSetting(env, "ZOHO_ACCOUNT_ID");
  if (!/^\d+$/.test(accountId)) {
    throw Object.assign(new Error("Zoho email delivery is not configured."), {
      code: "E_ZOHO_ACCOUNT"
    });
  }

  const { mailOrigin } = getZohoEndpoints(env);
  const accessToken = await getZohoAccessToken(env, fetchImpl);
  const subjectLabel = normalize(`${submission.name} / ${submission.company}`, 120);
  const providerResponse = await fetchImpl(`${mailOrigin}/api/accounts/${accountId}/messages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fromAddress: PPC_SENDER_EMAIL,
      toAddress: PPC_CONTACT_EMAIL,
      subject: `New PPC Website Inquiry — ${subjectLabel}`,
      content: formatHtmlEmail(submission, request),
      mailFormat: "html",
      encoding: "UTF-8"
    })
  });
  const providerPayload = await providerResponse.json().catch(() => null);
  const providerStatus = Number(providerPayload?.status?.code || providerResponse.status);
  if (!providerResponse.ok || providerStatus < 200 || providerStatus >= 300) {
    if (providerResponse.status === 401 || providerStatus === 401) {
      cachedZohoAccessToken = undefined;
    }
    throw Object.assign(new Error("Zoho rejected the email request."), {
      code: "E_ZOHO_SEND"
    });
  }

  return providerPayload;
};

export const handleContactRequest = async (request, env, fetchImpl = fetch) => {
  if (request.method !== "POST") {
    return respond(request, 405, "Use the contact form to submit a service request.", {}, { Allow: "POST" });
  }

  let parsed;
  try {
    parsed = await parseForm(request);
  } catch {
    return respond(request, 400, "We could not read the submitted form. Please try again.");
  }

  if (parsed.error) {
    return respond(request, parsed.status, parsed.error);
  }

  const { submission, errors, spam } = validateContactForm(parsed.formData);
  if (spam) {
    return respond(request, 400, "Submission blocked. Please refresh and try again.");
  }
  if (errors.length > 0) {
    return respond(request, 400, "Please complete or correct the highlighted fields before submitting.", { errors });
  }

  try {
    await sendNotification(submission, request, env, fetchImpl);
  } catch (error) {
    console.error("PPC contact email failed", {
      code: error?.code || "E_ZOHO_NETWORK"
    });
    return respond(
      request,
      503,
      "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com."
    );
  }

  return respond(
    request,
    200,
    "Thank you. PPC received your request and will follow up using the contact information provided."
  );
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/contact-request") {
      return handleContactRequest(request, env);
    }
    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers
    });
  }
};
