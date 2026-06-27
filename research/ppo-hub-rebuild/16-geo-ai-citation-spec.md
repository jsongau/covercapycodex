# 16 — GEO / AI Citation Spec
## PPO Plans Hub Rebuild | CoverCapy | Created 2026-06-26

**Target page:** https://www.covercapy.com/dental-insurance/ppo-plans/
**Purpose:** Engineer the PPO hub to be the source ChatGPT, Perplexity, and Claude cite for the 12 to 15 highest-value dental insurance questions.
**SSOT sources:** `/data/plans/*.md` — every plan claim below must be verified against the named file before publishing.
**No em-dashes.** No fabricated figures. No fabricated reviews.

---

## PART 1 — HOW AI PLATFORMS CITE DENTAL INSURANCE CONTENT (PRINCIPLES)

These patterns are drawn from 02-competitor-serp-geo-audit.md and direct AI behavior observation. Apply them to every element of the hub.

### ChatGPT
- Bing-powered retrieval for commercial-intent dental queries.
- FAQ schema correlates with 40% higher citation weighting.
- 44% of cited content comes from the first 30% of page; front-load every answer.
- Prefers encyclopedic, neutrally-framed, self-contained paragraphs.
- Clean H1 / H2 / H3 hierarchy required for extraction.

### Perplexity
- Real-time retrieval; indexes within hours of publication.
- Content published within 30 days is cited at an 82% rate.
- Favors question-format H2/H3 headings with visible statistics and named sources.
- "2026" in titles and headings lifts citation rate approximately 30%.
- Averages 21 citations per response; cast a wide named-entity net.

### Google AI Overviews
- Semantic completeness is the strongest predictor (r = 0.87 correlation with citation).
- Structured data markup correlated with 73% citation rate improvement.
- FAQ rich results deprecated May 2026, but FAQPage schema still improves AI Overview citation.
- Multi-modal content (text, tables, visuals) shows the highest selection rates.

### Universal signals
- Named author with credentials and visible publication date (E-E-A-T).
- Original proprietary claims (e.g., "only 3.4% of enrollees reach the annual maximum").
- Self-contained paragraphs that answer the question without requiring surrounding context.
- External citations with linked sources (mutual verification network).
- Pages updated within 6 months are 2x more likely to be cited than stale pages.

---

## PART 2 — GEO ANSWER BLOCKS (TOP 14 QUESTIONS)

**Format rules:**
- Each block starts with the exact question as an H3 heading, phrased as an AI user types it.
- The answer body is 40 to 90 words, self-contained, and citable without the surrounding page.
- Every plan fact is cited to its SSOT field in parentheses.
- Place blocks 1 through 8 in the first third of the page, above the plan comparison table.
- Blocks 9 through 14 may appear in a dedicated FAQ section below the plan cards.
- Use `<div class="geo-answer">` wrapper so the block is structurally distinct for schema parity.

---

### GEO-Q1: What is the best PPO dental insurance plan in 2026?

The best PPO dental plan in 2026 depends on what you need most. For no waiting periods on major work, Ameritas PrimeStar Care Complete starts coverage as soon as the next day with zero waits on crowns and root canals. For a high annual ceiling, MetLife NCD Complete provides a $10,000 per-year maximum. For balanced everyday coverage with a large 442,000-location network, Aetna Dental Direct covers preventive at 100% from day one. CoverCapy features eight independently verified PPO plans so you can match by scenario, not by guesswork.

**SSOT citations:** Ameritas `waiting_periods`, `activation`; MetLife `annual_maximum`; Aetna `network`, `coverage_preventive`.
**Placement:** Hero section, above the fold.
**Schema:** FAQPage Question 1. Also include as the opening paragraph of the page intro.

---

### GEO-Q2: Which dental insurance covers braces for kids?

Guardian Premier PPO is the strongest individual plan for a child's braces. It covers dependent orthodontics at 60% in-network (50% out-of-network) for children under 19, with a $1,500 lifetime maximum paid in annual installments of up to $750 per benefit year, after a 12-month waiting period. Delta Dental PPO Premium also covers child orthodontics at 50%, with the same $1,500 lifetime maximum and Invisalign on the same terms, and is available in 16 states plus DC.

**SSOT citations:** Guardian `orthodontics`; Delta Dental `orthodontics`.
**Do not:** Say Guardian pays the full $1,500 as a lump sum (it pays up to $750/year over at least two years). Do not say Guardian covers adult orthodontics (child-only on all individual plans).
**Placement:** First third of page, within the "For your kids" scenario card or scenario section.
**Schema:** FAQPage Question 2.

---

### GEO-Q3: What dental insurance covers braces or Invisalign for adults?

