# Delta Dental Cluster — Technical + CTR Audit (100x Plan)

**Scope:** 11 pages under `/dental-insurance/ppo-plans/delta-dental/`
**Audited on disk:** 2026-06-25
**Goal:** 30-day, 100x growth. Core problem from GSC: impressions, **0 clicks**. That is a SERP-snippet (title/meta) and position problem, not a content-volume problem.

---

## 0. Headline diagnosis (the 0-click story)

GSC last 24h: every query has impressions, **zero clicks**. The queries are mostly *competitor / near-me* terms — `aetna dental direct preferred ppo` (6), `ncd complete by metlife` (6), `humana extend 5000` (5), `delta dental` (1), `delta dentist near me` (1), `dentist that take delta dental near me` (1), `primestar care complete` (1).

Three root causes, in priority order:

1. **Titles do not match the searcher's intent or contain a click hook.** The near-me queries (`delta dentist near me`, `dentist that take delta dental near me`) have **no matching page** — they surface the hub or premium page whose titles say "Inside Delta Dental: Plans, Networks, Eligibility & Reviews," which reads like an encyclopedia entry, not "find a dentist near you." No reason to click over Delta.com or a maps result.
2. **Trailing-slash / cleanUrls conflict** (see §4) — canonicals and the sitemap use trailing slashes, but `vercel.json` sets `trailingSlash: false`. Google may be indexing a URL that 308-redirects, which depresses position and can split signals.
3. **Cannibalization + weak differentiation** — `/compare/` and `/inside/is-delta-good/` lead with the *same* phrase "Is Delta Dental Good Insurance?", so Google has two pages competing for one query and trusts neither.

The competitor queries (aetna/humana/metlife/ameritas) are NOT Delta pages — they belong to the sibling carrier pages. They are listed here only as context; the Delta cluster will not win them. The winnable Delta demand is `delta dental`, `delta dentist near me`, `dentist that take delta dental near me` — and **we have no near-me page**. That is the single biggest growth gap (see §3 and §6).

---

## 1. Per-page audit table

| # | Page | Current `<title>` | Meta (chars) | H1 | ~words | Links out (`<a>`) | Links to hub? | Key issues |
|---|------|-------------------|--------------|-----|--------|-------------------|---------------|------------|
| 1 | `/delta-dental/` (hub) | Inside Delta Dental: Plans, Networks, Eligibility & Reviews \| CoverCapy | 258 ❌ way over | Inside Delta Dental | ~2,351 | 35 | n/a (is hub) | Meta **258 chars** (truncates ~hard). Title is a directory label, no CTR hook for `delta dental`. Links to all 10 children ✅. Links FMD x3 ✅. |
| 2 | `/premium/` | Delta Dental PPO™ Individual Premium Plan: Coverage, Cost & Adult Ortho · CoverCapy | 247 ❌ | Delta Dental PPO™ Individual Premium Plan | ~5,095 | 58 | ✅ | Strongest page (5k words, Product+Offer schema). Meta too long. Title 80+ chars, truncates. `™` wastes pixels. Missing OG tags ❌. |
| 3 | `/compare/` | Is Delta Dental Good Insurance? Delta Dental vs Other PPO Plans · CoverCapy | 248 ❌ | Is Delta Dental good insurance? Compare it, plan by plan. | ~2,224 | 17 | ✅ | **Title collides with #11** (`is-delta-good`) → cannibalization. Only schema: FAQ (no Breadcrumb/WebPage). 0 FMD links. |
| 4 | `/over-65/` | SCAN Health Plan Delta Dental Benefit, California & Washington (65+) · CoverCapy | 240 ❌ | On SCAN in CA or WA? Your dental is Delta Dental. | ~1,347 | 22 | ✅ | Title is hyper-niche (SCAN only) — misses broad `delta dental seniors / medicare` demand. 0 FMD links. |
| 5 | `/uc-students/` | UC SHIP Dental and Delta Dental: Find a Dentist Near Your UC · CoverCapy | 196 ❌ | Your UC student dental is Delta Dental | ~1,648 | 38 | ✅ | **11 broken internal links** → `/students/uc-*` and `/uc-dental-access/` do not exist on disk (orphan-target / soft-404 risk). 0 FMD links. |
| 6 | `/inside/individual-plans/` | Delta Dental Individual Plans: Premium vs Basic \| Inside Delta Dental · CoverCapy | 227 ❌ | Delta Dental individual plans: Premium vs Basic | ~1,459 | 22 | ✅ | Title double-brands ("Inside Delta Dental" + "CoverCapy"). Meta ok-ish but long. 0 FMD links. |
| 7 | `/inside/networks/` | DeltaCare USA vs Delta Dental PPO vs Premier \| Inside Delta Dental · CoverCapy | 276 ❌ longest | Three Delta products, three very different visits | ~1,637 | 19 | ✅ | Meta is the longest in cluster. Good keyword title though. 0 FMD links. |
| 8 | `/inside/for-dentists/` | How Dentists Join Delta Dental: PPO, Premier & Credentialing \| Inside Delta Dental · CoverCapy | 221 | How a dental office joins Delta Dental | ~2,069 | 18 | ✅ | Title too long (95+ chars). HowTo schema present ✅. B2B intent — fine to keep niche. 0 FMD links (acceptable, B2B). |
| 9 | `/inside/eligibility/` | Which Delta Dental Am I? Eligibility Portals & Payer IDs by State \| Inside Delta Dental · CoverCapy | 222 | Which Delta Dental am I? | ~1,800 | 25 | ✅ | Title too long. Strong unique angle ("39 companies"). 0 FMD links. |
| 10 | `/inside/for-employers/` | Delta Dental for Employers: Group Plans, $5,000 Max & Cost \| Inside Delta Dental · CoverCapy | 234 | Offer dental benefits employees actually value | ~1,665 | 18 | ✅ | H1 does not contain "Delta Dental" (keyword gap). Title too long. B2B. |
| 11 | `/inside/is-delta-good/` | Is Delta Dental Good Insurance? An Honest Review \| Inside Delta Dental · CoverCapy | 217 | Is Delta Dental good insurance? | ~1,479 | 19 | ✅ | **Title collides with #3 `/compare/`.** Decide one canonical "is it good" page; differentiate the other. 0 FMD links. |

