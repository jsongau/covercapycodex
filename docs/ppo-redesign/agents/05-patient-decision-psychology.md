# Agent 05 — Patient Decision Psychology

> CoverCapy PPO hub redesign · Patient plan-shopping behavior + behavioral economics (merged)
> Scope: information hierarchy and trust/conversion design that helps an anxious first-time
> dental-plan shopper decide WITHOUT choice paralysis or feeling manipulated.
> Inputs read: `00-MASTER-PROMPT.md` (Conversion architecture, Smart Match, Ethical conversion rule,
> Agent 05/09 blocks), `compare-ppo-dental-plans.html` (the `#match` panel, `score()`/`renderVerdict()`,
> the 6-constraint `scorePlan()`/`renderPlanner()`), `_redesign-package/presentation-specs/00` and `/01` (esp. §5 verification status).

---

## 0. The shopper we are designing for

One persona governs every decision below: **the anxious first-time individual dental-plan buyer.**
She is not an insurance expert. She landed here because something is wrong (a cracked tooth, a
quoted crown, a new baby, a job change) or because she finally has the money to fix something she
has put off. She is afraid of three things, in this order:

1. **Picking wrong** — buying a plan that turns out not to cover the exact thing she needs, or
   making her wait months she did not expect.
2. **Being played** — a feeling, learned from every "best plan" affiliate page she has ever seen,
   that the recommendation is bought and the numbers are softened to make a sale.
3. **Looking stupid** — not understanding "annual maximum," "coinsurance," "missing-tooth clause,"
   and being asked to choose anyway.

Everything that follows is engineered to defuse those three fears in that order. The design job is
not to maximize clicks; it is to **get an unsure person to a confident, correct decision** and let
the conversion follow from the confidence. That ordering is also the ethical position.

The canonical journey the page must support (from the master prompt) is:

> **What care do I need? → When do I need it? → What can I spend? → Which plans plausibly fit? →
> What are the exact tradeoffs? → What should I verify? → Which dentist can use this exact plan?**

Smart Match owns the first four steps. The comparison matrix and plan pages own "exact tradeoffs."
The source drawer + verification line own "what should I verify." The dentist bridge owns the last.

---

## 1. FIRST-SCREEN information hierarchy — exactly what she sees, in order

The single biggest current mistake (per `00-research-findings-and-principles.md` §1) is making the
buyer *reconstruct* the answer from prose, hero tiles, and scattered numbers. Lead with the answer.
Below is the required top-of-page order. **Every item above the fold must be scannable in one pass,
not read.**

### Above the fold (first screen, no scroll)

1. **Breadcrumb + one quiet freshness/trust line.**
   `Independent · no paid placement · reviewed by dental billing specialists · last verified June 2026 · How we choose`
   One line, muted, ~13px. This is the trust handshake; it must be present before any number so the
   buyer reads the numbers as trustworthy. It is NOT a badge wall (see §3).

2. **Compact hero — one promise, one sub-line, no essay.**
   H1 states the job ("Compare every PPO dental plan in one independent place"). One supporting line
   names the four things that actually decide the bill (coverage for your work, annual maximum,
   waiting period, monthly price). **No editorial paragraph before the tool.** The master prompt
   bans "long editorial essays before the plan inventory."

3. **Smart Match input panel — the first interactive thing she touches.**
   Three questions, visible, no scroll to find them: **treatment goal → timing → budget.** This is
   deliberate: the first action on the page is the buyer telling US about HER, not us telling her
   about plans. That single design choice converts "8 scary plans" into "show me the 2 for me," and
   it is the primary anti-paralysis move (§2). No email gate. Results update live.

4. **The match result — one recommended plan + one backup, visible without scrolling away from the
   inputs.** Side-by-side with the inputs on desktop; directly beneath on mobile. The result is the
   payoff of the first action and must never be below the fold relative to the inputs.

### Immediately below the fold (first scroll)

5. **The standardized comparison matrix** (server-rendered). Row = spec, column = plan, the six
   headline specs from File 01 in fixed order. This is where "I trust the recommendation but want to
   see for myself" is satisfied. It must sit high — the master prompt: "The plan inventory must
   appear high on the page. Do not bury it."

6. **Plan-card library** (filterable by plan shape).

7–onward: treatment pathways, timing pathways, carrier index, dentist-verification bridge, glossary
preview, methodology/sources, FAQs, corrections/footer. (Per master prompt master-hub order.)

