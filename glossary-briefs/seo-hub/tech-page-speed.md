# Page Speed and Core Web Vitals: SEO Impact for CoverCapy

**Brief type:** Technical SEO  
**Applies to:** All CoverCapy pages — T5 dentist profiles, T4/T3 hub pages, compare-ppo-dental-plans.html, landing pages  
**Date:** June 2026

---

## What Core Web Vitals Are and Why They Matter in 2026

Core Web Vitals are three browser-measured signals that Google uses as a ranking input within its Page Experience framework. The three metrics are:

- **LCP (Largest Contentful Paint):** How fast the biggest visible element on the page renders
- **CLS (Cumulative Layout Shift):** How much the page jumps around after initial render
- **INP (Interaction to Next Paint):** How quickly the page responds to clicks, taps, and keystrokes

Google evaluates each at the **75th percentile** of real Chrome User Experience Report (CrUX) data. A page must serve 75% of real visits inside the "good" range to pass.

---

## Official Thresholds for 2026

These are unchanged from 2025. Published sources that claim a tighter 2.0s LCP threshold is now in force are not confirmed by Google documentation.

| Metric | Good | Needs Improvement | Poor |
|--------|------|--------------------|------|
| LCP | under 2.5 seconds | 2.5s to 4.0s | over 4.0s |
| INP | under 200ms | 200ms to 500ms | over 500ms |
| CLS | under 0.1 | 0.1 to 0.25 | over 0.25 |

**Practical targets for CoverCapy:** Treat 2.0s LCP as the internal target, 200ms INP as non-negotiable, and 0.05 CLS as the goal. Passing the published thresholds is the floor, not the goal.

**INP replaced FID (First Input Delay) in March 2024.** INP measures all interactions throughout the page lifetime, not just the first one. This is the metric most sites are currently failing: 43% of pages globally still do not pass "good" INP as of mid-2026.

---

## Page-Type Targets: Compare Page vs. Landing Pages

CoverCapy has two distinct page weight profiles.

### Compare page (compare-ppo-dental-plans.html, approximately 2,000 lines)

This page carries color theme toggling, hover tooltips on plan feature cells, and potentially client-side data calls. It is the heaviest page in the site.

| Metric | Target | Risk Level |
|--------|--------|------------|
| LCP | under 2.0s | Medium. Hero section must render before JS finishes executing |
| INP | under 150ms | High. Three JS patterns on this page each threaten INP independently |
| CLS | under 0.05 | Medium. Feature table rows and tooltip content can shift layout on load |

### T5 dentist profile pages (static HTML, approximately 65 KB each)

These are the highest-volume pages. They are served as pre-rendered static files with all content baked in at build time. No client-side API call is in the critical render path.

| Metric | Target | Risk Level |
|--------|--------|------------|
| LCP | under 1.5s | Low. Static HTML delivered from Vercel edge. Main risk is hero image priority |
| INP | under 200ms | Low-Medium. Only risk is the verify and exit modal JS |
| CLS | under 0.05 | Low-Medium. Map tile and nearby-offices rail need reserved space |

### Hub pages (T3, T3.5, T4a, T4b, T4c)

These are also static HTML with dentist card grids. Lighter than T5 pages because they have no embedded modal wizards.

| Metric | Target | Risk Level |
|--------|--------|------------|
| LCP | under 1.5s | Low |
| INP | under 200ms | Low. Minimal JS |
| CLS | under 0.05 | Low. Dentist cards all same height, rendered server-side |

---

## How Google Weights Page Experience in Rankings

The ranking weight is real but secondary. Google's own documentation (updated December 2025) states directly:

> "Google Search always seeks to show the most relevant content, even if the page experience is sub-par. But for many queries, there is lots of helpful content available. Having a great page experience can contribute to success in Search, in such cases."

Page Experience operates as a **tiebreaker** between pages that are otherwise comparable on content quality and authority. It does not override a relevance deficit. Pages at position 1 are roughly 10% more likely to pass Core Web Vitals than pages at position 9 (Advanced Web Ranking, 3 million pages studied), but this is a correlation: well-resourced sites tend to invest in both content and performance.

The practical implication for CoverCapy is favorable. Because the site is static HTML on Vercel's edge network, CWV scores are structurally strong. WordPress-based dental practice sites (the primary competitor category) pass CWV at approximately 46% on mobile. CoverCapy static pages should pass at 95%+. In a competitive local search result where multiple dental directories list the same practice, the page experience tiebreaker will favor CoverCapy.

