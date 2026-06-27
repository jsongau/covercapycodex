# A2 — Structured Data (FINAL server-rendered @graph)

**Agent:** SEO Architect 2 of 10. **Scope:** `compare-ppo-dental-plans.html` only. SPEC + final pasteable block. No code shipped to the file by this agent. No em-dashes.
**Date:** 2026-06-21
**Builds on:** `docs/ppo-redesign/agents/elite/SEO3-schema.md` (prior memo). This memo supersedes it on three grounded points (canonical, the under-review flag wording, the FAQ apostrophe), and promotes the block from "spec" to "final, literal, pasteable."

---

## 1. Ground truth (verified line refs)

| Fact | Line | Value |
|------|------|-------|
| Canonical link | 8 | `<link rel="canonical" href="https://www.covercapy.com/compare-ppo-dental-plans" />` (www, **NO trailing slash**) |
| JS injector | 1997-2009 | `function injectSchema(){...document.head.appendChild(s);}` |
| Injector call | 2321 | `injectSchema();` |
| PLAN_PAGE map | 1448 | `{delta:'delta-dental',uhc:'uhc-primary-dental',aetna:'aetna-dental-direct',ameritas:'ameritas-primestar',guardian:'guardian-premier-ppo',moo:'mutual-of-omaha-dental',humana:'humana-extend-5000','metlife-ncd':'metlife-ncd-complete'}` |
| planUrl() | 1449 | `'/dental-insurance/ppo-plans/'+PLAN_PAGE[p.key]+'/'` |
| GLOSS (22 slugs) | 1570 | ppo, waiting-period, annual-maximum, deductible, coinsurance, in-network, out-of-pocket, balance-billing, missing-tooth, calendar-year, plan-year, effective-date, day-one, allowed-amount, ada-fee, cdt, coverage-preventive, coverage-basic, coverage-major, implants, whitening, vision |
| FAQS (10 Q/A) | 1951-1962 | mirrored verbatim below |
| FAQ apostrophe | 1959 | source uses `plan&#39;s`; in JSON-LD it becomes a literal `'` |

### Three corrections vs the prior SEO3 memo

1. **Canonical.** SEO3 specced the trailing-slash form `.../compare-ppo-dental-plans/`. The real `<link rel=canonical>` on line 8 has **no trailing slash**. The brief orders byte-identical match to the canonical link. So this final block uses `https://www.covercapy.com/compare-ppo-dental-plans` everywhere, with no trailing slash. (If the team prefers the trailing-slash canonical, change line 8 first, then this block in the same commit; do not let them diverge.) Note the old JS at line 1998 already used the no-slash form (`PAGE=BASE+'/compare-ppo-dental-plans'`), so this final block matches both line 8 and the old JS.
2. **PLAN_PAGE has 8 entries, including metlife.** Line 1448 maps `'metlife-ncd':'metlife-ncd-complete'`. The prior memo said MetLife "has no live page" and dropped its url. Since a real slug exists, this final block keeps MetLife's `url` for path parity with `planUrl()`, and flags it under review via `disambiguatingDescription`. If that page is not yet published, drop the `url` line from item 8 only.
3. **FAQ is 10 items, not 9.** Source `FAQS` has ten entries (lines 1952-1961). All ten are mirrored.

---

## 2. Honesty / parity constraints (carried from SEO3, reaffirmed)

- No `Offer`, no `Product`, no `price`, no `priceRange`, no `InStock`. Plans are `Thing`. This intentionally collapses the old `service.hasOfferCatalog` `Offer/Product` block (line 2001) and the standalone `products` `Product` block (line 2006) into one price-free `ItemList`.
- FAQ parity is verbatim with `FAQS` (lines 1951-1962), all ten pairs.
- `DefinedTermSet` mirrors `GLOSS` (line 1570), 22 terms, names/descriptions from `TIPS[slug].t`/`.b`.
- Author and reviewer are the org and its named editorial function. No fabricated credentialed person.
- No `Dentist` entities (old line 2002 emitted sample `CURATED` rows). Dentist schema belongs on T5 pages per CLAUDE.md.

---

