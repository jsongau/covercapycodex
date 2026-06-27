# SEO Improvement 11 — Keyword Targeting, Search Intent & SERP Features (PPO Plan Pages)

**Scope:** 8 featured PPO plan pages + the PPO hub (cluster: treatment guides, scenario pages, carrier-eval pages)
**Priority:** **P1** · **Effort:** Medium · **Score:** 8.0/10 → target **9.0/10**

> On-page basics are already solid. The remaining gap is **breadth of intent coverage** and **SERP-feature eligibility** — not titles or H1s, which are done.

---

## Current state & audit evidence

- **Branded review intent is well covered.** Titles and H1s already target `{Carrier} {Plan} Review 2026: Benefits, Waiting Periods & Limits` — a clean match for the primary branded query of each plan page.
- **FAQ is present** and visibly rendered, which targets the **People Also Ask** box and qualifies for FAQ rich results.
- **Topical content is strong** (~1,500–1,950 words of plan-specific analysis), giving the raw material to address secondary intents.

**Score rationale (8.0):** primary branded intent and PAA-shaped FAQ are handled (+), but secondary intents (waiting period, cost, implants, dentists, reviews) are not each guaranteed a dedicated answerable section, comparison intent is only partly captured, and there is no deliberate featured-snippet or entity-coverage discipline (−).

---

## Why it matters

- **Intent match → rank + convert.** A page that answers the full intent set for its plan ranks for more queries *and* keeps the visitor on-page to the free eligibility CTA instead of bouncing back to the SERP.
- **SERP features = free visibility.** FAQ rich results, featured snippets, and PAA placements claim vertical space and clicks above or beside the ranked result — high-leverage on a branded query the page already ranks for.
- **AI answer engines** (AI Overviews, assistants) extract **answer-first, well-structured, entity-rich** passages. The same discipline that wins featured snippets wins citations.

---

## Specific fixes

### 1. Map the intent set per plan page *(P1)*
For each of the 8 plans, ensure every intent below is addressed by a **heading, section, or FAQ entry**:

- **Primary (branded):** `{carrier} {plan}` — owned by title/H1.
- **Secondary:**
  - `{plan} reviews` → "Independent review" framing + verdict section.
  - `{plan} waiting period` → dedicated waiting-period section/table.
  - `{plan} cost` / `{plan} price` → illustrative example + FAIR Health estimate.
  - `{plan} implants` → major/implant coverage line (or explicit "not covered").
  - `{plan} dentists` / `{plan} network` → named network + provider-lookup pointer.

No new intent should require new invented data — each maps to an existing `ppo_plans` field.

### 2. Capture comparison intent *(P1)*
- Serve `{plan} vs {plan}` and `{carrier} vs {carrier}` via the **compare tool** + an **"alternatives"** module on each plan page.
- Build **dedicated comparison pages only where both plans have verified data** (per Doc 08). Do not ship a comparison page on unverified figures.

### 3. Win SERP features *(P1)*
- **FAQ rich results:** keep the FAQ + valid `FAQPage` schema (coordinate with Doc 06).
- **Featured snippet:** lead each secondary section with an **answer-first sentence** (the direct answer in the first 1–2 sentences) plus a **table** for waiting periods / coverage %; tie sections to the headings spec.
- **People Also Ask:** phrase FAQ items as **natural questions** ("Does {plan} cover implants?", "How long is the {plan} waiting period?").
- **Cost feature:** satisfy cost intent with the **illustrative example + FAIR Health estimate**, not invented hard prices.

### 4. Long-tail expansion via the cluster *(P2)*
- Route long-tail queries (specific procedures, life scenarios, "is {carrier} good") to **treatment guides, scenario pages, and carrier-eval pages**, then **link** the plan page to the relevant cluster nodes. **Link, don't stuff** — keep the plan page focused on its plan.

### 5. Avoid keyword cannibalization *(P1)*
Assign **one canonical intent per URL** so the plan page, carrier-eval page, and hub don't compete:

| URL | Canonical intent |
|---|---|
| Plan page | Branded plan: `{carrier} {plan}` + its secondaries |
| Carrier-eval page | Carrier-level: `is {carrier} dental good`, `{carrier} reviews` |
| Hub | Category: `best dental PPO plans`, `dental PPO marketplace` |

### 6. Entity & semantic coverage *(P2)*
On each plan page, explicitly name the **carrier**, the **network name**, **procedure entities** (cleanings, fillings, crowns, root canals, implants, ortho — CDT-aligned vocabulary), and **plan features** (annual maximum, deductible, coinsurance tiers, waiting periods). This builds topical depth and gives AI engines clean entities to extract.

### 7. Branded-trademark caution *(ongoing)*
We review branded plans **independently**. Keep "independent review" framing, **no implied endorsement, partnership, or affiliation** with the carrier, and no use of the brand suggesting CoverCapy is the carrier.

---

### Intent → section mapping (plan page template)

| Intent | Query shape | Section / answer surface | Source field |
|---|---|---|---|
| Branded (primary) | `{carrier} {plan}` | Title, H1, intro verdict | carrier, plan_name |
| Reviews | `{plan} reviews` | "Independent review" verdict block | analysis copy |
| Waiting period | `{plan} waiting period` | Waiting-period table + answer-first line | waiting_periods |
| Cost | `{plan} cost` | Illustrative example + FAIR Health estimate | premium_from, est. fees |
| Implants | `{plan} implants` | Major/implant coverage line | implant_coverage |
| Dentists / network | `{plan} dentists` | Network name + provider-lookup pointer | network_name |
| Comparison | `{plan} vs {plan}` | Compare tool + alternatives module | joined plan rows |
| Long-tail | procedure / scenario | Cluster link out | — |

---

## Implementation notes

- **Drive secondary-intent sections from `ppo_plans` fields**, so the section renders only when the data exists and stays consistent with the verified figures. A missing field renders an explicit "not covered / not specified," never a fabricated answer.
- **Cluster links** are template-level: each plan page links to its carrier-eval page, relevant treatment guides, and matching scenario pages. Reciprocate from those nodes (coordinate with Doc 07 internal linking).
- Featured-snippet and FAQ formatting should be **generated from the same data**, not hand-authored per page, to keep all 8 pages consistent and maintainable.

---

## Priority & effort

| Workstream | Priority | Effort |
|---|---|---|
| Intent map per plan + answer-first secondary sections | **P1** | Medium |
| Comparison intent (compare tool + verified comparison pages) | **P1** | Medium |
| SERP-feature formatting (snippet/PAA/tables) | **P1** | Low |
| Cannibalization audit (one intent per URL) | **P1** | Low |
| Entity/semantic coverage pass | P2 | Low |
| Long-tail cluster linking | P2 | Low |

---

## Acceptance criteria

- [ ] Every plan page **addresses all secondary intents** (reviews, waiting period, cost, implants, dentists) with a heading, section, or FAQ entry.
- [ ] Each secondary section opens with an **answer-first sentence**; waiting-period and coverage data presented in **tables**.
- [ ] FAQ items are phrased as **natural questions** and valid `FAQPage` schema is emitted.
- [ ] **Comparison intent** served via compare tool + alternatives; dedicated comparison pages exist **only where both plans are verified**.
- [ ] **No cannibalization:** plan page, carrier-eval page, and hub each own **one canonical intent**.
- [ ] **Entity coverage** present on each plan page (carrier, network name, procedures, plan features).
- [ ] Long-tail intent **linked out** to treatment/scenario/carrier-eval cluster, not stuffed into the plan page.
- [ ] **Cost intent** met via illustrative example + FAIR Health estimate — **no invented prices**.
- [ ] **Independent-review framing** maintained; **no implied carrier endorsement or affiliation**.
