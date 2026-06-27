# A5 — Content Depth & E-E-A-T Content Blocks
## SEO Architect 5 of 10 | compare-ppo-dental-plans.html | June 2026

Scope: analysis and literal-copy spec only. No code changes. Premiums are FROZEN. No em-dashes in
any recommended copy. Every slot is grounded in a real line of the live file.

Builds on:
- `docs/ppo-redesign/agents/elite/SEO2-onpage.md` (sections 5.1, 5.2, 5.3, 5.4 named these gaps)
- `docs/ppo-redesign/agents/elite/CONV2-trust.md` (sections 3 and 4 flagged the hollow methodology
  promise and missing premium disclosure)

This memo turns those flagged gaps into literal copy with exact insertion points.

---

## 0. Current state (grounded)

| Element | Current | Line |
|---|---|---|
| Reviewer bar (already de-fabricated) | "Plan facts checked against carrier source documents by the **CoverCapy plan research team**" + `CC` avatar + "Verified June 2026 · Updated quarterly · How we rate plans" | 1022-1029 |
| "How we rate plans" link | `<a href="#methodology" ...>` points to `id="methodology"` on the same `sec-head` (1017). No methodology content exists. Hollow promise. | 1027 -> 1017 |
| Hub-trust line | "Independent, no paid placement · reviewed by dental billing specialists · updated June 2026" — still carries unnamed "dental billing specialists" | 981 |
| Premium illustrative caveat | Lives only inside the server-rendered fallback table `<caption>` (1048). Vanishes for every JS-enabled user. | 1048 |
| `.disclosure` CSS class | Styled (per CONV2 line 101) but never used in markup | (CSS) |
| H1 | "Match a PPO dental plan to the work ahead." (no "compare", no definition follows) | 979 |
| Glossary | 9 crawlable term cards linking to `/dental-insurance-glossary/` | 1245-1255 |

The reviewer fabrication is resolved. The remaining E-E-A-T deficit is content that does not yet
exist: a methodology block, a populated source drawer, a definition block, a PPO-vs-DHMO-vs-discount
disambiguation, and a visible last-updated plus byline tied to schema.

---

## 1. BLOCK A — "What is a PPO dental plan?" definition block

**Why:** The page opens straight into the match tool and assumes the reader already knows what a PPO
is. A plain-English definition wins the definitional / featured-snippet intent and gives the hub a
clean topical opening (SEO2 5.1).

**Slot:** New `<section>` inserted after the SMART MATCH section closes (after line 1008,
before the `<hr class="hr">` on 1010). It becomes the first prose section the crawler reads after
the H1.

**Literal copy:**

> ### What is a PPO dental plan?
>
> A PPO dental plan, short for Preferred Provider Organization, pays a share of your dental care and
> lets you see any licensed dentist you choose. You pay the least when you visit a dentist inside the
> plan's network, because in-network dentists have agreed to discounted fees. You can still go
> out of network and keep coverage, you simply pay a larger share of the bill.
>
> Most PPO plans cover preventive care such as cleanings in full from day one, then cover a share of
> basic work like fillings and major work like crowns and implants, often after a short waiting
> period. The four numbers that decide your real cost are the monthly premium, the annual maximum,
> the deductible and the coinsurance for each tier of care.

**Internal links to bake in:** "in-network" -> `/dental-insurance-glossary/in-network/` (matches
1250); "annual maximum" -> `/dental-insurance-glossary/annual-maximum/` (1246); "deductible" ->
`/dental-insurance-glossary/deductible/` (1248); "coinsurance" ->
`/dental-insurance-glossary/coinsurance/` (1249).

**H2 text for outline:** `What is a PPO dental plan?`

---

## 2. BLOCK B — Real "How we rate plans" methodology block

**Why:** The "How we rate plans" link (1027) and the `id="methodology"` anchor (1017) point at each
other with nothing in between. CONV2 section 3 calls this "the broken promise". This is the single
highest-leverage E-E-A-T addition once the reviewer is fixed: it converts trust *claims* into a
verifiable *method*.

