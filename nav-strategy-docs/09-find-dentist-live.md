# Find a Dentist — Live Panel + Featured Area

## Conversion thesis
The result card is the anchor. People do not convert on a promise; they convert when they see a real office, in their area, that takes their plan. So the panel's job is to move someone from a ZIP into a concrete result as fast as possible.

## Live numbers (verified)
Source: Supabase `dentists` table, project `hfvbeqlefwwjlrbyxpbj`, queried 2026-06-26.
- 7,042 rows, 853 cities, 14 states, 3 `platinum_elite`.

Approved headline: "Search 7,000+ PPO offices, updated regularly."
- "7,000+" is true today (7,042). Keep it as a rounded floor, never a precise count, so it stays honest as rows change.
- "Updated regularly" is fair because the page reads live from Supabase at build. Do not say "daily" or "real-time" unless a job guarantees it.
- Fallback if the count cannot render live: "Search PPO offices near you." No number, no estimate.

## Recommended structure
1. Left: search panel (primary action).
2. Right: concierge featured card (sticky on desktop).
3. Below: dynamic browse and claim cards.

## Compliant copy

**Search panel (primary)**
- Overline: "Find a PPO dentist"
- H2: "Search 7,000+ PPO offices, updated regularly"
- Input: ZIP or city, with one button: "See offices near me"
- Helper: "We show offices and the PPO plans they accept. Verifying is free."

**Right concierge / featured card**
- Title: "Not sure who takes your plan?"
- Body: "Tell us your carrier and ZIP. We help you confirm coverage at an office before you book."
- CTA: "Start a free check"

**Featured placement (paid, Platinum Elite)**
- Label clearly: "Featured office" (paid placement is disclosed).
- Render only if a real `platinum_elite` office matches the search area; otherwise hide. Never fabricate a featured result.

**Dynamic browse / claim cards**
- Browse: "Offices in {city}" pulled from the live query.
- Claim: "Is this your practice? Claim your listing." Shows only on real, unclaimed rows.

## Patient-first guardrails
No guaranteed savings, no invented stats, no arrows, no banned filler. Free verification stays the honest hook.
