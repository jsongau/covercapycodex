# CoverCapy — Geographic Sorting Rules

How dentist locations are organized in the `dentists` table so the find-my-dentist drill-down (State → Region → Local Area → Sub-area → City) and the generated SEO pages stay accurate, findable, and consistent.

_Established June 2026 during the multi-state geo cleanup. Treat this as the source of truth when sorting a new state or fixing an existing one._

---

## The hierarchy

Each office is placed on five geographic levels, coarse to fine:

| Level | Column | What it is | Example |
|------|--------|-----------|---------|
| 0 | `geo_sector` | Broad multi-state band (groups the STATE column) | `west_coast`, `midwest` |
| 1 | `market_area` | **Region** — the area a local identifies with / would search | `Orange County`, `Inland Empire`, `Seattle`, `Chicago` |
| 2 | `local_area` | A recognized cluster of cities or a district within the region | `North Orange County`, `Eastside`, `North Side` |
| 3 | `sub_area` | Neighborhood or tight city-cluster (the finest grouping) | `Fullerton, Brea & La Habra`, `Hyde Park, Kenwood & Woodlawn` |
| 4 | `city` | The actual city/municipality | `Brea`, `Chicago` |

`seo_area` is a separate column that controls the **URL slug** for the region — see Rule 7.

---

## Core rules

### 1. The guiding test: "Would a local actually pick this?"
Every label must be what a resident would recognize and select when searching for a dentist. If someone in Brea, Fullerton, or Cypress wouldn't see their area in the list, the label is wrong.

