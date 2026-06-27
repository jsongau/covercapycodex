# UX01 — Interactive Calculator / Live Slider

## Glossary Game Redesign | UX Designer 1 of 10

**Style mandate:** Self-contained interactive widgets that teach a PPO concept by letting the user drag inputs and watch real dollar figures recompute in real time. The teaching happens in the gap between what the user *expects* the number to be and what it *actually* lands on.

**Constraints honored:** Vanilla JS only, no libraries, inline on a static page, no localStorage, no em-dashes, CoverCapy design tokens (teal-night, mint, cream-card, ink). All math is accurate to standard PPO mechanics.

---

## Concept selection

These three glossary terms fit the live-slider style best because each has a continuous input that maps to a dollar output the user cares about:

1. **Deductible plus Coinsurance** (best fit, the flagship widget)
2. **Annual Maximum** (a depleting meter, naturally gamified)
3. **The 100 / 80 / 50 Coverage Tiers** (a category picker that reveals the split)

A fourth term, **Out-of-Pocket**, is covered as the live total readout shared by all three rather than its own widget, since it is the sum the others produce.

---

## WIDGET 1 — "Your Real Out-of-Pocket" (Deductible + Coinsurance)

### What it teaches
That insurance paying "80 percent" does not mean you pay 20 percent of the bill. You pay the deductible first, in full, and only then does coinsurance apply to the remainder. Most people overestimate what the plan covers on the first visit of the year.

### The interaction
- **Slider A — Treatment cost:** $0 to $4,000, step $50. Labeled with example procedures at anchor points (cleaning ~$150, filling ~$250, crown ~$1,200, root canal ~$1,500).
- **Slider B — Deductible:** $0 to $200, step $25. Default $50. Tooltip: "What you pay before the plan starts sharing."
- **Slider C — Coinsurance (plan pays):** 50 / 80 / 100 as three snap buttons, not a free slider, because real PPO tiers are discrete. Default 80.
- **Toggle — "Deductible already met this year?"** When on, the deductible is skipped (teaches the calendar-year reset concept by reference).

### What updates live
A stacked horizontal bar splits the treatment cost into three colored segments that resize as sliders move:
- **Deductible (you pay)** in gold-soft
- **Your coinsurance share** in teal-300
- **Plan pays** in mint-soft

Below the bar, three big numbers count up/down with a short tween:
- **You pay:** `deductible + (cost - deductible) * (1 - coinsuranceRate)`
- **Plan pays:** `(cost - deductible) * coinsuranceRate`
- **Effective coverage:** `planPays / cost` shown as a percent

### The math (accurate PPO)
```
applied = min(cost, deductibleRemaining)   // deductible cannot exceed the bill
afterDeduct = cost - applied
planPays   = afterDeduct * coinsuranceRate
youPay     = applied + (afterDeduct - planPays)
```

### The "aha" moment
Set cost to $1,200 (a crown), coinsurance to 80, deductible to $50. The user expects to pay $240 (20 percent). The widget shows **$280**, and the "effective coverage" readout reads **76.7 percent**, not 80. A caption fades in: "Your deductible always comes out of your pocket first. That is why 80 percent coverage rarely means you pay only 20 percent."

### Micro-gamification
A persistent ribbon: **"The plan covered $X of this treatment."** When effective coverage crosses 90 percent (high cost, low deductible), a small mint check animates in with "Now the deductible barely matters, this is why the big bills are where a PPO earns its keep." No points, no streaks, just the dollar figure as the reward.

---

## WIDGET 2 — "Annual Maximum Meter" (depleting bucket)

### What it teaches
That the annual maximum is a hard ceiling on what the *plan* pays per year, not what *you* pay, and that it refills on the calendar-year reset. Once it is empty you are at full price even with active coverage.

### The interaction
- A **bucket meter** preset to a typical annual maximum (default $1,500, adjustable $1,000 to $2,500 via a small slider).
- A **row of treatment chips** the user taps to "add to the year": Cleaning ($0 net, preventive at 100 percent), Filling, Crown, Root Canal, Implant. Each tap drops the meter by the *plan-paid* portion of that procedure (reusing Widget 1 math so the two stay consistent).
- A **Reset year** button that visibly refills the bucket (teaches calendar-year reset).

### What updates live
- The bucket drains with a liquid-fill animation; remaining headroom shown as a number.
- When a treatment would exceed the remaining maximum, the bar splits: the covered slice in mint, the **overflow slice in red**, with a callout "Plan maximum reached. You pay this part in full: $X."

