# 01 Layout Width Fix
## Agent: layout-width-fix | Phase 2.5 | 2026-06-26

---

## Problem Statement

The current hub canvas is constrained by `--max:1200px` with fixed rail sizes of `--rail-l:236px` and `--rail-r:300px` and a `gap:32px` on `.layout`. That leaves the center column at roughly:

```
1200px - 236px - 300px - (32px * 2 gap) = 600px usable center
```

600px of center content in a 16px body type is too narrow (about 37ch). The reading measure target is 720-780px, which maps to roughly 45-49ch at 16px. The canvas needs to expand and the rail tokens need to be rebalanced.

---

## Before (current, verbatim from `:root` and `.layout`)

```css
/* Line 58 - :root */
--max:1200px; --rail-l:236px; --rail-r:300px;

/* Line 77 - .wrap */
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px}

/* Line 111 - .layout grid */
.layout{display:grid;grid-template-columns:var(--rail-l) minmax(0,1fr) var(--rail-r);gap:32px;align-items:start;padding:26px 0 60px}

/* Line 324 - 3-col collapses to 1-col at 1080px */
@media(max-width:1080px){
  .layout{grid-template-columns:1fr;gap:0}
  .rail-l,.rail-r{display:none}
  .inflow{display:block;margin:18px 0}
  .sticky{display:block}
  .block{scroll-margin-top:64px}
}

/* Line 331 - mobile tightening */
@media(max-width:640px){
  .wrap{padding:0 16px}
  .verify-band{padding:24px 20px}
}
```

**Computed center column at 1200px viewport:** ~600px (too narrow, ~37ch).

---

## After (proposed replacements)

### Token changes in `:root` (line 58)

```css
/* BEFORE */
--max:1200px; --rail-l:236px; --rail-r:300px;

/* AFTER */
--max:1440px; --rail-l:248px; --rail-r:316px;
```

**Why these numbers:**
- `--max:1440px` -- standard comfortable wide canvas; fits 1440px screens without edge bleed and gives breathing room on 1280-1366px laptops with scrollbar.
- `--rail-l:248px` -- 12px wider than before; left rail (scenario finder + nav) benefits from slightly more padding without dominating.
- `--rail-r:316px` -- 16px wider than before; right rail spotlight card and verify widget gain a little whitespace.

**Computed center at 1440px:** `1440 - 248 - 316 - (32 * 2) = 812px`. That is above the 780px ceiling, so the `.main-col` prose gets a `max-width` clamp (see below) to stay readable while white space absorbs the excess on very wide screens.

**Computed center at 1280px viewport (common laptop):** `1280 - 24*2 [wrap padding] - 248 - 316 - 64 = 604px`. That is below the 640px floor. This means the 2-column intermediate breakpoint below is needed.

---

### `.wrap` max-width (line 77)

No change required -- `.wrap` already reads `max-width:var(--max)` so it inherits the new `1440px` automatically.

**Optional but recommended:** reduce side padding on wide viewports to avoid wasted margin:

```css
/* BEFORE */
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px}

/* AFTER */
.wrap{max-width:var(--max);margin:0 auto;padding:0 32px}
```

Bump padding from 24px to 32px. On wide screens this adds a small breathing margin against the edge; on narrow screens the 640px breakpoint still overrides to `0 16px`.

---

### `.layout` grid (line 111)

```css
/* BEFORE */
.layout{display:grid;grid-template-columns:var(--rail-l) minmax(0,1fr) var(--rail-r);gap:32px;align-items:start;padding:26px 0 60px}

/* AFTER */
.layout{display:grid;grid-template-columns:var(--rail-l) minmax(640px,780px) var(--rail-r);gap:36px;align-items:start;padding:26px 0 60px;justify-content:center}
```

**Key changes:**
- `minmax(0,1fr)` becomes `minmax(640px,780px)` -- center column is now guaranteed at least 640px and caps at 780px. The remaining space in a very wide canvas distributes to the rails or sits as white space (controlled by `justify-content:center`).
- `gap:32px` becomes `gap:36px` -- 4px increase gives a touch more breathing room between columns.
- `justify-content:center` -- centers the three-column group within `.wrap` so white space is symmetric on very wide screens.

---

### `.main-col` reading measure clamp

Add to existing `.main-col` rule (line 112):

```css
/* BEFORE */
.main-col{min-width:0;display:flex;flex-direction:column;gap:0}

/* AFTER */
.main-col{min-width:0;display:flex;flex-direction:column;gap:0;max-width:780px;width:100%}
```

This keeps long paragraphs from stretching past comfortable reading measure if the grid ever gives the column more space than 780px.

---

### Breakpoints (lines 324-334)

