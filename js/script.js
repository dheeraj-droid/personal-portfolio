// Switch between light and dark themes.
const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  themeButton.setAttribute("aria-pressed", isDark);

  if (isDark) {
    themeButton.setAttribute("aria-label", "Switch to light theme");
  } else {
    themeButton.setAttribute("aria-label", "Switch to dark theme");
  }
});

// Display a greeting using the visitor's current hour.
function showGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");

  if (hour < 12) {
    greeting.textContent = "Good Morning!";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon!";
  } else {
    greeting.textContent = "Good Evening!";
  }
}

showGreeting();

// Highlight the section the visitor is viewing.
const navigationLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section[id]");
let currentSection = "home";

function setCurrentSection(id) {
  currentSection = id;
  navigationLinks.forEach(function (link) {
    if (link.getAttribute("href") === "#" + id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    setCurrentSection(link.getAttribute("href").slice(1));
  });
});

function updateCurrentSection() {
  let closestTop = -Infinity;
  let matches = [];
  sections.forEach(function (section) {
    const top = section.getBoundingClientRect().top;
    if (top <= window.innerHeight * 0.4) {
      if (top > closestTop + 1) {
        closestTop = top;
        matches = [section.id];
      } else if (Math.abs(top - closestTop) <= 1) {
        matches.push(section.id);
      }
    }
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    setCurrentSection("contact");
  } else if (matches.length > 0 && !matches.includes(currentSection)) {
    setCurrentSection(matches[0]);
  }
}

window.addEventListener("scroll", updateCurrentSection);
updateCurrentSection();

document.getElementById("welcome-button").addEventListener("click", function () {
  document.getElementById("welcome-message").textContent =
    "Welcome! Thank you for visiting my portfolio.";
});

// Check each contact field when the form is submitted.
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

function showError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.setAttribute("aria-invalid", message !== "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  showError(nameInput, "name-error", "");
  showError(emailInput, "email-error", "");
  showError(messageInput, "message-error", "");
  formStatus.textContent = "";

  if (nameInput.value.trim() === "") {
    showError(nameInput, "name-error", "Please enter your full name.");
    isValid = false;
  }

  // Require text before and after @, followed by a dot and a domain ending.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    showError(emailInput, "email-error", "Please enter your email address.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "email-error", "Please enter a valid email, such as name@example.com.");
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "message-error", "Please enter a message.");
    isValid = false;
  }

  if (isValid) {
    // Replace the same message on every click, avoiding duplicate feedback.
    formStatus.textContent = "Success! Your details are valid. This is a demo; no message was sent.";
  } else {
    formStatus.textContent = "Please correct the errors above.";
    form.querySelector('[aria-invalid="true"]').focus();
  }
});

// Remove old success feedback when the visitor changes the form.
form.addEventListener("input", function () {
  formStatus.textContent = "";
});
