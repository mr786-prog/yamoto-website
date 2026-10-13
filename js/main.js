/**
 * Yamoto Tyre Shop — Main Interactive JavaScript
 * Lightweight, fast, vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initOpenStatus();
  initHeroSlider();
  initMobileMenu();
  initTracking();
});

/* ==========================================================================
   1. Live Opening Hours Status (IST Timezone: UTC+5:30)
   ========================================================================== */
function initOpenStatus() {
  const badge = document.getElementById('open-badge');
  const badgeText = document.getElementById('open-badge-text');
  if (!badge || !badgeText) return;

  function updateStatus() {
    // Current time in IST (UTC+5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));

    const day = istTime.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentDecimalHour = hours + (minutes / 60);

    let isOpen = false;

    if (day === 0) {
      // Sunday: 10:00 AM - 3:00 PM (15:00)
      isOpen = (currentDecimalHour >= 10 && currentDecimalHour < 15);
    } else {
      // Monday to Saturday: 10:00 AM - 9:00 PM (21:00)
      isOpen = (currentDecimalHour >= 10 && currentDecimalHour < 21);
    }

    if (isOpen) {
      badge.classList.remove('closed');
      badgeText.textContent = 'Open Now';
    } else {
      badge.classList.add('closed');
      if (day === 0 && currentDecimalHour >= 15) {
        badgeText.textContent = 'Closed · Opens Mon 10 AM';
      } else if (currentDecimalHour < 10) {
        badgeText.textContent = 'Closed · Opens 10 AM';
      } else {
        badgeText.textContent = 'Closed · Opens 10 AM';
      }
    }
  }

  updateStatus();
  // Refresh status every 2 minutes
  setInterval(updateStatus, 120000);
}

/* ==========================================================================
   2. Hero Slider with Auto-Advance, Indicators & Arrows
   ========================================================================== */
function initHeroSlider() {
  const hero = document.getElementById('hero');
  const slides = hero ? hero.querySelectorAll('.hero-slide') : [];
  const indicators = hero ? hero.querySelectorAll('.indicator') : [];
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 6000; // 6 seconds

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].setAttribute('aria-hidden', 'true');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove('active');
    }

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].setAttribute('aria-hidden', 'false');
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

/* ==========================================================================
   3. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileNav.setAttribute('aria-hidden', !isOpen);
  });

  // Close when clicking a link
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ==========================================================================
   4. Lightweight Event / Conversion Tracking
   ========================================================================== */
function initTracking() {
  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-track');
      // Dispatch custom event for tag manager or analytics if plugged in
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'yamoto_interaction', action: action });
      }
    });
  });
}
