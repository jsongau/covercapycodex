# 00 — MASTER BUILD CONSOLE
## PPO Plans Hub Rebuild | Single Source of Truth for Sitebuilders and Webmasters
**Created:** 2026-06-26
**Status:** PLANNING ONLY. No production changes until this console is approved and the user (Jay) signs off on the decisions in Section 1.
**Reconciles:** Specs 01 through 20 plus 00-INDEX.md.
**Target page:** https://www.covercapy.com/dental-insurance/ppo-plans/
**Hard rules inherited (apply to every task):** Plan facts come ONLY from `/data/plans/*.md` SSOTs (CLAUDE.md rule 13). No em-dashes. No fabricated stats, premiums, or reviews. No roman numerals. Member IDs never stored. Build URLs from parts, never `seo_path`. No countdown timers, no glassmorphism, no gradient fills on plan cards. CoverCapy is an independent educational marketplace, not an insurer.

---

## 1. DECISIONS NEEDED FROM USER (read first, answer before build)

These are the highest-leverage choices. Each has a recommended default. Nothing in Phase 2 (the hub HTML build) ships until D1, D2, and D3 are answered. The rest can resolve in parallel but are needed before their dependent phase.

**D1. Compare-page URL: physical move (Option A) or breadcrumb-only (Option B)?**
The `/compare-ppo-dental-plans` page becomes a child of `/ppo-plans/` in the breadcrumb. Option A physically moves it to `/dental-insurance/ppo-plans/compare/` with 301s; Option B keeps the URL and only updates the rendered breadcrumb plus schema.
*Recommended default:* **Option B at launch.** It carries zero ranking-volatility risk, needs no `vercel.json` rewrite, and preserves the page's existing priority-0.9 equity and 15 vanity redirects. Revisit Option A in Phase 5 only if 60-90 days of GSC data confirm the compare page holds no rankings worth protecting. (Spec 04 FLAG-02/03; Spec 19 Gate A; Spec 20 R2.)
*Blocks:* this decision must be made before any compare-page or `vercel.json` change.

**D2. SSOT reconciliation: confirm the 7 corrected facts replace the current compare-page JSON values?**
The compare page's `plans-data` JSON disagrees with the SSOTs on 7 facts (see Section 3). The SSOT wins in every case per CLAUDE.md rule 13.
*Recommended default:* **Yes, apply all 7 SSOT corrections** (Aetna max $1,250; Guardian major/implant/ortho per SSOT; MOO no major wait and 20% year-one; Humana deductible $75) and have one person re-verify each against the primary carrier source before Phase 2 ships. (Spec 01 §3.5; Spec 08 Part 4; Spec 19 Phase 1.)

**D3. Delete stale physical files and scratch files before the next deploy?**
The legacy `dental-insurance/ppo-plans/aetna/`, `/humana/`, etc. `index.html` files plus `rct_index.html` and `dd.html` scratch files are orphaned but crawlable.
*Recommended default:* **Yes, `git rm` them in the same deploy as the Phase 2 hub rebuild.** The 301s in `vercel.json` already cover all inbound links; their existence is pure indexation risk. (Spec 04 FLAG-01/07; Spec 19 Phase 2.)

**D4. Ad density on the hub: ship all 3 AdSense slots at launch, or rails-only first?**
Spec 14 defines 3 AdSense slots (A right-rail desktop-only, B between plan stories and table, C after FAQ).
*Recommended default:* **Ship Slot B and Slot C only at launch; hold Slot A.** This keeps the page clean for the YMYL/E-E-A-T first-indexation window and the "luxury concierge" feel, and avoids any accidental-click adjacency risk near the new rails. Add Slot A in Phase 5 once layout is proven. House promos (R1-R5) are never labeled as ads. (Spec 14 §4; Spec 20 R1.)

**D5. Rewards prominence: how loud is the Capy Rewards teaser at launch?**
*Recommended default:* **Soft teaser only (right-rail R3), no point values, no Capy Crowns icons, no balance counter.** The program has no real numbers yet; fabricating any is prohibited. Keep it a single informational pill until Capy Rewards has launch specs. (Spec 13 §5; Spec 10 §21; Spec 14 R3.)

**D6. Scenario landing pages: confirm the URL pattern and the launch batch.**
Spec 17 proposes `/dental-insurance/ppo-plans/{scenario-slug}/`; Spec 19 Phase 3 uses `/dental-insurance/ppo-plans/guides/{scenario-slug}/`. These conflict.
*Recommended default:* **Adopt `/dental-insurance/ppo-plans/guides/{slug}/`** (keeps scenario guides cleanly nested under a `guides/` segment, avoids slug collisions with future plan slugs, and reads as editorial not transactional). Launch batch 1 = the 4 lowest-AI-competition clusters: no-waiting-period, seniors-over-65, family, CVS-rewards. (Spec 17 §10; Spec 19 Phase 3; see Section 2 reconciliation.)

