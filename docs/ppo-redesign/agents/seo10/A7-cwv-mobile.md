# A7 — Core Web Vitals, Performance & Mobile Signals

**Page:** `compare-ppo-dental-plans.html`
**Role:** SEO Architect 7 of 10 — CWV (LCP, CLS, INP), performance, mobile-friendliness.
**Mode:** Analyze and spec only. No code changes. All findings grounded in real lines.
**Standing rule:** no em-dashes in any shipped copy.
**Builds on:** `docs/ppo-redesign/agents/elite/SEO5-technical.md` (Issues 6 to 10 of that memo). This memo deepens and supersedes those CWV items with metric-keyed, line-referenced fixes and adds items SEO5 did not cover.

---

## Verdict

CWV exposure on this page is moderate and almost entirely fixable with page-level edits. The headline comparison facts ship as a static table, which protects the largest contentful element from depending on JS. The real risks are: (1) a render-blocking third-party font request plus three render-blocking component stylesheets in `<head>`, all on the critical path; (2) confirmed layout-shift sources from JS-injected nav, footer, and the grid/matrix that replace or fill empty containers after first paint; (3) INP exposure from heavy synchronous DOM rebuilds (`innerHTML` swaps) and scroll-driven handlers; and (4) a total absence of `prefers-reduced-motion` despite many unconditional animations. Mobile-friendliness signals are mostly correct already (viewport, responsive breakpoints, tap-target floors), with a few spots to confirm once nav is server-rendered.

SEO5 already flagged fonts (its Issue 6), the three nav/footer CSS files (Issue 7), lazy-loading/OG (Issue 8), reduced-motion (Issue 9), and mobile tap targets (Issue 10). This memo keeps those, adds the metric mapping, and adds new items SEO5 did not surface: the `backdrop-filter` repaint cost on the sticky TOC (line 154), the unbounded `will-change:transform` on the theme thumb (line 856), the JS-injected dentist avatar `<img>` with no width/height/loading (line 1795), and the `min-height` mount guards as a CLS mitigation that is half-right.

---

## LCP — Largest Contentful Paint

The LCP candidate is almost certainly the hero H1 (`compare-ppo-dental-plans.html:384`, `font-family:var(--serif)` = Inter Tight) or the hero entry card. Both are text in a webfont, so LCP is gated by font delivery.

**L1. Render-blocking Google Fonts stylesheet (high).**
- Lines 21 to 23: `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` (correct), then a blocking `<link rel="stylesheet" ...css2?...&display=swap>`.
- `display=swap` (line 23) is correct and prevents invisible text, but the stylesheet `<link>` still blocks render until the CSS round trip completes. Eight weights are requested (Inter 400/500/600/700 + Inter Tight 400/500/600/700); the fold uses far fewer.
- **Fix (page edit, lines 21 to 23):** Self-host Inter and Inter Tight as `woff2`, `font-display:swap`. Preload only the one or two above-the-fold weights with `<link rel="preload" as="font" type="font/woff2" crossorigin>`. Trim the requested weights to those actually rendered above the fold. This removes the third-party round trip from the LCP path. If self-hosting is deferred, at minimum drop unused weights from the query string. Medium-high priority; this is the single biggest LCP lever.

**L2. Three render-blocking component stylesheets (medium).**
- Lines 25 to 27: `mega-nav.css`, `mega-nav-mobile.css`, `footer.css` are blocking `<link>`s, yet they style components that are injected late by JS (mount divs at line 892 / footer mount, loader 2379 to 2431 per SEO5). The CSS blocks first paint for content that is not even in the DOM at first paint.
- **Fix (build/page):** Once nav and footer are server-rendered (see C1), inline the critical nav CSS and defer the rest, or merge the three files and load `media="print" onload` swap or `rel=preload` pattern. Removing two of three network requests off the critical path measurably helps LCP and First Contentful Paint. Medium priority.

**L3. `og:image` asset must exist (low, not strictly LCP).**
- Lines 16 and 20 reference `/og/compare-ppo-dental-plans.png`. Confirm the file exists at ~1200x630. A 404 here is a silent social/preview miss, not a CWV regression, but verify it. Low priority. (Carried from SEO5 Issue 8.)

