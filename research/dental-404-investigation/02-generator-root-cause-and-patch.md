# 02 — Generator Root Cause + Safe Patch for 360 Missing City Hubs

Investigated: 2026-06-26. Repo: `/Users/kytlegacy/covercapycodex ultimate 21JUN26`
Generator: `seo-build/generate-plans.js` (gitignored; runs on Mac vs Supabase — read/patch only here).
Symptom: ~360 `/dental/{state}/{metro}/{city}/index.html` city hubs 404 on live, while the T5 dentist-profile pages *nested inside* those same paths exist and resolve.

---

## TL;DR

There are **two independent bugs in one orchestrator loop** (`generateLocationPages`, lines 3404–3436), both stemming from the **city-hub loop and the T5 dentist loop disagreeing about which cities exist**:

| Bucket | Count (disk) | Root cause | Line(s) |
|--------|-------------|------------|---------|
| **Principal cities** (citySlug == metroSlug, e.g. `chicago/chicago`, `san-diego/san-diego`, `seattle/seattle`) | **71** | Explicit `if (cSlug === mkSlug) continue;` skips writing the city hub. The T5 loop has **no such skip**, so it still writes dentist profiles under `/{metro}/{metro}/{dentist}/`. | **3423–3426** |
| **Ordinary cities** | **289** (247 with <4 dentist dirs, 42 with ≥4) | City-hub loop only iterates `groupByCities(...)`, which **filters to `offices.length >= MIN_OFFICES` (4)** (line 448). The T5 loop iterates **every dentist row** with no office-count floor, so small cities and slug-variant cities get profiles but no parent hub. | **448 + 3421** |

Disk verification (exact): 916 city-level dirs that contain dentist children; **360** of them have no `index.html` — **71 principal + 289 ordinary**, matching the reported figure exactly.

Both buckets share one structural defect: **the T5 loop (3499–3540) emits a dentist page for any dentist, but the T4c loop (3420–3431) emits a city hub only for a filtered, deduped subset of cities.** Every dentist page links up to a city hub that was never written → 404.

---

## 1. The write paths (exact)

`writeFile(relPath, content)` (lines 2796–2804) joins `OUT_DIR` (`'.'`, line 43) + `relPath` and `mkdirSync(..., {recursive:true})`. So all paths are relative to repo root → `dental/...`.

- **T4a metro hub** (line 3416): `dental/${stSlug}/${mkSlug}/index.html`
- **T4c city hub** (line 3428): `dental/${stSlug}/${mkSlug}/${cSlug}/index.html`  ← these are the 404s
- **T5 dentist** (line 3531): `dental/${stSlug}/${mkSlug}/${cSlug}/${dSlug}/index.html`  ← these exist

where `stSlug = stateSlug(state)`, `mkSlug = slugify(market.seo_area || market.market_area)`, `cSlug = slugify(city)`, `dSlug = d.slug || slugify(d.name)`.

Crucially, **T4c `cSlug` and T5 `cSlug` are computed identically** (`slugify(city)`), so the dentist page and its missing parent hub agree on the path — the parent is simply never written.

---

## 2. Bucket A — Principal-city collision (71 pages)  [lines 3420–3426]

```javascript
// City pages (T4c) — skip if city slug === market slug (e.g. Beaumont market + Beaumont city)
for (const cityData of cities) {
  const cSlug = slugify(cityData.city);
  if (cSlug === mkSlug) {
    console.log(`  ↳ skipping city page for "${cityData.city}" — same slug as market hub`);
    continue;                       // ← city hub never written
  }
  ...
}
```

Intent of the skip was to avoid the doubled-slug near-duplicate the prior audit flagged (`06-duplicate-canonical-crawl.md §2`: `/{metro}/{metro}/`). But:

1. The **T5 loop has no equivalent skip** (lines 3523–3537), so for Chicago it still writes 347 profiles under `dental/illinois/chicago/chicago/{dentist}/index.html`. Their breadcrumb level-4 link points to `/dental/illinois/chicago/chicago/` → which 404s.
2. The skip is **inconsistently applied across the live tree**: `dental/new-york/buffalo/buffalo/index.html` EXISTS (built before the skip was added) and self-canonicals to `…/buffalo/buffalo/`. Newer builds of San Diego / Chicago / Seattle / Las Vegas DON'T have it. So the live tree is half-skipped, half-present — the hallmark of a skip added during the "clean rebuild dedupe" work without re-deriving the whole tree.

Disk proof:
```
MISSING dental/illinois/chicago/chicago/index.html       (347 dentist index.html nested under it)
MISSING dental/california/san-diego/san-diego/index.html (278 nested)
MISSING dental/washington/seattle/seattle/index.html     (42 nested)
MISSING dental/nevada/las-vegas/las-vegas/index.html     (5 nested)
EXISTS  dental/new-york/buffalo/buffalo/index.html        (legacy, self-canonical to /buffalo/buffalo/)
```

---

## 3. Bucket B — MIN_OFFICES filter + city-string fragmentation (289 pages)  [lines 448, 3421]

