# CoverCapy Dental Emergency Knowledge Center — Opus 4.8 Page Build Prompt

Reusable orchestration prompt. Run it once per page. Fill the **PAGE BRIEF** block, then execute.
The orchestrator (you) does not write the whole page alone. You spin up the agent roster below in
parallel, each owning a slice, then you synthesize one production HTML file and run the validation gates.

---

## PAGE BRIEF (fill before running)

- PAGE_SLUG: `/benefit-maxing/guides/dental-emergencies/<slug>/`
- PAGE_TITLE_TOPIC: e.g. "Knocked-out tooth"
- PRIMARY_KEYWORD: e.g. "knocked out tooth what to do"
- SECONDARY_KEYWORDS: 6 to 12 real phrases people and AI assistants actually ask
- RESEARCH_SOURCES: which files in `research/dental-emergency/*.md` feed this page (primary + supporting)
- SIBLING_LINKS: the 3 to 5 most relevant other pages in the cluster to link
- CONVERSION_TARGET: the single best next step for this page (estimator, find a dentist, or Ameritas PrimeStar Complete)
- INTERACTIVE_MODEL: the ONE signature interactive element unique to this page (must differ from other pages)

---

## NON-NEGOTIABLE FOUNDATIONS (apply to every agent's output)

### Skin and palette
- Reuse the root-canals color scheme and tokens exactly (cream `#FDFBF7`, ink `#082A30`, teal `#14525B`,
  gold `#B8924F`, line `#E8E2D8`, Fraunces serif for headings, Inter Tight for body). Reference file:
  `/benefit-maxing/guides/root-canals/index.html`.
- Do NOT clone the root-canals *layout* section for section. Same palette and component DNA, different
  composition. Each page should look like its own chapter, not a copy. Vary the hero, the order of blocks,
  the interactive centerpiece, and the illustration style so the cluster feels rich, not templated.
- Never touch the global header, mega menu, journey stepper pattern, or footer. Keep the
  `#cc-nav-mount` + `#cc-footer-mount` component loader and the three CSS links
  (`mega-nav.css`, `mega-nav-mobile.css`, `footer.css`) exactly as in root-canals.
- Self-contained page: all page CSS in one `<style>`, all page JS inline at the end. No external build.

### Writing rules (binding — from CoverCapy_Writing_Style_Anti_AI_Rules)
- No arrows in visible copy, links, or CTAs (`->`, `→`, `➜`). HTML comment terminators are fine.
- No em dashes as sentence separators. No dramatic hyphen pauses.
- The word "chair" and every "chair time / chairside" phrase is banned.
- Banned words include: seamless, comprehensive, empower, unlock, elevate, revolutionary, leverage,
  frictionless, hassle free, stress free, peace of mind, journey, navigate the complex, make informed
  decisions, one stop shop, world class, game changer, and the rest of the style guide list. Watchlist
  words (clarity, confidence, premium, trusted, easy, simple, best, top, expert) only when specific.
- Ordinary American English. One idea per sentence. Answer first, then the condition, then an example,
  then what to verify. No filler openings ("It is important to note"). No invented stats, quotes, prices,
  ratings, or trust claims. All costs labeled as estimates, never a quote.
- CTAs: direct verb plus object, sentence case, 2 to 5 words, no punctuation, no arrows.
- Medical safety: educational only, not a diagnosis. Direct true emergencies to a dentist or the ER.
  No dosing instructions. No content that could enable medication misuse.

### Verified facts that must stay accurate
- Ameritas PrimeStar Complete (official product guide GR 7708 3-26, eff. 4/1/2026): exams and cleanings
  100%, MAJOR services ~20% in-network from day one stepping to 50% after year one, no waiting period,
  no upper age limit (adults 18 and over, priced by ZIP not age), $2,000 day-one annual maximum growing
  to $3,500, $50 deductible, Ameritas Classic PPO network, earliest effective date as soon as the next
  business day. Always note 20% day-one is partial and a deductible and maximum still apply. Terms vary
  by state; tell readers to confirm with the carrier.
