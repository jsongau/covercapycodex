# Delta Dominance — Revisions to the 12 Existing Pages

Universal rules for every revision (from CLAUDE.md, non-negotiable): plan numbers only from
/data/plans/ SSOT, no em-dashes, never bash Delta or any carrier, the enemy is confusion,
every page ends on a CoverCapy destination, keep the dcn- chrome and Gold/Jade theme.

## The answer-first rewrite pattern (applies to every page)

1. **First 120 words answer the page's core query outright.** A visitor or an AI engine that
   reads only the opening block leaves with the answer and CoverCapy's name attached to it.
2. **One quotable stat block per page**, visually distinct, sourced and dated, phrased so it
   can be lifted whole: "Delta Dental is the largest dental benefits carrier in the United
   States, covering more than 90 million Americans (source, checked June 2026)."
3. **Scannable spine:** every H2 is a question a real searcher asks (mirror GSC query
   phrasing), body answers in the first sentence under it, detail follows.
4. **A "keep researching" rail** near the end: 3 contextual next pages in the cluster, chosen
   per page below, plus the hub. This is the retention loop, page to page, never a dead end.
5. **dateModified bumped in schema + a visible "Reviewed {Month Year} by the CoverCapy
   Editorial Team, checked against Delta plan documents" line.** Freshness + E-E-A-T signal
   both engines and AI systems weigh.

## Per-page work orders

### 1. Hub (/dental-insurance/delta-dental/)
- SERP fix, highest priority on the site: title to the educator pattern, e.g.
  `Delta Dental: Plans, Costs, PPO vs Premier, Is It Good? (2026 Guide)`.
  Meta description leads with the independence: "Independent 2026 guide to Delta Dental,
  the largest dental carrier in the US. Real plan numbers, network differences, and how to
  use it well. We sell nothing." Target: first click from those 455 weekly impressions.
- Add a "Start here" reading path: 5 numbered cards (What Delta is → Pick a plan → PPO vs
  Premier vs DeltaCare → Find a dentist → Use it well) so the hub reads like a course, not
  a directory. Reading paths are the retention flywheel.
- Surface the newest sub-pages (HMO vs PPO, enrollment timing) the day they ship.

### 2. compare/ (490 imp, pos 43)
- Retitle to match the demand: `Delta Dental PPO vs Premier vs DeltaCare HMO: The 2026
  Comparison`. Currently loses "ppo vs premier" queries at position 36-43.
- Add the three-way comparison table (PPO / Premier / DeltaCare) with row-level plain-English
  verdicts, then link down to the new deltacare-hmo-vs-ppo deep page for the HMO half.
- Rail: hmo-vs-ppo, networks, individual-plans.

### 3. networks/ (112 imp, pos 40)
- The PPO vs Premier network mechanics live here. Front-load the one fact people need:
  same dentist, different contracted fees, and what that means for balance billing.
  Quotable stat block on network size from SSOT-sourced figures.
- Rail: compare, find-a-dentist, eligibility.

### 4. over-65/ ("delta dental for seniors" pos 48)
- Retitle for seniors phrasing, then integrate the SCAN section: what SCAN Medicare
  Advantage members get, and the upgrade path to unlimited-maximum PPO options where
  offered (facts to SSOT first, see 02 doc).
- Rail: hmo-vs-ppo (SCAN ties into it), individual-plans, find-a-dentist.

### 5. uc-students/ — already the model sub-hub
- This page is the template for what sub-hubs should be. Light revision only: answer-first
  opening, quotable SHIP stat, reviewed line, rail (eligibility, find-a-dentist, hub).
- Its structure (audience-specific hub with its own tools) is the blueprint 02 replicates.

### 6. eligibility/
- The "Plaid for dental eligibility" moat page. Add payer-ID quick-reference table
  (extremely quotable, AI engines love ID tables), member portal walkthrough, and the
  "which Delta company runs my plan" decision helper.
- Rail: networks, find-a-dentist, hub.

### 7. individual-plans/
- Answer-first premium/max/waiting summary table from data/plans/delta-dental-ppo-premium.md.
  Every number traces to SSOT. Add "who this plan fits / who it does not" split per the
  editorial rule.
- Rail: compare, hmo-vs-ppo, enrollment-timing (new).

### 8. is-delta-good/
- The honest-verdict page is the trust engine and prime AI-citation bait. Structure verdict
  as ratings-by-dimension (network size, claim speed, complaint ratios) each with a dated
  source. Keep criticism factual and fair, never snide.
- Rail: compare, is-delta-good stays linked from hub hero.

### 9. premium/
- Fold into the PPO vs Premier story: this page owns "Premier" as a standalone entity
  answer ("What is Delta Dental Premier?"). Cross-link tightly with networks/ and compare/.

### 10. for-employers/
- Link the employer hub (/dental-insurance/employer/) both ways; add the HMO-default trap
  section: many employers offer DeltaCare HMO as default, employees can ask HR about PPO
  buy-up at enrollment (bridge to the new enrollment-timing page).

### 11. for-dentists/
- Keep as the network-participation page; add credentialing timeline stat block. Link the
  CoverCapy claim-profile CTA (this audience is our recruitment pipeline).

### 12. find-a-dentist/
- Becomes the parent of the resurrected /areas/ geo children (see 02). Add area index list
  so the geo pages have a crawl path from the cluster.

## Measurement

After each page revision: GSC position + CTR for its query set (7/28-day), scroll depth via
analytics, and the internal-link click from hub reading path. Revisions that do not move CTR
within 3 weeks get a second title/description iteration. Titles are hypotheses, not shrines.
