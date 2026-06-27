# Workstream 6: About Page Schema Spec (JSON-LD)

Research-only deliverable. Ready-to-paste JSON-LD blocks for the CoverCapy About page, plus
the reasoning behind each property and the sources that justify it.

Canonical About URL: `https://www.covercapy.com/about`
Site origin: `https://www.covercapy.com`

Hard rules honored (per CLAUDE.md and Google guidance):
- `sameAs` is an ARRAY in every block.
- No invented founders, founding dates, employee counts, addresses, or phone numbers. Only
  fields known to be true are included. Placeholders are clearly marked and commented, never
  shipped as fake values.
- No em-dashes, no roman numerals anywhere in copy or notes.
- JSON-LD is delivered in the document head as separate `<script type="application/ld+json">`
  blocks, which is Google's recommended delivery method.

A NOTE ON TRUE-ONLY FIELDS
- `email`: `contact@covercapy.com` is the contact address specified for this workstream. The
  existing T5 build references `email` for verify notifications, and CLAUDE.md lists an email
  column, but no street address or public phone is established as canonical for the company
  entity. So no `address`, `telephone`, `foundingDate`, `numberOfEmployees`, `legalName`,
  `vatID`, `taxID`, `duns`, or `naics` are included. Add them later ONLY when a real value is
  confirmed. They are commented as optional in the notes, not hardcoded as fake data.
- `logo`: the workstream specifies `assets/images/covercapy-logo.svg`. Expressed as an absolute
  URL `https://www.covercapy.com/assets/images/covercapy-logo.svg`. If that asset does not yet
  exist at that path, it must be added (and made crawlable, at least 112x112px, looking correct
  on a white background) before this ships, because Google requires the logo URL to be crawlable
  and indexable.

---

## BLOCK 1: Organization

This is the primary entity block. It should also be referenced by the `AboutPage.mainEntity` and
by the page's E-E-A-T signals. Use a stable `@id` of `https://www.covercapy.com/#organization` so
every other block on the site can point at the same entity node instead of re-declaring it.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.covercapy.com/#organization",
  "name": "CoverCapy",
  "url": "https://www.covercapy.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.covercapy.com/assets/images/covercapy-logo.svg"
  },
  "image": "https://www.covercapy.com/assets/images/covercapy-logo.svg",
  "description": "CoverCapy is a concierge and discovery platform for PPO dental care. It helps people compare PPO dental plans, estimate treatment costs, verify coverage at a specific office, and find in-network dentists across the United States. CoverCapy is a guidance and discovery platform, not an insurance carrier or a dental practice.",
  "slogan": "Get cover today, see a dentist tomorrow.",
  "knowsAbout": [
    "PPO dental insurance",
    "Dental insurance plan comparison",
    "Dental coverage verification",
    "In-network dentist discovery",
    "Dental treatment cost estimation",
    "Dental PPO networks",
    "Dental benefits and out of pocket costs"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "contact@covercapy.com",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.covercapy.com/capy-accreditation",
    "https://www.covercapy.com/covercapy-network-effect"
  ]
}
</script>
```

Notes on optional fields to add later ONLY when a real value exists (do not ship guesses):
`address` (PostalAddress with addressCountry US), `telephone`, `foundingDate`, `legalName`,
`numberOfEmployees`, `alternateName`, `vatID`, `taxID`, `duns`, `naics`. Also consider adding more
`sameAs` URLs as real external profiles go live (LinkedIn, Crunchbase, an official X account, a
Google Business Profile, etc.), since external authoritative profiles are the strongest knowledge
graph and AI Mode signal.

---

## BLOCK 2: AboutPage

References the Organization node by `@id` rather than re-describing it, which keeps a single
canonical entity on the site. Also wires the page into the `WebSite` and `Organization` nodes.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.covercapy.com/about#aboutpage",
  "url": "https://www.covercapy.com/about",
  "name": "About CoverCapy",
  "description": "CoverCapy is a dental concierge and discovery platform for PPO dental care. It helps people compare PPO plans, estimate costs, verify coverage, and find in-network dentists. This page explains the mission, the Capy Accreditation standard, and how CoverCapy helps patients and dentists.",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://www.covercapy.com/#website" },
  "about": { "@id": "https://www.covercapy.com/#organization" },
  "mainEntity": { "@id": "https://www.covercapy.com/#organization" }
}
</script>
```

