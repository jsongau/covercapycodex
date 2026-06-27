# Comparison Matrix Spec — Hub Centerpiece

> Agent hub20 · File 03 · Maps the ZIP comparison-table spec + ZIP compare markup onto the LIVE page's `renderCompareMatrix` / `#compareMatrix`. Analysis and spec only. Premiums FROZEN. No em-dashes.

---

## 0. Source grounding (real paths and lines)

**Spec:** `docs/ppo-redesign/_zip-21jun/ppo/presentation-specs/03-comparison-table-spec.md`
- Four row bands: Cost / Limits / Coverage (100-80-50 + implants + ortho) / Practical (lines 41-51)
- Sticky header row + sticky first column (lines 57-59)
- Best-in-row `◆ best` only on unambiguous rows, with footnote "best spec ≠ best plan for you" (lines 60-62)
- `Not covered` muted/italic but visible (lines 63-64)
- Coverage cell format `% · wait` authored once (lines 65-66)
- Cap 3-4 columns, add/remove via compare tray (lines 67-68)
- One tinted recommended column, at most one (lines 69-70)
- Difference-only toggle "Hide rows where all plans match" (lines 71-72)
- Per-column CTA row (line 51)

**ZIP reference markup:** `docs/ppo-redesign/_zip-21jun/ppo/compare-ppo-dental-plans.html`
- `.cov-cell.is-partial / is-none / is-full` coverage cells (lines 489-491)
- `.best-tok` inline best marker with check SVG, e.g. "Best price" (line 487)
- Pin-to-tray `.cmp-pick` checkbox, tray `#tray` capped at 4, "pick 2-4 to compare" (lines 480, 811-822)
- Sort/filter toolbar, lead-in explaining green/amber/grey legend (lines 434-457)

**LIVE target:** `compare-ppo-dental-plans.html`
- `#compareMatrix` container (line 953), rendered by `renderCompareMatrix()` (lines 1520-1544)
- `CMP_ROWS` row definitions (lines 1509-1519)
- `.cmp-grid` CSS display:grid with `--cols` (line 202), `.cmp-h` sticky header top:var(--toch) (line 203), `.cmp-corner` (line 204), `.cmp-l` label cells (line 214), `.cmp-c` value cells (line 215)
- Cell renderers: `covCell(o)` (line 1380), `cmpCell(p,k)` (line 1470)
- Coverage flag classes `.flag-now` green, `.flag-wait` rust, `.flag-no` muted (lines 503-505)
- `toggleCompare` caps at 3 plans (line 1469)
- Mobile: `#compareMatrix` overflow-x scroll + "Scroll to compare ->" hint (lines 412, 431); `.cmp-grid{min-width:560px}` (line 413)

**Key gap:** the live matrix is already a CSS-grid of plan columns (good), but it is unbanded, has no best-in-row markers, no difference-only toggle, caps at 3 not 4, and the recommended column is not tinted as a single highlight. The ZIP `.cov-table` named in the spec component map does NOT exist on either compare page; live uses `.cmp-grid` + `.flag-*`. We extend the live component, not import `.cov-table`.

---

## 1. Row bands (Cost / Limits / Coverage / Practical)

Current `CMP_ROWS` (lines 1509-1519) is a flat array of `[label, renderFn]` pairs in mixed order (annual max, coverage active, monthly, deductible, network, activation, then coverage rows). The render loop (line 1539) emits one `.cmp-l` + N `.cmp-c` per row with no grouping.

**Change — restructure `CMP_ROWS` into four labeled bands, fixed order per spec §2:**

