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
├── dental/                          ← ALL GENERATED SEO PAGES (tracked by git, do not hand-edit)
│   ├── sitemap-dental.xml           ← generated sitemap (~6,400 URLs)
│   ├── california/
│   │   ├── index.html               ← T3 state hub
│   │   ├── southern-california/     ← T3.5 regional hub
│   │   ├── los-angeles/             ← T4a metro hub
│   │   │   ├── index.html
│   │   │   └── west-hollywood/      ← T4c city page
│   │   │       ├── index.html
│   │   │       └── smiles-dental/   ← T5 dentist profile
│   │   │           └── index.html
└── seo-build/                       ← GITIGNORED — source only, never committed
    └── generate-plans.js            ← THE GENERATOR — source of truth for all /dental/ pages
```

**CRITICAL:** Never hand-edit files inside `dental/`. They are overwritten on every build. All changes go into `seo-build/generate-plans.js`.

**CRITICAL:** `seo-build/` is in `.gitignore`. The generator and its changes are never committed. Only the OUTPUT (`dental/`) goes to git.

---

## RUNNING THE GENERATOR — READ THIS CAREFULLY

### ⚠️ ALWAYS run from the REPO ROOT, never from inside seo-build/

`OUT_DIR` in the generator defaults to `.` (current working directory). If you `cd seo-build` first, output goes to `seo-build/dental/` which is **gitignored** and will never deploy. This mistake caused weeks of "nothing to commit" confusion.

```bash
# CORRECT — run from repo root:
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape"
node seo-build/generate-plans.js                     # full build (~8 min)
node seo-build/generate-plans.js --dentist-pages     # T5 dentist pages only (~4 min)
node seo-build/generate-plans.js --hubs              # hub pages only

# WRONG — do not do this:
cd seo-build && node generate-plans.js   # writes to seo-build/dental/ = gitignored!
```

### Must run from Mac Terminal — NOT Linux/Docker sandbox
The sandbox cannot reach Supabase. All generator runs must be from the user's Mac.

### Full deploy workflow
```bash
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape"
node seo-build/generate-plans.js
git add -A
git commit -m "feat: description"
git push
# Vercel auto-deploys in ~2 min
```

---

## URL ARCHITECTURE

Canonical slug format: `/dental/{state}/{market-area}/{city}/{dentist-slug}/`

| Tier | Example URL | Page Type |
|------|-------------|-----------|
| T3 | `/dental/california/` | State hub |
| T3.5 | `/dental/california/southern-california/` | Regional hub |
| T4a | `/dental/california/los-angeles/` | Metro hub |
| T4b | `/dental/california/los-angeles/beverly-hills-west-hollywood/` | Local area hub |
| T4c | `/dental/california/los-angeles/west-hollywood/` | City page |
| T5 | `/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/` | Dentist profile |

- State slug: `stateSlug(state)` — lowercase, hyphenated
- Market slug: `slugify(seo_area || market_area)`
- City slug: `slugify(city)`
- Dentist slug: `d.slug` from Supabase (preferred) or `slugify(d.name)` as fallback
- All trailing slashes. All are `index.html` inside the slug folder.
- **NEVER use `d.seo_path`** — it contains stale `/dentists/` prefixed paths. Always build URLs from parts.

---

## GENERATOR — seo-build/generate-plans.js

### Key functions
- `buildDentistPage(d, market, state)` — T5 individual dentist profile
- `buildCityPage(city, dentists, market, state)` — T4c city page
- `buildMetroHub(market, dentists, state)` — T4a metro hub
- `buildLocalAreaHub(localArea, dentists, market, state)` — T4b local area
- `buildStateHub(state, markets, dentists)` — T3 state hub
- `buildRegionalHub(region, markets, dentists, state)` — T3.5 regional hub
- `pageShell({title, meta, canonical, body, schema})` — shared HTML wrapper
- `fetchAllRows(url, headers)` — paginated Supabase fetch (handles 1000-row cap)
- `dentistCard(d, stSlug, mkSlug)` — dentist card used on hub/city pages

### dentistCard URL — always built from parts
```javascript
// CORRECT (current):
const profile = `${BASE_URL}/dental/${stSlug}/${mkSlug}/${slugify(d.city||'')}/${d.slug||slugify(d.name)}/`;