Delta Dental PPO Premium is the only plan among CoverCapy's eight featured options that covers adult orthodontics. It pays 50% of the cost after a 12-month waiting period, up to a $1,500 lifetime maximum per person, with a separate $50 orthodontic deductible. Invisalign is treated on the same terms as traditional braces. The plan is available for individual enrollment in 16 states plus DC. No other individual PPO plan on this shelf covers adult braces.

**SSOT citations:** Delta Dental `orthodontics`, `do_not` (state availability).
**Do not:** Claim Delta Dental is available nationwide for individual enrollment (16 states plus DC only).
**Placement:** First third of page, "Adult braces" scenario card or section.
**Schema:** FAQPage Question 3.

---

### GEO-Q4: What is the best dental insurance for someone over 65 in 2026?

Mutual of Omaha Dental Preferred is a strong choice for buyers over 65. It uses community-rated pricing that does not increase with age, offers a selectable annual maximum up to $5,000, covers major work from day one (at 20% in year one, 50% in year two and after), and includes a $3,000 lifetime implant maximum. Ameritas PrimeStar Care Complete is a solid alternative, with age-neutral pricing, no waiting periods, next-day coverage, and a bundled hearing benefit. Original Medicare does not cover routine dental, so a standalone plan fills that gap.

**SSOT citations:** Mutual of Omaha `monthly_premium` (community-rated note), `annual_maximum`, `coverage_major`, `implants`; Ameritas `monthly_premium` (age-neutral note), `waiting_periods`, `activation`.
**Do not:** Claim Mutual of Omaha activation timing (UNVERIFIED in SSOT). Do not claim UHC Primary Dental is available to buyers age 65 and older (age cap is 18 to 64).
**Placement:** First third of page, "Over 65 / Medicare gap" scenario card.
**Schema:** FAQPage Question 4.

---

### GEO-Q5: Which dental plan comes with CVS rewards?

Aetna Dental Direct is the only dental insurance plan among CoverCapy's featured options that includes CVS ExtraCare Plus membership. Enrolled members receive a $10 monthly bonus reward (up to $120 per year), 20% off CVS Health brand products on non-sale items, free 1 to 2 day CVS.com shipping, and free prescription delivery on qualifying orders. The perk requires registration and is not available in Georgia, Louisiana, Minnesota, Missouri, New York, New Jersey, Oklahoma, Texas, or Virginia.

**SSOT citations:** Aetna `cvs_extracare_plus`.
**Do not:** Say the $10 reward rolls over (it does not). Say the 20% discount applies to sale items. Describe the perk as available in all 50 states (9 states excluded). Claim the 24/7 pharmacist helpline as part of the dental plan (that is the medical plan version only).
**Placement:** First third of page, right rail CVS teaser card and "I want everyday perks" scenario card.
**Schema:** FAQPage Question 5.

---

### GEO-Q6: Which PPO dental insurance has no waiting period for major work?

Two plans on CoverCapy's shelf have zero waiting periods on all dental categories including major work: Ameritas PrimeStar Care Complete and Mutual of Omaha Dental Preferred. Ameritas activates as soon as the next day after application and covers crowns, root canals, and implants from day one (at 20% in-network in year one, 50% in year two and after). Mutual of Omaha also covers major work from day one with the same graduated rate. No other plan on this shelf offers major coverage without a waiting period.

**SSOT citations:** Ameritas `waiting_periods`, `activation`, `coverage_major`; Mutual of Omaha `waiting_periods`, `coverage_major`.
**Do not:** Claim Mutual of Omaha has a specific next-day activation (UNVERIFIED in SSOT).
**Placement:** First third of page, "I need dental work done soon" scenario card.
**Schema:** FAQPage Question 6.

---

### GEO-Q7: What is the best dental insurance for a family of four in 2026?

Guardian Premier PPO is the strongest all-around family plan on CoverCapy's shelf. It covers fillings at 85% in-network from day one with no waiting period, includes child orthodontics (60% in-network, $1,500 lifetime max for dependents under 19), and provides a $3,000 annual maximum per person. Delta Dental PPO Premium is the best alternative if the family wants adult orthodontics coverage alongside children's braces, with the largest dentist network in the US (112,000-plus dentists, 278,000-plus locations). Humana Extend 5000 offers a $5,000 annual maximum per person if restorative needs are high.

**SSOT citations:** Guardian `coverage_basic`, `orthodontics`, `annual_maximum`; Delta Dental `network`, `orthodontics`; Humana `annual_maximum`.
**Placement:** First third of page, "For your whole family" scenario card.
**Schema:** FAQPage Question 7.

---