**Good already:** the static comparison table (SEO5 lines 1042 to 1055) means the primary content paints without JS, so LCP does not wait on the Supabase/JS render path. Keep it that way.

---

## CLS — Cumulative Layout Shift

This page has several confirmed shift sources because empty containers are filled, and full containers are replaced, after first paint.

**C1. JS-injected nav and footer (high).**
- Empty mounts in source (`#cc-nav-mount` line 892; footer mount), filled by the fetch-and-inject loader (lines 2379 to 2431, `wrapper.innerHTML` at 2412, swap 2415 to 2416 per SEO5).
- The author anticipated this with `min-height` mount guards: `#cc-nav-mount{min-height:72px}` (line 30) and `#cc-footer-mount{min-height:420px}` (line 31), plus `:empty{min-height:0}` resets (lines 32 to 33). This is a partial mitigation: it reserves vertical space so injected content does not push the page down, which is good. But the reserved heights are guesses; if the rendered nav or footer differs from 72px / 420px, a residual shift remains, and the `:empty` reset to 0 can itself cause a shift if the fetch fails or is slow (the reserved box collapses).
- **Fix (build, preferred):** Server-render (bake inline at build time) the nav and footer HTML into the mounts so there is zero post-paint injection and the `min-height` guards can be dropped (SEO5 Issue 3, C1). This eliminates the shift entirely rather than reserving space for it. If runtime injection must stay short-term, set the `min-height` to the exact measured rendered heights and remove the `:empty{min-height:0}` reset so a failed fetch does not collapse the box. High priority.

**C2. JS-rendered grid and matrix replacing or filling content (medium).**
- `#planGrid` (line 1040) ships a static table (1042 to 1055) that JS replaces via `$('#planGrid').innerHTML=...` (lines 1520, 1522 per SEO5). If the static table and the JS-rendered grid differ in height, the swap shifts everything below it.
- `#featTable` (1071) and `#featMobile` (1070) are empty in source and filled by JS (1693, 1726 per SEO5). Empty-to-filled is a guaranteed shift unless space is reserved.
- **Fix (build/page):** For `#planGrid`, ensure the static fallback table and the JS replacement render at the same height (match row count and row height) so the `innerHTML` swap is visually identical, or reserve a `min-height` on `#planGrid`. For `#featTable`/`#featMobile`, ship a static fallback (SEO5 Issue 5) so they are populated at first paint, or reserve `min-height` on both containers. Medium priority.

**C3. JS-injected dentist avatar image with no dimensions (medium).**
- Line 1795: `'<div class="dc-av"><img src="'+d.image+'" alt="'+d.practice+'">'` — the only raster `<img>` on the page, injected by JS into dentist cards, with no `width`, `height`, or `loading` attribute. Unsized images are a classic CLS source as each avatar loads.
- **Fix (page edit, line 1795):** Add explicit `width` and `height` (or fixed CSS box on `.dc-av img`) and `loading="lazy"` plus `decoding="async"`. The `.dc-av` container likely has a fixed size already; confirm and constrain the `img` to it so no reflow occurs on load. Medium priority. (Extends SEO5 Issue 8.)

**C4. JSON-LD injected at runtime (no visual CLS, but a rendering-fragility note).**
- `injectSchema()` appends a `<script>` to `<head>` at runtime (SEO5 Issue 4, lines 1985 to 1997, called 2309). No layout impact, but it forfeits guaranteed structured-data parse. Bake it static at build time. Cross-reference only; owned by SEO5/schema architect.

**Good already:** carrier logos are CSS mono-letter lockups (`.clogo`, line 487; `.clogo.m1/.m2/.sm`, lines 488 to 489), not images, so they paint instantly with zero network cost and zero CLS. This was the right call; do not regress to hotlinked logo files. Keep brand/logo marks as inline SVG (as the masthead logo at lines 100 to 105 already is).

---

## INP — Interaction to Next Paint

