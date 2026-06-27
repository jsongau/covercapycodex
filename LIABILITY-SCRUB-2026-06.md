# Liability scrub — June 2026
Removed every false-capability / unverifiable claim from the hub + profile tiers (copy AND structured data), across the generator and all 6,610 rendered pages. Honest, capability-accurate wording only.

## What was removed / rewritten (claims of a service we don't perform)
- "We call the office for you" → "Check your plan before you book"
- "Live eligibility check — deductible, annual max, co-insurance" → "See each office's listed PPO carriers and ratings"
- "Free eligibility check" → "Coverage check" / "Confirm your plan before booking"
- "CoverCapy provides a free eligibility check that pulls your real benefit data…" → "Check your benefits with your insurer or the office before you book…"
- "pulls your real benefit data" → "shows listed carrier information"
- "eligibility for your specific plan can be verified through CoverCapy at no cost" → "your specific plan can be confirmed with the office before you book"
- "CoverCapy verifies network participation / carrier acceptance / which offices accept your plan" → "lists" / "confirm with the office"
- "{N}+ verified offices" → "PPO offices listed"
- "{N}+ offices verified as of {month}" → "offices listed, updated {month}" (no false verification claim)
- "Verified in-network offices" → "PPO-participating offices"
- "— {N}+ Verified Offices | CoverCapy" (titles) → "— {N}+ PPO Offices Listed | CoverCapy"
- "We verify your insurance/PPO benefits…" → "Check … with the office"
- "get covered today, see a dentist tomorrow" (alert bar) → "compare individual PPO plans, effective dates and waiting periods"
- Carrier "% of offices" rail card ("Carriers Accepted … 18% of offices") → REMOVED (generator `carrierRailCard()` now returns '')

## What was deliberately KEPT (protective / honest copy)
- "Never enter an SSN or Member ID here."
- "No Member ID, Group Number, or Social Security number is included in this message. CoverCapy does not send this for you."
- "Carrier listings do not guarantee that every plan or network tier is accepted, and CoverCapy does not perform a live eligibility check on this page." (2,210 pages)
- The MetLife SSN caution note.

## Scope
- Generator: `seo-build/generate-plans.js` — scrubbed + `carrierRailCard()` neutralized (future builds stay clean). Backup saved outside the repo.
- Rendered: all 6,610 `dental/**/index.html` (two passes, every state). Verified 0 occurrences of the removed phrases across all states.

## Deploy
```bash
cd "/Users/kytlegacy/Claude/Projects/CoverCapy Dentists Scape"
git add -A
git commit -m "compliance: remove false eligibility/verification claims from hub + profile pages (copy + schema)"
git push   # Vercel auto-deploys
```
Re-running the generator later is safe — it now emits the honest wording by default. Not legal advice; if in doubt, have counsel review the live copy.
