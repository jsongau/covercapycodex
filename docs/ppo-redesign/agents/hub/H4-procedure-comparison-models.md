# H4 — Per-Procedure Comparison Models

> The CORE module of every carrier plan page. Each plan page is a bespoke analysis,
> not a template. Its engine is a set of per-procedure comparison models that rank
> the 8 plans against each other with real numbers and the "why," cross-linking to
> rival plan pages and the matching treatment guide. The main hub `#treatment` /
> `#shelf` browse reuses the same source — one data model, no drift.
>
> Data authority: `plan-data/PLAN-DATA-RECONCILIATION.md` is the source of truth.
> Premiums are FROZEN at the live `plans-data` values. T5 jade design language.
> Output must never rank worse than the existing ZIP/feature comparison.

---

## 1. THE CANONICAL DATA MODEL

One structure, authored once, rendered on both the plan page and the treatment page.
It extends the existing `plans-data` JSON `treatments` object (already live in
`compare-ppo-dental-plans.html`) — we do NOT invent a parallel store. Every cell
carries a confidence tag from the reconciliation model (`verified` /
`state-specific` / `needs-doc`).

### 1.1 Procedure axis (8 procedures)

| id | Label | Maps to coverage class | Cash benchmark (national PPO avg) |
|----|-------|------------------------|-----------------------------------|
| `implant` | Implants | Major (often sub-capped) | $4,500 |
| `major` (crown) | Crowns | Major | $1,800 |
| `major` (rct) | Root canals | Major | $1,400 |
| `major` (denture) | Dentures | Major | $1,800 |
| `orthoChild` / `orthoAdult` | Braces / ortho | Ortho (separate benefit) | $5,500 child / $7,000 adult |
| `whitening` | Whitening | Cosmetic (allowance or %) | $900 |
| `preventive` | Preventive | Preventive | $320 |
| `basic` | Basic fillings | Basic | $480 |

> Crowns, root canals, and dentures all draw on the same `major` coinsurance cell in
> the live model. The plan page renders them as three procedure cards that all read
> from `treatments.major` but carry their own benchmark + caveat copy (e.g. dentures
> trip the missing-tooth clause; root canals rarely do). No data is duplicated.

### 1.2 The per-procedure cell (canonical shape)

For procedure `X` and plan `P`, one cell:

```jsonc
{
  "plan": "ameritas",
  "procedure": "implant",
  "covered": true,                 // false => DQ from this procedure's ranking
  "pctY1": 20,                     // Year-1 in-network coinsurance %
  "pctY2": 50,                     // Year-2+ step-up (null if flat)
  "wait": 0,                       // months until covered (0 = day one)
  "annualMax": 3000,               // plan annual cap that applies (Y2 here)
  "procedureCap": null,            // separate sub-limit if one exists
  "procedureCapType": null,        // "annual" | "lifetime" | null
  "missingToothRisk": true,        // exclusion can block pre-existing cases
  "caveats": ["state docs may list 6-12 mo implant wait"],
  "confidence": "state-specific",  // verified | state-specific | needs-doc
  "rank": null,                    // DERIVED — never authored
  "rankReason": null               // DERIVED — the one-line "why"
}
```

Authored fields come straight from RECONCILIATION + the brief. `rank` and
`rankReason` are computed, never hand-set — that guarantees the plan page and the
treatment page show the identical ordering.

### 1.3 Confidence rendering rule (inherited from reconciliation)

- `verified` → state the number plainly.
- `state-specific` → render a range + "varies by state, we verify before you enrol."
  Never a single hard number.
- `needs-doc` → show as "under review" / flagged cell; do not assert a number until
  the official SOB/product guide is pulled. Drives the `noindex` decision on the
  plan page (see MetLife).

---

## 2. RANKING LOGIC (per procedure)

Each procedure has its own scoring function because what "good" means differs by
procedure. All functions return a 0-100 score; ties break on premium (lower wins),
then network size. The score is converted to ordinal `rank` and a `rankReason`
string. These extend the existing `bestForGoal()` switch in the live file
(lines ~1484-1487) rather than replacing it.

### 2.1 Shared scoring primitives

- `access = (wait === 0) ? 1 : 0` — binary day-one access flag.
- `waitPenalty = wait * k_wait` — months hurt; `k_wait` is procedure-specific.
- `valueY1 = pctY1` and `valueY2 = pctY2 ?? pctY1`.
- `effectiveCap = procedureCap ?? annualMax` — what the plan can actually pay.
- DQ if `covered === false` → plan is listed as "Not covered here" and excluded
  from the ranked list (shown below the rail, not ranked 8th).

### 2.2 Per-procedure weightings

