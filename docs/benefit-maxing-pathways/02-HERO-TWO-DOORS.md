# 02: The Header, Two Doors
### The hero redesign that asks one question and opens two paths
*Copy in file 05. Routing in file 06. Tokens from the existing Benefit Maxing build.*

---

## The job

The current hub hero lands one reframe and points at the estimator. The new hero does one more thing first: it asks whether the treatment can wait, and shows two doors. The visitor picks the door that fits, and each door is a real, useful path.

This is not a quiz with a single right answer. Both doors are correct for the person who belongs behind them.

---

## Layout

Keep the dark teal hero. Above or beside the headline, present two cards side by side on desktop, stacked on mobile.

```
[ dark teal hero ]
  eyebrow: Benefit Maxing, a CoverCapy program
  H1: the reframe in plain language
  short subhead: one question decides your path. Can the treatment wait?

  +-------------------------------+   +-------------------------------+
  |  DOOR A: Care now            |   |  DOOR B: Plan ahead          |
  |  The treatment cannot wait.   |   |  You have real work ahead     |
  |                               |   |  and a few months to time it. |
  |  Use a plan that pays now,    |   |  Use a bigger maximum, wait   |
  |  then spread the rest into    |   |  out the waiting period, let  |
  |  monthly payments.            |   |  the plan pay far more.       |
  |                               |   |                               |
  |  CTA: See the care-now path   |   |  CTA: See the planning path   |
  +-------------------------------+   +-------------------------------+

  quiet line under both: Not sure which fits? Estimate your cost first and the number will tell you.
```

Each door CTA scrolls to that pathway's section lower on the page, or deep-links into the estimator with the pathway in the query string. Both are acceptable. Scrolling first lets the reader understand the path before committing.

---

## Behavior

- Door A and Door B are equal in visual weight. Neither is styled as the recommended one. The page does not push the more expensive plan.
- On hover, each door lifts slightly. No arrows in the labels.
- The quiet line below is the escape hatch for the undecided: send them to the estimator, which sorts them by showing real numbers.
- On mobile, the doors stack, Door A first since "care now" is the more urgent and more common entry. The third escape line stays directly beneath.

---

## What each door opens to

- **Door A** scrolls to the Care Now section: the low-maximum plan, what it covers immediately, the bridge plan for urgent major work, and the 0% financing handoff. Plan CTA points at UHC Primary Dental, with Ameritas offered for urgent major work.
- **Door B** scrolls to the Strategize section: the high-maximum plan, the waiting period explained as a feature not a flaw, the big-maximum payoff, the two-maximum amplifier, and the 0% financing handoff for the copay. Plan CTA points at Humana Extend 5000.

---

## Why two doors beats one message

A single hub message has to hedge for every reader, which makes it vague. Two doors let each path speak plainly to the person it fits. The care-now reader hears speed and a flat monthly cost. The planner hears patience and a large maximum. Neither has to wade through the other's argument. The result reads like a knowledgeable operator sorting a patient to the right answer, which is exactly the voice the writing rules call for.
