# Claude 4.8 Master Prompt — CoverCapy PPO Hub-and-Spoke Redesign

## Mission

Redesign CoverCapy’s PPO dental insurance ecosystem as one coherent hub-and-spoke product system.

The existing live page at `compare-ppo-dental-plans.html` is intended to become the central hub for all individual PPO plans. The uploaded ZIP contains a stronger plan-shopping and comparison presentation system. The existing live page contains stronger CoverCapy guidance, Smart Match logic, treatment-first positioning, editorial trust, glossary connections, and dentist-verification pathways.

The final system must be a deliberate compromise:

> **Use the ZIP as the structural and transactional foundation. Use the live CoverCapy page as the guidance, trust, and brand layer.**

This is not a request to paste both pages together. It is a request to create one shared design system and one information architecture that allows the hub, carrier hubs, treatment pages, comparison pages, glossary pages, and individual plan pages to feel like the same product.

### Design-weighting rule

Use approximately:

- **70% ZIP presentation logic**
  - standardized plan specifications
  - spec-first plan cards
  - side-by-side comparison matrix
  - sticky compare tray
  - predictable coverage grids
  - carrier index
  - plan-detail templates
  - source drawers
  - scan-first decision architecture

- **30% current CoverCapy experience**
  - treatment/timing/budget Smart Match
  - calm premium concierge identity
  - patient-first explanation
  - coverage terminology education
  - treatment and life-situation pathways
  - dentist-network verification
  - independence and methodology disclosures
  - restrained Mr. Bara guidance

The result should feel like a **premium dental-plan research and decision product**, not a generic editorial article, generic SaaS pricing page, insurance carrier clone, or crowded marketplace.

---

# Non-negotiable process rule

## Do not redesign production HTML yet.

Before changing the live page or implementing components, complete a repo-wide audit, run the 20-agent review, define the shared visual system, resolve the hub/spoke architecture, and create the required Markdown documents.

The first goal is alignment. The second goal is implementation.

No production page should be substantially redesigned until the design-language decision is documented in:

`docs/ppo-redesign/05-APPROVED-DESIGN-SYSTEM.md`

The implementation must eventually be driven by:

`docs/ppo-redesign/START-HERE-PPO-REDESIGN.md`

---

# Start by inspecting the actual repository

Do not rely only on this prompt or prior summaries.

Run and document:

```bash
git status
git branch --show-current
git remote -v
find . -maxdepth 4 -type f | sort
```

Identify the active production repository and branch. The user has public repositories including:

- `jsongau/covercapy`
- `jsongau/covercapycodex`
- `jsongau/covercapy-app`

Determine which repository and branch currently produce `covercapy.com`. Do not assume.

## Read these materials completely

Locate and inspect:

1. The current live PPO hub source:
   - `compare-ppo-dental-plans.html`
   - associated CSS, scripts, data objects, assets, and build logic

2. Every file in the uploaded ZIP or extracted ZIP directory, including:
   - the ZIP’s PPO comparison hub
   - the ZIP’s carrier/plan index
   - all eight rendered plan pages
   - plan presentation specifications
   - SEO audits
   - component checklists
   - data dictionary
   - mascot/trust analysis
   - sitemap and robots files

3. The repository’s `plan-data/` folder and all current plan briefs.

4. Every existing PPO plan page, carrier page, treatment page, life-situation page, glossary page, cost page, dentist page, and related guide.

5. Shared/global files:
   - universal mega navigation
   - mobile navigation
   - footer
   - global design tokens
   - typography
   - universal includes/loaders
   - canonical and redirect configuration
   - sitemap generation
   - robots rules
   - schema generators
   - Supabase-backed or JavaScript-generated plan data
   - any static-generation or prerender pipeline

6. Existing routes and links related to:
   - dental insurance
   - PPO plans
   - plan comparison
   - plan reviews
   - carrier hubs
   - Delta Dental
   - Aetna
   - Guardian
   - Humana
   - UHC
   - Ameritas
   - Mutual of Omaha
   - MetLife/NCD
   - waiting periods
   - immediate coverage
   - self-employed dental insurance
   - dental insurance between jobs
   - implants
   - crowns
   - root canals
   - dentures
   - orthodontics
   - whitening
   - annual maximums
   - in-network dentists
   - treatment-cost estimation
   - financing
   - benefit timing

7. The entire glossary and all linked “full guide” destinations.

Do not infer that a page exists merely because a link or card names it. Confirm whether the route, file, content, canonical, and sitemap entry actually exist.

---

# Known problems that must be addressed

Claude previously found the following conflicts. Treat them as an audit starting point, not automatically verified truth:

| Plan | Existing compare hub | Existing plan brief | Problem |
|---|---|---|---|
| Mutual of Omaha | ~$90/mo; major 50% after six-month wait | ~$57/mo; major 20% Year 1 / 50% Year 2; no wait | Premium and coverage conflict |
| Ameritas | $2,000 → $3,500 Year 2 max | $2,500 → $3,000 Year 2 max | Annual-maximum conflict |
| UHC | $50 deductible | $100 deductible | Deductible conflict |
| Delta | No whitening | PPO Premium says 80% in-network whitening | Missing differentiator |
| Guardian | 50% whitening | Whitening may only apply to another tier, not Premier 2.0 | Possible overstatement |

