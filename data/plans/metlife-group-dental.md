---
plan: "MetLife Group Dental PPO (Preferred Dentist Program)"
slug: "metlife-group-dental"
carrier: "Metropolitan Life Insurance Company (MetLife). Group/employer dental sold via brokers/PEOs; policy form GPNP99. (Distinct from the individual 'NCD by MetLife' product.)"
network: "MetLife PDP Plus (broad PPO); lower-tier designs may use the base PDP network"
product_type: "group"
status: verified
last_verified: "2026-06-26"
# ---- HARD FACTS ----
monthly_premium: "UNPUBLISHED / quote-only. MetLife does not publish group dental rates; age/area-rated and group-specific ('Rates depend on geographic area'). Multi-year rate guarantees and bundling discounts (dental+vision/life/disability) available, with state carve-outs (no discounts in AK/NY/WA; limited in RI; not for groups <=50 lives in FL/MI/MO). Do not state a premium as fact."
annual_maximum: "Employer-selectable menu. Documented real group tiers: $1,000 (Low), $2,000 (High), and $5,000 (top, documented on the CoAdvantage PEO 'Platinum' PDP Plus design). HMO/Managed Care designs have no annual maximum. Resets each plan/calendar year."
deductible: "Documented designs: $50 individual / $150 family in-network (waived for Type A preventive); $75 ind / $225 family out-of-network on the High option. The $50/$150 + preventive-waived pattern also appears on the $5,000 Platinum design."
waiting_periods: "Documented commercial design: Type A none; Type B (basic) 6 months; Type C (major) 12 months; Type D (ortho) 12 months. MetLife's filed standard commonly WAIVES waits for employer groups except for late entrants, groups under ~35% participation, or when matching/replacing an in-force design (~35% threshold is a repeated market characterization, MEDIUM confidence). Dental transition-of-care/takeover handling exists when an employer switches carriers; exact credit terms are a quote-time underwriting item (unpublished)."
coverage_preventive: "Type A 100% in-network (cleanings, exams, bitewings)"
coverage_basic: "Type B 80% in-network (fillings, full-mouth x-rays). Filed menu allows other splits (e.g., 70-90%)."
coverage_major: "Type C 50% in-network (crowns, bridges, dentures, oral surgery, implants)"
implants: "Covered as Type C Major at 50% in-network after deductible, subject to the annual max. Frequency: one per tooth every 10 years; repair one per tooth every 12 months. No separate implant sub-maximum in documented designs. Missing-tooth provision excludes prosthetics for teeth missing before coverage (except congenitally missing)."
orthodontics: "Covered on High-option designs only (excluded on Low). 50% coinsurance. Lifetime ortho maximum employer-selectable, commonly $1,000-$2,000 (documented: $1,000 on a High PPO design; $2,000 on the CoAdvantage Platinum design). Children to age 19 on standard designs, but adult ortho IS available on some designs (the Platinum design covers Adult & Child to age 26). 12-month ortho wait on the documented commercial design. Payout: 20% of the ortho lifetime max at banding, remainder paid over time; ends at coverage cancellation."
whitening: "UNVERIFIED for group designs (cosmetic; typically excluded). Do not assume."
activation: "Group effective dates follow the group policy/plan anniversary (documented plan runs a Jan 1 plan year; deductibles/maximums reset Jan 1). New dependents effective per notice + premium. No instant-activation SLA published for group PDP. The portable TakeAlong add-on can enroll online."
dependent_eligibility: "Spouse/domestic partner eligible. Children from birth to age 26 (end of calendar year the child turns 26; may vary by state). Ortho for children specifically to age 19 on standard designs. Add/drop at anniversary or qualifying life event."
network_size: "MetLife PDP Plus: more than 133,000 unique providers nationwide (MetLife data year-end 2024); voluntary turnover ~1.4%. In-network negotiated fees ~35-50% below average community fees. 21M+ people covered (MetLife data Aug 2025)."
employer_min_size: "Not published as a single number. MetLife small-business portfolio targets <100 employees; documented thresholds: dual-option requires 25+ eligible; TakeAlong/voluntary features at 10+ eligible. Absolute floor is a quote-time/state-filed variable."
employer_contribution: "Not published. Both employer-paid (contributory/non-contributory) and 100% voluntary offered; the split is set by the employer at quote time."
participation: "A participation requirement exists (policy may terminate if not met); specific % unpublished. Market summaries cite a ~35% floor tied to waiting-period waivers (MEDIUM confidence). Voluntary plans typically need ~5 enrolled lives (unpublished)."
rate_basis: "Age/area-rated, group-specific. Multi-year rate guarantees and bundling discounts available (with state carve-outs)."
guaranteed_issue: "Group dental generally guaranteed-issue at the group level (no individual underwriting); not stated verbatim in a retrieved MetLife small-group doc — label as standard."
official_url: "https://www.metlife.com/business-and-brokers/employee-benefits/dental-insurance/"
# ---- sources ----
sources:
  - "MetLife Group Dental (official), https://www.metlife.com/business-and-brokers/employee-benefits/dental-insurance/ (fetched 2026-06-26): PDP Plus network 133,000+ providers (YE2024), funding arrangements, dual-option 25+ and TakeAlong/voluntary 10+ thresholds, 21M+ covered (Aug 2025)."
  - "MetLife group PDP Plus plan summary (Member Benefits, PY 2025-26), policy form GPNP99, https://memberbenefits.com/individuals/dental-and-vision/aop-dental-plan-benefits/ (fetched 2026-06-26): Low $1,000 / High $2,000 max, $50/$150 deductible preventive-waived, 100/80/50 coinsurance, ortho 50% $1,000 lifetime 12-mo wait kids to 19, implants 50% 1/tooth/10yr, children to 26, waiting-period table, rates vary by area."
  - "CoAdvantage PEO 'Platinum' group design, MetLife PDP Plus, Group #0215132 (coverage 10/1/2021-9/30/2022), https://coadenroll.coadvantage.com/Files/2021-2022%20CoAdvantage/Dental/Plan%20Summary/CD24.pdf (fetched 2026-06-26): $5,000 calendar-year max per covered person, $50/$150 deductible, 100/80/50, ortho Adult & Child to age 26 at 50% $2,000 lifetime, children to 26."
  - "MetLife Small Business Products, https://www.metlife.com/business-and-brokers/small-business/products/ (fetched 2026-06-26): <100-employee target, 35,000+ small-business customers, bundling discounts + rate guarantees with state carve-outs."
  - "MetLife Dental Transition of Care Guidelines, https://www.metlifeadminmanual.com/content/dam/MetLife/adm-ga-forms/dental-transition-of-care-guidelines/Dental_Transition_of_Care_Guidelines.pdf (referenced 2026-06-26): carrier-switch takeover handling (full terms not extracted)."
