# H2 — Main-Hub Information Architecture & Branch Map

> Route tree + branch map for the whole PPO + glossary cluster. Main hub = **Compare PPO Plans** at `/dental-insurance/ppo-plans/`. Goal: sitelinks for "covercapy insurance". Scheme = T5 jade. Verified against on-disk tree, June 2026.

---

## 0. The decision that anchors everything

**THE MAIN HUB IS `/dental-insurance/ppo-plans/`.** It is the parent of the 7 carrier nodes, the Delta hub, the glossary, and the treatment/timing branches. Every carrier and sub-hub breadcrumbs **up** to it; it links **down** to each with a descriptive anchor. This reciprocal mesh + one clean hierarchy is what earns sitelinks.

**🔴 CANONICAL CONFLICT (must resolve first):** Three URLs claim the "compare PPO plans" job:
- `/dental-insurance/ppo-plans/` — the PLAN's chosen hub (canonical points here). ← **WINNER**
- `/compare-ppo-dental-plans/` — the live + ZIP page's self-canonical.
- `/compare-ppo-dental-plans.html` — legacy `terms.html` canonical (stale).

Pick `/dental-insurance/ppo-plans/` as canonical; **301 the other two into it** (or canonical-tag them to it). Shipping two live "compare" pages is the single biggest sitelink/cannibalization risk in the cluster.

---

## 1. The full route tree (canonical URLs, on disk)

```
/dental-insurance/                                      T2  cluster root
└─ /dental-insurance/ppo-plans/                         T3  ★ MAIN HUB (Compare PPO Plans)
   │
   ├─ CARRIER BRANCH — 7 standard plan pages (one per carrier)
   │  ├─ /dental-insurance/ppo-plans/humana-extend-5000/        T4  (pilot)
   │  ├─ /dental-insurance/ppo-plans/uhc-primary-dental/        T4
   │  ├─ /dental-insurance/ppo-plans/aetna-dental-direct/       T4
   │  ├─ /dental-insurance/ppo-plans/ameritas-primestar/        T4
   │  ├─ /dental-insurance/ppo-plans/guardian-premier-ppo/      T4
   │  └─ /dental-insurance/ppo-plans/mutual-of-omaha-dental/    T4
   │     (MetLife = ZIP only, NOT on disk → noindex until built)
   │
   ├─ DELTA BRANCH — the ONE special carrier hub (sub-menu)
   │  └─ /dental-insurance/ppo-plans/delta-dental/              T4  CARRIER HUB (dispatcher)
   │     ├─ /…/delta-dental/premium/      ★ T5  PPO PREMIUM = GATEWAY (featured primary)
   │     ├─ /…/delta-dental/compare/         T5  Delta vs the field
   │     ├─ /…/delta-dental/over-65/         T5  SCAN seniors (HMO vs PPO buy-up)
   │     └─ /…/delta-dental/uc-students/     T5  UC SHIP students
   │        └─ students/{campus}/ + uc-dental-access  🔴 LINKED, NOT ON DISK (broken)
   │
   ├─ GLOSSARY BRANCH — site-wide crawlable SEO foundation
   │  └─ /dental-insurance-glossary/                     T3  GLOSSARY HUB (DefinedTermSet)
   │     └─ /dental-insurance-glossary/{term}/  ×23      T4  full term pages
   │        ada-fee · allowed-amount · annual-maximum · balance-billing ·
   │        calendar-year · cdt · coinsurance · coverage-basic · coverage-major ·
   │        coverage-preventive · day-one · deductible · effective-date · implants ·
   │        in-network · missing-tooth · out-of-pocket · plan-year · ppo · rating ·
   │        vision · waiting-period · whitening
   │
   └─ TREATMENT / TIMING BRANCH (cross-link targets, not children)
      └─ /dental-treatment-cost-estimator/               T3  per-procedure cost guides
         (implants · crowns · root canals · dentures · braces · whitening)
```

Note: glossary hub lives at the cluster root (`/dental-insurance-glossary/`), a **sibling** of the PPO hub under the shared `/dental-insurance/` umbrella — not a child of the PPO hub. The main hub still links to it (a short-glossary module), but the glossary's canonical parent is the cluster root, keeping it crawlable site-wide.

---

## 2. Breadcrumb paths (BreadcrumbList on EVERY node)

