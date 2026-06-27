# 17 — Internal Linking Silo Spec
## PPO Plans Hub Rebuild | CoverCapy | 2026-06-26

**Scope:** Complete internal linking architecture for the rebuilt `/dental-insurance/ppo-plans/` hub and its surrounding silo. Covers link graph, exact anchor text per target (varied, keyword-aware), contextual placement per page section, breadcrumb chain, related-plan modules on plan pages pointing back to the hub, PageRank flow rules, cannibalization guardrails, and a master link table. Ends with a list of scenario/landing pages worth creating to complete the silo.

**Status:** PLANNING ONLY. No production changes until the 20 specs and master console are complete and user-approved.

---

## 1. Silo Overview and Link Graph

The silo has five tiers arranged in a strict hub-and-spoke topology. PageRank flows inward toward the money pages (plan pages and the compare page) and upward to the dental insurance hub. Cross-silo bridges exist only at the exact points specified below to avoid cannibalization and dilution.

```
TIER 0: /dental-insurance/               (T2 DI Hub -- parent, links DOWN to PPO hub)
         |
         | [down]
         v
TIER 1: /dental-insurance/ppo-plans/     (T3 PPO Plans Hub -- CENTER of this spec)
         |                  |                  |              |              |
         | [down x8]        | [down]            | [cross]      | [cross]      | [cross]
         v                  v                  v              v              v
TIER 2: [8 plan pages]   compare page     scenario pages   guides/gloss   dentist hub
         |                  |
         | [up]             | [up]
         v                  v
TIER 1 (back to hub)   TIER 1 (back to hub)

CROSS-SILO:
TIER 1 PPO Hub <--bridge--> /dental-insurance/delta-dental/   (Delta silo hub)
TIER 2 plan pages <--bridge--> /find-my-dentist              (dentist-finder hub)
TIER 2 plan pages <--bridge--> /guides/{relevant-guide}/     (1 guide link per plan page max)
```

### Link graph node list

| Node | URL | Silo role |
|------|-----|-----------|
| DI Hub | `/dental-insurance/` | Parent -- passes authority down |
| PPO Plans Hub | `/dental-insurance/ppo-plans/` | Hub -- center of silo |
| Compare Page | `/compare-ppo-dental-plans` (Option B) or `/dental-insurance/ppo-plans/compare/` (Option A) | Mid-funnel child of hub |
| Aetna plan page | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Leaf |
| Ameritas plan page | `/dental-insurance/ppo-plans/ameritas-primestar/` | Leaf |
| Delta Dental plan page | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Leaf |
| Guardian plan page | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Leaf |
| Humana plan page | `/dental-insurance/ppo-plans/humana-extend-5000/` | Leaf |
| MetLife plan page | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | Leaf |
| MOO plan page | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Leaf |
| UHC plan page | `/dental-insurance/ppo-plans/uhc-primary-dental/` | Leaf |
| Delta silo hub | `/dental-insurance/delta-dental/` | Cross-silo bridge |
| Dentist finder | `/find-my-dentist` | Conversion bridge |
| Guides (by scenario) | `/guides/{slug}/` | Supporting content bridge |
| Glossary | `/guides/glossary/` | Educational bridge |
| Benefit-maxing hub | `/benefit-maxing/` | Soft bridge from hub only |
| Scenario pages (new) | `/dental-insurance/ppo-plans/{scenario-slug}/` | Proposed new nodes |

---

## 2. Hub Links Down to the 8 Plan Pages and the Compare Page

### 2.1 Structural links (always present regardless of section)

Every plan page must receive at least four distinct contextual links from the hub, each from a different section and each with different anchor text. This distributes PageRank across the full page rather than concentrating it in one section, and signals topical relevance from multiple angles.

### 2.2 Hub to plan page: anchor text recommendations

The following anchor texts are approved per plan. Use each variant in a different section of the hub. Never use the same anchor text twice on the same page for the same destination.

**Aetna Dental Direct**
- `Aetna Dental Direct` (plan card headline, scenario section)
- `Aetna's CVS ExtraCare Plus plan` (contextual, CVS/rewards section)
- `the Aetna PPO with pharmacy perks` (contextual prose, first-time buyer section)
- `full Aetna Dental Direct review` (carrier grid / "explore plans" section)
- `how Aetna Dental Direct handles the job-change waiver` (contextual, life-event section)

**Ameritas PrimeStar Care Complete**
- `Ameritas PrimeStar` (plan card headline)
- `the one plan with zero waiting periods across every category` (contextual, no-wait section)
- `Ameritas's day-one major coverage` (contextual, urgent-need scenario)
- `full Ameritas PrimeStar review` (carrier grid)
- `Ameritas PrimeStar Care Complete` (table row heading or scenario answer)

**Delta Dental PPO Premium**
- `Delta Dental PPO Premium` (plan card headline)
- `the only featured plan that covers adult braces and Invisalign` (contextual, adult ortho scenario)
- `Delta Dental's individual PPO` (contextual prose, network-size section)
- `full Delta Dental PPO Premium review` (carrier grid)
- `Delta Dental PPO Premium and adult orthodontics` (contextual, braces scenario)

**Guardian Premier PPO**
- `Guardian Premier 2.0` (plan card headline)
- `the plan built for families with children heading toward braces` (contextual, kids braces scenario)
- `Guardian's 85 percent day-one fillings` (contextual, basic-work section)
- `full Guardian Premier PPO review` (carrier grid)
- `Guardian Premier and child orthodontics` (contextual, family scenario)

**Humana Extend 5000**
- `Humana Extend 5000` (plan card headline)
- `the $5,000 max plan with vision and hearing bundled` (contextual, family value section)
- `Humana's family loyalty economics` (contextual, family deductible section)
- `full Humana Extend 5000 review` (carrier grid)
- `Humana Extend 5000 for couples approaching mid-life` (contextual, couples scenario)

**MetLife NCD Complete**
- `MetLife NCD Complete` (plan card headline)
- `the plan with a $10,000 annual maximum and no waiting period structure` (contextual, high-max section)
- `MetLife's graduated major benefit schedule` (contextual, plan mechanics section)
- `full MetLife NCD Complete review` (carrier grid)
- `MetLife NCD Complete for large planned cases` (contextual, implant or major-work scenario)

