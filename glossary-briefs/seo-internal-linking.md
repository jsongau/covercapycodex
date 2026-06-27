# CoverCapy Glossary — Internal Linking Strategy
## File: glossary-briefs/seo-internal-linking.md | Updated June 2026

This document is the canonical reference for all internal linking decisions involving `/dental-insurance-glossary/`. It covers outbound links from the glossary, inbound links to the glossary from other pages, cross-links between terms, priority insertion list, anchor text recommendations, and the hub-and-spoke map.

---

## SITE PAGE INVENTORY

For reference, the full set of linkable pages:

| ID | URL | Page Type |
|----|-----|-----------|
| HOME | `/` | Homepage |
| COMPARE | `/compare-ppo-dental-plans/` | Plan comparison tool |
| FIND | `/find-my-dentist` | Dentist search app |
| NWP | `/dental-insurance-no-waiting-period/` | Situation landing page |
| BTJ | `/dental-insurance-between-jobs/` | Situation landing page |
| SE | `/dental-insurance-for-self-employed/` | Situation landing page |
| IMM | `/dental-insurance-immediate-coverage/` | Situation landing page |
| GLOSS | `/dental-insurance-glossary/` | Glossary pillar (this page) |
| T3 | `/dental/{state}/` | State hub (e.g. `/dental/california/`) |
| T4 | `/dental/{state}/{market}/` | Metro hub |
| T5 | `/dental/{state}/{market}/{city}/{slug}/` | Dentist profile |

### Glossary term URLs

All 23 terms live at `/dental-insurance-glossary/{term}/` (or as anchor fragments `#term` if single-page). This document assumes **individual term sub-pages** for maximum SEO value — each term at its own URL.

| Term Slug | Display Name |
|-----------|--------------|
| `ppo` | PPO (Preferred Provider Organization) |
| `waiting-period` | Waiting Period |
| `annual-maximum` | Annual Maximum |
| `deductible` | Deductible |
| `coinsurance` | Coinsurance |
| `in-network` | In-Network |
| `out-of-pocket` | Out-of-Pocket Maximum |
| `balance-billing` | Balance Billing |
| `missing-tooth` | Missing Tooth Clause |
| `calendar-year` | Calendar Year |
| `plan-year` | Plan Year |
| `effective-date` | Effective Date |
| `day-one` | Day-One Coverage |
| `allowed-amount` | Allowed Amount |
| `ada-fee` | ADA Fee Schedule |
| `cdt` | CDT Code |
| `coverage-preventive` | Preventive Coverage |
| `coverage-basic` | Basic Coverage |
| `coverage-major` | Major Coverage |
| `implants` | Dental Implants Coverage |
| `whitening` | Cosmetic / Whitening Coverage |
| `vision` | Vision Add-On Coverage |
| `rating` | Plan Rating / Star Rating |

---

## 1. LINKS FROM GLOSSARY TO OTHER PAGES

Each term page should link out to the most commercially relevant destination. Rules: max 2 outbound links per term page (1 primary CTA, 1 contextual inline). Never link two terms to the same URL from the same term page.

### Primary CTA links (bottom of each term page)

| Term | Primary CTA Destination | CTA Anchor Text |
|------|------------------------|-----------------|
| `ppo` | COMPARE | "Compare PPO dental plans" |
| `waiting-period` | NWP | "Find PPO plans with no waiting period" |
| `annual-maximum` | COMPARE | "Compare annual maximums across PPO plans" |
| `deductible` | COMPARE | "See which PPO plans have the lowest deductible" |
| `coinsurance` | COMPARE | "Compare coinsurance rates on top PPO plans" |
| `in-network` | FIND | "Find in-network PPO dentists near you" |
| `out-of-pocket` | COMPARE | "Compare out-of-pocket caps on PPO plans" |
| `balance-billing` | FIND | "Find PPO dentists who accept your plan" |
| `missing-tooth` | COMPARE | "Compare plans that cover pre-existing tooth loss" |
| `calendar-year` | COMPARE | "Compare calendar-year vs plan-year PPO options" |
| `plan-year` | COMPARE | "Compare calendar-year vs plan-year PPO options" |
| `effective-date` | IMM | "Get dental coverage with same-day effective dates" |
| `day-one` | IMM | "Compare plans with day-one coverage" |
| `allowed-amount` | COMPARE | "See allowed amounts across PPO fee schedules" |
| `ada-fee` | FIND | "Find a dentist who accepts ADA fee schedule rates" |
| `cdt` | FIND | "Verify your procedure codes with a PPO dentist" |
| `coverage-preventive` | COMPARE | "Compare plans with 100% preventive coverage" |
| `coverage-basic` | COMPARE | "Compare basic coverage tiers across PPO plans" |
| `coverage-major` | COMPARE | "Compare major coverage waiting periods and limits" |
| `implants` | COMPARE | "Compare PPO plans that cover dental implants" |
| `whitening` | COMPARE | "Compare cosmetic and whitening coverage" |
| `vision` | COMPARE | "Compare dental and vision bundle plans" |
| `rating` | COMPARE | "See top-rated PPO dental plans" |

