# 09 — Schema Maximization: PPO Hub
## /dental-insurance/ppo-plans/ | CoverCapy | Spec 09 of 15 | June 2026

**Status:** IMPLEMENTATION-READY. For inclusion in the Phase 2.5 integration pass.

**Scope:** Design the maximal-but-valid JSON-LD schema set for the PPO Plans hub. Keep the four existing blocks (WebPage, BreadcrumbList, ItemList, FAQPage). Add Article, Speakable, and per-plan Product nodes with brand / parentOrganization. Provide copy-paste skeletons with SSOT placeholders, schema-to-visible parity rules, and a validation checklist. Flag every Google structured-data penalty risk.

**SSOT rule:** Every fact in schema must come from `/data/plans/{slug}.md`. No invented numbers. Premiums are labeled estimates.

---

## 1. SCHEMA INVENTORY: WHAT EXISTS, WHAT TO ADD

### 1.1 Current schema blocks (confirmed in hub index.html as of 2026-06-26)

| Block | @type | Status |
|---|---|---|
| S1 | WebPage | Keep, enhance with `about` array |
| S2 | BreadcrumbList | Keep as-is |
| S3 | ItemList | Keep, but elevate ListItem items to Product refs |
| S4 | FAQPage | Keep as-is (11 Q&A pairs currently implemented) |

### 1.2 New blocks to add

| Block | @type | Rationale | Risk level |
|---|---|---|---|
| S5 | Article | Freshness + author signal for GEO/AI citation; aligns with `article:modified_time` already in head | Low |
| S6 | Speakable | Flags answer blocks and FAQ answers for voice / AI extraction | Low |
| S7-S14 | Product (x8, one per plan) | Enables plan-specific query rich results; price as estimate with `priceValidUntil`; brand + parentOrganization | Medium (price accuracy required) |

### 1.3 What NOT to add (ruled out)

| @type | Reason rejected |
|---|---|
| AggregateRating | No real aggregate review data for the hub as a whole. Carrier ratings (AM Best) are financial strength ratings, not product reviews. Adding fabricated or editorial star ratings = guaranteed manual action. |
| Review | Same reason. No verified review corpus. |
| HowTo | The scenario finder is interactive, not a linear how-to sequence with defined steps; shoehorning it into HowTo markup would misrepresent the content. |
| Event | No events on this page. |
| MedicalEntity / Drug | Insurance is not a medical entity under schema.org definitions. |
| FinancialProduct | schema.org/FinancialProduct is under active development and has no confirmed Google rich result. Risk of misuse penalty outweighs the marginal gain until Google confirms support. |
| InsuranceAgency | CoverCapy is a comparison/referral platform, not an insurance agency. Incorrect type. |

---

## 2. COMPLETE SCHEMA SET: COPY-PASTE SKELETONS

### DELIVERY FORMAT

All blocks should be emitted as separate `<script type="application/ld+json">` tags in the `<head>`, one tag per block. An array inside a single tag is also valid but harder to maintain and diff. Separate tags preferred.

---

### S1 — WebPage (enhanced)

Add an `about` array pointing to the eight plan `Product` nodes by `@id`. This tells Google what the page is about at the entity level.

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "name": "Best PPO Dental Plans 2026: Find the Right Fit",
  "description": "Eight independently reviewed PPO dental plans matched to your situation. Coverage for families, seniors, braces, implants, and no-waiting-period needs. Updated June 2026.",
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://www.covercapy.com/",
    "name": "CoverCapy",
    "url": "https://www.covercapy.com/"
  },
  "breadcrumb": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#breadcrumb"
  },
  "datePublished": "2026-01-01",
  "dateModified": "{{LASTMOD_DATE}}",
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://www.covercapy.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.covercapy.com/assets/covercapy-logo.svg",
      "width": 200,
      "height": 50
    }
  },
  "mainEntity": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#plan-list"
  },
  "about": [
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/#product" },
    { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/#product" }
  ]
}
```

**Parity rule:** `dateModified` must match the "Updated {{LASTMOD_DATE}}" visible text in the hero meta pills row.

---

### S2 — BreadcrumbList (unchanged)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "Dental Insurance", "item": "https://www.covercapy.com/dental-insurance/" },
    { "@type": "ListItem", "position": 3, "name": "PPO Dental Plans", "item": "https://www.covercapy.com/dental-insurance/ppo-plans/" }
  ]
}
```

