# 14 — Mobile Dynamic Critique: Exact Breakpoint Behavior, Touch Targets, Performance

**Agent:** 14-mobile-dynamic-critique  
**Date:** 2026-06-26  
**Target file:** `/dental-insurance/ppo-plans/index.html`  
**Scope:** How every proposed dynamic piece from the Phase 2.5 brief behaves on phones (320px to 430px viewport width), and what must change from the current build to support that behavior correctly.

---

## 1. Current State Baseline

The existing hub collapses to single-column at `max-width:1080px`. At that breakpoint:
- Both rails (`rail-l`, `rail-r`) are `display:none`.
- `.inflow` divs become `display:block` (these are the in-flow mobile replacements for right-rail content).
- The sticky bar (`#sticky-bar`) becomes `display:block` and animates in via IntersectionObserver on the hero and footer sections.
- The scenario finder grid collapses to 2-up at `max-width:640px`.
- The plan tour-stop panel collapses from a side-by-side grid to stacked at `max-width:760px`, hiding the desktop aside and showing a `<details>` summary instead.
- The comparison table uses `overflow-x:auto` with a 880px `min-width` table, which is scrollable at any phone width.

The current sticky bar has three flat icon-plus-label buttons (Find a plan, Verify dentist, Compare) plus a dismiss X. It does not yet know the current best-match plan or respond dynamically to scenario state.

---

## 2. Breakpoint Architecture for the Enhanced Build

Use three explicit thresholds. Do not add more: each new breakpoint is a maintenance cost.

| Threshold | What changes |
|-----------|-------------|
| `1080px` | Rails disappear. Inflow regions activate. Sticky bar activates. Single-column layout. |
| `760px` | Tour-stop panels collapse (already handled). Comparison table reduced columns (new). |
| `640px` | Scenario finder grid drops to 2-up. Left-rail nav becomes horizontal pill strip. Verify band form stacks vertically. |

Everything at 430px and below is handled by the 640px rules plus fluid `padding:0 16px` and `clamp()` font sizes already in the system. No fourth breakpoint is needed.

---

## 3. Contextual Rotating Spotlight

### Desktop behavior (from agent 06 spec)
The right rail `.spot` block swaps content via JS when (a) the user selects a scenario-nav link or filter pill, or (b) an IntersectionObserver on `.tour-stop` elements fires. Each of the 8 plans has its own spotlight copy and a `data-spot` attribute on the tour-stop.

### Mobile inline behavior
At `1080px` and below, the right rail is hidden. The spotlight must appear inline, inside the center column, immediately after the relevant tour-stop article. The current `.inflow` pattern handles this: one `.inflow` div with `class="inflow spot"` already sits after the Aetna stop (the CVS block). The expanded build extends this to all 8 stops.

**Implementation direction:**

Each tour-stop needs a sibling inflow spotlight:

```html
<article class="tour-stop" id="stop-uhc" data-plan="uhc-primary-dental" ...>
  <!-- existing body -->
</article>
<div class="inflow spot spot-uhc" data-spot="uhc-primary-dental" aria-live="polite">
  <div class="sk">Why this plan wins</div>
  <h4>Fastest activation, cheapest, day-one preventive</h4>
  <p>UHC Primary Dental is live the next business day, covers cleanings at 100% from day one, and costs about $30 a month. No major work, no waiting game for what it does cover.</p>
  <a href="/dental-insurance/ppo-plans/uhc-primary-dental/">Read the full review</a>
</div>
```

At mobile widths, these are always visible (static, contextual). On desktop they are `display:none` (the `.inflow` rule handles this). The spotlight does not need to "rotate" on mobile because the user is scrolling linearly past each plan in order. Static per-plan spotlights are correct here. The rotating behavior (JS-driven swap) applies only on desktop where the right rail is visible and sticky.

**Performance note:** Do not attach IntersectionObserver callbacks to the inflow spotlights themselves on mobile. They are static. Observer count stays at 2 pools: one for section nav (7 targets) plus one for tour-stop highlights (8 targets). Total: 15 observed elements per pool. This is within the comfortable range (under 30 total elements with `rootMargin` filtering reduces callback frequency).

---

## 4. Bottom Pop-Off Bar: Primary Mobile Surface

### What it does today
Shows after the hero scrolls out of view, hides when the related-links section enters view. Three static buttons: Find a plan, Verify dentist, Compare. Dismiss X writes to sessionStorage.

### What Phase 2.5 requires
The bar must surface the current best-match plan name and a direct verify CTA for that plan. It becomes a 2-row surface when a scenario result exists.

**CSS direction:**

