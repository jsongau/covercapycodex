# Agent O10 — Schema, Metadata & Technical Trust: Delta Dental Hub

Scope: the 5 Delta nodes under `/dental-insurance/ppo-plans/delta-dental/`.
Authority: docs 15 (technical-seo-2026), 16 (SERP metadata), 17 (schema-entities).
Color system: T5 jade. Canonical host (as shipped): `https://www.covercapy.com` (apex/`www`
reconciliation is a system-wide task, flagged below — keep `www` until resolved).

Nodes:
| Key | Path | Role |
|---|---|---|
| hub | `/delta-dental/` | Carrier hub (index) |
| premium | `/delta-dental/premium/` | Plan gateway (Premium PPO) |
| compare | `/delta-dental/compare/` | Delta vs others |
| over-65 | `/delta-dental/over-65/` | SCAN Health Plan Delta benefit |
| uc-students | `/delta-dental/uc-students/` | UC SHIP + per-campus leaves |

---

## 1. Current-state audit (as shipped)

| Node | Title len | Desc | Canonical | robots | OG/Tw | Breadcrumb | Other schema | meganav placeholder |
|---|---|---|---|---|---|---|---|---|
| hub | "Delta Dental — Plans, PPO Dentists, Cost & Reviews · CoverCapy" (~61, em-dash) | em-dash | ✓ www | **MISSING** | **MISSING** | ✓ 4-lvl | `Product`+`Offer.price:"73"`+`InStock`, FAQPage | CSS comment only (not rendered) |
| premium | "Delta Dental PPO™ Individual Premium Plan — Coverage, Cost & Adult Ortho · CoverCapy" (~84, over-length, em-dash, ™) | em-dash | ✓ www | **MISSING** | **MISSING** | ✓ 5-lvl | `Product`+`Offer.price:"73"`+`InStock`, FAQPage | CSS comment only |
| compare | "Is Delta Dental Good Insurance? Delta Dental vs Other PPO Plans · CoverCapy" (~73, over-length) | em-dash | ✓ www | **MISSING** | **MISSING** | **MISSING (bare FAQPage, no @graph)** | FAQPage only | **LIVE PLACEHOLDER rendered (L217-218)** |
| over-65 | "SCAN Health Plan Delta Dental Benefit — California & Washington (65+) · CoverCapy" (~80, over-length, em-dash) | em-dash | ✓ www | **MISSING** | **MISSING** | ✓ 5-lvl | FAQPage | **LIVE PLACEHOLDER rendered (L140-141)** |
| uc-students | "UC SHIP Dental and Delta Dental: Find a Dentist Near Your UC · CoverCapy" (~71, over-length) | OK ~158 | ✓ www | ✓ index,follow,max-image-preview:large | **MISSING** | ✓ 5-lvl | FAQPage | CSS comment only |

### Cross-node defects (every node unless noted)
1. **`Offer.price:"73"` + `availability:InStock` on hub + premium.** Illustrative/quote-variable
   premium marked as a fixed commercial offer CoverCapy does not transact. Doc 17 §A1 hard-fail.
   Remove `Product`/`Offer` entirely; model the plan as a neutral `Service`/`Thing`.
2. **No `robots` meta on 4 of 5** (only uc-students has it). Add `index, follow,
   max-image-preview:large, max-snippet:-1` to every indexable node.
3. **No Open Graph / Twitter card on ANY node.** Zero social/AI-preview surface.
4. **Compare has no `@graph` and no BreadcrumbList** — only a bare `FAQPage`. Orphaned in the
   entity graph. This is the headline U1 finding.
5. **Live mega-nav PLACEHOLDER rendered on compare + over-65** (`<div class="meganav">…YOUR MEGA
   NAV — placeholder —`). Ships to production. Remove the rendered markup on both; keep only the
   sticky sub-nav. (hub/premium/uc-students already reduced it to a CSS comment — fine.)
6. **No Organization / WebPage / Service / carrier nodes anywhere.** No reusable Delta carrier
   `@id`, no `sameAs` to deltadental.com, no `datePublished`/`dateModified`, no `author`/`reviewedBy`.
7. **Em-dashes in titles + descriptions** (CLAUDE.md violation) on 4 of 5 nodes; ™ glyph and
   over-length titles (premium 84, over-65 80) will truncate in SERP.
8. **Two divergent sub-navs** ship across nodes (U1) — unify anchor `id`s + labels (doc 16 §3F).
9. No "PPO Basic" anywhere — correct, do not introduce it.

---

## 2. Corrected metadata — per node

Rules: title ≤60 chars, description 140–158, entity-first, suffix `| CoverCapy`,
**no em-dashes** (use colon/comma/middot), no ™, no "best/cheapest/#1". One answer-first
`<p class="lede">` (200–320 chars) under each H1, mirrored into `og:description`.

