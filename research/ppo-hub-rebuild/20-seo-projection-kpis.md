# 20 — SEO / GEO Traffic Projection and KPI Specification
## PPO Plans Hub Rebuild | CoverCapy Research Program
**Date:** 2026-06-26
**Author:** SEO / GEO Analyst
**Status:** PLANNING ONLY. No production changes until 00-MASTER-CONSOLE.md is approved.

---

## IMPORTANT DISCLAIMER

All traffic projections, impression estimates, and ranking timelines in this document are MODELED ASSUMPTIONS. They are scenario-based forecasts derived from qualitative analysis of the competitive SERP landscape (doc 02), keyword cluster mapping (doc 03), and standard SEO outcome frameworks. Exact search volumes, CoverCapy's current ranking positions, and current impression data are not available to the analyst. No numbers in this document are sourced from Google Search Console, third-party rank trackers, or any live measurement tool. Label every projection clearly as an assumption when communicating with stakeholders. Do not present these numbers in public-facing or investor-facing documents without replacing them with verified measured data.

---

## 1. PROJECTION FRAMEWORK

### 1.1 Why Scenario-Based, Not Single-Point

Dental insurance SERPs are dominated by Tier 1 editorial authority sites (money.com, NerdWallet, Forbes Advisor, ValuePenguin) with domain authority and backlink profiles that CoverCapy cannot match through content alone in the short term. The roadmap therefore must operate across two distinct channels:

**Channel A: Organic search (Google)** -- Classic ranking competition. Win condition is scenario-first content depth plus structured data outperforming generic plan-list competitors on long-tail and medium-tail queries where topical depth matters more than raw domain authority.

**Channel B: GEO / AI citation (ChatGPT, Perplexity, Claude, Google AI Overviews)** -- AI citation is less correlated with domain authority than with content precision, self-contained answer blocks, FAQPage schema, and freshness signals. This is where CoverCapy has the strongest near-term asymmetric advantage, particularly in clusters with thin AI competition (Clusters 6, 7, 8, 9 from doc 03).

The three scenarios below model different rates of progress across both channels.

### 1.2 Baseline Assumptions (All Scenarios)

The following assumptions apply to all three scenarios. If any assumption is incorrect, the projections must be revised.

1. The rebuilt /dental-insurance/ppo-plans/ hub is published and indexed within 30 days of this document.
2. The hub receives at least one strong internal link from the /dental-insurance/ parent hub and from the homepage.
3. The 8 featured plan pages (one per plan SSOT) exist and are internally linked to and from the hub.
4. The /compare-ppo-dental-plans/ page is 301-redirected to or canonicalized under /dental-insurance/ppo-plans/ per spec 04 (ia-url-migration.md).
5. All schema types are implemented correctly: Article, FAQPage, ItemList (for plan list), BreadcrumbList. Product schema per featured plan is optional but assumed in base and stretch scenarios.
6. Google indexes the rebuilt page within 2 weeks of publication (consistent with Vercel static hosting behavior).
7. Perplexity can crawl covercapy.com (no robots.txt block on the dental-insurance path).
8. CoverCapy is not currently ranking in positions 1-10 for any of the 15 head-cluster primary keywords in doc 03. (Conservative starting assumption; if existing rankings are confirmed in Search Console, revise upward.)
9. The hub is updated at least once per month with a freshness signal (date stamp, minor copy refresh, or new FAQ) to sustain AI citation recency weighting.
10. 19-six-month-roadmap.md has not been finalized at time of writing; roadmap phase references below use a generic 4-phase structure (Phase 1: foundation, Phase 2: content, Phase 3: authority, Phase 4: optimization) pending that spec.

---

## 2. SCENARIO DEFINITIONS

### CONSERVATIVE SCENARIO

**Named assumption set C:**
- Hub publishes on time but internal linking is thin (only 2-3 links from parent and homepage).
- Schema is implemented for Article and BreadcrumbList only; FAQPage and ItemList are delayed to Month 2.
- No earned media or external link acquisition in Months 1-3.
- AI citation is achieved on only 2 of 15 keyword clusters (Clusters 8: implants and 9: CVS perks) by Month 3.
- Google organic rankings for head cluster keywords (Cluster 1: "best dental insurance 2026") remain below position 30 through Month 6.
- Long-tail keywords (Clusters 11-15: life-event triggers) begin ranking in positions 10-30 by Month 3.
- Monthly unique sessions to the hub at start of measurement: fewer than 200 (modeled baseline for a new page on a growing domain).

**C-Scenario modeled outcomes (MODELED ASSUMPTIONS, NOT MEASURED DATA):**

