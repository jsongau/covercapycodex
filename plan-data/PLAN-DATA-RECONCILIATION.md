# PPO Plan Data — Reconciliation & Source of Truth

> Updated June 24, 2026. This is now the **single source of truth** for plan data. The 8 per-plan
> research briefs (`plan-data/*.md`) were deleted because they carried conflicting/wrong numbers;
> author every number here, then render it everywhere. **Every surface (compare hub, the 8 spoke
> pages) must match the values here.** Confidence tags: `verified` / `state-specific` / `needs-doc`.

## How to read confidence
- **verified** — corroborated across multiple authoritative sources; safe to state plainly.
- **state-specific** — real but varies by state/tier; present a range + "varies by state, we verify before you enrol." Never a single hard number.
- **needs-doc** — secondary sources disagree; confirm against the official plan SOB/product guide before asserting.

---

## Resolved conflicts (applied to live compare page + `.md` June 2026)

| Plan · fact | Was | Now (canonical) | Confidence | Why |
|---|---|---|---|---|
| **Mutual of Omaha — premium** | $90/mo | **~$57/mo** ($5,000 tier; from ~$40/mo base) | verified | Base ~$40; FL $5,000 tier ~$56.38; cheaper than Humana's $5,000 |
| **Mutual of Omaha — major** | 50%, 6-mo wait | **20% Y1 → 50% Y2, no hard wait** | verified | Day-1 major access (reduced benefit Y1) is MoO's headline; matches the brief |
| **Mutual of Omaha — implant** | 50%, 12-mo wait | **20% Y1 → 50% Y2; separate LIFETIME implant max ~$3,000 (Preferred) / ~$2,000 (Protection)** | verified (DNT2 policy docs + Seniorsmutual/Quotefinder reviews) | Treated as Major BUT capped by a lifetime implant maximum (~$3,000 Preferred), which does NOT reset annually — page previously wrongly said "no separate implant cap, draws on full $5,000 annual max." Some state docs list a 6–12 mo implant wait. Confirm by state. |
| **UHC — deductible** | $100 (`.md`) | **$50 / person ($150 family)** | verified | Golden Rule / UnitedHealthOne plan docs; the `.md`'s $100 was wrong |
| **Delta — whitening** | 80% (`.md`) / none (page) | **state-specific, ~25–50% w/ 6-mo wait, ages 16+; not in every state** | state-specific | Neither 80% nor "none"; varies by state. Note: DentalPlans.com summary lists Premium "cosmetic (whitening/night guard) 80%" but Delta's own policies vary by state — keep state-specific. |
| **Delta PPO Individual Premium — full schedule** | $40–75/mo, network-size tile, anniversary reset (page, wrong) | **~$73–75/mo; $2,000 max per CALENDAR YEAR (resets Jan 1); $50/$150 deductible per calendar year; Preventive 100% no wait; Basic 80% (6-mo wait); Major/endo/perio/oral surg/prostho/implants 50% (12-mo wait); Ortho adults+kids 50%, 12-mo wait, $1,500 lifetime, separate $50 ortho deductible; earliest effective ~9 days; network 112,000+ dentists / 278,000+ locations (PPO+Premier) CONFIRMED** | verified (DentalPlans.com Delta PPO Premium, updated 2026-05-07 + Delta plan docs) | Page corrected: premium ~$75, calendar-year reset, network-size tile replaced with ~9-day activation, ortho lifetime $1,500, dropped all PPO Basic split (Premium-only page). Plans underwritten by Delta Dental Insurance Company / state Delta companies; sold in 16 states + DC. Extras: LASIK (QualSight) + hearing (Amplifon) discount access, not insured. |
| **Ameritas PrimeStar Care Complete — full schedule** | $2,500→$3,000 max (page, wrong) | **$2,000 day-1 → $3,500 after yr 1 (Basic+Major combined)** | verified (Ameritas PrimeStar product guide GR 7708 3-26 / GR 8228 MAC 2-26, eff 4/1/2026) | Preventive 100% IN (80% OON), no max. Basic (fillings/simple ext) 80%→90% IN. Major (crowns, RCT, perio, oral surgery, dentures, **implants**) 20%→50% IN. **Implant sub-cap $1,000 day-1 → $1,500 yr 2+, drawn from annual max.** Deductible $50 (Basic+Major), $0 preventive. No waiting periods; Preventive Plus (preventive off the max). Hearing benefit (Complete only): $75 exam, hearing aid $200→$400/ear, 50% (not in NH). Child ortho **not** on Complete (Boost only: 15%→50%, $1,000 lifetime). Whitening Boost only. Network: Ameritas Classic PPO. Avg policyholder cost **$55.79/mo** (page displays ~$60 estimate). Next-business-day effective date, choose up to 3 months out. Vision optional add-on (EyeMed/VSP, ~$10–16/mo). Extras: Rx discount card + Tuned hearing discounts (not insurance). Age-neutral, 18+. |
| **Guardian — max / whitening / premium** | $1,000→$1,500 growing max, no whitening, ~$35/mo | **$3,000 flat max · whitening covered ($500/yr, 6-mo wait) · $67.89/mo (Premier 2.0)** | verified (Guardian product page + Benefits Disclosures PDF, 06/2026) | Premier 2.0: flat $3,000 max, whitening 50%/50% 6-mo $500/yr, premium $67.89/mo. Basic 85%/75% day 1, **Major 60%/50% 12-mo** (was wrongly 50%), implants lifetime $1,250. **Child ortho (dependents <19): 60%/50%, 12-mo wait, $750/yr, $1,500 lifetime** — NOT the $1,000 used earlier; $1,000 is the Diamond/Achiever tier. See authoritative tier ladder below. |

