# HD02 — PLANS dropdown for the control-console sub-menu

Spec only. Grounded in `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`.
No em-dashes anywhere in shipped copy.

---

## 1. What exists today (real lines)

### The sticky sub-menu (the "console")
The sticky bar is `.toc` (CSS line 118: `position:sticky;top:0;z-index:60`). Its scroll
progress strip is `#tocProg` (line 860, CSS line 119). Inside `.toc .wrap` (line 861) there are
three children, left to right:

- `.toc-brand` (line 862) — "PPO Plan Hub" brand link.
- `nav.toc-links#tocLinks` (lines 866 to 875) — the eight in-page section links.
- `.toc-cta` (line 876) — "Find a dentist".

The eight existing section links (lines 867 to 874) are all in-page anchors:

```
#match  #compare  #shelf  #treatment  #situation  #explore-carriers  #glossary-shelf  #faq
```

### Scroll-spy that drives them (lines 1923 to 1930)
`scrollspy()` only manages anchor links:

```js
const anchorLinks=links.filter(l=>l.getAttribute('href').startsWith('#'));
```

An `IntersectionObserver` toggles `.on` on whichever `#tocLinks a` matches the visible
section id (rootMargin `-30% 0px -60% 0px`). Active styling is CSS line 129:
`.toc-links a:hover,.toc-links a.on{color:var(--ink);border-color:var(--green)}`.

KEY CONSEQUENCE for coexistence: because `scrollspy()` filters on
`href.startsWith('#')`, any PLANS dropdown anchor that points to a real `/dental-insurance/...`
URL is automatically ignored by the spy. The disclosure button is a `<button>`, not an `<a>`,
so it is never observed either. No spy changes required as long as the panel links are real
hrefs and the trigger is a button. This is the load-bearing fact for the whole feature.

### The plan data island (lines 1203 to 1214)
`<script id="plans-data" type="application/json">` holds the eight plans. Each row has
`key`, `carrier`, `name`, `slug`, `status`, `monthly`. Relevant frozen facts:

| key | carrier | name | data-island slug | monthly | status |
|-----|---------|------|------------------|---------|--------|
| delta | Delta Dental | PPO Premium | `delta/ppo-premium` | 75 | live |
| uhc | UnitedHealthcare | Primary Dental | `uhc/primary-dental` | 30 | live |
| aetna | Aetna | Dental Direct | `aetna/dental-direct` | 50 | live |
| ameritas | Ameritas | PrimeStar Care Complete | `ameritas/primestar-care-complete` | 60 | live |
| guardian | Guardian | Premier 2.0 | `guardian/premier-2-0` | 70 | live |
| moo | Mutual of Omaha | Dental Preferred | `mutual-of-omaha/dental-preferred` | 90 | live |
| humana | Humana | Extend 5000 | `humana/extend-5000` | 100 | live |
| metlife-ncd | MetLife | NCD Complete | `metlife/ncd-complete` | 100 | gathering-reviews |

`PLANS` is loaded by `loadPlans()` (lines 1219 to 1224), `live()` filters to
`status==='live'` (line 1227), `money()` formats dollars (line 1228).

---

## 2. Route reality check (HARD FINDING)

The mandated directory does NOT exist yet. Shell from repo root:

```
ls -d dental-insurance        -> no dental-insurance dir
ls -d dental-insurance/ppo-plans/*/   -> No files found
```

None of the seven target pages are on disk. They MUST be created (or stubbed) before the
dropdown ships, or every link 404s. The seven mandated routes (flat slugs, trailing slash):

| # | href | maps to data key |
|---|------|------------------|
| 1 | `/dental-insurance/ppo-plans/uhc-primary-dental/` | uhc |
| 2 | `/dental-insurance/ppo-plans/aetna-dental-direct/` | aetna |
| 3 | `/dental-insurance/ppo-plans/ameritas-primestar/` | ameritas |
| 4 | `/dental-insurance/ppo-plans/guardian-premier-ppo/` | guardian |
| 5 | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | moo |
| 6 | `/dental-insurance/ppo-plans/humana-extend-5000/` | humana |
| 7 | `/dental-insurance/ppo-plans/delta-dental/` | delta |

