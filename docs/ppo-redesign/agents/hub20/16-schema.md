# Hub20 — 16 — Structured Data / Schema Spec

**Page:** `/compare-ppo-dental-plans.html` (the live PPO hub)
**Status:** ANALYZE / SPEC only. Premiums FROZEN. No em-dashes. Price-free.
**Source improvement doc:** `docs/ppo-redesign/_zip-21jun/ppo/seo/improvements/06-structured-data-schema.md`

---

## 1. Audit of the live hub's current schema

All schema on the hub is produced by `injectSchema()` at `compare-ppo-dental-plans.html:1923-1935`.

### How it ships today (the core problem)

```js
const s=document.createElement('script');
s.type='application/ld+json';
s.textContent=JSON.stringify(graph);
document.head.appendChild(s);   // line 1934
```

The `@graph` is built in JavaScript and appended to `<head>` at runtime via
`createElement` + `appendChild`. It is **JS-injected, not in the served HTML**.
This makes it crawler-fragile: Googlebot may render it, but many SEO crawlers,
social unfurlers, and AI answer engines read the raw HTML response and will see
**no JSON-LD at all**. The scorecard's freshness/E-E-A-T signals never reach
engines that do not execute JS. This is the single highest-leverage fix:
**server-render the `@graph` as a literal `<script type="application/ld+json">`
block in `<head>`.**

### What the current `@graph` contains (lines 1924-1933)

| Node | Line | Verdict |
|------|------|---------|
| `Organization` (`#org`) | 1925 | Keep. Has `sameAs`. Reuse as single `@id`. |
| `WebSite` (`#website`) + `SearchAction` | 1926 | Keep. Good. |
| `Service` (`#concierge`) with `hasOfferCatalog` | 1927 | **FIX — emits `Offer` + `Product`.** |
| `Dentist[]` (curated) | 1928 | Optional. Hard-codes `addressRegion:"CA"`. Drop or fix. |
| `FAQPage` | 1929 | Keep. Parity with visible FAQ (`FAQS`, line 1877). |
| `DefinedTermSet` (glossary) | 1930 | Keep. |
| `BreadcrumbList` | 1931 | Keep, but fix URL casing/trailing slash. |
| `Product[]` (`products`) | 1932 | **FIX — emits `Product`.** |
| no `WebPage` node | — | **MISSING.** No dates, no author, no reviewer. |

### Did we fully strip Offer.price / InStock? Partly. NOT done.

`price`, `priceCurrency`, `availability`, and `InStock` are gone from the
JSON-LD — grep confirms no occurrence inside `injectSchema()`. The only `price`
hits are UI sort/labels (line 961 sort chip, line 1327 card markup), not schema.

**But two forbidden `@type`s remain**, and the improvement doc (section 7 +
acceptance criteria) bans the *types* themselves, not just the price fields:

1. **Line 1927** — `service.hasOfferCatalog.itemListElement` maps every live
   plan to `{"@type":"Offer","itemOffered":{"@type":"Product", ...}}`. Both
   `Offer` and `Product` are present (price-free, but still present).
2. **Line 1932** — `products = live().map(...)` builds an array of
   `{"@type":"Product", ...}` nodes, concatenated into the graph at 1933.

These must be removed. Spec below replaces them with a price-free `ItemList`
of `Thing` plan entities, exactly per the improvement doc's guidance (use
`Thing`, never `Product`, to avoid implying a commercial offer).

### Scorecard-flagged gaps (all confirmed present)

- No `datePublished` / `dateModified` anywhere (no `WebPage` node exists).
- No defined `author` / `reviewedBy` entity with `lastReviewed`.
- No `WebPage` node to anchor `isPartOf` / `about` / `breadcrumb`.

---

## 2. Target server-rendered `@graph`

Render the block below **literally in `<head>`** of the served HTML (server
template / static build output), NOT via `injectSchema()`. Delete the
`createElement`/`appendChild` path or have it no-op when the static block is
present (avoid double-emitting two `<script>` JSON-LD blocks).

Design rules honored:
- One reusable `Organization` `@id` (`#org`) + `sameAs`.
- One reusable reviewer/author entity (`#research-desk`), `parentOrganization` -> `#org`.
- `WebSite` + `SearchAction`.
- `WebPage` carries `datePublished`, `dateModified`, `lastReviewed`, `author`, `reviewedBy`.
- `BreadcrumbList` URLs match the canonical exactly (https, trailing slash).
- `ItemList` of price-free `Thing` plan entities (NO `Product` / `Offer`).
- `FAQPage` parity with the eight visible FAQs.
- `DefinedTermSet` glossary.
- Single `@graph`, shared entities by `@id`.
- NO `Product` / `Offer` / `Review` / `AggregateRating` anywhere.

> Dates are illustrative. Source `dateModified`/`lastReviewed` from the plan
> data verified_at; `datePublished` from first publish. Keep the visible
> "last reviewed" line in sync with `dateModified`.

