# /data/plans/ — Single Source of Truth for featured insurance plans

This folder holds ONE canonical fact file per featured insurance plan. It is the only authoritative source for plan facts. Every plan page, the compare page, the dental-insurance hub, and every AI agent must read the relevant file here before stating any fact about a plan.

## Why this exists
Plan facts were scattered across prompts, prose notes, and individual pages, so each new build re-derived numbers from memory and drifted, which produced pages with wrong information (for example calling a lifetime deductible "vanishing", or stating an implant cap as lifetime when it is per calendar year). A single sourced, dated fact file per plan stops that.

## The rules (do not break these)
1. A fact about a plan (premium, annual maximum, deductible, coverage percentage, waiting period, network, activation, caps) may only appear on the site if it appears in that plan's file here.
2. Every fact field must trace to a source listed in `sources`, and the file must carry a `last_verified` date.
3. If a number is an estimate (for example premium, which varies by state, age and ZIP), it must be labeled as an estimate in the field value.
   - The displayed `monthly_premium` is a CoverCapy estimate, ROUNDED TO THE NEAREST $5 (so a brochure average of $55.79 is shown as ~$60). It is not a brochure fact. Do NOT replace the rounded estimate with an exact brochure average; keep the exact figure only as supporting detail in the field text.
4. Never invent or guess a plan number. If a fact is unknown, set the field to `UNVERIFIED` and add it to the verification queue, do not fill a placeholder.
5. The `do_not` list in each file captures known traps. Builders and agents must honor it.
6. When a page is built or edited, reconcile it against this file. If they disagree, this file wins (after re-verifying against the source).

## Files
- `_TEMPLATE.md` — copy this to start a new plan file.
- `metlife-ncd-complete.md` — verified gold standard.
- One file per featured INDIVIDUAL plan: delta-dental-ppo-premium, guardian-premier-ppo, ameritas-primestar, uhc-primary-dental, aetna-dental-direct, humana-extend-5000, mutual-of-omaha-dental.

### Group / employer plans (added 2026-06-26)
Separate product line from the individual plans above. Group rates are quote-only (never published) and plan designs are employer-selectable, so these files document ranges, real example designs, and employer mechanics, with every estimate labeled. One file per carrier's group/employer dental PPO:
- `humana-group-dental` (verified — HERO plan), `beam-group-dental` (verified — modern runner-up), `metlife-group-dental` (verified), `delta-dental-group` (verified), `guardian-group-dental` (verified), `ameritas-group-dental` (verified), `uhc-group-dental` (verified), `aetna-group-dental` (verified), `cigna-group-dental` (verified), `principal-group-dental` (verified), `mutual-of-omaha-group-dental` (partial — group numbers quote-only, do not publish).
- "$5,000 maximum" guardrail: only Humana, Beam (Ultra), and MetLife may carry that banner. Delta/Guardian/UHC/Aetna/Cigna/Principal cap lower; Delta's $5,000 is an INDIVIDUAL plan that excludes ortho/implants.

### Additional carriers (added 2026-06-26)
Group/employer: `anthem-group-dental` (Anthem BCBS, ~14 states; carryover not high max; verified), `bcbs-group-dental` (BCBS FEDERATION overview + HCSC/CareFirst/Florida Blue/Highmark/Regence/Premera; verified), `renaissance-group-dental` (Delta affiliate, NOT Ameritas; verified).
Federal FEDVIP programs (individual enrollment via BENEFEDS, NOT employer group): `bcbs-fep-dental` (High = unlimited in-net max; verified), `geha-dental` (High = unlimited max; verified). Use these for federal-employee / "Blue Cross dental" / "GEHA dental" SEO, not the small-business hub.
Individual/family: `cigna-individual-dental` (completes Cigna; only the Dental 1500 covers ortho; verified), `spirit-dental` (Ameritas-underwritten; up to $5,000 RAMPING/matured max; $100 lifetime deductible; verified), `physicians-mutual-dental` (lower plans pay a FIXED-DOLLAR schedule, only Premier is true coinsurance; verified).
- $5,000 guardrail update: GROUP $5,000 banner stays Humana/Beam/MetLife ONLY. Spirit Pinnacle may carry "$5,000" in the INDIVIDUAL context if labeled as a matured/ramping cap. No Anthem/BCBS/Renaissance/Cigna $5,000.

### Employer hub content (in /data/employer/)
- `employer-dental-101.md` — how group dental works (cost-share, dependents, ortho, waits).
- `employer-plan-comparison.md` — multi-agent ranking + comparison matrix + $5,000 guardrail.
- `business-owner-hub-content.md` — hub positioning, copy blocks, and the dentist accreditation pitch.

## Status values
- `verified` — every fact field is sourced and dated.
- `partial` — some fields verified, others marked UNVERIFIED.
- `draft` — pre-filled from existing pages, not yet checked against a primary source. Treat its numbers as suspect until promoted to verified.
