# Hub 2.0 — By-Situation / Life-Event Module Spec

**Module:** Problem-first "Start with your situation" picker for the LIVE hub
**Positioning anchor:** Frame insurance around life events, not carrier brands. "Get cover today, see a dentist tomorrow."
**Constraint:** Premiums FROZEN. No em-dashes. Frozen plan data only. Analyze/spec only.

---

## 1. Grounding — what already exists

All references are to `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`.

### 1a. The current "By situation" section (markup)
- Section shell: line **1041-1046**, `<section id="situation">` with `<div class="pc-grid" id="situationGrid">`.
- TOC link to it: line **888**, `<a href="#situation">Life event</a>`.
- Heading copy (line 1043): eyebrow "By situation", H2 "Start where life put you", sub "Pick the one that sounds like you and we will preset the match."

### 1b. The SITUATIONS data array (line 1871)
Six tiles, each `[title, subline, presetObject]`. The preset object feeds the Smart Match planner:
```
['I was laid off and lost dental', 'Coverage that starts fast, without overpaying.', {goal:'preventive', l:'Cleaning', time:0, budget:35}]
['My benefits start in 90 days',  'Bridge the gap with a no-wait plan.',          {goal:'basic',      l:'Fillings', time:0, budget:60}]
['My kid needs braces',           'The short list of plans that cover kids ortho.',{goal:'orthoChild', l:'Braces',   time:3, budget:90}]
['I need a crown this year',      'Balance the wait against the annual max.',      {goal:'major',      l:'Crown / RCT', time:9, budget:70}]
['I want an implant soon',        'Plans that actually pay toward implants.',      {goal:'implant',    l:'Implant',  time:3, budget:90}]
['I just want cleanings covered', 'Cheapest plans with day-one preventive care.',  {goal:'preventive', l:'Cleaning', time:0, budget:35}]
```

### 1c. How it renders + wires today (renderStatics, line 1904-1905)
```js
$('#situationGrid').innerHTML = SITUATIONS.map((s,i)=>'<div class="pc" data-i="'+i+'"><h3>'+s[0]+'</h3><p>'+s[1]+'</p></div>').join('');
$('#situationGrid').querySelectorAll('.pc').forEach(c=>c.addEventListener('click',()=>applySituation(SITUATIONS[c.dataset.i][2])));
```
Cards are bare title plus subline. No plan named. No price. No deep link. Clicking only scrolls and presets a chip.

### 1d. applySituation — the existing preset bridge (line 1915-1920)
```js
function applySituation(s){
  const m={preventive:'cleaning', basic:'filling', orthoChild:'braces', major:'crown', implant:'implant'};
  const need=m[s.goal];
  const t=document.getElementById('match'); if(t)t.scrollIntoView({behavior:'smooth'});
  if(need){
    const idx=PROBLEMS.findIndex(p=>p.k===need);
    const chips=document.querySelectorAll('#problemChips .he-chip');
    if(idx>=0&&chips[idx]) setTimeout(()=>chips[idx].click(),360);
  }
}
```
This maps a situation `goal` to a PROBLEMS key, scrolls to `#match` (the Smart Match / problem-first hero, line 876), and programmatically clicks the matching hero chip after a 360ms delay so the recommendation renders. This is the preset mechanism we keep and extend.

### 1e. The PROBLEMS hero array (line 1988-2001) — the recommendation engine
Each problem already carries a recommended `plan` key, a `cat`, and a one-line `why`. These are the frozen, copy-approved mappings we reuse:
```
cleaning -> uhc      '100% preventive from day one, at the lowest monthly premium.'
filling  -> guardian '85% on fillings from day one, with no waiting period.'
crown    -> ameritas 'Major work can start day one, with no wait to sit out.'
crown(emergency) -> ameritas 'Care from day one, with no waiting period to sit through.'
braces   -> DUO: guardian (kids under 19) + delta (adults too)
implant  -> humana   'Implants on the fastest 6-month ramp, plus vision.'
lost     -> uhc      'Activates fast to bridge the gap, from about $30 a month.'
other    -> moo      'A high $5,000 maximum that stretches across almost everything.'
```
The hero renders these via `recCardHtml` (line 2007) and `renderHeroRec` (line 2019), including the `waitNote` timeline check (line 2006) and `enrollUrl(p)` "Activate this plan" CTA.

