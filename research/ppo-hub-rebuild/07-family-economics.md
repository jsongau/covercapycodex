# 07 -- Family Economics Spec
## PPO Plans Hub Rebuild | CoverCapy | 2026-06-26

**Scope:** How dental plan money works for families, and how to present that on the PPO Plans Hub. Covers individual vs. family deductibles, family deductible caps, individual vs. family annual maximums, coinsurance graduation, and real-money implications for a 2-adult / 2-kid household. Then documents the family/loyalty/membership discounts and perks that matter across the 8 featured plans.

**All plan-specific numbers cite the SSOT field in `/data/plans/*.md`. General concepts cite sources below. Nothing is invented.**

---

## 1. Core Concepts: How Dental Plan Money Works for a Family

### 1.1 The Individual Deductible

A deductible is the dollar amount a covered person must pay out of pocket for covered services before the plan starts sharing costs. On all featured plans, the deductible applies to basic and major services only; preventive (exams, cleanings, x-rays) is exempt.

Standard individual deductible across the shelf: **$50 per person per calendar year**.

- Aetna Dental Direct: $50 individual (SSOT field: `deductible`)
- Delta Dental PPO Premium: $50 individual, calendar year (SSOT: `deductible`; note: some affiliate certificates use $100, e.g. Delta Dental of WA)
- Guardian Premier PPO: $50 per person, waived for in-network preventive (SSOT: `deductible`)
- Humana Extend 5000: $75 per person per calendar year (SSOT: `deductible`)
- Mutual of Omaha Dental Preferred: $50 on Mutual Dental Preferred (SSOT: `deductible`)
- UHC Primary Dental: $50 per person, applies to basic only (SSOT: `deductible`)
- Ameritas PrimeStar Care Complete: $50 per person on basic and major (SSOT: `deductible`)
- MetLife NCD Complete: $100 lifetime, paid once in year one (SSOT: `deductible`)

MetLife NCD is the outlier: its deductible is a one-time lifetime amount rather than an annual one, so the family never pays it again after year one.

### 1.2 The Family Deductible Cap

Most dental PPO plans pair the individual deductible with a **family deductible cap** -- a ceiling on how much the whole household must pay in deductibles before the plan covers all members without further deductible.

**How it works (general concept):** If the family deductible cap is $150 and the individual deductible is $50, the family deductible is met once any three members have each paid $50 (or any combination totaling $150). After that, no additional family members pay a deductible for the rest of the calendar year, even if they have not individually met their $50. Individual members who meet their own $50 deductible receive their benefits independently, before the family cap is reached.

Source: Delta Dental, "What are family deductibles?" -- https://www.deltadental.com/protect-my-smile/dental-insurance-101/family-deductibles/ (fetched 2026-06-26). This is general dental-insurance principle, not plan-specific.

**Family deductible caps on featured plans:**

| Plan | Individual Deductible | Family Deductible Cap | Source |
|---|---|---|---|
| Aetna Dental Direct | $50 | $150 | SSOT `deductible`: "$50 individual, $150 family per CALENDAR YEAR" |
| Delta Dental PPO Premium | $50 | $150 | SSOT `deductible`: "$50 per person / $150 per family, per calendar year" |
| Guardian Premier PPO | $50 | Not stated in SSOT | SSOT `deductible` does not list a family cap; NEEDS VERIFICATION before publishing |
| Humana Extend 5000 | $75 | Not stated in SSOT | SSOT `deductible` does not list a family cap; NEEDS VERIFICATION |
| Mutual of Omaha Dental Preferred | $50 | Not stated in SSOT | SSOT `deductible` does not list a family cap; NEEDS VERIFICATION |
| UHC Primary Dental | $50 | Max 3 individual deductibles per family per calendar year | SSOT `deductible`: "maximum 3 individual deductibles per family per calendar year"; equals $150 family cap |
| Ameritas PrimeStar (base states) | $50 | Not stated in base-state SSOT | SSOT `deductible` notes the "max 3 deductibles per family" cap appears only on the WA Advantage Plus brochure (GR 7500 WA 2-26), NOT on the base-state Care Complete table; do not assert this for base-state plans |
| MetLife NCD Complete | $100 lifetime | N/A (lifetime, not annual) | SSOT `deductible`: "$100 lifetime (paid once, ever, in year one)" |

