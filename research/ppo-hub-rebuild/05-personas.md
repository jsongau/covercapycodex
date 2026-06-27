# 05 — Buyer Personas: PPO Plans Hub
## CoverCapy PPO Hub Rebuild | Wave 1 | Spec 05 of 20

**Scope:** Defines the primary buyer personas for the scenario-first dental PPO hub at `/dental-insurance/ppo-plans/`. Each persona describes a real shopping mode, not a demographic stereotype. Plan fit recommendations are cross-referenced against verified SSOTs in `/data/plans/`. No statistics are invented; demographic context is framed qualitatively.

---

## How to use this document

Each persona feeds directly into:
- `06-scenario-matrix.md` (life-event triggers and plan recommendations)
- `07-family-economics.md` (deductible and maximum math)
- `10-ux-flow-wireframe.md` (scroll order and CTA placement)
- `18-content-outline-stories.md` (editorial voice and scenario sections)

Persona names are working labels, not brand characters.

---

## Persona 1: The Urgent Single Adult ("Fix It Now")

### Who they are
An uninsured adult, typically in their late 20s through early 40s, who is currently experiencing tooth pain, a cracked tooth, a lost filling, or another acute dental problem. They have been without dental coverage for some time, either after losing employer benefits, going freelance, or simply letting it lapse. They are on the site today because something hurts or is visibly broken, and they want to know whether they can get covered and seen quickly.

### Trigger / Job To Be Done
Get dental insurance that lets them see a dentist as fast as possible so a specific problem gets treated before it worsens or costs more.

### Emotional state
Anxious, slightly embarrassed about the lapsed coverage, price-sensitive but willing to spend if they believe the plan will actually cover the work. Trust is a barrier: they suspect insurance will find a way to exclude exactly what they need. They want clarity, not brochure language.

### Urgency
Very high. They are comparison-shopping for speed, not for brand.

### Budget sensitivity
Moderate to high. They will pay a reasonable monthly premium if the plan covers their need soon. They cannot absorb a $1,200+ dental bill out of pocket right now, which is why they are here.

### Key questions
- Will this cover my filling / crown / root canal right away, or is there a waiting period?
- How fast does coverage actually start?
- What is the catch?
- Is my dentist in the network?

### Objections
- "Waiting periods make the plan useless for what I need right now."
- "I've heard dental insurance doesn't actually cover much."
- "The monthly premium plus the out-of-pocket cost might not be worth it versus just paying cash."

### Decision criteria
1. How fast they can be covered (activation speed)
2. Whether the specific procedure they need is covered in year one
3. Network size (will their existing dentist be in it)
4. Transparency about waiting periods

### Plan fit (verified against SSOTs)

**Primary fit: Ameritas PrimeStar Care Complete**
No waiting periods on any category, including major work and implants. Coverage can begin as soon as the next day. Year-one major rate is 20% in-network (rising to 50% after year one), so the out-of-pocket on a crown in year one is still significant, but the plan does not lock them out entirely. Annual maximum $2,000 year one rising to $3,500 after year one. Age-neutral pricing around $55-$60/mo. (Source: ameritas-primestar.md)

**Secondary fit: Mutual of Omaha Dental Preferred**
Also no waiting periods, with major starting at 20% year one and rising to 50% year two. Selectable $5,000 annual maximum at the Preferred level. Pricing around $90/mo for the $5,000 option. Better for someone who expects multiple large procedures and wants a higher ceiling with no gating. (Source: mutual-of-omaha-dental.md)

**Watch out for:** Aetna Dental Direct (6-month basic wait, 12-month major wait) and UHC Primary Dental (major work not covered at all) are poor fits for this persona's urgent need unless the waiver applies (prior coverage within 90 days for Aetna, confirmed with carrier).

### Words they search
"dental insurance that starts right away," "dental insurance no waiting period," "emergency dental insurance same day," "can I get dental insurance if I already need work," "tooth pain no insurance what to do," "dental insurance that covers root canal immediately"

### What would make them SHARE the page
A clear, jargon-free waiting-period comparison table that shows which plans cover major work in year one, with an honest note about the year-one percentage. They would share this with a friend who is in the same situation. A "how fast does coverage start" comparison strip would be the most shareable element for this persona.

