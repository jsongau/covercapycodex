# Agent 18 — Knowledge-Graph & Semantic-Content Model

> CoverCapy PPO hub redesign · Knowledge-graph memo
> Saved as `agents/19-knowledge-graph.md` (per orchestrator filename); content is the Agent-18 deliverable.
> Last reviewed 2026-06-21. Source inputs: `00-MASTER-PROMPT.md`, `plan-data/*.md` (8 briefs +
> `PLAN-DATA-RECONCILIATION.md`), `assets/ppo/glossary.json`, `presentation-specs/01-spec-data-dictionary.md`.

---

## 0. Purpose and the founder's lens

The founder's fear is "too basic / worse than current." The honest finding is the **opposite of basic**:
the existing `.md` briefs and the spec data dictionary already model plans more richly than almost any
competitor PPO site — graduated reimbursement (`pctY2`), sub-limits (Humana implant $2,000/yr + $4,000
lifetime), bundle benefits (vision/hearing copay tables), state carve-outs (Humana hearing not in NY;
contact-lens fit excluded in AZ/GA/MD/NC/TX), one-time lifetime deductibles (MetLife $100), and per-fact
confidence. **The redesign's risk is not under-modeling — it is data drift and loss of nuance** when 8 deep
briefs collapse into one render object across ~30 surfaces.

This memo does two jobs:

1. **Protect what exists** — enumerate the rich relationships already captured that a "clean" rebuild
   tends to flatten and lose.
2. **Add the missing layer** — a formal entity graph that turns those facts into the internal-link spine
   and a single canonical `PLANS` object, so every surface (hub cards, compare matrix, spoke pages, carrier
   hubs, treatment pages, timing pages, glossary, schema, OG) renders from one source — the "no-data-drift" backbone.

---

## 1. What must NOT be lost (richness inventory)

These are real, load-bearing relationships already present in the briefs/dictionary. Each must survive as a
**typed field or edge**, not as prose that gets summarized away.

| # | Rich relationship already modeled | Where it lives today | Loss risk if flattened |
|---|---|---|---|
| R1 | **Graduated reimbursement over tenure** (Y1→Y2→Y3+): MoO 20%→50%, Humana 50%→60%, MetLife major ~10%→35%→60% | brief coinsurance tables; dictionary `pct` + `pctY2` | A single "Major 50%" number misrepresents 3 plans and *overstates* MetLife by ~5x in Y1 |
| R2 | **"No waiting period" ≠ "full coverage day one"** (MetLife, MoO use graduated benefit instead of a wait) | brief narrative; glossary `waiting-period` vs `day-one` | Buyers told "no wait" expect full pay; this is the single most important honesty edge |
| R3 | **Effective date ≠ waiting period** (Humana 6-day activation; "1st of next month"; "next business day") | dictionary field 4; every brief | Urgent-treatment journeys break; founder's "see a dentist tomorrow" claim must not attach to a 6-day plan |
| R4 | **Sub-limits inside the annual max** (Humana implant $2,000/yr, $4,000 lifetime; MetLife implant $3,000/yr; Humana whitening $200/yr *outside* the max) | brief tables | "$5,000 max" reads as $5,000 for implants — false |
| R5 | **Bundled cross-vertical benefits** (Humana dental+vision+hearing on one premium, with copay schedules) | Humana brief | Treating it as dental-only erases its unique position |
| R6 | **State variability** as first-class, not a footnote (Humana not in AK/HI/NV/NM/WA; hearing not NY; Delta whitening state-specific; premiums by state/age/ZIP) | reconciliation; briefs | A single national number = a compliance and trust failure |
| R7 | **Confidence per fact** (`verified` / `state-specific` / `needs-doc` / `gathering`) | reconciliation; dictionary `Confidence` | "No-data-drift" is impossible without provenance; and MetLife must stay `noindex` |
| R8 | **`recommended` is scarce** (max ONE per list) and **`status: gathering-reviews`** gates indexing | dictionary §3, §5 | Recommending MetLife would be dishonest; the gate must be an entity property |
| R9 | **Prior-coverage waiver** edges (waives basic/major waits; usually NOT implant) | Aetna, Humana briefs | A real decision lever for switchers, easily dropped |
| R10 | **Plan shape / family tiers** (Aetna Preventive→Core→Preferred; MetLife Complete vs Elite; Humana Extend series) | briefs | Carrier hubs need the sibling-tier graph or they become thin logo pages |
| R11 | **Missing-tooth clause + LEAT/MAC vs U&C reimbursement basis** | briefs; dictionary `secondary.reimbursementBasis` | These determine the *actual* bill; glossary terms exist but need plan edges |
| R12 | **Comparative framing** ("fastest to major," "highest Y1 major," "lowest Y1 major," "largest network") | brief verdicts | This is the editorial differentiator vs. carrier clones — model as `bestFor`/`weakFor`/`differentiator` tags, not free text |

