# U3 — Interactive Decision / Comparison Modules · Delta Dental Hub

> Agent U3 (UX). Specifies how the ported interactive modules behave across the Delta
> hub nodes. Source of truth for behaviour: `assets/ppo/ppo-hub.js` (delegated, one
> canonical data source `#cc-plans`). Source of truth for the Compare engine: the inline
> script in `delta-dental/compare/index.html` (`PLANS` / `pick()` / `renderAll()`).
>
> **Color law (T5 jade, from find-my-dentist.html):** `teal-night #082A30` = ink + CTA
> fill, `teal-700 #14525B` = links, `mint #5BE0A0` = accent (button text on dark only).
> **Body text must NEVER equal the CTA color.** Body prose uses `--body #3A4A42`, never
> `#082A30`. On the Compare node these map to the page's `--ink #161A1F` / `--jade-deep
> #0C8C81` (links) / `--jade #0FB5A6` (accent) tokens — do not introduce new hex values.
> There is **no "PPO Basic"** anywhere in this hub. The featured Delta plan is **PPO Premium**.

---

## 1. The Delta hub map — which module lives on which node

| Node | Path | Role | Interactive modules present |
|------|------|------|------------------------------|
| **Gateway** | `delta-dental/` | Premium = the gateway / front door | Smart Match (lens), value-frame, glossary tooltips, subnav scroll-spy, palette toggle, source drawers, ZIP-quote (entry), dentist finder (entry) |
| **Premium plan** | `delta-dental/premium/` | The single featured Delta individual plan, deep page | Spec card, year-toggle, glossary, source drawers, dentist finder tabs (`#dentists`), value-frame, ZIP-quote |
| **Compare** | `delta-dental/compare/` | "Delta vs your pick" decision desk | Compare tray (Delta-locked baseline + 1 pick today; spec'd to pin up to 4), feature filters, spec-dots, value-frame, source drawers, glossary |
| **Over-65 (SCAN)** | `delta-dental/over-65/` | SCAN Medicare Advantage Delta benefit | No comparison tray (different product). Glossary + source drawers + finder only |
| **UC students (SHIP)** | `delta-dental/uc-students/` | UC SHIP Delta benefit | Glossary + source drawers + finder only |

**Rule:** the compare tray and feature filters appear **only** where multiple individual
PPO plans are legitimately comparable — Gateway and Compare. They are suppressed on
Over-65 and UC-students, where Delta is a single embedded benefit, not a shelf.

---

## 2. Compare tray — pin to compare

**Behaviour today (Compare node).** Delta Dental PPO Premium is the **locked baseline**
(`fixed` card, `★ Baseline`, never removable). The shelf is a 2-up: Delta + one tapped
carrier (`MAX = 2`). Tapping the active second card removes it back to Delta-only.
**Target behaviour (ported `cc-tray`, max 4).** On the Gateway, the same data drives a
true pin tray: a checkbox (`[data-cmp="{key}"]`) on each spec card pins it to the sticky
`#cc-tray`. Delta is pre-pinned and non-removable; up to 3 more (4 total). Over the cap,
the checkbox refuses (reverts to unchecked, no error toast — silent, matches current JS).

### States
- **Empty / baseline:** tray shows Delta chip only; CTA reads *"Add a plan to compare"* (muted, not jade fill).
- **1–3 pinned:** tray visible, chips with `×` remove buttons, CTA = jade fill *"Compare N →"* (`data-ev="comparison_open"`) scrolling to `#compare`.
- **At cap (4):** further checkboxes inert; the 4th chip styled as last slot.
- **Remove:** `×` on a chip un-pins and unchecks the source card (`[data-untray]` handler). Delta `×` is absent.
- **Compare panel sync:** removing a non-Delta plan in the panel (`pick()` close `✕`) must also clear its tray chip — single state object, no drift.

### Mobile (≤560px)
- Tray docks as a **bottom sticky bar**, not inline. Chips horizontally scroll; CTA pinned right.
- Spec cards stack 1-col (`.cards{grid-template-columns:1fr}`); checkbox enlarges to ≥44px tap target.
- Compare panels go 1-col (`.panels.two→1fr`); the timeline track stays full-width and scrolls if labels collide.

---

## 3. Feature filters — no-wait / implants / ortho

Ported `cc-toolbar` checkboxes (`input[data-filter]`) over the shelf. Filters defined in
`ppo-hub.js#planPasses`: `nowait` (basic OR major waits 0 mo), `implants` (implant cov
exists), `ortho` (ortho cov exists), `cheap` (`from ≤ 50`).

- **AND semantics:** a plan must pass *every* checked filter (`ccPlanPasses`).
- On change → `cc-filter-change` event → matrix and tray re-draw. **Delta is never
  filtered out of the Compare baseline** even if it fails a filter; instead its column
  shows a quiet *"doesn't match: {filter}"* note rather than disappearing.
- **Empty result:** show *"No plan matches all of those yet — relax a filter."* (muted), keep filters visible.
- **`nowait` honesty:** Delta basic/major/ortho all wait ~6 mo, so Delta fails `nowait` — that is correct and intentional; do not special-case it.

### States: default (none checked, all shown) · active (chip filled mint-soft `#E6F7EE`, ink label) · disabled (n/a on single-product nodes).
### Mobile: toolbar collapses into a horizontal-scroll chip row above the cards; sticky under subnav.

---

## 4. Smart Match — a lens, not a quiz

`initMatch()` renders into `#cc-verdict`. It is a **lens over the same `#cc-plans` data**,
never a second source. Inputs: `data-need` tiles (prev/basic/major/implant/ortho),
`data-time` (months since prior coverage), `#cc-budget` range. Output: top "Closest fit"
+ "Backup" card with plain-language *why* / *caution* strings.

- **Placement:** Gateway only (the front-door triage). Not on Compare (Compare is the
  manual head-to-head; Smart Match would compete with it). Default `need=major`,
  `budget=$70` — tuned so Delta surfaces as a strong fit for major/ortho/implant intents.
- **Honesty rail:** Delta's ~6-mo wait shows as the `cau` line ("about a 6-month wait
  before that is covered") whenever the user's `time` is under 6 — never hidden.
- **No pricing claims:** always print the canned *"Pricing and availability need a
  location-specific quote"* footnote → hands to ZIP-quote.
- **States:** scored (1–2 cards) · empty ("No plan covers that yet — try another need.").
- **Mobile:** need tiles wrap 2-per-row; budget slider full-width with live `#cc-budget-val` readout.

---

## 5. Value-frame — cash vs premium (TO-PORT)

Fuses the live page's `valueFrame()` (`data-cash` / `data-prem`) with Smart Match output.
Shows the payoff of carrying Delta Premium vs paying cash for the same procedure set.

- **Placement:** Gateway (under Smart Match result) + Premium plan page + each Compare panel.
- **Behaviour:** given the selected `need`, compute illustrative cash price vs covered
  cost (premium × months + deductible + coinsurance). Render as a two-bar value strip:
  "Pay cash: $X" vs "With Delta Premium: $Y" with the delta highlighted.
- **Guardrails:** every figure is *illustrative*, label it so. Numbers read from the same
  `#cc-plans` record — no hardcoded per-page values. Never quote a real premium; defer to ZIP.
- **States:** default (Delta) · recomputes on `need` / tray-pin change · "estimate — verify with a quote" footnote always shown.
- **Mobile:** bars stack vertically; keep the $-delta as the visual anchor.

---

## 6. Source drawers (TO-PORT `cc-drawer`)

Per-fact provenance behind a quiet *"view sources"* affordance (link color `#14525B`/
`--jade-deep`, never CTA fill). Wraps coverage %s, waiting periods, annual max, and the
"largest network" claim.

- **Behaviour:** click toggles an inline `<details>`-style drawer listing carrier-doc
  citation + retrieval date. Closed by default. Keyboard-operable (Enter/Space), `aria-expanded`.
- **Placement:** every node — drawers carry the editorial-trust load site-wide.
- **States:** collapsed (default) · expanded · one drawer open at a time per section (optional).
- **Mobile:** full-width expand, no horizontal overflow.

---

## 7. ZIP-quote (TO-PORT `cc-zip`)

5-digit ZIP entry (`#hzip`, aria "ZIP code") → location-specific quote/availability handoff.
This is the **single monetization seam** — Smart Match, value-frame, and every "from
$73/mo" figure defer to it rather than asserting a price.

- **Behaviour:** validate 5 digits → on submit `data-ev="quote_start"`, route to quote
  handoff with `zip` + active `need` + pinned plans as params. Invalid ZIP → inline error, no submit.
- **Placement:** Gateway hero + Premium page + sticky on Compare after a plan is pinned.
- **States:** empty · typing · valid (CTA enabled, jade fill) · invalid (error rail) · submitted (spinner → handoff).
- **Mobile:** numeric keypad (`inputmode="numeric"`), full-width field above CTA.

---

## 8. Dentist finder

The Premium page exposes a finder section (`#dentists`, tabbed). It locates Delta PPO
in-network dentists and is the bridge from "I picked Delta" to "lock in my dentist"
(the Compare node's `#nominate` form).

- **Behaviour:** tabs switch finder modes; selecting a dentist pre-fills the nomination
  form (`setNomPlan`, plan + area + need pre-generated). `data-ev="dentist_find"` on search,
  `data-ev="nomination_start"` on form focus, `data-ev="nomination_submit"` on send.
- **Placement:** Premium page (`#dentists`) + Compare (`#nominate`) + Gateway entry link.
- **Member ID:** never collected here; nomination only needs email + practice name (matches `compare` form).
- **Mobile:** tabs become a select or scroll row; form fields full-width, single column.

---

## 9. Analytics — `data-ev` taxonomy (one delegated listener)

All events flow through `initAnalytics()` → `dataLayer.push({event, plan, ts})`. No inline
handlers. Each control below carries `data-ev` (+ `data-key`/`data-name` for the plan).

| Module | Event | Trigger |
|--------|-------|---------|
| Compare tray | `plan_compare_add` | pin a plan |
| Compare tray | `plan_compare_remove` | un-pin |
| Compare tray | `comparison_open` | "Compare N →" |
| Feature filter | `filter_apply` | check a filter |
| Smart Match | `smartmatch_need` / `smartmatch_budget` | change need / slider |
| Value-frame | `valueframe_view` | frame renders / recomputes |
| Source drawer | `source_open` | expand a drawer |
| ZIP-quote | `quote_start` | ZIP submit |
| Dentist finder | `dentist_find` / `nomination_start` / `nomination_submit` | search / form focus / send |
| Glossary | `glossary_open` | term tap |
| Year-toggle | `matrix_year_toggle` | Year-1 / Later switch |

---

## 10. Cross-cutting rules

1. **One data source.** Every module reads `#cc-plans` (or the Compare node's `PLANS`).
   Never re-type plan facts per page — the inventory's "PORTED only when canonical" law.
2. **Delta is always the anchor**, never filtered or scored out of existence on its own hub.
3. **No price assertions without ZIP.** Smart Match + value-frame defer to ZIP-quote.
4. **Color law held:** body `#3A4A42`/`--ink`, links `#14525B`/`--jade-deep`, CTA fill
   `#082A30`/jade, accent `mint` only on dark fills. Body text ≠ CTA color, always.
5. **Honesty over optimism:** the ~6-month Delta wait surfaces in Smart Match cautions,
   filter notes, and source drawers — never suppressed to make Delta look no-wait.
6. **Mobile-first state parity:** every module degrades to single-column, ≥44px targets,
   sticky tray/subnav; nothing requires hover (tap + focus paths everywhere, per glossary impl).
