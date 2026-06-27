# UX10 — The Real-Cost Playground (What-If Sandbox)

Agent: UX Designer 10/10
Scope: ANALYZE and DESIGN only. Concrete spec, no full build.
Mode: Open sandbox. The user builds their own dental year and watches the math resolve into a single real out-of-pocket number, with glossary terms taught inline as each one fires.

---

## 0. WHY THIS, AND HOW IT DIFFERS FROM UX01 AND UX02

UX01 ships discrete single-concept widgets (one slider set per term). UX02 ships guided narrative scenarios (Maya, the January reset). Both are linear: one variable, one lesson.

This memo proposes the unifying layer that sits above them: a single canvas where every glossary term is live at once and interacts. The user is not answering a prompt. They are assembling a year of treatment, choosing one of our 8 plans, and watching deductible, coinsurance, and the annual maximum fight over the bill in real time. The terms are not defined in a tooltip dictionary; they are annotated on the running tape exactly at the moment they change the number.

This is the right home for the shared concept "the real cost of a procedure," because real cost is never one number. It is the sum of how five terms stack in sequence. A sandbox is the only format that shows the stacking.

Best placement: a single embeddable block that lives on the out-of-pocket, annual-maximum, and coinsurance glossary pages (same code, different default emphasis per page), with a tail CTA into the hub's Smart Match.

---

## 1. THE CORE METAPHOR — "Build Your Year"

The screen is a worktable, not a form. Three zones:

```
┌─────────────────────────────────────────────────────────┐
│  PLAN SHELF (8 plan chips)        BUDGET DIAL (optional)  │
├─────────────────────────────────────────────────────────┤
│  PROCEDURE TRAY            │   THE TAPE (live ledger)     │
│  drag / tap to add         │   each line annotated with   │
│  cleaning, filling, crown… │   the term that just fired   │
├─────────────────────────────────────────────────────────┤
│         THE NUMBER:  You pay $0 this year  →  resolves    │
└─────────────────────────────────────────────────────────┘
```

The user picks a plan, taps procedures into their year, and the bottom NUMBER animates every time. The Tape on the right is the teaching surface: as a procedure resolves, its line expands to show the term that governed it (deductible applied, coinsurance taken, cap reached), with the glossary word styled as a dotted-underline term chip that the user can tap for the one-line definition.

No avatar, no story. The user IS the protagonist. That is the difference from UX02.

---

## 2. INPUTS (the things the user controls)

### 2a. Plan Shelf — pick 1 of 8 (the frozen coverage)
Eight chips, each shows: plan name, monthly premium, and a compact coverage badge `100 / 80 / 50` (preventive/basic/major) plus deductible and annual max. Selecting a plan re-resolves the whole Tape instantly so the user can A/B plans against the same year of treatment. This is the gamified spine: same year, swap the plan, watch The Number move.

Frozen plan model (each plan is one object; values are realistic national PPO ranges, to be reconciled against the canonical 8-plan table before build):

| Plan archetype | Premium/mo | Deductible | Annual max | Prev | Basic | Major | Waiting (major) |
|---|---|---|---|---|---|---|---|
| Essential | $30 | $75 | $1,000 | 100% | 80% | 50% | 12 mo |
| Core | $42 | $50 | $1,250 | 100% | 80% | 50% | 6 mo |
| Core Plus | $55 | $50 | $1,500 | 100% | 80% | 50% | 6 mo |
| Preferred | $68 | $50 | $1,500 | 100% | 80% | 60% | 6 mo |
| Preferred Plus | $82 | $50 | $2,000 | 100% | 90% | 60% | 3 mo |
| Premier | $95 | $25 | $2,000 | 100% | 90% | 60% | 0 mo |
| Premier Elite | $120 | $25 | $2,500 | 100% | 90% | 70% | 0 mo |
| Concierge | $150 | $0 | $3,000 | 100% | 90% | 70% | 0 mo |

These are placeholders shaped to the right ranges. BEFORE BUILD: replace with the project's frozen 8-plan numbers (see UX12/plan reconciliation). The deductible is waived on preventive in all 8 (standard Class I behavior).

### 2b. Procedure Tray — realistic national fee ranges
Each procedure is a chip carrying a class and a national fee (in-network negotiated band; default to the midpoint, advanced toggle reveals the band). Classes drive which coinsurance tier applies.

