# 01 — Research: Platinum Elite Dentists (top membership tier sales page)

Audience: dentists (practice owners / decision makers).
Page slug: `platinum-elite-dentists` → built at repo root as `platinum-elite-dentists.html`.
This page is a MONETIZATION / sales page for the highest CoverCapy membership tier.

---

## A. INTERNAL PRODUCT TRUTH (source: CLAUDE.md + existing CoverCapy pages)

These are the load-bearing facts. They come from the CoverCapy product itself, NOT the web,
and must be stated exactly. Do not invent benefits beyond these; articulate them persuasively only.

### Membership tiers (CLAUDE.md "MEMBERSHIP TIERS")
| Tier | Price | Search Radius |
|------|-------|---------------|
| free | $0 | 8 miles |
| capy_accredited | ~$285/mo (founder rate) | 10 miles |
| platinum_elite | $1,499/mo | 18 miles |

- Ranking tiebreaker: Capy Crowns score.
- Valid `membership_tier` values in Supabase: `free`, `capy_accredited`, `platinum_elite`.

### Platinum Elite specifics (CLAUDE.md + capy-accreditation.html "Platinum Elite" section)
- Platinum Elite = the **highest and most selective level** of Capy Accreditation.
- **County-limited / market-limited:** "may be limited by geography, local market density, and current
  member availability. Not every market will have an open place at a given time." Selection considers
  technology readiness, patient trust, service capability, market participation, and existing Platinum presence.
- **Eligibility gate:** an office must already be **Capy Accredited** to progress toward Platinum Elite
  (capy-accreditation.html ranking ladder: tier 3 Capy Accredited → tier 4 Platinum Elite; eligibility
  line "Eligibility to progress toward Platinum Elite").
- **Reviewed and limited, not available by payment alone.** "Offices are assessed for capability,
  patient experience, and the infrastructure to deliver premium programs well."
- **iTero is required without exception** at the Platinum level (standard accreditation only prefers it).
- Hard / preferred capability markers for Platinum (from capy-accreditation.html `.plat-reqs`):
  iTero scanning (required); advanced diagnostics, CBCT strongly preferred; same day crown tech preferred;
  in office crown milling preferred; Invisalign / clear aligner; cosmetic dentistry & veneers; implants &
  full mouth rehab; TMJ & therapeutic Botox; digital smile planning; verified patient testimonials may be
  requested; chair time & staffing for promotions; in house whitening & retainer workflows; ability to
  participate in structured CoverCapy programs.

### Benefits of the tier (derived from product truth, stated persuasively but truthfully)
- **18-mile search radius** vs 10 (Capy Accredited) vs 8 (free). The widest discovery reach in the platform,
  so a Platinum office appears to patients across the broadest area.
- **Top of the CoverCapy hierarchy** → strongest, clearly labeled placement in CoverCapy search
  (tier 4, "Premium visibility eligible", crown marker in the search mock).
- **Premium positioning / black-card profile** at the top of the directory.
- **Eligibility for structured CoverCapy programs** (promotions, featured campaigns).
- More exposure to **benefit-ready, coverage-aware PPO patient traffic** at the moment they are choosing a practice.

### Honesty guardrails (carried from capy-accreditation.html disclosure + CLAUDE.md tone)
- CoverCapy does NOT promise a specific ranking position, a number of patients, or new revenue.
  Placement is influenced by status, profile completeness, local availability, patient trust indicators, and participation.
- Platinum Elite is reviewed; payment alone does not activate it.
- Capy Accreditation (and Platinum Elite) is a private CoverCapy credential, not a government certification
  or a dental board license, and does not replace either. Not a guarantee of clinical outcomes.

### Image assets available (may reference)
- `assets/images/platinum-elite-nobg.png` (transparent)
- `assets/images/platinum.png`

### CTA targets (from brief + repo)
- `/dentist-portal.html` (primary portal entry)
- `/capy-practice-membership.html` (membership / claim profile, canonical `capy-practice-membership.html`)
- Cross-links: `/capy-accreditation.html`, `/capy-accredited-dentists.html`

---

## B. EXTERNAL / MARKET CONTEXT (light web research)

Used only to frame the positioning. No CoverCapy product number comes from these.

1. **One-practice-per-area exclusivity is a recognized premium dental-marketing model in 2026.**
   PMAX Dental Marketing positions itself around "exclusive partnerships, working with only one dentist
   per area" for ambitious practices.
   Source: https://www.pmaxdentalmarketing.com/ — accessed 2026-06-26.

2. **Recurring-revenue / premium membership positioning is valued by practices in 2026.**
   Industry coverage frames practice membership and recurring relationships as a growth and valuation lever.
   Source: https://boomcloudapps.com/dental-membership-plan-for-practice-owners/ — accessed 2026-06-26.
   Source (2026 multi-location growth/dominance framing): https://dentalmarketingguy.co/blog/multi-location-dental-practice-marketing-strategy-2026/ — accessed 2026-06-26.

3. **Most large PPO directories let patients search by ZIP but do NOT offer single-provider exclusivity.**
   Delta Dental, Guardian, DentaQuest, BCBS FEP Dental directories are ZIP-search but non-exclusive,
   which is the contrast CoverCapy's county-limited Platinum tier leans on.
   Sources: https://www.deltadental.com/member/find-a-dentist/ ,
   https://dentalexchange.guardiandirect.com/find-a-dentist ,
   https://www.dentaquest.com/en/find-a-dentist — all accessed 2026-06-26.

**Takeaway for the page:** county-level scarcity + top-of-directory placement + the widest 18-mile reach is a
defensible, differentiated premium angle. The page should sell scarcity and prestige truthfully, never promise
patient counts or revenue.
