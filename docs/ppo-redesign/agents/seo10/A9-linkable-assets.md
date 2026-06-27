# A9 — Off-Page Authority & Linkable Assets (Advisory)

SEO Architect 9 of 10 | Page: `compare-ppo-dental-plans.html` | Date: June 2026

Scope: advisory spec only, no code changes. CoverCapy is a new domain with weak authority. The fastest legitimate way to earn editorial citations is to publish original, well-sourced reference assets that journalists, bloggers, dental offices, and benefits-explainer sites want to link to. No link buying, no PBNs, no guest-post farms. Everything below extends sections that already exist in the file.

---

## Current state (grounded in the file)

- `#compare` already ships a crawlable static comparison table (lines 1047-1058) with eight named plans scored on premium, annual maximum, deductible, and preventive/basic/major coverage. This is the seed of a linkable dataset but is not yet framed as a study or given a methodology/sourcing block beyond the reviewer bar (lines 1022-1030).
- A `#methodology` anchor exists (line 1017) but currently only labels the compare section, it has no published rating method.
- A reviewer bar (lines 1026-1027) states "checked against carrier source documents," "Verified June 2026," "Updated quarterly." Good trust scaffolding, but no outbound source links.
- Glossary already exists as standalone pages (lines 937-947, `#glossary-shelf` line 1241) covering annual maximum, waiting period, deductible, coinsurance, missing tooth clause, balance billing, etc.
- A `#treatment` section (line 1110) exists for shopping by procedure, and `#shelf` (line 1068) groups plans by coverage feature. Neither yet carries cost data.
- A `#faq` section (line 1263) with categorized Q&A.

These give us five real anchors to extend. No new top-level architecture is required.

---

## Linkable assets to spec

### Asset 1 — "The CoverCapy PPO Dental Plan Index" (original dataset + methodology)
- **What it is:** Promote the existing eight-plan static table (lines 1047-1058) into a named, versioned dataset with a published methodology. Score each plan on the four bill-deciding factors the hub already names (premium, annual maximum, waiting period, coverage tier). Add a one-number composite ("first-year out-of-pocket on a $1,800 treatment plan") that is genuinely original and easy to quote.
- **Extends:** `#compare` table and the empty `#methodology` anchor (line 1017).
- **Why it earns links:** A single quotable stat ("the median featured PPO annual maximum is $X; the lowest-premium plan covers no major work") is exactly what comparison bloggers and finance writers cite. A transparent method makes it safe to reference.
- **On-page format:** Keep the `<table>` server-rendered and crawlable. Add a visible "Methodology" subsection under line 1017 covering: which plans are included and why, what each score means, the test-case assumptions, last-reviewed date, update cadence (already "quarterly"). Add `Dataset` JSON-LD (`name`, `description`, `dateModified`, `creator: CoverCapy`, `license`). Give each row a stable anchor id so others can deep-link a plan.

### Asset 2 — "Waiting Periods & Annual Maximums Across PPO Dental Plans" (comparison study)
- **What it is:** A short data study built from the same plan rows, focused narrowly on two pain points buyers search for: how long until major work is covered, and how high the annual cap goes. Present as a sortable embeddable table plus 4-6 callout findings (e.g. "X of Y featured plans cover basic care day one," "only Z plans waive the major-work wait").
- **Extends:** `#shelf` (line 1068, "by the coverage feature you need") and the "no waiting period" situation page already linked (line 957).
- **Why it earns links:** "No waiting period dental" and "highest annual maximum" are high-intent, frequently-cited angles. Roundup writers link to the source that did the counting.
- **On-page format:** Citable stat block at top (bold numbers, one sentence each), embeddable HTML table with a one-line "Source: CoverCapy Plan Index, June 2026" credit and a copy-embed snippet. Date-stamp visibly.

