# 08 — The 100/80/50 Coverage Grid (single cell renderer, three surfaces)

> CoverCapy · LIVE hub → real hub · health-insurance style · premiums FROZEN.
> Spec for the coverage grid: Preventive / Basic / Major / Implants / Orthodontics as
> rows; `% · wait` as the cell; covered / partial / not-covered readable in under 3 seconds.
> Grounded in the shipped markup at
> `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`.

---

## 1. The principle this enforces

Principle 3 (`00-research-findings-and-principles.md:86-88`):

> **Coverage is a grid, not a sentence.** Preventive / Basic / Major / Implants /
> Orthodontics as rows; % and waiting period as columns. Never describe a percentage in a
> paragraph when it belongs in the grid.

Paired with principle 8 (`:99-100`): **same data drives card, table, and detail page** —
author the cell once, render it three ways. The job of this component is to be that one
cell renderer.

File 04 (`04-plan-detail-spec.md:72`) fixes the row set and the cell format:

> **Coverage grid** — Preventive / Basic / Major / Implants / Ortho — `% · wait` —
> Full-width table, the focal element.

And a Year-1 vs later toggle lives on the grid (`04:77-78`), default Year 1, only shown
when a plan's rates change.

---

## 2. The real markup already shipped (humana-extend-5000.html)

The detail page already implements the exact cell. This is the source of truth — the live
hub reuses it verbatim, it is not reinvented.

### The cell — `.cov-cell` (icon + color + text triple)

The header comment states the design contract directly
(`humana-extend-5000.html:31`): *"Coverage states read by icon + color + text in under 3
seconds."*

Three states, three CSS classes, three color tints, three icons:

| State | Class | Icon (inline 24×24 SVG path) | Text example |
|---|---|---|---|
| **Covered** | `.cov-cell.is-covered` | checkmark — `M5 13l4 4L19 7` | `100%` |
| **Partial** | `.cov-cell.is-partial` | half-filled circle — `M12 3a9 9 0 010 18z` + ring | `50%`, `$200/yr` |
| **Not covered** | `.cov-cell.is-none` | X — `M6 6l12 12M18 6L6 18` | `Not covered` |

The triple is deliberately redundant (icon AND color AND text) so the state survives
color-blindness, greyscale print, and a 3-second glance. Never ship a cell with only one
of the three.

### Color tokens (`humana-extend-5000.html:38-40`) — FROZEN, do not invent new values

```css
--covered:#0F9D6E;  --covered-ink:#0A5D43;  --covered-tint:#E4F6EE;
--partial:#B26A00;  --partial-ink:#7A4A00;  --partial-tint:#FBEFD9;
--notcov:#64748B;   --notcov-ink:#475569;   --notcov-tint:#EEF1F4;
```

Covered = green, partial = amber/ochre (not red — partial is still a benefit), not-covered
= neutral slate-grey (not danger-red — "not covered" is a fact, not an error). The grey is
the quiet choice on purpose: a not-covered row should recede, not alarm.

### The cell CSS (`humana-extend-5000.html:168-172`)

```css
.cov-cell{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;padding:4px 11px;border-radius:var(--r-pill)}
.cov-cell svg{width:13px;height:13px}
.cov-cell.is-covered{background:var(--covered-tint);color:var(--covered-ink)}
.cov-cell.is-partial{background:var(--partial-tint);color:var(--partial-ink)}
.cov-cell.is-none{background:var(--notcov-tint);color:var(--notcov-ink)}
```

A pill: tinted background, ink-colored text + icon, `font-weight:600`. The icon inherits
`currentColor`, so the ink token colors both glyph and text in one declaration.

### The row — `.covrow` grid (`humana-extend-5000.html:160-167`)

```css
.covrow{display:grid;grid-template-columns:1fr auto auto;gap:14px;align-items:center;
        padding:13px 24px;border-top:1px solid var(--line-soft);cursor:pointer;
        width:100%;text-align:left;background:none;border:none;font-family:inherit}
.cr-cat{font-size:14.5px;font-weight:600;color:var(--ink);display:flex;align-items:center;gap:8px}
.cr-pays{justify-self:end}
.cr-wait{font-size:12px;color:var(--ink-3);justify-self:end;white-space:nowrap;min-width:88px;text-align:right}
.cr-detail{grid-column:1/-1;display:none;...}        /* expands on click */
.covrow[aria-expanded="true"] .cr-detail{display:block}
```

Three columns: **category** (`1fr`, with chevron) · **`.cr-pays`** (the `.cov-cell`) ·
**`.cr-wait`** (the waiting period). The whole row is a `<button>` with
`aria-expanded` — clicking reveals `.cr-detail`, which spans the full width
(`grid-column:1/-1`). So the cell IS `% · wait` laid across two grid columns, and the row
is the progressive-disclosure unit (principle 7).

### One real row, verbatim (`humana-extend-5000.html:451-456`)

