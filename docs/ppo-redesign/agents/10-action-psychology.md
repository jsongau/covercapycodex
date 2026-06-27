# Agent 10 — Action Psychology & Behavioral Economics

> CoverCapy PPO hub redesign · The "extremely important" role (master prompt Agent 09 block).
> Scope: turn a correct, anxiety-defused decision into an actually-completed action — without
> manipulation. This memo is the **action-engineering layer**. Agent 05 already mapped the shopper's
> fears, the information hierarchy, the trust model, and the dark-pattern ban list. **I do not repeat
> those.** I build the next layer: the mechanics of the default recommendation, the CTA hierarchy, the
> commitment ladder, the completion loops, and the precise founder-fear answer.
>
> Inputs read: `00-MASTER-PROMPT.md` (Conversion architecture, CTA hierarchy, Ethical conversion rule),
> `05-APPROVED-DESIGN-SYSTEM.md` (Smart Match = lens, one scoring function, quiet verification),
> `agents/05-patient-decision-psychology.md` (build on, do not duplicate),
> `compare-ppo-dental-plans.html` (`score()`/`renderVerdict()`/`fitCard()`/`valueFrame()`,
> `scorePlan()`/`renderPlanner()`/`plCard()`, the two divergent engines),
> `_redesign-package/presentation-specs/00`.

---

## 0. The founder's fear, answered directly

The founder fears the redesign comes out **"too basic / worse than current."** That fear is correct
to hold, because the current page's psychological engine is genuinely good and easy to flatten into a
generic SaaS "compare 8 plans" grid. This memo's first job is a preservation contract, its second is
an addition list.

### 0a. What the CURRENT page + ZIP already do well — DO NOT LOSE (preserve contract)

These are load-bearing action mechanisms. Removing any of them makes the page *worse*, not cleaner.

| Mechanism | Where it lives now | Why it drives action |
|---|---|---|
| **Smart Match collapses 8 → 2** with one top + one backup | `renderVerdict()`, `renderPlanner()` | The single biggest paralysis killer. A 2-option result has a measured-decision-rate far above an 8-option grid. **Non-negotiable to keep.** |
| **Reason bullets tied to her input** (`Fitted for crowns:`, `Your timing clears the wait`) | `whyFitted()`, `scorePlan().reasons` | Consistency principle — she sees the engine reasoned about *her*, so she trusts and acts on the result. |
| **Mandatory honest "Heads up:" caution** | `plCard()` `plc-caution`, `score()` `bad` reasons | A recommendation with a visible downside converts *better* than a flawless one; it reads as advice, not a pitch. |
| **Value math, sourced** ("Plan covers $X… you keep $Y vs cash") | `valueFrame()`, `CASH_COST` | Ethical loss-aversion grounded in a real national-average number. This is the strongest single action prompt on the page. **Keep, keep sourced.** |
| **Eliminated-plans-with-reasons** ("Hidden because they can't meet your needs: X (no implant coverage)") | `gatedHtml` | Shrinks the choice set AND proves honesty in one move. A rare trust-and-action two-for-one. |
| **No email gate before results** | both matchers | The result is the reward for the first micro-commitment; gating it kills the goal-gradient. |
| **Reconciliation copy when the winner changes** | `pl-recon` | "Carrier X now edges out your quick pick — reasons below" models honest reasoning and prevents the "why did it change?" distrust that stalls action. |
| **Independence stated as a business-model fact** | methodology + `pl-method` line | "No carrier pays for a higher score" — removes the "this is a paid placement" reflex that makes anxious buyers freeze. |
| **The 6-field deeper planner** (need/timing/house/age/budget/priority) | `renderPlControls()` | Lets the analytical buyer earn confidence through a richer commitment ladder. Its *depth* is a feature; do not flatten to 3 fields only. |

> **If the redesign keeps the warm shell, the dense matrix, AND every row above, it is structurally
> incapable of being "more basic" than today.** The founder's fear is answered by treating this table
> as a regression checklist, not by adding novelty.