### Secondary contextual inline links (within body prose of each term page)

| Term | Inline Link Destination | Anchor Text | Placement context |
|------|------------------------|-------------|-------------------|
| `ppo` | FIND | "find an in-network PPO dentist" | when explaining network access |
| `waiting-period` | BTJ | "dental coverage between jobs" | when mentioning gap coverage scenarios |
| `annual-maximum` | `coverage-major` term | "major dental work" | when explaining what hits the maximum |
| `deductible` | `coverage-preventive` term | "preventive care is usually deductible-free" | explaining deductible exceptions |
| `coinsurance` | `annual-maximum` term | "annual maximum" | when explaining cost-share math |
| `in-network` | `balance-billing` term | "balance billing" | when explaining out-of-network risk |
| `out-of-pocket` | `annual-maximum` term | "annual maximum" | distinguishing the two caps |
| `balance-billing` | `in-network` term | "staying in-network" | explaining how to avoid it |
| `missing-tooth` | `waiting-period` term | "waiting period" | explaining clause as a waiting-period variant |
| `calendar-year` | `plan-year` term | "plan year" | explaining the distinction |
| `plan-year` | `calendar-year` term | "calendar year" | explaining the distinction |
| `effective-date` | `waiting-period` term | "waiting period" | when effective date triggers a wait |
| `day-one` | NWP | "no-waiting-period dental plans" | as concrete product reference |
| `allowed-amount` | `ada-fee` term | "ADA fee schedule" | explaining how allowed amounts are set |
| `ada-fee` | `cdt` term | "CDT procedure codes" | explaining fee schedule is keyed to CDT codes |
| `cdt` | `ada-fee` term | "ADA fee schedule" | explaining CDT codes map to fee schedule |
| `coverage-preventive` | FIND | "find a PPO dentist near you" | encouraging action after explaining 100% coverage |
| `coverage-basic` | `coinsurance` term | "coinsurance" | when explaining 80/20 on basic work |
| `coverage-major` | `implants` term | "dental implant coverage" | when listing major procedure examples |
| `implants` | `missing-tooth` term | "missing tooth clause" | explaining pre-existing exclusion risk |
| `whitening` | `coverage-preventive` term | "preventive coverage" | distinguishing cosmetic from covered care |
| `vision` | COMPARE | "dental and vision bundle plans" | directing to comparison tool |
| `rating` | FIND | "find highly rated dentists near you" | connecting plan rating to provider quality |

---

## 2. LINKS TO GLOSSARY FROM OTHER PAGES

These are insertions into existing pages — add a contextual link to the relevant glossary term wherever the concept appears naturally in prose.

### Homepage (`/`)

| Insertion point | Anchor text | Term URL |
|----------------|-------------|----------|
| Any mention of PPO | "what is a PPO?" | `/dental-insurance-glossary/ppo/` |
| Any mention of waiting periods | "no waiting period" | `/dental-insurance-glossary/waiting-period/` |
| Any mention of in-network | "in-network dentists" | `/dental-insurance-glossary/in-network/` |

### Compare Plans page (`/compare-ppo-dental-plans/`)

This page has the highest density of glossary-linkable concepts. Add links inline wherever these terms first appear:

| Concept / term used on page | Anchor text | Term URL |
|-----------------------------|-------------|----------|
| Annual maximum (in plan table) | "annual maximum" | `/dental-insurance-glossary/annual-maximum/` |
| Deductible (in plan table) | "deductible" | `/dental-insurance-glossary/deductible/` |
| Waiting period (in plan table) | "waiting period" | `/dental-insurance-glossary/waiting-period/` |
| Coinsurance / cost share | "coinsurance" | `/dental-insurance-glossary/coinsurance/` |
| Preventive coverage (100%) | "preventive coverage" | `/dental-insurance-glossary/coverage-preventive/` |
| In-network / out-of-network | "in-network" | `/dental-insurance-glossary/in-network/` |
| Calendar year reset | "calendar year" | `/dental-insurance-glossary/calendar-year/` |
| Plan rating / stars | "plan rating" | `/dental-insurance-glossary/rating/` |

### No Waiting Period page (`/dental-insurance-no-waiting-period/`)

| Concept | Anchor text | Term URL |
|---------|-------------|----------|
| Waiting period definition | "what is a waiting period?" | `/dental-insurance-glossary/waiting-period/` |
| Effective date | "effective date" | `/dental-insurance-glossary/effective-date/` |
| Day-one coverage | "day-one coverage" | `/dental-insurance-glossary/day-one/` |
| Missing tooth clause | "missing tooth clause" | `/dental-insurance-glossary/missing-tooth/` |

### Between Jobs page (`/dental-insurance-between-jobs/`)

| Concept | Anchor text | Term URL |
|---------|-------------|----------|
| Waiting period | "waiting period" | `/dental-insurance-glossary/waiting-period/` |
| Effective date | "effective date" | `/dental-insurance-glossary/effective-date/` |
| Calendar year | "calendar year" | `/dental-insurance-glossary/calendar-year/` |
| Deductible (restart risk) | "deductible" | `/dental-insurance-glossary/deductible/` |
| Annual maximum (carryover) | "annual maximum" | `/dental-insurance-glossary/annual-maximum/` |

### Self-Employed page (`/dental-insurance-for-self-employed/`)

| Concept | Anchor text | Term URL |
|---------|-------------|----------|
| PPO definition | "PPO dental plan" | `/dental-insurance-glossary/ppo/` |
| Plan year vs calendar year | "plan year" | `/dental-insurance-glossary/plan-year/` |
| Deductible (tax context) | "deductible" | `/dental-insurance-glossary/deductible/` |
| Annual maximum | "annual maximum" | `/dental-insurance-glossary/annual-maximum/` |
| Out-of-pocket cap | "out-of-pocket maximum" | `/dental-insurance-glossary/out-of-pocket/` |

### Immediate Coverage page (`/dental-insurance-immediate-coverage/`)

| Concept | Anchor text | Term URL |
|---------|-------------|----------|
| Effective date | "effective date" | `/dental-insurance-glossary/effective-date/` |
| Day-one coverage | "day-one coverage" | `/dental-insurance-glossary/day-one/` |
| Waiting period | "waiting period" | `/dental-insurance-glossary/waiting-period/` |
| Missing tooth clause | "missing tooth clause" | `/dental-insurance-glossary/missing-tooth/` |
| Coverage tiers | "major coverage" | `/dental-insurance-glossary/coverage-major/` |

### T5 Dentist Profile pages (`/dental/{state}/{market}/{city}/{slug}/`)

T5 pages are generated from `seo-build/generate-plans.js`. Add glossary links in the "About" prose section and FAQ section:

| Section | Concept | Anchor text | Term URL |
|---------|---------|-------------|----------|
| About prose | In-network mention | "in-network PPO dentist" | `/dental-insurance-glossary/in-network/` |
| About prose | Insurance accepted | "PPO dental insurance" | `/dental-insurance-glossary/ppo/` |
| FAQ: carrier acceptance | Balance billing | "balance billing" | `/dental-insurance-glossary/balance-billing/` |
| Insurance networks section | Coinsurance | "coinsurance" | `/dental-insurance-glossary/coinsurance/` |

**Implementation note:** Add these as inline links in `buildDentistPage()` in `seo-build/generate-plans.js`. Link each glossary term only once per page. The generator should not repeat the same glossary URL twice on a single T5 page.

### T4 Metro Hub pages (`/dental/{state}/{market}/`)

