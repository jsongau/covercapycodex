# 08 — Plan-Fit by Scenario
## Authoritative SSOT-Sourced Profiles + Decision Matrix

**File:** `research/ppo-hub-rebuild/08-plan-fit-by-scenario.md`
**Created:** 2026-06-26
**SSOT source:** `/data/plans/*.md` — every fact below is field-cited.
**Rule:** No em-dashes. Every figure must trace to the cited SSOT field.

---

## PART 1 — PLAN PROFILES (one per featured plan, all fields SSOT-cited)

---

### 1. UnitedHealthcare Primary Dental
**SSOT:** `uhc-primary-dental.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$30/mo | `monthly_premium` |
| Annual maximum | $1,000/person/calendar year | `annual_maximum` |
| Deductible | $50/person, basic only (max 3 per family) | `deductible` |
| Preventive | 100% day one, no deductible | `coverage_preventive` |
| Basic | 50% day one, 65% year two, 80% year three | `coverage_basic` |
| Major | NOT COVERED | `coverage_major` |
| Implants | NOT COVERED | `implants` |
| Orthodontics | NOT COVERED | `orthodontics` |
| Whitening | UNVERIFIED (likely excluded) | `whitening` |
| Waiting periods | None on preventive or basic | `waiting_periods` |
| Activation | As soon as the day after application received | `activation` |
| Network | UnitedHealthcare Dental, 80,000+ dentists | `network` |
| Carrier/underwriter | Golden Rule Insurance Company (UHC company) | `carrier` |
| Age cap | Adults 18 to 64 | `monthly_premium` note |
| NOT available in | New York | `not_in_ny` |

**Standout edge:** Lowest premium on the shelf (~$30/mo). Preventive and basic covered day one with no waiting periods. Fast start (next-day). Simplest, cheapest entry.

**Who it is for:** Budget-conscious adults ages 18 to 64 who mainly want cleanings covered and basic fillings available immediately, especially those bridging a gap after losing employer dental benefits. Ideal for the preventive-only lifestyle buyer.

**Who should skip:** Anyone needing crowns, root canals, bridges, dentures, implants, or braces. All major work is simply not covered on this tier. New York residents cannot enroll. Buyers 65+ are outside the eligible age band. People who want the basic share to grow beyond 50% quickly should look elsewhere (it takes two full years to reach 80%).

---

### 2. Aetna Dental Direct (Direct Preferred PPO)
**SSOT:** `aetna-dental-direct.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$50/mo | `monthly_premium` |
| Annual maximum | $1,250/person/calendar year (exact, not estimated) | `annual_maximum` |
| Deductible | $50 individual / $150 family per calendar year; basic + major only | `deductible` |
| Preventive | 100% in-network, day one, no deductible | `coverage_preventive` |
| Basic | Plan pays 80% (member pays 20%) after 6-month wait (waivable) | `coverage_basic` |
| Major | Plan pays 50% (member pays 50%) after 12-month wait (waivable) | `coverage_major` |
| Implants | NOT COVERED (explicitly excluded) | `implants` |
| Orthodontics | NOT COVERED on any Dental Direct tier | `orthodontics` |
| Whitening | NOT COVERED (always cosmetic, excluded) | `whitening` |
| Waiting period waiver | Waived if all enrolled family members had dental coverage within past 90 days of enrollment | `waiting_periods` |
| Activation | 1st of the month after enrollment | `activation` |
| Network | Aetna Dental PPO, 442,000+ dentist locations | plan page note in `sources` |
| CVS perk | CVS ExtraCare Plus: $10/mo reward, 20% off CVS Health brand products, free CVS.com shipping. NOT in GA, LA, MN, MO, NY, NJ, OK, TX, VA. Requires registration. | `cvs_extracare_plus` |
| Missing tooth clause | Yes -- prosthetics only for teeth lost while policy was in force | `do_not` (last bullet) |

**Standout edge:** Largest network on the shelf (442,000+ locations). CVS ExtraCare Plus perk ($10/mo reward = up to $120/yr) included free on the Preferred and Core tiers. Waiting periods fully waivable with 90-day prior-coverage proof, making it strong for buyers coming off employer dental.

**Who it is for:** Balanced everyday buyer who wants a large network, a familiar name, and the CVS perks bonus. Ideal for someone coming off employer dental who can waive the waits. CVS Health brand shoppers and families who want simple 100/80/50 coverage.

**Who should skip:** Buyers who need implants (explicitly excluded), orthodontics (no tier covers it), or whose annual needs will exceed $1,250 (two crowns will brush the ceiling). Residents of the 9 CVS-excluded states (GA, LA, MN, MO, NY, NJ, OK, TX, VA) lose the perk. Buyers who cannot document 90-day prior coverage will face the full 6/12-month waits. Missing tooth clause applies.

---

