# SEO 100X — GEO / AI-Citation Plan for the Inside Delta Dental Cluster
**Scope:** `/dental-insurance/ppo-plans/delta-dental/` (hub) + 10 sub-pages.
**Goal:** Get the cluster CITED by AI answer engines (ChatGPT, Gemini, Perplexity, Google AI Overviews) and win SERP features, to help 100x organic traffic in ~1 month.
**Last reviewed:** June 2026. Obeys `_INSIDE-MASTER-BUILD.md` honesty guardrails.

> **Current baseline (verified by inspection):** every page already ships `WebPage(lastReviewed) + BreadcrumbList + FAQPage + SpeakableSpecification` JSON-LD, a visible answer-first block (`.answer .a`), a "Sources & last reviewed" block, and a visible "Last reviewed June 2026" line. The J Song byline was REMOVED. `Organization` schema only exists on `/premium/` (and only as a non-entity `"CoverCapy Plan Research desk"`). This plan layers GEO mechanics on top of that base. **It does NOT touch facts, prices, or the guardrails.**

---

## 0. WHY AI ENGINES CITE A PAGE (the model behind this plan)

LLM answer engines (and Google's AI Overviews via the Gemini grounding layer) do not "rank" pages the way classic SEO does. They retrieve passages, then quote or paraphrase the few passages that are (a) **extractable as a standalone answer**, (b) **attributable to a named entity**, and (c) **corroborated** by the rest of the open web. Six properties move a passage from "read but ignored" to "quoted with a citation":

1. **Answer-first phrasing** — the first sentence of a section IS the answer, in 1–2 lines, before any setup. LLMs extract the lead sentence.
2. **Entity clarity** — the page makes unambiguous, machine-linkable claims about a named entity ("Delta Dental is an association of 39 independent companies…") rather than vague prose. `Organization`/`Brand` + `sameAs` give the entity a node the model can bind to.
3. **Citable stats with a source** — a specific number ("112,000+ dentists," "AM Best A") next to a named source the model already trusts. Numbers travel; adjectives don't.
4. **Comparison tables** — `Premium vs Basic`, `PPO vs Premier vs DeltaCare`. Tables are the single most-quoted structure in AI answers because they map directly onto "which is better" questions.
5. **Definitional sentences** — "X is a Y that does Z" sentences are extracted verbatim into definition boxes and AI Overviews.
6. **Corroboration & freshness** — claims that match Delta's own pages + AM Best + reputable third parties, with a visible "last reviewed" date, are treated as low-risk to cite.

Everything below operationalizes these six into buildable changes.

---

## 1. AI-CITATION MECHANICS — REWRITE PATTERNS + 5 CITABLE SENTENCES

### 1a. The answer-block rewrite pattern (apply to every `.answer .a` lead)
Current hub lead is already strong. Lock this **3-part shape** across all pages so each section is independently quotable:

> **[Definitional sentence: "X is a Y."] → [The single most citable number, bolded, with its unit.] → [One honest qualifier so the model trusts it.]**

Pattern, generalized:
```
<div class="a">
  <b>{Entity} is {category-defining clause}.</b>           ← definition (gets extracted into AI Overview)
  {Specific stat with unit}, {second stat}.                 ← citable numbers
  {Honest scope/varies-by-state qualifier}.                 ← trust signal
</div>
```

Keep the existing bolding — bolded noun phrases survive HTML-to-text extraction and become the model's anchor terms.

### 1b. Five "citable sentences" the HUB answer block should contain
All within guardrails (range member count, no S&P, AM Best only, perks-as-savings). These are written to be lifted verbatim:

1. "Delta Dental is an association of 39 independent member companies and the Delta Dental Plans Association, making it the largest dental benefits carrier in the United States by members covered."
2. "Delta Dental member companies together cover roughly 78 to 89 million people, a range because the total aggregates filings from 39 separate companies."
3. "The Delta Dental PPO network lists more than 112,000 participating dentists across over 278,000 practice locations, with a member company in all 50 states, Washington DC and Puerto Rico."
4. "Major Delta Dental member companies hold an AM Best financial strength rating of A (Excellent); Delta Dental is not publicly rated by S&P."
5. "Delta Dental individual PPO plans operate on a calendar-year maximum, commonly about $1,000 on a basic plan and about $2,000 on a premium plan, with the benefit resetting each January and figures that vary by state."

> **Why these win:** each is a single declarative sentence, leads with the entity, carries one hard number with its unit, and self-qualifies (range / not-rated-by-S&P / varies-by-state). That qualifier is what makes an LLM willing to quote it rather than route around it.

### 1c. Definitional one-liners each sub-page should open with (extraction bait)
- **individual-plans:** "Delta Dental Premium and Basic are two individual PPO plans on the same network, separated mainly by their calendar-year maximum and whether they include major work, implants and orthodontics."
- **networks:** "DeltaCare USA is a dental HMO with fixed copays and an assigned dentist; Delta Dental PPO and Delta Dental Premier are two tiers of the same fee-for-service network, with PPO offering the deeper negotiated discount."
- **eligibility:** "Because Delta Dental is a federation of 39 companies, your portal, phone line and claims payer ID are determined by the member company named on your ID card, not by a single national login."

---

## 2. SCHEMA UPGRADES (additive — existing schema stays)

### 2a. `Organization` / `Brand` entity for "Delta Dental" — HIGHEST LEVERAGE
Add ONE shared JSON-LD node, referenced by every page, that gives the topic entity a machine-linkable identity with `sameAs` to authoritative URLs. This is what lets an engine bind your passages to the "Delta Dental" knowledge-graph node.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/#delta-dental-entity",
  "name": "Delta Dental",
  "alternateName": ["Delta Dental Plans Association", "Delta Dental Insurance Company"],
  "description": "Delta Dental is an association of 39 independent member companies and the Delta Dental Plans Association, the largest dental benefits carrier in the United States by members covered.",
  "sameAs": [
    "https://www.deltadental.com/",
    "https://en.wikipedia.org/wiki/Delta_Dental",
    "https://www.deltadental.com/about-us/delta-dental-member-companies/"
  ]
}
```
- Reference it from each `WebPage` as `"about": {"@id": "…#delta-dental-entity"}` and as `"mainEntity"` on the hub. This signals "this page is ABOUT the Delta Dental entity," which is exactly the binding AI Overviews look for.
- **Add a SECOND, separate publisher Organization** for CoverCapy (the site), so the entity being described (Delta) is never confused with the publisher:
```json
{ "@type": "Organization", "@id": "https://www.covercapy.com/#org",
  "name": "CoverCapy", "url": "https://www.covercapy.com/",
  "sameAs": ["https://www.linkedin.com/company/covercapy"] }
