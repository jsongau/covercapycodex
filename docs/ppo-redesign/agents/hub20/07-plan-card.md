# Hub20 · 07 · Plan Card spec — health-tech PLAN CARD for the live grid

> Replaces the editorial `.pcard` in `compare-ppo-dental-plans.html` `function planCard(p)`
> (line ~1429) with a scannable health-insurance unit, grounded in the ZIP hub
> (`_zip-21jun/ppo/index.html` `.plancard` / `.pc-strip`, line ~226 / ~618) and the
> presentation spec (`presentation-specs/02-plan-card-spec.md`).
> Premiums are FROZEN — every card shows `From $X/mo · illustrative`, number never bare.
> No em-dashes anywhere in copy.

---

## 1. What changes and why

The current live card (`.pcard`) is editorial: a big serif price, a prose `pwhy`, and a
4-row `.cov` list that buries the decision cells in text. The ZIP hub proved the better
pattern — a fixed 5-cell coverage strip you can diff across cards in under three seconds.
We port that strip onto the live card and keep the live card's strengths (real CTAs,
compare toggle, carrier logo plate, tier grouping).

Highest-impact single change, per the spec: **add the 5-cell coverage strip to every
card.** Everything else is supporting structure.

---

## 2. Anatomy (top to bottom)

1. **Logo plate** + **carrier kicker** (uppercase) + **plan name** (serif) — reuse
   `carrierLogo(p.key,'sm')`, the `.pc-id` block from ZIP.
2. **Plan-shape chip** (`p.tier` → Essentials / Full / Maximum) + hard **eligibility flag**
   (`Ages {ageCap} and under` when `p.ageCap`, `Under review` when gathering-reviews).
3. **Prominent price** — `From $30/mo`, the LARGEST text on the card, distinct color
   (`--green-d`), with `illustrative` qualifier directly beneath. Paired in the same block
   with a **spec strip**: Annual max / Deductible / Coverage starts.
4. **5-cell coverage strip** (`.pc-coverage`) — Preventive · Basic · Major · Implants ·
   Ortho, always all five, `%` big, `Not covered` muted/italic.
5. **100-80-50 mini coverage row** — the three headline percentages inline under the strip
   for the fastest visual diff (preventive / basic / major).
6. **Best-for line** — the single sentence, from `p.best`.
7. **CTAs** — `View full plan` (primary), `Verify free` (secondary), `+ Compare` checkbox.
8. **Governance foot** — one muted line: `Verified Jun 2026 · view sources`.

Most-popular variant (at most one card): elevated shadow + teal header band + ribbon,
driven by a single `recommended` flag (today `p.bestSelling` fires on two plans — pick ONE,
see §6).

---

## 3. Field mapping (live data is already complete)

| Card element | Source field | Render |
|---|---|---|
| Logo plate | `carrierLogo(p.key,'sm')` | existing |
| Carrier kicker | `p.carrier` | uppercase |
| Plan name | `p.name` | serif |
| Plan-shape chip | `p.tier` | `essentials→Essentials`, `full→Full coverage`, `maximum→Maximum` |
| Eligibility flag | `p.ageCap` | `Ages {ageCap} and under` |
| Price | `p.monthly` | `From $30/mo` (frozen, illustrative) |
| Annual max | `p.annualMax` | `money()` |
| Deductible | `p.deductible` | `$50/person` |
| Coverage starts | `p.activation` | one line |
| Strip cells | `p.treatments.{preventive,basic,major,implant,orthoAdult||orthoChild}` | `%` or `Not covered` |
| Mini row | preventive/basic/major `.pct` | `100 · 80 · 50` |
| Best-for | `p.best` | one sentence |
| Network | `p.network` | foot or strip |
| Governance | static `Verified Jun 2026` | muted foot |

Coverage cell state from `t.{cat}`: `null` → `Not covered` (muted); `pct>=80` →
covered/green; `pct` 1-79 → partial/amber. Ortho cell uses `orthoAdult || orthoChild`.

---

## 4. HTML — replaces the `return` in `planCard(p)` (live branch)

