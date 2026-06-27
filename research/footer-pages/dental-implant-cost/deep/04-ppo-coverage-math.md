# Workstream 4 — PPO Coverage Math for Dental Implants

Research pack for the CoverCapy flagship `dental-implant-cost.html` page. This is the workstream on how PPO insurance changes the real out-of-pocket cost of an implant.

**Hard rule honored:** every featured-plan number below is copied from `data/plans/*.md` (the single source of truth). No plan fact is invented, and each plan's `do_not` list is honored. General coverage mechanics (not specific featured-plan numbers) are sourced from the web with access dates. Illustrative dollar figures in the worked examples are clearly labeled as illustrative and are never presented as a quote. No em-dashes, no roman numerals.

Last compiled: 2026-06-26.

---

## 1. Plain explainer: how PPO coverage applies to an implant

A PPO dental plan does not pay "the implant bill." It runs the implant through a small set of rules, and each rule can shrink what the plan actually pays. The five rules that matter most:

### 1a. Implants sit in the "major" service category
Dental plans sort procedures into three buckets: preventive (cleanings, exams), basic (fillings, simple extractions), and major (crowns, bridges, dentures, and usually implants). Major is the lowest-paying bucket. Where preventive is often 100 percent and basic 80 percent, major work is commonly paid at a lower coinsurance rate. Across the market, major-service implant coverage typically lands around 50 percent, with real plans ranging from roughly 20 to 60 percent depending on plan and policy year. The patient pays the remaining coinsurance after any deductible. [Delta Dental PPO plan structure; medicalinsurancetoday.com 2026; accessed 2026-06-26]

### 1b. The annual maximum is the real ceiling, not the coinsurance rate
Every traditional PPO plan caps the total dollars it will pay in a benefit year. Market annual maximums in 2026 typically run $1,000 to $2,000, with mid-tier plans at $3,000 and a few high-ceiling plans at $5,000. Because a single implant commonly costs more than $3,000 all in, the coinsurance math (for example "50 percent of the bill") usually runs into the annual maximum before it finishes. Once the plan has paid up to its maximum for the year, it pays nothing more, no matter the coinsurance rate. So on a big case the annual maximum, not the percentage, is what limits the payout. The maximum resets at the start of each benefit year (calendar year for most plans). [dentalinsurance.com implant coverage; medicalinsurancetoday.com 2026; Delta Dental "annual maximum" explainer; accessed 2026-06-26]

### 1c. Waiting periods delay (or reduce) the benefit
Most individual plans make you wait before they will pay for major work. A 6 to 12 month wait is standard on newly issued individual plans, with 12 months the most common. A few plans skip the wait entirely but pay a reduced first-year percentage that ramps up in later years. If you need an implant soon, the waiting period is often the single most important plan feature to compare, because a plan that "covers implants" but makes you wait a year pays nothing on a procedure done in month three. Some plans waive the wait with proof of prior continuous coverage; some never waive it. [innovasmilesdental.com 2026 waiting periods; spiritdental.com; redentklinik.com 2025 guide; accessed 2026-06-26]

### 1d. The missing-tooth clause can deny the implant outright
A missing-tooth clause says the plan will not pay to replace a tooth that was already gone before your coverage started. It applies to any prosthesis that replaces a missing tooth, including implants, bridges, partials, and dentures. The test is the extraction date versus the plan effective date: if the tooth came out after coverage began, the claim proceeds normally; if it was lost before, the clause applies and the plan pays nothing toward replacing it. When one prosthesis replaces several teeth, only one of them needs to predate the plan for the whole prosthesis to be denied. This is one of the most common reasons implant claims are denied, and most patients have never heard of it. Some plans include the clause and some do not; a 2025 California rule barred the clause in fully insured group plans, but most states still allow it to persist indefinitely. Denials can sometimes be appealed with X-rays or records proving the tooth was lost after the effective date. [eAssist/dentalbilling.com; dentalclaimsupport.com; realdentalcosts.com; accessed 2026-06-26]

