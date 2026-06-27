# NAV1 — User Journey Flows (compare-ppo-dental-plans.html)

Page navigation mapper memo. All references grounded in real lines of
`/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`.
ANALYZE / SPEC only. No code changed.

---

## 1. The sticky console (audit)

Lines 894-967. Structure left to right:

- `theme-switch` (Gold / Jade) at line 898. Confirmed brand-less, sits hard left.
- Three dropdown buttons: **Plans** (903-926), **Insurance terms** (927-943),
  **Explore** (944-956).
- `toc-links` section anchors (957-964): Match a plan, Compare, By feature,
  By treatment, By situation, FAQ.
- `toc-cta` Find a dentist button (965) pinned right via `margin-left:auto` (156).

Dropdown behavior (2026-2052): click toggles, and on hover-capable devices
`mouseenter` opens, `mouseleave` arms a **450ms close timeout** (2039, 2050).
The Delta fly-out (914-922) shares the same 450ms grace (2050). Confirmed as
specced. ESC and outside-click close all (2042-2043).

Dropdown destinations are all OFF-PAGE links except `Compare plans side by side`
(924, `#compare`):
- Plans menu -> 7 carrier plan pages + Delta hub fly-out + `#compare`.
- Insurance terms -> 10 glossary URLs + all-terms index (931-941).
- Explore -> estimator, all-carriers, 4 situation pages (948-954).

So the console mixes two link classes with no visual distinction: in-page
section jumps (`toc-links`, plus the lone `#compare` in Plans) and outbound
SEO-page navigation (everything in the dropdowns). A first-time visitor cannot
tell which clicks scroll vs which leave the page.

---

## 2. Journey A — problem-first visitor (cracked tooth)

Intended path: land -> Smart Match -> plan -> find dentist.

- Hero / Smart Match `#match` (970-1003). Controls: goal grid, timeline,
  budget slider. Output `#verdict` (999) renders two `fitCard`s (1352).
- A cracked-tooth visitor maps to the PROBLEMS "Cracked tooth or in pain"
  entry (2073, emergency, plan ameritas). But that PROBLEMS array drives the
  separate problem-first hero logic, NOT the Smart Match goal grid (GOALS).
  The Smart Match `#match` is what is actually visible at top; its goal tiles
  are built from GOALS (1394), so the cracked-tooth shopper has to self-map
  "pain" onto a clinical goal like "Crowns / RCT (major)". Friction at entry:
  no "in pain / urgent" tile in the visible matcher.
- fitCard CTAs (1390): primary "Open plan brief" (opens modal, 1353/1445),
  secondary "Find {carrier} dentists" -> `carrierHubUrl` =
  `/find-my-dentist?carrier=...` (1438). Plan brief modal (1445-1463) then
  offers Activate -> enroll interstitial (1467), View plan, and Find dentists.

Dead-end / gap: the verdict card's PRIMARY action is "Open plan brief," a modal,
not "Activate" or "Find a dentist." For an urgent visitor the strongest next
step (book care) is buried one modal deep. The fastest real action,
Find a dentist, is the secondary ghost button.

Empty state (1350): if no live plan covers the goal, the card says try another
goal or "check the gathering-reviews plan in Compare" — text only, no link to
`#compare`. Dead-end copy.

---

## 3. Journey B — comparison shopper

Intended path: matrix -> plan page -> activate.

- `#compare` (1010) holds the compare matrix (`#compareMatrix`, 1027), the sort
  bar (1030), and the plan grid (`#planGrid`, 1040).
- Matrix seeds with `uhc` pre-selected (1487), up to 3 plans (1530), empty slots
  carry a select dropdown + "tap Compare on any plan below" hint (1596-1598).
- Each matrix plan column: Activate -> enroll interstitial (1594), plan name
  links to `planUrl` review page (1591).
- planCard (1490-1507): Activate, Plan brief, Compare toggle, plus footer links
  "View the full ... review" (planUrl) and "Find {carrier} dentists"
  (carrierHubUrl). Well wired.

Gaps:
- The matrix has NO "Find a dentist" CTA inside it (1588-1602). After narrowing
  to a finalist in the matrix, the only forward actions are Activate (leaves to
  carrier) or the plan-name review link. The shopper who wants to confirm a
  dentist accepts the plan has to drop down to the plan card or the feature
  table. The two comparison surfaces are inconsistent.
- Feature table row (1675) DOES carry a "Find dentists" button per plan, so the
  three comparison surfaces (matrix, card grid, feature table) each expose a
  different CTA set. Inconsistent next-step wiring across equivalent surfaces.

---

## 4. Journey C — researcher

Intended path: glossary / treatment -> plan.

