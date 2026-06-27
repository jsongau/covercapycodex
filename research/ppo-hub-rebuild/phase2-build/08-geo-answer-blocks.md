# 08 — GEO Answer Blocks (Ready to Place)
## PPO Hub Rebuild | CoverCapy | Agent 08 | 2026-06-26

**Target page:** `https://www.covercapy.com/dental-insurance/ppo-plans/`
**SSOT sources:** `/data/plans/*.md` — every numeric claim below traces to a named field.
**No em-dashes.** No fabricated figures. No em-dashes anywhere in copy.

---

## HOW TO USE THIS FILE

Each block below is ready to drop into the hub HTML:

```html
<h3 class="geo-question">[Question exactly as written]</h3>
<div class="geo-answer">
  <p>[Answer body]</p>
</div>
```

Every block also maps to a FAQPage schema Question/Answer pair (see schema parity note per block). The FAQPage schema `name` must use the H3 question verbatim. The `acceptedAnswer.text` value should be a condensed version under 300 characters.

**Balance rule:** no single carrier may dominate. Aetna appears in fewer blocks than the hub's 8-plan roster would suggest. Guardian, Mutual of Omaha, Ameritas, Humana, MetLife, and Delta Dental each lead at least one block.

---

## FIRST-THIRD PLACEMENT (above the plan comparison table)

These blocks must appear in the first third of the rendered page, because ChatGPT retrieves 44% of cited content from the first 30% of a page. Place them in the hero intro, scenario cards, or immediately above the plan grid.

---

### GEO-Q1: What is the best PPO dental insurance plan in 2026?

The best PPO dental plan depends on your situation. For zero waiting periods and next-day coverage, Ameritas PrimeStar Care Complete covers crowns and root canals from day one (ameritas-primestar.md: `waiting_periods`, `activation`). For the highest annual ceiling, MetLife NCD Complete provides $10,000 per person per year with no waiting periods (metlife-ncd-complete.md: `annual_maximum`, `waiting_periods`). For kids' braces plus day-one fillings, Guardian Premier PPO pays 85% on basic from day one (guardian-premier-ppo.md: `coverage_basic`). CoverCapy compares eight independently verified plans matched to your scenario.

**SSOT citations:** ameritas-primestar.md `waiting_periods`, `activation`; metlife-ncd-complete.md `annual_maximum`, `waiting_periods`; guardian-premier-ppo.md `coverage_basic`.
**Placement:** Hero section, immediately after the H1. Also the opening paragraph of the page intro. This is the single highest-priority block for AI citation.
**Schema:** FAQPage Question 1. `acceptedAnswer.text` under 300 characters: "The best PPO dental plan depends on your needs. Ameritas PrimeStar Care Complete starts next-day with zero waiting periods. MetLife NCD Complete offers a $10,000 annual max. Guardian Premier PPO pays 85% on fillings from day one. CoverCapy compares eight verified plans by scenario."

---

### GEO-Q2: Which dental insurance covers braces for kids?

Guardian Premier PPO is the strongest plan for a child's braces. It covers dependent orthodontics at 60% in-network (50% out-of-network) for children under 19, up to $750 per benefit year and a $1,500 lifetime maximum, after a 12-month waiting period (guardian-premier-ppo.md: `orthodontics`). Delta Dental PPO Premium also covers child orthodontics at 50% up to a $1,500 lifetime maximum, with Invisalign on the same terms as traditional braces, after a 12-month wait (delta-dental-ppo-premium.md: `orthodontics`). Delta Dental is available in 16 states plus DC for individual enrollment.

