# Inside Delta Dental — Master Build (Authority Hub)
**Goal:** Turn `/dental-insurance/ppo-plans/delta-dental/` into "Inside Delta Dental," the most authoritative Delta resource on the web, so it ranks in SEO and gets cited by AI (authority like DentalPlans.com). Built from the 10 research briefs in this folder.
**Last reviewed:** June 2026 · Reviewed by J Song, Dental Billing Specialist (use the same editorial byline pattern as benefit-maxing and the emergency hub).

---

## RESEARCH BRIEFS (this folder, all cited, each with a "Last reviewed" line)
1. `largest-authority.md` — Delta is #1: ~85M members (78-89M range), 39 companies + DDPA, PPO 112,000 dentists / 278,000 locations, all 50 states + territories, AM Best A. (S&P unverified.)
2. `individual-premium-vs-basic.md` — Premium (~$75, $2,000 cal-yr, ortho/implants) vs Basic (~$33, $1,000, preventive 100% + basic 50%, NO major/ortho/implants). The toggle.
3. `dentist-contracting-credentialing.md` — PPO vs Premier participation, CAQH credentialing (60-90 days, ~3-yr recred), MAC fee schedules, no balance billing, step-by-step join tutorial, Provider Tools.
4. `payer-ids-claims-directory.md` — company-by-state, payer IDs (94276, CDCA1, CDOR1, DDPMI, etc.), claims addresses, provider phones. Verify on the ID card; flag changes.
5. `eligibility-portals-by-state.md` — member + provider portals across the federation (DDINS Provider Tools vs Dental Office Toolkit), national vs state sites, "Which Delta am I?" routing, 3-step how-tos.
6. `deltacare-hmo-vs-ppo-premier.md` — DeltaCare USA (DHMO: copays, assigned dentist, no OON, no max) vs PPO vs Premier; dual network; HMO→PPO upgrade paths.
7. `medicare-over65-scan.md` — Original Medicare excludes dental → MA plans like SCAN provide Delta dental; SCAN = Delta CA/WA, DentaQuest AZ/NV/NM/TX; DeltaCare base + PPO buy-up; Delta no longer administers Denti-Cal (since May 2024).
8. `university-ucship.md` — UC SHIP = Delta PPO, included unless waived, ~$1,000 max (UCLA $1,200 26-27); why UC/peers pick Delta; verified peers (USC, Iowa, Johns Hopkins, Minnesota, etc.); graduation gap.
9. `employer-group-plans.md` — group PPO/Premier/DHMO; rich plan = $5,000 max + ortho; ~$62.75/ee/mo PPO benchmark (estimate), 70-80% employer split; verified: UC employees + FEDVIP. **Anduril UNVERIFIED — do not state as fact.**
10. `trust-ratings-reviews.md` — AM Best A/A-; S&P does not publicly rate; **Money named Delta "Best for Braces," NOT best overall**; Forbes recognition is an employer award; Trustpilot ~1.9, BBB low service scores vary by company; balanced 3/5 verdict.

---

## ⚠️ HONESTY GUARDRAILS (every page must obey)
- "Largest" claims are true for network/members; label member count a range (~78-89M).
- **Anduril and other specific employers: UNVERIFIED.** Do not claim a company offers Delta unless a brief verified it (UC employees, FEDVIP are verified).
- Money = "Best for Braces" only; do not imply "best dental insurance overall."
- S&P rating: not publicly confirmed; cite AM Best only.
- Premium implants/whitening and waits VARY BY STATE (CA certificate excludes implants + whitening, uses 6-mo major wait). Always "typical, varies by state, verify."
- Payer IDs / portals / phone numbers change: label "verify on the current ID card / clearinghouse," show a last-reviewed date.
- Perks (LASIK, hearing) are savings programs, not insurance.
- Reviews are mixed: present strengths AND the waiting-period / service-variance gripes honestly (builds E-E-A-T).

---

## INFORMATION ARCHITECTURE (the restructure)
`/delta-dental/` = **Inside Delta Dental** (the true hub; replaces "the premium plan is the hub" idea).
Headline: "Inside Delta Dental" + a sub-line on why it is the largest and how CoverCapy positions you.

