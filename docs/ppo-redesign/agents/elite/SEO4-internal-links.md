# SEO Architect 4 — Internal Linking & Hub-and-Spoke Architecture

Hub file: `/compare-ppo-dental-plans.html` (canonical `https://www.covercapy.com/compare-ppo-dental-plans/`)
Scope: inventory every outbound link from the hub, verify each route on disk, spec the reciprocal mesh, flag orphans and 404s. Analysis and spec only. No code changes. No em-dashes.

All routes verified against the on-disk tree under:
- `/dental-insurance/ppo-plans/`
- `/dental-insurance-glossary/`

---

## 1. HUB OUTBOUND LINK INVENTORY (grounded in real lines)

### 1a. Plans dropdown (`#ddPlans` region) and plan cards / matrix
The hub links all 8 carrier plan pages, the all-carriers index, and the 4 Delta flyout sub-pages. Each main plan appears roughly 3 times (dropdown + card + matrix header), which is healthy.

| Anchor target | Hub occurrences | Route on disk | Status |
|---|---|---|---|
| `/dental-insurance/ppo-plans/` | 1 | `dental-insurance/ppo-plans/index.html` | OK |
| `/dental-insurance/ppo-plans/aetna-dental-direct/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/ameritas-primestar/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/delta-dental/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/guardian-premier-ppo/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/humana-extend-5000/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/metlife-ncd-complete/` | 1 | exists | OK but UNDER-LINKED (see flag) |
| `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | 3 | exists | OK |
| `/dental-insurance/ppo-plans/uhc-primary-dental/` | 3 | exists | OK |

### 1b. Delta Dental flyout (4 sub-pages)
| Anchor target | Hub occurrences | Route on disk | Status |
|---|---|---|---|
| `/dental-insurance/ppo-plans/delta-dental/compare/` | 1 | exists | OK |
| `/dental-insurance/ppo-plans/delta-dental/over-65/` | 1 | exists | OK |
| `/dental-insurance/ppo-plans/delta-dental/premium/` | 1 | exists | OK |
| `/dental-insurance/ppo-plans/delta-dental/uc-students/` | 1 | exists | OK |

### 1c. Insurance-terms dropdown + `#glossary-shelf` (line 1230)
Both the terms dropdown and the in-body glossary shelf link the SAME 10 terms plus the glossary index (each term appears 2x, once per surface).

Linked from hub (10): `annual-maximum, waiting-period, deductible, in-network, coinsurance, coverage-major, missing-tooth, out-of-pocket, effective-date, balance-billing` plus `/dental-insurance-glossary/` index.

22 term pages exist on disk. 12 are NEVER linked from the hub (orphan-from-hub, see flag 5):
`ada-fee, allowed-amount, calendar-year, cdt, coverage-basic, coverage-preventive, day-one, implants, plan-year, ppo, rating, vision, whitening`.

### 1d. Explore dropdown (`#ddExplore`, line 945)
| Anchor target | Route on disk | Status |
|---|---|---|
| `/dental-treatment-cost-estimator.html` | `dental-treatment-cost-estimator.html` | OK |
| `/dental-insurance/ppo-plans/` (all-carriers) | exists | OK |
| `/dental-insurance-no-waiting-period/` | `dental-insurance-no-waiting-period/index.html` | OK |
| `/dental-insurance-immediate-coverage/` | exists | OK |
| `/dental-insurance-between-jobs/` | exists | OK |
| `/dental-insurance-for-self-employed/` | exists | OK |
| In-page anchors `#match #compare #shelf #treatment #situation #faq` | n/a | OK (on-page) |

### 1e. In-body branch grid `#explore-carriers` (line 1206)
Carrier branch chips that point to the 8 plan pages (the 3x count in 1a includes these). Functions as the visual hub-to-spoke fan-out. OK.

### 1f. Other hub outbound (cross-cluster + conversion)
`/find-my-dentist`, `/for-dentists`, `/for-dentists#pricing`, `/compare-ppo-dental-plans/#shelf`. The `/dentists/'+d.id+'/` is a JS-built dentist profile link (dynamic, not auditable statically).

---

## 2. 404 / BROKEN ROUTE FLAGS

- 404 (footer, JS-generated, line 1975): `#footCompare` builds 5 links of the form `/compare/is-{carrier}-good-insurance/` for Delta Dental, UnitedHealthcare, Aetna, Guardian, Humana. There is NO `/compare/` directory on disk. All 5 are dead links (`/compare/is-delta-dental-good-insurance/`, `/compare/is-unitedhealthcare-good-insurance/`, etc.). FIX: either build the `/compare/is-X-good-insurance/` comparison pages, or remove the footer block until they exist.

No other hub outbound link 404s. All plan, glossary, scenario, estimator, and all-carriers routes resolve.

---

## 3. RECIPROCITY AUDIT (spokes back up + across)

### Plan spokes -> hub and cross-plan
| Plan spoke | links to hub | links to glossary | cross-plan links |
|---|---|---|---|
| aetna-dental-direct | 3 | 0 | 8 |
| ameritas-primestar | 3 | 0 | 6 |
| delta-dental | 0 | 0 | 26 |
| guardian-premier-ppo | 3 | 0 | 9 |
| humana-extend-5000 | 3 | 0 | 31 |
| metlife-ncd-complete | 4 | 0 | 7 |
| mutual-of-omaha-dental | 3 | 0 | 10 |
| uhc-primary-dental | 4 | 0 | 13 |

