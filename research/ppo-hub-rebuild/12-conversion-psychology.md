# 12 — Conversion Psychology: PPO Plans Hub
## CoverCapy PPO Hub Rebuild | Wave 2 | Spec 12 of 20

**Scope:** Behavioral-economics levers, trust architecture, social-proof choices, share triggers, CTA hierarchy per persona, micro-commitments, and a prioritized experiment backlog. Every recommendation is tied to a finding in `09-patient-testing.md` or a persona in `05-personas.md`. No dark patterns. No fabricated scarcity. No countdown timers.

**Status:** Draft, June 26, 2026.

---

## 1. GOVERNING PSYCHOLOGY PRINCIPLE

The CoverCapy visitor is not an impulsive buyer. They are a worried shopper making a moderately high-stakes financial decision with imperfect information. The conversion psychology must match that reality.

The dominant emotional mode across all six tested personas (09) is anxious uncertainty, not desire. Marcus (cracked tooth) is in pain. Priya (kids braces) is doing complex family math. Derek (COBRA gap) is racing a deadline. Sandra (pre-retiree) distrusts salesiness. Caleb and Mae feel like impostors doing adult things for the first time. Natalie suspects the answer she wants does not exist.

**The conversion lever that works on all six is the same: reduce uncertainty faster than any competing page does.**

Luxury concierge feel, in this context, does not mean visual opulence. It means a knowledgeable friend who gives you the real answer before you have to ask for it, including the uncomfortable parts. The correct behavioral frame is not sales persuasion. It is the removal of decision friction.

---

## 2. ANCHORING: CASH VS. COVERED

### The problem with "$30/mo" as the lead anchor

The current hub opens on price. "09" Persona 5 (Caleb and Mae) found UHC Primary Dental at approximately $30/month and anchored on it immediately, then felt misled when they discovered it covers no major services (09, Friction point 5, "Plans from $30/mo anchor creates false expectations"). The anchor worked against conversion: it created a reference point that every other plan looked expensive against, without corresponding information about what more expensive plans actually buy you.

### Anchoring strategy: cash cost, not premium cost

The correct anchor is the cost of the dental work the visitor is worried about, not the cost of the plan. This is the "cash vs. covered" frame.

Introduce it in the hero section, immediately below the headline, as a single calibration line:

**Pattern: "Cash vs. covered" calibration anchor**

```
A crown without insurance runs $900 to $1,400.
Most plans on this shelf cost $30 to $100 a month.
```

This does three things simultaneously. First, it makes the monthly premium look small relative to a realistic out-of-pocket event (reference point anchoring). Second, it earns trust by naming a real number the visitor may already have looked up. Third, it implicitly frames the decision as insurance math rather than product shopping.

Do not invent the cash-cost figure. Source it from the same methodology used for the plan SSOT files and mark it with a verification date. Use a range, not a point estimate, to avoid overpromising.

### Anchoring inside plan story cards

Each plan story card should present the dollar anchor for its primary use case before listing the monthly premium. Tested response (09, Marcus, Persona 1): "A worked dollar example: for a $1,200 crown in year one, this plan would pay approximately $240 (20%), leaving you about $960."

The sequence inside every plan card is: **what the problem costs in cash first, what the plan pays, what you still owe, then what the plan costs per month.** This order frames the premium as a fraction of the savings, not as an additional cost.

Example pattern for Ameritas PrimeStar Care Complete:
> "A crown in cash: roughly $1,200. With Ameritas in year one, the plan covers 20% after your deductible, contributing about $230. Your out-of-pocket on the crown: roughly $970. The plan runs approximately $56 to $60 a month."

This is less impressive than leading with "no waiting periods," but it converts better because it treats Marcus honestly (09, Marcus: "He would not click on any plan that hides the year-one major rate").

### Price range anchoring for the hub

Meta pill strip in the hero (from spec 10, Section 5): retain the "From approximately $30/mo" pill but pair it with a second pill: "Up to $5,000 annual coverage." The second number anchors potential value. Together they frame the premium-to-benefit ratio positively without overpromising.

---

## 3. FRAMING WAITING PERIODS AND ANNUAL MAXIMUMS

### Waiting periods: the most trusted frame is the calendar date

Every persona in 09 responded better to a future date than to an abstract duration. "12-month wait" is bureaucratic. "Enroll today, major work eligible by July 2027" is human.

**Pattern: "Eligible by" date translation**

Inside every plan story card, after the waiting-period disclosure:
```
If you enroll this month, major work becomes eligible by [month, year].
```

This pattern converts waiting periods from a liability into a planning tool. It also answers Priya's underlying question: "When exactly does the ortho benefit kick in so I can tell the orthodontist?" (09, Priya, Unanswered questions 1 and 2).

