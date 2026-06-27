# 04 — IA, URL Architecture, and Migration Plan
## PPO Plans Hub Rebuild | CoverCapy | Draft: 2026-06-26

**Status:** PLANNING ONLY. No production changes until user sign-off on all flagged decisions below.

---

## 1. Existing URL Inventory (as of 2026-06-26)

### Live canonical pages (indexed or indexable)

| URL | File | Role | Priority in sitemap |
|-----|------|------|---------------------|
| `/dental-insurance/` | `dental-insurance/index.html` | T2 dental insurance hub | 0.8 (sitemap-content.xml) |
| `/dental-insurance/ppo-plans/` | `dental-insurance/ppo-plans/index.html` | PPO plans hub (target of rebuild) | 0.8 (sitemap-content.xml, no trailing slash) |
| `/compare-ppo-dental-plans` | `compare-ppo-dental-plans.html` | Comparison page (flat root file) | 0.9 (sitemap.xml) |
| `/dental-insurance/ppo-plans/aetna-dental-direct/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/ameritas-primestar/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/guardian-premier-ppo/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/humana-extend-5000/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/metlife-ncd-complete/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | folder index | Plan page | 0.7 |
| `/dental-insurance/ppo-plans/uhc-primary-dental/` | folder index | Plan page | 0.7 |
| `/dental-insurance/delta-dental/` | folder index | Delta silo hub (separate from ppo-plans) | 0.8 |
| `/dental-insurance/delta-dental/premium/` | folder index | Delta Premium detail | (in delta silo) |
| `/dental-insurance/guardian-orthodontics-coverage/` | folder index | Guardian ortho guide | (unlisted) |

### Legacy / old-path URLs already 301d in vercel.json

| Old URL | Destination |
|---------|-------------|
| `/dental-insurance/ppo-plans/humana/extend-5000` | `/dental-insurance/ppo-plans/humana-extend-5000` |
| `/dental-insurance/ppo-plans/metlife/ncd-complete` | `/dental-insurance/ppo-plans/metlife-ncd-complete` |
| `/dental-insurance/ppo-plans/ameritas/primestar-care-complete` | `/dental-insurance/ppo-plans/ameritas-primestar` |
| `/dental-insurance/ppo-plans/aetna/dental-direct` | `/dental-insurance/ppo-plans/aetna-dental-direct` |
| `/dental-insurance/ppo-plans/delta-dental` (and sub-paths) | `/dental-insurance/delta-dental` (and sub-paths) |
| `/ppo-dental-plans/unitedhealthcare-primary-dental` | `/dental-insurance/ppo-plans/uhc-primary-dental/` |
| `/ppo-dental-plans/:rest*` | `/compare-ppo-dental-plans` |
| `/best-dental-insurance:rest*` | `/compare-ppo-dental-plans` |
| `/compare`, `/compare-ppo`, `/compare-ppo-plans`, `/compare-dental-plans`, `/compare-dental-insurance`, `/ppo-plans`, `/ppo-dental-plans`, `/ppo-dental-insurance`, `/dental-ppo-plans`, `/dental-insurance-plans`, `/best-ppo-dental-plans` | `/compare-ppo-dental-plans.html` |

### Physical stale files on disk (have canonical counterparts, 301s in place)

These files exist under `dental-insurance/ppo-plans/` but are legacy and should not be indexed. They are currently orphaned (no internal links to them) and only visible if someone crawls the file system:

- `dental-insurance/ppo-plans/aetna/dental-direct/index.html`
- `dental-insurance/ppo-plans/ameritas/primestar-care-complete/index.html`
- `dental-insurance/ppo-plans/delta/ppo-premium/index.html`
- `dental-insurance/ppo-plans/guardian/premier-2-0/index.html`
- `dental-insurance/ppo-plans/humana/extend-5000/index.html`
- `dental-insurance/ppo-plans/metlife/ncd-complete/index.html`
- `dental-insurance/ppo-plans/mutual-of-omaha/dental-preferred/index.html`
- `dental-insurance/ppo-plans/uhc/primary-dental/index.html`
- `dental-insurance/ppo-plans/dd.html` (scratch file)
- `dental-insurance/ppo-plans/ameritas-primestar/rct_index.html`
- `dental-insurance/ppo-plans/uhc-primary-dental/rct_index.html`

**FLAG-01 (needs sign-off):** Should the stale physical files and rct_ variants be deleted from disk before next deployment? Recommendation: yes, delete them. They are served only if Vercel falls through the redirect chain, and their existence creates indexation risk. The 301s in vercel.json already handle all incoming links. Deletion requires a `git rm` pass and a new deploy.

---

## 2. Target Information Architecture

### Full URL tree (target state)

```
/                                                    (homepage, out of scope)
|
+-- /dental-insurance/                               T2: Dental Insurance Hub
|   |
|   +-- /dental-insurance/ppo-plans/                 T3: PPO Plans Hub (REBUILT)
|   |   |
|   |   +-- /dental-insurance/ppo-plans/compare/     T3a: Compare PPO Plans page
|   |   |   (either a physical move or a virtual node via breadcrumb only -- see Section 4)
|   |   |
|   |   +-- /dental-insurance/ppo-plans/aetna-dental-direct/
|   |   +-- /dental-insurance/ppo-plans/ameritas-primestar/
|   |   +-- /dental-insurance/ppo-plans/delta-dental-ppo-premium/
|   |   +-- /dental-insurance/ppo-plans/guardian-premier-ppo/
|   |   +-- /dental-insurance/ppo-plans/humana-extend-5000/
|   |   +-- /dental-insurance/ppo-plans/metlife-ncd-complete/
|   |   +-- /dental-insurance/ppo-plans/mutual-of-omaha-dental/
|   |   +-- /dental-insurance/ppo-plans/uhc-primary-dental/
|   |
|   +-- /dental-insurance/delta-dental/              (existing Delta silo, unchanged)
|   |   +-- /dental-insurance/delta-dental/compare/
|   |   +-- /dental-insurance/delta-dental/eligibility/
|   |   +-- /dental-insurance/delta-dental/find-a-dentist/
|   |   +-- /dental-insurance/delta-dental/for-dentists/
|   |   +-- /dental-insurance/delta-dental/for-employers/
|   |   +-- /dental-insurance/delta-dental/individual-plans/
|   |   +-- /dental-insurance/delta-dental/is-delta-good/
|   |   +-- /dental-insurance/delta-dental/networks/
|   |   +-- /dental-insurance/delta-dental/over-65/
|   |   +-- /dental-insurance/delta-dental/premium/
|   |   +-- /dental-insurance/delta-dental/uc-students/
|   |
|   +-- /dental-insurance/guardian-orthodontics-coverage/   (existing, unchanged)
|   +-- /dental-insurance/metlife/find-a-dentist/           (existing, unchanged)
|
+-- /compare-ppo-dental-plans                       (see Section 4 for decision)
```

---

## 3. Breadcrumb Chains for Every Page Type

All breadcrumbs follow the `BreadcrumbList` JSON-LD schema. Separator used in rendered UI: ` / ` (no em-dash). Positions are 1-indexed.

### T2: Dental Insurance Hub (`/dental-insurance/`)

```
Home (/) > Dental Insurance
```

JSON-LD positions:
1. Home -- `https://www.covercapy.com/`
2. Dental Insurance -- `https://www.covercapy.com/dental-insurance/`

