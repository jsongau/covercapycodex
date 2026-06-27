# Plan card spec — the scannable at-a-glance unit

> CoverCapy · PPO plan presentation system · File 02 of 05
> The card is how a plan appears in any list or grid (the hub library, "alternatives",
> the rail). It must let a buyer answer *price / ceiling / what's covered / wait* in
> under three seconds, without opening the plan.

---

## 1. Anatomy (desktop)

```
┌─────────────────────────────────────────────┐
│  UNITEDHEALTHCARE                 ⌜MOST     ⌟ │  ← carrier kicker + optional ribbon
│  Primary Dental                    POPULAR   │  ← plan name (serif, large)
│  ░ Basic plan · ages ≤64                     │  ← plan shape + critical eligibility flag
│                                              │
│  From  $30/mo        Annual max   $1,000     │  ← PRICE is the biggest element on the card
│  illustrative        Deductible   $50/person │
│                                              │
│  ┌──────────┬──────────┬──────────┐          │  ← COVERAGE STRIP (always 5 cells, fixed)
│  │Preventive│  Basic   │  Major   │          │
│  │  100%    │   50%    │  Not     │          │
│  │ no wait  │ day one  │ covered  │          │
│  ├──────────┼──────────┤──────────┘          │
│  │ Implants │  Ortho   │                     │
│  │   Not    │   Not    │                     │
│  │ covered  │ covered  │                     │
│  └──────────┴──────────┘                     │
│                                              │
│  Coverage starts: Next business day          │  ← one timing line
│  Network: UnitedHealthcare Dental PPO        │  ← one network line
│                                              │
│  Cheapest on the shelf; basic care day one.  │  ← ONE-line "best for" (the only prose)
│                                              │
│  [ View full plan ]   [ Verify free ]        │  ← primary + secondary CTA
│  Last verified Jun 20 · view sources         │  ← single quiet governance line
└─────────────────────────────────────────────┘
```

The **coverage strip is the heart of the card** and the thing the current pages are
missing at a glance. It is always the same five cells in the same order
(Preventive · Basic · Major · Implants · Orthodontics), so a buyer's eye learns the
positions and can diff two cards instantly.

---

## 2. Required elements & order

1. **Carrier kicker** (uppercase, small, brass) + **plan name** (serif, large).
2. **Plan shape pill** (`Preventive` / `Basic` / `Major`) + any **hard eligibility flag**
   (e.g. "ages ≤64", "under review"). This is the fastest filter.
3. **Price block** — `From $X/mo` is the **largest text on the card**, with the
   `illustrative` qualifier directly beneath. Pair it with **Annual max** and
   **Deductible** in the same block (the three numbers buyers weigh together).
4. **Coverage strip** — 5 fixed cells. `%` big, `wait` small. `Not covered` cells render
   muted/italic so "what's missing" is as scannable as "what's there."
5. **Timing line** (Coverage starts) + **Network line** — one line each.
6. **One-line "best for"** — the *only* sentence on the card. Pulled from `best`.
7. **CTAs** — primary `View full plan` (→ detail page), secondary `Verify free`
   (→ eligibility). Optional tertiary `+ Compare` checkbox (see File 03 sticky bar).
8. **Governance line** — one muted line: `Last verified {date} · view sources`. Not a
   badge cluster.

---

## 3. Variants

### a. Compact card (rail / "alternatives" / dense lists)
Drop the coverage strip to a single inline summary and keep price + one differentiator:

```
Primary Dental — UnitedHealthcare          From $30/mo
Basic · Max $1,000 · Basic care day one    [ View → ]
```

### b. Expanded card (hub library, on "view details" toggle)
Reveals the **secondary specs** inline without leaving the list: whitening, vision
bundle, age cap, missing-tooth clause, graduated reimbursement, lifetime ortho max,
frequency limits. Lead-then-collapse: 5–7 specs visible, the rest behind the toggle.

### c. Recommended / "Most popular"
**At most one** card per list gets the treatment: elevated shadow, brass/teal header
band, and a ribbon. Drives the `recommended` flag from File 01. Never mark more than one —
it destroys the signal.

---

## 4. Mobile

- Card goes full width; **price block stays at the top** and stays the biggest element.
- Coverage strip becomes a **2-row, horizontally scrollable** 5-chip rail OR a stacked
  list `Preventive 100% · no wait` — whichever keeps all five categories visible without
  truncation. Never hide Major/Implants/Ortho on mobile; those are the decision cells.
- Collapse the "best for" sentence to two lines max with ellipsis.
- CTAs become full-width stacked buttons.

---

## 5. Rendering rules

- **Always render all five coverage cells**, even when null. A missing cell reads as "I
  don't know"; an explicit `Not covered` reads as a decision input.
- **Color the percentage, not the whole cell.** Keep backgrounds calm; let `100% / 80% /
  50%` carry the value and `Not covered` go gray. (Avoid a full red/green heatmap on a
  single card — save difference-highlighting for the comparison table, File 03.)
- **Price qualifier is mandatory.** `From` + `illustrative` every time; the number is
  never shown bare.
- **One governance line, muted.** No per-cell verification pills on the card.
- **Tap target ≥ 44px**, whole card is a link to the detail page, CTAs are real buttons
  layered above it.

---

## 6. Maps to existing CoverCapy components

Reuse the t4 classes already in the build so this is a refactor, not a rewrite:

| Card part | Existing class to reuse / adapt |
|---|---|
| Card shell | `.plancard` (hub) / `.alt-card` |
| Carrier kicker + name | `.pc-carrier` + `.pc-name` |
| Price block | `.pc-price` (enlarge), add an inline max/deductible pair |
| Coverage strip | **new** `.pc-coverage` 5-cell grid (reuse `.cov-table` cell styling, shrunk) |
| Plan shape / flag | `.chip.neutral` / `.chip.amber` |
| Recommended ribbon | new `.pc-ribbon` on `.plancard` |
| Governance line | `.conf` → demote to one muted `.pc-foot` line |

> The single highest-impact change: **add the 5-cell `.pc-coverage` strip to every card.**
> That one element is what turns the current text-heavy cards into a scannable spec unit.