**D7. MVP scope: what is in the first deploy vs. later phases?**
*Recommended default:* **MVP (Phase 2) = hero + scenario finder (2-step) + 8 plan stories + comparison table + best-for grid + 2 verify bands + FAQ + rail shells + full schema graph + compare-page JSON fix.** Defer to later phases: family builder widget, waiting-periods visual timeline, rail content build-out, CSS-token refactor, Product schema, scenario landing pages. (Spec 19 Phases 2-6.)

**D8. Author byline for YMYL E-E-A-T: who is the named reviewer?**
Spec 16 and Spec 20 R1 require a *named* author or licensed reviewer (not just "CoverCapy Editorial Team") at first indexation for this YMYL page.
*Recommended default:* **Provide one named editorial reviewer plus a linked `/editorial-standards` or author page before Phase 2 ships.** This is a launch requirement, not a post-launch fix. (Spec 16 Part 10; Spec 20 R1.)

**D9. Family-economics facts: ship the family section with the 10 unverified carrier items resolved, or with "verify with carrier" placeholders?**
*Recommended default:* **Ship the family section (Phase 4) with confirmed facts only; replace each of the 10 unverified items (Spec 07 §5) with a "verify with carrier" note rather than delaying the phase or guessing a number.** Only Aetna ($150), Delta ($150), and UHC (3 x $50) family deductible caps are SSOT-confirmed. (Spec 07 §5; Spec 19 Phase 4.)

**D10. Hub H1 / title direction: confirm scenario-first framing over the current plan-count framing.**
Current page: "Best PPO Dental Plans Compared 2026: 7 Carriers Ranked." Reconciled direction: H1 = "Which PPO dental plan fits your situation?"; title = "Best PPO Dental Plans 2026: Find the Right Fit | CoverCapy."
*Recommended default:* **Approve the scenario-first H1 and title.** This is the core differentiator and the cannibalization guardrail vs. the compare page. (Spec 15 §1-2; Spec 18 S0; Spec 04 §8.)

---

## 2. EXECUTIVE SUMMARY

### The vision
Rebuild `/dental-insurance/ppo-plans/` into the one page a person forwards to their family the moment dental work comes up: "ooo CoverCapy, let's see which featured plan fits my situation." It is a guided conversation, not a price grid. Register: a knowledgeable friend who already spent three hours on this and gives you the real answer, including the uncomfortable parts. Boutique-hotel-concierge meets independent editorial guide, never healthcare portal, never generic SaaS.

### The unique angle (what no competitor owns)
- **Scenario-first, not plan-first.** Every Tier 1 competitor (Money, NerdWallet, Forbes, ValuePenguin) leads with a ranked plan list. CoverCapy leads with "what is happening in your life?" and routes to a named plan. (Spec 02 §8.)
- **Family economics, shown as math.** Family deductible caps, per-person (not pooled) maximums, and the counterintuitive truth that stacking two individual policies often beats a family tier. No competitor shows this math. (Spec 07; Spec 02 §7.2.)
- **CVS / loyalty integration.** Aetna Dental Direct + CVS ExtraCare Plus ($10/mo reward, 20% off CVS Health brand) is editorially uncontested. Plus a tasteful right-rail shopping module. (Spec 03 Cluster 9; Spec 14 R2/R2b.)
- **The orthodontics split that nobody states cleanly:** **kids' braces = Guardian** (60% in-network, $1,500 lifetime per child, dependents under 19); **adult braces / Invisalign = Delta Dental** (the only individual plan on the shelf covering adults, 16 states + DC); **65+ / Medicare gap = Mutual of Omaha** (community-rated, no major wait, selectable max). (Spec 06; Spec 08.)

### Why this wins SEO + GEO
- **SEO:** scenario-first depth + clean question-format H2/H3 + full schema graph beats generic listicles on long-tail and life-event clusters where topical depth outranks raw domain authority. (Spec 03; Spec 15; Spec 20 Channel A.)
- **GEO (AI citation):** the asymmetric near-term win. Clusters 6 (seniors), 7 (no-wait), 8 (implants), 9 (CVS) have near-zero AI competition. Self-contained, SSOT-sourced answer blocks in the first 30% of the page + FAQPage schema + freshness signals position CoverCapy as the source ChatGPT, Perplexity, and Claude cite. (Spec 02 §3; Spec 16; Spec 20 Channel B.)
- **Shareable + retentive:** per-scenario copy-to-clipboard summaries, "send to partner" mailto, sessionStorage scenario persistence, and exclusive-insight hooks ("one individual plan covers adult Invisalign") drive the relay moment. (Spec 09; Spec 12 §9; Spec 13.)

---

## 3. FACTS TO FIX FIRST (SSOT reconciliation — do before any copy is written)