**Rule:** every row above maps to a typed field in §5. If it cannot be expressed as a field or an edge, it
is not allowed to be the *only* place a fact lives.

---

## 2. The entity graph (nodes)

Twelve core entity types. Each has a stable `id` (the slug), a type, and a small set of properties; all the
heavy numeric facts hang off the **Plan** node so there is exactly one place a number is authored.

| Entity | id pattern | Key properties | Cardinality |
|---|---|---|---|
| **Carrier** | `carrier:{key}` (`delta`, `uhc`, `aetna`…) | display name, AM Best, parent, history, official URL | 8 |
| **Plan** | `plan:{carrier}/{plan-slug}` (`plan:delta/ppo-premium`) | the full `PlanSpec` (§5) — the data nucleus | 8 (→ grows) |
| **PlanTier / family sibling** | `tier:{carrier}/{tier}` | shape, whether on-shelf | edges to Carrier + Plan |
| **Network** | `network:{slug}` (`network:delta-dental-ppo`, `network:metlife-pdp-plus`) | exact name, size, lookup URL | ~8 |
| **CoverageCategory** | `cat:{slug}` (`cat:preventive`, `cat:basic`, `cat:major`, `cat:implant`, `cat:ortho-child`, `cat:ortho-adult`, `cat:whitening`, `cat:vision`, `cat:hearing`) | canonical label, glossary ref | fixed set |
| **Treatment** | `tx:{slug}` (`tx:implants`, `tx:crowns`, `tx:root-canals`, `tx:dentures`, `tx:orthodontics`, `tx:whitening`, `tx:preventive`) | maps to CoverageCategory + CDT range | fixed set |
| **CDTCode** | `cdt:{code}` (`cdt:D6010`) | descriptor, treatment ref | lazy/optional (see §6) |
| **GlossaryTerm** | `term:{slug}` (matches `glossary.json` keys) | short tooltip, full-guide URL | 18 today |
| **TimingConcept** | `timing:{slug}` (`timing:no-waiting-period`, `timing:starts-today`, `timing:calendar-year-reset`, `timing:effective-date`) | intent, dedupe owner | small |
| **State / Jurisdiction** | `state:{abbr}` (`state:CA`) | name | 50 + DC |
| **CostScenario** | `cost:{slug}` (`cost:crown-year-1`) | treatment, illustrative fee, computed per-plan out-of-pocket | per treatment |
| **Location / Dentist** | `dentist:{supabase-id}` | from Supabase `dentists` (name, city, networks[], slug) | 5,776 (existing) |

Supporting nodes that are properties-with-provenance rather than full entities: **WaitingPeriod, AnnualMaximum,
Deductible, EffectiveDate, Coinsurance, Exclusion, SubLimit, ConfidenceTag, Source.** They live *inside* the
Plan node (§5) so a number is never re-typed — but each carries its own `confidence` and `source` so the graph
stays auditable at the fact level.

---

## 3. The relationship types (edges)

This edge list IS the internal-link graph and the schema-entity graph. Anchor-text pattern in brackets.

**Carrier / plan spine**
- `Carrier —OFFERS→ Plan` ["{Carrier} {Plan}"]
- `Plan —IS_TIER_OF→ Carrier` / `Plan —SIBLING_TIER→ Plan` ["compare {Plan} vs {sibling}"]
- `Plan —USES_NETWORK→ Network` ["in-network ({Network})"]
- `Network —OPERATED_BY→ Carrier`

