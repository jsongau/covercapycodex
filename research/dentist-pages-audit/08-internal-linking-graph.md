# 08 — Internal Linking Graph Audit (CoverCapy /dental/ silo)

**Scope:** Map the crawlable internal link graph across all dentist-directory tiers, identify
authority leaks + orphans, and specify a concrete static-linking plan. Source of truth analyzed:
`seo-build/generate-plans.js` (the generator — all `/dental/` HTML is built here; never hand-edit
output). Line references below are into that file.

---

## 0. Foundational finding: global nav + footer are NOT crawlable

`pageShell()` (line 1159) emits only two empty mount divs for site-wide chrome:

```
<div id="cc-nav-mount"></div>     ← line 1195
<div id="cc-footer-mount"></div>  ← line 1198
```

`COMPONENT_LOADER` (line 750) `fetch()`es `/components/mega-nav.html` and `/components/footer.html`
client-side and injects them (lines 753–777). **Google renders JS, but link-equity flow through
JS-injected nav/footer is unreliable and deferred.** Treat the mega-nav and footer as effectively
**zero static internal links**. Every conclusion below counts only in-`<body>` server-rendered
`<a href>` emitted by the builders.

Implication: the entire site's internal link graph rests on the per-page body links. There is no
crawlable persistent global nav carrying equity to hubs, the homepage, `/dentist`, carriers, or
treatment guides.

---

## 1. Link-graph map per tier

Builders: `buildStateHub` (3028), `buildRegionalHub` (3220), `buildMarketHub` (1206),
`buildCityPage` (1455), `buildDentistPage` (1905). Card helper `dentistCard` (508).

### T3 — State hub (`/dental/{state}/`)
- **UP (static):** breadcrumb → `/` (CoverCapy home). No link to `/dental/` national index (none exists).
- **DOWN (static):** region cards → `/dental/{st}/{region}/` (3082); metro cards → markets; usually
  a city/metro grid. Strong downward static mesh.
- **SIDEWAYS:** none to sibling states (no state index page exists to mesh them).
- **OUT (static):** `/find-my-dentist`, `/compare-ppo-dental-plans`.
- **Crawlability:** static. Healthy hub.

### T3.5 — Regional hub (`/dental/{state}/{region}/`)
- **UP (static):** breadcrumb → home, state.
- **DOWN (static):** metro/market summary cards.
- **SIDEWAYS:** sibling regions only via the state hub (one hop up), not direct.
- **Crawlability:** static.

### T4 — Metro/market hub (`/dental/{state}/{market}/`)
- **UP (static):** breadcrumb → home, state (1307, 1312). **Missing direct up-link to its region (T3.5).**
- **DOWN (static):**
  - City pills → `/dental/{st}/{mk}/{city}` (1271–1272) — note **no trailing slash** here vs. the
    canonical trailing-slash form used everywhere else (redirect hop / equity dilution risk).
  - Top-20 dentist cards via `dentistCard` (1276) → T6 profile URLs (static `<a>`, line 536).
  - City rail (top 10) → city pages (1287–1288, also slash-less).
- **SIDEWAYS:** sibling cities listed (good), sibling metros not linked.
- **OUT:** find-my-dentist, compare-plans; `/find-my-dentist?q={market}` "browse all on map" (1358).
- **Crawlability:** static for cards + city pills. Note the 20-of-N cap means only the top 20
  dentists per metro get a static inbound link from the hub.

### T4c — City page (`/dental/{state}/{market}/{city}/`)
- **UP (static):** breadcrumb → home, state (1613), market (1618). Plus an in-body
  "All {market} PPO dentists" + "{state} dentist directory" pair (1680). Good upward mesh.
- **DOWN (static):** top-20 dentist cards via `dentistCard` (1564) → T6 profiles. **This is the only
  crawlable path to dentist pages.** Cities with >20 offices link only the top 20 statically; the
  rest are reachable only through the JS map ("Browse all on the map", 1673).
- **SIDEWAYS (static):** nearby-cities mesh — `nearbyMesh` pills (1582–1583, trailing slash, good)
  and rail `nearbyCities` (1578–1579). Solid reciprocal city↔city mesh inside a market.
- **OUT:** carrier pills → `/compare-ppo-dental-plans?carrier=…` (when carrier-hub exists, 696),
  compare-plans, verify.
- **Crawlability:** static. **Best-connected tier.**

