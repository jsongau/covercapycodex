# 04 — Carrier-Silo System Design

How CoverCapy turns "find a [carrier] PPO dentist near me" into a scalable, crawlable silo —
built on the Delta work already shipped. Date: 2026-06-26.

---

## STEP 1 — Assessment of the existing Delta work

There are **two distinct artifacts**, and only one is the real carrier-silo page:

### A. `dental-insurance/delta-dental/find-a-dentist/index.html` — THE ACTUAL SILO PAGE (live, ~90% done)

This is the started carrier silo and it is high quality. It is essentially the template the
whole system should clone.

- **Purpose:** rank for `dentist that takes Delta near me`, `delta dental ppo dentist`, `is my dentist Delta PPO or Premier`. Bottom-of-funnel, brand+intent.
- **URL it lives at:** `https://www.covercapy.com/dental-insurance/delta-dental/find-a-dentist/` (canonical set, trailing slash, breadcrumb to `/dental-insurance/` → `/dental-insurance/delta-dental/` → this page).
- **Structure:** mega-nav mount + self-contained "Delta cluster nav" (`dcn-` prefixed dropdowns) + breadcrumb + jade hero with two CTAs into `/find-my-dentist` + a featured-snippet "answer" block + PPO/Premier/DeltaCare explainer + 4-step "how to verify" HowTo + **10 California city cards** linking to `/find-my-dentist?q={City}` + 4 cross-link pillars + 5-question FAQ accordion + sources/disclaimer.
- **Schema (strong):** `@graph` with `WebSite`, `WebPage` (+ `speakable`), `BreadcrumbList`, `FAQPage` (5 Q), `HowTo` (4 steps), and an `ItemList` `#cities` of 10 city searches. Network-aware copy ("PPO, Premier, DeltaCare USA") used verbatim throughout.
- **Design:** own jade/graphite palette + Fraunces/Inter, NOT the `--teal-night` token set from CLAUDE.md. Self-contained CSS. Polished, accessible (aria, reduced-motion).

**Gap vs. an ideal silo page — three things missing:**
1. **No real named dentists / `ItemList` of in-network offices.** It links to the live `/find-my-dentist?q=` search instead of listing actual offices with `Dentist`/`LocalBusiness`/`AggregateRating`. Research file 04 (item 4–5) says the single biggest unfair advantage is listing the real offices the carrier SPAs hide. Right now the page is a *content/explainer* silo, not a *directory* silo.
2. **City cards are California-only and don't link to the static `/dental/` tree.** They point to the JS `/find-my-dentist` app (still uncrawlable beyond the query). They should point to crawlable `/dental/{state}/{city}/delta-dental-dentists/` pages (or at minimum the existing `/dental/{state}/{metro}/{city}/` hubs).
3. **No link back from T5 dentist pages.** T5 "insurance networks" pills don't yet link up to this carrier page — the silo loop in research 09 is open.

### B. `docs/ppo-redesign/carrier-delta.html` — a PLAN-COMPARISON preview, NOT the silo

Title "Delta Dental PPO Plans 2026 — Premium vs Basic", canonical `…/dental-insurance/ppo-plans/delta-dental/`. It is a Direction-C design preview of a **plan** page (Basic vs Premium table, glossary tooltips). Its "Find a dentist" section is a single dead `<a href="#">`. **It is not the carrier-silo page** and should not be confused with one. Treat it as the plan-comparison sibling that lives in the `/dental-insurance/ppo-plans/{carrier}/` tree. (Note one stray bug: a "View plan" button links to `spoke-guardian.html`.)

**Verdict:** the Delta silo is built and good. The system below productizes the `find-a-dentist`
page across all carriers and closes the three gaps.

---

## STEP 2 — Context that drives the design

- **research/04:** every carrier's provider directory is a JS/SSO app returning "Loading…" to crawlers. Carriers own brand queries and abandon the `[carrier] dentist in [city]` long tail. CoverCapy already has 5,776 dentists with `insurance_networks[]` and 6,400 static `/dental/` pages — it can mint the crawlable carrier×city pages the carriers refuse to.
- **research/09:** the `dentist.html` "By PPO Carrier" grid currently points at **`/dental-insurance/ppo-plans/{carrier}/`** (the PLAN pages). 8 carriers live (delta, uhc, guardian, metlife, aetna, humana, ameritas, mutual-of-omaha); Cigna/Principal/Anthem missing. Unbuilt targets must be omitted, not linked (soft-404 / crawl-budget rule).
- **CLAUDE.md:** canonical dentist tree is `/dental/{state}/{market}/{city}/{dentist}/`; never `seo_path`; build URLs from parts; member ID never stored; no em-dashes; `d.website.split('?')[0]`.

