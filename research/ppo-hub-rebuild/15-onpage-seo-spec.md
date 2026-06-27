# 15 — On-Page SEO Specification: PPO Plans Hub
## /dental-insurance/ppo-plans/ | CoverCapy | Spec 15 of 20 | Updated 2026-06-26

**Status:** PLANNING ONLY. No production changes until all 20 specs and master console are approved and user sign-off is given.

**Dependencies:** This spec is downstream of 03 (keyword map), 04 (IA and URL decisions), and 10 (UX wireframe). Read those first. Spec 15 does not re-argue decisions from those specs; it references them and translates them into implementable on-page directives.

**SSOT rule (CLAUDE.md rule 13):** Every plan-specific fact (premium, deductible, annual maximum, waiting period, coverage percentage, lifetime cap) must be sourced from `/data/plans/{slug}.md` before it appears in any body copy, schema, or meta field. Placeholders in this spec that reference plan facts are written as `{{SSOT: data/plans/{slug}.md}}` to signal where a developer must look before writing the final value. Never invent or carry forward a number without verifying it in the SSOT.

---

## 1. META AND HEAD DIRECTIVES

### 1.1 Title Tag

```
Best PPO Dental Plans 2026: Find the Right Fit | CoverCapy
```

**Character count:** 58 (within 60-character limit)

**Construction notes:**
- Primary keyword cluster ("best PPO dental plans 2026") appears in positions 1 through 5.
- "Find the Right Fit" signals scenario-first intent and differentiates from plan-list competitor titles ("Best Dental Insurance Plans June 2026," "5 Best Dental Insurance Plans").
- "CoverCapy" brand delimiter is a pipe, not an em-dash. Do not use em-dashes anywhere in head metadata or body copy.
- The year "2026" is included because Perplexity cites pages with year signals in titles at approximately 30% higher rates and because all Tier 1 competitors (money.com, seniorliving.org, valuepenguin.com) use year-in-title freshness signaling.
- Do not truncate or abbreviate when implementing. The full 58-character title must be served as written.

### 1.2 Meta Description

```
8 verified PPO dental plans matched to your situation: family, braces, seniors, implants, no waits. Compare, verify your dentist, and enroll free. Updated June 2026.
```

**Character count:** 164 (within 155-character visible limit; Google typically truncates to approximately 155 characters in SERPs, so front-load the most important information in the first 100 characters)

**Revised shorter variant (under 150 chars):**

```
8 verified PPO plans matched to your situation. Family, braces, implants, no waits. Verify your dentist free. Updated June 2026.
```

**Character count (shorter variant):** 128

**Recommendation:** Use the 128-character variant to guarantee no SERP truncation. The developer should confirm final character count against the rendered SERP snippet tool before deployment.

**Construction notes:**
- "8 verified PPO plans" anchors the count claim and must match the actual number of featured plans on the page.
- "matched to your situation" signals scenario-first intent (differentiating from comparison-table competitors).
- "Verify your dentist free" is the primary CTA; it matches the page's conversion goal per spec 10.
- "Updated June 2026" is the freshness signal (update to actual deployment date before publishing).
- No em-dashes. No roman numerals.

### 1.3 Canonical URL

```html
<link rel="canonical" href="https://www.covercapy.com/dental-insurance/ppo-plans/">
```

**Notes:**
- Trailing slash is required (see spec 04, Section 6 canonical table).
- If `vercel.json` has `trailingSlash: false`, confirm that the directory resolution for `dental-insurance/ppo-plans/index.html` is served at the trailing-slash URL. The canonical must match the actually-served URL exactly.
- This canonical is for the PPO Plans hub only. The compare page canonical is separate (spec 04, FLAG-03).

### 1.4 Robots Directive

```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

**Notes:**
- `max-snippet:-1` removes the character limit on SERP snippet extraction. This is important for Google AI Overviews, which pulls longer snippets for citation.
- `max-image-preview:large` allows Google to show the OG image in rich results.
- `noindex` must NOT be set on this page. Confirm that no legacy `noindex` directive is present from any previous draft version.

### 1.5 Open Graph Tags

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Best PPO Dental Plans 2026: Find the Right Fit">
<meta property="og:description" content="8 verified PPO dental plans matched to your situation. Family, braces, implants, no waits. Compare, verify your dentist free. Updated June 2026.">
<meta property="og:url" content="https://www.covercapy.com/dental-insurance/ppo-plans/">
<meta property="og:site_name" content="CoverCapy">
<meta property="og:image" content="https://www.covercapy.com/assets/og/ppo-plans-hub-2026.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{{OG_IMAGE_ALT}}">
```

**OG image alt text guidance (replace `{{OG_IMAGE_ALT}}` before publishing):**
The alt text must describe what is literally visible in the image, not repeat the title tag. Acceptable examples:
- "A grid of eight dental plan cards with scenario labels: family, braces, seniors, no wait."
- "The CoverCapy PPO plan finder showing eight dental insurance options with scenario matching."
- "Illustrated comparison of eight PPO dental plans with coverage labels and scenario icons."

Do not use alt text that merely repeats the title tag. The alt attribute is read by screen readers and used by Google Image Search indexing.

**OG image production requirements:**
- Dimensions: 1200 x 630px (2:1 ratio, renders without cropping on Facebook, LinkedIn, Slack, iMessage).
- Must contain the CoverCapy wordmark.
- Must not use em-dashes in any text overlaid on the image.
- Should visually represent the scenario-first concept (scenario icons or plan cards, not a stock dental photo).
- File path: `/assets/og/ppo-plans-hub-2026.jpg`. If the file is served from a CDN, use the full CDN URL in the `og:image` tag.

### 1.6 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@CoverCapy">
<meta name="twitter:title" content="Best PPO Dental Plans 2026: Find the Right Fit">
<meta name="twitter:description" content="8 verified PPO dental plans matched to your situation. Family, braces, implants, no waits. Verify your dentist free.">
<meta name="twitter:image" content="https://www.covercapy.com/assets/og/ppo-plans-hub-2026.jpg">
<meta name="twitter:image:alt" content="{{OG_IMAGE_ALT}} (same as og:image:alt above)">
```

**Notes:**
- `summary_large_image` is the correct card type for a hub page with a hero image.
- Twitter/X truncates descriptions at approximately 125 characters in the card preview. The description above is 107 characters; it fits without truncation.
- `@CoverCapy` must match the verified Twitter/X handle. If the handle is different, correct it before publishing.

### 1.7 Sitemap Entry

**In `sitemap.xml` (target state per spec 04, Section 7):**

```xml
<url>
  <loc>https://www.covercapy.com/dental-insurance/ppo-plans/</loc>
  <lastmod>{{LASTMOD_DATE}}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.85</priority>
