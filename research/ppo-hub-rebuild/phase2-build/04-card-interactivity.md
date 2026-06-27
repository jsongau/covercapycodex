# 04 — Card Interactivity Design
## PPO Hub Phase 2.5 | Implementation-Ready Spec
**File:** `dental-insurance/ppo-plans/index.html`  
**Scope:** `.tour-stop` plan cards — match badges, highlight states, scroll behavior, filter refinement, mini "see how this pays" panel

---

## 1. What Already Exists (do not break)

| Piece | Location in file | Current behavior |
|---|---|---|
| `applyMatch(heroSlug)` | JS, line ~1311 | Sets `.match-bar` text + `.match-yes`/`.match-no` class; hides bar when no slug |
| `.tour-stop.dim` | CSS + `applyFilters()` | `opacity:.4; pointer-events:none` on non-matching filter cards |
| `.match-bar` | CSS `.match-bar.match-yes` / `.match-bar.match-no` | Green or gray bar above the card body |
| `sessionStorage.cc_hero_plan` | Set in `render()` | Stores the slug of the last recommended plan |
| `sessionStorage.cc_scenario` | Set in `render()` | Full JSON: `{situation, timing, hero_plan, runner_up}` |
| Left-rail `.rl-nav a[data-plan]` | HTML lines 362-369 | Maps each scenario phrase to a plan slug (currently just triggers anchor jump) |
| `data-filters` on each `.tour-stop` | HTML | Space-delimited need tokens: `preventive`, `basic_major`, `implants`, `ortho` |
| `data-plan` on each `.tour-stop` | HTML | Plan slug, matches keys in `PLANS` and `ROUTES` |

**DOM order must not change.** The IntersectionObserver-powered left-rail active state, the SEO-visible card headings, and the structured data all depend on source order staying UHC -> Aetna -> Ameritas -> Guardian -> MetLife -> MOO -> Humana -> Delta.

---

## 2. Match-Rules Mapping (scenario/need -> plan slugs)

Derived from existing `ROUTES` object. Traceable to SSOT via each plan's data-filters attribute and SSOT facts.

### 2a. Scenario-finder result -> hero + runner

These are already in `ROUTES`; the table is provided here for cross-referencing the badge logic.

| Situation | Timing | Hero | Runner |
|---|---|---|---|
| `preventive` | any | `uhc-primary-dental` | `aetna-dental-direct` |
| `major_work` | urgent | `ameritas-primestar` | `mutual-of-omaha-dental` |
| `major_work` | soon | `humana-extend-5000` | `mutual-of-omaha-dental` |
| `major_work` | planning | `humana-extend-5000` | `guardian-premier-ppo` |
| `implant` | urgent | `metlife-ncd-complete` | `ameritas-primestar` |
| `implant` | soon | `humana-extend-5000` | `mutual-of-omaha-dental` |
| `implant` | planning | `metlife-ncd-complete` | `humana-extend-5000` |
| `kids_ortho` | planning | `guardian-premier-ppo` | `delta-dental-ppo-premium` |
| `adult_ortho` | planning | `delta-dental-ppo-premium` | (none) |
| `cobra_gap` | any | `aetna-dental-direct` | `uhc-primary-dental` |
| `senior` | any | `mutual-of-omaha-dental` | `ameritas-primestar` |
| `budget` | any | `uhc-primary-dental` | `aetna-dental-direct` |
| `fam_kids_ortho` | any | `guardian-premier-ppo` | `delta-dental-ppo-premium` |
| `fam_implant` | any | `metlife-ncd-complete` | `humana-extend-5000` |
| `fam_big_year` | any | `mutual-of-omaha-dental` | `humana-extend-5000` |
| `fam_cvs` | any | `aetna-dental-direct` | `guardian-premier-ppo` |

SSOT traceability: hero assignment follows no-wait status, annual maximum, and ortho coverage per `/data/plans/*.md`. Guardian is the only plan with dependent ortho (SSOT confirmed). Ameritas and MOO have no waits on major (SSOT confirmed). MetLife has the $10,000 max (SSOT confirmed). Humana's 6-month implant wait is half the standard (SSOT confirmed).

