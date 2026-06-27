# Image / Media SEO + Core Web Vitals / Page Experience — CoverCapy PPO Plan Pages

## Current State & Audit Evidence

CoverCapy is an independent dental PPO marketplace: 8 PPO plan pages plus a hub, static server-rendered HTML in a clean healthcare style.

- **Images:** Each plan page has exactly **one image — the carrier logo**. It is **hotlinked from `logo.clearbit.com/{domain}`** with an `onerror` JS fallback to a CSS monogram. It carries `alt` text and `loading="lazy"`.
- **Hub:** 0 images.
- **Page weight:** Lightweight. Mostly HTML/CSS, minimal JS. All UI visuals are CSS-drawn (no heavy media, icons, or background images).
- **Fonts:** Google Fonts web font (Inter), with `preconnect` to the font origins already in place.
- **Accessibility:** Reduced-motion support is implemented.

## Scores & Targets

| Dimension | Current | Target |
|---|---|---|
| Image / Media SEO | 5.5 | **8.0** |
| Core Web Vitals / Page Experience | 8.0 | **9.0** |

## Why It Matters

- **CWV is a confirmed ranking + page-experience signal.** LCP (load), CLS (visual stability), and INP (responsiveness) feed Google's page-experience evaluation and affect real-user UX. Healthcare/insurance shoppers comparing plans bounce on slow or shifting pages.
- **Hotlinked logos are a reliability and SEO liability.** Clearbit can rate-limit, change, or remove a logo, leaving broken images or forced monogram fallbacks. Every page load makes a **third-party request** to a domain CoverCapy doesn't control, and the image is **not indexable as CoverCapy's own asset**.
- **Image search is currently near-zero surface.** Self-hosted, well-named, alt-described logos and per-plan OG images give a small but real image-search/visual presence.

## Image Fixes

1. **Self-host carrier logos (licensed) instead of hotlinking Clearbit.** Download/recreate each carrier logo, confirm usage rights, and serve from CoverCapy's own origin (e.g. `/assets/logos/delta-dental.svg`). Benefits: no broken images, no third-party request on the critical path, no rate-limit risk, and the asset becomes indexable. Prefer **SVG** (carrier logos are vector); fall back to optimized PNG/WebP where only raster exists. Keep the CSS-monogram as a `<noscript>`/build-time fallback rather than relying on runtime `onerror`.
2. **Reserve space to prevent CLS.** Give every logo explicit `width`/`height` attributes (or a CSS `aspect-ratio` box). A late-resolving or fallback-swapped logo currently risks layout shift; a reserved box guarantees CLS stays near zero.
3. **Do NOT lazy-load the above-the-fold logo.** The header carrier logo is almost certainly the **LCP element**. Lazy-loading the LCP image delays LCP. Use `loading="eager"` + `fetchpriority="high"` on the header logo; reserve `loading="lazy"` only for any genuinely below-the-fold imagery.
4. **Descriptive, unique alt text.** Include carrier + plan, e.g. `alt="Delta Dental PPO plan — CoverCapy"`. Avoid generic `alt="logo"`.
5. **(Optional) Per-plan OG/share image.** Ties to the social/Open Graph doc and doubles as an image-search asset. A simple templated card (carrier + plan name) self-hosted at a stable path.
6. **Keep CSS-drawn UI.** This is already correct — no media bloat, no extra requests. Do not regress into icon-image sprites or background images.

## Core Web Vitals Fixes

1. **Optimize the Inter web font.** `preconnect` is good but Inter from Google Fonts still adds a cross-origin round trip and FOIT risk on LCP text. **Self-host the Inter subset** (Latin only) as `woff2`, add `font-display: swap`, and `<link rel="preload" as="font" type="font/woff2" crossorigin>` the one or two weights actually used. This cuts LCP and eliminates blocking on a third party.
2. **Eliminate late-render shift.** Audit the theme toggle and logo swap so neither reflows layout after first paint (reserve logo box per Image fix #2; apply the saved theme via a tiny inline pre-paint script so the toggle doesn't cause a flash/shift).
3. **Keep JS minimal and `defer` non-critical scripts.** Nothing in the critical render path should depend on JS.
4. **Confirm LCP is not JS-gated.** Pages are static/SSR — keep it that way. The LCP element (header logo + heading) must be in the initial HTML with no client fetch required.
5. **Measure and set thresholds.** Use PageSpeed Insights + CrUX field data. Targets: **LCP < 2.5s, CLS < 0.1, INP < 200ms** (all "good"). Verify per template (hub + plan).
6. **Cache + CDN static assets.** Serve logos, font, CSS, JS with long `Cache-Control: max-age` + immutable (hashed filenames) behind a CDN.

## Implementation Notes

- Logos: create `/assets/logos/{carrier}.svg`; replace the Clearbit `src` and `onerror` with the local path; keep monogram as build-time fallback.
- Header logo markup: `<img src="/assets/logos/{carrier}.svg" alt="{Carrier} PPO plan — CoverCapy" width="160" height="40" decoding="async" fetchpriority="high">` (no `loading="lazy"`).
- Font: drop the Google Fonts `<link>`, add self-hosted `@font-face` with `font-display: swap` + preload; remove now-unused Google preconnect.
- Validate CLS/LCP on the hub and one plan page before rolling to all 8.

## Priority & Effort

| Item | Priority | Effort |
|---|---|---|
| Self-host carrier logos (licensed, SVG/optimized) | **P1** | M |
| Header logo eager + `fetchpriority="high"` (not lazy) | **P1** | S |
| Reserve logo dimensions (no CLS) | **P1** | S |
| Self-host + preload Inter subset, `font-display: swap` | **P1** | M |
| Descriptive carrier+plan alt | P2 | S |
| Per-plan OG/share image | P2 | M |
| CDN + cache headers | P2 | S |
| Theme-toggle/no-flash inline script | P2 | S |

## Acceptance Criteria Checklist

- [ ] All carrier logos **self-hosted** (no Clearbit hotlink), licensed, SVG/optimized.
- [ ] Every logo has **explicit width/height (or aspect-ratio)** — no CLS from logo/fallback.
- [ ] Header (LCP) logo is **eager + `fetchpriority="high"`**, never lazy; below-fold media lazy.
- [ ] **Alt text complete and unique** (carrier + plan) on every page.
- [ ] Inter font **self-hosted, subset, `font-display: swap`, preloaded**; no blocking third-party font.
- [ ] CWV thresholds met in field/lab: **LCP < 2.5s, CLS < 0.1, INP < 200ms** on hub + plan pages.
- [ ] LCP is **not JS-gated**; static/SSR render intact.
- [ ] Static assets served with **long-cache + CDN**.
- [ ] (Optional) Per-plan **OG/share image** present and self-hosted.
