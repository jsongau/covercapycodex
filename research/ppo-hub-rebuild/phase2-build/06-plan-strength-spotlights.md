# 06 — Plan Strength Spotlights
## Agent: 06 | Workstream: Plan Strength Spotlights
## Date: 2026-06-26 | Source: All eight /data/plans/*.md SSOTs

These spotlights are ready for the rotating right rail, the sticky bottom pop-off, the strength-explorer tabs, and inline feature chips. Each entry is implementation-ready copy. No em-dashes anywhere in this file. Source citations name the exact SSOT field used.

---

## FORMAT KEY

Each plan delivers four fields:

- **eyebrow** — 2-4 word strength label (used as tab label, chip, and rail eyebrow)
- **headline** — one-line sentence naming the strength (H2/H3 in the rail spotlight)
- **fact** — single bounded SSOT sentence with source field cited in brackets
- **skip_if** — 6-10 word caveat (used in the bottom pop-off and strength-explorer "Is this you?" block)

---

## 1. UnitedHealthcare Primary Dental

**eyebrow:** Fastest Start, Lowest Price

**headline:** Coverage as soon as the day after your application, for about $1 a day.

**fact:** The Golden Rule Dental policy sets the effective date as the later of the requested date or the day after receipt of your application, so basic and preventive coverage can start the next business day. [Source: SSOT field `activation` — sourced from Golden Rule Dental Primary brochure PDF 45585B-G202108.pdf]

**skip_if:** Skip if you need crowns, root canals, or braces.

---

## 2. Guardian Premier 2.0

**eyebrow:** Best Day-One Fillings + Kids Braces

**headline:** Pays 85% on fillings from the first day, and covers children's braces.

**fact:** Fillings and simple extractions are reimbursed at 85% in-network from day one with no waiting period, the highest day-one basic payout on the CoverCapy shelf, and dependent children under 19 receive orthodontic coverage at 60% in-network up to a $1,500 lifetime maximum after a 12-month wait. [Source: SSOT fields `coverage_basic` and `orthodontics` — verified against dentalinsurance.com Advantage Premier 2.0 benefit grid, 2026-06-26]

**skip_if:** Skip if you need a crown or root canal within 12 months.

---

## 3. Ameritas PrimeStar Care Complete

**eyebrow:** No Waiting Periods on Everything

**headline:** Root canals, crowns, and implants are all covered from the very first day.

**fact:** The Ameritas PrimeStar Care Complete brochure (form GR 8228 MAC 2-26) lists "No waiting periods" as a plan feature, making preventive, basic, major services, and implants all available from day one, with coverage beginning as soon as tomorrow. [Source: SSOT field `waiting_periods` and `activation` — verified against Ameritas brochure GR 8228 MAC 2-26 and GR 7708 3-26, effective 4/1/2026]

**skip_if:** Skip if you need braces or whitening.

---

## 4. Humana Extend 5000

**eyebrow:** Highest Lifetime Implant Coverage

**headline:** Up to $4,000 lifetime toward implants, plus dental, vision, and hearing in one plan.

**fact:** Humana Extend 5000 pays implant surgical placement on the major schedule, with a dedicated implant annual maximum of $2,000 per person and a separate lifetime maximum of $4,000 per person, which is the highest individual-plan lifetime implant ceiling on the CoverCapy shelf. [Source: SSOT field `implants` — verified against Humana Extend 5000 Florida brochure form FLHLE8VEN 0126, 2026-06-26]

**skip_if:** Skip if you need implants immediately; a 6-month wait applies.

---

## 5. MetLife NCD Complete

**eyebrow:** Highest Annual Max, One-Time Deductible

**headline:** A $10,000 annual ceiling with a deductible you pay only once, ever.

**fact:** NCD Complete carries a $10,000 calendar-year maximum per person, the highest on the CoverCapy shelf, and a single $100 lifetime deductible that applies in year one only, with no waiting periods on any category. [Source: SSOT fields `annual_maximum` and `deductible` — verified against NCD Complete brochure form L1224045513[exp1226] and ncd.com/dental-metlife-benefits, 2026-06-26]

**skip_if:** Skip if you need major work done in year one; year-one major pays only 10%.

---

## 6. Mutual of Omaha Dental Preferred

**eyebrow:** Seniors Favorite, No Major Wait