| Procedure | Class | National fee (in-network band) | Default |
|---|---|---|---|
| Cleaning + exam (recall) | Preventive | $90 to $200 | $130 |
| X-rays (bitewings) | Preventive | $35 to $90 | $60 |
| Filling (composite, 1 surface) | Basic | $150 to $300 | $220 |
| Simple extraction | Basic | $130 to $350 | $200 |
| Root canal (molar) | Basic/Major* | $900 to $1,600 | $1,200 |
| Crown (porcelain) | Major | $900 to $1,800 | $1,300 |
| Implant (single, restored) | Major (often excluded) | $3,000 to $5,000 | $3,800 |
| Night guard | Basic | $300 to $700 | $450 |
| Whitening | Excluded (cosmetic) | $300 to $800 | $500 |

*Root canal class varies by plan; default it to Basic but expose a note that some plans rank it Major. This is itself a teachable moment surfaced on the Tape.

The Tray teaches by selection: tapping Whitening drops a line that resolves to 100% you-pay with the term chip "excluded service," which is the cleanest way to teach that not everything is covered.

### 2c. Budget Dial (optional, the gamification hook)
A single dial: "I want to keep my year under $___." Default off. When set, The Number turns green while under budget and amber when over, and an inline coach line appears: "You are $140 over. Try Core Plus, its higher annual max stops the crown from overflowing." This converts the sandbox into an optimization puzzle without points or timers (per design rules: no countdown timers).

---

## 3. THE LIVE CALC (the resolution engine)

Procedures resolve in calendar order of entry. State carried across the year: `deductibleRemaining` and `maxRemaining`. This sequencing is the whole point: the same crown costs more if it is the first treatment of the year than if a filling already burned the deductible.

```
state = { deductibleRemaining: plan.deductible, maxRemaining: plan.annualMax }

for each procedure p in year (in order added):
  rate = plan.coinsurance[p.class]          // 1.00 / 0.80 / 0.50 etc.
  if p.excluded:                            // whitening, often implant
      youPay += p.fee; planPaid = 0
      tag = "excluded service"; continue

  // 1. Deductible (waived on preventive)
  ded = p.class === 'preventive' ? 0 : min(state.deductibleRemaining, p.fee)
  state.deductibleRemaining -= ded
  afterDed = p.fee - ded

  // 2. Coinsurance on the remainder
  planWants = afterDed * rate
  yourCoins = afterDed - planWants

  // 3. Annual maximum is a ceiling on PLAN-PAID dollars only
  planPaid = min(planWants, state.maxRemaining)
  overflow = planWants - planPaid           // plan ran out, you pay this too
  state.maxRemaining -= planPaid

  youPayLine = ded + yourCoins + overflow
  youPay += youPayLine
```

Critical accuracy rules baked in:
- Deductible comes out first, in full, before any percentage is applied. (Teaches why "80% covered" rarely means "you pay 20%.")
- Deductible is waived on preventive (Class I) in all 8 plans.
- The annual maximum drains by plan-paid dollars only, never by patient dollars. This is the single most-missed fact and the meter exists to prove it.
- Once `maxRemaining` hits 0, every further plan share flips to overflow and the user pays it in full. No statutory out-of-pocket cap exists in dental (unlike ACA medical), and the Tape says so when overflow first appears.
- Order matters. Re-ordering procedures re-runs the engine and The Number can change, which is a deliberate, surprising lesson about timing.

Annual total premium is shown separately and never mixed into out-of-pocket: `Year cost = (premium x 12) + out-of-pocket`. Keeping these two columns distinct teaches that a cheaper premium can lose to a richer plan once the crown lands.

---

## 4. INLINE TERM TEACHING (the annotation system)

Terms are taught at the instant they bite, on the line they affect. No glossary sidebar. Each Tape line, when it resolves, paints up to three micro-badges in the token colors and exposes a tappable term chip:

| Trigger on the line | Badge (color) | Term chip taught | One-line teach (tap to expand) |
|---|---|---|---|
| `ded > 0` | gold-soft | **deductible applied** | "You paid $X before the plan shared anything. It happens once per year." |
| `yourCoins > 0` | teal-300 | **coinsurance taken** | "The plan paid Y%, so your share is $X of what was left after the deductible." |
| `planPaid > 0` | mint-soft | **plan paid** | "$X came off your annual maximum, not your wallet." |
| `overflow > 0` | red | **annual maximum reached** | "Your plan paid all it pays this year. The rest is 100% yours until it resets." |
| `p.excluded` | ink-faint | **excluded service** | "Some treatments are never covered. They are 100% out-of-pocket every time." |
| preventive line | mint | **preventive, no deductible** | "Cleanings are free to encourage prevention. The deductible is waived here." |

When the deductible is fully consumed mid-year, a thin divider drops into the Tape labeled "deductible met, every later line skips it." This makes the calendar-year mechanic visible without a separate widget. The first time overflow appears, an inline ribbon over The Number reads: "There is no out-of-pocket maximum in dental. Past the annual max, you are at full price." That single line is the out-of-pocket page's core thesis, delivered by the user's own actions rather than prose.