- FLAG: `delta-dental/index.html` has ZERO links back to the hub. It is the highest-traffic carrier and is currently a near-dead-end upward (only cross-plan links). Must add hub backlink(s).
- FLAG: NO plan spoke links to ANY glossary term (glossary column all 0). The term-to-plan relationship is one-directional. Plan pages should deep-link terms like `waiting-period`, `annual-maximum`, `coinsurance` where those concepts appear in the plan copy.

### Glossary cluster reciprocity
- `dental-insurance-glossary/index.html` links to the hub 6 times. OK.
- Sample term `ppo/index.html` links to the hub. Term-to-hub reciprocity present at the term level. OK.

### Scenario spokes -> hub and plans
| Scenario spoke | links to hub | links to plan pages |
|---|---|---|
| dental-insurance-between-jobs | 7 | 0 |
| dental-insurance-for-self-employed | 7 | 0 |
| dental-insurance-immediate-coverage | 8 | 0 |
| dental-insurance-no-waiting-period | 17 | 0 |

- Strong hub backlinks. FLAG: scenario pages do NOT link to any specific plan spoke. A "no waiting period" scenario should link directly to `humana-extend-5000` / relevant fast-coverage plans; "between jobs" should link to short-term-friendly plans. This is the weakest part of the across-mesh.

### All-carriers index (`ppo-plans/index.html`)
- Links to hub 4 times. OK.
- FLAG: lists only 6 of 8 plan cards. Missing `humana-extend-5000` and `metlife-ncd-complete`. The all-carriers index is the canonical spoke directory and must list all 8.

---

## 4. IDEAL RECIPROCAL MESH (spec)

Target topology: hub at center, 3 spoke clusters (plans, glossary terms, scenarios), plus estimator and find-my-dentist as conversion satellites.

1. Hub -> every spoke (DONE for plans, scenarios, estimator; PARTIAL for glossary — only 10 of 22 terms).
2. Every spoke -> hub, in both nav/breadcrumb and at least one in-body contextual anchor (FAILING on delta-dental).
3. Spoke -> across: each plan links 4 to 8 sibling plans (mostly DONE); each scenario links 2 to 4 relevant plans (FAILING, currently 0); each glossary term links 1 to 2 sibling terms and 1 relevant plan.
4. All-carriers index lists all 8 plans (currently 6).

### Link-count floor (per page)
- Plan spoke: at least 1 hub backlink in-body + 1 in nav; at least 4 sibling-plan links; at least 2 glossary deep-links; at least 1 estimator/find-a-dentist conversion link.
- Glossary term: at least 1 hub backlink; at least 2 sibling-term links; at least 1 relevant-plan link.
- Scenario: at least 1 hub backlink (have plenty); at least 2 relevant-plan links (currently 0); at least 1 glossary link.
- Hub: at least 1 link to every plan (have), every scenario (have), the estimator (have), the glossary index (have), and at least 12 to 15 glossary terms (currently 10).

### Descriptive anchor-text rotation
Avoid repeating identical anchor strings. Rotate per surface:
- Plans: "Delta Dental PPO plan", "see Delta Dental coverage details", "Delta Dental waiting periods and annual max". Carrier name + intent, never bare "click here" or repeated "Delta Dental" 3x identically.
- Glossary: "what an annual maximum means", "annual maximum explained", "how the annual maximum caps your benefit". Vary the gloss term framing.
- Scenarios: "coverage with no waiting period", "plans that start day one", "dental insurance between jobs".
- Hub backlinks from spokes: "compare all 8 PPO dental plans", "back to the full PPO comparison", "see the side-by-side plan matrix". Rotate, do not repeat one phrase site-wide.

### Which spokes must link back to the hub (priority order)
1. `delta-dental/index.html` (CRITICAL, currently 0 hub links).
2. All 8 plan pages add 2 contextual glossary deep-links each (currently 0).
3. All 4 scenario pages add 2 to 4 relevant-plan links each (currently 0).
4. `ppo-plans/index.html` add the 2 missing plan cards (humana, metlife).

---

## 5. ORPHAN / UNDER-LINKED SUMMARY

- 12 glossary term pages have ZERO inbound links from the hub: `ada-fee, allowed-amount, calendar-year, cdt, coverage-basic, coverage-preventive, day-one, implants, plan-year, ppo, rating, vision, whitening`. Risk: orphaned from the primary hub even if reachable from the glossary index. Add high-value ones (`ppo`, `coverage-preventive`, `coverage-basic`, `day-one`, `implants`, `whitening`) to the glossary shelf.
- `metlife-ncd-complete`: linked from hub only once (matrix only, not dropdown/card). Bring to 3x parity with siblings.
- `humana-extend-5000` and `metlife-ncd-complete`: missing from the all-carriers index grid.
- Delta flyout sub-pages (compare/over-65/premium/uc-students): linked only from the single flyout. Add cross-links from the main `delta-dental/` page and reciprocal links back to it.

---

## 6. SITELINKS NOTE
For Google brand sitelinks, the strongest internal-link signals should point at: the all-carriers index, find-my-dentist, the estimator, the glossary index, and the top scenario pages. Ensure each receives consistent, descriptive anchor text from the hub and from the global footer. Fixing the `/compare/` 404 footer block removes a negative crawl signal.
