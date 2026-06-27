# 01 — Research: Dental Crown Cost (evidence file)

All external figures below carry a source URL and access date. Access date for every web source: **2026-06-26**. Plan facts (coverage percentages, maximums, waits) come ONLY from `/data/plans/` and are tagged with the plan file.

## A. National cost ranges by material (2026, US, without insurance)

| Material | Typical range | Notes |
|---|---|---|
| Porcelain-fused-to-metal (PFM) | ~$800 to $2,000 (avg ~$1,100) | Usually the most affordable tooth-colored crown |
| All-ceramic / all-porcelain (E-max) | ~$1,300 to $1,600 avg, up to ~$2,700 premium | Best front-tooth esthetics; hand-layering raises price |
| Zirconia | starts ~$1,000; commonly $1,200 to $2,700 | Strongest; layered zirconia at higher end |
| Gold / high-noble alloy | up to ~$3,000 | Price tracks precious-metal content |
| Same-day CEREC (chairside) | ~$1,000 to $2,300 | Costs about the same as a comparable lab crown; saves a second visit and the temporary |

Headline range to present: **roughly $800 to $2,500+ per tooth**, national average about **$1,000 to $1,500**, with gold and premium all-ceramic reaching ~$3,000.

Sources:
- realdentalcosts.com — Dental Crown Cost 2026 (by material, with/without insurance): https://realdentalcosts.com/en/dental-crowns/ (accessed 2026-06-26)
- realdentalcosts.com — Dental Crown Cost by Material 2026: https://realdentalcosts.com/en/dental-crown-cost-materials/ (accessed 2026-06-26)
- My Dental Advocate — How Much Are CEREC Crowns: https://mydentaladvocate.com/how-much-are-cerec-crowns-pros-cons-treatment-cost/ (accessed 2026-06-26)
- costinsighthub.com — How Much Does a Crown Cost (2026): https://costinsighthub.com/us/dental/how-much-does-a-crown-cost (accessed 2026-06-26)

## B. What drives crown price
- Material (see table; metal content and lab artistry are the biggest swings).
- Chair time across two-plus visits, impressions or digital scans, lab fabrication.
- Add-ons that often ride along: core build-up, post, root canal before the crown, gum work. These are separate line items.
- Tooth position (front esthetic crowns cost more), geography, and whether the office is in-network.
Source: realdentalcosts.com (above); existing CoverCapy page `guides/crowns/cost.html` confirms the same build-up/root-canal stacking logic.

## C. How PPO plans treat crowns (from /data/plans/ SSOT — do NOT invent)
A crown is a **major service** on a PPO plan. Coverage norm across the CoverCapy shelf:

- **Delta Dental PPO Premium** (`delta-dental-ppo-premium.md`): major work (crowns, root canals, dentures, bridges, oral surgery) at **50% after deductible, after a 12-month wait**, subject to the **$2,000 calendar-year maximum**; $50/$150 deductible.
- **Guardian Premier 2.0** (`guardian-premier-ppo.md`): crowns/major at **60% in-network (50% out-of-network) after a 12-month wait**, under a **$3,000 benefit-year maximum**; $50 deductible.
- **NCD Complete by MetLife** (`metlife-ncd-complete.md`): major graduated **10% yr1, 50% yr2, 60% yr3+** (day one, no wait), under a **$10,000 calendar-year maximum**; $100 lifetime deductible. (Shows that some plans pay from day one but ramp the percentage.)

General norm to state on the page (supported by SSOT above + external sources): **most PPO plans pay 50% (some in-network tiers 60%) toward a crown as a major service, after the deductible and any 6-to-12-month waiting period, and a single crown can use most of a $1,000 to $2,000 annual maximum.** Crowns are covered only when **medically necessary** (decay, fracture, post-root-canal), not when purely cosmetic.

External corroboration (general norms only, NOT used for any specific plan number):
- DentalPlans.com — Best Dental Plan for Crowns: https://www.dentalplans.com/blog/best-dental-plan-for-crowns/ (accessed 2026-06-26) — "commonly reimburse crowns at 50%, annual caps $1,250 to $2,000."
- getglobalcare.com — How Much Does a Dental Crown Cost With Insurance: https://www.getglobalcare.com/blog/how-much-is-a-crown-with-insurance (accessed 2026-06-26) — typical out-of-pocket ~$500 to $900 after 50% coverage.
- Delta Dental — Dental Insurance Waiting Period: https://www.deltadental.com/protect-my-smile/dental-insurance-101/dental-insurance-waiting-period/ (accessed 2026-06-26) — major services 6 to 12 month waits.
- dentistkatytx.com — Does Dental Insurance Cover Crowns (2026 Guide): https://dentistkatytx.com/does-dental-insurance-cover-crowns/ (accessed 2026-06-26).

## D. With vs without PPO (illustrative math, ranges only)
- Without insurance: pay the full $800 to $2,500+.
- With a PPO that pays 50% on major after the wait: a $1,400 crown nets roughly **$700 out of pocket** after the deductible, until the annual maximum is reached. In-network 60% tiers lower that further. Present as a range, not a single figure.

## E. Financing options (no plan-specific numbers)
0% APR healthcare cards (CareCredit, Sunbit) over 6 to 24 months; in-house office payment plans; dental savings plans; FSA/HSA dollars; personal loans; and a PPO plan that pays a share. No-credit and low-down options exist. Mirrors existing `guides/crowns/financing.html` and `dental-financing-monthly-payments.html`.

## F. Competitor angle
Most crown-cost pages are single-office SEO posts or aggregators. CoverCapy's edge: pairs an honest cost range with the *concierge* path (verify PPO at the office, find an in-network dentist, estimate, finance) and the SSOT-backed coverage facts. Internal-link moat to compare-plans, find-my-dentist, estimator, financing, and sibling cost pages.
