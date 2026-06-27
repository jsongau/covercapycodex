# 18 - Delta as the Flagship Carrier on the LIVE Hub

Agent memo, hub20 series. ANALYSIS / SPEC only. No build. Premiums FROZEN. No em-dashes.

## Mandate

Spec how the main LIVE hub features Delta Dental as the flagship carrier branch, mirroring a health-insurance carrier landing pattern, and wire the exact link set into the Delta sub-hub. Summarize the SEO plays from the strategy doc that the main hub must support.

Sources grounded:
- `docs/ppo-redesign/_zip-21jun/delta/SEO-DOMINATION-STRATEGY.md`
- `docs/ppo-redesign/_zip-21jun/delta/delta-dental/index.html` (the pillar, 977 lines)
- sub-pages `premium/`, `compare/`, `over-65/`, `uc-students/` (confirmed canonicals + titles)

## Confirmed live URL set (build from these, do not invent)

| Node | Canonical URL | Title (live) |
|------|---------------|--------------|
| Delta carrier hub (pillar) | `/dental-insurance/ppo-plans/delta-dental/` | Delta Dental - Plans, PPO Dentists, Cost & Reviews |
| PPO Premium plan (flagship) | `/dental-insurance/ppo-plans/delta-dental/premium/` | Delta Dental PPO Individual Premium Plan - Coverage, Cost & Adult Ortho |
| Compare / decision | `/dental-insurance/ppo-plans/delta-dental/compare/` | Is Delta Dental Good Insurance? Delta vs Other PPO Plans |
| Over 65 (SCAN) | `/dental-insurance/ppo-plans/delta-dental/over-65/` | SCAN Health Plan Delta Dental Benefit - CA & WA (65+) |
| UC students (UC SHIP) | `/dental-insurance/ppo-plans/delta-dental/uc-students/` | UC SHIP Dental and Delta Dental: Find a Dentist Near Your UC |

These are the same five tiles the Delta hub already exposes in its own `linkgrid four` "Everything Delta Dental, in one place" module (index.html lines 350-356) and in its sticky sub-nav (lines 299-306). The main hub's Delta module reuses that exact set so authority and crawl paths are consistent both directions.

## Why Delta is the flagship branch