```js
const CMP_BANDS = [
  { band:'Cost', rows:[
    ['Monthly price', p=>p.monthly?'<b>'+money(p.monthly)+'</b><span class="muted">/mo</span>':'<span class="muted">Under review</span>'],
    ['Plan type',     p=>PLAN_TYPE[p.key]||'<span class="muted">&mdash;</span>'],
  ]},
  { band:'Limits', rows:[
    [tipSpan('annual-maximum','Annual maximum'), p=>'<b>'+money(p.annualMax)+'</b>', 'max-high'],
    [tipSpan('deductible','Deductible'),          p=>money(p.deductible)],
    [tipSpan('effective-date','Coverage starts'), p=>{const a=p.activation||'1st of next month';return '<span class="'+(a==='Next business day'?'flag-now':'flag-wait')+'">'+a+'</span>';}, 'wait-low'],
  ]},
  { band:'Coverage', rows:[
    [tipSpan('coverage-preventive','Preventive'), p=>cmpCell(p,'preventive')],
    [tipSpan('coverage-basic','Basic'),           p=>cmpCell(p,'basic'),  'cov'],
    [tipSpan('coverage-major','Major'),           p=>cmpCell(p,'major'),  'cov'],
    [tipSpan('implants','Implants'),              p=>cmpCell(p,'implant'),'cov'],
    ['Orthodontics',                              p=>orthoCmp(p)],          // adult+child collapsed
  ]},
  { band:'Practical', rows:[
    [tipSpan('in-network','Network'), p=>p.network],
    ['Best for',                      p=>BEST_FOR[p.key]||'<span class="muted">&mdash;</span>'],
    // expandable extras (whitening, vision, age cap) gated behind "Show more specs"
  ]},
];
```

Render loop emits a `.cmp-band` spanning header row before each band's rows. CSS: add a full-width band label row that spans the grid via a sub-grid or a `.cmp-band{grid-column:1/-1}` strip styled like `.cmp-l` but uppercase/letter-spaced (reuse `.cmp-corner` typography from line 204). Keeps the existing `.cmp-grid --cols` machinery untouched.

The third optional array element (`'cov'`, `'max-high'`, `'wait-low'`) is the best-in-row rule key (see §3).

---

## 2. Sticky header row + sticky first column

Already partial. `.cmp-h` is `position:sticky;top:var(--toch)` (line 203) so the plan header band sticks vertically. The first column (`.cmp-l` labels) is NOT sticky on horizontal scroll.

**Change:**
- Add `position:sticky;left:0;z-index:5;background:var(--paper-2)` to `.cmp-l` and to `.cmp-corner` (it must out-rank cells but sit under `.cmp-h` corner at z 6).
- The corner cell (`.cmp-corner`) needs `z-index:7` so it stays above both sticky axes at the intersection.
- On the mobile overflow-x container (line 412), sticky-left keeps the spec label visible while plan columns scroll, matching spec §5 Pattern A (swipeable columns, label pinned). Remove or keep the `min-width:560px` (line 413); with sticky-left the label staying put is what makes horizontal scroll legible.

No JS change. Pure CSS on `.cmp-l` / `.cmp-corner`.

---

## 3. Best-in-row markers (only unambiguous rows)

Spec §3: mark winning cell with `◆ best` token + faint tint, ONLY where "best" is unambiguous (annual max higher, premium lower, waiting period shorter). Never heatmap every cell. The ZIP already ships `.best-tok` (line 487) as a check-SVG inline token ("Best price"); we adopt that pattern but use the spec's `◆`.

**Change — compute winners once per render, before emitting rows:**

```js
function bestKeys(slots, ruleKey){
  const live = slots.filter(Boolean);
  if(live.length<2) return new Set();              // no winner with <2 plans
  let best=null, val=null;
  const score = {
    'max-high':  p=>p.annualMax||0,                // higher wins
    'cov':       p=>p.treatments && coverageScore(p),// not used per-cell; cov uses per-row
    'wait-low':  p=>p.activation==='Next business day'?0:30, // shorter wins
    'prem-low':  p=>p.monthly||9999,               // lower wins
  };
  // for max-high/prem-low/wait-low pick extreme; emit Set of keys that TIE the extreme
  // if all values equal -> return empty Set (no winner, ambiguous)
}
```