Also:

- The comparison hub shows eight plans.
- Only six plan briefs were reportedly found in `plan-data/`.
- Aetna Dental Direct and MetLife NCD Complete may lack complete spoke briefs.
- The `.md` briefs may contain content but may not yet render as crawlable HTML pages.
- Existing plan pages may vary significantly in depth and structure.
- The current hub’s plan data may be rendered in a way that is inconsistently visible to crawlers.
- The hub’s search description contains or contained a broken phrase.
- Current URLs, canonicals, and generated routes may not follow one consistent pattern.
- Existing reviewer, methodology, source, and verification claims must be inspectable and truthful.

## Data rule

Do not quietly choose whichever number looks better.

Create a canonical source-of-truth system and a conflict-resolution report. Every numerical fact must include:

- plan key
- carrier
- exact plan/tier name
- state or geographic applicability
- quote assumptions, when applicable
- source document
- source effective date
- date checked
- confidence level
- whether the value is illustrative, universal, state-variable, ZIP-variable, or age-variable
- exact display wording
- correction history

No plan-data correction should be merged into production until it is traceable to authoritative source material.

---

# The 20-agent council

Create 20 genuinely distinct workstreams. Do not use “20 agents” as decorative wording. Each agent must:

1. inspect the relevant repository files,
2. identify evidence,
3. write an independent memo,
4. score the current system,
5. recommend what to keep, remove, merge, or create,
6. identify risks and acceptance criteria,
7. save the memo in the required folder.

Save agent reports under:

`docs/ppo-redesign/agents/`

## Agent 01 — Design-system director

Focus:

- shared design language across hub, carrier hubs, plan pages, treatment pages, glossary, comparison views, and dentist bridges
- typography, spacing, radii, borders, elevation, color, icons, motion, density
- reconcile ZIP design with current CoverCapy editorial design
- prevent every page type from looking like a separate microsite

Output:

`agents/01-design-system-director.md`

## Agent 02 — PPO comparison UX specialist

Focus:

- spec-first shopping experience
- comparison matrix
- compare tray
- plan cards
- filtering and sorting
- four-plan maximum
- decision-support hierarchy
- full comparison versus quick scan
- visible differences and tradeoffs

Output:

`agents/02-comparison-ux.md`

## Agent 03 — Mobile UX and sticky-navigation specialist

Focus:

- sticky sub-navigation
- sticky compare tray
- mobile horizontal scrolling
- selected-plan switching
- anchor navigation
- active-section state
- touch targets
- preserving content width
- avoiding stacked sticky elements consuming the viewport

Output:

`agents/03-mobile-sticky-navigation.md`

## Agent 04 — Accessibility and inclusive-design specialist

Focus:

- WCAG 2.2 AA
- keyboard navigation
- focus management
- screen-reader table semantics
- tooltips on tap/focus/hover
- accessible accordions
- contrast
- reduced motion
- sticky element behavior
- error and validation messaging
- non-color status signals

Output:

`agents/04-accessibility.md`

## Agent 05 — Patient plan-shopping researcher

Act as patients comparing plans for the first time.

Focus:

- information they scan first
- terms they misunderstand
- anxiety and trust barriers
- price versus coverage confusion
- decision overload
- expectation of “best plan”
- need for honest caveats without legal-noise overload

Output:

`agents/05-patient-shopping-behavior.md`

## Agent 06 — Urgent-treatment patient specialist

Personas:

- cracked tooth
- crown needed now
- root canal this month
- implant planned soon
- patient switching from cash to insurance

Focus:

- effective date versus waiting period
- Day 1 tier-level coverage
- predetermination
- missing-tooth clauses
- action pathway after comparison

Output:

`agents/06-urgent-treatment-journeys.md`

## Agent 07 — Budget and family-plan behavior specialist

Personas:

- lowest monthly premium shopper
- family comparing orthodontic benefits
- preventive-only shopper
- self-employed buyer
- person between jobs
- senior comparing high annual maximums

Focus:

- budget anchoring
- annualized premium
- Year 1 versus Year 2
- family deductibles
- lifetime ortho maximums
- plan reset timing
- total expected cost, not just premium

Output:

`agents/07-budget-family-personas.md`

## Agent 08 — Dentist and network-operations specialist

Act as:

- dentist
- dental office manager
- insurance verification specialist
- treatment coordinator
- dentist evaluating whether to join a carrier network
- office considering a CoverCapy profile or membership

Focus:

- exact network names
- carrier versus product network
- “accepts” versus truly in-network
- verification states
- dentist participation education
- reimbursement and allowed-amount context
- provider-side branch opportunities
- dentist acquisition CTAs that do not hijack patient pages

Output:

`agents/08-dentist-network-perspective.md`

## Agent 09 — Behavioral economics and action psychology specialist

This role is extremely important.

Focus:

- reducing choice paralysis
- progressive disclosure
- goal-gradient effect
- commitment and consistency
- loss aversion used ethically
- default recommendations with transparent reasoning
- confidence-building
- comparison completion
- next-best-action design
- avoiding manipulative urgency

Output:

`agents/09-action-psychology.md`