Per the strategy doc thesis (section 1-2): one carrier pillar per major brand, template = the Delta hub, which is the only one already finished. Delta is the largest dental carrier in the US ("roughly one in four insured Americans," index.html line 317), so it gets the first and largest carrier branch on the main hub. UHC, Guardian, Ameritas, Humana are smaller secondary tiles below it (the Delta hub's own "Keep exploring" block already models this hierarchy, lines 543-545, with UHC/Guardian as lesser cards).

## SPEC: the featured-Delta module on the main hub (health-tech pattern)

A single full-width carrier-feature band, placed directly under the main hero, before the generic carrier grid. Health-insurance-landing styling: dark graphite feature panel on the left, a plan price card on the right (the same `pricecard` component the Delta hub uses, index.html lines 325-344), premiums shown but FROZEN at the existing numbers.

Structure:

1. Eyebrow: "The largest dental carrier in the US" (jade-deep, `.eyebrow` token).
2. H2 (Fraunces 500): "Delta Dental PPO" with "PPO" in jade italic, matching the hub H1 treatment.
3. One-line lede: largest carrier, adult ortho included, every waiting period shown up front. No em-dashes; use commas/periods.
4. Frozen price card (reuse `pricecard`): Individual `$73/mo` (~`$877/yr`), Family `$181/mo` (~`$2,177/yr`). These are the exact frozen values from `var PRICE` (index.html line 581). Do not recompute.
5. Five feature checks lifted from the hub's `pc-feat` list (lines 332-336): $2,000 annual max, 50% adult+child ortho and implants, 100% preventive day one, 6-month waivable waits, no missing-tooth clause.

### The two-CTA rule (the heart of this spec)

The featured module carries a PRIMARY and a SECONDARY action, and the ordering is the inversion of the carrier hub's own price card:

- PRIMARY (jade fill, `btn btn-jade`): "See the PPO Premium plan" linking to `/dental-insurance/ppo-plans/delta-dental/premium/`. On the main hub the featured plan IS the primary, because the hub's job is to route the plan-led visitor straight into the flagship conversion page.
- SECONDARY (ghost, `btn btn-ghost`): "Explore the Delta hub" linking to `/dental-insurance/ppo-plans/delta-dental/`. This is the topical-authority gateway link the strategy doc requires (the pillar must receive a prominent internal link from the home hub).

Note: this is deliberately the mirror of the carrier hub's own card, where the Delta-Dental external enroll button is primary and "find & verify my dentist" is secondary (index.html lines 339-340). On the home hub we keep the enroll handoff OFF the featured module and instead point inward (premium primary, hub secondary) so crawl equity and visitor intent both flow into the CoverCapy mesh first.

### The exact link set into the Delta sub-hub (place below the two CTAs as a `linkgrid four`)

Reuse the hub's own five-tile module verbatim so the home page and the pillar share one canonical link set:

1. Flagship plan -> `/dental-insurance/ppo-plans/delta-dental/premium/` ("PPO Individual Premium Plan")
2. Compare -> `/dental-insurance/ppo-plans/delta-dental/compare/` ("Is Delta Dental good?")
3. Find a dentist -> `/dental-insurance/ppo-plans/delta-dental/#dentists` (the hub's in-page omni search anchor, index.html line 427)
4. Over 65 -> `/dental-insurance/ppo-plans/delta-dental/over-65/` ("Delta for seniors / SCAN")
5. UC students -> `/dental-insurance/ppo-plans/delta-dental/uc-students/` ("UC SHIP dental")

All five are real, canonical, trailing-slash URLs already shipped in the bundle. No `#` placeholders, no stale `/dentists/` seo_path.

### Anchors the main hub must expose / link to

The Delta hub uses in-page anchors that the home feature should deep-link where it routes intent: `#dentists` (omni search + benefits tabs), `#waiting` (waiting-period showcase), `#over65` (SCAN band), `#nominate` (nomination engine), `#tabs`. The strategy doc's "dense internal mesh, no orphans" rule (section 3.4) means the home feature should at minimum surface `#dentists` (utility) and `premium/` (conversion); `#waiting` is the trust hook for the answer-first snippet play.

## SEO plays from the strategy doc the main hub must support

1. The gateway thesis (section 1-2): the home hub is the top of the carrier x plan x need x place mesh. It must pass a prominent, crawlable internal link DOWN to the Delta pillar (the secondary "Explore the Delta hub" CTA) so the pillar accrues authority. Delta is the model every other carrier pillar will be cloned from (section Tier 1, Phase 4).
2. Carrier-as-entity (section 3.3): the featured module should reinforce Delta as an Organization entity. Schema-wise the hub already carries `Product` + `BreadcrumbList` + `FAQPage`; the home feature should link to the pillar so Google reads the pillar as the brand authority, not the home page.
3. Answer-first, snippet-winning copy (section 3.2): the feature lede and checks must lead with the literal differentiators (adult ortho, $2,000 max, waivable 6-month waits) so the band itself can win brand-adjacent featured snippets and AI Overviews. Same answer-first pattern as the hub's `.answer` block (index.html lines 377-389).
4. Internal mesh / no dead ends (section 3.4): every tile in the feature links to a real page; the pillar links back up and sideways. The five-tile set is the canonical Delta cluster shared between home and pillar.
5. Plan x need x place routing (section 4): the feature's PRIMARY routes the plan-led visitor ("is Delta good") to `premium/` and `compare/`; the `#dentists` tile catches the place-led visitor; the concierge verify hook ("we verify your insurance for you") is the conversion driver carried into the pillar.
6. Aggregate long-tail, concede head terms (section 6): the home feature does NOT try to rank for "Delta Dental" (conceded to the carrier). Its job is to funnel to the pillar and the winnable descriptive long-tail (Delta PPO {city}, Invisalign dentist {city} Delta), which live deeper in the mesh.

## Guardrails honored

- Premiums frozen at $73 / $181 (PRICE object, line 581). No recompute.
- No em-dashes anywhere in copy. Tokens reused: `--jade`, `--jade-deep`, `--graphite`, `--jade-tint`, serif Fraunces 500.
- URLs built from real canonicals, trailing slash, never seo_path.
- `sameAs`/schema stays an array on the pillar; home feature only links, does not duplicate the pillar's Product schema.
