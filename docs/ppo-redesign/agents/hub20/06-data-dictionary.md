# 06 — Data Dictionary Reconciliation (Hub20)

> Spec 01 (`presentation-specs/01-spec-data-dictionary.md`) reconciled against the live
> data island in `compare-ppo-dental-plans.html` (`<script id="plans-data">`, lines 1218–1229).
> ANALYZE/SPEC only. Premiums and maximums are FROZEN. No em-dashes.

---

## 1. Source of truth: the live island, not the spec example

The live island carries **8 plans** with richer real data than the spec's filled example.
The spec's example (Delta) is illustrative and several of its values do NOT match the live
frozen island. The live island is authoritative for every number; the spec is authoritative
for the **schema and field order**. The hub renders one object per plan, three surfaces
(card 02, matrix 03, detail 04).

Live plans, by key: `delta`, `uhc`, `aetna`, `ameritas`, `guardian`, `moo`, `humana`,
`metlife-ncd` (gathering-reviews).

---

## 2. Field-name reconciliation (spec key vs live island key)

| Spec field | Live island key | Status |
|---|---|---|
| `premiumFrom` | `monthly` | RENAME. Live stores raw number; spec wants "From $X/mo" render rule |
| `annualMax` | `annualMax` | MATCH |
| `annualMaxY2` | `annualMaxY2` | MATCH (only on `ameritas`) |
| `deductible` | `deductible` | MATCH |
| `deductibleFamily` | (absent) | MISSING on all 8 |
| `effectiveDate` | `activation` | RENAME. Same concept, different key |
| `network` | `network` | MATCH |
| `planShape` | (absent — `tier` exists) | MISSING. Live has `tier` (essentials/full/maximum), not planShape (preventive/basic/major) |
| `coverage.*` | `treatments.*` | RENAME of the whole block |
| `coverage.orthoChild/orthoAdult` | `treatments.orthoChild/orthoAdult` | MATCH (keys present, mostly null) |
| `coverage.whitening` | `treatments.whitening` | MATCH (Guardian = pct, Humana = allowance) |
| Coinsurance `pctY2` | `basicPctY2`/`majorPctY2`/`implantPctY2` (plan-level, not nested) | RESHAPE. Live stores Y2 as flat top-level keys, spec wants it inside the Coinsurance cell |
| Coinsurance `confidence` | (absent) | MISSING on every cell |
| `recommended` | `bestSelling` | RENAME-ish. Live allows multiple `bestSelling:true` (uhc + guardian); spec says max ONE `recommended` |
| `best-for` | `best` | RENAME |
| `secondary.ageCap` | `ageCap` (top-level) | PRESENT but at top level, not nested under `secondary` |
| `secondary.visionBundle` | `vision` + `bundle:[]` | PRESENT, top-level |
| `secondary.whiteningAllowance` | `treatments.whitening.allowance` (Humana=200) | PRESENT but nested in treatments, not secondary |
| `secondary.lifetimeOrthoMax` | (absent) | MISSING on all 8 |
| `secondary.missingToothClause` | (absent) | MISSING on all 8 |
| `secondary.graduatedBasic` | `basicPctY2` (ameritas=90) | PARTIAL, as flat key |
| `secondary.dependentDiscount` | `dependentDiscount` (humana=true) | PRESENT, top-level |
| `secondary.reimbursementBasis` | (absent) | MISSING on all 8 |
| `secondary.frequencyLimits` | (absent) | MISSING on all 8 |
| `governance.*` (confidence, lastReviewed, sources) | (absent in island) | MISSING. UI shows hardcoded "Verified Jun 2026" string (line 1439) |
| `status` | `status` | MATCH (live / gathering-reviews) |
| `statusNote` | `statusNote` | MATCH (metlife only) |
| `slug` / `key` / `carrier` / `name` | all present | MATCH |
| `url` | (absent — derived) | MISSING. No detail-page route stored |

---

## 3. Per-plan spec-field coverage (what the island already has)

For all 8 plans the island ALREADY provides: premium (`monthly`), annualMax (+Y2 where it
grows), deductible, activation/effectiveDate, network, best-for, status, and the full
treatments grid (preventive/basic/major/implant/orthoChild/orthoAdult/whitening as pct·wait
or allowance·wait). Year-2 step-ups exist where real (ameritas max + basic; moo major+implant;
humana major+implant; humana whitening allowance).

What is MISSING for the spec block + matrix across every plan:
- `planShape` (preventive/basic/major) — only `tier` exists, a different axis.
- `deductibleFamily`, `lifetimeOrthoMax`, `missingToothClause`, `reimbursementBasis`,
  `frequencyLimits` — not in the data at all.
- Per-cell `confidence` and plan-level `governance` (lastReviewed, sources[]).
- `url` (detail route) and single-`recommended` semantics.
- Y2 reshape: live keeps `basicPctY2`/`majorPctY2`/`implantPctY2` flat; spec wants `pctY2`
  inside each Coinsurance object.

---

## 4. Unified spec object — the one schema the hub renders from

One author, three surfaces. Superset of the spec's `PlanSpec` plus the live keys that are
load-bearing today. Adopt the spec's **names** as canonical; carry live values into them.