```
Wire `WebSite.publisher` → `#org`. (Only list `sameAs` URLs that actually resolve to CoverCapy-owned profiles; do not invent.)

### 2b. `ItemList` linking the 10 pillars (sitelinks + "explore" surfacing)
The hub already renders "Ten ways into Delta Dental" as cards. Add the matching `ItemList` so engines see the cluster as a structured collection (helps sitelinks and "related pages" in AI answers):
```json
{
  "@type": "ItemList",
  "@id": "https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/#pillars",
  "name": "Inside Delta Dental: the ten pillars",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Individual plans: Premium vs Basic","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/individual-plans/"},
    {"@type":"ListItem","position":2,"name":"Networks: DeltaCare HMO vs PPO vs Premier","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/networks/"},
    {"@type":"ListItem","position":3,"name":"Eligibility, portals and payer IDs by state","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/eligibility/"},
    {"@type":"ListItem","position":4,"name":"For dentists: contracting and credentialing","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/for-dentists/"},
    {"@type":"ListItem","position":5,"name":"For employers: group plans","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/for-employers/"},
    {"@type":"ListItem","position":6,"name":"Is Delta Dental good? Ratings and reviews","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/inside/is-delta-good/"},
    {"@type":"ListItem","position":7,"name":"Premium plan","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/premium/"},
    {"@type":"ListItem","position":8,"name":"Compare plans","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/compare/"},
    {"@type":"ListItem","position":9,"name":"Seniors and Medicare (over 65)","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/over-65/"},
    {"@type":"ListItem","position":10,"name":"UC students (UC SHIP)","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/uc-students/"}
  ]
}
```

