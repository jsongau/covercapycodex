# Delta Dental PPO Premium — Page Spec

**File:** `/dental-insurance/ppo-plans/delta/ppo-premium/index.html`  
**Canonical:** `https://www.covercapy.com/dental-insurance/ppo-plans/delta/ppo-premium/`  
**Activate URL:** [https://www.deltadental.com/us/en/individual/find-a-plan.html](https://www.deltadental.com/us/en/individual/find-a-plan.html)  
**OG Image:** `/assets/og-delta.png`  
**Last updated:** June 2026

---

## SEO

| Field | Value |
|---|---|
| Title tag | `Delta Dental PPO Premium Review 2026 | CoverCapy` |
| Meta description | `Independent review of Delta Dental PPO Premium: largest PPO network, adult orthodontics, $2,000 max. Best for keeping your dentist or family braces.` |
| Title length | 48 chars |
| Desc length | 148 chars |

### Primary Keywords
- `delta dental ppo premium review`
- `delta dental individual plan`
- `delta dental adult braces`

---

## Plan Summary

### Best for
Patients who want to keep their current dentist, adult orthodontics, families

### Not for
High-cost major work (low max), implants as primary goal

### Key differentiators
- Largest PPO network in the US
- Adult + child orthodontics
- $2,000 annual max
- Widest dentist acceptance

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
| Activate with Delta ↗ | Activate banner (hero area) | `https://www.deltadental.com/us/en/individual/find-a-plan.html` |
| Activate with Delta ↗ | Spec sheet sidebar | `https://www.deltadental.com/us/en/individual/find-a-plan.html` |
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
- `og:image`: `/assets/og-delta.png`
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

Old URL: `https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/`  
New canonical: `https://www.covercapy.com/dental-insurance/ppo-plans/delta/ppo-premium/`

**Add a 301 redirect** in `vercel.json` or `_redirects`:
```json
{ "source": "/dental-insurance/ppo-plans/delta-dental/", "destination": "/dental-insurance/ppo-plans/delta/ppo-premium/", "permanent": true }
```

---

## Notes
Used delta-ppo-premium-healthcare.html (more complete, 866 lines). Activate links to deltadental.com find-a-plan. Note URL change from /delta-dental/ to /delta/ppo-premium/.