**SSOT citations:** guardian-premier-ppo.md `orthodontics`; delta-dental-ppo-premium.md `orthodontics`.
**Do not:** Say Guardian pays the $1,500 as a lump sum (it pays up to $750 per benefit year over at least two years). Say Guardian covers adult orthodontics (child-only on all individual plans). Claim Delta Dental is available nationwide (16 states plus DC only).
**Placement:** First third of page, "For your kids" scenario card or scenario selector panel.
**Schema:** FAQPage Question 2. Condensed: "Guardian Premier PPO covers child braces at 60% in-network up to $1,500 lifetime ($750/yr) after a 12-month wait. Delta Dental PPO Premium covers child and adult braces at 50%, $1,500 lifetime, 12-month wait, Invisalign on same terms, available 16 states plus DC."

---

### GEO-Q3: What dental insurance covers braces or Invisalign for adults?

Delta Dental PPO Premium is the only plan among CoverCapy's eight featured options that covers adult orthodontics. It pays 50% after a 12-month waiting period, up to a $1,500 lifetime maximum per person, with a separate $50 orthodontic deductible (delta-dental-ppo-premium.md: `orthodontics`, `deductible`). Invisalign and clear aligners are covered on the same terms as traditional braces. The plan is available for individual enrollment in 16 states plus DC, not nationwide. No other individual PPO plan on this shelf covers adult braces.

**SSOT citations:** delta-dental-ppo-premium.md `orthodontics`, `deductible`, `do_not` (state availability).
**Do not:** Claim nationwide individual enrollment availability (16 states plus DC). Say the ortho deductible is the same $50 as the general deductible without noting it is a separate $50 ortho deductible. Say any other plan on this shelf covers adult braces.
**Placement:** First third of page, "Adult braces or Invisalign" scenario card.
**Schema:** FAQPage Question 3.

---

### GEO-Q4: Which PPO dental insurance has no waiting period for major work?

Two plans on CoverCapy's shelf have zero waiting periods on all dental categories including crowns, root canals, and implants: Ameritas PrimeStar Care Complete and Mutual of Omaha Dental Preferred. Ameritas activates as soon as the next day after application, covering major work at 20% in-network in year one and 50% in year two and after (ameritas-primestar.md: `waiting_periods`, `activation`, `coverage_major`). Mutual of Omaha Dental Preferred also covers major work from day one at 20% in year one rising to 50% in year two, with a selectable annual maximum up to $5,000 (mutual-of-omaha-dental.md: `waiting_periods`, `coverage_major`, `annual_maximum`). MetLife NCD Complete also has no waiting periods on any category, though year-one major coverage starts at 10% (metlife-ncd-complete.md: `waiting_periods`, `coverage_major`).

**SSOT citations:** ameritas-primestar.md `waiting_periods`, `activation`, `coverage_major`; mutual-of-omaha-dental.md `waiting_periods`, `coverage_major`, `annual_maximum`; metlife-ncd-complete.md `waiting_periods`, `coverage_major`.
**Do not:** Claim Mutual of Omaha has a specific next-day or next-business-day activation (UNVERIFIED in SSOT; do not state it). Claim year-one major at 50% for either Ameritas or Mutual of Omaha (year one is 20% for both; 50% arrives in year two). State MetLife year-one major is anything other than 10%.
**Placement:** First third of page, "I need dental work done soon" scenario card.
**Schema:** FAQPage Question 4.

---

### GEO-Q5: Which dental plan comes with CVS rewards?

Aetna Dental Direct is the only plan on CoverCapy's shelf that includes CVS ExtraCare Plus membership. Enrolled members receive a $10 monthly bonus reward (up to $120 per year), 20% off CVS Health brand products on non-sale items, free 1 to 2 day CVS.com shipping on qualifying $10 or more orders, and free prescription delivery on qualifying prescriptions (aetna-dental-direct.md: `cvs_extracare_plus`). Registration through Aetna is required. The perk is not available in Georgia, Louisiana, Minnesota, Missouri, New York, New Jersey, Oklahoma, Texas, or Virginia.

