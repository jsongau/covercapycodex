# find-my-dentist.html — Technical SEO + Front-End Audit
Audit date: 2026-06-26. Source: `/find-my-dentist.html` (~9,580 lines, ~695KB, single self-contained file). Purpose: feed the build of a new `dentist.html` crawlable national hub that reuses the working app while fixing SEO gaps.

---

## 1. Full page structure (top to bottom)

### Head (lines 3–43)
- `<title>` (L6): `Find PPO Dentists Near You | CoverCapy` — generic, low keyword density.
- `<meta name="description">` (L7): generic nationwide blurb.
- `<link id="seo-canonical" rel="canonical">` (L8): `https://www.covercapy.com/find-my-dentist` (note `www.` host; rest of site/CLAUDE.md uses `covercapy.com`).
- Robots (L11): `index, follow, max-image-preview:large…` — good.
- Sitemap link (L12): `/sitemap.xml`.
- GSC verification (L16): `content="REPLACE_WITH_YOUR_GSC_TOKEN"` — **placeholder, site not verified**.
- GA4 (L19–25): `G-XNBPGSZ1LZ`. AdSense (L28–29): `ca-pub-8699915070570206`.
- OG/Twitter (L31–37) mirror the generic title/desc; ids `seo-og-title/desc/url`, `seo-tw-title/desc` are mutated at runtime by JS (`§2 meta + URL sync`, ~L7260).
- Fonts (L38–39): Fraunces + Inter Tight from Google. No `og:image`/`twitter:image` URL set.

### External CSS (L40–43)
- `/assets/css/footer.css`, `/assets/css/mega-nav.css`, `/assets/css/mega-nav-mobile.css`.

### Inline `<style>` (L44–1853)
- All design tokens defined L45–61 (matches CLAUDE.md tokens). ~1,800 lines of inline CSS. Sticky layers: `.topnav` z50, `.searchrail` z40, `.filters`/`.mapcol`/`.prail` sticky offsets.

### Nav mount (L1635–~1700)
- `<div id="cc-nav-mount"></div>` then inline script `fetch('/components/mega-nav.html')` → injects HTML into `#cc-nav-mount`, re-executes injected `<script>` tags (innerHTML scripts are inert, so it clones them). This is the shared mega-nav loader.

### Body sections
- `.dh-header` hero (L1855–1877): eyebrow, **H1 `Know your dentist? Search them first.`** (L1858 — clever but keyword-light), sub-copy, and the universal command search bar `#ucmd` (`#ucmd-input`, `#ucmd-go`, `#ucmd-rad`, `#ucmd-menu`, `#ucmd-nearby`).
- `.rail-intro` (L1880): "Refine your search" framing band with an `<h2>`.
- `.searchrail #searchrail` (L1890–1919): sticky detailed search — `#q-where` (+ `#ac-menu` autocomplete), `#q-spec` select, `#q-carrier` select, `#q-rad` range (+ `#adv-rad-val`), `.s-search` button → `advSearch()`, `#search-summary`, `#search-toggle`.
- `#cc-seekbar` (L1920) progress bar.
- `<main class="wrap">` (L1927):
  - inline `<style id="seo-css">` (L1928–1954) for SEO chips/disclosure.
  - `.resultbar` (L1958): `<h2 id="rb-title">`, `#rb-count`, "How CoverCapy sorts offices" → `openModal('m-how')`, `.rb-map` → `openFsMap()`, `#view-switch` (cur/list/grid/market via `setView()`), `#sort` select → `render()`.
  - `#cc-seekline` (L1983) live status.
  - `#area-band` (L1986–~2018): area overview — `#ab-title`, `#ab-stats`, `#ab-cities`, `#ab-net-inner`, `#ab-guide`, `#ab-cta-count`, `#ab-collapsed-lbl`.
  - `.layout` grid: left `<aside>` with `#minimap` (→ `openFsMap()`), `#alloc-btn` (→ `setCounty()`), `#filters` (filter UI injected by JS); center **`<section class="listings" id="listings"></section>`** (the core results target, empty in HTML); right `.prail` with `#ctx-rail` (contextual cards), CoverCapy network `#eco-card`, `#appreciation-card`.
  - SEO discovery block `#seo-disc` (L2091–2102): toggle + 3 link columns `#seo-cities`, `#seo-treatments`, `#seo-carriers` — **all empty in HTML, filled by JS** (so internal links are NOT in static source).
  - `#seo-nearby` (L2104–2107): `#seo-nearby-links` — also JS-filled.
