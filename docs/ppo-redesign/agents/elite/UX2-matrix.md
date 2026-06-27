# UX2 — Comparison Matrix, Plan Cards, Mobile Compare

Agent: UX Designer 2 (elite track). Scope: comparison matrix, plan cards, plan brief modal, mobile comparison. Premiums frozen. Analysis and spec only. Grounded in real lines of `compare-ppo-dental-plans.html`.

---

## 1. The comparison matrix (`renderCompareMatrix`, lines 1582-1606; rows 1571-1581; CSS 244-265, 454-459)

### What exists
- `CMP_ROWS` (lines 1571-1581) drives a 13-row matrix: Annual maximum, Coverage active, Monthly price, Deductible, Network, Activation, Cleanings, Fillings, Crowns/root canals, Implants, Orthodontics (merged via `orthoCellHtml`), Whitening, Vision.
- Grid is CSS-grid (`.cmp-grid`, line 244): a label column `minmax(120px,210px)` plus `repeat(var(--cols),minmax(0,1fr))`. Header cells `.cmp-h` are `position:sticky;top:var(--toch)` (line 245) so the plan headers pin under the TOC.
- Header (line 1591) carries carrier overline, plan-name link (`.pn-link`), reviewing pill, price, and an Activate/Notify button. Remove handled by `.cmp-rmv` (line 1594).
- Empty slots (1596-1598) show a numbered slot, plus-circle, message, and a `<select>` to add a plan.

### Problems
1. **No "best in row" markers.** This is the single biggest scannability gap. Every cell is styled identically by status (`flag-now` green, `flag-wait`, `flag-no`), but nothing tells the buyer which of the 2-3 plans *wins* a given row. A user comparing annual max ($1,000 vs $2,000 vs $5,000) has to read and mentally rank every number. The whole point of a side-by-side is to surface the winner per dimension.
2. **Row order buries the decisive rows.** Money rows are split: Annual maximum (row 1), then Coverage active, then Monthly price (row 3), then Deductible. "Monthly price" and "Annual maximum" — the two numbers buyers decide on — are not adjacent and not visually elevated above the coverage detail rows.
3. **Redundant rows create verification noise.** "Coverage active" (row 2, from `p.activation`) and "Activation" (row 6, from `ACTIVATION[p.key]`) are two near-duplicate concepts shown as separate rows. They confuse rather than clarify. One says "1st of next month"; the other says "Activates 1st of the month." Collapse to one.
4. **No visual grouping.** Thirteen flat rows with identical `.cmp-l`/`.cmp-c` styling. There is no separation between the cost block, the logistics block (network/activation), and the coverage block. The eye has no rest points.
5. **Plan-shape context is missing.** `PLAN_TYPE` (Calendar / Plan Year / Ages <=64) exists at line 1607 and is used in the feature table, but the *compare matrix* never surfaces it. Two plans with different reset cycles look identical in the matrix.

### Recommendations
- **Best-in-row markers (highest impact).** For numeric/orderable rows (Annual max, Monthly price, Deductible, and each coverage % row), compute the winner inside `renderCompareMatrix` after `slots` is built, and add a `.cmp-c--best` class plus a tiny inline marker (a mint dot or "Best" micro-label). Direction:
  - Annual max: highest wins. Monthly price + deductible: lowest wins. Coverage rows: highest pct, then lowest wait, wins (reuse the `ftSortVal` scoring logic at 1622-1635 so the matrix and the feature table agree).
  - Only mark when there is a clear single winner and 2+ plans are present; suppress on ties and single-plan states to avoid noise.
  - Style: a 6px mint dot (`--mint`) before the value plus `font-weight:600`, not a full-cell fill (avoid gradients/glassmorphism per design rules). Add `aria-label="Best annual maximum"` for screen readers.
- **Reorder + group the rows.** Three labelled bands:
  1. Cost: Monthly price, Annual maximum, Deductible (adjacent, top).
  2. Logistics: Network, Coverage active (single row), Plan type/reset.
  3. Coverage: Cleanings, Fillings, Crowns/root canals, Implants, Orthodontics, Whitening, Vision.
  Add a thin band-label row (reuse `.cmp-l` styling, slightly bolder) so each group reads as a unit.
