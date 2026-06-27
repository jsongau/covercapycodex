# 10 — SERP Feature Targeting Plan
## PPO Hub Rebuild | CoverCapy | 2026-06-26

**Scope:** Featured snippets, People Also Ask (PAA), and AI Overviews for the top 12 target queries mapped to the PPO hub clusters. For each query: exact on-page format that wins the snippet, precise heading wording, answer shape and length, supporting table or list, freshness signals, entity coverage, and markup guidance for the comparison table and best-for grid. All facts grounded in SSOT `/data/plans/*.md` files only; no figures are invented.

---

## HOW GOOGLE PICKS THESE FORMATS (working model as of mid-2026)

Featured snippet format correlates with query shape:
- "What is / What does" questions: paragraph (40-60 words)
- "Which plan / Which insurance" comparisons: ordered list or table
- "How does X work" mechanics: numbered list (steps) or short paragraph
- "Does X cover Y" binary questions: paragraph with yes/no opening sentence + condition clause
- Side-by-side comparisons (two named entities): table
- "Best for [scenario]" queries: bulleted list of named items with qualifiers

AI Overviews (and Perplexity/ChatGPT citations) favor:
- Pages where the exact question wording appears as an H2 or H3 (question-mark included or close paraphrase)
- Answers of 50-120 words immediately below that heading (no filler intro)
- Named, attributed facts (plan name + specific dollar figure + source year)
- FAQPage schema or HowTo schema that mirrors the on-page Q&A
- Pages last-modified within 90 days (freshness signal shown in SERP date)

People Also Ask wins favor:
- Pages that answer a chain of 3-5 related subquestions in separate H3 blocks
- "What" answers in 1-2 sentences; "How" answers in 3-5 steps; "Which" answers with a named winner plus a reason

---

## QUERY 1: "best dental insurance no waiting period 2026"
**Cluster 7 | SSOT: ameritas-primestar.md, mutual-of-omaha-dental.md, metlife-ncd-complete.md**

### Snippet format: ORDERED LIST
Rationale: "Best [category]" queries pull lists from pages that rank options with qualifiers. Competitors (Spirit Dental, Aflac, Direct Benefits) dominate paragraph formats and generic "some plans" language. A named-plan ranked list with specific day-one figures wins AI citation and PAA extraction because it gives the model concrete attributable facts.

### Heading wording (H2)
```
Which Dental Insurance Plans Have No Waiting Period in 2026?
```

### Answer shape (immediately under the H2, before any filler)
Ordered list, 3-5 items, each item: plan name + day-one coverage structure + one differentiating fact. Total prose: 80-110 words. Do not write an introductory sentence before the list; lead with the list.

### The list (SSOT-grounded, ready to place)
```
1. Ameritas PrimeStar Care Complete: no waiting period on preventive, basic, major, and implants. Coverage can start as soon as the next day. Day-one implant access at 20% in-network, rising to 50% after year one. Annual maximum $2,000 rising to $3,500. (~$56/mo estimate)

2. Mutual of Omaha Dental Preferred: no waiting period on major work. Major benefit starts at 20% in-network in year one, rising to 50% in year two. Selectable annual maximum: $1,500, $3,000, or $5,000. Separate $3,000 lifetime implant maximum. (~$90/mo estimate at the $5,000 tier)

3. MetLife NCD Complete: no waiting period on preventive, basic, or major. Basic pays 65% in year one rising to 90% after year two. Major pays 10% in year one, 50% in year two, 60% year three and after. $10,000 annual maximum (highest on this shelf). $100 lifetime deductible. (~$100/mo estimate)
```

### Supporting table (marks up for AI extraction)
Place immediately after the list under an H3 "No-Wait Plans Side by Side":

| Plan | Annual Max | Day-One Major | Implants | Est. Monthly |
|---|---|---|---|---|
| Ameritas PrimeStar Care Complete | $2,000 (yr 1), $3,500 (yr 2+) | 20% in-network | Yes, day one | ~$56 |
| Mutual of Omaha Dental Preferred | Up to $5,000 (selectable) | 20% in-network | Yes, $3,000 lifetime cap | ~$90 |
| MetLife NCD Complete | $10,000 | 10% in-network | Yes, $3,000/yr cap | ~$100 |

Table markup: plain HTML `<table>` with `<caption>` "Dental Plans With No Waiting Period 2026 Comparison". Add `scope="col"` on TH. No CSS classes needed for snippet extraction; structure is enough.

