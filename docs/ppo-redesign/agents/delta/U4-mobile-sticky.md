# U4 — Delta Hub: Mobile Interaction & Sticky Navigation

> Agent U4 (UX). Spec for the MOBILE experience (≤640px primary, ≤860px fallback)
> across the Delta hub, Premium gateway, Compare, Over-65, UC-Students, and the
> ×10 campus T5 leaves. Color = T5 jade scheme (teal-night `#082A30`, teal-700
> `#14525B` links, mint `#5BE0A0`). Builds on U1's IA map and the existing live
> patterns: `find-my-dentist.html` (`.mobilebar`, `.comptray`, `.mobile-menu`)
> and `assets/ppo/ppo-system.css` (`.cc-subnav`, `.cc-tray`).

---

## 0. The problem U4 must solve (from U1)

On desktop the sub-nav simply hides on mobile and dies. Today:

- **Set A** (`.subnav`, on Hub/Premium/Compare/Over-65): 6 labels + right rail,
  `@media(max-width:1040px){.sn-links,.sn-right .lnk{display:none}}` — i.e. **on
  mobile the entire lateral nav vanishes.** A phone user on Premium has no way to
  reach Compare, Over-65, or UC-Students except by scrolling to body links.
- **Set B** (`.sub nav`, on UC-Students + presumably campus leaves): 4 labels,
  `@media(max-width:860px){.sub nav{display:none}}` — same disappearance, and a
  different, narrower label set.

So on mobile there are effectively **zero** persistent lateral controls, and the
two divergent label sets are moot because neither renders. The fix is **one
unified horizontal-scroll sticky sub-nav that stays visible on mobile**, plus a
single disciplined bottom element and the find-my-dentist mobile chrome.

---

## 1. One unified mobile sub-nav (horizontal scroll, never hidden)

Adopt the existing `assets/ppo/ppo-system.css` `.cc-subnav` component verbatim —
it is already a horizontal-scroll, scrollbar-hidden pill rail. Replace BOTH Set A
and Set B with it on every Delta node. On mobile it does **not** collapse to a
hamburger; it scrolls horizontally. (Hamburger menus hide exactly the lateral
links seniors and students most need; a visible scrollable rail keeps them one
swipe away.)

### Canonical label set — 7 labels (≤8 rule honored)

```
[Delta Hub] [Premium] [Compare] [Find a Dentist] [Over 65] [UC Students] [For Dentists]
```

- Identical on all five+ page types, including the ×10 campus leaves. This is the
  single biggest mobile fix: it makes Premium↔Hub↔every sub-hub reachable from a
  phone, and ends the Set A / Set B divergence U1 flagged.
- `Find a Dentist` canonicalizes to `/premium/#dentists` everywhere (per U1 §6.7).
- Labels are abbreviated for mobile width: `Premium Plan`→`Premium`. Keep each
  label ≤12 chars so ~3.5 pills are visible at 360px, signalling "scroll for more."
- Current node uses `.on` (teal-night text on `--paper-2` fill). Do NOT mint-fill
  it — mint `#5BE0A0` is reserved for CTAs; an active *nav* pill must read as
  navigation, not action (body/nav text must differ from CTA, per brief).

### Mobile geometry

```css
.cc-subnav{position:sticky; top:0; z-index:30;}      /* mega-nav is NOT sticky on mobile (see §2) */
.cc-subnav .inner{height:var(--subnav-h); overflow-x:auto; -webkit-overflow-scrolling:touch;}
@media(max-width:640px){
  :root{--subnav-h:52px;}                              /* ≥48px rail so pills clear 44px targets */
  .cc-subnav a{padding:10px 14px; font-size:13.5px; scroll-snap-align:start;}
  .cc-subnav .inner{scroll-snap-type:x proximity; padding-inline:14px;}
}
```

- **Auto-scroll the active pill into view on load:** on DOMContentLoaded,
  `document.querySelector('.cc-subnav a.on')?.scrollIntoView({inline:'center',block:'nearest'})`.
  Without this, a UC-Students user sees only "Delta Hub / Premium / Compare" and
  never learns their own page is in the rail.
- **Edge affordance:** a 16px right-edge fade (`mask-image:linear-gradient`) so the
  cut-off pill signals more content. No JS arrows.

