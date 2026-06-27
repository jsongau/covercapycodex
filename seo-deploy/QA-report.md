# QA Report: Benefit Maxing hub + Smart Timing Protocol

Date: 2026-06-24
Files audited:
- `/benefit-maxing/index.html`
- `/benefit-maxing/smart-timing-protocol/index.html`

Automated checks run from the workspace shell. Result key: PASS, PASS with note, or ACTION.

| # | Audit | Result | Detail |
|---|---|---|---|
| 1 | Factual claim audit | PASS | All coverage and cost claims qualified ("may", "subject to plan terms", "illustrative"). No absolute savings or guarantees. |
| 2 | Carrier plan claim audit | PASS with note | No specific premium or exact maximum asserted as fact. Plan cards show qualitative positioning + "confirm on plan page" + "source reviewed June 2026". Substantiate exact figures from carrier docs before adding any number. |
| 3 | Medical timing safety audit | PASS | Safety box on both pages: insurance timing must never delay urgent or necessary care; treating dentist decides clinical timing. No instruction to postpone root canal, extraction, infection, or fracture care. |
| 4 | Insurance terminology audit | PASS | "coinsurance" and "estimated patient share" used for percentage responsibility; "copay" not used for percentages. Annual maximum, deductible, benefit period, waiting period defined accurately. |
| 5 | Internal link audit | PASS with note | Anchors are descriptive and crawlable; reciprocal hub/protocol links present (hub references protocol 9x; protocol references hub 5x). Confirm guide and glossary destinations return 200 (see change log follow-ups). |
| 6 | Broken URL audit | ACTION | Plan links use the existing flat pattern to avoid 404s. Verify `/benefit-maxing/guides/*`, `/guides/glossary/*`, and the three plan pages all return 200 before launch; create or repoint any that are still planned. |
| 7 | Canonical audit | PASS | One canonical per page, both self-referential and absolute with trailing slash. |
| 8 | Schema visibility audit | PASS | FAQ JSON-LD matches visible FAQ verbatim (hub 8/8, child 6/6). DefinedTerm text matches the visible definitions. No HowTo. JSON-LD parses on both pages. |
| 9 | Mobile layout audit | PASS | Router, directory, guides, plan cards, timeline, and worked table all collapse to single column; no horizontal overflow; tap targets 44px. |
| 10 | Keyboard accessibility audit | PASS | Buttons for actions, links for navigation, accordions toggle aria-expanded, focus-visible rings on buttons/cards/share, tooltips reachable by keyboard and touch. |
| 11 | Color contrast audit | PASS | Body and small copy use ink (#082A30) and ink-soft (#56655F) on cream/paper; ink-faint reserved for non-essential labels. Gold used as accent and on dark, not as button fill on light. |
| 12 | Core Web Vitals risk audit | PASS with note | Reserved mount heights limit CLS; fonts preconnected with swap; minimal deferred JS. Build-time nav/footer injection (see implementation note) would further reduce mount-time shift. |
| 13 | Duplicate GA4 event audit | PASS | Single delegated listener fires exactly one event per click from the nearest [data-ev]. Prior multi-fire logic removed. |
| 14 | Repetitive copy audit | PASS | Annual-maximum explanation consolidated; duplicated reset/preventive passages removed. |
| 15 | CTA hierarchy audit | PASS | Primary = check benefits and estimated cost (estimator). Secondary = guides / Smart Timing Protocol. Financing appears only after the insurance estimate. No three equal buttons. |
| 16 | AI citation clarity audit | PASS | Answer-first sections, stand-alone definitions, visible limitations, named reviewer, dates, first-party examples, sources. No fabricated AI-optimization claims. |
| 17 | Entity consistency audit | PASS | "Benefit Maxing" and "Smart Timing Protocol" used consistently; never renamed. Relationship statement visible on both pages. No trademark symbol or ownership claim. |
| 18 | Source quality audit | PASS | Sources cite ADA, NADP, and HealthCare.gov for general terminology, each with publisher and review date; plan specifics deferred to carrier documents. Restrained, no per-sentence superscripts. |
| 19 | Legal overclaim audit | PASS | No guarantee, legal-right, loophole, or "insurer keeps your money" framing. "Loophole/hack" appear only in the sentence stating what the framework is NOT, which the brief permits as description. CoverCapy stated as concierge and network, not a carrier or lender. |
| 20 | Final source HTML crawlability audit | PASS | Definitions, FAQs, links, tables, and primary copy are all in the static HTML source. Only nav and footer mount client-side. |

## Automated validation output (summary)

- JSON-LD: parses on both pages (1 graph block each).
- One `<h1>` per page.
- FAQ parity: hub 8 visible = 8 schema; child 6 visible = 6 schema.
- Banned glyphs (arrows, em/en dashes) in prose: none on either page.
- Banned marketing words: none, except the permitted descriptive use of "loophole/hack" on the hub (stating what Benefit Maxing is not).
- "copay" for percentage responsibility: not present.
- Internal links use trailing slashes and descriptive anchors; reciprocal hub/protocol links confirmed.

## Open actions before publish

1. Confirm HTTP 200 for all linked guide, glossary, and plan pages; create or repoint any planned URLs.
2. Produce the two 1200x630 social images referenced by the Open Graph tags.
3. Add both URLs to `/sitemap.xml` (snippet provided) and submit the sitemap in Google Search Console and Bing Webmaster Tools.
4. Run URL Inspection on both URLs in Google Search Console after deploy.
5. Set `INDEXNOW_KEY` in Vercel, host `/<key>.txt`, and run the IndexNow submitter with both URLs.
6. Verify OAI-SearchBot, Claude-SearchBot, Claude-User, and PerplexityBot are not blocked (robots patch provided).