### The rule that makes this work

> **Answer first, evidence second, education third, fine print fourth.**
> Recommendation → comparison matrix → "why it matters" explanation → disclaimers/sources.
> Never invert this. An anxious buyer who hits a wall of disclaimers or a glossary before she sees a
> single plan leaves.

---

## 2. CHOICE-PARALYSIS reduction — specific to 8 plans

Eight options is squarely in the choice-overload danger zone (the classic finding: more options →
lower decision rate and lower satisfaction). The defense is **not** to hide plans — that would
violate independence — but to **change the question** from "pick 1 of 8" to "confirm the 1 we
matched, or compare a short list." Five concrete tactics:

### 2a. Default recommendation WITH transparent reasoning (the core move)

Smart Match already collapses 8 → 2 (top + backup). Keep that. The recommended plan is a **default
the buyer can accept in one click or reject with full visibility** — never a locked-in choice, never
a hidden one. The reasoning is mandatory and must be specific to HER inputs, not generic marketing.
See §5 for exact reasoning shape.

- **Show one top match and one meaningful backup.** Not three, not five. Two is the proven
  paralysis-free unit: a choice exists (so she feels in control) but it is trivially small.
- The backup must be **genuinely different in shape**, not a near-clone — e.g. "cheaper but slower"
  vs. "more coverage, costs more." A real tradeoff makes the top pick feel chosen, not forced.

### 2b. "Show me 3 that fit" — progressive expansion, not progressive hiding

Below the top-2 result, offer one low-commitment expander:
`See the 3 plans that fit your answers →`. This respects buyers who distrust a single recommendation
(a healthy instinct) without dumping all 8 on them. Expanding to 3 is still under the paralysis
threshold and feeds directly into the compare tray (max 3–4 columns per File 00 §2e). Never expand
silently to all 8; the full inventory lives in the matrix below for the buyer who chooses to go
there.

### 2c. Plan-shape filtering — sort the 8 into 3 buckets she already understands

File 00 §2c establishes that buyers self-sort into three shapes: **Preventive · Basic · Major/Full.**
Label every plan with its shape and offer a 3-chip filter on the card library. This converts "8
undifferentiated plans" into "3 kinds of plan, pick your kind first." Categorization is a documented
overload reducer: choosing among 3 categories then 2–3 items each is far easier than 8 flat options.

### 2d. Goal-gradient: show progress and make the next step the obvious one

The buyer should always see how close she is to done. After Smart Match returns a result, the next
action is singular and named: `Compare these 2 side by side →` or `See full plan breakdown →`. Never
present a result as a dead end with six equal buttons. One primary next-best-action per state. A
light "Step 2 of 3" feel on the input panel (need → timing → budget) gives the gradient without a
literal progress bar that would feel like a funnel.

### 2e. Eliminate, don't just rank — show what was ruled OUT and why

