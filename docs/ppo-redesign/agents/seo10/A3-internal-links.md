# SEO Architect 3 of 10 — Internal Linking & Hub-Spoke Mesh (Reciprocal-Link Fix List)

Builds on `docs/ppo-redesign/agents/elite/SEO4-internal-links.md`. Analysis and spec only. No code changes. No em-dashes. Premiums frozen.

Hub: `/compare-ppo-dental-plans.html` -> canonical `https://www.covercapy.com/compare-ppo-dental-plans/`
All routes verified against the on-disk tree under `/Users/kytlegacy/covercapycodex ultimate 21JUN26/`.

This memo delivers the four exact fix lists requested: (a) Delta hub + 4 sub-pages hub backlink, (b) plan pages to glossary deep-links, (c) scenario pages to plans, (d) the JS-built situations/treatments crawlability and 404 audit.

---

## (a) DELTA HUB + 4 SUB-PAGES: ZERO HUB BACKLINK

Verified: `grep "compare-ppo-dental-plans"` across `dental-insurance/ppo-plans/delta-dental/` returns 0 matches across all 5 files. The Delta hub's JSON-LD breadcrumb (line 27) names the PPO plans index but there is NO visible crawlable link, and nothing points to the master compare hub at all. The Delta cluster is a 5-page upward dead-end. It is the highest-traffic carrier.

All 5 files share the identical `nav.subnav > .sn-links` component (Delta hub line 299, confirmed present in compare/premium/over-65/uc-students). That `sn-links` row is the single insertion point: add ONE master-hub backlink there so the fix propagates by the same pattern across all five. Also add one in-body contextual backlink near each page's primary CTA.

| File | Insertion point (real line) | Action | Descriptive anchor | Target URL |
|---|---|---|---|---|
| `dental-insurance/ppo-plans/delta-dental/index.html` | inside `.sn-links`, after line 304 (`Over 65` link), before line 305 | add nav link | Compare all 8 PPO plans | `/compare-ppo-dental-plans/` |
| same | in-body, beside the `#waiting`/compare CTA cluster (lines 387, 420) | add contextual link | see the full side-by-side plan matrix | `/compare-ppo-dental-plans/#compare` |
| `dental-insurance/ppo-plans/delta-dental/compare/index.html` | inside `.sn-links` row (same component) | add nav link | Compare all 8 PPO plans | `/compare-ppo-dental-plans/` |
| same | in-body, end of the comparison section | add contextual link | back to the full PPO comparison | `/compare-ppo-dental-plans/#match` |
| `dental-insurance/ppo-plans/delta-dental/premium/index.html` | inside `.sn-links` row | add nav link | Compare all 8 PPO plans | `/compare-ppo-dental-plans/` |
| same | in-body, near plan CTA | add contextual link | how Delta Premium compares to 7 other plans | `/compare-ppo-dental-plans/#compare` |
| `dental-insurance/ppo-plans/delta-dental/over-65/index.html` | inside `.sn-links` row | add nav link | Compare all 8 PPO plans | `/compare-ppo-dental-plans/` |
| same | in-body, near SCAN benefit CTA (hub line 535 pattern) | add contextual link | see all individual PPO plans | `/compare-ppo-dental-plans/#shelf` |
| `dental-insurance/ppo-plans/delta-dental/uc-students/index.html` | inside `.sn-links` row | add nav link | Compare all 8 PPO plans | `/compare-ppo-dental-plans/` |
| same | in-body, near find-a-dentist block | add contextual link | compare PPO plans beyond UC SHIP | `/compare-ppo-dental-plans/#match` |

Rotate the in-body anchor strings as above; do not repeat one phrase. The single `.sn-links` nav anchor ("Compare all 8 PPO plans") is acceptable as a repeated nav element across the 5 sibling pages since it sits in a shared nav region.

Secondary note while in these files: `.sn-brand` (line 298), `For Dentists` (line 305), and the `.sn-right` links (line 307) are placeholder `href="#"` dead anchors on every Delta page. Repoint `For Dentists` to `/for-dentists` and the brand to `/` when touched.

---

## (b) PLAN PAGES LINK 0 GLOSSARY TERMS

Verified in SEO4 audit: glossary column is 0 across all 8 plan spokes. The term-to-plan relationship is one-directional. Each plan page must deep-link the glossary terms whose concepts already appear in its copy. All 23 term routes exist on disk under `/dental-insurance-glossary/`.

Per-plan deep-link assignment (first contextual mention of each concept becomes the anchor). Minimum 2 per page; assignments below give 3 to 4 where the copy supports it.

