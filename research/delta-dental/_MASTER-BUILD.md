# Delta Dental Cluster — Master Build Index
**Updated:** June 2026 · CoverCapy concierge PPO dental
**Goal:** Turn the Delta Dental section into a full GEO-strong cluster (like the Dental Emergency Center), anchored by the Premium hub, with the plan page, compare, over-65, and find-a-dentist all consistent and interlinked.

This index ties the 10 research briefs to the pages that consume them. Build pages from the briefs; do not invent facts.

---

## RESEARCH BRIEFS (read these first)
1. `company-networks.md` — Delta association (39 companies), PPO vs Premier vs DeltaCare USA, 112,000+/278,000+ PPO network, balance-billing, AM Best.
2. `individual-ppo-plans.md` — Premium vs Basic exact benefits, ~$73-75/mo, $2,000 calendar-year max, waits, $1,500 ortho + $50 ortho deductible, 16 states + DC. Source conflicts flagged.
3. `member-perks-extras.md` — SmileWay (only true insured perk: up to 4 cleanings/yr for listed chronic conditions, opt-in), QualSight LASIK, Amplifon hearing, teledentistry, LifePerks. All "savings, not insurance."
4. `medicare-over65-scan-medical.md` — SCAN (DeltaCare USA base + PPO buy-up; Delta serves S.CA/WA, DentaQuest serves AZ/NV/NM/TX), Medi-Cal/Denti-Cal is separate and non-transferable.
5. `vs-competitors.md` — Delta vs UHC/Guardian/Ameritas/Humana/Cigna/NCD; spec table + per-matchup verdicts. Delta wins network + adult ortho; loses on waits vs day-one carriers.
6. `ortho-invisalign.md` — Adult+child ortho 50%, $1,500 lifetime is the binding cap (Invisalign ~$3-8k cash), banding + installment payouts, Invisalign = braces.
7. `implants-major.md` — Implants/major 50%, 12-mo wait, $2,000 max is the real limiter (a $5k implant nets ~$2k/yr), alternate-benefit/LEAT downgrades, frequency limits.
8. `geo-faq-keywords.md` — 40 real questions by intent, keyword clusters per page, ready FAQPage sets (10 hub / 8 compare / 9 over-65), competitor gaps.
9. `claims-dentist-process.md` — PPO vs Premier billing, confirm the EXACT PPO product, pre-treatment estimates, claims/MCA reimbursement, effective dates, portal/app.
10. `exclusions-frequencies-state-variation.md` — Frequencies, replacement intervals, missing-tooth by state, and the BIG conflict: CA Certificate excludes whitening/veneers/implants and uses a 6-month major wait. State variation is real.

---

## ⚠️ CROSS-CUTTING TRUTHS (every page must obey)
- **Premium price = ~$75/mo** (published sample ~$73.11). Never $73 alone in display.
- **Annual max $2,000, CALENDAR YEAR, resets Jan 1.** Deductible $50/$150 calendar year.
- **Waits (national/typical): basic ~6 mo; major, implants, ortho ~12 mo**, waivable with prior coverage. BUT **state variation is real** — CA uses ~6 mo on major and **excludes implants and whitening**. So: state the typical figures, then always **"varies by state, verify before enrolling."** Never present implants or whitening as guaranteed nationwide.
- **Ortho:** adults + children, 50%, **$1,500 lifetime**, separate **$50 ortho deductible**, 12-mo waivable wait. $1,500 cap is the binding limit, not the coinsurance.
- **Network:** 112,000+ dentists / 278,000+ locations (PPO + Premier). Confirm a dentist is contracted for the **exact PPO product**, not just "Delta."
- **Perks = savings programs, not insurance.** Only SmileWay extra cleanings is an insured benefit, and it is conditional/opt-in.
- **No gamification on insurance surfaces** (no Capy Crowns; Capy Diamonds nomination is allowed as the referral engine but keep it tasteful).
- **Anti-AI rules:** the existing hub style uses em-dashes; a full anti-AI pass should remove em-dash separators and arrows, never "chair," no banned words, estimates labeled.

