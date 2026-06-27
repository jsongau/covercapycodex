# Delta Dental Hub — Plan & Defect List

> Synthesis of the 10 Delta agents (`agents/delta/`). June 2026.
> **Delta Dental is a full hub. PPO Premium is the GATEWAY into it. There is no "PPO Basic." Scheme = T5 jade.**

## The hub (real structure, on disk)

```
/dental-insurance/ppo-plans/delta-dental/
├─ index.html            T3 HUB (carrier dispatcher)
├─ premium/      ★ PPO PREMIUM = THE GATEWAY (owns the dentist finder + verify + nominate)
├─ compare/              Delta vs the field / "is Delta good?"
├─ over-65/              SCAN seniors (DeltaCare HMO vs PPO buy-up)
└─ uc-students/          UC SHIP students → parents ~10 campus leaves + a uc-dental-access data study
```

The gateway thesis: **a buyer enters on Premium, and Premium opens the whole hub** — routing seniors → Over-65 and students → UC-Students, everyone into the finder/verify, then the Delta enrol handoff.

## Delta hub page (`delta-dental/index.html`) — layout & CTA hierarchy

The hub index has a deliberate **two-tier** action hierarchy (decided June 2026):

- **PRIMARY — feature PPO Premium.** The hub leads with a large featured PPO Premium card/hero: spec sheet (from $/mo · $2,000 max · 100/80/50), the "best for" line, and the primary CTA **"View the PPO Premium plan →"** (teal-night fill). Premium is the flagship and the doorway; it gets the visual weight.
- **SECONDARY — explore the hub.** Beneath/beside it, a quieter **"Explore the Delta hub"** rail of ghost cards to the sub-hubs: Compare · Over-65 (SCAN) · UC Students · Find a Dentist. Ghost/outline styling (teal-700 text, not a fill) so it reads clearly as secondary.

Recommended hub-index section order:
1. Breadcrumb + carrier eyebrow + reviewed/updated line
2. Carrier entity summary (largest network, A++? no — Delta is A; adult orthodontics, 1st/15th activation) + "Delta at a glance" stats
3. **★ Featured PPO Premium card (PRIMARY CTA)**
4. **Explore-the-hub rail (SECONDARY)** — Compare · Over-65 · UC Students · Find a dentist
5. Network (PPO vs Premier) with glossary tooltips
6. Best-fit treatments + who Delta suits
7. Dentist-verification bridge
8. FAQs + sources/update log

This keeps one primary action (Premium) per the design-system "one most-fitting" rule, and makes the sub-hubs discoverable without competing with the flagship.

## 🔴 Critical defects found on the live pages (fix before promoting the hub)

| Sev | Defect | Where | Agents |
|---|---|---|---|
| 🔴 | **~11–20 broken links** — the 10 `students/{campus}/` leaves + `uc-dental-access` data study are linked but **don't exist on disk** | hub index, uc-students | O7, O9 |
| 🔴 | **Color collision** — CTA, links, active chips all one green | shared CSS | O6 → **FIXED** (T5 jade) |
| 🔴 | **`Offer.price:"73"` / `InStock`** on an illustrative premium (forbidden for quote-variable price) | hub, premium | O10 |
| 🟠 | **Compare** has no breadcrumb + no `BreadcrumbList` schema (highest-intent page) | compare | O9, O10 |
| 🟠 | **Live mega-nav placeholder** ("YOUR MEGA NAV — placeholder —") shipping | compare, over-65 | O10 |
| 🟠 | **Two divergent subnavs** (6-label vs 4-label) → on mobile both `display:none` = zero lateral nav; audience hubs not co-navigable | all | U1, U4, O9 |
| 🟠 | **Gateway under-surfaces sub-hubs** — Premium body links only Compare; Over-65 + UC-Students orphaned from the doorway | premium | U1, U2, U5, O8 |
| 🟠 | **No on-site enrol step** — journey dead-ends at verify; only an offsite Delta link | all | U5 |
| 🟠 | **Claim drift vs verified brief** — page shows ~6-mo waits (brief: 12-mo major/implant/ortho); whitening flat "Yes" (brief: state-specific) | premium | O8 |
| 🟡 | Long titles, em-dashes, ™ glyph (CLAUDE.md violations); no OG/Twitter; no reusable Delta `@id`; `www` vs non-`www` host split | all | O7, O10 |

## The plan (priority order)

1. **✅ Color — DONE.** T5-jade applied to `assets/ppo/ppo-system.css`: CTA = `--teal-night`, links = `--teal-700`, active = `--mint-soft` tint, body = `--ink`. Single scheme (palette toggle dropped). Body text can never again be the CTA color.
2. **Unify the subnav** into one ≤8-label horizontal-scroll `cc-subnav` on every node (incl. UC-Students), un-hidden on mobile, active pill in `--paper-2` (not mint). (U1, U4)
3. **Make the gateway open the hub** — add an "Is this you?" router rail under the Premium hero (seniors → Over-65, students → UC-Students) + surface all sub-hubs in nav + footer. (U2)
4. **Fix correctness** — build the `uc-dental-access` data study, then the 10 campus leaves rendered from live office-count data (noindex zero-result campuses); add Compare's breadcrumb + schema; remove the mega-nav placeholder. (O7, O9)
5. **Fix schema/metadata** — strip `Offer.price`/`InStock` (model the plan as a price-free `Service`); one reusable `#carrier-delta` Organization with `sameAs`; BreadcrumbList on every node; OG/Twitter + robots per node; shorten titles, kill em-dashes/™. (O10)
6. **Align claims to the brief** — 12-mo major/implant/ortho waits; whitening state-flagged; surface the true differentiators (largest network, adult orthodontics, 1st/15th activation). Premiums stay frozen. (O8)
7. **Add the missing enrol step** — verify → plan-confirm + total-cost Y1/Y2 + predetermination → Delta handoff as the *final*, not only, step. (U5)
8. **Wire the interactive modules** on the gateway/compare (compare tray, feature filters, Smart Match lens, value-frame, source drawers, ZIP-quote) — Delta locked as a baseline column; keep its ~6-mo/12-mo wait visible, not optimized away. (U3)

## Sub-hub notes
- **Over-65** is the strongest as built (DeltaCare HMO vs PPO buy-up, Medicare-disclaimed, honestly tells most seniors not to double-buy). Keep.
- **UC-Students** has a live campus-map finder but its whole child cluster is missing — build it before promoting.
- **Compare** is the most commercially valuable but has the worst technical hygiene (no breadcrumb/schema).