- Footer mount (L2110–2124): `<div id="cc-footer-mount">` + inline script `fetch('/components/footer.html')` → innerHTML, then loads `/assets/js/footer.js`.
- `.mobilebar` (L2127): Filters/Map/Sort buttons.
- `.sheet #sheet` (L2134): mobile filter sheet (filters node is moved between `#filters-slot` and `#filters-sheet-slot`).
- `.comptray #comptray` (L2145): compare tray, `#ct-count`.
- Modals + fullscreen map (see §1 modal list below).
- App scripts at L2491–2494 then the giant inline app `<script>` starting L2495.

### Modals (all `class="scrim"`, opened/closed by `openModal(id)`/`closeModal(id)`, L7070–7071; scrim click + Esc close handlers L7089–7090)
| Modal id | Line | Trigger(s) |
|---|---|---|
| `#m-how` | 2152 | "How CoverCapy sorts offices" link in resultbar |
| `#m-verify` | 2160 | PPO verification wizard `v2-*` (hero/card CTAs; `t5`-prefixed is the T5 page version, different) |
| `#m-exit` | 2319 | "Visit website" handoff (`em-*` fields) |
| `#m-avail` | 2355 | Request availability (`av-*`) |
| `#m-claim` | 2370 | `openClaim(id)` claim profile (`c-*`) |
| `#m-nominate` | 2391 | Nominate a dentist (`nom-*`) |
| `#m-disc` | 2403 | Generic disclaimer (`disc-*`) |
| `#m-profile` | 2408 | `#profile-body` injected |
| `#m-save` | 2409 | Save office (`#m-save-name`) |
| `#m-loc` | 2420 | Turn on location (`loc-*`) |
| `#m-share` | 2426 | Share practice (`share-*`) |
| `#m-insverify` | 8611 | Verify PPO acceptance (`iv-*`) |
| `.fsmap #fsmap` | 2438 | Fullscreen map (`#fullmap`, `#fs-sheet`, `#fs-listings`, `#fs-card`, `#fsmap-loc`, `#fsmap-rad`) — `openFsMap()`/`closeFsMap()` |
- Dentist detail drawer `#ddrawer` + `#dd-scrim` (not a `.scrim`; own open/close `openDentistDrawer`/`closeDentistDrawer`, L6717–6782), tabs via `ddTab()`.

---

## 2. How results are rendered — CLIENT-SIDE from Supabase (must stay intact)

**Confirmed client-side.** No server rendering of dentists; `#listings` ships empty and is populated by JS.

### Supabase client (L2530–2532)
```js
const SB_URL  = "https://hfvbeqlefwwjlrbyxpbj.supabase.co";
const SB_ANON = "sb_publishable_wlfujszvn2logC3KNL3MsA_AW1F42kf";  // publishable anon key
const sb = window.supabase.createClient(SB_URL, SB_ANON);
```
Loaded via `@supabase/supabase-js@2.49.4` UMD (L2491). Leaflet + markercluster (L2492–2494) for maps.

### Boot load (`bootData()`, L2655–2697)
Runs two paginated fetches in parallel via `fetchAllPages()` (L2615–2630, handles 1000-row cap, fires `onFirstPage` for early paint):
- `search_locations` — cols: `name,type,city,state,lat,lng,zip_codes,aliases,slug,priority,description,emoji,active`, filter `active=true`.
- `dentists` — cols = `PUBLIC_DENTIST_FIELDS` (L2635–2653): `id,slug,name,practice_name,doctor_name,city,local_area,market_area,featured_area,state,zip,address,phone,email,website,booking_url,accreditation_status,is_sponsored,is_claimed,aggregate_rating,aggregate_review_count,google_*,yelp_*,capy_*,weighted_*,rating_display,zocdoc_*,insurance_networks,specialties,procedures,languages,latitude,longitude,short_description,open_weekends,weekend_hours_note,avatar_*,image_url,gallery_images,cover_image_url,claimed_by,pending_display_label,badge_*,profile_url,geo_sector,sub_area`.
- First chunk → `WORKING = firstChunk.map(normalizeRow)`, `BY_UUID`, then `homeDefault()` paints. `normalizeRow()` (L2546–2596) maps raw rows to card shape (`practice, tier, carriers[], specialties[], lat, lng, rating, reviews…`). `DEMO_DENTISTS` (L2506–2515) is a baked Orange County fallback so the page is never blank if Supabase fails.

### Other Supabase reads/writes (do not break)
- Avatar system (L3086–3088): `avatar_trait_categories`, `avatar_traits`, `avatar_generation_presets`.
- Map anchors / lifestyle layer (L5344, L5365): `map_anchors`.
- Saved dentists (L6073): `saved_dentists.upsert`.
- Form submissions (L3848 waitlist, L6626): `form_submissions.insert`.
- Verification (L6514 count check, plus wizard POST): `verification_requests` via REST; **member ID never stored** (only boolean).
- Media upload (L6277–6282): `sb.storage.from('dentist-media')`, `dentists.update`.
- City hub URLs (L7116): REST GET `hub_pages?select=city_key,hub_url&hub_type=eq.city&is_live=eq.true` → `HUB_URLS` map used to build crawlable city links.
- Nominatim geocode (L5893) for free-text map search.