**Coverage / treatment**
- `Plan —COVERS→ CoverageCategory` with edge props `{pct, pctY2, wait, note, confidence}` (the grid cell)
- `CoverageCategory —GLOSSED_BY→ GlossaryTerm`
- `Treatment —FALLS_UNDER→ CoverageCategory` (crowns→major; implants→implant; cleanings→preventive)
- `Treatment —MAPS_TO→ CDTCode` (optional, §6)
- `Plan —EXCLUDES→ Treatment` (Aetna/Humana exclude ortho; Aetna excludes implants) ["{Treatment} not covered"]
- `Plan —SUBLIMITS→ Treatment` with `{annual, lifetime}` (Humana/MetLife implants)
- `Plan —BUNDLES→ CoverageCategory` (Humana vision, hearing)

**Timing**
- `Plan —HAS_EFFECTIVE_DATE→ EffectiveDate`  (distinct edge from waits — enforces R3)
- `Plan —HAS_WAIT→ CoverageCategory {months}`
- `Plan —WAIVES_WAIT_IF→ PriorCoverage` (R9)
- `Plan —RESETS_ON→ TimingConcept` (calendar-year vs plan-year)
- `TimingConcept —OWNS_INTENT→ {no-wait | starts-today | immediate}` (one owner per intent → anti-cannibalization)

**Geography**
- `Plan —AVAILABLE_IN / NOT_IN→ State` (Humana NOT_IN AK,HI,NV,NM,WA)
- `Plan —VARIES_BY→ State` for premium/whitening/effective-date (`confidence: state-specific`)
- `Dentist —LOCATED_IN→ State`; `Dentist —ACCEPTS→ Network` (NOT the same as in-network → keep `accepts` vs `in-network` as distinct edge labels, per master prompt + glossary)

**Editorial / decision**
- `Plan —BEST_FOR / WEAK_FOR→ Persona|Treatment|Timing` (drives treatment/timing/life-situation page inclusion)
- `Plan —DIFFERENTIATOR→ {text}` (one per plan)
- `Plan —COMPARE_WITH→ Plan` (the "alternatives" rail — must be reciprocal/validated)
- `Plan —SCORED_BY→ CoverCapyScore` (component breakdown)

**Cost**
- `CostScenario —FOR_TREATMENT→ Treatment`; `CostScenario —COMPUTED_FROM→ Plan` (out-of-pocket derived from `pct`, `deductible`, `annualMax`, sub-limits — never hand-typed)

**Provenance (the no-drift guarantee)**
- `(any fact) —SOURCED_FROM→ Source {title,url,publisher,date,retrievedAt,jurisdiction}`
- `(any fact) —HAS_CONFIDENCE→ ConfidenceTag`
- `Plan —GATES_INDEXING→ status` (`gathering-reviews` ⇒ `noindex`, e.g. MetLife)

---

## 4. How the graph drives internal linking (orphan prevention)

Each page type derives required links **mechanically** from edges — no hand-maintained link lists, so nothing
goes orphan and nothing drifts:

| Page | Required outbound (auto-derived from edges) |
|---|---|
| **Plan spoke** | its Carrier (IS_TIER_OF) · its Network (USES_NETWORK) · each covered Treatment (COVERS→FALLS_UNDER) · glossary terms for every category shown (GLOSSED_BY) · COMPARE_WITH plans · sibling tiers · timing page for its effective-date/wait profile · dentist search filtered to its Network |
| **Carrier hub** | every OFFERS plan · the Network · sibling-tier matrix · BEST_FOR treatments aggregated across its plans |
| **Treatment page** | every Plan where `COVERS(tx.category).pct != null` ranked by pct/wait · the CoverageCategory glossary term · CostScenario · plans that EXCLUDE it (honest "not covered here") · dentist search |
| **Timing page** | plans whose EffectiveDate/wait/reset match the OWNS_INTENT owner · glossary `waiting-period`/`effective-date`/`day-one` |
| **Glossary term** | plans where the term is decision-relevant (e.g. `missing-tooth` → plans with the clause; `annual-maximum` → high-max plans) · related terms · related treatment |
| **Hub** | ItemList of all plans · top treatment/timing/carrier entries · glossary preview |

