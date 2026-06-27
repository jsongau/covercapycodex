# SEO/GEO Improvement Brief: Homepage

URL: https://www.covercapy.com/
File: index.html
Last reviewed: 2026-06-25

---

## Snapshot

- URL: https://www.covercapy.com/
- GSC (last 7 days): 6 clicks / 62 impressions (CTR 9.7%)
- Current title (55 chars): `CoverCapy | PPO Dental Insurance, Plans & In-Network Dentists`
- Current meta description (134 chars): `Understand PPO dental insurance, compare plans, estimate treatment costs, and find dentists in your PPO network with CoverCapy.`
- Current H1: `CoverCapy is a patient-first dental PPO concierge.`
- Word count: ~9,778 words in source (long, content-rich homepage)
- Schema present: Organization, WebSite (with SearchAction/EntryPoint), FAQPage (6 Q&A)
- Schema missing: WebPage node, BreadcrumbList is N/A for root, no `sameAs` social profiles on Organization, no aggregateRating/reviewCount equivalent trust node

### Internal links present on the homepage
- /find-my-dentist (many)
- /compare-ppo-dental-plans (several)
- /dental-treatment-cost-estimator
- Carrier deep links: /dental-insurance/ppo-plans/delta-dental, /aetna-dental-direct, /uhc-primary-dental, /guardian-premier-ppo, /ameritas-primestar, /humana-extend-5000, /mutual-of-omaha-dental, plus /dental-insurance/ppo-plans (All plans)
- /capy-accreditation, /capy-practice-membership, /covercapy-join, /advertising-disclosure, /accessibility

### Gaps spotted
- The homepage does NOT link to the PPO plans hub `/dental-insurance/ppo-plans` from the primary hero or above-the-fold nav (only deep in the plans section). The hub is the page with the worst CTR and needs homepage authority flowing into it.
- No link to the dedicated Delta hub `/dental-insurance/delta-dental/` (only the ppo-plans/delta-dental stop).
- No link to /dental-insurance (the top-level Insurance hub) from hero.
- MetLife NCD Complete plan exists in the repo but is not surfaced anywhere on the homepage carrier rail.

---

## Target queries & intent

The homepage is the brand and category landing surface. With only 62 impressions and 9.7% CTR, it is showing for a thin mix of brand and broad-category terms and likely sitting low on the broad ones.

