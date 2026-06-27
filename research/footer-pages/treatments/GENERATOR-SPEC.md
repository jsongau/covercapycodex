# GENERATOR-SPEC.md — `/treatments.html`

## Status of `seo-build/generate-plans.js`
**NOT present on disk.** Only the root `generate-plans.js` exists. The code below reuses that
file's real helpers (`HEAD()`, `esc()`, `FOOT`, `SITE`, `writePage()`) and the same
`sitemap.xml` merge. Wire into whichever generator is live on the Mac.

Unlike `/states.html` and `/cities.html`, this index does **not** query Supabase. Treatment
landing pages are hand-authored topic pages (built by sibling agents), not data rows, so the
data source is a small **curated manifest** baked into the generator. Each manifest entry is
emitted only if its target page exists on disk, so the index never links to a 404.

---

## 1. Purpose
Index of CoverCapy's treatment and procedure landing pages: cost guides (implants, crowns,
Invisalign, cosmetic, emergency, plus the cross-treatment estimator) and the procedure topics
patients search (root canal, whitening, dentures, veneers, extractions, cleanings, fillings).
It gives the universal footer a real `/treatments.html` target, clusters all
procedure-and-cost content under one hub, and gives AI answer engines a tidy roster of
"what does CoverCapy cover and what does it cost" topics. Concierge framing: "Know the cost
before you sit in the chair."

## 2. Exact URL
- Output file: `treatments.html` at repo ROOT (served at `/treatments.html`).
- Canonical: `https://www.covercapy.com/treatments`.

## 3. Title / Meta / Canonical
- `<title>`: `Dental Treatments and Costs — PPO Coverage Guides | CoverCapy`
- `<meta name="description">`: `Treatment-by-treatment cost guides for PPO dental patients. See typical price ranges for implants, crowns, Invisalign, cosmetic, emergency and more, and how PPO coverage and CoverCapy lower the bill.`
- `<link rel="canonical" href="https://www.covercapy.com/treatments">`
- `<meta name="robots" content="index, follow, max-image-preview:large">`

## 4. JSON-LD plan
Array of three blocks passed to `HEAD(...)`:

1. `CollectionPage`
   - `name`: "Dental Treatments and Costs"
   - `url`: `https://www.covercapy.com/treatments`
   - `isPartOf`: `{ "@type":"WebSite", "name":"CoverCapy", "url":"https://www.covercapy.com" }`
   - `about`: `{ "@type":"Thing", "name":"Dental treatment costs and PPO coverage" }`
2. `ItemList`
   - `numberOfItems`: number of treatments emitted
   - `itemListElement`: one `ListItem` per treatment, `{ position, url: SITE + href, name: treatmentName }`
3. `BreadcrumbList`
   - Home -> "Dental Treatments and Costs" (`/treatments`)

No `MedicalProcedure`/price schema here (this is an index, not a cost page); the individual
cost pages carry their own `FAQPage`/cost detail. `sameAs` arrays only. No em-dashes, no
roman numerals.

## 5. Data source (precise) — curated manifest, existence-gated
No Supabase. Define a `TREATMENTS` manifest in the generator. Each entry has a `slug`
(target page filename without `.html`), display `name`, a one-line `blurb`, and a `group`
(Cost guides / Procedures / Cosmetic / Urgent / Tools). At build time, ONLY entries whose
`{slug}.html` exists at repo root are rendered, so the index always matches what is actually
deployed. Targets are the footer's treatment links plus the existing estimator:

| slug | name | group | exists today |
|------|------|-------|--------------|
| `dental-implant-cost` | Dental implant cost | Cost guides | built by sibling agent |
| `dental-crown-cost` | Dental crown cost | Cost guides | built by sibling agent |
| `invisalign-cost` | Invisalign cost | Cost guides | built by sibling agent |
| `cosmetic-ppo-dentists` | Cosmetic dentistry | Cosmetic | built by sibling agent |
| `emergency-ppo-dentists` | Emergency dental care | Urgent | built by sibling agent |
| `dental-treatment-cost-estimator` | Treatment cost estimator | Tools | YES (on disk) |

Plus forward-looking procedure topics that will resolve when their pages ship (root canal,
teeth whitening, dentures, veneers, tooth extraction, dental cleaning, cavity filling,
wisdom teeth removal, braces). Because rendering is existence-gated, listing them now is
safe: they appear automatically once the page file lands, and are skipped until then. This
makes `/treatments.html` self-maintaining as the treatment-page library grows.

Confirm the live targets resolve without `.html` where the site uses extensionless routes;
the footer links use `.html`, so the manifest `href` is `'/' + slug + '.html'` to match the
footer and the actual files. (The canonical inside each treatment page may be extensionless;
that is the page's concern, not this index's.)

## 6. The `buildTreatmentsIndex()` function (add to the generator)

