# Scenario Matrix: Life-Event Situations Mapped to Featured Plans
## PPO Plans Hub Rebuild -- Spec 06
**Status:** Complete  
**Last updated:** 2026-06-26  
**Author note:** Every plan attribute cited below traces to the named SSOT field. Do not forward-port a fact without re-checking the SSOT. No em-dashes used anywhere in this file.

---

## How to read this matrix

Each scenario row covers:
- **Emotional hook** -- the feeling driving the search
- **Decisive attribute** -- the single plan feature that tips the decision
- **Recommended plan(s)** -- from the 8 featured SSOTs (in priority order)
- **SSOT citation** -- field name and value from the relevant `data/plans/{slug}.md`
- **Story angle** -- the one-line narrative frame for the page
- **Flags** -- notes on partial fits, caveats, or plan limits that must be disclosed

---

## Scenario 1: Cracked or broken tooth / pain right now

**Emotional hook:** Panic. Something is wrong today. They need to know a plan will help them act fast, not make them wait 12 months for a crown.

**Decisive attribute:** No waiting period on major work, or the fastest available path to major coverage.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Ameritas PrimeStar Care Complete | No waiting periods on ANY category including major and implants. Coverage can begin as soon as the next day. SSOT: `waiting_periods: "None on any category"`, `activation: "Coverage can begin as soon as tomorrow"` |
| 2 | Mutual of Omaha Dental Preferred | No waiting period on major. Major available day one at 20% (year one), rising to 50% in year two. SSOT: `waiting_periods: "NONE"`, `coverage_major: "20% in year one, rising to 50% in year two and after"` |
| 3 | MetLife NCD Complete | No waiting period on major. Pays 10% in year one, 50% in year two, 60% in year three. High $10,000 ceiling means a crown plus root canal is unlikely to hit the cap. SSOT: `waiting_periods: "None on preventive, basic or major"`, `coverage_major: "10% year 1, 50% year 2, 60% year 3+"`, `annual_maximum: "$10,000 per calendar year"` |

**Story angle:** "Your tooth broke on a Tuesday. By Wednesday you could have coverage."

**Flags:**
- Ameritas year-one major rate is only 20% in-network (SSOT: `coverage_major: "20% in-network year one"`). Be honest: the plan covers the work from day one but only at 20% the first year. Members who can push non-emergency crowns to year two get 50%.
- Mutual of Omaha major is also 20% in year one. Disclose the graduated structure so buyers do not expect 50% at first use.
- MetLife major is 10% in year one. For a $1,500 crown, year-one reimbursement is $150. Disclose this.
- Guardian, Humana, Aetna, Delta Dental all have waiting periods on major (12 months for Guardian/Delta/Aetna, 6 months for Humana). None of those three are the right fit here.

---

## Scenario 2: Lost a job / COBRA gap

**Emotional hook:** Stress and urgency. COBRA dental is expensive. They need something affordable that starts fast, especially for a family worried about the basics.

**Decisive attribute:** Low premium, fast activation, no waiting period on preventive and basic.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | UHC Primary Dental | Lowest premium on the shelf (~$30/mo estimate). No wait on preventive or basic. Coverage as soon as the next business day. SSOT: `monthly_premium: "~$30/mo"`, `waiting_periods: "None on preventive or basic"`, `activation: "As soon as the day after the application is received"` |
| 2 | Aetna Dental Direct | ~$50/mo estimate, 6-month basic wait WAIVED if prior dental coverage ended within 90 days (i.e., if they just lost employer dental, the wait is gone). SSOT: `waiting_periods: "Both waits waived if all enrolled family members had dental coverage within the past 90 days of enrollment"`, `monthly_premium: "~$50/mo"` |
| 3 | Ameritas PrimeStar Care Complete | ~$60/mo estimate (average $55.79/mo per brochure GR 7708 3-26), no waiting periods at all, next-day coverage. SSOT: `waiting_periods: "None on any category"`, `monthly_premium: "~$60/mo (estimate)"` |

**Story angle:** "You left your job Friday. Don't leave your teeth unprotected Monday."

