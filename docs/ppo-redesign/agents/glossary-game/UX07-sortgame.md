# UX07 — Sort-the-Procedure Coverage Game

UX Designer 7 of 10. Style: drag-and-drop / sorting / matching. Goal: teach PPO dental
coverage tiers by doing, not reading. The learner classifies real procedures into the four
tiers a PPO plan actually uses, gets instant feedback, and builds a score.

---

## 1. CORE CONCEPT

A tactile sort game called "Sort Your Smile." Twelve procedure chips sit in a tray. The
learner drags each chip into one of four labeled drop zones (the coverage tiers). On drop,
the chip snaps in with an instant correct or incorrect ruling, a one-line "why," and a
running score. Clear the tray to finish and see a tier summary that doubles as the real
takeaway: what a PPO plan covers, partly covers, and excludes.

Teaches all three target concepts at once:
- Coverage tiers (preventive / basic / major) by being the sort axis.
- Covered vs excluded by giving "Not covered" its own zone (cosmetic + adult ortho).
- In-network framing by surfacing a note on every result that percentages assume an
  in-network PPO dentist.

---

## 2. THE FOUR DROP ZONES (TIERS)

Accurate to typical PPO plan structure. Percentages are the plan's share after deductible,
in-network.

| Zone | Label | Plan pays | Color token | Plain-language tag |
|------|-------|-----------|-------------|--------------------|
| Z1 | Preventive | 100% | mint-soft / mint | "Keeps problems away. Usually no cost to you." |
| Z2 | Basic | 80% | cream / teal-700 | "Fixing small problems. You pay about 20%." |
| Z3 | Major | 50% | gold-soft / teal-night | "Big rebuilds. You and the plan split it." |
| Z4 | Not covered | 0% | line / ink-faint | "Cosmetic or optional. Plan does not pay." |

Zones render as a 2x2 grid on desktop, stacked column on mobile. Each shows its label,
the pay percentage as a large numeral, and the plain-language tag.

---

## 3. THE TWELVE PROCEDURE CHIPS

Each chip carries a hidden `data-tier`. Classifications match common PPO plans.

| Chip | Correct tier | Why (feedback line) |
|------|-------------|---------------------|
| Routine cleaning | Preventive | Twice a year, paid in full to stop decay early. |
| Exam and X-rays | Preventive | Checkups catch issues before they get costly. |
| Fluoride / sealant | Preventive | Cheap prevention the plan fully backs. |
| Filling | Basic | Repairs a cavity. Plan pays about 80%. |
| Simple extraction | Basic | Pulling a tooth is basic restorative work. |
| Deep cleaning (scaling) | Basic | Gum treatment counts as basic, not preventive. |
| Crown | Major | Caps a damaged tooth. Plan splits the cost 50/50. |
| Root canal | Major | Often paired with a crown. Counts as major. |
| Bridge | Major | Replaces missing teeth. Major restorative. |
| Dental implant | Major | High-cost rebuild. Usually major when covered at all. |
| Teeth whitening | Not covered | Purely cosmetic. Plans never pay for it. |
| Adult braces | Not covered | Adult orthodontics is typically excluded on PPO. |

Edge-case notes baked in (shown on result, not on the chip face):
- Root canal endodontics is sometimes filed under Basic by a few plans; we teach the
  common Major case and add a footnote: "Some plans rank this Basic. Verify your plan."
- Implants are excluded entirely on many plans; footnote: "Some plans exclude implants.
  When covered, it is Major."
- Deep cleaning is the classic trap (people guess Preventive). It is the intended
  "aha" chip.

---

## 4. INTERACTION + FEEDBACK

### Correct drop
- Chip snaps into the zone, locks, dims slightly, shows a check.
- Zone border flashes mint for 400ms.
- Toast under the zone: the "why" line for 2.5s.
- Score +10. Streak counter increments.

### Incorrect drop
- Chip springs back to the tray with a short shake (respect `prefers-reduced-motion`:
  no shake, just a red outline pulse).
