# UX1 — Hero + Smart Match + Above-the-Fold

Page: `compare-ppo-dental-plans.html`
Scope: hero block (`#match` `.match-head`, lines 970-984), Smart Match lens (`.match-grid`, lines 985-1002), and the verdict card rendered by `renderVerdict()` / `fitCard()` (lines 1347-1392). Premiums frozen. No em-dashes.

---

## 1. What the first screen is today

There is no separate hero band. The page opens straight into `#match`. The `.match-head` (lines 972-984) carries the entire framing job:

- Eyebrow: "Independent PPO dental insurance comparison" (line 973)
- H1: "Match a PPO dental plan / to the work ahead." (line 974, with a `<br>` and italic display second line)
- Lede: a four-thing explainer naming coverage, annual maximum, waiting period, premium, then the dentist handoff (line 975)
- Trust line: "Independent, no paid placement . reviewed by dental billing specialists . updated June 2026" (line 976)
- Browse-by chips: Plan vs plan / Coverage feature / Procedure / Life event (lines 977-983)

Below that sits the two-column `.match-grid` (line 176): left panel "Tell us about your visit" (goal grid + timeline + budget slider), right panel "Your CoverCapy match" (live verdict card). On desktop both panels share the fold. On mobile (line 442) the grid collapses to one column, so the input panel stacks first and the result card is pushed well below the fold.

## 2. First-screen clarity verdict

A visitor does understand *what this is* quickly: the eyebrow plus H1 read as an independent PPO plan comparison, and "no paid placement" earns trust early. That part works and should be preserved.

What is weaker is *what to do*. The above-the-fold real estate is heavy on prose before any interaction. The lede (line 975) is one long sentence listing four evaluation criteria. It explains the methodology before the visitor has expressed any intent. The actual interactive promise, that selecting a treatment instantly returns a matched plan, is only discoverable once the eye travels down to the left panel sub-label (line 988: "Results update on every change"). The headline talks about matching but nothing above the panel signals *you do this right now, live*.

The browse-by chips (lines 977-983) compete with the Smart Match for the first decision. They are duplicative of the sticky TOC (lines 956-966) and of the Compare/Feature/Treatment/Situation sections downstream. Stacked directly under the trust line, they invite the visitor to bounce to a sub-section before ever touching the lens. That dilutes the single strongest interaction on the page.

## 3. Is Smart Match the right hero anchor?

Yes. The lens is the most differentiated, most "concierge" element on the page and it produces a concrete answer (a fitted plan card) rather than a wall of options. Leading with it is correct positioning for the luxury-concierge feel. The fix is not to demote it but to make its payoff visible and immediate on first paint.

The risk today: the result panel can read as empty or secondary because it is gated behind reading the left panel. The default state (`state` defaults to Cleaning / Need now / ~$70, line 1330) does render a verdict on load, which is good, but the right panel's label "Your CoverCapy match" (line 998) and the card itself are visually quieter than the input controls. The strongest plan card should feel like the hero object.

## 4. Above-the-fold recommendations

a. Tighten the lede. Replace the single four-criteria sentence with a shorter promise plus the method as a secondary line. Suggested H1-adjacent copy: "Pick the treatment on your schedule. We rank every featured PPO plan on coverage, annual max, waiting period and price, then point you to an in-network dentist." Keep it to two short sentences so the panels rise into the fold. No em-dashes (current copy already complies).

b. Move the browse-by chips below the match-grid, not above it. The first decision the visitor sees should be the lens, not a navigation menu. The chips already exist in the sticky TOC, so duplicating them above the fold costs the primary interaction nothing to remove. Demote them to a "Prefer to browse" row directly under the result card.

c. Add a one-line affordance cue between the H1 and the panels, for example a small "Live . updates as you choose" pill aligned with the panel, so the interactive nature is promised before the eye reaches the controls.

d. Keep the eyebrow and trust line. "Independent, no paid placement" is the credibility anchor and should stay in the first screen.

## 5. Input clarity (left panel)

- The goal grid (`GOALS`, lines 1314-1323) mixes treatment categories cleanly, but two entries (Dentures and Emergency) reuse `k:'major'` with an `alt` flag. That is fine for scoring, but "Emergency" as a treatment goal alongside "Need now" timeline is conceptually redundant. The `syncTime()` logic (lines 1396-1402) already disables future timelines for emergency, which is good, self-explaining behavior. Keep, but add a one-line helper under the goal grid clarifying that some goals auto-set the timeline.
- The budget slider label "What you want to spend" (line 994) is clear. The live value `~$70/mo` (line 994, updated at line 1414) reads well. Recommend adding the min/max anchors ($20 and $120) as faint end labels so the visitor understands the range without dragging.
- "Treatment goal", "Timeline", "Monthly budget" (lines 989, 991, 993) are good plain-language field labels. No change.

## 6. Match result card (right panel)

The `fitCard()` output (lines 1375-1392) is strong: it leads with "Closest fit", shows price, carrier, plan name, a value-framing line ("you keep $X compared to paying cash", line 1373), chips for premium/cap/wait, and a "Fitted for [goal]" rationale. This is the emotional payoff and it is well built. Recommendations:

- Elevate the top card visually so it reads as the hero object: slightly larger price type, a subtle accent border using `--green`, more separation from the dashed backup card (line 203). Right now both cards live in the same quiet container.
- The dual CTA (line 1390: "Open plan brief" + "Find [carrier] dentists") is the right next-step pair. Ensure the green primary always wins visual weight at mobile widths.
- The "No live plan covers that yet" empty state (line 1350) is graceful and points to Compare. Keep it, but soften the phrasing to feel less like a dead end, for example "No featured plan covers that one yet. Try another goal, or see the plan we are still reviewing in Compare below."
- The value frame (lines 1365-1373) is the single most persuasive element. Consider surfacing the kept-savings figure as a bold standalone line at the top of the card, not buried mid-card, since it is the clearest reason to act.

## 7. Mobile first-screen

This is the weakest area. At `max-width:760px` (line 442) `.match-grid` collapses to one column and the panels stack input-first. Consequences:

- The result card, the payoff, falls below the fold. The visitor sees only inputs on first paint, which reads like a form, not an answer engine.
- The H1 drops to 1.85rem and the lede to 15px (lines 440-441), which is reasonable, but combined with the eyebrow, trust line, and browse-by chips, the controls barely reach the fold.

Recommendations:

- On mobile, render the result card first or pin a compact result summary at the top of the stacked panel, so the payoff is visible before scrolling. A collapsed "Closest fit: [carrier] [name] ~$X/mo" strip that expands into the full card would preserve the answer-first feel.
- Remove the browse-by chips from the mobile above-the-fold entirely (they exist in the sticky TOC).
- Cut the lede to one sentence on mobile via the existing breakpoint, keeping only the promise, not the four-criteria method.
- Verify CTA buttons hit the 46px+ min-height already applied to plan cards (line 468); apply the same to `.fit-cta .btn`.

---

## Constraints honored
- No premium values changed.
- No em-dashes introduced; all suggested copy uses commas, colons, or periods.
- Recommendations stay within existing CSS tokens (`--green`, `--sage`, `--line`) and existing markup IDs.
- This is spec only. No code changed.
