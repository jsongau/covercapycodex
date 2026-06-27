# Synthesis Council & Decisions — PPO Redesign

> Synthesis of all 21 agent memos (`agents/`) by the four-director council. June 2026.
> Read this to know what the redesign must KEEP, what it must ADD, and what BLOCKS publication.

## The founder's worry, answered

> *"I'm worried this is going to be too basic and much worse than the current version."*

**The council's unanimous finding: your current pages are NOT basic — they're genuinely strong, and the real risk is regression, not weakness.** Twelve of the twenty-one memos independently said the same thing: the live page and the ZIP each carry load-bearing assets a careless reskin would delete. The redesign's job is to **fuse** them, not replace them. The skeletons I showed you earlier were design proofs; they are *intentionally* lighter than your real pages, which is exactly why they looked thinner.

Current-state score across the council: **~6.6 / 10** — strong foundations, dragged down by a handful of real defects (data conflicts, JS-only rendering, IA inconsistency, one trust liability), not by being simplistic.

## Per-dimension scores

| Dimension | Agents | Score | One-line |
|---|---|---|---|
| Visual coherence | 01–04 | 4–6.5 | Three competing languages → unify to Warm/Jade (done, approved) |
| Comparison UX | 02 | 7.5 | ZIP matrix is strong; add Smart Match as a lens |
| Mobile / sticky | 03 | 5 | One subnav + one tray discipline needed |
| Accessibility | 06 | 5.5 | Real AA contrast failures (fixed in tokens) |
| Urgent journeys | 07 | 6.5 | Strong diagnosis, **no buy step** — dead-ends at "verify" |
| Budget / family | 08 | 6.5 | Anchors on monthly only; needs total-cost (Y1/Y2) |
| Dentist / network | 09 | 6.5 | **Wrong network names** in compare page; "accepts"≠"in-network" |
| Action psychology | 10 | 7 | The current action engine is the page's **strongest** asset |
| Checkout / conversion | 11 | 6.5 | Preserve `valueFrame()`; rename "Activate"; add save/email |
| Retention / learning | 12 | 6 | Preserve 3-layer tooltips; add saved comparisons |
| Information architecture | 13 | 5 | Split URL grammar, orphans, 3 dentist namespaces |
| Hub-spoke SEO | 14 | 6.5 | Two-hub conflict; build the link matrix |
| Technical SEO | 15 | 6.5 | **JS-only facts + schema** on live page = liability |
| SERP metadata | 16 | 7.5 | ZIP metadata is ahead of live; fix Delta duplicate |
| Schema / entities | 17 | 6.5 | Remove `Offer.price`; server-render the `@graph` |
| AI search | 18 | 7.5 | The `.md` tables are elite AI-citation fuel |
| Knowledge graph | 19 | 8 | The data model is the asset; prevent drift |
| Glossary | 20 | 7.5 | 24 real term pages; `glossary.json` must not become canonical |
| Data governance | 21 | 6.5 | One trust liability + unresolved conflicts block publish |

## The four directors

**Design director (01–06):** Collapse the three visual languages into one (Warm/Jade Direction C — approved). KEEP the warm brand + Fraunces voice + Smart Match; ADD the spec-first instrument and the AA-corrected tokens; enforce mobile one-subnav/one-tray.

**Product & Conversion director (07–12):** The current **action engine is your single biggest competitive asset** — emergency-aware Smart Match, the `valueFrame()` cash-vs-premium math (the ZIP has no equivalent), one-match-plus-honest-backup, and three-layer glossary tooltips. These MUST survive. The redesign must ADD: a real **buy/enrol step** (today the journey dead-ends at "verify a dentist"), a **total-cost Year-1/Year-2 view** (not monthly-only), **saved/returnable comparisons**, **predetermination** (never named today), and **one canonical scoring engine** (there are currently two divergent matchers).

**SEO & AI director (13–18):** Confirm **Option B** — pillar hub `/dental-insurance/ppo-plans/` + keep `/compare-ppo-dental-plans/` as the comparison tool; **do NOT 301** the compare URL (it carries equity); split their intents and titles. Fix the **JS-only plan facts + JSON-LD** on the live hub (server-render — it's invisible in View Source today). Normalize URL grammar/trailing-slash. Build the cross-type internal-link matrix with reciprocity. Lead every page with an **answer-first block**. Reuse one entity `@id` per carrier.

**Data & Trust director (19–21):** The data model is rich and is the asset — pin **one canonical `PlanSpec`** so no number is typed twice. BLOCKING items below.

## Preservation contract — do NOT lose these (the anti-regression checklist)

From the **live page:** emergency-aware Smart Match · `valueFrame()` cash-vs-premium payoff · one top match + one honest backup with cautions · three-layer glossary tooltips (definition + *why it matters* + full-guide link) · the verify-a-dentist handoff (member ID never stored) · independent / no-paid-placement framing · methodology + named-reviewer trust layer · Year-2 maximums + graduated coinsurance in the data.

From the **ZIP:** server-rendered plan facts + static JSON-LD · `sitemap.xml` + `robots.txt` · MetLife `noindex` · compliant 43–56-char titles / 141–157-char descriptions · per-plan OG + Twitter cards · the 8 spokes · the spec-first matrix + data dictionary.

## Additions that make it genuinely better
Total-cost Y1/Y2 toggle · real buy/enrol step · saved/shareable comparisons · predetermination + missing-tooth flags on implant rows · answer-first blocks for AI Overviews · cross-type internal-link mesh · 6 carrier hubs + treatment/timing branches · methodology/sources/corrections trust pages · one canonical data source with a build-time drift validator.

## 🔴 BLOCKING — do not publish until resolved
1. **Trust liability (top YMYL risk):** the "Sarah Chen, licensed consultant" reviewer byline isn't evidenceable. Make the reviewer real (named, credentialed, bio) or remove the claim. (Agent 21)
2. **Data conflicts:** the redesign hub + MoO spoke still print **$90 / 50% major after 6-mo wait** vs the canonical **$57 / 20%→50% / no hard wait**; **Aetna annual max disagrees three ways** ($1,250 / $1,500 / ~$1,000); wrong **network names** in the compare page. Sync every surface to `PLAN-DATA-RECONCILIATION.md`. (Agents 09, 21)
3. **`needs-doc` facts asserted as fact:** Ameritas Y2 max, Guardian major %/whitening, Delta whitening — hold as ranges/omissions; keep MetLife `noindex`. (Agents 18, 21)
4. **JS-only rendering:** server-render plan facts + the schema `@graph` before relying on them for SEO. Remove `Offer.price`/`InStock` for illustrative premiums. (Agents 15, 17)
5. **`glossary.json` regression:** it drops the "why it matters" layer and silently omits terms (cdt, ada-fee, rating). Regenerate it from the 24 real term pages and restore the `why` field, or the tooltips ship *worse* than today. (Agents 12, 20)

## Needs your decision
- **Premiums:** you asked to freeze them to the current compare page; the Data-governance agent recommends keeping them **illustrative "from $X" with qualifiers (not frozen single numbers)** for YMYL safety. These conflict — your call.
- **Reviewer identity:** who is the real, named reviewer we can publish?
- **Two-hub split copy:** confirm the pillar vs comparison-tool intent split (titles/H1s).

## Weighted decision (master-prompt criteria)
The approved **Direction C + fuse-not-replace** path scores **8.7 / 10** against the weighted criteria; the alternatives (ZIP-as-is = clinical/regresses brand; live-as-is = visual fragmentation + JS-only SEO) score 7.1 and 6.3. **Recommendation stands: Direction C, fuse the two systems, resolve the 5 blocking items, then build.**
