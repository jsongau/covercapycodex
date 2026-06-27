# O7 — Delta Dental Hub: Information Architecture & SEO

> Agent O7. Source of truth: the five live files under
> `/dental-insurance/ppo-plans/delta-dental/`, plus U1-hub-nav-map.md,
> 13-information-architecture.md, 14-hub-spoke-seo.md.
> Delta is a FULL HUB; **Premium is the GATEWAY** (primary plan entity).
> No "PPO Basic" exists and none is introduced.

---

## 1. Route tree + canonical pattern (verified on disk)

Canonical pattern: `/dental-insurance/ppo-plans/delta-dental/{sub}/` — nested, trailing slash.

```
/dental-insurance/ppo-plans/                       T2  PPO master hub (out of Delta scope)
└── delta-dental/                                  T3  DELTA HUB (index.html)        ✓ on disk
     ├── premium/                                  T4  PPO PREMIUM ★ GATEWAY         ✓ on disk
     ├── compare/                                  T4  COMPARE (Decision Desk)        ✓ on disk
     ├── over-65/                                  T4  OVER 65 (SCAN seniors)         ✓ on disk
     ├── uc-students/                              T4  UC STUDENTS (UC SHIP)          ✓ on disk
     │    ├── ../students/{campus}/  ×10           T5  CAMPUS LEAVES                  ✗ NOT ON DISK
     │    └── ../uc-dental-access/                 T5  DATA STUDY                     ✗ NOT ON DISK
```

**On-disk verification (this audit):** the five T4/T3 nodes exist. The 10
`students/{campus}/` leaves and `uc-dental-access/` are **linked but do not
exist** — see §8 gap G1 (these are dead `<a href>`s today, not orphans yet).

---

## 2. Canonical ownership — one entity per node, Premium as primary

| Node | Owned head intent | `<title>` head term (live) | Owns |
|------|-------------------|----------------------------|------|
| **Hub** `/delta-dental/` | Delta carrier overview / dispatcher | "Delta Dental — Plans, PPO Dentists, Cost & Reviews" | carrier-level entity, sub-hub index |
| **Premium ★** `/premium/` | the Delta individual PPO plan (SKU) | "Delta Dental PPO Individual Premium Plan — Coverage, Cost & Adult Ortho" | the **primary plan entity**; finder `#dentists`, `#nominate`, benefits, cost, verify, waiting-period table |
| **Compare** `/compare/` | "is Delta good" + Delta vs other PPO | "Is Delta Dental Good Insurance? Delta Dental vs Other PPO Plans" | carrier-eval + side-by-side comparison verdict |
| **Over 65** `/over-65/` | SCAN Delta benefit (Medicare Advantage, CA/WA) | "SCAN Health Plan Delta Dental Benefit — California & Washington (65+)" | senior-audience SCAN intent |
| **UC Students** `/uc-students/` | UC SHIP dental finder | "UC SHIP Dental and Delta Dental: Find a Dentist Near Your UC" | student-audience UC SHIP intent + parent of campus leaves |

**Primary-entity rule:** Premium is the canonical Delta *plan* entity. The Hub
is the *carrier* entity (dispatcher, not a plan). Reuse one carrier `@id`
(`#carrier-delta-dental`, `sameAs` → deltadental.com) across Hub, Compare,
Over-65, UC-Students, and reference it from Premium's plan `@id`. Never mint a
second Delta entity on the eval (Compare) page.

### Audience sub-hub intents (no overlap)
- **Compare** = decision/eval intent ("should I pick Delta?"). Delta locked as
  baseline vs 5 carriers. NOT a plan page, NOT the marketplace.
- **Over 65** = persona intent (Medicare-Advantage SCAN members in CA/WA).
  Funnels to Premium `#nominate` for find-and-book.
- **UC Students** = persona intent (UC SHIP enrollees, campus-local finder).
  Funnels to Premium post-graduation + parents the 10 campus T5 leaves.

---

## 3. Internal-link matrix (hub ↔ gateway ↔ sub-hubs ↔ leaves)

`→` = required outbound edge. Every edge needs its reciprocal half on the target
(orphan prevention). Live edges from U1 §4 marked ✓; required-but-missing marked **ADD**.

