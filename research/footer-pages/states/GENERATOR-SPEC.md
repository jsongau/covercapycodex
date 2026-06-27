# GENERATOR-SPEC.md — `/states.html`

## Status of `seo-build/generate-plans.js`
**NOT present on disk.** The only generator file in the repo is the root-level
`generate-plans.js` (bakes `ppo_plans` into the compare page, then runs `genSpokes()` to
emit Delta Dental SEO spokes + sitemap). The `seo-build/generate-plans.js` with
`buildStateHub`/`dentistCard`/`pageShell` described in CLAUDE.md is **not** on disk.

Therefore the code below is written to match the **real, on-disk** house style of the
root `generate-plans.js`: it reuses that file's actual helpers (`HEAD()`, `esc()`,
`FOOT`, `slugify()`, `stateSlug()`, `SITE`, `ANON_KEY`, `SUPABASE_URL`, the paginated
`fetch` pattern, and `writePage()`), and appends to the same `sitemap.xml` merge block.
Add the function to root `generate-plans.js`, OR drop it into `seo-build/generate-plans.js`
once that file is restored, importing the same helpers. This is called out explicitly so
the Mac operator wires it into whichever generator is live.

---

## 1. Purpose
Master index of every US state where CoverCapy has a dentist/market presence. One screen,
fully crawlable, that links to every `/dental/{state}/` state hub. It gives Google and AI
answer engines a single hub that enumerates the national footprint, shortens crawl depth to
all 6,400+ child pages by one hop, and gives the universal footer a real `/states.html`
target. Luxury-concierge framing: "Every market we cover, in one place."

## 2. Exact URL
- Output file: `states.html` at repo ROOT (served at `/states.html`).
- Canonical: `https://www.covercapy.com/states` (no `.html`, matching house canonical style).

## 3. Title / Meta / Canonical
- `<title>`: `PPO Dentists by State — CoverCapy National Directory | CoverCapy`
- `<meta name="description">`: `Browse insurance-verified PPO dentists by state. CoverCapy covers thousands of offices across every market we serve. Find your state, then your city, and verify coverage free.`
- `<link rel="canonical" href="https://www.covercapy.com/states">`
- `<meta name="robots" content="index, follow, max-image-preview:large">`

## 4. JSON-LD plan
Three blocks, emitted as one JSON array string passed to `HEAD(...)` (the existing `HEAD`
template injects a single `<script type="application/ld+json">` — pass a JSON **array**):

1. `CollectionPage`
   - `name`: "PPO Dentists by State"
   - `url`: `https://www.covercapy.com/states`
   - `isPartOf`: `{ "@type":"WebSite", "name":"CoverCapy", "url":"https://www.covercapy.com" }`
   - `about`: `{ "@type":"Thing", "name":"PPO dental coverage by US state" }`
2. `ItemList`
   - `itemListOrder`: `https://schema.org/ItemListOrderAscending`
   - `numberOfItems`: states.length
   - `itemListElement`: one `ListItem` per state, `{ position, url: SITE + "/dental/" + stSlug + "/", name: "PPO Dentists in " + stateName }`
3. `BreadcrumbList`
   - Home (`https://www.covercapy.com/`) -> "PPO Dentists by State" (`/states`)

`sameAs` is not used here; if added anywhere it MUST be an array (hard rule). No em-dashes,
no roman numerals in any string.

## 5. Data source (precise)
**Primary (preferred): Supabase, paginated exactly like `genSpokes()`.**
- Table `markets`, columns: `market_area, seo_area, state, hub_type, office_count`.
  Query `select=state,seo_area,market_area,hub_type,office_count&order=state.asc`.
  Group by `state` to get the set of states that have at least one market row, and sum
  `office_count` per state (fallback: count of markets) for the badge number.
- This is authoritative and matches CLAUDE.md. It also future-proofs the page: when a new
  state is added to `markets`, the index picks it up on the next build with no code change.