Two slug systems are in play. The data island uses NESTED carrier/plan slugs
(`uhc/primary-dental`); the mandate uses FLAT page slugs (`uhc-primary-dental`). They do not
match and cannot be auto-derived from `d.slug`. The dropdown must therefore carry an explicit
flat-slug map keyed by `key`, decoupled from `d.slug`. Do not build these hrefs from the data
island slug. metlife-ncd has no mandated route and is intentionally omitted from the dropdown
(it is gathering-reviews, monthly under review). Result: seven links, not eight.

---

## 3. Placement in the console

Insert the PLANS disclosure as the FIRST item inside `nav.toc-links#tocLinks`, before the
`#match` link (line 867), so the console reads: Plans, Match a plan, Compare plans, and so on.
It lives inside `#tocLinks` but is a `<button>` plus a `<div>` panel, so `scrollspy()` skips it
(it only queries `#tocLinks a`, and a button is not an `a`).

---

## 4. HTML (drop into `#tocLinks`, before line 867)

```html
<div class="toc-plans" id="tocPlans">
  <button type="button" class="toc-plans-btn" id="tocPlansBtn"
          aria-haspopup="true" aria-expanded="false" aria-controls="tocPlansPanel">
    Plans
    <svg class="chev" viewBox="0 0 24 24" width="12" height="12" fill="none"
         stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
  </button>
  <div class="toc-plans-panel" id="tocPlansPanel" role="menu"
       aria-label="All PPO dental plans" hidden>
    <div class="tpp-head">All PPO plans</div>
    <!-- 7 rows, populated by JS from PLAN_PAGES; Delta rendered last with .is-delta -->
  </div>
</div>
```

Each populated row (the JS template, see section 6) is a real anchor:

```html
<a class="tpp-row" role="menuitem" href="/dental-insurance/ppo-plans/uhc-primary-dental/">
  <span class="tpp-carrier">UnitedHealthcare</span>
  <span class="tpp-name">Primary Dental</span>
  <span class="tpp-from">From $30/mo</span>
  <span class="tpp-shape" data-tier="essentials">Essentials</span>
</a>
```

`plan-shape` = the data island `tier` field, surfaced as a pill: `essentials`, `full`,
`maximum`. Delta has `tier:"full"` so its shape reads "Full" (see Delta note below).

### Delta special treatment (HD03)
Delta is rendered LAST in the panel and carries `.is-delta`, a hairline divider above it, and
an "Editor's pick" eyebrow, per HD03. Its href is the flat `/dental-insurance/ppo-plans/delta-dental/`.
Copy stays free of em-dashes and roman numerals. The Delta row markup:

```html
<a class="tpp-row is-delta" role="menuitem" href="/dental-insurance/ppo-plans/delta-dental/">
  <span class="tpp-pick">Editor's pick</span>
  <span class="tpp-carrier">Delta Dental</span>
  <span class="tpp-name">PPO Premium</span>
  <span class="tpp-from">From $75/mo</span>
  <span class="tpp-shape" data-tier="full">Full</span>
</a>
```

---

## 5. CSS (append near the `.toc-links` block, after line 130)

Uses the page's existing tokens (`--green`, `--ink`, `--muted`, `--line`, `--card`).

