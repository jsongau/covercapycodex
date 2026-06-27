# DH10 — Header Benchmark + Synthesized Spec (Compare PPO Main Hub)

**Agent:** Design Agent DH10
**Scope:** The global header for `compare-ppo-dental-plans.html` / canonical `/dental-insurance/ppo-plans/` — brand · primary nav · interactive text dropdowns · CTA · sticky sub-nav. Reconciles DH1 (hero/masthead) and DH3 (sticky sub-nav fix) against the H-series IA so the header earns Google sitelinks for "covercapy insurance."
**Theme:** T5 jade. CTA `--teal-night #082A30` ≠ links `--teal-700 #14525B` ≠ body `#33453E` (three distinct, the rule the ZIP broke). Fraunces brand wordmark, Inter nav. No em-dashes. No gradients/glass.

---

## Summary (~150 words)

The header is the single most load-bearing piece of the sitelinks bid, and it is currently the #1 blocker: `#cc-nav-mount` is JS-injected, so crawlers see an empty shell with zero internal links. The fix is architectural, not cosmetic. Benchmarks (NN/g, Baymard, large-site SEO guides) converge on one pattern: a **single server-rendered text bar** of `<a href>` links, click-activated dropdowns, total link count kept **28–36** (over 50 spikes bounce and dilutes PageRank), and a thin sticky behavior. CoverCapy needs exactly that — 6 primary text items whose labels match the sitelink-candidate hubs (Compare PPO Plans · Find a Dentist · Plans by Carrier · Delta Dental · PPO Glossary · How We Rate), each opening a crawlable dropdown into carriers/Delta/glossary/treatments, one persistent `Get covered` CTA, and DH3's sticky resource sub-nav pinned beneath it. Build it in raw HTML, identical on every page, before anything else.

---

## Benchmark — 5 patterns worth stealing

1. **Single server-rendered text bar, identical sitewide (NerdWallet/eHealth model).** Boilerplate `<a href>` nav repeated on every page is exactly how Google learns hierarchy and grants sitelinks. Text labels, not icon-only. Render in HTML at build time — never `fetch()` it.
2. **Click-to-open dropdowns, not hover-only (NN/g, Smashing).** Click is precise, works on touch and mouse, and kills the accidental-open bug class. If hover is added on desktop, gate it behind a 0.5s rest delay. Dropdown content is real `<a href>` links present in source whether or not JS runs.
3. **Cap total nav links at 28–36 (Baymard, NN/g).** Over ~50 links per page dilutes PageRank per link and raises nav bounce ~34%. CoverCapy's 6 primary items × small curated dropdowns lands in-band; resist dumping all 23 glossary terms into the menu.
4. **Descriptive, keyword-aligned labels that double as sitelink anchors (large-site SEO).** The nav label and the sitelink Google shows are the same string, so "Plans by Carrier," "Delta Dental," "PPO Glossary" should read as the destinations, not as cute concierge phrasing.
5. **Thin sticky bar + a contextual sub-nav for the hub (Smashing sticky guidelines + DH3).** Keep the global header slim when pinned; let DH3's resource sub-nav carry the in-cluster wayfinding (Overview · Compare · Glossary · timing leaves · Find a dentist) directly under it.

## Benchmark — 3 to avoid

1. **JS-injected nav/footer.** The current `fetch(components/mega-nav.html)` makes the hub crawl as zero-link — the literal reason sitelinks are impossible today. Hard no.
2. **Kitchen-sink mega panel (every carrier + every term + every treatment in one 60-link grid).** Dilutes equity, raises bounce, and buries the sitelink candidates among noise.
3. **Dev affordances shipped to prod (the GOLD/JADE `theme-switch`, duplicate `id="cc-ts"`).** DH3 flagged it: invalid duplicate id, ship single jade. No theme toggle in the header.

---

## SYNTHESIZED HEADER ANATOMY (the buildable spec)

A two-tier, fully server-rendered header. **Tier 1 = global header** (brand · primary nav · dropdowns · CTA). **Tier 2 = DH3 resource sub-nav** (hub-cluster wayfinding). Both raw `<a href>`, identical markup on every cluster page, pinned in a header → sub-nav stack.

### Tier 1 — Global header (`#cc-nav-mount`, server-rendered, 72px)

```
[ CoverCapy ]   Compare PPO Plans ▾  Find a Dentist  Plans by Carrier ▾  Delta Dental ▾  PPO Glossary ▾  How We Rate        [ Get covered ]
   brand            nav item 1          nav item 2        nav item 3         nav item 4       nav item 5      nav item 6        primary CTA
```

- **Brand (left):** "CoverCapy" wordmark in Fraunces, `--teal-night`, links to `/`. Not an image-only logo (keep it as crawlable text + the brand SVG mark).
- **Primary nav (6 text items, `--teal-700`, Inter):** labels chosen to match the H10 sitelink candidates so nav = sitelink anchor:
  1. **Compare PPO Plans ▾** → `/dental-insurance/ppo-plans/` (the hub; `aria-current="page"` here). Dropdown: Compare all 8 · Smart Match · By coverage feature · By treatment · By timing/life event.
  2. **Find a Dentist** → `/find-my-dentist` (no dropdown; highest-volume action).
  3. **Plans by Carrier ▾** → carrier branch. Dropdown: Humana Extend · UHC Primary · Aetna Dental Direct · Ameritas PrimeStar · Guardian Premier · Mutual of Omaha (MetLife omitted until built).
  4. **Delta Dental ▾** → `/dental-insurance/ppo-plans/delta-dental/`. Dropdown: PPO Premium (featured/bold) · Delta vs the field · Over 65 · UC students.
  5. **PPO Glossary ▾** → `/dental-insurance-glossary/`. Dropdown: ~6 priority terms (PPO · Annual maximum · Waiting period · Deductible · In-network · Coinsurance) + "All 23 terms →". Do NOT list all 23.
  6. **How We Rate** → methodology/independence page (no dropdown; trust anchor, carries "no paid placement").
