# 04 — Compare Tray / Sticky Compare Bar Spec

> Hub20 · CoverCapy PPO redesign · The browse→decide bridge
> Grounds: spec §4 of `presentation-specs/03-comparison-table-spec.md`; ZIP reference
> `_zip-21jun/ppo/compare-ppo-dental-plans.html`; live page `compare-ppo-dental-plans.html`.
> Premiums FROZEN. No em-dashes. Spec only.

---

## 1. What the spec asks for (§4 of 03-comparison-table-spec.md)

Section 4 "Choosing what to compare (the compare tray)" is short and exact:

- A **sticky compare bar** persists across the hub/cards. Buyers tick `+ Compare` on **2–4**
  plans; the bar shows the chips; `Compare (3) →` opens the matrix pre-filled.
- This is the **bridge between the hub library (browse) and the comparison tool (decide)** —
  the hub→compare relationship the briefs require, made tactile.
- Persist selection "in memory/localStorage-equivalent so it survives navigation."
- §3 sets the column cap: **3–4 columns** on desktop; more plans → buyer adds/removes via the
  sticky compare bar. §6 says reuse the existing `.sticky-bar` pattern already in the build.

---

## 2. What already exists

### 2a. ZIP reference page — `_zip-21jun/ppo/compare-ppo-dental-plans.html` (the model)

This page already implements the spec almost verbatim. It is the source of truth for markup.

- **Per-row `+ Compare` checkbox** (table is one row per plan):
  `<label class="cmp-pick"><input type="checkbox" class="cmp-cb" aria-label="Compare …"/> Pin</label>`
  (lines 480, 500, 520, 540, 560, 580, 600, 620). CSS at 217–220: 17px box, `accent-color:var(--teal)`,
  picked row gets `.is-picked` tint.
- **Sticky tray** `<div class="tray" id="tray" role="region" aria-live="polite">` (line 811).
  Header "Comparing N of 4 plans · pick 2–4" + `#trayCount` + `#trayClear` "Clear all". Body is
  `#trayGrid`, a CSS-grid mini-matrix (label col + up to 4 plan cols) rendered from the table rows.
- **Tray CSS** lines 333–354: `position:fixed;bottom:0;transform:translateY(110%)`, `.show`
  slides up. Grid `160px repeat(4,1fr)`, horizontal scroll, per-col remove `×` (`.tray-rm`).
- **JS** lines 941–1013: `MAX_PICK=4`, `picked[]` array, `loadPicked/savePicked` via
  `localStorage('cc-compare')`, `togglePick(key,want)` enforces the 4-cap, `renderTray()` builds the
  grid from row `data-*` attrs (`data-prem`, `data-maxlabel`, `data-basic`, `data-major`,
  `data-implant`, `data-starts`, `data-carrier`, `data-name`, `data-href`), `syncCheckboxes()`
  reflects state, `renderTray()` hides tray when `picked.length < 2`.
- **Sticky bar coordination** lines 1015–1026: the marketing `#sticky` bar hides while the tray is
  open (`__applySticky` checks `tray.classList.contains('show')`).

The ZIP tray opens the comparison **inline inside the tray itself** (it renders the mini-matrix in
`#trayGrid`). It does not have a separate "Compare (N) → open full matrix" action — the tray IS the
matrix preview.

### 2b. Live page — `compare-ppo-dental-plans.html` (what ships now)

Different architecture. No sticky tray. It has:

- `const compare=new Set(['uhc'])` (line 1426) — **cap 3, seeded with one plan**, in-memory Set.
- `cmpBtn(p)` (1427) renders a `<button class="cmp-toggle" data-cmp="key">Compare/Comparing</button>`
  on each plan **card** (not a checkbox; cards, not a table).
- `toggleCompare(k)` (1469) — caps at 3 with `flashNote('…up to three plans…')`, then
  `renderGrid()` + `renderCompareMatrix()`.
