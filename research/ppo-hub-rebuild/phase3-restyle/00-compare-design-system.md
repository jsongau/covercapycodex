# CoverCapy Compare Page Design System
## Implementation-Ready Reference for Re-skinning /ppo-plans and /dental-insurance
### Source: compare-ppo-dental-plans.html | Extracted 2026-06-26

This document is the single source of truth. All values are copied verbatim from the source file. When the page and this spec disagree, re-read the source and correct this file.

---

## 1. FONTS

### Google Fonts Link (copy exactly into head)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Variables

```css
--serif: 'Inter Tight', system-ui, sans-serif;
--sans:  'Inter', system-ui, sans-serif;
```

### Type Scale Declarations

```css
/* Applied to all h1/h2/h3/h4 as a group */
h1, h2, h3, h4 {
  font-family: var(--serif);
  font-weight: 700;
  line-height: 1.14;
  margin: 0;
  letter-spacing: -.02em;
}

/* Hero H1 (editorial .match-head) */
h1 { font-size: clamp(32px, 4.4vw, 46px); font-weight: 700; }

/* Section H2s */
h2 { font-size: clamp(23px, 2.8vw, 30px); font-weight: 700; }

/* h3 */
h3 { font-size: 21px; }

/* Body */
body {
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

/* Paragraphs */
p { margin: 0 0 1em; }
```

### Specific Application Rules

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| h1/h2/h3/h4 | `--serif` (Inter Tight) | 700 | see above | letter-spacing -.02em |
| Hero H1 in .match-head | `--serif` | 700 | clamp(32px,4.4vw,46px) | |
| Problem-first hero .hero-copy h1 | `--serif` | 430 | clamp(2.3rem,4.6vw,3.5rem) | line-height 1.02, letter-spacing -.01em |
| Section H2 | `--serif` | 700 | clamp(23px,2.8vw,30px) | |
| h3 | `--serif` | 700 | 21px | |
| Plan card .pcard .pn | `--serif` | default | 21px | |
| Plan card price .pprice b | `--serif` | default | 30px | |
| Eyebrow | `--sans` | 600 | 12px | letter-spacing .18em, uppercase |
| Body / UI | `--sans` | 400 | 16px | |
| Buttons | `--sans` | 600 | 14px (.btn) or 13px (.btn-sm) | |
| TOC nav links | `--sans` | 500 | 13.5px | |
| Breadcrumb | `--sans` | 400 | 12.5px | |
| Brand name (.brand .bt) | `--serif` | 600 | 20px | letter-spacing .02em |
| .disp-it (green italic display) | `--serif` | 700 | inherits | font-style: normal; color: var(--green-d) |
| Fit card .pn | `--serif` | default | 24px | |
| Price italic (.budget-val) | `--serif` | default | 26px | font-style: italic |
| Reviewer name/date | `--serif` via `'Inter Tight',system-ui` | varies | 13px/11px | inline reference not using var() |
| Theme toggle label (.ts-opt) | `700 11.5px/1 'Inter Tight',sans-serif` | 700 | 11.5px | letter-spacing .07em, uppercase |

---

## 2. COLOR TOKENS

### Light-Mode Root (default)

```css
:root {
  --paper:         #F6F8FA;
  --paper-2:       #EAEFF3;
  --card:          #FFFFFF;
  --ink:           #0F1B25;
  --ink-soft:      #33444F;
  --green:         #0A7E7D;
  --green-d:       #0A6E6D;
  --green-l:       #5E707B;
  --sage:          #E2F4F3;
  --sage-2:        #D3EBEA;
  --muted:         #5E707B;
  --line:          #DCE4EA;
  --line-2:        #C9D6DE;
  --gold:          #B26A00;
  --rust:          #C2410C;
  --panel:         #0B3B40;
  --panel-ink:     #EAF6F5;
  --panel-soft:    #9FC4C2;
  --panel-eye:     #6FD0CC;

  /* Coverage triad */
  --covered:       #0F9D6E;
  --covered-tint:  #E4F6EE;
  --covered-ink:   #0A5D43;
  --partial:       #B26A00;
  --partial-tint:  #FBEFD9;
  --partial-ink:   #7A4A00;
  --notcov:        #64748B;
  --notcov-tint:   #EEF1F4;
  --notcov-ink:    #475569;

  /* Typography */
  --serif: 'Inter Tight', system-ui, sans-serif;
  --sans:  'Inter', system-ui, sans-serif;

  /* Effects */
  --shadow: 0 1px 2px rgba(15,27,37,.05), 0 4px 12px -4px rgba(15,27,37,.10);
  --radius: 16px;
  --toch:   52px;   /* touch/toc height */
}
```

### Gold Theme Override

Selector: `[data-theme="gold"]`

This is the WARM EDITORIAL theme. The page boots in gold (set on `<html data-theme="gold">`) then flips to jade 1 second after load.

