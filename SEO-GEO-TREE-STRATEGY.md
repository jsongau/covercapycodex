# CoverCapy SEO Geo-Tree — Architecture, Gaps & Generator Patches
## Updated June 2026

The goal: a fully-interlinked geographic tree where Google can crawl from the homepage to any
office or doctor in ≤3 clicks, link equity flows both up and down the hierarchy, and every
page reinforces the others with keyword-rich, intent-matched internal links. This doc maps the
current state, names the gaps, and gives drop-in generator code so the fixes survive rebuilds.

---

## 1. The tree as it stands (June 2026 audit)

| Tier | URL pattern | Count | Renders |
|------|-------------|-------|---------|
| T3   | `/dental/{state}/` | 15 | State hub, links down to markets/cities |
| T4a  | `/dental/{state}/{market}/` | ~part of 1,086 | Metro hub, links to regions + cities + offices |
| T4b  | `/dental/{state}/{market}/{region}/` | ~part of 1,086 | Local-area hub |
| T4c  | `/dental/{state}/{market}/{city}/` | ~part of 1,086 | City directory of offices |
| T5   | `/dental/{state}/{market}/{city}/{office}/` | 10,647 | Office profile |
| T6   | `/dentists/{state}/{doctor}/` | 1,148 | Doctor profile |
| Plans| `/dental-insurance/ppo-plans/{carrier-plan}/` | 8 | Plan detail |

### Link directions confirmed working
- **T3 → T4**: state hub links down to its markets/cities.
- **T4 → T5**: city/market pages link to offices (office cards).
- **T5 → up**: breadcrumb links office → city → market → state.
- **T5 → T6**: "Meet the dentist" cross-link on the 478 offices that have a matched doctor.
- **T5 → Plans / T4 → Plans**: carrier names now link to plan pages.
- **T6 → up**: breadcrumb links doctor → city/market hubs → state.
- **Plans → directory**: each plan page now has a "Find {carrier} dentists" CTA.

### Gaps (ranked by SEO value)

1. **T4 → T6 is missing entirely (links to doctors = 0).** City and metro hubs do not surface
   "Dentists in {city}." This strands 1,148 doctor pages with thin inbound linking — they're
   only reachable from their single office (T5) and the doctor sitemap. **Highest-value fix.**
2. **T6 → Plans is missing.** Doctor pages don't link to plan pages, breaking the
   doctor→coverage funnel.
3. **Lateral (sibling) links are weak.** City pages should link to *nearby* cities; markets to
   *adjacent* markets. Sibling meshing spreads equity and captures "near me" long-tail.
4. **270 offices link to doctors with no page** (doctor has no NPI). They can't cross-link until
   those doctors get pages.
5. **Only 745 of 7,042 offices have any doctor matched** — the upstream NPI match rate caps how
   dense the T5↔T6 layer can ever be.

---

## 2. The "strong geo tree" rules

Apply these uniformly. Every page is a node with four link obligations:

- **UP** — breadcrumb to every ancestor (office→city→market→state→home). Already in place; keep
  `BreadcrumbList` JSON-LD matched to the visible crumb.
- **DOWN** — to direct children, with the child's name + geo as anchor text
  ("PPO dentists in Anaheim", not "click here").
- **LATERAL** — 4–8 sibling links (nearby cities / adjacent markets / other doctors in the city).
  Cap the count so pages don't become link farms; rotate by proximity.
- **CROSS** — to the matching plan pages and, for location pages, to the doctors practicing there.

Supporting rules:
- **Depth ≤ 3 clicks** from home to any office. Home → state → city → office. Keep the homepage
  and state hubs linking to top markets so nothing is buried.
- **One canonical host (`www`)**, one canonical path per node — no nested/flat duplicates competing.
- **Anchor text = geo + intent** ("Aetna PPO dentists in Anaheim"), never bare brand or "here".
- **ItemList schema on hubs** (T3/T4) enumerating their children; `BreadcrumbList` everywhere.
- **Sitemap index → per-tier sitemaps**, each ≤50k URLs, `lastmod` accurate.

---

## 3. Interlinking matrix (target state)

| From ↓ / To → | State T3 | Market T4a | City T4c | Office T5 | Doctor T6 | Plans |
|---|---|---|---|---|---|---|
| **T3 state** | — | down (all markets) | down (top cities) | — | — | contextual |
| **T4a market** | up | — | down (cities) + lateral (markets) | down (top offices) | **down (featured doctors) ⟵ add** | carriers |
| **T4c city** | up | up | lateral (nearby cities) | down (all offices) | **down (doctors in city) ⟵ add** | carriers |
| **T5 office** | up | up | up | lateral (nearby offices) | cross (its doctors) | carriers |
| **T6 doctor** | up | up | up (city) | cross (its offices) | lateral (other city doctors) | **cross ⟵ add** |
| **Plans** | — | — | down (directory CTA) | — | — | lateral (other plans) |

The three **⟵ add** cells are the open gaps.

---

## 4. Action plan (priority order)

1. **Add T4c → T6 "Dentists in {city}" block.** Use `.cross-links.json` (office→doctor) joined
   to the city's offices. Render a rail of doctor cards linking to `/dentists/{state}/{slug}/`.
   Biggest single lift to doctor-page authority. *(patch §5.3)*
2. **Add T6 → Plans.** On doctor pages, link the carriers the office accepts to plan pages
   (reuse the T5 `ccPlanLink` map). *(patch §5.4)*