| Procedure | Rewards (high weight) | Penalises | Rationale |
|-----------|----------------------|-----------|-----------|
| **Implants** | day-one access (wait=0), low/no wait, NO separate implant cap, high effective cap | separate lifetime implant sub-cap, 12-mo wait, missing-tooth risk | Implants are slow, multi-phase, expensive. Starting now + a cap big enough to actually pay matters more than a high Y1 %. A separate $1,000-$1,500 implant lifetime cap is a real ceiling. |
| **Crowns / RCT / Dentures (major)** | Y1 % (you usually need it sooner), short wait, high cap | long wait, low Y1 % | Major work is often semi-urgent. Reward who pays the most in Year 1 after the shortest wait. Dentures additionally penalised on missing-tooth risk. |
| **Braces / ortho** | covers ADULT ortho at all (rare), then child; reasonable lifetime ortho max | adult not covered, very low ortho lifetime cap | The decisive question is WHO is covered (adult vs child), not the %. Most plans cover neither. |
| **Whitening** | covered at all; $ allowance that does NOT hit the annual max; low wait | not covered, allowance counts against cap | Cosmetic — presence + a separate budget line is the whole story. |
| **Preventive** | 100% day one (table stakes) → tiebreak on premium | n/a | Everyone is 100%/day-one; lowest premium wins. |
| **Basic fillings** | high Y1 % + day-one access | wait, low Y1 % | Most-used class; reward immediate high reimbursement. |

`k_wait`: implants 5, major 5, braces 2 (everyone waits anyway), basic 7 (urgency),
whitening 1. (Matches the live `bestForGoal` weighting: major/implant use `wait*5`.)

### 2.3 Score formula (reference implementation)

```js
function procScore(cell, proc){
  if(!cell.covered) return null;                       // DQ
  const kWait = {implant:5,major:5,basic:7,braces:2,whitening:1,preventive:0}[proc]||5;
  let s = 0;
  // value: weight Y1 for major/basic, Y2 for implant (multi-year reality)
  const v = (proc==='implant') ? (cell.pctY1*0.5 + (cell.pctY2||cell.pctY1)*0.5)
                               : cell.pctY1;
  s += v * 0.5;                                         // up to 50
  s += (cell.wait===0 ? 22 : 0);                        // day-one bonus
  s -= cell.wait * kWait;                               // wait penalty
  s += Math.min(effectiveCap(cell)/5000,1) * 18;        // cap headroom up to 18
  if(proc==='implant' && cell.procedureCapType==='lifetime') s -= 12; // hard ceiling
  if((proc==='major'||proc==='implant') && cell.missingToothRisk) s -= 4;
  if(proc==='braces'){ s = orthoScore(cell); }          // special — see 2.4
  if(proc==='whitening'){ s = whiteningScore(cell); }   // special — see 2.5
  return Math.max(0, Math.round(s));
}
function effectiveCap(c){ return c.procedureCap ?? c.annualMax; }
```

### 2.4 Braces special case (`orthoScore`)

```js
function orthoScore(cell){
  if(!cell.adultCovered && !cell.childCovered) return null; // DQ — not covered
  let s = 30;
  if(cell.adultCovered) s += 40;        // covering adults is the rare, decisive win
  if(cell.childCovered) s += 20;
  s += (cell.orthoLifetimeMax||0)/100;  // $1,500 max => +15
  s -= cell.wait * 2;                   // everyone waits ~12 mo; small penalty
  return Math.round(s);
}
```

### 2.5 Whitening special case (`whiteningScore`)

```js
function whiteningScore(cell){
  if(!cell.covered) return null;
  let s = 30;
  if(cell.allowance){ s += 30; if(cell.allowanceOffMax) s += 15; } // separate budget
  else if(cell.pct){ s += cell.pct*0.4; }
  s -= cell.wait;
  return Math.round(s);
}
```

---

## 3. ON-PAGE MODULE SPEC (one source, two surfaces)

The module is a single renderer fed the canonical cells. It renders in two contexts;
the data is identical so the ordering can never drift.

### 3.1 On a CARRIER PLAN PAGE — "How {Plan} ranks, procedure by procedure"

For the plan being viewed, render one block PER procedure the plan touches:

- **Header:** procedure name + this plan's cell (e.g. "Implants — 20% day one, no
  separate cap"). Confidence chip if not `verified`.
