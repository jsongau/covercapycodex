# UX03 — Quiz / Flashcard Testing Effect Mechanic

**Agent:** UX Designer 3 of 10
**Scope:** ANALYZE and DESIGN only. Concrete spec, no full build.
**Mechanic family:** Lightweight quiz / flashcard using the testing effect plus immediate feedback.
**Target surface:** Each of the 23 glossary term pages at `/guides/glossary/{slug}/`, plus a cross-page "terms mastered" streak.

---

## 1. The core idea (read this first)

A glossary term is read passively. Reading does almost nothing for retention. Retrieval does. The testing effect says that the act of recalling an answer, even getting it wrong then seeing the fix, cements the concept far better than re-reading the definition.

So after each term's prose, we drop a 2 to 3 question "Quick check" card. The patient answers, gets instant right or wrong feedback plus a one-line plain-English explanation, and a small "terms mastered" tally ticks up the first time they get a clean pass on a term. The tally rides along across pages so reading three or four terms feels like climbing a short ladder, not skimming a dictionary.

This is deliberately tiny. No accounts, no scores leaderboard, no timers. Two or three taps per term. The reward is the satisfying click of "I actually knew that."

---

## 2. Question formats

Three formats only. Keep the surface tiny and the authoring sane. Every term gets 2 to 3 questions drawn from these.

### Format A — Single best answer (multiple choice, 3 options)
The workhorse. Concept recognition.

> **Which type of service does a PPO usually cover from day one with no waiting period?**
> - Crowns and root canals
> - Cleanings, exams, and X-rays  ✓
> - Implants
>
> *Preventive care (cleanings, exams, X-rays) is almost always 100% from day one. Major work like crowns is what usually sits behind a 6 to 12 month wait.*

### Format B — True or false
Fastest possible retrieval. Good for misconception-busting.

> **True or false: hitting your annual maximum means your dental coverage is gone for good.**
> - True
> - False  ✓
>
> *False. The cap just empties for the rest of that benefit year. It refills in full when your plan year resets.*

### Format C — Number / "do the math" (tap the right figure)
This is the format that earns its keep. PPO pain is arithmetic, so we make patients do one small calculation and feel the cap bite. Presented as 3 to 4 tappable number tiles, NOT a free text field (free text invites typos and parsing pain in vanilla JS, and number tiles still force genuine retrieval of the rule).

> **Your annual maximum is $1,000. A crown's plan-allowed amount is $1,200 and the plan pays 50%. The plan can only pay up to what is left of your cap. How much of that $1,200 lands on you?**
> - $600
> - $700  ✓
> - $1,200
>
> *The plan would owe 50% = $600, but your $1,000 cap is the ceiling on what it can ever pay, and a crown alone does not exhaust it. Here the plan pays its $600 share, you pay the other $600 plus... wait, re-read: see note below on authoring accuracy.*

**Authoring accuracy note (load-bearing, do not skip):** Format C questions MUST be arithmetic-checked by the author against real PPO mechanics before they ship, because it is easy to write a plausible-but-wrong money question. Use this vetted pair instead of the sketch above:

- **Cap question (annual-maximum page):** "Your plan has already paid out $900 of a $1,000 annual maximum this year. A filling's allowed amount is $200 and the plan pays 80%. The plan would normally pay $160, but only $100 of your cap is left. What does the plan actually pay?" → **$100** (cap is the ceiling). *You then owe the other $100 yourself, on top of anything past the allowed amount.*
- **Coinsurance question (coinsurance page):** "A crown's plan-allowed amount is $1,000 and your plan covers major work at 50%, cap not yet reached. What is your coinsurance share?" → **$500**. *Note this is 50% of the allowed amount, not 50% of the dentist's full charge, which can be higher.*

Rule for all Format C: the math must resolve to one of the offered tiles exactly, and the explanation must state the rule that produced it (cap ceiling, allowed-amount basis, deductible-first ordering).

---

## 3. Per-term question coverage (the 23 terms)

Each term page carries a hand-authored `questions` array. The format mix is chosen per term so the question tests the single thing patients get wrong about that term. Suggested anchors:

| Term | Q1 format | Tests |
|------|-----------|-------|
| annual-maximum | C (cap math) | cap is a ceiling on plan payment, not on your spending |
| deductible | A | you pay it first; waived for preventive |
| coinsurance | C (50% of allowed) | share is of allowed amount, not full charge |
| waiting-period | B | active coverage is not the same as payable coverage |
| effective-date | B | start date vs when major work pays |
| day-one | A | which categories are immediately payable |
| in-network | A | "accepts carrier" is not "in-network" |
| out-of-pocket | A | OOP = deductible + coinsurance + over-cap |
| allowed-amount | C | coinsurance computed from allowed amount |
| balance-billing | B | in-network dentists cannot balance-bill |
| missing-tooth | B | excludes a tooth missing before coverage began |
| calendar-year | A | resets Jan 1 |
| plan-year | A | resets on enrollment anniversary, not Jan 1 |
| coverage-preventive | A | 100%, no wait, no deductible |
| coverage-basic | A | often 80%, sometimes after short wait |
| coverage-major | A | usually 50%, often 12-month wait |
| implants | B | missing-tooth clause often applies |
| whitening | B | rarely covered |
| ppo | A | see any dentist, pays more in-network (vs HMO/DMO) |
| predetermination | A | pre-treatment written estimate |
| cdt | A | standardized procedure code carriers price by |
| rating / vision | A | tie to CoverCapy plan features accurately |

Each term gets 2 to 3 questions total; Q2 and Q3 reinforce with a second format. Authors pull facts straight from `assets/ppo/glossary.json` and the term brief so answers stay consistent with the live tooltips and our plans.

---

## 4. Feedback UI

The feedback IS the learning moment, so it gets the most design care.

- **Tap to answer, no submit button.** Tapping an option commits it. One fewer step, faster retrieval loop.
- **Instant state on the tapped tile:**
  - Correct: tile gets `--mint-soft` fill, a left mint rule, and a small check glyph. Subtle, not a confetti blast.
  - Wrong: tapped tile gets a soft `--gold-soft` fill and a small cross. The correct tile then also lights with the mint check so the right answer is never left ambiguous.
- **One-line explanation reveals below the options** on any answer, correct or wrong. This is non-negotiable and is where retention is actually built. Plain language, no em-dashes, names the rule.
- **Options lock after first tap** for that question (no answer-shopping). A faint "Why" line stays visible.
- **Progress dots** above the card: `● ● ○` showing question 1 of 3 done, 2 of 3, etc. Advancing is manual via a small "Next" link so the patient reads the explanation before moving on.
- **Term completion ribbon:** when all questions on the term are answered, a slim bar appears: "Annual maximum: locked in. Terms mastered: 4." A term counts as mastered if every question was answered (we reward completion and engagement, not perfection, since wrong-then-explained still teaches). A separate subtle "first-try" tick can mark perfect runs without gating mastery.

Visual system uses existing CoverCapy tokens only: `--teal-night`, `--teal-700`, `--mint`, `--mint-soft`, `--cream-card`, `--gold-soft`, `--line`, `--ink`, `--ink-soft`. Fraunces for the question headline, Inter Tight for options and explanations. No gradients, no glassmorphism, no countdown timers, no em-dashes, no roman numerals.

---

## 5. Scoring and the cross-page streak

Keep it human-scale. Two numbers only:

1. **Terms mastered** — count of distinct terms where every question was answered. This is the headline number. Caps at 23.
2. **First-try ticks** (secondary, optional display) — distinct terms answered perfectly on the first tap of every question. Bragging rights, never a gate.

**Milestone nudges** at 3, 8, and all 23 mastered:
- 3: "You have the basics down. See how they stack into a plan." links to `/compare-ppo-dental-plans`.
- 8: "You now read a plan summary better than most agents."
- 23: "Glossary cleared. Find a dentist who takes your PPO." links to `/find-my-dentist`.

These milestones are the conversion bridge: mastery earns a soft, relevant CTA, never an interstitial.

---

## 6. Vanilla JS approach (inline, no libraries, no localStorage)

Constraints from CLAUDE.md and the brief: inline only, no external libs, no localStorage. So streak state lives **in the URL query string**, carried forward through internal links. This is the whole trick.

### State model
A single compact param, `m` (mastered) and optional `f` (first-try), encoded as a base36 bitmask over a fixed 23-term index order. Bit `i` set = term `i` mastered.

```
/guides/glossary/coinsurance/?m=1a&f=02
```

