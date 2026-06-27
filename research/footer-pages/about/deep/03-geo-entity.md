# 03 — GEO Entity Strategy for the CoverCapy About Page

Workstream 3 of 10. Research only. No HTML.

This file defines how AI answer engines (ChatGPT, Google AI Overviews, Perplexity,
Gemini, Claude, Copilot) should understand and describe CoverCapy as a company ENTITY,
and exactly how the About page should be written so those engines summarize the brand
accurately. The About page is the single most important entity-declaration surface on the
site, second only to the homepage, because Organization schema and entity recognition both
begin on the homepage and About page.

Read alongside:
- `docs/geo-readiness.md` (the working GEO checklist; this file fills in section 3, "structured data / entities")
- `research/footer-pages/about/02-seo-geo.md` (the keyword + FAQ pack already written for this page)
- `CLAUDE.md` (entity facts: not a carrier, not a practice; tagline; tiers)

---

## 1. Why the About page is an entity surface, not just a brand page

AI answer engines do not rank pages and read them top to bottom. They decompose a question
into sub-questions, retrieve short passages (roughly 200 to 400 word chunks), score each
passage on entity clarity, fact density, freshness, and authority, then assemble an answer
from the passages that survive. A page only gets cited if a retrieval system can pull one
clean passage, attribute it correctly to the CoverCapy entity, and fit it into the answer.
[Frase, 2026-04-23, accessed 2026-06-26]

For a company entity, the engine is trying to resolve three things:
1. What category of thing is CoverCapy.
2. What it does and who it serves.
3. Whether the description is corroborated and consistent across the web.

The About page is where we state all three plainly and where the `Organization` schema node
lives. Organization schema on the homepage and About page is "where entity recognition
begins," telling an AI system that "CoverCapy" is a real, verifiable company and not a random
string. [Greadme / Averi / Visiblie schema guides, accessed 2026-06-26]

The practical bar: an AI model should be able to read the top of the About page and produce
an accurate one-sentence description of CoverCapy without hallucinating, without calling us an
insurer, and without confusing us for a dental practice.

---

## 2. The canonical entity description we want propagated

These are the exact descriptions we want every engine to converge on. They should appear
verbatim (or near-verbatim) on-page, in schema `description`, and ideally on every off-site
profile (LinkedIn, Crunchbase, social) so the description is corroborated across sources.
Consistency across sources is what lets an engine connect a passage to our brand and trust it.

### Canonical 1-sentence entity description (the definitional lead)
> CoverCapy is a concierge and discovery platform for PPO dental care that helps people compare
> PPO plans, estimate treatment costs, verify whether a dentist takes their exact network, and
> find a modern in-network dentist across the United States.

This follows the highest-leverage GEO pattern: **"[Entity] is a [category] that
[differentiator]."** Pages that open with a direct definitional sentence are cited at roughly
3.4x the rate of pages that bury the definition, and this single sentence is the passage a
retrieval engine reaches for first. [Frase 2026; SEOTuners 2026, accessed 2026-06-26]

Use "concierge and discovery platform for PPO dental care" as the **category**. Do not vary the
category language page to page; consistent category language is a named GEO requirement.
[Frase 2026, accessed 2026-06-26]

### Canonical 1-paragraph entity description
> CoverCapy is a concierge and discovery platform for PPO dental care in the United States. It
> helps patients compare PPO dental plans in plain language, estimate what a treatment will
> actually cost, verify that a specific dentist takes their exact PPO network, and find a modern
> in-network office. CoverCapy is free for patients and is not an insurance carrier, broker, or
> dental practice; it does not sell, underwrite, or administer insurance and does not provide
> dental care. It earns revenue from dental practices through clearly labeled membership,
> accreditation, and visibility programs, including its Capy Accreditation credential.

This paragraph is the "self-contained answer block" version: 40 to 150 words, reads correctly
out of context, and answers "what is CoverCapy / is it insurance / how does it make money" in
one chunk. Self-contained blocks survive chunking; narrative paragraphs that only make sense
in context do not. [get-ryze.ai 2026; Lumar 2026, accessed 2026-06-26]

