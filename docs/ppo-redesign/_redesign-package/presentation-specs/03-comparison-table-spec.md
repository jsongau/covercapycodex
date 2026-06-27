# Comparison table spec — side by side, row = spec, column = plan

> CoverCapy · PPO plan presentation system · File 03 of 05
> This is the surface buyers ask for most and the one the current pages don't have: line
> plans up and compare the *same spec across plans*. Modeled on the employer-benefit
> comparison chart (the clearest dental spec presentation in the wild).

---

## 1. Layout: spec rows × plan columns

The buyer reads **down a column** to understand one plan, and **across a row** to compare
one spec across plans. Both must be effortless.

```
                    │ UHC Primary  │ Aetna Direct │ Delta PPO    │ Mutual/Omaha │
                    │ Dental       │              │ Premium ★    │ Dental Pref. │
────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 Monthly premium    │ From $30/mo  │ From $50/mo  │ From $75/mo  │ From $90/mo  │  ← sticky-ish price row
 Plan type          │ Basic        │ Basic        │ Major/Full   │ Major/Full   │
────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 Annual maximum     │ $1,000       │ $1,250       │ $2,000       │ $5,000  ◆best │  ← ◆ marks best-in-row
 Deductible         │ $50/person   │ $50/person   │ $50/person   │ $50/person   │
 Coverage starts    │ Next bus.day │ 1st next mo. │ 1st next mo. │ Next bus.day │
────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 Preventive         │ 100% · now   │ 100% · now   │ 100% · now   │ 100% · now   │  ← the 100-80-50 block
 Basic              │ 50% · now    │ 80% · 6mo    │ 80% · 6mo    │ 80% · now    │
 Major              │ Not covered  │ 50% · 12mo   │ 50% · 12mo   │ 50% · 6mo    │
 Implants           │ Not covered  │ Not covered  │ 50% · 12mo   │ 50% · 12mo   │
 Orthodontics       │ Not covered  │ Not covered  │ Adult+child  │ Not covered  │
────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
 Network            │ UHC Dental   │ Aetna Dental │ Delta Dental │ M/Omaha PPO  │
                    │ PPO          │ PPO          │ PPO          │ (TruAssure)  │
 Best for           │ Spend least  │ Everyday     │ Major + ortho│ Big cases    │
────────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
                    │ [View][Verify│ [View][Verify│ [View][Verify│ [View][Verify│  ← per-column CTA row
```

---

## 2. Row order (fixed — same as File 01)

Group rows into four labeled bands so the eye can jump:

1. **Cost** — Monthly premium · Plan type
2. **Limits** — Annual maximum · Deductible · Coverage starts
3. **Coverage** — Preventive · Basic · Major · Implants · Orthodontics *(the 100-80-50+ grid)*
4. **Practical** — Network · Best for · (expandable: whitening, vision, age cap, ortho
   lifetime max, missing-tooth clause, frequency limits, reimbursement basis)

Then a **CTA row** per column.

---

## 3. The rules that make a comparison readable

- **Sticky header row** (plan name + price) so columns stay labeled while scrolling specs.
- **Sticky first column** (spec label) on horizontal scroll so cells never lose meaning.
- **Highlight best-in-row.** For numeric rows where higher/lower is clearly better (annual
  maximum ↑, premium ↓, waiting period ↓), mark the winning cell with a subtle `◆ best`
  token + faint tint. Do **not** heatmap every cell — highlight only the rows where
  "best" is unambiguous, and always footnote that "best spec ≠ best plan for you."
- **`Not covered` is visible, not blank.** Render muted/italic, consistently — the gaps
  are decision data.
- **Coverage cells share the File 01 format** exactly: `% · wait`. This is the same cell
  the card and detail page use; author once.
- **Cap at 3–4 columns** on desktop. More plans → the buyer adds/removes columns via the
  sticky compare bar; never render 8 columns of dense specs.
- **One recommended column** may get a tinted header (`★`), matching the card's "Most
  popular." At most one.
- **Difference-only toggle** (power feature): "Hide rows where all plans match" collapses
  identical rows (e.g. everyone's deductible is $50) so only the *differences* remain.

---

## 4. Choosing what to compare (the compare tray)

- A **sticky compare bar** persists across the hub/cards: buyers tick `+ Compare` on 2–4
  plans, the bar shows the chips, `Compare (3) →` opens this table pre-filled.
- This is the bridge between the **hub library** (browse) and the **comparison tool**
  (decide) — exactly the hub→compare relationship the briefs require, made tactile.
- Persist the selection in memory/localStorage-equivalent so it survives navigation.

---

## 5. Mobile pattern (the hard part)

A wide matrix can't shrink to one column. Use **one of two** patterns, not a squished
table:

**Pattern A — Swipeable columns (recommended for 2–3 plans).**
Spec labels pinned on the left as a sticky column; plan columns scroll horizontally one
at a time with snap. Each plan column is ~80% viewport so the buyer always sees the label
column + one full plan, and swipes to the next.

**Pattern B — Stacked accordion (for 4 plans).**
Each plan becomes a vertical card (the File 02 expanded card), and a "Compare specs"
toggle flips all open cards into a synchronized, row-aligned read so the same spec lines
up vertically across the stacked plans.

Never: horizontal-scroll a full multi-column table with tiny text. Never hide the Major /
Implants / Ortho rows to save space.

---

## 6. Maps to existing CoverCapy components

| Table part | Reuse / adapt |
|---|---|
| Table shell + cells | `.cov-table` (already styled: header band, row borders, `.ct-pct`, `.ct-na`) |
| Coverage cell format | identical to detail-page `.cov-table` cells — same renderer |
| Plan-type / best-in-row token | `.chip.neutral` / new `.cell-best` tint |
| Sticky header/column | `position: sticky` on `thead th` and first `td` |
| Compare bar | adapt the `.sticky-bar` pattern already in the build |
| Per-column CTA | `.btn-pri` + `.btn-out`, shrunk |

> The current build already has `.cov-table` doing row=category on a single plan. The
> comparison table is **the same component widened to N plan columns** — most of the CSS
> already exists.
