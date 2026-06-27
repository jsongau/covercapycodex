# SEO3 — Server-Rendered Structured Data (@graph)

**Scope:** `compare-ppo-dental-plans.html` only. ANALYZE / SPEC. No code shipped here, no em-dashes.
**Date:** 2026-06-21

---

## 1. Problem statement (grounded in current code)

All structured data is built and appended **at runtime** by `injectSchema()` at line 1985, called from line 2309. It does:

```js
const s=document.createElement('script');
s.type='application/ld+json';
s.textContent=JSON.stringify(graph);
document.head.appendChild(s);   // line 1996
```

So the raw HTML that a crawler fetches contains **no JSON-LD at all**. The entire `@graph` only exists after JS executes. Google can render JS, but:

- Rendering is a second, deferred pass and is not guaranteed for every crawl.
- Bing, social unfurlers, LLM crawlers, and most third-party validators read raw HTML and see nothing.
- The runtime graph also depends on `live()` (line 1299), which depends on `PLANS` loaded async from `plans.json` (line 1291). If that fetch races the schema call, plan entities can be empty.

We already correctly stripped `Offer.price` and `InStock` (the current `products` block at line 1994 emits only `Product` with `name`, `brand`, `category`, `description`, `url`; no Offer/price). Good. But there is still an `Offer`-wrapped `OfferCatalog` inside `service` at line 1989 that should not carry the price-bearing connotation either; the static replacement below drops it in favor of a price-free `ItemList` of `Thing`s.

**Goal:** Place a single static `<script type="application/ld+json">` block in `<head>` with a complete, honest `@graph`, then remove the JS injection without losing parity.

---

## 2. Honesty / parity constraints

1. **No prices, no Offer, no InStock, no priceRange on plans.** The visible page shows monthly prices, but to avoid Product/Offer rich-result eligibility (and the merchant-listing requirements that follow), plan entities are modeled as `Thing` (not `Product`, not `Offer`). This matches the brief.
2. **Plan entities mirror the eight real plans** in the inline `#plans-data` block (lines 1277-1284). `name`, `brand`, `description` come verbatim from `carrier`, `name`, `best`. The eighth plan (`metlife-ncd`) has `status:"gathering-reviews"`, not `live`, so its `ItemList` entry carries an honest `"disambiguatingDescription":"Under review"` and is the last item, matching how the visible table flags it "Reviewing" (line 1592).
3. **FAQPage must have exact parity** with the visible FAQ rendered from `FAQS` (lines 1939-1949) by `renderStatics()` (line 1962). All nine Q and A pairs are included verbatim. Do not add or omit any. If `FAQS` changes, this block must change in lockstep (see section 6).
4. **DefinedTermSet** mirrors the visible glossary rendered from `GLOSS` + `TIPS` into `#dictGrid` (line 1969). Use the 22 slugs in `GLOSS` (line 1558), each term's `name` = `TIPS[slug].t` and `description` = `TIPS[slug].b`. The `'rating'` key in `TIPS` is intentionally excluded because it is not in `GLOSS` and is not rendered in the glossary grid.
5. **reviewer must be an honest entity.** CoverCapy is the author and the reviewer is named as the in-house editorial function, not a fabricated person. Do not invent a credentialed individual.
6. **No dentist entities in the static graph.** The runtime version emits `Dentist` items from `CURATED` (line 1990); those are sample/fallback rows (e.g. `SAMPLE_ROWS` line 1747) and are not the subject of this comparison page. Omitting them keeps the page entity honest. Dentist schema belongs on T5 pages, per CLAUDE.md.

---

## 3. Canonical / identity rules

- Canonical in `<head>` is `https://www.covercapy.com/compare-ppo-dental-plans/` (line 8), **with www and trailing slash**.
- Every `@id`, `url`, and `mainEntityOfPage` that points at this page MUST be **byte-identical** to that canonical: `https://www.covercapy.com/compare-ppo-dental-plans/`.
  - Note the current JS uses `PAGE = BASE+'/compare-ppo-dental-plans'` (line 1986) with **no trailing slash**. The static block fixes this to match the canonical exactly. Mismatched trailing slashes split the entity.
- One reusable `Organization` with `@id` = `https://www.covercapy.com/#org`, referenced by `@id` everywhere else (publisher, provider, author, reviewer, breadcrumb).
- `WebSite` `@id` = `https://www.covercapy.com/#website` with the `SearchAction` pointing at `/find-my-dentist?loc={search_term_string}` (mirrors line 1988).

---

