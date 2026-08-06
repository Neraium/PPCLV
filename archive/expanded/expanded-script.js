const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.querySelector("#primary-menu");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");
const emailInput = quoteForm?.querySelector('[name="email"]');
const phoneInput = quoteForm?.querySelector('[name="phone"]');

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
  if (window.innerWidth > 1040) closeMenu();
});

const clearContactError = () => {
  emailInput?.setCustomValidity("");
  emailInput?.removeAttribute("aria-invalid");
  phoneInput?.removeAttribute("aria-invalid");
};

emailInput?.addEventListener("input", clearContactError);
phoneInput?.addEventListener("input", clearContactError);

quoteForm?.addEventListener("submit", (event) => {
  if (!formStatus) return;
  formStatus.className = "form-status";

  const spamField = quoteForm.querySelector('[name="website"]');
  if (spamField?.value) {
    event.preventDefault();
    formStatus.textContent = "Submission blocked. Please refresh and try again.";
    formStatus.classList.add("error");
    return;
  }

  clearContactError();

  if (!quoteForm.checkValidity()) {
    event.preventDefault();
    formStatus.textContent = "Please complete or correct the highlighted fields before submitting.";
    formStatus.classList.add("error");
    quoteForm.reportValidity();
    quoteForm.querySelector(":invalid")?.focus();
    return;
  }

  if (!emailInput?.value.trim() && !phoneInput?.value.trim()) {
    event.preventDefault();
    const message = "Please enter an email address or phone number so PPC can follow up.";
    emailInput?.setCustomValidity(message);
    emailInput?.setAttribute("aria-invalid", "true");
    phoneInput?.setAttribute("aria-invalid", "true");
    formStatus.textContent = message;
    formStatus.classList.add("error");
    emailInput?.reportValidity();
    emailInput?.focus();
    return;
  }

  if (quoteForm.dataset.endpointConfigured !== "true") {
    event.preventDefault();
    formStatus.textContent = "This concept form is not yet connected to a live inbox. PPC’s preferred system would be configured for production.";
    formStatus.classList.add("error");
  }
});
