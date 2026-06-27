# Agent 02 — PPO Comparison UX & Spec-Presentation

> CoverCapy PPO hub redesign · Comparison UX specialist memo
> Mandate: 70% ZIP spec-first / 30% CoverCapy editorial. Feel: premium concierge clarity
> meets a modern insurance research terminal. **Specs before prose. The 100/80/50 grid is
> the universal mental model.**
>
> Read against: `presentation-specs/00-05`, the redesign `compare-ppo-dental-plans.html`
> (table + tray already built), and the live `compare-ppo-dental-plans.html` (Smart Match
> `#match`, `score()`, `renderVerdict()`, the `PLANS` array).

---

## 0. The headline finding

Two halves exist and neither page has both. The **redesign ZIP page** has the
spec-first comparison engine — a `table.cmp` with sticky header + sticky first/second
column, a sort/filter `.toolbar`, `best-tok` best-in-row markers, a `.tray` compare bar
(pin 2–4, persisted to `localStorage`, `MAX_PICK=4`) — but **no Smart Match and a thin
coverage grid** (it only surfaces Basic / Major / Implants, not the full 100/80/50 +
ortho). The **live page** has the 30% layer — `#match` Smart Match scoring on
treatment + timing + budget, top-match + one backup with reasons, the canonical `PLANS`
object — but renders plans as prose-heavy fit cards with no side-by-side matrix.

The job is not to glue them together. It is to make Smart Match **a lens onto the
spec-first table**, render one canonical `PlanSpec` (File 01) into card / matrix / detail,
and complete the coverage grid to the universal 5-row model on every surface.

---

## 1. PLAN CARD anatomy

The card answers *price / ceiling / what's covered / wait* in under three seconds without
opening the plan. Field order is **fixed** (File 01 §1) so the eye learns positions and
can diff two cards instantly.

### 1.1 Exact field order (top → bottom)

| # | Zone | Field(s) | Treatment |
|---|------|----------|-----------|
| 1 | **Identity** | Carrier kicker (uppercase, brass) + plan name (Fraunces serif) | Name is the second-largest text |
| 2 | **Shape + flag** | `planShape` pill (`Preventive` / `Basic` / `Major·Full`) + one hard eligibility flag only (`ages ≤64`, `under review`) | Fastest filter; never more than one flag |
| 3 | **Price block** | `From $X/mo` (**largest element on the card**) + `illustrative` beneath + paired `Annual max` + `Deductible` | The three numbers buyers weigh together, in one block |
| 4 | **Coverage strip** | 5 fixed cells: Preventive · Basic · Major · Implants · Orthodontics — `% · wait` | The heart of the card; the current cards' missing piece |
| 5 | **Timing line** | `Coverage starts: {effectiveDate}` | One line |
| 6 | **Network line** | `Network: {exact network name}` | One line |
| 7 | **Best-for** | one `best` sentence — **the only prose on the card** | Pulled from `best` |
| 8 | **CTAs** | primary `View full plan` → detail; secondary `Verify free` → eligibility; optional tertiary `+ Compare` checkbox | |
| 9 | **Governance** | one muted line: `Last verified {date} · view sources` | **Not** a badge cluster |

### 1.2 Headline vs collapsed

- **Headline (always visible):** zones 1–9 above. Five coverage cells, price, max,
  deductible, timing, network, one best-for line.
- **Collapsed behind "view details" (expanded-card variant):** the **secondary specs** —
  whitening, vision bundle, age cap, missing-tooth clause, graduated basic
  (`80% yr1 → 90% yr2 → 100%`), lifetime ortho max, frequency limits, reimbursement basis
  (MAC vs U&C). Lead-then-collapse: 5–7 specs visible, the long tail one toggle away.
- **Compact variant** (rail / alternatives): drop the strip to one inline summary —
  `Basic · Max $1,000 · Basic care day one  [View →]` — keep price + one differentiator.

### 1.3 The "recommended / most-popular" treatment — MAX ONE

Drive from the File 01 `recommended` boolean. **At most one card per list** gets:
elevated shadow + a teal/brass header band + a single ribbon. Marking two destroys the
signal — enforce in the renderer (`recommended` true on exactly one object; build asserts
it). Label it `Most chosen by CoverCapy members`, never `Best plan` / `Cheapest`
(superlatives are banned in the UI; let the specs say it). The live page's `bestSelling:true`
on two plans (uhc, guardian) is a **bug to fix** — collapse to one `recommended` flag.

### 1.4 Shape labels (the one-glance filter)

