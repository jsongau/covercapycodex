# H1 — Sitelinks & Brand-SERP Architecture

**Agent:** H1 (Sitelinks & brand-SERP architect)
**Goal:** Earn Google **sitelinks** for a `covercapy insurance` brand search — structured sub-links under the main result, like the Abri-Dental example.
**Main hub:** Compare PPO Plans — `https://www.covercapy.com/compare-ppo-dental-plans/` (canonical PPO parent slated for `/dental-insurance/ppo-plans/`).

---

## 0. The non-negotiable truth: sitelinks are EARNED, not declared

Per Google's own documentation, **sitelinks are 100% automated**. There is no markup, no Search Console setting, and no request form that produces them. Google generates them only when **three conditions hold at once**:

1. **A clear, hierarchical site structure** Google can crawl.
2. **The brand generates navigational queries** (people search `covercapy`, `covercapy insurance`).
3. **Internal linking sends unambiguous signals** about which pages matter most — via consistent, descriptive anchor text.

The sitelinks *search box* (the `WebSite` + `SearchAction` markup) was **deprecated by Google on Nov 21, 2024** and no longer renders. We still add `WebSite` + `Organization` schema — it powers the **site name** and knowledge panel and remains supported — but it does **not** earn sitelinks. Sitelinks come from architecture. This document is that architecture.

---

## 1. Top-level hierarchy + the 6–8 main-nav entries Google must learn

Google builds sitelink candidates primarily from the **top, server-rendered navigation** plus the most-linked internal pages. We must expose a stable, shallow (≤3 click) hierarchy with these **canonical hubs** as the consistent main-nav set on **every** page:

```
Home  /
│
├─ 1. Find a Dentist            /find-my-dentist/
├─ 2. Compare PPO Plans         /dental-insurance/ppo-plans/      ← THE MAIN HUB (canonical PPO parent)
│     ├─ per-carrier plan pages /dental-insurance/ppo-plans/{carrier}/
│     └─ Delta Dental (special) /dental-insurance/ppo-plans/delta-dental/   ← only carrier with a sub-menu
├─ 3. Dental Insurance          /dental-insurance/                (top-level category hub)
├─ 4. Glossary                  /dental-insurance-glossary/       ← crawlable site-wide SEO foundation
├─ 5. How It Works              /how-it-works/
└─ 6. About / Concierge         /about/
```

**Rules for the nav set:**
- Keep it to **6–8 entries**. More dilutes the signal; fewer starves it.
- The **same 6–8 links, same order, same anchor text** on every page. Consistency is what teaches Google the hierarchy.
- Settle the `/compare-ppo-dental-plans/` vs `/dental-insurance/ppo-plans/` question: pick **one** canonical URL for the main hub, 301 the other to it, and use only the canonical in nav. (Redesign already canonicalizes to `/dental-insurance/ppo-plans/` — recommend that as the parent and 301 `/compare-ppo-dental-plans/` into it.)
- Sitelinks are most likely awarded to **Find a Dentist, Compare PPO Plans, Glossary, Delta Dental, Dental Insurance** — these are the navigational destinations users want under a `covercapy insurance` result. Make them the strongest-linked, clearest-titled pages.

---

## 2. Consistent descriptive anchor-text + breadcrumb rules (site-wide)

Google chooses sitelink labels from **anchor text** and **page titles/H1**. Inconsistency (the same page linked as "Compare Plans," "PPO Plans," and "Plans") splits the signal.

**Anchor-text rules:**
- One canonical anchor phrase per hub, used everywhere it is linked:
  - Compare PPO Plans → **"Compare PPO Plans"**
  - Find a Dentist → **"Find a Dentist"**
  - Glossary → **"Dental Insurance Glossary"**
  - Delta Dental → **"Delta Dental"**
  - Dental Insurance → **"Dental Insurance"**
- Descriptive and concise. **No** "click here," "learn more," "read this," bare URLs, or icon-only links for the primary hubs.
- Carrier deep links use the carrier name as anchor (e.g. **"Guardian"**, **"Aetna"**), never "view plan."

**Breadcrumb rules (server-rendered `<nav aria-label="Breadcrumb">` + `BreadcrumbList` JSON-LD):**
- Every page below Home shows a breadcrumb. Canonical trail for a carrier page:
  `Home › Dental Insurance › PPO Plans › Delta Dental`
