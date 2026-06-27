# CoverCapy Schema Markup Plan
## Structured Data Architecture for the Dental Insurance Content Cluster

**Document type:** Technical implementation brief  
**Scope:** All page templates across covercapy.com  
**Last updated:** June 2026

---

## Why Structured Data Matters Here

CoverCapy sits at the intersection of local business discovery and insurance research. That combination is rich territory for schema: Google's rich result types for local businesses, FAQs, and breadcrumbs all apply directly. Implementing schema correctly across the cluster signals to crawlers that the site is an authoritative, well-organized information source, which improves eligibility for rich result features including star badges, FAQ dropdowns in SERPs, and sitelinks.

The goal of this plan is precision, not volume. Every schema block added to a page should reflect content that actually exists on that page. Hallucinated or inflated schema is a manual action risk.

---

## Page-by-Page Schema Map

### T5 Dentist Profile Pages (`/dental/{state}/{market}/{city}/{dentist-slug}/`)

These are the highest-value pages for schema. Each one maps to a real physical practice.

**Required types:**
- `Dentist` (subtype of `LocalBusiness` and `MedicalOrganization`)
- `AggregateRating` (nested inside `Dentist`, only when `weighted_rating` and `google_review_count` are both present and non-null)
- `FAQPage` (3 questions: carrier acceptance, phone number, office location)
- `BreadcrumbList` (4 levels: state hub > metro hub > city page > dentist profile)

**Implementation notes:**
- `sameAs` must be an array, even with one value. Include `d.website` (stripped of UTM params via `.split('?')[0]`) and the Google Maps coordinate link.
- `@type` should be `["Dentist", "LocalBusiness", "MedicalOrganization"]` as a multi-type array.
- Do not add `OpeningHoursSpecification` unless hours data exists in Supabase. Empty schema fields are worse than absent ones.
- `telephone` should match the formatted `phone` column exactly (e.g., `"(714) 555-1234"`).
- `address` uses `PostalAddress` with `streetAddress`, `addressLocality`, `addressRegion`, `addressCountry`.

---

### T4c City Pages (`/dental/{state}/{market}/{city}/`)

These aggregate all dentists in a single city within a market.

**Required types:**
- `CollectionPage` (signals this is a curated list of resources, not a standalone article)
- `BreadcrumbList` (3 levels: state hub > metro hub > city page)
- `ItemList` (one `ListItem` per dentist card rendered on the page, with `url` and `name`)

**Optional:**
- `FAQPage` if the page includes a city-specific FAQ section (e.g., "How many PPO dentists are in West Hollywood?")

**Implementation notes:**
- `ItemList` items should use the same URL construction as `dentistCard()`: built from `stSlug + mkSlug + citySlug + d.slug`. Never use `d.seo_path`.
- Cap `ItemList` at the number of dentists actually rendered, not the total in the database for that city.

---

### T4a Metro Hub Pages (`/dental/{state}/{market}/`)

Metro hubs cover a full metropolitan area and link out to city pages and dentist profiles.

**Required types:**
- `CollectionPage`
- `BreadcrumbList` (2 levels: state hub > metro hub)
- `SiteNavigationElement` (for the nav links to city pages within the metro -- signals content hierarchy to crawlers)

**Optional:**
- `ItemList` if the page renders a featured subset of dentists

**Implementation notes:**
- `SiteNavigationElement` is a subtype of `WebPage`. Embed it as a separate `@type: "SiteNavigationElement"` block listing the city-level child URLs. This helps Google understand the hub-and-spoke structure.

---

### T3.5 Regional Hub Pages (`/dental/{state}/{region}/`)

Examples: `/dental/california/southern-california/`

**Required types:**
- `CollectionPage`
- `BreadcrumbList` (2 levels: state hub > regional hub)

**Optional:**
- `SiteNavigationElement` listing metro hubs within the region

---

### T3 State Hub Pages (`/dental/{state}/`)

**Required types:**
- `CollectionPage`
- `BreadcrumbList` (1 level: state hub as the top item, with covercapy.com as the domain root)

**Optional:**
- `SiteNavigationElement` listing regional or metro child hubs

---

### Compare Plans Page (`/compare-ppo-dental-plans`)