```javascript
function covCell(label, t){
  if(!t) return '<span class="pc-c"><span class="pc-k">'+label+'</span>'
    +'<span class="pc-v none">Not covered</span></span>';
  const cls = t.pct>=80 ? 'full' : 'part';
  return '<span class="pc-c"><span class="pc-k">'+label+'</span>'
    +'<span class="pc-v '+cls+'">'+t.pct+'%</span>'
    +'<span class="pc-w">'+(t.wait?('after '+t.wait+'mo'):'day one')+'</span></span>';
}
function planCard(p){
  if(p.status==='gathering-reviews'){ /* keep existing review card */ }
  const t=p.treatments, ortho=t.orthoAdult||t.orthoChild;
  const pop = p.recommended ? ' is-pop' : '';
  const chip = ({essentials:'Essentials',full:'Full coverage',maximum:'Maximum'})[p.tier]||'PPO';
  const flag = p.ageCap ? '<span class="pc-chip amber">Ages '+p.ageCap+' and under</span>' : '';
  return '<article class="pcard'+pop+'">'
    + (p.recommended ? '<div class="pc-ribbon">Most popular</div>' : '')
    + '<div class="pc-top">'
      + '<div class="pc-id">'+carrierLogo(p.key,'sm')
        + '<div><div class="pc-carrier">'+p.carrier+'</div>'
        + '<div class="pc-name">'+p.name+'</div></div></div>'
    + '</div>'
    + '<div class="pc-shape"><span class="pc-chip neutral">'+chip+'</span>'+flag+'</div>'
    + '<div class="pc-pricebar">'
      + '<div class="pc-price"><b>From '+money(p.monthly)+'</b><span>/mo</span>'
        + '<em>illustrative</em></div>'
      + '<dl class="pc-spec">'
        + '<div><dt>Annual max</dt><dd>'+money(p.annualMax)+'</dd></div>'
        + '<div><dt>Deductible</dt><dd>'+money(p.deductible)+'/person</dd></div>'
        + '<div><dt>Coverage starts</dt><dd>'+p.activation+'</dd></div>'
      + '</dl>'
    + '</div>'
    + '<div class="pc-coverage">'
      + covCell('Preventive', t.preventive)
      + covCell('Basic', t.basic)
      + covCell('Major', t.major)
      + covCell('Implants', t.implant)
      + covCell('Ortho', ortho)
    + '</div>'
    + '<div class="pc-mini"><b>'+(t.preventive?t.preventive.pct:0)+'</b>'
      + '<i>/</i><b>'+(t.basic?t.basic.pct:'–')+'</b>'
      + '<i>/</i><b>'+(t.major?t.major.pct:'–')+'</b>'
      + '<span>preventive · basic · major</span></div>'
    + '<p class="pc-best"><b>Best for</b> '+p.best+'</p>'
    + '<div class="pc-cta">'
      + '<button class="btn btn-green btn-sm" onclick="openEnrollInterstitial(\''+p.key+'\')">View full plan</button>'
      + '<div class="row">'
        + '<button class="btn btn-ghost btn-sm openbrief" data-k="'+p.key+'" style="flex:1">Verify free</button>'
        + cmpBtn(p)
      + '</div>'
    + '</div>'
    + '<div class="pc-foot"><span>Verified Jun 2026 · '
      + p.network+'</span><a class="pc-src" href="#methodology">view sources</a></div>'
  + '</article>';
}
```

Whole card is not wrapped in `<a>` (the live page uses real CTA buttons + the compare
toggle, which an outer link would swallow). Keep `View full plan` as the primary action.

---

## 5. CSS — drop in next to the existing `.pcard` block (line ~522)

