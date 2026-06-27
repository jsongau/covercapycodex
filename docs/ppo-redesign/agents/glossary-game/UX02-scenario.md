# UX02 — Scenario Simulator / Choose-Your-Own-Path

**Designer:** UX Designer 2 of 10
**Pattern:** Drop the user into a realistic dental situation, let them choose (when to enroll, what treatment they need, what plan), and SEE the consequence play out on an animated timeline.
**Scope:** ANALYZE / DESIGN only. Concrete spec. No full build.
**Stack:** Vanilla JS, inline, no libraries, no localStorage. CoverCapy CSS tokens. No em-dashes.

---

## WHY THIS PATTERN FITS PPO GLOSSARY LEARNING

PPO mechanics are dry as definitions but visceral as outcomes. "Waiting period" means nothing. "You chipped a tooth in week 2, your crown is not covered until month 12, you pay $1,100 out of pocket" means everything. The scenario simulator converts abstract policy terms into felt consequences. The learner is not reading a glossary, they are LIVING a decision and watching the bill land.

Best fit concepts (ranked by how naturally they branch):
1. **Waiting period** (strongest) - enroll now vs later, watch coverage unlock month by month
2. **Effective date** - the gap between "I signed up" and "I am actually covered"
3. **Calendar year vs plan year + annual maximum reset** - timing a big treatment around the reset
4. **Day-one coverage** - which categories skip the wait (preventive almost always day one)
5. **Coverage tiers** - preventive / basic / major and how each tier waits differently

---

## CORE LOOP

```
SITUATION  ->  CHOICE  ->  TIMELINE ANIMATION  ->  CONSEQUENCE (the bill)  ->  AHA + SCORE  ->  REPLAY / NEXT
```

One screen. A persistent 12-month horizontal timeline lives in the middle. Choices are tiles below it. The consequence (covered vs you-pay) animates ONTO the timeline so cause and effect share one visual field. No page transitions.

---

## SCENARIO 1 — "The Cracked Molar" (WAITING PERIOD, primary)

### Setup
Meet Maya. She has no dental insurance. On a normal Tuesday she bites a popcorn kernel and cracks a molar. The dentist says she needs a crown (a MAJOR treatment, roughly $1,200). She wants to enroll in a PPO plan.

The simulator asks one decision up front, then plays it out.

### Branching choice A — WHEN do you enroll?
Three tiles:
- **Enroll today** (before anything happens)
- **Wait until the tooth actually hurts** (enroll in month 3, after she is already in pain)
- **Skip insurance, pay cash**

### Branching choice B — WHAT does she need? (sets the tier and the wait length)
Three tiles, each tagged with its coverage tier so the learner absorbs tiers passively:
- **Cleaning + exam** (PREVENTIVE tier, $0 wait, day-one coverage)
- **A filling** (BASIC tier, typically 3-month wait)
- **The crown** (MAJOR tier, typically 6 to 12-month wait)

### The timeline animation
A 12-month track. Markers populate as the scenario runs:

- **Effective date marker** drops at the chosen enrollment month. A short pulse animation and a label: "Coverage starts here."
- **A shaded WAITING PERIOD band** extends from the effective date forward by the tier's wait length (0 / 3 / 6-12 months). The band is rendered in `--gold-soft` with a diagonal-hatch texture and the label "Not yet covered for MAJOR work."
- **The dental event marker** (the cracked tooth icon) drops on the month it happens.
- The track then animates a sweeping "playhead" left to right across the 12 months so the learner watches time pass and watches the event land either INSIDE the gold band (you pay) or AFTER it (covered).

### The consequence (the bill)
A receipt card slides up from the bottom:
- If the crown event lands inside the waiting band: **YOU PAY $1,200.** Plan covered $0. Reason line: "Major treatment, tooth cracked during your 6-month waiting period."
- If it lands after the band: **Plan paid ~$600 (50 percent of major). You pay ~$600.** (PPO accuracy: major is typically coinsured around 50 percent, not 100, AND it counts against the annual maximum. Surface both.)
- If preventive cleaning: **Plan paid 100 percent, day one. You pay $0.** Reason: "Preventive care is covered from your effective date, no waiting period."

### The AHA
Side-by-side replay button: "What if she had enrolled today instead?" Re-runs the same crack event with the effective date moved earlier so the 6-month band ENDS before the event. The crown flips from "you pay $1,200" to "plan paid $600." The single variable that changed was the enrollment timing. That is the lesson, isolated and proven.

Headline aha copy: "The waiting period does not start when you need care. It starts when your coverage starts. Enroll before you need it."

### Micro-gamification
- **"You beat the wait."** badge when the user picks an enrollment timing that clears the band before the event.
- A small **Coverage Confidence meter** (not money, to avoid feeling like a sales pitch) fills as the user makes timing-savvy choices across scenarios.
- **"Timing saved you $1,200"** counter that tallies avoided out-of-pocket across replays. Framed as learning score, not a quote.
- Subtle confetti only on the preventive day-one path and the beat-the-wait path. No countdown timers (per house rules).

