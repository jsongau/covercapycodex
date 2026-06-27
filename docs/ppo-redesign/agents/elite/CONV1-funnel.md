# CONV1 — Conversion Specialist Memo: CTA Strategy, Funnel, and Friction
### Page: compare-ppo-dental-plans.html | Role: Conversion Specialist 1 | June 2026

All findings are grounded in the live file. Premiums are frozen and untouched. No em-dashes in any recommended copy. No fake urgency or countdowns proposed.

---

## 1. THE CORE CONVERSION (anchor everything to this)

CoverCapy is paid by in-network dental offices. The revenue event is therefore **"patient connects to a verified in-network office"**, not "patient enrolls in a plan." Plan enrollment (`Activate`) sends the buyer **off-site to the carrier** (`CARRIER_URLS`, line 1424) and earns CoverCapy nothing directly. So the page currently spends its loudest, most-repeated primary CTA (`Activate`, green, appears 6+ times) on the action that does NOT pay, and treats the action that DOES pay (`Find a dentist` / `Book` / `Verify insurance acceptance`) as secondary or ghost styling.

**This is the single biggest conversion problem on the page.** The visual CTA hierarchy is inverted relative to the business model.

---

## 2. FULL CTA INVENTORY (grounded by line)

### Persistent / sticky
- **Sticky TOC console** — `Find a dentist` link to `/find-my-dentist` (line 965). Good: the money CTA is persistent. But it is small (`.toc-cta`, 13px pill) and competes with three dropdown menus (Plans, Insurance terms, Explore) plus a theme switch and six section anchors. It reads as navigation, not as the primary action.

### Smart Match (hero, `#match`, lines 970-1003)
- No CTA in the input panel itself. The hero's whole job is to produce a verdict. The verdict's `fitCard` (line 1390) emits two CTAs:
  - PRIMARY (green): **`Open plan brief →`** (opens modal, line 1390)
  - SECONDARY (ghost): **`Find {carrier} dentists →`** → `carrierHubUrl` → `/find-my-dentist?carrier=...` (line 1438)
- Problem: the hero's single strongest moment (a personalized match) makes "open a modal about the plan" the primary act and the revenue act (find dentists) the ghost. The match result should drive toward the dentist, not a brief.

### Compare matrix + plan cards (`#compare`, lines 1490-1510)
- Live plan card: PRIMARY green **`Activate`** (off-site, line 1505), then a row with ghost **`Plan brief`** + **`Compare`** toggle (line 1506).
- "Gathering reviews" card: ghost **`Notify me when it's verified`** (email capture) + Compare (line 1497).
- Compare matrix cells reuse `Activate` / `Notify me` (line 1594).
- Compare toggle: `Compare` / `Comparing` (line 1488).
- Problem: zero "find a dentist for this plan" CTA on the plan cards or in the matrix. Once a buyer picks a plan here, the only forward path is off-site Activate. The money path is missing at the exact decision point.

### By feature table (`#shelf`)
- Desktop: `Calculate` style `.ft-calc-btn` and per-row actions.
- Mobile card: **`Plan brief & activate →`** (line 1722). Again brief+activate, no dentist path.

### Find a dentist (`#dentists`, lines 1078-1100)
- **`Search dentists`** omni button (line 1088) → `find-my-dentist.html?loc=` (line 2306).
- **`Browse every dentist near you`** ghost, hidden by default (line 1097) → `find-my-dentist.html` (line 2304).
- Dentist card CTAs (line 1793-1794):
  - PRIMARY green **`Book appointment`** (opens local modal, line 1830)
  - ghost **`Call office`** → `tel:` (line 1831)
  - **`Verify insurance acceptance`** (btn-ink, line 1794) OR **`View profile`** if claimed
  - **`Visit {practice} website →`** (line 1794)
- This is the only section where the money CTA is primary. But it sits ~5 sections deep, below Match, Compare, and By feature.

### Situation / recommendation cards (lines 2095, 2176)
- **`Activate this plan`** green + **`Plan brief`** ghost. Off-site again.

### Off-page / leakage CTAs
- `Get Humana Extend` (line 1132) and the enroll interstitial (line 1467) both push to carrier sites. The interstitial captures email then opens carrier in new tab. This is the clearest leak: the "Almost there" framing celebrates sending the user away.

### Modals
- Verify modal: `Send to office` (line 1828) — this IS a conversion event but ends in `closeModal()` with no real submit wiring.
- Book modal: `Request appointment` (line 1830) — same, closeModal stub.
- Nominate/claim, Notify — all stub to closeModal.

---

## 3. FUNNEL ASSESSMENT (browse → match/compare → plan page → verify/activate → find dentist)

The intended funnel is **backwards** for CoverCapy's economics. The designed terminal state is "Activate" (off-site, unpaid). The paid terminal state (book/verify a dentist) is treated as a parallel side-quest, not the funnel's end.

Observed flow on the page:
1. Browse (hero match, sort chips) — strong.
2. Match/compare — strong tooling, but every exit CTA points to plan brief or off-site Activate.
3. Plan page / brief — modal or off-site; dead-ends or leaks.
4. Activate — **leaks off-site, unpaid.**
5. Find dentist — buried at `#dentists`, only reachable by scrolling or the small sticky link.