| Plan file (under `dental-insurance/ppo-plans/`) | Glossary terms to deep-link | Target URLs |
|---|---|---|
| `aetna-dental-direct/index.html` | waiting period, annual maximum, coinsurance | `/dental-insurance-glossary/waiting-period/`, `/annual-maximum/`, `/coinsurance/` |
| `ameritas-primestar/index.html` | waiting period, coverage (major), day one | `/dental-insurance-glossary/waiting-period/`, `/coverage-major/`, `/day-one/` |
| `delta-dental/index.html` | waiting period, annual maximum, in-network, missing tooth clause | `/dental-insurance-glossary/waiting-period/`, `/annual-maximum/`, `/in-network/`, `/missing-tooth/` |
| `guardian-premier-ppo/index.html` | waiting period, coverage (major), annual maximum | `/dental-insurance-glossary/waiting-period/`, `/coverage-major/`, `/annual-maximum/` |
| `humana-extend-5000/index.html` | annual maximum, implants, waiting period, vision | `/dental-insurance-glossary/annual-maximum/`, `/implants/`, `/waiting-period/`, `/vision/` |
| `metlife-ncd-complete/index.html` | annual maximum, deductible, coinsurance | `/dental-insurance-glossary/annual-maximum/`, `/deductible/`, `/coinsurance/` |
| `mutual-of-omaha-dental/index.html` | annual maximum, coinsurance, missing tooth clause, implants | `/dental-insurance-glossary/annual-maximum/`, `/coinsurance/`, `/missing-tooth/`, `/implants/` |
| `uhc-primary-dental/index.html` | effective date, day one, deductible | `/dental-insurance-glossary/effective-date/`, `/day-one/`, `/deductible/` |

Anchor style: link the concept phrase in running copy, varying framing per page ("what an annual maximum means" / "how the annual maximum caps your benefit" / "your annual maximum"). Never bare term repeated identically site-wide. Each glossary term should reciprocate with one relevant-plan link back (per SEO4 mesh floor).

---

## (c) SCENARIO PAGES LINK 0 SPECIFIC PLANS

Verified in SEO4 audit: all 4 scenario spokes link to plan pages 0 times. This is the weakest across-mesh edge. All 4 scenario routes confirmed on disk (read test: `dental-insurance-between-jobs/index.html`, `-immediate-coverage/`, `-for-self-employed/` all present; `-no-waiting-period/` present per SEO4). Map each scenario to 2 to 4 plans whose live attributes match the intent. Plan attributes sourced from the hub FAQ copy (lines 1956 to 1960), premiums frozen.

| Scenario page | Intent | Plans to link (2 to 4) | Target URLs | Suggested anchor |
|---|---|---|---|---|
| `dental-insurance-no-waiting-period/index.html` | day-one / fastest major coverage | Humana Extend 5000 (6-mo major, shortest), Ameritas PrimeStar (no major wait, day-one preventive), UnitedHealthcare Primary (active 1 to 3 days) | `/dental-insurance/ppo-plans/humana-extend-5000/`, `/ameritas-primestar/`, `/uhc-primary-dental/` | "plans with the shortest major wait" |
| `dental-insurance-immediate-coverage/index.html` | active fast, day-one preventive | UnitedHealthcare Primary, Ameritas PrimeStar, Guardian Premier (1st of next month) | `/dental-insurance/ppo-plans/uhc-primary-dental/`, `/ameritas-primestar/`, `/guardian-premier-ppo/` | "plans that start within days" |
| `dental-insurance-between-jobs/index.html` | bridge gap, cheap fast preventive | UnitedHealthcare Primary, Aetna Dental Direct, Ameritas PrimeStar | `/dental-insurance/ppo-plans/uhc-primary-dental/`, `/aetna-dental-direct/`, `/ameritas-primestar/` | "fast-activation bridge plans" |
| `dental-insurance-for-self-employed/index.html` | individual full-coverage, higher max | Mutual of Omaha ($5,000 max), Humana Extend 5000 ($5,000 max + vision), Delta Dental PPO Premium (adult ortho), MetLife NCD Complete | `/dental-insurance/ppo-plans/mutual-of-omaha-dental/`, `/humana-extend-5000/`, `/delta-dental/`, `/metlife-ncd-complete/` | "individual PPO plans with the highest annual max" |

Each scenario already over-links the hub (7 to 17 backlinks per SEO4); add these plan links plus at least 1 glossary link (e.g. no-waiting-period -> `/dental-insurance-glossary/waiting-period/`).

---

## (d) HUB JS-BUILT SITUATIONS / TREATMENTS: CRAWLABILITY + 404 AUDIT

The hub's situations and treatments grids are built client-side in `renderStatics()` (compare-ppo-dental-plans.html lines 1968 to 1984) from the `TREATMENTS` (line 1944) and `SITUATIONS` (line 1945) arrays. Both have crawl problems.

### Treatments grid (line 1969) — renders real `<a href>` but EVERY target 404s
`TREATMENTS.map(t => '<a class="mini" href="'+t[2]+'">...')`. The hrefs are real, but they are injected by JS (not in static HTML), and none of the target routes exist on disk. Read tests confirm `best-dental-insurance-for-crowns/`, `best-dental-insurance-for-braces/`, `dental-and-vision-insurance/`, and `best-dental-insurance-for-implants/` all return File-does-not-exist.