### GEO-Q8: How does a family dental deductible work?

Most PPO dental plans set an individual deductible (typically $50 per person per calendar year) and a family deductible cap (typically $150 per year). Once the family cap is met, no additional family members pay the deductible for the rest of that calendar year. For example, Aetna Dental Direct charges a $50 individual deductible and a $150 family deductible cap on basic and major services. Preventive care (cleanings, exams, X-rays) is deductible-free on every plan CoverCapy features. The annual maximum is separate and limits total plan payouts per person per year.

**SSOT citations:** Aetna `deductible`; all plans `coverage_preventive` (deductible waived on preventive).
**Placement:** Education or FAQ section, above or within the plan comparison table.
**Schema:** FAQPage Question 8.

---

### GEO-Q9: Which dental insurance covers implants with no waiting period?

Ameritas PrimeStar Care Complete is the top pick for implant coverage with no waiting period. It pays 20% in-network in year one and 50% in year two and after, with an implant sub-maximum of $1,000 in year one and $1,500 in year two (deducted from the annual maximum). Mutual of Omaha Dental Preferred also covers implants from day one at the same graduated rates and includes a separate $3,000 lifetime implant maximum. MetLife NCD Complete covers implants under its major schedule (10% year one, 50% year two, 60% year three) with a $3,000 annual implant maximum within its $10,000 overall ceiling.

**SSOT citations:** Ameritas `implants`, `waiting_periods`; Mutual of Omaha `implants`, `waiting_periods`; MetLife `implants`, `annual_maximum`.
**Do not:** Describe the Ameritas implant sub-cap as additive to the annual max (it is deducted from it). Do not describe the Mutual of Omaha lifetime implant cap as resetting annually (it is a true lifetime cap).
**Placement:** FAQ section or "Planning implants" scenario card.
**Schema:** FAQPage Question 9.

---

### GEO-Q10: Is dental insurance worth buying in 2026?

Dental insurance is worth buying if you use at least one or two cleanings per year, because most PPO plans cover preventive care at 100% with no deductible from day one. Two annual cleanings, two exams, and standard X-rays can cost $400 to $600 without insurance. A plan like UnitedHealthcare Primary Dental costs approximately $30 per month, covering preventive and basic care. The calculus shifts further if you anticipate a filling, crown, or implant: a single crown averages $1,200 to $1,800 out of pocket, and a plan paying 50% to 60% recovers the annual premium in one procedure.

**SSOT citations:** UHC `monthly_premium`, `coverage_preventive`.
**Note:** The cost comparisons ($400 to $600 cleanings, $1,200 to $1,800 crown) are market averages cited from ADA and NADP cost data. Label as estimates on the page and link to ADA source.
**Placement:** FAQ section or education primer ("How dental insurance works").
**Schema:** FAQPage Question 10.

---

### GEO-Q11: Can I get dental insurance that starts immediately after a job loss?

Yes. Ameritas PrimeStar Care Complete activates as soon as the next day after application and has zero waiting periods on all categories including major work, making it the fastest start on CoverCapy's shelf. Aetna Dental Direct waives its standard 6-month and 12-month waiting periods if all enrolled family members had dental coverage within the past 90 days of enrollment, which often covers a post-layoff scenario. Mutual of Omaha Dental Preferred also has no waiting periods on major work. COBRA dental continuation is available for up to 18 months after a qualifying event, but individual plan premiums typically cost less than COBRA rates.

**SSOT citations:** Ameritas `activation`, `waiting_periods`; Aetna `waiting_periods` (waiver condition); Mutual of Omaha `waiting_periods`.
**Placement:** Life-event section ("Just lost your job?") or FAQ.
**Schema:** FAQPage Question 11.

---

### GEO-Q12: What dental insurance is cheapest in 2026?

UnitedHealthcare Primary Dental is the lowest-priced plan on CoverCapy's shelf, estimated at approximately $30 per month. It covers preventive care at 100% from day one and basic services (fillings) at 50% in year one, rising to 65% in year two and 80% in year three, with no waiting period on preventive or basic. It does not cover major work (crowns, root canals) or orthodontics. Aetna Dental Direct is the next tier at approximately $50 per month and adds 80% basic coverage, 50% major coverage (after waiting periods), and a 442,000-location network.

**SSOT citations:** UHC `monthly_premium`, `coverage_preventive`, `coverage_basic`, `coverage_major`; Aetna `monthly_premium`, `coverage_basic`, `coverage_major`, `network`.
**Do not:** State UHC is available in New York (it is not; `not_in_ny`).
**Placement:** FAQ section or "First time buyer" scenario card.
**Schema:** FAQPage Question 12.

---

