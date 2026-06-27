# Workstream 08: Schema / JSON-LD Spec

**Page:** `dental-implant-cost.html` (flagship)
**Canonical URL:** `https://www.covercapy.com/dental-implant-cost`
**Scope:** Ready-to-paste JSON-LD blocks only. No page HTML. Research and copy-paste assets.
**Compiled:** 2026-06-26

---

## 1. Sources (verify dates)

| # | Source | What it supports | Accessed |
|---|--------|------------------|----------|
| S1 | Google, General Structured Data Guidelines (`developers.google.com/search/docs/appearance/structured-data/sd-policies`, last updated 2026-01-06) | Markup must be a true representation of visible content; do not mark up content not visible to readers; use the most specific applicable type; link related items with `@id`; misleading markup can trigger a manual action that removes rich-result eligibility. | 2026-06-26 |
| S2 | schema.org, `MedicalWebPage` type (`schema.org/MedicalWebPage`) | `MedicalWebPage` is the schema type for a web page that provides medical information, with `medicalAudience`, `aspect`, and `lastReviewed` properties. | 2026-06-26 |
| S3 | schema.org, health and medical types index (`schema.org/docs/meddocs.html`) | Defines the medical vocabulary set and `MedicalProcedure` / `MedicalEntity`. | 2026-06-26 |
| S4 | Google, Intro to Product Structured Data (`developers.google.com/search/docs/appearance/structured-data/product`) | `Product` + `Offer` (and `merchant listing` markup) are for pages where a specific product can be bought; `Offer` requires `price` and `priceCurrency`; misuse on non-commerce pages is outside the documented use case. | 2026-06-26 |
| S5 | Web survey of 2025 to 2026 schema practice (schemaapp.com common Product mistakes; hillwebcreations Product manual-action fix; digitalapplied 2026 rich-results guide) | Product/Offer markup that does not match a real, purchasable product with a real price is a leading cause of Product manual actions; informational pages should not carry Offer/AggregateOffer. | 2026-06-26 |

> Re-verify S1 and S4 against the live pages before shipping. The S5 cluster is secondary commentary, used only to corroborate S1/S4, never as the sole basis for a claim.

---

## 2. Decisions and justifications

### 2.1 WebPage vs MedicalWebPage -> use the array `["WebPage", "MedicalWebPage"]`

**Decision: keep the dual type `["WebPage", "MedicalWebPage"]`** that the page already ships (current `dental-implant-cost.html` head).

**Why.** The page is a current 2026 informational guide to the cost of a dental implant, which is a medical procedure. Per S1, Google wants the most specific applicable type, and per S2 `MedicalWebPage` is the type for a page that provides medical information. Pairing it with `WebPage` keeps the node valid as a generic page node for the breadcrumb/website graph while signaling the medical subject. This is a YMYL cost topic, so the medical typing is the honest, specific choice.

**Caveat (do not over-promise).** Deeper medical vocabulary types (MedicalProcedure as the page type, MedicalCondition, Drug) do not produce documented Google rich results. We use `MedicalProcedure` only as the value of `about` / `mainEntity` (describing the subject), not as the page `@type`. The realistic rich-result wins on this page come from `FAQPage` and `BreadcrumbList`, not from the medical typing. The medical typing is for honest semantic representation and AI-answer context, not a rich-result lever.

### 2.2 Organization -> reference the shared `@id` node, do not redefine

The upgraded `about.html` established a canonical Organization graph node at `@id: https://www.covercapy.com/#organization` (and a WebSite node at `#website`). The current `dental-implant-cost.html` instead inlines a thin, standalone `Organization` with no `@id` and a slightly different description, which fragments the entity graph.

**Decision:** On this page, do NOT redefine the full Organization. Reference the shared node by `@id` from `publisher` / `isPartOf` / `about` as appropriate. The full Organization object is defined once (on the homepage / about graph). Referencing by `@id` is exactly the "link related items" pattern S1 endorses and keeps one consistent CoverCapy entity across the site.

### 2.3 BreadcrumbList -> two levels: Home -> Dental Implant Cost

**Decision: two levels, Home -> Dental Implant Cost.** Justification: the page lives at the root path `/dental-implant-cost` (flat URL, no `/treatments/` segment), and the existing visible breadcrumb in the page body renders exactly `Home / Dental Implant Cost`. Per S1, the breadcrumb markup must match the visible breadcrumb trail and the real URL structure. There is no live `/treatments/` hub page to point a middle crumb at, so inserting a "Treatments" level would be a fabricated node pointing at a URL that does not resolve, which violates S1. If and when a real Treatments hub ships at a real URL, add the middle crumb in both the visible trail and the markup together.