| Section | Anchor text | Term URL |
|---------|-------------|----------|
| Intro paragraph mentioning PPO | "PPO dental coverage" | `/dental-insurance-glossary/ppo/` |
| Dentist count / network mention | "in-network dentists" | `/dental-insurance-glossary/in-network/` |

### T3 State Hub pages (`/dental/{state}/`)

| Section | Anchor text | Term URL |
|---------|-------------|----------|
| Intro mentioning PPO plans | "PPO dental plans" | `/dental-insurance-glossary/ppo/` |
| Any mention of coverage types | "dental coverage types" | `/dental-insurance-glossary/coverage-preventive/` |

---

## 3. CROSS-LINKS BETWEEN GLOSSARY TERMS

Rules:
- Maximum 3 outgoing cross-links per term (not counting the primary CTA)
- No circular pairs — if A links to B, B should NOT link back to A (only link back if the relationship is genuinely bidirectional AND different context)
- Prefer downhill links: foundational terms link to more specific; specific terms link up to foundational

| From Term | Links To | Rationale |
|-----------|----------|-----------|
| `ppo` | `in-network`, `deductible`, `annual-maximum` | PPO is the parent concept; these are its core mechanics |
| `waiting-period` | `effective-date`, `missing-tooth`, `day-one` | All three are specific manifestations of the waiting-period concept |
| `annual-maximum` | `coverage-major`, `deductible`, `calendar-year` | Max is hit by major work; resets on calendar year; sits above deductible |
| `deductible` | `coinsurance`, `coverage-basic`, `allowed-amount` | Deductible is followed by coinsurance; applies to basic; based on allowed amount |
| `coinsurance` | `coverage-basic`, `coverage-major`, `out-of-pocket` | Coinsurance applies to basic/major tiers; accumulates toward OOP max |
| `in-network` | `balance-billing`, `allowed-amount`, `ada-fee` | In-network eliminates balance billing; uses allowed amount from ADA fee schedule |
| `out-of-pocket` | `annual-maximum`, `coinsurance`, `coverage-major` | OOP is fed by coinsurance on major/basic; related to but distinct from annual max |
| `balance-billing` | `in-network`, `allowed-amount` | Balance billing = gap between billed and allowed amount; prevented by staying in-network |
| `missing-tooth` | `implants`, `waiting-period` | Missing tooth clause directly limits implant coverage; is a waiting-period variant |
| `calendar-year` | `plan-year`, `annual-maximum` | Direct comparison pair; both govern the annual-maximum reset |
| `plan-year` | `calendar-year`, `effective-date` | Pair with calendar year; starts on effective date |
| `effective-date` | `waiting-period`, `day-one` | Effective date triggers waiting period; day-one means no gap |
| `day-one` | `effective-date`, `coverage-preventive` | Day-one coverage typically means preventive; effective date is immediate |
| `allowed-amount` | `ada-fee`, `balance-billing` | Allowed amount is derived from ADA fee schedule; excess becomes balance billing |
| `ada-fee` | `cdt`, `allowed-amount` | ADA fee schedule is organized by CDT codes; determines allowed amount |
| `cdt` | `ada-fee`, `coverage-preventive` | CDT codes classify procedures; preventive codes are the most universally covered |
| `coverage-preventive` | `coverage-basic`, `deductible` | Preventive is tier 1; basic is tier 2; preventive usually has no deductible |
| `coverage-basic` | `coverage-major`, `coinsurance` | Basic is tier 2; major is tier 3; coinsurance applies to both |
| `coverage-major` | `implants`, `annual-maximum` | Major coverage includes implants; major work hits annual max fastest |
| `implants` | `missing-tooth`, `coverage-major` | Implants often blocked by missing tooth clause; fall under major coverage |
| `whitening` | `coverage-preventive`, `cdt` | Whitening is excluded where preventive is covered; classified by CDT codes |
| `vision` | `ppo`, `annual-maximum` | Vision add-on is a PPO bundle option; has its own annual maximum |
| `rating` | `ppo`, `in-network` | Ratings apply to PPO plans and their in-network provider quality |

---

## 4. PRIORITY LINK INSERTIONS — TOP 10 PAGES

Ranked by: traffic potential x number of linkable concepts x conversion value.