- `renderCompareMatrix()` (1520–1542) draws `#compareMatrix`, a `.cmp-grid` with `--cols:3`, up to 3
  plan columns plus **empty "Add a plan" slots** with a `<select class="ce-sel">` dropdown and a `×`
  remove (`.cmp-rmv`, 1541). This matrix is **anchored in the page** at `#compare` (line 953), not
  sticky/floating.
- Deep-link preload: `?plan=` seeds the matrix (lines 2205–2207). Compare starts with UHC in slot 1
  and two open slots (2216).

So the live page already has the selection model, the remove-chip, the cap, and a matrix — but the
matrix lives in a fixed page section, and the selector is a button-per-card with **no persistent
floating bar that follows the buyer as they browse**. That floating bar is the gap §4 wants closed.

### 2c. Constraint: localStorage is unavailable in this build

The live page's `compare` Set is **in-memory only** — there is no `localStorage` read/write in its
compare code (the ZIP's `loadPicked/savePicked` are NOT ported). The mandate confirms localStorage is
unavailable in this build. So persistence "across navigation" must use an **in-page in-memory store**.
Since these are single-document anchor-nav pages (`#compare`, `#shelf`), in-memory survives all
intra-page navigation. The only thing it cannot survive is a hard reload / cross-document nav — accept
that, and re-seed from `?plan=` on load as the existing code already does.

---

## 3. Spec for the live page: add the sticky compare tray

Keep the live page's existing `compare` Set, `toggleCompare`, `renderCompareMatrix`, and the in-page
matrix. **Layer a sticky tray on top** that mirrors the Set and gives the "Compare (N) →" jump. Bump
the cap from 3 to 4 to match §3/§4 (3–4 columns).

### 3a. The `+ Compare` control on each card (already present, refine)

The live card button stays. Recommend relabeling for clarity and matching spec language:

```js
// replace cmpBtn (line 1427)
function cmpBtn(p){
  const s=compare.has(p.key);
  return '<button class="cmp-toggle'+(s?' on':'')+'" data-cmp="'+p.key+'" '+
         'aria-pressed="'+s+'" aria-label="'+(s?'Remove ':'Add ')+p.name+' to comparison">'+
         (s?'✓ Comparing':'+ Compare')+'</button>';
}
```

`.cmp-toggle` / `.cmp-toggle.on` CSS already exists (lines 548–551, with the `✓` pseudo on `.on`).
Drop the duplicated `✓` if you bake it into the label, or keep the pseudo and label "Comparing".

### 3b. The sticky tray markup (new — place just before `</body>`)

```html
<!-- COMPARE TRAY (sticky browse→decide bridge) -->
<div class="cc-tray" id="ccTray" role="region" aria-label="Plans pinned to compare" aria-live="polite">
  <div class="cc-tray-in">
    <div class="cc-tray-lead">
      <span class="cc-tray-count"><b id="ccTrayN">0</b> of 4 pinned</span>
      <span class="cc-tray-hint">Pick 2 to 4 plans to compare</span>
    </div>
    <div class="cc-tray-chips" id="ccTrayChips"></div>
    <div class="cc-tray-act">
      <button type="button" class="cc-tray-clear" id="ccTrayClear">Clear</button>
      <button type="button" class="btn btn-green btn-sm" id="ccTrayGo" disabled>Compare (0) &rarr;</button>
    </div>
  </div>
</div>
```

### 3c. Tray CSS (new — uses live page tokens, adapts ZIP `.tray`)

```css
.cc-tray{position:fixed;left:0;right:0;bottom:0;z-index:140;background:var(--card,#FFFDF8);
  border-top:1px solid var(--line);box-shadow:0 -8px 28px rgba(8,42,48,.12);
  transform:translateY(120%);transition:transform .26s ease;padding-bottom:env(safe-area-inset-bottom)}
.cc-tray.show{transform:translateY(0)}
.cc-tray-in{max-width:1120px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.cc-tray-lead{display:flex;flex-direction:column;line-height:1.2;flex-shrink:0}
.cc-tray-count{font-size:13px;font-weight:600;color:var(--ink)}
.cc-tray-hint{font-size:11px;color:var(--muted)}
.cc-tray-chips{display:flex;gap:8px;flex:1;min-width:0;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:2px 0}
.cc-chip{display:inline-flex;align-items:center;gap:7px;flex-shrink:0;background:var(--sage,#E6F7EE);
  border:1px solid var(--line);border-radius:999px;padding:6px 8px 6px 12px;font-size:12.5px;font-weight:600;color:var(--ink)}
.cc-chip .ch-car{font-size:9.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-right:2px}
.cc-chip-rm{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;
  border:0;border-radius:50%;background:transparent;color:var(--muted);font-size:15px;line-height:1;cursor:pointer}
.cc-chip-rm:hover{background:rgba(8,42,48,.07);color:var(--rust,#9B3B2E)}
.cc-tray-act{display:flex;align-items:center;gap:14px;flex-shrink:0;margin-left:auto}
.cc-tray-clear{background:none;border:0;font-size:12.5px;font-weight:600;color:var(--muted);cursor:pointer}
.cc-tray-clear:hover{color:var(--ink);text-decoration:underline}
.cc-tray-go[disabled]{opacity:.5;cursor:not-allowed}
@media(max-width:640px){
  .cc-tray-in{padding:10px 16px;gap:10px}
  .cc-tray-lead{flex-basis:100%}
  .cc-tray-act{flex-basis:100%;margin-left:0}
  #ccTrayGo{flex:1}
}
```

### 3d. Tray JS (new — wires to the existing `compare` Set)

```js
/* ===== Sticky compare tray (in-memory; localStorage unavailable in this build) ===== */
const TRAY_MAX = 4;                 // bump cap from 3 to 4 to match spec §3/§4
function planByKey(k){return PLANS.find(p=>p.key===k);}

function renderTray(){
  const tray=$('#ccTray'), chips=$('#ccTrayChips'), n=compare.size;
  $('#ccTrayN').textContent=n;
  const go=$('#ccTrayGo');
  go.textContent='Compare ('+n+') →';
  go.disabled=(n<2);                // need 2+ to compare
  chips.innerHTML=[...compare].map(k=>{
    const p=planByKey(k); if(!p) return '';
    return '<span class="cc-chip"><span class="ch-car">'+p.carrier+'</span>'+p.name+
      '<button type="button" class="cc-chip-rm" data-rm="'+k+'" aria-label="Remove '+p.name+'">×</button></span>';
  }).join('');
  chips.querySelectorAll('[data-rm]').forEach(b=>
    b.addEventListener('click',()=>toggleCompare(b.dataset.rm)));   // reuse existing toggle
  tray.classList.toggle('show', n>=1);    // show as soon as 1 is pinned; CTA stays disabled until 2
}

$('#ccTrayClear').addEventListener('click',()=>{
  compare.clear(); renderGrid(); renderCompareMatrix(); renderTray();
});
$('#ccTrayGo').addEventListener('click',()=>{
  if(compare.size<2) return;
  const t=$('#compare'); if(t) t.scrollIntoView({behavior:'smooth'});  // matrix is pre-filled already
  if(window.track) track('plan_compare_open',{pinned:compare.size,keys:[...compare]});
});
```

### 3e. One-line hook into the existing toggle

`toggleCompare` already calls `renderGrid()` + `renderCompareMatrix()`. Add `renderTray()` and lift the
cap to 4:

```js
function toggleCompare(k){
  if(compare.has(k)) compare.delete(k);
  else{
    if(compare.size>=TRAY_MAX){flashNote('You can compare up to four plans at once. Remove one first.');return;}
    compare.add(k);
  }
  renderGrid(); renderCompareMatrix(); renderTray();   // <- add renderTray()
}
```

Also call `renderTray()` once at init, right after the existing `renderCompareMatrix()` boot
(line ~2218) and after the `?plan=` preload (lines 2205–2207), so a deep-linked plan shows in the tray.
Update `#compareMatrix`'s `--cols` and slot logic from 3 to 4 to match the new cap (line 1526 builds
`--cols:3`; make it `--cols:4` and render 4 slots).