### T3: PPO Plans Hub (`/dental-insurance/ppo-plans/`)

```
Home (/) > Dental Insurance > PPO Dental Plans
```

JSON-LD positions:
1. Home -- `https://www.covercapy.com/`
2. Dental Insurance -- `https://www.covercapy.com/dental-insurance/`
3. PPO Dental Plans -- `https://www.covercapy.com/dental-insurance/ppo-plans/`

### T3a: Compare PPO Plans page (decision-dependent -- see Section 4)

Option A (physical move to `/dental-insurance/ppo-plans/compare/`):
```
Home > Dental Insurance > PPO Dental Plans > Compare Plans
```
JSON-LD positions:
1. Home -- `https://www.covercapy.com/`
2. Dental Insurance -- `https://www.covercapy.com/dental-insurance/`
3. PPO Dental Plans -- `https://www.covercapy.com/dental-insurance/ppo-plans/`
4. Compare PPO Dental Plans -- `https://www.covercapy.com/dental-insurance/ppo-plans/compare/`

Option B (keep URL `/compare-ppo-dental-plans`, only change rendered breadcrumb and schema):
```
Home > Dental Insurance > PPO Dental Plans > Compare Plans
```
JSON-LD positions: same as Option A above, but `item` for position 4 points to `https://www.covercapy.com/compare-ppo-dental-plans`.

