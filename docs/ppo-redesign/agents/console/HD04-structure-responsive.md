# HD04 — Console Sub-Menu: Structure and Responsive Behavior

Scope: the sticky `.toc` bar in `compare-ppo-dental-plans.html`. ANALYZE/SPEC only. No code shipped.

## 1. Current state (grounded in real lines)

### CSS (lines 117-130)
- `.toc` — `position:sticky;top:0;z-index:60`, frosted background `rgba(255,255,255,.92)` + `backdrop-filter:saturate(180%) blur(10px)`, bottom hairline `1px solid var(--line)` (line 118).
- `.toc-prog` — the progress bar: `height:2px;background:var(--green);width:0;transition:width .1s linear` (line 119). It is the FIRST child of `.toc`, sitting above the wrap.
- `.toc .wrap` — single flex row, `align-items:center;gap:18px;height:var(--toch)` (line 120). Everything lives in ONE row today.
- `.toc-brand` — brand lockup, `flex-shrink:0` (line 121-123).
- `.toc-links` — scroll-spy nav, `display:flex;gap:22px;overflow-x:auto;scrollbar-width:none` (line 126-129). Active link gets `a.on` → `color:var(--ink);border-color:var(--green)` (line 129).
- `.toc-cta` — defined TWICE (line 124 and line 130). Line 124 sets `margin-left:auto` pill; line 130 overrides to `display:flex;gap:10px;margin-left:18px`. This duplicate is a latent bug to clean up during redesign.

### Markup (lines 858-878)
Order inside `.toc > .wrap`: `.toc-brand` (a) → `.toc-links nav#tocLinks` (8 anchors, `#match` ... `#faq`) → `.toc-cta` (Find a dentist). `.toc-prog#tocProg` is a sibling of `.wrap`, directly under `.toc`.

### Mobile (line 402-407)
`@media(max-width:600px)`: `.wrap{padding:0 16px}`, `.toc-links{gap:14px;font-size:12.5px}`. No structural change today — the single row just gets tighter and the links remain horizontally scrollable.

### Scroll-spy + progress JS (`scrollspy`, `#tocProg`)
The bar relies on two contracts that MUST survive any restructure:
1. `#tocProg.style.width` is set from scroll progress (page scrolled / scrollable height).
2. Each `#tocLinks a` toggles class `on` based on which `section[id]` is in view. The anchors must keep `href="#sectionId"` and stay queryable as `#tocLinks a`.

## 2. The problem

The console must now also hold: section nav (exists), brand (exists), a Plans dropdown, filters, compare state chip, theme toggle, find-a-dentist (exists as CTA). Seven+ control clusters cannot share one 56px row without crowding, especially on tablet/phone.

## 3. Recommended structure: TWO-TIER bar

Keep `.toc` sticky and keep `.toc-prog` pinned to the very top. Split the content into two rows so the scroll-spy section links get their own clean strip.

- Row 1 (Control row): brand + Plans dropdown + Filters + Compare chip + theme toggle + Find-a-dentist CTA.
- Row 2 (Section row): scroll-spy `#tocLinks` + nothing else, so it can scroll horizontally without colliding with controls.
- Progress bar: stays as `.toc`'s first child, full-width, above both rows.

Rationale: the scroll-spy strip is the one element that genuinely needs horizontal scroll on small screens; isolating it in row 2 lets row 1 controls collapse independently into a "More" menu without breaking spy/progress.

### HTML skeleton

```html
<div class="toc" id="console">
  <div class="toc-prog" id="tocProg"></div>

  <!-- ROW 1: controls -->
  <div class="toc-row toc-row--control">
    <div class="wrap toc-controls">
      <a class="toc-brand" href="/compare-ppo-dental-plans/">
        <span class="mk">...</span> PPO Plan Hub
      </a>

      <div class="toc-cluster" role="group" aria-label="Console controls">
        <!-- Plans dropdown -->
        <div class="toc-dd" data-dd="plans">
          <button class="toc-dd-btn" aria-expanded="false" aria-controls="dd-plans">Plans &#9662;</button>
          <div class="toc-dd-menu" id="dd-plans" role="menu" hidden>...</div>
        </div>
        <!-- Filters -->
        <button class="toc-ctrl" data-dd="filters" aria-expanded="false">Filters <span class="toc-badge" data-count></span></button>
        <!-- Compare state chip -->
        <button class="toc-ctrl toc-compare" aria-live="polite">Compare (<span id="cmpCount">0</span>)</button>
        <!-- Theme toggle -->
        <button class="toc-icon theme-tog" aria-label="Toggle theme">...</button>
      </div>

      <a class="toc-cta" href="/find-my-dentist">Find a dentist</a>

      <!-- mobile-only overflow trigger -->
      <button class="toc-more" aria-expanded="false" aria-controls="toc-more-menu" hidden>More</button>
    </div>
  </div>

  <!-- ROW 2: scroll-spy section nav (unchanged contract) -->
  <div class="toc-row toc-row--sections">
    <div class="wrap">
      <nav class="toc-links" id="tocLinks" aria-label="Hub sections">
        <a href="#match">Match a plan</a>
        ... (unchanged anchors) ...
        <a href="#faq">FAQ</a>
      </nav>
    </div>
  </div>

  <!-- collapsed overflow sheet (phone) -->
  <div class="toc-more-menu" id="toc-more-menu" hidden>
    <!-- Plans / Filters / Compare / Theme cloned or moved here at phone width -->
  </div>
</div>
```