---

## BLOCK 3: WebSite

Declares the site entity and the publisher relationship. The `SearchAction` (potentialAction) is
included because, although Google retired the visual sitelinks search box on November 21, 2024,
valid `SearchAction` markup can still support agent-based and AI search, and leaving it causes no
errors. Update or remove the `urlTemplate` if the live search path differs.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.covercapy.com/#website",
  "url": "https://www.covercapy.com",
  "name": "CoverCapy",
  "description": "Concierge and discovery platform for PPO dental care. Compare PPO plans, estimate treatment costs, verify coverage, and find in-network dentists.",
  "inLanguage": "en-US",
  "publisher": { "@id": "https://www.covercapy.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.covercapy.com/find-my-dentist?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

If the team prefers not to advertise a search endpoint, drop the `potentialAction` object. The
`WebSite` node is still useful on its own for the site name signal.

---

## BLOCK 4: BreadcrumbList (Home then About)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com" },
    { "@type": "ListItem", "position": 2, "name": "About CoverCapy", "item": "https://www.covercapy.com/about" }
  ]
}
</script>
```

---

## BLOCK 5: FAQPage (PLACEHOLDER for workstream 10)

The Q and A pairs are owned by workstream 10. Do not invent questions or answers here. When
workstream 10 delivers the final FAQ copy, paste each item into the `mainEntity` array using the
exact pattern below. Keep the on-page accordion text and the JSON-LD answer text identical, since
Google requires the structured FAQ content to match what users see on the page. Answers must avoid
em-dashes and roman numerals to match the sitewide copy rules.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.covercapy.com/about#faq",
  "isPartOf": { "@id": "https://www.covercapy.com/about#aboutpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "PLACEHOLDER QUESTION FROM WORKSTREAM 10",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PLACEHOLDER ANSWER FROM WORKSTREAM 10. Must match the visible on-page FAQ answer word for word."
      }
    }
  ]
}
</script>
```

Reference only (NOT final): the current live About page already ships seven FAQs (What is
CoverCapy, Is CoverCapy an insurance company, Is CoverCapy free to use, How does CoverCapy help
patients, How does CoverCapy help dentists, What is Capy Accreditation, How does CoverCapy make
money). Workstream 10 should confirm, reword, or expand these. Whatever it finalizes becomes the
`mainEntity` array; the visible accordion and the JSON-LD must stay in sync.

NOTE on Google FAQ rich results: since 2023 Google shows FAQ rich results only for a small set of
well-known authoritative government and health sites, so do not expect the expandable FAQ snippet.
The markup is still worth keeping because it remains valid, feeds entity understanding, and is used
by AI answer engines to verify and cite Q and A content.

---

## WHY EACH PROPERTY HELPS ENTITY AUTHORITY AND GEO (AI answer engines)

Organization-level
- `@id`: gives the company one canonical node. Every page that references
  `https://www.covercapy.com/#organization` reinforces the same entity instead of splintering it,
  which is exactly how knowledge graphs consolidate an entity.
- `name` plus `url`: Google's two core disambiguation signals. `url` helps Google uniquely
  identify the organization, and `name` should match the declared site name.
- `logo`: influences which logo appears in Search results and the knowledge panel. Adding it helps
  Google pick the intended brand mark. Must be crawlable, at least 112x112px, and legible on white.
- `description`: a detailed, accurate description that AI Mode and Gemini use to verify claims and
  assess what the entity is. The wording here restates the not-an-insurer positioning, which is the
  single most important disambiguation for CoverCapy.
- `slogan`: reinforces brand identity and the exact tagline the brand wants associated with it.
- `knowsAbout`: topic declarations. An organization that declares the topics it knows is more
  likely to be cited for queries in those domains than one with no topic declarations, so listing
  PPO dental insurance, plan comparison, coverage verification, and in-network discovery directly
  targets the queries CoverCapy wants to be the answer for in AI search.