### Asset 3 — "Cost by Procedure" dataset (national + range)
- **What it is:** A reference table of typical out-of-pocket and full-fee ranges for common procedures (cleaning, filling, crown, root canal, implant, extraction, aligners), paired with how a PPO's basic/major tier changes the number. This is the most naturally-cited dental asset type on the web.
- **Extends:** `#treatment` (line 1110, "Shopping for a specific procedure?").
- **Why it earns links:** Cost-of-X pages attract links from local dental offices, personal-finance sites, and news explainers. Ranges sourced to recognized fee surveys are quotable and durable.
- **On-page format:** Embeddable table with low/median/high columns and a "with a typical PPO" column. Every figure must carry an inline source and year. Add a clear "ranges vary by region" disclaimer to avoid overclaiming. Mark up as `Dataset` and optionally per-procedure `FAQPage`.

### Asset 4 — "Dental Insurance Glossary" as the canonical reference
- **What it is:** Harden the existing A-to-Z glossary (lines 937-947, 1241) into a citable reference: each term page gets a plain one-sentence definition (the quotable unit), an example with real numbers, and "what this costs you" framing.
- **Extends:** `#glossary-shelf` (line 1241) and the standalone `/dental-insurance-glossary/*` pages.
- **Why it earns links:** Definitional pages (missing tooth clause, balance billing, coinsurance) earn "see definition" links from blogs and office FAQ pages for years. Glossaries are low-controversy, evergreen link magnets.
- **On-page format:** `DefinedTerm` / `DefinedTermSet` JSON-LD. First sentence is a clean standalone definition (snippet and citation friendly). Stable URLs (already in place). Last-updated date per term.

### Asset 5 — "How we rate plans" transparency / sourcing page
- **What it is:** A standalone methodology + sourcing page expanding the reviewer bar (lines 1026-1027). States independence ("no paid placement," already claimed line 981), the review team, the update cadence, and a public source list.
- **Extends:** `#methodology` (line 1017) and the existing `#methodology` reviewer link (line 1027).
- **Why it earns links and trust:** Independence + transparent sourcing is what makes a new domain quotable by editors who fact-check. It also anchors E-E-A-T for the YMYL (insurance) topic.
- **On-page format:** Visible last-reviewed date, named reviewer credentials, and an outbound "Sources" list (Asset 6). `Organization`/`WebPage` schema with `reviewedBy`.

---

## Legitimate citation / seed sources to reference

Reference these in methodology and per-figure citations to build trust. Cite the primary document, not aggregators.

- **Carrier source documents (primary):** Delta Dental, UnitedHealthcare, Aetna, Ameritas, Guardian, Mutual of Omaha, Humana, MetLife plan brochures and Summary of Benefits PDFs. These back every row already in the table (lines 1051-1058). Link the actual benefit summary, strip tracking params.
- **.gov / regulatory:** HealthCare.gov and state Departments of Insurance (plan rules, consumer guides); CMS for any Medicare-adjacent dental notes; the Federal Employees Dental and Vision program (FEDVIP) plan brochures as a public benchmark for premiums/maximums.
- **Dental associations:** American Dental Association (ADA) consumer resources and, where licensed, the ADA Survey of Dental Fees for procedure-cost ranges (Asset 3); American Association of Orthodontists for aligner/braces figures.
- **Public research / statistics:** National Association of Dental Plans (NADP) enrollment and benefit-design statistics; Kaiser Family Foundation (KFF) for coverage context; FAIR Health consumer cost lookup for regional procedure cost ranges.

Sourcing rules: cite primary documents, show the access/verified date, refresh quarterly to match the stated cadence (line 1027), and never present illustrative premiums (line 1048 caveat) as guaranteed quotes.

---

## What NOT to do
- No paid links, no private blog networks, no reciprocal-link schemes, no sponsored "reviews" disguised as editorial.
- Do not fabricate or round procedure costs without a cited source and year.
- Do not drop the existing independence and date stamps (lines 981, 1027); they are the credibility that makes these assets citable.
