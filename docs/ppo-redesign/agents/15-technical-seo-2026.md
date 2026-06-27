# Agent 14 / 15 — 2026 Technical-SEO Architect

> Memo for the CoverCapy PPO hub-and-spoke redesign.
> Scope: the live `/compare-ppo-dental-plans.html` (intended master hub) and the
> `_redesign-package` ZIP (8 spoke pages + comparison hub + sitemap/robots/SEO docs).
> Lens: protect what the ZIP already does well technically; fix what the live hub does badly.
> Guidance is grounded in current Google Search Central docs (March 2026), not folklore.

---

## Verdict: **6.5 / 10** (the *combined* current state)

The live hub and the ZIP are technically split-brained. The ZIP is a **strong** server-rendered foundation that scores ~8–9.5 on its own audit. The **live hub is the technical liability**: its plan facts and its entire JSON-LD graph exist only after JavaScript runs. The score is a blend pulled down by that one structural flaw plus a real canonical/trailing-slash conflict. Fix render-path + canonical consistency and this is a 9.

---

## 1. What the ZIP already does well — DO NOT LOSE THIS

The founder's fear ("too basic / worse than current") is misplaced on the technical axis: the ZIP is *more* technically correct than the live page. The redesign must **inherit the ZIP's render model**, not regress to the live page's.

Confirmed strengths to preserve:

1. **Server-rendered HTML.** ZIP spoke pages and the ZIP comparison hub (`_redesign-package/compare-ppo-dental-plans.html`) carry the comparison table, plan cards, premiums, annual maximums, deductibles, coverage tiers, waiting periods, and network names **in the source HTML**, not injected by JS. JavaScript only enhances sort/filter and the compare tray (`#tray`, `window.__applySticky`). This is the single most important property and it is already correct in the ZIP. (Google: "server-side or pre-rendering is still a great idea... not all bots can run JavaScript.")
2. **Static JSON-LD.** The ZIP hub ships a real `<script type="application/ld+json">` block in the HTML (line ~837), so schema is present without rendering.
3. **`sitemap.xml`** exists, lists only indexable routes (hub + 7 live plans), carries `lastmod` per URL — and correctly **excludes the noindex MetLife NCD page**.
4. **`robots.txt`** exists, `Allow: /`, points to the sitemap, and **does not block** the MetLife page (so its `noindex` meta can actually be read — a subtle, correct call).
5. **Per-page `noindex,follow` on MetLife NCD** — under-review plan kept crawlable and linkable but out of the index. Textbook.
6. **`<link rel="canonical">` on every ZIP page**, clean nested URL family (`/dental-insurance/ppo-plans/{carrier}/{plan}/`), one H1 each, breadcrumb schema, lazy images, `preconnect`, reduced-motion.

**Mandate: the rebuilt hub must match the ZIP's render contract — full plan facts and JSON-LD in View Source with JS disabled.** Do not let the rebuild "modernize" back into a JS-only shell.

---

## 2. The big problem — the LIVE hub's plan facts + schema are JS-only

This is the headline issue and it is real, not theoretical.

- **Plan data:** `let PLANS=[]; loadPlans()` does `fetch('plans.json')` with an inline `#plans-data` fallback, then every plan card, the comparison table (`#featTable`), Smart Match verdicts, and the footer plan links are written via `innerHTML` *at runtime* (lines ~1150–1156, 1376–1581, 1829). **View Source contains no premiums, no annual maximums, no waiting periods, no plan names in crawlable text.**
- **Schema:** `injectSchema()` (lines ~1840–1852) builds the entire `@graph` (Organization, WebSite, Service/OfferCatalog, Product offers, FAQPage, Breadcrumb, glossary) as a string and does `document.head.appendChild(script)` on load. **There is no JSON-LD in the static HTML at all.**

Why this matters in 2026:
- Google *can* render JS (evergreen Chromium), but rendering is a **deferred, best-effort second pass** that can lag and can be skipped on non-200 or `noindex` pages. Relying on it for your money facts is the property's #1 risk.
- **AI / answer crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) largely do NOT execute JavaScript.** For them this page is a blank shell — which directly undercuts the redesign's AI-answerability goals.
- The internal-link footer (`#footPlans`) is JS-generated, so spoke discovery from the hub is JS-dependent too.

