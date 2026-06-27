# 12 — UX + Readability Critique
**PPO Hub · Phase 2.5 · June 26, 2026**

---

## Context

The current build (`dental-insurance/ppo-plans/index.html`) is 1,452 lines, three-column grid at `max-width: 1200px`, with a left rail at `236px`, a right rail at `300px`, and a center column that absorbs whatever is left. On a 1200px canvas with `24px` side padding that leaves roughly `1152px` of usable space. Strip the two rails and a `32px` gap each: center column gets about `552px`. That is the source of every confinement complaint. The prose, vignettes, headings, and scenario cards are all trying to breathe inside a column that is narrower than a tablet.

The critique below prioritizes issues by reader impact, not by code difficulty.

---

## Top 10 Fixes, Ranked by Impact

---

### Fix 1: Widen the entire canvas and de-squeeze the center column

**Problem.** `--max: 1200px` with two wide rails compresses center content to ~552px. A heading like "Eight PPO plans, each with a story" at 28px Fraunces wraps at three words. The vignettes, which are the strongest editorial element on the page, read like an afterthought because their containing column is barely wider than a mobile breakpoint. The page looks like it is wearing a too-tight jacket.

**Fix.** Three token changes:
```css
--max: 1360px;       /* was 1200px -- luxury width without going full-bleed */
--rail-l: 224px;     /* was 236px -- slight reduction to give back to center */
--rail-r: 272px;     /* was 300px -- shed 28px; still plenty for sticky cards */
```
At 1360px with `24px` padding, usable width is `~1312px`. Rails and two gaps consume `224 + 272 + 64 = 560px`. Center column becomes `~752px`. That is a 200px gain, the difference between prose that breathes and prose that suffocates.

Also change `.layout` gap from `32px` to `28px` each side. This squeezes nothing and reclaims another `8px` for the center.

**Priority: highest.** Every other layout fix depends on this one.

---

### Fix 2: Give the hero a proper typographic moment

**Problem.** The hero H1 is set in Fraunces at `clamp(28px, 4vw, 42px)`. On a 1360px canvas `4vw` resolves to ~54px but clamps at 42px, which is reasonable. The real problem is scale contrast: H1 at 42px and H2 at 28px means the gap between the page title and section headers is only 14px. Section headers do not feel like section headers; they feel like slightly louder body text.

Additionally the hero eyebrow reads: `CoverCapy · PPO Plans, guided`. The middot and lowercase continuation feel like a draft note, not an entry signal for a luxury concierge.

**Fix.**
- Raise the H1 ceiling: `clamp(32px, 3.5vw, 52px)`. At the new canvas width this resolves to ~48px before clamping, a clear step up.
- H2: stay at 28px but add `letter-spacing: -.025em` to sharpen.
- H3 (tour stop plan names): currently `clamp(19px, 2.4vw, 24px)`. Raise ceiling to `26px` and add Fraunces; plan names should feel like chapter titles.
- Eyebrow: rewrite to a shorter, cleaner label. Something like `PPO Plans 2026 · Verified June 26` using a real separator character, not a plain middot at 11.5px. The eyebrow token is fine; the copy is the problem.
- The hero lede at 17px is close to H2 weight territory on shorter viewports. Reduce to 16px and cap line length at `54ch` not `60ch`.

---

### Fix 3: The vignettes are the best editorial element and they are invisible

**Problem.** The vignettes (`.vignette`) are the most distinctive element on the page: real person, concrete situation, concrete outcome. They make insurance readable. But their styling undercuts them: `background: var(--teal-tint)` with `border-left: 3px solid var(--teal-tint)` means the border blends into the background (same color). The block floats inside the tour stop without visual hierarchy above it. The `font-size: 14.5px` is smaller than the surrounding prose at 14.5px but feels smaller because of the dense background.

The opening `<strong>` line inside each vignette is doing all the work, and it needs help.

**Fix.**
- Change the vignette border color: `border-left: 3px solid var(--teal)`. The current `var(--teal-tint)` is invisible.
- Increase vignette `font-size` to `15px` and `line-height` to `1.65`.
- Add a micro-label above the vignette: `<span class="vignette-label">Real scenario</span>` styled with the `.eyebrow` token but in `var(--teal-ink)`. This signals intent and creates a visual hook the eye can catch when scanning.
- Add `padding: 16px 20px` (was `13px 16px`) to give it breathing room.
- The `<strong>` inside can stay but should get `color: var(--ink)` explicitly rather than inheriting.

---

### Fix 4: The scenario finder chips are undersized and too uniform