### 2b. Left-rail scenario chip -> plan slug

| Rail link text | `data-plan` | Anchor | Rationale |
|---|---|---|---|
| I just need cleanings | `uhc-primary-dental` | `#stop-uhc` | $30/mo, preventive only, no wait |
| A crown is coming | `aetna-dental-direct` | `#stop-aetna` | Waiver play best for imminent major work with prior coverage |
| Big work, no wait | `ameritas-primestar` | `#stop-ameritas` | No waiting period any category, SSOT |
| Braces for my kid | `guardian-premier-ppo` | `#stop-guardian` | Only plan with dependent ortho, SSOT |
| Left a job with dental | `aetna-dental-direct` | `#stop-aetna` | Prior-coverage waiver key differentiator |
| One implant ahead | `humana-extend-5000` | `#stop-humana` | Fastest implant path, 6-month wait, $4,000 lifetime |
| Heavy year of work | `mutual-of-omaha-dental` | `#stop-moo` | $5,000 max, no wait, community-rated |
| Largest network | `delta-dental-ppo-premium` | `#stop-delta` | Delta network is largest in country, SSOT |

### 2c. Filter pill -> plan slugs

| Filter `data-filter` | Matching plan slugs (traceable to `data-filters` attributes) |
|---|---|
| `preventive` | `uhc-primary-dental`, `aetna-dental-direct` |
| `basic_major` | `aetna-dental-direct`, `ameritas-primestar`, `guardian-premier-ppo`, `metlife-ncd-complete`, `mutual-of-omaha-dental`, `humana-extend-5000`, `delta-dental-ppo-premium` |
| `implants` | `ameritas-primestar`, `metlife-ncd-complete`, `mutual-of-omaha-dental`, `humana-extend-5000`, `delta-dental-ppo-premium` |
| `ortho` | `guardian-premier-ppo`, `delta-dental-ppo-premium` |

Note: `uhc-primary-dental` only has `data-filters="preventive"`. `aetna-dental-direct` has `data-filters="preventive basic_major"`. These are already in the HTML and must not change.

---

## 3. Badge + Highlight CSS

Add these rules **inside the existing `<style>` block**, after the `.match-bar` rule set (around line 226).

```css
/* ── CARD MATCH STATE (phase 2.5) ── */

/* Hero match: green left border accent + elevated shadow */
.tour-stop.ts-match-hero {
  border-color: var(--covered);
  box-shadow: 0 0 0 2px var(--covered), var(--sh-2);
  transition: border-color .2s, box-shadow .2s;
}

/* Runner-up match: teal left border, lighter treatment */
.tour-stop.ts-match-runner {
  border-color: var(--teal);
  box-shadow: 0 0 0 1px var(--teal), var(--sh-1);
  transition: border-color .2s, box-shadow .2s;
}

/* Scroll-target flash: brief pulse to guide the eye */
@keyframes cc-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(15,157,110,.40), var(--sh-2); }
  60%  { box-shadow: 0 0 0 10px rgba(15,157,110,.00), var(--sh-2); }
  100% { box-shadow: 0 0 0 0 rgba(15,157,110,.00), var(--sh-2); }
}
.tour-stop.ts-scroll-pulse {
  animation: cc-pulse 0.7s ease-out forwards;
}

/* Refine the existing match-bar */
.match-bar {
  display: none;
  padding: 7px 26px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .04em;
  align-items: center;
  gap: 7px;
}
.match-bar::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.match-bar.match-yes {
  background: var(--covered-tint);
  color: var(--covered-ink);
  border-bottom: 1px solid #BFE8D5;
  display: flex;
}
.match-bar.match-yes::before { background: var(--covered); }

.match-bar.match-runner {
  background: var(--teal-tint);
  color: var(--teal-ink);
  border-bottom: 1px solid #BEE6E4;
  display: flex;
}
.match-bar.match-runner::before { background: var(--teal); }

/* Existing .match-no: keep dim, just ensure hidden when no match active */
.match-bar.match-no {
  background: var(--surface-2);
  color: var(--ink-faint);
  border-bottom: 1px solid var(--line-soft);
  display: flex;
}
.match-bar.match-no::before { background: var(--ink-faint); }

/* Filter dim: keep existing opacity but also use will-change for perf */
.tour-stop.dim {
  opacity: .35;
  pointer-events: none;
  transition: opacity .2s;
  will-change: opacity;
}

/* ── MINI "SEE HOW THIS PAYS" PANEL ── */
.ts-mini-panel {
  display: none;
  margin: 0 26px 18px;
  padding: 14px 16px;
  background: var(--teal-tint);
  border: 1px solid #BEE6E4;
  border-radius: var(--r-md);
  font-size: 13.5px;
  color: var(--ink-2);
  line-height: 1.55;
}
.ts-mini-panel.visible { display: block; }
.ts-mini-panel .tmp-head {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--teal-ink);
  margin-bottom: 6px;
}
.ts-mini-panel .tmp-math {
  font-size: 14px;
  color: var(--ink);
  line-height: 1.5;
}
.ts-mini-panel .tmp-math b { color: var(--covered-ink); }
.ts-mini-panel .tmp-skip {
  margin-top: 9px;
  font-size: 12.5px;
  color: var(--partial-ink);
}
```

