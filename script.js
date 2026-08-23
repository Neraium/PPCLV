const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.querySelector("#primary-menu");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");
const emailInput = quoteForm?.querySelector('[name="email"]');
const phoneInput = quoteForm?.querySelector('[name="phone"]');
const submitButton = quoteForm?.querySelector("[data-submit-button]");
let isSubmitting = false;

const closeMenu = ({ restoreFocus = false } = {}) => {
  if (!menuToggle || !primaryMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryMenu.classList.remove("is-open");
  if (restoreFocus) menuToggle.focus();
};

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  primaryMenu?.classList.toggle("is-open", !expanded);
});

primaryMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("click", (event) => {
  if (!menuToggle || !primaryMenu || !primaryMenu.classList.contains("is-open")) return;
  if (!event.target.closest("[data-site-header]")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryMenu?.classList.contains("is-open")) {
    closeMenu({ restoreFocus: true });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

const clearContactError = () => {
  emailInput?.setCustomValidity("");
  emailInput?.removeAttribute("aria-invalid");
  phoneInput?.removeAttribute("aria-invalid");
};

emailInput?.addEventListener("input", clearContactError);
phoneInput?.addEventListener("input", clearContactError);
quoteForm?.addEventListener("input", (event) => {
  event.target.removeAttribute?.("aria-invalid");
});
quoteForm?.addEventListener("change", (event) => {
  event.target.removeAttribute?.("aria-invalid");
});

const setFormStatus = (message, type) => {
  if (!formStatus) return;
  formStatus.className = "form-status";
  formStatus.textContent = message;
  if (type) formStatus.classList.add(type);
};

const fieldForServerError = (error) => {
  if (/^Name /.test(error)) return "name";
  if (/^Company or property /.test(error)) return "company";
  if (/^Email /.test(error) || /valid email/.test(error)) return "email";
  if (/^Phone /.test(error) || /valid phone/.test(error)) return "phone";
  if (/valid service/.test(error)) return "service_needed";
  if (/^Property type /.test(error)) return "property_type";
  if (/^Message /.test(error)) return "message";
  if (/Privacy consent/.test(error)) return "privacy_consent";
  return null;
};

const applyServerErrors = (errors) => {
  if (!Array.isArray(errors)) return false;
  const fields = errors
    .map(fieldForServerError)
    .filter(Boolean)
    .map((name) => quoteForm.querySelector(`[name="${name}"]`))
    .filter(Boolean);
  for (const field of fields) field.setAttribute("aria-invalid", "true");
  fields[0]?.focus();
  return fields.length > 0;
};

quoteForm?.addEventListener("submit", async (event) => {
  if (isSubmitting) {
    event.preventDefault();
    return;
  }
  if (!formStatus || !window.fetch) return;
  event.preventDefault();
  setFormStatus("", "");

  const spamField = quoteForm.querySelector('[name="website"]');
  if (spamField?.value) {
    setFormStatus("Submission blocked. Please refresh and try again.", "error");
    return;
  }

  clearContactError();

  if (!quoteForm.checkValidity()) {
    setFormStatus("Please complete or correct the highlighted fields before submitting.", "error");
    quoteForm.reportValidity();
    quoteForm.querySelector(":invalid")?.focus();
    return;
  }

  if (!emailInput?.value.trim() && !phoneInput?.value.trim()) {
    const message = "Please enter an email address or phone number so PPC can follow up.";
    emailInput?.setCustomValidity(message);
    emailInput?.setAttribute("aria-invalid", "true");
    phoneInput?.setAttribute("aria-invalid", "true");
    setFormStatus(message, "error");
    emailInput?.reportValidity();
    emailInput?.focus();
    return;
  }

  isSubmitting = true;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const response = await fetch(quoteForm.action, {
      method: "POST",
      body: new FormData(quoteForm),
      headers: {
        Accept: "application/json",
        "X-Requested-With": "fetch"
      }
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      const message = typeof result?.message === "string"
        ? result.message
        : "We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com.";
      setFormStatus(message, "error");
      if (!applyServerErrors(result?.errors)) formStatus.focus();
      return;
    }
    quoteForm.reset();
    setFormStatus(typeof result?.message === "string" ? result.message : "Thank you. PPC received your request and will follow up using the contact information provided.", "success");
    formStatus.focus();
  } catch {
    setFormStatus("We could not send your request right now. Please call 702-357-7027 or email Adria@ProfessionalPoolCare.com.", "error");
    formStatus.focus();
  } finally {
    isSubmitting = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Request Service";
    }
  }
});