**Flags:**
- UHC Primary Dental does NOT cover major work (crowns, root canals, bridges). This is a known, hard exclusion. SSOT: `coverage_major: "Not covered"`. If the buyer has a crown appointment coming up, UHC Primary Dental is the wrong plan; redirect to Ameritas or Mutual of Omaha.
- Aetna's waiver of the 6/12-month waits requires ALL enrolled family members to have had prior coverage within 90 days. If some family members were on CHIP or uninsured, the waiver may not apply.
- UHC Primary Dental is not available in New York (SSOT: `not_in_ny`). Geo-target accordingly.
- Age cap on UHC: adults 18 to 64 only (SSOT: `monthly_premium` note on age-banded pricing; plan-page sourced).

---

## Scenario 3: New job with a benefits waiting period (90 days to 6 months)

**Emotional hook:** Anticipation and frustration. They have a job with good dental coming, but not yet. They want bridge coverage that is easy to cancel when benefits kick in.

**Decisive attribute:** Month-to-month flexibility (no long lock-in), low premium, fast start.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | UHC Primary Dental | Cheapest bridge option (~$30/mo). Fast start. Covers preventive and basic day one. SSOT: `monthly_premium: "~$30/mo"`, `activation` |
| 2 | Ameritas PrimeStar Care Complete | Age-neutral pricing (SSOT: `monthly_premium: "age-neutral, pricing set by location/ZIP not age"`), no waiting periods, next-day start. Good for older workers who would pay more on age-banded plans. |
| 3 | Aetna Dental Direct | If they had prior dental coverage within 90 days (from old employer), both waits are waived. Covers major work in year one at 50% (waived wait scenario). SSOT: `waiting_periods` waiver field |

**Story angle:** "Your new benefits don't start for 90 days. Cover the gap for about $1 a day."

**Flags:**
- Guardian Premier 2.0 has a 12-month minimum enrollment commitment and a 12-month re-enrollment lockout after cancellation (SSOT: `activation: "Minimum 12-month enrollment commitment; 12-month re-enrollment lockout applies after cancellation"`). It is the WRONG plan for a short bridge scenario. Do not recommend it here.
- Delta Dental starts in about 5 days and has a 6-month basic wait plus 12-month major wait. For a 90-day bridge it is not ideal unless the waiver applies.
- Humana has a 6-month implant wait that can NEVER be waived (SSOT: `waiting_periods: "implants 6-month wait (cannot be waived)"`).

---

## Scenario 4: Need a crown or root canal soon (scheduled, not emergency)

**Emotional hook:** Dread at the cost. They already have a diagnosis and a quote. They want coverage that will pay something on a crown or root canal as soon as possible.

**Decisive attribute:** Shortest wait to major coverage at the highest reimbursement rate, or waivable major wait.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Ameritas PrimeStar Care Complete | No major wait at all. Crown and root canal (endodontics is explicitly listed as Type 4 major) covered day one at 20% in year one. SSOT: `coverage_major: "20% in-network year one (10% OON), rising to 50% in-network after year one"`, `waiting_periods: "None"` |
| 2 | Mutual of Omaha Dental Preferred | No major wait. Crown/root canal day one at 20%, rising to 50% in year two. SSOT: `coverage_major`, `waiting_periods: "NONE"` |
| 3 | Aetna Dental Direct | 12-month major wait, but WAIVED if all family members had dental coverage within 90 days. A buyer who just lost employer dental can potentially get the major wait waived. Then 50% on crown/root canal. SSOT: `coverage_major: "plan pays 50%"`, `waiting_periods` waiver |
| 4 | Humana Extend 5000 | 6-month major wait (shortest fixed wait on the shelf for major). Year one 50% after the 6-month wait, then 60% in year two. SSOT: `coverage_major: "Year one 50% after deductible following a 6-month wait"`, `waiting_periods` |

**Story angle:** "Your dentist says you need a crown. Here's which plan helps most, fastest."