The SSOT (`/data/plans/{slug}.md`) is the record of authority in every conflict (CLAUDE.md rule 13). The current pages/stories conflict with the SSOTs in the places below. Each must be reconciled before build. Re-verify each against the primary carrier source per D2.

### 3.1 Compare-page `plans-data` JSON vs. SSOT (Spec 01 §3.5)
| # | Fact | Current JSON / old hub | SSOT field of record | Correct value |
|---|------|------------------------|----------------------|---------------|
| 1 | Aetna annual maximum | $1,500 (old hub) / $1,250 (JSON) | `aetna-dental-direct.md` `annual_maximum` | **$1,250** per person/calendar year |
| 2 | Guardian major % | 50% (old hub) | `guardian-premier-ppo.md` `coverage_major` | **60% in-network** after 12-mo wait (50% OON) |
| 3 | Guardian implants | "not covered" (old hub) | `guardian-premier-ppo.md` `implants` | **Covered, 60% in-network, $1,250 LIFETIME max**, 12-mo wait |
| 4 | Guardian child ortho % | 50% (old hub) | `guardian-premier-ppo.md` `orthodontics` | **60% in-network** (50% OON), $1,500 lifetime, $750/yr |
| 5 | Mutual of Omaha major wait | 12-month wait (2021 stale doc) | `mutual-of-omaha-dental.md` `waiting_periods` | **NONE** on the 2026 product |
| 6 | MOO year-one major % | 50% (old hub) | `mutual-of-omaha-dental.md` `coverage_major` | **20% year one**, rising to 50% year two |
| 7 | Humana deductible | $50 (old hub) | `humana-extend-5000.md` `deductible` | **$75** per person/calendar year |

### 3.2 Plan-story narrative inaccuracies vs. 2026 SSOT (Spec 18)
| # | Where | Issue | Fix (SSOT field) |
|---|-------|-------|------------------|
| 8 | Mutual of Omaha story ("Elena") | "no separate implant cap" is FALSE | $3,000 LIFETIME implant max exists; story lightly adapted in Spec 18 S2 Stop 6. `implants` |
| 9 | MOO story "month 13" framing | implies a 12-month major wait that no longer exists | reframe as "year two" rate step-up (20%→50%). `waiting_periods`, `coverage_major` |
| 10 | MOO skip-it line | references "can't wait 12 months" | rewrite to ortho/whitening exclusion + unverified activation. `activation: UNVERIFIED` |
| 11 | Guardian story "50% of a $6,000 case" | 50% is the OON rate; in-network is 60% | story stands as vignette; prose must cite 60% in-network. `orthodontics` |
| 12 | Aetna story "3-month" basic wait | standard basic wait is 6 months | story stands as Priya's waived experience; prose states 6-mo default. `waiting_periods` |
| 13 | UHC story "three business days" | activation is "as soon as the day after," not a guaranteed 3 days | keep vignette, add activation footnote. `activation` |
| 14 | Aetna "442,000 locations" | not in SSOT network field (plan-page figure) | verify before printing; else drop the number. `network` |

### 3.3 Do-not / data-trap flags that constrain every page and widget (Spec 08 Part 4; Spec 16 Part 5)
- **UHC:** not sold in New York; age cap 18-64; no major work, implants, or ortho. Never offer to 65+ or NY.
- **Aetna:** CVS perk excluded in GA, LA, MN, MO, NY, NJ, OK, TX, VA; no implants/ortho; $10 reward does not roll over; 20% off non-sale only; no 24/7 pharmacist line on the dental version.
- **Guardian:** no adult ortho (child-only, under 19); $1,500 ortho is paid over 2+ years ($750/yr), not a lump sum; $1,250 implant cap is LIFETIME not annual; 12-month re-enrollment lockout.
- **Delta:** individual PPO sold in 16 states + DC only (never "nationwide"); missing-tooth clause on implants (Aug 2025 renewals, except CA); whitening is state-specific (CA excludes); some affiliates use $100 deductible.
- **Mutual of Omaha:** activation UNVERIFIED (never claim next-day); underwriter is Mutual of Omaha Insurance Company, TruAssure only administers; ignore the 2021 rate guide; $3,000 implant cap is LIFETIME; no ortho/whitening.
- **Ameritas:** not in Massachusetts; year-one implant/major is 20% not 50%; implant sub-cap is deducted from (not added to) the annual max; no ortho/whitening on Care Complete.
- **Humana:** implant 6-month wait CANNOT be waived; NY is dental+vision only (no hearing); whitening is $200/arch in-office with no wait; basic wait is 90 days not "3 months."
- **MetLife:** year-one major is 10% (lowest immediate rate, must be disclosed); $3,000 implant cap is PER CALENDAR YEAR not lifetime; $100 deductible is lifetime (do not lead with "vanishing"); no ortho/whitening.
- **All:** premiums are estimates rounded to nearest $5; label every premium "approximately"/"~"; never guarantee coverage/acceptance.

