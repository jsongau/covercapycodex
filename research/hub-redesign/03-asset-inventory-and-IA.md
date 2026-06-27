# /dental-insurance/ Hub Redesign — Asset Inventory & Information Architecture

**File:** `research/hub-redesign/03-asset-inventory-and-IA.md`
**Date:** 2026-06-26
**Scope:** Catalog every real linkable asset for the redesigned `/dental-insurance/` hub, assess the current page, and design the full information architecture (sections, internal-linking plan, breadcrumb/canonical, exact href lists).
**Canonical host (verified across all spokes):** `https://www.covercapy.com`

---

## 0. CRITICAL URL-FORMAT RULES (verified on disk via each page's own `<link rel="canonical">`)

Two URL conventions coexist in this repo. The hub MUST match each spoke's own canonical or it leaks authority to a 301/308 hop:

| Page type | Trailing slash? | Verified examples |
|-----------|-----------------|-------------------|
| **Folder pages** (`/dir/index.html`) | **YES — trailing slash** | `/dental-insurance/ppo-plans/delta-dental-ppo-premium/`, `/guides/glossary/deductible/`, `/benefit-maxing/` |
| **Root `.html` pages** (single file) | **NO trailing slash** | `/compare-ppo-dental-plans`, `/dental-financing-monthly-payments`, `/dental-treatment-cost-estimator`, `/dentist`, `/find-my-dentist` |

> The CURRENT hub already gets this wrong: it links `/compare-ppo-dental-plans/` (with slash) in the hero, spoke card, sidebar, and schema. The page itself canonicalizes to `/compare-ppo-dental-plans` (no slash). **Build agent: drop the trailing slash on all four root-`.html` targets.**

---

## 1. FULL ASSET INVENTORY (every file confirmed to exist on disk)

### 1A. Compare / decision tools (root `.html`, NO trailing slash)
| Asset | Real href |
|-------|-----------|
| Compare PPO plans (primary decision tool) | `https://www.covercapy.com/compare-ppo-dental-plans` |
| Dental financing / monthly payments | `https://www.covercapy.com/dental-financing-monthly-payments` |
| Treatment cost estimator | `https://www.covercapy.com/dental-treatment-cost-estimator` |

### 1B. The PPO plan pages — `dental-insurance/ppo-plans/` (trailing slash)
**Canonical (flat-slug) versions — link ONLY these. All 8 self-canonicalize correctly:**

| Plan | Real href |
|------|-----------|
| Delta Dental PPO (Premium) | `https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/` |
| UnitedHealthcare Primary Dental | `https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/` |
| Aetna Dental Direct | `https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/` |
| Ameritas PrimeStar | `https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/` |
| Guardian Premier PPO | `https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/` |
| Humana Extend 5000 | `https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/` |
| MetLife NCD Complete | `https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/` |
| Mutual of Omaha Dental | `https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/` |
| PPO plans index/hub | `https://www.covercapy.com/dental-insurance/ppo-plans/` |

> **"9 pages" note:** the directory holds 8 distinct carriers + the `ppo-plans/` index (the 9th). There is no separate MetLife duplicate — MetLife is one of the 8.

**DUPLICATE / canonical-leak warning — DO NOT link these nested paths:**
`ppo-plans/delta/ppo-premium/`, `uhc/primary-dental/`, `aetna/dental-direct/`, `ameritas/primestar-care-complete/`, `guardian/premier-2-0/`, `humana/extend-5000/`, `metlife/ncd-complete/`, `mutual-of-omaha/dental-preferred/`.
- `aetna`, `ameritas`, `humana`, `metlife` nested pages correctly canonicalize → flat slug (safe but redundant).
- **`delta/ppo-premium/`, `uhc/primary-dental/`, `guardian/premier-2-0/` SELF-canonicalize** = live duplicate content. Flag for cleanup (301 → flat slug). **Hub must never link the nested versions.**

