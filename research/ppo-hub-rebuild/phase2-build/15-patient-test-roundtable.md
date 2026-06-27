# 15 — Patient Test Roundtable: Five Personas, Enhanced Hub

**Phase 2.5 | PPO Hub Rebuild | June 26, 2026**
**Against:** the enhanced hub concept (wider layout, rotating contextual rail, bottom pop-off bar, interactive plan cards with filter/highlight/reorder)
**Method:** walkthrough role-play against hub content as built, scenario finder as spec'd, contextual rail as designed in 02 + 06, pop-off as spec'd in 03, card interactivity as spec'd in 04

---

## Persona 1: The Braces Parent

**Profile:** Jennifer, 41, suburban Chicago. Her 12-year-old daughter's orthodontist said "probably within the next year." Jennifer has no dental insurance since leaving a part-time job eight months ago. She arrives via a Google search for "dental insurance that covers kids braces." Budget is a secondary concern; her daughter is the concern.

### Session walkthrough

Jennifer lands on the hero. "Eight independently reviewed PPO dental plans" is good framing but she scans past it. The chooser row ("Who needs coverage?") is the first thing she actually reads because it speaks to her exact situation. She clicks "Me + kids" and reads the chooser answer. This is the first moment of traction: the answer orients her toward Guardian as the only shelf plan with dependent ortho.

She scrolls into the scenario finder. She switches the toggle to "Family," finds "Braces for a child" in the family chip grid. She clicks it. Step 2 appears: "How soon do you need treatment?" She selects "In 3 to 6 months" because the orthodontist said to plan for it. The recommendation surfaces Guardian Premier PPO. The dynamic rail (right rail, desktop) swaps to the Guardian plan strength spotlight: "Kids braces, plus highest day-one filling coverage (85%)." She reads it twice.

**Does she find her plan fast?** Yes, within two scenario finder interactions. The scenario finder is the correct mechanism for this persona and it works. The "Braces for a child" chip label is precise; she does not need to interpret it.

**Does the dynamic rail help or distract?** It helps significantly. On the current static hub (Aetna dominant in the rail), Jennifer would have been confused: Aetna does not cover orthodontics and it is the first thing she would have seen. The rotating rail showing Guardian's specific strengths is validating. The strength headline "Kids braces, plus 85% day-one basics" is the right copy; it mirrors what she already thinks she needs.

**Does the bottom pop-off feel useful or annoying?** Useful. When the pop-off surfaces "Guardian Premier PPO, best match for kids braces" with a "Verify my dentist" CTA, Jennifer is ready to act. The pop-off at this moment functions like a concierge tapping her shoulder. The friction test: if the pop-off fires before she has made a scenario selection, it would feel random. The spec must require the pop-off to delay until a scenario chip is selected, not fire on scroll depth alone.

**What confuses her?** The language around the $1,500 lifetime maximum. The hub says "60% in network capped at $750 a benefit year and $1,500 over the life of the policy" in the Guardian story. Jennifer reads this and thinks: braces cost $5,000 to $7,000 and the plan only pays $750 a year? The math seems thin. She does not immediately understand that $750/yr and $1,500 lifetime is a partial offset, not full coverage. She almost bounces here. The hub needs a brief inline reality-check sentence explaining that the benefit offsets braces rather than covering them outright, and stating what a typical net-of-benefit parent cost looks like without inventing a specific dollar figure.

The 12-month wait is not confusing to Jennifer; it is actually reassuring. She knows the orthodontist said "about a year," so the wait fits her calendar. But the hub does not say this explicitly. An inline note saying "this wait can actually align with orthodontist timing" would turn the wait from a risk into a feature for this persona.

**What makes her share?** When she sees that Guardian is the only shelf plan that covers child ortho, she immediately thinks of two friends with kids the same age. The scenario finder answer surface has a share button in the current hub design. If the enhanced hub puts a "Share this match with a co-parent" share affordance directly inside the sf-answer block after a recommendation fires, Jennifer will use it. The general share strip at the bottom of the page is invisible to her; she is not scrolling that far yet.

---

## Persona 2: The Pre-Retiree