</url>
```

**Notes:**
- Replace `{{LASTMOD_DATE}}` with the ISO 8601 date of each rebuild deployment (e.g., `2026-06-26`). This is the freshness signal Google and Perplexity both weight.
- `changefreq: monthly` is accurate for a hub that will be updated on plan facts and scenario content at least monthly. Do not set `weekly` unless you can guarantee weekly content updates; an inaccurate `changefreq` can suppress crawl priority.
- `priority: 0.85` is the recommended value from spec 04 FLAG-05 (subject to user sign-off). It places the hub above individual plan pages (0.75) and below the homepage (1.0).
- Confirm trailing slash is present in `<loc>` to match the canonical.
- This entry should appear in `sitemap.xml` (the core pages sitemap) AND in `sitemap-content.xml` if that file covers content hub pages. Do not duplicate with different priority values across both files.

---

## 2. ON-PAGE CONTENT ARCHITECTURE

### 2.1 H1 Tag

```
Which PPO dental plan fits your situation?
```

**Notes:**
- Fraunces serif, 38 to 46px per spec 10 hero section. Max 22 characters per line to avoid awkward wrapping on 320px mobile viewports.
- "PPO dental plan" is the primary entity. "your situation" is the scenario-first signal that differentiates this page from plan-list competitors.
- The H1 is a question, which mirrors how real buyers phrase their queries and how AI systems extract questions for citation.
- "which" is a PAA (People Also Ask) trigger word. Google's PAA algorithm favors H1/H2 headings that begin with question words (what, which, how, does, is) because they match PAA format directly.
- Do not add a year to the H1. The title tag and meta description carry the year signal; the H1 is a timeless question that does not need to be updated annually.
- Only one H1 per page.

### 2.2 Full H2 and H3 Outline

The outline below maps each section to the scroll narrative from spec 10, Section 16. H2s are section-level headings. H3s are subsection headings within each section. Question-format headings are used where they capture PAA and GEO query phrasings from spec 03.

---

**H2 (Section: Scenario Finder)**
```
Start with your situation, not a brand name
```
No H3s in this section (the interactive widget handles the sub-questions).

**Keywords placed:** "PPO dental plan," "dental insurance for your situation," "best dental insurance 2026" (woven into lede copy, not in heading itself).

**GEO alignment:** This H2 answers the implicit question "how do I pick a dental insurance plan?" without using that exact phrasing, keeping the heading natural while the answer block directly addresses Cluster 1 and Cluster 15 GEO questions.

---

**H2 (Section: Plan Stories)**
```
Eight PPO plans, each with a story
```

**H3 (UHC subsection):**
```
Who is UnitedHealthcare Primary Dental best for?
```

**H3 (Aetna subsection):**
```
Who is Aetna Dental Direct best for?
```

**H3 (Ameritas subsection):**
```
Who is Ameritas PrimeStar Care Complete best for?
```

**H3 (Guardian subsection):**
```
Who is Guardian Premier PPO best for?
```

**H3 (MetLife subsection):**
```
Who is MetLife NCD Complete best for?
```

**H3 (Mutual of Omaha subsection):**
```
Who is Mutual of Omaha Dental Preferred best for?
```

**H3 (Humana subsection):**
```
Who is Humana Extend 5000 best for?
```

**H3 (Delta Dental subsection):**
```
Who is Delta Dental PPO Premium best for?
```

**Notes on H3 format:**
- Question-format H3s ("Who is X best for?") align with PAA extraction and with AI citation preference for direct-answer content. ChatGPT extracts 44% of its citations from the first 30% of page content; front-loading each plan section with a direct-answer H3 raises the extraction probability for named-plan queries.
- Each H3 must be followed immediately by a lede sentence that directly answers the question (per GEO best practice: answer first, then elaborate).
- Carrier names in H3s must be spelled exactly as they appear in the SSOT files and in the plan page URLs: "UnitedHealthcare," "Aetna Dental Direct," "Ameritas PrimeStar Care Complete," "Guardian Premier PPO," "MetLife NCD Complete," "Mutual of Omaha Dental Preferred," "Humana Extend 5000," "Delta Dental PPO Premium."

---

**H2 (Section: Comparison Table)**
```
How all eight plans compare
```

No H3s in this section. The table caption handles sub-labeling.

**Keywords placed:** all eight plan names as row headers; column headers include "Annual Maximum," "Waiting Period," "Implant Coverage," "Orthodontics," "Best For." These column headers are semantic entities that AI systems extract when answering structured-data queries.

---

**H2 (Section: Best-for Scenarios Grid)**
```
Which plan is best for your specific need?
```

**H3 subsections (one per scenario card):**

```
Which dental insurance is best for kids who need braces?
Which dental insurance covers adult braces or Invisalign?
Which dental insurance is best for seniors over 65?
Which dental insurance has no waiting period for major work?
Which dental insurance is best for dental implants?
Which dental insurance gives you CVS rewards or pharmacy perks?
Which dental insurance is best for a family?
Which dental insurance is the cheapest option?
```

**Notes:**
- Each H3 is an exact-match or near-exact-match for GEO question phrasings from spec 03 clusters 3, 4, 6, 7, 8, 9, 2, and 15 respectively.
- Each H3 must be answered in 2 to 4 sentences immediately below it before any elaboration. The answer is the GEO-citeable block.
- Do not use em-dashes in any H2 or H3. Use commas, colons, or rewrite.

---

**H2 (Section: Family Dental)**
```
Planning dental coverage for more than just yourself
```

**H3 subsections:**
```
How does a family dental deductible work?
What is the best family dental plan combination for kids who need braces?
Which plan covers one adult implant while the rest of the family does maintenance?
```

**Notes:**
- "How does a family dental deductible work?" is a direct PAA pull from Cluster 2. No competitor answers this question with worked math. This H3 plus its answer block is CoverCapy's differentiation surface for the family deductible query.

---

**H2 (Section: Waiting Periods Explainer)**
```
How dental insurance waiting periods work
```

**H3 subsections:**
```
What is a dental insurance waiting period?
Which dental plans have no waiting period?
Can I avoid a waiting period if I had dental coverage recently?
```

**Notes:**
- These H3s are direct matches for GEO questions in Cluster 7. Ameritas PrimeStar and Mutual of Omaha are the named plan answers.

---

**H2 (Section: FAQ)**
```
Dental insurance questions, answered
```

No H3s in the FAQ section. Each FAQ item is a `details/summary` element with the question as `summary`. See Section 2.4 for the FAQ questions and answers, which are also represented in schema in Section 5.4.

---

**H2 (Section: Verify Your Dentist)**
(This section uses a `.verify-band` component per spec 10, not a traditional heading.)

If a semantic heading is needed for accessibility and document outline:
```
Verify that your dentist accepts your plan before you enroll
```

This heading may be visually hidden (`sr-only` class) if the design does not call for a visible H2 in the band.

---

### 2.3 Section-by-Section Keyword and Entity Placement

The table below maps each section to its primary keyword targets, secondary entity mentions, recommended body copy word count range, and image guidance.

---

**HERO SECTION**

Primary keywords: "best PPO dental plans 2026," "find the right dental plan"
Secondary entities: "individual dental insurance," "family dental plan," "dental insurance 2026," "8 verified plans"
Word count: 50 to 80 words (headline + lede + meta pills + chooser label)
Image guidance: No traditional hero image. The "Who needs coverage?" 4-button chooser is the visual focal point. If a background texture or illustration is used, alt text should read: "Illustrated dental plan scenario finder on a warm paper-toned background." No dental stock photos of people in chairs.

Keyword placement rule: The lede sentence (the single sentence below the H1 in the hero) must contain "PPO dental plan" and at least one scenario signal ("your family," "your dentist," "your coverage need," or similar). Example lede draft: "Eight independently reviewed PPO dental plans, matched to your coverage need: whether you are planning a family, watching for braces, or filling a gap after a job change." (Note: verify this lede against spec 18 content outline when it is drafted; spec 15 is providing the keyword brief, not the final copy.)

---

**SCENARIO FINDER SECTION**

Primary keywords: "best dental insurance for [situation]" (all variants), "dental insurance plan finder"
Secondary entities: "waiting period," "day-one coverage," "next-day activation," "dependent orthodontics," "family dental plan," "COBRA gap," "65 and older," "implants"
Word count: 60 to 100 words visible in static copy (the chooser chip labels and answer blocks are the main content; body copy outside the widget should be minimal)
Image guidance: Scenario chip cards each have an SVG glyph icon (per spec 10). Alt text on each icon: describe the scenario, not the glyph shape. Examples: "Tooth icon for cleanings and checkups," "Family icon for family dental coverage," "Senior icon for dental plans for people over 65."

---

**PLAN STORIES SECTION**

Primary keywords: each plan's branded name plus one scenario keyword (e.g., "Guardian Premier PPO braces for kids," "Mutual of Omaha Dental Preferred no waiting period seniors," "Aetna Dental Direct CVS rewards")
Secondary entities: network names (DenteMax Plus, Ameritas Classic PPO, DentalGuard Preferred, Aetna Dental PPO, Delta Dental PPO network), coverage percentage terms (80% basic, 50% major, 100% preventive), plan-specific differentiators
Word count per plan story card: 120 to 250 words per card (narrative prose, not bullet lists). The current page's plan narrative voice should be preserved per spec 00-INDEX north star.
Image guidance: If plan logos are used, each must have a specific alt text: "{Carrier Name} dental insurance plan logo." No decorative images inside plan cards. The mini quick-facts panel (spec 10) is HTML/CSS, no images needed.

Entity placement rule per card: each plan story must mention the plan's network name at least once, the annual maximum at least once (as `{{SSOT: data/plans/{slug}.md}}`), and the waiting period status at least once. These are the three entities AI systems most frequently extract when citing plan-specific queries.

---

**COMPARISON TABLE SECTION**

Primary keywords: "compare PPO dental plans," "dental insurance comparison 2026," "dental insurance annual maximum," "PPO dental plan waiting period"
Secondary entities: all eight plan names as row entities, all column header entities (annual maximum, deductible, waiting period, implant coverage, orthodontics, best for, monthly premium estimate)
Word count: Table caption + introductory paragraph should be 40 to 80 words. The table itself is structured data.
Image guidance: No images in the table. The table caption (visible `<caption>` element) must read: "Eight PPO dental plans compared. Premiums estimated, vary by state and age. Waiting period values verified against carrier SSOT files, updated {{LASTMOD_DATE}}."

Schema note: The table is the content basis for the `ItemList` schema in Section 5.3. Every plan listed in the table must appear in the `ItemList` schema, and every plan in the `ItemList` must appear in the table. They must be in sync.

---

**BEST-FOR SCENARIOS GRID SECTION**

Primary keywords: "best dental insurance for [need]" (all 8 variants from H3 list above)
Secondary entities: scenario-specific plan names (Guardian for kids braces, Delta Dental for adult braces, Mutual of Omaha for seniors, Ameritas for no waiting period, Mutual of Omaha or Ameritas for implants, Aetna for CVS rewards, Humana or Guardian for family, UHC for budget)
Word count per scenario card: 30 to 60 words (concise answer block, not full prose). Each card must answer its H3 question in 1 to 2 sentences, then give the plan name and one key fact.
Image guidance: Scenario card icons per spec 10 (20px SVG glyphs). Alt text: describe the scenario. "Calendar icon for dental insurance with no waiting period." "Tooth with braces icon for dental insurance that covers braces for children."

---

**FAMILY SECTION (NEW)**

Primary keywords: "family dental insurance PPO," "best family dental plan 2026," "family dental deductible," "dental insurance for kids braces and parent maintenance"
Secondary entities: family deductible aggregate, per-member maximum, family maximum cap, Guardian dependent orthodontics, Humana Extend 5000 annual maximum, Aetna CVS perk for two members
Word count: 200 to 350 words (four scenario cards plus explainer prose on family deductible mechanics)
Image guidance: If a family illustration is used, alt text: "Illustrated family of four representing dental coverage scenarios: child with braces, adult, partner, senior parent." No stock photography. The family deductible explainer may use a simple HTML diagram (not an image) showing individual vs. aggregate deductible math.

SSOT requirement: The family section references plan-specific facts (Humana annual maximum, Guardian orthodontic lifetime maximum, Aetna CVS reward structure). Each of these facts must be verified against the respective SSOT file before any copy is written. Use `{{SSOT: data/plans/humana-extend-5000.md}}`, `{{SSOT: data/plans/guardian-premier-ppo.md}}`, and `{{SSOT: data/plans/aetna-dental-direct.md}}` as placeholders until verified.

---

**WAITING PERIODS EXPLAINER SECTION**

Primary keywords: "dental insurance waiting period," "no waiting period dental insurance," "dental insurance waiting period for crowns," "how does a dental insurance waiting period work"
Secondary entities: "day-one coverage," "prior coverage waiver," "90-day coverage gap rule," "next-day activation," "graduated benefit," "year-one vs year-two coverage"
Word count: 180 to 280 words (current page's "Waiting periods: the clock is the product" prose is a strong foundation; preserve its voice)
Image guidance: The visual timeline diagram from spec 10 (CSS-based horizontal bars, no image file). If a PNG/SVG is generated for the timeline, alt text must read: "Timeline chart showing when each of eight PPO dental plans opens coverage for preventive, basic, and major dental work, from month zero through month twenty-four."

---

**FAQ SECTION**

Primary keywords: all 8 FAQ question phrasings (see Section 2.4 below and Section 5.4 schema)
Secondary entities: see per-question entity notes in Section 2.4
Word count: 40 to 120 words per FAQ answer. Answers must be self-contained paragraphs that make sense without reading the rest of the page. This is the GEO citation requirement: AI systems extract FAQ answers as standalone cited passages.
Image guidance: No images in FAQ section.

---

### 2.4 FAQ Questions, Answers, and Entity Notes

The following 10 FAQ items are the page's FAQ block content. They also appear verbatim (questions) in the FAQPage JSON-LD schema in Section 5.4. The answers below are written as final copy (not placeholders) because they cover generic factual information about PPO dental insurance mechanics that does not require SSOT verification. Any sentence that references a named plan's specific figures uses an SSOT placeholder.

---

**FAQ 1**

Q: What is PPO dental insurance?

A: PPO dental insurance, short for preferred provider organization, is a type of dental plan that gives you access to a network of contracted dentists at negotiated rates. You can also visit dentists outside the network, though your out-of-pocket cost is higher when you do. PPO plans typically cover preventive care (exams, cleanings, X-rays) at 100 percent, basic care (fillings, simple extractions) at 80 percent, and major care (crowns, root canals, bridges) at 50 percent, after you meet your annual deductible. Unlike HMO or DHMO dental plans, PPO plans do not require a referral to see a specialist.

Entities: preferred provider organization, in-network, out-of-network, preventive dental, basic dental, major dental, annual deductible, PPO network, specialist referral.

---

**FAQ 2**

Q: How is a PPO dental plan different from a dental HMO or DHMO?

A: A dental PPO lets you see any licensed dentist, in-network or out-of-network, with no referral needed. A dental HMO (also called a DHMO) requires you to pick a primary care dentist from a specific network and get a referral before seeing a specialist. DHMO plans tend to have lower monthly premiums and no annual deductibles, but the trade-off is less freedom of choice. If your preferred dentist is not in the DHMO network, you either pay the full cost out of pocket or switch dentists. PPO plans cost more per month but are the right choice if your dentist matters, if you travel, or if you might need specialist care.

Entities: dental HMO, DHMO, primary care dentist, specialist referral, premium, annual deductible, freedom of choice, PPO network.

---

**FAQ 3**

Q: What does a PPO dental plan cover?

A: Most PPO dental plans cover three tiers of care. Preventive care (routine exams, professional cleanings, and X-rays) is typically covered at 100 percent with no waiting period. Basic care (fillings, simple extractions, and emergency treatment) is typically covered at 80 percent after meeting your deductible, sometimes with a 3 to 6 month waiting period. Major care (crowns, root canals, bridges, dentures, oral surgery) is typically covered at 50 percent after a longer waiting period, often 12 months. Some plans also cover orthodontics (braces and clear aligners) at 50 percent, subject to a lifetime maximum. Cosmetic procedures (whitening, veneers) are generally not covered. Individual plan details vary; check the plan's SSOT file before assuming any figure applies.

Entities: preventive care, basic care, major care, orthodontics, cosmetic exclusion, annual deductible, lifetime maximum, waiting period, coverage percentage.

---

**FAQ 4**

Q: How much does PPO dental insurance cost per month?

A: Individual PPO dental insurance plans on the CoverCapy shelf range from approximately $30 per month at the entry level to approximately $100 per month for plans with higher annual maximums, no waiting periods, and orthodontic coverage. Premiums vary by state, age, and the specific plan tier you select. Community-rated plans (like Mutual of Omaha Dental Preferred) charge the same premium regardless of age, which makes them especially competitive for buyers over 50. Exact current premium figures for each featured plan are available in the individual plan review pages and sourced from `{{SSOT: data/plans/{slug}.md}}` for each carrier. CoverCapy does not manufacture premium estimates; figures on this page reflect published carrier rates as of the most recent SSOT update.

Entities: monthly premium, community-rated, age-rated, plan tier, annual maximum, state variation, Mutual of Omaha community rating.

---

**FAQ 5**

Q: Can you use a PPO dental plan without a referral?

A: Yes. One of the defining features of a PPO dental plan is that you do not need a referral to see a specialist. You can schedule directly with an oral surgeon, orthodontist, endodontist, or periodontist and still receive your plan's coverage benefits, as long as the specialist is in your PPO network. If you see an out-of-network specialist, most PPO plans still pay a partial benefit, though your share of the cost is higher. This is different from DHMO plans, which require your primary care dentist to issue a referral before a specialist visit is covered.

Entities: specialist referral, PPO network, in-network specialist, out-of-network specialist, oral surgeon, orthodontist, endodontist, periodontist, DHMO referral requirement.

---

**FAQ 6**

Q: What is a dental insurance waiting period and how can I avoid one?

A: A waiting period is the amount of time you must be enrolled in a dental plan before certain types of care are covered. Preventive care (cleanings, exams) typically has no waiting period. Basic care (fillings) may have a 3 to 6 month waiting period. Major care (crowns, root canals) often has a 6 to 12 month waiting period. Orthodontics often has the longest wait: 12 months on most plans. You can avoid or shorten waiting periods in two ways. First, some plans have no waiting periods at all: Ameritas PrimeStar Care Complete offers next-day coverage on all categories including major care, and Mutual of Omaha Dental Preferred has no waiting period for major work (verify exact terms in `{{SSOT: data/plans/ameritas-primestar.md}}` and `{{SSOT: data/plans/mutual-of-omaha-dental.md}}` before citing). Second, some plans offer a prior coverage waiver: if you had qualifying dental insurance within the past 90 days, waiting periods can be waived. Aetna Dental Direct offers a waiting period waiver for enrollees with recent prior coverage (verify in `{{SSOT: data/plans/aetna-dental-direct.md}}`).

Entities: waiting period, prior coverage waiver, 90-day coverage gap rule, day-one coverage, next-day activation, Ameritas PrimeStar, Mutual of Omaha, Aetna waiting period waiver, major dental waiting period, orthodontic waiting period.

---

**FAQ 7**

Q: What is the difference between in-network and out-of-network coverage on a PPO plan?

A: When you see a dentist in your PPO plan's network, that dentist has agreed to a set of contracted rates for each procedure. Your plan pays its share of the contracted rate and you pay the rest. When you see an out-of-network dentist, the plan typically reimburses at a lower "usual, customary, and reasonable" rate, and you may owe the difference between that rate and the dentist's actual charge (called balance billing). The practical effect is that in-network visits cost you less, and your annual maximum stretches further in-network. The size of the network matters: Delta Dental's PPO network is one of the largest in the country, followed by Aetna Dental PPO with over 442,000 locations, and DenteMax Plus (used by Mutual of Omaha) with over 400,000 locations. Choosing a plan where your current dentist is in-network is the single most important factor in reducing your actual out-of-pocket cost.

Entities: in-network, out-of-network, contracted rate, usual customary and reasonable, balance billing, annual maximum, Delta Dental network, Aetna Dental PPO 442,000 locations, DenteMax Plus 400,000 locations, Ameritas Classic PPO, DentalGuard Preferred.

---

**FAQ 8**

Q: What is the best PPO dental plan for a family in 2026?

A: The best PPO dental plan for a family depends on what your family actually needs in the next 12 months. If you have a child who may need braces, Guardian Premier PPO is the only plan on this shelf with dependent orthodontic coverage (verify lifetime maximum and waiting period in `{{SSOT: data/plans/guardian-premier-ppo.md}}`). If your household shops regularly at CVS, Aetna Dental Direct's CVS ExtraCare Plus perk (a $10 monthly reward and 20 percent off CVS Health brand products) can be doubled across two enrolled adults. If someone in the family is facing major work like a crown or implant, Humana Extend 5000's higher annual maximum (`{{SSOT: data/plans/humana-extend-5000.md}}`) or Mutual of Omaha's no-wait major coverage may deliver the best value. Many families on this shelf are better served by stacking two individual plans than by a single family plan: individual plan annual maximums are per-person and do not share a family-wide ceiling.

Entities: family dental plan, dependent orthodontics, Guardian Premier PPO, Aetna CVS ExtraCare Plus, $10 monthly reward, Humana Extend 5000 annual maximum, Mutual of Omaha no-wait major, stacking individual plans, per-person annual maximum, family maximum.

---

**FAQ 9**

Q: Which PPO dental plan is best for someone over 65?

A: Original Medicare does not cover most dental services, including routine cleanings, fillings, crowns, and implants. This leaves people over 65 needing a standalone individual dental plan. Mutual of Omaha Dental Preferred is the standout option for this group: it offers no waiting period on major work, a selectable annual maximum (`{{SSOT: data/plans/mutual-of-omaha-dental.md}}`), a separate lifetime implant maximum, and community-rated pricing that does not increase with age. Ameritas PrimeStar Care Complete is a strong alternative with no waiting period on any category and age-neutral pricing (`{{SSOT: data/plans/ameritas-primestar.md}}`). Both plans access wide PPO networks (DenteMax Plus and Ameritas Classic PPO respectively) and can be purchased directly without an employer group.

Entities: Original Medicare dental exclusion, Medicare gap, standalone dental plan, Mutual of Omaha Dental Preferred, community-rated pricing, selectable annual maximum, lifetime implant maximum, Ameritas PrimeStar, age-neutral pricing, DenteMax Plus, Ameritas Classic PPO, individual dental plan.

---

**FAQ 10**

Q: Is dental insurance worth buying in 2026?

A: For most adults, yes. Even if you only use your plan for two professional cleanings and an annual exam, preventive care covered at 100 percent by your PPO plan typically saves more than the monthly premium over a year. The value increases significantly if you have any upcoming basic or major work. The largest financial risk without coverage is a single unplanned major procedure (a crown can cost $1,000 to $2,000 out of pocket without insurance). A plan with a $1,500 to $5,000 annual maximum substantially reduces that exposure. The exception is if you already have access to an employer-sponsored plan, a dental savings plan through a discount network, or a Medicare Advantage plan with meaningful dental benefits. For self-employed workers, freelancers, and anyone without employer dental coverage, an individual PPO plan from $30 to $100 per month is generally the most cost-effective way to maintain dental health and limit large unexpected expenses.

Entities: dental insurance value, preventive care 100 percent, crown cost out of pocket, annual maximum, employer dental, Medicare Advantage dental, dental savings plan, self-employed dental insurance, freelancer dental, individual dental plan.

---

### 2.5 Internal Linking Specification

This section defines the exact anchor text patterns for links TO and FROM the PPO Plans hub. Anchor text variation is intentional (exact-match anchors in excess can trigger over-optimization signals).

---

**LINKS TO THE PPO PLANS HUB FROM OTHER PAGES**

From individual dentist profile pages (T5 pages in the `/dental/` directory):
- "compare PPO dental plans" (links to hub or compare page; see cannibalization rules in spec 04)
- "find a PPO dental plan" (links to hub)
- "PPO dental plans we accept" (links to hub, placed in the plan verification section of a dentist profile)
- "browse all PPO plans" (links to hub)

From city pages and metro hub pages (T4c and T4a):
- "compare PPO dental insurance options" (links to hub)
- "how to choose a PPO dental plan" (links to hub)
- "dental insurance accepted in [City]" (links to find-my-dentist, not hub; do not conflate)

From the compare page (`/compare-ppo-dental-plans`):
- "find the right plan for your situation" (links to hub, placed in compare page intro)
- "PPO plans guide" (links to hub, placed in compare page footer related links)

From the dental insurance hub (`/dental-insurance/`):
- "our featured PPO dental plans" (links to hub)
- "compare and choose a PPO plan" (links to hub)

---

**LINKS FROM THE PPO PLANS HUB TO OTHER PAGES**

To the compare page (`/compare-ppo-dental-plans`):
- "compare all eight plans side by side" (in comparison table section)
- "open the full comparison table" (in scenario finder answer block, secondary CTA)
- "Compare plans interactively" (button below comparison table, per spec 10)

To individual plan pages:
- Each plan story card has a "Read the full [Plan Name] review" link. Use the plan's full proper name as anchor text.
  - "Read the full Aetna Dental Direct review"
  - "Read the full Ameritas PrimeStar Care Complete review"
  - "Read the full Delta Dental PPO Premium review"
  - "Read the full Guardian Premier PPO review"
  - "Read the full Humana Extend 5000 review"
  - "Read the full MetLife NCD Complete review"
  - "Read the full Mutual of Omaha Dental Preferred review"
  - "Read the full UnitedHealthcare Primary Dental review"

To the find-my-dentist page:
- "Find a dentist who takes this plan" (in comparison table section below table)
- "Verify that your dentist is in-network" (in verify CTA band)
- "find my dentist" (in right rail Block R1 per spec 10)

To the dental insurance hub (`/dental-insurance/`):
- Breadcrumb anchor "Dental Insurance" only. Do not create additional editorial links from the PPO hub up to its parent hub; breadcrumbs handle upward navigation.

---

## 3. CANNIBALIZATION DEFENSE

### 3.1 The Three Pages at Risk of Keyword Overlap

The following three page types exist within the same topical silo and must have clearly differentiated keyword ownership to avoid internal cannibalization:

1. `/dental-insurance/ppo-plans/` (the PPO Plans hub, this page)
2. `/compare-ppo-dental-plans` (the compare page)
3. `/dental-insurance/ppo-plans/{plan-slug}/` (individual plan pages, 8 total)

### 3.2 This Hub's Unique Angle

The PPO Plans hub owns the TOP-OF-FUNNEL, SCENARIO-FIRST keyword space. Its unique angle is: "I do not know which plan I need, and I need someone to help me figure that out based on what is happening in my life."

This hub answers:
- "best PPO dental plans 2026" (head term, scenario framing)
- "best dental insurance for [family / seniors / kids / job loss / no waiting period]" (mid-tail scenario clusters)
- "how does dental insurance work" (educational entry)
- "what dental insurance should I get" (decision-support)
- "dental insurance for implants," "dental insurance that covers braces for kids," "dental insurance for seniors over 65" (scenario-specific head terms that route to a named plan, not a comparison table)

This hub does NOT own:
- "compare delta dental vs aetna" (compare page)
- "aetna dental direct review" (Aetna plan page)
- "guardian premier ppo orthodontics coverage" (Guardian plan page or guardian-orthodontics-coverage guide)
- "compare ppo dental plans side by side" (compare page)

### 3.3 What the Compare Page Owns

The compare page owns the MID-FUNNEL, FEATURE-GRID keyword space. The visitor arriving at the compare page has already decided they want a PPO plan and is comparing specific features side by side.

The compare page owns:
- "compare PPO dental plans"
- "delta dental vs aetna dental"
- "dental insurance comparison 2026"
- "best PPO dental insurance 2026" (a head term that skews comparison-intent when the modifier "best" is paired with "comparison" or "vs")
- "PPO dental plan deductible comparison"
- "dental insurance annual maximum comparison"

### 3.4 What Individual Plan Pages Own

Each plan page owns the BOTTOM-OF-FUNNEL, SINGLE-CARRIER keyword space. The visitor arriving at a plan page has either been matched by the scenario finder or is researching a specific carrier.

Individual plan pages own:
- "{Plan Name} review" (e.g., "Aetna Dental Direct review")
- "{Plan Name} waiting period" (e.g., "Humana Extend 5000 waiting period")
- "{Plan Name} orthodontics" (e.g., "Guardian Premier PPO braces coverage")
- "{Carrier} dental insurance {city}" (e.g., "Aetna dental insurance Los Angeles")

### 3.5 Content Rules That Enforce Separation

These are hard rules to prevent cannibalization from developing over time as the pages are edited:

Rule 1: The PPO Plans hub must NOT contain a comparison table that shows all eight plans with feature columns side by side. A simplified "quick facts" in each plan card is acceptable, but the full feature-grid comparison belongs on the compare page. If a simplified table is added to the hub, it must link out to the compare page for "full comparison."

Rule 2: The compare page must NOT contain a scenario-finder widget or scenario-first UX elements. Those belong on the hub.

Rule 3: Individual plan pages must NOT reproduce more than 3 to 4 rows of a comparison table. They may include a "How [Plan Name] compares" section with limited rows and a link to the full compare page.

Rule 4: Internal links between the hub and the compare page are directional: the hub links to the compare page; the compare page links back to the hub with different anchor text ("find the right plan for your situation" from compare to hub). These links are not reciprocal equals; they flow downward (hub to compare to plan page) with one soft upward link from compare to hub.

Rule 5: Title tags and H1s on all three page types must be differentiated as specified in spec 04, Section 8, cannibalization avoidance table. Do not adopt a title tag on the hub that could be confused with the compare page title.

---

## 4. ADDITIONAL HEAD ELEMENTS

```html
<!-- Preconnect for fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical fonts -->
<link rel="preload" as="font" type="font/woff2" href="/fonts/fraunces-subset.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/inter-tight-subset.woff2" crossorigin>

