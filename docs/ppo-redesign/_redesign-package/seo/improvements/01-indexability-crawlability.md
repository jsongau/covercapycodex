# SEO Improvement: Indexability & Crawlability (PPO Plan Pages)

**Area:** Sitemap, robots.txt, render path
**Scope:** 8 PPO plan pages + the PPO hub
**Priority:** P0 · **Effort:** S–M (0.5–1.5 days)
**Current score: 8.0/10 → Target: 9.5/10**

---

## 1. Current state & audit evidence

**What's working (keep it):**
- Pages are **static server-rendered HTML** — plan content is present in View Source, not injected by JS. This is the single most important crawlability property and it is currently correct.
- Per-page `robots` meta is correct: `index,follow` on the 8 live plans + hub; `noindex,follow` on the MetLife NCD page (intentionally under review).
- A `<link rel="canonical">` is present on every page.
- `viewport`, `preconnect`, and lazy-loading hints are present.

**What's missing (the gap to 9.5):**
- **No `sitemap.xml`** anywhere in the set. Crawlers must discover all 9 routes purely through internal links — slower discovery, no `lastmod` freshness signal.
- **No `robots.txt`.** There is no crawl directive file and no machine-readable pointer to a sitemap.

These two omissions are the entire delta between 8.0 and 9.5. Everything else is already in place.

## 2. Why it matters

The render path is the **#1 SEO risk** on this property. The current static HTML is good, but the production plan is to render the same pages from the Supabase `ppo_plans` table. The older directory (t4) pages did this with a **client-side Supabase fetch** — that returns an empty shell in View Source and is invisible to crawlers that don't execute JS, including most AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.). Our own briefs require "no empty shell in View Source."

**Rule: render-from-DB must stay server-side.** Build-time static generation or SSR/ISR only — **never** a client `useEffect`/fetch for crawlable plan content. If a plan's premium, network size, or coverage details only appear after JS runs, that content does not exist for Google or AI crawlers.

## 3. Specific fixes

**(1) Ship `sitemap.xml`, generated from `ppo_plans`.**
Include only indexable routes (the 8 live plans + the hub). **Exclude** the noindex MetLife NCD page and any redirect-only/utility URLs. Pull `lastmod` from the DB (`verified_at` → `dateModified`) so freshness reflects real data updates.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://covercapy.com/ppo-plans/</loc>
    <lastmod>2026-06-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://covercapy.com/ppo-plans/cigna-dental-1500/</loc>
    <lastmod>2026-06-12</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://covercapy.com/ppo-plans/delta-dental-ppo/</loc>
    <lastmod>2026-06-10</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- ...6 more live plan URLs... -->
  <!-- NOTE: metlife-ncd is intentionally omitted (noindex) -->
</urlset>
```

**(2) Ship `robots.txt`** at the domain root. Allow the crawl, point to the sitemap, and disallow only thin/utility paths.

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /search?
Disallow: /*?ref=

Sitemap: https://covercapy.com/sitemap.xml
```
Do **not** `Disallow` the MetLife page here — it must remain crawlable so the `noindex` meta is actually read. (Blocking in robots.txt would prevent Google from ever seeing the `noindex`.)

**(3) Keep `noindex,follow` on under-review plans** (MetLife NCD). Page stays linkable and crawlable; just excluded from the index and the sitemap. Flip to `index` + add to sitemap once approved.

**(4) Keep render-from-DB server-side.** When the hardcoded HTML is replaced with `ppo_plans` data, generate at build time (static) or via SSR/ISR. Acceptance gate: full plan content must appear in raw `view-source:` with JS disabled.

**(5) Crawl-budget hygiene.** No soft-404 CTAs (buttons that lead nowhere or to JS-only states). All inter-plan and hub→plan navigation must be real `<a href>` links in the HTML so crawlers traverse the set.

## 4. Implementation notes

- **Generation step:** add a build script that queries `ppo_plans WHERE indexable = true`, maps each row to a `<url>` entry, and writes `sitemap.xml`. Run it in the same build that renders the pages so routes and sitemap never drift.
- **Search Console:** submit `https://covercapy.com/sitemap.xml` once live; confirm 9 URLs discovered, 0 errors, MetLife absent.
- **Revalidation cadence:** tie ISR revalidation / rebuilds to `verified_at`. When a plan's `verified_at` changes, the page re-renders and its sitemap `lastmod` updates automatically.

## 5. Acceptance criteria

- [ ] `sitemap.xml` is valid (passes Search Console / XML validator) and submitted.
- [ ] Sitemap contains only the 8 live plans + hub; MetLife NCD and redirect-only URLs excluded.
- [ ] `lastmod` is populated from `verified_at` / `dateModified`.
- [ ] `robots.txt` is live, allows the crawl, and references the sitemap.
- [ ] MetLife `noindex` is respected and **not** blocked by robots.txt.
- [ ] Full plan content appears in View Source (JS disabled) for all 9 routes.
- [ ] No crawlable content is client-only-rendered; all internal links are HTML `<a href>`.