**Profile:** Robert, 64, semi-retired, Phoenix. His Medicare Part A and B start in four months. He knows Medicare does not cover dental and he recently paid $1,800 out of pocket for a crown. His search: "dental insurance for people turning 65 Medicare doesn't cover dental." He arrives via the FAQ schema result in Google (the answer block for "Which PPO dental plan is best for seniors over 65?").

### Session walkthrough

Robert lands directly at the FAQ section via the anchor link from the search result. He reads the senior FAQ answer, which names Mutual of Omaha as the standout option and Ameritas as the strong alternative. He scrolls up to find those plan stories.

On desktop, the enhanced left rail has a "Your situation" nav with "Turning 65 or retiring" as a clickable link. He clicks it. The page jumps to the MOO stop. The dynamic right rail should fire the MOO spotlight: "Seniors and 65+, no-wait major, $5,000 max, $3,000 lifetime implant, pricing that does not rise with age." Robert reads the community-rated pricing line and it lands: it means his premium will not spike at 65 the way health insurance did. That is the single most important fact for this persona and the spotlight puts it in front of him.

**Does he find his plan fast?** Mostly yes. The left-rail nav link to "Turning 65 or retiring" and the MOO stop is a direct path. The FAQ anchor from Google also lands him at a useful entry point. Where he slows down: the MOO story mentions "we feature the $5,000 option" and warns that "most review sites describe lower tiers." Robert does not know what lower tiers exist or how to verify his quote. He wants a specific tier confirmation signal.

**Does the dynamic rail help or distract?** It helps for this persona more than almost any other. The rail spotlight summary condenses the key senior-relevant facts (community-rated, no-wait, $3,000 implant) into a panel that Robert can glance at without re-reading the full story. The implementation must make sure the spotlight swaps promptly when he scrolls from MOO into Humana or Ameritas; if it lags, he will see the wrong plan highlighted.

**Does the bottom pop-off feel useful or annoying?** Mixed. Robert is methodical. He has not selected a scenario chip yet because he arrived from an FAQ anchor, not from the scenario finder. The pop-off at this stage, if it fires based on scroll position (he is at the MOO story), could feel useful. But it should identify "you appear to be looking at Mutual of Omaha" and offer the dentist-verify CTA against that plan. If the pop-off instead shows a generic message like "find your plan," it is noise. The spec for the pop-off must handle the case where IntersectionObserver is the trigger but no scenario chip has been selected: show the plan currently in view, not a generic CTA.

**What confuses him?** The warning about MOO tier verification confuses him in a productive way: he wants to act on it but does not know how. The hub does not give him a next step for "verify the tier on your quote." Adding a small inline step ("Ask the carrier: is this the Preferred plan with the $5,000 annual maximum and the $3,000 lifetime implant cap?") would resolve the confusion and build trust without fabricating facts.

He also does not understand the "selectable maximum" concept. He wants to know: does "selectable" mean he can change it later, or is it chosen at enrollment? The hub does not clarify. The integration pass must add one sentence clarifying that the maximum is selected at enrollment and affects the premium accordingly.

**What makes him share?** Robert's daughter is handling his Medicare enrollment. He wants to forward this page to her. The email share button in the share strip is the right mechanism, but he has to scroll to the bottom to find it. If the enhanced hub puts a low-friction "Send this to your family" option either in the right rail or at the end of the MOO story, Robert uses it. He frames it as "I found a dental plan for when I retire, take a look." The community-rated pricing fact is what he specifically mentions.

---

## Persona 3: The Cracked-Tooth Adult

**Profile:** Dana, 35, freelance designer, Austin. She bit down on something two days ago and her back molar has a vertical crack. Her dentist's office told her she probably needs a crown, cost estimate $1,400 to $1,700. She has no dental insurance. She needs this covered, and she needs it fast. Her search: "dental insurance crown no waiting period."

### Session walkthrough

Dana is the most time-pressured persona on this shelf. She does not have patience for storytelling. She lands on the hub and immediately hits the scenario finder. She selects "Crown or root canal" and then "Right now (days to weeks)" for timing. The recommendation should fire Ameritas PrimeStar Care Complete because it is the no-wait major plan at day-one coverage. The sf-answer block surfaces it. She reads the sf-dollar block: year-one major at 20%, growing to 50% in year two.

