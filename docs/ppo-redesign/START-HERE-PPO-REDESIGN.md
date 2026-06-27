# START HERE — CoverCapy PPO Redesign (operational brief)

_The concise brief that starts implementation. Read `05-APPROVED-DESIGN-SYSTEM.md` for the visual authority and `PLAN-DATA-RECONCILIATION.md` for the data source of truth._

### 1. Product vision
One coherent hub-and-spoke PPO product: a calm concierge **room** (warm paper, Fraunces voice) containing a precise comparison **instrument** (dense tabular spec matrix), matching each buyer's treatment + timing + budget to a plan and an in-network dentist. Independent, spec-first, trust-led.

### 2. Style direction (APPROVED)
Direction C "Warm Research Terminal." Two user-toggleable palettes: **Warm (default) + Jade**. 70% ZIP spec-first / 30% CoverCapy editorial.

### 3. Non-negotiable design rules
One token set · Fraunces=voice, Inter Tight tabular=data · the matrix as a calm dense instrument · **one quiet verification line, no per-cell badges** · green buttons (never white-on-gold) · gold as hairline accent only · one "Most fitting" plan · restrained Mr. Bara (never over data) · carrier branding = logo + one accent only · **plan facts server-rendered** · WCAG 2.2 AA.

### 4. Canonical page hierarchy
`/dental-insurance/ppo-plans/` (master hub) → `/dental-insurance/ppo-plans/{carrier}/{plan}/` (8 spokes) → carrier hubs `/dental-insurance/ppo-plans/{carrier}/` → treatment / timing / life-situation branches → glossary. The existing `/compare-ppo-dental-plans/` is the comparison interface (URL decision below).

### 5. Canonical data source
`plan-data/PLAN-DATA-RECONCILIATION.md` + the per-plan `.md` briefs. **The `.md` files are authoritative for premiums and all numbers** — render them, never invent. One `PLANS` object drives match, cards, matrix, spokes, schema, OG.

### 6. First five build tasks
1. ✅ Shared component layer — `assets/ppo/ppo-system.css` + `assets/ppo/ppo-hub.js` (done).
2. ✅ Reference hub build — `docs/ppo-redesign/hub-prototype.html` (done).
3. Wire the 8 redesign spoke pages to `ppo-system.css` (reskin warm; re-enable Fraunces; sync numbers to the `.md`).
4. Rebuild the master hub on the shared layer with server-rendered plan facts + the sticky subnav.
5. Carrier hubs + treatment/timing branches from the shared templates.

### 7. Files to edit
`docs/ppo-redesign/_redesign-package/*.html` (the 8 spokes + index + compare), then the production hub once URL is decided. Link `assets/ppo/ppo-system.css` + `ppo-hub.js`.

### 8. Files NOT to edit
`compare-ppo-dental-plans.html` plan **data** (frozen per user — premiums stay as-is). Universal mega-nav, footer, global analytics/auth. The `find-my-dentist` app logic.

### 9. Required dependencies
Self-hosted Fraunces + Inter Tight; self-hosted carrier SVGs (already in the package); the canonical `PLANS` JSON server-rendered into each page.

### 10. Acceptance gates
Per `19-QA-ACCEPTANCE-SCORECARD` (to author): data agreement across surfaces, server-rendered facts, AA contrast, one subnav + one tray max, no orphan routes, no unsupported "best" claims.

### 11. Rollback plan
Each page is static; keep the prior file as `*.bak` until the new route + redirect are verified live. No DB or global-system changes in this phase.

### 12. SEO migration cautions
URL/canonical changes need 301s from old → new and a sitemap update; preserve `/compare-ppo-dental-plans/` equity; never publish JS-only facts; MetLife stays `noindex` until verified.

### 13. Data issues that block publication
`needs-doc` items in `PLAN-DATA-RECONCILIATION.md`: Ameritas Y1/Y2 max, Guardian major %/whitening tier, MetLife (under review). Do not assert single numbers for these — render `state-specific` / "verify."

### 14. Decisions made (June 2026)
**(a) URL/canonical — DECIDED (Option B, dual, no redirect):** `/dental-insurance/ppo-plans/` = master hub + spoke-tree owner; `/compare-ppo-dental-plans/` stays as the comparison interface (preserves equity, no 301s); spokes at `/dental-insurance/ppo-plans/{carrier}/{plan}/`. **(b) Matrix header band — DECIDED: dark band** (teal-night / emerald). **(c) Palettes — DECIDED: Warm + Jade toggle.** **(d) Plan premiums — frozen to the current compare page; `.md` reconciliation is a separate, non-blocking task.**

### 15. Exact next task for the implementation agent
Build the Guardian plan spoke on `assets/ppo/ppo-system.css` with server-rendered facts (frozen values) as the spoke template, then replicate across the other 7 and the master hub.

---

**STATUS: READY TO IMPLEMENT** — style approved, shared component layer shipped (`assets/ppo/`), URL + matrix + palette decisions locked. Spoke pilot is the next build.
