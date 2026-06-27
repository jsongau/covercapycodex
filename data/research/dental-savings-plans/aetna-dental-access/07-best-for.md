# 07 — Best For / Worst For

A persona-based routing guide. This document powers the "is this right for me?" decision tree (`09`) and the page's audience sections. The goal is to send each reader to the right answer — sometimes that's Aetna Dental Access, sometimes a CoverCapy PPO, sometimes both.

---

## Best for

**The person facing one big procedure right now.**
A crown, a root canal, an implant, an extraction — quoted today, needed soon. No time to wait out a PPO's 12-month major-work clause. The savings plan works immediately, and the single procedure pays back the membership several times over. *This is the strongest-fit persona.*

**The person who already maxed out their insurance.**
Hit the $1,500 annual cap and still need work? Stack a savings plan on top — it keeps discounting with no ceiling for the rest of the year.

**The cosmetic-care seeker.**
Veneers, whitening, cosmetic bonding — insurance pays $0. A savings plan still discounts them. Often the only meaningful saving available.

**The senior who lost group coverage.**
Original Medicare doesn't cover routine dental; about 47% of adults 65–80 have no coverage. No underwriting, no wait, immediate discounts. Clean fit.

**The recently laid-off / benefits-gap person.**
Lost dental with the job. A ~$175/yr plan works now and bridges the gap until new coverage starts — no waiting period to sit through.

**The family with ongoing, varied needs and no annual cap to respect.**
Multiple kids, multiple procedures, ortho across siblings — the no-cap, reusable structure can outperform a capped PPO across a household. (With the caveat that ortho discounts are modest.)

**The self-pay / chronically uninsured patient.**
About 27% of U.S. adults (~72 million) have no dental insurance. For someone who would otherwise pay full cash price, the discount is pure savings.

---

## Worst for (be honest — this builds trust)

**The healthy person who only needs cleanings.**
Two cleanings and an exam a year? A PPO that covers preventive at 100% beats a plan that only discounts it ~40%. Route this person to compare PPOs. *Do not push them into a savings plan.*

**The person whose dentist doesn't participate.**
If their preferred dentist isn't in the Aetna Dental Access network, the plan is far less useful. This is why CoverCapy verifies the *specific* dentist before recommending anything.

**The person who needs a big *covered* procedure under an active no-wait PPO.**
If they already have insurance with remaining annual max and no waiting period, the PPO's 50–80% payout can beat a flat discount.

**The person expecting insurance.**
If someone wants a plan that "pays 80%" or satisfies a coverage requirement, this isn't it — it's a discount membership, not insurance, and it doesn't meet ACA minimum creditable coverage.

**Residents of states where it isn't sold** (Vermont, Washington via the Careington/1Dental path) — confirm availability first.

---

## The "both can make sense" cases

CoverCapy's most sophisticated and trust-building message is that this isn't always either/or:

- **Insurance + savings plan stacked:** keep the PPO for preventive (free cleanings) and the annual-max payout, add a savings plan to keep discounting once the cap is hit.
- **Savings plan now, PPO later:** use the savings plan as an immediate bridge for urgent work, then move to a PPO at the next enrollment window for ongoing preventive coverage.
- **Savings plan for cosmetic, PPO for everything else:** since the PPO won't touch cosmetic anyway, a savings plan covers the gap.

---

## Routing logic for the page (maps to the decision tree)

| If the reader says… | Route them to… |
|---|---|
| "I need a crown/implant/root canal soon" | Aetna Dental Access — verify their dentist first |
| "I already hit my insurance max" | Stack a savings plan |
| "I just want my teeth cleaned twice a year" | Compare CoverCapy PPO plans (`/compare-ppo-dental-plans`) |
| "I want veneers/whitening" | Aetna Dental Access (cosmetic discount) |
| "I'm on Medicare with no dental" | Aetna Dental Access — verify dentist |
| "I just lost my job's dental" | Savings plan as a bridge; revisit PPO at enrollment |
| "Does my dentist take it?" | `/find-my-dentist` verification — the CoverCapy advantage |
| "I want real insurance that pays a share" | Compare CoverCapy PPO plans |

Every route either ends at a confident recommendation or at CoverCapy's verification/comparison tools — never at a dead end.

## Sources

- CMS / KFF — Medicare dental gap, seniors uninsured: https://www.cms.gov/medicare/coverage/dental ; https://www.kff.org/medicare/medicare-and-dental-coverage-a-closer-look/
- CareQuest — uninsured adults: https://www.carequest.org/about/press-release/new-report-685-million-adults-us-dont-have-dental-insurance-may-rise-914
- DentalPlans.com — max-out / stacking: https://www.dentalplans.com/blog/max-out-dental-insurance/
- Cigna — discount dental programs: https://www.cigna.com/knowledge-center/discount-dental-programs