<!-- Article published/modified times for GEO/AI citation freshness signals -->
<meta property="article:published_time" content="2026-01-01T00:00:00Z">
<meta property="article:modified_time" content="{{LASTMOD_DATE}}T00:00:00Z">

<!-- hreflang (if US-only, this line confirms English-US targeting) -->
<link rel="alternate" hreflang="en-us" href="https://www.covercapy.com/dental-insurance/ppo-plans/">
```

**Note on `article:modified_time`:** Replace `{{LASTMOD_DATE}}` with the ISO date of each rebuild. This tag is read by Perplexity and some AI summarizers as a freshness signal independent of the sitemap `lastmod`.

---

## 5. JSON-LD SCHEMA (COPY-READY SKELETONS)

All schema blocks are placed inside a single `<script type="application/ld+json">` tag in the `<head>`, as a JSON array. Alternatively, each block can be a separate `<script>` tag; either is valid per schema.org spec. The array approach is cleaner for maintenance.

**CRITICAL SCHEMA RULE:** Every fact stated in schema must also appear in the visible body copy of the page. Schema that states facts not visible to users is a quality signal risk. The rule: if it is in the schema, it must be readable on the page. If it is only in the schema, remove it from the schema.

---

### 5.1 WebPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "name": "Best PPO Dental Plans 2026: Find the Right Fit",
  "description": "Eight independently reviewed PPO dental plans matched to your situation. Coverage for families, seniors, braces, implants, and no-waiting-period needs. Updated June 2026.",
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/",
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://www.covercapy.com/",
    "name": "CoverCapy",
    "url": "https://www.covercapy.com/"
  },
  "breadcrumb": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#breadcrumb"
  },
  "datePublished": "2026-01-01",
  "dateModified": "{{LASTMOD_DATE}}",
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://www.covercapy.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.covercapy.com/assets/covercapy-logo.svg",
      "width": 200,
      "height": 50
    }
  },
  "mainEntity": {
    "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#plan-list"
  }
}
```