```css
/* default: 3-button strip, single row */
.sticky-in {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 16px;
}

/* upgraded: 2-row when plan is matched */
.sticky.has-match .sticky-in {
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
}
.sticky-match-row {
  display: none;
  align-items: center;
  gap: 10px;
  padding: 6px 0 2px;
  font-size: 13px;
  font-weight: 600;
  color: #C8E6E3;
}
.sticky.has-match .sticky-match-row {
  display: flex;
}
.sticky-btn-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**JS direction:**

When `render()` produces a result (the scenario finder resolves), write the hero plan slug to a module-level variable `currentMatchSlug`. Then call `updateStickyBar()`:

```javascript
function updateStickyBar() {
  var bar = document.getElementById('sticky-bar');
  if (!bar) return;
  var matchRow = bar.querySelector('.sticky-match-row');
  if (!currentMatchSlug || !PLANS[currentMatchSlug]) {
    bar.classList.remove('has-match');
    if (matchRow) matchRow.innerHTML = '';
    return;
  }
  var plan = PLANS[currentMatchSlug];
  bar.classList.add('has-match');
  if (matchRow) {
    matchRow.innerHTML =
      '<span>Your match: <strong>' + plan.name + '</strong></span>' +
      '<a class="btn btn-pri" style="min-height:36px;font-size:12px;padding:0 14px" ' +
      'href="/find-my-dentist?plan=' + currentMatchSlug + '">Verify dentist</a>';
  }
}
```

Call `updateStickyBar()` at the end of `render()` and `resetFinder()`.

**Touch target sizes:**
- Each `.sb-btn` must be at least 44px tall and at least 60px wide (current min-height: not set on sb-btn, the 5px/5px padding is insufficient on small phones).
- Fix: `min-height: 44px; min-width: 56px;` on `.sb-btn`.
- The dismiss X: currently `padding: 4px 8px`. Expand to `padding: 8px 12px` so the tap area is at least 40x40px.
- When `has-match`, the verify CTA link in `.sticky-match-row` must be `min-height:44px`.

**Safe area insets:** The current `padding-bottom: calc(8px + env(safe-area-inset-bottom))` is correct for iPhone home bar notch. Preserve it.

**Reflow risk:** Adding `.has-match` class triggers a height change on the sticky bar. This causes a layout shift if the bar is `position:fixed` but is measured by `body` padding. The current rule `body { padding-bottom: 84px }` is a fixed number. When `has-match` makes the bar taller (two rows instead of one), body padding-bottom needs to match. Use a CSS custom property that JS updates:

```javascript
// in updateStickyBar():
var barH = bar.offsetHeight;
document.body.style.setProperty('--sticky-h', barH + 'px');
```

```css
body { padding-bottom: var(--sticky-h, 84px); }
```

Call this after the DOM update settles with a zero-delay timeout or requestAnimationFrame.

---

## 5. Scenario Finder: 2-Up Chip Grid

### Current state
At `max-width:640px`, `#scenario-finder .sf-grid` switches to `grid-template-columns: repeat(2, 1fr)`. This is correct and already implemented. The chips are `min-height: 84px` with flex-column layout.

### Touch target compliance
At 320px viewport with 16px side padding, each chip is `(320 - 32 - 10) / 2 = 139px` wide and 84px tall. Both dimensions exceed the 44px minimum. The checkmark indicator (18x18px absolute-positioned top-right) is not itself a tap target, so its size is acceptable.

### What needs to change for Phase 2.5 interactivity
When the scenario finder renders a result, the bottom pop-off bar updates (see section 4). On mobile, the `sf-answer` block inside the finder is the primary recommendation surface. Its CTA buttons must each be `min-height: 48px; width: 100%` at mobile widths to be comfortable tap targets:

```css
@media (max-width: 640px) {
  #scenario-finder .sf-cta-row {
    flex-direction: column;
  }
  #scenario-finder .sf-cta-row .btn {
    width: 100%;
    justify-content: center;
  }
}
```

### Individual vs. Family toggle
The toggle strip (`sf-toggle`) is `width: fit-content` and internally uses `padding: 8px 20px` per button. At 320px this strip measures roughly 260px wide (two buttons at ~130px each including padding), which fits. No change needed. The toggle is not inside the chip grid.

---

## 6. Left-Rail Scenario Nav: Horizontal Pill Strip on Mobile

### Current state
The left rail is entirely hidden at 1080px. The scenario nav links (8 situational anchors) and the jump nav are both inside `rail-l`, which is `display:none` on mobile. There is no mobile equivalent.