- Avulsed adult tooth: best chance if reimplanted within ~30 to 60 minutes; store in milk, saliva, or
  HBSS, not water; handle by the crown.
- Pain: ADA guidance supports an over the counter anti-inflammatory plus acetaminophen as first line for
  acute dental pain; antibiotics only for spreading or systemic infection, never for pain alone; opioids
  a sparing last resort. Educational framing, no dosing.

---

## AGENT ROSTER AND OWNERSHIP

Spin these up in parallel. Each returns a finished, rule-compliant block plus a 2 to 3 sentence note.
Give every agent the relevant research `.md` file(s) and this foundations section.

1. **Information Architect + Search Intent Analyst**
   Owns: the page outline, the H1 and H2/H3 hierarchy, the entity map, the answer-first "quick answer"
   block, the FAQ question set (the real questions people and AI ask), and the internal link plan to
   siblings, the hub, the estimator, find a dentist, and the Ameritas page. Produces the section order so
   the page does not repeat itself. Kills redundancy before it is written.

2. **Lead Dental / Clinical reviewer** (general dentist + endodontist + oral surgeon lens)
   Owns: what is happening clinically, what to do in the first minutes, what the dentist will likely do,
   the treatment sequence and what follows, and the "what happens next" close of each major section.
   Confirms every clinical claim against the research file. No diagnosis, no promises.

3. **Pain and Pharmacology reviewer** (pain specialist + pharmacist lens)
   Owns: any pain-relief or medication content. First-line vs last-resort framing, antibiotics only for
   infection, the educational disclaimer. No dosing, no misuse pathways.

4. **Health Psychology / Relief writer** (pain psychology + anxiety researcher lens)
   Owns: the calm tone, the "being seen lowers the worry" thread, the behavioral retention hooks
   (small sense of progress, a clear next action, reduced uncertainty), and the language that keeps a
   scared reader moving forward without pressure or fear exploitation.

5. **English major + Magazine editor**
   Owns: sentence-level prose for every block. Makes it flow, makes it warm, makes it easy and pleasant to
   read, and strips every AI tell and banned word. Final language pass before synthesis.

6. **UX / Interaction designer**
   Owns: the page's ONE signature interactive model (must be unique to this page). Examples to choose from,
   never reuse the same one twice: a first-60-minutes countdown guide, a symptom-to-urgency checker, a
   "save my tooth" step sequencer, a swelling self-check, a cost slider (cash vs covered), a pain-ladder
   explainer, a "dentist or ER" decision tree, a healing timeline scrubber, a before-and-after care card.
   Delivers the HTML/CSS/JS for it, lightweight, accessible, reduced-motion safe.

7. **SVG Illustrator + SVG Engineer**
   Owns: 1 to 3 custom inline SVG illustrations with real educational value (anatomy, progression, timeline,
   coverage comparison). Palette-locked, responsive `viewBox`, `role="img"` with descriptive labels.

8. **AI SEO / GEO Architect** (answer engine optimization + schema + entity graph lens)
   Owns: the title tag, meta description, meta keywords, OG and Twitter tags, and the JSON-LD graph
   (WebSite, MedicalWebPage, BreadcrumbList, FAQPage, plus MedicalCondition / MedicalProcedure / HowTo when
   the page warrants it), speakable selectors, and the quotable answer sentences engineered so AI engines
   cite CoverCapy for this question across ChatGPT, Gemini, Google AI Overviews, Perplexity, and others.
   Ensures the visible FAQ text matches the schema text verbatim. Plentiful, specific, never keyword-stuffed.

9. **Conversion designer**
   Owns: CTA placement and copy, the single primary next step per decision point, and the natural tie-ins to
   the estimator, find a dentist, and Ameritas PrimeStar Complete. Helpful first, conversion second. No wall
   of buttons.