```css
[data-theme="gold"] {
  --paper:       #FAF6EC;
  --paper-2:     #F1E9D6;
  --card:        #FFFFFF;
  --ink:         #15202E;
  --ink-soft:    #3D4654;
  --green:       #C9A24A;
  --green-d:     #8A6212;
  --green-l:     #B79447;
  --sage:        #F6EEDA;
  --sage-2:      #ECDFC2;
  --muted:       #6B6857;
  --line:        #E8DEC8;
  --line-2:      #DCCFB2;
  --gold:        #8A6212;
  --rust:        #B0542E;
  --panel:       #0A2342;
  --panel-ink:   #F4F8FC;
  --panel-soft:  rgba(244,248,252,.80);
  --panel-eye:   #E0BC72;
  --shadow:      0 1px 2px rgba(10,35,66,.06), 0 4px 14px -4px rgba(10,35,66,.16);
}
/* Additional gold overrides */
[data-theme="gold"] body { background: var(--paper); }
[data-theme="gold"] .btn-green,
[data-theme="gold"] .omni-go,
[data-theme="gold"] .dcard-cta,
[data-theme="gold"] .btn-cta,
[data-theme="gold"] .ft-mob-cta { color: #14110A !important; }
[data-theme="gold"] .goal.sel,
[data-theme="gold"] .tchip.sel { color: #F6F0E6; }
[data-theme="gold"] input[type=range] {
  background: linear-gradient(90deg, #102A43 var(--pct,50%), #E0D8CC var(--pct,50%));
}
[data-theme="gold"] input[type=range]::-webkit-slider-thumb {
  background: #082A30; border-color: var(--card);
}
[data-theme="gold"] .toc-links a:hover,
[data-theme="gold"] .toc-links a.on { color: var(--ink); border-color: var(--green); }
[data-theme="gold"] .omni-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(184,146,79,.15); }
[data-theme="gold"] .band .eyebrow { color: #C8A870; }
[data-theme="gold"] .band .eyebrow::before { background: #9A7440; opacity: .7; }
[data-theme="gold"] .band-perks li::before { border-color: #C8A870; }
[data-theme="gold"] .reward,
[data-theme="gold"] .modal .diamond { background: rgba(184,146,79,.1); color: var(--ink); }
[data-theme="gold"] .reward b,
[data-theme="gold"] .modal .diamond b { color: var(--green-d); }
[data-theme="gold"] .mpanel.right { background: linear-gradient(180deg, #FAF4EA, var(--card)); }
[data-theme="gold"] .tag-vision { background: #EDE5F6; color: #6A5396; }
[data-theme="gold"] .pc { background: linear-gradient(180deg, var(--card), #F4EDD8); }
[data-theme="gold"] .fq.open { border-color: rgba(184,146,79,.5); }
[data-theme="gold"] .fq.open .fq-ind { background: var(--green); border-color: var(--green-d); }
[data-theme="gold"] .toc { background: #FBF6EC; }
[data-theme="gold"] .cc-tip { border-bottom-color: var(--green); }
```

### Jade Theme Override

Selector: `[data-theme="jade"]`

This is the COOL TEAL theme. The page lands here after the 1-second auto-flip.

```css
[data-theme="jade"] {
  --paper:       #FFFFFF;
  --paper-2:     #F5F7F8;
  --card:        #FFFFFF;
  --ink:         #161A1F;
  --ink-soft:    #3A434D;
  --green:       #0FB5A6;
  --green-d:     #0C8C81;
  --green-l:     #3FCFC0;
  --sage:        rgba(15,181,166,.1);
  --sage-2:      rgba(15,181,166,.18);
  --muted:       #5A636E;
  --line:        rgba(18,22,27,.12);
  --line-2:      rgba(18,22,27,.2);
  --gold:        #0C8C81;
  --rust:        #D47452;
  --panel:       #12161B;
  --panel-ink:   #FFFFFF;
  --panel-soft:  rgba(255,255,255,.7);
  --panel-eye:   #0FB5A6;
  --shadow:      0 1px 0 rgba(0,0,0,.04), 0 12px 34px rgba(18,22,27,.1);
}
/* Additional jade overrides */
[data-theme="jade"] body { background: var(--paper); }
[data-theme="jade"] .btn-green { color: #FFFFFF; }
[data-theme="jade"] .goal.sel,
[data-theme="jade"] .tchip.sel { color: #FFFFFF; }
[data-theme="jade"] input[type=range] {
  background: linear-gradient(90deg, #082A30 var(--pct,50%), rgba(18,22,27,.15) var(--pct,50%));
}
[data-theme="jade"] input[type=range]::-webkit-slider-thumb {
  background: #082A30; border-color: var(--card);
}
[data-theme="jade"] .omni-go {
  background: linear-gradient(135deg, var(--green), var(--green-d));
  box-shadow: 0 6px 18px rgba(15,181,166,.28);
}
[data-theme="jade"] .omni-input:focus {
  border-color: var(--green); box-shadow: 0 0 0 3px rgba(15,181,166,.15);
}
[data-theme="jade"] .band .eyebrow { color: #3FCFC0; }
[data-theme="jade"] .band .eyebrow::before { background: #0FB5A6; opacity: .7; }
[data-theme="jade"] .band-perks li::before { border-color: #3FCFC0; }
[data-theme="jade"] .reward,
[data-theme="jade"] .modal .diamond { background: rgba(15,181,166,.1); color: var(--ink); }
[data-theme="jade"] .reward b,
[data-theme="jade"] .modal .diamond b { color: var(--green-d); }
[data-theme="jade"] .mpanel.right { background: linear-gradient(180deg, #F0F9F8, var(--card)); }
[data-theme="jade"] .tag-vision { background: #EDE5F6; color: #6A5396; }
[data-theme="jade"] .pc { background: linear-gradient(180deg, var(--card), #F0F9F8); }
[data-theme="jade"] .fq.open { border-color: rgba(15,181,166,.5); }
[data-theme="jade"] .fq.open .fq-ind { background: var(--green); border-color: var(--green-d); }
[data-theme="jade"] .toc { background: #fff; }
[data-theme="jade"] .cmp-h { border-bottom-color: var(--green); }
[data-theme="jade"] .toc-links a:hover,
[data-theme="jade"] .toc-links a.on { border-color: var(--green); }
[data-theme="jade"] .toc-dd-btn:hover,
[data-theme="jade"] .toc-dd-btn[aria-expanded=true] { background: #E6F7F4; color: #0C8C81; }
[data-theme="jade"] .toc-dd-panel a:hover { background: #E6F7F4; color: #0C8C81; }
[data-theme="jade"] .dd-fly-btn:hover,
[data-theme="jade"] .dd-fly-btn[aria-expanded=true] { background: #E6F7F4; color: #0C8C81; }
[data-theme="jade"] .dd-fly-panel a:hover { background: #E6F7F4; color: #0C8C81; }
[data-theme="jade"] .cc-tip { border-bottom-color: var(--green); }
```

