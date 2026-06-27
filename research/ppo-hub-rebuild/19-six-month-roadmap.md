# 19 — Six-Month Roadmap: PPO Plans Hub Rebuild
## CoverCapy PPO Hub Rebuild Program | Spec 19 of 20
**Status:** PLANNING ONLY. No production changes until the 20 specs plus master console are complete and the user approves.
**Authored:** 2026-06-26
**Scope:** Phases 1 through 6 covering July 2026 through December 2026.
**Constraint note:** This is a static HTML site on Vercel. All deploys are git pushes from the user's Mac. The seo-build generator is Mac-only and cannot run in a Linux sandbox. No agent can push to production; the user must execute all git commands.

---

## HOW TO READ THIS DOCUMENT

Each phase section covers:
- Goals (what changes in the world when this phase is done)
- Concrete deliverables (files changed, new files, tool updates)
- Specs that feed this phase (from specs 01 through 20)
- Dependencies (what must exist before this phase can start)
- Owners by role (sitebuilder, webmaster, SEO, content, UX, QA)
- Acceptance criteria (pass/fail tests that gate the next phase)
- Risks and mitigations
- What can ship incrementally vs. what must be sequenced

The critical path and RACI table follow the phase descriptions.

---

## PHASE 1: FOUNDATION, IA, AND URL MIGRATION SIGN-OFF
**Duration:** Weeks 1 through 3 (July 1 through July 18, 2026)

### Goals

Resolve all seven spec 04 flags before a single line of rebuild HTML is written. Establish the canonical URL for the compare page. Freeze the site's breadcrumb hierarchy. Clean up stale files. Verify plan SSOTs against known data discrepancies from spec 01. Baseline all GSC and ranking data.

This phase produces no user-visible HTML changes on the live site. It produces decisions, baselines, and verified data that everything else depends on.

### Concrete deliverables

1. **GSC baseline report** (PDF or spreadsheet): impressions, clicks, and top queries for `/compare-ppo-dental-plans`, `/dental-insurance/ppo-plans/`, and all 8 individual plan pages. Saved to `research/ppo-hub-rebuild/baselines/`.

2. **Backlink audit report** for `/compare-ppo-dental-plans` using Ahrefs or Google Search Console Links report. Saved alongside the GSC baseline.

3. **FLAG-01 resolution:** Decision recorded in `research/ppo-hub-rebuild/00-MASTER-CONSOLE.md` (when that file is written): delete or keep the stale physical files at `dental-insurance/ppo-plans/aetna/`, `dental-insurance/ppo-plans/humana/`, etc., plus the `rct_index.html` files. Recommended decision: delete them. If approved, execute `git rm` in the same deploy as Phase 2 structural changes.

4. **FLAG-02 and FLAG-03 resolution (GO/NO-GO gate A):** Based on the GSC and backlink data, decide Option A (physical move of compare page to `/dental-insurance/ppo-plans/compare/`) or Option B (keep URL, update breadcrumb and schema only). This decision is recorded in `00-MASTER-CONSOLE.md` and signed off by the user before Phase 2 work begins. No rebuild HTML ships until this gate is cleared.

5. **FLAG-04 resolution:** Confirm whether the vanity redirect `/ppo-plans` should route to the PPO hub index (`/dental-insurance/ppo-plans/`) rather than the compare page.

6. **FLAG-05 resolution:** Confirm sitemap priority values (recommended: hub at 0.85, plan pages at 0.75, compare at 0.85).

7. **FLAG-06 resolution:** Confirm topic separation rules (hub is scenario-first, no comparison table; compare page owns feature grids; plan pages own single-carrier queries). This unblocks spec 18 content drafting.

8. **FLAG-07 resolution:** Confirm `robots.txt` exists at repo root and that scratch files (`dd.html`, `rct_index.html`) are either deleted or disallowed.

9. **SSOT reconciliation memo:** Verify the 7 known data discrepancies from spec 01 section 3.5 against `/data/plans/*.md` SSOTs. The discrepancies are: Aetna annual max ($1,250 vs $1,500 in the compare JSON), Guardian major % (60% vs 50%), Guardian implant coverage (covered vs not covered), Guardian ortho child % (60% vs 50%), MOO waiting period (day 1 vs 12 months), MOO year-one major % (20% vs 50%), Humana deductible ($75 vs $50). The SSOT wins in every case per CLAUDE.md rule 13. The compare page `plans-data` JSON must be updated to match the SSOTs in Phase 2.

10. **Carrier verification list (items from spec 07 section 5):** 10 items flagged as needing primary source verification before publishing. Assign each to a content or SEO owner with a due date within Phase 2.

### Specs feeding this phase

Spec 01 (current state audit), spec 04 (IA and URL migration), spec 07 (family economics, verification items section 5).

### Dependencies

None external. This phase only needs access to Google Search Console, a backlink tool, and the spec 04 decision framework already written. The user must have GSC admin access.

### Owners

| Deliverable | Owner |
|---|---|
| GSC and backlink reports | Webmaster |
| FLAG-01 through FLAG-07 decisions | Webmaster + user sign-off |
| SSOT reconciliation memo | Content + SEO |
| Carrier verification list | Content |

### Acceptance criteria (GO/NO-GO gate A)

All seven flags in spec 04 must have a recorded decision before Phase 2 begins. Specifically:
- FLAG-03 (Option A or B) must be signed off by the user.
- The SSOT reconciliation memo must confirm which SSOT values replace the compare JSON values, and at least one person has verified each against the primary carrier source.
- The GSC baseline report must be saved (it is not a blocking criterion, but it must exist before Phase 2 deploys anything to production).

If FLAG-03 is not resolved by July 18, Phase 2 can begin on non-URL-sensitive work (content drafting, schema planning) but no HTML files that touch the compare page or `vercel.json` may be deployed.

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| GSC data shows compare page ranking in top 5 for a high-volume query | Medium | High: makes Option A risky | If this occurs, default to Option B and revisit Option A in Phase 5 after hub authority is established. |
| SSOT reconciliation reveals a fact that cannot be verified against a primary source | Medium | Medium: that fact cannot be published | Flag it with a "VERIFY BEFORE BUILD" note. Do not invent or guess. |
| Carrier verification items (spec 07 section 5) are unanswerable without a direct carrier call | Low | Low | Note "unverifiable at this time" and exclude the specific sub-claim from Phase 2 content. |

### Incremental vs. sequenced