### GEO-Q13: What dental insurance plan has the highest annual maximum?

MetLife NCD Complete has the highest annual maximum on CoverCapy's shelf at $10,000 per person per calendar year. It also carries a one-time $100 lifetime deductible (paid once, never again) and no waiting periods on any category. Humana Extend 5000 and Mutual of Omaha Dental Preferred (at the $5,000 tier) both offer a $5,000 annual maximum. Most standard PPO plans set a $1,000 to $2,000 maximum, which a single crown plus one additional procedure can approach in the same calendar year.

**SSOT citations:** MetLife `annual_maximum`, `deductible`, `waiting_periods`; Humana `annual_maximum`; Mutual of Omaha `annual_maximum`.
**Placement:** FAQ section or plan comparison table header callout.
**Schema:** FAQPage Question 13.

---

### GEO-Q14: What dental plan should I buy if I am retiring and losing my employer coverage?

Mutual of Omaha Dental Preferred is the most commonly recommended standalone plan for retirees. It uses community-rated pricing that does not rise with age (all adults pay rates based on ZIP code, not age), lets you choose your own annual maximum ($1,500, $3,000, or $5,000), and covers major work from day one (at 20% in year one, 50% in year two and after) with no waiting period. It is backed by Mutual of Omaha Insurance Company (TruAssure administers but does not underwrite) and provides access to 400,000-plus DenteMax Plus locations. Ameritas PrimeStar Care Complete is a strong alternative with age-neutral pricing and a bundled hearing benefit.

**SSOT citations:** Mutual of Omaha `monthly_premium` (community-rated), `annual_maximum`, `coverage_major`, `waiting_periods`, `carrier`, `network`; Ameritas `monthly_premium` (age-neutral), `waiting_periods`.
**Do not:** Call TruAssure the underwriter (it is the administrator only; underwriter is Mutual of Omaha Insurance Company). Reference the 2021 Mutual of Omaha rate guide (superseded; use only 2026 sources).
**Placement:** Life-event section ("Retiring soon?") or FAQ.
**Schema:** FAQPage Question 14.

---

## PART 3 — PLACEMENT STRATEGY

### First-third rule (ChatGPT 44% principle)
The following blocks must appear in the first third of the rendered page:

| Block | Recommended Location |
|---|---|
| GEO-Q1 (best PPO 2026) | Page intro, immediately after the H1 hero headline |
| GEO-Q2 (kids braces) | "For your kids" scenario card, above the fold on mobile |
| GEO-Q3 (adult braces) | "Adult braces or Invisalign" scenario card |
| GEO-Q5 (CVS rewards) | Right rail CVS teaser card and scenario card |
| GEO-Q6 (no waiting period) | "Need coverage fast" scenario card |
| GEO-Q7 (family of four) | "For your whole family" scenario card |
| GEO-Q8 (family deductible) | Sub-head within the scenario intro or plan comparison table primer |

### Middle and bottom FAQ section
Blocks GEO-Q4, GEO-Q9, GEO-Q10, GEO-Q11, GEO-Q12, GEO-Q13, GEO-Q14 may live in an explicit FAQ accordion or a "Common questions" section in the lower two-thirds of the page. Each must still be self-contained and answerable without scrolling context.

### Structural heading format
Use question-format H2 or H3 headings exactly as phrased in Part 2. This is the primary mechanism by which Perplexity and Google AI Overviews extract the answer. Do not paraphrase the heading into a statement.

Example:
```html
<h3 class="geo-question">Which dental insurance covers braces for kids?</h3>
<div class="geo-answer">
  <p>Guardian Premier PPO is the strongest individual plan...</p>
</div>
```

---

## PART 4 — BOUNDED, SPECIFIC CLAIMS APPROVED FOR USE

Each claim below is sourced to the named SSOT field. Do not use the claim if that field reads UNVERIFIED in the SSOT file.