- The Delta Dental page already ships a correct 4-level `BreadcrumbList` (lines 24–28 of `dental-insurance/ppo-plans/delta-dental/index.html`) — **replicate this pattern on all hubs.** The Compare hub currently lacks a breadcrumb to the PPO parent; add one.
- Breadcrumb anchor text must match the nav anchor text exactly (same phrase for the same page).

---

## 3. Schema (server-rendered JSON-LD) — add to every page's `<head>`

All four blocks must be **in the static HTML source**, not injected by JS (see §5). Use one consistent host (`https://www.covercapy.com`, see §5).

**(a) `WebSite` + `SearchAction`** — site-name signal (searchbox itself is deprecated but the block is still valid and feeds the site name):
```json
{"@context":"https://schema.org","@type":"WebSite",
 "name":"CoverCapy","alternateName":"CoverCapy Insurance",
 "url":"https://www.covercapy.com/",
 "potentialAction":{"@type":"SearchAction",
   "target":{"@type":"EntryPoint","urlTemplate":"https://www.covercapy.com/find-my-dentist/?q={search_term_string}"},
   "query-input":"required name=search_term_string"}}
```
> `alternateName:"CoverCapy Insurance"` directly reinforces the `covercapy insurance` brand query.

**(b) `Organization`** — knowledge panel / brand entity:
```json
{"@context":"https://schema.org","@type":"Organization",
 "name":"CoverCapy","url":"https://www.covercapy.com/",
 "logo":"https://www.covercapy.com/assets/logo.png",
 "description":"Independent concierge PPO dental marketplace. Compare individual PPO dental plans and get matched to an in-network dentist.",
 "sameAs":["https://www.linkedin.com/company/covercapy","https://twitter.com/covercapy"]}
```

**(c) `SiteNavigationElement`** — explicitly names the 6–8 hubs to Google (server-rendered, mirroring the visible nav):
```json
{"@context":"https://schema.org","@type":"ItemList","name":"Main navigation",
 "itemListElement":[
  {"@type":"SiteNavigationElement","position":1,"name":"Find a Dentist","url":"https://www.covercapy.com/find-my-dentist/"},
  {"@type":"SiteNavigationElement","position":2,"name":"Compare PPO Plans","url":"https://www.covercapy.com/dental-insurance/ppo-plans/"},
  {"@type":"SiteNavigationElement","position":3,"name":"Dental Insurance","url":"https://www.covercapy.com/dental-insurance/"},
  {"@type":"SiteNavigationElement","position":4,"name":"Dental Insurance Glossary","url":"https://www.covercapy.com/dental-insurance-glossary/"},
  {"@type":"SiteNavigationElement","position":5,"name":"How It Works","url":"https://www.covercapy.com/how-it-works/"},
  {"@type":"SiteNavigationElement","position":6,"name":"About","url":"https://www.covercapy.com/about/"}]}
```

**(d) `BreadcrumbList`** — per-page, matching the visible breadcrumb (Delta Dental pattern, §2).

Combine (a)+(b)+(c) into one `@graph` block in a shared head partial so every page carries them identically.

---

## 4. Title / H1 discipline — each hub unambiguous

Sitelink labels are derived from titles and H1s, so each hub must be the **single, obvious answer** to one navigational intent. One topic, one hub, one title pattern: `{Specific Hub} | CoverCapy`.

| Page | Title | H1 |
|---|---|---|
| PPO hub | `Compare PPO Dental Plans 2026 by Carrier \| CoverCapy` | Compare PPO Dental Plans |
| Delta Dental | `Delta Dental PPO — Plans, Cost & Dentists \| CoverCapy` | Delta Dental PPO |
| Glossary | `Dental Insurance Glossary \| CoverCapy` | Dental Insurance Glossary |
| Find a Dentist | `Find a PPO Dentist Near You \| CoverCapy` | Find a Dentist |
| Dental Insurance | `Dental Insurance — PPO Plans & Coverage \| CoverCapy` | Dental Insurance |

Rules: keep `| CoverCapy` suffix on all (brand-query reinforcement); **no two hubs share an H1**; carrier pages lead with the carrier name; avoid generic "Plans" / "Home" / "Welcome" that Google can't turn into a useful label.

---

## 5. Current blockers (must fix before sitelinks can be earned)

1. **JS-only navigation — the #1 blocker.** On `compare-ppo-dental-plans.html` both the mega-nav and footer are injected client-side: `<div id="cc-nav-mount"></div>` is filled by a `fetch()` loader (lines 2215–2244) pulling `components/mega-nav.html`; the footer is injected the same way. **Crawlers see an empty shell with no internal links.** Google cannot learn the hierarchy from links it never sees. **Fix:** server-render (or build-time inline) the primary nav + footer links into the static HTML. JS enhancement is fine, but the `<a href>` hub links must exist in the raw source.

