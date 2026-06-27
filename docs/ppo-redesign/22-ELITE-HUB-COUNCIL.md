# Elite Hub Council — synthesis & roadmap (15 specialists)

> June 2026. 5 SEO architects + 2 nav mappers + 2 UX + 2 typography + 2 color + 2 conversion.
> Memos in `agents/elite/`. Goal: make `compare-ppo-dental-plans.html` an elite hub that ranks in
> the PPO dental insurance cluster and converts to the revenue event (a verified in-network dentist).

## Verdict on "dental insurance" (SEO1)
Do NOT target the bare head term on this hub; it is owned by carriers, aggregators, Healthcare.gov.
Win it as a brand-association term through CLUSTER authority. Hub primary = **compare PPO dental plans**;
secondaries = PPO dental insurance plans, best PPO dental insurance 2026, dental insurance comparison.
Push the long-tail to spokes (carrier pages, glossary terms, scenario pages, treatment guides).

## DONE this pass (safe, unanimous, high-impact)
1. **Fabricated "Sarah Chen" reviewer removed** (SEO2, CONV2 flagged as the #1 YMYL liability) → honest "CoverCapy plan research team" + avatar CC.
2. **Title 84→53 chars**, keyword-first; meta rewritten ~150 chars, no "8".
3. **Canonical + og:url → no trailing slash** to match `vercel.json trailingSlash:false` (SEO5 P0; the slash form 308-redirects, breaking the self-canonical).
4. **Contrast AA fixes** (COL1/COL2): jade CTA fill darkened `#0E8C8B→#0A7E7D` + white text; `.flag-now` → `--covered-ink` (was 3.79:1); gold CTA `#B07B1E→#8F5E14` + white; gold range-slider teal→navy.
5. **404 footer "compare" links repointed** (`/compare/is-{carrier}-good/` did not exist) → real pages (Delta compare, all-carriers, no-waiting-period, glossary).
6. Earlier this session: dropdown hover grace 450ms; modal "View plan" → plan page; carrier brand colors from the ZIP; gold theme = gold + navy; MetLife page created.

## P0 — next, biggest ranking/honesty levers
- **Server-render the schema** (SEO3 wrote a literal price-free `@graph`: Organization #org+sameAs, WebSite+SearchAction, WebPage w/ datePublished+dateModified+author+honest reviewer, BreadcrumbList, ItemList of `Thing` plans, FAQPage parity, DefinedTermSet). Replace `injectSchema()` JS with the static block in `<head>`. Currently crawlers see no structured data.
- **Server-render nav + footer** (SEO5/NAV2): both are `fetch()`-injected into empty mounts, so a no-JS crawl sees no global link graph. Site-wide change (the `nav-static.html` fragment already drafted in `15-UNIVERSAL-NAV-SERVERRENDER-PLAN`).
- **Make SITUATIONS / TREATMENTS / ARTICLES crawlable** (NAV2): they render via JS with no `<a href>`, AND several target routes (`/best-dental-insurance-for-*`, `/learn/ppo-vs-hmo/`) don't exist on disk → live 404s once built. Either build the target pages then static-render the links, or repoint to existing pages.

## P1 — internal-link mesh (SEO4, NAV2)
- **Delta cluster never links back to the hub** (5 pages) — drains authority. Add a hub back-link to delta-dental + its 4 sub-pages.
- **12 of 23 glossary terms are orphan-from-hub**; surface more in the branch/terms area.
- **Plan pages link 0 glossary terms**; add deep links (waiting-period, annual-maximum, coinsurance).
- **Scenario pages link 0 specific plans**; each should link 2–4 relevant plans.
- **All-carriers index missing Humana + MetLife cards**; add them.
- Stray legacy `dd.html` + unlinked `dental-insurance/index.html` — link or clean.

## P1 — content depth / E-E-A-T (SEO2, CONV2)
- Build a real **methodology block** (the "How we rate plans" link points to an empty anchor) + a populated **source drawer** (per-fact "last verified · view sources").
- Add a **"What is a PPO dental plan?"** definition block + **PPO vs DHMO vs discount** disambiguation (snippet/definitional intent).
- Persistent **premium disclosure** ("illustrative, varies by state") — today it lives only in the static-table caption that JS overwrites; the `.disclosure` class is styled but unused.

## P1 — conversion rewiring (CONV1, NAV1)
- **Reserve green for the revenue path** (find/verify a dentist), demote off-site "Activate" to ghost. CoverCapy is paid by dental offices, so the dentist handoff is the money event.
- **Add "See dentists who take this plan"** to every plan card + the comparison matrix (the `?carrier=` link already exists, unused there).
- **Flip the hero verdict** so the dentist CTA is primary over "Open plan brief"; add a closing CTA after FAQ; fix the verdict empty-state dead-end.
- **Wire the verify/book modal submits** before launch (currently stub `closeModal()` — silently drops leads).
- Add an **urgent / in-pain goal tile** to Smart Match.

## P2 — UX / type / polish
- **Best-in-row markers** on the matrix (UX2): mint dot + bold on the winning cell of orderable rows; carry to cards + mobile.
- **Plan-shape pills** (Preventive/Basic/Major) on cards + matrix; collapse the duplicate "Coverage active"/"Activation" rows; reorder matrix into Cost / Logistics / Coverage bands.
- **Collapse the 5 competing card CTAs** to 1 primary + 2 secondary; demote "Verified Jun 2026".
- **Typography** (TYP1/TYP2): 4-step modular scale, weights 600/650 not blanket 700; **tabular-nums everywhere** numbers appear; route `$allowance` through `money()` for thousands separators; lift decision micro-data (waits, Y2) to ≥12px.
- **Mobile compare** (UX2): widen label column ~104px, `scroll-snap: mandatory`, soft-cap to 2 plans, raise corner z-index.
- Add a **`prefers-reduced-motion`** block (SEO5).

## Notes / flags the owner controls
- Slash policy + apex→www / http→https live in Vercel config (confirm).
- `og-hub.png` must be deployed before the social image resolves.
- The v2 upload (`compare-ppo-dental-plans 2.html`) is an OLDER variant (still has the removed stats block, lacks the carrier/glossary SEO sections) — nothing to port.