```javascript
/* ============================================================
   /treatments.html — index of treatment + cost landing pages.
   No Supabase. Curated manifest, existence-gated so it never
   links to a missing page. Reuses HEAD()/FOOT()/esc()/SITE/
   writePage() and the sitemap merge. Fail-safe.
   ============================================================ */

const TREATMENTS = [
  { slug: 'dental-implant-cost', name: 'Dental implant cost', group: 'Cost guides',
    blurb: 'Typical single-implant price ranges and how PPO coverage applies.' },
  { slug: 'dental-crown-cost', name: 'Dental crown cost', group: 'Cost guides',
    blurb: 'What a crown costs by material, and the share a PPO usually covers.' },
  { slug: 'invisalign-cost', name: 'Invisalign cost', group: 'Cost guides',
    blurb: 'Clear-aligner price ranges and how orthodontic PPO benefits work.' },
  { slug: 'dental-treatment-cost-estimator', name: 'Treatment cost estimator', group: 'Tools',
    blurb: 'Estimate the out-of-pocket cost of common treatments with a PPO.' },
  { slug: 'cosmetic-ppo-dentists', name: 'Cosmetic dentistry', group: 'Cosmetic',
    blurb: 'Veneers, bonding and smile work, and where PPO coverage stops.' },
  { slug: 'emergency-ppo-dentists', name: 'Emergency dental care', group: 'Urgent',
    blurb: 'Same-day pain, breaks and infections, and how to get seen fast.' },
  // Forward-looking topics: rendered only once their page ships.
  { slug: 'root-canal-cost', name: 'Root canal cost', group: 'Cost guides',
    blurb: 'Root canal price by tooth and the PPO share to expect.' },
  { slug: 'teeth-whitening-cost', name: 'Teeth whitening', group: 'Cosmetic',
    blurb: 'In-office vs at-home whitening and why PPOs rarely cover it.' },
  { slug: 'dentures-cost', name: 'Dentures cost', group: 'Cost guides',
    blurb: 'Full and partial denture price ranges and PPO major-service coverage.' },
  { slug: 'veneers-cost', name: 'Veneers cost', group: 'Cosmetic',
    blurb: 'Porcelain veneer pricing and what to expect from a PPO.' },
  { slug: 'tooth-extraction-cost', name: 'Tooth extraction cost', group: 'Procedures',
    blurb: 'Simple and surgical extraction pricing and coverage.' },
  { slug: 'dental-cleaning-cost', name: 'Dental cleaning cost', group: 'Procedures',
    blurb: 'Routine and deep cleaning costs and the PPO preventive benefit.' },
  { slug: 'cavity-filling-cost', name: 'Cavity filling cost', group: 'Procedures',
    blurb: 'Filling price by material and the PPO basic-service share.' },
  { slug: 'wisdom-teeth-removal-cost', name: 'Wisdom teeth removal', group: 'Procedures',
    blurb: 'Wisdom-tooth extraction pricing and oral-surgery coverage.' },
  { slug: 'braces-cost', name: 'Braces cost', group: 'Procedures',
    blurb: 'Traditional braces pricing and orthodontic PPO benefits.' }
];
const TREATMENT_GROUPS = ['Cost guides', 'Procedures', 'Cosmetic', 'Urgent', 'Tools'];

function buildTreatmentsIndex() {
  // Existence-gate against repo-root HTML files.
  const live = TREATMENTS.filter(t => {
    try { return fs.existsSync(path.join(process.cwd(), t.slug + '.html')); }
    catch (e) { return false; }
  });
  if (!live.length) { console.warn('[treatments] no treatment pages on disk, skipping'); return []; }

  const href = (t) => '/' + t.slug + '.html';

  // Cards grouped by section, groups in fixed order, only non-empty groups shown.
  const sections = TREATMENT_GROUPS.map(g => {
    const items = live.filter(t => t.group === g);
    if (!items.length) return '';
    const cards = items.map(t => `      <a class="tx-card" href="${href(t)}">
        <h3 class="tx-name">${esc(t.name)}</h3>
        <p class="tx-blurb">${esc(t.blurb)}</p>
        <span class="tx-go">View guide &rsaquo;</span>
      </a>`).join('\n');
    return `    <div class="tx-group">
      <h2 class="tx-gname">${esc(g)}</h2>
      <div class="tx-grid">
${cards}
      </div>
    </div>`;
  }).filter(Boolean).join('\n');

  // JSON-LD ItemList over the live treatments
  const itemList = live.map((t, i) => ({
    '@type': 'ListItem', position: i + 1, url: SITE + href(t), name: t.name
  }));
  const jsonld = JSON.stringify([
    { '@context': 'https://schema.org', '@type': 'CollectionPage',
      name: 'Dental Treatments and Costs', url: SITE + '/treatments',
      isPartOf: { '@type': 'WebSite', name: 'CoverCapy', url: SITE },
      about: { '@type': 'Thing', name: 'Dental treatment costs and PPO coverage' } },
    { '@context': 'https://schema.org', '@type': 'ItemList',
      numberOfItems: itemList.length, itemListElement: itemList },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Dental Treatments and Costs', item: SITE + '/treatments' }
    ] }
  ]);

  const title = 'Dental Treatments and Costs — PPO Coverage Guides | CoverCapy';
  const desc = 'Treatment-by-treatment cost guides for PPO dental patients. See typical price ranges for implants, crowns, Invisalign, cosmetic, emergency and more, and how PPO coverage and CoverCapy lower the bill.';
  const body = `
