(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = mainNav.querySelectorAll('.header__nav-link');
  const contactForm = document.getElementById('contactForm');
  const notification = document.getElementById('notification');

  let notificationTimer = null;

  function toggleMenu(forceClose) {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const shouldClose = forceClose === true;
    const newState = shouldClose ? false : !isOpen;

    menuToggle.setAttribute('aria-expanded', newState);
    mainNav.classList.toggle('header__nav--open', newState);
    menuToggle.setAttribute('aria-label', newState ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  menuToggle.addEventListener('click', function () {
    toggleMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('header__nav--open')) {
      toggleMenu(true);
      menuToggle.focus();
    }
  });

  function handleScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function showNotification(message, type) {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
      notificationTimer = null;
    }

    notification.textContent = message;
    notification.className = 'notification';

    if (type === 'success') {
      notification.classList.add('notification--success');
    }

    requestAnimationFrame(function () {
      notification.classList.add('notification--visible');
    });

    notificationTimer = setTimeout(function () {
      notification.classList.remove('notification--visible');
      notificationTimer = null;
    }, 4000);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showNotification('Por favor, completa todos los campos del formulario.', 'error');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }

    showNotification(
      '¡Gracias por contactarnos ' + name + '! Te responderemos a la brevedad. Mientras tanto, puedes seguir nuestro trabajo en redes sociales.',
      'success'
    );

    contactForm.reset();
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 72;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

}());