### Maison Dark Theme (bonus)

Selector: `[data-theme="maison"]`

Candlelit dark-luxury. Not shown in the toggle but defined in the file.

```css
[data-theme="maison"] {
  --paper:       #1B1916;
  --paper-2:     #23211B;
  --card:        #222019;
  --ink:         #F1EADB;
  --ink-soft:    #CFC6B2;
  --green:       #CDA64F;
  --green-d:     #B58F3D;
  --green-l:     #9C8A5C;
  --sage:        #2C271C;
  --sage-2:      #39321F;
  --muted:       #9C9484;
  --line:        #37322A;
  --line-2:      #49422F;
  --gold:        #E0BB60;
  --rust:        #D7935E;
  --panel:       #100F0C;
  --panel-ink:   #F1EADB;
  --panel-soft:  #B9B19E;
  --panel-eye:   #D2B05C;
  --shadow:      0 1px 0 rgba(0,0,0,.3), 0 16px 44px rgba(0,0,0,.55);
}
```

---

## 3. GOLD/JADE TOGGLE

### HTML Markup (lives inside .toc .wrap, first child)

```html
<div class="theme-switch" id="cc-ts" data-active="jade"
     role="switch" aria-checked="true" tabindex="0"
     aria-label="Switch color theme, Gold or Jade">
  <span class="ts-thumb"></span>
  <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
  <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
</div>
```

The `data-active` attribute drives state. `aria-checked="true"` means Jade is active.

### CSS (copy-paste block)

```css
/* ===== T5 Gold/Jade toggle pill ===== */
.theme-switch {
  position: relative; display: inline-flex; align-items: center;
  background: #1a1a1a; border: 1.5px solid rgba(255,255,255,.08); border-radius: 999px;
  padding: 4px; cursor: pointer; user-select: none; flex-shrink: 0; height: 38px;
  box-shadow: 0 2px 12px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.06);
  transition: border-color .35s, box-shadow .35s;
}
.theme-switch:hover {
  border-color: rgba(184,146,79,.5);
  box-shadow: 0 2px 12px rgba(0,0,0,.32), 0 0 0 3px rgba(184,146,79,.14), inset 0 1px 0 rgba(255,255,255,.06);
}
.ts-thumb {
  position: absolute; top: 4px; left: 4px;
  width: calc(50% - 4px); height: calc(100% - 8px); border-radius: 999px;
  background: #B8924F;
  box-shadow: 0 3px 10px rgba(184,146,79,.55), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.22);
  transition: transform 1.8s cubic-bezier(.34,1.18,.64,1), background .7s ease;
  will-change: transform;
}
[data-theme="jade"] .ts-thumb {
  background: #0FB5A6;
  box-shadow: 0 3px 10px rgba(15,181,166,.5), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.22);
}
.theme-switch[data-active="jade"] .ts-thumb { transform: translateX(100%); }
.ts-opt {
  position: relative; z-index: 1; display: flex; align-items: center; gap: 5px;
  padding: 0 16px; height: 100%;
  font: 700 11.5px/1 'Inter Tight', sans-serif; letter-spacing: .07em; text-transform: uppercase;
  color: rgba(255,255,255,.35); transition: color .35s; white-space: nowrap;
}
.ts-dot {
  width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
  transition: opacity .35s; opacity: 0;
}
.ts-opt.ts-gold .ts-dot { background: #B8924F; }
.ts-opt.ts-jade .ts-dot { background: #0FB5A6; }
.theme-switch[data-active="gold"] .ts-opt.ts-gold { color: #fff; }
.theme-switch[data-active="gold"] .ts-opt.ts-gold .ts-dot { opacity: 1; }
.theme-switch[data-active="jade"] .ts-opt.ts-jade { color: #fff; }
.theme-switch[data-active="jade"] .ts-opt.ts-jade .ts-dot { opacity: 1; }

@keyframes ts-pulse {
  0%,100% { box-shadow: 0 2px 12px rgba(0,0,0,.32), 0 0 0 0 rgba(184,146,79,0), inset 0 1px 0 rgba(255,255,255,.06); }
  50%      { box-shadow: 0 2px 12px rgba(0,0,0,.32), 0 0 0 6px rgba(184,146,79,.18), inset 0 1px 0 rgba(255,255,255,.06); }
}
.theme-switch.flipping { animation: ts-pulse 1.8s ease-in-out; }
```

