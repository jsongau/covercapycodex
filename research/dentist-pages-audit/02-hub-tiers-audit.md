# Hub Tiers SEO Audit — /dental/ State, Regional, Metro, City

Scope: T3 state hubs, T3.5 regional hubs, T4a metro/county hubs, T4c city pages.
Sampled (real paths discovered via `find`):

- **State (T3):** `/dental/california/`, `/dental/texas/` (titles), plus discovery across all 16 state dirs.
- **Regional (T3.5):** `/dental/california/southern-california/`, `/dental/california/northern-california/`.
- **Metro (T4a):** `/dental/california/los-angeles/`.
- **City (T4c):** `/dental/california/los-angeles/pasadena/`.

Generator source of truth: `seo-build/generate-plans.js` (gitignored; recommendations only — do not commit).

Note: pages are served from `https://www.covercapy.com` (www host) with full trailing slashes; canonicals use www + trailing slash consistently on index pages.

---

## 1. JSON-LD by tier

| Schema node | T3 State | T3.5 Regional | T4a Metro | T4c City |
|---|---|---|---|---|
| Organization / WebSite | ✓ / ✓ | ✓ / ✗ | ✓ / ✓ | ✓ / ✓ |
| MedicalWebPage (page node) | ✓ | ✓ | ✓ | ✓ |
| BreadcrumbList | ✓ (2 items) | ✓ (3 items) | ✓ (3 items) | ✓ (4 items) |
| Place / State / City | ✗ | ✗ | ✓ Place+State+AggregateRating | ✓ City+State |
| **ItemList (child dentists)** | ✗ | ✗ | ✓ (~20 Dentist items) | ✓ (×2; 13 Dentist) |
| LocalBusiness | ✗ | ✗ | ✗ | ✓ |
| **FAQPage** | ✓ (3 Q) | ✗ | ✓ (10 Q) | ✓ (7 Q) |
| SpeakableSpecification | ✗ | ✗ | ✓ | ✓ |
| CollectionPage | ✗ (none anywhere) | ✗ | ✗ | ✗ |

Findings:
- **No `CollectionPage` type anywhere.** Hubs are directory/list pages; `CollectionPage` (or `ItemList`-on-page) is the correct primary type. State + regional hubs in particular are list pages with no ItemList at all.
- **T3.5 Regional hub is the weakest tier:** no ItemList, no FAQPage, no WebSite node, no Place/State node. It is effectively a thin link-stub.
- **State hub has no ItemList** of its child metros (only an in-body grid). Metros are the natural ItemList here.
- **Label drift in BreadcrumbList `name`:**
  - State hub's OWN breadcrumb pos2 = `"California PPO Dentists"` (gen line 3063: `${stateName} PPO Dentists`).
  - Every CHILD tier's pos2 backlink = `"California Dentists"` (gen lines 1247/1508/1977/2851: `${state} Dentists`).
  - Cross-state the suffix is also inconsistent: TX schema pos2 = `"Texas PPO Dentists"` vs CA child crumbs `"... Dentists"`. The same state node is named three different ways across the graph.
- **Visible vs schema mismatch on state hub:** visible breadcrumb final crumb = `"California Dentists"`; schema pos2 name = `"California PPO Dentists"`. Visible/schema breadcrumb text should match.

## 2. Title / meta / H1 patterns & lengths

| Tier | Title pattern | Len | H1 |
|---|---|---|---|
| T3 | `PPO Dentists in {State} — {N}+ PPO Offices Listed \| CoverCapy` | ~58 | `{N}+ PPO Dentists in {State}` |
| T3.5 | `PPO Dentists in {Region} — {N}+ PPO Offices Listed \| CoverCapy` | ~62 | `{N}+ PPO Dentists in {Region}` |
| T4a | `PPO Dentists in {Metro}, {AB} ({N}+ Offices) \| CoverCapy` | ~57 | `{N}+ PPO Dentists in {Metro}` |
| T4c | `PPO Dentists in {City}, {AB} — In-Network Dental Offices \| CoverCapy` | ~63 | `PPO Dentists in {City}, {AB}` |

