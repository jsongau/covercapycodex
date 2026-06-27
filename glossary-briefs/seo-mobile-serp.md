# Mobile SEO & Core Web Vitals Strategy
## covercapy.com/dental-insurance-glossary/
### Technical SEO Brief | June 2026

---

## 1. Mobile SERP Appearance

### Title Tag

**Target length:** 52–58 characters (fits within Google's ~600px pixel budget; mobile truncates at ~55 chars).

**Recommended title:**
```
Dental Insurance Glossary — 23 Terms Explained | CoverCapy
```
- 59 chars — borderline. Trim to:
```
Dental Insurance Glossary: 23 Terms Explained | CoverCapy
```
- 57 chars. Colon instead of em-dash (no em-dashes per design rules). Keyword-first. Brand last.

**Why the term count:** "23 terms" signals comprehensiveness in the SERP snippet. Users scanning mobile results respond to specificity ("23 terms" vs. the generic "A–Z Guide").

### Meta Description

**Mobile budget:** ~120 characters (680px). Write to 118 to avoid mid-word truncation.

**Recommended:**
```
Plain-English definitions of PPO, deductible, waiting period, in-network, and 19 more dental insurance terms. Free to browse, no signup.
```
- 139 chars — trim:
```
Plain-English definitions of PPO, deductible, waiting period, in-network, and 19 more dental insurance terms. No signup required.
```
- 128 chars — acceptable; Google may truncate the last phrase but the value prop survives.

**Copy rules applied:** no em-dashes, no roman numerals, colon/comma structure throughout.

### Breadcrumb Display in SERP

As of August 2026, Google removed breadcrumb display from mobile SERPs (following the September 2024 desktop removal). The URL path is now shown instead: `covercapy.com > dental-insurance-glossary`.

**Action items:**
- Keep `BreadcrumbList` JSON-LD anyway — Google uses it for AI Overviews, site hierarchy signals, and internal crawl logic even without visual display.
- Ensure the URL slug is clean and descriptive: `/dental-insurance-glossary/` (no trailing parameters, no hash fragments in canonical).

**Recommended BreadcrumbList schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "Dental Insurance Glossary", "item": "https://covercapy.com/dental-insurance-glossary/" }
  ]
}
```

### Rich Results Eligibility

**FAQPage schema: DEPRECATED as of May 2026.** Google removed FAQ rich result display; the schema no longer produces expandable SERP dropdowns. Do not implement FAQPage markup on this page — it wastes schema budget without any SERP benefit.

**What still works for a glossary page:**

| Schema Type | SERP Benefit | Implement? |
|-------------|-------------|------------|
| `DefinedTermSet` + `DefinedTerm` | No visual rich result, but semantic signal to Knowledge Graph and AI Overviews | Yes |
| `BreadcrumbList` | Structural signal; no longer visually displayed | Yes |
| `WebPage` with `about` array | Topical authority signal | Yes |
| `Organization` (sitewide) | Sitelink eligibility | Yes (sitewide) |
| `ItemList` | Can produce list-type features in AI Overview panels | Consider |

**`DefinedTermSet` implementation:**
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://covercapy.com/dental-insurance-glossary/#termset",
  "name": "Dental Insurance Glossary",
  "url": "https://covercapy.com/dental-insurance-glossary/",
  "description": "Plain-English definitions of dental insurance terms including PPO, deductible, waiting period, and in-network coverage.",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "@id": "https://covercapy.com/dental-insurance-glossary/#ppo",
      "name": "PPO (Preferred Provider Organization)",
      "description": "A type of dental insurance plan that lets you visit any licensed dentist, with lower costs when you stay in-network.",
      "inDefinedTermSet": "https://covercapy.com/dental-insurance-glossary/#termset"
    }
    // ... repeat for all 23 terms
  ]
}
```

---

## 2. Core Web Vitals Targets

### Metric Targets (2026)

