# Memo 20 — Master Gap Audit: live hub vs. health-insurance spec system

> CoverCapy · PPO redesign · Hub agent 20 · ANALYZE/SPEC only, no prototypes
> Target file: `/compare-ppo-dental-plans.html` (2,354 lines)
> Source of truth: `00-research-findings-and-principles.md`, `05-component-and-content-checklist.md`
> Premiums are FROZEN. No em-dashes in any added copy.

This memo ties the other 19 memos together. It lists, in priority order, every change
needed to turn the current editorial hub into a health-insurance-style spec hub, grounded
in real line numbers, and ends with a build sequence.

---

## What the hub already does right (do not rebuild)

- Comparison matrix exists with a **sticky plan header** (`.cmp-h{position:sticky;top:var(--toch)}`, line 203) and **empty tray slots** with add-a-plan selects (`renderCompareMatrix`, lines 1520-1544; `.cmp-empty`, lines 218-226).
- Compare bar / tray seeds with one plan and caps at 3 (`compare=new Set(['uhc'])`, line 1426; cap logic line 1469).
- Cards carry a coverage block (`.cov` list, lines 541-544; built at line 1443) and a crawlable static `<table>` fallback (lines 968-981).
- `covCell()` already renders `Not covered` / `100%, day one` / `50%, 12-mo wait` explicitly (line 1380) — close to the File 05 microcopy.
- Glossary tooltips on spec labels (`tipSpan`, line 1498) already deliver progressive disclosure of term meaning.

The work is **not** "add a matrix." It is "convert the editorial skin into the spec skin"
and add the four matrix affordances the spec calls for (spec strip, type pill, best-in-row,
quiet governance). Below, in priority order.

---

## Gap list (priority order)

### 1. Coverage shown as a vertical prose-ish list, not a horizontal 5-cell spec strip
- **Where:** card builder line 1443 (`<ul class="cov">…covLine…</ul>`), CSS `.cov` lines 541-544.
- **Spec ref:** File 00 §3.3 "Coverage is a grid, not a sentence"; File 05 §4 card AC "5-cell coverage strip."
- **Gap:** card lists 4 label/value rows stacked vertically (Cleanings / Fillings / Crowns / Implants) and omits **Ortho** entirely. The spec wants a fixed **5-cell strip** (Preventive · Basic · Major · Implants · Orthodontics) read left-to-right, every cell present even when null.
- **Fix:** add a `.pc-coverage` horizontal 5-cell strip component (label over `%·wait`), render all 5 categories in fixed order from `p.treatments`, render `Not covered` for nulls via the existing `covCell`. Replace the `.cov` `<ul>` at line 1443.

### 2. Specs buried under Fraunces serif "editorial" styling instead of dense scannable spec block
- **Where:** `--serif:'Fraunces'` driving prices and plan names across surfaces: `.pprice b` (537), `.pcard .pn` (527), `.cmp-plan .pn`/`.pr`/`.sc` (207-209), `.ft-price-big` (296), `.plc-score` (484), `.fitcard .pn`/`.price` (163,166).
- **Spec ref:** File 00 §2e "premium is the first thing the eye lands on, large/bold/distinct color"; §3.1 "specs before prose."
- **Gap:** prices and key numbers are set in italic Fraunces serif, which reads as a boutique magazine, not a benefits spec sheet. Numbers should be a tight bold sans so a buyer scans premium / max / deductible like a price table.
- **Fix:** introduce a spec-number type token (Inter Tight 700, tabular-nums) and apply to premium, annual max, deductible everywhere they render as data. Keep Fraunces only for section H2/H1 display headings, not for in-card data.

### 3. Comparison matrix has no best-in-row highlight (differences are hunted, not highlighted)
- **Where:** `CMP_ROWS` lines 1509-1519; render loop line 1539 (`'<div class="cmp-c">'+r[1](p)+'</div>'`).
- **Spec ref:** File 00 §3.4 "Differences are highlighted, not hunted"; File 05 §4 table AC "best-in-row highlighted only on unambiguous rows + caveat" and §1 best-in-row token `best`.
- **Gap:** every cell renders identically. A buyer comparing 3 columns cannot see which plan wins a row at a glance.
- **Fix:** for unambiguous rows only (annual maximum highest, monthly price lowest, deductible lowest, shortest wait per coverage tier) compute the winning slot and add a `best` token + tint to that cell. Add the caveat line "best spec is not the best plan for you." Skip ambiguous rows (network, vision).

