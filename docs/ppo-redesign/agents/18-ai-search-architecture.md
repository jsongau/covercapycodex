# Agent 18 — AI-Search & Generative-Discovery Architecture

**Workstream:** AI answerability, citation-worthiness, entity clarity, passage-level structure
**Scope:** PPO hub + 8 plan spokes + carrier/treatment/timing/glossary cluster
**Date:** June 2026
**Current score:** **7.5 / 10**
**Note on overlap:** The Master Prompt lists Agent 17 as "AI search and generative-discovery architect" and Agent 18 as "knowledge-graph and semantic-content modeler." This memo is written to the AI-search brief and is filed at the requested path (`agents/18-ai-search-architecture.md`). It complements, and should be read alongside, the knowledge-graph/entity work and the existing SEO doc `_redesign-package/seo/improvements/11-keyword-intent-serp.md`, which it builds on rather than repeats.

---

## 0. The founder's two fears, answered up front

**Fear A — "the redesign is too basic / worse than current."** The single most valuable asset this project already owns is the `plan-data/*.md` source-of-truth: rich, qualified, comparison-grade tables (premiums, annual max, deductible, coinsurance by year, waiting periods, effective dates, implant sub-limits, vision/hearing bundles, AM Best ratings, "best for / weak for" verdicts) plus the `PLAN-DATA-RECONCILIATION.md` canonical file with per-fact confidence tags. **This is exactly the kind of content AI answer engines cite.** The redesign is only "too basic" if that depth is flattened into generic marketing copy. The mandate of this memo is: **do not lose the tables, the verdicts, the qualifiers, or the confidence tags — render them as visible, server-rendered, machine-readable HTML.**

**Fear B — "what must be ADDED for AI answerability."** The depth exists in Markdown; it is not yet structured on the page as *answer-first passages a model can lift cleanly*. The additions are organizational, not net-new claims: an answer-first lead block, per-intent answer-first sentences, comparison-ready HTML tables, qualifier/source-date discipline, and a question-shaped FAQ. Every addition maps to an existing field. **No fabricated data is required, or permitted.**

---

## 1. What the primary sources actually say (and what they debunk)

Grounded in current Google Search Central guidance (June 15 2026 update). The honest, defensible position:

1. **There is no special "AI schema."** "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add." Keep structured data (Organization, WebSite, BreadcrumbList, ItemList, FAQPage, valid Offer) because it earns *rich results* and keeps machine data consistent with visible data — **not** because it unlocks AI Overviews.
2. **`llms.txt` does nothing for Google.** "You don't need to create new machine-readable files, AI text files, markup, or Markdown to appear in Google Search… Google Search ignores them." It is harmless to ship one for other tools, but **make no ranking claim about it** and do not present it as an AI-visibility lever.
3. **Eligibility = ordinary indexability.** "To be eligible to be shown in generative AI features… a page must be indexed and eligible to be shown in Google Search with a snippet." So our entire AI-search edge reduces to: be crawlable, be server-rendered, be genuinely useful, be the most authoritative source on each exact plan fact. This is why the **server-rendering rule** and the **canonical data model** in the Master Prompt are the real AI-search strategy.
4. **"AEO/GEO" is just SEO.** Google: "optimizing for generative AI search is optimizing for the search experience, and thus still SEO." Do not buy or build around AEO/GEO "hacks."
5. **Do NOT chunk, do NOT rewrite for machines, do NOT mass-generate variants.** Google explicitly says chunking is unnecessary, writing "just for AI" is unnecessary, and scaling thin pages per query variation violates the scaled-content-abuse policy. This directly bounds our question-fan-out work below: **fan-out is satisfied by sections and links on substantive pages, never by spun-up thin pages.**
6. **The mechanisms we design for are real:** RAG/grounding (the model retrieves and quotes ranked pages) and **query fan-out** (the model issues related sub-queries). Our job is to be the cleanest, best-qualified retrieval target for the fan-out a dental-plan shopper triggers.