// WRONG — never use seo_path:
// d.seo_path contains stale /dentists/ paths
```

### Supabase connection
```
Project: hfvbeqlefwwjlrbyxpbj
URL: https://hfvbeqlefwwjlrbyxpbj.supabase.co
```

---

## SUPABASE SCHEMA

### `dentists` table (key columns)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | Exact practice name — used in title/H1 |
| slug | text | URL slug — canonical, use this for T5 URLs |
| city | text | |
| state | text | Full name (e.g. "California") |
| address | text | Full street address |
| phone | text | Formatted e.g. "(714) 555-1234" |
| email | text | Office contact — used for verify notifications |
| website | text | Always strip UTM: `d.website.split('?')[0]` |
| latitude | float8 | For map + sameAs schema |
| longitude | float8 | For map + sameAs schema |
| insurance_networks | text[] | Accepted PPO carriers |
| procedures | text[] | Treatments offered |
| weighted_rating | float4 | Star rating 1–5 |
| google_review_count | int4 | Review count |
| open_weekends | bool | Weekend hours |
| doctor_name | text | Lead dentist name |
| membership_tier | text | 'free' \| 'capy_accredited' \| 'platinum_elite' |
| seo_path | text | **STALE — ignore. Use slug instead.** |

Valid `membership_tier` values: `free`, `capy_accredited`, `platinum_elite`. If a dentist has `listed` or any other value, update to `free`.

### `markets` table
| Column | Type | Notes |
|--------|------|-------|
| market_area | text | PK (e.g. "Los Angeles") |
| seo_area | text | URL-safe version |
| state | text | |
| hub_type | text | 'metro' \| 'local_area' \| 'regional' |
| parent_market | text | For T4b — FK to T4a market_area |
| office_count | int4 | Cached dentist count |

### `verification_requests` table (Phase B — not yet created)
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
  status              text DEFAULT 'pending',
  create_account      boolean DEFAULT false,
  source_page_url     text,
  replied_at          timestamptz,
  created_at          timestamptz DEFAULT now()
);
```

---

## T5 DENTIST PROFILE PAGE ARCHITECTURE

Every T5 page is a self-contained ~65KB HTML file. It does NOT load JS from find-my-dentist.html.

### Head
```
<title>{Name} | PPO Dentist {City}, {Abbr} — Insurance Verified | CoverCapy</title>
<meta name="description"> names up to 4 carriers, review count, "free through CoverCapy"
<link rel="canonical" href="{BASE_URL}/dental/{stSlug}/{mkSlug}/{cSlug}/{dSlug}/">
```

### Schema (JSON-LD)
- `Dentist` + `LocalBusiness` + `MedicalOrganization`
- `AggregateRating` — if rating + reviews exist
- `FAQPage` — 3 FAQs: carrier acceptance, phone, location
- `BreadcrumbList` — 4 levels: state → market → city → dentist
- `sameAs` array: `[d.website, "https://www.google.com/maps/search/?api=1&query={lat},{lon}"]`

### Body sections (in order)
1. Breadcrumb nav
2. Hero — H1, city/state, rating badge, network count
3. Hero CTAs — verify button (opens modal) + "Plans from $30/mo"
4. Insurance networks — pill badges
5. Treatments — pill badges
6. Office info grid — address + "Get directions ↗" + OpenStreetMap map tile, phone, website (exit modal), weekend hours
7. About prose — 2 paragraphs with name, city, carriers, procedures, rating
8. FAQ accordion — carrier, phone, location questions
9. Eligibility CTA block
10. Nearby offices rail
11. Sticky bar — "Verify my coverage — free"