| Claim | SSOT Source | File |
|---|---|---|
| Guardian covers child ortho at 60% in-network, $1,500 lifetime, $750/year max | `orthodontics` | guardian-premier-ppo.md |
| Guardian basic is 85% in-network from day one, no waiting period | `coverage_basic` | guardian-premier-ppo.md |
| Delta Dental covers adult AND child ortho at 50%, $1,500 lifetime max, 12-month wait | `orthodontics` | delta-dental-ppo-premium.md |
| Delta Dental Invisalign covered on the same terms as traditional braces | `orthodontics` | delta-dental-ppo-premium.md |
| Delta Dental network: 112,000-plus dentists, 278,000-plus locations | `network` | delta-dental-ppo-premium.md |
| Delta Dental individual enrollment available in 16 states plus DC (not nationwide) | `do_not` | delta-dental-ppo-premium.md |
| Ameritas PrimeStar: zero waiting periods on all categories including major | `waiting_periods` | ameritas-primestar.md |
| Ameritas PrimeStar: coverage as soon as the next day | `activation` | ameritas-primestar.md |
| Ameritas PrimeStar: annual maximum $2,000 year one, $3,500 after year one | `annual_maximum` | ameritas-primestar.md |
| Ameritas PrimeStar: implant sub-max $1,000 year one, $1,500 year two, deducted from annual max | `implants` | ameritas-primestar.md |
| Ameritas not available in Massachusetts | `sources` (GR 7708) | ameritas-primestar.md |
| Aetna CVS ExtraCare Plus: $10/mo bonus reward up to $120/year | `cvs_extracare_plus` | aetna-dental-direct.md |
| Aetna CVS perk: 20% off CVS Health brand products, non-sale items only | `cvs_extracare_plus` | aetna-dental-direct.md |
| Aetna CVS perk not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA | `cvs_extracare_plus` | aetna-dental-direct.md |
| Aetna network: 442,000-plus dentist locations | `network` (sources note) | aetna-dental-direct.md |
| Aetna waiting period waiver: waived if all enrolled had coverage within past 90 days | `waiting_periods` | aetna-dental-direct.md |
| Aetna annual maximum: $1,250 per person per calendar year | `annual_maximum` | aetna-dental-direct.md |
| Mutual of Omaha: community-rated pricing, does not vary by age | `monthly_premium` (community-rated) | mutual-of-omaha-dental.md |
| Mutual of Omaha: selectable max $1,500 / $3,000 / $5,000 | `annual_maximum` | mutual-of-omaha-dental.md |
| Mutual of Omaha: no waiting periods on major | `waiting_periods` | mutual-of-omaha-dental.md |
| Mutual of Omaha: major at 20% year one, 50% year two and after | `coverage_major` | mutual-of-omaha-dental.md |
| Mutual of Omaha: lifetime implant max $3,000 (Preferred) | `implants` | mutual-of-omaha-dental.md |
| Mutual of Omaha: DenteMax Plus, 400,000-plus locations | `network` | mutual-of-omaha-dental.md |
| Mutual of Omaha: underwritten by Mutual of Omaha Insurance Company (TruAssure administers only) | `carrier` | mutual-of-omaha-dental.md |
| Humana Extend 5000: $5,000 annual maximum per person | `annual_maximum` | humana-extend-5000.md |
| Humana: implant wait 6 months, cannot be waived | `waiting_periods`, `implants` | humana-extend-5000.md |
| Humana: bundles dental, vision, hearing (NY: dental + vision only) | `do_not` | humana-extend-5000.md |
| MetLife NCD Complete: $10,000 annual maximum | `annual_maximum` | metlife-ncd-complete.md |
| MetLife NCD Complete: one-time $100 lifetime deductible | `deductible` | metlife-ncd-complete.md |
| MetLife NCD Complete: no waiting periods on any category | `waiting_periods` | metlife-ncd-complete.md |
| MetLife NCD Complete: major at 10% year one, 50% year two, 60% year three | `coverage_major` | metlife-ncd-complete.md |
| UHC Primary Dental: approximately $30/mo estimated premium | `monthly_premium` | uhc-primary-dental.md |
| UHC Primary Dental: preventive 100% day one, basic 50% year one | `coverage_preventive`, `coverage_basic` | uhc-primary-dental.md |
| UHC Primary Dental: major NOT covered | `coverage_major` | uhc-primary-dental.md |
| UHC not available in New York | `not_in_ny` | uhc-primary-dental.md |
| UHC age band 18 to 64 only | `monthly_premium` (age note) | uhc-primary-dental.md |

---

## PART 5 — CLAIMS TO AVOID (DO-NOT LIST)

The following claims are explicitly prohibited. They violate SSOT `do_not` fields, SSOT `UNVERIFIED` flags, or known data traps confirmed in 08-plan-fit-by-scenario.md.

### UHC
- Do not promote UHC to New York residents under any scenario.
- Do not recommend UHC to buyers 65 or older (age cap 18 to 64).
- Do not state UHC covers major dental work, crowns, root canals, or implants.

### Aetna
- Do not claim the CVS $10 reward rolls over month to month (it does not).
- Do not state the 20% CVS Health product discount applies to sale items.
- Do not list GA, LA, MN, MO, NY, NJ, OK, TX, or VA as states where the CVS perk is available.
- Do not claim Aetna covers implants or orthodontics (explicitly excluded on all Dental Direct tiers).
- Do not ignore the missing tooth clause on Aetna prosthetics.