```html
<button class="covrow" aria-expanded="false" onclick="rowToggle(this)">
  <span class="cr-cat"><svg class="chev" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Preventive</span>
  <span class="cr-pays"><span class="cov-cell is-covered"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>100%</span></span>
  <span class="cr-wait">No wait</span>
  <span class="cr-detail">Cleanings, exams and routine X-rays — <b>covered in full</b> in-network from day one. Preventive visits usually don't count against your $5,000 maximum.</span>
</button>
```

The five canonical rows on the Humana page and their states:

| Row | State | Cell text | Wait |
|---|---|---|---|
| Preventive | covered | `100%` | No wait |
| Basic | partial | `50%` | 3-month wait |
| Major | partial | `50%` | 6-month wait |
| Implants | partial | `50%` | 6-month wait |
| Orthodontics | not covered | `Not covered` | `—` |
| (Whitening) | partial | `$200/yr` | 3-month wait |

Note: a not-covered row sets `.cr-wait` to an em-dash placeholder `—`, never a misleading
number. (The em-dash here is a typographic placeholder glyph in shipped markup, not body
copy — keep new copy em-dash-free per house rules.)

---

## 3. The cell as a single renderer — `% · wait` from one spec object

Author the spec object once (File 01 model), render the cell from it everywhere. The state
class is derived, not hand-typed:

```js
// state from the spec value — the single source of the icon+color+text triple
function covState(pays){
  if (pays === 'Not covered' || pays == null) return 'none';   // X · slate-grey
  if (pays === '100%')                         return 'covered';// check · green
  return 'partial';                                            // half-circle · amber
}                                                              // 50%, 60%, $200/yr → partial

const ICON = {
  covered: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  partial: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 010 18z" fill="currentColor"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>',
  none:    '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

// THE cell renderer — used by card mini-grid, detail grid, and comparison matrix
function covCell(pays){
  const s = covState(pays);
  return `<span class="cov-cell is-${s}">${ICON[s]}${pays}</span>`;
}
```

`% · wait` = `covCell(row.pays[year])` placed in `.cr-pays`, plus `row.wait[year]` placed
in `.cr-wait`. The **Year-1 / Later** toggle (`humana-extend-5000.html:444-448`,
`setYear()` at `:798-802`) flips `year` and re-renders the cells; on the Humana plan Major
and Implants go `50% → 60%` in year two. Default Year 1; only render the toggle when
`row.pays.year1 !== row.pays.year2` for some row.

---

## 4. How the SAME renderer feeds three surfaces

| Surface | Container | What it renders | Density |
|---|---|---|---|
| **Card mini-grid** | `.tcard` / pricing card | `covCell()` per row, no wait column, no expand | 3–5 rows, compact |
| **Detail grid** | `.covrow` × N | full `% · wait` + expandable `.cr-detail` | full width, focal |
| **Comparison matrix** | `<td>` per plan column | `covCell()` per (row × plan) cell | row=spec, column=plan |

The detail page already proves the renderer in two densities: the full `.covrow` grid
(`:451-491`) AND a compact treatment mini-grid `.tcard .tcf` (`:272-276`) that reuses the
same three ink tokens via state classes `.y` / `.m` / `.n`:

```css
.tcard .tcf.y{color:var(--covered-ink)}   /* yes  = covered */
.tcard .tcf.m{color:var(--partial-ink)}    /* maybe = partial */
.tcard .tcf.n{color:var(--notcov-ink)}     /* no    = not covered */
```

So the contract for the live hub: **the comparison matrix is just the detail grid pivoted**
— same `covCell()`, same tokens, same icons — laid out as `row = category, column = plan`.
The card mini-grid is the same `covCell()` with the wait column dropped. Three surfaces,
one renderer, zero retyped numbers (principle 8).

### Comparison-matrix delta highlighting (principle 4)

In the matrix, mark where plans differ: the not-covered cells already recede (grey), and
the best value per row gets a subtle ring. Add one class on top of the existing cell:

```css
.cmx td .cov-cell{width:100%;justify-content:center}      /* fill the column cell */
.cmx tr .cov-cell.is-best{box-shadow:0 0 0 1.5px var(--covered)}  /* row winner */
```

This keeps the cell renderer untouched; "best in row" is a matrix-level decoration, not a
new state.

---

## 5. Concrete HTML/CSS for the live hub

Drop-in. Tokens and `.cov-cell` rules are copied verbatim from the shipped page so the hub,
the card, and the detail page stay pixel-identical.

