# HD07 — Surface Compare Selection State in the Console Header

Status: SPEC only. No code shipped. All line refs are against
`compare-ppo-dental-plans.html` as read on 2026-06-21.

---

## 1. Grounding — what exists today

The console header is the sticky compact TOC at **line 859** (`<div class="toc">`),
styled at **line 118** (`.toc{position:sticky;top:0;z-index:60;...}`). Its inner
`.wrap` (line 861) holds three children today: `.toc-brand` (862), `.toc-links`
nav (866), `.toc-cta` (876). The Compare link is `<a href="#compare">` at line 868.

The compare state is a single source of truth:

| Thing | Line | Detail |
|-------|------|--------|
| `const compare = new Set(['uhc'])` | 1412 | the Set. Seeds with `uhc`. |
| `cmpBtn(p)` | 1413 | renders the per-card `.cmp-toggle` button, `on` when `compare.has(p.key)` |
| `toggleCompare(k)` | 1455 | add/remove; **cap is 3** (`if(compare.size>=3)` flashes a note and bails); then `renderGrid();renderCompareMatrix();` |
| `compareFromBrief(k)` | 1456 | called from the plan-brief modal (line 1386); if at cap, evicts the oldest (`compare.values().next().value`), adds `k`, re-renders, scrolls to `#compare` |
| `renderCompareMatrix()` | 1507 | rebuilds `#compareMatrix`; matrix remove is the `.cmp-rmv` handler at **line 1528** (`compare.delete(b.dataset.rmv);renderGrid();renderCompareMatrix();`); slot `<select>` change at 1529 calls `toggleCompare` |
| section target | 921 | `<section id="compare">` — scroll destination |

**Every mutation of the Set funnels through exactly three call sites** that already
pair `renderGrid()` + `renderCompareMatrix()`:
1. `toggleCompare` (1455) — card `+Compare` buttons and slot selects.
2. `compareFromBrief` (1456) — modal "Compare this plan".
3. the `.cmp-rmv` inline handler (1528) — matrix remove `x`.

So a console indicator only needs `renderConsoleCompare()` added at those same
three points to stay in lockstep with the Set. No new state.

Plan lookup for chip labels uses the existing `PLANS` array (see 1509:
`PLANS.find(p=>p.key===k)`); `p.carrier` is the short label.

---

## 2. The control — markup

Insert as a new child of `.toc .wrap`, between `.toc-links` (closes line 875)
and `.toc-cta` (line 876). It renders empty when the Set is empty, so it costs
nothing when unused.

```html
<!-- console compare indicator — populated by renderConsoleCompare() -->
<div class="toc-compare" id="tocCompare" hidden>
  <button class="tc-jump" type="button" aria-label="Jump to compare plans">
    Compare <span class="tc-count" id="tcCount">0</span>
  </button>
  <div class="tc-chips" id="tcChips" aria-live="polite"></div>
  <button class="tc-clear" id="tcClear" type="button" aria-label="Clear all compared plans">Clear</button>
</div>
```

Notes:
- `hidden` by default; `renderConsoleCompare()` toggles it off when count > 0.
- `aria-live="polite"` on the chip row so screen readers hear count changes.
- One chip per selected plan; each chip carries its own remove `x`.

---

## 3. CSS

Drop near the `.toc` block (after line 118). Uses existing tokens only
(`--green`, `--line`, `--ink`, `--muted`, `--paper-2`). No gradients, no glass.