---

## Persona 2: The Preventive Single Adult ("Keep It Clean")

### Who they are
An uninsured or recently-uninsured adult who does not have a pressing dental problem but who knows they are overdue for a cleaning and exam, possibly a set of X-rays. They are health-conscious, budget-aware, and shopping deliberately. They may be a recent grad who aged off a parent's plan, someone who went freelance, or someone who simply decided to get organized about their health this year. They are calm and methodical, not panicked.

### Trigger / Job To Be Done
Lock in reliable annual preventive coverage (two cleanings, two exams, X-rays) so they stop skipping the dentist, and be covered for a filling if one turns up.

### Emotional state
Composed and practical. Slightly guilty about having been uninsured. Looking for the smart, efficient choice, not the flashy one. They will comparison-shop and read the fine print.

### Urgency
Low to moderate. They want to get covered before their next cleaning appointment, but there is no emergency.

### Budget sensitivity
High. They are optimizing cost-per-benefit. They may be willing to trade a lower annual maximum for a lower monthly premium if preventive is covered at 100% from day one.

### Key questions
- Does this cover two cleanings and two exams per year at 100%?
- What does it cost per month, and is that reasonable for what I get?
- If I find a cavity, is the filling covered soon?
- Will I be stuck if I need something bigger later?

### Objections
- "I'm basically just paying for two cleanings I could pay for out of pocket."
- "I don't want to be locked into a plan I can't cancel."
- "The deductible eats up the value."

### Decision criteria
1. Preventive coverage at 100% from day one
2. Monthly premium relative to the value of preventive visits
3. Basic coverage (fillings) with a short or no wait
4. Network breadth (they may want to keep their current dentist or find one easily)

### Plan fit (verified against SSOTs)

**Primary fit: UHC Primary Dental**
Lowest premium on the shelf at around $30/mo. Preventive 100% from day one, no deductible. Basic (fillings) covered from day one at 50%, rising to 65% after year one and 80% after year two. No major coverage, but this persona does not need it imminently. $1,000 annual maximum is sufficient for preventive plus one or two fillings. (Source: uhc-primary-dental.md)

**Secondary fit: Aetna Dental Direct**
Around $50/mo. Preventive 100% from day one. Basic at 80% after a 6-month wait (waivable with prior coverage within 90 days). CVS ExtraCare Plus membership included, which adds $10/mo in CVS rewards and 20% off CVS Health brand products, a useful perk for someone who already shops at CVS. $1,250 annual maximum. Good choice if they want the CVS perk bundled in. (Source: aetna-dental-direct.md)

**Third option: Ameritas PrimeStar Care Complete**
No waiting periods and next-day coverage, but at ~$60/mo it costs more for someone who only needs preventive care. Relevant if they want no-wait basic coverage from day one.

### Words they search
"cheapest dental insurance for one person," "dental insurance just for cleanings," "dental insurance no waiting period for cleanings," "individual dental insurance no employer," "dental insurance for freelancers," "best dental insurance for young adults"

### What would make them SHARE the page
A simple "is dental insurance worth it?" cost-math section that walks through the annual value of two cleanings plus one exam versus the annual premium. This persona is a natural sharer if the math is clear and honest. They would also share a page that has a scannable plan comparison that does not bury the lowest-price option.

---

## Persona 3: The Parent Shopping for Kids ("Braces or Bust")

### Who they are
A parent with one or more children who has dental coverage needs primarily driven by their kids. The most acute version of this persona is actively planning for orthodontics (braces or aligners) for a child who is around 9 to 14 years old. A secondary version is focused on cleanings, sealants, and cavity prevention for younger children. They may be on an individual family plan or exploring individual PPO options because their employer plan has limited orthodontic benefits.

### Trigger / Job To Be Done
Get a plan that covers child orthodontics at a meaningful level, so braces do not become a $5,000 to $8,000 pure out-of-pocket event, while also keeping the kids current on preventive care.

