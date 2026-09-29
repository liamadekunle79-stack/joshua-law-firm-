/* ============================================================
   JOSHUA'S FIRMS — Premium Law Firm JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Loading Screen ── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var ls = document.getElementById('loading-screen');
      if (ls) ls.classList.add('hidden');
    }, 1400);
  });

  /* ── Navbar Scroll ── */
  var navbar = document.getElementById('navbar');
  function updateNav() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.remove('nav-transparent');
      navbar.classList.add('nav-solid');
    } else {
      navbar.classList.remove('nav-solid');
      navbar.classList.add('nav-transparent');
    }
  }
  if (navbar) {
    navbar.classList.add('nav-transparent');
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile Menu ── */
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.nav-link, .btn').forEach(function (el) {
      el.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Hero Slider ── */
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hero-dot');
  var counter = document.getElementById('hero-current');
  var current = 0;
  var autoTimer = null;
  var AUTO_DELAY = 6000;

  function goTo(n) {
    if (!slides.length) return;
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () { goTo(current + 1); }, AUTO_DELAY);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (slides.length) {
    goTo(0);
    startAuto();

    var prevBtn = document.getElementById('hero-prev');
    var nextBtn = document.getElementById('hero-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
    });

    /* Touch/swipe */
    var startX = 0;
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
      heroEl.addEventListener('touchend', function (e) {
        var diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
      }, { passive: true });
    }
  }

  /* ── Scroll Reveal ── */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Active Nav Link ── */
  var navLinks = document.querySelectorAll('.nav-link[data-page]');
  var bodyPage = document.body.dataset.page;
  navLinks.forEach(function (link) {
    if (link.dataset.page === bodyPage) link.classList.add('active');
  });

  /* ── Service card expand/collapse ── */
  document.querySelectorAll('.service-card').forEach(function (card) {
    var toggleBtn = card.querySelector('.btn-ghost');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', function () {
      var expanded = card.classList.toggle('expanded');
      toggleBtn.textContent = expanded ? 'Show Less' : 'Learn More';
    });
  });

  /* ── Contact form ── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('[type="submit"]');
      var originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending\u2026';
        submitBtn.disabled = true;
      }
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.innerHTML = 'Message Sent \u2713';
          submitBtn.style.background = 'var(--warm-brown)';
        }
        setTimeout(function () {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }
          contactForm.reset();
        }, 3000);
      }, 1600);
    });
  }

  /* ── Page hero load animation ── */
  var pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    setTimeout(function () { pageHero.classList.add('loaded'); }, 100);
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
