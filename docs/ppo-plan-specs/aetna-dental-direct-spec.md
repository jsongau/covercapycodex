# Aetna Dental Direct — Page Spec

**File:** `/dental-insurance/ppo-plans/aetna/dental-direct/index.html`  
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans/aetna/dental-direct/`  
**Activate URL:** [https://www.aetna.com/individuals-families/buy-dental-insurance.html](https://www.aetna.com/individuals-families/buy-dental-insurance.html)  
**OG Image:** `/assets/og-aetna.png`  
**Last updated:** June 2026

---

## SEO

| Field | Value |
|---|---|
| Title tag | `Aetna Dental Direct Review 2026 | CoverCapy` |
| Meta description | `Independent review of Aetna Dental Direct: prior-coverage waiver can erase the major waiting period. Ideal for fast crown or bridge coverage.` |
| Title length | 43 chars |
| Desc length | 141 chars |

### Primary Keywords
- `aetna dental direct review`
- `aetna dental direct waiting period waiver`
- `aetna ppo dental`

---

## Plan Summary

### Best for
Patients with prior dental coverage who can waive the wait

### Not for
Implants (not covered on this tier), orthodontics

### Key differentiators
- Prior coverage waiver available
- 50% major after waiver (can be day 1)
- Balanced preventive + basic

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
| Activate with Aetna ↗ | Activate banner (hero area) | `https://www.aetna.com/individuals-families/buy-dental-insurance.html` |
| Activate with Aetna ↗ | Spec sheet sidebar | `https://www.aetna.com/individuals-families/buy-dental-insurance.html` |
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
- `og:image`: `/assets/og-aetna.png`
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

Old URL: `https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/`  
New canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/aetna/dental-direct/`

**Add a 301 redirect** in `vercel.json` or `_redirects`:
```json
{ "source": "/dental-insurance/ppo-plans/aetna-dental-direct/", "destination": "/dental-insurance/ppo-plans/aetna/dental-direct/", "permanent": true }
```

---

## Notes
Key differentiator: waiver. Activate button links to aetna.com buy page. Emphasize waiver eligibility check CTA.
