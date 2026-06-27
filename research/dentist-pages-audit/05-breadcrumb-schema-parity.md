# 05 — Breadcrumb Correctness + Visible↔Schema Parity Audit

QA of `BreadcrumbList` JSON-LD vs visible breadcrumb markup across all dentist tiers,
plus the canonical spec for inserting the new `/dentist` national hub. Source of truth:
`seo-build/generate-plans.js` (the `dental/` output is generated, never hand-edited).
Host on disk is `https://www.covercapy.com` (with `www`). All `/dental/` URLs trailing-slashed.

---

## 1. Per-tier audit (visible markup vs JSON-LD)

Generator line refs in parentheses.

### T3 State hub — `buildStateHub` (visible ~3111 / JSON-LD ~3060)
- **Visible:** 2 crumbs — `CoverCapy` (linked, pos 1) → `{State} Dentists` (current, bare `<span>`, no link).
- **JSON-LD:** pos 1 `CoverCapy` `/`; pos 2 **`{State} PPO Dentists`** → `item: canonical`.
- **PARITY FAIL (label):** visible says `{State} Dentists`, schema says `{State} PPO Dentists`. Same node, two names. Google compares visible text to schema `name` — flag.
- Positions 1..2 contiguous, structure OK, absolute URLs, trailing slash OK.

### T4 Regional hub — `buildRegionalHub` (visible ~3260)
- Same `<ol>` microdata pattern as metro. Visible: `CoverCapy` → `{State} Dentists` (linked) → `{Region}` (current).
- JSON-LD (per prior audit ~3234): pos 2 `{State} Dentists`, pos 3 `{Region} PPO Dentists`.
- **PARITY FAIL (label):** current crumb visible `{Region}` vs schema `{Region} PPO Dentists`.

### T4 Metro hub — `buildMetroHub` (visible ~1303 / JSON-LD ~1245)
- **Visible:** `CoverCapy` → `{State} Dentists` (linked, pos 2) → `{Market}` (current, bare).
- **JSON-LD:** pos 1 `CoverCapy`; pos 2 `{State} Dentists` `/dental/{state}/`; pos 3 `{Market} PPO Dentists` → canonical.
- **PARITY FAIL (label):** current crumb `{Market}` vs schema `{Market} PPO Dentists`.
- **Depth note:** metro chain goes state→metro, SKIPPING the region tier even when one exists. Inconsistent silo depth.

### T4 Local-area hub — `buildLocalAreaHub` (visible ~2889 / JSON-LD ~2849)
- **Visible:** `CoverCapy` → `{State} Dentists` → `{parentMarket}` (linked, pos 3) → `{localArea}` (current).
- **JSON-LD:** pos 2 `{State} Dentists`; pos 3 `{parentMarket} PPO Dentists`; pos 4 `{localArea} PPO Dentists`.
- **PARITY FAIL (label):** pos-3 visible `{parentMarket}` vs schema `{parentMarket} PPO Dentists`; current `{localArea}` vs `{localArea} PPO Dentists`.

### T5 City page — `buildCityPage` (visible ~1604 / JSON-LD ~1506)
- **Visible:** `CoverCapy` → `{State} Dentists` → `{Market}` (linked, pos 3) → `{City}` (current).
- **JSON-LD:** pos 2 `{State} Dentists` `/dental/{state}/`; pos 3 `{Market} PPO Dentists` → **`/dental/{state}/{market}`**; pos 4 `{City} PPO Dentists` → canonical.
- **PARITY FAIL (label):** pos 3 visible `{Market}` vs schema `{Market} PPO Dentists`; current `{City}` vs `{City} PPO Dentists`.
- **PARITY FAIL (URL — generator bug, line 1509):** pos-3 metro `item` is emitted **without trailing slash** (`/dental/${stSlug}/${mkSlug}` — note the missing final `/`), while the visible link AND the metro page's own canonical use the slash. Schema↔visible URL mismatch + 301-redirect target. Add the slash.

### T6 Dentist profile — `buildDentistPage` (visible ~2209 / JSON-LD ~1974)
- **Visible:** DIFFERENT component — `<nav class="crumb">` with `<a>`/`.sep`/`<b>`, **NO microdata** (no `itemscope`/`itemprop`). Labels: `CoverCapy` → **`{State}`** (bare, no "Dentists") → `{Market}` → `{City}` → `<b>{Practice}</b>`.
- **JSON-LD (~1974):** pos 1 `CoverCapy`; pos 2 **`{State} Dentists`**; pos 3 `{Market}`; pos 4 `{City}`; pos 5 `{Practice}`. All `item` URLs trailing-slashed and absolute. Positions 1..5 contiguous, structure OK.
- **PARITY FAIL (label):** pos-2 visible `{State}` vs schema `{State} Dentists`. Also drifts from every hub which uses `{State} Dentists` visibly.
- **STRUCTURAL FAIL:** the visible T6 crumb carries no microdata, so only the JSON-LD is machine-readable. Hubs use `<ol>` microdata; T6 should be unified to the same component for consistency and redundancy.