The scroll-spy and `#tocProg` JS need NO change: `#tocLinks a` and `#tocProg` keep their IDs and DOM relationships.

## 4. Responsive rules (concrete)

Reuse existing tokens only: `--toch`, `--line`, `--green`, `--ink`, `--ink-soft`, `--muted`. Introduce one var `--toch2` for the section row height (suggest 44px) so total sticky height = `--toch + --toch2`.

### Desktop (>= 980px) — both rows visible, everything inline
```css
.toc-row{border-bottom:1px solid var(--line)}
.toc-row--sections{border-bottom:0}
.toc-controls{display:flex;align-items:center;gap:18px;height:var(--toch)}
.toc-cluster{display:flex;align-items:center;gap:14px;margin-left:auto}
.toc-cta{flex-shrink:0;margin-left:18px}      /* resolve the duplicate: keep ONE .toc-cta rule */
.toc-row--sections .wrap{height:var(--toch2,44px);display:flex;align-items:center}
.toc-links{display:flex;gap:22px;overflow-x:auto;scrollbar-width:none}
.toc-more{display:none}
```

### Tablet (620-979px) — both rows stay, controls tighten, labels can hide
```css
@media(max-width:979px){
  .toc-cluster{gap:10px}
  .toc-dd-btn,.toc-ctrl{font-size:13px;padding:7px 10px}
  .toc-cta{padding:8px 13px}                 /* shrink CTA, keep visible */
  .toc-brand .mk + *{font-size:14px}
  .toc-links{gap:18px;font-size:13px}
}
```

### Phone (<= 620px) — collapse row 1 controls into "More", keep row 2 scrolling
```css
@media(max-width:620px){
  .wrap{padding:0 16px}
  .toc-controls{height:56px;gap:10px}
  .toc-cluster{display:none}                 /* Plans/Filters/Compare/Theme move to sheet */
  .toc-more{display:inline-flex;margin-left:auto}
  .toc-cta{display:none}                      /* Find-a-dentist becomes first item in More, or a sticky bottom CTA */
  .toc-row--sections .wrap{height:42px}
  .toc-links{gap:14px;font-size:12.5px;-webkit-overflow-scrolling:touch}
  .toc-more-menu:not([hidden]){display:block;position:absolute;left:0;right:0;top:100%;
    background:#fff;border-bottom:1px solid var(--line);padding:14px 16px;
    box-shadow:0 12px 30px rgba(15,27,37,.10)}
}
```

Notes:
- The Compare chip count (`#cmpCount`) should remain `aria-live="polite"` even when moved into the More sheet so screen readers hear updates.
- A fade affordance on `.toc-links` (right-edge `mask-image:linear-gradient(90deg,#000 85%,transparent)`) signals more sections off-screen on phone; cheaper than arrows.
- Keep `z-index:60` on `.toc`; give `.toc-more-menu` `z-index:59` so it tucks under the bar's hairline but over page content.

## 5. Alternative considered (single scrollable row + More)
Keep one row; push section links into the same horizontal scroller as controls and surface a "More" menu on phone. Rejected as primary because mixing controls and scroll-spy anchors in one overflow scroller makes the active-link border-bottom indicator collide visually with control buttons, and horizontal-scrolling a row that contains a dropdown trigger creates awkward tap targets. The two-tier layout isolates the one element that needs to scroll.

## 6. Migration / risk notes
- Remove the duplicate `.toc-cta` rule (lines 124 and 130) — keep a single definition to avoid `margin-left` ambiguity.
- Total sticky height grows by `--toch2` (~44px); any JS that offsets scroll anchors by header height must read the new combined height. Scroll-spy "in view" thresholds should subtract `--toch + --toch2`.
- `#tocProg` and `#tocLinks` IDs and parent chain unchanged — no JS rewrite required, only an offset constant update.
- No em-dashes, no new color tokens, no gradients on the bar surface.