The date logic is simple: current month plus waiting-period months. Render it with JavaScript on page load using the system date, so the answer is always accurate without manual updates.

**Pattern: Graduated benefit distinguished from waiting period**

The 09 testing found that "no waiting period" on Ameritas and Mutual of Omaha was read as deceptive when the year-one major rate was only 20% (09, Marcus Persona 1: "He assumes there is a catch buried somewhere"; Sandra Persona 4: "So it is not really no waiting period, it just starts badly"). The fix is a firm semantic distinction made explicitly on the page:

```
No waiting period means: you can schedule the procedure right away.
Graduated benefit means: what the plan pays increases over time.
These are different things. Ameritas has both: day-one access, 20% year one, rising to 50%.
```

State this distinction once in a plain-language explainer early in the plan stories section (before or inside Stop 3, Ameritas), then refer back to it consistently in each relevant card rather than re-explaining it.

### Annual maximums: per-person framing

Sandra (09, Persona 4) and Priya (09, Persona 2) both ran into per-person vs. per-policy confusion on maximums. The correct frame is explicit and labeled.

**Pattern: Maximum label format**

Every annual maximum reference must include the scope label:
```
$3,000 per person per year
```

Not "$3,000 annual maximum." Not "$3,000 per year." The scope ("per person") is the critical information.

For sub-maximums (implant cap, ortho cap), state explicitly whether they count against the annual maximum:
```
$3,000 lifetime implant maximum (counts toward your annual maximum, not in addition to it)
```

This directly answers Sandra's unanswered question 3: "Does an implant procedure costing $3,500 eat my entire annual maximum?" (09, Sandra).

### Family maximum framing

The whole-family shopper persona (05, Persona 5) has a common misconception that "family plan" means a shared annual maximum pool. Most individual PPOs on this shelf are per-person maximums stacked. This is actually favorable math, but it is invisible.

**Pattern: Aggregate framing for the family section**

In spec 10's family section, add an explicit note using the aggregate frame:
```
Most individual PPO plans have per-person annual maximums, not a shared family ceiling.
Two adults on Mutual of Omaha at $5,000 each means $10,000 in aggregate annual coverage,
not a $5,000 pool divided among family members.
```

This reframing converts a perceived limitation (two separate policies) into an advantage (two independent coverage ceilings). It is honest because the math is accurate. It is a genuine conversion lever because most competitors do not explain this.

---

## 4. SOCIAL PROOF: HONEST OPTIONS ONLY

No fabricated reviews. No invented star ratings. No "9,742 families chose this plan" counter unless the number is real and verifiable. The testing found that precision in real data (AM Best ratings, carrier founding years, network sizes from verified sources) was more trusted than vague social proof claims (09, Synthesized Findings, Trust Builder 3: "Carrier credentials cited specifically").

### What honest social proof looks like on this page

**Option A: Carrier credibility signals (recommended for plan cards)**

Inside each plan story card's quick-facts mini-panel (spec 10, Section 7):
```
Carrier: [Name]
Underwriter: [Name if verifiable from SSOT]
AM Best: [Rating if available in SSOT]
```

Do not invent these figures. If the SSOT does not list an AM Best rating, omit the field. A blank is less damaging than a fabricated rating.

**Option B: Network size as scale signal**

Verified network sizes from SSOTs are honest social proof. "More than 400,000 provider locations in the DenteMax Plus network" (from mutual-of-omaha-dental.md) is a credible scale signal because it is specific, sourced, and verifiable by the reader.

Pattern: surface the network figure in the quick-facts panel and in the plan story's first paragraph where the dentist-network concern is highest. This directly addresses the "is my dentist in the network?" question that every persona raised.

**Option C: Editorial voice as authority signal**

The "CoverCapy editorial team" byline and a verified date on each plan review are a form of institutional social proof. Visitors like Sandra (09, Persona 4) and Derek (09, Persona 3) responded specifically to source attribution. Adding a short editorial disclosure in the plan story overline, in the pattern of a magazine byline, earns authority:
```
Reviewed by the CoverCapy editorial team. Last verified June 2026 against carrier materials.
```

This is an honest signal. Do not use fabricated credentials (no invented reviewer names with fake credentials).

**Option D: "Other shoppers also considered" patterns**

Not available yet. Without actual site analytics, this module must not be built with fabricated data. If analytics are available after launch, a "visitors who matched your scenario also looked at" pattern is a legitimate conversion tool. Defer until real data exists.

---

## 5. AUTHORITY AND TRUST SIGNALS

### The "who is CoverCapy" problem

Four of six tested personas expressed confusion or distrust about CoverCapy's identity (09, Synthesized Findings, Trust Builder 1 and the friction implicit in all personas' "what makes them feel in control" sections). Marcus (09, Persona 1): "Is CoverCapy the insurer, a broker, or something else?" Derek (09, Persona 3): "Does CoverCapy share my information with insurance companies or telemarketers?" Caleb and Mae (09, Persona 5): "Who is CoverCapy? Is this website safe to buy from?"

