# Internal Link Density for CoverCapy's Compare Page
## SEO Technical Brief | June 2026

---

## Overview

CoverCapy's `compare-ppo-dental-plans.html` is approximately 2,000 lines of HTML, translating to roughly 3,000 to 5,000 words of rendered content. This brief answers three questions: how many total internal links the page should carry, what ratio of link types is optimal, and how those choices affect PageRank distribution across the wider CoverCapy site.

---

## 1. Google's Official Position on Link Count

Google does not publish a hard limit on internal links per page. John Mueller, Google's Senior Search Analyst, has stated there is no ideal number and that he does not consider over-linking a penalty. Gary Illyes has made the same point, noting that internal link optimization is not something Google actively penalizes. However, Mueller has also said that too many links "dilute site structure" and make it harder to identify which pages actually matter. That tension is the core of the craft.

The widely-cited "150-link limit" is community consensus attributed to Moz, not a published Google policy. What Google has said is that pages with very high outbound link counts may cause later links on the page to receive less crawl attention. The practical implication: every link beyond a reasonable threshold marginally reduces the attention each individual link receives from Googlebot.

For a 3,000 to 5,000-word comparison page, credible SEO sources converge on a workable total range of **50 to 150 links** including navigation, footer, body text, and CTAs. A Zyppy study of 23 million internal links found a correlation peak around 45 to 50 contextual body links for organic traffic gain, after which returns diminished. That figure covers body links only, not the full page total.

---

## 2. The Right Total for a Comparison Page of This Size

For a dental insurance comparison page at CoverCapy's scale, the working target is:

**Total internal links: 60 to 100**

This accounts for:
- Header/nav links (approximately 5 to 10, depending on nav structure)
- Footer links (approximately 10 to 20, depending on hub footer)
- Breadcrumb links (2 to 4)
- Contextual body links (20 to 40)
- CTA links (5 to 15)

Staying below 100 total keeps the page within the zone where Googlebot is likely to follow all links fully in a single crawl pass. A page carrying 150 or more links is not penalized, but link equity per link is thinner, and the links toward the bottom of the page may receive lower crawl weight.

**Too few (under 20 total):** The page becomes a dead end in the site graph. PageRank pools here and does not redistribute to related pages. Google cannot infer what the page considers important or related. Typical thin landing pages that only link to themselves and a contact form suffer from this.

**Too many (over 150 total):** Equity dilutes across too many destinations. The page becomes hard to interpret topically. Google's crawl attention may not reach all links in a single pass, which matters particularly for the lower CTAs on a long comparison page.

---

## 3. Link Type Ratios: Contextual, Navigational, and CTA

There is no published Google ratio requirement for link types. However, the SEO practitioner consensus and the underlying mechanics of PageRank flow point to a clear framework.

### Contextual (Editorial) Links

These are links embedded in body prose that connect to a related concept or page. For Google, these carry the highest signal value because they come with surrounding text that gives the algorithm context about the relationship between the two pages. Anchor text on contextual links is the strongest internal anchor signal a site controls.

**Target for the compare page: 20 to 40 contextual links**

This means linking from the comparison table or prose to relevant city-level hub pages, the glossary, the `find-my-dentist` tool, and situational landing pages (between-jobs, self-employed, no-waiting-period). Ahrefs recommends 3 to 5 contextual links per standard article; a long-form comparison page warrants more, in the 20 to 40 range. Search Engine Land notes that dense pillar pages carry significantly more contextual links than a standard blog post because they are designed to serve as authority hubs.

### Navigational Links

These include the main header nav, footer site links, breadcrumbs, and sidebar navigation. They appear on every page and consistently pass authority to the site's top-level destinations. They are structurally valuable but topically weaker than contextual links because they carry no surrounding prose.

**Target for the compare page: 15 to 35 navigational links**

This is largely determined by the site's global nav and footer template. The key recommendation here is to ensure the compare page's breadcrumb correctly points back through the hub hierarchy, as breadcrumbs provide both user navigation and structured data signals for SERP display. Breadcrumb links should not be nofollowed.

### CTA Links

Call-to-action links serve a business objective: they drive conversions. They also pass PageRank to the destination page, which often matters because high-value commercial pages do not always attract many contextual links naturally. On the compare page, CTAs pointing to the dentist finder, city hubs, or the glossary reinforce the internal equity flow to those destinations.

**Target for the compare page: 5 to 15 CTA links**

CTA links should not appear before the page has delivered value. Placing a CTA at the top of a comparison page before addressing the reader's question is a user experience problem that indirectly affects SEO through engagement signals. The compare page is long enough to support CTAs at the top, middle (after the feature table), and bottom without the distribution feeling manipulative.

### Ratio Summary

For a 3,000 to 5,000-word comparison page:

| Link Type | Count Range | Share of Total |
|---|---|---|
| Contextual (body) | 20 to 40 | 35 to 45% |
| Navigational (nav/footer/breadcrumb) | 15 to 35 | 25 to 35% |
| CTA | 5 to 15 | 8 to 15% |
| **Total** | **60 to 100** | 100% |

No single published study establishes these exact ratios as canonical. They are derived from practitioner guidelines at Ahrefs, Search Engine Land, Semrush, and InLinks, cross-referenced against the PageRank dilution mechanics below.

---

## 4. How Link Density Affects PageRank Distribution

PageRank flows from page to page through internal links. The mechanism is well-documented: a page passes a fraction of its authority through each outbound link, with Google's dampening factor (historically 0.85) applied at each hop. A page with 10 internal outbound links distributes roughly one-tenth of its equity through each. A page with 100 outbound links distributes roughly one-hundredth through each.