- "Insurance terms" dropdown (927-943) sends researchers OFF-PAGE to glossary
  URLs. The in-page glossary lives in `#terms` (1142, dictGrid 1969) and
  `#glossary-shelf` (1230) but the console "Insurance terms" menu does NOT link
  to the on-page `#terms` section — it only links out. A researcher who wants
  to stay on the hub has no console path to the in-page glossary.
- Inline `cc-tip` tooltips (1560) carry a `data-tip-link` to
  `/dental-insurance-glossary/#term-...`, again outbound.
- Treatment grid `#treatment` (1105, treatGrid 1957): each minicard is a link to
  `t[2]` (an outbound page). Good forward path but leaves the hub.
- Situation grid `#situation` (1115, situationGrid 1966): clicking a card calls
  `applySituation` (1967) which re-runs the Smart Match and scrolls the user
  BACK UP to `#match`. This is a loop-back, not a forward step — useful, but the
  researcher who clicked "By situation" expecting situation pages instead gets
  bounced to the top matcher. The Explore dropdown's "By situation" items
  (951-954) DO go to dedicated situation pages, so the same label means two
  different destinations.

---

## 5. Dead-ends, redundant paths, missing CTAs

Dead-ends / weak ends:
- Verdict empty state (1350): no clickable link to Compare.
- Compare matrix (1588-1602): no Find-a-dentist CTA; finalist has no
  confirm-acceptance path within the surface.
- `#dentists` section results (1793-1795) use `onclick="return false"` stub
  links for address/phone/source and a `/dentists/{id}/` profile path that does
  not match the canonical `/dental/.../` URL architecture in CLAUDE.md. Profile
  links here are effectively dead or stale.

Redundant / duplicated paths:
- "Find {carrier} dentists" appears in fitCard (1390), plan brief modal (1461),
  planCard footer (1507), and feature table (1675) — four entry points to the
  same `/find-my-dentist?carrier=` target. Consistent target, good, but the
  matrix is the one surface that omits it.
- Three "browse by" navigations exist: console `toc-links` (957), the hub-branches
  nav under H1 (977-983), and the Explore dropdown. `toc-links` and hub-branches
  point to the same anchors with different labels (see section 6).

Missing CTAs at decision points:
- Smart Match verdict: no direct "Activate" on the closest-fit card.
- Compare matrix finalist: no "Find a dentist" / no "confirm my dentist."
- End of FAQ (`#faq`, 1253): no closing CTA back to Match or Find a dentist
  (terminal section before footer).

---

## 6. Recommended journey wiring (spec)

1. **Add a Find-a-dentist CTA to each matrix plan column** so the matrix matches
   the card grid and feature table. Target the existing `carrierHubUrl`.
2. **Promote a forward action on the verdict card.** Make the closest-fit card's
   primary button "Find {carrier} dentists" (the true next step) or add a third
   "Activate" button; demote "Open plan brief" to secondary. For Journey A
   urgency, surface the fastest-activation plan first.
3. **Add an urgent / in-pain goal tile** to the visible Smart Match GOALS set so
   the cracked-tooth visitor self-selects without translating pain into a
   clinical category.
4. **Make the verdict empty state a link**, not prose: "compare all eight plans"
   -> `#compare`.
5. **Disambiguate the console link classes.** Give in-page anchors (`toc-links`)
   one visual treatment and outbound dropdown links another, or add a small
   "opens a guide" affordance on dropdown items so scroll-vs-leave is legible.
6. **Resolve the "By situation" double meaning.** The console / hub-branches
   anchor scrolls to `#situation` which loops back to `#match`; the Explore
   dropdown of the same name goes to standalone pages. Rename one. Suggest the
   in-page anchor read "Match by life event" and the Explore group read
   "Situation guides."
7. **Add a path to the in-page glossary** from the "Insurance terms" console
   menu (e.g. a top "Glossary on this page" item -> `#terms`) so researchers can
   stay on the hub.
8. **Add a closing CTA after FAQ** (`#faq`) returning to Match or Find a dentist
   so the last section is not a dead-end before the footer.
9. **Fix the `#dentists` stub/stale links** (1793-1795): replace `return false`
   stubs and align profile URLs to the canonical `/dental/.../` architecture.

### Nav labels to rename for clarity
- `toc-links` "Match a plan" and hub-branches "Plan vs plan" both target
  matcher/compare anchors with different words; unify the vocabulary.
- "By feature" (`#shelf`, 960) -> "Feature table" or "Side by side"; "shelf" is
  internal jargon and the label does not tell a researcher what they get.
- "By situation" -> split as above (life-event matcher vs situation guides).
- Console "Insurance terms" -> keep, but add the in-page glossary entry.

No em-dashes used in this memo.
