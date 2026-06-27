# GEO / AI Citation Strategy for dentist.html

**Goal:** Get CoverCapy's national "find a dentist near me" hub cited by ChatGPT, Perplexity, Claude, and Google AI Overviews for queries like "how do I find a PPO dentist near me," "best way to find an in-network dentist," and "dentist near me that takes my insurance."

**Researched:** June 2026. Sources at bottom.

---

## 1. What AI engines preferentially cite

AI answer engines extract *passages*, not pages. Each paragraph is evaluated independently as a potential quotation. The formats that win citations:

- **Answer-first "quick answer" block** at the top — 40 to 80 words that directly answer the page's core query before any context or marketing. Rewriting the opening of every section to lead with the direct answer has been reported to move citation probability more than schema, backlinks, or any other single lever.
- **Definition / entity statements** — one declarative sentence that names the entity explicitly ("CoverCapy is a PPO dental directory that lets patients verify in-network coverage before booking").
- **Descriptive H2/H3 headings** phrased as the actual user question ("How do I find a PPO dentist that takes my insurance?").
- **Step-by-step numbered processes** (HowTo) — AI loves ordered, extractable steps.
- **Comparison tables** — in-network vs out-of-network, PPO vs HMO vs discount plan.
- **FAQ blocks** — discrete Q&A pairs AI can lift wholesale.
- **Fact density** — statistics, named carriers, concrete numbers, and citations. The Princeton GEO study found citations + stats + quotations raise AI visibility ~30 to 40%, lifting even lower-ranked pages.
- **Freshness signals** — visible "Last updated June 2026," `dateModified` in schema. AI engines down-weight stale content.

## 2. Role of JSON-LD in AI extraction

JSON-LD is the parse layer that lets AI extract structured facts instead of guessing from prose. Google recommends it; it lives in a `<script>` tag and does not affect layout. High-value types for this hub:

| Schema | Use on dentist.html |
|--------|---------------------|
| `WebSite` + `SearchAction` (sitelinks searchbox) | Declares the directory's search function so AI/Google can surface it as a searchable entity. |
| `Organization` | Establishes CoverCapy as a named entity (logo, sameAs, founding info) — feeds entity recognition. |
| `FAQPage` | Discrete Q&A AI quotes verbatim. Note: Google now restricts FAQ *rich results* to authoritative gov/health sites, but the markup still aids AI extraction. |
| `HowTo` | "How to find a PPO dentist near you" step sequence. |
| `ItemList` | The list of featured states/metros/dentists — gives AI a structured enumeration to cite. |
| `BreadcrumbList` | Reinforces site hierarchy and entity relationships. |

Tier-1 schema (FAQPage, HowTo, Organization, Article/ItemList) deliver the highest AI citation rates — implement these first. Structured data correlates with ~30 to 40% higher AI-answer visibility vs unstructured equivalents.

## 3. JS vs static HTML — bots do NOT render JavaScript

**This is the single most important technical finding.** Major AI crawlers do **not** execute JavaScript:

- **GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Bingbot** fetch raw HTML, extract what's there, and move on. They do not wait for rendering and do not retry. An analysis of 500M+ GPTBot fetches found **zero** evidence of JS execution. (They may download .js files but never run them.)
- **Only Google Gemini / Google-Extended** can render JS, because it rides Googlebot's Web Rendering Service — and even then with queue delays and the usual Googlebot caveats.

**Implication for CoverCapy:** find-my-dentist.html is a client-side JS app — its content is effectively invisible to ChatGPT/Claude/Perplexity. `dentist.html` must ship all citation-critical content as **static, server-rendered HTML in the initial response**. No content behind `fetch()`, no JS-injected text, no client-only React. The current static-generator approach (the `/dental/` pages) is exactly right; dentist.html must follow the same model.

## 4. robots.txt and llms.txt

**robots.txt:** Explicitly allow the good AI bots — `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended`, `Bingbot`, `CCBot`. Blocking them removes you from their answers entirely. Default-allow, disallow only sensitive paths (e.g., /api/).

**llms.txt — honest assessment:** This is the over-hyped part. As of mid-2025 Google's Gary Illyes confirmed Google does **not** support llms.txt and has no plans to, and traffic analysis across 515M+ LLM bot events found requests touching `/llms.txt` are statistically negligible. It is **not** a meaningful citation lever today.

**Recommendation:** Add a minimal `llms.txt` anyway — it is cheap, low-risk, and future-proofs as a "business-to-agent" routing surface. Keep it **curated (20 to 50 high-value links, not the full sitemap)** with plain-language descriptions written for an agent deciding what to fetch. Do **not** invest heavily or expect citation gains from it. Priority order: server-rendered HTML > schema > answer-first copy > robots.txt allow-list >> llms.txt.

## 5. Copy patterns for verbatim quoting

- **Lead with the answer.** First sentence states the answer; omit warmup, hedges, throat-clearing.
- **Self-contained blocks of 40 to 60 words** that fully answer one question.
- **No orphan pronouns.** Never open a citable sentence with "it" or "this" — the referent vanishes when extracted. Repeat the entity name: "A PPO dentist is..." not "It is..."
- **Name entities and specifics.** Concrete terms get cited ("Delta Dental PPO," "in-network," "$30/mo"); vague phrases ("comprehensive solutions") get ignored.
- **One idea per paragraph.** Under ~120 words each.
- **Declarative, not promotional.** "CoverCapy verifies your PPO coverage before you book, free." reads as fact and gets quoted; ad copy does not.

