# GENERATOR SPEC — PPO Dentist Directory (`/ppo-dentist-directory.html`)

This page is data-driven. It is produced by `seo-build/generate-plans.js` from the
`markets` and `dentists` Supabase tables and the existing `/dental/` hub tree. Do NOT
hand-build a static file with fake data. Run from the user's Mac only:
`node seo-build/generate-plans.js`.

`seo-build/generate-plans.js` was NOT present in the repo at spec time (gitignored; the
`seo-build/` folder was empty). The function below is modeled on the helper signatures in
`CLAUDE.md` (`pageShell`, `fetchAllRows`, `slugify`, `stateSlug`, `BASE_URL`). Match the
generator's real style and helper names when wiring it in.

---

## 1. PURPOSE

The master A to Z directory: the TOP of the crawl tree and the spine of internal linking.
It lists every state, then within each state every metro, then within each metro every city
hub, all as real links into the `/dental/` tree. It is the page that lets a crawler (and an
AI engine) discover the whole 6,400-page directory from one URL.

- Exhaustive (unlike `featured-markets.html`, which is curated).
- Pure index: links only, organized State -> Metro -> City.
- Alphabetized at every level for predictability and GEO extractability.

## 2. URL / HEAD

| Field | Value |
|-------|-------|
| Output file | `ppo-dentist-directory.html` (repo ROOT) |
| Canonical | `https://www.covercapy.com/ppo-dentist-directory` (no `.html`) |
| Title | `PPO Dentist Directory: Find Dentists by State & City | CoverCapy` |
| Meta description | `The complete CoverCapy directory of in-network PPO dentists by state, metro, and city. Browse every market from A to Z and verify your dental coverage free.` |
| OG | type=website, mirror title/description, url=canonical |
| Keywords | `PPO dentist directory, dentist by state, dentist by city, in-network dentist list, find a PPO dentist, dental directory` |

## 3. SCHEMA (JSON-LD) — three blocks

1. `Organization` (CoverCapy) — sitewide block.
2. `BreadcrumbList` — Home -> PPO Dentist Directory.
3. `CollectionPage` whose `mainEntity` is an `ItemList`. To keep the JSON-LD sane on a page
   with thousands of links, the ItemList enumerates the STATES (each `ListItem` -> the
   `/dental/{state}/` hub). The metro/city links live in the HTML body for crawl discovery.
   No em-dashes, no roman numerals. `sameAs` arrays only if used.

## 4. DATA SOURCE

- `markets` table: `market_area`, `seo_area`, `state`, `hub_type`, `parent_market`,
  `office_count`. Use `hub_type = 'metro'` for the metro level.
- `dentists` table: `state`, `city`, `market_area` — used to derive the city hubs that exist
  under each metro (a city hub exists if dentists exist for that `city` in that market).
- States come from the distinct set of `markets.state` (or `dentists.state`), so the list
  matches the live `/dental/` state folders.
- Build EVERY url FROM PARTS, never `seo_path`:
  - State hub: `${BASE_URL}/dental/${stateSlug(state)}/`
  - Metro hub: `${BASE_URL}/dental/${stateSlug(state)}/${slugify(m.seo_area||m.market_area)}/`
  - City hub: `${BASE_URL}/dental/${stateSlug(state)}/${mkSlug}/${slugify(city)}/`
- Alphabetize states, metros within a state, and cities within a metro.

## 5. FUNCTION TO ADD TO `seo-build/generate-plans.js`