**Bottom line:** AI answerability here is *people-first content + clean structure + trustworthy qualified data*, not a markup trick. That is good news — it is exactly where our `plan-data` assets already win.

---

## 2. The answer-first block pattern (lead every major page with this)

Every hub, plan, carrier, treatment, timing and glossary page must **open** with a standardized, server-rendered "Answer Block" before any editorial prose or hero storytelling. Pattern:

```
[Answer Block — appears immediately after breadcrumb + freshness line]

1. ONE-SENTENCE DIRECT ANSWER (≤ 30 words, the literal answer to the page's
   primary question). Plain text in a <p>, not inside an image or a JS-only node.

2. KEY-FACTS STRIP (3–6 facts as a small definition list / table):
   premium "from" (illustrative), annual max, deductible, fastest path to major,
   effective date, one headline caveat. Each value carries its qualifier inline.

3. "BEST FOR / WEAK FOR" two-column micro-summary (lifted verbatim from the
   verdict in plan-data/*.md). This is the citation-worthy passage.

4. A single descriptive next action ("Compare these against {n} other PPO plans"
   / "Check official pricing for your ZIP").
```

### Worked example — Humana Extend 5000 plan page (from existing `plan-data/humana-extend-5000.md`)

> **Humana Extend 5000 is a premium individual PPO that bundles dental, vision and hearing on one plan, reaching major-work coverage in 6 months — the fastest in our comparison set.**
>
> | Fact | Value (illustrative, varies by state/age/ZIP) |
> |---|---|
> | Premium from | ~$65–100 / mo |
> | Annual maximum | $5,000 (dental) |
> | Deductible | $75 / yr |
> | Major coverage | 50% Year 1 → 60% Year 2, after 6-month wait |
> | Implants | 50%→60% after 6-month wait; $2,000/yr, $4,000 lifetime sub-limit |
> | Effective date | 6 days after enrollment (not next-day) |
> | Caveat | 90-day basic wait; no orthodontics; not sold in AK, HI, NV, NM, WA |
>
> **Best for:** dental+vision+hearing on one premium; planned major work you can wait 6 months for (highest Year 1/Year 2 major reimbursement in the set); members with 12 months prior coverage (waiver).
> **Weak for:** urgent needs (6-day minimum start); fillings in the first 90 days; budget shoppers (highest premium); anyone needing orthodontics.
> *Verified June 2026 · source: official plan documents + editorial review.*

Note every number above already exists in the brief; the block only *re-presents* it answer-first. **This is the entire pattern** — repeat it per page type with the page's own primary question.

### Why this wins citations
A RAG system retrieving "does Humana Extend 5000 cover implants / how long is the wait" finds a self-contained, qualified, sourced passage it can quote without stitching, and a clickable link back. The verdict block is written as a quotable sentence, not a bullet salad.

---

## 3. Comparison-ready factual tables (the crown jewels — protect them)

The reconciliation file already contains the **canonical 8-plan key-spec matrix** (premium / annual max / deductible / preventive / basic / major / implant / effective / confidence). This must be rendered as **one real HTML `<table>`**, server-side, on the hub — not a JS-built grid, not an image.

Requirements for every comparison table:
- Real `<table>` with `<thead>`/`<th scope>` so the structure is machine-legible and screen-reader legible (same discipline; Google now stresses semantic HTML for both human and agent readability).
- **Every cell that varies carries its qualifier in-cell or in a footnoted legend** ("illustrative — varies by state/age/ZIP," "state-specific," "needs official doc"). Never strip the qualifier to make a cell look tidy — a stripped qualifier is how a model emits a false hard number.
- **Confidence tags survive to the page.** `verified` / `state-specific` / `needs-doc` should drive a visible "verified June 2026" or "confirm by state" microlabel. `needs-doc` rows (Ameritas Y2 max, Guardian major %/whitening, Aetna full brief, MetLife) must render an explicit "not yet confirmed — we verify before you enroll," **never a guessed value**. MetLife stays `noindex` until verified.
- One canonical source for the numbers (the reconciliation file → data model). No second copy of the figures in a template. This kills data-drift, which is also the #1 way a comparison page becomes uncitable (a model that finds two of your pages disagreeing trusts neither).