This page is an interactive comparison of PPO dental insurance plans. It is editorial, not transactional.

**Required types:**
- `WebPage` with `@type: "WebPage"` (or more specifically `"AboutPage"` if the page is primarily informational)
- `FAQPage` for any accordion FAQ section on the page

**Optional:**
- `ItemList` if the page renders a discrete list of plans with names and descriptions that map cleanly to `ListItem` entries

**Implementation notes:**
- Do not use `Product` or `Offer` schema for the plans unless CoverCapy is the direct seller. These are third-party PPO products. Misusing `Product` schema invites Google to treat the page as an e-commerce page, which conflicts with the editorial positioning.
- If a comparison table exists, `ItemList` can represent the rows cleanly.

---

### Glossary / Defined Terms Pages

If CoverCapy builds a glossary section (e.g., `/dental/glossary/`), use:

**Required types:**
- `DefinedTermSet` at the collection level (the glossary index page)
- `DefinedTerm` on each individual term page or section

**Implementation notes:**
- `DefinedTermSet` takes a `name`, `description`, and `url`.
- Each `DefinedTerm` takes `name`, `description`, and `inDefinedTermSet` pointing back to the glossary URL.
- This schema type is relatively new but has strong support in Google's documentation for glossary and knowledge-base content.

---

### Landing Pages (`/dental-insurance-no-waiting-period/`, etc.)

These are editorial landing pages targeting high-intent search queries.

**Required types:**
- `WebPage`
- `FAQPage` if the page includes a question-and-answer section

**Implementation notes:**
- `WebPage` `name` should match the `<title>` tag exactly.
- `FAQPage` questions must reflect real Q&A content on the page. Do not fabricate questions that do not appear in the HTML.
- `breadcrumb` property on `WebPage` can reference the `BreadcrumbList` block using `@id` references rather than duplicating the breadcrumb data.

---

## Hub Index JSON-LD Examples

The following examples illustrate the recommended schema implementation for the metro hub and state hub page types. These can be embedded in `<script type="application/ld+json">` blocks in `pageShell()`.

### Example 1: T4a Metro Hub (Los Angeles)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://covercapy.com/dental/california/los-angeles/",
    "name": "PPO Dentists in Los Angeles, CA | CoverCapy",
    "description": "Find in-network PPO dentists across Los Angeles. Verify your insurance coverage for free through CoverCapy.",
    "url": "https://covercapy.com/dental/california/los-angeles/",
    "inLanguage": "en-US",
    "breadcrumb": {
      "@id": "https://covercapy.com/dental/california/los-angeles/#breadcrumb"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://covercapy.com/dental/california/los-angeles/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "CoverCapy",
        "item": "https://covercapy.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "California Dentists",
        "item": "https://covercapy.com/dental/california/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Los Angeles PPO Dentists",
        "item": "https://covercapy.com/dental/california/los-angeles/"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Los Angeles Area Neighborhoods",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "West Hollywood PPO Dentists",
        "url": "https://covercapy.com/dental/california/los-angeles/west-hollywood/"
      },
      {
        "@type": "WebPage",
        "name": "Beverly Hills PPO Dentists",
        "url": "https://covercapy.com/dental/california/los-angeles/beverly-hills/"
      },
      {
        "@type": "WebPage",
        "name": "Santa Monica PPO Dentists",
        "url": "https://covercapy.com/dental/california/los-angeles/santa-monica/"
      }
    ]
  }
]
```

---

### Example 2: T3 State Hub (California)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://covercapy.com/dental/california/",
    "name": "PPO Dentists in California | CoverCapy",
    "description": "Browse PPO dentists across California by city and metro area. Verify insurance for free.",
    "url": "https://covercapy.com/dental/california/",
    "inLanguage": "en-US",
    "breadcrumb": {
      "@id": "https://covercapy.com/dental/california/#breadcrumb"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://covercapy.com/dental/california/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "CoverCapy",
        "item": "https://covercapy.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "California Dentists",
        "item": "https://covercapy.com/dental/california/"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "California Metro Markets",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Los Angeles PPO Dentists",
        "url": "https://covercapy.com/dental/california/los-angeles/"
      },
      {
        "@type": "WebPage",
        "name": "Orange County PPO Dentists",
        "url": "https://covercapy.com/dental/california/orange-county/"
      },
      {
        "@type": "WebPage",
        "name": "San Francisco PPO Dentists",
        "url": "https://covercapy.com/dental/california/san-francisco/"
      },
      {
        "@type": "WebPage",
        "name": "San Diego PPO Dentists",
        "url": "https://covercapy.com/dental/california/san-diego/"
      }
    ]
  }
]
```

