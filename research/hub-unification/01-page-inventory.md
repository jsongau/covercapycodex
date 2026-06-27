# Hub Unification — Page Inventory & Batch Plan

**Audit date:** 2026-06-26
**Reference / target template:** `compare-ppo-dental-plans.html`
**Scope:** Unify universal mega-nav, sub-nav, breadcrumb, footer, and cream/jade color scheme across the dental-insurance hub.
**Mode:** Read-only audit. No pages were modified.

---

## 0. Reference page anatomy (`compare-ppo-dental-plans.html`)

The canonical structure every target page should converge on:

| Element | Implementation |
|---|---|
| Mega-nav | `<div id="cc-nav-mount">` injected by the **named COMPONENT_LOADER** array — `const components = [{ mountId:'cc-nav-mount', html:'components/mega-nav.html', script:'assets/js/mega-nav.js'}, {mountId:'cc-footer-mount', html:'components/footer.html', script:'assets/js/footer.js'}]` with separate `injectComponent` then `loadScript` passes. **Relative paths** (page lives at site root). |
| Sub-nav | `.toc` **cream sticky bar** with `toc-prog` scroll meter, the **Gold/Jade theme-switch** (`id="cc-ts"`, `data-active="jade"`), and dropdown menus (Compare / Plans / Explore / By Treatment / By Situation / Insurance Terms). |
| Breadcrumb | `.crumb` cream style, `border-bottom:0` → **NO divider line**. Home / Dental insurance / Compare PPO plans. |
| Footer | `<div id="cc-footer-mount">` injected by same COMPONENT_LOADER. **Works.** |
| Colors | cream/jade tokens (`--cream`, `--cream-card`, `--jade`, gold/jade theme blocks). |
| Toggle | Gold/Jade theme-switch present. |
| Scroll meter | Yes (`tocProg`). |
| Page JS to preserve | Supabase fetch (`sbFetch`, `SB_URL`), Nominatim geocode, `plans.json` fetch, theme engine. (Reference-specific — not part of rollout.) |

---

## 1. Plan pages — `dental-insurance/ppo-plans/*/index.html` (9)

| Path | Mega-nav loader | Sub-nav | Breadcrumb | Footer mount / loads? | Colors | Gold/Jade | Scroll meter | Page JS to preserve |
|---|---|---|---|---|---|---|---|---|
| `dental-insurance/ppo-plans/aetna-dental-direct/index.html` | Minified inline IIFE `{id,html,js}`, **absolute** `/components/...` | none | `.crumb` **WITH divider** (`border-bottom:1px`) | mount present, loads ✓ | other (`--surface/--ink-3`), NOT cream | yes, `id="theme-switch"` (NOT `cc-ts`) | no | Premium calculator (`calcFill`,`youSave`,`planPays`,`youPay`,`y1`,`y2`,`calcOpts`,`calcPull`,`calcNote`,`calcNudge`), `#sticky` price bar, scroll-spy IO |
| `dental-insurance/ppo-plans/ameritas-primestar/index.html` | same | none | `.crumb` w/ divider | mount present, loads ✓ | other | yes `theme-switch` | no | same calculator + sticky family |
| `dental-insurance/ppo-plans/delta-dental-ppo-premium/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/guardian-premier-ppo/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/humana-extend-5000/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/metlife-ncd-complete/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/mutual-of-omaha-dental/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/uhc-primary-dental/index.html` | same | none | `.crumb` w/ divider | loads ✓ | other | yes `theme-switch` | no | same |
| `dental-insurance/ppo-plans/index.html` (plans hub) | **Robust fallback-array** loader `html:['/components/...','components/...']` + `successClass` | none | none | loads ✓ (most resilient) | other | no | no | grid/filter UI for the 8 plan cards |

**Note:** the 8 carrier plan pages are near-identical structurally (one shared template). `ppo-plans/index.html` is the plans hub and differs (no theme-switch, no breadcrumb, fallback-array loader — the best loader in the repo).

**Also present but OUT OF SCOPE (not the 9 targets):** nested duplicates `ppo-plans/{aetna,ameritas,delta,guardian,humana,metlife,mutual-of-omaha,uhc}/<plan>/index.html`, plus `ppo-plans/dd.html`, and `ameritas-primestar/rct_index.html`, `uhc-primary-dental/rct_index.html`. Flag for cleanup separately.

---

## 2. Top-level guides — `guides/*.html` (9)

