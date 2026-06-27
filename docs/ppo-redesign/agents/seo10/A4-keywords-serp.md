# A4 — Keyword, Intent & SERP Feature Capture

**Hub file:** `/compare-ppo-dental-plans.html`
**Role:** SEO Architect 4 of 10. Lane: keyword-to-section mapping for THIS hub, plus the priority SERP features to win and the exact on-page element that should win each. Builds on `agents/elite/SEO1-keywords.md`. The "do not chase bare 'dental insurance'" decision is settled there and is not relitigated here.

This memo is analysis and spec only. Every recommendation is grounded in real lines of the live file.

---

## 1. What SEO1 already settled (carry forward, do not repeat)

- Hub primary is `compare PPO dental plans`; the title (line 6) and meta (line 7) already lean correctly into comparison intent.
- Long-tail (treatment, scenario, glossary, carrier) is pushed to spokes that already exist on disk; the hub links down, it does not duplicate them.
- The `#playbook` lists and the 10 FAQ entries are the page's snippet engine.

This memo goes one layer deeper: it names, per SERP feature, the single on-page element that should win it and the concrete change to make that element win-ready.

---

## 2. The hub's real assets, by render type (this decides snippet eligibility)

| Asset | Line | Render | SERP consequence |
|---|---|---|---|
| `<title>` | 6 | server HTML | indexed as-is |
| `<meta description>` | 7 | server HTML | indexed as-is |
| H1 "Match a PPO dental plan to the work ahead." | 979 | server HTML | brand voice, not a keyword headline |
| `#compare` H2 "Put any plans side by side" | 1019 | server HTML | the primary-phrase home |
| Compare matrix `#compareMatrix` | 1032 | JS-built | risky for the table snippet (see 4) |
| Feature table `.feat-tbl-scroll` | CSS 330, rendered from `PLANS` | JS-built | same risk |
| `#playbook` MISTAKES / QUESTIONS lists | 1162-1163, data 1948-1949 | JS-built into `<ol>` | list-snippet bait, JS-dependent |
| FAQ entries | rendered 1974 from `FAQS` 1951-1962 | JS-built | PAA / paragraph-snippet engine |
| Glossary `#terms` definitions | 1981 from `GLOSS`/`TIPS` | JS-built | definition snippets |

**The single most important finding:** the page's strongest snippet assets — the FAQ answers, the playbook lists, and the comparison table — are all injected by JavaScript at runtime (`renderStatics()`, line 1968). The FAQ answer copy at lines 1952-1961 is already excellent and snippet-shaped, but if Google renders the page without executing JS, none of it is in the DOM. Winning the features below depends on these blocks existing in server-delivered HTML, not only in JS arrays. That render decision is the technical architect's lane; this memo flags it because every SERP target in section 4 rides on it.

---

## 3. Keyword-to-section map (this hub only)

| Priority | Query | Intent | Section / element that targets it | Line |
|---|---|---|---|---|
| 1 | compare PPO dental plans | commercial-investigation (HUB PRIMARY) | `<title>` + `#compare` H2 | 6, 1019 |
| 2 | PPO dental plans comparison / compare dental insurance plans | commercial | `#compare` matrix `#compareMatrix` | 1032 |
| 3 | best PPO dental insurance 2026 | commercial, dated | needs a home — see rec in 6 | — |
| 4 | dental plan waiting periods compared | commercial detail | compare matrix row + FAQ #2 | 1953 |
| 5 | dental annual maximum compared | commercial detail | compare matrix row + FAQ #3 | 1954 |
| 6 | how to buy a PPO dental plan | informational, list | `#playbook` QUESTIONS `<ol>` | 1163 |
| 7 | mistakes buying dental insurance | informational, list | `#playbook` MISTAKES `<ol>` | 1162 |
| 8 | how do I compare PPO dental plans | informational / PAA | FAQ #1 | 1952 |
| 9 | what is a dental insurance waiting period | definitional / PAA | FAQ #2 + glossary term | 1953 |
| 10 | what is a dental annual maximum | definitional / PAA | FAQ #3 + glossary term | 1954 |
| 11 | which PPO dental plan is best for implants | fit / PAA | FAQ #5 (links to matcher) | 1956 |
| 12 | should I verify my dentist before buying | buy / PAA | FAQ #9 + `#dentists` | 1960 |

Queries 11 and 12 are the bridge between hub and spokes: the hub should win the PAA/snippet for the question, then route the click into the matcher (`#match`) or a treatment spoke. It should not try to be the deep ranking page for "best dental insurance for implants" — that is the spoke's job per SEO1.

---

## 4. SERP feature targets — the exact element to win each, and the change

### A. AI Overview / AI Mode
- **Queries:** "best PPO dental plan for [implants / no waiting period / between jobs]", "how do PPO dental plans compare".
- **Element that should win it:** the FAQ block (1951-1962) plus the structured plan attributes in the `PLANS`/feature-table data (monthly, annual max, waiting period). AI Overviews assemble from clearly-attributed, entity-shaped facts.
- **Change needed:** ensure each plan's monthly cost, annual maximum, and waiting period are present as labeled text in server HTML (not only chart cells), and that the FAQ answers naming specific plans (FAQ #5, #6, #7, #8 at 1956-1959) are server-rendered. The named-plan, named-number style already in those answers is exactly what AI Overviews cite. Do not soften it into vague prose.

### B. Featured snippet — paragraph
- **Primary query:** "how to compare PPO dental plans".
- **Element that should win it:** FAQ #1 answer (line 1952).
- **Change needed:** the current answer is 60 words and lists five comparison points in prose. To win the paragraph snippet cleanly it should lead with a 40-60 word direct answer that a reader could lift whole. Literal copy in section 5.