Note: In Option B, the breadcrumb schema's `item` URL for the parent (position 3) is `/dental-insurance/ppo-plans/` even though the page does not live under that path. Google accepts virtual breadcrumb parents; the `@id` and `item` in position 4 must match the page's canonical.

### T4: Individual Plan Pages (`/dental-insurance/ppo-plans/{plan-slug}/`)

```
Home > Dental Insurance > PPO Dental Plans > {Plan Name}
```

Example for Aetna:
```
Home > Dental Insurance > PPO Dental Plans > Aetna Dental Direct
```
JSON-LD positions:
1. Home -- `https://www.covercapy.com/`
2. Dental Insurance -- `https://www.covercapy.com/dental-insurance/`
3. PPO Dental Plans -- `https://www.covercapy.com/dental-insurance/ppo-plans/`
4. Aetna Dental Direct -- `https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/`

Same pattern for all 8 plan pages. The `{Plan Name}` values:

| Plan slug | BreadcrumbList name |
|-----------|---------------------|
| `aetna-dental-direct` | Aetna Dental Direct |
| `ameritas-primestar` | Ameritas PrimeStar Care Complete |
| `delta-dental-ppo-premium` | Delta Dental PPO Premium |
| `guardian-premier-ppo` | Guardian Premier PPO |
| `humana-extend-5000` | Humana Extend 5000 |
| `metlife-ncd-complete` | MetLife NCD Complete |
| `mutual-of-omaha-dental` | Mutual of Omaha Dental Preferred |
| `uhc-primary-dental` | UnitedHealthcare Primary Dental |

### Delta silo pages (unchanged, shown for completeness)

```
Home > Dental Insurance > Delta Dental > {Sub-page}
```

JSON-LD positions:
1. Home -- `https://www.covercapy.com/`
2. Dental Insurance -- `https://www.covercapy.com/dental-insurance/`
3. Delta Dental -- `https://www.covercapy.com/dental-insurance/delta-dental/`
4. {Sub-page name} -- `https://www.covercapy.com/dental-insurance/delta-dental/{sub-slug}/`

---

## 4. Decision: Physical Move vs. Virtual Breadcrumb for `/compare-ppo-dental-plans`

### Current state

`/compare-ppo-dental-plans` is a flat HTML file at the repo root. It holds:
- Priority 0.9 in `sitemap.xml` (highest of any non-homepage content page)
- 15+ 301 redirects pointing TO it from short vanity paths (`/compare`, `/compare-ppo`, `/best-dental-insurance`, etc.)
- An ItemList schema listing all 8 plan pages
- A BreadcrumbList schema already declaring "Home > Dental Insurance > Compare PPO Dental Plans" (no `/ppo-plans/` ancestor yet)
- Inbound links from `dental-insurance/ppo-plans/index.html` and plan pages

The 00-INDEX asks for this page to become a child of `/ppo-plans/` in the breadcrumb.

### Option A: Physical move to `/dental-insurance/ppo-plans/compare/`

**What it involves:**
- Create `dental-insurance/ppo-plans/compare/index.html` (move content)
- Add 301 in `vercel.json`: `/compare-ppo-dental-plans` to `/dental-insurance/ppo-plans/compare/`
- Update canonical to `https://www.covercapy.com/dental-insurance/ppo-plans/compare/`
- Update all 15 vanity redirects in `vercel.json` to point to the new URL (or chain through the one 301)
- Update all internal links that reference `/compare-ppo-dental-plans`
- Update sitemaps (remove old entry, add new)

**SEO tradeoffs:**

Pros:
- URL matches breadcrumb hierarchy: `/dental-insurance/ppo-plans/compare/` is a genuine child of `/ppo-plans/`
- Consolidates the compare page inside the PPO Plans silo, strengthening topical authority signals for `/dental-insurance/ppo-plans/`
- Cleaner crawl path for Googlebot: the compare page shares the same directory as plan pages, so crawl from the PPO hub naturally surfaces it
- Eliminates the dissonance between the URL (`/compare-ppo-dental-plans` at root) and its breadcrumb position (under `/ppo-plans/`)
- Future-proof: if a second compare page (e.g., `/dental-insurance/hmo-plans/compare/`) is ever added, the pattern is established