| Path | Mega-nav loader | Sub-nav | Breadcrumb | Footer mount / loads? | Colors | Gold/Jade | Scroll meter | Notes |
|---|---|---|---|---|---|---|---|---|
| `guides/in-network-vs-out-of-network-costs.html` | **NONE — hardcoded** `<header class="site">` | hardcoded `.toc` + `.nav` | hardcoded `.crumbs` | **NO mount — hardcoded `<footer class="site">`. BROKEN (legacy mockup).** | cream-deep (own tokens) | no | no | Self-contained mockup; in-file comment: "replace inline header/footer with shared mega-nav + footer mounts." **Needs full hand-conversion.** |
| `guides/medi-cal-vs-ppo-dental.html` | **NONE — hardcoded** | hardcoded | hardcoded `.crumbs` | **NO mount — hardcoded footer. BROKEN (legacy mockup).** | cream-deep | no | no | Same as above. Has green "Find a Dentist" reference baked in. **Needs full hand-conversion.** |
| `guides/root-canal-cost.html` | Named COMPONENT_LOADER, **absolute** paths | none (green journey bar `cc-j-*` only) | none | mount present, loads ✓ | other (not cream) | no | no | Static green "journey" progress bar (`#310 Find a Dentist`) — not a real sub-nav. |
| `guides/root-canal-cost-with-insurance.html` | same | none | none | loads ✓ | other | no | no | same family |
| `guides/root-canal-cost-without-insurance.html` | same | none | none | loads ✓ | other | no | no | same |
| `guides/root-canal-financing.html` | same | none | none | loads ✓ | other | no | no | same |
| `guides/root-canal-financing-no-credit-check.html` | same | none | none | loads ✓ | other | no | no | same |
| `guides/root-canal-insurance-coverage.html` | same | none | none | loads ✓ | other | no | no | same |
| `guides/root-canal-payment-plans.html` | same | none | none | loads ✓ | other | no | no | same |

**Split:** 2 legacy hardcoded mockups (BROKEN footer) + 7 "root-canal-*" guides (working COMPONENT_LOADER, no sub-nav, no breadcrumb, no theme toggle).

---

## 3. Situational guide folders — `guides/<topic>/index.html` (9 present; 11 expected)

| Path | Mega-nav loader | Sub-nav | Breadcrumb | Footer mount / loads? | Colors | Gold/Jade | Scroll meter |
|---|---|---|---|---|---|---|---|
| `guides/between-jobs/index.html` | Standalone IIFE, mountId/html/script keys, **absolute** | **`di-hub` dark pill bar** | none | loads ✓ | cream + jade tokens | yes (di-hub theme, 14 refs) | no |
| `guides/self-employed/index.html` | same | `di-hub` pill bar | none | loads ✓ | cream + jade | yes | no |
| `guides/no-waiting-period/index.html` | same | `di-hub` pill bar | none | loads ✓ | cream + jade | yes | no |
| `guides/immediate-coverage/index.html` | same | `di-hub` pill bar | none | loads ✓ | cream + jade | yes | no |
| `guides/braces-invisalign/index.html` | Minified `comps=[{m,h,s}]` `forEach`, **absolute** | **`.toc` cream bar + theme-switch** (`cc-ts`, `data-active="gold"`) | `.crumb` (Home / Guides / title) | loads ✓ | cream/jade | yes (`cc-ts`) | no |
| `guides/whitening/index.html` | same | `.toc` + theme-switch | `.crumb` | loads ✓ | cream/jade | yes | no |
| `guides/dentures/index.html` | same | `.toc` + theme-switch | `.crumb` | loads ✓ | cream/jade | yes | no |
| `guides/root-canals/index.html` | same | `.toc` + theme-switch | `.crumb` | loads ✓ | cream/jade | yes | no |
| `guides/implants/index.html` | same | `.toc` + theme-switch | `.crumb` | loads ✓ | cream/jade | yes | no |

**Two sub-groups:**
- **3A — di-hub group (4):** between-jobs, self-employed, no-waiting-period, immediate-coverage → dark `di-hub` pill bar, no breadcrumb.
- **3B — toc group (5):** braces-invisalign, whitening, dentures, root-canals, implants → `.toc` cream bar + theme-switch + `.crumb`. **Closest to reference already.**

**Count discrepancy:** task expected 11 folders (named crowns, root-canals, …). `guides/crowns/` **exists but has NO `index.html`** — it holds 8 stand-alone sub-pages (`cost.html`, `cost-with-insurance.html`, `insurance-coverage.html`, `financing.html`, `payment-plans.html`, etc.). Not part of the 9 situational-index targets; flag separately for treatment-cluster work.

---

## 4. Glossary terms — `guides/glossary/*/index.html` (23 terms + 1 hub)

All 23 term pages are **near-identical** (single template). Sampled: `ada-fee`, `annual-maximum`, `deductible`, `ppo`, `waiting-period`, `in-network`.

