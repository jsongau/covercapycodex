# H7 — Structured Data / Schema for the Hub Cluster

## Summary

The live `compare-ppo-dental-plans.html` builds its entire schema graph inside `injectSchema()` and appends it to `<head>` at runtime. This is a double liability: (1) JS-injected JSON-LD is fragile for crawlers and AI answer engines that read the initial server response, and (2) it emits `Offer.price`, `priceSpecification`, and `availability: InStock` on illustrative premiums — a compliance risk, since CoverCapy is a marketplace, not the seller, and the monthlys are indicative. The fix for the hub cluster: **server-render** one clean `@graph` per page type, in parity with visible content, dropping every `Offer`/`price`/`InStock` node. Plans become price-free `Service` entries inside an `ItemList`; the `Organization` is defined once with a stable `@id` + `sameAs` and reused by reference across all pages. `WebSite` + `SearchAction` ships only on the main hub to drive a sitelinks searchbox for "covercapy insurance". `FAQPage` and `DefinedTermSet`/`DefinedTerm` mirror the exact on-page FAQ and glossary copy. No invented ratings. Result is a documentation-grade, AI-friendly entity graph that is strictly safer than the ZIP.

## Core rules (all page types)

1. **Server-render** the `<script type="application/ld+json">` into the static HTML at build time. Remove the `injectSchema()` call from runtime JS.
2. **Visible-content parity.** Every schema field must correspond to text a user sees on the page. No fields without a rendered counterpart.
3. **Remove `Offer.price`, `priceSpecification`, `Offer.priceCurrency`, and `availability: https://schema.org/InStock`** everywhere. Plans are described, not sold.
4. **One `Organization` node**, `@id: https://www.covercapy.com/#org`, with `sameAs`. Every other node references it by `{"@id": ".../#org"}` — never redefines it.
5. **`WebSite` + `SearchAction`** appears on the **main hub only** (sitelinks searchbox target).
6. **No `AggregateRating`** unless real, visible, aggregated review counts back it. None exist for plans, so omit.

## Canonical `@graph` per page type

| Page type | Nodes in `@graph` |
|---|---|
| **Main hub** (`/dental-insurance` or `/compare-ppo-dental-plans`) | `WebSite`+`SearchAction`, `Organization` (full), `BreadcrumbList`, `ItemList` (the 8 plans, each item a `Service`), `FAQPage`, `DefinedTermSet` (glossary preview) |
| **Carrier plan page** (e.g. `/plans/humana-ppo`) | `Organization` (`@id` ref only), `BreadcrumbList`, `Service` (the single plan, price-free, `provider` = carrier `Brand`/`Organization`, `broker` = CoverCapy `@id`), `FAQPage` |
| **Delta hub** (`/delta-dental-ppo`) | `Organization` (`@id` ref), `BreadcrumbList`, `ItemList` (Delta PPO + Delta Premier as two `Service` items), `FAQPage` |
| **Glossary term** (`/dental-insurance-glossary/{term}`) | `Organization` (`@id` ref), `BreadcrumbList`, `DefinedTermSet` with one `DefinedTerm` (`name`, `description`, `termCode`, `inDefinedTermSet`), `FAQPage` (optional) |

### Plan node shape (price-free `Service`)

```json
{
  "@type": "Service",
  "name": "Humana PPO Dental",
  "serviceType": "Individual PPO dental insurance plan",
  "category": "Individual PPO dental insurance",
  "brand": { "@type": "Brand", "name": "Humana" },
  "provider": { "@type": "Organization", "name": "Humana" },
  "broker": { "@id": "https://www.covercapy.com/#org" },
  "areaServed": { "@type": "Country", "name": "United States" },
  "description": "PPO plan with vision built in and a $5,000 annual maximum.",
  "url": "https://www.covercapy.com/compare-ppo-dental-plans#plan-humana"
}
```

No `offers`, no `price`. Premiums stay in visible page copy as indicative figures ("~$X/mo"), not in schema.

