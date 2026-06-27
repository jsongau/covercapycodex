# 07 — Title / Meta / H1 Quality Audit

On-page SEO audit of title tags, meta descriptions, and H1s across all 11,396 `/dental/` pages.
Method: programmatic extraction via `grep -hoE` + `sort | uniq -c` and length scoring with `awk`.
Updated June 2026.

Build example URL from parts (state/market/city/dentist slug), e.g.
`/dental/california/orange-county/fountain-valley/kyt-dental-services/`.

---

## TIER MAP (by path depth, confirmed)

| Tier | Pages | Path shape | Page type |
|------|-------|-----------|-----------|
| T3 state hub | 15 | `dental/{state}/` | state hub |
| T3.5/T4a hub | 171 | `dental/{state}/{market}/` | regional + metro hub |
| T4c city | 563 | `dental/{state}/{market}/{city}/` | city page |
| T5 dentist | 10,647 | `dental/{state}/{market}/{city}/{dentist}/` | dentist profile |

---

## 1. DUPLICATE / NEAR-DUPLICATE TITLES & METAS (quantified)

The dominant problem at this scale. Multi-location chains share identical name + city, producing collisions because the template has no per-office differentiator.

**T5 (10,647 pages):**
| Element | Unique | Duplicates | % duplicated |
|---------|--------|-----------|--------------|
| Title | 6,995 | **3,652** | **34.3%** |
| Meta description | 7,128 | **3,519** | **33.1%** |
| H1 | 6,590 | **4,057** | **38.1%** |

Worst offenders (identical title on N pages): "Dental Group of Amarillo…" x12, "Sonrisa Family Dental | Chicago, IL" x8, "Abbeville Dentistry | Lubbock, TX" x8, "Rodeo Dental & Orthodontics of Laredo" x8. H1 collisions are driven by chains: "Coast Dental" x20, "Western Dental & Orthodontics" x16, "NÜVA Smile" x16, "Affordable Dentures & Implants" x14.

**Hub tiers:** T3/T4/city titles are unique (city/market name is in every one). The structural duplication risk is the boilerplate suffix — every T4c city title is literally `PPO Dentists in {City}, {ST} — In-Network Dental Offices | CoverCapy`, near-identical pattern that Google can treat as templated thinness, but the variable token keeps them technically unique.

**Impact:** ~3,500+ T5 pages compete against their own siblings for the same SERP. Google will pick one and may omit the rest. Fix = inject a per-office differentiator (neighborhood, lead doctor, or top procedure) into title/H1/meta.

---

## 2. LENGTH COMPLIANCE (title <=60, meta <=155)

| Tier | Titles over 60 | Metas over 155 |
|------|----------------|----------------|
| T3 state | 73.3% | 100% |
| T4 hub | 34.5% | 95.9% |
| T4c city | 100% | 88.6% |
| T5 dentist | **96.2%** | **99.8%** |

Average T5 title length is **78 chars** — well past the ~60-char SERP truncation point, so the `| CoverCapy` brand and often the city get cut off in results. Meta descriptions are almost universally over 155 (the rating sentence + boilerplate CTA pushes them to ~180–210). Truncation isn't fatal but it wastes the most clickable real estate and buries the keyword tail.

---

## 3. KEYWORD TARGETING vs COMPETITORS

Competitor formula (from `research/dentist-hub/03-competitor-directories.md`):
`20 Best PPO Dentists Near {City}, {ST} (2026)` — stacks **numbered "Best N" + "near me" + {city} + year token**. Healthgrades/WebMD/Yelp/Opencare all do this.

Current CoverCapy state:
| Signal | Present? |
|--------|----------|
| "PPO dentist" | ✓ everywhere (strong) |
| "in-network" | ✓ on city/hub titles |
| {City}, {ST} | ✓ everywhere |
| Carrier name in title | ✗ never (no `[carrier] dentist` pages exist) |
| **"near me" / "near {city}"** | ✗ — only **11 of 11,396** titles contain "near"; zero "near me" |
| **Year / freshness token (2026)** | ✗ — **0 of 11,396** titles |
| Numbered "Best N" promise | ✗ on hubs (we lead with raw count "573+ PPO Dentists") |

**Gaps:** (a) no "near me" capture — the single highest-volume dental query class; (b) no year/freshness token — competitors all signal recency; (c) no carrier-scoped titles ("Delta Dental PPO Dentists Near {City}") — an entire silo of `[carrier] dentist` demand is uncaptured.

---

## 4. H1 QUALITY & UNIQUENESS

- **Multi-H1 risk: none.** Every sampled page has exactly one `<h1>` (`hero-headline`). Good.
- **Hub H1s lead with the count** ("573+ PPO Dentists in North Carolina"). Fine, but doesn't carry "near me" or year.
- **City H1:** `PPO Dentists in {City}, {ST}` — clean, unique per city.
- **T5 H1 = raw practice name only** (`Thrive Family Dental`) with no city/qualifier. This is why 38% of H1s collide across chains. The H1 should append the locator so each is unique and keyword-bearing.

---

## 5. MISSING / WEAK META

- No tier is missing a meta description — every page has one. No blank/null metas found.
- Weakness is **length + sameness**, not absence. T5 metas all open with `{name} is an in-network PPO dentist in {city}…` and close with the identical `…verify your PPO coverage free with CoverCapy.` CTA — ~33% are byte-identical across siblings.
- Hub metas exceed 155 on ~96–100% of pages.

---

## REWRITE TEMPLATES (per tier)

Variables: `{N}` office count, `{City}`, `{ST}` abbr, `{State}`, `{Market}`, `{Name}` practice, `{Hood}` neighborhood/local area, `{Doc}` lead doctor, `{Carrier}`, `{YEAR}` freshness token, `{Rating}`, `{Reviews}`.

