# DH8 — Header Conversion & CTA Hierarchy (Compare PPO Main Hub)

> Scope: the header layer only — universal mega-nav (`#cc-nav-mount`), the sticky compact TOC
> (`.toc`), the in-hero "Browse by" branch nav (`.hub-branches`), and the dental-insurance resource
> hub strip (`.di-hub`). Goal: drive the ONE primary journey — **match → compare → enter a
> carrier/Delta → find a dentist** — without two primaries fighting for the same view.
> Theme: T5 Jade. Primary CTA = `teal-night` fill or `mint`; secondary = ghost (outline) only.
> Read: `compare-ppo-dental-plans.html` (`#match` Smart Match, `.toc`, `.hub-branches`, `.di-hub`,
> `.di-hub-dentist` "Find a dentist →"), agents `10-action-psychology.md`, `11-checkout-conversion.md`.

---

## Summary (~150 words)

The hub today scatters near-equal links across three header bands (mega-nav, sticky TOC, di-hub) with
no single dominant action, so the eye has no obvious first move. The fix is strict one-primary-per-view
discipline. The header's ONE primary action is **"Match me to a plan"**, which scrolls to / focuses
Smart Match (`#match`) — the page's paralysis-killer that collapses 8 plans to 2 in three answers. The
single secondary is **"Find a dentist"** (the money CTA, `/find-my-dentist`), styled as the lone filled
accent in the di-hub but never as a second hero primary. Everything else — Compare, By feature, FAQ,
the di-hub resource links — demotes to quiet ghost/text navigation that surfaces the hubs without
competing. Sign-in and Create account live in the mega-nav's right slot only, never gating Smart Match.
No countdowns, no scarcity, no "best selling" — urgency on insurance plans is fake by construction.

---

## CTA hierarchy — by header band (one primary per view)

Per Agent 10 §3: exactly one visually-primary CTA visible per decision-state; every primary advances
the canonical journey (match → compare → carrier/Delta → dentist). Header bands are the "landed,
pre-match" state — so the header's single primary is the entry to Smart Match.

| Band | PRIMARY (1 only — teal-night fill / mint) | SECONDARY (ghost outline) | TERTIARY (text link) |
|---|---|---|---|
| **Mega-nav** (`#cc-nav-mount`) | — *(no primary here; logo + nav only, to avoid competing with hero)* | **Find a dentist** (ghost, right slot) | nav items · **Sign in** · **Create account** (far-right) |
| **Hero / Smart Match head** | **Match me to a plan →** (scrolls to / focuses `#match` input) | **Compare all 8** (→ `#compare`) | How we choose · Skip to all plans |
| **Sticky TOC** (`.toc`) | **Match a plan** (active section gets `aria-current`) | Find a dentist (→ `/find-my-dentist`, mint text) | Compare · By feature · Why us · PPO terms · FAQ · Learn |
| **"Browse by" branches** (`.hub-branches`) | — *(all peers, intentionally flat — this is a lens picker, not a CTA)* | — | Plan vs plan · Coverage feature · Procedure · Life event · Why independent |
| **di-hub resource strip** (`.di-hub`) | — | **Find a dentist →** (`.di-hub-dentist`, the one filled pill — keep) | Overview · Compare plans · Glossary · No waiting period · Between jobs · Self-employed · Need coverage now |

### The ONE primary action — exact label & behavior
- **Label: `Match me to a plan →`** (verb + object; per Agent 10 §3 rule "action + object + honesty").
  - Not "Get started," not "Continue" — those hide the object.
  - Alt label if A/B'd: **`Find my best-fit plan`** (Agent 10/11 canonical "landed, pre-match" primary).
- **Behavior:** smooth-scroll to `#match` and move focus to the first Treatment-goal tile (`#goalGrid`).
  Zero gate, zero email — the match result is the reward for the first micro-commitment (Agent 10 §4a,
  rung 1). On screens where Smart Match is already in view, the button is suppressed (no redundant primary).
- **Why match, not "Compare all 8," is primary:** Smart Match collapses 8 → 2 and is the single biggest
  paralysis killer (Agent 10 §0a). "Compare all 8" is the analytical buyer's escape hatch, so it stays
  one tap away as the secondary — present, demoted, never the default.