Rules to apply (only these rows get markers):
- **Annual maximum** -> `max-high` (higher wins)
- **Monthly price** -> `prem-low` (lower wins) — but premiums FROZEN so values are display-only; marker is read-only, never re-sorts
- **Coverage starts / activation** -> `wait-low` (Next business day wins)
- **Coverage rows (basic/major/implant)** -> `cov`: win = highest `pct`, tiebreak lowest `wait`; mark only if a single clear winner, skip if tie or any "Not covered" makes it murky

Do NOT mark: deductible (usually all $50, identical), network, best-for, plan type, preventive (usually all 100% day one).

Cell render adds `class="cmp-c is-best"` + appends `<span class="best-tok">&#9670; best</span>`. CSS:
```css
.cmp-c.is-best{background:rgba(91,224,160,.08)} /* faint mint tint, --mint-soft equivalent */
.best-tok{display:inline-flex;align-items:center;gap:3px;margin-left:6px;font-size:10.5px;font-weight:600;color:var(--green);letter-spacing:.02em}
```

**Mandatory footnote** under the matrix: "Best spec does not mean best plan for you. The right plan depends on which procedures you need and when." (spec §3). Render as `.cmp-note` muted line after `el.innerHTML`.

---

## 4. "Not covered" — muted but visible

Already correct on live: `covCell(o)` returns `<span class="flag-no">Not covered</span>` (line 1380) and `.flag-no{color:var(--muted)}` (line 505). Spec §3 wants muted AND italic, rendered consistently (never blank).

**Change (minor):** add `font-style:italic` to `.flag-no` so "Not covered" reads as a deliberate gap not a missing value. Confirm `cmpCell` (line 1470) returns "Not covered" not "Under review" for live plans where the treatment is genuinely absent vs under-review plans (the current `p.status!=='live'` branch is correct, keep it).

---

## 5. `% · wait` cell format (author once)

Spec §3 + §6: coverage cells share one format `% · wait`, same renderer as card and detail page. Live `covCell(o)` (line 1380) currently emits `'100%, day one'` / `'50%, 6-mo wait'` / `'Not covered'`.

**Change:** normalize to the spec's middot format so the matrix, card, and detail page read identically:
```js
function covCell(o){
  if(!o) return '<span class="flag-no">Not covered</span>';
  if(o.allowance!=null) return '<span class="flag-now">$'+o.allowance+'/yr</span>';
  if(o.wait===0) return '<span class="flag-now">'+o.pct+'% · now</span>';
  return '<span class="flag-wait">'+o.pct+'% · '+o.wait+'mo</span>';
}
```
Keep `· now` for day-one, `· {n}mo` for waits, matching spec's `100% · now` / `80% · 6mo`. This is the single authored cell; do not fork a separate matrix renderer.

---

## 6. Max 3-4 columns + add/remove via compare tray

Live caps at 3 (line 1469: `if(compare.size>=3)`) and renders 3 fixed slots (line 1523). Spec §1/§3 says cap 3-4 desktop. The ZIP tray caps at 4 (line 814 "0 of 4 plans", line 480 pin checkbox).

**Change:**
- Raise live cap to 4: `if(compare.size>=4)` (line 1469) and `slots=[ordered[0..3]]` (line 1523), set `--cols:4` and grid `repeat(var(--cols),...)` already parameterized (line 202).
- Empty-slot affordance (`.cmp-empty`, lines 1533-1537) already exists with a select + "tap Compare on any plan" hint. Keep. On mobile, 4 columns is too wide for Pattern A: when `compare.size===4` and viewport is narrow, fall back to spec §5 Pattern B (stacked accordion) OR force horizontal snap-scroll one column at a time. Recommend: keep 3 as the mobile practical cap, allow 4 on desktop only (gate the 4th slot behind a `matchMedia('(min-width:760px)')` check in `renderCompareMatrix`).
- The flash message at line 1469 must update to "compare up to four plans".

---

## 7. Difference-only toggle (power feature)

Not present on live. Spec §3: "Hide rows where all plans match" collapses identical rows so only differences remain.