### JS (copy-paste block, verbatim)

```javascript
/* Theme variables */
var ccHtml = document.documentElement;
var ccTs   = document.getElementById('cc-ts');

function applyTheme(t, slow) {
  var dur = slow ? '1.4s' : '0.45s';
  var styleTag = document.getElementById('cc-theme-transition');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'cc-theme-transition';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = 'html,html *{transition:background ' + dur + ' ease,color ' + dur + ' ease,border-color ' + dur + ' ease,box-shadow ' + dur + ' ease !important}';
  ccHtml.setAttribute('data-theme', t);
  if (ccTs) {
    ccTs.setAttribute('data-active', t);
    ccTs.setAttribute('aria-checked', t === 'jade' ? 'true' : 'false');
  }
  setTimeout(function() { if (styleTag) styleTag.textContent = ''; }, slow ? 1600 : 600);
}

function initTheme() {
  // Boot GOLD (set on <html data-theme="gold">), then slow-flip to JADE 1s after load.
  if (ccTs) {
    ccTs.setAttribute('data-active', 'gold');
    ccTs.setAttribute('aria-checked', 'false');
    ccTs.addEventListener('click', function() {
      applyTheme(ccHtml.getAttribute('data-theme') === 'gold' ? 'jade' : 'gold', false);
    });
    ccTs.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ccTs.click(); }
    });
  }
  // Auto-flip from gold to jade 1 second after full page load
  window.addEventListener('load', function() {
    setTimeout(function() { applyTheme('jade', true); }, 1000);
  });
}
```

### Boot sequence

The `<html>` tag opens as `data-theme="gold"`. `initTheme()` is called at the top of `boot()`. It immediately sets the toggle's `data-active="gold"`, then registers a `window.load` listener that fires 1000ms later and calls `applyTheme('jade', true)` with the slow=true 1.4s transition. This creates the visible warm-to-cool color shift that greets every visitor.

### Transition glide

When switching themes, a temporary `<style>` tag injects a blanket `transition` override on `html,html *` so every element eases smoothly. It is removed after 600ms (fast) or 1600ms (slow) so normal per-element transitions resume.

### Persistent element transitions (always-on)

```css
html { transition: background .25s ease; }
body, .masthead, .toc, .card, .pcard, .dcard, .cred, .band, .btn, .chip, .goal, .tchip, .omni-input {
  transition: background-color .25s ease, color .25s ease, border-color .25s ease;
}
```

---

## 4. STICKY SUB-NAV (TOC CONSOLE)

The sticky nav is NOT a mounted component. It is inline HTML in the page body, placed immediately after `<div id="cc-nav-mount">`.

### How it sticks

```css
.toc {
  position: sticky;
  top: var(--cc-nav-h, 68px);   /* offsets below the universal mega-nav height */
  z-index: 60;
  margin-top: 0;
  background: #fff;
  border-bottom: 1px solid var(--line);
  transition: background .45s ease;
}
section[id] { scroll-margin-top: 132px; }

@media (max-width: 1080px) {
  .toc { top: 72px; }
  section[id] { scroll-margin-top: 120px; }
}
```

### Scroll progress meter

A 2px green bar at the very top of the `.toc` container:

```html
<div class="toc-prog" id="tocProg"></div>
```

```css
.toc-prog {
  height: 2px;
  background: var(--green);
  width: 0;
  transition: width .1s linear;
}
```

JS that drives it:

```javascript
function scrollspy() {
  /* ... IntersectionObserver for active link highlighting ... */
  const prog = document.querySelector('#tocProg');
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + '%';
  }, { passive: true });
}
```

### TOC container and layout

```css
.toc .wrap {
  display: flex;
  align-items: center;
  gap: 2px;
  height: var(--toch);       /* 52px */
  flex-wrap: nowrap;
  max-width: none;            /* full bleed, not 1200px */
  margin: 0;
  padding-left: 26px;
  padding-right: 26px;
}
.toc .theme-switch, .toc .toc-dd { flex: 0 0 auto; }
.toc .theme-switch { order: 99; margin-left: auto; }  /* toggle pinned to right edge */

@media (max-width: 900px) {
  .toc .wrap {
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .toc .wrap::-webkit-scrollbar { display: none; }
}
```

### TOC nav structure (HTML, complete)

The six dropdown buttons (Compare, Plans, Explore, By Treatment, By Situation, Insurance Terms) follow this pattern. The toggle comes first with `order:99` to push it right.