### 0b. What must be ADDED to drive more action (the gap)

1. **One canonical scoring engine.** Two matchers (`score()` weights `pct*0.4`; `scorePlan()` weights
   `pct*0.3`, different budget penalties, different tier thresholds) can frame the *same plan two ways*.
   The moment a buyer notices, confidence collapses and action stops. Unify per design-system §4.
2. **An explicit, visible next-best-action per state** (see §3). Today the result offers "Open plan
   brief" + "Find dentists" as near-equal buttons — no single obvious next step.
3. **A real comparison-completion loop** (see §5). The compare tray exists in the ZIP but nothing
   *closes the loop* — tells her she is done and what to do now.
4. **A persistent, resumable progress signal** (see §4) so a returning or mid-scroll buyer feels the
   goal getting closer rather than starting over.
5. **A confidence "receipt"** after the match — a one-line plain-English summary she can act on or save
   (see §6). Anxious buyers act when they can articulate *why* in one sentence.

---

## 1. The default recommendation as a behavioral instrument

Agent 05 established the *ethics* of the default (one pick she can accept or reject with full
visibility and stated reasons). This section specifies the **mechanics** that make a default actually
get accepted.

### 1a. The "one top match + one honest backup" pattern — exact spec

This is the centerpiece pattern the brief asked me to be concrete about.

```
┌─────────────────────────────────────────────┐  ┌──────────────────────────────┐
│ ★ CLOSEST FIT FOR YOUR ANSWERS   78/100      │  │ ↳ HONEST BACKUP        71/100 │
│ Mutual of Omaha — Dental Preferred           │  │ Humana — Extend 5000         │
│ Strong fit · ~$57/mo                         │  │ ~$64/mo                      │
│                                              │  │                              │
│ • Major work covered at 50%                  │  │ Why you'd pick this instead: │
│ • Your "can wait" timeline clears the wait   │  │ costs ~$7/mo more, but reaches│
│ • $5,000 annual max — room for a full crown  │  │ major coverage in 6 months    │
│                                              │  │ instead of 12.               │
│ Heads up: 12-mo wait before major work.      │  │                              │
│ If urgent, see the backup →                  │  │ [ Compare these two → ]      │
│                                              │  │                              │
│ Plan covers $900 toward a typical crown;     │  └──────────────────────────────┘
│ after premium you keep ~$216 vs paying cash. │
│ Last verified Jun 20 · illustrative · sources│
│ [ See full breakdown ]  [ Find MoO dentists ]│
│ ▸ Not sure? See the 3 plans that fit →       │
└─────────────────────────────────────────────┘
```

**Why exactly two, and why this shape:**

- **The top match is a default, not a verdict.** Visual dominance (larger card, gold "Most fitting"
  ribbon, primary green CTA) makes it the path of least resistance — but the backup sits *beside* it,
  not hidden, so accepting the default is a *choice she made*, not a choice made for her. That framing
  is what converts a default from a dark pattern into a trust signal.
- **The backup must be different in SHAPE, with a one-line "why you'd pick this instead."** A near-clone
  backup creates a hard 50/50 decision (paralysis). A backup framed as an explicit *tradeoff*
  ("cheaper-but-slower" vs "costs-more-but-faster") makes the top pick feel *chosen by contrast* and
  gives the urgent-need buyer an instant escape hatch. The contrast line is the highest-leverage single
  sentence in the whole result — it is what flips "forced" into "chosen."
