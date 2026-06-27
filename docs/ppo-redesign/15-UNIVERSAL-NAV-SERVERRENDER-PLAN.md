# Universal Nav — Server-Render Plan (the last sitelinks blocker)

> June 2026. Goal: make the global nav + footer crawlable on all ~6,676 pages so Google can
> learn the hierarchy and award sitelinks for "covercapy insurance." This is an architecture
> change, not a one-page edit. Run the generator step from the Mac (Supabase + repo root).

---

## The problem, precisely

Every page ships `<div id="cc-nav-mount"></div>` (and `<div id="cc-footer-mount"></div>`), then JS does `fetch('components/mega-nav.html')` and injects it on load. Three consequences:

1. **Crawlers see an empty `<div>`.** Zero internal links in the served HTML, so Google never learns the site hierarchy. This is the single biggest reason sitelinks are impossible today.
2. **`components/mega-nav.html` is a full standalone *preview* document** — 5,310 lines with its own `<!DOCTYPE>`, `<head>`, fonts, a `preview-note`/`preview-hero`, and the **wrong palette** (emerald `#1B5E5A` / gold `#E3A63C`, not T5 jade). It was never meant to be the production partial.
3. **6,676 pages** depend on this mount (≈6,400 generator-built `/dental/**` pages + the hand-maintained hubs).

The real top-level links DO exist inside the component, so the fix is delivery, not authoring:

| Label | href | Sitelink role |
|---|---|---|
| Find a Plan | `/compare-ppo-dental-plans/` | main hub (this is the page we just hardened) |
| Benefit Maxing | `/dental-treatment-cost-estimator/` | tool |
| Capy Rewards | `/covercapy-join/` | program |
| For Dentists | `/dentist-portal/` | B2B |
| Find a dentist (CTA) | `/find-my-dentist/` | core action |

---

## The fix (three moves)

### Move 1 — Author ONE production nav partial, server-rendered, in T5 jade
Extract just the `<nav>` fragment (no `<!DOCTYPE>`, no `<head>`, no preview scaffolding) into `components/nav-static.html`, retokened to T5 jade. It must contain **real `<a href>`** for every sitelink candidate, including the dropdown destinations (carriers, Delta hub, glossary) so they are crawlable even before JS runs. A ready version ships alongside this doc: **`components/nav-static.html`** (mirrors the approved `header-prototype.html` pattern — disclosure dropdowns, gold accents, cream active pill, no arrows/dashes).

The sitelink-candidate set to expose as static links (from `12-MAIN-HUB-PLAN` H10):
**Compare PPO Plans · Find a Dentist · Plans by Carrier (→ ppo-plans hub + the 6 plan pages + Delta hub) · PPO Glossary · Benefit Maxing · For Dentists.**

### Move 2 — Bake the partial into every page (two page classes)

**A. Generator pages (~6,400, `/dental/**`).** In `seo-build/generate-plans.js`, change `pageShell()` so it emits the static nav HTML inline where `cc-nav-mount` currently sits (same for the footer). Then, on the **Mac, from repo root**:
```bash
cd "<repo root>"
node seo-build/generate-plans.js        # full rebuild, ~8 min
git add -A && git commit -m "feat: server-render universal nav/footer for sitelinks"
git push                                 # Vercel auto-deploys
```

**B. Hand-maintained pages.** Replace `<div id="cc-nav-mount"></div>` with the contents of `components/nav-static.html` (and the footer mount with the static footer) in each of:
- `compare-ppo-dental-plans.html`
- `find-my-dentist.html`
- `index.html`
- `compare-ppo-dental-plans` carrier pages: `dental-insurance/ppo-plans/index.html` + `aetna-dental-direct/`, `ameritas-primestar/`, `guardian-premier-ppo/`, `humana-extend-5000/`, `mutual-of-omaha-dental/`, `uhc-primary-dental/`
- Delta hub: `dental-insurance/ppo-plans/delta-dental/` + `premium/ compare/ over-65/ uc-students/`

### Move 3 — Demote `mega-nav.js` to an enhancement layer
The script keeps the interactive behavior (mega dropdowns, mobile drawer, ZIP Platinum lookup) but **binds to the static DOM that is already in the page** instead of fetching+injecting it. Delete the `fetch('components/mega-nav.html')` loader. If JS fails, the page still has a full, navigable, crawlable nav. Same pattern for `footer.js`.

---

## Companion fixes to land in the same pass (cheap, compounding)
- **Canonical host war:** 301 every variant (`/dental-insurance/ppo-plans/`, legacy `.html`, non-`www`) into one canonical `https://www.covercapy.com/…`. Sitelinks won't form while three URLs claim the hub.
- **Trailing-slash consistency:** the component links use `/compare-ppo-dental-plans.html`; the canonical is `/compare-ppo-dental-plans/`. Pick the slash form everywhere (matches what's on disk) and 301 the `.html` forms.
- **Footer** gets the identical static treatment (`cc-footer-mount`).
- **Strip the preview scaffolding** (`preview-note`, `preview-hero`, standalone `<head>`) so the partial is a pure fragment.

---

## Validation (before sitemap resubmit)
1. **Raw-HTML crawl test** — `curl -s <url> | grep -c '<a '` on a sample of each page type; assert the nav link count meets the floors in `12-MAIN-HUB-PLAN` (plan page ≥17, hub ≥33, live-compare ≥51). The nav alone should add the 6–8 candidate links to every page's raw HTML.
2. **`link-graph-check`** — the build-time checker (orphans, reciprocity, dead links, dup titles) as a CI blocker.
3. **Render parity** — confirm JS-enhanced nav matches the static DOM (no layout shift, dropdowns still open).
4. **Search Console** — resubmit `sitemap-dental.xml`; watch for the hierarchy to be re-learned.

---

## Rollout order & rollback
1. Author `components/nav-static.html` (T5 jade) + static footer fragment. ✅ shipped with this doc.
2. Patch the ~20 hand-maintained pages (fast, reversible per-file).
3. Patch `pageShell()` in the generator; rebuild `/dental/**` on the Mac; commit `dental/`.
4. Demote `mega-nav.js`/`footer.js` to enhancement; delete the fetch-injection.
5. 301 canonical host + slash form.
6. Validate, then resubmit the sitemap.

**Rollback:** keep `mega-nav.js`'s injection path behind a one-line flag for the first deploy; if anything regresses, re-enable injection while the static partial is corrected. The static nav is additive, so worst case is duplicate nav (visible), not a broken page.

---

## Why this is the highest-leverage remaining task
Everything we did on `compare-ppo-dental-plans.html` (crawlable carrier links, static facts table, price-free schema, short glossary) raises that one page. The nav is the multiplier: it puts the 6–8 hub links into the raw HTML of **all 6,676 pages at once**, which is the actual mechanism by which Google decides a site is structured enough to deserve sitelinks. Do this and the branch architecture we built finally becomes legible to the crawler everywhere.