```html
<div class="toc">
  <div class="toc-prog" id="tocProg"></div>
  <div class="wrap">

    <!-- 1. Theme toggle (CSS order:99 floats it to right) -->
    <div class="theme-switch" id="cc-ts" data-active="jade" role="switch" aria-checked="true" tabindex="0" aria-label="Switch color theme, Gold or Jade">
      <span class="ts-thumb"></span>
      <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
      <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
    </div>

    <!-- 2. Compare dropdown -->
    <div class="toc-dd" id="ddCompareWrap">
      <button class="toc-dd-btn" id="ddCompareBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddCompare">
        Compare
        <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      <div class="toc-dd-panel" id="ddCompare" role="menu" aria-label="...">
        <!-- menu items as <a> tags with role="menuitem" -->
        <div class="dd-lbl">Section label text</div>
        <a href="#anchor" role="menuitem">Link label <span>Optional sub-text</span></a>
        <!-- dd-all = "see all" footer link -->
        <a class="dd-all" href="#compare" role="menuitem">View all</a>
      </div>
    </div>

    <!-- Plans dropdown (same pattern but includes a fly-out for Delta Dental) -->
    <!-- Explore, By Treatment, By Situation, Insurance Terms follow identical pattern -->
  </div>
</div>
```

### Dropdown CSS

```css
.toc-dd { position: relative; flex-shrink: 0; }

.toc-dd-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font: 600 14px var(--sans); color: var(--ink);
  background: transparent; border: 0; cursor: pointer;
  padding: 8px 13px; border-radius: 8px; white-space: nowrap; line-height: 1;
}
.toc-dd-btn:hover,
.toc-dd-btn[aria-expanded=true] { background: var(--sage); color: var(--green-d); }

.dd-car { width: 9px; height: 9px; transition: transform .15s; }
.toc-dd-btn[aria-expanded=true] .dd-car { transform: rotate(180deg); }

/* Dropdown panel */
.toc-dd-panel {
  position: absolute; top: calc(100% + 7px); left: 0;
  width: 290px; min-width: 290px;
  background: #fff;
  border: 1px solid rgba(18,22,27,.20);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 7px;
  opacity: 0; transform: translateY(-6px);
  pointer-events: none;
  transition: opacity .15s, transform .15s;
  z-index: 80; overflow: visible;
}
/* Triangle arrow */
.toc-dd-panel::before {
  content: ""; position: absolute; top: -7px; left: 20px;
  width: 12px; height: 12px;
  background: #fff;
  border-left: 1px solid rgba(18,22,27,.20);
  border-top: 1px solid rgba(18,22,27,.20);
  transform: rotate(45deg);
}
/* Open state */
.toc-dd-panel[data-open] { opacity: 1; transform: none; pointer-events: auto; }

/* Links inside panel */
.toc-dd-panel a {
  display: block; font: 600 13.5px var(--sans); color: var(--ink);
  padding: 8px 11px; border-radius: 9px; text-decoration: none; line-height: 1.3;
}
.toc-dd-panel a:hover { background: var(--sage); color: var(--green-d); }
.toc-dd-panel a span { display: block; color: var(--muted); font-size: 11.5px; font-weight: 400; margin-top: 2px; line-height: 1.4; }

/* Section label */
.dd-lbl { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); padding: 8px 11px 4px; }

/* "See all" footer link */
.dd-all { border-top: 1px solid var(--line); margin-top: 6px; color: var(--green-d) !important; font-weight: 600; }

/* Featured dark item inside panel (used in Explore menu) */
.dd-feat { display: block !important; background: var(--panel); border-radius: 11px; padding: 11px 12px !important; margin-bottom: 6px; }
.dd-feat:hover { background: #0d474d !important; }
.dd-feat .dd-eye { display: block; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--panel-eye); }
.dd-feat .dd-t  { display: block; font-weight: 700; color: #fff; margin: 2px 0; }
.dd-feat .dd-d  { display: block; font-size: 11px; color: var(--panel-soft); }

/* Sub-section (indented links) */
.dd-sub { display: grid; margin: 0 0 6px; padding: 0 0 6px; border-bottom: 1px solid var(--line); }
.dd-sub a { padding: 7px 11px 7px 22px !important; font-size: 13px; color: var(--green-d); }

/* Mobile: panel goes fixed to viewport */
@media (max-width: 900px) {
  .toc-dd-panel { position: fixed; left: 12px; right: 12px; min-width: 0; top: calc(var(--toch) + 4px); }
}
```

### Fly-out sub-menu (Delta Dental inside Plans)

```css
.dd-fly { position: relative; }
.dd-fly-btn {
  display: flex; justify-content: space-between; align-items: center;
  width: 100%; gap: 12px;
  font: 600 13.5px var(--sans); color: var(--ink);
  background: none; border: 0; cursor: pointer;
  padding: 9px 11px; border-radius: 8px; text-align: left;
}
.dd-fly-btn:hover,
.dd-fly-btn[aria-expanded=true] { background: var(--sage); color: var(--green-d); }
.dd-fly-car { width: 11px; height: 11px; flex-shrink: 0; }
.dd-fly-panel {
  position: absolute; top: -9px; left: calc(100% + 6px);
  min-width: 230px;
  background: var(--card);
  border: 1px solid var(--line);
  border-top: 2px solid var(--green);
  border-radius: 14px;
  box-shadow: 0 18px 44px rgba(15,27,37,.16);
  padding: 8px;
  opacity: 0; transform: translateX(-6px);
  pointer-events: none; transition: .15s; z-index: 90;
}
.dd-fly-panel[data-open] { opacity: 1; transform: none; pointer-events: auto; }
.dd-fly-panel a { display: block; font: 500 13.5px var(--sans); color: var(--ink); padding: 8px 11px; border-radius: 8px; text-decoration: none; }
.dd-fly-panel a:hover { background: var(--sage); color: var(--green-d); }

@media (max-width: 900px) {
  .dd-fly-panel {
    position: static; left: auto; top: auto;
    box-shadow: none; border: 0;
    border-top: 1px solid var(--line);
    border-radius: 0; padding: 4px 0 4px 16px;
    opacity: 1; transform: none; pointer-events: auto; min-width: 0;
  }
}
```