**Notes:**
- Replace `{{LASTMOD_DATE}}` with the ISO date of each rebuild (e.g., `2026-06-26`).
- `"mainEntity"` references the `ItemList` schema below by its `@id`.
- The `"publisher"` logo URL must point to an actual file. Confirm the path before deploying.

---

### 5.2 BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#breadcrumb",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.covercapy.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Dental Insurance",
      "item": "https://www.covercapy.com/dental-insurance/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "PPO Dental Plans",
      "item": "https://www.covercapy.com/dental-insurance/ppo-plans/"
    }
  ]
}
```

**Notes:**
- Three positions: Home, Dental Insurance, PPO Dental Plans. This matches the breadcrumb chain defined in spec 04, Section 3.
- Position 3 `item` URL must exactly match the canonical.
- The rendered breadcrumb nav in the HTML must visually match this schema. The separator is ` / ` (space, forward slash, space). No em-dashes in breadcrumb.
- If/when the compare page is physically moved to `/dental-insurance/ppo-plans/compare/` (spec 04 Option A), a fourth position is added to the compare page's BreadcrumbList only. The PPO hub breadcrumb remains three positions.

---

### 5.3 ItemList Schema (8 Featured Plans)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#plan-list",
  "name": "Featured PPO Dental Plans on CoverCapy",
  "description": "Eight independently reviewed PPO dental insurance plans available for individual and family enrollment, updated June 2026.",
  "numberOfItems": 8,
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "UnitedHealthcare Primary Dental",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/",
      "description": "{{SSOT: data/plans/uhc-primary-dental.md — one-sentence value proposition for UHC Primary Dental}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Aetna Dental Direct",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/",
      "description": "{{SSOT: data/plans/aetna-dental-direct.md — one-sentence value proposition for Aetna Dental Direct, including CVS ExtraCare Plus perk}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Ameritas PrimeStar Care Complete",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/",
      "description": "{{SSOT: data/plans/ameritas-primestar.md — one-sentence value proposition for Ameritas PrimeStar, emphasizing no waiting period and next-day activation}}"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Guardian Premier PPO",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/",
      "description": "{{SSOT: data/plans/guardian-premier-ppo.md — one-sentence value proposition for Guardian Premier PPO, emphasizing dependent orthodontics}}"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "MetLife NCD Complete",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/",
      "description": "{{SSOT: data/plans/metlife-ncd-complete.md — one-sentence value proposition for MetLife NCD Complete}}"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Mutual of Omaha Dental Preferred",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/",
      "description": "{{SSOT: data/plans/mutual-of-omaha-dental.md — one-sentence value proposition for Mutual of Omaha Dental Preferred, emphasizing no waiting period, selectable maximum, and community-rated pricing}}"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Humana Extend 5000",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/",
      "description": "{{SSOT: data/plans/humana-extend-5000.md — one-sentence value proposition for Humana Extend 5000, emphasizing high annual maximum and family value}}"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Delta Dental PPO Premium",
      "url": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/",
      "description": "{{SSOT: data/plans/delta-dental-ppo-premium.md — one-sentence value proposition for Delta Dental PPO Premium, emphasizing network size and adult orthodontics}}"
    }
  ]
}
```

