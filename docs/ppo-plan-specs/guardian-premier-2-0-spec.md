# Guardian Premier 2.0 — Page Spec

**File:** `/dental-insurance/ppo-plans/guardian/premier-2-0/index.html`  
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans/guardian/premier-2-0/`  
**Activate URL:** [https://www.guardiandirect.com/dental-insurance](https://www.guardiandirect.com/dental-insurance)  
**OG Image:** `/assets/og-guardian.png`  
**Last updated:** June 2026

---

## SEO

| Field | Value |
|---|---|
| Title tag | `Guardian Premier 2.0 Dental Review 2026 | CoverCapy` |
| Meta description | `Independent review of Guardian Premier 2.0: 85% basic, child orthodontics, whitening after 6 months. The family plan on the shelf. Verify free.` |
| Title length | 51 chars |
| Desc length | 143 chars |

### Primary Keywords
- `guardian premier 2.0 dental review`
- `guardian dental ppo child braces`
- `guardian dental direct`

---

## Plan Summary

### Best for
Families with children needing braces, patients with lots of basic work, whitening seekers

### Not for
Adult orthodontics (only Delta covers adults), urgent major work (12-month wait)

### Key differentiators
- 85% basic coverage
- Child orthodontics (under 19)
- Whitening after 6 months
- Strong basic-first families

---

## Schema Markup
Types present: WebPage, BreadcrumbList, FAQPage, ItemList, Organization  
- `datePublished`: 2026-01-15  
- `dateModified`: 2026-06-24  
- `author/@id`: `https://www.covercapy.com/#org`

---

## CTA Map

| CTA | Position | Destination |
|---|---|---|
| Activate with Guardian ↗ | Activate banner (hero area) | `https://www.guardiandirect.com/dental-insurance` |
| Activate with Guardian ↗ | Spec sheet sidebar | `https://www.guardiandirect.com/dental-insurance` |
| Verify my exact plan free | Hero + rail + sticky bar | `/find-my-dentist?plan=plan` |
| Compare side by side | Footer CTA | `/compare-ppo-dental-plans/?add=plan` |
| Find a PPO dentist | Multiple | `/find-my-dentist` |

---

## Universal Components (injected at runtime)

- **Mega nav:** `/components/mega-nav.html` + `/assets/js/mega-nav.js`
- **Footer:** `/components/footer.html` + `/assets/js/footer.js`
- Mount points: `<div id="cc-nav-mount"></div>` / `<div id="cc-footer-mount"></div>`

---

## Analytics

| Tool | ID / Tag |
|---|---|
| Google Analytics 4 | `G-XNBPGSZ1LZ` |
| Google AdSense | `ca-pub-8699915070570206` |
| Senese | **TODO — snippet not found in codebase. Add when provided.** |

---

## Open Graph / Social

- `og:type`: `article`
- `og:image`: `/assets/og-guardian.png`
- `og:image:width`: 1200
- `og:image:height`: 630
- `twitter:card`: `summary_large_image`

---

## Internal Links (outbound from this page)

- Compare hub: `/compare-ppo-dental-plans/`
- Dentist finder: `/find-my-dentist`
- Cost estimator: `/dental-treatment-cost-estimator`
- Glossary: `/dental-insurance-glossary/`
- All other plan pages (cross-linking complete)

## URL Change (Redirect Required)

Old URL: `https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/`  
New canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/guardian/premier-2-0/`

**Add a 301 redirect** in `vercel.json` or `_redirects`:
```json
{ "source": "/dental-insurance/ppo-plans/guardian-premier-ppo/", "destination": "/dental-insurance/ppo-plans/guardian/premier-2-0/", "permanent": true }
```

---

## Notes
Activate links to guardiandirect.com. URL changes from /guardian-premier-ppo/ to /guardian/premier-2-0/.