Example quote-ready block:
> **How do I find a PPO dentist near me that takes my insurance?**
> To find a PPO dentist that takes your insurance, search a directory by your ZIP code and dental carrier, then confirm the office is in-network before booking. CoverCapy lets patients filter dentists by PPO carrier (Delta Dental, Cigna, Aetna, MetLife, and others) and verifies coverage with the office for free, so you know the dentist is in-network before your first visit.

---

## (a) GEO must-have checklist for dentist.html

- [ ] All citation-critical content is **static server-rendered HTML** (zero reliance on client JS for text).
- [ ] **Quick-answer block** (40 to 80 words) at top, answering "how do I find a PPO dentist near me" directly.
- [ ] One-sentence **entity definition** of CoverCapy and of "PPO dentist."
- [ ] H2/H3 headings phrased as **real user questions**.
- [ ] **HowTo** numbered steps ("How to find an in-network dentist in 4 steps").
- [ ] **Comparison table** (in-network vs out-of-network; PPO vs HMO vs discount).
- [ ] **FAQ section** with discrete Q&A pairs.
- [ ] **Fact density:** named carriers, counts (6,400+ pages / cities / dentists), prices, ratings.
- [ ] **Freshness:** visible "Last updated June 2026" + `dateModified`.
- [ ] **No orphan pronouns** in any citable sentence; entities named explicitly.
- [ ] JSON-LD: `WebSite`+`SearchAction`, `Organization`, `FAQPage`, `HowTo`, `ItemList`, `BreadcrumbList`.
- [ ] robots.txt allows all major AI bots; sitemap referenced.
- [ ] Minimal curated `llms.txt` (low priority).
- [ ] Internal links to T3/T4/T5 pages so AI can crawl the silo.

## (b) Static content section outline for dentist.html

1. **H1** — "Find a PPO Dentist Near You That Takes Your Insurance"
2. **Quick Answer block** (40 to 80 words, answer-first, the verbatim-quote target)
3. **What is a PPO dentist? / What does in-network mean?** — entity definition + PPO vs HMO vs discount comparison table
4. **How to find a PPO dentist near you (HowTo)** — numbered 4 to 5 steps, each step a standalone sentence
5. **Why verify in-network status before booking** — fact-dense, declarative
6. **Browse by state / metro (ItemList)** — static internal links into the /dental/ silo
7. **Featured carriers we filter by** — named list (Delta Dental PPO, Cigna, Aetna, MetLife, Guardian, etc.)
8. **FAQ** — "Does it cost anything?", "How do I know a dentist is in-network?", "What if I don't have insurance?", "How fast can I see a dentist?"
9. **About CoverCapy** — Organization entity statement
10. **Last updated June 2026** freshness line + footer breadcrumbs

## (c) Recommendation on llms.txt

**Add a minimal, curated llms.txt — but treat it as P3, not a citation strategy.** Evidence shows near-zero AI-bot usage and no Google support, so it will not drive citations today. The real levers are static HTML, schema, and answer-first copy. Ship llms.txt as cheap future-proofing: 20 to 50 hand-picked links (homepage, dentist.html, top state/metro hubs, compare-plans, find-my-dentist) with one-line plain-language descriptions. Do not dump the sitemap. Revisit if bot adoption of the standard grows.

---

## Sources

- [Mastering generative engine optimization in 2026 — Search Engine Land](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)
- [Google's Guide to Optimizing for Generative AI Features — Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [GEO Best Practices for 2026 — Firebrand](https://www.firebrand.marketing/2025/12/geo-best-practices-2026/)
- [AI Crawlers Do Not Render JavaScript — Lantern](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript)
- [The rise of the AI crawler — Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [JavaScript Rendering and AI Crawlers: Can LLMs Read Your SPA? — Passionfruit](https://www.getpassionfruit.com/blog/javascript-rendering-and-ai-crawlers-can-llms-read-your-spa)
- [Understanding AI Crawlers: GPTBot, PerplexityBot, and More — Performanceliebe](https://www.performanceliebe.de/en/blog/understanding-ai-crawlers/)
- [LLMs.txt in 2026: The Full Guide — Limy](https://limy.ai/blog/llms.txt-in-2026-the-full-guide)
- [LLMs.txt & Robots.txt: Optimizing for AI Bots — Goodie](https://higoodie.com/blog/llms-txt-robots-txt-ai-optimization/)
- [What Is LLMs.txt? & Do You Need One? — Neil Patel](https://neilpatel.com/blog/llms-txt-files-for-seo/)
- [Schema Markup for AI Search: 7 JSON-LD That Boost Visibility — AI Labs Audit](https://ailabsaudit.com/blog/en/schema-markup-ai-visibility-guide)
- [Structured Data for Medical Practices: JSON-LD Guide — Halcy](https://www.halcy.ai/learn/healthcare-structured-data-guide)
- [The Complete JSON-LD Schema Guide for AI Citations 2026 — Qwairy](https://www.qwairy.co/blog/json-ld-schema-guide-for-ai-citations)
- [LLM Citation Optimization: Quote-Ready Content Blocks — NAV43](https://nav43.com/blog/llm-citation-optimization-quote-ready-content-blocks/)
- [How to Structure Content for LLM Extraction — Kime](https://kime.ai/blog/structure-content-for-llm-extraction)
- [How to Structure Technical Content for ChatGPT and Perplexity Citations — BVM](https://www.brazosvalleymarketing.com/resources/how-to-structure-technical-content-for-chatgpt-and-perplexity-citations)
