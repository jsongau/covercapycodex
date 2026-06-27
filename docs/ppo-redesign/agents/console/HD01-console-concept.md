# HD01 — Plan Control Console: Concept and Framing Memo

> Agent HD01 of the header cluster. ANALYZE / SPEC only, no prototype.
> Grounds the other 9 header agents. June 2026.
> Base file: `compare-ppo-dental-plans.html`. Master spec: `docs/ppo-redesign/21-MASTER-HUB-BUILD.md`.

---

## 1. The concept: from passive table of contents to plan control console

The current sticky bar (`.toc`, line 859) is a passive table of contents. It only does three things: shows a brand wordmark, scroll-spies eight in-page anchors, and offers one Find-a-dentist link. It does not know which plans exist, which plans the user is comparing, or how the list is sorted. Every act of real control lives lower on the page, scattered across the matrix, the sort chips (line 941) and the compare tray.

A control console flips this. The header becomes the one persistent surface from which a visitor can reach any plan, branch into the Delta hub, change the sort and filter of the live list, see and act on the compare selection, and hold the page theme, all without scrolling back to find a buried control. The master build calls the page a "presentation system" with an existing matrix, tray, Smart Match and tooltips (21-MASTER lines 5 to 6). The console is the cockpit that drives that system. The bar stops describing the page and starts operating it.

Design rule from the master build still binds the console: Inter-only health-tech palette, single teal accent, body color separate from link color separate from CTA color (21-MASTER lines 11 and 26). The gold/jade serif theme is slated to be dropped (21-MASTER line 11), so any theme toggle in the console is a v2 question, not a v1 default. No em-dashes anywhere.

---

## 2. Audit of the current sticky sub-menu (`.toc`, ~line 854)

Markup, lines 858 to 878:

- `.toc` wrapper, `position:sticky; top:0; z-index:60`, frosted white background, bottom hairline (CSS line 118).
- `.toc-prog #tocProg` (line 860): a 2px scroll-progress bar driven by a scroll listener (line 1929), width set from `scrollY / scrollHeight`.
- `.toc-brand` (line 862): hamburger glyph in a green chip plus the wordmark "PPO Plan Hub", links to `/compare-ppo-dental-plans/`.
- `.toc-links #tocLinks` (lines 866 to 875): eight anchor links, horizontally scrollable, scrollbar hidden.
- `.toc-cta` (line 876): one pill, "Find a dentist", to `/find-my-dentist` (note: no trailing slash; 21-MASTER line 43 flags the slash policy).

Behavior, `scrollspy()` (lines 1923 to 1930): an IntersectionObserver toggles `.on` on the active section link; the progress bar updates on scroll. There is no plan awareness, no filter state, no compare state, no theme control in the bar.

### The eight anchors it targets (all confirmed present)

| Link (line) | Anchor | Section (line) | Status |
|---|---|---|---|
| Match a plan (867) | `#match` | Smart Match (881) | live |
| Compare plans (868) | `#compare` | Compare + sort + matrix (921) | live |
| By feature (869) | `#shelf` | Plan shelf (974) | live |
| By treatment (870) | `#treatment` | By treatment (1016) | live |
| By situation (871) | `#situation` | By situation (1026) | live |
| By carrier (872) | `#explore-carriers` | Carrier branch grid (1134) | live |
| Glossary (873) | `#glossary-shelf` | Glossary shelf (1158) | live |
| FAQ (874) | `#faq` | FAQ (1181) | live |

All eight resolve. The nav is honest but inert. It points at sections; it cannot manipulate the plan data those sections render.

### What the bar does NOT expose, but the page already has

These controls and state objects exist lower in the page and are candidates to surface in the console:

- **Plan list.** Eight named plans with their own pages, all under `/dental-insurance/ppo-plans/{slug}/`, already hyperlinked in the static facts table (lines 957 to 963), the carrier branch grid (lines 1146 to 1151) and the footer plan list builder (line 1899). A canonical, reusable list exists.
- **Delta branch.** Delta Dental keeps its own nested hub and is the flagship carrier branch (21-MASTER line 48). It is featured at line 1139 (`cc-branch-feat`) with a primary "PPO Premium plan" and secondary "Delta hub" route. The console should carry this branch, not bury it at line 1139.
- **Sort.** Six sort chips at line 941 (`#sortbar`): Featured, Best value, Most coverage, Lowest price, Highest max, Shortest waits. Live but only reachable inside `#compare`.
- **Compare selection.** The master build defines a sticky compare tray with checkboxes, chips and a `Compare (N)` action, cap raised 3 to 4, in-memory only (21-MASTER lines 35 to 36). This is the single most valuable piece of live state to mirror in a persistent header.
- **Theme.** The gold/jade toggle (`.theme-switch`, CSS lines 800 to 835; JS at line 1933) still exists in the file but is slated to be dropped by the master build.