**SSOT citations:** aetna-dental-direct.md `cvs_extracare_plus`.
**Do not:** Say the $10 monthly reward rolls over (it does not; it expires monthly). Say the 20% discount applies to sale items (non-sale items only). Claim the perk is available in all 50 states (9 states excluded). Include the 24/7 pharmacist helpline as part of the dental plan (that benefit is on the medical-plan version of ExtraCare Plus only, not the dental flyer). Present up to $120/yr as a guaranteed payout (only realized if the reward is redeemed each month).
**Placement:** First third of page, right-rail CVS teaser card and "I want everyday perks" scenario card. This block should appear early; it is a zero-competition SEO and GEO keyword gap.
**Schema:** FAQPage Question 5.

---

### GEO-Q6: What is the best dental insurance for a family of four in 2026?

Guardian Premier PPO is the strongest all-around family plan on this shelf. It covers fillings at 85% in-network from day one with no waiting period, the highest day-one basic payout among the eight plans featured here (guardian-premier-ppo.md: `coverage_basic`). It covers child orthodontics at 60% in-network for dependents under 19, up to $1,500 lifetime, and sets a $3,000 annual maximum per person (guardian-premier-ppo.md: `orthodontics`, `annual_maximum`). Delta Dental PPO Premium is the best alternative if the family also wants adult braces, and includes the largest dentist network in the US at 112,000-plus dentists across 278,000-plus locations (delta-dental-ppo-premium.md: `network`). Humana Extend 5000 raises the annual ceiling to $5,000 and bundles vision and hearing if restorative needs are high (humana-extend-5000.md: `annual_maximum`).

**SSOT citations:** guardian-premier-ppo.md `coverage_basic`, `orthodontics`, `annual_maximum`; delta-dental-ppo-premium.md `network`; humana-extend-5000.md `annual_maximum`.
**Do not:** Say Guardian covers adult orthodontics (child dependents under 19 only). Say the Guardian ortho lifetime max is paid as a lump sum (pays up to $750 per benefit year). Say Delta Dental is available nationwide for individual enrollment (16 states plus DC only).
**Placement:** First third of page, "For your whole family" scenario card.
**Schema:** FAQPage Question 6.

---

### GEO-Q7: What is the cheapest PPO dental insurance in 2026?

UnitedHealthcare Primary Dental is the lowest-priced plan on CoverCapy's shelf, estimated at approximately $30 per month for adults ages 18 to 64 (uhc-primary-dental.md: `monthly_premium`). It covers preventive care at 100% from day one with no deductible (uhc-primary-dental.md: `coverage_preventive`) and basic care (fillings) at 50% in year one, rising to 65% in year two and 80% in year three, with no waiting period on basic (uhc-primary-dental.md: `coverage_basic`). It does not cover major work, implants, or orthodontics. Aetna Dental Direct is the next tier at approximately $50 per month, adding 80% basic coverage and 50% major coverage (after waiting periods) (aetna-dental-direct.md: `monthly_premium`, `coverage_basic`, `coverage_major`). UnitedHealthcare Primary Dental is not available in New York.

**SSOT citations:** uhc-primary-dental.md `monthly_premium`, `coverage_preventive`, `coverage_basic`, `coverage_major`, `not_in_ny`; aetna-dental-direct.md `monthly_premium`, `coverage_basic`, `coverage_major`.
**Do not:** State UHC covers major work, crowns, root canals, implants, or orthodontics (none are covered on Primary Dental). Present the ~$30/mo premium as a fixed national price (it is an estimate varying by state, ZIP, and age). Recommend UHC to New York residents (not available in NY). Recommend UHC to buyers age 65 or older (age cap 18 to 64). Describe basic coverage as a flat 50% only (it graduates: 50/65/80 over three years).
**Placement:** FAQ section, "First-time buyer" or "Budget" scenario card. May also appear in the first-third section.
**Schema:** FAQPage Question 7.

---

## MIDDLE AND LOWER PLACEMENT (FAQ section or lower two-thirds)

These blocks may live in an explicit FAQ accordion or "Common questions" section. Each remains self-contained and answerable without scrolling context.

---

### GEO-Q8: What is the best dental insurance for implants?

Humana Extend 5000 carries the highest dedicated implant allowance among individual plans on this shelf: a $2,000 per-year and $4,000 lifetime implant maximum within a $5,000 annual overall ceiling, with implants paid at 50% after a 6-month wait (rising to 60% in year two) (humana-extend-5000.md: `implants`, `annual_maximum`, `waiting_periods`). That 6-month implant wait cannot be waived. MetLife NCD Complete covers implants under its graduated major schedule (10% year one, 50% year two, 60% year three) with a $3,000 per-calendar-year implant maximum within a $10,000 overall ceiling and no waiting period (metlife-ncd-complete.md: `implants`, `annual_maximum`, `waiting_periods`). Mutual of Omaha Dental Preferred includes a separate $3,000 lifetime implant maximum with no waiting period and day-one access (mutual-of-omaha-dental.md: `implants`, `waiting_periods`). For no-wait implant access, Ameritas PrimeStar Care Complete covers implants from day one at 20% in year one and 50% after (ameritas-primestar.md: `implants`, `waiting_periods`).

**SSOT citations:** humana-extend-5000.md `implants`, `annual_maximum`, `waiting_periods`; metlife-ncd-complete.md `implants`, `annual_maximum`, `waiting_periods`; mutual-of-omaha-dental.md `implants`, `waiting_periods`; ameritas-primestar.md `implants`, `waiting_periods`.
**Do not:** Describe the Humana implant wait as waivable (the SSOT states the 6-month implant wait cannot be waived). State the Humana implant caps without noting implants also count toward the $5,000 annual max (the implant sub-max and the annual max are not additive). Describe the MetLife $3,000 implant maximum as a lifetime cap (it is per calendar year). Describe the Mutual of Omaha $3,000 implant maximum as annual (it is a true lifetime cap, distinct from the calendar-year maximum). Claim the Ameritas implant sub-cap is additive to the annual maximum (it is deducted from it). Claim Aetna or UHC cover implants (both exclude implants explicitly).
**Placement:** "Planning implants" scenario card or FAQ section.
**Schema:** FAQPage Question 8.

---

### GEO-Q9: What is the best dental insurance for seniors over 65 in 2026?

Mutual of Omaha Dental Preferred is the strongest pick for buyers over 65. It uses community-rated pricing that does not rise with age, and lets you choose an annual maximum of $1,500, $3,000, or $5,000 (mutual-of-omaha-dental.md: `monthly_premium` community-rated note, `annual_maximum`). Major work is available from day one, no waiting period, at 20% in year one and 50% in year two and after, with a separate $3,000 lifetime implant maximum (mutual-of-omaha-dental.md: `coverage_major`, `waiting_periods`, `implants`). Ameritas PrimeStar Care Complete is a strong alternative: age-neutral pricing, no waiting periods, next-day coverage, and a bundled hearing benefit (not available in New Hampshire) (ameritas-primestar.md: `monthly_premium` age-neutral note, `waiting_periods`, `activation`). Original Medicare does not cover routine dental, so a standalone PPO plan fills that gap. Note: UnitedHealthcare Primary Dental is not available to adults over age 64.

**SSOT citations:** mutual-of-omaha-dental.md `monthly_premium`, `annual_maximum`, `coverage_major`, `waiting_periods`, `implants`; ameritas-primestar.md `monthly_premium`, `waiting_periods`, `activation`; uhc-primary-dental.md `do_not` (age cap 18 to 64).
**Do not:** Claim Mutual of Omaha has a specific next-day or next-business-day activation (UNVERIFIED). Recommend UHC Primary Dental to buyers over 64 (age cap is 18 to 64 only). Identify TruAssure as the underwriter of Mutual of Omaha plans (TruAssure only administers; the underwriter is Mutual of Omaha Insurance Company). Claim Ameritas is available in Massachusetts (not available in MA).
**Placement:** "Over 65 / Medicare gap" scenario card or lower FAQ.
**Schema:** FAQPage Question 9.