Validation: a build test walks the graph and **fails if** (a) a Plan has no inbound link from its Carrier hub,
(b) a glossary term referenced in a coverage cell has no GLOSSED_BY edge, (c) a `COMPARE_WITH` is non-reciprocal,
or (d) any rendered number lacks a `SOURCED_FROM` + `HAS_CONFIDENCE`.

---

## 5. The ONE canonical `PLANS` object (the no-drift nucleus)

Adopt the dictionary's `PlanSpec` verbatim and **extend it** with the relationship + nuance fields §1 proved
must survive. Author once; every surface renders from this. Additions to the dictionary are marked `+`.

```ts
interface PlanSpec {
  // identity
  key; carrier; carrierKey; name; slug; url;
  planShape: 'preventive'|'basic'|'major';
  status: 'live'|'gathering-reviews';
  recommended?: boolean;                 // max ONE per rendered list
  network: { name: string; key: string; size?: string; lookupUrl?: string }; // +structured

  // headline specs (fixed order — dictionary §1)
  premiumFrom: number; premiumRange?: [number,number];   // + range, because every premium is illustrative
  annualMax: number; annualMaxY2?: number;
  deductible: number; deductibleFamily?: number;
  deductibleType?: 'annual'|'lifetime-one-time';         // + MetLife
  effectiveDate: string;                                  // SEPARATE from waits (R3)

  // coverage grid — each cell is an edge with its own provenance
  coverage: {
    preventive; basic; major; implant;
    orthoChild; orthoAdult; whitening;
    vision?; hearing?;                                    // + bundle categories (R5)
  }; // each = { pct|null, pctY2?, pctY3?, wait /*months*/, note?, confidence }

  // sub-limits & bundles that sit INSIDE the annual max (R4)
  subLimits?: { treatment; annual?; lifetime?; countsAgainstMax: boolean }[];

  // secondary (detail/expanded)
  secondary: { ageCap?; visionBundle?; hearingBundle?; whiteningAllowance?;
    lifetimeOrthoMax?; missingToothClause?: boolean|'unknown';
    graduatedBasic?; graduatedMajor?; frequencyLimits?;
    reimbursementBasis?: 'MAC'|'U&C'|'fee-schedule';
    priorCoverageWaiver?: { waivesBasic; waivesMajor; waivesImplant } }; // +R9

  // geography (R6) — first-class, never a footnote
  availability: { notAvailable: string[];                // ["AK","HI","NV","NM","WA"]
    benefitCarveOuts?: { benefit; excludedStates: string[] }[]; // hearing not NY, etc.
    variesByState: ('premium'|'whitening'|'effectiveDate')[] };

  // editorial decision layer (R12) — tags, not prose
  editorial: { bestFor: string[]; weakFor: string[]; differentiator: string;
    compareWith: string[]; scoreComponents?: Record<string,number> };

  // governance / provenance (R7,R8)
  governance: { confidence: Confidence; lastReviewed: string;
    indexable: boolean;                                   // + false when gathering-reviews
    sources: SourceRef[] };
}
```

**Hard rules tied to the data dictionary:**
- A number appears **once** here; renderers read it. No template literal ever contains a hard-coded premium/max/pct.
- Every premium renders with the `illustrative` qualifier + the dictionary's single quiet `Last verified …` line
  (dictionary §5) — not a pill on every cell.
- `status:'gathering-reviews'` ⇒ `governance.indexable=false` ⇒ MetLife stays `noindex`; gets the one prominent
  "Under review" banner, cells stay quiet.
- Coverage cells render via the dictionary's exact format (`100% / no wait`; `Not covered` gray-italic, never blank).

---

## 6. CDT codes — model lightly, do not over-build

CDT codes belong in the graph as `Treatment —MAPS_TO→ CDTCode` edges, but **do not author 700+ code pages**
(master prompt forbids thin programmatic pages). Recommendation: store a *small curated map* of the codes buyers
actually search (D6010 implant, D2740 crown, D3310 root canal, D5110 denture, D8080 ortho, D1110 prophy) attached
to the 6 treatment entities, used for entity clarity / schema `about` and AI answerability — **not** as standalone URLs.