**Mutual of Omaha Dental Preferred**
- `Mutual of Omaha Dental Preferred` (plan card headline)
- `the top pick for seniors and anyone who cannot wait for major work` (contextual, seniors / no-wait section)
- `Mutual of Omaha's selectable annual maximum` (contextual, family economics or senior section)
- `full Mutual of Omaha Dental review` (carrier grid)
- `Mutual of Omaha Dental Preferred and implant coverage` (contextual, implants scenario)

**UHC Primary Dental**
- `UnitedHealthcare Primary Dental` (plan card headline)
- `the entry-level plan that activates in three days` (contextual, first-time buyer or new-job section)
- `the $30-a-month preventive starter plan` (contextual, budget section)
- `full UHC Primary Dental review` (carrier grid)
- `UHC Primary Dental for someone who just needs cleanings covered` (contextual, single adult scenario)

### 2.3 Hub to compare page: anchor text recommendations

The compare page is a mid-funnel destination. It receives links from the hub hero CTA, a contextual prose link in the plan tour section, and the related-links section. Use varied anchor text across each placement.

- `compare all 8 plans side by side` (hero CTA button text)
- `the side-by-side PPO plan comparison table` (contextual prose in plan tour section)
- `Compare PPO Dental Plans` (related-links pill)
- `see how these plans stack up on a single table` (contextual in the "how dental insurance works" educational section)
- `detailed plan comparison` (breadcrumb-adjacent teaser in scenario finder results)

**Rule:** The hub must NOT embed a full side-by-side table. When a user needs a table, send them to the compare page via one of the links above. This preserves topical differentiation and avoids cannibalization (see Section 8).

---

## 3. Hub Links Up to /dental-insurance/

The hub must maintain exactly one upward breadcrumb link to the DI Hub and may have one additional contextual upward link in the editorial trust block or the related-links section. No more than two links to the parent on any version of the hub page.

### 3.1 Breadcrumb (structural, always present)

Rendered HTML breadcrumb (separator: ` / `):

```
Home / Dental Insurance / PPO Dental Plans
```

Link targets:
- `Home` -- `https://www.covercapy.com/`
- `Dental Insurance` -- `https://www.covercapy.com/dental-insurance/`
- `PPO Dental Plans` -- current page (no link, `<span>`)

JSON-LD BreadcrumbList (three positions):
1. `name: "Home"`, `item: "https://www.covercapy.com/"`
2. `name: "Dental Insurance"`, `item: "https://www.covercapy.com/dental-insurance/"`
3. `name: "PPO Dental Plans"`, `item: "https://www.covercapy.com/dental-insurance/ppo-plans/"`

### 3.2 Contextual upward link (one additional, optional)

Placement: related-links section at the bottom of the hub, or the editorial trust block.

Anchor text options (use one, not both):
- `Dental Insurance Hub` (related-links pill)
- `back to the full dental insurance overview` (editorial trust block prose)

**Rule:** Do not link upward to `/dental-insurance/` from inside plan tour stops, scenario cards, or FAQ answers. Upward links from content sections dilute dwell-time signals and interrupt the user's scenario journey. Upward links belong only in breadcrumb and related-links positions.

---

## 4. Hub Links Across to Scenario Pages, Guides, Glossary, Delta Dental Silo, and Dentist Finder

### 4.1 Delta Dental silo bridge

The PPO hub must maintain exactly one visible bridge to the Delta Dental silo. The bridge lives in the plan tour section where Delta Dental appears as a distinct "feature stop" (matching the current architecture in spec 01).

Placement: Delta Dental feature stop card in the plan tour section.

Anchor text:
- `Delta Dental's own hub` (contextual prose: "Because Delta runs the largest network in the country, it gets its own hub rather than a single stop here.")
- `explore the Delta Dental silo` (CTA button on the feature stop card)

Do NOT link to individual Delta silo sub-pages (`/delta-dental/premium/`, `/delta-dental/networks/`, etc.) from the PPO hub. Those are the DI Hub's job (it already has a 12-link Delta cluster). The PPO hub sends one link to the silo root; the silo routes internally from there.

Cross-link from Delta silo back to PPO hub: The Delta silo hub (`/dental-insurance/delta-dental/`) should carry one contextual link to the PPO hub in its "related plans" or "other featured plans" section:
- Anchor text: `see all 8 featured PPO plans` or `compare Delta Dental with other PPO options`
- Placement: sidebar or bottom related section, not in the hero or primary content

### 4.2 Dentist-finder hub bridge

The PPO hub must carry at least two links to `/find-my-dentist`. These are conversion bridges, not editorial content.

Placement 1: Hero or hero sub-line CTA.
- Anchor text: `Find a PPO dentist near you`

Placement 2: Verify CTA band (dark band near bottom of hub).
- Anchor text: `Verify your plan at a local dentist -- free`

Placement 3 (optional, in plan tour or scenario cards): contextual inline.
- Anchor text: `confirm your dentist accepts it before you buy`

**Rule:** Do not link to `/find-my-dentist` from inside the plan tour stop articles. The tour is for plan education. Conversion links belong in the hero, CTA band, and sticky bar (if present). Too many dentist-finder links inside content sections send a commercial-intent signal that competes with the informational intent the hub needs for Cluster 1 ranking.

### 4.3 Guides and scenario pages

The PPO hub may link to a curated short list of `/guides/` pages. Maximum four guide links from the hub page, placed in the related-links section or the "keep exploring" footer section. Do not inline guide links inside plan tour stops.

Approved guide links from the PPO hub:

| Guide URL | Anchor text | Why here |
|-----------|-------------|----------|
| `/guides/no-waiting-period/` | `dental insurance with no waiting period` | Cluster 7 support |
| `/guides/braces-invisalign/` | `dental insurance for braces and Invisalign` | Clusters 3 and 4 support |
| `/guides/implants/` | `dental insurance that covers implants` | Cluster 8 support |
| `/guides/between-jobs/` | `dental coverage between jobs` | Cluster 11 support |

