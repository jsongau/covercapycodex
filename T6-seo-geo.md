# T6 SEO & GEO Optimization Strategy
## CoverCapy | June 2026

---

## SEO Audit — Current T6 Template Issues

### CRITICAL

**1. Client-side rendering — 2-pass crawl delay**
The current T6 template is 100% JavaScript-rendered. Google crawls static HTML first, then schedules a second pass for JS rendering. On a 5,776-page site, the second pass can take weeks. Every SEO element — title, H1, schema, bio — is invisible to Googlebot on first crawl.

Fix: Static generation with `window.__BOOT__` baked in. Every SEO element in the HTML before any JS runs. See `T6-build-spec.md`.

**2. No canonical tag**
The current template has no `<link rel="canonical">`. With the demo URL pattern `?p=david-abri`, Google sees the same content at multiple URLs.

Fix: Static canonical baked at generation time:
```html
<link rel="canonical" href="https://covercapy.com/doctors/california/david-abri/" />
```

**3. Title tag set client-side**
`document.title = PROV.name + ', Dentist | CoverCapy'` runs in JS. Googlebot sees a blank or generic title on first crawl. No city, no specialty.

Fix: Bake the optimized title into `<head>` at generation:
```
Dr. David Abri, DDS | Cosmetic Dentist Beverly Hills CA | CoverCapy
```

Formula:
```
Dr. {Full Name}, {Credential} | {Primary Specialty} {Primary City} {State Abbr} | CoverCapy
```
Keep under 60 characters. City before state abbreviation (not "Beverly Hills, CA" — use "Beverly Hills CA" to save a char).

**4. Generic baked meta description**
Current: "CoverCapy dentist profile, check whether the office works with your PPO, see credentials, verify the license, and book."
Zero personalization. Same for every profile.

Fix: Personalized meta at build time:
```
Dr. {Last} practices cosmetic dentistry and implants at Abri Dental in Beverly Hills and Burbank, CA. Accepts Aetna PPO and Anthem Blue Cross. Verify your coverage free.
```
Formula: specialty + practice name + cities + top 2 carriers + PPO verification CTA. Under 155 characters.

**5. Schema injected client-side**
`injectSchema()` runs JS and appends a `<script>` tag to `<head>` at runtime. Googlebot may or may not execute this. FAQPage and BreadcrumbList schema — which drive rich snippet eligibility — are invisible on first crawl.

Fix: Bake all JSON-LD into `<head>` as static `<script type="application/ld+json">` at generation.

---

### HIGH

**6. H1 generated client-side**
`renderHero()` writes the H1 via innerHTML. No H1 exists in the static HTML.

Fix: Bake H1 into the static body:
```html
<h1 class="id-name">Dr. David <em>Abri</em>, DDS</h1>
```
Retain the Fraunces italic-last-name style — just put it in static HTML.

**7. Breadcrumb built from stale `seo_path`**
`renderCrumb()` uses `seg(o.seo_path)` to build the breadcrumb. `seo_path` contains stale `/dentists/` prefixed paths and is completely wrong for a person page.

Fix: Breadcrumb built from provider data only:
```javascript
const stSlug = stateSlug(prov.license_state);
const breadcrumb = `
  <a href="/">CoverCapy</a>
  <span>/</span>
  <a href="${BASE_URL}/doctors/${stSlug}/">California Dentists</a>
  <span>/</span>
  <b>${esc(prov.name)}</b>
`;
```

**8. No T5 → T6 backlinks**
T6 pages currently receive no inbound links from anywhere in the existing 6,400-page T5/hub structure. They have no PageRank.

Fix: T5 `buildDentistPage()` injects a linked doctor name in hero subline and about prose pointing to the T6 URL. Every T5 page that has a linked doctor profile becomes an inbound link to that T6 page. See `T6-architecture.md`.