**Flags:**
- Year-one major rates at 20% (Ameritas, Mutual of Omaha) or 10% (MetLife NCD) are low. On a $1,500 crown: Ameritas pays $300 in year one (20%), Mutual of Omaha pays $300. Ameritas then pays $750 in year two (50%). Disclose real dollar math.
- Guardian has a 12-month major wait with no waiver option beyond state exceptions (WA/MN). Do not recommend for this scenario.
- Delta Dental 12-month major wait, waivable with prior major coverage and no more than 63-day gap (SSOT: delta-dental-ppo-premium `waiting_periods`).
- Implants are a sub-scenario; see Scenario 8.

---

## Scenario 5: New baby or kids needing first cleanings

**Emotional hook:** New parent anxiety mixed with pride. They want their child covered for checkups and X-rays with as little friction as possible.

**Decisive attribute:** Preventive 100% day one (no wait, no deductible), family plan availability, reasonable premium.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Aetna Dental Direct | 100% preventive from day one, deductible waived. Large network (442,000+ locations). Family deductible caps at $150/calendar year (SSOT: `deductible: "$50 individual, $150 family per CALENDAR YEAR"`). CVS ExtraCare Plus perk is a family-friendly bonus. SSOT: `coverage_preventive: "100% in-network (no cost) from day one"` |
| 2 | Guardian Premier 2.0 | 100% preventive from day one (deductible waived in-network). 85% on basic (fillings) day one, the highest day-one basic rate on the shelf. Covers child orthodontics down the road (dependents under 19, 60% in-network after 12-month wait). Good for a family that wants preventive today and braces optionality for the future. SSOT: `coverage_preventive: "100% in-network (deductible waived)"`, `coverage_basic: "85% in-network...from day one"`, `orthodontics: "Child only (covered dependents under 19...)"` |
| 3 | Humana Extend 5000 | Bundles dental + vision + hearing on one plan (not in NY). 100% preventive day one. Family/dependent add-on discount available. SSOT: `coverage_preventive: "100% in-network with no deductible from day one"`, `monthly_premium: "family/dependent add-on discount available"` |

**Story angle:** "Your baby's first tooth is in. Get them covered for cleanings before the year is out."

**Flags:**
- UHC Primary Dental covers preventive at 100% but does NOT cover major work. Adequate for checkups but not for a child who might need fillings or oral surgery. SSOT: `coverage_basic: "50% from day one"` (fillings covered), `coverage_major: "Not covered"`.
- Ameritas does not cover orthodontics or whitening on Care Complete (SSOT: `orthodontics: "Not covered on Care Complete"`). Fine for preventive, but no ortho runway.

---

## Scenario 6: Kids needing braces

**Emotional hook:** Sticker shock. Orthodontist quoted $5,000 to $8,000 for braces. Parents want help.

**Decisive attribute:** Child orthodontics covered, with the highest lifetime orthodontic maximum.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Guardian Premier 2.0 | THE child-braces plan on this shelf. Covers dependent children under 19 at 60% in-network (50% OON) after a 12-month wait, up to $750 per benefit year and $1,500 lifetime maximum. SSOT: `orthodontics: "Child only (covered dependents under 19 when the active appliance is first placed) at 60% in-network (50% out-of-network) after a 12-month wait; $750 per benefit year and $1,500 lifetime orthodontic maximum"` |
| 2 | Delta Dental PPO Premium | Covers both children and adults at 50% in-network after a 12-month wait, $1,500 lifetime maximum, separate $50 ortho deductible. SSOT: `orthodontics: "Adults AND dependent children at 50% after a 12-month wait; $1,500 lifetime orthodontic maximum per person; separate $50 ortho deductible"` |

**Story angle:** "The orthodontist's quote arrived. Here's the plan that pays 60% on those braces."