### The Named Signal Is Deprecated

The "Page Experience" ranking system as a discrete named signal was deprecated in 2023. Core Web Vitals remain as individual signals feeding into Google's overall quality assessment, but there is no single "Page Experience score" being applied. Optimizing for each metric independently is the correct framing.

---

## Healthcare and Insurance Vertical Considerations

Google does not apply stricter CWV numeric thresholds to YMYL (Your Money Your Life) pages. The published thresholds are universal. However, YMYL classification does activate elevated E-E-A-T scrutiny that operates alongside and independently of CWV.

For dental insurance content specifically, the relevant Google behavior is:

- **December 2025 Core Update** caused significant ranking volatility in health and insurance content (volatility score 8.7 out of 10). Sites penalized had thin templated pages and AI-generated content without clinical or professional oversight. Recovery timelines were 6 to 12 months.
- **E-E-A-T is the gate; CWV is the tiebreaker.** A page that passes CWV but lacks demonstrated expertise, credible business identity, or accurate data gets filtered by E-E-A-T first. A page that passes both gets the full benefit.
- For CoverCapy specifically, the financial-decision tier of YMYL scrutiny (insurance selection) matters more than the clinical-advice tier. Key E-E-A-T signals: verified practice data, accurate NAP (name, address, phone), transparent business identity, and a clear privacy policy covering insurance data handling.

**AI citation behavior:** Sites with all three CWV passing show approximately 3x higher citation rates in AI Overview results compared to poor-performing sites in the same topical category. The mechanism is indirect: fast static pages with clean HTML are more reliably crawled, indexed, and extractable by AI retrieval systems. CoverCapy's architecture is already optimized for this.

---

## Performance Risk 1: Color Theme Toggling

The compare page's light/dark or color scheme toggle is one of the three high-risk INP patterns on the site.

**What goes wrong:** When JavaScript toggles a class on `document.body` (e.g., `body.classList.toggle('dark')`), the browser must recalculate styles for every DOM element that could match any CSS rule referencing the toggled class. On a large page, this style invalidation scope can cover hundreds of elements. The result is a Presentation Delay spike inside the INP measurement window, pushing interaction latency well above 200ms.

The second mechanism is CSS custom property propagation. Changing `--teal-night` or `--cream` on `:root` propagates style recalculation down to every element that references those properties via `var()`. Without `@property` registration with `inherits: false`, this is effectively a full-document recalculation.

The third mechanism is forced reflow. If any code in the same event handler reads a layout property (`getBoundingClientRect()`, `offsetHeight`, `clientWidth`) after changing a class, the browser must synchronously flush the pending style work before answering. This converts an asynchronous render operation into a blocking one.

**Fix approach:**

Apply the theme class to a narrower container (`<main>` or `<article>`) rather than `<body>`. Fewer descendant elements means a cheaper recalculation scope.

Register CSS custom properties that do not need to cascade:

```css
@property --surface-bg {
  syntax: '<color>';
  inherits: false;
  initial-value: #FFFDF8;
}
```

Batch all DOM reads before writes:

```javascript
// Read first
const h = el.getBoundingClientRect().height;
// Then write
container.classList.toggle('jade');
```

Where the theme does not need to be user-switchable at runtime, use `prefers-color-scheme` media queries instead of JS class toggling. The browser handles it with no JavaScript execution at all.

---

## Performance Risk 2: Hover Tooltips

Hover tooltips on the compare page's plan feature table have two INP exposure points.

**Critical clarification:** `mouseover` and `mouseenter` events are not themselves observed by INP. INP only measures clicks, taps, and keystrokes. A pure CSS hover tooltip (`:hover` + pseudo-element) has zero INP impact. The risk is indirect.

**What goes wrong:** If a `mouseover` JavaScript handler is executing on the main thread at the exact moment a user clicks, the click event queues behind the hover task. The Input Delay phase of INP accumulates the remaining hover task time before the click can even begin processing. Tooltip handlers that do positioning work (read `getBoundingClientRect`, write `style.left`, read again to adjust for viewport edge) are a classic layout-thrash pattern. Each read-after-write forces a synchronous layout pass, extending Processing Time for any overlapping click.

Tooltip DOM insertion is a second issue. Inserting a tooltip node into the DOM during or just before a click includes that insertion in the current frame's layout pass. On a large DOM, each insertion extends Presentation Delay.

**Fix approach:**

Use CSS-only tooltips wherever possible. Toggle `visibility` and `opacity` rather than inserting and removing DOM nodes:

```css
.tooltip { visibility: hidden; opacity: 0; }
.tooltip-trigger:hover .tooltip { visibility: visible; opacity: 1; }
```

Toggling `visibility` or `opacity` is compositor-only, with no layout or style recalculation of surrounding elements.

When JS positioning is unavoidable, batch all reads before all writes:

```javascript
// Read all measurements first
const rect = trigger.getBoundingClientRect();
const vpWidth = window.innerWidth;
// Then write all styles
tooltip.style.left = `${rect.left}px`;
tooltip.style.top = `${rect.bottom + 8}px`;
```

Debounce `mouseover` handlers to prevent task accumulation during pointer movement.

---

## Performance Risk 3: Client-Side Supabase API Calls

This is only relevant if Supabase data fetching is ever moved into the browser. Currently, all Supabase queries run at build time inside `seo-build/generate-plans.js` on Node.js, and the results are baked into static HTML. This is the correct and safe pattern.

**What would go wrong if Supabase were called in the browser:** The `@supabase/supabase-js` v2 client bundle is 98.2 KB minified (25.2 KB gzip). On mid-range Android, parse and execution time is 200 to 600ms. On top of the bundle cost, a client-side query adds a cold DNS lookup (20 to 100ms), TLS handshake (50 to 200ms), and query round-trip to Supabase's Postgres instance in its AWS region (50 to 300ms depending on user geography). Total critical-path penalty: 200 to 600ms additional LCP delay, fully sequential.

The specific pattern to avoid: fetching the nearby offices rail client-side at page load. The rail cards would be invisible until the entire API waterfall completes, pushing LCP far past the 2.5s threshold.

**What `fetch()` itself does not do:** The network request does not block the main thread. The risk is entirely in the response callback. If the callback iterates over a large result set and builds DOM synchronously, it creates a long task. Any user click during that task is delayed by however long the remaining callback work takes.

If client-side Supabase fetching is ever added to T5 pages (for example, to load nearby-offices dynamically), the response callback must yield to the main thread between iterations:

```javascript
const { data } = await supabase.from('dentists').select('*');
for (const row of data) {
  buildCard(row);
  // Yield between cards so clicks are never blocked
  if ('scheduler' in self && 'yield' in scheduler) {
    await scheduler.yield();
  } else {
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
```

`scheduler.yield()` (Chrome 129+, approximately 71% browser support as of mid-2026) places the continuation at the front of the task queue so it resumes immediately after any pending input events are processed.

---

## LCP Risks on the Compare Page

The compare page is a single HTML file with approximately 2,000 lines and significant inline JavaScript. The four LCP subparts and their exposure are:

| Subpart | Budget (2.5s total) | Compare Page Risk |
|---------|---------------------|-------------------|
| Time to First Byte | 1,000ms | Low. Vercel edge delivers fast TTFB |
| Resource load delay | 250ms | Medium. Large inline JS can hide LCP element from preload scanner |
| Resource load duration | 1,000ms | Low if hero is text, Medium if it is an image |
| Element render delay | 250ms | High. Main thread blocked by JS initialization code |

The largest controllable risk is Element Render Delay. Any synchronous `<script>` block that runs before the LCP element is visible delays paint. The theme toggle initialization, tooltip binding, and plan comparison logic all execute on the main thread. If these run before the browser can paint the hero section, they directly inflate LCP.

**Priority fixes for the compare page:**

- Move all non-critical script blocks to the end of `<body>` or add `defer`
- Add `fetchpriority="high"` to any hero image
- Add `<link rel="preload">` for Fraunces and Inter Tight font files

---

## CLS Risks Across the Site

CLS events occur when visible elements shift position after initial render because new content was injected above them or because dimensions were not reserved.

**Map tile on T5 pages:** The OpenStreetMap tile `<img>` uses an `onerror` handler to hide the row if the tile server is unavailable. This means the browser renders the image container at full height, then collapses it to zero on error (or the reverse). Always set explicit `width` and `height` attributes on the `<img>` so the space is reserved regardless of load outcome.

**Nearby offices rail:** If this section's cards are rendered via JS after page load (rather than baked in at build time), the container must have a pre-reserved `min-height` matching the expected card height. Without reservation, the rail injection shifts everything below it.

**Google Fonts (Fraunces, Inter Tight):** If loaded with `font-display: swap`, the browser renders text in a fallback font first, then re-renders in the final font when it arrives. On large H1 hero text, this text reflow shifts surrounding layout and can add 0.05 to 0.15 to the CLS score. Fix: add `<link rel="preload">` for both font files so they are available before first paint.

