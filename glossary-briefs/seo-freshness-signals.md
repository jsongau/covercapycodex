# Content Freshness Strategy — CoverCapy Dental Insurance Glossary
## SEO Freshness Signals | Last Updated: June 2026

---

## 1. Annual Update Triggers

Dental insurance content has hard calendar-driven update moments that Google tracks through link velocity, content diff signals, and third-party coverage. Miss these windows and competitor pages that update will leapfrog the glossary in QDF-sensitive queries.

### January 1 — Plan Year Reset (Hardest Deadline)
- **Deductible and out-of-pocket maximum resets** — these numbers are reset to zero for all patients. Any glossary entry that mentions dollar amounts (e.g., "typical annual deductible of $50–$150") becomes stale the moment the new plan year starts.
- **Annual maximum benefit amounts** — carriers adjust these. Delta Dental PPO plans, for example, have shifted their annual max from $1,000–$1,500 (historical) upward on some plans. If the glossary cites a range, it must be reviewed.
- **Waiting period durations** — carriers sometimes revise waiting periods for new enrollees when plan documents reset.
- **Open enrollment for ACA-adjacent plans and employer groups** — most group plan elections finalize November–December, effective January 1. Glossary entries on enrollment windows become high-QDF in October–December and must reflect current-year open enrollment dates.

### January–February — ADA CDT Code Release
- The ADA publishes the **CDT (Current Dental Terminology) code book** annually. Effective date is January 1 of the coverage year, though the book is released in Q4 of the prior year.
- CDT updates include: new codes added, deleted codes, revised descriptors, and resequenced ranges.
- Any glossary entry that references specific CDT codes (D0120, D1110, D2391, etc.) must be audited against the new code set.
- The ADA also publishes the **CDT Changes** companion document which lists exactly what changed — this is the primary audit source.
- **Impact on glossary:** Entries covering "preventive codes," "basic restorative codes," "major service codes," and any procedure-specific definitions (crown, root canal, periodontal scaling) need CDT code validation annually.

### Q4 (October–December) — Carrier Premium Updates
- Most individual and family dental PPO plans publish new premium rates for the following year during fall open enrollment.
- Carriers that publish rate sheets publicly (Delta Dental, Guardian, Cigna, Aetna, MetLife) will update their plan comparison pages. If the glossary cites "average premiums starting at $X/month," these figures age within one plan cycle.
- The **compare-ppo-dental-plans.html** page on covercapy.com likely carries premium data — the glossary should reference that page dynamically rather than hard-coding ranges.

### Regulatory and Legislative Updates
- **State mandate changes** — individual states add or remove dental coverage mandates. California, New York, and Illinois have been active. Entries on "state-mandated benefits," "pediatric dental (ACA)," and "Medicaid/CHIP dental coverage" are subject to state legislative calendars.
- **ACA benchmark plan updates** — the pediatric dental essential health benefit (EHB) definition and actuarial value thresholds are updated by CMS. Any glossary entry covering ACA-required dental coverage must track CMS annual bulletins.
- **HIPAA and privacy rule updates** — low-frequency but glossary entries on EOB (Explanation of Benefits) and claims processing should note applicable privacy rules.
- **No Surprises Act / surprise billing** — dental carve-outs and applicable provisions have been subject to regulatory clarification since 2022. Glossary entries on "in-network vs out-of-network" should reflect current rule status.

### Mid-Year Triggers (Lower Priority but Real)
- Carrier network changes (mid-year provider terminations affect "PPO network" entries).
- Carrier mergers and acquisitions (e.g., if two carriers merge, entries referencing them by name need updating).
- IRS HSA/FSA contribution limit updates (typically announced October for the following year) — relevant to any glossary entry on using HSA/FSA for dental.

---

## 2. Update Signals to Implement

### Priority Ranking (Most Impactful to Least)

