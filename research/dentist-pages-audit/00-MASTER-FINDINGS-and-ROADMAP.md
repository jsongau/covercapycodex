# Dentist Pages: Master Audit and Roadmap

Date: 2026-06-26
Scope: all 11,396 `/dental/` pages (T3 state through T6 dentist), the 22-page legacy `/dentists/` tree, the started Delta carrier silo, and the new `/dentist` national hub.
Source of truth for `/dental/` output: `seo-build/generate-plans.js` (gitignored, Mac-only, regenerate after edits). Direct-editable now: `vercel.json`, `sitemap.xml`, `dentist.html`, robots.txt.

---

## The headline

The dentist pages have a strong structured-data foundation, but four things hold them back: (1) a review-count integrity bug that fabricates data, (2) the differentiating content on dentist profiles is JavaScript-only so crawlers and AI cannot see it, (3) heavy title/meta duplication with no "near me" or year targeting, and (4) the new `/dentist` hub and the carrier silo are not wired into the link graph yet. Fixing the generator once fixes all 11,396 pages.

---

## P0 — do first (correctness, compliance, crawl waste)

1. **Fabricated review count (compliance risk).** `generate-plans.js` line ~1259, the metro-hub ItemList emits `reviewCount: d.google_review_count || 1` and gates on rating alone. An office with a rating but zero reviews gets a fake `reviewCount: 1`. This violates Google's structured-data policy and the CLAUDE.md no-fabricated-reviews rule, and risks a manual action. Fix: gate on `weighted_rating > 0 && google_review_count > 0` and drop `|| 1` (match the city-page guard).

2. **Legacy `/dentists/` tree (duplicate content).** 22 pages, all self-canonical to their own `/dentists/` URL, indexable, internally linked, and one is in `sitemap.xml`. They duplicate `/dental/` profiles. Fix: 301 `/dentists/*` to the `/dental/` equivalents in vercel.json (per-profile rules first for slug drift, then a catch-all), remove the `/dentists/` loc from sitemap.xml, rewrite internal `href="/dentists/"` links to `/dental/`, then delete the folder once reprocessed.

3. **Duplicate Nevada tree.** `/dental/nv/` (~280 pages) mirrors `/dental/nevada/`, both self-canonical, `nv` links into itself. Fix: 301 `/dental/nv` and `/dental/nv/:rest*` to `nevada`, make `stateSlug("Nevada")` emit `nevada`, delete `dental/nv/`. Scan for other abbreviation twins.

4. **Stale `/dentists/` paths still generated.** 21 hub files contain 40 live `/dentists/` links (texas/central-texas has 20). Fix the URL builders to use parts only, add a build-fail assertion on the literal `/dentists/`, rebuild.

---

## P1 — high SEO value

5. **Server-render the dentist-profile content.** On all ~10,647 T6 pages the listed carriers, treatments, hours, and the "nearby offices" rail are injected from an inline JS object / Supabase fetch into empty containers, so the static HTML ships without the page's differentiators. Crawlers and AI see a near-empty profile. Fix: in the generator, render carriers and treatments as static `<a>`/text and replace the JS `#nearby-grid` with a server-rendered nearby-dentist block (the builder already receives `cityDentists`).

6. **Wire up the `/dentist` hub and silos.** The new hub has zero static inbound links and the generator never references it. Fix: insert `Find a Dentist` (`https://www.covercapy.com/dentist/`) as breadcrumb position 2 on every tier (visible + JSON-LD, shift the rest +1), and have `/dentist` link down to every state, carrier, and treatment hub. This routes equity from 6,400+ pages into the hub and back.

7. **Title/meta/H1 rewrite (34% are duplicates, 96% over length).** Among 10,647 T6 pages only ~66% have unique titles; 96% of titles exceed 60 chars, ~99.8% of metas exceed 155; zero use a year token, only 11 contain "near", none "near me", none carrier-scoped. Adopt per-tier templates:
   - T3 state: `{N}+ PPO Dentists in {State} ({YEAR}) | CoverCapy`
   - T4 metro: `{N} Best PPO Dentists Near {Market}, {ST} ({YEAR})`
   - T4c city: `{N} Best PPO Dentists in {City}, {ST} ({YEAR})`
   - T6 dentist: `{Name} | PPO Dentist in {City}, {ST} | CoverCapy` (add neighborhood/doctor differentiator to kill the 34% collisions)
   - Add `const SEO_YEAR = new Date().getFullYear()` and render `(${SEO_YEAR})` on hubs. This also removes the existing em-dash title violations.

8. **Breadcrumb label parity and bugs.** Visible breadcrumb text differs from the JSON-LD on every tier (e.g. visible `{City}` vs schema `{City} PPO Dentists`); Google requires exact parity. Also the T5 city page emits the metro `item` without a trailing slash (line ~1509), a schema/visible mismatch and redirect target. T6 uses a non-microdata breadcrumb component. Fix: compute one canonical label per tier, used in both visible and schema; unify T6 onto the microdata `<ol>`; add trailing slash. Canonical chain: CoverCapy > Find a Dentist > {State} PPO Dentists > {Market} PPO Dentists > {City} PPO Dentists > {Practice}.