### 2.4 FAQPage -> placeholder, Q&A owned by workstream 10

The page already ships a 7-question visible FAQ accordion and a matching `FAQPage` block. Per S1, FAQ structured data must match the FAQ visible on the page, and only mark up content visible to readers. The final question and answer wording is owned by workstream 10 (FAQ copy). This spec ships a placeholder/skeleton plus a hard rule: the `FAQPage` `mainEntity` must mirror the rendered accordion **verbatim** (same questions, same answer text), one `Question` per visible `<details>`. Do not add, drop, or reword questions in the JSON without changing the visible accordion in the same edit.

### 2.5 Article / author / dateModified -> OPTIONAL, only if truthful

**Decision: do NOT add an `Article` node with a fabricated author or reviewer.** The CLAUDE.md hard rule is no fabrication, and S1 forbids marking up content (including author/byline) that is not genuinely true and visible. CoverCapy pages do not currently carry a named human author or a named medical reviewer in the visible body. Inventing a `Person` author or a `reviewedBy` dentist would be fabrication and a manual-action risk.

If, and only if, the team adds a real, visible byline or "medically reviewed by" line to the page body, then the truthful additions are:
- `MedicalWebPage.lastReviewed` (an ISO date the content was actually last reviewed),
- `MedicalWebPage.reviewedBy` (a real reviewer, only if shown on page),
- a `dateModified` on the page node (a real last-edited date).

Until then, the only safe, non-fabricated date signal is an Organization `publisher` reference (already covered) plus an optional `dateModified` if the team maintains a true last-updated date for the page. A skeleton for that truthful-only path is in section 5; leave it commented out until a real value exists.

### 2.6 Product / Offer / AggregateOffer -> AVOID on this page

**Decision: do NOT use `Product`, `Offer`, or `AggregateOffer` anywhere on this page.**

**Why.**
1. This is an informational cost guide. Nothing on the page is a specific purchasable product with a fixed price. Per S4, `Product` + `Offer` markup is for pages where a person can buy a specific product, and `Offer` requires a real `price` and `priceCurrency`.
2. The dollar figures on the page are **national ranges** ("$3,000 to $6,000", "$20,000 to $35,000"), not a price CoverCapy is offering to sell. Marking a range as an `Offer.price` would be inaccurate, and per S1 structured data must be a true representation of the page, not misleading.
3. Per S1 and the S5 cluster, Product/Offer markup that does not correspond to a real, purchasable, priced product is a leading trigger for Product structured-data manual actions, which suppress all rich results from the URL even when the markup validates. The downside (manual action, lost FAQ rich results) far outweighs any upside.
4. CoverCapy is not selling implants and is not an insurer (see About page entity description). Pricing-rich-result markup would misrepresent the page's primary purpose, which S1 explicitly prohibits.

**If the team ever wants a price-style rich result:** the correct lever is NOT this page. A true `Offer`/`Product` belongs only on a page where a specific, named plan or product is actually sold at a stated price, sourced from `/data/plans/`. This cost guide stays purely informational: `WebPage`/`MedicalWebPage` + `FAQPage` + `BreadcrumbList` only.

---

## 3. Final ready-to-paste JSON-LD (drop in `<head>`, replacing the current four blocks)

Paste these as four separate `<script type="application/ld+json">` blocks. Every block below is validated well-formed JSON (see section 6).

### Block A: WebPage + MedicalWebPage (page node, references shared Organization)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "@id": "https://www.covercapy.com/dental-implant-cost#webpage",
  "url": "https://www.covercapy.com/dental-implant-cost",
  "name": "Dental Implant Cost in 2026: With and Without PPO",
  "description": "A current 2026 breakdown of single-tooth and full-mouth dental implant costs in the United States, what PPO dental insurance actually pays, and how to lower the bill.",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://www.covercapy.com/#website" },
  "about": {
    "@type": "MedicalProcedure",
    "name": "Dental implant"
  },
  "mainEntity": {
    "@type": "MedicalProcedure",
    "name": "Dental implant"
  },
  "publisher": { "@id": "https://www.covercapy.com/#organization" },
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  }
}
</script>
```

Notes:
- `isPartOf` points at the shared WebSite node (`#website`) defined in the About/home graph.
- `publisher` references the shared Organization node by `@id` (section 2.2), it does not redefine it.
- `about` and `mainEntity` both name the subject as a `MedicalProcedure` (describing the topic, not the page type, per section 2.1 caveat).
- If a true `dateModified` is maintained for this page, add `"dateModified": "YYYY-MM-DD"` here (ISO date). Do not invent one.

