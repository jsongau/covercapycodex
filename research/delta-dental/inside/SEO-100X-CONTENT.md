# SEO 100x — Delta Dental Cluster Content Plan
**Goal:** 100x the organic traffic of the `/dental-insurance/ppo-plans/delta-dental/` cluster in ~30 days.
**Baseline (Google Search Console, last 24h, covercapy.com):** ~16 queries, low double-digit impressions, **0 clicks**. Brand-new domain, low authority.
**Author:** Senior SEO content architect · Last reviewed June 2026 · Obeys `_INSIDE-MASTER-BUILD.md` honesty guardrails.

> All facts in this plan respect the master build guardrails: no S&P rating, member count stated as a **range (~78–89M)**, Money = **"Best for Braces"** only, Anduril/specific employers **unverified**, individual prices **~$75 Premium / ~$33 Basic**, waiting periods **6/12 months — varies by state, verify**.

---

## 0. WHAT ALREADY EXISTS (audit, so we build net-new)

**Delta hub + children (live):**
`/delta-dental/` (Inside hub) · `/premium/` · `/compare/` · `/over-65/` (SCAN) · `/uc-students/` ·
`/inside/individual-plans/` · `/inside/networks/` · `/inside/eligibility/` · `/inside/for-dentists/` · `/inside/for-employers/` · `/inside/is-delta-good/`

**Competitor plan pages (live, already built — reuse, do NOT rebuild):**
- `/ppo-plans/humana-extend-5000/` — "Humana Extend 5000: Dental Insurance With Implant Coverage"
- `/ppo-plans/metlife-ncd-complete/` — "NCD Complete by MetLife: $10,000 Maximum Dental Insurance"
- `/ppo-plans/aetna-dental-direct/` — "Aetna Dental Direct: Balanced PPO Coverage on a Large Network"
- `/ppo-plans/ameritas-primestar/` AND `/ppo-plans/ameritas/primestar-care-complete/` (Ameritas PrimeStar Complete)

**City-level Delta dentist pages (live, only 2 metros):**
`/ppo-dentists/california/orange-county/delta-dental/` · `/ppo-dentists/california/inland-empire/delta-dental/`
Sections present: how PPO works · how to verify acceptance · offices accepting Delta · dentists by city · FAQ.

**Tool:** `/find-my-dentist` — accepts `?q=` query param (verified in source).

### ⚠️ Two problems found in the audit (fix these — they cap the ceiling)
1. **Duplicate competitor pages with split canonicals** — both `/humana-extend-5000/` and `/humana/` exist; both `/metlife-ncd-complete/` and `/metlife/ncd-complete/` exist; both Ameritas paths exist; same for Aetna. They each self-canonical, so they **compete with each other** for the exact queries GSC shows us. Pick ONE canonical per plan, 301 (or canonical-tag) the other to it. Otherwise every link we build is split in half.
2. **Competitor plan pages have ZERO links to the Delta cluster** (grep: 0 `delta-dental` mentions on all three). The funnel from "researching a competitor plan" → "Delta hub / find-my-dentist" does not exist yet. This is free traffic redirection we are leaving on the table.

---

## 1. QUERY INTENT DECODE

The 16 GSC queries cluster into **4 intent buckets**. Every one is **ranking-but-0-click** — we surface in the index but do not earn the click. With this few impressions on a new domain, that pattern = **page-2/3 positions + titles that don't match the searcher's words**. The fix is two-pronged: (a) move up with on-topic pages + internal links + schema, and (b) rewrite titles/metas so the few impressions we DO get convert.

| Bucket | Queries (impressions) | Intent | Our move |
|---|---|---|---|
| **A. Near-me / local Delta** (HIGHEST 100x lever) | `delta dentist near me` (1), `dentist that take delta dental near me` (1), `delta dentist` (1) | "Find a dentist who takes Delta near me, now." Transactional, local, bottom-funnel. | New near-me landing page + programmatic `Delta dentists in {city}` pages → `/find-my-dentist?q=`. §2 |
| **B. Competitor plan-name research** | `humana extend 5000` (5), `ncd complete by metlife` (6), `aetna dental direct preferred ppo` (6), `primestar care complete` (1) | "Tell me about THIS specific plan." Mid-funnel, comparison-ready, high commercial intent. | Pages already exist — fix titles, add "vs Delta" angle, funnel to Delta hub. §3 |
| **C. Brand Delta** | `delta dental` (1), `delta dentist` (1) | Generic brand. Huge volume nationally; we rank deep. Authority play, slow. | Hub CTR rewrite + internal links + schema. §4–5 |
| **D. Off-cluster / noise** | `dentistry on the village green` (4), `what can it do` (1), `primestar care complete` (1) | A specific practice name + junk. Not Delta-cluster targets. | Ignore for this sprint (note: "dentistry on the village green" is a dentist-profile/practice query — handled by generated dentist pages, not this cluster). |

