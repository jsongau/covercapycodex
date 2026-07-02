# Delta Dominance — CTR Log (title + meta iteration)

Purpose: baseline the SERP snippets before the first CTR rewrite so the 3-week
re-iteration loop in `01-page-revisions.md` has a control. Titles are hypotheses,
not shrines. Any page whose CTR does not move within 3 weeks gets a second
iteration with a different framing (numbers vs question vs verdict).

GSC baseline figures are from the 7-day export ending 2026-07-01 (see
`00-FINDINGS.md`). Re-pull GSC position + CTR for each page's query set at 7 and
28 days after the deploy that ships Round 1.

## Round 1 — rewritten 2026-07-02

| Page | GSC baseline (imp / pos / clicks) | Title before → after | Hypothesis |
|---|---|---|---|
| hub `/delta-dental/` | "delta dental" 455 imp, pos 7.2, 0 clicks | `Delta Dental Plans Explained + Find a Dentist` → `Delta Dental 2026: Plans, Costs, PPO vs Premier` | Year stamp + the exact subtopics people search ("plans", "costs", "ppo vs premier") beat a generic "explained". Independence line ("We sell nothing") in the meta differentiates from deltadental.com. |
| compare `/compare/` | 490 imp, pos 43.5 (most-shown page) | `Delta Dental vs Other PPO Plans Compared` → `Delta Dental vs Other PPO Plans: 2026 Comparison` | Year stamp + "Comparison" matches "compare/vs" intent; meta names the carriers and the three factors so the snippet reads useful. |
| networks `/networks/` | "ppo vs premier" cluster 19 imp, pos 36-43 | `DeltaCare USA vs Delta PPO vs Premier` → `Delta PPO vs Premier vs DeltaCare USA (2026)` | Leads with "Delta PPO vs Premier" in the query's word order; year stamp. |
| over-65 `/over-65/` | "delta dental for seniors" 8 imp, pos 48.1 | `Delta Dental for Seniors & Medicare (SCAN)` → `Delta Dental for Seniors on Medicare 2026 (SCAN)` | Mirrors "delta dental for seniors" head phrasing; drops the raw ampersand; year stamp. |
| individual-plans `/individual-plans/` | tier/cost queries | title unchanged (already 59 chars, query-matched) | Title was already optimal length and matched "individual plans / premium vs basic". Meta refreshed with 2026 + SSOT figures. |

### Meta descriptions, before → after
- **hub**: "Everything on Delta Dental in one place: PPO vs DeltaCare, costs, eligibility by state, seniors, students, and how to find a Delta dentist near you." → "Independent 2026 guide to Delta Dental, the largest US dental carrier. Compare PPO vs Premier vs DeltaCare, real costs, and eligibility by state. We sell nothing."
- **compare**: "Compare Delta Dental PPO head-to-head with UnitedHealthcare, Guardian, Ameritas, Humana and Mutual of Omaha on cost, annual max and waiting periods." → "How Delta Dental PPO compares with UnitedHealthcare, Guardian, Ameritas and Humana on cost, annual maximum and waiting periods. Independent and we sell nothing."
- **networks**: "Delta sells three products: DeltaCare USA is an HMO, PPO lets you pick any dentist, Premier is the big fee-for-service network. See which one you have." → "Delta sells three products: DeltaCare USA (HMO), PPO (any dentist, annual maximum) and Premier (fee-for-service). See which one you have and how each pays."
- **over-65**: "On Medicare or a SCAN plan in CA or WA? Your dental may run through Delta Dental. See what it covers and find a Delta dentist near you." → "On Medicare Advantage or a SCAN plan in CA or WA, your dental often runs through Delta Dental. See what it covers, the PPO buy-up, and how to find a dentist."
- **individual-plans**: "Delta Dental sells two individual PPO tiers. Premium (~$75/mo, $2,000 max) adds major work and ortho. Basic (~$33/mo) covers the basics. Compare both." → "Delta Dental sells two individual PPO tiers for 2026. Premium adds major work and adult ortho on a $2,000 maximum, about $75/mo. Basic covers the basics for less."

Note on figures: `$2,000 maximum` and `~$75/mo` trace to `data/plans/delta-dental-ppo-premium.md`. The prior meta's `~$33/mo` Basic figure was dropped because it is not in the SSOT; add it back only after a Basic-tier SSOT file exists.

### Measurement calendar
- 2026-07-23 (3 wks): pull GSC CTR + position for the five query sets. Log Round 2 here for any page whose CTR is still flat.
- Watch the hub especially: page-1 position with 0 clicks means the snippet, not the ranking, is the bottleneck.