- `areaServed` (United States): scopes the entity geographically, which both clarifies relevance
  for US queries and helps AI engines answer location-qualified questions correctly.
- `contactPoint` (email contact@covercapy.com): a real-world contact signal. Google recommends an
  indication of real-world presence; contactType plus email is a clean, true version of that
  without inventing a phone number or address.
- `sameAs` (ARRAY): the highest-leverage authority property. Linking the entity to other pages and,
  ideally later, external authoritative profiles is repeatedly cited as the strongest lever for
  both knowledge panel accuracy and AI Mode citations. Today it points to the two strongest first
  party authority pages (Capy Accreditation and the network effect explainer); expand with real
  external profiles as they go live.

Page and site level
- `AboutPage` with `about` and `mainEntity` pointing at the Organization node tells engines this
  page is the canonical description of the entity, which is where Google recommends placing
  Organization markup (home page or the about page).
- `WebSite` with `publisher` reinforces the site name signal (still supported after the sitelinks
  search box retirement) and ties the site to the publishing Organization.
- `SearchAction`: although the visual sitelinks search box was deprecated, valid SearchAction can
  support agent-based and AI search, and it is harmless to keep.
- `BreadcrumbList`: a supported rich result that clarifies site hierarchy (Home then About) for
  both classic Search and AI parsing.
- `FAQPage`: even without the FAQ rich snippet for most sites, the markup is valid and is consumed
  by AI answer engines to verify and surface question-and-answer content. The placeholder keeps the
  block ready for workstream 10 without fabricating content.

General discipline (from 2026 guidance)
- A dozen accurate, validated schema blocks outperform many half-implemented ones. This spec keeps
  the set small, true, and cross-linked by `@id`.
- Validate every block in the Rich Results Test and the Schema.org validator before publishing, and
  watch the Search Console enhancements report after deploy.

---

## VALIDATION

All five JSON-LD blocks were checked for well-formedness (balanced braces and brackets, quoted
keys and string values, no trailing commas, `sameAs` is an array in every block). The placeholder
FAQ block is intentionally a single-item array and is valid JSON as written; it must be populated
by workstream 10 before launch. Re-run the Rich Results Test and the Schema.org validator once the
real logo asset and the final FAQ copy are in place.

Copy check: no em-dashes and no roman numerals appear in any title, description, slogan, or note.

---

## SOURCES (accessed 2026-06-26)

1. Google Search Central, Organization (Organization) structured data. Recommended properties
   including name, url, logo, description, sameAs, contactPoint, email, address; states there are no
   required properties and to place the markup on the home or about page; logo image guidelines
   (crawlable, indexable, at least 112x112px, legible on white). Page last updated 2026-04-15.
   https://developers.google.com/search/docs/appearance/structured-data/organization
2. Schema.org, Organization type (property reference for slogan, knowsAbout, areaServed,
   contactPoint, sameAs).
   https://schema.org/Organization
3. Google Search Central, Sitelinks searchbox documentation, plus Schema App and Schema Pro
   coverage of the deprecation. Sitelinks search box announced deprecated 2024-10-21 and retired
   2024-11-21; unsupported markup causes no errors; valid SearchAction can support agent-based
   search; WebSite markup for site names remains supported.
   https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
   https://www.schemaapp.com/schema-markup/google-deprecates-sitelinks-search-box-what-it-means-for-your-website/
4. Structured Data for SEO: A Guide to Schema Markup in 2026 (GW Content). Organization and Person
   schema with sameAs as the highest-leverage type for AI Mode citations and knowledge panel
   accuracy; knowsAbout topic declarations increase likelihood of citation for those topics; JSON-LD
   in the head is the recommended delivery method; quality over quantity discipline.
   https://www.gwcontent.com/blogs/news/structured-data-for-seo
5. Schema Markup Types 2026: Complete Reference Guide (Digital Applied). Organization as the entity
   foundation among high-value 2026 schema types; AI Mode and Gemini use schema to verify claims and
   assess source credibility.
   https://www.digitalapplied.com/blog/schema-markup-types-complete-structured-data-reference