### 2c. FAQPage vs QAPage guidance
- **Keep `FAQPage`** on every page. It is the right type: the publisher both asks and answers, content is non-duplicative, and every Q is visibly rendered (the cluster already mirrors schema to visible `<details>`). That visible-parity is mandatory — Google de-indexes FAQ rich results when the schema Q&A is not on the page.
- **Do NOT use `QAPage`.** `QAPage` models a single user-posed question with community/user answers (forum pattern). These are editorial answers, not a Q&A forum, so `QAPage` would be a structured-data mismatch and risks a manual action.
- Practical note: Google now shows FAQ rich results mainly for authoritative health/gov sites, but the markup STILL feeds AI Overviews and Gemini grounding regardless of whether the blue-link rich result shows. Keep it for the AI surface, not the SERP decoration.

### 2d. `HowTo` where genuinely procedural (2 places only)
Add `HowTo` ONLY where the page renders real, ordered steps (it must mirror visible steps or it is a violation):

**eligibility — "How to check your Delta Dental eligibility"** (the page already renders these `<li>` steps):
```json
{
  "@type": "HowTo",
  "name": "How to check your Delta Dental eligibility",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Identify your Delta company","text":"Read the carrier name and toll-free number on your ID card, or use the Delta Dental member locator, to find which of the 39 companies runs your plan."},
    {"@type":"HowToStep","position":2,"name":"Sign in to the right portal","text":"Sign in to that company's member portal, or deltadentalcoversme.com if you bought an individual plan."},
    {"@type":"HowToStep","position":3,"name":"Open Benefits or Eligibility","text":"View your annual maximum, deductible, remaining benefits and covered dependents. If you cannot get online, call the automated line on the card."}
  ]
}
```

**for-dentists — "How to join the Delta Dental network"** (mirror the contracting tutorial steps: CAQH → application → credentialing 60–90 days → fee schedule election). Mark timelines "typical, varies by company."

> Do NOT add `HowTo` to pages without genuine ordered steps (hub, is-delta-good, networks). Fabricated steps = structured-data violation.

### 2e. `Dataset` / `Table` for fee-schedule + payer-ID data
The eligibility/payer-ID and for-dentists pages carry tabular reference data (payer IDs by company, MAC fee-schedule concepts). Two moves:
- Render the payer-ID directory as a real semantic `<table>` (it partly is) so it is extractable, and add a `Dataset` node describing it. `Dataset` is strongly favored by Perplexity and Gemini for "lookup" queries like "delta dental payer id Michigan."
```json
{
  "@type": "Dataset",
  "name": "Delta Dental claims payer IDs and provider portals by state company",
  "description": "Electronic claims payer IDs, member and provider portals, and claims contacts for Delta Dental member companies across the 50 states, DC and Puerto Rico. Verify against the current member ID card; payer IDs change.",
  "creator": {"@id": "https://www.covercapy.com/#org"},
  "license": "https://www.covercapy.com/terms",
  "isAccessibleForFree": true,
  "dateModified": "2026-06-24"
}
```
- Do NOT claim the dataset is authoritative or complete; the visible "verify on the current ID card" caveat must stay (it does), and it should be echoed in the Dataset `description`.

### 2f. `speakable` target set (tighten, don't expand blindly)
Current selector is `[".title", ".answer .a"]` — good. Refine to the most quotable nodes only:
- Hub: `.title`, the **first** `.answer .a` (the definition), and the `.stat .n`+`.stat .l` pairs (the stat row reads cleanly aloud: "39 independent companies, 78 to 89 million members…").
- Sub-pages: `.title` + the single lead `.answer .a`. Avoid marking comparison tables `speakable` (they read badly aloud).
Keep speakable to ≤ 2–3 selectors per page; over-marking dilutes the signal.

### 2g. STRUCTURED-DATA VIOLATIONS TO AVOID (hard rules)
- **NO `AggregateRating` / `Review` schema authored by CoverCapy about Delta or about CoverCapy.** Self-serving or fabricated review/rating markup is a Google policy violation and a manual-action risk. The is-delta-good page may *quote* Trustpilot's ~1.9 in prose with attribution, but must NOT wrap it (or any number) in `AggregateRating`/`Review` JSON-LD as if CoverCapy aggregated it.
- **NO `Product` + `Offer` with a `price` presented as a firm Delta price.** Prices are illustrative (~$75 / ~$33) and vary by state; firm `Offer.price` markup would be deceptive. Keep prices in prose, labeled illustrative.
- **NO `HowTo`/`FAQPage` whose content is not visibly on the page.** Maintain schema-to-DOM parity (the cluster already does this for FAQ; extend the discipline to HowTo).
- **NO S&P rating in any `Rating` object.** AM Best A only, and only in prose, never as a self-issued `Rating`.