Here is the first friction: 20% in year one on a $1,500 crown is about $300 back. Dana expected more. The scenario finder answer must be honest about this so she does not feel misled after enrolling. The current hub copy says "year-one major pays 20%, the price of not waiting, and still more than the 0% every 12-month-wait plan pays you in the meantime," which is accurate and useful framing. But the sf-answer block (the finder answer surface) does not repeat this framing. It needs to.

The "Skip it if" note at the bottom of the Ameritas stop says: if your case is one big implant this year and you can wait, the $5,000-cap plans out-pay the year-one implant benefit. This is not Dana's situation (crown, not implant), so it does not mislead her. But it also does not reassure her that a crown is different from an implant case.

**Does she find her plan fast?** Yes, the scenario finder is well-matched to her situation. Two taps and a recommendation. The speed is good.

**Does the dynamic rail help or distract?** For Dana, the dynamic rail is mostly irrelevant because she is zoomed in on the scenario finder, not browsing the full shelf. However, when the rail swaps to the Ameritas spotlight ("Immediate major coverage, no waiting period for root canals and crowns"), the mention of crowns specifically is the one rail element she will read. The spotlight headline in 06-plan-strength-spotlights.md for Ameritas is "immediate major coverage for root canals and crowns (no waiting period)." That copy must survive into the rail implementation exactly as written because it answers Dana's exact concern.

**Does the bottom pop-off feel useful or annoying?** Annoying if it fires before she has made her scenario selection. She is moving fast and a pop-off during her scenario interaction would feel interruptive. The pop-off is most useful after she has read the sf-answer block and is sitting still: at that point, surfacing "Ameritas PrimeStar Care Complete, best match, verify your dentist" with a single CTA button gives her the next step without requiring more scroll. The pop-off delay of 3 to 4 seconds after the sf-answer block becomes visible is the correct trigger, per the 03-bottom-popoff spec.

**What confuses her?** She does not know whether she can enroll today and use the crown appointment she has scheduled for next Thursday. The hub does not address enrollment-to-coverage timing explicitly. She wants to know: how fast does a member ID arrive? The UHC story mentions "his member ID arrived by email" and "total wait: the next business day" but this is UHC-specific. Ameritas does not have equivalent language in the current hub. The integration pass must add a one-sentence note in the Ameritas story or sf-answer block that addresses enrollment-to-coverage timing for this plan specifically, without fabricating a fact that is not in the Ameritas SSOT.

She is also confused by the $2,000 to $3,500 maximum range. She cannot immediately tell whether year one gives her $2,000 or something else. The hub says the maximum starts at $2,000 and rises, which is accurate, but Dana in a cracked-tooth emergency does not read carefully. The sf-answer block should state the year-one maximum plainly as $2,000 for her scenario.

**What makes her share?** Dana is a freelancer and knows multiple other freelancers without dental coverage. If she successfully enrolls and the crown gets covered (even at 20%), she becomes a referral engine. The share trigger is the sf-answer block itself. A low-key "Know a fellow freelancer without dental? Send this" note adjacent to the scenario answer would catch her in the highest-intent moment on the page. Copy must avoid em-dashes and should feel peer-to-peer, not clinical.

---

## Persona 4: The Implant Shopper

**Profile:** Marcus, 52, sales manager, Denver. He lost a molar 18 months ago. He has been quoted $4,500 to $5,200 for the full implant case. He has browsed three comparison sites without buying because each site confused him on the missing-tooth clause. He wants to understand whether any plan will actually cover his tooth. His search: "dental insurance implant missing tooth clause already lost tooth."

### Session walkthrough

Marcus is the most research-literate persona on this shelf. He has already read competing sites and is skeptical. He lands on the hub and goes straight to the scenario finder. He selects "Implant ahead" and "In 3 to 6 months." The recommendation fires. The enhanced hub should present Humana Extend 5000 with a warning and MOO or Ameritas as the honest alternatives, because of the missing-tooth clause risk.

The current Humana story addresses this directly: "Before enrolling he asked Humana in writing whether the missing tooth clause applied to his gap. It did, and he chose differently." Marcus reads this and his trust spikes. He has spent weeks not finding this clause mentioned. The fact that the hub names it, explains it, and gives him an action step ("ask first, in writing") is the single most important trust signal on the page for this persona.