| Metric | Good | Needs Improvement | Poor | CoverCapy Glossary Target |
|--------|------|------------------|------|--------------------------|
| LCP | ≤ 2.5s | 2.5–4.0s | > 4.0s | **< 1.2s** |
| INP | ≤ 200ms | 200–500ms | > 500ms | **< 100ms** |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 | **< 0.05** |

**Why tighter than "Good":** Static HTML on Vercel Edge CDN eliminates TTFB almost entirely (typically 20–60ms to first byte from edge). There is no React hydration, no API waterfall. A mostly-text page with inline critical CSS and no above-the-fold images has no excuse for LCP above 1.5s on a mid-range device.

### LCP on This Page

The LCP element on a text glossary page will be one of:
- The `<h1>` heading (most likely on mobile — it is the largest text block first painted)
- A hero tagline paragraph

**To control LCP:**
- Ensure the `<h1>` is in the initial HTML, not injected by JS
- Use `font-display: swap` on Fraunces (the headline font) so the browser paints text immediately in a fallback font, then swaps — this keeps LCP painting early even before custom fonts load
- Preload the Fraunces woff2 subset: `<link rel="preload" as="font" type="font/woff2" href="/fonts/fraunces-latin-500.woff2" crossorigin>`
- Do not place any image above the fold that could compete to be the LCP element; if any decorative icon or illustration appears in the hero, make it small (< 40px) so it cannot win the LCP race

### CLS on This Page

Main CLS risks on a glossary page:
1. **Font swap shift** — Fraunces has different metrics than system serif fallbacks; the line-height change on swap shifts subsequent content. Mitigate: use `size-adjust` on the fallback `@font-face` declaration to match x-height, or preload Fraunces so swap is near-instant.
2. **Accordion expand/collapse** — if terms are in accordion format, expanding one shifts all subsequent terms downward. This is not CLS (CLS only measures unexpected shifts, not user-initiated layout changes). Safe.
3. **Jump nav sticky transition** — if the A–Z nav transitions from static to sticky mid-scroll, reserve its height with a placeholder so the content below does not jump. CLS budget hit: a 48px nav appearing without reserved space = ~0.05 CLS on a 844px-tall mobile screen. Reserve the space.
4. **No images** — if no images appear above the fold, the main image CLS vector is eliminated. Glossary pages typically have no hero image; keep it that way.

### INP on This Page

INP (Interaction to Next Paint) measures the delay between a user tap and the next visual response. Main interactions on a glossary page:
- Tapping a letter in the A–Z jump nav → smooth-scroll to section
- Tapping a term to expand/collapse accordion
- Tapping a CTA button

**INP budget for accordion toggle:** The toggle handler must complete in < 200ms from tap to visual change. For a pure CSS accordion (`<details>`/`<summary>` or CSS checkbox hack), the browser handles the expand natively — no JS event loop involvement — and INP will be under 50ms. For a JS-driven accordion, keep the handler to: (1) toggle one class, (2) no DOM queries inside the handler, (3) no synchronous XHR. Pre-cache the expanded heights with CSS `max-height` transition, not `height: auto` (which forces reflow on every frame).

**Recommended:** Use `<details>`/`<summary>` native HTML accordion. Zero JS. INP near-zero. Google indexes the content inside `<details>` elements.

---

## 3. Above-the-Fold Design Requirements

**Mobile viewport reference:** 390px wide × 844px tall (iPhone 15 standard). Usable content area after browser chrome: ~390 × 700px.

### What Must Appear in First Viewport (No Scroll)

```
┌─────────────────────────────────┐  ← top of screen
│  CoverCapy nav (slim, 44px)     │
├─────────────────────────────────┤
│  Overline: DENTAL INSURANCE     │  ← teal-300, Inter Tight, caps, 11px
│                                 │
│  Dental Insurance Glossary      │  ← h1, Fraunces 500, ~28px
│                                 │
│  23 plain-English definitions   │  ← subhead, Inter Tight, ink-soft
│  to help you understand your    │
│  PPO plan before you buy.       │
│                                 │
│  [JUMP TO A TERM ↓]             │  ← secondary CTA, teal-700 ghost button
│  [GET COVERAGE FROM $30/MO →]   │  ← primary CTA, mint on teal-night
│                                 │
│  ─────── A B C D E F G ──────  │  ← A–Z jump nav (horizontal scroll)
├─────────────────────────────────┤
│  ▼ First term begins here       │  ← ideally visible, even partially
└─────────────────────────────────┘  ← fold
```