## Agent 10 — Checkout and conversion-flow specialist

Focus:

- Smart Match completion
- compare selection
- plan-detail click
- quote/enrollment handoff
- save/email comparison
- dentist verification
- account creation timing
- abandonment recovery
- CTA naming and hierarchy
- off-site carrier transitions
- affiliate or compensation disclosure

Output:

`agents/10-checkout-conversion.md`

## Agent 11 — Retention and learning-system specialist

Focus:

- how a user learns enough to make a decision without reading an encyclopedia
- returning to saved comparisons
- treatment-specific learning paths
- glossary tooltips
- visited-state memory
- progress indicators
- personalized follow-up
- plan renewal and annual-reset education
- non-intrusive retention loops

Output:

`agents/11-retention-learning.md`

## Agent 12 — Information architect

Focus:

- parent hub
- comparison hub
- plan spokes
- carrier hubs
- treatment hubs
- timing hubs
- life-situation pages
- glossary
- glossary term guides
- dentist-network branches
- cost-estimator branches
- methodology and source pages

Output:

`agents/12-information-architecture.md`

## Agent 13 — Hub-and-spoke SEO architect

Focus:

- page purpose
- search intent
- canonical ownership
- internal-link graph
- avoiding orphan pages
- avoiding cannibalization
- descriptive anchor text
- breadcrumb hierarchy
- pagination/filter crawl behavior
- URL families
- carrier and plan entities

Output:

`agents/13-hub-spoke-seo.md`

## Agent 14 — 2026 technical SEO architect

Use current official search-engine guidance, not folklore.

Focus:

- server-rendered content
- crawlability
- indexability
- canonical consistency
- redirects
- XML sitemaps
- robots
- status codes
- Core Web Vitals
- JavaScript rendering
- hash anchors
- duplicate filter URLs
- source visibility
- mobile-first indexing
- change-monitoring

Output:

`agents/14-technical-seo-2026.md`

## Agent 15 — Google SERP title, meta, and snippet specialist

Focus:

- title tags
- H1 alignment
- unique meta descriptions
- snippet-ready first paragraphs
- byline and update dates
- Open Graph
- Twitter cards
- image previews
- sitelink-oriented navigation
- avoiding templated title duplication
- avoiding unsupported “best” claims

Output:

`agents/15-google-serp-metadata.md`

## Agent 16 — Structured-data and entity specialist

Focus:

- valid schema only
- `Organization`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `ItemList`
- `Article` or `Review` only when truly appropriate
- `Person` only for real, verifiable authors/reviewers
- visible-content parity
- carrier and plan entity consistency
- schema validation
- no invented ratings or unsupported product offers

Output:

`agents/16-schema-entities.md`

## Agent 17 — AI search and generative-discovery architect

Use official current guidance from Google and other primary sources.

Focus:

- concise answer blocks
- comparison-ready factual tables
- source-backed statements
- entity clarity
- treatment-to-plan relationships
- question fan-out
- passage-level answerability
- citation-worthy summaries
- machine-readable but user-visible content
- avoiding unsupported claims about “special AI schema”
- avoiding the assumption that `llms.txt` creates rankings

Output:

`agents/17-ai-search-architecture.md`

## Agent 18 — Knowledge-graph and semantic-content modeler

Focus:

Model relationships among:

- carriers
- exact plan names
- plan tiers
- network names
- states
- ZIP availability
- treatments
- CDT codes
- coverage categories
- waiting periods
- annual maximums
- deductibles
- effective dates
- exclusions
- dentists
- locations
- glossary concepts
- cost scenarios

Output:

`agents/18-knowledge-graph.md`

## Agent 19 — Glossary and branch-page strategist

Audit the current glossary and all “full guide” links.

Focus:

- which terms should remain glossary entries
- which terms deserve standalone pages
- which terms should become treatment or cost guides
- which terms should link directly into plan comparison states
- which branches already exist
- which are thin, duplicate, broken, or missing
- how terms should link to carrier/plan/treatment hubs

At minimum, audit:

- annual maximum
- deductible
- coinsurance
- allowed amount
- balance billing
- in-network dentist
- out-of-network dentist
- waiting period
- effective date
- Day 1 activation
- calendar-year reset
- plan year
- preventive services
- basic services
- major services
- implants
- missing-tooth clause
- whitening
- orthodontic lifetime maximum
- predetermination
- prior authorization
- frequency limits
- alternate benefit / LEAT
- MAC versus U&C
- EOB
- CDT codes
- vision add-on

Output:

`agents/19-glossary-branch-strategy.md`

## Agent 20 — Data governance, editorial trust, and compliance specialist

Focus:

- canonical plan facts
- official source hierarchy
- correction workflows
- last-verified dates
- reviewer identity
- editorial methodology
- state variability
- quote assumptions
- trademark wording
- plan availability
- disclaimer placement
- avoiding false certainty
- conflicts between hub and spokes
- Aetna and MetLife content gaps

Output:

`agents/20-data-governance-trust.md`

---

# Required synthesis council

After all 20 memos exist, create a four-person synthesis council:

1. Design-system director
2. Product/conversion director
3. SEO/AI architecture director
4. Data/trust director

The council must compare recommendations using a decision matrix.