**Problem.** The `.sf-chip` elements are `min-height: 84px` with a 4-column grid. On a 752px center column (after Fix 1) each chip is about `178px` wide, which is fine. But all eight chips look the same: same icon color, same border, same type size. There is no visual signal that one situation is more common than another, no differentiation between "Cleanings + checkups" (low stakes) and "Implant ahead" (high stakes and high revenue for CoverCapy). The grid reads like a checkbox grid from a health portal form, not a guided concierge question.

Additionally the SF toggle (Individual / Family) sits above the chips but uses `background: var(--surface-2)` and looks like a muted browser control. On a luxury page, that toggle should feel like a premium segmented control.

**Fix.**
- Give each chip an accent dot color that matches its emotional register. Use `data-accent` on each chip and a CSS rule: `[data-accent="teal"] .sf-chip-label { color: var(--teal-ink); }`. High-stakes chips (implant, senior, major work) get a subtle warm accent in the icon (`color: var(--gold-ink)` on `.gly`), low-stakes chips keep teal.
- Increase chip label to `15px` and hint to `13px`.
- Raise `min-height` to `96px` with `padding: 16px 14px 14px`. More room = less cramped = more concierge.
- The SF toggle: increase button padding to `10px 28px`, raise `font-size` to `15px`, and change the active background to `var(--teal-deep)` with `color: #fff`. Right now the active state is barely distinguishable at a glance.

---

### Fix 5: The right rail is permanently overweight and static

**Problem.** The right rail at `300px` (to be 272px after Fix 1) currently contains: a verify card, a hard-coded Aetna/CVS spotlight, and share buttons. The CVS spotlight (`spot.cvs`) is `background: #FBF7EF; border-color: #E6DBC7`. It is warm gold-ish and it permanently dominates the rail regardless of what section the user is reading. This is the "over-featuring Aetna" problem from the brief, and it is a UX problem as much as a content problem.

The right rail has no visual breathing room between cards. They stack with `gap: 14px` and each has `border-radius: var(--r-lg)` but they crowd each other.

**Fix (structural, ties to agent 02 dynamic-rail):**
- Remove the hard-coded `.spot.cvs` Aetna block. Replace with a `<div id="spotlight-slot">` that starts empty and is populated by the dynamic spotlight system (IntersectionObserver, per the brief). This is a content-architecture fix as much as a visual one.
- Increase gap between rail cards to `18px`.
- The verify card `.rc-top` background is `var(--teal-deep)`. Keep it. The verify card is the highest-value conversion surface on the page and should stay prominent.
- Add `padding-top: 8px` to `.rail-r` to give it a touch of breathing room from the breadcrumb.

---

### Fix 6: Tour stop density is uniformly medium; there is no rhythm

**Problem.** All eight `.tour-stop` cards use `padding: 24px 26px` inside `.ts-body` and `margin: 0 0 18px`. They are identical in visual weight from top to bottom of the page. Premium editorial design would give the tour a sense of accumulation: early stops feel lighter (UHC is simple), later stops heavier (MetLife, MOO, Humana carry more complexity). Right now reading plans 1 through 8 in sequence has no cadence.

Also: the `stop-eyebrow` ("Stop 01 of 08 · The fast starter") uses `color: var(--gold-ink)` at `font-size: 11px`. Gold ink at 11px on a white card is close to unreadable for anyone with imperfect vision, and the color does not serve the layout.

**Fix.**
- Change `stop-eyebrow` color to `var(--teal-ink)`, `font-size: 11.5px`. Gold is for money, not navigation.
- Add a `background: var(--teal-deep)` left accent bar to the tour-stop for the currently matched plan (when scenario finder is active). `border-left: 4px solid var(--teal)` on `.tour-stop.match-yes` is already in the code but visually quiet. Upgrade: use `box-shadow: inset 4px 0 0 var(--teal)` and `background: var(--teal-tint)` on `.match-bar.match-yes` for a stronger matched state.
- The `.ts-panel` (quick facts sidebar within each tour stop) uses `background: var(--surface-2)`. On a white `--surface` card, `--surface-2` at `#F1F5F8` is one shade off white. Barely visible. Upgrade to `background: var(--surface-3)` (`#E9EFF3`) to create genuine differentiation.

---

### Fix 7: The comparison table is too compressed and unreadable in place

**Problem.** `table.cmp` has `font-size: 13.5px` on a `min-width: 880px` table that must scroll inside the center column. The "Best for" column text (`class="bf"`) is `font-weight: 600` but nothing else differentiates the plan rows visually. No alternating row color, no subtle zebra stripe, no way to track across a row without moving your finger along the screen. The column order buries "Best for" at the end where it should be the first differentiator after the name.

