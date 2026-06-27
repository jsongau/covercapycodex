# 06 — Duplicate / Canonical / Crawl-Waste Audit (/dental/)

Audited: 2026-06-26. Repo: `/Users/kytlegacy/covercapycodex ultimate 21JUN26`
Scope: duplication, canonical correctness, crawl waste across the `/dental/` SEO tree.
Config: `vercel.json` (`cleanUrls: true`, `trailingSlash: false`), `dental/sitemap-dental.xml`.

---

## TL;DR — Prioritized defect list

| # | Severity | Defect | Pages affected | Fix |
|---|----------|--------|---------------|-----|
| P0 | Critical | Entire duplicate state tree `/dental/nv/` mirrors `/dental/nevada/`, both self-canonical | ~280 nv pages | 301 `/dental/nv/*` -> `/dental/nevada/*`, delete `nv/` from disk + generator |
| P0 | High | `/dental/nv/` pages link internally to `/dental/nv/...` (37+ hrefs) | nv tree | Removed once nv tree deleted; ensure generator never emits `nv` slug |
| P1 | Medium | Doubled-city slugs `/{state}/{metro}/{metro}/` (buffalo/buffalo, austin/austin, chicago/chicago, phoenix had none, las-vegas/las-vegas, reno/reno, etc.) | ~15+ metros | NOT errors — distinct T4a metro vs T4c city tiers. But thin/near-dup risk: differentiate copy or canonical city->metro where office sets overlap |
| P1 | Medium | Stale `/dentists/` paths embedded in 21 `/dental/` pages | 21 files | Fix generator string source; rebuild affected hubs |
| P2 | Medium | Sitemap covers only 700 hub URLs; ~11,396 index.html on disk means T5 dentist pages are absent from sitemap | ~10,600 T5 | Add T5 URLs to sitemap (or split into sitemap index) |
| P2 | Low | `cleanUrls:true` => both `/page` and `/page.html` resolve = duplicate access paths | sitewide | Rely on canonicals (present); optionally 301 `.html` -> clean |
| P3 | Low | Soft-404 risk on hubs with 0 offices | spot-check needed | Audit office_count==0 hubs; noindex or redirect |

---

## 1. Duplicate state folders — `/dental/nv/` vs `/dental/nevada/`  [P0 CONFIRMED]

Both full trees exist on disk and **each self-canonicals to itself**:

- `dental/nv/index.html` line 18: `<link rel="canonical" href="https://www.covercapy.com/dental/nv/" />`
- `dental/nevada/index.html` line 18: `<link rel="canonical" href="https://www.covercapy.com/dental/nevada/" />`

`nv/` is a near-complete mirror of `nevada/` (`nv/las-vegas/...`, `nv/henderson/...`, `nv/summerlin/...`, plus T5 dentist profiles). The `nv/` tree is **~280 pages** (full HTML file list ~34KB). The `nevada/` tree is the canonical one — it is the version present in the sitemap and uses the documented full-state-name slug convention (CLAUDE.md: "State slug: lowercase, hyphenated" full name e.g. "California").

Crawl harm:
- Split link equity / duplicate content across two identical trees.
- `nv/` pages link **internally** to `/dental/nv/...` (37+ hrefs found), keeping Googlebot inside the dupe tree.
- No redirect currently exists in `vercel.json` for `/dental/nv`.

### Fix — exact `vercel.json` redirect (add to `redirects[]`)
```json
{
  "source": "/dental/nv",
  "destination": "/dental/nevada",
  "permanent": true
},
{
  "source": "/dental/nv/:rest*",
  "destination": "/dental/nevada/:rest*",
  "permanent": true
}
```
Then **delete the `dental/nv/` directory** from git and ensure the generator emits only the full-name slug (`stateSlug("Nevada")` must return `nevada`, never `nv`). Check `markets`/`dentists` rows for a state value or abbreviation feeding the `nv` slug. Verify no other state has an abbreviation twin (scan for `/dental/ca/`, `/dental/tx/`, `/dental/ny/`, etc.).

