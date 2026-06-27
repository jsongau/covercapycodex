# U1 — Delta Dental Hub: Information Architecture & Interactive Navigation Map

> Agent U1 (UX). Source of truth: the five live files under
> `/dental-insurance/ppo-plans/delta-dental/`. Color = T5 jade scheme from
> `find-my-dentist.html`. Delta is a FULL HUB; PPO Premium is the GATEWAY.
> No "PPO Basic" exists and none is introduced here.

---

## 1. Node tree (real, on-disk structure)

```
/dental-insurance/ppo-plans/                         ← T2 parent (PPO Plans index, NOT in Delta scope)
└── delta-dental/                                     ← T3  DELTA HUB  (index.html)  ◀ hub landing
     │   role: orientation + dispatcher. Hub explore grid links all sub-hubs.
     │
     ├── premium/                                     ← T4  PPO PREMIUM  ★ GATEWAY
     │     role: the flagship plan page AND the doorway that opens the hub.
     │     owns: benefits table, waiting-period showcase, find-a-dentist tabs,
     │           verify, cost estimator, #nominate engine.
     │     #dentists / #nominate anchors are linked-to by every other node.
     │
     ├── compare/                                     ← T4  COMPARE (Decision Desk)
     │     role: "Is Delta good?" — Delta locked as baseline vs 5 carriers.
     │
     ├── over-65/                                     ← T4  OVER 65 (SCAN benefit)
     │     role: Medicare Advantage / SCAN Delta audience sub-hub (CA & WA).
     │
     ├── uc-students/                                 ← T4  UC STUDENTS (UC SHIP)
     │     role: student-audience sub-hub. Live Leaflet campus map + finder.
     │
     ├── students/{campus}/                           ← T5  CAMPUS LEAF PAGES (×10)
     │     ucla · uc-berkeley · uc-san-diego · uc-irvine · uc-davis ·
     │     uc-santa-barbara · uc-riverside · uc-santa-cruz ·
     │     uc-san-francisco · uc-merced
     │     linked from BOTH hub index and uc-students; pages not yet read/verified.
     │
     └── uc-dental-access/                            ← T5  DATA STUDY (linked from uc-students only)
```

### Node roles at a glance

| Node | URL | Tier | Page type | Gateway relationship |
|------|-----|------|-----------|----------------------|
| Delta Hub | `/delta-dental/` | T3 | Hub landing / dispatcher | Surfaces every sub-hub in explore grid |
| PPO Premium | `/delta-dental/premium/` | T4 | **Gateway** plan page | The doorway; owns shared tool anchors |
| Compare | `/delta-dental/compare/` | T4 | Decision tool | Sibling spoke |
| Over 65 | `/delta-dental/over-65/` | T4 | Audience sub-hub | Sibling spoke |
| UC Students | `/delta-dental/uc-students/` | T4 | Audience sub-hub | Sibling spoke + parent of campus leaves |
| Campus ×10 | `/delta-dental/students/{c}/` | T5 | Leaf | Children of UC Students |
| UC Dental Access | `/delta-dental/uc-dental-access/` | T5 | Data study | Child of UC Students |

---

## 2. Breadcrumb at each level (from page source)

| Page | Breadcrumb (UI + schema) |
|------|--------------------------|
| Hub | Home / Dental Insurance / PPO Plans / **Delta Dental** |
| Premium | Home / Dental Insurance / PPO Plans / Delta Dental / **Premium** |
| Compare | *(no visible crumb — has eyebrow "The PPO Decision Desk · Delta Dental vs." only; no `BreadcrumbList` schema)* ⚠ |
| Over 65 | Home / Delta Dental / **Over 65 · SCAN benefit** *(UI is 3-level shorthand; schema is full 5-level)* |
| UC Students | Home / Delta Dental / **UC Students** *(UI 3-level; schema full 5-level)* |

**Inconsistency flagged:** Hub + Premium render the full 4–5 segment crumb; Over-65 and UC-Students collapse the middle (Dental Insurance, PPO Plans) in the *visible* crumb while keeping all 5 in schema. Compare has neither a visible crumb nor BreadcrumbList JSON-LD. Recommendation in §6.

---

## 3. Sticky sub-nav labels, per page type

All pages mount a `position:sticky` sub-nav under a mega-nav band. Two label sets exist in the wild — they do not match.

**Set A — full hub sub-nav (Hub, Premium, Compare, Over 65):** 6 labels + right rail
```
Delta Hub | Premium Plan | Compare | Find PPO Dentists | Over 65 | For Dentists
right: [List your office]  [Patient Portal]
```
- `Find PPO Dentists` resolves differently per page: on Hub/Premium it is the in-page anchor `#dentists`; on Compare it points to `/premium/#dentists`; on Over-65 it points to local `#find`.
- Active state: each page marks its own label `.active` (jade underline). Over-65 marks "Over 65" via local `#how`.

