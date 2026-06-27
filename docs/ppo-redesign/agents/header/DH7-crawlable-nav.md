# DH7 — Crawlable Header + Dropdown Nav (sitelink-ready)

**Agent:** DH7 (Design — Header & Dropdown crawlability)
**Goal:** Make the new global header and its dropdown sub-menus fully **crawlable**, so they reinforce Google sitelink candidates for the `covercapy insurance` brand search. Pairs with H1 (sitelinks architecture) and H10 (benchmark).
**One-line mandate:** *Every header and dropdown link is a server-rendered static `<a href>` in the initial HTML. JavaScript only toggles open/close — it never creates, fetches, or injects links.*

---

## 0. The problem we are fixing (current state)

On `compare-ppo-dental-plans.html` the entire global nav is **JS-injected**:

```html
<div id="cc-nav-mount"></div>     <!-- empty shell -->
```
…filled at runtime by a `fetch()` loader (lines 2215–2267) that pulls `components/mega-nav.html` into the mount and replays its scripts. The footer (`#cc-footer-mount`) works the same way.

**Consequence:** a crawler (and a JS-light render) sees an **empty div with zero internal links**. Google cannot learn the hierarchy from links it never receives in the HTML. This is H1 blocker #1 and the single thing that makes every other sitelink fix moot.

**DH7 rule:** the dropdown redesign must NOT repeat this mistake. A dropdown menu that lazy-fetches its carrier list or glossary terms on hover is exactly the same failure at a smaller scale — the sub-links would be invisible to crawlers.

---

## 1. Crawlability contract (non-negotiable)

1. **Links live in source, not in JS.** Every primary hub link and every dropdown child link is a literal `<a href="…">` present in the raw HTML response (View Source / `curl`), before any script runs.
2. **No `fetch()` for nav content.** Kill the `cc-nav-mount` loader for the nav. The header markup is server-rendered or build-time **inlined** into each page (shared head/header partial baked at generate time — the same model the T5 generator already uses for baked modal data).
3. **JS enhances, never supplies.** Script is allowed to: toggle `aria-expanded`, add/remove an `.open` class, trap focus, handle hover/keyboard. Script is NOT allowed to: create `<a>` elements, populate menu contents, or request HTML/JSON for menu items.
4. **Dropdowns may be visually hidden, never DOM-absent.** Collapsed menus are hidden with CSS (`display:none` / `visibility` / `max-height` / `hidden` attribute) but their `<a href>` children **remain in the DOM and in the source**. CSS `display:none` does not hide a link from Googlebot — it still parses and follows it. Lazy-rendering it on hover does hide it. Use the former, never the latter.
5. **Same nav, every page.** The identical header partial (same 6–8 links, same order, same anchor text) ships on the homepage, every hub, T4, and T5. Consistency is what teaches Google the hierarchy (H1 §1, H10 P1).
6. **Real `href`s, not `#` + JS.** Top-level items that also open a dropdown still carry a real destination `href` to the hub landing page (e.g. "Plans by Carrier" → `/dental-insurance/ppo-plans/`). The caret only toggles the panel; the label is a navigable link. No `href="#"`, no `<button>`-only top items, no `javascript:void(0)`.

> Litmus test: disable JavaScript, reload, run `curl <page> | grep -o 'href="[^"]*"'`. Every hub and every dropdown child must appear. If any link only shows up with JS on, it fails DH7.

---

## 2. The canonical sitelink-candidate hub set the nav must expose

The header exposes a stable **6–8 entry** set (more dilutes the signal, fewer starves it — H1 §1). This is the pool Google chooses ~4–6 sitelinks from. Anchor text is fixed and identical site-wide.

| # | Hub (anchor text — exact) | `href` (canonical) | Dropdown? |
|---|---|---|---|
| 1 | **Compare PPO Plans** | `/dental-insurance/ppo-plans/` | yes — Plans-by-carrier panel |
| 2 | **Find a Dentist** | `/find-my-dentist/` | no (utility/tool page) |
| 3 | **Plans by Carrier** | `/dental-insurance/ppo-plans/` (carrier index) | yes — carrier list |
| 4 | **Delta Dental** | `/dental-insurance/ppo-plans/delta-dental/` | yes — the one special carrier sub-menu |
| 5 | **PPO Glossary** | `/dental-insurance-glossary/` | yes — top glossary terms |
| 6 | **How We Rate** | `/how-we-rate/` | no (trust/about analog) |
| 7 | **Dental Insurance** (top category) | `/dental-insurance/` | optional — treatment + timing links |
| 8 | *(optional)* **Browse by State** | `/dental-insurance/by-state/` | yes — geo entry into the 6,400 leaf pages |

**Treatment / timing branch** (folded under "Dental Insurance" dropdown, or surfaced as the body `di-hub` rail that already exists at lines 1085–1108). These are the intent landing pages already linked on the Compare page — keep them as static `<a>`s:

- No waiting period → `/dental-insurance-no-waiting-period/`
- Immediate / coverage now → `/dental-insurance-immediate-coverage/`
- Between jobs → `/dental-insurance-between-jobs/`
- Self-employed → `/dental-insurance-for-self-employed/`

