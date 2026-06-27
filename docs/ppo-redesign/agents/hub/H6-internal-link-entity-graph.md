# Agent H6 — Internal-Link & Entity Graph for the Whole PPO Cluster

_PPO hub-and-spoke redesign · CoverCapy · June 2026_
_Scope: the reciprocal link mesh + entity graph that ties the Compare PPO Plans main hub ↔ carrier plan pages ↔ Delta sub-hub ↔ glossary ↔ treatment/timing pages into one product that earns sitelinks for "covercapy insurance" and ships zero orphans._
_Builds on (does not repeat): `14-hub-spoke-seo.md` (§7 cross-type matrix, §11 entities), `13-information-architecture.md` (route tree, orphan inventory), `13-CARRIER-PLAN-TEMPLATE.md` (the standard anatomy + schema graph), `17-schema-entities.md`, `19-knowledge-graph.md`._

**Floor (non-negotiable):** the live compare page renders **51 internal links**; the ZIP carrier spoke renders **~17 internal + branded external**; the ZIP compare hub **33**. Every redesigned page must meet or beat its own predecessor's count — **the mesh must never be thinner than the ZIP, and never worse than a `/dental/` ZIP-city page.** T5 jade scheme throughout (CTA `--teal-night`, links `--teal-700`, accent `--mint`, body `--ink`).

---

## 0. The five node types in this cluster

| Code | Node | Canonical URL | Owned head intent |
|---|---|---|---|
| **HUB** | Compare PPO Plans (main hub) | `/compare-ppo-dental-plans/` | compare PPO dental plans (side by side) |
| **PILLAR** | PPO plans pillar | `/dental-insurance/ppo-plans/` | best dental PPO plans |
| **PLAN** | Carrier plan page (×8) | `/dental-insurance/ppo-plans/{carrier}/{plan}/` | {carrier} {plan} review 2026 |
| **DELTA** | Delta carrier hub + 4 sub-spokes | `/dental-insurance/ppo-plans/delta-dental/` (+ `/premium/`, `/over-65/`, `/uc-students/`, `/compare/`) | Delta Dental PPO plans |
| **TREAT** | Treatment page (implants, crowns, root-canals, braces, dentures, whitening) | `/dental-insurance/for-{procedure}/` | dental insurance for {procedure} |
| **TIME** | Timing page (one canonical) | `/dental-insurance/no-waiting-period/` | no waiting / starts today / immediate |
| **GLOSS** | Glossary term (×24) | `/dental-insurance-glossary/{term}/` | what is {term} |

> The HUB (`/compare-ppo-dental-plans/`) and the PILLAR (`/ppo-plans/`) are **two cooperating roots**, not rivals (Agent 14 §2, Option B). The brief names the HUB as the cluster center for sitelinks; the PILLAR is its category twin that owns inventory. Both link down to all PLANs; PLANs breadcrumb up through PILLAR and link across to the HUB. Treat them as a **dual-root** in every rule below.

---

## 1. THE LINK MATRIX — required inbound/outbound per page type

Legend: **↑ up** (to a parent root), **↔ across** (siblings/rivals), **↓ down** (to children), **→ out** (glossary/treatment/timing). Every "→ required outbound" has a reciprocal "← required inbound" on the target — that reciprocity *is* the orphan firewall (§3). Counts are **minimums**; never below the predecessor.

### 1a. Main HUB — `/compare-ppo-dental-plans/`  (≥ 33 internal, target ≥ 40)

| Direction | Required links | Anchor-text pattern |
|---|---|---|
| ↓ to PILLAR | 1 | "browse all PPO plans by carrier" |
| ↓ to every PLAN (8) | 8 (one per matrix row) | "{Carrier} {Plan} — full review" e.g. "Guardian Premier 2.0 — full review" |
| ↓ to DELTA hub | 1 | "all Delta Dental PPO plans" |
| → to TREAT (6) | ≥4 most-shopped | "best PPO plans for implants", "coverage for crowns" |
| → to TIME | 1 | "plans with no waiting period" |
| → to GLOSS | ≥6 inline tooltips | "annual maximum", "what a waiting period means" |
| → dentist bridge | 1 (only one) | "find dentists who take these plans" → `/ppo-dentists/` |

