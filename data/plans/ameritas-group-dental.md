---
plan: "Ameritas Group / Employer Dental PPO"
slug: "ameritas-group-dental"
carrier: "Ameritas Life Insurance Corp. Group/employer product sold through brokers as custom plan designs (distinct from the individual 'Ameritas PrimeStar' product). Groups <=25 enrolled lives: billing/eligibility via HealthPlan Services, Inc.; 26+ lives: administered directly by Ameritas Life."
network: "Ameritas Dental Network (marketing). Underlying networks: Classic Network, Classic Plus Network, 'Ameritas Network'. Texas-agent material notes a two-tier split: Classic (larger, most PPO plans) vs Network (narrower, lower-cost)."
product_type: "group"
status: verified
last_verified: "2026-06-26"
# ---- HARD FACTS ----
monthly_premium: "UNPUBLISHED for group — quote-only by broker. The only published Ameritas rates are INDIVIDUAL PrimeStar (~$29-$65/mo single adult, 2026 TX) which are NOT group rates. Do not present individual rates as employer premiums. No billing fee with autopay (ACH)."
annual_maximum: "Fully configurable per group. Marketplace tiers run $1,000 to $5,000 (CalChoice 'PPO 3000/3500/4000/5000' naming maps to max dollars; a $5,000-max group plan IS available). Real deployed examples: $1,100/person in-network (County of Glenn); $2,000/year (SAS Institute). NOTE: exact benefit grid for the $5,000 CalChoice tier is UNCONFIRMED (PDF was image-only) — confirm via broker quote before publishing the $5,000 tier's coinsurance/deductible as fact."
deductible: "Configurable. Examples: $50 LIFETIME deductible on Type 2/3, preventive waived (County of Glenn); $0 deductible (SAS Institute). Individual/family split set per group."
waiting_periods: "Group plans commonly have NONE (both real group sheets show 'Waiting Period: None' across all types incl. ortho). Takeover credit honored (ortho-in-progress lifetime max not restarted; waits routinely waived when replacing prior coverage)."
coverage_preventive: "Type 1 Preventive 100%"
coverage_basic: "Type 2 Basic commonly 80% (some designs 100%, e.g., SAS)"
coverage_major: "Type 3 Major commonly 50% (some designs 60%, e.g., SAS). Note: Ameritas group plans frequently keep identical coinsurance/deductible/max in vs out of network — savings come from negotiated in-network fees."
implants: "Classified as Major (Type 3); covered where Major includes implants. Coinsurance follows the Major % (50-60%). No separate published implant sub-max — draws against the general annual max."
orthodontics: "Selectable add-on/rider. ADULT AND CHILD both covered on group plans (a differentiator vs individual PrimeStar). 50% coinsurance. Lifetime ortho max observed $1,000-$2,500/person (Glenn $1,000; SAS $2,500). Ortho wait can be None on group plans. Ortho takeover: prior plan's lifetime max taken over, not restarted."
whitening: "UNVERIFIED (cosmetic)."
activation: "Group: effective at enrollment; late entrants who skip initial eligibility wait for next annual open enrollment (effective Jan 1). Renewals: employer notified before renewal of any rate change."
dependent_eligibility: "Employee + spouse + dependent children, EACH with their own annual maximum AND own Dental Rewards bucket. Specific child age limits set in the group certificate (not centrally published); some benefit sub-limits apply (fluoride to 18, sealants to 15 in the Glenn design)."
network_size: "Self-described 'one of the largest in the nation.' Broker figures (2026): 400,000+ access points / 100,000+ unique providers, 94% provider persistency; in-network savings ~25-50%. Not available in RI."
employer_min_size: "Small-business segment serves 3-100 eligible employees."
employer_contribution: "Flexible — employer may cover a percentage of premium, or none at all (fully voluntary allowed)."
participation: "Employer-contributory designs typically require participation (~40% on partner marketplaces). Voluntary plans have NO minimum participation. Voluntary premiums via payroll deduction."
rate_basis: "Custom-quoted by broker (group size, ZIP, demographics, design, contribution/participation). Small groups (3-100) can be quoted online."
guaranteed_issue: "Not explicitly stated in primary docs; group dental at these sizes is typically GI with no medical underwriting (late-entrant rules apply). Label as standard/unconfirmed."
official_url: "https://www.ameritas.com/businesses/dental-vision/small-businesses/"
# ---- signature feature ----
dental_rewards: "Dental Rewards (annual-maximum carryover): file >=1 claim AND stay at/under a benefit threshold ($500 typical) to carry over an amount ($250 typical) into next year's max; PPO Bonus adds extra ($100-$150) for seeing in-network; max accumulation cap $1,000 combined. If no claim is filed in a year, ALL accumulated rewards are LOST (rebuild next year). Thresholds vary by group (Glenn design: $500 threshold, $350 carryover, $150 PPO bonus, $1,000 cap)."
# ---- sources ----
sources:
  - "Ameritas Dental & Vision for Small Businesses (official), https://www.ameritas.com/businesses/dental-vision/small-businesses/ (fetched 2026-06-26): custom broker-built designs, 3-100 segment, contribution flexibility, online quoting, ortho add-on, network 'one of the largest', ACH no-fee."
  - "Ameritas Dental Rewards (GR 5868), https://vcsbenefits.org/images/documents/Dental_Rewards.pdf and explainer (GR 5924), https://www.employeebenefitservice.com/OCM/GetFile?doc=406844 (fetched 2026-06-26): $1,000 cap / $500 threshold / $250 carryover / $100 PPO bonus / forfeiture rule; per-dependent rewards bucket; 26+/25- admin split; not available RI."
  - "County of Glenn Ameritas group highlight sheet (Policy #302149), https://www.countyofglenn.net/sites/default/files/resources/COUNTY%20OF%20GLENN%20PRISM%20DENTAL_%20AMERITAS%20HIGHLIGHTS%20(Base)_0.pdf (fetched 2026-06-26): $1,100 max, $50 lifetime deductible preventive-waived, 100/80/50, ortho adult+child 50% $1,000 lifetime no wait, Classic Plus Network."
  - "SAS Institute Ameritas group summary, https://www.employeebenefitservice.com/OCM/GetFile?doc=333755 (fetched 2026-06-26): $2,000 max, $0 deductible, 100/100/60, ortho adult+child 50% $2,500 lifetime, $1,800 TMJ max, takeover credit, in=out network levels."
  - "CalChoice Ameritas carrier page, https://www.calchoice.com/Public/Carriers/Ameritas and 'PPO Plans 3000/3500/4000/5000' PDF, https://www.calchoice.com/getattachment/e2f18633-09f7-4cae-90e9-ea6977b22043/Dental_4000_5000_20210401.pdf (fetched 2026-06-26): four pre-packaged PPO options; $5,000 tier exists (grid image-only/unconfirmed); 25-50% savings."
