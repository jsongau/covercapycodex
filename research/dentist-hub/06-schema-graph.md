# dentist.html — JSON-LD `@graph` Schema Spec

**Page:** National PPO dentist hub
**URL:** `https://www.covercapy.com/dentist` (canonical without `.html`)
**Updated:** 2026-06-26

---

## Source-of-truth findings (from existing code)

- **Search param confirmed:** `find-my-dentist.html` prefills its location box from
  `URLSearchParams.get('where')` (line ~9543), with optional `&radius=` (default 30).
  → SearchAction target must be `https://www.covercapy.com/find-my-dentist?where={search_term_string}`.
  Do **not** use `?q=` or `?zip=` — those are not parsed. The on-page input id is `#q-where`
  but the URL param is `where`.
- **Existing @id conventions** (from `dental/california/index.html`) reused for consistency:
  - Organization `@id`: `https://www.covercapy.com/#organization`
  - WebSite `@id`: `https://www.covercapy.com/#website`
  - Logo: `https://www.covercapy.com/assets/img/covercapy-logo.png`
  - Page/breadcrumb/faq use `{url}#webpage`, `#breadcrumb`, `#faq`.
- Brand strings: **CoverCapy**, **Concierge Dental Network**, domain **www.covercapy.com** (www + https).

---

## BUILD-TIME PLACEHOLDERS (must be filled by the generator)

| Token | Meaning |
|-------|---------|
| `{{STATE_ITEMLIST}}` | The `itemListElement` array of state hubs — emit one ListItem per state that actually has a published `/dental/{state}/` hub. Do NOT hardcode 50; only list states with live pages. `numberOfItems` must equal the array length. |
| `{{DATE_MODIFIED}}` | ISO date of last build, e.g. `2026-06-26`. |
| `{{OFFICE_COUNT}}` | Total PPO offices listed nationwide (sum of market `office_count`). Used in description + FAQ answer. |
| `{{STATE_COUNT}}` | Number of states with live hubs (= `numberOfItems`). |

FAQ answers below are solid drafts; the content agent may refine copy but should keep facts consistent with the build numbers.

---

## Ready-to-paste JSON-LD

```html
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.covercapy.com/#organization",
      "name": "CoverCapy",
      "alternateName": "CoverCapy Concierge Dental Network",
      "url": "https://www.covercapy.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.covercapy.com/#logo",
        "url": "https://www.covercapy.com/assets/img/covercapy-logo.png",
        "contentUrl": "https://www.covercapy.com/assets/img/covercapy-logo.png",
        "caption": "CoverCapy"
      },
      "image": { "@id": "https://www.covercapy.com/#logo" },
      "description": "CoverCapy is a concierge PPO dental network helping patients find in-network PPO dentists nationwide and verify insurance before they book.",
      "sameAs": [
        "https://www.facebook.com/covercapy",
        "https://www.instagram.com/covercapy",
        "https://www.linkedin.com/company/covercapy",
        "https://x.com/covercapy"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.covercapy.com/#website",
      "url": "https://www.covercapy.com/",
      "name": "CoverCapy",
      "description": "Find a PPO dentist near you, nationwide. Verify your insurance and book with confidence.",
      "publisher": { "@id": "https://www.covercapy.com/#organization" },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.covercapy.com/find-my-dentist?where={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": ["CollectionPage", "MedicalWebPage"],
      "@id": "https://www.covercapy.com/dentist#webpage",
      "url": "https://www.covercapy.com/dentist",
      "name": "Find a PPO Dentist Near You — Nationwide Directory | CoverCapy",
      "description": "Find an in-network PPO dentist near you. CoverCapy lists {{OFFICE_COUNT}}+ PPO dental offices across {{STATE_COUNT}} states. Browse by state, metro, and city, verify your insurance, and book with confidence.",
      "inLanguage": "en-US",
      "datePublished": "2026-06-26",
      "dateModified": "{{DATE_MODIFIED}}",
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "about": { "@id": "https://www.covercapy.com/#organization" },
      "breadcrumb": { "@id": "https://www.covercapy.com/dentist#breadcrumb" },
      "mainEntity": { "@id": "https://www.covercapy.com/dentist#state-list" },
      "primaryImageOfPage": { "@id": "https://www.covercapy.com/#logo" }
    },
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.covercapy.com/dentist#service",
      "name": "CoverCapy Concierge Dental Network",
      "url": "https://www.covercapy.com/dentist",
      "image": "https://www.covercapy.com/assets/img/covercapy-logo.png",
      "parentOrganization": { "@id": "https://www.covercapy.com/#organization" },
      "description": "A nationwide directory and concierge service that helps patients find in-network PPO dentists, verify coverage with their carrier, and book appointments. PPO dental plans available from $30/month for patients who need coverage.",
      "areaServed": { "@type": "Country", "name": "United States" },
      "medicalSpecialty": "Dentistry",
      "priceRange": "$30+",
      "makesOffer": {
        "@type": "Offer",
        "name": "PPO Dental Insurance Verification & Plans",
        "category": "Dental PPO",
        "priceCurrency": "USD",
        "price": "30",
        "url": "https://www.covercapy.com/compare-ppo-dental-plans"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.covercapy.com/find-my-dentist?where={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.covercapy.com/dentist#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "CoverCapy",
          "item": "https://www.covercapy.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Find a Dentist",
          "item": "https://www.covercapy.com/dentist"
        }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://www.covercapy.com/dentist#state-list",
      "name": "PPO Dentists by State",
      "description": "Browse PPO dental offices by state.",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": {{STATE_COUNT}},
      "itemListElement": [
        {{STATE_ITEMLIST}}
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.covercapy.com/dentist#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I find a PPO dentist near me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your ZIP code or city on CoverCapy's Find My Dentist tool, then filter by your insurance carrier and the treatment you need. You can also browse by state, metro area, and city to see every PPO-participating office near you."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if a dentist is in my PPO network?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each CoverCapy office listing shows the PPO carriers it participates with. Networks change often, so confirm your specific plan tier with the office or use CoverCapy's free insurance verification before you book."
          }
        },
        {
          "@type": "Question",
          "name": "Is it cheaper to see an in-network PPO dentist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. In-network PPO dentists accept negotiated rates, so you typically pay less out of pocket and your plan covers a larger share than it would at an out-of-network office."
          }
        },
        {
          "@type": "Question",
          "name": "Which PPO dental insurance carriers does CoverCapy cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CoverCapy lists offices that accept major PPO carriers including Delta Dental, UnitedHealthcare, Guardian, MetLife, Cigna, Aetna, Humana, Ameritas, Principal, and Anthem Blue Cross. You can filter the directory by your carrier."
          }
        },
        {
          "@type": "Question",
          "name": "Can I see a PPO dentist if I don't have dental insurance yet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. If you don't have coverage, CoverCapy offers PPO dental plans from $30/month with fast effective dates so you can get covered today and see a dentist soon after."
          }
        },
        {
          "@type": "Question",
          "name": "How many PPO dentists are listed on CoverCapy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CoverCapy lists {{OFFICE_COUNT}}+ PPO-participating dental offices across {{STATE_COUNT}} states, organized by state, metro area, and city."
          }
        },
        {
          "@type": "Question",
          "name": "Does CoverCapy verify my dental insurance for me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. CoverCapy offers free concierge PPO verification — share your carrier and we confirm whether the office is in-network for your plan before your visit. Your member ID is never stored."
          }
        },
        {
          "@type": "Question",
          "name": "How often is the PPO dentist directory updated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CoverCapy refreshes office and network data regularly. Because PPO participation can change, always confirm your specific plan with the office or through CoverCapy verification before booking."
          }
        }
      ]
    }
  ]
}</script>
```