---

## STEP 3 — The carrier-silo SYSTEM

### 3.1 URL architecture (recommended)

Use a **two-tier carrier silo**, reusing the URL slots the Delta work already established. No new top-level tree.

| Tier | Pattern | Example | Role |
|---|---|---|---|
| **C0 — carrier hub** | `/dental-insurance/{carrier}/` | `/dental-insurance/delta-dental/` | Existing brand hub (already live for Delta). |
| **C1 — national silo** | `/dental-insurance/{carrier}/find-a-dentist/` | `/dental-insurance/delta-dental/find-a-dentist/` | **The national "find a {carrier} dentist near me" page.** Already built for Delta. One per carrier. |
| **C2 — city silo** | `/dental/{state}/{city}/{carrier}-dentists/` | `/dental/california/los-angeles/delta-dental-dentists/` | Per-city in-network directory with real offices. Phase 2. |

**Why this pattern (justification):**
- **C1 stays in `/dental-insurance/{carrier}/`** (NOT `/dental-insurance/ppo-plans/{carrier}/`). `ppo-plans/` is the **plan-comparison** silo (Basic vs Premium, $/mo). `dental-insurance/{carrier}/` is the **brand/network/find-a-dentist** silo. Keeping them separate preserves clean intent separation and matches what's already shipped for Delta. No clash.
- **C2 lives inside the existing `/dental/` tree** as a leaf under the city folder, alongside `{city}/index.html` and the `{dentist}/` profiles. `{carrier}-dentists/` is a reserved leaf slug that cannot collide with a real dentist slug (no practice is named "delta-dental-dentists"). It inherits the crawl authority of the `/dental/` tree and sits one hop from both the city hub and the T5 profiles it lists. This is exactly the "mint static `/dental/{...}/{carrier}-dentists/`" recommendation in research 04 item 1.
- **No clash with `/dental-insurance/ppo-plans/`** — different parent. **No clash with the `/dental/` dentist tree** — `{carrier}-dentists` is a known reserved set of ~10 slugs, generated last, and never overlaps `d.slug`.

**Canonical carrier slug set** (drives both C1 folder and the C2 leaf):
`delta-dental, metlife, cigna, guardian, uhc, aetna, humana, ameritas, mutual-of-omaha, principal`.

### 3.2 Page template spec (clone of the Delta `find-a-dentist` page)

**Head**
```
<title>Find a Dentist Who Takes {Carrier} Near You | CoverCapy</title>          (C1 national)
<title>{Carrier} Dentists in {City}, {Abbr} — In-Network & Verified | CoverCapy</title>  (C2 city)
<meta name="description"> names the exact networks + "verify acceptance free before you book"
<link rel="canonical" href="{BASE}/dental-insurance/{carrier}/find-a-dentist/">   (C1)
<link rel="canonical" href="{BASE}/dental/{state}/{city}/{carrier}-dentists/">    (C2)
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
```

**H1 formula**
- C1: `Find a dentist who takes {Carrier} near you` ({Carrier} in italic `<em>`).
- C2: `{Carrier} PPO dentists in {City}, {Abbr}` / `Dentists that take {Carrier} in {City}`.

**Exact network names (use verbatim in title/H1/body per research 04):**

| Carrier | Network phrase to print |
|---|---|
| Delta Dental | Delta Dental PPO & Premier (+ DeltaCare USA) |
| MetLife | MetLife PDP Plus (DPPO) |
| Cigna | Cigna DPPO (Total Cigna DPPO) |
| Guardian | Guardian DentalGuard Preferred (PPO) |
| UnitedHealthcare | UHC Dental PPO / DPPO |
| Aetna | Aetna Dental PPO / PDN |
| Humana | Humana Dental PPO |
| Ameritas | Ameritas Classic (PPO) |

