# T6 Doctor Enrichment Strategy — NPI + Scraping
## CoverCapy | June 2026

---

## The Core Problem

Only 271 of 7,042 dental offices (3.8%) have `doctor_name` populated in Supabase. T6 pages require: full name, credential (DDS/DMD), NPI, specialty, photo, and bio. This data must be sourced from:

1. NPPES NPI Registry (free government API — primary source)
2. Practice website scraping (supplemental — photo, bio, education)
3. Self-service claiming (dentist fills in own profile)

Run these in order. NPI first. Scraping second. Self-service ongoing.

---

## Phase 1 — NPI Registry Lookup (Do First)

### Why NPI is the right starting point

- Free, no API key, no rate limit concerns at this scale
- Government source — zero legal risk
- Returns: full name, credential, specialty taxonomy, license number, state, address
- Covers ~85% of licensed dentists in the US
- Cross-references to entity disambiguation in Google Knowledge Panels
- NPI on-page is the single highest GEO/AEO signal for medical professional pages

### NPPES API v2

```
GET https://npiregistry.cms.hhs.gov/api/?version=2.1
  &telephone_number={digits}
  &taxonomy_description=Dentist
  &limit=50
```

**What it returns per dentist:**
```json
{
  "number": "1234567890",
  "basic": {
    "first_name": "David",
    "last_name": "Abri",
    "credential": "DDS",
    "gender": "M",
    "status": "A",
    "enumeration_date": "2004-03-15"
  },
  "addresses": [
    {
      "address_purpose": "LOCATION",
      "address_1": "50 N La Cienega Blvd",
      "city": "Beverly Hills",
      "state": "CA",
      "postal_code": "90211",
      "telephone_number": "310-275-0032"
    }
  ],
  "taxonomies": [
    {
      "code": "1223G0001X",
      "desc": "General Practice",
      "primary": true,
      "state": "CA",
      "license": "DN12345"
    }
  ]
}
```

### Match Strategy (2-pass)

**Pass 1: Phone match (highest confidence ~80 points)**
```
GET /api/?version=2.1&telephone_number={phone_digits}&taxonomy_description=Dentist&limit=50
```
Strips non-digits from `dentists.phone`. If result returns a dentist with address in the same city — match.

**Pass 2: City + State + address fuzzy match (~50 points)**
```
GET /api/?version=2.1&city={city}&state={stateAbbr}&taxonomy_description=Dentist&limit=200
```
Filter results where first 15 chars of `address_1` match the Supabase `d.address` (lowercased, alphanumeric only).

**No match**: log to `unmatched.csv` for human review. Do not create a profile.

**Multiple matches** (multi-doctor practice): create a profile row for EACH matched NPI, all linked to the same office via `provider_offices`. This is the desired behavior — a practice with 3 dentists gets 3 T6 pages.

### Enrichment Script: `seo-build/enrich-npi.js`