### Emotional state
Proactive, organized, and a bit stressed about the orthodontic cost looming on the horizon. They have probably already gotten a consultation from an orthodontist and been given a treatment plan cost estimate. They want to understand exactly how much a dental plan will offset that number.

### Urgency
Medium. Orthodontic treatment does not start tomorrow, but they know they need to enroll and wait through a qualifying period before the braces go on. They are shopping months in advance.

### Budget sensitivity
Moderate. They accept that a plan covering orthodontics will cost more per month. They are focused on total family cost over 18-24 months of treatment, not just the monthly premium.

### Key questions
- Does this plan cover braces for my child?
- What is the orthodontic lifetime maximum?
- Is there a waiting period before ortho coverage kicks in?
- Does it cover Invisalign or only traditional braces?
- What does the plan cost per month for a family?
- Will the dentist we already see accept this insurance?

### Objections
- "The lifetime ortho max is so low it barely makes a dent."
- "The waiting period means I'd have to wait a year before braces are even covered."
- "My kid's orthodontist might not be in network."
- "We have other dental needs too, not just braces."

### Decision criteria
1. Child orthodontic benefit: lifetime maximum, coinsurance rate, and waiting period
2. Whether Invisalign/clear aligners are covered on the same terms
3. Preventive coverage for kids (sealants, cleanings)
4. Network breadth
5. Monthly premium for the family tier

### Plan fit (verified against SSOTs)

**Primary fit: Guardian Premier PPO**
The only plan on the CoverCapy shelf with a meaningful child orthodontic benefit on an individual plan. Covers dependent orthodontics for children under 19 at 60% in-network (50% out-of-network) after a 12-month wait, with a $750 per benefit year cap and a $1,500 lifetime orthodontic maximum per person. Braces go on after the 12-month wait. Day-one basic at 85% in-network (highest on the shelf). Annual maximum $3,000 per person. Note: adult orthodontics is NOT covered on Guardian individual plans. (Source: guardian-premier-ppo.md)

**Note on Delta Dental PPO Premium for adult comparison:**
Delta Dental PPO Premium covers both adults AND children at 50% after a 12-month wait with a $1,500 lifetime orthodontic maximum. If this parent also needs adult braces themselves, Delta Dental becomes relevant for their own coverage alongside Guardian for kids. However, Delta's individual PPO is available only in 16 states plus DC, so state availability must be checked first. (Source: delta-dental-ppo-premium.md)

**What this persona should NOT be sold:** UHC Primary Dental (no ortho coverage), Aetna Dental Direct (no ortho coverage), Mutual of Omaha (no ortho coverage), Ameritas Care Complete (no ortho coverage), Humana Extend 5000 (no ortho coverage). Orthodontics is an explicit exclusion or non-benefit on all of these.

### Words they search
"dental insurance that covers braces for kids," "individual dental insurance child orthodontics," "dental insurance Invisalign for kids," "best dental plan for kids braces," "PPO dental insurance orthodontic coverage," "Guardian dental braces coverage," "dental insurance lifetime orthodontic maximum"

### What would make them SHARE the page
A clear orthodontic-coverage comparison table that shows which plans cover child ortho, what the lifetime maximum is, what the wait is, and whether Invisalign is included. This parent would share a page that answers the exact "how much will insurance actually pay toward braces?" question in a scannable, honest format. A scenario card titled "Planning for braces" that walks through the Guardian benefit math would be highly shareable with other parents in the same situation.

---

## Persona 4: The Couple / Newlywed ("Two of Everything")

### Who they are
A couple, recently partnered or married, who are consolidating their lives and finances and want to sort out dental coverage together. One or both may be losing individual coverage from a prior employer or plan. They may be shopping for two individual policies or trying to understand whether a family-tier plan makes sense even without children yet. They may be thinking about cosmetic dentistry (whitening) or orthodontics for one adult partner.

### Trigger / Job To Be Done
Get both partners covered on a plan or plans that make financial sense as a unit, and that account for any specific needs either partner has in the near term.

### Emotional state
Organized and collaborative. Less anxious than the urgent single-adult persona. They are doing this the "right" way and want to feel confident they made a smart financial decision together. One partner may be more motivated than the other, creating a "convince my partner" dynamic.