### Guardian Advantage 2.0 tier ladder (Guardian product page + Benefits Disclosures, 06/2026 — VERIFIED)
In-network / out-of-network shown as `IN/OON`. Ortho applies to dependents under age 19 only. The annual ortho max is the installment cap: lifetime max divided by yearly max sets the minimum number of years to fully pay out (Premier: $1,500 / $750 = 2 years minimum).

| Tier | Premium/mo | Annual max | Preventive | Basic | Major (12-mo) | Ortho ≤18 (12-mo) | Implant lifetime | Whitening (6-mo) |
|---|---|---|---|---|---|---|---|---|
| **Premier 2.0** | $67.89 | $3,000 | 100/100 | 85/75 day 1 | 60/50 | 60/50 · $750/yr · $1,500 LT | $1,250 | 50/50 · $500/yr |
| **Diamond 2.0** | $57.51 | $2,000 | 100/100 | 80/70 day 1 | 50/50 | 50/50 · $500/yr · $1,000 LT | $1,000 | 50/50 · $500/yr |
| **Achiever 2.0** | $46.54 | $1,750 | 100/100 | 70/60 day 1 | 50/50 | 50/50 · $500/yr · $1,000 LT | $1,000 | not covered |
| **Core 2.0** | $40.50 | $1,000 | 100/100 | 50/50 day 1 | 50/50 | not covered | $700 | not covered |
| **Starter 2.0** | $26.08 | $1,000 | 100/100 | 50/50 · 6-mo | not covered | not covered | not covered | not covered |

> Source: guardianlife.com/individuals-families/multi-product/dental (Advantage Dental Plans modal) + Individual Coverage Policies Benefit Disclosures PDF, Last Updated 6/2026 (policy forms IP-DEN-16/20/25). Plan documents are the final arbiter; terms vary by state.

---

## Canonical key specs (8 plans)

> Premiums are illustrative "from" figures and vary by state, age, and ZIP — always render with an *illustrative* qualifier. Coverage is in-network. `Y1/Y2` = reduced-benefit step-up where applicable.

| Plan | From /mo | Annual max | Deductible | Preventive | Basic | Major | Implant | Effective | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| **Delta PPO Premium** | $40–75 | $2,000 | $50 | 100% | 80% · 6-mo | 50% · 12-mo | 50% · 12-mo | 1st or 15th | verified; whitening state-specific |
| **UHC Primary Dental** | $30 | $1,000 | $50 | 100% | 50% · day 1 | not on this tier | — | next business day | verified |
| **Aetna Dental Direct** | $50 | $1,250 | $50 | 100% | 80% · 6-mo | 50% · 12-mo | — | 1st of next mo | needs-doc (no brief yet) |
| **Ameritas PrimeStar Complete** | $54–60 | $2,000→ (grows) | $50 | 100% | 80% · day 1 | 20% · day 1 → 50% Y2 | 20% · day 1 → 50% Y2 | next business day | Y2 max needs-doc |
| **Guardian Premier 2.0** | ~$70 avg | $3,000 (flat) | $50 | 100% | 85% · day 1 (highest day-one filling payout) | 50% · 12-mo | 50% · 12-mo | 1st of next mo | verified; whitening covered ~$500/yr after 6-mo wait |
| **Mutual of Omaha Dental Preferred** | ~$57 | $5,000 | $50 | 100% | 80% · day 1 | **20% Y1 → 50% Y2 · no wait** | 20% Y1 → 50% Y2 | next business day (confirm) | verified (premium/major) |
| **Humana Extend 5000** | $65–100 | $5,000 | $75 | 100% | 80% · 90-day | 50% Y1 → 60% Y2 · 6-mo | 50% Y1 → 60% Y2 · 6-mo | 6 days after enrol | verified (+ vision/hearing bundle) |
| **MetLife NCD Complete** | ~$100 | $10,000 | $50 | 100% | under review | under review | under review | 1st of next mo | gathering-reviews → `noindex` |