**Fallback (no Supabase / `markets` empty): enumerate the `dental/` tree.**
- Each immediate subdirectory of `dental/` that contains an `index.html` is a state hub.
  `state slug = dir name`; display name via a reverse map of `stateSlug` (below).
- NOTE the existing tree has a known slug inconsistency: both `dental/nevada/` and
  `dental/nv/` exist. The spec de-dupes by canonical state name so Nevada appears once and
  links to `/dental/nevada/` (the full-word slug, which `stateSlug('Nevada')` returns).

**State display names**: build a `STATE_NAME` reverse map from the `stateSlug` map already in
the file, extended to cover the on-disk states:
`{california:'California', texas:'Texas', florida:'Florida', 'new-york':'New York',
nevada:'Nevada', arizona:'Arizona', illinois:'Illinois', pennsylvania:'Pennsylvania',
connecticut:'Connecticut', 'rhode-island':'Rhode Island', 'new-jersey':'New Jersey',
'north-carolina':'North Carolina', ohio:'Ohio', washington:'Washington', georgia:'Georgia',
virginia:'Virginia'}`. Any state not in the map falls back to a title-cased slug, so the
build never crashes on a new state.

## 6. The `buildStatesIndex()` function (add to the generator)

```javascript
/* ============================================================
   /states.html  — national index of every state hub
   Mirrors the genSpokes() data + style: paginated Supabase fetch,
   HEAD()/FOOT()/esc()/slugify()/stateSlug()/SITE, writePage(),
   sitemap merge. Fully fail-safe: any error warns and skips.
   ============================================================ */

// Reverse of stateSlug() for display names. Extend as new states are added.
const STATE_NAME = {
  'california': 'California', 'illinois': 'Illinois', 'texas': 'Texas',
  'florida': 'Florida', 'nevada': 'Nevada', 'arizona': 'Arizona',
  'pennsylvania': 'Pennsylvania', 'connecticut': 'Connecticut',
  'rhode-island': 'Rhode Island', 'new-jersey': 'New Jersey',
  'new-york': 'New York', 'north-carolina': 'North Carolina',
  'ohio': 'Ohio', 'washington': 'Washington', 'georgia': 'Georgia',
  'virginia': 'Virginia'
};
const titleCaseSlug = (s) => String(s || '').split('-')
  .map(w => w ? w[0].toUpperCase() + w.slice(1) : '').join(' ');
const stateName = (slug) => STATE_NAME[slug] || titleCaseSlug(slug);

// Pull markets the same way genSpokes() pulls dentists (paginate to be safe).
async function fetchMarkets() {
  const sel = 'select=state,seo_area,market_area,hub_type,office_count&order=state.asc';
  const PER = 1000; let offset = 0, all = [];
  for (;;) {
    const res = await fetch(SUPABASE_URL + '/rest/v1/markets?' + sel + '&limit=' + PER + '&offset=' + offset,
      { headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY } });
    if (!res.ok) throw new Error('markets REST ' + res.status);
    const page = await res.json();
    all = all.concat(page);
    if (page.length < PER) break;
    offset += PER;
  }
  return all;
}

// Fallback: read the on-disk dental/ tree for state hubs.
function statesFromDisk() {
  const out = {};
  let dirs = [];
  try { dirs = fs.readdirSync('dental', { withFileTypes: true }); } catch (e) { return out; }
  dirs.forEach(d => {
    if (!d.isDirectory()) return;
    const slug = d.name;
    if (!fs.existsSync(path.join('dental', slug, 'index.html'))) return;
    // Canonicalise to the full-word slug to merge nv -> nevada, etc.
    const canonSlug = stateSlug(stateName(slug));
    out[canonSlug] = out[canonSlug] || { slug: canonSlug, name: stateName(canonSlug), offices: 0, markets: 0 };
  });
  return out;
}

async function buildStatesIndex() {
  // 1) Assemble { slug -> {name, offices, markets} }
  let byState = {};
  try {
    const markets = await fetchMarkets();
    markets.forEach(m => {
      const nm = (m.state || '').trim();
      if (!nm) return;
      const slug = stateSlug(nm);
      const s = byState[slug] || (byState[slug] = { slug, name: nm, offices: 0, markets: 0 });
      s.offices += Number(m.office_count || 0);
      s.markets += 1;
    });
  } catch (e) {
    console.warn('[states] markets fetch failed (' + e.message + '), falling back to disk');
  }
  if (!Object.keys(byState).length) byState = statesFromDisk();
  if (!Object.keys(byState).length) { console.warn('[states] no states found, skipping'); return; }

  // 2) Alphabetical list
  const states = Object.values(byState).sort((a, b) => a.name.localeCompare(b.name));

  // 3) Group A-Z for the visible index
  const groups = {};
  states.forEach(s => { const L = s.name[0].toUpperCase(); (groups[L] = groups[L] || []).push(s); });
  const letters = Object.keys(groups).sort();

  const fmtN = (n) => Number(n || 0).toLocaleString('en-US');
  const totalOffices = states.reduce((t, s) => t + s.offices, 0);
  const totalMarkets = states.reduce((t, s) => t + s.markets, 0);

  // 4) Cards markup
  const cards = letters.map(L => {
    const items = groups[L].map(s => {
      const href = '/dental/' + s.slug + '/';
      const sub = s.offices ? fmtN(s.offices) + '+ PPO offices'
        : (s.markets ? fmtN(s.markets) + ' markets' : 'View hub');
      return `      <li class="st-item"><a href="${href}"><span class="st-name">${esc(s.name)}</span><span class="st-sub">${esc(sub)}</span><span class="st-go">View hub &rsaquo;</span></a></li>`;
    }).join('\n');
    return `    <div class="st-group"><h2 class="st-letter">${esc(L)}</h2>\n    <ul class="st-list">\n${items}\n    </ul></div>`;
  }).join('\n');

  // 5) JSON-LD (array of three blocks)
  const itemList = states.map((s, i) => ({
    '@type': 'ListItem', position: i + 1,
    url: SITE + '/dental/' + s.slug + '/', name: 'PPO Dentists in ' + s.name
  }));
  const jsonld = JSON.stringify([
    { '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: 'PPO Dentists by State', url: SITE + '/states',
      isPartOf: { '@type': 'WebSite', name: 'CoverCapy', url: SITE },
      about: { '@type': 'Thing', name: 'PPO dental coverage by US state' } },
    { '@context': 'https://schema.org', '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: states.length, itemListElement: itemList },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'PPO Dentists by State', item: SITE + '/states' }
    ] }
  ]);

  // 6) Page body (reuses HEAD/FOOT + the file's nav/footer mounts and scoped CSS pattern)
  const title = 'PPO Dentists by State — CoverCapy National Directory | CoverCapy';
  const desc = 'Browse insurance-verified PPO dentists by state. CoverCapy covers thousands of offices across every market we serve. Find your state, then your city, and verify coverage free.';
  const body = `