**Practical implication for a 2-adult / 2-kid family on Aetna or Delta:** With a $50 individual / $150 family cap, only three of the four family members need to hit their individual deductible before the family cap is satisfied. The fourth member's deductible is absorbed by the family cap. In a year with routine dental work spread across all four members, the household's total deductible exposure is capped at $150, not $200.

**Implication on UHC Primary Dental:** The SSOT explicitly states "maximum 3 individual deductibles per family per calendar year." At $50 per person, the family deductible cap is $150 (3 x $50), identical to the Aetna/Delta structure, though expressed differently. The fourth family member pays no deductible for basic services once three members have each paid $50.

### 1.3 Individual vs. Family Annual Maximum

**How dental PPO annual maximums work (general):** Nearly all individual dental PPO plans -- including all 8 featured plans -- apply the annual maximum **per person, per calendar year**, not as a shared family pool. Each covered member has their own independent annual maximum. If one family member uses their entire maximum on a crown, the other family members still have their full individual maximum available.

Source: Delta Dental, "What is a dental insurance annual maximum?" -- https://www.deltadental.com/protect-my-smile/dental-insurance-101/what-is-dental-insurance-annual-maximum/; and Ameritas, "Explaining Annual Maximum and Other Dental Plan Terms" -- https://www.ameritas.com/insights/for-agents-explaining-annual-maximum-and-other-dental-plan-terms/ (both fetched 2026-06-26).

**Annual maximums on featured plans (all per person per calendar year):**

| Plan | Annual Maximum | Resets | Source |
|---|---|---|---|
| MetLife NCD Complete | $10,000 | January 1 | SSOT `annual_maximum` |
| Humana Extend 5000 | $5,000 | January 1 | SSOT `annual_maximum` |
| Mutual of Omaha Dental Preferred | Selectable $1,500 / $3,000 / $5,000 | Calendar year | SSOT `annual_maximum` |
| Guardian Premier PPO | $3,000 | Benefit year | SSOT `annual_maximum` |
| Ameritas PrimeStar Care Complete | $2,000 year one, rising to $3,500 after year one (basic and major combined) | Benefit year | SSOT `annual_maximum` |
| Delta Dental PPO Premium | $2,000 | January 1 | SSOT `annual_maximum` |
| Aetna Dental Direct (Preferred) | $1,250 | Calendar year | SSOT `annual_maximum` |
| UHC Primary Dental | $1,000 | January 1 | SSOT `annual_maximum` |

**Implication for a 4-person household:** With each family member holding their own maximum, the family's combined plan capacity in one calendar year equals 4 x the per-person maximum. At $5,000/person (Humana or Mutual of Omaha at the top tier), the household has $20,000 of total coverage capacity before any member hits their ceiling. At $1,000/person (UHC Primary), the household capacity is $4,000.

**No shared family pool exists on any of the 8 featured plans.** This is a meaningful distinction from certain employer group dental plans where a family aggregate maximum can run out. Individual PPO plans uniformly use per-person maximums.

**Sub-maximums that do exist within the per-person maximum:**

- Humana Extend 5000: $2,000 per person per year and $4,000 lifetime implant sub-maximum, both counting toward the $5,000 overall per-person maximum. (SSOT `implants`)
- MetLife NCD Complete: $3,000 per calendar year implant sub-maximum within the $10,000 overall maximum. (SSOT `implants`)
- Mutual of Omaha Dental Preferred: $3,000 lifetime implant sub-maximum, separate from the calendar-year maximum (does not reset annually). (SSOT `implants`)
- Ameritas PrimeStar Care Complete: $1,000 implant sub-maximum in year one, $1,500 in year two and after, deducted from (not added to) the annual maximum. (SSOT `implants`)
- Guardian Premier PPO: $1,250 lifetime implant sub-maximum. (SSOT `implants`)