### Urgency
Low to moderate. They are usually shopping ahead of a coverage lapse or a life transition.

### Budget sensitivity
Moderate. They are looking at combined premium costs and trying to optimize two people's coverage, not just one.

### Key questions
- Is it better to get two individual plans or one family plan?
- Do both of us need the same plan, or can we mix and match?
- One of us needs a crown in the next year, which plan makes sense for that?
- Does either plan cover adult braces? (If one partner wants Invisalign)
- What is the combined monthly cost?
- Do we get any discount for covering two people?

### Objections
- "Two plans at $70-100/mo each is $1,400-2,400 a year just in premiums."
- "The family maximum might cap out fast if we both need work."
- "I don't want a plan that covers my partner's needs but not mine."

### Decision criteria
1. Combined premium cost for two individuals
2. Whether there is a family discount or enrollment incentive
3. Whether both partners' specific near-term needs are covered
4. Adult orthodontic coverage if one partner wants braces or aligners
5. Flexibility to choose different plans if their needs differ

### Plan fit (verified against SSOTs)

The couple must often mix and match rather than selecting a single plan for both. Key fit guidance by scenario within this persona:

**If one partner needs a crown or major work soon: Ameritas PrimeStar Care Complete or Mutual of Omaha Dental Preferred**
Both offer no waiting periods on major. Ameritas starts at ~$56-60/mo with next-day coverage and 20% major year one, rising to 50%. Mutual of Omaha at ~$90/mo for the $5,000 max option also has no major wait with 20% year one / 50% year two. (Sources: ameritas-primestar.md, mutual-of-omaha-dental.md)

**If one partner wants adult braces / Invisalign: Delta Dental PPO Premium**
The only plan on the shelf that covers adult orthodontics for an individual policy, at 50% after a 12-month wait up to a $1,500 lifetime maximum. Invisalign and clear aligners are covered on the same terms. Available in 16 states plus DC. State availability must be confirmed. (Source: delta-dental-ppo-premium.md)

**If both partners primarily want preventive plus basic and are budget-conscious: UHC Primary Dental + Aetna Dental Direct**
One partner on UHC (~$30/mo) for budget preventive coverage, the other on Aetna (~$50/mo) for the CVS perks and a higher maximum, is a low-cost combination for a couple without major near-term needs.

**Family loyalty / vision bundle angle: Humana Extend 5000**
If both partners want dental and vision bundled together, Humana's $5,000 annual maximum per person with vision included is a strong option, especially if they intend to stay on the plan for multiple years to reach the year-two 60% major rate. At ~$100/mo per person it is the higher-premium option. (Source: humana-extend-5000.md)

**Note on family deductibles:** The Aetna Dental Direct family deductible is $150 for basic and major services (three individual $50 deductibles cap it). Guardian's family deductible structure follows the same per-person $50 logic. Two partners on the same plan benefit from this cap if both have basic or major work in the same calendar year.

### Words they search
"dental insurance for two people," "dental insurance for couples," "best dental plan for husband and wife," "can we get same dental insurance," "dental insurance adult braces Invisalign," "dental insurance family vs two individual plans," "dental insurance newlywed"

### What would make them SHARE the page
A "two-person scenario" comparison tool or scenario card that lets them see the combined annual cost and coverage for two common situations (both need preventive only vs. one needs a crown). They would share a page that honestly compares "buy two individual plans vs. one family tier" trade-offs. The adult braces angle (Delta Dental) is highly shareable because most people do not realize individual dental plans cover adult orthodontics.

---

## Persona 5: The Whole-Family Shopper ("Everyone Under One Roof")

### Who they are
A household with two adults and one or more children, shopping for dental coverage that works for everyone at once. They may be self-employed, freelancers, small business owners without group benefits, or workers whose employer plan's family tier is expensive or inadequate. This persona is doing the math on family deductibles, family annual maximums, and whether individual policies add up to more or less than a family-tier plan.

### Trigger / Job To Be Done
Get comprehensive dental coverage for the whole family that does not fall apart financially when multiple family members need work in the same year.

