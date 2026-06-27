# 08 — Tier Taxonomy T1–T6 (Nationwide Dentist Directory)

**CoverCapy SEO Information Architecture | June 2026**

This document formalizes a clean **T1–T6** tier hierarchy for the nationwide PPO dentist
directory, reconciles it with the **existing on-disk tiers (T3–T5)**, and defines the
canonical breadcrumb chain at every level.

---

## 0. What exists on disk today (ground truth)

Verified by walking `/dental/` (depth = path segments after `dental/`):

| Segments | Count | What it is | Current CLAUDE.md name |
|----------|-------|-----------|------------------------|
| `dental/{state}/` | 15 | State hub | **T3** |
| `dental/{state}/{market-or-region}/` | 171 | Metro market **or** regional hub | **T3.5 / T4a / T4b** |
| `dental/{state}/{market}/{city}/` | 563 | City page | **T4c** |
| `dental/{state}/{market}/{city}/{dentist}/` | 10,647 | Dentist profile | **T5** |

Key findings:
- **`dentist.html` does NOT yet exist** at repo root. `find-my-dentist.html` is the live
  interactive search app; it is not a crawlable hub. A national hub must be created.
- **Regional hubs (T3.5, e.g. `southern-california/`) sit at the SAME path depth as metro
  markets (T4a).** They are a *content* distinction, not a *URL-depth* distinction. The
  flat depth-3 namespace already mixes `regional` and `metro` `hub_type` rows from the
  `markets` table. This is the crux of the reconciliation.
- The on-disk tree is only **4 levels deep** (state → market → city → dentist). There is no
  physical 5th directory level for "region above state." Regions are siblings of metros.

**Implication:** A literal "T2 = region directory above the state folder" would force a
URL like `/dental/west/california/...` and re-home all 11,396 pages. That is maximally
disruptive and **rejected**. The defensible move is to keep the physical tree, add a
national hub above it, and treat region as a *navigational/breadcrumb* layer, not a URL
segment.

---

## 1. Decision: Renumber to a clean T1–T6, keep all URLs

We adopt **option (b)-plus**: keep every existing `/dental/...` URL exactly as-is, add the
national hub above, and **renumber the labels** so the documentation is internally
consistent T1→T6 with no fractional tiers (no more T3.5/T4a/b/c).

- **No file moves. No redirects. Zero URL churn.**
- The only new artifact is the national hub at **`/dentist`** (from `dentist.html`).
- "Region" (West/South/Northeast/Midwest) becomes a **breadcrumb + hub-grouping layer**,
  not a folder. State hubs gain a region breadcrumb crumb pointing at an on-page anchor
  on `/dentist` (or an optional `/dentist/{region}/` index — see §5, optional).

This collapses the messy `T3.5 / T4a / T4b / T4c` into clean named tiers.

---

## 2. The T1–T6 tier table

| Tier | Page type | Example URL | Primary search intent | JSON-LD type | On-disk status |
|------|-----------|-------------|-----------------------|--------------|----------------|
| **T1** | **National hub** | `/dentist` (from `dentist.html`) | "PPO dentist near me", "find a dentist", "dentist that takes my PPO" (nationwide, geolocation-aware) | `WebSite` + `SearchAction` + `CollectionPage` + `ItemList` (states) | **NEW — must build** |
| **T2** | **Region hub** (West / South / Northeast / Midwest) | `/dentist#west` anchor (or optional `/dentist/west/`) | "PPO dentists in the [West/South]", broad multi-state browse | `CollectionPage` + `ItemList` (states in region) | **Navigational layer** (no folder today) |
| **T3** | **State hub** | `/dental/california/` | "dentists in California", "California PPO dentists" | `CollectionPage` + `ItemList` (markets) + `BreadcrumbList` | **Exists (was T3)** |
| **T4** | **Metro / County / Regional-cluster hub** | `/dental/california/los-angeles/` · `/dental/california/southern-california/` | "Los Angeles dentists", "Orange County PPO dentist" | `CollectionPage` + `ItemList` (cities) + `BreadcrumbList` | **Exists (was T3.5 / T4a / T4b)** |
| **T5** | **City page** | `/dental/california/los-angeles/west-hollywood/` | "dentist in West Hollywood", "[city] PPO dentist" | `CollectionPage` + `ItemList` (dentists) + `BreadcrumbList` | **Exists (was T4c)** |
| **T6** | **Individual dentist profile** | `/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/` | "[practice name]", "[dentist] reviews", "does [office] take Delta Dental" | `Dentist` + `LocalBusiness` + `MedicalOrganization` + `AggregateRating` + `FAQPage` + `BreadcrumbList` | **Exists (was T5)** |

