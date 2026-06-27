# 03 Bottom Pop-off Bar — Implementation Spec

**Phase 2.5 agent output | 2026-06-26**
**Target file:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26/dental-insurance/ppo-plans/index.html`

---

## Context and design decision

The hub already ships one bottom element: `.sticky#sticky-bar`, a mobile-only (`display:none` at desktop, `display:block` at `max-width:1080px`) dark-teal bar with three icon buttons and a dismiss X. It slides up with `transform: translateY(110%)` and reveals with `.show`.

The brief asks for ONE bottom element, not two. The strategy is to **replace the existing `.sticky` bar with a unified pop-off bar** that:

- On **mobile** behaves like the current bar: full-width dark strip, three icon buttons, plus a plan-match row that slides in when a scenario is selected
- On **desktop** (above 1080px) emerges as a **slim pill** anchored to the bottom-right quadrant, hidden by default, that animates ("pops off") when context changes

This avoids any collision with the existing element and requires only one coordinated replacement.

---

## Plan strength map (one canonical sentence per plan)

Derived from BRIEF and SSOT. Used verbatim in the bar copy.

```
uhc-primary-dental       Fastest and cheapest: preventive from day one, about $30/mo
aetna-dental-direct      Waits waived with prior coverage, plus a $10 monthly CVS reward
ameritas-primestar       No waiting period on anything, including implants, from day one
guardian-premier-ppo     Highest day-one basic rate (85%) and the only plan with child braces
metlife-ncd-complete     Highest annual max ($10,000) and a one-time lifetime deductible
mutual-of-omaha-dental   No-wait major coverage, community pricing that never rises with age
humana-extend-5000       Implants reach 50% in just 6 months, $5,000 max
delta-dental-ppo-premium Largest network in the country, adult and child orthodontics covered
```

---

## HTML skeleton — replaces the existing `#sticky-bar` block

Remove the old block (lines 1059-1067) and drop this in its place, just before `#cc-footer-mount`:

```html
<!-- unified bottom pop-off bar: replaces old .sticky#sticky-bar -->
<div
  id="popoff-bar"
  class="popoff"
  role="region"
  aria-label="Your current best plan match"
  aria-live="polite"
  aria-atomic="false"
>
  <!-- MOBILE INNER — full-width icon strip + optional plan row -->
  <div class="popoff-mob" aria-hidden="true">
    <div class="popoff-mob-actions">
      <a class="sb-btn" href="#scenario-finder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        Find a plan
      </a>
      <a class="sb-btn" href="/find-my-dentist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Verify dentist
      </a>
      <a class="sb-btn" href="/compare-ppo-dental-plans">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>
        Compare
      </a>
      <button class="sb-x" id="popoff-x" aria-label="Dismiss quick actions">&times;</button>
    </div>
    <!-- plan-match row: only shown after scenario selection -->
    <div class="popoff-mob-match" id="popoff-mob-match" hidden>
      <span class="popoff-mob-label" id="popoff-mob-label"></span>
      <span class="popoff-mob-strength" id="popoff-mob-strength"></span>
      <a class="popoff-mob-see" id="popoff-mob-see" href="#plan-stories">See plan</a>
    </div>
  </div>

  <!-- DESKTOP PILL — bottom-right, slides up from off-screen -->
  <div class="popoff-pill" id="popoff-pill" aria-hidden="true">
    <div class="popoff-pill-inner">
      <div class="popoff-pill-text">
        <span class="popoff-pill-label" id="popoff-pill-label">Best match</span>
        <span class="popoff-pill-name" id="popoff-pill-name"></span>
        <span class="popoff-pill-strength" id="popoff-pill-strength"></span>
      </div>
      <div class="popoff-pill-actions">
        <a class="popoff-pill-verify btn btn-pri" href="/find-my-dentist" id="popoff-pill-verify">Verify a dentist</a>
        <a class="popoff-pill-see btn btn-out" href="#plan-stories" id="popoff-pill-see">See plan</a>
      </div>
      <button class="popoff-pill-x" id="popoff-pill-x" aria-label="Dismiss plan match">&times;</button>
    </div>
  </div>
</div>
```

---

## CSS skeleton — replaces old `.sticky` block and adds desktop pill rules

