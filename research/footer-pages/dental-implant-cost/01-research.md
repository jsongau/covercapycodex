# 01 — Research: Dental Implant Cost

**Page slug:** dental-implant-cost
**Built:** repo root `/dental-implant-cost.html`
**Compiled:** 2026-06-26

Every external figure below carries a source URL and access date. Plan facts are pulled
ONLY from `data/plans/*.md` (the single source of truth), re-verified against the cited
brochures inside those files. Ranges are presented as ranges; no false precision.

---

## 1. Single-tooth implant cost (implant + abutment + crown), US, 2026

National all-in range, single tooth: **$3,000 to $6,000** (commonly cited average
~$4,500). High-cost metros (NYC, LA, Chicago) run 20 to 40 percent higher, reaching
$6,000 to $8,000.

Component breakdown (2026):

| Component | Typical range (USD) |
|---|---|
| Tooth extraction (if needed) | $300 to $800+ |
| Bone graft (if needed) | $300 to $1,200 (complex grafts / sinus lifts $1,500 to $5,000) |
| Implant post (titanium fixture) | $1,000 to $3,000 |
| Abutment | $400 to $1,000 |
| Crown (porcelain or zirconia) | $800 to $3,000 |
| **Total, single tooth all-in** | **$3,000 to $6,000** |

Sources:
- Surgery Cost Guide, "Dental Implant (Single Tooth) Cost: $4,500 Avg in 2026 ($3,000–$6,000)" — https://surgerycostguide.com/dental-implant-cost/ (accessed 2026-06-26)
- Mainstreet Dental, "Dental Implant Cost in the USA: 2025–2026 Guide" — https://mainstreetdentalnewark.com/dental-implant-cost-in-the-usa/ (accessed 2026-06-26)
- The Dental Express, "Dental Implants Fees Explained: Full Cost Breakdown (2026)" — https://www.thedentalexpress.com/dental-blog/dental-implants-fees/ (accessed 2026-06-26)
- Minot Dental Partners, "What Is Included in Dental Implant Cost: 2026 Guide" — https://www.minotdentalpartners.com/blog/what-is-included-in-dental-implant-cost/ (accessed 2026-06-26)
- Aspen Dental, "Dental Implants Cost & Pricing Guide" — https://www.aspendental.com/dental-implants/dental-implants-cost/ (accessed 2026-06-26)

---

## 2. Full-mouth / All-on-4 cost, US, 2026

- All-on-4 / fixed full arch, acrylic hybrid: **$20,000 to $35,000 per arch** (some
  sources cite a national average near $15,000 to $20,000 per arch; budget acrylic from
  ~$14,000).
- Premium zirconia arches: $35,000 to $90,000+ per arch.
- Full mouth, both arches: **$30,000 to $50,000** typical, up to $40,000 to $120,000+ for
  premium materials.
- More implants per arch (6 to 8 vs 4) adds roughly $5,000 to $15,000 per arch.

Sources:
- Advanced Smile Dental, "Full Mouth Dental Implants Cost 2026 [All-on-4 to All-on-8]" — https://advancedsmile.dental/how-much-does-it-cost-to-get-a-full-mouth-of-dental-implants/ (accessed 2026-06-26)
- Real Dental Costs, "Full Mouth Dental Implants Cost 2026: Per Arch & Both" — https://realdentalcosts.com/en/full-mouth-dental-implants-cost/ (accessed 2026-06-26)
- NewMouth, "Types of Dental Implants and Their Cost (2026 Guide)" — https://www.newmouth.com/dentistry/restorative/implants/cost/ (accessed 2026-06-26)
- Aspen Dental, "Full Mouth Dental Implants Cost Guide" — https://www.aspendental.com/dental-implants/full-mouth-dental-implants/full-mouth-dental-implants-cost/ (accessed 2026-06-26)

---

## 3. Bone graft and sinus lift add-ons, 2026

- Dental bone graft, national range: **$300 to $1,200** for routine socket grafts;
  CareCredit cites a wider $549 to $5,148 spread across graft types.
- Sinus lift: **$1,500 to $2,500 per side** typical; up to $5,000 per side for complex
  cases. Both sides can reach ~$5,000+.

Sources:
- CareCredit, "Dental Bone Graft Cost and Procedure Guide" — https://www.carecredit.com/well-u/health-wellness/bone-grafting-cost/ (accessed 2026-06-26)
- True Dental Studio, "Sinus Lift for Dental Implants: Procedure & Cost (2026)" — https://www.truedentalstudio.com/sinus-lift (accessed 2026-06-26)
- Dentaly.org, "Sinus Lift for Dental Implants: Cost, Risks, and Recovery" — https://www.dentaly.org/us/teeth-implants-cost/sinus-lift/ (accessed 2026-06-26)

---

## 4. How PPO dental plans treat implants (PLAN FACTS — from data/plans/ SSOT)

Implants sit in the "major services" bucket alongside crowns, bridges, and dentures.
The two binding constraints are almost always the **annual maximum** (commonly $1,000 to
$2,000) and the **missing-tooth clause**. The figures below are taken verbatim from the
CoverCapy plan SSOT files, not invented.