# ---- known traps ----
do_not:
  - "Do NOT confuse this GROUP PDP product with the individual 'NCD Complete by MetLife' (metlife-ncd-complete.md). They are different products with different underwriting and numbers."
  - "Do NOT state a group premium — unpublished/quote-only."
  - "The $5,000 max is real but documented on ONE PEO 'Platinum' design (2021-22 vintage). Present it as 'available on richer designs, e.g., the CoAdvantage Platinum PDP Plus design,' not as a universal MetLife group tier."
  - "Do NOT publish exact minimum group size, employer-contribution %, participation %, or guaranteed-issue wording as MetLife facts — all quote-time/unpublished. The ~35% participation figure is a market characterization, not a MetLife-published number."
  - "Ortho on Low designs is EXCLUDED; only High designs cover it. Lifetime ortho max is $1,000-$2,000 depending on design. Children to 19 standard; adult ortho only on designs that elect it (e.g., Platinum to 26)."
  - "Do NOT conflate MetLife's federal FEDVIP plan (24-month ortho wait) with the commercial group design (12-month)."
---

## Positioning and notes
MetLife is the blue-chip name in employer dental: the PDP Plus network (133,000+ providers, very low turnover) is one a business owner's employees will recognize and trust, and the plan-design menu reaches a genuine $5,000 annual maximum on richer designs (documented on a PEO Platinum design) with adult-and-child orthodontia to $2,000 lifetime. For an owner who wants a household-name benefit that signals "we take care of our people," MetLife is the safe, premium choice.

Who it is for on CoverCapy: the established small or mid-size business that values brand trust and network breadth, and is comfortable working through a broker/PEO quote. Pairs well with bundling (dental + vision + life) for owners consolidating benefits.

Cost-sharing is standard group mechanics: employer funds a share, employee pays the balance via payroll, dependents move the employee up a tier, chair-side cost is the coinsurance plus deductible. MetLife's exact contribution/participation thresholds are set at quote time.

Dentist value angle: PDP Plus is a network most offices already know; CoverCapy routing MetLife-covered employees (especially on high-max designs) to an accredited office means recognizable coverage and high ceilings.
