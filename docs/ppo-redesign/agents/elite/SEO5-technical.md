# SEO5 — Technical SEO, Crawlability, Core Web Vitals

**Page:** `compare-ppo-dental-plans.html`
**Role:** Technical SEO architect (rendering, crawlability, canonical/slash policy, sitemaps, CWV)
**Mode:** Analyze and spec only. No code changes. All findings grounded in real lines.
**Standing rule:** no em-dashes in any shipped copy.

---

## Verdict

This page is closer to crawl-safe than the brief assumed. Several premises in the brief are already resolved on disk and should be downgraded:

- robots.txt **exists** at repo root and points to the sitemap index.
- A sitemap set **exists**: `sitemap-index.xml` -> `sitemap.xml` + `sitemap-content.xml` + `dental/sitemap-dental.xml`. This page is already listed.
- The comparison facts have a **static, crawlable fallback table** (lines 1042 to 1055). Good. That is the SEO-load-bearing content and it ships in raw HTML.

The real, confirmed problems are: (1) a **canonical vs trailingSlash contradiction** that will split or misdirect indexing, (2) the page is **listed twice in the sitemap set with inconsistent slash forms**, (3) **nav/footer/schema are JS-injected** so a no-JS crawl sees no global navigation and no structured data, and (4) a set of **CWV and render-blocking** items. Each is itemized below with line or file location, severity, and whether it is a page edit or a build/generator/config task.

---

## P0 — Canonical and trailing-slash contradiction (indexing risk)

**Issue 1. Canonical says slash, site policy says no-slash.**
- `compare-ppo-dental-plans.html:8` -> `rel="canonical" href="https://www.covercapy.com/compare-ppo-dental-plans/"` (trailing slash).
- `compare-ppo-dental-plans.html:15` -> `og:url` also has the trailing slash.
- `vercel.json` -> `"cleanUrls": true`, `"trailingSlash": false`. With `trailingSlash:false`, Vercel serves the page at `/compare-ppo-dental-plans` (no slash) and will 308-redirect the slash form to the no-slash form.
- **Net effect:** the canonical points at a URL that 308-redirects to a different URL. Google treats a canonical that resolves via redirect as a weak or conflicting signal. The self-referencing canonical is broken.
- **Fix:** make the canonical and og:url match the served, post-redirect URL: `https://www.covercapy.com/compare-ppo-dental-plans` (no trailing slash). Page edit, lines 8 and 15.

**Issue 2. Same URL listed twice in the sitemaps, with mismatched slashes.**
- `sitemap.xml:6` -> `<loc>...//compare-ppo-dental-plans</loc>` (no slash). Correct form.
- `sitemap-content.xml` -> `<loc>...//compare-ppo-dental-plans/</loc>` (trailing slash). Wrong form and a duplicate listing.
- **Net effect:** two sitemap entries for one page, one of which (the slash form) 308-redirects. Wastes crawl budget and sends a conflicting URL form.
- **Fix:** remove the duplicate, slash-suffixed entry from `sitemap-content.xml`; keep the single no-slash entry in `sitemap.xml`. Config/build task (sitemap generator). Confirm whatever generates these sitemaps emits the no-slash form site-wide for `cleanUrls` pages.

**Rule to lock in:** with `cleanUrls:true` + `trailingSlash:false`, the canonical form for every `.html` page is the extensionless, no-slash path. Canonical, og:url, internal links, and sitemap `loc` must all use that one form.

---

## P1 — JS-injected global nav, footer, and schema (no-JS crawl gaps)

**Issue 3. Universal nav is fetched and injected client-side.**
- Mount: `compare-ppo-dental-plans.html:892` -> `<div id="cc-nav-mount"></div>` (empty in source).
- Loader: lines 2379 to 2431 fetch `components/mega-nav.html` and `components/footer.html` and inject via `wrapper.innerHTML` (line 2412), then swap into the mount (lines 2415 to 2416).
- **Net effect:** a crawler that does not execute JS, or fails the two `fetch()` calls, sees no site-wide navigation and no footer link graph from this page. That removes internal-linking equity (the footer builds plan and compare links at lines 1974 to 1975) and weakens crawl discovery. Googlebot does render JS, but render is deferred and fetch-dependent; nav/footer should not depend on it.
- **Fix:** server-render (inline at build time) the nav and footer HTML into `cc-nav-mount` / `cc-footer-mount` so they are present in the raw document. Keep the JS only for interactivity (menu toggles), not for content presence. Build/generator task: the page template should bake `components/mega-nav.html` and `components/footer.html` inline rather than fetching them at runtime. The mount-guard CSS at lines 30 to 31 (`min-height`) can then be dropped since there is no late-load reflow.

**Issue 4. JSON-LD schema is built and injected by JS at runtime.**
- `injectSchema()` lines 1985 to 1997 constructs the `@graph` (Organization, WebSite, Service, Dentist list, Product list, FAQPage, DefinedTermSet, BreadcrumbList) and appends a `<script type="application/ld+json">` to `<head>` (line 1996). Called at line 2309.
- **Net effect:** no structured data exists in the raw HTML. Rich-result eligibility (FAQ, Breadcrumb, Product/Offer) depends on Google completing JS render. This is fragile and forfeits guaranteed parse. The FAQPage and BreadcrumbList especially should be static.
- **Fix:** emit the JSON-LD as a static `<script type="application/ld+json">` block in `<head>` at build time. The plan and dentist data are already known at build (static fallback table at 1046 to 1053; `CURATED` list), so the graph can be serialized server-side. Keep runtime injection only for parts that genuinely depend on live Supabase data, and even then prefer build-time baking. Build/generator task.