### PAA chain to target (H3s below the table)
- "Does Ameritas PrimeStar have no waiting period for major dental work?" (paragraph, 2 sentences, lead with "Yes")
- "What dental plan can I use for a crown right away?" (paragraph, lead with the plan name)
- "Can I get dental insurance that covers implants with no waiting period?" (paragraph, lead with "Yes, two plans on this shelf cover implants from day one")

### Freshness + 2026 strategy
Place "Updated June 2026" in the article `<time datetime="2026-06-26">` tag immediately after the H2. Include "2026" in the H2 itself. Add `"dateModified": "2026-06-26"` to the page-level Article schema.

---

## QUERY 2: "best dental insurance 2026" (head term)
**Cluster 1 | All 8 plans**

### Snippet format: PARAGRAPH (opening definition) + TABLE
Rationale: Money.com, NerdWallet, Forbes Advisor, and DentistDecoded all own this with editorial roundup lists. Google tends to pull the opening definitional paragraph from the ranking page when no single page has a clearly structured answer block. CoverCapy's angle: lead with a scenario-differentiated opening sentence that AI models recognize as more precise than generic editorial copy, then back it immediately with the comparison table.

### Heading wording (H1 or page-level answer block H2)
```
Best PPO Dental Plans 2026: Matched to Your Situation
```
Then a short paragraph immediately below (50-60 words, no filler):

```
The best dental insurance plan in 2026 depends on what you need it to do. For urgent dental work with no waiting period, Ameritas PrimeStar Care Complete covers major work from day one. For the highest annual maximum, MetLife NCD Complete pays up to $10,000 per year. For seniors on a budget with no major wait, Mutual of Omaha Dental Preferred is the most cited pick.
```

This paragraph is the snippet bait. It names three plans, three scenarios, three distinguishing facts. AI models will extract and attribute this.

### Entity weave-in (place organically in the paragraph and table caption)
Annual maximum, waiting period, in-network, PPO network, DenteMax Plus, Ameritas Classic PPO, DentalGuard Preferred, Aetna Dental PPO, MetLife PDP Plus.

---

## QUERY 3: "dental insurance for seniors over 65 2026"
**Cluster 6 | SSOT: mutual-of-omaha-dental.md, ameritas-primestar.md**

### Snippet format: PARAGRAPH
Rationale: SeniorLiving.org and TheSeniorList.com own this with editorial roundups. Google currently shows a paragraph snippet from SeniorLiving.org. To displace it, the CoverCapy paragraph must open with the exact question frame and deliver a named-plan answer faster than the competitor.

### Heading wording (H2)
```
What Is the Best Dental Insurance for Seniors Over 65 in 2026?
```

### Answer paragraph (50-65 words, immediately under H2)
```
For adults over 65 who are not on Medicare Advantage, Mutual of Omaha Dental Preferred is the most commonly cited standalone PPO option in 2026. It has no waiting period on major work, a selectable annual maximum up to $5,000, a separate $3,000 lifetime implant maximum, community-rated pricing that does not increase with age, and a network of more than 400,000 DenteMax Plus locations. Premium estimate: ~$90/mo for the $5,000 tier.
```

### PAA chain to target (H3s)
- "Does Medicare cover dental for seniors?" (paragraph, 2 sentences: "No. Original Medicare does not cover routine dental...")
- "What is the difference between Medicare Advantage dental and a standalone dental plan?" (paragraph, 3 sentences)
- "Which dental plan has a community-rated premium so my age does not affect the price?" (paragraph, 1-sentence lead: "Mutual of Omaha Dental Preferred and Ameritas PrimeStar Care Complete both use community-rated or age-neutral pricing...")
- "Can someone over 65 get a dental plan with no waiting period for crowns?" (paragraph, lead with "Yes")

### Supporting table under H3 "Dental Plans for Seniors: At a Glance"
| Plan | No Major Wait | Annual Max | Lifetime Implant Cap | Age-Neutral Pricing | Est. Monthly |
|---|---|---|---|---|---|
| Mutual of Omaha Dental Preferred | Yes | Up to $5,000 | $3,000 | Yes (community-rated) | ~$90 |
| Ameritas PrimeStar Care Complete | Yes | $2,000 (yr 1), $3,500 (yr 2+) | $1,000 (yr 1), $1,500 (yr 2+) implant sub-cap* | Yes (age-neutral) | ~$56 |

*Implant sub-cap on Ameritas is deducted from the annual maximum, not in addition to it.

### Entity weave-in
Medicare gap, Original Medicare dental exclusion, standalone dental plan, community-rated pricing, guaranteed issue, DenteMax Plus, TruAssure (administrator, not underwriter), selectable annual maximum.

---

## QUERY 4: "dental insurance that covers implants 2026"
**Cluster 8 | SSOT: mutual-of-omaha-dental.md, ameritas-primestar.md, guardian-premier-ppo.md**

