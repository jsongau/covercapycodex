# UX06 — Compare-Toggle Glossary Game

**Agent:** UX Designer 6 of 10
**Lens:** Before/after, cash vs insured, loss-aversion framing
**Scope:** ANALYZE / DESIGN only. Concrete spec, no full build.
**Constraint:** No em-dashes. Real national fee ranges, no fabricated precision.

---

## 1. Core thesis

People do not learn insurance terms from definitions. They learn them when they
SEE the same procedure cost two different ways and feel the gap. Every concept in
the glossary (out-of-pocket, coinsurance, annual maximum, allowed amount, balance
billing, in-network) is really one story: **the price you are quoted is not the
price you pay, and which one you get depends on a toggle most people never knew
existed.** The game makes that toggle literal.

Loss-aversion is used honestly here. We never invent a scary number. We show the
real out-of-network full fee, the real in-network negotiated fee, and let the
delta speak. The "loss" framing is just the truth that the higher number was
avoidable.

---

## 2. The hero interaction: the In-Network / Out-of-Network toggle

A single procedure card with a physical-feeling toggle. Same crown, two worlds.

```
+-------------------------------------------------------------+
|  PORCELAIN CROWN                                            |
|                                                            |
|   [ In-network ]   ( ( O ) )   [ Out-of-network ]          |  <- toggle
|                                                            |
|   Dentist's full fee ............... $1,300                |
|   PPO allowed amount ............... $900                  |
|   Plan pays (50% coinsurance) ...... -$450                 |
|   -----------------------------------------                |
|   YOU PAY .......................... $450                  |
|                                                            |
|   (no balance bill: dentist agreed to the allowed amount)  |
+-------------------------------------------------------------+
```

Flip the toggle to Out-of-network and the SAME rows recompute and re-animate:

```
+-------------------------------------------------------------+
|  PORCELAIN CROWN                                            |
|                                                            |
|   [ In-network ]   ( O ) )   [ Out-of-network ]            |
|                                                            |
|   Dentist's full fee ............... $1,300                |
|   PPO allowed amount ............... $900                  |
|   Plan pays (50% of allowed) ....... -$450                 |
|   BALANCE BILL (fee minus allowed) . +$400   <-- glows red |
|   -----------------------------------------                |
|   YOU PAY .......................... $850                  |
+-------------------------------------------------------------+
```

The constant rows stay put. Only the **balance bill row** appears, sliding in
and pulsing once. The YOU PAY figure tweens from $450 to $850. A delta chip
animates above it: **+$400, and your plan paid the exact same amount.** That last
clause is the aha. The plan's contribution did not change. The only thing that
changed was whether the dentist had agreed to stop billing past the allowed amount.

### Number sourcing (realistic, national PPO ranges)
- Crown full fee: commonly $1,000 to $1,500 region-dependent. Use $1,300.
- PPO allowed (negotiated) amount: roughly 30 to 40% below full fee. Use $900.
- Major-service coinsurance: standard PPO is 50%. Use 50%.
- These are presented as "typical national ranges, your plan varies," never as a quote.

---

## 3. The second toggle: Cash vs PPO (the value-of-coverage frame)

Same card pattern, different axis. Procedure picker (cleaning, filling, crown,
root canal) feeds one card with a Cash / With PPO toggle.

```
ROOT CANAL (molar)
   [ Cash, no plan ]   ( ( O ) )   [ With PPO ]

   Cash ............................. $1,100 to $1,500
   With PPO (allowed $950, 50%) ..... you pay ~$475
   Plan covered ..................... ~$475
   Annual maximum used .............. $475 of $1,500
```

Toggle to Cash and the "annual maximum" and "plan covered" rows fade to zero and
grey out. The aha line: **Without a plan, there is no allowed amount and no
ceiling. The full retail fee is the whole story.** This is where out-of-pocket,
allowed amount, and annual maximum all get defined in context by what disappears.

---

## 4. Mapping all six concepts to the toggle

Each concept is taught by what the toggle changes or reveals. No standalone
flashcards.

| Concept | Where it lives in the interaction |
|---|---|
| In-network | The toggle itself. Left state = the dentist signed the PPO contract. |
| Allowed amount | A fixed row, same in both states. The "real" price the PPO set. The reveal: it does not move when you flip, so it is the anchor. |
| Coinsurance | The "plan pays 50%" line. Show it is 50% of the ALLOWED amount, not the full fee. Common misconception, big aha. |
| Balance billing | The red row that only exists out-of-network. Defined as full fee minus allowed amount. |
| Out-of-pocket | The YOU PAY total. Animated. It is the sum the user actually feels. |
| Annual maximum | A thin progress bar under the card. Each toggled scenario adds to "used." Teaches that the plan ceiling is finite and crowns eat it fast. |

---

## 5. Loss-aversion, used honestly

Three rules so this stays ethical and on-brand (concierge, not fear-mongering):

1. **Never invent the loss.** The balance bill is computed live from the two real
   numbers on screen. The user can see the arithmetic.
