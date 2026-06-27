# PANEL REVIEW: Dentist (Clinical Accuracy + Patient Education)
## CoverCapy PPO Glossary Interactive Widgets
### Reviewer role: practicing general dentist, chair-side perspective. ANALYZE only.

This memo reviews the 23-term glossary game set for clinical accuracy and patient-education value. Organized as: (A) concepts patients most misunderstand and most deserve strong interactive treatment, (B) factual traps the widgets MUST get right, (C) the actionable takeaway per concept, (D) oversimplifications that would mislead a patient.

A note on framing: at the chair, the single most common patient sentence is "but I have insurance, why do I owe anything?" Almost every widget should be quietly answering that. Dental PPO is a discount-and-cost-share product with a hard dollar ceiling, not health insurance. Patients map their medical-insurance mental model onto it and get burned. The whole game should gently break that mental model.

---

## A. CONCEPTS PATIENTS MOST MISUNDERSTAND (rank-ordered by chair-side burn frequency)

These are the terms where I see real money lost, surprise bills, treatment refused, or trust damaged. Build the richest interactions here.

### 1. Annual Maximum (HIGHEST VALUE TO GAMIFY)
The number one shock. Patients think "maximum" means the most coverage they have, like an out-of-pocket cap. It is the opposite: it is the most the PLAN will pay, after which the patient pays 100 percent. Typical max has been stuck near 1000 to 1500 dollars for 40 years while crown fees tripled. One crown plus one root canal can exhaust a whole year.
- BEST widget: a "tank that drains" or thermometer that empties as the year's procedures are added, then turns red and shows "from here, you pay everything." Let the user drag in a cleaning, a filling, a crown, a root canal and watch the tank hit zero.
- Must show: the max RESETS each benefit year (often Jan 1, but some plans run on the member's enrollment anniversary, NOT calendar year). Unused max does NOT roll over (a handful of plans have a small carryover/rollover rider, but the default is use-it-or-lose-it).

### 2. Waiting Period (HIGH VALUE)
Patients buy a plan with a toothache today expecting a crown next week. Major work commonly has a 6 to 12 month waiting period; even basic work can have 3 to 6 months. They feel cheated when the cleaning is covered but the crown they actually need is not.
- BEST widget: a timeline/calendar simulator. Enroll on a date, drop in a procedure, see "covered" vs "not yet, wait until X."
- Must show: waiting periods are often WAIVED with proof of prior continuous coverage. Preventive (cleanings/exams) usually has NO waiting period. This distinction is exactly what patients miss.

### 3. The 100 / 80 / 50 Coverage Tiers + what counts as Basic vs Major (HIGHEST CLINICAL-ACCURACY RISK)
This is the term most likely to be built WRONG, and the error would actively mislead. See trap B1 below. Patients assume "my plan covers crowns at 80 percent." It almost never does.
- BEST widget: a sorting/matching game: drag procedures into Preventive (100), Basic (80), Major (50). This is genuinely fun AND it teaches the lesson that lands the hardest bills.

### 4. In-Network vs Allowed Amount vs Billed Fee vs Plan Pays (HIGH VALUE, most confused mechanically)
Patients think percentages apply to the dentist's actual fee. They apply to the plan's ALLOWED amount (a negotiated/fee-schedule number usually lower than the billed fee). Out of network, balance billing stacks on top.
- BEST widget: a "bill flow" animation that takes one procedure through: Billed Fee -> Allowed Amount -> minus Deductible -> times Coinsurance -> Plan Pays -> You Pay. Watch each layer shave the number.

### 5. Missing Tooth Clause (HIGH VALUE, pure trap, near-invisible to patients)
A patient who lost a tooth before the policy started is denied coverage to replace it (implant, bridge, partial), forever, on that plan. There is no clinical logic a patient can intuit here, so a short story/scenario widget is ideal.

### 6. Frequency Limitations (MEDIUM-HIGH)
"Two cleanings a year," "bitewing X-rays once per 12 months," "exam every 6 months," "one crown per tooth per 5 to 7 years." Patients book a third cleaning or an early replacement and get denied.

### 7. Downgrade / LEAT (Least Expensive Alternative Treatment) (MEDIUM-HIGH, sneaky)
Plan pays only for the cheapest accepted option, patient pays the difference. Classic examples: composite (white) filling on a back tooth downgraded to amalgam (silver) allowance; porcelain crown downgraded to metal; implant downgraded to a bridge or denture allowance. The procedure IS covered, but only at the lower material's rate.

### 8. Deductible and Coinsurance (MEDIUM, foundational but familiar)
Better understood from medical insurance, but two dental-specific traps: deductible usually does NOT apply to preventive, and coinsurance is the patient's share (50 percent coinsurance on a major = patient pays half of the allowed amount, then anything over the annual max on top).

### 9. Predetermination / Pre-authorization (MEDIUM, underused by patients)
Not a guarantee of payment, but the single best tool a patient has to avoid a surprise. Should be reframed as a player "power-up": run a predetermination before big work and you see the real number first.

---

## B. FACTUAL TRAPS THE WIDGETS MUST GET RIGHT

These are hard clinical/coverage facts. Getting any of these wrong would teach patients something false and could cost them money.

**B1. Crowns and root canals are MAJOR (50 percent), not Basic.** This is the most dangerous likely error. Common, accurate default categorization:
- PREVENTIVE (usually 100 percent): exams, routine cleanings (prophylaxis), bitewing/periodic X-rays, fluoride, sealants (often age-limited), sometimes routine panoramic.
- BASIC (usually 80 percent): amalgam and composite fillings, simple extractions, often non-surgical periodontal (scaling/root planing), palliative emergency treatment. X-rays sometimes sit here depending on plan.
- MAJOR (usually 50 percent): crowns, bridges, dentures and partials, inlays/onlays, root canals (endodontics), surgical extractions, periodontal surgery, and implants WHEN covered at all.
Note variability: some plans put endodontics (root canals) and oral surgery in Basic, some in Major. The widget should teach the COMMON case but label it "varies by plan," never state it as universal law. Do NOT let the sorting game hard-code root canal as Basic.

**B2. Implants are frequently EXCLUDED entirely, or capped, or downgraded.** Many PPO plans still do not cover implants, or cover the crown on the implant but not the implant body/abutment, or downgrade to a bridge/denture allowance. Never show an implant as cleanly "50 percent covered" without the caveat.

**B3. Bone graft, sinus lift, and implant staging are separate line items.** A single "implant" in a patient's mind is often 3 to 5 billed procedures over months: extraction, bone graft/socket preservation, possible sinus lift, implant placement, abutment, then the crown. Each has its own coverage status, its own potential downgrade, and each can independently hit the annual max. A staging/timeline widget should show these as distinct steps, not one event, and show how they can span two benefit years (sometimes deliberately, to use two annual maximums).

**B4. Billed fee vs allowed amount vs plan pays are three different numbers.** The coinsurance percentage applies to the ALLOWED amount, not the dentist's billed fee, and not "what you owe." Any calculator that multiplies the percentage by the billed fee is wrong and will under-state patient cost in-network and badly mis-state it out of network.

**B5. Balance billing only happens out of network.** In-network dentists write off the difference between billed and allowed (contractual adjustment). Out-of-network, the patient can be billed that difference on top of coinsurance. The in/out-network widget must show this asymmetry.

**B6. Annual maximum is the PLAN's payment ceiling, not the patient's spending ceiling.** Dental plans (unlike ACA medical) generally have NO out-of-pocket maximum for the patient. Once the max is hit, patient liability is effectively unlimited. Do not let any widget imply a patient-side cap.

**B7. Coinsurance percentages are what the PLAN pays; deductible comes out first.** Order of operations matters: allowed amount, subtract deductible (if it applies to that tier), then apply coinsurance, then check against remaining annual max. Show it in that sequence.

**B8. Frequency limits are time-based and per-tooth/per-quadrant specific.** "Once per 12 months" vs "twice per calendar year" behave differently near year boundaries. Crown replacement clauses are per-tooth (commonly 5 to 7 years). Do not generalize to a single global rule.

**B9. Waiting periods do not apply uniformly and can be waived.** Preventive usually immediate; basic short; major long; often waived with prior coverage proof. A widget that says "you must wait 12 months for everything" is wrong.

**B10. Missing tooth clause is about WHEN the tooth was lost relative to the policy, not whether the tooth is missing now.** The trigger is extraction date before coverage start. Get the logic right or the story misleads.

**B11. LEAT/downgrade means the service IS covered, just at a lower allowance.** Do not present downgrade as a denial. The patient gets a partial benefit and pays the material/technique difference.

**B12. Predetermination is an estimate, not a guarantee.** Real coverage still depends on eligibility and remaining max at the actual date of service. Useful, but label it an estimate.

**B13. "PPO" itself.** Patients confuse PPO with DHMO and with discount plans. PPO = see any dentist, better rates in-network, has deductibles/max/coinsurance. DHMO = capitation, must use assigned office, fixed copays, no annual max. If the glossary defines PPO, contrast it cleanly.

---

## C. ACTIONABLE TAKEAWAY PER CONCEPT (the "now do this" line each widget should end on)

- Annual maximum: "Plan big work for early in the benefit year, or split it across two years to use two maximums. Ask your office how much of your max is left before treatment."
- Waiting period: "If you had prior dental coverage, send proof. it often waives the wait. Get preventive care started now even while major work waits."
- 100/80/50 tiers: "Ask which tier YOUR specific procedure falls in on YOUR plan, before you assume a percentage."
- In-network/allowed amount: "Confirm the dentist is in-network for your specific plan, not just 'takes your insurance.' Ask for the allowed amount, not the billed fee."
- Missing tooth clause: "If you lost a tooth before this plan started, ask specifically whether replacement is excluded before you enroll or before you plan an implant/bridge."
- Frequency limits: "Ask when your last covered cleaning/X-ray/crown was, so you do not get denied for being a few weeks early."
- Downgrade/LEAT: "Ask if your plan downgrades white fillings or porcelain crowns, and what the out-of-pocket difference will be."
- Deductible/coinsurance: "Know that preventive usually skips the deductible, and that 50 percent coinsurance means you pay half of the allowed amount, plus everything over the max."
- Predetermination: "For any treatment over a few hundred dollars, ask the office to submit a predetermination first so you see the real number."
- Implants/bone graft/staging: "Get a written treatment plan listing every step, and check coverage line by line. some steps may not be covered at all."

---

## D. OVERSIMPLIFICATIONS THAT WOULD MISLEAD

1. Stating tier percentages as universal ("crowns are covered at 50 percent"). Always "commonly / on most plans / varies."
2. Implying the annual maximum protects the patient (it caps the plan, not the patient).
3. Showing coinsurance applied to the billed fee instead of the allowed amount.
4. Treating an implant as one covered event rather than a multi-step, often-excluded sequence.
5. Presenting downgrade as a denial rather than a reduced allowance.
6. A blanket "12 month waiting period" with no preventive/basic/major distinction and no waiver path.
7. Suggesting predetermination guarantees payment.
8. Any "you have insurance so it is free" implication for cleanings. even preventive can have frequency limits and network conditions.
9. Implying unused annual max rolls over (default is lose-it).
10. Conflating PPO with DHMO/discount plans.

---

## E. PRIORITY RANKING FOR BUILD EFFORT

Tier 1 (build richest, highest patient impact + highest error risk): Annual Maximum, 100/80/50 Basic-vs-Major sorter, In-Network/Allowed-Amount bill-flow, Waiting Period simulator.
Tier 2 (high value, clean trap stories): Missing Tooth Clause, Downgrade/LEAT, Frequency Limits, Implant staging/bone graft timeline.
Tier 3 (foundational, reinforce): Deductible, Coinsurance, Predetermination, PPO vs DHMO.

The 100/80/50 sorter and any implant/cost calculator are where a factual error would do the most damage. those need a dentist sign-off pass on the procedure categorization before launch.