| Node | Breadcrumb |
|---|---|
| Main hub | Home › Dental Insurance › Compare PPO Plans |
| Carrier plan (e.g. Humana) | Home › … › Compare PPO Plans › Humana Extend 5000 |
| Delta hub | Home › … › Compare PPO Plans › Delta Dental |
| Delta Premium (gateway) | Home › … › Compare PPO Plans › Delta Dental › PPO Premium |
| Delta Compare / Over-65 / UC | Home › … › Compare PPO Plans › Delta Dental › {sub} |
| Glossary hub | Home › Dental Insurance › Glossary |
| Glossary term | Home › … › Glossary › {Term} |
| Cost estimator | Home › Dental Insurance › Treatment Cost Estimator |

🟠 Delta `compare/` currently has **no breadcrumb + no BreadcrumbList schema** (highest-intent page) — fix.

---

## 3. What the MAIN HUB must link to (link-down obligations)

The hub's body must surface, with descriptive anchors, ALL of:

1. **7 carrier nodes** — the 6 standard plan pages **+ the Delta hub** (descriptive: "Delta Dental PPO plans →").
2. **Delta Premium gateway** — a second, deeper link straight to `/delta-dental/premium/` (the flagship doorway).
3. **Glossary hub** + ~8 inline term links (the short-glossary module).
4. **Treatment/cost-estimator** + per-procedure deep links (implants, crowns, root canals, etc.).
5. **Delta sub-hubs** secondarily (Over-65, UC-Students) for audience routing.

🔴 **CURRENT STATE = ORPHAN RISK:** the on-disk hub (`ppo-plans/index.html`) links to only **6 carriers** and the cost estimator. It does **NOT link Delta Dental, the Delta hub, the Delta Premium gateway, or the glossary.** Delta — the biggest carrier and the only special hub — is orphaned from its own parent, and the glossary cluster has no inbound link from the commercial hub. These are the two highest-priority fixes.

---

## 4. Main-hub modules to build

### 4a. Carrier Branch Grid (replaces the live `shelf`/`compare` cards)
A 7-tile grid, server-rendered, each tile = one carrier:
- **6 standard tiles** → carrier plan page. Tile shows: carrier logo/name, plan name, `from $/mo · $max · best-for` strip, descriptive anchor ("Humana Extend 5000 review →").
- **1 Delta tile (featured, wider/elevated)** → the Delta hub. Sub-anchors inside the tile to **Premium (primary CTA, teal-night fill)** + ghost links to Compare · Over-65 · UC-Students. Delta is visually the flagship, mirroring the hub-index two-tier hierarchy from `06-DELTA-HUB-PLAN.md`.
- MetLife tile: omit or `noindex` placeholder until the page exists.
- Each tile links **across** the grid into the hub's compare matrix with that plan pinned.

### 4b. Short-Glossary module (the SEO foundation surface)
On the hub: **short defs** (1 sentence each) for the ~10–12 terms used on the page, each linking to its **full term page**. Pull from the 23 live pages — NOT the 18-stub `glossary.json` (that stub set must never become source of truth). Wrap in a labelled "Plain-English glossary" block with a "See all 23 terms →" link to the glossary hub. This is the crawl bridge that makes the glossary cluster a site-wide foundation rather than an island.

Maps to live hub's existing `#terms` section — upgrade it from inline tooltips to a linked short-glossary module.

---

## 5. Cross-link mesh (link-across + link-out)

- Each **carrier page** → breadcrumbs UP to hub, links ACROSS to 2–3 rival carrier pages (from its per-procedure comparison models), links OUT to glossary term pages (inline `cc-gloss` tooltips) and to treatment guides.
- **Delta Premium gateway** → must link to ALL Delta sub-hubs (Compare, Over-65, UC-Students) via an "Is this you?" router rail. 🟠 Currently links only Compare → Over-65 + UC orphaned from the doorway.
- **Glossary term pages** → "related terms" + back to glossary hub + (where natural) to the carrier/treatment page that uses the term.
- **Treatment guides** ← linked from every per-procedure comparison row.

---

## 6. Consolidation candidates & orphan risks

