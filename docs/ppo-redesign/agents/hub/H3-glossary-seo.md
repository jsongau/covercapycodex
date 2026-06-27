# Agent H3 — Glossary as the Site-Wide SEO Foundation

**Output:** `docs/ppo-redesign/agents/hub/H3-glossary-seo.md`
**Date:** 2026-06-21
**Scope:** The glossary (`/dental-insurance-glossary/`) is the crawlable SEO/AEO foundation for the entire CoverCapy site. This doc defines the IA, schema, internal-linking model, the hub "short glossary" module, and reconciles `glossary.json` against the 24 on-disk pages.

---

## 0. State of the asset (audited, not assumed)

| Layer | Count | Status |
|---|---|---|
| On-disk term dirs `/dental-insurance-glossary/{slug}/` | **23** (+ index.html) | live, schema-bearing |
| `DefinedTerm` entries in `index.html` `#termset` | **24** | complete — includes ada-fee, rating, vision |
| `glossary.json` (3-layer tooltip index) | **21** | **subset — gaps below** |
| Rich source briefs `glossary-briefs/term-*.md` | **22** | 800–1,500 words each |

The 23 on-disk pages are NOT thin: each renders server-side with CoverCapy tokens, `DefinedTerm` + `FAQPage` + `BreadcrumbList` schema, a worked dollar example, and carrier tables. This is the asset to connect and extend, **never rebuild**. (Confirms Agent 19's verdict.)

### 0a. glossary.json vs on-disk — exact reconciliation
- **On disk, MISSING from glossary.json (tooltip orphans — 3):** `ada-fee`, `rating`, `vision`. These three live pages have a `DefinedTerm` entry in index.html but **no tooltip** pointing at them. Any `data-term="ada-fee|rating|vision"` on the hub/spokes will silently fail.
- **In glossary.json, NO on-disk page (1):** `predetermination`. The tooltip resolves to `/dental-insurance-glossary/predetermination/` which currently **404s**.
- **Action (P0):** add `ada-fee`, `rating`, `vision` to glossary.json (3-layer); either build the `predetermination` page or remove its tooltip until the page ships. End state: glossary.json === on-disk set, 1:1, every tooltip URL returns 200.

---

## 1. Glossary IA — A–Z index + category clusters

The index page carries TWO navigation surfaces over the same term set: an **A–Z list** (for humans scanning + Google "jump-to" sitelinks) and **category clusters** (for topical authority + AEO). Every term appears in both.

### 1a. Category clusters (5 + system)
Each term is tagged to exactly one primary cluster. Clusters become `<h2>` sections on the index with a 1-line cluster intro (good for "what is X" PAA capture).

| Cluster | Terms | Intent |
|---|---|---|
| **Cost** (what you pay) | deductible, coinsurance, annual-maximum, out-of-pocket, allowed-amount, ada-fee | "how much / what will I owe" |
| **Coverage** (what's included) | coverage-preventive, coverage-basic, coverage-major, implants, whitening, vision, missing-tooth | "is X covered" |
| **Network** (who you see) | ppo, in-network, balance-billing | "does my dentist take it" |
| **Timing** (when it pays) | waiting-period, effective-date, day-one, calendar-year, plan-year | "can I use it now" |
| **Claims & codes** (the paperwork) | cdt, predetermination | "what does this code/letter mean" |
| **CoverCapy system** | rating | brand term, kept honest ("no carrier pays for a higher score") |

### 1b. A–Z index
A single alphabetized list of all terms with the short def beneath each, each linking to its full page. Anchored letter jumps (`#a`, `#c`, `#d`…) help Google render a "Jump to" sitelink block under the glossary result. This is the surface most likely to earn the sitelinks the plan targets.

---

## 2. Term-page template (the spec every page must satisfy)

Order is fixed so the worked example sits high (snippet capture) and the action sits last (conversion). Maps directly onto the existing brief sections.

| # | Section | Source | Purpose |
|---|---|---|---|
| 1 | **Breadcrumb** | BreadcrumbList schema | Home → Glossary → Term |
| 2 | **H1 + one-sentence definition** | brief §1 (featured snippet) | AEO/snippet target — 1 declarative sentence, <40 words |
| 3 | **Why it matters** | brief §6 | the "moves your bill" hook |
| 4 | **Numeric example** | brief §5 | real dollars (e.g. "$1,500 crown, 50% major, $1,000 max → you pay $750+") |
| 5 | **Which plans it affects** | plans.json | names carriers/plans where the term bites; deep-links into filtered compare state |
| 6 | **Related terms** | brief §7 | 3–5 in-cluster + cross-cluster links (no orphans) |
| 7 | **Action** | — | deep-link to compare (pre-filtered) OR find-my-dentist OR verify flow |
| 8 | **FAQ accordion** | brief §9 | 2–3 Q&A → FAQPage schema |

**Anti-thin rule:** no page ships without sections 2, 3, 4, 6, 7 minimum. §4 (a real number) is the single biggest differentiator vs carrier glossaries and the strongest AEO signal.

---

## 3. Schema — DefinedTermSet / DefinedTerm

The index already emits a correct `DefinedTermSet` with 24 `DefinedTerm` children (`@id`, `name`, `termCode`, `description`, `inDefinedTermSet`). Keep it; extend per these rules:

```jsonc
// Index page (/dental-insurance-glossary/): ONE DefinedTermSet, all terms as children
{ "@type": "DefinedTermSet",
  "@id": ".../dental-insurance-glossary/#termset",
  "name": "PPO Dental Insurance Glossary",
  "hasDefinedTerm": [ /* keep flat list; OR group by hasPart sub-sets per cluster */ ] }

// Each term page (/dental-insurance-glossary/{slug}/): ONE DefinedTerm that
// references the set by @id, PLUS its own FAQPage + BreadcrumbList
{ "@type": "DefinedTerm",
  "@id": ".../{slug}/#term",
  "name": "...", "termCode": "{slug}",
  "description": "<= the brief §1 snippet sentence>",
  "inDefinedTermSet": { "@id": ".../dental-insurance-glossary/#termset" } }
```

Rules: (1) `description` on each term page MUST equal the §1 snippet sentence verbatim so the entity definition is consistent across the set and the page. (2) Term count strings in index `<title>`/meta/H1 must match the actual child count — generate, don't hand-type (drift is a known failure). (3) `dateModified` preserved per page (freshness/EEAT). (4) Cluster grouping is optional but recommended via nested `DefinedTermSet` `hasPart` so the 5 clusters become declared sub-entities.

---

## 4. Internal-linking model (no orphans, links UP and ACROSS)

Three link directions per term page, plus reverse links from the rest of the site INTO the glossary.

### 4a. Term page → out (every page, footer + inline)
1. **UP to the hub:** breadcrumb + a "Compare PPO plans" CTA, **deep-linked to a pre-filtered state** where one exists (the key upgrade):
   - annual-maximum → `/compare-ppo-dental-plans?sort=annualMax`
   - waiting-period / day-one → `?filter=no-wait`
   - missing-tooth → `?filter=no-missing-tooth-clause`
   - coverage-major → `?filter=major-covered`
   - vision → `?filter=vision-included`
2. **ACROSS to treatment/spoke branch** (commercial intent): implants → implants treatment page; coverage-major → crowns/root-canal; whitening → whitening; vision → vision spoke. The glossary entry stays informational; the treatment page is the canonical commercial destination (avoids cannibalization).
3. **DOWN to action:** network terms (in-network, out-of-network, balance-billing, allowed-amount) → `/find-my-dentist`; timing terms (effective-date, day-one) → verify-coverage flow.

### 4b. Rest of site → glossary (the tooltip layer = the moat)
Every plan / carrier / treatment page carries `data-term="{slug}"` attributes that read from `assets/ppo/glossary.json` (3-layer: def + why + url). The tooltip's "Read the full guide →" link is the inbound link that keeps glossary pages non-orphaned and distributes authority. **This only works if glossary.json === on-disk set** (see §0a). Carrier hubs should also hard-link into glossary for carrier-specific fine print (e.g. Delta's missing-tooth clause → missing-tooth term).

### 4c. Orphan guard
- Every term must be reachable from: the index (A–Z + cluster), ≥1 tooltip, and ≥1 sibling term's "related terms". Run a link audit: any term with <2 inbound internal links is at orphan risk.

---

## 5. Main-hub "short glossary" module spec

Lives in `compare-ppo-dental-plans.html` `#terms` (the `<div class="dict" id="dictGrid">`), populated client-side from `glossary.json`. It is the SHORT version; it links to the full pages.

**Which ~10 terms** (the bill-deciding, highest-intent set — ranked):
1. waiting-period 2. day-one 3. annual-maximum 4. coinsurance 5. deductible 6. missing-tooth 7. in-network 8. balance-billing 9. ppo 10. out-of-pocket

**Per-card content (short version):** `term` (label) + `def` (one plain sentence) + `why` (one "moves your bill" line) — all three already in glossary.json — plus a **"Full definition →"** link to `url`. Cards render in cluster order with a cluster eyelash label. The section already tells users to "read the full glossary below" and to hover underlined terms; the module is the bridge from hub to the 23 deep pages.

**Rule:** the hub shows the SHORT def only; it must NOT duplicate the full page body (cannibalization). One sentence + why + link, nothing more.

---

## 6. Acceptance criteria
- [ ] glossary.json gains `ada-fee`, `rating`, `vision` (3-layer); `predetermination` page built OR tooltip pulled → glossary.json === 23/24 on-disk, every URL 200.
- [ ] Index shows A–Z + 5 cluster `<h2>`s; term-count strings generated, not typed.
- [ ] Every term page satisfies the §2 template (incl. a real dollar example + action link).
- [ ] ≥5 action links deep-link into pre-filtered compare states.
- [ ] Hub `#terms` shows the 10 priority terms, short def + why + "Full definition →".
- [ ] Each `DefinedTerm.description` === its page's §1 snippet sentence, verbatim.
- [ ] Link audit: zero terms with <2 inbound internal links.