> **Carrier note:** "Compare PPO Plans" and "Plans by Carrier" both point at the PPO parent. If you want them distinct, give "Plans by Carrier" its own indexable carrier-index URL (`/dental-insurance/ppo-plans/carriers/`) and 301-keep one canonical. Do not internally link two anchors to one URL with two different phrases for long — it splits the sitelink label signal (H1 §2). Prefer collapsing to one "Compare PPO Plans" item whose dropdown IS the carrier list if you want only 6–7 entries.

---

## 3. Dropdown contents stay in the DOM (carrier list + glossary terms)

The two content-rich dropdowns are the highest lazy-fetch risk. Both must be **fully present server-side**.

### 3a. Carrier dropdown (under "Compare PPO Plans" / "Plans by Carrier")
Render every carrier as a static `<a>` with the **carrier name as the anchor** (never "view plan"):

```html
<ul class="cc-drop" hidden>            <!-- hidden attr = collapsed, still in source -->
  <li><a href="/dental-insurance/ppo-plans/delta-dental/">Delta Dental</a></li>
  <li><a href="/dental-insurance/ppo-plans/guardian/">Guardian</a></li>
  <li><a href="/dental-insurance/ppo-plans/aetna/">Aetna</a></li>
  <li><a href="/dental-insurance/ppo-plans/cigna/">Cigna</a></li>
  <li><a href="/dental-insurance/ppo-plans/uhc/">UnitedHealthcare</a></li>
  <li><a href="/dental-insurance/ppo-plans/humana/">Humana</a></li>
  <li><a href="/dental-insurance/ppo-plans/ameritas/">Ameritas</a></li>
  <li><a href="/dental-insurance/ppo-plans/metlife/">MetLife</a></li>
</ul>
```
JS toggles `hidden` (or `.open`) on the parent `<li>` for hover/focus; it never builds this list.

