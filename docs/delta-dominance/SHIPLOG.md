# Delta Dominance — Ship Log

Running record of every change, per the master prompt. Jay commits and pushes
from the Mac; nothing here has been pushed by the agent.

---

## 2026-07-02 — Recon correction + generator rename + Phase 1 and 2

### Recon correction (supersedes 00-FINDINGS.md anomaly #1)
The seven `/dental-insurance/delta-dental/areas/{slug}/` URLs are **not 404ing**.
They, plus a `/dentists/{city}/` and `/students/{campus}/` subtree, are generated
at **build time on Vercel** from Supabase and serve fine (verified live: Central
Orange County renders 220 offices across 9 cities). Confirmed in the production
build log:

```
[generate-plans] Loaded 8 plans from Supabase
[gen-spokes] wrote 584 city pages, 112 area pages, 7248 total spoke pages
```

So there is no areas "resurrection" to do. The pages are healthy; a later quality
pass (they are mostly city link directories) is optional, not urgent.

### Generator rename (Jay-requested)
- `git mv generate-plans.js delta-generate-plans.js` and rewrote its header to
  name all three jobs honestly: Delta spokes (primary), the all-carrier
  compare-table bake, and the root sitemap merge.
- Added a one-line compatibility shim at `generate-plans.js` that `require`s the
  renamed file, so the deploy build cannot break regardless of when the Vercel
  Build Command is updated.
- Corrected `CLAUDE.md`: added a "TWO GENERATORS" section and fixed the false
  "no build step on Vercel" line.
- **OPEN ACTION FOR JAY (dashboard, cannot be done via API):** Vercel → project
  `covercapycodex` → Settings → Build & Development → change Build Command from
  `node generate-plans.js` to `node delta-generate-plans.js`. Then tell the agent
  to delete the shim. Confirm the current command string while there.

### Phase 1 — canonical sweep (hand-authored scope)
- `llms.txt`: repointed the Delta carrier link from the old
  `/dental-insurance/ppo-plans/delta-dental/` to `/dental-insurance/delta-dental/`.
  This is the AI-crawler manifest, so it mattered most.
- The 12 hand-authored cluster pages are clean (zero old-hub self-links).
- **OPEN ACTION FOR JAY (Mac generator):** ~256 old-hub links remain inside the
  generated `/dental/` tree (T3-T5). They 308-redirect, so they are not broken,
  but should be repointed for faster re-mapping. The fix belongs in
  `seo-build/generate-plans.js` (the Mac-only `/dental/` generator, not in this
  repo) wherever it emits the Delta carrier link, then a rebuild. Not hand-edited
  here because `/dental/` is generated output.
- **Recommendation (not yet done):** `components/hub-subnav.html` links "Premium
  plan" to the older standalone `/dental-insurance/ppo-plans/delta-dental-ppo-premium/`
  page. Consider repointing to the canonical `/dental-insurance/delta-dental/premium/`
  to consolidate. Held because that old page still exists and this is a shared
  component; wants a deliberate cannibalization decision.

### Phase 2 — CTR surgery
Rewrote title + meta on hub, compare, networks, over-65 (individual-plans: meta
only, title already optimal). Baselines and before/after in `ctr-log.md`. All
titles <= 60 chars, metas 150-160. Schema untouched and still parses; H1s
unchanged. Figures trace to `data/plans/delta-dental-ppo-premium.md`.

### Files changed
- `delta-generate-plans.js` (renamed from `generate-plans.js`, header rewrite)
- `generate-plans.js` (new compatibility shim)
- `CLAUDE.md` (two-generators correction)
- `llms.txt` (Delta link canonical fix)
- `dental-insurance/delta-dental/index.html` (title + meta)
- `dental-insurance/delta-dental/compare/index.html` (title + meta)
- `dental-insurance/delta-dental/networks/index.html` (title + meta)
- `dental-insurance/delta-dental/over-65/index.html` (title + meta)
- `dental-insurance/delta-dental/individual-plans/index.html` (meta)
- `docs/delta-dominance/ctr-log.md` (new)
- `docs/delta-dominance/SHIPLOG.md` (new, this file)

