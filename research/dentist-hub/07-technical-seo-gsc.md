# 07 — Technical SEO: GSC, robots, sitemaps, canonical, CWV

Audit of CoverCapy (static site, Vercel, `cleanUrls: true`, `trailingSlash: false`). Scope: the GSC placeholder bug, robots.txt, sitemaps, and the planned crawlable national hub `dentist.html` (clean URL `/dentist`).

---

## 1. THE GSC PLACEHOLDER — fix this first

### What's wrong (in plain English)
`find-my-dentist.html` line 16 ships this to production:

```html
<meta name="google-site-verification" content="REPLACE_WITH_YOUR_GSC_TOKEN">
```

**Grep results:** only ONE file contains the placeholder — `find-my-dentist.html`. No other page in the repo has a `google-site-verification` tag at all. So the placeholder is isolated, but it is live and broken.

### What Google Search Console (GSC) verification is
GSC is Google's free dashboard showing how your site performs in Search: which queries you rank for, impressions/clicks, indexing status, crawl errors, Core Web Vitals, and manual-action notices. Before Google gives you that data it must confirm you actually control the property. That confirmation step is "verification."

### What the meta-tag method does
You add a `<meta name="google-site-verification" content="REAL_TOKEN">` tag (the real token is a ~40-char string GSC generates for your account) to the `<head>` of your homepage. Google fetches the page, sees the matching token, and grants access. The tag verifies ONE URL-prefix property (e.g. `https://www.covercapy.com/`).

### Why the placeholder is harmful / useless
- The token `REPLACE_WITH_YOUR_GSC_TOKEN` is not real, so verification can never succeed via this tag.
- It does NOT verify the site — if GSC isn't otherwise verified, the team is flying blind (no index coverage, no CWV, no manual-action alerts).
- It signals an unfinished/copy-pasted build to anyone viewing source; minor trust/quality smell.
- It also sits only on `find-my-dentist.html`, which is the wrong page anyway — the meta tag should be on the homepage / every page, not buried on a sub-page.

### Verification methods (alternatives)
| Method | How | Best for |
|--------|-----|----------|
| **DNS TXT record** (domain property) | Add a TXT record at the registrar/DNS host | **Best.** Verifies the entire domain incl. all subdomains + http/https; survives redesigns; no markup to maintain |
| HTML meta tag | Paste real token in `<head>` | Quick, but per-page markup, only one URL-prefix |
| HTML file upload | Drop `googleXXXX.html` at site root | Works on static hosts; one URL-prefix |
| Google Analytics | Reuse existing GA4 (`G-XNBPGSZ1LZ` is already on the page) | Easy since GA4 is installed; ties verification to GA access |
| Google Tag Manager | Reuse GTM container snippet | If GTM is used |

### RECOMMENDED FIX (do this)
1. **Verify via DNS TXT as a Domain property** in GSC (`covercapy.com`). This is registrar-level, covers `www` + apex + the whole `/dental/` tree in one property, and never needs code changes again.
2. **Delete the placeholder meta tag** from `find-my-dentist.html` line 16 entirely. Do not leave a placeholder in production.
3. If a meta tag is preferred for redundancy, put the **real** token in the shared `<head>` (or generator `pageShell`) so every page carries it — but DNS alone is sufficient and cleaner.
4. The page already loads GA4 (`G-XNBPGSZ1LZ`); the GA verification method is a zero-effort fallback if DNS access is slow.

**One-line recommendation:** Verify `covercapy.com` as a DNS Domain property in GSC, then remove `REPLACE_WITH_YOUR_GSC_TOKEN` from `find-my-dentist.html`. Never ship a placeholder token.

---

## 2. robots.txt review

Current file (`/robots.txt`) is solid:
- `User-agent: *` → `Allow: /`, `Disallow: /docs/`.
- Explicit `Allow: /` blocks for all major AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-User, Google-Extended, Applebot-Extended, Bingbot). Good GEO posture.
- `Sitemap: https://www.covercapy.com/sitemap-index.xml` declared. Correct (points to the index, not a leaf).
- Comment already references `llms.txt`.

**Improvements:**
- Confirm `https://www.covercapy.com/llms.txt` actually exists (the comment promises it). Add a real `llms.txt` if missing.
- Consider `Disallow: /api/` (the `verify-ppo` endpoint) so crawlers don't hit the POST endpoint.
- Optional: add `Disallow: /*?` patterns if `find-my-dentist?q=` query-string URLs proliferate, to keep faceted/parameter URLs out of the index (the canonical handles this, but a hint helps crawl budget).
- The per-bot `Allow: /` blocks are redundant given the `*` rule already allows all, but they are harmless and serve as an explicit, documented welcome — keep them.

---

## 3. Sitemaps

`sitemap-index.xml` references three children: `/sitemap.xml` (core pages), `/sitemap-content.xml` (insurance hub + glossary), `/dental/sitemap-dental.xml` (6,400+ T3–T5). The dental sitemap is well-formed (loc/lastmod/changefreq/priority).

**Action for the new hub:**
- The new crawlable national hub (`dentist.html` → `/dentist`) belongs in **`/sitemap.xml`** (core pages), not the dental generated sitemap.
- Add ONE entry, the **clean canonical URL** `https://www.covercapy.com/dentist` (no `.html`), e.g. `priority 0.9, changefreq weekly`. Never list `/dentist.html`.
- Bump the `<lastmod>` on the `/sitemap.xml` line in `sitemap-index.xml` when you do.
- Do not add `find-my-dentist` and `dentist` as two competing entries unless they are genuinely distinct pages with distinct canonicals (see §4).