The 6-constraint planner already does this well (`gatedHtml`:
*"Hidden because they can't meet your needs: Carrier X (no implant coverage)…"*). **Keep and
elevate this.** Telling the buyer *why a plan was eliminated* (e.g. "stops at age 64," "no braces
coverage") does two psychological jobs at once: it shrinks the active choice set AND it proves the
engine is reasoning honestly on her behalf, not just upselling. This is one of the strongest trust
signals on the page and should be visible, not buried.

> **Anti-paralysis summary:** Change the question (match, don't browse) → default + 1 backup →
> optional "3 that fit" → shape filter for the rest → always one named next step → show the rejects.

---

## 3. TRUST design — independence, methodology, reviewer, and the QUIET verification model

Trust must be *felt before it is read*. The buyer decides whether to believe the numbers in the
first two seconds, from tone and restraint, not from a disclaimer she will never open.

### 3a. Independence — state it once, plainly, and prove it with behavior

The strongest independence claim on the current page is also the most credible because it explains
the business model:

> *"No carrier pays for placement. CoverCapy is paid by the dental offices in our network, not by
> which plan you choose."*

Keep this verbatim, place it in the methodology block AND compress it into the top trust line. Then
**prove it with behavior**, which is far more persuasive than the claim:
- Smart Match reasoning shows tradeoffs and cautions, not only positives (it already does — keep).
- Eliminated plans are named with reasons (§2e).
- The score method is stated inline: *"Independent. No carrier pays for a higher score."* (present
  in `renderPlanner()` — keep verbatim).

### 3b. Methodology + reviewer — visible, specific, human, but restrained

- **One persistent, quiet reviewer/methodology line near the result**, not a wall. The existing
  *"reviewed by dental billing specialists and former treatment coordinators"* is good because it
  names a *real, relevant* role rather than a fake "expert." Per master prompt and Agent 16/20,
  `Person` schema and bylines may only reference real, verifiable reviewers — do not invent a named
  doctor for trust theater.
- The full methodology ("How we choose plans") is **one click away**, linked from the trust line and
  from each Smart Match result. Anxious analytical buyers will open it; everyone else is reassured it
  exists. That is the correct progressive-disclosure split for trust.

### 3c. The QUIET verification-status model (this is the headline fix)

Per `01-spec-data-dictionary.md` §5 and `00` §3.6, the current pages' single biggest noise source is
a **"Needs verification" pill stamped on every fact and every cell.** Psychologically this backfires
twice: it buries the headline number under a footnote, and a page that flags *everything* as
unverified reads as *nothing is verified* — the opposite of the legal intent. The fix:

- **At most ONE confidence indicator visible per plan in the scan view.** One muted line under the
  spec block carries the full legal weight:

  > `Last verified June 20, 2026 · illustrative · view sources`

  - "Last verified [date]" = freshness and accountability.
  - "illustrative" = the honest qualifier on premium/coverage (pricing needs a location-specific
    quote — say so once, not on every tile).
  - "view sources" = the door to per-fact provenance.
- **Per-fact provenance lives in the source drawer**, one expand away (File 04 §6). The buyer who
  cares about a single number can open it; the buyer who does not is not drowned.
- **Color it muted; it sits UNDER the specs, never over them.** Verification status is metadata, not
  a billboard.
- **The one exception** (File 01 §5): a `gathering-reviews` plan (e.g. MetLife NCD Complete) gets a
  single prominent **"Under review — not recommended yet"** plan-level banner, because there the
  status IS the headline. Individual cells still stay quiet. Smart Match must keep excluding these
  from the recommended slot (the live `score()` already filters `status!=='live'` — keep).

Why "quiet but present" beats both extremes: a loud badge-per-fact destroys legibility and trust; no
disclosure at all is dishonest and legally exposed. One calm verified-line per plan is the only
position that is simultaneously trustworthy, legible, and defensible.

### 3d. Honest caveats without legal-noise overload

Anxious buyers need caveats (they are afraid of the missing-tooth clause), but legal density reads as
either "they're hiding something" or "this is too complicated for me." Rules:

- **Inline the caveats that change the decision; footnote the caveats that don't.** "12-month wait
  before major work is covered" belongs *in the result, in plain language*. "MAC vs. U&C
  reimbursement basis" belongs in the detail spec table or source drawer.
- **Caveats as plain-language "heads up," not legalese.** Keep the planner's pattern:
  *"Heads up: 12-month wait before this is covered."* That phrasing makes a limitation feel like an
  honest friend warning you, not a disclaimer protecting the seller.
- **One disclosures block at the bottom**, not disclaimers sprinkled through every section.
- **Effective date vs. waiting period must be distinguished** every time both are relevant — the
  buyer's single most expensive misunderstanding ("coverage starts" ≠ "this treatment tier becomes
  eligible"). The master prompt requires this; it is also a trust issue, because getting it wrong is
  how she ends up feeling deceived after she buys.

---

## 4. ETHICAL conversion patterns — USE these / BAN these

### USE (ethical, on this page)

| Pattern | Ethical application here |
|---|---|
| **Default + transparent reasoning** | One recommended plan she can accept or reject with full visibility and stated reasons. A default is ethical *only* when the alternatives and the reasoning are equally visible. |
| **Anticipated-regret / ethical loss-aversion** | Frame around HER real money: *"Plan covers $900 toward a typical crown; after the premium you keep $X vs. paying cash."* and *"Without coverage a crown averages ~$1,800 out of pocket."* This is loss aversion grounded in true, sourced numbers — not invented scarcity. The existing `valueFrame()` does exactly this; keep it, keep it sourced. |
| **Goal-gradient** | Show progress through need → timing → budget; make the next step singular and obvious. |
| **Commitment & consistency** | She chose her goal/timing/budget, so the result is framed as *"Fitted for **crowns**: …"* — consistent with HER stated input. Earned, not manufactured. |
| **Social proof — ONLY if real** | Review counts and ratings may appear *only* where truthfully sourced (Agent 16: no invented ratings). "Gathering reviews" is itself honest social-proof language. |
| **Progressive disclosure** | Headline specs → full table → source drawer. Reduces cognitive load without hiding facts. |
| **Friction on risky actions, ease on safe ones** | Make "compare" and "see breakdown" one tap; keep enrollment/off-site handoff a deliberate, disclosed click — never an accidental redirect. |

### BAN (dark patterns — explicit, from master prompt Ethical conversion rule)

- **Fake countdown timers / "offer ends in…"** — there is no real deadline.
- **False scarcity** — "only 2 plans left," "3 people viewing." Insurance plans do not run out.
- **Invented popularity** — "most popular," "chosen by 8,000 people" without a real, sourced number.
- **Dark-pattern defaults** — a recommendation the buyer can't see the reasoning for, or an option
  pre-selected to benefit CoverCapy over her.
- **Prechecked consent / pre-checked add-ons** — every consent and add-on is opt-in, unchecked.
- **Misleading "activation today" / "instant coverage"** language when an effective date or waiting
  period applies. Say "coverage starts [date]" and distinguish it from when a treatment tier becomes
  eligible.
- **"Guaranteed savings" / "you will save"** — say "may save," show the math, cite the assumption.
- **"In-network" without exact network evidence** — name the exact PPO network or don't claim it.
- **Confirmshaming** — no "No thanks, I'd rather overpay" decline copy.
- **Unsupported "best plan" claims** — "best fit for your answers" (conditional, defensible) is fine;
  "the best dental plan" (absolute) is banned.
- **Trapped / urgent exit modals, roach-motel enrollment** — leaving and going back must be free.

> The line: an ethical pattern helps the buyer choose *what is genuinely right for her faster*; a
> dark pattern makes her choose *what benefits us against her interest*. Loss aversion built on a
> true sourced number is ethical; loss aversion built on a fake timer is not.

---

## 5. How Smart Match's REASONING should read

The reasoning is where trust and conversion are won or lost. It must sound like a knowledgeable,
unbiased friend explaining a real decision — specific to her inputs, honest about tradeoffs, in
plain English. The current code is already close; tighten to this standard.

### Required shape of a result

```
★ Closest fit for your answers                         ~$57/mo · $5,000 cap
Mutual of Omaha — Dental Preferred                      [Strong fit · 78/100]

Fitted for crowns:
• Major work covered at 50%
• Your "can wait" timeline clears the 12-month wait
• $5,000 annual maximum — room for a full crown and more

Heads up: 12-month wait before major work is covered. If the tooth is urgent,
see the backup, which reaches major coverage sooner.

Last verified June 20 · illustrative · view sources
[ Compare these two → ]  [ See full plan breakdown ]
```

### Rules the reasoning must follow

1. **Lead with the conditional, never the absolute.** "Closest fit *for your answers*," not "the
   best plan." The conditional is honest and removes the "says who?" reflex.
2. **Every reason ties back to HER input.** "*Your* can-wait timeline clears the wait" beats "12-mo
   wait." The pattern *"Fitted for crowns: …"* already does this — keep it; make every bullet do it.
3. **Always include at least one honest tradeoff/caution on the top pick.** A recommendation with no
   downside reads as a sales pitch. The "Heads up:" line is the single most trust-building element of
   the match and must never be suppressed to make a plan look better.
4. **Show the value math, sourced.** Keep `valueFrame()`: "Plan covers $X toward a typical [need];
   after a $Y/yr premium you keep $Z vs. cash." Label the cash benchmark as a national-average
   assumption — never present it as her guaranteed number.
5. **The backup must be a real alternative with a one-line "why you'd pick it instead."** e.g.
   *"Backup — Humana Extend: costs a little more, but reaches major coverage in 6 months instead of
   12."* That single contrast line is what converts the top pick from "forced" to "chosen."
6. **State the method in one sentence, inline.** Keep:
   *"Scored on coverage for your need, waiting period against your timing, annual maximum, value per
   dollar, and your budget. Independent. No carrier pays for a higher score."*
7. **Reconciliation when inputs change the winner.** Keep the planner's
   *"With your budget, age and priorities, **Carrier X** now edges out your quick pick. The reasons
   are below."* — this models honest reasoning and prevents the "why did it change?" distrust.
8. **Distinguish "coverage starts" from "treatment tier becomes eligible."** If she picked implants,
   the reasoning must not imply the implant benefit is live on day one when a wait applies.
9. **Plain English only.** No "coinsurance," "U&C," "LEAT" inside the reasoning bullets; if a term is
   unavoidable, it gets a glossary tooltip, not a paragraph.

### One unification note (decision-support quality risk)

There are currently **two** matchers in the page: the inline hero `score()`/`renderVerdict()` and the
6-constraint `scorePlan()`/`renderPlanner()`, with **different scoring weights** (e.g. `s+=pct*0.4`
vs. `s+=pct*0.3`; different budget penalties; different tier thresholds). To a buyer this is invisible
until she notices the same plan framed two ways — at which point trust drops. **Both must read from
one canonical scoring function on one canonical data object** (master prompt no-data-drift rule). This
is the most important reasoning fix below the surface.

---

## 6. DO / DON'T

### DO
- Lead with the recommendation; put evidence, then education, then fine print after it.
- Make the buyer's FIRST action describing herself (need → timing → budget), not browsing 8 plans.
- Default to one top match + one genuinely different backup; offer "show me 3 that fit" as opt-in.
- Label every plan with its shape (Preventive / Basic / Major) and let her filter by it.
- Show what was ruled OUT and the plain-language reason.
- Always include one honest "Heads up:" caution on the top pick.
- Use ONE quiet `Last verified · illustrative · view sources` line per plan; provenance in the drawer.
- State independence as a business-model fact and prove it with behavior.
- Name a real reviewer role; link full methodology one click away.
- Frame value with true, sourced numbers (loss aversion is fine when it's honest).
- Keep one primary next-best-action per state.
- Distinguish "coverage starts" from "treatment tier becomes eligible," every time.

### DON'T
- Don't show all 8 plans as a flat first choice.
- Don't put a "Needs verification" badge on every fact or cell.
- Don't open with an editorial essay or a glossary before the plan inventory.
- Don't use countdowns, false scarcity, invented popularity, or pre-checked consent.
- Don't claim "best dental plan" (absolute) — only "best fit for your answers" (conditional).
- Don't say "instant/activation today" when a waiting period or future effective date applies.
- Don't promise "guaranteed savings" — show the math and the assumption.
- Don't claim "in-network" without the exact network name.
- Don't hide the recommendation's downside to make a plan look stronger.
- Don't run two divergent scoring engines that can disagree about the same plan.
- Don't sprinkle disclaimers through every section; consolidate at the bottom.

---

## 7. Score: current decision-support quality

**Score: 6.5 / 10**

The bones are unusually strong for this category: Smart Match collapses 8 → 2, requires no email,
already shows tradeoffs and cautions, names eliminated plans with reasons, frames value with cash
benchmarks, and states an honest independent method inline. The independence positioning is genuinely
credible. That is most of the way to excellent and well above typical affiliate "best plan" pages.

What holds it back: (1) the verification-status noise the specs already flag — "Needs verification"
on every fact destroys legibility and paradoxically reduces trust; (2) two divergent scoring engines
that can frame the same plan differently and quietly contradict; (3) the recommendation reasoning,
while good, is inconsistently tied to the buyer's specific inputs and the honest "Heads up" caution
is not guaranteed on every top pick.

### Top 3 fixes (in priority order)

1. **Adopt the quiet verification model now.** Replace per-fact "Needs verification" badges with one
   muted `Last verified [date] · illustrative · view sources` line per plan; move per-fact provenance
   into the source drawer; keep the single prominent "Under review" banner only for
   `gathering-reviews` plans. Highest legibility-and-trust gain for the least effort.
2. **Unify Smart Match onto one canonical scoring function + one data object.** Eliminate the two
   divergent matchers so no two surfaces can disagree about the same plan. This is the load-bearing
   trust fix beneath the visible copy.
3. **Standardize the reasoning contract:** every top match must (a) lead with the conditional "for
   your answers," (b) tie every reason to her input, (c) carry exactly one honest "Heads up:" caution,
   and (d) pair with a backup that states "why you'd pick it instead." Make this a render invariant,
   not a per-state accident.