Do not link to `/guides/root-canals/`, `/guides/crowns/cost`, `/guides/dentures/`, or `/guides/whitening/` from the PPO hub. Those are treatment-level pages that belong under the DI Hub's by-treatment section, not the PPO hub's scenario structure.

### 4.4 Glossary bridge

The PPO hub may link to the full glossary index and may include inline tooltip-style terms (using the `.cc-tip` pattern from the Compare Page). Inline tooltips do not count as outbound links for PageRank purposes; they are self-contained widgets.

One external glossary link is permitted per hub page, placed in the educational primer section ("How dental insurance works"):
- Anchor text: `see the full dental insurance glossary`
- Target: `/guides/glossary/`

Do not link to individual term pages (e.g., `/guides/glossary/annual-maximum/`) from the PPO hub. Individual term pages are appropriate destinations from plan pages and guide pages, not from the hub.

### 4.5 Benefit-maxing hub bridge

One soft bridge to `/benefit-maxing/` is permitted from the PPO hub, placed in the waiting-period explainer section or the educational primer section.
- Anchor text: `timing your dental work to maximize your annual benefit`
- Target: `/benefit-maxing/` or `/benefit-maxing/smart-timing-protocol/`

Do not link to the benefit-maxing hub from plan pages. Plan pages are already deep in the funnel; sending users to a benefit-timing hub risks losing the conversion.

### 4.6 Treatment cost estimator

One link to `/dental-treatment-cost-estimator` is permitted from the hub, in the waiting-period explainer section or educational primer.
- Anchor text: `estimate what your procedure will cost out of pocket`

---

## 5. Plan Page Breadcrumbs

Every plan page breadcrumb must include the PPO hub as level 3. This sends a structural link back to the hub on every plan page load and reinforces the hub's topical authority.

### Rendered breadcrumb (all 8 plan pages, same pattern):

```
Home / Dental Insurance / PPO Dental Plans / {Plan Name}
```

Link targets:
- `Home` -- `https://www.covercapy.com/`
- `Dental Insurance` -- `https://www.covercapy.com/dental-insurance/`
- `PPO Dental Plans` -- `https://www.covercapy.com/dental-insurance/ppo-plans/`
- `{Plan Name}` -- current page (no link, `<span>`)

JSON-LD BreadcrumbList (four positions):

| Position | Name | Item URL |
|----------|------|----------|
| 1 | Home | `https://www.covercapy.com/` |
| 2 | Dental Insurance | `https://www.covercapy.com/dental-insurance/` |
| 3 | PPO Dental Plans | `https://www.covercapy.com/dental-insurance/ppo-plans/` |
| 4 | {Plan name per table in spec 04} | `https://www.covercapy.com/dental-insurance/ppo-plans/{slug}/` |

The `{Plan Name}` values for each slug are documented in spec 04, Section 3.

---

## 6. Related-Plan Module on Plan Pages (Pointing Back to Hub and Across to Other Plans)

Every plan page must include a "Related plans" or "Other featured plans" module. This module serves three functions: it passes PageRank back to the hub, it provides editorial cross-links to two or three peer plans, and it gives users a navigation path out of a leaf page without hitting the back button.

### 6.1 Module structure

The module appears below the main plan content and above the FAQ section. It contains:
1. One "return to hub" link (always present)
2. Two to three peer plan links (scenario-matched, not alphabetical)
3. One compare page link

### 6.2 Return-to-hub link (present on all 8 plan pages)

- Anchor text pattern: `All {N} featured PPO plans` or `Compare all featured PPO plans`
- Target: `https://www.covercapy.com/dental-insurance/ppo-plans/`
- Placement: first item in the related-plan module, visually distinct (button or highlighted card)

### 6.3 Peer plan links per plan page (scenario-matched)

Use the cluster-to-plan mapping from spec 03 to select peers. Avoid recommending a plan that directly competes on the same exact scenario (to prevent cannibalization within the silo). Pair plans that together answer the "what else could I consider" question without undermining the page's primary plan.

| Plan page | Peer plan 1 | Peer plan 2 | Peer plan 3 (optional) |
|-----------|-------------|-------------|------------------------|
| Aetna Dental Direct | Humana Extend 5000 | Ameritas PrimeStar | UHC Primary Dental |
| Ameritas PrimeStar | Mutual of Omaha Dental | MetLife NCD Complete | Aetna Dental Direct |
| Delta Dental PPO Premium | Guardian Premier PPO | (no 3rd -- Delta is distinct; 2 is sufficient) | |
| Guardian Premier PPO | Delta Dental PPO Premium | Humana Extend 5000 | |
| Humana Extend 5000 | Mutual of Omaha Dental | Aetna Dental Direct | Guardian Premier PPO |
| MetLife NCD Complete | Mutual of Omaha Dental | Ameritas PrimeStar | |
| Mutual of Omaha Dental | Ameritas PrimeStar | MetLife NCD Complete | Guardian Premier PPO |
| UHC Primary Dental | Aetna Dental Direct | Ameritas PrimeStar | |

### 6.4 Peer plan link anchor text rules

Anchor text for peer plan links in the related-plan module must be descriptive and scenario-keyed, not just the plan name. The plan name alone is acceptable only for the return-to-hub link and the compare page link.

Examples:
- `Mutual of Omaha Dental -- best for no-wait major and implants`
- `Ameritas PrimeStar -- no waiting period on any category`
- `Guardian Premier -- 85 percent day-one fillings and child orthodontics`
- `Humana Extend 5000 -- $5,000 annual max with vision bundle`
- `UHC Primary Dental -- $30/mo preventive-first entry plan`
- `Aetna Dental Direct -- includes CVS ExtraCare Plus pharmacy perks`
- `Delta Dental PPO Premium -- the only plan here covering adult braces`
- `MetLife NCD Complete -- $10,000 annual max, no waiting period structure`

### 6.5 Compare page link in the module (present on all 8 plan pages)

- Anchor text: `Compare {Plan Name} with all 8 plans side by side`
- Target: compare page URL (per Option A or B decision from spec 04)
- Placement: last item in the related-plan module