**I1. Full-container `innerHTML` rebuilds on interaction (medium).**
- The grid, matrix, feature table, and recommendation card are rebuilt by reassigning `innerHTML` on whole containers (e.g. `#planGrid` swaps at 1520/1522; feature fills at 1693/1726). Any filter, sort, ZIP entry, or chip toggle that triggers a full string-concat-then-`innerHTML` rebuild forces synchronous parse, style, layout, and paint of a large subtree on the interaction, which inflates INP, especially on mid-tier mobile.
- **Fix:** For sort/filter on the feature table (sortable headers, lines 334 to 338), update only changed rows or use a keyed update rather than rebuilding the whole `<tbody>`. Where a full rebuild is unavoidable, defer non-urgent work with `requestAnimationFrame` or schedule after the input paint. Audit each `innerHTML=` call against the interaction that triggers it. Medium priority, build/JS task.

**I2. Scroll-driven TOC progress bar (low-medium).**
- `.toc-prog{...transition:width .1s linear}` (line 155) is driven by scroll position. If the width is updated in a raw `scroll` handler without throttling, every scroll event causes a layout-affecting style write. `width` animation also triggers layout, not just compositing.
- **Fix:** Throttle the scroll handler to `requestAnimationFrame`, and prefer animating `transform:scaleX()` on the progress bar over `width` so it stays on the compositor. Low-medium priority, JS/CSS task.

**I3. `backdrop-filter` on the sticky TOC (low-medium, new vs SEO5).**
- Line 154: `.toc{position:sticky;...backdrop-filter:saturate(180%) blur(10px)}`. A blurred backdrop on a sticky element is recomputed on every scroll frame over changing content, which is a known repaint cost on lower-end devices and can degrade scroll smoothness (felt as INP/responsiveness).
- **Fix:** Consider a solid or near-solid `rgba` background without `blur` for the sticky bar, or gate the blur behind `@media (min-width: ...)`/capability so mobile uses a flat fill. The bar already has `background:rgba(255,255,255,.92)` (near opaque), so dropping the blur costs little visually. Low-medium priority, page edit.

**I4. Unbounded `will-change:transform` on theme thumb (low, new vs SEO5).**
- Line 856: `.ts-thumb{...will-change:transform}`. `will-change` left on permanently promotes a layer for the lifetime of the page, consuming memory and GPU resources even when the theme toggle is idle. It is a micro-cost but a real anti-pattern.
- **Fix:** Remove the static `will-change`, or apply it only on hover/focus of the toggle and remove it after the transition. Low priority, page edit.

---

## prefers-reduced-motion — ABSENT (confirmed)

There is **no** `@media (prefers-reduced-motion: reduce)` block anywhere in the file (grep for `prefers-reduced-motion` returns zero matches). Meanwhile the page animates unconditionally in many places:
- `html{scroll-behavior:smooth}` (line 65)
- TOC progress bar `transition:width .1s` (line 155)
- theme thumb `transition:transform 1.8s ...;will-change:transform` (line 856) — a very long 1.8s transform
- FAQ open/close row animation `transition:grid-template-rows .5s ...` (lines 323 to 324) and indicator rotate `transition:transform .4s` (line 321)
- card hover lifts `transform:translateY(...)` (e.g. `.fq:hover` line 314, `.hub-branches a:hover` line 179)
- tooltip transitions (lines 277 to 278)
- many `.18s`/`.15s` hover transitions throughout

**Fix (page edit, CSS):** Add a single global block:
```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.001ms!important;
    animation-iteration-count:1!important;
    transition-duration:.001ms!important;
    scroll-behavior:auto!important;
  }
}
```
This is an accessibility requirement (WCAG 2.3.3) and a CWV-adjacent win (motion work skipped for users who opt out). Medium priority. (Carried and confirmed from SEO5 Issue 9; SEO5 was correct that it is absent.)

---

## Mobile-friendliness signals

**Confirmed correct:**
- Viewport meta is present and correct: `<meta name="viewport" content="width=device-width, initial-scale=1">` (line 5).
- Responsive breakpoints exist and are layered sensibly: `max-width:920px` collapses the FAQ grid to one column (line 379); `max-width:760px` swaps the desktop feature table for mobile cards (`#featMobile{display:block};.feat-tbl-scroll{display:none}`, lines 375 to 378); `max-width:900px` reflows the nav flyouts (lines 121, 135); `max-width:600px` is the full mobile pass (lines 439 to 485) reflowing hero, match grid, goal grid, compare matrix, plan cards, and dentist section.
- The horizontally scrollable comparison matrix is handled well on mobile: `overflow-x:auto;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity` (line 459), a sticky label column (lines 461 to 462), scroll-snap on plan columns (line 463), and a visible "Swipe to see more plans" affordance (line 482). This is a correct pattern for a wide table on a narrow screen and avoids horizontal page overflow.
- Tap-target floors are mostly met: `--toch:52px` for the sticky TOC height (line 62), and mobile CTAs set `min-height:48px`/`46px` (lines 458, 473, 478). These clear the 44px minimum.