---

## 4. Behavior contract (matches §4)

| Requirement | Implementation |
|---|---|
| `+ Compare` per card | existing `.cmp-toggle` button, relabeled `+ Compare` / `✓ Comparing`, `aria-pressed` |
| Sticky bar with chips | new `.cc-tray` fixed bottom, slides up at ≥1 pinned, chips from the `compare` Set |
| Cap 2–4 | min 2 to enable the CTA, max 4 enforced in `toggleCompare` (was 3, now 4) |
| Remove chip | `.cc-chip-rm` `×` → `toggleCompare(key)` (single path, button + chip stay in sync) |
| `Compare (N) →` opens pre-filled matrix | CTA scrolls to `#compare`; `renderCompareMatrix()` already pre-fills the pinned columns |
| Persist across navigation | in-memory `compare` Set survives all intra-page anchor nav; `?plan=` re-seeds on hard load |
| No localStorage | none used; do NOT port the ZIP's `loadPicked/savePicked` |
| One source of truth | tray, card buttons, and matrix all read/write the one `compare` Set |

---

## 5. Decisions / watch-outs

- **One state object.** Card button, tray chip, and matrix all mutate the single `compare` Set via
  `toggleCompare`. Never let the tray hold its own array (that is the ZIP's `picked[]` divergence;
  on the live page it would drift). Every mutation ends in `renderGrid()+renderCompareMatrix()+renderTray()`.