### Dropdown JS (copy verbatim)

```javascript
(function() {
  var dds = [].slice.call(document.querySelectorAll('.toc-dd'));
  if (!dds.length) return;

  function closeAll(except) {
    dds.forEach(function(d) {
      if (d !== except) {
        var b = d.querySelector('.toc-dd-btn'), p = d.querySelector('.toc-dd-panel');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (p) p.removeAttribute('data-open');
      }
    });
  }

  var T = null;
  dds.forEach(function(d) {
    var btn = d.querySelector('.toc-dd-btn'), panel = d.querySelector('.toc-dd-panel');
    if (!btn || !panel) return;

    function open()  { clearTimeout(T); closeAll(d); btn.setAttribute('aria-expanded', 'true');  panel.setAttribute('data-open', ''); }
    function close() { btn.setAttribute('aria-expanded', 'false'); panel.removeAttribute('data-open'); }

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      btn.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    if (matchMedia('(hover:hover)').matches) {
      d.addEventListener('mouseenter', function() { clearTimeout(T); open(); });
      d.addEventListener('mouseleave', function() { clearTimeout(T); T = setTimeout(close, 450); });
    }
  });

  document.addEventListener('click', function(e) { if (!e.target.closest('.toc-dd')) closeAll(null); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeAll(null); });

  /* Delta fly-out */
  var fly = document.getElementById('ddDeltaFly');
  if (fly) {
    var fb = fly.querySelector('.dd-fly-btn'), fp = fly.querySelector('.dd-fly-panel'), FT = null;
    function fclose() { fb.setAttribute('aria-expanded', 'false'); fp.removeAttribute('data-open'); }
    function fopen()  { clearTimeout(FT); fb.setAttribute('aria-expanded', 'true');  fp.setAttribute('data-open', ''); }
    fb.addEventListener('click', function(e) { e.stopPropagation(); fb.getAttribute('aria-expanded') === 'true' ? fclose() : fopen(); });
    if (matchMedia('(hover:hover)').matches) {
      fly.addEventListener('mouseenter', function() { clearTimeout(FT); fopen(); });
      fly.addEventListener('mouseleave', function() { clearTimeout(FT); FT = setTimeout(fclose, 350); });
    }
  }
})();
```

---

## 5. EDITORIAL HERO PATTERN

The hero section uses `.match-head` centered inside `.wrap` inside `section#match`.

### Full HTML structure

```html
<section id="match">
  <div class="wrap">
    <div class="match-head">

      <!-- OVERLINE: eyebrow with star glyph + rule marks -->
      <span class="eyebrow">
        <span class="sp">&#10038;</span> Independent PPO dental insurance comparison
      </span>

      <!-- H1: two-tone headline -->
      <!-- First line: var(--ink) weight 700 -->
      <!-- Second line: wrapped in .disp-it = var(--green-d), serif, normal font-style -->
      <h1>
        Find the best dental insurance<br>
        <span class="disp-it">for the work ahead.</span>
      </h1>

      <!-- LEDE -->
      <p class="lede">There is no single best dental insurance for everyone...</p>

      <!-- INLINE "BEST FOR" ROW -->
      <div class="best-need" aria-label="Best dental insurance by need">
        <span class="bn-lab">Best dental insurance for:</span>
        <a href="/dental-insurance/ppo-plans/humana-extend-5000/">implants and a high maximum</a>
        <a href="/dental-insurance/ppo-plans/ameritas-primestar/">no waiting period</a>
        <a href="/dental-insurance/ppo-plans/guardian-premier-ppo/">a deep dentist network</a>
        <a href="/dental-insurance/ppo-plans/uhc-primary-dental/">fast activation</a>
      </div>

      <!-- CREDIT LINE (no em-dashes) -->
      <p class="hub-trust">
        Independent, no paid placement &middot; reviewed by dental billing specialists &middot; updated June 2026
      </p>

      <!-- SHARE / CITE PILL BUTTONS -->
      <div class="hub-share" aria-label="Share or cite this comparison">
        <button type="button" class="hub-share-btn" id="hubShareBtn">Share this comparison</button>
        <button type="button" class="hub-share-btn" id="hubCiteBtn">Copy citation</button>
        <span class="hub-share-status" id="hubShareStatus" role="status" aria-live="polite"></span>
      </div>

      <!-- BROWSE BY PILL ROW -->
      <nav class="hub-branches" aria-label="Browse PPO dental plans by">
        <span class="hb-lab">Browse by</span>
        <a href="#compare">Plan vs plan</a>
        <a href="#shelf">Coverage feature</a>
        <a href="#treatment">Procedure</a>
        <a href="#situation">Life event</a>
      </nav>

    </div>
    <!-- Smart match widget continues below... -->
  </div>
</section>
```

