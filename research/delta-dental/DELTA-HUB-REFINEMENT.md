# Delta Dental Premium Hub — Refinement Spec
**Page:** `/dental-insurance/ppo-plans/delta-dental/premium/index.html`
**Sibling plan page (canonical breakdown):** `/dental-insurance/ppo-plans/delta-dental/index.html`
**Updated:** June 2026 · Verified against Delta Dental / DentalPlans.com Premium plan documents

This hub exists to (1) showcase the *additional* Delta features the standard plan page does not have room for, (2) win GEO/AI-answer citations for Delta-specific questions, and (3) funnel to dentist verification + enrollment. Keep the existing visual style (serif display + jade accent, editorial pricecard). This is a refinement, not a reskin.

---

## 1. VERIFIED FACTS (single source of truth — every number on the hub must match)

From the official Delta Dental PPO Individual **Premium** plan documents and the DentalPlans.com Premium summary (updated 2026-05-07):

| Field | Verified value |
|---|---|
| Premium (individual) | ~**$75/mo** (published sample ~$73.11; ~$900/yr). Keep displayed as **~$75** to match the plan page. |
| Annual maximum | **$2,000 per person, per CALENDAR YEAR** (resets every January 1) |
| Deductible | **$50/person, $150/family, per calendar year**; waived for preventive |
| Preventive (D&P) | **100%, no waiting period** |
| Basic (fillings, emergency pain) | **80%**, **6-month wait** |
| Major (crowns, inlays/onlays, cast restorations) | **50%**, **12-month wait** |
| Endodontics (root canals) | 50%, 12-month wait |
| Periodontics (gum) | 50%, 12-month wait |
| Oral surgery (extractions) | 50%, 12-month wait |
| Prosthodontics (bridges, dentures, **implants**) | **50%**, 12-month wait |
| Orthodontics (adults + dependent children) | **50%**, **12-month wait**, **$1,500 lifetime max**, **separate $50 ortho deductible** |
| Waits waivable? | With proof of prior continuous coverage |
| Missing-tooth clause | None on Premium (per current page note; confirm by state, esp. CA) |
| Whitening / cosmetic | **State-specific** — DentalPlans lists Premium "cosmetic (whitening/night guard) 80%," but Delta's own policies vary by state. **Do NOT promise whitening sitewide.** Label it state-specific. |
| Effective date | Choose from set 1st/15th-of-month dates; **earliest effective ~9 days out** |
| Network | **112,000+ dentists at 278,000+ locations** (PPO + Premier). CONFIRMED correct — do not inflate. |
| Underwriter | Delta Dental Insurance Company / state Delta companies; sold in **16 states + DC** |
| Financial strength | AM Best **A (Excellent)** |

### ❌ Errors that were on the hub (now fixed in this pass, keep fixed in rebuild)
- Price said **$73** → must be **~$75** (consistency with plan page).
- Pricecard bullet + AI answer claimed **"6-month wait on basic, major & ortho"** → major and ortho are **12 months**. Fixed.
- AI-answer "facts" chip promised **"whitening covered: Yes"** → replaced with **"$1,500 ortho lifetime max"** (whitening is state-specific, not guaranteed).
- Placeholder graphite "mega nav" → replaced with the real `#cc-nav-mount` universal nav.
- Custom sub-nav had **For Dentists / List your office / Patient Portal** (dead `#` links) → removed.
- **"★ Earn 300 Capy Crowns when you activate"** → removed (no gamification in plan/insurance surfaces).
- Sub-nav sat **above** the breadcrumb → moved **below** it; made non-sticky so it doesn't fight the universal nav.
- No universal **footer** → `#cc-footer-mount` + loader added.

---

## 2. WHAT THE HUB SHOULD ADD THAT THE PLAN PAGE LACKS (the reason it exists)

The plan page already covers coverage %, waits, deductible, max, cost calculator, FAQ. The hub should NOT duplicate that table. The hub's job is the **extras + discovery + GEO surface**. Add these, each as its own scannable module:

### A. Delta member perks (verified — strong GEO + differentiation)
Delta individual members get value-add programs the plan page never mentions. Each is a citable "does Delta include X" answer:
- **SmileWay® Wellness Benefits** — for members with certain chronic conditions (e.g. diabetes, heart disease, pregnancy), **up to 4 cleanings/year covered at 100%** instead of the usual 2. Big for over-65 / chronic-condition intent.
- **LASIK via QualSight** — up to **35% off** the national average LASIK price, 800+ locations, free consult. (Discount access, NOT insurance — label clearly.)
- **Hearing via Amplifon** — average **66% off** retail hearing-aid pricing, 6,000+ providers, complimentary follow-up. (Discount access, not insurance.)
- **Teledentistry** — virtual checkups / photo triage from a dentist.
- **LifePerks** — member discounts on fitness, groceries, travel, pet insurance, etc.
> Rule: these are "savings programs," not insured benefits. Anti-AI/medical rules apply — no guarantees, label "discount, not insurance."

### B. "When does each benefit start paying?" timeline (signature interaction)
The plan's real hook is *timing the waits*. Build an interactive **waiting-period timeline / Gantt** (Day 1 preventive → month 6 basic → month 12 major/implants/ortho), with a **"prior coverage waives the wait"** toggle that collapses the bars to Day 1. This is the hub's signature dopamine moment and directly mirrors the verified data.

