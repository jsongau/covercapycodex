# Template brief: CoverCapy city dentist-directory pages

Applies to every generated city / local-area page of the form
`/dental/{state}/{market}/{city}/` produced by `seo-build/generate-plans.js`
(functions `buildCityPage`, `buildLocalAreaHub`).

These are generated pages. Every recommendation below is template-level: implement once in the generator and it propagates to hundreds of city pages. Two sample pages were audited (Rancho Cucamonga, Coronado Island); the patterns and defects generalize.

Date: 2026-06-25

---

## Why this matters now

Two of these pages are already pulling Google Search Console impressions and clicks with no targeted optimization. That means the template ranks. Small systemic fixes compound across the whole `/dental/` corpus (~6,400 URLs). The risk is the inverse: a systemic thin-content or duplicate pattern hurts the whole corpus at once. Optimize and de-risk at the template, not page by page.

---

## What the live SERPs reward (observed 2026-06-25)

For "dentist in {city}", "ppo dentist {city}", and "{carrier} dentist {city}" across Rancho Cucamonga and Coronado:

- The Map Pack (Google Business Profiles) owns the top of transactional queries. A directory rarely displaces a GBP there.
- Below the pack, organic is split between: the carrier's own city directory (Delta Dental `/find-a-dentist/california/{city}-dentists/`), Yelp "Best 10 Dentists in {city}", Zocdoc/Opencare booking directories, and individual practice sites with strong NAP.
- Carrier-qualified queries ("dentists who accept Delta Dental in {city}") are a distinct, winnable lane (Opencare ranks on exactly this).

Strategic implication: CoverCapy wins by being the best PPO-qualified directory, i.e. the page that answers "which {city} dentists take MY carrier and tier", with real local context. It will not win the Map Pack. It can win "ppo dentist {city}" and "{carrier} dentist {city}" organic if pages are unique, carrier-data-rich, and locally grounded.

---

## Systemic title and meta formula

Current generator output uses an em-dash and overruns length on both samples. Replace with:

Title (target <= 60 chars, no em-dash, pipe separators):
```
PPO Dentists in {City}, {ST} | {N} In-Network Offices
```
- Use the exact office count `{N}` from the data, not "8+". Hedged counts read as untrustworthy and add no value.
- Use the common short city name in the title (e.g. "Coronado" not "Coronado Island") when a shorter, higher-volume variant exists; keep the long form in body copy.
- If `{N}` is small (1 to 3), the count still belongs in the title; it sets honest expectations.

Meta description (target <= 155 chars):
```
Compare {N} PPO-participating dentists in {City}, {ST}. Check {Carrier1}, {Carrier2} and {Carrier3} acceptance and verify your plan free before booking.
```
- Inject the top 2 to 3 carriers actually present in that city's listing data so the meta is unique per city and matches "{carrier} dentist {city}" intent.
- Include the ZIP when a city maps cleanly to one or two ZIPs.

Both title and meta must be data-driven tokens so they self-vary across cities (this is what prevents duplicate-meta penalties at scale).

---

## Anti-thin-content content blocks (every city page must have all)

1. Local-context paragraph, generated from data, not boilerplate. Pull from a per-city or per-market data field: ZIP code(s), county, 1 to 2 named commercial corridors or landmarks, and 2 to 3 real neighbor cities. This is the single biggest differentiator from scraped directories. Avoid a single boilerplate sentence reused verbatim ("{City} is part of the {Metro} area") which is the current Coronado pattern and is thin.

2. Carrier-summary line: "PPO carriers accepted by {City} offices include {distinct carriers from listings}." Drives "{carrier} dentist {city}" without spinning up thin per-carrier pages.

3. Per-listing carrier pills: every office card must show its carriers when the data has them. The Coronado page omits these entirely while naming carriers in the intro, a parity bug. Make carrier pills unconditional when data exists.

4. "How to verify your plan in {City}" steps (3 to 4): find carrier, click verify, confirm PPO vs Premier tier, confirm new-patient availability. Genuinely useful, hard for a scraper to fake.

5. Localized FAQ (3 to 6 Q&A), with at least one question that is unmistakably local (ZIP served, pediatric availability, "do I have to leave {City} for an in-network office"). Vary wording across cities; do not ship a single identical FAQ block on every page. Mirror to FAQPage schema.

6. Provenance / "how this list is built" line: offices are PPO-participating; names, addresses, ratings reflect public Google data as of the build date; verification is free and confirmed at booking. E-E-A-T and honesty signal.