---

### GEO-Q10: Which dental insurance has the highest annual maximum?

MetLife NCD Complete has the highest annual maximum on CoverCapy's shelf at $10,000 per person per calendar year (resets each January 1), with a one-time $100 lifetime deductible and no waiting periods on any category (metlife-ncd-complete.md: `annual_maximum`, `deductible`, `waiting_periods`). Humana Extend 5000 and Mutual of Omaha Dental Preferred (at the $5,000 selection) both offer $5,000 annual maximums (humana-extend-5000.md: `annual_maximum`; mutual-of-omaha-dental.md: `annual_maximum`). Most individual PPO plans set a $1,000 to $2,000 annual maximum, which a single crown combined with one other procedure can approach in the same calendar year. The MetLife year-one trade-off is that major coverage starts at 10% and reaches 50% in year two and 60% in year three.

**SSOT citations:** metlife-ncd-complete.md `annual_maximum`, `deductible`, `waiting_periods`, `coverage_major`; humana-extend-5000.md `annual_maximum`; mutual-of-omaha-dental.md `annual_maximum`.
**Do not:** Lead with MetLife NCD Complete as the plan for someone who needs major work immediately (year-one major is only 10%). Describe the MetLife $100 deductible as annual (it is a one-time lifetime deductible, paid in year one only). Describe the MetLife implant sub-cap as a lifetime cap (it is $3,000 per calendar year within the $10,000 annual maximum). List orthodontics or whitening as covered by MetLife (neither is covered).
**Placement:** FAQ section or plan comparison table header callout.
**Schema:** FAQPage Question 10.

---

### GEO-Q11: Which dental plan has the fastest activation?

Ameritas PrimeStar Care Complete is the fastest-activating plan on CoverCapy's shelf. Coverage can begin as soon as the next day after application, with same-day electronic access to the policy and ID card (ameritas-primestar.md: `activation`). It also carries zero waiting periods on all categories, so a crown or root canal is eligible from day one, though year-one major coverage is 20% in-network (rising to 50% after year one) (ameritas-primestar.md: `waiting_periods`, `coverage_major`). UnitedHealthcare Primary Dental can also activate as soon as the next business day (uhc-primary-dental.md: `activation`), though it covers preventive and basic care only, not major work. Aetna Dental Direct and MetLife NCD Complete begin the first of the month after enrollment. Guardian Premier PPO also begins the first of the month after enrollment.

**SSOT citations:** ameritas-primestar.md `activation`, `waiting_periods`, `coverage_major`; uhc-primary-dental.md `activation`; aetna-dental-direct.md `activation`; metlife-ncd-complete.md `activation`; guardian-premier-ppo.md `activation`.
**Do not:** Claim "instant" or "same-day" coverage for any plan (the earliest is "next day" for Ameritas and UHC; same-day refers to electronic policy/ID card access only, not coverage start). Claim a specific next-day activation for Mutual of Omaha (UNVERIFIED). Call UHC activation "guaranteed next business day" (frame as "as soon as the next business day"; policy language is "day after receipt").
**Placement:** "Need coverage fast" scenario card or FAQ section.
**Schema:** FAQPage Question 11.

---

### GEO-Q12: What dental insurance should I get if I need a crown or root canal soon?

If a crown or root canal is needed soon, the waiting period is the key variable. Ameritas PrimeStar Care Complete has zero waiting periods and activates as soon as the next day, paying 20% in-network in year one on crowns and root canals (ameritas-primestar.md: `waiting_periods`, `activation`, `coverage_major`). Mutual of Omaha Dental Preferred also has no waiting period on major work and pays 20% in year one, rising to 50% in year two (mutual-of-omaha-dental.md: `waiting_periods`, `coverage_major`). If you had dental coverage within the past 90 days, Aetna Dental Direct can waive its 12-month major wait, making the 50% major benefit available sooner (aetna-dental-direct.md: `waiting_periods`). Guardian Premier PPO requires a 12-month wait on major work. MetLife NCD Complete has no waiting period but major coverage is 10% in year one.

