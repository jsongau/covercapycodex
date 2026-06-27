# Agent 14 — Hub-and-Spoke SEO Architect

**Scope:** Page purpose & intent map, canonical ownership, the full internal-link graph (hub ↔ spoke ↔ carrier ↔ treatment ↔ timing ↔ glossary), orphan/cannibalization prevention, anchor-text patterns, breadcrumb hierarchy, URL families, and carrier/plan entities.
**Builds on (does not repeat):** `seo/00-seo-scorecard.md`, `seo/improvements/02-url-canonicalization.md`, `07-internal-linking-architecture.md`, `11-keyword-intent-serp.md`, `06-structured-data-schema.md`, `01-indexability-crawlability.md`. Those docs solve the *plan-page cluster*. This memo solves the **system-level architecture above them** — the two-hub conflict, the intent map across page *types*, and the link matrix the package has not yet specified for treatment/timing/life-situation/carrier-hub nodes.

**Score: 6.5 / 10** for the architecture *as it stands today* (two live hubs competing, most cluster nodes still unbuilt). The *plan-spoke cluster on its own* is an 8.5 (per the package). The gap is the connective tissue and a resolved hub topology.

---

## 1. The lens: what the current pages + ZIP already win — and must NOT lose

The founder's two fears ("too basic / worse than current" and "lose SEO dominance") are the same fear in SEO terms: **do not throw away earned equity while chasing a cleaner architecture.** Concretely, the following are already strong and are non-negotiable to preserve:

- **Server-rendered plan facts in View Source** (scorecard #01). This is the single biggest moat over competitors who client-fetch from a DB. The redesign's render-from-DB plan must stay SSR/ISR or static — never a client `useEffect`. *Losing this = losing the dominance.*
- **Dense bidirectional internal mesh** — 38–63 links/page, breadcrumbs, alternatives rails (doc 07). Competitors run isolated affiliate pages; CoverCapy's mesh is a topical-authority signal they don't have.
- **The live `/compare-ppo-dental-plans/` page's equity** — it is the page that currently ranks, carries inbound links, and owns the "compare PPO dental plans" transactional intent. It has a clean canonical, BreadcrumbList, "independent" framing, Smart Match, glossary ties, and dentist-verification pathways. **This URL must not be silently demoted or 302'd into oblivion.**
- **Independent-by-design framing** + treatment-first Smart Match + glossary tooltips. These are E-E-A-T and engagement signals AI answer engines reward. Keep them in the merged system.
- **Branded-review intent coverage** on spokes (`{Carrier} {Plan} Review 2026…`) and PAA-shaped FAQ (doc 11). Already competitive — preserve verbatim.

What must be **added** to outrank competitors (the rest of this memo): a single resolved hub topology, the cluster nodes that don't exist yet (treatment/timing/life-situation/carrier-eval/carrier-hub), the cross-type link matrix, anchor discipline across types, and the cannibalization firewall between "no wait / starts today / immediate coverage."

---

## 2. THE central decision — canonical ownership of the hub (two hubs now exist)

This is the highest-stakes SEO issue in the whole redesign and it is **not** resolved by any existing package doc. Two live, indexable pages now claim hub status:

| URL | Title (today) | Intent it actually serves | Equity |
|---|---|---|---|
| `/compare-ppo-dental-plans/` | "Compare every PPO dental plan in one independent place." | **Comparison / transactional** — "compare PPO dental plans" | The page that ranks today; inbound links; brand recall |
| `/dental-insurance/ppo-plans/` | "Explore individual PPO dental plans" | **Category / pillar** — "best dental PPO plans", carrier index | New; the canonical the 8 spokes' breadcrumbs already point to |

The Master Prompt offers Options A/B/C. **Recommendation: Option B (with a strict intent split), not a merge, not a redirect-yet.**

- **`/dental-insurance/ppo-plans/` = canonical PILLAR / category hub.** Owns `best dental PPO plans`, `dental PPO plans`, the carrier index, and is the breadcrumb root the 8 spokes already declare. It is the topical center of gravity and the parent in the URL family.
- **`/compare-ppo-dental-plans/` = canonical COMPARISON tool/spoke.** Owns the distinct transactional intent `compare PPO dental plans [side by side]`. It is a **first-class spoke of the pillar**, not a competitor to it. Keep its equity; re-point it *up* to the pillar via breadcrumb + a prominent "see all plans" link, and have the pillar link *down* to it as "the comparison tool."
- **Do NOT 301 the compare URL into the pillar.** That throws away the one page with proven rankings to feed a brand-new URL — exactly the "lose dominance" failure mode. Two URLs are fine **because their intents are genuinely different** (compare-tool vs. category-pillar). The risk is not duplication; it is **leaving them un-differentiated.** Differentiate the titles, H1s, and first paragraphs so neither cannibalizes the other (see §6).
- **Trigger to revisit (future Option C):** only if Search Console shows the two URLs swapping/competing for the *same* query set after 60–90 days of differentiation. Then consolidate with a single 301 + canonical, never before.

> **Action requiring user approval:** confirm Option B and the intent split before any URL/redirect work. This blocks the IA/redirect rollout phase.

---

## 3. URL families & canonical ownership (the entity tree)

One nested, trailing-slash family (doc 02 already commits the plan layer; this extends it to every node type):

```
/dental-insurance/                                  ← grandparent category hub (verify exists)
  /ppo-plans/                                        ← PILLAR (canonical category hub)        [owns: best dental PPO plans]
    /{carrier}/                                      ← CARRIER HUB (e.g. /guardian/)          [owns: {carrier} dental insurance plans]
      /{plan}/                                       ← PLAN SPOKE (money page)                 [owns: {carrier} {plan} review]
/compare-ppo-dental-plans/                           ← COMPARISON TOOL spoke                   [owns: compare PPO dental plans]
/dental-insurance/no-waiting-period/                 ← TIMING node                             [owns: no waiting period]
/dental-insurance/starts-today/  (or merge → above) ← TIMING node — CANNIBAL RISK, see §5
/dental-insurance/immediate-coverage/                ← TIMING node — CANNIBAL RISK, see §5
/dental-insurance/for-implants/  /-crowns/ /-braces/ ← TREATMENT nodes                         [owns: dental insurance for implants]
/dental-insurance/self-employed/ /between-jobs/      ← LIFE-SITUATION nodes
/is-{carrier}-good-insurance/  (or under carrier hub)← CARRIER-EVAL node                       [owns: is {carrier} good]
/dental-insurance/glossary/{term}/                   ← GLOSSARY nodes
```

**Canonical ownership rule:** exactly one URL owns each head intent (§6 table). The carrier hub (`/{carrier}/`) is a real, non-thin page — it owns the *carrier-level* intent and is distinct from the *carrier-eval* "is X good" node (review intent) and from individual *plan* spokes (SKU intent). Three different intents, three different URLs, zero overlap.

> **Note vs. doc 02:** doc 02 lists carrier paths only as a place plan spokes nest under. This memo elevates `/{carrier}/` to a **first-class indexable carrier hub** with its own owned intent — without that, the `/ppo-plans/{carrier}/{plan}/` nesting implies a directory that returns nothing, which Google treats as a soft gap and competitors will outflank with branded carrier pages.

---

## 4. Page purpose & search-intent map (by page type)

| Page type | Primary intent | Search shape | Unique job no other type may duplicate |
|---|---|---|---|
| Pillar hub | Category navigation | best/dental PPO plans, dental PPO marketplace | Inventory + routing; sends equity DOWN to spokes |
| Comparison tool | Transactional compare | compare PPO dental plans, X vs Y | Interactive side-by-side; the *act* of comparing |
| Carrier hub | Carrier-level overview | {carrier} dental insurance / plans | All of one carrier's SKUs + network + states in one place |
| Carrier-eval | Carrier review/opinion | is {carrier} good dental insurance, {carrier} reviews | Editorial verdict on the *carrier*, not a single plan |
| Plan spoke | Branded SKU review | {carrier} {plan} review 2026 | The money page; one plan, full spec + verify CTA |
| Treatment node | Coverage for a procedure | dental insurance for implants/crowns/braces | Procedure-first framing → routes to plans that qualify |
| Timing node | Activation/waiting intent | no waiting period / immediate (see §5) | When coverage/tier becomes usable |
| Life-situation | Buyer context | self-employed / between jobs dental insurance | Persona-first framing → routes to fitting plans |
| Glossary term | Definitional | what is an annual maximum | One concept, defined; links INTO plans/treatments |

**The answer-architecture rule (AI/SERP dominance lever):** every node type opens with an **answer-first sentence** + a **scannable table**, and names its entities explicitly (carrier, network, procedure, plan feature). This is the same discipline that wins featured snippets and AI-Overview citations (doc 11) — applied to *all* node types, not just plan spokes.

---

## 5. Cannibalization firewall — "no wait" vs "starts today" vs "immediate coverage"

These three phrases are near-synonyms and will cannibalize each other if each gets a full page. **Recommendation: ONE canonical timing page, two supporting angles — do not build three competing pillars.**

- **Canonical owner:** `/dental-insurance/no-waiting-period/` — owns *all three* head terms (`no waiting period`, `dental insurance that starts today`, `immediate dental coverage`). These resolve to the same user need: "I need usable coverage now." Cover all three phrasings *within* this one page as H2/answer blocks and FAQ questions — capturing the query variants without splitting equity.
- **Distinct intent worth its own URL:** only `/dental-insurance/major-work-now/` (implant/crown/root-canal-this-month) is a *genuinely different* intent — it's treatment-urgency, not activation-timing. It links to the no-waiting page but owns "major dental work without waiting."
- **The critical content distinction CoverCapy must own (and competitors blur):** *effective date* (coverage starts Day 1) ≠ *waiting period* (a specific tier becomes eligible). The page that explains this precisely, with a table per plan, becomes the citable source. This is an **E-E-A-T differentiation moat**, not just an SEO tactic.
- If business later wants separate "starts today" / "immediate" landing pages for paid or distinct editorial angles, they must **canonical to the no-waiting page** or carry materially different content + their own owned long-tail — never three self-canonical near-duplicates.

> Same firewall applies to: `compare PPO plans` (compare tool) vs `best PPO plans` (pillar) — kept distinct in §2/§6.

---

## 6. One-intent-per-URL ownership table (the anti-cannibalization contract)

| Head intent | Canonical owner | Pages that must NOT target it |
|---|---|---|
| best dental PPO plans / PPO marketplace | Pillar `/ppo-plans/` | compare tool, carrier hubs |
| compare PPO dental plans (side by side) | Compare tool `/compare-ppo-dental-plans/` | pillar |
| {carrier} dental insurance / plans | Carrier hub `/{carrier}/` | plan spokes, carrier-eval |
| is {carrier} good / {carrier} reviews | Carrier-eval `/is-{carrier}-…/` | plan spokes, carrier hub |
| {carrier} {plan} review 2026 | Plan spoke | carrier hub, carrier-eval |
| dental insurance for implants | Implants treatment node | plan spokes (they *link* here, don't target it) |
| no waiting / starts today / immediate | No-waiting timing node (one page) | all other timing variants |
| self-employed / between-jobs dental | Each life-situation node | pillar, timing |
| {glossary term} | Glossary term page | everything else |

Enforce via title + H1 + first-paragraph differentiation. Add a build-time check: no two indexable pages may share the same primary `<title>` head term.

---

## 7. The internal-link matrix (required inbound/outbound per page type)

Doc 07 specifies the *plan-page* cluster. This is the **full cross-type matrix** including the node types doc 07 doesn't cover (carrier hub, timing, life-situation, pillar, compare tool). "→" = required outbound; reciprocity column = the required inbound half (orphan prevention).

| FROM ↓ \ TO → | Pillar | Compare tool | Carrier hub | Carrier-eval | Plan spoke | Treatment | Timing | Life-situation | Glossary |
|---|---|---|---|---|---|---|---|---|---|
| **Pillar** | — | ✔ "comparison tool" | ✔ each carrier | ✔ | ✔ all 8 | ✔ all | ✔ | ✔ | ✔ preview |
| **Compare tool** | ✔ "all plans" | — | ✔ via tray | — | ✔ each in matrix | ✔ relevant | ✔ no-wait | — | ✔ tooltips |
| **Carrier hub** | ✔ breadcrumb | ✔ | — siblings | ✔ own eval | ✔ own plans | ✔ best-fit | ✔ if 0-wait | — | ✔ |
| **Carrier-eval** | ✔ | ✔ | ✔ that carrier | — | ✔ carrier's plans | — | — | — | ✔ |
| **Plan spoke** | ✔ "all PPO plans" | ✔ pairwise | ✔ own carrier hub | ✔ own carrier-eval | siblings + same-carrier | qualifying | relevant (0-wait→timing) | relevant | in-prose terms |
| **Treatment** | ✔ | ✔ | — | — | ✔ qualifying plans | related guides | — | — | ✔ |
| **Timing** | ✔ | ✔ | — | — | ✔ fitting plans | — | — | — | ✔ effective-date/waiting |
| **Life-situation** | ✔ | ✔ | — | — | ✔ fitting plans | ✔ | ✔ | — | ✔ |
| **Glossary** | ✔ | — | — | — | — | ✔ contextual | ✔ (waiting/effective date) | — | cross-terms |

**Reciprocity = orphan prevention.** Every edge that points *to* a node must have its return half rendered on the target (the plan ↔ treatment bidirectionality doc 07 mandates, extended to timing/life-situation/carrier-hub). Generate the whole mesh from `ppo_plans` + a static `node-map` (treatment/timing/life-situation → qualifying field + threshold) so edges are data-driven and self-healing — no node can be orphaned because every node renders its inbound list from the same source.

**Equity-flow rule:** PageRank must flow *toward* plan spokes (the verification money pages). Pillar, treatment, timing, life-situation, carrier-eval all funnel down into spokes; spokes link back up but the net flow is inward. The compare tool is both a destination (transactional) and a distributor (links to every plan in the matrix).

---

## 8. Anchor-text patterns (descriptive, varied, by edge type)

Doc 07 covers plan-page anchors. Extending the discipline to the new node types, and codifying the rotation rule:

| Edge | Anchor pattern pool (rotate; never identical twice cross-page) |
|---|---|
| Pillar → carrier hub | "Guardian dental insurance plans", "all Guardian PPO plans", "Guardian's PPO lineup" |
| Pillar → compare tool | "compare all PPO plans side by side", "the PPO comparison tool" |
| Carrier hub → plan spoke | "Guardian Premier 2.0 plan details", "see the Premier 2.0 spec sheet" |
| Plan spoke → carrier hub | "more Guardian PPO plans", "all plans from Guardian" |
| Timing → plan spoke | "PPO plans with no waiting period", "plans usable from day one" |
| Treatment → plan spoke | "plans that cover implants", "best implant-coverage PPO" |
| Life-situation → plan | "PPO plans for the self-employed", "coverage between jobs" |
| Glossary → plan/treatment (in-prose) | "how the annual maximum caps your benefit", "what counts as a major service" |
| Spoke → glossary (in-prose) | "what an annual maximum means", "how PPO deductibles work" |

Rules: **never** "click here / learn more / read more"; store an anchor-variant pool per target and rotate at render so the same target isn't hit with identical anchor text across the site (over-optimized exact-match anchors are a footprint risk). 2–4 of these per page must be **in-prose contextual** (doc 07), not just module rails.

---

## 9. Breadcrumb hierarchy (visible + BreadcrumbList schema, must match canonical)

```
Dental Insurance → PPO Plans → {Carrier} → {Plan}          (plan spoke — 4 levels)
Dental Insurance → PPO Plans → {Carrier}                    (carrier hub)
Dental Insurance → PPO Plans → Compare                      (compare tool)
Dental Insurance → PPO Plans → No Waiting Period            (timing)
Dental Insurance → For Implants                             (treatment)
Dental Insurance → PPO Plans → Glossary → {Term}           (glossary)
```

- Today the live compare page breadcrumb is only 2 levels (`Dental insurance → Compare PPO plans`) and the pillar is shallow. **Extend both** so the `Dental Insurance` grandparent and `PPO Plans` pillar are explicit nodes — this is the spine that makes the cluster legible to crawlers and AI.
- Visible trail URLs **must byte-match** the `BreadcrumbList` schema URLs and the canonical (https, www, trailing slash) — doc 02/06 already require this for plan spokes; apply to *every* node type.
- The breadcrumb is also the cheapest orphan-prevention device: every node is reachable upward to the pillar in ≤4 hops.

---

## 10. Orphan & crawl hygiene (system-level)

- **No node ships without ≥2 inbound internal links** (its breadcrumb parent + at least one sibling/contextual edge). Enforce in the same DB-driven render that builds the mesh (§7).
- **Filters/sort/compare-state must not create indexable duplicate URLs.** The compare tool's selected-plan state belongs in `#hash` or session, or `?`-params that are `Disallow`-pattern'd in robots and `noindex`/canonical-to-clean-URL'd — never a crawlable matrix of `?plan=a&plan=b` permutations. (The current robots only disallows `*?*add=` and `estimate-cost.html`; add compare-state and `?ref=` patterns.)
- **MetLife stays `noindex,follow`** and out of the sitemap but reachable (so the noindex is read) — already correct (doc 01); ensure no new node links to it as an indexable target.
- All inter-node navigation is real `<a href>` (no JS-only soft-404 CTAs), pointing at canonical `plan_page` URLs only (doc 02).

---

## 11. Carrier & plan entities (the dominance layer for AI search)

- Each carrier resolves to **one** entity node (`@id` `#carrier-{x}`) with `sameAs` → official carrier domain, referenced by `@id` from the carrier hub, carrier-eval, and every plan spoke for that carrier (doc 06 establishes this per-plan; **reuse the same `@id` across the carrier hub and eval page** so Google merges them into one entity, not three).
- Each plan is a neutral `Thing`/`mainEntity` (never `Product`/`Offer` until pricing+compliance gate — doc 06). The plan entity is `mentions`/`about`-linked to its carrier entity.
- The pillar emits `ItemList` of the 8 plans; the carrier hub emits `ItemList` of that carrier's plans — same plan `@id`s reused, building a consistent graph.
- This entity consistency is what lets AI answer engines say "CoverCapy lists Guardian's Premier 2.0 with a 6-month major-services wait" and cite the right URL. **Inconsistent or duplicated entity IDs across page types is the most common way this dominance is lost** — enforce one `@id` per real-world entity, reused everywhere.

---

## Top 3 recommendations

1. **Resolve the two-hub conflict as Option B with a hard intent split (BLOCKING).** `/dental-insurance/ppo-plans/` = canonical pillar (`best dental PPO plans`); `/compare-ppo-dental-plans/` = canonical comparison-tool spoke (`compare PPO dental plans`). Differentiate titles/H1s/first paragraphs, cross-link them, and do **not** 301 the equity-bearing compare URL. Requires user approval before any redirect work.

2. **Build the cross-type link matrix (§7) and reciprocity from one DB-driven source.** Doc 07 wired the plan cluster; extend the mesh to carrier hubs, carrier-eval, treatment, timing, and life-situation nodes — every edge bidirectional, generated from `ppo_plans` + a static node-map, so no node is ever orphaned and equity flows toward the plan/verification money pages.

3. **Install the cannibalization firewall, esp. timing.** One canonical no-waiting page owns "no wait / starts today / immediate coverage" as on-page variants; only "major work now" earns a separate URL. Enforce one-intent-per-URL (§6) with a build check that blocks duplicate `<title>` head terms, and reuse one entity `@id` per carrier across hub/eval/spoke for AI-citation consistency.