| Rank | Page | # Insertions | Primary Reason |
|------|------|-------------|----------------|
| 1 | `/compare-ppo-dental-plans/` | 8 | Highest commercial intent; users actively comparing — every table header is a glossary term |
| 2 | `/dental-insurance-no-waiting-period/` | 4 | Direct topical overlap with `waiting-period`, `day-one`, `effective-date`, `missing-tooth` |
| 3 | `/dental-insurance-immediate-coverage/` | 5 | Immediate coverage searchers need definitional clarity on `effective-date`, `day-one`, `major` |
| 4 | `/dental-insurance-between-jobs/` | 5 | Gap coverage context makes `calendar-year`, `deductible`, `annual-maximum` highly relevant |
| 5 | `/dental-insurance-for-self-employed/` | 4 | Self-employed audience is sophisticated; `plan-year`, `deductible`, `out-of-pocket` add value |
| 6 | T5 dentist profiles (all) | 3-4 per page | 6,400+ pages — even 2 glossary links per page = massive glossary backlink volume |
| 7 | T4 metro hub pages | 2 per page | Hundreds of metro hubs; `ppo` + `in-network` links reinforce topical authority |
| 8 | T3 state hub pages | 2 per page | State hubs rank for broad terms; glossary links extend topical cluster depth |
| 9 | `/` (Homepage) | 3 | Homepage PageRank flows to glossary; PPO, waiting period, in-network are above the fold concepts |
| 10 | `/find-my-dentist` | 2 | Search interface should educate — `in-network` and `ppo` links add trust signals |

---

## 5. ANCHOR TEXT RECOMMENDATIONS

### Governing rules
- Use natural phrase anchors, not isolated keywords ("what is a PPO?" beats "PPO")
- Vary anchor text across pages to avoid over-optimization — don't use the same anchor text more than 3 times site-wide for any single glossary URL
- Avoid generic anchors: "click here", "learn more", "read this"
- Never stuff multiple glossary links into a single sentence
- On T5 pages generated by the build script, use a single reusable helper function to produce consistent anchor markup

### Approved anchor text pool per glossary term

| Term | Approved Anchors (use max 1 per page, rotate across pages) |
|------|-----------------------------------------------------------|
| `ppo` | "PPO dental plan", "what is a PPO?", "PPO (Preferred Provider Organization)", "how PPO dental insurance works" |
| `waiting-period` | "waiting period", "what is a dental waiting period?", "how waiting periods work", "dental plan waiting periods" |
| `annual-maximum` | "annual maximum", "yearly benefit maximum", "annual coverage limit", "annual maximum benefit" |
| `deductible` | "dental deductible", "how deductibles work", "annual deductible", "what is a deductible?" |
| `coinsurance` | "coinsurance", "how coinsurance works", "cost-share percentage", "dental coinsurance rate" |
| `in-network` | "in-network dentist", "in-network PPO provider", "what does in-network mean?", "staying in-network" |
| `out-of-pocket` | "out-of-pocket maximum", "out-of-pocket cap", "annual out-of-pocket limit" |
| `balance-billing` | "balance billing", "what is balance billing?", "surprise balance bills", "balance billing protection" |
| `missing-tooth` | "missing tooth clause", "missing tooth exclusion", "pre-existing tooth loss clause" |
| `calendar-year` | "calendar year", "calendar-year plan", "resets every January 1", "calendar-year benefits" |
| `plan-year` | "plan year", "plan-year reset", "12-month plan period" |
| `effective-date` | "effective date", "coverage effective date", "when coverage starts", "plan effective date" |
| `day-one` | "day-one coverage", "coverage from day one", "no waiting period from day one", "immediate effective coverage" |
| `allowed-amount` | "allowed amount", "plan's allowed amount", "maximum allowed amount", "fee schedule allowed amount" |
| `ada-fee` | "ADA fee schedule", "ADA dental fee guidelines", "American Dental Association fee schedule" |
| `cdt` | "CDT code", "dental procedure code", "CDT procedure classification", "Current Dental Terminology code" |
| `coverage-preventive` | "preventive coverage", "100% preventive care", "cleanings and X-rays coverage", "preventive dental benefits" |
| `coverage-basic` | "basic coverage", "basic dental services", "restorative coverage", "fillings and extractions coverage" |
| `coverage-major` | "major coverage", "major dental work coverage", "crowns and root canals coverage", "major services tier" |
| `implants` | "dental implant coverage", "implant insurance coverage", "does insurance cover implants?", "PPO coverage for implants" |
| `whitening` | "whitening coverage", "cosmetic dental coverage", "is whitening covered?", "cosmetic exclusions" |
| `vision` | "vision add-on", "dental and vision bundle", "vision coverage add-on", "combined dental and vision plan" |
| `rating` | "plan rating", "how dental plans are rated", "PPO plan star rating", "dental plan quality score" |

