document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initFooterYear();
  initRevealOnScroll();
  initDemoForms();
});

/** Mobile menu toggle */
function initMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/** Current year in the footer */
function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/** Fade elements in once as they scroll into view */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
}

/** Front-end only contact form: shows a confirmation, sends nothing yet */
function initDemoForms() {
  const notice = document.querySelector(".notice");
  let timer;

  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: replace with a real request (Formspree, EmailJS, your own API...)
      if (notice) {
        notice.textContent = "Thank you! Your message has been received.";
        notice.style.display = "block";
        clearTimeout(timer);
        timer = setTimeout(() => { notice.style.display = "none"; }, 3500);
      }
      form.reset();
    });
  });
}
