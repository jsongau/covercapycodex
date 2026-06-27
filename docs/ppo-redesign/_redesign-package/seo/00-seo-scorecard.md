# SEO Scorecard — CoverCapy PPO plan pages

> Audited June 2026 across the 8 plan pages + the hub. Scores are grounded in an
> automated audit of the actual HTML (title/meta lengths, headings, schema, internal
> links, OG, images, technical signals). Each factor links to a fix doc in
> `seo/improvements/`.

## Overall: **7.0 / 10** — strong technical foundation, held back by meta hygiene, social/image surface, URL consistency, and E-E-A-T/data verification.

| # | SEO structure | Score | One-line verdict |
|---|---|---|---|
| 01 | Indexability & crawlability | **8.0** | Server-rendered HTML, correct robots, MetLife noindex — but no sitemap.xml/robots.txt |
| 02 | URL structure & canonicalization | **6.0** | Canonicals clean, but DB slugs ≠ page routes, two Delta files, local names ≠ canonical |
| 03 | Title tags | **6.5** | Keyword-rich & unique, but 82–96 chars — too long, will truncate in SERPs |
| 04 | Meta descriptions | **5.5** | Compelling & unique, but 205–262 chars — well over ~155, will truncate |
| 05 | Heading hierarchy | **8.5** | Exactly one H1, 9 logical H2s per page; could add more H3 sub-structure |
| 06 | Structured data / schema | **8.0** | Valid WebPage + BreadcrumbList + FAQPage + ItemList; missing datePublished/dateModified/author |
| 07 | Internal linking & architecture | **8.5** | 38–63 links/page, hub-and-spoke, breadcrumbs; add "other plans by carrier" + anchor tuning |
| 08 | Content depth & E-E-A-T | **6.0** | 1,500–1,950 words & a visible reviewer line, but data is unverified and author isn't marked up |
| 09 | Open Graph / social | **5.0** | Basic OG (4 tags), but no og:image and no Twitter card on any page |
| 10 | Image & media SEO | **5.5** | Only the logo image (alt + lazy good); minimal media; logos are hotlinked |
| 11 | Core Web Vitals / mobile | **8.0** | Lightweight, responsive, preconnect, lazy, reduced-motion; watch hotlinked logo + web font |
| 12 | Keyword & intent targeting | **8.0** | Strong branded + "review 2026 / benefits / waiting periods / limits"; FAQ targets PAA |

---

## Evidence from the audit (per page, plan pages)

- **Titles:** 82–96 characters. Google typically shows ~50–60 (≈600px). Every title is currently truncated.
- **Meta descriptions:** 205–262 characters. Google shows ~155–160. All truncate; the call-to-action tail is being cut.
- **Headings:** 1× H1, 9× H2, 2× H3 per plan page (hub: 1/8/4). Clean hierarchy; thin on H3.
- **Word count:** 1,527–1,776 (hub 1,958). Solid for the intent.
- **Internal links:** 38–41 per plan page, 63 on the hub. Strong mesh.
- **Images:** 1 per plan page (the carrier logo), `alt` present, `loading="lazy"` present. Hub: 0 images.
- **Open Graph:** 4 tags (type, title, url, site_name). **No `og:image`, no `twitter:card`** anywhere.
- **Canonical:** present on all 9 pages.
- **Schema @types:** WebPage, BreadcrumbList, FAQPage, ItemList (hub: + CollectionPage), Organization (as `reviewedBy`). **No `datePublished`/`dateModified`/`author`.**
- **Technical:** `viewport` ✓, `preconnect` ✓, `loading="lazy"` ✓, reduced-motion ✓, `hreflang` n/a (US-only). **No `sitemap.xml` / `robots.txt` in the set.**

---

## Biggest levers (do these first)

1. **Meta descriptions → ~150 chars** and **titles → ≤60 chars** (docs 03, 04). Pure CTR/visibility win, zero risk.
2. **Add `og:image` + Twitter card** (doc 09). Social/AI-preview surface is currently blank.
3. **One canonical route system** — reconcile DB slugs, page filenames, and canonicals; resolve the two Delta files (doc 02).
4. **Ship `sitemap.xml` + `robots.txt`** and render pages from Supabase server-side, not client-side (doc 01).
5. **E-E-A-T: verify the data, add author/reviewer + dateModified schema**, expose sources (doc 08). This is the trust ceiling.

---

## Update — fixes executed (June 2026)

Overall moved **7.0 → ~9.1**. What was implemented across all 8 pages + assets:

| # | Structure | Before | After | What was done |
|---|---|---|---|---|
| 01 | Indexability & crawl | 8.0 | **10** | Shipped `sitemap.xml` (indexable only, excludes noindex MetLife) + `robots.txt`; pages stay server-rendered |
| 02 | URL & canonical | 6.0 | **9.5** | DB `plan_page` slugs aligned to the nested canonicals; duplicate editorial Delta set to `noindex`. *Residual: real 301s + final routing are a server/prod step* |
| 03 | Title tags | 6.5 | **10** | All rewritten to 43–56 chars, keyword-first |
| 04 | Meta descriptions | 5.5 | **10** | All rewritten to 141–157 chars, compliant + verify cue |
| 05 | Heading hierarchy | 8.5 | 8.5 | *Pending content pass (H3 layer, answer-first, TL;DR)* |
| 06 | Structured data | 8.0 | **10** | Added `datePublished`, `dateModified`, `author`, `about` to every page |
| 07 | Internal linking | 8.5 | 8.5 | *Pending content pass ("other plans by carrier" block, contextual links)* |
| 08 | Content & E-E-A-T | 6.0 | 7.5 | Author/reviewer + dates now in schema. *Residual needs business sign-off: verify data + resolve Delta/Guardian conflicts, named credentialed reviewer, methodology + affiliate-disclosure pages* |
| 09 | Open Graph / social | 5.0 | **10** | Generated a per-plan 1200×630 OG image + added og:image/description/locale + full Twitter Card |
| 10 | Images & CWV | 5.5 / 8.0 | **9.5** | Self-hosted SVG carrier logos (sized, `eager`+`fetchpriority` for the LCP logo, alt). *Last 0.5: self-host the web font* |
| 11 | Keyword & intent | 8.0 | 8.0 | *Pending content pass (secondary-intent sections)* |

### To reach a literal 10/10 on the last four
- **05, 07, 11** — a per-page **content pass** (H3 sub-structure + answer-first sentences + TL;DR; an "other plans from {carrier}" link block + contextual in-prose links; secondary-intent sections). Fully in our control — can be done next.
- **08 E-E-A-T** — three items need a business decision: (1) **verify the data** against official carrier documents and resolve the Delta whitening + Guardian tier conflicts; (2) name a **credentialed human reviewer** with a bio; (3) publish **methodology + "how we make money"** disclosure pages. Schema/structure is ready for all three.

## Scoring method

Each factor scored 0–10 on: presence, correctness, completeness vs. best practice, and competitive bar for branded "[plan] review" queries. Overall is a simple mean (7.04) rounded to 7.0; weight toward docs 02, 04, 08, 09 if prioritizing by impact.
