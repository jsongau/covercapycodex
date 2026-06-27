# 13 — Conversion Critique
## PPO Hub Rebuild — Phase 2.5
### CoverCapy | June 26, 2026

---

## Governing lens

The dominant emotional mode on this page is anxious uncertainty, not desire. Visitors arrive knowing they need dental coverage but not which plan to trust or whether their dentist even accepts it. The conversion levers that work are: (1) reduce uncertainty faster than any competing page, (2) give one clear next action per scroll zone, and (3) make the recommendation feel personal enough to forward to a partner or parent.

The hub does most of this well. The scenario-first entry, the limitation-first vignettes, and the honest skip-it blocks are all correct choices. The leaks are architectural: too many exits from the funnel before the recommendation lands, a share mechanic that fires too late and frames sharing as a generic link rather than a personal recommendation, and verify bands that repeat the same CTA copy without connecting it to the visitor's scenario.

---

## Funnel map and leak audit

### Zone 1: Hero (lines 399-424)
**Single primary action per zone:** Currently two: "Find my plan" and "Compare all eight." The two-CTA rule is correct, but the secondary CTA ("Compare all eight") points to the comparison table, which is a browse path, not a decision path. Browsers who click it are likely to leave without completing the scenario finder. The hero also leads with the plan count and price range before naming a single anxious scenario. The lede is accurate but opens with description ("Eight independently reviewed PPO dental plans, matched to your coverage need") rather than situation recognition ("Your employer dental ended last month" or "The orthodontist said braces in about a year").

**Leak:** Visitors who do not recognize themselves in the lede scroll past or bounce. The chooser widget below the CTA row partially fixes this, but it requires reading past the lede, the meta pills, the label, and four buttons before the visitor feels seen.

### Zone 2: Scenario finder (lines 440-529)
**Single primary action per zone:** The two-step structure is correct. The leak is the timing in Step 2. After selecting a chip, Step 2 slides in smoothly, which is good. But the timing buttons ("Right now (days to weeks)," "In 3 to 6 months," "Next year or later") are functional labels, not emotionally resonant ones. The spec's "implementation intention elicitation" value is present in the intent but the wording is clinical. "My dentist already said go" is more anxiety-matching than "Right now (days to weeks)."

A second leak: after the answer renders, the primary CTA inside the answer block reads "Read the full plan story," which sends the visitor 1,500 pixels down the page to a tour stop they can already see the top of. The next action should resolve uncertainty, not continue browsing. "Verify my dentist takes this plan" should be the primary CTA inside the answer block, not the secondary.

**Leak:** CTA hierarchy inside the answer block is inverted. The browse action ("Read the full plan story") is primary teal; the conversion action ("Verify my dentist") is secondary outline.

### Zone 3: Plan stories (lines 532-787)
**Single primary action per zone:** Each tour stop has two CTAs in the panel: "Verify my dentist" (primary teal) and "Read the full [plan name] review" (secondary outline). This is correct. The leak here is not the CTA hierarchy, it is the absence of dollar anchoring before the CTA. The vignettes are excellent scenario-first copy, but the panel immediately jumps to the CTA without the cash-cost anchor the spec calls for. A visitor scanning a panel does not yet know what a crown costs without insurance. Without that anchor, the premium feels like a cost rather than an offset.

The match-bar mechanic ("Matches your situation" / "Not your best match") is a strong persuasion element, but it only activates after the scenario finder is completed. Visitors who scroll directly from the hero to the plan stories (a likely behavior for returners) never see the match state. A persistent match indicator or the filter pills as an alternative activation path would close this gap.

**Leak:** Dollar-cost anchor is missing from the quick-facts panel, reducing the premium-to-savings mental math that makes the "Verify my dentist" CTA feel urgent.

### Zone 4: First verify band (lines 789-800)
**Single primary action per zone:** One CTA (the search form) with a secondary link to the comparison page. Correct structure. The leak is the headline copy: "The step everyone skips, and we will not let you." This is honest and assertive but it is a process claim, not a situation claim. It does not connect to what the visitor just read. For a visitor who just completed the scenario finder and got a Guardian recommendation, the verify band should echo that recommendation: "Before you commit to Guardian, confirm your dentist is in-network." A static band that does not know what the visitor just did is a missed echo.