---

## 7. Migration path (today → graph)

1. Treat `PLAN-DATA-RECONCILIATION.md` as the **authoring source** (it already wins all conflicts).
2. Transcribe each of the 8 briefs into one `PlanSpec` JSON, carrying every R1–R12 field. The reconciliation
   `needs-doc` items (Ameritas Y2 max, Guardian major %/whitening, Aetna full verify) become
   `confidence:'needs-doc'` and **block their own cell from publishing**, not the whole plan.
3. Generate carrier/network/treatment/glossary/timing nodes by scanning the 8 specs (no separate authoring).
4. Wire edges; run the §4 validator as a build gate.
5. Point every renderer (Smart Match, hub cards, compare matrix, spokes, carrier hubs, treatment/timing pages,
   JSON-LD, OG) at the same objects. Add the contradiction test from the master prompt (`build fails if same plan
   has conflicting values across surfaces`).

---

## 8. Risks

- **Bundle + sub-limit flattening** is the highest-value, easiest-to-lose nuance — guard with explicit fields (done in §5).
- **State data** must render as range + "we verify before you enrol," never a single national number.
- **CDT over-modeling** would create thin pages and dilute the very richness this graph protects — kept curated.
- **`compareWith` drift** — enforce reciprocity in validation or the alternatives rail lies.

---

## 9. Acceptance criteria

1. One `PlanSpec` object per plan; zero hard-coded plan numbers in any template.
2. Every R1–R12 relationship is a typed field/edge, present for all 8 plans (or explicitly `null` + reason).
3. Build validator passes: no orphan plan, every coverage-cell glossary ref resolves, `compareWith` reciprocal,
   every rendered fact has confidence + source.
4. MetLife `gathering-reviews` ⇒ `noindex` enforced by `governance.indexable`.
5. Effective date and waiting period are separately modeled and separately rendered on every plan/timing surface.
6. Internal links on every page type are derived from edges, not hand-listed.

---

## Summary, score, recommendations

**Summary (~150 words).** CoverCapy's existing 8 briefs and spec dictionary already model PPO plans more richly
than typical competitors — graduated reimbursement, implant sub-limits, vision/hearing bundles, one-time
deductibles, state carve-outs, and per-fact confidence. The real danger in the redesign is not "too basic"; it is
**data drift and nuance loss** when those briefs render across ~30 surfaces. This memo formalizes a 12-entity
graph (Carrier, Plan, Network, CoverageCategory, Treatment, CDT, Glossary, Timing, State, CostScenario, Dentist,
Tier) with explicit edge types that double as the internal-link spine and schema-entity graph. It pins one
canonical `PLANS` object — the dictionary's `PlanSpec`, extended with structured network, sub-limits, bundles,
geography, editorial tags, prior-coverage waivers, and provenance — so a number is authored once and rendered
everywhere. Critical edges (effective-date ≠ wait, "no wait" ≠ full coverage, sub-limit ≠ annual max,
`accepts` ≠ in-network) preserve honesty and prevent the founder's worst case.

**Score: 8 / 10** — the data model is strong and largely already exists; the missing piece is purely formalizing
relationships and the validator. Points held back only because CDT/cost edges and reciprocal `compareWith`
validation are still proposals, and Aetna/Guardian/Ameritas have unresolved `needs-doc` facts.

**Top 3 recommendations**
1. **Adopt one extended `PlanSpec` as the only authoring surface** (reconciliation file → JSON), with structured
   `network`, `subLimits`, `availability`, `editorial`, and `governance.indexable`. No hard-coded numbers in templates.
2. **Ship the edge-driven link/validation layer**: derive every page's internal links from graph edges and add a
   build gate that fails on orphan plans, unresolved glossary refs, non-reciprocal `compareWith`, or any rendered
   fact missing confidence + source.
3. **Protect the four honesty edges as distinct fields** — effective-date vs waiting-period, graduated vs
   day-one coverage, sub-limit vs annual max, and `accepts` vs in-network — and keep CDT codes curated (no thin pages).
