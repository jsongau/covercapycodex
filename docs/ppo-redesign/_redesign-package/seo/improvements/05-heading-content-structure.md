# 05 — Heading Hierarchy & On-Page Content Structure

**Scope:** The 8 CoverCapy PPO plan pages + the plans hub. Static, server-rendered HTML built from Supabase `ppo_plans`.

## Current state & audit evidence

- **H1:** exactly 1 per plan page (primary keyword) — correct.
- **H2:** 9 per page, descriptive and benefit-oriented (e.g. "Who {plan} may fit", "What the plan pays", "When each benefit unlocks").
- **H3:** sparse — only 2 per plan page (hub: 1 / 8 / 4 across its sections).
- **Tables:** coverage data sits in real `<table>` elements (good for table snippets).
- **Word count:** ~1,500–1,950 per page — enough depth to support passage ranking.

Headings are strong and descriptive; the weakness is **depth and snippet-targeting**, not labeling.

## Score

**Current: 8.5/10 → Target: 9.5/10.**

## Why it matters

- **Semantic outline:** Google builds a document outline from H1→H2→H3. Dense H2s with no H3 children flatten distinct specs (preventive vs. major vs. ortho) into one undifferentiated block, weakening passage-level relevance.
- **Passage / snippet ranking:** Google ranks individual passages. An answer-first sentence under an H2, or an H3 that names one benefit, is independently liftable into a featured snippet.
- **"People Also Ask":** PAA boxes match natural-language **question** headings. Today's headings are statements, so they rarely win these.
- **AI extraction:** LLM answer engines extract per-fact. A flat H2 forces them to parse prose; an H3 (or `<dt>`) per spec gives one clean, attributable fact each.
- **Accessibility:** logical, unskipped nesting improves screen-reader navigation and is a ranking-adjacent quality signal.

## Specific fixes

1. **Add an H3 layer under dense H2s.** Under "What the plan pays" (Coverage), break out `Preventive`, `Basic`, `Major`, `Implants`, `Orthodontics` as H3 (or `<dt>`/`<dd>` definition pairs) so each percentage is independently extractable. Under "Limitations / exclusions", give each clause its own H3 or list item.
2. **Make at least one heading a natural-language question** that mirrors PAA, tied to the visible FAQ section — e.g. "Does {plan} cover implants?", "How long is the waiting period for major work?", "Is there an annual maximum?". Match the FAQ question text exactly so the on-page answer and the heading reinforce each other.
3. **Keep a single H1 = primary keyword** (already true — do not regress this when adding sections).
4. **Keep tables for the coverage grid** (eligible for table snippets) **and add a concise answer-first sentence** under each key H2 — a 1–2 sentence definition/summary Google can lift verbatim. Example under Coverage: "{Plan} pays 100% for preventive care, 80% for basic, and 50% for major services after waiting periods."
5. **Keep headings descriptive and keyword-relevant** — avoid vague labels ("Details", "More info"). Fold the plan name + service into the heading.
6. **Logical nesting, no skipped levels** — never jump H2→H4. Every H3 must sit under an H2.
7. **Add a TL;DR / "Key facts" list near the top** (below H1, above the fold) — a short bulleted summary of premium tier, annual max, waiting periods, and standout benefit. Bulleted key-fact lists are highly snippet-eligible.

### Recommended heading outline (per plan page)

```
H1  {Plan name} PPO Dental Plan — Coverage, Costs & Waiting Periods   [primary keyword]
    Key facts (TL;DR bullet list — annual max, waiting periods, network, premium tier)
H2  Who {plan} may fit
H2  What {plan} pays                                  [answer-first sentence + coverage <table>]
    H3  Preventive care coverage
    H3  Basic services coverage
    H3  Major services coverage
    H3  Implant coverage
    H3  Orthodontic coverage
H2  When each benefit unlocks (waiting periods)        [answer-first sentence]
    H3  Preventive waiting period
    H3  Basic waiting period
    H3  Major / implant waiting period
H2  Annual maximum & deductible
H2  Network & provider access
H2  Limitations & exclusions
    H3  (one per material exclusion clause)
H2  How {plan} compares
H2  Frequently asked questions
    H3  Does {plan} cover implants?                    [question heading → PAA]
    H3  How long is the waiting period for major work?
    H3  Is there an annual maximum?
H2  How to enroll
```

## Implementation notes

- Generate H3 labels, answer-first sentences, the Key-facts list, and FAQ Q&A **programmatically from `ppo_plans` fields** (coverage percentages, waiting-period months, annual max, deductible, network type) in the same render template — no per-page hand-editing.
- Enforce **exactly one H1** in the layout template; section components emit H2/H3 only.
- Reuse FAQ question strings as the H3 text so heading and answer stay in sync.
- Validate nesting in the build/CI step (fail on skipped heading levels or >1 H1).

## Priority & effort

- **Priority: P2.** Pages already score well (8.5); this is an optimization to capture snippets/PAA, not a fix for a broken state.
- **Effort: Medium.** Mostly template work (add H3/`<dt>` loop under coverage, answer-first sentence slots, Key-facts block, question-form FAQ headings). One template change propagates to all 8 pages + hub. No data migration required.

## Acceptance criteria

- [ ] Each plan page still has **exactly one H1** = the primary keyword.
- [ ] Coverage H2 has **H3 (or `<dt>`) children** for Preventive, Basic, Major, Implants, Orthodontics.
- [ ] Limitations/exclusions H2 has one H3/list item **per clause**.
- [ ] At least **3 question-form headings** matching PAA, each tied to the visible FAQ answer.
- [ ] A concise **answer-first sentence** appears directly under each key H2 (Coverage, Waiting periods, Annual max).
- [ ] A **Key-facts / TL;DR bullet list** is present near the top (below H1).
- [ ] **No skipped heading levels** (no H2→H4) — validated in CI.
- [ ] Coverage data **remains in real `<table>` elements**.
- [ ] All headings, answer sentences, and FAQ content are **generated from `ppo_plans` fields**, not hand-keyed.