| Element | Glossary term template | Glossary hub (`guides/glossary/index.html`) |
|---|---|---|
| Mega-nav loader | **Standalone per-component inline IIFE** (one IIFE for nav, one for footer) | same |
| Sub-nav | `.toc` cream bar + `toc-prog` scroll meter + theme-switch (`cc-ts`, `data-active="jade"`) | same |
| Breadcrumb | **`.bc`** style (NOT `.crumb`) — Home / Dental insurance / Glossary / term | `.bc` **and** `.crumb` both present |
| Footer | `<div id="cc-footer-mount">` + standalone footer IIFE — loads ✓ | loads ✓ |
| Colors | cream/jade | cream/jade |
| Gold/Jade | yes (`cc-ts`) | yes |
| Scroll meter | **yes** (`tocProg`) | yes |

**23 terms:** ada-fee, allowed-amount, annual-maximum, balance-billing, calendar-year, cdt, coinsurance, coverage-basic, coverage-major, coverage-preventive, day-one, deductible, effective-date, implants, in-network, missing-tooth, out-of-pocket, plan-year, ppo, rating, vision, waiting-period, whitening. **+1 hub:** `guides/glossary/index.html`.

**Footer-loader note:** glossary uses the fragile standalone-IIFE pattern (`fetch().then(r=>r.ok?r.text():'').then(t=>{if(!t)return;...})`) which **silently no-ops on any non-200** with no error attribute. Paths are absolute so they resolve in production, but this is the least robust loader and should be replaced with the named COMPONENT_LOADER during rollout.

---

## 5. Dental-insurance hub — `dental-insurance/index.html` (1)

| Element | Value |
|---|---|
| Mega-nav loader | Named array `{mountId,html,script}`, **absolute** `/components/...` (async/await) |
| Sub-nav | **`di-hub` dark pill bar** (teal-night bg) |
| Breadcrumb | **`.bc`** style |
| Footer | `<div id="cc-footer-mount">` + same loader — loads ✓ |
| Colors | cream + jade tokens |
| Gold/Jade | yes (`cc-ts` theme engine) |
| Scroll meter | no |
| Notes | Has a `Find a Dentist` SiteNavigationElement schema entry. di-hub bar is the canonical hub nav. |

---

## 6. Summary — counts per variant

**Total target pages: 51** (9 plan + 9 top-guides + 9 situational + 23 glossary terms + 1 glossary hub… = 51; glossary hub counted within group 4).

### Mega-nav loader variant
| Variant | Count | Pages |
|---|---|---|
| Named COMPONENT_LOADER (reference form) | 7 | root-canal-* guides |
| Named array, absolute paths (DI-hub / between-jobs family) | 5 | DI hub + 4 di-hub situational |
| Robust fallback-array loader | 1 | ppo-plans/index.html |
| Minified inline IIFE, absolute (`{id,html,js}` plan / `{m,h,s}` braces) | 13 | 8 carrier plan pages + 5 toc situational |
| Standalone per-component IIFE (fragile) | 24 | 23 glossary terms + glossary hub |
| **NONE — hardcoded header/footer** | **2** | in-network-vs-out-of-network-costs, medi-cal-vs-ppo-dental |

### Sub-nav variant
| Variant | Count |
|---|---|
| `.toc` cream bar (reference) | 24 glossary + 5 toc situational + 1 = **30** |
| `di-hub` dark pill bar | DI hub + 4 situational = **5** |
| Green journey bar only (`cc-j-*`, not a real subnav) | 7 root-canal guides |
| Hardcoded `.toc`/`.nav` (legacy) | 2 |
| **None** | 8 carrier plan + ppo-plans hub = **9** |

### Breadcrumb variant
| Variant | Count |
|---|---|
| `.crumb` **without** divider (reference) | 0 currently (reference only) |
| `.crumb` **with** divider line | 8 carrier plan pages + 5 toc situational = **13** |
| `.bc` | 23 glossary + glossary hub + DI hub = **25** |
| Hardcoded `.crumbs` (legacy) | 2 |
| **None** | 7 root-canal + 4 di-hub situational + ppo-plans hub = **12** |

### Footer status
| Status | Count |
|---|---|
| Loads ✓ | **49** |
| **BROKEN (hardcoded `<footer class="site">`, no mount, no loader)** | **2** → `guides/in-network-vs-out-of-network-costs.html`, `guides/medi-cal-vs-ppo-dental.html` |

> The genuinely broken footers are the **2 legacy hardcoded guides**. The glossary's standalone-IIFE loader is *fragile* (silent no-op on non-200) but functions in production with absolute paths — upgrade, not "broken."