### Modals (baked inline per T5 page)
All modal code is embedded as inline HTML + CSS + JS in every T5 page. Dentist data is baked at build time:

```javascript
var CC_DENTIST = { name, phone, address, website, email };  // baked per page
```

**Exit modal (`#t5-exit-scrim`)**
- Triggered by: "Visit official website ↗" button → `t5OpenExit()`
- Shows concierge handoff, quick-info panel (phone, address, verify CTA)
- Leave path: `window.open(website, '_blank')`
- Copy rules: NO em-dashes, NO roman numerals, practice name in `<em>`

**PPO Verification wizard (`#t5-verify-scrim`)**
- Triggered by: hero CTA, rail CTA, sticky bar → `t5OpenVerify()`
- 3-step wizard: carrier tiles → contact info → preview/send → success
- 12 carrier tiles including Delta Dental PPO + Premier separately
- Member ID encrypted badge, Delta Dental SSN note
- POSTs to `https://covercapy.com/api/verify-ppo` (Phase B endpoint)
- **Member ID is NEVER stored — only `member_id_provided: boolean`**

---

## CTA MAP

### T5 dentist pages
| CTA | Location | Action |
|-----|----------|--------|
| "Verify my insurance at this office — free" | Hero | Opens `#t5-verify-scrim` |
| "No insurance? Plans from $30/mo" | Hero secondary | `/compare-ppo-dental-plans` |
| "Verify my insurance — free" | Rail section | Opens `#t5-verify-scrim` |
| "Verify my coverage — free" | Sticky bar | Opens `#t5-verify-scrim` |
| "Visit official website ↗" | Info grid | Opens `#t5-exit-scrim` |
| "Get directions ↗" | Address row | Google Maps directions link |
| OpenStreetMap tile | Info grid | Clickable → Google Maps |

### Hub pages (T3/T4)
| CTA | Location | Action |
|-----|----------|--------|
| "View full profile →" on dentist card | Cards grid | T5 profile URL (built from slug, never seo_path) |
| "Verify my PPO here — free" | Cards | `/find-my-dentist?q={city}` |

---

## DESIGN SYSTEM

### CSS Tokens
```css
--teal-night: #082A30   /* primary dark */
--teal-700:   #14525B   /* mid teal — links */
--teal-300:   #5E8C92   /* overlines */
--mint:       #5BE0A0   /* accent — button text on dark */
--mint-soft:  #E6F7EE   /* selected states */
--cream-card: #FFFDF8   /* modal backgrounds */
--cream:      #F6F0E6   /* quick panels */
--gold-soft:  #F3E8CF   /* warnings, Delta Dental note */
--ink:        #082A30   /* body text */
--ink-soft:   #56655F   /* secondary */
--ink-faint:  #8A958F   /* tertiary, labels */
--body:       #3A4A42   /* prose */
--line:       #E8E2D8   /* borders */
```

### Typography
- Headlines: `'Fraunces', serif` — weight 500, italic for practice names in modals
- Body/UI: `'Inter Tight', system-ui, sans-serif`

### What NOT to build
- No gradients on cards
- No glassmorphism
- No em-dashes in copy
- No roman numerals in lists
- No Capy Crowns in modals
- No countdown timers
- Do not store member IDs

---

## MEMBERSHIP TIERS

| Tier | Price | Search Radius |
|------|-------|---------------|
| free | $0 | 8 miles |
| capy_accredited | ~$285/mo (founder) | 10 miles |
| platinum_elite | $1,499/mo | 18 miles |

Ranking tiebreaker: Capy Crowns score.

---

## MAP EMBED

OpenStreetMap static tiles — no API key needed:
```
https://staticmap.openstreetmap.de/staticmap.php?center={lat},{lon}&zoom=15&size=480x160&markers={lat},{lon},red
```
Wrapped in a Google Maps directions link. `onerror` on the img hides the row if tile server is unavailable.