**Mandatory trust module: "About CoverCapy" inline block**

This must appear in the center column, not linked to a separate about page. It belongs in the visible area, either at the bottom of the hero or immediately before the scenario finder. It must be brief. Approximately 60 words.

Suggested copy pattern:
```
CoverCapy is an independent educational marketplace, not an insurer.
We research and compare PPO dental plans so you can make an informed choice.
When you click through to a plan, you go to the carrier or a licensed insurance partner.
We do not sell your information. We are paid by carriers only when enrollment happens through our site.
```

The final sentence ("We are paid by carriers only when enrollment happens") is critical. It explains the business model without obscuring it. Visitors who understand the incentive structure trust the editorial more than visitors who suspect hidden motives. This is a transparency-as-trust pattern with strong behavioral evidence.

### AM Best and carrier credentials

Display these only from verified SSOT data. Do not put placeholder brackets in the live page. A missing AM Best rating is fine. A fabricated one collapses trust if the visitor checks it.

### Privacy signal

Short, scannable, placed near CTAs that ask for any personal information:
```
We do not sell your information.
Clicking a plan goes to the carrier or a licensed partner.
```

This addresses Derek's explicit concern (09, Persona 3: "I wonder if CoverCapy is going to sell my email to a call center") and Caleb's trust concern. It must be placed in close proximity to any email-collection or "get a quote" CTA, not buried in a footer.

### Limitation-first framing as a trust signal

The counterintuitive finding from 09 is that disclosing limitations before benefits increases conversion. "Limitation-first plan framing (honest constraint before the upsell) is the highest-trust conversion approach for this audience" (09, Design Implications for spec 12). This is because the CoverCapy visitor is already suspicious of plans that seem too good. When the page leads with the limitation, it signals that the page is not hiding it, which earns credibility for everything the page says next.

Implementation: every plan story card opens with its primary caveat before its primary benefit.

Example for Ameritas PrimeStar Care Complete:
> "No waiting periods means you can book any procedure tomorrow. One thing to know upfront: the plan pays only 20% on major work in your first year. That rises to 50% in year two. If your crown is coming soon, the math still favors coverage over cash."

Example for UHC Primary Dental:
> "The lowest monthly cost on this shelf, around $30 a month. One clear limit: this plan does not cover major services (crowns, root canals, bridges). If your needs are cleanings, exams, and fillings, it delivers everything you need."

---

## 6. SCENARIO-FIRST FLOW AND CHOICE REDUCTION

### Why scenario-first reduces conversion friction

Dental insurance is structurally a choice overload problem. Eight plans, each with five to eight key variables, produces forty to sixty data points the visitor must compare before making a decision. Classical decision theory (Iyengar and Lepper, jam study; Barry Schwartz on the paradox of choice) predicts that more options produce less decision and more abandonment.

The scenario finder in spec 10 (Section 6) addresses this with a progressive reduction mechanism: visitor selects a situation (8 chips) and a timing context (3 buttons), and the system surfaces a single named recommendation. The psychological function is to collapse forty data points into one.

The 09 testing confirms this works for CoverCapy's audience. Marcus (09, Persona 1): "He responds well to seeing a scenario labeled something like 'Dental emergency or urgent crown' near the top. Seeing a scenario that matches his situation makes him feel the site understands him." Caleb and Mae (09, Persona 5): "They cannot figure out which is 'the best deal.' Without a 'recommended for you' signal, they feel paralyzed."

### Preserving agency after reduction

The risk of scenario-first is that visitors who do not see themselves in the available scenarios feel excluded or manipulated. The solution is to preserve an explicit opt-out: "Not sure? See all 8 plan stories below and decide for yourself" (spec 10, Section 6). This is a release valve, not a failure state. Some visitors want to browse. Letting them browse freely after the scenario finder has offered a recommendation is less alienating than insisting they use the guided path.

### Timing context as a conversion lever

The second step in the scenario finder (spec 10, Section 6): "How soon do you need treatment?" with three options: "Right now," "In 3 to 6 months," and "Next year" is a behavioral economics tool known as implementation intention elicitation. It asks the visitor to commit to a mental timeline, which makes the decision more concrete and increases follow-through. The answer also gates the recommendation: "Right now" surfaces no-wait plans (Ameritas, Mutual of Omaha) with explicit year-one rate disclosures. "Next year" surfaces plans with waiting periods as viable options since the wait will have passed. This prevents the mismatch Marcus described: a 12-month wait plan being recommended to someone with an urgent crown.

---

## 7. DEFAULT AND PRIMARY CTA HIERARCHY PER PERSONA

### Framework: two-CTA rule