---

## 7. Compare Page Links

The compare page is a child of the PPO hub in the breadcrumb (virtual or physical per spec 04 FLAG-03 decision). Its links must reinforce this relationship.

### 7.1 Compare page breadcrumb

Option B (keep URL `/compare-ppo-dental-plans`, update breadcrumb and schema only):

Rendered breadcrumb:
```
Home / Dental Insurance / PPO Dental Plans / Compare PPO Dental Plans
```

JSON-LD BreadcrumbList:
1. `name: "Home"`, `item: "https://www.covercapy.com/"`
2. `name: "Dental Insurance"`, `item: "https://www.covercapy.com/dental-insurance/"`
3. `name: "PPO Dental Plans"`, `item: "https://www.covercapy.com/dental-insurance/ppo-plans/"`
4. `name: "Compare PPO Dental Plans"`, `item: "https://www.covercapy.com/compare-ppo-dental-plans"`

This passes structural equity back to the hub on every load.

### 7.2 Compare page to hub link

Placement: breadcrumb (above), plus one additional contextual link in the sticky TOC or the "explore plans" section.
- Anchor text: `PPO Plans Hub` (breadcrumb) and `browse all 8 plans with full stories` (contextual)
- Target: `/dental-insurance/ppo-plans/`

### 7.3 Compare page to plan pages (existing, preserve)

The compare page already links to each plan page via the `#explore-carriers` section. Preserve all 8 links. Anchor text should follow the same descriptive, scenario-keyed format:
- `Aetna Dental Direct -- CVS perks, waivable waits`
- `Ameritas PrimeStar -- zero waiting periods`
- etc.

Do not change these to bare plan names; the descriptive text passes keyword context and aids GEO citation matching.

### 7.4 Compare page to dentist finder

One conversion link to `/find-my-dentist` from the compare page, in the CTA band or sticky TOC button:
- Anchor text: `Find a dentist who takes your chosen plan -- free`

---

## 8. PageRank Flow Rules and Cannibalization Guardrails

### 8.1 Directional flow summary

```
DI Hub  -->  PPO Hub  -->  Plan Pages
                  |
                  +-->  Compare Page  -->  Plan Pages
                  |
                  +-->  Delta Silo (one link only)
                  +-->  Dentist Finder (hero + CTA band only)
                  +-->  Guides (related section only, 4 max)
                  +-->  Glossary (educational section, 1 link)
                  +-->  Benefit-maxing (educational section, 1 link)

Plan Pages  -->  PPO Hub (breadcrumb + related module)
Plan Pages  -->  Compare Page (related module)
Plan Pages  -->  Dentist Finder (verify CTA)
Plan Pages  -->  1 relevant guide max (related section)

Compare Page  -->  PPO Hub (breadcrumb + contextual)
Compare Page  -->  Plan Pages (explore-carriers section)
Compare Page  -->  Dentist Finder (CTA band)
```

### 8.2 What is forbidden

The following link patterns are forbidden because they cause keyword cannibalization, PageRank leakage, or circular authority loops.

| Forbidden link | Reason |
|----------------|--------|
| Hub links to individual Delta silo sub-pages (`/delta-dental/premium/` etc.) | Those are the DI Hub's cluster; PPO hub loses focus |
| Hub links to more than 4 guides from content sections | Excessive outbound links from hub dilute topical cluster |
| Plan pages link to the DI Hub directly | Creates circular path bypassing the PPO hub; undercuts hub authority |
| Plan pages link to more than 3 peer plan pages | Creates horizontal link spread that flattens the hierarchy |
| Plan pages link to the benefit-maxing hub | Off-funnel in a conversion-intent context |
| Multiple links to the same URL with the same anchor text on one page | Over-optimization signal and wasted crawl budget |
| Hub or plan pages link to `/compare-ppo-dental-plans` with anchor text "best dental insurance 2026" | Sends the head-term anchor to the compare page, cannibalizing the hub's Cluster 1 target |
| Any page links to the stale `/dentists/` paths or `seo_path` fields | Documented in CLAUDE.md -- always build from parts |
| Hub page contains a full comparison table | Table content belongs on the compare page; duplicating it here cannibalizes the compare page |
| Scenario/plan pages link to each other bidirectionally without hub mediation | Flat cross-linking weakens the hub's role as the authority node |

### 8.3 Anchor text diversity rules

- No destination URL should receive the same anchor text from more than two links across the entire silo.
- Brand name alone (e.g., "Aetna Dental Direct") is a valid anchor in plan card headlines and breadcrumbs. Everywhere else, add a scenario modifier.
- Generic anchors ("click here", "learn more", "this plan") are forbidden site-wide per standard CoverCapy guidelines.
- Exact-match money keyword anchors ("best dental insurance 2026", "no waiting period dental insurance") should be reserved for the page that targets that cluster as primary. Using these anchors when pointing to a different page sends the wrong ranking signal.

### 8.4 Topic separation (content rules to prevent cannibalization)

| Page | Owns this topic | Must NOT contain |
|------|-----------------|------------------|
| PPO Hub | Scenario-first plan selection, which plan fits which life situation | Side-by-side comparison table, individual carrier deep-dives, full waiting period schedules |
| Compare Page | Feature-by-feature side-by-side grid, "which plan wins on X metric" | Scenario narrative, plan stories, life-event guides |
| Plan pages | Single-carrier deep dive, SSOT-sourced facts, FAQs for that carrier | Comparison tables with other plans (max 3-row "how we compare" snippet), scenario content unrelated to that carrier |
| Guides | Treatment or situation-specific education | Plan comparison tables, hub-level scenario finder |
| Delta silo | Delta Dental brand-specific content | Other-carrier plan comparisons |

---

## 9. Master Link Table

Every recommended link in the silo is listed below. Source section refers to the section of the source page where the link lives, not the page URL alone.