| Treatment label | Target URL (from line 1944) | On disk | Action |
|---|---|---|---|
| Implants | `/best-dental-insurance-for-implants/` | MISSING (404) | BUILD page, or repoint to `/dental-insurance-glossary/implants/` interim |
| Crowns | `/best-dental-insurance-for-crowns/` | MISSING (404) | BUILD page |
| Root canals | `/best-dental-insurance-for-root-canals/` | MISSING (404) | BUILD page |
| Braces & Invisalign | `/best-dental-insurance-for-braces/` | MISSING (404) | BUILD page |
| Dentures | `/best-dental-insurance-for-dentures/` | MISSING (404) | BUILD page |
| Wisdom teeth | `/best-dental-insurance-for-wisdom-teeth/` | MISSING (404) | BUILD page |
| Vision | `/dental-and-vision-insurance/` | MISSING (404) | BUILD page, or repoint to `/dental-insurance/ppo-plans/humana-extend-5000/` (only plan that bundles vision) interim |
| Emergency | `/best-dental-insurance-for-emergency/` | MISSING (404) | BUILD page |

All 8 treatment routes must be built or repointed. Until built, these are 8 dead links the moment JS runs. Interim repoint targets above use confirmed-existing routes.

### Situations grid (line 1978) — NO href at all, fully uncrawlable
`SITUATIONS.map((s,i) => '<div class="pc" data-i="'+i+'">...')` builds plain `<div>`s with a click handler (`applySituation`, line 1979) that only re-filters the on-page matcher. There is no anchor, no URL, nothing for a crawler to follow. The 6 situations duplicate the intent of the 4 scenario pages that already exist on disk. FIX: render each situation card as an `<a href>` to its matching scenario page (and keep the JS filter as a progressive-enhancement onclick).

| Situation label (line 1945) | Maps to scenario route | On disk | Action |
|---|---|---|---|
| I was laid off and lost dental | `/dental-insurance-between-jobs/` | EXISTS | wrap card in `<a href>` |
| My benefits start in 90 days | `/dental-insurance-no-waiting-period/` | EXISTS | wrap card in `<a href>` |
| My kid needs braces | `/best-dental-insurance-for-braces/` | MISSING (404) | build, or interim point to `/dental-insurance/ppo-plans/guardian-premier-ppo/` (only kids-ortho plan) |
| I need a crown this year | `/best-dental-insurance-for-crowns/` | MISSING (404) | build, or interim `/dental-insurance/ppo-plans/humana-extend-5000/` |
| I want an implant soon | `/best-dental-insurance-for-implants/` | MISSING (404) | build, or interim `/dental-insurance/ppo-plans/humana-extend-5000/` |
| I just want cleanings covered | `/dental-insurance-immediate-coverage/` | EXISTS | wrap card in `<a href>` |

### ARTICLES grid (line 1984, from line 1950) — 2 of 6 targets 404
The `ARTICLES` map renders real anchors (`<a class="art" href>`). Audit of its 6 targets:

| Article target | On disk | Status |
|---|---|---|
| `/learn/ppo-vs-hmo/` | MISSING (404) | BUILD or repoint to `/dental-insurance-glossary/ppo/` |
| `/dental-insurance-no-waiting-period/` | EXISTS | OK |
| `/learn/in-network/` | MISSING (404) | BUILD or repoint to `/dental-insurance-glossary/in-network/` |
| `/dental-insurance-between-jobs/` | EXISTS | OK |
| `/dental-insurance-for-self-employed/` | EXISTS | OK |
| `/dental-insurance-glossary/` | EXISTS | OK |

The `/learn/` directory does not exist on disk. Interim repoint both `/learn/` articles to the existing glossary terms (`ppo`, `in-network`) until dedicated articles ship.

### Cross-cutting crawlability fix
All three grids (treatments, situations, articles) are JS-injected, so the links do not exist in the static HTML a crawler sees on first fetch. For an elite hub and brand sitelinks, render these grids server-side / static in the HTML source (the data arrays are static constants, so no dynamic dependency). At minimum, add a static `<noscript>` mirror or pre-render the `#treatGrid`, `#situationGrid`, and `#artGrid` markup into the file. This is the single biggest crawl-equity leak on the hub.

---

## PRIORITY ORDER (extends SEO4 section 4)

1. Repoint or remove the 8 treatment 404s + 2 `/learn/` 404s + the SEO4 footer `/compare/is-X-good-insurance/` 5 404s (negative crawl signals first).
2. Pre-render `#treatGrid`, `#situationGrid`, `#artGrid` into static HTML (crawlability).
3. Wrap situation cards in scenario-page anchors (4 exist now, 2 need build).
4. Add the master-hub backlink to all 5 Delta files via the shared `.sn-links` nav + 1 in-body each.
5. Add 2 to 4 plan links per scenario page (section c).
6. Add 2 to 4 glossary deep-links per plan page (section b).
7. Build the 8 `/best-dental-insurance-for-*/` and `/dental-and-vision-insurance/` treatment pages and the 2 `/learn/` articles to retire the interim repoints.