Cons:
- 301 redirect from the old URL loses a small amount of PageRank (estimated 5-10%), though Google has stated the loss is minimal for permanent redirects
- All 15 vanity redirects need updating or chaining (adds complexity to `vercel.json`, risk of misconfiguration)
- Any external backlinks to `/compare-ppo-dental-plans` pass through a redirect hop; if there are high-DA links, this is a real (small) cost
- The old URL has been live since at least January 2026. Google Search Console data, ranking history, and click data are attached to that URL. A physical move resets GSC position reporting temporarily (URL change tool in GSC required)
- Risk window: during the period between deploy and full Google re-crawl (1-4 weeks), ranking volatility is possible

**FLAG-02 (needs sign-off):** Before committing to Option A, check Google Search Console for: (a) current impressions/clicks on `/compare-ppo-dental-plans`, (b) any external backlinks (use Ahrefs or GSC Links report), (c) current ranking positions for "compare ppo dental plans" and related queries. If the page is ranking in positions 1-5 for any high-volume query, the risk cost of Option A rises significantly.

### Option B: Keep URL, change only breadcrumb and schema

**What it involves:**
- Edit `compare-ppo-dental-plans.html` to update the BreadcrumbList JSON-LD: add `/dental-insurance/ppo-plans/` as position 3, make the compare page position 4
- Update the rendered breadcrumb UI to show the 4-level chain
- Keep all existing redirects, canonical, and sitemap entries unchanged
- Update internal links from the PPO hub and plan pages to reference the compare page correctly

**SEO tradeoffs:**

Pros:
- Zero URL change: no redirect chain, no GSC disruption, no ranking volatility risk
- All 15 vanity redirects keep working with zero edits
- Preserves full PageRank on the existing URL
- Can be done in one file edit; no vercel.json changes needed

Cons:
- The URL and the breadcrumb disagree. Google may or may not trust the breadcrumb over the URL path. In practice Google usually honors BreadcrumbList schema even when it contradicts the URL structure, but this is a soft signal vs. a hard structural signal
- The page remains a root-level flat file, which weakens directory-based topical clustering. Googlebot crawling `/dental-insurance/ppo-plans/` does not naturally discover `/compare-ppo-dental-plans` in the same directory crawl
- Creates a long-term maintenance debt: every future IA refactor must remember this page is "logically" under `/ppo-plans/` but physically at root
- SEO tools (Screaming Frog, Ahrefs site audit) will flag the breadcrumb-URL mismatch

### Recommendation

**Option B is the lower-risk default for launch.** Implement Option A only after confirming in GSC that the compare page has no significant organic ranking positions worth protecting, or after a minimum 6-month observation period post-rebuild in which `/dental-insurance/ppo-plans/` establishes authority in its own right.

A hybrid approach is workable: implement Option B at launch, then migrate to Option A in a future sprint once GSC data confirms the /ppo-plans/ hub is indexing and ranking well.

**FLAG-03 (needs sign-off):** Confirm which option to implement at launch (A or B). This document provides the exact redirect rules for Option A in Section 5 so either can be deployed with minimal lead time.

---

## 5. Exact 301 Redirect Rules for vercel.json (Option A only)

If Option A is chosen (physical move to `/dental-insurance/ppo-plans/compare/`), add the following redirects to `vercel.json`. Insert them BEFORE the existing block of vanity redirects that currently point to `/compare-ppo-dental-plans.html`, so the more-specific rules fire first.

```json
{
  "source": "/compare-ppo-dental-plans",
  "destination": "/dental-insurance/ppo-plans/compare/",
  "permanent": true
},
{
  "source": "/compare-ppo-dental-plans.html",
  "destination": "/dental-insurance/ppo-plans/compare/",
  "permanent": true
}
```

Then update all 15 existing vanity redirects to point directly to `/dental-insurance/ppo-plans/compare/` rather than chaining through `/compare-ppo-dental-plans`. Replace destination value in each of these sources:

```
/compare
/compare-ppo
/compare-ppo-plans
/compare-dental-plans
/compare-dental-insurance
/ppo-plans
/ppo-dental-plans
/ppo-dental-insurance
/dental-ppo-plans
/dental-insurance-plans
/best-ppo-dental-plans
/best-dental-insurance:rest*
/best-dental-insurance-for-:rest*
/ppo-dental-plans/:rest*
```

New destination for all of the above: `/dental-insurance/ppo-plans/compare/`

Also update the catch-all `/ppo-dental-plans/:rest*` destination so it does not chain:

```json
{
  "source": "/ppo-dental-plans/:rest*",
  "destination": "/dental-insurance/ppo-plans/compare/",
  "permanent": true
}
```

**FLAG-04 (needs sign-off):** The source `/ppo-plans` currently redirects to `/compare-ppo-dental-plans.html`. Under Option A this would redirect to `/dental-insurance/ppo-plans/compare/` -- which could confuse users expecting the PPO hub index. Consider whether `/ppo-plans` should instead redirect to `/dental-insurance/ppo-plans/` (the hub) rather than the compare sub-page. The current behavior is a legacy decision worth revisiting regardless of which option is chosen.

---

## 6. Canonical Strategy

### Rule: one canonical per URL, no self-referencing loops

Every page must have exactly one `<link rel="canonical">` pointing to itself, using the full absolute URL with trailing slash for directory pages. `vercel.json` has `trailingSlash: false`, which means Vercel strips trailing slashes from URLs before serving -- but HTML files inside named folders (`/ppo-plans/index.html`) are served at `/dental-insurance/ppo-plans/` with the trailing slash via directory resolution. The canonical in the HTML should match the actual served URL.

Current trailing-slash inconsistency in `sitemap.xml` (some plan pages listed with slash, some without) should be corrected -- see Section 7.

### Canonical table (target state)

| Page | Canonical |
|------|-----------|
| Dental Insurance hub | `https://www.covercapy.com/dental-insurance/` |
| PPO Plans hub | `https://www.covercapy.com/dental-insurance/ppo-plans/` |
| Compare page (Option B) | `https://www.covercapy.com/compare-ppo-dental-plans` |
| Compare page (Option A) | `https://www.covercapy.com/dental-insurance/ppo-plans/compare/` |
| Aetna plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/aetna-dental-direct/` |
| Ameritas plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/ameritas-primestar/` |
| Delta Dental PPO Premium | `https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental-ppo-premium/` |
| Guardian plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/guardian-premier-ppo/` |
| Humana plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/humana-extend-5000/` |
| MetLife plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/metlife-ncd-complete/` |
| Mutual of Omaha plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/mutual-of-omaha-dental/` |
| UHC plan page | `https://www.covercapy.com/dental-insurance/ppo-plans/uhc-primary-dental/` |

### Legacy/old paths

All legacy paths (`/ppo-plans/humana/extend-5000`, `/ppo-plans/aetna/dental-direct`, etc.) must NOT have a `<link rel="canonical">` pointing to themselves. They are served via 301 redirect in `vercel.json`, so no HTML is served at those paths, and no canonical tag is needed. Confirm that the physical stale `index.html` files in those folders (listed in Section 1, FLAG-01) do not contain self-referencing canonicals that could be indexed if the redirect is ever removed.

---

## 7. Sitemap Changes

### Current issues

1. **Trailing slash inconsistency:** `sitemap.xml` lists some plan pages with trailing slash (UHC, Aetna) and some without (Ameritas, Guardian, Humana, MetLife, MOO). All should be standardized to match the canonical tags in the HTML files. If the HTML canonical has a trailing slash, the sitemap entry must also have a trailing slash.

2. **`/dental-insurance/ppo-plans`** appears without trailing slash in `sitemap-content.xml`. If the hub `index.html` has a trailing-slash canonical, this must be corrected.

3. **`/compare-ppo-dental-plans`** appears in `sitemap.xml` at priority 0.9. Under Option A this entry must be replaced with `/dental-insurance/ppo-plans/compare/`. Under Option B it stays but the priority should be reviewed -- 0.9 places it above plan pages (0.7) and the dental insurance hub (0.8), which may be correct for a broad comparison page.

