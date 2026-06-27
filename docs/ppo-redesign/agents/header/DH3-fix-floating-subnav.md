# DH3 — Fix the floating mid-page sub-nav (Compare PPO main hub)

File: `compare-ppo-dental-plans.html`

## Summary

A dark resource sub-nav ("DENTAL INSURANCE · Overview · Compare plans · Glossary · No
waiting period · Between jobs · Self-employed · Need coverage now · Find a dentist →")
plus a "GOLD / JADE" toggle renders **mid-page**, dropped into normal document flow
between the Learn (related-guides) section and the FAQ. It looks like a "random menu in
the middle of the page" because it is just a static `<nav class="di-hub">` block sitting
at line 1085 — it has no `position` rule, so it never pins; it simply scrolls inline
wherever it happens to sit in the markup. The GOLD/JADE pill inside it is a leftover dev
theme switch that should not ship.

Fix: keep ONE crawlable `<nav class="di-hub">` of `<a href>` resource links, move it into
document order **immediately after the header mount** (`#cc-nav-mount`) and before the
existing `.toc`, make it `position:sticky` pinned beneath the fixed header (offset for the
72px header), give in-page targets `scroll-margin-top`, mark the current page with
`aria-current="page"`, allow horizontal scroll on mobile, and delete the GOLD/JADE toggle
(the page ships a single jade scheme).

---

## 1. Root cause — exact elements + line numbers

### A. The misplaced markup (mid-flow)
`compare-ppo-dental-plans.html` lines **1082–1110**:

```html
<hr class="hr">                                  <!-- 1082 -->

<!-- DENTAL INSURANCE HUB -->
<nav class="di-hub" aria-label="Dental insurance resource hub">   <!-- 1085 -->
  <div class="wrap">
    <div class="di-hub-inner">
      <span class="di-hub-label"><span class="sp">&#10038;</span> Dental Insurance</span>
      <ul class="di-hub-links" role="list">
        <li><a href="/dental-insurance/">Overview</a></li>
        <li><a href="/compare-ppo-dental-plans/" aria-current="page">Compare plans</a></li>
        ... Glossary / No waiting period / Between jobs / Self-employed / Need coverage now ...
        <li><a href="/find-my-dentist" class="di-hub-dentist">Find a dentist &rarr;</a></li>
      </ul>
      <div class="ts-wrap">                       <!-- 1099 — DEV TOGGLE, REMOVE -->
        <div class="theme-switch" id="cc-ts" data-active="gold" ...>
          <span class="ts-thumb"></span>
          <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
          <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
        </div>
      </div>
    </div>
  </div>
</nav>                                            <!-- 1108 -->

<hr class="hr">                                        <!-- 1110 -->
```

This block is wedged between `<section id="learn">` (ends line 1080) and
`<section id="faq">` (starts line 1113). That is why it appears mid-content.

### B. The CSS at fault
Lines **643–652**:

```css
.di-hub{padding:18px 0;background:var(--panel);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
```

`.di-hub` has **no `position` declaration** — it defaults to `position:static`. So:
- it can never pin to the top; it renders exactly where it sits in the DOM (mid-page),
- `var(--panel)` is the dark band, so it reads as an out-of-place dark strip in a
  cream/jade page.

Contrast: the page's real sticky bars DO declare position —
`.toc{position:sticky;top:0}` (line 113) and `.cmp-h{position:sticky;top:var(--toch)}`
(line 203). `.di-hub` was simply never given that treatment, and was also placed at the
wrong point in the document.

### C. Duplicate toggle + duplicate id
The GOLD/JADE `theme-switch` exists **twice** with the same `id="cc-ts"`:
- line **854** (inside `.toc`)
- line **1100** (inside `.di-hub`)

Duplicate `id` is invalid HTML; the theme JS (`applyTheme`, line ~1862) only ever needs
one switch. The di-hub copy is the dev leftover to delete.

---

## 2. Corrected behavior

- **One** sticky sub-nav, server-rendered as a real `<nav>` with `<a href>` links
  (crawlable — satisfies the H1 sitelinks/SERP requirement; no JS needed to render it).
- It sits **in document order right after the header mount** (`#cc-nav-mount`), before the
  `.toc`. It never appears mid-content.
- It **pins directly beneath the fixed global header**, offset by the header height
  (72px — see `#cc-nav-mount{min-height:72px}` at line 30), via `position:sticky`.
- The GOLD/JADE dev toggle is removed entirely. The page keeps the single jade scheme.

---

## 3. Remove / relocate the GOLD/JADE dev toggle

- **Delete** the di-hub copy: lines **1099–1105** (`<div class="ts-wrap"> … theme-switch …
  </div>`).
- **Delete** the `.toc` copy too: lines **852–860** (the `ts-wrap` / `theme-switch` block).
- Ship a single scheme. Set the document to jade and stop the dev auto-flip:
  - line 2: `<html lang="en" data-theme="gold">` → `<html lang="en" data-theme="jade">`
  - In the theme script (lines ~1862–1888): the `ccTs` click listener and the 900ms
    "Gold → spring-flip to Jade" auto-flip become dead code once the switch is gone.
    Replace the init with a single `applyTheme('jade',false)` and remove the `ccTs`
    references and the timed flip so there is no toggle behavior left to ship.
- Optional cleanup (cosmetic, not required for the fix): the now-unused `.theme-switch`,
  `.ts-*` rules (lines ~790–826) and `[data-theme="gold"]` block (lines ~727–755) can be
  dropped to reduce dead CSS.

---

## 4. Sticky / scroll-margin / active-state / mobile rules

Replace the `.di-hub` rule (line 643) and add the supporting rules:

```css
/* Resource sub-nav — pinned beneath the fixed global header */
.di-hub{
  position:sticky;
  top:72px;                         /* = header height (#cc-nav-mount min-height) */
  z-index:55;                       /* below header, above .toc(60)? see note */
  padding:10px 0;
  background:var(--panel);
  border-bottom:1px solid rgba(255,255,255,.06);
}
.di-hub-inner{display:flex;align-items:center;gap:24px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none}
.di-hub-inner::-webkit-scrollbar{display:none}      /* mobile horizontal scroll, no bar */
.di-hub-links{list-style:none;margin:0;padding:0;display:flex;flex-wrap:nowrap;gap:8px;align-items:center}
.di-hub-links li a{white-space:nowrap; /* …existing pill styles… */}

/* Active state — current page pill */
.di-hub-links li a[aria-current="page"]{
  background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.28);
}

/* In-page anchor targets clear both the header AND this sub-nav when jumped to */
:root{--subnavh:44px}
section[id]{scroll-margin-top:calc(72px + var(--subnavh) + 8px)}
```

Notes:
- **z-index / top stacking:** the header (`#cc-nav-mount`) is fixed at the top. `.di-hub`
  pins at `top:72px` so it never overlaps the header. The existing `.toc`
  (`position:sticky;top:0;z-index:60`) is the page's own in-page TOC; if both should pin,
  set `.di-hub` to `top:72px` and `.toc` to `top:calc(72px + var(--subnavh))` so they
  stack header → di-hub → toc. If only one sticky band is wanted under the header, keep
  `.di-hub` sticky and leave `.toc` as the secondary scrolling TOC.
- **Mobile:** `flex-wrap:nowrap` + `overflow-x:auto` on `.di-hub-inner` gives a single
  horizontally scrollable row instead of wrapping into a tall block; scrollbar hidden.
  The existing `@media(max-width:660px)` rule (line 652) shrinking pill padding stays.

---

## 5. Before / after markup placement

### BEFORE (broken — static, mid-page, with dev toggle)
```
<body>
  <div id="cc-nav-mount"></div>          <!-- header -->
  <div class="toc"> … TOC … [GOLD/JADE toggle dup #1, lines 852–860] … </div>
  <section id="match"> … </section>
  …
  <section id="learn"> …related guides… </section>
  <hr class="hr">
  <nav class="di-hub"> … resource links … [GOLD/JADE toggle dup #2, lines 1099–1105] </nav>   ← floats mid-page (position:static)
  <hr class="hr">
  <section id="faq"> … </section>
```

### AFTER (fixed — sticky under header, in correct order, no toggle)
```
<body>
  <div id="cc-nav-mount"></div>          <!-- fixed global header, 72px -->

  <!-- DENTAL INSURANCE SUB-NAV — sticky beneath header -->
  <nav class="di-hub" aria-label="Dental insurance resource hub">
    <div class="wrap">
      <div class="di-hub-inner">
        <span class="di-hub-label"><span class="sp">&#10038;</span> Dental Insurance</span>
        <ul class="di-hub-links" role="list">
          <li><a href="/dental-insurance/">Overview</a></li>
          <li><a href="/compare-ppo-dental-plans/" aria-current="page">Compare plans</a></li>
          <li><a href="/dental-insurance-glossary/">Glossary</a></li>
          <li><a href="/dental-insurance-no-waiting-period/">No waiting period</a></li>
          <li><a href="/dental-insurance-between-jobs/">Between jobs</a></li>
          <li><a href="/dental-insurance-for-self-employed/">Self-employed</a></li>
          <li><a href="/dental-insurance-immediate-coverage/">Need coverage now</a></li>
          <li><a href="/find-my-dentist" class="di-hub-dentist">Find a dentist &rarr;</a></li>
        </ul>
        <!-- GOLD/JADE toggle DELETED -->
      </div>
    </div>
  </nav>

  <div class="toc"> … in-page TOC, no toggle … </div>
  <section id="match"> … </section>
  …
  <section id="learn"> …related guides… </section>
  <hr class="hr">
  <section id="faq"> … </section>      <!-- learn now flows straight into FAQ -->
```

Net: the `<nav class="di-hub">` block (with its surrounding `<hr>`s) is **cut from lines
1082–1110** and **re-inserted immediately after `#cc-nav-mount`**; the two `theme-switch`
blocks are deleted; `.di-hub` gains `position:sticky;top:72px`; `data-theme` is set to
`jade`. It remains a real crawlable `<nav>` of `<a href>` links.