### 1C. Delta Dental cluster — `dental-insurance/delta-dental/` (trailing slash). All 12 confirmed:
| Page | Real href |
|------|-----------|
| Delta Dental hub | `https://www.covercapy.com/dental-insurance/delta-dental/` |
| Find a Delta dentist | `https://www.covercapy.com/dental-insurance/delta-dental/find-a-dentist/` |
| Delta over 65 / seniors | `https://www.covercapy.com/dental-insurance/delta-dental/over-65/` |
| Delta networks (PPO vs Premier) | `https://www.covercapy.com/dental-insurance/delta-dental/networks/` |
| Delta eligibility | `https://www.covercapy.com/dental-insurance/delta-dental/eligibility/` |
| Delta individual plans | `https://www.covercapy.com/dental-insurance/delta-dental/individual-plans/` |
| Delta premium | `https://www.covercapy.com/dental-insurance/delta-dental/premium/` |
| Is Delta good? | `https://www.covercapy.com/dental-insurance/delta-dental/is-delta-good/` |
| Delta compare | `https://www.covercapy.com/dental-insurance/delta-dental/compare/` |
| Delta for employers | `https://www.covercapy.com/dental-insurance/delta-dental/for-employers/` |
| Delta for dentists | `https://www.covercapy.com/dental-insurance/delta-dental/for-dentists/` |
| Delta UC students | `https://www.covercapy.com/dental-insurance/delta-dental/uc-students/` |

### 1D. MetLife + Guardian carrier pages (trailing slash)
| Page | Real href |
|------|-----------|
| MetLife find-a-dentist (NEW) | `https://www.covercapy.com/dental-insurance/metlife/find-a-dentist/` |
| Guardian orthodontics coverage | `https://www.covercapy.com/dental-insurance/guardian-orthodontics-coverage/` |

### 1E. Situational guides — `guides/` (trailing slash). All confirmed with index.html:
| Guide | Real href |
|-------|-----------|
| Between jobs | `https://www.covercapy.com/guides/between-jobs/` |
| Self-employed | `https://www.covercapy.com/guides/self-employed/` |
| No waiting period | `https://www.covercapy.com/guides/no-waiting-period/` |
| Immediate coverage | `https://www.covercapy.com/guides/immediate-coverage/` |

### 1F. Treatment guides — `guides/` (trailing slash)
**Single-page guides (have index.html):**
| Guide | Real href |
|-------|-----------|
| Implants | `https://www.covercapy.com/guides/implants/` |
| Braces & Invisalign | `https://www.covercapy.com/guides/braces-invisalign/` |
| Root canals | `https://www.covercapy.com/guides/root-canals/` |
| Dentures | `https://www.covercapy.com/guides/dentures/` |
| Whitening | `https://www.covercapy.com/guides/whitening/` |

**Crowns is a CLUSTER, not a single guide — `guides/crowns/` has NO index.html.** It has 8 sub-pages (cost, cost-with-insurance, cost-without-insurance, build-up-and-extra-costs, insurance-coverage, financing, financing-no-credit-check, payment-plans). Best hub link is the cost page:
`https://www.covercapy.com/guides/crowns/cost` (root-style `.html`, NO trailing slash).
> **GAP:** `guides/crowns/index.html` is missing. Either add a crowns hub index, or link the crowns cluster via `/guides/crowns/cost` and flag for an index build.

### 1G. Benefit-maxing hub + treatment & emergency clusters — `benefit-maxing/` (trailing slash)
| Page | Real href |
|------|-----------|
| Benefit-maxing hub | `https://www.covercapy.com/benefit-maxing/` |
| Smart timing protocol | `https://www.covercapy.com/benefit-maxing/smart-timing-protocol/` |
| BM: implants | `https://www.covercapy.com/benefit-maxing/guides/implants/` |
| BM: crowns | `https://www.covercapy.com/benefit-maxing/guides/crowns/` |
| BM: root canals | `https://www.covercapy.com/benefit-maxing/guides/root-canals/` |
| BM: braces-invisalign | `https://www.covercapy.com/benefit-maxing/guides/braces-invisalign/` |
| BM: dentures | `https://www.covercapy.com/benefit-maxing/guides/dentures/` |
| BM: bridges | `https://www.covercapy.com/benefit-maxing/guides/bridges/` |
| BM: deep cleaning | `https://www.covercapy.com/benefit-maxing/guides/deep-cleaning/` |
| BM: extractions | `https://www.covercapy.com/benefit-maxing/guides/extractions/` |
| BM: fillings | `https://www.covercapy.com/benefit-maxing/guides/fillings/` |
| BM: whitening | `https://www.covercapy.com/benefit-maxing/guides/whitening/` |
| Dental emergencies hub | `https://www.covercapy.com/benefit-maxing/guides/dental-emergencies/` |

