# GENERATOR SPEC — Featured Markets (`/featured-markets.html`)

This page is data-driven. It is produced by `seo-build/generate-plans.js` from the
`markets` and `dentists` Supabase tables. Do NOT hand-build a static file with fake data.
Run the generator from the user's Mac only: `node seo-build/generate-plans.js`.

`seo-build/generate-plans.js` was NOT present in the repo at spec time (it is gitignored and
the `seo-build/` folder was empty). The function below is modeled on the helper signatures
documented in `CLAUDE.md` (`pageShell`, `fetchAllRows`, `slugify`, `stateSlug`, `BASE_URL`).
Match the generator's real style and helper names when you wire it in.

---

## 1. PURPOSE

A curated editorial index of CoverCapy's strongest metro markets. It is the "front door" to
the `/dental/` crawl tree for the highest-intent geographies. It exists to:
- give the universal footer's 8 market links a real landing index,
- surface the top metros by office count as internal-link equity hubs,
- give AI answer engines a single extractable list of "where CoverCapy covers PPO dentists".

It is a curated subset, not the exhaustive A-Z (that is `ppo-dentist-directory.html`).

## 2. URL / HEAD

| Field | Value |
|-------|-------|
| Output file | `featured-markets.html` (repo ROOT, so `/featured-markets.html` resolves) |
| Canonical | `https://www.covercapy.com/featured-markets` (no `.html`) |
| Title | `Featured PPO Dental Markets: Top Metros | CoverCapy` |
| Meta description | `Browse CoverCapy's featured PPO dental markets, from Los Angeles and Orange County to New York City, Chicago, Dallas, and Miami. Find an in-network dentist and verify coverage free.` |
| OG | type=website, mirror title/description, url=canonical |
| Keywords | `featured dental markets, top PPO dentist cities, dentist by metro, PPO dentist Los Angeles, PPO dentist New York, find a dentist by city` |

## 3. SCHEMA (JSON-LD) — three blocks

1. `Organization` (CoverCapy) — same block used sitewide.
2. `BreadcrumbList` — Home -> Featured Markets.
3. `CollectionPage` whose `mainEntity` is an `ItemList`. Each `ListItem` is one featured
   metro with `position`, `name` ("Los Angeles, CA"), and `url` (the `/dental/{state}/{metro}/` hub).
   `sameAs` must be an ARRAY if used. No em-dashes, no roman numerals.

## 4. DATA SOURCE

- `markets` table: `market_area`, `seo_area`, `state`, `hub_type`, `office_count`.
  Filter `hub_type = 'metro'`. Rank by `office_count` desc.
- Build URLs FROM PARTS, never `seo_path`:
  `${BASE_URL}/dental/${stateSlug(m.state)}/${slugify(m.seo_area || m.market_area)}/`
- The 8 footer markets are pinned to the top in fixed order, then remaining high-office-count
  metros fill the grid. The 8 footer hubs (verified live in `/dental/`):
  - Orange County -> `/dental/california/orange-county/`
  - Los Angeles -> `/dental/california/los-angeles/`
  - San Diego -> `/dental/california/san-diego/`
  - San Francisco (Bay Area) -> `/dental/california/bay-area/`
  - New York City -> `/dental/new-york/new-york-city/`
  - Chicago -> `/dental/illinois/chicago/`
  - Dallas -> `/dental/texas/dallas/`
  - Miami -> `/dental/florida/miami/`
- Office counts come from `m.office_count` (cached). If null, fall back to counting dentists
  whose `market_area` matches (using the already-fetched dentists array).

## 5. FUNCTION TO ADD TO `seo-build/generate-plans.js`