- **Rank line:** "Ranks **#2 of 6** plans that cover implants" + the derived
  `rankReason` ("only Ameritas beats it on day-one access; this plan's $5,000 cap is
  larger").
- **Rival mini-table:** the 2 plans ranked immediately above and below, each linking
  to that rival's plan page (`/dental-insurance/ppo-plans/{slug}/`). Never a flat
  template — the rivals shown are computed from the ranking.
- **Treatment-guide link:** "Full implants buyer's guide →" to the treatment page.
- Procedures the plan does NOT cover render an honest "Not covered on this plan —
  see {top-ranked plan for that procedure}" handoff. No hiding gaps.

### 3.2 On a TREATMENT PAGE (`#treatment` browse + per-procedure pages)

Same renderer, procedure fixed, all 8 plans:

- Full ranked list 1..N (covered plans), DQ plans listed below as "Doesn't cover
  {procedure}."
- Each row: rank, plan, Y1/Y2 %, wait, applicable cap, the `rankReason`, link to the
  plan page.
- Reuses the live `#treatment` Smart-Match output and the `bestForGoal` ordering — it
  IS this model, surfaced. The hub's existing `#treatment` section (line 1015) and
  `#shelf` feature table (line 973) both call into it.

### 3.3 Anti-drift contract

- Cells authored ONLY in the reconciliation-backed JSON (extend `plans-data`).
- `rank` / `rankReason` ALWAYS derived at render via `procScore`. Never typed into copy.
- Premiums read from frozen `plans-data.monthly`; the model never re-prices.
- If a surface shows a number that disagrees with RECONCILIATION, RECONCILIATION wins.

---

## 4. WORKED RANKING — IMPLANTS (all 8 plans)

Verified cells (RECONCILIATION + briefs). `cap` = cap that actually pays the implant.

| Plan | Y1 | Y2 | Wait | Implant cap | Missing-tooth | Confidence |
|------|----|----|------|-------------|---------------|------------|
| Ameritas Complete | 20% | 50% | 0 mo | annual ($2,500→$3,000*) | favourable | Y2 max **needs-doc** |
| Mutual of Omaha | 20% | 50% | 0 mo | annual, up to **$5,000** | standard | state-specific (some states 6-12mo wait) |
| Humana Extend 5000 | 50% | 60% | 6 mo | **$2,000/yr, $4,000 lifetime** sub-cap | standard | verified |
| Guardian Premier 2.0 | 50% | 50% | 12 mo | **$1,000 lifetime** sub-cap | standard | verified |
| Delta PPO Premium | 50% | 50% | 12 mo | annual ($2,000) | standard (added 2025 ex-CA) | verified |
| UHC Primary (Max 2000/3000) | 50% | 50% | 12 mo | **$1,500 lifetime** sub-cap (separate) | restrictive (12-mo) | verified |
| Aetna Dental Direct | — | — | — | NOT COVERED | — | verified |
| MetLife NCD Complete | ~10% | →60% Y3 | 0 mo | $3,000/yr sub-cap | assume applies | **needs-doc / noindex** |

\* Ameritas Y2 max: live JSON says $3,500; RECONCILIATION says needs-doc ($2,500-$3,000). FLAGGED.

**Derived ranking (implants reward day-one access + low wait + no separate cap + cap headroom):**

1. **Mutual of Omaha** — day-one access AND the largest cap that actually pays implants
   ($5,000, no separate sub-cap). 20% Y1 is low, but you can START now and Y2 hits 50%
   against a $5k ceiling. Best all-around implant home.
2. **Ameritas PrimeStar Complete** — the other day-one implant plan; bone graft +
   placement covered from day one, no sub-cap. Loses to MoO only on cap size
   ($3,000 vs $5,000). *(Y2 max needs-doc.)*
3. **Humana Extend 5000** — highest reimbursement (50%→60%) but a 6-mo wait and a hard
   $2,000/yr + $4,000 lifetime implant sub-cap throttle long-term value.
4. **Delta PPO Premium** — 50% but full 12-mo wait; pays from the $2,000 annual max
   (no extra sub-cap), edging UHC.
5. **UHC Primary (Max 2000/3000)** — 50% after 12-mo wait; the separate $1,500 implant
   lifetime cap is a genuine ceiling but at least doesn't fight the annual max.
6. **Guardian Premier 2.0** — 50% but 12-mo wait AND the smallest implant ceiling
   ($1,000 lifetime). Last among plans that cover implants.
- **Not covered:** Aetna Dental Direct.
- **Under review (excluded / noindex):** MetLife NCD Complete (~10% Y1, needs-doc).

> Plan-page rank lines: MoO reads "#1 — day-one implants against a $5,000 cap, no
> separate implant sub-limit." UHC reads "#5 — a separate $1,500 implant lifetime cap
> is generous for the class but a real ceiling, and the work waits 12 months."

---

## 5. WORKED RANKING — BRACES / ORTHO (all 8 plans)

Braces reward WHO is covered (adult vs child) first, then lifetime ortho max.

| Plan | Adult ortho | Child ortho | Wait | Ortho lifetime max | Confidence |
|------|-------------|-------------|------|--------------------|------------|
| Delta PPO Premium | **Yes 50%** | Yes 50% | 12 mo | ~$1,000-$1,500 | verified (rare adult cover) |
| UHC (Max 2000/3000) | Yes* 50% | Yes 50% | 12 mo | ~$1,000-$1,500 | verified (*confirm adult elig.) |
| Guardian Premier 2.0 | No | **Yes 50%** | 12 mo | $1,000 lifetime | verified |
| Ameritas | No (Complete: none; Boost: child only 15%→50%) | Complete: NO | 12 mo | $1,000 (Boost only) | verified |
| Mutual of Omaha | No | No | — | — | verified (rider is separate product) |
| Humana Extend 5000 | No | No | — | — | verified (no Extend tier covers ortho) |
| Aetna Dental Direct | No | No | — | — | verified |
| MetLife NCD Complete | not featured | not featured | — | — | needs-doc / noindex |

**Derived ranking:**

1. **Delta PPO Premium** — the ONLY plan covering ADULT orthodontics on the shelf
   (50% after 12-mo wait), and covers children too. Decisive win on the question that
   actually decides braces.
2. **UHC Primary (Max 2000/3000)** — covers ortho on the upper tiers, 50% after 12-mo;
   adult eligibility needs confirmation, so ranked behind Delta which is verified-adult.
3. **Guardian Premier 2.0** — strong CHILD braces (50%, $1,000 lifetime) but adult not
   covered on any Guardian individual plan. Best child-only pick.
4. **Ameritas (Boost tier)** — child ortho only, and only on the Boost tier, NOT
   Complete (the shelf plan). Effectively a non-option for the Complete buyer.
- **Not covered (adult or child):** Mutual of Omaha, Humana Extend 5000,
  Aetna Dental Direct.
- **Under review:** MetLife NCD Complete (ortho not featured; needs-doc).

> Plan-page handoff on the no-ortho plans (MoO, Humana, Aetna): "This plan doesn't
> cover braces. For adult ortho see Delta PPO Premium; for kids see Guardian Premier
> 2.0 →" — links computed from this ranking, not templated.

---

## 6. NEEDS-DOC CELLS TO FLAG (do not assert a number)

1. **Ameritas — Year-2 annual maximum.** Live `plans-data` shows `$3,500`;
   RECONCILIATION says needs-doc ($2,500 Y1 / $2,500-$3,000 Y2). **Live page and the
   model currently DRIFT.** Pull the PrimeStar product guide; until then the implant
   cap-headroom term for Ameritas is provisional and the cell carries a `needs-doc`
   chip. (This is the only number where the frozen JSON and reconciliation disagree.)
2. **Guardian — whitening.** $500/yr allowance is an **Advantage Diamond-tier** feature;
   live JSON models Guardian Premier 2.0 whitening as `{pct:50,wait:6}`. RECONCILIATION
   flags whitening as needs-doc for Premier 2.0. Do NOT rank Guardian on whitening
   until the SOB confirms it applies to the Premier 2.0 tier (also Guardian major %:
   50 vs 60 unresolved).
3. **MetLife NCD Complete — entire major/implant schedule.** Y1 ~10% and the graduated
   curve are needs-doc; plan stays `gathering-reviews` + `noindex` and is EXCLUDED from
   every procedure ranking (shown only as "under review"), never ranked.
4. **Delta — whitening.** state-specific (~25-50%, 6-mo wait, ages 16+, not all states);
   render as a range with the "varies by state" qualifier, never a hard %.
5. **Aetna Dental Direct** — no implant/ortho data because the tier covers neither;
   confirmed exclusions, but the brief itself is newer (RECONCILIATION: needs-doc on
   some everyday fields). Safe for the implants/braces rankings (both = "not covered").

---

## 7. BUILD NOTES

- Extend the existing `plans-data` JSON with the per-cell fields in §1.2
  (`pctY2`, `procedureCap`, `procedureCapType`, `missingToothRisk`, `adultCovered`,
  `childCovered`, `orthoLifetimeMax`, `allowanceOffMax`, `confidence`). The live file
  already carries most (`majorPctY2`, `implantPctY2`, `annualMaxY2`, `whitening.allowance`).
- Promote `bestForGoal` (compare-ppo `~line 1484`) into the shared `procScore` so plan
  pages and the hub call ONE function.
- Crowns / root canals / dentures are three procedure cards over one `major` cell.
- Never re-price; premiums frozen.
</content>