### Anchor text NOT to use (flagged as spammy or thin)
- "dental insurance glossary" (too meta — save this only for the homepage link to the glossary index)
- "click here to learn"
- "more info"
- Any anchor that repeats the full page title of the destination
- Bare URLs

---

## 6. HUB-AND-SPOKE MAP

The glossary at `/dental-insurance-glossary/` is the topical pillar. Spokes radiate in two directions: up to commercial/action pages, and down to individual term pages. The term pages themselves have micro-spokes to each other.

```
                              ┌─────────────────────────────────┐
                              │    covercapy.com homepage  /     │
                              │  3 glossary links (ppo,         │
                              │  waiting-period, in-network)     │
                              └──────────────┬──────────────────┘
                                             │
                              ┌──────────────▼──────────────────────────────────────────────┐
                              │         /dental-insurance-glossary/   (PILLAR HUB)           │
                              │         23 term sub-pages  |  full term index                │
                              └──┬──────┬──────┬──────┬──────┬──────┬──────┬────────────────┘
                                 │      │      │      │      │      │      │
          ┌──────────────────────┘      │      │      │      │      │      └─────────────────────┐
          │                             │      │      │      │      │                            │
          ▼                             ▼      │      ▼      │      ▼                            ▼
   ┌──────────────┐            ┌────────────┐  │  ┌────────────┐  ┌──────────────┐    ┌──────────────────┐
   │  /ppo/       │            │/waiting-   │  │  │/in-network/│  │/annual-      │    │/coverage-        │
   │              │            │ period/    │  │  │            │  │ maximum/     │    │ preventive/      │
   │ → COMPARE    │            │ → NWP      │  │  │ → FIND     │  │ → COMPARE    │    │ → COMPARE        │
   │ → FIND       │            │ → BTJ      │  │  │ → balance- │  │ → coverage-  │    │ → FIND           │
   └──────────────┘            └────────────┘  │  │   billing/ │  │   major/     │    └──────────────────┘
                                               │  └────────────┘  └──────────────┘
                                               │
                          ┌────────────────────┼────────────────────────┐
                          │                    │                        │
                          ▼                    ▼                        ▼
                  ┌──────────────┐    ┌──────────────┐       ┌──────────────────┐
                  │/effective-   │    │/day-one/     │       │/missing-tooth/   │
                  │ date/        │    │              │       │                  │
                  │ → IMM        │    │ → IMM        │       │ → COMPARE        │
                  │ → plan-year/ │    │ → NWP        │       │ → implants/      │
                  └──────────────┘    └──────────────┘       └──────────────────┘


COMMERCIAL ACTION PAGES (receive links FROM glossary terms)
────────────────────────────────────────────────────────────
  /compare-ppo-dental-plans/  ←── ppo, annual-maximum, deductible, coinsurance,
                                   coverage-preventive, coverage-basic, coverage-major,
                                   implants, whitening, vision, out-of-pocket, rating

  /find-my-dentist            ←── in-network, balance-billing, ada-fee, cdt,
                                   coverage-preventive, rating

  /dental-insurance-no-       ←── waiting-period, day-one
   waiting-period/

  /dental-insurance-           ←── effective-date, day-one, coverage-major
   immediate-coverage/

  /dental-insurance-           ←── waiting-period
   between-jobs/

  /dental-insurance-           ←── (no direct term CTA — SE page is linked FROM
   for-self-employed/              deductible inline prose only)


PAGES THAT LINK TO GLOSSARY (inbound spokes)
──────────────────────────────────────────────
  /                           → glossary index + ppo, waiting-period, in-network
  /compare-ppo-dental-plans/  → 8 term pages
  /dental-insurance-no-       → 4 term pages
   waiting-period/
  /dental-insurance-          → 5 term pages
   between-jobs/
  /dental-insurance-for-      → 4 term pages
   self-employed/
  /dental-insurance-          → 5 term pages
   immediate-coverage/
  T5 dentist profiles         → 3-4 term pages each (via generator)
  T4 metro hubs               → 2 term pages each
  T3 state hubs               → 2 term pages each


TERM-TO-TERM MICRO-CLUSTER MAP
────────────────────────────────
  Cost mechanics cluster:
    deductible ──► coinsurance ──► out-of-pocket
         │                               │
         └──────────► annual-maximum ◄───┘

  Network cluster:
    ppo ──► in-network ──► balance-billing
                 │
                 └──► allowed-amount ──► ada-fee ──► cdt

  Timing cluster:
    waiting-period ──► effective-date ──► day-one
          │
          └──► missing-tooth ──► implants

  Coverage tiers cluster:
    coverage-preventive ──► coverage-basic ──► coverage-major ──► implants

  Plan mechanics cluster:
    calendar-year ◄──► plan-year
    rating ──► ppo
    vision ──► annual-maximum
    whitening ──► coverage-preventive
```