### T6 — Dentist profile (`/dental/{state}/{market}/{city}/{slug}/`)
- **UP (static):** breadcrumb → home, state, market, city (2210–2213). Good.
- **DOWN:** none (leaf node).
- **SIDEWAYS — JS ONLY (the core problem):**
  - "Nearby offices" rail `#nearby-grid` ships a "Loading nearby offices…" placeholder (2409) and
    is filled by a **client-side Supabase fetch** (load() at 2761; cards built in JS at 2770).
  - The geo-block prose links to the city + market hubs (2773) and to sibling dentists (2774) — **all
    injected by JS**, none in the served HTML.
  - The JS city-nav (2775–2776) links sibling cities — also JS-only.
- **OUT (static):** carrier compare links (`/compare-ppo-dental-plans?carrier=`, 1818), a claim link
  `/for-dentists/claim/…` (2266), `/for-dentists/` (2401). Hero/sticky verify CTAs.
- **Crawlability:** dentist pages have **static UP links (breadcrumb) but ZERO static sideways or
  down links.** Every dentist→dentist and dentist→hub equity link is JS-rendered.

---

## 2. Orphan risk

**Are T6 dentist pages reachable by static links?** Partially.
- A dentist page is statically reachable **only if it is in the top-20 card list of its city page**
  (1564) or top-20 of its metro hub (1276). Ranking is by tier/rating.
- **Dentists ranked #21+ in their city have NO static inbound link anywhere.** Their only inbound
  paths are (a) the JS map on find-my-dentist, (b) the JS nearby-rail on sibling dentist pages, and
  (c) the XML sitemap. Sitemap inclusion gets them indexed but gives them ~no internal PageRank and
  weak topical reinforcement — they are **effectively orphaned for ranking purposes**.
- The dentist page's own nearby-rail does NOT help: it's JS, so it cannot serve as a crawl path to
  rescue long-tail siblings.

**Magnitude:** Any city with >20 listed offices orphans the tail. In dense metros (LA, Houston,
NYC) this is the majority of dentists. Sitemap-only discovery + no internal links = the classic
"indexed, low-value, gets pruned" profile and likely a contributor to the GSC coverage issues.

---

## 3. Does anything link to the new `/dentist` national hub?

**No.** Grep of the generator for `/dentist`, `dentist.html`, `/carriers/`, `/treatments/`,
`treatment-guide` returns **zero matches in any builder.** The new `dentist.html` national hub (the
77-link silo at repo root) is **completely disconnected** from the 6,400-page `/dental/` graph. It
can only be reached via the JS mega-nav (not crawlable) and the sitemap. It currently receives no
internal authority from the directory it is meant to head.

**Where up-links to `/dentist` should be added (all in `generate-plans.js`):**
- State-hub breadcrumb: insert `/dentist` (or `/dental/`) as position-2 between home and state, on
  every tier's breadcrumb (3061–3064, 1307–1312, 1608–1618, 2210–2213). This single change pushes
  equity from all 6,400 pages up into the national hub.
- A static "All US PPO dentists →" link in each state-hub and metro-hub body pointing to `/dentist`.

---

## 4. Reciprocal linking gaps

- **Hub → dentist but dentist → hub is JS-only.** City/metro hubs link down to dentist cards
  statically (536, 1564), but the dentist page links back up to city/market only via the JS
  geo-block (2773) — the static breadcrumb does cover city+market, so this one is partially OK, but
  the richer contextual hub links are JS.
- **Dentist ↔ dentist: fully one-directional and JS.** No static reciprocity between neighboring
  offices at all.
- **Metro ↛ region:** metro breadcrumb skips the T3.5 regional hub (jumps state→market). Region hub
  links down to metros (3082-style) but metros don't link back up to region. Asymmetric.
- **City pill slash inconsistency:** metro hub city pills omit the trailing slash (1272, 1288) while
  canonicals use it — a redirect hop that leaks a little equity on every metro→city link.
- **No silo cross-links:** carrier silo, treatment guides, and `/dentist` hub have no reciprocal
  links with `/dental/` pages.

---

## 5. Connecting the `dentist.html` silo + planned carrier silo + treatment guides

Current state: three disjoint clusters — (A) the `/dental/` geo-silo (6,400 pp, internally meshed),
(B) `dentist.html` national hub (77 links, island), (C) planned carrier silo + treatment guides
(not built / not linked). They only "connect" through the JS mega-nav, i.e. not at all for crawlers.

**Target topology (hub-and-spoke, all static, all in the generator):**

```
            /dentist  (national hub, T2)
           /    |    \
   carriers/  /dental/{state}…   treatments/
  (carrier silo)  (geo silo)     (procedure guides)
        \         |  |  |          /
         \    state→region→metro→city→DENTIST
          \________ cross-links ________/
```

