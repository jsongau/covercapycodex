/* ════════════════════════════════════════════════════════════════
   CAROUSEL ENGINE · v500 — opacity fade, no scroll-snap.
   ────────────────────────────────────────────────────────────────
   Behaviour preserved from v403:
     · 60s grace period before autoplay starts (INITIAL_DELAY).
     · 14s per chapter once autoplay is active (IDLE_DELAY).
     · Chapter III savings count-up with Apple-keynote pacing.
     · Pause on hover, on visibilitychange, and via pause button.
     · Arrow keys step ± one chapter.
     · Reduced-motion bypass (no autoplay, no count animation).

   New for v500:
     · setActive() toggles `.is-active` instead of scrolling.
     · will-change: opacity applied only during the 900ms fade,
       then cleared. Prevents permanent layer promotion.
     · Manual touch swipe (50px threshold, dominant axis check
       so vertical scrolls inside Chapter III aren't hijacked).
   ════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const hero      = document.getElementById('hero');
  if (!hero) return;

  const stage     = document.getElementById('hero-stage');
  const chapters  = Array.from(hero.querySelectorAll('.chapter'));
  const railBtns  = Array.from(hero.querySelectorAll('.rail-chapter'));
  const arrowPrev = document.getElementById('arrow-prev');
  const arrowNext = document.getElementById('arrow-next');
  const pauseBtn  = document.getElementById('pause-btn');
  const progress  = document.getElementById('progress-fill');

  const COUNT         = chapters.length;
  const INITIAL_DELAY = 60000;   // 60s grace before autoplay
  const IDLE_DELAY    = 14000;   // ms per chapter once autoplay active
  const SWIPE_THRESH  = 50;      // px of horizontal travel to count
  const FADE_DURATION = 900;     // must match CSS .chapter opacity transition

  let active           = 0;
  let idleTimer        = null;
  let progressRaf      = null;
  let isPaused         = false;
  let autoplayStarted  = false;
  const reduce         = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Slide activation ─────────────────────────────────────── */
  function setActive(idx, opts){
    opts = opts || {};
    if (idx === active && !opts.force) return;
    idx = ((idx % COUNT) + COUNT) % COUNT;

    const prev = active;
    active = idx;

    chapters.forEach((c, i) => {
      const on = i === idx;
      if (on) {
        // Promote only the entering chapter to its own compositor
        // layer during the fade, then release it. Avoids permanent
        // layer promotion which wastes memory across 5 slides.
        c.style.willChange = 'opacity';
        c.classList.add('is-active');
        setTimeout(() => { c.style.willChange = ''; }, FADE_DURATION + 100);
      } else {
        c.classList.remove('is-active');
      }
    });

    railBtns.forEach((b, i) => {
      const on = i === idx;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    handleSavingsCount(idx, prev);
  }

  function next(){ setActive(active + 1); }
  function prev(){ setActive(active - 1); }

  /* ── Chapter III savings count-up ─────────────────────────── */
  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
  function animateCount(el, target, duration){
    if (el._raf) cancelAnimationFrame(el._raf);
    const start = performance.now();
    function step(now){
      const t = Math.min((now - start) / duration, 1);
      const v = Math.floor(target * easeOutCubic(t));
      el.textContent = '$' + v.toLocaleString();
      if (t < 1) {
        el._raf = requestAnimationFrame(step);
      } else {
        el.textContent = '$' + target.toLocaleString();
        el._raf = null;
      }
    }
    el._raf = requestAnimationFrame(step);
  }
  function handleSavingsCount(curIdx, prevIdx){
    const ch3 = chapters[2];
    if (!ch3) return;
    const el = ch3.querySelector('.ch3-amount');
    if (!el) return;
    const target = parseInt(el.dataset.countTarget || '3411', 10);

    if (reduce){
      el.textContent = '$' + target.toLocaleString();
      return;
    }

    if (curIdx === 2){
      if (el._raf){ cancelAnimationFrame(el._raf); el._raf = null; }
      clearTimeout(el._delay);
      el.textContent = '$0';
      // Wait for the without/with reveal to settle, then count up.
      el._delay = setTimeout(() => animateCount(el, target, 1800), 1500);
    } else if (prevIdx === 2){
      clearTimeout(el._delay);
      if (el._raf){ cancelAnimationFrame(el._raf); el._raf = null; }
      el.textContent = '$' + target.toLocaleString();
    }
  }

  /* ── Idle auto-advance + progress bar countdown ───────────── */
  function clearProgress(){
    cancelAnimationFrame(progressRaf);
    if (progress) progress.style.width = '0%';
  }

  function startProgress(){
    if (isPaused || reduce || !progress) return;
    cancelAnimationFrame(progressRaf);
    const startTime = performance.now();
    function tick(now){
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / IDLE_DELAY, 1) * 100;
      progress.style.width = pct.toFixed(2) + '%';
      if (elapsed >= IDLE_DELAY){
        next();
        return;
      }
      progressRaf = requestAnimationFrame(tick);
    }
    progressRaf = requestAnimationFrame(tick);
  }

  function resetIdle(){
    clearTimeout(idleTimer);
    clearProgress();
    if (isPaused || reduce || !autoplayStarted) return;
    idleTimer = setTimeout(startProgress, 350);
  }

  /* ── Touch / swipe ─ manual, replaces scroll-snap ─────────── */
  let touchStartX = 0, touchStartY = 0, touchActive = false;

  stage.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchActive = true;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    if (!touchActive) return;
    touchActive = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    // Only fire if horizontal motion dominates vertical. Lets the
    // user scroll vertically inside Chapter III without triggering
    // chapter changes.
    if (Math.abs(dx) > SWIPE_THRESH && Math.abs(dx) > Math.abs(dy) * 1.5){
      if (dx < 0) next(); else prev();
      resetIdle();
    }
  }, { passive: true });

  /* ── Controls ─────────────────────────────────────────────── */
  if (arrowPrev) arrowPrev.addEventListener('click', () => { prev(); resetIdle(); });
  if (arrowNext) arrowNext.addEventListener('click', () => { next(); resetIdle(); });

  railBtns.forEach((b, i) => {
    b.addEventListener('click', () => { setActive(i); resetIdle(); });
  });

  if (pauseBtn) pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.classList.toggle('is-paused', isPaused);
    pauseBtn.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
    if (isPaused){
      clearTimeout(idleTimer);
      clearProgress();
    } else {
      resetIdle();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
    if (e.key === 'ArrowRight'){ e.preventDefault(); next(); resetIdle(); }
    if (e.key === 'ArrowLeft' ){ e.preventDefault(); prev(); resetIdle(); }
  });

  /* ── Pause on hover (desktop only — hover doesn't fire on touch) ── */
  hero.addEventListener('mouseenter', () => {
    clearTimeout(idleTimer);
    clearProgress();
    if (progress) progress.style.opacity = '0.4';
  });
  hero.addEventListener('mouseleave', () => {
    if (progress) progress.style.opacity = '1';
    resetIdle();
  });

  /* ── Pause when tab hidden ────────────────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden){
      clearTimeout(idleTimer);
      clearProgress();
    } else {
      resetIdle();
    }
  });

  /* ── Boot ─────────────────────────────────────────────────── */
  setActive(0, { force: true });

  if (reduce){
    if (progress) progress.style.display = 'none';
    // Show savings amount immediately at full value
    const el = document.querySelector('.ch3-amount');
    if (el){
      el.textContent = '$' + parseInt(el.dataset.countTarget || '3411', 10).toLocaleString();
    }
  } else {
    // 60s grace before autoplay so the user can browse freely first.
    setTimeout(() => {
      autoplayStarted = true;
      resetIdle();
    }, INITIAL_DELAY);
  }

})();


