# Main Hub Plan — Compare PPO Plans (the sitelinks authority)

> Synthesis of the 10 main-hub agents (`agents/hub/`). June 2026.
> The Compare PPO Plans page is THE hub. It must earn Google sitelinks for "covercapy insurance," branch
> to per-carrier analysis pages + the Delta sub-hub + the glossary, in **T5 jade**, never worse than the ZIP.

## Hard truth about sitelinks (H1, H10)
Sitelinks are **fully algorithmic** — no schema or toggle forces them. Google grants them when (1) the brand ranks #1 for "covercapy insurance," and (2) the site has a clean crawlable hierarchy with **one consistent, text-based global nav** + strong internal links + unique titles. So this is an architecture job, not a markup trick.

## 🔴 The blockers that currently make sitelinks impossible

| Sev | Blocker | Detail | Agents |
|---|---|---|---|
| 🔴🔴 | **Nav + footer are JS-injected** | `#cc-nav-mount` is filled by `fetch(components/mega-nav.html)` — crawlers see an empty shell with **zero internal links**, so Google can't learn the hierarchy. Nothing else matters until this is fixed. | H1, H10, H8 |
| 🔴 | **Canonical war** | Three URLs claim the hub: `/dental-insurance/ppo-plans/`, `/compare-ppo-dental-plans/`, legacy `.html` — plus www vs non-www split and a stale `dd.html`. 301 all into ONE canonical. | H1, H2 |
| 🔴 | **The hub orphans its biggest assets** | The live `ppo-plans/index.html` links only 6 carriers + the cost estimator — it does **NOT link Delta, the Delta hub, the Premium gateway, or the glossary.** | H2, H6 |
| 🔴 | **Broken Delta leaves** | 10 UC `students/{campus}/` + `uc-dental-access` are linked but not on disk. | H2 |
| 🟠 | **Schema is JS-injected + has `Offer.price`/`InStock`** on illustrative premiums (policy risk) | server-render it; strip pricing. | H7 |
| 🟠 | **glossary.json ≠ on-disk terms** | `ada-fee`/`rating`/`vision` are live pages with no JSON entry (orphan tooltips); `predetermination` is in JSON but the page 404s. | H3 |
| 🟠 | **Ameritas Y2 max drift** | live plan JSON says $3,500; reconciliation says needs-doc ($2,500–3,000) — the one place frozen data contradicts the source of truth. | H4 |

## Sitelinks recipe (do these)
1. **Server-render** the global nav + footer with raw `<a href>` links — identical on every page. (H1, H10)
2. **One canonical** host (`www`) + one hub URL; 301 the rest. (H1)
3. **The 6–8 sitelink-candidate hubs**, in the global nav, most-linked-to: **Compare PPO Plans · Find a Dentist · Plans by Carrier · Delta Dental · PPO Glossary · How We Rate** (+ Browse by State, Get Covered). (H10)
4. Unique compact titles/H1 + breadcrumbs + a shared server-rendered schema `@graph` on every page. (H1, H7)
5. Wire Delta + the glossary into the hub; prune/`noindex` stubs + fix the broken Delta leaves. (H2)

## Main-hub anatomy (H8 — merge ZIP answer-first + live action engine; source-tagged so nothing is lost)
1. Trust/freshness strip
2. **Lead Answer Block [ADD]** — one-sentence direct answer + key-fact strip (wins AI Overviews + snippet)
3. **Smart Match lens [LIVE]** — emergency-aware; keep
4. **Server-rendered 8-plan comparison `<table>` + pin tray [ZIP+LIVE]** — facts in HTML, JS only sorts/filters/pins
5. Plan cards [ZIP]
6. By coverage feature [LIVE]
7. **By treatment** + the per-procedure rankings + coverage-starts-vs-eligible distinction [LIVE+ADD]
8. By timing / life-situation [LIVE]
9. **Carrier branch grid [ADD]** — all 7 plan pages + Delta featured (Premium = primary CTA) → branches to the analysis pages
10. **Short-glossary module [ADD]** — ~10 priority terms (def + why + "Full definition →" to the term page)
11. Buyer's playbook [LIVE] + 4-pillar methodology/independence [ZIP]
12. Find-a-dentist handoff [LIVE]
13. PAA `FAQPage` [ZIP+LIVE]

**Preserve (don't regress):** Smart Match, `valueFrame()` cash-vs-premium, one-match+honest-backup, **3-layer glossary tooltips (`why` restored)**, named reviewer. **Premiums** stay frozen to the current page but display as illustrative — "from $X/mo · est." with the qualifier (reconciles the freeze with YMYL safety).

## Branch architecture
- **Carriers:** main hub → 7 standard plan pages (bespoke per-procedure analyses, `13-CARRIER-PLAN-TEMPLATE.md`) + the special **Delta hub** (`06-DELTA-HUB-PLAN.md`, Premium featured primary).
- **Glossary:** main hub short-module → full `/dental-insurance-glossary/` term pages (the site-wide crawlable SEO foundation, H3); every plan/treatment page tooltips into terms via `data-term`.
- **Per-procedure model (H4):** one canonical `procScore` renders the rankings on both plan pages and the hub's by-treatment browse — no drift.

## Schema (H7, server-rendered `@graph`, hub)
`WebSite`+`SearchAction` (hub only) · one `Organization` `@id`+`sameAs` (reused everywhere) · `BreadcrumbList` · `ItemList` of price-free `Service` plans · `FAQPage` · link to `DefinedTermSet`. **No `Offer.price`/`InStock`.** Visible-content parity.

## Internal-link mesh (H6)
Per-type inbound/outbound matrix; **count floors: plan page ≥17, hub ≥33, live-compare ≥51** (meet-or-beat predecessors). One reusable `@id` per entity. Ship a build-time `link-graph-check` (orphans, reciprocity, count regressions, dead links, dup titles, ID drift) as a CI blocker before sitemap submission.

## Design (H5, T5 jade)
CTA `--teal-night #082A30` ≠ links `--teal-700 #14525B` ≠ body `#33453E` (three distinct — the rule the old scheme broke). Comfort→terminal→comfort rhythm; the teal-night comparison matrix is the dense centerpiece. Kill every ZIP clinical token (`#F6F8FA`, bright `#0E8C8B` teal, blue chips).

## Build order
1. Server-render nav/footer + resolve the canonical war (unblocks sitelinks).
2. Wire Delta + glossary into the hub; fix/noindex broken Delta leaves; make glossary.json 1:1 with on-disk.
3. Server-render the schema graph; strip `Offer.price`.
4. Rebuild the hub on `assets/ppo/` in T5 jade with the anatomy above (server-rendered facts).
5. Humana plan page (pilot) → remaining carriers → Delta hub track.
6. Stand up `link-graph-check` CI; then submit the sitemap.