| FROM ↓ \ TO → | Hub | Premium★ | Compare | Over 65 | UC Students | Campus ×10 |
|---|---|---|---|---|---|---|
| **Hub** | — | ✓ | ✓ | ✓ | ✓ | ✓ (10 cards) |
| **Premium★** | ✓ (subnav) | — | ✓ | **ADD** | **ADD** | — |
| **Compare** | **ADD** | ✓ (`/premium/#dentists`) | — | ✓ | **ADD** | — |
| **Over 65** | ✓ (Related) | ✓ (`#nominate`) | ✓ | — | **ADD** | — |
| **UC Students** | ✓ (Related) | ✓ | ✓ | **ADD** | — | ✓ (10 cards) |
| **Campus ×10** | **ADD** (when built) | **ADD** | — | — | **ADD** (crumb+rail) | — |

### Anchor text per edge (rotate; never identical twice cross-page; never "click here")
| Edge | Anchor pool |
|------|-------------|
| Hub → Premium | "PPO Individual Premium Plan", "the Premium plan in full", "Find PPO dentists" (`#dentists`) |
| Hub → Compare | "Is Delta Dental good?", "Delta vs other PPO plans" |
| Hub → Over 65 | "Delta for seniors", "the SCAN Delta benefit" |
| Hub → UC Students | "UC SHIP dental", "find a dentist near your UC" |
| Hub → campus card | "Delta dentists near UCLA" (campus name) |
| Premium → Compare | "compare waiting periods across plans", "see all PPO plans side by side" |
| Premium → Over 65 *(ADD)* | "on SCAN? see your Delta benefit" |
| Premium → UC Students *(ADD)* | "a UC student? find your campus dentist" |
| Compare → Over 65 | "see the SCAN Delta benefit" |
| Over 65 → Premium | "Delta Dental PPO Premium", "have us find and book one" (`#nominate`) |
| UC Students → Premium | "PPO Individual Premium Plan" (post-graduation) |
| UC Students → campus card | "Delta dentists near {campus}" |
| Campus → UC Students *(ADD)* | "all UC campuses", "back to UC SHIP dental" |
| Campus → Premium *(ADD)* | "the Premium plan after you graduate" |

**Equity-flow rule:** net PageRank flows *toward* Premium (the conversion page,
owns verify + nominate). Hub, Compare, Over-65, UC-Students, campus leaves all
funnel inward; Premium links back up via sub-nav but is the sink.

---

## 4. Breadcrumb requirements per node (visible UI **and** `BreadcrumbList` JSON-LD must byte-match canonical)

| Node | Required crumb | Status |
|------|----------------|--------|
| Hub | Home / Dental Insurance / PPO Plans / **Delta Dental** | ✓ visible + schema |
| Premium★ | … / Delta Dental / **Premium** | ✓ visible + schema |
| Compare | … / Delta Dental / **Compare** | ✗ **NO visible crumb, NO BreadcrumbList schema — FIX (G2)** |
| Over 65 | … / Delta Dental / **Over 65** | schema 5-level ✓; visible UI collapses middle → expand to full |
| UC Students | … / Delta Dental / **UC Students** | schema ✓; visible UI collapses middle → expand to full |
| Campus ×10 | … / Delta Dental / UC Students / **{Campus}** | ✗ pages don't exist — bake on build (G1) |
| uc-dental-access | … / Delta Dental / UC Students / **UC Dental Access** | ✗ doesn't exist — bake on build (G1) |

Rule: visible trail URLs must match `BreadcrumbList` URLs and the `<link
rel="canonical">` exactly (https, host form, trailing slash). Expand Over-65 /
UC-Students *visible* crumbs to the full 5 segments so they match schema.

---

## 5. Orphan prevention for campus leaves (T5 ×10 + data study)