### 1f. Frozen plan data (seed JSON, line 1220-1228)
Used below for the price column. Monthly premiums are FROZEN: UHC $30, Aetna $50, MoO $57, Ameritas $60, Guardian $70, Delta $75, Humana $100, MetLife $100.

### Note on the ZIP hub source
The path in the mandate, `docs/ppo-redesign/_zip-21jun/ppo/index.html`, does not exist in this checkout (confirmed by glob over `**/_zip-21jun/**` and `**/ppo-redesign/**`, both empty). The `docs/ppo-redesign/agents/hub20/` directory also did not exist and was created for this memo. The live `compare-ppo-dental-plans.html` `#situation` picker is therefore the authoritative source for the "Start with your situation" pattern, and this spec ports it to the LIVE hub.

---

## 2. The problem we are fixing

The current situation cards are dead ends visually. They name a life event but show no plan, no price, and no reason. A user has to click and trust the scroll to reveal anything. A health-tech "by situation" module should answer, on the card itself: which plan, why, how much, and where it takes me. That is the upgrade. We keep the life-event framing (never brand-first) and surface the recommendation that the PROBLEMS array already computes.

---

## 3. Spec — health-tech "By situation" cards

### 3a. Situation -> plan mapping (frozen)

Each situation resolves to ONE recommended plan (braces is the one deliberate duo, mirroring PROBLEMS). The `why` lines are lifted/aligned to the frozen PROBLEMS copy so nothing new needs sign-off. Deep link goes to the plan brief anchor (`#plan-<key>` / `#shelf`) and the preset drives Smart Match.

| Situation (life event) | Rec plan | Frozen price | One-line why | Smart Match preset (goal / need key) |
|---|---|---|---|---|
| Cracked tooth or in pain | Ameritas PrimeStar Care Complete | $60/mo | Major work from day one, no waiting period to sit through. | major -> crown, emergency time:0 |
| I lost my dental benefits / COBRA is too pricey | UnitedHealthcare Primary Dental | $30/mo | Activates next business day to bridge the gap, from $30 a month. | preventive -> lost/cleaning, time:0 |
| New job, benefits start in ~90 days | Guardian Premier 2.0 | $70/mo | 85% on fillings from day one, so a 90-day gap is fully covered. | basic -> filling, time:0 |
| My kid needs braces | Guardian Premier 2.0 (kids under 19) + Delta Dental PPO Premium (adults too) | $70 / $75 mo | Guardian pays 50% on kids ortho; Delta adds adult braces and aligners. | orthoChild -> braces, time:3 |
| Big treatment year, crown or root canal | Ameritas PrimeStar Care Complete | $60/mo | Major can start day one, and the max grows to $3,500 in year two. | major -> crown, time:9 |
| I want an implant soon | Humana Extend 5000 | $100/mo | Implants on the fastest 6-month ramp, plus a vision bundle. | implant -> implant, time:3 |
| I just want cleanings covered | UnitedHealthcare Primary Dental | $30/mo | 100% preventive from day one at the lowest premium on the shelf. | preventive -> cleaning, time:0 |
| Something else / not sure | Mutual of Omaha Dental Preferred | $57/mo | A high $5,000 maximum that stretches across almost everything. | other -> cleaning fallback |

Every plan, price, and waiting-period claim above is traceable to the frozen seed JSON (line 1220-1228) and the PROBLEMS `why` strings (line 1988-2001). Nothing invented.

### 3b. Data shape (drop-in replacement for SITUATIONS, line 1871)

