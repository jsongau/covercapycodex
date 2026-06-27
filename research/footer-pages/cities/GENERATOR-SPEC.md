# GENERATOR-SPEC.md — `/cities.html`

## Status of `seo-build/generate-plans.js`
**NOT present on disk.** Only the root `generate-plans.js` exists. The code below reuses the
root file's real helpers (`HEAD()`, `esc()`, `FOOT`, `slugify()`, `stateSlug()`, `SITE`,
`ANON_KEY`, `SUPABASE_URL`, paginated `fetch`, `writePage()`) and the same `sitemap.xml`
merge. It also reuses `fetchMarkets()` and `stateName()` defined in the states spec, so
**add `buildStatesIndex()` first** (or copy those two helpers in). Wire into whichever
generator is live on the Mac.

---

## 1. Purpose
Master index of every city / metro hub, grouped by state, linking to each
`/dental/{state}/{market}/` hub. It is the mid-tier hub between `/states.html` and the
individual market pages: it lets a visitor (or crawler, or AI engine) see the full list of
metros and cities CoverCapy covers within each state on one page, and gives the universal
footer a real `/cities.html` target. Concierge framing: "Find your city, see who is in
network."

## 2. Exact URL
- Output file: `cities.html` at repo ROOT (served at `/cities.html`).
- Canonical: `https://www.covercapy.com/cities`.

## 3. Title / Meta / Canonical
- `<title>`: `PPO Dentists by City and Metro — CoverCapy Directory | CoverCapy`
- `<meta name="description">`: `Browse PPO dentists by city and metro area. CoverCapy lists insurance-verified offices in markets nationwide. Pick your city, see accepted carriers, and verify coverage free.`
- `<link rel="canonical" href="https://www.covercapy.com/cities">`
- `<meta name="robots" content="index, follow, max-image-preview:large">`

## 4. JSON-LD plan
Array of three blocks passed to `HEAD(...)`:

1. `CollectionPage`
   - `name`: "PPO Dentists by City and Metro"
   - `url`: `https://www.covercapy.com/cities`
   - `isPartOf`: `{ "@type":"WebSite", "name":"CoverCapy", "url":"https://www.covercapy.com" }`
   - `about`: `{ "@type":"Thing", "name":"PPO dental coverage by city and metro" }`
2. `ItemList`
   - `numberOfItems`: total markets listed
   - `itemListElement`: one `ListItem` per market, ordered, `{ position, url: SITE + "/dental/" + stSlug + "/" + mkSlug + "/", name: marketArea + ", " + stateAbbrOrName }`
3. `BreadcrumbList`
   - Home -> "PPO Dentists by City and Metro" (`/cities`)

`sameAs` arrays only (none needed here). No em-dashes, no roman numerals.

## 5. Data source (precise)
**Primary: Supabase `markets` table**, paginated as in the states spec (`fetchMarkets()`):
- Columns used: `market_area, seo_area, state, hub_type, office_count, parent_market`.
- Market slug is built FROM PARTS exactly like the live hubs: `mkSlug = slugify(seo_area || market_area)`.
- State slug: `stateSlug(state)`.
- Group rows by `state`; within a state, sort markets by `office_count` desc then name asc.
- `hub_type` is used only for an optional label (metro / local area / regional). All hub
  types are listed so every `/dental/{state}/{market}/` directory is reachable.
- Never use `seo_path` (stale `/dentists/` prefix) — URLs are built from parts (hard rule).

**Fallback (no Supabase): enumerate the `dental/` tree.**
- For each state dir under `dental/`, each immediate subdir that contains `index.html` is a
  market hub. `stSlug = state dir name` (canonicalised via `stateName`/`stateSlug` to merge
  `nv` into `nevada`), `mkSlug = subdir name`, display name = title-cased `mkSlug`.
- Office count for the badge: read it from the market `index.html` if present
  (the hubs render `NNN+ Offices` / `NNN+ PPO`), via a cheap regex; otherwise omit the badge.

**State display + abbreviation**: reuse `STATE_NAME`/`stateName()` from the states spec, and
add a `STATE_ABBR` map for compact `City, ST` labels:
`{California:'CA', Texas:'TX', Florida:'FL', 'New York':'NY', Nevada:'NV', Arizona:'AZ',
Illinois:'IL', Pennsylvania:'PA', Connecticut:'CT', 'Rhode Island':'RI',
'New Jersey':'NJ', 'North Carolina':'NC', Ohio:'OH', Washington:'WA', Georgia:'GA',
Virginia:'VA'}`. Fall back to the full state name when an abbreviation is missing.

## 6. The `buildCitiesIndex()` function (add to the generator)