---

## 4. Canonical / duplicate-content strategy for the new file

Three candidate paths: `/dentist.html` (raw file), `/dentist` (clean URL), `/find-my-dentist` (existing interactive app, rewritten to `find-my-dentist.html`).

**Risk:** `dentist.html` and `find-my-dentist.html` could become near-duplicate "find a dentist" pages competing for the same queries.

**Recommended plan — pick the intended role for `dentist.html`:**

If `dentist.html` is a NEW, distinct **crawlable national hub** (static, SEO-rich, links to all T3 state hubs — different content/intent from the JS search app), then:
- **Canonical:** `<link rel="canonical" href="https://www.covercapy.com/dentist">` (clean, no `.html`).
- **Clean URL serving:** with `cleanUrls: true` Vercel already serves `dentist.html` at `/dentist` and **auto-301s `/dentist.html` → `/dentist`**. No manual rewrite needed (mirrors how `/find-my-dentist` works — though note that one uses an explicit `rewrites` entry).
- **Self-reference only:** `/dentist` canonicals to itself; `find-my-dentist` canonicals to itself. Keep their `<title>`/H1/content intent differentiated (hub vs. live search) so they don't cannibalize.
- **301s to add in `vercel.json`** for vanity/legacy variants → `/dentist`: e.g. `/dentists`, `/find-a-dentist`, `/dentist-directory`. (`cleanUrls` handles `/dentist.html` automatically, but adding an explicit `"/dentist.html" → "/dentist"` permanent redirect is belt-and-suspenders and matches the existing `/ppodentists.html` pattern in the file.)

If `dentist.html` is meant to REPLACE `find-my-dentist.html`, then 301 `/find-my-dentist` → `/dentist` and canonical everything to `/dentist`. **Recommendation: keep them distinct** (hub + app), canonical each to itself.

---

## 5. Core Web Vitals risk — `find-my-dentist.html` is ~695KB single file

The page bundles all CSS/JS/modals inline and fires Supabase + GA4 + AdSense + map calls. Concrete wins (apply to the new hub too, which should be far lighter / static):

- **Defer Supabase**: don't query on load. The new `/dentist` hub should be a static HTML list of state/metro links — zero Supabase at render. For the search app, lazy-init the Supabase client on first user interaction (ZIP entry / filter), not in the head.
- **Lazy-load maps**: the page references map/staticmap tiles 100+ times. Use `loading="lazy"` on map `<img>` tiles and only instantiate interactive maps (Leaflet) on viewport/intersection, not at page load.
- **Preconnect** to third-party origins in `<head>`: `supabase.co`, `googletagmanager.com`, `pagead2.googlesyndication.com`, `staticmap.openstreetmap.de`, `fonts.gstatic.com`. (Only `fonts.googleapis.com` is currently preconnected.)
- **AdSense/GA are render-blocking-ish JS**: already `async`, good. Consider delaying AdSense until after first interaction to protect LCP/INP.
- **Font**: add `font-display: swap` (the Google Fonts URL already has `&display=swap` — good); consider `preconnect` to `fonts.gstatic.com` (the actual font file host).
- **Split the 695KB**: move shared CSS/JS to external cached files (`/assets/...`) so repeat views and the new hub reuse cache instead of re-downloading inline bytes.
- **Image dimensions**: set explicit width/height on tiles/logos to kill CLS.
- **The new `/dentist` hub**: build it as static HTML with no client-side data fetch — it should pass CWV trivially and become the crawl entry point that distributes link equity to T3/T4/T5.

---

## 6. vercel.json review (relevant to the new page)

- `cleanUrls: true`, `trailingSlash: false` — so `/dentist.html` is automatically served at `/dentist` and 301-redirected from the `.html` form. The new hub gets a clean URL for free.
- `find-my-dentist` is handled by an explicit `rewrites` entry → `find-my-dentist.html` (rewrite = same URL, no redirect). The new hub does **not** need a rewrite; `cleanUrls` covers `dentist.html`. Add a rewrite only if you want `/dentist` served from a differently-named file.
- Existing redirect patterns to mirror: `/ppodentists` and `/ppo-dentists` already 301 → `/find-my-dentist`; `/ppodentists.html` → `/find-my-dentist`. Follow the same style for `/dentist` vanity variants.
- No existing rule conflicts with `/dentist` or `/dentist.html` — safe to add.

**Add to `vercel.json` (when hub ships):**
```jsonc
// redirects:
{ "source": "/dentist.html", "destination": "/dentist", "permanent": true },
{ "source": "/dentists",     "destination": "/dentist", "permanent": true },
{ "source": "/find-a-dentist","destination": "/dentist", "permanent": true }
```
(The first is technically redundant under `cleanUrls` but explicit and matches house style.)

---

## Action checklist
1. **GSC:** verify `covercapy.com` via DNS TXT (Domain property); delete `REPLACE_WITH_YOUR_GSC_TOKEN` from `find-my-dentist.html:16`.
2. Confirm `/llms.txt` exists; add `Disallow: /api/` to robots.txt.
3. Add clean `https://www.covercapy.com/dentist` to `/sitemap.xml`; bump lastmod in `sitemap-index.xml`.
4. Canonical `/dentist` to itself; keep distinct from `/find-my-dentist`; add vanity 301s.
5. Build the hub as static HTML (no Supabase at render); add preconnects + lazy maps to the search app.