Remove the existing `.sticky`, `.sticky.show`, `.sticky-in`, `.sb-btn`, `.sb-x` block from the `<style>` tag and the responsive rule `@media(max-width:1080px){ .sticky{display:block} }`. Replace with:

```css
/* ══════════════════════════════════════════════════
   UNIFIED BOTTOM POP-OFF BAR
   Replaces old .sticky#sticky-bar
   ══════════════════════════════════════════════════ */

/* ── mobile strip (always full-width, only on small breakpoint) ── */
.popoff { position:fixed; bottom:0; left:0; right:0; z-index:140; }

.popoff-mob {
  background:var(--teal-deep);
  box-shadow:var(--sh-3);
  padding:8px 0 calc(8px + env(safe-area-inset-bottom));
  display:none;                        /* shown via media query below */
  flex-direction:column;
  gap:0;
  transform:translateY(110%);
  transition:transform .26s ease;
}
.popoff.show .popoff-mob { transform:translateY(0); }

.popoff-mob-actions {
  display:flex;
  align-items:center;
  gap:8px;
  max-width:var(--max);
  margin:0 auto;
  padding:0 16px;
}

/* reuse existing .sb-btn styles; add them here if consolidating */
.sb-btn {
  flex:1; display:flex; flex-direction:column; align-items:center; gap:2px;
  color:#C8E6E3; font-size:11px; font-weight:600; text-decoration:none; padding:5px 0;
}
.sb-btn svg { width:18px; height:18px; }
.sb-btn:hover { color:#fff; text-decoration:none; }
.sb-x {
  background:none; border:none; color:#7FB8B4; cursor:pointer;
  padding:4px 8px; font-size:18px; line-height:1;
}

/* mobile plan-match row */
.popoff-mob-match {
  display:flex;
  align-items:center;
  gap:8px;
  flex-wrap:wrap;
  padding:8px 16px 2px;
  max-width:var(--max);
  margin:0 auto;
  border-top:1px solid rgba(255,255,255,.12);
  font-size:12px;
  color:#C8E6E3;
  animation:popoff-fadein .22s ease forwards;
}
.popoff-mob-label {
  font-size:10px; font-weight:700; text-transform:uppercase;
  letter-spacing:.07em; color:#8FD2CE; white-space:nowrap;
}
.popoff-mob-strength { flex:1; min-width:0; color:#EAF6F5; }
.popoff-mob-see {
  font-size:12px; font-weight:700; color:#fff;
  background:rgba(255,255,255,.15); border-radius:var(--r-pill);
  padding:4px 12px; text-decoration:none; white-space:nowrap;
  border:1px solid rgba(255,255,255,.25);
}
.popoff-mob-see:hover { background:rgba(255,255,255,.25); text-decoration:none; }

/* ── desktop pill (above 1080px) ── */
.popoff-pill {
  position:fixed; bottom:24px; right:24px;
  z-index:141;
  display:none;                        /* shown via media query below */
  background:var(--teal-deep);
  border:1px solid rgba(255,255,255,.14);
  border-radius:var(--r-pill);
  box-shadow:0 8px 28px -8px rgba(15,27,37,.38), 0 2px 6px rgba(15,27,37,.12);
  transform:translateY(16px);
  opacity:0;
  pointer-events:none;
  transition:transform .28s cubic-bezier(.34,1.32,.64,1), opacity .22s ease;
  max-width:540px;
  min-width:320px;
}
/* "pop-off" animation when context changes */
.popoff-pill.pop {
  animation:popoff-pop .34s cubic-bezier(.34,1.32,.64,1) forwards;
}
.popoff-pill.show {
  transform:translateY(0);
  opacity:1;
  pointer-events:auto;
}
.popoff-pill-inner {
  display:flex; align-items:center; gap:12px;
  padding:10px 14px 10px 18px;
}
.popoff-pill-text {
  display:flex; flex-direction:column; gap:1px; flex:1; min-width:0;
}
.popoff-pill-label {
  font-size:10px; font-weight:700; text-transform:uppercase;
  letter-spacing:.07em; color:#8FD2CE;
}
.popoff-pill-name {
  font-size:13.5px; font-weight:700; color:#fff;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.popoff-pill-strength {
  font-size:11.5px; color:#C8E6E3; line-height:1.4;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.popoff-pill-actions {
  display:flex; align-items:center; gap:8px; flex-shrink:0;
}
/* override base .btn sizing for pill context */
.popoff-pill-actions .btn {
  min-height:36px; padding:0 14px; font-size:13px; border-radius:var(--r-pill);
}
.popoff-pill-actions .btn-out {
  background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.22); color:#EAF6F5;
}
.popoff-pill-actions .btn-out:hover {
  background:rgba(255,255,255,.2); border-color:rgba(255,255,255,.4); text-decoration:none;
}
.popoff-pill-x {
  background:none; border:none; color:#7FB8B4; cursor:pointer;
  font-size:18px; line-height:1; padding:4px 2px 4px 4px; flex-shrink:0;
}
.popoff-pill-x:hover { color:#fff; }

/* ── keyframes ── */
@keyframes popoff-fadein { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
@keyframes popoff-pop {
  0%   { transform:translateY(0) scale(1); }
  30%  { transform:translateY(-8px) scale(1.035); }
  60%  { transform:translateY(4px) scale(.98); }
  100% { transform:translateY(0) scale(1); opacity:1; }
}

/* ── reduced-motion overrides ── */
@media (prefers-reduced-motion: reduce) {
  .popoff-mob { transition:none; }
  .popoff-pill { transition:none; animation:none !important; }
  .popoff-pill.pop { animation:none !important; }
  .popoff-mob-match { animation:none; }
  @keyframes popoff-pop { to { transform:translateY(0); opacity:1; } }
}

/* ── responsive show/hide ── */
@media (max-width:1080px) {
  .popoff-mob  { display:flex; }   /* mobile strip visible */
  .popoff-pill { display:none; }   /* pill hidden on mobile */
}
@media (min-width:1081px) {
  .popoff-mob  { display:none; }   /* strip hidden on desktop */
  .popoff-pill { display:block; }  /* pill rendered (still opacity:0 until .show) */
}
```