### 1e. Sub-caps, alternate-benefit, and what is excluded
Even when a plan covers implants, several fine-print limits can cut the payout further:
- **Implant sub-limits.** Some plans put a separate dollar cap on implants specifically, either a smaller annual implant maximum or a one-time lifetime implant maximum, which is more restrictive than the general annual maximum.
- **Alternate benefit / LEAT.** A Least Expensive Alternative Treatment clause pays only for the cheapest clinically acceptable option. Because an implant is usually pricier than a bridge or denture, an alternate-benefit clause can reimburse the implant at the lower allowance of a conventional appliance, leaving the patient to cover the difference.
- **Excluded preparatory work.** Plans often pay only for parts of the procedure (such as the crown or abutment) and exclude bone grafts, sinus lifts, or even extractions, which can add several hundred to several thousand dollars that the plan never touches.
[ADA LEAT clause; eAssist alternate-benefits clause; spiritdental.com limitations and exclusions; dentalinsurance.com; accessed 2026-06-26]

### Net effect
Stack these together and a plan that advertises "covers implants at 50 percent" routinely pays only a fraction of one implant in one benefit year. That is why most insured patients still pay a large share out of pocket, and why the smartest moves are staying in-network, staging the case across two benefit years to draw on two annual maximums, avoiding the missing-tooth trap, and confirming benefits in writing before treatment.

---

## 2. With vs without insurance: worked example (illustrative ranges)

> All dollar figures in this section are ILLUSTRATIVE and use national 2026 ranges. They are not a quote. Your actual price depends on your dentist, location, materials, clinical needs, and the exact plan you hold. Plan mechanics are general (per section 1); the featured-plan numbers in section 3 are the sourced facts.

**The setup (illustrative).** A single-tooth implant in 2026 commonly runs about $3,000 to $6,000 all in (post, abutment, crown), with roughly $4,500 a typical midpoint. Preparatory work (extraction, bone graft, sinus lift) is billed on top and is often partly or fully excluded.

**Without insurance.** You pay the full negotiated or cash fee. On the illustrative midpoint, that is about **$4,500** for the tooth, plus any prep work.

**With a typical PPO plan (illustrative).** Assume a plan that covers major work at 50 percent with a $1,500 annual maximum, past its waiting period, with no missing-tooth issue:
- 50 percent of $4,500 = $2,250 of "covered" benefit on paper.
- But the plan stops at its $1,500 annual maximum.
- The plan pays about **$1,500**; you pay about **$3,000** that year (plus any excluded prep work).

The annual maximum, not the 50 percent rate, set the ceiling. This is the core lesson: on an implant, the maximum is the binding constraint.

**Why ranges matter.** Swap in different but realistic plan terms and the insured out-of-pocket moves across a band:
- Low-ceiling plan ($1,000 max): plan pays roughly $1,000; you pay roughly $3,500 on the illustrative $4,500 tooth.
- Mid-ceiling plan ($2,000 to $3,000 max, 50 percent): plan pays up to that cap; you pay roughly $2,000 to $3,000.
- High-ceiling plan ($5,000 max, 50 to 60 percent): a single $4,500 implant can be covered closer to the coinsurance math (about $2,250 to $2,700 paid by the plan), because the bill stays under the maximum, so you pay roughly $1,800 to $2,250.