**Flags:**
- The 12-month wait is non-negotiable on both plans. This is not waivable for orthodontics (the waiver for prior coverage applies to major work, not ortho). Buyers must enroll at least 12 months before the appliance is placed, or the benefit does not apply. Disclose this prominently.
- Guardian's $1,500 lifetime orthodontic maximum pays out over at least two benefit years ($750/yr cap). SSOT `do_not`: "Do NOT present the child ortho benefit as a lump sum." A full braces case typically costs $5,000 to $8,000; the plan is a partial offset, not full coverage. Be clear that $1,500 maximum means $1,500 toward a multi-thousand dollar cost.
- Guardian covers children under 19 when the active appliance is FIRST PLACED (SSOT: `orthodontics`). If the child turns 19 during treatment, the benefit was established at first placement, but confirm with carrier.
- Aetna Dental Direct does NOT cover orthodontics. SSOT: `orthodontics: "Not covered on any Dental Direct tier"`.
- Humana Extend 5000 does NOT cover orthodontics. SSOT: `orthodontics: "Not covered (orthodontic services are an explicit exclusion in all three brochures)"`.
- UHC Primary Dental does NOT cover orthodontics. SSOT: `orthodontics: "Not covered"`.
- Ameritas Care Complete does NOT cover orthodontics. SSOT: `orthodontics: "Not covered on Care Complete"`.
- MetLife NCD Complete does NOT cover orthodontics or whitening. SSOT: `orthodontics: "Not covered"`.
- Mutual of Omaha does NOT cover orthodontics. SSOT: `orthodontics: "Not covered"`.

---

## Scenario 7: Adult wanting braces or Invisalign

**Emotional hook:** Self-improvement. An adult (25 to 55) finally wants to fix their bite or straighten their smile. Adult braces/Invisalign are expensive and rarely covered.

**Decisive attribute:** Adult orthodontics explicitly covered (rare on individual plans). Invisalign/clear aligner coverage.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Delta Dental PPO Premium | The only featured plan that explicitly covers ADULT orthodontics. 50% in-network after a 12-month wait, $1,500 lifetime maximum, separate $50 ortho deductible. Invisalign/clear aligners covered on the same terms as braces. SSOT: `orthodontics: "Adults AND dependent children at 50% after a 12-month wait; $1,500 lifetime orthodontic maximum per person"` and `"Invisalign/clear aligners covered on the same terms as braces"` |

**Story angle:** "Adult braces used to mean paying every cent yourself. Delta Dental covers adults too."

**Flags:**
- Guardian Premier 2.0 does NOT cover adult orthodontics. SSOT `do_not`: "Do NOT list adult orthodontics as covered. Orthodontics is covered dependents under 19 ONLY."
- Delta's $2,000 annual maximum is shared across all covered services. A full orthodontic case may exceed the cap in year one. The buyer should understand the $1,500 lifetime orthodontic maximum is hit after at least one to two plan years, and the $2,000 annual cap is the real binding constraint. SSOT: `annual_maximum: "$2,000 per person, per calendar year"`.
- Delta Dental PPO Premium (broker-sold) is only available in 16 states plus DC as an individual plan. SSOT: `do_not`: "Individual PPO is sold in only 16 states plus DC, not nationwide." Verify availability before recommending.
- The missing-tooth/initial-placement exclusion in Delta's brochure applies to prosthodontics (clause 36, AL 2025), but orthodontics is a separate service type, so this does not directly affect ortho eligibility. Still, confirm enrollment before any orthodontic evaluation if there is a gap in coverage.
- No other featured plan covers adult orthodontics. This is a one-plan scenario. Flag: Delta is the only option here; if Delta is unavailable in the buyer's state, no featured plan fits.

---

## Scenario 8: Needs implants

**Emotional hook:** Missing tooth or upcoming extraction. The buyer has been told an implant is the best long-term solution. They are weighing cost and want insurance to help.

