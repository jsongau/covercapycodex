# Agent 16 — Structured-data & Entity Specialist

**Note on filename:** Master prompt assigns this workstream output to `agents/16-schema-entities.md`. Saved here as `17-schema-entities.md` per dispatch instruction; treat as Agent 16's memo (the "17" matches the metadata/schema deliverable `17-METADATA-SCHEMA-OG-SPEC.md`).

**Scope:** Schema/JSON-LD across the live `compare-ppo-dental-plans.html` hub, the ZIP `_redesign-package/` hub + 8 spoke plan pages, and the canonical `@graph` spec for the merged system.
**Score: 6.5 / 10** (current combined system). **Target: 9.0 / 10.**

---

## Founder lens: the schema is NOT "too basic" — it is rich but split across two incompatible strategies

There are two schema systems in this repo, and they must be reconciled, not flattened:

1. **Live page (`compare-ppo-dental-plans.html`):** a *rich* `@graph` built at runtime by `injectSchema()` (line 1840) — `Organization`, `WebSite` (+ `SearchAction`), `Service` (+ `OfferCatalog`), per-plan `Product`/`Offer` (with `price`, `UnitPriceSpecification`, `availability:InStock`), `Dentist` nodes, `FAQPage`, `DefinedTermSet` (glossary), `BreadcrumbList`. This is genuinely more entity-dense than most competitors.
2. **ZIP spokes (`_redesign-package/`):** *server-rendered static* JSON-LD — `WebPage` + `BreadcrumbList` + `FAQPage` + `Organization` (`reviewedBy`), and on the better pages `author`, `datePublished`/`dateModified`/`lastReviewed`, `about`/`mainEntity` (`Thing`), carrier `Organization` + `sameAs`. The ZIP hub adds `ItemList`.

**The fear that the redesign is "worse than current" is legitimate if we naively drop the live page's richness.** The job is: keep the live page's depth, fix what is non-compliant or risky, and inherit the ZIP's two correct decisions (static rendering + dates/entity links).

---

## What MUST NOT be lost from the live page

| Keep | Why |
|---|---|
| `WebSite` + `SearchAction` (`/find-my-dentist?loc={search_term_string}`) | Sitelinks searchbox eligibility; unique to the live page, absent from ZIP. |
| `Organization` with full `sameAs` (LinkedIn/Twitter/Facebook), `logo`, `alternateName`, `slogan`, `description`, `areaServed` | The canonical brand entity. ZIP `Organization` is thinner. This is the `#organization` node every page should reference by `@id`. |
| `Service` + `provider` → `#org` | Correctly models CoverCapy as a *concierge comparison/matching service* (not an insurer). Valid and on-brand. |
| `DefinedTermSet` glossary (`hasDefinedTerm`) | Strong, legitimate, rarely-used entity signal for a YMYL topic. Keep on the hub. |
| `Dentist` nodes (name, address, geo, telephone, url) | Real, verifiable local-business entities. Valid — keep, but only for dentists actually rendered on the page. |
| `FAQPage` | Both systems have it; FAQs are visibly present. Keep the invariant. |
| `BreadcrumbList` | Keep, but fix URLs (below). |

## What MUST be ADDED / CORRECTED

### A. Hard compliance fixes (do before any deploy)

1. **REMOVE `Product` + `Offer` + `OfferCatalog` price markup from the live hub.** The live page emits `Offer.price`, `UnitPriceSpecification`, and `availability:"InStock"` for plans. This is the single biggest risk:
   - CoverCapy is a **marketplace/concierge, not the merchant of record** for these insurance products. Emitting `Offer`/`price`/`InStock` claims a commercial offer CoverCapy does not actually transact, and the prices are **illustrative/quote-variable** (see `01-HUB-SPOKE-DATA-CONFLICTS.md` — premiums conflict between hub and briefs). Marking a disputed, ZIP/age/state-variable number as a fixed `price` is both a rich-results risk and a trust/compliance risk.
   - The ZIP spokes correctly use a neutral **`Thing`** for the plan and emit **no `Offer`**. Adopt the ZIP approach everywhere. Replace `Product`→`Thing` (or `DefinedTerm`-style entity), drop `Offer` entirely until the documented trigger conditions are met: (a) real ZIP-gated price in canonical data, (b) legal + merchant-listing sign-off, (c) data-quality SLA. Document the trigger in the repo.
   - `OfferCatalog` on the `Service` may stay **only if** rewritten to list plans as `itemOffered` *without* `price`/`availability` — or, cleaner, drop it and rely on `ItemList`.

