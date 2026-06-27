# 08 — Scalability of the Universal Mega Nav

How the nav stays stable while pages grow from 6,400 toward tens of thousands.

## Core principle

The nav scales by curation, not enumeration. As content explodes, the nav must not. It is a fixed-size index to a few high-value hubs. Hubs do the heavy lifting and link down to the long tail. The nav never tries to be a directory.

## Stable nav, exploding content

- The nav links to curated hubs only: state hubs, top metros, carrier landing pages, the guides index. Never raw page lists.
- Adding a city, dentist profile, or guide changes a hub page, not the nav. New content is absorbed below the nav line, not added to it.
- Target a fixed slot count per column. Growth pressure resolves on hubs, never by lengthening the nav.

## Governance: what earns a nav slot

A nav slot is for a stable, top-level entry point with durable demand. Everything else lives on a hub.

- Earns a slot: a hub that aggregates many child pages (a state, a major metro, a carrier).
- Lives on a hub: individual cities, individual dentists, single guides, niche carriers.
- Rule: if it points to one page rather than a category, it is not nav-eligible.

## Location and carrier expansion

- Never list every city. Surface representative entities (largest metros, highest-demand carriers) plus a "View all cities" and "View all carriers" link into the full hub.
- New states and carriers slot into their existing hub group, keeping the nav count flat as the map fills in.

## Performance

The nav ships on every page, so payload discipline is non-negotiable.

- One shared markup and stylesheet, injected identically everywhere. No per-page nav data.
- Keep the link count small and the markup lean. Nav weight is multiplied by total page count, so trim hard.

## Static no-JS link block

The footer link block mirrors the nav: curated hubs only, never the full page list. It scales the same way the nav does, by pointing to hubs that own the long tail.
