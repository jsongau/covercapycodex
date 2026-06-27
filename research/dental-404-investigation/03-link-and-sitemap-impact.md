# 03 — Link & Sitemap Impact of 360 Missing City Hubs

Read-only audit. Nothing modified. Repo: `/Users/kytlegacy/covercapycodex ultimate 21JUN26`.

## TL;DR — Blast Radius

| Metric | Count |
|---|---|
| Missing city-hub pages (404 on live) | **360** (of 923 city-level dirs) |
| Dead **internal links** pointing at the 404 city hubs | **5,144** occurrences |
| ├─ from **T5 dentist profiles** (breadcrumb HTML + JSON-LD) | 5,001 across 2,494 profiles |
| └─ from **T4 metro hubs** ("Browse by City" pills) | 143 across 72 metro hubs |
| **Dead sitemap entries** (404 URLs listed as `<loc>`) | **0** |
| **Dentist profiles orphaned-up** (sit under a missing city) | **2,494** |

## 1. SITEMAP — clean, NOT a crawler trap (good news)

Checked `sitemap-index.xml`, `dental/sitemap-dental.xml` (700 `<loc>`), `sitemap.xml`, `sitemap-content.xml` (786 unique paths total).

- **0 of the 360 missing city URLs appear in any sitemap.** Every `<loc>` (163 metro-tier + 523 city-tier dental URLs) resolves to a real `index.html` on disk.
- The principal-city hubs (e.g. `san-diego/san-diego`, `seattle/seattle`, `chicago/chicago`) are absent from BOTH the filesystem and the sitemap — they were simply never generated, so they were also never sitemapped.
- **Implication:** Google is not being *fed* these 404s via sitemap. It discovers them only by **crawling internal links** (below). Lower-severity than a poisoned sitemap, but still a real crawl-budget / link-equity leak.

## 2. INTERNAL LINKS — 5,144 dead links, the real problem

Counted by extracting every `https://www.covercapy.com/dental/...` target across all existing `/dental/` pages and exact-matching (trailing slash normalized) against the 360 missing paths — so profile URLs that merely share the city prefix are NOT counted.

- **5,001 dead links from 2,494 T5 dentist profiles.** Each orphaned profile carries **2** references to its now-404 city hub:
  - Visible breadcrumb `<a href>` (e.g. line 707: `…/illinois/chicago/chicago/">Chicago</a>`)
  - JSON-LD `BreadcrumbList` `item` @id (e.g. line 431: `"item": "…/chicago/chicago/"`)
  - So the broken crumb is in both rendered HTML **and** structured data — Google sees it twice.
- **143 dead links from 72 T4 metro hubs.** The "Browse PPO Dentists by City" pill grid links to *every* child city, including the missing ones. Example: San Diego metro hub pill `…/san-diego/san-diego` labeled "San Diego — 139 offices" → 404. (Hub pills use no trailing slash; breadcrumbs/schema do.)

No dead links found from T3 state hubs or sibling city pages.

## 3. BREADCRUMBS — confirmed broken on all 2,494 orphaned profiles

Every dentist profile under a missing city has its level-4 breadcrumb crumb pointing at the 404 city hub (HTML + schema). So **2,494 profiles each have a broken breadcrumb chain** — a user clicking the city crumb lands on a 404, and the BreadcrumbList rich-result is invalid.

## 4. Worst Offenders (priority = profiles orphaned under each missing city)

| Missing city hub | Orphaned profiles |
|---|---|
| illinois/chicago/**chicago** | 347 |
| california/san-diego/**san-diego** | 278 |
| nv/las-vegas/**las-vegas** | 106 |
| california/los-angeles/**los-angeles** | 106 |
| california/sacramento/**sacramento** | 44 |
| washington/seattle/**seattle** | 42 |
| washington/bellingham/**bellingham** | 40 |
| washington/tacoma/**tacoma** | 38 |
| washington/yakima / vancouver | 36 each |
| rhode-island/warwick/**warwick** | 34 |

The pattern: **the metro's principal city** (city slug == metro slug, e.g. `chicago/chicago`, `san-diego/san-diego`) is the highest-traffic, highest-profile-count hub and is the one most often missing. These few pages account for a hugely disproportionate share of the 2,494 orphaned profiles.

Missing cities by state: California 59, New York 49, Ohio 43, Pennsylvania 37, New Jersey 35, Connecticut 25, Arizona 21, Nevada 19+6, Washington 18, Rhode Island 16, Florida 16, Texas 14, NC 1, IL 1.

## Priority Order for the Fix

1. **Principal-city hubs first** (`{metro}/{metro}`) — chicago, san-diego, las-vegas, los-angeles, sacramento, seattle. Restoring ~6 pages reverses well over 1,000 orphaned profiles and the bulk of the 5,001 dead breadcrumb links.
2. **Remaining high-count missing cities** (bellingham, tacoma, warwick, providence, the Texas/Washington mid-tier cities ≥25 profiles).
3. **The long tail** of low-profile missing cities (CA/NY/OH/PA suburbs) — many have just a handful of profiles each.
4. **Add the restored city hubs to `dental/sitemap-dental.xml`** once generated (they are currently absent — fixing the pages without sitemapping them leaves them discoverable only via internal links).

## Method Notes

- Missing list: `find dental -mindepth 3 -maxdepth 3 -type d` where no `index.html` → 360 → `/tmp/missing.txt`.
- Internal links are **absolute** (`https://www.covercapy.com/dental/...`), which is why a naive `href="/dental/` search returns 0; matching was done on the absolute form.
- Dead-link count is an exact set-membership match (trailing slash normalized), so it excludes deeper profile URLs that share a missing-city prefix.