3. **Bake the existing hand-edits into the generators** so a rebuild doesn't wipe them:
   T5 carrier links, plan-page CTA, T5→T6 cross-link, T6 breadcrumb→/dental hubs, www. *(§5.1–5.2)*
4. **Add lateral city/market links** (nearest 6 by lat/long or shared market). *(patch §5.5)*
5. **Grow the matched layer upstream** — rerun/improve `enrich-npi.js` so >745 offices get a
   doctor; give the 249 page-less doctors NPIs (or relax the page gate) to unlock 270 offices.

---

## 5. Generator patches (drop-in)

> These live in `generate-plans.js` (T5 + plans) and the T4 templates / `generate-t4.js`.
> Paste the snippets where indicated; they reproduce the live hand-edits.

### 5.1 — T5 office page: carrier → plan links
In the office-page template, where carriers render (the `renderCarrierRows` builder), add this
helper in the same scope and wrap the carrier name:

```js
function ccPlanLink(c){
  var m=[[/aetna/i,'aetna-dental-direct'],[/delta/i,'delta-dental-ppo-premium'],
  [/guardian/i,'guardian-premier-ppo'],[/humana/i,'humana-extend-5000'],
  [/ameritas/i,'ameritas-primestar'],[/(united|uhc)/i,'uhc-primary-dental'],
  [/metlife/i,'metlife-ncd-complete'],[/mutual of omaha/i,'mutual-of-omaha-dental']];
  for(var i=0;i<m.length;i++){ if(m[i][0].test(c))
    return '<a href="https://www.covercapy.com/dental-insurance/ppo-plans/'+m[i][1]+
    '/" style="color:inherit;text-decoration:underline;text-underline-offset:2px">'+c+'</a>'; }
  return c;
}
// then change:  '<div class="carrier-name">'+c+'</div>'
//        to  :  '<div class="carrier-name">'+ccPlanLink(c)+'</div>'
```

### 5.2 — Plan page: directory CTA
In the plan-page generator, insert before the alternatives section, per carrier:

```html
<section class="block" aria-label="Find a dentist">
  <a href="https://www.covercapy.com/find-my-dentist?carrier={CARRIER_PARAM}"
     style="display:flex;align-items:center;gap:14px;padding:18px 20px;border:1px solid #E8E2D8;
            border-radius:14px;background:#FFFDF8;text-decoration:none;color:inherit;margin:10px 0">
    <span style="flex:1">
      <span style="display:block;font:600 11px/1 'Inter Tight';letter-spacing:.12em;
                   text-transform:uppercase;color:#8A958F">Already have this plan?</span>
      <span style="display:block;font-family:'Fraunces',serif;font-size:20px;color:#082A30;
                   margin-top:4px">Find {CARRIER} PPO dentists near you</span>
    </span>
    <span style="color:#14525B;font-weight:600;white-space:nowrap">Browse the directory →</span>
  </a>
</section>
```

### 5.3 — NEW: T4c city → doctors block (the big gap)
In `generate-t4.js`, after loading `.cross-links.json`, for each city compute the doctors whose
office is in that city and emit a rail. Add to the T4c template's `mainHTML`:

```js
// xlinks = JSON.parse(fs.readFileSync('dentists/.cross-links.json'))
// for a city's `rows`, collect unique doctors:
function cityDoctors(rows, xlinks){
  var seen={}, out=[];
  rows.forEach(function(d){ var x=xlinks[d.slug];
    if(x && !seen[x.provSlug]){ seen[x.provSlug]=1;
      out.push('<a class="doc-card" href="/dentists/'+x.stSlug+'/'+x.provSlug+'/">'+H(x.provName)+'</a>'); }});
  return out.length ? '<section class="module"><h2>Dentists in '+H(marketConfig.name)+
    '</h2><div class="doc-rail">'+out.join('')+'</div></section>' : '';
}
```
Anchor text carries the doctor's name; the heading carries the city — both keyword-rich.

### 5.4 — NEW: T6 doctor → plan links
On doctor pages, reuse `ccPlanLink` (§5.1) on the office's `insurance_networks` so accepted
carriers link to plan pages. Same helper, same map.

### 5.5 — NEW: lateral nearby-city links
On T4c, list the 6 nearest sibling cities in the same market (or by centroid distance) as a
"Nearby cities" block linking `/dental/{state}/{market}/{citySlug}/`. Spreads equity laterally
and captures "{neighbor city} dentist" searches.

---

## 6. Schema & sitemap

- **Every page**: `BreadcrumbList` matching the visible crumb (T6 already done; ensure T4/T5 too).
- **Hubs (T3/T4)**: add `ItemList` enumerating children (offices/cities) with `url` + `name`.
- **Sitemaps**: keep the index → `sitemap-pages.xml`, `dental/sitemap-dental.xml`,
  `dentists/sitemap-dentists.xml`. When T4 is regenerated, confirm new/changed URLs land in
  `sitemap-dental.xml` with fresh `lastmod`. Split any sitemap approaching 50k URLs.

---

## 7. One-line summary
The skeleton is built and crawlable; the wins now are **horizontal density** (city→doctor,
doctor→plan, city→nearby-city) and **growing the matched office↔doctor layer upstream**. Ship the
patches, run the T4 generator, then rerun NPI enrichment to thicken the lower branches.