| Type | Item | Action |
|---|---|---|
| 🔴 Consolidate | `/compare-ppo-dental-plans/` + `/compare-ppo-dental-plans.html` vs `/dental-insurance/ppo-plans/` | Three "compare" URLs. 301 the two legacy ones → the hub. One canonical only. |
| 🔴 Consolidate | `dental-insurance/ppo-plans/dd.html` (loose file) | Stale Delta stub beside the real `delta-dental/` hub. Remove / 301 → `delta-dental/`. |
| 🔴 Consolidate | `assets/ppo/glossary.json` (18 stubs) vs 23 live term pages | Never let the stub set become source of truth. Glossary modules pull from the 23 pages. |
| 🔴 Orphan | **Delta hub + Premium gateway** | Not linked from the main hub. Add to carrier grid (featured tile). |
| 🔴 Orphan | **Glossary cluster** | No inbound link from the commercial hub. Add short-glossary module + hub link. |
| 🔴 Broken | Delta `students/{campus}/` ×10 + `uc-dental-access` | Linked, not on disk. Build or noindex; remove dead links meanwhile. |
| 🟠 Orphan | Delta Over-65 + UC-Students | Orphaned from the Premium gateway. Add router rail. |
| 🟠 Missing | MetLife plan page | In ZIP, not on disk. `noindex` until built; don't link live. |
| 🟠 Schema | Delta `compare/` | No breadcrumb / BreadcrumbList. Add. |

---

## 7. ASCII branch map (link obligations)

```
                         ┌──────────────────────────────────────────┐
                         │  MAIN HUB  /dental-insurance/ppo-plans/   │
                         │       (Compare PPO Plans · T3)            │
                         └───┬───────────────┬──────────────┬────────┘
        carrier branch grid  │               │ short-gloss  │ treatment
   ┌─────────────────────────┤               │              │
   │   ┌─────────────────────┤               │              │
   ▼   ▼      ▼      ▼     ▼  ▼               ▼              ▼
 Humana UHC Aetna Ameritas Guardian MoO   GLOSSARY HUB   COST ESTIMATOR
 (pilot) │    │      │       │      │    /dental-insurance  /dental-
   │     │    │      │       │      │      -glossary/        treatment-
   └──┬──┴────┴──across──────┴──────┘         │              cost-estimator/
      │ (per-procedure rivals)                ▼              (implants·crowns·
      └──out──► glossary terms          23 term pages         RCT·dentures·
                                        (ada-fee … whitening)  braces·whitening)
                         ▼ FEATURED TILE
              ┌──────────────────────────────┐
              │ DELTA DENTAL HUB (T4 special) │
              │ /…/ppo-plans/delta-dental/    │
              └──┬─────────┬────────┬─────────┘
   PRIMARY ★     │ secondary (explore-hub ghost rail)
                 ▼         ▼        ▼          ▼
            PREMIUM     Compare  Over-65   UC-Students
           (GATEWAY)                          │
              │ router rail → seniors/students └─► students/{campus} 🔴 + uc-dental-access 🔴
              └─► opens whole hub (finder/verify/enrol)
```

---

## Summary (~150 words)

The PPO + glossary cluster is one tree rooted at **`/dental-insurance/ppo-plans/`** (Compare PPO Plans), the main hub. Beneath it: a **carrier branch** of 7 plan pages (6 standard + the special **Delta hub**, whose Premium page is the featured-primary gateway over a ghost rail of Compare/Over-65/UC-Students sub-hubs); a **glossary branch** (1 hub + 23 live term pages) that sits at the cluster root as a site-wide crawlable foundation; and a **treatment/cost branch** as cross-link targets. The hub needs two new modules: a **carrier branch grid** (7 tiles, Delta featured) and a **short-glossary** block linking out to the full term pages. The biggest problems on disk: the live hub orphans **Delta and the entire glossary** (no inbound links), three competing "compare" URLs cannibalize each other, and Delta's UC campus leaves are broken. Fix the canonical, wire Delta + glossary into the hub, and the reciprocal mesh earns sitelinks.

## Top 3 recommendations
1. **Resolve the canonical war + wire the orphans.** Make `/dental-insurance/ppo-plans/` the sole canonical (301 `/compare-ppo-dental-plans/` and `.html` into it; kill `dd.html`), then add Delta + the glossary to the hub — without inbound links from the commercial hub, the two biggest SEO surfaces are invisible to the sitelink algorithm.
2. **Build the carrier branch grid with Delta featured.** 7 tiles, 6 standard → plan pages, 1 elevated Delta tile → hub with a primary Premium-gateway CTA and ghost sub-hub links. This is the hub's structural backbone and the descriptive-anchor source for sitelinks.
3. **Ship the short-glossary module from the 23 live pages (not the 18-stub JSON), and fix Delta's broken leaves** (10 campus pages + uc-dental-access) — build or noindex, and add the Premium "Is this you?" router rail so Over-65/UC-Students stop being orphaned from the gateway.
