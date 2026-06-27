# 01 — Research: Carrier Watch

Page: `/carrier-watch.html`
Purpose: at-a-glance "watch" of the 8 featured dental carriers/plans on the CoverCapy shelf, scored on activation speed, waiting periods, major-service timing, strengths/weaknesses, and who each suits. Comparison-table driven.

## SOURCE-OF-TRUTH RULE
Every featured-plan fact (premium, annual maximum, deductible, coverage %, waiting period, activation, caps) comes ONLY from `data/plans/*.md` (last_verified 2026-06-26). The web research below is for MARKET CONTEXT only (trends, ranges, "what's normal"), never to override a plan fact. Where a plan fact and the web disagree, the plan file wins.

---

## A. Featured-plan facts (verbatim from data/plans, do not re-derive)

All 8 are `status: verified`, `last_verified: 2026-06-26`.

### UnitedHealthcare Primary Dental (`uhc-primary-dental.md`)
- Premium ~$30/mo (estimate; ages 18-64; age-banded; NOT printed on official page).
- Annual max $1,000/person/calendar year. Deductible $50 (basic only).
- Waiting periods: NONE on preventive or basic. Major not covered at all (no major wait because no major).
- Preventive 100% day one. Basic 50% day one -> 65% after year 1 -> 80% after year 2.
- Major / implants / ortho: NOT covered (entry tier).
- Activation: as soon as the day after the application is received (Golden Rule policy language). SAFE: "as soon as the day after your application is received." Do NOT promise literal next business day.
- Network: UnitedHealthcare Dental (80,000+ dentists). Underwriter Golden Rule Insurance Company. NOT sold in New York.
- do_not honored: not flat 50%; show 50/65/80. Don't call activation "instant." Don't append "PPO" to network. Don't list major/implant/ortho as covered. AM Best A+ only with "verify on AM Best" caveat -> page does not assert AM Best as hard fact.

### Aetna Dental Direct — Direct Preferred PPO (`aetna-dental-direct.md`)
- Premium ~$50/mo (estimate). Annual max $1,250/person/calendar year (EXACT, no tilde). Deductible $50 ind / $150 family (basic+major only).
- Waiting periods: NONE preventive; basic 6-month; major 12-month. Both waivable if all enrolled had dental coverage within the past 90 days of enrollment.
- Preventive 100% day one. Basic plan pays 80% after 6-mo wait. Major plan pays 50% after 12-mo wait.
- Implants / ortho / whitening: NOT covered.
- CVS ExtraCare Plus perk included (Preferred + Core); $10 monthly reward; not in GA/LA/MN/MO/NY/NJ/OK/TX/VA.
- Activation: 1st of the month after enrollment (page-sourced; brochures silent).
- Network: Aetna Dental PPO, 442,000+ locations. Carrier Aetna Life Insurance Company, part of CVS Health family.
- do_not honored: $1,250 is EXACT (no ~). 90-day waiver window, not "12+ months." Implants/ortho/whitening excluded.

### Ameritas PrimeStar Care Complete (`ameritas-primestar.md`)
- Premium ~$60/mo (estimate; brochure average policyholder cost $55.79/mo; age-neutral).
- Annual max $2,000 year one rising to $3,500 after year one (basic+major; preventive excluded). Deductible $50 (basic+major).
- Waiting periods: NONE on any category (preventive, basic, major, implants all day one).
- Preventive 100% in-network day one. Basic 80% in-network year one -> 90% after year one. Major 20% in-network year one -> 50% after year one.
- Implants: day one at major rate (20% Y1 -> 50% Y2); separate implant max $1,000 day one / $1,500 year 2+, DEDUCTED FROM the annual dental maximum.
- Ortho / whitening: NOT covered on Complete.
- Activation: coverage can begin as soon as TOMORROW (next-day; earliest selectable effective date). Same-day = electronic policy/ID card, not coverage start.
- Network: Ameritas Classic (PPO) network. Not sold in MA.
- do_not honored: not "instant"/"same day" — next-day. Year-one major is 20%, not 50%. Implant sub-cap deducts from annual max. No ortho/whitening. Network is "Classic (PPO)," not "PrimeStar Network."

