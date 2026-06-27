# 15 — Hub Internal Linking Architecture (Spec)

**Agent:** hub20 · **Scope:** ANALYZE / SPEC only · Premiums FROZEN · No em-dashes
**Target page:** `/compare-ppo-dental-plans.html` (the LIVE hub)
**Goal:** Make the hub a real health-insurance-style pillar with a dense, static, crawlable link mesh so Google awards sitelinks for "covercapy insurance." Hub must meet or beat the ZIP's **63-link floor**.
**Reference:** `docs/ppo-redesign/_zip-21jun/ppo/seo/improvements/07-internal-linking-architecture.md`

---

## 1. Current state — audit of the live hub's outbound links

Source audited: `compare-ppo-dental-plans.html` (2,354 lines). All hrefs extracted and classified.

### What the hub already does well (static, crawlable `<a href>`)

| Link group | Where | Status |
|---|---|---|
| 7 PPO plan pages + Delta hub | Feature table rows (lines 972-978) AND feature block (lines 1154-1162) | STATIC, correct, trailing slashes |
| Delta Dental hub | `/dental-insurance/ppo-plans/delta-dental/` | STATIC, trailing slash |
| 11 glossary term pages | Terms section (lines 1178+) | STATIC, trailing slashes |
| 4 scenario pages | `no-waiting-period`, `immediate-coverage`, `between-jobs`, `for-self-employed` | STATIC, trailing slashes |
| `dental-insurance` parent + PPO hub self | Breadcrumb / nav | STATIC |
| find-my-dentist | `/find-my-dentist` (x2) | STATIC but **NO trailing slash** |

**Static body `<a href>` count (excluding fonts/CSS/`#` jump anchors): ~62.** This sits one link under the ZIP's 63 floor.

Confirmed on disk, all 7 flat plan slugs resolve to real routes under `dental-insurance/ppo-plans/`:
`humana-extend-5000`, `ameritas-primestar`, `guardian-premier-ppo`, `aetna-dental-direct`, `mutual-of-omaha-dental`, `uhc-primary-dental`, plus the `delta-dental/` hub (which itself has `compare/`, `over-65/`, `premium/`, `uc-students/` sub-routes).

### Gaps found (the floor-miss is concentrated here)

1. **NO treatment-guide links at all.** `guides/crowns/` (with `cost.html`, `insurance-coverage.html`, etc.) and `dental-insurance-glossary/implants/` exist on disk, but the hub never links them. The spec's plan-to-treatment-guide and hub-to-guide edges are entirely missing. This is the single biggest gap and the reason the count is at/under floor.
2. **Carrier-eval links point at routes that do not exist on disk.** The JS emits `/compare/is-{carrier}-good-insurance/`, but there is no `compare/` directory built. These are template-string hrefs (`href="'+...+'"`), so they are NOT in the static crawlable body and resolve to 404s. They do not count toward the floor and currently leak nothing.
3. **find-my-dentist link lacks a trailing slash** (`/find-my-dentist`), inconsistent with the trailing-slash mandate and the on-disk route convention.
4. **Some money-page links live only in JS template strings** (`/dental-insurance/ppo-plans/'+p.slug+'/`, `carrierHubUrl(...)`, `enrollUrl(p)`). These render client-side and are weaker for crawl. The static table + feature block already cover the 7 plans, so the static path is intact, but the duplicate JS paths add no crawl value.
5. **Anchor-text monotony.** Plan anchors are all "Carrier, Plan name" format. No variety, no in-prose contextual anchors. Links live in modules/table/rails, almost none in body prose.

---

## 2. The full link mesh the hub must emit (spec)

The hub is the PILLAR. Every edge below must be a **static `<a href>` in the rendered HTML body** (not a JS template string), use a **trailing slash**, point at the **canonical on-disk route**, and carry a **descriptive anchor**.

### A. Hub → 7 plan pages + Delta hub (money pages — KEEP, already static)
Down-links to every spoke. Already satisfied via the table and feature block. Action: keep both instances (table = scannable, feature block = prose-adjacent), vary the anchors between the two instances (see section 3).

### B. Hub → treatment / by-treatment guides (NEW — required)
The missing layer. Add a "By procedure" guide block linking the on-disk guides:

- `/guides/crowns/` — anchor: "dental insurance that covers crowns"
- `/dental-insurance-glossary/implants/` — anchor: "how PPO plans cover implants" (this is the implants explainer page)
- `/guides/in-network-vs-out-of-network-costs.html` — anchor: "in-network vs out-of-network costs"
- `/guides/medi-cal-vs-ppo-dental.html` — anchor: "Medi-Cal vs PPO dental coverage"

Plus the deeper crowns guide spokes where it reads naturally in prose:
- `/guides/crowns/cost-with-insurance.html` — "what a crown costs with insurance"
- `/guides/crowns/financing.html` — "ways to finance a crown"

### C. Hub → glossary term pages (KEEP + expand in-prose)
11 terms already linked in the Terms section. Add **2-4 in-prose contextual glossary links** inside hub body copy (section 4 of the ZIP doc): when the hub copy says "annual maximum", "waiting period", "coinsurance", "deductible", link the phrase to its glossary entry. These carry the strongest relevance weight.

### D. Hub → scenario / life-event pages (KEEP)
4 already static. Keep `no-waiting-period`, `immediate-coverage`, `between-jobs`, `for-self-employed`.