**Modal overlay on desktop:** Modals that add `overflow: hidden` to `<body>` cause the scrollbar to disappear, shifting the viewport width by 15 to 17px. This is a measurable CLS event on pages where the scrollbar was present. Fix: add `padding-right` equal to the scrollbar width when the modal opens, or use `overflow: overlay` where supported.

---

## Structural Advantage: Static HTML vs. Competitors

This is worth stating explicitly because it has direct business value.

WordPress-based dental practice websites (the dominant competitor architecture) pass Core Web Vitals at approximately 46% on mobile. The median mobile LCP for WordPress pages is 3.1 seconds. React-based spa competitor sites average 3.6 seconds LCP and approximately 35% CWV pass rate.

CoverCapy's T5 pages are pre-rendered static HTML served from Vercel's edge network. The median LCP for well-built static HTML is 0.4 to 0.9 seconds. Pass rates exceed 95%.

This gap is structural, not something competitors can close with minor optimizations. It requires them to adopt a fundamentally different architecture, which most dental practice sites cannot practically do. CoverCapy wins the Page Experience tiebreaker by default against nearly every dental practice site in any given local market.

---

## Priority Action List

Ordered by impact-to-effort ratio:

1. **Add `fetchpriority="high"` to the hero `<img>` on T5 pages.** One attribute change, up to 800ms LCP improvement. Already has a documented path in `buildDentistPage()`.

2. **Set explicit `width` and `height` on the OpenStreetMap map tile `<img>`.** Prevents CLS from the `onerror` hide behavior. One line change.

3. **Move compare page JS to end of `<body>` or add `defer` attributes.** Reduces Element Render Delay. Theme toggle and tooltip binding do not need to run before first paint.

4. **Add `<link rel="preload">` for Fraunces and Inter Tight.** Prevents font-swap CLS on the hero H1. Applies to compare page and landing pages.

5. **Convert compare page tooltips to CSS-only where possible.** Eliminates JS-tooltip-related INP risk without sacrificing UX.

6. **Register color scheme CSS custom properties with `@property inherits: false`** for any property that does not need to cascade. Reduces style recalculation scope on theme toggle.

7. **Do not add Supabase JS client to any browser bundle.** Keep all Supabase queries at build time. If nearby-offices dynamic loading is ever added, use `scheduler.yield()` in the callback.

8. **Pre-reserve `min-height` on the nearby offices rail container** if the rail is ever switched to client-side rendering.

---

## Sources

- Google Search Central: [Understanding page experience](https://developers.google.com/search/docs/appearance/page-experience) (updated December 10, 2025)
- Google Search Central: [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) (updated December 10, 2025)
- web.dev: [Interaction to Next Paint (INP)](https://web.dev/articles/inp) (updated September 2025)
- web.dev: [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp) (updated March 2025)
- web.dev: [Optimize INP](https://web.dev/articles/optimize-inp) (updated September 2025)
- web.dev: [Use scheduler.yield() to break up long tasks](https://developer.chrome.com/blog/use-scheduler-yield)
- web.dev: [DOM size and interactivity](https://web.dev/articles/dom-size-and-interactivity)
- DebugBear: [2025 In Review: What's New In Web Performance](https://www.debugbear.com/blog/2025-in-web-performance) (updated February 2026)
- DebugBear: [Are Core Web Vitals a ranking factor?](https://www.debugbear.com/docs/core-web-vitals-ranking-factor)
- DebugBear: [How To Fix Forced Reflows And Layout Thrashing](https://www.debugbear.com/blog/forced-reflows) (December 2025)
- HTTP Archive CrUX data: mobile/desktop CWV pass rates (October 2025)
- Advanced Web Ranking: Core Web Vitals position 1 vs. position 9 study (3M pages)
- Bundlephobia: [@supabase/supabase-js bundle size](https://bundlephobia.com/package/@supabase/supabase-js)
- Igalia: [CSS Custom Properties Performance](https://blogs.igalia.com/jfernandez/2020/08/13/improving-css-custom-properties-performance/)
- Paul Irish: [Properties that force layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
- Direction.com: [Healthcare SEO Trends 2025-2026](https://direction.com/resources/healthcare-seo-trends/)
- webvitals.tools: [Core Web Vitals Update 2026](https://webvitals.tools/blog/google-core-web-vitals-update-2026/)
- webvitals.tools: [How AI Search Engines Evaluate Web Performance](https://webvitals.tools/blog/ai-search-web-performance/)