**Rationale for each element:**
- **H1 in first viewport:** Required for LCP and for mobile users to immediately confirm they landed on the right page.
- **Two CTAs:** The glossary is a top-of-funnel informational page. Users are not ready to buy. The primary CTA should feel low-pressure ("Get coverage from $30/mo" not "Buy Now"). The secondary CTA ("Jump to a term") serves users who arrived for a specific term.
- **A–Z nav at bottom of hero:** Users scrolling glossaries expect alphabetical navigation. Placing it at the bottom of the above-the-fold section means it is immediately visible without crowding the headline.
- **First term partially visible:** A visual cue that content begins immediately below the fold reduces bounce. Even 30px of the first term card peeking out is enough.

**What NOT to put above the fold:**
- Full-width hero images (CLS risk, LCP competition, not relevant to a text glossary)
- A search input (23 terms is not enough content to warrant search; it adds JS complexity for no gain)
- Star ratings or social proof widgets (they inject late via JS and cause CLS)

---

## 4. A–Z Jump Nav Mobile Behavior

### Recommended: Horizontal Scroll Strip (Static, not Sticky — Initially)

**Layout:**
```css
.az-nav {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 4px;
  padding: 8px 16px;
  scrollbar-width: none; /* hide scrollbar on mobile */
}

.az-nav a {
  scroll-snap-align: start;
  flex-shrink: 0;
  min-width: 44px;      /* WCAG 2.5.5 minimum tap target */
  height: 44px;         /* WCAG minimum */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font: 500 14px 'Inter Tight', system-ui;
  color: var(--teal-700);
  background: var(--cream);
  border: 1px solid var(--line);
  text-decoration: none;
}

.az-nav a:active,
.az-nav a.active {
  background: var(--mint-soft);
  border-color: var(--teal-700);
  color: var(--teal-night);
}
```

**Letters without terms:** For a 23-term glossary, some letters will have no terms (X, Q, Z likely). Render those letters as non-linked, dimmed (`color: var(--ink-faint); pointer-events: none`). Do not omit them — a partial alphabet looks broken; a full alphabet with grayed-out letters communicates completeness.

**Tap target enforcement:** Each letter button must be 44 × 44px minimum per WCAG 2.5.5 and Apple HIG. With 26 letters at 44px + 4px gap, the total scrollable width is ~1,248px. On a 390px screen, roughly 8 letters are visible at once. The strip must be scrollable horizontally; do not wrap to two rows (the second row creates unexpected tap targets in the thumb zone).

### Sticky Behavior

**Recommendation: Sticky after the user scrolls past the hero.**

Use `position: sticky; top: 44px` (below the slim site nav). This keeps the jump nav in view as the user scrolls through definitions.

```css
.az-nav-wrap {
  position: sticky;
  top: 44px;           /* height of site nav */
  z-index: 10;
  background: white;
  border-bottom: 1px solid var(--line);
}
```

**CLS mitigation:** Reserve the sticky wrap's height in the document flow before it becomes sticky. Since the wrap starts in-flow and becomes sticky, no height reservation is needed — sticky elements do not leave the flow. CLS: 0.

**Intersection Observer for active state:** As the user scrolls, highlight the current letter in the nav using an IntersectionObserver watching each `<section id="letter-*">`. Keep the observer callback lightweight: one class toggle per intersection event.

**Dropdown alternative:** Only consider a `<select>` dropdown fallback if the site already has users on very low-end Android devices (viewport < 360px). For CoverCapy's dental professional demographic, the horizontal scroll strip is the right pattern. Dropdowns suppress discoverability and look dated.

---

## 5. Card vs. Accordion: Layout Decision for 23 Terms on Mobile

### Verdict: Accordion wins for mobile. Cards win for indexability. Use a hybrid.

