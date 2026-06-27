# Agent H8 — Main-Hub Content & Answer Architecture

**Page:** `/compare-ppo-dental-plans/` (the comparison-tool hub; pillar `/dental-insurance/ppo-plans/` stays separate per Synthesis Option B — do NOT 301 this URL)
**Mandate:** answer-first (win AI Overviews + featured snippets), carry the comparison instrument, short-glossary module, by-treatment / by-timing browse, methodology/independence, and a PAA-shaped FAQ. Output must be **not worse** than the ZIP (3,537 words, answer-first lead + real `<table>` + 4-pillar methodology + PAA FAQ) **or** the live page (emergency-aware Smart Match, `valueFrame()` cash-vs-premium math, one-match-plus-honest-backup, 3-layer glossary tooltips, named-reviewer trust). Premiums illustrative ("from $X · est."), never frozen single numbers. T5/theme: Jade default, Gold toggle preserved.

---

## SUMMARY (~150 words)

The win is a merge, not a swap: the **ZIP's answer-first discipline** (lead one-sentence answer, real machine-readable comparison `<table>`, 4-pillar methodology, PAA-phrased FAQ) bolted onto the **live page's action engine** (emergency-aware Smart Match, `valueFrame()` cash-vs-premium payoff, one-match-plus-backup, 3-layer glossary tooltips with "why it matters," named reviewer). Neither source has both. The live page is rich but its plan facts and schema are **JS-only / invisible in View Source** — Agent 18's hard rule is server-rendered HTML, so the comparison table must ship as static HTML that JS only enhances. The ZIP nails answerability but lacks the Smart Match instrument and cash-math. This outline leads with an **Answer Block** (direct sentence + key-fact strip + best-spec-≠-best-plan caveat), keeps Smart Match as a lens beneath it, renders the canonical 8-plan matrix as a real `<table>` with in-cell qualifiers, preserves the glossary/playbook/learn modules, and ships a PAA FAQ with parity-matched `FAQPage` schema. Nothing from either source is dropped.

---

## SECTION-BY-SECTION OUTLINE

Legend: **[LIVE]** = preserve from current `compare-ppo-dental-plans.html` · **[ZIP]** = adopt from `_redesign-package/` · **[ADD]** = net-new to beat both · all numbers **illustrative**.

### 0. Trust/freshness strip + breadcrumb — **[ZIP]**
- Breadcrumb: CoverCapy / Dental Insurance / PPO Plans / Compare.
- Byline line: "Maintained by the CoverCapy Plan Research desk · Last reviewed June 2026 · How we research plans · Suggest a correction."
- Independence pill: "Independent · no carrier pays for placement."
- *Source:* ZIP has this above the fold; live page buries equivalent ("reviewed by dental billing specialists") in `.hub-trust`. **Beat both:** keep ZIP's dated, named-desk freshness line (RAG favors currency) AND keep live's named human reviewer (Sarah Chen, licensed consultant) in the compare section.

### 1. LEAD ANSWER BLOCK — **[ADD]** (Agent 18 pattern; neither source leads cleanly with this)
Server-rendered, immediately after breadcrumb, before Smart Match / hero storytelling.

1. **One-sentence direct answer (≤30 words, plain `<p>`):**
   > "Compare PPO dental plans on four levers that decide your bill: what each category covers, how long you wait before it pays, the coinsurance percentage, and the annual maximum."
2. **Key-fact strip (definition list / small table, 5–6 facts, each with inline qualifier):**
   | Fact | Value (illustrative — varies by state/ZIP/age) |
   |---|---|
   | Plans tracked | 8 individual PPO plans |
   | Premiums from | ~$30–$100 / mo · est. |
   | Annual maximums | $1,000 → $10,000 |
   | Fastest coverage start | next business day (no-wait plans) |
   | Cheapest on shelf | UnitedHealthcare Primary Dental (~$30/mo, ages ≤64) |
   | Highest reviewed max | Mutual of Omaha & Humana ($5,000) |
