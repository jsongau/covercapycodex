# T6 Doctor Profile Pages — Full Session Log
## CoverCapy | June 26, 2026

---

## What T6 Is

T6 = individual doctor/dentist profile pages. Separate from T5 (practice/office pages).

- **T5** = office/practice profile at `/dental/{state}/{market}/{city}/{office-slug}/`
- **T6** = individual doctor profile at `/dentists/{state}/{doctor-slug}/`

T5 is about the place. T6 is about the person.

---

## URL Structure

```
/dentists/{state-slug}/{doctor-slug}/
```

Examples:
- `covercapy.com/dentists/california/sean-thompson/`
- `covercapy.com/dentists/texas/trung-tang/`
- `covercapy.com/dentists/california/` ← state index page

**Why state-anchored (not city):**
- Dental licensing is state-issued
- Doctors work at multiple offices across cities
- `/dentists/california/david-abri/` is always correct even if he moves offices
- City-anchored URLs break when doctors relocate

---

## Supabase Tables

### `provider_profiles` (T6 source of truth)
Key columns added/used:
| Column | Notes |
|--------|-------|
| slug | URL slug — built from first+last name, city appended on collision |
| name | First + middle + last (title case, from NPPES) |
| honorific_suffix | DDS, DMD, etc. |
| npi | National Provider Identifier (10-digit) |
| license_state | Full state name (e.g. "California") |
| license_number | From NPPES taxonomy record |
| license_verified | boolean |
| specialties | text[] — all taxonomies from NPPES, primary first |
| gender | 'male' / 'female' / null |
| years_experience | Calculated from NPPES enumeration_date |
| dental_school | From NPPES or claimed profile |
| grad_year | Year of graduation |
| bio | Short bio (auto-generated or scraped) |
| custom_bio_long | Claimed/edited long bio |
| photo_url | URL to headshot |
| languages | text[] |
| sameas | text[] — external profile URLs |
| is_published | boolean — set false by enrich-npi.js, true after QA |
| claim_status | 'unclaimed' / 'claimed' |
| claimed_at | timestamp |
| accepting_new_patients_override | true / false / null |
| ada_member | boolean |
| board_certifications | text[] |
| review_quote | Featured patient quote |
| custom_seo_title | Override for meta title |
| custom_meta_description | Override for meta description |
| updated_at | timestamp — used for incremental builds |

### `provider_offices` (junction table)
Links providers to offices (many-to-many):
| Column | Notes |
|--------|-------|
| provider_slug | FK to provider_profiles.slug |
| office_slug | FK to dentists.slug |
| is_primary | boolean — primary office |
| sort_order | int — display order |
| status | 'active' / 'former' |
| left_at | timestamp — when doctor left |

---

## Data Enrichment — NPPES NPI Registry

### What NPPES Is
Free federal government API. No key required. Returns:
- Full name (first, middle, last)
- Credential (DDS/DMD)
- NPI number
- License number + state
- Specialty taxonomy
- Gender
- Enumeration date (used to calculate years_experience)
- Practice address and phone

### Script: `seo-build/enrich-npi.js`

Run from repo root:
```bash
SUPABASE_SERVICE_KEY=your_key node seo-build/enrich-npi.js
```

**What it does:**
1. Fetches all offices from `dentists` table where `npi_searched_at IS NULL`
2. For each office, runs 2-pass NPPES search:
   - Pass 1: Phone number match (fastest, ~65% hit rate)
   - Pass 2: City + address fuzzy match fallback (~10-15% additional)
3. For each NPI match, upserts a row in `provider_profiles`
4. Links provider to office via `provider_offices`
5. Stamps `npi_searched_at` on the office so it's skipped next run

**Key behavior:**
- Sets `is_published = false` for all auto-enriched profiles (quality gate, not published until reviewed)
- Handles ALL CAPS names from NPPES via `toTitleCase()`
- Resolves slug collisions: `first-last` → `first-last-city` → `first-last-city-state`
- Grabs all taxonomies (primary + secondary specialties)
- Maps gender: 'M'/'F' from NPPES → 'male'/'female' in Supabase
- Calculates `years_experience` from enumeration_date

**CLI flags:**
```bash
node seo-build/enrich-npi.js --state California   # one state only
node seo-build/enrich-npi.js --limit 20           # test run
node seo-build/enrich-npi.js --skip-existing      # skip already-linked offices
node seo-build/enrich-npi.js --force              # re-run even if npi_searched_at set
```

**Results from full run (June 26, 2026):**
- 7,042 offices processed
- ~88% match rate
- 1,149 provider profiles created
- `npi_searched_at` backfilled on all offices after run

**Isaac Sun fix:** Two duplicate rows existed — "Dr. Isaac Sun, DDS" (slug: `dr-isaac-sun-dds`) and "Isaac Sun, DDS" (slug: `isaac-sun`). Merged all office links to `isaac-sun` and deleted the duplicate.