```css
.toc-plans{position:relative;flex-shrink:0}
.toc-plans-btn{display:inline-flex;align-items:center;gap:5px;font:500 13.5px/1 'Inter Tight',system-ui;
  color:var(--muted);background:none;border:0;cursor:pointer;padding:4px 0;border-bottom:2px solid transparent}
.toc-plans-btn:hover,.toc-plans-btn[aria-expanded="true"]{color:var(--ink);border-color:var(--green)}
.toc-plans-btn .chev{transition:transform .18s ease}
.toc-plans-btn[aria-expanded="true"] .chev{transform:rotate(180deg)}

.toc-plans-panel{position:absolute;top:calc(100% + 8px);left:0;z-index:70;min-width:320px;
  background:var(--card,#fff);border:1px solid var(--line);border-radius:12px;
  box-shadow:0 14px 40px rgba(15,27,37,.14);padding:6px;overflow:hidden}
.toc-plans-panel[hidden]{display:none}
.tpp-head{font:600 11px/1 'Inter Tight',system-ui;letter-spacing:.06em;text-transform:uppercase;
  color:var(--muted);padding:8px 10px 6px}

.tpp-row{display:grid;grid-template-columns:1fr auto;grid-template-areas:"carrier from" "name shape";
  gap:2px 12px;padding:9px 10px;border-radius:8px;text-decoration:none;align-items:center}
.tpp-row:hover,.tpp-row:focus-visible{background:var(--mint-soft,#E6F7EE);outline:none}
.tpp-carrier{grid-area:carrier;font:600 13px/1.2 'Inter Tight',system-ui;color:var(--ink)}
.tpp-name{grid-area:name;font:500 12.5px/1.2 'Inter Tight',system-ui;color:var(--muted)}
.tpp-from{grid-area:from;font:600 12.5px/1 'Inter Tight',system-ui;color:var(--green);white-space:nowrap}
.tpp-shape{grid-area:shape;justify-self:end;font:600 10.5px/1 'Inter Tight',system-ui;
  text-transform:uppercase;letter-spacing:.04em;color:var(--muted);
  border:1px solid var(--line);border-radius:999px;padding:3px 8px;white-space:nowrap}
.tpp-shape[data-tier="full"]{color:var(--green);border-color:var(--green)}
.tpp-shape[data-tier="maximum"]{color:var(--ink);border-color:var(--ink)}

.tpp-row.is-delta{margin-top:6px;border-top:1px solid var(--line);border-radius:0 0 8px 8px;
  padding-top:12px;grid-template-areas:"pick pick" "carrier from" "name shape"}
.tpp-pick{grid-area:pick;font:700 10px/1 'Inter Tight',system-ui;letter-spacing:.06em;
  text-transform:uppercase;color:var(--green)}

@media (max-width:720px){.toc-plans-panel{position:fixed;left:8px;right:8px;min-width:0}}
```

---

## 6. JS (populate + behavior, append inside the existing script block)

Add the flat-slug map and a builder, called from boot after `loadPlans()` resolves (boot is
around line 2204 where `scrollspy()` is called). The map is the single source of truth for
order and routes; metlife-ncd is absent on purpose.