Extend each tuple with `plan` (or `plans` for the duo) and an explicit `need` so the card can render the recommendation without re-deriving it:
```js
const SITUATIONS=[
  {t:'Cracked tooth or in pain',   sub:'Same-week care, no waiting period to sit through.', plan:'ameritas', need:'crown',   emergency:true, goal:'major',      time:0},
  {t:'I lost my dental benefits',  sub:'Bridge the gap fast, from about $30 a month.',      plan:'uhc',      need:'lost',                     goal:'preventive', time:0},
  {t:'New job, benefits in ~90 days', sub:'A no-wait plan that fully covers the gap.',      plan:'guardian', need:'filling',                  goal:'basic',      time:0},
  {t:'My kid needs braces',        sub:'The short list of plans that cover kids ortho.',    plans:['guardian','delta'], need:'braces',        goal:'orthoChild', time:3},
  {t:'Big treatment year',         sub:'Balance the wait against the annual max.',          plan:'ameritas', need:'crown',                    goal:'major',      time:9},
  {t:'I want an implant soon',     sub:'Plans that actually pay toward implants.',          plan:'humana',   need:'implant',                  goal:'implant',    time:3},
  {t:'I just want cleanings covered', sub:'Cheapest plan with day-one preventive care.',    plan:'uhc',      need:'cleaning',                 goal:'preventive', time:0},
  {t:'Something else / not sure',  sub:'Highest maximum, stretches across almost anything.',plan:'moo',      need:'other',                    goal:null,         time:18}
];
```
`why` text is not duplicated here. The renderer pulls it from PROBLEMS by `need` key (single source of truth), falling back to the plan's `best` string.

### 3c. Render logic (replaces line 1904-1905)

```js
function situationWhy(s){
  const p=PROBLEMS.find(x=>x.k===s.need);
  if(p&&p.why)return p.why;
  if(p&&p.plans)return p.plans[0].why;
  return '';
}
function situationCard(s,i){
  const duo=!!s.plans;
  const k0=duo?s.plans[0]:s.plan;
  const p=planByKey(k0);
  const price=p&&p.monthly?money(p.monthly)+'/mo':'';
  const logos=duo?s.plans.map(k=>carrierLogo(k)).join(''):carrierLogo(k0);
  const name=duo?'Guardian + Delta':(p?p.carrier+' '+p.name:'');
  return '<button type="button" class="sit-card" data-i="'+i+'">'
    +'<span class="sit-event">'+s.t+'</span>'
    +'<span class="sit-sub">'+s.sub+'</span>'
    +'<span class="sit-rec">'
      +'<span class="sit-logos">'+logos+'</span>'
      +'<span class="sit-rec-id"><span class="sit-rec-name">'+name+'</span>'
      +(price?'<span class="sit-rec-price">'+price+'</span>':'')+'</span>'
    +'</span>'
    +'<span class="sit-why">'+situationWhy(s)+'</span>'
    +'<span class="sit-go">See this plan <span class="arr" aria-hidden="true">&rarr;</span></span>'
    +'</button>';
}
function renderSituations(){
  const g=$('#situationGrid'); if(!g)return;
  g.innerHTML=SITUATIONS.map(situationCard).join('');
  g.querySelectorAll('.sit-card').forEach(c=>c.addEventListener('click',()=>applySituation(SITUATIONS[c.dataset.i])));
}
```
`carrierLogo` (line 1986), `planByKey` (line 2004), `money`, and PROBLEMS are all already in scope on the page. No new dependencies.

### 3d. How it presets Smart Match (extends applySituation, line 1915)

Keep the existing scroll-and-click bridge, but (1) pass the richer object, (2) also carry the timeline so `heroWhen` is set, and (3) deep link rather than only scroll when the user wants the brief. Updated function:
```js
function applySituation(s){
  const need=s.need;
  const t=document.getElementById('match'); if(t)t.scrollIntoView({behavior:'smooth'});
  if(s.emergency){heroWhen=0;}
  else if(typeof s.time==='number'){heroWhen=s.time;}     // preset the WHEN timeline
  const idx=PROBLEMS.findIndex(p=>p.k===need);
  const chips=document.querySelectorAll('#problemChips .he-chip');
  if(idx>=0&&chips[idx]) setTimeout(()=>{chips[idx].click();},360);
}
```
Flow: click situation card -> smooth-scroll to `#match` -> the matching hero chip is clicked -> `selectNeed` (line 2037) runs -> `renderWhen` + `renderHeroRec` paint the recommended plan card with the timeline already set. The user lands on the exact plan the situation card promised, now inside the interactive Smart Match where they can adjust timeline, household, and budget. This is the "presets the match" contract, preserved and made consistent (card promise == hero result, because both read the same PROBLEMS mapping).