---

## 4. Source-backed statements & citation-worthiness

- Each plan page ends with a **Sources & update log** (source title, type, URL/repo file, effective date, date checked, reviewer, confidence) — the `Evidence` field set already specified in the Master Prompt. Visible, not hidden.
- A page-level **"Last verified: June 2026"** freshness line near the top (byline-date discipline) signals currency, which RAG favors for "is X still true" queries.
- **Independent-review framing** stays explicit ("we review branded plans independently; no carrier endorsement or affiliation"). This is both a trademark safeguard and an E-E-A-T/citation-trust signal.
- **No fabricated prices or ratings.** Cost intent is met with the illustrative example + a third-party fee estimate (e.g. FAIR Health) — exactly as the keyword doc already mandates — never an invented hard price or invented review schema.

---

## 5. Entity clarity

On each page, name the entities cleanly and consistently so the model resolves them unambiguously:
- **Carrier legal entity** (e.g. "Humana Insurance Company") + **plan exact name** + **tier** + **network exact name** (e.g. "Humana Dental nationwide network," "DenteMax Plus," "Golden Rule / UnitedHealthOne").
- **Procedure entities** in CDT-aligned vocabulary (cleanings, fillings, crowns, root canals, implants, orthodontics) so treatment↔plan questions resolve.
- **Plan-feature entities** (annual maximum, deductible, coinsurance, waiting period, effective date, missing-tooth clause).
- Keep naming identical across hub, spoke, carrier hub, schema and visible text. Entity consistency across surfaces is what lets the model treat CoverCapy as one authoritative source rather than fragments. (This is the bridge to the knowledge-graph workstream.)

---

## 6. Treatment-to-plan relationships

A high-value AI-answer surface is "best dental insurance for implants / crowns / root canals / orthodontics." For each treatment page:
- Lead with the answer-first block scoped to that treatment ("For implants, the relevant lever is the major/implant coinsurance tier and the implant waiting period and sub-limit, not the headline premium.").
- Render a **treatment-fit table** drawn from the canonical data: per plan, the relevant tier %, the wait, the effective-vs-wait distinction, and any sub-limit (e.g. Humana's $2,000/yr, $4,000 lifetime implant cap; MoO's day-1-reduced-benefit model).
- **Distinguish "coverage starts" from "this treatment tier becomes eligible"** explicitly — this is a real, frequently-misunderstood passage that wins both snippets and citations.
- Link to the matching plan spokes and glossary terms. Do **not** spin thin per-procedure-per-carrier pages (scaled-content risk).

---

## 7. Question fan-out / People-Also-Ask (without thin pages)