### CSS for hero components

```css
/* Centered hero head */
.match-head {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 36px;
}
.match-head .eyebrow { justify-content: center; }
.match-head h1 { margin: 18px 0 16px; }
.match-head .lede {
  font-size: 19px;
  color: var(--ink-soft);
  max-width: 62ch;
  margin: 0 auto;
}

/* Eyebrow: rule + star + text */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--green);
}
.eyebrow::before {
  content: "";
  width: 34px;
  height: 1px;
  background: var(--green-l);
}
.eyebrow .sp { color: var(--gold); }   /* the star glyph ✦ is gold-colored */

/* Two-tone H1: .disp-it makes the second line green-italic */
.disp-it {
  font-family: var(--serif);
  font-style: normal;
  font-weight: 700;
  color: var(--green-d);
}

/* "Best dental insurance for:" inline row */
.best-need {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  justify-content: center;
  align-items: center;
  margin: 14px auto 2px;
  max-width: 760px;
  font-family: var(--sans);
}
.best-need .bn-lab {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--muted);
}
.best-need a {
  font-size: 13px;
  font-weight: 600;
  color: var(--green-d);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.best-need a:hover { color: var(--green); }

/* Credit line */
.hub-trust {
  font-family: var(--sans);
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--muted);
  max-width: 76ch;
  margin: 20px auto 0;
}
.hub-trust a {
  color: var(--green);
  text-decoration: none;
  border-bottom: 1px solid var(--line-2);
}
.hub-trust a:hover { border-color: var(--green); }

/* Share/cite pill buttons */
.hub-share {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 14px auto 0;
  max-width: 76ch;
}
.hub-share-btn {
  font: 600 13px var(--sans);
  color: var(--green-d);
  background: var(--card);
  border: 1px solid var(--line-2);
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  transition: .12s;
}
.hub-share-btn:hover { border-color: var(--green); background: var(--sage); }
.hub-share-status {
  font-size: 12.5px;
  color: var(--green-d);
  font-weight: 600;
}
.hub-share-status:empty { display: none; }

/* "Browse by" pill row */
.hub-branches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 24px auto 2px;
}
.hub-branches .hb-lab {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-right: 4px;
}
.hub-branches a {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 600;
  color: var(--green-d);
  background: var(--card);
  border: 1px solid var(--line-2);
  border-radius: 999px;
  padding: 7px 15px;
  text-decoration: none;
  transition: transform .14s, border-color .14s, background .14s;
}
.hub-branches a:hover {
  border-color: var(--green);
  background: var(--sage);
  transform: translateY(-1px);
}
```

---

## 6. COMPONENT PATTERNS

### Container

```css
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
section { padding: 62px 0; }
```

### Buttons

```css
/* Base */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--sans); font-weight: 600; font-size: 14px;
  border-radius: 999px; padding: 12px 22px;
  cursor: pointer; border: 1px solid transparent; transition: .15s; white-space: nowrap;
}

/* Primary green */
.btn-green { background: var(--green); color: #fff; transition: filter .15s, box-shadow .15s; }
.btn-green:hover { filter: brightness(1.06); box-shadow: 0 6px 22px -4px var(--green); }

/* Gold (warm accent) */
.btn-gold { background: var(--gold-btn, #C9A24A); color: #14110A; transition: filter .15s, box-shadow .15s; }
.btn-gold:hover {
  filter: brightness(1.05);
  box-shadow: 0 0 0 1px rgba(201,162,74,.5), 0 8px 26px -4px rgba(201,162,74,.7);
}

/* Ghost / outline */
.btn-ghost { background: transparent; border-color: var(--line-2); color: var(--ink); }
.btn-ghost:hover { border-color: var(--green); color: var(--green); }

/* Dark */
.btn-ink { background: var(--ink); color: var(--paper); }
.btn-ink:hover { filter: brightness(.92); }

/* Small modifier */
.btn-sm { padding: 9px 16px; font-size: 13px; }
```

### Breadcrumb

```css
.crumb {
  background: #fff;
  border-bottom: 0;
  font-size: 12.5px;
  color: var(--muted);
}
.crumb .wrap { padding-top: 11px; padding-bottom: 11px; }
.crumb a { color: var(--muted); text-decoration: none; }
.crumb a:hover { color: var(--green-d); }
.crumb span { color: var(--ink); font-weight: 600; }  /* current page */
```

HTML pattern:

```html
<div class="crumb">
  <div class="wrap">
    <a href="/">Home</a> /
    <a href="/dental-insurance/">Dental insurance</a> /
    <a href="/dental-insurance/ppo-plans/">PPO Plans</a> /
    <span>Current page title</span>
  </div>
</div>
```

