# Phase 2.5 — PPO Hub Build Continuation Brief

**Target file:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26/dental-insurance/ppo-plans/index.html` (the just-built Lean MVP scenario-first hub, ~1452 lines, plan-page design system).

## USER DIRECTION (Jay, 2026-06-26) — what to change
1. **De-confine the layout.** The current canvas is min(1160px) with a ~680px center column between two 220px rails; it reads too narrow. WIDEN: bigger max canvas (~1320 to 1440px), a readable center column (~720 to 780px), rails can be a touch wider, less dead margin. Middle content must be comfortable to read.
2. **Do NOT over-feature Aetna.** The right rail currently spotlights Aetna/CVS as a near-permanent block. Aetna is one of eight. Replace with a CONTEXTUAL, ROTATING plan spotlight that changes based on (a) what the visitor selects in the left rail / scenario finder, and (b) what plan story they are scrolling past (IntersectionObserver). Each plan gets its own strength headline:
   - UnitedHealthcare Primary Dental: fastest activation, cheapest, day-one preventive
   - Guardian Premier 2.0: kids braces, plus highest day-one filling coverage (85%)
   - Ameritas PrimeStar: immediate major coverage for root canals and crowns (no waiting period)
   - Humana Extend 5000: highest lifetime implant coverage ($4,000 lifetime, $5,000 annual max)
   - MetLife NCD Complete: one-time lifetime deductible and highest annual maximum ($10,000)
   - Mutual of Omaha: seniors / 65+, no-wait major, $5,000 max, $3,000 lifetime implant
   - Delta Dental: largest network, adult and child orthodontics
   - Aetna Dental Direct: CVS ExtraCare perks (one spotlight among equals, not dominant)
3. **More interactivity, not just static 3 columns.** The layout may break and reform: a sticky bottom POP-OFF bar that surfaces the current best-match plan + verify CTA; cards that change/highlight/reorder based on selection or browse; the sticky rail content swaps based on the left-rail selection.
4. **Crazy SEO and GEO welcome.** Aggressive answer blocks, schema, SERP-feature targeting, entity coverage. Stay accurate (SSOT only) and policy-safe.

## HARD CONSTRAINTS (unchanged)
- Plan facts ONLY from `/data/plans/*.md` SSOTs. No fabricated numbers. Premiums labeled "~/estimate".
- No em-dashes. Reuse the plan-page design tokens (no invented colors). Accessible (radiogroup/radio, aria-live, aria-expanded). Vanilla JS, self-contained, sessionStorage ok, no localStorage required, no member-ID storage.
- Respect SSOT do_not flags (UHC not in NY; Aetna CVS perk excluded in 9 states; Delta 16 states; MOO never claim guaranteed next-day activation; Guardian adult ortho not covered).
- Reconciled facts (already correct in the hub): Aetna $1,250 + 6-mo basic wait; Guardian implants covered 60%/$1,250 lifetime + child ortho 60%/$1,500 lifetime; MOO no-wait 20%->50% + $3,000 lifetime implant; Humana $75 ded; MetLife $10,000 max graduated + $100 lifetime ded + $3,000/yr implant; Ameritas no-wait day-one major 20%->50%; Delta 16 states.

## 15-AGENT WORKSTREAM (each writes a tight, implementation-ready .md here)
01 layout-width-fix · 02 dynamic-rail-architecture · 03 bottom-popoff · 04 card-interactivity · 05 new-interactive-sections · 06 plan-strength-spotlights · 07 balance-audit · 08 geo-answer-blocks · 09 schema-maximization · 10 serp-feature-targeting · 11 internal-linking-geo · 12 ux-readability-critique · 13 conversion-critique · 14 mobile-dynamic-critique · 15 patient-test-roundtable

Then a single integration pass applies the consensus to the hub file.