**What changed vs existing:**
- `match-bar` now has `display:flex` with a color dot. The existing `display:none` / `display:block` toggle in JS must change to class-based since flex is now the shown state.
- Added `ts-match-hero`, `ts-match-runner` border states on the card itself (outer `article`).
- Added `ts-scroll-pulse` animation keyframe.
- Added `ts-mini-panel` block below `ts-body` inside each card.

---

## 4. HTML Changes Per Card

Each `.tour-stop` needs two additions:

1. A `ts-mini-panel` div after `.ts-body`, before closing `</article>`.
2. The `match-bar` already exists inside each card; JS logic will now write richer content into it.

**Skeleton for each card (copy-paste):**

```html
<article class="tour-stop" id="stop-uhc" data-plan="uhc-primary-dental" data-filters="preventive">
  <div class="match-bar" hidden></div>
  <div class="ts-body">
    <!-- existing content unchanged -->
  </div>
  <!-- NEW: mini pay panel, populated by JS -->
  <div class="ts-mini-panel" id="mini-uhc-primary-dental" aria-live="polite" hidden></div>
</article>
```

The `id` pattern for the mini panel is `mini-{data-plan-slug}`. Apply the same pattern for all 8 cards.

---

## 5. JS Replacement / Additions

The integration pass should **replace** the existing `applyMatch` function and **extend** `applyFilters` and the left-rail click handling. All additions go inside the existing IIFE (the `(function(){ ... })();` block).

### 5a. Replace `applyMatch`

The existing function at line ~1311 handles only hero. Replace it entirely:

```javascript
/* ── applyMatch: called after scenario finder or left-rail click ── */
function applyMatch(heroSlug, runnerSlug) {
  // runnerSlug optional; pass '' or null to suppress runner treatment
  var hasMatch = !!heroSlug;

  document.querySelectorAll('.tour-stop').forEach(function(card) {
    var slug = card.getAttribute('data-plan');
    var bar  = card.querySelector('.match-bar');
    var mini = card.querySelector('.ts-mini-panel');
    if (!bar) return;

    // Remove all prior states
    card.classList.remove('ts-match-hero','ts-match-runner');
    if (bar) { bar.hidden = true; bar.className = 'match-bar'; }
    if (mini) { mini.hidden = true; mini.classList.remove('visible'); mini.innerHTML = ''; }

    if (!hasMatch) return;

    if (slug === heroSlug) {
      card.classList.add('ts-match-hero');
      bar.textContent = 'Matches your situation';
      bar.className   = 'match-bar match-yes';
      bar.hidden      = false;
      populateMiniPanel(card, slug, true);

    } else if (runnerSlug && slug === runnerSlug) {
      card.classList.add('ts-match-runner');
      bar.textContent = 'Runner-up for your situation';
      bar.className   = 'match-bar match-runner';
      bar.hidden      = false;
      populateMiniPanel(card, slug, false);

    } else {
      bar.textContent = 'Not your best match';
      bar.className   = 'match-bar match-no';
      bar.hidden      = false;
    }
  });
}
```

