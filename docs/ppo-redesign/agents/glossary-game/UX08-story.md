# UX08 — Story / Character-Driven Journey

**Designer lens:** 8 of 10. A relatable character walks through a real situation, Capy guides, the user taps through beats and the concept lands in context, not in a definition box.

**Core principle:** Nobody learns a "missing-tooth clause" from a paragraph. They learn it the moment they watch someone get surprised by it. We let the user feel the surprise on a stranger's behalf first, so they never feel it on their own claim.

---

## Why story is the right fit for these two concepts

The missing-tooth clause and the waiting period are both **time-and-exclusion traps**. They are invisible at purchase and only bite later. A definition tells you they exist. A story makes you feel the gap between "I bought a plan" and "the plan won't pay." That gap is the whole lesson.

We build one reusable engine ("Capy's Casebook") and two episodes.

---

## EPISODE 1 — "Maya and the Missing Tooth"

A warm, honest 6-beat tap-through. The user is a friendly observer; Capy is the guide who explains, never lectures.

### Character
Maya, 34, lost a molar last year to a crack she ignored too long. She is not careless and not a cautionary cartoon. She is the average buyer. The user roots for her.

### Story beats (tap "Next" to advance)

**Beat 1 — Setup (the gap).**
Illustration: Maya smiling, one molar visibly absent. Capy peeks in from the corner.
Copy: "Last spring, Maya lost a back molar. She didn't have dental cover yet. She figured she would deal with it later."
Tap target: full card → Next.

