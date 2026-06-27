# U2 — Delta PPO Premium: The Gateway-Page UX

> Agent U2 (UX). Premium (`/dental-insurance/ppo-plans/delta-dental/premium/`) is
> THE GATEWAY — the doorway into the whole Delta hub and the owner of the dentist
> finder. There is **no "PPO Basic."** Color = T5 jade scheme (find-my-dentist.html):
> teal-night `#082A30`, teal-700 `#14525B` (links), mint `#5BE0A0` (accent / text on
> dark), cream `#F6F0E6`/`#FFFDF8`. **Body text must differ from CTA color** — body in
> ink/teal-night, CTAs use mint-on-dark or dark-on-mint, links in teal-700.

---

## 0. The job of the gateway, in one line

Premium is where most users land. It must do three jobs at once, in this priority:
**(1) re-route the wrong audience** (seniors → Over 65, students → UC Students) before
they bounce, **(2) sell the one plan** (spec sheet + ortho story + waiting periods),
and **(3) hand the qualified buyer into the finder/verify/nominate tools it owns.**
Today it only does (2) and (3), and surfaces just Compare. This spec adds (1) and makes
the gateway point sideways to *every* sub-hub.

---

## 1. Entry / hero — the doorway frame

Order, top to bottom (above the fold on desktop, left column of the `.layout` grid):

| Element | Spec | State |
|---|---|---|
| **Hero tag** (eyebrow pill) | jade-tint pill: "The doorway to everything Delta · adult ortho included" — reframes the page as a hub entry, not just a plan | static |
| **H1** | `Delta Dental PPO™ Individual <em>Premium</em> Plan` — *Premium* in Fraunces italic, teal-700 | static |
| **Lede** | One sentence: most complete individual plan + 100% preventive / 50% major+implants / adult ortho / $2,000 max. Body color = ink, **not** CTA mint. | static |
| **Promise line** | "Get cover today. See your dentist when it counts." serif italic, teal-700 left border. | static |
| **3-step funnel** | 01 Know the waits · 02 Find your dentist · 03 Verify & go. Each `.step` is a soft-anchor: clicking 02 scrolls to `#dentists`, 01 to `#waiting`, 03 to the verify tab. | hover: lift + jade border |

Right column = the **spec card** (§4). On <980px the spec card reorders above the hero
body (`order:-1`) so price is the first thing on mobile.

**New: an "Is this you?" rail sits immediately below the hero**, before the AI-answer
block — so re-routing happens before the sell. See §2.

---

## 2. "Is this you?" audience-router rail  ★ NEW — the core gateway fix

Premium currently surfaces only Compare in its body. Per U1 §6.5, the gateway
under-surfaces the audience sub-hubs even though it is the page users enter on. This
rail fixes it: a single horizontal band of 3 routing cards directly under the hero.

```
┌──────────────────────────────────────────────────────────────────────┐
│  eyebrow: "Before you read on — is one of these you?"                  │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────────────────┐  │
│ │ 65 or older?   │ │ A UC student?  │ │ Buying for yourself /family │ │
│ │ Medicare may   │ │ Your UC SHIP   │ │ You're in the right place.  │ │
│ │ already give   │ │ dental is most │ │ Keep reading — this is the  │ │
│ │ you Delta via  │ │ likely Delta.  │ │ plan, the finder & verify.  │ │
│ │ SCAN.          │ │                │ │                             │ │
│ │ → Over 65 hub  │ │ → UC Students  │ │ ↓ Continue (scrolls to spec)│ │
│ └────────────────┘ └────────────────┘ └────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

**Routing targets**
- Card 1 → `/dental-insurance/ppo-plans/delta-dental/over-65/` (SCAN seniors)
- Card 2 → `/dental-insurance/ppo-plans/delta-dental/uc-students/` (UC SHIP + campus leaves)
- Card 3 → in-page scroll to `#spec` (no navigation — confirms "stay here")

**Visual / states** (reuse `.lc` link-card pattern, NOT gradients):
- Resting: `--cream-card` (`#FFFDF8`) bg, `--line` border, teal-700 "→ hub" meta link.
- Hover: lift 2px + shadow + border→line-strong; the meta link arrow nudges right 3px.
- Card 3 is visually quieter (no jade key-tag) so it reads as "default / you're fine."
- Mobile (<560px): stack to 1 column; rail stays above the fold-break so seniors/students see their off-ramp without scrolling into the spec sheet.
- `data-ev`: `gateway_route_over65`, `gateway_route_ucstudents`, `gateway_route_stay`.

