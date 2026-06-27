# 11 — Internal Linking + Entity Plan: PPO Hub
## PPO Plans Hub Rebuild | CoverCapy | Agent 11 of 15 | 2026-06-26

**Scope:** Concrete internal linking and entity coverage plan for `/dental-insurance/ppo-plans/` (the hub file at `dental-insurance/ppo-plans/index.html`, current build ~1,452 lines). Every link the hub should contain, the exact anchor text per occurrence, the section it lives in, and the rationale. Cannibalization guardrails vs the compare page and plan pages. Related-links strip targets. Anchor-text diversity rules. Ready-to-implement link table.

**Reads used:** `00-BRIEF.md`, `17-internal-linking-silo.md`, hub file (`index.html`).

**Status:** PLANNING ONLY. No production changes until all 15 specs are complete and user-approved.

---

## 1. What the Hub File Already Has (Gap Audit)

The current hub (`index.html`) has the following link structure in place:

**Already present:**
- Breadcrumb: `Home / Dental Insurance / PPO Plans` with correct `<a>` targets to `covercapy.com/` and `covercapy.com/dental-insurance/`
- Tour-stop `<h3>` links to all 8 plan pages (plan name as anchor, within `<a href="/dental-insurance/ppo-plans/{slug}/">`)
- Tour-stop panel buttons: `Read the full {Plan} review` linking to plan pages
- Tour-stop panel buttons: `Verify my dentist` linking to `/find-my-dentist?plan={slug}`
- Hero CTAs: `Find my plan` (anchor to `#scenario-finder`) and `Compare all eight` (anchor to `#compare-table`) -- both currently anchor-only, not linking to the compare PAGE
- Left rail "Your situation" links anchor to tour stops (`#stop-uhc` etc.), not external pages

**Gaps confirmed:**
1. Hero has no live link to `/find-my-dentist` (primary conversion bridge missing)
2. Hero has no live link to `/compare-ppo-dental-plans` (mid-funnel bridge missing)
3. Scenario finder answer blocks exist in JS but have no confirmed links to plan pages or compare page in the rendered HTML (they should link)
4. No link to `/dental-insurance/delta-dental/` (cross-silo bridge missing)
5. No link to `/guides/glossary/` (educational bridge missing)
6. No link to `/benefit-maxing/` or `/benefit-maxing/smart-timing-protocol/` (soft bridge missing)
7. No link to `/dental-treatment-cost-estimator` (tool bridge missing)
8. No links to guide pages (`/guides/no-waiting-period/`, `/guides/braces-invisalign/`, `/guides/implants/`, `/guides/between-jobs/`)
9. No `related` pill strip linking to parent `/dental-insurance/` or guides
10. Delta tour stop has no cross-silo CTA pointing to `/dental-insurance/delta-dental/`
11. Scenario finder answer CTAs link to `/find-my-dentist?q=...` but do not link directly to the matched plan page
12. Compare page is referenced only as an anchor (`#compare-table`) within the hub, not as a live URL to `/compare-ppo-dental-plans`

---

## 2. Hub Unique Angle (Cannibalization Guardrail)

Before placing any link, understand what the hub uniquely owns, so links signal its topic rather than bleeding it into other pages.

| Page | Owns | Must NOT replicate on hub |
|------|------|--------------------------|
| PPO Hub (this page) | Scenario-first plan matching, life-event framing, "which plan fits your situation" narrative, 8 mini-stories | Side-by-side comparison table, full waiting period schedule as a table, single-carrier deep dives |
| Compare Page `/compare-ppo-dental-plans` | Feature-by-feature grid, metric wins per column, "which plan wins on X" | Scenario narrative, life-event framing |
| Plan pages (8 leaves) | Per-carrier SSOT facts, carrier FAQ, full premium schedule, dentist verify CTA | Cross-carrier comparison tables |