---

## npi_searched_at Column

Added to `dentists` table to track which offices have already been NPI-searched:

```sql
ALTER TABLE public.dentists ADD COLUMN npi_searched_at timestamptz;
```

After full run, backfilled all 7,042 offices:
```sql
UPDATE public.dentists SET npi_searched_at = '2026-06-26T16:54:00Z' WHERE npi_searched_at IS NULL;
```

On subsequent runs, script skips offices where `npi_searched_at IS NOT NULL` (unless `--force` flag).

---

## T6 Page Generator

### Script: `seo-build/generate-providers.js`

Run from repo root (CRITICAL — same constraint as generate-plans.js):
```bash
SUPABASE_SERVICE_KEY=your_key node seo-build/generate-providers.js
```

**CLI flags:**
```bash
--slug david-abri       # build single profile only (for testing)
--state California      # one state only
--incremental           # skip profiles where updated_at unchanged
--force                 # rebuild all, ignore manifest
```

**What it produces:**
- `/dentists/{state}/{doctor-slug}/index.html` — T6 doctor profile pages
- `/dentists/{state}/index.html` — state index pages
- `/dentists/sitemap-dentists.xml` — sitemap
- `/dentists/.cross-links.json` — office → doctor map for T5 to consume
- `/dentists/.build-manifest.json` — tracks updated_at for incremental builds

**3-query Supabase plan (no N+1):**
1. Fetch all published providers (`npi NOT NULL`)
2. Fetch all active office links from `provider_offices`
3. Batch-fetch offices in 200-slug chunks from `dentists`
4. Join everything in memory

**Important:** Query uses `npi=not.is.null` NOT `is_published=eq.true` — because enrich-npi.js sets everyone to `is_published=false`. Quality gate is applied in code via noindex tag.

---

## Meta Title Formula (Option ⑥ — locked)

```
Dr. {First Last}, {Credential} | {Specialty} {City} — {Carrier 1} & {Carrier 2} PPO
```

Example:
```
Dr. Sean Thompson, DDS | General Practice San Clemente — Delta Dental & Guardian PPO
```

Fallbacks:
- No credential → omit `, DDS`
- 1 carrier → `— {Carrier} PPO`
- 0 carriers → omit carrier section

---

## Meta Description Formula (Option ⑥ — locked)

```
Dr. {Last} offers {procedures} in {City}, {Abbr}. Accepts {Carrier 1} and {Carrier 2} PPO. Verify your coverage before you book through CoverCapy.
```

Fallbacks:
- No procedures → `Dr. {Last} is a {specialty} dentist in {City}, {Abbr}.`
- 1 carrier → `Accepts {Carrier} PPO and other major dental insurance plans.`
- 0 carriers → `Accepts major PPO dental insurance plans.`

---

## Schema.org