- `TERM_INDEX` is a frozen array of the 23 slugs in canonical order. Bit position = array index. Order is locked so masks stay stable across the site.
- On page load, parse `m` from the URL into an in-memory `Set` of mastered slugs. If absent, empty.
- The current page's own questions update the in-memory Set when completed.
- **Link rewriting:** on load and after each mastery change, walk all internal anchors (`a[href^="/guides/glossary/"]`, plus the milestone CTA links) and append or refresh `?m=...&f=...` so the streak rides along when the patient clicks to the next term. This is how state survives a full page navigation with no storage.

### Sketch (illustrative, ~40 lines, no libraries)

```js
(function () {
  var TERM_INDEX = ["annual-maximum","deductible","coinsurance","waiting-period",
    "effective-date","day-one","in-network","out-of-pocket","allowed-amount",
    "balance-billing","missing-tooth","calendar-year","plan-year","coverage-preventive",
    "coverage-basic","coverage-major","implants","whitening","ppo","predetermination",
    "cdt","rating","vision"]; // frozen 23-term order

  function maskToSet(str) {
    var set = {}; if (!str) return set;
    var n = parseInt(str, 36); if (isNaN(n)) return set;
    TERM_INDEX.forEach(function (slug, i) { if (n & (1 << i)) set[slug] = 1; });
    return set;
  }
  function setToMask(set) {
    var n = 0;
    TERM_INDEX.forEach(function (slug, i) { if (set[slug]) n |= (1 << i); });
    return n.toString(36);
  }

  var params = new URLSearchParams(location.search);
  var mastered = maskToSet(params.get("m"));      // in-memory truth
  var firstTry = maskToSet(params.get("f"));

  function masteredCount() { return Object.keys(mastered).length; }

  function propagate() {                            // rewrite internal links
    var m = setToMask(mastered), f = setToMask(firstTry);
    document.querySelectorAll('a[href^="/guides/glossary/"], a[data-streak]')
      .forEach(function (a) {
        var u = new URL(a.href, location.origin);
        u.searchParams.set("m", m);
        if (f !== "0") u.searchParams.set("f", f);
        a.href = u.pathname + u.search;
      });
    document.querySelectorAll("[data-mastered-count]")
      .forEach(function (el) { el.textContent = masteredCount(); });
  }

  // called by the quiz UI when this term's questions are all answered
  window.ccQuizComplete = function (slug, perfect) {
    mastered[slug] = 1;
    if (perfect) firstTry[slug] = 1;
    history.replaceState(null, "", location.pathname + "?m=" + setToMask(mastered)
      + (Object.keys(firstTry).length ? "&f=" + setToMask(firstTry) : ""));
    propagate();
  };

  document.addEventListener("DOMContentLoaded", propagate);
})();
```

### Per-question handler (sketch)
Each option button carries `data-correct` on the right one. A small handler locks the question on first tap, paints correct/wrong via the token classes, reveals the explanation, and when the last question on the page resolves it calls `window.ccQuizComplete(slug, allPerfect)`.

### Why URL state, not localStorage
- localStorage is forbidden by the brief.
- URL state is shareable and survives the static, no-JS-build Vercel deploy with zero backend.
- It degrades gracefully: strip the param and you simply start a fresh streak. No errors, no broken pages.
- Bitmask keeps the URL short (worst case `?m=` is about 5 base36 chars for all 23 bits), so it never looks ugly or hits length limits.

### Graceful degradation / accessibility
- With JS off, the questions render as a plain readable list with the correct answer marked, so the page is still a valid, crawlable glossary. The interactive scoring is pure enhancement.
- Buttons are real `<button>` elements with `aria-pressed`; explanation reveals via `aria-live="polite"` so screen readers hear the feedback.
- No reliance on hover; everything is tap and keyboard reachable.

---

## 7. Build notes for the implementer (not part of this design task)
- Author all questions and explanations in a per-term inline `<script type="application/json">` block or a small JS array so they live with the page and ship statically.
- Re-verify every Format C money question by hand before publish. Wrong arithmetic on a money question destroys trust faster than no quiz at all.
- Keep every explanation under one line and free of em-dashes, roman numerals, and Capy Crowns, per house copy rules.
- Reuse `assets/ppo/glossary.json` def and why strings as the source of truth so quiz answers never drift from the tooltips or our plan facts.