Everything in Phase 1 is blocking. No HTML ships until flag decisions are recorded. The SSOT reconciliation and carrier verification can proceed in parallel with the flag resolution work.

---

## PHASE 2: HUB MVP BUILD (SCENARIO-FIRST CORE + PLAN STORIES)
**Duration:** Weeks 4 through 8 (July 21 through August 15, 2026)

### Goals

Build and deploy the rebuilt `/dental-insurance/ppo-plans/index.html` with the scenario-first structure defined in specs 10, 18, and the content validated against specs 05, 06, 08. Preserve all eight plan stories verbatim (spec 01 section 4). Add the scenario finder widget (simple, two-step: situation chip plus timing picker). Add the three-column layout shell with left and right rail placeholder structure. Fix the schema graph to match DI Hub quality. Update the compare page plans-data JSON to correct SSOT discrepancies.

This is the largest single phase and the one most likely to slip. It must not ship until all plan facts pass QA against the SSOTs.

### Concrete deliverables

1. **Rebuilt `dental-insurance/ppo-plans/index.html`** with:
   - H1: scenario-first headline using Cluster 1 keywords from spec 03.
   - "Who needs coverage?" four-button chooser (Just me, Me plus kids, Me plus spouse, Whole family) with inline answer blocks.
   - Scenario finder section (`#scenario-finder`): 8 situation chips (Step 1), timing picker (Step 2), answer block with plan match.
   - All 8 plan story cards (`.tour-stop`) in order UHC, Aetna, Ameritas, Guardian, MetLife, Mutual of Omaha, Humana, Delta. Stories are preserved verbatim from spec 01 section 4; no story text changed without content owner approval.
   - Left rail aside with scenario nav chips and jump links. Right rail aside with dentist verify CTA card and CVS spotlight placeholder.
   - Comparison table with "Best for" column added, horizontal scroll wrapper, updated 8-plan data (all figures SSOT-verified).
   - Best-for scenarios grid with 8 cards including the new "Seniors / 65+" card.
   - Waiting periods explainer (existing prose retained), updated schema.
   - Two verify CTA bands (first after plan stories, second after FAQ).
   - FAQ section with 10 items including 2 new questions from spec 10 section 13.
   - Related links extended with 3 new entries.
   - Updated JSON-LD: CollectionPage + BreadcrumbList (3 levels with trailing slash) + ItemList (8 plans) + FAQPage (12 items) + Article with authorship + Organization node + WebSite with SearchAction. Uses `@graph` wrapper matching DI Hub quality (spec 15 prereq work).
   - Trailing slash on canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/`
   - No em-dashes. No fabricated stats. CSS tokens from hub-theme.css or the hub's scoped `:root` block, consistent with the existing PPO Hub token set (not replacing with CLAUDE.md canonical tokens, since the PPO Hub has its own scoped set and changing all tokens is a separate Phase 5 task).
   - `og:image` and Twitter card meta tags added.
   - `datePublished` added to Article schema.

2. **Updated `compare-ppo-dental-plans.html`** plans-data JSON corrections:
   - Aetna annual max: $1,250 (not $1,500)
   - Guardian major %: verify against SSOT and apply correct value
   - Guardian implant: verify against SSOT
   - Guardian ortho child %: verify against SSOT
   - MOO waiting period: NONE (not 12 months per 2026 SSOT)
   - MOO year-one major: 20% (not 50%)
   - Humana deductible: $75 (not $50)
   - Breadcrumb schema updated to show the 4-level chain (Home / Dental Insurance / PPO Plans / Compare Plans) for Option B, or canonical updated for Option A.

3. **`vercel.json` changes** (Option A only, if FLAG-03 resolution chose Option A):
   - Add `/compare-ppo-dental-plans` 301 to `/dental-insurance/ppo-plans/compare/`
   - Update all 15 vanity redirects to new destination
   - Confirm FLAG-04 decision for `/ppo-plans` vanity route

4. **Stale file deletion** (if FLAG-01 resolved to delete): `git rm` for all listed stale `index.html` files and `rct_index.html` variants in the same deploy as the hub rebuild.

5. **Sitemap updates** (`sitemap.xml` and `sitemap-content.xml`):
   - PPO hub at 0.85, trailing slash consistent with canonical
   - All 8 plan pages at 0.75, trailing slash consistent
   - Compare page entry per Option A or B decision
   - Remove stale legacy path entries if any

6. **Content brief for Family Section** (not built in Phase 2, built in Phase 4): Written by content owner using spec 07 examples A, B, C. All carrier verification items from spec 07 section 5 must be resolved before Phase 4 builds this section.

### Specs feeding this phase

Spec 01 (plan stories, component inventory), spec 03 (keyword mapping, entity list), spec 04 (IA, URL, canonical, sitemap), spec 05 (personas, plan fit), spec 06 (scenario matrix), spec 08 (decision matrix, do-not flags), spec 09 (UX findings: terminology anchors, dollar examples, state availability notes), spec 10 (UX wireframe, full scroll narrative), spec 15 (on-page SEO prereq: title/meta/heading/schema).

### Dependencies

Phase 1 complete. Specifically:
- GO/NO-GO gate A cleared (FLAG-03 resolved).
- SSOT reconciliation memo complete.
- Spec 15 (on-page SEO spec) must be complete before the title tag, meta description, and H1 are finalized. If spec 15 is not yet complete (it is Wave 2), use the spec 03 keyword recommendations as interim guidance and finalize title/meta in Phase 3.

### Owners

| Deliverable | Owner |
|---|---|
| HTML rebuild of ppo-plans/index.html | Sitebuilder |
| Plan story content verification | Content |
| Schema graph build | Webmaster or SEO |
| compare page JSON correction | Sitebuilder |
| vercel.json changes (Option A) | Webmaster |
| Sitemap updates | Webmaster |
| QA pass (all 8 plan facts vs SSOTs) | QA |

### Acceptance criteria (GO/NO-GO gate B)

Before this phase's HTML ships to production:
- Every premium figure, annual maximum, deductible, coinsurance rate, waiting period, and network fact in the rebuilt hub HTML must be traced to a specific SSOT field citation. QA signs a sign-off checklist listing each fact and its SSOT source.
- No em-dashes in any section of the file.
- Canonical tag reads `https://www.covercapy.com/dental-insurance/ppo-plans/` with trailing slash.
- BreadcrumbList JSON-LD has 3 levels matching the canonical path.
- ItemList JSON-LD lists all 8 plans with URLs pointing to `/dental-insurance/ppo-plans/{slug}/`.
- The compare page plans-data JSON corrections are verified against SSOTs by the content owner.
- The `datePublished` and `dateModified` fields in Article schema match the deploy date.
- Sitemap entries for the hub and plan pages have trailing slashes consistent with canonical tags.
- If Option A was chosen: verify all 301 redirect chains via `curl -I` before deploying to production. Every vanity route that pointed to `/compare-ppo-dental-plans` must resolve to the new URL in two hops or fewer.