Exactly three, canonical strings, from `planShape`:

- `Preventive` — low premium, cleanings/exams only
- `Basic` — moderate, preventive + fillings/extractions
- `Major / Full` — high, crowns/implants/dentures/ortho

Render as `.chip.neutral`. The hard eligibility flag (age cap, under-review) renders as
`.chip.warn` (amber) beside it.

### 1.5 Card rendering rules

- **Always render all five coverage cells**, even null — a missing cell reads "I don't
  know"; explicit `Not covered` (gray italic) reads as a decision input.
- **Color the percentage, not the whole cell.** No full red/green heatmap on a single
  card — reserve difference-highlighting for the matrix.
- **Price qualifier mandatory:** `From` + `illustrative` every time; never bare.
- **One muted governance line.** No per-cell verification pills.
- Whole card is a link; CTAs are real focusable buttons layered above; tap target ≥44px.

---

## 2. COMPARISON MATRIX anatomy

Row = spec, column = plan. Buyers read **down a column** to learn one plan and **across a
row** to compare one spec. Modeled on the employer-benefit chart (File 00 §2d). The
redesign's `table.cmp` is the skeleton — it must be widened to the full File 01 row set.

### 2.1 Row order — fixed, four labeled bands (File 03 §2)

| Band | Rows |
|------|------|
| **Cost** | Monthly premium · Plan type |
| **Limits** | Annual maximum · Deductible · Coverage starts |
| **Coverage** (the 100/80/50+ grid) | Preventive · Basic · Major · Implants · Orthodontics |
| **Practical** | Network · Best for · (expandable: whitening, vision, age cap, lifetime ortho max, missing-tooth clause, frequency limits, reimbursement basis) |

Then one **CTA row** per column: `[View] [Verify]`.

> **Gap to close:** the current redesign table shows only `From $/mo · Annual max · Basic ·
> Major · Implants · Coverage starts`. It is missing the **Preventive** and
> **Orthodontics** coverage rows and the **Deductible / Plan type / Network / Best-for**
> rows. Add them so the matrix carries the full universal grid, not a subset.

### 2.2 Marking best-in-row

- Mark the winning cell **only on rows where "better" is unambiguous**: annual maximum ↑,
  premium ↓, waiting period ↓. Use a subtle `best` token (the existing `.best-tok`
  pill — a check glyph + label like `Best price` / `Highest max`) + a faint tint behind
  the cell.
- **Do not heatmap every cell.** Coinsurance % is not strictly "higher is better" (a
  buyer needing only cleanings does not benefit from 50% major), so coverage rows get
  **no** best marker — only Cost / Limits rows do.
- **Always footnote:** `best spec ≠ best plan for you` (one muted line under the table).
- The token carries meaning via text, not color alone (WCAG 1.4.1).

### 2.3 Marking "not covered"

`Not covered` cells render **muted/italic, visible, never blank** — the gaps are decision
data. Same `.cov-cell.is-none` styling on every surface. A blank cell reads as "unknown";
the explicit phrase reads as "decided." Screen readers must announce "Major, Not covered."

### 2.4 Sticky behavior

- **Sticky header row** (plan name + price) — `position:sticky; top:60px` (already in
  the redesign at `table.cmp thead th`) so columns stay labeled while scrolling specs.
- **Sticky first column** (spec label) on horizontal scroll so cells never lose meaning.
  The redesign currently stickies columns 1 (Compare checkbox) and 2 (Plan) at `left:0`
  and `left:52px` — for the spec matrix, the **spec-label column** is what must pin.
- Sticky elements must not trap keyboard focus; tab order follows reading order.

### 2.5 Column cap + difference toggle

- **3–4 columns max on desktop.** More plans → the buyer adds/removes via the compare
  tray; never render 8 dense columns. The full 8-plan inventory lives in the **card
  library / sortable row list**, not the side-by-side matrix.