**To confirm / fix:**
- **M1 (medium):** Tap targets inside the **JS-injected nav** cannot be audited from source because the markup is fetched. Once nav is server-rendered (C1), spot-check that all nav links and the mobile menu toggle meet 44x44px and have adequate spacing. SEO5 Issue 10 noted this; it stays open until nav is inline.
- **M2 (low):** The desktop feature table has `min-width:900px` (line 331) inside a `feat-tbl-scroll` wrapper, but it is hidden below 760px (line 377) in favor of cards, so it does not cause mobile overflow. Confirm no other element exceeds the viewport width on a 360px device (the `.cmp-grid` uses `minmax(43vw,1fr)` columns at line 461, which is safe).
- **M3 (low):** `theme-color` is set (line 10), a minor mobile UI polish signal. Good.

There is no oversized sticky console/footer bar on this page; the `ts-` classes (lines 851 to 872) are the gold/jade theme switch, not a sticky CTA bar. The only persistently sticky chrome is the TOC (line 154, height 52px) and the in-table sticky header/label column. Sticky height is reasonable on mobile and does not crowd the viewport.

---

## Priority matrix

| ID | Item | Metric | Severity | Page edit vs build |
|----|------|--------|----------|--------------------|
| L1 | Render-blocking Google Fonts; self-host + preload + trim weights | LCP | High | Page edit (lines 21 to 23) + asset hosting |
| C1 | Server-render nav/footer; fix mount-guard heights | CLS | High | Build (preferred) / page edit fallback |
| C2 | Match static vs JS grid heights; reserve feature-table space | CLS | Medium | Build/page |
| C3 | Size + lazy-load injected dentist avatar img | CLS | Medium | Page edit (line 1795) |
| I1 | Avoid full-container innerHTML rebuilds on interaction | INP | Medium | Build/JS |
| PRM | Add prefers-reduced-motion block | INP/a11y | Medium | Page edit (CSS) |
| L2 | Defer/merge the three component CSS files | LCP/FCP | Medium | Build/page (lines 25 to 27) |
| I2 | rAF-throttle TOC progress; animate transform not width | INP | Low-med | Page edit (line 155) |
| I3 | Drop blur on sticky TOC backdrop-filter | INP | Low-med | Page edit (line 154) |
| I4 | Remove static will-change on theme thumb | INP | Low | Page edit (line 856) |
| M1 | Verify injected-nav tap targets once server-rendered | Mobile | Medium | Build then verify |
| L3 | Verify OG image asset exists at 1200x630 | n/a | Low | Asset check (lines 16, 20) |

---

## Crawl/CWV target state checklist

- [ ] Fonts self-hosted or weight-trimmed; above-fold weight preloaded (L1).
- [ ] Nav and footer present in raw HTML; mount-guard `min-height` removed or exact (C1).
- [ ] `#planGrid` swap is height-stable; `#featTable`/`#featMobile` have reserved space or static fallback (C2).
- [ ] Dentist avatar `<img>` carries width/height + loading=lazy (C3).
- [ ] Interaction handlers avoid whole-subtree `innerHTML` rebuilds where possible (I1).
- [ ] `@media (prefers-reduced-motion: reduce)` block present (PRM).
- [ ] Component CSS off the critical path (L2).
- [x] LCP content (comparison facts) paints without JS via static table. Already true.
- [x] Carrier logos are CSS mono-letters, not images. Already true (line 487).
- [x] Viewport meta correct; responsive breakpoints layered. Already true (lines 5, 375 to 485).
- [x] Wide comparison matrix scrolls with snap + swipe hint on mobile. Already true (lines 459 to 482).
- [x] Mobile CTA tap targets meet 44px floor (static markup). Already true (lines 458, 473, 478).