**Also remove or update this old rule in the existing `@media(max-width:1080px)` block:**

```css
/* REMOVE this line — it referred to old .sticky */
.sticky{display:block}

/* Also remove: .sticky, .sticky.show, .sticky-in from the main CSS block */
```

---

## JS skeleton — replaces the old `/* ── mobile sticky bar ── */` block

In the IIFE at the bottom of the file, find and replace the entire `/* ── mobile sticky bar ── */` section (currently lines 1416-1429) with the following. This block handles: show/hide on scroll, context update from scenario finder, dismiss with sessionStorage, desktop pop-off animation, and keyboard dismiss.

```js
/* ══════════════════════════════════════════════════
   UNIFIED BOTTOM POP-OFF BAR
   Replaces old mobile sticky bar block
   ══════════════════════════════════════════════════ */
(function(){
  var bar        = document.getElementById('popoff-bar');
  var pill       = document.getElementById('popoff-pill');
  var xMob       = document.getElementById('popoff-x');
  var xPill      = document.getElementById('popoff-pill-x');
  if (!bar) return;

  /* ── dismiss state ── */
  var dismissed = false;
  try { dismissed = sessionStorage.getItem('cc_popoff_dismissed') === '1'; } catch(e) {}

  function dismiss() {
    dismissed = true;
    bar.classList.remove('show');
    if (pill) { pill.classList.remove('show', 'pop'); }
    try { sessionStorage.setItem('cc_popoff_dismissed', '1'); } catch(e) {}
    gtagSafe('event', 'popoff_dismiss', { page: 'ppo_hub' });
  }

  if (xMob)  xMob.addEventListener('click', dismiss);
  if (xPill) xPill.addEventListener('click', dismiss);

  /* keyboard dismiss: Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !dismissed) {
      if (pill && pill.classList.contains('show')) dismiss();
      else if (bar.classList.contains('show')) dismiss();
    }
  });

  /* ── scroll visibility: show after hero, hide near footer ── */
  var heroEl   = document.getElementById('top');
  var footEl   = document.getElementById('related');
  var heroGone = false;
  var footVis  = false;

  function updateVisibility() {
    if (dismissed) return;
    var shouldShow = heroGone && !footVis;
    bar.classList.toggle('show', shouldShow);
    /* pill mirrors the bar's show state; context logic adds/removes .show separately on desktop */
    if (pill) {
      /* only show pill if there is a matched plan AND scroll position is right */
      var hasPlan = !!pill.getAttribute('data-plan-slug');
      if (!shouldShow) {
        pill.classList.remove('show');
      } else if (hasPlan) {
        if (!pill.classList.contains('show')) {
          pill.classList.add('show');
        }
      }
    }
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(e) {
      heroGone = !e[0].isIntersecting;
      updateVisibility();
    }, { rootMargin: '-60px 0px 0px 0px' }).observe(heroEl);

    if (footEl) {
      new IntersectionObserver(function(e) {
        footVis = e[0].isIntersecting;
        updateVisibility();
      }).observe(footEl);
    }
  }

  /* ── plan context map ── */
  /* Strengths are one-line, no em-dashes. Keep in sync with BRIEF plan map. */
  var PLAN_STRENGTHS = {
    'uhc-primary-dental':       { label:'UHC Primary Dental',       strength:'Fastest and cheapest: preventive from day one, about $30/mo' },
    'aetna-dental-direct':      { label:'Aetna Dental Direct',       strength:'Waits waived with prior coverage, plus a $10 monthly CVS reward' },
    'ameritas-primestar':       { label:'Ameritas PrimeStar',        strength:'No waiting period on anything, including implants, from day one' },
    'guardian-premier-ppo':     { label:'Guardian Premier PPO',      strength:'Highest day-one basic rate (85%) and the only plan with child braces' },
    'metlife-ncd-complete':     { label:'MetLife NCD Complete',      strength:'Highest annual max ($10,000) with a one-time lifetime deductible' },
    'mutual-of-omaha-dental':   { label:'Mutual of Omaha Dental',    strength:'No-wait major coverage, community pricing that never rises with age' },
    'humana-extend-5000':       { label:'Humana Extend 5000',        strength:'Implants reach 50% after just 6 months, $5,000 annual max' },
    'delta-dental-ppo-premium': { label:'Delta Dental PPO Premium',  strength:'Largest network in the country, adult and child orthodontics covered' }
  };

  /* ── context update: called by scenario finder and IntersectionObserver ── */
  var currentSlug = null;

  function updatePlan(slug, source) {
    if (!slug || !PLAN_STRENGTHS[slug]) return;
    var prev = currentSlug;
    currentSlug = slug;
    var p = PLAN_STRENGTHS[slug];
    var planUrl = '/dental-insurance/ppo-plans/' + slug + '/';

    /* mobile row */
    var mobMatch  = document.getElementById('popoff-mob-match');
    var mobLabel  = document.getElementById('popoff-mob-label');
    var mobStr    = document.getElementById('popoff-mob-strength');
    var mobSee    = document.getElementById('popoff-mob-see');
    if (mobMatch) {
      if (mobLabel) mobLabel.textContent = p.label;
      if (mobStr)   mobStr.textContent   = p.strength;
      if (mobSee)   { mobSee.href = planUrl; mobSee.textContent = 'See plan'; }
      mobMatch.hidden = false;
      /* re-trigger animation */
      mobMatch.style.animation = 'none';
      void mobMatch.offsetWidth;
      mobMatch.style.animation = '';
    }

    /* desktop pill */
    if (pill) {
      pill.setAttribute('data-plan-slug', slug);
      var pillName   = document.getElementById('popoff-pill-name');
      var pillStr    = document.getElementById('popoff-pill-strength');
      var pillVerify = document.getElementById('popoff-pill-verify');
      var pillSee    = document.getElementById('popoff-pill-see');
      if (pillName)   pillName.textContent   = p.label;
      if (pillStr)    pillStr.textContent    = p.strength;
      if (pillVerify) pillVerify.href = '/find-my-dentist';
      if (pillSee)    { pillSee.href = planUrl; }

      /* pop-off animation if context changed */
      if (pill.classList.contains('show') && prev && prev !== slug) {
        pill.classList.remove('pop');
        void pill.offsetWidth;           /* reflow to restart animation */
        pill.classList.add('pop');
        setTimeout(function() { pill.classList.remove('pop'); }, 400);
      }

      /* ensure pill is visible when scroll position allows */
      if (heroGone && !footVis && !dismissed) {
        pill.classList.add('show');
      }
    }

    gtagSafe('event', 'popoff_context_update', {
      page: 'ppo_hub', plan: slug, source: source || 'unknown'
    });
  }

  /* expose globally so scenario-finder JS can call it */
  window.ccPopoffUpdate = updatePlan;

  /* ── IntersectionObserver on each plan story section (scroll context) ── */
  /* Maps tour-stop IDs to plan slugs */
  var STOP_PLAN_MAP = {
    'stop-uhc':      'uhc-primary-dental',
    'stop-aetna':    'aetna-dental-direct',
    'stop-ameritas': 'ameritas-primestar',
    'stop-guardian': 'guardian-premier-ppo',
    'stop-metlife':  'metlife-ncd-complete',
    'stop-moo':      'mutual-of-omaha-dental',
    'stop-humana':   'humana-extend-5000',
    'stop-delta':    'delta-dental-ppo-premium'
  };

  if ('IntersectionObserver' in window) {
    var storyObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id   = entry.target.id;
          var slug = STOP_PLAN_MAP[id];
          if (slug) updatePlan(slug, 'scroll');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    Object.keys(STOP_PLAN_MAP).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) storyObs.observe(el);
    });
  }

})(); /* end pop-off IIFE */
```

