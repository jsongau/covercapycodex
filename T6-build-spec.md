# T6 Build Specification
## CoverCapy | June 2026

---

## Architecture Decision: Hybrid Static

T6 pages must be **statically generated** HTML files — same as T5. Never fully client-side rendered for production.

Pattern: Static HTML shell with `window.__BOOT__` data baked inline. A thin JS layer can refresh accreditation status on load (same pattern as T5's `refreshMembership()`). Core SEO content is in the HTML before any JS runs.

---

## Generator File

**Location:** `seo-build/generate-providers.js` (separate from `generate-plans.js`)

**Why separate file, not merged into generate-plans.js:**
- `generate-plans.js` is already ~3,500 lines — adding T6 pushes it to 5,000+
- T6 pulls from different tables (`provider_profiles`, `provider_offices`) with different schema
- T6 output goes to `/doctors/` not `/dental/` — different path builder
- T6 can run independently; a separate process makes the dependency explicit
- Gitignore already covers all of `seo-build/`

**Shared utilities** — extract to `seo-build/lib/`:
```
seo-build/
├── generate-plans.js          ← T3-T5 (unchanged)
├── generate-providers.js      ← T6 (new)
└── lib/
    ├── slugify.js             ← slugify(), stateSlug(), esc() — shared
    ├── supabase.js            ← fetchAllRows(), api creds — shared
    └── page-shell.js          ← pageShell() wrapper — shared
```

Both generators require the same `slugify()` and `stateSlug()` functions. Shared lib eliminates drift between the two.

**CRITICAL: `seo-build/` is gitignored.** `generate-providers.js` and `lib/` are never committed. Only `/doctors/` output goes to git, same pattern as `/dental/`.

---

## CLI Usage

```bash
# From repo root (always — never cd into seo-build first):
cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26"

# T6 only — doctor profiles:
node seo-build/generate-providers.js

# T6 with incremental skip (uses build manifest):
node seo-build/generate-providers.js --incremental

# T6 force rebuild (ignores manifest):
node seo-build/generate-providers.js --force

# T6 single profile (for testing/spot updates):
node seo-build/generate-providers.js --slug david-abri

# Full deploy workflow:
node seo-build/generate-providers.js
git add -A
git commit -m "feat: T6 — [description]"
git push
# Vercel auto-deploys in ~2 min
```

---

## Supabase Query Plan — 3 Queries, No N+1

```javascript
async function fetchAllProviders() {
  return fetchAllRows(
    SUPA_URL + '/rest/v1/provider_profiles'
    + '?is_published=eq.true'
    + '&select=slug,name,honorific_suffix,degree,dental_school,grad_year,'
    + 'specialties,bio,custom_bio_long,npi,photo_url,license_state,'
    + 'license_number,license_verified,license_verified_at,languages,'
    + 'sameas,ada_member,board_certifications,review_quote,'
    + 'custom_seo_title,custom_meta_description,updated_at'
    + '&order=name.asc',
    HEADERS
  );
}

async function fetchProviderOfficeLinks() {
  return fetchAllRows(
    SUPA_URL + '/rest/v1/provider_offices'
    + '?select=provider_slug,office_slug,is_primary,sort_order'
    + '&order=provider_slug.asc,sort_order.asc,is_primary.desc',
    HEADERS
  );
}

async function fetchDentistsForT6(officeSlugs) {
  const unique = [...new Set(officeSlugs)];
  const CHUNK = 200;
  const all = [];
  for (let i = 0; i < unique.length; i += CHUNK) {
    const chunk = unique.slice(i, i + CHUNK);
    const rows = await fetchAllRows(
      SUPA_URL + '/rest/v1/dentists'
      + '?select=name,slug,city,state,market_area,seo_area,address,phone,'
      + 'website,insurance_networks,procedures,weighted_rating,'
      + 'google_review_count,membership_tier,latitude,longitude'
      + '&slug=in.(' + chunk.map(encodeURIComponent).join(',') + ')',
      HEADERS
    );
    all.push(...rows);
  }
  return all;
}
```

---

## `buildProviderPage(prov, offices)` — Static Baking Requirements

### What MUST be in the static HTML (before JS runs)

| Element | Required content |
|---------|-----------------|
| `<title>` | `Dr. {Name}, {Cred} | {Specialty} {Primary City} {State Abbr} | CoverCapy` |
| `<meta name="description">` | Personalized: specialty, practice names, cities, top 2 carriers |
| `<link rel="canonical">` | `https://covercapy.com/doctors/{stSlug}/{docSlug}/` |
| `<meta property="og:title">` | Same as title |
| `<meta property="og:description">` | Same as meta description |
| `<meta property="og:url">` | Same as canonical |
| `<meta property="og:image">` | `prov.photo_url` or default OG image |
| `<meta name="geo.region">` | `US-CA` (state of licensure) |
| JSON-LD Block 1 | `@graph`: WebPage, BreadcrumbList, Person+Physician |
| JSON-LD Block 2 | FAQPage (3-10 questions with baked answers) |
| `<h1>` | Doctor name with credential — visible in static HTML |
| Breadcrumb nav | Visible HTML matching JSON-LD breadcrumb |
| Bio paragraph | At least the `bio` field content in static HTML |
| Office links | Text links to each linked T5 page |
| `window.__BOOT__` | Full data object for thin JS layer |

---

## `window.__BOOT__` Data Format

```javascript
window.__BOOT__ = {
  tier: 'T6',
  provider: {
    slug:            'david-abri',
    name:            'Dr. David Abri, DDS',
    honorificSuffix: 'DDS',
    degree:          'Doctor of Dental Surgery (DDS)',
    npi:             '1234567890',
    licenseNumber:   'DN12345',
    licenseState:    'California',
    licenseVerified: true,
    licenseVerifiedAt: '2026-06-15',
    specialties:     ['Cosmetic Dentistry', 'Implants', 'Invisalign', 'TMJ Treatment'],
    bio:             'Dr. David Abri is a cosmetic and general dentist...',
    customBioLong:   null,           // populated when claimed
    photoUrl:        'https://[cdn]/providers/david-abri/photo.webp',
    languages:       ['English', 'Spanish', 'Russian'],
    adaMember:       false,
    boardCerts:      [],
    reviewQuote:     null,
    updatedAt:       '2026-06-26T00:00:00Z',
  },
  offices: [
    {
      slug:          'abri-dental-beverly-hills',
      name:          'Abri Dental Beverly Hills',
      city:          'Beverly Hills',
      state:         'California',
      stSlug:        'california',
      mkSlug:        'los-angeles',
      address:       '50 N La Cienega Blvd #217, Beverly Hills, CA 90211',
      phone:         '(310) 275-0032',
      phoneTel:      'tel:+13102750032',
      website:       'https://abridental.com',           // UTM stripped
      lat:           34.0669,
      lon:          -118.3759,
      isPrimary:     true,
      carriers:      ['Aetna', 'Anthem Blue Cross'],
      procedures:    ['TMJ Treatment', 'Implants', 'Invisalign'],
      rating:        4.9,
      reviewCount:   74,
      membershipTier: 'platinum_elite',
      t5Url:         'https://covercapy.com/dental/california/los-angeles/beverly-hills/abri-dental-beverly-hills/',
    }
    // additional offices...
  ],
  supabaseUrl:  'https://hfvbeqlefwwjlrbyxpbj.supabase.co',
  supabaseKey:  '[anon key only — never service key]',
  baseUrl:      'https://covercapy.com',
};
```

---

## File I/O

```javascript
function writeProviderPage(prov, offices) {
  const stSlug  = stateSlug(prov.license_state);
  const docSlug = prov.slug;
  const dir     = path.join(OUT_DIR, 'doctors', stSlug, docSlug);
  const html    = buildProviderPage(prov, offices);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}
```

Output: `/doctors/california/david-abri/index.html`
Served at: `https://covercapy.com/doctors/california/david-abri/`

---

## T5 ↔ T6 Cross-Linking at Build Time

The `generate-providers.js` run produces a side effect: a map from office slug → provider slug. This map is written to a JSON file that `generate-plans.js` reads during the T5 build.

**From `generate-providers.js`:**
```javascript
// After building all T6 pages, write the cross-link map:
const crossLinkMap = {};
for (const prov of providers) {
  const officeSlugs = providerToSlugs.get(prov.slug) || [];
  for (const oSlug of officeSlugs) {
    crossLinkMap[oSlug] = {
      provSlug: prov.slug,
      provName: prov.name,
      stSlug:   stateSlug(prov.license_state),
    };
  }
}
fs.writeFileSync(
  path.join(OUT_DIR, 'doctors', '.cross-links.json'),
  JSON.stringify(crossLinkMap, null, 2)
);
```

**From `generate-plans.js` T5 build:**
```javascript
let crossLinks = {};
try {
  crossLinks = JSON.parse(
    fs.readFileSync(path.join(OUT_DIR, 'doctors', '.cross-links.json'), 'utf8')
  );
} catch {}

// Inside buildDentistPage():
const provData = crossLinks[d.slug];
const doctorLine = d.doctor_name
  ? provData
    ? `Led by <a href="${BASE_URL}/doctors/${provData.stSlug}/${provData.provSlug}/">${esc(d.doctor_name)}</a>`
    : `Led by ${esc(d.doctor_name)}`
  : '';
```

**Run order:** Always run `generate-providers.js` BEFORE `generate-plans.js` so the cross-link map exists when T5 pages are built.

---

## Sitemap Generation

At end of `generate-providers.js` run, write two files:

```javascript
// 1. T6 sitemap
const today = new Date().toISOString().split('T')[0];
const urls  = publishedProviders.map(prov => {
  const stSlug = stateSlug(prov.license_state);
  return `  <url>\n    <loc>${BASE_URL}/doctors/${stSlug}/${prov.slug}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
}).join('\n');