### Phase 2.5 requirement
The scenario nav should become a horizontal scrollable pill strip injected into the center column, below the hero and above the scenario finder. This surfaces the "Your situation" navigation on mobile so users can jump directly to a plan story.

**CSS direction:**

```css
/* hidden on desktop (rail handles it), visible on mobile */
.mobile-scenario-nav {
  display: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding: 12px 0 4px;
  margin: 0 -16px; /* bleed to edge on mobile */
}
.mobile-scenario-nav::-webkit-scrollbar { display: none; }
.mobile-scenario-nav-inner {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  white-space: nowrap;
}
.mobile-scenario-nav .msn-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: var(--r-pill);
  border: 1px solid var(--line);
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  white-space: nowrap;
  text-decoration: none;
  min-height: 44px; /* touch target */
  flex-shrink: 0;
}
.mobile-scenario-nav .msn-pill:hover,
.mobile-scenario-nav .msn-pill.active {
  border-color: var(--teal);
  background: var(--teal-tint);
  color: var(--teal-ink);
}

@media (max-width: 1080px) {
  .mobile-scenario-nav { display: block; }
}
```

**DOM placement:** Insert `.mobile-scenario-nav` in the HTML as a sibling of `#scenario-finder`, between the hero and the scenario finder section. It does not need JS to function (pure anchor links). JS can optionally update `.active` state via the existing storyObs IntersectionObserver by also setting active class on `.msn-pill` elements with matching `data-plan`.

**Content:** Mirror the 8 links from the left rail `rl-nav` block, using the same text labels ("I just need cleanings", "A crown is coming", etc.). Each is a `<a>` pointing to the corresponding `#stop-*` anchor.

**Overflow handling:** On a 320px viewport, all 8 pills at ~130px average width sum to roughly 1100px, which bleeds well past the viewport. This is expected and correct: the strip scrolls horizontally. The bleed margin (`margin: 0 -16px`) ensures the strip reaches the screen edges, and `padding: 0 16px` on the inner div restores alignment for the first and last items.

**Performance:** No JS or IntersectionObserver is required for the strip to function. The optional active-state update reuses the existing storyObs pool with `classList.toggle` additions. Zero additional observers.

---

## 7. Wider Desktop Layout Collapsing to One Column

### Current CSS
`--rail-l: 236px`, `--rail-r: 300px`, `--max: 1200px`. The layout is `grid-template-columns: 236px minmax(0,1fr) 300px` with `gap: 32px`.

### Phase 2.5 direction (from agent 01)
Wider canvas: `--max: 1320px` to `1440px`, center column widened to `~720px to 780px`, rails slightly wider. The single breakpoint at `1080px` where both rails vanish remains correct, but the transition should be smoother on mid-range tablets (1080px to 1200px) where the 3-column grid can feel cramped.

**Recommended addition:**

```css
@media (max-width: 1200px) and (min-width: 1081px) {
  /* narrow desktop / landscape tablet: hide right rail only, keep left rail */
  :root { --rail-r: 0px; }
  .rail-r { display: none; }
  .inflow { display: block; margin: 18px 0; }
  .layout { grid-template-columns: var(--rail-l) minmax(0,1fr); }
}
```

This means:
- 1200px+: full 3-column layout.
- 1081px to 1200px: left rail + center only. Right rail content surfaces inline.
- 1080px and below: single column, both rails gone.

**Reflow concern:** The right rail contains the verify form, CVS spot, Capy Rewards spot, and share buttons. All of these already have `.inflow` counterparts in the center column. At the 1081-1200px intermediate range, the inflow divs become visible while the right rail is hidden. This produces no duplicate content visible at the same time.

---

## 8. Comparison Table: Horizontal Scroll, Reduced Columns

### Current state
`min-width: 880px` on the table. 8 columns: Plan, Monthly, Annual max, Waiting periods, Implants, Ortho, Best for, Verify. `overflow-x: auto` wrapper with `-webkit-overflow-scrolling: touch`. This works but 8 full columns at 880px requires significant horizontal swipe on a 390px phone.

### Phase 2.5 direction: reduced column set on narrow screens

At `max-width: 640px`, hide the least critical columns. The minimum useful set for a quick-reference table is: Plan, Monthly, Annual max, Waiting, Verify. Implants, Ortho, and Best for can be hidden at this breakpoint since those facts appear in the tour-stop cards.

**CSS direction:**

```css
@media (max-width: 640px) {
  table.cmp { min-width: 480px; } /* reduced from 880px */
  table.cmp .col-implants,
  table.cmp .col-ortho,
  table.cmp .col-bestfor { display: none; }
}
```