### Key innerHTML / element-ID write targets (must keep these IDs)
- `#listings` — main results (`render()` ~L3704, `root.innerHTML = html`; skeletons; empty/error states).
- `#filters` (L4044), `#rb-title`/`#rb-count` (L3731–3739), `#area-band` + `ab-*`, `#ctx-rail` (L7614–7634), `#seo-cities`/`#seo-treatments`/`#seo-carriers` (L7385–7394), `#seo-nearby-links` (L7406), `#seo-chips` (L7349), map containers `#sidemap`/`#fullmap`/`#minimap`, fs sheet `#fs-listings`/`#fs-card`/`#fs-count`, drawer `#ddrawer`, all modal field ids.

---

## 3. Interactive features + DOM dependencies (do NOT rename/remove)
- **Universal command bar** `#ucmd-input`: `oninput=ucmdInput`, `onkeydown=ucmdKey`, `onfocus=ucmdFocus`; `#ucmd-go onclick=ucmdSubmit`; `#ucmd-rad onclick=ucmdCycleRadius`; `#ucmd-loc-l onclick=ucmdUseLocation`; menu `#ucmd-menu`, `#ucmd-nearby`.
- **Detailed rail**: `#q-where` (+ `#ac-menu` autocomplete via `acRender`), `.sf-go onclick=advSearch`, `.sf-loc onclick=useCurrentLocation`, `#q-spec`/`#q-carrier` selects, `#q-rad` range `oninput=advRadPreview onchange=advRadCommit`, `.s-search onclick=advSearch`, `#search-toggle onclick=toggleSearchCollapse`.
- **Result controls**: `#sort onchange=render`, `#view-switch` buttons `onclick=setView(...)`, `.rb-map onclick=openFsMap`, "How we sort" `onclick=openModal('m-how')`.
- **Cards**: `#card-{id}` / `#mini-{id}` hover+highlight (`highlightCard`, `hoverPin`, `scrollToCard`); save (`.savebtn`), compare (`#comptray`/`#ct-count`).
- **Maps**: Leaflet `sideMap`/`fullMap`/`miniMap`, `pinIndex`, redo-search `.mc-redo`, `#mv-toggle`/`#mv-toggle2`, fs sheet `toggleFsSheet`/`cycleFsSheet`.
- **Modals/drawer**: `openModal`/`closeModal`, scrim-click + Esc handlers (L7089–7090), `#sheet` click-to-close (L7091), verification wizard `v2-step-*`/`v2-prog-*`/`v2-carrier-tile`/`v2-next-1/2`/`v2-send-btn`.
- **SEO/nav helpers**: `goSeo()`, `seoLink()`, `ctxHubUrl()`, canonical/meta sync (`set('#seo-canonical','href',url)` L7267), URL-segment parsing for `/best-ppo-dentists/...` located views.
- **Nav/footer**: `toggleNavMenu`/`closeNavMenu` (`#mobile-menu`, `.menu-toggle`), mounts `#cc-nav-mount`, `#cc-footer-mount`.

Inline `onclick`/`oninput`/`onkeydown` handlers are pervasive — the JS depends on these exact IDs and global function names. **Renaming anything breaks the app.**

---

## 4. Inline vs external assets
**External CSS:** `/assets/css/footer.css`, `/assets/css/mega-nav.css`, `/assets/css/mega-nav-mobile.css`, Google Fonts, Leaflet MarkerCluster CSS.
**External JS:** GA4 gtag, AdSense, supabase-js UMD, Leaflet, leaflet.markercluster, plus runtime-loaded `/assets/js/footer.js`.
**Fetched HTML components:** `/components/mega-nav.html` (→ `#cc-nav-mount`), `/components/footer.html` (→ `#cc-footer-mount`).
**Everything else inline:** ~1,800 lines CSS in `<style>` and ~7,000 lines JS in one `<script>`. The page is essentially monolithic. Nav and footer are the only injected shared components.

---

