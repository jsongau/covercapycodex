/* ════════════════════════════════════════════════════════════════
   CAROUSEL ENGINE — cinematic, scroll-snap based.
   - Native swipe on touch
   - Arrows step ± one chapter
   - Rail buttons jump directly
   - Idle auto-advance with a thin progress bar
   - Chapter 3 has a cinematic count-up on arrival
   ════════════════════════════════════════════════════════════════ */
(function(){
  const hero      = document.getElementById('hero');
  const stage     = document.getElementById('hero-stage');
  const chapters  = hero.querySelectorAll('.chapter');
  const railBtns  = hero.querySelectorAll('.rail-chapter');
  const arrowPrev = document.getElementById('arrow-prev');
  const arrowNext = document.getElementById('arrow-next');
  const pauseBtn  = document.getElementById('pause-btn');
  const progress  = document.getElementById('progress-fill');

  const COUNT         = chapters.length;
  const INITIAL_DELAY = 60000;  // v403: 60s grace period before autoplay starts
  const IDLE_DELAY    = 14000;  // ms between auto-advances once autoplay is active

  let active = -1;
  let idleTimer = null;
  let progressStart = 0;
  let progressRaf = null;
  let isPaused = false;
  let scrollSettle = null;
  let autoplayStarted = false;   // v403: stays false for the first minute on page

  /* ── Active state sync ─────────────────────────────────────── */
  function setActive(idx){
    if(idx === active) return;
    const prev = active;
    active = idx;
    chapters.forEach((c,i) => c.classList.toggle('is-active', i === idx));
    railBtns.forEach((b,i) => {
      const on = i === idx;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    handleSavingsCount(idx, prev);
  }

  /* ── Chapter 3 savings count-up ────────────────────────────── */
  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }
  function animateCount(el, target, duration){
    if(el._raf) cancelAnimationFrame(el._raf);
    const start = performance.now();
    function step(now){
      const t = Math.min((now - start) / duration, 1);
      const v = Math.floor(target * easeOutCubic(t));
      el.textContent = '$' + v.toLocaleString();
      if(t < 1){
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
    if(!ch3) return;
    const el = ch3.querySelector('.ch3-amount');
    if(!el) return;
    const target = parseInt(el.dataset.countTarget || '3411', 10);

    if(curIdx === 2){
      if(el._raf){ cancelAnimationFrame(el._raf); el._raf = null; }
      clearTimeout(el._delay);
      el.textContent = '$0';
      // Wait for the headline + reveal lines to fade in first — Apple-keynote pacing
      el._delay = setTimeout(() => animateCount(el, target, 1800), 1500);
    } else if(prevIdx === 2){
      clearTimeout(el._delay);
      if(el._raf){ cancelAnimationFrame(el._raf); el._raf = null; }
      el.textContent = '$' + target.toLocaleString();
    }
  }

  /* ── Detect active chapter from scroll center ──────────────── */
  function detectActive(){
    const cx = stage.scrollLeft + stage.clientWidth / 2;
    let best = 0, bestD = Infinity;
    chapters.forEach((c,i) => {
      const sc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(sc - cx);
      if(d < bestD){ bestD = d; best = i; }
    });
    setActive(best);
  }

  /* ── Navigate ──────────────────────────────────────────────── */
  function goTo(idx, smooth = true){
    idx = ((idx % COUNT) + COUNT) % COUNT;
    const target = chapters[idx];
    if(!target) return;
    const center = target.offsetLeft + target.offsetWidth / 2;
    const left = Math.max(0, center - stage.clientWidth / 2);
    stage.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
  }
  function next(){ goTo(active + 1); }
  function prev(){ goTo(active - 1); }

  /* ── Idle auto-advance + progress countdown ────────────────── */
  function startProgress(){
    if(isPaused) return;
    cancelAnimationFrame(progressRaf);
    progressStart = performance.now();
    function tick(now){
      const elapsed = now - progressStart;
      const pct = Math.min(elapsed / IDLE_DELAY, 1) * 100;
      progress.style.width = pct.toFixed(2) + '%';
      if(elapsed >= IDLE_DELAY){
        next();
        return;
      }
      progressRaf = requestAnimationFrame(tick);
    }
    progressRaf = requestAnimationFrame(tick);
  }
  function resetIdle(){
    clearTimeout(idleTimer);
    cancelAnimationFrame(progressRaf);
    progress.style.width = '0%';
    if(isPaused) return;
    if(!autoplayStarted) return;  // v403: respect the 60s initial grace
    idleTimer = setTimeout(startProgress, 500);
  }

  /* ── Wire scroll, arrows, dots, keyboard ───────────────────── */
  stage.addEventListener('scroll', () => {
    clearTimeout(scrollSettle);
    cancelAnimationFrame(progressRaf);
    progress.style.width = '0%';
    scrollSettle = setTimeout(() => {
      detectActive();
      resetIdle();
    }, 140);
  }, { passive: true });

  arrowPrev.addEventListener('click', () => { prev(); resetIdle(); });
  arrowNext.addEventListener('click', () => { next(); resetIdle(); });

  railBtns.forEach((b,i) => b.addEventListener('click', () => {
    goTo(i);
    resetIdle();
  }));

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.classList.toggle('is-paused', isPaused);
    pauseBtn.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
    if(isPaused){
      clearTimeout(idleTimer);
      cancelAnimationFrame(progressRaf);
      progress.style.width = '0%';
    } else {
      resetIdle();
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.target.closest('input, textarea, [contenteditable]')) return;
    const rect = hero.getBoundingClientRect();
    if(rect.bottom <= 0 || rect.top >= window.innerHeight) return;
    if(e.key === 'ArrowRight'){ e.preventDefault(); next(); resetIdle(); }
    if(e.key === 'ArrowLeft' ){ e.preventDefault(); prev(); resetIdle(); }
  });

  /* ── Pause on hover ────────────────────────────────────────── */
  hero.addEventListener('mouseenter', () => {
    clearTimeout(idleTimer);
    cancelAnimationFrame(progressRaf);
    progress.style.opacity = '0.4';
  });
  hero.addEventListener('mouseleave', () => {
    progress.style.opacity = '1';
    resetIdle();
  });

  /* ── Pause when tab hidden ─────────────────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){
      clearTimeout(idleTimer);
      cancelAnimationFrame(progressRaf);
    } else {
      resetIdle();
    }
  });

  /* ── Reduced motion: no auto-advance, no count-up ──────────── */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches){
    progress.style.display = 'none';
    // Show savings amount immediately at full value
    const el = document.querySelector('.ch3-amount');
    if(el){ el.textContent = '$' + parseInt(el.dataset.countTarget || '3411', 10).toLocaleString(); }
  } else {
    /* v403: hold off autoplay for 60s so the user can browse freely first.
       After that, switch the flag on and start the normal idle countdown. */
    setTimeout(() => {
      autoplayStarted = true;
      resetIdle();
    }, INITIAL_DELAY);
  }

  /* ── Initial sync ──────────────────────────────────────────── */
  detectActive();
})();

/* ════════════════════════════════════════════════════════════════
   CHAPTER V · SOONEST OPENING — always tomorrow at 9:00 am
   Computes "{Weekday} · 9:00 am" from the visitor's local clock,
   so the featured practice's availability never reads stale.
   Falls back to "Tomorrow · 9:00 am" if JS doesn't run.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const el = document.querySelector('.ch5-avail-time');
  if(!el) return;
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
   month. Computes the visitor's next month so the eyebrow always
   reads accurately. The Date constructor handles year rollover
   (Dec → Jan of the following year) automatically.
   Falls back to the static "June" if JS fails.
   ════════════════════════════════════════════════════════════════ */
(function(){
  const el = document.querySelector('.ch2-effective-month');
  if(!el) return;
  try {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    el.textContent = next.toLocaleDateString('en-US', { month: 'long' });
  } catch (e) {
    /* leave the static "June" fallback in place */
  }
})();
