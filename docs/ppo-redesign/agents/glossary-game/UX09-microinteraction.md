# UX09 — Microinteraction / Progressive Reveal / Annotation

**Designer voice:** UX Designer 9 of 10. Subtle, delightful microinteractions that reward curiosity and aid retention. No big game, no levels, no timers. The "game" is the act of reading a real document where every line is a discoverable hotspot.

**Scope:** ANALYZE / DESIGN only. Concrete spec. No full build. No em-dashes anywhere in copy. All 23 glossary terms mapped.

---

## 1. CORE CONCEPT — "Read your own EOB, every line is a hotspot"

The centerpiece is a faithful recreation of a real **Explanation of Benefits (EOB)** plus a companion **insurance member ID card**. These are the two documents a patient actually holds in their hands. Every meaningful number, label, and line on those documents is an interactive hotspot that, on hover or tap, reveals the glossary term it represents, the plain definition, and a "show me on the math" example.

The retention bet: people forget definitions read in a list. They remember a number they found themselves on a bill that looks like theirs. We turn passive reading into active recall through a **curiosity gap** (a faint dotted underline that says "there is something here you do not know yet") and a **reveal** that closes the loop.

Two surfaces, because the 23 terms split cleanly across them:

- **Surface A — the EOB statement** carries the money-and-process terms (15 hotspots).
- **Surface B — the member ID card + a small "plan summary" strip** carries the coverage-and-plan terms (8 hotspots).

A segmented control flips between "Your bill (EOB)" and "Your card and plan." The flip itself is a microinteraction (see section 5).

---

## 2. HOTSPOT MAP — all 23 terms anchored to a document element

### Surface A — Explanation of Benefits (sample)

Sample EOB modeled on a single crown claim plus a cleaning, so the numbers tell a story.

| # | Term | Anchored to (EOB line / element) | Sample value on the doc |
|---|------|----------------------------------|--------------------------|
| 1 | **PPO** | Plan type field in the header | "Plan type: PPO" |
| 2 | **In-network dentist** | Provider row, "Network status" cell | "In-network" |
| 3 | **CDT codes** | Procedure code column | "D2740", "D1110" |
| 4 | **ADA fee schedule** | "Dentist's submitted fee" column header | $1,450 submitted |
| 5 | **Allowed amount** | "Plan allowed amount" column | $980 allowed |
| 6 | **Balance billing** | The gap line between submitted and allowed, with a "in-network: you owe $0 of this" tag | $470 difference, written off |
| 7 | **Deductible** | "Deductible applied" line | $50 applied |
| 8 | **Coinsurance** | "Plan pays 50 percent / you pay 50 percent" split row | 50 percent on major |
| 9 | **Annual maximum** | "Benefit used to date / remaining" meter | $1,500 max, $465 used |
| 10 | **Out of pocket** | "Patient responsibility" total (the bold bottom-line number) | $515 |
| 11 | **Preventive care** | The cleaning line (D1110), paid at 100 percent | $0 patient cost |
| 12 | **Basic services** | Footnote tier legend, "Basic 80 percent" | tier row |
| 13 | **Major services** | The crown line tier tag, "Major 50 percent" | tier row |
| 14 | **Missing tooth clause** | A denied/excluded line item with reason code | "Not covered: pre-existing" |
| 15 | **Calendar year reset** | "Benefits reset 01/01" stamp near the max meter | reset date |

### Surface B — Member ID card + plan summary strip

| # | Term | Anchored to (card / strip element) | Sample value |
|---|------|------------------------------------|--------------|
| 16 | **Effective date** | "Effective" field on the card | "Effective 03/01/2026" |
| 17 | **Plan year** | "Plan year" field (anniversary based) | "Plan year: Mar to Feb" |
| 18 | **Waiting period** | Plan summary strip, "Waiting periods" row | "Major: 6 months" |
| 19 | **Day 1 activation** | The green "Active now" badge on preventive tier | "Preventive: day 1" |
| 20 | **Coverage Preventive** | Tier chip "Preventive 100 percent" | chip |
| 21 | **Coverage Basic** | Tier chip "Basic 80 percent" | chip |
| 22 | **Coverage Major** | Tier chip "Major 50 percent" | chip |
| 23 | **Implants / Whitening / Vision / CoverCapy rating** | "Extras and exclusions" panel below the card, four small rows | Implants 20 to 50 percent, Whitening excluded, Vision optional rider, CoverCapy rating 0 to 100 |

