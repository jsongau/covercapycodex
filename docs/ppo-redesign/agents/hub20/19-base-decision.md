# Hub20 — Base File Decision Memo

**Question:** Which of the two compare-PPO pages should be the BASE for the real, health-insurance-style hub, and what should be ported from the other?

**Files compared**
- LIVE: `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html` (2353 lines)
- NEW:  `/Users/kytlegacy/covercapycodex ultimate 21JUN26/docs/ppo-redesign/_zip-21jun/compare-ppo-NEW.html` (2257 lines)

---

## DECISION: Use the LIVE file as the BASE.

The two files are ~95% identical: same design tokens, same shared CSS block (lines 1-512 byte-for-byte), same JS module architecture, same data island, same FAQ/glossary engines. They diverged from a common ancestor. The differentiator is entirely in the SEO/crawlability layer, where the LIVE file is strictly a superset. The NEW file is 96 lines shorter precisely because it is MISSING those crawl assets. Porting them back into NEW would just reconstruct the LIVE file. Therefore LIVE is the base; cherry-pick the few copy refinements from NEW.

---

## CRITICAL PRESERVED ASSETS — audit result

| Asset | LIVE | NEW | Notes |
|---|---|---|---|
| Smart Match lens (`#match`, goalGrid/timeRow/budget/verdict) | YES | YES | Identical |
| `valueFrame()` cash-vs-premium framing | YES (line 1308) | YES (line 1212) | Identical function |
| One-match + honest-backup (`fitcard` / `fitcard backup`) | YES | YES | Identical CSS + render |
| 3-layer glossary tooltips (title/body/why + full-def link, `cc-tip` engine) | YES (2252+) | YES (2156+) | Identical |
| Static crawlable carrier branch grid (`cc-branch`, `#explore-carriers`) | **YES (1148-1170)** | **NO — MISSING** | Server-rendered links to 6 carrier plan pages + Delta hub |
| Static glossary shelf (`cc-gloss-mod`, `#glossary-shelf`) | **YES (1172-1191)** | **NO — MISSING** | 10 server-rendered glossary term links |
| Static comparison facts table (`.cc-static-cmp`) | CSS present (1140-1146); table block lives in branch/shelf region | **NO CSS, NO table** | NEW lacks the `.cc-static-cmp` styles entirely |
| `hub-branches` + `hub-trust` crawlable nav under H1 | **YES (CSS 127-133; HTML 882-883)** | **NO — MISSING both CSS and HTML** | "Browse PPO dental plans by" pill nav + trust line |
| Price-free schema (Product without offers/price) | YES | YES | Identical `@graph`; Product nodes carry no `offers`/`price`. SAFE in both. |

**Flag:** The NEW file is MISSING four of the SEO assets the task says must survive — the carrier branch grid, the glossary shelf, the static comparison-facts table CSS, and the hub-branches/hub-trust nav. These are the entire reason to keep the LIVE file as base. Adopting NEW as base would silently drop the crawl surface that feeds carrier-page sitelinks and glossary internal-linking.

---

## SECTION LIST

**LIVE sections (in order):** match, benefits, compare, shelf, dentists, treatment, situation, vision, terms, playbook, learn, **explore-carriers (carrier branch grid)**, **glossary-shelf**, faq.

**NEW sections (in order):** match, benefits, compare, shelf, dentists, treatment, situation, vision, terms, playbook, learn, faq.

NEW jumps straight from `learn` to `faq` — the two crawlable SEO sections are absent.

---

## JS MODULES (both files, identical)

- Smart Match engine — goal/time/budget inputs drive `verdict` with one-fit + backup.
- `valueFrame(p)` — reframes monthly premium against expected cash out-of-pocket for the chosen treatment.
- Compare matrix — sortable, add/remove plan columns, sticky header, empty-slot picker.
- Feature table / tray — desktop table + mobile card fallback (`#featMobile`).
- Collapsible 6-constraint planner ("revived Smart Match").
- FAQ reading-room (categories, open-all, accordion).
- Glossary tooltip engine (`cc-tip`) + auto-wrap of first prose mention of each term.
- Schema builder — `@graph` of Organization, WebSite, Service, Dentist[], Product[], FAQPage, DefinedTermSet, BreadcrumbList.

No JS module is superior in NEW; they are the same code.

## DATA ISLAND
Both use the same `<script id="plans-data" type="application/json">` island, same CURATED dentists, same FAQS, same TIPS/GLOSS glossary set, same 8-plan PPO shelf. **Premiums are identical and must stay FROZEN** — confirmed unchanged between files.

## DESIGN TOKENS
Identical `:root` block in both (paper/green/sage/gold/rust, Fraunces + Inter, radius 16, toch 52). No token drift.

---

## WHAT (LITTLE) NEW DOES BETTER — port these copy bits into LIVE

1. **Lede copy in Smart Match** (NEW line 877): "Three answers. Eight PPOs evaluated against your visit. CoverCapy returns your *closest fit*... plus a backup if your timing changes." Slightly crisper than LIVE; optional copy port.
2. **Reviewer/credibility line styling** (NEW 872) folds the "Reviewed by... How we choose plans" line directly under the eyebrow. LIVE carries the same trust content in `hub-trust` (line 882) but NEW's inline placement reads cleaner. Cosmetic; keep LIVE's `hub-trust` block (it is also a crawlable internal link) and optionally adopt NEW's wording.

That is the full list. Everything else in NEW is equal-or-worse than LIVE.

## WATCH-OUT IN NEW (do not port)
- NEW H1 (line 876) contains an **em-dash**: "Compare PPO dental plans —". This violates the no-em-dash house rule. Do not carry it over. LIVE's H1 wording is the safe baseline.

---

## RECOMMENDED PLAN
1. Base = LIVE `compare-ppo-dental-plans.html`.
2. Keep all four crawl assets (carrier branch grid, glossary shelf, static comparison-facts table CSS, hub-branches/hub-trust nav).
3. Optionally port NEW's tighter Smart Match lede wording — em-dash-free.
4. Do not touch premiums, schema, valueFrame, or the glossary engine; they are already correct and identical.