```css
.pcard{position:relative;border:1px solid var(--line);border-radius:var(--radius);
  background:var(--card);padding:20px;display:flex;flex-direction:column;gap:0;
  transition:.15s}
.pcard:hover{box-shadow:var(--shadow);transform:translateY(-2px)}

/* identity */
.pc-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.pc-id{display:flex;align-items:center;gap:11px;min-width:0}
.pc-carrier{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;
  color:var(--muted)}
.pc-name{font-family:var(--serif);font-size:20px;line-height:1.15;margin-top:1px}

/* shape + flag chips */
.pc-shape{display:flex;gap:6px;flex-wrap:wrap;margin:11px 0 4px}
.pc-chip{font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px}
.pc-chip.neutral{background:var(--paper-2);color:var(--ink-soft)}
.pc-chip.amber{background:var(--gold-soft,#F3E8CF);color:#7A5B12}

/* price bar — price is the biggest, distinct color */
.pc-pricebar{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;
  margin:10px 0 4px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.pc-price b{font-family:var(--serif);font-size:32px;line-height:1;color:var(--green-d)}
.pc-price span{font-size:13px;color:var(--muted)}
.pc-price em{display:block;font-style:normal;font-size:10.5px;letter-spacing:.04em;
  text-transform:uppercase;color:var(--muted);margin-top:3px}
.pc-spec{display:grid;gap:4px;margin:0;text-align:right;font-size:12px}
.pc-spec div{display:flex;justify-content:flex-end;gap:8px}
.pc-spec dt{color:var(--muted)}
.pc-spec dd{margin:0;font-weight:600;color:var(--ink)}

/* 5-cell coverage strip (ported from ZIP .pc-strip) */
.pc-coverage{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;margin:14px 0 0;
  background:var(--line);border:1px solid var(--line);border-radius:9px;overflow:hidden}
.pc-c{background:var(--card);padding:9px 4px;text-align:center;display:flex;
  flex-direction:column;gap:3px}
.pc-k{font-size:9px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;
  color:var(--ink-faint,#8A958F)}
.pc-v{font-size:15px;font-weight:700;line-height:1}
.pc-v.full{color:var(--green-d)}
.pc-v.part{color:#9A6A12}
.pc-v.none{font-size:11px;font-weight:500;font-style:italic;color:var(--ink-faint,#8A958F)}
.pc-w{font-size:9px;color:var(--ink-faint,#8A958F)}

/* 100-80-50 mini row */
.pc-mini{display:flex;align-items:baseline;gap:5px;margin-top:9px;font-size:13px}
.pc-mini b{font-family:var(--serif);font-size:16px;color:var(--ink)}
.pc-mini i{color:var(--line-2);font-style:normal}
.pc-mini span{margin-left:6px;font-size:10.5px;letter-spacing:.03em;text-transform:uppercase;
  color:var(--muted)}

.pc-best{font-size:13px;color:var(--ink-soft);line-height:1.5;margin:12px 0 14px}
.pc-best b{font-weight:600;color:var(--ink)}

/* CTAs reuse existing .pcard-cta layout */
.pc-cta{margin-top:auto;display:flex;flex-direction:column;gap:8px}
.pc-cta .row{display:flex;gap:8px}
.pc-cta .row .btn{flex:1}

/* governance foot, one muted line */
.pc-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;
  margin-top:12px;padding-top:11px;border-top:1px solid var(--line);
  font-size:11px;color:var(--muted)}
.pc-src{color:var(--muted);text-decoration:underline}

/* Most popular — at most one card */
.pcard.is-pop{border-color:var(--green);box-shadow:0 0 0 1px var(--green),var(--shadow)}
.pc-ribbon{position:absolute;top:-1px;right:16px;background:var(--green-d);
  color:var(--paper,#fff);font-size:10.5px;font-weight:700;letter-spacing:.05em;
  text-transform:uppercase;padding:4px 11px;border-radius:0 0 8px 8px}

/* mobile: full width, price stays biggest, strip stays 5-wide and scrolls */
@media(max-width:560px){
  .pc-pricebar{flex-direction:column;align-items:flex-start;gap:10px}
  .pc-spec{text-align:left}
  .pc-spec div{justify-content:flex-start}
  .pc-coverage{overflow-x:auto}
  .pc-cta .btn{min-height:46px}
}
```

---

## 6. Rules carried over (do not break)

- **Premiums frozen.** Only the eight live `p.monthly` values render, always as
  `From $X/mo` + `illustrative`. Never compute or vary them on the card.
- **No em-dashes** in any copy string (chips, best-for, governance). Use `·` or commas.
- **Always render all five coverage cells**, even null. Null reads as `Not covered`, not
  absence.
- **Color the value, not the cell.** Backgrounds stay calm; `%` carries the signal,
  `Not covered` goes muted. Save full red/green heatmap for the comparison table.
- **At most one Most popular.** `p.bestSelling` currently fires on `uhc` and `guardian`.
  Add a single `recommended:true` (suggest `guardian` — Full tier, day-one basic) and key
  the ribbon off `recommended`, NOT `bestSelling`, or the signal dies.
- **Keep the gathering-reviews branch** (`metlife-ncd`) on its existing muted/dashed card;
  it has no premium and `basic:null`, so the strip would be mostly `Not covered`.
- **Reuse existing helpers** — `carrierLogo`, `money`, `cmpBtn`, `openbrief`,
  `openEnrollInterstitial`. This is a refactor of `planCard`'s return string + a CSS add,
  not a rewrite of the grid.

---

## 7. Migration checklist

1. Replace the live-branch `return` in `planCard(p)` (line ~1439) with §4.
2. Add `covCell()` helper above `planCard`.
3. Add §5 CSS after the `.pcard` block (line ~522); the old `.pprice / .pwhy / .cov / .badges`
   rules can stay (review card still uses some) or be pruned once review card is updated.
4. Add `recommended:true` to exactly one plan object in the data JSON (line ~1220+).
5. Verify tier grouping headers (`renderGrid`, line ~1452) still wrap the new cards — they
   do, the card class name `.pcard` is unchanged.