Every persona lands on one primary CTA and one secondary CTA at each decision surface. Offering more than two active CTAs at a given page position causes decision paralysis (same choice overload dynamic as plan comparison). The primary CTA always reflects the visitor's most likely next step given their scenario. The secondary CTA is a softer commitment for visitors not ready to proceed.

### Persona-specific CTA hierarchy

**Persona 1: Urgent Single Adult (Marcus, "Fix It Now")**

Primary need: confirm this plan covers a crown right now.
Primary CTA: "See the plan that covers major work from day one" (scrolls to Ameritas or Mutual of Omaha plan card, depending on scenario finder selection).
Secondary CTA: "Verify my dentist takes this plan" (links to /find-my-dentist).

Do not offer a comparison table CTA as primary for this persona. Comparison tables require patience Marcus does not have. He wants one answer, not a table.

**Persona 2: Budget Mom / Kids Braces (Priya, "Braces or Bust")**

Primary need: understand exactly what Guardian pays toward two kids' braces, and when.
Primary CTA: "See Guardian's ortho benefit for your child" (scrolls to Guardian card, pre-scrolled to the ortho quick-fact panel).
Secondary CTA: "Forward this plan to my spouse" (opens email share with a pre-drafted scenario summary, see Section 8 for share triggers).

Do not use urgency framing for Priya. She is planning 12 to 18 months ahead. Urgency language would feel mismatched and reduce trust.

**Persona 3: COBRA Gap Worker (Derek, "Coverage Continuity")**

Primary need: confirm the prior-coverage waiver applies to his situation and understand the process.
Primary CTA: "See plans that waive the waiting period with prior coverage" (scrolls to the waiver explainer section or triggers the waiver sub-scenario in the finder).
Secondary CTA: "How does the prior coverage waiver work?" (anchor link to the waiting periods explainer section).

Derek converts fastest when the next step is de-risked. The CTA wording should reduce friction, not accelerate urgency. He already has urgency from his cracked-tooth appointment in 6 weeks. The page needs to lower the barrier to action, not amplify his stress.

**Persona 4: Pre-Retiree (Sandra, "Covered Again")**

Primary need: methodical comparison of Mutual of Omaha vs. Ameritas for the 65+ scenario, with community-rated premium confirmation.
Primary CTA: "Compare Mutual of Omaha and Ameritas for seniors" (opens the side-by-side scenario card for the 65+ scenario).
Secondary CTA: "Save this comparison to review with my spouse" (email share with 65+ scenario summary).

Sandra does not convert on first visit (09, Persona 4: "She would not convert on the first visit. She returns."). The primary goal on first visit is not enrollment. It is establishing the page as the trusted reference she returns to. The secondary CTA is therefore as important as the primary: it plants a return trigger and a share trigger simultaneously.

For Sandra, do not use a chatbot, a pop-up, or an urgency element. She actively distrusts them (09, Persona 4: "No countdown timers, no urgency pressure, no chatbots popping up").

**Persona 5: Young Couple (Caleb and Mae, "Two of Everything")**

Primary need: a "recommended for first-timers" signal that reduces the feeling of choosing blindly.
Primary CTA: "Start here if you mainly want cleanings and cavity coverage" (launches scenario finder pre-selected to "Cleanings + checkups" chip).
Secondary CTA: "Compare two individual plans vs. one family plan" (anchor link to family section math).

This persona converts on second or third engagement (09, Persona 5). The first-visit goal is to answer their top two questions (what does major mean? what exactly is the CVS perk?) so they leave the page feeling smarter than when they arrived. That feeling drives return and share.

**Persona 6: Adult Orthodontics Seeker (Natalie, "Adult Braces")**

Primary need: confirmation that one individual plan covers adult ortho and that it is available in her state.
Primary CTA: "See the one plan that covers adult Invisalign" (scrolls to Delta Dental card with an explicit "adult ortho available here" marker).
Secondary CTA: "Send this to a friend considering braces" (share trigger, see Section 8).

Natalie's conversion requires state availability confirmation before any other argument (09, Persona 6: "Surface state availability before plan story"). Do not bury the "available in 16 states plus DC" note in body copy. Put it in the scenario answer block, before the plan story begins, as a conditional: "Check that your state is covered before reading further."

---

## 8. MICRO-COMMITMENTS

### What micro-commitments do on this page

A micro-commitment is a small, low-stakes action that increases the probability of a larger action later. In conversion psychology, they work via two mechanisms: consistency (having agreed to A, the visitor is more likely to agree to B) and sunk cost (having invested effort in the scenario finder, the visitor is more invested in acting on the result).

For CoverCapy, where the actual purchase happens on a carrier's site (not on CoverCapy), the micro-commitment chain must bridge from first engagement to click-through to the carrier.

### Micro-commitment sequence

**MC1: Scenario selection** (highest leverage point)