```html
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
      "@type": "Organization",
      "@id": "https://www.covercapy.com/#research-desk",
      "name": "CoverCapy Plan Research desk",
      "url": "https://www.covercapy.com/about/",
      "parentOrganization": { "@id": "https://www.covercapy.com/#org" }
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
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#webpage",
      "url": "https://www.covercapy.com/compare-ppo-dental-plans/",
      "name": "Compare PPO Dental Plans (2026) | CoverCapy",
      "description": "Compare eight individual PPO dental plans on monthly cost, annual maximum, waiting periods, and the treatment you actually need.",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "datePublished": "2025-09-12T00:00:00-05:00",
      "dateModified": "2026-06-21T00:00:00-05:00",
      "lastReviewed": "2026-06-21",
      "author": { "@id": "https://www.covercapy.com/#research-desk" },
      "reviewedBy": { "@id": "https://www.covercapy.com/#research-desk" },
      "breadcrumb": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#breadcrumb" },
      "mainEntity": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#plan-list" }
    },
    {
      "@type": "Service",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#concierge",
      "serviceType": "PPO dental plan comparison and in-network dentist matching",
      "provider": { "@id": "https://www.covercapy.com/#org" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "description": "An independent concierge service that compares individual PPO dental plans and matches each member to a top-ranking in-network PPO dentist nearby."
    },
    {
      "@type": "ItemList",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#plan-list",
      "name": "Individual PPO dental plans compared on CoverCapy",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 8,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Thing",
            "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#plan-uhc-primary",
            "name": "UnitedHealthcare Primary Dental",
            "description": "Individual PPO dental plan. 100% preventive from day one. Fast activation."
          }
        }
        /* ... repeat one ListItem per live() plan, position 1..n,
           item = { "@type":"Thing", "@id": "...#plan-<key>",
           "name": carrier+" "+name, "description": p.best }.
           NO price, NO Offer, NO Product. */
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I compare PPO dental plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Compare PPO dental plans on five points: monthly cost, annual maximum, waiting periods for basic and major work, how the plan handles the treatment you actually need, and whether your dentist accepts it. The monthly cost matters least of the five. A plan that excludes your treatment is expensive at any price."
          }
        }
        /* ... one Question per visible FAQ in the FAQS array (8 total).
           Maintain exact parity with rendered FAQ text. Never emit a
           Question whose answer is not visibly on the page. */
      ]
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#glossary",
      "name": "PPO dental insurance glossary",
      "hasDefinedTerm": [
        {
          "@type": "DefinedTerm",
          "name": "PPO",
          "description": "A plan that lets you see any dentist, but pays more when you stay in network."
        }
        /* ... one DefinedTerm per GLOSS slug, name=TIPS[s].t, description=TIPS[s].b */
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Dental insurance",
          "item": "https://www.covercapy.com/dental-insurance/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Compare PPO plans",
          "item": "https://www.covercapy.com/compare-ppo-dental-plans/"
        }
      ]
    }
  ]
}
</script>
```

---

## 3. Migration notes for the generator / template

1. **Stop JS-injecting.** Move the graph into the served `<head>`. If
   `injectSchema()` is retained for dev convenience, guard it so it does not
   double-emit when the static block exists.
2. **Delete forbidden types.** Remove `service.hasOfferCatalog` (line 1927) and
   the `products` array (line 1932). Replace with the `ItemList` of `Thing`
   above. `Service` keeps `provider`/`areaServed`/`description` only.
3. **Add the `WebPage` node** with dates + author + reviewer. Wire
   `datePublished`/`dateModified`/`lastReviewed` to real plan-data timestamps;
   keep the visible "last reviewed" line in sync with `dateModified`.
4. **Canonical parity.** Pick one canonical form and make `WebPage.url`,
   `WebPage.@id` base, breadcrumb position-2 `item`, and `<link rel="canonical">`
   byte-identical (https, `www`, trailing slash). Today line 1924 uses
   `PAGE = .../compare-ppo-dental-plans` with no trailing slash, which must be
   reconciled with the canonical.
5. **Curated `Dentist[]`** (line 1928) hard-codes `addressRegion:"CA"`. Either
   drop these from the hub graph (they belong on T5 pages) or source the region
   per row. Out of scope for the price/E-E-A-T fix; flag only.
6. **Single `<script>` block, one `@graph`.** Do not split.
7. **Validate** in Rich Results Test + schema.org validator: zero errors,
   FAQPage eligible, no `Product`/`Offer`/`Review`/`AggregateRating`.

---

## 4. Acceptance checklist

- [ ] `@graph` server-rendered in `<head>` (visible in raw HTML, no JS needed).
- [ ] No `Product`, `Offer`, `Review`, `AggregateRating`, `price`, `priceCurrency`,
      `availability`, or `InStock` anywhere in the graph.
- [ ] `WebPage` node with `datePublished`, `dateModified`, `lastReviewed` (ISO 8601).
- [ ] `#research-desk` defined once, used as both `author` and `reviewedBy`.
- [ ] `WebSite` + `SearchAction`; one reusable `#org` with `sameAs`.
- [ ] `ItemList` of price-free `Thing` plan entities (one per live plan).
- [ ] `FAQPage` parity with the eight visible FAQs; nothing hidden marked up.
- [ ] `DefinedTermSet` glossary intact.
- [ ] Breadcrumb URLs byte-match the canonical.
- [ ] Visible "last reviewed" line equals `dateModified`.
- [ ] One `@graph`, one `<script>` block; validates clean.
