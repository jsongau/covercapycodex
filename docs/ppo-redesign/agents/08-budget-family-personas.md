# Agent 07 — Budget & Family-Plan Behavior Specialist

**Memo file:** `agents/08-budget-family-personas.md`
**Scope:** budget anchoring, annualized premium, Year 1 vs Year 2 total cost, family deductibles, lifetime ortho maximums, calendar-year vs plan-year reset timing, total expected cost (not just premium).
**Personas:** lowest-monthly-premium shopper · family comparing orthodontics · preventive-only shopper · self-employed buyer · person between jobs · senior comparing high annual maximums.

**Sources reviewed:** `compare-ppo-dental-plans.html` (live, scorePlan + budget slider + comparison table + footer ticker), `docs/ppo-redesign/05-APPROVED-DESIGN-SYSTEM.md`, `00-MASTER-PROMPT.md`, `_redesign-package/presentation-specs/*` (data dictionary, plan-card, comparison-table specs), `plan-data/*.md` + `PLAN-DATA-RECONCILIATION.md`.

---

## Founder lens: "too basic / worse than current"

### (a) What the current page + ZIP already do WELL for budget/family buyers — MUST NOT be lost

1. **A real budget slider that re-ranks, not just filters.** `scorePlan` (line 1994-1997) rewards plans inside the `$/mo` budget, penalizes overage proportionally, and crucially adds a **value-per-dollar term** `Math.min((p.annualMax/100)/p.monthly,1)` — so a cheap plan that pays nothing does not win on price alone. This is genuinely better than a naive "sort by price." Keep this engine; do not replace it with a dumb filter.
2. **Price priority weighting.** The "What matters most" chip (`pl.prio` = price / balanced / coverage) shifts both the annual-max weight `mw` and the budget reward. A price-first shopper and a senior chasing high maximums get materially different rankings from the same data. Preserve.
3. **One top match + one honest backup, with a caution line** ("$X/mo is over your $Y budget"). The honest caution is on-brand and trust-building. Keep.
4. **Year-2 annual maximum already surfaced** in the table (`annualMaxY2`, line 1533/1570) as "→ $3,000 in Y2" and the graduated-coinsurance note (Ameritas 20% Y1 → 50% Y2) lives in glossary + FAQ copy. The raw facts exist — they are just not yet turned into a *total-cost* story.
5. **Family vs individual is captured as an input** ("Who is covered" → `pl.house`) and nudges scoring (`+5` if annualMax ≥ 3000 for families, line 1999). The hook exists.
6. **Glossary tooltips define the cost mechanics** (annual-maximum, deductible, coinsurance, plan-year reset) inline — strong for the anxious first-time and preventive-only shopper.

### (b) What must be ADDED to be measurably BETTER than today

The current page anchors the entire budget conversation on **monthly premium only**. Every budget/family persona actually decides on **total expected annual outlay**. That gap is the single biggest "too basic" risk. Specifics below.

---

## Findings by lever

### 1. Budget anchoring — move the anchor from "$/mo" to "what you'll actually spend this year"
- **Current:** slider is labeled "Monthly budget", `min 20 / max 130 / step 5`, and the only number a buyer sees on cards is `$X/mo`.
- **Problem:** a $40/mo plan with a $50 deductible and 20% Y1 major coverage can cost a crown patient **more** than a $75/mo plan. The page never shows this. The lowest-premium shopper is actively mis-anchored.
- **Add:** alongside the `$/mo` headline, a quiet second line **`≈ $X/yr premium`** (premium × 12 + any enrollment fee) using `--sans` tabular-nums, muted. This is the cheapest, highest-impact addition. The data dictionary already defines an annualized field — render it.

### 2. Annualized premium (not just monthly)
- Compute `annualPremium = monthly*12 (+ enrollmentFee if present)` once in the canonical `PLANS` object so card, comparison row, and Smart Match all read the same number (no-data-drift rule, master prompt). Display as a small caption, never larger than the `/mo` figure (design system: premium is the largest number, qualifiers are muted).

### 3. Year 1 vs Year 2 TOTAL cost — the killer feature for budget shoppers
- The facts to do this already exist per plan: `monthly`, `deductible`, `annualMax`, `annualMaxY2`, and graduated coinsurance (Y1 vs Y2 %). Today they sit in five different cells and the buyer has to do the math.
- **Add a "Year 1 / Later" total-cost toggle** on the comparison matrix (the design system already calls for a "Year-1 / Later toggle [that] reveals graduated rates" — extend it from coverage % to **total spend**). For a chosen treatment scenario (reuse the existing `estimate-cost.html` need param), show:
  - **Year 1 out-of-pocket** = annual premium + deductible + coinsurance share at Y1 % (capped by Y1 annual max)
  - **Year 2+ out-of-pocket** = annual premium + coinsurance at stepped-up % (capped by Y2 max)
- This directly serves the self-employed buyer and the senior, and exposes the trap where a no-wait/low-premium plan is cheap in Y1 but the graduated plan wins by Y2. **This is the clearest "better than current" proof point.**

### 4. Family deductibles — currently invisible
- Plan briefs carry **family deductible caps** (e.g. `$50/person; $150/family` on Ameritas, Guardian, UHC, Delta, Aetna; Humana `$75/person`; Mutual `$150/family`). The live table shows only `p.deductible` (individual). The family persona literally cannot see the cap that matters to them.
- **Add `deductibleFamily`** to the canonical schema and render it in the deductible cell when `pl.house==='family'` ("$50 / $150 family"). Low effort, removes a real gap.

