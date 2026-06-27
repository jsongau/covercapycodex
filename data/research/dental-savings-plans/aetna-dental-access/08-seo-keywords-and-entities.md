# 08 — SEO, Keywords, Entities, and GEO/AI-Citation Plan

How this page earns rankings in classic Google *and* citations in AI Overviews, ChatGPT, Gemini, Claude, and Perplexity. The category is a monoculture of identical explainers, so the win comes from three things competitors don't do: honest disqualifiers, real dollar math, and the dentist-economics angle — all formatted to be extracted.

---

## 1. Keyword clusters

**Pillar / core comparison (highest value):**
- dental savings plan vs ppo
- dental savings plan vs insurance
- dental discount plan vs dental insurance

**Carrier / brand (this page's primary target):**
- aetna dental access
- aetna dental access reviews
- aetna dental access plan
- is aetna dental access worth it
- aetna dental savings plan
- aetna vital savings
- aetna dental access fee schedule
- aetna dental access participating dentists

**"Worth it" / evaluation:**
- is a dental savings plan worth it
- are dental discount plans worth it
- dental discount card worth it

**Trust / legitimacy (CoverCapy can own these honestly):**
- are dental savings plans a scam
- are dental discount cards a scam
- is aetna dental access legit
- is dentalplans.com legit

**No waiting period / immediate:**
- no waiting period dental insurance
- dental insurance no waiting period for crowns
- dental plan no waiting period implants
- dental coverage that works immediately

**Insurance alternatives / affordability:**
- dental insurance alternatives
- affordable dental coverage
- cheap dental coverage
- cheapest way to get a crown without insurance
- dental coverage for seniors on medicare

**Procedure + audience long-tail:**
- dental savings plan for implants / crowns / braces / dentures
- dental discount plan for seniors / retirees / self-employed

---

## 2. People-Also-Ask / FAQ clusters (deploy as FAQPage schema)

Group into the page's FAQ block. Each answer should open with a self-contained, quotable sentence.

**Definition / comparison**
- What is Aetna Dental Access?
- Is Aetna Dental Access insurance or a discount plan?
- What's the difference between a dental savings plan and a PPO?
- How is Aetna Dental Access different from Aetna PPO insurance?
- What is Vital Savings by Aetna, and is it the same thing?

**Worth it / value**
- Is Aetna Dental Access worth it?
- How much can I actually save with Aetna Dental Access?
- How much does Aetna Dental Access cost?
- Does it have an annual maximum or waiting period?

**Trust / legitimacy**
- Is Aetna Dental Access a scam?
- Is Aetna Dental Access legit?
- Why are there billing complaints about dental discount plans?
- Who actually runs Aetna Dental Access?

**Acceptance / mechanics**
- Do dentists accept Aetna Dental Access?
- How do I use Aetna Dental Access at the dentist?
- Can I use Aetna Dental Access with my insurance?
- Can I use it after I hit my insurance annual maximum?
- How fast does it activate?

**Coverage scope**
- Does Aetna Dental Access cover implants?
- Does it cover braces / orthodontics?
- Does it cover cosmetic work like veneers and whitening?
- Are there pre-existing condition exclusions?

---

## 3. Conversational / voice / AI-assistant phrasings

These are how real situations get typed into ChatGPT, Perplexity, and Google AI Overviews. Pre-answer each in the first 200 words with a quotable verdict.

- "I have no dental insurance and need a crown next week — what's the cheapest way to pay for it?"
- "Is a dental discount plan better than insurance if I need an implant?"
- "My dental insurance has a 12-month waiting period for crowns — is there a way around that?"
- "I already hit my dental insurance maximum — how do I save on the rest?"
- "Are dental discount cards like Aetna Dental Access a scam or do they actually work?"
- "I'm on Medicare with no dental coverage — what are my cheapest options?"
- "I just lost my job and my dental benefits — what can I get that works now?"
- "What's the difference between Aetna Dental Access and Aetna dental insurance?"

---

## 4. Semantic entities / glossary (mark up as DefinedTermSet)

Establishing these terms on the page builds topical authority and gives AI models clean definitions to cite:

annual maximum · waiting period · deductible · coinsurance · copayment · premium · annual membership fee · missing tooth clause · UCR (usual, customary, reasonable) fees · fee schedule · discount fee schedule · in-network / out-of-network · PPO · DHMO · indemnity plan · dental savings plan / discount plan · 100/80/50 coverage structure · preventive / basic / major service tiers · balance billing · predetermination · exclusions and limitations · frequency limitations · discount plan organization (DPO) · provider network · minimum creditable coverage · Medicare / Medicare Advantage dental · FSA / HSA · open enrollment (note: savings plans have none — a quotable differentiator).

Entity relationships to make explicit on-page: *Aetna Dental Access* → (network administered by) → *Aetna Life Insurance Company* → (subsidiary of) → *CVS Health*; *Aetna Dental Access* → (membership administered by) → *New Benefits, Ltd.* / *Careington International*; *Vital Savings by Aetna* → (rides) → *Aetna Dental Access network*.

---

## 5. Schema.org stack (JSON-LD)

- **Article / BlogPosting** with an accurate `dateModified` (recency is a citation signal).
- **FAQPage** with the Q&A set above — the single highest-leverage GEO element. Even after Google deprecated FAQ rich *results* (May 2026), FAQPage markup still drives citations in AI Overviews, Perplexity, and voice.
- **BreadcrumbList** — hub → savings plans → Aetna Dental Access.
- **Table** markup on the comparison and fee-schedule grids (among the most-extracted formats).
- **HowTo** — "How to use Aetna Dental Access at the dentist."
- **DefinedTermSet** — the glossary above.
- **Organization** — CoverCapy, with author/reviewer for E-E-A-T.
- **Offer / Product** — only if quoting a specific plan price, and only from verified, dated sources.

Pages carrying Article + FAQPage + BreadcrumbList are cited roughly twice as often as single-schema pages. Never let schema and visible content disagree.

---

## 6. Internal linking (pillar–cluster)

- **→ `/compare-ppo-dental-plans`** wherever the page says "a PPO may be better for you" — the conversion path for preventive-heavy readers. *PPO facts from `/data/plans/` SSOT only.*
- **→ `/find-my-dentist`** on every "do dentists accept this?" and acceptance mention — turns the category's biggest friction into CoverCapy's service.
- **→ `/dental/{state}/{city}/` geo pages** from senior / affordable / near-me sections — passes authority into the 6,400-page tree.
- **→ individual T5 dentist profiles** from illustration moments (build URLs from slug parts, never `seo_path`).
- This page is a **cluster node** under a future "Dental Savings Plans" pillar; link up to the pillar with pillar-keyword anchors and down to sibling carrier pages (`11-carrier-landscape-matrix.md`).

---

## 7. GEO / AI-citation tactics

- **Answer-first:** the first 200 words must fully answer "what is it / is it worth it" with a quotable verdict.
- **Citation-lifting elements** (per the Princeton GEO study across ~10k queries): adding quotations, statistics, and cited sources materially increases the odds of being quoted by AI engines. Use sourced, dated stat sentences.
- **Self-contained stat sentences,** e.g.: "A single porcelain crown that costs about $1,500 runs roughly $949 with Aetna Dental Access — a ~$551 saving on one visit." Each sentence should survive being lifted out of context.
- **Comparison tables and structured Q&A** — heavily extracted by AI Overviews.
- **E-E-A-T:** named author/reviewer with credentials, Organization schema, transparent sourcing and dates (CoverCapy's `/data/plans/` "sourced and dated" model maps perfectly).
- **First-party authority:** owned sites are a large share of AI citations — CoverCapy's own hub plus the dentist directory are citable assets.
- **Measure:** track target queries weekly across ChatGPT, Perplexity, Gemini, and Google AI Overviews; lift typically appears in 4–8 weeks.

## Sources

- Princeton GEO study (citation-lifting elements): summarized via https://www.mersel.ai/generative-engine-optimization
- Search Engine Land — FAQ schema rise & fall: https://searchengineland.com/faq-schema-rise-fall-seo-today-463993
- Frase — FAQ schema for AI search / GEO / AEO: https://www.frase.io/blog/faq-schema-ai-search-geo-aeo
- GW Content — structured data for SEO 2026: https://www.gwcontent.com/blogs/news/structured-data-for-seo
- NADP — glossary of insurance terms: https://www.nadp.org/wp-content/uploads/2022/09/GlossaryInsuranceTerms_updated_12_31_20.pdf