```javascript
// ---------------------------------------------------------------------------
// PPO DENTIST DIRECTORY  — /ppo-dentist-directory.html
// Master A to Z index: State -> Metro -> City. The spine of internal linking.
// ---------------------------------------------------------------------------
function buildDirectoryIndex(markets, dentists) {
  // 1) Group metros by state, alphabetized.
  const metroRows = (markets || []).filter(function (m) { return m.hub_type === 'metro'; });

  // state -> [ {label, mkSlug, market_area} ]
  const metrosByState = {};
  metroRows.forEach(function (m) {
    const st = m.state;
    if (!metrosByState[st]) metrosByState[st] = [];
    metrosByState[st].push({
      label: m.market_area,
      mkSlug: slugify(m.seo_area || m.market_area),
      market_area: m.market_area
    });
  });

  // 2) Derive city hubs that exist per metro from the dentists array.
  //    Key cities by state+market so we attach them to the right metro.
  // {state}::{market_area} -> Set of city names
  const citiesByMetro = {};
  (dentists || []).forEach(function (d) {
    if (!d.state || !d.city) return;
    const key = d.state + '::' + (d.market_area || '');
    if (!citiesByMetro[key]) citiesByMetro[key] = {};
    citiesByMetro[key][d.city] = true; // de-dupe via object keys
  });

  // 3) Sorted list of states (only those that have metros).
  const states = Object.keys(metrosByState).sort(function (a, b) { return a.localeCompare(b); });

  // ----- JSON-LD: CollectionPage + ItemList (states only) -----
  const itemList = {
    '@type': 'ItemList',
    itemListElement: states.map(function (st, i) {
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: st,
        url: BASE_URL + '/dental/' + stateSlug(st) + '/'
      };
    })
  };
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'PPO Dentist Directory',
      url: BASE_URL + '/ppo-dentist-directory',
      description: 'Complete CoverCapy directory of in-network PPO dentists by state, metro, and city.',
      mainEntity: itemList
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'PPO Dentist Directory', item: BASE_URL + '/ppo-dentist-directory' }
      ]
    }
  ];

  // ----- BODY: A to Z accordion. Each state is a <details> with metro + city links. -----
  function stateBlock(st) {
    const stSlug = stateSlug(st);
    const metros = metrosByState[st]
      .slice()
      .sort(function (a, b) { return a.label.localeCompare(b.label); });

    const metroHtml = metros.map(function (mk) {
      const cityMap = citiesByMetro[st + '::' + mk.market_area] || {};
      const cities = Object.keys(cityMap).sort(function (a, b) { return a.localeCompare(b); });
      const cityLinks = cities.map(function (c) {
        const cSlug = slugify(c);
        return '<a class="dir-city" href="' + BASE_URL + '/dental/' + stSlug + '/' + mk.mkSlug + '/' + cSlug + '/">' +
          esc(c) + '</a>';
      }).join('');
      return (
        '<div class="dir-metro">' +
          '<a class="dir-metro-name" href="' + BASE_URL + '/dental/' + stSlug + '/' + mk.mkSlug + '/">' +
            esc(mk.label) + '</a>' +
          (cityLinks ? '<div class="dir-cities">' + cityLinks + '</div>' : '') +
        '</div>'
      );
    }).join('');

    return (
      '<details class="dir-state">' +
        '<summary>' +
          '<a class="dir-state-name" href="' + BASE_URL + '/dental/' + stSlug + '/">' + esc(st) + '</a>' +
          '<span class="dir-count">' + metros.length + ' markets</span>' +
        '</summary>' +
        '<div class="dir-state-body">' + metroHtml + '</div>' +
      '</details>'
    );
  }

  // Optional A to Z jump bar across the top.
  const letters = {};
  states.forEach(function (s) { letters[s.charAt(0).toUpperCase()] = true; });
  const jumpBar = '<nav class="dir-az">' +
    Object.keys(letters).sort().map(function (L) {
      return '<a href="#dir-' + L + '">' + L + '</a>';
    }).join('') + '</nav>';

  // Group states under letter anchors.
  let lastLetter = '';
  const stateHtml = states.map(function (st) {
    const L = st.charAt(0).toUpperCase();
    let prefix = '';
    if (L !== lastLetter) { prefix = '<h2 class="dir-letter" id="dir-' + L + '">' + L + '</h2>'; lastLetter = L; }
    return prefix + stateBlock(st);
  }).join('');

  const body =
    '<section class="dir-hero"><div class="wrap">' +
      '<span class="eyebrow">CoverCapy · Directory</span>' +
      '<h1>PPO dentist directory</h1>' +
      '<p class="lead">Every CoverCapy market, A to Z. Browse in-network PPO dentists by ' +
        'state, then metro, then city. Get cover today, see a dentist tomorrow.</p>' +
      '<p class="dir-tldr"><b>Quick answer:</b> CoverCapy lists in-network PPO dentists across ' +
        states.length + ' states. Open a state to see its metros and cities, or use the A to Z ' +
        'bar to jump to a state.</p>' +
      jumpBar +
    '</div></section>' +
    '<section class="dir-body-sec"><div class="wrap">' + stateHtml + '</div></section>' +
    '<section class="dir-links"><div class="wrap">' +
      '<h2>Other ways to find a dentist</h2>' +
      '<ul class="dir-xlinks">' +
        '<li><a href="/featured-markets">Featured PPO dental markets</a></li>' +
        '<li><a href="/find-my-dentist.html">Find my dentist by zip</a></li>' +
        '<li><a href="/compare-ppo-dental-plans">Compare PPO dental plans</a></li>' +
        '<li><a href="/request-a-dentist.html">Request a dentist in your area</a></li>' +
      '</ul>' +
    '</div></section>';

  const css = directoryIndexCss(); // scoped .ppo-directory-page styles, see section 7

  const html = pageShell({
    title: 'PPO Dentist Directory: Find Dentists by State & City | CoverCapy',
    meta: 'The complete CoverCapy directory of in-network PPO dentists by state, metro, and city. Browse every market from A to Z and verify your dental coverage free.',
    canonical: BASE_URL + '/ppo-dentist-directory',
    bodyClass: 'ppo-directory-page',
    extraHead: css,
    body: body,
    schema: schema
  });

  writeFile('ppo-dentist-directory.html', html);
  console.log('  ppo-dentist-directory.html written (' + states.length + ' states)');
}
```

Helper notes:
- `esc()` — generator's existing HTML escaper.
- `pageShell` argument names must match the real signature `pageShell({title, meta,
  canonical, body, schema})`. If it lacks `bodyClass`/`extraHead`, inline the wrapper
  `<div class="ppo-directory-page">` and `<style>` into `body`.