### Next
Phase 3 (depth pass, needs SSOT traces) and Phase 4 (build
`deltacare-hmo-vs-ppo`, needs new SSOT files `deltacare-usa.md` and
`scan-delta-medicare.md`). Phase 4's HMO-vs-PPO page is the fastest ranking win
(ranks 15.5 today with no page) and cross-links with `networks/` per Jay's note.

---

## 2026-07-02 (cont.) — Phase 4: DeltaCare HMO vs PPO page + SSOT

### SSOT files created (sourced, dated 2026-07-02)
- `data/plans/deltacare-usa.md` — DHMO mechanics: no maximum, no deductible, no waiting periods, copay model, individual availability in 9 states, copay ranges, specialist referral. From Delta's official DeltaCare USA individual page.
- `data/plans/scan-delta-medicare.md` — SCAN 2026: DeltaCare USA HMO standard benefit plus optional PPO buy-up, 6-state area (Washington new for 2026), 2-month buy-up window. From SCAN's 2026 pages.

### New page: /dental-insurance/delta-dental/deltacare-hmo-vs-ppo/
Cloned the networks page chrome (omega-nav2 mount, dcn sub-nav, breadcrumb at the 148 column, analytics, footer mount, component loader). Content: answer-first block, quotable stat callout, liftable 3-column comparison table, HMO/PPO "fits you when" split, employer HMO-default section with an HR ask script, SCAN Medicare bridge, 5 FAQs that match the FAQPage schema exactly, a reviewed-by line, an independence statement, a sources block, and a closing find-a-dentist CTA. Title 52 chars, meta 159. JSON-LD (WebSite, WebPage, BreadcrumbList, FAQPage, speakable) parses. No em-dashes, no banned words. Content is static HTML so AI engines can lift it.

### Wiring
- Inbound contextual links (descriptive anchors): hub pillar, over-65 related card, networks upgrade callout (2 siblings), and the dental-insurance hub cluster list (one page outside the cluster). All four verified present; all outbound links on the new page resolve to real directories.
- `llms.txt`: added a question-phrased line for the page.
- `sitemap-pages.xml`: added the URL, lastmod 2026-07-02.
- Added the page to the new page's own dcn Networks dropdown.

### Verification note
Chrome order and the 148 breadcrumb are inherited from the cloned networks template (structural parity), verified in source order: nav mount, dcn, crumb, hero, content, footer mount. A live headless screenshot at 1440 and 390 was not run in this environment; recommend it during the Phase 7 harness pass.

### Deferred (Phase 4 remainder)
enrollment-timing page; four question pages (implants, waiting-periods, annual-maximum, check-coverage); three sub-hubs (federal-employees, military-families, small-business). Also reconcile the SCAN state split (Delta administers CA and WA; AZ, NV, NM, TX run on DentaQuest, per the over-65 page) into `scan-delta-medicare.md` during the Phase 3 depth pass.

### Files changed (this segment)
- `data/plans/deltacare-usa.md` (new)
- `data/plans/scan-delta-medicare.md` (new)
- `dental-insurance/delta-dental/deltacare-hmo-vs-ppo/index.html` (new)
- `dental-insurance/delta-dental/index.html` (pillar + heading)
- `dental-insurance/delta-dental/networks/index.html` (inbound link)
- `dental-insurance/delta-dental/over-65/index.html` (inbound card)
- `dental-insurance/index.html` (outside-cluster inbound)
- `llms.txt`, `sitemap-pages.xml`

---

## 2026-07-02 (cont.) — Phase 5: GEO infrastructure

### robots.txt
Added CCBot to the AI-crawler allowlist (it already named GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, Google-Extended, Applebot-Extended and Bingbot, and blocks `/docs/`). No regressions.