**Implication of the 0-click pattern:** We are NOT being filtered out — Google is testing us on these queries. That is the easiest possible state to improve from. Title/meta rewrites (§4) can produce clicks **this week** with no ranking change, and the near-me + competitor-funnel work (§2–3) lifts position over the 30 days. Buckets A and B carry the volume; C is the long game.

---

## 2. THE NEAR-ME PLAY (biggest 100x lever)

"Dentist that takes Delta near me" is the highest-commercial-intent, highest-volume query family in dental insurance and we already surface for it. We own a dentist database + a `/find-my-dentist` tool + city pages — we are positioned to win this and almost no insurance-comparison site is.

### 2a. New hub landing page (the canonical "near me" target)

- **URL:** `/dental-insurance/ppo-plans/delta-dental/find-a-dentist/`
  (lives inside the Delta cluster so it inherits hub authority and the cluster nav)
- **Title (≤60 char target, keyword-front):**
  `Find a Dentist Who Takes Delta Dental Near You | CoverCapy`
- **Meta description:**
  `Search dentists who accept Delta Dental PPO and Premier near you. Filter by your plan, verify acceptance free before you book, and map in-network offices in your city. Updated June 2026.`
- **H1:** `Find a dentist who takes Delta Dental near you`
- **Primary CTA:** embedded `/find-my-dentist?carrier=delta-dental&q={geo}` search box at the top (above the fold), prefilled to Delta. Secondary CTA: "Verify my Delta dentist — free."

**On-page sections (answer-first, scannable):**
1. **Search box (hero)** — geo-aware input wired to `/find-my-dentist?q=` (carrier=Delta preset).
2. **"How to confirm a dentist takes Delta Dental"** — 3 steps: check Delta's directory, call the office, or verify free here. Distinguishes **PPO vs Premier** participation (cross-link `/inside/networks/`).
3. **"Delta has two networks — make sure your dentist is in YOURS"** — PPO (best savings) vs Premier (larger, higher cost). Links `/inside/networks/`.
4. **"Browse Delta dentists by state / metro"** — `ItemList` of the programmatic city pages (§2b) as they ship.
5. **"What if my dentist isn't in-network?"** — out-of-network reimbursement + cost note → `/premium/` and `/compare/`.
6. **FAQ** (static-rendered, mirrors schema): "How do I find a dentist that takes Delta Dental near me?" · "Is my dentist Delta PPO or Premier?" · "Can I see any dentist with Delta PPO?" · "Does CoverCapy verify acceptance for free?"

**Schema (JSON-LD, all present and parsing):**
- `WebPage` (lastReviewed June 2026, reviewedBy J Song) + `BreadcrumbList` (Delta hub → Find a dentist).
- `FAQPage` — the 4 FAQs above, visible text == schema.
- `ItemList` — the Delta-by-city pages (updates as §2b ships).
- The `/find-my-dentist` results themselves continue to emit `LocalBusiness`/`Dentist` per office (no change needed there).

**Internal links IN:** Delta hub pillar card "Find a Delta dentist near you" · every `/inside/*` page footer · every competitor page funnel block (§3) · city Delta pages.
**Internal links OUT:** `/find-my-dentist`, `/inside/networks/`, `/inside/eligibility/`, city Delta pages.

### 2b. Programmatic "Delta dentists in {city}" pages (scale lever)

The data supports this — we already have 2 live CA metro Delta pages with the right template. Expand programmatically from the dentist DB (offices where `insurance_networks` contains a Delta carrier).

- **URL pattern:** `/ppo-dentists/{state}/{metro}/delta-dental/` (existing pattern — keep it).
- **Title:** `Delta Dental Dentists in {Metro}, {ST} | Verify Acceptance Free | CoverCapy`
- **H1:** `Dentists who take Delta Dental in {Metro}, {ST}`
- **Generate for:** every metro/city where we have ≥3 Delta-accepting offices in the DB. Prioritize by population (LA, SD, SF, Sacramento, then TX/FL/NY metros as data allows). Target **50–150 pages in month 1** — this is the volume engine.
- **Each page:** intro (PPO vs Premier note) → office cards (link to T5 dentist profiles) → "dentists by city" sub-list → city-scoped FAQ → CTA to `/find-my-dentist?q={city}`.
- **Add the missing link:** current city Delta pages have **0 links to `/find-my-dentist`** — add a prominent "Search all Delta dentists in {Metro} →" button wired to `?q={city}`. (Fix in the generator, not by hand.)
- **Schema per page:** `ItemList` of offices + `BreadcrumbList` + city `FAQPage`.
- **Roll up** all city pages into the §2a `find-a-dentist` ItemList and the sitemap.