---

## 2. Mega-nav + sub-nav stacking on mobile (don't double the sticky height)

Desktop stacks mega-nav (56px, `top:0`) + sub-nav (`top:56px`) = 112px of sticky
chrome. On a phone that eats a third of the viewport. Rules:

- **Mega-nav is static (not sticky) on mobile.** It scrolls away with the page;
  only the brand mark needs to be reachable, and the sub-nav already carries a
  brand affordance + "Delta Hub" link.
- **Sub-nav alone is sticky at `top:0` on mobile.** Single 52px sticky band.
- `:root{--cc-anchor-offset:62px}` already exists in ppo-system.css for
  `scroll-margin-top`; on mobile reduce to match the single-band height so
  anchor jumps (`#dentists`, `#waiting`) don't hide their heading under the rail:
  `@media(max-width:640px){:root{--cc-anchor-offset:60px}}`.

```css
@media(max-width:640px){
  .meganav{position:static;}                 /* was position:sticky;top:0;z-index:50 */
  .cc-subnav{top:0;}                          /* the only sticky top element */
}
```

---

## 3. Breadcrumb on mobile

The breadcrumb is the **up** mechanism (to PPO Plans → Home) and must survive on
mobile — U1 found Compare and the campus leaves are weak at self-locating.

- Keep the breadcrumb **in-flow** (scrolls away), directly under the sticky
  sub-nav. Do not make it a second sticky band.
- **Truncate the middle on mobile**, never the ends. Render
  `Home / … / Delta Dental / {This page}` where the `…` is the real collapsed
  `Dental Insurance / PPO Plans` segments (still crawlable links, just visually
  condensed). The leaf (current page) and Home stay full.
- Single line, `white-space:nowrap; overflow-x:auto` so a long leaf name
  (e.g. "UC Santa Barbara") can scroll rather than wrap to three lines.
- **Fix the gaps U1 flagged on mobile too:** Compare must gain a visible crumb +
  `BreadcrumbList` JSON-LD; every campus leaf must render
  `Home / … / Delta Dental / UC Students / {Campus}` so a search landing isn't
  orphaned.

```css
@media(max-width:640px){
  .crumb{white-space:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; font-size:12px;}
  .crumb .mid{ }   /* collapsed Dental Insurance / PPO Plans rendered as "…" with title attr */
}
```

---

## 4. Collision rule — ONE bottom element, ever

Mobile has three candidate bottom-pinned elements; **at most one may be visible at
a time.** This is the hard constraint from the brief.

| Element | Source pattern | When it owns the bottom |
|---------|---------------|--------------------------|
| **Verify CTA bar** | `.mobilebar` (find-my-dentist) | Default on Premium, Over-65, campus leaves, UC-Students. Single mint CTA: "Verify my coverage — free". |
| **Compare tray** | `.cc-tray` / `.comptray` | Only on **Compare** (and only once ≥1 plan is pinned). Teal-night bar, plan chips + "Compare →". |
| **(nothing)** | — | Hub landing (dispatcher page needs no persistent bottom CTA; its job is the explore grid). |

**Arbitration logic (single source of truth):**

```
if (page === 'compare' && pinnedCount > 0)   show compareTray,  hide ccBar
else if (page !== 'hub')                      show ccBar,        hide compareTray
else                                          show neither
```

- The two **never stack.** On Compare, when the tray activates it *replaces* the
  CTA bar; when the last plan is unpinned the CTA bar returns.
- Both reserve identical bottom space: `bottom:0; padding-bottom:env(safe-area-inset-bottom)`
  (notch-safe, copied from `.mobilebar`). Body gets
  `padding-bottom:calc(64px + env(safe-area-inset-bottom))` so the final content
  and footer are never hidden behind whichever bar is up.
- Compare tray on a narrow screen: cap visible chips at 3, collapse overflow to a
  "+2" pill; the "Compare →" action stays right-pinned and full-height.
- z-index: bottom element `z:60` (above sub-nav `z:30`), below modals/scrims
  (`z:200+`), matching find-my-dentist.

---

## 5. Touch targets (global floor)

