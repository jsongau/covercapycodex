# SEO Improvement Brief — Los Altos City Dentist Directory

**URL:** https://www.covercapy.com/dental/california/bay-area/los-altos/
**Page type:** T4c city dentist-directory page (generated)
**GSC last 7 days:** 1 click / 13 impressions
**Audience:** Patients with local intent (find an in-network PPO dentist near them)
**Prepared:** June 2026

> Generator note: this is a generated page. All edits below must be implemented in `seo-build/generate-plans.js` (the `buildCityPage` path), never by hand-editing `dental/`. The recommendations are written so they apply to every T4c city page, with Los Altos as the worked example.

---

## 1. Snapshot (current live state)

| Element | Current value |
|---|---|
| `<title>` | `PPO Dentists in Los Altos, CA — In-Network Dental Offices \| CoverCapy` (uses an em-dash separator; ~62 chars) |
| Meta description | `13 PPO-participating dental offices in Los Altos, California. Verify insurance, compare in-network dentists, and book with confidence. Serving the Bay Area area.` (~158 chars; "the Bay Area area" is a duplication bug) |
| H1 | `PPO Dentists in Los Altos, CA` |
| Canonical | `https://www.covercapy.com/dental/california/bay-area/los-altos/` (correct, self-referential, trailing slash) |
| Word count | ~750 words (intro + listing labels + CTA blocks + 7-question FAQ) |
| Robots | `index,follow,max-image-preview:large` (good) |
| Geo meta | `geo.placename: Los Altos, California`, `geo.region: US-CA` (present, good) |

**Schema currently detected:** The fetched render did not surface visible JSON-LD beyond the page chrome. The brief assumes BreadcrumbList exists (breadcrumb nav is rendered) but ItemList and FAQPage may be missing or thin. Confirm in the generator and add per Section 5.

**Internal links present (good foundation):**
- Breadcrumb: CoverCapy > California Dentists > Bay Area > Los Altos
- 13 T5 dentist profile links ("View full profile")
- 13 "Verify my PPO here" links to `/find-my-dentist?q=Los Altos`
- Nearby Cities rail: San Jose, San Mateo, Redwood City, Sunnyvale, Concord, Berkeley, Dublin, Walnut Creek, Santa Clara, Livermore (with office counts) + "All Bay Area offices"
- 4 carrier plan tiles linking to `/compare-ppo-dental-plans`

### Content gaps identified
1. **Title and meta use an em-dash separator** (violates house anti-AI rule) and the meta has a "Bay Area area" duplication bug.
2. **Thin-content risk.** The unique prose is one short intro paragraph. The rest is repeated listing scaffolding ("Verify my PPO here — free" x13 identical) and a generic FAQ that is not Los Altos specific. Google can read this as a templated doorway page across hundreds of near-identical city pages.
3. **No per-office differentiation on the listing.** Each card shows only name + address. No rating, no accepted-carrier preview, no neighborhood. Nothing a patient can compare on, and nothing unique for the crawler.
4. **"1,463 patient reviews" aggregate number appears with no source attribution.** This is a defensible directory total only if it is the genuine sum of the 13 offices' public review counts. If it is fabricated or unverifiable, remove it (anti-fake-review rule).
5. **No local context** (neighborhoods, El Camino Real corridor, proximity to Mountain View / Palo Alto / Stanford, ZIP coverage 94022/94024).
6. **No "verify your specific plan" inline module** beyond repeated buttons; the value prop (live eligibility lookup) is told, not shown.
7. **FAQ is generic** and reused across cities; little local entity signal.

---

## 2. Target queries and intent

Local patient intent. Searchers want a nearby, in-network, takes-my-plan dentist. Verified live competitors for these terms include Delta Dental's find-a-dentist directory, Zocdoc, and individual practice sites (losaltosdentistry.com, losaltosfamilysmiles.com, pccdsmiles.com). Source: web search June 2026.