Note: terms 19 through 23 share the lower panel of Surface B so all 23 fit without crowding the card face. Implants, Whitening, Vision add-on, and CoverCapy rating are each their own hotspot row in the "Extras and exclusions" panel, keeping the 23-to-23 mapping exact.

---

## 3. THE REVEAL UI — three layers of progressive disclosure

Each hotspot supports three escalating depths. The user controls how deep they go, which is what keeps it light.

**Layer 0 — the curiosity cue (always visible).**
Every hotspot wears a faint dotted underline in `--teal-300` and a tiny superscript dot. Nothing shouts. The signal reads "this is knowable," not "click me now." On a document this creates a constellation of quiet invitations.

**Layer 1 — the annotation tooltip (hover on desktop, tap on touch).**
A small annotation card anchors to the hotspot with a thin leader line, like a museum label. Contents:
- Term name (Fraunces 500).
- One sentence plain definition (pulled verbatim from the existing `DefinedTermSet` so labels stay accurate).
- A single key fact tied to the number on the doc, for example "On this bill, your allowed amount is $980, not the $1,450 the office charged."

The tooltip fades and lifts 4px on entry (140ms ease-out). It never covers the number it explains; it offsets and draws a leader line back to the source.

**Layer 2 — "show me the example" expand.**
Inside the tooltip, a quiet text button "Show me the math." Tapping it expands the card downward (height auto, 200ms) to reveal a worked micro-example using the doc's own numbers. For coinsurance:
> Allowed $980. Deductible $50 comes off first, leaving $930. Plan pays 50 percent of $930 = $465. You pay $465 plus the $50 deductible = $515.
The expand is the active-recall payoff: the abstract term becomes the line on the bill you were just looking at.

**Flip the card (Surface B only).**
The member ID card itself supports a literal flip. A "Flip card" control rotates it 180deg on the Y axis (CSS `transform: rotateY(180deg)`, 400ms). The back shows the carrier contact and a compact definitions key for the four card-face terms, so "flip the card" is both a real-world gesture and a definition reveal.

---

## 4. SCROLL-TRIGGERED HIGHLIGHT — the key number

One scripted moment of delight. As the user scrolls the EOB into view, an `IntersectionObserver` fires a one-time highlight sweep on the bottom-line **"Patient responsibility: $515"** number: a soft `--mint-soft` wash wipes left to right behind it over 600ms, then settles, drawing the eye to the number that actually matters. A small caption animates in beneath it: "This is the only number you pay. Tap any line above to see how we got here." This sets the mental frame (here is the answer, now go discover the inputs) before the user touches a single hotspot. Fires once per session, respects `prefers-reduced-motion`.

---

## 5. MICROINTERACTION INVENTORY

- **Hotspot hover:** dotted underline thickens, superscript dot blooms to a filled `--mint` dot, cursor becomes help. 120ms.
- **Tooltip entry:** opacity 0 to 1, translateY 4px to 0, 140ms ease-out. Leader line draws via SVG stroke-dashoffset.
- **"Show me the math" expand:** grid-template-rows 0fr to 1fr trick for smooth height auto, 200ms.
- **Surface flip (segmented control):** outgoing surface scales to 0.98 and fades, incoming surface fades and settles, 220ms cross.
- **Card flip:** rotateY with `transform-style: preserve-3d`, 400ms cubic-bezier ease.
- **Scroll highlight:** background-position sweep on a gradient pseudo-element, 600ms, once.
- **Progress whisper (retention nudge, not a score):** a thin satisfaction marker reads "7 of 23 terms revealed" and fills a hairline bar as hotspots are first opened. No badges, no confetti. Just the quiet completion pull that makes people open the last few.