/* ════════════════════════════════════════════════════════════════
   CHAPTER V · SOONEST OPENING — always tomorrow at 9:00 am.
   Computes "{Weekday} · 9:00 am" from the visitor's local clock
   so the featured practice's availability never reads stale.
   Falls back to "Tomorrow · 9:00 am" if JS doesn't run.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const el = document.querySelector('.ch5-avail-time');
  if (!el) return;
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayName = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
    el.textContent = dayName + ' · 9:00 am';
  } catch (e) {
    /* leave the static "Tomorrow · 9:00 am" fallback in place */
  }
})();


/* ════════════════════════════════════════════════════════════════
   CHAPTER II · NEXT-MONTH ACTIVATION
   The Premier 2.0 plan activates on the first of the next calendar
   month. Date handles year rollover (Dec → Jan) automatically.
   Falls back to the static "June" if JS fails.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const el = document.querySelector('.ch2-effective-month');
  if (!el) return;
  try {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    el.textContent = next.toLocaleDateString('en-US', { month: 'long' });
  } catch (e) {
    /* leave the static "June" fallback in place */
  }
})();


/* ════════════════════════════════════════════════════════════════
   CHAPTER I · AVATAR INITIALS — rotated on each page load
   ────────────────────────────────────────────────────────────────
   The 5 social-proof avatars on Chapter I read as different
   "patients" each visit. Pool of 30 two-letter combos drawn
   from common US first+last initials; we shuffle and pick 5
   with no repeats per render. Falls back silently if the
   elements aren't present.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const avatars = document.querySelectorAll('.avatar-stack .avatar');
  if (!avatars.length) return;

  const POOL = [
    'JM','SK','AT','RP','LB','DH','EW','TN','CR','NV',
    'KM','BL','GA','RY','IO','PD','FS','OC','HQ','WE',
    'MJ','SP','AR','CB','VH','TM','EL','BR','KS','DN'
  ];

  // Fisher-Yates shuffle, then take the first 5
  const shuffled = POOL.slice();
  for (let i = shuffled.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  avatars.forEach((el, i) => {
    el.textContent = shuffled[i] || el.textContent;
  });
})();


/* ════════════════════════════════════════════════════════════════
   DISCLOSURE MODAL — generic, reusable across carriers + practices
   ────────────────────────────────────────────────────────────────
   Single modal element (#carrier-modal in HTML) serves every
   outbound transition. Content slots are populated by
   openDisclosureModal(config) on each trigger click.

   Triggers (any one of these opens the modal):
     · [data-disclosure-modal="uhc"]   → CONFIGS.uhc  (UnitedHealthcare)
     · [data-disclosure-modal="kyt"]   → CONFIGS.kyt  (KYT Dental Services)
     · .pc-activate                    → CONFIGS.uhc  (legacy, UHC card btn)
     · [data-carrier-modal]            → CONFIGS.uhc  (legacy)

   To add another carrier or practice, append a new entry to CONFIGS
   and add the matching data-disclosure-modal="..." attribute on the
   trigger element. No HTML or function rewrites required.

   On Continue, the link fires `outbound_click` to whichever analytics
   global is loaded (GA4 gtag / Plausible / PostHog) — each guarded
   by a typeof check so loading one is enough.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const modal = document.getElementById('carrier-modal');
  if (!modal) return;

  /* ─── Content registry — extend here to add a new carrier ──── */
  const CONFIGS = {
    uhc: {
      eyebrow: 'Leaving CoverCapy',
      title: 'You\'re heading to<br/><em>UnitedHealthcare</em>.',
      body: 'We\'ll open UnitedHealthcare\'s official enrollment page in a new tab. You can review the Primary Dental plan, check eligibility, and activate coverage directly with the carrier. <strong>CoverCapy never sees or stores</strong> your payment, insurance, or login details.',
      disclosuresLabel: 'A note before you go',
      disclosures: [
        'CoverCapy is an <strong>independent guide</strong>. We\'re not a broker, agent, or affiliate of UnitedHealthcare.',
        'We <strong>don\'t earn a commission</strong> or referral fee on any plan you activate through this site.',
        'The destination is governed by <strong>UnitedHealthcare\'s terms</strong>, not ours. Pricing, eligibility, and plan details can change without notice.',
        'We make <strong>no guarantees</strong> about coverage limits, waiting periods, or in-network status. Verify everything with UnitedHealthcare before enrolling.',
        'By continuing, you acknowledge that <strong>CoverCapy is not liable</strong> for outcomes, denials, billing decisions, or transactions that happen after you leave this site.'
      ],
      cancelLabel: 'Wait, tell me more',
      continueLabel: 'Continue to UnitedHealthcare',
      continueUrl: 'https://www.uhc.com/shop/individuals-families/en/quote/census?leadsourcename=UHC-Website-Dental',
      trackingSlug: 'uhc-primary-dental',
      carrier: 'uhc'
    },
    kyt: {
      eyebrow: 'Booking with a partner practice',
      title: 'You\'re booking with<br/><em>KYT Dental Services</em>.',
      body: 'We\'ll open KYT Dental Services\' official booking page in a new tab. CoverCapy is an <strong>independent concierge directory</strong> — we help you discover and compare practices, but the schedule, accepted plans, fees, and treatment decisions are handled by the dental office.',
      disclosuresLabel: 'Before you book',
      disclosures: [
        'CoverCapy is an <strong>independent concierge directory</strong>. We don\'t run the dental office, manage the schedule, or process payments.',
        '<strong>Availability, accepted plans, fees, and treatment decisions</strong> are controlled by KYT Dental Services directly.',
        'Insurance benefits remain subject to <strong>plan terms, eligibility, waiting periods, exclusions, and carrier rules</strong>.',
        'We make <strong>no guarantees</strong> about in-network status or the price of any procedure quoted at the office.',
        'Please <strong>confirm appointment, coverage, and out-of-pocket details</strong> with KYT Dental Services before any treatment.'
      ],
      cancelLabel: 'Stay on CoverCapy',
      continueLabel: 'Continue to KYT Dental Services',
      continueUrl: 'https://www.kytdentalservices.com/booking',
      trackingSlug: 'kyt-dental-services-booking',
      carrier: 'kyt'
    }
  };

  /* ─── Slot references ──────────────────────────────────────── */
  const slot = name => modal.querySelector('[data-modal-slot="' + name + '"]');
  const eyebrowEl       = slot('eyebrow');
  const titleEl         = slot('title');
  const bodyEl          = slot('body');
  const disclosuresLbl  = slot('disclosures-label');
  const disclosuresWrap = slot('disclosures');
  const cancelLabelEl   = slot('cancel-label');
  const continueLabelEl = slot('continue-label');
  const continueEl      = modal.querySelector('.carrier-modal-continue');
  const closeBtn        = modal.querySelector('.carrier-modal-close');

  let lastFocused = null;

  /* ─── Public API: populate slots, then open ────────────────── */
  function openDisclosureModal(config){
    if (!config) return;

    if (eyebrowEl)       eyebrowEl.innerHTML       = config.eyebrow || 'Leaving CoverCapy';
    if (titleEl)         titleEl.innerHTML         = config.title || '';
    if (bodyEl)          bodyEl.innerHTML          = config.body || '';
    if (disclosuresLbl)  disclosuresLbl.textContent = config.disclosuresLabel || 'A note before you go';
    if (cancelLabelEl)   cancelLabelEl.textContent  = config.cancelLabel || 'Wait, tell me more';
    if (continueLabelEl) continueLabelEl.textContent = config.continueLabel || 'Continue';

    // Render the numbered disclosure list
    if (disclosuresWrap && Array.isArray(config.disclosures)){
      const roman = ['i.','ii.','iii.','iv.','v.','vi.','vii.','viii.'];
      disclosuresWrap.innerHTML = config.disclosures.map(function(text, idx){
        return '<div class="carrier-modal-disclosure">'
          + '<span class="num">' + (roman[idx] || (idx+1)+'.') + '</span>'
          + '<span>' + text + '</span>'
          + '</div>';
      }).join('');
    }

    // Update Continue link target + tracking attributes
    if (continueEl){
      if (config.continueUrl) continueEl.href = config.continueUrl;
      if (config.carrier)      continueEl.dataset.carrier = config.carrier;
      if (config.trackingSlug) continueEl.dataset.trackOutbound = config.trackingSlug;
    }

    // Open
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ if (closeBtn) closeBtn.focus(); }, 320);
  }

  function closeModal(){
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function'){
      try { lastFocused.focus(); } catch (e) {}
    }
  }

  // Expose globally so other modules can fire it programmatically
  window.openDisclosureModal = openDisclosureModal;

  /* ─── Trigger dispatch ─────────────────────────────────────── */
  function handleTrigger(e){
    const trigger = e.currentTarget;
    // Read which config to use, defaulting to UHC for legacy triggers
    const key = trigger.dataset.disclosureModal
             || trigger.dataset.carrierModal
             || 'uhc';
    const config = CONFIGS[key];
    if (!config) return;
    if (e && e.preventDefault) e.preventDefault();
    openDisclosureModal(config);
  }

  const triggers = document.querySelectorAll(
    '[data-carrier-modal], [data-disclosure-modal]'
  );
  triggers.forEach(t => t.addEventListener('click', handleTrigger));

  const closeEls = modal.querySelectorAll('[data-modal-close]');
  closeEls.forEach(el => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('is-open')){
      closeModal();
    }
  });

  /* ─── Outbound-click tracking on Continue ──────────────────── */
  if (continueEl){
    continueEl.addEventListener('click', function(){
      const carrier = continueEl.dataset.carrier || 'unknown';
      const slug    = continueEl.dataset.trackOutbound || carrier;
      try {
        if (typeof window.gtag === 'function'){
          window.gtag('event', 'outbound_click', {
            carrier: carrier,
            slug:    slug,
            destination: continueEl.href
          });
        }
        if (typeof window.plausible === 'function'){
          window.plausible('Outbound: ' + carrier, { props: { slug: slug } });
        }
        if (window.posthog && typeof window.posthog.capture === 'function'){
          window.posthog.capture('outbound_click', {
            carrier: carrier,
            slug:    slug,
            destination: continueEl.href
          });
        }
      } catch (e) { /* never block the redirect on a tracking error */ }
      closeModal();
    });
  }
})();

