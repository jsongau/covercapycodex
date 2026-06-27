# Measurement + Roadmap: Mega-Nav 9.6 → 10

## What to instrument
Fire one event per intent, with consistent props (`destination`, `tier`, `position`, `query`).
- **Nav link clicks** by destination group (states, metros, insurance hub, guides, popular searches).
- **Search usage**: query submitted, zero-result queries, suggestion accepted.
- **Result-card actions**: book/verify, view profile, share, each tagged with rank position.
- **Controls**: radius slider drags, weekend/network toggles, drawer opens/closes.
- **Hub entrances** from nav vs. organic/SEO.

## KPIs that matter (no vanity)
1. **Search-to-result rate** — searches that surface ≥1 card (catches zero-result gaps).
2. **Result-to-book rate** — cards shown → verify/book click.
3. **Hub entrances from nav** — nav as a discovery engine, not decoration.
4. **Assisted conversions** — nav/hub touches in paths that end in a verify request.

## SEO measurement
Track Search Console **impressions + clicks to hub pages** (T3/T4) and **internal-link crawl coverage** (% of T5 pages reachable within 3 clicks). These prove internal-linking and GEO popular-searches work without conflating with paid traffic.

## A/B testing plan (highest leverage)
Run sequentially to avoid interaction effects; ship only on clear lift in result-to-book or assisted conversions.
- **Proof points on/off** — real review counts/ratings beside cards (must be real numbers).
- **Hub-promotion ordering** — insurance hub vs. guides vs. popular searches first.
- **Popular-searches row** — present vs. absent in nav (GEO-localized).
- **Benefit-maxing copy** — "free through CoverCapy" framing vs. control on CTAs.

## Sequenced roadmap

**Quick wins (weeks 1–3)**
- Instrument all events above; build the 4-KPI dashboard.
- Add **popular-searches row** (GEO) + **SEO internal linking** between hubs.
- Surface **real proof points** (only verified ratings/counts).

**Bigger bets (weeks 4–10)**
- A/B proof-points and hub-promotion ordering.
- **Insurance hub** prominence + **guides featured** placement, measured on hub entrances.
- **Benefit-maxing copy** test on CTAs.
- **Personalization** (last city/carrier) once baseline conversion is stable.
- **Scalability**: templatize nav data so 6,400 pages stay consistent as inventory grows.

Decision rule: promote a change only when it moves result-to-book or assisted conversions, never raw clicks.
