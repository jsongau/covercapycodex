# TYP2 — Numbers, Tables, Legibility Audit

**Scope:** Every place a number appears on `compare-ppo-dental-plans.html`. Coordinates with TYP1 (hierarchy); TYP2 owns data legibility, figure alignment, $/% formatting, big-price treatment, row readability, and size minimums. Premiums are FROZEN — no value changes, only presentation.

All line numbers reference `compare-ppo-dental-plans.html`. No em-dashes used.

---

## 1. Inventory of number-bearing surfaces (grounded)

| Surface | Selector(s) | Line(s) | Current treatment |
|---|---|---|---|
| Fit card price | `.fitcard .price` | 208 | serif italic 20px, `--ink-soft`, `float:right` |
| Fit card budget value | `.budget-val` | 196-197 | serif italic 26px |
| Matrix plan price | `.cmp-plan .pr` / `.pr small` | 251-252 | serif 21px + 12px small `/mo` |
| Matrix cell coverage flags | `.flag-now` / `.flag-wait` / `.flag-no` | 549-551 | green / rust / muted, 600 weight |
| Coverage flag string builder | `covCell()`, `cmpCell()` | 1440, 1532 | `$NNN/yr`, `NN%`, `N-mo wait` |
| Facts table desktop price | `.ft-price-big` / `small` | 338-339 | serif 17px/800 + 11px `/mo` |
| Facts table annual max | `.ft-max-val` / `.ft-y2` | 340-341 | sans 15px/700 + 11px Y2 |
| Facts table coverage % / $ | `.ft-cov-val` / `.ft-cov-val.good` / `.ft-wait` / `.ft-y2pct` | 344-347 | sans 13px/700, wait in rust 11px |
| Facts table mobile price | `.ft-mob-price b` / `small` | 358-359 | serif 24px + 11px |
| Facts table mobile cell value | `.ft-mob-val` / `.sub` / `.y2` | 364-366 | sans 13.5px/700 |
| Brief modal stats | `.brief-stat .n` / `.l` | 735-736 | serif 20px + 11px label |
| Brief modal coverage rows | `.brief-cov` / `.v` | 737-740 | 13.5px, value 600 |
| Credibility stats | `.cred-stat .n` / `.l` | 229-230 | serif 34px + 12.5px |
| Money formatter | `money()` | 1300 | `'$'+toLocaleString()` |
| Header TOC counts | `.toc-dd-panel a span` | 121 | already `tabular-nums` (only place) |

Color tokens (light): `--ink:#0F1B25`, `--green:#0E8C8B`, `--green-d:#0A6E6D`, `--rust:#C2410C`, `--muted:#5E707B`. Fonts: `--serif:'Inter Tight'`, `--sans:'Inter'`. Note: "serif" token is actually Inter Tight (a sans), so true tabular figures are available across the whole stack.

---

## 2. Findings

### F1 — Tabular figures used in exactly one place
`font-variant-numeric:tabular-nums` appears only at line 121 (TOC dropdown counts). Every price, max, deductible, percentage and the entire facts matrix render in proportional figures. In a comparison table this is the core defect: a `1` is narrower than a `9`, so `$1,500` and `$2,000` do not align on the decimal/comma, prices jitter column to column, and vertical scanning down the price column is harder than it should be. Tabular figures are the single highest-leverage fix and cost nothing (both fonts are Inter family, which ships proportional + tabular).

### F2 — Inconsistent currency/percent formatting in builder strings
- `covCell()` (1440) emits `'$'+o.allowance+'/yr'` with a raw number, no thousands separator, while `money()` (1300) applies `toLocaleString()` everywhere else. A $1500 allowance would print `$1500/yr` in the matrix but `$1,500` in the brief modal. Inconsistent.
- Percentages render as `o.pct+'%'` with no space (correct) but waits render `o.wait+'-mo wait'`. Mixed glue characters (`/yr`, `-mo`) read as data noise.
- Recommendation: route allowance through `money()` and standardize the unit suffix typographically (see CSS `.ft-unit` / smaller, muted, non-tabular).

### F3 — Big-price treatment is not distinct enough from body
The "hero number" of each plan is its monthly price. Currently:
- `.cmp-plan .pr` = 21px, same `--ink` as body, only differentiated by serif token.
- `.ft-price-big` = 17px/800 `--ink` — only 4px larger than the 13px cell text around it and the same color. It does not read as the primary figure.
- `.ft-max-val` = 15px/700 is nearly the same size as the price, flattening the hierarchy (TYP1 territory, flagged for coordination).
The big price should be the largest figure in its container, in a distinct color (`--ink` at full weight is fine, but it must out-size siblings by a clear step), with the `/mo` unit demoted (smaller, `--muted`, non-tabular). Current `/mo` smalls are already muted — good — but the ratio of price-to-unit and price-to-neighbors is too tight.

### F4 — Body/number sizes near or below the 13px floor
Minimum legible body size for data is 13px. Current sub-13px number/label offenders:
- `.cmp-plan .pr small` 12px, `.cmp-plan .car` 11px (1248), `.cmp-l`/`.cmp-c` are 12.5px (OK).
- `.ft-th` 12px, `.ft-cov-val` 13px (floor), `.ft-wait`/`.ft-y2`/`.ft-y2pct` 11px, `.ft-car` 11.5px.
- `.ft-mob-lbl` 10px, `.brief-stat .l` 11px, the inline `Y2` span at 1455 is hard-coded 10px.
Labels/captions at 10-11px are acceptable as uppercase letter-spaced metadata, but the 11px `--rust` `.ft-wait` and the 11px green `.ft-y2pct` carry real decision data (wait periods, year-two coverage) and sit below the floor. Bump these to 12px minimum and keep them tabular so the digits stay legible.

