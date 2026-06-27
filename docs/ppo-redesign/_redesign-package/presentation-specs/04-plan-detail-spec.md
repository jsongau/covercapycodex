# Plan detail page spec — the full spec sheet (specs first, prose second)

> CoverCapy · PPO plan presentation system · File 04 of 05
> This **re-sequences** the existing plan detail page. The content the current page has is
> good; the *order* is wrong. A buyer should see the complete spec block before any
> explanation. Prose, scenarios, calculators, and disclaimers come after the specs.

---

## 1. New page order (top to bottom)

```
1. Breadcrumb
2. H1: "{Carrier} {Plan}: independent plan breakdown"
3. ░░ SPEC SHEET ░░                ← THE CHANGE: a dense spec block, above the fold
     ┌───────────────────────────────────────────────┐
     │  From $30/mo  ·illustrative   [ Verify free ]  │   price + primary CTA together
     │  Plan type: Basic · ages ≤64                   │
     │ ┌─────────────┬─────────────┬─────────────┐    │
     │ │ Annual max  │ Deductible  │ Coverage    │    │   3 limit tiles
     │ │  $1,000     │  $50/person │ starts:     │    │
     │ │             │             │ Next bus.day│    │
     │ └─────────────┴─────────────┴─────────────┘    │
     │  COVERAGE                                       │
     │ ┌──────────┬───────┬───────────┐               │
     │ │ Category │ Plan  │ Waiting   │               │   the 100-80-50 grid,
     │ │          │ pays  │ period    │               │   full width, first thing read
     │ ├──────────┼───────┼───────────┤               │
     │ │Preventive│ 100%  │ None      │               │
     │ │Basic     │ 50%   │ None      │               │
     │ │Major     │ Not covered       │               │
     │ │Implants  │ Not covered       │               │
     │ │Ortho     │ Not covered       │               │
     │ └──────────┴───────┴───────────┘               │
     │  Network: UnitedHealthcare Dental PPO           │
     │  Last verified Jun 20 · illustrative · sources  │   ← ONE quiet governance line
     └───────────────────────────────────────────────┘
4. ZIP / availability check (inline, compact)
5. At-a-glance verdict: "Best for…" + "Skip if…" (2-column, scannable)
6. ── everything below is supporting context, in this order ──
   • Waiting-period timeline
   • Annual-maximum depletion calculator
   • Secondary specs table (whitening, vision, age cap, ortho lifetime max,
     missing-tooth clause, frequency limits, reimbursement basis, graduated %)
   • Network: how to verify (2-step)
   • Major limitations
   • By treatment (links to treatment guides)
   • Illustrative total-cost example
   • How to enroll safely
   • Alternatives (3 cards, File 02 compact variant)
   • FAQ
   • Sources, verification status & update log (the source drawer)
   • Disclaimer
```

The difference from today: items **3 and 5 move to the very top**, and the spec sheet is a
single consolidated block instead of being split across hero tiles + a separate coverage
section lower down. Everything else the page already has stays — it just becomes the
"learn more" tail below the specs.

---

## 2. The spec sheet block (item 3) — required fields

Render straight from the File 01 object, in File 01 order:

| Zone | Fields | Treatment |
|---|---|---|
| **Price line** | `premiumFrom` + `illustrative` + primary CTA | Premium is the largest number on the page; CTA sits beside it |
| **Type line** | `planShape` + any hard flag (age cap, under-review) | One pill row |
| **Limit tiles** | `annualMax` (+ Y2), `deductible`, `effectiveDate` | Three equal tiles |
| **Coverage grid** | Preventive / Basic / Major / Implants / Ortho — `% · wait` | Full-width table, the focal element |
| **Network line** | `network` | One line |
| **Governance line** | `Last verified {date} · illustrative · view sources` | One muted line — **replaces** the per-tile "Needs verification" pills |

**Year-1 vs later toggle** lives on the coverage grid (only when a plan's rates change,
e.g. Ameritas, Humana). Default to Year 1; toggle relabels the cells and the footnote.

---

## 3. At-a-glance verdict (item 5)

Two short columns, scannable, no paragraphs:

```
✓ Best for                          ✕ Skip if
• Spending the least                • You need crowns/implants (not covered)
• Cleanings + occasional fillings   • You're 65+ (age cap)
• Under 65, healthy teeth           • You want a high annual maximum
```

This is the buyer's "is this me?" gate — keep it to bullet fragments, never prose.

---

## 4. Secondary specs table (item 6c)

Everything that doesn't belong in the headline grid but a thorough buyer wants, as a clean
two-column table (label / value), not prose:

| Secondary spec | Example value |
|---|---|
| Teeth whitening | Not covered / $200/yr allowance |
| Vision bundle | Included / No |
| Age eligibility | Ages 64 and under |
| Orthodontia maximum | $1,000 lifetime (separate from annual max) |
| Graduated basic | 80% yr1 → 90% yr2 → 100% after |
| Missing-tooth clause | Verify on policy |
| Frequency limits | 2 cleanings/yr; 1 crown/tooth per 5 yrs |
| Reimbursement basis | In-network contracted fee (MAC) |
| Dependent discount | Available |

Render a row only when the data exists; omit unknowns rather than guessing.

---

## 5. Cost realism (item 6f)

Keep the illustrative total-cost example, but anchor it to the spec sheet's numbers so it
never contradicts the grid: `premium × months + deductible + your coinsurance share +
non-covered`. State every assumption inline. This is the one place a paragraph of math is
welcome — because it's showing *how the specs combine*, which a grid can't.

---

## 6. Source drawer (item 6, last) — where verification actually lives

This is where the legal/provenance weight sits, so the spec sheet above can stay clean:

- Per-fact provenance: source URL, title, publisher, document date, retrieved date,
  jurisdiction, reviewer, and per-field confidence (`verified` / `state-specific` /
  `needs-verification`).
- Update log with dates.
- Corrections link.

A buyer who trusts the page never opens it; a buyer (or regulator) who wants to audit a
number finds full chain-of-custody one expand away. That division — **clean specs up top,
full provenance in the drawer** — is the whole trick.

---

## 7. Under-review plans (e.g. MetLife NCD Complete)

The one exception to "quiet governance": when `status: gathering-reviews`, the spec sheet
shows a **single prominent amber banner** ("Under review — not recommended yet; coverage
details unverified"), the coverage grid cells read `Under review` instead of percentages,
and the page stays `noindex`. Still only **one** prominent status element — the banner —
not a pill on every cell.

---

## 8. What changes vs. the current detail page (summary for implementers)

| Today | Change to |
|---|---|
| Specs split across 5 hero tiles + a coverage section lower down | One consolidated **spec sheet block** directly under the H1 |
| "Needs verification" pill on every tile and table cell | **One** muted governance line; provenance moves to the source drawer |
| Coverage % described in prose in several sections | All percentages live **only** in the coverage grid (single renderer) |
| "Who fits / keep comparing" mid-page | Moves up to the **at-a-glance verdict** right under the spec sheet |
| Reads top-to-bottom as an essay | Reads as a **spec sheet first**, with the essay as the optional tail |
