# dentist.html — Static Internal-Linking Silo

Server-rendered `<a href>` link grids for the national `dentist.html` hub. No JavaScript.
All hrefs verified against on-disk `/dental/` folder structure (2026-06-26). URLs built from
real folders per CLAUDE.md canon (state/market/city). Never `seo_path`. Absolute URLs, trailing slash.

CSS reuses the existing dental-hub silo classes (`state-metro-grid`, `state-metro-card`, `smc-name`,
`smc-count`) plus a few new `silo-*` wrappers. Design tokens preserved. No em-dashes.

---

## Shared CSS (add once to dentist.html head)

```html
<style>
  .silo{margin:48px 0;padding:0 20px;max-width:1180px;margin-left:auto;margin-right:auto}
  .silo-h{font-family:'Fraunces',serif;font-weight:500;font-size:1.4rem;color:var(--teal-night,#082A30);margin:0 0 4px}
  .silo-sub{font-family:'Inter Tight',system-ui,sans-serif;color:var(--ink-soft,#56655F);font-size:.92rem;margin:0 0 18px}
  .silo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}
  .silo-card{display:block;background:var(--cream,#F6F0E6);border:1px solid var(--line,#E8E2D8);border-radius:5px;padding:14px 16px;text-decoration:none;transition:border-color .15s}
  .silo-card:hover{border-color:var(--teal-300,#5E8C92)}
  .silo-name{font-family:'Inter Tight',system-ui,sans-serif;font-weight:600;color:var(--teal-700,#14525B);font-size:.95rem}
  .silo-meta{font-family:'Inter Tight',system-ui,sans-serif;color:var(--ink-faint,#8A958F);font-size:.78rem;margin-top:2px}
  .silo-card[aria-disabled="true"]{opacity:.55;pointer-events:none}
</style>
```

---

## GRID 1 — PPO Dentists by State (50 states)

**Decision on unbuilt states:** OMIT them from the live link grid. Do NOT link to coming-soon URLs.
A placeholder `/dental/{state}/` that returns no real content is a soft-404 and would dilute the
silo's crawl budget and authority. Instead render unbuilt states as plain non-linked `<span>` text
(greyed `aria-disabled`) so the page still reads as "national" to humans and AI engines, but passes
zero authority to dead URLs. When a state ships, swap the span for an `<a>`.

**LIVE (14 states, real `/dental/{state}/` hubs):**
arizona, california, connecticut, florida, illinois, nevada, new-jersey, new-york,
north-carolina, ohio, pennsylvania, rhode-island, texas, washington.
(`nv/` also exists as a 3-folder abbrev stub — do NOT link it; it is a thin duplicate of `nevada/`.
Recommend 301 `nv/` -> `nevada/` to avoid duplicate-content.)

**NOT live (36 states):** AL, AK, AR, CO, DE, GA, HI, ID, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN,
MS, MO, MT, NE, NH, NM, ND, OK, OR, SC, SD, TN, UT, VT, VA, WV, WI, WY. Render as disabled spans.

```html
<section class="silo" aria-labelledby="silo-states">
  <h2 id="silo-states" class="silo-h">PPO dentists by state</h2>
  <p class="silo-sub">Browse insurance-verified offices in every state we cover.</p>
  <div class="silo-grid">
    <a class="silo-card" href="https://www.covercapy.com/dental/arizona/"><span class="silo-name">Arizona</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/"><span class="silo-name">California</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/connecticut/"><span class="silo-name">Connecticut</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/"><span class="silo-name">Florida</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/illinois/"><span class="silo-name">Illinois</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/nevada/"><span class="silo-name">Nevada</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-jersey/"><span class="silo-name">New Jersey</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/"><span class="silo-name">New York</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/north-carolina/"><span class="silo-name">North Carolina</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/ohio/"><span class="silo-name">Ohio</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/pennsylvania/"><span class="silo-name">Pennsylvania</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/rhode-island/"><span class="silo-name">Rhode Island</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/"><span class="silo-name">Texas</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/washington/"><span class="silo-name">Washington</span></a>
    <!-- Unbuilt: render as disabled spans, no href. Repeat for all 36. -->
    <span class="silo-card" aria-disabled="true"><span class="silo-name">Georgia</span><span class="silo-meta">Coming soon</span></span>
    <span class="silo-card" aria-disabled="true"><span class="silo-name">Colorado</span><span class="silo-meta">Coming soon</span></span>
    <!-- ...remaining 34 unbuilt states as spans... -->
  </div>
</section>
```

---