### Snippet format: TABLE (for "which plan" + "lifetime maximum" angle) + PARAGRAPH (for "does dental insurance cover implants" angle)

The query splits into two intent types on SERP:
- Informational: "does dental insurance cover implants" -- Google pulls a paragraph
- Comparative: "which plan has the highest lifetime implant maximum" -- Google pulls a table or list

Put both formats on the page. The paragraph goes first (for the informational snippet), the table goes second (for AI extraction and PAA).

### Heading wording (H2)
```
Does Dental Insurance Cover Implants in 2026?
```

### Answer paragraph (55-70 words, immediately under H2)
```
Yes, several PPO plans cover dental implants in 2026, but coverage varies significantly by plan. Mutual of Omaha Dental Preferred covers implants from day one at a graduated rate (20% in-network in year one, rising to 50%) with a separate $3,000 lifetime implant maximum. Ameritas PrimeStar Care Complete also covers implants from day one at the major rate, with an annual implant sub-cap of $1,000 in year one and $1,500 after. Guardian Premier 2.0 covers implants at 60% in-network after a 12-month wait, capped at a $1,250 lifetime maximum.
```

### H3: "Which Dental Plan Has the Highest Lifetime Implant Maximum?"
Table immediately under H3:

| Plan | Implant Coverage | Waiting Period | Lifetime or Annual Cap | Est. Monthly |
|---|---|---|---|---|
| Mutual of Omaha Dental Preferred | 20% yr 1, 50% yr 2+ in-network | None | $3,000 lifetime | ~$90 |
| MetLife NCD Complete | 10% yr 1, 50% yr 2, 60% yr 3+ | None | $3,000/calendar year | ~$100 |
| Humana Extend 5000 | 50% yr 1, 60% yr 2+ (after 6-month wait) | 6 months (cannot be waived) | $2,000/yr, $4,000 lifetime | ~$100 |
| Ameritas PrimeStar Care Complete | 20% yr 1, 50% yr 2+ | None | $1,000 yr 1 / $1,500 yr 2+ (deducted from annual max) | ~$56 |
| Guardian Premier 2.0 | 60% in-network | 12 months | $1,250 lifetime (separate from annual max) | ~$70 |

Table caption: "Dental Plans That Cover Implants 2026: Lifetime and Annual Maximums Compared". Do NOT conflate annual caps with lifetime caps in table copy; note which cap type applies per row.

### Key do-nots for on-page copy (enforces SSOT accuracy)
- Do not describe Guardian's $1,250 implant cap as part of its annual maximum (it is a separate lifetime cap)
- Do not describe Ameritas implant sub-cap as additive to the annual maximum (it is deducted from it)
- Do not call the Mutual of Omaha $3,000 cap "annual" (it is a true lifetime cap, not resetting)
- Do not call the MetLife NCD implant cap "lifetime" (it is $3,000 per calendar year)
- Do not omit the Humana implant wait (6 months, cannot be waived)

### PAA chain (H3s)
- "What is the lifetime maximum for dental implants on Mutual of Omaha Dental Preferred?" (1-sentence answer: "$3,000 per person, separate from the calendar-year maximum.")
- "Does Guardian PPO cover implants?" (paragraph, 2 sentences: "Yes, after a 12-month waiting period...")
- "Can I get dental insurance that covers a bone graft for an implant?" (paragraph, 2 sentences)

---

## QUERY 5: "dental insurance for kids braces 2026"
**Cluster 3 | SSOT: guardian-premier-ppo.md, delta-dental-ppo-premium.md**

### Snippet format: PARAGRAPH (for "does" question) + ORDERED LIST (for "best plan" angle)

### Heading wording (H2)
```
Which Dental Insurance Covers Braces for Kids in 2026?
```

### Answer paragraph (50-65 words)
```
Two PPO plans cover child orthodontics on individual plans in 2026. Guardian Premier 2.0 covers dependent children under 19 at 60% in-network, up to $750 per benefit year and a $1,500 lifetime orthodontic maximum, after a 12-month waiting period. Delta Dental PPO Premium covers both children and adults at 50% in-network up to a $1,500 lifetime maximum, after a 12-month wait, with a separate $50 orthodontic deductible.
```

### Critical accuracy notes enforced by SSOT
- Guardian pays the child ortho benefit in installments of up to $750 per year, not as a lump sum. The $1,500 lifetime maximum takes at least two years to fully realize.
- Guardian does NOT cover adult orthodontics on any individual plan. Never state otherwise.
- Delta Dental PPO Premium is sold in only 16 states plus DC, not nationwide.

### PAA chain (H3s)
- "Does Guardian PPO cover braces for children under 19?" (paragraph, 2 sentences, lead "Yes, after a 12-month wait...")
- "How much will dental insurance pay for my child's braces?" (paragraph: "$750 per year up to $1,500 lifetime on Guardian Premier 2.0, after the 12-month wait and deductible...")
- "Can I get dental insurance that covers braces without a 12-month waiting period?" (paragraph: "On individual PPO plans in 2026, both plans that cover child orthodontics -- Guardian and Delta Dental -- include a 12-month waiting period. There is no individual PPO plan on this shelf that covers braces with no wait.")

### Entity weave-in
Dependent orthodontics, lifetime orthodontic maximum, child ortho waiting period, DentalGuard Preferred, in-network orthodontist, Invisalign as braces equivalent (Delta Dental covers clear aligners on the same terms), pediatric dental essential health benefit.

---

## QUERY 6: "best dental insurance for families 2026"
**Cluster 2 | SSOT: humana-extend-5000.md, guardian-premier-ppo.md, mutual-of-omaha-dental.md**

### Snippet format: ORDERED LIST with scenario qualifiers

### Heading wording (H2)
```
What Is the Best Family Dental Insurance Plan in 2026?
```

### Answer list (immediately under H2, 3 items)
```
1. Humana Extend 5000: best for families wanting a high annual maximum with vision and hearing bundled. $5,000 annual maximum per person, 80% on fillings after a 90-day wait, 50% on major after 6 months. Bundles dental, vision, and hearing (TruHearing) on one plan. (~$100/mo per adult estimate)

2. Guardian Premier 2.0: best for families with young children who may need braces. 85% on fillings from day one (no wait), child orthodontics at 60% in-network up to $1,500 lifetime (12-month wait), $3,000 annual maximum. (~$70/mo per adult estimate)

3. Mutual of Omaha Dental Preferred: best for families who want no waiting period on any service. No wait on preventive, basic, or major. Selectable annual maximum up to $5,000. Community-rated pricing. (~$90/mo estimate at the $5,000 tier)
```

### PAA chain
- "How does a family dental deductible work compared to an individual deductible?" (paragraph, 3 sentences explaining per-person vs. aggregate family caps)
- "What dental insurance gives the highest annual maximum per person for families?" (1 sentence: "MetLife NCD Complete offers the highest at $10,000 per person per year, though the year-one major rate is 10%.")
- "Does Humana or Delta Dental have better family coverage in 2026?" (paragraph, 3 sentences comparing scenario fit)

---

## QUERY 7: "dental insurance after losing job 2026 / COBRA gap"
**Cluster 11 | SSOT: ameritas-primestar.md, aetna-dental-direct.md, mutual-of-omaha-dental.md**

### Snippet format: NUMBERED LIST (steps)
Rationale: "I just got laid off" is a how-to/what-to-do query. Google pulls numbered steps from pages that organize the answer as a process.

### Heading wording (H2)
```
How to Get Dental Insurance After Losing Your Job in 2026
```

### Answer list (4 steps, immediately under H2)
```
1. Check your COBRA window. A job loss is a qualifying event that gives you 60 days to elect COBRA continuation of your employer plan. COBRA dental typically costs more than an individual plan because you pay the full group premium.

2. Compare COBRA cost to an individual plan. Most individual PPO dental plans cost $30 to $100 per month. Ameritas PrimeStar Care Complete covers major work with no waiting period and can start as soon as the next day, making it the strongest bridge plan for someone with immediate dental needs.

3. Note the 90-day waiver rule on Aetna Dental Direct. If you enroll in Aetna Dental Direct within 90 days of losing your employer coverage, the 6-month basic and 12-month major waiting periods are both waived, so you can access basic and major services immediately.

4. Apply before your gap exceeds 63 days. Delta Dental PPO Premium and Mutual of Omaha waive major waiting periods with prior comparable coverage and a gap under 63 days.
```

### PAA chain
- "Is COBRA dental coverage worth it compared to an individual plan?" (paragraph, 2 sentences)
- "How quickly can I get dental insurance after losing my job?" (paragraph: "Ameritas PrimeStar Care Complete can start as soon as the next day...")
- "What dental insurance has no waiting period after a COBRA gap?" (paragraph, 2 sentences)

### Entity weave-in
COBRA qualifying event, 60-day special enrollment period, prior coverage waiver, 90-day coverage gap window, next-day dental activation, individual dental plan vs. COBRA cost comparison.

---

## QUERY 8: "dental insurance Aetna CVS rewards / dental plan with CVS benefits"
**Cluster 9 | SSOT: aetna-dental-direct.md**

