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
- One file per featured plan: delta-dental-ppo-premium, guardian-premier-ppo, ameritas-primestar, uhc-primary-dental, aetna-dental-direct, humana-extend-5000, mutual-of-omaha-dental.

## Status values
- `verified` — every fact field is sourced and dated.
- `partial` — some fields verified, others marked UNVERIFIED.
- `draft` — pre-filled from existing pages, not yet checked against a primary source. Treat its numbers as suspect until promoted to verified.