| Query (estimated intent) | Intent | Priority |
|---|---|---|
| dentist los altos / dentist los altos ca | local discovery | High |
| ppo dentist los altos | in-network discovery | High (core) |
| in-network dentist los altos | insurance-led discovery | High |
| delta dental dentist los altos / aetna dentist los altos | carrier + city | High (long-tail, high convert) |
| dentist near me los altos 94024 / 94022 | hyperlocal | Medium |
| dentist that takes my insurance los altos | verification intent | Medium (CoverCapy's wedge) |
| best dentist los altos | reputation | Medium (do not fake reviews to chase this) |
| emergency dentist los altos / new patient dentist los altos | situational | Low-Medium |

The differentiated wedge versus Delta/Zocdoc is the **free live PPO eligibility check** (deductible, annual max, coverage %). Lean the page into "verify your exact plan before you book," which neither Delta's directory nor a practice site offers cleanly.

---

## 3. Meta rewrite (exact)

Remove the em-dash separator, fix the duplication bug, and front-load carrier + verification intent.

**Title (60 chars, no em-dash):**
```
PPO Dentists in Los Altos, CA | 13 In-Network Offices
```
(53 chars. Pipe separator only, no em-dash. Office count is a real, dynamic number.)

**Meta description (155 chars max):**
```
Find PPO dentists in Los Altos, CA. Compare 13 in-network offices, then check your exact plan benefits free before you book. Delta, Aetna, Guardian and more.
```
(154 chars. Names real carriers surfaced on the page, leads with the verify-before-you-book wedge, no em-dash, no "Bay Area area" bug.)

Generator template form:
```
Title:  PPO Dentists in {City}, {ABBR} | {N} In-Network Offices
Meta:   Find PPO dentists in {City}, {ABBR}. Compare {N} in-network offices, then check your exact plan benefits free before you book. Delta, Aetna, Guardian and more.
```
Add a length guard: if the title exceeds 60 chars for long city names, fall back to `PPO Dentists in {City}, {ABBR} | In-Network Offices`.

---

## 4. Content to add (anti-thin-content)

Goal: give each city page genuinely unique, locally grounded body content so the cluster reads as a real directory, not a doorway template. Pull dynamic facts from Supabase so it scales.

**A. Local context paragraph (2 to 3 sentences, dynamically assembled).**
Name the ZIP codes actually present in the listing (Los Altos = 94022, 94024), the main commercial corridors visible in the addresses (El Camino Real, downtown 2nd/3rd St, Altos Oaks Dr medical cluster), and proximity to neighboring listed cities. Example, label any non-database statement as context: "Most Los Altos dental offices cluster along El Camino Real, the downtown 2nd and 3rd Street district, and the Altos Oaks Drive medical area near El Camino Hospital. Patients also draw from neighboring Mountain View, Palo Alto, and Sunnyvale." Build this from the real addresses so it is never fabricated.

**B. Enrich each listing card with comparable data.** Add, where present in Supabase: star rating + review count (real, per office), a short accepted-carrier preview (e.g., "Delta Dental PPO, Aetna, Cigna"), and any specialty flag (pediatric, cosmetic, oral surgery). This both helps patients compare and gives the crawler unique text per card. The current page already implies specialties in names (Pediatric Dentistry-Los Altos, Mid-Peninsula Dental Specialists) — surface them as tags.

**C. "Check your exact plan before you book" module (show, don't tell).** A compact inline panel that explains the live eligibility lookup with a 3-line "what you'll see" list (deductible remaining, annual maximum, coverage %) and one primary CTA. This is already gestured at in the "Already insured?" block; make it the page's hero differentiator and keep one canonical instance (avoid the current duplicate "Already insured?" blocks).

**D. Carrier-in-this-city mini-section.** "PPO carriers accepted in Los Altos" listing the distinct carriers actually present across the 13 offices, each linking to the relevant carrier hub (see Section 6). High-value long-tail capture (delta dental dentist los altos, aetna dentist los altos).

**E. Localize the FAQ.** Keep the strong existing questions but make answers reference Los Altos specifics already on the page (ZIPs, corridor, neighboring cities) and add one genuinely local question, for example: "Which Los Altos neighborhoods are these offices in?" Keep cost ranges labeled as estimates ("typically," "estimated"), as the current FAQ already does well.

**F. De-duplicate scaffolding.** The phrase "Verify my PPO here — free" repeats identically 13 times and there are two near-identical "Already insured?" CTA blocks. Vary the card microcopy slightly or move the verify action to an icon/button with aria-label so the visible repeated text is reduced. This lowers the templated-text ratio that triggers thin-content classification.

**Target after additions:** 900 to 1,100 words of which a meaningful share is city-unique. Do not pad; depth from real data, not filler.

---

## 5. Schema (no fake reviews)

Implement/confirm these JSON-LD blocks in `buildCityPage`. Do not emit AggregateRating at the page level unless every star value is a real per-office number you can stand behind.

1. **BreadcrumbList** — 4 levels (CoverCapy > California > Bay Area > Los Altos). Mirror the visible breadcrumb. (Likely present; verify.)

2. **ItemList** — the 13 offices as `itemListElement` with `position`, `url` (the real T5 profile URL built from parts), and `name`. This is the correct directory-page schema and is review-safe.

3. **LocalBusiness / Dentist per item (optional, only with real data).** If you include `@type: Dentist` nodes, add `address` (you have it), and `aggregateRating` ONLY where `weighted_rating` and `google_review_count` are genuinely present for that office. Never synthesize. If absent, omit the rating node entirely.

4. **FAQPage** — mark up the on-page FAQ (the 7 questions render visibly, so this is legitimate). Keep `acceptedAnswer` text identical to visible copy.

5. **WebPage / CollectionPage** wrapper with `about` referencing the city and `isPartOf` the Bay Area hub.

Do NOT add: page-level AggregateRating built from the unsourced "1,463 patient reviews" figure unless that number is the verified sum of real public counts. If it cannot be sourced, remove the number from the page too.

---

## 6. Internal linking

Strengthen three directions:

**Up / lateral (geography):**
- Keep breadcrumb to Bay Area hub and California hub (present).
- Keep the Nearby Cities rail (strong, present) but ensure links are to live city pages with real office counts.
- Add 2 to 3 contextual in-prose links to the nearest neighbors (Mountain View, Palo Alto, Sunnyvale) inside the local-context paragraph, not just the rail, so the link has descriptive anchor text.

**Carrier hubs (high value, currently missing as contextual links):**
- From the new "PPO carriers accepted in Los Altos" section, link each carrier to its hub/plan page. CoverCapy already runs Delta Dental and other carrier content (`/delta-dental/`, `/compare-ppo-dental-plans`). Anchor text like "Delta Dental PPO dentists" passes strong topical signal.

**Conversion / app:**
- Keep `/find-my-dentist?q=Los Altos` (present) and `/compare-ppo-dental-plans` (present).
- Reduce to one primary verify CTA per viewport region to avoid 15+ identical internal links diluting anchor signal; the crawler currently sees the same `/find-my-dentist` URL ~16 times.

**Down (T5):** the 13 profile links are the most valuable internal links on the page — keep them, and make the anchor the office name (not "View full profile") for better relevance. Build URLs from parts (`stSlug + mkSlug + citySlug + d.slug`), never `seo_path`.

---

## 7. Authority / E-E-A-T

This is a directory page, so trust signals matter more than author bylines:

- **Freshness, shown.** "Updated June 2026" is present — keep it dynamic and accurate per build.
- **Sourcing line.** Add a short, honest provenance note: "Office details are compiled from public listings and verified PPO participation. Confirm your specific plan and tier before booking." This is true, sets expectations, and is good E-E-A-T for a directory.
- **No fabricated reviews or ratings.** Only show ratings that are real per-office public numbers. If the 1,463 aggregate cannot be sourced, remove it.
- **Accuracy of "in-network" claim.** The page says offices "accept at least one major PPO carrier." Keep that hedge; do not imply a specific patient's plan is accepted without the verify step. This is both honest and CoverCapy's product wedge.
- **NAP consistency.** Addresses shown should match the offices' public listings exactly (they appear to). This supports local entity matching.
- **Contact/operator transparency.** Ensure the site footer exposes who CoverCapy is and how to reach support, so directory pages inherit site-level trust.

---

## 8. Priority actions

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Fix meta: new title/description (Section 3), kill em-dash + "Bay Area area" bug | Low | High |
| 2 | Add ItemList + FAQPage JSON-LD; confirm BreadcrumbList (Section 5) | Low | High |
| 3 | Enrich listing cards with real rating + carrier preview + specialty tag (Section 4B) | Med | High |
| 4 | Add dynamic local-context paragraph from real addresses (Section 4A) | Med | High |
| 5 | Add "PPO carriers accepted in Los Altos" section linking to carrier hubs (Section 4D, 6) | Med | High |
| 6 | Verify or remove the "1,463 patient reviews" figure (Section 5, 7) | Low | High (risk) |
| 7 | De-duplicate repeated CTA text/links; one primary verify CTA per region (Section 4F, 6) | Low | Medium |
| 8 | Localize FAQ answers + add one local question (Section 4E) | Low | Medium |
| 9 | Change T5 anchor text from "View full profile" to office name (Section 6) | Low | Medium |

Because this is generated, every fix lands across the entire city-page cluster (hundreds of pages) from one `buildCityPage` change — high leverage. Rebuild from repo root, then commit only the `dental/` output.

**Sources (web search, June 2026):** Delta Dental find-a-dentist Los Altos directory; Zocdoc dentists; losaltosdentistry.com; losaltosfamilysmiles.com; pccdsmiles.com Los Altos.