| Timeframe | Impressions (GSC, modeled) | Clicks (modeled) | AI Citations Confirmed | Conv. to Plan Pages (modeled) |
|-----------|---------------------------|-------------------|------------------------|-------------------------------|
| Month 1 | 500 - 2,000 | 20 - 80 | 0 - 1 | 5 - 20 |
| Month 2 | 2,000 - 6,000 | 80 - 240 | 1 - 2 | 20 - 60 |
| Month 3 | 5,000 - 12,000 | 200 - 480 | 2 - 4 | 50 - 120 |
| Month 6 | 10,000 - 25,000 | 400 - 1,000 | 3 - 6 | 100 - 250 |

**C-Scenario key constraint:** No external link acquisition and thin internal linking limits domain trust signal. Long-tail life-event clusters can still rank, but head keyword competition from Tier 1 domains prevents meaningful impressions on "best dental insurance 2026" through Month 6.

---

### BASE SCENARIO

**Named assumption set B:**
- Hub publishes on time with strong internal linking: homepage, /dental-insurance/ parent, at least 3 T5 dentist hub pages, and the compare page redirect.
- Full schema suite implemented at launch: Article, FAQPage, ItemList, BreadcrumbList.
- At least one piece of earned media or press pickup (CoverCapy blog post shared via one external outlet, dental industry newsletter, or Reddit post that generates natural links) in Months 2-3.
- AI citation achieved on 4-6 clusters by Month 3 (priority: Clusters 6, 7, 8, 9 per doc 02 section 3 gap analysis).
- Google organic rankings: life-event clusters (11-15) in positions 5-20 by Month 3; family and braces clusters (2, 3, 4) in positions 15-40 by Month 6; head keyword (Cluster 1) still below top 20 at Month 6 but generating impressions via AI Overviews.
- Scenario finder interactive widget drives measurable engagement (time-on-page improvement; measured via scroll depth proxy in GSC click depth).
- Monthly freshness updates maintained.

**B-Scenario modeled outcomes (MODELED ASSUMPTIONS, NOT MEASURED DATA):**

| Timeframe | Impressions (GSC, modeled) | Clicks (modeled) | AI Citations Confirmed | Conv. to Plan Pages (modeled) |
|-----------|---------------------------|-------------------|------------------------|-------------------------------|
| Month 1 | 1,500 - 5,000 | 60 - 200 | 0 - 2 | 15 - 50 |
| Month 2 | 5,000 - 15,000 | 200 - 600 | 2 - 5 | 50 - 150 |
| Month 3 | 12,000 - 30,000 | 480 - 1,200 | 4 - 8 | 120 - 300 |
| Month 6 | 30,000 - 70,000 | 1,200 - 2,800 | 6 - 12 | 300 - 700 |

**B-Scenario AI citation logic:** Clusters 6 (seniors / Medicare gap), 7 (no waiting period), 8 (implants), and 9 (CVS perks) are the four lowest-AI-competition clusters per doc 02 section 7. Doc 03 GEO question phrasings for these four clusters (e.g. "Which dental insurance plan comes with a CVS ExtraCare Plus membership?", "Which dental plan has no waiting period and covers implants for seniors?") currently have near-zero dedicated editorial coverage. CoverCapy's verified SSOT-backed answers to these questions have a high modeled probability of Perplexity citation within the first 30 days of indexing.

---

### STRETCH SCENARIO

**Named assumption set S:**
- All Base assumptions plus:
- Hub is published with full Product schema per featured plan.
- CoverCapy earns 3 or more referring domains with DA above 30 in Months 2-4 (earned media, dental industry press, partnership links).
- Family economics explainer (spec 07) and scenario finder widget are live at launch and generate share events (social saves or email shares tracked via UTM in plan page click URLs).
- AI citation achieved on 8 or more of 15 clusters by Month 4.
- Head keyword "best dental insurance 2026" (Cluster 1) enters positions 15-25 by Month 5, generating material impressions via Google AI Overviews even without top-10 organic position.
- Perplexity cites CoverCapy hub in response to at least 5 GEO question phrasings from doc 03 by Month 3 (confirmed via manual query monitoring).
- Monthly hub updates include new plan-fact refresh or new scenario section.

**S-Scenario modeled outcomes (MODELED ASSUMPTIONS, NOT MEASURED DATA):**

| Timeframe | Impressions (GSC, modeled) | Clicks (modeled) | AI Citations Confirmed | Conv. to Plan Pages (modeled) |
|-----------|---------------------------|-------------------|------------------------|-------------------------------|
| Month 1 | 3,000 - 8,000 | 120 - 320 | 1 - 3 | 30 - 80 |
| Month 2 | 8,000 - 20,000 | 320 - 800 | 3 - 7 | 80 - 200 |
| Month 3 | 20,000 - 50,000 | 800 - 2,000 | 6 - 11 | 200 - 500 |
| Month 6 | 60,000 - 150,000 | 2,400 - 6,000 | 10 - 15 | 600 - 1,500 |

**S-Scenario key driver:** AI citation amplification. A single Perplexity citation on a high-frequency query (e.g. "best dental insurance for seniors 2026") generates compounding referral traffic that is not visible as "search" traffic in GSC but is measurable via Perplexity referral in GA4 source/medium. The stretch scenario assumes this channel contributes 20-35% of total hub sessions by Month 6.