---

## 7. IMPLEMENTATION NOTES FOR GENERATOR

When adding glossary links to T5 pages via `seo-build/generate-plans.js`:

```javascript
// Add to top of generate-plans.js — glossary link helper
const GLOSS = 'https://covercapy.com/dental-insurance-glossary';
function glossLink(term, anchor) {
  return `<a href="${GLOSS}/${term}/" class="prose-gloss-link">${anchor}</a>`;
}

// Usage in buildDentistPage() About section:
// "accepts ${glossLink('ppo','PPO dental insurance')}"
// "as an ${glossLink('in-network','in-network PPO provider')}"

// CSS for .prose-gloss-link — add to T5 pageShell styles:
// .prose-gloss-link { color: var(--teal-700); text-decoration-color: var(--teal-300); }
// .prose-gloss-link:hover { color: var(--mint); }
```

Per-page limits for T5 auto-generation:
- Max 2 glossary links in the About prose section
- Max 1 glossary link in the FAQ section
- Do not add glossary links to the insurance pill badges or procedure badges (these are UI elements, not prose)
- Never add glossary links to the modal copy

---

## 8. GLOSSARY INDEX PAGE LINKS

The index page at `/dental-insurance-glossary/` (the hub itself) should link back to:

| Destination | Anchor text | Placement |
|-------------|-------------|-----------|
| COMPARE | "Compare PPO plans — free" | Hero CTA button |
| FIND | "Find in-network dentists near you" | Secondary CTA |
| NWP | "Skip the wait: plans with no waiting period" | Featured callout below fold |
| IMM | "Need coverage today?" | Sidebar or bottom rail |

The glossary index page should NOT link to T3/T4/T5 pages directly — those are dentist-intent pages and the traffic mix doesn't match glossary readers.

---

## 9. CANONICAL AND NOINDEX RULES

- Every term sub-page at `/dental-insurance-glossary/{term}/` gets its own canonical tag pointing to itself
- The glossary index at `/dental-insurance-glossary/` gets a canonical to itself
- Do not noindex any term pages — they carry standalone SEO value
- If a glossary redirect from an old URL is needed, use 301

---

## 10. LINK COUNT BUDGET SUMMARY

| Source page type | Glossary links added | Notes |
|-----------------|---------------------|-------|
| Homepage | 3 | Above fold only |
| Compare plans | 8 | One per table concept |
| Each situation landing page (4 pages) | 4-5 each | ~18 total |
| Each T5 dentist profile | 3 | 6,400 pages = ~19,200 links total to glossary |
| Each T4 metro hub | 2 | ~300 pages = ~600 links |
| Each T3 state hub | 2 | ~50 pages = ~100 links |
| Find-my-dentist app | 2 | Info panel or footer |

Total inbound glossary links at scale: ~20,000+ (mostly from T5 pages via generator).

This gives the glossary pillar exceptional internal PageRank — more than any other content cluster on the site except the dental hub pages themselves.