7. Visible "Listings updated {Month Year}" with a dynamic token.

A page that has all seven blocks, populated from real per-city data, is not thin even at 4 listings. A page missing 3+ of these (current Coronado) is at thin-doorway risk.

---

## Schema pattern (emit on every city page)

- `BreadcrumbList`: home > state > metro/county > city (and > local-area where applicable). 4 levels.
- `ItemList`: the offices as ordered `ListItem`s (position, name, url-to-T5). This is the canonical directory-page schema and must be present on every city page.
- `LocalBusiness` / `Dentist` per listing: emit when the office has name + address. Complete partial addresses with the city ZIP before emitting so addresses are valid (Coronado listings currently lack ZIP).
- `FAQPage`: mark up the localized FAQ; keep JSON-LD identical to visible text.
- Ratings rule (hard guardrail): never emit a page-level `AggregateRating`, and never emit per-office `aggregateRating` unless it is the true Google rating for that office, attributed to Google. Hero "avg rating / total reviews" stats must be labeled as combined Google figures for listed offices, never presented as a single rated entity. Do not fabricate, blend, or round-up reviews or ratings anywhere.

---

## Internal-link mesh (city <-> nearby city <-> metro <-> state)

- Nearby-city block: link 6 to 12 real neighboring cities in the same metro, anchor = bare city name + office count. Links must be reciprocal (target links back). Never ship a self-referential one-item block (the Coronado "1 cities covered" loop is a defect, fix at template level so a city never lists only itself).
- Up-links: contextual in-body link to the metro/county hub and the state hub, in addition to the breadcrumb.
- Carrier-cluster links: from the carrier-summary line, contextual links to carrier hubs (e.g. `/delta-dental/`) and to `/compare-ppo-dental-plans`. This stitches the city mesh into the carrier content cluster.
- find-my-dentist: `?q={City}` (already correct on both samples).
- Resolve wrapper/child duplication: where a "local-area" page (e.g. "Coronado Island") wraps a single real city ("Coronado"), pick one canonical URL. Either canonical the wrapper to the city, or make the wrapper canonical and 301 the child. Two near-identical single-city pages competing is self-cannibalization across the corpus and should be detected and collapsed in the generator (flag any local-area page whose child-city count is 1).

---

## Scaling without thin-content penalties

1. Uniqueness is data-driven, not hand-written. Every unique element (title, meta, intro, FAQ, carriers, neighbors) is populated from per-city fields. The more real per-city data piped in, the safer the corpus.
2. Set a minimum-content gate. Cities with very few listings (1 to 2 offices) and no carrier data are the highest penalty risk. Options: (a) suppress / noindex city pages below a content threshold until they have N>=3 listings or sufficient unique copy, or (b) roll them up into the metro page. Track which `/dental/` cities fall below the gate.
3. Kill the fabricated-testimonial pattern. The Rancho hero opens with a quoted "patient" line that reads as a fake review. Remove quotation framing from any invented narrative copy template-wide; it is both an E-E-A-T and a trust risk and may read as deceptive.
4. Vary FAQ and intro phrasing with light per-city logic (ZIP, carriers, pediatric-present, weekend-present) so no two pages share identical block text.
5. Honesty of claims: "verified" should mean verified; otherwise use "PPO-participating, confirm your tier" (the Rancho page already does this correctly lower down, the Coronado meta does not). Align the whole corpus to the honest phrasing.
6. Monitor at the cluster level: watch GSC for the city corpus as a group. Roll out these template changes, then track impressions/clicks/position movement across all city pages, since one generator change moves hundreds of URLs at once.

---

## Priority order for the generator change

1. Fix titles/metas to the data-driven formula (removes em-dashes, fixes length, injects carriers + count). Highest leverage, lowest risk, hits every page.
2. Make carrier pills unconditional and add the carrier-summary line (parity bug + ranking unlock).
3. Add ItemList + per-office LocalBusiness + FAQPage JSON-LD universally, with the no-fabricated-ratings guardrail and ZIP-completed addresses.
4. Add the seven content blocks, especially the data-driven local-context paragraph and the localized FAQ.
5. Detect and collapse single-city "local-area" wrappers (Coronado-Island case) and fix self-referential nearby-city blocks.
6. Remove fabricated-testimonial copy.
7. Add a minimum-content gate / noindex rule for sub-threshold cities.