---

## Integration hook in the existing scenario-finder JS

After `renderAnswer(slug, ...)` or wherever the scenario finder resolves a match (the `var route = resolve(sfSituation, sfTiming)` section), add one line to push context to the bar:

```js
/* After resolving the winning plan slug: */
if (typeof window.ccPopoffUpdate === 'function') {
  window.ccPopoffUpdate(route.hero, 'scenario_finder');
}
```

Also wire left-rail nav clicks:

```js
document.querySelectorAll('.rl-nav a[data-plan]').forEach(function(a) {
  a.addEventListener('click', function() {
    var slug = a.getAttribute('data-plan');
    if (typeof window.ccPopoffUpdate === 'function') {
      window.ccPopoffUpdate(slug, 'rail_nav');
    }
  });
});
```

---

## Accessibility checklist

| Requirement | Implementation |
|---|---|
| `aria-live="polite"` | On `#popoff-bar` container; screen reader announces plan name when updated |
| `aria-atomic="false"` | Allows partial updates without re-reading the entire region |
| `aria-label` on container | "Your current best plan match" |
| Keyboard dismiss | `Escape` key handler on `document`, targets whichever bar layer is visible |
| `aria-label` on X buttons | "Dismiss quick actions" (mob), "Dismiss plan match" (pill) |
| `:focus-visible` | Inherited from `:root` rule already in the hub's CSS |
| `aria-hidden="true"` on SVG icons | Already present on `.sb-btn` icons; preserve in new markup |
| `role="region"` | Gives the bar a landmark for AT users |
| Reduced motion | All animations gated behind `@media (prefers-reduced-motion: reduce)` with `transition:none` and `animation:none !important` |