### Post-deploy monitoring (Phase 2)

| Day | Action |
|---|---|
| Day 1 | Confirm 301 chains via `curl -I`. Confirm canonical tags. Request GSC indexing for hub URL. |
| Day 3 | GSC URL Inspection on hub and compare page. Check for redirect errors. |
| Day 7 | Check GSC Coverage report. No new "Redirect error" or "Submitted URL marked noindex" entries allowed. |
| Day 14 | Check impressions/clicks on hub URL in GSC Performance. Compare against Phase 1 baseline. |
| Day 30 | Full ranking audit vs Phase 1 baseline. Any query dropping more than 5 positions requires investigation. |

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Plan fact QA reveals a SSOT gap that blocks a section | Medium | Medium | Note gap in the HTML with an HTML comment `<!-- VERIFY BEFORE FINAL -->` and do not publish the disputed fact; ship the section without that specific claim. |
| Option A redirect chain misconfiguration | Low | High: 301 chains could break ranking | Test every redirect in staging environment before production deploy. Use `curl -I` checklist. |
| Hub HTML file size exceeds 200KB | Low | Low | Compress images; defer non-critical JS. The current PPO Hub is approximately 65KB inline; the rebuild will be larger but should stay under 200KB. |
| Sitebuilder time underestimated (this is the largest deliverable) | High | High | Reserve 3 weeks for this phase, not 2. Buffer is built into the 8-week window. |

### Incremental vs. sequenced

The plan stories and comparison table can ship before the scenario finder widget is fully polished, since they are pure HTML. The scenario finder can be deployed as an enhancement once the base HTML is live. The vercel.json changes (Option A) must ship in the same deploy as the hub HTML, not separately.

---

## PHASE 3: WIDGETS, RAILS, AND INTERACTIVE LAYER
**Duration:** Weeks 9 through 12 (August 18 through September 12, 2026)

### Goals

Add the interactive layer on top of the Phase 2 HTML base: the family/individual toggle in the scenario finder, the left rail sticky scenario nav with IntersectionObserver highlighting, the right rail CVS ExtraCare spotlight and Capy Rewards teaser, the mobile sticky bottom bar, the waiting periods visual timeline, the "match indicator" bars on plan story cards, and the mini quick-facts panels inside each tour-stop card. Also build the scenario landing pages referenced by spec 17 (internal linking silo), beginning with the highest-priority clusters from spec 03.

This phase also implements the light interactive widgets specified in spec 11: the scenario finder answer block enhancements, the "send to partner" share CTA, the "waiting period to coverage date" framing language (not a calculator, per the no-heavy-calculator constraint in 00-INDEX), and the COBRA gap 63-day window explainer copy.

### Concrete deliverables

1. **Left rail JavaScript** (`<script>` inline or `assets/js/ppo-hub-rail.js`):
   - IntersectionObserver on each `.tour-stop` anchor: highlights the corresponding scenario chip in the left rail as the user scrolls.
   - Filter-by-need pill toggles: clicking "Implants" dims tour-stop cards that have `data-covers-implants="false"`.
   - Jump links: observe center column H2 sections to highlight the active section in the jump nav.

2. **Right rail content blocks** built out (were placeholders in Phase 2):
   - R2: Aetna CVS ExtraCare Plus spotlight card with verified SSOT copy. One-sentence explainer of the $10 monthly reward, state exclusion note, and link to Aetna plan review.
   - R3: Capy Rewards teaser card. Soft teaser only; no fabricated point values.
   - R4: Family Builder shortcut card.
   - R5: Share + Save block with copy-link, email, and `navigator.share` fallback.

3. **Mobile sticky bottom bar** (three-button: Scenario finder, Verify dentist, Compare): CSS + JS. Appears after hero scrolls out of viewport, disappears at footer.

4. **Waiting periods visual timeline** (HTML/CSS only, no JavaScript dependency): horizontal bar diagram per plan showing month 0 through 24, coverage tier bars color-coded. Described in spec 10 section 10. Degrades to text for screen readers.

5. **Match indicator bars** on each tour-stop card: CSS class toggled by the scenario finder answer; shows "Matches your situation" or "Not your best match" depending on the visitor's chip selection.

6. **Mini quick-facts panels** inside each tour-stop card (desktop): monthly premium, annual max, waiting period summary, implants (yes/no), ortho (yes/no). Two CTAs: "Verify my dentist" and "Full review."

7. **Family/individual toggle** in the scenario finder section: segmented control above the situation chips. Family mode shows 4 family-specific chips instead of 8 individual chips.

8. **"Send to partner" CTA** in scenario answer block: generates a mailto link with a pre-filled subject and body containing the scenario match summary.

9. **Scenario landing pages (Phase 3 batch):** 4 new pages targeting the highest-priority keyword clusters from spec 03 that have no current standalone page. Priority order based on GEO gap and CoverCapy competitive advantage:
   - `/dental-insurance/ppo-plans/guides/dental-insurance-no-waiting-period/` (Cluster 7: Ameritas and Mutual of Omaha)
   - `/dental-insurance/ppo-plans/guides/dental-insurance-for-seniors/` (Cluster 6: Mutual of Omaha)
   - `/dental-insurance/ppo-plans/guides/dental-insurance-for-family/` (Cluster 2: Humana, Aetna, Guardian)
   - `/dental-insurance/ppo-plans/guides/dental-insurance-cvs-rewards/` (Cluster 9: Aetna only)
   
   Each guide is a static `index.html` in its slug folder. Content sourced from the GEO answer blocks in spec 16. Each page links back to the PPO hub and to the relevant plan review page(s). Internal linking per spec 17 silo architecture.