**Change — add a toggle above the matrix:**
```html
<label class="cmp-diff"><input type="checkbox" id="diffOnly"> Show differences only</label>
```
In `renderCompareMatrix`, after building band rows, when `#diffOnly` is checked, for each row compute the rendered value string per active plan and skip rows where all non-empty values are identical (e.g. everyone's deductible $50, everyone's preventive 100% · now). Keep band headers only if the band retains at least one visible row. Bind the checkbox to re-call `renderCompareMatrix()`. Cheap string-equality compare on the row's renderFn output across `slots.filter(Boolean)`.

---

## 8. Per-column CTA row

Spec §1 (line 36) + §2: a CTA row per column at the bottom. Live puts the CTA inside the sticky header (`Activate` / `Notify me`, lines 1532) but has no bottom CTA row, so after scrolling all specs the buyer has no action without scrolling back up.

**Change:** after the `CMP_BANDS` loop, emit one trailing CTA row:
```js
h+='<div class="cmp-l cmp-cta-l">Get this plan</div>';
slots.forEach(p=>{
  h+= p
    ? '<div class="cmp-c cmp-cta">'+(p.status==='live'
        ? '<button class="btn btn-green btn-sm" onclick="openEnrollInterstitial(\''+p.key+'\')">Activate</button><a class="btn btn-ghost btn-sm" href="'+planHref(p)+'">View</a>'
        : '<button class="btn btn-ghost btn-sm notify" data-plan="'+p.key+'">Notify me</button>')+'</div>'
    : '<div class="cmp-c cmp-c-empty"></div>';
});
```
Reuse existing `.btn-green` / `.btn-ghost` (per spec §6 "btn-pri/btn-out shrunk"). Re-bind `.notify` via `bindNotify()` which is already called (line 1543). View link should use the plan's detail URL (`/dental-insurance/ppo-plans/{slug}/`, cf. ZIP line 973 href pattern), not seo_path.

---

## 9. Single recommended (tinted) column

Spec §3: at most one column gets a tinted header (`★`) matching card "Most popular". Live marks every `status==='live'` plan "CoverCapy Recommended" (line 1530), which over-marks.

**Change:** designate ONE `recommended:true` plan in PLANS data. In the header build (line 1529), give only that column `.cmp-plan.is-rec` with a tinted `var(--mint-soft)` header background and a `★` token. All other live plans keep the neutral header (drop the per-plan "Recommended" badge, or downgrade to a plain status). This prevents the matrix from looking like every plan is the pick.

---

## 10. Implementation surface summary (live page edits)

All edits in `compare-ppo-dental-plans.html`:

| # | What | Where |
|---|------|-------|
| 1 | Replace flat `CMP_ROWS` with banded `CMP_BANDS` + band-header rows | lines 1509-1519, render loop 1539 |
| 2 | Sticky-left `.cmp-l` + `.cmp-corner`, z-index layering | CSS lines 203-204, 214 |
| 3 | `bestKeys()` winner calc + `.is-best` tint + `.best-tok` ◆ + footnote | new JS in `renderCompareMatrix`, CSS near 215 |
| 4 | `.flag-no` add `font-style:italic` | line 505 |
| 5 | Normalize `covCell` to `% · now` / `% · {n}mo` middot format | line 1380 |
| 6 | Raise cap 3 -> 4 (desktop), 4-slot grid, mobile gate | lines 1469, 1523 |
| 7 | `#diffOnly` toggle + row-collapse logic | new markup near 953, JS in render |
| 8 | Trailing per-column CTA row | after band loop in 1539 |
| 9 | Single `.is-rec` tinted column, drop blanket "Recommended" | line 1529-1530 |

No backend, no Supabase, no generator. Premiums stay display-only (frozen). No em-dashes in any copy added. The `.cmp-grid --cols` engine, `cmpCell`, `tipSpan`, `bindNotify`, `openEnrollInterstitial`, and empty-slot select are all reused.