fs.writeFileSync(
  path.join(OUT_DIR, 'doctors', 'sitemap-doctors.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
);

// 2. State indexes sitemap entries (one URL per state that has doctors)
// Include /doctors/california/, /doctors/texas/, etc. in the sitemap
const stateUrls = [...statesWithDoctors].map(stSlug =>
  `  <url>\n    <loc>${BASE_URL}/doctors/${stSlug}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
).join('\n');
```

---

## Incremental Build — Build Manifest

Tracks `updated_at` timestamps to skip unchanged profiles:

```javascript
function loadManifest() {
  const p = path.join(OUT_DIR, 'doctors', '.build-manifest.json');
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch { return {}; }
}

function saveManifest(manifest) {
  fs.writeFileSync(
    path.join(OUT_DIR, 'doctors', '.build-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

// In main loop:
const manifest = FORCE ? {} : loadManifest();
let written = 0, skipped = 0;

for (const prov of providers) {
  if (!FORCE && manifest[prov.slug] === prov.updated_at) {
    skipped++;
    continue;
  }
  writeProviderPage(prov, officesByProvider.get(prov.slug) || []);
  manifest[prov.slug] = prov.updated_at;
  written++;
}

saveManifest(manifest);
console.log(`[T6] ${written} written, ${skipped} skipped`);
```

**Limitation:** Manifest tracks `provider_profiles.updated_at` only. If a linked office's data changes (new carrier, phone update), the T6 page won't auto-rebuild. Workaround: run with `--force` after bulk `dentists` table imports.

---

## Build Time Estimates

| Task | Pages | Estimated Time |
|------|-------|----------------|
| T6 provider pages (first run) | ~800 | ~45 seconds |
| T6 provider pages (first run, full 5,776) | ~5,776 | ~5 minutes |
| T6 incremental (few changes) | 10-50 | ~3 seconds |
| T5 dentist pages | 5,776 | ~4 minutes |
| T3/T4 hub pages | ~200 | ~30 seconds |
| **Full build (T5 + T6 + hubs)** | ~12,000 | **~10 minutes** |

---

## Output Structure (Complete)

```
/                                   ← repo root
├── doctors/                        ← T6 output (committed to git)
│   ├── .build-manifest.json        ← build tracker (committed)
│   ├── .cross-links.json           ← T6→T5 map (committed)
│   ├── sitemap-doctors.xml         ← committed
│   ├── california/
│   │   ├── index.html              ← state doctor index
│   │   ├── david-abri/
│   │   │   └── index.html          ← T6 profile
│   │   └── isaac-sun/
│   │       └── index.html          ← T6 profile
│   └── texas/
│       ├── index.html
│       └── jane-chen/
│           └── index.html
├── dental/                         ← T3-T5 output (unchanged)
│   └── sitemap-dental.xml
├── sitemap.xml                     ← Sitemap index (add manually)
└── seo-build/                      ← GITIGNORED
    ├── generate-plans.js
    ├── generate-providers.js
    └── lib/
        ├── slugify.js
        ├── supabase.js
        └── page-shell.js
```

---

## Vercel Deployment Notes

T6 pages are static HTML. No additional `vercel.json` config needed. Vercel's existing `cleanUrls: true` serves `/doctors/california/david-abri/index.html` at the clean URL automatically.

Add to `vercel.json` (one-time):
```json
{
  "redirects": [
    {
      "source": "/dentists/:slug*",
      "destination": "/dental/:slug*",
      "permanent": true
    }
  ]
}
```

This handles the legacy `/dentists/` tree migration. Does not affect new `/doctors/` pages.

**File count concern:** Vercel Pro limit is 10,000 files per deployment. With ~11,396 existing `/dental/` files plus new `/doctors/` files, check current count at `vercel.com/dashboard`. If near limit, upgrade to Enterprise or batch deploys incrementally by state.
