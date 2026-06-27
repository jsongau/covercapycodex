# NAV2 — Crawl-Path / Link-Graph Map

Hub: `compare-ppo-dental-plans.html` (canonical `https://www.covercapy.com/compare-ppo-dental-plans/`)
Role: Page Navigation Mapper 2. Grounded in raw HTML lines + on-disk routes. Analyze/spec only.

---

## 1. How a crawler sees the hub

A crawler reads the raw HTML byte stream. It does NOT run the fetch/inject scripts. So the link graph splits cleanly into three classes:

### Class A — Real static `<a href>` in raw HTML (crawlable, no JS)
These are present in the served HTML and are followed by every crawler.

The **console dropdowns** (the `.toc-dd-panel` mega-menu rendered server-side at lines 905-955) are the hub's single most valuable static asset. Every link below is a literal `<a href>` in the source:

| Block | Lines | Targets |
|-------|-------|---------|
| Carrier plans dropdown | 907-913 | UHC, Aetna, Ameritas, Guardian, Mutual of Omaha, Humana, MetLife — all `/dental-insurance/ppo-plans/{slug}/` |
| Delta fly-out | 917-921 | Delta hub, Delta premium, Delta compare, Delta over-65, Delta uc-students |
| Glossary dropdown | 931-941 | 10 term pages + `/dental-insurance-glossary/` (all terms) |
| Resources dropdown | 948-954 | cost estimator, all carriers/plans, no-waiting-period, immediate-coverage, between-jobs, self-employed |
| Comparison table rows | 1046-1052 | 7 plan pages (`<th scope=row><a>` per row) |
| "Featured plans" branch block | 1211-1225 | Delta feature link + 6 plan `<li><a>` + side-by-side anchor |
| "Glossary" branch block | 1235-1246 | 10 inline term `<a>` + "browse every term" |
| Sticky TOC + in-page anchors | 958-982 | `#match #compare #shelf #treatment #situation #faq` + `/find-my-dentist` |

Result: from the raw hub, a crawler reaches **all 7 flat plan pages, the Delta hub + all 4 Delta sub-pages, 10+ glossary terms (and the glossary index), all 4 situation/segment pages, the cost estimator, and find-my-dentist** at depth 1. The static console dropdowns carry the entire authority spine. This is the strength of the page — keep it.

### Class B — JS-built `<a href>` (invisible to crawler, present for users)
Rendered only after script execution. A crawler sees empty mount points.

- `renderStatics()` (line 1956) injects `#treatGrid` (TREATMENTS, line 1932), `#artGrid` (ARTICLES, line 1938), `#dictGrid`, FAQ list, `#situationGrid`.
- TREATMENTS hrefs (`/best-dental-insurance-for-implants/` etc.) and ARTICLES hrefs (`/learn/ppo-vs-hmo/` etc.) are built in JS at render time — a crawler never sees them.
- Plan-card links via `planUrl(p)` (1437), carrier links via `carrierHubUrl()` (1438), `enrollUrl()` (1433) — all JS-templated into innerHTML.

### Class C — JS navigation only (no href at all, dead to crawler)
- **SITUATIONS** (line 1933) renders `<div class="pc">` with click handlers (line 1967 `applySituation`). No anchors. The "by situation" section is 100% invisible to crawlers even though it visually links to life-event content.
- find-my-dentist hand-offs via `window.location.href='find-my-dentist.html?...'` (lines 1915, 1917, 2304, 2306) — JS only. (The static `/find-my-dentist` anchor at line 965 saves this spoke.)
- Universal mega-nav + footer are **fetch-injected** (lines 891-893 `#cc-nav-mount`, 1270 `#cc-footer-mount`, loader at 2382-2384 pulling `components/mega-nav.html` / `components/footer.html`). Entirely invisible to crawlers. Any link that exists ONLY in the nav/footer is uncrawlable from this page.

---

## 2. Approximate crawl depth from the hub (raw-HTML traversal)