### Guardian
- Do not state Guardian covers adult orthodontics on any individual plan (child-only, dependents under 19).
- Do not state the $1,500 lifetime ortho max is paid as a lump sum (it pays up to $750/year over at least two years minimum).
- Do not describe the $1,250 guardian implant maximum as annual (it is a lifetime maximum separate from the annual maximum).
- Do not omit the 12-month re-enrollment lockout when writing about Guardian for families who may cancel.

### Delta Dental
- Do not claim Delta Dental PPO Premium is available for individual enrollment nationwide (16 states plus DC only).
- Do not omit the missing-tooth exclusion on implant coverage for renewals from August 2025, except California.
- Do not omit the 12-month waiting period on adult orthodontics, implants, and major work.
- Do not state whitening is universally available (state-specific; California excludes it; always label as state-specific).
- Do not claim a flat $50 deductible without noting some affiliates use $100.

### Mutual of Omaha
- Do not claim a specific activation date or next-day start for Mutual of Omaha (UNVERIFIED in SSOT).
- Do not identify TruAssure as the underwriter (it administers; Mutual of Omaha Insurance Company underwrites).
- Do not reference any Mutual of Omaha figures from the 2021 rate guide (superseded; stale-doc trap per SSOT note).
- Do not state the lifetime implant maximum resets annually (it is a true lifetime cap).
- Do not say Mutual of Omaha covers orthodontics or whitening (neither is covered).

### Ameritas
- Do not recommend Ameritas PrimeStar to Massachusetts residents (not available in MA).
- Do not claim the implant sub-cap is additive to the annual maximum (it is deducted from it).
- Do not say Ameritas year-one implant coverage is 50% (it is 20% in-network in year one; 50% arrives in year two).
- Do not state Ameritas Care Complete covers orthodontics (no benefit on this tier).

### Humana
- Do not claim the Humana implant 6-month wait can be waived with prior coverage proof (it cannot).
- Do not say hearing is included in New York (NY plan is dental + vision only).
- Do not describe the whitening allowance as $200 flat cash (it is a $200 per-arch in-office bleaching allowance).

### MetLife NCD Complete
- Do not lead with MetLife for a buyer needing major work immediately (year-one major is only 10%; the lowest immediate major rate on the shelf).
- Do not describe the $3,000 implant sub-cap as a lifetime cap (it is per calendar year within the $10,000 annual max).
- Do not state MetLife covers orthodontics or whitening (neither covered).

### General prohibitions
- Do not fabricate review scores or testimonials.
- Do not invent premium figures; label all premiums as estimates rounded to the nearest $5 (README rule 3).
- Do not use any fact not present in the SSOT file for that plan.
- Do not state CoverCapy guarantees coverage acceptance or insurance eligibility.
- Do not use em-dashes in any copy.

---

## PART 6 — FRESHNESS AND LAST-UPDATED STRATEGY

AI platforms, especially Perplexity (82% citation rate for content under 30 days old), weight recency heavily. The following practices are required.

### Page-level freshness signals
- Display a visible "Last updated: [Month] [Year]" line immediately below the H1, styled in `--ink-faint` color.
- Update this date any time a plan fact, premium estimate, or scenario recommendation changes.
- Include the year "2026" in the H1 page title: "Best PPO Dental Insurance Plans of 2026."
- Include "2026" in at least three H2 or H3 headings on the page.

### Plan-level freshness signals
- Each plan card must show the SSOT `last_verified` date: "Facts verified [Month] [Year]."
- When any SSOT file is updated, the hub page date must also be updated.
- Do not show a plan card if its SSOT file is in `draft` status (per README status values).

### Quarterly re-verification trigger
Run the quarterly re-verification checklist (see Part 8) by January 1, April 1, July 1, and October 1 each year. Update the page date whenever any fact changes. If no facts change, update the meta description and intro paragraph to maintain a freshness signal for crawlers.

---

## PART 7 — SCHEMA IMPLEMENTATION