**1. `dateModified` in JSON-LD Schema — Highest Weight**
Google's John Mueller has confirmed `dateModified` in structured data is a direct input into freshness scoring. For a glossary page, the correct schema type is `Article` or `WebPage` with the `dateModified` property. Critically: only update `dateModified` when substantive content changes. Touching the date without changing content is a spam signal Google has trained against.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Dental Insurance Glossary — Terms Explained",
  "datePublished": "2024-01-15",
  "dateModified": "2026-01-08",
  "author": {
    "@type": "Organization",
    "name": "CoverCapy"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://covercapy.com"
  }
}
```

**2. Visible "Last reviewed" Byline — Second Highest**
Visible on-page date signals are read by both Google (as text signals) and users (trust signal for healthcare content — YMYL category). Dental insurance qualifies as Your Money or Your Life content. Google's quality rater guidelines explicitly call out freshness as a quality factor for YMYL pages.

Format recommendation:
```
Last reviewed: January 8, 2026 | Reviewed by CoverCapy Editorial Team
CDT codes current through: 2026 ADA CDT code set
Plan year data: 2026
```

Place this directly below the page H1 and above the first glossary entry. Do not bury it in the footer.

**3. Changelog / "What Changed" Section — Third Highest**
A visible changelog section near the top of the page (collapsible accordion is fine) signals editorial rigor to both Google and users. For healthcare YMYL content, this is increasingly important as Google's Helpful Content system rewards demonstrable expertise.

Changelog format:
```
## What Changed in This Update
**January 2026:**
- Updated CDT code references to reflect 2026 ADA code set (D4346 clarified, D0603 added)
- Revised "annual maximum" entry to reflect current carrier ranges ($1,000–$2,000)
- Added entry: "embedded deductible vs aggregate deductible"
- Removed outdated reference to legacy PPO Plus Premier network (discontinued)
```

**4. Last-Modified HTTP Header**
Vercel serves static files with `Last-Modified` HTTP headers based on file modification time. Since covercapy.com deploys static files from git, the file's modified timestamp in the repo determines this header. This is a secondary crawl signal — Googlebot checks this on revisit to decide whether to re-process the page. Because the Vercel deployment serves pre-built static HTML, regenerating and committing the glossary page automatically sets a fresh `Last-Modified` header. No extra work needed beyond normal deploy workflow.

**5. Sitemap `<lastmod>` Tag**
The `dental/sitemap-dental.xml` is generated by `generate-plans.js`. If a separate sitemap covers the glossary, ensure the `<lastmod>` tag reflects the actual update date. Google has stated it uses sitemap `<lastmod>` as a hint (not a guarantee) for crawl scheduling. Accurate `<lastmod>` values build trust; inaccurate ones (always showing today's date) erode it.

---

## 3. Evergreen vs Time-Sensitive Sections

### Truly Evergreen (Review Every 2–3 Years)

These concepts are structurally stable. Their definitions do not change with plan years, CDT releases, or carrier updates. Update only when industry terminology shifts or regulatory frameworks change materially.

| Term | Why Evergreen |
|------|---------------|
| Deductible | Core insurance concept — definition unchanged since dental insurance began |
| Coinsurance | Fundamental cost-sharing structure |
| Copay | Definition stable; specific dollar amounts are time-sensitive (remove from definition body) |
| Annual Maximum | The concept is evergreen; specific dollar figures are not |
| Benefit Period | January–December structure is stable |
| Waiting Period | Concept evergreen; specific durations vary by carrier (keep definition general) |
| Coordination of Benefits (COB) | Regulatory framework is stable |
| Primary vs Secondary Insurance | Concept stable |
| In-Network vs Out-of-Network | Concept stable; specific network names are not |
| Explanation of Benefits (EOB) | Format governed by stable HIPAA rules |
| Predetermination / Preauthorization | Concept stable |
| Usual, Customary, and Reasonable (UCR) | Concept stable; UCR fee schedules are time-sensitive |
| Missing Tooth Clause | Concept stable |
| Orthodontic Lifetime Maximum | Concept stable |

### Time-Sensitive (Audit Every January)

| Term | Update Trigger |
|------|---------------|
| CDT codes (any specific code like D0120, D1110) | ADA CDT annual release |
| Plan premium ranges ("starting at $X/month") | Q4 carrier rate updates |
| Annual maximum dollar amounts ($1,000 / $1,500 / $2,000) | Carrier plan document updates |
| Open enrollment windows | Changes per employer group and ACA calendar |
| Carrier-specific plan names (Delta Dental PPO, Cigna DPPO) | Carrier product updates |
| Medicaid/CHIP dental coverage by state | State legislative sessions |
| ACA pediatric dental benchmark | CMS annual EHB updates |
| HSA/FSA contribution limits | IRS annual announcement (October) |
| Waiting period durations with specific timeframes | Carrier plan document updates |
| Network adequacy requirements | State insurance commissioner rules |

### Hybrid Entries (Stable Concept, Time-Sensitive Examples)
These entries have a stable definitional core but include examples or data points that age. Strategy: keep the definition evergreen, mark examples with the year they were verified, and update examples annually.

- "Preventive services (typically covered at 100%)" — the "100%" figure varies by plan; mark as illustrative
- "Basic restorative services (typically covered at 70–80%)" — same caveat
- "Major services (typically covered at 50%)" — same caveat
- "Waiting period for major services (typically 12 months)" — illustrative, not universal

---

## 4. Update Workflow — January Checklist

Run this checklist every January, ideally in the first two weeks before crawl frequency for competing pages picks up.

### Pre-Update Preparation (December, before year-end)

- [ ] Download the new ADA CDT code set for the incoming year (available from ADA store, usually released November)
- [ ] Obtain the CDT Changes document (lists additions, deletions, revisions)
- [ ] Pull carrier plan documents for the new plan year from Delta Dental, Cigna, Aetna, Guardian, MetLife, United Concordia, and Humana
- [ ] Note any carrier premium changes visible on compare-ppo-dental-plans.html
- [ ] Check CMS website for any ACA EHB pediatric dental benchmark updates
- [ ] Check IRS announcement for new HSA and FSA contribution limits
- [ ] Review any state insurance department bulletins for the primary states (California, Texas, Florida, New York, Illinois, Georgia, Ohio)

### Content Audit (First Week of January)

- [ ] Open every glossary entry that references a specific CDT code. Cross-reference against the CDT Changes document. Update descriptions where codes changed.
- [ ] Flag any entries citing dollar amounts (premiums, annual maximums, deductibles). Update to reflect new plan year ranges or replace with a reference to the compare page.
- [ ] Check "open enrollment" entry for correct dates.
- [ ] Check HSA/FSA entries for current year contribution limits.
- [ ] Review ACA pediatric dental entry for any EHB changes.
- [ ] Check any carrier-specific entries for product name accuracy (carriers rebrand plans).
- [ ] Remove any references to discontinued carrier products or defunct networks.

### Changelog and Metadata Update (Before Publishing)

- [ ] Draft the "What Changed in This Update" changelog section with specific, accurate bullets.
- [ ] Update the visible byline: "Last reviewed: January [X], 2026"
- [ ] Update "CDT codes current through: 2026 ADA CDT code set" note
- [ ] Update `dateModified` in JSON-LD schema to match review date
- [ ] Update sitemap `<lastmod>` if the glossary has its own sitemap entry

### Publishing and Monitoring

- [ ] Deploy the updated glossary page
- [ ] Submit URL to Google Search Console for recrawl (Inspect URL > Request indexing)
- [ ] Monitor Search Console for impressions and ranking position over the following 2–4 weeks on target queries
- [ ] Note crawl date in an internal log (to verify Google picked up the `dateModified`)

---

## 5. Historical Content Preservation

### Recommendation: Replace, Do Not Archive — With Caveats

For the dental insurance glossary, **replacing in-place (with redirects only for renamed URLs) is the correct default.** Here is the reasoning:

**Why not maintain year-specific archive pages:**
- `/dental-insurance-glossary/2025/` vs `/dental-insurance-glossary/2026/` creates competing pages for the same terms. Google will canonicalize toward one or split equity unpredictably.
- Users searching for "what is a dental deductible" do not want a 2025 answer vs a 2026 answer — they want the current answer.
- Archive pages accumulate low-quality backlinks and stale signals over time.
- Duplicate content risk increases with versioned pages that differ only in a few data points.

**What to preserve:**
- The changelog section on the main glossary page provides sufficient historical context for users who want to understand what changed.
- If a specific entry undergoes a major structural change (e.g., a CDT code is eliminated), note that in the entry itself: "Note: Code D0603 was introduced in the 2026 CDT code set. Prior to 2026, this service was reported under..."
- This inline historical note is more useful than an archive page and concentrates link equity on one URL.

**Exception case — regulatory archive:**
If a major regulatory change fundamentally alters a category (e.g., a new federal dental benefit program like expanded Medicare dental), a separate explainer page covering the new benefit is appropriate. That page would cover the new program, not an archived version of the old glossary.

**301 redirect policy:**
If any glossary entry is promoted to its own standalone page (e.g., "What is a CDT Code?" becomes `/dental-cdt-codes/`), the glossary entry should remain with a brief definition and a canonical pointer. Do not 301 away from the glossary — keep content there and add to it.

---

## 6. QDF — Query Deserves Freshness Analysis

Google's QDF (Query Deserves Freshness) algorithm applies to queries where recent events, recurring events, or frequently changing information make fresh content more useful. Dental insurance has both evergreen and QDF-triggering queries.

### Queries That Trigger QDF (High-Priority for Freshness)

| Query Pattern | QDF Trigger | Peak Window | Glossary Response |
|---------------|-------------|-------------|-------------------|
| "dental insurance open enrollment 2026" | Recurring annual event | October–January | Entry must cite current year dates |
| "delta dental ppo premiums 2026" | Recurring annual event + carrier specifics | Q4 | Link to compare page with live data |
| "CDT codes 2026" / "new dental codes 2026" | Annual ADA release | November–February | Update CDT entries by January 1 |
| "dental insurance changes 2026" | Recurring annual news query | Q4–Q1 | Changelog section surfaces here |
| "HSA dental expenses 2026" | Annual IRS limits + recurring | October–January | Update limits in FSA/HSA entry |
| "medicaid dental coverage [state] 2026" | Recurring + legislative | Varies by state | State-specific note in Medicaid entry |
| "best dental insurance 2026" | Comparative + recurring | Year-round peak in Q4 | Not a glossary query — belongs on compare page |
| "ACA dental coverage 2026" | Recurring + ACA enrollment | September–January | Update ACA entry before open enrollment |

### Queries That Do NOT Trigger QDF (Glossary Core Strength)

These informational queries are stable. Fresh content here helps but is not the primary ranking signal. Content quality, depth, and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) matter more.

- "what is a dental deductible"
- "what does coinsurance mean for dental"
- "how does dental insurance work"
- "what is an annual maximum dental"
- "dental PPO vs HMO"
- "what is a waiting period for dental insurance"
- "how to read a dental EOB"

**For non-QDF queries:** Invest in depth, examples, and structured data (FAQPage schema) rather than date-chasing.

### QDF Response Strategy

For QDF-triggering queries, the glossary page must compete with news articles, carrier pages, and government sites that update automatically. Tactics:

1. **Year-in-title when appropriate:** If the glossary has a section specifically covering annual changes, a URL like `/dental-insurance-glossary/2026-changes/` or a prominently titled H2 "2026 Dental Insurance Updates" signals recency for QDF queries. However, the main glossary URL should remain evergreen (`/dental-insurance-glossary/`).

2. **Current year in page title tag for QDF entries:** For entries that surface on QDF queries, consider including the year in the individual entry heading: "HSA Contribution Limits for Dental Expenses (2026)" rather than just "HSA Contribution Limits." This is a soft signal but visible in SERPs.

3. **Internal linking from QDF-strong pages:** If covercapy.com publishes a news-style post or update page each January (e.g., "Dental Insurance Changes for 2026"), linking from that fresh page to the glossary passes freshness authority to the glossary via internal link.

4. **Schema `dateModified` must precede competitor updates:** Aim to update the glossary page before January 1 — even before the plan year resets. The goal is for Googlebot to crawl the updated page before competitors update their versions.

---

## 7. Automated Freshness Elements

### What Can Be Automated

**A. Live Premium Range from compare-ppo-dental-plans.html**

If `compare-ppo-dental-plans.html` already contains structured plan data (even as static HTML), the glossary can reference it in two ways:

- **Static cross-reference (simplest):** The glossary entry for "plan premium" links to the compare page with anchor text like "See current 2026 premiums on our plan comparison tool." This is low-tech, always current because the compare page is the source of truth, and avoids the risk of stale numbers in the glossary body.

- **JavaScript data pull (medium complexity):** If the compare page or a backing JSON file exposes premium ranges, a small inline script on the glossary page can pull the current min/max premium and inject it into the glossary entry: "Dental PPO premiums currently start at $[LIVE_MIN]/month based on available plans on CoverCapy." Requires a stable JSON endpoint — if the compare page data is in a static JS object, this is feasible without a backend.

- **Supabase live query (highest complexity):** Pull aggregate premium data from Supabase on page load to show "Plans available from $X/month across X dentist offices." This requires the glossary to load client-side JS — feasible for a hybrid static+JS page.

**B. CDT Code Count / "X codes updated" Banner**

A simple static element updated during the January rebuild: a banner or badge on the glossary page reading "2026 CDT code set — 12 codes updated this year." This is manually updated once per year but provides a strong freshness signal in the page body.

**C. "Last Verified" Timestamps Per Entry**

For high-QDF entries (CDT codes, HSA limits, open enrollment dates), each entry can display a "Verified [Month Year]" timestamp. This requires a data structure in the generator or CMS. For a static site generated by `generate-plans.js`, the cleanest approach is a JSON data file (`glossary-data.json`) that holds each term's `lastVerified` date, which the generator injects into each entry at build time.

Example structure:
```json
{
  "terms": [
    {
      "slug": "hsa-contribution-limits",
      "lastVerified": "2026-01-05",
      "cdtYear": null
    },
    {
      "slug": "cdt-codes",
      "lastVerified": "2026-01-08",
      "cdtYear": "2026"
    }
  ]
}
```

The generator reads this file and injects `<span class="term-verified">Verified January 2026</span>` into each entry. This means timestamps update automatically when the data file is updated and the generator is re-run — no manual HTML editing required.

**D. Sitemap Auto-Freshness**

The existing `fetchAllRows()` and generation workflow already handles sitemap generation for `/dental/` pages. A glossary sitemap entry with an accurate `<lastmod>` reflecting the actual last build date is automatically correct as long as the glossary page is regenerated (not hand-edited) on each annual update.

### What Cannot Be Meaningfully Automated

- CDT code content changes (require human expert review of ADA documentation)
- Regulatory and legislative changes (require monitoring and interpretation)
- Carrier product name accuracy (require checking carrier websites)
- Changelog entries (require human editorial judgment about what changed)

These must remain manual audit steps in the January workflow.

---

## Implementation Priority

| Action | Effort | SEO Impact | When |
|--------|--------|------------|------|
| Add `dateModified` to glossary JSON-LD | Low | High | Immediately |
| Add visible "Last reviewed" byline | Low | High | Immediately |
| Add changelog section | Low | High | Immediately |
| Create January audit checklist (above) | Low | Medium | Before next January |
| Identify and tag time-sensitive entries | Medium | Medium | Before next January |
| Build `glossary-data.json` for per-entry timestamps | Medium | Medium | Q1 2026 |
| Add live premium cross-reference link to compare page | Low | Medium | Immediately |
| Evaluate JS data pull for live premium ranges | High | Medium | Q2 2026 |

---

*Document prepared for CoverCapy internal use. Reflects best practices as of June 2026. Sources: ADA CDT annual release schedule, Google Search Central documentation on freshness signals, Google Quality Rater Guidelines (YMYL section), Vercel static file serving behavior.*