### C. Adult orthodontics explainer (Delta's rarest individual feature)
Adult + child ortho at 50%, $1,500 lifetime, separate $50 deductible, 12-mo wait (waivable). Invisalign treated same as braces. This is the single highest-intent Delta differentiator — give it a dedicated answer block + link to `/benefit-maxing/guides/braces-invisalign/`.

### D. Network / "find a PPO dentist" module
112,000+ / 278,000+ is real and large. Pair with the dentist search (`#dentists`) and verification flow already on the page. Clarify **PPO vs Premier** tiers (you pay least at a PPO-contracted dentist; Premier is broader access at a different reimbursement tier).

### E. Calendar-year + activation clarity
State plainly: **calendar-year plan, max resets Jan 1**, and **coverage can start ~9 days out** via set 1st/15th effective dates. (This is a real differentiator vs anniversary-year plans and worth a small module.)

---

## 3. GEO / SEO ARCHITECTURE (this is half the point of the hub)

### Schema (JSON-LD @graph) — the hub currently has minimal/none; add:
- `MedicalWebPage` or `WebPage` with `lastReviewed: 2026-06-24`, `reviewedBy`.
- `FAQPage` — every visible Q must have a verbatim-matching schema answer (parity test). Seed questions (all real Delta search intent):
  - "Does Delta Dental PPO Premium cover Invisalign for adults?"
  - "How long is the waiting period on Delta Dental PPO Premium?"
  - "Does Delta Dental cover implants?"
  - "Is Delta Dental a calendar-year or plan-year deductible?"
  - "How fast can Delta Dental coverage start?"
  - "Does Delta Dental include LASIK or hearing benefits?"
  - "How many dentists are in the Delta Dental PPO network?"
  - "Does Delta Dental PPO Premium have a missing-tooth clause?"
- `BreadcrumbList` — Home → Dental Insurance → PPO Plans → Delta Dental → Premium (now wired with real hrefs).
- `Product`/`Offer` optional: name "Delta Dental PPO Individual Premium," price ~75 USD/mo, but mark clearly illustrative.
- `speakable` selectors on the AI-answer block + H1.

### Answer-first blocks
Lead each section with a 1–2 sentence direct answer (the existing AI-answer card is the right pattern — replicate it per module so each is independently citable).

### Interlinking (the "link them back to one another" requirement)
- Hub → plan page: breadcrumb "Delta Dental" + sub-nav "Plan breakdown" (done). Also add an inline "see the full coverage breakdown" link in the hero/answer area.
- Plan page → hub: added an inline link in the overview ("see the Delta Dental Premium hub"). Consider also a rail/treatment-card entry.
- Hub → cluster: `/delta-dental/compare/`, `/delta-dental/over-65/` (both exist), plus `/benefit-maxing/guides/braces-invisalign/`, `/best-dental-insurance-for-implants/`, `/dental-and-vision-insurance/`.
- Hub → emergency hub for "Delta emergency / pain" intent: `/benefit-maxing/guides/dental-emergencies/`.

### Meta
- Title: keep Delta + Premium + adult ortho + cost intent. Current title is good; ensure ~$75 not $73 if price appears.
- `news_keywords`, `article:tag`, keyword meta tuned to: delta dental ppo premium, adult orthodontics dental insurance, delta dental implants, delta dental waiting period, delta dental calendar year, delta dental network size.

---

## 4. UX REFINEMENTS (keep the style, sharpen the execution)
- **Consistency pass:** every price token = ~$75; every wait = 6mo basic / 12mo major-implant-ortho; every max = $2,000 calendar-year. One typo breaks GEO trust.
- **Sub-nav:** now below breadcrumb + non-sticky. Consider collapsing to a horizontal scroll on mobile rather than hiding (`.sn-links` currently `display:none` under 1040px — give mobile a scrollable cluster nav instead so the Delta cluster stays discoverable).
- **Pricecard:** keep Individual/Family toggle; ensure Family number is labeled clearly as illustrative. Add a one-line "calendar-year, resets Jan 1" under the max bullet.
- **Member-perks module:** card grid with an icon per perk + the "discount, not insurance" footnote.
- **Waiting-period timeline:** the signature interactive (see 2B). Reduced-motion fallback = static labeled bars.
- **Whitening:** remove any unconditional "whitening covered" claim; if shown, label "state-specific."
- **CTAs:** "Enroll on Delta Dental" (out) + "Find & verify my dentist" (in). No Capy Crowns, no countdowns, no invented urgency.
- **Trust:** add a visible "Last checked June 24, 2026" + a short sources line (Delta plan docs). No "in plain English"-style filler.

---

## 5. ANTI-AI / COPY RULES (binding — same as the emergency cluster)
- No arrows (→), no em-dashes as separators, never the word "chair," no banned marketing words.
- Estimates labeled as estimates; never "guaranteed savings."
- Member perks = "savings programs, not insurance."
- Medical content educational, not a diagnosis; emergencies → dentist/ER.
- CTAs: sentence case, verb + object, 2–5 words.

---

## 6. BUILD ORDER (for the master prompt)
1. Lock the verified-facts table (Section 1) into the page; run a consistency grep.
2. Add schema @graph (FAQPage parity, Breadcrumb, WebPage, speakable).
3. Build the 5 "extras" modules (Section 2 A–E), answer-first.
4. Build the signature waiting-period timeline interaction.
5. Wire all interlinks (Section 3).
6. Validate: JSON-LD parses, JS `node --check`, FAQ visible==schema count, no arrows/em-dashes/banned words, every price=~$75, every wait correct.