```javascript
// ---------------------------------------------------------------------------
// FEATURED MARKETS  — /featured-markets.html
// Curated index of top metros. Footer 8 pinned first, then highest office-count.
// ---------------------------------------------------------------------------
function buildFeaturedMarkets(markets, dentists) {
  // Footer-pinned metros, in fixed order. Keyed by {state, seo_area} so we
  // match the live /dental/ hub exactly.
  const PINNED = [
    { state: 'California', area: 'orange-county',  label: 'Orange County, CA' },
    { state: 'California', area: 'los-angeles',    label: 'Los Angeles, CA' },
    { state: 'California', area: 'san-diego',      label: 'San Diego, CA' },
    { state: 'California', area: 'bay-area',       label: 'San Francisco Bay Area, CA' },
    { state: 'New York',   area: 'new-york-city',  label: 'New York City, NY' },
    { state: 'Illinois',   area: 'chicago',        label: 'Chicago, IL' },
    { state: 'Texas',      area: 'dallas',         label: 'Dallas, TX' },
    { state: 'Florida',    area: 'miami',          label: 'Miami, FL' }
  ];

  // Index metros by their built slug so we can de-dupe and read office counts.
  const metroRows = (markets || []).filter(function (m) { return m.hub_type === 'metro'; });
  const bySlug = {};
  metroRows.forEach(function (m) {
    const stSlug = stateSlug(m.state);
    const mkSlug = slugify(m.seo_area || m.market_area);
    bySlug[stSlug + '/' + mkSlug] = m;
  });

  // Live office count for a metro: cached office_count, else count dentists in that market.
  function countFor(m) {
    if (m && typeof m.office_count === 'number' && m.office_count > 0) return m.office_count;
    const name = (m && m.market_area) || '';
    return (dentists || []).filter(function (d) {
      return (d.market_area || '') === name || (d.state === (m && m.state) && d.city);
    }).length;
  }

  // 1) Pinned cards, in fixed footer order.
  const seen = {};
  const cards = [];
  PINNED.forEach(function (p) {
    const stSlug = stateSlug(p.state);
    const key = stSlug + '/' + p.area;
    const m = bySlug[key] || { state: p.state, market_area: p.label, seo_area: p.area };
    seen[key] = true;
    cards.push({
      label: p.label,
      url: BASE_URL + '/dental/' + key + '/',
      count: countFor(m),
      featured: true
    });
  });

  // 2) Fill with remaining highest office-count metros (cap the grid sensibly, e.g. 24 total).
  const FILL_CAP = 24;
  metroRows
    .map(function (m) {
      const stSlug = stateSlug(m.state);
      const mkSlug = slugify(m.seo_area || m.market_area);
      return { m: m, key: stSlug + '/' + mkSlug, count: countFor(m) };
    })
    .filter(function (r) { return !seen[r.key]; })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, Math.max(0, FILL_CAP - cards.length))
    .forEach(function (r) {
      seen[r.key] = true;
      cards.push({
        label: r.m.market_area + ', ' + stateAbbr(r.m.state),
        url: BASE_URL + '/dental/' + r.key + '/',
        count: r.count,
        featured: false
      });
    });

  // ----- JSON-LD: CollectionPage + ItemList -----
  const itemList = {
    '@type': 'ItemList',
    itemListElement: cards.map(function (c, i) {
      return { '@type': 'ListItem', position: i + 1, name: c.label, url: c.url };
    })
  };
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Featured PPO Dental Markets',
      url: BASE_URL + '/featured-markets',
      description: 'Curated index of CoverCapy top PPO dental metro markets.',
      mainEntity: itemList
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Featured Markets', item: BASE_URL + '/featured-markets' }
      ]
    }
  ];

  // ----- BODY -----
  function cardHtml(c) {
    return (
      '<a class="fm-card' + (c.featured ? ' fm-pinned' : '') + '" href="' + c.url + '">' +
        '<span class="fm-name">' + esc(c.label) + '</span>' +
        '<span class="fm-meta">' + (c.count > 0 ? c.count + ' verified offices' : 'Browse offices') + '</span>' +
        '<span class="fm-go">View dentists →</span>' +
      '</a>'
    );
  }

  const body =
    '<section class="fm-hero"><div class="wrap">' +
      '<span class="eyebrow">CoverCapy · Featured Markets</span>' +
      '<h1>Featured PPO dental markets</h1>' +
      '<p class="lead">The metros where CoverCapy concierge coverage moves fastest. ' +
        'Get cover today, see a dentist tomorrow. Pick your market to browse in-network ' +
        'PPO dentists and verify your coverage free.</p>' +
      '<p class="fm-tldr"><b>Quick answer:</b> CoverCapy features ' + cards.length +
        ' top PPO dental metros, led by Los Angeles, Orange County, San Diego, the San Francisco ' +
        'Bay Area, New York City, Chicago, Dallas, and Miami. Each links to in-network dentists ' +
        'you can verify free.</p>' +
    '</div></section>' +
    '<section class="fm-grid-sec"><div class="wrap">' +
      '<div class="fm-grid">' + cards.map(cardHtml).join('') + '</div>' +
    '</div></section>' +
    '<section class="fm-links"><div class="wrap">' +
      '<h2>Keep exploring</h2>' +
      '<ul class="fm-xlinks">' +
        '<li><a href="/ppo-dentist-directory">Full A to Z PPO dentist directory</a></li>' +
        '<li><a href="/find-my-dentist.html">Find my dentist by zip</a></li>' +
        '<li><a href="/compare-ppo-dental-plans">Compare PPO dental plans</a></li>' +
        '<li><a href="/request-a-dentist.html">Request a dentist in your area</a></li>' +
      '</ul>' +
    '</div></section>';

  const css = featuredMarketsCss(); // scoped .featured-markets-page styles, see section 7

  const html = pageShell({
    title: 'Featured PPO Dental Markets: Top Metros | CoverCapy',
    meta: 'Browse CoverCapy featured PPO dental markets, from Los Angeles and Orange County to New York City, Chicago, Dallas, and Miami. Find an in-network dentist and verify coverage free.',
    canonical: BASE_URL + '/featured-markets',
    bodyClass: 'featured-markets-page',
    extraHead: css,
    body: body,
    schema: schema
  });

  writeFile('featured-markets.html', html); // repo-root output, same writer hubs use
  console.log('  featured-markets.html written (' + cards.length + ' markets)');
}
```