### Summary of defects
| Defect | Tiers affected | Type |
|---|---|---|
| Visible drops `PPO`/`Dentists` suffix vs schema (label parity) | T3, T4×3, T5 | Parity (label) |
| T6 pos-2 visible `{State}` vs schema `{State} Dentists` | T6 | Parity + drift |
| T5 pos-3 metro `item` missing trailing slash | T5 | Parity (URL) + redirect |
| T6 visible crumb has no microdata | T6 | Structure |
| Metro skips region tier | T4 metro | Depth consistency |
| `/dentist` national crumb absent everywhere | ALL | Missing tier |

Positions are otherwise correct (1..n, no gaps) on every tier; all `item` URLs are absolute.

---

## 2. Canonical label rule (one per tier — fixes all drift)

Adopt **one canonical `name` per node, used identically in visible text AND schema**, regardless of whether the node is the current page or an ancestor:

| Node | Canonical label (visible == schema) |
|---|---|
| Home | `CoverCapy` |
| National hub | `Find a Dentist` |
| Region (schema-only) | `{Region}` (e.g. `West`) |
| State | `{State} PPO Dentists` |
| Metro / Region cluster | `{Market} PPO Dentists` |
| City | `{City} PPO Dentists` |
| Dentist | `{Practice Name}` (no suffix) |

Rule: a node's label never changes based on position — kill the "ancestor uses `Dentists`, self uses `PPO Dentists`, T6 uses bare name" branching. One string, computed once, emitted in both the `<span itemprop="name">` and the JSON-LD `name`.

---

## 3. CANONICAL BREADCRUMB SPEC (incl. new `/dentist` hub)

`/dentist` is inserted at **position 2** on every tier; all existing crumbs shift **+1**.
National hub URL: `https://www.covercapy.com/dentist/` (trailing slash, matching site convention).
Region (T2) stays **schema-only** (omit from visible to control width) — its `item` points at `/dentist/#{region}` anchor; not a URL segment.

| Pos | Label (visible == schema) | item URL | Appears on tiers |
|----:|---|---|---|
| 1 | `CoverCapy` | `https://www.covercapy.com/` | all |
| 2 | `Find a Dentist` | `https://www.covercapy.com/dentist/` | all |
| 3 | `{Region}` *(schema only)* | `https://www.covercapy.com/dentist/#{region}` | T3–T6 (schema), not visible |
| 4 | `{State} PPO Dentists` | `.../dental/{state}/` | T3–T6 |
| 5 | `{Market} PPO Dentists` | `.../dental/{state}/{market}/` | T4–T6 |
| 6 | `{City} PPO Dentists` | `.../dental/{state}/{market}/{city}/` | T5–T6 |
| 7 | `{Practice Name}` | canonical (T6) | T6 |

Per-tier chains (schema positions shown; region is schema-only):
- **/dentist (T1):** `CoverCapy`(1) → `Find a Dentist`(2, current)
- **State (T3):** `CoverCapy`(1) → `Find a Dentist`(2) → `{Region}`(3) → `{State} PPO Dentists`(4, current)
- **Metro/Regional (T4):** …(3) → `{State} PPO Dentists`(4) → `{Market} PPO Dentists`(5, current)
- **City (T5):** …(4) → `{Market} PPO Dentists`(5) → `{City} PPO Dentists`(6, current)
- **Dentist (T6):** …(5) → `{City} PPO Dentists`(6) → `{Practice}`(7, current)

Visible breadcrumb may omit the region crumb (keep `CoverCapy / Find a Dentist / {State} PPO Dentists / …`), but visible `position` `<meta>` values must then still match the schema positions OR the visible crumb must renumber contiguously and the schema be treated as the canonical superset. **Recommended:** keep region out of BOTH visible and the `<meta>` numbering for simplicity, and out of JSON-LD too until `/dentist/{region}/` folders ship — i.e. drop pos 3 entirely and use a clean 1..n with `Find a Dentist` at pos 2. (Region as a real crumb only once it has a real URL.)

