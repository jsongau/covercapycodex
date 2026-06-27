# CoverCapy Homepage — Audit, Rebuild & SEO/GEO Strategy
**Prepared June 26, 2026 · 12-specialist panel + plan-data verification**

---

## 1. The one-line diagnosis

The "Choose Your Situation" module is not broken in code, it is broken in *payoff*. Clicking a situation recolors a few jargon chips and swaps one paragraph, but the only thing that looks like a recommendation — the **Humana Extend 5000** card — never moves. Worse, Humana is the single worst answer for "Care needed soon": it has a 90-day basic wait and a 6-month major/implant wait. So the one situation where a person is in pain gets shown the one plan that makes them wait. Your own `/data/plans/` SSOT already holds the right answers (Ameritas = no waiting periods + next-day; UHC = $30/mo + day-one preventive). The fix is to make the situation drive a real plan swap.

That same instinct — *match the moment, do not make people wait* — is also your biggest untapped SEO opportunity: **emergency and no-waiting-period intent**, which the carriers themselves are not ranking for.

---

## 2. What I rebuilt

**File: `choose-your-situation-REBUILD.html`** (open it in a browser, click the situations).

What changed:

- **The plan now swaps per situation**, pulled from the SSOT and honest to each plan's `do_not` list:

| Situation | Featured plan | Why (one line) |
|---|---|---|
| Care can't wait | **Ameritas PrimeStar** | No waiting periods on any category, coverage as soon as tomorrow |
| Major treatment planned | **Humana Extend 5000** | $5,000 max + 50% major, plan a few months ahead |
| Preventive care | **UHC Primary Dental** | ~$30/mo, 100% preventive day one |
| Family coverage | **Guardian Premier 2.0** | 85% basic day one + child orthodontics |
| Through my employer | *Action card* → find an in-network dentist | You likely do not need a second plan |
| Keep my dentist | *Action card* → check network first | The plan only matters if your dentist takes it |

- **Each situation carries its own CTA** with a `?need=` param (so the click has momentum), plus a concierge trust line at the decision moment ("We confirm your dentist takes this before you commit").
- **The card animates on swap** with `aria-live="polite"`, so the change is *felt* and announced — the fix for "it does nothing."
- **Luxury treatment**: plate-style card with soft shadow and a mint top-rule on urgent matches, situation pills that read *selected* (mint-soft fill + teal rule) rather than a clicked black slab, bigger tighter serif headline, brand mint restored as the accent.
- **Honesty guardrails baked in**: premiums labeled estimates; no "instant/same-day" language; UHC flagged as not covering major; Ameritas year-one major shown as 20% (not 50%); Mutual of Omaha activation never claimed (it is UNVERIFIED in the SSOT).

To integrate: replace the `<section id="insurance">` block in `index.html` (lines ~717–776) with the rebuilt section, and move the `NEED` object + `apply()` function into the existing inline `<script>`. Wire `track('home_plan_need', {need})` back to your analytics where the comment marks it.

---

## 3. The carrier × emergency SEO play (your headline ask)

**Verdict: real opportunity, but selective.** Only a few of your eight plans can honestly serve an urgent or major emergency. Building emergency pages on plans that gate care behind waits would be a trust and compliance liability. Here is what is defensible, grounded in the SSOT.

### Emergency-readiness ranking (best → worst for "need care now")

| Rank | Plan | Waiting periods | Activation |
|---|---|---|---|
| 1 | **Ameritas PrimeStar** | None on any category | Next-day (sourced) |
| 2 | **Mutual of Omaha** | None | **UNVERIFIED — do not claim a start date** |
| 3 | **MetLife NCD Complete** | None | 1st of next month |
| 4 | **Guardian Premier** | None on preventive/basic; major 12-mo | 1st of next month |
| 5 | **UHC Primary** | None on preventive/basic; **no major at all** | Day after application |
| 6 | **Aetna Dental Direct** | Basic 6-mo, major 12-mo (waivable) | 1st of next month |
| 7 | **Delta PPO Premium** | Basic 6-mo, major 12-mo | ~5 days |
| 8 | **Humana Extend 5000** | Basic 90-day, major/implant 6-mo | ~1 week |

**Feature for urgent intent: Ameritas (hero), MetLife and Mutual of Omaha (high ceilings), UHC (cheap, minor only).**

### Programmatic page architecture (prioritized)

**Tier 1 — build first (high intent × honest claim × low competition):**
1. `dental-insurance/no-waiting-period/{emergencies|root-canal|tooth-extraction|broken-tooth}/` — only Ameritas, Mutual of Omaha, MetLife qualify on major; lead with Ameritas next-day.
2. `dental-insurance/{carrier}/emergency-coverage/` — one per carrier hub. Honest angle per plan; the slow carriers route the reader to a no-wait plan via your verify wizard ("Delta covers emergency pain treatment under basic after a 6-month wait. Need it today? Compare no-wait plans →").
3. `dental-insurance/{root-canal|tooth-extraction|emergency-crown|dental-implant}/no-waiting-period/` — always state the year-one major percentage.