`groupByCities` (lines 440–460) keys by **exact raw `d.city` string** and then:

```javascript
.filter(([, offices]) => offices.length >= MIN_OFFICES)   // line 448, MIN_OFFICES = 4
```

The city-hub loop (line 3421) iterates only that filtered list. The T5 loop (lines 3516–3537) groups by `d.city` too but **never applies the ≥4 filter** and **never skips** — it writes a profile for every dentist with a slug. Result: cities with 1–3 in-network offices (247 of the 289) get dentist pages but no city hub.

The remaining **42 ordinary cities have ≥4 dentist subdirectories yet still no hub.** Cause: `groupByCities` buckets by the **exact `d.city` text**, whereas the T5 path buckets by **`slugify(d.city)`**. When a market has two raw spellings that slugify to the same slug (e.g. "St. Pete Beach" / "St Pete Beach", "Saint Petersburg" / "St. Petersburg"), each raw bucket falls below 4 and is filtered out, but their *slugs collide* into one ≥4-page directory on disk with no hub. Examples confirmed on disk: `florida/tampa-bay/st-pete-beach (6)`, `rhode-island/newport/tiverton (6)`, `california/central-valley/fresno (4)`, `california/bay-area/milpitas (6)`.

So Bucket B is really **(b) MIN_OFFICES floor + (d) slug-vs-raw-city grouping mismatch** from the hypothesis list — not a top-markets-only restriction and not a missing-slug skip.

---

## 4. Canonical strategy for the fix (avoid re-introducing the §2 duplicate)

The prior audit (`06-duplicate-canonical-crawl.md §2/§4`) warned that a principal-city page that **self-canonicals to the doubled path** competes head-to-head with the metro hub for the same query and reads as near-duplicate (overlapping office sets). To emit the missing hubs WITHOUT recreating that:

- **Principal cities (city==metro):** emit the hub so dentist breadcrumbs resolve (no 404), but set its `<link rel=canonical>` to the **metro hub** `/{st}/{mk}/`, and add `<meta name="robots" content="noindex,follow">`. This consolidates the duplicate signal to the metro hub (which is the indexable T4a page) and keeps the page crawlable as a routing/breadcrumb target. Do **not** add it to the sitemap.
- **Ordinary small cities (<4 offices):** these are genuinely distinct geographies, not duplicates — emit them self-canonical and add to the sitemap as today. (Optionally `noindex,follow` only those with `office_count < 2` to avoid thin pages; not required to fix the 404s.)
- **Slug-collision cities (the 42):** group by slug so all offices that slugify to the same city land in one hub with the correct merged `office_count`; self-canonical, sitemap-included.

This means the patch must **derive city groups by slug with no MIN_OFFICES floor**, and choose canonical per-city based on whether the slug collides with the metro slug.

---

## 5. THE PATCH (minimal, safe, additive)

Two edits. Edit 1 replaces the filtered/deduped city loop with a slug-based grouping that covers ALL cities (both buckets) and sets the right canonical. Edit 2 adds a one-line optional param to `buildCityPage` so principal-city pages can override their canonical + emit `noindex`. Nothing is deleted or renamed; the metro hub, T5 loop, and all other tiers are untouched.

### Edit 1 — `generateLocationPages`, replace lines 3420–3431

```diff
-      // City pages (T4c) — skip if city slug === market slug (e.g. Beaumont market + Beaumont city)
-      for (const cityData of cities) {
-        const cSlug = slugify(cityData.city);
-        if (cSlug === mkSlug) {
-          console.log(`  ↳ skipping city page for "${cityData.city}" — same slug as market hub`);
-          continue;
-        }
-        const cityHtml = buildCityPage(cityData, market, cities, plans);
-        writeFile(`dental/${stSlug}/${mkSlug}/${cSlug}/index.html`, cityHtml);
-        totalCities++;
-        sitemapUrls.push({ loc:`${BASE_URL}/dental/${stSlug}/${mkSlug}/${cSlug}/`, priority:'0.7' });
-      }
+      // City pages (T4c) — emit a hub for EVERY city slug that has at least one
+      // dentist profile, so no dentist page is ever orphaned (was: only cities
+      // with >=MIN_OFFICES, and principal cities were skipped entirely -> 404s).
+      // Group by SLUG (not raw d.city) so spelling variants merge into one hub.
+      const citiesBySlug = new Map();   // cSlug -> { city, dentists[] }
+      for (const d of dentists) {
+        if (!d.city) continue;
+        const cSlug = slugify(d.city);
+        if (!cSlug) continue;
+        if (!citiesBySlug.has(cSlug)) citiesBySlug.set(cSlug, { city: d.city, dentists: [] });
+        citiesBySlug.get(cSlug).dentists.push(d);
+      }
+      for (const [cSlug, grp] of citiesBySlug) {
+        const offices = grp.dentists;
+        const ratings = offices.map(o => parseFloat(o.weighted_rating)).filter(v => v > 0);
+        const cityData = {
+          city: grp.city,
+          office_count: offices.length,
+          avg_rating: ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : null,
+          total_reviews: offices.reduce((s,o)=>s+(parseInt(o.google_review_count)||0),0),
+          dentists: offices,
+        };
+        // Principal city (slug collides with metro): emit hub so dentist
+        // breadcrumbs resolve, but canonical it to the metro hub + noindex so it
+        // does NOT compete with / duplicate the T4a metro page. Keep out of sitemap.
+        const isPrincipal = (cSlug === mkSlug);
+        const cityHtml = buildCityPage(cityData, market, cities, plans, {
+          canonicalOverride: isPrincipal ? `${BASE_URL}/dental/${stSlug}/${mkSlug}/` : null,
+          noindex: isPrincipal,
+        });
+        writeFile(`dental/${stSlug}/${mkSlug}/${cSlug}/index.html`, cityHtml);
+        totalCities++;
+        if (!isPrincipal) {
+          sitemapUrls.push({ loc:`${BASE_URL}/dental/${stSlug}/${mkSlug}/${cSlug}/`, priority:'0.7' });
+        }
+      }
```

