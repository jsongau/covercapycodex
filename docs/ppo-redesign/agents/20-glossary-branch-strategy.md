# Agent 19 — Glossary & Branch-Page Strategy

**Output file:** `agents/20-glossary-branch-strategy.md` (filename per prompt's deliverable numbering; this is the Agent 19 workstream)
**Author:** Agent 19 — Glossary & branch-page strategist
**Date:** 2026-06-21
**Score:** 7.5 / 10

---

## 0. Executive summary (founder's fear addressed first)

The founder's fear is that a redesign makes the glossary "too basic / worse than current." After auditing the real assets, that fear is justified **only if the new `assets/ppo/glossary.json` (18 tooltip stubs) is allowed to become the source of truth.** The existing glossary is genuinely strong and must NOT be lost.

**What already exists and must be preserved:**

- **23 live term pages** under `/dental-insurance-glossary/{slug}/` — each a self-contained HTML page with CoverCapy design tokens, `DefinedTerm` + `FAQPage` schema, real dollar-amount worked examples, and carrier-specific tables.
- **A hub index** (`/dental-insurance-glossary/index.html`) with full `DefinedTermSet` schema listing all 23 terms, `BreadcrumbList`, and `Organization` graph.
- **24 deep content briefs** (`glossary-briefs/term-*.md`) — each 800–1,500 words with featured-snippet sentence, patient definition, clinical context, misconceptions, worked dollar example, "why it matters," related terms, 10 keyword variants, FAQ, and a CoverCapy CTA angle.
- **20+ SEO strategy briefs** (`glossary-briefs/seo-*.md` + `seo-hub/`) — keyword-intent map, cannibalization check, schema-DefinedTermSet plan, featured-snippet strategy, EEAT, internal linking, breadcrumb, FAQ schema, competitor analysis. This is a real content operation, not a stub.

This is **above** the depth of most carrier glossaries (Delta, Humana) for the niche terms. Losing it would be a regression. **The redesign's job is to consolidate and connect, not rebuild.**

---

## 1. Inventory: the 23 existing term pages

| Slug | Page exists | Brief exists | In new glossary.json | Required by prompt |
|---|---|---|---|---|
| annual-maximum | ✅ | ✅ | ✅ | ✅ |
| deductible | ✅ | ✅ | ✅ | ✅ |
| coinsurance | ✅ | ✅ | ✅ | ✅ |
| allowed-amount | ✅ | ✅ | ✅ | ✅ |
| balance-billing | ✅ | ✅ | ✅ | ✅ |
| in-network | ✅ | ✅ | ✅ | ✅ |
| out-of-pocket | ✅ | ✅ | ✅ | (related) |
| waiting-period | ✅ | ✅ | ✅ | ✅ |
| effective-date | ✅ | ✅ | ✅ | ✅ |
| day-one | ✅ | ✅ | ✅ | ✅ |
| calendar-year | ✅ | ✅ | ✅ | ✅ |
| plan-year | ✅ | ✅ | ✅ | ✅ |
| coverage-preventive | ✅ | ✅ | ✅ | ✅ |
| coverage-basic | ✅ | ✅ | ✅ | ✅ |
| coverage-major | ✅ | ✅ | ✅ | ✅ |
| implants | ✅ | ✅ | ✅ | ✅ |
| missing-tooth | ✅ | ✅ | ✅ | ✅ |
| whitening | ✅ | ✅ | ✅ | ✅ |
| vision | ✅ | ✅ | ✅ | ✅ (vision add-on) |
| ppo | ✅ | ✅ | ✅ | (foundational) |
| cdt | ✅ | ✅ | ❌ MISSING | ✅ |
| ada-fee | ✅ | ✅ | ❌ MISSING | (supports MAC/U&C) |
| rating | ✅ | ✅ | ❌ MISSING | (CoverCapy-specific) |

### 1a. The new `glossary.json` is a SUBSET — flag this

`assets/ppo/glossary.json` contains only **18 terms** and is missing **cdt, ada-fee, rating, out-of-pocket** (it has out-of-pocket actually = 19? — confirmed it omits cdt, ada-fee, rating). **Decision: glossary.json is a tooltip index, NOT the canonical term inventory.** It must be regenerated FROM the 23 pages, not used to define which terms exist. Three real, indexed pages (cdt, ada-fee, rating) currently have no tooltip pointing at them — orphan risk from the tooltip layer.

---

## 2. Missing terms required by the prompt (genuine gaps)

The prompt's required audit list includes terms with **no page and no brief**:

| Required term | Status | Recommendation |
|---|---|---|
| out-of-network dentist | ❌ no standalone page | **ADD** — currently only covered inside `in-network`. High-intent ("out-of-network dental costs"). Pairs with balance-billing. |
| predetermination | ❌ MISSING | **ADD page** — high-value, urgent-treatment audience (Agent 06). Sparse SERP. |
| prior authorization | ❌ MISSING | **MERGE into predetermination** with a redirect/anchor; in dental these are near-synonyms. Do not create two thin pages (cannibalization). |
| frequency limits | ❌ MISSING | **ADD page** — drives "why won't insurance pay for my 3rd cleaning" queries; ties to annual-maximum and calendar-year. |
| alternate benefit / LEAT | ❌ MISSING | **ADD page** — explains downgraded crown→filling payouts; high billing-confusion intent, near-zero consumer competition. |
| MAC vs U&C | ❌ MISSING | **ADD page** — out-of-network reimbursement basis; pairs with allowed-amount + balance-billing. Critical for plan-data accuracy (Agent 20). |
| EOB (explanation of benefits) | ❌ MISSING | **ADD page** — explicitly named in the prompt; post-bill confusion audience; high snippet potential. |
| orthodontic lifetime maximum | ❌ MISSING | **ADD page** — distinct from annual-maximum; family/ortho audience (Agent 07). Currently only mentioned inside annual-maximum prose. |

**Eight missing terms.** These are the real "what must be ADDED." All eight have low consumer-brand competition and clear intent — they strengthen topical authority rather than padding it.

---

## 3. Classification: glossary entry vs standalone page vs guide vs deep-link

Per the prompt's IA question, each term gets one of four roles. The existing pages already ARE standalone — the strategic call is which ones graduate to **treatment/cost guides** vs stay **definition pages** vs become **deep-links into comparison states**.

### A. Stay pure glossary definition pages (cost/claims/timing vocabulary)
`deductible, coinsurance, allowed-amount, out-of-pocket, balance-billing, calendar-year, plan-year, effective-date, day-one, in-network, out-of-network (new), cdt, ada-fee, eob (new), frequency-limits (new), alternate-benefit/LEAT (new), MAC-vs-U&C (new)`
→ Keep at `/dental-insurance-glossary/{slug}/`. Definition → why it affects the bill → one worked example → related plans → action link. These are NOT pages anyone buys from; they exist for snippet capture + tooltip backing + topical authority.

### B. Graduate toward treatment/cost guides (commercial intent)
`implants, whitening, coverage-major (crowns/root canals/dentures), coverage-basic`
→ These have transactional intent (the implants brief is explicitly commercial). Keep the glossary definition page, but the **canonical destination for buyers should be a treatment branch** (`/dental-insurance/implants/`, etc., owned by Agent 12/13). The glossary entry stays informational and **links across** to the treatment page — it does not try to be the cost guide itself (avoids cannibalization flagged in `seo-cannibalization-check.md` / `seo-keyword-intent-map.md`).

### C. Deep-link directly into plan-comparison states (not just to the hub)
`annual-maximum → compare?sort=annualMax` · `waiting-period → compare?filter=no-wait` · `missing-tooth → compare?filter=no-missing-tooth-clause` · `coverage-major → compare?filter=major-covered` · `vision → compare?filter=vision-included`
→ The single biggest UPGRADE opportunity. Today the briefs link to `/compare-ppo-dental-plans` (the bare hub). After the hub gains filter/sort URL state (Agent 02), glossary action-steps should deep-link into the **pre-filtered comparison state**, turning a definition read into a filtered shortlist in one click. This is what makes the new system *better*, not basic.

### D. CoverCapy-system term
`ppo` (foundational gateway), `rating` (CoverCapy score) — keep as definitions; `rating` must stay honest ("no carrier pays for a higher score") per Agent 20.

---

## 4. Branch health: existing vs thin/duplicate/broken/missing

- **Existing & strong:** all 23 pages render server-side with schema + worked examples. Not thin.
- **Duplicate risk:** `prior-authorization` vs `predetermination` — build ONE, redirect the other. `coverage-preventive/basic/major` vs future treatment pages — keep glossary as definition, treatment pages as commercial; enforce the canonical split documented in `seo-cannibalization-check.md`.
- **Broken-link risk:** briefs reference `/glossary/{slug}` (e.g. implants brief's internal-link targets) but the live tree is `/dental-insurance-glossary/{slug}/`. **The `/glossary/` prefix in briefs is stale** — every cross-link must be normalized to `/dental-insurance-glossary/` before any are shipped, or they 404.
- **Tooltip orphans:** `glossary.json` omits cdt, ada-fee, rating — regenerate it from the 23 pages so every live page has a tooltip and every tooltip resolves.
- **Term-count drift:** index `<title>` says "23 Terms"; adding 8 → must update to 31 (title, meta, DefinedTermSet, hub copy) in lockstep, ideally generated.

---

## 5. How terms link to carrier / plan / treatment hubs (link graph)

Each term page footer should carry three context-appropriate links (feeds Agent 08/12/13):

1. **Up to the hub** — breadcrumb + "Compare PPO plans" (deep-linked per §3C where a filter exists).
2. **Across to the relevant treatment/timing branch** — e.g. missing-tooth → implants treatment page; waiting-period → no-waiting-period timing page; coverage-major → crowns/root-canal treatment pages.
3. **Down to action** — `/find-my-dentist` for network terms (in-network, out-of-network, balance-billing, allowed-amount, MAC-vs-U&C); verify-coverage flow for effective-date/day-one.
- **Carrier hubs** should reverse-link into glossary for carrier-specific fine print (e.g. Delta missing-tooth clause → missing-tooth term; whitening → carriers offering it, already named in the brief).
- Add a compact **"PPO terms" preview module** on the master hub (prompt's hub anatomy item 12) linking the top-5 priority terms (waiting-period, ppo, deductible, missing-tooth, implants) per the keyword-intent priority ranking.

---

## 6. Risks & acceptance criteria

**Risks:** (1) treating glossary.json as canonical and silently dropping 5 terms; (2) shipping stale `/glossary/` cross-links that 404; (3) treatment-page launches cannibalizing glossary commercial terms without the canonical split; (4) term-count strings drifting out of sync; (5) building both predetermination AND prior-authorization as thin duplicates.

**Acceptance criteria:**
- [ ] `glossary.json` regenerated from the 23 (soon 31) live pages; every tooltip URL resolves 200.
- [ ] 8 missing terms built to the existing brief depth (worked $ example + FAQ + schema), not stubs.
- [ ] prior-authorization redirects to predetermination (no duplicate).
- [ ] All cross-links use `/dental-insurance-glossary/` prefix; zero `/glossary/` references remain.
- [ ] Commercial terms (implants, whitening, coverage-major) link across to treatment branches; canonical split documented.
- [ ] ≥5 glossary action-steps deep-link into pre-filtered comparison states once hub filter URLs exist.
- [ ] Index title/meta/DefinedTermSet term count matches actual page count.
- [ ] EEAT/freshness `dateModified` preserved on every page.

---

## 7. Verdict

**Keep the entire existing glossary — it is an asset, not a liability.** The redesign should: regenerate the tooltip index from the real pages; add 8 genuinely missing prompt-required terms; normalize cross-links; split commercial terms toward treatment branches; and deep-link action-steps into comparison states. Done this way the glossary gets *better and more connected*, directly answering the founder's fear.

**Score: 7.5/10** — content depth is excellent (would be 9), docked for the glossary.json subset/canonical risk, the stale `/glossary/` cross-link prefix, and 8 prompt-required terms still missing.