**SSOT citations:** ameritas-primestar.md `waiting_periods`, `activation`, `coverage_major`; mutual-of-omaha-dental.md `waiting_periods`, `coverage_major`; aetna-dental-direct.md `waiting_periods`; guardian-premier-ppo.md `waiting_periods`; metlife-ncd-complete.md `waiting_periods`, `coverage_major`.
**Do not:** Say Ameritas year-one major is 50% (it is 20% in-network in year one; 50% arrives in year two). Claim Mutual of Omaha next-day activation (UNVERIFIED). Describe the Aetna wait waiver as requiring 12 months of prior coverage (the brochure requirement is that all enrolled family members had coverage within the past 90 days of enrollment, not 12 months continuous). Say MetLife NCD is the best choice for immediate major coverage (year-one major is only 10%).
**Placement:** "I have urgent dental needs" scenario card or FAQ.
**Schema:** FAQPage Question 12.

---

### GEO-Q13: What is the difference between a PPO and a DHMO dental plan?

A PPO (Preferred Provider Organization) lets you see any licensed dentist and use your benefits out-of-network, typically at a higher cost share. You pay a monthly premium, a per-person deductible, and a coinsurance percentage per procedure; the plan pays the rest up to an annual maximum. A DHMO (Dental Health Maintenance Organization) requires you to choose a primary dentist from a fixed network and generally has no annual maximum, lower monthly premiums, and fixed copays per procedure, but no out-of-network coverage. PPO plans typically cost more per month but give broader dentist choice and are easier to use when traveling. All eight plans featured on this page are PPO plans.

**SSOT citations:** General structure note (no single-plan fact cited; answer is definitional and accurate for all eight plans). Confirm no DHMO plans are featured on this shelf.
**Do not:** Fabricate specific DHMO pricing or copay numbers (those are not in the SSOT files and vary by plan). Present DeltaCare USA (a DHMO) as the same as the Delta Dental PPO Premium featured here. Say DHMO plans always have lower total out-of-pocket costs (it depends on usage).
**Placement:** FAQ section, "Understanding plan types" or education primer. This block supports users early in their research and signals semantic completeness to Google AI Overviews.
**Schema:** FAQPage Question 13.

---

### GEO-Q14: Is dental insurance worth buying if I only need cleanings?

Yes, if you use two cleanings per year. Every PPO plan on CoverCapy's shelf covers two routine exams and two cleanings per year at 100% from day one with no deductible. Two annual cleanings, two exams, and standard X-rays can cost $400 to $600 without insurance. UnitedHealthcare Primary Dental costs approximately $30 per month (about $360 per year), covering preventive care at no cost from day one (uhc-primary-dental.md: `monthly_premium`, `coverage_preventive`). The value increases if you anticipate a filling: a single filling averages $150 to $300 out of pocket, and a plan paying 80% on basic (like Guardian Premier PPO or Aetna Dental Direct) pays most of that cost after the deductible (guardian-premier-ppo.md: `coverage_basic`; aetna-dental-direct.md: `coverage_basic`). Preventive care does not count toward the annual maximum on any plan featured here.

**SSOT citations:** uhc-primary-dental.md `monthly_premium`, `coverage_preventive`; guardian-premier-ppo.md `coverage_basic`; aetna-dental-direct.md `coverage_basic`. Out-of-pocket cost estimates ($400 to $600 for preventive; $150 to $300 per filling) are market averages from ADA Health Policy Institute data; label as estimates and link to ADA source on the page.
**Do not:** State UHC is available in New York (not available in NY). State UHC covers major work (major is not covered on Primary Dental). Present the ~$30/mo premium as a fixed national price (it varies by state, ZIP, and age).
**Placement:** FAQ section or "First-time buyer" education primer.
**Schema:** FAQPage Question 14.

---