| # | Source page | Source section | Target URL | Anchor text | Rationale |
|---|-------------|----------------|-----------|-------------|-----------|
| 1 | PPO Hub | Breadcrumb | `/dental-insurance/` | Dental Insurance | Structural upward link; BreadcrumbList schema |
| 2 | PPO Hub | Hero CTA (primary) | `/find-my-dentist` | Find a PPO dentist near you | Conversion bridge; hero placement maximizes visibility |
| 3 | PPO Hub | Hero CTA (secondary) | Compare page | compare all 8 plans side by side | Mid-funnel bridge from hero; differentiates hub (scenario) from compare (table) |
| 4 | PPO Hub | Scenario card: cleanings only | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UnitedHealthcare Primary Dental | Cluster 15 plan match; scenario-keyed anchor |
| 5 | PPO Hub | Scenario card: cleanings only | `/dental-insurance/ppo-plans/aetna-dental-direct/` | the entry-level plan with CVS perks | Cluster 9 cross-mention; secondary option in scenario |
| 6 | PPO Hub | Scenario card: crown looming | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas's day-one major coverage | Cluster 7 / urgent-need plan match |
| 7 | PPO Hub | Scenario card: crown looming | `/dental-insurance/ppo-plans/aetna-dental-direct/` | how Aetna Dental Direct handles the job-change waiver | Cluster 11 bridge; secondary within scenario |
| 8 | PPO Hub | Scenario card: implant ahead | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental Preferred and implant coverage | Cluster 8 primary plan match |
| 9 | PPO Hub | Scenario card: implant ahead | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 -- $2,000/year implant benefit | Cluster 8 secondary plan match |
| 10 | PPO Hub | Scenario card: kid needs braces | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier and child orthodontics | Cluster 3 primary plan match |
| 11 | PPO Hub | Scenario card: adult braces | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | the only featured plan that covers adult braces and Invisalign | Cluster 4 primary plan match |
| 12 | PPO Hub | Scenario card: just left a job | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct | Cluster 11 plan match; plan name anchor acceptable in card headline |
| 13 | PPO Hub | Scenario card: just left a job | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar Care Complete | Cluster 11 secondary |
| 14 | PPO Hub | Scenario card: big year ahead | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental Preferred | Cluster 8 / Cluster 1 match |
| 15 | PPO Hub | Scenario card: over 65 / Medicare gap | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | the top pick for seniors and anyone who cannot wait for major work | Cluster 6 primary |
| 16 | PPO Hub | Scenario card: over 65 / Medicare gap | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- age-neutral pricing, no waiting period | Cluster 6 secondary |
| 17 | PPO Hub | Scenario card: whole family | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 for families | Cluster 2 primary |
| 18 | PPO Hub | Scenario card: whole family | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | the plan built for families with children heading toward braces | Cluster 2 + 3 combo |
| 19 | PPO Hub | Scenario card: couples / two adults | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna's CVS ExtraCare Plus plan | Cluster 5 + 9 combo |
| 20 | PPO Hub | Scenario card: couples / two adults | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 for couples approaching mid-life | Cluster 5 secondary |
| 21 | PPO Hub | Scenario card: want everyday perks | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct | Cluster 9; plan name acceptable in perk-teaser card headline |
| 22 | PPO Hub | Plan tour stop: UHC | `/dental-insurance/ppo-plans/uhc-primary-dental/` | Full UHC Primary Dental review | Tour stop CTA; disambiguating anchor |
| 23 | PPO Hub | Plan tour stop: Aetna | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Full Aetna Dental Direct review | Tour stop CTA |
| 24 | PPO Hub | Plan tour stop: Ameritas | `/dental-insurance/ppo-plans/ameritas-primestar/` | Full Ameritas PrimeStar review | Tour stop CTA |
| 25 | PPO Hub | Plan tour stop: Guardian | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Full Guardian Premier PPO review | Tour stop CTA |
| 26 | PPO Hub | Plan tour stop: MetLife | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | Full MetLife NCD Complete review | Tour stop CTA |
| 27 | PPO Hub | Plan tour stop: MOO | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Full Mutual of Omaha Dental review | Tour stop CTA |
| 28 | PPO Hub | Plan tour stop: Humana | `/dental-insurance/ppo-plans/humana-extend-5000/` | Full Humana Extend 5000 review | Tour stop CTA |
| 29 | PPO Hub | Delta feature stop | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental PPO Premium | Plan card headline in feature stop |
| 30 | PPO Hub | Delta feature stop | `/dental-insurance/delta-dental/` | Delta Dental's own hub | Cross-silo bridge; prose contextual |
| 31 | PPO Hub | Delta feature stop CTA | `/dental-insurance/delta-dental/` | explore the Delta Dental silo | Cross-silo CTA button |
| 32 | PPO Hub | Plan tour (below-tour contextual) | Compare page | the side-by-side PPO plan comparison table | Mid-funnel bridge after users have read all plan stories |
| 33 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct | Grid card headline; plan name anchor acceptable in grid context |
| 34 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar Care Complete | Grid card |
| 35 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental PPO Premium | Grid card |
| 36 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier PPO | Grid card |
| 37 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 | Grid card |
| 38 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete | Grid card |
| 39 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental Preferred | Grid card |
| 40 | PPO Hub | Carrier grid / explore section | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UnitedHealthcare Primary Dental | Grid card |
| 41 | PPO Hub | Educational primer / "how it works" | `/guides/glossary/` | see the full dental insurance glossary | Glossary bridge; one link only |
| 42 | PPO Hub | Waiting-period explainer section | `/dental-treatment-cost-estimator` | estimate what your procedure will cost out of pocket | Tool bridge; same placement as current hub |
| 43 | PPO Hub | Waiting-period explainer or educational | `/benefit-maxing/smart-timing-protocol/` | timing your dental work to maximize your annual benefit | Soft cross-hub bridge |
| 44 | PPO Hub | Verify CTA band | `/find-my-dentist` | Verify your plan at a local dentist -- free | Second dentist-finder conversion point |
| 45 | PPO Hub | Related-links section | Compare page | Compare PPO Dental Plans | Related pill; matches current hub pattern |
| 46 | PPO Hub | Related-links section | `/find-my-dentist` | Find PPO Dentists | Related pill |
| 47 | PPO Hub | Related-links section | `/dental-insurance/` | Dental Insurance Hub | Upward related pill; one of two permitted upward links |
| 48 | PPO Hub | Related-links section | `/guides/no-waiting-period/` | dental insurance with no waiting period | Guide bridge; Cluster 7 support |
| 49 | PPO Hub | Related-links section | `/guides/braces-invisalign/` | dental insurance for braces and Invisalign | Guide bridge; Cluster 3+4 support |
| 50 | PPO Hub | Related-links section | `/guides/implants/` | dental insurance that covers implants | Guide bridge; Cluster 8 support |
| 51 | PPO Hub | Related-links section | `/guides/between-jobs/` | dental coverage between jobs | Guide bridge; Cluster 11 support |
| 52 | All 8 plan pages | Breadcrumb level 3 | `/dental-insurance/ppo-plans/` | PPO Dental Plans | Structural; BreadcrumbList schema; passes equity to hub on every load |
| 53 | Aetna plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link from leaf to hub |
| 54 | Aetna plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 -- $5,000 annual max with vision bundle | Scenario-keyed peer |
| 55 | Aetna plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- no waiting period on any category | Scenario-keyed peer |
| 56 | Aetna plan page | Related module: peer 3 | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UHC Primary Dental -- $30/mo preventive-first entry plan | Scenario-keyed peer |
| 57 | Aetna plan page | Related module: compare link | Compare page | Compare Aetna Dental Direct with all 8 plans side by side | Compare bridge from leaf |
| 58 | Aetna plan page | Verify CTA | `/find-my-dentist` | Find a dentist who accepts Aetna Dental Direct -- free | Conversion bridge; plan-specific anchor |
| 59 | Ameritas plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 60 | Ameritas plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental -- best for no-wait major and implants | Scenario-keyed peer |
| 61 | Ameritas plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete -- $10,000 annual max, no waiting period structure | Scenario-keyed peer |
| 62 | Ameritas plan page | Related module: peer 3 | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct -- includes CVS ExtraCare Plus pharmacy perks | Scenario-keyed peer |
| 63 | Ameritas plan page | Related module: compare link | Compare page | Compare Ameritas PrimeStar with all 8 plans side by side | Compare bridge |
| 64 | Ameritas plan page | Verify CTA | `/find-my-dentist` | Find a dentist in the Ameritas Classic PPO network -- free | Conversion bridge |
| 65 | Delta plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 66 | Delta plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier -- 85 percent day-one fillings and child orthodontics | Scenario-keyed peer |
| 67 | Delta plan page | Related module: peer 2 | `/dental-insurance/delta-dental/` | explore the full Delta Dental hub | Cross-silo bridge from plan page (permitted here since this IS the Delta plan) |
| 68 | Delta plan page | Related module: compare link | Compare page | Compare Delta Dental PPO Premium with all 8 plans side by side | Compare bridge |
| 69 | Delta plan page | Verify CTA | `/find-my-dentist` | Find a dentist in the Delta Dental network -- free | Conversion bridge |
| 70 | Guardian plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 71 | Guardian plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental PPO Premium -- the only plan here covering adult braces | Scenario-keyed peer |
| 72 | Guardian plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 -- $5,000 annual max with vision bundle | Scenario-keyed peer |
| 73 | Guardian plan page | Related module: compare link | Compare page | Compare Guardian Premier PPO with all 8 plans side by side | Compare bridge |
| 74 | Guardian plan page | Verify CTA | `/find-my-dentist` | Find a dentist in the DentalGuard Preferred network -- free | Conversion bridge; network name adds keyword value |
| 75 | Humana plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 76 | Humana plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental -- best for no-wait major and implants | Scenario-keyed peer |
| 77 | Humana plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct -- CVS perks, waivable waits | Scenario-keyed peer |
| 78 | Humana plan page | Related module: peer 3 | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier -- 85 percent day-one fillings and child orthodontics | Scenario-keyed peer |
| 79 | Humana plan page | Related module: compare link | Compare page | Compare Humana Extend 5000 with all 8 plans side by side | Compare bridge |
| 80 | Humana plan page | Verify CTA | `/find-my-dentist` | Find a Humana in-network dentist -- free | Conversion bridge |
| 81 | MetLife plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 82 | MetLife plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental -- best for no-wait major and implants | Scenario-keyed peer |
| 83 | MetLife plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- zero waiting periods | Scenario-keyed peer |
| 84 | MetLife plan page | Related module: compare link | Compare page | Compare MetLife NCD Complete with all 8 plans side by side | Compare bridge |
| 85 | MetLife plan page | Verify CTA | `/find-my-dentist` | Find a dentist who accepts MetLife -- free | Conversion bridge |
| 86 | MOO plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 87 | MOO plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- zero waiting periods | Scenario-keyed peer |
| 88 | MOO plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete -- $10,000 annual max, no waiting period structure | Scenario-keyed peer |
| 89 | MOO plan page | Related module: peer 3 | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier -- 85 percent day-one fillings and child orthodontics | Scenario-keyed peer |
| 90 | MOO plan page | Related module: compare link | Compare page | Compare Mutual of Omaha Dental with all 8 plans side by side | Compare bridge |
| 91 | MOO plan page | Verify CTA | `/find-my-dentist` | Find a DenteMax Plus dentist near you -- free | Conversion bridge; network name adds keyword value |
| 92 | UHC plan page | Related module: return link | `/dental-insurance/ppo-plans/` | All 8 featured PPO plans | Upward link |
| 93 | UHC plan page | Related module: peer 1 | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct -- includes CVS ExtraCare Plus pharmacy perks | Scenario-keyed peer |
| 94 | UHC plan page | Related module: peer 2 | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- zero waiting periods | Scenario-keyed peer |
| 95 | UHC plan page | Related module: compare link | Compare page | Compare UHC Primary Dental with all 8 plans side by side | Compare bridge |
| 96 | UHC plan page | Verify CTA | `/find-my-dentist` | Find a UnitedHealthcare in-network dentist -- free | Conversion bridge |
| 97 | Compare page | Breadcrumb level 3 | `/dental-insurance/ppo-plans/` | PPO Dental Plans | Structural upward link; BreadcrumbList schema |
| 98 | Compare page | Contextual in explore section | `/dental-insurance/ppo-plans/` | browse all 8 plans with full stories | Additional upward contextual link |
| 99 | Compare page | CTA band | `/find-my-dentist` | Find a dentist who takes your chosen plan -- free | Conversion bridge |
| 100 | Compare page | Explore-carriers: Aetna | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct -- CVS perks, waivable waits | Scenario-keyed carrier link |
| 101 | Compare page | Explore-carriers: Ameritas | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- zero waiting periods | Scenario-keyed carrier link |
| 102 | Compare page | Explore-carriers: Delta | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental PPO Premium -- the only plan here covering adult braces | Scenario-keyed carrier link |
| 103 | Compare page | Explore-carriers: Guardian | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier -- 85 percent day-one fillings and child orthodontics | Scenario-keyed carrier link |
| 104 | Compare page | Explore-carriers: Humana | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 -- $5,000 annual max with vision bundle | Scenario-keyed carrier link |
| 105 | Compare page | Explore-carriers: MetLife | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete -- $10,000 annual max, no waiting period structure | Scenario-keyed carrier link |
| 106 | Compare page | Explore-carriers: MOO | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental -- best for no-wait major and implants | Scenario-keyed carrier link |
| 107 | Compare page | Explore-carriers: UHC | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UHC Primary Dental -- $30/mo preventive-first entry plan | Scenario-keyed carrier link |
| 108 | DI Hub | Carrier section link card | `/dental-insurance/ppo-plans/` | All carriers and plans | Already present; verify anchor text on rebuild |
| 109 | DI Hub | Carrier table: each row | `/dental-insurance/ppo-plans/{slug}/` | Plan name per row | Already present; verify all 8 slugs match canonical paths |
| 110 | Delta silo hub | Related section | `/dental-insurance/ppo-plans/` | see all 8 featured PPO plans | Cross-silo return link from Delta to PPO hub |
| 111 | Delta silo hub | Related section | Compare page | compare Delta Dental with other PPO options | Cross-silo compare bridge |