Today the 10 `students/{campus}/` pages + `uc-dental-access/` are linked from
**Hub + UC Students only**. When built, each leaf must ship with:
1. The unified canonical sub-nav (so it's laterally navigable — U1 §3).
2. A full breadcrumb `Home / … / Delta Dental / UC Students / {Campus}` (visible + schema).
3. ≥2 inbound edges (its breadcrumb parent UC-Students + the Hub card) — already
   satisfied by existing link sources, so they will NOT be orphaned *once they exist*.
4. Reciprocal up-links: campus → UC-Students ("all UC campuses") + campus →
   Premium ("the Premium plan after graduation").
5. A self-referential canonical at `…/students/{campus}/` and a sitemap entry.

Until built, these are **broken links**, not orphans. Either build the 10 leaves
+ data study, or remove/`#`-stub the cards so the live hub ships no dead `<a href>`.

---

## 6. Cannibalization check (Premium / Compare / Hub index)

| Pair | Verdict | Why safe / risk |
|------|---------|-----------------|
| **Hub vs Premium** | SAFE | Hub owns "Delta Dental — plans, dentists, cost, reviews" (carrier index); Premium owns "Delta Dental PPO Premium plan" (one SKU). Distinct head terms, distinct H1s. Keep Hub a dispatcher (no full benefits table) so it doesn't duplicate the plan page. |
| **Compare vs Hub** | SAFE | Compare owns "is Delta good / Delta vs other PPO" (eval). Hub doesn't target that term. No overlap. |
| **Compare vs Premium** | WATCH | Both can drift into "Delta Dental coverage". Keep Compare's first paragraph + H1 verdict-framed ("Is Delta good… vs 5 carriers"), and Premium's plan-spec-framed. Compare must NOT render the full Premium benefits table; link to it instead. |
| **Premium vs Over-65/UC-Students** | SAFE | Audience sub-hubs are persona intents (SCAN, UC SHIP), not the generic plan SKU. They link INTO Premium, never re-target "Premium plan". |

Enforce: no two Delta indexable pages share the same primary `<title>` head term.
Current titles are correctly differentiated — preserve them.

---

## 7. Sub-nav / surfacing (carry forward from U1, SEO impact)

- Unify the two divergent sub-navs (Set A 6-label vs Set B 4-label) into one
  ≤8-label component on every node: `Delta Hub | Premium Plan | Compare | Find a
  Dentist | Over 65 | UC Students | For Dentists`. This adds UC-Students to the
  main nav (currently main-nav-orphaned) and makes every node ≤1 hop laterally —
  a crawl-depth + internal-link-density win.
- Canonicalize the "Find PPO Dentists" anchor to `/premium/#dentists` everywhere
  (the finder lives on the gateway); today it resolves to 3 different targets.
- Surface Over-65 + UC-Students from Premium (the real entry doorway) via the
  unified sub-nav (preferred) or an "Is this you?" rail.

---

## 8. On-disk gaps to fix (prioritized)

| ID | Gap | Severity | Fix |
|----|-----|----------|-----|
| **G1** | 10 `students/{campus}/` leaves + `uc-dental-access/` are linked from Hub + UC-Students but **do not exist on disk** → 11 dead links shipping live | **HIGH** | Build the 11 T5 pages (with sub-nav + breadcrumb + reciprocal up-links per §5), OR remove/stub the cards until built. Do not ship dead `<a href>`. |
| **G2** | Compare has **no visible breadcrumb and no `BreadcrumbList` JSON-LD** | **HIGH** | Add `Home / Dental Insurance / PPO Plans / Delta Dental / Compare` crumb + matching schema. |
| **G3** | Over-65 + UC-Students **visible** crumbs collapse the middle 2 segments while schema is full 5-level (mismatch) | MED | Expand visible crumb to match schema (5 segments). |
| **G4** | Host-form inconsistency: Delta canonicals use `https://www.covercapy.com/…` but CLAUDE.md / `/dental/` system uses `https://covercapy.com/…` (no `www`) | MED | Pick ONE host form site-wide; align all Delta canonicals, breadcrumb schema URLs, and internal links. (A `www` vs non-`www` split duplicates the cluster.) |
| **G5** | `uc-students/index.html` canonical tag is non-self-closing (`">` not `"/>`); other Delta pages self-close | LOW | Cosmetic; normalize for consistency. |
| **G6** | Two divergent sub-navs; mega-nav placeholder still live on Compare/Over-65; UC-Students main-nav-orphaned | MED | Unify per §7 (also a U1 finding — coordinate). |
| **G7** | Premium (the doorway) body-links only to Compare; does not surface Over-65 / UC-Students | MED | Add edges per §3 matrix (ADD rows) or rely on unified sub-nav. |

---

## Top 3 recommendations

1. **Fix G1 + G2 first (live correctness).** Eleven campus/data-study links
   point at pages that don't exist on disk — either build the T5 leaves (with
   the §5 orphan-prevention contract) or stub the cards, and give Compare the
   breadcrumb + `BreadcrumbList` schema it's missing so it can self-locate.
2. **Lock canonical ownership with Premium as the primary plan entity.** Hub =
   Delta *carrier* dispatcher; Premium = the one Delta *plan* SKU; Compare =
   eval; Over-65/UC-Students = persona sub-hubs. Reuse one `#carrier-delta-dental`
   `@id` across all nodes, and keep the (already-differentiated) titles so
   Compare↔Premium↔Hub never cannibalize.
3. **Unify the sub-nav + normalize the host form (G4/G6).** One ≤8-label nav on
   every node (adds UC-Students, canonicalizes "Find a Dentist" → `/premium/#dentists`)
   plus a single `www`/non-`www` convention across canonicals, breadcrumb schema,
   and internal links — kills the duplicate-URL and lateral-orphan risks in one pass.