```javascript
// Run: SUPABASE_SERVICE_KEY=xxx node seo-build/enrich-npi.js
// From repo root — same constraint as generate-plans.js

const SUPABASE_URL = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const NPI_API     = 'https://npiregistry.cms.hhs.gov/api/';
const STATE_ABBR  = {
  'California': 'CA', 'Texas': 'TX', 'Florida': 'FL', 'New York': 'NY',
  'Illinois': 'IL', 'Arizona': 'AZ', 'Nevada': 'NV', 'Washington': 'WA',
  // ... full 50-state map
};

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function providerSlug(first, last, stateAbbr, existingSlugs) {
  const base = `${slugify(first)}-${slugify(last)}`;
  if (!existingSlugs.has(base + '-' + stateAbbr)) return base;
  return `${base}-${slugify(/* primary city */ '')}`;
}

async function queryNPI(phone, city, stateAbbr, address) {
  // Pass 1: Phone
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    const r = await fetch(`${NPI_API}?version=2.1&telephone_number=${digits}&taxonomy_description=Dentist&limit=50`);
    const d = await r.json();
    if (d.results?.length) return { results: d.results, method: 'phone', confidence: 80 };
  }
  await new Promise(r => setTimeout(r, 100));
  // Pass 2: City + address
  const r = await fetch(`${NPI_API}?version=2.1&city=${encodeURIComponent(city)}&state=${stateAbbr}&taxonomy_description=Dentist&limit=200`);
  const d = await r.json();
  if (!d.results?.length) return null;
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const addrKey = norm(address).slice(0, 15);
  const matched = d.results.filter(n => norm(n.addresses?.[0]?.address_1 || '').slice(0, 15) === addrKey);
  return matched.length ? { results: matched, method: 'address', confidence: 50 } : null;
}

async function upsertProvider(officeId, npiResult, confidence) {
  const { basic, addresses, taxonomies, number: npi } = npiResult;
  const primary = taxonomies?.find(t => t.primary) || taxonomies?.[0];
  const slug = `${slugify(basic.first_name)}-${slugify(basic.last_name)}`;

  const row = {
    slug,
    name: `${basic.first_name} ${basic.last_name}${basic.credential ? ', ' + basic.credential : ''}`,
    honorific_suffix: basic.credential || null,
    npi,
    license_state:   primary?.state || null,
    license_number:  primary?.license || null,
    specialties:     primary ? [primary.desc] : [],
    gender:          basic.gender === 'M' ? 'male' : basic.gender === 'F' ? 'female' : null,
    is_published:    false,          // always false until reviewed
    claim_status:   'unclaimed',
    created_at:     new Date().toISOString(),
    updated_at:     new Date().toISOString(),
  };

  // Upsert provider profile
  await fetch(`${SUPABASE_URL}/rest/v1/provider_profiles`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(row),
  });

  // Link to office
  await fetch(`${SUPABASE_URL}/rest/v1/provider_offices`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({
      provider_slug: slug,
      office_slug:   officeId,
      is_primary:    true,
      sort_order:    0,
    }),
  });
}

async function main() {
  // Fetch all offices from Supabase
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/dentists?select=id,slug,name,city,state,address,phone&limit=10000`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const offices = await res.json();
  console.log(`Processing ${offices.length} offices...`);

  let matched = 0, unmatched = 0;
  const unmatchedLog = [];

  for (const office of offices) {
    const stateAbbr = STATE_ABBR[office.state];
    if (!stateAbbr) continue;

    try {
      const npiData = await queryNPI(office.phone, office.city, stateAbbr, office.address);

      if (!npiData) {
        unmatchedLog.push(`${office.name},${office.city},${office.state}`);
        unmatched++;
        continue;
      }

      for (const result of npiData.results) {
        if (result.basic.status !== 'A') continue; // skip deactivated
        await upsertProvider(office.slug, result, npiData.confidence);
      }
      matched++;
      await new Promise(r => setTimeout(r, 50)); // 20 req/sec
      if (matched % 100 === 0) console.log(`${matched} matched, ${unmatched} unmatched`);
    } catch (e) {
      console.error(`ERROR: ${office.name}:`, e.message);
    }
  }

  require('fs').writeFileSync('seo-build/npi-unmatched.csv', unmatchedLog.join('\n'));
  console.log(`\nDone: ${matched} matched | ${unmatched} unmatched`);
  console.log(`Unmatched saved to seo-build/npi-unmatched.csv`);
}

