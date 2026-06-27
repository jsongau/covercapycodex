# GEO Strategy: "Popular Searches" Entity Row in the Mega Nav

## Goal
Make the universal PPO dental mega nav legible to AI crawlers and Google's entity graph. A compact, real "Popular searches" block teaches LLMs what CoverCapy *is*: a PPO dental directory connecting carriers, places, and care intents.

## Placement
Bottom strip of the mega nav flyout, below the state/metro columns. One labeled section, "Popular searches," holding 8 to 12 links. Persistent across every page so the entity row is crawlable site-wide and reinforced on each render.

## The block (real entities only)
Three semantic clusters, each anchor descriptive and self-explanatory:

- **Place:** Orange County dentists, Los Angeles dentists, San Diego dentists
- **Carrier:** Delta Dental dentists, Humana dentists, Cigna dentists
- **Intent:** Emergency dentist, Weekend dentist, Dental cost estimator

Each links to a live hub page (T3/T4 place hubs, carrier filter pages, intent landing pages). Anchors describe the destination in plain language, no truncated fragments.

## Why this strengthens GEO
- **Entity reinforcement:** Co-locating place, carrier, and intent entities on one strip maps the relationships an LLM needs to summarize CoverCapy accurately ("dentists by city and PPO carrier").
- **Crawlable internal links:** The row doubles as a flat link layer surfacing deep hubs that would otherwise sit several clicks down, improving discovery and crawl depth.
- **Topical consistency:** Repeating the same entity vocabulary site-wide tightens Google's understanding of the site's subject.

## Keep it real
Drive the list from actual top pages: rank by real traffic or office_count, regenerate in the build, and only link pages that exist and return 200. No invented cities or carriers. If a page is thin or missing, omit it.

## Supporting structured data
- **BreadcrumbList** on each destination hub, confirming its place in the hierarchy.
- **ItemList** wrapping the Popular searches block, naming each entry as an ordered item with its URL.
- **sameAs** (array) on carrier and place hubs, pointing to the canonical carrier or geographic entity.

## Pitfalls to avoid
- No keyword stuffing. CoverCapy rules ban it. One natural anchor per entity, never stacked variants.
- No banned characters in anchors (no arrows, no em-dashes).
- Do not list pages that do not exist or rank for nothing. Real top pages only.