**9. `@id` URL is wrong in current schema**
Current: `const pid = ORIGIN + '/dentist/' + seg(prim.seo_path).slice(1).join('/') + '/';`
This builds a broken URL from the stale `seo_path`. For Dr. Abri it would produce:
`https://www.covercapy.com/dentist/california/los-angeles/beverly-hills/abri-dental-beverly-hills/`
which is (a) the wrong path and (b) uses singular `/dentist/` not `/doctors/`.

Fix: `@id` must be the canonical T6 URL:
```javascript
const canonical = `${BASE_URL}/doctors/${stSlug}/${provSlug}/`;
const personId  = `${canonical}#person`;
```

---

### MEDIUM

**10. No `image` property in schema**
Google's Knowledge Panel creation requires a photo URL in the Person schema. Currently absent.

Fix: Add to Person node: `"image": prov.photo_url || null` (omit field if null, never use a placeholder URL).

**11. Missing `openingHoursSpecification`**
Office hours are stored in `hours_note` as freeform text. Schema.org `OpeningHoursSpecification` is structured data.

Fix: Parse `hours_note` at generation and emit structured hours if parseable. Flag for manual entry when unparseable.

**12. Thin content risk at scale**
5,776 T6 pages where most have only a name and one line of data = index bloat and domain quality damage.

Fix: Gate indexability with `is_published = false` until minimum content threshold met:
- Doctor name and credential ✓
- At least 1 linked office ✓
- Bio paragraph (100+ words) ✓
- 3+ FAQs ✓
- NPI verified OR license verified ✓

---

## Title Tag Formulas by Scenario

| Scenario | Title |
|----------|-------|
| Solo, 1 office, known specialty | `Dr. Isaac Sun, DDS | General Dentist Fountain Valley CA | CoverCapy` |
| Multi-office, cosmetic focus | `Dr. David Abri, DDS | Cosmetic Dentist Beverly Hills & Burbank CA | CoverCapy` |
| No specialty data | `Dr. Jane Lee, DMD | PPO Dentist San Diego CA | CoverCapy` |
| General with languages | `Dr. Ana Torres, DDS | Dentista Beverly Hills CA | CoverCapy` (for bilingual) |

Max 60 characters. Truncate city if needed. Never truncate the doctor's name.

---

## GEO / AEO Optimization

**GEO readiness of current T6 template: 4.5 / 10.**

GEO = how well a page is cited by AI search engines (Perplexity, ChatGPT Search, Google AI Overviews, Gemini). AI engines cite pages that have verifiable, specific, unique facts not available elsewhere.

### Top GEO Gaps and Fixes

**1. NPI on-page — highest single impact**
The NPI (National Provider Identifier) is the most cross-referenced data point in healthcare. When a T6 page states a specific NPI that matches the NPPES registry, AI engines can close an entity loop: page → NPI → NPPES → confirmed same person. Without NPI, the engine relies on fuzzy string matching.

Display format:
```html
<div class="lic-badge">
  <span>NPI: 1234567890</span>
  <a href="https://npiregistry.cms.hhs.gov/provider-view/1234567890" target="_blank">Verify on NPPES</a>