### The ONE secondary — Find a dentist (the money CTA, deliberately demoted in the header)
- **Label: `Find a dentist →`** (di-hub) / **`Find in-network dentists →`** (when carrier context exists).
- It is the terminal conversion (CoverCapy is paid by offices, Agent 11 §3), but in the HEADER it is the
  *secondary* — the header's job is to start the match, not to bounce a cold visitor to dentist search
  before they have a plan/carrier in hand. Keep it the lone filled di-hub pill (`.di-hub-dentist`) so it
  reads as "the next step after you've matched," and let the in-result CTAs carry it as primary deeper
  in the funnel (Agent 10 §3 "match returned" / "comparison completed" states).

### How the sub-nav surfaces hub entries without competing
- **Sticky TOC = wayfinding, not conversion.** All TOC items are ghost/text pills at one visual weight;
  only the active section carries `aria-current="page"` (visited-state memory, Agent 10 §4b). The single
  accent allowed is the mint "Find a dentist / All dentists →" link — one quiet exception, not a second primary.
- **"Browse by" branches stay flat on purpose.** This is a *lens picker* (pick a way to look), categorize-
  before-enumerate (Agent 10 §2). Making one branch primary would imply a wrong "default" path; they are
  peers by design.
- **di-hub resource links are SEO/discovery siblings**, rendered as outline pills, with the one filled
  dentist pill as the only weight contrast. They surface "No waiting period," "Between jobs," etc. as
  entry points without ever out-shouting "Match me to a plan."
- **Carrier / Delta entry** is surfaced through the match result and `#compare`, not as a header primary —
  the header routes the buyer INTO the lens that then exposes per-carrier (and Delta PPO + Premier) tiles.

### Sign-in / Create account placement
- **Location: mega-nav far-right slot only** (`.mact .sign`). Two text-weight links: **`Sign in`** and a
  ghost **`Create account`**. Never in the hero, TOC, di-hub, or as a Smart Match gate.
- **Timing (Agent 11 §2.5): never before results, never as a gate.** Account creation has real utility
  only at verification / saved comparisons, so the header link is a quiet door for returning users, not a
  funnel step. Default opt-ins OFF; never pre-checked.
- On mobile both collapse into the mega-nav drawer (matches existing `.mnav,.mact .sign{display:none}` rule).

---

## Ethical rules (header-specific, enforced)

1. **No fake urgency anywhere in the header** — no countdowns, "ends today," "X spots left," or
   "only 2 plans left." Insurance plans do not expire; any urgency would be fabricated (Agent 10 §7).
2. **No invented popularity** — no "Best selling" / "Most popular" badges on nav or pills (Agent 11 §2.8).
   At most one evidence-based "Most fitting" ribbon, and that lives in the match RESULT, not the header.
3. **One primary per view** — the header must never show two filled CTAs in the same viewport. "Match me
   to a plan" (hero) and "Find a dentist" (di-hub) are separated by scroll; if both could render together,
   demote the di-hub pill to ghost in that breakpoint.
4. **No off-site redirect from the header** — carrier/enrollment handoff is the one deliberate, disclosed,
   off-site click and it happens deep in the funnel through the concierge interstitial, never from a nav link.
5. **Honest, object-bearing labels** — verb + object + qualifier ("Find a dentist — free" where the free
   claim is true). No "Get started" mystery-meat buttons.
6. **No member-ID capture, no consent pre-check** in any header surface.

---

## Top 3 recommendations

1. **Install one header primary: `Match me to a plan →` that scrolls to / focuses `#match`.** It makes
   the first move obvious, routes everyone through the 8→2 paralysis-killer, and is the canonical
   "landed, pre-match" primary. Suppress it when Smart Match is already in view so no two primaries ever
   compete (Agent 10 §3, acceptance criterion 4).
2. **Demote everything else to a single weight: ghost/text nav, with exactly two accent exceptions —**
   the secondary **`Compare all 8`** in the hero and the one filled **`Find a dentist →`** pill in the
   di-hub. Flatten the TOC and "Browse by" branches to peers; let `aria-current` carry wayfinding. This
   surfaces the hubs without any of them out-shouting the match entry.
3. **Park Sign in / Create account in the mega-nav right slot, never as a gate.** Results, Smart Match,
   and compare stay 100% ungated; account creation is offered only where it has utility (verification /
   saved comparisons). Keep the header free of any countdown, scarcity, or "best selling" device —
   on insurance plans every such cue is fake by construction.