So even at its best, a typical insured patient still pays on the order of **$1,500 to $3,000 out of pocket** for a single implant in one benefit year, and more on low-ceiling plans. (This matches the page's existing TL;DR and FAQ framing.)

**Two-year staging (illustrative).** If the implant exceeds the annual maximum, splitting the case across two benefit years (for example extraction and graft in December, then post, abutment, and crown in January) lets you draw on two separate annual maximums instead of one, which can roughly double the insured contribution on a large case. This works only if the plan and the clinical timeline allow it, and is subject to the same waiting-period and missing-tooth rules.

---

## 3. Featured-plan implant comparison (facts ONLY from data/plans)

Every cell below is taken verbatim in substance from the cited `data/plans/*.md` file. Percentages, waiting periods, maximums, and sub-caps are the sourced facts; each plan's `do_not` list is honored (notes flag in-network vs out-of-network splits, year-one vs later rates, lifetime vs calendar-year caps, "deducted-from-max" sub-caps, and exclusions). Premiums are omitted here because they are estimates and not the subject of this workstream.

| Plan | Implant coverage % | Waiting period | Annual maximum | Implant sub-cap | Key notes | Source file |
|---|---|---|---|---|---|---|
| Ameritas PrimeStar Care Complete | 20% in-network year one, rising to 50% in-network after year one (10% then 30% out-of-network) | None (day one on every category, including implants) | $2,000 year one, rising to $3,500 after year one (Basic + Major combined; preventive does not count) | Implant max per person per benefit year $1,000 day one / $1,500 year 2+, DEDUCTED FROM the annual dental maximum (not on top of it) | Day-one implant access reaches graft, extraction, placement, abutment, and crown with no wait. Do not quote year-one major/implant at 50% (that is year 2+). Do not present the sub-cap as a separate budget. | `data/plans/ameritas-primestar.md` |
| Humana Extend 5000 | 50% year one, rising to 60% year two and after (same in and out of network) | 6 months, cannot be waived | $5,000 per person per calendar year (all dental combined, including implants) | Implant annual maximum $2,000 per person AND lifetime maximum $4,000 per person; implant benefits also count toward the $5,000 annual max; limit one per tooth per 5 years | Do not omit the dual sub-cap ($2,000/yr and $4,000 lifetime). 60% is year-two, not year-one. The 6-month implant wait can never be waived. | `data/plans/humana-extend-5000.md` |
| Guardian Premier 2.0 | 60% in-network, 50% out-of-network | 12 months (Washington 6 months, Minnesota 9 months) | $3,000 per benefit year per person | Separate $1,250 LIFETIME implant maximum | Missing-tooth clause applies. Do not state a flat 50% (that is the out-of-network figure; 60% is in-network). The $1,250 is lifetime, not part of the annual max. State waiting-period exceptions apply. | `data/plans/guardian-premier-ppo.md` |
| Delta Dental PPO Premium | 50% (prosthodontics) | 12 months (waivable with proof of prior comparable major coverage, gap under 63 days) | $2,000 per person per calendar year (Premium tier) | No separate implant dollar allowance; implants draw on the shared $2,000 calendar-year maximum, $50 deductible | Initial-placement / missing-tooth exclusion applies on Premium renewals from August 2025, except California. Alternate-benefit (LEAT) clause can pay an implant/abutment-supported denture at the conventional-appliance allowance. The $2,000 cap (not the 50% rate) limits big cases. | `data/plans/delta-dental-ppo-premium.md` |
| MetLife NCD Complete | 10% year one, 50% year two, 60% year three and after (graduated major schedule) | None (benefits payable from day one) | $10,000 per calendar year per person | Implants capped at $3,000 per CALENDAR YEAR within the $10,000 maximum; about one per tooth position per 10 years | Highest annual maximum tracked. Do not state the implant cap as lifetime (it is per calendar year). Year-one major/implant is only ~10%; rewards timing larger work for year two or three. | `data/plans/metlife-ncd-complete.md` |
| Mutual of Omaha Dental Preferred | 20% year one, rising to 50% year two and after (graduated, no wait) | None (day one for preventive, basic, and major) | Selectable $1,500 / $3,000 / $5,000 per calendar year (CoverCapy features $5,000) | Separate $3,000 LIFETIME implant maximum (Preferred; $2,000 on the lower Protection plan) | Implant cap is lifetime, separate from the calendar-year maximum; do not say it resets annually. Major is 20% year one ramping to 50% year two (no wait). Do not regress to the outdated 2021 figures. | `data/plans/mutual-of-omaha-dental.md` |
| Aetna Dental Direct | Implants NOT covered | n/a | $1,250 per calendar year (Direct Preferred PPO tier) | n/a | Dental implants and prosthetic restoration of implants are explicitly excluded on every Dental Direct tier. Confirm coverage before enrolling if implants are the goal. | `data/plans/aetna-dental-direct.md` |
| UHC Primary Dental | Implants NOT covered | n/a | $1,000 per person per calendar year | n/a | Entry tier: preventive and basic only; no major, implants, or orthodontics. Only UHC's Premier Plus tier covers implants, and that is a separate Golden Rule policy, not this plan. | `data/plans/uhc-primary-dental.md` |

### Notes the page must keep straight (from the data/plans do_not lists)
- **Ameritas:** the implant sub-cap is DEDUCTED FROM the annual maximum, so do not describe it as extra budget. Year-one implant/major is 20%, not 50%.
- **Humana:** state BOTH implant sub-caps ($2,000/yr and $4,000 lifetime); the 6-month implant wait can never be waived; 60% is year two.
- **Guardian:** in-network implant rate is 60% (50% is out-of-network); the $1,250 implant cap is lifetime; missing-tooth clause applies; Washington/Minnesota shorten the wait.
- **Delta:** implants are 50% under the shared $2,000 calendar-year maximum (no separate implant dollar allowance); the missing-tooth / initial-placement exclusion applies to Premium renewals from August 2025 except California; LEAT/alternate-benefit can downgrade the implant to a conventional-appliance allowance.
- **MetLife NCD:** implant cap is $3,000 per calendar year (not lifetime); year-one major is only ~10%.
- **Mutual of Omaha:** implant cap is a $3,000 LIFETIME maximum (separate from the calendar-year max); no major waiting period; major ramps 20% to 50%.
- **Aetna and UHC Primary:** implants fully excluded; do not list them as covered anywhere.

---

## 4. How this maps to the page (recommendations, no HTML)

The current `dental-implant-cost.html` already has a "What a PPO plan actually pays" table and a worked example that are consistent with the data/plans facts. This research supports and can extend that section:
- The existing table covers Ameritas, Humana, Guardian, Delta, and (excluded) Aetna + UHC. This pack adds two more sourced rows the page could optionally include for completeness: **MetLife NCD Complete** ($10,000 max, $3,000/yr implant cap, day-one but 10% year-one) and **Mutual of Omaha Dental Preferred** ($5,000 max option, $3,000 lifetime implant cap, no wait, 20% to 50% ramp). Both are strong "high-ceiling implant" stories.
- The page's worked example ($4,500 implant, 50% rate, $1,500 max, plan pays $1,500, patient pays ~$3,000) is the right teaching example and matches section 2 here. Keep it labeled illustrative.
- The "annual maximum is the real ceiling" point (section 1b) is the single most important concept and should stay the spine of the with/without section.
- The missing-tooth clause section already exists and is accurate; section 1d here adds the "extraction date vs effective date" test and the "one tooth fails, whole prosthesis denied" detail, plus the 2025 California group-plan rule, if the page wants more depth.

---

## 5. Sources

### Single source of truth (plan facts)
- `data/plans/README.md` (rules: facts only from these files; honor each do_not list)
- `data/plans/ameritas-primestar.md`
- `data/plans/humana-extend-5000.md`
- `data/plans/guardian-premier-ppo.md`
- `data/plans/delta-dental-ppo-premium.md`
- `data/plans/metlife-ncd-complete.md`
- `data/plans/mutual-of-omaha-dental.md`
- `data/plans/aetna-dental-direct.md`
- `data/plans/uhc-primary-dental.md`

### General coverage-mechanic web sources (not used for featured-plan numbers)
All accessed 2026-06-26.
- Delta Dental, PPO individual and family plan structure — https://www1.deltadentalins.com/individuals-and-families/plans/delta-dental-ppo.html
- Delta Dental, "What is a dental insurance annual maximum" — https://www.deltadental.com/protect-my-smile/dental-insurance-101/what-is-dental-insurance-annual-maximum/
- medicalinsurancetoday.com, "PPO Dental Plans for 2026" (general market coverage %, annual max ranges) — https://medicalinsurancetoday.com/best-ppo-dental-insurance-2026/
- dentalinsurance.com, "Dental Implant Insurance" (covered parts, prep work often excluded) — https://www.dentalinsurance.com/benefits/covers-implants/
- innovasmilesdental.com, "Dental Insurance Waiting Periods: What to Know (2026)" — https://www.innovasmilesdental.com/blog/dental-insurance-waiting-periods-what-to-know
- Spirit Dental & Vision, implant coverage / no waiting period — https://spiritdental.com/dental-insurance/dental-implants-insurance-coverage
- Spirit Dental & Vision, "Decoding Dental Insurance: Limitations and Exclusions" — https://spiritdental.com/blog/categories/dental-health/decoding-dental-insurance-understanding-limitations-and-exclusions-in-your-plan
- redentklinik.com, "Dental Insurance for Implants No Waiting Period: 2025 Guide" — https://www.redentklinik.com/en/dental-insurance-for-implants-no-waiting-period/
- eAssist / dentalbilling.com, "Understanding the Missing Tooth Clause" — https://dentalbilling.com/understanding-the-missing-tooth-clause/
- eAssist / dentalbilling.com, "The Alternate Benefits Clause" — https://dentalbilling.com/alternate-benefits-clause/
- dentalclaimsupport.com, "What is the missing tooth clause? 4 questions answered" — https://www.dentalclaimsupport.com/blog/missing-tooth-clause-questions-dentists
- realdentalcosts.com, "The Missing Tooth Clause: Why Insurance Won't Pay" — https://realdentalcosts.com/en/missing-tooth-clause-insurance/
- American Dental Association, "Least Expensive Alternative Treatment (LEAT) Clause" — https://www.ada.org/resources/practice/dental-insurance/least-expensive-alternative-treatment-clause
- American Dental Association, "Typical Dental Plan Benefits and Limitations" — https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations
