# Hub Anatomy: Definitive Ordered Section List

Agent hub20 / 09. Real PPO compare hub at `/compare-ppo-dental-plans`. Goal: make the LIVE hub the REAL hub in the health-insurance (ZIP) visual style. Premiums FROZEN. No em-dashes.

## Sources read (grounded)

- LIVE: `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`
  - Section order (the `<section id>` ids, top to bottom): `match` (L876), `benefits` (L915), `compare` (L936), `shelf` (L989), `dentists` (L1004), `treatment` (L1031), `situation` (L1041), `vision` (L1051), `terms` (L1068), `playbook` (L1078), `learn` (L1091), `explore-carriers` / `.cc-branch` (L1149), `glossary-shelf` / `.cc-gloss-mod` (L1173), `faq` (L1196).
  - Trust strip: `.hub-trust` (L127 CSS, L882 markup) "Independent, no paid placement, reviewed by dental billing specialists, updated June 2026."
  - Smart Match: `#match` section (L875), `.smart-match` CSS (L122). PRESERVE.
  - valueFrame cash-vs-premium: JS fn `valueFrame(p)` (L1308), invoked in card render `valueFrame(p)` (L1330). PRESERVE.
  - 3-layer glossary tooltips: `.cc-tooltip` with `-title` / `-body` / `-why` ("Why it matters") + `-link` (L227 to L239). PRESERVE.
  - Delta featured in matrix (L972) and in `.cc-branch-feat` featured carrier card (L1122). KEEP.
- NEW ZIP compare: `_zip-21jun/compare-ppo-NEW.html` — identical id order to live MINUS `explore-carriers` and `glossary-shelf` (ends at `faq` L1100). So the carrier branch grid and glossary shelf are LIVE-only modules to carry forward.
- ZIP hub (health-tech reference): `_zip-21jun/ppo/index.html` — `.module` sections: `what` (L366), `compare` (L383), `carriers` (L559), `plans` (L609), `by-treatment` (L732), `by-timing` (L750), `by-situation` (L762), `methodology` (L777), `faq` (L796). This is the styling target (clean health-insurance modules, lead-answer "what" block, carrier grid before plans).

## Definitive ordered section list (real hub)

| # | Section | id | Tag | Notes |
|---|---------|-----|-----|-------|
| 1 | Trust strip | `.hub-trust` | KEEP from live + RESTYLE health-tech | Independent / no paid placement / reviewed / updated June 2026. Promote to top band. |
| 2 | Lead answer block | `what` | ADD (from ZIP `#what`) | Direct "what is a PPO dental plan / what you get" answer block. Live has no dedicated lead-answer; ZIP hub leads with it. RESTYLE to live tokens. |
| 3 | Smart Match lens | `match` | KEEP from live, PRESERVE module | `.smart-match` interactive lens. Do not rebuild; restyle chrome only. |
| 4 | By coverage feature | `benefits` | KEEP from live + RESTYLE | Annual max / waiting periods / coverage tiers as feature lens. |
| 5 | Comparison matrix + compare tray | `compare` | KEEP from live + RESTYLE health-tech | The 8-plan side-by-side table, Delta featured row (L972). Add ZIP-style compare tray affordance. Premiums FROZEN. |
| 6 | Plan cards grid | `shelf` | KEEP from live, PRESERVE valueFrame | Cards render `valueFrame(p)` cash-vs-premium (L1308/L1330). Preserve logic; restyle card shell to ZIP `#plans`. |
| 7 | By treatment | `treatment` | KEEP from live + RESTYLE | Maps to ZIP `#by-treatment`. |
| 8 | By situation | `situation` | KEEP from live + RESTYLE | Maps to ZIP `#by-situation`. (ZIP also has `by-timing`; fold timing into situation/benefits.) |
| 9 | Carrier branch grid (Delta featured) | `explore-carriers` | KEEP from live (LIVE-only) + RESTYLE | `.cc-branch` with `.cc-branch-feat` Delta featured card (L1122/L1149). Not in ZIP compare; mirror ZIP hub `#carriers` styling. |
| 10 | Short glossary shelf | `glossary-shelf` | KEEP from live (LIVE-only), PRESERVE tooltips | `.cc-gloss-mod` (L1173) + the 3-layer `.cc-tooltip` (title/body/why-it-matters/link). Preserve tooltip system. |
| 11 | Buyer playbook + methodology | `playbook` + `learn` / `methodology` | KEEP from live + RESTYLE | Merge live `playbook` (L1078) and `learn` (L1091) into one buyer-playbook + methodology block matching ZIP `#methodology`. |
| 12 | Find-a-dentist handoff | `dentists` | KEEP from live + RESTYLE | Live places `dentists` early (L1004); MOVE to post-decision handoff position near the end. Links to `/find-my-dentist`. |
| 13 | Vision add-on | `vision` | KEEP from live + RESTYLE | Optional vision/add-on lens (L1051). Keep but demote below dentist handoff. |
| 14 | FAQ | `faq` | KEEP from live + RESTYLE | Closing FAQ / "How we choose plans" anchor (L1196). |

## Modules that MUST be PRESERVED (do not rebuild)

1. Smart Match lens (`#match` / `.smart-match`, L875/L122) — interactive matching logic.
2. valueFrame cash-vs-premium (`valueFrame(p)`, L1308; called L1330 in card render) — the cash-vs-premium framing inside plan cards.
3. 3-layer glossary tooltips (`.cc-tooltip` with `-title` / `-body` / `-why "Why it matters"` / `-link`, L227 to L239) and the `glossary-shelf` module they feed.
4. Delta featured treatment: matrix Delta row (L972) and `.cc-branch-feat` featured carrier card (L1122).

## Constraints

- Premiums FROZEN: do not alter any price values in the matrix or cards.
- No em-dashes in any copy. Use commas, colons, or rewrite.
- Restyle to health-tech (ZIP) chrome but keep CSS tokens; do not invent color values.
- ANALYZE / SPEC only here. No prototypes built in this pass.