Clicking any scenario chip in the scenario finder is the first micro-commitment. It converts a browsing visitor into a participant. The behavioral principle: having categorized themselves ("I have a crown coming"), visitors are more likely to engage with plan content that matches that category.

Design implication from spec 10 (Section 6): the scenario finder must be impossible to ignore on first scroll. It sits immediately below the hero. On mobile, it must be accessible via the sticky bottom bar ("Scenario finder" button). Do not hide it below two screens of intro copy.

**MC2: Household type selection**

The "Who needs coverage?" 4-button chooser in the hero (spec 10, Section 5) is a second micro-commitment. Selecting "Me + kids" or "Whole family" narrows the page to family-relevant content and creates a personalized feel that increases commitment.

**MC3: "Verify my dentist" query entry**

The inline search bar added to the verify CTA band (spec 10, Section 11: "a small inline search bar with placeholder 'Enter your dentist's name or city'") is a micro-commitment that moves the visitor from reading to doing. Typing a dentist's name is a higher-commitment action than clicking a button. It bridges to the /find-my-dentist conversion event.

**MC4: Timing selection in the scenario finder**

Choosing "Right now," "In 3 to 6 months," or "Next year" in Step 2 of the scenario finder (spec 10, Section 6) is an implementation intention micro-commitment. The visitor has now stated not just their need but their timeline. This increases the specificity of the recommendation and creates cognitive ownership of the result.

**MC5: "Save for later" or "Send to spouse" action**

For Sandra and Priya, who explicitly plan to return or share (09, Persona 4 and Persona 2), offering a "save this comparison" action that requires minimal information (a single email address or a share link, no account creation) creates a soft commitment that increases return probability.

Do not gate this behind account creation. Requiring an account registration is a commitment barrier that is higher than the reward warrants at this stage.

---

## 9. SHARE TRIGGERS

The 09 testing identified five share triggers. Each requires distinct copy and CTA design.

### Share trigger 1: Exclusive insight the visitor could not find elsewhere

This is the highest-leverage share driver for Natalie (09, Persona 6: "She would share the hub because she found something no other comparison site told her") and Derek (09, Persona 3: "the 63-day window").

**Implementation:**

Each scenario finder result block should include a "shareable insight" formatted for copy-paste or direct share. Not a plan card. A single sentence in plain language that encapsulates the finding.

For the adult ortho scenario:
```
Did you know one individual dental plan covers adult Invisalign?
Delta Dental PPO Premium covers adult orthodontics at 50% up to a $1,500 lifetime maximum,
after a 12-month wait. Available in 16 states plus DC.
[Share this with someone considering braces]
```

For the COBRA gap scenario:
```
If you lost employer dental coverage in the last 63 days,
you may be able to waive the waiting period on a new individual plan.
[Share with someone who just changed jobs]
```

For the no-wait scenario:
```
Two individual dental plans cover crowns and root canals from day one,
with no waiting periods. Year-one rates are 20%, rising in year two.
[Share how fast coverage can start]
```

The share button opens a system share sheet (navigator.share API, with mailto fallback) with the sentence pre-populated. No fabricated metrics in the shareable text. No invented claim.

### Share trigger 2: Scenario summary the visitor can forward

Priya (09, Persona 2) and Derek (09, Persona 3) both expressed explicit willingness to forward a scenario summary. Priya: "other parents from the school." Derek: "three former coworkers within days of being laid off."

**Implementation:**

At the end of each scenario finder result (after the plan recommendation and the "eligible by" date translation), offer:
```
[Forward this recommendation by email]
[Copy a text message summary]
```

The email template must be pre-drafted to be self-contained without requiring the sender to write anything. Suggested template for the braces scenario:

```
Subject: Guardian dental plan for kids braces

I found this breakdown while researching braces coverage.
Guardian Premier covers child orthodontics at 60% in-network,
up to $1,500 lifetime per child, after a 12-month wait.
Monthly premium is roughly [X]. Source: covercapy.com/dental-insurance/ppo-plans/

Worth looking at if you're planning braces in the next year or two.
```

### Share trigger 3: Dollar math the visitor can relay verbally

Marcus (09, Persona 1) needs a relayable sentence to text his brother-in-law. Natalie (09, Persona 6) needs the math she can say out loud. The page copy must generate these sentences naturally, not bury them in percentage tables.

**Implementation: "Dollar sentence" at end of each plan's dollar example block**

Each worked dollar example should end with a one-sentence "relay this" line:
```
In plain terms: a $1,200 crown, year-one coverage at 20%, you pay roughly $960 out of pocket.
That is still several hundred dollars less than cash in most markets.
```

This sentence is designed to be said out loud, texted, or copied into a message. It is not marketing copy. It is information the visitor will actually want to pass on.

### Share trigger 4: Spouse or partner forward CTA