---

### Example 3: T5 Dentist Profile (abbreviated)

```json
[
  {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness", "MedicalOrganization"],
    "@id": "https://covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/",
    "name": "Smiles Dental",
    "url": "https://covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/",
    "telephone": "(323) 555-0198",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8000 Sunset Blvd Suite 200",
      "addressLocality": "West Hollywood",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0928,
      "longitude": -118.3832
    },
    "sameAs": [
      "https://smilesdental.com",
      "https://www.google.com/maps/search/?api=1&query=34.0928,-118.3832"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "142",
      "bestRating": "5",
      "worstRating": "1"
    },
    "breadcrumb": {
      "@id": "https://covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/#breadcrumb"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "California Dentists",
        "item": "https://covercapy.com/dental/california/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Los Angeles PPO Dentists",
        "item": "https://covercapy.com/dental/california/los-angeles/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "West Hollywood PPO Dentists",
        "item": "https://covercapy.com/dental/california/los-angeles/west-hollywood/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Smiles Dental",
        "item": "https://covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does Smiles Dental accept Delta Dental PPO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Smiles Dental in West Hollywood accepts Delta Dental PPO along with Cigna PPO and Aetna PPO. You can verify your specific coverage for free through CoverCapy."
        }
      },
      {
        "@type": "Question",
        "name": "What is the phone number for Smiles Dental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach Smiles Dental at (323) 555-0198."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Smiles Dental located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smiles Dental is located at 8000 Sunset Blvd Suite 200, West Hollywood, CA."
        }
      }
    ]
  }
]
```

---

## Schema Type Reference Table

| Page Template | Required Schema Types | Optional Schema Types |
|---|---|---|
| T5 Dentist Profile | Dentist + LocalBusiness + MedicalOrganization, AggregateRating (conditional), FAQPage, BreadcrumbList | OpeningHoursSpecification (if hours data exists) |
| T4c City Page | CollectionPage, BreadcrumbList, ItemList | FAQPage |
| T4a Metro Hub | CollectionPage, BreadcrumbList, SiteNavigationElement | ItemList |
| T4b Local Area Hub | CollectionPage, BreadcrumbList, SiteNavigationElement | ItemList |
| T3.5 Regional Hub | CollectionPage, BreadcrumbList | SiteNavigationElement |
| T3 State Hub | CollectionPage, BreadcrumbList | SiteNavigationElement |
| Compare Plans Page | WebPage, FAQPage | ItemList |
| Glossary Index | DefinedTermSet | -- |
| Glossary Term Pages | DefinedTerm | -- |
| Landing Pages | WebPage, FAQPage | BreadcrumbList |

---

## Implementation Rules

1. All schema goes in `<script type="application/ld+json">` blocks. No RDFa or Microdata.
2. Use an array at the top level (`[ {...}, {...} ]`) when multiple schema blocks appear on one page.
3. Use `@id` with fragment identifiers (e.g., `#breadcrumb`) to cross-reference blocks without duplication.
4. `AggregateRating` must only appear when both `weighted_rating` and `google_review_count` are non-null. A rating block with zero reviews or a null count is invalid.
5. All URLs must be absolute, canonical, and match the `<link rel="canonical">` tag on the same page.
6. `sameAs` is always an array, never a plain string.
7. Strip UTM parameters from `d.website` before including it in `sameAs` or any schema field.
8. Do not invent `openingHours` or `priceRange` values that are not present in the data source.
9. FAQPage questions must appear as visible text on the rendered page. Schema that does not reflect real page content violates Google's structured data policies.
10. Validate all new schema blocks with the [Google Rich Results Test](https://search.google.com/test/rich-results) before deploying at scale.