All callers of `applyMatch` must be updated to pass the runner:

- In `render()`, line ~1303: change `applyMatch(route.hero)` to `applyMatch(route.hero, route.runner||null)`
- In the warning branch (~line 1264): `applyMatch('', null)` (or keep existing `applyMatch('')` if the new signature handles empty gracefully)

### 5b. Mini panel content function

Add this new function before `applyMatch`:

```javascript
function populateMiniPanel(card, slug, isHero) {
  var mini = card.querySelector('.ts-mini-panel');
  if (!mini) return;

  // Pull the dollar scenario for this card based on stored scenario
  var raw = safeGet('cc_scenario');
  var situation = '';
  try { if (raw) situation = JSON.parse(raw).situation || ''; } catch(e) {}
  var dollarKey = slug + '_' + situation;
  var dollarText = DOLLARS[dollarKey] || '';

  // Short-form strength headline per plan (static, from SSOT)
  var STRENGTHS = {
    'uhc-primary-dental':       'Fastest activation and lowest price on this shelf',
    'aetna-dental-direct':      'Prior-coverage waiver can erase both waiting periods',
    'ameritas-primestar':       'No waiting period on any category, benefits grow yearly',
    'guardian-premier-ppo':     '85% on basics from day one, only child ortho plan on the shelf',
    'metlife-ncd-complete':     'Highest annual maximum ($10,000), one-time $100 lifetime deductible',
    'mutual-of-omaha-dental':   'Community-rated pricing, no wait on major, our pick for seniors',
    'humana-extend-5000':       'Fastest covered implant path, 6-month wait, $4,000 lifetime',
    'delta-dental-ppo-premium': 'Largest PPO network, adult and child orthodontics covered'
  };
  var strength = STRENGTHS[slug] || '';

  var content = '';
  if (isHero) {
    content += '<div class="tmp-head">Why this plan fits your situation</div>';
    content += '<div class="tmp-math">' + strength + (dollarText ? '<br>' + dollarText : '') + '</div>';
  } else {
    content += '<div class="tmp-head">Why this is the runner-up</div>';
    content += '<div class="tmp-math">' + strength + '</div>';
  }

  // Skip line for hero only (from PLANS object)
  if (isHero && PLANS[slug] && PLANS[slug].skip) {
    content += '<div class="tmp-skip"><strong>Skip it if: </strong>' + PLANS[slug].skip + '</div>';
  }

  mini.innerHTML = content;
  mini.hidden = false;
  mini.classList.add('visible');
}
```

### 5c. Scroll to hero card (visual-only, no DOM reorder)

Add this helper and call it from `render()` after `applyMatch(...)`:

```javascript
function scrollToCard(slug) {
  // Uses existing anchor IDs on each article: #stop-uhc, #stop-aetna, etc.
  var ANCHORS = {
    'uhc-primary-dental':       'stop-uhc',
    'aetna-dental-direct':      'stop-aetna',
    'ameritas-primestar':       'stop-ameritas',
    'guardian-premier-ppo':     'stop-guardian',
    'metlife-ncd-complete':     'stop-metlife',
    'mutual-of-omaha-dental':   'stop-moo',
    'humana-extend-5000':       'stop-humana',
    'delta-dental-ppo-premium': 'stop-delta'
  };
  var id = ANCHORS[slug];
  if (!id) return;
  var el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });

  // Pulse animation to draw the eye
  el.classList.remove('ts-scroll-pulse');
  // Force reflow to allow re-triggering
  void el.offsetWidth;
  el.classList.add('ts-scroll-pulse');
  el.addEventListener('animationend', function handler() {
    el.classList.remove('ts-scroll-pulse');
    el.removeEventListener('animationend', handler);
  }, { once: true });
}
```

In `render()`, after `applyMatch(route.hero, route.runner||null)`, add:

```javascript
// Scroll to the recommended card (after a tick to let the DOM update)
setTimeout(function() { scrollToCard(route.hero); }, 80);
```

