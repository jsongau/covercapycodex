# Legacy `/dentists/` Tree — Technical SEO Audit

**Date:** 2026-06-26
**Repo:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26`
**Scope:** Whether the legacy `/dentists/` page tree is a duplicate-content / crawl-waste problem versus the current `/dental/` tree.

---

## 1. Inventory — 22 legacy `index.html` files

All under `dentists/california/`, across 3 market areas:

| Area | Cities | Profiles |
|------|--------|----------|
| los-angeles-county | beverly-hills, burbank | abri-dental (x2) |
| inland-empire | chino (5), chino-hills (5) | 10 profiles |
| orange-county | costa-mesa, fountain-valley, garden-grove, huntington-beach, westminster | 10 profiles |

Full list (22): chino/{smile-artistry-of-chino-valley, dentistry-4-kids-more, randa-nasr-dds, barsoum-dental, upland-dental-implant-orthodontics}-chino; chino-hills/{hillcrest-dental-studio-chino-hills-2, gordon-ranch-dentistry, dental-matrix, liu-peter-c-dds, avion-dental}-chino-hills; costa-mesa/costa-mesa-family-dental; fountain-valley/{magnolia-family-dental, kyt-dental-services, brookhurst-dental-care}; garden-grove/{harbor-dental-care, garden-grove-dental-arts}; huntington-beach/{beach-cities-dental, pacific-coast-dental}; westminster/{bolsa-dental, westminster-dental-group}; los-angeles-county/{beverly-hills, burbank}/abri-dental.

---

## 2. Page-level findings (6 sampled)

| Legacy page | Title | Canonical | Robots | /dental/ equivalent |
|---|---|---|---|---|
| fountain-valley/kyt-dental-services | "KYT Dental Services \| Top-Rated PPO Dentist in Orange County, CA \| CoverCapy" | **self** → `/dentists/.../kyt-dental-services/` | none (defaults indexable) | YES `/dental/california/orange-county/fountain-valley/kyt-dental-services/` |
| costa-mesa/costa-mesa-family-dental | "Pacific Harbor Dental Group \| PPO Dentist in Orange County, CA…" (name mismatch) | **self** → `/dentists/.../costa-mesa-family-dental/` | none | Metro/city exists `/dental/california/orange-county/costa-mesa/` (slug differs) |
| beverly-hills/abri-dental | "Abri Dental \| PPO Dentist in Los Angeles, CA…" | **self** (no trailing slash) | **`index,follow,max-image-preview:large…`** explicitly indexable | partial |
| chino/barsoum-dental-chino | "Barsoum Dental \| PPO Dentist in Chino, CA…" | **self** | none | YES but under DIFFERENT path: `/dental/california/san-bernardino/chino/barsoum-dental-chino/` (legacy uses `inland-empire`) |

**Critical:** every legacy page is **self-canonical to its own `/dentists/` URL** — NOT canonicalized to the `/dental/` equivalent. At least one (abri-dental) carries an explicit `index,follow` robots tag. None carry `noindex`. They are fully indexable duplicates.

---

## 3. Duplicate / canonical / indexability / linking

- **(a) Duplicates:** Yes. Same dentists, near-identical titles/copy as `/dental/` T5 profiles. Confirmed `/dental/` equivalents exist for kyt, barsoum, abri, etc.
- **(b) Canonical:** Self-canonical (cannibalization risk) — NOT pointing to `/dental/`. This actively competes with the canonical tree.
- **(c) Indexable:** Yes. No noindex; robots.txt only disallows `/docs/`, so `/dentists/` is crawlable and indexable. One page explicitly `index,follow`.
- **(d) Internal links:** Yes, linked from:
  - `areas-orange-county.html` — many `href="/dentists/california/orange-county/…"` city + carrier links (~30 hrefs)
  - `compare-ppo-dental-plans.html`
  - the legacy `ppo-dentists/` tree (separate legacy tree, ~12 files) links into `/dentists/`
  - legacy pages cross-link each other
  - `docs/ppo-redesign/_zip-21jun/compare-ppo-NEW.html` (docs, gitignored)

---

## 4. vercel.json & redirects

`vercel.json` has redirects for `/best-ppo-dentists/*`, `/ppodentists`, `/ppo-dentists`, `/for-dentists/*` — **but NO rule for `/dentists/`**. The legacy tree is served live as static files, 200 OK. No 301 to `/dental/`.

## 5. Sitemaps

- `sitemap-index.xml` references: `sitemap.xml`, `sitemap-content.xml`, `dental/sitemap-dental.xml`.
- `dental/sitemap-dental.xml`: 0 `/dentists/` URLs (clean).
- **`sitemap.xml` DOES list one `/dentists/` URL:** `https://www.covercapy.com/dentists/california/orange-county/fountain-valley/kyt-dental-services/` — actively submitting a legacy duplicate to Google.

---

## 6. SEO harm assessment

- **Duplicate content:** 22 near-identical pages competing with canonical `/dental/` T5 profiles.
- **Self-canonical cannibalization:** legacy pages claim themselves as canonical, splitting ranking signals and letting Google choose the wrong URL.
- **Split authority:** internal links from `areas-orange-county.html`, `compare-ppo-dental-plans.html`, and the `ppo-dentists/` tree pass PageRank INTO `/dentists/` instead of `/dental/` — leaking equity to the dead tree.
- **Crawl waste:** small in absolute terms (22 pages) but the tree is discoverable + sitemap-listed, so it consumes crawl/index budget and pollutes the index.
- **Path drift:** legacy market slugs are stale (`inland-empire` vs current `san-bernardino`; Chino legacy slug ≠ current /dental/ path), and one title is wrong (costa-mesa-family-dental titled "Pacific Harbor Dental Group"). These are exactly the stale `seo_path` `/dentists/` artifacts CLAUDE.md warns about.

---

## 7. RECOMMENDATION — 301-redirect `/dentists/*` → `/dental/` (NOT leave as-is)

Do **(a) 301 redirect**, not delete (preserves any earned equity + handles inbound links/sitemap). Reasons: pages are indexed, internally linked, and one is in the sitemap, so a hard delete would 404 live links. Self-canonical duplicates must not be left as-is.

### Step 1 — Per-profile 301s where the /dental/ slug matches (preferred, preserves topical signal)

Add to `vercel.json` `redirects` (build targets from parts, NOT seo_path). Confirmed mappings:

```json
{ "source": "/dentists/california/orange-county/fountain-valley/kyt-dental-services", "destination": "/dental/california/orange-county/fountain-valley/kyt-dental-services/", "permanent": true },
{ "source": "/dentists/california/inland-empire/chino/barsoum-dental-chino", "destination": "/dental/california/san-bernardino/chino/barsoum-dental-chino/", "permanent": true }
```

Note the market-slug drift: legacy `inland-empire` → current `san-bernardino`. Each Chino/Chino-Hills profile must be mapped individually because the area folder changed. Verify each `/dentists/` slug against `find dental -path "*<slug>*"` before writing its destination — do not assume `inland-empire` maps 1:1.

### Step 2 — Catch-all fallback for any unmatched legacy URL

After the explicit per-profile rules, add a catch-all so nothing 404s:

```json
{ "source": "/dentists/:path*", "destination": "/dental/:path*", "permanent": true }
```

Caveat: this only works for paths whose `/dentists/...` segment equals the `/dental/...` segment. Where slugs drifted (inland-empire→san-bernardino), the per-profile rules in Step 1 must precede it. For truly unmappable legacy URLs, fall back to the relevant city/metro hub, e.g. `/dentists/california/orange-county/:rest*` → `/dental/california/orange-county/` rather than a 404.

### Step 3 — Clean up references (do NOT leave equity leaking)

1. Remove the `/dentists/.../kyt-dental-services/` `<loc>` from `sitemap.xml`.
2. Rewrite all `href="/dentists/…"` in `areas-orange-county.html` and `compare-ppo-dental-plans.html` to the `/dental/` equivalents (and fix the `ppo-dentists/` tree if it is also live).
3. Once redirects ship and Google has reprocessed, the on-disk `dentists/` folder can be deleted from git (redirects in vercel.json will still fire).

**Bottom line:** the legacy `/dentists/` tree is a real duplicate-content + self-canonical cannibalization + equity-leak problem (22 indexable pages, sitemap-listed, internally linked). Fix = 301 to `/dental/` equivalents with per-profile rules for the drifted slugs plus a `/dentists/:path*` catch-all, then de-link and remove from sitemap.
