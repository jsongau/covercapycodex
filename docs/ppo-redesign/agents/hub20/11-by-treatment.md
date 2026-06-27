# Hub 2.0 — By-Treatment Module, Re-Spec (health-insurance style)

Agent: hub20 / 11-by-treatment
Scope: ANALYZE + SPEC only. Premiums and plan facts FROZEN. No em-dashes.

---

## 1. Why the current module fails

The live by-treatment section (`compare-ppo-dental-plans.html`, `id="treatment"`, `#treatGrid`,
line 1031-1036) is a grid of 8 editorial mini-cards built from the `TREATMENTS` array
(line 1870) and rendered at line 1895:

```js
$('#treatGrid').innerHTML=TREATMENTS.map(t=>'<a class="mini" href="'+t[2]+'"><h3>'+t[0]+'</h3><p>'+t[1]+'</p></a>').join('');
```

Each card is a headline plus a sentence of prose ("Which plans pay, and how long you wait.")
linking to a guide. It tells the shopper a procedure exists but never answers the only
health-insurance question that matters: **which plan wins for THIS procedure, at what
percent, after what wait.** It is a directory, not a decision tool. That is the editorial
criticism.

The carrier ZIP pages already solve this with a real coverage grid. In
`docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html` the `.covrow` rows
(CSS lines 160-175, markup lines 453-490) present each procedure as a compact
**cell = percent badge + wait label**:

- `.cov-cell.is-covered` (green tint) = full/100%
- `.cov-cell.is-partial` (amber tint) = a coinsurance percent
- `.cov-cell.is-none` (grey tint) = not covered
- `.cr-pays` holds the % badge, `.cr-wait` holds "No wait" / "6-month wait"

We reuse exactly that cell vocabulary, but pivot it: instead of one plan down its
procedures, we show **one procedure across the plans, best-in-row marked.**

---

## 2. Data source (frozen)

All numbers come straight from the plan data island
(`compare-ppo-dental-plans.html` lines 1218-1229, `<script id="plans-data">`),
live plans only (`status==='live'`). Nothing is invented. `treatments[k] = {pct, wait}`
in months; `null` means not covered.

| Plan (key) | major | implant | orthoChild | orthoAdult | whitening |
|---|---|---|---|---|---|
| delta | 50% / 12mo | 50% / 12mo | 50% / 12mo | 50% / 12mo | none |
| uhc | none | none | none | none | none |
| aetna | 50% / 12mo | none | none | none | none |
| ameritas | 20% / 0mo (Y2 50%) | 20% / 0mo | none | none | none |
| guardian | 50% / 12mo | 50% / 12mo | 50% / 12mo | none | 50% / 6mo |
| moo | 20% / 0mo (Y2 50%) | 20% / 0mo (Y2 50%) | none | none | none |
| humana | 50% / 6mo (Y2 60%) | 50% / 6mo (Y2 60%, $2k/yr $4k life cap) | none | none | $200/yr allow / 3mo |
| metlife-ncd | gathering-reviews, excluded | | | | |

---

## 3. Per-procedure "which plan wins" rankings

Ranking rule (health-insurance logic, two honest axes):
**Fastest to pay** (lowest wait, then highest day-one %) and **Most generous** (highest %,
break ties by lower wait, then note Y2 step-ups). We surface the row leader as a
`is-best` marker and order the other live plans beneath it. UHC and gathering-reviews
plans are listed as "not covered" rows so the absence is explicit, not hidden.

### Implants  → guide `/best-dental-insurance-for-implants/`
| Rank | Plan | Cell (% / wait) | Note |
|---|---|---|---|
| BEST (fastest) | Ameritas PrimeStar | 20% / No wait | day-one, rises to 50% Y2; bone graft day one |
| tie (fastest) | Mutual of Omaha | 20% / No wait | rises to 50% Y2, under $5,000 max |
| BEST (soonest real %) | Humana Extend 5000 | 50% / 6-month | Y2 60%; implant sub-cap $2k/yr, $4k lifetime |
| | Guardian Premier 2.0 | 50% / 12-month | |
| | Delta Dental PPO Premium | 50% / 12-month | |
| not covered | Aetna, UnitedHealthcare | — | |

Lead links: Ameritas `/dental-insurance/ppo-plans/ameritas-primestar/`,
Humana `/dental-insurance/ppo-plans/humana-extend-5000/`.

### Crowns and major work  → guide `/best-dental-insurance-for-crowns/`
(major tier governs crowns, bridges, dentures)
| Rank | Plan | Cell | Note |
|---|---|---|---|
| BEST (fastest) | Ameritas / Mutual of Omaha | 20% / No wait | both day one, both step to 50% Y2 |
| BEST (soonest 50%) | Humana Extend 5000 | 50% / 6-month | Y2 60% |
| | Delta, Guardian, Aetna | 50% / 12-month | |
| not covered | UnitedHealthcare | — | |