### 3e. Optional secondary deep link
The card is one click. If we want an explicit brief link separate from the Smart Match preset, the secondary affordance is the plan brief: each plan key has `#plan-<key>` (referenced in schema, line 1932) and the shelf at `#shelf` (line 989). Add a small text link inside `.sit-go` area only if testing shows users want the static brief over the interactive flow. Default: keep one click = preset Smart Match.

---

## 4. HTML / CSS

### 4a. Section markup (no structural change; keep line 1041-1046)
Only the heading copy is refreshed to health-tech tone, the grid id stays `#situationGrid` so TOC link (line 888) and scrollspy keep working:
```html
<section id="situation">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span class="sp">&#10038;</span> By situation</span>
      <h2>Start with what brought you here</h2>
      <p>Pick the life moment that fits. We point to one plan, tell you why, and set up your match.</p>
    </div>
    <div class="sit-grid" id="situationGrid"></div>
  </div>
</section>
```

### 4b. CSS (uses existing design tokens only)
```css
.sit-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.sit-card{display:flex;flex-direction:column;align-items:stretch;text-align:left;gap:8px;
  padding:18px 18px 16px;background:var(--cream-card,#FFFDF8);border:1px solid var(--line,#E8E2D8);
  border-radius:14px;cursor:pointer;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease;font:inherit}
.sit-card:hover{border-color:var(--teal-300,#5E8C92);box-shadow:0 6px 20px rgba(8,42,48,.08);transform:translateY(-2px)}
.sit-card:focus-visible{outline:2px solid var(--teal-700,#14525B);outline-offset:2px}
.sit-event{font-family:'Fraunces',serif;font-weight:500;font-size:18px;color:var(--ink,#082A30);line-height:1.25}
.sit-sub{font-size:13px;color:var(--ink-soft,#56655F);line-height:1.45}
.sit-rec{display:flex;align-items:center;gap:10px;margin-top:4px;padding-top:12px;border-top:1px solid var(--line,#E8E2D8)}
.sit-logos{display:inline-flex;gap:-6px}
.sit-rec-id{display:flex;flex-direction:column;line-height:1.2}
.sit-rec-name{font-size:13px;font-weight:600;color:var(--ink,#082A30)}
.sit-rec-price{font-size:12px;color:var(--ink-faint,#8A958F)}
.sit-why{font-size:12.5px;color:var(--body,#3A4A42);line-height:1.5}
.sit-go{margin-top:auto;font-size:13px;font-weight:600;color:var(--teal-700,#14525B);display:inline-flex;align-items:center;gap:6px}
.sit-go .arr{transition:transform .18s ease}
.sit-card:hover .sit-go .arr{transform:translateX(3px)}
```
No gradients, no glassmorphism, no em-dashes, tokens only. `.clogo` lockups come from `carrierLogo` (line 1986), already styled on the page.

### 4c. Boot wiring
In `renderStatics` (line 1894), replace the two `#situationGrid` lines (1904-1905) with a single call to `renderSituations()`, and define `renderSituations` alongside the other render helpers. No new boot entry point needed since `renderStatics` already runs after PLANS load.

---

## 5. Why this stays on-positioning

- Cards lead with the LIFE EVENT (Fraunces, largest text). The carrier logo and name are secondary, below a divider. We never sell a brand first.
- Every "why" is plain-language and timeline-aware, the same voice as the hero (line 1989-2000).
- One recommended plan per situation removes the comparison-shopping burden the brand carries. The interactive Smart Match is still one click away for users who want to tune.
- Frozen data throughout: prices, waits, and copy all trace to existing seed JSON and PROBLEMS. Nothing requires repricing or new approval.

---

## 6. Build checklist (no code shipped in this memo)
1. Replace SITUATIONS array (line 1871) with the object form in 3b.
2. Add `situationWhy`, `situationCard`, `renderSituations` near renderStatics.
3. Swap lines 1904-1905 for `renderSituations()`.
4. Update `applySituation` (line 1915-1920) to set `heroWhen` from `s.time` / `s.emergency`.
5. Refresh `#situation` heading copy (line 1043) and rename grid class to `.sit-grid` (keep id).
6. Append the section 4b CSS to the page stylesheet.
7. QA: each card's named plan must equal the hero rec after preset (card promise == Smart Match result), since both read PROBLEMS.