## 4. Literal JSON-LD block — paste into `<head>`

Place immediately after the canonical link (line 8). Update `dateModified` on every meaningful content edit. `datePublished` is fixed at first publish.

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
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.covercapy.com/logo.png"
      },
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
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#webpage",
      "url": "https://www.covercapy.com/compare-ppo-dental-plans/",
      "name": "Compare PPO Dental Plans 2026: Delta Dental, Aetna, Guardian, UHC and More",
      "description": "Compare 8 PPO dental plans for 2026: Delta Dental, Guardian, UHC, Humana and Ameritas. See waiting periods, annual maximums, and monthly cost side by side.",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://www.covercapy.com/#website" },
      "datePublished": "2026-01-01",
      "dateModified": "2026-06-21",
      "author": { "@id": "https://www.covercapy.com/#org" },
      "reviewer": {
        "@type": "Organization",
        "name": "CoverCapy Editorial Team",
        "url": "https://www.covercapy.com/about/editorial/"
      },
      "publisher": { "@id": "https://www.covercapy.com/#org" },
      "about": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#planlist" },
      "mainEntity": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#faq" }
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
    },
    {
      "@type": "ItemList",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#planlist",
      "name": "Individual PPO dental plans compared on CoverCapy",
      "itemListOrder": "https://schema.org/ItemListUnordered",
      "numberOfItems": 8,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Thing",
            "name": "Delta Dental PPO Premium",
            "description": "Orthodontics for braces and aligners, plus implants and major work",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Thing",
            "name": "UnitedHealthcare Primary Dental",
            "description": "Cheapest on the shelf, basic care from day one (ages 64 and under)",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Thing",
            "name": "Aetna Dental Direct",
            "description": "Balanced coverage for everyday dental needs",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Thing",
            "name": "Ameritas PrimeStar Care Complete",
            "description": "No waiting periods, day-one bone graft coverage, implant coverage included, and maximum grows from $2,000 to $3,500 in Year 2",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Thing",
            "name": "Guardian Premier 2.0",
            "description": "85% basic from day one, plus whitening and kids braces",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Thing",
            "name": "Mutual of Omaha Dental Preferred",
            "description": "Highest $5,000 annual maximum, with basic at 80% and major work both available from day one (20% in Year 1, rising to 50% in Year 2)",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "Thing",
            "name": "Humana Extend 5000",
            "description": "Dental plus vision bundle, $200/yr whitening allowance, major coverage climbs from 50% to 60% in Year 2, and dependent add-on discounts available",
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "Thing",
            "name": "MetLife NCD Complete",
            "disambiguatingDescription": "Under review",
            "description": "Highest annual maximum on the shelf ($10,000)",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        }
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
        },
        {
          "@type": "Question",
          "name": "What is a dental insurance waiting period?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A waiting period is the time between the day your coverage starts and the day a category of treatment becomes eligible. Preventive care is usually covered on day one. Basic work such as fillings often waits 0 to 3 months. Major work such as crowns, root canals, and implants commonly waits 6 to 12 months, depending on the plan."
          }
        },
        {
          "@type": "Question",
          "name": "What is a dental annual maximum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The annual maximum is the most a dental plan will pay toward your care in one benefit year. The live plans here range from $1,000 to $5,000. For large treatment such as implants, the annual maximum often matters more than the coverage percentage."
          }
        },
        {
          "@type": "Question",
          "name": "What is a missing tooth clause?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A missing tooth clause excludes coverage for replacing a tooth that was already missing before your policy started. If you lost a tooth last year and buy a plan today, a missing tooth clause can exclude the implant or bridge that replaces it. Always confirm this clause in writing before enrolling for implant work."
          }
        },
        {
          "@type": "Question",
          "name": "Which PPO dental plan is best for implants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on timing and case size. Humana Extend 5000 has the shortest implant wait at 6 months, with a $2,000 per year implant benefit and a $4,000 lifetime maximum. Mutual of Omaha pays 50% after a 12-month wait under a $5,000 annual maximum. Ameritas covers Phase 1 work such as extraction and bone graft on day one. Check the missing tooth clause on any of them."
          }
        },
        {
          "@type": "Question",
          "name": "Which PPO dental plan is best for crowns and root canals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crowns and root canals are usually classified as major services, so the deciding factors are the major waiting period and the annual maximum. Humana reaches major coverage at 6 months. Ameritas has no waiting period on major but pays 20% in year one and 50% from year two. Guardian and Delta Dental pay 50% after a 12-month wait."
          }
        },
        {
          "@type": "Question",
          "name": "Do any of these plans cover braces or Invisalign?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Guardian Premier 2.0 covers braces and Invisalign for dependents under 19 at 50% after a 12-month wait. Delta Dental PPO Premium also offers orthodontic coverage, including for adults. Adult orthodontics is rare on individual PPOs, so confirm the lifetime maximum and waiting period before you enroll."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can a PPO dental plan start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UnitedHealthcare Primary Dental and Ameritas PrimeStar Care Complete are typically active within 1 to 3 business days, with preventive care covered on day one. Guardian Premier 2.0 activates on the 1st of the next month. Fast activation covers preventive and basic work first; major categories still follow each plan's waiting periods."
          }
        },
        {
          "@type": "Question",
          "name": "Should I verify my dentist before buying PPO dental insurance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, before you enroll, not after. PPO networks vary by state, ZIP code, office, and plan version, and carrier directories are often out of date. Email or call the dental office directly and ask if they are in network with the exact plan name. The Find a dentist tool on this page helps you confirm it."
          }
        },
        {
          "@type": "Question",
          "name": "Can I buy my own PPO if I have coverage through work or Medi-Cal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Many people buy an individual PPO while waiting for work benefits to start, when their employer plan is too limited for planned treatment, or when moving from Medi-Cal to private coverage. Your situation changes which plan fits, so start with the treatment you need and the timeline you have."
          }
        }
      ]
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans/#glossary",
      "name": "PPO dental insurance glossary",
      "url": "https://www.covercapy.com/dental-insurance-glossary/",
      "hasDefinedTerm": [
        { "@type": "DefinedTerm", "name": "PPO dental insurance", "description": "Preferred Provider Organization. Flexible plans that work with any licensed dentist, with the lowest cost when you choose in-network providers." },
        { "@type": "DefinedTerm", "name": "Waiting period", "description": "A delay between enrollment and when a tier of coverage activates. Basic services like fillings typically wait 0 to 3 months, major work like crowns and root canals 6 to 12 months. Preventive care usually has no wait." },
        { "@type": "DefinedTerm", "name": "Annual maximum", "description": "The most a PPO will pay for covered services in one plan year. Once you hit it, all further treatment that year is 100% out of pocket, even work it would normally cover at 80%. It resets each plan year." },
        { "@type": "DefinedTerm", "name": "Deductible", "description": "Your first out-of-pocket dollars on covered restorative services before insurance starts reimbursing, usually around $50. Preventive cleanings and exams are usually exempt." },
        { "@type": "DefinedTerm", "name": "Coinsurance", "description": "Your percentage share of the allowed amount after the deductible. Typical PPO tiers are 100% preventive, 80% basic, 50% major. Some plans pay 20% on major in Year 1 and step up to 50% in Year 2." },
        { "@type": "DefinedTerm", "name": "In-network dentist", "description": "A dentist contracted with your PPO carrier to accept negotiated rates and file claims for you. In-network means lower bills and less paperwork." },
        { "@type": "DefinedTerm", "name": "Out of pocket", "description": "The amount you may still pay after insurance benefits are applied." },
        { "@type": "DefinedTerm", "name": "Balance billing", "description": "When an out-of-network dentist bills you the difference between their full fee and what the plan allows." },
        { "@type": "DefinedTerm", "name": "Missing tooth clause", "description": "An exclusion in many PPOs that denies coverage for replacing teeth lost before the policy effective date, subject to the replacement limitations in your certificate." },
        { "@type": "DefinedTerm", "name": "Calendar year reset", "description": "Annual benefits restart on January 1 regardless of when you enrolled. A December cleaning bills against this year; a January cleaning bills against next." },
        { "@type": "DefinedTerm", "name": "Plan year", "description": "A 12-month benefit cycle. Most PPO plans follow the calendar year and reset January 1. Some plans use a plan year that resets 12 months from your enrollment date. Confirm with your carrier which applies." },
        { "@type": "DefinedTerm", "name": "Effective date", "description": "The day your coverage officially begins after enrollment. Some carriers start the next business day; Guardian activates on the 1st of the following month." },
        { "@type": "DefinedTerm", "name": "Day 1 activation", "description": "Coverage usable immediately, with no waiting period for that tier. Preventive care is almost always day one; a few plans extend it to basic or major work." },
        { "@type": "DefinedTerm", "name": "Allowed amount", "description": "The maximum negotiated fee a PPO carrier accepts for a procedure, usually lower than the dentist's full fee." },
        { "@type": "DefinedTerm", "name": "ADA fee schedule", "description": "Standard procedure pricing the ADA publishes. In-network PPO dentists contract to charge no more than the allowed amount." },
        { "@type": "DefinedTerm", "name": "CDT codes", "description": "Current Dental Terminology codes, the standardized billing codes for every procedure. Same code, same payout, regardless of practice." },
        { "@type": "DefinedTerm", "name": "Preventive care", "description": "Cleanings, exams, x-rays, and oral cancer screening. Almost always covered 100% with no waiting period." },
        { "@type": "DefinedTerm", "name": "Basic services", "description": "Procedures like fillings, simple extractions, and basic perio. Typically 80% covered, sometimes rising in Year 2." },
        { "@type": "DefinedTerm", "name": "Major services", "description": "More involved treatment, like crowns, bridges, root canals, and dentures. Often starts at 20 to 50% and improves in Year 2 on phased plans." },
        { "@type": "DefinedTerm", "name": "Implants", "description": "Titanium posts placed in the jawbone to replace lost teeth. Major-service coverage and waiting periods apply, and a missing-tooth clause can limit older losses." },
        { "@type": "DefinedTerm", "name": "Whitening", "description": "Cosmetic brightening of the teeth. Coverage is rare in PPO dental, since most carriers exclude it as cosmetic. Guardian covers it as a benefit, and Humana offers a flat yearly allowance." },
        { "@type": "DefinedTerm", "name": "Vision add-on", "description": "Eye-exam and eyewear benefits bundled with a dental plan. Included on Humana Extend, and an opt-in add-on on most others." }
      ]
    }
  ]
}
</script>
```

Notes on the literal block:
- Plan `url` values use the real on-disk plan-page slugs from `PLAN_PAGE` (line 1436): delta-dental, uhc-primary-dental, aetna-dental-direct, ameritas-primestar, guardian-premier-ppo, mutual-of-omaha-dental, humana-extend-5000. `metlife-ncd` has no live page (it is not in a useful state) so its `Thing` carries no `url`.
- All apostrophes inside text are plain ASCII `'` so the inline `<script>` JSON stays valid. The visible page uses `&#39;` (HTML entity, line 1947) because it lives in HTML attributes; inside a JSON-LD script block use the literal character.
- The `additionalType` IRI is a stable in-house URI naming the class "PPO dental plan" without claiming Product/Offer semantics. It is optional; drop it if you prefer the barest `Thing`.