**Why this is the 100x:** 100+ long-tail "delta dentist in {city}" pages, each near-zero competition, each internally linked to one strong near-me hub — that is how a new domain compounds local impressions into clicks within weeks.

---

## 3. COMPETITOR PLAN-NAME CAPTURE

The four highest-impression queries are competitor plan names, and **we already rank for them on existing pages**. We do NOT need new pages — we need to (a) fix the duplicate-canonical split, (b) sharpen titles to match the searched string, and (c) add a "vs Delta" angle + funnel block so competitor researchers flow into the Delta hub / find-my-dentist.

| Query (impr) | Existing page (canonicalize to ONE) | Action |
|---|---|---|
| `ncd complete by metlife` (6) | `/ppo-plans/metlife-ncd-complete/` (kill/redirect `/metlife/ncd-complete/`) | Title + vs-Delta block + funnel |
| `aetna dental direct preferred ppo` (6) | `/ppo-plans/aetna-dental-direct/` | Title fix: add "Preferred PPO" exact string + funnel |
| `humana extend 5000` (5) | `/ppo-plans/humana-extend-5000/` | Title + vs-Delta block + funnel |
| `primestar care complete` (1) | `/ppo-plans/ameritas-primestar/` (canonicalize the `/ameritas/primestar-care-complete/` dup into it) | Title fix to exact "PrimeStar Care Complete" + funnel |

**No new dedicated pages required** — but DO add to each competitor page:
1. **A "{Plan} vs Delta Dental" comparison section** (~150 words + a 4-row table: annual max, implants/ortho, network size, monthly cost). Honest, balanced. Each links to `/delta-dental/compare/` and `/delta-dental/`.
2. **A funnel CTA block** at the end: "Comparing carriers? See how this stacks up against the largest network → **Inside Delta Dental**" + "Find a dentist who takes either plan → **find-my-dentist**".

**Recommended title rewrites (exact strings, match the searched query):**
- Aetna: `<title>Aetna Dental Direct Preferred PPO: Coverage, Cost & Network | CoverCapy</title>` (was missing "Preferred PPO" — the literal query).
- MetLife NCD: `<title>NCD Complete by MetLife: $10,000-Max Dental Insurance Reviewed | CoverCapy</title>`
- Humana: `<title>Humana Extend 5000 Review: Dental With Implant Coverage | CoverCapy</title>`
- Ameritas: `<title>PrimeStar Care Complete (Ameritas): No-Wait Dental Reviewed | CoverCapy</title>`

> Guardrail check: keep NCD's $10,000 max, Ameritas no-wait/day-one, Aetna ~$1,250 / 100-80-50, Humana implant+vision+hearing as already written and verified. The vs-Delta tables use Delta facts from the master build only (~$75/$2,000 Premium; ~$33/$1,000 Basic; 6/12-mo waits vary by state; ~78–89M members; "Best for Braces").

---

## 4. CTR FIX — title + meta rewrites (ship this week, no ranking change needed)

The hub and the cluster pages most likely to be catching brand impressions. Rewrites front-load the searched words and add a click trigger ("free," "near you," "honest," a number).

### Hub — `/delta-dental/`
Current title is feature-listy and buries the verb. Lead with what the searcher wants.
```
<title>Delta Dental Plans, Networks & Reviews — Find a Dentist | CoverCapy</title>
<meta name="description" content="Inside Delta Dental, the largest U.S. dental network (about 78–89 million members). Compare individual Premium and Basic plans, understand PPO vs Premier vs DeltaCare, read an honest review, and find a dentist who takes Delta near you — verify free.">
```

### `/inside/eligibility/` (catches "which delta", verification intent)
```
<title>Which Delta Dental Do I Have? Find Your Plan & Verify | CoverCapy</title>
<meta name="description" content="Delta Dental is 39 companies, so your portal, payer ID and claims address depend on your state. Find your Delta company, log in, and check your benefits and dentist in minutes. Updated June 2026.">
```

