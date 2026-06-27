# TY09 — Iconography & Coverage-State Visuals

Read-in-3-seconds health signal. A consistent inline-SVG icon set whose `currentColor`
tints icon and text together, sized for cards, the comparison matrix, and the brief modal.

---

## 1. The gap (grounded in real lines)

**ZIP prototype** (`docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`) already has the
full icon+color+text triple:

- `.cov-cell` (line 168): inline-flex pill, `gap:6px`, `svg{width:13px;height:13px}` (line 169).
- Three state classes (lines 170-172): `.is-covered` / `.is-partial` / `.is-none`, each driving
  a tint background plus an ink color from `--covered-* / --partial-* / --notcov-*` tokens.
- Those tokens are also defined in the live file (lines 53-55), so the palette is already shared:
  ```
  --covered:#0F9D6E; --covered-tint:#E4F6EE; --covered-ink:#0A5D43;
  --partial:#B26A00; --partial-tint:#FBEFD9; --partial-ink:#7A4A00;
  --notcov:#64748B;  --notcov-tint:#EEF1F4; --notcov-ink:#475569;
  ```

**Live file** (`compare-ppo-dental-plans.html`) is text-only. There is NO icon:

- `.flag-now` (513) = `color:var(--green)`, `.flag-wait` (514) = `color:var(--rust)`,
  `.flag-no` (515) = `color:var(--muted)`. Just colored text.
- `covCell(o)` (line 1365) and `orthoCellHtml(p)` (line 1366) emit bare `<span class="flag-...">text</span>`.
- These feed every surface: plan cards via `covLine` (1414) and `planCard` (1425+), the matrix rows
  (1498, 1505 use the same flag classes), and the brief modal `rows` (1372) + `brief-cov` list (1383).

So the prototype proves the visual language; the live `covCell` just never adopted it. TY09 closes that.

---

## 2. Icon set (3 states, inline SVG, currentColor)

One 16x16 viewBox, `stroke="currentColor"` so a single color tints icon AND text. Stroke style
matches the existing thin-line house logo and chevrons. No fills, no gradients.

```html
<!-- CHECK — covered / green -->
<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/>
  <path d="M5.2 8.2 7.1 10.1 10.9 6" stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- HALF — partial / amber (half-filled disc = "some, with a wait") -->
<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/>
  <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/>
</svg>

<!-- X — not covered / grey -->
<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true">
  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/>
  <path d="M5.6 5.6 10.4 10.4 M10.4 5.6 5.6 10.4" stroke="currentColor"
        stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

`aria-hidden="true"` because the adjacent text already states the meaning (covered / partial / none),
so the icon is decorative for screen readers and not double-announced.

---

## 3. CSS (drop in near the `.flag-*` block, ~line 513)

Keep the three `.flag-*` classes (other call sites at 1498/1505 still use them) but upgrade them to
flex pills that own the icon, and add the sizing token. `currentColor` does the tinting, so icon and
text are always the same hue.

```css
/* coverage flags — icon + color + text triple (TY09) */
.flag-now,.flag-wait,.flag-no{
  display:inline-flex;align-items:center;gap:6px;font-weight:600;line-height:1;
}
.flag-now{color:var(--covered-ink)}
.flag-wait{color:var(--partial-ink)}
.flag-no{color:var(--notcov-ink);font-weight:500}
.cov-ic{width:14px;height:14px;flex:0 0 auto}              /* card / matrix default */
.brief-cov .cov-ic,.mcar ~ * .cov-ic{width:15px;height:15px} /* modal, slightly larger */
.cmp-body .cov-ic{width:13px}                              /* dense matrix cells */
```

Color note: the live `.flag-now/wait/no` used `--green/--rust/--muted`. Switching to the
`--covered-ink/--partial-ink/--notcov-ink` set (already defined, lines 53-55) aligns the live page
with the prototype and survives all three themes. If you prefer to keep the current hues, leave the
`color:` lines as-is — the icon inherits whatever color the class sets, either way.

---

## 4. The refactor — `covCell` emits icon + color + text, data-driven

Single source of truth for the icon markup, then `covCell` picks state from the data
(`covered=100 -> check`, `none=null -> x`, `else -> half`). One small helper, one rewritten function.

```javascript
/* TY09: inline icon markup keyed by state. currentColor tints icon to match text. */
var COV_IC={
  now:'<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M5.2 8.2 7.1 10.1 10.9 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  half:'<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor"/></svg>',
  no:'<svg class="cov-ic" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M5.6 5.6 10.4 10.4 M10.4 5.6 5.6 10.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};
function covFlag(state,text){           // state: 'now' | 'wait' | 'no'
  var ic=state==='now'?COV_IC.now:state==='no'?COV_IC.no:COV_IC.half;
  return '<span class="flag-'+state+'">'+ic+text+'</span>';
}

function covCell(o){
  if(!o) return covFlag('no','Not covered');                              // null -> X grey
  if(o.allowance!=null)                                                    // dollar allowance
    return covFlag(o.wait?'wait':'now','$'+o.allowance+'/yr'+(o.wait?', '+o.wait+'-mo wait':', day one'));
  if(o.wait===0) return covFlag('now',o.pct+'%, day one');                 // 100% / no wait -> check
  return covFlag('wait',o.pct+'%, '+o.wait+'-mo wait');                    // partial / waiting -> half amber
}
```

State mapping is purely data-driven, matching the mandate:

| Data shape                | State  | Icon  | Color   |
|---------------------------|--------|-------|---------|
| `o == null`               | `no`   | X     | grey    |
| `wait === 0` (day one)    | `now`  | check | green   |
| `wait > 0` (waiting)      | `wait` | half  | amber   |
| allowance, no wait        | `now`  | check | green   |
| allowance, with wait      | `wait` | half  | amber   |

`orthoCellHtml` (line 1366) gets the same treatment: replace its two `'<span class="flag-now/wait">'`
literals with `covFlag('now', txt)` / `covFlag('wait', txt)`, and its two `flag-no` branches with
`covFlag('no','Under review')` / `covFlag('no','Not covered')`. The trailing `(scope)` muted span
is appended outside `covFlag` unchanged.

No call sites change: `covLine` (1414), `planCard` (1425+), the matrix rows (1498/1505), and the
brief modal `rows` (1372) all already call `covCell`/the flag classes, so they inherit icons for free.

---

## 5. Why this design

- One viewBox, three paths, `currentColor` => the icon can never drift from its text color across the
  3 themes (lines 716 / 742 / 773 each redefine the palette).
- Reuses tokens already present in BOTH files (53-55), so it is not net-new design, it is adoption of
  the prototype the team already built.
- Circle-wrapped glyphs (disc / half-disc / crossed disc) read as a coverage gauge at 13px, which is
  the "3-second scan" the matrix needs, and stay legible at the 15px modal size.
- No em-dashes, no gradients, no glassmorphism — consistent with the design constraints.