### T3 — State hub
- **Title** (<=60): `{N}+ PPO Dentists in {State} ({YEAR}) | CoverCapy`
- **Meta** (<=155): `Find in-network PPO dentists across {State}. {N}+ verified offices accepting Delta Dental, Cigna, MetLife and more. Verify coverage free.`
- **H1**: `{N}+ PPO Dentists in {State}` (keep)

### T4a/T3.5 — Metro / regional hub
- **Title** (<=60): `{N} Best PPO Dentists Near {Market}, {ST} ({YEAR})`
- **Meta** (<=155): `{N}+ in-network PPO dentists near {Market}, {ST}. Compare top-rated offices, accepted carriers, hours. Verify your PPO coverage free with CoverCapy.`
- **H1**: `Best PPO Dentists Near {Market}, {ST}`

### T4c — City page
- **Title** (<=60): `{N} Best PPO Dentists in {City}, {ST} ({YEAR})`
- **Meta** (<=155): `{N} in-network PPO dentists in {City}, {ST}. Top-rated offices accepting major PPO carriers near you. Verify coverage free with CoverCapy.`
- **H1**: `Best PPO Dentists Near {City}, {ST}`  (adds "near" intent over current)

### T5 — Dentist profile (the priority fix)
Add a `{differentiator}` = `{Hood}` (neighborhood/local-area) when available, else `{Doc}`, else top procedure — guarantees uniqueness across chains.

- **Title** (<=60): `{Name} | PPO Dentist in {City}, {ST} | CoverCapy`
  - Drop the `Top-Rated `/`Highly Rated ` prefix from the *title* (it eats chars and pushes to 78 avg); keep rating in meta. If room remains and a differentiator exists: `{Name} — {Hood} PPO Dentist, {City} {ST}`.
- **Meta** (<=155): `{Name}, in-network PPO dentist in {City}, {ST}. {Rating}★ ({Reviews} reviews), accepting {Carrier1}. Verify your PPO coverage free.`
  - Trim trailing boilerplate; lead carrier + rating earlier.
- **H1**: `{Name} — PPO Dentist in {City}, {ST}`  (append locator so chain H1s become unique and keyword-bearing)

### NEW — Carrier-scoped pages (silo to build)
- **Title**: `{Carrier} PPO Dentists Near {City}, {ST} ({YEAR}) | CoverCapy`
- **H1**: `{Carrier} PPO Dentists Near {City}, {ST}`
- Captures the entirely uncaptured `[carrier] dentist near me` demand.

---

## FRESHNESS / YEAR TOKEN RECOMMENDATION

Add a `{YEAR}` token to all hub + city titles (and optionally a "Updated {Month} {YEAR}" line in body, not title). Define once at the top of the generator:

```js
const SEO_YEAR = new Date().getFullYear();   // 2026
```

Rendered inline as `(${SEO_YEAR})`. This matches WebMD/Yelp/Healthgrades recency signaling and updates automatically on every rebuild — no manual edits. Do **not** add the year to T5 profile titles (profiles aren't ranked-list pages and the year reads oddly on a single office). Keep em-dashes OUT (CLAUDE.md rule) — current T3/T4 titles use ` — ` and must be switched to `(${SEO_YEAR})` or `|` separators anyway, which conveniently removes the em-dash violation.

---

## GENERATOR CHANGES (seo-build/generate-plans.js)

All edits in the generator; never hand-edit `dental/`. Rebuild from repo root.

1. **Add near top:** `const SEO_YEAR = new Date().getFullYear();`
2. **T3 state hub** (line ~3035): replace
   `PPO Dentists in ${stateName} — ${totalOffices}+ PPO Offices Listed | CoverCapy`
   with `${totalOffices}+ PPO Dentists in ${stateName} (${SEO_YEAR}) | CoverCapy` (removes em-dash, adds year, fits 60).
3. **T4a metro hub** (line 1212): `PPO Dentists in ${market_area}, ${abbr} (${office_count}+ Offices) | CoverCapy` → `${office_count} Best PPO Dentists Near ${market_area}, ${abbr} (${SEO_YEAR})`. Update H1 line 1325 to `Best PPO Dentists Near ${esc(market_area)}, ${abbr}`.
4. **T4b local-area hub** (line 2833): mirror #3.
5. **T4c city** (lines 1473–1475): `PPO Dentists in ${titleCity}, ${abbr} | ${N} In-Network…` → `${N} Best PPO Dentists in ${titleCity}, ${abbr} (${SEO_YEAR})`. Update H1 line 1631 to `Best PPO Dentists Near ${esc(city)}, ${abbr}`.
6. **T5 title** (line 1942): drop `${rTier}` from the title; append a uniqueness differentiator. Replace
   `const title = \`${name} | ${rTier}PPO Dentist in ${city}, ${abbr} | CoverCapy\`;`
   with a builder that appends `{Hood}`/`{Doc}` when the bare `{Name} | PPO Dentist in {City}, {ST}` would collide, and trims to <=60. Move `rTier` into the meta instead.
7. **T5 H1**: append `, ${abbr}`/city locator to the practice-name H1 so chain H1s become unique.
8. **T5 meta** (line 1947): front-load rating + lead carrier, shorten the closing CTA to land <=155.
9. **Shorten all hub metas** to <=155 (drop redundant clauses).
10. **(Phase next)** add `buildCarrierCityPage()` for the `[carrier] dentist near {city}` silo.

After edits: `cd <repo root> && node seo-build/generate-plans.js` (Mac Terminal, full ~8 min), then commit `dental/` only.
