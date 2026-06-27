# 07 — Internal Linking & Site Architecture (PPO Plan Pages)

## Current state & audit evidence

CoverCapy already runs a real hub-and-spoke. The hub (`/dental-insurance/ppo-plans/`) is the pillar; the 8 plan pages are the primary spokes. Each plan page carries **38–41 internal links**; the hub carries **63**. The existing link inventory per plan page:

- **Top-nav** — site-wide links to hub, compare tool, glossary, treatment guides.
- **Breadcrumbs** — back up to the PPO hub.
- **Alternatives cards** — links to sibling plan pages.
- **"Compare with" rail** — pairwise links into the interactive compare tool.
- **Treatment-fit links** — into the relevant treatment guides.
- **"See all PPO plans"** — back to the hub.

This is genuinely strong. The gaps are not *volume* — they're **completeness of the cluster mesh** (some spoke-to-spoke edges are missing or one-directional), **anchor-text variety**, **in-prose contextual links** (today links live almost entirely in modules and rails, not body copy), a missing **"other plans from {carrier}"** block, and the risk of links pointing at non-canonical aliases (see doc 02).

**Score: 8.5/10 → Target: 9.5/10**

## Why it matters

- **Crawl discovery:** dense, bidirectional internal links let Googlebot reach every spoke in few hops and re-crawl them as data changes.
- **Link equity to money pages:** plan pages are the money pages (they drive free verification). PageRank should flow *toward* them — from guides, scenario pages, and carrier-eval pages — not just outward.
- **Topical clusters:** a tightly interlinked pillar + spokes signals topical authority on "dental PPO" to search engines far better than isolated pages.
- **Anchor relevance:** descriptive, keyword-relevant anchors tell Google what the target page is about. Generic anchors ("learn more", "click here") waste that signal.

## Specific fixes

### 1. Define the topical CLUSTER model (and make edges bidirectional)

- **Pillar:** the PPO hub.
- **Spokes:** plan pages, treatment guides (`best-dental-insurance-for-implants/-crowns/-braces`), scenario pages (`no-waiting-period`, `between-jobs`, `immediate-coverage`), carrier-eval pages (`is-{carrier}-good-insurance`), glossary, compare tool.

Required **bidirectional** edges (the audit shows several are currently one-way or missing):

- **Plan ↔ treatment guide it qualifies for** — a plan with strong implant coverage links to the implants guide, *and* the implants guide lists that plan.
- **Plan ↔ its carrier-eval page** — every plan links to `is-{carrier}-good-insurance`, and that page links back to the carrier's plan(s).
- **Plan ↔ relevant scenario page** — a no-waiting-period plan links to the `no-waiting-period` scenario page and is listed there.

Derive each plan's qualifying guides/scenarios from `ppo_plans` fields (e.g. implant %, ortho coverage, waiting period = 0) so edges are data-driven, not hand-curated.

### 2. Anchor-text strategy — descriptive, varied, keyword-relevant

Never "click here" / "learn more". Vary anchors across instances of the same target so they read naturally. Examples by link type:

| Link type | Good anchor examples |
|---|---|
| Plan → treatment guide | "best dental insurance for implants", "plans that cover crowns", "compare implant coverage" |
| Plan → carrier-eval | "Is Guardian good dental insurance?", "our Guardian review", "how Guardian rates" |
| Plan → scenario page | "PPO plans with no waiting period", "dental coverage between jobs", "immediate dental coverage" |
| Plan → compare tool | "compare Guardian Premier vs Humana Extend 5000", "build a side-by-side comparison" |
| Plan → glossary | "what an annual maximum means", "how PPO deductibles work" |
| Spoke → plan (money) | "Guardian Premier 2.0 PPO plan", "see the Humana Extend 5000 details" |

### 3. Add the "Other plans from {carrier}" block

A feature-first block on each plan page listing the carrier's other SKUs as **brief mentions + a link to the carrier-eval page** (`is-{carrier}-good-insurance`). This captures branded SKU searches without doorway risk. **Do NOT build thin full pages for every SKU** — mention-and-link only. Where a sibling SKU *is* a real plan page, link it directly; otherwise the carrier-eval page is the destination.