| Spoke | On-disk route | Reached via | Depth |
|-------|---------------|-------------|-------|
| 7 plan pages (UHC, Aetna, Ameritas, Guardian, MoO, Humana, MetLife) | `/dental-insurance/ppo-plans/{slug}/` | static dropdown + table rows + branch block | 1 |
| Delta Dental hub | `/dental-insurance/ppo-plans/delta-dental/` | static fly-out + branch feat + table row | 1 |
| Delta premium / compare / over-65 / uc-students | `…/delta-dental/{sub}/` | static fly-out | 1 |
| Glossary index | `/dental-insurance-glossary/` | static dropdown + branch | 1 |
| 10 glossary terms (annual-maximum, waiting-period, deductible, coinsurance, in-network, coverage-major, missing-tooth, out-of-pocket, effective-date, balance-billing) | `/dental-insurance-glossary/{term}/` | static dropdown + branch | 1 |
| 13 OTHER glossary terms (see orphans) | `/dental-insurance-glossary/{term}/` | only via glossary index | 2 |
| Situation/segment pages (no-waiting-period, immediate-coverage, between-jobs, self-employed) | `/dental-insurance-{x}/` | static Resources dropdown | 1 |
| Cost estimator | `/dental-treatment-cost-estimator.html` | static Resources dropdown | 1 |
| find-my-dentist | `/find-my-dentist` | static TOC CTA (line 965) | 1 |
| `/dental-insurance/` (plans hub root) | `/dental-insurance/ppo-plans/` linked; the `/dental-insurance/index.html` not directly linked | indirect | 2+ |
| TREATMENTS targets, ARTICLES `/learn/*` targets | n/a | JS only | unreachable from hub raw HTML |

---

## 3. Orphans / gaps

### 3a. Pages on disk under `/dental-insurance/` the hub does NOT link (or links only via JS)
- **`dental-insurance/index.html`** — the plans-section root. Hub links `…/ppo-plans/` but not this index. Should be linked.
- **`dental-insurance/ppo-plans/dd.html`** — stray/legacy Delta file. Not linked anywhere; either redirect to the Delta hub or delete. Flag as cruft, not a spoke.

### 3b. Glossary terms on disk but NOT in any hub dropdown (depth 2, only via glossary index)
On disk: 23 term folders. Hub dropdown + branch surface only 10. The 13 buried terms:
`ada-fee, allowed-amount, calendar-year, cdt, coverage-basic, coverage-preventive, day-one, implants, plan-year, ppo, rating, vision, whitening`.
These are 1 click further than they should be. Rotate the highest-intent ones (ppo, implants, coverage-basic, coverage-preventive, day-one) into the static branch block so the most-searched terms sit at depth 1.

### 3c. JS-built links pointing at pages that DO NOT EXIST on disk (broken spokes, and invisible too)
TREATMENTS (1932) and ARTICLES (1938) point to routes with **no folder on disk**:
`/best-dental-insurance-for-implants/`, `/best-dental-insurance-for-crowns/`, `/best-dental-insurance-for-root-canals/`, `/best-dental-insurance-for-braces/`, `/best-dental-insurance-for-dentures/`, `/best-dental-insurance-for-wisdom-teeth/`, `/dental-and-vision-insurance/`, `/best-dental-insurance-for-emergency/`, `/learn/ppo-vs-hmo/`, `/learn/in-network/`.
Double failure: invisible to crawlers (Class B) AND 404 for users. Either build these pages or repoint to existing routes; do not ship the live `<a>` to a 404.

### 3d. Back-link asymmetry (spokes that do NOT link back to the hub)
Grep for `compare-ppo-dental-plans` across spokes: the **7 flat plan pages, the 4 situation pages, and all 23 glossary terms link back** to the hub. But the **Delta Dental hub and all 4 Delta sub-pages do NOT link back** to `/compare-ppo-dental-plans/`. The Delta cluster is a leaf with no return edge — it bleeds authority out of the hub and never returns it. This is the single biggest reciprocity gap.

---

## 4. Recommended link-graph (hub as the clear center)

Goal: every spoke 1 click from the hub via a real static `<a href>`, and every spoke links back.

1. **Convert the SITUATIONS section to static `<a href>`.** Right now (Class C) it is pure JS click-to-filter with no anchors. Add real links to the 4 segment pages (between-jobs, self-employed, no-waiting-period, immediate-coverage) alongside the interactive filter, so the life-event spokes are crawlable at depth 1.
2. **Server-render TREATMENTS and ARTICLES as static `<a href>`** (move out of `renderStatics`), but only after the target pages exist. Until then, repoint to live routes (glossary terms, plan pages) so no live link 404s.
3. **Add a hub back-link to every Delta page** (hub + 4 sub-pages). Mirror the footprint the 7 flat plan pages already use. Closes the reciprocity gap.
4. **Surface high-intent glossary terms** (ppo, implants, coverage-basic, coverage-preventive, day-one) in the static branch block to pull them from depth 2 to depth 1.
5. **Link `/dental-insurance/index.html`** from the hub (Resources dropdown) and resolve `dd.html` (redirect or delete).
6. **Do not rely on the mega-nav/footer for any spoke** — they are fetch-injected and uncrawlable. Every spoke that matters must have a static in-body `<a href>` on the hub itself (the console dropdowns already do this well; keep them server-rendered, never move them into JS).

Net effect: the hub becomes the hub-and-spoke center where all ~40 spokes (7 plans, 5 Delta, 23 glossary, 4 segment, estimator, find-a-dentist) are depth-1 static links out, and every spoke carries a static link back in.