### The two short forms (for og:description, schema, FAQ answer)
- **Short A (category + scope):** "CoverCapy is a concierge and discovery platform for PPO
  dental care. It is not an insurance carrier or a dental practice."
- **Short B (with verbs):** "CoverCapy helps people compare PPO plans, estimate dental costs,
  verify in-network coverage, and find a modern dentist. Free for patients."

The current about.html schema and quick-answer block already use language very close to this.
Keep them aligned word-for-word; drift between the visible quick-answer, the FAQ schema, and the
Organization schema weakens the entity signal ("schema drift" is a named citation-decay cause).
[Frase 2026, accessed 2026-06-26]

---

## 3. Entity facts to state plainly on-page

State each of these as a flat, declarative, attributable sentence somewhere in the body so a
retrieval engine can lift it. Declarative "X is Y" sentences are cited at nearly twice the rate
of hedged language. [get-ryze.ai 2026, accessed 2026-06-26] Each fact below is a candidate
self-contained answer block under a question-shaped header.

### What it IS
- CoverCapy is a concierge and discovery platform for PPO dental care.
- It operates across the United States.
- It is free for patients to use.
- It is an independent guidance platform (independent of any single carrier).

### What it DOES (the four verbs, stated as a set)
- Compares PPO dental plans in plain language.
- Estimates out-of-pocket treatment cost (in ranges, not false precision).
- Verifies whether a specific dentist takes a patient's exact PPO network.
- Helps patients find a modern, in-network dentist near them.

### Who it SERVES (two audiences, named explicitly)
- Patients shopping for dental care, usually triggered by a life event (cracked tooth, new
  benefits, a move, a job change) rather than an insurance renewal.
- Modern dental practices that want a clean, verified profile and coverage-aware patients.

### What it is NOT (the disambiguation facts — critical for YMYL)
- Not an insurance carrier; does not sell, underwrite, or administer insurance.
- Not an insurance broker or broker of record.
- Not a dental practice; does not provide dental care.
- Not a generic comparison grid or a plain healthcare directory.
- Capy Accreditation is not a government certification and not a dental license.

The "is NOT" facts matter more for an entity than usual here because the adjacent entities in
our category (insurers like Delta Dental, brokers, practices, directories) are strong, famous
entities. If we do not state the boundary plainly, an engine resolving "CoverCapy" against
nearby entities can mislabel us as an insurer. Stating the negative explicitly is the
disambiguation signal.

### Brand-fact anchors that feed entity authority
- Name: **CoverCapy** (one word, capital C, capital C). Never "Cover Capy" or "Covercapy."
- Tagline / slogan: **"Get cover today, see a dentist tomorrow."**
- Sub-brand / credential: **Capy Accreditation** (a private CoverCapy credential).
- Tiers (named entities under the brand): free, Capy Accredited, Platinum Elite.
- areaServed: United States.

Name consistency is non-negotiable. The company name, sub-brand names, and tier names must match
exactly on the website, LinkedIn, Crunchbase, Google Business Profile, and any directory.
Inconsistent naming across platforms breaks entity resolution. [SEOTuners 2026; wpmanageninja
2026, accessed 2026-06-26]

---

## 4. GEO writing patterns for the page

These are the on-page mechanics that make the entity extractable. Hand these to the build/PM
workstream as writing rules.