### Snippet format: PARAGRAPH (low competition -- likely to win fast)
Rationale: The web search shows zero competitors publishing dedicated pages about dental insurance plus CVS ExtraCare Plus. This is a zero-competition snippet opportunity. A precisely worded paragraph will be extracted by AI Overviews almost immediately after indexing.

### Heading wording (H2)
```
Which Dental Insurance Plan Comes With a CVS ExtraCare Plus Membership?
```

### Answer paragraph (60-75 words, precisely worded for AI extraction)
```
Aetna Dental Direct (underwritten by Aetna Life Insurance Company, part of the CVS Health family of companies) is the only individual PPO dental plan that includes a CVS ExtraCare Plus membership. Enrollees on the Direct Preferred PPO and Direct Core PPO tiers receive a $10 monthly bonus reward loaded to their ExtraCare card (up to $120/year), 20% off CVS Health brand products on non-sale items, and free CVS.com shipping on qualifying orders. The benefit is not available in GA, LA, MN, MO, NY, NJ, OK, TX, or VA, and requires one-time registration through Aetna. Annual dental maximum: $1,250 per person.
```

### PAA chain
- "How does the CVS $10 monthly reward work with Aetna dental?" (paragraph, 3 sentences covering the single-transaction rule, no rollover, and registration step)
- "What states is the Aetna dental CVS ExtraCare Plus benefit not available in?" (list: GA, LA, MN, MO, NY, NJ, OK, TX, VA)
- "Does the $10 CVS reward roll over if I do not use it?" (1 sentence: "No. The $10 monthly bonus reward does not roll over; it must be used in a single transaction before the end of each month.")

### Entity weave-in
CVS ExtraCare Plus, CVS Health family of companies, Aetna Life Insurance Company, ExtraCare card, $10 monthly bonus reward, single-transaction rule, 20% CVS Health brand discount, non-sale items, free Rx delivery, oral care products, Aetna Dental PPO 442,000+ locations.

---

## QUERY 9: "best dental insurance for seniors no waiting period implants"
**Cluster 6/8 combined | SSOT: mutual-of-omaha-dental.md, ameritas-primestar.md**

### Snippet format: PARAGRAPH (covers both the no-wait and implant angles in one answer)

### Heading wording (H2)
```
What Dental Insurance Covers Implants With No Waiting Period for Seniors?
```

### Answer paragraph (65-80 words)
```
For seniors who need implants without a waiting period in 2026, two plans stand out. Mutual of Omaha Dental Preferred covers major work and implants from day one (20% in-network in year one, rising to 50%), with a separate $3,000 lifetime implant maximum, a selectable annual maximum up to $5,000, and community-rated pricing that does not increase with age. Ameritas PrimeStar Care Complete also covers implants from day one at the major rate, with age-neutral pricing and coverage starting as soon as the next day. Neither plan covers orthodontics.
```

---

## QUERY 10: "PPO vs DHMO dental insurance which is better"
**Cluster 10 | All 8 plans**

### Snippet format: TABLE (structural comparison) with opening PARAGRAPH

### Heading wording (H2)
```
What Is the Difference Between a Dental PPO and a Dental HMO (DHMO)?
```

### Answer paragraph (45-55 words, opens with a direct answer)
```
A dental PPO lets you see any licensed dentist, in-network or out, without a referral, and typically pays a higher share when you stay in-network. A dental HMO (DHMO) assigns you to a primary dentist, requires referrals for specialists, and usually has lower premiums but no out-of-network access.
```

### Supporting table (H3: "PPO vs DHMO: Quick Comparison")
| Feature | Dental PPO | Dental HMO (DHMO) |
|---|---|---|
| Choose any dentist | Yes | No (assigned network) |
| Referral to specialist | Not required | Required |
| Annual deductible | Typically $50 | Usually none |
| Annual maximum | Yes ($1,000-$10,000) | Usually none |
| Out-of-network access | Yes (at lower benefit) | No |
| Typical premium | Higher | Lower |
| Coverage transparency | Coinsurance percentages | Copay schedule |

Table caption: "Dental PPO vs Dental HMO (DHMO) 2026 Feature Comparison". Markup as plain HTML table.

### PAA chain
- "Can I see any dentist with a PPO plan or do I need to stay in-network?" (1 sentence: "Yes, PPO plans let you see any licensed dentist; in-network dentists are paid a negotiated rate, which reduces your out-of-pocket cost.")
- "Why do PPO dental plans cost more than HMO plans?" (paragraph, 2 sentences)
- "Does a dental PPO require a referral to see a specialist?" (1 sentence: "No.")

---

## QUERY 11: "MetLife NCD Complete highest annual maximum dental plan"
**Cluster 1 subquery | SSOT: metlife-ncd-complete.md**

### Snippet format: PARAGRAPH (short, fact-precise)

### Heading wording (H3 within the MetLife plan story)
```
What Is the Highest Annual Maximum on a Dental Plan in 2026?
```

### Answer paragraph (35-45 words)
```
MetLife NCD Complete (sold as NCD by MetLife, underwritten by Metropolitan Life Insurance Company) carries the highest annual maximum on this shelf at $10,000 per calendar year, resetting every January 1. It runs on the MetLife PDP Plus network with no waiting period and a $100 one-time lifetime deductible.
```

### Critical accuracy
- The $10,000 maximum is per calendar year (resets Jan 1), not a policy-anniversary reset.
- The implant cap is $3,000 per calendar year within the $10,000 maximum (NOT a lifetime cap).
- Major coverage is 10% in year one -- must be stated alongside the high maximum to avoid misleading readers.

---

## QUERY 12: "dental insurance first time buyer self-employed 2026"
**Cluster 15 | SSOT: uhc-primary-dental.md, aetna-dental-direct.md**

### Snippet format: NUMBERED LIST (how-to / what-to-know steps)

### Heading wording (H2)
```
How to Get Dental Insurance as a Self-Employed or First-Time Buyer in 2026
```

### Answer list (4 steps)
```
1. Decide if you mainly need preventive care or expect fillings, crowns, and implants. If just preventive and occasional fillings: UHC Primary Dental at ~$30/mo covers 100% preventive and fillings at 50% from day one with no waiting period. If you expect bigger work: Aetna Dental Direct at ~$50/mo adds major coverage (50% after a 12-month wait) and carries a 442,000-location PPO network.

2. Check the annual maximum. UHC Primary Dental has a $1,000 calendar-year maximum; major work is not covered at all on this tier. Aetna Dental Direct's maximum is $1,250 per calendar year.

3. Consider how fast you need coverage. UHC Primary Dental coverage can start as soon as the day after your application is received. Aetna Dental Direct starts the 1st of the month after enrollment.

4. Note the self-employed tax angle. Dental insurance premiums may be deductible as a business expense for self-employed individuals; consult a tax professional.
```

### PAA chain
- "Is dental insurance worth buying in 2026?" (paragraph, 3 sentences: open with "For most adults, yes...")
- "What does a dental insurance plan actually cover?" (paragraph: "Most PPO plans cover preventive exams and cleanings at 100%, basic work such as fillings at 80%, and major work such as crowns at 50%, subject to an annual maximum...")
- "What is the cheapest dental insurance plan in 2026?" (1 sentence: "UHC Primary Dental is the lowest-premium plan on this shelf at approximately $30 per month for adults ages 18 to 64.")

---

## COMPARISON TABLE MARKUP GUIDANCE

The hub's plan comparison table is the single most extractable element for both AI Overviews and Google Rich Results (though there is no "Dental Plan" rich result type). Markup guidance:

### HTML structure
```html
<section aria-label="PPO dental plan comparison 2026" id="compare-table">
  <h2>PPO Dental Plans 2026: Side-by-Side Comparison</h2>
  <table>
    <caption>8 PPO dental plans compared by annual maximum, deductible, waiting period, implant and orthodontics coverage, and estimated monthly premium. Updated June 2026. All figures are in-network unless noted. Premiums are estimates and vary by state and ZIP.</caption>
    <thead>
      <tr>
        <th scope="col">Plan</th>
        <th scope="col">Annual Max</th>
        <th scope="col">Deductible</th>
        <th scope="col">Basic Wait</th>
        <th scope="col">Major Wait</th>
        <th scope="col">Implants</th>
        <th scope="col">Ortho</th>
        <th scope="col">Est. Monthly</th>
      </tr>
    </thead>
    <tbody>
      <!-- one row per plan -->
    </tbody>
  </table>
</section>
```

Key markup rules:
- `<caption>` must include "2026" and "Updated [month year]" for freshness extraction
- `scope="col"` on all `<th>` elements
- `aria-label` on the section names the block for screen readers and structured-data parsers
- Do NOT use CSS `display:grid` on the table itself -- AI parsers need the table element hierarchy
- A `<tfoot>` row with "All premiums are estimates. Coverage percentages are in-network. Updated June 2026." reinforces freshness for crawlers

### TableCaption entity seeding
Weave into the caption: "annual maximum", "waiting period", "implant coverage", "PPO dental insurance 2026". These are the phrases AI models use to retrieve the table when answering comparison questions.