---

## 10. Proposed New Scenario and Landing Pages to Complete the Silo

The following pages do not currently exist. Creating them would expand the silo, capture long-tail Clusters from spec 03, and provide additional nodes that link back to the hub, compounding its authority.

Each proposed page would:
- Have the PPO hub in its breadcrumb at level 3 (or the hub as its direct parent)
- Link back to the PPO hub in its related module
- Link to 2-3 relevant plan pages
- Link to the compare page
- Receive a contextual link from the PPO hub's scenario finder or life-event section

### Priority 1: High-value, low-competition, matches existing cluster

**Page 1: No-Waiting-Period PPO Plans Guide**
- Proposed URL: `/dental-insurance/ppo-plans/no-waiting-period/`
- Primary cluster: Cluster 7 (dental insurance with no waiting period)
- Title pattern: `Dental Insurance With No Waiting Period 2026: Plans That Cover Day One`
- Plans featured: Ameritas PrimeStar (primary), Mutual of Omaha (secondary), MetLife NCD (verify SSOT)
- GEO target: "Which dental plan has absolutely no waiting period for major work?"
- Hub link from: "Need coverage fast" scenario card CTA and related-links section
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / No Waiting Period Plans

**Page 2: Dental Insurance for Seniors Over 65**
- Proposed URL: `/dental-insurance/ppo-plans/seniors-over-65/`
- Primary cluster: Cluster 6 (seniors / Medicare gap)
- Title pattern: `Best Dental Insurance for Seniors Over 65 in 2026`
- Plans featured: Mutual of Omaha (primary), Ameritas PrimeStar (secondary)
- GEO target: "What is the best dental insurance for someone over 65 who is not on Medicare Advantage?"
- Hub link from: "Over 65 / Medicare gap" scenario card CTA
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Dental Insurance for Seniors