10. **Spec 11 widgets implemented** (light version per 00-INDEX no-heavy-calculator rule):
    - Scenario finder answer block enhanced with "Key fact pill" and "Skip it if" callout box.
    - "How long until my coverage starts?" waiting period framing copy added to each answer block (plain language, not a date calculator).
    - COBRA gap 63-day window explainer: a callout block in the "Lost a job with dental" scenario answer, explaining what documents are needed to waive waiting periods.

### Specs feeding this phase

Spec 06 (scenario matrix, answer block content), spec 07 (family economics, family scenario card content), spec 09 (UX findings: share triggers, state availability, terminology), spec 10 (UX wireframe: rail specs, widget specs, mobile spec), spec 11 (interaction widgets spec, light calculator scope), spec 13 (retention and engagement), spec 14 (rails and monetization), spec 16 (GEO answer blocks for scenario landing pages), spec 17 (internal linking silo).

### Dependencies

Phase 2 complete and live. The HTML base must be deployed before the interactive layer is added, so the IntersectionObserver targets exist in the DOM. The scenario landing pages can be drafted in parallel with Phase 2 but should not be deployed until the hub itself is live (they link to the hub).

### Owners

| Deliverable | Owner |
|---|---|
| Left rail JS, filter toggles, IntersectionObserver | Sitebuilder |
| Right rail content (R2, R3, R4, R5) | Sitebuilder + Content |
| Mobile sticky bar | Sitebuilder |
| Waiting periods timeline | Sitebuilder |
| Match indicators and quick-facts panels | Sitebuilder |
| Family/individual toggle | Sitebuilder |
| "Send to partner" CTA | Sitebuilder |
| Scenario landing pages (4 guides) | Content + SEO |
| Spec 11 widget enhancements | Sitebuilder + UX |
| QA: all interactive states, accessibility | QA |

### Acceptance criteria (GO/NO-GO gate C)

- All interactive elements tested on Chrome, Safari, and Firefox (mobile and desktop).
- Left rail IntersectionObserver correctly highlights the active chip as the user scrolls through each plan story.
- Filter-by-need toggles correctly dim non-matching plan cards without removing them from the DOM (they must remain accessible to screen readers with `aria-hidden="false"` but visually dimmed).
- Mobile sticky bar is dismissible and respects `prefers-reduced-motion`.
- All four scenario landing pages are live, have correct canonical tags pointing to themselves, appear in `sitemap.xml`, and link back to the hub.
- Each scenario landing page has been reviewed against its relevant SSOT files by the content owner. No fabricated facts.
- "Send to partner" mailto link generates correctly for each scenario match.
- Accessibility: `aria-checked` states on all chooser groups, `aria-live="polite"` on all answer blocks, `aria-label` on both rail asides.

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| IntersectionObserver scroll highlighting conflicts with existing page scroll behavior | Low | Low | Wrap in `try/catch`; feature-detect IntersectionObserver. |
| Scenario landing pages cannibalize the hub for hub-level queries | Low | Medium | Ensure each landing page H1 and meta description targets a scenario-specific long-tail query, not the head "best dental insurance 2026" query (which belongs to the hub). Per spec 04 cannibalization rules. |
| Family section content requires carrier verification items not yet complete | Medium | Medium | If spec 07 verification items are unresolved, replace the specific claim with "verify with carrier" language rather than deleting the section. |

### Incremental vs. sequenced

The right rail content blocks, mobile sticky bar, and scenario landing pages can ship in any order. The left rail IntersectionObserver depends on the tour-stop anchor IDs being in the DOM (Phase 2 deliverable). The family/individual toggle depends on the family scenario cards (Phase 4 deliverable) being present; ship the toggle as a no-op until Phase 4 content is built, or ship Phase 4 family section in Phase 3 if content is ready.

---

## PHASE 4: FAMILY ECONOMICS, SENIORS CONTENT, AND SCHEMA HARDENING
**Duration:** Weeks 13 through 17 (September 15 through October 10, 2026)

### Goals

Build the Family Section in the hub center column (spec 10 section 12). Write the senior/65+ content expansion. Add the schema types missing from the hub: `HowTo`, `@graph` wrapper, `Organization` node, `WebSite` with SearchAction. Fix any remaining canonical and sitemap issues identified in Phase 2 monitoring. Publish the remaining 8 scenario landing pages from spec 17. Begin the content reconciliation between the hub, compare page, and plan pages for internal linking density (spec 17 silo audit).

All family economics content must pass carrier verification against spec 07 section 5 checklist before publishing.

### Concrete deliverables

1. **Family Section HTML** (Phase 2 placeholder built out): 4 family scenario cards per spec 10 section 12:
   - Kids braces plus parent maintenance (Guardian + UHC)
   - One adult implant plus partner basic (Humana + Ameritas)
   - Aetna CVS family (two Aetna policies, CVS reward per enrolled adult)
   - Heavy year for two (Mutual of Omaha for both adults, independent maximums note)
   - Family deductible cap explainer (plain language, per spec 07 section 1.2, using only the plans with confirmed family deductible caps: Aetna $150, Delta $150, UHC 3x$50 = $150, and noting which plans have unverified caps).
   - Per-person vs. pooled maximum explainer (spec 07 section 1.3 summary paragraph).
   - Carrier verification disclaimer: "Family pricing and deductible caps vary. Verify with your carrier before enrolling."

2. **Seniors callout section** or expanded FAQ entries: adds "Best dental insurance for seniors over 65" as a named section (H3 within the Best-for-scenarios section, or an expansion of the 65+ scenario finder answer block). Verified against Mutual of Omaha SSOT. Medicare gap disclaimer text as specified in spec 05 persona 6. Community-rated vs age-banded label on Mutual of Omaha and Ameritas.

