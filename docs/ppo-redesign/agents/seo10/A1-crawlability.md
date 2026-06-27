# A1 — Technical Crawlability and No-JS Rendering

**Page:** `compare-ppo-dental-plans.html` (repo root, 2,446 lines)
**Role:** SEO Architect 1 of 10 — technical crawlability and rendering.
**Mode:** Analyze and spec only. No prototypes, no shipped code. All findings grounded in current line numbers (file re-read 21 June 2026; the prior elite memos' line numbers have drifted, so the refs below supersede them).
**Standing rule:** no em-dashes in any shipped copy.

---

## 0. What this memo adds on top of the prior pass

The elite pass already argued the crawlability thesis well. I am not repeating it. This memo (a) re-grounds every claim on the CURRENT line numbers, (b) corrects three things the prior memos got wrong because the file changed under them, and (c) gives one new, decisive implementation lever the prior pass did not have: a lean static nav file already exists on disk.

Three corrections to the prior memos, confirmed by re-reading the file and disk:

1. **Canonical is ALREADY fixed.** SEO5 P0/Issue 1 claimed the canonical carries a trailing slash that contradicts `vercel.json`. It does not anymore. Line 8 is now `href="https://www.covercapy.com/compare-ppo-dental-plans"` (no slash) and line 15 `og:url` matches. With `cleanUrls:true` + `trailingSlash:false` in `vercel.json`, this is now the correct self-referencing form. **Downgrade SEO5 Issue 1 to resolved.**

2. **SEO3's static schema block is now WRONG in the opposite direction.** SEO3 wrote every `@id`/`url` with a trailing slash (`.../compare-ppo-dental-plans/`) to match what was then the canonical. Since the canonical is now the no-slash form, that schema block, if pasted as-is, would split the entity. **Any static JSON-LD must use the no-slash page URL** to byte-match the live canonical at line 8.

3. **`components/mega-nav.html` is 359 KB on disk.** Inlining the full mega-nav into the page (as SEO5 Issue 3 implied) would balloon the document and wreck the very CWV the prior pass wanted to protect. There is a better asset: `components/nav-static.html` (5.9 KB) already exists. The spec below routes around the 359 KB file.

What is already correct and must be preserved (do not regress):

- The **sticky console TOC with all dropdowns is server-rendered static HTML** (lines 901 to 972). Every carrier-plan, Delta, glossary, and Explore link is a real `<a href>` in the raw byte stream. This is the page's entire authority spine and it is already crawlable without JS. Keep it server-rendered; never move it into a JS render path.
- The **comparison facts ship as a static `<table class="cc-static-cmp">`** (lines 1047 to 1060), with eight plans, all eight columns of facts, a `<caption>`, and seven in-table plan links via `<th scope="row"><a>`. This is the SEO-load-bearing content and it is present with no JS. JS replaces it at line 1532. Keep the static table.
- `robots.txt` allows `/` and points to `sitemap-index.xml` (confirmed). `vercel.json` is internally consistent on the URL form.

---

## 1. The no-JS render gap, by section (current line refs)

A crawler reads the raw byte stream and does not run the fetch/inject scripts. On this page that splits content into three tiers:

| Section / asset | Raw HTML state | Where filled by JS | Crawl status no-JS |
|---|---|---|---|
| Console TOC + all dropdowns | static `<a href>` | n/a | crawlable (good) |
| Comparison facts | static `<table>` (1047 to 1060) | replaced at 1532, 1534 | crawlable (good) |
| Global mega-nav | empty `<div id="cc-nav-mount">` (898) | fetch + inject (2394, 2417 to 2429) | invisible |
| Global footer | empty `<div id="cc-footer-mount">` (1280) | fetch + inject (2395) | invisible |
| JSON-LD `@graph` | none in `<head>` | built by `injectSchema()` (1997 to 2008), appended at 2008, called at 2321 | invisible |
| By-feature table | empty `<table id="featTable">` (1076) + empty `#featMobile` (1075) | filled 1705, 1738 | invisible |
| By-treatment grid | empty `<div id="treatGrid">` (1113) | filled 1969 from `TREATMENTS` (1944) | invisible |
| By-situation grid | empty `<div id="situationGrid">` (1123) | filled 1978 from `SITUATIONS` (1945), click-only, no anchors | invisible AND no links |
| Articles grid | empty `<div id="artGrid">` (1174) | filled 1984 | invisible |
| Footer plan/compare links | empty `#footPlans` / `#footCompare` | filled 1986, 1987 | invisible |

---

## 2. Priority-ordered spec

### P0 — Server-render the global nav and footer into the raw document

**Why first:** these two empty mounts (lines 898, 1280) carry the site-wide internal-link graph and the footer plan/compare links (built at 1986 to 1987). Today both depend on two `fetch()` calls (2421) that a no-JS crawler never makes; if either fetch fails, the page also degrades for users. NAV2 already flagged that any link living only in the nav/footer is uncrawlable from this page.

**Spec, page-level (this file is NOT under `dental/`, so it is hand-editable):**

1. **Nav:** inline `components/nav-static.html` (5.9 KB) directly into `#cc-nav-mount` at line 898, replacing the empty div with the static markup. Do NOT inline `mega-nav.html` (359 KB); it would bloat the document and hurt LCP. The 359 KB interactive mega-nav can still hydrate on top via JS for users (the existing loader at 2391 to 2429), but the static fallback must be the no-JS source of truth for the link graph. Confirm `nav-static.html` contains the canonical site links (plans hub, find-a-dentist, glossary, home) as real `<a href>`; if it is thinner than the mega-nav's link set, add the missing high-value links so the raw nav is a complete crawl surface.
2. **Footer:** inline `components/footer.html` (19 KB, reasonable size) into `#cc-footer-mount` at line 1280, replacing the empty div. Then the JS that fills `#footPlans` (1986) and `#footCompare` (1987) becomes enhancement, not the only source. Bake those plan/compare links as static `<a href>` too, since the plan set is known at build (eight plans, same as the static table).
3. **Drop the mount-guard CSS** at lines 30 to 33 (`#cc-nav-mount{min-height:72px}` etc.) once content is present, since there is no longer a late-load reflow to guard against.
4. **Reconcile the loader (2391 to 2429):** with content already in the mounts, the loader must not blow it away. Either (a) point the loader only at the mega-nav hydration and have it replace the static nav in place, or (b) gate the loader so it skips a mount that already has children. Avoid double-render flicker.

**Separate this into page vs build:** the inlining itself is a page edit. If this root page is ever templated, the inline step belongs in the template so it survives regeneration. Today there is no generator for this root page (only `seo-build/generate-plans.js` for `/dental/`), so it is a direct, durable page edit.

### P0 — Server-render the JSON-LD schema as a static block in `<head>`

**Why P0:** all structured data is built by `injectSchema()` (1997 to 2008) and appended at runtime (2008). The raw `<head>` has zero JSON-LD, so FAQ, Breadcrumb, and ItemList rich-result eligibility depends on Google completing a deferred render pass, and Bing, social unfurlers, and LLM crawlers see nothing.

**Spec:**

1. Place a single static `<script type="application/ld+json">` immediately after the canonical (line 8). Reuse the `@graph` body the prior pass drafted in `SEO3-schema.md` (Organization, WebSite + SearchAction, WebPage, BreadcrumbList, ItemList of 8 plans as `Thing` with no Offer/price, FAQPage with all 9 Q and A, DefinedTermSet of 22 terms).
2. **Correction vs SEO3:** rewrite every page-scoped `@id`, `url`, and `mainEntityOfPage` to the NO-slash form `https://www.covercapy.com/compare-ppo-dental-plans` to byte-match the current canonical (line 8). SEO3's draft used the trailing-slash form, which is now wrong.
3. Remove the `injectSchema()` call at line 2321 and delete the function body (1997 to 2008). Grep for `injectSchema` and any `createElement` of `application/ld+json` after removal; expect zero.
4. Keep the visible FAQ (`FAQS`), glossary (`GLOSS`/`TIPS`), and plan list as the JS render source for users, but treat the static `<head>` JSON-LD as a hand-maintained mirror: any edit to those arrays must update the static block in the same commit (build-step candidate, section 4).

### P1 — Static fallback for the by-feature table

**Why P1:** `#featTable` (1076) and `#featMobile` (1075) are empty in raw HTML and only filled by JS (1705, 1738). The headline comparison facts are already crawlable via the static table at 1047 to 1060, so this is the gap-closer, not the primary content.

**Spec:** ship a static `<table>` inside `.feat-tbl-scroll` (line 1076) as fallback, the same pattern `#planGrid` already uses (static table that JS replaces at 1532). The data is the same eight plans plus the feature dimensions (waiting periods per tier, day-one flags, year-2 step-ups). JS then replaces it for the interactive sort. Page edit.

### P1 — Static `<a href>` for the by-situation and by-treatment sections

**Why P1:** `#situationGrid` (1123) is filled at 1978 as click-only `<div class="pc">` with no anchors at all (NAV2 Class C). The four life-event spokes (no-waiting-period, immediate-coverage, between-jobs, self-employed) exist on disk and are linked statically in the Explore dropdown (957 to 960), so they are not orphaned, but the situation section itself contributes zero crawlable links. `#treatGrid` (1113) is filled at 1969 from `TREATMENTS` (1944).

**Spec:**

1. **Situations:** render the situation cards as static `<a href>` to the four segment pages alongside the interactive filter (the `applySituation` handler at 1979 can coexist on the same anchors). Page/build edit.
2. **Treatments:** `TREATMENTS` (line 1944) points at eight `/best-dental-insurance-for-*` routes. NAV2 confirmed these have NO folder on disk: they are both invisible to crawlers AND 404 for users. Do NOT ship live static links to a 404. Either build those pages first (out of scope here) or repoint to live routes (relevant glossary terms or plan pages). Once they resolve, server-render them as static `<a href>` out of the JS path. Build/content task gated on the target pages existing.

### P2 — Render-blocking and CWV (carried from SEO5, lower priority)

- Render-blocking Google Fonts stylesheet at lines 21 to 23 (`display=swap` already set, good). Optional: self-host Inter and Inter Tight woff2 with `font-display:swap` and preload the one or two above-fold weights.
- Three blocking CSS files (`mega-nav.css`, `mega-nav-mobile.css`, `footer.css`) for components that load late. Once nav/footer are inlined, inline the critical nav CSS or merge these.
- No `prefers-reduced-motion` block; `scroll-behavior:smooth` and the various transitions animate unconditionally. Add a `@media (prefers-reduced-motion: reduce)` neutralizer.
- Add `loading="lazy"` + explicit `width`/`height` to any below-fold imagery in the inlined footer and the dentist cards to protect CLS. Verify `og:image` `/og/compare-ppo-dental-plans.png` exists at ~1200x630.

---

## 3. Already static (confirmed, do not touch)

- Console TOC + all dropdown link blocks: lines 901 to 972. Server-rendered `<a href>`.
- Comparison facts table: lines 1047 to 1060. Server-rendered `<table>` with caption, 8 rows, 8 columns, 7 in-table plan links.
- Canonical (line 8) and og:url (line 15): correct no-slash form, matching `vercel.json`.
- `robots.txt` and `sitemap-index.xml` wiring: present and correct.

---

## 4. Page-level vs build/generator separation

**Page edits (direct on this file; it is not generated):**
- Inline `nav-static.html` into `#cc-nav-mount` (898) and `footer.html` into `#cc-footer-mount` (1280); reconcile loader (2391 to 2429); drop mount guards (30 to 33).
- Add static JSON-LD after line 8 with no-slash `@id`s; remove `injectSchema` (call 2321, body 1997 to 2008).
- Add static fallback `<table>` for `#featTable` (1076).
- Static `<a href>` situation cards (1123 area).
- Font loading, `prefers-reduced-motion`, lazy-load attributes (P2).

**Build / config / content tasks:**
- Repoint or build the eight `/best-dental-insurance-for-*` treatment pages before shipping live treatment links (NAV2 3c).
- A small build step that regenerates the static `<head>` JSON-LD from the same `FAQS`/`GLOSS`/plan arrays, so schema parity is enforced rather than hand-maintained.
- Sitemap dedup: confirm the page appears once, in no-slash form, across the sitemap set (SEO5 Issue 2).

---

## 5. Crawl-without-JS checklist (target state)

- [ ] Raw HTML contains the global nav links (inline `nav-static.html`, NOT the 359 KB mega-nav).
- [ ] Raw HTML contains the footer link graph (inline `footer.html` + static `#footPlans`/`#footCompare`).
- [ ] Raw HTML `<head>` contains Organization, WebSite, WebPage, BreadcrumbList, ItemList, FAQPage, DefinedTermSet JSON-LD, all `@id`s in NO-slash form.
- [x] Raw HTML contains the comparison facts (static table, 1047 to 1060). Already true.
- [ ] By-feature table has a static fallback (1076).
- [ ] By-situation cards are static `<a href>` to the four segment pages.
- [ ] By-treatment links are static AND resolve (gated on target pages existing).
- [x] Self-referencing canonical resolves with no redirect, no-slash form (line 8). Already true.
- [x] robots.txt allows crawl and references the sitemap index. Already true.
- [ ] `injectSchema()` removed; zero runtime `application/ld+json` creation remains.