For CoverCapy's compare page, the implications are:

**The compare page is a PageRank donor.** If it ranks for dental insurance comparison queries and receives backlinks from third-party sites, it accumulates authority. Every internal link from that page transfers a fraction of that authority to the destination. Contextual links to city hub pages, the glossary, and the dentist finder all benefit those destinations.

**Dilution is real but manageable.** If the compare page links to 200 destinations, each receives very little equity. If it links to 60 to 100 well-chosen destinations, each receives meaningfully more. The Digital Applied 2026 large-site study documents a JetOctopus case where a site that revised its internal linking strategy saw Googlebot crawl coverage rise from 40% to 70%. The mechanism is that concentrated, purposeful links signal importance and pull pages into Google's active crawl queue.

**The donor-acceptor model applies.** Pages that carry high crawl budget and search impressions (donors) should route links toward pages that need authority transfer (acceptors). For CoverCapy, the compare page is a donor. Its contextual links to T4c city pages and T5 dentist profiles are equity transfers. If those city pages and profiles also have few other inbound internal links, the compare page's links are even more valuable to them.

**Anchor text is the second dimension.** Zyppy's 23-million-link study found pages with at least one exact-match internal anchor had roughly 5 times the traffic of pages without one. The study authors flag this as correlation, not causation, but the signal is consistent with how Google uses anchor text to understand page topic. Anchors on contextual links from the compare page should use descriptive, keyword-relevant text rather than generic phrases like "click here" or "learn more."

---

## 5. YMYL and Dental Insurance: Additional Considerations

The compare page operates in what Google classifies as a YMYL (Your Money or Your Life) context. Dental insurance is a financial decision with health implications. Google applies heightened scrutiny to E-E-A-T signals (Experience, Expertise, Authority, and Trust) on YMYL pages.

Internal linking on YMYL pages has one additional function beyond PageRank distribution: it signals the existence of a coherent, authoritative content ecosystem. A compare page that links to a detailed glossary, to individual plan explainers, to a dentist finder backed by a real database of 5,700+ dentists, and to city-level hub pages reads to Google as part of a larger authoritative structure. A compare page that only links to itself reads as an isolated commercial page with no surrounding expertise.

The practical recommendation for CoverCapy's compare page:

- Link contextually to the glossary for every technical term on first use (PPO, in-network, waiting period, annual maximum). These links serve the reader and reinforce topical authority.
- Link to at least 3 to 5 city or state hub pages from the body of the compare page. This creates a visible content ecosystem in the link graph.
- Ensure the page is reachable within 3 clicks from the homepage. Pages buried deeper receive less crawl attention and rank as structurally unimportant regardless of their content quality.
- Do not use nofollow on internal links. Internal nofollows block equity flow without any SEO benefit.

---

## 6. Practical Audit Checklist for the Compare Page

Before each major revision of `compare-ppo-dental-plans.html`, verify:

1. Total internal link count is between 60 and 100
2. Contextual body links number at least 20 and no more than 40
3. No internal links use nofollow
4. Breadcrumb links are present and point through the correct hub hierarchy
5. At least one exact-match or near-exact anchor text link points to each key destination (glossary, dentist finder, one city hub)
6. CTA links appear at mid-page and bottom, not only at the top
7. No links use generic anchor text ("here," "this page," "click")
8. The page itself receives inbound contextual links from at least the homepage, the glossary, and 2 to 3 situational landing pages

---

## Sources

- [How Many Internal Links Per Page Is Too Many for SEO? (2026) — inblog.ai](https://inblog.ai/blog/how-many-internal-links-per-page-seo)
- [Internal Linking Strategy 2026: Large-Site SEO Guide — Digital Applied](https://www.digitalapplied.com/blog/internal-linking-strategy-2026-large-site-architecture-guide)
- [How to Spot and Fix Internal Linking Overload — AirOps](https://www.airops.com/blog/how-many-internal-links-is-too-many)
- [Internal Linking. The Guide — InLinks](https://inlinks.com/internal-linking-guide/)
- [Internal Linking for SEO: Types, Strategies and Tools — Search Engine Land](https://searchengineland.com/guide/internal-linking)
- [How Can Internal Linking Strategies Improve Link Equity in 2024? — JEMSU](https://jemsu.com/how-can-internal-linking-strategies-improve-link-equity-in-2024/)
- [SEO Tip: Your Internal Linking Structure Is a PageRank Distribution System — Dan Hinckley via LinkedIn](https://www.linkedin.com/posts/danielhinckley_seo-tip-yourinternallinking-structure-activity-7403452402600812544-L39w)
- [How to Optimize Your Crawl Budget through Internal Links — SEO Clarity](https://www.seoclarity.net/blog/internal-link-analysis-pagination-saves-crawl-budget)
- [How to Use Internal Linking for Healthcare SEO — MarketDing](https://www.marketding.ai/blog/how-to-use-internal-linking-for-healthcare-seo)
- [What Is YMYL and Its Impact on Healthcare SEO — Practice Builders](https://www.practicebuilders.com/blog/what-is-ymyl-and-what-its-impact-on-healthcare-seo/)
- [Internal Linking Best Practices for SEO — Heroic Rankings](https://heroicrankings.com/seo/on-page/what-is-internal-linking/)
- [How Many Internal Links Per Page SEO: A Practical Guide for 2025 — RankAI](https://rankai.ai/blog/how-many-internal-links-per-page-seo-a-practical-guide-for-2025/)