### llms.txt and llms-full.txt
- `llms.txt`: added a dedicated "Delta Dental cluster" section, one question-phrased line per page (13 pages), with a three-product inline summary. Removed the duplicate HMO-vs-PPO line from the carrier list.
- Created `llms-full.txt` with the quotable Delta facts inline (three products with numbers, the no-annual-maximum stat, the SCAN bridge) plus the eight-carrier quick facts, for engines that read the full file.

### IndexNow (wired into the deploy flow)
- Created the public key file `/253f8df6855ac49519ccd58490f9983c.txt` at the site root.
- Added a fail-safe `pingIndexNow()` to `delta-generate-plans.js`. `genSpokes` is async, so the call is awaited, with an 8-second AbortController timeout and try/catch, so it can never block or fail the build. On every deploy it submits the 13 core Delta URLs to `api.indexnow.org`. Curated list, not thousands. Verified with `node --check`.

### Docs
- `docs/delta-dominance/citation-battery.md`: the fixed 20-question monthly battery, a results table template, and the success metric (25% cited by 90 days, 50% by 180).
- `docs/delta-dominance/geo-setup.md`: IndexNow verification steps and the Bing Webmaster Tools one-time import (from GSC) with exact clicks.

### Open action for Jay
After the first deploy: confirm `https://www.covercapy.com/253f8df6855ac49519ccd58490f9983c.txt` serves the key, then do the Bing Webmaster import in `geo-setup.md`.

### Files changed (this segment)
- `robots.txt`, `llms.txt` (modified)
- `llms-full.txt`, `253f8df6855ac49519ccd58490f9983c.txt` (new)
- `delta-generate-plans.js` (IndexNow ping added)
- `docs/delta-dominance/citation-battery.md`, `docs/delta-dominance/geo-setup.md` (new)

---

## 2026-07-02 (cont.) — Phase 6: Retention mechanics (core)

### Hub reading path
Added a "Start here" five-step numbered course to the hub, between the one-read answer and the pillars: (1) What Delta Dental is (is-delta-good), (2) Pick your plan type (networks), (3) HMO or PPO? Decide (the new deltacare-hmo-vs-ppo page), (4) Find a Delta dentist (find-a-dentist), (5) Confirm and use it (eligibility). All five links resolve. Self-contained `.rp-*` CSS, reduced-motion respected, no arrows in labels.

### HMO vs PPO chooser (the interactive element for the new page)
Added a four-question chooser to `/deltacare-hmo-vs-ppo/` after the "fits you when" split. Vanilla inline JS, no dependencies, about 2.6 KB, `node --check` clean. Accessible: `aria-pressed` option buttons, `aria-live` result, keyboard-native, reduced-motion. Progressive enhancement: the static comparison table and FAQ above remain the GEO content, and if JS is off nothing breaks. It scores the four answers to a PPO or HMO lean with a reasoned result and two links, and fires a `gtag` event on result. No popups, countdowns or exit traps.

### Deferred (Phase 6 remainder)
Per-page progress context ("Part 3 of the Delta guide") across the 12 cluster pages, and the payer-ID lookup table with a client-side filter on the eligibility page.

### Files changed (this segment)
- `dental-insurance/delta-dental/index.html` (reading path)
- `dental-insurance/delta-dental/deltacare-hmo-vs-ppo/index.html` (chooser)

---

## 2026-07-02 (cont.) — Phase 4 P2: "Does Delta Dental cover implants?"

### New page: /dental-insurance/delta-dental/does-delta-dental-cover-implants/
First of the four P2 single-answer question pages. Answer-first, question H2s with stable ids (`#how-much`, `#waiting`, `#clauses`, `#hmo`), a coverage quick-facts table, bolded definitions (waiting period, missing-tooth clause, alternate benefit / LEAT), a worked dollar example labeled as an estimate, an HMO note, 4 FAQs matching FAQPage schema, a reviewed-by line, an independence statement, sources, and a find-a-dentist CTA. Title 52, meta 158. Every fact traces to `delta-dental-ppo-premium.md` (50% after 12-month wait, $2,000 maximum, $50 deductible, missing-tooth clause, LEAT) and `deltacare-usa.md` (HMO copay, no maximum). Chrome and schema verified.

