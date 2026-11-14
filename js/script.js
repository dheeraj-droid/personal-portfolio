"use strict";

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeIcon = document.querySelector("#theme-icon");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let chosenTheme = null;

// Storage may be unavailable in private or restricted browser contexts.
try {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") chosenTheme = savedTheme;
} catch { /* Theme switching still works for this visit. */ }

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeLabel.textContent = isDark ? "Light" : "Dark";
  themeIcon.textContent = isDark ? "☀" : "◐";
}

applyTheme(chosenTheme || (systemTheme.matches ? "dark" : "light"));
themeToggle.hidden = false;
themeToggle.addEventListener("click", () => {
  chosenTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(chosenTheme);
  try { localStorage.setItem("portfolio-theme", chosenTheme); } catch { /* Optional persistence. */ }
});
systemTheme.addEventListener("change", (event) => {
  if (!chosenTheme) applyTheme(event.matches ? "dark" : "light");
});

function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  document.querySelector("#greeting").textContent = `${greeting}, welcome to my corner of the web.`;
  document.querySelector("#year").textContent = now.getFullYear();
}
updateGreeting();
window.setInterval(updateGreeting, 60_000);

const welcomeButton = document.querySelector("#welcome-button");
welcomeButton.hidden = false;
welcomeButton.addEventListener("click", () => {
  document.querySelector("#welcome-message").textContent = "Welcome! Thanks for stopping by. Explore my projects, or head to Contact to connect.";
});

const contactForm = document.querySelector("#contact-form");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");
const fields = [
  { input: document.querySelector("#full-name"), error: document.querySelector("#name-error"), label: "your full name" },
  { input: document.querySelector("#email"), error: document.querySelector("#email-error"), label: "your email address" },
  { input: document.querySelector("#message"), error: document.querySelector("#message-error"), label: "a message" }
];
let hasSubmitted = false;
let lastValidatedValues = null;
submitButton.disabled = false;

function validateField(field) {
  const value = field.input.value.trim();
  let error = "";
  if (!value) error = `Please enter ${field.label}.`;
  else if (field.input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Enter a valid email address, such as you@example.com.";
  }
  field.error.textContent = error;
  field.input.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  hasSubmitted = true;
  const results = fields.map(validateField);
  if (results.includes(false)) {
    formStatus.dataset.state = "error";
    formStatus.textContent = "Please correct the highlighted fields. Your message has not been sent.";
    fields[results.indexOf(false)].input.focus();
    lastValidatedValues = null;
    return;
  }

  const values = JSON.stringify(fields.map(({ input }) => input.value.trim()));
  formStatus.dataset.state = "success";
  // Repeated submissions produce one clear status, never duplicate content.
  formStatus.textContent = values === lastValidatedValues
    ? "This message is already validated. No email has been sent; use the email link to contact me."
    : "Success! Your message passed validation. This is a demo, so no email was sent. Use the email link to contact me.";
  lastValidatedValues = values;
});

fields.forEach((field) => {
  field.input.addEventListener("input", () => {
    if (hasSubmitted) validateField(field);
    formStatus.textContent = "";
    lastValidatedValues = null;
  });
});

// Native anchor links remain functional without JavaScript.
if ("IntersectionObserver" in window) {
  const navLinks = [...document.querySelectorAll("nav a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
}