### 5. Lifetime orthodontic maximum — the family-with-braces decision pivot
- The ortho shopper's #1 number is the **lifetime ortho max**, and it is **not a field today** (table shows only "Kids braces" / "Adult braces" coverage %). Briefs give it: Guardian/Ameritas/Delta ≈ **$1,000–$1,500 lifetime**, Humana Extend has **no ortho** (must gate, not just rank low).
- **Add `orthoLifetimeMax`** + `orthoAgeCap` to the schema. On the card/matrix, when need = braces, show "50% to $1,000 lifetime · kids under 19". Surface the age cap as a **gate** in `scorePlan` for the family persona (mirror the existing `ageCap`/`p.ageCap` gating used for seniors at line 1984) so a plan that excludes adult ortho is shown as *gated with reason*, not silently mid-ranked.

### 6. Calendar-year vs plan-year reset timing
- Glossary defines `plan-year` well, but the **per-plan reset basis is not shown on the plan itself**. For the between-jobs buyer enrolling mid-year, "annual max resets Jan 1" vs "resets 12 months from your start date" changes whether the max is usable before a crown.
- **Add `resetBasis` (`calendar` | `plan-year`)** to the schema (all current plans = calendar per briefs; confirm before publish) and show one line on the plan/timeline. Pair with effective-date so the urgent + budget personas both get an honest reset picture.

### 7. Total expected cost, not just premium — wire it into the SCORE, not only the display
- `scorePlan` currently rewards low premium + value-per-dollar but never models the buyer's *actual* spend for their stated need + timing. Recommend a `pl.prio==='price'` path that ranks on **estimated Year-1 total** for the selected need rather than premium alone, so the lowest-premium persona is steered to lowest *true* cost. Keep the existing engine; add one cost-projection function feeding it. (Master prompt: "do not show only premium"; design system: "Smart Match re-ranks the same canonical data" — one scoring function, one PLANS object.)

---

## Persona acceptance checklist

| Persona | Must answer in one scan | Status today | Fix |
|---|---|---|---|
| Lowest-premium shopper | "Cheapest *total*, not cheapest /mo" | ✗ premium-only | annualized + Y1 total toggle (#1-3,7) |
| Family comparing ortho | "Lifetime ortho max + age cap + family deductible" | ✗ missing | #4, #5 |
| Preventive-only shopper | "100% preventive, no deductible on cleanings, lowest annual premium" | ~ partial | annualized premium + "preventive exempt from deductible" note (#2, glossary already says it) |
| Self-employed buyer | "Year 1 vs Year 2 budget, no employer split" | ✗ | Y1/Y2 total toggle (#3) |
| Between jobs | "When coverage starts + when max resets" | ~ effective-date only | resetBasis (#6) + effective-date pairing |
| Senior, high max | "Highest usable annual max, no age cut-off" | ~ Y2 max shown, ageCap gates exist | keep; surface max prominently when prio=coverage |

---

## Risks / guardrails
- **No data drift:** annualized premium, family deductible, ortho lifetime max, resetBasis must live in the **one** canonical `PLANS` object and feed card + matrix + Smart Match + schema. Do not compute in templates.
- **Illustrative, not quotes:** every total-cost projection must carry the "illustrative · view sources" line (design system §source drawer) and state that real cost needs a location/age quote (master prompt Smart Match rule). No "guaranteed savings."
- **Don't over-build the calculator on the hub.** Keep the deep math in `estimate-cost.html`; the hub shows the *comparative* Y1/Y2 totals only, to avoid burying the plan inventory.
- **Accessibility:** Y1/Later toggle and any cost figure must be server-rendered text + tabular-nums, status never color-only (design system §7).

---

## SUMMARY (~150 words)
The live page is already above "basic": a budget slider that genuinely re-ranks on price-priority and value-per-dollar, an honest top-pick + backup with cautions, and Year-2 maximums plus graduated coinsurance already in the data. Those must be preserved. The fatal gap for every budget/family persona is that the page anchors only on **monthly premium**. Buyers decide on **total annual outlay**. The highest-leverage additions, all from facts that already exist in the briefs: (1) an annualized-premium caption, (2) a Year-1 vs Year-2 **total-cost** toggle on the matrix, (3) **family deductible**, (4) **lifetime orthodontic maximum** + age-cap gating, and (5) per-plan **reset basis** (calendar vs plan-year). Wire estimated true cost into `scorePlan`'s price path so the lowest-premium persona is steered to lowest *real* cost, not lowest sticker. One canonical PLANS object; illustrative qualifiers everywhere.

## SCORE: 6.5 / 10
Strong, honest scoring engine and the Year-2 facts are present, but premium-only anchoring, missing family deductible, missing lifetime ortho max, and no total-cost view leave it one tier short of "clearly better than current" for these personas.

## TOP 3 RECOMMENDATIONS
1. **Add a Year-1 vs Year-2 total-cost toggle to the comparison matrix** (annual premium + deductible + coinsurance share, capped by annual max), reusing the existing `estimate-cost` need param and the design system's planned Year-1/Later toggle — the single clearest "better than current" proof.
2. **Surface the missing budget/family fields from the briefs into the canonical schema and UI:** annualized premium caption, `deductibleFamily`, `orthoLifetimeMax` + ortho age-cap **gating**, and `resetBasis` (calendar vs plan-year).
3. **Wire true expected cost into `scorePlan`** so the price-priority path ranks on estimated Year-1 total for the stated need, not monthly premium alone — keeping the one-engine / one-PLANS-object / illustrative-qualifier guardrails.