The `setTimeout` is necessary because `render()` is called synchronously inside a click handler; the card state needs to paint before scroll.

### 5d. Left-rail scenario nav: apply match on click

The existing left-rail `rl-nav a` links just jump to anchors. Extend them to also apply match state. Add this block after the IntersectionObserver setup for `scenLinks` (around line ~1368):

```javascript
/* Left-rail scenario nav: apply match badge on click */
scenLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    var slug = link.getAttribute('data-plan');
    if (!slug) return;

    // Map rail link slug to a runner (best effort from ROUTES)
    // Rail click does not have a timing dimension, so use 'any' or best guess
    var RAIL_RUNNERS = {
      'uhc-primary-dental':       'aetna-dental-direct',
      'aetna-dental-direct':      'uhc-primary-dental',
      'ameritas-primestar':       'mutual-of-omaha-dental',
      'guardian-premier-ppo':     'delta-dental-ppo-premium',
      'humana-extend-5000':       'mutual-of-omaha-dental',
      'mutual-of-omaha-dental':   'humana-extend-5000',
      'delta-dental-ppo-premium': 'guardian-premier-ppo'
      // metlife has no rail link
    };
    var runner = RAIL_RUNNERS[slug] || null;
    applyMatch(slug, runner);

    // Store in sessionStorage so the state can persist across page loads if needed
    try { sessionStorage.setItem('cc_hero_plan', slug); } catch(ex) {}

    gtagSafe('event', 'rail_scenario_click', { plan: slug, page: 'ppo_hub' });
    // Allow the anchor jump to proceed naturally (do not preventDefault)
  });
});
```

### 5e. Restore match state on page load from sessionStorage

Add this block at the **end** of the IIFE, before the closing `})();`:

```javascript
/* Restore last match state from sessionStorage on page load */
(function restoreMatchState() {
  var raw = safeGet('cc_scenario');
  if (!raw) return;
  try {
    var s = JSON.parse(raw);
    if (s && s.hero_plan) {
      applyMatch(s.hero_plan, s.runner_up || null);
      // Do NOT auto-scroll on restore: user is returning to browse, not just matched
    }
  } catch(ex) {}
})();
```

### 5f. Refined `applyFilters` (replace existing)

The existing function dims non-matching cards. Refine it to also preserve the `ts-match-hero` / `ts-match-runner` border even when other filters dim the rest, so the matched card stays visually prominent. Replace the existing `applyFilters` at line ~1334:

```javascript
function applyFilters() {
  var cards = document.querySelectorAll('.tour-stop');
  var visible = 0;
  cards.forEach(function(card) {
    var cf = (card.getAttribute('data-filters') || '').split(/\s+/);
    var filterMatch = activeFilters.length === 0 ||
      activeFilters.some(function(f) { return cf.indexOf(f) !== -1; });

    if (filterMatch) {
      card.classList.remove('dim');
      card.removeAttribute('aria-disabled');
      visible++;
    } else {
      card.classList.add('dim');
      card.setAttribute('aria-disabled', 'true');
    }
  });

  var cc = document.getElementById('filt-count');
  if (cc) {
    cc.textContent = activeFilters.length ? ('Showing ' + visible + ' of 8 plans') : '';
  }

  // If only 1 plan is visible after filtering and it has a hero badge, scroll to it
  if (visible === 1) {
    var heroCard = document.querySelector('.tour-stop:not(.dim).ts-match-hero');
    if (heroCard) {
      setTimeout(function() { scrollToCard(heroCard.getAttribute('data-plan')); }, 80);
    }
  }
}
```

---

## 6. Copy Rules for Match Bar Text

| State | Bar text | Copy notes |
|---|---|---|
| Hero match | "Matches your situation" | Short, confident, no exclamation |
| Runner-up | "Runner-up for your situation" | Honest, not dismissive |
| Non-match (when a hero is active) | "Not your best match" | Factual, not "bad" or "wrong" |
| No match active | hidden | Bar must be `hidden` attribute, not just visually hidden |

No em-dashes anywhere in badge or panel copy. No roman numerals. No countdown timers. Avoid phrases like "Great news!" or "Perfect match!" -- keep the tone concierge-calm.

