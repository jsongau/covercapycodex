# Crawl-waste fix: findings + remaining generator change (part B)

From the Google Search Console crawl-stats export (2026-06-23): of crawled URLs, only ~37%
returned 200, ~36% were 301 redirects, ~27% were 404. Below is what was verified against the
live files and the Supabase data, what was fixed in this pass, and the one change that still
must be made in the generator (`seo-build/generate-plans.js`, Mac-only) and redeployed.

## Verified findings (some earlier assumptions were wrong)

- Geo data is CORRECT in Supabase. Houston dentists are state=Texas / market=Houston;
  Irvine and Tustin are Orange County. The wrong-geo 404s Google showed
  (`/dental/california/orange-county/houston/...`, `/dental/.../los-angeles/irvine/...`) are
  STALE URLs from an older build. They will 404 and age out of the index on their own; the
  fresh sitemap helps Google find the correct URLs. No DB fix needed.
- Current `/dental/` pages no longer link to the old `/dentists/` prefix (0 references), so
  that source of 404s is already gone from new output.
- The city-equals-metro hub 404s (e.g. `/dental/illinois/chicago/chicago`) are also stale;
  the current dental sitemap contains none of them.

## IMPORTANT correction about `/dentists/`

The 22 pages under `/dentists/` are NOT duplicates of the `/dental/` template. They are
bespoke, hand-built profile pages (KYT Dental Services, Abri Dental Beverly Hills and Burbank,
Liu Dental, and other Orange County / Inland Empire offices) and several are already ranking
(KYT had 5 clicks / 27 impressions on its `/dentists/` URL). They must be KEPT as-is. An
earlier pass in this session wrongly deleted and redirected them; that was reverted: the tree
was restored from git, the `/dentists/ -> /find-my-dentist` and `/dentists/ -> /dental/`
redirects were removed from `vercel.json`, and the KYT `sitemap.xml` entry was put back to its
`/dentists/` URL.

The only real `/dentists/` 404s in the crawl report were `/dentists/texas/...` and
`/dentists/florida/...`, which never existed as files (stale links to non-existent pages).
Those simply 404 and will age out; do NOT add a blanket `/dentists/` redirect, because it
would redirect the real, ranking custom pages away.

Possible later refinement (optional, not urgent): if a `/dental/` template page exists for the
same office as a `/dentists/` custom page, add `rel=canonical` on the template page pointing to
the custom `/dentists/` URL to avoid any duplicate-content ambiguity. Confirm case by case.

## Fixed in this pass (committed, no generator needed)

- All the hand-built dead-link families (`/dental-cost/*`, `/dental-financing/*`,
  `/ppo-dental-plans/*`, `/best-dental-insurance-for-*`, `/learn/*`, `/cost-calculator/*`,
  `/estimatecost`, `/ppodentists`) now 301 to real pages via `vercel.json`, and the live
  internal links (including the shared mega-nav and footer) were repointed directly.
- `/docs/` is now disallowed in `robots.txt` so Google stops crawling the internal archive.

## The one remaining generator change (do on the Mac)

- 5,867 generated dentist pages link to `/for-dentists/claim/{slug}`, which 404s. This is the
  single largest live 404 source. A stopgap redirect (`/for-dentists/claim/* -> /dentist-portal`)
  is already in `vercel.json`, so these are now 301s instead of 404s, but every crawl still
  pays a redirect hop.
- Fix in `seo-build/generate-plans.js`: change the "claim this profile" link the generator
  emits from `/for-dentists/claim/{slug}` to a real page. Use `/dentist-portal` (or build the
  claim route if you want a real per-dentist claim flow). Then rebuild and redeploy:

```bash
cd "/path/to/CoverCapy repo"      # repo ROOT, never seo-build/
node seo-build/generate-plans.js  # full rebuild (regenerates dental/ + sitemap-dental.xml)
git add -A
git commit -m "fix: point dentist claim link to /dentist-portal (kills 5,867 redirect hops)"
git push
```

- Also confirm the generator never emits URLs from `d.seo_path` (it still carries the old
  `/dentists/` prefix). Build dentist URLs only from parts
  (`stSlug + mkSlug + citySlug + d.slug`), per CLAUDE.md. Current output already looks clean,
  but the stale `/dentists/` URLs Google cached suggest a past violation; keep the rule.

## Net effect

Part A + this pass converts almost all of the wasted-crawl 404s into either correct pages or
301s, and removes the duplicate `/dentists/` tree. The only remaining hop is the dentist
claim link, which the generator change above eliminates at the source.