These sub-maximums apply per person, not per family.

### 1.4 How Coinsurance Graduates

Coinsurance is the percentage the plan pays once the deductible is met. On most plans, the coinsurance rate differs by service tier and can also improve over the years a policy is held (called a loyalty or increasing-benefit structure). These are per-person rules; there is no family-level coinsurance mechanism on these plans.

**Coinsurance summary for the 8 featured plans:**

| Plan | Preventive | Basic | Major | Structure Type |
|---|---|---|---|---|
| Aetna Dental Direct | 100% day one | 80% after 6-month wait | 50% after 12-month wait | Flat tiers; waits waivable |
| Delta Dental PPO Premium | 100% day one | 80% after 6-month wait | 50% after 12-month wait | Flat tiers; major wait waivable |
| Guardian Premier PPO | 100% day one | 85% day one (no wait) | 60% in-network after 12-month wait | Flat tiers; highest day-one basic on shelf |
| Humana Extend 5000 | 100% day one | 80% after 90-day wait | 50% yr 1 / 60% yr 2+ after 6-month wait | Loyalty step-up on major |
| Mutual of Omaha Dental Preferred | 100% day one | 80% day one | 20% yr 1 / 50% yr 2+ (no wait) | Loyalty ramp on major; no wait |
| Ameritas PrimeStar Care Complete | 100% day one | 80% yr 1 / 90% yr 2+ (no wait) | 20% yr 1 / 50% yr 2+ (no wait) | Loyalty ramp on both basic and major; no wait |
| UHC Primary Dental | 100% day one | 50% day one / 65% yr 2 / 80% yr 3 (no wait) | Not covered | Loyalty step-up on basic only |
| MetLife NCD Complete | 100% day one | 65% yr 1 / 80% yr 2 / 90% yr 3+ (no wait) | 10% yr 1 / 50% yr 2 / 60% yr 3+ (no wait) | Deepest loyalty ramp; all tiers graduate |

Sources: all coinsurance figures from individual SSOT fields `coverage_preventive`, `coverage_basic`, `coverage_major` in `/data/plans/*.md`.

**What "loyalty" or "increasing benefit" means for families:** Plans with a coinsurance ramp reward staying enrolled. The family saves more as every member crosses from year one into year two and three. On MetLife NCD Complete, major work pays only 10% in year one but 60% in year three; that 50-percentage-point gap on a $1,600 crown means the plan pays $160 in year one vs. $960 in year three -- an $800 difference per crown, per person. Families with kids heading toward braces or crowns gain most by enrolling before the need arises.

---

## 2. Family-Specific Discounts, Perks, and Features by Plan

### 2.1 Humana Extend 5000 -- Family Value and Loyalty Pricing

**Family or dependent pricing:** SSOT `monthly_premium` notes "family/dependent add-on discount available." The exact discount percentage and eligibility criteria are **not in the SSOT** and not in the three verified brochures (FL, GA, NY). This must be verified directly against the Humana enrollment flow or a Humana benefits disclosure before publishing any specific family discount figure.

**Loyalty benefit (coinsurance ramp):** Major and implant coverage rises from 50% in year one to 60% in year two and all subsequent years, with no additional action required. (SSOT `coverage_major`, `implants`) This is a meaningful family loyalty perk: a parent with a child who needs a crown timed into year two saves 10 percentage points on every major procedure.

**Bundled value:** FL and GA versions include vision and hearing (TruHearing) alongside dental. NY version includes vision only (no hearing). (SSOT `do_not` bullet 6) For a family, combining dental + vision + hearing on one plan can reduce the number of separate policies to manage, though the monetary value depends on the vision/hearing benefits actually used.

**Orthodontics:** Not covered on any state version. (SSOT `orthodontics`) Families with kids needing braces must look elsewhere for orthodontic coverage.

### 2.2 Aetna Dental Direct -- CVS ExtraCare Plus Perks for the Family