---

## sessionStorage key

The new bar uses `cc_popoff_dismissed` (replacing old `cc_sticky_dismissed`). These are different keys. If you want to honor the old dismiss, add:

```js
try {
  if (sessionStorage.getItem('cc_sticky_dismissed') === '1') dismissed = true;
} catch(e) {}
```

---

## What to remove from the existing file

| Location | What to delete |
|---|---|
| CSS `<style>` | `.sticky`, `.sticky.show`, `.sticky-in`, `.sb-btn`, `.sb-x` rule blocks |
| CSS `@media(max-width:1080px)` | `.sticky{display:block}` line |
| HTML near line 1059 | The old `<!-- mobile sticky bar -->` `<div class="sticky" id="sticky-bar">` block |
| JS IIFE near line 1416 | The entire `/* ── mobile sticky bar ── */` section (14 lines) |

The `.sb-btn` and `.sb-x` class names are reused in the new HTML. The CSS definitions are in the new block above. No selector collisions.

---

## Summary

Three-part replacement: HTML swaps the old `#sticky-bar` for `#popoff-bar` (a unified wrapper containing a mobile strip and a desktop pill); CSS replaces the five old `.sticky*` rules with the new `.popoff*` block including the pop keyframe and all reduced-motion guards; JS replaces the 14-line scroll observer with a 120-line IIFE that handles show/hide, plan-context updates from both the scenario finder and scroll-based IntersectionObserver, dismiss with sessionStorage, the pop animation on context change, and Escape-key keyboard dismiss.