**Decisive attribute:** Implant coverage from day one (or shortest wait), highest implant reimbursement, and no tight lifetime cap.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | MetLife NCD Complete | Highest annual maximum ($10,000), $3,000 per calendar year implant sub-cap (within the $10,000 maximum). No waiting period. 10% implant coverage in year one, 50% in year two, 60% in year three. SSOT: `annual_maximum: "$10,000 per calendar year"`, `implants: "Covered under the graduated major schedule (10/50/60); capped at $3,000 per CALENDAR YEAR"`, `waiting_periods: "None"` |
| 2 | Ameritas PrimeStar Care Complete | No waiting period on implants. Day one access at 20% in-network year one, 50% in year two. Implant sub-cap: $1,000 year one / $1,500 year two per benefit year, deducted from the annual dental maximum. For staged multi-phase implant cases (bone graft, extraction, placement, abutment, crown) where each phase can be reached without a wait, this is the fastest-access plan. SSOT: `implants: "Covered from day one at the major rate: 20% in-network year one (10% OON), 50% in-network after year one (30% OON). Implant coverage is Type 4, with a separate per-person-per-benefit-year implant maximum...deducted from the annual dental maximum: $1,000 day one, $1,500 year 2+"` |
| 3 | Mutual of Omaha Dental Preferred | No waiting period, day one at 20% major rate, rising to 50% year two. Separate $3,000 LIFETIME implant maximum (not calendar-year). $5,000 annual maximum. SSOT: `implants: "Paid as a major service. Separate LIFETIME implant maximum of $3,000 on Mutual Dental Preferred"`, `waiting_periods: "NONE"` |
| 4 | Humana Extend 5000 | 6-month wait on implants (CANNOT be waived). Year one 50% after the 6-month wait, rising to 60% in year two. Implant sub-caps: $2,000/year and $4,000 lifetime. Good for a single implant timed after a 6-month wait. SSOT: `implants: "Surgical placement covered on the major schedule: year one 50% after deductible, year two and after 60%, following a 6-month wait that cannot be waived; dental implant annual maximum $2,000 per person and lifetime maximum $4,000 per person"` |

**Story angle:** "One implant can cost $3,000 to $6,000. Here's how to get a plan that actually pays toward it."

**Flags:**
- Aetna Dental Direct does NOT cover implants. SSOT: `implants: "Not covered (dental implants and prosthetic restoration of implants are explicitly excluded)"`. Do not recommend for implant buyers.
- Delta Dental PPO Premium implant benefit is 50% after 12-month wait, under the $2,000 shared annual maximum and an initial-placement/missing-tooth exclusion (teeth lost before enrollment are not covered under clause 36, applies to Premium renewals from August 2025, except California). SSOT: `implants`, `do_not`. This plan is low on the list for implant buyers because of the missing-tooth exclusion and the tight $2,000 cap.
- Guardian Premier 2.0 implants have a $1,250 LIFETIME cap. SSOT: `implants: "60% in-network (50% out-of-network) after a 12-month wait, subject to a $1,250 lifetime maximum"`. This is the tightest implant cap on the shelf; not recommended for implant buyers.
- MetLife NCD's year-one implant rate is 10% (major schedule). For a $4,000 implant, that is $400 in year one. Disclose.
- Ameritas $1,000 implant sub-cap in year one is deducted from the annual dental maximum (not additive). SSOT `do_not`: "Do NOT state the implant sub-cap as a separate budget."

---

## Scenario 9: Turning 65 / lost employer dental at retirement

**Emotional hook:** Medicare gap shock. Medicare does not cover routine dental. Retirees discover this and want a plan that does not penalize them for being older, covers the work they expect to need, and is straightforward.

**Decisive attribute:** Community-rated or age-neutral pricing (older adults pay the same as younger enrollees), high annual maximum, no waiting periods, strong major and implant coverage.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Mutual of Omaha Dental Preferred | Community-rated (price is stable regardless of age). No waiting periods on any service. $5,000 selectable annual maximum. $3,000 lifetime implant maximum. Broad DenteMax Plus network (400,000+ locations). Optional vision rider (~$8.28/mo). SSOT: `monthly_premium: "Community-rated, varies by state and ZIP"`, `waiting_periods: "NONE"`, `annual_maximum: "Selectable $1,500 / $3,000 / $5,000 per calendar year"`, `implants: "Separate LIFETIME implant maximum of $3,000 on Mutual Dental Preferred"` |
| 2 | Ameritas PrimeStar Care Complete | Age-neutral pricing (pricing set by location/ZIP, not age). No waiting periods. $2,000 maximum year one, rising to $3,500 after year one. Day-one major and implant access. Hearing benefit included (not in NH). SSOT: `monthly_premium: "age-neutral, pricing set by location/ZIP not age"`, `waiting_periods: "None"` |
| 3 | Humana Extend 5000 | Bundles dental + vision + hearing (FL, GA; dental + vision in NY). High $5,000 annual maximum. 6-month wait on major (shorter than 12-month alternatives). SSOT: `annual_maximum: "$5,000 per person per calendar year"` |