- **Kill the duplicate activation row.** Keep one "Coverage active" row. Drive it from `ACT_SHORT` (1608) for terseness in the matrix and reserve the verbose `ACTIVATION` copy for the plan brief modal where there is room.
- **Add a plan-shape pill to the header.** In the header block (line 1591), under the price, render a small pill from `PLAN_TYPE[p.key]` (e.g. "Calendar year", "Plan year", "Ages 64 and under"). Use the existing `.sc`-style sage pill, not a new color. This is the cleanest place to disclose reset cycle and age cap without adding a matrix row.

---

## 2. Plan cards (`planCard`, lines 1490-1508; CSS .pcard 568-593, 415-418, 490-492)

### What exists
- Live card (1500-1507): header with carrier logo, carrier name + "Verified Jun 2026" inline, plan name as `.pn-link`, badge row (Best selling / +Vision / Ages cap), price block, `p.best` blurb, a 5-row `.cov` list (Cleanings, Fillings, Crowns/RCT, Implants, Annual max), then CTA stack: **Activate** (green), a row of **Plan brief** + **Compare**, and `.pcard-links` with "View the full [carrier] [name] review" + "Find [carrier] dentists."
- Cards group into tiers (Essentials / Full / Maximum) via `TIER_LABELS` (1512) when sort is `featured`.

### Problems
1. **CTA overload.** A single card now exposes five competing actions: Activate, Plan brief, Compare, View full review, Find dentists. Activate (the conversion goal) is visually adjacent to four ghost buttons/links of similar weight. The "View the full ... review" link is long (`View the full Delta Dental Delta Dental PPO review`) and duplicates the plan-name link at top that already points to the same `planUrl(p)`.
2. **Two links to the same destination.** `.pn` plan-name link (1500) and the `.pcard-full` "View the full ... review" link (1507) both resolve to `planUrl(p)`. Redundant.
3. **"Verified Jun 2026" inline with carrier name** (1500) competes with the carrier label and is verification noise on a scannable card. It is a trust signal that belongs lower or as a subtle footnote.
4. **No plan-shape / reset signal on the card.** Same gap as the matrix: `PLAN_TYPE` and `ageCap` exist but only the age cap surfaces (as a badge). Calendar-vs-plan-year is invisible at card level.
5. **Weak hierarchy between blurb and coverage.** `p.best` prose and the `.cov` list read at similar weight; the price is the only strong anchor.

### Recommendations
- **Collapse to a clear 1-primary / 2-secondary CTA model.** Activate = single full-width primary (keep). Secondary row = "Plan brief" + "Compare" only. Move "Find [carrier] dentists" into the plan brief modal (it already lives there, line 1461) and **drop** the redundant "View the full ... review" link since the plan name already links there. This removes two of the five CTAs and the awkward doubled-carrier-name string.
- **Add a plan-shape pill** to the badge row (1501), sourced from `PLAN_TYPE[p.key]`, styled like the existing `.tag` chips (no new tokens). Distinguishes calendar vs plan-year plans at a glance, matching the matrix recommendation for consistency.
- **Demote "Verified Jun 2026."** Move it out of the `.car` line into a small muted footnote near `.pcard-links`, or render as a subtle check + date below the price. Keeps the trust cue without crowding the identity line.
- **Tighten coverage hierarchy.** Give the `.cov` list a faint top border/label ("Coverage") so the prose blurb and the structured facts read as distinct zones, mirroring the matrix's grouped bands.
- **Carry the best-in-tier marker.** Within each tier group (1518-1519), the top-sorted card can take a subtle "Top pick in this tier" ribbon using `--mint-soft`, reinforcing the same best-in-row language the matrix uses.

---

## 3. Plan brief modal (`openBrief`, lines 1445-1464)