Do not simply average opinions. Resolve contradictions.

Use these weighted criteria:

| Criterion | Weight |
|---|---:|
| Patient decision clarity | 20 |
| Action-taking conversion | 18 |
| Cross-page consistency | 15 |
| Plan-data trust and accuracy | 15 |
| Crawlability and indexability | 10 |
| AI answerability and entity clarity | 8 |
| Mobile usability | 6 |
| Accessibility | 4 |
| Performance and maintainability | 4 |

The council must state:

- unanimous decisions
- majority decisions
- unresolved disagreements
- rejected ideas and reasons
- risks
- recommended compromise
- items requiring user approval

---

# Style-alignment mandate

The ZIP and the current live page must not survive as two separate visual languages.

Create one shared CoverCapy PPO design system.

## Core visual direction

The recommended direction should feel like:

> **Premium concierge clarity meets a modern insurance research terminal.**

It should be:

- calm
- high-trust
- intelligent
- warm but not childish
- dense where comparison requires density
- spacious where explanation requires calm
- scan-friendly
- mobile-first
- editorial only where editorial context adds value
- clearly CoverCapy rather than a carrier clone

## Preserve from the current live page

Strong candidates to preserve or refine:

- warm paper/cream foundation
- deep teal or green trust color
- refined serif headlines
- clean sans-serif data typography
- treatment-first Smart Match
- independent-by-design disclosure
- CoverCapy methodology and reviewer layer
- treatment and life-situation pathways
- glossary education
- dentist-verification pathway
- concierge tone
- restrained Mr. Bara appearances at high-friction guidance points

## Preserve from the ZIP

Strong candidates to make dominant:

- standardized six-to-eleven-field plan schema
- predictable spec placement
- premium shown early
- annual maximum and deductible shown early
- 100/80/50-style coverage grid
- implants and orthodontics as explicit rows
- waiting-period visibility
- exact network naming
- plan shape labels
- side-by-side matrix
- sticky compare tray
- carrier index
- consistent plan-detail anatomy
- source drawers
- “best for / weak for / compare with” summaries
- fixed card hierarchy
- mobile compare pattern

## Avoid

Do not create:

- generic AI gradients
- excessive floating glass panels
- random pastel cards
- rainbow carrier-card layouts
- overly rounded SaaS pricing cards everywhere
- giant mascot heroes on serious plan pages
- long editorial essays before the plan inventory
- multiple competing sticky bars
- hover-only definitions
- fake urgency
- unsupported “best plan” claims
- endless icon grids
- decorative charts without decision value
- duplicated mega navigation
- a different color system for each carrier hub
- a separate visual identity for glossary, plans, and treatment pages
- hidden plan facts that exist only after JavaScript runs

## Carrier color rule

Use the CoverCapy system as the dominant visual identity.

Carrier branding may appear through:

- logo
- small accent line
- small badge
- restrained icon or comparison marker

Do not let every carrier repaint the entire page.

## Mr. Bara rule

Mr. Bara may appear only as:

- a small guide in Smart Match
- glossary/tooltips
- loading or empty states
- verification guidance
- a small concierge reassurance next to a high-friction CTA

Do not place Mr. Bara over:

- plan prices
- coverage matrices
- exclusion text
- legal disclosures
- source lists
- primary spec tables

---

# Sticky sub-navigation system

Create one reusable sticky sub-navigation component for the entire PPO ecosystem.

It must sit below the universal mega navigation and must not replace or modify the global navigation.

## Required behavior

- server-rendered anchor links
- deep-linkable section IDs
- active-section state
- keyboard navigation
- visible focus state
- horizontal scrolling on mobile
- touch-friendly controls
- no hover dependency
- scroll-margin compensation for fixed headers
- reduced-motion support
- no content jump when it becomes sticky
- no more than one primary sticky subnav plus one contextual compare tray
- graceful behavior when both are visible
- optional condensed state after scrolling
- no hidden anchor content
- analytics events for subnav usage

## Hub sub-navigation

Candidate labels:

- Match
- Compare
- All plans
- By treatment
- By timing
- By carrier
- PPO terms
- Find a dentist
- Methodology

Do not use all labels automatically. Test information scent and width. The final system should prioritize no more than 6–8 visible items, with overflow handling where necessary.

## Individual plan-page sub-navigation

Candidate labels:

- Overview
- Coverage
- Waiting periods
- Costs
- Fine print
- Treatments
- Alternatives
- Dentists
- Sources

## Carrier-hub sub-navigation

Candidate labels:

- Carrier overview
- Plans
- Compare
- Network
- Treatments
- Dentists
- FAQs
- Sources

## Treatment-page sub-navigation

Candidate labels:

- Treatment overview
- What insurance may cover
- Best-fit plans
- Waiting periods
- Cost example
- Questions to ask
- Find a dentist

## Glossary-page sub-navigation

Candidate labels:

- A–Z
- Cost terms
- Coverage terms
- Network terms
- Timing terms
- Claims terms
- Compare plans

Create final labels only after the information-architecture and behavior agents test them.

---

# Page-system architecture to evaluate

Do not blindly implement these routes. Audit the existing URLs, rankings, backlinks, canonicals, and redirect risk first.

