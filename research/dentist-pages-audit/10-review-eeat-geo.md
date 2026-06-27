# Dentist Pages Audit — Review/Rating Integrity, E-E-A-T, GEO

Scope: `seo-build/generate-plans.js` (source of truth for T5/`/dental/` output) plus ~22 on-disk legacy `/dentists/` prototype pages sampled across CA markets (Orange County, Inland Empire, LA County). Note: no `/dental/` canonical tree exists on disk in this snapshot — the only rendered dentist pages present are the older bespoke `/dentists/` prototypes. Findings below separate generator behavior (governs future builds) from legacy-page behavior (already shipped).

---

## A. REVIEW / RATING DATA INTEGRITY (highest priority)

### Generator (`generate-plans.js`) — mostly clean
The generator is disciplined about ratings. Verified across all render paths:

- **T5 visible rating** (lines 2255, 2428): gated on `rating && reviews > 0`. No rating block renders unless `google_review_count > 0`. Rating prefers `google_rating`, falls back to `weighted_rating` (1917–1920). Good.
- **T5 schema AggregateRating** (1963–1965): gated on `rating && reviews > 0`, `reviewCount = String(reviews)`. **Visible/schema parity holds** — both use the same `reviews` integer. Confirmed on-disk: `kyt-dental-services` (no review data) emits NO visible rating and NO AggregateRating. Correct.
- **City-page embedded dentist schema** (1521): correctly gated on `parseFloat(weighted_rating) > 0 && parseInt(google_review_count) > 0`. Good.
- **Hub aggregateRating** (1237–1242): gated on `total_reviews >= 10 && dentists.length >= 3`. Labelled as combined Google data across listed offices, never as a single rated entity. Hero rating pill (1590–1592, 2881–2883) only renders when `ratedOffices.length > 0`. Good.

**DEFECT A1 — Metro-hub ItemList fabricates reviewCount=1 (generator).** Line 1259:
```js
...(d.weighted_rating && parseFloat(d.weighted_rating) > 0 ? {'aggregateRating':{...,'reviewCount':d.google_review_count||1,...}} : {})
```
When an office has a `weighted_rating` but `google_review_count` is 0/null, this emits `"reviewCount":1` — a fabricated review count with no source. It also gates on rating ALONE (not on review count), unlike every other path. This is a Google structured-data policy violation (AggregateRating requires a real `reviewCount`/`ratingCount`) and a CLAUDE.md "no fabricated reviews" violation, and a manual-action / rich-result-loss risk.
**Fix (generator):** match the city-page guard exactly — `parseFloat(weighted_rating) > 0 && parseInt(google_review_count) > 0`, and use `String(parseInt(google_review_count))`. Remove the `||1` fallback entirely.

**DEFECT A2 — `lastChecked` / "Last updated" is the BUILD date, not a verification date (generator).** Lines 1929, 2267, 2297: `lastChecked` = `buildDate`. The page states "Data sourced from the office's public Google listing. Last updated {date}" and "Last checked {date}" using whatever day the build ran. This asserts a freshness/verification signal that is not real — every rebuild silently re-dates the page even if no data changed. E-E-A-T-eroding and borderline misleading.
**Fix (generator):** carry a real `data_verified_at` / `last_synced_at` timestamp from Supabase per dentist and render that; if unavailable, soften copy to "Listing generated {date}" rather than implying the data was checked.

### Legacy `/dentists/` prototype pages
**DEFECT A3 — Frozen hardcoded AggregateRating with fictional narrative (legacy, shipped).** `dentists/.../liu-peter-c-dds-chino-hills/index.html` hardcodes `"ratingValue":"4.9","reviewCount":"60"` in JSON-LD (line 303) plus a "1989 — Founded by Dr. Peter C. Liu… Ameritas is one of the first networks confirmed" timeline (520–527) that is almost certainly fabricated/unverifiable. The visible reviews section (735–746) is actually well-built (links out to Google/Zocdoc/Yelp, dates the figure "verified June 2026", refuses to "freeze a number") — but the *schema* still freezes 4.9/60, contradicting the visible copy and risking a frozen-stale rich result. Of ~22 legacy pages sampled, only this one carries an AggregateRating; the rest carry none.
**Fix:** these bespoke `/dentists/` pages are not generator output and should be retired/redirected to the canonical `/dental/` equivalents. If kept, strip the hardcoded AggregateRating (no live source) and the invented timeline.

---

## B. E-E-A-T GAPS (generator-level)

1. **No author / medical reviewer / "reviewed by" entity.** No T5 page names a credentialed human author or medical reviewer, and there is no `author`/`reviewedBy` in WebPage/Dentist schema (1987–1994). Medical/health-adjacent content. **Fix:** add a byline + `reviewedBy` (an editorial/clinical reviewer Person/Organization) and a visible "Reviewed by" line.
2. **No real licensing / credential signals.** Pages surface `doctor_name` only as "Led by {name}" (2253); no DDS/DMD license number, state board link, or NPI. **Fix:** if available, render license/NPI and link to the state dental board.
3. **NAP accuracy:** name/address/phone come straight from Supabase and are echoed consistently into schema (`telephone` e164, `address`), visible hero/rail, and FAQ. Parity is good; risk is only upstream data quality (no on-page cross-check). Phone is normalized to E.164 for schema — good.
4. **Sourcing line is thin** (see A2) — "public Google listing" is the only cited source, with a build-date timestamp. No link to the source listing.
5. **`dateModified` = `datePublished` = build date** (1990). Every rebuild resets both to "now" with no real change-tracking — a weak/again potentially misleading freshness signal.
6. **Stock imagery labelled "Sample image" + "hasn't uploaded photos yet"** (2274–2286) is honest (no deception) but contributes zero first-hand/experience signal. Acceptable, but flags thinness.