- **/dental/ → /dentist:** add `/dentist` to every breadcrumb (see §3).
- **/dental/ → carriers:** city pages already have carrier pills that point at a `hub` var when it
  exists (696); the metro + dentist pages currently point carrier names to
  `/compare-ppo-dental-plans?carrier=` (1818). Repoint these to real `/carriers/{carrier}/` silo
  pages once built, and add a static "PPO carriers accepted here" block linking each carrier hub from
  every city and dentist page. This builds carrier-silo authority from 6,400 geo pages.
- **/dental/ → treatments:** the dentist page renders procedure pills as plain `<span>` (no links,
  ~1834). Convert the top procedures into `<a href="/treatments/{procedure}/">` links on every
  dentist and city page. Reciprocate: each treatment guide links down to top city/dentist pages.
- **carriers ↔ treatments ↔ /dentist:** the national hub should statically link to every carrier hub
  and every treatment guide (it already has the 77-link capacity), and each carrier/treatment page
  should breadcrumb back up to `/dentist`.

---

## 6. "Nearby offices" rails — static or JS?

**JS.** Confirmed: dentist-page nearby rail is a `#nearby-grid` placeholder (2409) filled by a
runtime Supabase `fetch` (2761–2782). The richer geo-block and JS city-nav (2772–2777) are likewise
client-rendered. **None of the dentist-page sideways links exist in the served HTML.** City-page
nearby-cities mesh, by contrast, **is static** (1578–1583) — that one is fine.

---

## Biggest authority leaks / orphan risks (ranked)

1. **`/dentist` national hub is fully orphaned from the 6,400-page silo** — no static inbound links.
   The single highest-leverage fix.
2. **Tail dentists (rank #21+ per city) are static-orphans** — only the top 20 get a crawlable inbound
   link; the rest rely on the sitemap + JS. Likely large share of all profiles in dense metros.
3. **Dentist-page nearby/sibling/hub links are 100% JS** — the entire horizontal mesh between
   dentist profiles is invisible to crawlers; no crawl path rescues tail pages.
4. **Global nav + footer are JS-injected** — no persistent crawlable site nav; all equity routing
   depends on body links only.
5. **Carrier silo + treatment guides have zero static links** to/from the geo silo; procedure pills
   are non-links (`<span>`).
6. **Slash-less metro→city pills** (1272, 1288) cause redirect hops on the densest internal links.
7. **Metro↛region asymmetry** breaks reciprocal flow in the upper funnel.

---

## Concrete linking plan (implement in `seo-build/generate-plans.js`)

| # | Change | Builder / line | Effect |
|---|--------|----------------|--------|
| 1 | Add `/dentist` as breadcrumb position-2 on all tiers | pageShell consumers / 3061, 1307, 1608, 2210 | Routes equity from all 6,400 pp into national hub; de-orphans it |
| 2 | Replace JS `#nearby-grid` with a **server-rendered** top-6 nearby-dentist static `<a>` block, built from `cityDentists` + adjacent-city dentists passed into `buildDentistPage` (already receives `cityDentists`, 1905) | buildDentistPage / 2404–2410 | Creates crawlable dentist↔dentist mesh; gives tail pages inbound links |
| 3 | On city pages, render **all** offices as static links (cards for top 20, a plain static `<a>` name list for #21+) instead of deferring the tail to the JS map | buildCityPage / 1564, 1673 | Eliminates the >20-offices orphan cliff |
| 4 | Add trailing slash to metro city pills + rail | 1272, 1288 | Removes redirect hops |
| 5 | Add static "Region: {region} →" up-link to metro breadcrumb/body | buildMarketHub / ~1312 | Fixes metro↛region asymmetry |
| 6 | Convert procedure pills to `<a href="/treatments/{slug}/">` on dentist + city pages | ~1834, city | Connects treatment silo, adds topical links |
| 7 | Point carrier pills/badges to real `/carriers/{slug}/` hubs and add a static "carriers accepted" block on dentist pages | 696, 1818 | Builds carrier silo from geo pages |
| 8 | Add a static "Explore all US PPO dentists →" `/dentist` link in every state + metro hub body | buildStateHub, buildMarketHub | Reinforces #1 with contextual (non-breadcrumb) links |
| 9 | Make `/dentist` hub statically link down to every state hub, every carrier hub, every treatment guide; reciprocate breadcrumbs up | dentist.html + silo builders | Completes hub-and-spoke |

**Net:** changes 1–3 alone convert the dentist tier from "static UP only, JS sideways, tail
orphaned" into a fully crawlable mesh and connect the national hub — addressing the top three leaks.