## Root dental-insurance layer

Potential structure:

- `/dental-insurance/`
- existing comparison URL: `/compare-ppo-dental-plans/`
- possible canonical PPO parent: `/dental-insurance/ppo-plans/`
- glossary
- methodology
- corrections policy
- sources policy

Because the user wants the current compare page to serve as the central plan hub, evaluate whether:

### Option A
Keep `/compare-ppo-dental-plans/` as the canonical master hub and comparison product.

### Option B
Use `/dental-insurance/ppo-plans/` as the master hub and retain `/compare-ppo-dental-plans/` as a dedicated comparison interface.

### Option C
Move the master hub to `/dental-insurance/ppo-plans/` and permanently redirect the old compare URL.

Do not change the production URL until the SEO architect documents the risk and recommends one option.

## Individual plan URL pattern

The preferred family previously discussed is:

`/dental-insurance/ppo-plans/{carrier}/{plan}/`

Examples:

- `/dental-insurance/ppo-plans/humana/extend-5000/`
- `/dental-insurance/ppo-plans/delta-dental/ppo-premium/`
- `/dental-insurance/ppo-plans/ameritas/primestar-care-complete/`
- `/dental-insurance/ppo-plans/guardian/premier-2-0/`
- `/dental-insurance/ppo-plans/unitedhealthcare/primary-dental/`
- `/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/`
- `/dental-insurance/ppo-plans/aetna/dental-direct/`
- `/dental-insurance/ppo-plans/metlife/ncd-complete/`

Confirm exact official product naming before finalizing slugs.

## Carrier hubs

Evaluate dedicated carrier hubs such as:

- `/dental-insurance/ppo-plans/delta-dental/`
- `/dental-insurance/ppo-plans/humana/`
- `/dental-insurance/ppo-plans/ameritas/`
- `/dental-insurance/ppo-plans/guardian/`
- `/dental-insurance/ppo-plans/unitedhealthcare/`
- `/dental-insurance/ppo-plans/aetna/`
- `/dental-insurance/ppo-plans/mutual-of-omaha/`
- `/dental-insurance/ppo-plans/metlife/`

A carrier hub must not be a thin logo page.

It may contain:

- carrier entity overview
- individual PPO plans tracked
- exact networks
- states/availability
- treatment-fit overview
- waiting-period comparison
- plan-to-plan differences
- carrier-specific glossary/fine-print issues
- dentist-network search
- FAQs
- official source links
- corrections and last-verified information

## Treatment branches

Evaluate pages for:

- dental insurance for implants
- dental insurance for crowns
- dental insurance for root canals
- dental insurance for dentures
- dental insurance for orthodontics
- dental insurance for preventive care
- dental insurance with whitening
- high-annual-maximum dental plans

Each treatment page must:

- explain the relevant coverage tier
- identify the relevant exclusions
- compare plans using canonical data
- distinguish effective date from waiting period
- include a realistic cost scenario
- link to the cost estimator
- link to appropriate glossary terms
- link to relevant plan pages
- connect to dentist search and verification

## Timing branches

Evaluate:

- dental insurance with no waiting period
- dental insurance that starts today
- immediate dental insurance coverage
- dental insurance for major work now
- calendar-year benefit timing
- plan-year versus calendar-year resets

Avoid cannibalization among “no wait,” “starts today,” and “immediate coverage.” Assign each a distinct intent or consolidate.

## Life-situation branches

Audit existing pages and consider:

- between jobs
- self-employed
- retiring or losing employer coverage
- newly moved
- family coverage
- individual versus employer PPO
- switching from HMO/Medi-Cal to private PPO, only where accurate and appropriate

## Dentist/provider branches

Explore a separate provider-side cluster without allowing it to interfere with patient decisions:

- how dentists join a PPO network
- carrier credentialing basics
- contracted fees and allowed amounts
- PPO participation tradeoffs
- how patients verify network status
- how a practice claims its CoverCapy profile
- how CoverCapy dentist membership differs from carrier-network participation

Be explicit that joining CoverCapy is not the same as joining a carrier PPO network.

---

# Shared page anatomy

## Master PPO hub

Recommended high-level order:

1. Breadcrumb and review/freshness line
2. Compact hero
3. Smart Match
4. Immediate recommended-plan results
5. Server-rendered comparison table
6. Sticky compare tray
7. Plan-card library
8. Treatment pathways
9. Timing pathways
10. Carrier index
11. Dentist verification bridge
12. PPO glossary preview
13. Methodology and source transparency
14. Focused FAQs
15. Related guides
16. corrections/disclosure/footer

The plan inventory must appear high on the page. Do not bury it beneath several editorial sections.

## Individual plan page

Recommended order:

1. Breadcrumb
2. Compact plan identity
3. Standardized spec sheet
4. CoverCapy verdict
5. Best for / weak for
6. Coverage grid
7. waiting-period/effective-date timeline
8. realistic first-year treatment scenarios
9. fine print and exclusions
10. treatment-fit matrix
11. network verification
12. compare alternatives
13. related carrier hub
14. FAQs
15. sources and update log
16. enrollment/quote handoff disclosure

## Carrier hub

Recommended order:

1. Carrier entity summary
2. Plans tracked
3. plan-to-plan matrix
4. network naming and verification
5. best-fit treatments
6. timing differences
7. dentist search
8. glossary/fine-print topics
9. FAQs
10. sources and update log

## Glossary term page

Only create a standalone page when it can add meaningful original value.

Recommended order:

1. direct definition
2. why it affects the bill
3. one numerical example
4. where it appears in plan documents
5. plans where the term matters
6. related treatment pages
7. related glossary concepts
8. action step
9. source notes

---

# Canonical plan-data model

Create one canonical data source that renders:

- hub match results
- plan cards
- comparison table
- individual plan pages
- carrier hubs
- treatment pages
- timing pages
- schema
- internal-link modules
- OG cards where appropriate

Do not duplicate numbers in separate HTML templates.

## Required field categories

### Identity

- plan key
- carrier key
- carrier display name
- exact plan name
- plan tier
- plan type
- network name
- plan shape
- official enrollment URL
- availability status

### Pricing

- illustrative monthly premium
- annualized premium
- quote assumptions
- state/ZIP/age variability
- enrollment fee
- family premium handling

### Core benefit structure

- annual maximum Year 1
- annual maximum later years
- deductible individual
- deductible family
- preventive coverage
- basic coverage
- major coverage
- implant coverage
- orthodontic coverage
- whitening
- vision
- other allowances

### Timing

- enrollment cutoff
- effective date
- preventive wait
- basic wait
- major wait
- implant wait
- orthodontic wait
- calendar-year versus plan-year reset
- benefit step-up schedule

### Fine print

- missing-tooth clause
- frequency limits
- alternate benefit / LEAT
- work-in-progress exclusion
- replacement limits
- age limits
- lifetime ortho maximum
- MAC/U&C basis
- out-of-network reimbursement basis
- cancellation rules

### Evidence

- source title
- source type
- source URL or repository file
- state
- document effective date
- date checked
- reviewer
- verification status
- confidence
- notes
- corrections history

### Editorial decision layer

- CoverCapy score components
- best-for tags
- weak-for tags
- unique differentiator
- compare-with plans
- treatment-fit reasons
- action recommendation
- disclosures

---

# SEO and AI architecture rules

## Follow current official guidance

The SEO and AI agents must verify current primary-source documentation during the audit.

Do not rely on old checklists, SEO folklore, or generic AI-search claims.

Key principles to validate include:

- important content must be crawlable and available in text
- internal links must make pages discoverable
- structured data must match visible content
- there is no special schema required solely for Google AI features
- AI-search visibility still depends on sound technical and people-first SEO
- titles and metadata must be accurate, concise, and unique
- server-rendered plan facts are safer than JavaScript-only facts
- machine-readable data must not contradict visible data
- URL changes require redirect and canonical planning
- filters must not create uncontrolled duplicate indexable URLs

## Answer architecture

Every major page should contain:

- a direct answer within the opening section
- concise key-fact summaries
- comparison tables
- “why it matters” passages
- plan-specific evidence
- explicit state/ZIP variability
- treatment relationships
- clear next actions
- descriptive headings
- descriptive anchor text
- source-backed update dates

## Do not over-optimize

Avoid:

- keyword stuffing
- hundreds of thin programmatic combinations
- mass-generated carrier/treatment/city pages without unique value
- unsupported superlatives
- hidden text
- fake review schema
- FAQ schema spam
- duplicated intros
- pages created solely for a keyword variation
- claims that an `llms.txt` file guarantees AI inclusion
- citations that do not support the exact claim

---

# Conversion architecture

The primary user journey should be:

> **What care do I need? → When do I need it? → What can I spend? → Which plans plausibly fit? → What are the exact tradeoffs? → What should I verify? → Which dentist can use this exact plan?**

## Smart Match

Smart Match should not function as an isolated quiz.

It must operate on the same canonical plan data as the comparison table and plan pages.

Required behavior:

- no email required before showing results
- explain why the top match ranked first
- show one top match and one meaningful backup
- display tradeoffs, not only positives
- permit immediate comparison
- preserve choices in the URL or session state when appropriate
- link to exact plan pages
- link to relevant treatment guides
- distinguish “coverage starts” from “treatment tier becomes eligible”
- state that pricing and availability require a location-specific quote

## CTA hierarchy

Potential hierarchy:

### Primary
- Find my best-fit PPO plan
- Compare selected plans
- Check official plan pricing
- Find dentists for this plan
- Verify my dentist and network

### Secondary
- View full plan breakdown
- Save this comparison
- Email this comparison
- See treatment-specific guidance
- Read the source documents

### Provider-side
- Learn how PPO networks work for dentists
- Claim this office profile
- Explore CoverCapy membership

Provider CTAs should appear in dedicated provider contexts or low-priority modules. They must not compete with the patient’s main task.

## Ethical conversion rule

Do not use:

- fake countdowns
- false scarcity
- invented plan popularity
- dark-pattern defaults
- prechecked consent
- misleading “activation today” language
- “guaranteed savings”
- “in-network” labels without exact network evidence

---

# Analytics and research plan

Create an event taxonomy for:

- Smart Match started
- Smart Match completed
- result reason expanded
- plan selected
- compare tray opened
- comparison completed
- plan detail opened
- source drawer opened
- glossary tooltip opened
- treatment page opened
- quote handoff clicked
- dentist search started
- dentist verification started
- comparison saved
- account created
- provider route clicked

Define:

- primary conversion
- assisted conversions
- guardrail metrics
- trust metrics
- confusion indicators
- mobile abandonment
- return visits
- time to first meaningful plan comparison

Recommend A/B tests only after the baseline system is consistent.

---

# Required Markdown deliverables

Create this exact folder:

`docs/ppo-redesign/`

Do not scatter strategy files around the repository.

## Foundation files

### `00-REPO-INVENTORY.md`

Include:

- active repo and branch
- current production build path
- all relevant files
- all relevant routes
- live versus missing pages
- plan-data files
- global design assets
- build/rendering approach
- sitemap/canonical status
- broken or placeholder links
- orphan pages
- duplicate content
- exact glossary inventory
- exact carrier/treatment/timing/life-situation inventory

### `01-HUB-SPOKE-DATA-CONFLICTS.md`

Include:

- all conflicting plan facts
- source hierarchy
- resolution status
- unresolved questions
- missing Aetna and MetLife briefs
- state/ZIP variability
- corrections required
- do-not-publish items

### `02-CURRENT-VS-ZIP-DESIGN-AUDIT.md`

Compare:

- hierarchy
- density
- typography
- color
- cards
- tables
- plan-spec placement
- Smart Match
- sticky navigation
- mobile behavior
- conversion
- trust
- editorial depth
- performance
- maintainability

Use:

- Keep
- Remove
- Merge
- Redesign
- Defer

### `03-STYLE-DIRECTIONS-A-B-C.md`

Create three distinct but realistic style directions.

Required options:

#### Direction A — ZIP-dominant research terminal
High-density, spec-first, restrained editorial.

#### Direction B — Maison Concierge editorial
More of the live page’s warmth and storytelling, but with the ZIP’s comparison core.

#### Direction C — Recommended compromise
A deliberate 70/30 merger that keeps CoverCapy identity while making plan shopping dominant.

For each direction provide:

- design thesis
- mood
- token examples
- typography
- spacing
- card anatomy
- table anatomy
- sticky-subnav behavior
- mobile behavior
- Smart Match treatment
- carrier-brand treatment
- mascot treatment
- strengths
- risks
- screenshot/wireframe descriptions
- page examples
- scoring matrix

### `04-STYLE-DECISION-MATRIX.md`

Score all three directions against the weighted criteria.

Include:

- all 20-agent votes
- synthesis-council recommendation
- disagreements
- final recommended direction
- items requiring user approval

### `05-APPROVED-DESIGN-SYSTEM.md`

This must be the single design authority after approval.

Include:

- design principles
- color tokens
- typography tokens
- spacing scale
- content-width rules
- density modes
- radius rules
- border rules
- shadow rules
- icon rules
- button hierarchy
- link styling
- form controls
- table components
- plan cards
- coverage grids
- compare tray
- sticky sub-navigation
- badges
- alerts
- source drawers
- glossary tooltips
- accordions
- tabs
- mobile adaptations
- accessibility standards
- motion standards
- Mr. Bara rules
- carrier-brand rules
- examples of correct and incorrect usage

Do not finalize this file until the preferred direction is selected. When no user approval is available during the run, mark it `PROPOSED — AWAITING USER APPROVAL`.

## Architecture files

### `06-STICKY-SUBNAV-SYSTEM.md`

Include:

- component anatomy
- variants by page type
- desktop/mobile behavior
- fixed-header offsets
- hash anchors
- active-state logic
- accessibility
- analytics
- collision behavior with compare tray
- acceptance criteria

### `07-PPO-INFORMATION-ARCHITECTURE.md`

Include:

- route tree
- canonical ownership
- carrier hubs
- plan spokes
- treatment branches
- timing branches
- life-situation branches
- glossary branches
- dentist/provider branches
- breadcrumbs
- internal-link directions
- consolidation candidates
- redirects
- noindex/canonical rules for filters

### `08-INTERNAL-LINK-AND-ENTITY-GRAPH.md`

Include:

- link matrix by page type
- required inbound/outbound links
- anchor-text patterns
- entity relationships
- orphan prevention
- context-sensitive modules
- breadcrumb graph
- link-priority tiers
- automated validation approach

### `09-SEO-AI-PAGE-MATRIX.md`

For every proposed page include:

- URL
- page type
- primary intent
- secondary intents
- target audience
- unique value
- H1
- title-tag pattern
- meta-description pattern
- schema
- required sections
- source requirements
- internal links
- CTA
- canonical
- status
- cannibalization risk

### `10-GLOSSARY-BRANCH-MAP.md`

Include:

- every current glossary term
- existing full-guide route
- missing route
- recommended page type
- search intent
- related plans
- related treatments
- related terms
- action link
- merge/consolidate decision
- content-depth requirement

## Product and template files

### `11-CANONICAL-PLAN-DATA-SCHEMA.md`

Include:

- complete field dictionary
- data types
- allowed values
- display rules
- source rules
- state variation handling
- validation
- conflict resolution
- examples
- rendering consumers
- migration path from current data