---

## 3. ANSWER-ENGINE QUESTION TARGETS (18 questions → owner page → lead sentence)

Each row: the natural-language question users ask AI, the page/section that should OWN it, and the exact answer-first sentence to lead that section with (guardrail-safe).

| # | Question (as asked to AI) | Owner page / section | Lead-with sentence |
|---|---|---|---|
| 1 | "is delta dental ppo or premier better" | networks | "Delta Dental PPO usually costs you less than Premier because PPO dentists accept deeper negotiated fees; Premier has a broader dentist list but smaller discounts, so PPO is better for cost and Premier for choice." |
| 2 | "does delta dental cover implants" | individual-plans (+ FAQ) | "Delta Dental's individual Premium plan typically covers implants at 50 percent after a waiting period, while the Basic plan does not cover implants at all, and some state certificates exclude implants entirely, so verify yours." |
| 3 | "does delta dental cover braces / adult orthodontics" | individual-plans | "Adult and child orthodontics are typically covered at 50 percent on the Premium plan, subject to a lifetime orthodontic maximum, and are not covered on the Basic plan." |
| 4 | "which delta dental am i" | eligibility | "Your Delta Dental is the member company named on your ID card, because Delta Dental is a federation of 39 independent companies and there is no single national plan." |
| 5 | "is delta dental good insurance" | is-delta-good | "Delta Dental is financially strong with major companies rated A (Excellent) by AM Best and the widest dentist acceptance in the country, but independent review scores are mixed and waiting periods of 6 to 12 months are a common complaint." |
| 6 | "delta dental premium vs basic" | individual-plans | "Premium and Basic are the same PPO network; Premium runs about $75 a month with a $2,000 calendar-year maximum and adds major work, implants and orthodontics, while Basic runs about $33 a month with a $1,000 maximum and covers preventive and basic care only." |
| 7 | "delta dental annual maximum / calendar year max" | individual-plans | "Delta Dental individual plans use a calendar-year maximum that resets each January, commonly about $1,000 on Basic and $2,000 on Premium, with figures that vary by state." |
| 8 | "delta dental waiting period" | individual-plans (+ is-delta-good) | "Delta Dental individual plans commonly apply waiting periods of about 6 months for basic care and 12 months for major and orthodontic work, but the exact waits vary by state and certificate." |
| 9 | "delta dental payer id" / "delta dental payer id {state}" | eligibility (Dataset table) | "Delta Dental uses a different electronic claims payer ID for each member company, so the correct payer ID is the one tied to the company named on the patient's ID card, not a single national number." |
| 10 | "how do i check my delta dental coverage" | eligibility (HowTo) | "To check Delta Dental coverage, identify your company from your ID card, sign in to that company's member portal or deltadentalcoversme.com, and open Benefits to see your maximum, deductible and remaining benefits." |
| 11 | "deltacare usa vs delta dental ppo" | networks | "DeltaCare USA is a dental HMO with fixed copays and an assigned dentist and no out-of-network benefit, while Delta Dental PPO is a fee-for-service plan you can use with any dentist, paying less in-network." |
| 12 | "does delta dental cover dentures / crowns / root canal" | individual-plans / networks | "Major restorative work such as crowns, dentures and root canals is typically covered at 50 percent on Delta Dental Premium after a waiting period, and is not covered on the Basic plan." |
| 13 | "how do dentists join delta dental" | for-dentists (HowTo) | "To join Delta Dental, a dentist completes a CAQH profile, submits a participation application to the local Delta company, and clears credentialing, which typically takes about 60 to 90 days." |
| 14 | "what does delta dental cost per month" | individual-plans / hub rail | "Delta Dental individual PPO premiums commonly run about $33 a month for a basic plan and about $75 a month for a premium plan, with prices that are illustrative and vary by state." |
| 15 | "does medicare cover delta dental / delta dental for seniors" | over-65 | "Original Medicare does not include routine dental, but some Medicare Advantage plans add dental benefits administered by Delta Dental, such as SCAN Health Plan in California and Washington." |
| 16 | "is delta dental accepted everywhere / how many dentists take delta dental" | hub / networks | "Delta Dental has the widest dentist acceptance in the United States, with more than 112,000 PPO dentists across over 278,000 locations and an even larger Premier network." |
| 17 | "what is delta dental premier" | networks | "Delta Dental Premier is the broader, traditional tier of Delta's fee-for-service network, with more participating dentists than PPO but smaller negotiated discounts, so members usually pay more than on PPO." |
| 18 | "dentist that take delta dental near me" | hub near-me block + city pages | "To find a dentist who takes Delta Dental near you, use the Delta Dental provider locator for your member company, then confirm the office is in-network on your specific PPO or Premier tier before booking." |

