# 06 — Structured Data / Schema (PPO Plan Pages)

**Scope:** 8 PPO plan pages + hub. **Owner:** Engineering + SEO. **Priority:** P1. **Effort:** S–M (~1 dev-day).

---

## Current state & audit evidence

Each plan page already ships valid, server-rendered JSON-LD:

- `WebPage` + `BreadcrumbList` + `FAQPage` (FAQs are visibly present on-page).
- `Organization` referenced as `reviewedBy`.
- Hub adds `CollectionPage` + `ItemList` + `WebSite`.

All of the above validate cleanly in the Rich Results Test and schema.org validator. Crucially, **no `Product`, `Offer`, `Review`, or `AggregateRating`** is emitted — correct, given the compliance briefs (CoverCapy is a marketplace, not an insurer; editorial scoring must not be expressed as `Review`/`AggregateRating`, and `Offer`/`Product` are blocked until ZIP-gated pricing + merchant compliance are ready).

**Gaps found:**

1. No `datePublished` / `dateModified` in schema — only a visible "last reviewed" line, invisible to crawlers and AI engines.
2. No marked-up `author` / `reviewer` entity — `reviewedBy` exists but lacks a defined, sameAs-linked entity and `lastReviewed`.
3. No `about` / `mentions` tying the plan and carrier to defined entities (no `sameAs` to the carrier's official site).

**Current score: 8.0 / 10 → Target: 9.0 / 10.**

---

## Why it matters

- **Rich results:** FAQPage already qualifies; complete dates + author strengthen eligibility and freshness signals.
- **Entity understanding:** `about` + `sameAs` lets Google and AI engines resolve "which carrier, which plan" unambiguously — essential for branded "[carrier] [plan] review 2026" queries.
- **E-E-A-T:** an explicit reviewer entity with `lastReviewed` communicates who vetted the content and when — a direct trust signal for a YMYL (insurance) topic.
- **AI answer engines (LLMs):** structured `dateModified` and entity links make CoverCapy's pages more citable and correctly attributed in generated answers.

---

## Specific fixes

1. **Add `datePublished` + `dateModified` to `WebPage`.** Source `dateModified` from `ppo_plans.verified_at` (fallback `updated_at`); `datePublished` from `created_at` (or first publish date). Emit ISO 8601. Keep the visible "last reviewed" line in sync with `dateModified`.

2. **Add a defined reviewer/author.** Use an `Organization` (or `Person` "CoverCapy Plan Research desk") as both `author` and `reviewedBy`, with `lastReviewed` = `verified_at`. Prefer an Organization sub-brand entity over an unnamed Person.

3. **Page type — keep `WebPage`, not `MedicalWebPage`.** `MedicalWebPage` is for medical conditions/procedures/health topics; an insurance-plan review is a financial/commercial editorial page, not medical content. Misusing it risks confusing entity classification. Stay on `WebPage` and express subject matter via `about`.

4. **Add `about` / `mentions` for plan + carrier entities.** Mark up the plan and its carrier as `about` (or `mainEntity` for the plan), with `sameAs` pointing to the carrier's official site. This anchors the page to real-world entities.

5. **Keep `FAQPage` only where FAQs are visibly rendered** (already true — maintain this invariant; never emit FAQ markup for hidden content).

6. **Ensure `BreadcrumbList` URLs match the final canonical** (https, trailing-slash, and casing identical to `<link rel="canonical">`).

7. **Explicitly DO NOT add `Product` / `Offer` / `Review` / `AggregateRating` yet.** Trigger conditions to revisit `Offer`/`Product` later: (a) real ZIP-gated price available in data, (b) legal + merchant-listing compliance signed off, (c) data-quality SLA met. `Review`/`AggregateRating` remain off-limits for editorial scoring regardless.

8. **Validate** every change in the Rich Results Test and schema.org validator before deploy.

---

## JSON-LD `@graph` example (one plan — added fields in **bold** conceptually)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#webpage",
      "url": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/",
      "name": "Acme Dental PPO 2000 Review (2026) | CoverCapy",
      "datePublished": "2025-09-12T00:00:00-05:00",
      "dateModified": "2026-06-10T00:00:00-05:00",
      "lastReviewed": "2026-06-10",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://covercapy.com/#website" },
      "author": { "@id": "https://covercapy.com/#research-desk" },
      "reviewedBy": { "@id": "https://covercapy.com/#research-desk" },
      "about": { "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#plan" },
      "mainEntity": { "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#plan" },
      "breadcrumb": { "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#breadcrumb" }
    },
    {
      "@type": "Organization",
      "@id": "https://covercapy.com/#research-desk",
      "name": "CoverCapy Plan Research desk",
      "url": "https://covercapy.com/about/",
      "parentOrganization": { "@id": "https://covercapy.com/#organization" }
    },
    {
      "@type": "Thing",
      "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#plan",
      "name": "Acme Dental PPO 2000",
      "description": "PPO dental plan from Acme Dental with a $2,000 annual maximum.",
      "mentions": { "@id": "https://covercapy.com/#carrier-acme" }
    },
    {
      "@type": "Organization",
      "@id": "https://covercapy.com/#carrier-acme",
      "name": "Acme Dental",
      "sameAs": "https://www.acmedental.com/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "PPO Plans", "item": "https://covercapy.com/ppo-plans/" },
        { "@type": "ListItem", "position": 2, "name": "Acme Dental PPO 2000", "item": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://covercapy.com/ppo-plans/acme-dental-ppo-2000/#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Does this plan cover orthodontics?", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
      ]
    }
  ]
}
```

> Note: deliberately **no** `Product`/`Offer`/`Review`/`AggregateRating`. `Thing` is used for the plan as a neutral entity (not `Product`) to avoid implying a commercial offer.

---

## Implementation notes

- Generate all fields from `ppo_plans` (carrier name, plan name, `verified_at`, `updated_at`, `created_at`, carrier URL for `sameAs`). One single `@graph` per page — do not split into multiple `<script>` blocks.
- Emit one shared `#research-desk` and one `#organization` node referenced by `@id` across pages.
- **noindex pages (MetLife):** keep them out of rich-result intent. They may keep basic `WebPage` schema for consistency, but do not invest in entity/FAQ enrichment aimed at SERP features, and ensure no canonical/breadcrumb signals push them toward indexing.
- Carrier `sameAs` URL must be the official carrier domain, verified per plan — store in / derive from `ppo_plans`.

