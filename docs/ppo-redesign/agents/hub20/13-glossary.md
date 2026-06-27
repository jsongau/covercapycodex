# Hub 2.0 — Glossary Integration Spec

Agent: hub20 / 13-glossary
Scope: ANALYZE + SPEC only. Premiums frozen. No em-dashes. Grounded in real paths and line numbers.
Source page: `compare-ppo-dental-plans.html`
Term pages: `dental-insurance-glossary/`

---

## 1. What exists today (ground truth)

### 1a. The 3-layer inline tooltip (cc-tip)
The live page already ships a complete dotted-underline tooltip engine. It must be preserved verbatim on the hub.

- **Trigger style**: `.cc-tip` — `cursor:help`, `border-bottom:1px dotted var(--green)`, color shift on hover. CSS at `compare-ppo-dental-plans.html:227-229`, theme overrides at `:755` (gold) and `:788` (jade).
- **Data carrier**: each `.cc-tip` span holds 4 data attributes built in `tipSpan()` at `:1498`:
  - `data-tip-title` -> Layer 1 heading (the term)
  - `data-tip-body` -> Layer 2 definition
  - `data-tip-why` -> Layer 3 "why it matters"
  - `data-tip-link` -> `/dental-insurance-glossary/#term-{slug}`
- **Render engine**: the IIFE at `:2252-2290` builds one reusable `.cc-tooltip` node with title, body, why, and a "See full definition ->" link (`:2259`). It positions above the term, flips below when clipped (`:2276-2284`), supports hover on desktop and tap-to-toggle on touch (`:2285-2287`).
- **3 layers confirmed**: definition (`tipBody`) + why it matters (`tipWhy`) + full-definition link (`tipLink`). This is the exact structure the user requires. Do not collapse it.

### 1b. The TIPS dictionary + GLOSS list
- `TIPS` object at `:1471-1495` — 24 entries (23 GLOSS terms + `rating`). Each entry has `t` (title), `b` (body), `w` (why).
- `GLOSS` array at `:1496` — 22 slugs that drive the inline `#terms` dict grid (`#dictGrid` rendered at `:1907`). Note: `GLOSS` lists 22 but `TIPS` defines 24; `rating` and (see below) are extras.

### 1c. autoTip auto-linker
- `autoTip()` at `:2145-2179` walks text inside `.cred`, `#playbook`, `#learn`, `#vision` and auto-wraps the first occurrence of 12 phrases (`PATS` at `:2146-2159`) into a `.cc-tip` span, once each (`used[slug]`). All 12 slugs map to real TIPS entries and real on-disk pages.

### 1d. The short-glossary shelf module (#glossary-shelf)
- Section at `:1172-1191`, class `cc-gloss-mod`, health-tech style: eyebrow, serif H2, a `<dl class="cc-gloss-grid">` of 10 term/definition pairs, plus a "Browse every term from A to Z" link to `/dental-insurance-glossary/`.
- Shelf links use the **per-term directory** form `/dental-insurance-glossary/{slug}/` (10 links), distinct from the tooltip anchor form.

### 1e. DefinedTermSet schema
- Already emitted at `:1930`: `{"@type":"DefinedTermSet","name":"PPO dental insurance glossary","hasDefinedTerm": GLOSS.map(...)}` with name + description per term. Spec keeps this, see section 4.

---

## 2. On-disk term pages (confirmed)

Path: `dental-insurance-glossary/`. 23 per-term directories, each with `index.html`, plus a glossary hub `index.html` carrying `id="term-{slug}"` anchors for all 23 terms.

```
ada-fee, allowed-amount, annual-maximum, balance-billing, calendar-year,
cdt, coinsurance, coverage-basic, coverage-major, coverage-preventive,
day-one, deductible, effective-date, implants, in-network, missing-tooth,
out-of-pocket, plan-year, ppo, rating, vision, waiting-period, whitening
```

Total: 23 term pages + 1 hub index.

---

## 3. 1:1 mapping audit (the core ask)

| Source | Count | Resolves to real page? |
|--------|-------|------------------------|
| TIPS keys | 24 (incl. `rating`) | All 24 have an on-disk page. PASS |
| GLOSS slugs | 22 | All 22 on disk. PASS |
| Tooltip links `#term-{slug}` | per term | Hub index.html carries `id="term-{slug}"` for all 23. Anchors resolve. PASS |
| Shelf links `/{slug}/` | 10 | annual-maximum, waiting-period, deductible, in-network, coinsurance, coverage-major, missing-tooth, out-of-pocket, effective-date, balance-billing. All 10 on disk. PASS |
| autoTip PATS slugs | 12 | All 12 in TIPS and on disk. PASS |

### Orphans (tooltip term with NO on-disk page)
- **NONE.** Every TIPS key, GLOSS slug, shelf slug, and autoTip slug maps to a real directory.

### Reverse orphans (on-disk term with NO tooltip)
- `rating` is in TIPS (`:1494`) and has a page, but is **excluded from GLOSS** (`:1496`), so it never renders an inline `.cc-tip` span and never appears in the `#terms` dict grid or the DefinedTermSet. It is reachable only via direct URL. Minor: either add `rating` to GLOSS, or accept it as a standalone SEO page with no inline tooltip. Not a broken link, just an asymmetry.

### Form mismatch to flag (not an orphan, but inconsistent)
- Tooltips and the `#dictGrid` "See full definition" link to the **hub-plus-anchor** form `/dental-insurance-glossary/#term-{slug}`.
- The shelf module links to the **per-term-page** form `/dental-insurance-glossary/{slug}/`.
- Both resolve to real content, but they send users to two different page types for the same term. SPEC recommendation: standardize the tooltip "See full definition" link to the per-term page `/dental-insurance-glossary/{slug}/` (richer, indexable, lower bounce) and keep the anchor only as a same-page jump inside the hub index. Change is one line at `tipSpan()` `:1498` and one line in `autoTip()` `:2172`. Premiums untouched, copy untouched.

---

## 4. Hub 2.0 integration spec

### 4.1 Inline 3-layer tooltip (preserve verbatim)
- Port `.cc-tip` CSS (`:227-229` + theme rows `:755`, `:788`), the TIPS dict, `tipSpan()`, `autoTip()`, and the tooltip engine IIFE (`:2252-2290`) unchanged onto the hub.
- Layers stay: Layer 1 title, Layer 2 definition (`tipBody`), Layer 3 why-it-matters (`tipWhy`), plus the "See full definition ->" link.
- Keep dotted underline + `cursor:help` as the only visual affordance. No new icon, no badge.
- Keep touch tap-to-toggle behavior for mobile.

### 4.2 Short-glossary shelf (health-tech style)
- Port `#glossary-shelf` (`:1172-1191`) into the hub between the learn/playbook band and the FAQ reading room, matching its current placement order.
- Keep the `<dl>` markup (crawlable, server-rendered, no JS dependency) so the 10 definitions are indexable even with JS off.
- Keep the per-term-page links `/dental-insurance-glossary/{slug}/` and the "Browse every term from A to Z" footer link.
- Health-tech styling cues already in place: plain-English eyebrow, serif emphasis H2 ("The terms that decide your bill."), 2-column definition grid, generous line height. No gradients, no glass, no em-dashes.

### 4.3 DefinedTermSet schema
- Emit one `DefinedTermSet` JSON-LD block (as at `:1930`) driven by GLOSS so it stays in lockstep with the rendered terms.
- Each `DefinedTerm` carries `name` (TIPS.t) and `description` (TIPS.b), and SHOULD add `url: BASE_URL + '/dental-insurance-glossary/' + slug + '/'` so each defined term points at its real page (currently no url field).
- If `rating` is promoted into GLOSS, it joins the set automatically; otherwise leave it out of schema to avoid a term with no inline surface.

### 4.4 Guardrails
- No em-dashes in any tooltip body, why text, or shelf copy (current copy already compliant).
- Premiums and plan numbers are out of scope here and stay frozen.
- Do not duplicate the tooltip engine if the hub already loads it; one IIFE per page.

---

## 5. Net status
Glossary system is healthy and fully wired: 0 orphans, 23/23 term pages backed, 1 reverse-orphan (`rating`, intentional/minor), 1 link-form inconsistency to standardize. Ready to port to Hub 2.0 with the two one-line link normalizations and an optional `url` field on the schema.