The table caption is helpful but rendered in `background: var(--surface-2)` with `font-size: 13px` in `var(--ink-3)`. It reads like a disclaimer, not a useful label.

**Fix.**
- Add zebra striping: `tbody tr:nth-child(odd) { background: var(--surface-2); }`. Simple, immediate legibility gain.
- Move the "Best for" column to position two (immediately after Plan name). That is the question every reader has.
- Increase table `font-size` to `14px`. The 13.5px feels like it is trying to fit a table that does not belong at this width.
- Caption: change to `color: var(--ink-2)` and `font-size: 13.5px`. Let it be read, not apologized for.
- The "Verify" column link: `class="vlink"` has `font-weight: 600` but no visual treatment. Add `color: var(--teal-strong)` explicitly (already on links globally, but confirm it survives `td` override) and optionally a small arrow icon via CSS `::after`.

---

### Fix 8: The "Best for" grid cards lack differentiation at a glance

**Problem.** The `.bf-card` grid uses `repeat(auto-fit, minmax(264px, 1fr))`. With the new wider center column (752px), this produces either two or three cards per row, which is correct. But all eight cards have the same structure: colored dot, H3, paragraph, link. The dots use hard-coded inline background colors (`style="background:#6E8590"` etc.) that are not on the design token set, creating invisible technical debt and visual inconsistency.

There is no way to see at a glance what category each card belongs to. Scenarios are mixed (seniors, kids, network, budget) without visual grouping.

**Fix.**
- Replace all inline `style="background:#..."` dot colors with design token values. Map them: orthodontics should use `var(--teal)`, implants `var(--covered)`, seniors `var(--gold)`, budget `var(--ink-3)`. This alone creates semantic color meaning.
- Add a `class` on each `.bf-card` that maps to the dot color: `bf-card--teal`, `bf-card--covered`, etc. Then CSS controls the dot, not an inline style.
- The card `h3` reads as a full FAQ question: "Which dental insurance is best for kids who need braces?" That full-sentence format is valuable for SEO (it answers a search query verbatim) but at 14px it runs long and the card height varies by question length. Cap with `display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden` if the heading consistently runs three lines.

---

### Fix 9: The verify bands interrupt flow rather than capitalize on it

**Problem.** Two `.verify-band` sections appear on the page (before the comparison table and after the waiting periods section). Both are `background: var(--teal-deep)` full-bleed dark blocks with a form inside. The first one (`#verify-1`) appears between the tour stops and the comparison table, which is a reasonable placement. But both bands have the same copy structure, the same form, the same CTA. By the second time a reader sees it, it is wallpaper.

Also, `.verify-band { border-radius: var(--r-lg) }` with `padding: 30px 30px` inside a constrained center column means the inner input sits tight to the card edge. The form max-width is `520px` but there is no visual breathing room around it.

**Fix.**
- First band (`#verify-1`): keep the current structure but add a specific headline that connects to the tour. The current "The step everyone skips, and we will not let you" is strong copy, keep it. Add a stat underneath: `"We have verified across 6,400+ PPO offices."` Already in the alt text below but it should be in the body.
- Second band (`#verify-2`): change the heading to reflect that the reader has just finished the table and waiting-periods sections. Something like "You have done the research. Now confirm one thing." This contextual voice shift prevents wallpaper blindness.
- Both bands: increase `padding` to `36px 36px` and add `margin: 12px 0` (was `8px 0`). The band is a premium design element and needs room.
- The form input inside: add `margin-bottom: 4px` between the input and the button on the wrapping flex layout when it stacks narrow.

---

### Fix 10: Color system is technically correct but emotionally flat

**Problem.** The page uses the health-tech system (`:root` tokens starting with `--bg: #F6F8FA`) rather than the luxury concierge tokens from CLAUDE.md (`--teal-night`, `--mint`, `--cream-card`, `--ink: #082A30`). This is a legitimate choice for this hub's design system, but the result is a page that reads like a strong health-tech product rather than a luxury concierge. The `--bg: #F6F8FA` feels clinical. The `--ink: #0F1B25` is close to black, which is functional but cold.

No page element signals premium except the Fraunces serif on headings. No warm cream, no gold accent in a structural role, no mint on a primary CTA. The hero CTA buttons are `btn-pri` (teal) and `btn-out` (ghost). Neither has any warmth.