---

## 6. RETENTION ANGLE — why this teaches

- **Curiosity gap:** the dotted cues create open loops. An open loop on a document that looks like the user's own bill is hard to leave unclosed. They reveal hotspots to relieve the itch, and revealing is encoding.
- **Active recall over re-reading:** "Show me the math" forces the user to follow the number through the calculation rather than reread a definition. Generating the answer path beats passively absorbing it.
- **Contextual anchoring:** each term is bound to a spatial location on a realistic artifact. Memory for "allowed amount" is now hooked to "the third column on my EOB," a far stronger retrieval cue than alphabetical position in a list.
- **Desirable difficulty, lightly:** the reveal is one tap of effort. Small effort to surface an answer improves retention versus zero-effort display, without the friction of a quiz.
- **Self-paced, judgment-free:** no right or wrong, no streak to lose. The progress whisper supplies completion motivation without the anxiety of a graded game, which suits a luxury concierge feel.

---

## 7. VANILLA JS / CSS APPROACH — inline, no libraries, accessible

**Markup.** Each hotspot is a real `<button>` (not a span) wrapping the doc value, so it is keyboard reachable and announced as interactive. Data lives in attributes:
```
<button class="hs" data-term="allowed-amount"
        aria-describedby="t-allowed-amount"
        aria-expanded="false">$980</button>
```
The 23 definitions and examples are a single inline JS object keyed by termCode, populated from the existing `DefinedTermSet` JSON so copy stays the single source of truth and stays accurate. No fetch, no build step, fits the static-site model.

**Tooltip / annotation.** One reusable tooltip element per surface, repositioned to the active hotspot, rather than 23 separate nodes. Position via `getBoundingClientRect`, clamp within viewport. The leader line is one inline SVG whose two endpoints update on open.

**Reveal mechanics.**
- Hover opens on `mouseenter`, closes on `mouseleave` with a small grace delay so the user can move into the tooltip.
- Touch and keyboard open on `click` / `Enter` / `Space` and stay open until dismissed (tap elsewhere, Escape, or focus out). This dual model is the standard accessible tooltip-on-interactive pattern.
- "Show me the math" toggles `aria-expanded` and the grid-rows height trick. No max-height guesswork.

**Accessibility.**
- `role="tooltip"` element referenced by `aria-describedby`; on touch/keyboard the deeper card uses `aria-expanded` on the trigger.
- Full keyboard path: Tab to each hotspot, Enter to open, Tab into "Show me the math," Escape to close and return focus.
- `prefers-reduced-motion: reduce` disables the scroll sweep, the card flip becomes an instant cross-fade, and tooltip transitions drop to opacity only.
- Color is never the only signal: every hotspot also carries the dotted underline and dot, and the highlight sweep is paired with the text caption.
- Hit targets minimum 44px tall on touch; hotspots get vertical padding so thin number rows stay tappable.

**Theming.** Reuse existing tokens only: `--teal-night`, `--teal-700`, `--teal-300`, `--mint`, `--mint-soft`, `--cream-card`, `--gold-soft`, `--line`, `--ink`, `--ink-soft`. EOB paper is `--cream-card` on `--line` rules; the highlight wash is `--mint-soft`; the Delta-style note and the "excluded" missing-tooth tag use `--gold-soft`. Fraunces 500 for term names, Inter Tight for body and the document chrome.

**Footprint.** Two SVG/HTML document mockups, one tooltip engine (~120 lines JS), one definitions object, one IntersectionObserver. Inline, no dependencies, drops into a static guide page or the glossary index without touching the generator's dentist pipeline.

---

## 8. WHAT THIS DELIBERATELY IS NOT

- Not a quiz, not scored, not timed.
- No levels, no streaks, no confetti, no Capy Crowns.
- No gradients on cards, no glassmorphism.
- No em-dashes in any visible copy.
- No new color values invented.
- Labels are lifted verbatim from the existing `DefinedTermSet` so nothing drifts from the accurate published definitions.