- **Cap 4, not 3.** Spec §3 and §4 both say 3–4. The live page currently caps at 3 and the matrix is
  `--cols:3`; lift both to 4 together or the 4th pin will have no column.
- **Tray vs matrix are complementary.** Keep the in-page `#compare` matrix as the full comparison
  surface; the tray is the floating selector + jump. The CTA scrolls to the matrix rather than opening
  a separate modal, since the matrix is already anchored and pre-filled. (If a modal is later wanted,
  the same Set drives it.)
- **Show threshold.** Show the tray at ≥1 pinned so the buyer sees their selection building; keep the
  `Compare (N) →` CTA disabled until ≥2 (you cannot compare one plan). The ZIP hides until 2 — on
  cards, showing at 1 gives better feedback because the matrix already lives below.
- **No em-dashes** in any tray copy ("Pick 2 to 4 plans to compare", "up to four plans at once").
- **Tokens only.** Reuse `--card`, `--line`, `--ink`, `--muted`, `--sage`, `--rust`, `--green`. Do not
  invent colors. Match the existing `.cmp-rmv` remove pattern (line 212) for the chip `×`.
- **Marketing sticky bar coexistence.** If the live page later adds a marketing sticky bar like the
  ZIP's `#sticky`, gate it the same way: hide it while `.cc-tray.show` is on, mirroring ZIP lines
  1015–1026 (`__applySticky` checks tray state).
- **Analytics.** Fire `plan_compare_add` on toggle and `plan_compare_open` on the CTA, guarded by
  `if(window.track)` since `track` may not exist on every load.

---

## 6. Files touched (when built)

- `compare-ppo-dental-plans.html` (live) only:
  - JS: `cmpBtn` (1427), `toggleCompare` (1469) cap→4 + `renderTray()`, new tray block, init calls
    (~2207, ~2218); matrix `--cols`/slots 3→4 (1526, 1534).
  - CSS: append `.cc-tray*` / `.cc-chip*` block near the existing `.cmp-*` styles (~195–226).
  - HTML: tray `<div id="ccTray">` before `</body>`.
- Reference only, do not edit: `_zip-21jun/ppo/compare-ppo-dental-plans.html`.
```