### 4. No plan-type / "shape" pill on cards or matrix columns
- **Where:** card badges line 1440 (Best selling / +Vision / Ages); matrix column header line 1529-1530.
- **Spec ref:** File 00 §2c three plan shapes (Preventive / Basic / Major-Full); File 05 §1 pills `Preventive · Basic · Major / Full`, §4 card AC "plan-type pill present."
- **Gap:** cards group under tier headers (Essentials / Full / Maximum, lines 1450-1451) but no per-card **shape pill** the buyer can filter by in one glance; the matrix column shows no shape at all.
- **Fix:** map `p.tier` to a shape pill (`Preventive` / `Basic` / `Major / Full`) and render it on each card next to the carrier line and in each matrix column header.

### 5. Verification noise: two competing "verified" billboards instead of one quiet line
- **Where:** per-card `<span class="plan-verified">Verified Jun 2026</span>` (line 1439, CSS 509) PLUS the section-level reviewer bar with avatar "Sarah Chen" (lines 943-951). Matrix uses a "CoverCapy Recommended" badge with info icon (line 1530).
- **Spec ref:** File 00 §3.6 "Verification status is metadata, not a billboard — one small quiet confidence indicator"; File 05 §1 governance line `Last verified Jun 20, 2026 · illustrative · view sources`; §3 Don't "stamp verified on every tile."
- **Gap:** verification appears as a per-card stamp AND a section reviewer bar AND a matrix recommendation badge — three loud signals. The spec wants **one quiet governance line per plan** plus a source drawer.
- **Fix:** replace the per-card `plan-verified` stamp with one muted governance line at the card foot using the File 05 string. Demote the reviewer bar to a single quiet "Last verified Jun 2026 · view sources" line linking a source drawer. Keep the methodology `ⓘ` but as a quiet link, not a green recommendation badge.

### 6. Price shown without consistent "From" + "illustrative" qualifier
- **Where:** card `.pprice` line 1441 (`money(p.monthly)+'/mo'`); matrix `.pr` line 1531; feature table `.ft-price-big`; static table cells (`$75`, line 972).
- **Spec ref:** File 00 §3.5 "price is honest but present, illustrative/ZIP-gated qualifier"; File 05 §1 `From $30/mo` + small `illustrative`, §3 Don't "show a bare price without From + illustrative."
- **Gap:** premiums render as bare exact figures ("$75/mo") with no `From` prefix and no `illustrative` tag, despite premiums being frozen/illustrative. The ZIP gate exists in the hero but the prices below it read as quotes.
- **Fix:** prefix data premiums with `From` and append a small `illustrative` tag (with the ZIP tooltip string from File 05 §1). Do NOT change the frozen numbers themselves.

### 7. Coverage percentages duplicated in prose (`best` blurb) instead of living only in the grid
- **Where:** `p.best` blurb rendered at card line 1442 and matrix-adjacent copy; static "Best for" column lines 972-979 mixes percentages into sentences ("rises to 50% in year two").
- **Spec ref:** File 00 §3.3; File 05 §4 detail AC "every coverage % lives only in the coverage grid (no duplicate prose figures)," §3 Don't "bury a coverage percentage inside a paragraph."
- **Gap:** Year-2 step-ups and percentages live in prose strings, so the same number appears in two places and can drift.
- **Fix:** move graduated/Year-2 figures into a Year-1 / Later toggle on the coverage grid (File 00 §2d, File 05 §2 `aria-pressed` toggle). Keep the blurb to a non-numeric "best for" sentence.

