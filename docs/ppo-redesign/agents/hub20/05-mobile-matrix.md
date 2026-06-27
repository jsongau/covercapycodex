# 05 — Mobile matrix behavior under ~768px

> Hub20 · spec-only memo · grounds in `03-comparison-table-spec.md` §5, the ZIP compare page
> (`docs/ppo-redesign/_zip-21jun/ppo/compare-ppo-dental-plans.html`), and the live
> `find-my-dentist.html` breakpoint conventions. Premiums FROZEN. No em-dashes. SPEC ONLY.

---

## 0. What exists today (grounding)

**ZIP compare page** (`_zip-21jun/ppo/compare-ppo-dental-plans.html`):
- The matrix is `table.cmp` wrapped in `.cmp-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}` (line 182).
- `table.cmp{min-width:880px}` (line 183) so on phones it is a horizontally scrolled wide table.
- Sticky header `thead th{position:sticky;top:60px}` (184); sticky first column `td:first-child{position:sticky;left:0}` (202); sticky 2nd column at `left:52px` (207).
- The only mobile rule is line 211: `@media(max-width:640px){ ...nth-child(2){position:static} }` and line 378 `thead th{top:0}`.

This is exactly the anti-pattern the spec §5 forbids: "Never horizontal-scroll a full multi-column table with tiny text." Below ~768px the 880px table becomes 3–4 dense columns dragged sideways with no snap, no per-plan framing. **The hub matrix must not inherit this.**

**Live page** (`find-my-dentist.html`) — there is no literal `ft-mob`/`featMobile` class; the live page's mobile system is plain `@media` breakpoints. The established ladder to match:
- `980px` — layout collapses to single column (`.layout{grid-template-columns:1fr}`, line 1287).
- `767px` — drawer goes full width (line 1601). This is the canonical "phone" cut.
- `640px` — spacing/overflow polish band; `.searchrail` becomes `position:sticky;top:var(--nav-h)` (1615); grids fall to `1fr`.
- Reduced motion honored globally (`prefers-reduced-motion:reduce`).
- `.plan-grid`/`.tgrid` already collapse `grid-template-columns:1fr` at 720px in the ZIP, the precedent for stacking.

So the hub's mobile matrix should key off **`768px`** (phone), reusing the live page's sticky-rail / `env(safe-area-inset-bottom)` / reduced-motion conventions and the existing `.cov-table` cell renderer (`.ct-pct`, `.ct-na`).

---

## 1. Decision rule: how many plans → which pattern

The matrix never squishes and never drops the Major / Implants / Ortho rows. Pick pattern by **column count selected in the compare tray**:

| Plans in matrix | < 768px pattern | Rationale |
|---|---|---|
| 2 plans | **Pattern A** (swipe) | label column + 1 full plan fits; 1 swipe to compare |
| 3 plans | **Pattern A** (swipe) | label column + 1 full plan; 2 swipes, snap keeps orientation |
| 4 plans | **Pattern B** (stacked accordion + Compare specs) | 4 swipes is too much lateral travel; stack + synchronized spec read |

Desktop (>= 768px) keeps the full N-column matrix unchanged. The switch is CSS-driven by a body/container class `data-cols="2|3|4"` set when the tray opens the matrix, so JS does not have to rebuild DOM on resize.

---

## 2. Pattern A — sticky label column + horizontally snapping plan columns (2–3 plans)

### Behavior
- Spec-label column (the row names: Monthly premium, Annual maximum, Preventive, Basic, Major, Implants, Orthodontics, Network, Best for) is **pinned left, never scrolls**.
- Each **plan column is ~80vw** (minus the label width) so exactly one full plan column is visible beside the labels. Buyer swipes horizontally; columns **snap** so a plan is never half-cut.
- Sticky **plan-name + price header** rides along the top of its column so the column stays labeled while the buyer scrolls the spec rows vertically.
- A row of **dot indicators** under the header shows position (1 of 3).
- All four row bands (Cost / Limits / Coverage / Practical) and the per-column CTA stay intact. No rows hidden.

### Structure (reuse, do not rebuild)
Keep the existing `table.cmp` markup. Pattern A is achieved by turning the scroll container into a snap container and sizing columns by viewport. Because `<td>` cannot be a snap target reliably across mobile Safari, the recommended grounded approach is a **CSS-grid re-flow of the same cells** (the matrix is authored once as a grid of `.mx-label` and `.mx-cell` divs sharing the `.cov-table` cell renderer), which snaps cleanly. If staying on `<table>`, apply snap to the wrapping `.cmp-scroll` and widen columns via `min-width`.

