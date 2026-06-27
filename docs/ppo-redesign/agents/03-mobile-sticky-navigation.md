# Agent 03 — Mobile UX & Sticky-Navigation Specialist

**Workstream:** Responsive behavior + the ONE reusable sticky sub-navigation system for the whole PPO ecosystem, plus the mobile comparison pattern.
**Mandate:** Mobile-first. One primary sticky subnav (below the global mega-nav) + at most one contextual compare tray. They must coexist gracefully and never stack to eat the viewport. Horizontal scroll for plan comparison. Touch targets >=44px. No hover-only interactions. Active-section state. `scroll-margin` offsets for fixed headers. Reduced-motion support. No content jump when elements become sticky.
**Date:** 2026-06-21

---

## 0. What the repo already does (evidence)

I inspected the live page, both redesign-package pages, and the mega-nav CSS. The good primitives already exist; they are just not unified into one component.

**Global mega-nav (`assets/css/mega-nav.css`, `mega-nav-mobile.css`)**
- Nav styles are inline in `components/mega-nav.html`; the CSS files are near-empty/legacy.
- The mega-nav is **NOT `position:fixed` and NOT `position:sticky`** — it scrolls away with the page. (`grep` for `position:fixed`/`position:sticky` in both CSS files returns nothing relevant.)
- It collapses to a hamburger drawer at **`max-width:1080px`** (`.cc-links,.cc-actions{display:none}.cc-burger{display:inline-flex}`). The drawer is a fixed off-canvas panel at `z-index:10020`, `100dvh`, `transform:translateX(105%)` → `0`, with `body.cc-locked{overflow:hidden}`. It already respects `prefers-reduced-motion`.
- **Implication:** the PPO subnav does NOT need to permanently offset against a tall fixed global header. The global nav is part of normal flow. The only fixed/sticky thing at the top is the thin promo `.alert` banner (`position:sticky;top:0;z-index:200`, ~37px).

**Live `compare-ppo-dental-plans.html`**
- Has a sticky compact TOC: `.toc{position:sticky;top:0;z-index:60;backdrop-filter:blur(8px)}` with `--toch:52px`, a 2px scroll-progress bar (`.toc-prog`), horizontally scrollable links (`.toc-links{overflow-x:auto;scrollbar-width:none}`), and an active state (`.toc-links a.on{color:var(--ink);border-color:var(--green)}`).
- Comparison table header re-sticks under it: `.cmp-h{position:sticky;top:var(--toch)}`.

**Redesign package `_redesign-package/compare-ppo-dental-plans.html`**
- Sticky `.alert{position:sticky;top:0;z-index:200}` (made `static` under 640px).
- Comparison table: sticky `thead th{top:60px;z-index:5}` + **sticky first two columns** (`left:0` and `left:52px`) so the label + plan name stay pinned while specs scroll horizontally. Crucially: under `max-width:640px` the 2nd sticky column is released (`position:static`) to reclaim width.
- **Compare tray:** `.tray{position:fixed;bottom:0;z-index:150;transform:translateY(110%)→0}` with `padding-bottom:env(safe-area-inset-bottom)`, internal `overflow-x:auto;-webkit-overflow-scrolling:touch` grid, mobile grid `120px repeat(4,minmax(130px,1fr))`.
- **Sticky CTA bar:** `.sticky{position:fixed;bottom:0;z-index:140}` (one z-index BELOW the tray).
- **Collision logic already present:** `apply(){var trayOpen=tray.classList.contains('show');bar.classList.toggle('show',past&&!near&&!trayOpen)}` — the bottom CTA bar hides when the tray is open. IntersectionObserver drives `past` (hero scrolled out) and `near` (footer approaching).
- `@media(prefers-reduced-motion:reduce){*{transition-duration:.001ms!important;scroll-behavior:auto!important}}`.

**Redesign package `_redesign-package/guardian-premier-2-0.html`** (plan page)
- `.block{scroll-margin-top:118px}` (relaxed to `70px` under 920px) — exactly the right pattern, just an inconsistent value vs. the hub.
- Right-rail sticky on desktop: `.rail{position:sticky;top:84px}`.
- Same `.sticky` bottom CTA bar, revealed after the spec-sheet price line scrolls out.

