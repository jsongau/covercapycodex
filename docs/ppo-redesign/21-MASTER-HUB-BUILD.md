# Master Hub Build — Compare PPO Dental Plans → the real health-insurance hub

> Synthesis of the 20 hub20 agents (`agents/hub20/01–20`). June 2026.
> Convert the LIVE editorial hub into the health-insurance presentation system from the ZIP.
> This is a SKIN + AFFORDANCE conversion, not a rebuild: the matrix, tray, Smart Match, valueFrame,
> tooltips, and crawlable blocks already exist on the live page.

## Decisions (locked)

1. **Base file = the LIVE `compare-ppo-dental-plans.html`** (agent 19). The new upload is ~95% identical but DROPPED four crawl assets (carrier branch grid, glossary shelf, static facts table, crawlable hub nav). Keep LIVE; port only one crisper Smart Match line from NEW.
2. **Palette = ZIP health-tech, Inter-only** (agents 01, 02). Single teal accent + coverage triad. Drop the gold/jade toggle and all Fraunces serif. Body ≠ link ≠ CTA enforced by splitting `--link` off the CTA ramp.
3. **Premiums FROZEN** to the live data island; display-only, always prefixed `From` + tagged `illustrative`. No schema prices (already stripped).
4. **No em-dashes.** (NEW's H1 has one — do not port it.)

## Final tokens (`:root`, agent 02)
```
--bg:#F6F8FA; --surface:#FFFFFF; --surface-2:#F1F5F8;
--ink:#0F1B25 (headings); --ink-2:#33444F (body); --ink-3:#5E707B; --ink-faint:#94A4AE;
--line:#DCE4EA; --line-soft:#EAEFF3;
--cta:#0E8C8B; --cta-hover:#0A6E6D; --link:#0A6E6D;
--covered:#0F9D6E / --covered-tint:#E4F6EE / --covered-ink:#0A5D43;
--partial:#B26A00 / --partial-tint:#FBEFD9 / --partial-ink:#7A4A00;
--notcov:#64748B / --notcov-tint:#EEF1F4 / --notcov-ink:#475569;
--font:"Inter"; radii --r-xs..pill; shadows --sh-1..3; spacing --sp-1..7
```
Rule: override `a{color:var(--link)}` so links never share the CTA color. Coverage triad is the load-bearing health-insurance signal: green=full, amber=partial coinsurance, grey=not covered.

## The coverage cell — one renderer, three surfaces (agents 06, 08)
`covCell(pays)` derives state: `100%`→covered, `Not covered`/null→none, else→partial. Emits icon + color + `% · wait` text. Same function renders the card mini-grid, the detail grid, and the comparison matrix. Author numbers once (the live data island). Y1/Later toggle flips Humana/MoO/Ameritas step-ups.

## Build sequence (agent 20, ordered)
1. **Design tokens + fonts** — redefine `:root` to health-tech, swap font link to Inter, neutralize Fraunces on data (keep only H1/H2), remap `--mint`→teal. *(biggest single visual shift)*
2. **Canonical spec object + shared `covCell`** — reconcile field names (premium=monthly, coverage=treatments, etc., agent 06); one renderer.
3. **Plan card → spec card** (agent 07) — fixed 5-cell coverage strip (Preventive·Basic·Major·Implants·Ortho, all five always shown), prominent `From $X/mo illustrative`, at-a-glance strip (max/deductible/coverage starts), plan-shape pill, single `recommended` (fix uhc+guardian double-flag), keep +Compare + View/Verify.
4. **Comparison matrix** (agents 03, 08) — four row bands (Cost/Limits/Coverage/Practical), sticky header + sticky first column, best-in-row ◆ on unambiguous rows only + "best spec ≠ best plan" footnote, `% · wait` cells, raise cap 3→4, difference-only toggle, per-column CTA row, one tinted ★ recommended column.
5. **Compare tray** (agent 04) — sticky bar, +Compare checkboxes, chips, `Compare (N)` opens matrix pre-filled; in-memory (no localStorage in build).
6. **Mobile matrix** (agent 05) — Pattern A swipe-snap columns (2-3 plans) / Pattern B stacked accordion (4); never squish, never hide Major/Implants/Ortho.
7. **By-treatment** (agent 11) + **by-situation** (agent 12) — replace editorial prose with coverage-grid ranking rows + situation→plan cards (frozen data).
8. **Lead answer block** (agent 10) — server-rendered direct-answer + 4-cell key-fact strip for AI Overviews.
9. **Verification cleanup** (agent 20 #5) — collapse the 3 competing trust signals (per-card stamp, "Sarah Chen" bar, matrix "Recommended" badge) into one quiet `Last verified Jun 2026 · illustrative · view sources` line + source drawer. NOTE: the "Sarah Chen" reviewer byline is fabricated — replace with a real/neutral reviewer entity.
10. **SEO head** (agent 14) — title→57 chars `Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy`; meta→138 chars; add og:locale + image dims; deploy og-hub.png to /og/.
11. **Schema** (agent 16) — server-render the @graph in <head>; replace remaining Offer/Product types with `Thing`/`ItemList`; add WebPage datePublished/dateModified/author+reviewer; canonical parity (trailing-slash decision).
12. **Internal links** (agent 15) — add the missing treatment-guide layer + 4 in-prose glossary links; do NOT ship `/compare/is-{carrier}-good/` (404, not built); trailing-slash `find-my-dentist`.

## Flags the user/config owns
- **Canonical/slash war** (agent 17): `vercel.json` has `trailingSlash:false`, which fights every trailing-slash canonical on the page. Confirm slash policy before finalizing canonical + internal-link slashes. Do NOT adopt the ZIP's nested carrier slugs or run its `plan_page` SQL (points at non-existent routes).
- **og-hub.png** must be deployed to `/og/og-hub.png` before publish.
- **Delta** legitimately keeps its nested sub-cluster (`delta-dental/` + children); feature it as the flagship carrier branch (agent 18): PRIMARY "See the PPO Premium plan", SECONDARY "Explore the Delta hub", routing crawl equity inward.
- **bestSelling double-flag** (uhc + guardian) violates one-recommended rule; pick one.

## Preserve (do not regress)
Smart Match lens · valueFrame() cash-vs-premium · one-match + honest-backup · 3-layer glossary tooltips · static carrier branch grid (#explore-carriers) · static glossary shelf (#glossary-shelf) · static facts table (.cc-static-cmp) · crawlable hub nav/trust under H1 · price-free schema.