Notes on helpers referenced:
- `esc()` — the generator's existing HTML-escaper (use whatever it already calls it).
- `stateAbbr(state)` — if the generator lacks one, add a small full-name -> abbr map
  (e.g. California -> CA). The pinned labels already hard-code the abbreviation.
- `writeFile` / `pageShell` argument names: adapt to the real `pageShell({title, meta,
  canonical, body, schema})` signature in CLAUDE.md. If `pageShell` does not accept
  `bodyClass`/`extraHead`, inline the scoped wrapper `<div class="featured-markets-page">`
  and the `<style>` block inside `body` instead.

## 6. CALL LINE

In `main()` / the orchestration block, after markets and dentists are fetched and after the
hub builds, add:

```javascript
buildFeaturedMarkets(markets, dentists);
```

Gate it under the same flags the hubs use so `--hubs` includes it, e.g.:

```javascript
if (BUILD_HUBS || BUILD_ALL) buildFeaturedMarkets(markets, dentists);
```

## 7. SCOPED CSS (`.featured-markets-page`)

Reuse the design tokens already defined in `CLAUDE.md`. Keep it boutique, no gradients on
cards, no glassmorphism. Sketch:

```javascript
function featuredMarketsCss() {
  return '<style>' +
  '.featured-markets-page{--teal-night:#082A30;--teal-700:#14525B;--mint:#5BE0A0;' +
    '--cream:#F6F0E6;--cream-card:#FFFDF8;--ink:#082A30;--ink-soft:#56655F;--line:#E8E2D8;' +
    'font-family:\'Hanken Grotesk\',system-ui,sans-serif;color:var(--ink);background:var(--cream)}' +
  '.featured-markets-page .wrap{max-width:1120px;margin:0 auto;padding:0 24px}' +
  '.featured-markets-page h1,.featured-markets-page h2{font-family:\'Fraunces\',Georgia,serif;font-weight:500}' +
  '.featured-markets-page .fm-hero{padding:64px 0 28px}' +
  '.featured-markets-page h1{font-size:clamp(2.2rem,5vw,3.4rem);margin:14px 0 16px}' +
  '.featured-markets-page .lead{font-size:1.12rem;color:var(--ink-soft);max-width:60ch}' +
  '.featured-markets-page .eyebrow{font-weight:700;font-size:.72rem;letter-spacing:.2em;' +
    'text-transform:uppercase;color:var(--teal-700)}' +
  '.featured-markets-page .fm-tldr{margin-top:22px;padding:18px 22px;background:var(--cream-card);' +
    'border:1px solid var(--line);border-left:4px solid var(--mint);border-radius:14px;max-width:70ch}' +
  '.featured-markets-page .fm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));' +
    'gap:16px;padding:18px 0 48px}' +
  '.featured-markets-page .fm-card{display:flex;flex-direction:column;gap:6px;padding:22px 24px;' +
    'background:var(--cream-card);border:1px solid var(--line);border-radius:16px;text-decoration:none;' +
    'color:var(--ink);transition:transform .18s ease,box-shadow .18s ease}' +
  '.featured-markets-page .fm-card:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(8,42,48,.10)}' +
  '.featured-markets-page .fm-pinned{border-color:var(--teal-700)}' +
  '.featured-markets-page .fm-name{font-family:\'Fraunces\',serif;font-size:1.2rem}' +
  '.featured-markets-page .fm-meta{font-size:.86rem;color:var(--ink-soft)}' +
  '.featured-markets-page .fm-go{margin-top:6px;font-weight:700;font-size:.9rem;color:var(--teal-700)}' +
  '.featured-markets-page .fm-links{padding:0 0 72px}' +
  '.featured-markets-page .fm-xlinks{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:12px}' +
  '.featured-markets-page .fm-xlinks a{display:inline-block;padding:12px 18px;background:var(--cream-card);' +
    'border:1px solid var(--line);border-radius:100px;text-decoration:none;color:var(--teal-700);font-weight:600}' +
  '</style>';
}
```

## 8. SITEMAP ENTRY

Add one URL to the appropriate sitemap (the top-level site sitemap, not `sitemap-dental.xml`,
since this lives at the root). If the generator writes a root sitemap, append:

```xml
<url>
  <loc>https://www.covercapy.com/featured-markets</loc>
  <lastmod>{BUILD_DATE}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

If only `sitemap-dental.xml` is generated, add this URL there with `priority` 0.8; it is a
hub above the metro hubs.

## 9. SEO / GEO NOTES

- One H1: "Featured PPO dental markets".
- The `fm-tldr` block is the GEO-extractable answer: a single sentence naming the 8 lead metros.
- Internal links OUT to `/ppo-dentist-directory`, `/find-my-dentist.html`,
  `/compare-ppo-dental-plans`, `/request-a-dentist.html`, and every featured `/dental/` hub.
- It is a strong link TARGET: link to it from the directory index, the homepage, and hubs.
- No em-dashes, no roman numerals. `sameAs` arrays only. Build URLs from parts, never `seo_path`.