Sandra (09, Persona 4), Priya (09, Persona 2), and Caleb and Mae (09, Persona 5) are all sharing or will share with a partner. The design must accommodate this explicitly.

**Implementation:**

A persistent "share with spouse / partner" CTA in the right rail (spec 10, Block R5) and at the end of each scenario result. Wording per persona:

For the 65+ or retirement scenario: "Forward this comparison to your spouse."
For the braces scenario: "Send this to your partner before your next orthodontist appointment."
For the young couple scenario: "Share this with the other person on the plan."

The CTA must be a single click to a mailto share or a share sheet. No account creation. No form.

### Share trigger 5: "Feeling smart after reading the page"

The 09 testing identified this as the most universal share trigger across all six personas: "If the hub explains dental insurance in a way that is genuinely clear... users share the page as social proof of their own competence" (09, Top Share Triggers, point 5).

**Implementation: plain-language glossary as a social object**

The plain-language definitions of preventive, basic, and major that must appear early in the page (before any plan card, per 09 design implications for spec 10) should be presented as a named, linkable section. Something like: "What do preventive, basic, and major actually mean?" as an H2 anchor.

This section becomes shareable because visitors who finally understand the distinction will share it as proof of having figured something out. Design it to be scannable (three short definitions, no jargon), quotable (the definitions are clear enough to repeat), and linkable (anchor URL for direct sharing).

---

## 10. COPY PATTERNS BY PERSONA AND SCENARIO

### Pattern library for on-page copy

The following patterns are templates. All bracketed plan facts must be verified against the relevant SSOT before use.

**For the urgent single adult (Marcus / Persona 1 / "Fix It Now")**

Hero-level answer copy after scenario selection:
```
Two plans on this shelf cover crowns and root canals from day one.
No waiting period. Year one pays 20% on major work, rising to 50% in year two.
If your crown costs $1,200, the plan covers roughly $230 in year one.
That is more than $960 better than cash.
```

"Skip it if" note:
```
Skip Ameritas if you expect most of the major work in year one and
need the plan to cover more than 20% from day one.
In that case, review what your out-of-pocket would be on cash and decide which math works.
```

**For the parent / kids braces (Priya / Persona 3 in 05)**

Scenario result copy:
```
Guardian Premier covers your child's braces at 60% in-network,
up to $1,500 lifetime per child.
The 12-month waiting period means: enroll now,
braces eligible around [month + 12 months, rendered dynamically].
That $1,500 is per child, not shared across your family.
```

Family-mode family section copy:
```
Two children, one parent on Guardian: each child has their own $1,500 lifetime ortho benefit.
The $750 per-benefit-year structure means the plan contributes
roughly $750 in year one and $750 in year two per child in active treatment.
```

**For the COBRA gap worker (Derek / Persona 3 in 09)**

Scenario result copy:
```
If your employer plan ended within the last 63 days,
Delta Dental PPO Premium and Humana Extend 5000 both offer
waiting-period waivers for comparable prior coverage.
Your former group Delta Dental plan likely qualifies as comparable.
To confirm: contact the carrier before enrolling.
Ask specifically whether a former group plan with major-work coverage counts.
```

Micro-CTA after the above:
```
[How to get the waiting-period waiver: checklist]
```

(This links to or expands a 3-step checklist: confirm gap days, gather prior coverage documentation, contact carrier with specific question.)

**For the pre-retiree (Sandra / Persona 4 in both)**

Scenario result copy:
```
Mutual of Omaha Dental Preferred: community-rated pricing, no waiting period on major work,
and a selectable annual maximum up to $5,000.
Year-one major is 20%, year-two major is 50%.
A $3,500 implant in year two: the plan contributes up to $1,750 (50%),
applied against the $5,000 annual maximum.

Ameritas PrimeStar Care Complete: location-rated, not age-banded, next-day coverage,
major at 20% year one / 50% year two, $3,500 annual maximum by year two.

Neither plan has a premium increase at age 65.
```

Authority note for Sandra:
```
Verified against carrier materials, June 2026.
Neither plan requires Medicare enrollment or is classified as Medicare supplement.
Confirm your specific premium with the carrier before enrolling.
```

**For the young couple (Caleb and Mae / Persona 5 in 09)**

First-time buyer orientation block (appears before plan stories, visible early in the page):
```
If this is your first individual dental plan, here is how coverage works in three plain words:

Preventive: cleanings, exams, X-rays. Almost always 100% from day one.
Basic: fillings, simple extractions. Usually 50 to 80%, sometimes after a short wait.
Major: crowns, root canals, bridges, implants. Higher cost, often a waiting period.

Every plan on this shelf covers preventive from day one.
The difference between them is how much they cover for basic and major, and how fast.
```

