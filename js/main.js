/**
 * Yamoto Tyre Shop — Main Interactive JavaScript
 * Lightweight, fast, vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initOpenStatus();
  initHeroSlider();
  initMobileMenu();
  initTracking();
  initQuoteForm();
  initLazyBackgrounds();
});

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const serviceSelect = document.getElementById('service-select');
  const otherServiceLabel = document.getElementById('other-service-label');
  const otherServiceInput = document.getElementById('other-service-input');

  if (serviceSelect && otherServiceLabel && otherServiceInput) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'Other') {
        otherServiceLabel.style.display = '';
        otherServiceInput.required = true;
      } else {
        otherServiceLabel.style.display = 'none';
        otherServiceInput.required = false;
        otherServiceInput.value = '';
      }
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const service = data.get('service');
    const otherService = data.get('other-service');
    const visit = data.get('visit');

    const lines = [
      'Hi Yamoto, I need a quote.',
      `Name: ${data.get('name')}`,
      `Mobile: ${data.get('mobile')}`,
      `Car: ${data.get('car')}`,
      `Service: ${service === 'Other' ? otherService : service}`
    ];

    if (visit) {
      lines.push(`Other information: ${visit}`);
    }

    window.open(`https://wa.me/919676065353?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });
}

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

  function loadSlideImages(slide) {
    slide.querySelectorAll('img[data-src]').forEach((img) => {
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].inert = true;
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.remove('active');
    }

    currentSlide = (index + slides.length) % slides.length;

    loadSlideImages(slides[currentSlide]);
    slides[currentSlide].classList.add('active');
    slides[currentSlide].inert = false;
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

  // Fetch slide 2's image only after the page has finished loading,
  // so it never competes with the hero (LCP) image.
  const preloadRest = () => slides.forEach(loadSlideImages);
  if (document.readyState === 'complete') setTimeout(preloadRest, 1500);
  else window.addEventListener('load', () => setTimeout(preloadRest, 1500), { once: true });

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
    mobileNav.inert = !isOpen;
  });

  // Close when clicking a link
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.inert = true;
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

/* ==========================================================================
   Lazy-load decorative section backgrounds (they sit under dark overlays)
   ========================================================================== */
function initLazyBackgrounds() {
  const els = document.querySelectorAll('.lazy-bg[data-bg]');
  if (!els.length) return;
  const load = (el) => {
    el.style.backgroundImage = `url("${el.dataset.bg}")`;
    el.classList.add('bg-loaded');
  };
  if (!('IntersectionObserver' in window)) { els.forEach(load); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { load(entry.target); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '300px 0px' });
  const start = () => els.forEach((el) => io.observe(el));
  // Start observing only after the page has loaded, so decorative
  // backgrounds never compete with the hero image.
  const afterLoad = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 500));
  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });
}