**The case for accordion on mobile:**
- 23 fully expanded definitions displayed as cards = very long page (~8,000–12,000 words visible simultaneously). Mobile users abandon long pages.
- Accordion reduces scroll distance dramatically, keeping the jump nav useful.
- INP for tap-to-expand is < 50ms with `<details>`/`<summary>`.
- Accordion signals to users they are on a glossary (expected pattern) rather than an article.

**The case for expanded cards:**
- Google can index all content without the slight weighting penalty of collapsed content.
- No JS dependency.
- Better for users arriving from Google who already know which term they want (they can scan faster if everything is visible).

**The hybrid approach (recommended):**

Use `<details>`/`<summary>` for the accordion mechanic, which means all content is in the initial HTML DOM — Google indexes it fully. The term title is always visible (in `<summary>`). The definition is inside `<details>` but present in the HTML at page load, not fetched on demand.

```html
<section id="letter-p" class="gloss-section">
  <h2 class="az-heading">P</h2>

  <details class="term-item" open>   ← "open" on first term per letter section
    <summary class="term-name">
      PPO (Preferred Provider Organization)
      <span class="expand-icon" aria-hidden="true">+</span>
    </summary>
    <div class="term-body">
      <p>A type of dental insurance plan that lets you visit any licensed dentist.
         When you stay in-network, you pay less — typically 20–30% vs. 40–50% out-of-network.</p>
      <a href="/compare-ppo-dental-plans/" class="term-cta">Compare PPO plans →</a>
    </div>
  </details>
</section>
```

**Why `open` on the first term per letter:** This gives Google's crawler a clear signal that definitions are real content, not decoration. It also gives mobile users an instant sample of the definition quality before they decide to expand others.

**Indexability confirmation:** Google's crawler treats `<details>` content as fully indexed regardless of open/closed state, because the content is present in the HTML source. The `hidden` attribute or `display:none` via JS applied after load is the only pattern that risks indexing issues — `<details>` closed state does not use `display:none` in the accessibility tree.

**Desktop behavior:** On viewports > 768px, consider auto-expanding all 23 terms with a `[data-expanded]` class applied by a small JS snippet on load. This keeps the mobile experience compact while giving desktop users a Wikipedia-style always-visible glossary.

---

## 6. Image Optimization

### Recommendation: No per-term images. One optional hero illustration. Inline SVG icons only.

**Why no per-term images:** A dental insurance glossary does not benefit from per-term photography. Attempting to illustrate "deductible" or "coinsurance" with stock photos wastes bandwidth, risks CLS, and cheapens the luxury-concierge positioning.

**What to use instead:**
- A single subtle hero illustration (optional): an abstract capybara-adjacent mark or geometric dental motif. If used, it must be:
  - Served as SVG inline in the HTML (zero network request, zero LCP competition)
  - Or served as a `<picture>` element with AVIF/WebP with explicit `width` and `height` attributes to prevent CLS
  - Loading: `eager` if above the fold (< 20px decorative mark), `lazy` if below the fold

- **Term category icons (optional):** If terms are grouped by category (Coverage, Costs, Network, Timing), small inline SVG icons (16–20px) can distinguish categories. Use `aria-hidden="true"` on decorative icons.

**Lazy loading rules:**
- Any image or icon above the fold: `loading="eager"` (or omit — eager is default)
- Any image below the fold: `loading="lazy"` with explicit `width` and `height`
- Never lazy-load the LCP candidate

**AVIF/WebP for any raster images:**
```html
<picture>
  <source type="image/avif" srcset="/img/glossary-hero.avif">
  <source type="image/webp" srcset="/img/glossary-hero.webp">
  <img src="/img/glossary-hero.png" alt="Dental insurance glossary illustration"
       width="390" height="200" loading="eager" decoding="async">
</picture>
```

**Expected image payload for this page:** 0–15KB total (SVG icons + optional hero). CoverCapy's positioning as a luxury concierge brand is better served by typographic elegance than decorative imagery on an informational page.

---

## 7. Font Loading Strategy