---

## 2. Doubled city slugs — `/{state}/{metro}/{metro}/`  [P1 — mostly intended, thin-content risk]

Confirmed examples (city page nested under same-named metro hub):
- `dental/new-york/buffalo/buffalo/` (canonical self: `.../buffalo/buffalo/`)
- `dental/texas/austin/austin/`, `dental/texas/amarillo/amarillo/`, `dental/texas/beaumont/beaumont/`
- `dental/illinois/chicago/chicago/`, `dental/pennsylvania/altoona/altoona/`
- `dental/new-york/albany/albany/`, `dental/new-york/binghamton/binghamton/`
- `dental/nevada/las-vegas/las-vegas/`, `dental/nevada/reno/reno/`
(No `phoenix/phoenix/` found — Phoenix metro children use suburb slugs.)

**These are NOT canonical errors.** Per CLAUDE.md URL architecture, `/{state}/{metro}/` is the **T4a metro hub** and `/{state}/{metro}/{city}/` is the **T4c city page**. When the principal city shares the metro name, the slug doubles. Example confirmed:
- `dental/new-york/buffalo/index.html` = metro hub (T4a).
- `dental/new-york/buffalo/buffalo/index.html` = Buffalo *city* page (T4c), title "PPO Dentists in Buffalo, NY", 13 offices, T5 dentist profiles nested beneath it.

Risk: the metro hub and the same-named city page cover heavily overlapping office sets and read as near-duplicates. Each self-canonicals, so no hard dup signal, but they compete for the same query ("PPO dentists in Buffalo").

### Recommendation
Do NOT 301 these blindly (they hold distinct dentist children). Instead, in the generator:
- Differentiate intent: metro hub = "Buffalo metro / Western New York area, X cities"; city page = "City of Buffalo proper, X offices". Distinct H1, intro, and office scope.
- Where a metro has *only* its principal city (no other child cities), collapse the city into the metro and `301` the doubled path: `/{state}/{metro}/{metro}/ -> /{state}/{metro}/`. Gate this on `child_city_count <= 1`.
- Otherwise leave both, but ensure cross-links (metro -> city, city -> metro breadcrumb) so equity flows.

---

## 3. Stale `/dentists/` paths embedded in `/dental/` pages  [P1]

`grep -rl '/dentists/' dental` => **21 files**, 40 total occurrences. Concentrated in Texas/NY hub pages and a few T5s, e.g.:
- `dental/texas/central-texas/index.html` (20 occurrences)
- `dental/texas/austin/austin/index.html`, `dental/texas/amarillo/amarillo/index.html`
- `dental/new-york/buffalo/buffalo/index.html`, `.../binghamton/binghamton/`, `.../albany/albany/`
- `dental/california/los-angeles/burbank/coastland-dental/index.html`

These are stale `/dentists/`-prefixed internal links (the legacy path documented as dead in CLAUDE.md: "seo_path column is stale — all dentists have /dentists/ prefix"). They send crawlers to non-existent/legacy URLs (crawl waste + broken internal links).

### Fix
These are baked into hub HTML by the generator — likely a `dentistCard`/related-links helper still concatenating `/dentists/` or reading `d.seo_path`. In `seo-build/generate-plans.js`, audit every URL builder to use parts only (`/dental/${stSlug}/${mkSlug}/${citySlug}/${d.slug}/`) per CLAUDE.md rule, then **rebuild the affected hubs** (`--hubs`) so the 21 files regenerate clean. Add a post-build assertion: fail build if any emitted file contains the literal `/dentists/`.

---

## 4. Canonical correctness  [PASS with the two exceptions above]

Spot-checks: every sampled page self-canonicals to its own clean `https://www.` + trailing-slash URL (matches `vercel.json trailingSlash:false` + the page being an `index.html` directory => served at trailing-slash path). Format is correct (`www`, https, trailing slash).

