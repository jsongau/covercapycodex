# Elite SEO — 10-architect roadmap (memos in agents/seo10/)

> June 2026. 10 SEO architects, building on the earlier 5 (agents/elite/). Goal: rank the hub in the
> PPO-dental cluster and earn brand sitelinks. "Bare dental insurance" is not a per-page target (owned
> by carriers/Healthcare.gov); win it through cluster authority.

## DONE this pass (page-level, verified)
- **Server-rendered JSON-LD `@graph`** generated from the page's own data (8 plans as price-free `Thing`, 10 FAQs verbatim, 22 glossary `DefinedTerm`, Organization + WebSite/SearchAction + WebPage with datePublished/dateModified/author + honest reviewer + BreadcrumbList). The JS `injectSchema()` is disabled. Crawlers now see structured data in raw HTML. Valid JSON-LD, no Offer/price/InStock.
- **OG/Twitter aligned + completed** — title now matches the page title; added og:locale, og:image width/height/alt.
- **Heading SEO** — differentiated the duplicate "decide your bill" H2s; gave four decorative H2s keyword value (Compare PPO dental plans side by side · PPO dental plans by procedure · by life situation · PPO dental insurance guides · PPO dental insurance terms in plain English).
- **Sitemap dedup** — removed the trailing-slash hub duplicate from sitemap-content.xml (canonical lives slash-less in sitemap.xml, matching vercel trailingSlash:false).

## P0 — remaining (highest leverage)
- **Server-render the global nav + footer** (A1, A8): both are `fetch()`-injected into empty mounts, so the global link graph and the sitelink-candidate labels are invisible to crawlers. Use the existing `components/nav-static.html` (5.9KB) inline, not the 359KB mega-nav. This is the #1 blocker for sitelinks. Site-wide.
- **Pick ONE host** (A8, A10): this hub canonicals to `www`, the 6,400 /dental/ pages use apex. 301 one to the other or the brand entity stays split (no sitelinks). Confirm apex→www in Vercel.
- **Create the OG image** (A10): `og/compare-ppo-dental-plans.png` (1200×630) does not exist → broken social/SERP preview.
- **Pre-render the JS grids** (A3, A4): `#situationGrid`, `#treatGrid`, `#artGrid`, `#featTable` are JS-built so their links/text are invisible to crawlers; the situation/treatment links also point at routes that 404 on disk. Static-render from the constant arrays, and only ship links to pages that exist.

## P1 — internal mesh + content (A3, A5, A9)
- Delta hub + 4 sub-pages link back to the hub (currently zero); plan pages deep-link 2-4 glossary terms each; scenario pages link 2-4 plans each. Remove/repoint the footer `/compare/is-{carrier}-good/` 404s.
- Add the missing content blocks: real methodology (the "How we rate" link points at an empty anchor), a populated source drawer, a "What is a PPO dental plan?" block, PPO vs DHMO vs discount disambiguation, visible last-updated byline.
- Build linkable assets: name + version the comparison dataset, a no-waiting / highest-maximum study, a cost-by-procedure table, harden the glossary as the reference. Cite carrier docs / .gov / ADA / NADP.

## P1 — SERP capture (A4)
- Add a 40-60 word direct-answer block for "how to compare PPO dental plans" and "what is the annual maximum"; give "best PPO dental insurance 2026" a textual home near #compare; promote FAQ questions to real headings for PAA.

## P2 — CWV / a11y (A7)
- Self-host + trim fonts (LCP), reserve heights to kill CLS from injected nav/grids, add width/height to the injected dentist map image, add a `prefers-reduced-motion` block, drop permanent `will-change`, animate the progress bar with transform.

## Launch gate (A10)
P0 blockers: sitemap dedup (DONE) · host decision · OG image · server-rendered nav/footer + schema (schema DONE). Then verify in Search Console, submit sitemap-index.xml, add a build-time qa-check (dup URLs, slash policy, one H1, schema parses, links resolve, OG asset exists).