Add column classes to `th` and `td` elements:

```html
<th scope="col" class="col-implants">Implants</th>
<!-- and matching td.col-implants on each row -->
```

This reduces the swipe distance from ~490px overhang (880 - 390) to ~90px overhang (480 - 390), making the table feel like a quick-reference rather than a full spreadsheet on phone.

**Sticky header concern:** `thead th { position: sticky; top: 0 }` inside an `overflow-x: auto` container causes the sticky to stick to the scroll container, not the viewport. On mobile this means headers are visible while scrolling the table horizontally but not while scrolling the page vertically. This is correct behavior and acceptable. Do not change it.

**Touch target on verify link inside table:** `.vlink` cells are `<a>` elements rendered as inline text. At mobile widths the tap area may be under 44px tall. Fix with:

```css
@media (max-width: 640px) {
  table.cmp .vlink {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 8px;
  }
}
```

---

## 9. IntersectionObserver Count and Reflow Audit

### Current observer inventory
- `secObs`: 7 section elements (`sectionIds` array). Fires on page-section scroll to update left-rail jump-nav active state. On mobile this is unused (rail is hidden) but the observer still runs.
- `storyObs`: 8 tour-stop elements. Fires to update left-rail scenario-nav active state. On mobile also unused for the rail but will be reused for active state on the horizontal pill strip.
- Hero observer (sticky bar): 1 element.
- Footer observer (sticky bar): 1 element.

Total: 17 observed elements currently.

### Phase 2.5 additions
- If the dynamic spotlight desktop implementation uses its own observer pool, that adds 8 more elements (one per tour-stop). However, the storyObs pool already fires on each tour-stop intersection. Reuse storyObs callback to also trigger the spotlight swap. No new observer pool needed.
- The horizontal pill strip active state: reuse storyObs callback with an additional `classList.toggle` call on matching `.msn-pill` elements.
- The sticky bar has no new observer needs.

**Final observer count: 17 elements across 4 observer instances.** This is well within performance bounds. Chrome's documented comfortable range is under 100 observed elements per instance.

### Reflow risks from Phase 2.5 dynamic pieces

**Sticky bar height change (`has-match`):** Covered in section 4. Use `--sticky-h` custom property updated via `requestAnimationFrame` to avoid layout thrashing.

**`sf-step2` animated expand:** The current `max-height` transition from `0` to `240px` can cause a reflow. At mobile widths this element is directly in flow (not in a rail) and is visible, so this transition fires for mobile users. At 640px and below the step2 contains 3 timing buttons, measuring roughly 120px tall (one row of 3 pills). The animated max-height of 240px provides sufficient headroom. No change needed. The `prefers-reduced-motion` guard (`transition:none`) is already in place.

**Match-bar appearance on tour-stops:** Each `applyMatch()` call sets `.match-bar` from `display:none` to `display:block` (`.match-yes`) or `display:block` (`.match-no`) on all 8 cards. At mobile widths all 8 cards are in flow and visible, meaning 8 simultaneous layout changes. This is a potential jank source on older phones (iPhone 8 / mid-range Android). Mitigate by batching in a single `requestAnimationFrame`:

```javascript
function applyMatch(heroSlug) {
  requestAnimationFrame(function() {
    document.querySelectorAll('.tour-stop').forEach(function(card) {
      var bar = card.querySelector('.match-bar');
      if (!bar) return;
      if (!heroSlug) { bar.hidden = true; bar.className = 'match-bar'; return; }
      if (card.getAttribute('data-plan') === heroSlug) {
        bar.textContent = 'Matches your situation';
        bar.className = 'match-bar match-yes';
      } else {
        bar.textContent = 'Not your best match';
        bar.className = 'match-bar match-no';
      }
      bar.hidden = false;
    });
  });
}
```

**Filter dim opacity:** `applyFilters()` toggles `.dim` (opacity 0.4) on up to 8 cards. On mobile all 8 are in flow. Same rAF batching recommendation applies if the filter pill UX is surfaced on mobile. Currently filter pills are inside the left rail (hidden on mobile). If a mobile filter surface is added, batch those DOM mutations.

---

## 10. Content Inline Order on Mobile (320px to 430px)

The correct reading order for mobile after all Phase 2.5 elements are added:

```
1. Breadcrumb nav
2. Hero (H1, lede, meta pills, coverage chooser, chooser answer, CTAs)
3. [NEW] Horizontal scenario nav pill strip (.mobile-scenario-nav)
4. In-flow verify card (.inflow, first instance)
5. Scenario finder section (#scenario-finder)
   - Individual / Family toggle
   - 2-up chip grid (step 1)
   - Timing row (step 2, animated expand)
   - Answer block (recommendation output)
   - Start over link
6. Plan stories section (#plan-stories)
   Stop 01 UHC
   [Per-plan inline spotlight: .inflow.spot.spot-uhc]
   Stop 02 Aetna
   [Per-plan inline spotlight: .inflow.spot.spot-aetna (CVS block, already exists)]
   Stop 03 Ameritas
   [Per-plan inline spotlight: .inflow.spot.spot-ameritas]
   Stop 04 Guardian
   [Per-plan inline spotlight: .inflow.spot.spot-guardian]
   Stop 05 MetLife
   [Per-plan inline spotlight: .inflow.spot.spot-metlife]
   Stop 06 MOO
   [Per-plan inline spotlight: .inflow.spot.spot-moo]
   Stop 07 Humana
   [Per-plan inline spotlight: .inflow.spot.spot-humana]
   Stop 08 Delta
   [Per-plan inline spotlight: .inflow.spot.spot-delta]
7. First verify band (#verify-1)
8. Comparison table (#compare-table) -- 5 columns, h-scroll
9. Best for grid (#best-for) -- auto-fit minmax(264px,1fr) = 1-up on phone
10. Waiting periods section
11. Second verify band (#verify-2)
12. In-flow Capy Rewards spot
13. FAQ accordion
14. Share strip
15. Carrier cards + related links
16. Editorial disclosure
[FIXED] Sticky bottom bar
```

The "Best for" grid at step 9 renders as single-column on a 390px phone because `minmax(264px,1fr)` with one column at ~358px (390px - 32px padding) exceeds 264px, allowing one column per row. This is correct. No explicit breakpoint override needed.

---

## 11. Summary of Changes Required for Mobile Correctness

| Area | Status | Action |
|------|--------|--------|
| Scenario finder 2-up grid | Already correct | None |
| Scenario finder CTA buttons | Needs fix | Stack full-width at 640px |
| Left rail as pill strip | Missing | Add `.mobile-scenario-nav` HTML + CSS |
| Per-plan inline spotlights | Partial (only Aetna/CVS) | Add 7 more `.inflow.spot` siblings |
| Rotating spotlight on mobile | Not needed | Static per-plan blocks replace it |
| Bottom bar dynamic plan name | Missing | Add `.sticky-match-row`, `has-match` class, `updateStickyBar()` |
| Bottom bar touch targets | Undersized | `min-height:44px; min-width:56px` on `.sb-btn`, expand X padding |
| Bottom bar reflow | Risk | Use `--sticky-h` custom property |
| Comparison table | Oversized for phone | Add col classes, hide 3 cols at 640px, reduce min-width to 480px |
| Comparison verify links | Undersized tap area | `min-height:44px` via media query |
| `applyMatch()` performance | Minor risk | Wrap in `requestAnimationFrame` |
| `secObs` on mobile | Wasted cycles | Guard with `window.innerWidth > 1080` before observing, or accept cost (17 elements is trivially cheap) |
| Intermediate breakpoint 1081-1200px | Missing | Add 2-column rule: left rail + center, no right rail |

---

## 12. CSS and JS Code Fragments (Integration-Ready)

All fragments above are self-contained and can be dropped into the existing `<style>` block (CSS) and the IIFE in `<script>` (JS) without restructuring the file. The insertion points:

- CSS: after the existing `@media(max-width:1080px)` block.
- JS: `updateStickyBar()` goes after `applyMatch()`. Call `updateStickyBar()` at the end of `render()` and `resetFinder()`. The `requestAnimationFrame` wrap on `applyMatch()` replaces the existing function body.

No new dependencies, no new external scripts, no localStorage. sessionStorage is already used for `cc_sticky_dismissed`, `cc_scenario`, `cc_hero_plan`, `cc_household`.

---

*Three-line summary follows on the next line.*

---

**Summary:** The current hub already handles the critical mobile collapse at 1080px, but five things are missing or undersized: the left-rail scenario nav needs a horizontal pill strip replacement in mobile flow; the per-plan inline spotlights only exist for Aetna and need to be added for all 8 stops as static blocks (not JS-rotated); the sticky bar needs a second row surfacing the matched plan name and a direct verify CTA, with dynamic height handled via a CSS custom property to prevent body padding jank; the comparison table needs 3 columns hidden at 640px to reduce scroll overhang from 490px to 90px; and several touch targets (sticky bar buttons, comparison verify links, scenario CTA row) are under the 44px minimum and need explicit mobile overrides.