- ❌ `North County Hills` (Fullerton/Brea aren't "hills")
- ✅ `Fullerton, Brea & La Habra`

### 2. A region (`market_area`) is what locals identify with — not necessarily the county
Use the term locals actually use. Counties are fine **only** when residents identify with them.

- ✅ `Orange County`, `San Diego County` — SoCal locals genuinely say these.
- ✅ `Inland Empire` — Riverside + San Bernardino residents say "IE," **not** "Riverside County." (Riverside and San Bernardino were merged into one `Inland Empire` region for this reason.)
- ✅ `Seattle`, `Tacoma`, `Spokane`, `Tri-Cities` — WA locals search by metro, not county.
- ❌ Don't force "X County" onto a region whose residents don't think in county terms.

### 3. A single city is never a region
If a region would contain only one city, the region becomes the broader area (usually the county) and the city drops to `local_area`.

- ❌ Region `Vancouver` → local areas that are all just more Vancouver.
- ✅ Region `Clark County` → local area `Vancouver` → sub-areas = real neighborhoods (Salmon Creek & Hazel Dell, etc.).
- Same fix applied to Bellingham → `Whatcom County`.

### 4. Exception: a genuinely large city may be its own region
Big cities with nationally-recognized neighborhoods stay standalone, with their districts/neighborhoods as local areas.

- ✅ `Seattle` (region) → `Ballard & Northwest Seattle`, `Downtown/Capitol Hill & Queen Anne`, `South Seattle & SeaTac`.
- ✅ `Chicago` (region) → the 8 **Sides** (Downtown & Near North, North, Far North, Northwest, West, South, Southwest, Far Southwest) → neighborhoods.

### 5. `market_area` must never equal `local_area`
The region and local area can't be the same string — that's redundant ("Spokane → Spokane"). The local area must be a real subdivision (district or cluster), or, if none exists, the **city**.

- When a region is named after its main city (Tacoma, Spokane), that city's offices get **district** local areas (North/Central/South Tacoma; North Spokane, South Hill, Downtown & East Central) so they don't collide.

### 6. `local_area` = recognized cluster; `sub_area` = neighborhood or city
- `local_area`: a cluster locals recognize (`Eastside`, `San Gabriel Valley`, `South Side`). If no recognized cluster exists, it is the city.
- `sub_area`: the finest tier — a neighborhood (big cities) or a tight 1–3 city cluster. If there's no finer recognized split, it's the city.

### 7. Preserve SEO URLs with `seo_area` when renaming a region
URLs are built as `slugify(seo_area || market_area)`. To rename a region **without** changing live URLs, leave `seo_area` pinned to the old slug.

- `Los Angeles` → `Los Angeles County` (display) while `seo_area='los-angeles'` keeps `/dental/california/los-angeles/…`.
- `San Diego` → `San Diego County` while `seo_area='san-diego'`.
- `Riverside` + `San Bernardino` → `Inland Empire` while `seo_area` stays `riverside` / `san-bernardino` (one region, two preserved URL trees).
- **Greenfield states with no generated pages** (e.g., Washington) can take clean new slugs freely.

### 8. Cluster sizing
- **Split** clusters that are too coarse to be findable. (OC "Saddleback Valley" = 8 cities → split into `Mission Viejo & Lake Forest`, `Aliso Viejo & Laguna Hills`, `Rancho Santa Margarita & Coto de Caza`.)
- **Group** adjacent cities/neighborhoods into 1–3 name clusters rather than leaving singletons scattered.
- Big single cities are split by **ZIP** into neighborhoods (Seattle, Chicago, Tacoma/Spokane districts, Vancouver/Bellingham).

### 9. `geo_sector` places the state in the right band
Set it so the state appears under the correct top-level grouping (e.g., Washington and California = `west_coast`; Illinois = `midwest`).

---

## Data hygiene (must always hold)

- **No `NULL` `market_area`.** Every office has a region. (Fixed 50 orphaned City-of-LA offices that had none.)
- **No default-value leakage.** `local_area = "Orange County"` had bled onto out-of-state offices as a default — never let a default region/local from one place stick to another. (Legit exception: NY's real Orange County / Hudson Valley.)
- **No `market_area = local_area`** anywhere (Rule 5).
- **Consistent state names.** One canonical spelling per state. _Open issue:_ `NV` and `Nevada` both exist as state values and should be merged (changes `/dental/nv/` URLs → needs 301 redirects).
- **Every level filled** where the hierarchy supports it: region, local area, sub-area all populated.

---

## Reference patterns (worked examples)

**Orange County** (region) → `North / Central / South Orange County` (local) → city clusters (sub), e.g.
`Fullerton, Brea & La Habra` · `Buena Park & Cypress` · `Garden Grove & Westminster` · `Mission Viejo & Lake Forest`.

**Los Angeles County** (region, URL `/los-angeles/`) → `San Fernando Valley`, `San Gabriel Valley`, `Westside`, `South Bay`, `Central LA & Hollywood`, … (local) → neighborhoods (sub), e.g. `Downtown LA`, `Koreatown & Mid-Wilshire`, `Hollywood & Los Feliz`.

**Inland Empire** (region; merged Riverside + San Bernardino) → `High Desert`, `Temecula & Murrieta`, `West End`, `Riverside & Moreno Valley`, … (local).

**Washington** (greenfield) → metro regions: `Seattle`, `Eastside`, `North Sound`, `South King County`, `Tacoma`, `Olympia`, `Kitsap Peninsula`, `Spokane`, `Tri-Cities`, `Yakima Valley`, `Clark County` (Vancouver), `Whatcom County` (Bellingham), `Wenatchee Valley`.

**Chicago** (region) → 8 Sides (local) → neighborhoods (sub), e.g. `Lincoln Park & Lakeview`, `Hyde Park, Kenwood & Woodlawn`, `Wicker Park & West Town`.

---

## Checklist for sorting a new state / region

1. Pull every city with office counts + average lat/lng (+ ZIPs for single-city metros).
2. Decide regions (`market_area`) by **local identity** — metro or county, never a single city (Rules 2–4).
3. Within each region, define `local_area` clusters locals recognize; ensure `local_area ≠ market_area` (Rules 5–6).
4. Add `sub_area` neighborhoods / tight city-clusters; split anything too coarse (Rule 8).
5. Set `geo_sector` and, if pages already exist, pin `seo_area` to preserve URLs (Rules 7, 9).
6. Verify: 0 null regions, 0 `market_area = local_area`, 0 missing levels, all cities covered.

---

## Open items

- **`NV` → `Nevada`** state merge (URL impact; needs redirects).
- **Bay Area** nit: `San Francisco County` → `San Francisco`.
- **TX, FL, AZ, PA, NJ, CT, RI, OH** — regions exist but not yet reviewed against these rules.
- **Coverage gaps:** some metros are city-only with no suburbs in the data (e.g., Chicago has no Naperville/Evanston). That's a data-sourcing gap, not a sorting problem.
