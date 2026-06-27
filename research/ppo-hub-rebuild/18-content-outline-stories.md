# 18 -- Content Outline and Plan Stories
## PPO Plans Hub Rebuild | Spec 18 of 20
**Status:** Complete
**Last updated:** 2026-06-26
**Author role:** Lead content designer
**Reads from:**
- `research/ppo-hub-rebuild/00-INDEX.md` (north star, constraints)
- `research/ppo-hub-rebuild/01-current-state-audit.md` (plan stories, audit findings)
- `research/ppo-hub-rebuild/06-scenario-matrix.md` (12 life-event scenarios)
- `research/ppo-hub-rebuild/08-plan-fit-by-scenario.md` (plan fit matrix)
- `research/ppo-hub-rebuild/10-ux-flow-wireframe.md` (page flow, scroll narrative, wireframe)
- `data/plans/*.md` (SSOT for every fact; these files always win over page copy)

**Non-negotiable rules inherited from CLAUDE.md and 00-INDEX:**
- No em-dashes anywhere.
- No fabricated plan numbers. Every fact traced to a named SSOT field.
- No "mandated editorial style" -- voice is premium concierge, not generic SaaS, not government portal.
- Plan facts from SSOT only. If page copy and SSOT conflict, SSOT wins after re-verification.
- No roman numerals in lists.
- No Capy Crowns in any verified CTA context until rewards program is live.

---

## TABLE OF CONTENTS