This rail is intentionally placed BEFORE the AI-answer/benefits — the wrong audience is
re-routed in the first screen, the right audience self-confirms and reads on.

---

## 3. Surfacing ALL sub-hubs (not just Compare)

Two surfacing layers, redundantly, because Premium is the doorway:

1. **Unified sticky sub-nav (primary, per U1 §3 canonical set):**
   `Delta Hub | Premium Plan(active) | Compare | Find a Dentist | Over 65 | UC Students | For Dentists`
   — adds **Over 65** and **UC Students**, which Premium's current sub-nav omits. Jade
   `#5BE0A0` underline marks "Premium Plan" active. "Find a Dentist" = local `#dentists`.
2. **"Is this you?" rail (§2)** covers Over 65 + UC Students for body/scroll users.
3. **A "More in the Delta hub" footer rail** (bottom of page, above site footer): a
   `.linkgrid.four` of all sibling hubs — Delta Hub · Compare · Over 65 · UC Students —
   so a user who reads to the end still has every door. Mirrors the Hub's explore grid so
   the gateway and the hub stay in sync.

Net effect: from Premium a user can reach **every** sub-hub three ways (sub-nav, hero
rail, footer rail). No sub-hub is gateway-orphaned.

---

## 4. The spec sheet (the sticky spec card + the body benefits)

The gateway's "buy" surface = the **sticky spec card** (`.pricecard`, `id="spec"`) +
the body spec modules. This is Module #1 (spec-first plan card) intent from
MODULE-INVENTORY.

**Sticky spec card (right rail, `top:94px`):**
| Region | Content | States |
|---|---|---|
| Header (graphite/teal-night) | "Delta Dental PPO™" + "Premium tier" mint badge | — |
| Individual / Family toggle | `setPlan('ind'|'fam')` swaps price + year figure | active segment = mint fill, dark text; inactive = muted on dark |
| Price | "$73/mo · ~$877/yr · cancel anytime" — illustration, not policy | live-swaps on toggle |
| 5 feature checks | $2,000 max · adult+child ortho+implants 50% · 100% preventive no-wait · 6-mo waivable wait · no missing-tooth clause | jade checks |
| **Primary CTA** | "Enroll in this plan on Delta Dental" — mint button, dark text, opens Delta enroll (UTM stripped per house rule on display) | hover: lift + mint glow |
| **Secondary CTA** | "First, find & verify my dentist" — ghost button → `#dentists` | hover: border→ink |
| Crowns strip | "Earn 300 Capy Crowns when you activate" | static |

**Body spec modules** (the full sheet, scrollable): coverage pods (100/80/50/50) →
adult-ortho hero panel (the differentiator) → **waiting-period showcase** (`#waiting`,
day-1 vs 6-mo waivable timeline) → benefits **Benefits table** tab (Module #2 spec
matrix intent) with the `*6-mo waived with prior coverage` footnote.

The waiting-period showcase is load-bearing for the gateway's honesty positioning
("waiting periods shown up front") — keep it above the finder, never collapsed.

---

## 5. The finder handoff (the tool deck Premium owns)

Premium owns the shared tool deck (`#dentists`) other hubs deep-link into. It is a
6-tab control: **Benefits table · Find your dentist · Verify my dentist · Cost
estimator · Nominate(+Diamonds) · Disclaimers** (`showTab()`).

**Handoff choreography:**
- Hero step "02 Find your dentist", spec card secondary CTA, and "Is this you?" Card 3
  continue-scroll all land on the `#dentists` tab deck.