---

## DEPLOYMENT

**Platform:** Vercel  
**Trigger:** `git push origin main` → auto-deploy (~2 min)  
**Build:** Static — no build step on Vercel. Files in `dental/` are served directly.

---

## KEY URLS

| Purpose | URL |
|---------|-----|
| Live site | https://covercapy.com |
| KYT Dental (test T5) | https://covercapy.com/dental/california/orange-county/fountain-valley/kyt-dental-services/ |
| Find my dentist | https://covercapy.com/find-my-dentist |
| Compare plans | https://covercapy.com/compare-ppo-dental-plans |
| Dental sitemap | https://covercapy.com/dental/sitemap-dental.xml |
| Supabase | https://supabase.com/dashboard/project/hfvbeqlefwwjlrbyxpbj |

---

## KNOWN ISSUES / WATCH OUT FOR

1. **GENERATOR MUST RUN FROM REPO ROOT** — `cd seo-build && node generate-plans.js` writes to `seo-build/dental/` which is gitignored. Always: `cd repo-root && node seo-build/generate-plans.js`
2. **`seo-build/` is gitignored** — generate-plans.js changes are never committed. Only `dental/` output goes to git.
3. **`seo_path` column is stale** — all 5,776 dentists have `/dentists/` prefix in seo_path. Ignore it. Always build URLs from `stSlug + mkSlug + citySlug + d.slug`.
4. **`listed` membership_tier** — most dentists have this non-standard value. Update to `free` when encountering. Valid values: `free`, `capy_accredited`, `platinum_elite`.
5. **git index.lock** — if git errors, run: `rm -f .git/index.lock` (from Mac Terminal)
6. **Supabase 1000-row cap** — handled by `fetchAllRows()` paginator. Never use a plain fetch.
7. **Linux sandbox cannot reach Supabase** — run generator from Mac Terminal only.
8. **T5 pages are standalone HTML** — they do NOT share JS with find-my-dentist.html. All modal code must be embedded inline in `buildDentistPage()`.
9. **Never hand-edit `dental/`** — files are overwritten on every build.
10. **`d.website` may contain UTM params** — always strip: `d.website.split('?')[0]`

---

## AGENT INSTRUCTIONS

If you are an AI agent reading this file:

1. **Read this file completely before writing any code.**
2. **Run the generator from repo root**: `node seo-build/generate-plans.js` — never `cd seo-build && node generate-plans.js`
3. **Never edit files in `dental/`** — edit `seo-build/generate-plans.js` and rebuild.
4. **Never use `d.seo_path`** for URLs — build from parts.
5. **Run generator from Mac Terminal**, not Linux/Docker sandbox.
6. **Preserve CSS tokens** — do not substitute or invent new color values.
7. **No em-dashes in copy** — use commas, colons, or rewrite.
8. **`sameAs` in schema must be an array**, not a string.
9. **Strip UTM params** from `d.website` before displaying: `.split('?')[0]`
10. **T5 modal prefix is `t5`** (`t5OpenVerify`, `t5-verify-scrim`). find-my-dentist.html uses different IDs (`m-verify`, `m-exit`). Do not mix.
11. **Member ID is NEVER stored** — only `member_id_provided: boolean`.
12. **`seo-build/` is gitignored** — the generator source is not in git. Only the output `dental/` is committed.
13. **Plan facts come ONLY from `/data/plans/`.** This folder is the single source of truth for every featured insurance plan (premium, annual maximum, deductible, coverage percentages, waiting periods, network, caps, activation). Before stating ANY fact about a plan on a page, read that plan's `data/plans/{slug}.md`. Never invent or guess a plan number. Every fact in those files is sourced and dated; honor each file's `do_not` list. If a page and the SSOT disagree, the SSOT wins after re-verifying against the cited source. When a plan page, the compare page, or the hub is edited, reconcile it against `/data/plans/`. See `data/plans/README.md`.