Map the realistic fan-out for a dental-plan shopper and ensure **each sub-question is answered by a heading, section, or FAQ entry on a substantive page** — satisfying fan-out through depth, not page count (per Google's explicit warning).

Per plan, guarantee an answerable surface for:
- "Does {plan} cover implants?" → implant line, answer-first.
- "How long is the {plan} waiting period?" → waiting-period table + answer-first line.
- "How much is {plan}?" → illustrative example + estimate, qualified.
- "What dentists take {plan}?" → named network + provider-lookup pointer.
- "Is {plan}/{carrier} good?" → independent verdict block (routed to carrier-eval page to avoid cannibalization).
- "{plan} vs {plan}" → compare tool + alternatives module; dedicated comparison page **only where both plans are `verified`**.

FAQ items must be phrased as **natural questions** and emit valid `FAQPage` schema **that matches the visible Q&A** (schema-visible parity is a hard rule; mismatched FAQ schema is a policy risk and earns nothing).

---

## 8. Passage-level answerability

- One idea per section, each opening with its **answer-first sentence**, then the table/detail.
- Descriptive headings phrased close to the question ("Humana Extend 5000 waiting periods," not "Timing").
- Self-contained passages: a reader (or model) landing mid-page on the implant section gets the qualified answer without scrolling up for context (restate plan name + the qualifier).
- Tables for anything comparative or numeric; prose for "why it matters."

---

## 9. Machine-readable but user-visible (the non-negotiable)

Everything above must be **visible HTML that is also clean structure** — never a hidden machine layer. Concretely:
- Plan facts in the **initial server-rendered HTML** (Master Prompt server-rendering rule): plan/carrier/network names, premiums *with qualifiers*, annual max, deductible, coinsurance tiers, waits, effective-date language, source/review dates, internal links. JS may enhance sort/filter/compare; it must not be the only source of a fact.
- Schema is a mirror of the visible content, not an extra hidden claim. Validate it. No `Offer.price` that contradicts the qualified visible premium; for illustrative ranges prefer not emitting a single hard `price`.
- No hidden text, no FAQ-schema spam, no review schema without a real review.

---

## 10. Scorecard & acceptance criteria

**Score: 7.5/10.** Source-of-truth depth and per-fact confidence are already best-in-class (rare and very citable); the gap is purely that this depth is not yet *organized* as answer-first, server-rendered passages, and the `needs-doc`/MetLife items aren't publication-clean yet.

Pass/fail for AI-answerability:
- [ ] Every major page leads with the **Answer Block** (direct answer + key-facts strip + best/weak + next action), server-rendered.
- [ ] Canonical comparison matrix rendered as a real `<table>` with qualifiers + confidence labels surviving to the page.
- [ ] Every plan answers the full intent fan-out via section/FAQ; FAQ is question-phrased with valid, parity-matched `FAQPage`.
- [ ] Treatment pages carry a treatment-fit table and the coverage-starts-vs-eligible distinction.
- [ ] Sources & update log + "Last verified" on every plan page; independent-review framing intact.
- [ ] No fabricated numbers; `needs-doc` rendered as explicit "not yet confirmed"; MetLife `noindex` until verified.
- [ ] No data-drift: one canonical source feeds all surfaces and schema.
- [ ] No `llms.txt`/AEO claims in the build; no thin per-variant pages.

---

## Top 3 recommendations

1. **Standardize the Answer Block as the lead module on every page type**, populated only from the canonical data + the `best for / weak for` verdicts already in `plan-data/*.md`. This is the highest-leverage, lowest-risk AI-answerability win and directly answers the founder's "too basic" fear by foregrounding the depth.
2. **Render the canonical comparison matrix and per-plan spec tables as real, server-rendered HTML tables with qualifiers and confidence tags intact.** Protect the qualifiers — they are what keep CoverCapy citable and honest. Block-publish `needs-doc`/MetLife values until an official document exists.
3. **Drop any AI-specific markup theater.** No "AI schema," no `llms.txt` ranking claims, no content chunking, no thin fan-out pages. Win AI search the only way Google supports it: crawlable, server-rendered, uniquely useful, qualified, source-dated content with consistent entities.

---

## Sources

- Google Search Central — Optimizing your website for generative AI features on Google Search: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central — AI Features and Your Website: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central Blog — Top ways to ensure your content performs well in Google's AI experiences on Search: https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- Google Search Central — General Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search Central — Creating Helpful, Reliable, People-First Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central — Featured snippets: https://developers.google.com/search/docs/appearance/featured-snippets
- Internal: `plan-data/PLAN-DATA-RECONCILIATION.md`, `plan-data/humana-extend-5000.md` (and 7 sibling briefs)
- Internal: `docs/ppo-redesign/_redesign-package/seo/improvements/11-keyword-intent-serp.md`