The input placeholder ("Enter your dentist's name or city") is generic. After a scenario selection, the placeholder should read "Find a Guardian PPO dentist" or "Search 6,400+ offices."

**Leak:** The verify band ignores sessionStorage scenario data and repeats the same copy as the second verify band below, making both feel like boilerplate rather than contextual nudges.

### Zone 5: Comparison table and best-for grid (lines 802-924)
**Single primary action per zone:** The comparison table ends with two CTAs: "Compare plans interactively" (primary) and "Find a dentist who takes this plan" (secondary). The primary action here should be "Find a dentist" because at this depth in the page, a visitor who has read 8 plan stories and the comparison table has enough information to make a decision. Sending them to another comparison page restarts the funnel.

The best-for grid is excellent for SEO and for visitors arriving via specific queries ("dental insurance for seniors," etc.). Each card links to the plan review, not to the verify flow. Adding a second micro-link under "Read the [carrier] review" that says "Verify a dentist who takes this" would add a direct conversion exit without cluttering the card.

**Leak:** Late-funnel CTAs still point to more information rather than to verification.

### Zone 6: Second verify band (lines 933-945)
**Single primary action per zone:** Correct. One form, one link secondary. The copy is slightly stronger: "You have walked the shelf. Before you commit, run the one check the rest of the industry skips." Good. Still not scenario-aware. Same leak as band one.

### Zone 7: Share strip (lines 973-984)
**Single primary action per zone:** Three share actions (copy, email, native). This is where the share mechanic breaks down. The strip label reads "Share this guide with your family," which is generic and passive. It appears after the FAQ, well below where most visitors have made a mental decision. It offers no reason to share: no exclusive insight framed for forwarding, no summary of what the recipient will get, no social proof about why this beats a Google search.

The email share body, built in `buildShareText()`, pulls the scenario recommendation from sessionStorage. This is correct behavior. But it only fires if the visitor used the scenario finder. Visitors who browsed without using the finder get the generic fallback: "CoverCapy compares 8 PPO dental plans and matches you to the right one for your situation." That copy is not forwardable to a spouse deciding between plans. It reads like a promo, not a recommendation.

**Leak:** The share mechanic is placed too late, the label does not frame the value to the recipient, and the fallback share text has no forwarding energy.

### Zone 8: Mobile sticky bar
**Single primary action per zone:** Three actions (Find a plan, Verify dentist, Compare), which violates the two-CTA rule on the most conversion-critical surface. The sticky bar should surface one primary CTA that matches the visitor's scroll depth and scenario state. "Verify my dentist" should be the dominant button once a scenario has been selected; "Find a plan" should dominate before selection. "Compare" is a browse action and should be removed from the sticky bar, saving it for the left rail or navigation.

The bar has no scenario awareness. A visitor who selected "Implant ahead / Right now" and got a Humana recommendation should see "Verify a dentist who takes Humana" in the sticky bar, not three generic options.

**Leak:** Three-CTA sticky bar dilutes the conversion signal at the highest-intent moment.

---

## Shareability audit

The share mechanics currently present:
- Right rail share block (desktop): copy + email + native, visible early on desktop
- Bottom share strip (center column): copy + email + native, appears after FAQ
- Scenario result share button: inside the answer block, labeled "Share this recommendation"
- Right rail share block: static, not scenario-aware

Five share triggers named in the spec: exclusive insight not found elsewhere, scenario summary to forward, dollar math relayable verbally, spouse/partner forward CTA, "feeling smart after reading."

**What is working:** The scenario-result share button in the answer block is the strongest share surface on the page. It fires contextually, it has access to the session data, and the `shareScenario()` function builds a human-readable sentence from it. This is the right instinct.

**What is broken:**
1. The "Share this recommendation" label is invisible under the scenario answer CTA row. Visitors scanning for a primary action will click "Read the full plan story" or "Verify my dentist" and never notice the share text link.
2. The email body generated by `shareScenario()` includes the plan story verbatim, which is accurate but technical. A spouse or parent receiving it gets a plan description, not a recommendation they can act on. The body should open with the scenario: "I used CoverCapy and it recommended [Plan] for us because [one-sentence reason]. You can check if our dentist accepts it here: [verify URL]."
3. The bottom share strip is labeled "Share this guide with your family." This positions the page as a guide to share, not a recommendation to forward. The better frame for a family situation is "Forward your plan match to your spouse" with the share button labeled "Send my recommendation."
4. No share CTA appears inside the plan tour stops themselves. A visitor who reads the Humana stop and decides it matches their situation has no inline forward path.
5. The Capy Rewards spot (in-flow mobile, right rail desktop) says "Points unlock perks with accredited providers" but has no enrollment CTA and links to `#related` which is the carrier card grid. If Capy Rewards is a real retention mechanic, it needs a real link.