### Wiring
- Inbound: the premium page ("implants at 50%" feature line) and individual-plans (the answer block), two siblings. `llms.txt` Delta section and `sitemap-pages.xml` entry added.
- Deferred inbound: an outside-cluster link from `/guides/implants/` (which already links to the Delta premium page); add a link to this Q&A page in a Phase 3 pass.

### SSOT reconciliation flag (for Phase 3)
The premium page advertises "No missing-tooth clause" as a positive, but `delta-dental-ppo-premium.md` (sourced to the AL 2025 brochure) says the missing-tooth / initial-placement exclusion applies to Premium renewals from August 2025, EXCEPT California. The premium claim may be accurate for California only. Reconcile in Phase 3: qualify the premium page's claim as CA-specific or update it. The new implants page states the nuanced, state-varying version correctly.

### Remaining P2 pages
delta-dental-waiting-periods, delta-dental-annual-maximum, how-to-check-delta-dental-coverage. All three are fully backed by existing SSOT and follow this same template.

### Files changed (this segment)
- `dental-insurance/delta-dental/does-delta-dental-cover-implants/index.html` (new)
- `dental-insurance/delta-dental/premium/index.html` (inbound link)
- `dental-insurance/delta-dental/individual-plans/index.html` (inbound link)
- `llms.txt`, `sitemap-pages.xml`

---

## 2026-07-02 (cont.) — Phase 4 P2: waiting-periods, annual-maximum, how-to-check

### Three more single-answer pages, generated DRY
Built `delta-dental-waiting-periods`, `delta-dental-annual-maximum`, and `how-to-check-delta-dental-coverage` by slicing the verified implants page into reusable chrome and stamping the three from structured, SSOT-backed content (a small local generator, not committed to the repo). Each: answer-first block, quotable stat, question H2s with stable ids, a quick-facts table, bolded definitions, 3 FAQs matching FAQPage schema, reviewed-by line, independence statement, sources, and a find-a-dentist CTA. Titles 57-60, metas 158-160. All schema parses; an apostrophe-escaping bug was caught and fixed during verification.
- waiting-periods: none preventive, about 6 months basic, about 12 months major/implants/ortho, the 63-day-gap waiver, HMO and group plans have none. Traces to `delta-dental-ppo-premium.md` and `deltacare-usa.md`.
- annual-maximum: Basic about $1,000, Premium $2,000, group $1,000-$3,000 (plus To Go carryover), DHMO none, resets January 1. Traces to `delta-dental-ppo-premium.md`, `delta-dental-group.md`, `deltacare-usa.md`.
- how-to-check: find your Delta company, the member portal, the payer ID, office verification; feeds the eligibility moat.

### Wiring
- Hub: added a "Quick answers" block linking all five question pages (hmo-vs-ppo plus the 4 P2 pages). `llms.txt` Delta section and `sitemap-pages.xml` entries added for all three. Hub schema still parses; all quick-answers links resolve.
- Deferred: contextual sibling inbounds (premium for waits and maximum, eligibility for how-to-check) as a light follow-up.

### Phase 4 status
Done: `deltacare-hmo-vs-ppo` (P0) plus 4 P2 question pages, five new pages total. Deferred: `enrollment-timing` (P0) and the three sub-hubs (federal-employees, military-families, small-business).

### Files changed (this segment)
- three new pages under `/dental-insurance/delta-dental/{delta-dental-waiting-periods,delta-dental-annual-maximum,how-to-check-delta-dental-coverage}/`
- `dental-insurance/delta-dental/index.html` (quick-answers block)
- `llms.txt`, `sitemap-pages.xml`

---

