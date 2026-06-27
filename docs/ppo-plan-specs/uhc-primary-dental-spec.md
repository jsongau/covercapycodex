# UHC Primary Dental — Page Spec

**File:** `/dental-insurance/ppo-plans/uhc/primary-dental/index.html`  
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans/uhc/primary-dental/`  
**Activate URL:** [https://www.uhcdental.com/](https://www.uhcdental.com/)  
**OG Image:** `/assets/og-uhc.png`  
**Last updated:** June 2026

---

## SEO

| Field | Value |
|---|---|
| Title tag | `UHC Primary Dental Review 2026 | CoverCapy` |
| Meta description | `Independent review of UHC Primary Dental: ~$30/month, preventive and basic only, $1,000 max. The budget plan for cleanings and fillings.` |
| Title length | 42 chars |
| Desc length | 136 chars |

### Primary Keywords
- `uhc primary dental review`
- `unitedhealthcare dental ppo cheap`
- `uhc dental $30 month`

---

## Plan Summary

### Best for
Budget-conscious patients who mainly need cleanings and fillings, gap coverage

### Not for
Anyone expecting crowns, implants, or major work — no coverage

### Key differentiators
- ~$30/month lowest premium
- $1,000 annual max
- Preventive + basic only
- No major or implant coverage

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
| Activate with UHC ↗ | Activate banner (hero area) | `https://www.uhcdental.com/` |
| Activate with UHC ↗ | Spec sheet sidebar | `https://www.uhcdental.com/` |
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
- `og:image`: `/assets/og-uhc.png`
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

Old URL: `https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/`  
New canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/uhc/primary-dental/`

**Add a 301 redirect** in `vercel.json` or `_redirects`:
```json
{ "source": "/dental-insurance/ppo-plans/uhc-primary-dental/", "destination": "/dental-insurance/ppo-plans/uhc/primary-dental/", "permanent": true }
```

---

## Notes
Activate links to uhcdental.com. Explicitly not for major work — page should be clear about this. URL changes from /uhc-primary-dental/ to /uhc/primary-dental/.