**Story angle:** "Medicare doesn't cover your dentist. Here's the plan retirees actually use."

**Flags:**
- UHC Primary Dental has an age cap: available for adults 18 to 64 (SSOT: plan-page sourced). Do NOT recommend for the 65+ scenario.
- Guardian Premier 2.0 premiums are age-banded (~$70/mo estimate at age 35). Older buyers may pay significantly more. SSOT: `monthly_premium: "varies by state, ZIP and age"`.
- Delta Dental PPO Premium premiums vary by state, age and ZIP (SSOT: `monthly_premium: "varies by state, age and ZIP"`). Age-banding may make it expensive at 65+. Also only 16 states + DC for individual plans.
- Aetna Dental Direct does not cover implants, which are a common need for the 65+ buyer. SSOT: `implants: "Not covered"`.
- Mutual of Omaha major work is 20% in year one (SSOT: `coverage_major: "20% in year one"`). Disclose graduated structure.

---

## Scenario 10: Just want cheap preventive (cleanings only)

**Emotional hook:** Practicality and price sensitivity. They are healthy, have had no dental issues in years, and just want two cleanings and an exam per year covered so they do not skip them.

**Decisive attribute:** Lowest possible premium with 100% preventive coverage from day one.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | UHC Primary Dental | ~$30/mo estimate (lowest on the shelf). 100% preventive from day one (no deductible). Basic (fillings) at 50% day one rising to 65% then 80%. SSOT: `monthly_premium: "~$30/mo"`, `coverage_preventive: "100% in-network from day one, deductible waived"` |
| 2 | Aetna Dental Direct | ~$50/mo estimate. 100% preventive from day one. CVS ExtraCare Plus perk ($10/mo CVS reward, 20% off CVS Health brand products) included. Good for a buyer who shops at CVS and wants a small lifestyle reward alongside preventive coverage. SSOT: `monthly_premium: "~$50/mo"`, `cvs_extracare_plus` |

**Story angle:** "Two cleanings a year shouldn't cost you $400. It doesn't have to."

**Flags:**
- UHC Primary Dental does NOT cover major work. The buyer who "just wants cleanings" may one day need a filling or crown. Frame this as a preventive-first plan with basic coverage, and note the major work gap.
- Aetna has a 6-month wait on basic (fillings). So in the first 6 months, only preventive is covered (unless the prior-coverage waiver applies). SSOT: `waiting_periods: "Basic 6-month wait"`.
- For buyers in NY: UHC Primary Dental is not available. Aetna's ExtraCare Plus is also not available in NY. SSOT: `not_in_ny` (UHC), `cvs_extracare_plus` (Aetna: "NOT available in...NY").

---

## Scenario 11: Whole family wants one plan

**Emotional hook:** Overwhelm. One plan for two adults and two or more kids feels impossibly complex. They want a single plan that covers the whole household without a per-person deductible disaster.

**Decisive attribute:** Family deductible cap, family add-on discount, high per-person maximum, and coverage that handles both adult and child needs (preventive, basic, possible major).

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Humana Extend 5000 | $5,000 per person annual maximum. Family/dependent add-on discount available. Bundles dental + vision + hearing (not in NY), reducing the number of separate plans a family needs to manage. Deductible $75 per person (waived for preventive in-network). SSOT: `annual_maximum: "$5,000 per person per calendar year"`, `monthly_premium: "family/dependent add-on discount available"`, `deductible: "$75 per person per calendar year"` |
| 2 | Aetna Dental Direct | Family deductible capped at $150/calendar year (after 3 individual deductibles the family pays no more). $1,250 per person annual max. CVS ExtraCare Plus perk for the household. SSOT: `deductible: "$50 individual, $150 family per CALENDAR YEAR"`, waiter rule `"both waits waived if all enrolled family members had dental coverage within past 90 days"` |
| 3 | Guardian Premier 2.0 | $50 per person deductible (waived in-network preventive), $3,000 per person annual maximum, 85% on basic from day one (fillings). If the family has children under 19 who may need braces, this is the plan that covers child ortho ($1,500 lifetime max). SSOT: `deductible: "$50 per person, waived for in-network preventive"`, `annual_maximum: "$3,000 per person per benefit year"`, `coverage_basic: "85% in-network...from day one"`, `orthodontics: child-only field` |