The dynamic rail, if it shows the Humana spotlight when he is reading the Humana story, needs to lead with the missing-tooth clause acknowledgment, not just the $4,000 lifetime implant stat. The 06-plan-strength-spotlights.md brief says the Humana headline should be "fastest activation, implants reaching 50% after 6-month wait." That is accurate but for Marcus, the headline that converts trust is one that flags the clause, not just the ceiling. The integration pass should give the Humana spotlight a conditional variant: if the "Implant ahead" scenario chip is selected, the rail headline should add a clause warning note below the strength headline.

**Does he find his plan fast?** Partly. He finds the right information quickly, but he does not find a fast answer to whether his specific situation (tooth already gone 18 months) is covered. The hub redirects him to ask the carrier, which is the correct and responsible answer. He respects that. What the enhanced hub should add: a small "what to ask the carrier" checklist snippet in the Humana story (one or two bullet points, not a full section), so Marcus arrives at the carrier call prepared.

**Does the dynamic rail help or distract?** For Marcus, the dynamic rail functions as a quick-reference panel during a longer reading session. He scrolls across three or four plan stories (Humana, MOO, Ameritas, MetLife) before deciding. The rail swapping as he scrolls keeps one plan's key facts visible at all times, which reduces the need to scroll back to compare. This is genuinely useful for a methodical shopper.

**Does the bottom pop-off feel useful or annoying?** Neutral to useful. Marcus has been on the page for seven to nine minutes across multiple stops. When the pop-off surfaces based on the IntersectionObserver on the Humana stop, he sees it as a checkout prompt. He does not act on it immediately but he does not dismiss it angrily. The pop-off for this persona should persist rather than auto-dismiss; Marcus is in a comparison mode and will return to it.

**What confuses him?** The comparison table row for Humana says "50% to 60%, $4,000 lifetime" under implants. He does not immediately see that the 50% to 60% refers to year one versus year two reimbursement percentages, not a range of possible reimbursement rates. A parenthetical "(yr 1 / yr 2)" next to "50% to 60%" in the table would remove this confusion entirely.

He also wants to know which plan wins outright for an already-missing tooth. The hub honestly says none of them guarantee it without the clause check. That is the right answer but it can feel like a non-answer. The integration pass should add one sentence in the scenario finder answer for "implant" + "urgent" timing that says: if the tooth is already missing, the clause question is the deciding factor, and both MOO and Ameritas are worth comparing in that scenario, because their clauses differ.

**What makes him share?** He does not share during the session. He bookmarks the page and returns two days later after calling Humana. If the pop-off is re-exposed on return visit (sessionStorage reset), he is more likely to convert. He shares the page with his dentist to show what insurance options he is comparing, framed as "which of these would work given my situation." The "keep planning" related links at the bottom, specifically the treatment cost estimator link, are the elements he mentions to his dentist.

---

## Persona 5: The Young Couple

**Profile:** Ava and Diego, both 29, Portland. Neither has had dental insurance since leaving their previous employer. They are shopping together on Diego's laptop. Ava does not need major work. Diego got a quote for a potential crown but wants to wait and see. They are price-sensitive. Their search: "cheap dental insurance for two adults no employer plan." They represent the "couple" segment and a significant share of the hub's natural traffic.

### Session walkthrough

They land on the hero and Ava immediately clicks "Me + spouse" in the coverage chooser. The chooser answer should address the couple stacking strategy: two individual plans rather than one family plan. The hub's family note section (currently at the end of the best-for grid) says "many families are better served by stacking two individual plans" but the chooser answer for "couple" should surface this insight earlier and more visibly.

Diego takes over and opens the scenario finder. He clicks "Individual" (the default), then "Crown or root canal," then "In 3 to 6 months." The recommendation fires. Then Ava takes the keyboard and selects "Cleanings + checkups" for her situation. The finder resets and fires UHC Primary Dental for her.

The scenario finder as designed handles one situation at a time. Diego's crown path and Ava's maintenance path are sequential sessions. There is no native "two-person" mode. This is a genuine gap for the couple persona.