---

## PAGE MAP & WHAT EACH SHOULD CONTAIN

### A. Plan breakdown — `/dental-insurance/ppo-plans/delta-dental/` (canonical spec)
Already corrected to ~$75, calendar-year, ~9-day activation, ortho $1,500, 12-mo major. **Add:** a new "Explore the Delta hub" section linking to premium hub, compare, over-65, find-a-dentist, member perks. (DONE in this pass — keep it.)

### B. Premium hub — `/dental-insurance/ppo-plans/delta-dental/premium/` (showcase + GEO)
The marquee. Keep editorial style. Modules: AI-answer, benefits, waiting-period timeline (signature), member perks, find/verify dentist tabs, over-65 teaser, compare teaser, FAQ (schema parity), fine print. Briefs 02/03/06/07/08/10. Add deeper interlinks to all cluster pages and the treatment guides.

### C. Compare — `/dental-insurance/ppo-plans/delta-dental/compare/` ("Is Delta good insurance?")
Decision-desk: Delta vs each carrier. Brief 05 + 08. **Fix:** universal nav/footer, cleaned left sub-nav, remove Capy Crowns, correct waits (6/12 not 6/6), FAQ schema. Pull the spec table + verdicts from brief 05.

### D. Over-65 — `/dental-insurance/ppo-plans/delta-dental/over-65/` (SCAN/Medicare)
Brief 04. **Fix:** universal nav/footer, cleaned left sub-nav. Clarify SCAN (DeltaCare USA base + PPO buy-up; Delta vs DentaQuest by state), Medi-Cal/Denti-Cal separate. FAQ schema (9 Qs from brief 08).

### E. Find PPO dentists — (the `#dentists` module / future page)
Brief 09. Confirm exact PPO product, pre-treatment estimates, verify-before-book CTA.

---

## SHARED NAV / STRUCTURE FIX (apply to hub, compare, over-65 identically)
1. Replace the placeholder graphite "YOUR MEGA NAV" with `<div id="cc-nav-mount"></div>` + the 3 mega-nav CSS links + the universal component loader (and `#cc-footer-mount`, removing any custom prototype `<footer>`).
2. Breadcrumb in a white `.crumb` bar styled like the plan page, ABOVE the sub-nav.
3. Delta cluster sub-nav: **remove the "CoverCapy | Delta PPO" brand block and the right-side "List your office / Patient Portal"**; **left-align** the links: Plan breakdown · Premium hub · Compare · Find PPO dentists · Over 65. Non-sticky.
4. Remove all "Capy Crowns" references; keep Diamonds nomination tasteful.
5. Correct every wait to 6 mo basic / 12 mo major+implants+ortho (typical) with "varies by state."

---

## BUILD ORDER
1. Structural nav/footer/sub-nav fix on hub + compare + over-65 (consistency first).
2. Fact pass: waits, calendar-year, ortho $1,500, perks-not-insurance, state caveats (esp. CA implants/whitening).
3. Schema per page (FAQPage parity, Breadcrumb, WebPage, speakable) from brief 08 sets.
4. Add the member-perks + signature waiting-period timeline on the hub.
5. Interlink everything both directions; add the "Explore the Delta hub" section on the plan page.
6. Validate: JSON-LD parse, JS node --check, FAQ parity, no arrows, every price ~$75, every wait 6/12, all internal links resolve.

## VALIDATION HARNESS (run per page)
- `python3` JSON-LD parse on every ld+json block.
- `node --check` on concatenated inline scripts.
- FAQ visible count == schema Question count, text matches.
- grep: no `$73`/`$877`, no "Capy Crowns", no "wait about 6 months" on major/ortho, no `→`/`➜`.
- All `href` internal targets exist on disk.
