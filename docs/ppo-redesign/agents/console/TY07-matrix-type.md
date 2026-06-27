# TY07 — Comparison Matrix Typography & Cell Legibility

File: `compare-ppo-dental-plans.html`
Scope: ANALYZE / SPEC only. Grounded in real CSS + JS lines. No em-dashes.

---

## 1. What exists today (ground truth)

### Markup / render path
- Render fn: `renderCompareMatrix()` at line 1507. Mounts into `#compareMatrix`.
- Grid container built inline: `<div class="cmp-grid" style="--cols:3">` (line 1513). Grid template lives at CSS line 212: `grid-template-columns:minmax(120px,210px) repeat(var(--cols),minmax(0,1fr))`.
- Row defs in `CMP_ROWS` (lines 1496-1506). Each row = `[labelHtml, valueFn]`. Rendered at line 1526: label into `.cmp-l`, value into `.cmp-c` (or `.cmp-c.cmp-c-empty` for empty slots).
- The matrix has NO visual grouping of band/row labels today. Every row is a flat `.cmp-l` label cell. Rows fall into implied bands: Plan facts (annual max, coverage active, monthly, deductible, network, activation), then Procedures (cleanings, fillings, crowns/root canals, implants, orthodontics, whitening, vision).
- Orthodontics is a single merged row: `['Orthodontics',p=>orthoCellHtml(p)]` (line 1504), distinct from the other procedure rows which call `cmpCell(p,k)`.

### Cell content generators
- `cmpCell(p,k)` (line 1457) -> `covCell(o)` (line 1365).
- `covCell` emits a single `<span>` with class `flag-now` (green), `flag-wait` (rust/amber), or `flag-no` (grey muted), text forms: `"100%, day one"`, `"80%, 6-mo wait"`, `"$350/yr, 6-mo wait"`, `"Not covered"`, `"Under review"`.
- `orthoCellHtml(p)` returns the same flag-span family (combined ortho cell).

### Relevant CSS (current)
- `.cmp-grid` line 212, `.cmp-h` (sticky header) line 213, `.cmp-corner` 214, `.cmp-plan` 215-221.
- Plan header type: `.cmp-plan .car` (carrier, 11px uppercase), `.pn` (serif 17px name), `.sc` (sage recommended pill), `.pr` (serif 21px price). Lines 216-220.
- `.cmp-l` (row label) line 224: `padding:12px 14px;font-size:12.5px;font-weight:600;background:var(--paper-2)`.
- `.cmp-c` (value cell) line 225: `padding:12px 14px;font-size:12.5px;...display:flex;align-items:center;line-height:1.3`.
- `.cmp-c-empty` line 226.
- Flag colors: `.flag-now` line 513 (`--green`, 600), `.flag-wait` line 514 (`--rust`, 600), `.flag-no` line 515 (`--muted`).
- Tokens: `--green:#0E8C8B`, `--green-d:#0A6E6D`, `--rust:#C2410C`, `--muted:#5E707B`, `--paper-2:#EAEFF3`, `--sage:#E2F4F3`, `--card:#FFFFFF`, `--line:#DCE4EA`, `--ink:#0F1B25`, `--toch:52px`. (lines 34-60). Sticky header pins to `top:var(--toch)`.

---

## 2. Problems identified

1. The `% , wait` cell is a single inline run. The percent (the number a user scans for) has no typographic priority over the wait clause. Both are the same 12.5px weight as the row label, so the eye cannot separate "how much" from "when".
2. No tabular numbers anywhere. `90%` and `100%` and `$1,500` do not align vertically column to column, so quick down-column scanning is noisy.
3. Status is carried by hue alone (green / rust / grey). At a glance, and for color-vision-deficient users, covered vs partial vs not-covered are not distinguishable without reading the text. No tint, icon, or weight reinforcement.
4. Row height is shallow (12px padding, 1.3 line-height). When a cell wraps to two lines (percent + wait + Y2) it visually collides with the neighbor row; when it is one short line the band reads cramped against the sticky header.
5. Band labels (Plan facts vs Procedures) are not differentiated from individual row labels. The merged Orthodontics row reads identically to single-procedure rows.
6. No best-in-row marker exists. A user comparing 3 plans cannot see which column wins a given row.

---

## 3. Spec

### 3a. Sticky plan-name / price header (`.cmp-h.cmp-plan`)
- Keep serif `.pn` for the plan name but cap at 17px / line-height 1.08 (already set) and allow 2-line clamp so long names do not push the price down inconsistently across the 3 columns.
- Carrier `.car`: 11px, 600, uppercase, `letter-spacing:.04em`, color `--muted`. (unchanged, correct.)
- Price `.pr`: serif 21px, color `--ink`, with tabular numerals so the three column prices align on the decimal. `/mo` stays sans 12px `--muted`.
- The whole header band keeps `position:sticky; top:var(--toch)` with a 2px `--green` bottom rule (line 213) so it reads as the anchor while scrolling the rows.

### 3b. Band labels and row labels (`.cmp-l`)
- Row label: 12.5px / 600 / `--ink`, `--paper-2` background (current). Keep.
- Introduce a band-header variant `.cmp-l.cmp-band`: 10.5px, 700, uppercase, `letter-spacing:.08em`, color `--muted`, slightly taller, spanning the label column above each group (Plan facts, Procedures). This is additive; existing rows keep `.cmp-l`.
- Merged Orthodontics label stays `.cmp-l` (single row, no special treatment needed beyond the combined cell).
- Spec names (the row labels) keep the dotted `cc-tip` underline where a tooltip exists; that styling is already correct and should not be overridden.