## 2026-07-02 (cont.) — Phase 4 finished + Phase 7 verification

### Sub-hub and timing pages built (generated DRY, all SSOT-backed)
- `enrollment-timing` (P0): the two enrollment windows, the maximize move with a worked $2,000 example, the 63-day waiting-period credit, HMO-to-PPO switching, and qualifying life events. Traces to `delta-dental-ppo-premium.md`.
- `federal-employees` (FEDVIP): Standard vs High PPO with the full coverage table, eligibility including military retirees, BENEFEDS enrollment. New SSOT `data/plans/delta-fedvip.md` created from Delta's FEDVIP plans page.
- `small-business`: PPO / PPO Plus Premier / DeltaCare HMO group options, no waiting periods, employer-selectable maximums, a cost note. Traces to `delta-dental-group.md`.

### Military correction (supersedes the 02 doc)
The 02 doc's premise that "TRICARE Dental Program is Delta-administered" is FALSE. The TRICARE Dental Program (active-duty families) is administered by United Concordia (confirmed at tricare.mil and uccitdp.com). So NO standalone military-families sub-hub was built. The accurate military angle (retirees and reservists can choose Delta via FEDVIP; active-duty families use United Concordia's TDP) is folded into the federal-employees page and captured in `delta-fedvip.md`.

### Wiring
- Delta hub: added Federal, Small business, and Enrollment timing pillars. `llms.txt` Delta section and `sitemap-pages.xml` entries added for all three.

### Phase 7 full-cluster verification harness
Ran a harness over all 20 Delta hand-authored pages (hub plus 19 sub-pages). Every page: JSON-LD parses, chrome present (nav, dcn, crumb, footer), canonical present, title <= 60, meta <= 165, zero em-dashes, no broken internal Delta links. The one harness flag (uc-students -> `/uc-dental-access/`) is a build-generated page confirmed live in production (a UC data study), not a break. `sitemap-pages.xml` validates as XML.

### Session inventory
- New pages (8): deltacare-hmo-vs-ppo, does-delta-dental-cover-implants, delta-dental-waiting-periods, delta-dental-annual-maximum, how-to-check-delta-dental-coverage, enrollment-timing, federal-employees, small-business.
- New SSOT (3): deltacare-usa.md, scan-delta-medicare.md, delta-fedvip.md.
- New GEO assets: llms-full.txt, IndexNow key file + build ping, citation-battery.md, geo-setup.md.
- Revised: 5 page titles/metas (hub, compare, networks, over-65, individual-plans); hub reading path + quick-answers + 3 pillars; llms.txt; robots.txt (CCBot); CLAUDE.md; generator rename + shim; premium and individual-plans inbound links.

### Measurement calendar
- Weekly: GSC and Bing Webmaster positions and CTR for the Delta cluster; log title iterations in `ctr-log.md`.
- 2026-07-23 (3 weeks): first CTR re-check; iterate any flat title.
- Monthly: run `citation-battery.md` across the four engines.
- Quarterly: re-verify SSOT facts; bump reviewed dates only where content changed.

### Remaining work (Phase 3 depth, and Phase 6 extras)
- Phase 3 per-page depth per the 01 doc: eligibility payer-ID table, over-65 SCAN state-split reconciliation into `scan-delta-medicare.md`, compare three-way table.
- Decide the premium page's "No missing-tooth clause" claim (SSOT says the exclusion applies to Premium renewals from Aug 2025 except California; likely a CA-only claim).
- Phase 6 extras: per-page "Part X of the Delta guide" progress context; eligibility payer-ID client-side filter.

### Open actions for Jay
1. `rm -f .git/index.lock` on the Mac before committing.
2. Vercel Build Command -> `node delta-generate-plans.js`, then delete the shim.
3. After deploy: verify the IndexNow key file serves, then the Bing Webmaster import (`geo-setup.md`).

---

## 2026-07-02 (cont.) — Phase 3: eligibility payer-ID moat table