---

## CTA copy improvements by persona and scenario

### Marcus (urgent crown, major work now)
Current: "Verify my dentist" (generic)
Improved primary: "Check if your dentist accepts Ameritas" or "Find a dentist, confirm coverage today"
Improved secondary: "See what Ameritas pays on a $1,200 crown"

### Priya (COBRA gap, left a job with dental)
Current: "Verify my dentist" (generic)
Improved primary: "Confirm your prior coverage qualifies for the waiver"
Improved secondary: "Check if your dentist is on the Aetna network"

In the scenario answer block (COBRA gap, urgent timing), the dollar math note reads: "With the prior-coverage waiver, major work is available immediately at 50%. For a $1,200 crown, the plan pays about $600." This is good. The primary CTA should follow it directly and read: "Check if the waiver applies to you" pointing to a verify flow or FAQ anchor.

### Derek (implant, planning horizon)
Current: "Read the full plan story" (primary), "Verify my dentist" (secondary)
Improved primary: "Verify your dentist is in Humana's network"
Improved secondary: "See the full Humana Extend 5000 implant math"

The dollar math for the Humana implant scenario ("For a $4,000 implant after the 6-month wait, the plan pays about $2,000 in year one, 50%, up to the $2,000 annual implant cap") is strong. It should appear before the verify CTA in the panel, not only in the scenario answer block.

### Sandra (senior, 65+, no Medicare dental)
Current: "Verify my dentist" (generic)
Improved primary: "Check if your current dentist takes Mutual of Omaha"
Improved secondary: "See why community-rated pricing matters after 65"

The "Turning 65 or retiring" chip hint reads "Medicare does not cover dental." That framing is correct but passive. The chip hint could read "Medicare gap: none of it covers dental" to sharpen the urgency recognition.

### Caleb and Mae (young couple, stacking individual plans)
Current: chooser answer for "Me + spouse" reads "Two individual policies often give each person their own annual maximum rather than sharing one. Use the scenario finder below to match each person's treatment plan to the right policy."
Improved: Name the pairing explicitly. "The most common couple pairing on this shelf: one person on UHC for preventive-only years, one on Ameritas or Humana if major work is coming. Use the finder below for each of you separately." Then add: "Send the finder result to your spouse" as a share CTA beneath the chooser answer.

### Natalie (adult braces, Invisalign)
Current: scenario result primary CTA is "Read the full plan story" for Delta Dental
Improved primary: "Check if Delta Dental is in your state" (because Delta sells in 16 states plus DC, the state availability is the first anxiety to resolve)
Improved secondary: "See the full Delta adult ortho math"

The warning state for adult ortho (urgent or soon timing) currently reads: "Both plans on this shelf that cover orthodontics, Guardian Premier PPO and Delta Dental PPO Premium, require a 12-month waiting period before the benefit applies. There is no way to waive this wait for orthodontics." That is correct. But the CTA after the warning is two outline buttons ("See Guardian Premier PPO" and "See Delta Dental PPO Premium"), both pointing to the tour stops. These should be: (1) primary teal: "Enroll now to start the 12-month clock" linking to a direct enrollment or verify flow, (2) secondary outline: "See when your benefit would start" linking to a calendar-date explainer. The implementation-intention framing of "Your ortho benefit would be active by [month, year]" should be generated dynamically in JS from the current date.

---

## Top 10 concrete conversion fixes

### 1. Invert the CTA hierarchy inside the scenario answer block
The current order: "Read the full plan story" (primary teal), "Verify my dentist" (secondary outline), "Share this recommendation" (text link).

Correct order: "Verify my dentist takes [plan name]" (primary teal, uses the hero plan slug), "Read the full [plan name] story" (secondary outline), "Send this recommendation to my spouse" (secondary outline or text link, replacing the current passive share text link with a clearer label).