### The "aha" moment
Stack a crown plus a root canal plus an implant. The meter hits zero partway through the implant and the user watches a chunk flip to full price. Caption: "Your coverage did not stop because you did something wrong. The plan simply paid all it pays this year. It refills in January."

### Micro-gamification
A running tally: **"Used $X of $1,500. Saved $Y so far this year."** Hitting exactly $0 remaining triggers a dry "Maxed out" stamp rather than a celebration, since that is the cautionary lesson.

---

## WIDGET 3 — "The 100 / 80 / 50 Split" (category reveal)

### What it teaches
Why dental plans sort procedures into Preventive (100), Basic (80), and Major (50), and that picking the wrong mental category leads to bill shock.

### The interaction
- **Three category cards:** Preventive, Basic, Major. Each is a button.
- A **procedure dropdown or chip strip.** When the user picks a procedure, the widget *quizzes first*: "Which tier covers a crown?" Three tappable category buttons. After they guess, the correct card lights up and the per-procedure split bar animates in.

### What updates live
- The chosen category card scales up and fills with its tier color.
- A mini split bar shows plan-pays vs you-pay for a sample $1,000 bill at that tier (100 = $0 you, 80 = $200 you, 50 = $500 you), reusing Widget 1 math with deductible set to met for simplicity.

### The "aha" moment
Most users guess a crown is "Basic." It is "Major" at 50 percent. The reveal shows their out-of-pocket doubling versus what they assumed. Caption: "Cleanings are free to encourage prevention. The expensive work sits at 50 percent, which is exactly where a strong PPO network and negotiated rates matter most."

### Micro-gamification
Lightweight quiz score: **"3 of 5 tiers correct."** Resets per session (no localStorage). A perfect run shows "You read plans like a pro" with a soft mint flourish.

---

## SHARED HTML / CSS / JS APPROACH

### Markup pattern (one self-contained block per widget)
```html
<section class="cc-calc" data-widget="oop">
  <div class="cc-calc__controls"><!-- sliders, snap buttons, toggles --></div>
  <div class="cc-calc__bar" aria-hidden="true"><!-- 3 flex segments --></div>
  <div class="cc-calc__readout">
    <output class="cc-calc__you">$0</output>
    <output class="cc-calc__plan">$0</output>
    <output class="cc-calc__pct">0%</output>
  </div>
  <p class="cc-calc__aha" hidden></p>
  <p class="cc-calc__ribbon"></p>
</section>
```

### CSS
- Layout with flexbox; bar segments use `flex-basis` percentages set inline from JS so the split animates via `transition: flex-basis .3s ease`.
- Colors strictly from tokens: `--gold-soft` (deductible), `--teal-300` (coinsurance), `--mint-soft` (plan pays), `--ink` text, `--cream-card` panel background, `--line` borders.
- Fraunces for the big dollar readouts, Inter Tight for controls and captions. No gradients, no glassmorphism.
- Native `<input type=range>` styled with the mint thumb. Snap buttons are real `<button>` elements with `aria-pressed`.

### JS (vanilla, no deps, no storage)
- One `init(section)` per widget, found by `document.querySelectorAll('.cc-calc')` and dispatched on `data-widget`. Keeps multiple widgets on one glossary page isolated.
- Single `recalc()` per widget reads control state, runs the PPO math object, writes segment widths and readouts. No frameworks, no virtual DOM, just `el.textContent` and `el.style.flexBasis`.
- Number tween: a tiny `animateValue(el, from, to, 350ms)` using `requestAnimationFrame` for the count-up feel. Optional, degrades gracefully to instant set.
- Aha captions are pre-written in the markup and toggled `hidden` by threshold checks inside `recalc()`. No content generated at runtime, so it stays accurate and reviewable.
- Fully keyboard accessible: ranges and buttons are native, readouts use `<output>` with `aria-live="polite"` so screen readers hear the new total.
- Total footprint target: under 6KB JS plus under 3KB CSS per page, inlined so it works on any static `dental/` or glossary page with no network calls.

### Accuracy guardrails
- Coinsurance is always discrete (50/80/100), never a free slider, because real plans do not offer arbitrary percentages.
- Deductible is capped at the bill via `min(cost, deductible)` so the math never goes negative on small claims.
- Preventive is hard-coded to skip the deductible in Widget 3, matching how most PPOs waive the deductible on Class I services.
- Annual maximum drains by plan-paid dollars only, never by patient dollars, which is the single most common misconception the meter exists to fix.

---

## ROLLOUT NOTE
Build Widget 1 first. It is the spine: its math object (`computeOOP`) is imported by Widgets 2 and 3, so one verified calculation powers all three and the numbers can never disagree across the glossary.
