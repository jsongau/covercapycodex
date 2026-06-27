# CONTINUE PROMPT — Dentist Hub, Carrier Silo, and Dentist-Page SEO

Paste this whole file as the first message of a new task to resume the dentist work. It is self-contained.

---

## Paste-ready prompt

You are continuing an in-progress SEO/GEO project on the CoverCapy repo at `/Users/kytlegacy/covercapycodex ultimate 21JUN26` (static site on Vercel, GitHub `jsongau/covercapycodex`, deploys when the user pushes from their Mac). Read `CLAUDE.md` first for the hard rules.

Before doing anything, read these documents in full, in this order. They contain the entire plan, the audits, and the decisions already made:

National hub research (`research/dentist-hub/`):
- `00-ROADMAP-and-GSC.md` — what was built, the GSC explainer, and the 8-step roadmap
- `01-find-my-dentist-audit.md`, `02-dental-tier-breadcrumb-audit.md`, `03-competitor-directories.md`, `04-carrier-provider-search.md`, `05-geo-ai-citation.md`, `06-schema-graph.md`, `07-technical-seo-gsc.md`, `08-tier-taxonomy-T1-T6.md`, `09-internal-linking-silo.md`, `10-geo-content-copy.md`

Dentist-page audit (`research/dentist-pages-audit/`):
- `00-MASTER-FINDINGS-and-ROADMAP.md` — the master prioritized fix list (READ THIS ONE CAREFULLY)
- `01` through `10` — the per-area sub-audits (profiles, hubs, legacy tree, carrier silo design, breadcrumb parity, duplicate/crawl, title/meta, internal linking, competitor carrier pages, review/E-E-A-T)

### What is already DONE and live in the repo (do not redo)
1. `dentist.html` — new national hub at clean URL `/dentist`. Full clone of the `find-my-dentist.html` search app plus a static, crawler-visible SEO/GEO layer (keyword H1, JSON-LD @graph with WebSite+SearchAction on `?where=`, breadcrumb at top, intro, HowTo, ranking and trust blocks, 5 internal-link silos = 77 live links, 10-question FAQ matching FAQPage schema). GSC placeholder omitted. Breadcrumb is pinned at top; the rest of the SEO content sits BELOW the search. `find-my-dentist.html` was left untouched.
2. `dental-insurance/metlife/find-a-dentist/index.html` — a TEST carrier-silo page (the first carrier clone beyond Delta). Modeled on the existing Delta page `dental-insurance/delta-dental/find-a-dentist/index.html`. Adapted to MetLife PDP Plus, fixes the `?q=`->`?where=` search-param bug, wires into `/dentist`, and includes a "Dental offices that list MetLife" section with 6 real, self-canonical profile links (verified on disk) plus a matching ItemList schema. Validated: JSON-LD parses, FAQ visible/schema parity 5/5, single H1.
3. A safety backup of `dentist.html` exists at `.safety-backups/2026-06-26/dentist.html.bak`.

### Hard constraints (the user is sensitive about this)
- NEVER do destructive dedupe. A past session deleted all dentist pages during a dedupe. Do not delete, move, or mass-redirect `/dental/` pages without explicit per-step approval and a stated revert path.
- Work ADDITIVELY by default. New files are preferred. Anything you change, state exactly how to revert it (new files: `rm` the file; tracked edits: `git checkout`).
- The generator `seo-build/generate-plans.js` is gitignored and MUST run on the user's Mac (the sandbox cannot reach Supabase). You may EDIT it, but the user runs the build. Never `cd seo-build` to run it; always from repo root.
- Honor CLAUDE.md: no em-dashes in copy, preserve design tokens, build URLs from parts never `seo_path`, member IDs never stored, www host with trailing slashes on `/dental/` links, no fabricated reviews/ratings.
- Validate every change: parse JSON-LD with python, check inline JS parses, confirm single H1, confirm `git status` shows only intended changes.

### The pending work, in priority order (from the master roadmap)
P0 (compliance + crawl waste):
- Fix the fabricated review count in `generate-plans.js` (~line 1259): `reviewCount: d.google_review_count || 1` gates on rating alone; change to gate on `weighted_rating>0 && google_review_count>0` and drop `||1`.
- Legacy `/dentists/` tree (22 pages): 301 to `/dental/` equivalents in `vercel.json`, remove its loc from `sitemap.xml`, rewrite internal links, then delete folder once reprocessed. PROPOSE the redirect rules and get approval before deleting anything.
- Duplicate `/dental/nv/` vs `/dental/nevada/`: 301 `nv`->`nevada`, make `stateSlug("Nevada")` emit `nevada`. Propose first.
- Stale `/dentists/` paths still emitted in 21 hub files: fix URL builders, add a build-fail assertion.

P1 (high SEO value, mostly generator):
- Server-render dentist-profile content (carriers, treatments, hours, nearby rail) so crawlers/AI see it; render all city offices as static links, not just top 20.
- Insert `Find a Dentist` (`/dentist`) as breadcrumb position 2 on every tier (visible + JSON-LD, shift +1), and have `/dentist` link down to states/carriers/treatments.
- Title/meta/H1 templates per tier (34% of profile titles are duplicates, 96% over length, none use "near me" or a year token). Add `SEO_YEAR`. Templates are in `research/dentist-pages-audit/07`.
- Breadcrumb visible/schema label parity + trailing-slash bug + unify T6 onto microdata. Spec in `05`.

Carrier silo rollout (the user's active interest):
- The started Delta page is at `dental-insurance/delta-dental/find-a-dentist/`; the MetLife test is the second. Clone for the remaining carriers: Guardian (DentalGuard Preferred), Cigna (DPPO), Aetna (PDN), Humana (Dental PPO), Ameritas (Classic), UnitedHealthcare (Dental PPO). Use exact network names. Each: adapt copy, fix `?where=`, wire into `/dentist`, add a real-profile "offices that list {carrier}" section (grep `/dental/` for profiles listing that carrier; only link self-canonical URLs that exist on disk).
- Repoint the `dentist.html` carrier grid from the plan pages to these `/dental-insurance/{carrier}/find-a-dentist/` pages.
- The scalable C2 layer (`/dental/{state}/{city}/{carrier}-dentists/` listing every in-network office) needs a new `buildCarrierCityPage()` + `--carrier-pages` flag in the generator, gated to cities with >=4 in-network offices. Spec in `research/dentist-pages-audit/04`.

Quick direct edits that do not need the generator (can do in-session): vercel.json redirects, sitemap.xml cleanup, dentist.html carrier repoint, the carrier-page clones, remove the GSC placeholder from `find-my-dentist.html`, fix Delta's `?q=`->`?where=`.

### How to work
Use the user's preferred style: spin up parallel agents for research/audit when useful, write findings to `.md`, synthesize, then build. Always show a preview and a revert path before the user commits. Deploy is the user pushing from their Mac; provide the `cd "/Users/kytlegacy/covercapycodex ultimate 21JUN26" && git add -A && git commit -m "..." && git push` command, with `find .git -name '*.lock' -delete 2>/dev/null` first.
