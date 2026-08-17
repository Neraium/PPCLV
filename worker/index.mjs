const PPC_CONTACT_EMAIL = "Adria@ProfessionalPoolCare.com";
const PPC_SENDER_EMAIL = "Adria@ProfessionalPoolCare.com";
const MAX_BODY_BYTES = 32_000;

const APPROVED_SERVICES = new Set([
  "Commercial Pool Maintenance",
  "Commercial Spa Maintenance",
  "Equipment Repair & Troubleshooting",
  "Chemical Feed & Automation Support",
  "Acid Washing & Surface Restoration",
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

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });

const html = (title, message, status = 200) =>
  new Response(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(title)} | PPC LLC</title><link rel="stylesheet" href="/styles.css"></head><body><main class="section legal-content"><div class="container narrow"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><p><a class="btn btn-primary" href="/contact.html#quote">Return to contact form</a></p></div></main></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );

const prefersJson = (request) => {
  const accept = request.headers.get("accept") || "";
  const requestedWith = request.headers.get("x-requested-with") || "";
  return accept.includes("application/json") || requestedWith.toLowerCase() === "fetch";
};

const respond = (request, status, message, details = {}) => {
  if (prefersJson(request)) {
    return json({ ok: status >= 200 && status < 300, message, ...details }, status);
  }
  return html(status >= 200 && status < 300 ? "Request Received" : "Request Not Sent", message, status);
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
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const getField = (formData, name) => normalize(formData.get(name), textLimits[name] || 200);

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
  if (
    !contentType.includes("application/x-www-form-urlencoded") &&
    !contentType.includes("multipart/form-data")
  ) {
    return { error: "Submit the form using the PPC contact page.", status: 415 };
  }

  const formData = await request.formData();
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
    message: String(formData.get("message") || "").trim().slice(0, textLimits.message),
    privacyConsent: hasConsent(formData.get("privacy_consent")),
    website: normalize(formData.get("website"), 200)
  };

  const errors = [];

  if (submission.website) {
    return { submission, errors: ["Submission blocked."], spam: true };
  }

  if (!submission.name) errors.push("Name is required.");
  if (!submission.company) errors.push("Company or property is required.");
  if (!submission.email && !submission.phone) errors.push("Email or phone is required.");
  if (submission.email && !isValidEmail(submission.email)) errors.push("Enter a valid email address.");
  if (submission.phone && !isValidPhone(submission.phone)) errors.push("Enter a valid phone number.");
  if (!APPROVED_SERVICES.has(submission.serviceNeeded)) errors.push("Select a valid service.");
  if (!submission.message) errors.push("Message is required.");
  if (submission.message.length < 10) errors.push("Message is too short.");
  if (!submission.privacyConsent) errors.push("Privacy consent is required.");

  return { submission, errors, spam: false };
};

const formatTextEmail = (submission, request) => [
  "New PPC website service request",
  "",
  `Name: ${submission.name}`,
  `Company / Property: ${submission.company}`,
  `Email: ${submission.email || "Not provided"}`,
  `Phone: ${submission.phone || "Not provided"}`,
  `Service Needed: ${submission.serviceNeeded}`,
  `Property Type: ${submission.propertyType || "Not provided"}`,
  "",
  "Message:",
  submission.message,
  "",
  `Submitted from: ${new URL(request.url).origin}/contact.html#quote`,
  `Submitted at: ${new Date().toISOString()}`
].join("\n");

const formatHtmlEmail = (submission, request) => `
  <h1>New PPC website service request</h1>
  <dl>
    <dt>Name</dt><dd>${escapeHtml(submission.name)}</dd>
    <dt>Company / Property</dt><dd>${escapeHtml(submission.company)}</dd>
    <dt>Email</dt><dd>${escapeHtml(submission.email || "Not provided")}</dd>
    <dt>Phone</dt><dd>${escapeHtml(submission.phone || "Not provided")}</dd>
    <dt>Service Needed</dt><dd>${escapeHtml(submission.serviceNeeded)}</dd>
    <dt>Property Type</dt><dd>${escapeHtml(submission.propertyType || "Not provided")}</dd>
  </dl>
  <h2>Message</h2>
  <p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>
  <p>Submitted from: ${escapeHtml(`${new URL(request.url).origin}/contact.html#quote`)}</p>
  <p>Submitted at: ${escapeHtml(new Date().toISOString())}</p>
`;

const sendNotification = async (submission, request, env) => {
  if (!env.PPC_CONTACT_EMAIL?.send) {
    throw Object.assign(new Error("Cloudflare Email Service binding is not configured."), {
      code: "E_BINDING_MISSING"
    });
  }

  const replyTo = submission.email
    ? { email: submission.email, name: submission.name }
    : undefined;

  return env.PPC_CONTACT_EMAIL.send({
    to: { email: PPC_CONTACT_EMAIL, name: "Professional Pool Care LLC" },
    from: { email: PPC_SENDER_EMAIL, name: "PPC LLC Website" },
    replyTo,
    subject: `PPC service request: ${submission.serviceNeeded}`,
    text: formatTextEmail(submission, request),
    html: formatHtmlEmail(submission, request),
    headers: {
      "X-PPC-Form": "commercial-service-request"
    }
  });
};

export const handleContactRequest = async (request, env) => {
  if (request.method !== "POST") {
    return respond(request, 405, "Use the contact form to submit a service request.");
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
    await sendNotification(submission, request, env);
  } catch (error) {
    console.error("PPC contact email failed", {
      code: error?.code,
      message: error?.message
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
    return env.ASSETS.fetch(request);
  }
};