<div id="cc-nav-mount" data-include="/mega-nav.html"></div>
<main class="treatments-page">
  <nav class="crumb"><div class="wrap"><a href="/">Home</a> &rsaquo; <span>Treatments and Costs</span></div></nav>
  <header class="hero"><div class="wrap">
    <p class="eyebrow">Treatments and costs</p>
    <h1 class="title">Know the cost <em>before</em> the chair</h1>
    <p class="lede">Clear, sourced price ranges for the treatments people search for most, and exactly how a PPO and CoverCapy change what you pay. Pick a treatment to see the numbers.</p>
  </div></header>
  <section class="block"><div class="wrap">
${sections}
  </div></section>
  <section class="block"><div class="wrap cta-row">
    <a class="btn-primary" href="/find-my-dentist.html">Find my dentist</a>
    <a class="btn-ghost" href="/dental-treatment-cost-estimator.html">Estimate my treatment</a>
    <a class="btn-ghost" href="/compare-ppo-dental-plans">Compare PPO plans</a>
  </div></section>
</main>
<div id="cc-footer-mount" data-include="/footer.html"></div>
<style>
  .treatments-page .tx-group{margin-bottom:34px}
  .treatments-page .tx-gname{font-size:15px;color:var(--jade-deep);letter-spacing:.12em;text-transform:uppercase;margin:0 0 14px}
  .treatments-page .tx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
  .treatments-page .tx-card{display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);border-radius:14px;padding:18px 18px 16px;text-decoration:none;background:var(--bg);transition:border-color .18s,box-shadow .18s}
  .treatments-page .tx-card:hover{border-color:rgba(15,181,166,.45);box-shadow:var(--shadow)}
  .treatments-page .tx-name{font-size:18px;color:var(--ink);margin:0}
  .treatments-page .tx-blurb{font-size:13.5px;color:var(--muted);margin:0;line-height:1.5}
  .treatments-page .tx-go{font-size:12.5px;color:var(--jade-deep);font-weight:600;margin-top:auto}
  .treatments-page .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .treatments-page .btn-primary{background:var(--jade);color:var(--jade-ink);font-weight:600;padding:12px 18px;border-radius:999px;text-decoration:none}
  .treatments-page .btn-ghost{background:var(--panel);color:var(--ink);border:1px solid var(--line-strong);padding:12px 18px;border-radius:999px;text-decoration:none}
</style>
${FOOT}`;

  const html = HEAD(title, desc, SITE + '/treatments', jsonld) + body + '\n</body></html>';
  writePage('treatments.html', html);
  console.log('[treatments] wrote treatments.html with', live.length, 'treatment pages');
  return ['/treatments'].concat(live.map(t => href(t)));
}
```

### One-line call to add to the build sequence
Treatments needs no Supabase, so it can run independently of `genSpokes()` (run it even when
Supabase is down). Add it where the other index builders run, e.g. inside `genSpokes()`
before the sitemap merge, or in the final chain:

```javascript
  let treatmentUrls = [];
  try { treatmentUrls = buildTreatmentsIndex() || []; } catch (e) { console.warn('[treatments] skip:', e.message); }
  urls.push(...treatmentUrls);
```

To run it even when the Supabase steps fail, also acceptable to call it from `main()`'s
`.finally()` chain. It is synchronous and fail-safe.

### Sitemap entry
`/treatments` and each live `'/' + slug + '.html'` are pushed onto `urls`, flowing through
the existing `sitemap.xml` `<!-- CC_SPOKES -->` merge, deduped by `[...new Set(urls)]`.
(The individual treatment pages, being standalone HTML built by sibling agents, may also list
themselves; the dedupe handles overlap.)

## 7. SEO / GEO notes
- **Crawl depth + topical cluster**: this hub gathers all procedure and cost pages under one
  parent, signalling a coherent "dental treatment cost" topic cluster and pushing link equity
  from the footer into every cost guide.
- **Internal linking**: each card links to its cost/treatment page with the treatment name as
  anchor text (never "click here"). The cost pages should link back here ("see all treatment
  cost guides") and across to siblings (implant cost <-> crown cost <-> Invisalign cost),
  exactly as the BUILD-BRIEF internal-link map specifies. Cross-links to
  `/find-my-dentist.html`, `/dental-treatment-cost-estimator.html`, `/compare-ppo-dental-plans`.
- **GEO**: the `ItemList` of treatments is the structure AI engines pull for "how much does a
  {treatment} cost" and "what dental procedures does CoverCapy cover" answers. The blurbs are
  written as short extractable summaries.
- **Self-maintaining**: existence-gating means new cost pages join the index automatically on
  the next build with zero code change, so the treatment library and its hub stay in sync.
- **Keywords**: see `02-seo-geo.md`.

## 8. How to run (Mac only)
```bash
cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26"
node generate-plans.js        # or node seo-build/generate-plans.js if restored
git add -A && git commit -m "feat: add /treatments.html index" && git push
```
The treatments index itself needs no Supabase, but run from the Mac so the same build also
refreshes the Supabase-backed pages. Vercel auto-deploys in ~2 min.
