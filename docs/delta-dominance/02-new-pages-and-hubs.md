# Delta Dominance — New Pages, Sub-Hubs, and the Areas Resurrection

Priority order is demand-driven from GSC, not guesswork. Every page: SSOT facts first,
answer-first opening, quotable stat block, question H2s, keep-researching rail, same chrome
stack (omega-nav2 + dcn sub-nav + standard breadcrumb), analytics block identical to hub.

## P0 — DeltaCare HMO vs Delta Dental PPO (proven demand, no page)

URL: /dental-insurance/delta-dental/deltacare-hmo-vs-ppo/
Query evidence: "delta dental ppo vs deltacare usa" already ranks position 15.5 WITHOUT a
page. "delta dental ppo vs premier" cluster adjacent. This is the fastest win on the site.

Structure:
1. Answer block: the two are different products, not tiers. DeltaCare USA is an HMO: assigned
   dentist, copay schedule, no annual maximum, tiny network, referrals for specialists.
   Delta PPO: any dentist, coinsurance, annual maximum, biggest network in the country.
2. Side-by-side table (assigned dentist, network size, annual max, waiting, specialist
   access, out-of-network, typical premium delta) with a verdict row.
3. "A savings plan fits you when / a PPO fits you when" style split, per house editorial:
   HMO fits you when… PPO fits you when… No bashing, two tools two jobs.
4. **The employer HMO-default section:** employers often offer DeltaCare as the cheap
   default. You can ask HR whether a PPO buy-up exists. Script provided ("Does our dental
   menu include a PPO option, and what is the per-paycheck difference?").
5. **The SCAN bridge:** Medicare Advantage members on SCAN plans with Delta dental benefits,
   and the upgrade path toward unlimited-maximum PPO arrangements where available.
   FACTS REQUIRED IN SSOT FIRST: create data/plans/deltacare-usa.md and
   data/plans/scan-delta-medicare.md with sourced, dated numbers before writing.
6. Rail: enrollment-timing (below), over-65, compare, find-a-dentist.

## P0 — Enrollment timing and switching (the benefits-literacy page)

URL: /dental-insurance/delta-dental/enrollment-timing/
The "tricks of starting a new job" content, written as benefits literacy, fully legitimate,
zero gray area. Frame: you are allowed to use the enrollment system exactly as designed.

Sections:
1. New-hire election vs open enrollment: two legal windows to choose or change coverage.
2. The maximize move: if you know major work is coming, compare your current plan's
   remaining maximum and waiting-period credit against the alternative before enrollment,
   and switch during open enrollment if the math favors it. Worked dollar example
   (crown + implant year) using SSOT numbers only.
3. Waiting-period credit rules: when prior comparable coverage waives waiting periods on a
   new plan (varies by carrier and state, sourced), the single most misunderstood fact in
   dental insurance.
4. HMO now, PPO later: elected DeltaCare at hire? Mark the calendar for open enrollment,
   ask HR about the PPO option, switch windows explained.
5. Why dentists genuinely like fresh coverage: fresh annual maximum, day-one preventive,
   treatment plans sequence cleanly across plan years. Quote-friendly framing: "A new plan
   year is a new annual maximum. Dentists sequence major treatment around it."
6. Qualifying life events (the mid-year exceptions) table.
7. Rail: hmo-vs-ppo, individual-plans, benefit-maxing smart-timing-protocol (cross-cluster
   link, the two pages are siblings in intent).

## P1 — Resurrect /areas/ as the Delta geo sub-hub system

Seven /dental-insurance/delta-dental/areas/{slug}/ URLs rank at positions 5-9 today and 404.
Rebuild the subtree: an areas index under find-a-dentist plus one page per area (start with
the seven Google already ranks: central-orange-county, volusia-county, pensacola,
jacksonville-beaches, oneida-county, bucks-county, plus la-county). Each page: which Delta
networks are strong locally, Delta-accepting dentist module (the find-a-dentist tool
scoped to the area, live Supabase), area-specific FAQs, rail to city pages in /dental/.
These become the template for scaling Delta geo pages later, same generator philosophy as
the main dental tree.

## P1 — Sub-hub blueprint: replicate uc-students for new audiences

uc-students proves the audience sub-hub model. Next audiences, each a mini-hub with its own
eligibility, costs, and find-a-dentist sections:
- /delta-dental/federal-employees/ (FEDVIP Delta plans, SSOT already has federal files)
- /delta-dental/military-families/ (TRICARE Dental Program is Delta-administered; verify + SSOT)
- /delta-dental/small-business/ (bridges to the employer hub)
Each sub-hub links up to the hub, down to its detail pages, and sideways to find-a-dentist.

## P2 — Question pages (AI-shaped long-tail)

One-question pages, 600-900 words, answer-first, built for citation:
- does-delta-dental-cover-implants (coverage %, waiting, maximum math from SSOT)
- delta-dental-waiting-periods
- delta-dental-annual-maximum (what it is, average figures, carryover programs)
- how-to-check-delta-dental-coverage (feeds the eligibility moat)
These four mirror the highest-intent informational patterns in the query set and give AI
engines clean single-answer targets.

## Explicitly out of scope for this cluster

aspen dental insurance (26 imp) is an adjacent-brand opportunity for the ppo-plans cluster,
not Delta. Parked, not forgotten.

## Compliance checklist for every new page

SSOT file exists and is dated → chrome loader + analytics identical to hub → breadcrumb
CoverCapy-rooted at the 148 column → schema set (WebPage, FAQPage where Q&A exists,
BreadcrumbList, speakable) → llms.txt entry added → sitemap-pages.xml entry → internal links
from hub, from at least 2 sibling pages, and from one page outside the cluster → no em-dashes
→ ends on a CoverCapy destination.