**Tier 2 — scale on your 6,400-page location moat (no carrier can match this):**
4. `dental/{state}/{metro}/{city}/emergency-dentist/` — pairs "emergency dentist near me" with your geo pages; filter by `open_weekends`.
5. `dental/{state}/{city}/emergency-dentist/{carrier}/` — "emergency dentist that takes [carrier] in [city]," near-zero competition, ties straight to the verify wizard.

**Tier 3:** "broke a tooth, no insurance, what now" panic-search explainers that convert to Ameritas next-day.

**Highest-ROI first move:** Tier-1 #1 and #2 (~14 pages) — they monetize carrier hubs you already have, are truthfully grounded, and funnel weak-emergency carriers to Ameritas.

### Homepage emergency hook
The rebuilt module's "Care can't wait" lane *is* the emergency surface. Reinforce it with a short band under the hero: **"Tooth pain that woke you up? A tooth that broke this morning?"** → "Find a dentist who can see you, and we confirm coverage while you get in the chair." This extends "get cover today, see a dentist tomorrow" into the highest-intent moment with no new claim.

### Claims the SSOT does NOT support — never publish
- "Instant" or "same-day" coverage anywhere (Ameritas/UHC are next-day at earliest; "same-day" only means the digital ID card).
- Mutual of Omaha next-day activation (UNVERIFIED — use "no waiting period," never a start date).
- Full major coverage day one (Ameritas 20%, MetLife ~10%, Mutual 20% in year one).
- UHC for any major emergency (root canal / crown) — it covers none.
- Guardian / Aetna / Humana / Delta as "no-wait" for major work.

---

## 4. How your SEO + GEO is actually hitting

**Two structural problems are capping everything else.** Both surfaced independently from the technical-SEO and performance specialists, so treat them as the foundation:

- **P0 — Your nav, hero, and footer are fetched client-side from `/components/*.html` after page load.** Googlebot renders JS but discounts it; the AI crawlers you explicitly invite in robots.txt (GPTBot, PerplexityBot, ClaudeBot) mostly do **not** run JS, so they see empty mount divs. Your entire site-wide link graph and your LCP element are invisible to them. This simultaneously (a) hides the link equity that should flow to all 6,400 pages, (b) tanks mobile LCP/CLS, and (c) blocks AI citation. **Inline (server-render) the nav, hero, and footer into static HTML.** This is the single highest-leverage fix on the whole site.
- **P0 — The homepage links to zero state/metro hubs.** Every internal link points to carrier hubs or tools; not one points to `/dental/california/` etc. Your 6,400-page corpus is orphaned from the homepage. Add a "Browse dentists by state" block (top ~12 states) so equity cascades down.

**Where you can realistically rank in 6–12 months:** long-tail local + carrier-by-city ("dentist that accepts [carrier] in [city]"), the verification/eligibility cluster (your home turf — nobody owns it with a product), COBRA / after-layoff content, and emergency-dentist local pages. **Do not** fight head-on for "best dental insurance" or generic "cheap dental insurance" — owned by DA-90 aggregators (Money.com, NerdWallet, Forbes, ValuePenguin) and the carriers.

**GEO (getting cited by ChatGPT / Perplexity / AI Overviews):** Your schema foundation is genuinely ahead of competitors (Organization + WebSite + FAQPage all correct). The gap is topical — nothing on the page answers the emergency / no-waiting / post-layoff questions AI engines actually get asked. Moves, in order:
1. Add an answer-first block near the top: a 2-sentence direct answer to "Can I get dental insurance with no waiting period?" (AI engines lift the first 40–60 words as a standalone answer).
2. Expand FAQPage from 8 to ~16 Q&As with the emergency intents. Note Google deprecated FAQ rich *results* (May 2026), but FAQPage remains the highest-value schema for AI citation — keep it.
3. Add `/llms.txt` at the root (Perplexity/ChatGPT increasingly read it; Google does not, so treat as answer-engine upside).
4. Add a visible "Reviewed by [Name, credential] · Last updated June 2026" byline (see §5).
5. Add `BreadcrumbList`, a reviewer `Person` entity, `Speakable`, and an estimate-flagged `ItemList` of plans (never a hard `Offer.price` — premiums are estimates; flag them in `priceSpecification.description`). Skeletons available on request.

---

## 5. Make the homepage a trust source (E-E-A-T + intel hub)

**The trust gap in one sentence: no real human is named anywhere.** Dental insurance is squarely YMYL, where Google now treats a named, credentialed author/reviewer as a direct ranking input. Today the only "person" on the page is a mascot (Mr. Bara) quoting a dollar figure about dental work — a YMYL liability.