- Patterns are consistent and keyword-led ("PPO Dentists in {place}"). Good.
- **Freshness present** in body ("updated June 2026", `dateModified` 2026-06-23) but NOT in the title/meta — fine; year is in stat pills.
- **No "near me" or "best dentists in {city}" optimization.** No H2/FAQ targeting "dentist near me", "best PPO dentist in {city}", or "{carrier} dentist in {city}" — large missed intent cluster, especially on city pages.
- Title-length guard exists only for city/local pages (gen 1474–1475, 2834). Regional title (~62) can exceed 60 with longer region names — no guard.
- Duplication risk is **low** (place name varies); the bigger risk is **thin near-duplicate body prose** — see §5.

## 3. Breadcrumb (visible + schema)

- Visible breadcrumb present on all tiers, with microdata (`itemprop=position/name/item`). Position numbering correct and sequential within each page.
- **No "Find a Dentist" (`/dentist`) crumb at position 2.** Confirmed absent in both visible markup and JSON-LD across all tiers; every chain goes `CoverCapy → {State}` directly. The national `/dentist` hub is not yet wired into the silo. **Flag: insert `/dentist` as position 2 and shift all downstream positions +1.**
- State hub visible breadcrumb shows only 2 levels and the last crumb is plain text "California Dentists" — fine, but mismatches schema name (see §1).

## 4. Internal linking (crawlable down/up/sideways)

All child links are **server-rendered static `<a href>`** (no JS hydration) — good, crawlable.

| Tier | Links DOWN (count) | UP to parent | To `/dentist` hub |
|---|---|---|---|
| T3 State | Regions (2) + metros (9) as static cards + rail rows | Home only | **No** |
| T3.5 Regional | **metro-cards only** | State + Home | **No** |
| T4a Metro | City pills (35) + 20 dentist profile `<a>` | State + Home | **No** |
| T4c City | Dentist profile `<a>` (13) + sibling-city pills | Metro + State + Home | **No** |

Dead-end / defect flags:
- **`/dental/california/southern-california/` lists only 1 child metro (Orange County) and claims "1 metro areas" / 468+ offices** — but LA (411), San Diego (440), Inland Empire (206), Riverside, San Bernardino are all SoCal and are NOT linked from the SoCal regional hub. This regional hub is a **near crawl-dead-end and a data-mapping bug** (region→metro assignment in `buildRegionalHub` only received one marketSummary). `northern-california` correctly lists 5 — so the bug is regional-data-specific, not structural.
- **No tier links to the `/dentist` national hub** — silo has no top link equity path back to the national entry point.
- Metro/city dentist cards cap at ~13–20 with **no paginated "view all" link to remaining offices** (LA has 411 offices, 20 shown). Remaining dentists are reachable only via city pages — acceptable, but a "See all in {city}" should be explicit.

## 5. Content uniqueness / thin-content