- **The backup's contrast line should be selected to defuse the top pick's own "Heads up."** If the top
  pick's caution is "12-month wait," the backup's reason should answer that exact caution ("reaches major
  coverage in 6 months"). This pairing turns a downside into a navigable fork instead of a dead end.

### 1b. Transparent reasoning is a conversion mechanism, not a disclaimer

The reasoning contract (lead with the conditional "for your answers," tie each reason to her input,
exactly one honest caution, show sourced value math, state the method in one line) was specified in
Agent 05 §5. The action-psychology point on top of it: **make the reasoning a render invariant, enforced
in the one canonical card component**, not a per-state accident. When the reasoning is reliably present,
the buyer stops re-deciding and starts acting — the reasoning *is* the confidence she needs to click.

### 1c. Never present the default as a dead end

Every default-recommendation card must terminate in exactly **one** visually-primary next step (see §3),
plus quieter secondaries. The current `fitCard()` ends with two equal-weight buttons; that is a fork,
and forks at the moment of peak confidence leak action.

---

## 2. Choice-paralysis: the action-layer additions

Agent 05 covered the anti-paralysis *strategy* (change the question, default+backup, "3 that fit," shape
filters, show the rejects). Three **action-mechanics** to layer on top:

- **Decision-set sizing as a hard rule, enforced in code.** Recommended view: 2. Optional expansion:
  exactly 3 (the "See the 3 that fit" expander, never a silent jump to 8). Compare tray: max 4 columns
  (master prompt). These caps are paralysis thresholds — bake them as constants, not guidelines.
- **One decision per screen-state.** At any moment the buyer should face one primary question: *first*
  "what do you need?" (Smart Match input), *then* "accept this match or see the fork?", *then* "compare or
  go deeper?". Never two top-level decisions competing in the same viewport. This is the single most
  effective paralysis control and it is purely a layout discipline.
- **Categorize before you enumerate.** The plan-shape chips (Preventive / Basic / Major) must gate the
  card library so the buyer picks a *kind* (1 of 3) before facing *items* (2–3 each). 3-then-3 is far
  below the overload threshold of 8-flat.

---

## 3. CTA hierarchy — the next-best-action system (concrete)

The master prompt lists candidate CTAs but not the *hierarchy by state*. This is the load-bearing
addition. **Exactly one primary CTA is visible per decision-state.** Everything else is secondary
(ghost) or tertiary (text link). The job of the CTA system is to make the next step *obvious and
singular* at every point in the journey.

| Journey state | PRIMARY (green, 1 only) | Secondary (ghost) | Tertiary (text link) |
|---|---|---|---|
| **Landed, pre-match** | `Find my best-fit plan` (scrolls to / focuses Smart Match input) | `Skip to all plans` | `How we choose` |
| **Match returned (top + backup)** | `Compare these two →` | `See full breakdown` · `Find {carrier} dentists` | `See the 3 that fit` · `view sources` |
| **Compare tray has 2–4** | `See the full comparison →` (opens matrix focused on picks) | `Save this comparison` | `Clear tray` |
| **Comparison completed** (§5) | `Check official pricing` (off-site, disclosed) **or** `Find dentists for {top plan}` | `Email this comparison` | `Start over` |
| **On a plan detail page** | `Find dentists for this plan` | `Compare with alternatives` · `Check official pricing` | `Read the sources` |
| **Verify intent** | `Verify my dentist & network — free` | — | — |

**Rules that make the hierarchy work as a behavioral instrument:**

1. **Friction asymmetry — ease the safe action, deliberate the risky one.** "Compare," "see breakdown,"
   "save" = one tap, zero gates. The *only* high-friction (disclosed, deliberate, off-site) click is the
   carrier handoff / enrollment. Never let an off-site redirect happen by accident — it must be a clearly
   labelled, intentional click through the universal "leaving CoverCapy" concierge modal.
2. **The primary CTA always advances the canonical journey** (need → timing → budget → fit → tradeoffs →
   verify → dentist). A primary CTA that loops sideways is a leak.
3. **Provider-side CTAs ("Claim this office," "How PPO networks work for dentists") never appear in a
   patient decision-state.** They live in dedicated provider modules only (master prompt). A provider CTA
   in the patient flow is a goal-conflict that stalls both audiences.
4. **CTA copy is action + object + honesty.** `Compare these two →` not `Continue`. `Verify my dentist &
   network — free` not `Get started`. The verb + the object + the "free"/"no email" qualifier each remove
   a specific hesitation.

---

## 4. Goal-gradient & the commitment ladder

People accelerate toward a goal as it appears closer, and they honor commitments they have already
*made* (consistency). The page should let the buyer climb a ladder of tiny, escalating commitments,
each one making the next feel natural and the goal feel nearer.

### 4a. The commitment ladder (each rung is cheap; each makes the next obvious)

```
Rung 1  Pick a treatment goal        → "crowns"          (1 tap, no gate)
Rung 2  Pick a timeline              → "I can wait"      (1 tap)
Rung 3  Set a budget                 → slider to $60     (1 drag)
        ──────────  the match appears here — the reward for 3 micro-commitments  ──────────
Rung 4  Pin top + backup to compare  → "Compare these two"
Rung 5  Open the breakdown / sources → reads the tradeoff
Rung 6  Save / email the comparison  → low-stakes possession of the decision
Rung 7  Find a dentist / check price → the real conversion
```

Each rung is reversible and un-gated; none demands an email until well past the point of earned trust.
The **consistency** payoff: by rung 7 she has *told the page who she is* six times, so acting on the
result is consistent with everything she has already done. That earned consistency, not pressure, is
what closes.

### 4b. Goal-gradient signals to ADD

- **A light "Step 2 of 3" feel on the input panel** (need → timing → budget). Not a literal funnel
  progress bar (which reads as a sales funnel and raises guard) — a quiet, three-dot or "2 of 3"
  affordance that makes completion feel imminent. Agent 05 flagged this; I specify it as the *only*
  progress metaphor allowed.
- **Resumability.** Persist Smart Match inputs and compare-tray picks in URL/`localStorage` (master
  prompt: "preserve choices in the URL or session state"). A returning buyer should re-enter *above* the
  rung she left, never at rung 1. Restarting from zero is the most common silent abandonment cause and
  the cheapest to fix.
- **Visited-state memory.** Subtly mark plans/sections already seen (`aria-current` + a quiet tick) so
  the buyer perceives coverage of the option space — "I've looked at enough" is the feeling that unlocks
  the decision.

---

## 5. Comparison completion — closing the loop

The ZIP gives a compare tray and matrix but nothing tells the buyer she is *done comparing* and what to
do with that conclusion. An open comparison with no terminal state is a classic abandonment trap: the
buyer keeps "researching" because nothing signals sufficiency.

**Add a completion moment.** When the buyer has compared her picks (e.g. opened the full matrix with
2–4 plans, or expanded a source drawer), surface a quiet **comparison verdict strip**:

```
You've compared 3 plans for crowns on a "can wait" timeline.
Best fit for your answers: Mutual of Omaha — Dental Preferred.
[ Check official pricing ]   [ Find dentists for this plan ]   Email this comparison
```

- It **names what she did** (3 plans, crowns, can-wait) — consistency + closure.
- It **restates the conditional recommendation** ("best fit for your answers," never "the best plan").
- It offers **exactly one or two primary next actions**, not a menu — the next-best-action, not "explore
  more."
- It is **honest about sufficiency**: it does not claim she has seen "everything," only that she has
  enough to decide. The full inventory stays one click away for the buyer who wants it.

This single strip converts "I'll keep looking" into "I have my answer" — the difference between a
research session and a decision.

---

## 6. Confidence-building & the decision "receipt"

Anxious buyers act when they can **say their decision out loud in one sentence.** Give them that
sentence. After the match (and again at completion), render a plain-English, copyable receipt:

> *"For crowns I can wait on, with a ~$60/mo budget, Mutual of Omaha — Dental Preferred is the closest
> fit: major work at 50%, $5,000 annual max, 12-month wait. I'd verify the dentist accepts it before I
> enroll."*

- It is **first-person and plain** — it is the buyer's own reasoning handed back to her, which is the
  most powerful consistency device available.
- It **includes the caveat** ("12-month wait," "verify before enroll") so it is honest and so she is not
  blindsided later — the blindside is what creates regret and refunds, the opposite of retention.
- It is **saveable/emailable** — possession of the decision lowers the bar to acting on it later and
  creates a non-intrusive retention loop (she comes back to *her* saved sentence, not a marketing email).

Other confidence builders (each cheap, each ethical):

- **Show the work, briefly.** The one-line method statement ("Scored on coverage for your need, waiting
  period vs your timing, annual max, value per dollar, budget. Independent. No carrier pays for a higher
  score.") is a confidence anchor — keep it adjacent to the result, not buried.
- **Name the rejects.** The "hidden because they can't meet your needs" line (§0a) is also a confidence
  builder: it proves the engine *eliminated* on her behalf, so the survivor feels vetted.
- **Quiet, single verification line** (`Last verified · illustrative · view sources`) — confidence comes
  from one calm freshness signal, not from a "Needs verification" badge on every cell (which paradoxically
  destroys confidence, per Agent 05 §3c).

---

## 7. Ethical loss-aversion vs manipulative urgency — the bright line

The master prompt and Agent 05 §4 already enumerate the dark-pattern BAN list (fake countdowns, false
scarcity, invented popularity, dark defaults, prechecked consent, "guaranteed savings," confirmshaming).
I add the **operating test** an implementer can apply to any new element:

> **Does this element help her choose what is genuinely right for her, faster — or does it push her
> toward what benefits CoverCapy against her interest?** Loss-aversion built on a *true, sourced* number
> ("a crown averages ~$1,800 cash; this plan covers $900") is ethical and effective. Loss-aversion built
> on a *fabricated constraint* ("offer ends in 4:59," "only 2 plans left") is a dark pattern. Insurance
> plans do not expire or run out; any urgency on this page would be fake by construction.

**The honest substitutes for urgency** (use these instead of the banned ones):

- **Real consequence framing, not deadline framing.** "Major work has a 12-month wait — the sooner
  coverage starts, the sooner that clock begins" is a *true* time fact that motivates without a fake
  timer. Distinguish "coverage starts [date]" from "this treatment tier becomes eligible" every time —
  getting this wrong is the single most expensive misunderstanding and the fastest route to a buyer who
  feels deceived after purchase.
- **Effort-justification, not pressure.** She invested in three answers; the receipt and the saved
  comparison honor that effort and make finishing feel like the natural completion of work already done.
- **Genuine social proof only.** Real review counts/ratings where truthfully sourced (Agent 16); "gathering
  reviews" is itself honest. Never an invented "most popular."

---

## 8. DO / DON'T (action-layer; complements Agent 05's list, does not repeat it)

### DO
- Treat §0a as a **regression checklist** — the redesign must not ship missing any current action mechanism.
- Render the default as **one dominant top match + one shape-different backup**, the backup carrying a
  one-line "why you'd pick this instead" that answers the top pick's own "Heads up."
- Enforce **one primary CTA per decision-state** (the §3 table); demote everything else to ghost/text.
- Make the primary CTA always **advance the canonical journey**; never loop sideways.
- Build the **commitment ladder** of cheap, reversible, un-gated micro-actions; gate email last.
- Add a **comparison-completion strip** that names what she did, restates the conditional recommendation,
  and offers one next-best-action.
- Give a **plain-English, first-person, saveable decision receipt** that includes the caveat.
- Persist inputs + picks so a returning buyer **resumes above the rung she left**.
- Use **real consequence framing** (waiting-period clock) instead of any deadline/scarcity device.
- Keep **value math sourced** and the **independence method statement** beside the result.

### DON'T
- Don't ship two scoring engines that can frame the same plan two ways — unify to one canonical function.
- Don't end a recommendation card with two equal CTAs (a fork at peak confidence).
- Don't expand silently from 2 to 8; the only expansion is the explicit "3 that fit."
- Don't surface provider CTAs inside a patient decision-state.
- Don't let an off-site/enrollment redirect happen by accident — it is the one deliberate, disclosed click.
- Don't add any urgency, countdown, scarcity, or "most popular" device — on insurance plans it is fake by
  construction.
- Don't claim "you've seen everything" at completion — claim "you have enough to decide," keep inventory a
  click away.
- Don't flatten the 6-field deeper planner to a 3-field toy; its depth is a confidence feature.

---

## 9. Acceptance criteria (testable)

1. From a cold landing, a buyer can reach a recommended plan in **≤3 inputs and 0 gates**, and the result
   shows top + backup with the backup's contrast line present.
2. **Exactly one** scoring function and one `PLANS` object feed Smart Match, the cards, the matrix, and any
   plan-page verdict (no-data-drift). Automated test fails the build on any same-plan value divergence.
3. Every recommendation card renders, as invariants: conditional headline, ≥2 input-tied reasons, exactly
   one "Heads up:" caution, sourced value line, one quiet verification line, **one** primary CTA.
4. Each decision-state exposes **one** visually-primary CTA matching the §3 table; no two primaries compete
   in one viewport.
5. Compare tray caps at **4**; the "expand" control reveals **3**, never 8.
6. A **completion strip** appears after a comparison and offers ≤2 primary next actions plus save/email.
7. Smart Match inputs + tray picks **persist** (URL or `localStorage`); reload resumes state.
8. A **decision receipt** is generated in first-person plain English, includes the caveat, and is
   saveable/emailable.
9. The page contains **zero** countdowns, scarcity counters, "most popular" claims, prechecked consent, or
   accidental off-site redirects (automated scan + manual review).
10. "Coverage starts [date]" is visually and textually distinguished from "treatment tier becomes eligible"
    everywhere both apply.

---

## 10. Score: current action-taking / conversion quality

**Score: 7 / 10**

Half a point above Agent 05's decision-support score, and deliberately so: the current page's *action*
engine is its strongest dimension. It already does the hardest behavioral work — collapses 8 → 2, requires
no email, ties reasons to the buyer's input, guarantees an honest caution, frames value with a true sourced
cash benchmark, names the rejects, and reconciles honestly when the winner changes. That is a genuinely
sophisticated, ethical conversion engine that most affiliate "best plan" pages do not approach. The
founder's instinct that the current page is good is correct.

What holds it back from excellent: (1) **two divergent scoring engines** can quietly contradict each other
and break confidence at the worst moment; (2) **no single next-best-action** — results and cards end in
forks of equal-weight CTAs, leaking action at peak confidence; (3) **no comparison-completion loop and no
decision receipt** — the journey has a strong middle but a soft ending, so motivated buyers keep
"researching" instead of finishing; (4) **no resumability**, so returning buyers restart at rung 1.

### Top 3 recommendations (priority order)

1. **Unify to one canonical scoring engine + one data object, then make the recommendation card a strict
   render invariant** (conditional headline · input-tied reasons · one honest caution · sourced value · one
   quiet verification line · one primary CTA). This protects confidence and kills data-drift — the
   load-bearing trust-and-action fix beneath everything else.
2. **Install the next-best-action CTA hierarchy** (§3 table): exactly one visually-primary CTA per
   decision-state, every primary advancing the canonical journey, provider CTAs banished from patient
   states, off-site/enrollment as the only deliberate disclosed click. Ends the fork-at-peak-confidence
   leak.
3. **Close the loop: add a comparison-completion strip + a first-person, caveat-included, saveable decision
   receipt, and persist inputs/picks for resumability.** This converts "I'll keep looking" into "I have my
   answer," and turns the saved sentence into an ethical, non-intrusive retention loop.