### Root canals  → guide `/best-dental-insurance-for-root-canals/`
Same major-tier grid as crowns. Leader: Ameritas / MOO day-one 20%; Humana 50% / 6mo.
(One guide note: some plans class RCT as basic; on this shelf it sits in major.)

### Dentures  → guide `/best-dental-insurance-for-dentures/`
Same major-tier grid. Leader: Ameritas / MOO day-one; Humana 50% / 6mo; Delta/Guardian/Aetna 50% / 12mo.

### Braces and Invisalign  → guide `/best-dental-insurance-for-braces/`
| Rank | Plan | Cell | Note |
|---|---|---|---|
| BEST (only adult option) | Delta Dental PPO Premium | 50% / 12-month | adults AND dependents |
| child only | Guardian Premier 2.0 | 50% / 12-month | dependents under 19 |
| not covered | all other live plans | — | adult ortho is rare on individual PPO |

Lead link: Delta `/dental-insurance/ppo-plans/delta-dental/`.

### Whitening  → guide (add `/best-dental-insurance-for-whitening/`)
| Rank | Plan | Cell | Note |
|---|---|---|---|
| BEST (coinsurance) | Guardian Premier 2.0 | 50% / 6-month | percent of cost |
| allowance | Humana Extend 5000 | $200/yr / 3-month | fixed allowance, not a percent |
| not covered | all other live plans | — | |

---

## 4. HTML / CSS spec for the hub module

Drop-in replacement for the `#treatment` section. The mini-card grid stays as an entry
rail at top (still links to guides), but each card now opens / anchors a **compact
coverage panel** built from the `.cov-cell` vocabulary. Build it from `PLANS` at render
time so it never drifts from the frozen island.

### Markup (per procedure panel)

```html
<section id="treatment">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span class="sp">&#10038;</span> By treatment</span>
      <h2>Which plan wins for your procedure</h2>
      <p class="sec-sub">Each row is the coverage percent and the wait, best plan marked. Tap a procedure for the full ranking.</p>
    </div>

    <!-- entry chips: jump to each panel, still link guide via the title -->
    <div class="tx-chips" id="txChips"></div>

    <!-- one ranking panel per procedure, injected by JS -->
    <div class="tx-panels" id="txPanels"></div>
  </div>
</section>
```

Each panel rendered as:

```html
<article class="tx-panel" id="tx-implants">
  <header class="tx-phead">
    <h3>Implants</h3>
    <a class="tx-guide" href="/best-dental-insurance-for-implants/">Read the implant guide &rarr;</a>
  </header>
  <ul class="tx-rank" role="list">
    <li class="tx-row is-best">
      <span class="tx-plan"><a href="/dental-insurance/ppo-plans/ameritas-primestar/">Ameritas PrimeStar</a>
        <span class="tx-flag">Fastest to pay</span></span>
      <span class="cov-cell is-partial">20%</span>
      <span class="tx-wait">No wait</span>
    </li>
    <li class="tx-row">
      <span class="tx-plan"><a href="/dental-insurance/ppo-plans/humana-extend-5000/">Humana Extend 5000</a>
        <span class="tx-flag alt">Soonest 50%</span></span>
      <span class="cov-cell is-partial">50%</span>
      <span class="tx-wait">6-month wait</span>
    </li>
    <li class="tx-row is-none">
      <span class="tx-plan">UnitedHealthcare, Aetna</span>
      <span class="cov-cell is-none">Not covered</span>
      <span class="tx-wait">&mdash;</span>
    </li>
  </ul>
</article>
```

### CSS (reuses cov-cell tokens from the ZIP pages, adds row layout)

