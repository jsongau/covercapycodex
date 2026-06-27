# 02 — Competitor, SERP, and GEO Audit
## PPO Plans Hub Rebuild | CoverCapy Research Program
**Date:** 2026-06-26
**Scope:** Competitive + AI-citation landscape for dental insurance / PPO comparison hubs

---

## 1. SERP Landscape Overview

The following queries were analyzed: "best dental insurance," "best dental PPO," "dental insurance for family," "dental insurance for braces," "best dental insurance for seniors." Rankings are assessed qualitatively from observed SERP patterns; no fabricated traffic numbers are included.

**Dominant SERP players (qualitative rank tier):**

| Tier | Domain | Primary SERP Presence |
|------|--------|-----------------------|
| 1 | money.com | "best dental insurance" broad, family, braces |
| 1 | nerdwallet.com | Medicare dental, health bundles, senior dental |
| 1 | valuepenguin.com | braces, PPO specifics, cost comparison |
| 1 | seniorliving.org | seniors, Medicare-adjacent |
| 1 | theseniorlist.com | seniors, Medigap dental |
| 2 | forbes.com/advisor | general "best dental insurance" |
| 2 | investopedia.com | general "best dental insurance" |
| 2 | bankrate.com | general "best dental insurance" |
| 2 | policygenius.com | general "best dental insurance" |
| 2 | dentalcoverageguide.com | scenario-first rising challenger |
| 3 | dentalplans.com | marketplace/transactional |
| 3 | spiritdental.com | no-waiting-period angle |
| 3 | humana.com | orthodontic insurance (owned carrier) |

---

## 2. Player-by-Player Analysis

### 2.1 Money.com
**URL:** https://money.com/best-dental-insurance/
**Title format:** "5 Best Dental Insurance Plans of June 2026"
**Date-freshness signal:** Month + year in title (strong GEO/AI signal)

**Page format:**
- Short expert editorial intro (2-3 sentences)
- Star-rated winner cards with category labels: "Best for Braces," "Best for Value," "Best Overall"
- Brief pros/cons per plan
- "How we chose" methodology section
- No interactive widgets, no family math, no scenario tool

**Schema observed:** Article schema; likely FAQPage (common Money format)

**Plans featured:** Delta Dental (Best for Braces), Spirit Dental (Best for Value), Denali Dental, Ameritas, Guardian

**GEO/AI citation signals:**
- Month + year in title improves Perplexity recency weighting (~30% citation lift per 2026 research)
- Category-label format ("Best for Braces") is highly extractable by LLMs
- No original proprietary data; relies on editorial scoring

**Weaknesses:**
- No family economic math (family deductible stacking, multi-member maximums)
- No scenario finder or interactive element
- No loyalty/rewards angle (CVS perks, Humana loyalty)
- Plans change with affiliate relationships; inconsistent over time
- No distinction between child and adult orthodontics coverage
- Thin on 65+ Medicare-adjacent detail

---

### 2.2 NerdWallet
**URL:** https://www.nerdwallet.com/article/insurance/best-dental-insurance (redirects; main dental hub)
**Medicare dental URL:** https://www.nerdwallet.com/insurance/medicare/best-medicare-dental-plans

**Page format:**
- NerdWallet Star Rating system (0-5 stars, proprietary methodology)
- Plan cards with score, premium estimate, network size
- Separate "best for" categories per card
- Heavy cross-linking to state-specific and Medicare-specific sub-pages
- "How we rank" methodology block

**Schema observed:** Likely Article + FAQPage (standard NerdWallet template)

**Primary dental focus:** Medicare Advantage dental (seniors) and health+dental bundling

**GEO/AI citation signals:**
- High domain authority means ChatGPT training data heavily features NerdWallet
- Encyclopedic, neutrally-framed language matches ChatGPT citation preference
- Structured H2/H3 hierarchy with direct-answer blocks

**Weaknesses:**
- Core dental (non-Medicare) page is less prominent than health insurance hub
- No scenario-first UX; plan-first structure only
- No family economics breakdown
- No CVS/loyalty perk angle
- Primarily discovery; weak conversion path for independent PPO buyers

---

### 2.3 ValuePenguin
**URL:** https://www.valuepenguin.com/best-dental-insurance-braces