**Who the perk serves:** The CVS ExtraCare Plus membership is included on the Direct Preferred PPO and Core PPO tiers. It requires a one-time registration through Aetna. (SSOT `cvs_extracare_plus`) For a family household, every enrolled adult member who registers gains access to the perk; it is not a single shared reward pool.

**The perks (from SSOT `cvs_extracare_plus`):**
- $10 monthly bonus reward loading to the ExtraCare card within approximately 72 hours; must be used in a single transaction; does not roll over; excludes prescriptions, alcohol, and gift cards. Up to $120 per enrolled adult per year.
- 20% off CVS Health brand products (non-sale items only).
- Free 1-2 day CVS.com shipping on qualifying orders of $10 or more.
- Free Rx delivery on qualifying prescriptions.

**Family oral-care value:** A family of four buying CVS Health brand toothbrushes, toothpaste, and floss benefits from the 20% brand discount on every purchase. The reward math is per enrolled member, not per policy. (ILLUSTRATIVE: if two adults are enrolled, the household could realize up to $240 per year in combined CVS rewards, assuming monthly redemption.)

**Not available in:** GA, LA, MN, MO, NY, NJ, OK, TX, VA. (SSOT `cvs_extracare_plus`) Families in those 9 states receive no CVS perk.

**Waiting-period waiver for families:** The 6-month basic and 12-month major waits are waived if **all enrolled family members** had dental coverage within the past 90 days of enrollment. (SSOT `waiting_periods`) A family coming off employer dental mid-year can potentially access basic and major coverage immediately as long as no member had a gap longer than 90 days.

**Deductible structure for families:** $50 individual / $150 family per calendar year, applying to basic and major only. (SSOT `deductible`)

### 2.3 Mutual of Omaha Dental Preferred -- The 65+ and Medicare-Adjacent Buyer

**Why Mutual of Omaha fits the 65+ buyer:**
- No waiting periods on any service tier -- preventive, basic, and major are all available day one. (SSOT `waiting_periods`) Seniors who often arrive with deferred dental needs cannot afford to wait 6 to 12 months.
- Guaranteed-issue, community-rated pricing. (SSOT positioning notes) No medical underwriting, no age-based premium increase banding like health insurance. Premiums vary by state/ZIP but not by age. This is a real financial advantage for a 65+ buyer versus an age-banded plan.
- Selectable annual maximum of $1,500, $3,000, or $5,000. (SSOT `annual_maximum`) A retired couple on a fixed income can choose the $1,500 tier to manage premium cost, or the $5,000 tier if significant restorative work is anticipated.
- Age-neutral pricing on Ameritas is also relevant here (see 2.5 below).
- No orthodontics coverage, so irrelevant to the 65+ profile. (SSOT `orthodontics`)

**Major coverage ramp:** Major services pay 20% in year one, rising to 50% in year two and after. (SSOT `coverage_major`) Day-one availability at 20% means a senior who needs an urgent crown is not locked out, but the real savings come in year two. Planning dental work with this ramp in mind is key.

**Implant benefit:** $3,000 lifetime implant maximum on Mutual Dental Preferred (separate from the calendar-year maximum, does not reset annually). (SSOT `implants`) For a retiree considering a single implant, $3,000 lifetime covers most of the surgical placement phase at the year-two 50% rate on a typical $3,000-$4,500 implant case.

**Medicare context:** Original Medicare (Parts A and B) does not cover routine dental. Medicare Advantage plans vary widely by carrier and plan design. Mutual of Omaha individual dental is a standalone supplemental policy, not a Medicare Advantage rider. Seniors who have Medicare Advantage with limited dental coverage can buy this plan on top as a standalone supplement. **Verify with the enrollee whether their Medicare Advantage plan's dental benefit would create a coordination-of-benefits issue before recommending a second standalone plan.** This is a flag for the page to include a disclaimer; it is not something CoverCapy can adjudicate.

### 2.4 Guardian Premier PPO -- Braces for Kids

