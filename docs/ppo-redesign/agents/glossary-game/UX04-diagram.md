# UX04 — Animated Infographic / Visual Money-Flow Model

UX Designer 4 of 10. Mandate: design a visual, animated diagram that makes an abstract money-flow concept click. Two deliverables specced below. ANALYZE and DESIGN only, no full build. Concrete enough to hand to an engineer.

Constraints honored: vanilla JS, inline SVG and CSS, no libraries, no em-dashes, accessible beyond color alone, numbers accurate to standard US PPO dental mechanics.

Design tokens reused from CLAUDE.md: `--teal-night #082A30`, `--teal-700 #14525B`, `--mint #5BE0A0`, `--mint-soft #E6F7EE`, `--gold-soft #F3E8CF`, `--cream #F6F0E6`, `--ink #082A30`, `--ink-soft #56655F`, `--line #E8E2D8`. Fraunces for headlines, Inter Tight for UI and numbers.

---

## DIAGRAM A — "The Crown Splitter" (bill-flow model)

The headline interaction. A single $1,200 crown enters the top and flows down through three gates: deductible, then coinsurance, then the annual maximum cap. At each gate the bill physically splits into two streams, an insurance stream (teal) and a you-pay stream (gold). The user watches money divide.

### Scenario (locked, accurate defaults)

| Variable | Value |
|---|---|
| Procedure | Crown (a Major service, 50 percent tier) |
| Total billed (in-network negotiated) | 1,200 |
| Annual deductible | 50 |
| Deductible already met this year | 0 |
| Coinsurance for Major | plan pays 50 percent, you pay 50 percent |
| Annual maximum | 1,500 |
| Used toward annual max so far | 1,000 (so 500 of headroom remains) |

### The math, step by step (this is what the animation narrates)

1. Bill arrives: 1,200.
2. Deductible gate: you pay the first 50 out of pocket. Remaining bill subject to coinsurance = 1,150.
3. Coinsurance gate: of that 1,150, plan pays 50 percent = 575, you pay 50 percent = 575.
4. Annual max gate: plan wanted to pay 575, but only 500 of annual maximum remains. Plan pays 500. The unpaid 75 rolls onto you.
5. Final tally:
   - Insurance pays: 500
   - You pay: 50 (deductible) + 575 (your coinsurance share) + 75 (over the cap) = 700

The annual-max gate is the "aha" most people never see coming. We deliberately tuned the scenario so the cap actually bites. A clean run with full headroom is offered as a second toggle so users see both outcomes.

### What animates

- A coin-stack / liquid-bar hybrid. The 1,200 starts as a single vertical bar at the top, labeled with a live-counting dollar figure.
- At each gate the bar passes through a horizontal "gate" line and splits. A teal slice peels left (insurance), a gold slice peels right (you). Slices travel down their respective rails and accumulate in two totals trays at the bottom: INSURANCE PAYS and YOU PAY.
- Each gate lights up in sequence with a short label callout. The deductible gate carves off a small gold chip (50). The coinsurance gate does the dramatic 50/50 split. The annual-max gate shows a hard ceiling line; the teal stream hits it, the excess 75 turns gold and reroutes to the you-pay tray. That reroute is the money shot.
- The two bottom trays count up with the running totals so the final 500 / 700 lands with weight.

### User control

Primary: STEP. A single "Next" button advances one gate at a time (Bill, Deductible, Coinsurance, Annual Max, Total). Replaces autoplay so users control pace and can re-read.

Secondary: SCRUB. A range slider (0 to 4) maps to the same five stages, so a confident user can drag back and forth. Step buttons and slider are bound to one `stage` state variable, so they stay in sync.

Toggle: "What if the cap had room?" flips annual-max-used from 1,000 to 0, re-runs the math (insurance 575, you 625), and re-animates. Lets users feel the cap's effect by removing it.

Reduced motion: if `prefers-reduced-motion`, slices snap to position with no travel tween and totals set instantly. All labels and final numbers identical.

### Labels and copy (no em-dashes)

- Top: "One crown. $1,200. Here is who pays what."
- Gate 1 caption: "Deductible. You cover the first $50 yourself before the plan helps."
- Gate 2 caption: "Coinsurance. Major work is the 50 tier, so the plan splits the rest 50/50."
- Gate 3 caption: "Annual maximum. Your plan caps what it pays per year at $1,500. You have used $1,000, so only $500 is left. The plan pays $500 and the extra $75 falls to you."
- Insurance tray: "Plan pays" with live total.
- You-pay tray: "You pay" with live total.
- Footer aha: "The cap is why this crown cost you $700 and not $625. Verify your remaining annual maximum before major work."

### Accessibility (not color only)

- Each stream carries an icon and a text label, not just teal vs gold. Insurance slices are solid with a check-shield glyph; you-pay slices use a diagonal hatch pattern (SVG `<pattern>`) plus a wallet glyph. The hatch makes the two readable in grayscale and for color-vision deficiency.
- Live region: a visually shown and `aria-live="polite"` caption updates on every stage so a screen reader announces "Stage 3 of 4, Annual maximum. Plan pays 500, you pay 700 so far."
- The whole figure has an adjacent `<table>` (can be visually collapsed under a "See the numbers" toggle) listing each line of the math. Screen reader users and skeptics both get the exact arithmetic.
- Focus order: Step, Scrub, Toggle, See-the-numbers. All keyboard reachable, slider is a native `<input type=range>`.