### 3. Ameritas PrimeStar Care Complete
**SSOT:** `ameritas-primestar.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$60/mo (brochure avg $55.79) | `monthly_premium` |
| Annual maximum | $2,000 year one, rises to $3,500 after year one (basic + major combined; preventive does not count against max) | `annual_maximum` |
| Deductible | $50/person, basic + major only ($0 preventive) | `deductible` |
| Preventive | 100% in-network, day one (80% OON) | `coverage_preventive` |
| Basic | 80% in-network year one, 90% year two+ (60%/70% OON); no wait | `coverage_basic` |
| Major | 20% in-network year one, 50% year two+ (10%/30% OON); no wait | `coverage_major` |
| Implants | Day one access at major rate: 20% year one, 50% year two+; implant sub-max $1,000 year one / $1,500 year two+ (deducted from annual max) | `implants` |
| Orthodontics | NOT COVERED on Care Complete ("No benefit") | `orthodontics` |
| Whitening | NOT COVERED on Care Complete | `whitening` |
| Waiting periods | NONE on any category | `waiting_periods` |
| Activation | Coverage as soon as tomorrow (next-day); same-day electronic ID card | `activation` |
| Network | Ameritas Classic (PPO) / Ameritas Dental Network | `network` |
| Hearing | 50% up to $200/ear, $75 annual exam (not in NH) | `sources` (GR 8228 MAC) |
| Not available in | Massachusetts (no dental plans available) | `sources` (GR 7708) |
| Premium basis | Age-neutral pricing (set by ZIP not age) | `monthly_premium` |

**Standout edge:** No waiting periods on anything, including major work and implants. Coverage starts as soon as the next day. Age-neutral pricing (seniors do not pay more by age). Day-one implant access covers bone graft/extraction/placement/abutment/crown phases without a waiting period.

**Who it is for:** Anyone who needs to start using benefits immediately. The best day-one implant access on the shelf. Seniors who benefit from age-neutral pricing. Buyers who want a quick start without documenting prior coverage. The uninsured who just found out they need a root canal next week.

**Who should skip:** People wanting orthodontics or whitening (neither is covered on Care Complete). Buyers planning an implant in year one who expect 50% reimbursement immediately (year one is only 20%; the 50% rate arrives in year two). Massachusetts residents (no plans available). Anyone who wants a single clean annual maximum figure should note the two-tier $2,000/$3,500 structure.

---

### 4. Delta Dental PPO Premium
**SSOT:** `delta-dental-ppo-premium.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$75/mo (basis: DentalPlans.com $73.11/mo subscriber-only) | `monthly_premium` |
| Annual maximum | $2,000/person/calendar year (resets Jan 1) | `annual_maximum` |
| Deductible | $50/person, $150/family, calendar year; separate $50 ortho deductible; some affiliates use $100 | `deductible` |
| Preventive | 100% in-network, day one, deductible waived; does not count against $2,000 max | `coverage_preventive` |
| Basic | 80% after deductible, 6-month wait | `coverage_basic` |
| Major | 50% after deductible, 12-month wait | `coverage_major` |
| Implants | 50% (prosthodontics) after 12-month wait, shared $2,000 max; missing-tooth exclusion applies (Aug 2025 renewals, except CA) | `implants` |
| Orthodontics | Adults AND children: 50% after 12-month wait; $1,500 lifetime max per person; separate $50 ortho deductible; Invisalign same terms | `orthodontics` |
| Whitening | 80% where offered (state-specific, NOT universal; CA excludes it; label state-specific always) | `whitening` |
| Waiting period waiver | Major/implant/ortho waits waivable with prior comparable coverage, no more than 63-day gap | `waiting_periods` |
| Activation | Earliest about 5 days out; 1st or 15th of month starts available (affiliate-specific) | `activation` |
| Network | Delta Dental PPO: 112,000+ dentists, 278,000+ locations (largest by location count) | `network` |
| Availability | 16 states plus DC only (not nationwide individual enrollment) | `do_not` |

**Standout edge:** Largest dentist network in the US for a PPO (112,000+ dentists, 278,000+ locations). One of the only individual plans that covers adult orthodontics (Invisalign same terms). Very flexible start dates (5-day minimum, 1st or 15th start).

**Who it is for:** Adults who want the greatest dentist choice and are most likely to already be seeing an in-network dentist. The adult who wants braces or Invisalign and cannot get it elsewhere on an individual plan. Buyers who can time major work past 12 months or stage a large case across two calendar years.

**Who should skip:** People needing major work, implants, or braces in the next 12 months (all have 12-month waits). Buyers who need the highest ceiling (only $2,000/year, which a crown plus a bridge can exhaust in one calendar year). Buyers in the 34+ states where the individual Premium tier is not sold. Missing-tooth clause applies on implants (Aug 2025 renewals, except CA). Deductible may be $100 in some affiliates, not $50.

---