<div id="cc-nav-mount" data-include="/mega-nav.html"></div>
<main class="states-page">
  <nav class="crumb"><div class="wrap"><a href="/">Home</a> &rsaquo; <span>PPO Dentists by State</span></div></nav>
  <header class="hero"><div class="wrap">
    <p class="eyebrow">National directory</p>
    <h1 class="title">PPO dentists, <em>by state</em></h1>
    <p class="lede">Every market CoverCapy covers, in one place. Choose your state, open its hub, then drill down to your city and verify your PPO at a real office, free.</p>
    <div class="facts">
      <div><b>${fmtN(states.length)}</b><span>states covered</span></div>
      <div><b>${fmtN(totalMarkets)}+</b><span>markets</span></div>
      <div><b>${fmtN(totalOffices)}+</b><span>PPO offices</span></div>
    </div>
  </div></header>
  <section class="block"><div class="wrap">
    <div class="states-grid">
${cards}
    </div>
  </div></section>
  <section class="block"><div class="wrap cta-row">
    <a class="btn-primary" href="/find-my-dentist.html">Find my dentist</a>
    <a class="btn-ghost" href="/cities.html">Browse cities and metros</a>
    <a class="btn-ghost" href="/compare-ppo-dental-plans">Compare PPO plans</a>
  </div></section>