**Story angle:** "One plan. Two adults, two kids, and the braces conversation still three years away. Let's find it."

**Flags:**
- Humana does NOT cover orthodontics. SSOT: `orthodontics: "Not covered"`. If kids are likely to need braces, add Guardian to the comparison.
- Aetna does NOT cover implants or orthodontics. SSOT: `implants: "Not covered"`, `orthodontics: "Not covered on any Dental Direct tier"`.
- Ameritas Care Complete has an annual maximum deductible of $50 per person on basic/major but the "max 3 deductibles per family" cap is stated only on the WA Advantage Plus brochure. Do NOT apply that family cap nationwide. SSOT `do_not`: "Do NOT carry the 'max 3 deductibles per family' note onto base-state Care Complete pages."
- UHC Primary Dental family deductible caps at 3 individual deductibles per calendar year (SSOT: `deductible: "maximum 3 individual deductibles per family per calendar year"`), but major work is not covered. Good for a family with no anticipated major needs.

---

## Scenario 12: Snowbird or relocating (needs broad national network)

**Emotional hook:** Anxiety about finding a dentist in a new place, or needing to split time between two states. They want a plan that works wherever they are.

**Decisive attribute:** Largest possible dentist network (number of locations), PPO out-of-network access (so they are not locked to a region), nationwide availability.

**Recommended plans (in order):**

| Rank | Plan | Why |
|------|------|-----|
| 1 | Delta Dental PPO Premium | Largest dentist network on the shelf: 112,000+ dentists at 278,000+ locations on the PPO network alone. The Premier network adds further reach. SSOT: `network: "Delta Dental PPO plus Premier (PPO network alone: 112,000+ dentists, 278,000+ locations)"` |
| 2 | Aetna Dental Direct | 442,000+ dentist locations (SSOT source: plan page). Very large network, second only to Delta in sheer location count on this shelf. Nationwide PPO access with out-of-network option. SSOT: `network: "Aetna Dental PPO (Direct Preferred PPO tier)"` (location count from plan page at 442,000+ locations) |
| 3 | Mutual of Omaha Dental Preferred | DenteMax Plus network: 400,000+ provider locations. Community-rated (no age penalty), which matters for older snowbirds. SSOT: `network: "DenteMax Plus (more than 400,000 provider locations)"` |
| 4 | Guardian Premier 2.0 | DentalGuard Preferred: 124,000 to 130,000 dentists at 360,000+ office locations. Strong national reach. SSOT: `network: "DentalGuard Preferred (DGP); roughly 124,000-130,000 dentists at 360,000+ office locations"` |

**Story angle:** "You spend winters in Florida and summers in Oregon. Your dentist plan should come with you."

**Flags:**
- Delta Dental PPO Premium individual plan is only available in 16 states plus DC. SSOT `do_not`: "Individual PPO is sold in only 16 states plus DC, not nationwide." A snowbird whose home state is not among them cannot enroll.
- Aetna Dental Direct CVS ExtraCare Plus is not available in 9 states: GA, LA, MN, MO, NY, NJ, OK, TX, VA. SSOT: `cvs_extracare_plus: "NOT available in GA, LA, MN, MO, NY, NJ, OK, TX and VA"`. The dental coverage itself is still available; just the CVS perk is geo-limited.
- Ameritas Care Complete is not available in MA and no dental plans in MA. Also not available in NH for the hearing benefit. SSOT: `sources` (state list). Not all states covered.
- UHC Primary Dental is not available in New York. SSOT: `not_in_ny`.