This is the single highest-impact change. The scenario finder is the top micro-commitment on the page. When it resolves, the next action must be the one closest to enrollment, not another information layer.

Implementation: In `render()`, swap the href and class of the two anchor elements in `sf-cta-row`. Change "Read the full plan story" to `btn-out` and "Verify my dentist" to `btn-pri`. Update the label to include the plan name: "Verify my dentist takes [hero.name]."

### 2. Make both verify bands scenario-aware
After a scenario selection, the verify band headline and input placeholder should update based on `sessionStorage.getItem('cc_scenario')`.

Before scenario: headline "The step everyone skips, and we will not let you" / placeholder "Enter your dentist's name or city"
After scenario (e.g., Guardian selected): headline "Before you commit to Guardian, confirm your dentist is in-network" / placeholder "Search 6,400+ Guardian offices" / button "Find a Guardian dentist"

Implementation: Add a `data-band="verify-1"` attribute to both verify band forms. After `applyMatch()` runs in Widget 2, also call a `updateVerifyBands(heroSlug)` function that rewrites the headline, placeholder, and button text using the `PLANS[heroSlug].name` value stored in session.

### 3. Add cash-cost anchoring to the quick-facts panel
Each tour stop panel currently shows: Premium, Annual max, Waiting period, Implants, Ortho. Insert a row above the plan specs: "Crown without coverage: $900 to $1,400." This anchors the premium against the risk it is offsetting before the visitor reads the plan numbers. The row label is "Without coverage" and the value is the procedure most relevant to the data-filters attribute of that card. For preventive-only cards (UHC), omit the anchor row or substitute "Cleaning without coverage: ~$120."

This does not require SSOT plan data and introduces no coverage claims, only procedure cost estimates that can be labeled "estimate" in the same style as the premium fields.

### 4. Replace the sticky bar three-CTA layout with a scenario-aware two-CTA layout
Before scenario selection: "Find my plan" (primary, links to scenario finder) + "Verify dentist" (secondary).
After scenario selection: "Verify my [plan name] dentist" (primary) + "Compare all 8" (secondary).

The dismiss button remains. The "Compare" link moves off the sticky bar.

Implementation: After `applyMatch()` runs, update `#sticky-bar` button labels and hrefs based on `cc_hero_plan` from sessionStorage. This requires roughly 12 lines of JS added to the end of the `render()` function.

### 5. Upgrade the share mechanic: scenario summary first, link second
The email body built by `buildShareText()` currently opens with the plan story sentence. Change the email body template to:

Subject: "My dental insurance match for [situation label] — CoverCapy"

Body: "I used CoverCapy's plan finder for [situation chip label] and it recommended [plan name]. [One sentence reason.] You can check if our dentist accepts it here: [verify URL with plan slug]. If your situation is different, run the finder yourself: [PAGE_URL]."

This makes the email a recommendation, not a guide. The recipient gets an action (verify the dentist) rather than a page to read. The forwarding rate for actionable recommendations is higher than for informational links.

### 6. Add a forward CTA inside the scenario answer block alongside the share button
The current share button is a gray text link "Share this recommendation" at the bottom of the `sf-cta-row`. Elevate it to a small outlined button with the label "Forward to my spouse" or "Send to a family member" on desktop, "Share" on mobile.

On desktop, make it email-first (the most likely forward channel for insurance decisions). On mobile, use `navigator.share` if available, fallback to email.

This label change alone addresses share trigger 4 from the spec (spouse/partner forward CTA). The copy "Forward to my spouse" implies the page has already done the work and the recipient just needs to see the conclusion, not re-read the whole guide.

### 7. Surface the calendar-date waiting period frame for time-sensitive scenarios
The waiting period section (lines 927-931) correctly frames waiting periods as "buying a calendar." But the framing is prose, not interactive. For the ortho warning state and for any scenario with a timing selection of "urgent" or "soon," generate a dynamic sentence:

"If you enroll today, your [major work / ortho] benefit would be eligible by approximately [calculated month and year]."

This uses `new Date()` plus the appropriate wait period in months per plan. The implementation is 15 lines of JS. It converts abstract waiting periods into concrete eligibility dates, which is the single A/B experiment the spec ranks highest priority.

The ortho warning state especially needs this: "If you enroll today, your Guardian ortho benefit would be active by approximately [date 12 months out]. Your treatment can begin from that date."