**headline:** Major services, crowns, and root canals available from day one, no waiting period.

**fact:** The Mutual of Omaha Dental Preferred plan has no waiting period on preventive, basic, or major services, is community-rated and guaranteed-issue with pricing that does not increase with age, and includes a separate $3,000 lifetime implant maximum on the Preferred tier. [Source: SSOT fields `waiting_periods`, `coverage_major`, and `implants` — verified against live mutualofomaha.com quote tool and Texas Health Agents 2026 benefit grid]

**skip_if:** Skip if you expect braces or cosmetic whitening.

---

## 7. Delta Dental PPO Premium

**eyebrow:** Largest Network, Adult and Child Ortho

**headline:** The biggest dentist network in the US, and it covers braces for adults too.

**fact:** The Delta Dental PPO network includes 112,000 or more dentists at 278,000 or more office locations, the largest PPO network by location count, and the broker-sold Premium tier covers orthodontics for both adults and dependent children at 50% after a 12-month wait, up to a $1,500 lifetime maximum per person. [Source: SSOT fields `network` and `orthodontics` — verified against DentalPlans.com Delta Dental PPO Individual Premium listing, modified 2026-05-07, and research/delta-dental/ secondary support]

**skip_if:** Skip if you want coverage before the 12-month major or ortho wait clears.

---

## 8. Aetna Dental Direct

**eyebrow:** CVS ExtraCare Perks Included

**headline:** Your dental plan comes with a CVS ExtraCare Plus membership, up to $120 a year in rewards.

**fact:** The Direct Preferred PPO tier includes CVS ExtraCare Plus, which provides a $10 monthly bonus reward that loads to your ExtraCare card within roughly 72 hours, 20% off CVS Health brand products on non-sale items, and free 1-2 day CVS.com shipping on qualifying orders of $10 or more. [Source: SSOT field `cvs_extracare_plus` — verified against Aetna Dental Direct Brochure A form 2802236-01-01 and CVS ExtraCare Plus member flyer doc 3268912-01-01]

**skip_if:** Skip if you live in GA, LA, MN, MO, NY, NJ, OK, TX, or VA; ExtraCare Plus is not available in those states.

---

## BALANCE AUDIT

Each plan is assigned a single, distinct strength lane. No plan repeats another's primary claim:

| Plan | Strength Lane |
|---|---|
| UHC Primary | Speed of activation + lowest price |
| Guardian Premier 2.0 | Highest day-one filling rate (85%) + child braces |
| Ameritas PrimeStar | No waiting periods on all categories including major |
| Humana Extend 5000 | Highest lifetime implant max ($4,000) + vision/hearing bundle |
| MetLife NCD Complete | Highest annual max ($10,000) + one-time lifetime deductible |
| Mutual of Omaha | Seniors/community-rated + no major wait + $3,000 lifetime implant |
| Delta Dental | Largest network + adult AND child orthodontics |
| Aetna Dental Direct | CVS ExtraCare perks (one spotlight among equals, not dominant) |

Aetna is intentionally the mildest spotlight: the perk is real and documented but the plan is positioned as everyday balanced coverage, not a standout on any benefit dimension.

---

## IMPLEMENTATION NOTES FOR THE BUILD AGENT

- Use `eyebrow` text as the tab label in the strength-explorer and as the chip label on dentist cards.
- Use `headline` as the H2/H3 inside the right-rail rotating spotlight card.
- Use `fact` as the body sentence below the headline. Include the citation note as an HTML comment in the source, not as visible copy.
- Use `skip_if` in the bottom pop-off bar beside the plan name and in the "Is this right for you?" row of the strength-explorer tab.
- The right-rail spotlight swaps on IntersectionObserver (when the corresponding plan card enters the viewport) and also updates when the visitor selects a scenario in the left rail. UHC is the default on page load since it has the broadest first-time visitor fit.
- Do NOT show multiple strengths simultaneously for Aetna. The CVS perk gets one card, same size as every other plan card. No extra call-outs, no "special feature" badge treatment.
- All do_not flags in each SSOT still apply. In particular: UHC activation must say "as soon as the day after your application is received," not "instant" or "guaranteed next business day." MOO activation timing is unverified; do not add a timing claim to the MOO spotlight. Ameritas activation is "as soon as tomorrow," not "same day." Humana implant wait cannot be waived; include the skip_if accordingly.