## 3. FINAL literal JSON-LD block — paste into `<head>` immediately after line 8

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
      "logo": { "@type": "ImageObject", "url": "https://www.covercapy.com/logo.png" },
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
      "about": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans#planlist" },
      "mainEntity": { "@id": "https://www.covercapy.com/compare-ppo-dental-plans#faq" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Dental insurance", "item": "https://www.covercapy.com/dental-insurance" },
        { "@type": "ListItem", "position": 2, "name": "Compare PPO plans", "item": "https://www.covercapy.com/compare-ppo-dental-plans" }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans#planlist",
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
            "url": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/",
            "additionalType": "https://www.covercapy.com/#ppo-dental-plan"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I compare PPO dental plans?",
          "acceptedAnswer": { "@type": "Answer", "text": "Compare PPO dental plans on five points: monthly cost, annual maximum, waiting periods for basic and major work, how the plan handles the treatment you actually need, and whether your dentist accepts it. The monthly cost matters least of the five. A plan that excludes your treatment is expensive at any price." }
        },
        {
          "@type": "Question",
          "name": "What is a dental insurance waiting period?",
          "acceptedAnswer": { "@type": "Answer", "text": "A waiting period is the time between the day your coverage starts and the day a category of treatment becomes eligible. Preventive care is usually covered on day one. Basic work such as fillings often waits 0 to 3 months. Major work such as crowns, root canals, and implants commonly waits 6 to 12 months, depending on the plan." }
        },
        {
          "@type": "Question",
          "name": "What is a dental annual maximum?",
          "acceptedAnswer": { "@type": "Answer", "text": "The annual maximum is the most a dental plan will pay toward your care in one benefit year. The live plans here range from $1,000 to $5,000. For large treatment such as implants, the annual maximum often matters more than the coverage percentage." }
        },
        {
          "@type": "Question",
          "name": "What is a missing tooth clause?",
          "acceptedAnswer": { "@type": "Answer", "text": "A missing tooth clause excludes coverage for replacing a tooth that was already missing before your policy started. If you lost a tooth last year and buy a plan today, a missing tooth clause can exclude the implant or bridge that replaces it. Always confirm this clause in writing before enrolling for implant work." }
        },
        {
          "@type": "Question",
          "name": "Which PPO dental plan is best for implants?",
          "acceptedAnswer": { "@type": "Answer", "text": "It depends on timing and case size. Humana Extend 5000 has the shortest implant wait at 6 months, with a $2,000 per year implant benefit and a $4,000 lifetime maximum. Mutual of Omaha pays 50% after a 12-month wait under a $5,000 annual maximum. Ameritas covers Phase 1 work such as extraction and bone graft on day one. Check the missing tooth clause on any of them." }
        },
        {
          "@type": "Question",
          "name": "Which PPO dental plan is best for crowns and root canals?",
          "acceptedAnswer": { "@type": "Answer", "text": "Crowns and root canals are usually classified as major services, so the deciding factors are the major waiting period and the annual maximum. Humana reaches major coverage at 6 months. Ameritas has no waiting period on major but pays 20% in year one and 50% from year two. Guardian and Delta Dental pay 50% after a 12-month wait." }
        },
        {
          "@type": "Question",
          "name": "Do any of these plans cover braces or Invisalign?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Guardian Premier 2.0 covers braces and Invisalign for dependents under 19 at 50% after a 12-month wait. Delta Dental PPO Premium also offers orthodontic coverage, including for adults. Adult orthodontics is rare on individual PPOs, so confirm the lifetime maximum and waiting period before you enroll." }
        },
        {
          "@type": "Question",
          "name": "How fast can a PPO dental plan start?",
          "acceptedAnswer": { "@type": "Answer", "text": "UnitedHealthcare Primary Dental and Ameritas PrimeStar Care Complete are typically active within 1 to 3 business days, with preventive care covered on day one. Guardian Premier 2.0 activates on the 1st of the next month. Fast activation covers preventive and basic work first; major categories still follow each plan's waiting periods." }
        },
        {
          "@type": "Question",
          "name": "Should I verify my dentist before buying PPO dental insurance?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, before you enroll, not after. PPO networks vary by state, ZIP code, office, and plan version, and carrier directories are often out of date. Email or call the dental office directly and ask if they are in network with the exact plan name. The Find a dentist tool on this page helps you confirm it." }
        },
        {
          "@type": "Question",
          "name": "Can I buy my own PPO if I have coverage through work or Medi-Cal?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many people buy an individual PPO while waiting for work benefits to start, when their employer plan is too limited for planned treatment, or when moving from Medi-Cal to private coverage. Your situation changes which plan fits, so start with the treatment you need and the timeline you have." }
        }
      ]
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://www.covercapy.com/compare-ppo-dental-plans#glossary",
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

### Notes on the literal block
- Every page-scoped `@id`/`url`/`item` is `https://www.covercapy.com/compare-ppo-dental-plans` (no trailing slash) to be byte-identical to the canonical at line 8.
- The org-scoped (`/#org`, `/#website`) and absolute plan/glossary URLs keep their own real paths and are unaffected by the canonical decision.
- The FAQ #8 text uses a literal `'` (the source `&#39;` HTML entity is decoded for JSON-LD).
- Plan URLs match `planUrl()` (line 1449) built from `PLAN_PAGE` (line 1448), trailing slash included. MetLife item carries `disambiguatingDescription: "Under review"` and is last. If `metlife-ncd-complete` is not yet published, delete only its `url` line.
- All quotes/apostrophes are plain ASCII so the inline `<script>` stays valid JSON.

---

## 4. Exact removal of the JS injection (do in the same commit as the paste)

1. **Paste the block above** directly after line 8 (the canonical link), before any other `<head>` content.
2. **Remove the call.** Line 2321: delete the line `  injectSchema();`. Keep the rest of the bootstrap intact.
3. **Delete the function body.** Lines 1997-2009: remove the entire `function injectSchema(){ ... }`. Leave `scrollspy()` (starts line 2010) untouched.
4. **Confirm zero leftovers.** Grep the file:
   - `injectSchema` -> 0 matches.
   - `application/ld+json` -> exactly 1 match (the new static block in `<head>`), and it must NOT be inside a `createElement`/`textContent` JS path.
   - `CURATED.filter` schema usage gone (the dentist-entity block at old line 2002 was inside `injectSchema` and is removed with it).
5. **Validate the raw HTML** (view-source, not rendered DOM) through Google Rich Results Test and the Schema.org validator. Expect: FAQ rich result eligible; no Product/Offer/merchant-listing warnings; no missing-field errors; all 10 FAQ items, 8 plan items, 22 glossary terms present.
6. **Canonical byte-match check.** Confirm every page-scoped string equals line 8 exactly (https, www, no trailing slash).

---

## 5. Ongoing parity discipline

`FAQS` (1951-1962), `GLOSS`/`TIPS` (1570 / definitions), and the plan data + `PLAN_PAGE` (1448) still drive the visible render. This static block is now a hand-maintained mirror. Any edit to those arrays must update this `<head>` block in the same commit and bump `dateModified`. A future deploy-time build step that regenerates the head JSON-LD from the same source arrays would remove the manual-mirror risk; until then treat them as one change unit.