**Pragmatic recommended chain (region deferred):**
`CoverCapy`(1) → `Find a Dentist`(2) → `{State} PPO Dentists`(3) → `{Market} PPO Dentists`(4) → `{City} PPO Dentists`(5) → `{Practice}`(6).

---

## 4. Exact generator changes (describe — do not edit)

All edits in `seo-build/generate-plans.js`; rebuild from repo root, re-commit `dental/`.

1. **Add a shared helper** `crumbHome()` returning the two top crumbs (CoverCapy pos 1 + `Find a Dentist`→`${BASE_URL}/dentist/` pos 2) for both the visible `<li>` microdata block and the JSON-LD array, so every builder reuses one definition.

2. **State hub** (`buildStateHub`):
   - Visible (~3111–3120): insert `Find a Dentist` `<li>` as pos 2 after CoverCapy; bump the `{State}` current crumb's meta `position` 2→3; change its visible text to canonical `{stateName} PPO Dentists` (currently `${stateName} Dentists`).
   - JSON-LD (~3061–3064): insert `Find a Dentist` ListItem pos 2; renumber the state node 2→3; its `name` already `{stateName} PPO Dentists` — keep.

3. **Metro hub** (`buildMetroHub`):
   - Visible (~1303–1317): insert `Find a Dentist` pos 2; state crumb 2→3 with text `{state} PPO Dentists`; current `{market_area}` crumb → meta pos 3→4 (and to satisfy parity, render it as `{market_area} PPO Dentists`).
   - JSON-LD (~1245–1249): insert `Find a Dentist` pos 2; state 2→3; `{market_area} PPO Dentists` 3→4.

4. **Regional hub** (`buildRegionalHub`, ~3234/3260): same +1 shift; canonicalize current `{Region}` visible label to `{Region} PPO Dentists` to match schema.

5. **Local-area hub** (`buildLocalAreaHub`):
   - Visible (~2889–2905+): insert `Find a Dentist` pos 2; shift state→3, parentMarket→4, current localArea→5; render parentMarket as `{parentMarket} PPO Dentists` and current as `{localArea} PPO Dentists`.
   - JSON-LD (~2849–2853): insert pos 2; renumber 2→3, 3→4, 4→5.

6. **City page** (`buildCityPage`):
   - Visible (~1604–1622): insert `Find a Dentist` pos 2; state→3 (`{state} PPO Dentists`), market→4 (`{market_area} PPO Dentists`), current city→5 (`{city} PPO Dentists`).
   - JSON-LD (~1506–1511): insert pos 2; renumber state→3, market→4, city→5.
   - **Also fix line 1509 trailing-slash bug:** change `.../${stSlug}/${mkSlug}` to `.../${stSlug}/${mkSlug}/` so the metro `item` matches its canonical and the visible link.

7. **Dentist page** (`buildDentistPage`) — the big one:
   - **Replace** the `<nav class="crumb">` plain-anchor markup (~2209–2215) with the hub `<ol ... itemscope itemtype="…/BreadcrumbList">` microdata pattern (reuse hub CSS or restyle `.crumb` to wrap the `<ol>`). This unifies T6 with hubs and makes the visible crumb machine-readable.
   - Insert `Find a Dentist` pos 2; renumber CoverCapy(1) → Find a Dentist(2) → state(3) → market(4) → city(5) → practice(6).
   - Canonicalize ancestor labels: state `{state} PPO Dentists` (not bare `{state}`), market `{market_area} PPO Dentists`, city `{city} PPO Dentists`, practice = name.
   - JSON-LD (~1974–1981): insert `Find a Dentist` pos 2; renumber 2→3…5→6; update names to the canonical set so visible == schema.

8. **`/dentist` hub itself (`dentist.html` / future `buildNationalHub`):** emit its own 2-crumb `BreadcrumbList` (CoverCapy pos 1 → `Find a Dentist` pos 2 current → `${BASE_URL}/dentist/`) in both visible `<ol>` microdata and JSON-LD `@graph` with `@id={url}#breadcrumb`.

9. **Region tier:** leave OUT of breadcrumbs (visible + schema) for now — add a pos-3 `{Region}` crumb only after real `/dentist/{region}/` folders ship; until then keep contiguous 1..n with `Find a Dentist` at pos 2 (per §3 recommended chain).

Net effect after rebuild: every tier carries a contiguous, parity-correct breadcrumb whose
visible labels and `meta position` exactly equal the JSON-LD `name`/`position`, with the new
`/dentist` hub at position 2, T6 unified onto the microdata component, and the T5 metro
trailing-slash bug fixed.
