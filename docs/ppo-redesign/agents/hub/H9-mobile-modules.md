# Agent H9 — Mobile UX + ZIP-Module Preservation (Hub)

**Mandate:** the rebuilt master hub must be a *superset* of the ZIP package + the live page — every cool module preserved, plus Smart Match and the 3-layer glossary tooltips, and it must behave at least as well as the ZIP on mobile. T5 Jade palette throughout.
**Audited:** `assets/ppo/ppo-system.css`, `assets/ppo/ppo-hub.js`, `assets/ppo/glossary.json`, the ZIP package (`_redesign-package/compare-ppo-dental-plans.html` + `presentation-specs/04-plan-detail-spec.md`), the live page `valueFrame()`, and agent memos 03 (mobile/sticky) + 06 (a11y/perf).
**Date:** 2026-06-21

---

## 1. MOBILE LAYOUT + STICKY-ELEMENT COLLISION CONTRACT

### 1.1 The sticky inventory (what can pin)
| Element | CSS today | Anchor | z-index |
|---|---|---|---|
| Promo `.alert` banner | `position:sticky;top:0` (make `static` <640px) | top | 200 |
| `cc-subnav` (one per page) | `position:sticky;top:0;z-index:30` | top, in-flow | 30 |
| `cc-tray` (compare, ≤4) | `position:sticky;bottom:0;z-index:35` | bottom | 35 |
| CTA bar ("Verify free") — **to add** | `position:fixed;bottom:0;z-index:25` | bottom | 25 (BELOW tray) |

### 1.2 The contract — at most ONE top sticky + ONE bottom element
**Rule:** the top subnav (sticky, in-flow) may always show. Below it, **exactly one** bottom-anchored element is visible at a time. **Tray beats CTA bar** — an open tray is active intent.

| State | Subnav | Compare tray | CTA bar |
|---|---|---|---|
| In hero, 0 pinned | shown | hidden | hidden |
| Scrolled past hero, 0 pinned | shown | hidden | **shown** |
| 1–4 plans pinned | shown | **shown** | hidden (suppressed) |
| Tray open + footer near | shown | hidden | hidden |
| Mega-nav drawer open | hidden (drawer covers) | hidden | hidden |

Enforcement: reuse the ZIP `apply()` logic verbatim — `bar.show = pastHero && !nearFooter && !trayOpen`. IntersectionObservers drive `pastHero`/`nearFooter` (no scroll-thrash). When `body.cc-locked` (hamburger drawer), `display:none` both bottom elements.

### 1.3 No-jump + no-clip rules
- Subnav stays `position:sticky` (in-flow) → **zero content jump**. Never convert to `fixed`.
- One offset token only: `--cc-anchor-offset:62px` already on `[id]{scroll-margin-top}` in `ppo-system.css`. Also add `html{scroll-padding-top:var(--cc-anchor-offset)}`. Kills the old 52/60/70/84/118 magic numbers.
- Matrix header re-sticks under subnav: `.cc-cmp thead th{top:0}` inside its own `overflow:auto` region — verified already in CSS.
- While tray is open, JS sets `--cc-tray-h` and applies `body{padding-bottom:var(--cc-tray-h)}` so the footer / last section never hides behind it. **(GAP — not yet in `ppo-hub.js`; see Recs.)**

### 1.4 Horizontal-scroll matrix on mobile
- `.cc-term` is the scroll region: wrap with `tabindex="0" role="region" aria-label="Plan comparison, scroll horizontally"` (a11y, Agent 06 §2.1). `min-width:760px` forces lateral scroll.
- **Pin the first (spec-label) column only** on mobile; the ZIP's 2nd sticky column is *released* <640px — do NOT port a second sticky column, it eats width. Current `.cc-cmp tbody th{position:sticky;left:0}` is correct.
- Add an edge-fade `mask-image` + a one-time "Scroll to compare →" hint chip. **Never `display:none` a column** — that kills lateral nav and orphans `scope` associations.
- Each cell ≥44px tall; touch targets (pin checkbox, tray `×`, subnav links, CTA) all ≥44px with ≥8px spacing. Tray `×` glyph currently sub-44px → wrap in a 44px hit area.

### 1.5 Smart Match + glossary on mobile
- `.cc-match` collapses `1fr 1fr → 1fr` at `max-width:740px` (already in CSS §9). Chips wrap; range slider full-width with restored focus ring.
- Glossary tooltips already open on **hover + focus + tap, Esc-dismiss** (`initGlossary` in `ppo-hub.js`) — this is the 3-layer pattern and is the single biggest a11y win over the ZIP's hover-only `.tip`. Keep it; position-clamps to viewport already handled.

---

## 2. ZIP-MODULE PRESERVATION CHECKLIST