**Set B — reduced sub-nav (UC Students only):** different component (`.sub`), only 4 labels, NO Over 65 / Compare-parity, NO right rail
```
Delta Hub | Premium Plan | Compare | UC Students(active)
```
⚠ UC Students is **absent** from Set A entirely, and Over 65 + "Find PPO Dentists" + "For Dentists" are absent from Set B. The two audience sub-hubs are not co-navigable.

**Recommended canonical label set (≤8, per design system §4):**
```
Delta Hub | Premium Plan | Compare | Find a Dentist | Over 65 | UC Students | For Dentists
```

---

## 4. Link graph — who links to whom (anchor text)

```
                         ┌──────────────────────────────────────────────┐
                         │             DELTA HUB (T3 index)             │
                         │  explore grid "Everything Delta, one place"  │
                         └───┬───────┬────────┬─────────┬───────────────┘
   "PPO Individual Premium Plan"  "Is Delta   "Delta PPO  "Delta for   "UC SHIP dental"
   (also subnav "Premium Plan")    good?"      dentists"   seniors"      (subnav lacks it)
        │                          │           │(#dentists  │             │
        ▼                          ▼           = on-hub)    ▼             ▼
 ┌────────────────┐        ┌──────────────┐         ┌────────────┐  ┌──────────────┐
 │ PREMIUM ★GATEWAY│◀──────│   COMPARE    │         │  OVER 65   │  │ UC STUDENTS  │
 │                │  "See   │ (Decision    │         │   (SCAN)   │  │  (UC SHIP)   │
 │ owns #dentists │  the    │  Desk)       │         │            │  │              │
 │ owns #nominate │ plan"   │              │         │            │  │              │
 └──┬────┬───┬────┘        └──────┬───────┘         └─────┬──────┘  └───┬──────┬───┘
    │    │   │                    │                       │             │      │
    │    │   │ "Compare waiting    │ "See the SCAN          │ Related:    │      │ "By campus" grid
    │    │   └─periods across     │  Delta benefit"        │ →Premium    │      ▼  (×10 leaves)
    │    │     plans" →compare    │  →over-65              │ →Compare   ┌─────────────────┐
    │    │                        │ (Premium #nominate     │ →premium   │ students/{campus}│
    │    │ hub "Compare vs other  │  for "find & book")    │  #nominate │ /uc-dental-access│
    │    └─plans" link →compare   └────────────────────────┘            └─────────────────┘
    │
    └─ Premium has NO outbound link UP to Hub except via sub-nav "Delta Hub".
```

### Edge inventory (body links, excluding sub-nav which is uniform)