**Child orthodontics coverage:**
- Covered for dependents under age 19 when the active appliance (braces) is first placed.
- In-network: 60%. Out-of-network: 50%.
- $750 per benefit year maximum.
- $1,500 lifetime maximum per covered child.
- 12-month waiting period from enrollment date (WA: 6 months, MN: 9 months).
- Adult orthodontics: not covered on any Guardian individual plan.

(All from SSOT `orthodontics`)

**What this means for a family with kids who need braces:**
- A child in active braces treatment incurs orthodontic fees typically spread across 18-30 months. At 60% in-network, the plan pays up to $750 per benefit year toward orthodontic charges.
- Because the maximum is $750/year and $1,500 lifetime, the full benefit pays out over at least two benefit years. A family enrolling a child in year one before braces start (to satisfy the 12-month wait) can then draw the $750 year-two benefit and $750 year-three benefit, totaling $1,500 in plan payments over the course of treatment.
- The $50 per-person deductible does not apply separately to ortho (unlike Delta, which has a separate $50 ortho deductible). (SSOT `deductible`)
- Day-one basic (85%) coverage means the parent and sibling who need fillings while the child is in braces are covered immediately.

**What Guardian does NOT do:** Adult braces and Invisalign for adults are not covered on any Guardian individual plan. (SSOT `do_not`) A parent who also wants orthodontics needs to look at Delta Dental PPO Premium.

**12-month re-enrollment lockout:** Families should not cancel a Guardian plan that has active orthodontic treatment in progress. If the plan is cancelled, the lockout prevents re-enrollment for 12 months, and the child would lose in-progress ortho coverage. (SSOT `activation`)

### 2.5 Delta Dental PPO Premium -- Braces for Adults (and Kids)

**Adult and child orthodontics:**
- Both adults and dependent children covered at 50% after a 12-month wait.
- $1,500 lifetime maximum per person.
- Separate $50 orthodontic deductible per person.
- Invisalign and clear aligners covered on the same terms as traditional braces.
- Available on the broker-sold Individual Premium tier, not on ACA-exchange certificates.

(All from SSOT `orthodontics`)

**The adult braces angle for families:** If both parents want orthodontic treatment (traditional braces or Invisalign), Delta is the only featured plan that covers both. At 50% up to a $1,500 lifetime maximum per person, a family with two adults each in braces (typical cost: $4,000-$6,000 each) could receive up to $1,500 per adult in plan payments, or $3,000 total for the couple, after the 12-month wait.

**Separate ortho deductible:** The $50 ortho deductible is in addition to the standard $50/$150 medical/dental deductible. A family with two adults in orthodontic treatment would each pay a $50 ortho deductible, for a total $100 ortho deductible exposure at the start.

**Missing-tooth exclusion on implants:** An initial-placement implant or prosthodontic replacement for a tooth extracted before the policy was in force is not covered (clause applies to Premium renewals from August 2025, except California). (SSOT `implants`) This is relevant for families who had a member lose a tooth before enrolling; they cannot claim an implant for that tooth.

**Geographic limitation:** The individual PPO Premium plan is sold in only 16 states plus DC, not nationwide. (SSOT `do_not`) Confirm availability in your state before recommending.

---

## 3. Worked Family-Cost Examples (Illustrative)

All cost figures for dental procedures are illustrative estimates based on national average ranges from ADA and FAIR Health. Plan payments are calculated from SSOT-confirmed coinsurance rates. Actual out-of-pocket costs will vary by provider, geography, negotiated in-network rates, and individual benefit year timing.

### Example A: The Active Family (2 adults, 2 kids) on Aetna Dental Direct, Year One

**Household:** Two adults (Adam and Anne, ages 38 and 36) and two kids (Ben, 9, and Clara, 7). All four enroll together in January with proof of prior dental coverage within 90 days (waits waived on all four).

**Annual premium (estimate):** ~$50/mo x 4 members = ~$200/mo, or ~$2,400/year. (SSOT `monthly_premium`, labeled estimate; actual varies by ZIP and age.)