- **T4a Metro & T4c City: real, unique local prose** (e.g., LA's "I had no idea which LA County dentist would take my Aetna…" narrative; per-page FAQ). Good — `noTwoIdentical`/varied block text confirmed (gen comment line 706).
- **T3 State: short, templated prose** (~2 sentences). Acceptable given the metro grid carries the value.
- **T3.5 Regional: thinnest** — a single generic sentence ("CoverCapy lists N+ … Select a metro area below"), no FAQ, no ItemList, minimal links. **Highest thin-content/low-value-page risk; combined with the SoCal data bug, candidate for Google "thin/duplicate" suppression.**

## 6. Canonical / trailing slash / host

- Canonicals correct (self-referential, www, trailing slash) on all sampled hubs.
- **Trailing-slash inconsistency in metro→city pill links:** metro hub builds `…/los-angeles/burbank` (NO trailing slash, gen line 1272), while city pages canonicalize to `…/burbank/` (WITH slash) and city-page sibling pills DO include the slash (gen line 1583). Result: crawlable internal links point to the non-canonical (redirected) URL form, wasting a redirect hop on every metro→city link. **Fix: add trailing slash in the metro `cityPill` template.**

## 7. ItemList vs rendered cards

- Rendered dentist cards are **static `<a>`** (`dcard__profile-link href=…/profile/`) — not JS. Matches the JSON-LD `ItemList` `@id`s (same profile URLs). Metro: 20 cards = 20 ItemList items. City Pasadena: 13 cards = 13 Dentist items. Consistent.
- ItemList `item.@id` uses the canonical profile URL with trailing slash — good.

---

## Prioritized defect list

**P0 — correctness / crawl**
1. **SoCal regional hub data bug:** lists only 1 of ~5 child metros; count "468+ / 1 metro areas" is wrong; major metros orphaned from the region. Fix region→metro `marketSummaries` mapping in `buildRegionalHub` call site (gen ~3564 / `stateRegionalHubs` assembly).
2. **Breadcrumb label drift:** state-node name is rendered 3 ways (`{State} PPO Dentists` on state hub schema, `{State} Dentists` on child crumbs, plain `{State} Dentists` visible). Pick ONE canonical name and use everywhere.
3. **Metro→city pill links lack trailing slash** (gen 1272) → every metro→city internal link is a redirect hop to the canonical. Add `/`.

**P1 — silo / schema**
4. **Insert `/dentist` national hub as breadcrumb position 2** (visible + schema) on all tiers; shift downstream positions +1; and add a body link to `/dentist` from each hub (currently zero inbound).
5. **Regional hub is thin:** add FAQPage + ItemList(child metros) + WebSite/Place nodes + 2–3 paragraphs of region-specific prose.
6. **Add `CollectionPage` (or `ItemList`-as-mainEntity) typing** to state & regional hubs; add an ItemList of child metros on the state hub.

**P2 — intent coverage**
7. **No "near me" / "best dentist in {city}" / "{carrier} dentist in {city}" targeting** — add an H2 + FAQ entries on city/metro pages.
8. **No explicit "See all N offices in {city}"** link when cards are truncated (LA 411 → 20 shown).
9. Regional title length guard missing (>60 possible).

---

## Concrete generator fix patterns (do NOT edit; recommend)

All in `seo-build/generate-plans.js`. Rebuild from repo root: `node seo-build/generate-plans.js`.

**A. Canonical state-node breadcrumb name (one constant).** Replace the three variants:
```js
const stateCrumb = `${state} PPO Dentists`;          // single source
// pos2 everywhere:
{'@type':'ListItem','position':3,'name':stateCrumb,'item':`${BASE_URL}/dental/${stSlug}/`}
```
Apply at gen lines 1247, 1508, 1977, 2851 (child crumbs) AND 3063 (state-hub self crumb) AND the visible breadcrumb `<span>` on the state hub. Then re-number after inserting `/dentist` (B).

**B. Insert `/dentist` at position 2 (all tiers, visible + schema):**
```js
{'@type':'ListItem','position':2,'name':'Find a Dentist','item':`${BASE_URL}/dentist/`},
```
…and bump State→pos3, Metro→pos4, City→pos5, etc. Add a matching visible `<li>` and a body backlink to `/dentist/`.

**C. Metro city-pill trailing slash** (gen line 1272):
```js
`<a href="${BASE_URL}/dental/${stSlug}/${mkSlug}/${slugify(c.city)}/" class="city-pill-link">…`
//                                                              ^ add slash (match line 1583)
```

**D. Regional hub enrichment** (`buildRegionalHub`, gen ~3220): add to the `@graph` a `FAQPage` (reuse metro FAQ generator), an `ItemList` of `marketSummaries`, and `WebSite`/`Place` nodes; emit 2 paragraphs of region prose. First fix the upstream `marketSummaries` assembly so the region receives ALL its metros (root cause of the SoCal bug).

**E. CollectionPage typing** on state/regional `#webpage` node:
```js
'@type':['MedicalWebPage','CollectionPage'],
'mainEntity':{'@id':`${canonical}#dentist-list`}   // point at an added ItemList
```

**F. Add intent H2 + FAQ** on city/metro: e.g. `"Best PPO dentists near me in {city}"` H2 and a `"{carrier} dentists in {city}"` FAQ entry.