### 3.4 Items requiring carrier verification before publish (Spec 07 §5) — 10 open items
Guardian family deductible cap; Humana family/dependent discount amount; Humana family deductible cap; MOO family deductible cap; Ameritas base-state family cap (the "max 3" note is WA-only); MOO implant sub-max vs. annual-max interaction; MOO/Medicare-Advantage coordination of benefits; Humana dependent activation timing; Aetna CVS reward per-member vs. per-policy; Delta family enrollment per state. Per D9: ship with "verify with carrier" placeholders where unresolved; never invent a number.

---

## 4. RECONCILED CANONICAL DECISIONS

Where specs disagreed, this section is the single answer.

### 4.1 Information architecture + URL / breadcrumb (canonical)
- **PPO hub URL:** `/dental-insurance/ppo-plans/` (trailing slash). Canonical must match the served URL exactly. (Spec 04 §6; Spec 15 §1.3.)
- **Hub breadcrumb (3 levels):** Home / Dental Insurance / PPO Dental Plans. Separator ` / ` (no em-dash). (Spec 04 §3; Spec 17 §3.1.)
- **Plan-page breadcrumbs (4 levels):** Home / Dental Insurance / PPO Dental Plans / {Plan Name}. (Spec 17 §5.)
- **Compare page:** **Option B default** (D1) — keep `/compare-ppo-dental-plans`, render and schema a 4-level breadcrumb with `/ppo-plans/` at position 3. Spec 04 §5 holds the exact Option A redirect rules if A is later chosen.
- **Scenario landing pages:** `/dental-insurance/ppo-plans/guides/{slug}/` (D6 reconciles the Spec 17 vs. Spec 19 conflict in favor of the `guides/` segment).
- **`/ppo-plans` vanity redirect:** route to the hub `/dental-insurance/ppo-plans/`, not the compare page (Spec 04 FLAG-04).
- **Delete stale files** per D3.

### 4.2 Page section order (final, top to bottom)
Reconciles Spec 10 §16, Spec 18 TOC, and Spec 16 placement. This is the build order for the center column:
1. Breadcrumb nav (3 levels)
2. Hero: H1 "Which PPO dental plan fits your situation?" + lede + meta pills + "Who needs coverage?" 4-button chooser + GEO-Q1 answer paragraph + 2 CTAs
3. "About CoverCapy" trust module (60 words: marketplace not insurer, business model, privacy) — **above** the scenario finder (Spec 12 §5, Experiment 5 default)
4. Plain-language terminology anchor ("What do preventive / basic / major mean?") (Spec 09; Spec 12 §9.5)
5. Scenario finder (2-step: 8 situation chips → timing picker → answer block; Individual/Family toggle)
6. GEO answer blocks for Clusters 2, 3, 5, 6, 7 woven into scenario cards (first 30% of page)
7. Plan stories (8 tour-stop cards, cheapest→strongest: UHC, Aetna, Ameritas, Guardian, MetLife, Mutual of Omaha, Humana, Delta) — each with mini quick-facts panel, "Skip it if" box, match-indicator bar
8. Verify CTA band #1 (with inline dentist search input)
9. AdSense Slot B
10. Comparison table (horizontal scroll; adds "Best for" column; ItemList schema source)
11. Best-for scenarios grid (8 cards incl. new Seniors/65+; Individual/Family toggle)
12. Family section (4 family scenario cards + family deductible explainer + per-person-vs-pooled explainer) — Phase 4
13. Family builder widget (optional, Phase 4) — light, no math computed
14. GEO answer blocks for Clusters 4, 8, 9, 10 (lower-funnel)
15. Waiting-periods explainer + visual timeline diagram (Phase 3)
16. Verify CTA band #2
17. FAQ (10-14 items; FAQPage schema parity required)
18. AdSense Slot C
19. Editorial footer (named reviewer byline, "verified June 2026" date, methodology, disclosure) + related links + carrier grid

### 4.3 Widget set (final)
Five widgets, light-compute only, all degrade without JS, none store health data or member IDs (Spec 11):
1. **Coverage Chooser** (hero, 4 buttons → sessionStorage `cc_household`) — Priority 2
2. **Scenario Finder** (2-step, Individual/Family toggle, pre-written dollar examples, skip-if, share link) — **Priority 1, primary conversion surface**
3. **Plan Matcher / Filter** (left-rail "filter by need" pills dim non-matching cards + match-indicator bars) — Priority 3
4. **Family Builder** (add ≤4 members, per-member plan lookup, plain-language economics note, no math) — Priority 4
5. **Share / Save** (copy-link, mailto, `navigator.share` fallback, bookmark) — Priority 5
**Not built:** heavy calculators, premium sliders, dynamic premium lookups, member-ID fields, countdown timers. (Spec 10 §21; Spec 11 "What NOT to build.")