| Plan (SSOT file) | Implant coverage | Waiting period | Annual / implant cap | Notes |
|---|---|---|---|---|
| Ameritas PrimeStar Care Complete | 20% in-network year one, rising to 50% after year one (10% / 30% OON) | None (day one) | Implant sub-max $1,000 day one / $1,500 year 2+, DEDUCTED FROM the annual dental max ($2,000 day one rising to $3,500) | Day-one access to bone graft, extraction, placement, abutment, crown |
| Humana Extend 5000 | Year one 50% rising to 60% year two+ (after deductible) | 6 months (cannot be waived) | Implant annual max $2,000/person AND lifetime max $4,000/person; also counts toward the $5,000 combined annual max | Surgical placement on the major schedule; one per tooth per 5 years |
| Guardian Premier 2.0 | 60% in-network (50% OON) after a 12-month wait | 12 months (WA 6 mo, MN 9 mo) | Separate $1,250 LIFETIME implant maximum; plan annual max $3,000 | Missing-tooth clause applies |
| Delta Dental PPO Premium | 50% after a 12-month wait | 12 months | Shared $2,000 calendar-year max; $50 deductible | Initial-placement / missing-tooth exclusion (extraction must have occurred while covered under a Delta plan; applies to Premium renewals from Aug 2025 except California) |

Two plans on the CoverCapy shelf **exclude implants** entirely: Aetna Dental Direct and
UHC Primary Dental (confirmed in `data/plans/aetna-dental-direct.md` and
`data/plans/uhc-primary-dental.md` and on the implant guide).

Plan-fact traps honored (from the `do_not` lists in the SSOT):
- Ameritas year-one major is **20%**, not 50%. The $1,000/$1,500 implant cap is
  DEDUCTED FROM the annual max, not on top of it.
- Guardian major/implants pay **60% in-network, 50% out-of-network** (the 50% is the OON
  figure). Implant cap is a **$1,250 lifetime** maximum, separate from the annual max.
- Humana has BOTH a $2,000 annual implant cap and a $4,000 lifetime implant cap, and
  implants also count toward the $5,000 combined annual max. The 6-month implant wait can
  never be waived.
- Delta implant exclusion: do not omit the missing-tooth / initial-placement clause.

Source for plan facts: CoverCapy `data/plans/ameritas-primestar.md`,
`data/plans/humana-extend-5000.md`, `data/plans/guardian-premier-ppo.md`,
`data/plans/delta-dental-ppo-premium.md` (each traces to the carrier brochure listed in
its `sources` block; `last_verified` 2026).

---

## 5. General PPO coverage norms (external corroboration)

- Most PPO plans cap annual benefits at **$1,000 to $2,000**, and because a full implant
  usually costs more than that cap, many patients still pay $1,500 to $3,000 out of
  pocket even with coverage.
- Missing-tooth clause = the plan will not pay to replace a tooth that was already
  missing before coverage began. It is a leading cause of denied implant claims.
- Predetermination of benefits (ADA) gives a written estimate before treatment; it is an
  estimate, not a guarantee.

Sources:
- Surgery Cost Guide (annual-max interaction) — https://surgerycostguide.com/dental-implant-cost/ (accessed 2026-06-26)
- Spirit Dental & Vision, "Dental Implant Insurance Coverage" — https://spiritdental.com/dental-insurance/dental-implants-insurance-coverage (accessed 2026-06-26)
- Outsource Strategies Intl., "Missing Tooth Clause in Dental Insurance" — https://www.outsourcestrategies.com/blog/what-is-the-missing-tooth-clause-in-dental-insurance/ (accessed 2026-06-26)
- American Dental Association, "Pre-Authorizations" — https://www.ada.org/resources/practice/dental-insurance/pre-authorizations (accessed 2026-06-26)

---

## 6. Financing options, 2026

- **CareCredit**: deferred-interest promo plans over 6, 12, 18, or 24 months (no interest
  if paid in full before the window closes). If a balance remains, deferred interest is
  added back at a published APR around 32.99%. Accepted at 285,000+ provider locations.
- **In-house practice financing**: offered directly by the dental office, often low- or
  no-interest if paid within a set window (e.g. 12 months).
- **Third-party patient lenders** (Cherry, Proceed, Sunbit, etc.): many approve patients
  with less-than-perfect credit; some advertise no hard credit check for prequalification.
- **HSA / FSA** funds can be applied to implants as a qualified medical expense.

Sources:
- CareCredit, "Dental Credit Card and Dental Financing Options" — https://www.carecredit.com/dentistry/ (accessed 2026-06-26)
- CareCredit, "Dental Implants Cost and Procedure Guide" — https://www.carecredit.com/well-u/health-wellness/dental-implants-cost-dental-implants-financing/ (accessed 2026-06-26)
- Cherry, "Dental Implants Financing: 17 Options to Afford Care" — https://withcherry.com/blog/dental-implants-financing (accessed 2026-06-26)
- SeniorLiving.org, "A Complete Guide to Financing Dental Implants (2026)" — https://www.seniorliving.org/health/dental-implants/financing/ (accessed 2026-06-26)

---

## 7. Internal reference assets reused

- `glossary-briefs/term-implants.md` — staging strategy, missing-tooth clause, per-code
  breakdown, two-benefit-year strategy.
- `preview/implants-preview.html` — existing implant guide cost table + sourced list.
- `data/plans/*.md` — all plan facts.
- `dental-treatment-cost-estimator.html`, `dental-financing-monthly-payments.html`,
  `compare-ppo-dental-plans` — internal-link targets.