**Notes:**
- `itemListOrder: ItemListOrderAscending` reflects the page order (cheapest to strongest per spec 10, Section 7 plan story order).
- The `description` for each `ListItem` must be replaced with the actual one-sentence value proposition from the SSOT file before deployment. The developer must read each SSOT file and write a factually accurate, non-invented description.
- All 8 `url` values must have trailing slashes matching canonicals from spec 04.
- The `numberOfItems` must always equal the number of items in `itemListElement`. If a plan is removed or added, update both.
- Verify parity: every plan in this `ItemList` must appear in the visible plan stories section and in the comparison table on the page.

---

### 5.4 FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is PPO dental insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PPO dental insurance, short for preferred provider organization, is a type of dental plan that gives you access to a network of contracted dentists at negotiated rates. You can also visit dentists outside the network, though your out-of-pocket cost is higher when you do. PPO plans typically cover preventive care (exams, cleanings, X-rays) at 100 percent, basic care (fillings, simple extractions) at 80 percent, and major care (crowns, root canals, bridges) at 50 percent, after you meet your annual deductible. Unlike HMO or DHMO dental plans, PPO plans do not require a referral to see a specialist."
      }
    },
    {
      "@type": "Question",
      "name": "How is a PPO dental plan different from a dental HMO or DHMO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A dental PPO lets you see any licensed dentist, in-network or out-of-network, with no referral needed. A dental HMO (also called a DHMO) requires you to pick a primary care dentist from a specific network and get a referral before seeing a specialist. DHMO plans tend to have lower monthly premiums and no annual deductibles, but the trade-off is less freedom of choice. If your preferred dentist is not in the DHMO network, you either pay the full cost out of pocket or switch dentists. PPO plans cost more per month but are the right choice if your dentist matters, if you travel, or if you might need specialist care."
      }
    },
    {
      "@type": "Question",
      "name": "What does a PPO dental plan cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most PPO dental plans cover three tiers of care. Preventive care (routine exams, professional cleanings, and X-rays) is typically covered at 100 percent with no waiting period. Basic care (fillings, simple extractions, and emergency treatment) is typically covered at 80 percent after meeting your deductible, sometimes with a 3 to 6 month waiting period. Major care (crowns, root canals, bridges, dentures, oral surgery) is typically covered at 50 percent after a longer waiting period, often 12 months. Some plans also cover orthodontics (braces and clear aligners) at 50 percent, subject to a lifetime maximum. Cosmetic procedures such as whitening and veneers are generally not covered."
      }
    },
    {
      "@type": "Question",
      "name": "How much does PPO dental insurance cost per month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Individual PPO dental insurance plans on the CoverCapy shelf range from approximately $30 per month at the entry level to approximately $100 per month for plans with higher annual maximums, no waiting periods, and orthodontic coverage. Premiums vary by state, age, and the specific plan tier you select. Community-rated plans charge the same premium regardless of age, which makes them especially competitive for buyers over 50. Exact current premium figures for each featured plan are available on the individual plan review pages and sourced from carrier SSOT files. CoverCapy does not manufacture premium estimates."
      }
    },
    {
      "@type": "Question",
      "name": "Can you use a PPO dental plan without a referral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. One of the defining features of a PPO dental plan is that you do not need a referral to see a specialist. You can schedule directly with an oral surgeon, orthodontist, endodontist, or periodontist and still receive your plan's coverage benefits, as long as the specialist is in your PPO network. If you see an out-of-network specialist, most PPO plans still pay a partial benefit, though your share of the cost is higher. This is different from DHMO plans, which require your primary care dentist to issue a referral before a specialist visit is covered."
      }
    },
    {
      "@type": "Question",
      "name": "What is a dental insurance waiting period and how can I avoid one?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A waiting period is the amount of time you must be enrolled in a dental plan before certain types of care are covered. Preventive care (cleanings, exams) typically has no waiting period. Basic care (fillings) may have a 3 to 6 month waiting period. Major care (crowns, root canals) often has a 6 to 12 month waiting period. Orthodontics often has the longest wait: 12 months on most plans. You can avoid or shorten waiting periods in two ways. First, some plans have no waiting periods at all. Second, some plans offer a prior coverage waiver: if you had qualifying dental insurance within the past 90 days, waiting periods can be waived. Check the individual plan reviews for specific waiting period details."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between in-network and out-of-network coverage on a PPO plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you see a dentist in your PPO plan's network, that dentist has agreed to a set of contracted rates for each procedure. Your plan pays its share of the contracted rate and you pay the rest. When you see an out-of-network dentist, the plan typically reimburses at a lower rate, and you may owe the difference between that rate and the dentist's actual charge (called balance billing). The practical effect is that in-network visits cost you less, and your annual maximum stretches further in-network. Choosing a plan where your current dentist is in-network is the single most important factor in reducing your actual out-of-pocket cost."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best PPO dental plan for a family in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best PPO dental plan for a family depends on what your family needs in the next 12 months. If you have a child who may need braces, Guardian Premier PPO is the only plan on the CoverCapy shelf with dependent orthodontic coverage. If your household shops regularly at CVS, Aetna Dental Direct's CVS ExtraCare Plus perk can be doubled across two enrolled adults. If someone in the family is facing major work like a crown or implant, Humana Extend 5000's higher annual maximum or Mutual of Omaha's no-wait major coverage may deliver the best value. Many families are better served by stacking two individual plans than by a single family plan, because individual plan annual maximums are per-person and do not share a family-wide ceiling."
      }
    },
    {
      "@type": "Question",
      "name": "Which PPO dental plan is best for someone over 65?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Original Medicare does not cover most dental services, including routine cleanings, fillings, crowns, and implants. This leaves people over 65 needing a standalone individual dental plan. Mutual of Omaha Dental Preferred is the standout option for this group: it offers no waiting period on major work, a selectable annual maximum, a separate lifetime implant maximum, and community-rated pricing that does not increase with age. Ameritas PrimeStar Care Complete is a strong alternative with no waiting period on any category and age-neutral pricing. Both plans access wide PPO networks and can be purchased directly without an employer group."
      }
    },
    {
      "@type": "Question",
      "name": "Is dental insurance worth buying in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most adults, yes. Even if you only use your plan for two professional cleanings and an annual exam, preventive care covered at 100 percent by your PPO plan typically saves more than the monthly premium over a year. The value increases significantly if you have any upcoming basic or major work. The largest financial risk without coverage is a single unplanned major procedure: a crown can cost $1,000 to $2,000 out of pocket without insurance. A plan with a $1,500 to $5,000 annual maximum substantially reduces that exposure. For self-employed workers, freelancers, and anyone without employer dental coverage, an individual PPO plan from $30 to $100 per month is generally the most cost-effective way to maintain dental health and limit large unexpected expenses."
      }
    }
  ]
}
```

**Schema parity rule:** Every answer in the FAQPage schema must be readable as visible text on the page. The FAQ `<details><summary>` elements must contain the same text (not shorter or longer versions). Do not summarize the answer in the HTML and use the full version only in schema; this violates Google's schema guidelines and can trigger a manual action.

**FAQPage schema status note:** Google deprecated FAQ rich results from SERPs in May 2026. However, FAQPage schema remains a confirmed AI citation signal: ChatGPT weights pages with FAQPage schema 40% higher for citation extraction (per spec 02 GEO audit). Perplexity also favors question-format headings. The FAQPage schema should be implemented for GEO benefit regardless of the Google rich result deprecation.

---

### 5.5 Product and Offer Schema (One Block Per Featured Plan)

**Rationale:** `Product` schema with nested `Offer` can improve AI citation for plan-specific queries ("what is the price of Aetna Dental Direct?"). Google's March 2026 core update narrowed `ItemList` to require primary-content alignment, and per spec 02 no competitor uses `Product` schema for dental plan hubs. This is a differentiation opportunity.

**Implementation approach:** Eight separate `Product` objects, each referencing the plan page. They can be included in the same JSON-LD array as the other schemas.

**Copy-ready skeleton (repeat for all 8 plans, replacing `{{PLAN_*}}` placeholders):**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/{{PLAN_SLUG}}/#product",
  "name": "{{PLAN_NAME}}",
  "description": "{{SSOT: data/plans/{{PLAN_SLUG}}.md — product description, one to two sentences, no invented facts}}",
  "category": "PPO Dental Insurance",
  "brand": {
    "@type": "Brand",
    "name": "{{CARRIER_LEGAL_NAME}}"
  },
  "url": "https://www.covercapy.com/dental-insurance/ppo-plans/{{PLAN_SLUG}}/",
  "offers": {
    "@type": "Offer",
    "url": "https://www.covercapy.com/dental-insurance/ppo-plans/{{PLAN_SLUG}}/",
    "priceCurrency": "USD",
    "price": "{{SSOT: data/plans/{{PLAN_SLUG}}.md — starting monthly premium, or omit price field if not verifiable}}",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "{{SSOT: data/plans/{{PLAN_SLUG}}.md — starting monthly premium}}",
      "priceCurrency": "USD",
      "unitText": "month"
    },
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "CoverCapy",
      "url": "https://www.covercapy.com/"
    }
  }
}
```