---

## Priority & effort

- **Priority: P1** — high-leverage, low-risk, compliance-safe (no forbidden types introduced).
- **Effort: S–M** — template change to the JSON-LD generator + a carrier-URL data field; ~1 dev-day including validation.

---

## Acceptance criteria

- [ ] `datePublished` + `dateModified` present on `WebPage`, sourced from `created_at` and `verified_at`/`updated_at`, in ISO 8601.
- [ ] Visible "last reviewed" line matches `dateModified`.
- [ ] Defined `author` + `reviewedBy` entity (`CoverCapy Plan Research desk`) with `lastReviewed`, referenced by `@id`.
- [ ] `about` / `mainEntity` links the plan entity; carrier marked up with `sameAs` to official site.
- [ ] Page type remains `WebPage` (NOT `MedicalWebPage`).
- [ ] `FAQPage` emitted only where FAQs are visibly rendered.
- [ ] `BreadcrumbList` URLs exactly match each page's final canonical.
- [ ] NO `Product` / `Offer` / `Review` / `AggregateRating` anywhere; trigger conditions for future `Offer` documented in the repo.
- [ ] One `@graph` per page; shared entities referenced by `@id`.
- [ ] noindex (MetLife) pages excluded from rich-result enrichment.
- [ ] All pages pass Rich Results Test + schema.org validator with zero errors/warnings.
- [ ] Score moved 8.0 → 9.0.