- **CTA (right):** one persistent **`Get covered`** button, `--teal-night` fill, `--mint` hover accent → primary conversion path (Smart Match `#match` on the hub, or `/get-covered`). The hero's `Match my plan` (DH1) is the in-page CTA; the header CTA is the always-visible sitewide one. Keep them distinct so they don't read as duplicates.

### Dropdown system (interactive text dropdowns — crawlable)
- **Click-activated** (`aria-expanded`, `aria-controls`); optional 0.5s-delay hover on desktop only. Esc closes, focus-trap within panel, full keyboard path (DH6 owns a11y detail).
- Every dropdown link is a real `<a href>` **present in the served HTML** — JS only toggles visibility. Panels are simple single-column text lists (concierge-clean), not image grids. No gradients/glass.
- **Total link budget:** 6 primary + ~5+6+4+7 dropdown ≈ **28** links. In the 28–36 band. Footer carries the long tail (all carriers, all 23 terms, states).

### Tier 2 — DH3 resource sub-nav (sticky, pinned under header)
Per DH3: one crawlable `<nav class="di-hub">` moved into document order **immediately after `#cc-nav-mount`**, `position:sticky; top:72px`, dark `--panel` band, GOLD/JADE toggle deleted, current page `aria-current="page"`, horizontal-scroll on mobile, `section[id]{scroll-margin-top}` for clean anchor jumps. Links: Overview · Compare plans · Glossary · No waiting period · Between jobs · Self-employed · Need coverage now · Find a dentist →. This is the cluster's contextual wayfinding; Tier 1 is the global wayfinding.

### Sticky behavior
- Tier 1 header: fixed/sticky at `top:0`, 72px. Keep slim; do not grow on scroll.
- Tier 2 sub-nav: `top:72px`, z-index below header above content. If both pin, stack header → sub-nav → optional in-page `.toc` at `top:calc(72px + subnavh)` (DH3 §4).

### Schema / crawl
- Header + footer schema (`SiteNavigationElement` optional; `BreadcrumbList` required per-page) server-rendered in the shared `@graph` (H7). `WebSite`+`SearchAction` on the hub only. No `Offer.price`.

---

## Top 3 recommendations

1. **Server-render Tier 1 and Tier 2 in raw HTML, byte-identical on every cluster page — do this first.** This single change unblocks sitelinks; nothing else in the redesign matters until crawlers see real `<a href>` links instead of the empty `#cc-nav-mount` shell. Replace the `fetch(components/mega-nav.html)` mount entirely.
2. **Make the 6 primary nav labels equal the 6 sitelink candidates, click-open dropdowns, ~28 total links.** Compare PPO Plans · Find a Dentist · Plans by Carrier · Delta Dental · PPO Glossary · How We Rate. This aligns nav anchor = sitelink string, stays under the Baymard 50-link dilution threshold, and finally wires Delta + glossary into the hub (the current orphan risk, H2).
3. **Ship DH3's sub-nav fix as Tier 2 and kill the GOLD/JADE toggle.** Move the di-hub block under the header, pin it sticky at 72px, single jade scheme, no duplicate `id="cc-ts"`. One persistent `Get covered` CTA in the header, kept visually distinct from the hero's `Match my plan`.

### Open decisions for the founder
- **Header CTA destination:** `Get covered` → in-page Smart Match (`#match`) vs a dedicated `/get-covered` flow? (Recommend `#match` on hub, `/get-covered` elsewhere.)
- **Desktop hover-open:** allow 0.5s-delay hover in addition to click, or click-only everywhere for consistency? (Recommend click-only.)
- **6th nav slot:** "How We Rate" (trust) vs "Browse by State" (coverage) — only one fits cleanly before the CTA. (Recommend How We Rate; states live in footer.)
- **"Find a Dentist" prominence:** keep as plain nav item, or promote to a second outlined button beside `Get covered` given it is the highest-volume action?

---

## Sources
- [Mega Menus Work Well for Site Navigation — Nielsen Norman Group](https://www.nngroup.com/articles/mega-menus-work-well/)
- [Designing Sticky Menus: UX Guidelines — Smashing Magazine](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/)
- [Internal Linking Strategy 2026: Large-Site SEO Guide — Digital Applied](https://www.digitalapplied.com/blog/internal-linking-strategy-2026-large-site-architecture-guide)
- [Mega Menus & SEO — MagsTags](https://www.magstags.com/notes/mega-menus-seo/)
- [The SEO Case for a Single-Bar Navigation — PROS](https://pros.com/learn/blog/seo-case-single-bar-navigation/)
- [Best UX Pattern for Website Navigation With Dropdown Menus — Infinum](https://infinum.com/blog/website-navigation-dropdown-menus/)
- Internal: `12-MAIN-HUB-PLAN.md`, `agents/hub/H2-ia-branch-map.md`, `agents/header/DH1-hero-masthead.md`, `agents/header/DH3-fix-floating-subnav.md`