### Color scheme
| Scheme | Count |
|---|---|
| cream/jade (reference) | 24 glossary + 5 toc situational + 4 di-hub situational + DI hub = **34** |
| other / legacy tokens | 8 plan + ppo-plans hub + 7 root-canal + 2 legacy = **18** |

### Gold/Jade toggle
- **Present:** 34 (all cream/jade pages: glossary ×24, toc situational ×5, di-hub situational ×4, DI hub) + 8 carrier plan pages (use `id="theme-switch"` variant, not `cc-ts`) = **42**.
- **Absent:** 7 root-canal + 2 legacy + ppo-plans hub = **9**.

### Scroll-progress meter
- **Present:** 24 glossary only.
- **Absent:** all 27 others.

---

## 7. Recommended batches (each transformed identically)

**Batch G — Glossary (24 pages):** 23 terms + hub. Uniform single template. Already cream/jade + `.toc` + scroll meter. Work: swap `.bc` → reference `.crumb` (no divider), replace fragile standalone-IIFE loader with named COMPONENT_LOADER, align toc dropdowns. **Lowest risk, highest volume — do first to validate the transform.**

**Batch S-toc — Situational toc group (5):** braces-invisalign, whitening, dentures, root-canals, implants. Already `.toc` + `cc-ts` + `.crumb` + cream/jade. Work: remove `.crumb` divider, normalize toc dropdowns, swap minified loader → named COMPONENT_LOADER. **Closest to reference — near-trivial.**

**Batch S-dihub — Situational di-hub group (4) + DI hub (1) (5):** between-jobs, self-employed, no-waiting-period, immediate-coverage, `dental-insurance/index.html`. Convert `di-hub` pill bar → reference `.toc` cream bar; add reference `.crumb`; convert `.bc` (hub). cream/jade already present. **Medium effort — sub-nav swap.**

**Batch P-carrier — Carrier plan pages (8):** all 8 `ppo-plans/<carrier>/index.html`. Identical template. Work: re-skin tokens → cream/jade, swap `.crumb` divider off, rename `id="theme-switch"` → `cc-ts` (or keep + adapt engine), add `.toc` sub-nav. **MUST preserve page JS:** calculator (`calcFill/youSave/planPays/youPay/y1/y2/calcOpts/calcPull/calcNote/calcNudge`), `#sticky` price bar, scroll-spy IntersectionObserver. **Higher risk — interactivity-heavy.**

**Batch P-hub — Plans hub (1):** `ppo-plans/index.html`. Add `.toc` + `.crumb` + cream/jade. Keep its excellent fallback-array loader (or standardize). Preserve plan-grid filter JS.

**Batch R — Root-canal guides (7):** all `guides/root-canal-*.html`. Add `.toc` sub-nav + `.crumb`, re-skin to cream/jade, add Gold/Jade toggle. Decide fate of the green `cc-j-*` journey bar (likely remove). **Medium effort.**

**Batch L — Legacy hardcoded (2) — HAND ATTENTION:** `guides/in-network-vs-out-of-network-costs.html`, `guides/medi-cal-vs-ppo-dental.html`. Full conversion: strip hardcoded `<header class="site">` / `<footer class="site">` / `.nav` / `.crumbs` / `.toc`, insert `cc-nav-mount` + `cc-footer-mount` + COMPONENT_LOADER, rebuild sub-nav + breadcrumb, re-skin tokens. **These are the broken-footer pages and the only ones needing bespoke rework.**

---

## 8. Flags for hand attention / out-of-scope cleanup

1. **BROKEN footers:** the 2 legacy guides (Batch L) — no mount at all.
2. **Plan-page theme-switch id mismatch:** carrier plan pages use `id="theme-switch"`; reference/glossary/situational use `id="cc-ts"`. Unify the engine.
3. **Glossary loader fragility:** standalone IIFE silently no-ops on non-200 — upgrade to named loader.
4. **`.bc` vs `.crumb` split:** 25 pages on `.bc`, 13 on `.crumb`-with-divider, reference is `.crumb`-no-divider. Pick one canonical breadcrumb component.
5. **`guides/crowns/` has no index.html** (8 stand-alone treatment sub-pages instead) — not a situational-index target; handle in a separate treatment-cluster pass.
6. **Out-of-scope duplicates under ppo-plans:** nested `<carrier>/<plan>/index.html` mirrors, `dd.html`, and two `rct_index.html` files — flag for dedupe/removal, not unification.
7. **Relative vs absolute component paths:** reference uses relative (`components/...`); every sub-directory page correctly uses absolute (`/components/...`). Keep absolute for all non-root pages during rollout.