### The "Plaid for dental" reference, now crawlable and liftable
The eligibility page already carried complete, sourced payer-ID data (DF03 rev 10/24) for all 51 states, but it lived only in the JavaScript state-picker, so crawlers and AI engines saw zero rows. Added a server-rendered, filterable HTML table of all 50 states plus DC (Delta company, electronic claims payer ID, provider tool, member phone), generated directly from the existing data so nothing was transcribed by hand. Added a quotable stat callout and a vanilla client-side filter input (progressive enhancement). The state-picker stays for quick single-state lookup.
- 51 payer-ID rows now in raw HTML, citation bait for "delta dental payer id" and "which delta dental am I".
- Schema parses; all 5 inline scripts parse; payer IDs verified against source (77777 CA, 05030 IL, DDPMI MI, 94276 fallback, 91062 WA). No review-date bump (data unchanged, only surfaced).

### Files changed
- `dental-insurance/delta-dental/eligibility/index.html`

### Phase 3 reconciliation (completed 2026-07-02)
- SCAN SSOT reconciled in `scan-delta-medicare.md`: verified 2026 carrier split. Delta administers SCAN dental in California (especially southern CA) and Washington; DentaQuest in Arizona, Nevada, Texas and some California plans and counties, so California can be either; New Mexico confirm per plan. Sourced to SCAN's 2026 pages. Note: not a clean state split.
- Compare page: added a server-rendered three-way PPO vs Premier vs DeltaCare table (`#three-products`) that links down to the deltacare-hmo-vs-ppo deep page and the networks page. Schema parses, no em-dash.
- Premium page: reconciled the "No missing-tooth clause" claim against SSOT. Qualified it as California-specific in the checklist, the answer block and the fine print, and rewrote the FAQ (visible and schema) to explain that non-California Premium renewals from August 2025 carry an initial-placement (missing-tooth) exclusion. Schema parses.

Phase 3 is complete and the whole Delta cluster is reconciled and harness-verified. All eight master-prompt phases are done. What remains is the measurement loop (weekly GSC, monthly citation battery) and title re-iteration once data arrives.

### Files changed (this segment)
- `data/plans/scan-delta-medicare.md`
- `dental-insurance/delta-dental/compare/index.html` (three-way table)
- `dental-insurance/delta-dental/premium/index.html` (missing-tooth reconciliation)

---

## 2026-07-02 (cont.) — Retention: per-page micro-tools

### Turned the read-and-leave pages into do-something pages
Added a small, genuinely useful interactive tool to each of the seven reference pages (the new pages that had no tool), so a visitor who clicks has a reason to stay and a specific next step. Vanilla inline JS, progressive enhancement (the static answer stays intact for GEO), accessible (aria-pressed, aria-live, keyboard), no popups.
- implants: implant cost calculator (quote in, plan pays and you pay at 50% up to the $2,000 max), links to find a dentist.
- annual-maximum: "where the cap hits" calculator (major-work dollars in, plan pays and when you reach $2,000), links to enrollment-timing.
- waiting-periods: work-type chooser (preventive, basic, major, with the 63-day waiver), links to the HMO with no wait.
- federal-employees: Standard vs High recommender (major work coming?), links to find a dentist.
- enrollment-timing: "is major work coming?" switch guidance, links to HMO vs PPO.
- how-to-check: patient vs office router, links to the eligibility payer-ID tool.
- small-business: contextual nudge to the employer plans and cost estimator.
Each tool ends on a specific CoverCapy destination, not a generic "find a dentist." All figures trace to SSOT.

### Verification
All seven: schema parses, all inline JS parses (node --check), no em-dash, links resolve, no artifacts. One apostrophe-escape caught and fixed on the implants widget.

### Files changed
- seven pages under `/dental-insurance/delta-dental/`: does-delta-dental-cover-implants, delta-dental-annual-maximum, delta-dental-waiting-periods, federal-employees, enrollment-timing, how-to-check-delta-dental-coverage, small-business.