### 4. Add contextual in-prose links

Links today are almost all in modules/rails. Add **2–4 in-body contextual links** per plan page inside the prose — e.g. when the copy mentions implant coverage, link the phrase to the implants guide; when it mentions "annual maximum", link to the glossary entry. In-prose links carry strong relevance signals and are weighted by surrounding text.

### 5. Link to the canonical URL only

Every internal link must emit the canonical route from `ppo_plans.plan_page` (nested, trailing-slash — see **doc 02**). No flat `.html` aliases, no slashless variants. This prevents equity leaking through 301 hops or to URLs that get canonicalized away.

### 6. Breadcrumbs to hub + dental-insurance parent

Extend breadcrumbs one level up: `Dental Insurance` → `PPO Plans` → `{Carrier} {Plan}`. Visible breadcrumb and `BreadcrumbList` schema must use the same canonical URLs.

### 7. Generate the cross-link mesh from the DB

Build all module links (alternatives, compare rail, treatment-fit, carrier block, scenario links) at render time from `ppo_plans` + a small treatment/scenario map. This keeps the mesh consistent and self-healing as plans are added or edited — no stale hand-maintained link lists.

### 8. Avoid orphans; keep links-per-page reasonable

Every spoke must be reachable from the hub and from at least one sibling. Keep ~40 links/page (current level is fine) — don't balloon it; relevance beats raw count.

### Linking matrix (which page type links to which)

| From ↓ / To → | Hub | Plan pages | Treatment guides | Scenario pages | Carrier-eval | Glossary | Compare |
|---|---|---|---|---|---|---|---|
| **Hub** | — | All 8 | Yes | Yes | Yes | Yes | Yes |
| **Plan page** | Yes | Siblings + same-carrier | Qualifying ones | Relevant ones | Own carrier | In-prose terms | Pairwise |
| **Treatment guide** | Yes | Plans that qualify | Related guides | Related | — | Yes | Yes |
| **Scenario page** | Yes | Plans that fit | — | — | — | Yes | Yes |
| **Carrier-eval** | Yes | That carrier's plans | — | — | — | Yes | Yes |
| **Glossary** | Yes | — | Contextual | — | — | Cross-terms | — |

## Implementation notes

- Generate the mesh from `ppo_plans` + a static treatment/scenario map (guide → qualifying field/threshold). One source, many consumers (alternatives, treatment-fit, carrier block, scenario links).
- Store an anchor-variant pool per target so the renderer rotates anchors and avoids identical repeated anchor text across pages.
- Ensure guide/scenario/carrier-eval pages render their inbound list of qualifying plans (the *other* half of each bidirectional edge) from the same data.
- All emitted hrefs read `plan_page` (canonical) — depends on **doc 02** landing first.

## Priority & effort

**Priority: P1** (high-leverage; foundation is already strong, this pushes topical authority and equity flow to the money pages). **Effort: Medium** — bidirectional edges, the carrier block, and DB-driven generation are the bulk; anchor variety and in-prose links are light copy work.

## Acceptance criteria

- [ ] Cluster mesh defined; every plan ↔ qualifying treatment guide, plan ↔ carrier-eval, plan ↔ relevant scenario are **bidirectional**.
- [ ] No "click here" / "learn more" anchors; anchors are descriptive, keyword-relevant, and varied across instances.
- [ ] "Other plans from {carrier}" block present (brief mentions + link to carrier-eval); **no thin full SKU pages created**.
- [ ] 2–4 in-prose contextual links per plan page (to guides/glossary).
- [ ] Every internal link points to the canonical `plan_page` URL — no flat `.html` or slashless aliases.
- [ ] Breadcrumbs include the `Dental Insurance` parent + PPO hub, matching canonical URLs in visible trail and schema.
- [ ] Mesh generated from `ppo_plans` + treatment/scenario map; no hand-maintained link lists.
- [ ] No orphan spokes — each reachable from hub + a sibling; ~40 links/page maintained, not inflated.