- City derivation relies on `d.market_area`. If some dentists lack `market_area`, fall back
  to nearest-metro logic the generator already uses, or skip the city level for those (the
  metro link still resolves). Never invent a city hub that has no page.

## 6. CALL LINE

After markets + dentists are fetched and hubs are built:

```javascript
buildDirectoryIndex(markets, dentists);
```

Gate under the hub flag so `--hubs` builds it:

```javascript
if (BUILD_HUBS || BUILD_ALL) buildDirectoryIndex(markets, dentists);
```

## 7. SCOPED CSS (`.ppo-directory-page`)

```javascript
function directoryIndexCss() {
  return '<style>' +
  '.ppo-directory-page{--teal-night:#082A30;--teal-700:#14525B;--mint:#5BE0A0;' +
    '--cream:#F6F0E6;--cream-card:#FFFDF8;--ink:#082A30;--ink-soft:#56655F;--line:#E8E2D8;' +
    'font-family:\'Hanken Grotesk\',system-ui,sans-serif;color:var(--ink);background:var(--cream)}' +
  '.ppo-directory-page .wrap{max-width:1080px;margin:0 auto;padding:0 24px}' +
  '.ppo-directory-page h1,.ppo-directory-page h2{font-family:\'Fraunces\',Georgia,serif;font-weight:500}' +
  '.ppo-directory-page .dir-hero{padding:64px 0 24px}' +
  '.ppo-directory-page h1{font-size:clamp(2.2rem,5vw,3.4rem);margin:14px 0 16px}' +
  '.ppo-directory-page .lead{font-size:1.12rem;color:var(--ink-soft);max-width:60ch}' +
  '.ppo-directory-page .eyebrow{font-weight:700;font-size:.72rem;letter-spacing:.2em;' +
    'text-transform:uppercase;color:var(--teal-700)}' +
  '.ppo-directory-page .dir-tldr{margin:22px 0;padding:18px 22px;background:var(--cream-card);' +
    'border:1px solid var(--line);border-left:4px solid var(--mint);border-radius:14px;max-width:70ch}' +
  '.ppo-directory-page .dir-az{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}' +
  '.ppo-directory-page .dir-az a{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;' +
    'background:var(--cream-card);border:1px solid var(--line);text-decoration:none;color:var(--teal-700);font-weight:700}' +
  '.ppo-directory-page .dir-letter{margin:34px 0 12px;font-size:1.5rem;color:var(--teal-700)}' +
  '.ppo-directory-page details.dir-state{background:var(--cream-card);border:1px solid var(--line);' +
    'border-radius:14px;margin-bottom:10px;padding:2px 20px}' +
  '.ppo-directory-page details.dir-state summary{list-style:none;cursor:pointer;display:flex;' +
    'align-items:center;justify-content:space-between;gap:16px;padding:16px 0}' +
  '.ppo-directory-page details.dir-state summary::-webkit-details-marker{display:none}' +
  '.ppo-directory-page .dir-state-name{font-family:\'Fraunces\',serif;font-size:1.2rem;color:var(--ink);text-decoration:none}' +
  '.ppo-directory-page .dir-count{font-size:.82rem;color:var(--ink-soft)}' +
  '.ppo-directory-page .dir-state-body{padding:6px 0 18px;display:grid;gap:16px}' +
  '.ppo-directory-page .dir-metro-name{font-weight:700;color:var(--teal-700);text-decoration:none}' +
  '.ppo-directory-page .dir-cities{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}' +
  '.ppo-directory-page .dir-city{font-size:.88rem;color:var(--ink-soft);text-decoration:none;' +
    'padding:5px 12px;background:var(--cream);border:1px solid var(--line);border-radius:100px}' +
  '.ppo-directory-page .dir-city:hover,.ppo-directory-page .dir-metro-name:hover{color:var(--teal-night)}' +
  '.ppo-directory-page .dir-links{padding:40px 0 72px}' +
  '.ppo-directory-page .dir-xlinks{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:12px}' +
  '.ppo-directory-page .dir-xlinks a{display:inline-block;padding:12px 18px;background:var(--cream-card);' +
    'border:1px solid var(--line);border-radius:100px;text-decoration:none;color:var(--teal-700);font-weight:600}' +
  '</style>';
}
```

## 8. SITEMAP ENTRY

Root-level page. Add to the root sitemap (or `sitemap-dental.xml` if that is the only one
generated), high priority since it is the crawl spine:

```xml
<url>
  <loc>https://www.covercapy.com/ppo-dentist-directory</loc>
  <lastmod>{BUILD_DATE}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

## 9. SEO / GEO NOTES

- One H1: "PPO dentist directory". Letter headings are H2.
- This is the single most important internal-linking page: it should be linked from the
  footer (already), the homepage, every hub, and `/featured-markets`.
- `dir-tldr` is the GEO-extractable answer (state count + how to navigate).
- Every link is built FROM PARTS, never `seo_path`. Alphabetized at all three levels.
- No em-dashes, no roman numerals. `sameAs` arrays only.
- Because the page can be large, the `<details>` accordion keeps it scannable while still
  shipping every link in the static HTML (crawlers read closed `<details>` content).