### Guardian Premier 2.0 / Advantage Premier 2.0 (`guardian-premier-ppo.md`)
- Premium ~$70/mo (estimate; sample $67.89/mo age 35). Annual max $3,000/benefit year. Deductible $50 (waived in-network preventive); separate $50 whitening deductible.
- Waiting periods: NONE on preventive or basic (both day one); 12 months on major, implants, child ortho; 6 months on whitening. WA capped at 6 months, MN at 9 months.
- Preventive 100% in-network day one. Basic 85% in-network day one (75% out-of-network) — highest day-one basic payout on the shelf. Major 60% in-network (50% OON) after 12-mo wait.
- Implants: 60% in-network (50% OON) after 12-mo wait; $1,250 LIFETIME max; missing-tooth clause.
- Ortho: child only (under 19) 60% in-network after 12-mo wait; $750/year, $1,500 lifetime. Adult ortho NOT covered.
- Whitening: 50% in/out after $50 whitening deductible, up to $500/year, 6-mo wait (NOT a flat $500 allowance).
- Activation: 1st of the month after enrollment. 12-month minimum enrollment; 12-month re-enrollment lockout after cancellation.
- Network: DentalGuard Preferred, ~124,000-130,000 dentists / 360,000+ locations. Carrier Guardian (A++ AM Best).
- do_not honored: major/implants 60% IN-NETWORK (50% is the OON figure). Whitening = 50% capped at $500/yr, not flat allowance. Adult ortho NOT covered. Implant cap is separate $1,250 LIFETIME. Note the re-enrollment lockout.

### MetLife NCD Complete (`metlife-ncd-complete.md`)
- Premium ~$100/mo (estimate; reseller ~$94/mo age 35). Annual max $10,000/calendar year (highest on shelf). Deductible $100 LIFETIME (paid once, ever; basic+major; preventive none).
- Waiting periods: NONE on preventive, basic or major.
- Preventive 100% from day one (3 exams + 3 cleanings/calendar year). Basic graduated 65% Y1 / 80% Y2 / 90% Y3+. Major graduated 10% Y1 / 50% Y2 / 60% Y3+.
- Implants: on the graduated major schedule (10/50/60); capped $3,000 per CALENDAR YEAR within the $10,000 max.
- Ortho / whitening: NOT covered.
- Activation: coverage begins the 1st of the month after enrollment (apply by month end).
- Network: MetLife PDP Plus (PPO). Sold as NCD by MetLife (association plan via NWFA; underwritten by Metropolitan Life Insurance Company).
- do_not honored: deductible LEAD term is "$100 lifetime," not "vanishing." Implant cap $3,000 PER CALENDAR YEAR, not lifetime. No ortho/whitening. $10,000 max resets Jan 1. Year-one major is ~10%.

### Humana Extend 5000 (`humana-extend-5000.md`)
- Premium ~$100/mo (estimate; ~$3.30/day). Annual max $5,000/person/calendar year (all dental incl. implants). Deductible $75 (basic+major; waived in-network preventive).
- Waiting periods: preventive NONE; basic 90-day; major 6-month; implants 6-month (CANNOT be waived); whitening NONE. Basic/major waits waivable with 12 months prior creditable coverage (gap < 63 days); implant wait never waivable.
- Preventive 100% in-network day one. Basic 80% after 90-day wait. Major 50% Y1 -> 60% Y2+ after 6-mo wait.
- Implants: 50% Y1 -> 60% Y2+ after 6-mo wait; implant annual max $2,000/person + lifetime $4,000/person; also counts toward $5,000 annual max; 1 per tooth per 5 years.
- Ortho: NOT covered. Whitening: $200 allowance per arch, no wait (not coinsurance).
- Bundles vision + hearing (hearing everywhere except NY; NY is dental + vision only).
- Activation: about 1 week (CoverCapy/Humana enrollment note; not in brochures).
- Network: Humana Extend PPO (143,000+ dentists per brochures).
- do_not honored: basic wait is 90 days (not "3 months" loosely). Implant wait NEVER waivable. Major/implants reach 60% only in YEAR TWO. Whitening has NO wait and is a $200 allowance. Note the implant sub-maximums. NY excludes hearing.

### Mutual of Omaha — Mutual Dental Preferred (`mutual-of-omaha-dental.md`)
- Premium ~$90/mo (estimate; live quote $88.40/mo at $5,000 max). Annual max SELECTABLE $1,500 / $3,000 / $5,000 (CoverCapy features $5,000). Deductible $50 (basic+major).
- Waiting periods: NONE (preventive, basic AND major day one; major ramps by percentage instead of gating).
- Preventive 100% day one. Basic 80% day one (Preferred). Major 20% Y1 -> 50% Y2+, no wait.
- Implants: paid as major; separate $3,000 LIFETIME implant max (Preferred).
- Ortho / whitening: NOT covered.
- Activation: UNVERIFIED — do NOT claim a "next business day" start without a source.
- Network: DenteMax Plus, 400,000+ locations. Underwritten by Mutual of Omaha Insurance Company (administered by TruAssure). Community-rated.
- do_not honored: $5,000 max is real on current 2026 product; NO 12-month major wait (that came from outdated 2021 doc). Major 20% Y1 -> 50% Y2, no wait. Implant cap is $3,000 LIFETIME. Underwritten by Mutual of Omaha (not "underwritten by TruAssure"). Activation UNVERIFIED.

