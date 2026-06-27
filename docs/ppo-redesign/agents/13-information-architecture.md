# Agent 12 — Information Architecture

_PPO hub-and-spoke redesign · CoverCapy · June 2026_
_Lens: founder fears "too basic / worse than current." This memo is therefore biased toward PRESERVING ranked routes and surfacing what is real vs. only-linked, not toward a clean-sheet rewrite._

---

## 0. Method

Inventoried the live repo with `find` against the four route families called out in the brief (`dental-insurance*`, `ppo-dentists`, `guides`, `dentists`, `dental`, glossary). Confirmed file existence (not just link references) and read the hrefs/canonicals on the two PPO hub index pages. URL decision is locked as **Option B** (dual hubs, no 301): `/dental-insurance/ppo-plans/` = master spoke-tree owner; `/compare-ppo-dental-plans/` = comparison interface, equity preserved.

---

## 1. What ACTUALLY EXISTS (confirmed files, not links)

### Root dental-insurance layer
| Route | File | Status |
|---|---|---|
| `/dental-insurance/` | `dental-insurance/index.html` | LIVE — parent hub, links to glossary + spokes + branches |
| `/dental-insurance/ppo-plans/` | `.../ppo-plans/index.html` | LIVE — PPO master hub (canonical owner per Option B) |
| `/compare-ppo-dental-plans.html` | root | LIVE — comparison product (frozen data) |
| `/dental-insurance/ppo-plans/dd.html` | root of ppo-plans | **STRAY** — 144 KB, title = "Compare PPO Dental Plans" = a duplicate/older copy of the compare page sitting inside the spoke tree. Orphan. |

### Plan spokes (8 expected) — CONFIRMED present, but INCONSISTENT URL shape
| Carrier / plan | Actual route | Shape |
|---|---|---|
| Delta Dental (carrier hub) | `/dental-insurance/ppo-plans/delta-dental/` | NESTED (correct) |
| Delta — Premium | `.../delta-dental/premium/` | nested sub-spoke |
| Delta — Over 65 | `.../delta-dental/over-65/` | nested sub-spoke |
| Delta — UC Students | `.../delta-dental/uc-students/` | nested sub-spoke |
| Delta — Compare | `.../delta-dental/compare/` | nested compare view |
| Aetna Dental Direct | `.../ppo-plans/aetna-dental-direct/` | **FLAT** |
| Ameritas PrimeStar | `.../ppo-plans/ameritas-primestar/` | **FLAT** |
| Guardian Premier 2.0 | `.../ppo-plans/guardian-premier-ppo/` | **FLAT** |
| Humana Extend 5000 | `.../ppo-plans/humana-extend-5000/` | **FLAT** |
| Mutual of Omaha | `.../ppo-plans/mutual-of-omaha-dental/` | **FLAT** |
| UHC Primary Dental | `.../ppo-plans/uhc-primary-dental/` | **FLAT** |
| MetLife / NCD Complete | — | **MISSING** (noindex-until-verified per brief; no route exists) |

So 8 carriers are represented but only **Delta has a true carrier hub**; the other six are flat single-plan pages with no carrier-hub parent. This directly contradicts the canonical pattern in `00-MASTER-PROMPT.md` §"Carrier hubs" and `START-HERE` §4 (`/ppo-plans/{carrier}/{plan}/`).

### Glossary — STRONG and real (preserve)
- `/dental-insurance-glossary/` hub LIVE, plus **24 standalone term pages** as real folders/`index.html`: ada-fee, allowed-amount, annual-maximum, balance-billing, calendar-year, cdt, coinsurance, coverage-basic, coverage-major, coverage-preventive, day-one, deductible, effective-date, implants, in-network, missing-tooth, out-of-pocket, plan-year, ppo, rating, vision, waiting-period, whitening. (Source briefs in `glossary-briefs/term-*.md`.)
- The `dental-insurance/index.html` hub links to glossary via **hash anchors** (`/dental-insurance-glossary/#term-deductible`) even though standalone term pages exist. Mismatch — see §4.