## Copy-ready JSON-LD skeleton — MAIN HUB

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.covercapy.com/#org",
      "name": "CoverCapy",
      "alternateName": "CoverCapy Concierge Dental Network",
      "url": "https://www.covercapy.com/",
      "logo": "https://www.covercapy.com/logo.png",
      "slogan": "Get cover today, see a dentist tomorrow.",
      "description": "CoverCapy is an independent concierge marketplace for individual PPO dental insurance. It compares PPO dental plans and matches each member to a top-ranking, in-network local PPO dentist.",
      "areaServed": "US",
      "sameAs": [
        "https://www.linkedin.com/company/covercapy",
        "https://twitter.com/covercapy",
        "https://www.facebook.com/covercapy"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.covercapy.com/#website",
      "url": "https://www.covercapy.com/",
      "name": "CoverCapy",
      "publisher": { "@id": "https://www.covercapy.com/#org" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.covercapy.com/find-my-dentist?loc={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans#webpage",
      "url": "https://www.covercapy.com/compare-ppo-dental-plans",
      "name": "Compare PPO Dental Plans | CoverCapy",
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "about": { "@id": "https://www.covercapy.com/#org" },
      "primaryImageOfPage": "https://www.covercapy.com/logo.png"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Dental insurance", "item": "https://www.covercapy.com/dental-insurance" },
        { "@type": "ListItem", "position": 2, "name": "Compare PPO plans", "item": "https://www.covercapy.com/compare-ppo-dental-plans" }
      ]
    },
    {
      "@type": "ItemList",
      "name": "Individual PPO dental plans compared on CoverCapy",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 8,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Humana PPO Dental",
            "serviceType": "Individual PPO dental insurance plan",
            "category": "Individual PPO dental insurance",
            "brand": { "@type": "Brand", "name": "Humana" },
            "provider": { "@type": "Organization", "name": "Humana" },
            "broker": { "@id": "https://www.covercapy.com/#org" },
            "areaServed": { "@type": "Country", "name": "United States" },
            "description": "PPO plan with vision built in and a $5,000 annual maximum.",
            "url": "https://www.covercapy.com/compare-ppo-dental-plans#plan-humana"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I compare PPO dental plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Compare PPO dental plans on five points: monthly cost, annual maximum, waiting periods for basic and major work, how the plan handles the treatment you actually need, and whether your dentist accepts it."
          }
        }
      ]
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://www.covercapy.com/dental-insurance-glossary#set",
      "name": "PPO dental insurance glossary",
      "url": "https://www.covercapy.com/dental-insurance-glossary/",
      "hasDefinedTerm": [
        {
          "@type": "DefinedTerm",
          "name": "Annual maximum",
          "description": "The most the plan pays in a year. Once you hit it, the rest is on you.",
          "inDefinedTermSet": { "@id": "https://www.covercapy.com/dental-insurance-glossary#set" }
        }
      ]
    }
  ]
}
</script>
```

> Build note: the single `Service`, FAQ `Question`, and `DefinedTerm` shown are templates — server-render one per plan (8), one per visible FAQ, and one per visible glossary term, iterating the same arrays (`live()`, `FAQS`, `DICT`) the page already holds, but emitting them into static HTML rather than via `injectSchema()`.

## Top 3 recommendations

1. **Kill `injectSchema()`; server-render the graph.** Move the JSON-LD into the static HTML `<head>` at build time so crawlers and AI answer engines see it in the first response. This alone is the highest-leverage change for sitelinks and AI answers.
2. **Strip every pricing field from schema** (`Offer`, `price`, `priceSpecification`, `priceCurrency`, `availability: InStock`). Model each plan as a price-free `Service` inside an `ItemList`. Removes the marketplace-vs-seller policy risk while keeping indicative premiums in visible copy only.
3. **Anchor entity reuse on one `Organization` `@id` + `sameAs`, and put `WebSite`+`SearchAction` on the hub only.** Consistent `@id` linking across hub, carrier, Delta, and glossary pages builds a single coherent entity graph; the searchbox action targets the sitelinks query for "covercapy insurance".