- **Default open tab depends on entry intent:**
  - Direct/organic land → **Benefits table** (sell first).
  - Arriving from a sibling hub deep-link `premium/#dentists` (e.g. Over 65, Compare,
    UC Students) → open **Find your dentist** tab directly (the visitor already decided;
    don't make them re-click).
  - `premium/#nominate` deep-link → open **Nominate** tab (Over 65 "find & book" funnel).
- **Finder tab** = omni-autocomplete input (ZIP / city / county / area / campus — Module #6 cc-zip intent), `data-dark` Search button, procedure chips (All · Invisalign · Ortho · General · Implants · Emergency), then `.dcard` result rows.
- **Result card** (`.dcard`): avatar · name + meta · network/spec tags · right rail with
  "View profile →" (T5) + "Verify here — free" (opens verify tab pre-filled).
- **Empty / no-match state:** the existing "Don't see your dentist? Nominate them" line
  routes to the Nominate tab — turning a dead end into a conversion. Keep this.

**Tab interactive states:** active tab = ink label + 2px jade underline; inactive =
muted; panels fade-in 0.3s. Chips: active = teal-night fill + white; resting = muted
outline; hover = ink border. Verify "Verify participation" reveals the jade-tint result
panel inline (no page nav).

---

## 6. CTA hierarchy — primary → secondary → tertiary

The gateway must not let "Enroll" and "Find a dentist" compete. Strict ranking:

| Rank | CTA | Surface | Style | Action |
|---|---|---|---|---|
| **P1** | Enroll in this plan on Delta Dental | Sticky spec card (always in view) | Mint fill, teal-night text — the one loud button | Delta enroll (new tab) |
| **P2** | First, find & verify my dentist | Spec card, hero funnel step 02 | Ghost / outline → `#dentists` | Scroll to finder deck |
| **P3** | Over 65 hub · UC Students hub | "Is this you?" rail | Quiet link-cards, teal-700 meta arrow | Lateral nav to sub-hub |
| **P3** | Verify / Nominate | Tool-deck tabs + card CTAs | Mint (verify) / ghost (nominate) inside deck | In-page tools |
| **P4** | Compare · Delta Hub | Sub-nav + footer rail | Text links | Lateral / up nav |

**Rules:**
- Exactly **one mint-filled button visible at any scroll position** = the contextually
  primary action. In the hero that's Enroll (spec card); inside the finder deck the
  primary becomes the per-card "Verify here — free."
- Body prose and links never use mint (the CTA color). Links = teal-700; body = ink.
  This satisfies the "body text must differ from CTA color" constraint everywhere.
- "Is this you?" routing is intentionally P3-quiet: it must be *findable* by the wrong
  audience but must not out-shout the buy path for the right audience.

---

## 7. Interactive elements + states (consolidated)

| Element | Trigger | States |
|---|---|---|
| Ind/Family toggle | click segment | active mint / inactive muted; price live-swaps |
| Hero funnel steps | click | hover lift+jade border; click = anchor scroll |
| "Is this you?" cards | click | resting cream / hover lift+shadow+arrow-nudge; Card 3 quieter |
| Sub-nav links | click | current = jade underline; hover muted→ink |
| Tool-deck tabs | click `showTab()` | active = ink+jade underline; panel fade-in; intent-aware default |
| Procedure chips | click `setFilter()` | active = teal-night fill; hover ink border |
| Omni autocomplete | type | dropdown opens on input; row hover = jade-tint; kbd up/down `.act` |
| Verify button | click | reveals inline jade-tint result panel |
| Cost estimator select | change `runCost()` | dark result panel updates `$you` figure live |
| Nominate form | submit | success seal panel replaces form; "Nominate another" resets |
| Footer hub rail | click | `.lc` lift+shadow → sibling hub |

---

## 8. Open items / dependencies for build

1. The "Is this you?" rail and footer hub rail are **net-new** to Premium — neither
   exists today; Premium body currently links only Compare.
2. Sub-nav must adopt U1's canonical 7-label set (adds Over 65 + UC Students). Coordinate
   with U1 so all five Delta nodes ship one sub-nav component.
3. Intent-aware default tab requires reading the inbound hash (`#dentists` vs `#nominate`)
   on load — small JS addition to `showTab()` init.
4. Strip UTM on any displayed `d.website`; Enroll deep-link keeps its campaign UTM (it's
   an outbound referral, not a displayed dentist URL).

---

## Top 3 recommendations

1. **Add the "Is this you?" router rail directly under the hero.** It is the single
   biggest gateway fix: it re-routes seniors → Over 65 and students → UC Students *before*
   they read a plan that isn't for them, and it makes the doorway surface all audience
   sub-hubs (today Premium body points only to Compare).
2. **Enforce a one-loud-button CTA hierarchy keyed to scroll position** — Enroll (mint) in
   the hero/spec card, Verify (mint) inside the finder deck — with everything else ghost or
   text-link, and body/links never wearing the CTA mint. This keeps the gateway's two big
   jobs (sell the plan, hand off to the finder) from cannibalizing each other.
3. **Make the finder handoff intent-aware:** open Benefits-table for organic landings but
   jump straight to Find-your-dentist (or Nominate) when a sibling hub deep-links into
   `premium/#dentists` / `#nominate`, so visitors who already decided aren't forced to
   re-click into the tool the gateway owns.