# ---- known traps ----
do_not:
  - "Do NOT confuse this GROUP product with the individual 'Ameritas PrimeStar' (ameritas-primestar.md). Group plans are custom broker designs, cover adult+child ortho, and use the Classic/Classic Plus networks."
  - "Do NOT publish the $5,000 CalChoice tier's exact coinsurance/deductible as fact — the grid was image-only/unconfirmed. The $5,000 max EXISTS; its detailed design must be confirmed via broker quote."
  - "Do NOT present individual PrimeStar rates ($29-$65/mo) as group/employer premiums. Group rates are quote-only."
  - "Do NOT omit Dental Rewards forfeiture: if no claim is filed in a year, ALL accumulated rewards reset to zero."
  - "Each covered person has their OWN annual max AND own rewards bucket — do not describe a single family pool."
  - "Do NOT state a hard dependent age cap — set per group certificate."
---

## Positioning and notes
Ameritas is the carryover-and-flexibility play. Its Dental Rewards feature lets each covered person (employee AND each dependent) bank unused annual maximum year over year, so a sensible mid-max plan grows a real cushion — as long as they file at least one claim a year (skip a year and the rewards reset). Group designs are fully custom: an employer can dial the annual max from $1,000 up to a $5,000 marketplace tier, add adult-and-child orthodontia (up to ~$2,500 lifetime in real deployments), and usually run with no waiting periods. Contribution is flexible down to fully voluntary, and Ameritas writes small (3-100).

Who it is for on CoverCapy: the owner who wants a tailored design and likes rewarding employees who actually use preventive care, with the option to scale the max high.

Cost-sharing is standard group mechanics, quote-rated. The Dental Rewards nuance (per-person buckets, file-a-claim-or-lose-it) is worth surfacing to employees so they keep the benefit growing.

Dentist value angle: rewards encourage regular preventive visits (good recall flow for offices) and the in-network PPO Bonus nudges patients to in-network (accredited) dentists specifically.