### What exists
- Header (carrier overline + carrier + italic name), `p.best` paragraph, three brief stats (per month, annual max with optional Y2, deductible), a 6-row coverage `.brief-cov` list (Cleanings, Fillings, Crowns/root canals, Implants, Orthodontics, Whitening), a network + activation summary line, and live-plan actions: **Activate**, **View plan**, **Find [carrier] dentists** (1461).

### Assessment
- This is the strongest of the three surfaces. Three-action footer is correctly ordered (primary Activate, then two ghosts). Stats block gives the decisive numbers up top.
- **Gaps:** (a) no plan-shape / reset cycle stated despite room; (b) the modal repeats coverage rows already on the card and matrix without adding the *why* (no waiting-period emphasis or Y2 step-up beyond annual max). 
- **Recommendations:** add a plan-shape line to the stats or network row (reset cycle + age cap from `PLAN_TYPE`); surface Y2 coverage step-ups in the `.brief-cov` rows where they exist (the data exists; `ftCovCell` already renders "% in Y2" at 1612). Keep the three-action footer as is.

---

## 4. Mobile comparison (CSS 454-459)

### What exists
- `#compareMatrix` becomes `overflow-x:auto` with `scroll-snap-type:x proximity` (454).
- `.cmp-grid` columns become `88px repeat(var(--cols),minmax(43vw,1fr))` (456) — an 88px sticky label column plus plan columns at 43vw each, so ~2 plans show and the third is a swipe away.
- Label column and corner are `position:sticky;left:0` (457); plan headers get `scroll-snap-align:start` (458).

### Problems
1. **88px label column is too narrow for the longest labels.** "Crowns / root canals" and "Coverage active" wrap to 3+ lines at 12px in 88px, pushing row heights uneven and breaking horizontal alignment between the sticky label and the scrolled cells.
2. **43vw shows ~2.05 columns** — the partial third column edge is a deliberate affordance, but with `scroll-snap proximity` (not `mandatory`) the scroll can rest mid-column, leaving a half-plan with no header context.
3. **Sticky plan headers pin vertically (`top:var(--toch)`) but the label column pins horizontally** — when both happen the corner cell needs `z-index` above both; current `z-index:6` is equal on `.cmp-h` and the sticky label (457), risking overlap flicker on the corner during diagonal scroll.
4. **No "best in row" on mobile = worse than desktop.** With only ~2 columns visible, the absence of a winner marker hurts most here: the user can't even see all plans at once to rank them mentally.

### Recommendations (cleanest mobile compare)
- **Adopt a 2-up snap-mandatory model as the default.** Set plan columns to `minmax(46vw,1fr)` and `scroll-snap-type:x mandatory` so the view always rests on a clean 2-plan pair, with the 3rd reached by a definite swipe. Add a small dot pager / "1-2 of 3" indicator above the matrix so users know a third plan exists (discoverability of the swipe is the known weak point of horizontal scroll).
- **Cap the compare set to 2 on mobile.** The strongest mobile compare is two columns, fully visible, no scroll. Detect viewport and soft-limit `compare` to 2 on small screens (the desktop 3-cap at line 1530 stays). Two fully-visible columns beats three half-visible ones.
- **Widen the label column to ~104px and allow 2-line labels with controlled line-height**; or shorten labels on mobile ("Crowns / root canals" -> "Crowns / RCT" as already used on the card at line 1504). Keep matrix labels consistent with card labels.
- **Bump the corner cell `z-index` above both sticky axes** (e.g. corner `z-index:8`, axes `z-index:6/7`) to kill diagonal-scroll flicker.
- **Carry best-in-row markers to mobile** (same mint-dot logic). On a 2-column mobile view a single "Best" dot per row is the fastest possible scan and is where the marker pays off most.

---

## Priority ranking
1. Best-in-row markers across matrix + cards + mobile (biggest scannability win, unifies all three surfaces).
2. Row reorder + grouping + kill duplicate activation row in the matrix.
3. Plan-card CTA collapse (5 actions -> 1 primary + 2 secondary) and drop the redundant full-review link.
4. Plan-shape pills on matrix header, card badge row, and brief stats.
5. Mobile 2-up snap-mandatory + pager + label-column width fix.