1. [Section S0 -- Hero and "Who Needs Coverage?" Chooser](#s0-hero)
2. [Section S1 -- Scenario Finder Widget](#s1-scenario-finder)
3. [Section S2 -- Plan Stories (all 8 tour stops)](#s2-plan-stories)
4. [Section S3 -- Verify CTA Band (first instance)](#s3-verify-band-1)
5. [Section S4 -- Comparison Table](#s4-comparison-table)
6. [Section S5 -- Best For Scenarios Grid](#s5-best-for-grid)
7. [Section S6 -- Family Section](#s6-family)
8. [Section S7 -- GEO Answer Blocks](#s7-geo-blocks)
9. [Section S8 -- Waiting Periods Explainer](#s8-waiting-periods)
10. [Section S9 -- Verify CTA Band (second instance)](#s9-verify-band-2)
11. [Section S10 -- FAQ](#s10-faq)
12. [Section S11 -- Editorial Footer and Related Links](#s11-editorial-footer)
13. [Left Rail Content](#lr-left-rail)
14. [Right Rail Content](#rr-right-rail)
15. [Conflict and Reconciliation Log](#conflicts)

---

## S0 -- HERO AND "WHO NEEDS COVERAGE?" CHOOSER {#s0-hero}

### Heading
H1 (Fraunces, 38-46px, max 22 characters per line):
```
Which PPO dental plan fits
YOUR situation?
```

### Purpose
Orient the visitor in under 8 seconds. Replace the current plan-first framing ("Best PPO Dental Plans Compared 2026: 7 Carriers Ranked") with a scenario-first entry. Signal that this is a guided conversation, not a price grid.

### Copy approach
Voice: a knowledgeable friend who has already spent three hours on this. Spare. No adjectives that do not earn their keep. No calls to action with exclamation points.

**Lede (Inter Tight, 17px, max 58 characters per line):**
```
Eight verified PPO dental plans, organized by what
your mouth actually needs in the next 12 months.
No guesswork. No sales pitch. Just the right match.
```

**Meta pill row (below lede):**
```
[ 8 plans verified ]  [ From ~$30/mo ]  [ June 2026 ]
```

SSOT citations for pills:
- "8 plans verified": all 8 SSOT files in `/data/plans/` carry `status: verified` and `last_verified: 2026-06-26`.
- "From ~$30/mo": `uhc-primary-dental.md`, `monthly_premium: "~$30/mo (estimate)"`.
- "June 2026": reflects actual `last_verified` dates across all SSOT files.

**"Who needs coverage?" chooser (inline hero widget):**

Label: "Who needs coverage?" (Inter Tight, 14px, 700 weight, `--ink-soft`)

Four pill buttons:
```
[ Just me ]   [ Me + kids ]   [ Me + spouse ]   [ Whole family ]
```

Inline answer text (appears below chooser on selection, `aria-live="polite"`):

| Selection | Answer text |
|-----------|------------|
| Just me | "Eight individual plans from $30 to $100 a month. The decision comes down to what your mouth needs in the next 12 months: just cleanings, or something bigger." |
| Me + kids | "Guardian Premier 2.0 is the only featured plan with dependent orthodontics. Pair it with a second individual plan for yourself. Read the family section below for how to stack them." |
| Me + spouse | "Two individual policies on this shelf often beat a family plan on value. Use the scenario finder below to match each person to the right plan." |
| Whole family | "Three plans do the real family work here: Aetna for CVS perks for the household, Humana for a high ceiling per person, Guardian for kids' braces. See the family section." |

**CTA row:**
```
[ Find my plan  (primary, --deep background) ]   [ Compare all 8 ]
```

"Find my plan" scrolls to `#scenario-finder`. "Compare all 8" scrolls to `#comparison-table`.

### Plan stories surfaced
None directly. Hero sets the stage.

### Paired widget/rail
Left rail: Scenario Nav (Block L1) is visible from page load. Right rail: Dentist Verify CTA (Block R1) is visible from page load.

### Word count guidance
H1: under 10 words. Lede: 25-35 words. Chooser answer text: 20-30 words per state. Total hero copy: 100-150 words.

---

## S1 -- SCENARIO FINDER WIDGET {#s1-scenario-finder}

### Heading
H2 (Fraunces):
```
Start with your situation, not a brand name
```

### Purpose
Primary conversion surface. Matches visitor to the right plan before they read plan stories. Replaces and enriches the current six-button `.picker` widget. Adds family mode and a timing qualifier (Step 2).

### Copy approach
Empathetic, fast, no fluff. Each chip label is a person's actual thought, not a product category. Answer blocks read like a trusted friend texting back.

### Step 1: Situation chips (2x4 grid of full-card buttons)

Each card: icon glyph (SVG, 20px, `--teal-300`), label (Inter Tight, 15px, 700), one-line hint (Inter Tight, 13px, `--ink-mute`).

| Chip label | One-line hint | Maps to |
|-----------|--------------|---------|
| Cleanings + checkups | Maintenance only, no work coming | UHC (#stop-uhc) |
| Crown is coming | Major work within 12 months | Ameritas or Aetna with waiver (#stop-ameritas, #stop-aetna) |
| Implant ahead | One or more missing or failing teeth | MetLife or Mutual of Omaha (#stop-metlife, #stop-moo) |
| Braces for my kid | Dependent under 19 | Guardian (#stop-guardian) |
| Left a job with dental | Had coverage in the last 90 days | Aetna (#stop-aetna) |
| Big work year | Crown, root canal, multiple procedures | Mutual of Omaha or MetLife (#stop-moo, #stop-metlife) |
| Seniors / 65+ | Medicare-adjacent or retired | Mutual of Omaha (#stop-moo) |
| Largest network | My dentist matters most | Delta Dental (#stop-delta) |

### Step 2: Timing picker (appears after Step 1 selection)
Label: "How soon do you need treatment?"
Three pill buttons: `[ Right now ]   [ In 3-6 months ]   [ Next year ]`

### Answer block (appears after Step 2)

Structure:
```
EYEBROW: OUR RECOMMENDATION
Plan name (Fraunces, 20px)
"The story in one sentence"
KEY FACT PILL: [e.g., No major wait / 6-month wait / From ~$30/mo]
Skip if: [short caveat]
[ Read the full plan story below ]   [ Open side-by-side comparison ]
```

Sample answer blocks by scenario:

**Cleanings + checkups / Right now:**
Plan: UHC Primary Dental. Story: "The cheapest plan on the shelf covers your cleanings at 100% from day one -- about $1 a day." Key fact pill: `~$30/mo (estimate)`. Skip if: "A dentist has ever said the words crown, implant, or we should keep an eye on that tooth."
SSOT: `uhc-primary-dental.md`, `monthly_premium`, `coverage_preventive`, `coverage_major: "Not covered"`.

**Crown is coming / Right now:**
Plan: Ameritas PrimeStar Care Complete. Story: "No waiting period on anything, including major work. The crown is covered from month one." Key fact pill: `No major wait`. Skip if: "One large implant is the plan -- the year-one implant sub-cap ($1,000, deducted from annual max) is tighter than the plans below."
SSOT: `ameritas-primestar.md`, `waiting_periods`, `implants: "$1,000 day one...deducted from the annual dental maximum"`.

**Left a job with dental / Right now:**
Plan: Aetna Dental Direct. Story: "Enroll within 90 days of losing employer dental and both waiting periods -- 6 months on basic, 12 months on major -- disappear." Key fact pill: `Waiver: enroll within 90 days`. Skip if: "You need implants -- Aetna excludes them outright."
SSOT: `aetna-dental-direct.md`, `waiting_periods: "Both waits waived if all enrolled family members had dental coverage within the past 90 days"`, `implants: "Not covered"`.

**Braces for my kid / Next year:**
Plan: Guardian Premier 2.0. Story: "Enroll today. The 12-month orthodontic wait expires right as treatment begins." Key fact pill: `60% in-network, $1,500 lifetime max`. Skip if: "The braces are for an adult -- Guardian covers children under 19 only."
SSOT: `guardian-premier-ppo.md`, `orthodontics: "Child only (covered dependents under 19 when the active appliance is first placed) at 60% in-network (50% out-of-network) after a 12-month wait; $750 per benefit year and $1,500 lifetime orthodontic maximum"`.

**Seniors / 65+ / Any timing:**
Plan: Mutual of Omaha Dental Preferred. Story: "Community-rated pricing: your premium does not go up because you turned 65. No waiting periods. Selectable ceiling up to $5,000." Key fact pill: `Community-rated, no major wait`. Skip if: "You need orthodontics or whitening -- neither is covered."
SSOT: `mutual-of-omaha-dental.md`, `monthly_premium: "Community-rated, varies by state and ZIP"`, `waiting_periods: "NONE"`, `annual_maximum: "Selectable $1,500 / $3,000 / $5,000"`, `orthodontics: "Not covered"`, `whitening: "Not covered"`.

### Family/individual toggle
Segmented control above chips: `[ Individual ]  [ Family ]`
Family mode collapses to 4 family-specific scenario cards (see Section S6 for copy).

### SSOT facts surfaced
All facts in answer blocks must be verified per SSOT citations annotated above. Do not add new plan numbers or claim new comparisons without SSOT citation.

### Paired widget/rail
Left rail Block L1 Scenario Nav mirrors chip choices. Right rail Block R1 Dentist Verify CTA is persistent.

### Word count guidance
Each answer block: 30-50 words. Step 1 chip hints: 6-8 words each. Total widget copy: 250-400 words.

---

## S2 -- PLAN STORIES (all 8 tour stops) {#s2-plan-stories}

### Section heading
H2 (Fraunces):
```
Eight PPO plans, each with a story
```

Section lede (Inter Tight, 17px):
```
Walk the shelf from cheapest to strongest.
Each stop tells you who the plan was built for
and who should keep walking.
```

### Copy approach
The seven existing vignettes (Sam, Priya, Marcus, the Nguyens, Renee, Elena, David) are the editorial heartbeat of this page. They are preserved verbatim or with only the lightest touch to remove any em-dashes or minor inaccuracies against 2026 SSOT data. The Delta Dental vignette is preserved as a gateway to the Delta hub. Each card adds a compact "Quick Facts" panel with SSOT-sourced numbers. Voice across all 8 stops: third-person story, present-tense resonance, one person in a real situation. Never preachy. Never salesy.

---

### STOP 1: UHC Primary Dental (#stop-uhc)

**Stop eyebrow:** Stop 01 of 08 -- Cleanings + checkups

**Plan name (H3, Fraunces):** UHC Primary Dental

**Stop price line (Inter Tight, 15px, `--ink-soft`):**
"~$30/mo (estimate, ages 18 to 64, varies by state and ZIP)"
SSOT: `uhc-primary-dental.md`, `monthly_premium`.

**The story (preserved verbatim from audit 4.1):**

> **Sam booked a cleaning for Friday -- on Monday he had no insurance at all.** He enrolled at lunch, his member ID arrived by email, and by the appointment his preventive care was covered at 100%. Total wait: three business days. Total drama: none.

Source: `01-current-state-audit.md`, section 4.1, lines 255-258. Preserved verbatim. Original text had no em-dash; no change needed.

**Plan prose (2-3 sentences below the story, new in rebuild):**
"This is the entry plan on the shelf. Preventive care -- exams, cleanings, bitewing X-rays -- pays at 100% from day one with no deductible. Basic work like fillings starts at 50% on day one and steps up to 65% after year one and 80% after year two. Major work is not covered on this tier."
SSOT: `uhc-primary-dental.md`, `coverage_preventive: "100% in-network from day one, deductible waived"`, `coverage_basic: "50% from day one (no wait), rising to 65% after the first policy year and 80% after the second"`, `coverage_major: "Not covered"`.

**Skip it if (styled as bordered note box, `--gold-soft` background):**
"Skip it if: a dentist has ever said the words crown, implant, or we should keep an eye on that tooth."
Source: audit 4.1. Preserved verbatim.

**Key fact flags for Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$30/mo (estimate) | `monthly_premium` |
| Annual max | $1,000/person/calendar year | `annual_maximum` |
| Preventive | 100%, day one | `coverage_preventive` |
| Basic (fillings) | 50% day one, rising to 65% / 80% | `coverage_basic` |
| Major | Not covered | `coverage_major` |
| Implants | Not covered | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| Age eligibility | 18 to 64 (not available in NY) | `monthly_premium` note, `not_in_ny` |
| Activation | As soon as the day after application is received | `activation` |
| Network | UnitedHealthcare Dental | `network` |

**Conflict flags:**
- Activation: audit language says "1-3 business days." The sourced SSOT language is "as soon as the day after the application is received." Use the SSOT wording. Do not promise a guaranteed next-business-day; frame as "as soon as the day after."
- "Three business days" in the story is a narrative device; it is not a guaranteed fact from the SSOT. The story can stand as a vignette (Sam's real experience), but no prose section should state a guaranteed timeline. Keep the story; add a footnote: "Activation timing varies. Coverage can start as soon as the day after your application is received."
- Age cap: story does not mention Sam's age. Fine. But Quick Facts panel must include the 18-to-64 note and "not available in New York."

**CTA inside card:**
```
[ Full UHC Primary Dental review ]   [ Verify my dentist ]
```

### Word count guidance
Story: 50-70 words (preserved). Plan prose: 40-60 words. Skip-it note: 15-20 words. Total per card: 120-160 words of editorial copy, plus quick facts panel.

---

### STOP 2: Aetna Dental Direct (#stop-aetna)

**Stop eyebrow:** Stop 02 of 08 -- Just left a job with dental

**Plan name (H3, Fraunces):** Aetna Dental Direct

**Stop price line:**
"~$50/mo (estimate, varies by ZIP, age and effective date)"
SSOT: `aetna-dental-direct.md`, `monthly_premium`.

**The story (preserved verbatim from audit 4.2):**

> **Priya left her job in March; her employer dental ended with it.** She enrolled in April -- inside the 90-day window -- submitted proof of prior coverage, and Aetna waived the 3-month and 12-month waiting periods entirely. The crown she needed in June paid out at 50%, months before it otherwise would have.

Source: `01-current-state-audit.md`, section 4.2, lines 265-268. No em-dashes in original. Preserved verbatim.

**Plan prose (new in rebuild):**
"Aetna follows the classic 100/80/50 structure: preventive at 100% from day one, basic at 80% after a 6-month wait, major at 50% after a 12-month wait. Both waits disappear if all enrolled family members had dental coverage in the past 90 days -- which is why this is the go-to plan for anyone coming off an employer policy. It carries one of the largest networks on this shelf: 442,000-plus dentist locations. Implants and orthodontics are not covered."
SSOT: `aetna-dental-direct.md`, `coverage_preventive`, `coverage_basic: "In-network you pay 20% (plan pays 80%) after a 6-month wait (waivable)"`, `coverage_major: "In-network you pay 50% (plan pays 50%) after a 12-month wait (waivable)"`, `waiting_periods: "Both waits waived if all enrolled family members had dental coverage within the past 90 days of enrollment"`, `implants: "Not covered"`, `orthodontics: "Not covered on any Dental Direct tier"`.

Note: "442,000-plus dentist locations" comes from the plan page (audit source); this number does not appear in the SSOT fields -- the SSOT network field states the network name only ("Aetna Dental PPO (Direct Preferred PPO tier)"). Mark this as a plan-page figure and verify before build; do not print as a brochure-confirmed fact. If unverifiable, drop the specific count and write "one of the largest PPO networks on this shelf" without a number.

**CVS ExtraCare Plus callout (new in rebuild -- inline within card, pairs with Right Rail Block R2):**

A small teal-border inset inside the Aetna card:
```
CVS HEALTH PERK
Aetna is part of CVS Health. Enrolled members on the
Preferred and Core tiers receive CVS ExtraCare Plus:
up to $120 a year in rewards, 20% off CVS Health brand
products, and free CVS.com shipping. Not available in
GA, LA, MN, MO, NY, NJ, OK, TX or VA.
```
SSOT: `aetna-dental-direct.md`, `cvs_extracare_plus: "$10 monthly bonus reward (loads to the ExtraCare card within ~72 hours...must be used in a SINGLE transaction...NOT available in GA, LA, MN, MO, NY, NJ, OK, TX and VA (9 states)"`.
Do NOT claim the $10 reward rolls over (it does not). Do NOT claim the 20% off applies to sale items (non-sale only). Do NOT mention a 24/7 pharmacist helpline (that belongs to the medical-plan version only).

**Skip it if:**
"Skip it if: you need implants (excluded on this tier) or you have no recent coverage and cannot wait a year for major work."
Source: audit 4.2. Preserved verbatim. Minor adjustment: changed "can't" to "cannot" for style consistency.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$50/mo (estimate) | `monthly_premium` |
| Annual max | $1,250/person/calendar year | `annual_maximum` |
| Deductible | $50 individual, $150 family/calendar year | `deductible` |
| Preventive | 100%, day one | `coverage_preventive` |
| Basic (fillings) | 80% after 6-month wait (waivable) | `coverage_basic` |
| Major | 50% after 12-month wait (waivable) | `coverage_major` |
| Implants | Not covered | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| CVS ExtraCare Plus | Included (Preferred + Core tiers, 9 state exclusions) | `cvs_extracare_plus` |
| Activation | 1st of the month after enrollment | `activation` |

**Conflict flags:**
- Audit story says "3-month" waiting period for basic. Current SSOT says "6-month wait" on basic. The story is a vignette and Priya's experience remains valid (she enrolled in April and the waiver removed the wait). However, the plan prose must state the correct 6-month basic wait as the default, not 3 months. The story line "waived the 3-month and 12-month waiting periods" is a vignette device and is defensible as Priya's experience post-waiver, but a footnote should clarify: "The standard basic wait is 6 months; Priya's was waived because she enrolled within 90 days of losing employer coverage." SSOT: `aetna-dental-direct.md`, `waiting_periods: "Basic 6-month wait, Major 12-month wait"`.
- Annual max: earlier hub copy said "~$1,500." SSOT confirms exactly $1,250. Plan prose and Quick Facts must say $1,250, not ~$1,500. SSOT: `annual_maximum: "$1,250 per person per calendar year"`.

**CTA inside card:**
```
[ Full Aetna Dental Direct review ]   [ See the CVS perks ]   [ Verify my dentist ]
```

---

### STOP 3: Ameritas PrimeStar Care Complete (#stop-ameritas)

**Stop eyebrow:** Stop 03 of 08 -- Crown or major work, right now

**Plan name (H3, Fraunces):** Ameritas PrimeStar Care Complete

**Stop price line:**
"~$60/mo (estimate, age-neutral pricing by ZIP)"
SSOT: `ameritas-primestar.md`, `monthly_premium: "~$60/mo (estimate, rounded to nearest $5; brochure GR 7708 3-26 lists an average policyholder cost of $55.79/mo...age-neutral, pricing set by location/ZIP not age)"`.

**The story (preserved verbatim from audit 4.3):**

> **Marcus's molar was past saving.** He enrolled and had the extraction covered that same month -- no waiting period on anything here, implants included. He placed the implant in benefit year two, when everything had grown: major work at 50% instead of 20%, a $3,500 maximum instead of $2,000, and a $1,500 implant benefit. The plan rewarded him for staying.

Source: `01-current-state-audit.md`, section 4.3, lines 275-278. No em-dashes in original. Preserved verbatim.

**Plan prose (new in rebuild):**
"The defining feature is that there are no waiting periods on any category -- not preventive, not basic, not major, not implants. Coverage can begin as soon as the next day. Year one, major work pays at 20% in-network (10% out-of-network), then steps up to 50% in-network after year one. The annual maximum grows too: $2,000 in the first benefit year, $3,500 afterward. Implants are covered as a Type 4 major service, with a dedicated annual sub-cap ($1,000 in year one, $1,500 from year two) that is deducted from -- not added to -- the annual dental maximum. Pricing is age-neutral: the premium is set by ZIP, not by how old you are."
SSOT: `ameritas-primestar.md`, `waiting_periods`, `activation`, `coverage_major`, `annual_maximum`, `implants`, `monthly_premium`.

**Skip it if:**
"Skip it if: your case is one big implant this year and you can wait -- the $5,000-cap plans below out-pay the $1,000 year-one implant sub-cap."
Source: audit 4.3. Preserved verbatim.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$60/mo (estimate, age-neutral) | `monthly_premium` |
| Annual max | $2,000 year one, $3,500 after year one | `annual_maximum` |
| Deductible | $50/person on basic and major (preventive: $0) | `deductible` |
| Preventive | 100% in-network, day one | `coverage_preventive` |
| Basic (fillings) | 80% in-network year one, 90% after year one; no wait | `coverage_basic` |
| Major | 20% in-network year one, 50% after year one; no wait | `coverage_major` |
| Implants | Day one; $1,000/year sub-cap in year one, $1,500 from year two; deducted from annual max | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| Whitening | Not covered | `whitening` |
| Activation | As soon as the next day | `activation` |
| Network | Ameritas Classic (PPO) / Ameritas Dental Network | `network` |
| States | Not available in MA | `sources` (GR 7708 3-26) |

**Conflict flags:**
- Earlier hub copy may describe the implant sub-cap as a "separate budget." It is not. The implant annual maximum is deducted from the overall dental maximum. SSOT `do_not`: "Do NOT state the implant sub-cap as a separate budget." Correct in plan prose.
- "Coverage can begin as soon as the next day" (not same-day, not instant). SSOT `activation`: "Coverage can begin as soon as tomorrow (next-day coverage); policyholder gets same-day electronic access to policy and ID card. No first-of-month rule. Not literal instant activation."
- Network name: "PrimeStar Network" appears in some older copies. The correct SSOT name is "Ameritas Classic (PPO) network / Ameritas Dental Network." Use the SSOT name.
- Brochure average premium is $55.79/mo; rounded SSOT estimate is ~$60/mo. Do not replace ~$60 with $55.79 in display; keep as labeled estimate per README Rule 3.
- Not available in Massachusetts (GR 7708 3-26, confirmed in SSOT sources field). Flag on any state-targeted rendering.

---

### STOP 4: Guardian Premier 2.0 (#stop-guardian)

**Stop eyebrow:** Stop 04 of 08 -- Braces for a child

**Plan name (H3, Fraunces):** Guardian Premier 2.0

**Stop price line:**
"~$70/mo (estimate, varies by state, ZIP and age)"
SSOT: `guardian-premier-ppo.md`, `monthly_premium: "~$70/mo (estimate; varies by state, ZIP and age; a sample dentalinsurance.com quote for the Advantage Premier 2.0 is $67.89/mo at age 35)"`.

**The story (preserved verbatim from audit 4.4):**

> **The Nguyens' orthodontist said braces in about a year.** They enrolled the family now, so the 12-month orthodontic wait expired right as treatment began: 50% of a $6,000 case for their 13-year-old. Meanwhile dad's two fillings paid 85% in week one -- the highest day-one basic rate on the shelf.

Source: `01-current-state-audit.md`, section 4.4, lines 285-288. No em-dashes in original. Preserved verbatim.

**Accuracy note on "50% of a $6,000 case":** The SSOT says orthodontics pays at 60% in-network (50% out-of-network) with a $1,500 lifetime maximum and $750 per benefit year maximum. The story cites "50%" -- this is the out-of-network rate. If the Nguyens used an in-network orthodontist, the rate would be 60%. The story can stand because it does not specify network status, but plan prose must clarify the in-network rate and the lifetime cap.
SSOT: `guardian-premier-ppo.md`, `orthodontics: "Child only...at 60% in-network (50% out-of-network) after a 12-month wait; $750 per benefit year and $1,500 lifetime orthodontic maximum"`.

**Plan prose (new in rebuild, with accuracy correction):**
"Guardian is the child-braces play on this shelf. Dependent children under 19 are covered at 60% in-network (50% out-of-network) once the active appliance is first placed, up to $750 per benefit year and $1,500 over the life of the plan. The 12-month orthodontic wait is non-negotiable: enroll a year before the orthodontist starts. For the rest of the family, basic work (fillings) pays at 85% in-network from day one with no wait -- the highest day-one basic rate on this shelf. The $3,000 annual maximum per person gives a family meaningful per-member headroom. Implants are covered but capped at a $1,250 lifetime maximum -- much tighter than the implant plans below. Adult orthodontics is not covered on any Guardian individual plan."
SSOT: `guardian-premier-ppo.md`, `orthodontics`, `coverage_basic: "85% in-network (75% out-of-network) from day one"`, `annual_maximum`, `implants: "60% in-network (50% out-of-network) after a 12-month wait, subject to a $1,250 lifetime maximum"`.

**Skip it if:**
"Skip it if: implants are anywhere in the conversation, or the braces are for an adult -- dependent coverage only."
Source: audit 4.4. Preserved verbatim.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$70/mo (estimate) | `monthly_premium` |
| Annual max | $3,000/person/benefit year | `annual_maximum` |
| Deductible | $50/person (waived for in-network preventive) | `deductible` |
| Preventive | 100% in-network, day one | `coverage_preventive` |
| Basic (fillings) | 85% in-network, day one, no wait | `coverage_basic` |
| Major | 60% in-network after 12-month wait | `coverage_major` |
| Implants | 60% in-network, $1,250 lifetime max, 12-month wait | `implants` |
| Child orthodontics | 60% in-network, $1,500 lifetime max, 12-month wait; dependents under 19 only | `orthodontics` |
| Adult orthodontics | Not covered | `orthodontics` |
| Whitening | 50% in-network up to $500/benefit year, after $50 whitening deductible, 6-month wait | `whitening` |
| Activation | 1st of the month after enrollment (12-month minimum; 12-month re-enrollment lockout after cancellation) | `activation` |
| Network | DentalGuard Preferred; 124,000-130,000 dentists, 360,000+ locations | `network` |

**Conflict flags:**
- "50% of a $6,000 case" in the story is the out-of-network rate. In-network is 60%. Story is preserved as a vignette; plan prose must cite 60% in-network as the correct figure. Do NOT state major/implants as a flat 50% in any fact panel. SSOT `do_not`: "Do NOT state major/implants pay a flat 50%."
- Whitening: the SSOT is clear that whitening is 50% coinsurance capped at $500/yr (after a $50 whitening deductible), not a flat $500 allowance. Any copy calling it a "$500/yr allowance" must be corrected to "50% up to $500/yr after a $50 whitening deductible." SSOT `do_not`: "Do NOT describe whitening as a flat $500/yr allowance."
- The $750/benefit-year ortho cap means the full $1,500 lifetime benefit takes at least two benefit years to pay out. Plan prose must mention this. SSOT `do_not`: "Do NOT present the child ortho benefit as a lump sum."
- 12-month re-enrollment lockout after cancellation must appear in Quick Facts under Activation. Do NOT recommend Guardian for a short bridge-coverage scenario (see Scenario 3 in 06-scenario-matrix.md).

---

### STOP 5: MetLife NCD Complete (#stop-metlife)

**Stop eyebrow:** Stop 05 of 08 -- Big year ahead / multiple procedures

**Plan name (H3, Fraunces):** MetLife NCD Complete

**Stop price line:**
"~$100/mo (estimate, varies by state, age and ZIP)"
SSOT: `metlife-ncd-complete.md`, `monthly_premium: "~$100/mo (estimate; varies by state, age and ZIP; reseller quotes about $94/mo at age 35)"`.

**The story (preserved verbatim from audit 4.5):**

> **Renee was facing a year of heavy work and did not want to watch a $2,000 ceiling.** She enrolled with no waiting period, used preventive at 100% from day one, and knew that even a long treatment plan had room to run under a $10,000 maximum. The catch she planned around: major work reimburses low in the first year and climbs over the next two.

Source: `01-current-state-audit.md`, section 4.5, lines 295-298. No em-dashes in original. Preserved verbatim.

**Plan prose (new in rebuild):**
"The highest annual maximum on this entire shelf: $10,000 per person per calendar year, resetting every January 1. No waiting periods on anything. The deductible is $100 -- paid once in your first year, never again (a lifetime deductible). Three exams and three cleanings per calendar year, which is one more of each than most plans. The trade-off is patience: basic work starts at 65% in year one and climbs to 80% in year two, then 90% in year three. Major work and implants start at 10% in year one, 50% in year two, 60% in year three. Orthodontics and whitening are not covered."
SSOT: `metlife-ncd-complete.md`, `annual_maximum`, `waiting_periods`, `deductible`, `coverage_preventive`, `coverage_basic`, `coverage_major`, `implants`, `orthodontics`, `whitening`.

**Skip it if:**
"Skip it if: you need full major reimbursement in year one, since first-year major pays only about 10% while the schedule matures."
Source: audit 4.5. Preserved verbatim.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$100/mo (estimate) | `monthly_premium` |
| Annual max | $10,000/person/calendar year | `annual_maximum` |
| Deductible | $100 lifetime (paid once, in year one) | `deductible` |
| Preventive | 100%, day one; 3 exams + 3 cleanings/year | `coverage_preventive` |
| Basic (fillings) | 65% year one / 80% year two / 90% year three+ | `coverage_basic` |
| Major | 10% year one / 50% year two / 60% year three+ | `coverage_major` |
| Implants | Graduated major schedule (10/50/60); $3,000 annual implant max within $10,000 total | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| Whitening | Not covered | `whitening` |
| Activation | 1st of the month after enrollment | `activation` |
| Network | MetLife PDP Plus (PPO) | `network` |
| Plan structure | Association plan via NWFA; underwritten by Metropolitan Life Insurance Company | `carrier` |

**Conflict flags:**
- Implant sub-cap is $3,000 per CALENDAR YEAR, not per lifetime. SSOT `do_not`: "Do NOT state the implant cap as lifetime. It is $3,000 PER CALENDAR YEAR within the $10,000 maximum." Correct in Quick Facts.
- The deductible is a lifetime deductible; do NOT use the word "vanishing" as the primary descriptor. SSOT `do_not`: "Do NOT call the deductible 'vanishing' as the primary term. NCD's official term is a $100 LIFETIME deductible."
- Year-one major at 10% is very low. On a $1,500 crown: year-one payout is $150. Plan prose and any scenario answer that recommends MetLife must disclose this. SSOT notes: "For a $1,500 crown, year-one reimbursement is $150. Disclose."

---

### STOP 6: Mutual of Omaha Dental Preferred (#stop-moo)

**Stop eyebrow:** Stop 06 of 08 -- Seniors / 65+ / One large implant

**Plan name (H3, Fraunces):** Mutual of Omaha Dental Preferred

**Stop price line:**
"~$90/mo (estimate, community-rated, $5,000 annual max option)"
SSOT: `mutual-of-omaha-dental.md`, `monthly_premium: "~$90/mo (estimate, rounded to nearest $5). The live 2026 quote tool shows Mutual Dental Preferred at the $5,000 annual maximum = $88.40/mo; Community-rated, varies by state and ZIP"`.

**The story (preserved verbatim from audit 4.6):**

> **Elena needed exactly one implant and was in no hurry.** She enrolled in January, used 80% day-one basic coverage all year, and placed the $4,500 implant in month 13: about $2,225 back under the $5,000 cap -- the largest single-year implant payout on the shelf, with no separate implant cap to trim it.

Source: `01-current-state-audit.md`, section 4.6, lines 305-308. No em-dashes in original. Preserved verbatim.

**Accuracy review of "month 13" math:** The current SSOT (2026 product, no waiting period) removes the former 12-month major wait. The story implies Elena waited until month 13 because of a 12-month major wait. With the 2026 product having no major wait, the narrative is technically no longer about clearing a wait -- it is about the year-two major rate stepping up to 50%. The story can stand with a plan prose clarification that the math reflects staging for year-two rates (20% in year one, 50% after year one).
SSOT: `mutual-of-omaha-dental.md`, `waiting_periods: "NONE"`, `coverage_major: "20% in year one, rising to 50% in year two and after"`.

**Also accuracy note on "no separate implant cap":** The SSOT confirms a $3,000 LIFETIME implant maximum for Mutual Dental Preferred (separate from the calendar-year maximum). The story says "no separate implant cap to trim it." This is INACCURATE against the 2026 SSOT. The story must be lightly adjusted.

**Lightly adapted story (minimum change to fix the implant-cap inaccuracy):**

> **Elena needed exactly one implant and was in no hurry.** She enrolled in January, used 80% day-one basic coverage all year, and placed the $4,500 implant in year two, when the major rate stepped up to 50%: about $2,225 back under the $5,000 cap. The $3,000 lifetime implant maximum gave her room to run on a single case.

Changes from original: (a) "month 13" changed to "year two" to remove the implication of a wait (because there is no major waiting period on the 2026 product); (b) "with no separate implant cap to trim it" changed to "The $3,000 lifetime implant maximum gave her room to run on a single case" to accurately reflect the SSOT. All other words preserved. SSOT: `implants: "Separate LIFETIME implant maximum of $3,000 on Mutual Dental Preferred"`.

**Plan prose (new in rebuild):**
"Mutual of Omaha Dental Preferred has two standout features that matter most to older buyers. First, community-rated pricing: the premium is calculated by ZIP code, not by age, so a 65-year-old and a 35-year-old pay the same rate in the same market. Second, no waiting periods on any category: preventive, basic, and major are all covered from day one. The annual maximum is selectable ($1,500, $3,000, or $5,000) -- the premium adjusts to match. CoverCapy features the $5,000 option at roughly $90/mo. Major work pays 20% in year one, rising to 50% after year one. The DenteMax Plus network covers more than 400,000 provider locations nationwide. Orthodontics and whitening are not covered. Activation timing has not been confirmed from a primary source; confirm the effective date with the carrier before enrolling."
SSOT: `mutual-of-omaha-dental.md`, `monthly_premium`, `waiting_periods`, `annual_maximum`, `coverage_major`, `network`, `orthodontics`, `whitening`, `activation: "UNVERIFIED"`.

**Skip it if:**
"Skip it if: you cannot wait 12 months, or you need ortho or whitening -- neither is covered."
Source: audit 4.6. Note: the original skip-it line references "can't wait 12 months." With the 2026 product having no major waiting period, this line should be updated.

**Updated skip-it line:**
"Skip it if: you need orthodontics or whitening (neither covered), or you need to know your exact activation date before enrolling (activation timing is unverified)."
SSOT: `mutual-of-omaha-dental.md`, `orthodontics`, `whitening`, `activation: "UNVERIFIED"`.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$90/mo (estimate, community-rated, $5,000 max option) | `monthly_premium` |
| Annual max | Selectable: $1,500 / $3,000 / $5,000 per calendar year | `annual_maximum` |
| Deductible | $50 (basic and major only; preventive: $0) | `deductible` |
| Preventive | 100%, day one | `coverage_preventive` |
| Basic (fillings) | 80%, day one | `coverage_basic` |
| Major | 20% year one, 50% year two+; no wait | `coverage_major` |
| Implants | Major schedule (20% Y1, 50% Y2+); $3,000 lifetime max (Preferred) | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| Whitening | Not covered | `whitening` |
| Activation | UNVERIFIED -- confirm effective date with carrier | `activation` |
| Network | DenteMax Plus, 400,000+ provider locations | `network` |
| Pricing structure | Community-rated (not age-rated) | `monthly_premium` |
| Underwriter | Mutual of Omaha Insurance Company (NOT TruAssure; TruAssure administers) | `carrier` |

**Conflict flags:**
- "No separate implant cap to trim it" in the original story is WRONG against the 2026 SSOT. The $3,000 lifetime implant maximum is a real cap. Story corrected above. SSOT `do_not`: "The implant cap is a LIFETIME maximum ($3,000 Preferred / $2,000 Protection)...do NOT say it resets annually."
- The 12-month major waiting period that appeared in the 2021 product does NOT apply to the 2026 product. SSOT `do_not`: "The current product has NO waiting period on major work (carrier site, 2026). Do NOT state a 12-month major waiting period." The original skip-it line was written when the 2021 data was in force; updated above.
- TruAssure administers but does NOT underwrite. SSOT `do_not`: "Do NOT state this plan is 'underwritten by TruAssure'."
- Activation is UNVERIFIED. Do not state "next business day" or any specific date for Mutual of Omaha. SSOT `activation: "UNVERIFIED"`.

---

### STOP 7: Humana Extend 5000 (#stop-humana)

**Stop eyebrow:** Stop 07 of 08 -- Implant, vision, and hearing in one plan

**Plan name (H3, Fraunces):** Humana Extend 5000

**Stop price line:**
"~$100/mo (estimate, varies by state, ZIP and effective date)"
SSOT: `humana-extend-5000.md`, `monthly_premium: "~$100/mo (estimate; varies by state, ZIP and effective date)"`.

**The story (preserved verbatim from audit 4.7):**

> **David lost the tooth two years ago -- and that's the whole story.** Before enrolling he asked Humana in writing whether the missing tooth clause applied to his gap. It did, and he chose differently. His neighbor, whose failing tooth was still in place, enrolled, did the workup during the 6-month wait, and had the fastest covered implant path on the shelf: $2,000/year, $4,000 lifetime.

Source: `01-current-state-audit.md`, section 4.7, lines 315-318. No em-dashes in original. Preserved verbatim.

**Plan prose (new in rebuild):**
"Humana Extend 5000 bundles dental, vision, and hearing on a single plan (dental and vision only in New York; TruHearing hearing coverage is included in FL, GA, and other non-NY states). The $5,000 annual maximum is one of the highest on this shelf. Preventive pays 100% from day one; basic pays 80% after a 90-day wait; major and implants pay 50% in year one rising to 60% in year two, both after a 6-month wait. The implant wait cannot be waived, even with prior coverage proof. Implant benefits are capped at $2,000 per year and $4,000 over the life of the policy, and these amounts also count toward the $5,000 annual maximum. There is a $200 whitening allowance (per arch, in-office only, no waiting period; does not count against the deductible or annual maximum). Orthodontics is not covered."
SSOT: `humana-extend-5000.md`, `coverage_preventive`, `coverage_basic: "80% after deductible following a 90-day wait"`, `coverage_major`, `implants`, `whitening`, `orthodontics`, `annual_maximum`.

**Skip it if:**
"Skip it if: the gap predates the policy and Humana confirms the clause applies -- then Mutual of Omaha or Ameritas sequencing serves you better."
Source: audit 4.7. Preserved verbatim.

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$100/mo (estimate) | `monthly_premium` |
| Annual max | $5,000/person/calendar year (all dental combined, including implants) | `annual_maximum` |
| Deductible | $75/person/calendar year (waived for in-network preventive) | `deductible` |
| Preventive | 100% in-network, day one | `coverage_preventive` |
| Basic (fillings) | 80% after 90-day wait | `coverage_basic` |
| Major | 50% year one / 60% year two+ after 6-month wait | `coverage_major` |
| Implants | 50% Y1 / 60% Y2+ after 6-month wait (cannot be waived); $2,000 annual cap, $4,000 lifetime cap; counts toward $5,000 max | `implants` |
| Orthodontics | Not covered | `orthodontics` |
| Whitening | $200 allowance per arch, in-office, no wait; does not count against deductible or annual max | `whitening` |
| Vision | Included (all states) | sourced from brochures |
| Hearing | Included (FL, GA; NOT in NY) | `do_not` (state note) |
| Activation | Active in about 1 week (not stated in brochures; per CoverCapy/Humana enrollment notes) | `activation` |
| Network | Humana Extend PPO, 143,000+ dentists | sourced from brochures |

**Conflict flags:**
- The basic wait is 90 days (per brochures), not "3 months." Use "90-day" in plan prose. SSOT `do_not`: "Do NOT call the basic waiting period '3 months'."
- The implant wait cannot be waived. SSOT `do_not`: "Do NOT omit the implant sub-maximum."
- New York only gets dental + vision (no hearing). SSOT `do_not`: "Do NOT forget this plan bundles VISION (and HEARING, except in New York)."
- Whitening has NO waiting period per brochures. SSOT `do_not`: "Do NOT say whitening has a waiting period."
- Activation timeline ("about 1 week") is from CoverCapy/Humana enrollment notes, not the brochures. Label accordingly. SSOT `activation` note.

---

### STOP 8: Delta Dental PPO Premium (#stop-delta)

**Stop eyebrow:** Stop 08 of 08 -- Largest network / Adult braces

**Plan name (H3, Fraunces):** Delta Dental PPO Premium

**Stop price line:**
"~$75/mo (estimate, varies by state, age and ZIP; available in 16 states + DC as an individual plan)"
SSOT: `delta-dental-ppo-premium.md`, `monthly_premium: "~$75/mo (estimate...)"`, `do_not: "Individual PPO is sold in only 16 states plus DC, not nationwide."`.

**The vignette (lightly adapted from audit 4.8, adds the adult braces angle missing from the original):**

Original from audit 4.8:
> **Delta is the one carrier people ask for by name, because their dentist already takes it.** It runs the largest dental network in the country, covers braces and aligners for adults as well as children, and activates on the 1st or 15th of the month. Because it is so much bigger than the rest of the shelf, it gets its own hub rather than a single stop here.

Preserved verbatim. No em-dashes in original.

**Expanded plan prose for the adult-braces scenario (new content for this rebuild):**

"Delta Dental PPO Premium earns its place on this shelf for two reasons: network size and adult orthodontics. The network is the largest in the country: 112,000-plus dentists at 278,000-plus locations on the PPO network alone. If your current dentist is in-network anywhere on this shelf, Delta is most likely to have them. Adult orthodontics -- braces and clear aligners, including Invisalign -- is covered at 50% with a 12-month wait and a $1,500 lifetime maximum per person. A separate $50 orthodontic deductible applies. No other featured plan on this shelf covers adult braces. For basic work, Delta pays 80% after a 6-month wait. For major work (crowns, root canals), Delta pays 50% after a 12-month wait. The $2,000 annual maximum is shared across all covered services and may feel tight if a crown and an orthodontic installment both fall in the same calendar year. The plan activates on the 1st or 15th of the month. Individual PPO availability is in 16 states plus DC only."
SSOT: `delta-dental-ppo-premium.md`, `network`, `orthodontics`, `coverage_basic`, `coverage_major`, `annual_maximum`, `activation`, `do_not` (availability caveat).

**Skip it if:**
"Skip it if: you are not in one of the 16 states + DC where individual Delta PPO is sold, or if you need implants and the tooth was lost before enrollment (the missing-tooth clause applies to Premium renewals from August 2025, except California)."
SSOT: `delta-dental-ppo-premium.md`, `do_not` (state availability), `implants` (missing-tooth clause).

**Quick Facts panel:**

| Fact | Value | SSOT field |
|------|-------|-----------|
| Monthly premium | ~$75/mo (estimate) | `monthly_premium` |
| Annual max | $2,000/person/calendar year | `annual_maximum` |
| Deductible | $50 individual / $150 family/calendar year; separate $50 ortho deductible | `deductible` |
| Preventive | 100%, day one, deductible waived | `coverage_preventive` |
| Basic (fillings) | 80% after 6-month wait | `coverage_basic` |
| Major | 50% after 12-month wait | `coverage_major` |
| Implants | 50% after 12-month wait; subject to $2,000 shared annual max; missing-tooth clause applies to renewals from Aug 2025 (except CA) | `implants` |
| Adult orthodontics | 50% after 12-month wait; $1,500 lifetime max; $50 ortho deductible; Invisalign same terms | `orthodontics` |
| Child orthodontics | Same: 50% after 12-month wait, $1,500 lifetime max | `orthodontics` |
| Whitening | 80% where included (state-specific; not offered everywhere; CA excludes it) | `whitening` |
| Activation | 1st or 15th of the month (~5 days minimum; varies by affiliate) | `activation` |
| Network | Delta Dental PPO + Premier: 112,000+ dentists, 278,000+ locations (PPO only) | `network` |
| Availability | 16 states + DC (individual plan) | `do_not` |

**Link to Delta hub:**
"Because of Delta's network scale, we give it a dedicated hub: [Delta Dental Plans hub]."
SSOT: audit 4.8 mentions this framing ("gets its own hub rather than a single stop here").

**Conflict flags:**
- Whitening: older copy says "~25-50%." SSOT corrects this to 80% where available (cosmetic, state-specific). Plan prose and Quick Facts must use 80% where included, with a clear note that it is state-specific and not offered everywhere (e.g., excluded in CA). SSOT `do_not`: "Do NOT state a single national premium. Do NOT call whitening a standard covered benefit."
- Missing-tooth clause on implants applies to Premium renewals from August 2025, except California. SSOT `implants` field and `do_not`.
- Adult ortho is specific to the broker-sold Premium tier. ACA-exchange certificates cover ortho only when medically necessary and for children only. Do not conflate tiers.
- Deductible note: Delta Dental of WA Premium uses $100 deductible, not $50. Flag state variation if building state-targeted rendering.

**CTA inside card:**
```
[ Full Delta Dental hub ]   [ Verify my dentist ]
```

---

## S3 -- VERIFY CTA BAND (first instance) {#s3-verify-band-1}

### Heading (Fraunces, large):
```
The step everyone skips.
We will not let you.
```

### Purpose
Highest-priority conversion interrupt between plan stories and the comparison table. The step: verify that your dentist accepts the plan before enrolling.

### Copy approach
Authoritative, not pushy. One short paragraph. Then an inline search entry point.

**Body text:**
"Most people pick a plan, enroll, and then call their dentist -- and learn the dentist left that network two years ago. Verify first, enroll second. It takes about two minutes and costs nothing."

**Inline search bar:**
Placeholder: "Enter your dentist's name or city"
On submit: routes to `/find-my-dentist?q=` with the input value.

**Secondary CTA:**
"Or browse 6,400-plus verified PPO offices: [Find my dentist]"

### Word count guidance
Body: 40-60 words. Total band: under 80 words.

---

## S4 -- COMPARISON TABLE {#s4-comparison-table}

### Heading
H2 (Fraunces):
```
Eight PPO plans compared
```

### Purpose
SEO entity coverage; GEO citation target (AI systems frequently surface comparison tables). Structured `ItemList` schema. Horizontally scrollable.

### Copy approach
Spare. Table caption carries the editorial voice; cells carry only facts, labeled estimates, and Y/N indicators.

**Table caption:**
"Eight PPO dental plans compared. Premiums are CoverCapy estimates and vary by state, age and ZIP. Verified June 2026."

**Columns (in order):**
Plan name | Monthly (est.) | Annual max | Deductible | Preventive | Basic | Major | Implants | Ortho | Waiting periods (major) | Best for

**"Best for" column labels (one label per plan):**
| Plan | Best for label |
|------|---------------|
| UHC Primary Dental | Maintenance |
| Aetna Dental Direct | Waiver play + CVS |
| Ameritas PrimeStar | No waits |
| Guardian Premier 2.0 | Kids braces |
| MetLife NCD Complete | High ceiling |
| Mutual of Omaha | Seniors, no-wait major |
| Humana Extend 5000 | Implant + vision/hearing |
| Delta Dental PPO | Largest network, adult braces |

**All cells must be SSOT-verified before build.** See plan-by-plan SSOT citations in Section S2 and Conflicts log below.

### Section CTA
Below table:
```
[ Compare plans interactively ]  -- links to /compare-ppo-dental-plans
[ Find a dentist who takes your plan ]  -- links to /find-my-dentist
```

### Word count guidance
Caption: 25 words. Table cell values: facts only, no prose.

---

## S5 -- BEST FOR SCENARIOS GRID {#s5-best-for-grid}

### Heading
H2 (Fraunces):
```
Which plan is best for your need?
```

### Purpose
SEO for "best PPO dental plan for [need]" queries. GEO answer surface. Retention: visitors bookmark this as a reference.

### Copy approach
One plan name, one sentence, one key fact per scenario card. No padding. Eight cards (individual mode), four cards (family mode toggle).

**Individual mode -- 8 scenario cards:**

| Scenario card heading | Plan name | One-sentence reason | Key fact (SSOT) |
|----------------------|-----------|--------------------|--------------------|
| Best for cleanings + checkups | UHC Primary Dental | Lowest premium on the shelf. | ~$30/mo est.; `monthly_premium` |
| Best for job-changers (within 90 days) | Aetna Dental Direct | Both waiting periods disappear with proof of prior coverage. | Waiver: 90-day window; `waiting_periods` |
| Best when work is needed right now | Ameritas PrimeStar | No waiting periods on any category. | Day-one major; `waiting_periods` |
| Best for kids' braces | Guardian Premier 2.0 | The only plan here with child orthodontics at 60% in-network. | $1,500 lifetime max; `orthodontics` |
| Best for adult braces | Delta Dental PPO Premium | The only plan here that covers adult orthodontics and Invisalign. | 50%, $1,500 lifetime max; `orthodontics` |
| Best for seniors / 65+ | Mutual of Omaha Dental Preferred | Community-rated pricing; no age penalty; no major wait. | Selectable up to $5,000; `monthly_premium`, `waiting_periods` |
| Best for a big implant case | MetLife NCD Complete | $10,000 annual ceiling; $3,000 annual implant max; no wait. | $3,000 implant annual max; `implants`, `annual_maximum` |
| Best for the largest network | Delta Dental PPO Premium | 112,000+ dentists at 278,000+ locations, PPO network. | `network` |

**Family mode -- 4 scenario cards (toggled):**
See Section S6 for these cards; they overlap with the family section.

### Word count guidance
Each card: heading (4-6 words), plan name, one sentence (under 20 words), key fact pill. Total grid: 300-400 words including headings.

---

## S6 -- FAMILY SECTION {#s6-family}

### Heading
H2 (Fraunces):
```
Planning for more than just yourself
```

### Purpose
Conversion for family buyers. SEO for "family dental insurance PPO" queries. Surfaces family economics (deductibles, per-person maximums, household scenario stacking) per 00-INDEX goal.

### Lede (Inter Tight, 17px):
"Individual PPO plans on this shelf can be stacked for a household. Two individual policies -- one per adult -- often give a family more per-person ceiling than a single family plan. Here is what the most common household combinations look like."

### Copy approach
Practical, numbers-forward. Four scenario cards, each with a household portrait, a plan pairing, and the key economic logic. Voice: the friend who has already done the math for you.

**Disclaimer note (must appear above or within cards):**
"Family deductible structures and maximum caps vary by carrier. These combinations are for illustration only. Verify all terms with the carrier before enrolling."

---

**Family Card 1: Kids braces + parent maintenance**

Heading: "Your 13-year-old needs braces. You just need cleanings."

Plan pairing: Guardian Premier 2.0 (child's plan) + UHC Primary Dental (parent's individual plan)

Story:
"Guardian waits 12 months before covering orthodontics -- so enroll now, before the orthodontist starts. At 60% in-network up to $1,500 lifetime, the plan pays a meaningful portion of a $5,000 to $8,000 braces case. Meanwhile, a separate UHC Primary Dental policy keeps your own cleanings at 100% for about $30 a month."

Key facts from SSOT:
- Guardian orthodontics: 60% in-network, $1,500 lifetime max, 12-month wait, dependents under 19. `guardian-premier-ppo.md`, `orthodontics`.
- UHC preventive: 100% in-network, day one. `uhc-primary-dental.md`, `coverage_preventive`.
- UHC premium: ~$30/mo. `uhc-primary-dental.md`, `monthly_premium`.
- Guardian premium: ~$70/mo. `guardian-premier-ppo.md`, `monthly_premium`.
- Caveat: Guardian's 12-month re-enrollment lockout means this should not be a plan the parent also relies on for near-term major work. `guardian-premier-ppo.md`, `activation`.

---

**Family Card 2: One adult with an implant coming, partner needs maintenance**

Heading: "You have an implant appointment in six months. Your partner just needs their teeth cleaned."

Plan pairing: Humana Extend 5000 (implant adult) + Ameritas PrimeStar (partner, if no major wait needed) or UHC Primary Dental (partner, preventive only)

Story:
"Humana opens implant coverage after a 6-month wait at 50%, rising to 60% in year two -- plan the workup now, time the placement at month seven or later. Your partner's cleanings and any basic work can be covered on a separate Ameritas plan with no waiting periods, or on UHC Primary Dental if only preventive coverage is needed. Two separate policies mean two independent $5,000 ceilings."

Key facts from SSOT:
- Humana implants: 50% year one / 60% year two after 6-month wait (cannot be waived); $2,000 annual / $4,000 lifetime implant caps; counts toward $5,000 annual max. `humana-extend-5000.md`, `implants`.
- Humana premium: ~$100/mo. `humana-extend-5000.md`, `monthly_premium`.
- Ameritas major: no wait, day one, 20% year one. `ameritas-primestar.md`, `waiting_periods`, `coverage_major`.
- UHC premium: ~$30/mo. `uhc-primary-dental.md`, `monthly_premium`.
- Caveat: Humana implant wait CANNOT be waived. `humana-extend-5000.md`, `waiting_periods`. Missing-tooth clause: if the tooth was already missing before enrollment, confirm with Humana whether the clause applies. `humana-extend-5000.md` story note.

---

**Family Card 3: Two CVS shoppers who just left jobs with dental**

Heading: "You and your partner both just left jobs with dental. You both shop at CVS."

Plan pairing: Aetna Dental Direct (both adults, each individual policy)

Story:
"Enroll both adults within 90 days of losing employer coverage, and Aetna waives both the 6-month basic wait and the 12-month major wait for each policy. Two individual policies mean two separate $1,250 annual maximums and two sets of CVS ExtraCare Plus perks: up to $120 a year in CVS rewards per enrolled adult. The $150 family deductible cap means once three individual deductibles are met in a household, the family pays no more deductible for the rest of the calendar year."

Key facts from SSOT:
- Aetna waiting period waiver: both waits waived if all enrolled family members had dental coverage within past 90 days. `aetna-dental-direct.md`, `waiting_periods`.
- Aetna annual max: $1,250/person/calendar year. `aetna-dental-direct.md`, `annual_maximum`.
- Aetna family deductible: $50 individual, $150 family/calendar year. `aetna-dental-direct.md`, `deductible`.
- Aetna CVS ExtraCare Plus: up to $120/yr per enrolled adult (not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA). `aetna-dental-direct.md`, `cvs_extracare_plus`.
- Caveat: implants and orthodontics not covered on any Aetna Dental Direct tier. `aetna-dental-direct.md`, `implants`, `orthodontics`.

---

**Family Card 4: Two adults expecting a heavy dental year**

Heading: "Both of you have big work coming. You want a high ceiling for each person."

Plan pairing: Mutual of Omaha Dental Preferred at $5,000 maximum (both adults)

Story:
"Two individual Mutual of Omaha policies at the $5,000 maximum give the household $10,000 in combined annual dental coverage -- two independent ceilings that do not share a family cap. No waiting periods on major work for either policy. The 80% day-one basic rate means fillings are covered well from the first month. Major work (crowns, root canals) pays 20% in year one, stepping up to 50% in year two."

Key facts from SSOT:
- Mutual of Omaha annual max: selectable up to $5,000/person/calendar year. `mutual-of-omaha-dental.md`, `annual_maximum`.
- Mutual of Omaha premium: ~$90/mo per enrolled adult at $5,000 max. `mutual-of-omaha-dental.md`, `monthly_premium`.
- Mutual of Omaha waiting periods: NONE. `mutual-of-omaha-dental.md`, `waiting_periods`.
- Mutual of Omaha basic: 80% from day one. `mutual-of-omaha-dental.md`, `coverage_basic`.
- Mutual of Omaha major: 20% year one, 50% year two+. `mutual-of-omaha-dental.md`, `coverage_major`.
- Caveat: activation timing is UNVERIFIED; confirm effective date with carrier before enrolling. `mutual-of-omaha-dental.md`, `activation`.
- Caveat: each policy has a $3,000 lifetime implant maximum (Preferred). `mutual-of-omaha-dental.md`, `implants`.

### Word count guidance
Lede: 40-50 words. Each family card story: 60-90 words. Disclaimer: 20-25 words. Total family section: 350-500 words.

---

## S7 -- GEO ANSWER BLOCKS {#s7-geo-blocks}

### Purpose
Engineered for AI citation (ChatGPT, Perplexity, Claude). Each block answers a specific natural-language question with a concise, citable, SSOT-verified answer. Positioned throughout the center column at high-probability citation points.

### Copy approach
Plain declarative sentences. No hedging that makes the answer uncitable. Each block under 80 words. Lead with the direct answer, then add the key qualifier.

### GEO Block G1 -- "What is the cheapest PPO dental plan?"

**Placement:** Inside or immediately after UHC plan story card.

**Block heading (small, styled as a question):**
"What is the cheapest PPO dental insurance plan?"

**Answer:**
"UHC Primary Dental by Golden Rule Insurance Company (a UnitedHealthcare company) is the lowest-premium featured PPO plan on CoverCapy, estimated at about $30 a month for adults 18 to 64. It covers preventive care at 100% from day one and basic work (fillings) starting at 50% from day one. It does not cover major work, implants, or orthodontics. Not available in New York."

SSOT citations: `uhc-primary-dental.md`, `monthly_premium`, `coverage_preventive`, `coverage_basic`, `coverage_major`, `not_in_ny`.

---

### GEO Block G2 -- "Which dental plan covers adult braces?"

**Placement:** Inside or immediately after Delta Dental plan story card.

**Block heading:**
"Which PPO dental plan covers adult braces?"

**Answer:**
"Delta Dental PPO Premium is the only featured individual PPO plan on CoverCapy that covers adult orthodontics (braces and Invisalign). Coverage is at 50% after a 12-month waiting period, with a $1,500 lifetime maximum per person and a separate $50 orthodontic deductible. The plan is available as an individual policy in 16 states plus DC."

SSOT citations: `delta-dental-ppo-premium.md`, `orthodontics`, `annual_maximum`, `do_not` (16 states + DC).

---

### GEO Block G3 -- "Best dental insurance for seniors over 65"

**Placement:** Inside or immediately after Mutual of Omaha plan story card.

**Block heading:**
"What is the best PPO dental plan for seniors over 65?"

**Answer:**
"Mutual of Omaha Dental Preferred is the strongest option for seniors and Medicare-adjacent buyers among the featured plans on CoverCapy. It is community-rated: the premium does not increase with age and is set by ZIP code. It has no waiting periods on major work. The annual maximum is selectable up to $5,000, and implants are covered under the major schedule with a separate $3,000 lifetime maximum."

SSOT citations: `mutual-of-omaha-dental.md`, `monthly_premium` (community-rated), `waiting_periods`, `annual_maximum`, `implants`.
Note: do not claim UHC is available for this scenario (age cap 18 to 64). `uhc-primary-dental.md`, `not_in_ny` and age-band note.

---

### GEO Block G4 -- "Which dental plan has no waiting period?"

**Placement:** Inside or immediately after Ameritas plan story card.

**Block heading:**
"Which PPO dental plan has no waiting period?"

**Answer:**
"Ameritas PrimeStar Care Complete has no waiting periods on any category: preventive, basic, major, and implants are all available from day one. Coverage can begin as soon as the next day after enrollment. Pricing is age-neutral (set by ZIP, not by age). The plan is not available in Massachusetts."

SSOT citations: `ameritas-primestar.md`, `waiting_periods`, `activation`, `monthly_premium`, `sources` (GR 7708 3-26, not in MA).

---

### GEO Block G5 -- "Does dental insurance cover implants?"

**Placement:** In the comparison table section or the best-for grid, as an expandable block.

**Block heading:**
"Does dental insurance cover implants?"

**Answer:**
"Several PPO plans on CoverCapy cover implants. Ameritas PrimeStar and Mutual of Omaha cover implants from day one (no waiting period). Humana Extend 5000 covers implants after a 6-month wait (this wait cannot be waived). MetLife NCD Complete covers implants under its major schedule from day one with a $3,000 annual implant maximum. Aetna Dental Direct explicitly excludes implants. Always verify with the carrier whether a missing-tooth clause applies if the tooth was lost before enrollment."

SSOT citations:
- Ameritas: `ameritas-primestar.md`, `implants`, `waiting_periods`.
- Mutual of Omaha: `mutual-of-omaha-dental.md`, `implants`, `waiting_periods`.
- Humana: `humana-extend-5000.md`, `implants`, `waiting_periods: "implants 6-month wait (cannot be waived)"`.
- MetLife: `metlife-ncd-complete.md`, `implants`.
- Aetna: `aetna-dental-direct.md`, `implants: "Not covered"`.

---

### GEO Block G6 -- "What does the Aetna dental CVS perk include?"

**Placement:** Inside or below the Aetna plan story card (pairs with Right Rail Block R2).

**Block heading:**
"What does the CVS ExtraCare Plus perk on Aetna Dental Direct include?"

**Answer:**
"Aetna Dental Direct is part of the CVS Health family of companies. Enrolled members on the Direct Preferred and Core tiers receive CVS ExtraCare Plus membership free: up to $10 a month in CVS bonus rewards (up to $120 a year), 20% off CVS Health brand products (non-sale items), and free shipping on qualifying CVS.com orders. The perk requires one-time registration. It is not available in Georgia, Louisiana, Minnesota, Missouri, New York, New Jersey, Oklahoma, Texas, or Virginia."

SSOT citations: `aetna-dental-direct.md`, `cvs_extracare_plus`, `cvs_relationship`.
Do NOT claim the $10 monthly reward rolls over. Do NOT mention a 24/7 pharmacist helpline (medical plan version only). Do NOT claim the 20% off applies online without qualification (ambiguous per SSOT `do_not`).

---

### Word count guidance
Each GEO block: question heading (under 12 words), answer (50-80 words). Total GEO blocks: 350-500 words. All six blocks can be styled as collapsible `<details>` elements with open state on page load for the highest-priority queries (G1, G3, G4).

---

## S8 -- WAITING PERIODS EXPLAINER {#s8-waiting-periods}

### Heading
H2 (Fraunces):
```
The clock is the product
```

### Purpose
Education and trust. Reduces post-enrollment surprise. Aligns with the concierge voice: your friend who tells you the thing the brochure buries. Strong GEO answer surface for "dental insurance waiting period" queries.

### Copy approach
Honest, direct, slightly sardonic (in the best CoverCapy way). Two or three paragraphs, then a visual timeline diagram.

### Body text (preserve existing "clock is the product" editorial from the current hub; update for 8 plans)

**Paragraph 1:**
"A waiting period is the gap between when your policy starts and when a category of work becomes covered. Preventive care on almost every featured plan pays 100% from day one. Basic work (fillings) typically waits 6 months. Major work (crowns, root canals, bridges) typically waits 12 months. The two exceptions on this shelf: Ameritas PrimeStar and Mutual of Omaha, which both have no waiting periods on any category."

SSOT citations:
- Ameritas: `ameritas-primestar.md`, `waiting_periods: "None on any category"`.
- Mutual of Omaha: `mutual-of-omaha-dental.md`, `waiting_periods: "NONE"`.
- MetLife: `metlife-ncd-complete.md`, `waiting_periods: "None on preventive, basic or major"`.
- Aetna: `aetna-dental-direct.md`, `waiting_periods: "Basic 6-month wait, Major 12-month wait. Both waits waived if all enrolled family members had dental coverage within the past 90 days"`.
- Guardian: `guardian-premier-ppo.md`, `waiting_periods: "None on preventive or basic (both pay from day one); 12 months on major, implants and child orthodontics"`.
- Humana: `humana-extend-5000.md`, `waiting_periods: "basic 90-day wait; major 6-month wait; implants 6-month wait (cannot be waived)"`.
- Delta: `delta-dental-ppo-premium.md`, `waiting_periods: "None on preventive; 6 months on basic; 12 months on major and orthodontics"`.
- UHC: `uhc-primary-dental.md`, `waiting_periods: "None on preventive or basic. Major is not covered at all on this tier"`.

**Paragraph 2:**
"The waiver matters. Aetna Dental Direct, Delta Dental PPO Premium, and several others will waive their waiting periods if you have had continuous dental coverage without more than a short gap -- usually 63 to 90 days, depending on the plan. If you just lost employer dental and enroll within 90 days, Aetna's 6-month basic wait and 12-month major wait both disappear. Delta's major wait can be waived with prior comparable major coverage and no more than a 63-day gap."

SSOT citations:
- Aetna waiver: `aetna-dental-direct.md`, `waiting_periods: "Both waits waived if all enrolled family members had dental coverage within the past 90 days of enrollment"`.
- Delta waiver: `delta-dental-ppo-premium.md`, `waiting_periods: "Major/implant/ortho waits can be waived with proof of prior comparable major coverage, no more than a 63-day gap"`.

**Paragraph 3:**
"Some waits cannot be waived. Humana Extend 5000's 6-month implant wait is a firm rule: no amount of prior coverage removes it. Guardian Premier 2.0's 12-month wait on major work and orthodontics has state exceptions (Washington at 6 months, Minnesota at 9 months) but is otherwise not waivable. Plan the timing of any major case before enrolling."

SSOT citations:
- Humana: `humana-extend-5000.md`, `waiting_periods: "implants 6-month wait (cannot be waived)"`.
- Guardian: `guardian-premier-ppo.md`, `waiting_periods: "State exceptions: Washington capped at 6 months, Minnesota capped at 9 months. Major wait waivable with proof of prior comparable coverage"`.

### Visual timeline diagram
HTML/CSS horizontal bar chart showing when each category of coverage opens per plan. No JavaScript dependency. SSOT-verified months:

| Plan | Preventive | Basic | Major |
|------|-----------|-------|-------|
| UHC | Month 1 | Month 1 | Not covered |
| Aetna | Month 1 | Month 7 (or waived to Month 1) | Month 13 (or waived to Month 1) |
| Ameritas | Month 1 | Month 1 | Month 1 |
| Guardian | Month 1 | Month 1 | Month 13 |
| MetLife | Month 1 | Month 1 | Month 1 |
| Mutual of Omaha | Month 1 | Month 1 | Month 1 |
| Humana | Month 1 | Month 4 (90-day wait) | Month 7 |
| Delta | Month 1 | Month 7 | Month 13 |

All values verified against SSOT `waiting_periods` fields.

### Word count guidance
Three paragraphs: 60-80 words each. Timeline diagram is visual; alt-text table adds another 80-100 words. Total: 300-400 words.

---

## S9 -- VERIFY CTA BAND (second instance) {#s9-verify-band-2}

Same component as S3. Placed after FAQ to catch late-funnel readers.

**Variation in body text (shorter):**
"You have done the research. One step before you enroll: make sure your dentist is in the network."

**Inline search bar** (same as S3).

### Word count guidance
Under 40 words.

---

## S10 -- FAQ {#s10-faq}

### Heading
H2 (Fraunces):
```
Frequently asked questions
```

### Purpose
FAQPage schema for SEO. GEO citation surface. Clears purchase objections. Current FAQ is strong; rebuild extends with two new questions and removes em-dashes.

### Copy approach
Question: short, real (how a person actually types it). Answer: 40-80 words, direct, no hedging. Cite the SSOT silently (the answer must be traceable; do not print SSOT field names on the live page).

### FAQ questions and answers (10 total; 8 retained from current hub, 2 new)

**Q1 (retained): What is a PPO dental plan?**
Answer: "A PPO (preferred provider organization) dental plan lets you see any licensed dentist. When you use a dentist in the plan's network, you pay a lower co-insurance rate and file no claim yourself -- the dentist bills the plan directly. When you see an out-of-network dentist, you pay more and may need to file a reimbursement claim. Most individual dental plans on CoverCapy are PPO plans."

**Q2 (retained): What is an annual maximum?**
Answer: "The annual maximum is the most a dental insurance plan pays toward your dental care in a calendar year. After that point, you pay 100% out of pocket until the new year begins. On CoverCapy's featured plans, annual maximums range from $1,000 (UHC Primary Dental) to $10,000 (MetLife NCD Complete). Preventive care on most plans does not count against the annual maximum."

SSOT: `uhc-primary-dental.md`, `annual_maximum`; `metlife-ncd-complete.md`, `annual_maximum`; `uhc-primary-dental.md`, `coverage_preventive`; `ameritas-primestar.md`, `annual_maximum` (preventive excluded).

**Q3 (retained): How do waiting periods work?**
Answer: "A waiting period is the time you must be enrolled in a plan before a category of dental work becomes covered. For example, many plans require a 6-month wait before covering fillings and a 12-month wait before covering crowns. Two featured plans on CoverCapy -- Ameritas PrimeStar and Mutual of Omaha Dental Preferred -- have no waiting periods on any category. Some plans waive waiting periods if you have had recent prior dental coverage."

SSOT: `ameritas-primestar.md`, `waiting_periods`; `mutual-of-omaha-dental.md`, `waiting_periods`; `aetna-dental-direct.md`, `waiting_periods` (waiver).

**Q4 (retained): Can I use any dentist?**
Answer: "With a PPO plan, yes -- you can use any licensed dentist, though in-network dentists cost less. The plan pays a higher percentage for in-network visits and a lower percentage for out-of-network visits. Network size varies: Mutual of Omaha's DenteMax Plus covers 400,000-plus provider locations; Delta Dental's PPO network covers 112,000-plus dentists at 278,000-plus locations. CoverCapy's dentist search at /find-my-dentist shows which plans your dentist accepts."

SSOT: `mutual-of-omaha-dental.md`, `network`; `delta-dental-ppo-premium.md`, `network`.

**Q5 (retained): Is there a waiting period for preventive care?**
Answer: "No. Every featured plan on CoverCapy covers preventive care -- cleanings, exams, and basic X-rays -- at 100% from day one with no deductible and no waiting period. Preventive care also does not count against the annual maximum on most plans."

SSOT: all 8 SSOT files, `coverage_preventive`.

**Q6 (retained): What is a deductible?**
Answer: "The deductible is the amount you pay out of pocket before the plan starts paying. Most featured plans carry a $50 deductible per person per calendar year, applying to basic and major work only (not preventive care). MetLife NCD Complete has a $100 lifetime deductible: you pay it once, in your first year, and never again. Aetna Dental Direct caps the family deductible at $150 per calendar year."

SSOT: `metlife-ncd-complete.md`, `deductible: "$100 lifetime"`; `aetna-dental-direct.md`, `deductible: "$50 individual, $150 family per CALENDAR YEAR"`.

**Q7 (retained): Are implants covered by PPO dental plans?**
Answer: "Some are, some are not. Aetna Dental Direct explicitly excludes implants. UHC Primary Dental does not cover major work including implants. Ameritas PrimeStar and Mutual of Omaha cover implants from day one. Humana Extend 5000 covers implants after a 6-month wait that cannot be waived. MetLife NCD Complete covers implants under its major schedule with a $3,000 annual cap within the $10,000 maximum."

SSOT: `aetna-dental-direct.md`, `implants`; `uhc-primary-dental.md`, `implants`; `ameritas-primestar.md`, `implants`; `mutual-of-omaha-dental.md`, `implants`; `humana-extend-5000.md`, `implants`; `metlife-ncd-complete.md`, `implants`.

**Q8 (retained): Can I cancel my dental plan if my new job starts?**
Answer: "Policies vary by carrier. Most PPO plans on this shelf do not lock you in beyond the current billing period. The important exception: Guardian Premier 2.0 requires a 12-month minimum enrollment and imposes a 12-month re-enrollment lockout after cancellation. If you are buying a plan as a bridge between jobs, avoid Guardian for that purpose. Confirm cancellation terms with the carrier before enrolling."

SSOT: `guardian-premier-ppo.md`, `activation: "Minimum 12-month enrollment commitment; 12-month re-enrollment lockout applies after cancellation"`.

**Q9 (NEW): Is dental insurance worth it for a family?**
Answer: "For families where at least one person expects major dental work, cleanings for multiple children, or orthodontics, dental insurance almost always saves money compared to paying full price. The math is strongest when a plan's waiting periods align with the timing of the work. For a family with a child approaching orthodontic treatment, enrolling in Guardian Premier 2.0 a year before treatment begins can offset a meaningful portion of a $5,000 to $8,000 braces case."

SSOT: `guardian-premier-ppo.md`, `orthodontics`; general framing sourced from scenario math in `08-plan-fit-by-scenario.md`.

**Q10 (NEW): Which PPO dental plan is best for seniors over 65?**
Answer: "Mutual of Omaha Dental Preferred is the strongest option for seniors and Medicare-adjacent buyers. It is community-rated: your premium does not increase because of your age. There are no waiting periods on major work. The annual maximum is selectable up to $5,000. Implants are covered under the major schedule with a $3,000 lifetime maximum. Note: UHC Primary Dental is not available to adults 65 and older. Ameritas PrimeStar is also strong for older buyers because pricing is age-neutral."

SSOT: `mutual-of-omaha-dental.md`, `monthly_premium` (community-rated), `waiting_periods`, `annual_maximum`, `implants`; `uhc-primary-dental.md`, age cap note in `monthly_premium`; `ameritas-primestar.md`, `monthly_premium` (age-neutral).

### Word count guidance
Each answer: 40-80 words. Total FAQ: 500-650 words.

---

## S11 -- EDITORIAL FOOTER AND RELATED LINKS {#s11-editorial-footer}

### Editorial trust block

**Copy:**
"CoverCapy is an independent dental marketplace. We are not an insurer and we do not sell dental plans directly. All plan facts on this page are sourced from verified carrier brochures and official carrier websites; see our data plans documentation for source citations. Premiums are estimates that vary by state, age and ZIP code and are not a guarantee of price. Last verified: June 2026."

### Related links (extended from current hub)

Internal links to add in rebuild:
- PPO Plans for Seniors
- Family Dental Insurance Guide
- Delta Dental Hub (/dental-insurance/delta-dental/)
- Dental Treatment Cost Estimator
- Compare PPO Plans (/compare-ppo-dental-plans)
- Find PPO Dentists (/find-my-dentist)
- No Waiting Period Guide (/guides/no-waiting-period/)
- Dental Insurance Between Jobs (/guides/between-jobs/)
- Dental Implants Insurance Guide (/guides/implants/)

### Word count guidance
Editorial block: 60-80 words. Related links: labels only.

---

## LR -- LEFT RAIL CONTENT {#lr-left-rail}

### Block L1: Scenario Nav (sticky)
Label: "YOUR SITUATION" (12px, uppercase, `--gold-deep`)
Eight chips matching S1 scenario finder:

| Chip | Scroll target |
|------|--------------|
| I just need cleanings | #stop-uhc |
| A crown is coming | #stop-ameritas |
| Big work, no wait | #stop-ameritas |
| Braces for my kid | #stop-guardian |
| Left a job with dental | #stop-aetna |
| One implant ahead | #stop-humana or #stop-moo |
| Heavy year of work | #stop-moo or #stop-metlife |
| Largest network | #stop-delta |

### Block L2: Jump Links
Label: "ON THIS PAGE"
Anchors: Who is this for, The scenario finder, Plan stories (all 8), Compare the shelf, Best for your need, How waiting periods work, Verify your dentist, FAQ.

### Block L3: Coverage Type Filter
Four pill toggles: Preventive only, Basic + major, Implants, Ortho / braces.

### Block L4: Plan Finder Shortcut (not sticky)
"Not sure where to start? Answer 3 questions and we match you to a plan."
Button: "Open Plan Finder" (scrolls to #scenario-finder).

### Word count guidance
Labels only. Total rail copy: under 100 words.

---

## RR -- RIGHT RAIL CONTENT {#rr-right-rail}

### Block R1: Dentist Verify CTA (sticky)
Eyebrow: "STEP 1 BEFORE YOU BUY"
Headline: "Does your dentist take this plan?"
Body: "We verify it free, before any money moves."
Button: "Find my dentist" (links to /find-my-dentist)
Subtext: "6,400-plus verified PPO offices"

### Block R2: Aetna + CVS ExtraCare Spotlight
Eyebrow: "CVS HEALTH PERK"
Headline: "Aetna members get up to $120/year in CVS rewards"
Body: "Plus 20% off CVS Health brand products and free CVS.com shipping. Included on the Preferred and Core tiers. Registration required."
Link: "See the full Aetna plan review"
Note: Not available in GA, LA, MN, MO, NY, NJ, OK, TX or VA.
SSOT: `aetna-dental-direct.md`, `cvs_extracare_plus`.

### Block R3: Capy Rewards Teaser
Eyebrow: "CAPY REWARDS"
Headline: "Earn Capy points when you verify and enroll through CoverCapy"
Body: "Points unlock discounts with accredited providers. Free to join."
CTA link: "See how Capy Rewards work"
Note: soft teaser only; no fabricated point values until rewards program is live.

### Block R4: Family Builder Shortcut
Label: "PLANNING FOR A FAMILY?"
Teaser: "Guardian for braces. Aetna for CVS. Humana for implants. Three plans, one household."
CTA: "Open the family scenario finder" (scrolls to family section).

### Block R5: Share + Save
Label: "SHARE THIS GUIDE"
Row: Copy link, Email, Text
Below: "Bookmark for later" (uses navigator.share if available; fallback to copy link).

### Word count guidance
Rail labels and teasers: under 150 words total.

---

## CONFLICTS AND RECONCILIATION LOG {#conflicts}

This log records every place where the existing hub copy (sourced from `01-current-state-audit.md`) conflicts with SSOT facts (from `data/plans/*.md`). The SSOT always wins after re-verification. Each entry is actionable.

---

**CONFLICT 1: Aetna basic waiting period described as "3-month" in existing story**

Existing: Priya's story says she "waived the 3-month and 12-month waiting periods."
SSOT: `aetna-dental-direct.md`, `waiting_periods: "Basic 6-month wait, Major 12-month wait"`.
Resolution: Story is preserved as a vignette (Priya's waiver was real). Plan prose and Quick Facts must state the default 6-month basic wait. Add a footnote to the card: "The standard basic wait is 6 months; Priya's was waived because she enrolled within 90 days of losing employer coverage."
Do NOT change the story text. Change only surrounding prose and Quick Facts.

---

**CONFLICT 2: Aetna annual maximum described as "~$1,500" in older hub copy**

Existing: Some hub and compare-page copy uses "$1,500" for Aetna's annual max.
SSOT: `aetna-dental-direct.md`, `annual_maximum: "$1,250 per person per calendar year"`.
SSOT `do_not`: "Do NOT prefix the $1,250 annual maximum with a tilde (~) or call it an estimate. It is an EXACT brochure-confirmed figure."
Resolution: All plan prose and Quick Facts must say exactly $1,250 (no tilde). Compare table must be corrected from $1,500 to $1,250.

---

**CONFLICT 3: Guardian major/implant coverage stated as flat "50%" in compare table and plans-data JSON**

Existing: compare-ppo-dental-plans.html and plans-data JSON show Guardian major at 50%.
SSOT: `guardian-premier-ppo.md`, `coverage_major: "60% in-network (50% out-of-network) after a 12-month wait"`.
SSOT `do_not`: "Do NOT state major/implants pay a flat 50%. RESOLVED 2026-06-26...major work pays 60% IN-NETWORK and 50% OUT-OF-NETWORK."
Resolution: All plan prose, Quick Facts, and the comparison table must say 60% in-network (50% out-of-network). The plan story can remain ("50% of a $6,000 case") as a vignette without specifying network -- add a footnote: "60% in-network / 50% out-of-network."

---

**CONFLICT 4: Guardian whitening described as a "$500/yr allowance"**

Existing: hub and plan-page copy uses "allowance" framing.
SSOT: `guardian-premier-ppo.md`, `whitening: "50% coinsurance (in AND out of network) after a separate $50 whitening deductible, capped at $500 per benefit year"`.
SSOT `do_not`: "Do NOT describe whitening as a flat $500/yr allowance. It is 50% coinsurance...capped at $500/yr."
Resolution: All copy must say "50% up to $500 per benefit year, after a $50 whitening deductible." Remove "allowance."

---

**CONFLICT 5: Mutual of Omaha story says "no separate implant cap to trim it"**

Existing: original story for Elena (audit 4.6) ends with "with no separate implant cap to trim it."
SSOT: `mutual-of-omaha-dental.md`, `implants: "Separate LIFETIME implant maximum of $3,000 on Mutual Dental Preferred"`.
SSOT `do_not`: "The implant cap is a LIFETIME maximum ($3,000 Preferred)...do NOT say it resets annually."
Resolution: Story lightly adapted (minimum words changed). See Stop 6 above for corrected text. The $3,000 lifetime implant maximum must be stated clearly.

---

**CONFLICT 6: Mutual of Omaha skip-it line references a 12-month major wait that no longer exists**

Existing: skip-it line from audit says "you can't wait 12 months."
SSOT: `mutual-of-omaha-dental.md`, `waiting_periods: "NONE"`.
Context: The 2021 product had a 12-month major wait. The 2026 product removes it. SSOT `do_not`: "The current product has NO waiting period on major work. Do NOT state a 12-month major waiting period."
Resolution: Skip-it line updated (see Stop 6 above). No reference to a 12-month major wait on MOO.

---

**CONFLICT 7: Humana whitening described with a 3-month wait in some earlier copies**

Existing: earlier hub files and brochure notes incorrectly stated a 3-month whitening wait on Humana.
SSOT: `humana-extend-5000.md`, `whitening: "$200 allowance for in-office external bleaching, per arch, with no waiting period"`.
SSOT `do_not`: "Do NOT say whitening has a waiting period...teeth whitening has NO waiting period."
Resolution: All Humana plan prose and Quick Facts say "no waiting period" on whitening.

---

**CONFLICT 8: Humana basic wait described as "3 months" in compare table**

Existing: compare-ppo-dental-plans.html says "three-month wait" for Humana basic.
SSOT: `humana-extend-5000.md`, `waiting_periods: "basic 90-day wait"`.
SSOT `do_not`: "Do NOT call the basic waiting period '3 months'. The brochures state a 90-day basic wait."
Resolution: All copy must say "90-day" for Humana basic wait.

---

**CONFLICT 9: MetLife NCD implant cap described as "lifetime" in some copies**

Existing: some earlier copies called the MetLife implant cap a "$3,000 lifetime maximum."
SSOT: `metlife-ncd-complete.md`, `implants: "capped at $3,000 per CALENDAR YEAR within the $10,000 maximum"`.
SSOT `do_not`: "Do NOT state the implant cap as lifetime. It is $3,000 PER CALENDAR YEAR."
Resolution: All MetLife plan prose and Quick Facts must say "per calendar year," not "lifetime."

---

**CONFLICT 10: Delta Dental whitening described as "~25-50%" in older copies**

Existing: old SSOT and some hub copy said whitening coverage was "~25-50%."
SSOT: `delta-dental-ppo-premium.md`, `whitening: "80% (cosmetic, where included)"`.
SSOT `do_not`: "Do NOT call whitening a standard covered benefit...label state-specific. If shown, it is 80%."
Resolution: All Delta whitening references must say 80% where included, labeled as state-specific. Not offered everywhere; CA excludes it.

---

**CONFLICT 11: DI Hub carrier table shows UHC annual max as "~$1,500" and MetLife as "Up to $1,500"**

Existing: `01-current-state-audit.md`, section 7.2 identifies this: "UHC annual max shows ~$1,500 in the table but JSON has 1000; MetLife shows Up to $1,500 but JSON has 10000."
SSOT: `uhc-primary-dental.md`, `annual_maximum: "$1,000 per person per calendar year"`; `metlife-ncd-complete.md`, `annual_maximum: "$10,000 per calendar year"`.
Resolution: These are errors in the DI Hub file, not the PPO Hub. Flag for DI Hub rebuild team. PPO Hub must use correct SSOT values: UHC $1,000, MetLife $10,000.

---

**CONFLICT 12: Hub title says "7 Carriers Ranked" but 8 plans are featured**

Existing: `01-current-state-audit.md` notes title inconsistency (7 vs 8).
Resolution: Hub rebuild title should reflect 8 plans. Suggested title: "Best PPO Dental Plans for 2026: 8 Carriers Compared by Situation."

---

**OPEN ITEMS (not conflicts but requiring resolution before build):**

- **Aetna network location count (442,000+):** This number appears on the plan page but not in the SSOT network field. Verify against a primary Aetna source before printing in plan prose. If unverifiable, use "one of the largest PPO networks on this shelf" without a specific count.
- **Mutual of Omaha activation timing:** UNVERIFIED in SSOT. Do not state a specific effective-date rule. Tell visitors to confirm with the carrier.
- **MetLife NCD Complete deductible marketing language:** SSOT says do not call it "vanishing" as the primary term. Use "lifetime deductible" as the lead descriptor.
- **Guardian AM Best rating:** Guardian is rated A++ AM Best per SSOT. This is a trust signal that can be cited in the plan story card (Quick Facts panel). Verify the current rating on ambest.com before build. SSOT: `guardian-premier-ppo.md`, `carrier: "The Guardian Life Insurance Company of America (A++ AM Best)"`.
- **Delta Dental availability by state:** Only 16 states + DC for the individual PPO Premium plan. Any state-targeted rendering must exclude or flag Delta for users outside those states. SSOT `do_not`.
- **Ameritas availability in Massachusetts:** Not available in MA. Flag for any state-targeted rendering. SSOT `sources` (GR 7708 3-26).
- **UHC not available in New York:** Must be flagged for any NY-targeted rendering. SSOT `not_in_ny`.
- **Aetna CVS perk not available in 9 states:** GA, LA, MN, MO, NY, NJ, OK, TX, VA. Must be disclosed wherever the CVS perk is mentioned. SSOT `cvs_extracare_plus`.

---

*Spec 18 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are approved.*
*Plan facts: all verified against `/data/plans/*.md` SSOT files as of 2026-06-26.*
*No em-dashes used anywhere in this file.*