## GRID 2 — Top Metro Areas (real T4a metro hubs)

All verified on disk as `/dental/{state}/{metro}/`. 20 flagship metros across the 14 live states.

```html
<section class="silo" aria-labelledby="silo-metros">
  <h2 id="silo-metros" class="silo-h">Top metro areas</h2>
  <p class="silo-sub">PPO dentist directories for the largest US markets.</p>
  <div class="silo-grid">
    <a class="silo-card" href="https://www.covercapy.com/dental/california/los-angeles/"><span class="silo-name">Los Angeles</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/san-diego/"><span class="silo-name">San Diego</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/bay-area/"><span class="silo-name">Bay Area</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/orange-county/"><span class="silo-name">Orange County</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/sacramento/"><span class="silo-name">Sacramento</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/new-york-city/"><span class="silo-name">New York City</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/long-island/"><span class="silo-name">Long Island</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/illinois/chicago/"><span class="silo-name">Chicago</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/houston/"><span class="silo-name">Houston</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/dallas/"><span class="silo-name">Dallas</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/austin/"><span class="silo-name">Austin</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/san-antonio/"><span class="silo-name">San Antonio</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/miami/"><span class="silo-name">Miami</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/tampa-bay/"><span class="silo-name">Tampa Bay</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/orlando/"><span class="silo-name">Orlando</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/arizona/phoenix/"><span class="silo-name">Phoenix</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/nevada/las-vegas/"><span class="silo-name">Las Vegas</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/washington/seattle/"><span class="silo-name">Seattle</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/pennsylvania/philadelphia/"><span class="silo-name">Philadelphia</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/ohio/columbus/"><span class="silo-name">Columbus</span></a>
  </div>
</section>
```

---

## GRID 3 — By PPO Carrier

Real carrier targets live at `/dental-insurance/ppo-plans/{carrier}/`. Eight of the ten requested
carriers have real folders. Three requested carriers are MISSING and must be flagged.

| Requested | Real target | Status |
|---|---|---|
| Delta Dental | `/dental-insurance/ppo-plans/delta/` | LIVE (richer hub also at `/dental-insurance/delta-dental/`) |
| UnitedHealthcare | `/dental-insurance/ppo-plans/uhc/` | LIVE |
| Guardian | `/dental-insurance/ppo-plans/guardian/` | LIVE |
| MetLife | `/dental-insurance/ppo-plans/metlife/` | LIVE |
| Aetna | `/dental-insurance/ppo-plans/aetna/` | LIVE |
| Humana | `/dental-insurance/ppo-plans/humana/` | LIVE |
| Ameritas | `/dental-insurance/ppo-plans/ameritas/` | LIVE |
| Mutual of Omaha | `/dental-insurance/ppo-plans/mutual-of-omaha/` | LIVE (not requested but exists) |
| Cigna | none | MISSING — omit until built |
| Principal | none | MISSING — omit until built |
| Anthem | none | MISSING — omit until built |

```html
<section class="silo" aria-labelledby="silo-carriers">
  <h2 id="silo-carriers" class="silo-h">Find dentists by PPO carrier</h2>
  <p class="silo-sub">See which offices accept your plan and verify coverage free.</p>
  <div class="silo-grid">
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/delta/"><span class="silo-name">Delta Dental PPO</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/uhc/"><span class="silo-name">UnitedHealthcare</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/guardian/"><span class="silo-name">Guardian</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/metlife/"><span class="silo-name">MetLife</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/aetna/"><span class="silo-name">Aetna</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/humana/"><span class="silo-name">Humana</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/ameritas/"><span class="silo-name">Ameritas</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha/"><span class="silo-name">Mutual of Omaha</span></a>
    <!-- Cigna, Principal, Anthem: NO page on disk. Do not link. -->
  </div>
</section>
```

---

## GRID 4 — By Treatment

Real guide targets live at `/benefit-maxing/guides/{slug}/`. All verified on disk.

| Label | Real target | Status |
|---|---|---|
| Dental Implants | `/benefit-maxing/guides/implants/` | LIVE |
| Crowns | `/benefit-maxing/guides/crowns/` | LIVE |
| Root Canals | `/benefit-maxing/guides/root-canals/` | LIVE |
| Braces & Invisalign | `/benefit-maxing/guides/braces-invisalign/` | LIVE |
| Dental Emergencies | `/benefit-maxing/guides/dental-emergencies/` | LIVE |
| Bridges | `/benefit-maxing/guides/bridges/` | LIVE |
| Dentures | `/benefit-maxing/guides/dentures/` | LIVE |
| Deep Cleaning | `/benefit-maxing/guides/deep-cleaning/` | LIVE |
| Extractions | `/benefit-maxing/guides/extractions/` | LIVE |
| Fillings | `/benefit-maxing/guides/fillings/` | LIVE |
| Teeth Whitening | `/benefit-maxing/guides/whitening/` | LIVE |