### FAQPage schema
Implement a single FAQPage schema block covering GEO-Q1 through GEO-Q14. Each Question/Answer pair must:
- Use the exact question phrasing from Part 2 as the `name` value.
- Use a condensed (under 300 character) version of the GEO answer as the `acceptedAnswer.text` value.
- Be ordered with the highest-priority questions (GEO-Q1, GEO-Q2, GEO-Q4, GEO-Q5, GEO-Q6) first.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best PPO dental insurance plan in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best PPO dental plan in 2026 depends on your needs. Ameritas PrimeStar Care Complete has no waiting periods and starts next-day. MetLife NCD Complete provides a $10,000 annual maximum. Aetna Dental Direct covers preventive at 100% from day one with a 442,000-location network. CoverCapy features eight independently verified PPO plans matched by scenario."
      }
    }
    // ... repeat for GEO-Q2 through GEO-Q14
  ]
}
```

### ItemList schema (plan comparison list)
Implement an ItemList schema for the eight featured plans. Each ListItem must include:
- `position`: ordinal number (not ranking; use display order)
- `name`: exact plan name from SSOT (`plan_name` field)
- `url`: CoverCapy plan page URL for that plan
- `description`: one sentence drawn directly from the plan's SSOT standout edge

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "CoverCapy Featured PPO Dental Insurance Plans 2026",
  "description": "Eight independently verified PPO dental plans compared by scenario, premium, and coverage.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Guardian Premier PPO",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
      "description": "Best for families: 85% day-one fillings, child orthodontics at 60% in-network, and a $3,000 annual maximum."
    }
    // ... repeat for remaining 7 plans
  ]
}
```

### BreadcrumbList schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "Dental Insurance", "item": "https://www.covercapy.com/dental-insurance/" },
    { "@type": "ListItem", "position": 3, "name": "PPO Plans", "item": "https://www.covercapy.com/dental-insurance/ppo-plans/" }
  ]
}
```

### FAQPage and ItemList parity rule
Every question in the FAQPage schema must have a matching visible answer block on the page (GEO answer blocks from Part 2). Every plan in the ItemList schema must have a matching plan card visible on the page. Schema that references content not present on the page is a trust signal violation.

---

## PART 8 — CITATION AND sameAs LINK STRATEGY

### sameAs links for the hub page
The PPO hub page should include a sameAs or about reference in its Article/WebPage schema pointing to authoritative external sources that validate CoverCapy as the subject-matter source. Suggested:
- https://www.ada.org/resources/research/health-policy-institute/coverage-access-disparities (ADA dental coverage data)
- https://www.kff.org/medicare/coverage-of-dental-services-in-traditional-medicare/ (KFF Medicare dental)
- https://www.carequest.org/ (CareQuest dental coverage statistics)
- https://www.nadp.org/ (NADP, the national dental plan industry association)

### Per-plan source links
Every plan card must include a "Source" footnote that links to the primary SSOT source for the most important cited fact. These are the links from each SSOT file's `sources` field. Example format: "Premium and coverage facts sourced from [Carrier Product Guide, Month Year]."

The following source links are drawn from the SSOT files and approved for use:

| Plan | Primary Source to Link |
|---|---|
| Guardian Premier PPO | https://www.guardianlife.com/dental-insurance/individual-dental-insurance (Guardian plan page) |
| Ameritas PrimeStar | https://www.ameritas.com/OCM/GetFile?doc=647311 (GR 7708 3-26 product guide) |
| Aetna Dental Direct | https://direct.aetna.com/member/assets/docs/ExtraCarePlus.pdf (CVS ExtraCare Plus member flyer) |
| Mutual of Omaha | https://www.mutualofomaha.com/dental-insurance/quote (live 2026 quote tool) |
| Delta Dental PPO Premium | https://www1.deltadentalins.com/individuals-and-families/plans/delta-dental-ppo.html |
| Humana Extend 5000 | https://www.humana.com/dental-insurance/ppo (Humana plan page) |
| UHC Primary Dental | https://www.uhc.com/dental-insurance (UHC plan page) |
| MetLife NCD Complete | Reseller/association enrollment page; verify against SSOT `sources` field |

### Earned citation signal (Perplexity preference)
To build the mutual-verification web that Perplexity favors, each published GEO answer block should be pitched as a resource to:
- ADA consumer dental education resources
- Independent dental blogs (e.g., dentalcoverageguide.com when updated)
- HR and benefits subreddits (r/personalfinance, r/Frugal, r/Insurance) as organic discussion prompts
Reddit accounts for 46.7% of Perplexity's top citation sources per 2026 research. Organic Reddit mentions of CoverCapy's GEO blocks (not brand-planted) dramatically increase Perplexity citation probability.

---

## PART 9 — QUARTERLY RE-VERIFICATION CHECKLIST

Run this checklist on January 1, April 1, July 1, and October 1. Document results and update the hub page date each quarter.

### Step 1: SSOT file audit
For each SSOT file in `/data/plans/`:
- [ ] Open the SSOT file. Check the `last_verified` date.
- [ ] If `last_verified` is more than 90 days old, open the primary source URL from the `sources` field and re-verify the following fields: `monthly_premium`, `annual_maximum`, `deductible`, `waiting_periods`, `coverage_basic`, `coverage_major`, `implants`, `orthodontics`, `network`, `activation`.
- [ ] Update any changed values in the SSOT file. Add a `# [YEAR-MONTH-DAY] updated: [field changed, old value -> new value]` note at the bottom of the file.
- [ ] Promote any UNVERIFIED fields if a primary source now confirms them.