There is no wire connecting "I picked a plan" to "find a dentist who takes THAT plan," even though `carrierHubUrl` already exists (line 1438) and supports `?carrier=`. The plumbing is built and unused on the plan cards.

---

## 4. CTA HIERARCHY (is there one primary action per view?)

No. Most views present competing greens:
- Hero verdict: green `Open plan brief` competes with the page's true goal.
- Plan card: green `Activate` (off-site) dominates; dentist path absent.
- Dentist card: green `Book` + ink `Verify` + ghost `Call` + link `Visit website` = four CTAs of near-equal weight on one card. Decision fatigue.
- Sticky bar: `Find a dentist` is visually the weakest persistent element despite being the money action.

Green is overloaded. It marks both "go off-site to enroll" and "book a paying dentist," so the color carries no consistent meaning.

---

## 5. BUTTON COPY

- `Activate` is strong and ownable, but it is spent on the unpaid off-site action. Reassign its energy.
- `Open plan brief →` is weak intent. It is a "learn more," not a conversion verb, yet styled primary.
- `Find {carrier} dentists →` is good and specific. It should be promoted, not ghosted.
- `Verify insurance acceptance` is long and clinical. `Check if they take my plan` is warmer and shorter. No em-dash needed.
- `Browse every dentist near you` is fine but hidden (display:none default).
- `Send confirmation & continue` (interstitial, line 1479) optimizes for the leak. Reframe to keep the user.

---

## 6. TRUST / RISK-REVERSAL (what is working)

- Independent, no paid placement line (line 976) — strong, keep near every plan CTA.
- Named reviewer Sarah Chen with verified date (line 1021) — good E-E-A-T, currently only at Compare. Echo a one-line trust cue at the dentist section too.
- "We confirm acceptance before showing a verified badge" (line 1822) and the verify modal's "we'll confirm this for you" honesty (line 1828) — excellent risk reversal. This is the page's best conversion asset and it is buried in a modal. Surface it.
- Capy Diamonds reward (line 1098, 1828) — incentive to verify/nominate. Good, but currently reads as loyalty fluff, not tied to the primary action.

Gaps: no "free to you" cost framing on the dentist CTAs (the offices pay, the patient does not). No "no obligation" microcopy under Book/Verify. These are easy risk-reversal wins.

---

## 7. FRICTION POINTS

- Money CTA is 5 sections deep; first viewport sells a plan match, not a dentist.
- Activate leaks off-site with no return path and no captured dentist intent.
- Plan cards have no dentist CTA, breaking the plan to dentist handoff.
- Four co-equal CTAs per dentist card.
- Verify/Book modals are stubs (`closeModal()` with no submit) — if shipped live, this silently drops every high-intent lead.
- Compare set seeds with only `uhc` (line 1487); the empty matrix slots invite work before reward.
- Theme switch sits in the sticky bar competing for attention with the money CTA.

---

## RECOMMENDATIONS (funnel wiring, copy, add/remove)

### Rewire the funnel to end on a dentist
1. **On every plan card and matrix column, add a primary "See dentists who take this plan" CTA** using the existing `carrierHubUrl(p.key)` → `/find-my-dentist?carrier=...`. This is the missing money link and the plumbing already exists.
2. **Demote `Activate` to secondary (ghost)** on plan cards. It is the unpaid off-site action. Keep it available, stop making it the loudest button.
3. **In the hero verdict (`fitCard`), swap the hierarchy:** make `Find {carrier} dentists →` the green primary and `Open plan brief` the ghost. The match's payoff should be a dentist, not a modal.

### One primary per view
4. Reserve green exclusively for the dentist/verify path sitewide. Render off-site `Activate` as ghost/ink. This gives green a single consistent meaning: "this moves you toward an appointment."
5. On dentist cards, pick ONE primary: `Book appointment` green. Make `Verify`, `Call`, `Visit website` all ghost/text. Reduce four equal CTAs to one plus quiet options.

### Copy
6. `Verify insurance acceptance` to `Check if they take my plan`.
7. Add free-to-you microcopy under dentist primary CTAs, e.g. `Free to you. The office covers the cost.` and `No obligation, no card needed.`
8. Interstitial: reframe from `Send confirmation & continue` to lead with staying, e.g. primary `Find an in-network dentist first`, secondary text `Continue to {carrier}`. Capture intent before the leak.

### Add
9. A persistent, visually primary money CTA in the sticky bar (`Find a verified dentist`) styled above nav weight.
10. Surface the "we confirm acceptance for you, free" trust line as visible body copy in `#dentists`, not only inside a modal.
11. After Activate fires, before opening the carrier tab, prompt: `Want us to find a {carrier} dentist near you?` linking to `?carrier=` so the leak still seeds a paid path.

### Remove / quiet
12. Move the theme switch out of the sticky console so it stops competing with the money CTA.
13. Wire the Verify/Book/Nominate modal submits to a real endpoint before launch; today they `closeModal()` and drop the lead. A working submit is the actual conversion.
14. Consider collapsing one of the three header dropdowns to reduce the navigation noise around the sticky `Find a dentist` CTA.

### Guardrails honored
- Premiums untouched and frozen.
- No countdowns, no fake scarcity, no urgency timers proposed.
- No em-dashes in any recommended copy.