**Issue 5. Interactive comparison grid is JS-only, but fallback exists (low severity).**
- `#planGrid` (line 1040) ships the static `<table class="cc-static-cmp">` (1042 to 1055) and JS replaces it (`$('#planGrid').innerHTML=...` at 1520, 1522). `#featTable` (1071) and `#featMobile` (1070) are empty and filled by JS (1693, 1726).
- **Net effect:** the primary comparison facts are crawlable via the static table. The by-feature table at lines 1070 to 1071 has **no static fallback** and is invisible without JS.
- **Fix:** give `#featTable` / `#featMobile` the same treatment as `#planGrid`: ship a static `<table>` of the feature facts as fallback content that JS enhances. Build/generator task (data is the same eight plans). Low priority because the headline facts are already covered, but it closes the gap.

---

## P2 — Core Web Vitals and rendering performance

**Issue 6. Render-blocking Google Fonts stylesheet.**
- Lines 21 to 23: `preconnect` to fonts.googleapis.com and fonts.gstatic.com (good), then a blocking `<link rel="stylesheet" href="...css2?...&display=swap">`.
- `display=swap` is set (good, avoids invisible text), but the stylesheet itself is render-blocking.
- **Fix:** keep `display=swap`. Optionally self-host the two families (Inter, Inter Tight) as `woff2` with `font-display:swap` and a `<link rel="preload" as="font" crossorigin>` for the one or two weights used above the fold, to cut the third-party round trip. Page edit (plus asset hosting). Medium priority.

**Issue 7. Three render-blocking CSS files for nav/footer.**
- Lines 25 to 27: `mega-nav.css`, `mega-nav-mobile.css`, `footer.css` are blocking `<link>`s for components that are themselves injected late.
- **Fix:** once nav/footer are server-rendered (Issue 3), inline the critical nav CSS or load these with the components. Consider merging the three files. Page/build task. Low priority.

**Issue 8. No lazy-loading on injected media; OG image unverified.**
- The static body has no `<img>` in the fold that I can see, but injected nav/footer and the OpenStreetMap dentist tiles (loaded via JS in the dentist section) should carry `loading="lazy"` and explicit `width`/`height` to protect CLS.
- `og:image` (lines 16, 20) points at `/og/compare-ppo-dental-plans.png` — confirm the asset exists and is ~1200x630; a 404 OG image degrades social and is a silent miss.
- **Fix:** add `loading="lazy"` + dimensions to any below-fold imagery in the injected components and dentist cards; verify the OG asset. Build/page task. Low priority.

**Issue 9. Reduced-motion not honored.**
- `html{scroll-behavior:smooth}` (line 63), the TOC progress bar transition (line 151), FAQ open/close grid-row animations (lines 318 to 319), card hover transforms (lines 308 to 310), and tooltip transitions (272 to 273) all animate unconditionally.
- **Fix:** add a `@media (prefers-reduced-motion: reduce)` block that disables `scroll-behavior:smooth` and neutralizes transitions/transforms (`animation:none;transition:none;scroll-behavior:auto`). Page edit (CSS). This is an accessibility + CWV-adjacent fix. Medium priority.

**Issue 10. Mobile rendering is handled but verify tap targets.**
- Mobile passes exist: `@media(max-width:760px)` swaps the feature table for cards (370 to 373), `@media(max-width:600px)` reflows hero, match grid, and compare matrix (434 to 480). Viewport meta is correct (line 5). `--toch:52px` and mobile CTA min-heights (453, 468, 473) mostly meet the 44px+ tap-target floor.
- **Fix:** spot-check that all interactive chips/links in the injected nav meet 44px on mobile once server-rendered. Low priority, mostly already correct.

---

## What needs build/generator vs page edit

**Page edits (this HTML file, safe to hand-edit since it is not under `dental/`):**
- Issue 1: fix canonical + og:url to no-slash form (lines 8, 15).
- Issue 6: font loading optimization (lines 21 to 23).
- Issue 9: add `prefers-reduced-motion` CSS block.
- Issue 7/8: minor CSS/img attributes.

**Build / generator / config tasks:**
- Issue 2: de-duplicate the compare URL and normalize slash form across the sitemap generator (`sitemap.xml` vs `sitemap-content.xml`).
- Issue 3: server-render (bake inline) nav + footer into the page template instead of runtime fetch.
- Issue 4: emit static JSON-LD at build time.
- Issue 5: ship a static fallback for the by-feature table.

Note: per `CLAUDE.md`, files under `dental/` are generated and must never be hand-edited. `compare-ppo-dental-plans.html` lives at repo root and is not generated by `seo-build/generate-plans.js`, so the page edits above are direct. The nav/footer/schema baking would be a change to whatever templating produces this root page (or a one-time manual inline if it has no generator).

---

## Crawl-without-JS checklist (target state)

- [ ] Raw HTML contains the global nav links (server-rendered).
- [ ] Raw HTML contains the footer link graph (server-rendered).
- [ ] Raw HTML contains FAQPage + BreadcrumbList + Product JSON-LD (static).
- [x] Raw HTML contains the comparison facts (static table, lines 1042 to 1055). Already true.
- [ ] By-feature table has a static fallback.
- [ ] Self-referencing canonical resolves with no redirect (no-slash form).
- [x] robots.txt allows crawl and references the sitemap index. Already true.
- [x] Page is in the sitemap. Already true (fix the duplicate slash entry).