### Emotional state
Methodical and slightly overwhelmed. There are multiple sets of needs to manage simultaneously. They want a plan that "just works" for everyone without requiring them to manage multiple policies with different rules.

### Urgency
Moderate. Often triggered by open enrollment cycles, a job change, or a child reaching an age where orthodontic screening is recommended.

### Budget sensitivity
High for monthly premium (they are multiplying it by the number of family members), but willing to pay more per person if the plan has a meaningful family maximum and a sensible family deductible structure.

### Key questions
- Is there a family deductible cap so we are not paying $50 per person per year indefinitely?
- Is there a family annual maximum, and does it pool or is it per person?
- What does this cost per month for a family of four?
- Does this cover kids' preventive (sealants, fluoride) without a separate wait?
- Can we add ortho for one child without upsetting coverage for the rest of the family?
- What happens if my spouse and I both need crowns in the same year?

### Objections
- "With four people, the monthly premium adds up fast."
- "If the annual maximum is $2,000 per person, and two of us need crowns, that's four crown-price events in one year."
- "I need to understand the family deductible before I commit."

### Decision criteria
1. Family deductible cap (how many individual deductibles can the family be asked to pay in one year)
2. Per-person annual maximum and whether it is sufficient for realistic multi-member usage
3. Pediatric preventive coverage from day one (sealants, cleanings)
4. Orthodontic benefit for children
5. Monthly cost for the family tier
6. Clarity of the benefit rules so they can plan cash flow

### Plan fit (verified against SSOTs)

**Family deductible mechanics (verified):**
- Aetna Dental Direct: $50 individual / $150 family per calendar year for basic and major. The family cap means three or more covered members stop paying deductibles once three have been met. (Source: aetna-dental-direct.md)
- Guardian Premier PPO: $50 per person deductible (waived for in-network preventive). Family cap structure applies per Guardian's standard policy terms; confirm with carrier for family tier.
- Delta Dental PPO Premium: $50 per person / $150 per family per calendar year, plus a separate $50 ortho deductible per person. (Source: delta-dental-ppo-premium.md)
- UHC Primary Dental: $50 per person, maximum 3 individual deductibles per family per calendar year. (Source: uhc-primary-dental.md)

**Primary fit for the whole-family shopper: Guardian Premier PPO + awareness of the ortho tier**
Guardian's $3,000 per person annual maximum is above mid-shelf. Day-one basic at 85% in-network means multiple family members getting fillings in the same year are well covered from day one. Child orthodontic benefit (60% in-network after 12-month wait, $1,500 lifetime per child) means the ortho budget is built in. If the family has more than one child who needs braces, each child has their own $1,500 lifetime maximum. (Source: guardian-premier-ppo.md)

**High-ceiling option: Humana Extend 5000**
For families where both adults expect major work, the $5,000 per-person annual maximum on Humana is a meaningful cushion. The plan bundles vision, which removes the need for a separate vision plan. The 90-day basic wait and 6-month major wait (both waivable with 12 months of prior creditable coverage) are the friction points. At ~$100/mo per adult, the family premium budget is significant. (Source: humana-extend-5000.md)

**Budget floor option: Aetna Dental Direct**
At ~$50/mo per person, Aetna is a cost-effective choice for a family where most members need primarily preventive and light basic work. The CVS ExtraCare Plus perk (where available, not in GA/LA/MN/MO/NY/NJ/OK/TX/VA) effectively reduces the net cost for families who regularly shop at CVS: up to $120/yr in CVS rewards per enrolled adult. The $1,250 per-person annual maximum is low if major work is expected across multiple family members in the same year. (Source: aetna-dental-direct.md)

**Note on family maximums:** Most individual PPOs on this shelf are structured as per-person maximums, not a pooled family maximum. This means a family of four with $2,000 per-person maximums on Aetna has $8,000 in aggregate annual dental benefit, not a shared $2,000. This is important context for the whole-family shopper to understand, and it is more favorable than many assume.

### Words they search
"dental insurance for family of four," "best family dental insurance plan," "dental insurance family deductible," "individual dental PPO family coverage," "dental insurance for kids and adults together," "how does family dental deductible work," "dental insurance for self-employed family"