**Parity rule:** Visible breadcrumb nav must render exactly Home / Dental Insurance / PPO Dental Plans with a `/` separator. No em-dashes.

---

### S3 — ItemList (keep, link items to Product nodes)

The existing `ListItem` entries work. Optionally add `item` references pointing to the Product `@id` to create explicit entity links. This is additive and safe.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#plan-list",
  "name": "Featured PPO Dental Plans on CoverCapy",
  "description": "Eight independently reviewed PPO dental insurance plans available for individual and family enrollment, updated June 2026.",
  "numberOfItems": 8,
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "UnitedHealthcare Primary Dental",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/#product" },
      "description": "The lowest-premium plan on the shelf at about $30 a month, with 100% preventive and 50% basic from day one and no major work coverage; for adults 18 to 64, not sold in New York."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Aetna Dental Direct",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/#product" },
      "description": "A balanced 100/80/50 PPO with a $1,250 calendar-year maximum, waivable waits with prior coverage within 90 days, and a free CVS ExtraCare Plus membership including a $10 monthly CVS reward (not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA)."
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Ameritas PrimeStar Care Complete",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/#product" },
      "description": "No waiting periods on any category including implants from day one, with a maximum that grows from $2,000 to $3,500 after year one; age-neutral pricing, not sold in Massachusetts."
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Guardian Premier PPO",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/#product" },
      "description": "The only plan on the shelf with dependent orthodontics, 60% in-network for children under 19, plus the highest day-one basic rate at 85% and a $3,000 annual maximum."
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "MetLife NCD Complete",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/#product" },
      "description": "The highest annual maximum on the shelf at $10,000 per calendar year with no waiting periods and a one-time $100 lifetime deductible; major coverage graduates from 10% in year one to 60% by year three."
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Mutual of Omaha Dental Preferred",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/#product" },
      "description": "A selectable $1,500, $3,000 or $5,000 maximum with no waiting period on any category, community-rated pricing that does not rise with age, and a separate $3,000 lifetime implant maximum."
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Humana Extend 5000",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/#product" },
      "description": "A $5,000 annual maximum that bundles dental, vision and hearing, with major work and implants reaching 50% after a 6-month wait and a $200 whitening allowance per arch; implant lifetime maximum $4,000."
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Delta Dental PPO Premium",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/",
      "item": { "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/#product" },
      "description": "The largest PPO network in the country and one of the few individual plans to cover adult orthodontics, both adults and children at 50% up to a $1,500 lifetime maximum; sold in 16 states plus DC."
    }
  ]
}
```

---

### S4 — FAQPage (unchanged from current implementation)

The current 11-question FAQPage block is correct. Keep as-is. No changes needed here.

**Parity rule:** Every `acceptedAnswer.text` must appear verbatim in the visible `<details><summary>` FAQ block. Do not shorten the visible answers relative to the schema answers.

**Note on Google FAQPage deprecation:** Google deprecated FAQ rich results for general SERPs in May 2026. FAQPage schema is still valid for AI Overview citation extraction (Perplexity, ChatGPT). Keep it.

---

### S5 — Article (NEW)

Article tells AI crawlers there is an authored, editorially reviewed document here with a modification date. It supplements WebPage for GEO freshness scoring.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#article",
  "headline": "Best PPO Dental Plans 2026: Find the Right Fit",
  "description": "Eight independently reviewed PPO dental plans matched to your situation: families, braces, seniors, implants, and no waiting periods. Compare and verify your dentist free.",
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "datePublished": "2026-01-01",
  "dateModified": "{{LASTMOD_DATE}}",
  "inLanguage": "en-US",
  "author": {
    "@type": "Organization",
    "name": "CoverCapy Editorial Team",
    "url": "https://www.covercapy.com/about/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://www.covercapy.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.covercapy.com/assets/covercapy-logo.svg",
      "width": 200,
      "height": 50
    }
  },
  "about": [
    { "@type": "Thing", "name": "PPO dental insurance" },
    { "@type": "Thing", "name": "dental insurance waiting periods" },
    { "@type": "Thing", "name": "individual dental insurance plans" },
    { "@type": "Thing", "name": "dental insurance for families" },
    { "@type": "Thing", "name": "dental insurance for seniors" },
    { "@type": "Thing", "name": "dental implant coverage" },
    { "@type": "Thing", "name": "orthodontic coverage" }
  ],
  "isPartOf": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/"
  },
  "mainEntityOfPage": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/"
  },
  "articleSection": "Dental Insurance",
  "keywords": "PPO dental insurance, best dental insurance 2026, dental insurance waiting period, dental insurance for families, dental insurance for seniors, dental implant coverage, orthodontic dental insurance"
}
```