For the CVS perk:
```
Aetna Dental Direct includes a CVS ExtraCare Plus membership.
What that means: $10 per month in CVS Health rewards credit,
redeemable at CVS stores or CVS.com on CVS Health brand products.
That is roughly $120 per year in value for things like
oral care products, vitamins, or health items you may already buy.
Not available in Georgia, Louisiana, Minnesota, Missouri, New York, New Jersey, Oklahoma, Texas, or Virginia.
```

**For the adult braces seeker (Natalie / Persona 6 in 09)**

Scenario result copy:
```
Delta Dental PPO Premium is the only individual plan on this shelf
that covers adult orthodontics, including Invisalign and clear aligners.
Coverage: 50% after a 12-month wait, up to $1,500 lifetime per person.
Separate $50 orthodontic deductible.

On a $5,800 Invisalign case:
Delta pays up to $1,500 (minus the $50 deductible: net $1,450).
Your estimated out-of-pocket for the ortho portion: roughly $4,350.

The plan also covers your cleanings at 100%, fillings at 50%,
and other dental needs during the treatment period.
Premium: approximately $75 per month.

Available in: [list of 16 states plus DC from SSOT].
```

State availability note (appears above the plan story, not buried in it):
```
Before reading further: Delta Dental PPO Premium individual plans with adult ortho
are sold in 16 states plus DC. Check that yours is covered.
[List or widget to confirm state availability]
```

---

## 11. WHAT TO AVOID (ANTI-PATTERNS)

The 09 testing and the 05 personas together identify a clear set of practices that reduce conversion on this specific page for this specific audience.

**No countdown timers.** Sandra explicitly distrusts them (09, Persona 4). Marcus does not need them: his cracked tooth creates real urgency. Manufactured urgency reads as manipulation to a worried shopper who is already stressed.

**No fabricated scarcity.** No "only 3 spots remaining" or "limited enrollment window" language. These claims are untrue and provably so for individual insurance plans, which have open enrollment without plan-size limits.

**No bundled benefit inflation.** Listing every incidental perk (orthodontic rider, vision, hearing) as a headline benefit without contextualizing their limits inflates perceived value and destroys trust when the visitor reads the fine print. Natalie calculated the thin math on Delta Dental's ortho benefit (09, Persona 6) and nearly bounced. She stayed only because the hub would frame it honestly. The correct approach: name every benefit with its material limit in the same sentence.

**No lowest-price lead without coverage context.** The "$30/mo" anchor in the hero meta pills is acceptable when paired immediately with the "cash vs. covered" calibration anchor. But using "$30/mo" as a standalone headline without the context that UHC Primary Dental covers no major services creates false expectations (09, Friction point 5).

**No unsolicited chatbots.** Sandra explicitly named this as a trust killer (09, Persona 4). Caleb and Mae are also distrustful of anything that feels like a sales interception. A "chat with an agent" option may belong in the right rail as a static link for Derek and Sandra, but it must never auto-trigger.

**No roman numerals in any list.** Per site constraints.

**No em-dashes.** Per site constraints.

---

## 12. PRIORITIZED CONVERSION EXPERIMENTS

These are post-launch A/B tests ordered by expected impact. Run them in sequence, one at a time, with at minimum 500 visitors per variant before reading results. No experiments should run during the first 30 days after launch while baseline data accumulates.

### Experiment 1 (highest priority): Limitation-first vs. benefit-first card order

**Hypothesis:** Plan story cards that open with the primary limitation (waiting period, year-one rate, exclusions) before the primary benefit will produce higher click-through to carrier sites than cards that lead with the benefit. Driven by 09 finding: "limitation-first framing paradoxically increases conversion because it signals the hub is on the user's side."

**Variant A (control):** Benefit-first card opening (current structure).
**Variant B (test):** Limitation-first: 1 sentence caveat, then benefit.
**Metric:** Click-through rate from plan card to carrier page (primary). Scroll depth past plan story cards (secondary).

### Experiment 2: "Eligible by" date vs. duration on waiting period

**Hypothesis:** Showing "major work eligible by July 2027" (dynamic calendar date) converts more visitors from the waiting-period disclosure than showing "12-month waiting period." Driven by 09 finding that every persona responded better to a future date than an abstract duration.

**Variant A:** "12-month waiting period on major."
**Variant B:** "Major work eligible by [month, year] if you enroll this month."
**Metric:** Scenario finder completion rate and click-through to plan page after seeing waiting period.

### Experiment 3: "Cash vs. covered" anchor placement

**Hypothesis:** A "cash vs. covered" calibration anchor (average crown cost range vs. monthly premium range) placed immediately below the H1 in the hero reduces bounce rate and increases scenario finder starts versus the current meta-pills-only approach.