---

## `{{STATE_ITEMLIST}}` — emit one block per live state hub

```json
{
  "@type": "ListItem",
  "position": 1,
  "name": "California",
  "item": "https://www.covercapy.com/dental/california/"
}
```

Rules: increment `position` starting at 1; `name` = full state name; `item` = `https://www.covercapy.com/dental/{stateSlug}/`; comma-separate, **no trailing comma** after the last item; set the parent `numberOfItems` to the count emitted.

---

## Child-tier BreadcrumbList template (T1–T6) — for consistency across the silo

Drop this `BreadcrumbList` node into each tier page's `@graph`, truncated to the tier's depth.
Position 1 (Home) and position 2 (Find a Dentist → `/dentist`) are **constant on every page** so the
national hub is the silo root. Each page's own breadcrumb `@id` is `{pageUrl}#breadcrumb`.

| Tier | Last crumb | `item` URL pattern |
|------|-----------|--------------------|
| T1 Home | CoverCapy | `https://www.covercapy.com/` |
| T2 Hub | Find a Dentist | `https://www.covercapy.com/dentist` |
| T3 State | {State} | `https://www.covercapy.com/dental/{state}/` |
| T3.5 Region | {Region} | `https://www.covercapy.com/dental/{state}/{region}/` |
| T4 Metro | {Metro} | `https://www.covercapy.com/dental/{state}/{metro}/` |
| T4c City | {City} | `https://www.covercapy.com/dental/{state}/{metro}/{city}/` |
| T5 Dentist | {Dentist} | `https://www.covercapy.com/dental/{state}/{metro}/{city}/{slug}/` |

Full T5 example chain (Home > Find a Dentist > State > Metro > City > Dentist):

```json
{
  "@type": "BreadcrumbList",
  "@id": "https://www.covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "CoverCapy", "item": "https://www.covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "Find a Dentist", "item": "https://www.covercapy.com/dentist" },
    { "@type": "ListItem", "position": 3, "name": "California", "item": "https://www.covercapy.com/dental/california/" },
    { "@type": "ListItem", "position": 4, "name": "Los Angeles", "item": "https://www.covercapy.com/dental/california/los-angeles/" },
    { "@type": "ListItem", "position": 5, "name": "West Hollywood", "item": "https://www.covercapy.com/dental/california/los-angeles/west-hollywood/" },
    { "@type": "ListItem", "position": 6, "name": "Smiles Dental", "item": "https://www.covercapy.com/dental/california/los-angeles/west-hollywood/smiles-dental-ca-a1b2c3/" }
  ]
}
```

> NOTE: Existing `/dental/` pages currently start their breadcrumb at CoverCapy → State (no
> `/dentist` crumb). To make `/dentist` the true silo root, the generator should insert the
> "Find a Dentist" crumb at position 2 and shift remaining positions +1. Coordinate this with
> the generator change; it is a one-line insert in each `build*Hub` / `buildDentistPage` breadcrumb array.

---

## Validation checklist

- Single `@context` + single `@graph`. ✅
- `sameAs` is an array (placeholder social URLs — replace with real CoverCapy profiles or remove unused). ✅
- All URLs absolute with `https://www.covercapy.com`. ✅
- No trailing commas (verify after `{{STATE_ITEMLIST}}` expansion). ⚠️ generator must not emit a trailing comma.
- SearchAction target uses real param `?where=`. ✅
- `numberOfItems` must equal emitted ListItem count. ⚠️ build-time.
- Reuses existing `#organization` / `#website` `@id`s so nodes dedupe site-wide. ✅
```
