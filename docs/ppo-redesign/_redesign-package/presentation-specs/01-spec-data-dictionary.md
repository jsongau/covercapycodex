# Spec data dictionary — the one schema every surface renders

> CoverCapy · PPO plan presentation system · File 01 of 05
> This is the **single source of truth**. The card (02), comparison table (03), and
> detail page (04) all render from this object. Author each plan once, here; never retype
> a number into a template.

---

## 1. Field order is fixed

Buyers scan plans by finding the same field in the same place every time. These are the
**headline specs**, in the exact order they must appear on every surface:

| # | Field key | Display label | Example value | Format rule |
|---|---|---|---|---|
| 1 | `premiumFrom` | Monthly premium | **From $30/mo** | Always prefix "From", always suffix "/mo", always tag *illustrative* |
| 2 | `annualMax` | Annual maximum | $1,000 | `$` + thousands separator; show Year-2 if it grows: `$2,000 → $3,500 (yr 2)` |
| 3 | `deductible` | Deductible | $50 / person | `$` + "/ person"; add "/ family" if known |
| 4 | `effectiveDate` | Coverage starts | Next business day | Verbatim short phrase |
| 5 | `coverage.preventive` | Preventive | 100% · no wait | `%` + "·" + wait |
| 6 | `coverage.basic` | Basic | 80% · 6-mo wait | same |
| 7 | `coverage.major` | Major | 50% · 12-mo wait | same; `Not covered` if null |
| 8 | `coverage.implant` | Implants | 50% · 12-mo wait | same; `Not covered` if null |
| 9 | `coverage.ortho` | Orthodontics | Child only · 50% | note adult/child; `Not covered` if null |
| 10 | `network` | Network | Delta Dental PPO | exact network name |
| 11 | `planShape` | Plan type | Major / Full | one of: Preventive · Basic · Major/Full |

Everything else (whitening, vision bundle, age cap, missing-tooth clause, lifetime ortho
max, graduated reimbursement, etc.) is a **secondary spec** — shown in the full spec
table on the detail page and in the expandable card, but **not** in the at-a-glance row.

---

## 2. Canonical labels & units (do not paraphrase)

Use these exact strings so the three surfaces stay consistent and buyers learn the
vocabulary once.

| Concept | Canonical label | Never write |
|---|---|---|
| Monthly cost | **Monthly premium** / "From $X/mo" | "price", "cost per month" |
| Yearly payout ceiling | **Annual maximum** | "cap", "yearly limit" (ok as subtitle) |
| Pay-first amount | **Deductible** | "excess" |
| Plan's share % | **Plan pays** (coinsurance) | "coverage", "discount" |
| Time before a category pays | **Waiting period** | "delay", "lockout" |
| When the policy begins | **Coverage starts** / Effective date | "activation" |
| Cleanings/exams/x-rays | **Preventive** | "checkups only" |
| Fillings/simple extractions | **Basic** | "minor" |
| Crowns/bridges/dentures | **Major** | "advanced" |
| In-network discounted-fee basis | **In-network (PPO) rate** | — |
| "Usual & customary" out-of-network basis | **Out-of-network (U&C)** | — |

**Coverage cell format:** `{percent}%` on top line, `{wait}` on second line.
- `100%` / `no wait`
- `50%` / `12-mo wait`
- `Not covered` (gray, italic) when the category is null — never blank, never "—" alone.

---

## 3. The data model

Extend the existing plan JSON (the `treatments` block already in each brief) into a
render-ready spec object. One object per plan; three renderers consume it.

