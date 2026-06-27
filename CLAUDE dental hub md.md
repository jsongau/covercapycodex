# CLAUDE.md — CoverCapy Dentists Scape
## Agent Context File | Updated June 2026

Read this file first before touching any code. It covers architecture, data, design constraints, and what NOT to do.

---

## WHAT THIS PROJECT IS

CoverCapy is a luxury concierge-style PPO dental platform. This repo generates and serves a static SEO site with 6,400+ pages covering dentists, cities, metro markets, and states across the US.

**Positioning:** "Get cover today, see a dentist tomorrow."
**Feel:** Luxury handbag shopping / boutique hotel concierge. NOT a healthcare portal. NOT insurance comparison. NOT generic SaaS.

The site lives at `covercapy.com`. It is deployed on Vercel from this GitHub repo. Pushes to `main` auto-deploy.

---

## REPO STRUCTURE

```
/
├── CLAUDE.md                        ← you are here
├── find-my-dentist.html             ← main dentist search page (live interactive app)
├── compare-ppo-dental-plans.html    ← insurance comparison page
├── index.html                       ← homepage
├── dental/                          ← ALL GENERATED SEO PAGES (do not hand-edit)
│   ├── sitemap-dental.xml           ← generated sitemap (6,399 URLs)
│   ├── california/                  ← T3 state hubs
│   │   ├── index.html
│   │   ├── southern-california/     ← T3.5 regional hub
│   │   ├── los-angeles/             ← T4a metro hub
│   │   │   ├── index.html
│   │   │   ├── west-hollywood/      ← T4c city page
│   │   │   │   └── index.html
│   │   │   └── smiles-dental/       ← T5 dentist profile (DO NOT EDIT — generated)
│   │   │       └── index.html
│   │   └── orange-county/           ← T4a metro hub
│   │       └── fountain-valley/     ← T4c city page
│   │           └── kyt-dental-services/ ← T5 dentist profile
├── seo-build/
│   └── generate-plans.js            ← THE GENERATOR — source of truth for all /dental/ pages
└── assets/, fonts/, etc.
```

**CRITICAL:** Never hand-edit files inside `dental/`. They are overwritten on every build. All changes go into `seo-build/generate-plans.js`.

---

## URL ARCHITECTURE

Canonical slug format: `/dental/{state}/{market-area}/{city}/{dentist-slug}/`

| Tier | Example URL | Page Type |
|------|-------------|-----------|
| T3 | `/dental/california/` | State hub |
| T3.5 | `/dental/california/southern-california/` | Regional hub (SoCal, NorCal) |
| T4a | `/dental/california/los-angeles/` | Metro hub |
| T4b | `/dental/california/los-angeles/beverly-hills-west-hollywood/` | Local area hub |
| T4c | `/dental/california/los-angeles/west-hollywood/` | City page |
| T5 | `/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/` | Dentist profile |

State slug: `stateSlug(state)` — lowercase, hyphenated
Market slug: `slugify(seo_area || market_area)` — from Supabase `markets` table
City slug: `slugify(city)` — lowercase, hyphenated
Dentist slug: `d.slug || slugify(d.name)` — Supabase `dentists.slug` preferred

All pages use trailing slash. All are static `index.html` files inside the slug folder.

---

## GENERATOR — seo-build/generate-plans.js

Run with:
```bash
cd seo-build
node generate-plans.js                  # builds everything
node generate-plans.js --dentist-pages  # only T5 dentist pages (fastest, ~3-5 min)
node generate-plans.js --hubs           # only hub pages (T3/T4/T3.5)
```

**MUST RUN FROM MAC TERMINAL — not the Linux Cowork sandbox.** The sandbox cannot reach Supabase.

