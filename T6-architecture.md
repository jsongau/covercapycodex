# T6 Dentist Profile Pages — Architecture
## CoverCapy | June 2026

---

## What T6 Is

T6 pages are **individual doctor profiles** — the person, not the practice. T5 pages are office/practice profiles. The distinction is critical:

- T5 = `Abri Dental Beverly Hills` (LocalBusiness, practice entity)
- T6 = `Dr. David Abri, DDS` (Person + Physician entity)

A doctor can practice at multiple T5 offices. A T5 office can have multiple T6 doctors. Many-to-many via `provider_offices` junction table.

---

## URL Architecture — Final Decision

### Use `/doctors/{state}/{doctor-slug}/`

**Canonical URL format:**
```
https://covercapy.com/doctors/california/david-abri/
https://covercapy.com/doctors/california/isaac-sun/
https://covercapy.com/doctors/texas/jane-chen/
```

**Why not `/dentists/`:**
The existing `/dentists/` tree already contains OFFICE pages (legacy, being 301'd to `/dental/` per the master audit). Do not add person pages to a directory being deprecated. The `/dentists/` tree gets redirected away; `/doctors/` is a clean, permanent namespace for person entities.

**Why not city-nested (`/doctors/california/beverly-hills/david-abri/`):**
Dr. Abri practices in Beverly Hills AND Burbank. There is no canonical single city for a doctor. State is the correct geo anchor because dental licensing is state-issued.

**Why not flat (`/doctors/david-abri/`):**
Loses all geo signal. Cannot have two "David Lee, DDS" in different states at the same URL.

**Why not under `/dental/` tree (`/dental/dentists/{slug}/`):**
The `/dental/` tree is market-organized (T3 through T5). Inserting a person entity as a child of a market hub breaks the entity hierarchy. Doctors are not children of markets.

### Slug Generation

Source: `provider_profiles.slug` column (canonical, set at creation).

Derivation formula:
```javascript
function providerSlug(doctorName) {
  return doctorName
    .replace(/^Dr\.?\s+/i, '')
    .replace(/,?\s+(DDS|DMD|MD|MS|PhD|FAGD|FICOI|FACP|FICD|FACD|ABOD|MSD)\b.*/i, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// "Dr. David Abri, DDS"  → "david-abri"
// "Dr. Isaac Sun DDS"    → "isaac-sun"
// "Afarin Anbarani, DDS" → "afarin-anbarani"
```

**Collision resolution** (two doctors named "David Lee" in California):
Append city of primary office: `david-lee-beverly-hills`. NEVER append `-2` (meaningless) or `-dds` (suffix in URL is spammy).

Supabase enforces: `UNIQUE(state, slug)` on `provider_profiles`.

---

## File Output

### Output directory
```
/doctors/{stSlug}/{docSlug}/index.html
```
Example:
```
/doctors/california/david-abri/index.html
/doctors/california/isaac-sun/index.html
```

### Served at
```
https://covercapy.com/doctors/california/david-abri/
```

### Vercel routing
Static `index.html` files in slug folders. No `vercel.json` changes needed for T6. Vercel's `cleanUrls: true` + trailing slash handling already covers this.

Add one redirect for the demo `?p=` parameter (used during prototyping):
```json
{
  "source": "/t6-preview",
  "destination": "/doctors/california/david-abri",
  "permanent": true
}
```

---

## Breadcrumb Structure

T6 breadcrumbs use 3 levels only. No city — the doctor is state-licensed, not city-assigned.

**Visible HTML:**
```
CoverCapy / California Dentists / Dr. David Abri, DDS
```

**JSON-LD BreadcrumbList:**
```json
{
  "@type": "BreadcrumbList",
  "@id": "https://covercapy.com/doctors/california/david-abri/#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "CoverCapy", "item": "https://covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "California Dentists", "item": "https://covercapy.com/doctors/california/" },
    { "@type": "ListItem", "position": 3, "name": "Dr. David Abri, DDS", "item": "https://covercapy.com/doctors/california/david-abri/" }
  ]
}
```

**Never build breadcrumbs from `seo_path`** — that column is stale. Always build from `provider.state` and `provider.slug`.

---

## Sitemap Strategy

Separate sitemap for T6 pages. Do NOT merge into `sitemap-dental.xml`.

**New file:** `/doctors/sitemap-doctors.xml`

**Sitemap entry format:**
```xml
<url>
  <loc>https://covercapy.com/doctors/california/david-abri/</loc>
  <lastmod>2026-06-26</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

Priority scale: T3 hubs = 0.9, T4 hubs = 0.8, T5 office pages = 0.7, T6 doctor pages = 0.7.

**Add to sitemap index** (create `/sitemap.xml` if not present):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://covercapy.com/dental/sitemap-dental.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://covercapy.com/doctors/sitemap-doctors.xml</loc>
  </sitemap>
</sitemapindex>
```

---

## State-Level Doctor Index Pages

**Critical for click depth.** Without these, T6 pages are 5+ clicks from homepage.

Create `/doctors/{state}/index.html` for each state that has published doctors.

Example: `https://covercapy.com/doctors/california/`

This page lists all published doctors in California with links to their T6 profiles. It is:
- 2 clicks from homepage (Home > California Doctors)
- The primary internal link entry point for T6 pages
- Comparable to how T3 state hubs anchor the T5 tree

Without the state index, Google deprioritizes the T6 pages (too deep). With it, every T6 page is 3 clicks from homepage: Home > [State] Doctors > Dr. Name.

---

## T5 to T6 Bidirectional Linking

### T5 → T6 (practice links to doctor)

Inject into `buildDentistPage()` in `generate-plans.js`. Two injection points:

**1. Hero subline** (currently shows plain `doctor_name` text):
```javascript
// Current:
${doctorName ? `<p class="hero-doctor">Led by ${esc(doctorName)}</p>` : ''}

// With T6 link (when provider slug exists):
const provSlug = providerSlugMap.get(d.slug); // built during T6 pass
const doctorLine = doctorName
  ? provSlug
    ? `<p class="hero-doctor">Led by <a href="${BASE_URL}/doctors/${stSlug}/${provSlug}/">${esc(doctorName)}</a></p>`
    : `<p class="hero-doctor">Led by ${esc(doctorName)}</p>`
  : '';
```

**2. About section prose** — the same link appears in the about paragraph.

**Schema link** (T5 adds to its Dentist/LocalBusiness node):
```json
"employee": {
  "@type": "Physician",
  "@id": "https://covercapy.com/doctors/california/david-abri/#person",
  "name": "Dr. David Abri, DDS"
}
```

### T6 → T5 (doctor links to practice)

Each T6 page shows office cards for all linked practices. Each card links to the T5 page:
```javascript
const t5Url = `${BASE_URL}/dental/${stSlug}/${mkSlug}/${cSlug}/${dSlug}/`;
```

Built from parts — NEVER from `seo_path`.

---

## Page Count and Indexability

**Current state:** ~271 dentists have `doctor_name` populated (4% of 7,042 offices). After NPI enrichment (see `T6-scraping-strategy.md`), estimated 4,000-4,500 doctor profiles can be created.

**Thin content rule:** Do NOT publish T6 pages that have only a name. Minimum viable T6 content to index:
- Doctor full name and credential
- At least 1 linked office (populated via `provider_offices`)
- Bio paragraph (even if generated from template)
- 3+ FAQs

Mark profiles with insufficient data as `is_published = false`. They generate no page. A doctor profile with only a name and no office link is worse than no page — it dilutes domain quality.

**Estimated published T6 pages at launch:** 500-800 (Platinum Elite + high-review offices first).

---

## Relationship to Existing URL Trees

```
covercapy.com/
├── dental/                     ← T3-T5 (practices, organized by geo)
│   ├── sitemap-dental.xml
│   ├── california/
│   │   ├── index.html          ← T3 state hub
│   │   ├── orange-county/
│   │   │   ├── index.html      ← T4a metro hub
│   │   │   └── fountain-valley/
│   │   │       ├── index.html  ← T4c city page
│   │   │       └── kyt-dental-services/
│   │   │           └── index.html  ← T5 office profile
│
├── doctors/                    ← T6 (individual doctors, organized by state)
│   ├── sitemap-doctors.xml
│   ├── california/
│   │   ├── index.html          ← State doctor index
│   │   ├── david-abri/
│   │   │   └── index.html      ← T6 doctor profile
│   │   └── isaac-sun/
│   │       └── index.html      ← T6 doctor profile
│
├── dentists/                   ← LEGACY — 301 redirect to /dental/ (per master audit)
│   └── [redirects only, no new pages]
│
└── sitemap.xml                 ← Sitemap index pointing to both sitemaps
```

---

## Multi-Doctor Practices on T5

When a T5 office has 2+ linked doctors in `provider_offices`, add a "Meet the Team" section to the T5 page. Insert between the About section and the FAQ accordion:

```html
<section class="module" id="team">
  <span class="eyebrow">The team</span>
  <h2>Dentists at [Practice Name]</h2>
  <div class="team-grid">
    <a href="/doctors/california/david-abri/" class="team-card">
      <div class="team-photo">[photo or monogram]</div>
      <div>
        <strong>Dr. David Abri, DDS</strong>
        <span>Cosmetic Dentistry, Implants</span>
      </div>
    </a>
  </div>
</section>
```

Only render this section when `teamDoctors.length > 1`. For solo practices, the hero subline link is sufficient.