10. **Accessibility + Performance engineer**
    Owns: semantic HTML, heading order, aria labels, focus states, color contrast, `prefers-reduced-motion`,
    image alt text, and Core Web Vitals (no heavy assets, no layout shift, inline critical CSS).

11. **QA Editor-in-Chief** (runs last)
    Owns: the final self-audit. Runs the arrow scan, em-dash scan, banned-phrase scan, CTA specificity scan,
    and factual-claim scan. Scores the page 1 to 10 across: clarity, relief, education, interactivity,
    illustration, topical authority, entity coverage, GEO citability, conversion, accessibility. Sends back
    for revision until every category reaches at least 9.8.

---

## PROCESS

1. Read the assigned research `.md` file(s) and this prompt. Do not invent beyond the research.
2. Dispatch the roster in parallel. Each agent returns its block.
3. Synthesize into ONE production HTML file at PAGE_SLUG, using the palette and component DNA but a
   page-specific layout and the page's unique interactive model. No section should duplicate another.
4. Wire internal links to siblings, the hub, the estimator, find a dentist, and Ameritas.
5. Run the validation gates (below). Fix every failure.
6. Run the QA scoring loop until every category is 9.8 or higher.
7. Commit. Report a short build note plus the self-audit table plus "future supporting pages" discovered.

## VALIDATION GATES (must all pass before commit)

- `python3` json.loads on every `application/ld+json` block: valid.
- `node --check` on concatenated inline scripts: valid.
- Arrow scan: zero `→ -> ➜` in visible copy (HTML comment `-->` allowed).
- Em-dash scan: zero.
- Banned-phrase scan: zero matches from the style-guide absolute list.
- Visible FAQ text equals FAQPage schema text, question for question.
- One `<h1>`, logical H2/H3 order, all CTAs rule-compliant.
- Nav and footer mounts present, three component CSS links present.
- Medical disclaimer present. All costs labeled illustrative. Ameritas facts accurate and qualified.

## OUTPUT FORMAT

1. Production HTML at PAGE_SLUG (self-contained).
2. Build note: what the page does and its unique interactive model.
3. The JSON-LD types used.
4. Internal links added.
5. Future supporting pages discovered.
6. Self-audit scoring table with the final scores (all >= 9.8) and the gate results.

---

## CLUSTER PAGE PLAN (build order, one at a time)

| # | Slug | Primary research | Signature interactive model | Conversion target |
|---|---|---|---|---|
| Hub | dental-emergencies | 01, 02, 09, 10 | "What should I do right now" triage | Find a dentist |
| 1 | emergency-dental-insurance | 10, 09 | Cash vs day-one-covered cost slider | Ameritas PrimeStar Complete |
| 2 | knocked-out-tooth | 01, 07 | First-60-minutes save-my-tooth sequencer | Find a dentist |
| 3 | tooth-abscess | 05, 01 | Dentist-or-ER decision tree + swelling self-check | Find a dentist |
| 4 | severe-toothache | 01, 03 | Symptom-to-cause checker | Estimate cost |
| 5 | emergency-dental-exam | 02 | Walkthrough of the visit, step scrubber | Estimate cost |
| 6 | dental-pain-relief | 03 | First-line vs last-resort pain ladder | Find a dentist |
| 7 | emergency-dental-cost | 09 | Procedure cost calculator, cash vs covered | Estimate cost |
| 8 | dental-anxiety | 04, 08 | Calm-down checklist + "being seen" explainer | Find a dentist |
| 9 | cracked-tooth | 01, 07 | Chip vs crack vs deep-crack sorter | Estimate cost |
| 10 | lost-filling-or-crown | 01, 07 | Temporary-fix checklist | Find a dentist |

Each page links up to the hub, sideways to 3 to 5 siblings, and onward to the right conversion tool.
Build them in order. After each page, pause for review before the next.