</div>
```

Schema format:
```json
"identifier": [
  { "@type": "PropertyValue", "name": "NPI", "value": "1234567890" },
  { "@type": "PropertyValue", "name": "California Dental License", "value": "DN12345" }
]
```

**2. License number on-page**
State license number is a government-verifiable fact unique to this doctor. Same principle as NPI — AI engines treat it as a primary source confirmation.

**3. Bio — minimum 300 words for GEO**
The current bio is 2 sentences (47 words). AI engines pull from the first substantial prose block on the page. A 300-word bio with structured facts (school, year, specialties, languages, cities served) dramatically increases citation probability.

See `T6-content-spec.md` for bio template.

**4. FAQ expansion — 10 questions minimum**
Current: 4 generic FAQs. For GEO, the FAQs must answer questions real patients type into AI search engines. Structure: question matches the actual search query, answer is 2-4 sentences with specific facts.

High-value questions for dentist profiles:
- "Who is Dr. [Name]?"
- "Does Dr. [Name] accept [Carrier] insurance?"
- "Where did Dr. [Name] go to dental school?"
- "Does Dr. [Name] speak Spanish?" (when applicable)
- "Is Dr. [Name] accepting new patients?"
- "What does Dr. [Name] specialize in?"
- "What is Dr. [Name]'s NPI number?"
- "How do I verify my PPO insurance at [Practice]?"
- "Does Dr. [Name] do dental implants / Invisalign / TMJ?"
- "How long has Dr. [Name] been practicing?"

**5. Multilingual content for Spanish-speaking doctors**
For doctors with Spanish in `languages[]`, add a Spanish FAQ block (5 questions, Spanish answers). This captures "dentista en Beverly Hills que habla español" queries in AI search — a massive underserved volume.

```html
<section id="espanol">
  <h3>Preguntas frecuentes en español</h3>
  <details>
    <summary>¿El Dr. Abri habla español?</summary>
    <p>Sí. El Dr. Abri y su equipo atienden pacientes en español, inglés y ruso.</p>
  </details>
  <!-- 4 more questions -->
</section>
```

Add `<link rel="alternate" hreflang="es" href="...#espanol">` in head.

**6. Move bio higher in DOM**
AI crawlers weight content that appears earlier in the page. Currently the bio is section 7. Move it to section 2 (directly after Insurance fit). Perplexity and ChatGPT pull from early-page prose for "who is X" queries.

---

## Schema.org — Complete T6 Graph

Every T6 page `<head>` requires TWO `<script type="application/ld+json">` blocks:

### Block 1: Entity Graph

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://covercapy.com/doctors/california/david-abri/#webpage",
      "url": "https://covercapy.com/doctors/california/david-abri/",
      "name": "Dr. David Abri, DDS | Cosmetic Dentist Beverly Hills CA | CoverCapy",
      "isPartOf": { "@id": "https://covercapy.com/#website" },
      "about": { "@id": "https://covercapy.com/doctors/california/david-abri/#person" },
      "breadcrumb": { "@id": "https://covercapy.com/doctors/california/david-abri/#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://covercapy.com/doctors/california/david-abri/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "CoverCapy", "item": "https://covercapy.com/" },
        { "@type": "ListItem", "position": 2, "name": "California Dentists", "item": "https://covercapy.com/doctors/california/" },
        { "@type": "ListItem", "position": 3, "name": "Dr. David Abri, DDS", "item": "https://covercapy.com/doctors/california/david-abri/" }
      ]
    },
    {
      "@type": ["Person", "Physician"],
      "@id": "https://covercapy.com/doctors/california/david-abri/#person",
      "name": "Dr. David Abri, DDS",
      "givenName": "David",
      "familyName": "Abri",
      "honorificPrefix": "Dr.",
      "honorificSuffix": "DDS",
      "jobTitle": "Cosmetic and General Dentist",
      "description": "Dr. David Abri, DDS is a cosmetic dentist in Beverly Hills and Burbank, CA, specializing in dental implants, Invisalign, and TMJ treatment. USC Ostrow School of Dentistry graduate. Accepts Aetna and Anthem Blue Cross PPO.",
      "url": "https://covercapy.com/doctors/california/david-abri/",
      "image": "https://[cdn]/providers/david-abri/photo.webp",
      "medicalSpecialty": [
        { "@type": "MedicalSpecialty", "@id": "https://schema.org/Dentistry" },
        { "@type": "MedicalSpecialty", "@id": "https://schema.org/OralHealth" }
      ],
      "knowsAbout": ["Cosmetic dentistry", "Dental implants", "Invisalign", "TMJ treatment", "PPO dental insurance"],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Doctor of Dental Surgery (DDS)",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Herman Ostrow School of Dentistry of USC", "sameAs": "https://dentistry.usc.edu/" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "name": "California Dental License",
          "recognizedBy": { "@type": "GovernmentOrganization", "name": "California Dental Board", "sameAs": "https://search.dca.ca.gov/" },
          "identifier": "DN12345"
        }
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Herman Ostrow School of Dentistry of USC",
        "sameAs": "https://dentistry.usc.edu/"
      },
      "identifier": [
        { "@type": "PropertyValue", "name": "NPI", "value": "1234567890" },
        { "@type": "PropertyValue", "name": "California Dental License", "value": "DN12345" }
      ],
      "knowsLanguage": [
        { "@type": "Language", "name": "English" },
        { "@type": "Language", "name": "Spanish" },
        { "@type": "Language", "name": "Russian" }
      ],
      "memberOf": [
        { "@type": "Organization", "name": "American Dental Association", "sameAs": "https://www.ada.org/" },
        { "@type": "Organization", "name": "California Dental Association", "sameAs": "https://www.cda.org/" }
      ],
      "worksFor": [
        { "@type": "Dentist", "@id": "https://covercapy.com/dental/california/los-angeles/beverly-hills/abri-dental-beverly-hills/#dentist", "name": "Abri Dental Beverly Hills" },
        { "@type": "Dentist", "@id": "https://covercapy.com/dental/california/los-angeles/burbank/abri-dental-burbank/#dentist", "name": "Abri Dental Burbank" }
      ],
      "sameAs": [
        "https://abridental.com/meet-the-dentists/",
        "https://www.healthgrades.com/dentist/dr-david-abri-[id]",
        "https://npiregistry.cms.hhs.gov/provider-view/[NPI]",
        "https://search.dca.ca.gov/#[license]",
        "https://findadentist.ada.org/dentists/dr-david-abri-[id]"
      ]
    }
  ]
}
```