```css
.tx-chips{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 20px}
.tx-chip{font:inherit;font-size:13px;font-weight:600;padding:7px 13px;border:1px solid var(--line);
  border-radius:var(--r-pill);background:var(--cream-card);color:var(--ink);cursor:pointer}
.tx-chip[aria-current="true"]{background:var(--mint-soft);border-color:var(--teal-300)}

.tx-panels{display:grid;gap:14px}
.tx-panel{border:1px solid var(--line);border-radius:14px;background:var(--cream-card);overflow:hidden}
.tx-phead{display:flex;justify-content:space-between;align-items:baseline;gap:12px;
  padding:15px 18px;border-bottom:1px solid var(--line)}
.tx-phead h3{font-family:'Fraunces',serif;font-weight:500;font-size:18px;color:var(--ink);margin:0}
.tx-guide{font-size:13px;font-weight:600;color:var(--teal-700);white-space:nowrap}

.tx-rank{list-style:none;margin:0;padding:0}
.tx-row{display:grid;grid-template-columns:1fr auto 96px;gap:14px;align-items:center;
  padding:11px 18px;border-top:1px solid var(--line);font-size:13.5px}
.tx-row:first-child{border-top:none}
.tx-row.is-best{background:var(--mint-soft)}
.tx-plan{display:flex;flex-direction:column;gap:2px;color:var(--ink);font-weight:600}
.tx-plan a{color:var(--teal-700)}
.tx-flag{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--teal-700)}
.tx-flag.alt{color:var(--ink-soft)}
.tx-wait{font-size:12px;color:var(--ink-faint);text-align:right;white-space:nowrap}

/* cov-cell carried over from carrier pages, retinted to hub tokens */
.cov-cell{display:inline-flex;align-items:center;justify-self:end;font-size:13px;font-weight:600;
  padding:4px 11px;border-radius:var(--r-pill,999px)}
.cov-cell.is-covered{background:var(--mint-soft);color:var(--teal-night)}
.cov-cell.is-partial{background:var(--gold-soft);color:var(--teal-night)}
.cov-cell.is-none{background:var(--line);color:var(--ink-faint)}

@media(max-width:560px){
  .tx-row{grid-template-columns:1fr auto;row-gap:4px}
  .tx-wait{grid-column:2;text-align:right}
}
```

### JS render (build rows from frozen PLANS, no hard-coded facts)

```js
// procedure -> {label, key in treatments, guide}
const TX=[
  ['Implants','implant','/best-dental-insurance-for-implants/'],
  ['Crowns & major','major','/best-dental-insurance-for-crowns/'],
  ['Root canals','major','/best-dental-insurance-for-root-canals/'],
  ['Dentures','major','/best-dental-insurance-for-dentures/'],
  ['Braces & Invisalign','orthoChild','/best-dental-insurance-for-braces/'],
  ['Whitening','whitening','/best-dental-insurance-for-whitening/']
];
const planUrl=p=>'/dental-insurance/ppo-plans/'+p.slug+'/';
const waitLbl=w=>w===0?'No wait':w+'-month wait';

function txRows(key){
  const cov=[],none=[];
  live().forEach(p=>{
    const t=p.treatments[key];
    if(!t){none.push(p.carrier+' '+p.name);return;}
    // whitening allowance has no pct
    const pct=t.pct!=null?t.pct:(t.allowance?'$'+t.allowance+'/yr':'');
    cov.push({p,pct,wait:t.wait,raw:t});
  });
  // sort: lowest wait first, then highest pct
  cov.sort((a,b)=> a.wait-b.wait || (b.raw.pct||0)-(a.raw.pct||0));
  return {cov,none};
}
function renderTreatments(){
  document.getElementById('txPanels').innerHTML=TX.map(([label,key,guide])=>{
    const {cov,none}=txRows(key);
    const rows=cov.map((r,i)=>{
      const cls=r.pct===100?'is-covered':'is-partial';
      const best=i===0?' is-best':'';
      return '<li class="tx-row'+best+'"><span class="tx-plan"><a href="'+planUrl(r.p)+'">'
        +r.p.carrier+' '+r.p.name+'</a>'+(i===0?'<span class="tx-flag">Best for this</span>':'')
        +'</span><span class="cov-cell '+cls+'">'+r.pct+'</span><span class="tx-wait">'+waitLbl(r.wait)+'</span></li>';
    }).join('');
    const noneRow=none.length?'<li class="tx-row is-none"><span class="tx-plan">'+none.join(', ')
      +'</span><span class="cov-cell is-none">Not covered</span><span class="tx-wait">&mdash;</span></li>':'';
    return '<article class="tx-panel" id="tx-'+key+'-'+label.replace(/\W+/g,'').toLowerCase()
      +'"><header class="tx-phead"><h3>'+label+'</h3><a class="tx-guide" href="'+guide
      +'">Read the guide &rarr;</a></header><ul class="tx-rank" role="list">'+rows+noneRow+'</ul></article>';
  }).join('');
}
```

This keeps every percent and wait sourced from the data island, marks the row leader,
links each procedure to its treatment guide and each plan to its plan page, and presents
the answer as scannable %·wait cells rather than prose. Y2 step-ups (Ameritas/MOO to 50%,
Humana to 60%) and the implant sub-cap belong in the panel detail / guide, not the row,
to keep rows one line each.

---

## 5. Open items
- Add a `/best-dental-insurance-for-whitening/` guide (referenced above, not in current TREATMENTS).
- Confirm Delta is the only adult-ortho row before labelling it "only adult option."
- MetLife NCD stays excluded from rankings while `status==='gathering-reviews'`.