**Dental-emergencies 10 sub-pages** (all under `https://www.covercapy.com/benefit-maxing/guides/dental-emergencies/`):
`cracked-tooth/`, `dental-anxiety/`, `dental-pain-relief/`, `emergency-dental-cost/`, `emergency-dental-exam/`, `emergency-dental-insurance/`, `knocked-out-tooth/`, `lost-filling-or-crown/`, `severe-toothache/`, `tooth-abscess/`

### 1H. Glossary — hub + 23 term subdir pages (trailing slash, real index.html each)
**Hub:** `https://www.covercapy.com/guides/glossary/`
**23 terms** (link the SUBDIR pages, not hub anchors — each is a real canonical page):
`ada-fee`, `allowed-amount`, `annual-maximum`, `balance-billing`, `calendar-year`, `cdt`, `coinsurance`, `coverage-basic`, `coverage-major`, `coverage-preventive`, `day-one`, `deductible`, `effective-date`, `implants`, `in-network`, `missing-tooth`, `out-of-pocket`, `plan-year`, `ppo`, `rating`, `vision`, `waiting-period`, `whitening`
Pattern: `https://www.covercapy.com/guides/glossary/{term}/`
> **Fix in current hub:** existing term pills point to hub anchors (`/guides/glossary/#term-deductible`). Each term now has its OWN crawlable page — link `/guides/glossary/deductible/` instead to push authority to the leaf pages.

### 1I. Find-a-dentist / national directory (root `.html`, NO trailing slash)
| Page | Real href |
|------|-----------|
| National dentist hub | `https://www.covercapy.com/dentist` |
| Find my dentist (interactive search) | `https://www.covercapy.com/find-my-dentist` |

---

## 2. CURRENT HUB ASSESSMENT (`dental-insurance/index.html`, 482 lines)

**Has:** hero, 6 spoke cards, a "by situation" list, a 12-term glossary pill block, sidebar CTA + mini-TOC, universal nav/footer mount, gold/jade theme toggle, WebPage+Breadcrumb+SiteNavigation schema.

**Only links ~10 destinations.** It is NOT a hub — it's a thin situational-guides landing page.

**Missing entirely (high-value authority sinks left unlinked):**
- All 8 PPO plan pages + the ppo-plans index (zero carrier links).
- The entire 12-page Delta cluster.
- MetLife find-a-dentist; Guardian orthodontics.
- All 5 treatment guides + crowns cluster.
- Benefit-maxing hub + ~24 BM/emergency pages.
- Financing + cost estimator.
- National `/dentist` hub (only links `/find-my-dentist`).
- Glossary term LEAF pages (links anchors, not the 23 real subdir pages).

**Defects to fix:** trailing slash on `/compare-ppo-dental-plans/`; glossary anchors vs leaf pages; schema `hasPart` lists only 6 items.

---

## 3. INFORMATION ARCHITECTURE — NEW HUB

**Role:** `/dental-insurance/` is the **T2 topical hub** for the insurance silo. It sits below Home, above all carrier/plan/guide/glossary spokes. It must (a) link to every spoke, (b) be linked back FROM every spoke ("part of the Dental Insurance hub" breadcrumb), and (c) route to the two money pages: Compare and Find-a-dentist.

### Breadcrumb
`Home (/) > Dental Insurance (/dental-insurance/)`

### Canonical
`<link rel="canonical" href="https://www.covercapy.com/dental-insurance/">` (trailing slash — folder page).

### Section structure ("everything you can search for"), grouped by intent

**Section 1 — Start here (decision tools).** Compare + cost + financing.
- `/compare-ppo-dental-plans` , `/dental-treatment-cost-estimator` , `/dental-financing-monthly-payments`

**Section 2 — By carrier (brand-intent traffic).** 8 carrier/plan cards -> flat-slug plan pages; Delta and MetLife also expose their cluster hubs.
- Delta -> `/dental-insurance/delta-dental/` (cluster) + `/dental-insurance/ppo-plans/delta-dental-ppo-premium/`
- UHC `/dental-insurance/ppo-plans/uhc-primary-dental/`
- Aetna `/dental-insurance/ppo-plans/aetna-dental-direct/`
- Ameritas `/dental-insurance/ppo-plans/ameritas-primestar/`
- Guardian `/dental-insurance/ppo-plans/guardian-premier-ppo/` (+ `/dental-insurance/guardian-orthodontics-coverage/`)
- Humana `/dental-insurance/ppo-plans/humana-extend-5000/`
- MetLife `/dental-insurance/ppo-plans/metlife-ncd-complete/` (+ `/dental-insurance/metlife/find-a-dentist/`)
- Mutual of Omaha `/dental-insurance/ppo-plans/mutual-of-omaha-dental/`
- "See all plans" -> `/dental-insurance/ppo-plans/`