---

## 3. KPI FRAMEWORK

KPIs are organized into LEADING indicators (measurable within days or weeks of launch, predictive of future organic performance) and LAGGING indicators (measurable weeks to months later, the actual business outcomes).

### 3.1 Leading Indicators

Leading indicators tell you whether the inputs are correct before the lagging outcomes arrive. They are actionable: if a leading indicator is off-track, you adjust the input.

**L1 -- Indexation Speed**
- Definition: Time from publication to confirmed Google indexation of the hub URL.
- Target: Indexed within 7 calendar days of publication.
- How to measure: Google Search Console -- URL Inspection tool. Also monitor "Discovered / not yet indexed" in Coverage report.
- Why it matters: A static Vercel site should index quickly if the sitemap is updated. Delays indicate sitemap or robots.txt problems that block all downstream organic performance.
- Alert threshold: Not indexed within 14 days requires investigation.

**L2 -- Schema Validation Coverage**
- Definition: Percentage of planned schema types (Article, FAQPage, ItemList, BreadcrumbList, optionally Product) passing Google Rich Results Test with no errors.
- Target: 100% of implemented schema types pass with 0 errors and 0 warnings at launch. FAQPage schema confirmed present even though FAQ rich results are deprecated in SERPs (FAQPage schema remains an AI citation signal).
- How to measure: Google Rich Results Test (https://search.google.com/test/rich-results) for hub URL. Run at launch and after each major content update.
- Why it matters: Schema is confirmed to improve AI citation rate (FAQPage: 40% higher ChatGPT citation weighting per doc 02; structured data: 73% AI Overview citation improvement). Schema errors silently exclude pages from rich treatment.
- Alert threshold: Any schema type returning an error blocks that schema type from contributing to AI citation. Fix within 48 hours of detection.

**L3 -- Internal Link Count and Anchor Diversity**
- Definition: Number of distinct internal pages linking to the hub URL, and the number of distinct anchor text phrases used.
- Target at launch: At least 5 internal linking pages. Anchors include: "best dental insurance plans," "PPO dental plans," "dental insurance for families," "compare dental insurance," plus at least 2 named-plan anchors.
- How to measure: Google Search Console -- Links report (Internal links to hub URL). Cross-check with a site: search for the hub slug.
- Why it matters: Internal links pass PageRank and help Google understand the hub's topic authority. Doc 03 cluster-to-hub mapping implies at least 15 hub sections, each of which should receive inbound links from related guide pages or the dentist hub.
- Alert threshold: Fewer than 3 internal linking pages at 30 days indicates a site architecture problem from spec 17 (internal-linking-silo.md) not being implemented.

**L4 -- Freshness Signal Cadence**
- Definition: Number of confirmed content updates to the hub URL per month, as visible in the Last-Modified header or a visible "Updated:" datestamp in the page.
- Target: At least 1 meaningful content update per month. "Meaningful" means new FAQ, updated plan fact, new scenario callout, or added GEO answer block -- not a whitespace change.
- How to measure: Monitor the visible "Updated:" datestamp in the hub's byline. Cross-check with GSC Crawl Stats for the URL to confirm Google re-crawled after the update.
- Why it matters: Perplexity cites content published or updated within the last 30 days at an 82% rate vs. lower rates for stale content (doc 02 section 3.1). Freshness cadence is also a Google E-E-A-T signal.
- Alert threshold: More than 45 days without a content update is a citation risk for the AI channel.

**L5 -- GEO Citation Appearance (ChatGPT / Perplexity / Claude)**
- Definition: Confirmed appearances of covercapy.com in response citations when querying AI platforms with exact GEO question phrasings from doc 03.
- Target by Month 1: 1 confirmed Perplexity citation on any doc-03 GEO question phrasing.
- Target by Month 3: 4 confirmed citations across at least 2 distinct platforms (Perplexity + ChatGPT or Claude).
- Target by Month 6: 8+ confirmed citations across 4+ distinct keyword clusters.
- How to measure: Weekly manual query monitoring. Run a defined set of 20 GEO question phrasings (prioritize doc 03 Clusters 6, 7, 8, 9) in Perplexity, ChatGPT (web search on), and Claude with web access. Record citations in a tracking sheet. Tooling options: Profound.co, Brandwatch AI Citation Monitor, or manual logging.
- Why it matters: This is the channel most asymmetrically available to CoverCapy vs. Tier 1 competitors. A Perplexity citation on "which dental insurance includes CVS ExtraCare Plus" (Cluster 9) can drive direct referral traffic and brand exposure with no organic ranking required.
- Alert threshold: Zero citations after 60 days of indexation indicates either a crawling problem (Perplexity blocked) or GEO answer blocks are not self-contained enough. Review spec 16 (geo-ai-citation-spec.md) for remediation.

---

### 3.2 Lagging Indicators

Lagging indicators are the outcomes. They validate whether the leading inputs produced the intended results. They are measured weekly and monthly once the hub has been indexed for at least 30 days.

**G1 -- Total Impressions (Google Search Console)**
- Definition: Total number of times the hub URL appeared in a Google SERP (regardless of click).
- How to measure: GSC Performance report. Filter to hub URL (exact URL match). Date range: rolling 28 days. Track weekly.
- Scenario targets at Month 6: C: 10,000 - 25,000 / B: 30,000 - 70,000 / S: 60,000 - 150,000 (all MODELED ASSUMPTIONS).
- Leading-to-lagging logic: L1 (indexation speed) and L2 (schema) are the primary drivers of impressions growth in the first 60 days. L3 (internal links) sustains and accelerates impressions from Month 2 onward.

**G2 -- Total Clicks (Google Search Console)**
- Definition: Total clicks from Google SERPs to the hub URL. Approximates organic search sessions for the hub.
- How to measure: GSC Performance report, same filter as G1.
- Scenario targets at Month 6: C: 400-1,000 / B: 1,200-2,800 / S: 2,400-6,000 (MODELED ASSUMPTIONS).
- Benchmark click-through rate assumption: 2-4% average CTR modeled for a hub page at mixed ranking positions. CTR will be much higher (8-15%) on position 1-5 long-tail rankings and much lower (0.3-1%) on position 20+ head keyword impressions.

**G3 -- Average Position for Cluster Head Keywords (Google Search Console)**
- Definition: The average GSC position for the primary keyword of each of the 15 clusters in doc 03.
- Priority cluster heads to track:
  - Cluster 1: "best dental insurance 2026"
  - Cluster 2: "family dental insurance"
  - Cluster 3: "dental insurance for kids"
  - Cluster 6: "dental insurance for seniors over 65"
  - Cluster 7: "dental insurance with no waiting period"
  - Cluster 8: "dental insurance that covers implants"
  - Cluster 9: "dental insurance with rewards" (or "dental insurance CVS")
  - Cluster 11: "dental insurance after job loss"
  - Cluster 15: "dental insurance for someone with no dental coverage"
- How to measure: GSC Performance report, filter by page (hub URL), sort by query, search for each cluster keyword. Export monthly to a tracking sheet.
- Scenario targets at Month 6 (MODELED ASSUMPTIONS):
  - Cluster 1: C: not in top 50 / B: 30-50 / S: 15-30
  - Clusters 6, 7, 8, 9: C: 20-40 / B: 10-20 / S: 5-15
  - Clusters 11, 12, 13, 14 (life-event): C: 15-30 / B: 8-20 / S: 4-12
- Leading-to-lagging logic: L4 (freshness) and L5 (GEO citations) correlate with faster ranking improvement for Clusters 6-9, where AI-extractable answer blocks give Google confirmation of topical authority.

**G4 -- AI Citation Share by Cluster**
- Definition: Percentage of tracked GEO query phrasings (from doc 03) where CoverCapy appears as a cited source in at least one AI platform response.
- How to measure: Weekly GEO monitoring protocol (see L5 above). Denominator is the total number of tracked GEO phrasings (target: 60 phrasings covering all 15 clusters, 4 per cluster minimum). Numerator is the number of phrasings where CoverCapy is cited in Perplexity, ChatGPT, or Claude within the most recent 7-day check.
- Scenario targets at Month 6: C: 5-10% / B: 15-25% / S: 35-55% (MODELED ASSUMPTIONS).
- Why it matters: AI citation share is the leading GEO metric for brand visibility in a world where AI Overviews and chat-based search are growing. Even modest AI citation share on high-intent queries ("which dental insurance covers implants no waiting period") drives direct brand consideration without requiring top organic rankings.

**G5 -- Shares and Saves (Social / Email)**
- Definition: Confirmed share events for the hub URL via social platforms or email sharing. Proxy measurable via GA4 "share" events if the hub includes share buttons, or via UTM-tagged referral traffic from social platforms.
- How to measure: GA4 Events report for "share" event (requires implementation of share button tracking per spec 13: retention-engagement.md). Also monitor UTM referrals from social sources in GA4 Source / Medium report.
- Target by Month 6: B-scenario: 50+ confirmed share or save events per month. Stretch: 200+ per month.
- Why it matters: The scenario finder and family economics widgets (spec 11, 12) are specifically designed to be shareable. Share events are a proxy for "resonance" that precedes earned media link acquisition, which in turn drives the external link signals that push head keyword rankings.

**G6 -- Conversions to Plan Pages**
- Definition: Clicks from the hub URL to any of the 8 featured plan pages (e.g. /dental-insurance/ppo-plans/guardian-premier-ppo/). These are the primary micro-conversion for the hub.
- How to measure: GA4 or GSC. In GA4: create an event for outbound clicks from the hub URL matching the plan page URL pattern. In GSC: cross-reference clicks by page (hub URL) with linked pages (plan URLs) -- GSC does not directly show this, so GA4 is preferred.
- Scenario targets at Month 6: C: 100-250 / B: 300-700 / S: 600-1,500 per month (MODELED ASSUMPTIONS).
- Conversion rate assumption: modeled at 8-12% of hub sessions clicking through to a plan page. This is based on the scenario finder being the primary CTA; visitors who use the scenario finder are pre-qualified and expected to convert to plan page clicks at a higher rate than passive scroll visitors.

**G7 -- Conversion to Verification Requests (Phase B Endpoint)**
- Definition: Completed PPO verification wizard submissions originating from a session that included the hub URL (multi-touch attribution). Requires the Phase B /api/verify-ppo endpoint to be live (per CLAUDE.md Phase B notes).
- How to measure: Once the verification endpoint is live, track form submissions attributed to sessions including the hub URL in GA4 Explore (user/session scoped segmentation). Also track via Supabase verification_requests table `source_page_url` field.
- Note: This KPI is not measurable until Phase B endpoint is live. Include it in the KPI framework as a placeholder and activate it when the endpoint launches.
- Target (placeholder, pending Phase B launch): 2-5% of hub plan-page conversions (G6) ultimately submit a verification request.

---

## 4. GOOGLE SEARCH CONSOLE MEASUREMENT PLAN

### 4.1 What to Set Up at Launch

**Properties and filters:**
- Confirm covercapy.com is verified in GSC with the DNS-based verification method (most reliable for Vercel static sites).
- Create a saved filter in the Performance report for Page = exact match to the hub URL (/dental-insurance/ppo-plans/).
- Create a secondary saved filter for Page = startsWith /dental-insurance/ (to monitor the full hub cluster, not just the root hub page).

**Date comparison cadence:**
- Month-over-month comparison: always compare the current 28-day rolling period against the previous 28-day period.
- After a content update: check 7-day vs. 7-day comparison to detect if Google re-crawled and if impressions shifted.

**Queries tab (for G3 tracking):**
- Export the full query list for the hub URL monthly (Performance > Pages > hub URL > Queries tab). Sort by impressions descending. Map the top 50 queries to the 15 clusters in doc 03. Identify queries appearing in the GSC data that were NOT in the original cluster map (these are "discovery queries" -- new content opportunities).

**Links tab (for L3 tracking):**
- GSC Links > Internal links. Enter hub URL in the search box. Export the list of internal linking pages monthly. Count distinct linking pages and note anchor text where visible.

**Coverage and Index tab (for L1 tracking):**
- At launch: submit the hub URL via URL Inspection > Request Indexing. Monitor the Coverage report for the URL status. "Valid" = indexed. "Discovered not indexed" or "Crawled not indexed" = action required.

**Rich Results tab:**
- GSC Enhancements report shows structured data coverage if applicable. Monitor for schema errors. Note: FAQPage rich results no longer appear in SERPs (deprecated May 2026) but the enhancement report still validates schema presence; use it to confirm FAQPage is error-free.

### 4.2 Monthly GSC Reporting Checklist

Run this checklist on the last working day of each month:

1. Pull Performance report (hub URL, 28 days). Record: total impressions, total clicks, average CTR, average position.
2. Pull query list. Map to clusters. Identify which clusters are generating impressions. Flag clusters with zero impressions after Month 2 (indicates content gaps).
3. Pull Links report. Count internal linking pages. Record delta vs. prior month.
4. Run URL Inspection on hub URL. Confirm indexed, confirm last crawl date within 30 days.
5. Run Rich Results Test. Confirm all schema types pass with zero errors.
6. Pull Coverage report. Flag any "Valid with warnings" or "Excluded" status.
7. Record all values in the KPI tracking sheet (30/60/90/180-day checkpoint format, section 5 below).

---

## 5. CHECKPOINT PLAN: 30 / 60 / 90 / 180 DAYS

### 30-Day Checkpoint (Approximately 2026-07-26)

**Goal of this checkpoint:** Confirm the foundation is technically correct. Do not expect meaningful traffic yet; diagnose structural problems.

**Questions to answer:**
- Is the hub URL indexed? (L1 -- target: Yes, within 7 days of launch)
- Does schema validation pass for all implemented types? (L2 -- target: 0 errors, 0 warnings)
- How many internal pages link to the hub? (L3 -- target: at least 5)
- Has any GEO question phrasing from doc 03 resulted in a CoverCapy citation? (L5 -- target: 1+ Perplexity citation)
- What is the hub's first GSC impression count? (G1 -- record baseline, no target yet)
- What queries is Google associating with the hub? (G3 -- qualitative check: are the right clusters appearing?)

**Action triggers:**
- Not indexed by Day 14: submit sitemap, request indexing via GSC URL Inspection, check robots.txt.
- Schema errors: fix immediately. Schema errors block AI citation.
- Fewer than 3 internal linking pages: audit spec 17 (internal-linking-silo.md) compliance. Add missing links from parent hub, homepage, and plan pages.
- Zero GEO citations after 30 days: check Perplexity crawl access. Review GEO answer block copy in spec 16 for self-containment (each block must answer the query without surrounding context).

---

### 60-Day Checkpoint (Approximately 2026-08-26)

**Goal of this checkpoint:** Confirm early traction in AI citation and long-tail organic. Identify which keyword clusters are earning impressions and which are not.

**Questions to answer:**
- How many GEO citations are confirmed across platforms? (L5 -- B-scenario target: 2-5)
- Which keyword clusters are generating impressions in GSC? (G3 -- expect life-event clusters 11-15 and low-competition clusters 9 to appear first)
- What is the trend in total impressions week-over-week? (G1 -- expect growth; flat or declining impressions at Day 60 indicate indexation or authority problem)
- Is the freshness update cadence on track? (L4 -- should have 1-2 updates completed by Day 60)
- Are shares/saves measurable? (G5 -- any share events from GA4 indicate the content is resonating enough to forward)

**Action triggers:**
- No impressions growth from Day 30 to Day 60: content may not be sufficiently crawlable (JavaScript rendering issue, or pages blocked). Check Vercel static file structure.
- AI citations present but not growing: expand GEO answer block coverage to additional clusters (Clusters 2, 3, and 7 are next-priority after 6, 8, 9).
- Clusters 11-15 not appearing in GSC queries by Day 60: the life-event scenario section may be too thin. Expand scenario cards with denser copy matching exact GEO phrasings from doc 03.

---

### 90-Day Checkpoint (Approximately 2026-09-26)

**Goal of this checkpoint:** Validate the projection scenario. Determine whether performance is tracking to conservative, base, or stretch.

**Questions to answer:**
- Where does current performance land vs. the three scenarios? Map measured G1, G2, G3, G4, G6 values to the scenario table in section 2. Name the scenario the data most closely matches.
- Which clusters are generating plan-page conversions? (G6 -- which plans are receiving the most clicks from the hub?)
- What is the AI citation count by cluster? (G4 -- are the 4 priority clusters: 6, 7, 8, 9 confirmed cited?)
- Is the average position improving for priority clusters? (G3 -- clusters 6-9 should be trending from 30+ toward 10-20 in B-scenario)
- Has any external link been earned? (Track via GSC Links > External links to hub URL)

**Decision gates at 90 days:**
- If tracking to Conservative or below: escalate internal linking, accelerate GEO answer block expansion, consider distributing the family economics explainer (spec 07) as a standalone shareable asset to generate earned links.
- If tracking to Base or above: maintain cadence, begin investing in Phase 2 content expansion (new scenario sections, additional FAQ clusters, spec 18 content outline completion).
- If tracking to Stretch: validate AI citation quality (are citations accurate to SSOT plan facts?), ensure plan SSOT files are current so cited facts remain accurate.

---

### 180-Day Checkpoint (Approximately 2026-12-26)

**Goal of this checkpoint:** Six-month summary. Determine whether the hub is on a trajectory to own the uncontested GEO clusters and make measurable progress on competitive head keywords.

**Questions to answer:**
- What is the measured AI citation share across all 15 clusters? (G4 -- B-scenario: 15-25%)
- Is the hub appearing in Google AI Overviews for any of the head keywords? (Monitor via manual search in incognito; GSC does not directly report AI Overview appearance but correlated queries will show impressions at high average positions that do not match typical organic ranks)
- What is the total unique session count attributable to the hub (organic + AI referral)? (GA4, all sources, filtered to hub URL)
- What is the conversion rate from hub session to plan page click? (G6 / total hub sessions from GA4)
- What is the conversion rate from plan page to verification request, if Phase B endpoint is live? (G7)
- Which scenarios (per the doc 03 cluster-to-hub-section map) are driving the most plan conversions? Use this to guide Phase 3 content prioritization.

**Six-month success definition by scenario:**

| Metric | Conservative | Base | Stretch |
|--------|-------------|------|---------|
| Monthly impressions (GSC) | 10,000 - 25,000 | 30,000 - 70,000 | 60,000 - 150,000 |
| Monthly clicks (GSC) | 400 - 1,000 | 1,200 - 2,800 | 2,400 - 6,000 |
| AI citations confirmed | 3 - 6 | 6 - 12 | 10 - 15 |
| Plan page conversions/month | 100 - 250 | 300 - 700 | 600 - 1,500 |
| Avg. position, priority clusters | 20 - 40 | 10 - 20 | 5 - 15 |

All figures above are MODELED ASSUMPTIONS. Replace with measured actuals at each checkpoint.

---

## 6. LEADING-TO-LAGGING CAUSAL LOGIC

Understanding the causal chain prevents misdiagnosing a lagging problem as a strategy failure.

```
[L1: Indexation] --triggers--> [G1: Impressions begin]
[L2: Schema] --amplifies--> [G1: Impression rate] + [G4: AI citation eligibility]
[L3: Internal links] --drives--> [G1: Impression growth] + [G3: Position improvement]
[L4: Freshness] --sustains--> [G4: AI citation recency] + [G3: Position maintenance]
[L5: GEO citations] --produces--> [AI referral traffic to hub] + [G4: citation share]

[G1: Impressions] + [G3: Positions] --produces--> [G2: Clicks]
[G2: Clicks] x [conversion rate] --produces--> [G6: Plan page conversions]
[G6: Plan page conversions] x [Phase B endpoint] --produces--> [G7: Verification requests]
[G5: Shares/saves] --produces--> [earned links] --produces--> [G3: Position improvement for head keywords]
```

**Key implication:** G6 (plan page conversions) cannot improve meaningfully until G2 (clicks) grows. G2 cannot grow materially until G3 (positions) improves on clusters with real search volume. G3 position improvement for head keywords (Cluster 1) requires earned external links (via G5 shares leading to press/links) which is a 60-120 day cycle. GEO citations (G4) via L5 are the fastest path to brand-visible traffic because they bypass the position ranking chain entirely for AI-native query behavior.

This means: optimize the AI citation path (L2, L4, L5) first, even before organic search positions show movement.

---

## 7. RISK FACTORS

The following risks can invalidate the projection scenarios or depress outcomes below the conservative scenario. Each risk has a stated causal mechanism and a mitigation.

### R1 -- YMYL Scrutiny

**Risk:** Dental insurance is a YMYL (Your Money or Your Life) category under Google's Search Quality Rater Guidelines. Pages in this category face heightened E-E-A-T scrutiny: Google evaluates experience, expertise, authoritativeness, and trustworthiness more aggressively than for non-YMYL topics. A hub page without a named human author, verifiable credentials, and an explicit methodology disclosure may rank below YMYL-compliant competitors regardless of content quality.

**Mechanism:** Google Quality Raters use the hub as a training signal for the core ranking algorithm. A page that ranks for "best dental insurance" must demonstrate that the author has experience evaluating dental insurance plans (not just aggregated data). Without this, rankings for head keywords (Cluster 1) and senior/medical-adjacent keywords (Cluster 6) may be suppressed even if content quality is high.

**Mitigation:**
- Add a named author with credentials (e.g. "CoverCapy editorial team, reviewed by [licensed insurance professional name]") with a linked author page.
- Add a visible "How we chose these plans" methodology section citing SSOT sources (CLAUDE.md rule 13) and explaining the selection criteria (annual maximum, waiting periods, network size, verified plan facts).
- Add a visible "Last updated" date with month and year.
- Link to primary sources (carrier plan documents, NAIC data, SSOT files) from the methodology section.
- This is a launch requirement, not a post-launch fix. YMYL compliance must be present at first indexation.

**Probability of impact without mitigation:** High for Cluster 1 (head keyword) and Cluster 6 (seniors). Moderate for life-event clusters. Low for Cluster 9 (CVS perks, which is not a medical topic).

---

### R2 -- Keyword Cannibalization

**Risk:** The existing /compare-ppo-dental-plans/ page may cannibalize the rebuilt hub if the 301 redirect or canonical (per spec 04) is not implemented correctly. If both URLs are indexable and targeting similar keywords, Google may rank neither, splitting signals.

**Mechanism:** Google's Helpful Content system penalizes duplicate-intent content within a domain when the intent of the pages overlaps substantially. "Compare PPO dental plans" and "best PPO dental plans 2026" are sufficiently similar in intent that two separate crawlable pages can compete against each other internally.

**Mitigation:**
- Implement a 301 redirect from /compare-ppo-dental-plans/ to /dental-insurance/ppo-plans/ per spec 04. This is mandatory before the hub launches.
- Confirm the redirect is in place via a browser curl test before pushing to Vercel.
- Monitor GSC Coverage report for any "Duplicate without canonical tag" flags involving either URL.
- Do not create a separate "compare" page as a child of the hub until Month 3 at earliest and only if it targets a clearly distinct intent (e.g. a side-by-side table tool that is transactional, not informational).

**Probability of impact without mitigation:** High. If the old compare page remains live and indexed after the hub launches, organic performance of the hub will be suppressed for the first 90+ days while Google resolves the duplicate.

---

### R3 -- Dependency on Carrier Fact Accuracy (SSOT Drift)

**Risk:** All plan facts are sourced from /data/plans/ SSOT files per CLAUDE.md rule 13. If a carrier changes plan terms (e.g. Guardian alters the child orthodontics lifetime maximum, or Aetna changes CVS ExtraCare Plus state availability), the SSOT files may become stale. Stale facts published as verified data damage E-E-A-T and can result in AI citation of incorrect information -- which is worse than no citation.

**Mechanism:** Perplexity and ChatGPT cite CoverCapy as a source because the content appears factually precise. If a cited fact is later verifiably wrong (e.g. CoverCapy says Guardian pays $1,500 lifetime max for child ortho but the current plan document shows a different figure), AI platforms may downweight CoverCapy as a source after user feedback or automatic fact-checking signals.

**Mitigation:**
- SSOT files must be reviewed against carrier plan documents at least every 6 months.
- Build a freshness flag into each SSOT file: a "verified through: [date]" line in the frontmatter.
- When a plan fact in the hub copy is derived from an SSOT file, note the SSOT verification date in a comment or footnote ("plan terms as of [date]; verify current terms with carrier").
- Monitor carrier plan pages (linked as sources in each SSOT file) for material changes whenever a hub update is made.
- This is especially critical for: Aetna CVS ExtraCare Plus state list, Mutual of Omaha selectable maximum tiers, Ameritas implant sub-cap interaction with annual maximum, and Guardian adult orthodontics exclusion.

**Probability of impact without mitigation:** Moderate over 6 months; increases to High over 12 months as plan terms naturally evolve.

---

### R4 -- AI Platform Policy and Citation Behavior Changes

**Risk:** AI platforms change their citation behavior. Perplexity shifted from citing Reddit at 46.7% in early 2026; similar shifts could de-prioritize insurance content sites. Google AI Overviews have changed which results they cite multiple times in 2025-2026 (doc 02 notes 17-38% now from top 10 organic, down from 76% in mid-2025).

**Mechanism:** If AI platforms increase the weight of domain authority in citation selection (moving toward NerdWallet/Forbes-dominated citation), CoverCapy's AI citation share would decline even with correct schema and self-contained answer blocks.

**Mitigation:**
- Invest in earned media and external links (G5 to earned link causal chain) to increase domain authority over the 6-month horizon.
- Build citation across multiple AI platforms rather than optimizing for one. A citation in Claude that refers users to CoverCapy is as valuable as a Perplexity citation.
- Monitor the L5 citation monitoring protocol weekly to detect any AI platform shifts quickly.

**Probability of impact:** Moderate. AI citation behavior is in rapid flux in 2026. The safest assumption is that this risk materializes at some point in the 12-month horizon; the 6-month scenario projections are less affected.

---

### R5 -- Technical Vercel / Static Build Failure

**Risk:** A generator run or git push creates a broken build, removing the hub page from indexation temporarily. Per CLAUDE.md, the generator must run from repo root; running from seo-build/ outputs to gitignored directories. A mis-deployed hub page would cause a 404 or render a stale page.

**Mechanism:** Vercel deploys from git main automatically. A push with a missing or malformed hub URL would 404 immediately, potentially triggering a Google crawl error and dropping any indexed status.

**Mitigation:**
- Test the hub URL via curl and browser after every Vercel deploy before announcing the launch.
- Use Vercel deployment preview URLs to validate the hub page renders correctly before promoting to production.
- Include the hub URL in any post-deploy smoke test checklist.

**Probability of impact:** Low per individual deploy, but the static nature of the site means the risk is ever-present. Mitigated by Vercel's instant rollback feature.

---

## 8. APPENDIX: GEO QUESTION MONITORING PROTOCOL

The following is a suggested weekly manual protocol for tracking GEO citations (L5 / G4) until automated tooling is configured.

**Session setup:** Use a fresh incognito browser session or a tool like Profound.co (if available). Do not be logged into any CoverCapy-branded account to avoid personalization bias.

**Priority question set (run weekly at minimum):**

From Cluster 6 (seniors):
- "What is the best dental insurance for someone over 65 in 2026?"
- "Which dental plan has no waiting period and covers implants for seniors?"
- "What standalone dental insurance is best for seniors not on Medicare Advantage?"

From Cluster 7 (no waiting period):
- "Which dental insurance has no waiting period for major work?"
- "What PPO dental plan can I use for a crown right away?"
- "Does Ameritas PrimeStar have no waiting period for major dental work?"

From Cluster 8 (implants):
- "What dental insurance covers implants in 2026?"
- "What is the lifetime implant maximum on Mutual of Omaha Dental Preferred?"
- "Which dental plan covers implants with no waiting period?"

From Cluster 9 (CVS perks):
- "Which dental insurance plan comes with a CVS ExtraCare Plus membership?"
- "Does Aetna Dental Direct give you a CVS monthly reward?"
- "What perks come with Aetna Dental Direct?"

**What to log:** Date, platform (Perplexity / ChatGPT / Claude), exact query, whether covercapy.com appeared in citations (yes/no), position in citation list (1st, 2nd, etc.), and excerpt of the cited text if visible.

**Logging tool:** A simple Google Sheet with one row per query-run. Filter by date and platform to generate monthly summaries for the G4 KPI.

---

*End of 20-seo-projection-kpis.md*