---

## C. GEO / AI-CITATION READINESS

Strengths: FAQPage schema with up to ~11 entity-rich Q&As per T5 (carrier acceptance, new-patient, phone, location, per-carrier questions) (1838–1879, 1984–1986); Dentist+LocalBusiness+MedicalOrganization graph with geo, areaServed, availableService; BreadcrumbList; ItemList of top offices on hubs. This is a solid quotable substrate.

Gaps:
1. **Hero lede is not fully answer-first / self-contained.** The H1 area leads with a CTA-flavored lede ("Check whether your exact PPO plan is likely accepted, then book…") rather than a single self-contained factual sentence an engine can lift (e.g. "{Name} is a PPO dental office at {address} in {city}, {state}, listed as accepting {carriers}, with a {rating}/5 Google rating from {n} reviews."). **Fix (generator):** add a one-sentence answer-first summary paragraph at the top of the About/Overview block built purely from entity facts.
2. **Templated FAQ answers are near-identical across offices** (only name/carrier/city tokens swapped). Low differentiation; AI engines and Google may treat as boilerplate. **Fix:** vary structure and inject office-specific facts (weekend hours, languages, specific procedures, distance-to-landmark) so answers are distinct.
3. **Hedged carrier language ("listed as accepting", "starting point, not a guarantee")** is honest and correct (see D) but is weak for extraction — engines prefer crisp assertions. Keep the disclaimer, but pair each carrier with a concrete, citable fact ("{Name} lists {carrier} among {n} PPO networks").
4. **No concise key-facts table / definition block** (address, phone, hours, carriers, rating as a compact list). A `<dl>` or table of entity facts is highly quotable and currently absent.
5. Legacy `/dentists/` pages are richer in bespoke prose but carry unverifiable narrative (A3) — not a safe citation source.

---

## D. "INSURANCE VERIFIED" / ACCREDITATION CLAIMS

- **Carrier claims are appropriately hedged, not overstated.** Insurance section copy: "A listing is a starting point — not a guarantee" (2293), disclaimer "Carrier listings do not guarantee… CoverCapy does not perform a live eligibility check on this page" (2297). FAQ answers consistently say "listed as accepting… confirm with the office." This is accurate and defensible. Good — no "verified in-network" overclaim in generator output.
- **One residual overclaim risk:** the rail note "Insurance verification is always free" (2443) and CTA "Check my insurance — free" imply a verification *service* exists; ensure the Phase-B `/api/verify-ppo` flow actually performs/queues a real verification, otherwise "verification" is aspirational.
- **Accreditation badges** ("Capy Accredited", "Platinum Elite", "Verified") render directly from `accreditation_status` (498–505, 1932, 2251) — substantiated only if that column reflects a real accreditation process. Badge renders even on unclaimed listings if the column is set; confirm the column is never auto-populated without an actual accreditation/claim.
- **Legacy overclaim (A3):** Liu page stat block asserts "Ameritas — Confirmed in-network" (442) as a hard claim — stronger than the generator's hedged language and unverifiable.

---

## PRIORITIZED DEFECT LIST

| # | Severity | Where | Defect | Fix level |
|---|----------|-------|--------|-----------|
| A1 | **Critical** | gen L1259 | Metro-hub ItemList emits `reviewCount: ...||1`, gated on rating only — fabricates review count | Generator |
| A3 | High | legacy liu page | Hardcoded frozen 4.9/60 AggregateRating + invented founding timeline; "Confirmed in-network" overclaim | Retire/redirect legacy pages |
| A2 | High | gen L1929/2267/2297 | "Last updated/checked" uses build date, not a real verification date — misleading freshness | Generator |
| B1 | High | gen schema/body | No author / medical reviewer / `reviewedBy` on health-adjacent pages | Generator |
| C1 | Med | gen L2260 | Hero lede is CTA-led, not a self-contained answer-first fact sentence | Generator |
| C2 | Med | gen L1838+ | Templated near-identical FAQ answers across offices | Generator |
| C4 | Med | gen body | No compact key-facts table/`<dl>` for extraction | Generator |
| B2 | Med | gen | No licensing/NPI/state-board credential signals | Generator (data-dependent) |
| D | Low | gen L2443 | "verification is always free" implies a service that must actually exist (Phase B) | Generator/product |
| B5 | Low | gen L1990 | `dateModified` always = build date, no real change tracking | Generator |

**Bottom line on integrity:** generator output does NOT fabricate visible ratings and maintains visible/schema parity everywhere except the one metro-hub ItemList path (A1, fix immediately). The only fabricated/frozen rating data on disk lives in legacy `/dentists/` prototype pages (A3), which should be retired in favor of the canonical `/dental/` build. The build-date-as-verification-date issue (A2) is the main remaining trust-signal honesty gap.