### CSS (live-page tokens, 768px cut)

```css
/* ---- Pattern A: swipeable plan columns (2-3 plans), phones only ---- */
@media (max-width:767px){

  /* the matrix re-flows to: [sticky label col] + [N snapping plan cols] */
  .mx[data-cols="2"], .mx[data-cols="3"]{
    display:grid;
    grid-auto-flow:column;
    /* label col fixed; each plan col = 80vw minus the label so 1 full plan shows */
    grid-template-columns:var(--mx-label,116px);
    grid-auto-columns:calc(80vw - var(--mx-label,116px));
    overflow-x:auto;
    scroll-snap-type:x mandatory;          /* hard snap, one plan at a time */
    -webkit-overflow-scrolling:touch;
    overscroll-behavior-x:contain;
    border:1px solid var(--line);
    border-radius:var(--r-md,12px);
    background:var(--surface,#FFFDF8);
  }

  /* sticky spec-label column: pinned left, full height */
  .mx .mx-labelcol{
    position:sticky; left:0; z-index:6;
    background:var(--surface-2,#F6F0E6);
    border-right:1px solid var(--line);
    box-shadow:2px 0 6px rgba(8,42,48,.05);  /* faint edge so it reads as pinned */
  }

  /* each plan column snaps into view */
  .mx .mx-plancol{
    scroll-snap-align:start;
    scroll-snap-stop:always;                 /* never skip a plan on a fast flick */
    border-right:1px solid var(--line-soft);
  }

  /* plan name + FROZEN price header stays labeled while specs scroll */
  .mx .mx-plancol .mx-head,
  .mx .mx-labelcol .mx-head{
    position:sticky; top:0; z-index:5;
    background:var(--surface-2,#F6F0E6);
    border-bottom:1px solid var(--line);
  }

  /* keep Major / Implants / Ortho visible - never display:none a coverage row */
  .mx .mx-row{ display:contents; }           /* rows are grid bands, never collapsed */

  /* CTA row per column survives the reflow, shrunk */
  .mx .mx-cta .btn{ min-height:40px; font-size:13px; padding:0 12px; }
}

/* honor the live page's global reduced-motion contract */
@media (prefers-reduced-motion:reduce){
  .mx{ scroll-behavior:auto; }
}
```

### JS — dot indicator + snap sync (progressive enhancement; matrix works with JS off)

```js
// Pattern A: reflect scroll position into dot indicators. No DOM rebuild.
(function(){
  var mx = document.querySelector('.mx[data-cols="2"], .mx[data-cols="3"]');
  if(!mx) return;
  var cols = [].slice.call(mx.querySelectorAll('.mx-plancol'));
  var dots = document.querySelector('.mx-dots');
  if(!dots){ return; }

  // build one dot per plan column
  cols.forEach(function(_,i){
    var d = document.createElement('button');
    d.className='mx-dot'; d.type='button';
    d.setAttribute('aria-label','Show plan '+(i+1)+' of '+cols.length);
    d.addEventListener('click', function(){
      cols[i].scrollIntoView({inline:'start', behavior:'smooth', block:'nearest'});
    });
    dots.appendChild(d);
  });

  // observe which plan column is snapped into view, mark its dot active
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var i = cols.indexOf(e.target);
          [].forEach.call(dots.children, function(dot,j){
            dot.setAttribute('aria-current', j===i ? 'true' : 'false');
          });
        }
      });
    }, { root: mx, threshold: 0.6 });   // 60% visible = "the plan you're reading"
    cols.forEach(function(c){ io.observe(c); });
  }
})();
```

---

## 3. Pattern B — stacked accordion with synchronized "Compare specs" (4 plans)

### Behavior
- Each plan becomes a **vertical card** (reuse the File 02 expanded card / `.lcard` family on the live page). Collapsed by default to plan name + FROZEN price + best-for + one CTA.
- A single **"Compare specs"** toggle at the top of the stack flips **all** cards open at once into a **synchronized, row-aligned read**: every card renders the identical fixed row order (Cost → Limits → Coverage → Practical), so scanning vertically lines the same spec up across stacked plans (annual max under annual max, Major under Major, Implants under Implants).
- Row labels are repeated inside each card (since there is no shared left column when stacked) and use the muted `.ct-` label style.
- `Not covered` stays visible/muted (spec §3), and Major / Implants / Ortho rows are always rendered.