**Variant A:** Meta pills only ("From approximately $30/mo").
**Variant B:** Meta pills plus 2-line calibration anchor ("A crown runs $900 to $1,400 in cash. Plans here cost $30 to $100/mo.").
**Metric:** Bounce rate (primary). Scenario finder start rate (secondary).

### Experiment 4: Share CTA placement on scenario result

**Hypothesis:** Adding a "Forward this to your spouse" or "Share this scenario" CTA inside the scenario finder answer block (immediately after the plan recommendation) produces more outbound shares and return visits than the current right-rail share block alone.

**Variant A:** Share options in right rail only (spec 10, Block R5).
**Variant B:** Inline share CTA in scenario result block plus right rail.
**Metric:** Share events (via navigator.share or mailto, tracked as outbound events). Return visit rate within 7 days.

### Experiment 5: "About CoverCapy" trust module position

**Hypothesis:** An inline "About CoverCapy" trust module placed above the scenario finder (first scroll position, immediately following the hero chooser) produces higher scenario finder completion rates than the same module placed at the bottom of the page or linked externally.

**Variant A:** Trust module at bottom of center column (or not present).
**Variant B:** Trust module immediately above scenario finder (after hero).
**Metric:** Scenario finder completion rate. Carrier click-through rate.

### Experiment 6: "Verify dentist" inline search vs. button

**Hypothesis:** The inline search bar ("Enter your dentist's name or city") added to the verify CTA band (spec 10, Section 11) produces a higher /find-my-dentist visit rate than the current generic button ("Verify my dentist takes this plan").

**Variant A:** Current button-only verify band.
**Variant B:** Inline text input with placeholder + submit.
**Metric:** /find-my-dentist referral clicks from the verify band.

### Experiment 7: Graduated benefit vs. waiting period terminology

**Hypothesis:** Consistently using "graduated benefit" (instead of conflating it with "waiting period") for plans like Ameritas and Mutual of Omaha that offer day-one access but increasing rates over time reduces distrust signals and increases plan-page click-throughs for those plans.

**Variant A:** Existing copy using "no waiting period" as the primary label.
**Variant B:** Split label: "No waiting period (day-one access)" + "Graduated benefit (20% year one, 50% year two)."
**Metric:** Bounce rate on Ameritas and Mutual of Omaha plan story cards. Carrier click-through rate for those two plans.

### Experiment 8: First-time buyer orientation block

**Hypothesis:** A plain-language "preventive / basic / major" definition block placed before the first plan story card reduces scroll-depth drop-off for Persona 2 (Preventive Single Adult) and Persona 5 (Young Couple) and increases the share rate of the page for first-time buyers.

**Variant A:** No definition block (current state).
**Variant B:** Definition block (3 short definitions, labeled H2, placed between scenario finder and first plan story card).
**Metric:** Scroll depth to plan cards. Time on page. Share events.

---

## 13. MEASUREMENT FRAMEWORK

Run experiments after the page has accumulated baseline data for 30 days post-launch. Track:

- Scenario finder start rate (percentage of sessions that click any scenario chip)
- Scenario finder completion rate (percentage that reach the answer block)
- Carrier click-through rate per plan (outbound clicks to carrier from each plan card)
- Verify CTA activation rate (/find-my-dentist clicks)
- Share events (navigator.share, mailto, copy-link)
- Return visit rate within 7 days (requires analytics session continuity)
- Bounce rate from the hub (sessions that leave without any interaction)

Do not track individual user identity or associate browsing behavior with personal dental information. CoverCapy is an educational marketplace; data collection must be proportionate to that role.

---

## 14. BEHAVIORAL ECONOMICS PRINCIPLES REFERENCED

This spec applies the following principles. No reference to proprietary models or fabricated frameworks.

**Reference-point anchoring (Kahneman and Tversky):** cash procedure cost as reference point, monthly premium as the comparison. Makes premium feel small.

**Choice reduction (Iyengar, Schwartz):** scenario finder collapses 8 plans to 1 recommendation per situation. Reduces paralysis.

**Transparency as trust (Cialdini, authority and liking):** limitation-first framing signals honesty, earning credibility for all subsequent claims.

**Implementation intention (Gollwitzer):** timing selection ("right now / in 3 to 6 months / next year") activates concrete planning, increasing follow-through.

**Consistency and commitment (Cialdini):** micro-commitment chain from scenario selection through household type through dentist search increases progressive investment.

**Loss avoidance (prospect theory):** cash-vs-covered framing is partially a loss-avoidance frame ("$960 better than cash"). Use carefully: do not overstate loss to create artificial urgency.

**Social proof via precision (Cialdini):** specific, sourced network sizes and carrier ratings are more credible than vague claims.

---

*Spec 12 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*No em-dashes. No fabricated statistics. No invented plan facts. Every plan fact must be verified against its SSOT in /data/plans/ before use in production.*
*This file is planning only. No production changes until all 20 specs and the master console are approved.*
