/**
 * Pastel Bloom Studio — Main interactions
 */

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav__link");
  const sections = document.querySelectorAll("section[id], header[id]");
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                     */
  /* ------------------------------------------------------------------ */

  function closeMobileNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    siteNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    siteNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileNav();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Header scroll state                                                   */
  /* ------------------------------------------------------------------ */

  function updateHeaderScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  /* ------------------------------------------------------------------ */
  /* Active nav link on scroll                                             */
  /* ------------------------------------------------------------------ */

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    let currentId = "inicio";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      const isActive = href === "#" + currentId;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ------------------------------------------------------------------ */
  /* Scroll reveal animations                                              */
  /* ------------------------------------------------------------------ */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form (visual only)                                            */
  /* ------------------------------------------------------------------ */

  const validators = {
    nombre: function (value) {
      if (!value.trim()) return "Por favor, ingresa tu nombre.";
      if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return "";
    },
    email: function (value) {
      if (!value.trim()) return "Por favor, ingresa tu correo electrónico.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value.trim())) return "Ingresa un correo electrónico válido.";
      return "";
    },
    asunto: function (value) {
      if (!value.trim()) return "Por favor, indica un asunto.";
      return "";
    },
    mensaje: function (value) {
      if (!value.trim()) return "Por favor, escribe tu mensaje.";
      if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    },
  };

  function showFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById("error-" + fieldName);

    if (input) {
      input.classList.toggle("is-invalid", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function validateForm() {
    let isValid = true;

    Object.keys(validators).forEach(function (fieldName) {
      const input = document.getElementById(fieldName);
      if (!input) return;

      const error = validators[fieldName](input.value);
      showFieldError(fieldName, error);

      if (error) {
        isValid = false;
      }
    });

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (formSuccess) {
        formSuccess.hidden = true;
      }

      if (!validateForm()) {
        const firstInvalid = contactForm.querySelector(".is-invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      contactForm.reset();
      Object.keys(validators).forEach(function (fieldName) {
        showFieldError(fieldName, "");
      });

      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.focus();
      }
    });

    Object.keys(validators).forEach(function (fieldName) {
      const input = document.getElementById(fieldName);
      if (!input) return;

      input.addEventListener("blur", function () {
        const error = validators[fieldName](input.value);
        showFieldError(fieldName, error);
      });

      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          const error = validators[fieldName](input.value);
          if (!error) {
            showFieldError(fieldName, "");
          }
        }
      });
    });
  }
})();