- **One recommended column** may get a tinted header (`★`) matching the card ribbon. One.
- **"Hide rows where all plans match" toggle** (power feature) — collapses identical rows
  (e.g. everyone's $50 deductible) so only *differences* remain. `aria-pressed` + an
  `aria-live` note on change.

---

## 3. COVERAGE GRID — the 100/80/50 + implants + ortho cell format

This is the universal mental model and the single highest-impact element. **One renderer**
feeds card strip, matrix rows, and detail-page grid (author once, File 01; render thrice).

### 3.1 The five rows, always, in fixed order

`Preventive · Basic · Major · Implants · Orthodontics` — never reorder, never drop one to
save space (not even on mobile; these are the decision cells).

### 3.2 Cell format

Two lines per cell (File 01 §2):

```
{percent}%          ← top line, the value, colored
{wait}              ← second line, small, muted   ("no wait" / "6-mo wait" / "12-mo wait")
```

- `100% / no wait`
- `50% / 12-mo wait`
- `Not covered` — gray italic, single phrase, **never blank, never "—" alone**
- Ortho carries a note when partial: `Child only · 50%` or `Adult + child`
- Whitening may be an **allowance**, not a %: `$200/yr` — render the allowance verbatim.

### 3.3 Color semantics (consistent across surfaces)

| State | Read |
|-------|------|
| Full (100%) | green ink (`--covered-ink` / `--covered-tint`) |
| Partial (80% / 50% / 20%) | amber/teal ink — partial coinsurance |
| Not covered | gray italic |

Color is **never the only signal** — the % and the word `Not covered` carry it for
colorblind / screen-reader users.

### 3.4 Year-1 vs later-year toggle

Plans whose rates grow (Ameritas `$2,000 → $3,500` yr2; Mutual of Omaha major `20% → 50%`;
Humana major `50% → 60%`) get a **Year 1 / Later** toggle on the grid. Default Year 1;
toggle relabels the cells and the annual-max line, with `aria-pressed` + `aria-live`. This
matters: the live data already carries `annualMaxY2`, `majorPctY2`, `basicPctY2`,
`implantPctY2` — surface them in the grid instead of burying them in a `best` sentence.

### 3.5 Real `<table>` semantics

The grid is a real `<table>` with `<th scope>` on category labels and column headers — not
a `<div>` grid — so "Major, Not covered" is announced correctly.

---

## 4. COMPARE TRAY behavior

The bridge between **browse** (card library / row list) and **decide** (matrix). The
redesign already ships the working skeleton; tighten it to spec.

### 4.1 Pin 2–4

- `+ Compare` / `Pin` checkbox on each card and each matrix row.
- `MAX_PICK = 4` (already set). On a 5th tick: **disable further checkboxes + show a quiet
  inline note** ("Comparing the max of 4 — remove one to add another"), do **not** silently
  drop a pinned plan.
- Tray hides below 2 picks (`picked.length < 2`), since a comparison needs two plans —
  already implemented (`renderTray` returns early under 2).
- Persist selection to `localStorage` (`cc-compare`) so it survives navigation — already
  implemented. Sliced to `MAX_PICK` on load.

### 4.2 Tray contents = a mini-diff

The tray renders a compact grid: spec-label column + one column per pinned plan, showing
the **headline specs only** (premium, annual max, the 5 coverage cells, coverage-starts) +
a per-column `View breakdown` link and a `×` remove. The redesign's `trayGrid` does this
for a subset — extend its rows to the full 5-cell coverage block so the tray previews the
same grid the full matrix shows.

### 4.3 Diff emphasis in the tray

Apply the **same best-in-row token + "Hide matching rows"** logic in the tray as in the
full matrix, so the tray *is* the quick-scan diff and `Compare (N) →` simply opens the
full matrix pre-filled to the pinned set. One pattern, two densities.

### 4.4 One sticky element rule

The compare tray is the **only** persistent sticky element on the comparison surface
besides the global subnav. It must collapse/coexist with the sticky subnav (Agent 03's
domain) — never stack two tall sticky bars. The redesign already calls
`window.__applySticky()` to reconcile; preserve that hook.

---

## 5. Smart Match integration — the 30% CoverCapy layer, NOT a separate quiz

Smart Match must operate on the **same canonical `PLANS` / `PlanSpec` data** as the matrix
and cards (Master Prompt: "Smart Match should not function as an isolated quiz"). The live
`score()` already does this — it reads `p.treatments`, scores on goal + timing + budget,
and returns reasons. The integration rule: **Smart Match is a filter/sort lens on the
spec-first table, not a parallel results surface.**

### 5.1 Placement and flow

1. **Top of hub, compact.** Three inputs on one row — *Treatment goal* (procedure),
   *Urgency* (timing), *Monthly budget* (slider). Results update on every change; **no
   email gate** before results (Master Prompt rule).
2. **Output is the recommended column, not a new card type.** Smart Match's top match
   becomes the **one tinted/`★` column** in the matrix and the **one `recommended` card**
   in the library. The "one backup" becomes a second highlighted column. No separate
   "fit card" visual language — the result IS the spec table, re-sorted and annotated.
3. **Explain the rank.** Carry the live `reasons` array into a one-line "why this ranked
   first" under the recommended column/card (`no waiting period, coverage starts day one`;
   `your timeline clears the 6-month wait`). Show **tradeoffs, not only positives** — the
   live `score()` already pushes `bad`/`note` reasons; surface at least one.