P0 trust fixes:
1. **Name the reviewer** with real credentials (e.g., RDH/CDA, or DDS if a clinician reviews) and link the name to a bio page. The "reviewed by a specialist with 10+ years" strip is currently anonymous.
2. **Create `/about` and a reviewer bio page** (name, photo, credential, specific roles, LinkedIn `sameAs`). This is the #1 E-E-A-T lift available and most of your existing trust language converts to real authority the moment a verifiable person stands behind it.
3. **De-risk the Mr. Bara cost claim** — attribute the substantive "$3,000 of work could cost $300" line to the named human expert, or keep Bara as pure brand voice and move the claim.

**Turn the page into an intel hub** (the owner's "trusted place to learn"): add a "Learn before you decide" module linking 4–6 pillar pages, the single change that most makes Google and AI read CoverCapy as a topical authority.

- **Pillar A** — How PPO dental plans work
- **Pillar B** — Waiting periods & getting covered fast *(feeds the emergency play)*
- **Pillar C** — What dental work actually costs *(absorbs your orphaned crown guides)*
- **Pillar D** — Finding & verifying a PPO dentist *("accepts my insurance" vs "in-network" — your sharpest differentiator)*
- **Pillar E** — Dental emergencies & urgent care
- **Pillar F** — Coverage after life events (layoff, COBRA, aging off at 26)

Each pillar links down to clusters and back up, every priority page within 3 clicks, author byline sitewide. Your crown guides and glossary previews are already written but orphaned — wrapping them under pillars converts existing work into authority signal immediately. First six guides to write: How PPO dental works; In-network vs accepts-my-insurance; PPO plans with no waiting period; What dental work costs; How to read a treatment estimate; Questions to ask before you book.

---

## 6. The 20-point critique panel (compiled)

A consolidated, prioritized read-out from the specialist panel.

**P0 — do first (broken, or foundational):**
1. Make the situation module swap the actual plan (done — `choose-your-situation-REBUILD.html`).
2. Stop showing Humana for "Care needed soon"; route urgent users to a no-wait plan (done).
3. Inline the client-fetched nav/hero/footer into static HTML (crawlability + LCP + AI citation).
4. Add homepage links to state/metro hubs (un-orphan the 6,400 pages).
5. Name a credentialed reviewer + build `/about` and a bio page (YMYL E-E-A-T).
6. Rewrite the hero: lead with "Get cover today. See a dentist tomorrow." (the positioning line appears nowhere today); cut the 55-word job-title subhead.
7. Add an emergency band under the hero for people in pain right now.

**P1 — high value:**
8. Collapse the ~7 identical "Compare PPO plans" CTAs into one primary-verb hierarchy.
9. Add the "Learn before you decide" pillar-hub module.
10. Expand FAQ to ~16 Q&As covering emergency / no-waiting / post-layoff intents.
11. Add `BreadcrumbList` + reviewer `Person` + `lastReviewed` schema; add `/llms.txt`.
12. Restore brand color discipline — mint as the accent, demote the coral that has crept across buttons/rules/arrows.
13. Plate-treat the worked-example card and situation pills (done in the rebuild; apply sitewide).
14. Push headline scale up and leading tighter (editorial scale contrast).
15. Rewrite the plans-module copy: "attributes" is database language, not luxury ("The right plan depends on what you are facing").
16. Merge the duplicative "Why CoverCapy" + founder note; cut or fold "What We Connect" into the situation router.

**P2 — polish:**
17. Serve WebP/AVIF, consolidate the two redundant Google Fonts requests, `fetchpriority="high"` on the LCP image.
18. Fix two `&mdash;` violations (lines 625, 832) and the emoji in the celebration microcopy (off-brand).
19. Fix low-contrast teal text (`#6f8482` on dark fails WCAG); lighten state-conveying labels.
20. `noindex` the duplicate `index2.html` and stray `*-preview.html` files (duplicate-content risk).

---

## 7. Guardrails (do not break these)
- All plan facts come **only** from `/data/plans/`. Never invent a number. Honor each file's `do_not` list.
- No "instant/same-day" coverage claims. No Mutual of Omaha activation date. No UHC-for-major.
- No em-dashes, no roman numerals, no countdown timers, no member-ID storage.
- `index.html` is hand-editable (it is a root file, not a generated `/dental/` page) — but the 6,400 `/dental/` pages must be changed in `seo-build/generate-plans.js`, never by hand.

---

### Appendix — panel sources
Technical SEO, GEO/AI-search, E-E-A-T/YMYL, CRO, luxury UX, carrier-emergency SEO, topical authority/IA, competitor SERP, plan-data emergency-fit, schema, copywriting, and mobile/a11y/performance specialists. Web research drawn from current (2026) SEO/GEO/E-E-A-T sources; plan facts from the eight files in `/data/plans/`.
