# Mega Nav — Insurance Panel Strategy

## Goal
Route nav authority and clicks to `/dental-insurance/`, the planned top SEO asset. Carriers exist to support that hub, not to outshine it.

## Structure (3 zones)

**1. Hero / featured (top, full width of panel)**
- Single emphasized card: **Dental insurance guide** linking to `/dental-insurance/`.
- One-line support text below it. This is the only visually weighted item in the panel.

**2. Carriers (clean 2-column list)**
- Delta Dental, UnitedHealthcare, MetLife, Guardian, Humana, Ameritas.
- Each links to its carrier page (`/dental-insurance/{carrier}/`). Equal visual weight, alphabetical or by page maturity. No badges, no fake ranking.

**3. Trending / Popular (conditional)**
- Show **"Most compared"** ONLY if backed by real data: comparison-tool event counts or page pageviews from the last 30 days, minimum sample (e.g. 500 sessions) per item, refreshed on build. Label it with the period so it reads as honest.
- If that data is not wired up, fall back to a **static "Popular carriers"** list (curated, not labeled live or trending). Never present a hand-picked list as live data.

## Anchor text & linking
- Hero anchor: "Dental insurance guide" or "Compare PPO dental plans" — descriptive, keyword-bearing, not "Learn more."
- Carrier anchors: exact carrier name (e.g. "Delta Dental"). Clean exact-match anchors pass strong relevance.
- The hub appears in the nav on every page, so it earns sitewide internal links — the main reason to feature it.

## Emphasize vs demote
- **Emphasize:** the hub link (hero card) and the comparison page.
- **Demote:** carrier links to a plain list, secondary weight. Drop any carrier without a real page rather than linking to a stub.

## Final copy (compliant)
- Hero card: "Dental insurance, explained" / support: "PPO carriers, coverage basics, and how to compare plans."
- Section labels: "Carriers" and "Most compared" (data-backed) or "Popular carriers" (static).
- CTA: "Compare PPO dental plans"