**JSON-LD `@graph` (per page):**
- `WebSite` + `WebPage` (+ `speakable` on `.answer`).
- `BreadcrumbList` — C1: Home → Dental Insurance → {Carrier} → Find a dentist. C2: Home → Dental → {State} → {City} → {Carrier} dentists.
- `FAQPage` — "Does {practice/office} take {Carrier}?", "Is my dentist {Carrier} PPO or Premier?", "Can I see any dentist with {Carrier}?", "Does CoverCapy verify {Carrier} for free?".
- `HowTo` — the 4-step "verify in-network on your exact product" flow (reuse Delta's).
- **C2 only — `CollectionPage` + `ItemList` of in-network offices**, each an `ItemList` member referencing a `Dentist`/`LocalBusiness` with `name`, `address`, `telephone`, `aggregateRating` (when `weighted_rating` + `google_review_count` exist), and `url` = the T5 profile built from parts (`/dental/{st}/{mk}/{city}/{slug}/`). This is the schema carriers cannot ship.

**Body sections (order, cloned from Delta):**
1. Cluster nav (`dcn-`) + breadcrumb.
2. Hero — H1, lede, two CTAs → free verify, trust row (networks, "free", "no insurance required", last-reviewed).
3. Featured-snippet "answer" block (the H1 question answered in ~60 words).
4. Network explainer (PPO vs Premier vs DHMO for that carrier).
5. 4-step "how to verify" HowTo.
6. **C2: real in-network office cards** (named dentist, address, phone, rating, "View profile →" to T5, "Verify free"). **C1: city cards** → C2 pages (or `/dental/{state}/{city}/` where C2 not yet built).
7. Cross-link pillars (carrier hub, eligibility, networks, plans).
8. FAQ accordion.
9. Sources + disclaimer (live data, reconfirm with office, perks ≠ insurance).

**Free-verification CTA (the differentiator on every page):**
`Verify my {Carrier} coverage — free` → `/find-my-dentist?carrier={carrier}&q={City}`. Member ID never stored (only `member_id_provided`), per CLAUDE.md.

**Linking into `/dental/` and the `/dentist` hub:**
- C2 office cards link **down** to T5 profiles (built from parts, never `seo_path`).
- C2 breadcrumb + a "back to city" pillar link **up** to `/dental/{state}/{city}/`.
- C1 links **down** to its C2 city pages; C1 + C2 both link **up** to the C0 carrier hub and across to the `ppo-plans/{carrier}/` plan page.
- The national `/dentist` hub's "By PPO Carrier" grid links to **C1** pages (see 3.3).

### 3.3 Integration with `dentist.html`'s carrier grid

Currently `dentist.html` GRID 3 points at `/dental-insurance/ppo-plans/{carrier}/` (PLAN pages — wrong intent for a "find a dentist" hub). **Repoint GRID 3 to the C1 silo pages** `/dental-insurance/{carrier}/find-a-dentist/` so the dentist hub flows into dentist-finding, not plan-shopping. Until a carrier's C1 page exists, omit it (soft-404 rule from research 09). Today only Delta's C1 is live, so GRID 3 should link Delta to C1 and the other 7 stay on their existing hub/plan target until their C1 ships — or the grid waits for the Phase-1 batch below.

Also: T5 dentist profiles' "insurance networks" pills should become links to the matching C2 page (`/dental/{state}/{city}/{carrier}-dentists/`), closing the silo loop (research 09).

### 3.4 Phased rollout (avoid thin content / soft-404s)

**Phase 1 — 10 national C1 pages** (`/dental-insurance/{carrier}/find-a-dentist/`).
Clone the Delta page per carrier, swapping network names, FAQ, sources. These are content/explainer pages (no per-office list required) so they are never thin. Order by query volume: Delta (done) → MetLife → Cigna → Guardian → UHC → Aetna → Humana → Ameritas → Mutual of Omaha → Principal. Repoint `dentist.html` GRID 3 to these as each ships. **Cigna/Principal/Anthem have no plan page yet (research 09) — a C1 silo page is the right first asset for them.**

**Phase 2 — C2 city×carrier pages**, generated only where there is **real inventory**:
- Guard with a **minimum-office threshold** (e.g. ≥4 in-network offices for that carrier in that city, counted from `insurance_networks @> {carrier}`). Below threshold → do NOT mint the page (prevents thin content/soft-404). Render those as a live `/find-my-dentist?carrier=&q=` link from C1 instead.
- Start with top metros × top 4 carriers (Delta, MetLife, Cigna, Guardian) in the 14 live states, then widen. Each page lists named offices, so content depth scales with real data.
- Add C2 URLs to `sitemap-dental.xml` only when minted.

**Phase 3 — close the loop:** T5 network pills → C2; carrier hub (C0) "find a dentist" pillar → C1; cross-link C2 siblings (other carriers in the same city).

### 3.5 Extend `seo-build/generate-plans.js`? — Yes, for C2; templated copy for C1.

- **C1 (10 pages):** low volume, heavy bespoke copy/FAQ per carrier. Hand-author by cloning the Delta `find-a-dentist` page (or a tiny `buildCarrierFindADentist(carrier)` helper fed a per-carrier config object: network names, FAQs, sources). Either is fine — 10 pages.
- **C2 (thousands):** **must be generated.** Add `buildCarrierCityPage(carrier, city, dentists, market, state)` to `generate-plans.js`, filtering `dentists.filter(d => d.insurance_networks?.includes(carrierName))`, applying the min-office threshold, reusing `dentistCard()`, `pageShell()`, and the `ItemList`/`CollectionPage` schema. Gate behind a `--carrier-pages` flag (like `--dentist-pages`). Run from repo root, Mac Terminal (Supabase reachable), per CLAUDE.md.

---

## STEP 4 — Ready-to-adapt HTML template outline (C1 / C2)

Clone `dental-insurance/delta-dental/find-a-dentist/index.html` and parameterize. Skeleton:

```html
<!doctype html><html lang="en-US"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{C1: Find a Dentist Who Takes {Carrier} Near You | CoverCapy}</title>
  <meta name="description" content="Find a dentist who takes {Carrier} near you. Search by {NetworkNames}, and verify acceptance free before you book.">
  <link rel="canonical" href="{BASE}/dental-insurance/{carrier}/find-a-dentist/">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="stylesheet" href="/assets/css/mega-nav.css"> ... fonts ...
  <script type="application/ld+json">{ "@context":"https://schema.org","@graph":[
    {WebSite}, {WebPage+speakable}, {BreadcrumbList},
    {FAQPage: "Does {office} take {Carrier}?" ...},
    {HowTo: 4 verify steps},
    /* C2 only: */ {CollectionPage}, {ItemList of in-network Dentist/LocalBusiness w/ AggregateRating}
  ]}</script>
  <style> /* reuse jade/graphite cluster-nav + hero + steps + citygrid CSS from Delta page */ </style>
</head><body>
  <div id="cc-nav-mount"></div>
  <nav class="dcn">{carrier cluster nav — Plans / Networks / Who it's for / Find a dentist}</nav>
  <div class="crumb">Home / Dental Insurance / {Carrier} / Find a dentist</div>
  <div class="herowrap"><div class="portal">
    <h1 class="title">Find a dentist who takes <em>{Carrier}</em> near you</h1>
    <p class="lede">{networks explained in one line}</p>
    <a class="btn btn-jade" href="/find-my-dentist?carrier={carrier}">Search {Carrier} dentists near me</a>
    <a class="hero-ghost" href="/find-my-dentist?carrier={carrier}">Verify my {Carrier} coverage — free</a>
  </div></div>
  <section class="answer">{featured-snippet answer to the H1 question}</section>
  <section>{PPO vs Premier vs DHMO explainer for {Carrier}}</section>
  <ol class="steps">{4-step verify HowTo}</ol>
  <!-- C2: real office cards instead of/above city grid -->
  <section class="citygrid">{C1: city cards -> C2 pages | C2: in-network office cards -> T5 profiles}</section>
  <section class="pillars">{C0 hub, eligibility, networks, ppo-plans/{carrier}/ plan page}</section>
  <section class="faq">{accordion mirroring FAQPage}</section>
  <section id="sources">{sources + live-data disclaimer}</section>
  <div id="cc-footer-mount"></div>
  <script>/* dcn cluster-nav behaviour + universal component loader (reuse Delta JS) */</script>
</body></html>
```

**Build rules:** absolute trailing-slash URLs; T5 links built from parts never `seo_path`;
`d.website.split('?')[0]`; member ID never stored; no em-dashes; exact network names verbatim;
C2 only minted above the office threshold.