```js
/* PLANS dropdown: flat page routes, decoupled from data-island slug. Delta last (HD03). */
const PLAN_PAGES=[
  {key:'uhc',      href:'/dental-insurance/ppo-plans/uhc-primary-dental/'},
  {key:'aetna',    href:'/dental-insurance/ppo-plans/aetna-dental-direct/'},
  {key:'ameritas', href:'/dental-insurance/ppo-plans/ameritas-primestar/'},
  {key:'guardian', href:'/dental-insurance/ppo-plans/guardian-premier-ppo/'},
  {key:'moo',      href:'/dental-insurance/ppo-plans/mutual-of-omaha-dental/'},
  {key:'humana',   href:'/dental-insurance/ppo-plans/humana-extend-5000/'},
  {key:'delta',    href:'/dental-insurance/ppo-plans/delta-dental/'}   // last = HD03 pick
];
const TIER_LABEL={essentials:'Essentials',full:'Full',maximum:'Maximum'};

function buildPlansDropdown(){
  const panel=document.getElementById('tocPlansPanel');if(!panel)return;
  const byKey=Object.fromEntries(PLANS.map(p=>[p.key,p]));
  let html='<div class="tpp-head">All PPO plans</div>';
  PLAN_PAGES.forEach(rt=>{
    const p=byKey[rt.key];if(!p)return;
    const isDelta=rt.key==='delta';
    const shape=p.tier||'essentials';
    html+='<a class="tpp-row'+(isDelta?' is-delta':'')+'" role="menuitem" href="'+rt.href+'">'
      +(isDelta?'<span class="tpp-pick">Editor’s pick</span>':'')
      +'<span class="tpp-carrier">'+p.carrier+'</span>'
      +'<span class="tpp-name">'+p.name+'</span>'
      +'<span class="tpp-from">From '+money(p.monthly)+'/mo</span>'
      +'<span class="tpp-shape" data-tier="'+shape+'">'+(TIER_LABEL[shape]||shape)+'</span>'
      +'</a>';
  });
  panel.innerHTML=html;
}

function initPlansDropdown(){
  const btn=document.getElementById('tocPlansBtn'),panel=document.getElementById('tocPlansPanel');
  if(!btn||!panel)return;
  let hoverTimer=null;
  const open=()=>{panel.hidden=false;btn.setAttribute('aria-expanded','true');};
  const close=()=>{panel.hidden=true;btn.setAttribute('aria-expanded','false');};
  const toggle=()=>panel.hidden?open():close();

  // Click = primary on touch and desktop.
  btn.addEventListener('click',e=>{e.stopPropagation();toggle();});

  // Hover = desktop affordance only (pointer:fine), with a close delay so the gap is forgiving.
  const wrap=document.getElementById('tocPlans');
  if(window.matchMedia('(pointer:fine)').matches){
    wrap.addEventListener('mouseenter',()=>{clearTimeout(hoverTimer);open();});
    wrap.addEventListener('mouseleave',()=>{hoverTimer=setTimeout(close,180);});
  }

  // Dismiss: outside click, Escape (returns focus to button).
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))close();});
  btn.addEventListener('keydown',e=>{
    if(e.key==='Escape'){close();btn.focus();}
    if(e.key==='ArrowDown'){e.preventDefault();open();const f=panel.querySelector('.tpp-row');if(f)f.focus();}
  });
  // Roving focus inside the menu.
  panel.addEventListener('keydown',e=>{
    const rows=[...panel.querySelectorAll('.tpp-row')];const i=rows.indexOf(document.activeElement);
    if(e.key==='Escape'){close();btn.focus();}
    if(e.key==='ArrowDown'){e.preventDefault();(rows[i+1]||rows[0]).focus();}
    if(e.key==='ArrowUp'){e.preventDefault();(rows[i-1]||rows[rows.length-1]).focus();}
    if(e.key==='Home'){e.preventDefault();rows[0].focus();}
    if(e.key==='End'){e.preventDefault();rows[rows.length-1].focus();}
  });
}
```

Wire into boot next to `scrollspy()` (around line 2204):

```js
buildPlansDropdown();
initPlansDropdown();
```

---

## 7. Behavior contract

- Trigger: a `<button aria-haspopup="true" aria-controls aria-expanded>`, never observed by spy.
- Open: click (all devices) or hover (pointer:fine only, 180ms close grace).
- Close: outside click, Escape (focus returns to button), or choosing a link (navigation).
- Keyboard: ArrowDown opens and enters; Arrow/Home/End rove; Escape exits.
- ARIA: `role="menu"` on panel, `role="menuitem"` on each anchor, `hidden` toggled with
  `aria-expanded`. Chevron rotates via CSS on `[aria-expanded="true"]`.
- Each row is a real `<a href>` to a flat route, so the scroll-spy (`href.startsWith('#')`
  filter, line 1925) ignores all seven and the existing eight section links keep working
  untouched. Zero edits to `scrollspy()`.
- Frozen prices come from the data island `monthly` field via `money()`; they are read at
  build time, not retyped.

## 8. Blocking dependency
Create the seven page directories under `/dental-insurance/ppo-plans/<flat-slug>/index.html`
before launch. Until then the links resolve to 404. Confirmed absent on disk as of this memo.