The five required concepts map cleanly onto the badges: out-of-pocket = The Number, coinsurance = teal badge, deductible = gold badge, annual maximum = red overflow + the drain meter, real cost of a procedure = the fully expanded Tape line summing all badges for one procedure.

A small persistent "annual maximum meter" rides the top of the Tape, draining as plan-paid dollars accrue, turning amber near empty and stamping a dry "Maxed out" when it hits zero (cautionary, not celebratory).

---

## 5. GAMIFICATION (optimize to minimize, no points/timers)

The reward is always a dollar figure, never a score popup. Three honest loops:

1. **Plan A/B duel.** Keep the year fixed, tap through all 8 plan chips. A thin "best so far" marker pins the lowest total-year cost. Headline updates: "Premier wins your year by $310 over Essential, even though it costs $65 more a month." This is the most defensible, conversion-relevant lesson and it teaches premium-versus-coverage tradeoff by direct experience.

2. **Budget challenge.** Set the dial. The coach nudges the single highest-leverage change ("swap to a higher annual max" / "move the implant to next year"). Hitting the target shows a soft mint flourish and the line "You found the cheapest path for this year." No streaks, no localStorage, resets per session.

3. **Order experiment.** A subtle "reorder" affordance on the Tape. Dragging the crown above the filling re-runs the engine and The Number ticks. The discovery that order changes cost is the most memorable a-ha and it teaches timing around the deductible and annual max in one gesture.

All three avoid the banned patterns: no countdown timers, no Capy Crowns, no fake urgency. The math is the game.

---

## 6. VANILLA-JS APPROACH (inline, no libraries)

- One self-contained block: `<section class="cc-playground">` + inline `<style>` + inline `<script>` IIFE. No imports, no build step, drops straight into a glossary page or the generator's page body. Mirrors the standalone-HTML pattern already used for T5 pages.
- State is two plain objects: `PLANS` (the 8 frozen plans), `PROCS` (the fee table), and a `year[]` array of selected procedure ids plus the selected `planId` and optional `budget`. No framework, no reactivity library.
- Single `resolve()` function runs the Section 3 engine over `year[]` and returns line objects `{label, fee, ded, coins, planPaid, overflow, youPay, tags[]}`. One `render()` reads that result and rewrites the Tape and The Number via `innerHTML` for lines and `textContent` for the animated total.
- Number animation: a tiny `tween(from,to,ms,cb)` using `requestAnimationFrame`, easing the displayed total. Roughly 15 lines, no library.
- Interaction: event delegation on the Tray (`click` to add), the Shelf (`click` to switch plan), the Tape (`click` on term chips to expand definitions; optional pointer drag to reorder). Everything keyboard reachable; chips are real `<button>`s.
- Accessibility: The Number is an `aria-live="polite"` region so each resolution is announced. Term chips are `<button aria-expanded>`. Meter is `role="progressbar"`.
- Theming: strictly the CSS tokens. gold-soft = deductible, teal-300 = coinsurance, mint-soft = plan paid, red for overflow, cream-card panel, line borders, Fraunces for The Number, Inter Tight for UI. No gradients, no glassmorphism, no em-dashes in any copy string.
- Footprint target: under ~14KB inline (markup + style + script), well within a glossary page budget.
- Page emphasis switch: a single `data-focus="out-of-pocket|annual-maximum|coinsurance"` attribute on the section sets which badge pulses first and which intro line shows, so the same code serves all three glossary pages.

---

## 7. THE TAIL CTA (link into Smart Match)

Once the user has built a year and dueled the plans, the resolved panel ends with one quiet line, not a hard sell:
"You just priced your year by hand. Smart Match does this against real plans and your zip in about a minute." Button: "Find my real plan" -> hub Smart Match, carrying the built year as URL params so the match arrives pre-seeded. This turns a teaching toy into the top of the funnel without breaking the concierge tone.

---

## 8. BUILD CHECKLIST (pre-build, accuracy gates)

- [ ] Replace the Section 2a placeholder plan table with the project's canonical frozen 8-plan coverage. Do not ship the placeholder numbers.
- [ ] Confirm root-canal class per plan; default Basic, expose the Major exception.
- [ ] Confirm which plans exclude implants vs cover at Major 50 to 70 percent.
- [ ] Verify deductible-waived-on-preventive holds for all 8 (it should).
- [ ] Keep premium-times-12 visually separate from out-of-pocket at all times.
- [ ] Copy pass: zero em-dashes, no roman numerals, no countdown timers, no Capy Crowns.