**Page 3: Dental Insurance for Families**
- Proposed URL: `/dental-insurance/ppo-plans/family-dental-insurance/`
- Primary cluster: Cluster 2 (family dental insurance)
- Title pattern: `Best Family Dental Insurance Plans 2026: Annual Maximums, Kids, and Braces`
- Plans featured: Humana Extend 5000 (primary), Guardian Premier (child ortho), Mutual of Omaha (selectable max)
- GEO target: "What is the best dental insurance plan for a family of four?"
- Hub link from: "Whole family" scenario card CTA
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Family Dental Insurance

**Page 4: Dental Insurance That Covers Implants**
- Proposed URL: `/dental-insurance/ppo-plans/implant-coverage/`
- Primary cluster: Cluster 8 (dental insurance for implants)
- Title pattern: `Dental Insurance That Covers Implants 2026: Lifetime Maximums Compared`
- Plans featured: Mutual of Omaha (primary, $3,000 lifetime), Ameritas PrimeStar (day-one), Guardian (separate cap)
- GEO target: "Which PPO dental plan has the highest lifetime maximum for dental implants?"
- Hub link from: "Planning implants" scenario card CTA
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Dental Insurance for Implants

### Priority 2: Medium value, fills scenario gaps

**Page 5: Dental Insurance After Job Loss (COBRA Alternative)**
- Proposed URL: `/dental-insurance/ppo-plans/after-job-loss/`
- Primary cluster: Cluster 11 (job loss / COBRA gap)
- Title pattern: `Dental Insurance After Losing Your Job: COBRA vs. Individual PPO Plans 2026`
- Plans featured: Ameritas PrimeStar (no wait, fast activation), Aetna Dental Direct (waiver for prior coverage), Mutual of Omaha
- Hub link from: Life-event triggers section ("Just lost your job?")
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Dental Insurance After Job Loss

