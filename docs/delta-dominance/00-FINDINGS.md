# Delta Dominance — Findings from GSC Export (7 days ending 2026-07-01)

Source: covercapy.com-Performance-on-Search-2026-07-01.zip (both uploads identical).
Robots note: /docs/ is blocked from crawling, so these strategy files never leak into the index.

## The headline

**1,295 impressions across 217 Delta-related queries. Zero clicks.**

CoverCapy already ranks. Google is showing us. Searchers are not clicking. This is not a
content-volume problem yet, it is a click-through problem stacked on top of a depth problem.
The single highest-leverage work available on this site right now is making the Delta results
irresistible to click, then making the pages so good the visitor keeps reading.

## What Google is already telling us

| Signal | Value | Meaning |
|---|---|---|
| "delta dental" head term | 455 imp, position 7.2, 0 clicks | Page 1 for the biggest brand in dental. Snippet loses to official-site sitelinks. Win the informational slice, not the navigational one. |
| "deltadental" | 20 imp, position 6.6 | Same page-1 presence on the nav-intent variant. |
| "delta dental ppo vs deltacare usa" | 8 imp, position 15.5 | **Demand for the HMO vs PPO page exists and we rank without a page.** Build it and position 15 becomes position 3. |
| "delta dental ppo vs premier" + "premier vs ppo" | 19 imp combined, pos 36-43 | The compare page targets this but ranks poorly. Needs the CTR + depth treatment. |
| "delta dental for seniors" | 8 imp, pos 48.1 | over-65 page exists but is not winning. SCAN content strengthens it. |
| /delta-dental/compare | 490 imp, pos 43.5 | Most-shown page in the whole property. |
| /delta-dental (hub, old path) | 422 imp, pos 35.9 | Second most-shown. |
| Question-style query "are there any financing options available for root canal treatment?" | 35 imp, pos 82.8 | AI-shaped long-tail exists. GEO formatting captures these. |
| "aspen dental insurance" | 26 imp, pos 30.1 | Adjacent-brand gap, noted for later, out of Delta scope. |

## Anomalies that need repair before growth

1. **Seven `/dental-insurance/delta-dental/areas/{area}/` URLs are indexed and ranking
   (positions 5.3 to 8.7, 145 impressions) but the subtree does not exist in the repo.**
   central-orange-county alone: 115 imp at position 7.7. These are almost certainly 404ing
   in production. Ranking equity is actively burning. Decision required: rebuild `areas/`
   as real geo sub-pages wired to the Delta find-a-dentist tool (preferred, they already
   rank) or 301 them to /dental-insurance/delta-dental/find-a-dentist/.
2. **60 old `/dental-insurance/ppo-plans/delta-dental*` URLs still carry the index.**
   Redirects exist in vercel.json, so equity transfers, but every internal link must point
   at the new canonical `/dental-insurance/delta-dental/...` so Google re-maps faster.
3. **CTR is zero even at position 5-10.** Titles/descriptions are not earning the click
   against deltadental.com. The educator positioning must be visible in the SERP itself:
   year-stamped, number-rich, independent-voice titles.

## Current hub baseline (repo audit)

- 12 pages: index, individual-plans, premium, compare, networks, eligibility, over-65,
  uc-students, for-employers, for-dentists, is-delta-good, find-a-dentist.
- Schema on hub: WebPage, WebSite, Organization x2, FAQPage (6 Q&A), BreadcrumbList,
  ItemList, SpeakableSpecification. Good bones, extend per 03 playbook.
- Analytics: tag present on hub (3 references, gtag/Vercel insights). GSC is domain-level
  verified, so tracking survives any page change. Rule: every NEW page ships the same
  chrome loader + analytics block as the hub, and tracking is maintained automatically.
- SSOT: data/plans/delta-dental-group.md and delta-dental-ppo-premium.md exist. SCAN and
  DeltaCare HMO facts are NOT yet in SSOT. Per CLAUDE.md, those files must be created and
  sourced BEFORE any new page states a number.
- Chrome: delta cluster runs omega-nav2 + .dcn sub-nav + standardized breadcrumbs (all 148px
  aligned, CoverCapy-rooted trails). New pages inherit this stack.

## Strategy in one paragraph

Fix the leaks (areas 404s, canonical links), win the click (SERP-visible educator titles and
descriptions on the 5 pages Google already shows), build the proven-demand pages (HMO vs PPO
first, it has rankings waiting), deepen every existing page into the best answer on the
internet for its query cluster, and format everything so AI engines can lift and cite it
(03 playbook). Volume of pages matters less than CoverCapy being the obvious citation for
every Delta Dental question a human or an AI ever asks.
