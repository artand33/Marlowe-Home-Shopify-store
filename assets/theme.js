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
  initProductMainGallery();
  initStickyATC();
  initVariantSelector();
  initVariantSwitcher();
  initCartQty();
  initQtySelector();
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
  const header = document.querySelector('.site-header');
  if (!header) return;

  const mobileMq = window.matchMedia('(max-width: 768px)');
  let mobileHeaderHeight = 0;

  function measureMobileHeader() {
    if (!mobileMq.matches) {
      mobileHeaderHeight = 0;
      header.classList.remove('is-past-header');
      return;
    }
    const wasPast = header.classList.contains('is-past-header');
    header.classList.remove('is-past-header');
    mobileHeaderHeight = header.offsetHeight;
    if (wasPast && window.scrollY > mobileHeaderHeight) {
      header.classList.add('is-past-header');
    }
  }

  function isDesktopScrolled() {
    const announcement = document.querySelector('.announcement-bar');
    if (announcement && announcement.getBoundingClientRect().bottom > 0) {
      return false;
    }
    return window.scrollY > 30;
  }

  function updateDesktopHeaderPosition() {
    if (mobileMq.matches) {
      header.style.transform = '';
      return;
    }

    const announcement = document.querySelector('.announcement-bar');
    if (!announcement) {
      header.style.transform = '';
      return;
    }

    const annBottom = announcement.getBoundingClientRect().bottom;
    header.style.transform = annBottom > 0 ? 'translate3d(0, ' + annBottom + 'px, 0)' : '';
  }

  function updateHeader() {
    const scrolled = mobileMq.matches ? window.scrollY > 30 : isDesktopScrolled();
    header.classList.toggle('is-scrolled', scrolled);

    if (mobileMq.matches) {
      if (!mobileHeaderHeight) measureMobileHeader();
      header.classList.toggle('is-past-header', window.scrollY > mobileHeaderHeight);
      header.style.transform = '';
    } else {
      header.classList.remove('is-past-header');
      updateDesktopHeaderPosition();
    }
  }

  measureMobileHeader();
  updateHeader();

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', function () {
    measureMobileHeader();
    updateHeader();
  }, { passive: true });
  mobileMq.addEventListener('change', function () {
    measureMobileHeader();
    updateHeader();
  });
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

  mobileNav.querySelectorAll('.mobile-nav__link').forEach(function (link) {
    link.addEventListener('click', closeNav);
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
   STICKY ATC — mobile only, IntersectionObserver
   ===================================================== */

function initStickyATC() {
  var stickyBar = document.getElementById('sticky-atc');
  // Target the main ATC button in the new product-main section
  var mainAtcBtn = document.getElementById('product-atc-btn');

  if (!stickyBar || !mainAtcBtn) return;

  // Clear any inline display style — CSS + .is-visible class handles everything
  stickyBar.style.display = '';

  // IntersectionObserver: show sticky bar when the main ATC button
  // is NOT visible in the viewport (scrolled above or below).
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Main ATC is on screen — hide the sticky bar
          stickyBar.classList.remove('is-visible');
        } else {
          // Main ATC has left the viewport — show the sticky bar
          stickyBar.classList.add('is-visible');
        }
      });
    },
    {
      // Fire as soon as any pixel of the button leaves the viewport.
      // rootMargin adds a small buffer so the bar appears just after
      // the button starts sliding out of view.
      threshold: 0,
      rootMargin: '0px 0px -10px 0px'
    }
  );

  observer.observe(mainAtcBtn);
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
   PRODUCT MAIN — GALLERY (button thumbs with data-src)
   ===================================================== */

function initProductMainGallery() {
  const mainImg = document.getElementById('main-product-img');
  const thumbs = document.querySelectorAll('.product-main__thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');

      const newSrc = thumb.dataset.src;
      if (newSrc) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* =====================================================
   VARIANT SWITCHER (product-main with product JSON)
   ===================================================== */

function initVariantSwitcher() {
  const productJsonEl = document.getElementById('product-json');
  if (!productJsonEl) return;

  let product;
  try { product = JSON.parse(productJsonEl.textContent); } catch (e) { return; }

  const variants = product.variants;
  if (!variants || !variants.length) return;

  // Build initial selected options from marked buttons
  const selectedOptions = [];
  document.querySelectorAll('.variant-options[data-option-index]').forEach(function (group) {
    const idx = parseInt(group.dataset.optionIndex);
    const active = group.querySelector('.variant-option.is-selected');
    if (active) selectedOptions[idx] = active.dataset.value;
  });

  document.querySelectorAll('.variant-option[data-option-index]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const optIdx = parseInt(btn.dataset.optionIndex);
      const val = btn.dataset.value;

      // Toggle active state within group
      const group = btn.closest('.variant-options');
      group.querySelectorAll('.variant-option').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedOptions[optIdx] = val;

      // Update label showing selected value
      const labelEl = document.getElementById('selected-opt-' + (optIdx + 1));
      if (labelEl) labelEl.textContent = val;

      // Find matching variant
      const matched = variants.find(function (v) {
        return v.options.every(function (opt, i) {
          return selectedOptions[i] === undefined || selectedOptions[i] === opt;
        });
      });
      if (!matched) return;

      // Sync variant ID inputs (main form + sticky form)
      ['variant-id', 'sticky-variant-id'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.value = matched.id;
      });

      // Update displayed price
      const priceFormatted = formatMoneyEUR(matched.price);
      ['product-price', 'sticky-price'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.textContent = priceFormatted;
      });

      // Update compare-at price + badge
      const compareEl = document.getElementById('product-price-compare');
      const badgeEl = document.getElementById('product-price-badge');
      if (compareEl) {
        if (matched.compare_at_price && matched.compare_at_price > matched.price) {
          compareEl.textContent = formatMoneyEUR(matched.compare_at_price);
          compareEl.style.display = '';
          if (badgeEl) {
            const pct = Math.round((matched.compare_at_price - matched.price) / matched.compare_at_price * 100);
            badgeEl.textContent = 'Save ' + pct + '%';
            badgeEl.style.display = '';
          }
        } else {
          compareEl.style.display = 'none';
          if (badgeEl) badgeEl.style.display = 'none';
        }
      }

      // Update ATC button state
      const atcBtn = document.getElementById('product-atc-btn');
      if (atcBtn) {
        atcBtn.disabled = !matched.available;
        atcBtn.textContent = matched.available ? 'Add to Cart' : 'Sold Out';
      }
    });
  });
}

function formatMoneyEUR(cents) {
  const euros = (cents / 100).toFixed(2).replace('.', ',');
  return '€' + euros;
}

/* =====================================================
   QTY SELECTOR (+/− for product-main)
   ===================================================== */

function initQtySelector() {
  document.querySelectorAll('.qty-selector').forEach(function (wrap) {
    const minusBtn = wrap.querySelector('.qty-btn--minus');
    const plusBtn = wrap.querySelector('.qty-btn--plus');
    const input = wrap.querySelector('.qty-input');
    if (!input) return;

    if (minusBtn) {
      minusBtn.addEventListener('click', function () {
        let v = parseInt(input.value) - 1;
        if (v < 1) v = 1;
        input.value = v;
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', function () {
        let v = parseInt(input.value) + 1;
        const max = parseInt(input.max) || 99;
        if (v > max) v = max;
        input.value = v;
      });
    }
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