main();
```

**Expected results:**
- Phone match success rate: ~65% of offices (many have consistent phone in NPPES)
- Address match fallback: catches another ~10-15%
- Total expected NPI matches: ~75% of 7,042 = ~5,280 profiles created
- Runtime: ~40 minutes at 20 req/sec (NPPES has no published limit; stay under 20)

---

## Phase 2 — Website Scraping (Photo + Bio)

Run after Phase 1. Use the doctor's name from NPPES as the photo-matching anchor (much more accurate than scraping blind).

### Legal/ToS

**Risk: low for independent practices. Medium for DSO chains.**

- `hiQ v. LinkedIn (9th Cir. 2022)`: scraping publicly accessible data does not violate CFAA. Public "About" pages without login walls are fair game.
- CoverCapy is not reselling the data. It is building a directory that links back to and promotes the practice — same as Healthgrades, Zocdoc, WebMD.
- Honor `robots.txt Disallow: /about` (rare but check).
- Use a polite User-Agent: `CoverCapyBot/1.0 (+https://covercapy.com/bot-policy)`
- Skip DSO chains (Aspen Dental, Heartland, Pacific Dental, Smile Brands) — they have legal teams and will send C&D.
- Honor removal requests immediately.

### What to Extract

From practice `/about` or `/team` page:
- Doctor headshot (img tag nearest to the doctor's name in DOM)
- Bio paragraph (p tag near name)
- Dental school mention (text near "attended", "graduated", "alma mater")
- Languages mentioned (text near "speaks", "fluent")
- Any certifications mentioned

### Photo Quality Rules

**Accept:** width > 100px, aspect ratio between 0.7:1 and 1.4:1, `alt` text does not contain "logo" or "icon", not an SVG
**Reject:** width < 80px, contains "logo"/"icon"/"banner" in alt, aspect ratio > 2:1 (banner), SVG

Save to Supabase Storage: `provider-photos/providers/{slug}/photo.webp`
Resize to 400x400 (square crop, center-weighted) using `sharp`.

### Scraping Script Outline: `seo-build/scrape-photos.js`

```javascript
// Run: node seo-build/scrape-photos.js
// Only scrapes offices where NPI match already exists

const cheerio = require('cheerio');
const sharp   = require('sharp');

const ABOUT_PATHS = ['/about', '/our-team', '/meet-the-team', '/our-dentists',
                     '/about-us', '/team', '/staff', '/our-doctors', '/meet-us'];

async function findAboutPage(website) {
  for (const p of ABOUT_PATHS) {
    try {
      const res = await fetch(website + p, { signal: AbortSignal.timeout(6000) });
      if (res.ok && res.headers.get('content-type')?.includes('html')) {
        const html = await res.text();
        if (html.length > 2000) return { html, url: website + p };
      }
    } catch {}
  }
  return null;
}

function extractPhoto($, doctorName) {
  const lastName = doctorName.split(' ').pop().toLowerCase();
  // Find element containing the doctor's last name
  const nameEl = $('*').filter((_, el) => $(el).text().toLowerCase().includes(lastName)).first();
  if (!nameEl.length) return null;
  // Look for img within 3 parent levels
  let parent = nameEl;
  for (let i = 0; i < 3; i++) {
    parent = parent.parent();
    const img = parent.find('img').first();
    const src = img.attr('src') || img.attr('data-src');
    if (src && !/(logo|icon|banner|bg)/i.test(img.attr('alt') || '')) {
      return src.startsWith('http') ? src : null; // skip relative URLs for now
    }
  }
  return null;
}

// Main: for each provider with NPI but no photo_url, attempt scrape
```

### Expected Coverage

- Offices with accessible `/about` page: ~70%
- Photo successfully extracted near doctor name: ~60% of those
- Net photo coverage after scraping: ~42% of total offices
- Combined with claimed profiles: target 60% with photos at launch

---

## Phase 3 — Self-Service Claiming (Ongoing)

When a dentist finds their T6 profile and wants to update it:

1. "Claim this profile →" button visible on unclaimed T6 pages
2. Dentist verifies email + provides license number
3. CoverCapy cross-references state board (manual or automated)
4. `claim_status` updated to 'claimed', `is_published` set to true
5. Dentist gets dashboard to update: photo, bio, languages, accepting new patients, booking link

Incentive for claiming: full profile = higher ranking in CoverCapy search + "License Verified" badge.

---

## Priority Queue — Which Offices to Enrich First

| Priority | Segment | Rationale |
|----------|---------|-----------|
| 1 | Platinum Elite offices | Paying customers. Full T6 treatment: NPI + scrape + manual QA. |
| 2 | Capy Accredited offices | Also paying. Same treatment. |
| 3 | High-review offices (weighted_rating ≥ 4.5 AND review_count ≥ 50) | ~800-1,200 offices. These pages rank. Higher traffic = higher T6 value. |
| 4 | California, full state | Largest market. OC + LA already have infrastructure. |
| 5 | Major metro markets | LA, NYC, Chicago, Houston, Phoenix, Dallas. High dental SEO competition. |
| 6 | Remaining | NPI pass already ran for all. Scrape in batches. |

**At launch, aim to publish 500-800 T6 pages** (Platinum Elite + high-review offices). Scale from there after validating quality.

---

## Validation Pipeline

Before setting `is_published = true`, a profile must pass:

```javascript
function shouldPublish(prov, offices) {
  if (!prov.name || !prov.slug) return false;
  if (offices.length === 0) return false;                    // must link to at least 1 office
  if (!prov.npi && !prov.license_number) return false;      // must have at least 1 verifiable identifier
  const bio = prov.custom_bio_long || prov.bio || '';
  if (bio.length < 100) return false;                       // bio must be at least 100 chars
  return true;
}
```

Profiles that don't pass `shouldPublish()` are generated locally (so you can preview them) but get `<meta name="robots" content="noindex">` until they qualify.

---

## Supabase Doctor Profiles Table vs. Dentists Table

The `dentist_profiles` table (referenced by some agents) is equivalent to `provider_profiles` — use `provider_profiles`, which already exists. Do not create a duplicate table.

For multi-doctor practices where NPPES returns 3+ dentists at one address: each gets a row in `provider_profiles` and a row in `provider_offices` linking them to the same office slug. The T5 page will show a "Meet the Team" section when 2+ profiles exist for one office.

---

## Runtime Requirements

All scripts must run from Mac Terminal (not Linux sandbox):
- Supabase service key required
- NPPES API accessible
- `sharp` module for image processing: `npm install sharp --save-dev`
- `cheerio` for HTML parsing: `npm install cheerio --save-dev`

These are dev dependencies in `seo-build/package.json` (gitignored — never committed).