---

## Open items (need an official plan document before publishing a single number)

1. **Ameritas Complete** Year-1 and Year-2 annual maximum (sources split $2,000–$2,500 / $2,500–$3,000) — pull the official PrimeStar product guide.
2. ~~**Guardian Premier 2.0** major % and whitening~~ — RESOLVED June 24 2026 (operator): flat $3,000 max, whitening covered (~$500/yr, 6-mo wait), major 50% after 12-mo, ~$70/mo average.
3. **Aetna Dental Direct** — no research brief exists yet; write one and verify all fields.
4. **MetLife NCD Complete** — `gathering-reviews`; keep `noindex` until verified.
5. **Effective dates** marked "confirm" (MoO especially) — verify the contractual minimum, not the marketing claim.

---

## Official plan documents (download PDFs)

> Linked at the bottom of each plan page (Sources section), "Last Checked 2026-06-24". Carrier-domain documents only. Terms vary by state.

| Plan | Official documents |
|---|---|
| **Humana Extend 5000** | [NY PDF](https://assets.humana.com/is/content/humana/NY_HumanaExtend5000pdf) · [FL PDF](https://assets.humana.com/is/content/humana/FL_HumanaExtend5000pdf) · [GA PDF](https://assets.humana.com/is/content/humana/GA_HumanaExtend5000pdf) |
| **UHC Primary Dental (DentalWise)** | [DentalWise brochure](https://www.uhone.com/api/supplysystem/?FileName=50337-G202412.pdf) · [DentalWise Max DV](https://www.uhone.com/api/supplysystem/?filename=50339-G202401.pdf) |
| **Ameritas PrimeStar** | [Product guide](https://www.ameritas.com/OCM/GetFile?doc=647311) · [WA plan](https://www.ameritas.com/OCM/GetFile?doc=540705) |
| **Delta Dental PPO (Individual & Family)** | [AL PDF](https://www1.deltadentalins.com/content/dam/ddins/en/pdf/hcx/2025/dd-dd-al-i-fam-prf-25.pdf) · [MD PDF](https://www1.deltadentalins.com/content/dam/ddins/en/pdf/hcx/2025/md-14371md0010007-pb-dd-md-i-fam-prv-25.pdf) · [FL PDF](https://www1.deltadentalins.com/content/dam/ddins/en/pdf/hcx/2025/fl-97725fl0010004-pb-dd-fl-i-fam-prf-25.pdf) |
| **Aetna Dental Direct** | [Brochure A](https://dentaldirect.aetna.com/AetnaPlanPDFFiles/Aetna_Dental%20_Active_Brochure%20A.pdf) · [Brochure B](https://dentaldirect.aetna.com/AetnaPlanPDFFiles/Aetna_Dental%20Active%20Brochure%20B.pdf) |
| **NCD Complete by MetLife** | [NCD Complete brochure](https://www.ncd.com/wp-content/uploads/2023/08/NCD-Complete-by-MetLife-Welcome-Brochure.pdf) · [Plan details (MetLife)](https://metlife-files.s3.us-west-2.amazonaws.com/NCD+Complete+by+MetLife+-+more+info.pdf) |
| **Mutual of Omaha Dental Preferred** | [Outline of coverage (DNT2)](https://content.mutualofomaha.com/statedocuments/sites/content.mutualofomaha.com.statedocuments/files/_documents/dnt2oc.pdf) · [Covered services list](https://content.mutualofomaha.com/contactforms/sites/content.mutualofomaha.com.contactforms/files/_forms/Z11855_List%20of%20Covered%20Dental%20Services%20(1).pdf) |
| **Guardian Premier 2.0** | No public individual-plan PDF. Official pages: [guardiandirect.com dental](https://www.guardiandirect.com/dental-insurance) · [Guardian marketplace](https://dentalexchange.guardiandirect.com/) |

---

## Surfaces to keep in sync with this file
- `compare-ppo-dental-plans.html` — `PLANS` JSON (✅ MoO corrected June 2026)
- `plan-data/*.md` — the 8 research briefs (✅ UHC + Delta corrected June 2026)
- The redesign hub package (`/dental-insurance/ppo-plans/…`) — **still shows MoO $90; sync before going live**
- Any structured-data `Offer.price` on the spoke pages

> Rule: author the number **once, here**, then render it everywhere. If a surface disagrees with this file, this file wins.