**Cluster-wide patterns**
- ✅ All 11 link UP to the hub; hub links DOWN to all 10. Internal linking skeleton is sound.
- ❌ **Every meta description exceeds 155 chars** (range 196–276). Google truncates ~155–160; the click hook is being cut off.
- ❌ **Only 2 of 11 pages link to `/find-my-dentist`** (hub + premium). The near-me money page is invisible from 9 pages.
- ❌ **Two title collisions** on "Is Delta Dental Good Insurance" (#3, #11).
- ❌ **No page targets `delta dentist near me` / `dentist that take delta dental near me`** — the highest-intent winnable queries.
- ✅ Schema is rich (FAQPage, BreadcrumbList, WebPage, Speakable, Product/Offer on premium, HowTo on for-dentists). `/compare/` is the exception — missing Breadcrumb/WebPage.
- ✅ All 11 have `viewport` meta (mobile OK). **0 images** in the entire cluster → no alt-text or LCP-image risk; CWV is essentially text + tiny inline JS (<400 bytes). Pages are light (24–100 KB). CWV is not a problem.
- ⚠️ OG tags exist on hub but **missing on `/premium/`** (and likely others — only hub confirmed present).

---

## 2. Title + meta rewrites (the #1 CTR lever)

Rules applied: title ≤60 chars where possible (hard ceiling ~60 for full display), lead with the query, add a click hook (number, "near you", "free", "honest"), drop the `™`, drop redundant "Inside Delta Dental" double-branding, end with `| CoverCapy`. Meta ≤155 chars, benefit-led, with a verb CTA.

### 1. Hub `/delta-dental/`
- **Title:** `Delta Dental Plans Explained + Find a Dentist | CoverCapy` (56)
- **Meta:** `Everything on Delta Dental in one place: PPO vs DeltaCare, costs, eligibility by state, seniors, students, and how to find a Delta dentist near you.` (149)

### 2. Premium `/premium/`
- **Title:** `Delta Dental PPO Premium: Cost, Coverage & Ortho | CoverCapy` (59)
- **Meta:** `Delta Dental PPO Premium covers 100% preventive, 50% major, adult ortho and implants, $2,000 max. See real costs, waiting periods and dentists near you.` (153)

### 3. Compare `/compare/`  *(reposition as head-to-head tool, NOT "is it good")*
- **Title:** `Delta Dental vs Other PPO Plans Compared | CoverCapy` (52)
- **Meta:** `Compare Delta Dental PPO head-to-head with UnitedHealthcare, Guardian, Ameritas, Humana and Mutual of Omaha on cost, annual max and waiting periods.` (148)

### 4. Over-65 `/over-65/`  *(broaden beyond SCAN to capture seniors/medicare)*
- **Title:** `Delta Dental for Seniors & Medicare (SCAN) | CoverCapy` (54)
- **Meta:** `On Medicare or a SCAN plan in CA or WA? Your dental may run through Delta Dental. See what it covers and find a Delta dentist near you.` (133)

### 5. UC students `/uc-students/`
- **Title:** `UC SHIP Dental Is Delta Dental: Find a Dentist | CoverCapy` (57)
- **Meta:** `On UC SHIP? Your student dental is Delta Dental PPO unless you waived it. Pick your campus to map in-network dentists and confirm coverage fast.` (143)

### 6. Individual plans `/inside/individual-plans/`
- **Title:** `Delta Dental Individual Plans: Premium vs Basic | CoverCapy` (58)
- **Meta:** `Delta Dental sells two individual PPO tiers. Premium (~$75/mo, $2,000 max) adds major work and ortho. Basic (~$33/mo) covers the basics. Compare both.` (152)

### 7. Networks `/inside/networks/`
- **Title:** `DeltaCare USA vs Delta PPO vs Premier | CoverCapy` (49)
- **Meta:** `Delta sells three different products. DeltaCare USA is an HMO, PPO lets you pick any dentist, Premier is the big fee-for-service network. See which you have.` (155)

### 8. For dentists `/inside/for-dentists/`
- **Title:** `How Dentists Join Delta Dental (PPO & Premier) | CoverCapy` (57)
- **Meta:** `How a dental office gets contracted and credentialed with Delta Dental: PPO vs Premier, CAQH in 60-90 days, fee schedules, and an 11-step walkthrough.` (149)

### 9. Eligibility `/inside/eligibility/`
- **Title:** `Which Delta Dental Am I? Portals & Payer IDs | CoverCapy` (55)
- **Meta:** `Delta Dental is 39 companies, so portals and payer IDs differ by state. Pick your state to find your Delta company, login, and electronic payer ID.` (147)

### 10. For employers `/inside/for-employers/`
- **Title:** `Delta Dental Group Plans for Employers | CoverCapy` (50)
- **Meta:** `Delta Dental is the most-offered dental carrier in the US. See how employer group plans work (PPO, PPO Plus Premier, DeltaCare) and estimate cost per head.` (155)

### 11. Is Delta good `/inside/is-delta-good/`  *(keep as the canonical review; differentiate from #3)*
- **Title:** `Is Delta Dental Good? An Honest 2026 Review | CoverCapy` (55)
- **Meta:** `Is Delta Dental worth it? An honest scorecard: biggest network and strong finances vs mixed service reviews and waiting periods. Ratings, complaints, verdict.` (155)

> **De-cannibalization rule:** `/inside/is-delta-good/` owns "is Delta Dental good." `/compare/` owns "Delta Dental vs [carrier]." Their new titles no longer overlap. Add a reciprocal link between them (see §3) with distinct anchors so Google reads them as complementary, not duplicate.

---

## 3. Internal-linking & orphan fixes

### 3a. Add `/find-my-dentist` links (the near-me revenue path)
Add ONE prominent contextual link to `/find-my-dentist?carrier=delta-dental` (or `?q=delta+dental`) on each page that lacks it. Suggested anchor text (vary it — no exact-match spam):

| From page | Anchor text | To |
|-----------|-------------|----|
| `/compare/` | "find a Delta Dental dentist near you" | `/find-my-dentist?carrier=delta-dental` |
| `/over-65/` | "find a Delta dentist near you" | `/find-my-dentist?carrier=delta-dental` |
| `/uc-students/` | "map Delta dentists near your campus" | `/find-my-dentist?carrier=delta-dental` |
| `/inside/individual-plans/` | "see in-network Delta dentists near you" | `/find-my-dentist?carrier=delta-dental` |
| `/inside/networks/` | "check which dentists take your Delta plan" | `/find-my-dentist?carrier=delta-dental` |
| `/inside/eligibility/` | "find a dentist that takes Delta Dental" | `/find-my-dentist?carrier=delta-dental` |
| `/inside/is-delta-good/` | "find a Delta Dental dentist near you" | `/find-my-dentist?carrier=delta-dental` |
| Hub (already x3) | add one more: "dentists that take Delta Dental near me" | `/find-my-dentist?carrier=delta-dental` |

### 3b. Fix the 11 broken links on `/uc-students/`
`/uc-students/` links to `/students/uc-berkeley/`, `/students/ucla/`, … and `/uc-dental-access/` — **none exist on disk**. These render as soft-404s and bleed crawl budget / PageRank into dead ends. Pick ONE:
- **Fast fix (30-day):** repoint all 11 to `/find-my-dentist?carrier=delta-dental&campus=...` (or the hub) so no link 404s.
- **Growth fix:** build the campus pages (high-intent, low-competition; see §6) and keep the links.

Either way: nothing in the cluster should link to a non-existent path before the next deploy.

### 3c. De-cannibalization cross-link
- On `/compare/`, add: "For a full verdict, read our honest **Delta Dental review** →" → `/inside/is-delta-good/`
- On `/inside/is-delta-good/`, add: "Want a side-by-side? **Compare Delta vs other PPO plans** →" → `/compare/`

### 3d. Hub mega-nav (already in flight as task #48)
Ensure the hub-scoped dropdown lists all 10 children + a "Find a Delta dentist" CTA so every child page exposes the full cluster (boosts internal link equity and crawl depth uniformly).

---

## 4. Indexing & crawl

### 4a. Trailing-slash / cleanUrls conflict — FIX THIS FIRST
`vercel.json`: `"cleanUrls": true, "trailingSlash": false`.
But every canonical, OG:url, sitemap entry, and internal link uses a **trailing slash** (`/delta-dental/`, `/premium/`, …).

With `trailingSlash: false`, Vercel will **308-redirect** `/delta-dental/` → `/delta-dental`. Result: Google's indexed/canonical URL redirects on every hit → wasted crawl, diluted signals, possible "Page with redirect" / "Alternate page with proper canonical" states in GSC. This is a plausible contributor to page-2 positions and 0 clicks.

**Decision required — pick ONE and make EVERYTHING match:**
- **Option A (recommended, least churn):** set `"trailingSlash": true` in `vercel.json`. Then `/premium` → `/premium/`, and all existing canonicals/sitemap/links are already correct. One-line change.
- **Option B:** keep `trailingSlash: false`, and rewrite all canonicals, OG:urls, sitemap `<loc>`s, and internal hrefs to drop the trailing slash. Much larger change; not worth it in 30 days.

> Verify after deploy: `curl -sI https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/premium/` should return **200**, not 308.

### 4b. Sitemap — already good, two tweaks
- ✅ All 11 cluster URLs are in `/sitemap.xml` with trailing slashes and `lastmod 2026-06-25`. Good.
- ⚠️ Note the sibling carrier pages (`aetna-dental-direct`, `humana-extend-5000`, etc.) in the SAME sitemap are listed **without** trailing slashes while Delta pages have them — confirm those resolve 200 under your final trailingSlash setting (Option A would 308 the slash-less ones; check those have `.html`/clean-url handling).
- **Priority:** bump hub to `0.8`, `/premium/` to `0.8` (your strongest, deepest page), keep children at `0.6`. The hub at `0.7` undersells the cluster's flagship.
- **lastmod:** update to the actual edit date whenever you push the title/meta rewrites — fresh lastmod is a re-crawl signal.

### 4c. robots.txt — fine
`Allow: /`, all AI bots welcomed, `Sitemap:` points to `sitemap-index.xml` which includes `sitemap.xml`. No blocks on the cluster. No change needed.

### 4d. Get the rewrites indexed fast (30-day playbook)
1. Deploy title/meta rewrites + trailing-slash fix.
2. **GSC → URL Inspection → Request Indexing** for all 11 URLs (priority order: hub, premium, compare, is-delta-good, eligibility, then rest). Manual request is the fastest re-crawl path.
3. **Ping the sitemap:** `https://www.google.com/ping?sitemap=https://www.covercapy.com/sitemap-index.xml` and resubmit in GSC.
4. Add the §3 internal links — fresh internal links to changed pages accelerate re-crawl.
5. In GSC Performance, filter to the 7 GSC queries weekly; watch for position lift and first clicks on the new snippets.

---

## 5. Technical / GEO hygiene

- **Canonical:** present on all 11, self-referential, absolute, `www`. ✅ — but must match the final trailing-slash decision (they currently assume slash → choose Option A in §4a so they stay valid).
- **hreflang:** none needed (single-locale US). Do **not** add. ✅
- **Mobile:** `viewport` on all 11. Pages are text-only (0 images), so reflow risk is minimal. ✅
- **Core Web Vitals:** essentially a non-issue — no images, inline JS <400 bytes/page, 24–100 KB total. LCP will be a text block; CLS ~0 (no late-loading media). Quick check: confirm fonts (`Fraunces`, `Inter Tight`) use `font-display: swap` to avoid FOIT blocking LCP. No other CWV work warranted in this window.
- **OG / social:** hub has OG tags; **`/premium/` is missing them** (and others unverified). Add `og:type`, `og:title`, `og:description`, `og:url` (matching canonical), and `twitter:card=summary_large_image` to every cluster page for consistent link previews (minor CTR aid in social/AI surfaces).
- **Image alt:** N/A — zero images. If hero/diagram images are added later, alt text is required.
- **Schema:** strong. One gap — `/compare/` has only `FAQPage`; add `BreadcrumbList` + `WebPage` to match siblings. Consider adding `AggregateRating`/`Review` schema to `/inside/is-delta-good/` (it's literally a review) for rich-result eligibility — only if you have a defensible rating source.

---

## 6. Quick-win checklist — top 10 by impact / effort (30-day window)

| # | Action | Impact | Effort | Why |
|---|--------|--------|--------|-----|
| 1 | **Ship the 11 title + meta rewrites from §2** | 🔥🔥🔥 | Low | Directly attacks the 0-click problem. Shorter, hook-led snippets = CTR on impressions you already have. |
| 2 | **Fix trailing-slash conflict** (`trailingSlash: true`, §4a) | 🔥🔥🔥 | 1 line | Stops 308 redirects on indexed URLs; recovers crawl + position signals. |
| 3 | **Build a `delta-dentist-near-me` page** targeting `delta dentist near me` / `dentist that take delta dental near me` (point at `/find-my-dentist`) | 🔥🔥🔥 | Med | Highest-intent winnable query has **no page today**. Biggest growth lever for 100x. |
| 4 | **Add `/find-my-dentist` links to the 9 pages missing them** (§3a) | 🔥🔥 | Low | Routes ranking pages to the conversion/near-me path; spreads equity to the money page. |
| 5 | **De-cannibalize `/compare/` vs `/inside/is-delta-good/`** (new titles #3/#11 + cross-link §3c) | 🔥🔥 | Low | Stops two pages splitting one query; lets each rank for its own. |
| 6 | **Fix the 11 broken `/uc-students/` links** (§3b) | 🔥🔥 | Low | Eliminates soft-404 leaks; reclaims crawl budget. |
| 7 | **Request indexing for all 11 in GSC + ping sitemap** (§4d) | 🔥🔥 | Low | Forces fast re-crawl so rewrites take effect in days, not weeks. |
| 8 | **Add OG tags to `/premium/` and any page missing them** (§5) | 🔥 | Low | Consistent previews on social + AI answer surfaces. |
| 9 | **Bump hub + premium sitemap priority to 0.8, refresh lastmod** (§4b) | 🔥 | Low | Signals the flagship pages; nudges re-crawl. |
| 10 | **Add Breadcrumb + WebPage schema to `/compare/`; confirm `font-display: swap`** (§5) | 🔥 | Low | Schema parity for rich results; protects LCP. |

---

## Appendix — raw facts captured on disk

- vercel.json: `cleanUrls: true`, `trailingSlash: false`, `outputDirectory: "."`. No headers block. Many redirects (none touch the Delta cluster).
- robots.txt: `Allow: /`, AI bots explicitly allowed, `Sitemap: .../sitemap-index.xml`.
- sitemap-index → sitemap.xml (core, has all 11 Delta URLs, lastmod 2026-06-25) + sitemap-content.xml + dental/sitemap-dental.xml.
- 0 `<img>` tags anywhere in the cluster. Inline JS <400 bytes/page. File sizes 24–100 KB (premium is the 100 KB flagship).
- Schema present per page logged in §1 / §5. `/compare/` is the only page missing Breadcrumb/WebPage.
- Broken on-disk link targets from `/uc-students/`: `/students/uc-{berkeley,davis,irvine,merced,riverside,san-diego,san-francisco,santa-barbara,santa-cruz}/`, `/students/ucla/`, `/uc-dental-access/`.