3. **Best-spec ≠ best-plan caveat (the citable honesty line):** "A 'best price' or 'highest max' token marks the best spec in that column — the best spec is not the best plan for you. The right plan depends on the work you need, when you need it, and whether your dentist is in-network." *[ZIP]*
4. **One descriptive next action:** "Verify your exact plan free for your ZIP" + "Jump to the comparison table."

*Why it beats both:* lifts the ZIP's verbatim caveat into a position a model can quote without scrolling; gives AI Overviews a self-contained, qualified passage the live page never exposed.

### 2. SMART MATCH instrument (the comparison "lens") — **[LIVE]**
- Emergency-aware goal grid (Cleaning / Fillings / Crown-RCT / Implant / Whitening / Braces / Dentures / Emergency), timeline chips (Need now / Can wait / Planning — auto-locked to "now" for Emergency), budget slider.
- **`valueFrame()` cash-vs-premium math** — "Plan covers $X toward a typical {treatment}; after a $Y/yr premium you keep $Z vs paying cash." The ZIP has **no equivalent** — this is the single biggest live-page asset; it MUST survive (Synthesis line 42).
- One closest-fit card + one honest backup with cautions (age caps, waits).
- *Beat both:* keep as a **lens beneath the answer block**, not the page lead — Smart Match is JS-interactive (not citable), so it can't be the answer-first surface, but it's the conversion engine no other source has.

### 3. COMPARISON INSTRUMENT — the canonical 8-plan matrix — **[ZIP framing + LIVE pin tray]**
- **Render as ONE real server-rendered `<table>`** with `<thead>`/`<th scope>` — Agent 18 non-negotiable. Live page builds this in JS (invisible in View Source) → **must change to static HTML, JS enhances sort/filter/pin only.**
- Columns: Plan · From $/mo (est.) · Annual max · Basic · Major · Implants · Coverage starts · Pin.
- Coverage cells read by **color + text** (green covered / amber partial / grey not covered) — accessibility + machine legibility.
- **Every varying cell carries its qualifier in-cell:** "$2,000 →$3,500 yr 2", "20% day one", "est.", "Under review" for MetLife (stays gathering-reviews; non-preventive not marked best in any column; `noindex` until verified per Agent 18).
- Sort (premium / annual max / value / coverage / waits) + filters (covers implants / no waiting period / covers ortho / under $75) — **[LIVE]** sortbar + **[ZIP]** filter chips merged.
- **Pin 2–4 plans to a side-by-side tray** **[LIVE]** — they pin to top, specs stay while scrolling.
- Caption restating the best-spec-≠-best-plan caveat below the table.

### 4. PLAN CARDS — "the eight plans, card by card" — **[ZIP]**
- One card per plan: five-stop coverage strip (Prev / Basic / Major / Impl / Ortho) + a **"Best for…" one-liner** lifted from the `best` field (e.g. Guardian = "families — 85% basic from day one, child ortho and whitening, $3,000 max").
- Live + "Gathering reviews" split (MetLife listed, not promoted).
- *Beat both:* ZIP cards already strong; add live's per-card "Verify free" + "Open plan brief" CTAs and the carrier-dentist link.

### 5. BY FEATURE — coverage-feature browse — **[LIVE]**
- "Find a PPO plan by the coverage feature you need" — feature table / mobile cards (implants, no-wait, high max, ortho, vision bundle). Keep; it's a fan-out surface ("best dental insurance for implants").

### 6. BY TREATMENT — procedure browse — **[LIVE `#treatment`] + [ADD Agent 18 treatment-fit framing]**
- Mini-cards per procedure (cleaning, filling, crown/RCT, implant, whitening, braces, dentures, emergency) that **preset the Smart Match**.
- **[ADD]** per-treatment answer-first line + the **"coverage starts vs this tier becomes eligible" distinction** (Agent 18 §6 — wins snippets and is widely misunderstood). E.g. implants: "the lever is the implant coinsurance tier, the waiting period and the sub-limit/missing-tooth clause — not the headline premium."
- Link to matching plan spokes + glossary terms; do **not** spin thin per-procedure-per-carrier pages.