```javascript
/* ============================================================
   /cities.html — index of every market/city hub, grouped by state.
   Reuses fetchMarkets(), stateName(), stateSlug(), slugify(),
   HEAD()/FOOT()/esc()/SITE/writePage(), and the sitemap merge.
   Fail-safe: any error warns and skips.
   ============================================================ */

const STATE_ABBR = {
  'California': 'CA', 'Texas': 'TX', 'Florida': 'FL', 'New York': 'NY',
  'Nevada': 'NV', 'Arizona': 'AZ', 'Illinois': 'IL', 'Pennsylvania': 'PA',
  'Connecticut': 'CT', 'Rhode Island': 'RI', 'New Jersey': 'NJ',
  'North Carolina': 'NC', 'Ohio': 'OH', 'Washington': 'WA',
  'Georgia': 'GA', 'Virginia': 'VA'
};
const stateAbbr = (nm) => STATE_ABBR[nm] || nm;

// Fallback: read market hubs off disk and pull a count from each index.html.
function marketsFromDisk() {
  const out = [];
  let states = [];
  try { states = fs.readdirSync('dental', { withFileTypes: true }); } catch (e) { return out; }
  states.forEach(st => {
    if (!st.isDirectory()) return;
    const stName = stateName(st.name);
    const stSlug = stateSlug(stName);
    let kids = [];
    try { kids = fs.readdirSync(path.join('dental', st.name), { withFileTypes: true }); } catch (e) { return; }
    kids.forEach(k => {
      if (!k.isDirectory()) return;
      const idx = path.join('dental', st.name, k.name, 'index.html');
      if (!fs.existsSync(idx)) return;
      let offices = 0;
      try {
        const m = fs.readFileSync(idx, 'utf8').match(/([0-9][0-9,]*)\s*\+?\s*(?:PPO\s+)?Offices/i);
        if (m) offices = Number(m[1].replace(/,/g, ''));
      } catch (e) {}
      out.push({ state: stName, stSlug, mkSlug: k.name,
        name: k.name.split('-').map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' '),
        offices, hub_type: '' });
    });
  });
  return out;
}

async function buildCitiesIndex() {
  // 1) Assemble normalized market rows
  let rows = [];
  try {
    const markets = await fetchMarkets();
    rows = markets.map(m => {
      const stName = (m.state || '').trim();
      if (!stName || !(m.market_area || m.seo_area)) return null;
      return { state: stName, stSlug: stateSlug(stName),
        mkSlug: slugify(m.seo_area || m.market_area),
        name: (m.market_area || m.seo_area), offices: Number(m.office_count || 0),
        hub_type: (m.hub_type || '') };
    }).filter(Boolean);
  } catch (e) {
    console.warn('[cities] markets fetch failed (' + e.message + '), falling back to disk');
  }
  if (!rows.length) rows = marketsFromDisk();
  if (!rows.length) { console.warn('[cities] no markets found, skipping'); return; }

  // De-dupe by state+mkSlug (keep the higher office count)
  const seen = {};
  rows.forEach(r => {
    const key = r.stSlug + '/' + r.mkSlug;
    if (!seen[key] || r.offices > seen[key].offices) seen[key] = r;
  });
  rows = Object.values(seen);

  // 2) Group by state, sort markets by count then name
  const byState = {};
  rows.forEach(r => { (byState[r.state] = byState[r.state] || []).push(r); });
  const stateNames = Object.keys(byState).sort((a, b) => a.localeCompare(b));
  stateNames.forEach(s => byState[s].sort((a, b) => (b.offices - a.offices) || a.name.localeCompare(b.name)));

  const fmtN = (n) => Number(n || 0).toLocaleString('en-US');
  const totalMarkets = rows.length;
  const totalOffices = rows.reduce((t, r) => t + r.offices, 0);

  // 3) Cards markup, one section per state
  const sections = stateNames.map(s => {
    const stSlug = byState[s][0].stSlug;
    const items = byState[s].map(r => {
      const href = '/dental/' + r.stSlug + '/' + r.mkSlug + '/';
      const sub = r.offices ? fmtN(r.offices) + '+ offices' : 'View hub';
      return `        <li class="ci-item"><a href="${href}"><span class="ci-name">${esc(r.name)}</span><span class="ci-sub">${esc(sub)}</span></a></li>`;
    }).join('\n');
    return `    <div class="ci-state">
      <h2 class="ci-stname"><a href="/dental/${stSlug}/">${esc(s)}</a><span class="ci-abbr">${esc(stateAbbr(s))}</span></h2>
      <ul class="ci-list">
${items}
      </ul>
    </div>`;
  }).join('\n');

  // 4) JSON-LD
  let pos = 0;
  const itemList = [];
  stateNames.forEach(s => byState[s].forEach(r => {
    itemList.push({ '@type': 'ListItem', position: ++pos,
      url: SITE + '/dental/' + r.stSlug + '/' + r.mkSlug + '/',
      name: r.name + ', ' + stateAbbr(s) });
  }));
  const jsonld = JSON.stringify([
    { '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: 'PPO Dentists by City and Metro', url: SITE + '/cities',
      isPartOf: { '@type': 'WebSite', name: 'CoverCapy', url: SITE },
      about: { '@type': 'Thing', name: 'PPO dental coverage by city and metro' } },
    { '@context': 'https://schema.org', '@type': 'ItemList',
      numberOfItems: itemList.length, itemListElement: itemList },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'PPO Dentists by City and Metro', item: SITE + '/cities' }
    ] }
  ]);

  // 5) Body
  const title = 'PPO Dentists by City and Metro — CoverCapy Directory | CoverCapy';
  const desc = 'Browse PPO dentists by city and metro area. CoverCapy lists insurance-verified offices in markets nationwide. Pick your city, see accepted carriers, and verify coverage free.';
  const body = `
