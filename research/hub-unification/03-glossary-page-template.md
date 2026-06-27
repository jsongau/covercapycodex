# Glossary Term Page Template (gold standard)

Reference page: `dental-insurance/ppo-plans/metlife-ncd-complete/index.html` (plan-page reading layout).
Gold-standard glossary build: `guides/glossary/in-network/index.html`.
Applies to all 23 glossary term pages under `guides/glossary/*/index.html`.

## What changed in the gold standard

1. **Breadcrumb fix.** The regressed `<nav class="crumb">` (no inner `.wrap`) was replaced with the
   constrained, divider-less container so the shared `.crumb .wrap` padding applies again:
   ```html
   <div class="crumb" aria-label="Breadcrumb"><div class="wrap">
     <a href="https://www.covercapy.com/">Home</a> / <a href="https://www.covercapy.com/dental-insurance/">Dental insurance</a> / <a href="https://www.covercapy.com/guides/glossary/">Glossary</a> / <span aria-current="page">In-network dentist</span>
   </div></div>
   ```
   Home -> `/`, Dental insurance -> `/dental-insurance/`, Glossary -> `/guides/glossary/`, current term = plain `<span aria-current="page">`.
   The breadcrumb sits OUTSIDE `.wrap` (it has its own full-width band + inner `.wrap`), placed directly after the two nav mounts.

2. **Plan-style reading layout.** Body is now a constrained column + sticky right rail, mirroring the
   plan page's `.layout` (`grid-template-columns:minmax(0,1fr) var(--rail)`). All classes already exist
   in `assets/css/hub-theme.css` (lines ~197-227, the `.gloss-*` block) — **NO per-page CSS, NO new CSS added.**
   ```
   <div class="wrap">
     <div class="gloss-layout">          <!-- grid: 1fr + var(--gloss-rail) 320px -->
       <main class="gloss-main">          <!-- constrained reading column -->
         <header class="hero"> H1 + tagline + hero CTAs </header>
         <div class="content">
           <section class="section"> ... definition / how it works / watch-outs / FAQ / related ... </section>
           <section class="guide-cta-band"> dark closing CTA </section>
         </div>
       </main>
       <aside class="gloss-rail">         <!-- sticky right rail -->
         <div class="grc"> verify CTA card: Find a PPO dentist + Compare PPO plans </div>
         <div class="grc"> related-terms card (.grel pills) </div>
       </aside>
     </div>
   </div>
   ```
   On mobile (<=920px) `.gloss-layout` collapses to one column and the rail moves below (static).

## Required structure per term page

### Head
- `<html lang="en" data-theme="jade">`
- Stylesheets in order: `mega-nav.css`, `mega-nav-mobile.css`, `footer.css`, `hub-theme.css`.
- One JSON-LD `@graph` block: `DefinedTerm` + `Article` + `FAQPage` + `BreadcrumbList`.
  - BreadcrumbList = 4 levels: Home / Dental insurance / Glossary / {Term}.
  - FAQPage `mainEntity` questions must match the visible FAQ questions 1:1 (parity).

### Body order
1. `<div id="cc-nav-mount"></div>` then `<div id="cc-hub-subnav-mount"></div>` (unified header, both mounts).
2. Breadcrumb (`.crumb > .wrap`, see fix above).
3. `<div class="wrap"><div class="gloss-layout">`.
4. `<main class="gloss-main">`:
   - `<header class="hero">`: `.eyebrow` overline, single `<h1>`, `.hero-tagline`, `.hero-ctas`
     (`a.btn.btn-green` Find a PPO dentist + `a.btn.btn-ghost` Compare PPO plans).
   - `<div class="content">` with `<section class="section">` cards (jade/cream): definition,
     how it works (+ `.example-box`), watch-outs (`.watchout-list`), FAQ (`.faq-section`),
     related terms (`.rel-pills`), then a `.guide-cta-band` dark closing CTA.
5. `<aside class="gloss-rail">`: `.grc` verify/CTA card + `.grc` related-terms card (`.grel` pills).
6. `<div id="cc-footer-mount"></div>` — **must precede** the universal loader script.
7. Universal component loader (loads mega-nav, hub-subnav, footer; mounts precede loader).
8. `<script>window.CC_PAGE_TERM='{slug}';</script>` then `<script src="/assets/js/glossary-tips.js" defer></script>`.

### FAQ accordion
Use the shared global `toggleFaq(this)` from `glossary-tips.js` (answers carry `hidden`, toggled on click).
Each item: `.faq-item > button.faq-q[aria-expanded][aria-controls][onclick="toggleFaq(this)"]` + `.faq-a[hidden]`.

## Heading hierarchy
Exactly one `<h1>` (the term). All section titles are `<h2>`. No skipped levels.

## Hard rules (CLAUDE.md)
- Jade/cream theme only. No legacy mint `#5BE0A0`, no `btn-mint`, no `--mint`, no Fraunces serif, no `teal-night`.
- No em-dashes anywhere (use commas/colons). www host + trailing slashes on canonical and internal links.
- Do not duplicate layout CSS per page — it lives in `assets/css/hub-theme.css` (`.gloss-*`, `.grc*`, `.guide-cta-band`).

## Validation checklist (all passed on in-network)
- [x] JSON-LD parses (DefinedTerm + Article + FAQPage + BreadcrumbList).
- [x] Inline JS parses (`node --check`).
- [x] Exactly one `<h1>`.
- [x] Footer mount precedes universal loader.
- [x] No em-dashes (U+2014).
- [x] No legacy palette (#5BE0A0 / btn-mint / Fraunces / teal-night / --mint).
- [x] Visible FAQ questions match FAQPage schema 1:1.
- [x] Breadcrumb uses `.crumb > .wrap` (shared padding restored).

## Rollout to the other 22 terms
Repeat per term, swapping: title/meta/canonical, DefinedTerm name+description, Article headline,
H1 + tagline, section copy, the 4 FAQ Q/A pairs (keep schema parity), related-term pills, and
`CC_PAGE_TERM`. Layout, breadcrumb, rail, loader and CSS classes stay identical.