### Target sitemap state

**`sitemap.xml`** (core pages):

| URL | Priority | Change needed |
|-----|----------|---------------|
| `/` | 1.0 | None |
| `/dental-insurance/ppo-plans/` | 0.85 | Add or update (raise from 0.8, this is the primary hub being rebuilt) |
| `/compare-ppo-dental-plans` OR `/dental-insurance/ppo-plans/compare/` | 0.85 | Keep or update per Option A/B |
| `/dental-insurance/ppo-plans/aetna-dental-direct/` | 0.75 | Standardize trailing slash |
| `/dental-insurance/ppo-plans/ameritas-primestar/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/delta-dental-ppo-premium/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/guardian-premier-ppo/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/humana-extend-5000/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/metlife-ncd-complete/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/mutual-of-omaha-dental/` | 0.75 | Add trailing slash |
| `/dental-insurance/ppo-plans/uhc-primary-dental/` | 0.75 | Standardize (already has slash) |

**`sitemap-content.xml`** (content hub):

| URL | Priority | Change needed |
|-----|----------|---------------|
| `/dental-insurance/` | 0.8 | None |
| `/dental-insurance/ppo-plans/` | 0.85 | Add trailing slash, raise priority |

**`sitemap-index.xml`**: No changes needed. It references `sitemap.xml` and `sitemap-content.xml`, which are already included.

**FLAG-05 (needs sign-off):** Priority values above (0.85 for hubs, 0.75 for plan pages) are recommendations. Confirm whether these should be adjusted based on commercial priority -- the compare page has historically been the highest-priority content page at 0.9, and the team may want to preserve that or elevate the PPO hub instead.

---

## 8. Cannibalization Avoidance

### The three pages that could cannibalize each other

1. `/dental-insurance/ppo-plans/` -- PPO Plans hub (scenario-first, "which plan fits me")
2. `/compare-ppo-dental-plans` -- Compare page (feature-comparison table, side-by-side)
3. Individual plan pages (`/dental-insurance/ppo-plans/{plan-slug}/`) -- single-plan detail

### Topic and keyword separation strategy

**PPO Plans hub (`/ppo-plans/`)** -- owns the top-of-funnel, scenario-first queries:
- "best dental insurance plan for [scenario]"
- "dental insurance for families"
- "ppo dental plans"
- "what dental insurance should I get"

This page is NOT a comparison table. It is a scenario navigator. Its H1 and meta description emphasize scenarios and fit, not feature grids. It links OUT to the compare page and plan pages.

**Compare page (`/compare-ppo-dental-plans` or `/ppo-plans/compare/`)** -- owns mid-funnel, feature-comparison queries:
- "compare ppo dental plans"
- "delta dental vs aetna"
- "best ppo dental insurance 2026"
- "dental insurance comparison"

This page IS a side-by-side feature grid. It links OUT to plan pages. It does not replicate the scenario-first copy of the hub. Its meta description explicitly names the comparison function: "Compare [N] top PPO plans side by side."

**Individual plan pages** -- own bottom-of-funnel, single-carrier queries:
- "aetna dental direct review"
- "humana extend 5000 waiting period"
- "guardian premier ppo braces"

Each plan page uses a distinct H1: "{Plan Name} Review: [One-line value prop]". No two plan pages share the same value prop phrase in their H1. These pages link back UP to the hub and compare page.

### Differentiation enforced by content rules

- The PPO hub must NOT contain a comparison table. Tables belong on the compare page.
- The compare page must NOT contain a scenario-finder widget. Scenario content belongs on the hub.
- Plan pages must NOT reproduce the full comparison table. They may have a "How {Plan} compares" section with 3-4 rows max, linking to the full compare page.
- Internal linking must be directional: hub links to compare and plans; compare links to plans; plans link up to hub and compare. No circular top-level linking between hub and compare.

### Title and meta description differentiation

| Page | Title pattern | Meta pattern |
|------|---------------|--------------|
| PPO hub | "Best PPO Dental Plans 2026: Find Your Fit" | Scenario-first: "Find the right dental plan for your family, budget, or dental situation..." |
| Compare | "Compare PPO Dental Plans 2026: Side-by-Side" | Feature-first: "Compare [N] top PPO plans on premiums, deductibles, waiting periods, and networks..." |
| Plan page | "{Plan Name} Review 2026: [Value prop]" | Plan-specific: "{Plan Name} PPO plan review: premiums from $X/mo, [unique differentiator]..." |