**hub** `/delta-dental/`
- Title: `Delta Dental PPO Plans, Dentists & Cost (2026) | CoverCapy` (57)
- Desc: `Delta Dental is the largest U.S. dental carrier. Compare the Premium PPO plan, find in-network dentists near you, see real waiting periods and costs, and verify your dentist free.` (~178 → trim to: `…waiting periods and costs. Verify your dentist free.` ~150)
- robots: `index, follow, max-image-preview:large, max-snippet:-1`

**premium** `/delta-dental/premium/`
- Title: `Delta Dental PPO Premium Plan Review (2026) | CoverCapy` (54)
- Desc: `Delta Dental PPO Premium: 100% preventive, 50% major, adult ortho and implants, $2,000 annual maximum. See dentists near you, real waiting periods and costs. Verify free.` (~168 → trim to ~155)
- robots: indexable as above.

**compare** `/delta-dental/compare/`
- Title: `Is Delta Dental Good? Delta vs Top PPO Plans (2026) | CoverCapy` (61 → trim to `Is Delta Dental Good Insurance? PPO Comparison (2026) | CoverCapy` ≤60)
- Desc: `See how Delta Dental PPO Premium compares to UnitedHealthcare, Guardian, Ameritas, Mutual of Omaha and Humana on coverage, annual maximum, cost and waiting periods.` (~158)
- robots: indexable as above.

**over-65** `/delta-dental/over-65/`
- Title: `SCAN Health Plan Delta Dental Benefit, 65+ | CoverCapy` (53)
- Desc: `On a SCAN Health Plan Medicare Advantage plan in California or Washington? Your dental runs through Delta Dental, a DeltaCare USA benefit with an optional PPO buy-up. Here is how to use it.` (trim to ~155)
- robots: indexable as above.

**uc-students** `/delta-dental/uc-students/`
- Title: `UC SHIP Dental: Find a Delta Dental Dentist | CoverCapy` (54)
- Desc: keep current (~158, compliant). robots: keep, add `max-snippet:-1`.

### OG / Twitter per node (add to ALL 5)
```
<meta property="og:type" content="website">
<meta property="og:site_name" content="CoverCapy">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="{node title without | CoverCapy}">
<meta property="og:description" content="{node lede, de-em-dashed, ≤200}">
<meta property="og:url" content="{node canonical}">
<meta property="og:image" content="https://www.covercapy.com/assets/og/delta-dental-{node}.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og:title}">
<meta name="twitter:description" content="{og:description}">
<meta name="twitter:image" content="{og:image}">
```
OG art must be factually neutral T5-jade carrier cards — no premium numbers (they go stale).

---

## 3. Schema — shared nodes + per-node graphs

One `<script type="application/ld+json">` per node, **server-rendered** (static in source HTML,
no JS injection), single `@graph`, shared nodes referenced by `@id`. Every schema fact must appear
in rendered HTML (visible-content parity).

### Shared `@id`s (identical bytes on every node)
- `https://www.covercapy.com/#organization` — `Organization` CoverCapy (logo, sameAs socials,
  slogan, `description`, `areaServed:US`). The concierge brand entity.
- `https://www.covercapy.com/#website` — `WebSite` + `SearchAction`
  (`/find-my-dentist?loc={search_term_string}`).
- `https://www.covercapy.com/#research-desk` — `Organization` "CoverCapy Plan Research desk",
  `parentOrganization`→`#organization`. Used as `author` + `reviewedBy`. (No invented `Person`.)
- **`https://www.covercapy.com/#carrier-delta`** — the ONE reusable Delta carrier node, referenced
  by `@id` on every Delta node:
```json
{"@type":"Organization","@id":"https://www.covercapy.com/#carrier-delta",
 "name":"Delta Dental","url":"https://www.deltadental.com/",
 "sameAs":["https://www.deltadental.com/","https://en.wikipedia.org/wiki/Delta_Dental",
   "https://www.linkedin.com/company/delta-dental/"]}
```