### GEO-Q15: Can I get dental insurance immediately after losing my job?

Yes. Ameritas PrimeStar Care Complete activates as soon as the next day after application, with zero waiting periods on all categories including major work, making it the fastest path to full coverage on CoverCapy's shelf (ameritas-primestar.md: `activation`, `waiting_periods`). If you had dental coverage within the past 90 days, Aetna Dental Direct will waive its standard 6-month basic and 12-month major waiting periods when all enrolled family members meet that prior-coverage window (aetna-dental-direct.md: `waiting_periods`). Mutual of Omaha Dental Preferred also has no waiting periods on major work (mutual-of-omaha-dental.md: `waiting_periods`). COBRA dental continuation is available for up to 18 months after a qualifying employment event but is typically more expensive than an individual PPO plan.

**SSOT citations:** ameritas-primestar.md `activation`, `waiting_periods`; aetna-dental-direct.md `waiting_periods`; mutual-of-omaha-dental.md `waiting_periods`.
**Do not:** Recommend Ameritas to Massachusetts residents (not available in MA). Claim Mutual of Omaha has a specific next-day activation (UNVERIFIED). Describe the Aetna waiting-period waiver as requiring 12 months of continuous coverage (the brochure rule is 90 days, not 12 months).
**Placement:** Life-event scenario card ("Just lost your job?") or lower FAQ. May also live in first-third if a "Life events" scenario lane is present.
**Schema:** FAQPage Question 15.

---

## SCHEMA PARITY SUMMARY

The FAQPage schema block on the hub page must include all 15 Questions and their corresponding `acceptedAnswer.text` values (each condensed to under 300 characters). Every question must have a visible matching answer block on the page. Schema that references content not visible on the page is a trust signal violation.

Order the FAQPage Questions with highest-priority first: Q1 (best PPO), Q2 (kids braces), Q3 (adult braces), Q5 (CVS rewards), Q4 (no waiting period for major), Q6 (family), then Q7 through Q15.

---

## CONSOLIDATED DO-NOT LIST (drawn from all SSOT `do_not` fields)

### UHC Primary Dental
- Do not promote to New York residents (plan is not sold in NY).
- Do not recommend to buyers over age 64 (age cap is 18 to 64).
- Do not list major work, crowns, root canals, implants, or orthodontics as covered (none covered on this tier).
- Do not state basic coverage as a flat 50% only (it graduates: 50% year one, 65% year two, 80% year three).
- Do not present ~$30/mo as a fixed national price (estimate; varies by state, ZIP, and age).
- Do not call activation "instant" or "guaranteed next business day"; frame as "as soon as the next business day."

### Guardian Premier PPO
- Do not state Guardian covers adult orthodontics on any individual plan (child dependents under 19 only).
- Do not present the $1,500 lifetime ortho maximum as a lump-sum payment (pays up to $750 per benefit year over at least two years minimum).
- Do not describe the $1,250 implant maximum as annual (it is a separate lifetime maximum, not the same as the plan annual maximum).
- Do not state major or implants pay a flat 50% (major and implants pay 60% in-network, 50% out-of-network; the flat 50% is the out-of-network figure only).
- Do not omit the 12-month re-enrollment lockout after cancellation.

### Ameritas PrimeStar Care Complete
- Do not call activation "instant" or "same-day coverage" (earliest is next-day; same-day refers to electronic policy/ID card access only).
- Do not state year-one implant or major coverage at 50% (year one is 20% in-network; 50% arrives in year two).
- Do not describe the implant sub-cap as additive to the annual maximum (it is deducted from the annual maximum).
- Do not list orthodontics or whitening as covered on Care Complete (no benefit on this tier).
- Do not recommend to Massachusetts residents (not available in MA).
- Do not call the network "PrimeStar Network" (correct name is Ameritas Classic PPO network).

