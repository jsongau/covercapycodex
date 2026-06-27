# /dental/ Tier Breadcrumb + Schema + URL Audit

For the national hub `dentist.html`. Inspected real on-disk pages 2026-06-26.

---

## 0. Domain + URL canon (IMPORTANT: differs from CLAUDE.md)

- **All canonicals, breadcrumb links, and JSON-LD `item` values use `https://www.covercapy.com`** (with `www.`). CLAUDE.md's `BASE_URL` examples show `covercapy.com` without www — on disk it is **always `www`**. dentist.html must match: `https://www.covercapy.com`.
- All URLs have a **trailing slash**.
- Canon path: `/dental/{state}/{market-area}/{city}/{dentist-slug}/`.
- Homepage `https://www.covercapy.com/` is breadcrumb position 1 (label "CoverCapy") on every tier.
- **dentist.html sits ABOVE all of this** as the national tier. Recommended URL: `https://www.covercapy.com/dentist` (or `/dentists`). It becomes breadcrumb position 2 on every page below it, pushing each existing crumb down by one — see section 7.

---

## 1. Visible breadcrumb markup

### Hubs T3, T3.5, T4a, T4b/market, T4c city — identical pattern (`<ol>` microdata)
Container: `<main ... data-page-type="...">` then:

```html
<nav class="breadcrumb-bar" aria-label="Breadcrumb">
  <div class="wrap">
    <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="https://www.covercapy.com/" itemprop="item"><span itemprop="name">CoverCapy</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li><span aria-hidden="true"> / </span></li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="https://www.covercapy.com/dental/california/" itemprop="item"><span itemprop="name">California Dentists</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li><span aria-hidden="true"> / </span></li>
      <li><span>Southern California</span></li>   <!-- current page: no link, no microdata -->
    </ol>
  </div>
</nav>
```
- Separator is a standalone `<li><span aria-hidden="true"> / </span></li>`.
- Current/last crumb is a bare `<li><span>Label</span></li>` (not linked, NOT given microdata in the visible markup — only the JSON-LD carries it).
- Linked ancestor labels use the suffix " Dentists" (e.g. "California Dentists", "North Carolina Dentists"); the current-page crumb uses the short name (e.g. "Southern California", "Los Angeles County", "Alhambra", "Cape Fear Coast").

### T5 dentist page — DIFFERENT markup (no `<ol>`, no microdata)
```html
<nav class="crumb" aria-label="Breadcrumb"><div class="wrap">
  <a href="https://www.covercapy.com/">CoverCapy</a><span class="sep">/</span>
  <a href="https://www.covercapy.com/dental/california/">California</a><span class="sep">/</span>
  <a href="https://www.covercapy.com/dental/california/los-angeles/">Los Angeles County</a><span class="sep">/</span>
  <a href="https://www.covercapy.com/dental/california/los-angeles/alhambra/">Alhambra</a><span class="sep">/</span>
  <b>Evergreen Dental Care</b>
</div></nav>
```
- Classes `.crumb` / `.sep`; current page is `<b>`. Note state label here is bare **"California"** (NOT "California Dentists" as on hubs) — visible-label inconsistency.

---

## 2. BreadcrumbList JSON-LD (inside `@graph`)

`@id` = `{pageURL}#breadcrumb`, referenced from the page node's `"breadcrumb": {"@id": ...}`. Each item:
```json
{ "@type": "ListItem", "position": N, "name": "...", "item": "https://www.covercapy.com/..." }
```