### `/inside/individual-plans/` (catches "delta dental plans/cost")
```
<title>Delta Dental Individual Plans & Cost: Premium vs Basic | CoverCapy</title>
<meta name="description" content="Delta Dental sells two individual PPO tiers: Premium (about $75/mo, $2,000 max, adds implants and adult braces) and Basic (about $33/mo, $1,000 max, preventive and basic only). See which fits and find a dentist who takes it.">
```

### `/inside/is-delta-good/` (catches "is delta dental good")
```
<title>Is Delta Dental Good Insurance? An Honest 2026 Review | CoverCapy</title>
<meta name="description" content="Is Delta Dental worth it? An honest scorecard: the largest network and strong AM Best financial strength, weighed against mixed service reviews and waiting periods that vary by state. Ratings, complaints, and a balanced verdict.">
```

> Rules followed: ≤~60-char visible titles where possible, member count as a range, AM Best only (no S&P), prices ~$75/~$33, waits "vary by state," no em-dashes (en-dashes used only inside number ranges per existing site style — swap to "to" if the no-dash rule is strict on titles).

---

## 5. INTERNAL LINKING MAP (hub-and-spoke)

**Spoke model:** `/delta-dental/` (hub) ⟷ each child, AND a new lateral spine through the **near-me page** and **find-my-dentist** so transactional intent always has one click to convert.

```
                    ┌────────────────────────────────────────┐
                    │   /delta-dental/  (Inside hub)          │
                    └────────────────────────────────────────┘
   ▲reciprocal links to/from each child (already present)
   ├── /premium/         ├── /compare/        ├── /over-65/
   ├── /uc-students/      ├── /inside/individual-plans/
   ├── /inside/networks/  ├── /inside/eligibility/
   ├── /inside/for-dentists/  ├── /inside/for-employers/
   ├── /inside/is-delta-good/
   └── ★ NEW /find-a-dentist/  ──►  /find-my-dentist?q=
                                 ──►  /ppo-dentists/{state}/{metro}/delta-dental/ (×N programmatic)

   Competitor pages (humana-extend-5000, metlife-ncd-complete,
   aetna-dental-direct, ameritas-primestar)  ──► funnel block ──► hub + /find-a-dentist/
```

**Anchor-text recommendations (varied, descriptive, keyword-bearing):**
- To hub: "Inside Delta Dental", "Delta Dental plans and networks" (avoid bare "click here").
- To near-me page: **"find a dentist who takes Delta Dental near you"** (exact bottom-funnel phrase — use on hub pillar card, every `/inside/*` footer, every city page, every competitor funnel block).
- To `/find-my-dentist`: "verify your Delta dentist free", "search Delta dentists in {city}".
- To `/inside/networks/`: "Delta PPO vs Premier", "is my dentist Delta PPO or Premier".
- To `/inside/eligibility/`: "which Delta Dental do I have", "check your Delta benefits".
- To `/compare/`: "how Delta compares to {competitor}".

**Where to add contextual links (net-new):**
1. **Every `/inside/*` page** — footer rail "Find a Delta dentist near you" → `/find-a-dentist/` (currently missing).
2. **Hub pillar grid** — add an 11th card "Find a Delta dentist near you" as the first/primary card.
3. **City Delta pages** — add "Search all Delta dentists in {metro}" → `/find-my-dentist?q={city}` (currently 0 links to the tool — fix in generator).
4. **Competitor pages** — the vs-Delta + funnel blocks from §3 (currently 0 Delta links).
5. **`/find-my-dentist`** results page — when carrier filter = Delta, surface a contextual "Learn about Delta Dental plans" link back to the hub (closes the loop).

---

## 6. CONTENT GAPS — high-intent Delta sub-topics not yet covered

Each becomes a new section on an existing page OR a new spoke. Target query + URL below. (Facts must stay inside guardrails.)