> **Old → new label map:** T3→T3 (unchanged), T3.5/T4a/T4b→**T4**, T4c→**T5**, **old T5→T6**.
> New tiers added: **T1** (national), **T2** (region). The big mental shift is *the dentist
> profile is now T6, not T5*. Update CLAUDE.md references accordingly.

---

## 3. Breadcrumb templates per tier

All breadcrumbs are `BreadcrumbList` JSON-LD **and** a visible `<nav>`. Region (T2) is a
crumb on the trail but its `item` points at the region anchor/index — it never adds a URL
segment to the canonical page path.

```
T1 National
  Home › Find a Dentist
  /  ›  /dentist

T2 Region (browse view on the national hub)
  Home › Find a Dentist › West
  /  ›  /dentist  ›  /dentist#west   (or /dentist/west/ if §5 adopted)

T3 State
  Home › Find a Dentist › West › California
  /  ›  /dentist  ›  /dentist#west  ›  /dental/california/

T4 Metro / Region cluster
  Home › Find a Dentist › West › California › Los Angeles
  /  ›  /dentist  ›  /dentist#west  ›  /dental/california/  ›  /dental/california/los-angeles/

T5 City
  Home › Find a Dentist › West › California › Los Angeles › West Hollywood
  … › /dental/california/los-angeles/  ›  /dental/california/los-angeles/west-hollywood/

T6 Dentist
  Home › Find a Dentist › West › California › Los Angeles › West Hollywood › Smiles Dental
  … › …/west-hollywood/  ›  …/west-hollywood/smiles-dental-ca-a1b2c3/
```

**Pragmatic breadcrumb note:** The existing T6 (dentist) JSON-LD has a 4-level
`BreadcrumbList` (state → market → city → dentist). To avoid a 7-level crumb becoming
visually heavy, **keep the visible breadcrumb starting at the state** but add Home + Find a
Dentist as the first two `BreadcrumbList` `itemListElement` entries. Region (T2) may be
omitted from the *visible* dentist crumb for space but **should remain in the
`BreadcrumbList` schema** so Google sees the full silo. Minimum required for every tier:
`Home › Find a Dentist › {State} › … › {current}`.

---

## 4. URL canon

| Tier | Canonical URL pattern | Trailing slash | Index file |
|------|----------------------|----------------|-----------|
| T1 | `/dentist` | no slash (top-level page) | `dentist.html` → served at `/dentist` |
| T2 | `/dentist#{region-slug}` (anchor) — *optional folder `/dentist/{region}/`* | n/a (anchor) | n/a |
| T3 | `/dental/{state}/` | yes | `index.html` |
| T4 | `/dental/{state}/{market\|region}/` | yes | `index.html` |
| T5 | `/dental/{state}/{market}/{city}/` | yes | `index.html` |
| T6 | `/dental/{state}/{market}/{city}/{dentist-slug}/` | yes | `index.html` |

- T6 dentist slug = `d.slug` (preferred) or `slugify(d.name)`. **Never `d.seo_path`.**
- T3–T6 URLs are **unchanged from today** — this taxonomy is purely additive + relabel.
- `self-referential canonical` on every page; T1 canonical = `https://covercapy.com/dentist`.

---

## 5. "Near me" / geolocation vs. static location pages

This is the single most important intent split. Treat **T1 as the dynamic layer** and
**T3–T6 as the static, crawlable layer**.

- **T1 `/dentist` is the only geolocation-aware tier.** It is the landing page that ranks
  for and answers **"PPO dentist near me"** and **"find a dentist."** It carries:
  - A `WebSite` + `SearchAction` (`potentialAction`) so Google can surface a sitelinks
    search box for the national directory.
  - A client-side geolocation prompt ("Use my location") that, on consent, deep-links the
    user to the nearest **T5 city page** or runs the `find-my-dentist` radius search.
    Geolocation is **progressive enhancement** — the page is fully crawlable and useful
    with JS off (it renders the browseable state/region/metro index below the fold).
  - A "Browse by state" `ItemList` linking down to all T3 state hubs (the crawl path).
