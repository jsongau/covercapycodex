# Mega Nav SEO Strategy: Internal Linking & Authority Hubs

## The leverage
The nav ships on all 6,400+ pages. Every link in it inherits site-wide internal PageRank. Treat nav slots as the most valuable real estate on the property: each link is a 6,400-vote endorsement. Spend those votes on a tight set of pages we want ranking, not on everything.

## The authority hubs (6 slots, ranked by priority)
1. **Find a PPO dentist near you** -> `/find-my-dentist.html`
2. **Compare PPO dental plans** -> `/compare-ppo-dental-plans.html`
3. **PPO dental insurance guide** -> `/dental-insurance/`
4. **Maximize your dental benefits** -> `/benefit-maxing/`
5. **Estimate dental treatment costs** -> `/dental-treatment-cost-estimator.html`
6. **Dental emergency help** -> `/benefit-maxing/guides/dental-emergencies/`

Secondary, footer-only (not nav): `/guides/glossary/`. It is reference, not a conversion or ranking target, so keep it out of the high-equity nav block to protect focus.

## Weighting and position
Equity flows to links higher and earlier in the DOM. Order the static block exactly as ranked above: "Find a dentist" first (commercial intent, our money page), hubs next, emergency last. Place the static link block high in source order, before deep regional/city links. Six links is the ceiling; seven if emergency and cost both earn it. Past seven, each link's share of equity drops and the signal blurs.

## Anchor text
Use descriptive, keyword-bearing anchors, not generic labels. Vary them so we are not stuffing one exact phrase 6,400 times, which reads as manipulation. Approved set above mixes the head term ("PPO dental plans", "PPO dental insurance") with action phrasing ("Maximize your dental benefits", "Estimate dental treatment costs"). Rotate a second descriptive variant per hub across page templates (state hubs vs city vs T5) so anchor diversity looks editorial.

## Avoiding dilution
Cap the global nav at these 6-7 hub links plus brand/home. Push city, metro, and state cross-links into contextual in-body modules and the footer, not the universal nav. The fewer site-wide links, the more concentrated the equity per hub.

## Static, no-JS block
The hub links must render as plain crawlable `<a href>` in raw HTML, present before any JS hydration. No client-side menu injection, no `<button>` toggles for the primary hub links. Mega-panel sub-links may be JS-enhanced, but the 6-7 hub anchors stay in static markup so crawlers and no-JS bots always see them.

## Copy constraints
No arrows in link text. No banned words. Descriptive anchors only. Labels above comply.