| # | Topic / target query | Build as | Suggested URL |
|---|---|---|---|
| 1 | "find a dentist who takes delta dental near me" | **New page** (§2a) | `/delta-dental/find-a-dentist/` |
| 2 | "delta dentists in {city}" (×N) | **Programmatic** (§2b) | `/ppo-dentists/{state}/{metro}/delta-dental/` |
| 3 | "how much does delta dental cost" | New page (cost calculator angle) | `/delta-dental/cost/` |
| 4 | "delta dental waiting period" | New page (6/12-mo, varies by state) | `/delta-dental/waiting-period/` |
| 5 | "delta dental implant / does delta cover implants" | New page (Premium 50%, varies by state) | `/delta-dental/implants/` |
| 6 | "does delta dental cover braces / adult orthodontics" | New page (Premium adult ortho; "Best for Braces") | `/delta-dental/braces/` |
| 7 | "delta dental annual maximum explained" | Section on `/individual-plans/` + new page | `/delta-dental/annual-maximum/` |
| 8 | "deltacare usa vs delta dental ppo" (HMO confusion) | Already in `/inside/networks/` — add a standalone explainer + redirect-magnet | `/delta-dental/deltacare-usa/` |
| 9 | "delta dental customer service / phone number / login" | Section on `/inside/eligibility/` (high-intent, easy win) | `/inside/eligibility/#contact-login` |
| 10 | "is delta dental ppo or premier better for me" | Section/quiz on `/inside/networks/` | `/inside/networks/#which-network` |
| 11 | "delta dental vs metlife / vs guardian / vs cigna" (×N) | Comparison pages (mirror `/compare/` children) | `/delta-dental/compare/vs-{carrier}/` |
| 12 | "delta dental for individuals no employer / self-employed" | Section on `/individual-plans/` | `/individual-plans/#self-employed` |
| 13 | "does delta dental cover root canals / crowns / dentures" | Procedure-coverage page (ties to Benefit Maxing hub) | `/delta-dental/what-is-covered/` |
| 14 | "delta dental open enrollment / how to enroll" | Enrollment how-to | `/delta-dental/how-to-enroll/` |
| 15 | "delta dental medicare advantage / over 65" | Already `/over-65/` (SCAN) — broaden beyond SCAN to general MA-dental, keep SCAN verified facts only | `/over-65/` (expand) |

> Highest ROI in this list: #1, #2 (the 100x engine), then #5/#6/#3/#4 (procedure + cost queries have enormous volume and we have the facts already in the briefs).

---

## 7. 30-DAY PRIORITY SEQUENCE (by impact ÷ effort)

| # | Action | Impact | Effort | Window |
|---|---|---|---|---|
| 1 | **Rewrite titles/metas** — hub + eligibility + individual-plans + is-delta-good + 4 competitor pages (§3–4). Pure CTR, no ranking change, results in days. | ★★★★★ | XS | Days 1–2 |
| 2 | **Fix duplicate-canonical split** on competitor pages (pick one URL per plan, 301/canonical the dup). Un-splits all the link equity. | ★★★★★ | S | Days 1–3 |
| 3 | **Add Delta funnel block + "vs Delta" section** to the 4 competitor pages (§3). Redirects existing competitor impressions into the cluster. | ★★★★★ | S | Days 3–5 |
| 4 | **Build `/delta-dental/find-a-dentist/`** near-me hub page (§2a) with FAQ + ItemList schema, wired to `/find-my-dentist?q=`. | ★★★★★ | M | Days 4–8 |
| 5 | **Add `/find-my-dentist` links to existing city Delta pages** + an 11th hub pillar card → near-me page (generator fix, §5). | ★★★★☆ | S | Days 6–9 |
| 6 | **Generate 50–150 programmatic `Delta dentists in {city}` pages** (§2b), roll into sitemap + ItemList. The volume engine. | ★★★★★ | M–L | Days 8–18 |
| 7 | **Build `/delta-dental/implants/` + `/braces/` + `/cost/`** procedure/cost pages (gaps #5,#6,#3) — huge query volume, facts already in briefs. | ★★★★☆ | M | Days 12–20 |
| 8 | **Build `/delta-dental/waiting-period/`** (#4) — single-question page, fast, high intent ("varies by state"). | ★★★☆☆ | S | Days 16–20 |
| 9 | **Add contextual `/find-a-dentist/` links to every `/inside/*` footer** + close the loop from find-my-dentist back to the hub (§5). | ★★★★☆ | S | Days 18–22 |
| 10 | **Submit updated sitemap + request indexing** in GSC for all new URLs; re-pull GSC at day 28 to confirm position lift on the 16 baseline queries and new near-me/city impressions. | ★★★★☆ | XS | Days 22–30 |

**Success signal at day 30:** baseline 16 queries → hundreds of impressing queries (driven by city pages), first clicks on the rewritten titles within the first week, and the near-me + competitor-funnel pages converting impressions to `/find-my-dentist` sessions. The compounding comes from #6 (programmatic city pages) feeding the strong near-me hub (#4) — that pairing is the 100x.

---

### Build-discipline reminders (from CLAUDE.md + master build)
- City/dentist pages are **generated** — make changes in the generator, never hand-edit `/ppo-dentists/` or `/dental/` output.
- Every new cluster page: J Song review byline + "Last reviewed June 2026" + Sources block + parsing JSON-LD + visible-text == FAQ schema + cluster mega-nav + no em-dashes/arrows/banned words.
- Add every new URL to the sitemap.
