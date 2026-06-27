# SEO Keyword Cannibalization Audit — CoverCapy Dental Glossary
**Prepared:** June 2026 | **Scope:** /dental-insurance-glossary/ vs all other CoverCapy pages

---

## 1. WHAT EXISTS TODAY (SOURCE-OF-TRUTH AUDIT)

### Pages with definitional dental-insurance content

| Page | URL | Terms Defined | Status |
|------|-----|---------------|--------|
| Compare PPO Plans | /compare-ppo-dental-plans/ | 22 terms (GLOSS array, TIPS object) — full inline definitions in tooltips + #terms section with dictGrid | Live |
| Dental Insurance No Waiting Period | /dental-insurance-no-waiting-period/ | "waiting period" definition block (one primary term) | Live (task #50) |
| Dental Insurance Between Jobs | /dental-insurance-between-jobs/ | "activation", "waiting period", "effective date", COBRA context | Live (task #51) |
| Dental Insurance For Self-Employed | /dental-insurance-for-self-employed/ | "plan types" (PPO/HMO/indemnity), "deductible", "annual maximum", tax context | Live (task #51) |
| Dental Insurance Immediate Coverage | /dental-insurance-immediate-coverage/ | "effective date", "day-1 activation", "no-wait", "basic vs major services" | Live (task #51) |
| T5 Dentist Pages (6,400+ pages) | /dental/{state}/{market}/{city}/{dentist}/ | "PPO", "in-network", carrier names in body prose and FAQ | Live (generated) |
| Dental Insurance Glossary | /dental-insurance-glossary/ | All 22+ terms with full standalone definitions | In build (task #52) |

### The 22 terms in compare-ppo-dental-plans.html GLOSS array
Extracted from source (line 1298):
`ppo`, `waiting-period`, `annual-maximum`, `deductible`, `coinsurance`, `in-network`, `out-of-pocket`, `balance-billing`, `missing-tooth`, `calendar-year`, `plan-year`, `effective-date`, `day-one`, `allowed-amount`, `ada-fee`, `cdt`, `coverage-preventive`, `coverage-basic`, `coverage-major`, `implants`, `whitening`, `vision`

---

## 2. CONFLICT ANALYSIS BY TERM CLUSTER

### Cluster A: Core plan-mechanics terms
**Terms:** waiting-period, annual-maximum, deductible, coinsurance, in-network, out-of-pocket, effective-date, day-one

**Conflict map:**

| Term | Compare page | Situation pages | Glossary |
|------|-------------|-----------------|---------|
| waiting-period | Tooltip definition + dictGrid entry | /no-waiting-period/ has full definition block; /between-jobs/ discusses 0-wait plans | Will have canonical standalone definition |
| annual-maximum | Tooltip + dictGrid | /self-employed/ mentions it in tax/cost context | Will have canonical standalone definition |
| deductible | Tooltip + dictGrid | /self-employed/ mentions it | Will have canonical standalone definition |
| effective-date | Tooltip + dictGrid | /between-jobs/ and /immediate-coverage/ both define it in context | Will have canonical standalone definition |
| day-one | Tooltip + dictGrid | /immediate-coverage/ is built around this concept | Will have canonical standalone definition |

**Current ranking situation:** None of these pages are likely ranking against each other yet — the site is young and the situation pages may have thin backlink profiles. Risk level is low now but will grow as the site indexes.

**Primary cannibalization risk:** "waiting period dental insurance" could be contested between /dental-insurance-no-waiting-period/ (transactional intent, should rank for "dental insurance no waiting period") and /dental-insurance-glossary/ (informational intent, should rank for "what is a dental insurance waiting period" / "dental waiting period definition"). These are different queries — this is intent differentiation, not true cannibalization.

---

### Cluster B: Situation-page term overlaps
**Terms:** effective-date, day-one, activation, plan-type, deductible

**Conflict map:**

| Term | /immediate-coverage/ | /between-jobs/ | /self-employed/ | Glossary |
|------|---------------------|----------------|-----------------|---------|
| effective-date | Primary subject | Secondary subject | Not primary | Definitional |
| day-one / activation | Primary subject | Mentioned | Not primary | Definitional |
| plan types (PPO/HMO) | Mentioned | Mentioned | Primary subject | PPO entry |
| deductible | Mentioned | Mentioned | Discussed | Definitional |

**Resolution:** These overlaps are manageable because each situation page has a different user intent angle:
- /immediate-coverage/ = "I need a dentist now, which plan covers me today?" (urgency-driven)
- /between-jobs/ = "I just lost employer coverage, what do I do?" (life-event-driven)
- /self-employed/ = "I'm 1099, what plan type makes sense?" (category-driven)
- /glossary/ = "What does this term mean?" (definitional)

The definitions on situation pages are inline context — not standalone term entries. This is not cannibalization; it is contextual reinforcement. No action required to remove term mentions from situation pages.

---

### Cluster C: T5 page vs. glossary — PPO and in-network mentions

**Conflict:** Every T5 page (6,400+) mentions "PPO", "in-network", and carrier names in body prose. The about section contains sentences like: "accepts Delta Dental PPO and Aetna in-network patients." FAQs include carrier acceptance questions.

**This is NOT cannibalization.** T5 pages target local navigational queries ("dentist name city state") and local commercial queries ("PPO dentist [city]"). The glossary targets informational queries ("what is PPO dental insurance", "what does in-network mean"). Google distinguishes these clearly. T5 pages should never outrank the glossary for definitional queries.

**No action required.**

---

### Cluster D: Compare page vs. glossary — the real primary conflict

**This is the highest-priority cannibalization risk.**

The `/compare-ppo-dental-plans/` page has:
1. A full `#terms` section with heading "The words that decide your bill" and a `dictGrid` rendering all 22 GLOSS terms as full definition cards
2. 22 hover tooltips (`cc-tip` spans) throughout the page with definitions, "why it matters" fields, and links to `#term-{slug}`
3. A page title focused on comparison but structural term content that Google can index as definitional

**The glossary page, once built, will target:**
- "dental insurance glossary"
- "PPO dental insurance terms"
- "what is [term] dental insurance"
- "dental coinsurance meaning"
- "dental deductible definition"

**The compare page is targeting:**
- "compare PPO dental plans"
- "best individual dental insurance"
- "[carrier] dental plan review"

**The `#terms` section on the compare page blurs this.** Google may index `/compare-ppo-dental-plans/#term-coinsurance` as a definition page competing with `/dental-insurance-glossary/#coinsurance`.

---

## 3. RESOLUTION STRATEGIES

### Strategy 1 (Priority 1): Thin the compare-page dictGrid, point to glossary

**Action:** Transform the `#terms` section on `/compare-ppo-dental-plans/` from a full standalone glossary into a "quick reference" that links to the authoritative glossary entry for each term.

**Implementation:**
- Keep the dictGrid but reduce each entry to a 1-sentence summary (not the full tooltip definition)
- Add a link on each dictGrid card: `Full definition → /dental-insurance-glossary/#term-{slug}`
- Keep the hover tooltips as-is (they are UX, not competing with the glossary for rankings — they are JavaScript-rendered and unlikely to be indexed as page content)
- Add a section-level link at the top of `#terms`: "For full definitions and explanations, see the [PPO Dental Insurance Glossary](/dental-insurance-glossary/)."

**Copy change for dictGrid entries:** Shorten from full paragraph to one sentence + link. Example:
- Before: "Your first out-of-pocket dollars on covered restorative services before insurance starts reimbursing, usually around $50. Preventive cleanings and exams are usually exempt."
- After: "Your out-of-pocket before insurance pays on restorative work. [Full definition →](/dental-insurance-glossary/#deductible)"

**What this achieves:** The compare page retains UX value for buyers who need quick context while scanning plans. The glossary becomes the canonical destination for definitional intent queries. Internal link juice flows from the high-traffic compare page to the glossary.

---

### Strategy 2 (Priority 2): Self-canonical on glossary, no exceptions

**Recommendation:** The glossary page canonicalizes to itself:
```html
<link rel="canonical" href="https://www.covercapy.com/dental-insurance-glossary/" />
```

**No exceptions needed.** The individual term definitions on the glossary do not need their own canonical URLs. The single-page approach (one URL, anchor fragments for each term) is correct for a glossary of this size. Fragment URLs (`#coinsurance`) are not indexed separately by Google.

**Do not canonical the compare page's `#terms` section to the glossary.** The compare page is a different page with a legitimate primary purpose. Fragment-level canonicals are not supported by Google.

---

### Strategy 3 (Priority 3): Differentiate situation pages — keep term definitions contextual, not standalone

**For /dental-insurance-no-waiting-period/:**
- The definition block for "waiting period" is fine as inline context — it is serving the transactional query, not competing for "dental waiting period definition"
- Add a link: "Learn all PPO terms → /dental-insurance-glossary/" (natural navigation CTA)
- Do NOT remove the definition — the page needs it to answer the user's question
- The canonical on this page remains self-canonical to `/dental-insurance-no-waiting-period/`

**For /dental-insurance-between-jobs/, /dental-insurance-for-self-employed/, /dental-insurance-immediate-coverage/:**
- Same approach: keep contextual definitions, add a "See our full glossary" link near the first term reference
- These pages have distinct user intents (life situations) and will naturally rank for different queries than the glossary
- Self-canonical on each page

---

### Strategy 4 (Priority 4): Schema differentiation

**On the glossary page:** Add `DefinedTermSet` + `DefinedTerm` schema for each entry. This signals definitional authority to Google and helps the page appear in definition-style featured snippets.

```json
{
  "@type": "DefinedTermSet",
  "name": "PPO Dental Insurance Glossary",
  "url": "https://www.covercapy.com/dental-insurance-glossary/",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Waiting Period",
      "description": "A delay between enrollment and when a coverage tier activates...",
      "url": "https://www.covercapy.com/dental-insurance-glossary/#waiting-period"
    }
    // ... one per term
  ]
}
```

**On the compare page:** Schema is `WebPage` + `FAQPage` (for the FAQ section). Do NOT add DefinedTerm schema to the compare page. This signals to Google that the compare page is not the definitional authority.

**On situation pages:** Schema is `Article` or `FAQPage`. Do NOT add DefinedTerm schema.

---

### Strategy 5 (Priority 5): Internal link architecture — funnel definitional traffic to glossary

Every page that uses a term in its content should link to the glossary entry on first use:
- Compare page: dictGrid card links (per Strategy 1)
- Situation pages: inline link on first mention of each defined term
- T5 pages: the generator's `buildDentistPage()` function can add a tooltip or link for "PPO" on first use → `/dental-insurance-glossary/#ppo`

**For T5 pages specifically:** A single inline link "What is PPO dental insurance? →" in the about-prose section, linking to the glossary, would create 6,400+ internal links to the glossary. This is a significant PageRank signal and should be implemented in `generate-plans.js`.

---

## 4. SELF-CANONICAL RECOMMENDATIONS

| Page | Canonical | Exception? |
|------|-----------|------------|
| /dental-insurance-glossary/ | Self-canonical | No exceptions |
| /compare-ppo-dental-plans/ | Self-canonical | No — do not canonical to glossary |
| /dental-insurance-no-waiting-period/ | Self-canonical | No |
| /dental-insurance-between-jobs/ | Self-canonical | No |
| /dental-insurance-for-self-employed/ | Self-canonical | No |
| /dental-insurance-immediate-coverage/ | Self-canonical | No |
| T5 dentist pages | Self-canonical (already built correctly by generator) | No |

**No page should canonical to another in this group.** They are all distinct pages with distinct primary purposes. Canonicaling a situation page to the glossary would be wrong — it would suppress the situation page, which has legitimate transactional intent.

---

## 5. REL="ALTERNATE" OPPORTUNITIES

**Current assessment: None required at this time.**

- No AMP versions exist or are planned. (AMP is deprecated for most use cases as of 2025.)
- No language variants exist. CoverCapy is English-only.
- No hreflang considerations — single-language, single-country site.

**One future opportunity:** If CoverCapy ever builds Spanish-language pages for the California dental markets (logical given the demographic), `hreflang="es"` on the glossary and situation pages would be appropriate. File this as a future consideration when building `/es/glosario-seguro-dental/`.

---

## 6. PRIORITY CONFLICTS — TOP 5 TO RESOLVE NOW

### Priority 1: Compare page dictGrid vs. glossary (HIGHEST RISK)
**Conflict:** `/compare-ppo-dental-plans/#terms` has 22 full standalone definitions that Google can index. Once the glossary launches, these pages will compete for "dental [term] definition" queries.
**Resolution:** Thin dictGrid entries to 1-sentence summaries + glossary links (Strategy 1). Do before or at launch of glossary page.
**Effort:** Low — edit compare-ppo-dental-plans.html dictGrid render function (~20 lines in JS).

### Priority 2: "waiting period dental insurance" — /no-waiting-period/ vs. glossary
**Conflict:** The /no-waiting-period/ landing page has a full definition block for "waiting period." The glossary will define the same term. Risk: Google may conflate the two.
**Resolution:** Intent is actually different (transactional vs. definitional). Ensure the /no-waiting-period/ page's H1 and title target the transactional query ("no waiting period dental insurance" / "dental insurance no waiting period plans"). Ensure the glossary's waiting-period entry targets the definitional query ("what is a dental insurance waiting period"). Add a link from /no-waiting-period/ to the glossary.
**Effort:** Low — title/meta check and one internal link addition.

### Priority 3: "effective date" and "day-1 activation" — /immediate-coverage/ vs. glossary
**Conflict:** /dental-insurance-immediate-coverage/ is heavily built around "day-1 activation" and "effective date" — the same two terms in the glossary's TIPS. If the immediate-coverage page ranks for "dental insurance effective date," it eats the glossary's informational share.
**Resolution:** Ensure /immediate-coverage/ titles target "immediate dental insurance coverage" and "same day dental insurance" (commercial intent). Add the glossary link. The glossary should own "[term] definition" queries.
**Effort:** Low — title/meta differentiation check.

### Priority 4: "PPO dental insurance" — compare page, glossary, and homepage
**Conflict:** "PPO dental insurance" is the core head term. The compare page targets it (correctly — it is the best-qualified commercial-intent page). The glossary will define "PPO dental insurance." The homepage may also target it. Three pages, one head term.
**Resolution:** 
- Homepage: targets brand + "find PPO dentist" (navigational)
- Compare page: targets "compare PPO dental plans" / "best PPO dental insurance" (commercial)
- Glossary: targets "what is PPO dental insurance" / "PPO dental insurance definition" (informational)
These are different SERP intents. Google typically shows different results for "compare PPO" vs. "what is PPO." No canonical action needed — only title/meta precision.
**Effort:** Low — verify title differentiation on each page.

### Priority 5: /dental-insurance-for-self-employed/ "plan types" vs. glossary "PPO entry"
**Conflict:** /self-employed/ explains PPO vs. HMO vs. indemnity as the main content action. The glossary's "ppo" entry explains PPO. Both answer "what type of dental insurance should I get?"
**Resolution:** /self-employed/ should own "dental insurance for self-employed" (specific audience query). The glossary owns "PPO definition." Differentiate by ensuring /self-employed/ consistently leads with the audience context ("if you are self-employed or a freelancer...") and the glossary leads with the term definition. Add a CTA on /self-employed/ linking to the glossary for term definitions.
**Effort:** Low — content framing check.

---

## 7. CONTENT DIFFERENTIATION PLAYBOOK

**The governing principle:** Definitions belong in the glossary. Decisions belong on the other pages.

| Page type | What it should contain | What it should NOT contain |
|-----------|----------------------|--------------------------|
| /dental-insurance-glossary/ | Full standalone definitions, "why it matters" context, CDT codes, examples | Plan comparisons, carrier names, purchase CTAs |
| /compare-ppo-dental-plans/ | Plan data, comparison tables, Smart Match, purchase CTAs | Standalone full-paragraph definitions (short inline references only) |
| Situation pages | Life-event narrative, plan recommendations for the situation, decision guidance | Standalone full-paragraph definitions (link to glossary instead) |
| T5 dentist pages | Local dentist info, carrier acceptance, verification CTA | Any plan comparisons or insurance explanations |

**The test:** Could someone read this page section and decide "this IS the definition page for that term"? If yes on a non-glossary page, thin it and add a glossary link.

---

## 8. IMPLEMENTATION CHECKLIST

- [ ] **Before glossary launch:** Thin compare-page dictGrid to 1-sentence + link (Priority 1)
- [ ] **At glossary launch:** Add `DefinedTermSet` schema to glossary page
- [ ] **At glossary launch:** Add `<link rel="canonical">` self-referencing on glossary
- [ ] **Post-launch:** Add inline links from each situation page to glossary on first term use
- [ ] **Post-launch:** Add "PPO" → glossary link in T5 page generator (`buildDentistPage()`)
- [ ] **Verify:** Compare page title/meta does NOT contain "glossary", "definition", or "meaning"
- [ ] **Verify:** Glossary page title/meta does NOT contain "compare", "best", "plans", or carrier names
- [ ] **Verify:** Situation pages have distinct H1 constructions that lead with the life-event, not the term

---

## 9. TERMS THAT DO NOT CANNIBALIZE ANYTHING ELSE

These glossary terms have no significant overlap with other CoverCapy pages and can be built freely without cannibalization concern:

- `balance-billing` — unique to glossary
- `missing-tooth` clause — unique to glossary
- `calendar-year` vs. `plan-year` reset — unique to glossary
- `allowed-amount` — unique to glossary
- `ada-fee` schedule — unique to glossary
- `cdt` codes — unique to glossary
- `out-of-pocket` (maximum) — mentioned in passing on other pages but not defined
- `coinsurance` — tooltip on compare page only; low conflict risk
- `whitening`, `vision` — compare page only; these are plan feature terms, not informational intent terms

---

*This file is a reference for building /dental-insurance-glossary/ and for any future content edits on the compare page and situation landing pages. Update when new pages are added to the site.*