**Author choice:** If CoverCapy has a named author or editorial director who is visibly credited on the page (with a byline), use a `Person` node instead of Organization:

```json
"author": {
  "@type": "Person",
  "name": "{{AUTHOR_NAME}}",
  "url": "https://www.covercapy.com/authors/{{author-slug}}/",
  "sameAs": "{{LinkedIn or other profile URL if available}}"
}
```

If there is no visible byline on the page, use the Organization form above. Google requires that the author entity be verifiable; a named person without a linked profile or bio page is worse than an Organization.

**Parity rules for Article:**
- `headline` must match the visible H1 or be the page title tag. It cannot state a fact not visible on the page.
- `dateModified` must match the visible "Updated {{LASTMOD_DATE}}" text in the hero section.
- `about` entities must each correspond to a topic that has a dedicated section or heading on the page.

---

### S6 — Speakable (NEW)

Speakable marks specific CSS selectors as the best passages for voice assistants and AI snippet extraction. Google uses Speakable for Google Assistant. Perplexity and other AI crawlers use it as a passage-priority signal.

Mark the following page sections:

| CSS selector | Content |
|---|---|
| `.hero-lede` | Hero lede sentence (the one-sentence answer to the H1 question) |
| `.scenario-answer-block` | Each scenario-finder answer block (the 40 to 80 word scenario answers) |
| `.plan-verdict` | Each plan story verdict paragraph (1 to 2 sentences per plan) |
| `#faq details summary + *` | Each FAQ answer paragraph |
| `.waiting-period-explainer` | The waiting periods explainer section (answer to "how does a dental waiting period work") |

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".hero-lede",
      ".scenario-answer-block",
      ".plan-verdict",
      "#faq .faq-answer",
      ".waiting-period-explainer"
    ]
  }
}
```

**Implementation note:** Speakable must be attached to a WebPage node. The cleanest approach is a second WebPage block whose only properties are `@id` and `speakable`. The `@id` must match S1 exactly. Alternatively, add the `speakable` property directly to S1.

**Parity rule:** Every selector in the `cssSelector` array must exist in the rendered HTML. If the class names differ in the final build, update the selectors to match. A selector that resolves to nothing is a wasted signal; it is not a penalty but it does no work.

**Risk note:** Speakable is a low-risk addition. Google does not penalize incorrect selectors; they are simply ignored. The risk is implementation drift if class names change after the schema is set.

---

### S7-S14 — Product nodes (NEW, one per plan)

Eight separate Product blocks, one per plan. Each has:
- A `Brand` node with the legal carrier name
- A `parentOrganization` on the Brand where the carrier is a subsidiary of a larger parent
- An `Offer` with an estimated monthly price labeled with a `priceType` note
- `availability: InStock`

**CRITICAL PRICE RULE:** Only use the `price` field if the value comes from an SSOT file and is visible on the page. All eight plans have SSOT-verified premium estimates. Label them clearly in the `description` and `priceValidUntil`. If any plan's premium becomes unverifiable, omit the `price` field entirely rather than guessing.

#### S7 — UnitedHealthcare Primary Dental

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/#product",
  "name": "UnitedHealthcare Primary Dental",
  "description": "Entry-level individual PPO dental plan underwritten by Golden Rule Insurance Company (a UnitedHealthcare company). Covers preventive at 100% and basic from 50% day one with no waiting period; major, implants and orthodontics not covered. Annual maximum $1,000 per calendar year. Not sold in New York. Eligibility ages 18 to 64.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Golden Rule Insurance Company",
    "alternateName": "UnitedHealthOne",
    "parentOrganization": {
      "@type": "Organization",
      "name": "UnitedHealth Group",
      "sameAs": "https://www.unitedhealthgroup.com/"
    }
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/",
    "priceCurrency": "USD",
    "price": "30",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "30",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated starting monthly premium for adults age 18 to 24 in sample ZIP codes; age-banded, varies by state, ZIP and effective date"
    },
    "availability": "https://schema.org/InStock",
    "areaServed": {
      "@type": "Country",
      "name": "United States",
      "description": "Excludes New York"
    },
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (uhc-primary-dental.md):** Premium ~$30/mo is a CoverCapy estimate, age-banded, not from official page. Annual max $1,000. Basic 50/65/80 graduated. Major not covered. Not in NY. Eligibility 18 to 64. Underwriter is Golden Rule Insurance Company (a UnitedHealthcare company), parent UnitedHealth Group.

#### S8 — Aetna Dental Direct

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/#product",
  "name": "Aetna Dental Direct",
  "alternateName": "Aetna Dental Direct Preferred PPO",
  "description": "Individual PPO dental plan from Aetna Life Insurance Company (part of CVS Health). Covers preventive 100% day one, basic 80% after a 6-month wait, major 50% after a 12-month wait. Annual maximum $1,250 per calendar year. Includes CVS ExtraCare Plus membership with a $10 monthly reward (not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA). Implants and orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Aetna Life Insurance Company",
    "alternateName": "Aetna",
    "parentOrganization": {
      "@type": "Organization",
      "name": "CVS Health",
      "sameAs": "https://www.cvshealth.com/"
    }
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/",
    "priceCurrency": "USD",
    "price": "50",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "50",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated monthly premium; varies by ZIP, age and effective date; brochures do not publish a fixed premium"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (aetna-dental-direct.md):** Premium ~$50/mo estimate. Annual max $1,250 exact (calendar year). Basic 80% plan pays after 6-month wait. Major 50% after 12-month wait. Waits waivable if all enrolled had dental coverage within past 90 days. CVS ExtraCare Plus on Preferred and Core tiers; excluded in 9 states as listed. Implants explicitly excluded.

#### S9 — Ameritas PrimeStar Care Complete

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/#product",
  "name": "Ameritas PrimeStar Care Complete",
  "description": "Individual PPO dental plan underwritten by Ameritas Life Insurance Corp. with no waiting periods on any category including implants. Coverage can begin as soon as the next day. Annual maximum $2,000 in year one growing to $3,500 after year one. Major coverage 20% in-network year one, 50% after year one. Age-neutral pricing. Not available in Massachusetts. Orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Ameritas Life Insurance Corp.",
    "alternateName": "Ameritas"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/",
    "priceCurrency": "USD",
    "price": "56",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "56",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Average policyholder cost per Ameritas brochure GR 7708 3-26 ($55.79/mo average); age-neutral, varies by ZIP and effective date"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (ameritas-primestar.md):** Premium brochure average $55.79/mo (use 56 rounded). No waiting periods, all categories. Annual max $2,000 year one to $3,500 year two+. Implant sub-cap $1,000 year one / $1,500 year two, deducted from annual max. No ortho or whitening on Complete. Not in MA. Underwriter: Ameritas Life Insurance Corp.

#### S10 — Guardian Premier PPO

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/#product",
  "name": "Guardian Premier PPO",
  "alternateName": "Guardian Advantage Premier 2.0",
  "description": "Individual PPO dental plan from The Guardian Life Insurance Company of America (AM Best A++). Covers basic at 85% in-network from day one with no waiting period; major and implants at 60% in-network after a 12-month wait. Annual maximum $3,000 per benefit year. Dependent orthodontics (children under 19) at 60% in-network, $1,500 lifetime maximum, 12-month wait. Adult orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "The Guardian Life Insurance Company of America",
    "alternateName": "Guardian"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
    "priceCurrency": "USD",
    "price": "70",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "70",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated monthly premium; sample quote $67.89/mo at age 35; varies by state, ZIP and age"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (guardian-premier-ppo.md):** Premium ~$70/mo estimate, sample $67.89/mo at age 35. Annual max $3,000. Basic 85% in-network day one. Major and implants 60% in-network / 50% OON, 12-month wait. Implants $1,250 lifetime max (separate from annual). Child ortho 60% in-network, $1,500 lifetime. Adult ortho NOT covered on any Guardian individual plan.

#### S11 — MetLife NCD Complete

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/#product",
  "name": "MetLife NCD Complete",
  "alternateName": "NCD Complete by MetLife",
  "description": "Association PPO dental plan sold as NCD by MetLife, underwritten by Metropolitan Life Insurance Company. Highest annual maximum on the CoverCapy shelf at $10,000 per calendar year. No waiting periods. One-time $100 lifetime deductible. Major coverage graduates from 10% in year one to 50% in year two to 60% in year three and after. Implants covered under major schedule, $3,000 calendar-year sub-maximum. Orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Metropolitan Life Insurance Company",
    "alternateName": "MetLife"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/",
    "priceCurrency": "USD",
    "price": "100",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "100",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated monthly premium; reseller quotes approximately $94/mo at age 35; varies by state, age and ZIP"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (metlife-ncd-complete.md):** Premium ~$100/mo estimate, reseller ~$94/mo age 35. Annual max $10,000 calendar year. Deductible $100 lifetime (not annual). No waiting periods. Major 10/50/60 graduated. Implant calendar-year sub-max $3,000 (within $10,000 annual). No ortho or whitening.

#### S12 — Mutual of Omaha Dental Preferred

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/#product",
  "name": "Mutual of Omaha Dental Preferred",
  "description": "Individual PPO dental plan underwritten by Mutual of Omaha Insurance Company, administered by TruAssure. No waiting periods on preventive, basic or major services. Annual maximum selectable at $1,500, $3,000 or $5,000 per calendar year. Major coverage 20% in year one, 50% in year two and after. Separate $3,000 lifetime implant maximum. Community-rated pricing (same rate regardless of age). Orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Mutual of Omaha Insurance Company",
    "alternateName": "Mutual of Omaha"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/",
    "priceCurrency": "USD",
    "price": "90",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "90",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated monthly premium for Mutual Dental Preferred at the $5,000 annual maximum; live quote $88.40/mo; community-rated, varies by state and ZIP"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (mutual-of-omaha-dental.md):** Premium Preferred at $5,000 max = $88.40/mo live quote, rounded to ~$90. Community-rated. No waiting periods. Annual max selectable $1,500/$3,000/$5,000. Major 20% year one, 50% year two+. Basic 80% (Preferred). Lifetime implant max $3,000 (Preferred). No ortho. Underwriter: Mutual of Omaha Insurance Company; administrator: TruAssure.

#### S13 — Humana Extend 5000

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/#product",
  "name": "Humana Extend 5000",
  "description": "Individual PPO dental plan from Humana Insurance Company that bundles dental, vision and hearing coverage (hearing not included in New York). Annual maximum $5,000 per calendar year. Preventive 100% day one, basic 80% after a 90-day wait, major 50% after a 6-month wait rising to 60% in year two. Implants covered on the major schedule with a $2,000 calendar-year maximum and $4,000 lifetime maximum. $200 whitening allowance per arch with no waiting period. Orthodontics not covered.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Humana Insurance Company",
    "alternateName": "Humana"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/",
    "priceCurrency": "USD",
    "price": "100",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "100",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Estimated monthly premium; varies by state, ZIP and effective date; brochures do not list a premium"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (humana-extend-5000.md):** Premium ~$100/mo estimate. Annual max $5,000 calendar year for all dental including implants. Deductible $75 (basic and major only). Basic wait 90 days. Major wait 6 months; implant wait 6 months and cannot be waived. Major 50% year one, 60% year two+. Implant annual max $2,000 / lifetime max $4,000. Whitening $200 allowance per arch, no wait. No ortho. Bundles vision and hearing (NY: dental and vision only).

#### S14 — Delta Dental PPO Premium

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/#product",
  "name": "Delta Dental PPO Premium",
  "description": "Individual broker-sold PPO dental plan from Delta Dental (underwritten by the applicable Delta Dental member company by state). Largest PPO dental network in the US: 112,000+ dentists at 278,000+ locations. Annual maximum $2,000 per calendar year. Preventive 100% day one, basic 80% after a 6-month wait, major and implants 50% after a 12-month wait. Adult and child orthodontics covered at 50% up to a $1,500 lifetime maximum, after a 12-month wait. Sold in 16 states plus DC. Whitening coverage varies by state.",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "Delta Dental Plans Association",
    "alternateName": "Delta Dental"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/",
    "priceCurrency": "USD",
    "price": "73",
    "priceValidUntil": "{{LASTMOD_DATE_PLUS_6_MONTHS}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "73",
      "priceCurrency": "USD",
      "unitText": "month",
      "description": "Starting subscriber-only premium per DentalPlans.com as of May 2026 ($73.11/mo); varies by state, age and ZIP"
    },
    "availability": "https://schema.org/InStock",
    "areaServed": {
      "@type": "Country",
      "name": "United States",
      "description": "Available in 16 states plus DC; not nationwide"
    },
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**SSOT notes (delta-dental-ppo-premium.md):** Premium $73.11/mo from DentalPlans.com (subscriber-only starting rate). Annual max $2,000 calendar year. Basic 80% after 6-month wait. Major and implants 50% after 12-month wait. Adult and child ortho 50%, $1,500 lifetime, 12-month wait, separate $50 ortho deductible. Missing-tooth clause applies (August 2025 renewals, except CA). 16 states plus DC only. Whitening 80% where included, state-specific, not CA.

---

## 3. BRAND AND PARENTORGANIZATION MAP

| Plan | schema:Brand (legal underwriter) | parentOrganization |
|---|---|---|
| UHC Primary Dental | Golden Rule Insurance Company (alternateName: UnitedHealthOne) | UnitedHealth Group |
| Aetna Dental Direct | Aetna Life Insurance Company | CVS Health |
| Ameritas PrimeStar | Ameritas Life Insurance Corp. | (none; Ameritas is mutual, standalone) |
| Guardian Premier PPO | The Guardian Life Insurance Company of America | (none; mutual, standalone) |
| MetLife NCD Complete | Metropolitan Life Insurance Company | (none; MetLife is publicly traded standalone) |
| Mutual of Omaha | Mutual of Omaha Insurance Company | (none; mutual, standalone) |
| Humana Extend 5000 | Humana Insurance Company | (none; publicly traded standalone) |
| Delta Dental PPO Premium | Delta Dental Plans Association | (none; federated nonprofit association) |

**Rationale:** Only include `parentOrganization` where there is a documented controlling parent (acquisition or ownership, not just partnership). UHC and Aetna are the two verified subsidiary relationships. The others are standalone carriers (mutual companies, public companies, or nonprofit associations). Do not invent parent relationships.

---

## 4. SCHEMA-TO-VISIBLE PARITY RULES

These are the minimum checks required before any deployment. A schema fact with no visible counterpart is a Google quality violation.

| Schema node | Required visible element |
|---|---|
| WebPage.dateModified | "Updated {{LASTMOD_DATE}}" in hero meta pills or editorial note |
| Article.dateModified | Same as above (must be consistent across S1 and S5) |
| Article.headline | Must match visible H1 or be the title tag |
| BreadcrumbList items | Visible breadcrumb nav in same order, same labels |
| ItemList.numberOfItems | Must equal the number of plan story sections rendered on the page |
| ItemList descriptions | Each description must be a sentence appearing in or directly summarizing the plan story card |
| FAQPage questions + answers | Each Q must appear as a visible summary; each A must appear as visible expanded text; no shortening |
| Product.name | Must appear as a visible heading in the plan story section |
| Product.description | Must be derived from visible text in the plan story card (not invented independently) |
| Product Offer.price (estimate) | Must be accompanied by a visible "~$X/mo (estimate)" or labeled equivalent on the page |
| Speakable cssSelector | Every selector must resolve to a non-empty element in the rendered DOM |

**Do not invent in schema what is not on the page. Do not put on the page only what is needed to justify schema.** Both directions are wrong. Fix the page copy first; then write schema to reflect it.

---

## 5. PENALTY RISK REGISTER

| Risk | Severity | Mitigation |
|---|---|---|
| Product.price stated as an exact number when it is an estimate | High | Add a `description` field on `UnitPriceSpecification` stating it is an estimate. Include a `priceValidUntil` date. Label it as an estimate in the visible page copy adjacent to the price. |
| Speakable selectors that match nothing | Low | After each build, verify selectors exist in the rendered HTML before deploying. |
| Article.author as a Person node with no verifiable bio page | Medium | Use Organization ("CoverCapy Editorial Team") unless a named author with a public profile page is bylined on the page. A named author without a verifiable web presence is worse than an Organization author. |
| AggregateRating on any plan or on the hub page without a real review corpus | Critical | Do not add AggregateRating anywhere on this page. No exceptions. |
| Claiming parentOrganization for carriers that are not subsidiaries | High | Only UHC (UnitedHealth Group) and Aetna (CVS Health) qualify. Do not add parentOrganization for Ameritas, Guardian, MetLife, Mutual of Omaha, Humana, or Delta Dental. |
| Delta Dental areaServed not qualified | Medium | The Product node for Delta Dental must include `areaServed` noting 16 states plus DC. Omitting this could misrepresent availability. |
| ItemList and comparison table out of sync | High | Run the parity check (Section 4) after every content edit. If a plan is added or removed, update `numberOfItems`, the `itemListElement` array, and the comparison table simultaneously. |
| Using FinancialProduct @type | Medium | Not confirmed by Google for rich results as of 2026-06-26. Avoid until Google publishes explicit support. Schema.org defines it but Google's structured-data documentation does not list it as a supported type. |
| FAQPage marked incorrectly as HowTo or vice versa | Medium | The FAQ section is `<details><summary>` accordion; this is the correct pattern. Do not add HowTo markup to the scenario finder widget; it is interactive, not a linear procedural sequence. |
| Speakable on non-WebPage type | Low | Speakable must be a property of WebPage. Attach it directly to S1 or emit a second WebPage block with the same @id and only the speakable property. Do not attach it to Article or Product. |

---

## 6. PLACEHOLDER RESOLUTION TABLE

Replace all `{{PLACEHOLDER}}` values before deployment.

| Placeholder | What to substitute |
|---|---|
| `{{LASTMOD_DATE}}` | ISO 8601 date of the current rebuild, e.g. `2026-06-26` |
| `{{LASTMOD_DATE_PLUS_6_MONTHS}}` | ISO 8601 date six months from rebuild, e.g. `2026-12-26`. Use this for `priceValidUntil` since premiums are estimate-based and reviewed at least semi-annually. |

---

## 7. IMPLEMENTATION ORDER AND VALIDATION CHECKLIST

### Order of operations

1. Deploy the page content and visible copy first.
2. Verify all parity rules from Section 4.
3. Add or update all 14 schema blocks (S1 through S14).
4. Validate each block individually at https://validator.schema.org before deployment.
5. Run the Google Rich Results Test at https://search.google.com/test/rich-results (checks WebPage, BreadcrumbList, ItemList, FAQPage, Product/Offer).
6. Confirm that the Speakable selectors resolve in the final rendered DOM.
7. Deploy. Update `sitemap.xml` `lastmod` to match `dateModified`.

### Pre-deployment checklist

**WebPage (S1):**
- [ ] `dateModified` matches visible "Updated [date]" on page
- [ ] `about` array has exactly 8 `@id` references, all matching the Product `@id`s
- [ ] `mainEntity` `@id` matches ItemList `@id`

**BreadcrumbList (S2):**
- [ ] 3 positions: Home, Dental Insurance, PPO Dental Plans
- [ ] Position 3 `item` URL has trailing slash matching canonical

**ItemList (S3):**
- [ ] `numberOfItems` = 8
- [ ] All 8 `item.@id` values match the Product `@id`s
- [ ] Every `description` value appears in visible plan story text

**FAQPage (S4):**
- [ ] 11 questions in schema = 11 visible FAQ items
- [ ] Each `acceptedAnswer.text` exactly matches the visible expanded answer text

**Article (S5):**
- [ ] `headline` matches H1 or title tag
- [ ] `dateModified` matches WebPage `dateModified` and visible "Updated [date]"
- [ ] `author` is verifiable (Organization if no visible byline, Person if byline exists)
- [ ] All `about` entities correspond to page sections with dedicated headings

**Speakable (S6):**
- [ ] All `cssSelector` values resolve to non-empty elements in rendered DOM
- [ ] Speakable is attached to WebPage `@id`, not to Article or Product

**Product blocks (S7-S14):**
- [ ] `price` value is labeled as an estimate in the visible plan card
- [ ] `priceValidUntil` date is set and is in the future
- [ ] `parentOrganization` is only present for UHC (UnitedHealth Group) and Aetna (CVS Health)
- [ ] `availability` is `InStock` for all currently enrollable plans
- [ ] `areaServed` note is present for UHC (excludes NY) and Delta Dental (16 states + DC)
- [ ] No `AggregateRating` anywhere
- [ ] `brand.name` is the legal underwriter name, not the marketing name

**General:**
- [ ] All JSON is valid (no trailing commas, no unescaped quotes)
- [ ] No em-dashes in any string value
- [ ] All URLs have trailing slashes
- [ ] Validator.schema.org returns no errors on any block
- [ ] Google Rich Results Test passes for supported types

---

## 8. WHAT THIS SCHEMA SET TARGETS

| Schema block | SERP / AI target |
|---|---|
| WebPage | Sitelinks, Knowledge Panel |
| BreadcrumbList | Breadcrumb in SERP snippet |
| ItemList | AI Overview list citations ("here are the top PPO plans") |
| FAQPage | AI Overview Q&A citations (ChatGPT, Perplexity passage extraction) |
| Article | Perplexity freshness score, Google News AI Overview |
| Speakable | Google Assistant voice answers, AI passage extraction prioritization |
| Product (x8) | Merchant Center-style product visibility for plan-specific queries; AI "what does [plan] cost" answers |
| WebPage.about | Knowledge Graph entity association (links page to dental insurance entities) |
| Brand.parentOrganization | Entity graph connections (UnitedHealth Group, CVS Health) |

---

*Spec 09 of 15. Phase 2.5 PPO Hub Rebuild. CoverCapy. June 2026.*
*All plan facts sourced from `/data/plans/{slug}.md` SSOT files, verified 2026-06-26. No numbers were invented. Premium estimates are labeled as estimates in both schema and visible copy.*