### Per-node graph nodes
| Node | Nodes (all + BreadcrumbList + isPartOf→#website) |
|---|---|
| hub | `WebPage`(+dates, author/reviewedBy→#research-desk) · `#carrier-delta` · `Service`(name "Delta Dental PPO Premium", provider→#org, `serviceType`, `about`→#carrier-delta; **no Offer/price**) · `FAQPage` · `BreadcrumbList`(4-lvl) |
| premium | `WebPage`(+dates, about/mainEntity→#plan) · plan `Service` or `Thing` `#plan` (mentions→#carrier-delta; **no Offer/Product/InStock**) · `#carrier-delta` · `FAQPage` · `BreadcrumbList`(5-lvl) |
| compare | `WebPage`(+dates) · `#carrier-delta` · optional `ItemList` of the compared carriers as `Organization` refs · `FAQPage` · **`BreadcrumbList`(5-lvl) — ADD, currently missing** |
| over-65 | `WebPage`(+dates) · `#carrier-delta` · (SCAN as `Organization`, `sameAs` scanhealthplan.com) · `FAQPage` · `BreadcrumbList`(5-lvl) |
| uc-students | `WebPage`(+dates) · `#carrier-delta` · `FAQPage` · `BreadcrumbList`(5-lvl). Per-campus leaves: each gets its own `WebPage`+`BreadcrumbList`(6-lvl) + the same `#carrier-delta` ref. |

### Compare BreadcrumbList (the fix — paste into compare `@graph`)
```json
{"@type":"BreadcrumbList","itemListElement":[
 {"@type":"ListItem","position":1,"name":"Home","item":"https://www.covercapy.com/"},
 {"@type":"ListItem","position":2,"name":"Dental Insurance","item":"https://www.covercapy.com/dental-insurance/"},
 {"@type":"ListItem","position":3,"name":"PPO Plans","item":"https://www.covercapy.com/dental-insurance/ppo-plans/"},
 {"@type":"ListItem","position":4,"name":"Delta Dental","item":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/"},
 {"@type":"ListItem","position":5,"name":"Compare"}]}
```
Wrap compare's bare FAQPage in `{"@context":"https://schema.org","@graph":[ … ]}` alongside it.

### Gateway (premium) full graph skeleton
```json
{"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","@id":".../premium/#webpage","url":".../premium/",
   "name":"Delta Dental PPO Premium Plan Review (2026)",
   "isPartOf":{"@id":".../#website"},
   "about":{"@id":".../premium/#plan"},"mainEntity":{"@id":".../premium/#plan"},
   "datePublished":"2026-06-20","dateModified":"2026-06-20",
   "author":{"@id":".../#research-desk"},"reviewedBy":{"@id":".../#research-desk"},
   "lastReviewed":"2026-06-20"},
  {"@type":"Service","@id":".../premium/#plan","name":"Delta Dental PPO Individual Premium Plan",
   "serviceType":"Individual PPO dental insurance plan","provider":{"@id":".../#organization"},
   "brand":{"@id":".../#carrier-delta"},"about":{"@id":".../#carrier-delta"},
   "areaServed":["AL","CA","DE","FL","GA","LA","MD","MS","MT","NV","NY","PA","TX","UT","WV","DC"]},
  {"@type":"Organization","@id":".../#carrier-delta", … (shared, see above) },
  {"@type":"FAQPage","mainEntity":[ … existing 4 Qs (already visible) … ]},
  {"@type":"BreadcrumbList","itemListElement":[ … 5-lvl … ]}
]}
```
Note: **no `Product`, no `Offer`, no `price`, no `availability`, no `Review`/`AggregateRating`**
anywhere on the hub. `dateModified` drives the visible "last verified" line and sitemap `lastmod`.

---

## 4. Technical-trust fixes (server-rendered + nav)
1. **Remove the rendered mega-nav placeholder** on compare (L217-218) and over-65 (L140-141).
   Delete the `<div class="meganav">…</div>` block and its `<!-- YOUR MEGA NAV -->` comment.
2. **Unify the sub-nav** across all 5 nodes: one set of stable, descriptive anchor `id`s whose text
   matches the in-page H2s (sitelink eligibility, doc 16 §3F). Retire the second divergent variant.
3. **Server-render every fact + the full `@graph`** in source HTML; JS may enhance only.
4. **Add `robots` meta** to hub/premium/compare/over-65.
5. **Canonical host:** all nodes use `www` consistently — keep until the apex-vs-www reconciliation
   (doc 15 §3 / doc 17 §C6) is resolved system-wide; then byte-match canonical + every schema `@id`.
6. **No-data-drift:** premium's `$2,000`, waiting periods and state list appear in FAQ schema and
   must also be visibly rendered (they are) — keep parity if copy changes.

## 5. Acceptance
- [ ] BreadcrumbList on every node (compare fixed).
- [ ] No `Product`/`Offer`/price/`InStock`; no `Review`/`AggregateRating`.
- [ ] One reused `#carrier-delta` (`sameAs` deltadental.com) referenced on all 5 nodes.
- [ ] `WebPage`+dates+author/reviewedBy on every node; `Service`/`Thing` plan node on hub+premium.
- [ ] OG + Twitter on all 5; robots on all 5; titles ≤60, descriptions 140-158, no em-dashes/™.
- [ ] Rendered mega-nav placeholder removed (compare + over-65); single unified sub-nav.
- [ ] All schema server-rendered; passes Rich Results Test with zero errors.
