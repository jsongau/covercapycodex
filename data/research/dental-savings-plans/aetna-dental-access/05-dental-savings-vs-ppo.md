# 05 — Dental Savings Plan vs PPO: The Decision Framework

The heart of the educational hub. The goal is not to declare a winner — it is to help a reader recognize which product fits *their* situation. Sometimes the honest answer is the PPO. That honesty is what builds the trust that converts.

> **Plan facts for any specific CoverCapy featured PPO must be pulled from `/data/plans/` (the SSOT), per CLAUDE.md rule 13. The PPO figures below are general market norms for framing only.**

---

## The mechanical contrast

| | Dental Savings Plan (e.g., Aetna Dental Access) | Dental PPO Insurance |
|---|---|---|
| What it is | A membership that unlocks discounted fees | Insurance that pays a % of covered care |
| Cost to enroll | ~$155–$175/yr individual; ~$210 family | ~$20–$50/mo individual (~$240–$600/yr); families more |
| Annual maximum | **None** | $1,000–$2,000 typical; you pay 100% above it |
| Deductible | None | ~$50/person |
| Waiting period | **None — usable almost immediately** | None for preventive; up to 12 mo for major work |
| How you save | Flat discount (~15–50%) on every procedure | 100/80/50 tiers (preventive/basic/major) |
| Pre-existing / missing tooth | Covered immediately | Often excluded (missing-tooth clause) |
| Cosmetic | Still discounted | Usually $0 |
| Preventive (cleanings) | Discounted (~40%) | Often covered at 100% |

The trade is simple to state: **a PPO can make preventive care free and pay a big share of covered work up to a ceiling, but it makes you wait and caps you. A savings plan never makes anything free, but it works immediately, never caps you, and discounts everything — including cosmetic.**

---

## When a SAVINGS PLAN wins

**1. You need major work now and can't wait out a PPO.**
A new PPO won't pay for major work for ~12 months, and then only 50%. A ~$175/yr savings plan works immediately.
- *Crown example:* a $1,500 crown becomes ~$949 — about **$551 saved today**, no wait.

**2. Big-ticket work that blows past the annual max and the missing-tooth wall.**
- *Implant example:* a single implant runs $3,000–$6,000 all-in. A new PPO imposes a 12-month wait, caps the payout at $1,000–$2,000, and may deny it under the missing-tooth clause. The savings plan applies its discount immediately, with no cap — usually the larger real saving on a four-figure procedure.

**3. You'll exceed the PPO annual maximum.**
A crown plus a root canal can break a $1,500 cap, after which you pay 100% of everything else that year. The savings plan keeps discounting with no ceiling. (A savings plan can even be *stacked* on top of insurance for exactly this reason — once the max is hit, the discount keeps working.)

**4. You want cosmetic work.**
Veneers (~$1,765/tooth) and whitening get $0 from insurance. A savings plan still discounts them — often the only meaningful saving available.

**5. You're a senior who lost group coverage.**
Original Medicare does not cover routine dental. About 47% of adults 65–80 have no dental coverage. Immediate discounts, no underwriting, no wait.

**6. You're recently laid off or in a benefits gap.**
A new PPO's 6–12 month wait on major work delays care; a ~$175/yr plan works now and can bridge the gap until other coverage starts.

---

## When a PPO clearly wins

**1. You're healthy and mostly need preventive care.**
A PPO pays 100% for cleanings, exams, and X-rays with no wait, so routine care is effectively free after the premium. A savings plan only *discounts* preventive (~40%) — it never makes it free. For a low-needs patient, the PPO usually wins.

**2. You need a large covered procedure that fits under the annual max.**
A $1,500–$2,000 max paying 50–80% can beat a flat discount on the right procedure.

**3. Your employer subsidizes the premium.**
When someone else pays part or all of the premium, the PPO's net cost to you drops sharply and it's hard to beat.

---

## A worked head-to-head (illustrative)

*Scenario: one adult, needs one crown this year plus two cleanings and one exam.*

- **Savings plan:** ~$175 membership + ~$949 crown + ~$134 (two adult cleanings) + ~$35 exam ≈ **$1,293 total.** No wait.
- **PPO (general norms):** ~$420/yr premium + $50 deductible + crown at 50% after a 12-month wait (so likely $0 paid by insurance in year one if the plan is new) → you may pay the full ~$1,000+ crown yourself this year, plus the premium, while cleanings are covered. In a *new* plan, the savings plan often wins year one purely because of the waiting period. In an *established* PPO with no wait and remaining annual max, the PPO can win.

The lesson for the page: **the answer depends on (a) whether you have an active no-wait plan already, (b) how much work you need, and (c) whether it's cosmetic or capped.** CoverCapy's job is to ask those three questions and route accordingly — which is exactly what the decision tree in `09-ux-interactions.md` does.

---

## Can you transition from a savings plan to a PPO later?

Yes, and this "bridge" is core to CoverCapy's positioning ("get cover today, see a dentist tomorrow, upgrade when it makes sense").

- Dental coverage has **no medical underwriting** — pre-existing conditions and missing teeth don't bar you from later enrolling in a PPO.
- A savings plan can **run alongside** insurance, which is especially useful once you've hit the PPO annual max.
- **[UNCERTAIN]** Whether a later PPO will *waive its waiting period* because you held a savings plan: a savings plan is not insurance and may not count as "prior continuous coverage." Some PPOs waive waiting periods with proof of 12 months of prior *insurance.* Verify per carrier — do not promise a waiver.

---

## Families and orthodontics

- Braces run $3,000–$7,000; clear aligners $3,500–$8,000.
- PPO ortho is capped by a **lifetime** maximum (~$1,000–$2,500 per person at 50%), so a $6,000 case still leaves families paying ~$3,000–$4,500.
- A savings plan applies a flat discount (Aetna Dental Access shows ~31% off child braces → roughly $1,864 off a $6,099 case), with **no lifetime cap and no wait, reusable across multiple children.**
- **Honest flag:** ortho discounts (~17–31%) are lower than restorative discounts, so a PPO with a *high* ortho lifetime max can win for a single child. The savings plan's edge is immediacy and reusability across a family.

## Sources

- Cigna — Discount Dental Programs (mechanics): https://www.cigna.com/knowledge-center/discount-dental-programs
- DentalPlans.com — savings plans vs insurance & max-out: https://www.dentalplans.com/blog/compare-dental-insurance-and-dental-savings-plans/ ; https://www.dentalplans.com/blog/max-out-dental-insurance/
- Delta Dental — waiting periods: https://www.deltadental.com/us/en/protect-my-smile/dental-insurance-101/dental-insurance-waiting-period.html
- eAssist — missing-tooth clause: https://dentalbilling.com/understanding-the-missing-tooth-clause/
- CMS / KFF — Medicare dental gap: https://www.cms.gov/medicare/coverage/dental ; https://www.kff.org/medicare/medicare-and-dental-coverage-a-closer-look/
- MetLife — implant cost: https://www.metlife.com/oralfitnesslibrary/dental-treatments/how-much-do-dental-implants-cost/
- MoneyGeek — dental insurance cost 2026: https://www.moneygeek.com/insurance/health/dental-insurance-costs/
