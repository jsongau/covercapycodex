# DH5 — MOBILE header + sub-menu / dropdown UX (Compare PPO main hub)

File: `compare-ppo-dental-plans.html` (header mount + `.di-hub` + `.toc` + their responsive CSS)
Companion docs: DH3 (sticky sub-nav fix), Agent 03 (mobile sticky-nav system), hub/H9 (mobile modules), delta/U4 (mobile sticky)
Theme: T5 **jade** only (`--green:#0FB5A6`, `--green-d:#0C8C81`, `--panel:#12161B`, `--paper:#FFFFFF`, `--ink:#161A1F`). No gold toggle ships.

---

## Summary (~150 words)

On mobile the page currently has **no lateral nav at all**: the global links collapse into the mega-nav hamburger drawer (at `max-width:1080px`, `cc-burger` shows, `cc-links` `display:none`), and the two resource bands — `.di-hub` (dental-insurance hub links) and `.toc` (in-page anchors) — were never given a real mobile pattern. `.di-hub` is `flex-wrap:wrap` (collapses into a tall dark block) and isn't even sticky; `.toc` already scrolls horizontally but the second sticky band stacking is undefined. This spec defines the mobile system: (1) global nav stays in the existing hamburger **drawer**, now carrying the hub links + dropdown sections as **tap-to-open accordions**; (2) the sticky sub-nav becomes **one horizontal-scroll row with an edge-fade mask and a 2px progress bar**, 44px hit areas, no wrap; (3) "text dropdowns" open as **full-width tap panels/accordions, never hover**; (4) the collision rule allows **one sticky sub-nav (top) + at most one bottom element**. All links stay real `<a href>`.

---

## 1. Breakpoints & the collapse map

| Width | Global mega-nav | `.di-hub` resource sub-nav | `.toc` in-page anchors |
|---|---|---|---|
| > 1080px | full inline links | sticky pill row | sticky anchor row |
| 661–1080px | **hamburger drawer** (`cc-burger`) | sticky horizontal-scroll row | sticky horizontal-scroll row |
| ≤ 660px (mobile) | hamburger drawer | sticky **single** scroll row, edge-fade, 44px taps | merge into ONE band (see §4) |

**Decision:** below 1080px there is exactly **one** drawer (the existing global mega-nav drawer). The hub links + dropdown sections move **into** that drawer as accordions — we do NOT spawn a second drawer. On the page itself, mobile keeps **one** sticky horizontal band, not two stacked dark strips.

---

## 2. Global nav → hamburger drawer (links + dropdowns as accordions)

Reuse the existing drawer primitives verbatim (do not rebuild): off-canvas panel `z-index:10020`, `height:100dvh`, `transform:translateX(105%)→0`, `body.cc-locked{overflow:hidden}`, `prefers-reduced-motion` already respected.

Inside the drawer body, render the hub + its dropdown groups as **disclosure accordions**:

```html
<nav class="cc-drawer" aria-label="Menu">
  <!-- flat top-level links -->
  <a class="cc-d-link" href="/find-my-dentist">Find a dentist</a>
  <a class="cc-d-link" href="/compare-ppo-dental-plans/" aria-current="page">Compare plans</a>

  <!-- a "text dropdown" rendered as a tap accordion -->
  <div class="cc-d-group">
    <button class="cc-d-summary" aria-expanded="false" aria-controls="g-resources">
      Dental insurance
      <svg class="cc-chev" aria-hidden="true">…</svg>
    </button>
    <div id="g-resources" class="cc-d-panel" hidden>
      <a href="/dental-insurance/">Overview</a>
      <a href="/dental-insurance-glossary/">Glossary</a>
      <a href="/dental-insurance-no-waiting-period/">No waiting period</a>
      <a href="/dental-insurance-between-jobs/">Between jobs</a>
      <a href="/dental-insurance-for-self-employed/">Self-employed</a>
      <a href="/dental-insurance-immediate-coverage/">Need coverage now</a>
    </div>
  </div>
</nav>
```

Behavior rules:
- **Toggle on tap, not hover.** The `<button class="cc-d-summary">` flips `aria-expanded` and unsets `[hidden]` on its panel. Multiple panels may open (accordion, not exclusive) — no JS needed beyond a click handler that toggles `aria-expanded` + `hidden`.
- **Every panel link is a real `<a href>`** — crawlable, works with JS off (if JS is disabled, ship panels open: `.cc-d-panel{display:block}` fallback, `[hidden]` only applied by JS).
- **Touch targets ≥44px:** `.cc-d-summary,.cc-d-link,.cc-d-panel a{min-height:44px;display:flex;align-items:center;padding:0 18px}` with ≥8px gap between rows.
- Chevron rotates 180° on open (`transform`, gated by reduced-motion). It is decoration only — the whole row is the tap target.
- `Esc` closes the drawer and returns focus to `cc-burger`. Focus is trapped inside the drawer while open (existing behavior).

---

## 3. The sticky sub-nav → horizontal-scroll single row + edge-fade

This is the `.di-hub` band (per DH3, relocated to sit directly after `#cc-nav-mount`, `position:sticky;top:72px`). On mobile, replace its `flex-wrap:wrap` with a single non-wrapping scroll row:

```css
@media(max-width:660px){
  .di-hub{padding:8px 0;position:sticky;top:72px;z-index:55}
  .di-hub-inner{
    display:flex;flex-wrap:nowrap;gap:8px;align-items:center;
    overflow-x:auto;-webkit-overflow-scrolling:touch;
    scrollbar-width:none;overscroll-behavior-x:contain;
    scroll-snap-type:x proximity;
    /* right + left edge fade so users see there is more */
    -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 22px),transparent 100%);
            mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 22px),transparent 100%);
  }
  .di-hub-inner::-webkit-scrollbar{display:none}
  .di-hub-label{display:none}                 /* drop the eyebrow on mobile to save width */
  .di-hub-links{flex-wrap:nowrap;gap:6px}
  .di-hub-links li a{
    scroll-snap-align:start;white-space:nowrap;
    min-height:44px;display:inline-flex;align-items:center;
    padding:10px 13px;font-size:12.5px;
  }
  .di-hub-links li a[aria-current="page"]{background:rgba(255,255,255,.10);color:#fff}
}
```

- **One row, never wrap.** `flex-wrap:nowrap` + `overflow-x:auto`. The dark `--panel` band is now a thin single strip, not a tall block.
- **Edge-fade mask** on left/right tells users the row scrolls. Pair with a **2px progress bar** (reuse `.toc-prog` pattern, `--green`) under the band to reinforce scrollability.
- **Active item auto-centers:** on load and on section change, `el.scrollIntoView({inline:'center',block:'nearest',behavior:reduced?'auto':'smooth'})`.
- **`overscroll-behavior-x:contain`** so swiping the strip never triggers browser back-swipe.
- No "More ▾" button on mobile — horizontal scroll is the expected, cheap affordance (desktop keeps the disclosure per Agent 03).

---

## 4. Two bands → one on mobile (`.di-hub` + `.toc`)

Stacking two dark sticky strips (resource hub + in-page TOC) under a 72px header eats the viewport. **Mobile rule:**

- **Keep `.di-hub`** (cross-page resource links — the primary lateral nav) as the single sticky band at `top:72px`.
- **Demote `.toc`** (in-page anchors) on mobile: either (a) un-stick it (`position:static`) so it scrolls away after the hero, OR (b) if both are wanted, stack `.di-hub` at `top:72px` and `.toc` at `top:calc(72px + 44px)` — but only when total sticky height ≤ ~140px. Preferred: **(a)** — one sticky band on small screens.
- The in-page anchor offset token covers either case: `section[id]{scroll-margin-top:calc(72px + var(--subnavh) + 8px)}` with `--subnavh:44px`. Set `html{scroll-padding-top:calc(72px + var(--subnavh) + 8px)}` for native hash jumps.

---

## 5. "Text dropdowns" on touch — tap, not hover

Any in-content text dropdown (e.g. a "Dental insurance ▾" link, glossary term, or filter group) on mobile:

- Renders as a `<button aria-expanded aria-haspopup="true" aria-controls="…">` (the visible text + chevron). **Tap toggles** a **full-width panel/accordion below it** — never a hover flyout, never an absolutely-positioned popover that can clip off-screen on a 360px viewport.
- Panel is full container width, opens inline (pushes content down) so it never overflows the edge. Contents are real `<a href>` links.
- Tap-outside or a second tap on the trigger closes it; `Esc` closes and returns focus to the trigger.
- `:hover` styling is decoration only — every hover affordance has an identical tap/focus path. Tooltips/glossary terms open on **tap+focus**, not hover.
- `:focus-visible{outline:2px solid var(--green);outline-offset:2px;border-radius:6px}` on every trigger and link.

---

## 6. Collision rule — one top sticky + at most one bottom element

The viewport budget on mobile:

| State | `.di-hub` (top sticky) | Compare tray (`z-150`, bottom) | Sticky CTA bar (`z-140`, bottom) |
|---|---|---|---|
| Hero in view, 0 plans | shown | hidden | hidden |
| Scrolled past hero, 0 plans | shown | hidden | **shown** |
| 1–4 plans picked | shown | **shown** | **hidden (suppressed)** |
| Drawer open (`body.cc-locked`) | hidden (drawer covers) | hidden | hidden |

- **At most ONE bottom-anchored element** visible at a time, alongside the single top sticky band. Tray beats CTA bar: `bar.show = past && !near && !trayOpen` (reuse existing `apply()`).
- When the drawer is open, `body.cc-locked .di-hub,body.cc-locked .tray,body.cc-locked .sticky{display:none}` so the off-canvas menu owns the viewport.
- The sub-nav stays `position:sticky` (in flow) — never `position:fixed` — so there is **no content jump** when it pins and no double header math.
- Bottom elements keep `padding-bottom:env(safe-area-inset-bottom)`; when the tray is open, set `body{padding-bottom:var(--cc-tray-h)}` so the last section clears it.

---

## 7. Mobile markup/behavior spec (checklist)

- [ ] Below 1080px: ONE drawer (existing global mega-nav). Hub links + dropdown groups injected as `<button aria-expanded>` accordions; panel children are real `<a href>`; JS-off fallback ships panels open.
- [ ] `.di-hub` on mobile: `position:sticky;top:72px;z-index:55`, `flex-wrap:nowrap;overflow-x:auto`, edge-fade mask, 2px `--green` progress bar, label hidden, items `min-height:44px`.
- [ ] Active item auto-centers via `scrollIntoView({inline:'center'})`; `aria-current="page"` on current link; `overscroll-behavior-x:contain`.
- [ ] On ≤660px keep ONE sticky band: `.di-hub` sticky, `.toc` static (or stacked only if total ≤140px).
- [ ] All in-content text dropdowns = tap-to-open full-width inline panels, never hover; `aria-expanded`/`aria-controls`; `Esc` + tap-outside close; focus returns to trigger.
- [ ] Every interactive target ≥44×44px, ≥8px apart; `:focus-visible` ring in `--green`.
- [ ] Collision: top sub-nav + at most one of {tray, CTA bar}; tray beats CTA; drawer open hides all three; no `position:fixed` on the sub-nav.
- [ ] `section[id]{scroll-margin-top:calc(72px + var(--subnavh) + 8px)}`, `--subnavh:44px`, `html{scroll-padding-top:…}`.
- [ ] All motion (chevron, smooth-scroll, drawer slide, edge auto-center) gated by `prefers-reduced-motion`.
- [ ] Links stay real `<a href>` everywhere — crawlable, JS-off functional. Jade scheme only; no gold toggle.

---

## 8. Top 3 recommendations

1. **Make `.di-hub` the single mobile lateral nav.** Today mobile has zero lateral nav (band wraps/doesn't stick). Convert it to a `position:sticky;top:72px` single horizontal-scroll row with edge-fade + progress bar + 44px taps, drop the eyebrow label, and demote `.toc` to static on ≤660px so only one dark band stays pinned. This is the highest-impact fix — it gives mobile users the cross-page nav they currently have none of.

2. **Fold the hub dropdowns into the existing hamburger drawer as tap accordions — don't build a second drawer or hover flyouts.** Reuse the `100dvh` / `cc-locked` / reduced-motion drawer that already exists; add `<button aria-expanded>` disclosure groups whose panels hold real `<a href>` links, with a JS-off open fallback. One menu surface, fully crawlable, no hover dependency.

3. **Enforce the one-top-plus-one-bottom collision contract with `body.cc-locked` exclusivity.** Wire `body.cc-locked .di-hub,.tray,.sticky{display:none}`, keep `bar.show = past && !near && !trayOpen`, set `body{padding-bottom:var(--cc-tray-h)}` when the tray opens, and never convert the sub-nav to `position:fixed`. This guarantees the viewport never gets eaten by stacked bars and the page never jumps when the sub-nav pins.