### C. Featured snippet — table
- **Query:** "compare PPO dental plans waiting periods" / "PPO dental plan annual maximums compared".
- **Element that should win it:** a clean comparison `<table>`. The risk: `#compareMatrix` (line 1032) is a CSS-grid of `<div>`s, not a semantic `<table>`, and the feature table (`.feat-tbl-scroll`, CSS line 330) is JS-built and set `min-width:900px` with horizontal scroll. Google's table snippet extractor strongly prefers a real `<thead>/<tbody>` table present in HTML.
- **Change needed:** render at least one server-side semantic `<table>` with `<caption>` (e.g. "PPO dental plans compared: monthly cost, annual maximum, waiting periods, 2026") and column headers Plan / Monthly / Annual maximum / Major waiting period / Best for. The interactive matrix can stay as the rich UI; the table snippet needs a crawlable static twin. This is the highest-leverage single change for a feature the hub is uniquely positioned to win.

### D. People Also Ask
- **Queries:** the 10 FAQ questions, verbatim (1952-1961). They already read as natural queries ("How do I compare PPO dental plans?", "What is a dental insurance waiting period?", "Which PPO dental plan is best for implants?").
- **Element that should win it:** the `#faq` block.
- **Change needed:** keep questions as `<h3>`-level query-shaped headings in server HTML (currently they are `.fq-title` spans built by JS at 1974). Promote each question to a real heading element and keep the answer's first sentence a self-contained direct answer. Mirror the two highest-value playbook headings as query-shaped H2/H3 ("How to buy a PPO dental plan" already is, line 1160).

### E. Sitelinks
- **Query:** brand + "compare ppo dental plans".
- **Element that should win it:** the section ids as crawlable jump targets (`#compare`, `#shelf`, `#dentists`, `#playbook`, `#faq`) surfaced in the sticky TOC (`.toc-links`, CSS line 162).
- **Change needed:** ensure TOC anchors use descriptive link text ("Compare plans", "Find a dentist", "FAQ", "Buyer's playbook") and that each target section has a stable id and a real heading. Structure is already largely in place; the win is consistent, keyword-clean anchor text.

---

## 5. Literal answer-block copy — top 2 snippet targets

These are written to be lifted whole. No em-dashes. Numbers and plan names match the existing FAQ data so the page stays internally consistent.

### Target 1 — paragraph snippet for "how to compare PPO dental plans" (FAQ #1, line 1952)

> To compare PPO dental plans, weigh five things in this order: the waiting period for the treatment you actually need, the annual maximum the plan pays each year, the coinsurance percentage for major work, whether your dentist is in network, and only then the monthly cost. A plan that excludes your treatment is expensive at any price, so start from the work ahead, not the premium.

(54 words. Drops straight into FAQ #1 as the lead sentence, then the existing detail can follow.)

### Target 2 — definition snippet for "what is a dental annual maximum" (FAQ #3, line 1954)

> A dental annual maximum is the most a PPO plan will pay toward your care in one benefit year. Once you reach it, you pay the rest yourself until the year resets. Individual PPO plans commonly cap between $1,000 and $5,000. For large treatment such as crowns or implants, the annual maximum often matters more than the coverage percentage.

(57 words. Definition-first sentence is what the paragraph/definition snippet extracts; the range and the "why it matters" line reinforce it.)

---

## 6. Recommendations for the other architects

- **"best PPO dental insurance 2026" has no textual home.** Add it to one early server-rendered subhead near `#compare` (line 1019), e.g. an H2/eyebrow pairing "Compare PPO dental plans side by side" + "The best individual PPO dental plans for 2026". On-page architect's call on exact placement.
- **Add a server-side semantic comparison `<table>`** for the table snippet (target C). This is the single change most likely to win a feature the hub deserves.
- **Server-render the FAQ, playbook lists, and plan attribute text** (currently JS-built at 1968). Everything in section 4 depends on it. Technical architect owns the render method.
- **Promote FAQ questions to heading elements** for PAA (target D).

---

## 7. Eight-line summary

1. Hub primary stays `compare PPO dental plans`; this memo maps it to the `#compare` H2 (line 1019) and recommends the secondary "best PPO dental insurance 2026" get an early subhead, since it currently has no textual home.
2. The page's best snippet assets (FAQ answers 1952-1961, playbook lists, comparison matrix) are all JS-injected at runtime via `renderStatics()` (1968); server-rendering them is the precondition for every SERP win below.
3. AI Overview target: the named-plan, named-number FAQ answers (e.g. FAQ #5 implants, line 1956) plus labeled plan attributes; keep them specific, do not soften.
4. Paragraph snippet target: FAQ #1 (line 1952), rewritten to lead with a 54-word direct answer on how to compare PPO plans (literal copy provided).
5. Table snippet target: add a server-side semantic `<table>` with caption and headers; today's `#compareMatrix` (1032) is a CSS-grid of divs and the feature table is JS-built, neither is reliably extractable.
6. PAA target: the 10 FAQ questions already read as natural queries; promote each to a heading and keep answer-first sentences self-contained.
7. Sitelinks target: the sticky TOC anchors (`.toc-links`, CSS 162) plus stable section ids; the win is clean, descriptive anchor text.
8. Recommended 12 priority queries are mapped to sections in section 3, with literal answer-block copy delivered for the top 2 snippet targets (how-to-compare paragraph and annual-maximum definition).