### 7. BY TIMING / SITUATION — life-event + urgency browse — **[LIVE `#situation`]**
- "Start where life put you" cards (between jobs, self-employed, need coverage now, planning ahead, family) that preset the match.
- Maps to timing fan-out ("dental insurance no waiting period," "immediate coverage," "between jobs") that the dental-insurance hub nav already links.

### 8. SHORT-GLOSSARY MODULE — "the words that decide your bill" — **[LIVE 3-layer tooltips]**
**Copy pattern (per term) — the 3-layer structure MUST survive (Synthesis line 62 warns `glossary.json` regressed by dropping "why it matters"):**
1. **Term** (e.g. "Annual maximum")
2. **Plain definition** — "the most a plan will pay toward your dental care in one plan year; after that, you pay the rest."
3. **✦ Why it matters** — "a high cap only helps if you actually have enough covered treatment to use it."
4. **→ Full-guide link** (to the 24-page glossary cluster).
- Dotted-underline `cc-tip` tooltips appear inline anywhere a term is used page-wide (hover/tap).
- *Beat both:* ZIP only links out to a glossary; the live 3-layer "definition + why + link" tooltip is richer and inline — keep it, regenerate `glossary.json` with the `why` field restored so tooltips don't ship worse than today.

### 9. BUYER'S PLAYBOOK — **[LIVE `#playbook`]**
- "Five mistakes that cost money" + "Six questions before you buy." Pure answer-first list content, snippet-friendly. Keep.

### 10. METHODOLOGY / INDEPENDENCE block — **[ZIP 4-pillar]**
Four labeled pillars (verbatim-grade copy from ZIP):
1. **Independent by design** — no carrier pays for placement, ranking or inclusion; "review" = breakdown, never endorsement; membership tiers are disclosed paid participation, not clinical ratings.
2. **Source-backed facts** — every fact carries source URL, document date, state/market, retrieval date, reviewer status; unverified figures flagged "needs verification" (`needs-doc` → "not yet confirmed — we verify before you enroll," never a guessed value).
3. **State & ZIP awareness** — no national price shown as if universal; pricing/availability confirmed for your ZIP at a free eligibility check.
4. **Freshness & corrections** — last-reviewed date + update log + scheduled re-review + corrections link.
- Plus link row: "How we research & verify →", "Affiliate & disclosure →", "Suggest a correction →".
- **[LIVE]** named-reviewer bar (Sarah Chen, licensed consultant, "Verified June 2026 · Updated quarterly") sits with the compare table.
- **[LIVE]** credibility stat strip (8 carriers · 56 coverage checks · 0 paid placements · 6,400+ dentists indexed).
- YMYL disclaimer: "CoverCapy is an independent educational marketplace and concierge layer — not an insurer, carrier, dentist, tax or medical adviser. Nothing here confirms a treatment is covered…"

### 11. FIND-A-DENTIST handoff — **[LIVE]**
- Search by city/ZIP → verify the office takes your plan or nominate one. Member ID **never stored**. This is the conversion bridge to the T5 jade dentist pages.

### 12. LEARN / GUIDES — **[LIVE `#learn`]**
- "Guides that answer the real question" article grid → links the cluster (PPO vs HMO, no-waiting-period, between-jobs, self-employed, immediate coverage). Satisfies fan-out via depth + links, not thin pages.

### 13. FAQ — PAA-shaped — **[ZIP questions + LIVE reading-room UI]**
- Natural-question headings, answers ≤ snippet length, **valid `FAQPage` schema matching visible Q&A** (parity is a hard rule). Use the live "reading room" accordion shell (categories rail + open-all).
- *Beat both:* ZIP has 4 strong PAA questions; live has a richer UI but generic Qs. Merge: ZIP's questions in live's reading-room.