3. **Schema hardening pass on `dental-insurance/ppo-plans/index.html`**:
   - Wrap all schema in a single `@graph` array (replacing the current 4 separate script blocks).
   - Add `Organization` node with `@id: "#org"`, name, url, logo matching the DI Hub.
   - Add `WebSite` node with `@id: "#website"`, publisher ref, `potentialAction` SearchAction pointing to `/find-my-dentist?q=`.
   - Add `Article` node with `datePublished`, `dateModified`, `author` (Person or Organization), `publisher` ref.
   - Add `HowTo` node: 5 steps for choosing a PPO dental plan (adapt from the DI Hub's `howto` node, per spec 15 recommendation).
   - Verify `ItemList` lists all 8 plans and that each `url` points to the correct plan slug path (not `seo_path`).
   - Verify `FAQPage` has at minimum 10 questions including the 2 new questions added in Phase 2.
   - Verify `SearchAction` urlTemplate: use `?q=` or match whichever parameter find-my-dentist.html actually reads.

4. **Sitemap reconciliation pass**: Correct any trailing slash inconsistencies discovered during Phase 2 monitoring. If Option A was chosen, verify the compare page new URL is in the sitemap and the old URL entry is removed.

5. **Scenario landing pages (Phase 4 batch):** 8 remaining guides from spec 17:
   - `/dental-insurance/ppo-plans/guides/dental-insurance-for-implants/`
   - `/dental-insurance/ppo-plans/guides/dental-insurance-adult-braces/`
   - `/dental-insurance/ppo-plans/guides/dental-insurance-for-kids-braces/`
   - `/dental-insurance/ppo-plans/guides/dental-insurance-after-job-loss/`
   - `/dental-insurance/ppo-plans/guides/dental-insurance-new-job/`
   - `/dental-insurance/ppo-plans/guides/dental-insurance-for-couples/`
   - `/dental-insurance/ppo-plans/guides/best-ppo-dental-insurance-2026/`
   - `/dental-insurance/ppo-plans/guides/how-dental-insurance-works/`
   
   Each page: GEO answer blocks per spec 16, internal links per spec 17 silo, SSOT-sourced plan facts only.

6. **Internal linking audit (spec 17 pass 1)**: Audit all 8 plan review pages (`/dental-insurance/ppo-plans/{slug}/`), the compare page, and the DI Hub for links to the rebuilt PPO hub. Add missing inbound links. Per spec 17 directional linking rules: hub links to compare and plans; compare links to plans; plans link up to hub and compare; no circular top-level links between hub and compare.

### Specs feeding this phase

Spec 07 (family economics, worked examples A through C, verification items), spec 05 (persona 6: seniors), spec 06 (scenarios 9 and 11), spec 15 (on-page SEO: schema types), spec 16 (GEO answer blocks for Phase 4 landing pages), spec 17 (internal linking silo: silo map, hub-to-plan links), spec 18 (content outline: family and seniors sections).

### Dependencies

Phase 3 complete. Spec 07 carrier verification items (section 5) must be resolved before the Family Section ships. Spec 16 must be complete (Wave 2) to provide GEO answer block copy for the Phase 4 scenario landing pages. Spec 18 content outline must be complete to provide the family and seniors section copy.

### Owners

| Deliverable | Owner |
|---|---|
| Family Section HTML and copy | Content + Sitebuilder |
| Seniors callout / 65+ expansion | Content |
| Schema hardening pass | Webmaster or SEO |
| Sitemap reconciliation | Webmaster |
| Phase 4 scenario landing pages | Content + SEO |
| Internal linking audit (plan pages) | SEO |
| QA: schema validation, all links | QA |

### Acceptance criteria (GO/NO-GO gate D)

- Google Rich Results Test passes on the rebuilt hub URL (no errors; warnings acceptable for schema types Google does not render in SERPs, such as HowTo, which was deprecated for rich results but remains a GEO citation signal).
- All family economics claims in the Family Section are annotated with their SSOT field citation in an HTML comment. Carrier verification items that are unresolved are marked with a `<!-- VERIFY -->` comment.
- All 8 Phase 4 scenario landing pages are live, canonical, and in the sitemap.
- Internal linking audit confirms every plan page links back to the hub with anchor text that does not duplicate the plan page's own H1.
- The `@graph` wrapper replaces the previous 4 separate script blocks without breaking the existing schema types.
- Schema.org validator (or the Google Rich Results Test) shows no duplicate `@type` conflicts.

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Spec 07 carrier verification items still unresolved at start of Phase 4 | Medium | Medium | Ship the family section with "verify with carrier" notes in place of unverified figures. Do not delay the phase; ship what is confirmed. |
| 12 scenario landing pages (4 in Phase 3 + 8 in Phase 4) create thin-content risk if pages are too short | Medium | Medium | Each landing page must have a minimum 800 words of original content plus GEO answer blocks, internal links, and FAQ. No placeholder pages. |
| HowTo schema addition causes a schema conflict if DI Hub already signals HowTo for the same search entity | Low | Low | The DI Hub's HowTo is for "choosing a dental plan" (5 steps); the hub's HowTo should address a distinct question, such as "how to use a PPO dental plan" (coverage tiers, deductibles, claims). Distinct enough to avoid entity conflict. |

### Incremental vs. sequenced

The Family Section, seniors callout, and schema hardening can all ship in the same deploy. The scenario landing pages can ship in any order and can be added to the sitemap in batches. The internal linking audit can be done across multiple deploys.

---

## PHASE 5: SEO AND GEO HARDENING
**Duration:** Weeks 18 through 21 (October 13 through November 7, 2026)

### Goals

Execute the full on-page SEO spec (spec 15) and GEO citation spec (spec 16) across the hub and all scenario landing pages. Reconcile the hub's CSS token set against the system design tokens from CLAUDE.md (the PPO Hub currently uses a local token fork). Add the Product schema for individual featured plans. Freshen content with a "2026" update pass. Implement spec 20 KPI tracking (SEO projection and measurement setup).

This phase is also when Option A URL migration (if deferred from Phase 2) would be reconsidered based on 60 to 90 days of post-Phase-2 GSC data.

### Concrete deliverables

1. **Spec 15 full implementation**: Title tag, meta description, H1 through H3 hierarchy, and internal link anchor text finalized per the on-page SEO spec. Title format: "Best PPO Dental Plans 2026: Find Your Fit | CoverCapy" (or whatever spec 15 recommends). Meta description: scenario-first, names 2 to 3 clusters, includes the year. All H2s address clusters 2, 3, 6, 7, 8, and 9 explicitly per spec 03.

2. **Spec 16 GEO answer blocks**: 4 priority GEO answer blocks added to the hub:
   - Cluster 6 (seniors): a self-contained paragraph answering "What standalone dental insurance is best for seniors not on Medicare Advantage?" with Mutual of Omaha named and cited.
   - Cluster 7 (no waiting period): a self-contained paragraph answering "Which PPO dental plan has no waiting period for major work?" with Ameritas and Mutual of Omaha named and cited.
   - Cluster 8 (implants): a self-contained paragraph answering "What dental insurance covers implants in 2026?" with MetLife and Mutual of Omaha named and cited.
   - Cluster 9 (CVS perks): a self-contained paragraph answering "Which dental insurance plan comes with a CVS ExtraCare Plus membership?" with Aetna named and cited. State exclusions noted.
   
   Each block is positioned in the first 30% of the page content (per GEO citation research: 44% of citations come from first 30% of page content per spec 02 section 3.1).

3. **`Product` schema addition** for each of the 8 featured plans (inside the `@graph`): adds structured signals for name, description, brand, offers, and a review aggregate where rating data is available. This is beyond the current ItemList-only approach.

4. **CSS token alignment pass**: Audit the PPO Hub's local token fork against CLAUDE.md canonical tokens. Where values differ only by a few hex digits (e.g., `--deep: #0E3A33` vs system `--teal-night: #082A30`), decide whether to align or document the divergence. If the hub-theme.css file is the shared external stylesheet used by the DI Hub, update the hub to load hub-theme.css and remove the local `:root` block, replacing local token names with hub-theme token names in all CSS rules. This is a significant refactor and should be tested carefully.

5. **"2026" freshness pass**: Update `dateModified` in all Article schema, the meta pills ("June 2026" becomes the current date), and the comparison table caption to reflect the current verification date. Schedule this pass to coincide with any real plan data changes that occur mid-year.

6. **Spec 20 KPI dashboard setup**: Configure the tracking infrastructure for the metrics defined in spec 20: organic impressions and clicks on the hub URL, average position for the top 20 queries, GEO citation tracking method (manual spot-check of ChatGPT and Perplexity responses to the 4 priority clusters), share event tracking (if analytics permits), and verify-CTA click tracking (if GA4 event tagging is in place).

7. **Option A reconsideration (if deferred)**: Review 60 to 90 days of post-Phase-2 GSC data for `/compare-ppo-dental-plans`. If the page's ranking positions have not materially changed, and the hub at `/dental-insurance/ppo-plans/` is establishing its own authority, proceed with Option A migration in this phase. Otherwise defer to Phase 6 or indefinitely.

### Specs feeding this phase

Spec 02 (competitor and GEO audit: what signals matter), spec 03 (keyword and entity map, GEO question phrasings), spec 15 (on-page SEO spec: the full output of this spec drives this phase), spec 16 (GEO and AI citation spec: answer blocks and entity seeding), spec 20 (SEO projection and KPI spec).

### Dependencies

Phase 4 complete. Spec 15 and spec 16 must be complete (Wave 2 outputs). Spec 20 must be complete for the KPI tracking setup.

### Owners

| Deliverable | Owner |
|---|---|
| Title/meta/H-hierarchy finalization | SEO |
| GEO answer blocks (4) | Content + SEO |
| Product schema addition | Webmaster |
| CSS token alignment | Sitebuilder |
| Freshness pass | Content |
| KPI dashboard setup | Webmaster + SEO |
| Option A reconsideration | Webmaster + user sign-off |

### Acceptance criteria (GO/NO-GO gate E)

- Screaming Frog or equivalent crawl of the hub confirms: title tag contains primary keyword, meta description is under 160 characters and scenario-first, H1 is unique across the domain, H2 count is 6 to 10, no orphaned pages in the `/guides/` path.
- All 4 GEO answer blocks are positioned within the first 40% of the center column content.
- Rich Results Test passes after Product schema addition.
- CSS token alignment: if hub-theme.css migration was done, test visually across viewport sizes. No visual regressions on the plan story cards, verify band, or comparison table.
- Spec 20 tracking: at minimum, GSC impressions/clicks report is being reviewed on a weekly cadence.

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| CSS token refactor causes visual regression | Medium | High: cosmetic defect on a commercial page | Build and test on a staging branch or a local preview before merging. If hub-theme.css does not exist or is shared with other pages that should not be changed, do NOT do the full refactor in this phase; instead document the divergence and defer. |
| Product schema rejected by Google as not applicable to an "educational marketplace" (CoverCapy is not the seller) | Low | Low: no negative signal, schema simply not surfaced as rich result | Use `offers` pointing to the carrier's enrollment URL; note CoverCapy as publisher not seller. Schema.org allows this pattern for informational pages about products. |
| GEO citation spot-checks require time outside of normal workflow | Low | Low | Assign one session per week (30 minutes) to manually query ChatGPT and Perplexity with the 4 priority cluster phrasings and note whether CoverCapy is cited. |

### Incremental vs. sequenced

The title/meta/H-hierarchy changes, GEO answer blocks, and freshness pass can ship in a single commit. The Product schema addition and CSS token alignment can follow in subsequent commits. The Option A migration (if it happens) is a separate deploy with its own monitoring window.

---

## PHASE 6: CONTENT EXPANSION (SCENARIO SILO COMPLETION), MEASUREMENT, AND ITERATION
**Duration:** Weeks 22 through 26 (November 10 through December 31, 2026)

### Goals

Complete the scenario content silo: any remaining scenario landing pages not shipped in Phases 3 and 4. Publish the spec 12 conversion psychology improvements. Implement spec 13 retention and engagement features (return triggers, email save, bookmark CTA). Execute the first formal measurement review against spec 20 KPIs and baseline. Iterate on the hub content based on GSC query data that has accumulated since Phase 2 launch. Evaluate whether the Delta Dental feature needs its own scenario page as a T3.5-level hub. Prepare for a January 2027 freshness update and annual plan data review.

### Concrete deliverables

1. **Conversion psychology pass (spec 12)**: Apply the behavioral-economics conversion levers from spec 12 to the hub. Specifically:
   - "Dollar example" copy added to every plan story card where it was not done in Phase 2 (per spec 09 finding: personas need real-money examples, not just percentages).
   - "Limitation-first" framing verified on every plan story (constraint disclosed before benefit, per spec 09 finding).
   - Trust module: "About CoverCapy" block confirming CoverCapy is an independent educational marketplace, not an insurer. Positioned in the right rail or as a footer note near the editorial disclosure. Privacy statement: one sentence confirming data is not sold.
   - Terminology anchor block: a plain-language definitions callout ("What does major mean? What is a waiting period?") positioned above the first plan story card.

2. **Retention and engagement features (spec 13)**:
   - "Bookmark for later" CTA in the right rail R5 block (already designed in spec 10; implement the real functionality).
   - Return trigger: a "Come back when you're ready" soft CTA with optional email capture at the bottom of the scenario finder answer block. Minimum viable: a `mailto:` link pre-addressed to the user's own email with the scenario summary. No account creation required.
   - "Last updated" freshness signal on the hub and all scenario landing pages: visible date updated on each content refresh.

3. **Spec 12 share mechanic finalization**: The "send to partner/spouse" CTA (built in Phase 3) is tested and refined based on usage patterns if analytics capture click events. Add a shareable scenario summary URL via hash: e.g., `#scenario=braces-kid` pre-selects the scenario finder so a shared link opens with the relevant scenario highlighted.

4. **Remaining scenario silo pages** (any not shipped in Phase 3 or 4): Typically the lowest-priority clusters (Clusters 10, 12, 13, 14) if not yet built. Each follows the same pattern: GEO answer block, SSOT-sourced plan facts, internal links per spec 17.

5. **Delta Dental scenario assessment**: Based on Phase 3 and 4 scenario landing page performance, evaluate whether "adult braces / Delta Dental" and "kids braces / Guardian" warrant their own T3.5 hub pages under `/dental-insurance/ppo-plans/` or whether the scenario landing pages built in Phase 3 and 4 are sufficient. Decision recorded in `00-MASTER-CONSOLE.md`.

6. **Formal measurement review (Month 3 check-in and Month 6 final)**: At week 22 (approximately 3 months post-Phase-2 launch) and at week 26 (6 months), produce a measurement report against spec 20 KPIs. At minimum:
   - Organic impressions and clicks on the hub URL vs Phase 1 baseline.
   - Average position for the top 20 queries vs Phase 1 baseline.
   - Any new queries ranking in positions 1 through 10 for which there was no prior ranking.
   - GEO citation check: is CoverCapy cited in ChatGPT, Perplexity, or Google AI Overviews for any of the 4 priority clusters?
   - Conversion: did verify-CTA clicks and find-my-dentist traffic from the hub increase?

7. **January 2027 freshness update brief**: Prepare a brief for the annual plan data review. All 8 plan SSOTs must be re-verified against carrier sources in January 2027. Any plan data that changed (premium, waiting period, coverage %, network size) must be updated in: the hub HTML, the compare page JSON, the scenario landing pages, and the individual plan pages. The brief is a checklist, not an execution; execution happens in January.

### Specs feeding this phase

Spec 12 (conversion psychology), spec 13 (retention and engagement), spec 17 (silo completion), spec 20 (KPI measurement and SEO projection).

### Dependencies

Phases 3 and 4 complete. Spec 12 and spec 13 must be complete (Wave 2 outputs). At least 60 days of post-Phase-2 GSC data must be available for the measurement review.

### Owners

| Deliverable | Owner |
|---|---|
| Conversion psychology pass | Content + UX |
| Trust module | Content |
| Terminology anchor | Content |
| Retention features | Sitebuilder + UX |
| Share mechanic URL hash | Sitebuilder |
| Remaining scenario pages | Content + SEO |
| Delta Dental scenario assessment | SEO |
| Measurement review report | SEO |
| January 2027 freshness brief | Content + SEO |

### Acceptance criteria (Phase 6 close)

- Every plan story card has at least one dollar-amount example (e.g., "For a $1,500 crown in year one, this plan pays approximately $300 (20%), leaving you roughly $1,200 before the annual maximum").
- The trust module is live on the hub.
- The terminology anchor block is visible above the first plan story card.
- The measurement report at week 26 documents impressions, clicks, and position for the top 20 queries. If organic impressions on the hub URL have not increased from the Phase 1 baseline after 3 months, the SEO owner must identify the cause (indexation delay, competition, content gap) and propose a corrective action.
- The January 2027 freshness brief is written and stored in `research/ppo-hub-rebuild/`.

### Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| GEO citations not materializing after 6 months | Medium | Medium | Accelerate earned-media distribution: publish a brief on LinkedIn or a dental industry newsletter citing the CoverCapy GEO answer blocks. Per spec 02 section 3.1: earned media increases AI citations up to 325% vs owned-only. |
| Scenario landing pages not indexed within 4 weeks of publication | Low | Medium | Request indexing in GSC URL Inspection tool for each page on the day of deploy. Check Coverage report at 14 days. |
| Phase 6 scope increases as team identifies new iteration opportunities | High | Low | Gate all new work through the spec 20 KPI review. Only pursue new work if Phase 2 through 5 goals are already met. |

### Incremental vs. sequenced

Every Phase 6 deliverable can ship incrementally. The measurement review at week 22 is a decision point: if the hub is not indexing or ranking as expected, Phase 6 may pivot to a remediation sprint rather than new content expansion.

---

## CRITICAL PATH

The sequence of items where delay in one directly delays the program:

```
Phase 1: FLAG-03 resolved (Option A or B)
    |
    v
Phase 2: hub HTML rebuilt + deployed + monitoring window (14 days)
    |
    v
Phase 3: left rail JS + scenario landing pages batch 1
    |
    v
Phase 4: family section + spec 07 verification items + schema hardening
    |
    v
Phase 5: spec 15 full SEO implementation + GEO answer blocks
    |
    v
Phase 6: measurement review + iteration
```

The following are NOT on the critical path and can be done in parallel with the phase preceding them:
- SSOT reconciliation memo (can run in parallel with Phase 1 flag decisions)
- Spec 16 GEO answer block drafting (can run in parallel with Phase 3)
- Spec 12 and spec 13 content briefs (can be drafted during Phase 4)
- Scenario landing pages batch 2 (Phase 4) can begin drafting during Phase 3

The single longest-lead-time item is the compare page SSOT data correction and carrier verification work. It can hold up Phase 2 if not done. Start it in Week 1 of Phase 1.

---

## RACI OWNERSHIP TABLE

**R = Responsible (does the work)**
**A = Accountable (approves the output)**
**C = Consulted (provides input)**
**I = Informed (receives status)**

| Deliverable | Sitebuilder | Webmaster | SEO | Content | UX | QA | User |
|---|---|---|---|---|---|---|---|
| GSC baseline + backlink audit | I | R | C | I | I | I | A |
| FLAG-01 through FLAG-07 decisions | I | R | C | I | I | I | A |
| SSOT reconciliation memo | I | I | C | R | I | I | A |
| Hub HTML rebuild (ppo-plans/index.html) | R | C | C | C | C | I | A |
| Compare page JSON corrections | R | I | I | A | I | C | I |
| vercel.json 301 changes | C | R | I | I | I | C | A |
| Sitemap updates | I | R | C | I | I | I | I |
| Plan story content verification | I | I | C | R | I | C | I |
| Schema graph build | C | R | C | I | I | C | I |
| QA: plan facts vs SSOTs | I | I | C | C | I | R | A |
| Left rail JS + interactions | R | I | I | I | C | C | I |
| Right rail content blocks | R | I | I | R | C | C | I |
| Mobile sticky bar | R | I | I | I | C | C | I |
| Scenario landing pages (all batches) | C | I | R | R | I | C | I |
| Family Section HTML + copy | R | I | I | R | C | C | A |
| Family Section carrier verification | I | I | C | R | I | I | A |
| Seniors callout + 65+ expansion | I | I | C | R | I | I | I |
| Schema hardening (Product, HowTo, graph) | C | R | C | I | I | C | I |
| Spec 15 SEO implementation | C | I | R | A | I | I | I |
| GEO answer blocks (4 priority) | I | I | R | R | I | I | I |
| CSS token alignment | R | I | I | I | C | C | A |
| Freshness pass | I | I | C | R | I | I | I |
| KPI dashboard setup | I | R | R | I | I | I | A |
| Conversion psychology pass | C | I | C | R | R | C | I |
| Trust module | C | I | I | R | C | C | A |
| Retention features | R | I | I | C | R | C | I |
| Measurement review report | I | I | R | C | I | I | A |
| January 2027 freshness brief | I | I | R | R | I | I | A |

---

## GO/NO-GO GATE SUMMARY

| Gate | Phase boundary | Decision required | Who approves |
|---|---|---|---|
| Gate A | End of Phase 1 / Start of Phase 2 | FLAG-03 (Option A or B URL migration) must be signed off. SSOT reconciliation memo must be complete. | User |
| Gate B | End of Phase 2 build / Deploy to production | QA sign-off on all 8 plan facts vs SSOTs. No em-dashes. Canonical and sitemap correct. 301 chains tested (Option A). | QA + User |
| Gate C | End of Phase 3 build / Deploy interactive layer | All interactive elements tested cross-browser. 4 Phase 3 scenario landing pages live and in sitemap. Accessibility checklist passed. | QA |
| Gate D | End of Phase 4 / Schema and family content deploy | Family Section carrier verifications resolved or noted. Schema graph passes Rich Results Test. 8 Phase 4 scenario pages live. | QA + User |
| Gate E | End of Phase 5 / SEO hardening deploy | Screaming Frog crawl confirms title/meta/H-hierarchy. GEO answer blocks positioned in first 40% of content. KPI tracking active. | SEO + User |
| Final close | End of Phase 6 | Measurement report written. Week 26 KPI review complete. January 2027 brief written. | SEO + User |

---

## WHAT CAN SHIP INCREMENTALLY VS. WHAT MUST BE SEQUENCED

### Must be sequenced (do not ship out of order)

1. FLAG-03 decision (Phase 1) must precede any compare page or vercel.json changes (Phase 2).
2. Hub HTML base (Phase 2) must precede the interactive JS layer (Phase 3) because the IntersectionObserver targets must exist in the DOM.
3. Carrier verification items (spec 07 section 5) must be resolved before the Family Section makes quantitative claims about family deductible caps or family pricing discounts.
4. Schema graph structure (Phase 4) must replace the 4 separate script blocks atomically; do not add some schema nodes in Phase 2 and the rest in Phase 4 without a plan to consolidate, as partial changes could create schema parse errors.
5. Option A URL migration (if chosen) must ship simultaneously with the updated vercel.json, the new compare page at its new URL, and the old compare page redirect. Not in separate deploys.

### Can ship incrementally (order flexible)

- SSOT reconciliation memo can be done in any order within Phase 1.
- Scenario landing pages (Phases 3 and 4) can ship in any order and do not depend on each other.
- Right rail content blocks (R2, R3, R4, R5) can ship in separate commits.
- CSS token alignment (Phase 5) is independent of GEO answer blocks.
- Conversion psychology pass (Phase 6) items can ship one by one.
- Freshness passes can happen at any time a plan fact changes.
- The measurement report at week 22 is informational; it does not block any deliverable.

---

## DEPLOYMENT MECHANICS REMINDER

This site is static HTML on Vercel. Every deploy is a `git push origin main` from the user's Mac. The generator (`seo-build/generate-plans.js`) produces the `/dental/` tier pages and does not touch the `/dental-insurance/` content pages; the PPO hub rebuild is hand-edited HTML, not generator output.

The agent cannot push to git. All git commands (`git add -A`, `git commit -m "..."`, `git push`) must be executed by the user from Mac Terminal after reviewing the changes.

For large phases (Phase 2 in particular), use separate branches and review diffs before merging to main to reduce the risk of shipping a file with a data error. A typical workflow:
```
git checkout -b phase-2-hub-rebuild
# sitebuilder makes changes
git add -A
git commit -m "feat: hub rebuild phase 2"
git push origin phase-2-hub-rebuild
# user reviews diff on GitHub
git checkout main
git merge phase-2-hub-rebuild
git push origin main
# Vercel auto-deploys in about 2 minutes
```

No build step runs on Vercel. Files in the `/dental-insurance/` path are served directly as static HTML.

---

## TIMELINE SUMMARY

| Phase | Weeks | Dates (2026) | Primary output |
|---|---|---|---|
| 1: Foundation and IA | 1 to 3 | Jul 1 to Jul 18 | Decisions, baselines, SSOT reconciliation |
| 2: Hub MVP | 4 to 8 | Jul 21 to Aug 15 | Rebuilt hub HTML live |
| 3: Widgets and rails | 9 to 12 | Aug 18 to Sep 12 | Interactive layer + 4 scenario pages |
| 4: Family, seniors, schema | 13 to 17 | Sep 15 to Oct 10 | Family section + 8 scenario pages + schema hardening |
| 5: SEO and GEO hardening | 18 to 21 | Oct 13 to Nov 7 | Full SEO spec + 4 GEO answer blocks |
| 6: Content expansion + measurement | 22 to 26 | Nov 10 to Dec 31 | Silo complete + KPI review + January 2027 brief |

---

*Spec 19 of 20 | PPO Plans Hub Rebuild Program | CoverCapy | 2026-06-26*
*Planning only. No production changes until all 20 specs plus the master console are complete and the user approves.*
*No em-dashes used in this document.*