- **"Near me" must NOT spawn URLs.** Do not generate `/dentist/near-me/` or lat-long
  permutation pages. Near-me is satisfied by (a) ranking T1 for the head term and (b)
  ranking the static T5 city / T4 metro pages for "[place] dentist." Google maps "near me"
  to the user's implicit location and serves the matching static location page.
- **Static location pages (T3–T6) carry the geographic long tail.** Each is fixed, indexed,
  and linked. They never depend on geolocation; their relevance is the place name in the
  URL, title, H1, and `LocalBusiness`/`areaServed` schema.
- **Optional (§5 folder):** If region browse demand justifies it, ship four thin static
  region indexes `/dentist/west/`, `/dentist/south/`, `/dentist/northeast/`,
  `/dentist/midwest/` as real T2 pages (each an `ItemList` of its states). This upgrades
  the T2 anchor to a crawlable folder **without touching any `/dental/` URL**. Recommended
  only after T1 ships and is indexed.

---

## 6. How `dentist.html` (T1) links down the silo

The national hub is the top of the crawl funnel. Required outbound link blocks, in order:

1. **Geolocation CTA** → on consent, nearest T5 city page or `find-my-dentist` results.
2. **Browse by region (T2)** → 4 region groupings; each lists its states (anchors or
   `/dentist/{region}/`).
3. **Browse by state (T3)** → flat `ItemList` of all 15 live state hubs
   (`/dental/{state}/`), grouped under their region heading. This is the primary crawl path
   and the `ItemList` schema payload.
4. **Top metros (T4)** → a curated rail of high-volume metro hubs
   (`/dental/california/los-angeles/`, etc.) for direct deep links to important pages.
5. **Carrier entry points** → "Dentists that take Delta Dental / Cigna / Aetna PPO" — link
   to filtered views (future), reinforcing the PPO positioning.

Reciprocal up-links: every T3 state hub links **up to `/dentist`** ("‹ All states") and its
region; every T4/T5/T6 page's breadcrumb chains back through `/dentist` at the root.

---

## 7. Migration note — what (if anything) renames

**Net file/URL changes: effectively zero. This is a documentation + one-new-page change.**

| Action | Disruption | Required? |
|--------|-----------|-----------|
| Build `/dentist` (T1 national hub) from `dentist.html` | New page only | **Yes** |
| Relabel tiers in CLAUDE.md: T3.5/T4a/b→T4, T4c→T5, old-T5→**T6**; add T1, T2 | Docs only | **Yes** |
| Update generator comments/function-doc tier labels (`buildDentistPage` = T6, `buildCityPage` = T5, `buildMetroHub`/`buildLocalAreaHub`/`buildRegionalHub` = T4, `buildStateHub` = T3) | Comments only, no logic | **Yes (cosmetic)** |
| Add `Home › Find a Dentist [› Region]` crumbs to every tier's `BreadcrumbList` + state up-link to `/dentist` | Generator edit, regen `/dental/` | **Yes** |
| Add `WebSite`+`SearchAction` schema to `/dentist` | New page | **Yes** |
| Add 4 region indexes `/dentist/{region}/` | 4 new pages | **Optional (Phase 2)** |
| Rename any `/dental/...` folder | — | **NO — never** |
| Touch `d.seo_path` | — | **NO — stays ignored** |

**Why minimal:** Region is absorbed as a breadcrumb/grouping layer rather than a URL
segment, so the 11,396 existing pages keep their exact paths. The only structural addition
is the single national hub above the tree. The rename is purely a relabeling of tiers in
docs and the regeneration of breadcrumbs/up-links — no canonical URL changes, no redirects,
no sitemap churn beyond adding `/dentist` (and optionally 4 region URLs).

**Function → tier reference (post-rename):**
`buildStateHub` = T3 · `buildMetroHub` / `buildLocalAreaHub` / `buildRegionalHub` = T4 ·
`buildCityPage` = T5 · `buildDentistPage` = **T6**. New: `buildNationalHub` = T1 (and
optional `buildRegionHub` = T2).