**Fix (P0):** the new hub must server-render (build-time static generation or SSR/ISR from the canonical plan source) every plan fact and a static JSON-LD block. JS may still power sort/filter/Smart Match/compare — but as *enhancement over* server-rendered content, exactly as the ZIP hub already does.

---

## 3. Canonical / trailing-slash conflict — real, shipping-blocking

`vercel.json` sets **`"trailingSlash": false`** and `"cleanUrls": true`. But:
- the live hub's canonical is `https://www.covercapy.com/compare-ppo-dental-plans/` (**trailing slash**);
- the ZIP `sitemap.xml` and all spoke canonicals use **trailing-slash** nested URLs (`/dental-insurance/ppo-plans/uhc/primary-dental/`).

With `trailingSlash:false`, Vercel will **308-redirect the slash URL to the non-slash version**, so the canonical points at a URL the host actively redirects away from. That is a self-inflicted canonical/redirect mismatch. Pick ONE trailing-slash policy and make `vercel.json`, every `<link rel=canonical>`, the sitemap, and all internal `<a href>`s agree. (Recommend: keep trailing slashes for the directory-style `ppo-plans` family and flip `vercel.json` to `trailingSlash:true`, OR drop slashes everywhere — but be consistent.)

Also: live hub canonical is `www.`; confirm one host (`www` vs apex) is canonical site-wide with a 301 to it, and that the sitemap host matches.

---

## 4. Other findings (priority-tagged)

| # | Issue | Pri | Fix |
|---|---|---|---|
| 4.1 | Live hub plan facts JS-only (§2) | **P0** | Server-render facts + static JSON-LD |
| 4.2 | Live hub JSON-LD JS-injected (§2) | **P0** | Emit JSON-LD in static `<head>`; if JS-built, keep it identical to a server copy and ensure single graph |
| 4.3 | Trailing-slash / canonical / `vercel.json` conflict (§3) | **P0** | One slash policy across vercel.json, canonicals, sitemap, internal links |
| 4.4 | Hash anchors as nav targets | **P1** | Section IDs (`#compare`, `#shelf`, `#plan-{key}`) are fine for *on-page* anchors, but never make a *page/view* reachable only via `#`. All cross-page nav must be real `<a href>` (Google: use History API, not fragments, for distinct content). Add `scroll-margin-top` for the sticky header. |
| 4.5 | Duplicate filter / sort URLs | **P1** | Sort/filter/compare-tray state must NOT create crawlable indexable URL variants. Keep filter state in JS/`?param` that is either self-canonicalized to the clean hub or `Disallow`ed. Live `robots.txt` already blocks `*?*add=` — extend the same discipline to any new `?sort=`/`?compare=` params, and self-reference canonical regardless of query string. |
| 4.6 | Two Delta files in ZIP (`delta-ppo-premium.html` + `-healthcare.html`) | **P1** | One canonical Delta URL; set the editorial duplicate to `noindex` (ZIP SEO doc already flags this) and/or 301. Avoid two indexable pages for one plan (cannibalization). |
| 4.7 | DB slug ≠ page route (ZIP audit doc 02) | **P1** | Align the canonical plan source's `slug` to the nested route so routes/sitemap/canonical never drift. Add a build check. |
| 4.8 | No `datePublished` / `dateModified` / `author` in schema | **P1** | Add to every page; drive `dateModified` from `verified_at` (also feeds sitemap `lastmod`). Supports E-E-A-T + freshness. |
| 4.9 | Titles 82–96 chars, metas 205–262 chars (live + original ZIP) | **P1** | ZIP fix pass already rewrote to ~43–56 / ~141–157 chars. Apply the same to the rebuilt hub. CTR-only, zero risk. |
| 4.10 | No `og:image` / Twitter card (original) | **P2** | ZIP pass added 1200×630 per-plan OG + Twitter card. Carry into hub; matters for social + AI previews. |
| 4.11 | Hotlinked carrier logos + web font (CWV/LCP) | **P2** | ZIP pass self-hosted SVG logos with `fetchpriority`. Self-host the web font (last 0.5 on CWV). Protects LCP/CLS. |
| 4.12 | Status codes for SPA-ish states | **P2** | Any "plan not found" / empty Smart Match state must not be a soft-404. Real missing routes return 404; don't render thin JS shells at 200. |
| 4.13 | Sitemap host/freshness | **P2** | Sitemap uses `www.covercapy.com`; ensure it matches the canonical host and is referenced from the production root `robots.txt`. Regenerate `lastmod` from data, not by hand. |
| 4.14 | Mobile-first indexing parity | **P2** | Google indexes the mobile rendering. The mobile comparison pattern (horizontal scroll cards, `mobEl`) must contain the **same** plan facts and links as desktop — no content hidden or dropped on mobile. Tap targets ≥24px, no JS-only reveal of indexable facts. |
| 4.15 | Change-monitoring | **P2** | Add: a build-time test that fails if any plan fact differs across hub card / table / spoke / schema (no-data-drift); post-deploy Search Console monitoring (Coverage, "Crawled – currently not indexed", Core Web Vitals report); periodic `view-source:` + Rich Results Test check that facts render JS-off; uptime/status-code monitor on the canonical URLs. |