2. **Placeholder / inconsistent mega-nav.** The injected nav is a separate component with its own link set that does not consistently expose the canonical 6–8 hubs (no glossary entry surfaced, carrier links buried). Until the nav is both server-rendered AND standardized to §1, sitelink candidates stay ambiguous.

3. **www / non-www split.** `compare-ppo-dental-plans.html` canonicalizes to `https://www.covercapy.com/...` (line 8) and the redesign hub to `https://www.covercapy.com/dental-insurance/ppo-plans/`, but `CLAUDE.md` / generator `BASE_URL` use **non-www** `covercapy.com`. Mixed signals split PageRank and confuse the brand entity. **Fix:** choose one host (recommend **www**, matching live canonicals), 301 the other host-wide, and use it in every canonical, schema `url`, nav href, and sitemap.

4. **`.html` extension + path inconsistency.** Footer links to `/compare-ppo-dental-plans.html` while the canonical is the trailing-slash directory form `/compare-ppo-dental-plans/` (or `/dental-insurance/ppo-plans/`). Mixed URL forms for the same page fragment the internal-link signal. **Fix:** link only to the canonical trailing-slash form everywhere; 301 `.html` → directory.

5. **Two competing URLs for the main hub.** `/compare-ppo-dental-plans/` (live) vs `/dental-insurance/ppo-plans/` (redesign canonical). Pick one, 301 the other, and never internally link to the non-canonical.

6. **Orphans / weak internal linking.** Carrier pages (`/dental-insurance/ppo-plans/{carrier}/`) and the glossary must each be linked from the PPO hub with descriptive anchors, and the hub must be linked from Home and the global nav. Any hub reachable only via JS nav is effectively orphaned (see blocker #1). The glossary in particular needs short term-stubs on the hub linking out to full glossary pages, so Google sees it as a maintained, interlinked section.

7. **Design parity.** All server-rendered hubs must match the T5 **jade** system (redesign `data-theme="jade"`) and be **no worse than** `docs/ppo-redesign/_redesign-package/`. Sitelink eligibility is content/structure-driven, but consistent shell/nav across hubs reinforces the "one site, clear hierarchy" signal.

---

## Summary (~150 words)

Sitelinks for `covercapy insurance` cannot be requested or declared — Google **earns** them automatically when a site has (1) a clear crawlable hierarchy, (2) brand navigational search demand, and (3) consistent descriptive internal linking. CoverCapy's biggest barrier is that the primary nav and footer on the Compare PPO hub are **injected by client-side JavaScript**, so crawlers see no internal links and cannot learn the hierarchy. We define a stable 6–8 entry main nav (Find a Dentist, Compare PPO Plans, Dental Insurance, Glossary, How It Works, About), with the Compare PPO hub as the canonical parent and Delta Dental as the one special sub-menu carrier. Each hub gets a unique title/H1, one canonical anchor phrase used everywhere, server-rendered breadcrumbs, and a shared `WebSite`+`Organization`+`SiteNavigationElement`+`BreadcrumbList` JSON-LD graph. Resolve the www/non-www split and the two competing hub URLs (one canonical, 301 the rest). The `SearchAction` searchbox is deprecated but the `WebSite` block still feeds the brand site name.

### Top 3 recommendations
1. **Server-render the nav + footer links** (kill the `fetch()`-injected `cc-nav-mount` / footer) so the canonical 6–8 hub `<a href>`s exist in raw HTML — without this, no other fix matters.
2. **Standardize one host (www) and one main-hub URL** (`/dental-insurance/ppo-plans/`); 301 non-www, `.html`, and `/compare-ppo-dental-plans/` into the canonicals; use those everywhere (nav, canonical, schema, sitemap).
3. **Lock anchor text, titles/H1s, and breadcrumbs** to one canonical phrase per hub site-wide, and ship the shared `WebSite`+`Organization`+`SiteNavigationElement`+`BreadcrumbList` JSON-LD graph in every page head.

### Sources
- [Learn About What Sitelinks Are — Google Search Central](https://developers.google.com/search/docs/appearance/sitelinks)
- [Farewell, Sitelinks Search Box — Google Search Central Blog (Oct 2024)](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)
- [SEO Link Best Practices for Google — Google Search Central](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