```ts
type Coinsurance = {
  pct: number | null;          // 100, 80, 50… or null = not covered
  pctY2?: number;              // later-year rate if it improves
  wait: number;                // waiting period in MONTHS (0 = none)
  note?: string;               // "Child only", "$200/yr allowance", etc.
  confidence: Confidence;      // see below
};

type Confidence = 'verified' | 'state-specific' | 'needs-verification' | 'gathering';

interface PlanSpec {
  // identity
  key: string;                 // "delta", "uhc"…
  carrier: string;             // "Delta Dental"
  name: string;                // "PPO Premium"
  slug: string;                // "delta/ppo-premium"
  url: string;                 // detail page route
  planShape: 'preventive' | 'basic' | 'major';
  status: 'live' | 'gathering-reviews';
  recommended?: boolean;       // drives the "Most popular" treatment (max ONE per list)

  // headline specs (order = Section 1)
  premiumFrom: number;         // 30  → renders "From $30/mo"
  annualMax: number;           // 1000
  annualMaxY2?: number;        // 3500 if it grows
  deductible: number;          // 50
  deductibleFamily?: number;   // 150
  effectiveDate: string;       // "Next business day"
  network: string;             // "UnitedHealthcare Dental PPO"

  // coverage grid (the 100-80-50 + implants + ortho)
  coverage: {
    preventive: Coinsurance;
    basic: Coinsurance;
    major: Coinsurance | null;
    implant: Coinsurance | null;
    orthoChild: Coinsurance | null;
    orthoAdult: Coinsurance | null;
    whitening: Coinsurance | null;   // may be an allowance, see note
  };

  // secondary specs (detail page + expanded card)
  secondary: {
    ageCap?: number;                 // 64  → "Ages 64 and under"
    visionBundle?: boolean;
    whiteningAllowance?: number;     // 200 → "$200/yr"
    lifetimeOrthoMax?: number;       // ortho is usually a LIFETIME max, not annual
    missingToothClause?: boolean | 'unknown';
    graduatedBasic?: string;         // "80% yr1 → 90% yr2 → 100% after"
    frequencyLimits?: string;        // "2 cleanings/yr; 1 crown/tooth per 5 yrs"
    reimbursementBasis?: 'MAC' | 'U&C' | 'fee-schedule';
    dependentDiscount?: boolean;
  };

  // governance (kept OUT of the visual spec grid — see §5)
  governance: {
    confidence: Confidence;          // overall plan confidence
    lastReviewed: string;            // "2026-06-20"
    sources: SourceRef[];
  };
}

interface SourceRef {
  title: string; url: string; publisher: string;
  documentDate?: string; retrievedAt: string; jurisdiction?: string;
}
```

---

## 4. Filled example (Delta PPO Premium)

```json
{
  "key": "delta", "carrier": "Delta Dental", "name": "PPO Premium",
  "slug": "delta/ppo-premium", "url": "delta-ppo-premium.html",
  "planShape": "major", "status": "live", "recommended": false,
  "premiumFrom": 75, "annualMax": 2000, "deductible": 50,
  "effectiveDate": "1st of next month", "network": "Delta Dental PPO",
  "coverage": {
    "preventive": { "pct": 100, "wait": 0,  "confidence": "needs-verification" },
    "basic":      { "pct": 80,  "wait": 6,  "confidence": "needs-verification" },
    "major":      { "pct": 50,  "wait": 12, "confidence": "needs-verification" },
    "implant":    { "pct": 50,  "wait": 12, "confidence": "needs-verification" },
    "orthoChild": { "pct": 50,  "wait": 12, "confidence": "needs-verification" },
    "orthoAdult": { "pct": 50,  "wait": 12, "confidence": "needs-verification" },
    "whitening": null
  },
  "secondary": { "missingToothClause": "unknown", "lifetimeOrthoMax": null,
    "reimbursementBasis": "MAC" },
  "governance": { "confidence": "needs-verification", "lastReviewed": "2026-06-20",
    "sources": [ { "title": "Delta Dental — Individual & Family plans",
      "url": "https://www.deltadental.com/product/individual-and-family/",
      "publisher": "Delta Dental", "retrievedAt": "2026-06-20" } ] }
}
```

---

## 5. Where verification status goes (and where it does NOT)

The legal requirement is that facts are not represented as verified until matched to an
official document. That requirement is satisfied **without** stamping every cell:

- **DO** show **one** quiet plan-level line: `Last verified June 20, 2026 · illustrative ·
  view sources`. Color it muted; it sits under the spec block, not over it.
- **DO** keep per-field source metadata in the **source drawer** (File 04 §6), where a
  buyer who cares can expand it.
- **DON'T** put a "Needs verification" pill on every fact tile and every table cell. That
  is the single biggest reason the current pages read as noisy instead of clear.
- **EXCEPTION:** a plan with `status: "gathering-reviews"` (e.g. MetLife NCD Complete)
  *does* get one prominent plan-level "Under review — not recommended yet" banner, because
  there the status is the headline, not a footnote. Individual cells still stay quiet.

> Rule of thumb: **at most one** confidence indicator visible per plan in the scan view;
> full per-fact provenance lives one expand away.
