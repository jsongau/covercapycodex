# 07: Build Steps
### The phased order, so we ship this step by step
*Each phase is shippable on its own. Validate after each: JSON-LD parses, JS runs, FAQ matches schema, anti-AI scan passes, no broken links.*

---

## Phase 1: Rework the hub hero into two doors
- Replace the single-CTA hero on `/benefit-maxing/` with the two-door header from file 02.
- Add two pathway sections lower on the page: `#bm-care-now` and `#bm-strategize`, copy from file 05.
- Keep the existing sections that still serve (the stakes, the benefit year, verify, FAQ). Fold the old single audit handoff into the two pathways.
- Door CTAs scroll to the pathway sections. Escape line goes to the estimator.
- Validate, then ship. This alone makes the hub match the two-pathway idea.

## Phase 2: Wire the plan CTAs accurately
- Pathway A points at UHC Primary Dental, with Ameritas offered for urgent major work.
- Pathway B points at Humana Extend 5000.
- All plan CTAs go to `/compare-ppo-dental-plans` with the `plan` and `intent` params from file 06.
- Confirm the plan names and figures match file 03. Label every figure illustrative.

## Phase 3: Carry over the glossary hover
- Add `glossary-tips.js` and the cc-tip CSS to the hub and the crowns guide.
- Add the `copay` term and patterns from file 04.
- Apply the benefit-maxing wording overrides for annual maximum, waiting period, coinsurance, copay, deductible.
- Confirm each tooltip links to a live glossary page. Build `/guides/glossary/copay/` if you want a dedicated page.
- Test hover on desktop and tap on touch.

## Phase 4: Finish the treatment guides under the hub
- Build the remaining guides from the crowns template: root-canals, implants, braces-invisalign, whitening, dentures, fillings.
- Each guide names the pathway that fits it. A crown leans Pathway B because it rewards waiting out the major wait on a big maximum. A filling leans Pathway A because UHC covers it now.
- Each guide links up to the hub, across to the estimator and financing, and uses the glossary hover.

## Phase 5: Tighten the handoffs on the destination pages
- The estimator already accepts `?from` and `?treatment`. Confirm it can pre-select the treatment and read `path`.
- The financing page already reads `?from` and an imported balance. Confirm the `path` param carries through.
- The compare page should read `plan` and surface or highlight that plan. Build this when convenient, the param is harmless until then.

## Phase 6: Instrument and verify
- Fire `pathway_select` on door clicks and carry `path` on every exit event.
- Run the full anti-AI scan across every page. Confirm the audit note: arrows, dashes, banned words, CTA specificity, factual claims.
- Confirm every CTA resolves to a live page and no breadcrumb points at a 404.

---

## Suggested first session
Phase 1 and Phase 2 together. That turns the hub into the real two-pathway page with accurate plan routing, which is the heart of what this build is for. Phases 3 through 6 layer on after.