**Page 6: Dental Insurance for Couples (Two Adults)**
- Proposed URL: `/dental-insurance/ppo-plans/dental-insurance-for-couples/`
- Primary cluster: Cluster 5 (couples / two-person plans)
- Title pattern: `Best Dental Insurance for Couples in 2026: Two-Person PPO Plans Compared`
- Plans featured: Aetna Dental Direct (CVS perks across two members), Humana Extend 5000, Mutual of Omaha (community-rated)
- Hub link from: "You and your partner" scenario card CTA
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Dental Insurance for Couples

**Page 7: Dental Insurance That Covers Adult Braces**
- Proposed URL: `/dental-insurance/ppo-plans/adult-braces-coverage/`
- Primary cluster: Cluster 4 (adult braces / Invisalign)
- Title pattern: `Dental Insurance That Covers Adult Braces and Invisalign 2026`
- Plans featured: Delta Dental PPO Premium (primary and only individual PPO on the shelf covering adult ortho)
- Hub link from: "Adult braces or Invisalign" scenario card CTA
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / Dental Insurance for Adult Braces
- Note: This page should cross-link to `/dental-insurance/delta-dental/` and `/dental-insurance/guardian-orthodontics-coverage/` for completeness

**Page 8: Dental Insurance with CVS Rewards (Aetna ExtraCare Plus)**
- Proposed URL: `/dental-insurance/ppo-plans/cvs-extracare-plus-dental/`
- Primary cluster: Cluster 9 (CVS rewards / perks)
- Title pattern: `Aetna Dental Direct and CVS ExtraCare Plus: How the Perk Works 2026`
- Plans featured: Aetna Dental Direct (exclusive to this cluster)
- Hub link from: "Want everyday perks" scenario card CTA and right rail CVS teaser
- Breadcrumb: Home / Dental Insurance / PPO Dental Plans / CVS ExtraCare Plus Dental Perk
- Note: Very low competition per spec 03; high GEO citation potential. Build this page before competitors notice the gap.

### Priority 3: Lower urgency, builds silo depth over time

**Page 9: Dental Insurance When Retiring**
- Proposed URL: `/dental-insurance/ppo-plans/retirement-dental-insurance/`
- Primary cluster: Cluster 14 (retirement / Medicare transition)
- Plans featured: Mutual of Omaha, Ameritas PrimeStar

**Page 10: Dental Insurance for Kids / Pediatric PPO Plans**
- Proposed URL: `/dental-insurance/ppo-plans/dental-insurance-for-kids/`
- Primary cluster: Cluster 3 + 12 (kids / braces / new baby)
- Plans featured: Guardian Premier 2.0 (primary), Humana Extend 5000 (family)

**Page 11: Dental Insurance for the Self-Employed**
- Proposed URL: `/dental-insurance/ppo-plans/self-employed/`
- Primary cluster: Cluster 15 (first-time buyer / self-employed / gig workers)
- Plans featured: UHC Primary Dental (entry), Ameritas PrimeStar (no wait), Aetna Dental Direct (balanced)

---

## 11. Implementation Order

Build the silo in this sequence to maximize early PageRank return and minimize risk.

1. **Update breadcrumbs on all existing plan pages** to include level 3 `/dental-insurance/ppo-plans/`. This immediately passes structural equity to the hub before any content is rebuilt. (Low effort, high immediate impact.)

2. **Add the related-plan module to all 8 plan pages** using the peer pairs in Section 6.3 and the anchor texts in Section 6.4. (Closes the current gap where plan pages have no upward or lateral links.)

3. **Update the compare page breadcrumb schema** to include `/dental-insurance/ppo-plans/` at position 3 per Section 7.1. (Low effort, no URL change needed under Option B.)

4. **Rebuild the PPO hub** with scenario cards, plan tour, and the linking architecture in Section 2 and Section 4. All links in rows 1-51 of the master table go live in this deploy.

5. **Create scenario/landing pages in Priority 1 order** (Pages 1-4 first). Each new page receives a contextual link from the rebuilt hub's scenario finder section. Submit new URLs to GSC after each batch deploy.

6. **Create Priority 2 scenario pages** (Pages 5-8) in the following sprint.

7. **Create Priority 3 pages** as ongoing silo depth investment.

---

## 12. Cross-Check Against Existing Specs

| Spec | Cross-reference note |
|------|----------------------|
| Spec 04 (IA / URL migration) | FLAG-03 (Option A vs B for compare page URL) determines the `item` URL in the compare page BreadcrumbList at position 4. This spec is written to work with either option; substitute the Option A URL if FLAG-03 resolves in favor of the physical move. |
| Spec 03 (keyword map) | All scenario card plan matches in this spec use the Cluster-to-Plan Mapping Table from spec 03. If that table changes after SSOT reconciliation, update the anchor text in rows 4-21 of the master link table accordingly. |
| Spec 01 (current state audit) | Section 5.2 of the audit lists current cross-linking gaps. Every gap listed there is addressed by this spec. The DI Hub right rail gap (no PPO Hub or compare page link in the rail's "popular guides") is out of scope for this spec but should be flagged for the DI Hub rebuild. |
| Spec 15 (on-page SEO) | Title tags and meta descriptions on the proposed scenario pages (Section 10) must follow the cannibalization guardrail in Section 8.4: scenario pages own long-tail cluster queries, NOT the head-term "best dental insurance 2026" which belongs to the PPO hub. |
| Spec 16 (GEO / AI citation) | GEO answer blocks on the PPO hub for Clusters 6, 7, 8, and 9 should each contain an inline contextual link to the corresponding proposed scenario page (Pages 1, 2, 4, 8 above). This allows AI citation of the hub's GEO block to carry the scenario page as a next-click destination. |
| CLAUDE.md | Plan facts cited in any anchor text or contextual link passage must come from `/data/plans/*.md` SSOTs. The anchor texts in this spec use qualitative descriptors ("best for no-wait major," "zero waiting periods"), not specific premium or percentage figures, to avoid stale anchor text if SSOT figures change. |

---

*End of spec 17. Immediate dependent: spec 18 (content outline and plan stories) must use the section structure implied by this linking spec -- scenario cards, plan tour, carrier grid, related-links -- as its scaffold. Spec 15 (on-page SEO) should review Section 8.4 of this document before finalizing title tags for any new scenario pages.*
