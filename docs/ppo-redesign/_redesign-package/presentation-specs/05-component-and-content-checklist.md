# Component, content & QA checklist

> CoverCapy · PPO plan presentation system · File 05 of 05
> Microcopy, accessibility, do/don't, and acceptance criteria that apply across the card
> (02), comparison table (03), and detail page (04).

---

## 1. Microcopy library (use verbatim — see File 01 §2 for full label list)

| Slot | Approved string |
|---|---|
| Price | `From $30/mo` + small `illustrative` |
| Price tooltip | "Premiums vary by state, ZIP and effective date. Enter your ZIP for a real quote." |
| Annual max subtitle | "Most the plan pays per year" |
| Deductible subtitle | "You pay this before the plan starts paying" |
| Coverage cell | `100%` / `no wait` · `50%` / `12-mo wait` · `Not covered` |
| Plan type pills | `Preventive` · `Basic` · `Major / Full` |
| Governance line | `Last verified Jun 20, 2026 · illustrative · view sources` |
| Under-review banner | "Under review — not recommended yet. Coverage details are unverified." |
| Primary CTA | `Verify my exact plan free` |
| Secondary CTA | `View full plan` / `Find dentists in this network` |
| Compare toggle | `+ Compare` → bar: `Compare (3) →` |
| Best-in-row token | `best` (with note "best spec ≠ best plan for you") |

Tone: patient-first, plain, no hype. "Review" always means breakdown, never endorsement.
No "best plan" / "cheapest" superlatives in the UI; let the specs say it.

---

## 2. Accessibility

- [ ] Coverage grid is a real `<table>` with `<th scope>` on category labels and column
      headers — not a `<div>` grid. Screen readers must announce "Major, Not covered."
- [ ] Color is never the only signal: `Not covered` carries the word, best-in-row carries
      the `best` token, not just a tint. (WCAG 1.4.1)
- [ ] Contrast ≥ 4.5:1 for all spec text on its background (the muted `Not covered` and
      governance line included).
- [ ] Sticky header/column don't trap keyboard focus; tab order follows reading order.
- [ ] Compare checkboxes are labelled (`aria-label="Compare {carrier} {plan}"`).
- [ ] Year-1/Later toggle uses `aria-pressed`; changing it updates an `aria-live` note.
- [ ] Mobile swipe columns have an equivalent non-swipe control (prev/next buttons).
- [ ] Tap targets ≥ 44×44px; whole card linkable but CTAs are distinct focusable buttons.
- [ ] Respect `prefers-reduced-motion` for any sticky-bar/scroll-snap animation.

---

## 3. Do / Don't

**Do**
- Show all five coverage categories on every surface, every time, in fixed order.
- Make the premium the largest number; pair it with annual max + deductible.
- Render `Not covered` explicitly and consistently.
- Keep one quiet governance line per plan; push provenance to the source drawer.
- Highlight best-in-row only where "better" is unambiguous, with a caveat.
- Cap side-by-side comparison at 3–4 columns.

**Don't**
- Don't bury a coverage percentage inside a paragraph.
- Don't stamp "Needs verification" on every tile/cell (the core problem to fix).
- Don't leave a coverage cell blank — blank reads as unknown, not "not covered."
- Don't mark more than one plan "Most popular."
- Don't show a bare price without `From` + `illustrative`.
- Don't hide Major / Implants / Ortho to save space on mobile.
- Don't heatmap an entire single card; reserve difference-highlighting for the table.

---

## 4. Acceptance criteria (per surface)

**Plan card (File 02)**
- [ ] Carrier, name, plan-type pill, price, annual max, deductible, 5-cell coverage strip,
      coverage-starts, network, one "best for" line, 2 CTAs, 1 governance line — all present.
- [ ] Price is the largest element; `From` + `illustrative` shown.
- [ ] All 5 coverage cells render even when null.
- [ ] ≤ 1 "Most popular" per list.

**Comparison table (File 03)**
- [ ] Rows in fixed File 01 order, grouped Cost / Limits / Coverage / Practical.
- [ ] Sticky plan header + sticky spec-label column.
- [ ] `Not covered` cells visible; best-in-row highlighted only on unambiguous rows + caveat.
- [ ] 3–4 columns max; compare bar adds/removes plans; selection persists.
- [ ] Mobile uses swipe-columns or stacked-accordion, never a squished table.

**Detail page (File 04)**
- [ ] Consolidated spec sheet appears directly under the H1, above the fold.
- [ ] Every coverage % lives only in the coverage grid (no duplicate prose figures).
- [ ] "Best for / Skip if" verdict directly under the spec sheet.
- [ ] Exactly one muted governance line in the spec sheet; full provenance in source drawer.
- [ ] Secondary specs are a table, not prose.
- [ ] Under-review plans: one amber banner, grid cells read "Under review", page `noindex`.

**Data integrity (all surfaces)**
- [ ] Card, table, and detail render the **same** numbers from the **same** File 01 object.
- [ ] No price shown as national/fixed; all ZIP/state-qualified or illustrative.
- [ ] Every figure traceable to a source in the drawer.

---

## 5. Build order (recommended)

1. **File 01 data objects** — author the 8 `PlanSpec` objects once (port the existing brief
   JSON). Nothing renders correctly until this exists.
2. **Coverage-grid renderer** — the shared `% · wait` cell used by all three surfaces.
3. **Detail spec sheet (File 04)** — re-sequence one plan page; validate the new order.
4. **Plan card coverage strip (File 02)** — add `.pc-coverage` to hub/alt cards.
5. **Comparison table + compare bar (File 03)** — widen `.cov-table` to N columns.
6. **Governance cleanup** — strip per-cell "Needs verification" pills everywhere; replace
   with the single governance line + source drawer.
7. **QA against §4** on desktop + mobile + screen reader.

---

## 6. The one-sentence summary

> Author each plan's specs once as a fixed schema, render that schema as a 5-cell coverage
> strip on cards, a row=spec/column=plan matrix for comparison, and a specs-first sheet on
> the detail page — and move verification status from a badge on every number to a single
> quiet line plus a source drawer.