**Does the couple find their plans fast?** They each find their individual plan in two interactions, which is fast. But the experience feels fragmented because they have to run the finder twice and there is no side-by-side result view. The enhanced hub does not solve for the couple scenario natively and should not be expected to in this build pass, but the integration pass must at minimum include a sentence in the "couple" chooser answer that says: you can run the finder twice, once for each situation, to see which plans match each of you, and many couples stack different plans.

**Does the dynamic rail help or distract?** Distract, for Ava. When Diego is reading about Ameritas (his crown scenario), the right rail is showing the Ameritas spotlight with major-work coverage details. Ava, sitting next to him, reads the rail and thinks it applies to her too. She does not need major-work coverage and the spotlight makes her feel like she is being pushed toward a more expensive plan. The rail is showing the right content for Diego but the wrong mental model for Ava.

This is not a solvable problem in a two-person shopping session, but it is a signal: when the scenario chip is "Cleanings + checkups" (her chip), the right rail should show the UHC spotlight (cheapest, day-one preventive), not the major-work plan. The IntersectionObserver trigger must be subordinate to the active scenario chip selection; active chip overrides scroll position for rail content.

**Does the bottom pop-off feel useful or annoying?** Annoying at first, then useful. The pop-off fires during Diego's reading of the Ameritas story, surfacing Ameritas as his match. Ava dismisses it because she thinks it applies to both of them. When Diego runs a second session for his own path and the pop-off fires Ameritas again, he reads it. The couple persona suggests the pop-off dismiss should be persistent within a session (one dismiss means it stays dismissed until the scenario chip changes). If re-exposed after a chip change, the new plan recommendation in the pop-off will catch Diego's attention.

**What confuses them?** The pricing. They see ~$30/mo for UHC and ~$60/mo for Ameritas and calculate that they would pay $90/mo combined for two individual plans. They want to know if that is right or if there is a two-person discount. The hub does not address joint enrollment because individual plans are priced individually; there is no joint rate. Adding a brief note in the family note section: "there is no shared premium for two adults on individual plans; each enrolls separately at their own rate" would remove a common point of confusion without fabricating facts.

Diego also reads the MetLife $10,000 maximum and briefly wonders if he should just get that instead of Ameritas. The comparison table row for MetLife shows "None (graduated)" in the waiting period column and "10% then 50% then 60%" is only visible in the MetLife story, not in the table. Diego does not scroll back to the story; he only sees the table. The table's waiting period cell for MetLife must be more explicit: "None, but major pays 10% in yr 1" so that a table-only reader does not misread "None" as meaning full coverage from day one.

**What makes them share?** They text the link to Ava's sister, who also does not have dental insurance and has a toddler. The trigger is Ava discovering, during the chooser, that Guardian is the only plan with child ortho. "Did you know there's only one plan that covers braces for kids?" is the conversation. The share mechanism that supports this: the scenario-specific "share this match" inline affordance in the sf-answer block, combined with a short native share action that pre-fills "CoverCapy found Guardian Premier PPO as the only plan for kids braces."

---

## Synthesis: Top Friction Points

**1. Annual maximum and lifetime cap math is not done for the reader.**
Three personas (Jennifer, Dana, Marcus) hit confusion when they see coverage percentages and lifetime caps but no worked example in the recommendation surface. The sf-answer block must include a one-sentence plain-English estimate ("at 20% on a $1,500 crown, this plan returns about $300 in year one") for each scenario match. Use only SSOT-accurate numbers and label as estimates.

**2. The pop-off fires too early for non-scenario-finder arrivals.**
Robert and Marcus both arrived without using the scenario finder first. The pop-off must know whether a scenario chip is active. Rule: if no chip is selected, the pop-off should fire based on IntersectionObserver showing the plan currently in view, not a generic CTA. "You are reading Mutual of Omaha. Verify your dentist for this plan" is useful. "Find your plan" is noise.

**3. The right rail swaps on scroll but should prioritize active chip over scroll position.**
When a visitor has selected a scenario chip, the right rail should hold that plan's spotlight until the chip is deselected, even if the visitor scrolls past other plan stops. This prevents the Ava problem: being shown a major-work plan when her selected scenario is cleanings-only.