</main>
<div id="cc-footer-mount" data-include="/footer.html"></div>
<style>
  .states-page .states-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px}
  .states-page .st-group h2.st-letter{font-size:15px;color:var(--jade-deep);letter-spacing:.12em;text-transform:uppercase;margin:0 0 10px}
  .states-page .st-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
  .states-page .st-item a{display:flex;align-items:baseline;gap:10px;border:1px solid var(--line);border-radius:12px;padding:12px 14px;text-decoration:none;background:var(--bg);transition:border-color .18s,box-shadow .18s}
  .states-page .st-item a:hover{border-color:rgba(15,181,166,.45);box-shadow:var(--shadow)}
  .states-page .st-name{font-family:var(--serif);font-size:17px;color:var(--ink)}
  .states-page .st-sub{font-size:12px;color:var(--muted);margin-left:auto}
  .states-page .st-go{font-size:12px;color:var(--jade-deep);font-weight:600;flex:0 0 auto}
  .states-page .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .states-page .btn-primary{background:var(--jade);color:var(--jade-ink);font-weight:600;padding:12px 18px;border-radius:999px;text-decoration:none}
  .states-page .btn-ghost{background:var(--panel);color:var(--ink);border:1px solid var(--line-strong);padding:12px 18px;border-radius:999px;text-decoration:none}
</style>
${FOOT}`;

  const html = HEAD(title, desc, SITE + '/states', jsonld) + body + '\n</body></html>';
  writePage('states.html', html);
  console.log('[states] wrote states.html with', states.length, 'states');
  return states.map(s => '/dental/' + s.slug + '/'); // for sitemap (hubs already exist; harmless dedupe)
}
```

### One-line call to add to the build sequence
Inside `genSpokes()` (or wherever the index builders run), after the city/area loop and
before the sitemap merge, add:

```javascript
  let stateHubUrls = [];
  try { stateHubUrls = (await buildStatesIndex()) || []; } catch (e) { console.warn('[states] skip:', e.message); }
  urls.push('/states', ...stateHubUrls);
```

If you prefer to keep it out of `genSpokes()`, call it from the final `.finally()` chain
alongside `genSpokes()`. Either way it is fail-safe and never blocks the deploy.

### Sitemap entry
`/states` is pushed onto the existing `urls` array, so it flows through the same
`sitemap.xml` `<!-- CC_SPOKES -->` merge block already in the file. No new sitemap code.
(The `/dental/{state}/` hub URLs are already in `dental/sitemap-dental.xml`; re-pushing them
here is deduped by the existing `[...new Set(urls)]`.)

## 7. SEO / GEO notes
- **Crawl depth**: today a state hub is reachable only via the homepage or footer. This page
  becomes a second, dense entry point that links to all ~15 state hubs in one DOM, so every
  state (and transitively every metro, city, and T5 profile) is one hop closer to the root.
- **Internal linking**: descriptive anchors ("PPO Dentists in California"), never "click
  here". Cross-links out to `/cities.html`, `/find-my-dentist.html`, `/compare-ppo-dental-plans`.
- **GEO / AI answer engines**: the `ItemList` + `CollectionPage` schema gives ChatGPT/Gemini/
  AI Overviews a machine-readable roster of "states where CoverCapy lists PPO dentists",
  which is exactly the kind of entity list those engines extract for "PPO dentist directory
  by state" prompts.
- **Keywords**: see `02-seo-geo.md`.

## 8. How to run (Mac only)
Supabase is unreachable from the sandbox, so this must run from the user's Mac:

```bash
cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26"
node seo-build/generate-plans.js          # if the seo-build generator is restored
# or, since the live generator is root-level:
node generate-plans.js
git add -A && git commit -m "feat: add /states.html national index" && git push
```
Vercel auto-deploys `main` in about 2 minutes.