### Block 2: FAQPage (separate tag)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://covercapy.com/doctors/california/david-abri/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Dr. David Abri?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dr. David Abri, DDS is a cosmetic and general dentist licensed in California with offices in Beverly Hills and Burbank. He earned his DDS from USC Ostrow School of Dentistry and specializes in dental implants, Invisalign, and TMJ treatment. He sees patients in English, Spanish, and Russian."
      }
    },
    {
      "@type": "Question",
      "name": "Does Dr. Abri accept Aetna dental insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Both Abri Dental locations accept Aetna PPO. Coverage varies by plan tier. CoverCapy can verify your specific Aetna plan at no cost before you book."
      }
    }
    // ... 8 more questions
  ]
}
```

---

## `sameAs` Priority Order

| Source | Authority | Notes |
|--------|-----------|-------|
| NPPES NPI registry | Tier 1 | Federal government. Highest entity disambiguation signal. |
| State dental board license URL | Tier 1 | State government. License number link. |
| ADA FindADentist | Tier 2 | Professional association. Google uses ADA for Knowledge Panels. |
| Healthgrades | Tier 2 | High-DA healthcare directory. |
| Zocdoc profile | Tier 2 | If listed. |
| Practice website "About" page | Tier 3 | Direct entity confirmation. |
| Yelp | Tier 3 | High DA but lower medical authority signal. |
| Google Maps | Tier 3 | Use office coordinates URL if no stable GBP link. |

Always use stable, deep-link URLs. Never link to a search results page.

---

## Competitive SERP Strategy

### "Dr. [Name]" queries — win position 3-5

Competitors at positions 1-2: the practice's own website + Healthgrades.
T6 wins by: NPI on-page (matches NPPES = entity confidence), `Review` schema, doctor name in title + H1 + first 100 words of body, and inbound links from T5 pages.

### "[Specialty] dentist [City]" queries — win via T5/hub integration

T6 pages alone won't win these transactional geo queries — T5 and T4 hub pages do. But T6 pages linked from the T5 and T4 hierarchy absorb PageRank and contribute anchor text signals to the geo cluster.

### Coverage-intent queries — T6 exclusive opportunity

`"does dr abri accept delta dental"` — none of T6's competitors answer this with an interactive tool. Optimize T6 meta descriptions and first-para content for this query type. No other directory does this.