**Fill-in values for each plan (replace placeholders):**

| Plan slug | Plan name (schema `name`) | Carrier legal name (`brand.name`) |
|---|---|---|
| `uhc-primary-dental` | UnitedHealthcare Primary Dental | UnitedHealthcare Insurance Company |
| `aetna-dental-direct` | Aetna Dental Direct | Aetna Life Insurance Company |
| `ameritas-primestar` | Ameritas PrimeStar Care Complete | Ameritas Life Partners Corp. |
| `guardian-premier-ppo` | Guardian Premier PPO | The Guardian Life Insurance Company of America |
| `metlife-ncd-complete` | MetLife NCD Complete | Metropolitan Life Insurance Company |
| `mutual-of-omaha-dental` | Mutual of Omaha Dental Preferred | Mutual of Omaha Insurance Company |
| `humana-extend-5000` | Humana Extend 5000 | Humana Insurance Company |
| `delta-dental-ppo-premium` | Delta Dental PPO Premium | Delta Dental Plans Association (verify legal entity against SSOT) |

**Critical note on `price` field:** Only populate the `price` field if the premium figure is verifiable in the SSOT file and visible in the page body copy. If the premium is state-variable or not published in the SSOT, omit the `price` and `priceSpecification` fields entirely rather than approximating. An incorrect `price` in schema can trigger a Google schema quality action. It is better to have no price than an invented one.