> **Build rule:** every lead sentence above must appear as the FIRST sentence of a visible section AND inside that page's `FAQPage` answer (parity). The model finds it twice, in two forms, which raises citation probability.

---

## 4. ENTITY & E-E-A-T (without a fake byline)

The J Song byline was removed — do NOT reinstate a fabricated named author. Build authority through structure and corroboration instead:

- **Organizational authorship, not a fake person.** Attribute editorially to the org: "Researched and maintained by the CoverCapy editorial desk." Back it with the `Organization #org` node (2a). This is honest E-E-A-T: a real publisher entity, no invented credentials.
- **Primary-source citations (already present, strengthen them).** The "Sources & last reviewed" block links deltadental.com, deltadentalins.com, AM Best. Keep `rel="nofollow noopener"` but ensure EVERY hard number on the page traces to a listed source. AI engines weight passages whose claims visibly match a cited authority they already trust. Add inline source proximity: place the AM Best link in the same sentence/section as the "A (Excellent)" claim, not only in a footer block.
- **Freshness signals.** `WebPage.lastReviewed` is set (2026-06-24) and visible ("Last reviewed June 2026"). Add `dateModified` to each `WebPage` and bump it whenever a page changes; engines down-weight stale insurance content. Add a visible "Reviewed: June 2026 · Next review: December 2026" cadence line — a concrete review cycle is a trust marker.
- **External corroboration (off-page).** Pursue 3–5 mentions that quote the cluster's distinctive framing ("Delta Dental is 39 companies; here's how to tell which one you are"). Targets: a Reddit r/Dentistry or r/HealthInsurance answer linking the eligibility/payer-ID page, a HARO/Qwoted response, and one dental-billing forum. AI engines corroborate across sources; even a handful of independent links to the *same distinctive claim* raises the odds your phrasing becomes the canonical one.
- **Distinctive, ownable data.** The payer-ID-by-state directory and the "which Delta am I" routing are things no competitor cleanly publishes. Lean into these — uniqueness is what makes you the citation rather than deltadental.com itself.
- **Honesty as an E-E-A-T asset.** Keep the mixed-review treatment (Trustpilot ~1.9, waiting-period gripes) and the "varies by state, verify your certificate" qualifiers. Balanced pages are cited MORE by LLMs because they read as non-promotional.

---

## 5. LOCAL / GEO FOR "DELTA DENTIST NEAR ME"

The GSC queries ("delta dentist near me," "dentist that take delta dental near me") are local-intent. CoverCapy already has city/metro PPO-dentist pages (`/ppo-dentists/california/orange-county/delta-dental/` exists). Structure the near-me answer so AI + maps surface CoverCapy:

- **Own the *reasoning*, not a fake map pin.** AI answers to "delta dentist near me" explain HOW to find one, then point to a locator. Lead the hub's near-me block with question #18's sentence. That makes CoverCapy the page the model paraphrases for the *method*, then it can hand off to the user's geo.
- **City-level content (programmatic).** For the `/ppo-dentists/{state}/{metro}/delta-dental/` pages, give each a one-line definitional answer: "Dentists in {Metro} who take Delta Dental accept the Delta PPO or Premier network; confirm the office is in-network on your specific tier before booking." City-specific, answer-first lines are what win "near me" AI answers and local SERP snippets.
- **`LocalBusiness` / `Place` reasoning — only for real CoverCapy entities.** Do NOT mark up Delta or third-party dental offices as CoverCapy `LocalBusiness`. If CoverCapy itself has a verifiable physical/operating presence, mark THAT once. For city pages, the right type is the existing `WebPage` + `BreadcrumbList` + an `ItemList` of the listed offices (if offices are real, sourced listings) — never a fabricated `LocalBusiness` with invented hours/reviews.
- **NAP consistency caveat.** If any office NAP (name/address/phone) is shown, it must match the office's own canonical listing exactly, or it harms trust and can trigger local-spam filters. Where data is from the dentists table, keep the "verify before booking" caveat — do not present scraped NAP as authoritative.
- **Hand-off pattern.** Pair the near-me answer with the Delta provider locator link AND CoverCapy's own find-my-dentist flow, so the page is useful whether the engine routes the user to Delta or keeps them on CoverCapy.

