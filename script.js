const revealItems = document.querySelectorAll(".reveal");
const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.querySelector("#primary-menu");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

menuToggle?.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  primaryMenu?.classList.toggle("is-open", !expanded);
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

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
    return;
  }

  if (quoteForm.dataset.endpointConfigured !== "true") {
    event.preventDefault();
    formStatus.textContent = "Online request submission will be available at launch. PPC must connect the form endpoint before production use.";
    formStatus.classList.add("success");
  }
});
