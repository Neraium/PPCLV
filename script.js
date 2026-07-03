const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const revealItems = document.querySelectorAll(".reveal");
const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

quoteForm?.addEventListener("submit", () => {
  if (!formStatus) return;
  formStatus.textContent = "Opening your email app. Replace the placeholder company email before launch.";
});

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