**Fix (targeted, not a full system swap):**
- Change `--bg` to `#F4F7F6` — a hint of warmth without abandoning the system.
- On the hero CTA row: change `btn-out` to a slightly warm ghost: `border-color: var(--gold); color: var(--gold-ink)` on hover state only. This costs nothing and adds a concierge signal on the one action pair that first-time visitors see.
- The `.eyebrow` currently uses `color: var(--teal-ink)`. The CLAUDE.md system uses `--teal-300: #5E8C92` for overlines. Map this: `color: var(--teal-ink)` (already `#075453`) is close but add `letter-spacing: .09em` to increase overline presence.
- The tour stop `stop-eyebrow` numbers ("Stop 01 of 08") in `var(--gold-ink)` at 11px: as noted in Fix 6, change to `var(--teal-ink)`. Reserve `var(--gold-ink)` for the `.ts-skip` warning boxes where it correctly signals caution.
- The FAQ `summary::after` content switch from `"+"` to `"\2013"` (en-dash) on open is wrong per CLAUDE.md's no-em-dash rule. An en-dash is fine but a down-chevron SVG (`content: url(...)`) or a rotated `+` would be more premium.

---

## Supporting Issues (Not Top 10, But Worth Noting)

**Measure on main-col prose.** The `.main-col p` has no explicit `max-width`. The `.lead` class caps at `64ch` which is correct. But the `.ts-main p` body prose (inside tour stops) inherits from the column width. After Fix 1 widens the center, those paragraphs will run to ~752px, which is about 95 characters per line at 14.5px. That exceeds the comfortable 70ch–75ch reading measure. Add: `.ts-main p, .ts-main .vignette { max-width: 68ch; }`.

**Left rail label hierarchy is inverted.** The "Your situation" block uses `.rl-label` styled with `color: var(--gold-ink)` (warm gold). The "On this page" and "Filter by need" blocks use `.rl-jump .rl-label { color: var(--ink-faint) }`. So the most editorial label (gold, inviting) is on the navigation, and the utility label (page anchor) is the muted one. This is backwards. The scenario navigation, which drives the dynamic spotlight, should feel most inviting. It already does with the gold treatment. But the "Filter by need" pill group below should have a slightly warmer label too: `color: var(--ink-3)` rather than `var(--ink-faint)`.

**Plan story H3 link color.** The plan name headings use `h3 a { color: inherit }` which means they render in `var(--ink)` (near-black) not `var(--teal-strong)`. There is a hover underline. But for scannability, plan names should be immediately identifiable as links. Consider `color: var(--teal-ink)` on the H3 link (not `teal-strong`, which would be too bright; `teal-ink` at `#075453` is darker, premium).

**"Stop 01 of 08" numbering.** The tour stop numbering is helpful wayfinding but "Stop 01 of 08" is logistical, not editorial. A more evocative pattern: keep the number (`01`), follow with a separator, then the editorial label: `01 · The fast starter`. Same content, tighter formatting. Current renders as a 32-character string in 11px uppercase. Too long for that type size.

**The `.sf-answer` reveal container.** When the scenario finder produces a match, `.sf-answer` slides in with `display: block`. It uses `border-radius: var(--r-md)` and `box-shadow: var(--sh-1)`. But the plan name inside uses `font-family: var(--serif)` at `21px`. That is the right call. Preserve it in the rebuild. The `.sf-story` at `15px` color `var(--ink-2)` is also correct. The one weak element is the `.sf-skipif` yellow block: it uses `background: var(--partial-tint)` and `border-color: var(--partial)`. The amber/orange "skip if" warning is visually strong inside the answer card, which is good. Preserve it.

**Mobile sticky bar.** The `.sticky` bar (`background: var(--teal-deep)`) currently shows navigation icons for three actions. This is the right skeleton for the "pop-off" bar described in the brief. One critique: the `.sb-btn` icons have `color: #C8E6E3` (mid teal-light) and `font-size: 11px`. At 11px the icon labels are too small for confident tapping. Increase to `12px` and add `min-width: 44px; min-height: 44px` to each button to meet touch target minimums.

---

## Summary Verdict

The writing is strong. The structure is right. The visual system is doing exactly what a health-tech page would do, and that is the core problem for a luxury concierge positioning. The center column confinement at ~552px is the single most damaging issue; fixing it unlocks everything else. The vignettes, which are the page's competitive edge editorially, are understyled. The scenario finder needs to feel like a guided conversation, not a form. The right rail's hard-coded Aetna spotlight is both a content-balance problem and a UX problem since it is irrelevant to most visitors on most sections of the page.