```css
.toc-compare{display:flex;align-items:center;gap:8px;margin-left:auto}
.toc-compare[hidden]{display:none}
.tc-jump{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--green);
  background:#fff;color:var(--ink);font:600 13px/1 'Inter Tight',system-ui;
  border-radius:999px;padding:7px 12px;cursor:pointer}
.tc-jump:hover{background:var(--paper-2)}
.tc-count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;
  height:18px;padding:0 5px;border-radius:999px;background:var(--green);color:#fff;
  font-size:11px;font-weight:700}
.tc-chips{display:flex;align-items:center;gap:6px}
.tc-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);
  background:var(--paper-2);border-radius:999px;padding:4px 6px 4px 10px;
  font:500 12px/1 'Inter Tight',system-ui;color:var(--ink)}
.tc-chip-x{border:none;background:none;cursor:pointer;color:var(--muted);
  font-size:14px;line-height:1;padding:0 2px}
.tc-chip-x:hover{color:var(--ink)}
.tc-clear{border:none;background:none;cursor:pointer;color:var(--muted);
  font:500 12px/1 'Inter Tight',system-ui;text-decoration:underline}
.tc-clear:hover{color:var(--ink)}
@media(max-width:760px){.tc-chips{display:none}}
```

On narrow screens chips collapse and only the `Compare (N)` pill + Clear remain.

---

## 4. JS — renderConsoleCompare()

Place beside the other compare functions (after `renderCompareMatrix`, ~line 1531).
It reads the Set, never writes it. Remove and clear actions delegate to the same
Set-mutating path that all other call sites use.

```javascript
function renderConsoleCompare(){
  var host=document.getElementById('tocCompare');
  if(!host)return;
  var keys=[...compare];
  document.getElementById('tcCount').textContent=keys.length;
  host.hidden=keys.length===0;
  var chips=document.getElementById('tcChips');
  chips.innerHTML=keys.map(function(k){
    var p=PLANS.find(function(x){return x.key===k;});
    var label=p?p.carrier:k;
    return '<span class="tc-chip">'+label
      +'<button class="tc-chip-x" data-tc-rmv="'+k+'" '
      +'aria-label="Remove '+esc(label)+' from compare">&times;</button></span>';
  }).join('');
  chips.querySelectorAll('[data-tc-rmv]').forEach(function(b){
    b.addEventListener('click',function(){
      compare.delete(b.dataset.tcRmv);
      renderGrid();renderCompareMatrix();renderConsoleCompare();
    });
  });
}
```

Wire the static buttons once at init (next to the existing `#sortbar` listener at
line 1453):

```javascript
document.getElementById('tcClear').addEventListener('click',function(){
  compare.clear();renderGrid();renderCompareMatrix();renderConsoleCompare();
});
document.querySelector('#tocCompare .tc-jump').addEventListener('click',function(){
  var el=document.getElementById('compare');
  if(el)el.scrollIntoView({behavior:'smooth'});
});
```

`esc()` already exists at line 1484; `PLANS` and `live()` are in scope.

---

## 5. Keeping it in lockstep with the Set

Add one call to `renderConsoleCompare()` at each Set-mutation site. These are the
**only** edits needed for the indicator to track every source of change:

| Site | Line | Edit |
|------|------|------|
| `toggleCompare` end | 1455 | `...renderGrid();renderCompareMatrix();renderConsoleCompare();` |
| `compareFromBrief` | 1456 | after `renderGrid();renderCompareMatrix();` add `renderConsoleCompare();` (before the scroll) |
| matrix `.cmp-rmv` handler | 1528 | `compare.delete(...);renderGrid();renderCompareMatrix();renderConsoleCompare();` |
| init / first paint | wherever `renderCompareMatrix()` is first called | add a `renderConsoleCompare();` so the seeded `uhc` shows on load |

Because card `+Compare`, slot `<select>`, and the brief modal already route through
`toggleCompare` / `compareFromBrief`, those need no further touches. The matrix `x`
is the only inline mutation, covered above.

The cap of 3 stays enforced in `toggleCompare`; the console never adds, only the
`Clear` (bulk delete) and per-chip remove subtract, so it can never push past cap.

---

## 6. Copy and constraints
- Pill label: `Compare (N)` — count is the live `compare.size`.
- No em-dashes anywhere in user-facing strings (this control uses none).
- Tokens only; no invented colors, no gradients, no glassmorphism.
- Chip label is `p.carrier` (short carrier name), fallback to the raw key if a
  plan is not found in `PLANS`.
