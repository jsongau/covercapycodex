# A10 — QA, Measurement & Monitoring (The Closer)

SEO Architect 10 of 10. Operational SEO layer for the PPO hub
`compare-ppo-dental-plans.html`. Analyze and spec only. All findings grounded
in real files and line numbers. No em-dashes used.

Repo root: `/Users/kytlegacy/covercapycodex ultimate 21JUN26/`

---

## 1. Files inspected

| File | Role |
|------|------|
| `compare-ppo-dental-plans.html` | The hub page under launch review |
| `vercel.json` | Routing, canonical/trailing-slash policy |
| `robots.txt` | Crawl directive + sitemap pointer |
| `sitemap-index.xml` | Parent index, points to 3 child sitemaps |
| `sitemap.xml` | Core pages (homepage, hub, guides, plans) |
| `sitemap-content.xml` | Insurance content hub (8 hubs + glossary) |
| `dental/sitemap-dental.xml` | 6,493 generated T3 to T5 URLs |

---

## 2. Sitemap + robots correctness

### 2.1 P0 — Hub listed twice with mismatched trailing slash (CONFIRMED)

The prior pass was correct. The hub appears in two child sitemaps with
inconsistent slash style:

- `sitemap.xml` line 6:
  `<loc>https://www.covercapy.com/compare-ppo-dental-plans</loc>` (no slash)
- `sitemap-content.xml` line 15:
  `<loc>https://www.covercapy.com/compare-ppo-dental-plans/</loc>` (trailing slash)

Two problems:
1. The same canonical page is submitted twice across the index. Search engines
   pick one and treat the other as a duplicate or a redirect target, wasting
   crawl budget and muddying canonical signals.
2. The slash-suffixed variant in `sitemap-content.xml` does NOT match the page
   canonical, which is slash-less.

Page canonical (`compare-ppo-dental-plans.html` line 8):
`<link rel="canonical" href="https://www.covercapy.com/compare-ppo-dental-plans" />`
This matches `vercel.json` `"trailingSlash": false` and matches the version in
`sitemap.xml`, not the one in `sitemap-content.xml`.

EXACT FIX (one line, in `sitemap-content.xml` line 15):
```diff
-    <loc>https://www.covercapy.com/compare-ppo-dental-plans/</loc>
+    <loc>https://www.covercapy.com/compare-ppo-dental-plans</loc>
```
Then remove the now-duplicate entry entirely from ONE of the two sitemaps. The
hub belongs in core (`sitemap.xml`). Delete the `compare-ppo-dental-plans` URL
block from `sitemap-content.xml` so each canonical URL is submitted exactly
once across the whole index.

### 2.2 P0 — Whole-sitemap trailing-slash policy conflict (BROADER THAN THE HUB)

`vercel.json` line 3 sets `"trailingSlash": false`. Under this policy Vercel
serves the canonical at the slash-less URL and 308-redirects the slashed
variant. But `sitemap-content.xml` lists almost every URL WITH a trailing
slash:

```
<loc>https://www.covercapy.com/dental-insurance/</loc>
<loc>https://www.covercapy.com/compare-ppo-dental-plans/</loc>
<loc>https://www.covercapy.com/dental-insurance-glossary/</loc>
<loc>https://www.covercapy.com/dental-insurance-no-waiting-period/</loc>
...
<loc>https://www.covercapy.com/find-my-dentist</loc>   <- slash-less, inconsistent within the same file
```

So `sitemap-content.xml` submits slash URLs that all 308-redirect to their
slash-less canonicals. Google tolerates this but flags it as
"Page with redirect" in Coverage and discounts the submitted URL. It also mixes
styles inside one file (`find-my-dentist` has no slash). This is a systematic
defect, not a one-off.

FIX: normalize EVERY `<loc>` in `sitemap-content.xml` to slash-less to match
`trailingSlash:false`. Note `sitemap.xml` and `dental/sitemap-dental.xml` are
already correctly slash-less (verified: `/dental/california/bay-area`,
`/find-my-dentist` etc. carry no trailing slash). Only `sitemap-content.xml`
deviates.