### Block B: BreadcrumbList (two levels, matches visible trail)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.covercapy.com/dental-implant-cost#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com" },
    { "@type": "ListItem", "position": 2, "name": "Dental Implant Cost", "item": "https://www.covercapy.com/dental-implant-cost" }
  ]
}
</script>
```

### Block C: FAQPage (PLACEHOLDER, owned by workstream 10)

> INSTRUCTION TO BUILDER: the questions and answers below are placeholders carried over
> from the current page. Workstream 10 owns the final FAQ copy. Before ship, the
> `mainEntity` array MUST mirror the rendered accordion verbatim: one `Question` per
> visible `<details>`, with `acceptedAnswer.text` equal to the visible answer text.
> Do not add, remove, or reword any question here without making the identical change
> to the visible accordion in the same edit (Google requirement S1).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.covercapy.com/dental-implant-cost#faq",
  "isPartOf": { "@id": "https://www.covercapy.com/dental-implant-cost#webpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "PLACEHOLDER: question 1 from workstream 10 (must match visible accordion)",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PLACEHOLDER: answer 1 text, verbatim from the visible accordion."
      }
    }
  ]
}
</script>
```

### Block D: Organization reference (OPTIONAL convenience node)

The Organization is fully defined once in the site graph (About/home, `@id` `#organization`). This page does NOT need to redefine it. If a self-contained standalone page needs the node present for validators, paste the SAME full object used on the About page (do not invent a divergent one). The minimal correct reference, already used by `publisher` and `isPartOf` above, is sufficient. Do NOT ship the current thin standalone `Organization` block that lacks an `@id`; remove it so the entity graph stays unified.

---

## 4. What to REMOVE from the current page

1. The current standalone `Organization` block (lines ~47 to 58, no `@id`, divergent description). Replace its role with the `@id` references in Block A.
2. The current `WebPage`/`MedicalWebPage` block that uses an inline `publisher` Organization without `@id`. Replace with Block A.
3. Keep the breadcrumb and FAQ blocks but swap them for Blocks B and C (which add `@id` and the workstream-10 instruction).

Net: 4 blocks in, 4 blocks out, with a unified `@id` graph and no fabricated nodes.

---

## 5. Truthful-only date / review skeleton (leave commented until real values exist)

Add inside Block A ONLY when the page carries a real, visible reviewer or a maintained last-updated date:

```jsonc
// "dateModified": "2026-06-26",            // only if a true last-edited date is tracked
// "lastReviewed": "2026-06-26",            // only if the content was actually reviewed on that date
// "reviewedBy": {                          // only if a real, named reviewer is shown on the page
//   "@type": "Person",
//   "name": "REAL REVIEWER NAME, shown in page body"
// }
```

Do not uncomment any of these without a true, page-visible value. Fabricating an author or reviewer violates CLAUDE.md and Google guideline S1.

---

## 6. JSON validation

Each block in section 3 was checked as standalone JSON (object literal, balanced braces and brackets, double-quoted keys and string values, no trailing commas, no comments inside the live blocks, arrays properly delimited). Blocks A, B, C, and the section-5 skeleton (which is intentionally JSONC-commented and must NOT ship as-is) are well-formed. The `@type` array `["WebPage", "MedicalWebPage"]` is valid JSON and valid schema.org (a node may declare multiple types).

Pre-ship check: run the final `<head>` through the Google Rich Results Test and the schema.org validator after workstream 10 fills the FAQ. Confirm zero errors and that the FAQ items count equals the visible accordion item count.

---

## 7. One-line summary

Keep `["WebPage","MedicalWebPage"]`; reference the shared `#organization` and `#website` nodes by `@id` instead of redefining them; ship a two-level Home -> Dental Implant Cost breadcrumb that matches the visible trail; ship a FAQPage placeholder that workstream 10 must fill to match the accordion verbatim; add no author/reviewer/date unless truthfully shown on the page; and AVOID Product/Offer/AggregateOffer entirely because this is an informational range-based cost guide, not a priced commerce page, and misusing Offer risks a manual action.