- **Every** tappable nav pill, chip, CTA, FAQ summary, breadcrumb link, map
  marker popup link, and modal control ≥ **44×44px** hit area (`min-height:44px`
  already on `.cc-btn`; extend to `.cc-subnav a`, `.crumb a`, `.chip`,
  `details.faq summary`, and the campus `.lc` cards).
- ≥8px gap between adjacent targets (`.cc-subnav .inner{gap:4px}` → bump to `gap:8px`
  at ≤640px so fast-scrolling thumbs don't mis-tap neighboring pills).
- FAQ `<summary>` rows: pad to 16px vertical, full-row tap, chevron is decorative
  only (the whole row toggles) — current Over-65/UC summaries are serif text with
  no enforced min-height; add `min-height:48px; display:flex; align-items:center`.
- Leaflet map (UC-Students + campus leaves): `scrollWheelZoom:false` is already
  set — keep it so the page can be scrolled past the map by thumb without trapping
  the gesture. Pin popups get a `verify`/`nominate` link pair; size those to 44px.

---

## 6. Campus-leaf mobile pattern (×10 T5 leaves)

The leaves are the highest orphan risk (linked only from Hub + UC-Students). On
mobile each campus page must carry the **same** chrome as every other node:

1. **Same unified `.cc-subnav`** with the 7-label set, active pill = `UC Students`
   (the leaf's *parent* is highlighted, since the leaf itself isn't a top-level
   label — this keeps the rail ≤8 and tells the user "you are under UC Students").
2. **Full breadcrumb** `Home / … / Delta Dental / UC Students / {Campus}` (§3).
3. **Bottom element = `.mobilebar` Verify CTA** ("Verify my UC SHIP dental — free"),
   never a compare tray (compare is Compare-only).
4. A single **in-flow "Back to all campuses"** chip near the top of content (links
   to `/uc-students/#finder`) so the leaf is escapable without using the rail.
5. The campus finder map follows the §5 map rules (no wheel-trap, 44px popup links).
6. Mobile content order on a leaf: crumb → H1 → one-line "you're likely covered"
   answer → map/finder → 3-step how-it-works → FAQ → related rail. Push prose below
   the interactive finder; phone intent here is "find a dentist near campus now."

---

## 7. Condensed-after-scroll behavior

A lightweight shrink, not a hide. On scroll past ~120px:

- Sub-nav rail height `52px → 46px`; pill padding `10px→8px`, font `13.5→13px`.
  Toggle via an `IntersectionObserver` on a 1px sentinel at the top of `<body>`
  adding `.is-condensed` to `.cc-subnav` (no scroll-event jank).
- The bottom element does **not** condense on scroll — it only appears after the
  hero is passed (reveal `.mobilebar`/tray when the hero CTA scrolls out of view,
  same trigger find-my-dentist uses), so the primary CTA isn't doubled on screen
  with the hero CTA.
- Respect `prefers-reduced-motion`: ppo-system.css already kills transitions under
  it; the condense must be instant (no height animation) in that mode.

```css
.cc-subnav{transition:height .18s ease}
.cc-subnav.is-condensed .inner{height:46px}
.cc-subnav.is-condensed a{padding:8px 12px;font-size:13px}
@media(prefers-reduced-motion:reduce){.cc-subnav{transition:none}}
```

---

## 8. Over-65 (senior) legibility & touch — SPECIFIC requirements

Seniors are the SCAN audience; assume reduced acuity, tremor, and unfamiliarity
with horizontal-scroll patterns. On the Over-65 node and its bottom CTA:

- **Larger base type.** Bump mobile body to **17px** and the sub-nav pill font to
  **15px** on Over-65 (`[data-aud="senior"]` body class scoping). Lede ≥18px.
  Never go below 14px for any readable text on this page.
- **Bigger touch targets.** Raise the floor from 44 to **48×48px** for the sub-nav
  pills, the Verify CTA, FAQ rows, and any "find/nominate" button. Increase
  inter-target gap to **12px**.
- **Higher contrast.** Body/secondary text uses `--ink`/`--teal-700`, not the
  faint `--muted #5A636E` (which is borderline on small screens). Active states get
  a visible underline in addition to color (don't rely on color alone).
- **Single, unmistakable bottom CTA.** Over-65 always shows the `.mobilebar` Verify
  bar — full-width mint button, label in plain words: **"Verify my Delta coverage —
  free"** (no jargon, no "PPO" abbreviation in the button itself). One action only;
  no secondary link competing in the bar.
- **Horizontal-scroll discomfort mitigations:** auto-center the active pill (§1) so
  the senior doesn't have to discover the scroll; add the right-edge fade as a "more
  here" cue; and surface the three sibling hubs (Premium / Compare / Hub) **again as
  large in-flow nav cards** lower on the page (`.cc-navcard`, ≥48px) so reaching them
  never *requires* the scroll rail.
- **No motion that disorients:** the condense-on-scroll shrink is disabled on
  Over-65 (`[data-aud="senior"] .cc-subnav{transition:none}` and no `.is-condensed`
  applied) — keep the rail a constant, predictable size for this audience.
- Tap targets get a visible `:active`/`:focus-visible` state (the gold focus ring
  already in ppo-system.css) so a senior gets feedback that a tap registered.

---

## 9. Implementation checklist

- [ ] Swap Set A `.subnav` and Set B `.sub nav` → unified `.cc-subnav` on all 5
      page types + 10 campus leaves; 7-label canonical set; no `display:none` at
      any breakpoint.
- [ ] Auto-center active pill on load; right-edge fade; `gap:8px` (`12px` senior).
- [ ] Mega-nav `position:static` on ≤640px; sub-nav the only sticky top band.
- [ ] Mobile breadcrumb: middle-collapsed, nowrap-scroll, full leaf + Home; add to
      Compare and all campus leaves (+ matching JSON-LD).
- [ ] One-bottom-element arbiter: `.mobilebar` default, `.cc-tray` Compare-only,
      none on Hub; never stacked; `env(safe-area-inset-bottom)`; body bottom pad.
- [ ] 44px global touch floor (48px on Over-65); FAQ/chip/card min-heights.
- [ ] Condense-on-scroll via IntersectionObserver sentinel; disabled on Over-65 +
      reduced-motion.
- [ ] Over-65: 17px body / 15px pills, 48px targets, higher-contrast text, plain
      single Verify CTA, repeated in-flow nav cards.

---

## Summary (~150 words)

On mobile, both of Delta's divergent sub-navs simply `display:none`, so a phone
user has **no lateral navigation at all** — the deepest navigability failure U1
found, hidden by the breakpoint. U4 replaces both Set A and Set B with the existing
`assets/ppo/ppo-system.css` `.cc-subnav` — one horizontal-scroll, scrollbar-hidden
pill rail carrying a single 7-label set (`Delta Hub · Premium · Compare · Find a
Dentist · Over 65 · UC Students · For Dentists`) that renders identically on the
hub, gateway, every sub-hub, and all ten campus leaves, with the active pill
auto-centered. The mega-nav goes static so only one 52px band is sticky. A strict
arbiter guarantees one bottom element ever: the `.mobilebar` Verify CTA by default,
the `.cc-tray` compare tray only on Compare, nothing on the hub. Breadcrumbs
collapse the middle (not the ends) and persist for self-location. Seniors on Over-65
get 17px type, 48px targets, higher contrast, a plain single CTA, and repeated
in-flow nav cards so the scroll rail is never the only path.

### Top 3 recommendations

1. **Ship one un-hideable horizontal-scroll `.cc-subnav` with the 7-label set on
   every node, and auto-center the active pill on load.** This alone restores all
   lateral mobile movement (Premium↔Hub↔every sub-hub) and ends the Set A/Set B
   split — the single highest-impact fix.
2. **Enforce the one-bottom-element arbiter:** `.mobilebar` Verify CTA by default,
   `.cc-tray` only on Compare with ≥1 plan pinned, nothing on the hub; never
   stacked, always `env(safe-area-inset-bottom)`-safe with matching body padding.
3. **Treat Over-65 as its own legibility tier:** 17px body / 15px pills, 48px touch
   targets, high-contrast non-faint text, a single plain-language Verify CTA, the
   condense-on-scroll motion disabled, and the sibling hubs repeated as large
   in-flow `.cc-navcard`s so seniors never depend on discovering the scroll rail.