**Page format (braces page):**
- Lead paragraph: direct answer ("Humana has the best dental insurance for braces, $18/mo")
- Quote tool embed at top (zip code, age, coverage status)
- Winner cards: Best for most people / Best for network / Best for bundled
- "How orthodontic insurance works" explainer section with a worked example ($6,000 braces cost breakdown)
- FAQ block at bottom
- Methodology note

**Schema observed:** Article, FAQPage confirmed in meta

**GEO/AI citation signals:**
- Direct answer in opening sentence is highly extractable (matches ChatGPT 44% first-30%-of-page rule)
- Numeric example (cost breakdown) is original-feeling proprietary data
- Updated June 26, 2026 (recency signal)
- FAQPage confirmed

**Weaknesses:**
- Braces page covers only 3 companies; not comprehensive
- No distinction between child vs. adult braces coverage mechanics
- No family multi-member orthodontic math
- Quote tool is generic (not scenario-specific)
- No mention of Guardian child ortho vs. Delta Dental adult ortho distinction

---

### 2.4 SeniorLiving.org
**URL:** https://www.seniorliving.org/insurance/dental/best/
**Title:** "Best Dental Insurance Plans for Seniors in 2026"

**Page format:**
- Authored byline with publication date (June 2026 update)
- Plan cards with monthly cost, annual max, notable features
- "Best for" category labels (Best Loyalty Program, No Waiting Periods, Comprehensive)
- Top picks: Spirit Dental (best loyalty), Mutual of Omaha (no waiting periods), Aetna (comprehensive)
- FAQ section

**Schema observed:** Article, FAQPage, author metadata

**GEO/AI citation signals:**
- Strong author attribution and publication date
- "Best for seniors" framing is AI-extractable for the 65+ query
- Consistent domain focus on senior audience (topical authority signal)

**Weaknesses:**
- Does not address Medicare Advantage vs. standalone plan decision framework in depth
- No family economics (seniors + spouse coverage math)
- No implant cost math or lifetime benefit analysis
- Spirit Dental "best loyalty" claim is for a different kind of loyalty than CVS/pharmacy perks

---

### 2.5 TheSeniorList.com
**URL:** https://www.theseniorlist.com/insurance/dental/best/
**Title:** "The 6 Best Dental Insurance Plans for Seniors in 2026"