### 4.1 Definitional lead sentence (every major section)
Open the page, and ideally each major section, with the definitional pattern
"[Entity] is a [category] that [differentiator]." The first sentence of the page must name
CoverCapy and its category. The existing hero opens with a metaphor ("we turn the messiest
moment..."); that is good brand copy but it is NOT the definitional lead an engine lifts. Ensure
the **quick-answer block immediately below the hero carries the verbatim canonical sentence** so
the definitional passage is in the first 30% of the page. 44.2% of LLM citations come from the
first 30% of the text, so the definition must be front-loaded. [witscode 2026, accessed
2026-06-26]

### 4.2 Question-shaped headers
Use headers that mirror how a user actually asks an assistant, because the engine matches
sub-questions to passages. Convert section heads and FAQ items to natural-language questions:
- "What is CoverCapy?"
- "Is CoverCapy an insurance company?"
- "Is CoverCapy free?"
- "How does CoverCapy make money?"
- "What is Capy Accreditation?"
- "How does CoverCapy help patients / dentists?"

"How does CoverCapy make money?" outperforms "Our business model" because it matches the query.
[get-ryze.ai 2026, accessed 2026-06-26] The page already has these as FAQ entries — good. The
recommendation is to make sure the visible H2/H3 of at least the key body sections are also
question-shaped, not just the FAQ accordion.

### 4.3 Self-contained answer blocks (40 to 150 words)
Directly under each question header, place a 40 to 150 word answer that is true and complete
out of context. It must not depend on the paragraph before it. The answer's first sentence
should restate the entity and answer the question; supporting detail follows. Each block should
read correctly if an engine extracts it alone. [get-ryze.ai 2026; Lumar 2026, accessed
2026-06-26]

Pattern for each block:
1. Sentence 1: answer + entity name ("No. CoverCapy is not an insurance company...").
2. Sentences 2 to 4: the supporting facts.
3. Optional close: the safe action ("always verify benefits directly with your carrier and
   office").

### 4.4 Clear attribution / declarative tone
Write claims as sourced or self-evident facts, not hedges. "CoverCapy is free for patients" not
"CoverCapy aims to be largely free." A claim with no attribution has no citation power; a claim
stated confidently and (where a number is involved) sourced gets retrieved. For any external,
checkable fact (e.g. market statistics) cite the primary source inline with a date. For
self-facts about CoverCapy, the page itself is the authority, so state them flatly.
[get-ryze.ai 2026; Frase 2026, accessed 2026-06-26]

### 4.5 Fact density and parallelism
Keep the four-verb capability list and the "is / is not" clarifier as parallel, scannable rows
(the page already does this). Lists and tables are easier for an engine to read row by row and
quote than prose. The existing "What CoverCapy is / is not" clarifier and the trust grid are
ideal extractable structures; keep them.

### 4.6 Mirror the schema and the visible copy
Every fact in the FAQPage JSON-LD and the Organization JSON-LD must have a matching visible
sentence on the page. Server-rendered JSON-LD generated from the page's own content (content
parity) is already the site standard per geo-readiness.md; preserve it. Do not let the schema
say something the body does not.

---

## 5. sameAs and cross-reference recommendations

`sameAs` is the single highest-leverage field in Organization schema. It disambiguates the
entity by tying CoverCapy to other trusted profiles the model already recognizes, so the engine
knows the website, the LinkedIn page, and the social profiles are the same organization.
Organizations with complete sameAs arrays have materially higher AI citation rates and more
accurate Knowledge Panels. [Frase 2026; Greadme 2026; Results Repeat, accessed 2026-06-26]

### Current state (from about.html, accessed 2026-06-26)
The Organization and AboutPage schema currently point `sameAs` only at two internal CoverCapy
pages:
```
"sameAs": [
  "https://www.covercapy.com/capy-accreditation",
  "https://www.covercapy.com/covercapy-network-effect"
]
```
This is the most important gap. `sameAs` is meant to link the entity to **external,
authoritative profiles of the same entity** for disambiguation, not to other pages on the same
domain. Internal links belong in `url`, `mainEntityOfPage`, or `relatedLink`, not `sameAs`.
(Will Scott, 2025-07-30: `sameAs` is for "this is the same entity elsewhere"; for related-but-
not-identical things use `knowsAbout`/`relatedLink`. accessed 2026-06-26)

### Recommended sameAs targets (external profiles to create/claim then list)
Populate `sameAs` with the real, claimed external profiles of the CoverCapy organization, in
roughly this priority order (highest disambiguation value first):
1. **Wikidata item** for CoverCapy (create one if eligible) — gives a canonical Q-ID, the
   strongest single graph identifier. Gemini and Google AI Overviews lean on the Google
   Knowledge Graph, which is seeded by Wikidata/Wikipedia. [Frase 2026, accessed 2026-06-26]
2. **Wikipedia article** (only if/when notable enough to qualify; do not fake notability).
3. **LinkedIn company page** (`/company/covercapy`).
4. **Crunchbase profile**.
5. **X/Twitter profile**.
6. **Facebook / Instagram business profiles**.
7. **YouTube channel** (if one exists).
8. **Google Business Profile** (claim it; feeds the Knowledge Panel).

Use the same exact `name`, `url`, `logo`, and one-paragraph `description` on every one of these
so the description is corroborated. Corroboration across sources is what training-data engines
(Claude, ChatGPT) rely on most. [Frase 2026, accessed 2026-06-26]

### Organization schema completeness checklist (hand to build)
Per the GEO entity audit, the `Organization` block should carry:
- `@id` — a stable canonical URL (e.g. `https://www.covercapy.com/#organization`) reused
  identically on the homepage and About page so both pages point at one entity node.
- `name` = "CoverCapy"
- `url` = the homepage
- `logo` = a real `ImageObject` with width/height (currently missing).
- `description` = the canonical one-paragraph description above.
- `slogan` = "Get cover today, see a dentist tomorrow."
- `areaServed` = "United States" (or a Country node) — currently absent.
- `foundingDate` — add if known (named in geo-readiness.md as a wanted field).
- `sameAs` = the external profile array above (NOT internal pages).
- `brand` / `subOrganization` or a `knowsAbout` reference for Capy Accreditation.
- Keep `mainEntity` of the AboutPage pointing at this same `@id` so the page resolves to one
  entity, not a duplicate.

[Frase entity audit, 2026-04-23; Averi/Visiblie schema guides, accessed 2026-06-26]

### On-page facts that feed entity authority (recap)
The facts most worth stating on-page because they directly strengthen the entity node:
- The definitional category sentence ("...is a concierge and discovery platform for PPO dental
  care...").
- areaServed = United States.
- The "is NOT an insurer / broker / practice" disambiguation set.
- Name, slogan, and the named sub-entities (Capy Accreditation; the three tiers).
- The revenue model in one sentence (transparency = trust signal for YMYL).
- Free-for-patients statement.

---

## 6. Platform-specific notes (how each engine forms the description)

- **Google AI Overviews + Gemini** — draw on the Google Knowledge Graph. Without a canonical
  ID (`sameAs` to Wikipedia/Wikidata, a claimed Knowledge Panel) CoverCapy is weak on this path.
  Priority: Wikidata/Knowledge Panel + complete Organization schema with `sameAs`.
- **Perplexity** — crawls the live web, cites many sources per answer (~21.9 avg vs ~7.9 for
  ChatGPT), and heavily favors freshness; content updated within ~30 days is cited far more
  often than 12-month-old content. Keep `dateModified` visible and refresh the page on a cadence.
- **ChatGPT** — leans on training-weight sources (Wikipedia, major publications) plus Bing's
  live index. Priority: consistent off-site description + good Bing indexation.
- **Claude** — training-data dependent; needs the entity described consistently across multiple
  sources within its training window. One Wikipedia/Wikidata entry plus consistent About-page
  language across our own properties does more than any single on-page tweak.
- **Copilot / Grok / DeepSeek** — cite fewer sources, so the clean definitional opener and a
  three-sentence summarizable description are the deciding factor.

[Frase 2026 "6 signals" + platform section; Which AI engines cite which sources, Frase
2026-06-09; accessed 2026-06-26]

---

## 7. Concrete recommendations for the About build (summary for PM synthesis)

1. Put the **verbatim canonical 1-sentence description** in the quick-answer block in the
   first 30% of the page (it largely already is — lock the wording).
2. Make the page's key body H2/H3s **question-shaped**, matching the FAQ questions.
3. Ensure each answer is a **self-contained 40 to 150 word block**, entity named in sentence 1.
4. Keep the **"is / is not" clarifier and trust grid** as parallel rows (extractable structures).
5. State the **four "is NOT" disambiguation facts** plainly in body prose, not only in schema.
6. **Fix `sameAs`:** remove internal pages; add external profiles (Wikidata, LinkedIn,
   Crunchbase, social, GBP). Move internal links to `relatedLink`/`mainEntityOfPage`.
7. Add to Organization schema: stable `@id`, real `logo` ImageObject, `areaServed: United
   States`, `foundingDate` if known.
8. Use **one shared Organization `@id`** across homepage and About so both resolve to one node.
9. Keep **schema and visible copy word-aligned** (no schema drift).
10. Publish the same one-paragraph description on every off-site profile for corroboration.
11. Keep a visible `dateModified` and plan a refresh cadence (Perplexity freshness lever).

---

## 8. Sources (all accessed 2026-06-26)

- Frase — "Entity Optimization for GEO: The 2026 Practitioner Guide," 2026-04-23.
  https://www.frase.io/blog/entity-optimization-for-geo
  (6-signal model, definitional opener "[Entity] is a [category] that [differentiator]",
  sameAs disambiguation, Organization schema checklist, per-platform weighting, +40% citation
  lift from fact density per the Princeton GEO paper.)
- Frase — "Which AI Engines Cite Which Sources? ChatGPT vs Perplexity vs Gemini vs Claude,"
  2026-06-09. https://www.frase.io/blog/which-ai-engines-cite-which-sources
- SEOTuners — "Best Practices for Generative Engine Optimization (GEO) 2026."
  https://seotuners.com/blog/generative-engine-optimization/generative-engine-optimization-best-practices/
  (definitional sentence ~3.4x citation rate; category-language consistency; cross-platform
  name consistency.)
- wpmanageninja — "GEO and SEO Best Practices: Complete Optimization Guide."
  https://wpmanageninja.com/geo-and-seo-best-practice/
  (consistent naming across website, LinkedIn, Crunchbase, Google/Bing/Apple profiles.)
- get-ryze.ai — "GEO Content Strategy: How to Write for AI Answer Engines in 2026."
  https://www.get-ryze.ai/blog/geo-content-strategy-how-to-write-for-ai-answer-engines-in-2026
  (self-contained 40-150 word answer blocks; question-shaped headers; declarative "X is Y"
  cited ~2x vs hedged language; front-loading.)
- Lumar — "Content Chunking & AI Extractability (GEO/AEO Explainer)."
  https://www.lumar.io/blog/best-practice/content-chunking-ai-extractability-geo-aeo-explainer/
  (semantic chunking; 200-400 word RAG chunks; complete-thought modules.)
- WitsCode — "AI Search Optimization: The 2026 LLM SEO Guide."
  https://witscode.com/guides/ai-llm-seo
  (44.2% of LLM citations from first 30% of text; AI Overviews on ~48% of queries Feb 2026.)
- Greadme — "What Is Organization Schema? Complete Guide."
  https://www.greadme.com/blog/schemas/what-is-organization-schema-complete-guide
  (Organization schema as the entity declaration; homepage + About page placement.)
- Averi — "Schema Markup for AI Citations: The Technical Implementation Guide."
  https://www.averi.ai/blog/schema-markup-for-ai-citations-the-technical-implementation-guide
- Visiblie — "Schema Markup for AI Visibility: Structured Data Guide."
  https://www.visiblie.com/blog/schema-markup-ai-visibility
  (Organization schema on homepage + About establishes brand identity to AI; sameAs as highest-
  leverage field; complete sameAs arrays correlate with higher citation rates and accurate
  Knowledge Panels.)
- Will Scott — "When should I use sameAs versus knowsAbout in Schema.org markup," 2025-07-30.
  https://willscott.me/2025/07/30/sameas-versus-knowsabout-in-schema/
  (sameAs = same entity elsewhere for disambiguation; not for related-but-different things.)
- Results Repeat — "Stronger SEO and AIO with sameAs Schema."
  https://resultsrepeat.com/why-your-website-should-use-sameas-schema/

Internal references:
- `docs/geo-readiness.md` (CoverCapy GEO checklist, June 2026).
- `research/footer-pages/about/02-seo-geo.md` (keyword + FAQ pack).
- `about.html` (current Organization / AboutPage / FAQPage JSON-LD, accessed 2026-06-26).
- `CLAUDE.md` (entity facts, tagline, tiers).