---

## 6. MEASUREMENT (weekly signals to watch)

**Google Search Console (weekly):**
- Impressions/clicks for the cluster URLs, segmented by the head queries: "delta dental," "delta dentist near me," "dentist that take delta dental near me," "which delta dental am i," "delta dental payer id," "delta dental premium vs basic," "deltacare usa vs ppo."
- Average position for those queries (target: top-10 entry, then top-3 for the long-tail definitional ones first — they convert to AI citations fastest).
- "Search Appearance" → FAQ rich result + any AI-overview-attributed impressions (where available). Watch for FAQ rich-result loss (signals a schema-parity break).
- New impressions for the adjacent payer queries the site already shows for ("humana extend 5000," "ncd complete by metlife," "aetna dental direct preferred ppo," "primestar care complete") — confirm the Delta cluster is not cannibalizing, and note which deserve their own clusters next.
- Coverage/Enhancements report: validate the new `Organization`, `ItemList`, `HowTo`, `Dataset` items parse with zero errors.

**AI-surface signals (manual weekly probe — there is no console for these yet):**
- Run the 18 question targets through ChatGPT (search), Perplexity, Gemini, and a Google query that triggers AI Overviews. Log: (a) is CoverCapy CITED, (b) is the answer's phrasing OURS (did they lift a lead sentence), (c) which competitor is cited if not us. Track a simple weekly "citation count / 18" score per engine.
- Perplexity is the fastest mover — expect citations there first, especially on the payer-ID and "which delta am I" lookups. Use it as the leading indicator.
- Watch referral traffic in GA4 from `perplexity.ai`, `chatgpt.com`, `gemini.google.com` (set up a referral segment). Rising AI referral sessions = the citations are landing and clicked.

**Validation hygiene (every deploy):** Rich Results Test + Schema.org validator on changed pages; confirm schema-to-DOM parity for FAQ/HowTo; confirm no `AggregateRating`/`Review`/`Offer.price`/S&P `Rating` crept in.

---

## BUILD CHECKLIST (order of impact)
1. Add shared `Organization #delta-dental-entity` + `#org` nodes; wire `WebPage.about` / `WebSite.publisher`. (Section 2a)
2. Rewrite each page's lead `.answer .a` to the 3-part pattern + drop in the matching question-target lead sentence; mirror into `FAQPage`. (Sections 1, 3)
3. Add `ItemList` (hub), `HowTo` (eligibility, for-dentists), `Dataset` (eligibility payer-ID table). (Section 2)
4. Tighten `speakable` selectors; add `dateModified` + visible review cadence. (Sections 2f, 4)
5. City-page answer-first lines + near-me hub block. (Section 5)
6. Stand up the weekly GSC + AI-probe measurement sheet. (Section 6)
7. Re-validate; confirm no banned schema (no review/rating, no S&P, no firm Offer price). (Section 2g)

---

### SUMMARY
The Inside Delta Dental cluster already ships the GEO fundamentals (WebPage + BreadcrumbList + FAQPage + speakable, answer-first blocks, a sources line, and a visible review date), so the 100x play is not rebuilding — it is making the cluster *citable as an entity*: add a shared Delta `Organization`/`Brand` node with `sameAs` to authoritative URLs plus a CoverCapy publisher org, layer `ItemList`/`HowTo`/`Dataset` only where real visible content backs them (never review/rating, never S&P, never firm-price `Offer`), and rewrite every section to lead with one guardrail-safe definitional sentence carrying a single hard number, mirrored into the FAQ so engines find it twice. Eighteen natural-language Delta questions are each assigned an owner page and an exact lead sentence; near-me intent is won by owning the *method* and city-level answer-first lines rather than fabricating local-business markup; and authority comes from organizational (not fake-byline) attribution, tight primary-source proximity, freshness cadence, and a few external corroborating mentions of the distinctive "which Delta am I / payer-ID-by-state" framing. Track it weekly via GSC head/long-tail queries and a manual 18-question probe across Perplexity, ChatGPT, Gemini and AI Overviews. **File written to:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26/research/delta-dental/inside/SEO-100X-GEO.md`