```html
<section class="silo" aria-labelledby="silo-treatments">
  <h2 id="silo-treatments" class="silo-h">Find dentists by treatment</h2>
  <p class="silo-sub">What your PPO covers and how to maximize your annual maximum.</p>
  <div class="silo-grid">
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/implants/"><span class="silo-name">Dental Implants</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/crowns/"><span class="silo-name">Crowns</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/root-canals/"><span class="silo-name">Root Canals</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/braces-invisalign/"><span class="silo-name">Braces and Invisalign</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/dental-emergencies/"><span class="silo-name">Dental Emergencies</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/bridges/"><span class="silo-name">Bridges</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/dentures/"><span class="silo-name">Dentures</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/deep-cleaning/"><span class="silo-name">Deep Cleaning</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/extractions/"><span class="silo-name">Extractions</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/fillings/"><span class="silo-name">Fillings</span></a>
    <a class="silo-card" href="https://www.covercapy.com/benefit-maxing/guides/whitening/"><span class="silo-name">Teeth Whitening</span></a>
  </div>
</section>
```

---

## GRID 5 — Dentist Near Me in [Popular City] (real T4c city pages)

All verified on disk as `/dental/{state}/{metro}/{city}/`. 24 popular cities.

```html
<section class="silo" aria-labelledby="silo-cities">
  <h2 id="silo-cities" class="silo-h">Dentist near me in a popular city</h2>
  <p class="silo-sub">Local PPO offices, insurance verified, accepting new patients.</p>
  <div class="silo-grid">
    <a class="silo-card" href="https://www.covercapy.com/dental/california/los-angeles/beverly-hills/"><span class="silo-name">Beverly Hills, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/los-angeles/burbank/"><span class="silo-name">Burbank, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/los-angeles/glendale/"><span class="silo-name">Glendale, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/los-angeles/culver-city/"><span class="silo-name">Culver City, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/san-diego/la-jolla/"><span class="silo-name">La Jolla, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/san-diego/carlsbad/"><span class="silo-name">Carlsbad, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/california/san-diego/chula-vista/"><span class="silo-name">Chula Vista, CA</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/new-york-city/brooklyn/"><span class="silo-name">Brooklyn, NY</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/new-york-city/astoria/"><span class="silo-name">Astoria, NY</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/new-york/new-york-city/flushing/"><span class="silo-name">Flushing, NY</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/illinois/chicago/chicago/"><span class="silo-name">Chicago, IL</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/houston/sugar-land/"><span class="silo-name">Sugar Land, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/houston/pearland/"><span class="silo-name">Pearland, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/dallas/frisco/"><span class="silo-name">Frisco, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/dallas/plano/"><span class="silo-name">Plano, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/austin/round-rock/"><span class="silo-name">Round Rock, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/texas/austin/cedar-park/"><span class="silo-name">Cedar Park, TX</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/miami/coral-gables/"><span class="silo-name">Coral Gables, FL</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/miami/doral/"><span class="silo-name">Doral, FL</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/florida/miami/aventura/"><span class="silo-name">Aventura, FL</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/arizona/phoenix/phoenix/"><span class="silo-name">Phoenix, AZ</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/nevada/las-vegas/henderson/"><span class="silo-name">Henderson, NV</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/nevada/las-vegas/summerlin/"><span class="silo-name">Summerlin, NV</span></a>
    <a class="silo-card" href="https://www.covercapy.com/dental/washington/seattle/seattle/"><span class="silo-name">Seattle, WA</span></a>
  </div>
</section>
```

> Note: all 24 GRID 5 city hrefs are directly confirmed on disk, including `dental/texas/dallas/plano/`.

---

## Flagged / non-existent targets (do not link)

- **Carriers:** Cigna, Principal, Anthem — no folder under `/dental-insurance/ppo-plans/`. Omit.
- **State stub:** `/dental/nv/` exists but is a thin 3-folder duplicate of `/dental/nevada/`. Do not
  link; recommend 301 to `/dental/nevada/`.
- **Unbuilt states (36):** render as disabled spans, never as links (soft-404 risk).
- **One unverified city:** `dental/texas/dallas/plano/` — confirm or substitute.