The current approach collapses 3 columns directly to 1 column at 1080px. With the wider canvas this leaves a gap: on viewport widths between 1080px and ~1280px the full three-column layout fits awkwardly because the center column cannot reach 640px. The fix is to introduce an intermediate 2-column breakpoint that drops the right rail first, then drops the left rail.

```css
/* BEFORE - single collapse at 1080px */
@media(max-width:1080px){
  .layout{grid-template-columns:1fr;gap:0}
  .rail-l,.rail-r{display:none}
  .inflow{display:block;margin:18px 0}
  .sticky{display:block}
  .block{scroll-margin-top:64px}
}

/* AFTER - two-stage collapse */

/* Stage 1: drop right rail at 1200px, left rail stays sticky */
@media(max-width:1200px){
  :root{--rail-r:0px}
  .layout{grid-template-columns:var(--rail-l) minmax(640px,1fr);gap:28px}
  .rail-r{display:none}
  .inflow.inflow-r{display:block;margin:18px 0}
}

/* Stage 2: drop left rail too at 960px, go single column */
@media(max-width:960px){
  .layout{grid-template-columns:1fr;gap:0}
  .rail-l,.rail-r{display:none}
  .inflow{display:block;margin:18px 0}
  .sticky{display:block}
  .block{scroll-margin-top:64px}
}

/* Mobile tightening unchanged */
@media(max-width:640px){
  .wrap{padding:0 16px}
  .verify-band{padding:24px 20px}
}
```

**Breakpoint rationale:**
- **1200px** -- drops the right rail. At 1200px viewport with 32px side padding the usable area is 1136px. `248px (rail-l) + 28px (gap) = 276px` leaves `860px` for center, more than comfortable. Right rail content shifts to `.inflow.inflow-r` placeholder blocks already in the HTML.
- **960px** -- drops the left rail. At 960px viewport with 32px padding, usable area is 896px. With the left rail (248px) and gap (28px) there is only `620px` for center, just barely above the 640px floor. Dropping at 960px preserves 620-640px center measure before the single-column flip; below 960px the column goes full width.
- **640px** -- existing mobile tightening; no change.

**Note on `.inflow` classes:** The existing HTML already has `.inflow` divs for the right rail content in the flow. If the dynamic rail architecture (agent 02) introduces separate `.inflow-r` and `.inflow-l` classes, split the `display:none` override accordingly. For now the existing single `.inflow` class covers the right rail inflow blocks.

---

### `sticky-in` max-width (line 318)

The sticky bottom bar already references `--max` indirectly via `.sticky-in`:

```css
.sticky-in{display:flex;align-items:center;gap:8px;max-width:var(--max);margin:0 auto;padding:0 16px}
```

No change needed -- it inherits the new `1440px` automatically.

---

## Summary Table

| Token / Rule | Before | After |
|---|---|---|
| `--max` | 1200px | 1440px |
| `--rail-l` | 236px | 248px |
| `--rail-r` | 300px | 316px |
| `.layout` gap | 32px | 36px |
| `.layout` center column | `minmax(0,1fr)` | `minmax(640px,780px)` |
| `.layout` justify | (default) | `justify-content:center` |
| `.main-col` max-width | (none) | `780px` |
| `.wrap` padding | 24px | 32px |
| 3-col collapse breakpoint | 1080px (direct to 1-col) | 1200px (drop right rail) |
| 2-col collapse breakpoint | (none) | 960px (drop left rail, go 1-col) |
| Mobile padding breakpoint | 640px | 640px (unchanged) |

---

## Computed Center Column Width by Viewport

| Viewport | Columns active | Center column |
|---|---|---|
| 1440px | 3 (full) | ~748px (capped at 780px by `max-width`) |
| 1320px | 3 (full) | ~672px |
| 1200px | 2 (right rail dropped) | ~892px (capped at 780px by `max-width`) |
| 1080px | 2 (right rail dropped) | ~772px (capped at 780px) |
| 960px | 1 (full width) | 100% - 64px padding |
| 640px | 1 (full width) | 100% - 32px padding |

Center content never falls below 640px before the columns reorganize.

---

## Implementation Notes for Integration Pass

1. Edit `:root` line 58: change the three token values.
2. Edit `.wrap` line 77: change `padding:0 24px` to `padding:0 32px`.
3. Edit `.layout` line 111: replace column template and add `justify-content:center`.
4. Edit `.main-col` line 112: add `max-width:780px;width:100%`.
5. Replace the single `@media(max-width:1080px)` block (lines 324-330) with the two-stage breakpoint blocks above.
6. Leave the `@media(max-width:640px)` block untouched.
7. No color tokens are changed. No new CSS variables are introduced outside of the existing token set.
8. The `.lead` max-width (`max-width:64ch` on line 114) stays as-is; it governs only the section lead lines, not the column width.
