# dentist.html — National Dentist Hub: Build Summary, GSC Explainer, and Step-by-Step Roadmap

Date: 2026-06-26
New file shipped: `/dentist.html` (clean URL `/dentist`). Source app `/find-my-dentist.html` is untouched and still live.

---

## 1. What was built (Phase 0, done)

`dentist.html` is a byte-for-byte clone of `find-my-dentist.html` (the full Supabase search app, all modals, nav/footer mounts, and inline JS preserved) with a static, crawler-visible SEO/GEO layer added around it. AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Bingbot) do not run JavaScript, so the old page was invisible to them. The new page gives them real HTML to read and cite.

Added, all static (no JavaScript dependency):

- New SEO head: title "Find a PPO Dentist Near You | CoverCapy", 143-char meta, canonical `https://www.covercapy.com/dentist`, matching og/twitter tags.
- Removed the fake GSC placeholder token (see section 2).
- One JSON-LD `@graph`: Organization, WebSite + SearchAction (`?where=`), CollectionPage/MedicalWebPage, MedicalBusiness, BreadcrumbList, HowTo, FAQPage, and an ItemList of the 14 live state hubs.
- Visible breadcrumb (CoverCapy > Find a Dentist) using the same microdata component the `/dental/` hubs use.
- Single SEO H1 "Find a PPO dentist near you" (the app's old H1 was demoted to a div, classes kept, so styling is unchanged).
- Intro prose, a HowTo step list, a "How CoverCapy ranks offices" E-E-A-T block, a trust block.
- Five static internal-link silos (77 live links total): 14 states (+37 states as greyed coming-soon spans), 20 metros, 8 carriers, 11 treatments, 24 cities.
- A 10-question FAQ whose visible text matches the FAQPage schema exactly.

Validation passed: all inline scripts parse, JSON-LD is valid, exactly one H1, find-my-dentist.html unchanged, all 77 links resolve on disk.

Decision made during build: the bare carrier folders (e.g. `/dental-insurance/ppo-plans/delta/`) do not exist, so carrier links were repointed to the real hubs/plan pages (Delta to `/dental-insurance/delta-dental/`, others to their real plan pages) to avoid soft-404s. Labels stay user-friendly.

---

## 2. The GSC placeholder, explained plainly

Google Search Console (GSC) is the free Google tool that shows you how your site performs in search: which queries you rank for, impressions, clicks, indexing status, Core Web Vitals, and manual-action or security alerts. To use it you must prove you own the site ("verify" it).

Your `find-my-dentist.html` shipped this line:

    <meta name="google-site-verification" content="REPLACE_WITH_YOUR_GSC_TOKEN">

That is a placeholder, not a real token. A real token is a ~40-character string Google gives you. Because this one is fake, it verifies nothing. It does not hurt rankings, but it leaves you blind to all of your search data, and it looks like an unfinished build to anyone who views source.

Recommended fix (best option): verify the whole domain once using a DNS TXT record (a "Domain property" in GSC). This covers the apex, www, and every path including all `/dental/` pages in one shot, and never needs code changes again. Then delete the placeholder meta tag from `find-my-dentist.html`.

`dentist.html` already omits the placeholder, so nothing to clean there. The placeholder still exists in `find-my-dentist.html` line 16 (the only file that has it). You verify the domain in GSC yourself (it needs your Google account and your DNS provider); I can remove the placeholder line from find-my-dentist.html whenever you want.

GA4 (`G-XNBPGSZ1LZ`) is already on the page, which is a fallback verification method, but DNS is cleaner.

---

## 3. Step-by-step roadmap (do these in order, each is its own change)

Phase 0 is done (dentist.html). Everything below is optional follow-on, ordered by impact-to-effort.

### Step 1 — Ship and index the hub (technical, fast)
- Add `https://www.covercapy.com/dentist` to `/sitemap.xml` with a fresh lastmod.
- Add vanity 301s in `vercel.json`: `/dentists` and `/find-a-dentist` to `/dentist` (matches the existing `/ppodentists` pattern). cleanUrls already 301s `/dentist.html` to `/dentist`, so no rewrite needed.
- Verify the domain in GSC by DNS, then remove the placeholder tag from find-my-dentist.html.
- After deploy, submit `/dentist` for indexing in GSC and request validation.

### Step 2 — Make the carrier silo real (high SEO value)
Carriers leave the long tail wide open: their own provider directories are uncrawlable JS or login-gated, so queries like "delta dental ppo dentist near me" and "dentist that takes metlife in [city]" are won by aggregators, not carriers. Mint static, schema-rich carrier landing pages:
- Create `/dental-insurance/{carrier}-dentists/` or per-city `/dental/{state}/{city}/{carrier}-dentists/` pages using exact network names (Delta PPO/Premier, MetLife PDP Plus, Cigna DPPO, Guardian DentalGuard Preferred, UHC Dental PPO, Aetna PDN, Humana Dental PPO, Ameritas Classic).
- Each lists real named in-network offices with the free verification CTA, beating the carriers' "call the office to confirm" friction.
- Then repoint the dentist.html carrier silo from the plan pages to these new pages.

### Step 3 — Add the "near me" and freshness layer (matches what competitors rank with)
- Adopt the competitor title formula on tier pages: "20 Best PPO Dentists Near {City}, {ST} (2026)" with a visible "Last updated {month year}" stamp.
- Build "near me" modifier pages: PPO dentist near me, emergency dentist near me, weekend dentist near me (static landing pages that funnel into the app).

### Step 4 — Insert the hub into the breadcrumb chain sitewide (consistency)
- Update the `/dental/` generator so every tier breadcrumb inserts "Find a Dentist" (`/dentist`) at position 2, shifting the rest down by one. This makes the whole T1-to-dentist chain consistent and links authority back up to the hub. Regenerate `/dental/` from the Mac (sandbox cannot reach Supabase).

### Step 5 — Clean up duplication and stale paths (crawl hygiene)
- Collapse the duplicate `/dental/nv/` (292) and `/dental/nevada/` (203) into one; 301 `nv` to `nevada`.
- Fix the 21 files still carrying stale `/dentists/` paths.
- Fix doubled city slugs like `/chicago/chicago/` and `/buffalo/buffalo/`.
- Reconcile JSON-LD breadcrumb label drift ("California PPO Dentists" vs "California Dentists" vs "California").

### Step 6 — GEO depth (AI citation)
- Add a curated `/llms.txt` (20 to 50 of your best URLs). Low priority, cheap future-proofing.
- Add `Disallow: /api/` to robots.txt.
- On tier pages, lead each section with a 40 to 80 word answer-first block and question-phrased H2s, which is what AI engines quote.

### Step 7 — Performance (Core Web Vitals)
- The search page is a ~695KB single file. Defer the Supabase calls, lazy-load the Leaflet map until scrolled into view, add preconnect to the Supabase and tile hosts. dentist.html inherits this and should get the same treatment.

### Step 8 — Expand to true nationwide
- The search currently has real data only for the 14 worked-on states. To become the best nationwide "dentist near me," seed dentist data for the remaining 36 states (the silo already lists them as coming-soon, so they flip to live links as each ships).

---

## 4. Research index (all in research/dentist-hub/)
- 01 find-my-dentist audit and reuse plan
- 02 dental tier and breadcrumb spec
- 03 competitor directory SEO (Zocdoc, Healthgrades, Opencare, Yelp, WebMD)
- 04 carrier provider-search SEO and the keyword gap
- 05 GEO and AI-citation best practices
- 06 JSON-LD schema graph
- 07 technical SEO and GSC
- 08 T1-T6 taxonomy (note: tiers already finalized by you; kept for reference)
- 09 internal-linking silo (verified hrefs)
- 10 GEO content and FAQ copy