2. **Frame the avoidable, not the catastrophic.** Copy is "this $400 was
   optional" rather than "you could lose thousands." Quiet, factual, luxury tone.
3. **Always pair loss with the exit.** Immediately under the red delta:
   "In-network dentists agreed not to bill you this. CoverCapy only lists offices
   that take your PPO." One honest sentence, links to find-my-dentist.

No countdown timers, no fake urgency, no Capy Crowns in this module (per CLAUDE.md).

---

## 6. Micro-progression and the "score"

Not points. A streak of ahas. After flipping a toggle the first time, a small
ledger fills:

- "You found a balance bill. +$400 avoided in-network."
- Running tally at the bottom: **"Avoidable so far: $400 + $625 = $1,025."**

This is the gamified hook: the user wants to flip every procedure to see how much
the in-network world saves cumulatively. The number is real (sum of computed
deltas), which keeps it honest. End screen: "Across 4 procedures, going in-network
saved $X versus full fees. That is what a PPO network is for."

---

## 7. Vanilla-JS approach (inline, no libraries)

Self-contained, matches the standalone-HTML pattern used in T5 pages.

### Data (inline const, realistic ranges baked as midpoints)
```javascript
var PROCEDURES = [
  { id:'crown', name:'Porcelain crown', fullFee:1300, allowed:900, coins:0.50 },
  { id:'rootcanal', name:'Root canal (molar)', fullFee:1300, allowed:950, coins:0.50 },
  { id:'filling', name:'Composite filling', fullFee:250, allowed:170, coins:0.20 },
  { id:'cleaning', name:'Cleaning + exam', fullFee:200, allowed:130, coins:0.00 }
];
// coins = patient coinsurance share of the allowed amount
```

### Pure compute function (the single source of truth)
```javascript
function compute(p, mode) {
  // mode: 'in' | 'out' | 'cash'
  if (mode === 'cash') {
    return { youPay: p.fullFee, planPays: 0, balanceBill: 0,
             allowed: null, hasBalance: false };
  }
  var planPays = Math.round(p.allowed * (1 - p.coins));
  var patientOnAllowed = p.allowed - planPays;
  var balanceBill = (mode === 'out') ? (p.fullFee - p.allowed) : 0;
  return {
    allowed: p.allowed,
    planPays: planPays,
    balanceBill: balanceBill,
    youPay: patientOnAllowed + balanceBill,
    hasBalance: balanceBill > 0
  };
}
```

### Toggle wiring (event delegation, no framework)
```javascript
var state = { proc:'crown', mode:'in', avoided:0 };

function render() {
  var p = PROCEDURES.find(function(x){ return x.id === state.proc; });
  var r = compute(p, state.mode);
  // 1. write fixed rows (fullFee, allowed) - no transition
  // 2. tween #youPay from old to new with requestAnimationFrame
  // 3. toggle .show on #balanceRow, add .pulse class once
  // 4. update annual-max bar width: (cumulativeUsed / 1500) * 100 + '%'
}

document.querySelector('#toggle').addEventListener('click', function(e){
  var next = e.target.dataset.mode;            // 'in' | 'out'
  if (!next) return;
  // capture the in-network youPay before flipping for the delta chip
  var inPay = compute(currentProc(), 'in').youPay;
  state.mode = next;
  render();
  if (next === 'out') showDeltaChip(compute(currentProc(),'out').youPay - inPay);
});
```

### Animation, CSS only where possible
- Number tween: small `requestAnimationFrame` lerp on the YOU PAY integer.
- Balance row entrance: CSS `max-height` + `opacity` transition, `.pulse`
  keyframe runs once via `animationend` listener that removes the class.
- Annual-max bar: CSS `width` transition on a `--teal-700` fill over `--line`.
- Delta chip: absolutely positioned, fades up 12px, holds 1.4s, fades out.

### Styling tokens (from CLAUDE.md design system)
- Toggle track `--line`, knob `--teal-night`, active label `--teal-700`.
- Balance bill row text `#B4452F`-class warning on `--gold-soft` background
  (use the existing warning treatment, no new colors invented).
- Aha/exit line on `--mint-soft`, link in `--teal-700`.
- Headlines Fraunces, numbers Inter Tight tabular-nums for clean alignment.

### Accessibility
- Toggle is a real `role="switch"` with `aria-checked`, keyboard Space/Enter.
- Number changes announced via `aria-live="polite"` on the YOU PAY container.
- Respect `prefers-reduced-motion`: skip the tween, snap values, no pulse.

### Footprint
One section, one `<style>`, one `<script>`. No fetch, no deps. Drops into the
glossary page or a T-page section exactly like the inline T5 modal pattern.

---

## 8. Disclaimer (required, quiet)

Small print under the module: "Figures shown are typical national PPO ranges for
illustration. Your plan's allowed amounts, coinsurance, and annual maximum vary.
Not a quote." Keeps the loss-aversion honest and legally clean.