**Rule in practice:** Every link from the hub to the compare page must carry anchor text that says "compare" or "side by side" -- never "best dental plan 2026" (that is the hub's own head-term anchor). Every link to a plan page carries a scenario modifier, not just the plan name, except in grid card headlines and breadcrumbs where the name alone is correct.

---

## 3. Anchor-Text Diversity Rules

These rules apply to the hub page only (not plan pages or the compare page, which have their own rules in spec 17):

1. **No destination URL receives the same anchor text twice on the hub page.** Each plan page and the compare page must have varied anchor text across every occurrence.
2. **Plan name alone** (`Aetna Dental Direct`, `Guardian Premier 2.0`, etc.) is permitted as anchor text exactly once per plan page destination, in the tour-stop `<h3>` link or the carrier grid card. Every other occurrence must add a scenario modifier.
3. **Generic anchors are forbidden:** "click here", "learn more", "this plan", "read more". Every anchor must name either the plan or the situation.
4. **Head-term anchors** ("best dental insurance 2026", "PPO dental plans") must not be used when pointing to any destination other than the hub itself. These belong to the hub's own title tag.
5. **Conversion-bridge anchors** to `/find-my-dentist` should name either the plan or the action: "Find a PPO dentist near you", "Verify your plan at a local dentist -- free", "confirm your dentist accepts it before you buy". No bare "Find My Dentist" pill.
6. **Maximum 2 occurrences** of any anchor text string sitewide per target URL (per spec 17 Section 8.3). On the hub page alone, 1 occurrence per anchor string per target is the practical standard.
7. **Delta cross-silo links**: use two distinct anchors ("Delta Dental's own hub" in prose, "explore the Delta Dental silo" on the CTA button), never the same string twice.

---

## 4. Section-by-Section Link Plan

The hub has these rendered sections (based on the file):

- Breadcrumb bar
- Hero (chooser + CTA row)
- Scenario finder (`#scenario-finder`)
- Plan stories / tour stops (`#plan-stories`): 8 stops
- Compare table (`#compare-table`)
- Best-for grid (`#best-for`)
- Waiting periods explainer (`#waiting`)
- Verify CTA band (`#verify-2`)
- FAQ (`#faq`)
- Related / carrier cards + editorial footer

### 4.1 Breadcrumb Bar

**Links (2 total, structural, no change needed):**

| Target | Anchor text | Note |
|--------|-------------|------|
| `https://www.covercapy.com/` | Home | Already present |
| `https://www.covercapy.com/dental-insurance/` | Dental Insurance | Already present |

No scenario content should appear in the breadcrumb. Do not add a second `/dental-insurance/` link anywhere above the hero.

### 4.2 Hero

The hero CTA row currently has two anchor-links to in-page `#` targets. Both must be upgraded to real destination URLs while keeping the in-page jumps for users who want the local experience. Strategy: keep `href="#scenario-finder"` on the primary CTA button AND add a second live link for the compare page as a secondary CTA.

**Links to add or update in hero:**

| Target | Anchor text | Position | Rationale |
|--------|-------------|----------|-----------|
| `/find-my-dentist` | Find a PPO dentist near you | New hero sub-line link below the CTA row (inline text, not a button) | Primary conversion bridge; hero placement is spec 17 mandatory |
| `/compare-ppo-dental-plans` | compare all 8 plans side by side | Secondary CTA button, replacing or alongside `Compare all eight` which currently anchors to `#compare-table` | Mid-funnel bridge; sends comparison intent to the right page |

**Hero chooser answer blocks (JS-rendered):** Each chooser answer block (Just me / Me + kids / Me + spouse / Whole family) should include a contextual inline link:
- "Just me": links to `/dental-insurance/ppo-plans/uhc-primary-dental/` with anchor `the $30-a-month preventive starter plan`
- "Me + kids": links to `/dental-insurance/ppo-plans/guardian-premier-ppo/` with anchor `the plan built for families with children heading toward braces`
- "Me + spouse": links to `/dental-insurance/ppo-plans/aetna-dental-direct/` with anchor `Aetna's CVS ExtraCare Plus plan` (doubles across two members)
- "Whole family": links to `/dental-insurance/ppo-plans/humana-extend-5000/` with anchor `Humana Extend 5000 for families`

These are scenario answer blocks; anchor text is scenario-keyed, not plan-name-only.

### 4.3 Scenario Finder (`#scenario-finder`)

The scenario finder renders answer blocks via JavaScript. Each answer block must contain two links: one to the matched plan page and one to `/find-my-dentist`. The compare page link appears below the answer as a "want to see all options?" contextual line.

**Answer block links per situation:**

| Situation chip | Primary plan link anchor | Secondary plan link anchor | Compare line anchor |
|---------------|--------------------------|---------------------------|---------------------|
| Cleanings + checkups | `UnitedHealthcare Primary Dental` | `the entry-level plan with CVS perks` (to Aetna) | `the side-by-side PPO plan comparison table` |
| Crown or root canal | `Ameritas's day-one major coverage` | `how Aetna Dental Direct handles the job-change waiver` | `the side-by-side PPO plan comparison table` |
| Implant ahead | `Mutual of Omaha Dental Preferred and implant coverage` | `Humana Extend 5000 -- $2,000/year implant benefit` | `detailed plan comparison` |
| Braces for my kid | `Guardian Premier and child orthodontics` | `the plan built for families with children heading toward braces` | `detailed plan comparison` |
| Adult braces or Invisalign | `the only featured plan that covers adult braces and Invisalign` (to Delta) | none (Delta is unique here) | `the side-by-side PPO plan comparison table` |
| Left a job with dental | `Aetna Dental Direct` | `Ameritas PrimeStar Care Complete` | `see how these plans stack up on a single table` |
| Turning 65 or retiring | `the top pick for seniors and anyone who cannot wait for major work` (to MOO) | `Ameritas PrimeStar -- age-neutral pricing, no waiting period` | `see how these plans stack up on a single table` |
| Lowest possible price | `the entry-level plan that activates in three days` (to UHC) | none needed | `the side-by-side PPO plan comparison table` |
| (family) Braces for a child | `Guardian Premier and child orthodontics` | `the plan built for families with children heading toward braces` | `detailed plan comparison` |
| (family) One implant, rest maintenance | `Mutual of Omaha's selectable annual maximum` | `Humana Extend 5000 for families` | `the side-by-side PPO plan comparison table` |
| (family) Two adults, big work year | `Mutual of Omaha Dental Preferred` | `MetLife's graduated major benefit schedule` | `the side-by-side PPO plan comparison table` |
| (family) Whole family, CVS shoppers | `Aetna's CVS ExtraCare Plus plan` | `Humana Extend 5000 for couples approaching mid-life` | `detailed plan comparison` |

**Find-my-dentist link in every answer block:**
Anchor text: `confirm your dentist accepts it before you buy`
Target: `/find-my-dentist`
Placement: below the plan recommendation, before the compare line.
This is the only `/find-my-dentist` link inside the scenario finder. Do not repeat it in tour stops.

### 4.4 Plan Stories / Tour Stops (`#plan-stories`)

Each tour stop currently has:
- An `<h3><a>` link using the plan name as anchor (correct for this position -- plan name alone is permitted once per plan page)
- A panel CTA: `Read the full {Plan} review` (good, keep)
- A panel CTA: `Verify my dentist` to `/find-my-dentist?plan={slug}` (keep, this is the tour stop's conversion link)

**What to add or change per tour stop:**

**Stop 01: UHC Primary Dental**
- `<h3>` link: already `UnitedHealthcare Primary Dental` (correct, keep)
- Add contextual inline in prose: `the $30-a-month preventive starter plan` anchor within the sentence about cost, linking back to the same plan page (`/dental-insurance/ppo-plans/uhc-primary-dental/`) -- wait, this would be a second link to the same page. Use it only if the tour stop body prose naturally references a second moment. Otherwise keep one plan-page link per stop (the `<h3>`).
- Panel review button: `Read the full UHC Primary Dental review` (keep, slightly adjusted from "UnitedHealthcare Primary Dental" for character economy -- verify against current file, the file shows "Read the full UnitedHealthcare Primary Dental review", keep as-is since it is already distinct from the h3)

**Stop 02: Aetna Dental Direct**
- `<h3>` link: `Aetna Dental Direct` (keep)
- The prose body already references CVS ExtraCare Plus -- do not add a second link to the Aetna plan page in the prose; the h3 and the panel button cover it
- No change needed for plan page links

**Stop 03: Ameritas PrimeStar** (to be added if not present in current file)
- `<h3>` link: `Ameritas PrimeStar Care Complete`
- Panel button: `Full Ameritas PrimeStar review`

**Stop 04: Guardian Premier PPO**
- `<h3>` link: `Guardian Premier 2.0`
- Panel button: `Full Guardian Premier PPO review`

**Stop 05: MetLife NCD Complete**
- `<h3>` link: `MetLife NCD Complete`
- Panel button: `Full MetLife NCD Complete review`

**Stop 06: Mutual of Omaha**
- `<h3>` link: `Mutual of Omaha Dental Preferred`
- Panel button: `Full Mutual of Omaha Dental review`

**Stop 07: Humana Extend 5000**
- `<h3>` link: `Humana Extend 5000`
- Panel button: `Full Humana Extend 5000 review`

**Stop 08: Delta Dental PPO Premium (feature stop)**
- `<h3>` link: `Delta Dental PPO Premium`
- Panel button: `Full Delta Dental PPO Premium review` (links to plan page)
- ADD: cross-silo bridge in the prose body. Suggested sentence: "Because Delta runs the largest PPO network in the country, it has its own dedicated hub for buyers who want to go deeper on Delta-specific options." Anchor on "dedicated hub" linking to `/dental-insurance/delta-dental/` with anchor text `Delta Dental's own hub`
- ADD: CTA button in the panel (below the review button): `explore the Delta Dental silo` linking to `/dental-insurance/delta-dental/`
- These are the ONLY two links from the hub to the Delta silo root. Do not link to any sub-pages of the Delta silo.

**Cross-linking rule inside tour stops:** Do NOT add peer-plan links inside tour stops. Tour stops link down to one plan page each (via h3 and panel button). Peer comparisons belong in the compare page and the plan pages' related modules. Adding "also consider X plan" inside a tour stop leaks users off the tour narrative and creates horizontal links that flatten the hub's authority.

**Dentist-finder links in tour stops:** Keep the existing `Verify my dentist` buttons. Do NOT add additional `/find-my-dentist` links inside the prose paragraphs of any tour stop. Spec 17 Section 4.2 explicitly limits dentist-finder links to hero, CTA band, scenario finder, and sticky bar.

### 4.5 Compare Table (`#compare-table`)

The table currently exists as a hub-level summary. Per spec 17 Section 8.4, the hub must NOT contain a full side-by-side comparison table (that belongs to the compare page). The hub's compare table section should be a condensed reference strip (3 to 4 rows, key metrics only) that ends with a live link to the compare page.

**Links in the compare table section:**

| Anchor text | Target | Position |
|-------------|--------|----------|
| `compare all 8 plans side by side` | `/compare-ppo-dental-plans` | Below the condensed table, as the "expand" CTA |
| `see how these plans stack up on a single table` | `/compare-ppo-dental-plans` | Contextual inline in the intro paragraph for this section |

Note: these two compare-page anchor texts must be distinct (they are, per spec rules). The table itself should link plan names to plan pages (plan name alone is acceptable as anchor text in table cell links, since this is a grid context).

### 4.6 Best-For Grid (`#best-for`)

The best-for grid currently uses `.bf-card` elements. Each card should link to the matched plan page with a scenario-keyed anchor (not just the plan name).

**Best-for card links:**

| Card topic | Target plan page | Anchor text |
|-----------|-----------------|-------------|
| Budget / starter | `/dental-insurance/ppo-plans/uhc-primary-dental/` | `UHC Primary Dental -- $30/mo preventive-first entry plan` |
| Just left a job | `/dental-insurance/ppo-plans/aetna-dental-direct/` | `Aetna Dental Direct -- waivable waits, CVS perks` |
| No waiting period | `/dental-insurance/ppo-plans/ameritas-primestar/` | `Ameritas PrimeStar -- zero waiting periods` |
| Kids and braces | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | `Guardian Premier -- 85 percent day-one fillings and child orthodontics` |
| Highest annual max | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | `MetLife NCD Complete -- $10,000 annual max` |
| Seniors / no-wait major | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | `the top pick for seniors and anyone who cannot wait for major work` |
| Family + implants | `/dental-insurance/ppo-plans/humana-extend-5000/` | `Humana Extend 5000 for families` |
| Largest network / adult ortho | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | `Delta Dental's individual PPO` |

These anchor texts are scenario-keyed and distinct from the tour-stop h3 anchors (plan name alone) and the carrier grid card headlines.

### 4.7 Waiting Periods Explainer (`#waiting`)

This section is the correct placement for the three educational / tool bridges.

**Links to add:**

| Target | Anchor text | Rationale |
|--------|-------------|-----------|
| `/guides/glossary/` | see the full dental insurance glossary | One glossary link permitted per hub; educational primer / waiting section is the correct placement per spec 17 Section 4.4 |
| `/dental-treatment-cost-estimator` | estimate what your procedure will cost out of pocket | Tool bridge per spec 17 Section 4.6; relevant when explaining what major work costs without coverage |
| `/benefit-maxing/smart-timing-protocol/` | timing your dental work to maximize your annual benefit | Soft bridge per spec 17 Section 4.5; relevant when explaining how to stage treatment around waiting periods |

Suggested placement: one link per paragraph. Glossary link at the end of the sentence explaining "annual maximum". Cost estimator link at the end of the sentence explaining out-of-pocket exposure. Benefit-maxing link in the sentence about staging treatment across calendar years.

Do NOT place any of these three links inside the tour stops or the FAQ. Educational bridges belong in the educational primer and waiting section only.

### 4.8 Verify CTA Band (`#verify-2`)

The verify band already exists and links to `/find-my-dentist`. Confirm the anchor text is:
- Form submit button: `Find my dentist` (acceptable, action-keyed)
- Alt-path link (`.vb-alt a`): `Verify your plan at a local dentist -- free`

No change needed if these are already present. If the alt-path link is currently anchored to a `#` or missing, update to `/find-my-dentist` with anchor text `Verify your plan at a local dentist -- free`.

### 4.9 FAQ (`#faq`)

The FAQ section must NOT contain contextual links to plan pages, the compare page, or guides. FAQ answers are schema-rendered as `FAQPage` JSON-LD; inline links in FAQ answer text pass no additional PageRank and create a messy citation environment in AI-rendered excerpts.

One exception: the FAQ answers already reference plan names in text. If a plan name is mentioned and a link is clearly useful to the reader (e.g., the FAQ answer about Guardian and braces), a single contextual link to the plan page is permitted. Use the scenario-keyed anchor pattern:
- `Guardian Premier -- 85 percent day-one fillings and child orthodontics`

Limit: maximum one plan-page link per FAQ answer, and only if the plan is the specific answer to the question being asked.

### 4.10 Related-Links Strip

The related-links strip is the pill row at the bottom of the page. This is where the following links live. No related-strip link should duplicate an anchor text already used elsewhere on the page.

**Related strip targets and anchor texts:**

| Target | Anchor text (pill label) | Type |
|--------|--------------------------|------|
| `/compare-ppo-dental-plans` | Compare PPO Dental Plans | Mid-funnel pill |
| `/find-my-dentist` | Find PPO Dentists | Conversion pill |
| `/dental-insurance/` | Dental Insurance Hub | Upward parent pill (second and final upward link) |
| `/guides/no-waiting-period/` | dental insurance with no waiting period | Guide bridge -- Cluster 7 |
| `/guides/braces-invisalign/` | dental insurance for braces and Invisalign | Guide bridge -- Clusters 3 and 4 |
| `/guides/implants/` | dental insurance that covers implants | Guide bridge -- Cluster 8 |
| `/guides/between-jobs/` | dental coverage between jobs | Guide bridge -- Cluster 11 |

Total: 7 related pills. This is within the 4-guide-link maximum (4 guide pills) plus 3 non-guide links. Do not add a fifth guide link.

**Do not add to the related strip:**
- `/dental-insurance/delta-dental/` (already covered in the Delta tour stop; a third delta link from the related strip would over-index Delta relative to other carriers)
- Individual plan pages (those are internal navigational links, not related-content signals; they belong in the tour, the grid, and the best-for section)

---

## 5. Entity Coverage Plan (GEO and AI Citation Targets)

GEO-optimized answer blocks need entity tagging to be citation-worthy in AI-generated responses. The hub currently has strong FAQ schema. The following entity-level gaps should be addressed in the scenario answer blocks and the waiting periods section.

### 5.1 Entity mentions the hub should contain

| Entity | Where to surface | Why |
|--------|-----------------|-----|
| PPO (preferred provider organization) | Definition in "how dental insurance works" primer or FAQ | Primary entity for the page's topic cluster |
| Annual maximum (annual benefit limit) | Waiting periods section and scenario answers | Key decision variable; GEO queries ask "which plan has the highest annual maximum" |
| Waiting period (elimination period) | Dedicated section; already present | |
| Prior-coverage waiver | Aetna tour stop prose; scenario answer for "Left a job" | Unique entity; low competition; cite Aetna as the carrier that offers it on this shelf |
| Community-rated pricing | MOO tour stop and senior scenario answer | Relevant to seniors; GEO queries ask "does dental insurance price go up with age" |
| DenteMax Plus (network name) | MOO tour stop | Specific network entity; increases citation specificity |
| DentalGuard Preferred (network name) | Guardian tour stop | Same rationale |
| CVS ExtraCare Plus | Aetna tour stop and scenario answer for CVS shoppers | Brand entity; exact name required for AI citation of this specific perk |
| Delta Dental PPO network | Delta tour stop | Largest network entity; frequently cited in AI answers |
| Implant lifetime maximum | MOO and Ameritas tour stops | GEO target: "which PPO plan covers implants with the highest lifetime maximum" |
| No waiting period (on all categories) | Ameritas and MOO tour stops | GEO target: "dental plan with no waiting period on major work" |

### 5.2 Entity link pairing

When an entity is named in a scenario answer block, link it to the plan page that best exemplifies it. This pairs the entity name with a destination URL, which increases GEO citation confidence:

- "prior-coverage waiver" in scenario answer for "Left a job" -- link to `/dental-insurance/ppo-plans/aetna-dental-direct/` with anchor `how Aetna Dental Direct handles the job-change waiver`
- "no waiting period on any category" in scenario answer for "Crown or root canal" -- link to `/dental-insurance/ppo-plans/ameritas-primestar/` with anchor `Ameritas's day-one major coverage`
- "community-rated pricing" in senior scenario answer -- link to `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` with anchor `the top pick for seniors and anyone who cannot wait for major work`

---

## 6. Ready-to-Implement Link Table

All hub links in a single implementation reference. This table covers only the hub page (`/dental-insurance/ppo-plans/`). Rows for plan pages and the compare page are in spec 17 master table (rows 52-111) and are not repeated here.

Column definitions:
- **#**: Reference number for this spec (not the same as spec 17 row numbers)
- **Section**: Named section of the hub file where the link lives
- **Target URL**: Full path (no domain needed for internal links)
- **Anchor text**: Exact string to use in the `<a>` element
- **Status**: NEW (does not exist), KEEP (already correct), UPDATE (exists but needs anchor text or href fix), ADD (add to existing element)

| # | Section | Target URL | Anchor text | Status |
|---|---------|-----------|-------------|--------|
| H1 | Breadcrumb | `/` | Home | KEEP |
| H2 | Breadcrumb | `/dental-insurance/` | Dental Insurance | KEEP |
| H3 | Hero sub-line | `/find-my-dentist` | Find a PPO dentist near you | NEW |
| H4 | Hero CTA row (secondary button) | `/compare-ppo-dental-plans` | compare all 8 plans side by side | UPDATE (currently `#compare-table`) |
| H5 | Hero chooser answer: Just me | `/dental-insurance/ppo-plans/uhc-primary-dental/` | the $30-a-month preventive starter plan | NEW (in JS block) |
| H6 | Hero chooser answer: Me + kids | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | the plan built for families with children heading toward braces | NEW (in JS block) |
| H7 | Hero chooser answer: Me + spouse | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna's CVS ExtraCare Plus plan | NEW (in JS block) |
| H8 | Hero chooser answer: Whole family | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 for families | NEW (in JS block) |
| S1 | Scenario answer: Cleanings + checkups (primary) | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UnitedHealthcare Primary Dental | NEW (in JS block) |
| S2 | Scenario answer: Cleanings + checkups (secondary) | `/dental-insurance/ppo-plans/aetna-dental-direct/` | the entry-level plan with CVS perks | NEW (in JS block) |
| S3 | Scenario answer: Cleanings + checkups (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW (in JS block) |
| S4 | Scenario answer: Crown or root canal (primary) | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas's day-one major coverage | NEW (in JS block) |
| S5 | Scenario answer: Crown or root canal (secondary) | `/dental-insurance/ppo-plans/aetna-dental-direct/` | how Aetna Dental Direct handles the job-change waiver | NEW (in JS block) |
| S6 | Scenario answer: Crown or root canal (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW (in JS block) |
| S7 | Scenario answer: Implant ahead (primary) | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental Preferred and implant coverage | NEW (in JS block) |
| S8 | Scenario answer: Implant ahead (secondary) | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 -- $2,000/year implant benefit | NEW (in JS block) |
| S9 | Scenario answer: Implant ahead (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW (in JS block) |
| S10 | Scenario answer: Braces for my kid (primary) | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier and child orthodontics | NEW (in JS block) |
| S11 | Scenario answer: Braces for my kid (secondary) | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | the plan built for families with children heading toward braces | NOTE: same page as S10; use only if prose naturally supports two distinct moments referencing Guardian; otherwise keep one link |
| S12 | Scenario answer: Braces for my kid (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW |
| S13 | Scenario answer: Adult braces / Invisalign (primary) | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | the only featured plan that covers adult braces and Invisalign | NEW (in JS block) |
| S14 | Scenario answer: Adult braces / Invisalign (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW |
| S15 | Scenario answer: Left a job with dental (primary) | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct | NEW (plan name alone acceptable in scenario card headline context) |
| S16 | Scenario answer: Left a job with dental (secondary) | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar Care Complete | NEW |
| S17 | Scenario answer: Left a job with dental (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW |
| S18 | Scenario answer: Turning 65 or retiring (primary) | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | the top pick for seniors and anyone who cannot wait for major work | NEW |
| S19 | Scenario answer: Turning 65 or retiring (secondary) | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- age-neutral pricing, no waiting period | NEW |
| S20 | Scenario answer: Turning 65 or retiring (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW |
| S21 | Scenario answer: Lowest price (primary) | `/dental-insurance/ppo-plans/uhc-primary-dental/` | the entry-level plan that activates in three days | NEW |
| S22 | Scenario answer: Lowest price (dentist verify) | `/find-my-dentist` | confirm your dentist accepts it before you buy | NEW |
| S23 | Scenario answer: compare fallback (all situations) | `/compare-ppo-dental-plans` | the side-by-side PPO plan comparison table | NEW (one compare link per answer block) |
| T1 | Tour stop: UHC (h3) | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UnitedHealthcare Primary Dental | KEEP |
| T2 | Tour stop: UHC panel | `/dental-insurance/ppo-plans/uhc-primary-dental/` | Read the full UnitedHealthcare Primary Dental review | KEEP |
| T3 | Tour stop: UHC panel (verify) | `/find-my-dentist?plan=uhc-primary-dental` | Verify my dentist | KEEP |
| T4 | Tour stop: Aetna (h3) | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct | KEEP |
| T5 | Tour stop: Aetna panel | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Read the full Aetna Dental Direct review | KEEP |
| T6 | Tour stop: Aetna panel (verify) | `/find-my-dentist?plan=aetna-dental-direct` | Verify my dentist | KEEP |
| T7 | Tour stop: Ameritas (h3) | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar Care Complete | KEEP or ADD if missing |
| T8 | Tour stop: Ameritas panel | `/dental-insurance/ppo-plans/ameritas-primestar/` | Full Ameritas PrimeStar review | KEEP or ADD |
| T9 | Tour stop: Ameritas panel (verify) | `/find-my-dentist?plan=ameritas-primestar` | Verify my dentist | KEEP or ADD |
| T10 | Tour stop: Guardian (h3) | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier 2.0 | KEEP or ADD |
| T11 | Tour stop: Guardian panel | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Full Guardian Premier PPO review | KEEP or ADD |
| T12 | Tour stop: Guardian panel (verify) | `/find-my-dentist?plan=guardian-premier-ppo` | Verify my dentist | KEEP or ADD |
| T13 | Tour stop: MetLife (h3) | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete | KEEP or ADD |
| T14 | Tour stop: MetLife panel | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | Full MetLife NCD Complete review | KEEP or ADD |
| T15 | Tour stop: MetLife panel (verify) | `/find-my-dentist?plan=metlife-ncd-complete` | Verify my dentist | KEEP or ADD |
| T16 | Tour stop: MOO (h3) | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Mutual of Omaha Dental Preferred | KEEP or ADD |
| T17 | Tour stop: MOO panel | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | Full Mutual of Omaha Dental review | KEEP or ADD |
| T18 | Tour stop: MOO panel (verify) | `/find-my-dentist?plan=mutual-of-omaha-dental` | Verify my dentist | KEEP or ADD |
| T19 | Tour stop: Humana (h3) | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 | KEEP or ADD |
| T20 | Tour stop: Humana panel | `/dental-insurance/ppo-plans/humana-extend-5000/` | Full Humana Extend 5000 review | KEEP or ADD |
| T21 | Tour stop: Humana panel (verify) | `/find-my-dentist?plan=humana-extend-5000` | Verify my dentist | KEEP or ADD |
| T22 | Tour stop: Delta (h3) | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental PPO Premium | KEEP or ADD |
| T23 | Tour stop: Delta panel (plan review) | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Full Delta Dental PPO Premium review | KEEP or ADD |
| T24 | Tour stop: Delta panel (verify) | `/find-my-dentist?plan=delta-dental-ppo-premium` | Verify my dentist | KEEP or ADD |
| T25 | Tour stop: Delta prose (cross-silo) | `/dental-insurance/delta-dental/` | Delta Dental's own hub | NEW -- add to Delta tour stop body prose |
| T26 | Tour stop: Delta panel CTA (cross-silo) | `/dental-insurance/delta-dental/` | explore the Delta Dental silo | NEW -- add as third button in Delta panel, below verify |
| C1 | Compare table section intro | `/compare-ppo-dental-plans` | see how these plans stack up on a single table | NEW |
| C2 | Compare table section CTA | `/compare-ppo-dental-plans` | compare all 8 plans side by side | NEW (distinct anchor from C1) |
| B1 | Best-for grid card: budget | `/dental-insurance/ppo-plans/uhc-primary-dental/` | UHC Primary Dental -- $30/mo preventive-first entry plan | NEW or UPDATE |
| B2 | Best-for grid card: job loss | `/dental-insurance/ppo-plans/aetna-dental-direct/` | Aetna Dental Direct -- waivable waits, CVS perks | NEW or UPDATE |
| B3 | Best-for grid card: no wait | `/dental-insurance/ppo-plans/ameritas-primestar/` | Ameritas PrimeStar -- zero waiting periods | NEW or UPDATE |
| B4 | Best-for grid card: kids braces | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | Guardian Premier -- 85 percent day-one fillings and child orthodontics | NEW or UPDATE |
| B5 | Best-for grid card: high max | `/dental-insurance/ppo-plans/metlife-ncd-complete/` | MetLife NCD Complete -- $10,000 annual max | NEW or UPDATE |
| B6 | Best-for grid card: seniors | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | the top pick for seniors and anyone who cannot wait for major work | NEW or UPDATE |
| B7 | Best-for grid card: family + implants | `/dental-insurance/ppo-plans/humana-extend-5000/` | Humana Extend 5000 for families | NEW or UPDATE |
| B8 | Best-for grid card: network / adult ortho | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | Delta Dental's individual PPO | NEW or UPDATE |
| W1 | Waiting periods section | `/guides/glossary/` | see the full dental insurance glossary | NEW |
| W2 | Waiting periods section | `/dental-treatment-cost-estimator` | estimate what your procedure will cost out of pocket | NEW |
| W3 | Waiting periods section | `/benefit-maxing/smart-timing-protocol/` | timing your dental work to maximize your annual benefit | NEW |
| V1 | Verify CTA band (form submit) | `/find-my-dentist` | Find my dentist | KEEP |
| V2 | Verify CTA band (alt-path) | `/find-my-dentist` | Verify your plan at a local dentist -- free | KEEP or ADD |
| R1 | Related strip | `/compare-ppo-dental-plans` | Compare PPO Dental Plans | NEW |
| R2 | Related strip | `/find-my-dentist` | Find PPO Dentists | NEW |
| R3 | Related strip | `/dental-insurance/` | Dental Insurance Hub | NEW (second and final upward link to parent) |
| R4 | Related strip | `/guides/no-waiting-period/` | dental insurance with no waiting period | NEW |
| R5 | Related strip | `/guides/braces-invisalign/` | dental insurance for braces and Invisalign | NEW |
| R6 | Related strip | `/guides/implants/` | dental insurance that covers implants | NEW |
| R7 | Related strip | `/guides/between-jobs/` | dental coverage between jobs | NEW |

**Total distinct target URLs from hub:**
- 8 plan pages (covered via T-rows and S-rows and B-rows with distinct anchor texts each time)
- `/compare-ppo-dental-plans` (H4, S23, C1, C2, R1 -- 5 occurrences, all distinct anchors)
- `/find-my-dentist` (H3, scenario answers via S3/S6/S9/S12/S14/S17/S20/S22, verify panel via T3/T6/T9/T12/T15/T18/T21/T24, V1, V2, R2 -- varied anchors throughout)
- `/dental-insurance/` (H2 breadcrumb, R3 related strip -- 2 occurrences max, both structural)
- `/dental-insurance/delta-dental/` (T25 prose, T26 panel button -- 2 occurrences, distinct anchors)
- `/guides/glossary/` (W1 -- 1 occurrence)
- `/dental-treatment-cost-estimator` (W2 -- 1 occurrence)
- `/benefit-maxing/smart-timing-protocol/` (W3 -- 1 occurrence)
- 4 guide pages (R4-R7 -- 1 occurrence each)

---

## 7. Forbidden Link Patterns on This Hub

The following are explicitly forbidden and must not appear in the rebuilt hub:

| Forbidden | Why |
|-----------|-----|
| Link to any `/dental-insurance/delta-dental/` sub-page | Those belong to the DI Hub cluster; sending from PPO hub dilutes topical focus |
| Link to `/dental-insurance/` from inside tour stops, scenario answers, or FAQ answers | Upward links inside content sections interrupt the user journey; upward links permitted only in breadcrumb (H2) and related strip (R3) |
| Link to `/compare-ppo-dental-plans` with anchor text "best PPO dental plans" or "best dental insurance 2026" | Sends the hub's own head-term anchor to a different page; cannibalizes the hub |
| Full side-by-side comparison table embedded in the hub | Cannibalizes the compare page; table content belongs there |
| Peer plan links inside tour stops (plan A mentions plan B in body with a link) | Flattens the hub's authority by creating horizontal leaf-to-leaf connections inside the hub narrative |
| More than 4 guide links from the hub | Dilutes topical cluster; the approved 4 are in R4-R7 |
| Any link to treatment-level guides not in the approved list | `/guides/root-canals/`, `/guides/crowns/cost`, `/guides/dentures/`, `/guides/whitening/` belong under DI Hub's treatment section |
| Link to `/benefit-maxing/` from any plan page | Off-funnel; only the hub links to benefit-maxing (via W3) |
| Duplicate anchor text for the same destination URL on the same page | Over-optimization signal |

---

## 8. Cross-Check Against Spec 17 Master Table

All rows from spec 17 that originate from the PPO hub (rows 1 to 51) are satisfied by this spec. Correspondence:

- Spec 17 rows 1: Covered by H2 (breadcrumb)
- Spec 17 row 2: Covered by H3 (hero sub-line to `/find-my-dentist`)
- Spec 17 row 3: Covered by H4 (hero CTA to compare page)
- Spec 17 rows 4-21 (scenario cards): Covered by S1-S22 with matching anchor texts
- Spec 17 rows 22-28 (tour stop CTAs): Covered by T2, T5, T8, T11, T14, T17, T20 (panel review buttons)
- Spec 17 rows 29-31 (Delta feature stop): Covered by T22, T25, T26
- Spec 17 row 32 (below-tour compare link): Covered by C2
- Spec 17 rows 33-40 (carrier grid): Covered by B1-B8 (best-for grid or separate carrier grid if present)
- Spec 17 row 41 (glossary): Covered by W1
- Spec 17 row 42 (cost estimator): Covered by W2
- Spec 17 row 43 (benefit-maxing): Covered by W3
- Spec 17 row 44 (verify band): Covered by V2
- Spec 17 rows 45-51 (related links): Covered by R1-R7

---

*End of spec 11. Integration agent should reference this table alongside spec 09 (schema) and spec 08 (GEO answer blocks) when placing anchor text inside answer block prose, since GEO block entity names and link anchor texts must align.*