<div id="cc-nav-mount" data-include="/mega-nav.html"></div>
<main class="cities-page">
  <nav class="crumb"><div class="wrap"><a href="/">Home</a> &rsaquo; <a href="/states">States</a> &rsaquo; <span>Cities and Metros</span></div></nav>
  <header class="hero"><div class="wrap">
    <p class="eyebrow">Directory</p>
    <h1 class="title">PPO dentists, <em>by city</em></h1>
    <p class="lede">Every metro and city we cover, grouped by state. Open a market to see insurance-verified offices, the PPO carriers they accept, and book a free coverage check.</p>
    <div class="facts">
      <div><b>${fmtN(stateNames.length)}</b><span>states</span></div>
      <div><b>${fmtN(totalMarkets)}+</b><span>city and metro hubs</span></div>
      <div><b>${fmtN(totalOffices)}+</b><span>PPO offices</span></div>
    </div>
  </div></header>
  <section class="block"><div class="wrap">
    <div class="cities-grid">
${sections}
    </div>
  </div></section>
  <section class="block"><div class="wrap cta-row">
    <a class="btn-primary" href="/find-my-dentist.html">Find my dentist</a>
    <a class="btn-ghost" href="/states.html">Browse by state</a>
    <a class="btn-ghost" href="/compare-ppo-dental-plans">Compare PPO plans</a>
  </div></section>
</main>
<div id="cc-footer-mount" data-include="/footer.html"></div>
<style>
  .cities-page .cities-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:26px}
  .cities-page .ci-stname{display:flex;align-items:baseline;gap:8px;font-size:20px;margin:0 0 12px}
  .cities-page .ci-stname a{text-decoration:none;color:var(--ink)}
  .cities-page .ci-stname a:hover{color:var(--jade-deep)}
  .cities-page .ci-abbr{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--muted);background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:2px 8px}
  .cities-page .ci-list{list-style:none;margin:0;padding:0;display:grid;gap:7px}
  .cities-page .ci-item a{display:flex;align-items:baseline;gap:10px;border:1px solid var(--line);border-radius:10px;padding:10px 13px;text-decoration:none;background:var(--bg);transition:border-color .18s,box-shadow .18s}
  .cities-page .ci-item a:hover{border-color:rgba(15,181,166,.45);box-shadow:var(--shadow)}
  .cities-page .ci-name{font-family:var(--serif);font-size:15.5px;color:var(--ink)}
  .cities-page .ci-sub{font-size:12px;color:var(--muted);margin-left:auto}
  .cities-page .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .cities-page .btn-primary{background:var(--jade);color:var(--jade-ink);font-weight:600;padding:12px 18px;border-radius:999px;text-decoration:none}
  .cities-page .btn-ghost{background:var(--panel);color:var(--ink);border:1px solid var(--line-strong);padding:12px 18px;border-radius:999px;text-decoration:none}
</style>
${FOOT}`;

  const html = HEAD(title, desc, SITE + '/cities', jsonld) + body + '\n</body></html>';
  writePage('cities.html', html);
  console.log('[cities] wrote cities.html with', totalMarkets, 'markets across', stateNames.length, 'states');
  return rows.map(r => '/dental/' + r.stSlug + '/' + r.mkSlug + '/');
}
```

### One-line call to add to the build sequence
After `buildStatesIndex()` and before the sitemap merge:

```javascript
  let cityHubUrls = [];
  try { cityHubUrls = (await buildCitiesIndex()) || []; } catch (e) { console.warn('[cities] skip:', e.message); }
  urls.push('/cities', ...cityHubUrls);
```

### Sitemap entry
`/cities` and the market hub URLs are pushed onto `urls`, flowing through the existing
`sitemap.xml` `<!-- CC_SPOKES -->` merge. The market hubs are already in
`dental/sitemap-dental.xml`; the existing `[...new Set(urls)]` dedupes.

## 7. SEO / GEO notes
- **Crawl depth**: links to all ~983 market/city hubs in one page, so every metro is two hops
  from root (footer -> /cities -> hub) and every T5 profile is reachable one hop sooner.
- **Internal linking**: state-name headers link to `/dental/{state}/`, market items link to
  `/dental/{state}/{market}/`. Descriptive anchors with the market name, never "click here".
  Cross-links to `/states.html`, `/find-my-dentist.html`, `/compare-ppo-dental-plans`.
- **GEO**: the `ItemList` enumerates "City, ST" entities, which AI engines extract directly
  for "PPO dentists in {city}" and "cities CoverCapy covers" prompts.
- **Keywords**: see `02-seo-geo.md`.

## 8. How to run (Mac only)
```bash
cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26"
node generate-plans.js        # or node seo-build/generate-plans.js if restored
git add -A && git commit -m "feat: add /cities.html metro index" && git push
```
Run from the Mac only (Supabase is unreachable from the sandbox). Vercel auto-deploys in ~2 min.
