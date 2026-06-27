# 07 — Personalization in the Mega Nav

## Concept
A subtle "Continue where you left off" element inside the Insurance menu. If a visitor viewed a plan (e.g. Humana Extend 5000), the menu quietly offers a way back to it on their next visit.

## Implementation
- Client-side only. Store the last 1 to 3 viewed plans in `localStorage` (key, label, path, timestamp).
- No login. No PII. No carrier account data, no member IDs, no email. Only the plan slug and display name already public on the page.
- Written on plan-page view. Read when the mega nav renders. Expire entries after 30 days.
- Degrade gracefully: if JavaScript is off or storage is empty, the slot simply does not render. The rest of the nav is unaffected.

## Where it appears and how subtle
- Lives at the bottom of the Insurance column, under a quiet overline label "Pick up where you left off" in `--teal-300`.
- One line per plan, max two plans. Small type, no badge, no color block, no animation.
- Reserve the slot height in CSS so adding the row never shifts the menu (avoid layout shift).

## When to show vs hide
- Show: at least one valid, non-expired entry exists.
- Hide: empty state, expired entries, or storage unavailable. Never render an empty header or placeholder.

## Honest value assessment
- Strong returning-visitor and UX signal: faster re-entry, lower friction, higher return-to-plan rate.
- Near-zero SEO value: content is user-specific, often not crawlable, and not in the static HTML.
- Priority: build it as a UX polish item, not an SEO investment. Ship after core nav and crawlable links are solid.

## Risks
- Layout shift and clutter: cap at two entries, reserve space, no decoration.
- Privacy: store only public plan identifiers, set expiry, offer a one-tap clear.
- No-JS: must vanish cleanly.

## Recommended copy (compliant)
- Label: "Pick up where you left off"
- Row: "Humana Extend 5000"
- Link text: "Back to this plan"
- Clear control: "Clear recent plans"