### 5. Guardian Premier PPO (Advantage Premier 2.0)
**SSOT:** `guardian-premier-ppo.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$70/mo (sample quote $67.89 age 35) | `monthly_premium` |
| Annual maximum | $3,000/person/benefit year | `annual_maximum` |
| Deductible | $50/person; waived for in-network preventive; separate $50 whitening deductible | `deductible` |
| Preventive | 100% in-network and 100% OON (after deductible) from day one | `coverage_preventive` |
| Basic | 85% in-network (75% OON), day one, no waiting period | `coverage_basic` |
| Major | 60% in-network (50% OON), 12-month wait (WA: 6 months; MN: 9 months); waivable with prior comparable coverage | `coverage_major` |
| Implants | 60% in-network (50% OON), 12-month wait; $1,250 LIFETIME maximum (separate from annual max); missing-tooth clause applies | `implants` |
| Orthodontics | CHILD ONLY (dependents under 19, appliance first placed): 60% in-network (50% OON), 12-month wait; $750/benefit year, $1,500 lifetime max | `orthodontics` |
| Whitening | 50% in-network and OON after 6-month wait and separate $50 whitening deductible; up to $500/year (coinsurance cap, not flat allowance) | `whitening` |
| Waiting periods | None on preventive or basic; 12 months on major, implants, child ortho; 6 months on whitening | `waiting_periods` |
| Activation | 1st of the month after enrollment; 12-month minimum enrollment; 12-month re-enrollment lockout after cancellation | `activation` |
| Network | DentalGuard Preferred: 124,000-130,000 dentists, 360,000+ office locations | `network` |
| Carrier rating | A++ AM Best | `carrier` |

**Standout edge:** Highest day-one basic payout on the shelf (85% in-network, no wait). Solid $3,000 annual max. Child orthodontics covered (60% in-network). A++ AM Best rated carrier. Whitening included (up to $500/yr coinsurance).

**Who it is for:** A household whose near-term needs are cavities and cleanings, and who may have a child heading into braces. The buyer who wants the best possible day-one fillings rate. Anyone with a dependent under 19 who will need orthodontics within the next 12+ months.

**Who should skip:** Adults who want braces for themselves (adult ortho not covered on any Guardian individual plan). People needing a crown, root canal, or implant soon (all wait 12 months). Implant-focused buyers (only $1,250 lifetime maximum, very low). Anyone who might cancel early (12-month re-enrollment lockout applies). Buyers must note the whitening perk is 50% coinsurance capped at $500/yr, not a flat $500 allowance, and requires a separate $50 whitening deductible.

---

### 6. Humana Extend 5000
**SSOT:** `humana-extend-5000.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$100/mo | `monthly_premium` |
| Annual maximum | $5,000/person/calendar year for all covered dental combined including implants (resets Jan 1) | `annual_maximum` |
| Deductible | $75/person/calendar year; waived for in-network preventive | `deductible` |
| Preventive | 100% in-network, day one, deductible waived; 2 exams + 2 cleanings per year | `coverage_preventive` |
| Basic | 80% after deductible, 90-day wait; same in and out of network | `coverage_basic` |
| Major | Year one 50% after deductible after 6-month wait; year two+ 60%; crowns, root canals, oral surgery, dentures, surgical extractions | `coverage_major` |
| Implants | Surgical placement on major schedule: year one 50%, year two+ 60%, 6-month wait (CANNOT be waived); implant annual max $2,000/person; implant lifetime max $4,000/person; counts toward $5,000 annual max; 1 per tooth per 5 years | `implants` |
| Orthodontics | NOT COVERED (explicit exclusion in all brochures) | `orthodontics` |
| Whitening | $200 allowance for in-office external bleaching per arch, no waiting period; does not apply to deductible or annual max; no carryover | `whitening` |
| Waiting period waiver | Basic and major waits waivable with 12 months prior creditable coverage (lapse under 63 days); implant wait CANNOT be waived | `waiting_periods` |
| Activation | Active in about 1 week (CoverCapy/Humana enrollment notes; not in brochures) | `activation` |
| Network | Humana Extend PPO, 143,000+ dentists (brochures; national network) | `sources` (brochure notes) |
| Bundles | Dental + vision + hearing (TruHearing); NEW YORK: dental + vision ONLY, no hearing | `do_not` (state note) |

**Standout edge:** $5,000 annual maximum (joint-highest on shelf with Mutual of Omaha). Bundles dental, vision, and hearing on one plan (except NY, dental + vision only). Whitening allowance ($200/arch). Major work accessible at 6-month wait with 50% rising to 60% in year two.

**Who it is for:** The buyer who wants dental + vision (+ hearing) bundled on one plan. Families expecting major restorative work over two or more years who want a high ceiling. Someone willing to wait 6 months for major and implant access. Buyers in FL and GA who want TruHearing included.

**Who should skip:** Buyers who need major work, implants, or major restorative done within 6 months (6-month wait applies; implant wait cannot be waived). Anyone needing orthodontics (explicit exclusion). Buyers planning two or more implants should note the $2,000/yr implant sub-cap and $4,000 lifetime cap can limit reimbursement significantly. At ~$100/mo it is one of the pricier options; buyers who do not need vision/hearing may find better value elsewhere.

---

