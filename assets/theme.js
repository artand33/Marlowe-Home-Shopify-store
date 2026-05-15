/* =====================================================
   MARLOWE HOME — THEME JS
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initAnnouncementBar();
  initStickyHeader();
  initMobileNav();
  initAccordions();
  initFaqAccordions();
  initCarousels();
  initProductGallery();
  initStickyATC();
  initVariantSelector();
  initCartQty();
});

/* =====================================================
   ANNOUNCEMENT BAR
   ===================================================== */

function initAnnouncementBar() {
  const messages = document.querySelectorAll('.announcement-bar__message');
  if (!messages.length) return;

  let current = 0;
  const total = messages.length;

  function showMessage(index) {
    messages.forEach(m => m.classList.remove('is-active'));
    messages[index].classList.add('is-active');
  }

  function nextMessage() {
    current = (current + 1) % total;
    showMessage(current);
  }

  function prevMessage() {
    current = (current - 1 + total) % total;
    showMessage(current);
  }

  showMessage(0);
  let interval = setInterval(nextMessage, 4000);

  const prevBtn = document.querySelector('.announcement-bar__arrow--prev');
  const nextBtn = document.querySelector('.announcement-bar__arrow--next');

  if (prevBtn) prevBtn.addEventListener('click', function () {
    clearInterval(interval);
    prevMessage();
    interval = setInterval(nextMessage, 4000);
  });

  if (nextBtn) nextBtn.addEventListener('click', function () {
    clearInterval(interval);
    nextMessage();
    interval = setInterval(nextMessage, 4000);
  });
}

/* =====================================================
   STICKY HEADER
   ===================================================== */

function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* =====================================================
   MOBILE NAV
   ===================================================== */

function initMobileNav() {
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav__close');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    mobileNav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  function closeNav() {
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
}

/* =====================================================
   ACCORDIONS (Collapsible Info + FAQ)
   ===================================================== */

function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');

      // Close siblings in same container
      const parent = item.parentElement;
      parent.querySelectorAll('.accordion-item.is-open').forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove('is-open');
      });

      item.classList.toggle('is-open', !isOpen);
    });
  });
}

/* =====================================================
   FAQ ACCORDIONS (Homepage — .faq-trigger)
   ===================================================== */

function initFaqAccordions() {
  const triggers = document.querySelectorAll('.faq-trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all open siblings
      const list = item.closest('.faq-section__list');
      if (list) {
        list.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* =====================================================
   CAROUSELS
   ===================================================== */

function initCarousels() {
  const wrappers = document.querySelectorAll('.carousel-wrapper');

  wrappers.forEach(function (wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-btn--prev');
    const nextBtn = wrapper.querySelector('.carousel-btn--next');
    if (!track) return;

    let position = 0;

    function getSlideWidth() {
      const card = track.querySelector('.product-card');
      if (!card) return 0;
      return card.offsetWidth + 24;
    }

    function getMaxPosition() {
      const containerWidth = wrapper.querySelector('.carousel-track-container').offsetWidth;
      return Math.max(0, track.scrollWidth - containerWidth);
    }

    function slide(dir) {
      const step = getSlideWidth() * 2;
      position = Math.min(Math.max(0, position + dir * step), getMaxPosition());
      track.style.transform = 'translateX(-' + position + 'px)';
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { slide(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { slide(1); });
  });
}

/* =====================================================
   PRODUCT GALLERY
   ===================================================== */

function initProductGallery() {
  const gallery = document.querySelector('.product-gallery');
  if (!gallery) return;

  const mainImg = gallery.querySelector('.product-gallery__main img');
  const thumbs = gallery.querySelectorAll('.product-gallery__thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');

      const newSrc = thumb.dataset.fullSrc || thumb.querySelector('img').src;
      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  if (thumbs.length) thumbs[0].classList.add('is-active');
}

/* =====================================================
   STICKY ATC (mobile)
   ===================================================== */

function initStickyATC() {
  const atcSection = document.querySelector('.main-product');
  const stickyBar = document.querySelector('.sticky-atc');
  const mainATC = document.querySelector('.product-info__atc');
  if (!atcSection || !stickyBar || !mainATC) return;

  function checkVisibility() {
    const rect = mainATC.getBoundingClientRect();
    const isPastATC = rect.bottom < 0;
    stickyBar.classList.toggle('is-visible', isPastATC);
    stickyBar.style.display = isPastATC ? 'flex' : 'none';
  }

  // Only show on mobile
  if (window.innerWidth <= 768) {
    window.addEventListener('scroll', checkVisibility, { passive: true });
  }
}

/* =====================================================
   VARIANT SELECTOR
   ===================================================== */

function initVariantSelector() {
  const options = document.querySelectorAll('.variant-option');

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      const group = option.closest('.variant-options');
      group.querySelectorAll('.variant-option').forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
    });
  });
}

/* =====================================================
   CART QTY BUTTONS
   ===================================================== */

function initCartQty() {
  document.querySelectorAll('.cart-item__qty').forEach(function (qtyWrap) {
    const minusBtn = qtyWrap.querySelector('.cart-item__qty-btn--minus');
    const plusBtn = qtyWrap.querySelector('.cart-item__qty-btn--plus');
    const val = qtyWrap.querySelector('.cart-item__qty-val');
    if (!val) return;

    if (minusBtn) {
      minusBtn.addEventListener('click', function () {
        let v = parseInt(val.value || val.textContent) - 1;
        if (v < 1) v = 1;
        val.value ? (val.value = v) : (val.textContent = v);
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', function () {
        let v = parseInt(val.value || val.textContent) + 1;
        val.value ? (val.value = v) : (val.textContent = v);
      });
    }
  });
}