4. **Distinguish "coverage starts" from "treatment tier becomes eligible."** A plan can be
   effective next business day yet have a 12-month major wait. Smart Match must say both.
5. **Permit immediate comparison.** The matched plan + backup land pre-pinned in the
   compare tray so the buyer goes match → diff in one click.
6. **Preserve state in the URL/session** (e.g. `?goal=implant&time=6&budget=70`) so a
   comparison is shareable and survives navigation.
7. **Pricing/availability caveat** stays: every premium is `illustrative · ZIP-gated`.

### 5.2 What this kills

No standalone quiz page, no email wall, no separate "Smart Match results" component with
its own card styling. The 30% editorial layer expresses itself as **annotation, ranking,
and a "why" line on the 70% spec table** — plus restrained Mr. Bara only inside the Smart
Match control and tooltips (never over the matrix or prices).

---

## 6. DO / DON'T

**Do**
- Render all five coverage categories on every surface, every time, in fixed order.
- Make premium the largest number; pair it with annual max + deductible.
- Render `Not covered` explicitly (gray italic), never blank.
- Keep one quiet governance line per plan; push provenance to the source drawer.
- Highlight best-in-row only on unambiguous rows (max ↑, premium ↓, wait ↓), with the
  `best spec ≠ best plan for you` caveat.
- Cap side-by-side at 3–4 columns; route the full 8 to the sortable card library.
- Make Smart Match annotate and re-rank the spec table; pre-pin its match + backup.
- Surface Year-2 rates via the grid toggle, not a prose sentence.

**Don't**
- Don't bury a coverage % inside a paragraph (the core problem to fix).
- Don't stamp "Needs verification" on every tile/cell — one muted line + source drawer.
- Don't mark more than one plan recommended (fix the live `bestSelling` double-flag).
- Don't show a bare price without `From` + `illustrative`.
- Don't hide Major / Implants / Ortho to save space on mobile.
- Don't heatmap an entire single card; reserve difference-highlighting for the matrix.
- Don't build Smart Match as a separate quiz or a second results card style.
- Don't render 8 dense columns of specs side by side.
- Don't let Mr. Bara appear over prices, the matrix, exclusions, or sources.

---

## 7. Score & top 3 improvements

### Redesign-package comparison UX score: **7.5 / 10**

**What earns it:** the structural backbone is genuinely strong and spec-first as mandated —
a real `table.cmp` with sticky header + sticky columns, a working sort/filter toolbar,
`best-tok` best-in-row markers with text-not-color semantics, explicit `Not covered` cells,
a `localStorage`-persisted compare tray capped at `MAX_PICK=4` that hides under 2 picks, a
plan-count readout, and analytics hooks. That is most of File 03 already built and most of
File 02's discipline (price prominent, qualifier present, governance demoted to one line).

**What costs it 2.5 points:**

1. **The coverage grid is incomplete — the universal model is only half-shown.** The
   matrix surfaces Basic / Major / Implants but **omits Preventive and Orthodontics rows**,
   and the cards lack the full 5-cell strip. The 100/80/50 + implants + ortho grid is *the*
   mandated mental model and the single highest-impact element — it must be complete and
   identical on card, matrix, and detail, driven by one renderer. **(Top improvement #1.)**

2. **Smart Match is missing entirely from the redesign compare page** — the 30% CoverCapy
   layer that turns a spec terminal into a concierge decision product. It exists on the
   live page but as a prose fit-card surface. It must be re-implemented **as a lens on the
   spec table** (re-rank + annotate the recommended column, pre-pin match + backup, explain
   the rank with tradeoffs), not bolted on as a second results style. **(Top improvement #2.)**

3. **Year-2 / graduated-rate data is buried and the recommended flag is mis-applied.** The
   canonical data already carries `annualMaxY2`, `majorPctY2`, `basicPctY2`, but the grid
   shows only Year 1; add the **Year 1 / Later toggle** so step-up plans (Ameritas, Mutual
   of Omaha, Humana) read honestly. And collapse the live page's two `bestSelling:true`
   flags to exactly **one** `recommended` plan so the "Most chosen" signal survives.
   **(Top improvement #3.)**