**Beat 2 — The decision (the user makes Maya's choice).**
*Optional choice point.* Capy asks: "Maya is shopping for a PPO plan now. What should she check first?"
- Tile A: "Monthly price" (most users tap this)
- Tile B: "What the plan won't cover"
Whatever they tap, Capy responds warmly. If A: "Totally normal, that is what most people look at. Hold that thought." If B: "Nice instinct. Let's see why it matters." Either path advances. No wrong-answer shaming.

**Beat 3 — The purchase (false comfort).**
Illustration: Maya holds a shiny new plan card, relieved. A small calendar shows "Day 1."
Copy: "Maya picks a solid PPO. Good rate, good network. She feels covered."
Subtle visual seed: a tiny faded asterisk on the plan card the user can notice or not. Planting the clause before it lands.

**Beat 4 — THE CONCEPT LANDS (the aha).**
Illustration: Maya at the dentist for an implant to replace that molar. The estimate prints. Capy gently steps forward.
Copy: "The dentist recommends an implant for the gap. But the plan replies: that tooth was already missing before Maya's coverage started. So it won't pay to replace it."
**Concept card slides up (this is where the term is named):**
> **Missing-tooth clause**
> Many PPO plans won't pay to replace a tooth that was already missing *before* your coverage began. It is not a penalty. It stops a plan from being bought just to cover a known, pre-existing gap.
Tone note: we explain *why* the rule exists so it reads as fair, not as a gotcha against the user.

**Beat 5 — The honest reframe (warm, not preachy).**
Capy: "This isn't Maya's fault, and it isn't a scam. It just means timing matters. A tooth lost *while* you're covered is treated differently from one lost before."
One-line takeaway pill: "Buy before the loss, not after."

**Beat 6 — Payoff + bridge to action.**
Capy: "Now you'll spot this clause in any plan you read. Want to see plans and check this line for yourself?"
CTAs:
- Primary: "Compare PPO plans" → `/compare-ppo-dental-plans`
- Secondary: "See the next case" → loads Episode 2
Progress: "Concept unlocked: Missing-tooth clause" with a small Capy stamp (not a Capy Crown — per design rules, no Capy Crowns in modal contexts; this is a flat earned-badge stamp).

### Emotional arc
Empathy (root for Maya) → false comfort (she feels safe) → gentle gut-drop (the clause lands on *her*, not the user) → relief and mastery (the user now sees the trap from the outside and feels equipped). The user leaves smarter and slightly protective, never scared.

---

## EPISODE 2 — "The Cost of Waiting" (waiting period + annual maximum)

Same engine, same Maya or a second character (Theo). This episode teaches **waiting period** as the headline and folds in **annual maximum** as the natural second beat.

### Beats (condensed spec)

**Beat 1 — Setup.** Theo signs up for a plan in January and books a crown the same week. He assumes "covered now means covered now."

**Beat 2 — Concept lands: waiting period.**
The plan says: basic cleanings start today, but major work like crowns has a 6-month waiting period.
> **Waiting period**
> A set time after your start date before the plan pays for certain treatments. Cleanings often have none. Crowns, root canals and major work often have 3 to 12 months. It keeps premiums fair for everyone who waits their turn.

**Beat 3 — Optional choice (make it concrete).** Capy: "Theo's crown is $1,200. He can wait the 6 months, or pay out of pocket now. What would you do?"
- "Wait it out" → "Smart if the tooth can wait. He saves the bulk of the cost."
- "Pay now" → "Sometimes the right call for pain. But he eats the full bill this time."
No judgment either way. The point is that the *waiting period changes the math*, and the user now does that math instinctively.

**Beat 4 — Second concept: annual maximum.**
Once the waiting period clears and the crown is approved, the plan caps what it pays per year.
> **Annual maximum**
> The most a plan will pay toward your care in one plan year, often $1,000 to $2,000. Past that, you pay the rest. Big work split across two plan years can stretch two annual maximums.

**Beat 5 — Payoff.** Capy: "Two timing rules, one idea: dental plans reward planning ahead. Cleanings now, big work mapped to the calendar." CTA to compare plans.

---

## TAP-THROUGH UI SPEC

- **Container:** a single card modal/section, max-width ~440px, `--cream-card` background, `--line` border, Fraunces headers, Inter Tight body. Mobile-first; the whole experience is one column.
- **Illustration zone (top ~45%):** simple flat scene per beat. Capy is a consistent small guide figure (corner or stage-left). Use lightweight inline SVG or a sprite-swap on one `<img>`; no animation library.
- **Copy zone:** one short paragraph (max ~2 sentences) per beat. Concept cards slide up from the bottom with a CSS transform transition.
- **Controls:** large full-width "Next" button (mint text on teal-night). Tappable anywhere on the card also advances, except on choice beats. A slim progress dots row (6 dots) up top.
- **Choice beats:** two tap tiles using `--mint-soft` selected state; both lead forward; Capy's reply text swaps in below before "Next" appears.
- **Concept reveal:** the named term animates in (slide + fade) so the *word* is the visual climax of the beat. This is the teaching moment, visually privileged.
- **Exit/replay:** "Replay this case" and "Next case" at the end. State persists in `sessionStorage` so unlocked concepts stay stamped.

---

## VANILLA-JS APPROACH (inline, no libraries)

- A `BEATS` array of objects: `{ illo, body, capy, concept?, choices?, cta? }`. One array per episode.
- Single render function `renderBeat(i)` rewrites the card's inner HTML/SVG and toggles the concept card. An `i` index pointer; "Next" increments; choices set a flag then increment.
- Transitions: CSS classes (`.slide-in`, `.fade`) toggled on render; `transitionend` is optional, not required. No timers driving content (per design rules: no countdowns).
- State: `sessionStorage` array `cc_concepts_unlocked` so the badge stamp and "concept unlocked" line survive within a visit.
- Accessibility: each beat is a labelled region, "Next" is a real `<button>`, choice tiles are buttons, concept term is an `<h3>` so screen readers hit the vocabulary word. Reduced-motion media query disables slides.
- Footprint: ~6 to 10 KB of inline HTML/CSS/JS per episode. Fully self-contained, matching the standalone-page convention. No fetch, no external assets beyond Capy sprite frames.

---

## HONESTY GUARDRAILS

- Every concept card explains *why the rule exists*, so it reads as fair, not predatory. CoverCapy looks trustworthy by teaching the fine print, not hiding it.
- Ranges are stated as ranges ("often 3 to 12 months", "often $1,000 to $2,000"), never as one fake number.
- No "act now or lose out" pressure. The lesson is "plan ahead," delivered warmly.
- The user never plays the victim; a character does. So the emotion is empathy and mastery, not anxiety.
- No em-dashes, no roman numerals, no Capy Crowns in this modal context, no countdowns. (Compliant with CLAUDE.md design rules.)