| Tier | JSON-LD chain (name → item) |
|------|------|
| **T3 state** (`/dental/california/`) | 1 CoverCapy `/` · 2 "California PPO Dentists" `/dental/california/` |
| **T3.5 regional** (`/southern-california/`) | 1 CoverCapy · 2 "California Dentists" `/dental/california/` · 3 "Southern California PPO Dentists" |
| **T4a metro** (`/los-angeles/`) | 1 CoverCapy · 2 "California Dentists" · 3 "Los Angeles County PPO Dentists" — **region is SKIPPED** (3-level, goes straight state→metro) |
| **T4b market** (`/cape-fear-coast/`, `data-page-type="market-hub"`) | 1 CoverCapy · 2 "North Carolina Dentists" · 3 "Cape Fear Coast PPO Dentists" |
| **T4c city** (`/alhambra/`) | 1 CoverCapy · 2 "California Dentists" · 3 "Los Angeles County PPO Dentists" · 4 "Alhambra PPO Dentists" |
| **T5 dentist** | 1 CoverCapy · 2 "California Dentists" · 3 "Los Angeles County" · 4 "Alhambra" · 5 "{Practice name}" |

Naming inconsistencies inside JSON-LD itself:
- Position-2 state name varies: T3 self = "California PPO Dentists"; as an ancestor it's "California Dentists".
- "...PPO Dentists" suffix used on hub levels but T5 drops it for ancestors (uses plain "Los Angeles County", "Alhambra").

---

## 3. Canonical / title / meta-description patterns

| Tier | Canonical | Title | Meta description |
|------|-----------|-------|------------------|
| T3 | `/dental/{state}/` | `PPO Dentists in {State} — {N}+ PPO Offices Listed \| CoverCapy` | `Find {N}+ PPO dental offices listed across {State}. Browse by city or metro area...` |
| T3.5 | `/dental/{state}/{region}/` | `PPO Dentists in {Region} — {N}+ PPO Offices Listed \| CoverCapy` | `PPO dentists across {Region} — {sub-areas}...` |
| T4a | `/dental/{state}/{metro}/` | `PPO Dentists in {Metro}, {ABBR} ({N}+ Offices) \| CoverCapy` | `Find {N}+ verified PPO dentists in {Metro}, {State}...` |
| T4b | `/dental/{state}/{market}/` | `PPO Dentists in {Market}, {ABBR} ({N}+ Offices) \| CoverCapy` | (same family) |
| T4c | `/dental/{state}/{metro}/{city}/` | `PPO Dentists in {City}, {ABBR} — In-Network Dental Offices \| CoverCapy` | `{N} PPO-participating dental offices in {City}, {State}...` |
| T5 | `/dental/{state}/{metro}/{city}/{slug}/` | `{Name} \| Top-Rated PPO Dentist in {City}, {ABBR} \| CoverCapy` | `{Name} is an in-network PPO dentist in {City}, {State}... Rated {x}★ from {n} reviews...` |

All pages: `<meta name="robots" content="index,follow,max-image-preview:large,...">`, OG tags, and an `@graph` containing Organization (`#organization`), WebSite (`#website`), the page node (`MedicalWebPage` on hubs), BreadcrumbList, and FAQPage (hubs) / Dentist+LocalBusiness (T5).

---

## 4. Internal linking (up / down)

- **T3 state** → UP: none above (home only via crumb). DOWN: region cards (`state-region-card`), metro cards (`state-metro-card`), rail metro list. Links to `/dental/{state}/{region|metro}/`.
- **T3.5 region** → UP: state. DOWN: its metros.
- **T4a/T4b metro** → UP: state (crumb skips region). DOWN: city pills + dentist cards (`dcard__profile-link` → T5 built from slug).
- **T4c city** → UP: state, metro. DOWN: dentist cards → T5.
- **T5** → UP: state, metro, city (crumb). DOWN: "Nearby offices" rail (`nearby-card`) → sibling T5s.
- Dentist card profile URLs are built from parts (`/dental/{st}/{mk}/{city}/{slug}/`), per CLAUDE.md, NOT `seo_path`.

**For dentist.html:** link DOWN to all 14 distinct state hubs `/dental/{state}/`. Those hubs do NOT yet link UP to a national page — to silo cleanly, dentist.html should be added as position 2 in every tier's breadcrumb on the next generator run (currently they jump home→state).

---

## 5. State inventory (`ls dental/`) + size (index.html counts)