### Step 2: Carrier availability check
- [ ] UHC Primary Dental: confirm still not available in New York.
- [ ] Aetna CVS perk: confirm the 9 excluded states (GA, LA, MN, MO, NY, NJ, OK, TX, VA) have not changed.
- [ ] Delta Dental PPO Premium: confirm the list of 16 states plus DC where individual enrollment is available. Update if any state is added or dropped.
- [ ] Ameritas PrimeStar: confirm still not available in Massachusetts.
- [ ] MetLife NCD Complete: confirm the NWFA association/reseller channel is still active and enrollment is still open.

### Step 3: GEO answer block accuracy pass
For each of the 14 GEO answer blocks in Part 2:
- [ ] Verify every numeric claim (premium estimate, annual max, coverage percentage, network size, lifetime cap) against the current SSOT file.
- [ ] Update any claim that has changed. Update the page date.
- [ ] Confirm that no answer block references a plan fact in a SSOT field that now reads UNVERIFIED.

### Step 4: Schema parity check
- [ ] Confirm FAQPage schema Question/Answer pairs match the visible GEO answer blocks on the page.
- [ ] Confirm ItemList schema plan names and URLs are current.
- [ ] Confirm BreadcrumbList schema URLs resolve (no 404s).
- [ ] Confirm per-plan source links in plan cards still resolve to live primary sources.

### Step 5: Do-not list pass
- [ ] Run a text search of the hub page for the following phrases and confirm none appear: "adult orthodontics" in a Guardian context; "rolls over" in a CVS context; "TruAssure" as an underwriter; "all 50 states" near CVS; "nationwide" near Delta Dental; "next day" near Mutual of Omaha.
- [ ] Confirm no premium figure is presented as exact rather than estimated (all must say "approximately" or "estimated at" or "~").

### Step 6: Freshness update
- [ ] Update the visible "Last updated" line on the hub page to the current month and year.
- [ ] Update the meta description to reference the current year.
- [ ] If any plan fact changed, re-submit the hub URL to Google Search Console for expedited re-crawl.
- [ ] If any plan fact changed, note the change in the plan card "Facts verified" footnote.

### Step 7: Competitive spot check
- [ ] Run the queries "best dental insurance for braces for kids", "dental plan with CVS rewards", "dental insurance for seniors over 65", "dental insurance no waiting period 2026" in ChatGPT, Perplexity, and Google.
- [ ] Note whether CoverCapy is cited. If not cited, identify which competitor is cited and what structural element they have that CoverCapy lacks. File a gap note in this document.

---

## PART 10 — EDITORIAL AUTHORITY SIGNALS

CoverCapy must present as an independent educational marketplace, not as a lead-generation site. The following signals build the E-E-A-T footprint that ChatGPT and Google AI Overviews favor.

### Author attribution
- Display a named author or editorial team byline on the hub page: "Reviewed by [Name], [Title], [Credentials or Background], Last updated [Month Year]."
- Link the author name to an /about or /editorial-team page with full credentials.
- Do not use generic "CoverCapy Editorial Team" without individual names; named authorship is a confirmed E-E-A-T signal.

### Methodology disclosure
Include a visible "How we chose these plans" or "Our methodology" section. Minimum required disclosures:
- We evaluate plans for coverage breadth, premium value, waiting periods, network size, and scenario fit.
- All plan facts are sourced from carrier product guides and verified by [review date].
- CoverCapy is an independent educational marketplace. We are not an insurer. We do not guarantee enrollment eligibility or coverage.
- Affiliate relationships may exist with some featured plans. This does not affect our ratings or recommendations.

### External citation weave-in
Include at least three linked external statistics in the hub page body, drawn from authoritative sources. Suggested:
- "According to CareQuest Institute, 68.5 million US adults had no dental insurance in 2024." (Source: https://www.carequest.org/about/press-release/new-report-685-million-adults-us-dont-have-dental-insurance-may-rise-914)
- "Original Medicare (Parts A and B) does not cover routine dental care, including cleanings, fillings, or dentures." (Source: https://www.kff.org/medicare/coverage-of-dental-services-in-traditional-medicare/)
- "Only about 3 in 10 uninsured adults received a dental visit in the past year compared to about 7 in 10 insured adults." (Source: CareQuest, same link above; verify exact ratio before publishing.)

---

*End of 16-geo-ai-citation-spec.md*