```ts
interface PlanSpec {
  // identity
  key: string; carrier: string; name: string; slug: string;
  url: string;                              // ADD: detail route (currently derived)
  planShape: 'preventive' | 'basic' | 'major';  // ADD: derive from coverage breadth
  tier: 'essentials' | 'full' | 'maximum'; // KEEP: drives hub grouping (live)
  status: 'live' | 'gathering-reviews';
  statusNote?: string;
  recommended?: boolean;                    // REPLACES bestSelling; enforce max ONE

  // headline specs (Section 1 order, FROZEN values)
  premiumFrom: number;                      // <- live `monthly`
  annualMax: number; annualMaxY2?: number;
  deductible: number; deductibleFamily?: number;  // family ADD
  effectiveDate: string;                    // <- live `activation`
  network: string;
  best: string;                             // best-for blurb (live `best`)

  // coverage grid (renamed from `treatments`)
  coverage: {
    preventive: Coinsurance;
    basic: Coinsurance;                      // may carry pctY2 (ameritas 90)
    major: Coinsurance | null;               // may carry pctY2 (moo/humana)
    implant: Coinsurance | null;             // may carry pctY2 (moo/humana)
    orthoChild: Coinsurance | null;
    orthoAdult: Coinsurance | null;
    whitening: Coinsurance | null;           // pct (guardian) OR allowance (humana)
  };

  // secondary (detail page + expanded card)
  secondary: {
    ageCap?: number;                         // <- live top-level ageCap (uhc 64)
    visionBundle?: boolean;                  // <- live vision/bundle
    whiteningAllowance?: number;             // mirror of coverage.whitening.allowance
    dependentDiscount?: boolean;             // <- live (humana)
    lifetimeOrthoMax?: number;               // ADD
    missingToothClause?: boolean | 'unknown';// ADD
    graduatedBasic?: string;                 // derive from basicPctY2
    reimbursementBasis?: 'MAC' | 'U&C' | 'fee-schedule'; // ADD
    frequencyLimits?: string;                // ADD
  };

  governance: {                              // ADD whole block
    confidence: 'verified'|'state-specific'|'needs-verification'|'gathering';
    lastReviewed: string;                    // replaces hardcoded "Verified Jun 2026"
    sources: SourceRef[];
  };
}

type Coinsurance = {
  pct: number | null;          // null = Not covered
  pctY2?: number;              // fold flat basicPctY2/majorPctY2/implantPctY2 in here
  wait: number;                // MONTHS, 0 = none
  allowance?: number;          // dollars/yr (whitening) — mutually exclusive with pct
  note?: string;
  confidence?: Confidence;     // optional per cell; default to governance.confidence
};
```

Migration is mechanical: `monthly→premiumFrom`, `activation→effectiveDate`,
`treatments→coverage`, fold `*PctY2` into `coverage.*.pctY2`, lift `ageCap/vision/
dependentDiscount` into `secondary`, collapse the two `bestSelling:true` into one
`recommended`, and add the four missing secondary fields + `governance` + `url`.

---

## 5. CONFLICTS — dictionary numbers vs the live FROZEN island (do NOT resolve by changing premiums)

The spec's filled Delta example (§4) conflicts with the live frozen Delta plan. Flagged,
not resolved. Live island wins on every number; spec example must be corrected, NOT the
island.

| Field | Spec §4 example (Delta) | Live FROZEN island (Delta) | Conflict |
|---|---|---|---|
| `premiumFrom` / monthly | **$75** | **$75** | none (matches) |
| `annualMax` | $2,000 | $2,000 | none |
| `deductible` | $50 | $50 | none |
| `effectiveDate` / activation | "1st of next month" | "1st or 15th of the month (your choice)" | WORDING CONFLICT |
| coverage cells | `confidence: needs-verification` | no confidence; UI stamps "Verified Jun 2026" | PROVENANCE CONFLICT — spec says needs-verification, live UI asserts verified |

Cross-island internal flags worth noting (not premium changes, just data-hygiene for the
unified object):
- `bestSelling` set true on BOTH `uhc` and `guardian` — violates spec "max ONE recommended."
- `metlife-ncd` premium is $100 in island AND the spec governance rule says it gets the one
  prominent "Under review" banner (status: gathering-reviews) — consistent, keep.
- Spec calls premium "always tag illustrative"; live UI renders "~$X/mo" (tilde) and
  "Verified Jun 2026" simultaneously — the illustrative tag is implied by the tilde but the
  "Verified" stamp contradicts the spec's "illustrative" requirement.

No premium or annual-maximum VALUE in the dictionary contradicts a frozen island value; the
only conflicts are the Delta effectiveDate wording and the verified-vs-needs-verification
provenance posture.

---

## 6. Render-surface notes (one author, three surfaces)

- **Card (02):** headline specs in Section-1 order from the unified object; `recommended`
  drives "Most popular"; one quiet `governance.lastReviewed` line, not per-cell pills.
- **Matrix (03):** live `CMP_ROWS` (lines 1509–1519) already pulls annualMax, activation,
  monthly, deductible, network, and each coverage cell from the same object — keep, just
  repoint to renamed keys.
- **Detail (04):** secondary block + source drawer expose ageCap, vision, whiteningAllowance,
  lifetimeOrthoMax, missingToothClause, reimbursementBasis, frequencyLimits, plus full
  `governance.sources[]`.