---

## 5. Prioritized fix list

**P0 — blocks a correct redesign**
1. Server-render all plan facts on the hub (build-time static or SSR/ISR), JS as enhancement only — match the ZIP's render contract.
2. Emit JSON-LD as a static `<head>` block (single `@graph`), not `appendChild` on load.
3. Resolve the trailing-slash/canonical/`vercel.json` conflict; one slash policy everywhere; one canonical host with a 301.

**P1 — ship before/at launch**
4. Real `<a href>` for all cross-page nav; `scroll-margin-top` for anchors; History API not fragments for distinct views.
5. Control filter/sort/compare URL variants (self-canonical or disallow); never create uncontrolled indexable dupes.
6. Collapse the two Delta files to one indexable URL (noindex/301 the other).
7. Align DB slug ↔ route ↔ sitemap ↔ canonical; build-time drift check.
8. Add `datePublished`/`dateModified`/`author` schema; drive dates from `verified_at`.
9. Titles ≤60 / metas ~150 chars on the rebuilt hub.

**P2 — quality / durability**
10. `og:image` + Twitter card; self-host logos + font (LCP/CLS); soft-404 hygiene; mobile-desktop content parity; no-data-drift test + Search Console / CWV / status-code monitoring.

---

## 6. Acceptance gates (technical)
- [ ] `view-source:` (JS disabled) on the hub shows plan names, premiums w/ qualifiers, annual maximums, deductibles, coverage tiers, waiting periods, network names, internal links, and a JSON-LD block.
- [ ] One trailing-slash policy; canonical = served URL (no redirect on the canonical); one host.
- [ ] Sitemap lists only indexable URLs, excludes noindex pages, `lastmod` from data; referenced in root `robots.txt`; MetLife noindex not robots-blocked.
- [ ] No JS-only indexable facts; all cross-page nav is `<a href>`.
- [ ] Filter/sort/compare states create no uncontrolled indexable URLs.
- [ ] Rich Results Test passes on rendered HTML; build fails on cross-surface data drift.

---

## Sources
- Understand the JavaScript SEO basics — https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics (last updated 2026-03-04)
- Fix search-related JavaScript problems — https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript
- URL canonicalization / consolidate duplicate URLs — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Redirects and Google Search — https://developers.google.com/search/docs/crawling-indexing/301-redirects
- Build and submit a sitemap — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Robots meta tag / noindex — https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Mobile-first indexing — https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- Core Web Vitals — https://developers.google.com/search/docs/appearance/core-web-vitals
- Generate structured data with JavaScript (and test it) — https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
- Internal source files reviewed: `compare-ppo-dental-plans.html` (live, lines ~1150–1156, 1376–1581, 1829, 1840–1852); `_redesign-package/compare-ppo-dental-plans.html`; `_redesign-package/sitemap.xml`; `_redesign-package/robots.txt`; `_redesign-package/seo/00-seo-scorecard.md`; `_redesign-package/seo/improvements/01-indexability-crawlability.md`; `vercel.json`.