**Events in the year:**
- Adam: 2 cleanings + exam (preventive, 100%, no deductible) + 1 filling (basic, 80%, $50 deductible)
- Anne: 2 cleanings + exam (preventive, 100%) + 1 crown (major, 50%, $50 deductible; waits waived)
- Ben: 2 cleanings + exam (preventive, 100%)
- Clara: 2 cleanings + exam (preventive, 100%) + 1 filling (basic, 80%, but family deductible cap applies)

**Deductible math:** Adam pays $50 deductible (basic). Anne pays $50 deductible (major). Ben has no deductible-triggering services. Clara needs a filling: her $50 individual deductible would apply, but only Adam and Anne have paid theirs ($100 total). The family cap is $150. Clara's $50 would bring the total to $150, meeting the family cap. So Clara does pay her $50 deductible on the filling.

(Family deductible cap from SSOT `deductible`: "$50 individual, $150 family per CALENDAR YEAR.")

**Illustrative cost breakdown:**

| Member | Service | Illustrative Charge | Plan Pays | Member Pays |
|---|---|---|---|---|
| Adam | Filling (after $50 deductible) | $250 | $160 (80%) | $90 ($50 ded + $40 coinsurance) |
| Anne | Crown (after $50 deductible; wait waived) | $1,600 | $775 (50%) | $825 ($50 ded + $775 coin) |
| Ben | Preventive (4 visits) | $400 | $400 (100%) | $0 |
| Clara | Filling (after $50 deductible; family cap met) | $250 | $160 (80%) | $90 ($50 ded + $40 coin) |

**Total household out-of-pocket (services only, excluding premium):** ~$1,005

**Per-person maximum check:** Anne's $775 plan payment on the crown is below her $1,250 individual maximum. All members stay well under their individual caps.

**CVS perk value (if not in an excluded state):** Adam and Anne each earn up to $10/month in CVS rewards = up to $240 combined in the year.

### Example B: The Kids-in-Braces Family on Guardian Premier PPO, Year Two (Post-Wait)

**Household:** Two adults (David and Eva, ages 42 and 40) and one child in braces (Finn, 13). Enrolled January of prior year; 12-month wait on ortho has now elapsed. David and Eva need basic work. Guardian Premier PPO; in-network.

**Annual premium (estimate):** ~$70/mo x 3 members = ~$210/mo, or ~$2,520/year. (SSOT `monthly_premium`, labeled estimate.)

**Events in year two:**
- David: 2 cleanings + exam (preventive, 100%) + 2 fillings (basic, 85% day one, no wait)
- Eva: 2 cleanings + exam (preventive, 100%) + 1 crown (major, 60% in-network, 12-month wait elapsed)
- Finn: 2 cleanings + exam (preventive) + orthodontic charges for the year

**Illustrative cost breakdown:**

| Member | Service | Illustrative Charge | Plan Pays | Member Pays |
|---|---|---|---|---|
| David | 2 fillings (after $50 ded) | $500 | $382.50 (85%) | $117.50 ($50 ded + $67.50 coin) |
| Eva | Crown (after $50 ded) | $1,600 | $930 (60%) | $670 ($50 ded + $620 coin) |
| Finn | Orthodontics (year 2 of treatment) | $1,500 billed | $750 (60%, up to $750/yr max) | $750 |

**Guardian ortho cap:** The plan pays up to $750 per benefit year on Finn's braces. Finn's orthodontist bills $1,500 this year; the plan pays $750, the family pays $750. Over two benefit years of active treatment, Finn draws the full $1,500 lifetime maximum. (SSOT `orthodontics`)

**Adult braces note:** If David or Eva also wanted braces, Guardian would not cover it. They would need Delta Dental PPO Premium or pay out of pocket.

### Example C: The Retiree Couple on Mutual of Omaha Dental Preferred ($5,000 tier), Year One vs. Year Two

**Household:** George (68) and Helen (66), both enrolled in Mutual Dental Preferred at the $5,000 annual maximum tier. Both on Medicare; no employer dental. Enrolled in January. No waiting period on anything.