---

## SCENARIO 2 — "The January Reset" (CALENDAR YEAR vs PLAN YEAR + EFFECTIVE DATE)

### Setup
Same learner, now insured. She has a $1,500 annual maximum and already used $1,300 of it this year on prior work. In November her dentist recommends a second crown.

### Branching choice — WHEN do you schedule the crown?
- **Do it now (December)** - only $200 of annual max left, she pays the rest
- **Wait until January** - annual max resets to $1,500, the crown fits under the fresh cap

Plus a toggle that teaches the vocabulary distinction:
- **Calendar-year plan** (resets January 1, the same for everyone)
- **Plan-year plan** (resets on HER enrollment anniversary, for example April 1)

### The timeline animation
A 14-month track spanning two benefit years with a bold **RESET LINE** where the year flips. An **annual-maximum gauge** sits above the track and visibly REFILLS from near-empty back to full as the playhead crosses the reset line. If the user toggles plan-year, the reset line slides from January to April and the refill moment moves with it. This is the single clearest way to show "calendar year vs plan year": the reset line literally relocates.

### The consequence
- December crown: gauge nearly empty, "Annual max exhausted, you pay ~$1,000 out of pocket."
- January crown: gauge refilled, "Crown fits under your reset maximum, you pay ~$600."

### The AHA
"Your annual maximum is not yours forever, it resets. Know your reset date. Calendar-year resets January 1. Plan-year resets on YOUR enrollment anniversary. Big treatments timed just after a reset stretch further."

### Micro-gamification
- **"Reset Strategist"** badge for scheduling the major work just after the reset.
- The annual-max gauge refill is the hero animation, satisfying on its own.

---

## VISUAL SYSTEM (CoverCapy tokens)

- Timeline track: `--line` base, `--teal-700` playhead.
- Waiting-period band: `--gold-soft` with diagonal hatch (matches the existing Delta Dental note treatment).
- Covered segments: `--mint-soft` fill, `--teal-night` text.
- "You pay" receipt: `--cream-card` background, amounts in `--ink`, the painful number in a restrained dark weight (no alarm red, this is concierge not scare-tactic).
- Headlines: `Fraunces` italic for the learner name and aha lines. Body and labels: `Inter Tight`.
- Day-one / preventive states: `--mint` accent dot.
- No gradients on cards, no glassmorphism, no em-dashes, no roman numerals, no countdown timers.

---

## STATE MODEL (vanilla JS sketch, illustrative)

```js
var state = {
  scenario: 'cracked-molar',
  enrollMonth: 0,        // 0 = today
  treatment: 'crown',    // cleaning | filling | crown
  tier: 'major',         // preventive | basic | major
  waitMonths: 6,         // derived from tier (0 / 3 / 6-12)
  eventMonth: 2,         // when the tooth cracks
  yearType: 'calendar',  // calendar | plan
  resetMonth: 0,         // Jan for calendar, anniversary for plan
  annualMax: 1500,
  maxUsed: 1300
};
// derive: covered = state.eventMonth >= (state.enrollMonth + state.waitMonths)
// render: position markers as percent across a 12 or 14 month track, animate playhead via requestAnimationFrame
```

Pure functions: `tierToWait(tier)`, `computeBill(state)`, `positionPct(month, span)`. The timeline is one absolutely-positioned container, markers are child divs positioned by left-percent, the band is one div with width = wait span. Playhead is a single animated div. All achievable inline with requestAnimationFrame, no libraries.

---

## PPO ACCURACY GUARDRAILS

- Preventive (cleaning, exam, x-ray) is almost always covered 100 percent from the effective date, NO waiting period. This is "day-one coverage."
- Basic (fillings, simple extractions) typically 3-month wait, coinsured roughly 70 to 80 percent.
- Major (crowns, bridges, dentures) typically 6 to 12-month wait, coinsured roughly 50 percent, AND subject to the annual maximum.
- Waiting period counts from the EFFECTIVE DATE, not from enrollment submission and not from when care is needed. Surface the effective-date vs enrollment-date gap explicitly.
- Annual maximum is a yearly cap that resets. Calendar-year = January 1 for all members. Plan-year = each member's own enrollment anniversary.
- Do not imply 100 percent coverage on major work. Show coinsurance honestly. Honesty builds the concierge trust position.

---

## WHY THIS BEATS A STATIC GLOSSARY

A definition tells. A scenario proves. The learner makes a timing mistake, watches Maya eat a $1,200 bill, hits replay, fixes the timing, and watches the bill vanish. They will never forget what a waiting period is, because they personally caused and then fixed the consequence. That retained, embodied understanding is the entire point of gamifying the glossary.
