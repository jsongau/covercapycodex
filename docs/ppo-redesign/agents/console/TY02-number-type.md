# TY02 — Number & Tabular Typography Spec

Console agent memo. Audit + spec for numeric/data type on
`compare-ppo-dental-plans.html` (post health-tech reskin).
Analysis only. No prototypes. Premiums are FROZEN (visual treatment only,
no value changes).

---

## 1. Audit — what the live CSS actually does

All line refs are from the live file.

### Token reality check (lines 32-60)
- `--serif: 'Inter Tight', system-ui, sans-serif;` (line 56) — despite the
  name, `--serif` is **Inter Tight**, a sans. There is no real serif on this
  page. Every "serif" number below is therefore already Inter Tight. The
  mandate ("Inter Tight for all data") is largely met by accident, but it is
  fragile (one rename of `--serif` breaks it) and **none of these rules set
  `font-variant-numeric`**, so figures render with proportional digits and do
  not column-align.
- `--sans: 'Inter'` (line 57) — used for the `/mo` suffixes and small print.
- Color tokens in play: `--ink:#0F1B25` (body), `--muted:#5E707B`,
  `--green:#0E8C8B`, `--green-d:#0A6E6D`, `--rust:#C2410C`, plus the coverage
  triad `--covered:#0F9D6E / --partial:#B26A00 / --notcov:#64748B` (lines
  53-55).

### Big price — `.pprice` / `.pprice b` (lines 546-549)
```
.pprice{display:flex;align-items:baseline;gap:6px;margin:6px 0 14px}
.pprice b{font-family:var(--serif);font-size:30px}
.pprice span{color:var(--muted);font-size:13px}
.pprice.review b{font-size:18px;color:var(--muted);font-family:var(--sans);font-weight:600}
```
Findings:
- The `$X` number is **30px, no weight set** (inherits `<b>` = 700) and **no
  color set**, so it falls to `--ink` — i.e. it is the *same color as body
  text*. The mandate requires the price to be the largest AND most distinct
  element on the card. It is the largest, but it is not visually distinct: it
  reads as bold body copy.
- No `tabular-nums`. `$30` vs `$129` will not align across the card grid.

### Card plan name — `.pcard .pn` (line 537) and compact variants
```
.pcard .pn{font-family:var(--serif);font-size:21px;margin-top:2px}
.fitcard .pn{font-family:var(--serif);font-size:24px;line-height:1.1}   (173)
.cmp-plan .pn{font-family:var(--serif);font-size:17px;...}               (217)
.pcard-h .pn{font-size:13px}                                            (456)
```
The fitcard `.pn` at 24px competes with the price visually; not a digit
problem but relevant to "price must be the largest" — see §4.

### Comparison matrix — `.cmp-*` (lines 212-236)
```
.cmp-plan .pr{font-family:var(--serif);font-size:21px;margin-bottom:11px;line-height:1}   (219)
.cmp-plan .pr small{font-size:12px;color:var(--muted);font-family:var(--sans)}            (220)
.cmp-c{padding:12px 14px;font-size:12.5px;border-left:1px solid var(--line);...}          (225)
.cmp-l{...font-size:12.5px;font-weight:600;...}                                           (224)
```
Findings:
- `.cmp-plan .pr` (per-column price in the matrix header) is 21px Inter Tight,
  no color, no tabular-nums.
- `.cmp-c` are the data cells — they hold the percentages, annual maximums,
  deductibles, waiting periods. **No `font-variant-numeric`** and they inherit
  `--sans` (Inter), so the numeric values inside a row do NOT column-align
  vertically. This is the single worst tabular offender: a comparison matrix
  whose numbers don't line up.

### Coverage-state flags — `.flag-*` (lines 513-515)
```
.flag-now{color:var(--green);font-weight:600}
.flag-wait{color:var(--rust);font-weight:600}
.flag-no{color:var(--muted)}
```
Findings:
- These are the in-cell state labels (Covered now / Waiting period / Not
  covered). They use `--green`, `--rust`, `--muted` — NOT the dedicated
  coverage triad tokens (`--covered/--partial/--notcov`) added during the
  reskin (lines 53-55). Inconsistent with the new health signal system.
- **Color collision risk:** `--green (#0E8C8B)` is the brand teal. If the price
  is given a green/teal accent (a natural choice), the price would share a hue
  with `.flag-now`. The price color must be chosen to stay distinct from BOTH
  body ink AND the coverage-state colors (see §3).

### Plan brief modal stats — `.brief-stat .n` (lines 697-700)
```
.brief-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:18px 0}
.brief-stat{background:var(--paper-2);border-radius:11px;padding:12px 14px}
.brief-stat .n{font-family:var(--serif);font-size:20px}
.brief-stat .l{font-size:11px;color:var(--muted);...}
```
Findings:
- Three stats side by side (typically annual max, deductible, a percentage).
  20px Inter Tight, no color, **no tabular-nums**. Because they sit in a
  3-column grid, mis-aligned proportional digits are visible directly.

---

## 2. The fix in one sentence

Apply `font-variant-numeric: tabular-nums` (with `lining-nums`) to every
numeric surface, pin them all explicitly to Inter Tight, and give the big
`From $X/mo` price a single distinct treatment — larger, heavier, in a price
color that is neither body ink nor any coverage-state color.