**Annual premium (estimate):** ~$90/mo x 2 members = ~$180/mo, or ~$2,160/year. (SSOT `monthly_premium`, labeled estimate; community-rated, varies by state/ZIP.)

**George's year-one dental needs:** 1 crown (major, urgent) + 2 cleanings + exam
**Helen's year-one dental needs:** 2 cleanings + exam (preventive only)

**Year-one illustrative costs:**

| Member | Service | Illustrative Charge | Plan Pays | Member Pays |
|---|---|---|---|---|
| George | Crown, year one (after $50 ded; major 20% yr 1) | $1,600 | $310 (20%) | $1,290 ($50 ded + $1,240 coin) |
| Helen | Preventive (4 visits, 100%) | $400 | $400 (100%) | $0 |

**Year-two scenario for George (second crown needed):**

| Member | Service | Illustrative Charge | Plan Pays | Member Pays |
|---|---|---|---|---|
| George | Crown, year two (major 50% yr 2; after $50 ded) | $1,600 | $775 (50%) | $825 ($50 ded + $775 coin) |

The difference in plan payment from year one ($310) to year two ($775) is $465 on a single crown. This illustrates the financial advantage of the loyalty ramp. A retiree with known restorative needs should enroll before those needs are acute to benefit from the year-two step-up. (SSOT `coverage_major`)

**Implant consideration:** If George loses a tooth and needs an implant, the lifetime implant maximum is $3,000 on Mutual Dental Preferred, separate from the $5,000 annual maximum. (SSOT `implants`) A typical implant (surgical placement plus crown) can run $3,000-$4,500; at 50% in year two, the plan pays up to $1,500 from the dental maximum plus up to $1,500 more from the implant lifetime max if structured properly -- but this interaction requires verification of exactly how the sub-max and main max coordinate before publishing specific dollar scenarios.

---

## 4. Summary: Which Plan Wins on Which Family Dimension

| Family Need | Best Featured Plan | Key SSOT Basis |
|---|---|---|
| Kids' braces | Guardian Premier PPO | `orthodontics`: 60% in-network, $1,500 lifetime, child under 19 |
| Adult braces (or both parents) | Delta Dental PPO Premium | `orthodontics`: 50%, adults AND children, $1,500 lifetime |
| Highest per-person ceiling for big cases | MetLife NCD Complete | `annual_maximum`: $10,000/person/year |
| Family capacity at $5,000/person | Humana Extend 5000 or Mutual of Omaha (at $5K tier) | `annual_maximum` in each SSOT |
| No waiting periods, day-one major (older enrollees) | Mutual of Omaha Dental Preferred | `waiting_periods`: none on any tier |
| CVS retail perks for the household | Aetna Dental Direct | `cvs_extracare_plus`: $10/mo reward + 20% CVS Health brand |
| Family deductible cap explicitly confirmed | Aetna Dental Direct, Delta Dental PPO Premium, UHC Primary | `deductible` fields in each SSOT |
| Loyalty ramp deepest (plan gets better every year) | MetLife NCD Complete | `coverage_basic` and `coverage_major`: 3-year graduation |
| Age-neutral pricing (65+ buyer) | Ameritas PrimeStar, Mutual of Omaha | Positioning notes in each SSOT |

---

## 5. Items Needing Verification Before Publishing

The following items are NOT confirmed in the SSOTs and must be verified against primary carrier sources before being published on any page:

1. **Guardian Premier PPO family deductible cap:** The SSOT `deductible` field states "$50 per person, waived for in-network preventive" but does not list a family cap. Verify whether Guardian applies a $150 (or other) family cap on the Advantage Premier 2.0 individual plan.

2. **Humana Extend 5000 family/dependent pricing discount:** The SSOT notes "family/dependent add-on discount available" but does not state the discount amount or eligibility rule. Verify exact family pricing from Humana enrollment materials or a benefits representative.