**Brand / navigational (should win, near 100% CTR when ranked #1):**
- covercapy
- covercapy dental
- covercapy reviews
- covercapy ppo

Note: a web search for "CoverCapy dental insurance reviews" returned no brand results, confirming the brand is still establishing entity recognition. This is an opportunity, not a loss: lock the brand SERP first.

**Category / informational-commercial (homepage can rank but competes with deep pages):**
- ppo dental insurance
- ppo dental plans
- dental insurance concierge / dental insurance help
- find a dentist that takes my ppo
- in network dentist finder

**The CTR problem:** at 9.7% the homepage CTR is acceptable for a mostly-brand footprint, but 62 impressions is tiny. The real issue is impression volume, not click rate. The homepage title leads with the brand name (good for brand queries, weak for category queries) and the meta is a flat feature list with no hook or proof number. The fix is twofold: (1) keep brand-forward but add a click hook and a proof number to the meta to lift category-query CTR, and (2) push homepage link equity into the PPO hub and carrier pages so those rank and feed branded discovery back to the homepage.

---

## Meta rewrite

**Recommended title (59 chars):**
```
CoverCapy: PPO Dental Plans, Costs & In-Network Dentists
```
Why it beats the current: drops the low-value pipe-plus-brand-twice pattern, keeps the brand as the entity anchor at the front (brand queries still match), and front-loads the three category intents people actually search (plans, costs, in-network dentists). "Costs" replaces "Insurance" because cost-of-treatment intent is a distinct, high-volume query family the site already serves with the estimator.

**Recommended meta description (152 chars):**
```
Compare PPO dental plans, estimate what you'll really owe, and confirm a dentist takes your exact PPO network. Built by dental-office insiders. Free to use.
```
Why it beats the current: the current meta is a flat verb list with no differentiator. The rewrite adds (a) a concrete value hook ("what you'll really owe"), (b) the unique mechanism ("confirm a dentist takes your exact PPO network", the verification step competitors skip), (c) an E-E-A-T signal ("built by dental-office insiders"), and (d) a friction-remover ("Free to use"). All are true to existing on-page copy. Sentence case, no em-dashes.

---

## Content to add

The homepage is already long and content-rich. Do not bloat it. Add four targeted blocks that increase topical coverage and internal-link surface:

1. **Above-the-fold secondary nav row (hub links).** Add a slim row of four pill links directly under the hero CTAs: "Compare PPO plans", "PPO plans by carrier" (to /dental-insurance/ppo-plans), "Treatment cost estimator", "Find an in-network dentist". This puts the worst-CTR hub one click from the hero and passes homepage equity to it.

2. **"PPO plans at a glance" mini-table** (new section, ~150 words) that mirrors the hub's six-plan shelf in a compact 3-column table (Plan, From $/mo, Best for) with a single CTA "See all PPO plans by carrier" pointing to /dental-insurance/ppo-plans. Use the verified figures: UHC Primary Dental ~$30/mo (preventive starter), Aetna Dental Direct ~$50/mo (prior-coverage waiver), Ameritas PrimeStar ~$60/mo (no waiting periods), Guardian Premier 2.0 ~$70/mo (only ortho on the shelf), Mutual of Omaha ~$90/mo ($5,000 cap), Humana Extend 5000 ~$100/mo (fastest implant path). Add a row for Delta Dental (~$75/mo, largest network, its own hub) and MetLife NCD Complete so all carriers are represented.

3. **Brand-entity FAQ additions.** Append two questions to the existing FAQPage so the homepage answers brand-defining queries:
   - "Is CoverCapy an insurance company or a broker?" Answer: concierge dental network, not a carrier or broker; explains plans, costs, and network, and confirms with the office.
   - "Is CoverCapy free to use?" Answer: yes, searching dentists and understanding coverage is free; plans are purchased from the carrier.

4. **Trust strip with last-updated and reviewer line** near the footer (see E-E-A-T). ~60 words.

Word-count target: keep the homepage at roughly its current length (do not pad). Net addition ~400 to 500 words of high-intent content plus the link row.

---

## Schema

The homepage already has Organization, WebSite, and FAQPage. Add a WebPage node and enrich Organization. Keep all nodes in a single `@graph` if practical.

**Add WebPage node:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.covercapy.com/#webpage",
  "url": "https://www.covercapy.com/",
  "name": "CoverCapy: PPO Dental Plans, Costs & In-Network Dentists",
  "isPartOf": { "@id": "https://www.covercapy.com/#website" },
  "about": { "@id": "https://www.covercapy.com/#organization" },
  "description": "Compare PPO dental plans, estimate treatment costs, and confirm a dentist takes your exact PPO network.",
  "dateModified": "2026-06-25",
  "primaryImageOfPage": "https://www.covercapy.com/assets/covercapy-og.jpg",
  "inLanguage": "en-US"
}
```

**Enrich Organization node** (add `sameAs`, `description`, `knowsAbout`, and `slogan`):
```json
{
  "@type": "Organization",
  "@id": "https://www.covercapy.com/#organization",
  "name": "CoverCapy",
  "url": "https://www.covercapy.com/",
  "logo": "https://www.covercapy.com/assets/covercapy-og.jpg",
  "slogan": "Get cover today, see a dentist tomorrow.",
  "description": "A patient-first PPO dental concierge that explains coverage, estimates costs, and confirms whether a dentist accepts your exact PPO network.",
  "knowsAbout": ["PPO dental insurance", "dental insurance waiting periods", "annual maximums", "in-network dentists", "dental treatment cost estimation"],
  "sameAs": [
    "https://www.linkedin.com/company/covercapy",
    "https://www.instagram.com/covercapy",
    "https://x.com/covercapy"
  ]
}
```
Note: populate `sameAs` only with profiles that actually exist. Remove any that do not.

Keep the existing WebSite + SearchAction (good for sitelinks search box) and the FAQPage (extend it with the two brand FAQs above).

---

## Internal linking

The homepage should act as the equity distributor for the hub pages. Add or strengthen:

| From | To | Anchor text |
|------|----|-------------|
| Homepage hero pill row | /dental-insurance/ppo-plans | PPO plans by carrier |
| Homepage hero pill row | /compare-ppo-dental-plans | Compare PPO plans |
| Homepage hero pill row | /dental-treatment-cost-estimator | Treatment cost estimator |
| Homepage hero pill row | /find-my-dentist | Find an in-network dentist |
| Homepage "at a glance" table CTA | /dental-insurance/ppo-plans | See all PPO plans by carrier |
| Homepage carrier rail | /dental-insurance/delta-dental/ | Inside Delta Dental |
| Homepage carrier rail | /dental-insurance/ppo-plans/metlife-ncd-complete | MetLife NCD Complete |
| Homepage "Inside dental insurance" nav item | /dental-insurance | Dental insurance hub |

Anchor-text rule: vary anchors (do not repeat "PPO dental plans" verbatim on every link); use the carrier or intent name so each link carries distinct relevance.

---

## Authority / E-E-A-T

The homepage already states the founding story (years inside dental offices) and a "Reviewed by dental operations professionals" line. Make those signals machine- and human-legible:

1. **Named reviewer line** in the trust strip: "Coverage and cost guidance reviewed by [Name], [role: dental billing / eligibility specialist], [N] years in PPO eligibility and claims. Last reviewed June 2026." A real name and credential beats "dental operations professionals."
2. **Visible last-updated date** near the hero or footer: "Directory and plan facts last reviewed June 2026" (already partially present as "Reviewed//2026.06.18"; surface it as plain text too).
3. **Cite sources for the stat callouts** already on the page: the CDC 2023 dental-visit stat and the JADA 2025 dental-fear stat are cited; keep those linked and add the publication name in visible text, not just the link.
4. **Advertising disclosure link** is present; keep it in the footer and reference it from any plan-pricing block ("how we make money").
5. **Organization sameAs** (schema above) ties the brand entity to real social profiles, which helps Google resolve the brand for navigational queries that currently return nothing.

---

## Priority actions (ordered by impact / effort)

1. **Ship the meta rewrite** (title + description). Lowest effort, immediate CTR upside on category queries. (High impact, low effort)
2. **Add the hero pill-link row** pushing equity to /dental-insurance/ppo-plans, /compare-ppo-dental-plans, estimator, finder. Directly addresses the hub's weak ranking. (High impact, low effort)
3. **Add WebPage schema node + enrich Organization with sameAs/description.** Helps brand-entity resolution so "covercapy" queries return the site. (Med impact, low effort)
4. **Add the two brand FAQs** to the existing FAQPage ("broker vs concierge", "free to use"). Captures brand-clarification intent and adds FAQ rich-result surface. (Med impact, low effort)
5. **Add named-reviewer line + visible last-updated** in a trust strip. (Med impact, low effort)
6. **Add the "PPO plans at a glance" mini-table** with Delta and MetLife included, linking to the hub. (Med impact, med effort)
7. **Surface the missing carrier links** (Delta hub, MetLife NCD Complete) in the carrier rail. (Low impact, low effort)