---

## FAQ SET (natural questions for PAA + `FAQPage`)

1. **How do I compare PPO dental plans?** — Compare on four levers: what each category covers (preventive/basic/major/implants/ortho), how long you wait before it pays, the coinsurance percentage, and the annual maximum. Sort and filter the table, pin 2–4 head-to-head, then verify your exact plan free for your ZIP. *[ZIP]*
2. **Which PPO dental plan has the highest annual maximum?** — MetLife NCD Complete shows the highest (~$10,000) but is still gathering reviews. Among fully-reviewed plans, Mutual of Omaha and Humana Extend 5000 both list $5,000. A higher cap only helps if you have enough covered treatment to use it. *[ZIP]*
3. **Which PPO dental plans cover implants?** — Ameritas (20% day one), Delta (50% after 12-mo wait), Mutual of Omaha (50% after 12 mo) and Humana (50% after 6 mo). Implant benefits usually carry a missing-tooth clause — verify your specific policy. *[ZIP + ADD missing-tooth flag per Agent 18]*
4. **How do I check my exact price for a PPO dental plan?** — The premiums shown are illustrative shelf snapshots, not quotes. Your real price depends on state, ZIP, age, household and effective date. Enter your ZIP or start a free eligibility check. *[ZIP]*
5. **What's the difference between "coverage starts" and when a treatment is covered?** — Your plan can be active (you're paying premiums) while a specific tier — like major work or implants — is still inside its waiting period. "Coverage starts" is the effective date; the treatment tier becomes eligible only after its own wait. *[ADD — Agent 18 §6, high-snippet-value]*
6. **Is a PPO dental plan worth it if I only need cleanings?** — If preventive care is all you need, the cheapest plan with 100% preventive from day one (e.g. ~$30/mo UnitedHealthcare, ages ≤64) usually wins; you don't pay for major coverage you won't use. *[ADD — maps Smart Match preventive verdict to a snippet]*
7. **Does CoverCapy get paid by the insurance carriers?** — No carrier pays for placement, ranking or inclusion. CoverCapy is paid by dental offices in its network, not by which plan you choose; "review" means an objective breakdown, not an endorsement. *[LIVE + ZIP independence]*

---

## TOP 3 RECOMMENDATIONS

1. **Lead with the Answer Block, server-rendered — and make the comparison matrix real HTML.** The live page's biggest AI-search liability is that plan facts and JSON-LD are JS-only (invisible in View Source). Ship the one-sentence answer + key-fact strip + best-spec-≠-best-plan caveat + the 8-plan `<table>` as static HTML with in-cell qualifiers; let JS only enhance sort/filter/pin. This alone moves the AI-answerability score and directly answers the "too basic / worse than current" fear by foregrounding existing depth.

2. **Preserve the live action engine intact as a lens beneath the answer block.** Emergency-aware Smart Match, `valueFrame()` cash-vs-premium math, one-match-plus-honest-backup, and the 3-layer glossary tooltips ("why it matters" included) are assets the ZIP has no equivalent for. Regenerate `glossary.json` with the `why` field restored so tooltips don't regress. Losing any of these makes the page worse than today.

3. **Adopt the ZIP's honesty/qualifier discipline everywhere and merge the FAQ.** Keep illustrative "from $X · est." premiums with per-cell qualifiers (never frozen single numbers, YMYL-safe), the 4-pillar methodology, the named reviewer + dated freshness line, MetLife "gathering reviews / noindex," and the `needs-doc` → "not yet confirmed" rule. Combine the ZIP's PAA-phrased questions with the live reading-room UI and the two ADD questions (coverage-starts-vs-eligible, preventive-only) for parity-matched `FAQPage` schema.