**Page format:**
- Affiliate disclosure at top
- Plan cards with editor star rating
- Coverage tables per plan
- Separate Medigap dental page (https://www.theseniorlist.com/medigap/best/dental/)
- FAQ block

**Schema observed:** Article, FAQPage, author metadata

**GEO/AI citation signals:**
- Paired pages (standalone + Medigap) create topical authority cluster
- Consistent 2026 date signal
- Moderate domain authority; strong in senior-specific vertical

**Weaknesses:**
- Affiliate-first structure (commission disclosure prominent) can reduce AI trust signals
- Plan cards feel generic; no memorable scenario framing
- No calculator or interactive widget
- No family-of-seniors scenario (covering a spouse, combined deductibles)

---

### 2.6 Forbes Advisor
**Approach (from available research):**
- Analyzed multiple dental insurers for out-of-network, cost, and coverage breadth
- Recognized Anthem as best for out-of-network coverage
- Scoring categories include: costs, deductibles, waiting periods, coverage and reimbursement levels
- Standard category-label card format

**GEO/AI citation signals:**
- High domain authority (Forbes brand recognized across ChatGPT training data)
- Structured methodology ("we analyzed X companies on Y criteria") is GEO-friendly

**Weaknesses (inferred):**
- No scenario-first UX; plan-list format
- No family economics math
- No CVS/loyalty angle
- Forbes Advisor content tends to be comprehensive but generic; lacks memorable differentiators

---

### 2.7 Investopedia
**Approach (from available research):**
- Analyzed 17 dental insurance providers
- Calls out Delta Dental Premium PPO for highest annual maximum
- Standard "best of" format with methodology disclosure
- Likely uses Article + FAQPage schema (standard Investopedia template)

**GEO/AI citation signals:**
- High domain authority; Investopedia is a known ChatGPT training source
- Encyclopedic, definition-heavy writing style matches ChatGPT citation preference

**Weaknesses:**
- Generic plan-first format
- No scenario finder, no family calculator
- No CVS/loyalty or pharmacy integration angle
- Thin on scenario-to-plan mapping

---

### 2.8 Bankrate
**Approach (from available research):**
- Standard "best dental insurance" listicle
- Scoring based on coverage, premiums, network, customer satisfaction
- Paywalled or heavily ad-interrupted in current state

**GEO/AI citation signals:**
- High domain authority
- Standard format; not differentiated

**Weaknesses:**
- No scenario-first UX
- No interactive tools
- Heavy ad load reduces page quality signals for AI citation
- No family economics or loyalty perks angle

---

### 2.9 Policygenius
**Approach (from available research):**
- Comparison marketplace with quote tool
- Plan-first; transactional intent
- Coverage tables per plan

**GEO/AI citation signals:**
- Moderate domain authority
- Quote tool creates engagement but does not produce AI-citable answer blocks
- Marketplace structure (transactional) less favored by ChatGPT than editorial authority pages

**Weaknesses:**
- Transaction-first, not education-first; LLMs cite information sources over marketplaces
- No scenario-first UX
- No unique angle (braces, seniors, family economics, loyalty)

---

### 2.10 DentalPlans.com
**URL:** https://www.dentalplans.com/
**Position:** Largest dedicated dental plan marketplace (founded 1999)

**Approach:**
- Self-described as largest marketplace for dental savings plans + dental insurance
- Audience segments: students, seniors, parents, families, businesses
- Blog with educational content (ACA dental, Medicare dental coverage)
- Comparison tool by zip code

**GEO/AI citation signals:**
- Long domain history and topic concentration = topical authority
- Blog content targets informational queries (ACA, Medicare, waiting periods)
- Marketplace structure limits AI citation relative to editorial sites

**Weaknesses:**
- Marketplace UX not scenario-first
- No memorable family economics content
- No pharmacy/CVS loyalty angle
- Less editorial authority vs. NerdWallet/Money for citation purposes

---

### 2.11 DentalCoverageGuide.com (Rising Challenger)
**URL:** https://dentalcoverageguide.com/guides/best-plans/
**Title:** "Best Dental Insurance Plans in 2026: Find the Right Coverage for Your Situation"
**Updated:** June 19, 2026

**Page format (most sophisticated of the competitors observed):**
- Opening: "The best dental insurance plan isn't one specific policy -- it's whichever one fits your situation"
- Key statistics block with cited sources (ADA, CareQuest, KFF, NADP, Delta Dental)
- Plan type explainer table (PPO, DHMO, Indemnity, Discount)
- Coverage tier table (Preventive/Basic/Major/Ortho with typical % paid)
- Scenario routing table: "Your Situation / What to Prioritize / Deep-Dive Guide" with internal links
- Data visualization: bar chart comparing insured vs. uninsured preventive care rates
- Cost comparison table by plan type
- "What dental insurance won't cover" section
- Full FAQ block with 6 questions
- Sources section with 10+ cited, dated external references

**Schema observed:** Article, likely FAQPage (confirmed in meta keywords structure)

**GEO/AI citation signals:**
- Scenario routing table is highly extractable by LLMs ("if X, then Y")
- Proprietary data presentation (chart: 67% insured vs. 28% uninsured preventive visits)
- Named, dated, linked sources throughout (mutual verification web = Perplexity preference)
- Freshness: June 2026 update date visible
- "Find the right coverage for your situation" framing directly mirrors AI query intent
- Self-contained answer blocks in each scenario section
- 13-minute read length signals comprehensive coverage

**Weaknesses:**
- No interactive widget (scenario finder is table-only)
- No specific featured plan recommendations with premium + benefit detail
- No family deductible stacking math
- No CVS/pharmacy loyalty angle
- No braces-specific child vs. adult distinction with featured plan picks
- No 65+ Medicare gap analysis with specific plan recommendations

---

## 3. GEO / AI Citation Landscape

### 3.1 How AI Platforms Cite Dental Insurance Content (2026)

Based on analysis of 680 million citations (source: https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026):

**ChatGPT:**
- Bing-powered retrieval for commercial-intent queries ("best dental insurance comparison," "dental insurance for braces")
- Cites only 15% of pages retrieved; selection favors clean H1/H2/H3 structure, FAQ schema, direct-answer blocks
- FAQ schema correlates with 40% higher citation weighting
- 44% of citations come from first 30% of page content; front-load answers
- Wikipedia-style encyclopedic framing preferred (neutral, factual, comprehensive)
- Commercial-intent queries trigger web search 53% of the time vs. 19% for informational queries

**Google AI Overviews:**
- Semantic completeness is strongest predictor (r=0.87 correlation)
- Structured data markup: 73% citation rate improvement
- Multi-modal content (text + images + tables) shows 156% higher selection
- Only 17-38% of AI Overview citations now come from top-10 organic results (down from 76% in mid-2025)
- FAQ rich results deprecated May 2026, but FAQPage schema still benefits AI citation

**Perplexity:**
- Real-time retrieval; new content cited within hours of indexing
- Averages 21.87 citations per response (highest of any platform)
- Favors question-format H2/H3 headings, visible statistics with methodology, named sources
- Content published within last 30 days cited at 82% rate
- "2026" in titles and headings improves citation rate ~30%
- Reddit accounts for 46.7% of Perplexity's top citation sources (community discussion value)

**Universal signals across all three:**
- E-E-A-T: named author, credentials, publication date, external citations
- Original proprietary data ("only 3.4% of enrollees reach the annual max")
- Semantic completeness: self-contained paragraphs that answer without needing context
- Regular updates (pages updated within 6 months are 2x more likely to be cited)
- Earned media distribution increases AI citations up to 325% vs. owned-only

### 3.2 What Gets Dental Insurance Content Cited by AI (Specific Patterns)

From observed SERP + AI behavior on dental insurance queries:

**High-citation content patterns:**
- Direct-answer opening: "Humana has the best dental insurance for braces, at $18/mo" (ValuePenguin lead)
- Scenario-to-recommendation tables: "If you need braces for a child, Guardian covers dependents at 50% up to $1,500 lifetime"
- Numeric explainers: worked cost example ($6,000 braces broken down to out-of-pocket)
- Statistics with cited sources: "27% of US adults -- roughly 72 million -- had no dental insurance in 2024 (CareQuest)"
- Category labels that mirror query intent: "Best for Seniors," "Best for Braces," "Best No Waiting Period"

**Low-citation content patterns:**
- Generic plan-list without scenario context
- Quote/comparison tools without accompanying editorial answer blocks
- Content without visible dates or author attribution
- Pages heavy in ads with low text-to-content ratio

---

## 4. Scenario Coverage Gap Analysis

The following scenarios are how real buyers search. The audit maps each to competitor coverage quality.

| Scenario / Query | Best Competitor Coverage | Coverage Quality | Gap for CoverCapy |
|-----------------|--------------------------|-----------------|-------------------|
| "dental insurance for kids braces" | Money (Delta Dental card), ValuePenguin (braces page) | Moderate -- no child vs adult distinction | Guardian child ortho scenario with per-family math |
| "dental insurance for adult braces" | Money (Delta Dental mention) | Weak -- buried, not headlined | Delta Dental adult ortho scenario with worked cost |
| "dental insurance for seniors / no Medicare dental" | SeniorLiving.org, TheSeniorList, NerdWallet Medicare | Strong -- well covered | Mutual of Omaha 65+ no-waiting-period + implant angle |
| "dental insurance for a family" | DentalCoverageGuide (scenario table), Money | Moderate -- no multi-member math | Family deductible stacking, per-member max, Humana $5K max |
| "dental insurance CVS rewards / pharmacy perks" | None observed | Gap -- no competitor covers this | Aetna + CVS ExtraCare Plus, $10/mo CVS reward |
| "dental insurance no waiting period" | DentalCoverageGuide (deep-dive link), Spirit Dental | Moderate | Ameritas PrimeStar day-one major coverage scenario |
| "cheapest dental insurance" | NerdWallet, ValuePenguin | Strong | UHC Primary entry angle, budget scenario |
| "dental insurance for implants" | DentalCoverageGuide (deep-dive link) | Moderate -- generic | Mutual of Omaha lifetime implant benefit with cost math |
| "best PPO dental plan 2026" | medicalinsurancetoday.com (Mutual of Omaha focus) | Thin | CoverCapy 8-plan comparison with scenario routing |
| "dental insurance family deductible how it works" | None strong observed | Major gap | Family aggregate vs. per-person deductible explainer |
| "Humana dental loyalty discount" | Humana.com only (owned carrier) | Thin editorial | Humana Extend 5000 family + loyalty economics |

---

## 5. Structural and Format Patterns Across Competitors

### 5.1 Universal formats observed
- "Best of" listicle with category-labeled cards (universally used)
- Methodology disclosure section (GEO/trust signal)
- FAQ block at page bottom (required for FAQPage schema)
- Internal cross-links to sub-scenario pages (seniorliving.org, dentalcoverageguide.com)

### 5.2 Formats used by top performers only
- Scenario routing table with "your situation / what to prioritize / deep-dive link" (dentalcoverageguide.com)
- Worked numeric example (ValuePenguin braces cost breakdown)
- Cited external statistics with linked sources (dentalcoverageguide.com, NerdWallet)
- Data visualization / chart (dentalcoverageguide.com insured vs. uninsured bar chart)
- Named author with credentials and update date (all top players)

### 5.3 Formats used by no competitor (CoverCapy opportunity)
- CVS/pharmacy loyalty integration and shopping path
- Family deductible stacking calculator or illustrated math
- Child vs. adult orthodontics scenario side-by-side
- "Plan story" narrative voice per plan (CoverCapy brand differentiator)
- Scenario-first interactive finder routing to specific plan recommendation
- Capy rewards integration
- Per-member family maximum math illustrated with real plan numbers
- 65+ Medicare-gap scenario with specific standalone plan recommendation + worked annual cost

---

## 6. Schema Usage Summary

| Competitor | Article | FAQPage | ItemList | BreadcrumbList | Author/Person |
|-----------|---------|---------|---------|---------------|--------------|
| money.com | Yes | Likely | No | Yes | Yes |
| nerdwallet.com | Yes | Yes | Likely | Yes | Yes |
| valuepenguin.com | Yes | Yes | No | Yes | Yes |
| seniorliving.org | Yes | Yes | No | Yes | Yes |
| theseniorlist.com | Yes | Yes | No | Yes | Yes |
| dentalcoverageguide.com | Yes | Likely | No | Yes | Yes |
| forbes.com/advisor | Yes | Yes | Likely | Yes | Yes |
| investopedia.com | Yes | Yes | Likely | Yes | Yes |

**Note:** FAQPage rich results were deprecated from Google Search as of May 2026, but FAQPage schema remains a confirmed AI citation signal for ChatGPT (40% higher citation weighting) and Google AI Overviews (part of E-E-A-T verification). ItemList schema is valid for "best of" hub pages but was narrowed by Google's March 2026 core update to require primary-content alignment.

**CoverCapy schema priority for the PPO hub:** Article + FAQPage + ItemList (for plan list) + BreadcrumbList + potential Product schema per featured plan.

---

## 7. CoverCapy Content Gap Opportunities (Actionable)

The following are specific angles no competitor currently owns or executes well. These represent CoverCapy's differentiation surface.

### 7.1 CVS / Pharmacy Loyalty Integration
No competitor addresses dental insurance + pharmacy perks in a combined hub. The Aetna Dental Direct + CVS ExtraCare Plus angle ($10/mo CVS reward, 20% off CVS Health brand oral care) is entirely uncontested in editorial content.

**AI-citable answer block opportunity:** "Which dental insurance gives you CVS rewards?" -- a question no current competitor page answers. CoverCapy can own the citation.

### 7.2 Family Deductible and Maximum Math
Competitors describe family plans generically. No competitor shows worked math: family aggregate deductible stacking, per-member vs. family maximums, Humana Extend 5000's $5,000 annual max as a family value story. This is the "family economics" angle described in the 00-INDEX.md north star and is absent from all competitors observed.

**AI-citable answer block opportunity:** "How does a family deductible work for dental insurance?" and "What is a good annual maximum for a family dental plan?"

### 7.3 Child vs. Adult Orthodontics Split
ValuePenguin addresses braces generically. No competitor clearly separates: "for your child's braces, Guardian Premier PPO covers dependents at 50% up to $1,500 lifetime / for your own adult braces, Delta Dental PPO Premium covers adults at 50% up to $1,500 with no waiting period after 12 months."

**AI-citable answer block opportunity:** "What dental insurance covers braces for kids?" vs. "What dental insurance covers adult braces?" -- currently answered generically by competitors.

### 7.4 65+ Medicare Gap Scenario with Specific Plan Math
Seniorliving.org and TheSeniorList own the senior dental SERP but rely on Spirit Dental and generic Aetna recommendations. No competitor surfaces Mutual of Omaha's specific 65+ story: selectable annual maximum, lifetime implant benefit, no-wait major coverage as an alternative to Medicare Advantage dental.

**AI-citable answer block opportunity:** "What standalone dental insurance is best for seniors not on Medicare Advantage?" -- a question the senior-focused sites answer generically.

### 7.5 Scenario-First Interactive Routing (vs. Plan-First Lists)
DentalCoverageGuide comes closest with its scenario table, but it links out to separate pages rather than surfacing a matched plan recommendation inline. CoverCapy's interactive scenario finder (per 00-INDEX.md: scenario finder, family builder, plan matcher) can deliver a plan match on the same page, creating engagement and shareability that editorial-only competitors cannot match.

### 7.6 No-Waiting-Period Day-One Coverage Angle
Ameritas PrimeStar's day-one major coverage is a differentiated fact no competitor leads with for the general PPO comparison hub. Only Spirit Dental (a discount plan, not PPO) and some DentalCoverageGuide pages address this.

**AI-citable answer block opportunity:** "Which PPO dental insurance has no waiting period for major work?" -- currently answered only by Spirit Dental owned content or generic listicles.

---

## 8. Key Weaknesses Across the Competitive Set (Summary)

1. **Plan-first, not scenario-first.** Every major competitor leads with a ranked plan list. No one leads with "what's happening in your life and what do you need?"
2. **No family economics math.** Family deductible stacking, per-member vs. aggregate max, multi-member loyalty discounts -- absent everywhere.
3. **No CVS/pharmacy loyalty angle.** Zero editorial coverage of Aetna + CVS ExtraCare Plus as a dental insurance benefit.
4. **No child vs. adult orthodontics separation.** Braces pages treat all buyers the same.
5. **Thin on plan narrative.** Competitors use identical "pros/cons" card formats. No storytelling about why a specific plan fits a specific person.
6. **Weak GEO answer blocks.** Most competitors have FAQs but they are generic ("is dental insurance worth it?"). No competitor has tightly-targeted AI-citable blocks for the CVS, family deductible, or adult-braces questions.
7. **No interactive widgets.** The closest is DentalCoverageGuide's routing table. No one has a scenario finder, plan matcher, or family builder.
8. **No rewards/loyalty integration.** CoverCapy's Capy rewards angle is entirely unoccupied.

---

## 9. Citations

- https://money.com/best-dental-insurance/
- https://www.nerdwallet.com/insurance/medicare/best-medicare-dental-plans
- https://www.valuepenguin.com/best-dental-insurance-braces
- https://www.seniorliving.org/insurance/dental/best/
- https://www.theseniorlist.com/insurance/dental/best/
- https://www.theseniorlist.com/medigap/best/dental/
- https://dentalcoverageguide.com/guides/best-plans/
- https://www.dentalplans.com/dental-insurance/
- https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026
- https://www.beckersdental.com/benchmarking/5-best-dental-insurance-companies-forbes/
- https://www.digitalapplied.com/blog/schema-markup-after-march-2026-structured-data-strategies
- https://alevdigital.com/blog/faq-structured-data-2026/
- https://quickseo.ai/blog/chatgpt-vs-perplexity-for-ai-visibility-in-2026-citations-traffic-and-conversion-compared
- https://www.prnewswire.com/news-releases/5w-releases-ai-platform-citation-source-index-2026-the-50-websites-that-now-decide-what-brands-are-visible-inside-chatgpt-claude-perplexity-gemini-and-google-ai-overviews-302759804.html
- https://spaceandstory.co/for/dentists/aeo-for-dental-practices
- https://www.humana.com/dental-insurance/dental-resources/orthodontic-insurance
- https://www.cigna.com/knowledge-center/orthodontic-insurance
- https://medicalinsurancetoday.com/best-ppo-dental-insurance-2026/
- https://www.carequest.org/about/press-release/new-report-685-million-adults-us-dont-have-dental-insurance-may-rise-914
- https://www.kff.org/medicare/coverage-of-dental-services-in-traditional-medicare/

---

*End of 02-competitor-serp-geo-audit.md*