---

## 7. Mini Panel Copy Guidelines

The `populateMiniPanel` function renders a brief "see how this pays" block inside the matched card. Rules:

- Maximum 2 lines of text in the panel.
- Dollar scenario text comes from the existing `DOLLARS` map -- no invented numbers.
- If no `DOLLARS` entry exists for the `slug_situation` key, show only the strength headline.
- The "Skip it if" line is shown only on the hero card, not the runner. It comes verbatim from `PLANS[slug].skip`.
- Do not render the panel on mobile unless the card is expanded (the `.mob-panel details` already handles this -- the mini panel lives after `.ts-body` so it shows on desktop inside the two-column layout and collapses naturally on mobile since `.ts-panel` is hidden there).

---

## 8. Reorder vs Scroll Decision (SEO Safety)

**Decision: visual highlight + smooth scroll, never DOM reorder.**

Rationale:
- DOM order matches the JSON-LD `ItemList` positional order (UHC at position 1 through Delta at 8).
- Reordering the DOM would desync the schema from the rendered order, creating a SERP-quality signal conflict.
- IntersectionObserver left-rail active state depends on scroll position matching DOM order.
- `scroll-margin-top:90px` is already set on `.block` elements.

The scroll approach is: `scrollIntoView({ behavior:'smooth', block:'center' })` plus the pulse animation. This is sufficient to guide the eye. The matched card is also visually distinguished by the green border and elevated shadow even before the user scrolls.

---

## 9. Accessibility Checklist

- `match-bar` uses `aria-live="off"` (it is not a live region -- it updates in batch when the user makes a selection). No change needed; `aria-live` is not currently set on bars, which is correct.
- `ts-mini-panel` has `aria-live="polite"` to announce content injection without interrupting the scenario-finder's own `aria-live="polite"` region.
- `scrollToCard` uses `scrollIntoView` which is natively focus-safe; we do NOT programmatically move focus to the card.
- Cards with `aria-disabled="true"` (dimmed by filter) already have `pointer-events:none` -- confirm the `dim` CSS still includes this after the refined `applyFilters` change.
- `ts-scroll-pulse` uses `prefers-reduced-motion` guard: the `scrollToCard` function already checks the module-level `reduceMotion` variable before choosing `smooth` vs `auto` behavior. The animation keyframe itself should be wrapped:

```css
@media (prefers-reduced-motion: no-preference) {
  @keyframes cc-pulse { ... }
  .tour-stop.ts-scroll-pulse { animation: cc-pulse 0.7s ease-out forwards; }
}
```

Move the `cc-pulse` keyframe and `.ts-scroll-pulse` rule inside that media query in the final CSS.

---

## 10. Integration Checklist

When the integration pass applies this document:

- [ ] Add CSS block (section 3) inside existing `<style>` after `.match-bar.match-no` rule
- [ ] Add `<div class="ts-mini-panel" id="mini-{slug}" aria-live="polite" hidden></div>` inside each of the 8 `.tour-stop` articles, after `</div><!-- /.ts-body -->` and before `</article>`
- [ ] Replace `applyMatch` function with section 5a version
- [ ] Add `populateMiniPanel` function (section 5b) above `applyMatch`
- [ ] Add `scrollToCard` helper (section 5c) above `applyMatch`
- [ ] In `render()`, update `applyMatch(route.hero)` call to pass runner and add `scrollToCard` call
- [ ] In the warning branch of `render()`, update to `applyMatch('', null)`
- [ ] Add left-rail click handler block (section 5d) after IntersectionObserver setup
- [ ] Add `restoreMatchState` IIFE (section 5e) at the end of the outer IIFE
- [ ] Replace `applyFilters` with section 5f version (add `scrollToCard` import guard: the function must be defined before `applyFilters`)
- [ ] Wrap `cc-pulse` keyframe in `prefers-reduced-motion: no-preference` media query (section 9)
- [ ] Verify no em-dashes in any new copy strings
- [ ] Verify `DOLLARS`, `PLANS`, and `ROUTES` objects are not moved or renamed -- `populateMiniPanel` reads them by name from the same IIFE scope