### 2.3 P1 — CLAUDE.md "all trailing slashes" vs vercel trailingSlash:false

`CLAUDE.md` (URL Architecture section) states "All trailing slashes" for the
`/dental/` tier. The live policy is the opposite: `vercel.json`
`"trailingSlash": false` plus `"cleanUrls": true`, and the generated
`dental/sitemap-dental.xml` is slash-less. The doc is stale relative to the
deployed policy. There is no functional break (the sitemap matches the server),
but the doc must be reconciled so the generator is never "fixed" to re-add
slashes. Decision to record: slash-less is the canonical policy. Update
CLAUDE.md to say so.

### 2.4 P2 — robots.txt is minimal but correct

`robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.covercapy.com/sitemap-index.xml
```
Correct: open crawl, points at the index (good, the index fans out to all 3
child sitemaps). Recommended P2 additions: a `Sitemap:` line is enough, but
consider adding `Disallow:` lines for any thank-you / verify-success / query
endpoints (for example `/api/`) once Phase B endpoints exist, so crawlers do
not index POST result pages.

### 2.5 P1 — www vs non-www host consistency

Everything (robots sitemap pointer, all `<loc>` values, page canonical, OG
`og:url`) uses the `www.` host consistently. There is NO non-www to www
redirect defined in `vercel.json`. Vercel handles the apex to www redirect at
the domain config level, not in `vercel.json`, so confirm in the Vercel
dashboard that `covercapy.com` 308-redirects to `www.covercapy.com`. If it does
not, the apex becomes a duplicate host. Verify before launch (P1, dashboard
check, no code change).

---

## 3. vercel.json canonical / trailingSlash policy review