### Section eyebrow

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--sans); font-weight: 600; font-size: 12px;
  letter-spacing: .18em; text-transform: uppercase; color: var(--green);
}
.eyebrow::before {
  content: ""; width: 34px; height: 1px; background: var(--green-l);
}
.eyebrow .sp { color: var(--gold); }  /* ✦ star is gold */
```

Usage pattern:

```html
<span class="eyebrow"><span class="sp">&#10038;</span> Section label here</span>
```

### Section head block

```css
.sec-head { max-width: 760px; margin-bottom: 26px; }
.sec-head h2 { margin: 10px 0 8px; }
.sec-head p { font-size: 17px; color: var(--ink-soft); }
```

### Plan cards (.pcard)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 16px;
}
.pcard {
  border: 1px solid var(--line);
  border-radius: var(--radius);   /* 16px */
  background: var(--card);
  padding: 20px;
  display: flex; flex-direction: column;
  transition: .15s; min-width: 0;
}
.pcard:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

/* Plan name in card */
.pcard .pn { font-family: var(--serif); font-size: 21px; margin-top: 2px; }

/* Carrier label */
.pcard .car {
  font-size: 12px; font-weight: 600; letter-spacing: .05em;
  text-transform: uppercase; color: var(--muted);
}

/* Price */
.pprice { display: flex; align-items: baseline; gap: 6px; margin: 6px 0 14px; }
.pprice b { font-family: var(--serif); font-size: 30px; }
.pprice span { color: var(--muted); font-size: 13px; }

/* Badge tags */
.tag { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 999px; }
.tag-sell { background: var(--sage); color: var(--green-d); }
.tag-vision { background: #ECE6F2; color: #6A5396; }
.tag-review { background: var(--paper-2); color: var(--muted); }
.badges { display: flex; gap: 6px; flex-wrap: wrap; margin: 12px 0; min-height: 24px; align-items: center; }

/* Coverage list inside card */
.cov { list-style: none; padding: 0; margin: 0 0 18px; font-size: 13px; }
.cov li { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid var(--line); }
.cov li:last-child { border-bottom: 0; }
.cov .v { font-weight: 600; }
```

### Filter / sort chips

```css
.chip {
  border: 1px solid var(--line-2); background: var(--card); border-radius: 999px;
  padding: 8px 14px; font-size: 13px; font-weight: 500; cursor: pointer; transition: .12s;
}
.chip:hover { border-color: var(--green); }
.chip.sel { background: var(--green); color: #F4EFE2; border-color: var(--green); }
```

### General horizontal rule

```css
.hr { height: 1px; background: var(--line); border: 0; margin: 0; }
```

Used between every major section:

```html
<hr class="hr">
```

### Mini cards (4-col grid)

```css
.minicards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.mini {
  border: 1px solid var(--line); border-radius: 13px; padding: 18px;
  background: var(--card); transition: .15s; display: block;
}
.mini:hover { border-color: var(--green); box-shadow: var(--shadow); }
.mini h3 { font-size: 16px; margin-bottom: 4px; }
.mini p  { font-size: 13px; color: var(--muted); margin: 0; }
```

### Scenario cards (.pc)

```css
.pc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.pc {
  border: 1px solid var(--line); border-radius: 13px; padding: 20px;
  background: linear-gradient(180deg, var(--card), #F7F4ED);
  cursor: pointer; transition: .15s;
}
.pc:hover { border-color: var(--green); }
.pc h3 { font-size: 17px; margin-bottom: 6px; }
.pc p  { font-size: 13px; color: var(--muted); margin: 0; }
```

### Panel / band (dark feature block)

```css
.band {
  background: var(--panel);    /* deep teal / navy depending on theme */
  color: var(--panel-soft);
  border-radius: 20px;
  padding: 42px;
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; align-items: center;
}
.band .eyebrow { color: #C5B6DD; }
.band .eyebrow::before { background: #8C76A8; }
.band h2 { color: var(--panel-ink); }
.band p  { color: var(--panel-soft); }
```

### TOC nav link bar (alternative layout, if used without dropdowns)

```css
.toc-links { display: flex; gap: 22px; font-size: 13.5px; font-weight: 500; overflow-x: auto; scrollbar-width: none; }
.toc-links::-webkit-scrollbar { display: none; }
.toc-links a { color: var(--muted); white-space: nowrap; padding: 4px 0; border-bottom: 2px solid transparent; }
.toc-links a:hover,
.toc-links a.on { color: var(--ink); border-color: var(--green); }
```

### TOC CTA button (inside TOC bar)

```css
.toc-cta {
  display: flex; gap: 10px; flex-shrink: 0; margin-left: 18px;
}
/* Each CTA inside: */
/* inline-flex, green bg, 999px radius, 9px 16px padding, 13px font-size */
```

---

## SUMMARY OF WHAT TO REPLICATE

When re-skinning another page to match this system:

1. Add the Google Fonts `<link>` and the `<style>` block with `:root` tokens, all four theme overrides (root, gold, jade, maison), and the toggle CSS.
2. Open `<html lang="en" data-theme="gold">`.
3. Place the `.toc` sticky console immediately after `<div id="cc-nav-mount">` and before the breadcrumb.
4. Use the breadcrumb `.crumb` pattern above the hero.
5. Center the hero inside `.match-head` with the eyebrow-H1-lede-best-need-trust-share-browse-by sequence.
6. Separate every section with `<hr class="hr">`.
7. Call `initTheme()` at the top of the page's boot function.
8. The `.wrap` max-width is 1200px with 28px horizontal padding; sections get 62px vertical padding.
9. Do NOT use em-dashes. Separate items with `&middot;` or commas.
10. The star glyph is `&#10038;` (hex 2726, a 4-point star) colored `var(--gold)` via `.sp`.