Legend: ✅ present/ported · 🔶 to-port · behavior = mobile behavior in the rebuild.

| # | Module | Status | Mobile behavior | Regression risk |
|---|---|---|---|---|
| 1 | Spec-first plan card (`cc-card`) | ✅ ported | grid `auto-fill minmax(255px,1fr)` → single column; cov-grid stays 5-up | none |
| 2 | Comparison matrix + Year-1/Later toggle (`cc-cmp`) | ✅ ported (superset: ZIP had no yr toggle) | horiz-scroll, 1 pinned label col, sticky header | none if `role=region`+`tabindex` added |
| 3 | Pin-to-compare tray, ≤4 (`cc-tray`) | ✅ ported | bottom sticky; **needs** `inert`/`aria-hidden` when empty + `body` padding when open + 44px `×` | medium — see Rec 1 |
| 4 | Sort/filter toolbar (`cc-toolbar`) | ✅ ported | chips wrap; `:has(input:checked)` active state | none |
| 5 | Coverage spec-dots (`cc-ps`) | ✅ ported | flex-wrap dots; **add SR text** (color-only today) | low (a11y) |
| 6 | **ZIP-code quote input** (`#hzip`) | 🔶 **TO-PORT** | full-width stacked input+button, `inputmode=numeric` | would regress vs ZIP — see §3.1 |
| 7 | Analytics `data-ev` taxonomy | ✅ ported (delegated → `dataLayer`) | works; keep `data-key` on tray/CTA | none |
| 8 | Carrier logo plate (`cc-logo-plate`) | 🔶 to-port | inline SVG + monogram fallback (no runtime `onerror`) | low |
| 9 | Theme switch (Warm/Jade `data-palette`) | ✅ ported | persists via `localStorage`; pre-paint to avoid flash | none |
| 10 | Carrier index cards (`cc-navcard`) | 🔶 to-port (CSS present, no data) | stack 1-up; hover lift decorative only | none |
| 11 | Methodology cards (`cc-method`) | 🔶 to-port (CSS present) | stack 1-up | none |
| 12 | **Source drawer** | 🔶 **TO-PORT** | `<details>` accordion, full-width | would regress (no provenance) — §3.2 |
| 13 | **Cash-vs-premium value frame** (`valueFrame()`) | 🔶 **TO-PORT** (fuse w/ Smart Match) | inline line in top verdict card | would regress vs live page — §3.3 |
| 14 | Sticky sub-nav (`cc-subnav`) | ✅ ported (scroll-spy IO) | horiz-scroll strip, fade mask + `aria-current` to add | low |
| 15 | Glossary tooltip, 3-layer (`cc-gloss`) | ✅ ported (hover+focus+tap+Esc) | **superset of ZIP** | none |

**Net:** 9 present, 6 to-port. Three to-port items (6, 12, 13) would be a *regression vs the ZIP/live page* if shipped without them — they are the priority build queue below.

---

## 3. TO-PORT BUILD SPECS (the three that would regress)

### 3.1 ZIP-quote input → `cc-zip`
**Why:** the ZIP package gates every visitor with a location-specific availability check; dropping it loses the geo-honest "no national price" framing and the `network_search_start` → `verification_start` handoff.
**Markup (server-rendered, in hero):**
```html
<form class="cc-zip" id="cc-zip" autocomplete="off">
  <label class="cc-sr-only" for="cc-zip-in">ZIP code</label>
  <input id="cc-zip-in" inputmode="numeric" pattern="[0-9]{5}" maxlength="5"
         placeholder="Enter your ZIP code" aria-describedby="cc-zip-note"/>
  <button class="cc-btn cc-btn--green" type="submit" data-ev="network_search_start">Check availability</button>
</form>
<p class="cc-zip-note" id="cc-zip-note">Availability and pricing vary by state, ZIP and effective date. No national price shown as if it applied everywhere.</p>
<div class="cc-zip-out" id="cc-zip-out" role="status" aria-live="polite"></div>
```
**JS (add to `ppo-hub.js`, `initZip()`):** validate `^[0-9]{5}$`; invalid → error text in `cc-zip-out` (text+`aria-invalid`, not red border alone); valid → `dataLayer.push({event:'network_search_start',zip})`, then render "Availability for **{zip}** confirmed during a free eligibility check. <a … data-ev=verification_start>Continue →</a>". Never store the ZIP server-side.
**CSS:** `.cc-zip{display:flex;gap:9px;max-width:440px}` → `flex-direction:column` under 560px so input + button stack full-width; input `min-height:48px`. Output uses `--mint-soft`/`--cov-full`; error uses `--alert-bg`/`--gold-text`. **Mobile:** stacked, 48px targets, never beside the subnav.