### CSS

```css
/* ---- Pattern B: stacked accordion (4 plans), phones only ---- */
@media (max-width:767px){
  .mx[data-cols="4"]{ display:block; overflow:visible; }

  .mx[data-cols="4"] .mx-plancol{
    display:block; width:100%;
    border:1px solid var(--line);
    border-radius:var(--r-md,12px);
    background:var(--surface,#FFFDF8);
    margin-bottom:12px;
  }

  /* collapsed: only header shows */
  .mx[data-cols="4"] .mx-plancol .mx-specs{ display:none; }

  /* "Compare specs" toggled -> every card opens, identical row order */
  .mx[data-cols="4"][data-compare="on"] .mx-plancol .mx-specs{ display:block; }

  /* each spec row inside a stacked card: label + value, fixed order */
  .mx[data-cols="4"] .mx-srow{
    display:grid; grid-template-columns:118px 1fr;
    gap:10px; padding:9px 14px;
    border-top:1px solid var(--line-soft);
    align-items:center;
  }
  .mx[data-cols="4"] .mx-srow .mx-slabel{
    font-size:11px; font-weight:600; letter-spacing:.02em;
    text-transform:uppercase; color:var(--ink-faint,#8A958F);
  }
  /* coverage cells reuse the existing renderer untouched */
  .mx[data-cols="4"] .mx-srow .cov-cell{ font-size:12.5px; }

  /* band separators so the eye still jumps Cost/Limits/Coverage/Practical */
  .mx[data-cols="4"] .mx-bandhead{
    padding:7px 14px; font-size:10px; font-weight:700;
    text-transform:uppercase; letter-spacing:.05em;
    color:var(--teal-300,#5E8C92); background:var(--cream,#F6F0E6);
  }
}
```

### JS — single synchronized toggle

```js
// Pattern B: one toggle opens/closes ALL stacked cards in sync (row-aligned read).
(function(){
  var mx = document.querySelector('.mx[data-cols="4"]');
  var btn = document.querySelector('.mx-compare-toggle');
  if(!mx || !btn) return;

  btn.addEventListener('click', function(){
    var on = mx.getAttribute('data-compare') === 'on';
    mx.setAttribute('data-compare', on ? 'off' : 'on');
    btn.setAttribute('aria-expanded', String(!on));
    btn.textContent = on ? 'Compare specs' : 'Hide specs';
    // no per-card state: synchronized by design so specs stay row-aligned
  });
})();
```

---

## 4. Hard rules carried from the spec (do not violate)

1. **Never** horizontal-scroll a full multi-column table at phone width (kill the ZIP `min-width:880px` + bare `overflow-x:auto` approach for the hub matrix).
2. **Never** hide Major / Implants / Orthodontics (or Implants) rows to save space. They are decision data. `Not covered` renders muted/italic, never blank.
3. Coverage cells use the **existing** `.cov-table` / `.ct-pct` / `.ct-na` renderer, authored once. Mobile reflow changes layout only, not cell content.
4. **Premiums FROZEN** — the price header shows the same illustrative shelf value as desktop; no recompute on mobile.
5. **No em-dashes** in any visible copy added (dot labels, "Compare specs", caveats).
6. Keep the spec §3 sticky behaviors in spirit: Pattern A keeps a sticky label column + sticky price header; Pattern B repeats labels per card.
7. Honor `prefers-reduced-motion` (live page sets it globally) — smooth-scroll/snap degrade to instant.
8. One recommended column may keep its tinted `★` header in both patterns (at most one).

---

## 5. Breakpoint summary (match the live page ladder)

| Width | Matrix behavior |
|---|---|
| >= 768px | Full N-column matrix (desktop spec, unchanged) |
| < 768px, 2–3 plans | **Pattern A** — sticky label col + 80vw snapping plan columns + dots |
| < 768px, 4 plans | **Pattern B** — stacked accordion + synchronized "Compare specs" |
| < 640px | inherit live-page spacing polish (`.wrap` padding 16px, sticky bar full-width) |

The pattern is selected by `data-cols` set on the matrix container when the compare tray opens it, so the switch is pure CSS and survives resize without a JS rebuild.
