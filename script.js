const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.querySelector("#primary-menu");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

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

  if (!quoteForm.checkValidity()) {
    event.preventDefault();
    formStatus.textContent = "Please complete the required fields before submitting.";
    formStatus.classList.add("error");
    quoteForm.reportValidity();
    quoteForm.querySelector(":invalid")?.focus();
    return;
  }

  if (quoteForm.dataset.endpointConfigured !== "true") {
    event.preventDefault();
    formStatus.textContent = "This concept form is not yet connected to a live inbox. PPC’s preferred system would be configured for production.";
    formStatus.classList.add("error");
  }
});