### What it does
1. Fetches all markets + dentists from Supabase via PostgREST (paginated with `fetchAllRows()` — handles Supabase's 1000-row server cap using Range headers)
2. Builds T3 state hubs, T3.5 regional hubs, T4a metro hubs, T4b local area hubs, T4c city pages, T5 dentist profiles
3. Generates `dental/sitemap-dental.xml` with all URLs
4. Writes all files to the repo's `dental/` directory

### Key functions
- `buildDentistPage(d, market, state)` — T5 individual dentist profile
- `buildCityPage(city, dentists, market, state)` — T4c city page
- `buildMetroHub(market, dentists, state)` — T4a metro hub
- `buildLocalAreaHub(localArea, dentists, market, state)` — T4b local area
- `buildStateHub(state, markets, dentists)` — T3 state hub
- `buildRegionalHub(region, markets, dentists, state)` — T3.5 regional hub
- `pageShell({title, meta, canonical, body, schema})` — shared HTML wrapper
- `fetchAllRows(url, headers)` — paginated Supabase fetch (Range: 0-999 batches)

### Supabase connection
```
Project: hfvbeqlefwwjlrbyxpbj
URL: https://hfvbeqlefwwjlrbyxpbj.supabase.co
Anon key: in generator — do NOT put service role key in client-side code
```

### Tables used
- `dentists` — all dentist data (see schema below)
- `markets` — metro areas with `market_area`, `seo_area`, `state`, `hub_type`
- `ppo_plans` — insurance plan listings (used on compare page)

---

## SUPABASE SCHEMA

### `dentists` table (key columns)
```
id                  uuid        PK
name                text        Practice name (exact, used in title/H1)
slug                text        URL slug (e.g. "kyt-dental-services")
city                text
state               text        Full name (e.g. "California")
address             text        Full street address
phone               text        Formatted (e.g. "(714) 555-1234")
email               text        Office contact email — used for verification notifications
website             text        Official website URL
latitude            float8      For map embed + sameAs schema
longitude           float8      For map embed + sameAs schema
insurance_networks  text[]      Array of accepted PPO carriers
procedures          text[]      Array of treatments offered
weighted_rating     float4      Star rating (1–5)
review_count        int4        Number of reviews
open_weekends       bool        Weekend hours available
doctor_name         text        Lead dentist name
seo_path            text        Precomputed URL path (may be stale — regenerate from slug)
market_area         text        FK to markets.market_area
membership_tier     text        'free' | 'capy_accredited' | 'platinum_elite'
verified_at         timestamptz Last data verification date
```

### `markets` table (key columns)
```
market_area         text        PK (e.g. "Los Angeles")
seo_area            text        URL-safe version (e.g. "Los Angeles")
state               text
hub_type            text        'metro' | 'local_area' | 'regional'
parent_market       text        For T4b — references T4a market_area
office_count        int4        Cached dentist count
```

### `verification_requests` table (Phase B — create before wiring backend)
```sql
CREATE TABLE verification_requests (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  dentist_id          uuid REFERENCES dentists(id),
  patient_email       text NOT NULL,
  patient_name        text,
  patient_phone       text,
  ppo_carrier         text NOT NULL,
  member_id_provided  boolean DEFAULT true,   -- NEVER store the actual member ID
  group_provided      boolean DEFAULT false,
  notification_pref   text DEFAULT 'covercapy_notifies',
  message             text,
  status              text DEFAULT 'pending', -- 'pending' | 'replied' | 'closed'
  create_account      boolean DEFAULT false,
  source_page_url     text,
  follow_up_1_sent    timestamptz,
  follow_up_2_sent    timestamptz,
  replied_at          timestamptz,
  created_at          timestamptz DEFAULT now()
);
```
**IMPORTANT: Member ID is NEVER stored. Only `member_id_provided: boolean`.**

---

## PAGE ARCHITECTURE — T5 DENTIST PROFILE

Every T5 page is a self-contained HTML file (~65-70KB). It does NOT load JS from find-my-dentist.html.

### Head
```html
<title>{Name} | PPO Dentist {City}, {State Abbr} — Insurance Verified | CoverCapy</title>
<meta name="description" content="...names up to 4 carriers, review count, free through CoverCapy...">
<link rel="canonical" href="{BASE_URL}/dental/{stSlug}/{mkSlug}/{cSlug}/{dSlug}/">
```

### Schema (JSON-LD)
- `Dentist` + `LocalBusiness` + `MedicalOrganization`
- `AggregateRating` (if rating + reviews exist)
- `FAQPage` (3 FAQs: carrier acceptance, phone number, location)
- `BreadcrumbList` (4 levels: state → market → city → dentist)
- `sameAs`: array of `[d.website, googleMapsURL]` — critical for entity disambiguation

### Body sections (in order)
1. **Breadcrumb nav** — state > market > city > practice name
2. **Hero** — H1 with practice name, city/state, rating badge, network count
3. **Hero CTAs** — "Verify my insurance — free" (opens inline verify modal) + "No insurance? Plans from $30/mo"
4. **Insurance networks rail** — pill badges for each accepted PPO
5. **Treatments offered** — pill badges for procedures
6. **Office info grid** — address (with "Get directions ↗" link + OpenStreetMap embed), phone (tel: link), website (opens exit modal), weekend hours
7. **About prose block** — 2 paragraphs with exact practice name, carriers, city, procedures, rating (rich SEO content)
8. **FAQ accordion** — "Does [Name] accept [Carrier]?", "What is [Name]'s phone number?", "Where is [Name] located?"
9. **Eligibility CTA block** — "Check your eligibility at [Name] — it's free"
10. **Nearby offices rail** — 3–5 other dentists in same city/market
11. **Sticky bar** — appears after scroll, "Verify my coverage — free" button

### Modals (baked inline into each T5 page)
Both modals are embedded as inline HTML + CSS + JS in every T5 page using `CC_DENTIST` data baked in at build time.

**Exit modal (`#t5-exit-scrim`)**
- Triggered by: "Visit official website ↗" button
- Function: `t5OpenExit()` / `t5CloseExit()`
- Shows: overline "CoverCapy Concierge", practice name in italic Fraunces, trust line with `·` separators
- Stay path: reveals quick-info panel (phone, address, verify CTA)
- Leave path: `window.open(website, '_blank')` + closes modal
- Copy rules: NO em-dashes, NO roman numerals, practice name always in `<em>`

**PPO Verification wizard (`#t5-verify-scrim`)**
- Triggered by: hero CTA, rail CTA, sticky bar CTA
- Function: `t5OpenVerify()` / `t5CloseVerify()`
- 3-step wizard + success state:
  - Step 1: 12 carrier tiles + member ID (🔒 encrypted badge) + optional group # + Delta Dental SSN note
  - Step 2: name / email / optional phone + notification preference radio
  - Step 3: editable preview message + masked destination email + account creation checkbox + send button
  - Success: confirmation + "Create account" CTA
- Send: POSTs to `https://covercapy.com/api/verify-ppo` (Phase B endpoint — add Supabase Edge Function)
- State object: `t5vState = {carrier, memberId, groupNum, name, last, email, phone, notifPref}`
- `CC_DENTIST` object baked at build time: `{name, phone, address, website, email}`

### Inline JS baked per page
```javascript
var CC_DENTIST = {
  name: "KYT Dental Services",
  phone: "(714) 555-1234",
  address: "123 Main St, Fountain Valley, CA 92708",
  website: "https://kytdentalservices.com",
  email: "info@kytdentalservices.com"
};
```

---

## CTA CARDS & CONVERSION ARCHITECTURE

### On T5 dentist pages

| CTA | Location | Destination |
|-----|----------|-------------|
| "Verify my insurance at this office — free" | Hero | Opens `#t5-verify-scrim` modal inline |
| "No insurance? Plans from $30/mo" | Hero (secondary) | `/compare-ppo-dental-plans` |
| "Verify my insurance — free" | Rail section | Opens `#t5-verify-scrim` modal inline |
| "Verify my coverage — free" | Sticky bar | Opens `#t5-verify-scrim` modal inline |
| "Visit official website ↗" | Info grid | Opens `#t5-exit-scrim` exit modal |
| "Get directions ↗" | Address row | Google Maps `dir/?api=1&destination={lat},{lon}` |
| "Check your eligibility here — it's free" | Eligibility block | Opens `#t5-verify-scrim` modal inline |

### On hub pages (T3/T4a/T4b/T4c)

| CTA | Location | Destination |
|-----|----------|-------------|
| Dentist card "Verify coverage" | Dentist cards grid | `/find-my-dentist?office={name}&city={city}` |
| "Browse all on the map →" | Bottom of dentist list | `/find-my-dentist?q={market}` |
| "Compare PPO plans" | Sidebar / rail | `/compare-ppo-dental-plans` |
| City pill links | City grid | T4c city page |
| Dentist profile links | Card titles | T5 dentist profile |

### On find-my-dentist.html

| CTA | Trigger | Opens |
|-----|---------|-------|
| "Visit website" on dentist card | Click | `#m-exit` exit modal |
| "Verify PPO" / "Check insurance" | Click | `#m-verify` verification wizard |
| "No insurance?" rail card | Click | `/compare-ppo-dental-plans` |

---

## DESIGN SYSTEM

### CSS Tokens (`:root`)
```css
--teal-night:  #082A30   /* primary dark — backgrounds, buttons */
--teal-700:    #14525B   /* mid teal — links, accents */
--teal-300:    #5E8C92   /* light teal — overlines, secondary text */
--mint:        #5BE0A0   /* primary accent — button text on dark bg */
--mint-soft:   #E6F7EE   /* selected states, success backgrounds */
--cream-card:  #FFFDF8   /* modal and card backgrounds */
--cream:       #F6F0E6   /* quick panel backgrounds */
--gold-soft:   #F3E8CF   /* Delta Dental note, warnings */
--ink:         #082A30   /* body text dark */
--ink-soft:    #56655F   /* secondary text */
--ink-faint:   #8A958F   /* tertiary text, labels */
--body:        #3A4A42   /* prose text */
--line:        #E8E2D8   /* borders */
--line-2:      #EEE9E0   /* lighter borders */
--sh-lg:       0 24px 64px rgba(8,42,48,.28)  /* modal shadow */
```

### Typography
```css
/* Headlines */
font-family: 'Fraunces', serif;
font-weight: 500;
font-style: italic; /* for practice names in modals */

/* Body / UI */
font-family: 'Inter Tight', system-ui, sans-serif;
font-weight: 400 / 600 / 700;
```

Fonts loaded from Google Fonts. Do NOT substitute SF Pro, Roboto, or other system fonts in UI elements.

### Border radius
- Modals: 20px
- Cards: 14–16px
- Buttons: 12–13px
- Pill badges: 99px

### What NOT to build
- No gradients on cards (only allowed on the Send button in verify wizard)
- No glassmorphism
- No rounded everything — use sharp where appropriate
- No generic SaaS look
- No emojis in body copy (only allowed in UI badges like 🔒)
- No em-dashes in any user-facing copy (use commas, colons, or rewrite)
- No roman numerals in lists
- No Capy Crowns / rewards mention in modals
- No countdown timers in modals

---

## MEMBERSHIP TIERS

| Tier | Price | Features |
|------|-------|---------|
| Free Claim | $0 | Verified listing, basic exposure |
| Capy Accredited | $369/mo (20% founder discount = ~$285) | 10-mile search radius, requires: CBCT, iTero, digital workflows |
| Platinum Elite | $1,499/mo | 18-mile radius, limited per county, must be Accredited first |

Search radius: Free = 8mi, Accredited = 10mi, Platinum Elite = 18mi

Ranking tiebreaker: Capy Crowns score

---

## GAMIFICATION

### Capy Crowns
Behavior engine. Patients earn Crowns for: buying insurance, scheduling appointments, cleanings, referrals.
Use: whitening, gift cards, office promos.
Dentists earn a Crowns score — affects search ranking.

### Capy Diamonds
Recruitment flywheel. Patient nominates dentist → dentist joins → patient gets reward.
- 1 office: $150 gift card
- 3 offices: $175 each
- 10+: $200 each
Gift cards via Tango integration.

---

## SEO STRATEGY

### T5 page SEO targets
1. **Branded search** — "[Practice Name] [City]" — T5 page should rank above the dentist's own site
2. **Carrier-specific** — "[Practice Name] guardian ppo", "[Practice Name] delta dental"
3. **Voice search** — "What is [Name]'s phone number?", "Where is [Name] located?"

### Entity signals
- Title starts with exact practice name
- H1 contains practice name
- `sameAs` array: `[d.website, "https://www.google.com/maps/search/?api=1&query={lat},{lon}"]`
- `AggregateRating` schema with actual rating + review count
- NAP (Name/Address/Phone) consistent with Google Business Profile
- Outbound link to dentist's own website — creates referral traffic loop

### Internal link cascade
```
covercapy.com → /dental/ → /dental/california/ → /dental/california/los-angeles/ → /dental/california/los-angeles/west-hollywood/ → /dental/california/los-angeles/west-hollywood/{slug}/
```
Every parent links to all children. PageRank flows down the full chain.

### Map embed
OpenStreetMap static tiles (no API key required):
```
https://staticmap.openstreetmap.de/staticmap.php?center={lat},{lon}&zoom=15&size=480x160&markers={lat},{lon},red
```
Linked to Google Maps directions. `onerror` hides the row if tile server is slow.

---

## BACKEND — PHASE B (NOT YET WIRED)

### Pending before Phase B
- [ ] Resend domain verification for covercapy.com (SPF, DKIM, DMARC)
- [ ] Resend API key obtained and set as Supabase Edge Function secret
- [ ] `verification_requests` table created in Supabase (SQL above)
- [ ] `email` column confirmed on `dentists` table
- [ ] Supabase Edge Function `verify-ppo` deployed

### Email flow (when wired)
1. Patient submits verify wizard
2. POST to `https://covercapy.com/api/verify-ppo` (proxied to Supabase Edge Function)
3. Edge Function:
   - Inserts row into `verification_requests` (member_id NOT stored)
   - Sends office notification email via Resend (from: `verify@covercapy.com`, reply-to: patient email)
   - Sends patient confirmation email (from: `notify@covercapy.com`)
4. When office replies to `verify@covercapy.com`, Resend webhook updates `status = 'replied'` and notifies patient

### Supabase Edge Function endpoint
```
POST https://hfvbeqlefwwjlrbyxpbj.supabase.co/functions/v1/verify-ppo
Authorization: Bearer {anon_key}
Content-Type: application/json
```

---

## DEPLOYMENT

**Platform:** Vercel  
**Trigger:** `git push origin main` → auto-deploy  
**Build:** Static — no build step. Vercel serves the `dental/` directory directly.  
**Deploy time:** ~2 minutes  

### Rebuild workflow
```bash
# 1. Edit seo-build/generate-plans.js
# 2. Run generator (from Mac Terminal, NOT Linux sandbox):
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape/seo-build"
node generate-plans.js --dentist-pages   # or --hubs or no flag for everything

# 3. Commit and push:
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape"
git add -A
git commit -m "feat: description of change"
git push
```

### Google Search Console
Sitemap submitted: `covercapy.com/dental/sitemap-dental.xml`  
6,399 URLs — 625 hub pages + 5,774 T5 dentist pages.  
Manual URL inspection priority: `/dental/california/`, `/dental/california/los-angeles/`, `/dental/california/orange-county/fountain-valley/kyt-dental-services/`

---

## KNOWN ISSUES / WATCH OUT FOR

1. **git index.lock** — If git errors with "index.lock exists", run: `rm -f .git/index.lock` (from Mac Terminal — Linux sandbox can't do this)
2. **Supabase 1000-row cap** — Handled by `fetchAllRows()` paginator. Do NOT use a plain fetch without pagination or you'll silently get only 1000 rows.
3. **Linux sandbox cannot reach Supabase** — Always run `generate-plans.js` from Mac Terminal.
4. **T5 pages are standalone HTML** — They do NOT share JS with `find-my-dentist.html`. All modal code must be embedded inline in `buildDentistPage()`.
5. **dental/ folder is generated output** — Never hand-edit files in `dental/`. Changes will be lost on next build.
6. **`d.website` may contain UTM params** — Always strip with `.split('?')[0]` before displaying or putting in schema.
7. **`sameAs` must be an array** — Not a string. Schema validators will reject it otherwise.
8. **Delta Dental SSN note** — Delta Dental member IDs are sometimes SSNs. The modal shows a gold warning note. The SSN is encrypted in transit and NEVER stored.

---

## KEY URLS

| Purpose | URL |
|---------|-----|
| Live site | https://covercapy.com |
| KYT Dental profile (test page) | https://covercapy.com/dental/california/orange-county/fountain-valley/kyt-dental-services/ |
| Find my dentist (interactive) | https://covercapy.com/find-my-dentist |
| Compare plans | https://covercapy.com/compare-ppo-dental-plans |
| Dental sitemap | https://covercapy.com/dental/sitemap-dental.xml |
| Supabase dashboard | https://supabase.com/dashboard/project/hfvbeqlefwwjlrbyxpbj |
| Vercel dashboard | https://vercel.com/covercapy |

---

## PREFERRED INSURANCE PLANS (for copy/recommendations)

| Carrier | Reason |
|---------|--------|
| UHC Primary Dental | Next-day activation, strong preventive |
| Ameritas PrimeStar Complete | Day-1 major coverage, 20% major |
| Guardian | Strong carrier (weakness: waiting periods) |
| Mutual of Omaha / TruAssure | Underwriter quality |
| Humana Extend 5000 | Shorter waiting periods |
| Delta Dental PPO | Large network (separate from Delta Dental Premier) |

**Copy direction:** Always problem-first. Never "compare insurance plans." Instead: "Need dental insurance immediately?", "Laid off and lost dental?", "Need a crown soon?", "Benefits don't start for 90 days?"

---

## AGENT INSTRUCTIONS

If you are an AI agent reading this file:

1. **Read this file completely before writing any code.**
2. **Never edit files in `dental/`** — edit `seo-build/generate-plans.js` and rebuild.
3. **Run the generator from Mac Terminal**, not a Linux/Docker sandbox.
4. **Preserve CSS tokens** — do not substitute or invent new color values.
5. **Preserve font stack** — Fraunces for headings, Inter Tight for body.
6. **No em-dashes in copy** — use commas, colons, or rewrite the sentence.
7. **Check if `email` column exists on `dentists` table** before writing code that reads `d.email`.
8. **The `sameAs` field in schema must be an array**, even with one element.
9. **Strip UTM params from `d.website`** before displaying: `d.website.split('?')[0]`.
10. **Modals on T5 pages use `t5` prefix** (e.g., `t5OpenVerify`, `t5-verify-scrim`). Modals on find-my-dentist.html use different IDs (`m-verify`, `m-exit`). Do not mix them.
11. **Do not add Capy Crowns/rewards to any modal.**
12. **The verification wizard NEVER stores the actual member ID** — only `member_id_provided: boolean`.
