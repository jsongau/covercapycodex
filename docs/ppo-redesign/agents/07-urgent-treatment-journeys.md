# Agent 06 — Urgent-Treatment Patient Journeys

**Workstream:** Urgent-treatment patient specialist
**Design context:** Direction C "Warm Research Terminal" (APPROVED) · 70% spec instrument / 30% concierge guidance
**Sources inspected:**
- Live: `compare-ppo-dental-plans.html` (2,270 lines — Smart Match, glossary, dentist rail, plan JSON)
- Redesign package: `_redesign-package/compare-ppo-dental-plans.html`, `delta-ppo-premium.html` (and 7 sibling plan pages)
- `plan-data/*.md` (9 briefs incl. reconciliation) — missing-tooth / pretreatment language present in all 8 plan briefs
- `05-APPROVED-DESIGN-SYSTEM.md`, `00-MASTER-PROMPT.md`

**Score of the CURRENT live experience for urgent buyers: 6.5 / 10.**
Strong diagnosis layer (it *teaches* an urgent buyer brilliantly) but weak action layer (it doesn't *close the loop* to "see a dentist tomorrow"), and one named concept missing.

---

## 1. The personas and what each one is actually trying to do

| Persona | The real question | The fact that decides their day |
|---|---|---|
| Cracked tooth (emergency) | "Will *anything* pay this week?" | Effective date + Day-1 tier on Basic/Major. Waits are fatal. |
| Crown needed now | "Crown is 'major' — do I wait 12 months?" | Major wait + Year-1 coinsurance + annual max vs ~$1,800 cash. |
| Root canal this month | "Is an RCT basic or major on this plan?" | Tier classification (basic vs major) + that tier's wait. The live page lumps "Crowns / root canals" together — but RCT is often *basic* and crown is *major*. This conflation can mislead. |
| Implant planned soon | "Bought a plan, will it pay the implant?" | **Missing-tooth clause** + implant wait (often 12mo) + Year-1 vs Year-2 step-up. Highest disappointment risk. |
| Cash → insurance switcher | "Cheaper to insure than pay cash right now?" | Net-of-premium math + the realization that *in-progress work isn't covered*. |

Common thread: every one of them is anxiety-driven and time-boxed. They need a single honest answer ("yes day-one / no, you'll wait N months") and an immediate next step, not an editorial essay.

---

## 2. (a) WHAT THE CURRENT LIVE PAGE + ZIP ALREADY DO WELL — DO NOT LOSE THESE

The founder's fear ("the redesign will be too basic / worse") is legitimate. These urgent-buyer affordances already exist and a naive reskin would quietly delete them:

**From the LIVE page (the guidance layer — protect at all costs):**
1. **Emergency-aware Smart Match.** Selecting an emergency goal *disables the timeline chips* with the tooltip "An emergency can't wait" and forces `time=0` (`syncTime()`). This is a genuinely smart, empathetic interaction — the page refuses to let an emergency patient pretend they can wait. **Must survive.**
2. **Day-1 vs wait is rendered per-cell, not buried.** `covCell()` prints `"80%, day one"` (green `flag-now`) vs `"50%, 6-mo wait"` (amber `flag-wait`) — a non-color word always paired with the color. Already AA-compliant by accident. Matrix + cards both carry it.
3. **Cash-cost value framing** (`CASH_COST`: major $1,800, implant $4,500) → "Plan covers $X toward a typical crown. After premium you keep $Y vs cash." This is the exact frame the cash→insurance switcher needs. **Unique to the live page; the ZIP has nothing like it.**
4. **Per-plan `activation` strings** ("Next business day", "1st of next month", "Active within 6 days") — the literal effective-date answer the cracked-tooth user wants.
5. **Glossary tooltips that already define the urgent concepts:** `effective-date`, `day-one`, `waiting-period`, `missing-tooth` ("Request a pretreatment estimate before scheduling implant work on a tooth you lost before the plan started"). The conceptual scaffolding is done.
6. **"Common mistakes" block** explicitly warns about the 12-month-wait trap and the missing-tooth trap — i.e. it pre-empts the two ways an urgent buyer gets burned.
7. **Treatment + life-situation shortcuts** that pre-load Smart Match state, including *"I need a crown this year"* (time:9) and *"I want an implant soon"* (time:3) and *"My benefits start in 90 days"* — urgent intents are first-class entry points.
8. **Dentist rail + verify-the-office modal** ("We email the office for you… until they reply we say 'we'll confirm this for you'") — an honest, working bridge to a real appointment.

**From the ZIP / redesign plan-detail page (the instrument layer — make dominant):**
9. **An explicit "effective date ≠ category eligibility" section** (`delta` L520): *"Your policy effective date (when premiums and preventive cover begin) is not the same as category eligibility (when the plan will pay toward a crown or implant)."* This is the single most important sentence for every urgent persona, and the **ZIP states it better than the live page does.**
10. **A dedicated fine-print block naming the two killers:** `missing-tooth clause` AND `work in progress` ("Treatment started before your effective date — or before a category's waiting period ends — is typically not covered"). The work-in-progress exclusion is exactly the cash→insurance switcher's blind spot, and the live page never names it.
11. **Prior-coverage wait reduction** (FAQ): "Waits can sometimes be reduced with proof of prior continuous coverage — ask the carrier." Directly actionable for the switcher.
12. **Per-treatment "Compare root-canal / emergency / implant plans →" rows** and a realistic first-year crown cost scenario with stated assumptions ("crown classified as major, no missing-tooth reduction, after the 12-month wait").
13. **Verification-status honesty** ("Effective date — Needs verification" badges, "editorial hypothesis until matched to a current official document") — the trust posture an anxious high-spend buyer needs before committing.

> **Net:** the urgent buyer is currently served by a *split* system — the live page diagnoses and matches, the ZIP plan page explains timing and fine print. The redesign's job is to **fuse** them, not pick one. Losing #1–#3 (live) or #9–#11 (ZIP) would make the redesign genuinely worse.

---

## 3. (b) WHERE THE URGENT JOURNEY BREAKS TODAY — WHAT THE REDESIGN MUST ADD

Map the journey: **need → timing → which plans fit → exact tradeoffs → what to verify → buy → find a dentist who takes it now.** Break points:

1. **There is no "buy" step anywhere.** Despite the brand promise *"Get cover today, see a dentist tomorrow,"* neither the live page nor the redesign compare page has a real enrollment/quote handoff. Grep of the redesign compare page returns **zero** enroll/buy CTAs — only "Verify free" (×12+) and find-a-dentist. The live page's "enroll/buy" hits are all glossary/mistakes *prose*, not buttons. For an urgent buyer the loop dead-ends at "verify a dentist" with no way to actually *get covered today*. **This is the #1 break.** The redesign must add an honest, ZIP-and-effective-date-aware **"Check official pricing & enroll →"** step (off-site carrier handoff with affiliate/independence disclosure), sequenced *after* the timing warning so we never sell a 12-month-wait plan to someone needing a crown next week.

2. **"Predetermination" is never named.** The concept exists as advice ("request a pretreatment estimate") but the *labeled term* and a *do-this-now* CTA are absent from every HTML file (grep: 0 hits for "predetermin"). For crown/implant/RCT patients, a predetermination/pretreatment estimate is THE de-risking action. The redesign must add it as a named glossary term **and** as a concrete step in the urgent action block ("Ask the office for a predetermination before you schedule — confirms coverage in writing").

3. **Root-canal tier ambiguity.** Live page bundles "Crowns / root canals" in one Major row, but plan-data classifies RCT variably (basic vs major). An urgent RCT patient can't tell their wait. Redesign must split, or annotate "RCT class — verify."

4. **The day-1 / waiting-period clarity lives in two places that don't talk.** Smart Match (live) shows it on cards; the timeline section (ZIP) shows it on plan pages. There's no single **"Coverage timeline"** instrument on the hub the way the design system's Year-1/Later matrix toggle implies. The approved matrix must carry an explicit **effective-date row + Day-1 column treatment** so an urgent buyer reads timing without leaving the comparison.

5. **Missing-tooth clause is a tooltip, not a filter.** An implant buyer should be able to *filter/flag* plans by missing-tooth risk. Today they must read fine print per plan. Add a missing-tooth flag to implant rows in the matrix.

6. **No "I need care this month" express lane on the hub.** The shortcuts exist but compete with 6 others. Direction C's Smart Match (the 30% lens) should expose a one-tap **"I need treatment now"** path that pre-filters to day-1 / short-wait plans and surfaces the predetermination + verify steps.

7. **Effective-date ≠ activation wording inconsistency.** Live uses `activation` ("next business day"); ZIP uses "effective date" + "category eligibility." Urgent buyers will conflate them. One canonical vocabulary (per the no-data-drift rule): **Effective date** (coverage starts) vs **Category eligibility / waiting period clears** (this tier pays). Use everywhere.

---

## 4. The urgent action block the redesign owes every relevant page (acceptance criteria)

A reusable `.cc-comfort` "If you need treatment soon" module, placed after the coverage timeline, server-rendered:

1. State the plan's **effective date** and the **eligibility date for the user's tier** as two distinct dates.
2. If the needed tier has a wait > user timeline → an honest amber callout ("This plan won't pay toward a crown until ~Month 12. For work this month, compare day-one plans →").
3. Name and link **predetermination** ("Ask the office for a written predetermination first").
4. Surface **missing-tooth** + **work-in-progress** exclusions for implant/replacement intents.
5. **Two ordered actions:** (a) *Check official pricing & enroll →* (off-site, disclosed) then (b) *Find a dentist who takes this plan → / Verify my exact plan free* (the working email-the-office bridge). Per the collision contract, this is one block — it must not stack a second sticky bar over the compare tray.
6. Mr. Bara permitted only as a small reassurance beside the verify CTA (never over prices, the timeline, or exclusions).

---

## 5. Risks
- **Regulatory:** never imply "covered today" for a tiered procedure under a waiting period; the timing warning is a compliance control, not just UX. Honor the master prompt's ban on "misleading 'activation today' language."
- **Data drift:** activation/effective-date strings must come from the one canonical `PLANS` object, not be re-typed per template.
- **Over-promising the buy step:** if there's no real enrollment integration yet, the "enroll" CTA must honestly read "Check official pricing" and disclose the off-site handoff — not fake a checkout.

---

## SUMMARY (≈150 words)

The urgent buyer is currently served by a *split* system, and that is the founder's real exposure: the **live** page already does emergency-aware Smart Match (it disables the timeline for emergencies), per-cell "day one vs N-mo wait" labels, cash-vs-premium value math, per-plan activation strings, and an honest email-the-office verify bridge; the **ZIP** plan pages add the best "effective date ≠ category eligibility" explainer, a missing-tooth + work-in-progress fine-print block, and prior-coverage wait reduction. A careless reskin would delete these — that's how the redesign becomes "worse." The redesign must FUSE both layers and then fix three real breaks: **(1) there is no honest buy/enroll step** (the loop dead-ends at "verify"), **(2) "predetermination" is never named** despite being the key de-risking action, and **(3) day-1/waiting clarity isn't unified into one coverage-timeline instrument** on the hub.

**Current experience score: 6.5 / 10.**

**Top 3 recommendations**
1. **Add the honest action loop:** a sequenced "If you need treatment soon" block ending in *Check official pricing & enroll →* (disclosed off-site) then *Find/verify a dentist →*, gated by an amber timing warning so no urgent buyer is sold a 12-month-wait plan.
2. **Name and ship "predetermination"** as a glossary term + a concrete CTA, and surface missing-tooth / work-in-progress exclusions as flags (not just tooltips) on implant rows.
3. **Unify day-1 vs waiting period into one coverage-timeline instrument** with an explicit effective-date row and Day-1 treatment in the matrix, carry the live page's emergency-aware Smart Match and cash-cost value framing across, and split/annotate the root-canal tier so RCT patients can read their wait.