---

## 3. What a real plan control console should contain, and why

In priority order. Each element earns its place by removing a scroll or surfacing hidden state.

1. **Persistent brand and home anchor.** Keep `.toc-brand` to `/compare-ppo-dental-plans/`. Anchors identity and gives a reset path. Cheap, already present.

2. **Section nav.** Keep the eight anchor links and scroll-spy. This is the wayfinding spine and it already works. The console adds control on top of it, it does not replace it.

3. **PLANS dropdown.** The highest-value new element. A single "Plans" trigger opens a panel listing all eight plans, each hyperlinked to its `/dental-insurance/ppo-plans/{slug}/` page, with a one-line spec (From $X/mo illustrative, annual max). Why: the plan pages are the money pages and today they are only reachable by scrolling to the facts table or carrier grid. A header dropdown makes every plan one click from anywhere on the page. Source the list once from the live data island so it never drifts from the cards.

4. **Delta branch.** A distinct entry, visually separated inside or beside the Plans dropdown, that routes into the Delta hub. Primary action "See the PPO Premium plan", secondary "Explore the Delta hub" (21-MASTER line 48). Why: Delta is the flagship carrier with a nested sub-cluster and deserves crawl equity and prominence the other six plans do not get. Keeping it as its own branch in the console mirrors the page's own information architecture.

5. **Quick filters and sort.** Surface the six existing sort options (line 941) plus a small set of binary filters (for example: no waiting period, covers implants, highest max). Why: sort and filter are the core "operate the list" verbs of a console. Today they sit inside `#compare`; lifting them to the header lets a visitor reshape the list from any scroll position. The console control and the in-section `#sortbar` must share one state so they never disagree.

6. **Compare selection state.** A live `Compare (N)` indicator in the console that reflects the current selection and opens the matrix pre-filled. Why: the compare tray is the page's main interactive payoff (21-MASTER lines 35 to 36). A persistent counter in the header turns a hidden in-memory array into visible, actionable state, the defining trait of a console. Cap of 4 matches the master build.

7. **Find-a-dentist entry.** Keep the existing CTA, fix the trailing slash to `/find-my-dentist/` per the slash policy flag (21-MASTER line 43). Why: this is the cross-sell from "which plan" to "which dentist" and the only off-page conversion in the bar.

8. **Theme toggle.** The gold/jade switch. Why it is contentious: the master build drops gold/jade and Fraunces in favor of Inter-only health-tech (21-MASTER line 11). A theme toggle in v1 would reintroduce the exact thing the redesign removes. It is listed here for completeness and parked in v2 pending an explicit owner decision. If a toggle ships at all it should be a neutral light/contrast control, not gold/jade.

---

## 4. Prioritization: v1 console (must-have) and v2 (nice-to-have)

### v1 — must-have (the minimum that makes the bar a console)

- Persistent brand and home anchor (already present).
- Section nav with scroll-spy (already present).
- PLANS dropdown, all eight plans hyperlinked to their plan pages, sourced from the live data island.
- Delta branch as a distinct entry routing into the Delta hub.
- Compare selection state: live `Compare (N)` that opens the matrix pre-filled, cap 4.
- Find-a-dentist CTA with corrected trailing slash.
- Keep the scroll-progress bar (`#tocProg`); it is cheap and already wired.

Rationale: v1 makes the three pieces of buried, high-value navigation and state (plan pages, Delta, compare selection) reachable from one persistent surface. Everything in v1 either already exists in the bar or already exists lower in the page; the work is surfacing and wiring, not inventing.

### v2 — nice-to-have (depth once the spine is proven)

- Quick filters and sort lifted into the header, sharing one state object with the in-section `#sortbar`.
- In-dropdown plan specs (From $X/mo illustrative, annual max, plan-shape pill) for at-a-glance scanning.
- A search or type-ahead inside the Plans dropdown for when the list grows past eight.
- Theme toggle, only if an owner decides against the master build's Inter-only direction, and only as a neutral light/contrast control, never gold/jade.

Rationale: v2 deepens control but each item carries a dependency or an open decision (shared sort state, palette policy) that should not block the v1 spine.

---

## 5. Handoff to the other header agents

- The plan list, Delta routing, sort chips and compare tray are all real and load-bearing; do not invent parallel copies, bind to the live data island and the existing `#sortbar` and tray state.
- Honor the master build palette: Inter-only, single teal accent, link color distinct from CTA color. Treat gold/jade as out unless explicitly reinstated.
- No em-dashes. Fix `/find-my-dentist` to a trailing slash pending the slash-policy decision (21-MASTER line 43).
- Keep all eight section anchors and scroll-spy intact; the console is additive over the existing wayfinding, not a replacement.
