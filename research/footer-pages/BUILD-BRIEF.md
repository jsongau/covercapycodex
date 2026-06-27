# BUILD BRIEF — Footer Page Buildout (Universal Footer Linkability)
## Shared spec for all agents. Read fully before producing anything.

The new universal footer (`footer-preview.html`) links to 20 pages that do **not exist yet**.
Each agent builds 1–3 of these so every footer link resolves. This brief is the single
source of truth for structure, design, schema, SEO, and GEO so all pages match.

CoverCapy positioning: **luxury concierge for PPO dental**. "Get cover today, see a dentist tomorrow."
Feel: boutique-hotel concierge / editorial magazine. NOT a healthcare portal, NOT generic SaaS,
NOT an insurance-comparison site. No gradients-on-cards clutter, no glassmorphism, no em-dashes
in copy (use commas/colons), no roman numerals in lists, no countdown timers.

---

## 1. PROCESS (do these in order)

1. **Read the repo material** listed in your agent prompt. Reuse existing facts, copy, and tone.
2. **Read these reference files** to match house style exactly:
   - `capy-accredited-dentists.html` — structural reference (head, GA, AdSense, font links,
     `/mega-nav.css` + `/footer.css`, nav mount, footer mount, scoped page CSS, schema blocks).
   - `data/plans/README.md` and any relevant `data/plans/*.md` — the ONLY source of truth for
     plan facts (premiums, maximums, waiting periods). Never invent a plan number.
   - `footer-preview.html` — the footer the page must be compatible with.
3. **Scrape the web** (WebSearch + web_fetch) for current 2026 facts your page needs:
   national cost ranges, PPO coverage norms, procedure detail, carrier/market data. Capture the
   source URL + access date for every external figure. Prefer authoritative sources (ADA, CMS,
   carrier sites, well-known cost aggregators). Present ranges, never single false-precision numbers.
4. **Write the .md content packs** (see section 4) into your page's research folder.
5. **Build the deliverable**: standalone HTML page (most pages) OR generator spec (nationwide pages).

---

## 2. OUTPUT PATHS

Repo root: `/Users/kytlegacy/covercapycodex ultimate 21JUN26`
(Workspace/bash path: `/sessions/jolly-fervent-goldberg/mnt/covercapycodex ultimate 21JUN26`)

- Research `.md` packs → `research/footer-pages/<page-slug>/`
- Built HTML page → repo ROOT as `<page-slug>.html` (e.g. `dental-implant-cost.html`)
  so the footer link `/<page-slug>.html` resolves.
- Generator-page specs → `research/footer-pages/<page-slug>/GENERATOR-SPEC.md` (do NOT run the
  generator; it needs Supabase from the user's Mac. Write the spec + the exact code to add to
  `seo-build/generate-plans.js`).

Use the file Write tool with the **repo-root** path (the one starting `/Users/kytlegacy/...`).

---

## 3. PAGE STRUCTURE (standalone HTML pages)

Copy the scaffolding pattern from `capy-accredited-dentists.html`. Every page must include:

### Head
- `<title>` — keyword-led, brand suffix " | CoverCapy". Under ~60 chars where possible.
- `<meta name="description">` — 150–160 chars, benefit + intent + "CoverCapy".
- `<meta name="keywords">` — long-tail cluster for the page topic.
- `<link rel="canonical" href="https://www.covercapy.com/<page-slug>">` (no `.html` in canonical).
- Open Graph: type, title, description, url.
- GA snippet (`G-XNBPGSZ1LZ`) and AdSense snippet (`ca-pub-8699915070570206`) — copy verbatim
  from the reference page.
- Fonts: `<link rel="stylesheet" href="/mega-nav.css">` then `<link rel="stylesheet" href="/footer.css">`,
  then the Google Fonts link for `Fraunces` + `Hanken Grotesk` (copy from reference page).

### Schema (JSON-LD) — REQUIRED for GEO/AI answer engines
- `Organization` (CoverCapy) on every page.
- `BreadcrumbList` (Home → This Page).
- `FAQPage` with 4–8 real questions answered in 40–60 words each (these power AI Overviews /
  ChatGPT answers — write them as standalone factual answers).
- Add the most specific type that fits: cost pages → `WebPage` + `FAQPage` (optionally
  `MedicalWebPage`); service pages → `Service`; about → `AboutPage` + `Organization`;
  contact → `ContactPage`.

### Body (in order)
1. Nav mount: `<div id="covercapy-mega-nav" data-include="/mega-nav.html"></div>`
2. Hero — H1 (one per page, keyword-led), concise subhead, primary CTA.
3. Content sections with semantic H2/H3. Long-form, genuinely useful, human voice.
   Cost pages: cost table (ranges), what drives price, with vs without PPO, financing, how to save,
   how CoverCapy helps. Service/company pages: what it is, how it works, who it is for, proof, CTA.