---

## Summary table

| Scenario | Primary Plan | Runner-up | Key SSOT Attribute | Clean Fit? |
|----------|-------------|-----------|-------------------|------------|
| 1. Cracked tooth / pain now | Ameritas PrimeStar | Mutual of Omaha | No waiting periods (Ameritas `waiting_periods`) | Yes, with caveat (low year-one rate) |
| 2. Lost a job / COBRA gap | UHC Primary Dental | Aetna (waiver) | ~$30/mo, no wait on basic (`monthly_premium`, `waiting_periods`) | Partial (UHC covers no major) |
| 3. New job waiting period | UHC Primary Dental | Aetna (waiver) | Lowest premium, fast start, no Guardian lock-in | Yes |
| 4. Crown or root canal soon | Ameritas PrimeStar | Mutual of Omaha | No major wait, day-one major at 20% | Yes, with caveat (low year-one rate) |
| 5. New baby / first cleanings | Aetna Dental Direct | Guardian Premier | 100% preventive day one, family deductible cap | Yes |
| 6. Kids needing braces | Guardian Premier 2.0 | Delta Dental PPO | 60% child ortho in-network, $1,500 lifetime (`orthodontics`) | Yes (12-month wait required) |
| 7. Adult braces / Invisalign | Delta Dental PPO Premium | None on shelf | Only plan with adult ortho (`orthodontics`) | Partial (state availability, $2,000 cap) |
| 8. Needs implants | MetLife NCD Complete | Ameritas PrimeStar | $10,000 max, $3,000/yr implant sub-cap (`implants`) | Yes, with caveat (10% year one) |
| 9. Turning 65 / retirement | Mutual of Omaha | Ameritas PrimeStar | Community-rated, no wait, $5,000 max (`monthly_premium`) | Yes |
| 10. Cheap preventive only | UHC Primary Dental | Aetna Dental Direct | ~$30/mo, 100% preventive day one (`monthly_premium`) | Yes (buyer must understand major exclusion) |
| 11. Whole family | Humana Extend 5000 | Aetna Dental Direct | $5,000/person max, family discount, dental+vision+hearing | Yes (no ortho on Humana) |
| 12. Snowbird / relocating | Delta Dental PPO Premium | Aetna Dental Direct | 112,000+ dentists / 278,000+ locations (`network`) | Partial (Delta limited to 16 states + DC) |

---

## Scenarios with no clean fit

**Adult braces (Scenario 7):** Delta Dental PPO Premium is the only featured plan covering adult orthodontics, and it is only sold in 16 states plus DC as an individual plan. Buyers outside those states have no featured plan that covers adult braces. Flag on the page.

**Large multi-implant case needing very high lifetime implant budget:** MetLife NCD Complete has the highest annual maximum ($10,000) and a $3,000/yr implant sub-cap, but across two implants the annual cap may still constrain. Mutual of Omaha's lifetime implant cap is $3,000 total (Preferred). No featured plan has an unlimited lifetime implant benefit. Flag on the page and direct buyers to compare across two calendar years.

**Kids braces with short timeline (under 12 months):** Both Guardian (child) and Delta (adult and child) have a 12-month orthodontic waiting period. No featured plan covers braces without a wait. Buyers whose child is already mid-treatment or about to start will not benefit. Flag prominently.

**Implants for teeth lost before enrollment:** Delta Dental PPO Premium carries a missing-tooth/initial-placement exclusion for teeth lost before coverage began (SSOT: `implants` clause 36, AL 2025, applies to Premium renewals from August 2025, except California). Buyers who lost a tooth years ago and now want an implant may not qualify for Delta's implant benefit. Ameritas, Mutual of Omaha, and MetLife NCD do not carry this same missing-tooth clause per their SSOTs; confirm before quoting.

---

*All facts in this file are sourced from the plan SSOTs in `/data/plans/`. Any page copy derived from this matrix must cite the SSOT field, not this file alone. Last SSOT verification date: 2026-06-26.*