**Verdict on current state:** the parts are 80% there but live across three files with **conflicting offset constants** (`52`, `60`, `70`, `84`, `118`) and **two different subnav styles** (live `.toc` vs. package's lack of a hub subnav). Nothing is tokenized. That is the gap this memo closes.

---

## 1. STICKY SUBNAV — component anatomy

One component, `cc-subnav`, server-rendered, reused on every PPO page type. It carries only anchor links to on-page sections. It NEVER duplicates or modifies the global mega-nav.

### 1.1 Tokens (single source of truth — kill the magic numbers)

```css
:root{
  --cc-alert-h: 37px;      /* sticky promo banner height; 0 if absent */
  --cc-subnav-h: 52px;     /* full-height subnav (desktop + mobile) */
  --cc-subnav-h-cond: 44px;/* condensed-after-scroll height */
  --cc-subnav-top: var(--cc-alert-h);     /* where subnav pins */
  --cc-anchor-offset: calc(var(--cc-alert-h) + var(--cc-subnav-h) + 12px); /* ~101px */
  --cc-tray-h: 0px;        /* JS sets live tray height when open */
}
```

Every in-page anchor target uses **one rule**, no per-page values:

```css
[data-cc-section]{ scroll-margin-top: var(--cc-anchor-offset); }
```

This replaces the scattered `scroll-margin-top:118px/70px` and the `top:52px/60px` table offsets. The table header sticks at `top: calc(var(--cc-subnav-top) + var(--cc-subnav-h))`.

### 1.2 Structure & dimensions

- **Height:** `--cc-subnav-h: 52px` (matches live `--toch`). Condensed state `44px`.
- **Offset below mega-nav:** the mega-nav is in normal flow, so the subnav pins at `top: var(--cc-alert-h)` (just under the sticky promo banner). If the banner is dismissed/absent, `--cc-alert-h:0` and the subnav pins at `top:0`. **It does not need to clear a fixed global header**, because there isn't one.
- **Container:** `position:sticky; top:var(--cc-subnav-top); z-index:60;` (below the `z-200` alert, well below tray `z-150`/CTA `z-140` which are bottom-anchored anyway).
- **Background:** `--cream`/`--surface` at ~93% with `backdrop-filter:saturate(180%) blur(8px)` (already in live `.toc`). Bottom 1px `--line`. No shadow until condensed.
- **No content jump:** because it is `position:sticky` (not `fixed`), it occupies its own height in flow — the page does not jump when it pins. **Do NOT convert it to `position:fixed`.** The one transition allowed is the condensed height change (see 1.4), which must animate `height`/`padding` only and be wrapped in the reduced-motion guard.

### 1.3 Items, overflow, scroll

```
[ progress 2px ........................................ ]
[ Match  Compare  All plans  By treatment  By carrier  PPO terms  Find a dentist  ›overflow ]   [ CTA ]
```

- Links wrapper: `display:flex; gap:24px; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; scroll-snap-type:x proximity;` each link `scroll-snap-align:start; white-space:nowrap; padding:14px 2px;` (44px tall hit area).
- **Overflow handling (desktop):** if >8 items or width overflows, render a trailing **"More ▾"** disclosure button (a real `<button aria-haspopup="true">`) that opens a small menu containing the overflowed links. Never a hover-only flyout.
- **Overflow handling (mobile):** horizontal scroll is the primary affordance. Add a subtle right-edge fade mask (`mask-image:linear-gradient`) so users see there's more, plus a 1px progress bar. No "More" button on mobile — scroll is expected and cheap.
- **Active item is always scrolled into view** within the strip via `el.scrollIntoView({inline:'center', block:'nearest', behavior:reduced?'auto':'smooth'})`.

### 1.4 Condensed-after-scroll state (optional, recommended)

- After the page scrolls past the hero (`scrollY > heroBottom`), add `.is-condensed`: height `52→44px`, drop the eyebrow/label, show a thin `--sh-1` shadow, optionally reveal an inline mini-CTA ("Compare").
- Drive it with a single IntersectionObserver on a hero sentinel — **not** a scroll listener that thrashes. Hysteresis: toggle off only after scrolling back above a point ~80px higher than the on-threshold to avoid flicker at the boundary.

### 1.5 Active-section logic

- Use **one IntersectionObserver** over all `[data-cc-section]` with `rootMargin:"-45% 0px -50% 0px"` so a section is "active" when its top crosses the upper-middle band. Set `aria-current="true"` + `.on` on the matching link; remove from others.
- On click: `preventDefault`, push the hash (`history.pushState`), then `scrollIntoView` — `scroll-margin-top` handles the offset. Honor deep links on load (read `location.hash`, scroll after layout settles in `requestAnimationFrame`).
- Fallback (no IO): throttled `scroll` handler comparing `getBoundingClientRect().top` against `--cc-anchor-offset`.

### 1.6 Keyboard / focus

- Links are real `<a href="#section">` — natively tabbable, work with JS off (server-rendered anchors).
- Visible focus ring on every item: `:focus-visible{outline:2px solid var(--green); outline-offset:2px; border-radius:6px}`. Never remove outline without a replacement.
- Arrow-key roving is optional; if added, `role="tablist"`-style left/right arrow movement, but **keep Tab working normally** (do not trap). The "More" menu: Escape closes and returns focus to its button.
- The subnav must not steal focus on scroll; `aria-current` is the only state announced.

### 1.7 Reduced-motion

- All transitions (condense, smooth-scroll, active-scroll-into-view, tray slide) gate on `@media(prefers-reduced-motion:reduce)` → `transition-duration:.001ms; scroll-behavior:auto;` (the package's global guard already does this — keep it and add `scroll-behavior` on `html`).

### 1.8 Analytics

Fire `subnav_click` `{page_type, label, section_id, position_index, condensed:boolean, viewport:'mobile|desktop'}`; `subnav_overflow_opened`; `subnav_condensed_shown`. Feeds the master event taxonomy.

---

## 2. FINAL label sets per page type (<=8, justified)

Picked from the master-prompt candidate lists. Priority = information scent first, then width. Order is fixed left→right.

### Hub (`compare-ppo-dental-plans` master hub) — 7 items
**Match · Compare · All plans · By treatment · By carrier · PPO terms · Find a dentist**
- Dropped **By timing** → fold into "By treatment/All plans" filters; timing is a secondary intent and "By timing" reads ambiguously in a 13px strip. Dropped **Methodology** from the strip → it lives in the footer/trust line, not a scan target. "PPO terms" beats "Glossary" for scent (it's about *these* terms). 7 items fits a 390px viewport with horizontal scroll comfortably; no "More" needed.

### Individual plan page — 7 items
**Overview · Coverage · Costs · Waiting periods · Fine print · Alternatives · Dentists**
- Dropped **Treatments** (merge into Coverage rows) and **Sources** (anchor the source drawer from "Fine print" + footer log). These seven match the plan-page section order in the master prompt. Aligns with guardian page's `.block` sections.

### Carrier hub — 7 items
**Overview · Plans · Compare · Network · Treatments · Dentists · FAQs**
- Dropped **Sources** to the footer/update-log. "Network" is the carrier-page's unique scent (exact network names) so it stays.

### Treatment page — 6 items
**Overview · What's covered · Best-fit plans · Waiting periods · Cost example · Find a dentist**
- "What insurance may cover" shortened to **What's covered** for width. Dropped **Questions to ask** → keep as an on-page block but not a subnav target; six items keeps the strip calm and matches the treatment journey.

### Glossary page — 6 items
**A–Z · Cost terms · Coverage terms · Network terms · Timing terms · Compare plans**
- Dropped **Claims terms** as its own tab → fold EOB/predetermination into "Coverage terms"; keeping six maintains scent. "Compare plans" is the conversion exit back to the hub.

**Rule:** if any page legitimately needs an 8th, that's the ceiling — never 9+. Beyond 8, the trailing "More ▾" disclosure absorbs the rest (desktop) / pure scroll (mobile).

---

## 3. COMPARE TRAY on mobile + horizontal-scroll comparison, and how it coexists with the subnav

### 3.1 The two comparison surfaces

1. **Full comparison table** (server-rendered, in-page section). On mobile it is a single horizontally scrollable region: pin the **first column only** (the spec-label column, `position:sticky;left:0`) and **release the 2nd sticky column under 640px** (already the package's behavior). Plan columns scroll horizontally under the pinned labels. Add edge-fade mask + a one-time "Scroll to compare →" hint chip. `-webkit-overflow-scrolling:touch`. Each cell >=44px tall.
2. **Compare tray** (fixed bottom): the persistent "you've selected N plans" surface for cross-section comparison. Max **4 plans** (master-prompt rule). Internally a horizontally scrollable grid `grid-template-columns:120px repeat(4,minmax(130px,1fr))` (already present), pinned label column, `overflow-x:auto`. Each plan column is a card with remove (`×`, 44px target) and "View plan".

### 3.2 Collision rules (the heart of the mandate)

There are three bottom/top-anchored stickies in play: the **top subnav** (sticky, in-flow), the **compare tray** (`z-150`, bottom), the **CTA bar** (`z-140`, bottom). They must never all show at once.

**Vertical budget rule — at most ONE bottom-anchored element visible at a time, plus the top subnav.**

| State | Top subnav | Compare tray | Bottom CTA bar |
|---|---|---|---|
| 0 plans selected, in hero | shown | hidden | hidden |
| 0 plans, scrolled past hero | shown (condensed) | hidden | **shown** |
| 1–4 plans selected | shown (condensed) | **shown** | **hidden** (suppressed) |
| Tray open + footer near | shown | hidden | hidden |
| Mega-nav drawer open (mobile) | hidden (drawer covers) | hidden | hidden |

- **Tray beats CTA bar.** Reuse the existing `apply()` collision logic verbatim: `bar.show = past && !near && !trayOpen`. The tray and the CTA bar are mutually exclusive; the tray wins because it represents active user intent.
- **Subnav + tray coexist** because one is top-sticky and one is bottom-fixed — they never overlap vertically. To prevent the tray from covering page content / the footer, when the tray is shown, JS sets `--cc-tray-h` to the tray's measured height and applies `body{padding-bottom:var(--cc-tray-h)}` so nothing is permanently hidden behind it (and the last in-page section can still be scrolled clear of it). Reset to `0` on close.
- **Drawer (hamburger) is exclusive:** when `body.cc-locked` is set by the mega-nav drawer, hide both the tray and CTA bar (`body.cc-locked .tray,body.cc-locked .sticky{display:none}`) so the off-canvas menu owns the viewport.
- **Never** introduce a third simultaneous bottom bar (e.g., a separate "save comparison" sticky). Save/email live *inside* the tray header.
- The **subnav never converts to fixed** to "make room" — keeping it sticky-in-flow guarantees no content jump and no double-counting of header height against the tray.

### 3.3 Tray UX specifics on mobile

- Reveal: slide up `translateY(110%)→0`, `.26s` (gated by reduced-motion). A 4px grab handle hints it's a sheet.
- Collapsible: a header chevron collapses the tray to a single 56px summary bar ("3 plans selected — Compare ›") so it doesn't eat half a small screen while still being reachable. Expanded only when the user taps Compare.
- Plan switching: tapping a plan checkbox anywhere (cards or table) syncs the tray (`syncCheckboxes()` already exists). Selection persists in `localStorage` (already `savePicked/loadPicked`).
- Horizontal scroll inside the tray is the comparison mechanism on mobile — do not try to reflow 4 plans into a vertical stack; keep the column model and let users swipe.

---

## 4. Touch-target + scroll-margin specifics

- **Touch targets >=44×44px** (WCAG 2.5.5 / iOS HIG): subnav links (`padding:14px 0` → 52px row), tray `×` remove, checkboxes, CTA buttons, "More ▾", accordion summaries. Spacing >=8px between adjacent targets to avoid mis-taps. The tray remove `×` currently is a tiny glyph — wrap it in a 44px hit area (`padding`/`::before` expansion) without growing the visible icon.
- **No hover-only interactions:** glossary tooltips and the "More" menu must open on **tap/click/focus**, not hover. (Master prompt + Agent 04 align.) Any `:hover` styling is decoration only; every hover affordance has a tap/focus equivalent.
- **scroll-margin offsets:** single token `--cc-anchor-offset` (~101px) on all `[data-cc-section]`. Also set `html{scroll-padding-top:var(--cc-anchor-offset)}` as a belt-and-suspenders for native hash jumps and focus scrolling. Under the 920px breakpoint the subnav stays 52px, so the offset constant does **not** need to change (this fixes the current 118→70 inconsistency by making it irrelevant).
- **Safe areas:** every bottom-fixed element keeps `padding-bottom:calc(... + env(safe-area-inset-bottom))` (already present) so the iOS home indicator never overlaps the primary CTA.
- **Dynamic viewport:** prefer `100dvh` over `100vh` for full-height drawers (mega-nav drawer already uses `100dvh`).
- **Hit-slop for scrollable strip:** give the subnav `overscroll-behavior-x:contain` so horizontal scrolling the strip doesn't trigger browser back-swipe.

---

## 5. DO / DON'T

**DO**
- Use ONE `cc-subnav` component, server-rendered `<a href="#...">`, on every PPO page type.
- Tokenize all offsets (`--cc-subnav-h`, `--cc-anchor-offset`) — one constant, every page.
- Keep the subnav `position:sticky` (in-flow) so there is zero content jump.
- Drive active-state + condense with IntersectionObservers, not scroll listeners.
- Enforce the bottom-budget rule: subnav (top) + at most one of {tray, CTA bar}.
- Set `body{padding-bottom:var(--cc-tray-h)}` while the tray is open.
- Make every target >=44px; tap/focus parity for all hover affordances.
- Pin only the label column of the comparison table on mobile; release the 2nd sticky column <640px.
- Gate every animation behind `prefers-reduced-motion`.

**DON'T**
- Don't stack two bottom bars (tray + CTA + "save") at once.
- Don't make the subnav `position:fixed` (causes jump + double header math).
- Don't offset anchors against a fixed mega-nav — the global nav scrolls away; only the thin alert + subnav are sticky.
- Don't use per-page `scroll-margin-top` magic numbers (kill 118/70/60/52).
- Don't put >8 visible subnav items; use "More ▾" (desktop) / scroll (mobile).
- Don't rely on hover for tooltips, the "More" menu, or active reveal.
- Don't try to reflow the 4-plan tray into a vertical stack on mobile — keep horizontal scroll.
- Don't let the tray permanently hide the footer or last section.
- Don't modify or duplicate the global mega-nav / drawer.

---

## 6. Score + top 3 fixes

### Current mobile/sticky state: **5 / 10**

**Why not lower:** the right primitives already exist and several are best-practice — sticky in-flow TOC with backdrop blur and active state, fixed compare tray with `env(safe-area-inset-bottom)` and horizontal-scroll grid, sticky table head + pinned first/second columns with a correct <640px release, a working tray-vs-CTA collision via `apply()`, IntersectionObserver reveal, and a global reduced-motion guard. That's a solid 5.

**Why not higher:** it is fragmented across three files with **conflicting offset constants** (`52/60/70/84/118`) and **no shared subnav component** — the live page has a `.toc`, the package hub has none. There is no condensed state, no overflow ("More") handling, no `body` padding compensation for the open tray, the tray `×` target is sub-44px, the hamburger-drawer-vs-bottom-bar exclusivity isn't enforced, and `aria-current`/full keyboard semantics on the subnav are absent.

### Top 3 fixes (in order)

1. **Ship the unified `cc-subnav` + token system.** One server-rendered component with the per-page label sets in §2, tokenized offsets (`--cc-anchor-offset` applied via a single `[data-cc-section]` rule), `position:sticky` at `top:var(--cc-alert-h)`, IO-driven `aria-current` active state, and `:focus-visible`. This alone removes the 52/60/70/84/118 inconsistency and gives every page type the same navigation.
2. **Codify the bottom-budget collision contract.** Formalize the state table in §3.2: tray (`z-150`) beats CTA bar (`z-140`) via the existing `apply()`; set `body{padding-bottom:var(--cc-tray-h)}` while the tray is open; hide both bottom elements when `body.cc-locked` (drawer) is active; add the collapsible 56px tray summary so it never eats half a small screen.
3. **Fix touch + overflow gaps.** Expand the tray `×` and all controls to >=44px hit areas with >=8px spacing; add the "More ▾" disclosure (desktop) and edge-fade + scroll hint (mobile) for the subnav and the comparison table; ensure tap/focus parity for tooltips and menus; add the optional condensed-after-scroll state with hysteresis.

---

## Acceptance criteria (for `06-STICKY-SUBNAV-SYSTEM.md`)

- [ ] Single `cc-subnav` component renders on hub, plan, carrier, treatment, glossary pages with the §2 label sets, all server-rendered anchors.
- [ ] No content jump when the subnav pins (verified: `position:sticky`, in-flow).
- [ ] One `--cc-anchor-offset` token governs every `[data-cc-section]`; no per-page scroll-margin numbers remain.
- [ ] At any scroll position/viewport, at most ONE bottom-anchored element is visible alongside the top subnav.
- [ ] Tray open → CTA bar hidden; drawer open → both hidden; `body` padded by live tray height.
- [ ] All interactive targets >=44px; tooltips/menus open on tap+focus (no hover dependency).
- [ ] Comparison table & tray scroll horizontally on mobile with one pinned label column; 2nd sticky col released <640px.
- [ ] `aria-current` on active link; `:focus-visible` ring on all items; deep-link hash works on load with JS off.
- [ ] All motion gated by `prefers-reduced-motion`; `scroll-behavior` and `scroll-padding-top` set on `html`.
- [ ] `subnav_click`, `subnav_overflow_opened`, `subnav_condensed_shown` analytics fire.

**Cross-refs:** Agent 02 (comparison UX / 4-plan tray), Agent 04 (WCAG 2.2 AA, keyboard, reduced motion), Agent 01 (tokens), Agent 12 (IA / anchor sections).
