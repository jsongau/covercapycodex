# 360 Missing City Hub Pages (404s): What Happened and the Safe Fix

Date: 2026-06-26

## What happened (plain English)

About 360 city hub pages at `/dental/{state}/{metro}/{city}/` return a 404 ("This page wandered off") on the live site. The dentist profile pages INSIDE those city folders still exist and work. No data was lost, and nothing in the current working session caused this (none of this session's changes were committed or pushed).

Root verdict: these 360 city hub pages were NEVER GENERATED. They are not in git history at all, so they were not deleted by the earlier dedupe commits. The dedupe commits (1aeb3a2b8, cc85a11a2, b29fddc2b) were a red herring: that delete-and-restore cycle only touched dentist profile pages and never included these city hubs.

## The exact cause (in the generator)

In `seo-build/generate-plans.js`, the dentist-profile loop and the city-hub loop disagree about which cities exist. The profile loop writes a page for every dentist with no filter. The city-hub loop writes the parent city `index.html` only for a filtered subset, and two filters drop exactly 360 cities:

1. Principal cities (71): line ~3423 has `if (cSlug === mkSlug) continue;` which skips writing the city hub whenever the city slug equals the metro slug (for example san-diego/san-diego, chicago/chicago, seattle/seattle). The profile loop has no such skip, so the profiles exist under a city hub that was never written.

2. Ordinary cities (289): `groupByCities` only keeps cities with at least 4 offices (MIN_OFFICES) and keys by raw city name while the profile loop keys by slugified name. Small cities and spelling variants fall through and get profiles but no hub.

## Blast radius

- Sitemaps: clean. None of the 360 missing URLs are in any sitemap, so Google is not being fed these 404s directly.
- Internal links: about 5,144 dead links point at the missing city hubs. 5,001 come from 2,494 dentist profiles (each has a broken breadcrumb in both the visible HTML and the JSON-LD), and 143 come from 72 metro hubs whose "browse by city" pills link to the missing child city.
- 2,494 dentist profiles sit under a missing city hub, so each has a broken breadcrumb chain.
- Worst offenders by profiles affected: chicago/chicago (347), san-diego/san-diego (278), las-vegas (106), los-angeles (106), sacramento (44), seattle (42). Fixing roughly 6 principal-city hubs alone restores over 1,000 orphaned profiles and most of the dead links.

## The fix (safe, additive, no deletions)

Git restore is not possible (the pages never existed in history), so the fix is to make the generator emit them and rebuild. The patch is two minimal, additive edits in `generate-plans.js` (full diff in `02-generator-root-cause-and-patch.md`):

1. City-hub loop: group cities by slug with no office floor and no principal-city skip, so every city that has a dentist profile gets a hub page. This eliminates all 360 404s and fixes the 5,144 broken links and 2,494 broken breadcrumbs.

2. Principal-city hubs (city == metro): emit them, but set their canonical to the metro hub and mark them `noindex,follow`, and keep them out of the sitemap. They exist so dentist breadcrumbs resolve (no 404), without competing with the indexable metro hub. This avoids recreating the doubled-slug duplicate-content issue the earlier audit flagged. Ordinary small cities are emitted self-canonical and added to the sitemap.

This change only ADDS pages. It does not delete, rename, or move anything.

## How to apply (must run on the Mac, not the sandbox)

The generator reads Supabase, which only the user's Mac can reach. Steps:

1. Apply the patch to `seo-build/generate-plans.js` (a .bak backup is taken first).
2. On the Mac, from the repo root: `node seo-build/generate-plans.js --hubs` (or a full build). Never `cd seo-build` first.
3. Verify locally that the missing city index.html files now exist (the report includes a one-line check), then `git add -A`, commit, push. Vercel redeploys.

Revert path: the only changes are new `index.html` files plus one edited generator file. To undo, restore the generator from its .bak and `git checkout`/remove the newly generated hubs before pushing.

## Reports
- 01-inventory-and-git-history.md (full 360 list, never-generated verdict)
- 02-generator-root-cause-and-patch.md (exact code diff)
- 03-link-and-sitemap-impact.md (blast radius)