Two structural problems:
- **nv vs nevada** (Defect 1): two distinct trees self-canonical to themselves = duplicate content with no consolidation. This is the only case of effectively-shared content with non-shared canonicals.
- Doubled-city pages self-canonical correctly but compete (Defect 2).

No case found of two different pages declaring the *same* canonical URL.

---

## 5. Sitemap coverage  [P2]

`dental/sitemap-dental.xml` = **700 `<loc>` entries**, all hub-tier (T3 state, T3.5 region, T4a metro, T4b/T4c city). It correctly:
- Uses clean `https://www.covercapy.com/...` trailing-slash URLs.
- Uses `nevada/` (NOT `nv/`) — the dupe tree is **excluded** (good).
- Excludes the abbreviation tree and contains no `/dentists/` paths.

But on disk there are ~**11,396 `index.html`** files. The ~10,600 T5 dentist-profile pages (the money pages) are **absent from the sitemap** — Google must discover them via internal links only, slowing/limiting indexation.

Also note: `nevada/` itself contains doubled-city hubs (`/nevada/reno/reno/`, `/nevada/las-vegas/las-vegas/`) that DO appear via the city tier — confirm whether sitemap should include or canonicalize these.

### Fix
Generator should emit T5 URLs into the sitemap. Given the 50k-URL / 50MB sitemap limit and 11k+ URLs, build a **sitemap index** with sharded child sitemaps (e.g. one per state, or `sitemap-dental-1.xml`...). Keep excluding `nv/` and any 301'd doubled-city paths.

---

## 6. Soft-404 risk on empty hubs  [P3 — needs targeted scan]

Hubs generated for markets with `office_count == 0` would render a near-empty "0 PPO offices" page = soft-404 / thin-content. Buffalo metro shows real counts (13 offices), so not universal. Recommendation: in the generator, **skip emitting** (or `noindex` + drop from sitemap) any city/metro hub whose dentist list is empty, and never link to it. Add a build report listing hubs with <3 offices for manual review.

---

## 7. trailingSlash / cleanUrls — duplicate access paths  [P2]

`vercel.json`: `"cleanUrls": true, "trailingSlash": false`.
- `cleanUrls:true` means `/path/index.html`, `/path/`, and `/path.html` (for flat files) can all resolve = multiple URLs for one document. Vercel auto-301s `/x.html` -> `/x` and strips `index.html`, which mitigates most of it, and every page carries a correct self-canonical, so duplicate-indexing risk is low.
- Residual risk: legacy inbound links / sitemaps referencing `.html`. The existing redirect block already 301s several `.html` aliases (`/ppodentists.html`, `/estimatecost.html`, etc.) — good pattern. No blanket `.html`->clean rule is needed for `/dental/` since those are directory `index.html` (served at the clean trailing-slash path) and self-canonical.

Action: none required for `/dental/`; rely on existing canonicals + Vercel's clean-URL 301s. Monitor GSC "Duplicate, Google chose different canonical" for `.html` variants.

---

## Consolidated action checklist

1. **[P0]** Add the two `/dental/nv` 301 rules above to `vercel.json`; delete `dental/nv/`; fix `stateSlug` so Nevada never slugs to `nv`; scan for other abbreviation twins.
2. **[P1]** Fix generator URL builders so no `/dentists/` literals are emitted; rebuild hubs; add a build-fail assertion on `/dentists/`.
3. **[P1]** Differentiate metro-hub vs same-named city-page copy; collapse+301 doubled city only where the metro has a single child city.
4. **[P2]** Emit T5 dentist URLs into a sharded sitemap index; keep excluding `nv/` + 301'd paths.
5. **[P3]** Skip/`noindex` empty hubs; produce a thin-hub build report.
6. Re-run generator from repo root, commit `dental/` + `vercel.json`, push.
