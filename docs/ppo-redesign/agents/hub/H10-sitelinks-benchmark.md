# H10 — Competitive SERP / Sitelinks Benchmark

**Goal:** Make a "covercapy insurance" brand search render a rich SITELINKS block (structured sub-links) supporting the whole site — like the Abri Dental brand result (Meet the Dentists / About / Locations / Services / FAQ). Main hub = Compare PPO Plans, branching to carrier plan pages, the Delta sub-hub, and the glossary.

**Honesty up front:** Google sitelinks are 100% algorithmic and automated. There is no markup, schema, or Search Console toggle that forces them. Per Google's official docs (last updated 2025-12-10): *"At the moment, sitelinks are automated... If the structure of your site doesn't allow our algorithms to find good sitelinks, or we don't think the sitelinks are relevant for the user's query, we won't show them."* We can only raise the **odds** by giving Google a clean, unambiguous site structure to choose from. The single biggest prerequisite: **CoverCapy must rank #1 for its own brand query** "covercapy" / "covercapy insurance." Sitelinks only appear under a dominant brand result.

---

## 1. What Google officially says (source of truth)

From [Google Search Central — Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks), the only four levers Google publishes:

1. **Informative, relevant, compact page titles and headings.** Each candidate page needs a distinct `<title>` and a clear `<h1>`.
2. **Logical site structure that's easy to navigate**, with important pages linked from other relevant pages.
3. **Concise, relevant internal-link anchor text** matching the destination page.
4. **Avoid repetition in content** (duplicate titles/boilerplate confuse the selection).

Removal is the only direct control: `noindex` or delete a page to drop it as a sitelink candidate.

**Implications Google does NOT state but the SEO field consensus adds** (ahrefs, Semrush, SE Ranking):
- A persistent, **text-based global nav** (not images, not JS-only) is how Google "reads" your top sections.
- **Footer links** to section pages reinforce the candidate set.
- **Breadcrumbs** explicitly signal hierarchy and feed sitelink anchor text.
- Keep hierarchy shallow (~3 levels to key sections).
- Link candidate pages **from the homepage** with descriptive anchors.

---

## 2. Benchmark — how 3–4 sites earn their sitelink blocks

### A. Abri Dental (the brand-result template we want to imitate)
A small multi-location dental brand whose brand SERP shows the classic sub-link block: **Meet the Dentists / About / Locations / Services / FAQ / Contact**.
- **Why it works:** tiny, flat site (~6–8 canonical pages), one page per concept, each a top-nav item with a distinct title. There is essentially nothing else for Google to pick — the candidate set IS the nav. Persistent header nav + footer repeat the same 6 labels site-wide.
- **Lesson for CoverCapy:** a *focused* set of 6–8 strong, consistently-linked top pages out-performs 6,400 thin pages competing for the slots. Sitelinks favor clarity over volume.

### B. NerdWallet (large finance comparison)
Brand SERP typically surfaces high-traffic hub verbs: **Credit Cards / Banking / Mortgages / Loans / Investing / Insurance**.
- **Why it works:** a stable, category-level global nav that mirrors their URL taxonomy (`/credit-cards/`, `/banking/`...). Each category is a true hub with massive internal-link prominence (linked from every article and the homepage). Google picks the *category hubs*, never individual articles, because the hubs are the most-linked, best-titled nodes.
- **Lesson:** Google promotes the **most internally-linked hub nodes**, not leaf pages. CoverCapy's sitelink candidates should be its hubs (Compare PPO Plans, Find a Dentist, Glossary, Delta), not T5 dentist leaves.

### C. eHealth (insurance marketplace brand)
Brand SERP commonly shows **Medicare / Individual & Family / Dental / Vision / Small Business / Log In**.
- **Why it works:** product-line nav that maps 1:1 to commercial intent pages, each with a clean product title. "Log In" appearing shows Google also rewards utility/account pages users click often.
- **Lesson:** sitelink labels should match what brand searchers actually want next (verify coverage, compare plans, find a dentist), not internal jargon.

### D. Healthline / WebMD-type health hub (contrast case)
Brand SERPs lean to topic hubs (Symptoms / Conditions / Drugs A–Z / Find a Doctor).
- **Lesson:** even content-heavy sites get only **hub-level** sitelinks. The "Find a Doctor" tool consistently earns a slot because it's a single, heavily-linked, clearly-titled utility page — the direct analog of CoverCapy's **Find a Dentist**.

**Pattern across all four:** sitelinks = the handful of pages that are (1) in a stable text global nav, (2) linked from the homepage with clear anchors, (3) uniquely and descriptively titled, and (4) the most internally-linked nodes. None used schema to get them.

---

## 3. CoverCapy sitelink candidate set (target 6–8)

The pages we want Google to choose for the "covercapy insurance" block:

| # | Candidate page | Suggested nav/anchor label | Suggested `<title>` lead | Why it's a candidate |
|---|----------------|----------------------------|--------------------------|----------------------|
| 1 | Compare PPO Plans (main hub) | **Compare PPO Plans** | "Compare PPO Dental Plans" | Primary commercial hub; must be the strongest node |
| 2 | Find a Dentist | **Find a Dentist** | "Find a PPO Dentist Near You" | Utility/tool page (eHealth/Healthline pattern) |
| 3 | Plans by Carrier | **Plans by Carrier** | "PPO Dental Plans by Carrier" | Hub branching to all carrier plan pages |
| 4 | Delta Dental hub | **Delta Dental** | "Delta Dental PPO Plans" | High brand-search volume sub-hub |
| 5 | Glossary | **Insurance Glossary** | "Dental Insurance Glossary" | Informational anchor; distinct intent |
| 6 | How We Rate | **How We Rate** | "How We Rate Dentists" | Trust/about page (Abri "About" analog) |
| 7 | Browse by State / Locations | **Browse by State** | "PPO Dentists by State" | Geo hub entry into the 6,400 pages |
| 8 | (optional) Verify / Get Covered | **Get Covered** | "Verify Your PPO Coverage" | Conversion utility ("Log In" analog) |

Google will pick ~4–6 of these. The job is to make this exact set the *unmistakable* candidate pool.

---

## 4. Prioritized action list (raise sitelink eligibility)

**P0 — prerequisites (without these, no sitelinks ever appear)**
1. **Own the brand SERP.** Rank #1 for "covercapy" and "covercapy insurance." Ensure homepage title leads with the brand, `Organization` schema with `name`/`url`/`sameAs`, and consistent NAP/brand mentions. Submit homepage in Search Console.
2. **Single canonical homepage** that links — in visible body text with descriptive anchors — to all 6–8 candidate pages. The homepage is the strongest sitelink-selection signal.

**P1 — structural (the levers Google names)**
3. **Persistent, identical, text-based global nav** in the `<header>` on EVERY page (homepage, hubs, T4, T5) exposing the same ~6–8 candidate labels. No JS-only menus, no image links, no per-template variation. *This is the #1 differentiator from current state — kill any duplicate/placeholder nav.*
4. **Footer link block** repeating the same candidate section links site-wide (reinforces the candidate set).
5. **Unique, compact, descriptive `<title>` + single `<h1>` per candidate page** (see table). No two candidates share a title; strip boilerplate prefixes that cause repetition.
6. **Breadcrumbs everywhere** with `BreadcrumbList` schema (already on T5) — extend the visible breadcrumb + schema to hubs and T4. Breadcrumbs feed sitelink hierarchy and anchor text.

**P2 — internal-link prominence & hygiene**
7. **Consistent anchor text** for each candidate across the site (always "Compare PPO Plans," never mixing "Compare Plans" / "PPO Comparison" / "Plans"). Mixed anchors dilute the signal.
8. **Boost internal-link count to the 6–8 hubs**: link them from T5 pages, city/metro hubs, and the glossary — making them the most-linked nodes (NerdWallet pattern).
9. **De-duplicate / prune.** Remove or `noindex` placeholder pages, empty nav stubs, and near-duplicate hubs so Google's candidate pool is clean. Avoid repeated content/titles across the 6,400 pages competing for slots.
10. **Sitemap clarity.** Keep the main hubs in a small high-priority sitemap (or top of `sitemap-dental.xml`) distinct from the 6,400 leaf pages; ensure all 6–8 candidates are indexed and return 200.

**P3 — monitor (no direct control)**
11. Watch Search Console "Links" + brand-query SERP screenshots monthly. If a wrong page appears as a sitelink, `noindex`/remove it. If none appear, the gap is almost always brand-rank or nav inconsistency, not markup.

---

## 5. Honest expectation setting
- There is **no schema, structured-data type, or API** that produces organic sitelinks. (Google Ads "sitelink assets" are paid and unrelated.)
- Timeline is weeks-to-months after the structure is clean and brand rank is solid; Google re-evaluates on its own cadence.
- The realistic win is the Abri-style sub-link block for the *brand* query — achieved by making CoverCapy's structure look as flat and unambiguous as Abri's, scaled to ~8 hubs, while the 6,400 SEO pages sit clearly *below* them in the hierarchy.

---

## Sources
- [Google Search Central — Learn About What Sitelinks Are](https://developers.google.com/search/docs/appearance/sitelinks) (official, last updated 2025-12-10)
- [Ahrefs — What Are Sitelinks, Their Benefits & How To Influence Them](https://ahrefs.com/blog/sitelinks/)
- [Semrush — What Are Sitelinks? How to Get Them & Why They Matter](https://www.semrush.com/blog/sitelinks/)
- [SE Ranking — Google Sitelinks: How to Make Them Appear in Your Snippet](https://seranking.com/blog/google-sitelinks/)
- [Search Engine Journal — Website Navigation: Best Practices for Users and SEO](https://www.searchenginejournal.com/technical-seo/website-navigation/)
- [The HOTH — 7 SEO Ideas from Inside NerdWallet's Content Strategy](https://www.thehoth.com/blog/nerdwallet-seo/)
- [Abri Dental — Meet The Dentists (brand-result template example)](https://abridental.com/meet-the-dentists/)