**CRITICAL:** Use `["Person", "Dentist"]` — NOT `["Physician"]` (invalid schema.org type), NOT `["Dentist"]` alone (that's LocalBusiness).

```json
{
  "@type": ["Person", "Dentist"],
  "name": "Dr. Sean Thompson, DDS",
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "NPI",
    "value": "1689713547"
  },
  "medicalSpecialty": "https://schema.org/Dentistry",
  "worksFor": [...offices],
  "sameAs": ["https://npiregistry.cms.hhs.gov/provider-view/1689713547", "..."]
}
```

FAQPage schema is baked into static HTML in `<head>` — NOT client-side injected.

BreadcrumbList: 3 levels only:
1. CoverCapy → `covercapy.com/`
2. {State} Dentists → `covercapy.com/dentists/california/`
3. Dr. Name → `covercapy.com/dentists/california/sean-thompson/`

---

## Quality Gate

Profiles are generated for ALL providers with NPI, but get `<meta name="robots" content="noindex">` if they fail:

```javascript
const noindex = !hasIdent || offices.length === 0 || bioWords < 80;
```

To flip a profile to indexable:
1. Set `is_published = true` in Supabase (manual or after claiming)
2. Rebuild that profile: `node seo-build/generate-providers.js --slug sean-thompson`
3. Git push

**Current status:** All 1,148 live pages are noindex until manually reviewed/published.

---

## Page Sections (in order)

1. Breadcrumb nav
2. Hero — monogram or photo, name, credential, specialty + city eyebrow, NPI tag, experience tag, CTA buttons
3. "Why consider Dr. X" — 4 items max (PPO verification, license verified, years experience, carriers accepted)
4. About — auto-generated bio or custom bio
5. "Currently practicing at" — office cards with address, phone, insurance pills, T5 profile link
6. FAQ accordion — up to 10 questions (insurance, location, NPI, new patients, procedures, experience, languages, how to verify, no insurance, multi-office)
7. "Is this your profile?" claim block (unclaimed only)
8. Profile footer — data source attribution, updated date
9. Sticky bar — "Verify my coverage"

---

## Language Rules

- "Profile updated {date}" — NOT "last reviewed" (we pulled from database, didn't call the office)
- "Currently practicing at" — NOT "working at"
- "Previously associated with" — for former offices (when `status = 'former'` in provider_offices)
- "Data sourced from NPPES federal registry" — in footer
- No em-dashes in copy
- No roman numerals
- Practice names in `<em>` in modals

---

## Design System

Same CSS tokens as T5:
```css
--teal-night: #082A30
--teal-700:   #14525B
--teal-300:   #5E8C92
--mint:       #5BE0A0
--mint-soft:  #E6F7EE
--cream-card: #FFFDF8
--cream:      #F6F0E6
--gold-soft:  #F3E8CF
--ink:        #082A30
--ink-soft:   #56655F
--ink-faint:  #8A958F
--body:       #3A4A42
--line:       #E8E2D8
```

Typography:
- Headlines: `'Fraunces', serif` weight 500
- Body/UI: `'Inter Tight', system-ui`

Monogram fallback (when no photo): `--teal-night` background, `--mint` initials text, using first initial + last initial.

---

## Google Analytics

GA4 ID: `G-XNBPGSZ1LZ` — baked into every T6 page.

---

## Cross-links (T5 ↔ T6)

Generator produces `/dentists/.cross-links.json`:
```json
{
  "beachside-smiles": {
    "provSlug": "sean-thompson",
    "provName": "Dr. Sean Thompson, DDS",
    "stSlug": "california"
  }
}
```

T5 generator (`generate-plans.js`) can consume this to add "Meet the dentists at this office" sections linking to T6 profiles. Not yet implemented in T5 — next step.

---

## Results (June 26, 2026 Build)

| Metric | Count |
|--------|-------|
| Pages written | 1,148 |
| Pages noindexed | 1,148 (all — pending review) |
| State index pages | 6 |
| Sitemap entries | 1,148 |
| Cross-links | 478 office links |

**By state:**
| State | Doctors |
|-------|---------|
| California | 747 |
| North Carolina | 287 |
| Texas | 88 |
| Rhode Island | 13 |
| Washington | 12 |
| Nevada | 1 |

**Live at:** `covercapy.com/dentists/california/sean-thompson/`

---

## Deployment

Same as T5 — static files committed to git, Vercel auto-deploys on push.

```bash
# Full rebuild + deploy:
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape"
SUPABASE_SERVICE_KEY=your_key node seo-build/generate-providers.js
git add -A && git commit -m "feat: T6 rebuild" && git push

# Single profile rebuild:
SUPABASE_SERVICE_KEY=your_key node seo-build/generate-providers.js --slug sean-thompson
git add -A && git commit -m "fix: update sean-thompson profile" && git push
```

---

## Known Issues / Watch Out For

1. **Run from repo root** — `cd seo-build && node generate-providers.js` writes output to wrong location (same issue as generate-plans.js)
2. **`is_published = false` on all enriched profiles** — generator queries `npi=not.is.null` not `is_published=eq.true`, so all profiles get pages. Quality gate in code handles noindex.
3. **`seo-build/` is gitignored** — generate-providers.js is never committed. Only `/dentists/` output goes to git.
4. **`doctors/` vs `dentists/`** — early build accidentally used `doctors/` as folder name. Fixed by replacing all instances in generator. If `doctors/` folder reappears, delete it with `rm -rf doctors` from repo root.
5. **Slug collisions** — same doctor at multiple offices gets deduplicated: `first-last` → `first-last-city` → `first-last-city-state`. Check for duplicate slugs before publishing.
6. **Multi-office doctors** — one doctor can appear at multiple offices. All offices are shown in "Currently practicing at" section. Cross-links JSON maps each office to the same doctor slug.
7. **Noindex until reviewed** — all 1,148 current pages have `noindex`. To make indexable, set `is_published = true` in Supabase and rebuild.

---

## Next Steps

1. **Flip high-quality profiles to index** — run SQL to set `is_published = true` for profiles with NPI + linked office + review count > 50, then rebuild
2. **Add T5 → T6 cross-links** — update `generate-plans.js` to read `.cross-links.json` and add "Meet the team" section to T5 pages
3. **Photo scraping** — `seo-build/scrape-photos.js` (planned, not built) — scrape practice `/about` pages for headshots
4. **Claim flow** — `/claim?slug=sean-thompson` landing page for doctors to claim profiles
5. **`discover-dentists.js`** — city-first NPPES discovery to find doctors not yet in the `dentists` table
6. **Delta Dental scraper** — scrape carrier directories by zip to find in-network doctors
7. **Rotate Supabase service key** — key `[REDACTED-SERVICE-KEY-ROTATE-IN-SUPABASE]` was shared in chat, should be rotated in Supabase dashboard
