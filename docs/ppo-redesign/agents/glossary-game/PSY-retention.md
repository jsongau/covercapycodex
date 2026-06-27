# PSY-Retention Memo: Behavioral Psychology and Retention Review

Author role: Behavioral Psychology and Retention specialist
Subject: The 10 proposed glossary-game mechanics (UX01 through UX10), evaluated against evidence-based learning, retention, and engagement science. YMYL context: honesty is mandatory. No dark patterns.
Note: Peer memos were not yet present in the folder at review time. This assessment rests on the mechanic list provided and on the underlying psychology.

---

## 1. The mechanics, mapped to the principle they actually exploit

| ID | Mechanic | Primary psychological lever | Real strength |
|----|----------|-----------------------------|---------------|
| UX01 | Live calculator | Generation effect, active processing | Personal relevance |
| UX02 | Scenario simulator | Generation + concreteness | Understanding |
| UX03 | Quiz / flashcards | Testing effect, active recall, spaced repetition | Retention (highest) |
| UX04 | Animated diagram | Dual-coding, von Restorff | Understanding |
| UX05 | XP / progression | Extrinsic reward, goal-gradient | Engagement (fragile) |
| UX06 | Cash-vs-insured toggle | Loss aversion, contrast | Conversion |
| UX07 | Drag-drop sorting | Generation effect, active recall | Understanding + retention |
| UX08 | Story / character | Narrative transportation, curiosity | Engagement |
| UX09 | Microinteractions | Operant feedback, satisfaction | Polish, not learning |
| UX10 | Real-cost playground | Generation + self-reference effect | Conversion (highest) |

The single most important distinction: mechanics that make the user **produce an answer or a number themselves** (UX01, UX02, UX03, UX07, UX10) drive durable learning. Mechanics that make the user **watch or collect** (UX04, UX05, UX09) are support acts. Treating UX05/UX09 as the engine is the classic gamification failure mode.

---

## 2. Ranking by outcome

### (a) Understanding (does the concept click)
1. UX02 Scenario simulator
2. UX10 Real-cost playground
3. UX04 Animated diagram
4. UX07 Drag-drop sorting
5. UX01 Live calculator
Reason: understanding comes from seeing a concept move and applying it to a concrete case. Simulators and playgrounds force the learner to set inputs and watch consequences, which is the generation effect plus immediate causal feedback.

### (b) Retention (does it stick a week later)
1. UX03 Quiz / flashcards (testing effect + spaced repetition are the two best-replicated findings in learning science)
2. UX07 Drag-drop sorting (recall-based, not recognition)
3. UX02 Scenario simulator
4. UX10 Real-cost playground
5. UX01 Live calculator
Reason: retention is overwhelmingly driven by retrieval practice, not by exposure. Reading a definition produces near-zero durable retention; being asked to retrieve it produces the largest effect sizes in the field. Nothing here beats a well-spaced quiz.

### (c) Engagement and return
1. UX08 Story / character (narrative creates the Zeigarnik pull to continue)
2. UX10 Real-cost playground (open-ended, personally relevant, replayable)
3. UX03 Quiz (with spacing, gives an honest reason to return)
4. UX05 XP / progression
5. UX09 Microinteractions
Reason: return depends on an open loop (Zeigarnik) plus a reason to come back. Story and a spaced quiz both supply honest open loops. XP returns only work if tied to real progress, not vanity points.

### (d) Conversion to comparing plans
1. UX10 Real-cost playground (user sees their own number, then the gap)
2. UX06 Cash-vs-insured toggle (loss aversion made concrete and honest)
3. UX01 Live calculator
4. UX02 Scenario simulator
5. UX03 Quiz (weak direct conversion; strong trust-builder)
Reason: conversion follows a self-generated, personally relevant number. When a user computes their own out-of-pocket cost and then sees the insured number beside it, the contrast does the persuading. This is honest because the numbers are real.

---

## 3. Dark-pattern and manipulation flags (YMYL)

This is health-adjacent money. The bar for honesty is high. Flags, ordered by risk:

- **UX06 cash-vs-insured toggle.** Loss aversion is legitimate only if both numbers are real and the insured number includes the premium and any waiting periods. Showing a naked "you would have saved" figure that ignores monthly cost is the dental-marketing version of a dark pattern. REQUIRED: show premium, annual maximum, and waiting periods in the same view. Never animate the cash number upward to feel painful.
- **UX05 XP / progression.** Variable-ratio reward schedules, loss-framed streak panic ("your streak dies in 2 hours"), and fake scarcity are manipulative and erode trust on a YMYL page. Points must map to genuine learning progress, never to engagement-for-its-own-sake.
- **UX10 real-cost playground.** Pre-filling worst-case procedure assumptions to inflate the cash number is manipulation. Default to a realistic, cited average and let the user adjust.
- **UX09 microinteractions.** Confetti on a money decision can feel coercive. Keep celebration to learning milestones, not to "you chose a plan."
- **UX08 story.** A character who pushes the plan rather than teaching the concept becomes an advertorial. Keep the character as a guide, not a salesperson.

Honesty principle to enforce site-wide: every number a user sees as a "savings" must be reproducible from disclosed, cited inputs. If we cannot show the math, we do not show the number.

---

## 4. Recommended single coherent learning loop

Adopt exactly three mechanics in this order. Resist adding more; coherence beats coverage.

**LOOP: Learn by doing, prove by recall, see your own stakes.**

1. **Generate (UX02 scenario simulator, the spine).**
   The user is dropped into a concrete case ("you crack a molar, no insurance"). They set a couple of inputs and watch the cost and the relevant glossary term surface in context. This is the generation effect and dual-coding working together. Each term is learned inside a situation, not as a flashcard out of nowhere. Curiosity gap opens here: "what would insurance have done?"

2. **Retrieve (UX03 quiz / flashcards, the retention engine).**
   Immediately after a scenario, a single quick retrieval prompt on the term just encountered ("which term means the cap your plan pays per year?"). One question, not a quiz battery. This is the testing effect applied at the moment of peak encoding. Items the user misses are scheduled to reappear (spaced repetition) on their next visit. This is the honest return trigger.

3. **Apply to self (UX10 real-cost playground, the conversion bridge).**
   After two or three scenarios, invite the user to run their own situation. Their self-generated number (self-reference effect, the strongest memory and motivation booster available) is shown beside the insured number with full disclosure. This is where comparing plans becomes the obvious next step, not a sales push.

Supporting cast, used sparingly:
- **UX04 animated diagram** appears once, inside the simulator, to show a concept moving (von Restorff isolation for the one hardest term, for example deductible vs annual maximum). Not a standalone module.
- **UX09 microinteractions** provide quiet feedback on a correct retrieval. Subtle, not confetti.

Explicitly NOT in the core loop: UX05 XP and UX01 standalone calculator. UX01 is absorbed into UX10. UX05 is replaced by honest progress (see section 5) because point systems on a YMYL page invite manipulation and crowd out intrinsic motivation.

**Reward design:** the reward is competence made visible, not points. After each retrieval the user sees "you now understand 4 of the 9 terms that decide your bill." That is intrinsic (mastery) plus goal-gradient (a visible, honest bar that accelerates near completion). The terminal reward is the personalized cost comparison, which is genuinely useful, not a badge.

---

## 5. Honest retention hooks

Return triggers must give real value, never guilt.

- **Spaced return (honest).** "Three terms are due for a quick refresh" based on real spaced-repetition scheduling of items the user actually missed. This is a true reason to return, not a manufactured streak.
- **Completion (Zeigarnik, honest).** Show a partial bar: "you have mapped 6 of 9 terms that affect your out-of-pocket cost." The open loop pulls return because it is real and finite. Cap it; an infinite XP treadmill is the dishonest version.
- **Streak, only if reframed.** Do not run a panic streak. If a streak exists at all, frame it as a learning record the user owns, with no loss-framed countdown and no penalty for breaking it. A broken streak must never delete progress.
- **Curiosity-gap email or notification (opt-in only).** "You learned what an annual maximum is. The term most people get wrong next is the waiting period." Honest teaser, real next lesson.
- **Goal-gradient finish.** As the user nears all 9 core terms, accelerate visible progress and end with the personalized comparison. Finishing should feel earned and conclusive, not endless.

What we will NOT do: countdown timers, streak-loss panic, variable-ratio loot reveals, confetti on plan selection, inflated cash defaults, or any "savings" number we cannot show the math for. On a YMYL money-and-health page these tactics trade short-term clicks for long-term trust loss, and trust is the actual conversion driver here.