**Section 3 — Delta Dental deep-dive (largest cluster, dedicated block).** All 12 Delta URLs from 1C (find-a-dentist, over-65, networks, eligibility, individual-plans, premium, is-delta-good, compare, for-employers, for-dentists, uc-students, hub).

**Section 4 — By plan type / by situation.** 4 situational guides (1E) as the existing "Find insurance for your situation" list. Keep the 6 plain-English prompts but point to the 4 guides + compare + glossary.

**Section 5 — By treatment (what am I getting covered).** 5 treatment guides + crowns cluster + braces/ortho.
- `/guides/implants/` , `/guides/braces-invisalign/` , `/guides/root-canals/` , `/guides/dentures/` , `/guides/whitening/` , `/guides/crowns/cost` (crowns cluster entry)

**Section 6 — By cost / get the most from your plan.** Benefit-maxing hub + smart-timing + cost/financing + emergencies hub.
- `/benefit-maxing/` , `/benefit-maxing/smart-timing-protocol/` , `/benefit-maxing/guides/dental-emergencies/` , `/dental-treatment-cost-estimator` , `/dental-financing-monthly-payments`

**Section 7 — Learn / glossary.** Glossary hub + all 23 term LEAF pages (1H) as pills linking `/guides/glossary/{term}/`.

**Section 8 — Find a dentist (route authority out).** National hub + interactive search + carrier dentist finders.
- `/dentist` , `/find-my-dentist` , `/dental-insurance/delta-dental/find-a-dentist/` , `/dental-insurance/metlife/find-a-dentist/`

### Internal-linking plan (hub -> spokes -> hub)
1. **Hub -> spokes:** every URL in 1 appears at least once in the body (sections above), plus a compact "in this hub" sidebar TOC of the 8 section anchors.
2. **Spokes -> hub:** every spoke's breadcrumb/eyebrow links back to `/dental-insurance/` (the "part of Dental Insurance" backlink). Verify on rebuild; this is the silo's return path.
3. **Lateral (spoke <-> spoke):** carrier plan page -> its glossary terms (annual-maximum, waiting-period) and its treatment guide; treatment guide -> matching benefit-maxing page; situational guide -> compare + no-waiting plans.
4. **Authority routing:** Compare and `/dentist` + `/find-my-dentist` are the two conversion sinks — link them from hero, each carrier card, and the bottom CTA. The hub deliberately concentrates link equity on these.

### Schema updates
Expand `WebPage.hasPart` and `SiteNavigationElement.hasPart` to enumerate all 1 URLs (carriers, Delta cluster, treatments, glossary hub, benefit-maxing, dentist hub). Keep BreadcrumbList 2-level. Use trailing-slash-correct URLs per 0.

---

## 4. GAPS — pages that SHOULD exist for a complete hub
1. **`guides/crowns/index.html` MISSING** — crowns is the only treatment with no hub page (8 orphaned cost sub-pages). Build a crowns index to match implants/dentures/etc.
2. **Duplicate-content leak (3 live):** `ppo-plans/delta/ppo-premium/`, `uhc/primary-dental/`, `guardian/premier-2-0/` self-canonicalize instead of pointing to flat slugs. 301/canonical them to the flat slug.
3. **No "by plan type" taxonomy pages** (e.g. `/dental-insurance/ppo-vs-dhmo/`, `/dental-insurance/no-annual-maximum/`) — situational guides exist but no plan-structure explainers. Candidate net-new spokes.
4. **No Aetna/UHC/Humana/Ameritas/Mutual-of-Omaha "find a dentist"** pages — only Delta and MetLife have them. For carrier parity, add find-a-dentist for the other 6 carriers.
5. **No senior/Medicare hub at insurance level** — only `delta-dental/over-65/` exists; a cross-carrier `/dental-insurance/seniors/` would consolidate.
6. **Root-`.html` slash inconsistency** is a sitewide hazard — the hub must hard-code no-slash for the 5 root pages; consider migrating those to folders for consistency long-term.