`vercel.json` (lines 1 to 4):
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  ...
}
```

- `cleanUrls:true` strips `.html` so `/compare-ppo-dental-plans` serves
  `compare-ppo-dental-plans.html`. Page canonical is the clean URL. Correct.
- `trailingSlash:false` is the single source of truth for slash policy. All
  sitemaps and canonicals must conform. Two of three already do; fix #2.2 makes
  it three of three.
- Redirects block (lines 19 to 189) is large and uses `"permanent": true`
  (301). Good for equity. PRE-LAUNCH CHECK: confirm no redirect `source`
  collides with a real page path, and that no chain (A to B to C) exists. Spot
  audit shows all redirects target a single final destination, so no chains
  detected, but a build-time check should assert this (see section 6).
- Rewrites (lines 5 to 18) map `/find-my-dentist` and `/best-ppo-dentists/*` to
  `find-my-dentist.html`. The rewritten paths must each carry their OWN
  canonical pointing to the clean URL so the `.html` source is never indexed.
  Verify `find-my-dentist.html` canonical equals `/find-my-dentist` (P1 check).

---

## 4. Pre-launch SEO QA checklist (the hub)

Verified now against `compare-ppo-dental-plans.html`:

| Check | Target | Actual | Status |
|-------|--------|--------|--------|
| Title length | <= 60 chars | 54 (line 6) | PASS |
| Meta description | ~155 chars | 154 (line 7) | PASS |
| Exactly one H1 | 1 | 1 (line 979) | PASS |
| Canonical present + self-referential | yes | line 8, slash-less | PASS |
| Canonical matches sitemap entry | match | matches sitemap.xml, NOT sitemap-content.xml | FAIL until 2.1 fixed |
| OG title/desc/url/image present | all 4 | lines 13 to 16 | PASS (tags) |
| OG image file resolves | 200 | `og/compare-ppo-dental-plans.png` MISSING in repo | FAIL (P0) |
| Twitter card tags | present | lines 17 to 20 | PASS |
| JSON-LD schema present | server-rendered | INJECTED VIA JS (line 2008 appendChild) | RISK (P1) |
| Internal links resolve | no 404 | needs build-time crawl (section 6) | PENDING |

### 4.1 P0 — OG image does not exist in the repo

`compare-ppo-dental-plans.html` lines 16 and 20 reference
`https://www.covercapy.com/og/compare-ppo-dental-plans.png`. There is no `og/`
directory in the repo and no such PNG. Social shares and some SERP card
previews will render a broken image. FIX: create
`og/compare-ppo-dental-plans.png` (1200x630) before launch, or point the tag at
an existing asset. This is a P0 launch blocker because OG is baked into the
canonical hub and is the most-shared page.

### 4.2 P1 — All structured data is injected client-side

`injectSchema()` (around line 2008) builds the entire `@graph`
(Organization, WebSite, Service, Dentist list, Product list, FAQPage,
DefinedTermSet, BreadcrumbList) in JS and appends a `<script type=
"application/ld+json">` to `<head>` at runtime. Googlebot renders JS, so this
usually indexes, but:
- It is not guaranteed for every crawler (Bing, social scrapers, LLM crawlers
  read raw HTML and will see NO schema).
- Rich-result eligibility (FAQ, Breadcrumb) is more reliable with
  server-present JSON-LD.
RECOMMENDATION (P1): pre-render the static parts of the graph (Organization,
WebSite, Service, FAQPage, Breadcrumb, DefinedTermSet) as an inline
`<script type="application/ld+json">` in the static HTML head at build time.
Keep only genuinely dynamic data (live plan list) in JS if needed. At minimum,
validate the rendered output in Google Rich Results Test before launch.

### 4.3 P2 — Roman numerals in FAQ UI

`FAQ_ROMAN=['i','ii','iii',...]` (near line 1963) drives FAQ numbering. CLAUDE.md
forbids roman numerals in copy. These are visual list markers, not prose, so
low severity, but flag for the design owner: switch to arabic if strict.

---

## 5. Search Console + analytics setup list

PRE-LAUNCH (do before DNS cutover / first crawl):
1. Verify the `www.covercapy.com` property in Google Search Console (DNS TXT or
   the Vercel meta tag). Also verify the apex `covercapy.com` property so the
   redirect can be confirmed.
2. Submit `https://www.covercapy.com/sitemap-index.xml` in GSC. Do NOT submit
   the three child sitemaps individually; the index covers them.
3. Set the preferred domain / confirm the apex to www 308 in the Vercel domain
   config.
4. Bing Webmaster Tools: import from GSC, submit the same index.
5. Analytics: install GA4 (or the chosen analytics) on the hub and on
   `find-my-dentist`. Define conversion events: `verify_open`,
   `verify_submit`, `plan_compare_view`, `outbound_official_site`.
6. Add the GA4 / GSC verification snippet to the shared `pageShell` head so
   every generated `/dental/` page inherits it.

POST-LAUNCH MONITORING (weekly):
7. GSC Coverage: watch for "Page with redirect", "Duplicate without
   user-selected canonical", and "Excluded by canonical" (these are the exact
   failure modes the slash mismatch in 2.1 and 2.2 cause).
8. GSC Sitemaps report: confirm "Discovered / Indexed" counts approach the
   6,493 + ~40 submitted URLs. A large gap signals canonical or 308 issues.
9. GSC Enhancements: confirm FAQ and Breadcrumb rich results register (proves
   the JS schema from 4.2 is being read; if zero, server-render it).
10. Core Web Vitals report on the hub once it has field data.

---

## 6. Lightweight build-time link-and-schema check (regression guard)

Goal: prevent the exact defects found here from recurring on every generator
run. Add a small Node post-build script run from the repo root after
`node seo-build/generate-plans.js`. It is a checker, it writes nothing, it exits
non-zero on failure so it can gate a deploy.

Checks to assert:

A. SITEMAP HYGIENE
   - Parse all `<loc>` across `sitemap.xml`, `sitemap-content.xml`,
     `dental/sitemap-dental.xml`. Assert NO URL appears in more than one file
     (kills the 2.1 duplicate).
   - Assert every `<loc>` matches the trailing-slash policy from `vercel.json`
     (`trailingSlash:false` => no `<loc>` ends in `/` except the homepage
     `https://www.covercapy.com/`). Kills 2.2.
   - Assert every `<loc>` uses the `www.` host. Kills host drift.

B. CANONICAL CONSISTENCY
   - For each key static page (hub, find-my-dentist, estimator, financing),
     read its `<link rel="canonical">` and assert the exact URL exists once in
     the sitemaps and obeys the slash policy.

C. OG / ASSET RESOLUTION
   - Extract `og:image` and `twitter:image` paths, strip the host, assert the
     file exists on disk under repo root. Kills 4.1.

D. ONE H1 + TITLE/META LENGTH
   - Assert exactly one `<h1>` per HTML page.
   - Assert `<title>` <= 60 chars and meta description between 120 and 160.

E. SCHEMA PRESENCE + VALIDITY
   - Assert at least one `application/ld+json` block exists in the SERVED HTML
     (catches the 4.2 JS-only case if/when schema is moved server-side).
   - JSON.parse each block; assert it parses and contains the expected
     `@type`s (FAQPage, BreadcrumbList).

F. INTERNAL LINK INTEGRITY
   - Collect all internal `href` values across built HTML. For each, resolve to
     a file on disk (apply `cleanUrls` and `trailingSlash:false` rules) or match
     a `redirects`/`rewrites` source in `vercel.json`. Any href that resolves to
     nothing is a broken internal link; fail the build and print the offenders.

G. REDIRECT SANITY
   - Parse `vercel.json` redirects. Assert no `source` equals another redirect's
     `destination` (no chains) and no `source` collides with a real file path.

Wire it as: `node seo-build/generate-plans.js && node seo-build/qa-check.js`.
`qa-check.js` lives in the gitignored `seo-build/` like the generator, so it is
never committed, matching repo convention. Block `git push` on a non-zero exit.

---

## 7. Prioritized launch-gate checklist

### P0 — BLOCKERS (must fix before launch)
1. Remove the duplicate hub URL across sitemaps and fix the slash mismatch.
   Delete `compare-ppo-dental-plans` from `sitemap-content.xml` line 15; keep
   the slash-less entry in `sitemap.xml` line 6 only. (Section 2.1)
2. Normalize ALL `<loc>` in `sitemap-content.xml` to slash-less so they match
   `vercel.json` `trailingSlash:false`. Today they 308-redirect. (Section 2.2)
3. Create the missing OG image `og/compare-ppo-dental-plans.png` (1200x630), or
   repoint `og:image` / `twitter:image` to an existing asset. (Section 4.1)
4. Verify the `www.covercapy.com` GSC property and submit
   `sitemap-index.xml` before the first crawl. (Section 5, items 1 to 2)

### P1 — HIGH (fix at launch or first week)
5. Server-render the static JSON-LD graph (Org, WebSite, Service, FAQPage,
   Breadcrumb, DefinedTermSet) instead of JS-only injection; at minimum pass
   Rich Results Test. (Section 4.2)
6. Confirm apex `covercapy.com` 308-redirects to `www` in Vercel domain config.
   (Section 2.5)
7. Confirm `find-my-dentist.html` (and other rewrite targets) carry a canonical
   to their clean URL so the `.html` source is not indexed. (Section 3)
8. Reconcile CLAUDE.md "all trailing slashes" with the live
   `trailingSlash:false` policy; record slash-less as canonical. (Section 2.3)
9. Stand up the build-time `qa-check.js` regression guard. (Section 6)

### P2 — MEDIUM (post-launch hardening)
10. Add `Disallow:` rules to robots.txt for `/api/` and any verify-success
    pages once Phase B exists. (Section 2.4)
11. Switch FAQ roman-numeral markers to arabic to satisfy the copy rule.
    (Section 4.3)
12. Add GA4 conversion events and inherit verification snippet via `pageShell`.
    (Section 5, items 5 to 6)

---

## 8. Bottom line

The hub page itself passes the core on-page gates (title 54, meta 154, single
H1, self-referential canonical). The launch risk is entirely in the operational
layer: a duplicated and slash-mismatched sitemap entry, a whole-file
trailing-slash policy violation in `sitemap-content.xml`, a missing OG image,
and schema that only exists after JS runs. All four are P0 and all four are
small, deterministic fixes. The build-time checker in section 6 is the
mechanism that keeps them fixed.