### 7. Mutual of Omaha Dental Preferred
**SSOT:** `mutual-of-omaha-dental.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$90/mo ($88.40 on live 2026 quote at $5,000 max; community-rated) | `monthly_premium` |
| Annual maximum | Selectable: $1,500 / $3,000 / $5,000 per calendar year; CoverCapy features the $5,000 option | `annual_maximum` |
| Deductible | $50 on Dental Preferred (basic + major only; preventive has none) | `deductible` |
| Preventive | 100% from day one | `coverage_preventive` |
| Basic | 80% from day one (Dental Preferred) | `coverage_basic` |
| Major | 20% in year one, rising to 50% in year two and after; NO waiting period; covers crowns, root canals, dentures, bridges, implants | `coverage_major` |
| Implants | Paid as major service (20% Y1, 50% Y2+); LIFETIME implant maximum $3,000 (Preferred) / $2,000 (Protection); separate from calendar-year max | `implants` |
| Orthodontics | NOT COVERED | `orthodontics` |
| Whitening | NOT COVERED (cosmetic, excluded) | `whitening` |
| Waiting periods | NONE (preventive, basic, AND major all available day one) | `waiting_periods` |
| Activation | UNVERIFIED (no primary source states effective date rule; do not claim next-business-day) | `activation` |
| Network | DenteMax Plus, 400,000+ provider locations | `network` |
| Underwriter | Mutual of Omaha Insurance Company (NOT TruAssure; TruAssure only administers) | `carrier` |
| Pricing structure | Community-rated (varies by state + ZIP, NOT by age) | `monthly_premium` |
| Vision add-on | Optional vision rider, about $8.28/mo | `monthly_premium` |

**Standout edge:** Selectable annual maximum (including $5,000). No waiting periods on major work (rare). Community-rated pricing does not rise with age. Separate $3,000 lifetime implant maximum. Very large DenteMax Plus network (400,000+ locations). No waiting period means access to major work from day one (at the lower 20% year-one rate).

**Who it is for:** Seniors and Medicare-adjacent buyers who benefit most from community-rated (not age-rated) pricing and a high selectable maximum. The buyer who cannot wait 6 to 12 months for major or implant access. Anyone who wants the maximum flexibility of choosing their own ceiling at enrollment. Self-employed adults who want stable predictable pricing.

**Who should skip:** Buyers who expect to use major benefits heavily in year one and need more than 20% reimbursement on crowns or root canals (year one major is only 20%). Those wanting orthodontics or whitening (neither is covered). Anyone who budgets tightly and may be shocked by the effective first-year major rate; stage planning around the year-two 50% rate is critical. Activation timing is unverified; do not rely on a specific start date without confirming with the carrier.

---

### 8. MetLife NCD Complete
**SSOT:** `metlife-ncd-complete.md`

| Field | Value | SSOT Field |
|---|---|---|
| Monthly premium (est.) | ~$100/mo (reseller quotes ~$94 at age 35) | `monthly_premium` |
| Annual maximum | $10,000/person/calendar year (resets Jan 1) | `annual_maximum` |
| Deductible | $100 LIFETIME (paid once in year one; basic + major only; preventive has none) | `deductible` |
| Preventive | 100% from day one; 3 exams and 3 cleanings per calendar year | `coverage_preventive` |
| Basic | 65% year one, 80% year two, 90% year three+ (day one, graduated) | `coverage_basic` |
| Major | 10% year one, 50% year two, 60% year three+ (day one, graduated) | `coverage_major` |
| Implants | Covered under graduated major schedule (10/50/60); $3,000 per CALENDAR YEAR within $10,000 max; about 1 per tooth position per 10 years | `implants` |
| Orthodontics | NOT COVERED | `orthodontics` |
| Whitening | NOT COVERED | `whitening` |
| Waiting periods | None on preventive, basic, or major | `waiting_periods` |
| Activation | 1st of the month after enrollment | `activation` |
| Network | MetLife PDP Plus (PPO) | `network` |
| Plan structure | Association plan via NWFA; underwritten by Metropolitan Life Insurance Company | `carrier` |

**Standout edge:** Highest annual maximum on the entire shelf ($10,000/year). One-time $100 lifetime deductible (pay it once, never again). No waiting periods on anything. Strongest ceiling for complex multi-year implant or full-arch restoration plans. $3,000 annual implant maximum within the overall cap.

**Who it is for:** The buyer planning a substantial, multi-step restoration over two or three years (implants plus crowns plus bridgework). Anyone who cannot afford to hit a low annual ceiling mid-treatment. Buyers who want no waiting periods combined with the highest possible annual protection. The long-term planner who can endure 10% major coverage in year one to unlock 50 to 60% in years two and three.

**Who should skip:** Buyers who need meaningful major coverage immediately (year one major is only 10%, the lowest immediate major rate on the shelf). Those needing orthodontics or whitening (neither covered). Budget-sensitive buyers: at ~$100/mo, the high maximum only pays off for those with significant restorative needs. Anyone who will not stage work across years two and three will not capture the full value of the $10,000 ceiling.

---

## PART 2 — DECISION MATRIX

Key:
- **STRONG** = this plan is well-suited; reasons trace directly to SSOT fields
- **OK** = workable fit with a notable caveat
- **NO** = not a fit; a specific exclusion or structural mismatch applies

Plans abbreviated: **UHC** = UHC Primary Dental | **AET** = Aetna Dental Direct | **AMR** = Ameritas PrimeStar | **DD** = Delta Dental PPO Premium | **GRD** = Guardian Premier PPO | **HUM** = Humana Extend 5000 | **MOO** = Mutual of Omaha Dental Preferred | **NCD** = MetLife NCD Complete

---

### Scenario 1: Self, Preventive Only (cleanings + exams, no major anticipated)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **STRONG** | Lowest premium (~$30), preventive 100% day one, no wait. `monthly_premium`, `coverage_preventive` |
| AET | **STRONG** | Preventive 100% day one, 442,000+ network, but costs ~$50 vs UHC $30. `coverage_preventive`, `monthly_premium` |
| AMR | OK | Preventive 100% day one, but ~$60 is higher than UHC/Aetna for preventive-only use. `coverage_preventive` |
| DD | OK | Preventive 100% day one, huge network, but ~$75 is expensive if major is not planned. `coverage_preventive` |
| GRD | OK | Preventive 100% day one, $3,000 max is unused capacity for preventive-only. `coverage_preventive` |
| HUM | OK | Preventive 100% day one, but bundles vision/hearing pushing cost to ~$100; overkill for preventive-only. `monthly_premium` |
| MOO | OK | Preventive 100% day one, but ~$90 is high for preventive-only use. `coverage_preventive` |
| NCD | NO | ~$100/mo with 3 exams/3 cleanings is generous but vastly overpriced for preventive-only. `monthly_premium` |

**Hero:** UHC. **Runner-up:** Aetna.

---

### Scenario 2: Self, Major Work Needed (crown, root canal, or bridge anticipated within 2 years)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | Major not covered at all on this tier. `coverage_major` |
| AET | OK | 50% major after 12-month wait (waivable with 90-day prior coverage); $1,250 max may be exhausted by one crown. `coverage_major`, `annual_maximum`, `waiting_periods` |
| AMR | **STRONG** | No waiting period; major accessible day one at 20% year one / 50% year two; $2,000/$3,500 max; good for staged major work. `coverage_major`, `waiting_periods`, `annual_maximum` |
| DD | OK | 50% major after 12-month wait; $2,000 max; must plan past the wait. `coverage_major`, `annual_maximum` |
| GRD | OK | 60% major in-network after 12-month wait; $3,000 max is helpful but the 12-month wait is long. `coverage_major` |
| HUM | **STRONG** | 50% major after 6-month wait (rising to 60% in year two); $5,000 max; fastest major access with a high ceiling. `coverage_major`, `annual_maximum` |
| MOO | **STRONG** | No major wait; 20% year one / 50% year two; $5,000 selectable max; best for staging large cases. `coverage_major`, `waiting_periods`, `annual_maximum` |
| NCD | OK | No major wait; 10% year one / 50% year two / 60% year three; $10,000 max; lowest year-one major rate but best long-term ceiling. `coverage_major`, `annual_maximum` |

**Hero:** Humana (fastest meaningful major access + high ceiling). **Runner-up:** Mutual of Omaha (no wait, selectable max).

---

### Scenario 3: Self, Adult Braces (Invisalign or traditional)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | Orthodontics not covered. `orthodontics` |
| AET | **NO** | Orthodontics not covered on any Dental Direct tier. `orthodontics` |
| AMR | **NO** | Orthodontics not covered on Care Complete. `orthodontics` |
| DD | **STRONG** | ONLY plan on shelf covering adult orthodontics: adults AND children at 50%, 12-month wait, $1,500 lifetime max; Invisalign same terms; separate $50 ortho deductible. `orthodontics` |
| GRD | **NO** | Orthodontics child-only (dependents under 19); adult ortho not covered on any Guardian individual plan. `orthodontics` |
| HUM | **NO** | Orthodontic services explicit exclusion. `orthodontics` |
| MOO | **NO** | Orthodontics not covered. `orthodontics` |
| NCD | **NO** | Orthodontics not covered. `orthodontics` |

**Hero:** Delta Dental PPO Premium (only option). **Runner-up:** None (no other plan covers adult ortho; buyer has no alternative on this shelf).

---

### Scenario 4: Kids Cleanings (family with children, primarily preventive)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **STRONG** | Lowest premium; preventive 100% day one for all ages; easy to add dependents. `monthly_premium`, `coverage_preventive` |
| AET | **STRONG** | Preventive 100% day one; $150 family deductible; 442,000+ network; CVS perk bonus. `coverage_preventive`, `deductible` |
| AMR | OK | Preventive 100% day one; age-neutral pricing helps as family grows. `coverage_preventive` |
| DD | OK | Preventive 100% day one; largest network for dentist choice; $75 premium per adult adds up for a family. `coverage_preventive`, `monthly_premium` |
| GRD | OK | Preventive 100% day one; solid $3,000 max if kids develop cavities; 85% day-one basic is a bonus. `coverage_preventive`, `coverage_basic` |
| HUM | OK | Preventive 100% day one; bundled vision + hearing useful for a family; higher deductible ($75). `coverage_preventive`, `deductible` |
| MOO | OK | Preventive 100% day one; community-rated pricing. `coverage_preventive` |
| NCD | NO | ~$100/mo per covered person is expensive for primarily preventive family use. `monthly_premium` |

**Hero:** UHC (lowest cost, preventive day one). **Runner-up:** Aetna (network + CVS perk, slightly higher cost).

---

### Scenario 5: Kids Braces (dependent child under 19 needs orthodontics)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | Orthodontics not covered. `orthodontics` |
| AET | **NO** | Orthodontics not covered. `orthodontics` |
| AMR | **NO** | Orthodontics not covered on Care Complete; child ortho only on Boost tier. `orthodontics` |
| DD | **STRONG** | Covers child AND adult ortho: 50%, 12-month wait, $1,500 lifetime max per person; Invisalign same terms. `orthodontics` |
| GRD | **STRONG** | Child ortho (under 19, appliance placed while enrolled): 60% in-network (beats Delta's 50%), $1,500 lifetime max, 12-month wait; Guardian's structured annual pay-out ($750/yr) means the full $1,500 takes two years minimum. `orthodontics` |
| HUM | **NO** | Orthodontic services explicit exclusion. `orthodontics` |
| MOO | **NO** | Orthodontics not covered. `orthodontics` |
| NCD | **NO** | Orthodontics not covered. `orthodontics` |

**Hero:** Guardian (60% in-network vs Delta's 50%; higher reimbursement for child braces specifically). **Runner-up:** Delta Dental (also covers adult ortho if the parent wants braces too, and covers Invisalign).

---

### Scenario 6: Couple (two adults, no children, mixed needs)

| Plan | Fit | Reason |
|---|---|---|
| UHC | OK | Cheapest per-person for preventive + basic; major not covered is a risk if either adult needs crown/root canal. `monthly_premium`, `coverage_major` |
| AET | **STRONG** | $150 family deductible applies; CVS perk per enrolled adult; 90-day prior-coverage waiver works well if both adults just left employer dental. `deductible`, `cvs_extracare_plus`, `waiting_periods` |
| AMR | OK | No waiting periods helps if needs are unknown; age-neutral pricing helps older couples. `waiting_periods`, `monthly_premium` |
| DD | OK | Large network ensures both adults likely have an in-network dentist; $2,000 per person per year can be tight if both have major needs. `network`, `annual_maximum` |
| GRD | OK | 85% day-one basic is good for a couple with cavity history; $3,000/person max; 12-month major wait is the risk. `coverage_basic`, `annual_maximum` |
| HUM | **STRONG** | $5,000 per person + vision + hearing bundle; 6-month major access; good ceiling if one or both adults expect restorative work. `annual_maximum`, `coverage_major` |
| MOO | **STRONG** | $5,000 selectable max; no major wait; community-rated stable pricing for a couple of any age. `annual_maximum`, `waiting_periods` |
| NCD | OK | $10,000 ceiling is powerful but ~$100/mo per person is expensive for a couple; ideal only if both have large upcoming cases. `annual_maximum`, `monthly_premium` |

**Hero:** Aetna (balanced cost, family deductible, CVS perk, waiver on prior coverage). **Runner-up:** Humana (high ceiling + vision/hearing bundle if either adult has those needs).

---

### Scenario 7: Whole Family (two adults + children)

| Plan | Fit | Reason |
|---|---|---|
| UHC | OK | Cheapest entry; covers preventive for whole family + basic; major gap is a risk with children who may develop larger needs. `monthly_premium`, `coverage_major` |
| AET | **STRONG** | $150 family deductible caps out-of-pocket exposure; large network; CVS perk; 90-day waiver if coming off employer plan as a family. `deductible`, `cvs_extracare_plus`, `waiting_periods` |
| AMR | OK | No waiting periods helps unknown family needs; age-neutral pricing; but orthodontics not covered. `waiting_periods`, `orthodontics` |
| DD | **STRONG** | Largest network; covers adult AND child ortho in one plan; 80% basic; 50% major; best all-ages one-plan solution when braces are in the household roadmap. `network`, `orthodontics`, `coverage_basic` |
| GRD | **STRONG** | 85% day-one basic for everyone; $3,000/person max; child ortho (60% in-network) included; best for families who want strong cavity coverage + kids braces on one plan. `coverage_basic`, `annual_maximum`, `orthodontics` |
| HUM | OK | $5,000 per person; vision/hearing bundle; no ortho is a gap for families with kids heading toward braces. `annual_maximum`, `orthodontics` |
| MOO | OK | $5,000 selectable max; no waits; community-rated; no ortho is a gap for a family with young children. `annual_maximum`, `orthodontics` |
| NCD | NO | $100/mo per enrolled person, no ortho, no whitening; too expensive and too limited for a typical whole-family situation. `monthly_premium`, `orthodontics` |

**Hero:** Guardian (best combo of day-one basic + child ortho + $3,000 max for a family). **Runner-up:** Delta Dental (covers adult + child ortho; largest network for a family spread across dentists).

---

### Scenario 8: Age 65+ / Medicare-Adjacent

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | Age cap 18 to 64; ineligible at 65. `monthly_premium` note (`not_in_ny` and age band) |
| AET | OK | No stated age cap in SSOT; waiting periods waivable; but premium is not age-neutral (may be higher at 65). `waiting_periods` |
| AMR | **STRONG** | Age-neutral pricing (set by ZIP, not age); next-day coverage; no waiting periods; hearing benefit included; ideal for seniors. `monthly_premium`, `waiting_periods` |
| DD | OK | No age cap stated; large network; but $2,000 max may be limiting for complex senior dental needs. `annual_maximum` |
| GRD | OK | No age cap stated; $3,000 max; but 12-month major wait and 12-month re-enrollment lockout create risk for seniors who may need urgent care. `coverage_major`, `activation` |
| HUM | OK | $5,000 max + vision + hearing bundle; but premium is not age-neutral (~$100 may be higher for older enrollees) and implant wait cannot be waived. `implants`, `waiting_periods` |
| MOO | **STRONG** | Community-rated (not age-rated); $5,000 selectable max; no major waits; $3,000 lifetime implant max; explicitly positioned for seniors and Medicare-adjacent buyers. `monthly_premium`, `annual_maximum`, `waiting_periods`, `implants` |
| NCD | OK | No age cap stated; no waiting periods; $10,000 max; but year-one major at 10% means substantial out-of-pocket if a senior needs a crown immediately. `coverage_major` |

**Hero:** Mutual of Omaha (community-rated, no major waits, $5,000 max, $3,000 lifetime implant max, explicitly senior-friendly). **Runner-up:** Ameritas PrimeStar (age-neutral pricing, next-day coverage, no waits, hearing benefit).

---

### Scenario 9: Implants (one or more teeth requiring implant placement)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | Implants not covered on Primary Dental tier. `implants` |
| AET | **NO** | Dental implants explicitly excluded and prosthetic restoration of implants also excluded. `implants` |
| AMR | OK | Day-one access; 20% year one / 50% year two; BUT implant sub-cap of $1,000 year one / $1,500 year two is deducted from the annual maximum, limiting total benefit for complex cases. `implants` |
| DD | OK | 50% after 12-month wait, shared $2,000 max; missing-tooth clause applies (Aug 2025 renewals, except CA); LEAT clause can limit reimbursement. `implants` |
| GRD | OK | 60% in-network after 12-month wait; BUT only $1,250 LIFETIME maximum for implants total, the lowest implant cap on the shelf. `implants` |
| HUM | **STRONG** | 50% year one / 60% year two after 6-month wait; $2,000 annual / $4,000 lifetime implant sub-cap; counts toward $5,000 annual max; cannot waive the implant wait. `implants` |
| MOO | **STRONG** | No implant wait; 20% year one / 50% year two; $3,000 LIFETIME implant max (Preferred); community-rated pricing. `implants`, `waiting_periods` |
| NCD | **STRONG** | No wait; graduated major covers implants (10% year one, 50% year two, 60% year three); $3,000 implant annual maximum within the $10,000 total cap; best long-term ceiling for multi-implant cases. `implants`, `annual_maximum` |

**Hero:** MetLife NCD (highest ceiling, no wait, $3,000 annual implant max, best for multi-implant staging). **Runner-up:** Mutual of Omaha (no wait, $3,000 lifetime implant max, community-rated for older buyers).

---

### Scenario 10: No-Wait Need (dental work is imminent or already diagnosed)

| Plan | Fit | Reason |
|---|---|---|
| UHC | OK | No wait on preventive + basic; next-day activation; but major not covered at all. `waiting_periods`, `activation` |
| AET | OK | No wait on preventive; 6/12-month waits on basic/major UNLESS all enrolled had dental coverage within past 90 days (waiver); waiver may not apply. `waiting_periods` |
| AMR | **STRONG** | Zero waiting periods on everything including major and implants; next-day coverage start; best no-wait play on the shelf. `waiting_periods`, `activation` |
| DD | **NO** | 6-month basic wait, 12-month major + implant wait; not for immediate needs. `waiting_periods` |
| GRD | **NO** | 12-month wait on major, implants, child ortho; 6-month on whitening; not for immediate major needs. `waiting_periods` |
| HUM | **NO** | 90-day basic wait; 6-month major + implant wait (implant cannot be waived); not for immediate major needs. `waiting_periods` |
| MOO | **STRONG** | No waiting periods on preventive, basic, or major; day-one access to everything; graduated major rate (20% year one). `waiting_periods` |
| NCD | **STRONG** | No waiting periods on any category; day-one access; 10% year one major is low but it is available. `waiting_periods` |

**Hero:** Ameritas PrimeStar (no waits + next-day coverage start + age-neutral pricing). **Runner-up:** Mutual of Omaha (no waits, $5,000 selectable max, community-rated).

---

### Scenario 11: Lowest Premium (cost is the primary filter)

| Plan | Fit | Reason |
|---|---|---|
| UHC | **STRONG** | ~$30/mo, the cheapest plan on the shelf. `monthly_premium` |
| AET | **STRONG** | ~$50/mo, second cheapest; adds 80% basic (after 6-month wait) and large network. `monthly_premium` |
| AMR | OK | ~$60/mo; no waiting periods is a value-add for a modest premium premium. `monthly_premium` |
| DD | OK | ~$75/mo; adult ortho is a unique feature but premium is higher. `monthly_premium` |
| GRD | OK | ~$70/mo; 85% day-one basic and $3,000 max justify the cost relative to lower plans. `monthly_premium` |
| HUM | NO | ~$100/mo; vision/hearing bundle adds value but it is the highest tier for a pure cost comparison. `monthly_premium` |
| MOO | NO | ~$90/mo; community-rated is predictable but not cheap. `monthly_premium` |
| NCD | NO | ~$100/mo; high ceiling only justifies cost if significant work is planned. `monthly_premium` |

**Hero:** UHC (~$30/mo, lowest by a wide margin). **Runner-up:** Aetna (~$50/mo, adds meaningful basic coverage).

---

### Scenario 12: CVS / Rewards Lover

| Plan | Fit | Reason |
|---|---|---|
| UHC | **NO** | No CVS or retail perks. No whitening. |
| AET | **STRONG** | CVS ExtraCare Plus included free (Preferred and Core tiers): $10/mo reward (up to $120/yr), 20% off CVS Health brand products (non-sale), free CVS.com shipping. NOT in GA/LA/MN/MO/NY/NJ/OK/TX/VA. Requires registration. `cvs_extracare_plus` |
| AMR | NO | No CVS or retail perks. Hearing benefit is a different kind of bonus. |
| DD | NO | No CVS or retail perks. |
| GRD | NO | Whitening perk (50% up to $500/yr) is dental, not a retail reward. |
| HUM | NO | $200 whitening allowance is useful but not a retail/rewards play. `whitening` |
| MOO | NO | No rewards program. |
| NCD | NO | No rewards program. |

**Hero:** Aetna Dental Direct (the only plan with a retail-rewards perk). **Runner-up:** None (Aetna is the sole CVS-linked option on the shelf).

---

## PART 3 — RECOMMENDED HERO AND RUNNER-UP PER SCENARIO (SUMMARY TABLE)

| Scenario | Hero Plan | Runner-Up |
|---|---|---|
| Self, preventive only | UHC Primary Dental | Aetna Dental Direct |
| Self, major work needed | Humana Extend 5000 | Mutual of Omaha Dental Preferred |
| Self, adult braces | Delta Dental PPO Premium | (no alternative on shelf) |
| Kids cleanings | UHC Primary Dental | Aetna Dental Direct |
| Kids braces | Guardian Premier PPO | Delta Dental PPO Premium |
| Couple | Aetna Dental Direct | Humana Extend 5000 |
| Whole family | Guardian Premier PPO | Delta Dental PPO Premium |
| 65+ / Medicare-adjacent | Mutual of Omaha Dental Preferred | Ameritas PrimeStar |
| Implants | MetLife NCD Complete | Mutual of Omaha Dental Preferred |
| No-wait need | Ameritas PrimeStar | Mutual of Omaha Dental Preferred |
| Lowest premium | UHC Primary Dental | Aetna Dental Direct |
| CVS / rewards lover | Aetna Dental Direct | (no alternative on shelf) |

---

## PART 4 — CONFLICTS, FLAGS, AND DO-NOT VIOLATIONS TO WATCH

### Critical do-not flags that affect the matrix

1. **UHC in New York:** UHC Primary Dental is NOT sold in New York. Any scenario-matching tool or widget must exclude UHC for NY residents. (`uhc-primary-dental.md`: `not_in_ny`)

2. **Aetna CVS perk in 9 states:** The CVS ExtraCare Plus perk is NOT available in GA, LA, MN, MO, NY, NJ, OK, TX, or VA. The "CVS / rewards lover" hero recommendation is limited to 41 states + DC. Any scenario widget must check state before promoting the CVS angle. (`aetna-dental-direct.md`: `cvs_extracare_plus`)

3. **Delta Dental individual availability:** The broker-sold PPO Premium tier is only available in 16 states plus DC. The adult-braces hero (Delta) is not accessible to buyers in the remaining 34 states. This is a significant distribution gap; the adult-braces scenario must note the limited availability. (`delta-dental-ppo-premium.md`: `do_not`)

4. **Guardian adult orthodontics:** No Guardian individual plan covers adult ortho. The "adult braces" matrix row must never list Guardian as a fit, even a partial one. (`guardian-premier-ppo.md`: `do_not`)

5. **Mutual of Omaha activation is UNVERIFIED:** No primary source states the activation timing. Do not build a scenario recommendation that promotes MOO for speed-of-start (Scenario 10 hero remains Ameritas). (`mutual-of-omaha-dental.md`: `activation`)

6. **Ameritas not in Massachusetts:** PrimeStar Care Complete is not available in MA. Any scenario widget must exclude Ameritas for MA residents. (`ameritas-primestar.md`: `sources` GR 7708)

7. **MetLife NCD Complete year-one major at 10%:** The matrix marks NCD as "OK" or hero for multi-year implant scenarios but the year-one 10% major rate is the lowest on the shelf. Any page or widget that recommends NCD for an implant must clearly disclose the year-one rate and the two/three-year staging requirement. (`metlife-ncd-complete.md`: `coverage_major`)

8. **Humana implant wait cannot be waived:** Unlike basic and major, the 6-month implant wait on Humana cannot be waived with prior coverage proof. The implant scenario marks Humana as strong overall, but this non-waivable wait must be disclosed. (`humana-extend-5000.md`: `waiting_periods`)

9. **Mutual of Omaha: TruAssure is administrator, not underwriter:** Always attribute underwriting to Mutual of Omaha Insurance Company. (`mutual-of-omaha-dental.md`: `do_not`)

10. **UHC age cap 18 to 64:** The 65+ scenario correctly marks UHC as NO. Any scenario widget must enforce the age band. (`uhc-primary-dental.md`: `monthly_premium` note)

11. **Guardian 12-month re-enrollment lockout:** Families who buy Guardian for kid braces and later cancel face a 12-month re-enrollment lockout. This should be noted in the kids-braces and whole-family sections in content, not just the profile. (`guardian-premier-ppo.md`: `activation`)

12. **MOO 2021 stale-document trap:** The 2021 rate guide showed $1,500 max and 12-month major wait. Both are superseded by the 2026 product. Any content written before June 2026 that references MOO should be flagged for re-verification against the 2026 source. (`mutual-of-omaha-dental.md`: `sources` OUTDATED note)

13. **Delta Dental missing-tooth clause on implants:** Applies to Premium renewals from August 2025, except California. The implant scenario "OK" rating for Delta reflects this restriction. (`delta-dental-ppo-premium.md`: `implants`)

14. **Aetna missing tooth clause:** Prosthetics only for teeth lost while the policy was in force. Relevant to any implant or bridge discussion on Aetna pages. (`aetna-dental-direct.md`: `do_not`)

15. **Premium figures are estimates, not guarantees:** Every premium in this document is an estimate that varies by state, ZIP, age, and effective date. They are labeled as estimates throughout. README rule 3 requires rounding to nearest $5 for display. (`data/plans/README.md` rule 3)

---

*End of 08-plan-fit-by-scenario.md*