3. **Humana Extend 5000 family deductible cap:** The SSOT lists $75 per person but no family cap. Verify whether a family maximum deductible applies (e.g., $150 or $225).

4. **Mutual of Omaha family deductible cap:** SSOT `deductible` states $50 on Mutual Dental Preferred but no family cap. Verify the family deductible structure from the benefit grid or policy form DNT2.

5. **Ameritas PrimeStar base-state family deductible cap:** The SSOT explicitly warns that the "max 3 deductibles per family" note is on the WA Advantage Plus brochure (GR 7500 WA 2-26) only, NOT the base-state Care Complete table. Verify whether any family cap applies in base states before publishing it.

6. **Mutual of Omaha implant sub-max interaction with annual max:** The SSOT confirms the $3,000 lifetime implant maximum is "separate from the calendar-year maximum," but how implant claims are allocated between the lifetime sub-max and the calendar-year max is not detailed. Verify the exact claim payment sequencing for a real family implant scenario.

7. **Medicare Advantage coordination of benefits with Mutual of Omaha standalone dental:** No SSOT addresses whether Mutual of Omaha dental pays as secondary when a Medicare Advantage plan includes dental benefits. This is an important gap for the 65+ buyer scenario. Research carrier policy or add a disclosure.

8. **Humana Extend 5000 activation timing for family add-ons:** The SSOT notes "~1 week" activation but also says this is from CoverCapy/Humana enrollment notes, not the brochure. If dependents are added, confirm whether the same timeline applies to dependents enrolled after the primary member.

9. **Aetna Dental Direct CVS ExtraCare Plus: per-member vs. per-policy reward:** The SSOT and flyer describe a $10 monthly reward loading to "the ExtraCare card" but do not clarify whether each enrolled adult gets a separate $10/month or whether the reward is per policy. Verify before publishing the $240/year two-adult household projection. (The ILLUSTRATIVE figure in Example A is flagged as illustrative for this reason.)

10. **Delta Dental PPO Premium state availability for family enrollment:** The plan is available in only 16 states plus DC (SSOT `do_not`). Confirm which states allow all four family members to enroll, and whether dependent children have the same access as adults to the orthodontic benefit in all available states.

---

## 6. Sources

**SSOT files (primary, authoritative for all plan-specific numbers):**
- `/data/plans/aetna-dental-direct.md` (last verified 2026-06-26)
- `/data/plans/ameritas-primestar.md` (last verified 2026-06-26)
- `/data/plans/delta-dental-ppo-premium.md` (last verified 2026-06-26)
- `/data/plans/guardian-premier-ppo.md` (last verified 2026-06-26)
- `/data/plans/humana-extend-5000.md` (last verified 2026-06-26)
- `/data/plans/metlife-ncd-complete.md` (last verified 2026-06-26)
- `/data/plans/mutual-of-omaha-dental.md` (last verified 2026-06-26)
- `/data/plans/uhc-primary-dental.md` (last verified 2026-06-26)

**General concept sources (family deductible mechanics, annual maximum mechanics):**
- Delta Dental, "What are family deductibles?": https://www.deltadental.com/protect-my-smile/dental-insurance-101/family-deductibles/ (fetched 2026-06-26)
- Delta Dental, "What is a dental insurance annual maximum?": https://www.deltadental.com/protect-my-smile/dental-insurance-101/what-is-dental-insurance-annual-maximum/ (fetched 2026-06-26)
- Ameritas, "Explaining Annual Maximum and Other Dental Plan Terms": https://www.ameritas.com/insights/for-agents-explaining-annual-maximum-and-other-dental-plan-terms/ (fetched 2026-06-26)
- Direct Benefits Marketplace, "Dental Annual Maximums Explained": https://directbenefits.com/articles/dental-insurance/dental-annual-maximums-explained (fetched 2026-06-26)

**Illustrative procedure cost ranges:**
- Procedure cost estimates (fillings, crowns, implants, orthodontics) are illustrative national averages. Actual charges vary by region, dentist, and procedure complexity. Not sourced from a single primary document; label all as illustrative on any published page.