### F5 — Coverage flags rely on color alone
`.flag-now` (green), `.flag-wait` (rust), `.flag-no` (muted) differentiate state by hue + weight only. For colorblind users and low-contrast themes (dark/sepia/teal variants at 750+), the muted "Not covered" / "Under review" can lose contrast against `--paper-2` row backgrounds. Recommendation: keep color, but the rust/green semantics should also carry through weight (already 600) and the "no" state should not drop below `--muted` contrast. This is a legibility, not a color-redesign, ask — pair with the data-viz reviewer.

### F6 — Matrix and table rows: line length and row rhythm
- `.ft-td` padding `11px 13px` (334) with `font-size:13px` cells gives a tight 1.3 line-height in `.cmp-c` (257). For multi-line cells (e.g. `$1,500/yr` + wait note) the rust wait note crowds the value. Add a hair of leading and a consistent 2px gap (current `margin-top:2px` is fine but uneven across `.ft-wait` vs `.ft-y2`).
- `.feat-tbl-scroll table` has `min-width:900px` (326) which is correct for horizontal scroll, but with proportional figures the columns reflow on sort. Tabular figures freeze column widths, removing layout shift on sort/filter.
- `.brief-cov li` uses `justify-content:space-between` (738) — label left, value right. Right-aligned values MUST be tabular or the right edges will not align. Currently not tabular.

---

## 3. Copy-pasteable CSS block (keyed to real selectors)

Add as a dedicated block. It does not change any premium values, only their rendering. Place after the existing `.ft-*` rules so it cascades last.

```css
/* ===== TYP2: number legibility ===== */

/* F1 — tabular figures everywhere a number lives.
   Both --serif and --sans are Inter family, so tabular is available. */
.fitcard .price,
.budget-val,
.cmp-plan .pr,
.cmp-c,
.flag-now, .flag-wait, .flag-no,
.ft-price-big, .ft-max-val, .ft-y2,
.ft-cov-val, .ft-wait, .ft-y2pct,
.ft-mob-price b, .ft-mob-val, .ft-mob-val .sub, .ft-mob-val .y2,
.brief-stat .n, .brief-cov .v,
.cred-stat .n{
  font-variant-numeric:tabular-nums lining;
  font-feature-settings:"tnum" 1,"lnum" 1;
}

/* F3 — big-price treatment: price out-sizes neighbors, unit demoted.
   Premiums unchanged; only scale + weight + unit styling. */
.ft-price-big{font-size:19px;font-weight:800;letter-spacing:-.01em;color:var(--ink);}
.ft-price-big small{font-size:11px;font-weight:500;color:var(--muted);
  font-family:var(--sans);font-variant-numeric:normal;margin-left:1px;}
.cmp-plan .pr{font-size:23px;letter-spacing:-.01em;color:var(--ink);}
.cmp-plan .pr small{font-size:12px;color:var(--muted);font-variant-numeric:normal;}
.ft-mob-price b{font-size:25px;letter-spacing:-.01em;}
.ft-mob-price small{font-variant-numeric:normal;}

/* Keep annual-max a clear step BELOW the price (supports TYP1 hierarchy) */
.ft-max-val{font-size:14px;font-weight:700;}

/* F4 — lift decision-bearing micro-data to the 12px floor, keep tabular */
.ft-wait{font-size:12px;color:var(--rust);}
.ft-y2,.ft-y2pct{font-size:12px;color:var(--green-d);} /* green-d > green for contrast */
.ft-car{font-size:12px;}
.brief-stat .l{font-size:11px;} /* metadata label, may stay 11 */

/* F2 — currency/percent unit polish: demote the unit, never the figure */
.flag-now,.flag-wait{font-weight:600;}
.flag-no{color:var(--muted);font-weight:600;} /* weight carries state, not hue alone */

/* F6 — right-aligned values must align on their right edge */
.brief-cov .v{font-variant-numeric:tabular-nums lining;text-align:right;}
.ft-td{vertical-align:middle;}            /* steadier multi-line rows */
.ft-cov-val{font-size:13px;line-height:1.25;}
.ft-cov-val + .ft-wait{margin-top:3px;}   /* even gap value -> wait note */
```

### JS-side formatting fixes (one-line edits, no value changes)

- Line 1440 `covCell()`: change `'$'+o.allowance+'/yr'` to `money(o.allowance)+'/yr'` so the matrix matches `money()` thousands-separators used everywhere else (F2). `money()` is defined at line 1300, in scope.
- Line 1618 `'$'+o.allowance+'/yr'`: same fix, route through `money()`.
- Optional: wrap unit suffixes in a span so they can be styled (e.g. `'<span class="ft-unit">/yr</span>'`) and add `.ft-unit{font-size:.82em;color:var(--muted);font-variant-numeric:normal}`.

---

## 4. Coordination note for TYP1 (hierarchy)
TYP2 sets the figure scale only as far as needed for legibility/alignment. The price-vs-max-vs-cell size *ladder* (which number is biggest in each container) is a shared concern: TYP2 recommends price as the clear top figure with annual-max a step below and cell coverage a further step below. TYP1 owns the final type-scale ratios and serif/sans assignment. The tabular-nums block above is hierarchy-neutral and safe to ship regardless of TYP1's scale decisions.