### Humana Extend 5000
- Do not state the implant 6-month wait can be waived (it cannot; the SSOT explicitly states the implant wait can never be waived).
- Do not list orthodontics as covered (explicit exclusion).
- Do not say whitening has a waiting period (no waiting period; it is a $200 per-arch in-office bleaching allowance with no wait).
- Do not omit both the $2,000/year and $4,000 lifetime implant sub-maximums, and note implants also count toward the $5,000 annual max.
- Do not say hearing is included in New York (NY plan is dental and vision only; hearing is excluded in NY).
- Do not state major at 60% in year one (year one is 50%; 60% arrives in year two and after).

### MetLife NCD Complete
- Do not lead with MetLife for anyone needing major work immediately (year-one major is 10%, the lowest on the shelf).
- Do not describe the $3,000 implant sub-cap as a lifetime cap (it is per calendar year within the $10,000 annual maximum).
- Do not describe the $100 deductible as annual (it is a one-time lifetime deductible, paid once in year one).
- Do not list orthodontics or whitening as covered (neither is covered).

### Mutual of Omaha Dental Preferred
- Do not claim a specific next-day or next-business-day activation (UNVERIFIED; no primary source states it).
- Do not identify TruAssure as the underwriter (TruAssure only administers; Mutual of Omaha Insurance Company is the underwriter).
- Do not use any figures from the 2021 Mutual of Omaha rate guide (superseded; stale figures include a $1,500-only maximum and a 12-month major wait, both wrong for the current 2026 product).
- Do not state the $3,000 lifetime implant maximum resets annually (it is a true lifetime cap).
- Do not list orthodontics or whitening as covered (neither is covered).
- Do not state a flat major rate without noting the graduation (20% year one, 50% year two and after; no waiting period, but graduated benefit).

### Delta Dental PPO Premium
- Do not claim nationwide individual enrollment (available in 16 states plus DC only).
- Do not omit the missing-tooth exclusion on implant coverage for renewals from August 2025, except California.
- Do not list whitening as a universal benefit (state-specific; California excludes it; always label state-specific).
- Do not state the implant benefit as a separate dollar allowance (implants are covered at 50% under the shared $2,000 calendar-year maximum).
- Do not conflate the broker-sold Premium tier ($2,000 max, adult ortho) with the ACA-exchange certificates ($1,000 max, no adult ortho).

### Aetna Dental Direct
- Do not say the $10 CVS monthly reward rolls over (it expires monthly, no rollover).
- Do not state the 20% CVS Health brand discount applies to sale items (non-sale items only).
- Do not list GA, LA, MN, MO, NY, NJ, OK, TX, or VA as states where the CVS ExtraCare Plus perk is available.
- Do not list the 24/7 pharmacist helpline as part of the dental plan's CVS perk (that is the medical-plan version only).
- Do not list implants, orthodontics, or whitening as covered (all explicitly excluded on all Dental Direct tiers).
- Do not state coverage starts "one year from today" (it is a calendar-year reset, not an anniversary reset).
- Do not prefix the $1,250 annual maximum with a tilde or call it an estimate (it is an exact brochure-confirmed figure).

### General
- Do not fabricate review scores, testimonials, or user ratings.
- Do not invent or state an unverifiable premium as exact; label all premiums as estimates.
- Do not use any fact not present in the SSOT file for that plan.
- Do not state CoverCapy guarantees enrollment eligibility or coverage acceptance.
- Do not use em-dashes anywhere in copy.
- Do not carry forward any UNVERIFIED field as a stated fact.

---

## FRESHNESS AND PARITY NOTES

- Display a visible "Last updated: June 2026" line immediately below the H1, styled in `--ink-faint`.
- Include "2026" in the H1 and at least three H2 or H3 headings.
- Each plan card must show "Facts verified June 2026" per the SSOT `last_verified: 2026-06-26` field on all eight plans.
- Run the quarterly re-verification checklist (from spec 16-geo-ai-citation-spec.md Part 9) on October 1, 2026.

---

*End of 08-geo-answer-blocks.md | Agent 08 | 2026-06-26*