### 3b. Glossary dropdown (under "PPO Glossary")
Surface the **top glossary terms** as static deep-links to the glossary anchors/pages (H1 blocker #6 wants the glossary interlinked, not orphaned):

```html
<ul class="cc-drop" hidden>
  <li><a href="/dental-insurance-glossary/#annual-maximum">Annual Maximum</a></li>
  <li><a href="/dental-insurance-glossary/#waiting-period">Waiting Period</a></li>
  <li><a href="/dental-insurance-glossary/#deductible">Deductible</a></li>
  <li><a href="/dental-insurance-glossary/#coinsurance">Coinsurance</a></li>
  <li><a href="/dental-insurance-glossary/#in-network">In-Network / PPO</a></li>
  <li><a href="/dental-insurance-glossary/" class="cc-drop-all">All terms &rarr;</a></li>
</ul>
```

**Both panels:** the markup ships in the HTML for **every page**, identical, regardless of which page the visitor is on. The existing `.cc-tip` glossary tooltips on the Compare page are a separate (good) feature — but the dropdown's glossary links must be real `<a href>`s, not tooltip-only spans.

---

## 4. Anchor-text rules (from H1 §2 — enforce in the header)

- **One canonical phrase per hub**, used in the header, footer, breadcrumbs, and body links. Never mix "Compare PPO Plans" / "Compare Plans" / "PPO Comparison."
- Descriptive and concise. **No** "click here," "learn more," "menu," bare URLs, or icon-only links for primary hubs.
- Carrier child links use the **carrier name** as anchor ("Guardian," "Aetna"), never "view plan."
- Glossary child links use the **term name** as anchor ("Annual Maximum"), not "definition."
- A caret/chevron is decorative only — wrap it in `aria-hidden="true"`; it is never the link text.

---

## 5. `SiteNavigationElement` schema (server-rendered)

Ship this JSON-LD in the `<head>` of **every** page, mirroring the visible header (H1 §3c). It must be in static source, not JS-injected. Combine with `WebSite` + `Organization` + per-page `BreadcrumbList` into one `@graph` head partial.

```json
{"@context":"https://schema.org","@type":"ItemList","name":"Main navigation",
 "itemListElement":[
  {"@type":"SiteNavigationElement","position":1,"name":"Compare PPO Plans","url":"https://www.covercapy.com/dental-insurance/ppo-plans/"},
  {"@type":"SiteNavigationElement","position":2,"name":"Find a Dentist","url":"https://www.covercapy.com/find-my-dentist/"},
  {"@type":"SiteNavigationElement","position":3,"name":"Plans by Carrier","url":"https://www.covercapy.com/dental-insurance/ppo-plans/carriers/"},
  {"@type":"SiteNavigationElement","position":4,"name":"Delta Dental","url":"https://www.covercapy.com/dental-insurance/ppo-plans/delta-dental/"},
  {"@type":"SiteNavigationElement","position":5,"name":"Dental Insurance Glossary","url":"https://www.covercapy.com/dental-insurance-glossary/"},
  {"@type":"SiteNavigationElement","position":6,"name":"How We Rate","url":"https://www.covercapy.com/how-we-rate/"},
  {"@type":"SiteNavigationElement","position":7,"name":"Dental Insurance","url":"https://www.covercapy.com/dental-insurance/"}]}
```

- `name` values must **match the visible anchor text exactly**.
- Use one host throughout (`https://www.covercapy.com`, matching live canonicals — H1 blocker #3).
- Schema reinforces but does NOT earn sitelinks (H10 §5) — it is the visible static `<a>`s that do the work. Schema just removes ambiguity.

---

## 6. Recommended markup pattern (top item + dropdown)

```html
<header class="cc-mast">
 <nav class="cc-nav" aria-label="Main">
  <ul class="cc-nav-list">
   <li class="cc-has-drop">
     <a href="/dental-insurance/ppo-plans/" class="cc-nav-link">Compare PPO Plans</a>
     <button class="cc-caret" aria-expanded="false" aria-controls="drop-plans"
             aria-label="Open plan carriers"><span aria-hidden="true">&#9662;</span></button>
     <ul class="cc-drop" id="drop-plans" hidden>
       <li><a href="/dental-insurance/ppo-plans/delta-dental/">Delta Dental</a></li>
       <!-- …all carriers, static… -->
     </ul>
   </li>
   <li><a href="/find-my-dentist/" class="cc-nav-link">Find a Dentist</a></li>
   <!-- …remaining hubs… -->
  </ul>
 </nav>
</header>
```
- Top label is a real navigable `<a href>`; the caret `<button>` only toggles the panel.
- `hidden` attribute (or `.cc-drop[aria-hidden]`/CSS class) collapses the panel; the `<a>`s stay in source.
- JS: on caret click / `li` hover / keyboard, flip `hidden` and `aria-expanded`. That is the full extent of JS's job.
- Mobile: same markup, CSS-toggled accordion. No separate JS-fetched mobile menu (the current `mega-nav-mobile.css` pattern must also be inlined, not fetched).

---

## 7. Migration checklist (compare-ppo-dental-plans.html and template)

- [ ] Replace `<div id="cc-nav-mount"></div>` (line 846) with the full static `<header>` markup above.
- [ ] Remove `cc-nav-mount` from the component loader array (line 2218); keep the loader only if footer stays fetched — but H1 recommends inlining the footer links too. Best: inline both, delete the loader.
- [ ] Inline `mega-nav.css` / `mega-nav-mobile.css` styling for the static header (keep the gold/jade `data-theme` system; do not invent colors).
- [ ] Ship the `WebSite`+`Organization`+`SiteNavigationElement`+`BreadcrumbList` `@graph` in `<head>`.
- [ ] Use one host (`www`) and one canonical per hub in every `href`; 301 the `.html` and non-www forms.
- [ ] Bake the identical header partial into the generator so all 6,400 pages + hubs carry it (T5 generator already bakes per-page HTML — reuse that path).
- [ ] Verify with JS disabled + `curl | grep href` that all 6–8 hubs and all dropdown children are present.

---

## Summary (~150 words)

The current global nav on the Compare PPO page is injected by a client-side `fetch()` into `#cc-nav-mount`, so crawlers receive an empty div with zero internal links — the #1 blocker to earning sitelinks for "covercapy insurance." DH7's contract: every header and dropdown link must be a server-rendered (or build-time inlined) static `<a href>` present in the raw HTML; JavaScript may only toggle open/close, never create, fetch, or populate links. Dropdowns are collapsed with CSS/`hidden` (Googlebot still parses `display:none` links) but their carrier list and glossary terms stay fully in the DOM — never lazy-fetched on hover. The header exposes one stable 6–8 hub set (Compare PPO Plans, Find a Dentist, Plans by Carrier, Delta Dental, PPO Glossary, How We Rate, plus treatment/timing under Dental Insurance), each with one fixed descriptive anchor phrase used site-wide, mirrored by a `SiteNavigationElement` JSON-LD graph. Schema reinforces; the static links earn.

### Canonical link set
1. Compare PPO Plans — `/dental-insurance/ppo-plans/`
2. Find a Dentist — `/find-my-dentist/`
3. Plans by Carrier — `/dental-insurance/ppo-plans/carriers/` (dropdown: Delta Dental, Guardian, Aetna, Cigna, UHC, Humana, Ameritas, MetLife)
4. Delta Dental — `/dental-insurance/ppo-plans/delta-dental/`
5. PPO Glossary — `/dental-insurance-glossary/` (dropdown: Annual Maximum, Waiting Period, Deductible, Coinsurance, In-Network, All terms →)
6. How We Rate — `/how-we-rate/`
7. Dental Insurance — `/dental-insurance/` (treatment/timing: no waiting period, immediate coverage, between jobs, self-employed)

### Top 3 recommendations
1. **Delete the `cc-nav-mount` fetch loader and inline the header markup** so the 6–8 hub `<a href>`s exist in raw source — without this nothing else helps.
2. **Keep dropdown carrier + glossary links in the DOM, CSS/`hidden`-collapsed** (JS toggles only); never lazy-fetch sub-menu contents on hover.
3. **Lock one canonical anchor phrase + URL per hub site-wide** and ship the matching `SiteNavigationElement` JSON-LD in every page head.