**Slot:** New block inside the COMPARE section, placed directly beneath the reviewer bar (after line
1030, before `cmpNote` on 1031). Move the `id="methodology"` anchor off the `sec-head` (1017) and
onto this new block so the "How we rate plans" link finally lands on real content. Render it
collapsible (a `<details>` element) so it does not push the comparison matrix down for users who do
not want it, but keep the content in static HTML so it is crawlable.

**Literal copy:**

> #### How we rate plans
>
> We score every featured plan against five factors, in this order: how well it covers the treatment
> you need, the waiting period measured against your timing, the annual maximum, the value you keep
> per dollar of premium, and your monthly budget. No carrier pays for a higher score or for
> placement on this page.
>
> Plan facts come from each carrier's own source documents, the plan brochure, the summary of
> benefits and the schedule of benefits. We check each fact against those documents, record the
> document date and the state it applies to, and refresh the data every quarter. When a fact cannot
> be confirmed yet, we mark it "Under review" rather than print a number we have not verified.
>
> Premiums shown are illustrative. Your final price varies by state, age and ZIP code, and is
> confirmed at enrollment. This page is a comparison tool, not the insurance policy.

**Note on the five factors:** these mirror the live planner verdict copy at line ~2213 ("coverage
for your need, waiting period against your timing, annual maximum, value per dollar, and your
budget" per CONV2 line 19-21). Keeping the wording aligned means the methodology block and the
verdict tell one story.

**MetLife consistency:** the "Under review" sentence ties directly to the live static-table rows
showing "Under review" for MetLife basic and major (1058). Do not let any later edit print those
numbers before they are verified (CONV2 section affirms keeping MetLife honestly "Reviewing").

**H3 text for outline:** `How we rate plans` (nested under "Put any plans side by side", 1019).

---

## 3. BLOCK C — Populated per-fact source drawer

**Why:** CONV2 section 3 specifies "a collapsible Source drawer per plan brief that fills the fields
the governance doc already promised". An empty or fake drawer is worse than none. This is the
per-fact sourcing that backs up the methodology block above.

**Slot:** Inside each plan brief modal (the modal mounts at `#modal`, line 1282, content built in
JS). Add a `<details>` "Source" drawer at the foot of each plan brief, populated from fields baked
into the plan JSON (`#plans-data`, 1285 onward). Where a field is not yet known, show the honest
placeholder, never a fabricated value.

**Literal drawer copy (template, per plan):**

> **Source**
> Carrier source document: {document type, e.g. "Summary of benefits"}
> Document date: {month year, or "Requested from carrier"}
> Applies to state: {state, or "National illustrative"}
> Last verified by CoverCapy: {month year}
> Status: {Live} or {Under review}

**For MetLife specifically** (status `gathering-reviews`, 1058), the drawer reads:

> **Source**
> Carrier source document: Requested from carrier
> Document date: Requested from carrier
> Applies to state: National illustrative
> Last verified by CoverCapy: June 2026
> Status: Under review. We will publish basic and major coverage once confirmed.

**Data note:** the four fields (document type, document date, state, status) should be added as
keys on each plan object in `#plans-data` so the drawer is data-driven, not hand-written per modal.
Until those keys exist, render the honest "Requested from carrier" placeholder rather than omitting
the drawer.

---

## 4. BLOCK D — PPO vs DHMO vs discount plan disambiguation

**Why:** The page assumes the PPO decision is already made (SEO2 5.4). A short three-way comparison
captures the upstream "what kind of dental plan do I need" intent and routes confused shoppers into
the PPO content rather than bouncing.

**Slot:** New `<section>` after the COMPARE section closes (after line 1063, before the `<hr>` on
1065), so it sits right after the reader has seen the plans and naturally asks "is PPO even the
right type for me". Render as a crawlable three-column `<table>` plus a one-line verdict.

**Literal copy:**

> ## PPO, DHMO or discount plan: which do you need?
>
> Three things get called "dental plans" and they work very differently. Here is the short version.

| | PPO | DHMO | Discount plan |
|---|---|---|---|
| Choose any dentist | Yes, lowest cost in network | No, assigned to one network dentist | Yes, any participating dentist |
| Pays a share of your bill | Yes | Yes, on a fixed copay schedule | No, it is not insurance |
| Annual maximum | Yes | Usually none | Not applicable |
| Out-of-network care | Covered at a lower share | Usually not covered | Not applicable |
| Best when | You want choice of dentist and coverage for major work | You want the lowest premium and stay with one assigned office | You want a simple cash discount and have no insurance |

> **The short answer:** if you want to keep your own dentist and have real coverage for crowns,
> implants or braces, a PPO is the plan type to compare on this page. A DHMO trades dentist choice
> for a lower premium. A discount plan is not insurance, it only lowers the cash price at
> participating offices.

**Internal link:** "annual maximum" -> `/dental-insurance-glossary/annual-maximum/` (1246).

**H2 text for outline:** `PPO, DHMO or discount plan: which do you need?`

---

## 5. BLOCK E — Visible last-updated and author byline (page-level, schema-backed)

**Why:** SEO2 5.3 calls for a visible, machine-readable last-updated and byline near the H1. The
page has decorative "updated June 2026" text (981) but it is not tied to schema, and the unnamed
"dental billing specialists" on the same line is the soft version of the fabrication CONV2 section
2 flagged.

**Slot:** Replace the hub-trust line at 981. Add schema in the page head.

**Literal replacement for line 981:**

> Independent, no paid placement. Compiled and verified by the CoverCapy plan research team.
> Last updated <time datetime="2026-06">June 2026</time>, refreshed quarterly.

This drops the unnamed "dental billing specialists" claim and aligns the byline with the already
de-fabricated reviewer bar (1026) so the page tells one consistent story (SEO2 section 7,
"acceptable: CoverCapy plan research team").

**Schema to add (head):** a `WebPage` (or `Article`) node with:
- `datePublished` and `dateModified` (set `dateModified` to match the visible "June 2026" so the
  claim is structured, not decorative).
- `author`: an `Organization` node, name "CoverCapy plan research team", `url` to a `/about/` or
  `/methodology/` page. Do not assert a named `Person` reviewer unless a real, credentialed person
  exists (SEO2 2.1, CONV2 section 2).
- If and when a real reviewer is sourced, add `reviewedBy` as a `Person` with a real `jobTitle`,
  `url` and `sameAs`. Until then, organizational authorship only.

---

## 6. FAQ schema check (carry-forward from SEO2 5.5)

The FAQ answers are JS-rendered into `#faqList` (1274), built on load. Confirm a static `FAQPage`
JSON-LD block is inlined in the HTML, or mirror the answers into static markup. JS-only FAQ content
with no static schema risks not being indexed. This is a verification item, not new copy.

---

## 7. Outline after all blocks land

- **H1** Match a PPO dental plan to the work ahead. *(979; SEO2 separately recommends front-loading
  "Compare PPO dental plans" here, see SEO2 section 3)*
  - H2 **What is a PPO dental plan?** *(NEW, Block A, after 1008)*
  - H2 Put any plans side by side *(existing, 1019)*
    - H3 **How we rate plans** *(NEW, Block B, methodology, after 1030)*
    - H3 All plans *(existing, 1034)*
  - H2 **PPO, DHMO or discount plan: which do you need?** *(NEW, Block D, after 1063)*
  - H2 Find a PPO plan by the coverage feature you need *(existing, 1072)*
  - H2 A dentist who takes your plan, near you *(existing, 1086)*
  - H2 The terms that decide your bill *(existing glossary, 1244)*
  - H2 PPO dental insurance, answered *(existing FAQ, 1268)*
- Per-plan **Source drawer** *(NEW, Block C, inside each modal)*
- Page-level **byline and last-updated**, schema-backed *(Block E, replaces 981)*

---

## 8. Guardrails honored

- Premiums frozen: no premium value is changed; Block B and the MetLife drawer explicitly preserve
  the "illustrative, varies by state" caveat and the "Under review" honesty.
- No em-dashes in any copy above.
- No fabricated entities: authorship is organizational ("CoverCapy plan research team"), the source
  drawer uses honest "Requested from carrier" placeholders rather than invented document dates, and
  no named individual reviewer is asserted.
- No fabricated social proof, no countdown timers, no invented numbers.