### 3c. The `% , wait` coverage cells
This is the core legibility fix. The cell should read as two stacked tokens, not one run:
- Line 1 (value): the percent or allowance, large, bold, tabular. This is the glance target.
- Line 2 (qualifier): the wait clause OR "day one", small, muted, regular weight.
- Status is encoded three ways, not one: hue (green / amber / grey), a left tint strip on the cell, and weight (covered = heaviest).
  - Covered (no wait): green value, `--sage` left tint.
  - Partial (has wait, or Y1 reduced): amber value (`--rust`), warm tint.
  - Not covered / under review: grey value (`--muted`), no tint, plain.
- Tabular numerals via `font-variant-numeric:tabular-nums` so percents and dollars align down each column.
- Adequate row height: min-height ~52px, cell padding 14px 14px so single-line and two-line cells share a baseline rhythm.

NOTE: realizing the two-line split fully requires the cell generators (`covCell`, `orthoCellHtml`) to wrap value and qualifier in separate spans (`.cc-val` + `.cc-q`), mirroring the existing `ftCovCell` pattern (line 1534) which already splits `.ft-cov-val` + `.ft-wait`. The CSS below targets those classes and also degrades gracefully on the current single-span `flag-*` output (it just colors and weights the inline text). JS change is OUT OF SCOPE for this memo but is the prerequisite for the stacked layout.

### 3d. Future best-in-row marker
- Reserve a `.cmp-c.cmp-best` modifier: a 2px inset ring in `--green`, a small corner pip, and a visually-hidden "Best in row" label for screen readers. Applied by render logic (future) to the winning column per coverage row using the same scoring already present in `ftSortVal` (lines 1547-1559: `pct*100 - wait*5`).

---

## 4. Copy-pasteable CSS (matrix cells only)

Drop in after the existing `.cmp-c` rules (around line 226). All values reference existing tokens.

```css
/* ===== TY07: matrix cell typography + legibility ===== */
/* value cell base: taller, padded, tabular */
.cmp-c{
  min-height:52px;
  padding:14px 14px;
  font-size:12.5px;
  line-height:1.25;
  flex-direction:column;
  align-items:flex-start;
  justify-content:center;
  gap:2px;
  font-variant-numeric:tabular-nums;
  position:relative;
}

/* primary value (percent / $ allowance) — the glance target */
.cmp-c .cc-val{
  font-size:15px;
  font-weight:700;
  line-height:1.1;
  color:var(--ink);
  font-variant-numeric:tabular-nums;
}
/* qualifier line (wait / day one) — secondary */
.cmp-c .cc-q{
  font-size:11px;
  font-weight:500;
  color:var(--muted);
  line-height:1.2;
}

/* status: hue + tint + weight, not hue alone */
.cmp-c .flag-now,
.cmp-c .cc-val.is-covered{ color:var(--green-d); font-weight:700; }
.cmp-c .flag-wait,
.cmp-c .cc-val.is-partial{ color:var(--rust);    font-weight:700; }
.cmp-c .flag-no,
.cmp-c .cc-val.is-none{ color:var(--muted); font-weight:600; }

/* left tint strip reinforces status without relying on color of text */
.cmp-c.is-covered{ box-shadow:inset 3px 0 0 var(--green); background:color-mix(in srgb,var(--sage) 55%,transparent); }
.cmp-c.is-partial{ box-shadow:inset 3px 0 0 var(--rust);  background:color-mix(in srgb,#F3E4D8 60%,transparent); }
.cmp-c.is-none{ background:var(--card); }

/* empty slot cell stays quiet */
.cmp-c.cmp-c-empty{ min-height:52px; }

/* band header variant of the label column */
.cmp-l.cmp-band{
  font-size:10.5px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--muted);
  padding:14px 14px 8px;
}

/* sticky price gets tabular alignment across columns */
.cmp-plan .pr{ font-variant-numeric:tabular-nums; }

/* future best-in-row marker */
.cmp-c.cmp-best{ box-shadow:inset 0 0 0 2px var(--green); }
.cmp-c.cmp-best::after{
  content:"";position:absolute;top:6px;right:6px;
  width:7px;height:7px;border-radius:50%;background:var(--green);
}
.cmp-c.cmp-best .cc-best-sr{
  position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);
}
```

Dark / handbag themes: all rules reference `--green-d`, `--rust`, `--muted`, `--sage`, `--card`, `--ink`, which are redefined in the `[data-theme]` blocks (lines 714, 738, 769), so the cell styling re-tones automatically. `color-mix` tints derive from `--sage` and a fixed warm tint; if a fully token-driven warm tint is wanted, add a `--amber-soft` token per theme.

---

## 5. Dependency note
The stacked `.cc-val` + `.cc-q` layout and the `is-covered` / `is-partial` / `is-none` cell classes require a small JS change in `covCell` (line 1365) and `orthoCellHtml` to emit the split spans and the status class. That JS is out of scope here. Until then, the `.flag-*` selectors in the block keep the current single-line output correctly colored and weighted.
