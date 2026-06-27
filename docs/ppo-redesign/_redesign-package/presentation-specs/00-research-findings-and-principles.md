# How buyers actually read dental plans — research findings & presentation principles

> CoverCapy · PPO plan presentation system · June 2026
> This file is the "why." Files 01–05 are the "how." Read this first.

---

## 1. The problem with the current format

The current plan pages bury the specifications inside prose paragraphs and scatter the
numbers across hero tiles, a coverage table, a timeline, and a calculator. A buyer who
just wants to answer *"what do I get, what does it cost, and how long do I wait"* has to
read the whole page to reconstruct it. On top of that, every single fact wears a
**"Needs verification"** badge, which turns the legally-cautious disclosure into visual
noise — the buyer can no longer tell the headline number from the footnote.

What real dental shoppers do, repeatedly observed across carrier sites, marketplaces, and
employer benefit guides, is **scan a fixed grid of specs** and compare the same fields in
the same place across plans. The winning format is a **spec sheet + a side-by-side
comparison matrix**, not an essay.

> **One-line fix:** lead with a dense, standardized spec block that every plan shares,
> show coverage as a clean **100 / 80 / 50**-style grid, and let buyers line plans up
> column-by-column. Move prose, disclaimers, and verification status *below* the specs.

---

## 2. What leading presentations have in common

Synthesized from carrier, marketplace, and employer-benefit comparison pages (sources at
the end):

### a. The same six "headline" specs, every time
Buyers expect to find these in a fixed order, and they expect them in the *same place* on
every plan:

1. **Monthly premium** (the price)
2. **Annual maximum** (the ceiling the plan pays — typically $1,000–$2,000)
3. **Deductible** (typically ~$50/person, $150/family)
4. **Coverage split** — the **100 / 80 / 50** for Preventive / Basic / Major
5. **Waiting periods** (none for preventive; ~6–12 months for basic/major)
6. **Network** (PPO network name + "any dentist, less in-network")

### b. The "100-80-50" mental model is universal
Nearly every consumer dental plan is explained as: **Preventive 100% · Basic 80% ·
Major 50%**, paid after the deductible, up to the annual maximum. Buyers already think in
this triplet — present coverage that way and the page becomes instantly legible. Add
Implants / Orthodontics as two extra rows because they're the high-stakes "does it cover
my thing" questions.

### c. Three plan "shapes" buyers self-sort into
Marketplaces consistently frame plans as one of three shapes. Label each plan with its
shape so a buyer can filter in one glance:

| Shape | Premium | Best for |
|---|---|---|
| **Preventive / Maintenance** | Low | Cleanings & exams only |
| **Basic** | Moderate | Preventive + fillings/extractions |
| **Major / Full coverage** | High | Crowns, implants, dentures, ortho |

### d. The employer-benefit matrix is the gold standard for *detail*
The clearest spec presentations (e.g. university open-enrollment charts) use a
**row = spec, column = plan** matrix where each cell shows the *deductible + reimbursement
% + basis*. They also surface the things buyers miss: graduated reimbursement (e.g. basic
pays 80% year 1 → 90% year 2 → 100% after), **lifetime** orthodontia maximums (separate
from the annual max), late-entrant provisions, and whether reimbursement is based on the
in-network contracted fee (MAC) vs. "usual & customary" (U&C).

### e. The pricing-card UX rules from SaaS apply directly
- **3–4 plan columns max** side by side; more than that, switch to a filterable list.
- **Premium is the first thing the eye lands on** — large, bold, distinct color.
- **One "Most popular" / recommended tier** gets an elevated, color-headed card.
- **Lead with the 5–7 decision-relevant specs; collapse the long tail** behind "view
  full details."
- A **sticky compare bar** lets buyers pin 2–3 plans and diff them.

---

## 3. CoverCapy presentation principles (the rules files 01–05 enforce)

1. **Specs before prose.** The standardized spec block is the first thing below the H1.
   Explanation, scenarios, and disclaimers come after.
2. **Every plan shares one schema.** Same fields, same labels, same order, same units —
   even when a value is "Not covered." Consistency is what makes scanning possible.
   (File 01 is the single source of truth for fields.)
3. **Coverage is a grid, not a sentence.** Preventive / Basic / Major / Implants /
   Orthodontics as rows; % and waiting period as columns. Never describe a percentage in a
   paragraph when it belongs in the grid.
4. **Differences are highlighted, not hunted.** In comparison view, visually mark where
   plans differ (the best value in a row, the "not covered" cells).
5. **Price is honest but present.** Show an illustrative "from $X/mo" prominently with a
   clear *illustrative / ZIP-gated* qualifier — don't hide the number the buyer came for.
6. **Verification status is metadata, not a billboard.** Use one small, quiet confidence
   indicator per plan (or per fact only in the source drawer) — never a loud badge on
   every cell. A single "Last verified · view sources" line carries the legal weight
   without shouting over the specs.
7. **Progressive disclosure.** Headline specs at a glance → full spec table on expand →
   official document in the source drawer.
8. **Same data drives card, table, and detail page.** Author the spec object once
   (File 01); render it three ways (Files 02–04). No retyping numbers per surface.

---

## 4. How this maps to the files in this folder

| File | Surface | Purpose |
|---|---|---|
| `01-spec-data-dictionary.md` | — | The canonical field list & data model every surface renders |
| `02-plan-card-spec.md` | Plan card | The scannable at-a-glance unit (in lists/grids) |
| `03-comparison-table-spec.md` | Comparison matrix | Side-by-side, row=spec, column=plan |
| `04-plan-detail-spec.md` | Detail page | The full spec sheet for one plan (specs first) |
| `05-component-and-content-checklist.md` | All | Microcopy, a11y, do/don't, acceptance criteria |

---

## 5. Sources

- [HealthPartners — How to compare dental insurance plans](https://www.healthpartners.com/insurance/dental-plans/compare-dental-insurance/) — terminology (premium, deductible, coinsurance, copay, waiting period, annual maximum) and the three plan categories.
- [Duke HR — Dental Care Plans Comparison Chart (2026)](https://hr.duke.edu/benefits/medical/dental/plan-comparison/) — gold-standard row=spec / column=plan matrix; graduated reimbursement, lifetime ortho max, MAC vs U&C, late-entrant provision.
- [eHealth — How does dental insurance work / dental coverage explained](https://www.ehealthinsurance.com/resources/dental-insurance/dental-coverage-explained) — typical deductible ($50/$150), annual maximum ($1,000–$2,000), 100-80-50 coinsurance, waiting periods.
- [Cigna — How does dental insurance work / Full coverage dental insurance](https://www.cigna.com/knowledge-center/how-does-dental-insurance-work) — service-class definitions and full-coverage framing.
- [Bennie — Comparing Preventive vs Basic vs Major dental services](https://www.bennie.com/blog/comparing-preventive-vs-basic-vs-major-dental-services) — service classification buyers expect.
- [Money — 5 Best Dental Insurance Plans of June 2026](https://money.com/best-dental-insurance/) — marketplace "best plans" at-a-glance presentation.
- [Smart Interface Design Patterns — Pricing Plans UX](https://smart-interface-design-patterns.com/articles/pricing-plans/) and [UInkits — Pricing cards in UI design](https://www.uinkits.com/blog-post/what-are-pricing-cards-in-ui-design-and-how-to-use-them) — card layout, premium prominence, recommended tier, lead-then-collapse, sticky compare.