---

## BEST-FOR GRID MARKUP GUIDANCE

The scenario/best-for grid (scenario finder section) doubles as a machine-readable signal when marked up correctly.

### Recommended structure
```html
<section id="best-for-grid" aria-label="Which dental plan is best for your situation">
  <h2>Which PPO Dental Plan Is Best for You in 2026?</h2>
  <dl>
    <dt>Best dental insurance for no waiting period</dt>
    <dd>Ameritas PrimeStar Care Complete -- covers preventive, basic, major, and implants from day one. Coverage can begin as soon as the next day.</dd>

    <dt>Best dental insurance for seniors over 65</dt>
    <dd>Mutual of Omaha Dental Preferred -- no waiting period, selectable annual maximum up to $5,000, community-rated pricing, $3,000 lifetime implant cap.</dd>

    <dt>Best dental insurance for families with kids who may need braces</dt>
    <dd>Guardian Premier 2.0 -- 85% on fillings from day one, child orthodontics 60% in-network up to $1,500 lifetime (12-month wait, dependents under 19).</dd>

    <dt>Best dental insurance for implants (highest lifetime cap)</dt>
    <dd>Mutual of Omaha Dental Preferred -- separate $3,000 lifetime implant maximum, no waiting period, major benefit available from day one.</dd>

    <dt>Best dental insurance for a first-time buyer or lowest premium</dt>
    <dd>UHC Primary Dental -- approximately $30/month, 100% preventive and 50% basic from day one (ages 18 to 64), no major coverage on this tier.</dd>

    <dt>Best dental insurance with highest annual maximum</dt>
    <dd>MetLife NCD Complete -- $10,000 per calendar year, no waiting period, $100 one-time lifetime deductible. Year-one major coverage is 10%.</dd>

    <dt>Best dental insurance for adult orthodontics or Invisalign</dt>
    <dd>Delta Dental PPO Premium -- 50% coverage for adults and children up to a $1,500 lifetime maximum, 12-month wait. Available in 16 states plus DC.</dd>

    <dt>Best dental insurance that comes with CVS benefits</dt>
    <dd>Aetna Dental Direct -- includes CVS ExtraCare Plus membership with $10 monthly bonus reward (up to $120/year) and 20% off CVS Health brand products. Not available in 9 states.</dd>
  </dl>
</section>
```

The `<dl>/<dt>/<dd>` pattern is the semantically correct "definition list" structure, and AI models extract definition-list `<dt>` as question frames and `<dd>` as answers, replicating the PAA extraction behavior.