### Timing / life-situation branches — real
- `/dental-insurance-no-waiting-period/`, `/dental-insurance-immediate-coverage/` (LIVE — overlapping intent; cannibalization risk flagged in brief §"Timing branches")
- `/dental-insurance-for-self-employed/`, `/dental-insurance-between-jobs/` (LIVE)

### Treatment / cost guides — real but THIN cluster
- `guides/crowns/` — 8 pages (cost, cost-with/without-insurance, insurance-coverage, financing, financing-no-credit-check, payment-plans, build-up-and-extra-costs). Crowns is the only treatment with depth.
- `guides/in-network-vs-out-of-network-costs.html`, `guides/medi-cal-vs-ppo-dental.html` (loose, no `guides/index.html` hub — orphan cluster)
- `/dental-treatment-cost-estimator.html` (LIVE, root)
- `/dental-financing-monthly-payments.html` (LIVE, root)

### Dentist-network branches — THREE parallel systems (the biggest IA risk)
1. `/dental/{state}/{market}/{city}/{dentist}/` — the **6,400-page generated SEO system** (the crown jewel; do NOT orphan).
2. `/ppo-dentists/california/{area}/{carrier}/` and `/{area}/{city}/` — carrier×area + city PPO hubs (e.g. `inland-empire/aetna/`, `orange-county/irvine/`). CA-only so far.
3. `/dentists/california/{area}/{city}/{practice}/` — 22 hand-built profile pages.

Three URL namespaces for "find a dentist who takes my plan" is the single most confusing part of the current IA and the place the PPO hub must bridge cleanly.