### 3.2 Source drawer → `cc-drawer`
**Why:** "clean specs up top, full provenance one expand away" is the whole trust trick (spec 04 §6). Replaces per-cell "Needs verification" pills with ONE muted governance line + an auditable drawer.
**Markup:** native `<details class="cc-drawer">` (keyboard/SR free):
```html
<p class="cc-gov">Last verified June 20, 2026 · illustrative · <button class="cc-gloss" …>view sources</button></p>
<details class="cc-drawer">
  <summary>Sources &amp; verification log</summary>
  <!-- per-fact: source URL, title, publisher, doc date, retrieved date, jurisdiction, reviewer, confidence(verified|state-specific|needs-verification) -->
  <!-- update log w/ dates · corrections link -->
</details>
```
**Data:** a `<script id="cc-sources" type="application/json">` block (one canonical source, same pattern as `#cc-plans`/`#cc-glossary`), rendered into the drawer.
**Under-review plans (e.g. MetLife):** single amber `cc-method`-style banner, cells read "Under review", page stays `noindex` — still ONE prominent status element.
**Mobile:** full-width `<details>`; summary is a ≥44px `<button>`-equivalent; no horizontal overflow — provenance rows wrap. Drawer is **not** a sticky element, so it never enters the collision budget.

### 3.3 Cash-vs-premium value frame → fuse into Smart Match
**Why:** the live page's `valueFrame()` is the page's sharpest conversion line ("you keep $X vs paying cash"); the ZIP/ported Smart Match doesn't have it yet.
**Build:** extend `initMatch()` in `ppo-hub.js`. Add to canonical plan JSON: `cash` lookup per need (`CASH_COST`) + the plan's `pct`/`max`/`monthly`. In the top verdict card render:
```
planPays = min(round(cashCost*pct), annualMax);
net = planPays - monthly*12;
net>0 → "Covers <b>$planPays</b> toward a typical {need}. After $premium/yr, you keep <b>$net</b> vs paying cash."
net<=0 → "At $monthly/mo, pays $planPays toward a typical {need}."
```
Wrap in `.cc-vplan .why .frame` (no em-dashes; "vs" not "—"). Render **only on the top fit**, not every card, to keep it calm. **Mobile:** it's inline text inside the already-single-column verdict card — no layout cost, wraps naturally.

---

## 4. REGRESSION FLAGS

- **Tray a11y (Module 3) — flag.** Today `cc-tray` has no `inert`/`aria-hidden` when empty (buttons stay tab-reachable off-screen), no `body` padding when open (can hide the footer/focused control — fails SC 2.4.11), and a sub-44px `×`. These regress vs the ZIP's safe-area + body-padding handling. Fix before ship.
- **Spec-dots (Module 5) — minor.** Color-only today; add SR text/`aria-label` per dot (SC 1.4.1).
- **Subnav (Module 14) — minor.** Add `aria-current` on active link + edge-fade mask + `overscroll-behavior-x:contain` (stop browser back-swipe).
- **Modules 6/12/13 — hard flag.** Shipping the hub without ZIP-quote, source drawer, and value frame is a strict *subset* of the ZIP/live page — violates the superset mandate.

---

## SUMMARY (~150 words)

The rebuilt hub already ports 9 of 15 ZIP modules into `ppo-system.css` + `ppo-hub.js`, and is a genuine superset on two: the matrix gained a Year-1/Later toggle the ZIP lacked, and the glossary is now 3-layer (hover+focus+tap+Esc) versus the ZIP's hover-only tooltip. The mobile contract is sound in principle — one top sticky subnav (in-flow, no jump) plus at most one bottom element, tray beats CTA bar, drawer is exclusive — but three enforcement pieces are missing in JS. Six modules remain to-port; three of them (ZIP-quote `cc-zip`, source drawer `cc-drawer`, cash-vs-premium value frame) would make the hub a *subset* of the ZIP/live page if dropped, so they are the priority queue with build specs above. T5 Jade palette is already the single scheme in `ppo-system.css`. Mobile matrix uses one pinned label column with horizontal scroll — never `display:none`.

**Top 3 recommendations:**
1. **Finish the tray collision contract in `ppo-hub.js`:** add `--cc-tray-h` + `body{padding-bottom}` when open, `inert`/`aria-hidden` when empty, 44px `×`, and the `apply()` tray-beats-CTA logic with the to-add CTA bar.
2. **Port the three regression modules** (`cc-zip`, `cc-drawer`, value-frame fused into `initMatch`) per §3 — these close the subset gap.
3. **Patch the matrix scroll region** (`role="region" tabindex="0" aria-label` + edge-fade + scroll hint) and add `aria-current`/fade to the subnav so lateral nav stays keyboard-reachable and never `display:none`.