### 8. Add a plan-level share button inside each tour stop
Each `ts-main` block ends with the skip-it box. Add a small share row below the skip-it box: "This plan fits my situation" with a small share icon. Clicking it fires `shareScenario()` with the plan slug hardcoded, regardless of whether the scenario finder was used.

This addresses the pattern of visitors who browse the plan stories directly without using the finder. They arrive via organic search on a plan name, decide it fits, but have no forward path. The in-card share button gives them one without requiring scenario completion.

Label: "This plan fits my situation — forward it" on desktop, "Share" with the plan name as the email subject on mobile.

### 9. Strengthen the hero lede with a scenario-first opening sentence
Current: "Eight independently reviewed PPO dental plans, matched to your coverage need: whether you are planning for a family, watching for braces, facing an implant, or filling a gap after a job change."

Improved: "If your dentist just said crown, or your employer dental ended last month, or braces are coming for your kid, the right plan depends entirely on what your mouth needs in the next 12 months. We matched eight reviewed PPO plans to those situations, and we verify your dentist accepts the plan before any money moves."

This version opens by naming four specific situations, which triggers immediate self-recognition. The verification promise closes the paragraph and differentiates from generic comparison sites. Length is comparable; the anxiety signal is higher.

### 10. Add a "About CoverCapy" inline trust block, 60 words, near the first verify band
The spec notes: "About CoverCapy inline block (~60 words) explaining it is an independent educational marketplace paid only on enrollment." Currently there is an editorial note at the bottom of the page (line 1013), but it is below the FAQ and functions as a disclosure, not a trust signal.

Move a short version of this trust block to just before or just after the first verify band. It should read:

"CoverCapy is an independent dental marketplace, not an insurer and not an agent. We are paid only if you enroll through our site. We do not receive fees for putting any carrier first, and every review on this page names who should skip the plan. Our goal is to send you to the right dentist with the right plan, not to the highest-paying carrier."

This trust signal is most valuable at the point where the visitor is being asked to act (the verify band), not at the bottom of the page where it reads like a legal footnote.

---

## Single primary action per scroll zone: summary table

| Zone | Current primary action | Correct primary action |
|---|---|---|
| Hero | "Find my plan" anchor | "Find my plan" (keep, but rewrite lede to match) |
| Chooser | Chooser button click | Chooser button click (keep, add spouse forward CTA after answer renders) |
| Scenario finder chip | Chip selection | Chip selection (keep) |
| Scenario finder timing | Timing button | Timing button (keep, improve label copy) |
| Scenario answer block | "Read the full plan story" (primary) | "Verify my dentist takes [plan name]" (primary) |
| Tour stop panel | "Verify my dentist" (primary) | "Verify my dentist" (keep, add cash-cost anchor above) |
| Verify band 1 | Generic search form | Scenario-aware search form with plan-specific copy |
| Comparison table footer | "Compare plans interactively" (primary) | "Find a dentist who takes this plan" (primary) |
| Verify band 2 | Generic search form | Scenario-aware search form with plan-specific copy |
| Share strip | "Share this guide" (passive) | "Forward my plan match to my spouse" (active) |
| Mobile sticky bar | Three options (diluted) | Scenario-aware two options maximum |

---

## What is working well: do not change

- Limitation-first vignettes (Sam, Priya, Marcus, Elena, David, Maya, the Nguyens) are the strongest copy on the page and the primary reason a visitor trusts the analysis. The "Skip it if" blocks reinforce this. Both should remain exactly as written.
- The two-step scenario finder structure with chip selection then timing selection is the right micro-commitment sequence. The chip grid at 4 columns, 8 individual chips, feels complete without being overwhelming.
- The IntersectionObserver left-rail active state is correct and should be extended to the right rail for the contextual rotating spotlight (agent 02 scope).
- The match-bar green/gray binary is clear and honest. It only needs to fire earlier (via filter pills, not just via scenario finder completion).
- The family stacking note (line 920-923) is the most shareable content on the page for couples deciding together. It should be surfaced higher, possibly as a callout after the "Me + spouse" chooser answer renders.
- The SSOT-grounded dollar math in the scenario answer blocks (DOLLARS object, lines 1180-1191) is the right approach and should be preserved verbatim across the rebuild.