### Trust / methodology layer — WEAK
- Only `advertising-disclosure.html` exists. **No** `/methodology/`, `/sources/`, `/corrections/`, or `/reviewers/` page — yet the master hub anatomy (§"Master PPO hub" #13) and EEAT requirements assume one. This is a real gap, not a polish item.

---

## 2. What is ONLY LINKED (does NOT exist) — broken/placeholder

- `ppo-plans/index.html` links to **`/ppodentists.html`** → no such file (the real path is `/ppo-dentists/`). Broken.
- `ppo-plans/index.html` links to **`/compare-ppo-dental-plans.html`** (no slash) while `dental-insurance/index.html` links to **`/compare-ppo-dental-plans/`** (slash). One of these is the wrong canonical; pick one host form.
- ppo-plans hub does **not** link to Delta's `/over-65/`, `/uc-students/`, or `/compare/` sub-spokes → those four Delta pages are **orphans** (exist, no internal inbound link from the hub).
- ppo-plans hub omits a link to a Delta carrier hub in the same list shape as the flat spokes, so Delta is structurally invisible alongside its siblings.

---

## 3. Trailing-slash + canonical inconsistency (ships broken into prod)

| Surface | Link/canonical form |
|---|---|
| `dental-insurance/index.html` internal links | trailing slash (`/dental-insurance/ppo-plans/` … wait: it doesn't link spokes) |
| `ppo-plans/index.html` internal links | **NO** trailing slash (`/dental-insurance/ppo-plans/guardian-premier-ppo`) |
| Guardian spoke canonical | **NO** trailing slash (`…/guardian-premier-ppo`) |
| Glossary hub links | trailing slash + hash |

Two different slash conventions inside the same cluster will generate duplicate-URL/canonical splits the moment Vercel serves both. **Decide one (recommend trailing-slash, matches `/dental/` system) and make every canonical + internal link agree.** This is mandatory before any sitemap submission.

---

## 4. RECOMMENDED ROUTE TREE (target IA — Option B locked)

```
/dental-insurance/                         T1  topic hub (exists)
├── ppo-plans/                             T2  MASTER PPO HUB · canonical owner (exists)
│   ├── delta-dental/                      T3  carrier hub (exists ✓ model for all)
│   │   ├── premium/                       T4  plan spoke (exists)
│   │   ├── over-65/                       T4  plan spoke (exists, orphan → link it)
│   │   ├── uc-students/                   T4  plan spoke (exists, orphan → link it)
│   │   └── compare/                       T4  carrier compare view (exists, orphan → link it)
│   ├── aetna/                             T3  carrier hub  ← CREATE (thin-hub OK if 1 plan)
│   │   └── dental-direct/                 T4  ← move from flat aetna-dental-direct/ (301)
│   ├── ameritas/ → primestar/             same pattern (301 from ameritas-primestar/)
│   ├── guardian/ → premier-2-0/           same (301 from guardian-premier-ppo/)
│   ├── humana/ → extend-5000/             same (301 from humana-extend-5000/)
│   ├── mutual-of-omaha/ → dental-preferred/   same (301 from mutual-of-omaha-dental/)
│   ├── unitedhealthcare/ → primary-dental/    same (301 from uhc-primary-dental/)
│   └── metlife/ → ncd-complete/           CREATE, noindex until data verified
│
├── for-implants/ for-crowns/ for-root-canals/ …   T2 treatment branches (mostly MISSING)
├── no-waiting-period/  immediate-coverage/        T2 timing (exist; consolidate — see §6)
├── for-self-employed/  between-jobs/              T2 life-situation (exist)
├── methodology/  sources/  corrections/           T2 trust pages (MISSING — create)
└── glossary/  (= /dental-insurance-glossary/)     T2 glossary hub + 24 term pages (exist)

/compare-ppo-dental-plans/                 comparison interface (exists, keep, no 301)
/dental-treatment-cost-estimator/          cost tool (exists)
/dental/…                                  6,400 dentist directory (exists — the bridge target)
/ppo-dentists/…                            carrier×area dentist hubs (exists — CA only)
```

### Breadcrumbs (one consistent scheme)
`Home › Dental insurance › PPO plans › {Carrier} › {Plan}`
Treatment: `Home › Dental insurance › PPO plans › Implant coverage`
Glossary term: `Home › Dental insurance › PPO terms › Annual maximum`
Dentist bridge: keep the existing `/dental/` breadcrumb; PPO pages link OUT to it, never absorb it.

### Internal-link directions (orphan prevention)
- Master hub → every carrier hub + the compare page + estimator + glossary preview + dentist bridge. (Today it links 6 flat spokes and a broken `/ppodentists.html`.)
- Each carrier hub → its plan spokes + compare view + `/ppo-dentists/?carrier=` search + glossary terms that matter for that carrier (e.g. Delta → missing-tooth, MAC/U&C).
- Each plan spoke → parent carrier hub (up), 2–3 "compare with" sibling spokes (across), relevant treatment + timing pages (down), source drawer → `/sources/`.
- Glossary term page → 1–2 plans where the term bites + 1 treatment + cost estimator (action step), per brief §"Glossary term page".
- Treatment page → canonical plan comparison state, cost estimator, glossary, dentist search.
- Every PPO page → exactly ONE dentist bridge ("Find dentists for this plan") pointing at `/ppo-dentists/` (or `/dental/` city), never three competing links.

### noindex / canonical for filters
- Compare-tray / sort / filter states on the hub and `/compare/` views: render server-side facts, but `noindex,follow` any `?compare=…&sort=…` permutation; self-canonical the clean URL. (Brief §"Do not over-optimize" + §"filters must not create uncontrolled duplicate indexable URLs".)
- MetLife spoke: `noindex` until data verified (locked decision).
- `dd.html`: remove or 301 → `/compare-ppo-dental-plans/`; never index a second copy of the compare page.

---

## 5. PRESERVE list (founder's "don't make it worse" guardrails)

Do not orphan or strip these — they are ranked/real equity:
1. The **24 standalone glossary term pages** + glossary hub.
2. The **8 existing plan spokes** — re-slug via 301, do NOT delete content; carry copy + tracking forward.
3. `/compare-ppo-dental-plans/` — keep as comparison product, no 301 (Option B).
4. The **6,400-page `/dental/` directory** and `/ppo-dentists/` carrier hubs — the dentist bridge that no competitor has; PPO pages must point INTO it.
5. `guides/crowns/` 8-page cluster + cost estimator + financing page.
6. The 4 timing/life-situation pages.

## 6. CONSOLIDATION candidates
- `no-waiting-period` + `immediate-coverage` + (any "starts today") → one canonical timing page, others 301 or differentiated by distinct intent (overlap flagged in brief). Recommend: keep `immediate-coverage` as canonical, redirect duplicates.
- `dd.html` → delete/301 to compare page.
- Flat spokes → nested carrier/plan (301s, §4).
- `/dentists/` (22 hand pages) vs `/dental/` (generated) — long-term, fold the 22 into the generated system or 301 to their `/dental/` equivalents to kill the third namespace. (Flag, not urgent.)

## 7. MISSING / to create
- 6 carrier hubs (aetna, ameritas, guardian, humana, mutual-of-omaha, unitedhealthcare) on the Delta model.
- MetLife spoke (noindex).
- Treatment branches beyond crowns: implants, root-canals, dentures, orthodontics, high-annual-maximum.
- Trust layer: `/methodology/`, `/sources/`, `/corrections/`, reviewer page (EEAT + master-hub anatomy require it).
- `guides/index.html` hub (the guides cluster is currently a flat orphan set).

---

## 8. Risks
- **R1 (high):** re-slugging 6 flat spokes without 301s loses ranking equity → founder's exact fear. Every move needs a redirect + canonical update + sitemap entry, verified live before deleting the old file (`.bak` per rollback plan).
- **R2 (high):** trailing-slash split (§3) silently duplicates the whole PPO cluster.
- **R3 (med):** three dentist namespaces confuse crawlers and users; pick one bridge target now.
- **R4 (med):** broken `/ppodentists.html` link on the live master hub is a dead end today.

## 9. Acceptance criteria (IA)
- One slash convention across every canonical + internal link in the cluster.
- Zero orphan pages (all four Delta sub-spokes linked; no `dd.html`).
- Every plan reachable in ≤3 clicks from `/dental-insurance/`.
- One carrier-hub URL shape for all 8 carriers.
- Every 301 verified before old file removal; sitemap regenerated.
- One dentist bridge link per PPO page.

---
**Score: 5 / 10.** The skeleton is real and the equity (glossary depth, 8 spokes, the 6,400-page directory) is genuinely strong — better than "basic." But the cluster ships with an inconsistent URL grammar (flat vs nested spokes, slash vs no-slash), 4 orphaned Delta pages, a 144 KB stray duplicate, a broken hub link, a missing trust layer, and three parallel dentist namespaces. It is not worse than the current site; it is an unfinished, inconsistent version of a good plan.

**Top 3 recommendations**
1. **Normalize the URL grammar before anything else** — one trailing-slash convention everywhere, and migrate all 6 flat spokes to the nested `/{carrier}/{plan}/` shape Delta already uses, each with a 301 + canonical + sitemap update (no deletes until verified). This kills R1+R2 in one pass and is the single highest-equity-risk item.
2. **Fix orphans + strays now (cheap, high-trust):** link the 4 Delta sub-spokes from the hub, repair the broken `/ppodentists.html` link, and 301 `dd.html` → `/compare-ppo-dental-plans/`. Pick ONE dentist bridge target (`/ppo-dentists/`) and use it consistently.
3. **Build the missing carrier hubs + trust layer** — 6 carrier hubs on the Delta model and `/methodology/`+`/sources/`+`/corrections/` pages; these are required by the master-hub anatomy and EEAT and are what make the system feel "concierge / authoritative" rather than basic.