### E. Hub → find-a-dentist (FIX)
Change `/find-my-dentist` to `/find-my-dentist/` (trailing slash) OR confirm the canonical route. Anchor: "find a PPO dentist near you" (not bare "find my dentist").

### F. Hub → Delta hub sub-routes (NEW, optional depth)
Where Delta is discussed, link the Delta hub's real sub-pages to deepen the cluster: `/dental-insurance/ppo-plans/delta-dental/premium/`, `/over-65/`, `/uc-students/`, `/compare/`.

### G. Carrier-eval (`is-{carrier}-good-insurance`) — DO NOT LINK until built
The JS already references these. They are NOT on disk. Either (a) build the 7 carrier-eval pages and then emit static links, or (b) strip the dead JS hrefs. Do not ship links to 404s. Treat as a separate dependency, not part of this floor.

---

## 3. Link inventory + count floor

| # | Link group | Targets | Count |
|---|---|---|---|
| A | Plan pages (table) | 7 plans | 7 |
| A | Plan pages (feature block) | 7 plans (varied anchors) | 7 |
| A | Delta Dental hub | 1 | 1 |
| F | Delta sub-routes | premium, over-65, uc-students, compare | 4 |
| B | Treatment / by-treatment guides | crowns hub, implants, in-vs-out, medi-cal, +2 crown spokes | 6 |
| C | Glossary terms (Terms section) | 11 | 11 |
| C | Glossary in-prose contextual | 4 (annual max, waiting period, coinsurance, deductible) | 4 |
| D | Scenario / life-event pages | no-waiting, immediate, between-jobs, self-employed | 4 |
| E | Find-a-dentist | 1 (trailing slash) | 1 |
| — | PPO hub parent / breadcrumb | dental-insurance parent + hub self | 2 |
| — | for-dentists | 2 | 2 |
| — | Other static utility (estimate-cost, etc.) | ~3 | 3 |
| — | Compare-tool self anchors / shelf | 2 | 2 |
| — | In-page jump anchors (`#compare` etc.) | ~12 | (not counted to floor) |

**Static crawlable destination-link total at spec: ~54 unique + duplicated plan/Delta instances ≈ 58, plus the 6 NEW guide links and 4 NEW in-prose glossary links lifts the live total from ~62 to ~72.**

**Floor: 63. Target with this spec: ≥72 static body `<a href>`. Clears the floor by ~14%.** The lift comes almost entirely from the missing treatment-guide layer (B) plus in-prose glossary contextualization (C) — exactly the gaps the ZIP doc flags ("completeness of cluster mesh" and "in-prose contextual links"), not raw padding.

---

## 4. Exact anchor-text recommendations

Never "click here" / "learn more" / bare brand. Rotate anchors across the two plan instances so they read naturally.

| Target | Instance 1 (table) | Instance 2 (feature block / prose) |
|---|---|---|
| humana-extend-5000 | "Humana, Extend 5000" | "see the Humana Extend 5000 dental and vision plan" |
| ameritas-primestar | "Ameritas, PrimeStar Complete" | "Ameritas PrimeStar with no waiting periods" |
| guardian-premier-ppo | "Guardian, Premier 2.0" | "the Guardian Premier 2.0 PPO plan" |
| aetna-dental-direct | "Aetna, Dental Direct" | "Aetna Dental Direct everyday coverage" |
| mutual-of-omaha-dental | "Mutual of Omaha, Dental Preferred" | "Mutual of Omaha's $5,000 annual maximum plan" |
| uhc-primary-dental | "UnitedHealthcare, Primary Dental" | "the lowest-premium UnitedHealthcare Primary Dental plan" |
| delta-dental (hub) | "Delta Dental, PPO Premium" | "compare every Delta Dental PPO option" |

| Target type | Anchor pool (rotate) |
|---|---|
| Crowns guide | "dental insurance that covers crowns", "what a crown costs with insurance", "plans that pay for crown work" |
| Implants page | "how PPO plans cover implants", "day-one implant coverage", "best PPO coverage for implants" |
| Glossary annual-maximum | "what an annual maximum means", "how the annual maximum works" |
| Glossary waiting-period | "PPO plans with no waiting period", "how dental waiting periods work" |
| Glossary coinsurance | "how coinsurance splits the cost", "what coinsurance means on a crown" |
| Glossary deductible | "how PPO deductibles work" |
| no-waiting-period scenario | "dental insurance with no waiting period" |
| immediate-coverage scenario | "immediate dental coverage" |
| between-jobs scenario | "dental coverage between jobs" |
| find-a-dentist | "find a PPO dentist near you", "match with an in-network PPO dentist" |

---

## 5. Hard requirements (acceptance)

- [ ] All carrier/plan links are static crawlable `<a href>` with trailing slashes to the 7 flat on-disk routes under `/dental-insurance/ppo-plans/` + the `delta-dental/` hub.
- [ ] Treatment-guide layer added (currently missing) — at least crowns hub + implants + in-vs-out + medi-cal.
- [ ] 4 in-prose contextual glossary links added inside hub body copy.
- [ ] find-my-dentist link gets a trailing slash and a descriptive anchor.
- [ ] No links emitted to `compare/is-{carrier}-good-insurance/` until those pages exist on disk (no 404 links).
- [ ] Anchors varied across instances; zero generic anchors.
- [ ] Total static body destination links ≥ 63 (target ~72).
