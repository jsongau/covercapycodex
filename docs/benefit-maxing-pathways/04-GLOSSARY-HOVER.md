# 04: The Glossary Hover Carry-Over
### Reuse the cc-tip engine on Benefit Maxing, with benefit-maxing wording
*Engine: `assets/js/glossary-tips.js`. Already live on compare-ppo (13 uses) and the estimator (33 uses).*

---

## What exists today

`glossary-tips.js` ships three things:
1. A `TIPS` object: each term has a title, a short definition, and a "why it matters" line.
2. A `PATS` array of regex patterns that auto-wrap the first prose mention of each term.
3. A tooltip engine: a floating card on hover for desktop, tap to open on touch. The page's own term is skipped so a term page does not link to itself.

Terms already covered include ppo, waiting-period, annual-maximum, deductible, coinsurance, in-network, out-of-pocket, day-one, allowed-amount, coverage-major, coverage-basic, coverage-preventive, plan-year, calendar-year.

Each tooltip links to that term's glossary page under `/guides/glossary/{term}/`.

---

## What to do for Benefit Maxing

1. **Include the engine.** Add `<script src="/assets/js/glossary-tips.js" defer></script>` to the hub and to each treatment guide under `/benefit-maxing/`. Add the matching CSS for `cc-tip` (already shared in the hub theme, confirm it is loaded).
2. **Let autoTip run.** It wraps the first mention of each term automatically. The benefit-maxing copy already uses these terms naturally: annual maximum, waiting period, deductible, coinsurance, in-network, copay, day one. They will become hover terms without manual tagging.
3. **Set the page's own term** if a benefit-maxing page is itself a glossary term page, so it does not self-link. The hub is not a term page, so no skip needed there.

---

## New term to add: copay

The user asked specifically to link the remaining copay with the hover effect. The current TIPS has coinsurance and out-of-pocket but not a plain "copay" entry. Add one, since patients say copay even when the technical term is coinsurance.

```js
'copay': {
  t: 'Copay, your share after insurance',
  b: 'The part of a covered treatment you pay after the plan pays its share. On dental PPO plans this is usually a coinsurance percentage, for example you pay about half of a crown after the plan pays the other half, up to your annual maximum.',
  w: 'The copay is the number that actually lands on your card. After insurance lowers it, it can often be spread into monthly payments.'
}
```

Add a pattern so prose mentions wrap:
```js
[/\bcopays?\b/i, 'copay'],
[/\bremaining (?:copay|balance)\b/i, 'copay'],
```
Point the copay tooltip link at `/guides/glossary/coinsurance/` for now, or build `/guides/glossary/copay/` if you want a dedicated page.

---

## Benefit-maxing wording overrides

The shared TIPS are written for someone choosing a plan. On Benefit Maxing, the reader already has a plan and is trying to use it. Override the wording for a few terms so the definitions speak to using, not buying. Do this by passing a small override object on the benefit-maxing pages before the engine runs, or by branching on the canonical path inside the engine.

| Term | Benefit-maxing wording (the "why it matters" line) |
|---|---|
| annual-maximum | This is the pool of money your plan set aside for you this year. Whatever you do not use returns to zero at the reset, so the goal is to use it on the work that matters most. |
| waiting-period | On the plan-ahead path, the waiting period is the price of a much larger maximum. Wait it out once and the plan pays far more on every crown after. |
| coinsurance | Coinsurance is the share you pay after the plan pays its part. It is the number that becomes your monthly payment if you finance it. |
| copay | After the plan pays its share, the copay is what is left. It can often be spread into monthly payments, sometimes at 0% APR. |
| deductible | You pay it once, usually early. After it is met, the rest of the plan year is your least expensive window, so timing larger work after the deductible saves money. |

Keep the title and the short definition from the shared TIPS. Only the "why it matters" line changes, so the term stays consistent across the site while the framing fits benefit maxing.

---

## Formatting note

The hover card uses the existing cc-tip styling. Do not restyle it heavily, consistency across the site is the point. If a visual cue helps, add a thin dotted underline under hover terms on the benefit-maxing pages only, so readers learn the words are interactive. Keep it subtle and on brand. No color outside the existing tokens.