### Vanilla JS / SVG / CSS approach

- One inline `<svg viewBox="0 0 480 520">`. Bars and slices are `<rect>` elements. Heights are derived from a single `SCALE = px per dollar` constant so geometry stays honest (a 575 slice is visibly larger than a 75 slice).
- State: `let stage = 0; let capHasRoom = false;`. A pure `computeSplit(capHasRoom)` function returns the per-stage figures. No DOM math in the renderer.
- `render(stage)` sets rect `y`, `height`, `width` and toggles a `.is-active` class on the current gate group. CSS handles the motion: `rect { transition: transform .5s cubic-bezier(.2,.7,.2,1), height .5s, opacity .3s; }`. Slices translate via `transform: translate()` so we animate transform, not layout, for smoothness.
- Counting totals: a tiny `requestAnimationFrame` tween lerps the displayed integer from old to new over ~500ms. Guarded by the reduced-motion check.
- Hatch pattern defined once in `<defs>`: `<pattern id="youHatch" .../>`, referenced as `fill="url(#youHatch)"`.
- No external assets. Glyphs are inline `<path>` or simple unicode in `<text>`.

---

## DIAGRAM B — "The Coverage Ladder" (100 / 80 / 50 tier model)

A three-rung ladder that explains why a cleaning is free but a crown is not. Each rung is a service category with its coverage percentage shown as a filled portion of the rung.

### Content (accurate categories)

| Rung | Category | Plan pays | Examples |
|---|---|---|---|
| Top | Preventive | 100 percent | Cleanings, exams, routine x-rays |
| Middle | Basic | 80 percent | Fillings, simple extractions |
| Bottom | Major | 50 percent | Crowns, bridges, dentures, root canals |

Note shown near the ladder: "These percentages apply after any deductible and only up to your annual maximum." This keeps Diagram B honest and links it to Diagram A.

### What animates

- On load (or on first scroll into view via `IntersectionObserver`), each rung fills left to right with a teal "plan pays" portion to its percentage, the remainder staying gold "you pay". Fills stagger top to bottom, 120ms apart, so the eye reads preventive first.
- Hovering or focusing a rung expands it: the examples slide in and a small worked figure appears ("A $200 filling: plan pays $160, you pay $40"). One rung expanded at a time.

### User control

- Hover on desktop, tap or focus on touch and keyboard. Each rung is a `<button>` for free keyboard and screen reader support.
- Optional scrub: a single slider labeled "Drag to see a bill at each tier" that sets a sample bill amount (50 to 1500) and recomputes the per-rung split live, so users plug in their own number.

### The aha

"Coverage is tiered by how routine the work is. The plan fully covers what keeps you healthy and pays less as the work gets bigger. That is why preventive visits are the best deal in the plan."

### Accessibility (not color only)

- Each rung shows its percentage as text ("Plan pays 100 percent") inside the bar, not implied by fill alone.
- Teal fill uses the same shield glyph, gold uses the hatch pattern from Diagram A for consistency and grayscale legibility.
- Rungs are buttons with `aria-expanded`. The worked example is in an `aria-live` region.

### Vanilla JS / SVG / CSS approach

- Could be pure CSS plus HTML. Each rung is a `<div class="rung">` with a `<span class="fill">` whose width is set by a CSS custom property `--pct`. `IntersectionObserver` adds a `.in-view` class that transitions width from 0 to `var(--pct)`.
- The slider path uses the same `computeSplit` style pure function (just deductible-free, tier percent times bill) and writes results into each rung's live region.
- Stagger via `transition-delay` keyed off rung index. Reduced motion sets delays and durations to 0.

---

## How the two diagrams relate

Diagram B teaches the percentages. Diagram A shows those percentages colliding with the deductible and the annual maximum on a real bill. Recommended page order: Ladder first (concept), Splitter second (consequence). The Splitter footer links back up: "The crown is in the 50 tier. See the ladder."

## Build sequencing for engineering

1. Ship the shared `<defs>` (hatch pattern, shield glyph) and design tokens once.
2. Build `computeSplit()` as a tested pure function. It powers both diagrams and the slider. Verify the five-stage tally equals 500 / 700.
3. Build Diagram B (simpler, mostly CSS) to validate tokens and accessibility patterns.
4. Build Diagram A on top of the proven `computeSplit` and the shared defs.

## Accuracy caveats to keep the copy defensible

- Real plans vary: some put endo and perio in Major, some have separate categories, some apply deductible only to Basic and Major (not Preventive). Our scenario uses the common case and we say "your plan may differ" in fine print.
- Deductible typically does not apply to Preventive. Diagram B's note and Diagram A's preventive examples should reflect that if extended.
- Coinsurance is computed on the plan's negotiated (in-network) fee, not the dentist's list price. The 1,200 is the negotiated amount. Out-of-network would compute on a lower allowed amount and bill you the balance, a natural Diagram C if we extend.