**FLAG-06 (needs sign-off):** The hub H1 and meta description have not been written yet -- they are part of spec 18 (content outline). Confirm that the topic separation rules above align with the editorial direction before content is drafted.

---

## 9. Crawl and Indexation Plan

### Pre-launch (before any code deploys)

1. Pull a full GSC URL inspection report for `/compare-ppo-dental-plans` and all 8 plan pages. Save impressions, clicks, and top queries per URL. This is the baseline.
2. Pull a full Ahrefs (or similar) backlink report for `/compare-ppo-dental-plans`. Count domains linking to it. This informs the risk level of Option A.
3. Run Screaming Frog over `covercapy.com` to map all internal links to the compare page. Document which pages must be updated if Option A is chosen.
4. Confirm stale physical files (FLAG-01) are removed in the same deploy as any structural changes.

### Launch day

1. Deploy all content and structural changes in a single commit.
2. If Option A: submit the GSC "Change of address" (URL Change tool) for `/compare-ppo-dental-plans` to `/dental-insurance/ppo-plans/compare/`. This accelerates Google recognition of the 301.
3. Update `sitemap.xml` and `sitemap-content.xml` in the same deploy. Submit updated sitemaps to GSC immediately after deploy.
4. Ping Bing Webmaster Tools sitemap submission as a secondary.

### Post-launch monitoring (first 30 days)

| Day | Action |
|-----|--------|
| Day 1 | Confirm 301 redirect chain via `curl -I` for all changed URLs. Confirm canonical tags on all pages match sitemaps. |
| Day 2-3 | GSC URL Inspection tool: request indexing for `/dental-insurance/ppo-plans/` (the rebuilt hub) and `/dental-insurance/ppo-plans/compare/` (if Option A). |
| Day 7 | Check GSC Coverage report for any "Redirect error" or "Excluded by noindex" surprises. |
| Day 14 | Check GSC Performance for impressions/clicks on the PPO hub URL. Verify old compare-page queries are migrating (Option A) or holding (Option B). |
| Day 30 | Full ranking audit: compare pre-launch baseline (step 1 above) against current positions. Flag any query that dropped more than 5 positions for investigation. |

### Robots.txt

No changes to `robots.txt` are needed. The stale physical files (FLAG-01) should be removed from disk rather than disallowed via robots, since robots.txt disallows can take longer to propagate and leave the files discoverable via sitemap or direct link.

**FLAG-07 (needs sign-off):** Confirm that a `robots.txt` exists at root and that `seo-build/` and any draft/scratch files (`dd.html`, `rct_index.html`) are either excluded from robots or (preferably) deleted from disk. A `noindex` meta tag on any file that is not intended to be indexed is a secondary safety net.

---

## 10. Summary of Flags Requiring User Sign-Off

| Flag | Decision required |
|------|-------------------|
| FLAG-01 | Delete stale physical files from disk (`/ppo-plans/humana/`, `/ppo-plans/aetna/`, etc.) and `rct_index.html` files before next deploy? |
| FLAG-02 | Before Option A decision: pull GSC data and backlink report for `/compare-ppo-dental-plans`. Share findings to determine risk level. |
| FLAG-03 | Option A (physical move to `/ppo-plans/compare/`) or Option B (keep URL, change only breadcrumb and schema) at launch? |
| FLAG-04 | Should `/ppo-plans` (short vanity) redirect to the PPO hub (`/dental-insurance/ppo-plans/`) rather than the compare page? |
| FLAG-05 | Confirm sitemap priority values: hub at 0.85, plan pages at 0.75, compare at 0.85? |
| FLAG-06 | Confirm topic-separation rules for hub vs. compare page content before spec 18 (content outline) is drafted. |
| FLAG-07 | Confirm `robots.txt` exists and that scratch/draft files (`dd.html`, `rct_index.html`) are handled before deploy. |

---

*End of spec 04. Next: spec 05 (personas) and spec 15 (on-page SEO spec) are natural dependents of this IA decision. Neither should be finalized until FLAG-03 is resolved.*