| State folder | index.html files | Status |
|---|---:|---|
| california | 4109 | real / dense |
| texas | 1183 | real |
| washington | 1137 | real |
| florida | 1150 | real |
| north-carolina | 611 | real |
| new-york | 426 | real |
| rhode-island | 430 | real (dense for size) |
| arizona | 405 | real |
| new-jersey | 373 | real |
| pennsylvania | 371 | real |
| illinois | 349 | real |
| **nv** | 292 | **DUPLICATE of nevada** |
| connecticut | 250 | real |
| **nevada** | 203 | **DUPLICATE of nv** |
| ohio | 107 | sparse |

14 distinct states (15 folders; nv + nevada are the same state). `sitemap-dental.xml` also at root. Sparsest real state: ohio (107). dentist.html should list **14 states** (collapse nv→nevada).

---

## 6. Architecture gotchas (CLAUDE.md vs disk)

1. **`www.` host on disk** — all canonicals/links use `https://www.covercapy.com`, not the bare `covercapy.com` in CLAUDE.md. Use `www`.
2. **Duplicate state: `dental/nevada/` AND `dental/nv/`** — both populated, both have distinct self-canonicals (`/dental/nevada/` and `/dental/nv/`). This is duplicate-content / cannibalization. Pick one (recommend `nevada` for slug consistency), 301 the other, exclude from sitemap, and have dentist.html link only to the survivor.
3. **Trailing-slash bug in T4c city JSON-LD** — position-3 metro `item` is emitted WITHOUT trailing slash (`.../los-angeles` vs visible link `.../los-angeles/`). Mismatch between visible crumb and schema; generator bug.
4. **Metro breadcrumb skips the region tier** — T4a JSON-LD + visible crumb go state→metro directly, omitting T3.5. Inconsistent depth vs URL hierarchy. dentist.html shouldn't assume region is always in the chain.
5. **T5 uses a totally different breadcrumb component** (`.crumb`/`.sep`/`<b>`, no microdata) and labels the state "California" while hubs label it "California Dentists". Two divergent breadcrumb systems. If reusing markup for dentist.html, use the hub `<ol>` microdata version (richer, indexable).
6. **JSON-LD label drift** — same node named "California PPO Dentists" / "California Dentists" / "California" depending on tier and position. Standardize before scaling.
7. **21 files still contain stale `/dentists/` paths** (e.g. `dental/new-york/buffalo/buffalo/index.html`, several texas hubs, `dental/california/los-angeles/burbank/coastland-dental/`). Confirms CLAUDE.md's stale-seo_path warning is still live in committed output.
8. **Doubled city slugs** — metro==city collisions like `dental/illinois/chicago/chicago/`, `dental/new-york/buffalo/buffalo/`, `dental/texas/austin/austin/`. dentist.html deep links must tolerate `/state/metro/metro/` shapes.

---

## 7. COPY-READY SPEC for dentist.html

**Hub URL:** `https://www.covercapy.com/dentist` (trailing slash → `/dentist/` to match site convention).

**Hub's own breadcrumb (2 levels):** CoverCapy `/` → "PPO Dentists" (current).

**When the next generator run inserts the national tier**, every page below shifts crumbs by +1. New chains:
- State: 1 CoverCapy → 2 "PPO Dentists" `/dentist/` → 3 "{State} Dentists" `/dental/{state}/`
- City: 1 CoverCapy → 2 "PPO Dentists" → 3 "{State} Dentists" → 4 "{Metro} PPO Dentists" → 5 "{City} PPO Dentists"
- Dentist: …→ 6 "{Practice}"

**Reuse this exact visible markup** (hub `<ol>` microdata version, www host, trailing slashes). **Reuse JSON-LD BreadcrumbList** with `@id={url}#breadcrumb` inside an `@graph` alongside Organization `#organization` + WebSite `#website`. **Fix on the way in:** (a) consistent state label, (b) trailing slash on every `item`, (c) collapse nv/nevada, (d) decide whether region tier appears in the chain.
