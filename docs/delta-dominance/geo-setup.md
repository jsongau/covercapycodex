# Delta Dominance — GEO retrieval setup (IndexNow + Bing)

Why this matters: ChatGPT search and Copilot lean on Bing's index. Getting CoverCapy strong in
Bing, and getting new pages in fast, is how AI engines find us. This doc covers what is already
wired and the one-time manual steps only Jay can do.

## 1. IndexNow (already wired, ships on next deploy)

What was added to the repo:
- A public key file at the site root: `/253f8df6855ac49519ccd58490f9983c.txt` (contains the key).
  IndexNow keys are public by design.
- A fail-safe ping in `delta-generate-plans.js` (function `pingIndexNow`). On every Vercel deploy,
  right after the sitemap is written, it POSTs the 13 core Delta URLs to
  `https://api.indexnow.org/indexnow`. It has an 8-second timeout and is wrapped in try/catch, so
  it can never block or fail the build.

How IndexNow validates: after the ping, IndexNow fetches
`https://www.covercapy.com/253f8df6855ac49519ccd58490f9983c.txt` and checks it contains the key.
So the key file must be live. It ships in the same commit as the ping, so the first deploy that
includes this change will both publish the key file and start pinging.

Verify after the first deploy:
1. Open `https://www.covercapy.com/253f8df6855ac49519ccd58490f9983c.txt` in a browser. It should
   show the key string and nothing else.
2. In the Vercel build log for that deploy, look for a line like
   `[indexnow] submitted 13 Delta URLs, status 200` (200 or 202 means accepted).
3. Bing Webmaster Tools (below) has an IndexNow section that shows submitted URLs within a day.

To submit more URLs later: add them to the `DELTA_CORE_URLS` array in `delta-generate-plans.js`.
Keep the list curated (the important pages), not thousands of URLs.

Note: this depends on the Vercel Build Command running `delta-generate-plans.js`. If you have not
yet renamed the Build Command from `node generate-plans.js` to `node delta-generate-plans.js`, the
compatibility shim still forwards it, so IndexNow works either way until you update the setting.

## 2. Bing Webmaster Tools (one-time, ~5 minutes, Jay only)

This imports your existing Google verification and sitemaps into Bing in a few clicks.

1. Go to https://www.bing.com/webmasters and sign in with a Microsoft account.
2. On the landing page choose "Import from Google Search Console" (not "Add site manually"). This
   is the fast path: it reuses your GSC verification, so you do not add a DNS record or upload a
   file.
3. Authorize Bing to read GSC, then pick the `covercapy.com` property and click Import. Bing pulls
   the verified site and its sitemaps.
4. In the left menu open "Sitemaps." Confirm `https://www.covercapy.com/sitemap-index.xml` is
   listed. If it is not, click "Submit sitemap," paste that URL, and submit.
5. In the left menu open "IndexNow." Confirm it shows the key
   `253f8df6855ac49519ccd58490f9983c` as active after the first deploy. Nothing to do here if it
   appears; it confirms the automatic pings are being received.
6. Optional: "URL Inspection" then "Submit URL" for the two newest pages
   (`/dental-insurance/delta-dental/deltacare-hmo-vs-ppo/` and any new ones) to nudge a first
   crawl the same day.

## 3. What is already correct (no action needed)

- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
  Perplexity-User, ClaudeBot, Claude-User, Google-Extended, Applebot-Extended, Bingbot and CCBot,
  and blocks `/docs/` so this strategy folder never enters the index.
- `llms.txt` now carries a dedicated Delta cluster section, one question-phrased line per page.
- `llms-full.txt` carries the quotable Delta facts inline for engines that read it.
- All Delta cluster facts, tables and FAQs are raw server-rendered HTML, so RAG systems can lift
  them without running JavaScript.

## 4. Measurement
- Weekly: GSC and Bing Webmaster queries for the Delta cluster (position and CTR).
- Monthly: run `citation-battery.md` across the four engines and log the citation rate.
- Quarterly: re-verify the cluster facts and bump reviewed dates only where content actually
  changed.