### Delta Dental PPO Premium (`delta-dental-ppo-premium.md`)
- Premium ~$75/mo (estimate; DentalPlans.com $73.11/mo subscriber-only). Annual max $2,000/person/calendar year. Deductible $50/$150 (waived in-network preventive); separate $50 ortho deductible. (Some affiliates use $100, e.g. Delta Dental of WA.)
- Waiting periods: NONE preventive; 6 months basic; 12 months major, implants and ortho. Major/implant/ortho waits waivable with proof of prior comparable major coverage (gap < 63 days).
- Preventive 100% in-network day one. Basic 80% after 6-mo wait (Premium tier). Major 50% after 12-mo wait.
- Implants: 50% (prosthodontics) after 12-mo wait, under the shared $2,000 max; missing-tooth / initial-placement clause; LEAT/alternate-benefit clause.
- Ortho: adults AND children 50% after 12-mo wait; $1,500 lifetime ortho max; separate $50 ortho deductible. (Adult ortho is a Premium-tier feature; ACA-exchange certificates are pediatric medically-necessary only.)
- Whitening: state-specific (80% cosmetic where included; CA excludes). Do NOT present as universal.
- Activation: earliest effective date ~5 days out (DentalPlans.com Individual Premium). Some affiliates offer 1st/15th-of-month starts.
- Network: Delta Dental PPO plus Premier; PPO network alone 112,000+ dentists / 278,000+ locations (largest by location count). Individual PPO sold in 16 states + DC, NOT nationwide.
- do_not honored: major/implants 50% (right rate). Implants under shared $2,000 max, not a separate dollar allowance. Don't omit missing-tooth clause. Adult ortho is Premium-tier-specific, not universal. Whitening state-specific. Individual PPO not nationwide. Deductible usually $50 but some affiliates $100.

---

## B. Market context (web, for framing only — NOT featured-plan facts)

1. **Average individual dental premium ~$30/mo; PPO avg $27/mo ($323/yr), avg deductible ~$60.** Annual maximums typically $1,000-$2,000.
   - Source: MoneyGeek, "How Much Does Dental Insurance Cost? (2026 Guide)," updated 2026-04-23 (CMS exchange data). https://www.moneygeek.com/insurance/health/dental-insurance-costs/ — accessed 2026-06-26.
   - Use: lets us say the cheapest shelf plan (UHC ~$30) sits at the market average, and the high-maximum plans (~$90-$100) are premium-tier.

2. **PPO plans are >80% of the dental-benefit market; "roll-over" of annual maximums and "preventive/diagnostic credit" (preventive not counting toward the max) are the notable emerging design trends; plan design has otherwise changed little in decades.**
   - Source: American Dental Association, "Dental Benefit Trends." https://www.ada.org/resources/practice/dental-insurance/dental-benefit-trends — accessed 2026-06-26.
   - Use: validates why CoverCapy's shelf is PPO-only; supports calling preventive-not-counting-toward-max a real plan feature (several shelf plans do this).

3. **73% of dental-PPO consumers now have a $1,500+ annual maximum, up from 67% the prior year (NADP).** No-waiting-period and "immediate coverage" options are increasingly common in 2026; the highest-premium plans tend to pair short/no waits with high maximums.
   - Source: Money, "5 Best Dental Insurance Plans of June 2026." https://money.com/best-dental-insurance/ — accessed 2026-06-26. (NADP figure cited within.)
   - Use: frames the shelf split between fast/low-max entry plans and high-max plans; supports the "watch" framing of waiting-period and maximum trends.

4. **New York removed waiting periods on most adult dental services for individual stand-alone dental plans on the NY marketplace (effective Jan 1, 2025).** Regulatory pressure is pushing some markets toward shorter waits.
   - Source: NY State of Health press release, "Improvements to Stand-Alone Dental Plans." https://info.nystateofhealth.ny.gov/news/press-release-improvements-to-stand-alone-dental-plans — accessed 2026-06-26.
   - Use: a real, datable regulatory trend for the "what's changing" note. State-specific; label it.

5. **Secondary/blog-tier (cite cautiously, do NOT treat as hard plan facts):** some 2026 commentary reports a shift toward higher minimum maximums and rollover, and toward 60-70% major coverage replacing flat 50%.
   - Source: ToothFeed, "Dental Insurance Changes 2026." https://toothfeed.com/blog/dental-insurance-changes-2026-new-rules-that-help/ — accessed 2026-06-26. (Blog tier; used only as a soft "trend" signal, attributed, never as a CoverCapy figure.)

## C. Guardrails for the build
- Activation timing on the page must mirror each plan file's wording exactly: UHC "day after your application is received"; Ameritas "as soon as the next day"; Mutual of Omaha "varies (not stated)"; Delta "earliest ~5 days, varies by affiliate"; Aetna/Guardian/MetLife "1st of the month after enrollment"; Humana "about a week."
- Never present a single national premium as a fact; always "estimate, varies by state/ZIP/age."
- Do not call any waiting period "waived" without the file's exact waiver rule.
</content>
</invoke>