---

## 5. Removing the JS injection without losing parity

1. **Stop calling the injector.** At line 2309 remove the `injectSchema();` call. Keep the rest of the bootstrap intact.
2. **Delete the function body.** Remove `function injectSchema(){ ... }` (lines 1985-1997). Leave `scrollspy()` (line 1998) untouched.
3. **Confirm no other reference.** Grep the file for `injectSchema` and for any leftover `application/ld+json` created via `createElement`; there should be exactly zero after removal.
4. **Parity check before/after.** Capture the runtime graph once (in DevTools, copy the injected script's text) and diff its semantic content against the static block. Differences that are intentional and acceptable: (a) dentist entities removed, (b) `service`/`OfferCatalog` collapsed into the `ItemList`, (c) `Product` plan nodes replaced by `Thing`, (d) trailing slash added to the page URL, (e) `WebPage` + `reviewer`/`author`/`datePublished`/`dateModified` added (net new, honest). Everything else (Organization, WebSite/SearchAction, BreadcrumbList, FAQPage all nine, DefinedTermSet all 22) must match value-for-value.
5. **Canonical byte-match.** Verify every page-scoped `@id`/`url`/`item` equals `https://www.covercapy.com/compare-ppo-dental-plans/` exactly (https, www, trailing slash). This is the one thing the old JS got wrong (line 1986 had no trailing slash).
6. **Validate.** Run the static HTML (not the rendered DOM) through Google Rich Results Test and Schema.org validator. Confirm FAQ rich result eligible, no Product/Offer/merchant warnings, no missing-field errors.

---

## 6. Ongoing parity discipline

The visible FAQ (`FAQS`, lines 1939-1949), glossary (`GLOSS`/`TIPS`, lines 1533-1558), and plan list (`#plans-data`, lines 1277-1284) are still JS-driven for rendering. The static schema is now a **hand-maintained mirror**. Any edit to those arrays must be reflected in the static `<head>` block in the same commit. To make this enforceable later, consider a tiny build step that regenerates the `<head>` JSON-LD from the same source arrays at deploy time; until then, treat the three source arrays and this block as a single change unit and update `dateModified` whenever content changes.