```html
<style>
/* tokens — FROZEN, from humana-extend-5000.html:38-40 */
:root{
  --covered:#0F9D6E; --covered-ink:#0A5D43; --covered-tint:#E4F6EE;
  --partial:#B26A00; --partial-ink:#7A4A00; --partial-tint:#FBEFD9;
  --notcov:#64748B;  --notcov-ink:#475569;  --notcov-tint:#EEF1F4;
  --ink:#0F1B25; --ink-3:#5E707B; --line-soft:#EAEFF3; --r-pill:999px;
}
/* THE cell — identical everywhere */
.cov-cell{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;padding:4px 11px;border-radius:var(--r-pill)}
.cov-cell svg{width:13px;height:13px}
.cov-cell.is-covered{background:var(--covered-tint);color:var(--covered-ink)}
.cov-cell.is-partial{background:var(--partial-tint);color:var(--partial-ink)}
.cov-cell.is-none{background:var(--notcov-tint);color:var(--notcov-ink)}

/* comparison matrix on the live hub: row = category, column = plan */
.cmx{width:100%;border-collapse:collapse;font-family:inherit}
.cmx th,.cmx td{padding:12px 14px;border-top:1px solid var(--line-soft);text-align:center;vertical-align:middle}
.cmx th[scope="row"],.cmx .cmx-cat{text-align:left;font-weight:600;color:var(--ink);white-space:nowrap}
.cmx thead th{font-size:13px;color:var(--ink-3);font-weight:600}
.cmx .cmx-wait{display:block;font-size:11px;color:var(--ink-3);margin-top:4px}
.cmx td .cov-cell{justify-content:center}
.cmx td .cov-cell.is-best{box-shadow:0 0 0 1.5px var(--covered)}
</style>

<table class="cmx" aria-label="Coverage comparison">
  <thead>
    <tr><th scope="col">Category</th><th scope="col">Humana Extend 5000</th><th scope="col">Plan B</th><th scope="col">Plan C</th></tr>
  </thead>
  <tbody>
    <!-- each cell is covCell(plan.pays) + a wait line; same renderer as the detail grid -->
    <tr>
      <th scope="row" class="cmx-cat">Preventive</th>
      <td><span class="cov-cell is-covered"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>100%</span><span class="cmx-wait">No wait</span></td>
      <td><span class="cov-cell is-covered"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>100%</span><span class="cmx-wait">No wait</span></td>
      <td><span class="cov-cell is-covered"><svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>100%</span><span class="cmx-wait">No wait</span></td>
    </tr>
    <tr>
      <th scope="row" class="cmx-cat">Major</th>
      <td><span class="cov-cell is-partial"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 010 18z" fill="currentColor"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>50%</span><span class="cmx-wait">6-month wait</span></td>
      <td><span class="cov-cell is-partial is-best"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 010 18z" fill="currentColor"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>60%</span><span class="cmx-wait">12-month wait</span></td>
      <td><span class="cov-cell is-none"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Not covered</span><span class="cmx-wait">—</span></td>
    </tr>
    <tr>
      <th scope="row" class="cmx-cat">Orthodontics</th>
      <td><span class="cov-cell is-none"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Not covered</span><span class="cmx-wait">—</span></td>
      <td><span class="cov-cell is-partial is-best"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3a9 9 0 010 18z" fill="currentColor"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/></svg>50%</span><span class="cmx-wait">12-month wait</span></td>
      <td><span class="cov-cell is-none"><svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Not covered</span><span class="cmx-wait">—</span></td>
    </tr>
  </tbody>
</table>
```

For the **card mini-grid**, reuse `covCell()` only — drop the `.cmx-wait` line and the
table; lay 3–5 categories in a tight `.tcard`-style flex column. For the **detail grid**,
use the shipped `.covrow` button rows verbatim (`humana-extend-5000.html:451-491`) so the
expand-for-detail behavior comes for free.

---

## 6. Rules / guardrails

- **Never write a coverage % in prose.** It lives only in a `.cov-cell` (principle 3).
- **Always ship the full triple** — icon AND color AND text. A bare `100%` with no icon, or
  a colored pill with no text, fails the 3-second / color-blind / greyscale-print test.
- **Tokens are frozen.** Use the nine `--covered/--partial/--notcov` vars; do not invent
  new colors. Partial is amber, not-covered is neutral grey — never red.
- **State is derived, never hand-typed.** `covState(pays)` decides the class so card,
  detail, and matrix can never drift out of sync.
- **One renderer, three surfaces.** Card mini-grid and comparison matrix call the same
  `covCell()` the detail grid uses. No retyped numbers (principle 8).
- **Not-covered wait = `—` placeholder**, never a misleading number.
- **Year toggle only when rates change** (`setYear()`); default Year 1.
- **Premiums FROZEN** — this component shows coverage %, not price; do not touch premium
  numbers.
- **No em-dashes in body copy** (the `—` in `.cr-wait`/`.cmx-wait` is a placeholder glyph,
  not a sentence).
- **Accessibility:** detail rows are `<button aria-expanded>`; matrix uses
  `<th scope>`. The icon+text pair means the cell is never color-only.

---

## 7. Source references

- Cell renderer + tokens + icons: `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`
  lines `31` (3-second contract), `38-40` (tokens), `153-177` (grid CSS),
  `268-276` (tcard mini-grid), `444-491` (the live rows + year toggle), `798-802` (`setYear`).
- Principles: `presentation-specs/00-research-findings-and-principles.md:86-88` (principle 3),
  `:99-100` (principle 8), `:89` (principle 4 — highlight differences).
- Row set + `% · wait` cell format + year toggle: `presentation-specs/04-plan-detail-spec.md:72`, `:77-78`.