**Inbound required (← orphan check):** PILLAR, every PLAN page ("compare side by side"), DELTA hub, every TREAT and TIME page, `/dental-insurance/` parent. The HUB is the most-linked-to node in the cluster — that inbound density is the sitelink signal.

### 1b. Carrier PLAN page — `/…/ppo-plans/{carrier}/{plan}/`  (≥ 17 internal, target ≥ 24)

This is the money page. It must link **UP** to both roots, **ACROSS** to alternatives + per-procedure rivals, and **OUT** to glossary terms (the brief's exact mandate).

| Direction | Required links | Anchor-text pattern |
|---|---|---|
| ↑ to HUB | 1 | "compare all PPO plans side by side" |
| ↑ to PILLAR / carrier hub | 1–2 (breadcrumb + "all {carrier} plans") | "all Guardian PPO plans" |
| ↔ alternatives (2–3) | "Compare-with" tray | "Mutual of Omaha — lower premium, day-one basic" |
| ↔ **per-procedure rivals** (from §9 module) | 1 link per procedure row (≥4) | "implants: Ameritas wins day-one →", "braces: see Delta or Guardian →" |
| → to each procedure's TREAT guide | ≥3 | "how implant coverage works", "crown cost & coverage" |
| → to TIME (if 0-wait tier) | 1 | "plans usable from day one" |
| → to GLOSS (in-prose, 3-layer tooltip) | ≥3 contextual | "what an annual maximum caps", "the missing-tooth clause" |
| → carrier-eval ("is X good") | 1 | "is Guardian good dental insurance?" |
| → dentist bridge | 1 | "search {carrier} dentists near you" |
| ↗ branded external (carrier `sameAs` target) | 1 | "official {carrier} plans ↗" (UTM-stripped) |

**Inbound required (←):** HUB row, PILLAR list, carrier hub, every sibling PLAN's "compare-with" + per-procedure rival rows, the matching TREAT pages ("plans that cover implants"), TIME page ("fitting plans"), carrier-eval page. A PLAN with < 2 inbound from the cluster **fails the build** (§3).

### 1c. DELTA carrier hub + sub-spokes  (hub ≥ 17; each sub-spoke ≥ 14)

| From | Required links |
|---|---|
| **Delta hub** ↓ | all 4 sub-spokes (premium [featured], over-65, uc-students, compare) + ↑ HUB + ↑ PILLAR + → glossary (missing-tooth, MAC/U&C) + ↔ 2 rival carrier PLANs + dentist bridge |
| **Each Delta sub-spoke** | ↑ Delta hub ("all Delta plans") + ↑ HUB + ↔ other Delta sub-spokes + → relevant TREAT + → GLOSS + dentist bridge |

> **Fixes the IA §2 orphans:** over-65, uc-students, and compare currently have no inbound from the hub. The Delta hub MUST render all four sub-spoke links, and each sub-spoke MUST link back up — closing the four known orphans.

### 1d. TREATMENT page — `/dental-insurance/for-{procedure}/`  (≥ 12 internal)

| Direction | Required links | Anchor |
|---|---|---|
| ↑ to HUB + PILLAR | 2 | "compare every PPO plan", "all PPO plans" |
| ↓ to **qualifying PLANs** (the ones whose §9 model ranks well for this procedure) | ≥3, data-driven | "plans that cover implants", "best implant-coverage PPO" |
| ↔ related TREAT guides | 1–2 | "see crown coverage", "root canal costs" |
| → GLOSS | ≥2 | "what a waiting period means", "major-services coinsurance" |
| → cost estimator + dentist bridge | 2 | "estimate your {procedure} cost", "find dentists" |

**Inbound required (←):** the HUB, the PILLAR, **every PLAN page whose per-procedure model cites this procedure** (reciprocal of the §9 rival rows), related TREAT siblings. This reciprocity is what makes the per-procedure analysis a two-way mesh, not one-way link bait.

### 1e. TIMING page — `/dental-insurance/no-waiting-period/`  (≥ 12 internal)

| Direction | Required links |
|---|---|
| ↑ HUB + PILLAR | "compare PPO plans", "all PPO plans" |
| ↓ to **0-wait / fast-tier PLANs** (data-driven) | "plans usable from day one", "no-wait preventive PPOs" |
| → GLOSS (the moat terms) | "effective date vs waiting period", "day-one coverage", "waiting period" |
| → TREAT | "major work without waiting" |
| → dentist bridge | 1 |

**Inbound required (←):** HUB, PILLAR, every PLAN with a notable 0-wait tier ("plans usable from day one"), TREAT "major-work-now" angle. Owns all three timing phrasings on-page as H2/FAQ (Agent 14 §5) — **no separate immediate-coverage/starts-today competitor URLs.**

### 1f. GLOSSARY term — `/dental-insurance-glossary/{term}/`  (≥ 6 internal)

| Direction | Required links | Anchor |
|---|---|---|
| ↑ to glossary hub + PILLAR | 2 | "all PPO terms", "PPO plans" |
| → 1–2 PLANs where the term bites | 2 | "how the annual maximum caps Guardian Premier", "see a plan's deductible in context" |
| → 1 TREAT where it applies | 1 | "what counts as a major service" |
| ↔ cross-terms | 1–2 | "see also: coinsurance", "related: plan year" |
| → cost estimator (action step) | 1 | "estimate your out-of-pocket" |

**Inbound required (←):** glossary hub, **every PLAN/TREAT/TIME page that tooltips this term** (the 3-layer `cc-gloss` inline links). A glossary term with zero inbound tooltips = a term no page uses = **flag for removal or wiring** in the build check.

### Matrix summary (FROM ↓ \ TO →)

| FROM \ TO | HUB | PILLAR | PLAN | DELTA | TREAT | TIME | GLOSS | Dentist |
|---|---|---|---|---|---|---|---|---|
| **HUB** | — | ✔ | ✔ all 8 | ✔ | ✔ ≥4 | ✔ | ✔ ≥6 | ✔ ×1 |
| **PILLAR** | ✔ | — | ✔ all | ✔ | ✔ | ✔ | ✔ | ✔ ×1 |
| **PLAN** | ✔ up | ✔ up | ↔ alts + procedure rivals | ✔ if Delta | ✔ qualifying | ✔ if 0-wait | ✔ ≥3 in-prose | ✔ ×1 |
| **DELTA** | ✔ | ✔ | ↔ 2 rivals | ↓ 4 sub | ✔ | ✔ | ✔ | ✔ ×1 |
| **TREAT** | ✔ | ✔ | ✔ qualifying | — | ↔ related | ✔ major-now | ✔ ≥2 | ✔ ×1 |
| **TIME** | ✔ | ✔ | ✔ fitting | — | ✔ | — | ✔ moat terms | ✔ ×1 |
| **GLOSS** | — | ✔ | ✔ 1–2 | — | ✔ 1 | ✔ if timing term | ↔ cross | ✔ estimator |

**Equity-flow rule:** net PageRank flows **toward PLAN pages** (the verification money pages). HUB/PILLAR/TREAT/TIME/GLOSS all funnel down; PLANs link back up but the dual-root HUB+PILLAR are the most-linked-to nodes (sitelink targets). One dentist bridge per page, never three (kills the IA §1 three-namespace risk).

**Anchor discipline:** never "click here / learn more / read more". Store an anchor-variant **pool per target** and rotate at render so the same target is never hit with identical exact-match anchor sitewide (over-optimization footprint). ≥2–4 links per page must be **in-prose contextual**, not just rail modules.

---

## 2. THE ENTITY GRAPH — one reusable `Organization` + one `@id` per carrier

Server-rendered `@graph` per page. The **dominance lever** is ID reuse: Google merges nodes that share an `@id`, splits nodes that don't. (Agent 14 §11, 17-schema-entities.)

### 2a. CoverCapy — ONE Organization, reused on every page

```jsonc
{
  "@type": "Organization",
  "@id": "https://www.covercapy.com/#organization",   // identical on EVERY page
  "name": "CoverCapy",
  "url": "https://www.covercapy.com/",
  "logo": "https://www.covercapy.com/assets/logo.png",
  "sameAs": [ /* brand profiles — array, never a string */ ]
}
```
The `WebPage` node on each page sets `"publisher": {"@id": "https://www.covercapy.com/#organization"}` (reference, not a re-declaration). The ZIP's loose second `Organization` ("CoverCapy Plan Research desk") becomes the **named reviewer** → model as a `Person`/`@id` `#reviewer-…` referenced from `WebPage.reviewedBy`, not a second org.

### 2b. One `@id` per carrier, reused across hub + eval + every plan

```jsonc
{
  "@type": "Organization",
  "@id": "https://www.covercapy.com/#carrier-guardian",   // SAME id on carrier hub, carrier-eval, AND every Guardian plan page
  "name": "Guardian Life",
  "sameAs": ["https://www.guardianlife.com/dental-insurance"]   // official domain — UTM-stripped, array
}
```
Reuse rule: the Guardian PLAN page, a future Guardian carrier hub, and "is Guardian good" eval **all reference `#carrier-guardian`** — Google sees one carrier entity, three URLs, not three carriers. Delta's hub + 4 sub-spokes all reference one `#carrier-delta-dental`.

### 2c. How PLAN / TREATMENT / GLOSSARY entities relate

| Entity | `@type` | `@id` | Relationship edges |
|---|---|---|---|
| Plan | `Service` (price-free — **no `Offer.price` / `InStock`** for illustrative premiums) | `#plan-{carrier}-{plan}` | `provider` → `#carrier-{x}`; `isPartOf` → `WebPage`; `about` → procedures it covers |
| Carrier | `Organization` | `#carrier-{x}` | `sameAs` → official domain |
| Treatment | `MedicalProcedure` / `Thing` | `#procedure-{x}` | PLAN `about` → it; TREAT `WebPage.mainEntity` |
| Glossary term | `DefinedTerm` | `#term-{x}` | `inDefinedTermSet` → glossary; tooltips `mentions` it |
| ItemList | — | per root | PILLAR emits `ItemList` of 8 `#plan-…`; DELTA hub emits `ItemList` of Delta `#plan-…` — **same plan `@id`s reused** |

**Result:** AI answer engines can say "CoverCapy lists Guardian's Premier 2.0 with a 6-month major-services wait" and cite the right URL, because `#carrier-guardian` and `#plan-guardian-premier-2-0` are consistent everywhere. Inconsistent/duplicated IDs across page types is the #1 way this dominance is lost — enforce one `@id` per real-world entity.

Schema set per page type: HUB/PILLAR = `WebPage` + `BreadcrumbList` + `ItemList` + `FAQPage`; PLAN = `WebPage` + `BreadcrumbList` + `Service` + `FAQPage` + carrier `@id`; TREAT = `WebPage` + `BreadcrumbList` + `MedicalProcedure` + `FAQPage`; GLOSS = `WebPage` + `DefinedTerm` + `BreadcrumbList`. Visible-content parity required on all.

---

## 3. ORPHAN-PREVENTION RULES + BUILD-TIME VALIDATION

### Rules (enforced at render, data-driven so the mesh self-heals)
1. **No node ships with < 1 inbound from the hub cluster** (the brief's bar). Practical floor: **≥ 2 inbound** = breadcrumb parent + ≥1 contextual edge (Agent 14 §10).
2. **Every outbound edge in §1 has its reciprocal inbound rendered on the target.** Generate the whole mesh from `ppo_plans` + a static `node-map.json` (treatment/timing/glossary → qualifying field + threshold), so edges are bidirectional by construction and no node can be silently orphaned.
3. **Breadcrumb = cheapest orphan device:** every node reachable upward to PILLAR in ≤ 4 hops; visible trail URLs **byte-match** `BreadcrumbList` schema + canonical (https, www, trailing slash).
4. **One slash convention** (trailing slash, matches `/dental/`) on every canonical + internal link — kills the IA §3 duplicate-URL split.
5. **One dentist bridge per page** → `/ppo-dentists/`. Filter/sort/compare-tray states `noindex,follow` + self-canonical; never crawlable `?plan=a&plan=b` permutations.
6. **MetLife stays `noindex,follow`**, reachable but out of sitemap; no node links to it as an indexable target.
7. **Glossary terms with zero inbound tooltips** are flagged (unused term → wire it or drop it).

### Validation approach — a build-time `link-graph-check` (Node, runs after generation, before commit)

```
1. Crawl every emitted index.html in the cluster → build a directed graph
   of internal <a href> edges (resolve to canonical, trailing-slash-normalized).
2. Load the expected matrix from node-map.json (§1) → the REQUIRED edge set.
3. Assertions (any failure = non-zero exit, blocks the build):
   A. INBOUND ≥ 1 from the HUB cluster for EVERY node      → no orphans (the brief's hard bar)
   B. INBOUND ≥ 2 total for every PLAN/TREAT/TIME node       → breadcrumb + contextual
   C. RECIPROCITY: for each required outbound edge, the return
      edge exists on the target                              → mesh is bidirectional
   D. COUNT FLOOR: each page's internal-link count ≥ its
      predecessor (PLAN ≥17, HUB ≥33, live-compare ≥51)      → "not thinner than ZIP"
   E. NO DEAD LINKS: every internal href resolves to an
      emitted file (catches /ppodentists.html, dd.html)      → no 404 / stray
   F. SLASH + CANONICAL: every href and canonical trailing-
      slash normalized; breadcrumb URLs byte-match schema
   G. ENTITY: exactly one #organization id sitewide; each
      #carrier-{x} reused (not redeclared with diff name);
      every carrier sameAs is an ARRAY, not a string
   H. TITLE UNIQUENESS: no two indexable pages share the same
      primary <title> head term (anti-cannibalization, Ag14 §6)
4. Emit link-graph-report.json (inbound/outbound counts per node, orphan
   list, reciprocity gaps) — diffable in CI; PR fails on any A–H violation.
```

Wire it as an npm script (`node seo-build/link-graph-check.js`) that runs after `generate-plans.js` and in CI. Because the mesh is generated from one `node-map.json` + `ppo_plans`, a passing check is also a *regenerable* guarantee — edges can't rot independently of the data.

---

## Top 3 recommendations

1. **Generate the whole mesh + reciprocity from ONE source (`node-map.json` + `ppo_plans`), never hand-author edges.** Every required outbound in §1 emits its reciprocal inbound by construction, so no node — including the 4 Delta sub-spoke orphans and any glossary term — can ship unlinked. This is the only way to honor both "≥1 inbound from the hub cluster for every page" and "not thinner than the ZIP" at 8 plans × 6 treatments × 24 terms scale.

2. **Enforce the dual-root (HUB `/compare-ppo-dental-plans/` + PILLAR `/ppo-plans/`) as the most-linked-to nodes, and reuse ONE `@id` per real-world entity.** The HUB's inbound density is the sitelink signal for "covercapy insurance"; the shared `#organization` + per-carrier `#carrier-{x}` (reused across hub/eval/plan, `sameAs` arrays) is the AI-citation signal. Inconsistent IDs are the #1 dominance-loss mode — make them identical strings everywhere.

3. **Ship the `link-graph-check` build gate (assertions A–H) as a hard CI blocker before any sitemap submission.** It catches orphans, reciprocity gaps, count regressions below the ZIP floor, dead links (`/ppodentists.html`, `dd.html`), slash splits, duplicate titles, and entity-ID drift in one pass — turning "not worse than ZIP / no orphans" from a hope into a tested invariant.
