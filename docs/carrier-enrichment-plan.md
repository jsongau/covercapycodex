# Carrier enrichment plan — closing the 12% gap

## The problem, in numbers

Of 7,042 dentist records, only 822 (12%) have any value in `insurance_networks`. That field is
CoverCapy's entire reason to exist: "find an in-network PPO dentist." With 88% of pages unable
to name a single accepted carrier, those pages are both thin (interchangeable templates) AND
failing the core value proposition. Fixing this is the highest-leverage thickening move and it
directly serves the product, not just SEO.

Reference completeness (same 7,042 rows): address 100%, geo 99%, review count 97%, rating 57%,
3+ procedures 23%, carriers 12%, doctor name 4%.

## Hard rule: never fabricate a carrier

Do not infer, guess, or write "accepts most major PPOs." Every carrier on a page must trace to
a real source, and we store the source + a last-verified date so the claim is defensible. A
page with two verified carriers beats a page with eight guessed ones.

## Data sources, best to worst (use in this order)

1. Carrier provider directories (authoritative). Every PPO carrier publishes a "find a dentist"
   directory: Delta Dental, UnitedHealthcare, Aetna, Cigna, Guardian, MetLife, Humana,
   Ameritas, Mutual of Omaha. If an office appears in carrier X's directory for its address/NPI,
   it is in-network with X. This is the gold standard. Access via official carrier APIs or
   provider-lookup endpoints where available, or a ToS-compliant data partner. Match on NPI when
   present, else name + address + phone fuzzy match.
2. Dentist self-claim. The "claim your profile" flow (already linked site-wide) should ask the
   office to confirm accepted carriers. Highest trust, and it doubles as a dentist-engagement /
   membership funnel. Mark these `source: claimed`.
3. Office website "insurance accepted" pages. Many practice sites list accepted PPOs on an
   insurance/financial page. Where present and parseable, extract and normalize. Mark
   `source: office_site`, confidence = likely (not verified).
4. Eligibility / verification flow. When CoverCapy verifies a patient's coverage at an office,
   capture which carrier was confirmed in-network. Compounds over time, zero extra cost, highest
   real-world accuracy. Mark `source: verified`.
5. Licensed data vendors. NPI registry + commercial provider-network datasets as a backfill.

## Normalization (map raw names to the canonical set)

Carrier names arrive messy ("UHC", "United Healthcare", "United Concordia" is a DIFFERENT
carrier, "Delta Dental PPO" vs "Delta Dental Premier"). Maintain a canonical list and an alias
map:

```
Delta Dental | UnitedHealthcare | Aetna | Cigna | Guardian | MetLife | Humana | Ameritas | Mutual of Omaha | United Concordia
```

Dedupe, trim, and reject anything that does not map to a known carrier rather than storing junk.
Keep Delta PPO vs Premier as a sub-distinction only if the source specifies it.

## Storage (Supabase `dentists`)

- `insurance_networks text[]` — the canonical carrier names (existing field).
- Add `insurance_source text` (verified | claimed | office_site | directory | vendor).
- Add `insurance_verified_at timestamptz`.
This lets the template show provenance and decay (re-verify after N months).

## Display + schema (in the generator template)

- On-page "Accepted PPO carriers" block listing the carriers as pills, with wording matched to
  confidence: verified/directory -> "In-network with {carriers}"; office_site -> "Reported to
  accept {carriers}". Always followed by the "Verify my coverage — free" CTA (because acceptance
  can change and verification is the product).
- The answer-first intro and meta description pull the top 3 carriers (already specced in
  `dental-template-seo-spec.md`).
- Schema: keep carriers in prose + the existing Dentist node; do NOT invent a fake
  `acceptedInsurance` claim type. A plain, accurate on-page list is enough and safe.

## Phasing (ship value fast, protect quality)

1. Pilot on one dense market (e.g. Orange County) against carrier directories to validate the
   NPI/name-address matching and the normalization map. Measure precision by spot-checking.
2. Enrich the 1,631 pages that already have 3+ procedures first — they are closest to "distinct"
   and become genuinely strong with carriers added.
3. Roll the directory match across all markets; layer in office-site parsing for the long tail.
4. Turn the claim flow into the steady-state source (offices keep their own carriers current).
5. Re-check Search Console indexation + AdSense eligibility as coverage climbs; more pages clear
   the substance threshold, so the gated AdSense (spec section 3) lights up more inventory.

## What NOT to do

- No "accepts all major PPOs" filler.
- No copying a carrier list from a nearby office.
- No AdSense on pages that still lack carriers + rating + procedures (the gate handles this).
- No scraping that violates a carrier's or office's terms of service; use official APIs, data
  partners, or the claim flow.

## Expected effect

Carriers are the field that turns a thin directory page into a real in-network match. Getting
them onto even the 1,631 procedure-rich pages creates thousands of genuinely distinct,
on-brand, AdSense-safe pages, and finally lets the site deliver its core promise on the pages
people actually land on.