### Schema to pair with the best-for grid
Place a FAQPage schema block referencing the same `<dt>/<dd>` pairs in JSON-LD. This creates double extraction: once from the HTML structure and once from the structured data.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which dental insurance plan has no waiting period for major work in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ameritas PrimeStar Care Complete and Mutual of Omaha Dental Preferred both cover major dental work with no waiting period. Ameritas covers implants from day one. Mutual of Omaha pays 20% on major in year one, rising to 50% in year two."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best dental insurance for seniors over 65 in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mutual of Omaha Dental Preferred is a commonly cited standalone PPO option for seniors. It has no waiting period on major work, a selectable annual maximum up to $5,000, community-rated pricing, and a separate $3,000 lifetime implant maximum. Ameritas PrimeStar Care Complete is a second option with age-neutral pricing and next-day activation."
      }
    },
    {
      "@type": "Question",
      "name": "Which dental insurance has the highest annual maximum in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MetLife NCD Complete (sold as NCD by MetLife) has the highest annual maximum on this shelf: $10,000 per calendar year with no waiting period and a $100 one-time lifetime deductible. Year-one major coverage is 10%, rising to 50% in year two and 60% in year three."
      }
    },
    {
      "@type": "Question",
      "name": "What dental insurance covers implants with the highest lifetime maximum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mutual of Omaha Dental Preferred carries a separate $3,000 lifetime implant maximum, available from day one with no waiting period. MetLife NCD Complete covers implants at up to $3,000 per calendar year within a $10,000 annual maximum. Humana Extend 5000 has a $4,000 lifetime implant cap, accessible after a 6-month wait that cannot be waived."
      }
    },
    {
      "@type": "Question",
      "name": "Which dental insurance covers braces for kids in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Guardian Premier 2.0 covers dependent children under 19 at 60% in-network, up to $1,500 lifetime (paid in installments of up to $750 per benefit year), after a 12-month wait. Delta Dental PPO Premium covers both children and adults at 50% in-network up to a $1,500 lifetime maximum after a 12-month wait."
      }
    },
    {
      "@type": "Question",
      "name": "Does Aetna Dental Direct come with a CVS ExtraCare Plus membership?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Aetna Dental Direct (Direct Preferred PPO and Core PPO tiers) includes CVS ExtraCare Plus: a $10 monthly bonus reward up to $120 per year, 20% off CVS Health brand products on non-sale items, and free CVS.com shipping. It is not available in GA, LA, MN, MO, NY, NJ, OK, TX, or VA, and requires registration through Aetna."
      }
    }
  ]
}
```

---

## FRESHNESS + "2026" STRATEGY

### Title and H1
Include "2026" in both the `<title>` tag and the H1. Current hub title "Best PPO Dental Plans 2026: Find the Right Fit" is correct. Do not remove the year.

### `dateModified` schema
Every time hub copy is updated, refresh `"dateModified"` in the Article or WebPage JSON-LD block. The visible date or a `<time>` element near the H1 ("Updated June 2026") reinforces the signal for both Google and AI crawlers.

### Evergreen content + annual date anchoring
Write answer blocks using evergreen language ("in 2026") rather than "this year" so that cached AI model knowledge correctly attributes facts to the year. Example: "As of 2026, Mutual of Omaha Dental Preferred allows a selectable annual maximum up to $5,000..." is more AI-citable than "currently."

### Plan fact sourcing signals
Each answer block benefits from one inline source attribution that AI models can trace. Example: "Per the 2026 Ameritas PrimeStar product guide (form GR 7708 3-26), coverage can begin as soon as the next day." This sentence pattern signals verifiability to AI citation systems (Perplexity in particular cites pages that contain source references).

### Monthly update cadence
Re-verify premium estimates against carrier quote tools each quarter. Update the `dateModified` field each time. A stale dateModified with "2026" in the H1 will eventually cost freshness ranking for the head term "best dental insurance 2026" as the year rolls.

---

## ENTITY COVERAGE CHECKLIST (place across hub, not concentrated in one block)

### Carrier and plan name entities (every plan should appear at least twice in body copy)
- Guardian Premier 2.0 / Guardian Life Insurance Company of America / A++ AM Best
- Ameritas PrimeStar Care Complete / Ameritas Life Insurance Corp. / Classic PPO network
- Mutual of Omaha Dental Preferred / TruAssure (administrator) / DenteMax Plus (400,000+ locations)
- Aetna Dental Direct / Aetna Life Insurance Company / CVS Health / CVS ExtraCare Plus
- Delta Dental PPO Premium / Delta Dental Plans Association / 112,000+ PPO dentists
- Humana Extend 5000 / Humana Insurance Company / TruHearing (hearing bundle)
- UHC Primary Dental / UnitedHealthcare / Golden Rule Insurance Company / AM Best A+
- MetLife NCD Complete / Metropolitan Life Insurance Company / MetLife PDP Plus

### Coverage mechanics entities (distribute across scenario cards, FAQ, and comparison table)
Annual maximum, family maximum, per-person maximum, calendar-year reset, deductible, in-network, out-of-network, PPO network, preventive dental (100%, day one), basic dental (fillings, simple extractions), major dental (crowns, root canals, bridges, dentures, oral surgery), waiting period, day-one coverage, next-day activation, graduated benefit, lifetime implant maximum, implant sub-cap, child orthodontics lifetime maximum, adult orthodontics, Invisalign, clear aligners, community-rated pricing, guaranteed issue, age-neutral pricing, whitening allowance.

### Life-event entities (distribute across scenario cards and FAQ)
COBRA qualifying event, 60-day special enrollment period, Medicare gap, Original Medicare dental exclusion, Medicare Advantage dental, new baby, pediatric dental, first dental visit (AAP age-one recommendation), self-employed, gig worker, no employer plan, retirement, retiree dental, job loss, bridge coverage.

---

## NOTES FOR DOWNSTREAM INTEGRATION

- Spec 09 (schema maximization) should import the FAQPage JSON-LD block above verbatim and add BreadcrumbList and WebPage schema.
- Spec 08 (geo-answer-blocks) should structure each GEO answer block with the exact heading wording specified in this file, so the same heading appears in both the HTML and the FAQ schema.
- Spec 11 (internal-linking-geo) should add a "See also" link from each PAA block to the relevant individual plan page.
- The comparison table HTML structure in this file supersedes any prior table markup; apply `scope="col"`, `<caption>`, and `<tfoot>` freshness note as specified.
- Do not add em-dashes anywhere in the answer blocks. Use commas or rewrite.
- Do not add roman numerals in any list.
- Do not fabricate premium figures; all premiums are labeled "estimate" and sourced to SSOT files.