### What would make them SHARE the page
A "family math" calculator or scenario card that shows aggregate coverage across four family members for a realistic year (two cleanings each, two fillings, one crown for an adult, one braces consultation). The family deductible cap explanation in plain language is a shareable insight because most buyers do not understand how it works. A side-by-side showing per-person vs. pooled maximums would also drive shares among parents researching family coverage.

---

## Persona 6: The 65+ / Medicare-Adjacent Buyer ("Covered Again")

### Who they are
An adult aged 65 or older, or someone approaching 65, who has recently discovered that Medicare does not cover routine dental care. They may have recently retired and lost employer dental benefits. They may be active and in good dental health but aware that their age makes them statistically more likely to need crowns, root canals, implants, or dentures. They may be concerned about implants specifically after a dentist recommended a procedure. They are a deliberate, thorough researcher.

### Trigger / Job To Be Done
Get reliable dental coverage outside of Medicare that covers crowns, implants, and major work at a meaningful rate, with no age penalty at the premium level and no gating that makes the plan useless for the kinds of work their age group actually needs.

### Emotional state
Serious and cautious. They have likely been burned by a prior plan that did not cover what they expected, or they know someone in that situation. They want clear language, not marketing. Trust is earned through specificity, not enthusiasm.

### Urgency
Moderate to high. Many in this group have a specific procedure their dentist has already recommended.

### Budget sensitivity
Moderate. They are on a fixed income or a deliberately planned retirement budget. They are not chasing the cheapest plan; they want reliable value. But they will not pay $100+ per month for something that does not materially offset their risk.

### Key questions
- Does my premium go up just because I am 65?
- Is there a waiting period before crowns and implants are covered?
- What is the maximum the plan will pay per year?
- Does this cover implants? What is the lifetime cap?
- Are there exclusions I need to know about for pre-existing work?
- How does this fit alongside my Medicare coverage?

### Objections
- "Medicare Advantage includes some dental but I don't understand how this interacts."
- "I've heard insurance doesn't really cover implants."
- "If there's a 12-month wait on major work, I'd be paying premiums for a year before I get any benefit."
- "My dentist might not be in network."

### Decision criteria
1. Whether premiums are community-rated or age-banded (a community-rated plan does not penalize age)
2. Waiting periods on major work and implants
3. Implant coverage: percentage, annual cap, lifetime cap, missing-tooth exclusion
4. Annual maximum, especially for years when multiple major procedures are needed
5. Network breadth (this buyer is often loyal to a specific dentist)
6. Clarity on what happens after the annual maximum is exhausted

### Plan fit (verified against SSOTs)