### Fonts in Use
- **Fraunces** (variable serif) — headlines (H1, H2 letter sections, term names in `<summary>`)
- **Inter Tight** (variable sans) — body text, CTA labels, nav, definition prose

### The Problem

Fraunces full variable font: ~200–400KB. Inter Tight full variable font: ~100–200KB. Loading both in full would significantly harm LCP on 4G mobile (budget: < 50KB of render-blocking font payload for < 1.2s LCP).

### Subsetting Strategy

**Step 1: Latin-only subset**
Neither Fraunces nor Inter Tight need Cyrillic, Greek, or Vietnamese on a US dental insurance glossary page. Latin subsetting alone cuts file size by 65–85%.

**Step 2: Weight restriction**
- Fraunces: only weight 500 italic (for practice names in modals) and weight 500 regular (for H1/H2). Drop optical-size axis variation (`opsz`) unless explicitly needed.
- Inter Tight: only weights 400 (body) and 500 (labels/UI). Drop 700 bold — use 500 semibold for headings to avoid loading a third weight.

**Step 3: Unicode-range glyph pruning**
For a glossary page, the full Latin Extended set is overkill. Use `unicode-range: U+0020-007F` (basic ASCII) plus `U+00A0-00FF` (Latin-1 supplement for accented characters like "naïve") if needed. This is the tightest safe subset for English content.

**Estimated file sizes after subsetting:**
| Font | Before | After Latin+Weight Subset | Method |
|------|--------|--------------------------|--------|
| Fraunces (wt 500 only) | ~250KB | ~18–25KB woff2 | pyftsubset or fontsquirrel |
| Inter Tight (wt 400+500) | ~180KB | ~14–20KB woff2 | pyftsubset or fontsquirrel |
| **Total** | ~430KB | **~35–45KB** | |

**Implementation:**

Host subsetted fonts on Vercel (same origin = no extra DNS lookup). Do not load from Google Fonts CDN — Google Fonts adds a render-blocking CSS request and a cross-origin DNS lookup.

```html
<head>
  <!-- Preload critical fonts (only the ones needed above the fold) -->
  <link rel="preload" as="font" type="font/woff2"
        href="/fonts/fraunces-latin-500.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2"
        href="/inter-tight-latin-400-500.woff2" crossorigin>

  <style>
    @font-face {
      font-family: 'Fraunces';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('/fonts/fraunces-latin-500.woff2') format('woff2');
      unicode-range: U+0020-007F, U+00A0-00FF;
    }
    @font-face {
      font-family: 'Inter Tight';
      font-style: normal;
      font-weight: 400 500;
      font-display: swap;
      src: url('/fonts/inter-tight-latin-400-500.woff2') format('woff2');
      unicode-range: U+0020-007F, U+00A0-00FF;
    }
  </style>
</head>
```

**`font-display: swap` with CLS mitigation:**
`swap` shows system font immediately, then swaps to Fraunces when loaded. The metric difference between Fraunces and Georgia (a likely system serif fallback) can cause a layout shift. To minimize this:

```css
@font-face {
  font-family: 'Fraunces-fallback';
  src: local('Georgia');
  ascent-override: 88%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 104%;
}

h1, h2, .term-name summary {
  font-family: 'Fraunces', 'Fraunces-fallback', serif;
}
```
This `size-adjust` override matches Fraunces metrics to Georgia so the swap causes minimal reflow. Target CLS from font swap: < 0.02.

---

## 8. Critical CSS Strategy

### What to Inline vs. Defer

**Rule of thumb for a mostly-text page:** The above-the-fold render budget on mobile (390px × 700px) requires a small, fast-painted layer. The critical CSS for this page fits comfortably under 8KB — well within the 14KB first TCP packet.

### Inline in `<style>` in `<head>` (Critical CSS)

Everything needed to render the above-the-fold experience without a flash of unstyled content:

```
- CSS custom properties (all --teal-*, --mint, --cream, --ink* tokens): ~1KB
- Base reset (box-sizing, margin 0, body font): ~0.3KB
- Site nav styles (slim nav, CoverCapy logo, mobile menu button): ~1KB
- Hero section (h1, overline, subhead, CTA buttons): ~2KB
- A–Z nav strip (flex, overflow-x, letter button base styles): ~1KB
- First term visible below fold (details/summary base, term-name font): ~1KB
- @font-face declarations (Fraunces + Inter Tight): ~0.5KB
─────────────────────────────────────────────────────────────
Total critical CSS inline: ~7KB (unminified), ~4KB minified
```

### Async-Load in `<link rel="stylesheet">` (Deferred CSS)

Everything that only renders below the fold or is UI-conditional:

```
- Full accordion animation (max-height transition, expand-icon rotation)
- Sticky A–Z nav shadow on scroll
- CTA block styles (the "Get covered" rail at bottom)
- Term category color coding
- Desktop layout adjustments (media query > 768px)
- Footer styles
- Modal styles (if any CTAs link to a modal — defer entirely)
```

**Async CSS loading pattern (no JS required):**
```html
<link rel="preload" as="style" href="/css/glossary.css"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/glossary.css"></noscript>
```

**Do NOT defer:**
- The CSS custom properties (tokens) — any inline element using `var(--teal-night)` will render black until tokens load
- The @font-face declarations — they must be in the critical `<style>` block so the preloaded fonts are consumed immediately
- The layout of any element that could be the LCP candidate

**Expected performance outcome with this approach:**
- FCP: < 0.6s (system font renders H1 immediately; Fraunces swaps in within 200ms)
- LCP: < 1.2s (H1 or overline text painted from inline critical CSS)
- CLS: < 0.05 (font fallback metrics matched; sticky nav space reserved; no late-loading images)
- INP: < 100ms (native `<details>` toggle, no JS accordion)

---

## 9. Tap-to-Expand: Ensuring Google Indexes Collapsed Content

### The Correct Pattern: Native HTML `<details>`/`<summary>`

```html
<details class="term-item">
  <summary class="term-name">
    Deductible
    <span class="expand-icon" aria-hidden="true">+</span>
  </summary>
  <div class="term-body">
    <p>The amount you pay out of pocket each year before your dental insurance
       starts covering costs. A $50 annual deductible is common on PPO plans.</p>
    <p>Most plans reset deductibles on January 1. Check whether your plan's
       deductible applies to preventive care — many PPOs waive it for cleanings.</p>
    <a href="/compare-ppo-dental-plans/" class="term-link">
      Compare plans with low deductibles →
    </a>
  </div>
</details>
```

**Why this is safe for Google indexing:**
- The definition text is in the initial HTML response — not fetched after a click
- `<details>` closed state renders the `<div class="term-body">` with `display: block` internally; it is visually hidden via the browser's native UA stylesheet, not `display:none` from a CSS class
- Google's crawler does not simulate user interaction, but it does parse the full DOM including closed `<details>` elements. The W3C spec confirms the content is accessible to the accessibility tree in both states
- This is categorically different from JS-driven accordions that insert content into the DOM only on click — those patterns CAN hide content from crawlers

**Do not do this (crawler-unsafe pattern):**
```javascript
// WRONG: Inserts content into DOM only on click
termButton.addEventListener('click', () => {
  termBody.innerHTML = fetchDefinition(termId); // content not in initial HTML
});
```

**Validation checklist:**
- [ ] View page source (not Inspect Element): all 23 definitions must appear in the raw HTML
- [ ] `curl https://covercapy.com/dental-insurance-glossary/ | grep "deductible"` — definition text must appear
- [ ] Google's URL Inspection tool in Search Console → "View crawled page" → confirm definitions appear in rendered HTML

### Structured Data for Collapsed Terms

Even though FAQPage is deprecated as of May 2026, `DefinedTerm` schema (per Section 1 above) ensures the term-definition pairs are machine-readable independent of the visual accordion state. This is the correct schema pattern for a glossary in 2026.

### Accessibility Requirement

`<details>`/`<summary>` is natively keyboard-accessible (Enter/Space to toggle) and screen-reader accessible. Add `aria-label` to the expand icon:

```html
<summary class="term-name">
  Deductible
  <span class="expand-icon" aria-hidden="true">+</span>
</summary>
```

The `<summary>` element already announces the term name to screen readers. The `+` icon is decorative — hide it from the accessibility tree with `aria-hidden="true"`.

---

## Implementation Checklist

### Critical path (blocks launch)
- [ ] Title ≤ 58 chars, keyword-first, no em-dash
- [ ] Meta description ≤ 128 chars, mobile-optimized
- [ ] `<h1>` in initial HTML, visible in first viewport
- [ ] Fraunces + Inter Tight subsetted to Latin + required weights, self-hosted on Vercel
- [ ] `<link rel="preload">` for both font woff2 files
- [ ] `font-display: swap` with `size-adjust` fallback metrics
- [ ] Critical CSS inlined in `<head>` (< 8KB)
- [ ] All 23 definitions in initial HTML source (not JS-injected)
- [ ] `<details>`/`<summary>` accordion — no JS accordion library
- [ ] A–Z jump nav: 44 × 44px tap targets, horizontal scroll, `scroll-snap-type: x mandatory`
- [ ] `BreadcrumbList` JSON-LD implemented
- [ ] `DefinedTermSet` + `DefinedTerm` JSON-LD for all 23 terms
- [ ] Sticky A–Z nav space reserved to prevent CLS
- [ ] No `FAQPage` schema (deprecated May 2026)
- [ ] Any images have explicit `width` + `height` attributes
- [ ] CTAs link to `/compare-ppo-dental-plans/` and `/find-my-dentist/`

### Performance validation
- [ ] Lighthouse mobile score > 95 (Performance)
- [ ] PageSpeed Insights mobile: LCP < 1.2s, CLS < 0.05, INP < 100ms
- [ ] `curl` source check: all definitions in raw HTML
- [ ] Google Search Console URL Inspection: rendered HTML includes definition text

---

## Sources

- [What Are the Core Web Vitals? LCP, INP & CLS Explained (2026)](https://www.corewebvitals.io/core-web-vitals)
- [Core Web Vitals 2026: INP, LCP & CLS Optimization](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [Fix LCP, INP & CLS in 2026: The Complete Core Web Vitals Guide](https://dev.to/dharanidharan_d_tech/fix-lcp-inp-cls-in-2026-the-complete-core-web-vitals-guide-with-real-benchmarks-54cl)
- [Accordions in SEO: How Google handles hidden content](https://www.seoexamples.com/p/hidden-content-in-seo-unmasking-the)
- [Do FAQ Accordions Hurt SEO?](https://www.poper.ai/blog/faq-accordion-seo/)
- [FAQ Rich Results Deprecated: Google's May 2026 Change](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now)
- [Google Removes Mobile Breadcrumbs: What it Means for SEO](https://www.clickrank.ai/google-removes-breadcrumb/)
- [FAQ Structured Data in 2026: What Still Works Now](https://alevdigital.com/blog/faq-structured-data-2026/)
- [Meta Title and Description Character Limit (2026 Guidelines)](https://www.wscubetech.com/blog/meta-title-description-length/)
- [Meta Description Length 2026: SEO Best Practices](https://lettercounter.org/blog/meta-description-length-seo-guide/)
- [Complete Web Font Optimization Guide: WOFF2, Subsetting & Performance 2025](https://font-converters.com/guides/web-font-optimization#subsetting-strategies)
- [Font Subsetting Strategies: Content-Based vs Alphabetical](https://cloudfour.com/thinks/font-subsetting-strategies-content-based-vs-alphabetical/)
- [Critical CSS: Faster Above-the-Fold Rendering](https://www.mohtaweb.com/2026/03/critical-css-speed.html)
- [Inlining Critical CSS: Does It Make Your Website Faster?](https://www.debugbear.com/blog/critical-css)
- [Accessible Target Sizes Cheatsheet — Smashing Magazine](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/)
- [Mobile Navigation UX Best Practices 2026](https://www.designstudiouiux.com/blog/mobile-navigation-ux/)