**`availability: InStock`** is appropriate for a plan that is currently enrollable. If a plan is suspended or unavailable, change to `https://schema.org/Discontinued`.

---

### 5.6 Schema Parity Statement (Required Implementation Note)

Before deploying, the developer or QA reviewer must verify parity between schema content and visible page content for each of the five schema types above. Specifically:

1. Every `ListItem` in the `ItemList` must correspond to a visible plan story section on the page.
2. Every FAQ `Question` and `Answer` in the `FAQPage` must correspond to a visible `details/summary` block in the FAQ section.
3. Every `Product` / `Offer` description must be based on text that appears in the visible plan story card for that plan.
4. The `BreadcrumbList` positions must match the visible breadcrumb nav rendered at the top of the page.
5. The `WebPage` `dateModified` must match the visible "Updated [date]" text shown on the page (in the meta pills row per spec 10 hero section, or in the editorial note per spec 10 Section 14).

If schema and visible content diverge, fix the page content to match the schema (or vice versa) before deploying. Do not leave them out of sync.

---

## 6. IMPLEMENTATION CHECKLIST

Use this checklist before each deployment of the PPO Plans hub.

**Head and meta:**
- [ ] Title tag is exactly 58 characters or fewer, primary keyword in first 5 words
- [ ] Meta description is 155 characters or fewer, CTA included
- [ ] Canonical URL has trailing slash, matches served URL
- [ ] `robots` meta has `max-snippet:-1` and `max-image-preview:large`
- [ ] OG tags complete: title, description, url, image, image alt, site name
- [ ] Twitter card is `summary_large_image`, title, description, image, image alt
- [ ] `article:modified_time` updated to current rebuild date
- [ ] Sitemap `lastmod` updated to current rebuild date
- [ ] No em-dashes in any meta field, title, or schema value