4. A "quick answer" / TL;DR block near the top (1–2 sentences) — GEO-friendly extractable answer.
5. FAQ accordion mirroring the FAQPage schema.
6. Internal links section (see section 5).
7. Footer mount: `<div id="covercapy-footer" data-include="/footer.html"></div>`
8. Boot script pattern from reference page (`CoverCapyShellReady` gate). Optional.

### CSS
- All page CSS inline in `<style>`, **scoped under a unique class** e.g. `.implant-cost-page`,
  applied to the page wrapper, so it never restyles the sitewide nav/footer.
- Use the CoverCapy palette. Core tokens (define in your scoped `:root`-equivalent):
  `--teal-night:#082A30; --teal-700:#14525B; --teal-300:#5E8C92; --mint:#5BE0A0;
   --cream:#F6F0E6; --cream-card:#FFFDF8; --ink:#082A30; --ink-soft:#56655F; --body:#3A4A42;
   --line:#E8E2D8; --gold-soft:#F3E8CF;`
  Patient pages lean teal/green; dentist pages may use the copper/amber accents from the footer
  (`--capy-orange:#8F5F38`). Match the comparison-page palette for CTAs.
- Headlines `Fraunces` serif (weight 500, italic allowed for emphasis words).
  Body/UI `Hanken Grotesk`. No SF Pro / startup fonts.

---

## 4. THE .md CONTENT PACKS (per page)

Write these files into `research/footer-pages/<page-slug>/`:

1. `01-research.md` — every external fact with source URL + access date (2026). Cost ranges,
   coverage norms, carrier/market data, competitor angle. This is the evidence file.
2. `02-seo-geo.md` — primary keyword, secondary/long-tail cluster, search intent, title/description,
   the extractable "quick answer" for AI engines, the FAQ Q&A list (the ones that go into schema),
   target word count, and which existing pages should link in/out (internal-link map).
3. `03-content-outline.md` — section-by-section outline with the actual draft copy or strong notes,
   in CoverCapy's luxury-concierge voice.
4. (generator pages only) `GENERATOR-SPEC.md` — see section 6.

Keep packs tight and sourced. No filler.

---

## 5. INTERNAL LINKING (do not skip — this is the moat)

Every page must link OUT to relevant existing pages and be a good link TARGET. Known-good targets:
`/compare-ppo-dental-plans`, `/find-my-dentist.html`, `/dental-treatment-cost-estimator.html`,
`/dental-financing-monthly-payments`, `/capy-accredited-dentists.html`, `/capy-accreditation.html`,
`/dentist-portal.html`, `/capy-practice-membership.html`, `/join/`, the legal pages, and the 8
market hubs under `/dental/...`. Also cross-link to sibling new pages where relevant
(e.g. implant-cost ↔ crown-cost ↔ invisalign-cost ↔ cosmetic ↔ emergency).
Use descriptive anchor text with the target keyword, never "click here".

---

## 6. GENERATOR PAGES (nationwide index: states, cities, treatments, featured-markets,
##                       ppo-dentist-directory, request-a-dentist)

These are data-driven, NOT hand-written prose. Do **not** build a static HTML file with fake data.
Instead write `GENERATOR-SPEC.md` containing:
- Purpose, URL, title/meta/canonical, schema (`CollectionPage` / `ItemList` / `BreadcrumbList`).
- Data source: which Supabase tables/columns and which existing `/dental/` hubs feed it
  (see CLAUDE.md schema). states.html lists all state hubs; cities.html lists city hubs;
  treatments.html lists treatment landing pages; featured-markets.html = curated top metros;
  ppo-dentist-directory.html = master A–Z index; request-a-dentist.html = a real form
  (POST target, fields, no PII stored beyond consent) since it is interactive, not data-listing.
- The exact `build<PageName>()` function to add to `seo-build/generate-plans.js`, reusing existing
  helpers (`pageShell`, `fetchAllRows`, `slugify`, `stateSlug`, `dentistCard`). Match existing
  generator style. Note that it must be run from the Mac (`node seo-build/generate-plans.js`).
- `request-a-dentist` MAY also be delivered as a standalone static HTML form page (no Supabase
  needed) if simpler — your call; state which you chose.

---

## 7. HARD RULES (from CLAUDE.md — do not violate)
- No em-dashes in copy. No roman numerals in lists.
- `sameAs` in schema must be an ARRAY.
- Strip UTM from any website URL: `.split('?')[0]`.
- Never store member IDs (only `member_id_provided: boolean`).
- Plan facts come ONLY from `data/plans/`. Re-verify against the cited source if in doubt.
- Do not hand-edit anything inside `dental/` (generated). Generator changes go in the spec only.
- One H1 per page. Valid, closed HTML. Mobile-responsive.
- Cite real sources; do not fabricate statistics, awards, or testimonials.