| From | To | Anchor text |
|------|-----|-------------|
| Hub | Premium | "PPO Individual Premium Plan" / "Find Invisalign dentists" (#dentists) |
| Hub | Compare | "Is Delta Dental good?" / "Compare vs other plans" |
| Hub | Over 65 | "Delta for seniors" |
| Hub | UC Students | "UC SHIP dental" |
| Hub | students/{campus} ×10 | campus name cards |
| Premium | Compare | "Compare vs other plans" / "Compare waiting periods across plans" |
| Premium | *(self anchors)* | #dentists, #waiting, #nominate |
| Compare | Over 65 | "See the SCAN Delta benefit" |
| Compare | Premium#dentists | sub-nav "Find PPO Dentists" |
| Over 65 | Premium | "Delta Dental PPO Premium" (Related + FAQ) |
| Over 65 | Premium#nominate | "Have us find & book one" |
| Over 65 | Compare | "All PPO plans, side by side" |
| UC Students | Premium | "PPO Individual Premium Plan" (post-graduation) |
| UC Students | Compare | "Is Delta good?" |
| UC Students | Hub | "Delta Dental hub" (Related card + footer) |
| UC Students | students/{campus} ×10 | campus name cards |
| UC Students | uc-dental-access | "Dentist access by UC campus" |

---

## 5. Interactive nav components (how a user moves)

**Persistent (every page):**
1. **Mega-nav band** (`top:0`, z-50) — brand mark → Hub. On Hub/Premium/Over-65 it is a graphite bar linking `/delta-dental/`; on Compare it is still a grey placeholder ("YOUR MEGA NAV"). ⚠ Replace placeholder.
2. **Sticky sub-nav** (`top:56px`, z-40) — the lateral mover between Hub ↔ Premium ↔ Compare ↔ Over 65 (+ should include UC Students). Jade underline marks current node. This is the primary *back-and-lateral* mechanism (Premium → Hub via "Delta Hub", Premium → sibling via its label).
3. **Breadcrumb** (in-flow, below sub-nav) — the *up* mechanism to PPO Plans / Dental Insurance / Home.

**Gateway-specific (Premium):**
4. **Tabbed tool deck** (`#dentists` / benefits / verify / cost / nominate / disclaimers) — `showTab()`. Cross-page CTAs deep-link straight into a Premium tab (e.g. Over-65 → `premium/#nominate`).
5. **Pre-filled nomination engine** — the shared conversion endpoint other nodes funnel into.

**Sub-hub-specific:**
6. **Compare:** card-tap selector (`pick()`) swaps the right-hand comparison panel; Delta is fixed baseline.
7. **UC Students:** Leaflet map + campus `<select>` (`run()`) + verify/nominate modal (`openM()`); deep-links via `?uc={slug}`.

**Movement contract (Premium ↔ hub ↔ sub-hub):**
```
Premium ──(sub-nav "Delta Hub")────────────▶ Hub
Premium ──(sub-nav label / body link)──────▶ Compare / Over 65
Hub     ──(explore grid card)──────────────▶ any sub-hub  (the surfacing point)
Sub-hub ──(sub-nav "Premium Plan" / CTA)───▶ Premium gateway (+ deep tab anchor)
Sub-hub ──(footer / Related card)──────────▶ Hub
Any     ──(breadcrumb)─────────────────────▶ up to PPO Plans → Home
```

---

## 6. Orphan risks & gateway surfacing gaps

1. **UC Students is sub-nav-orphaned in Set A.** Hub/Premium/Compare/Over-65 sub-navs omit "UC Students". A user on the gateway cannot laterally reach it; only the Hub explore grid + body links do. **Fix:** add `UC Students` to the canonical sub-nav (§3).
2. **Over 65 + Find-a-Dentist absent from UC Students sub-nav (Set B).** The student page cannot reach the senior hub or the dentist finder laterally. **Fix:** unify on one sub-nav component/label set across all five pages.
3. **Campus leaves (×10) risk true orphaning.** They are linked from Hub + UC Students only. If a user lands on a campus leaf from search, it must carry the sub-nav + a breadcrumb back to UC Students and the Hub. **Fix:** verify each `students/{campus}/` mounts the canonical sub-nav and a `Home / Delta Dental / UC Students / {Campus}` crumb. (Pages not yet inspected — flag for U-series follow-up.)
4. **Compare has no breadcrumb and no BreadcrumbList schema.** It is reachable but not self-locating. **Fix:** add `Home / … / Delta Dental / Compare` crumb + JSON-LD.
5. **Gateway must surface ALL sub-hubs.** The Hub explore grid does this (5 cards incl. UC Students). But the **gateway page itself (Premium) surfaces only Compare** in body — it does not point sideways to Over 65 or UC Students. Since Premium is the page most users enter on (the "doorway"), it under-surfaces the audience hubs. **Fix:** add an "Is this you?" rail on Premium linking Over 65 + UC Students, or rely on the unified sub-nav (preferred, lower-weight).
6. **Mega-nav placeholder still live on Compare + Over-65.** Cosmetic orphan risk (brand mark may not link home). **Fix:** ship the real graphite mega-nav used on Hub/Premium across all nodes.
7. **`#dentists` anchor target drift.** "Find PPO Dentists" means three different destinations across pages (on-page `#dentists`, `premium/#dentists`, local `#find`). Harmless but inconsistent; canonicalize to `premium/#dentists` since the finder lives on the gateway.

---

## 7. Recommended canonical ASCII map (target state)

```
Home
└─ Dental Insurance
   └─ PPO Plans
      └─ Delta Dental  ──────────────── T3 HUB (dispatcher; explore grid = all 5 sub-hubs)
         ├─ Premium  ★ GATEWAY ──────── T4 (owns finder #dentists + nominate #nominate)
         ├─ Compare ──────────────────── T4
         ├─ Over 65 (SCAN) ───────────── T4
         └─ UC Students (UC SHIP) ────── T4
            ├─ students/ucla … merced ── T5 ×10 leaves
            └─ uc-dental-access ───────── T5 data study

  Unified sticky sub-nav on EVERY node (jade #5BE0A0 underline = current):
  [Delta Hub] [Premium Plan] [Compare] [Find a Dentist] [Over 65] [UC Students] [For Dentists]
```

---

## Top 3 recommendations

1. **Unify the sub-nav into one component with one ≤8-label set across all five+ pages** — adding `UC Students` (currently orphaned from the main sub-nav) and reconciling Set A vs Set B. This is the single biggest navigability fix: it makes Premium↔Hub↔every sub-hub lateral movement work everywhere.
2. **Give Compare and every campus leaf a visible breadcrumb + matching `BreadcrumbList` schema**, and replace the live mega-nav placeholder on Compare/Over-65 — so no node is unable to locate itself or send the user home.
3. **Make the gateway surface all audience sub-hubs.** The Hub explore grid does this, but Premium (the real doorway) only points to Compare; add Over 65 + UC Students surfacing (cleanly via the unified sub-nav, or an "Is this you?" rail) so seniors/students entering on Premium can reach their hub.
```
```