### 8. Mobile comparison collapses to a horizontally scrolled squished grid, not swipe-columns/accordion
- **Where:** `#compareMatrix{overflow-x:auto}` + `.cmp-grid{min-width:560px}` and "Scroll to compare" hint (lines 412-413, 431).
- **Spec ref:** File 05 §2 "mobile swipe columns have an equivalent non-swipe control"; §4 table AC "mobile uses swipe-columns or stacked-accordion, never a squished table."
- **Gap:** mobile just shrinks/scrolls the same grid (the Don't in the AC). No prev/next column control, no stacked accordion.
- **Fix:** add a mobile prev/next plan toggle (one column visible at a time) or a stacked per-spec accordion, with the non-swipe control required by a11y.

### 9. Coverage grid is built as `<div>`s, not a semantic `<table>` with `<th scope>`
- **Where:** `.cmp-grid` is a CSS-grid of `<div>`s (line 1526-1540); card `.cov` is a `<ul>` (line 1443). Only the hidden static fallback (line 968) is a real table.
- **Spec ref:** File 05 §2 "coverage grid is a real `<table>` with `<th scope>` … not a `<div>` grid. Screen readers must announce 'Major, Not covered.'"
- **Gap:** the live interactive matrix and card strips are non-semantic, so screen readers cannot announce category + value pairs.
- **Fix:** rebuild the interactive matrix as a `<table>`/`<th scope="row">` + `<th scope="col">` structure (sticky via CSS, not via div layout). Give the card strip `aria-label`s per cell at minimum.

### 10. Matrix spec-label column is not sticky, and tray selection does not persist across sort/render
- **Where:** `.cmp-corner`/`.cmp-l` have no sticky-left (lines 204, 214); `compare` Set is in-memory only (line 1426), reset on reload.
- **Spec ref:** File 05 §4 table AC "sticky plan header + sticky spec-label column," "compare bar adds/removes plans; selection persists."
- **Gap:** the left spec-label column scrolls away horizontally on narrow viewports, and a reload loses the buyer's pinned comparison.
- **Fix:** make the first column `position:sticky;left:0`. Persist the `compare` Set to `localStorage`/URL param so a pinned comparison survives reload and is shareable.

---

## Cross-cutting (lower priority, fold into the above)

- **Calculator / planner sprawl:** numbers also scatter into the collapsible planner (`#planner`, lines 461-500) and fit-card (`.fitcard`). Keep one canonical spec object per plan (`PLANS` JSON, line 1218) feeding card + matrix + planner so no surface retypes figures (File 00 §3.8).
- **"Under review" handling is good** (line 1470 `cmpCell` returns `Under review`) — keep; it matches File 05 §4 under-review AC. Just ensure the amber banner + `noindex` exist on any standalone detail page.
- **No em-dash audit:** existing copy uses commas already; any new governance/caveat strings must avoid em-dashes per project rules.

---

## Recommended build sequence (what to edit first)

Mirrors File 05 §5 build order, mapped to this file's real symbols:

1. **Canonical spec object** — confirm every field the strip/matrix needs lives on the `PLANS` JSON (line 1218): `treatments.{preventive,basic,major,implant,orthoAdult,orthoChild}`, `annualMax`, `deductible`, `network`, `tier`. Add Ortho where missing. Nothing else renders right until this is complete.
2. **Shared coverage-cell renderer** — `covCell()` (line 1380) already exists; extend it to carry the `best` token and Year-1/Later state, then reuse on every surface.
3. **Card coverage strip (Gap 1) + spec-number type (Gap 2)** — swap the `.cov` `<ul>` (line 1443) for `.pc-coverage` 5-cell strip and retype premium/max/deductible in tabular sans. This is the most visible single change.
4. **Plan-type pill (Gap 4)** + **From/illustrative price qualifier (Gap 6)** — cheap, high-signal card edits, same `planCard()` function.
5. **Matrix best-in-row + semantic table (Gaps 3, 9)** — rework `CMP_ROWS`/`renderCompareMatrix` (lines 1509-1544) into a `<table>` with computed winners.
6. **Governance cleanup (Gap 5)** — strip the per-card `plan-verified` stamp and demote the reviewer bar to one quiet line + source drawer.
7. **Sticky label column + persistence (Gap 10)** and **mobile swipe/accordion (Gap 8)** — polish once structure is semantic.
8. **QA against File 05 §4** on desktop, mobile, and screen reader.

Start with steps 1-3: they convert the editorial card into the spec card, which is the
single biggest visual shift from "boutique" to "benefits hub" and unblocks everything else.