**On-page content:**
- [ ] Single H1 matches specified heading exactly
- [ ] All H2s and H3s from Section 2.2 outline are implemented in correct order
- [ ] Each FAQ answer in HTML matches the FAQPage schema answer text exactly (no paraphrasing)
- [ ] All SSOT placeholders (`{{SSOT: data/plans/{slug}.md}}`) are resolved and replaced with verified figures
- [ ] No plan-specific numbers (premiums, deductibles, percentages, caps) are present that are not sourced from the corresponding SSOT file
- [ ] No em-dashes anywhere in visible body copy, headings, or FAQ answers
- [ ] No roman numerals in any list

**Internal links:**
- [ ] Each plan story card has a "Read the full [Plan Name] review" link with exact anchor text from Section 2.5
- [ ] At least one link to compare page from hub (anchor: "compare all eight plans side by side" or "Compare plans interactively")
- [ ] At least one link to find-my-dentist from hub (anchor: "Find a dentist who takes this plan" or "Verify that your dentist is in-network")
- [ ] Breadcrumb nav visually matches BreadcrumbList schema positions

**Schema:**
- [ ] All five schema blocks (WebPage, BreadcrumbList, ItemList, FAQPage, 8 Product blocks) are valid JSON (run through schema.org validator or Google Rich Results Test before deploy)
- [ ] `ItemList` count matches number of plan story sections on page (currently 8)
- [ ] `Product` price fields are either verified from SSOT or omitted
- [ ] `WebPage.dateModified` matches visible "Updated [date]" on page
- [ ] Schema parity check completed (Section 5.6 steps 1 through 5)

**Sitemap:**
- [ ] `sitemap.xml` entry for this URL has trailing slash, updated `lastmod`, `priority: 0.85`, `changefreq: monthly`
- [ ] No trailing-slash inconsistency between sitemap entry and canonical

---

*Spec 15 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are approved and user sign-off is given.*
*All plan facts in this spec that reference specific numbers use SSOT placeholders. No figures were invented. Verify each placeholder against the relevant `/data/plans/{slug}.md` file before writing final copy.*