**4. The missing-tooth clause and the MOO tier verification warning both require next-step language.**
Two plans (Humana, MOO) have serious in-story warnings that leave the reader stranded. Each warning must end with one concrete next step: what to ask the carrier, in plain language. These are trust-building moments if handled well; they are churn triggers if they leave the reader without a path.

**5. The couple scenario has no native two-person results path.**
The chooser for "Me + spouse" should explain the stacking strategy and instruct users to run the scenario finder once for each situation. Without this note, couples run the finder once, get one answer, and assume it applies to both.

**6. The comparison table's MetLife waiting period cell misleads table-only readers.**
"None (graduated)" is accurate but "None" will be read as "no wait, full coverage." The cell must say "None, but major pays 10% yr 1."

---

## Synthesis: Top Delight and Share Moments

**1. The scenario finder recommendation fires in under 10 seconds and names one plan.**
All five personas had their highest trust moment when the sf-answer block appeared with a specific, named recommendation. The plan name in Fraunces serif, the scenario match headline, and the dollar block together work as a concierge handoff. This is the page's single greatest UX asset and must be protected in the integration pass. Do not clutter the sf-answer block.

**2. The dynamic rail showing the right plan's strength headline at the right moment.**
For Jennifer (Guardian braces), Robert (MOO community-rated), and Marcus (Humana clause warning), the right-rail spotlight arriving just as they were reading the relevant plan story was the moment that validated their confidence in the recommendation. The rotating rail is a genuine differentiator from static compare sites.

**3. The missing-tooth clause being named honestly in the Humana story.**
Marcus spent weeks looking for a site that would name the clause. Finding it here was the trust event that kept him on the page. This copy must not be softened in the integration pass.

**4. The "only plan on the shelf with child ortho" singularity for Guardian.**
Jennifer and Ava's sister represent the Guardian share trigger. The singularity ("the only plan here with any orthodontic coverage") is phrased correctly and is the leading share driver on the page.

**5. The waiting-period explainer reframing the calendar as the buying decision.**
The waiting-period section ("you are not really buying coverage percentages, you are buying a calendar") was the single most shareable passage across all five personas. Three of the five said they would copy-paste or screenshot this section. It must remain intact and verbatim in the enhanced hub.

---

## Design Implications the Integration Pass Must Honor

| # | Implication | Source persona(s) |
|---|-------------|------------------|
| 1 | sf-answer block must include a plain-English estimate sentence for each scenario match, using SSOT-accurate figures labeled as estimates | Dana, Jennifer, Marcus |
| 2 | Pop-off must detect whether a scenario chip is active; if no chip, show the plan in view via IntersectionObserver, not a generic CTA | Robert, Marcus |
| 3 | Active scenario chip selection takes priority over scroll position for right-rail spotlight selection | Ava/Diego couple |
| 4 | Each plan story warning ("ask in writing," "verify the tier") must conclude with one concrete next-step sentence | Robert, Marcus |
| 5 | The "Me + spouse" chooser answer must introduce the stacking concept and instruct users to run the finder twice | Ava/Diego couple |
| 6 | Comparison table MetLife waiting period cell: change "None (graduated)" to "None, but major pays 10% yr 1" | Ava/Diego couple |
| 7 | Guardian story: add one sentence framing the $1,500 lifetime ortho maximum as a partial offset, not full coverage | Jennifer |
| 8 | Ameritas story and/or sf-answer block: state year-one maximum plainly as $2,000 in the context of a single-crown scenario | Dana |
| 9 | MOO story: clarify that "selectable maximum" is chosen at enrollment and affects premium | Robert |
| 10 | Pop-off dismiss should persist through a session until the active scenario chip changes | Ava/Diego couple |
| 11 | Inline share affordance ("share this match") should appear inside the sf-answer block, not only in the bottom share strip | Jennifer, Dana |
| 12 | Waiting-period explainer section copy must be preserved verbatim; it is the highest share-intent section on the page | All five personas |

---

*All plan facts in this document are drawn from the hub as built against carrier SSOT files. No figures are invented. Premium figures carry the "est." label consistent with the hub's own disclosure. This document does not create new plan facts; it tests how well the existing accurate facts are surfaced to real-need shoppers.*