---

## 3. Color decision for the price

- Must differ from `--ink` (#0F1B25, body) — currently identical. FAIL today.
- Must differ from coverage states `--covered #0F9D6E`, `--partial #B26A00`,
  `--notcov #64748B`, and from the flag colors `--green #0E8C8B`,
  `--rust #C2410C`.
- **Recommendation:** introduce a dedicated `--price` token set to
  **`--green-d` (#0A6E6D)** — the deep brand teal. It is darker and more
  saturated than `--flag-now`'s `--green #0E8C8B`, so the price still reads as
  "the brand's confident number" without colliding with the lighter in-cell
  "Covered now" green. If product wants maximum separation from all greens,
  fall back to `--ink-soft #33444F` at heavier weight — distinct from pure body
  ink by lightness, distinct from every state color by being neutral. Spec
  below ships the `--green-d` option as default; swap one token to switch.

---

## 4. Spec — copy-pasteable CSS block

Add a `--price` token to `:root` (alongside the coverage triad, ~line 55), then
paste the block. These rules override the audited ones; keep them after the
originals in the cascade, or edit the originals in place.

```css
/* ===== TY02: numeric / tabular typography ===== */
:root{
  /* price hue — distinct from --ink (body) and from all coverage-state colors */
  --price:#0A6E6D;            /* = --green-d; swap to #33444F for max neutral separation */
  /* one switch to flip all data digits to tabular lining figures */
  --num: 'Inter Tight', system-ui, sans-serif;
}

/* shared numeric behavior: tabular lining figures, Inter Tight, on every data surface */
.pprice b,
.pprice.review b,
.pprice span,
.cmp-plan .pr,
.cmp-plan .pr small,
.cmp-c,
.cmp-l,
.brief-stat .n,
.flag-now, .flag-wait, .flag-no{
  font-family:var(--num);
  font-variant-numeric:tabular-nums lining-nums;
  font-feature-settings:"tnum" 1,"lnum" 1;
}

/* big price — largest + most distinct element on a card */
.pprice b{
  font-size:34px;          /* up from 30; clears the 24px fitcard .pn */
  font-weight:700;
  line-height:1;
  color:var(--price);      /* no longer falls through to body --ink */
  letter-spacing:-.015em;  /* tighten large lining figures */
}
.pprice span{              /* the "/mo" suffix — small, muted, Inter, NOT tabular-styled visually */
  color:var(--muted);
  font-size:13px;
  font-family:var(--sans);
  font-variant-numeric:normal;
  font-weight:500;
}
.pprice.review b{          /* keep the muted, de-emphasized review-state price */
  font-size:18px;
  color:var(--muted);
  font-weight:600;
}

/* matrix header price */
.cmp-plan .pr{ color:var(--price); font-weight:700; }
.cmp-plan .pr small{ color:var(--muted); font-family:var(--sans); font-variant-numeric:normal; }

/* matrix data cells + brief stats: align $ and % down each column */
.cmp-c,
.brief-stat .n{ font-variant-numeric:tabular-nums lining-nums; }
.brief-stat .n{ color:var(--ink); }   /* stats stay neutral ink; price is the only colored number */

/* coverage-state flags use the reskin triad, not the legacy brand/rust greens */
.flag-now{ color:var(--covered); font-weight:600; }   /* #0F9D6E */
.flag-wait{ color:var(--partial); font-weight:600; }  /* #B26A00 */
.flag-no{ color:var(--notcov); font-weight:600; }     /* #64748B */
```

### Formatting consistency for `%` and `$` (content rule, enforce in JS render)
- `$` values: no space, no decimals on whole dollars (`$30`, `$1,500`), comma
  thousands separators for annual maximums. The price `<b>` should contain the
  full `$30` string (glyph + digits) so tabular alignment includes the `$`.
- `%` values: integer + `%` with no space (`80%`, `100%`). Keep `%` inside the
  same tabular-styled element so columns align.
- The `/mo` and `/yr` qualifiers always live in the separate `.pprice span` /
  `small` (Inter, muted, non-tabular) — never inside the figure.

---

## 5. Selectors to change (checklist)

| Selector | Line(s) | Change |
|---|---|---|
| `:root` | 52-55 | Add `--price` and `--num` tokens |
| `.pprice b` | 547 | +size 34px, +weight 700, +color `--price`, +tabular-nums, +letter-spacing |
| `.pprice span` | 548 | +`font-variant-numeric:normal`, pin `--sans`, weight 500 |
| `.pprice.review b` | 549 | keep muted; inherits tabular shared rule |
| `.cmp-plan .pr` | 219 | +color `--price`, +weight, +tabular-nums |
| `.cmp-plan .pr small` | 220 | +`font-variant-numeric:normal` (suffix, non-tabular) |
| `.cmp-c` | 225 | +tabular-nums (column alignment of matrix data) |
| `.cmp-l` | 224 | +tabular-nums (row labels may carry figures) |
| `.brief-stat .n` | 699 | +tabular-nums, explicit `--ink` |
| `.flag-now` | 513 | color `--green` -> `--covered` |
| `.flag-wait` | 514 | color `--rust` -> `--partial` |
| `.flag-no` | 515 | color `--muted` -> `--notcov`, +weight 600 |

No em-dashes used. Premium values untouched; treatment is purely visual.