- Zone border flashes a soft error tone (not harsh red, use ink-faint + thin red ring).
- Toast: "Not quite. {chip} is {correct tier} because {why}." Chip stays in play.
- Score unchanged. Streak resets to 0. No penalty points (low-stakes learning).

### Hint affordance
- After two wrong tries on the same chip, the correct zone gets a gentle pulsing ring
  to nudge without giving a hard answer first try.

---

## 5. SCORING + GAMIFICATION

- +10 per correct placement, 120 max.
- Streak bonus: every 3 correct in a row adds +5.
- "First try" badge tally shown at the end (e.g. "9 of 12 nailed on the first try").
- No timer, no countdown (CLAUDE.md bans countdown timers). Self-paced.
- End screen: filled 2x2 board, score, first-try count, and a one-line reframe:
  "You just sorted a real PPO plan. Preventive is free. Cosmetic is on you." Plus a
  single CTA: "See plans that cover this from $30/mo" linking to
  /compare-ppo-dental-plans. No Capy Crowns in this module.
- Replay button reshuffles chip order (tier answers fixed).

---

## 6. MOBILE + TAP-TO-PLACE FALLBACK

Pointer drag is unreliable on touch, so the primary mobile path is tap-to-place, with
drag as a progressive enhancement where pointer events support it.

- Tap a chip -> it lifts and highlights as "selected" (aria-pressed=true).
- The four zones show a subtle "Tap to drop here" prompt while a chip is selected.
- Tap a zone -> same correct/incorrect logic fires.
- Tap the selected chip again to deselect.
- Zones stack vertically; tray is a horizontal scroll strip pinned above.
- Hit targets minimum 44x44px. Toasts anchor to the bottom safe area.

This same tap model is also the keyboard model (below), so one code path serves touch,
mouse-drag, and keyboard.

---

## 7. ACCESSIBILITY (KEYBOARD + SR)

- Chips are real `<button>` elements; zones are `<button>` or `role="group"` with a
  labeled drop button. Everything reachable by Tab.
- Keyboard flow mirrors tap: Enter/Space on a chip "picks it up" (announce via
  aria-live: "Filling selected. Choose a tier."). Tab to a zone, Enter to place.
  Esc cancels the pickup.
- `aria-live="polite"` region announces every result line so the "why" is read aloud.
- Score and streak in an `aria-live` status node.
- Color is never the only signal: check icon for correct, ring + text for incorrect.
- Focus moves to the result toast on placement, then back to the tray for the next chip.
- Respect `prefers-reduced-motion` for snap, shake, and pulse animations.

---

## 8. VANILLA-JS APPROACH (INLINE, NO LIBRARIES)

Self-contained block: one `<section>`, scoped CSS in a `<style>`, one IIFE script. No
external libs, matches the standalone-page pattern in CLAUDE.md.

- Data: a `const ITEMS = [{id, label, tier, why, note}]` array. `const TIERS = [...]`.
- Render: build chips and zones from the arrays so there is one source of truth.
- State: `selectedChipId`, `score`, `streak`, `placed` set, `firstTryWrong` map.
- Three input bindings, one handler:
  - Pointer drag: `dragstart`/`drop` (HTML5 DnD) where supported.
  - Tap/click: chip click sets `selectedChipId`; zone click calls `place(chipId, zoneId)`.
  - Keyboard: keydown on chip (Enter/Space) and zone, routed to the same `place()`.
- `place(chipId, zoneId)` is the single arbiter: compares `chip.tier` to `zone.id`,
  updates score/streak, writes the aria-live result, animates, checks for game end.
- CSS uses only existing tokens (mint, mint-soft, cream, gold-soft, teal-700, ink-faint,
  line, etc). Fraunces for the zone labels, Inter Tight for chips and body.
- No em-dashes, no roman numerals, no gradients, no glassmorphism in any copy or style.

Footprint estimate: ~6KB inline (HTML + CSS + JS), no network calls.

---

## 9. WHERE IT LIVES

Reusable inline module droppable into the glossary page and optionally the top of
/compare-ppo-dental-plans as an engagement hook. Standalone, so it can be baked by the
generator into hub pages later without shared JS dependencies.