2. **NO `Review` / `AggregateRating` anywhere.** Neither system emits these today — preserve that. CoverCapy's editorial "score"/"verdict" must never be expressed as `Review`/`AggregateRating` (would be a fabricated-rating violation). State this as a permanent invariant.

3. **No invented ratings on `Dentist` nodes either.** Current `Dentist` nodes correctly omit `aggregateRating`. Do not add star ratings unless sourced from real, displayed review data.

### B. The JS-only rendering risk (flag to founder)

**The live page's entire `@graph` is injected by `injectSchema()` via `document.createElement('script')` at runtime.** Google generally renders JS and can read this, but:
- It is fragile (any JS error before injection = zero schema), invisible in view-source, slower to be picked up, and **not reliably read by non-Google AI answer engines / LLM crawlers** that do limited or no JS execution.
- The ZIP spokes already do the right thing: **static, server-rendered JSON-LD in the source HTML.** 

**Recommendation: server-render the `@graph` for every PPO page** (build-time generation from the canonical plan-data source, same as `06-structured-data-schema.md` and the master prompt's server-rendering rule require). JS may *enhance* but must never be the *only* source of schema. This is an acceptance gate.

### C. Enrichment + consistency (the ZIP is inconsistent — standardize it)

Audit of the 8 ZIP spokes shows **uneven** markup:
- `delta-ppo-premium.html`: has `WebPage`, `Organization` (`reviewedBy`), `mainEntity`, `lastReviewed` — but **missing** `datePublished`/`dateModified`, `author`, `about`, and carrier `sameAs`.
- `metlife-ncd-complete.html`: **richest** (has `author`, dates, `about`, carrier `Organization`, `Thing`) — yet it is `noindex,follow`, so this enrichment is partly wasted while better-targeted pages lack it.
- The ZIP **hub** has `ItemList` but **no `CollectionPage`** wrapper (live/spec implies one).

Standardize every page to the same generated `@graph` so no page is accidentally thin:
1. **`datePublished` + `dateModified` (ISO 8601) on every `WebPage`**, sourced from canonical `created_at` / `verified_at`(fallback `updated_at`). Keep the visible "last reviewed" line in sync with `dateModified`.
2. **One shared `author` + `reviewedBy` entity** — `Organization` "CoverCapy Plan Research desk" with `parentOrganization`→`#organization`, referenced by `@id` across all pages, with `lastReviewed`. Prefer this Organization sub-brand over a `Person`. **Only use `Person` if a real, named, verifiable reviewer exists** (do not invent one).
3. **`about` / `mainEntity` → plan `Thing`; carrier as `Organization` with `sameAs` to the official carrier domain** (Delta, Aetna, Guardian, Humana, UHC, Ameritas, Mutual of Omaha, MetLife/NCD). Verified per plan, stored in canonical data. This is the entity-consistency backbone for "[carrier] [plan] review 2026" queries.
4. **Keep `WebPage`, NOT `MedicalWebPage`** — these are commercial/financial editorial pages, not medical content.
5. **`FAQPage` only where FAQs are visibly rendered** (true today — maintain).
6. **`BreadcrumbList` URLs must byte-match the final canonical** (https, `www`, trailing slash, casing). The live page mixes `BASE='https://www.covercapy.com'` in schema while CLAUDE.md/canonicals use `covercapy.com` — **resolve host inconsistency** (pick one host system-wide; align schema `@id`s, `item` URLs, and `<link rel=canonical>`).
7. **Visible-content parity:** every schema fact (plan name, carrier, FAQ text, dates) must appear in rendered HTML. Do not emit `ItemList`/`FAQ` for plans/answers not server-rendered on the page.

### D. noindex pages (MetLife)
Keep MetLife on basic `WebPage` for consistency but **do not invest in FAQ/entity enrichment aimed at SERP features**, and ensure no breadcrumb/canonical signal pushes it toward indexing. (Currently over-enriched — trim.)

---

## Canonical `@graph` per page type

One `@graph`, one `<script>`, server-rendered, shared nodes referenced by `@id`.

**Shared global nodes (emit/reference everywhere):** `#organization` (full live-page Organization), `#website` (+ `SearchAction`), `#research-desk` (`author`/`reviewedBy`), one `Organization` per carrier (`#carrier-{key}` + `sameAs`).

| Page type | `@graph` nodes |
|---|---|
| **Master hub** (`compare-ppo-dental-plans`) | `WebPage` **or** `CollectionPage` (+ dates, isPartOf→#website, author/reviewedBy→#research-desk) · `WebSite`+SearchAction · `Organization` · `Service` (provider→#org; OfferCatalog **price-free** or omitted) · `ItemList` of plan `Thing`s (`@id` per plan, `mentions`→carrier) · `Dentist[]` (only if rendered) · `DefinedTermSet` glossary · `FAQPage` · `BreadcrumbList` |
| **Individual plan spoke** | `WebPage`(+dates, about/mainEntity→#plan, author/reviewedBy→#research-desk) · plan `Thing` (`#plan`, mentions→carrier) · carrier `Organization`(+sameAs) · `FAQPage` · `BreadcrumbList`(4-level) · isPartOf→#website. **No Offer/Product/Review.** |
| **Carrier hub** | `WebPage`(+dates) · carrier `Organization`(+sameAs, official site) · `ItemList` of that carrier's plan `Thing`s · `FAQPage` · `BreadcrumbList` |
| **Treatment / timing / life-situation** | `WebPage`(+dates, author/reviewedBy) · `about`→relevant `DefinedTerm`/`Thing` (treatment) · optional `ItemList` of best-fit plan `Thing`s · `FAQPage` (if visible) · `BreadcrumbList`. Use `Article` **only** if the page is genuinely editorial long-form with a real byline; otherwise `WebPage`. |
| **Glossary term page** | `WebPage` · `DefinedTerm` (isPartOf→`DefinedTermSet`) · `BreadcrumbList` |

---

## Acceptance criteria
- [ ] All schema **server-rendered** in source HTML (no JS-only `@graph`).
- [ ] `Product`/`Offer`/`OfferCatalog`-with-price **removed**; plans modeled as `Thing`. Trigger conditions for future `Offer` documented.
- [ ] No `Review`/`AggregateRating` anywhere; no invented dentist ratings.
- [ ] `datePublished`+`dateModified` (ISO 8601) on every indexable `WebPage`, in sync with visible "last reviewed."
- [ ] Shared `#organization`, `#website`, `#research-desk`, `#carrier-*` nodes referenced by `@id`; one `@graph`/page.
- [ ] `about`/`mainEntity` plan `Thing` + carrier `sameAs` to official domain on every plan/carrier page.
- [ ] `WebPage` (not `MedicalWebPage`); `FAQPage` only where FAQs visible; visible-content parity verified.
- [ ] Single canonical host (`www` vs apex) reconciled across canonicals + all schema `@id`/`item` URLs; breadcrumb URLs byte-match canonical.
- [ ] MetLife (noindex) trimmed to basic `WebPage`, no SERP-feature enrichment.
- [ ] Every page passes Rich Results Test + schema.org validator, zero errors/warnings.
- [ ] Driven by one canonical plan-data source (no data drift between schema and visible facts).