Notes:
- The `cities` array (from `groupByCities`, still built at line 3411) is unchanged and is still passed to `buildMarketHub` and as the `allCities` arg of `buildCityPage`, so existing "other cities in this metro" rails keep showing only the ≥4-office cities — no behavior change there.
- Grouping by slug fixes the 42 collision cities automatically (their `office_count` now reflects the merged set).

### Edit 2 — `buildCityPage` signature + head, lines 1455–1462

```diff
-function buildCityPage(cityData, market, allCities, plans) {
+function buildCityPage(cityData, market, allCities, plans, opts = {}) {
   const { city, office_count, avg_rating, total_reviews, dentists } = cityData;
   const { market_area, seo_area, state } = market;
   const abbr    = stateAbbr(state);
   const stSlug  = stateSlug(state);
   const mkSlug  = slugify(seo_area || market_area);
   const cSlug   = slugify(city);
-  const canonical = `${BASE_URL}/dental/${stSlug}/${mkSlug}/${cSlug}/`;
+  const selfUrl   = `${BASE_URL}/dental/${stSlug}/${mkSlug}/${cSlug}/`;
+  const canonical = opts.canonicalOverride || selfUrl;   // principal cities -> metro hub
+  const robotsTag = opts.noindex ? '\n  <meta name="robots" content="noindex,follow" />' : '';
```

Then inject `robotsTag` in the `<head>` next to the canonical link. Find the head template line that prints the canonical (uses `canonical`) and append `${robotsTag}` immediately after it. (Schema/breadcrumb already reference `canonical`; for principal cities they will now point at the metro hub, which is correct — the breadcrumb's terminal item should match the indexable target.)

> If `buildCityPage` builds its head via the shared `pageShell({...})`, pass `meta: ... + robotsTag` or add a `robots` field there instead — the one-line goal is "noindex when `opts.noindex`". Locate the canonical emission inside `buildCityPage`/`pageShell` and add the tag adjacent to it.

### No other edits
- T5 dentist loop: leave as-is — it already writes every profile; the patch makes their parent hubs exist.
- `vercel.json`: no redirect needed; these become real 200s.
- Existing `dental/.../buffalo/buffalo/index.html` (legacy self-canonical) will be **overwritten on next full build** by the new principal-city version (canonical→metro, noindex), resolving the §2 doubled-slug duplicate at the same time. Good side effect, no extra work.

---

## 6. Post-build verification (add to the run checklist)

After `node seo-build/generate-plans.js` from repo root:

```bash
# 0 expected: every dir that has a dentist child must now have its own index.html
find dental -mindepth 3 -maxdepth 3 -type d \
  -exec sh -c 'd="$1"; [ "$(find "$d" -mindepth 1 -maxdepth 1 -type d | wc -l)" -gt 0 ] && [ ! -f "$d/index.html" ] && echo "ORPHAN $d"' _ {} \;

# principal-city hubs must be noindex + canonical to metro
grep -L 'rel="canonical" href="https://www.covercapy.com/dental/illinois/chicago/"' \
  dental/illinois/chicago/chicago/index.html   # should print nothing
grep -c 'noindex' dental/illinois/chicago/chicago/index.html   # should be 1
```

Expected new output: ~289 additional self-canonical city hubs added to the sitemap, ~71 principal-city hubs emitted as noindex (not in sitemap). `git add -A && commit && push`.

---

## Root cause, one line

The T5 dentist loop writes a profile for **every** dentist, but the T4c city-hub loop writes a hub only for cities that (a) clear the `MIN_OFFICES>=4` filter and (b) are **not** principal cities (`cSlug===mkSlug` is `continue`d) — so 71 principal + 289 small/slug-variant cities get profiles whose parent hub is never written → 404. Fix: derive city hubs by slug from the same dentist set the T5 loop uses (no office floor, no principal skip), canonicalizing principal-city hubs to the metro hub + noindex to avoid the doubled-slug duplicate.
