# Mutual of Omaha Dental Preferred — Page Spec

**File:** `/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/index.html`  
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/`  
**Activate URL:** [https://www.mutualofomaha.com/dental-insurance](https://www.mutualofomaha.com/dental-insurance)  
**OG Image:** `/assets/og-moo.png`  
**Last updated:** June 2026

---

## SEO

| Field | Value |
|---|---|
| Title tag | `Mutual of Omaha Dental Preferred Review 2026 | CoverCapy` |
| Meta description | `Independent review of Mutual of Omaha Dental Preferred: day-one major coverage at 20%, $5,000 max, no implant cap. Best single-implant payout in year two.` |
| Title length | 56 chars |
| Desc length | 154 chars |

### Primary Keywords
- `mutual of omaha dental preferred review`
- `mutual of omaha dental ppo`
- `mutual of omaha implant coverage`

---

## Plan Summary

### Best for
Implant patients who want highest possible single-year payout, no cap restrictions

### Not for
Orthodontics, patients needing major coverage within 90 days at full rate

### Key differentiators
- Major + implants from Day 1 (20%)
- $5,000 annual max
- No implant-specific cap
- 50% by year two

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
| Activate with Mutual ↗ | Activate banner (hero area) | `https://www.mutualofomaha.com/dental-insurance` |
| Activate with Mutual ↗ | Spec sheet sidebar | `https://www.mutualofomaha.com/dental-insurance` |
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
- `og:image`: `/assets/og-moo.png`
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

Old URL: `https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/`  
New canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/`

**Add a 301 redirect** in `vercel.json` or `_redirects`:
```json
{ "source": "/dental-insurance/ppo-plans/mutual-of-omaha-dental/", "destination": "/dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/", "permanent": true }
```

---

## Notes
No implant cap is key differentiator vs Humana. Activate links to mutualofomaha.com. Underwritten by TruAssure/Companion Life.