### 4.4 Rail layout (final)
Three-column desktop (≥1080px): left rail 220px, center max ~680px, right rail 220px. Both rails sticky after hero passes. Mobile (<768px): both rails collapse into the center stack at defined positions + a sticky bottom bar [Scenario finder | Verify dentist | Compare]. (Spec 10 §2-4; Spec 14.)
- **Left rail:** L1 Scenario Nav (sticky, IntersectionObserver active-chip) · L2 Jump Links · L3 Filter-by-need pills · L4 Plan Finder shortcut.
- **Right rail:** R1 Dentist Verify CTA (sticky, top priority, house promo) · R2 Aetna+CVS spotlight · R2b CVS oral-care shopping module (3 tiles, plain CVS.com category links, illustrative prices) · R3 Capy Rewards teaser (soft, no point values) · R4 Family Builder shortcut · R5 Share/Save.
- **Ads:** Slot A (right rail, between R4/R5, desktop only) — **held at launch per D4**; Slot B and Slot C in center column. House promos never carry an "Advertisement" label; AdSense units always do. Max 3 AdSense units/page.

### 4.5 Schema set (final, single `@graph`)
Replace the current 4 separate blocks with one `@graph` matching DI Hub quality (Spec 15 §5; Spec 16 Part 7):
- `Organization` (`@id #org`, logo, sameAs)
- `WebSite` (`@id #website`, `potentialAction` SearchAction → `/find-my-dentist?q=` — pick `?q=` and make find-my-dentist read it; reconciles the `?where=`/`?loc=` inconsistency)
- `WebPage`/`CollectionPage` (`@id #webpage`, datePublished, dateModified = deploy date, breadcrumb ref, mainEntity ref)
- `Article` (named author/reviewer per D8, publisher ref, datePublished, dateModified)
- `BreadcrumbList` (`@id #breadcrumb`, 3 levels)
- `ItemList` (`@id #plan-list`, 8 plans, `numberOfItems: 8`, URLs from parts with trailing slash, descriptions from SSOT)
- `FAQPage` (`@id #faq`, questions verbatim-matched to visible answers — schema parity is mandatory)
- `HowTo` (5 steps for choosing/using a PPO plan; distinct from DI Hub's HowTo to avoid entity conflict) — Phase 4
- `Product` + `Offer` per plan (omit `price` unless SSOT-verified and visible on page) — Phase 5
**Schema parity rule:** every fact in schema must be visible on the page; every ItemList item and FAQ Q&A must have a visible counterpart.

### 4.6 Internal-linking plan (final)
Strict hub-and-spoke; PageRank flows inward to plan/compare pages and upward to DI hub only via breadcrumb + related strip (Spec 17). Key rules:
- Hub → each plan page: 4+ contextual links, different anchor text each (no anchor reused twice to one URL).
- Hub → compare page: hero CTA + one contextual + related pill (never with anchor "best dental insurance 2026" — that head term belongs to the hub).
- Hub → Delta silo: exactly ONE link to the silo root (not sub-pages).
- Hub → find-my-dentist: hero + verify bands only (not inside tour stops).
- Hub → guides/glossary/benefit-maxing: max 4 guide links, 1 glossary, 1 benefit-maxing, all in related/educational sections only.
- Every plan page: breadcrumb level 3 → hub + related-plan module (return-to-hub + 2-3 scenario-keyed peers + compare link).
- **Hub must NOT contain a full side-by-side comparison table** (that is the compare page's job; cannibalization guardrail). Quick-facts panels per card are fine.
- Compare page must NOT contain a scenario finder. Plan pages must not reproduce more than a 3-row compare snippet. (Spec 04 §8; Spec 17 §8.)

---

## 5. MASTER BUILD SEQUENCE (dependency-ordered, by 6-month phase)

Deployment mechanics: static site on Vercel; every deploy is `git push origin main` from the user's Mac; the agent cannot push. Generator is Mac-only and does NOT touch `/dental-insurance/` (the hub is hand-edited HTML). Use a branch + diff review for large phases. (Spec 19.)

### PHASE 1 — Foundation, IA, URL sign-off (Weeks 1-3, Jul 1-18)
1. Pull GSC baseline (impressions/clicks/queries) for compare page, hub, 8 plan pages → save to `research/ppo-hub-rebuild/baselines/`.
2. Pull backlink audit for `/compare-ppo-dental-plans`.
3. Resolve D1-D3, D6, D8, D10 and FLAG-04/05/07; record in this console.
4. Write SSOT reconciliation memo confirming the 14 Section-3 fixes; one person re-verifies each vs. primary source.
5. Assign the 10 carrier-verification items (Spec 07 §5) with Phase-2/4 due dates.
**Acceptance / GO-NO-GO Gate A (user-approved):** D1 (Option A/B) signed off; SSOT memo complete and verified; GSC baseline saved. *No HTML touching the compare page or `vercel.json` ships until Gate A clears.* Non-URL content drafting may proceed.
**Specs:** 01, 04, 07.

### PHASE 2 — Hub MVP (Weeks 4-8, Jul 21-Aug 15) — largest phase, reserve 3 weeks
6. Build `dental-insurance/ppo-plans/index.html`: hero + chooser + trust module + terminology anchor + scenario finder (2-step) + 8 plan stories (verbatim vignettes, SSOT-corrected prose, quick-facts panels) + 2 verify bands + comparison table (with "Best for" column) + best-for grid (8 cards incl. Seniors) + FAQ + rail SHELLS + related links. Canonical with trailing slash. No em-dashes. Per D7 scope.
7. Build the full `@graph` schema (Section 4.5; Article/HowTo/Product can be staged but plan the graph atomically).
8. Correct the compare-page `plans-data` JSON (7 fixes, Section 3.1) + update its breadcrumb schema to 4 levels (Option B).
9. `git rm` stale files (D3); update `sitemap.xml` + `sitemap-content.xml` (hub 0.85, plans 0.75, trailing slashes; compare per D1).
10. (Option A only) `vercel.json` 301s in the same deploy.
**Acceptance / Gate B (QA + user):** every premium/max/deductible/coinsurance/wait/network fact traced to a named SSOT field on a signed checklist; no em-dashes; canonical = `…/ppo-plans/`; BreadcrumbList 3 levels; ItemList = 8 plans with part-built URLs; compare JSON verified; `datePublished`/`dateModified` = deploy date; sitemap slashes consistent; (Option A) all 301 chains pass `curl -I` in ≤2 hops.
**Post-deploy:** Day 1 curl + request indexing; Day 3 URL inspection; Day 7 coverage; Day 14 impressions vs. baseline; Day 30 ranking audit.
**Specs:** 01, 03, 04, 05, 06, 08, 09, 10, 15, 16, 18.

### PHASE 3 — Widgets, rails, interactive layer (Weeks 9-12, Aug 18-Sep 12)
11. Left-rail JS: IntersectionObserver active-chip + filter-by-need dimming + jump-link tracking.
12. Right-rail content build-out: R1 verify, R2 Aetna+CVS, R2b CVS shopping module, R3 Capy teaser (soft, D5), R4 family shortcut, R5 share/save.
13. Mobile sticky bottom bar; waiting-periods visual timeline (HTML/CSS, screen-reader fallback); match-indicator bars; mini quick-facts panels; Individual/Family toggle; "send to partner" mailto; COBRA 63-day window callout copy.
14. Build scenario landing pages BATCH 1 (4): no-waiting-period, seniors-over-65, family, CVS-rewards at `/dental-insurance/ppo-plans/guides/{slug}/`; GEO blocks from Spec 16; internal links per Spec 17; SSOT facts only; each ≥800 words, links back to hub.
**Acceptance / Gate C (QA):** all interactive states tested Chrome/Safari/Firefox desktop+mobile; rail observer highlights correctly; filter dims (does not remove) cards with `aria` intact; sticky bar dismissible + respects `prefers-reduced-motion`; 4 landing pages live, self-canonical, in sitemap, SSOT-reviewed; mailto generates correctly; `aria-checked`/`aria-live`/rail `aria-label` present.
**Specs:** 06, 07, 09, 10, 11, 13, 14, 16, 17.

### PHASE 4 — Family economics, seniors, schema hardening (Weeks 13-17, Sep 15-Oct 10)
15. Build Family section (4 cards + family-deductible explainer using only confirmed caps + per-person-vs-pooled explainer + carrier disclaimer per D9); optional Family Builder widget.
16. Seniors/65+ content expansion (community-rated vs. age-banded labels; Medicare-gap disclaimer).
17. Schema hardening: consolidate `@graph`, add `Organization` + `WebSite` SearchAction + `Article` + `HowTo`; verify ItemList/FAQPage parity.
18. Scenario landing pages BATCH 2 (8): implants, adult-braces, kids-braces, after-job-loss, new-job, couples, best-ppo-2026, how-dental-insurance-works.
19. Internal-linking audit pass: every plan page links back to hub with non-duplicate anchor; directional rules enforced.
**Acceptance / Gate D (QA + user):** Rich Results Test passes (warnings OK for non-rendered types); every family claim SSOT-annotated or `<!-- VERIFY -->`; 8 batch-2 pages live + in sitemap; `@graph` replaces the 4 blocks with no duplicate `@type` conflicts.
**Specs:** 05, 06, 07, 15, 16, 17, 18.

### PHASE 5 — SEO + GEO hardening (Weeks 18-21, Oct 13-Nov 7)
20. Full Spec 15 implementation: finalize title/meta/H1-H3; H2s address Clusters 2,3,6,7,8,9.
21. Add the 4 priority GEO answer blocks (Clusters 6,7,8,9) in the first 40% of content.
22. Add `Product`+`Offer` schema per plan (omit price unless SSOT-verified + visible).
23. CSS-token alignment pass (audit local fork vs. CLAUDE.md/hub-theme.css) — **branch + visual regression test first; defer if hub-theme.css is shared and risky.**
24. "2026" freshness pass; set up Spec 20 KPI tracking.
25. Reconsider Option A migration only if 60-90 days of GSC data clear it (D1 hybrid path).
**Acceptance / Gate E (SEO + user):** crawl confirms unique H1, 6-10 H2s, scenario-first meta; GEO blocks in first 40%; Rich Results passes after Product schema; no visual regressions if token refactor done; weekly GSC review active.
**Specs:** 02, 03, 15, 16, 20.

### PHASE 6 — Content expansion, conversion, measurement (Weeks 22-26, Nov 10-Dec 31)
26. Conversion-psychology pass (Spec 12): dollar example on every plan card; limitation-first framing verified; trust module live; terminology anchor verified.
27. Retention features (Spec 13): bookmark CTA, scenario-summary share, `#scenario=` deep-link hash, sessionStorage persistence.
28. Remaining scenario silo pages (Clusters 10/12/13/14) as needed.
29. Delta-Dental T3.5-hub assessment; record decision here.
30. Formal measurement review at week 22 and week 26 vs. Spec 20 KPIs + scenario mapping (C/B/S); write January 2027 freshness brief (re-verify all 8 SSOTs).
**Acceptance / Final close (SEO + user):** every plan card has a dollar example; trust + terminology blocks live; week-26 measurement report written; Jan-2027 brief stored.
**Specs:** 12, 13, 17, 20.

**Critical path:** Gate A (D1) → Phase 2 hub live + 14-day monitor → Phase 3 rail JS + landing batch 1 → Phase 4 family + verification + schema → Phase 5 SEO/GEO → Phase 6 measurement. Longest-lead item: compare-page SSOT correction + carrier verification — start Week 1.

---

## 6. RISKS + GUARDRAILS

- **YMYL / E-E-A-T (R1, high for head + seniors clusters):** dental insurance is Your-Money-or-Your-Life. Launch requires a NAMED author/reviewer (D8), a visible "How we chose these plans" methodology, a visible "Last updated" date, and links to primary sources. Not a post-launch fix.
- **Cannibalization (R2, high):** hub (scenario-first), compare page (feature grid), and plan pages (single carrier) must own distinct intents. Hub carries NO full comparison table; compare carries NO scenario finder; directional internal links only; differentiated titles/H1s; head-term anchors reserved for the hub. The compare page must be 301'd or breadcrumb-canonicalized correctly or Google ranks neither.
- **SSOT drift (R3):** carriers change terms; stale "verified" facts are worse than no facts and can get wrong data AI-cited. Re-verify all 8 SSOTs ≥ every 6 months; annotate each hub fact with its SSOT verify date; watch the high-risk fields (Aetna CVS state list, MOO selectable max, Ameritas implant sub-cap interaction, Guardian adult-ortho exclusion). Run the Spec 16 Part 9 quarterly checklist.
- **AdSense policy:** "Advertisement" label above every AdSense unit; no ad inside a plan card, between a headline and its body, inside navigation, inside a modal, or within 48px of a CTA; no implied reward for clicking; max 3 units; no sticky ad; house promos never labeled as ads; CVS links are plain category URLs (not affiliate/UTM), not incentivized.
- **No fabricated facts:** every plan number from `/data/plans/{slug}.md`; premiums labeled estimates rounded to nearest $5; no invented reviews/ratings/stats; honor each SSOT `do_not` list (Section 3.3); never guarantee coverage/acceptance; member IDs never stored.
- **Style guardrails:** no em-dashes anywhere (copy, headings, schema, alt text, meta); no roman numerals in lists; no glassmorphism; no gradient on plan cards; no countdown timers; no exit-intent popups; no fabricated scarcity; no Capy Crowns/point values until the rewards program launches; preserve the 8 plan-story vignettes verbatim (only remove em-dashes / correct facts).
- **Technical (R5):** test the hub URL via curl + browser after every deploy; use Vercel preview URLs; smoke-test before announcing; the generator must run from repo root (never `cd seo-build`).

---

## 7. VERBATIM — DECISIONS NEEDED FROM USER

D1. **Compare-page URL — Option A (physical move to `/dental-insurance/ppo-plans/compare/`) or Option B (keep URL, change breadcrumb + schema only)?** Default: **Option B at launch**, revisit A in Phase 5 with GSC data. (Blocks Phase 2.)
D2. **Apply the 7 SSOT corrections to the compare-page JSON** (Aetna $1,250; Guardian major/implant/ortho; MOO no-wait + 20% year-one; Humana $75) and re-verify each? Default: **Yes.**
D3. **Delete the stale physical files + `rct_index.html` + `dd.html` in the Phase-2 deploy?** Default: **Yes.**
D4. **Ad density: ship all 3 AdSense slots at launch, or rails-only first?** Default: **Slots B and C only at launch; hold Slot A until Phase 5.**
D5. **Rewards prominence: how loud is the Capy Rewards teaser?** Default: **Soft right-rail teaser only, no point values, no Capy Crowns, no counter.**
D6. **Scenario-landing-page URL pattern + launch batch?** Default: **`/dental-insurance/ppo-plans/guides/{slug}/`; batch 1 = no-waiting-period, seniors-over-65, family, CVS-rewards.**
D7. **MVP scope (Phase 2) vs. later phases?** Default: **MVP = hero + 2-step scenario finder + 8 plan stories + comparison table + best-for grid + 2 verify bands + FAQ + rail shells + full schema + compare-JSON fix; defer family builder, timeline, rail content, CSS refactor, Product schema, landing pages.**
D8. **Named author/reviewer for YMYL byline at launch?** Default: **Provide one named editorial reviewer + linked author/editorial-standards page before Phase 2 ships.**
D9. **Family section: ship with confirmed facts + "verify with carrier" placeholders for the 10 unverified items, or delay until all verified?** Default: **Ship with placeholders; never guess a number.**
D10. **Approve the scenario-first H1 ("Which PPO dental plan fits your situation?") and title ("Best PPO Dental Plans 2026: Find the Right Fit | CoverCapy") over the current plan-count framing?** Default: **Yes.**

---

*End of 00-MASTER-CONSOLE.md. Reconciles specs 01-20. Planning only; no production changes until approved and the Section 1 / Section 7 decisions are signed off by the user.*

---

## DECISIONS LOCKED (Jay, 2026-06-26)

- **D1 Compare URL = Option B (breadcrumb only).** Keep `/compare-ppo-dental-plans` live; change its breadcrumb + schema to sit under `/ppo-plans`. No redirect at launch. Revisit a physical move in Phase 5 with Search Console data.
- **D7 MVP scope = Lean MVP.** Phase 2 ships: hero + 2-step scenario finder + 8 plan stories + comparison table + best-for grid + 2 verify bands + FAQ + rail shells + full schema + compare-JSON fact fix. Defer family builder, timeline, full rail content, CSS refactor, Product schema, and scenario landing pages to later phases.
- **D4 Ad density = two slots, light.** AdSense slots B (mid-page) and C (after FAQ) only at launch. Hold the right-rail ad slot until Phase 5.
- **D5 Rewards = soft teaser only.** Quiet right-rail Capy Rewards teaser. No point values, no Capy Crowns, no counters, until the rewards program has real specs.
- **D2 (apply 7 SSOT corrections to compare-page JSON), D3 (delete stale files), D8 (named YMYL reviewer), D9 (family facts ship with "verify with carrier" placeholders), D10 (scenario-first H1/title)** all proceed on their recommended defaults.
- **D6 scenario landing pages** = pattern `/dental-insurance/ppo-plans/guides/{slug}/`, batch 1 = no-waiting-period, seniors-over-65, family, CVS-rewards. Deferred to Phase 5 per Lean MVP.

**Next action when build begins:** Phase 1 = the "Facts to Fix First" reconciliation (compare-page JSON + the MetLife/MOO/Guardian/Aetna/Humana story-vs-SSOT conflicts), since it gates the Lean MVP build.

---

## PHASE 1 COMPLETE (2026-06-26): Facts reconciled vs SSOT

- **Compare page** (`compare-ppo-dental-plans.html`): already correct from prior sessions. Verified the plans-data JSON and visible table match the SSOTs (Aetna $1,250; Guardian 60% major/implant/child-ortho; MOO no-wait 20%->50%; Humana $75). No changes needed.
- **Hub page** (`dental-insurance/ppo-plans/index.html`): fixed all conflicts. Aetna $1,500->$1,250 and basic 3mo->6mo (stop-price, prose, table); Guardian now correctly shows implants COVERED (60% in network, $1,250 lifetime) and child ortho 60% up to $1,500 lifetime (story, table, best-for picker, best-for scenario, FAQ schema + visible); MOO now no waiting period with 20%->50% ramp and a $3,000 lifetime implant cap (story, prose, table, picker, FAQ schema + visible); "Every plan carries a $50 deductible" corrected to note Humana $75 / MetLife $100; UHC hub vignette "three business days" softened to "the next day"; verification dates bumped to June 26, 2026; CollectionPage dateModified 2026-06-26. All four JSON-LD blocks validate; schema/visible FAQ parity maintained.
- **UHC plan page**: no change needed (already uses SSOT-safe "next business day"/"the day after").
- **Aetna 442,000 network figure**: retained, it is backed by the Aetna SSOT positioning.

The data layer is now clean and SSOT-aligned, unblocking the Phase 2 Lean MVP hub build.