### `12-MASTER-HUB-TEMPLATE.md`

Include:

- section order
- component requirements
- copy purpose
- data requirements
- sticky-subnav anchors
- mobile behavior
- SEO requirements
- AI-answer blocks
- CTA hierarchy
- acceptance criteria

### `13-INDIVIDUAL-PLAN-TEMPLATE.md`

Include:

- exact shared anatomy
- unique-content requirements
- source drawer
- comparison alternatives
- carrier hub links
- treatment links
- dentist verification
- metadata
- schema
- acceptance criteria

### `14-CARRIER-HUB-TEMPLATE.md`

Include:

- required unique value
- carrier entity summary
- exact network names
- plan comparison
- treatment links
- dentist search
- provider-side education
- glossary links
- source requirements
- anti-thin-content rules

### `15-TREATMENT-AND-TIMING-TEMPLATES.md`

Include separate templates for:

- treatment pages
- no-wait/timing pages
- life-situation pages

### `16-CONVERSION-AND-RETENTION-FLOW.md`

Include:

- user journeys
- CTA hierarchy
- Smart Match behavior
- compare behavior
- save/email behavior
- quote handoff
- dentist verification
- provider-side branch
- analytics
- experiments
- ethical guardrails

### `17-METADATA-SCHEMA-OG-SPEC.md`

Include:

- title patterns
- H1 patterns
- meta-description patterns
- canonical rules
- Open Graph
- Twitter cards
- schema graphs
- image rules
- validation
- current-page before/after examples

## Implementation and QA files

### `18-BUILD-PHASES-AND-DEPENDENCIES.md`

Required phases:

1. repo and source audit
2. data reconciliation
3. style approval
4. shared component system
5. hub rebuild
6. individual plan template
7. Aetna and MetLife content completion
8. carrier hubs
9. treatment/timing pages
10. glossary branching
11. dentist/provider links
12. schema and metadata
13. sitemap/canonical/redirect rollout
14. accessibility/performance QA
15. analytics and experiment baseline

### `19-QA-ACCEPTANCE-SCORECARD.md`

Create pass/fail criteria for:

- data agreement
- crawlability
- server-rendered plan facts
- URL consistency
- metadata
- schema
- internal links
- accessibility
- mobile
- sticky navigation
- comparison UX
- performance
- conversion
- trust
- sources
- no broken routes
- no orphan pages
- no unsupported claims

### `20-DECISIONS-AND-OPEN-QUESTIONS.md`

Track:

- final decisions
- rejected options
- unresolved data issues
- user approvals needed
- dependencies
- risks
- owners

---

# Final starting document

After creating and reconciling the files above, create:

`docs/ppo-redesign/START-HERE-PPO-REDESIGN.md`

This must be the concise operational brief that starts implementation.

It must include:

1. One-paragraph product vision
2. Chosen or recommended style direction
3. Non-negotiable design rules
4. Canonical page hierarchy
5. Canonical data-source decision
6. First five build tasks
7. Files to edit
8. Files not to edit
9. Required dependencies
10. Acceptance gates
11. Rollback plan
12. SEO migration cautions
13. Data issues that block publication
14. What requires user approval
15. Exact next command/task for the implementation agent

The final line must state one of:

- `STATUS: READY TO IMPLEMENT`
- `STATUS: BLOCKED BY DATA RECONCILIATION`
- `STATUS: AWAITING STYLE APPROVAL`
- `STATUS: AWAITING URL/CANONICAL APPROVAL`

Do not falsely mark the project ready.

---

# Implementation guardrails

## Do not touch global systems without necessity

Do not redesign or rewrite:

- universal mega navigation
- global footer
- unrelated homepage systems
- unrelated dentist-directory templates
- global analytics
- global authentication

You may integrate with them, but changes must be minimal, documented, and necessary.

## Preserve existing equity

Before URL or page replacement:

- identify indexed URLs
- identify current canonicals
- identify inbound internal links
- identify redirect requirements
- preserve useful copy
- preserve existing unique content
- preserve event tracking
- preserve working plan logic
- preserve accessibility
- preserve visual assets that fit the approved system

## Server-rendering rule

The initial HTML must include:

- plan names
- carrier names
- plan links
- premiums with qualifiers
- annual maximums
- deductibles
- coverage tiers
- waiting periods
- effective-date language
- network names
- treatment-fit summaries
- source/review dates
- relevant internal links

JavaScript may enhance sorting, filtering, matching, pinning, and comparison. It must not be the only source of indexable plan facts.

## No-data-drift rule

The same canonical source must drive:

- Smart Match
- hub cards
- comparison table
- plan pages
- carrier hubs
- treatment pages
- schema
- snippets
- OG data where factual values appear

Add automated tests that fail the build when the same plan has conflicting values across surfaces.

---

# Expected final response after running this prompt

Do not return only a casual summary.

Report:

1. repository inspected
2. files read
3. 20 agent memos created
4. Markdown deliverables created
5. recommended style direction
6. major data conflicts
7. missing pages
8. proposed route architecture
9. approval required
10. link or file path to `START-HERE-PPO-REDESIGN.md`

Do not begin the visual rebuild until the alignment documents exist and the style status is explicit.
