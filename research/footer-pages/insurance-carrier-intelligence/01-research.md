# 01 — Research: Insurance Carrier Intelligence

Page: `/insurance-carrier-intelligence.html`
Purpose: deeper editorial on HOW TO READ a dental plan (annual maximum, deductible, coverage tiers, waiting periods, missing-tooth clause, network), HOW CoverCapy verifies eligibility, and HOW to choose by life event. Companion to the at-a-glance Carrier Watch.

## SOURCE-OF-TRUTH RULE
Any specific featured-plan figure used as an example comes ONLY from `data/plans/*.md` (verified 2026-06-26). General "how plans work" mechanics are explained from authoritative market sources below. Web facts never override a plan file.

---

## A. Plan-reading mechanics (concepts) with grounded market context

### Annual maximum
- Definition: the most the plan pays for covered work in a benefit/calendar year; you pay everything above it.
- Market norm: typically $1,000-$2,000 for individual plans; 73% of PPO consumers now have $1,500+ (up from 67%).
  - Sources: MoneyGeek 2026 (https://www.moneygeek.com/insurance/health/dental-insurance-costs/, accessed 2026-06-26); Money "5 Best Dental Insurance Plans of June 2026" citing NADP (https://money.com/best-dental-insurance/, accessed 2026-06-26).
- Shelf examples (from data/plans): UHC $1,000; Aetna $1,250; Ameritas $2,000->$3,500; Delta $2,000; Guardian $3,000; Humana & Mutual of Omaha $5,000; MetLife $10,000.
- Trend: "roll-over" of unused maximum and "preventive/diagnostic credit" (preventive not counting toward the max) are the notable emerging design features.
  - Source: ADA Dental Benefit Trends (https://www.ada.org/resources/practice/dental-insurance/dental-benefit-trends, accessed 2026-06-26).

### Deductible
- Definition: the amount you pay before coinsurance starts. Usually applies to basic and major only; preventive is typically deductible-free.
- Market norm: ~$25-$100/year; PPO average ~$60 (MoneyGeek).
- Shelf examples: most are $50/person; Humana $75; MetLife is a $100 LIFETIME deductible (paid once ever, not yearly) — a useful "read the fine print" example.

### Coverage tiers (the 100 / 80 / 50 shape)
- Standard structure: preventive ~100%, basic ~80%, major ~50%. Explain coinsurance = the share the PLAN pays; you pay the rest.
- Nuance worth teaching: some plans GRADUATE the percentage by year (MetLife major 10->50->60; UHC basic 50->65->80; Ameritas major 20->50; Mutual of Omaha major 20->50). A low first-year percentage is the trade for no/short waits. (All from data/plans.)
- Trend note (attribute, soft): some 2026 commentary reports plans moving major from 50% toward 60-70%. Source: ToothFeed blog (https://toothfeed.com/blog/dental-insurance-changes-2026-new-rules-that-help/, accessed 2026-06-26) — blog tier, framed as a trend, not a CoverCapy figure.

### Waiting periods
- Definition: time after the start date before a category is covered. Typically: preventive none; basic 0-6 months; major 6-12 months.
- Waivers: many carriers waive basic/major waits with proof of recent prior coverage. Examples from data/plans: Aetna (90-day prior-coverage window), Delta and Humana (prior comparable coverage, gap < 63 days). Humana's implant wait can NEVER be waived. State caps exist (Guardian: WA 6 mo, MN 9 mo).
- Regulatory trend: NY removed waiting periods on most adult dental for marketplace stand-alone plans, effective Jan 1, 2025.
  - Source: NY State of Health press release (https://info.nystateofhealth.ny.gov/news/press-release-improvements-to-stand-alone-dental-plans, accessed 2026-06-26). State-specific; label it.

### Missing-tooth clause (the trap most buyers miss)
- Definition: many plans will NOT pay to replace a tooth that was already missing before the policy started (implant, bridge or denture for that gap is excluded).
- Shelf examples (from data/plans): Guardian carries a missing-tooth clause; Delta has an initial-placement / missing-tooth exclusion (no benefit for a tooth lost before coverage, with state nuance, e.g. CA exempt); Aetna covers prosthetics only for teeth removed WHILE the policy was in force; UHC's higher tiers carry a missing-tooth clause. Teach buyers to ask before enrolling if they already have a gap.

### Network (PPO vs the rest, in-network vs out)
- PPO = a negotiated-fee network you can go outside of (for less coverage). PPOs are >80% of the dental-benefit market (ADA).
- In-network matters because the carrier's negotiated fee is usually well below the cash price, and in-network dentists are paid directly so you do not file your own claim (true on Aetna, for example).
- Network size examples (from data/plans): Aetna 442,000+ locations; Mutual of Omaha (DenteMax Plus) 400,000+; Guardian (DentalGuard Preferred) 360,000+; Delta PPO 112,000+ dentists / 278,000+ locations; UHC 80,000+ dentists; Humana 143,000+ dentists.
- Caveat: networks change; acceptance must be verified at the specific office. That is the bridge to CoverCapy's verify flow.

### How CoverCapy verifies eligibility (product mechanic, from CLAUDE.md + carrier-enrichment-plan)
- CoverCapy never fabricates carrier acceptance. Acceptance traces to a real source (carrier directory match, office self-claim, office "insurance accepted" page, or a confirmed verification), each stored with a source label and a last-verified date.
- The patient-facing flow: pick a carrier, confirm contact details, send a free verification request to the office; CoverCapy never stores the member ID itself, only that one was provided (`member_id_provided: boolean`). Member ID is NEVER stored.
- Display wording matches confidence: verified/directory -> "in-network with"; office-site -> "reported to accept"; always followed by "Verify my coverage, free."
- Source: repo `docs/carrier-enrichment-plan.md`; `CLAUDE.md` (verification_requests schema, "member ID never stored").

## B. Choosing by life event (mapping, all plan facts from data/plans)
- Bridging a gap after losing employer dental, want cleanings + fillings now, on a budget: UHC Primary Dental (~$30, day-one preventive + basic, no major).
- Coming straight off an employer plan and want waits gone: Aetna Dental Direct (90-day waiver) or Delta Dental PPO Premium (prior-coverage waiver).
- Need work now, cannot wait: Ameritas PrimeStar Complete or Mutual of Omaha Preferred (no waiting period; first-year major paid at a reduced rate).
- Planning a crown/implant and want the biggest ceiling: MetLife NCD Complete ($10,000) or Humana/Mutual of Omaha ($5,000).
- Want adult braces: Delta Dental PPO Premium (adult ortho, unusual).
- Want a child's braces: Guardian Premier 2.0 or Delta.
- Want dental + vision + hearing on one plan: Humana Extend 5000 (hearing everywhere except NY).
- Seniors / self-employed wanting stable pricing: Mutual of Omaha (community-rated, age-neutral pricing also true of Ameritas).

## C. Market context summary (for trust framing)
- Average individual dental ~$30/mo; PPO avg $27/mo, $323/yr, ~$60 deductible (MoneyGeek, CMS data, 2026).
- PPO >80% of market; rollover + preventive credit are the live design trends (ADA).
- No-waiting and immediate-coverage options increasingly common in 2026 (Money / NADP).

## D. Guardrails
- Use plan figures only as illustrations of a concept; cite the concept's market source, not the plan file, for "what's normal."
- Honor every do_not in every plan file when a plan is named.
- Member ID never stored. Verification never fabricated. Estimates labeled.
</content>