**Primary fit: Mutual of Omaha Dental Preferred**
Built for this persona. Community-rated pricing, so the premium does not scale with age (verified: Mutual of Omaha's dental pricing is community-rated per carrier site, 2026). No waiting periods on any category including major work. Major coverage starts at 20% in year one and rises to 50% in year two, meaning a senior who enrolls now and plans an implant for next year gets the 50% rate. Selectable annual maximum up to $5,000 at the Preferred level. Separate lifetime implant maximum of $3,000 on Preferred. Broad DenteMax Plus network of more than 400,000 provider locations. Optional vision rider at approximately $8/mo. (Source: mutual-of-omaha-dental.md)

**Secondary fit: Ameritas PrimeStar Care Complete**
Age-neutral pricing (pricing is determined by location, not age, per the brochure). No waiting periods. Next-day coverage. Major at 20% year one, 50% year two. Annual maximum $2,000 year one, $3,500 year two and after. Day-one implant access. Includes a hearing benefit (not in NH). A strong option for the cost-conscious 65+ buyer who still wants comprehensive coverage without age penalties. (Source: ameritas-primestar.md)

**High-ceiling option for buyers expecting multiple major procedures: MetLife NCD Complete**
The highest annual maximum on the shelf at $10,000 per calendar year, with a one-time $100 lifetime deductible and no waiting periods. Major work is graduated at 10% year one / 50% year two / 60% year three. The implant cap is $3,000 per calendar year (within the $10,000 maximum). This plan rewards a buyer who is planning significant restorative work over two to three years. At ~$100/mo it is on the higher-premium end. (Source: metlife-ncd-complete.md)

**What this persona should NOT be sold: UHC Primary Dental**
UHC Primary Dental has an age cap at 64. It is not available to applicants 65 or older. (Source: uhc-primary-dental.md)

**What to clarify about Medicare:**
CoverCapy is an independent educational marketplace and does not provide Medicare counseling. The relevant fact for the page is that Original Medicare (Parts A and B) does not cover routine dental care (exams, cleanings, fillings, crowns, implants, or dentures). Medicare Advantage (Part C) plans may include some dental, but the benefits vary widely and often have their own limitations. An individual dental PPO purchased separately can complement or substitute for dental benefits not included in a Medicare Advantage plan, but buyers should confirm their specific Medicare plan details with their plan carrier before enrolling in an additional individual dental policy.

### Words they search
"dental insurance for seniors," "dental insurance after retirement," "dental insurance Medicare does not cover," "dental insurance for 65+," "no waiting period dental insurance seniors," "dental insurance implants seniors," "best dental insurance retired no employer," "community rated dental insurance," "dental insurance over 65 not age banded"

### What would make them SHARE the page
A clear, calm explanation of the Medicare dental gap, combined with an honest comparison of plans that do not age-band premiums. This persona is more likely to share with a spouse or an adult child who is helping them research. A "Medicare and dental: what you need to know" explainer section that is factual and non-alarmist would be shared by this group via email or printed out. A comparison of Mutual of Omaha vs. Ameritas specifically for the 65+ scenario is highly useful and shareable within this group.

---

## Persona Summary Table

| Persona | Urgency | Budget | Primary Plan Fit | Secondary Plan Fit |
|---|---|---|---|---|
| Urgent Single Adult | Very high | Moderate-high | Ameritas PrimeStar Care Complete | Mutual of Omaha Dental Preferred |
| Preventive Single Adult | Low-moderate | High | UHC Primary Dental | Aetna Dental Direct |
| Parent / Kids Braces | Medium | Moderate | Guardian Premier PPO | Delta Dental PPO Premium (state-limited) |
| Couple / Newlywed | Low-moderate | Moderate | Mix: need-specific per partner | Delta Dental PPO Premium (adult ortho) |
| Whole-Family Shopper | Moderate | High (total) | Guardian Premier PPO | Humana Extend 5000 / Aetna Dental Direct |
| 65+ / Medicare-Adjacent | Moderate-high | Moderate | Mutual of Omaha Dental Preferred | Ameritas PrimeStar / MetLife NCD Complete |

---

## Cross-persona Notes for Page Design

**Waiting periods are the universal objection.** Every persona above either leads with it or has it as their top objection. The hub must address waiting periods in the opening section, not bury them in fine print.

**"Day one" and "no waiting period" are the most valuable phrases on the shelf.** Ameritas and Mutual of Omaha earn outsized attention because they offer no-wait major coverage. This is genuinely rare and should be called out visually.

**No plan on the CoverCapy shelf covers adult orthodontics except Delta Dental PPO Premium**, and that plan is limited to 16 states plus DC. This is a meaningful gap for the couple persona and some whole-family shoppers. The page should state this clearly so users are not misled.

**UHC Primary Dental has an age cap at 64.** It must not be presented to the 65+ persona.

**The CVS ExtraCare Plus perk on Aetna is a genuine differentiator** for the preventive single adult and the whole-family shopper in states where it is available. It is excluded in GA, LA, MN, MO, NY, NJ, OK, TX, and VA. Do not present it as nationwide.

**Community-rated vs. age-banded pricing** is a meaningful differentiator for the 65+ persona and should be called out explicitly. Mutual of Omaha (community-rated) and Ameritas (location-rated, not age-rated) have a real advantage here over age-banded plans.

---

*File: `05-personas.md` | Status: complete | Feeds into: `06-scenario-matrix.md`, `07-family-economics.md`, `10-ux-flow-wireframe.md`, `18-content-outline-stories.md`*