Sub-pages live under the hub. Proposed paths (keep existing live pages; add new):
- `/delta-dental/` — Inside hub (overview + the 10 pillars as scannable cards, each linking deeper).
- `/delta-dental/premium/` — Premium plan (existing).
- `/delta-dental/compare/` — Compare (existing).
- `/delta-dental/over-65/` — Medicare/SCAN (existing; enrich from brief 07).
- `/delta-dental/uc-students/` + `/students/{campus}/` — UC SHIP (existing live, generated).
- `/delta-dental/uc-dental-access/` — campus access study (existing live).
- NEW `/delta-dental/inside/individual-plans/` — Premium vs Basic toggle deep-dive (brief 02).
- NEW `/delta-dental/inside/networks/` — DeltaCare USA vs PPO vs Premier (brief 06).
- NEW `/delta-dental/inside/for-dentists/` — contracting/credentialing tutorial (brief 03).
- NEW `/delta-dental/inside/eligibility/` — portals + payer IDs + how to verify (briefs 04, 05).
- NEW `/delta-dental/inside/for-employers/` — group plans, $5,000 + ortho, cost (brief 09).
- NEW `/delta-dental/inside/is-delta-good/` — trust/ratings/reviews (brief 10).

(Confirm the exact `/inside/...` nesting with the user; the user suggested `/delta-dental/inside/ucship/campuses` style. Keep the already-indexed `/students/` URLs to preserve SEO; add `/inside/` for the new editorial sections.)

---

## THE HUB PAGE (`/delta-dental/`) — build spec
- **Universal mega nav + footer** on this and ALL cluster/generated pages (consistency; the generated `/students/` pages need the universal nav too via the generator).
- **Humana-style mega dropdown** for the Delta cluster nav: a left-aligned bar ("Inside Delta Dental") that opens a panel with grouped links (Plans, Networks, Members, Seniors, Students, Employers, Dentists, Eligibility). Mirror the Humana pattern in the screenshot. Reduced-motion friendly, keyboard accessible.
- **Headline:** "Inside Delta Dental" + "the largest dental network in the US, and how to actually use it."
- **Sticky rail pricecard with a Premium/Basic toggle:**
  - Toggle 1: **Premium** — ~$75/mo, $2,000 max, adult ortho + implants at 50%.
  - Toggle 2: **Basic** — ~$33/mo, $1,000 max, preventive 100% + basic 50%, no major/ortho (save on monthly cost).
  - Individual/Family sub-toggle stays. CTA "Enroll on Delta Dental" + "Find & verify my dentist." Mark illustrative.
- **Pillar cards** (from the 10 briefs): Individual plans · Networks (HMO/PPO/Premier) · Seniors & Medicare · UC students · Employers · For dentists · Eligibility & payer IDs · Is Delta good · Member perks · Network rates.
- **Editorial byline:** "Written by CoverCapy Editorial Team · Reviewed for billing and coverage accuracy by J Song, Dental Billing Specialist · Last reviewed June 2026 · Editorial standards." Use the benefit-maxing/emergency-hub component.
- **Schema:** WebPage(lastReviewed/reviewedBy=J Song) + BreadcrumbList + FAQPage (parity) + Organization + speakable. Per-pillar pages get their own FAQPage from the briefs.
- **Citations:** visible "Sources & last reviewed" block linking the official Delta sources used (deltadental.com, deltadentalins.com, AM Best, etc.).
- **Style:** Graphite & Jade tokens; add the jade hero band already on the premium hub for the "stands out" look.

---

## BUILD ORDER
1. Lock honesty guardrails + verified facts.
2. Universal mega nav + footer on every Delta page (and the generator for `/students/`).
3. Build the Humana-style left dropdown cluster nav (shared partial).
4. Rebuild `/delta-dental/` as the Inside hub: headline, jade band, pillar cards, sticky Premium/Basic toggle rail, J Song byline, sources, schema.
5. Build the 6 new `/inside/...` sub-pages from briefs 02/03/04+05/06/09/10, each answer-first with FAQPage + citations + last reviewed.
6. Interlink everything; add all to the sitemap.
7. Validate: JSON-LD parse, JS node --check, FAQ parity, no arrows/em-dashes/banned words, every price (~$75 Premium / ~$33 Basic), every wait (6/12 typical, "varies by state"), all links resolve, Anduril/S&P/Money claims compliant with guardrails.

## VALIDATION HARNESS (per page)
- JSON-LD parses; JS `node --check`; FAQ visible==schema; grep no `→`/`—`/banned; prices and waits correct; links resolve; "Last reviewed June 2026" + J Song present.