## 5. SEO gaps observed
1. **Zero JSON-LD / structured data** — confirmed: grep for `ld+json`/`@context`/`@type`/`schema.org` returns **0 matches**. No WebSite, Organization, BreadcrumbList, ItemList, FAQ, or MedicalBusiness schema. (T5 dental/ pages have rich schema; this hub has none.)
2. **Keyword-light H1** — `Know your dentist? Search them first.` No "PPO dentist" / location intent in the H1.
3. **Generic title/meta** — no location or carrier modifiers; identical across every search state until JS rewrites them (and JS rewrites only help if crawler executes JS).
4. **Client-rendered internal links** — `#seo-cities/#seo-treatments/#seo-carriers/#seo-nearby-links` and all dentist cards are empty in static HTML, built by JS from Supabase + `hub_pages`. A crawler that does not run JS sees an essentially linkless, content-less page. This is the single biggest crawlability gap for a "national hub."
5. **GSC placeholder token** (L16) — `REPLACE_WITH_YOUR_GSC_TOKEN`; site verification not wired.
6. **Canonical host mismatch** — uses `www.covercapy.com` while CLAUDE.md/key URLs use `covercapy.com`. Pick one to avoid duplicate-host signals.
7. **Page weight / CWV risk** — ~695KB single document, ~1,800 lines inline CSS + ~7,000 lines inline JS parsed on every load, plus Supabase + Leaflet + markercluster + AdSense + GA4. Heavy main-thread/JS cost; LCP depends on async Supabase fetch (results paint only after fetch resolves, mitigated by `DEMO_DENTISTS` seed). No `og:image`.
8. **No static crawlable body copy** — almost no indexable text content (GEO/AI-answer signals weak).

---

## 6. Safe-to-make-static vs MUST-stay-JS
**Safe to make static / server-render in `dentist.html` (add around the app):**
- Full JSON-LD graph (WebSite + Organization/MedicalBusiness + BreadcrumbList + ItemList/FAQ).
- A keyword-rich static H1 + intro prose (national "PPO dentists" hub copy).
- A **static crawlable internal-link block**: states, top metros, treatments, carriers — hardcoded `<a>` to `/dental/...` tier hubs (built from parts per CLAUDE.md, never `seo_path`). This is the SEO payload the current page lacks.
- Static FAQ section (GEO/answer-engine friendly).
- Correct canonical, title, meta, GSC token, og:image.

**MUST stay JS (copy verbatim, do not touch):**
- Supabase client + `bootData()` + `fetchAllPages()` + `normalizeRow()` + `DEMO_DENTISTS`.
- All of `#listings` rendering, ranking, filters, maps (Leaflet), autocomplete, area band, context rail.
- Every modal + the verification wizard (member-ID-never-stored logic).
- Nav/footer mount scripts, meta/URL sync, `HUB_URLS` loader.
- All inline `onclick`/IDs/global function names.

---

## 7. Reuse plan for `dentist.html`

**Copy verbatim from `find-my-dentist.html`:**
1. Entire inline `<style>` block (L44–1853) and `<style id="seo-css">`.
2. The whole body app markup: `.dh-header`/`#ucmd`, `.rail-intro`, `.searchrail`, `.resultbar`, `#area-band`, `.layout` (filters/listings/prail), `#seo-disc`, `#seo-nearby`, mobilebar, sheet, comptray, all modals (`#m-*`, `#m-insverify`), `#fsmap`, `#ddrawer`.
3. External `<script>`/`<link>` tags (supabase-js, Leaflet, markercluster, GA4, AdSense, fonts, the 3 CSS files).
4. The entire inline app `<script>` (L2495–end) unchanged — including Supabase consts, `bootData`, `normalizeRow`, render/rank/filter/map/modal code, meta-sync, `HUB_URLS`.
5. Nav mount (`#cc-nav-mount` + loader) and footer mount (`#cc-footer-mount` + loader).

**Add around it (the SEO/GEO layer):**
1. New `<head>`: keyword-rich `<title>`, location-aware `<meta description>`, correct single-host canonical (`https://covercapy.com/dentist`), real GSC token, `og:image`.
2. JSON-LD `<script type="application/ld+json">` graph (WebSite, Organization/MedicalBusiness, BreadcrumbList, ItemList of top markets, FAQPage). None exists today — pure addition, zero conflict.
3. New keyword-rich static H1 + intro prose (keep the existing clever line as an H2/eyebrow if desired so app copy/JS is undisturbed).
4. A static, hardcoded national internal-link section (states → metros → cities → treatments → carriers) with real `/dental/...` URLs built from parts. This must exist in raw HTML, independent of the JS-filled `#seo-cities` etc. (which can remain as a progressive enhancement).
5. A static FAQ section for GEO/answer engines.

**Constraints (CLAUDE.md):** no em-dashes in any new copy; preserve design tokens exactly; build all URLs from parts, never `d.seo_path`; never store member IDs. Do not rename any existing ID, class, or global function — the app is tightly coupled to them.

**Risk note:** because the app is monolithic and ID-coupled, the safest pattern is: clone the file, change only `<head>` + insert static SEO blocks where they do not collide with existing IDs (use new ids like `dh-seo-intro`, `seo-static-links`, `faq-static`), and leave the entire `<script>` untouched.