9. **Tail dentists are static-orphans.** Only the top 20 offices per city get a crawlable link; the rest rely on the JS map and sitemap. Fix: render all city offices as static links (or paginate statically), and the server-rendered nearby rail from item 5 gives dentist-to-dentist crawl paths.

---

## P2 — structure and depth

10. **Regional (T3.5) hubs are the weakest tier:** no ItemList, no FAQPage, thin one-sentence prose, and a data bug where the SoCal hub lists only 1 of ~5 child metros (LA/San Diego/Inland Empire orphaned from the region). Fix the region-to-metro mapping and enrich these hubs (ItemList + FAQ + prose).

11. **Metro to city pill links lack a trailing slash** (line ~1272) while canonicals have it, so every metro-to-city internal link is a 301 hop. One-line fix.

12. **Sitemap only has ~700 hub URLs** of 11,396 on disk; ~10,600 dentist pages are not submitted. Emit a sharded sitemap index covering T6.

13. **E-E-A-T:** "Last updated" uses the build date as a verification date (misleading), no author/medical reviewer, no licensing/NPI signal, and `dateModified` resets every build. Add a real reviewer/last-checked model and a compact key-facts table for AI extraction; make FAQ answers less template-identical across offices.

14. **Doubled city slugs** like `/chicago/chicago/` are intentional (metro hub vs city page) and self-canonical correctly, but risk thin near-duplication. Differentiate the copy (metro area vs city proper); only 301 city-to-metro where the metro has a single child city.

---

## Carrier silo (the started Delta work)

Two artifacts exist. The real started silo is `dental-insurance/delta-dental/find-a-dentist/index.html` and it is about 90 percent done and high quality: jade hero, two free-verify CTAs, an answer-first snippet block, a PPO/Premier/DeltaCare explainer, a 4-step verify HowTo, 10 California city cards, FAQ accordion, sources, and a full JSON-LD graph (WebSite, WebPage, BreadcrumbList, FAQPage, HowTo, ItemList). The other file `docs/ppo-redesign/carrier-delta.html` is a plan-comparison preview, not the silo (and has a stray bug linking to spoke-guardian.html).

Three gaps on the Delta page: it lists no real named in-network offices (punts to the JS app), its city cards are California-only and do not link into the static `/dental/` tree, and no T6 page links back up to it.

Recommended system (no new tree, reuses existing slots):
- C1 national, one per carrier: `/dental-insurance/{carrier}/find-a-dentist/` (clone the Delta page for the other 9). Keeps it separate from the plan-comparison `/dental-insurance/ppo-plans/{carrier}/` tree.
- C2 per city: `/dental/{state}/{city}/{carrier}-dentists/` with real in-network offices and CollectionPage + ItemList + FAQPage schema. `{carrier}-dentists` is a reserved leaf that cannot collide with a dentist slug.
- Repoint `dentist.html`'s carrier grid from the plan pages to the C1 pages.
- Title/H1 formula: `{Carrier} PPO Dentists Near {City}, {ST} ({YEAR})`, H1 leads with a live in-network count (the main anti-thin token competitors use). Use exact network names: Delta PPO and Premier, MetLife PDP Plus, Cigna DPPO, Guardian DentalGuard Preferred, UHC Dental PPO, Aetna PDN, Humana Dental PPO, Ameritas Classic.
- Winnability: Guardian, Humana, Ameritas are least saturated (best openings); Cigna, MetLife, Aetna medium; Delta hardest on the head term but winnable on city long-tail.
- Rollout: Phase 1 = 10 national C1 pages (Delta done, finish the rest). Phase 2 = generate C2 city-by-carrier pages via a new `buildCarrierCityPage()` and `--carrier-pages` flag in the generator, gated to cities with at least 4 in-network offices to avoid soft-404s, top metros by top carriers first. Phase 3 = link T6 network pills up to C2.

---

## What can be done now vs on your Mac

Direct edits I can make in this session (no Supabase needed): vercel.json redirects (legacy `/dentists/`, `nv` to `nevada`, vanity `/dentist` redirects), remove the `/dentists/` URL from sitemap.xml, repoint `dentist.html` carrier grid, finish the 9 non-Delta C1 carrier landing pages by cloning the Delta page, and remove the GSC placeholder from find-my-dentist.html.

Edits that require the generator and a Mac rebuild (sandbox cannot reach Supabase): the review-count fix, server-rendering dentist content and the nearby rail, the `/dentist` breadcrumb insertion sitewide, the title/meta/H1 templates, label parity, the regional-hub data bug, trailing-slash fixes, full sitemap, and the C2 carrier-city generator. I can write all of these into `seo-build/generate-plans.js` so you just run the build on your Mac.

---

## Research index (research/dentist-pages-audit/)
01 dentist profile (T6) audit · 02 hub tiers audit · 03 legacy /dentists/ tree · 04 carrier silo design · 05 breadcrumb schema parity · 06 duplicate/canonical/crawl · 07 title/meta/H1 quality · 08 internal linking graph · 09 competitor carrier pages · 10 review/E-E-A-T/GEO
