# DH2 — Interactive Sub-Menu (Text Dropdowns) for the Compare PPO Main Hub

> Founder ask: "a bit more interactive, maybe with text dropdown to make navigation better to enter the other hubs."
> Scope: the hub's branch-nav (NOT the global site nav). T5 jade. Every link is a **real server-rendered `<a href>`** so the panels stay crawlable and feed sitelinks.
> Replaces the flat `.di-hub` pill row (`compare-ppo-dental-plans.html` L1085–1098). DH3 owns its placement; DH2 owns its behavior + contents.

---

## 1. Design principle — progressive disclosure, never JS-gated links

The current sub-nav is a single flat pill row that has to flatten ~15 destinations into 7 visible pills, so it orphans Delta, the carrier pages, treatments and timing (see H2 §3 orphan risk). A dropdown buys **depth without width**: ≤7 visible labels, each expanding to its branch.

**Hard rule (crawlability):** the dropdown panels are **always in the DOM** as plain `<ul><li><a>` markup. JS only toggles a `[hidden]`/`aria-expanded` visual state — it never injects the links. Crawlers, screen readers, and a no-JS browser see the full link mesh. This is the same lesson as the JS-injected mega-nav blocker (12-MAIN-HUB §10): facts (links) in HTML, JS for affordance only.

---

## 2. Top-level label set (7 items)

| # | Label | Type | Target / dropdown |
|---|---|---|---|
| 1 | **Compare plans** | simple `<a>` (`aria-current`) | `/dental-insurance/ppo-plans/` — the hub itself (anchor to `#compare-matrix`) |
| 2 | **Plans by carrier ▾** | DROPDOWN | 8 carriers, Delta featured |
| 3 | **By treatment ▾** | DROPDOWN | per-procedure cost guides |
| 4 | **By timing ▾** | DROPDOWN | no-wait / immediate / life-situation |
| 5 | **Glossary ▾** | DROPDOWN | top terms + A–Z |
| 6 | **Find a dentist →** | simple `<a>` (jade-fill CTA) | `/find-my-dentist` |
| 7 | **Get covered** | simple `<a>` | `/compare-ppo-dental-plans/#smart-match` (Smart Match lens) |

4 simple anchors + 3 text dropdowns. "Compare plans" stays a plain link (it IS the current page) so the founder's primary action is one tap, not a menu.

---

## 3. Dropdown contents (the branch map)

### 2 · Plans by carrier ▾  (the structural backbone)
Two-column panel. **Delta is a featured first row** spanning full width, jade-tinted, with two sub-links inside it (mirrors the carrier-grid Delta tile, H2 §4a).

```
┌─ FEATURED ───────────────────────────────────────┐
│ ★ Delta Dental — largest PPO network              │
│    → Delta Dental hub      → PPO Premium (gateway) │
├─ STANDARD PLANS ──────────────────────────────────┤
│ Humana Extend 5000   ·  UnitedHealthcare Primary  │
│ Aetna Dental Direct  ·  Ameritas PrimeStar        │
│ Guardian Premier PPO ·  Mutual of Omaha           │
│ MetLife (coming soon — no link, muted)            │
├───────────────────────────────────────────────────┤
│ See the full 8-plan comparison →                  │
└───────────────────────────────────────────────────┘
```
Links: `/dental-insurance/ppo-plans/delta-dental/`, `…/delta-dental/premium/`, `…/humana-extend-5000/`, `…/uhc-primary-dental/`, `…/aetna-dental-direct/`, `…/ameritas-primestar/`, `…/guardian-premier-ppo/`, `…/mutual-of-omaha-dental/`. MetLife = `<span>` (not on disk, H2 §6) until built. Footer anchor → `#compare-matrix`.

### 3 · By treatment ▾
Single column, descriptive anchors → cost-estimator deep links.
```
Dental implants   → /dental-treatment-cost-estimator/#implants
Crowns            → …/#crowns
Root canals       → …/#root-canals
Dentures          → …/#dentures
Braces & ortho    → …/#braces
Teeth whitening   → …/#whitening
─────────────────────────────────
All treatment costs → /dental-treatment-cost-estimator/
```

### 4 · By timing ▾
Routes the timing/life-situation pages currently crammed into the flat row.
```
No waiting period      → /dental-insurance-no-waiting-period/
Coverage starting now  → /dental-insurance-immediate-coverage/
─── Life situations ───
Between jobs           → /dental-insurance-between-jobs/
Self-employed          → /dental-insurance-for-self-employed/
```

### 5 · Glossary ▾
Top terms (1-tap to the 5 most-searched) + a bridge to the full set. Pulls the **23 live term pages**, never the stub JSON (H2 §4b).
```
TOP TERMS
Waiting period  · Annual maximum · Deductible
Coinsurance     · In-network
──────────────────────────────────
Browse A–Z (23 terms) → /dental-insurance-glossary/
```

---

## 4. Dropdown panel layout

- Anchored below its trigger, left-aligned to the label, `min-width:240px` (carrier panel `420px`, two-col).
- Cream-card surface (`--cream-card #FFFDF8`), 1px `--line` border, 12px radius, soft shadow. No gradient, no glass (CLAUDE.md).
- Section eyebrows in `--ink-faint` 11px caps; links `--teal-700` 14px, hover row tint `--mint-soft`.
- Featured Delta row: `--mint-soft` fill, `★` glyph, bold name — the only "promoted" row anywhere in the panels.
- Footer "See all →" link in `--teal-700`, top border `--line`.

---

## 5. Open behavior — hover + tap + focus

| Input | Behavior |
|---|---|
| **Hover (pointer, ≥768px)** | `mouseenter` on the `<li>` opens after 120ms intent-delay; `mouseleave` closes after 180ms grace (lets the cursor cross the gap). |
| **Tap / click** | The trigger is a real `<button aria-expanded>` — click toggles. On touch, the first tap opens (does not follow), tap-outside or a second tap closes. The label itself is NOT a link, so a tap never navigates away by accident; navigation only happens on the `<a>` rows inside. |
| **Keyboard / focus** | `Tab` to the trigger; `Enter`/`Space`/`↓` opens and moves focus to the first `<a>`; `↑/↓` cycle rows; `Esc` closes and returns focus to the trigger; `Tab` out closes. |
| **One-open rule** | Opening one panel closes any other (single `openPanel` state). |
| **Mobile (<768px)** | Drops to an accordion: triggers stack, tapping expands the panel inline (push, not overlay) so audience hubs stay co-navigable — fixes the "both subnavs `display:none` = zero lateral nav" defect (06-DELTA §47). |

`prefers-reduced-motion`: skip the fade, toggle instantly.

---

## 6. Crawlability guarantee

- Triggers are `<button>` (not links) so they never compete for crawl signal; the destinations are the `<a>` rows.
- Panels render server-side inside the nav markup — **no `fetch`, no template injection.** Default state is `hidden` via CSS, which Google indexes fine (content is in the DOM).
- Every dropdown's "See all →" footer link gives the parent hub a direct crawlable edge, and each row is a descriptive anchor ("Humana Extend 5000 review →", "Delta Dental PPO plans →") — exactly the anchor text the sitelink algorithm rewards (12-MAIN-HUB §22).
- Result: ~18 real `<a href>` in the sub-nav alone, all visible to crawlers, satisfying the hub's link-down obligations (H2 §3) that the flat pill row could not.

---

## 7. Markup pattern

```html
<nav class="cc-subnav" aria-label="Compare PPO plans — browse">
  <ul class="cc-subnav__row" role="list">

    <!-- simple anchor -->
    <li><a href="/dental-insurance/ppo-plans/#compare-matrix"
           aria-current="page">Compare plans</a></li>

    <!-- DROPDOWN: button trigger + always-present panel -->
    <li class="cc-dd">
      <button type="button" class="cc-dd__trigger"
              aria-expanded="false" aria-controls="dd-carrier"
              id="dd-carrier-btn">
        Plans by carrier <span class="cc-dd__caret" aria-hidden="true">&#9662;</span>
      </button>
      <div class="cc-dd__panel cc-dd__panel--wide" id="dd-carrier"
           role="menu" aria-labelledby="dd-carrier-btn" hidden>
        <p class="cc-dd__eyebrow">Featured</p>
        <a class="cc-dd__feat" href="/dental-insurance/ppo-plans/delta-dental/" role="menuitem">
          <span class="cc-dd__star" aria-hidden="true">&#10038;</span>
          Delta Dental PPO plans
        </a>
        <a class="cc-dd__sub" href="/dental-insurance/ppo-plans/delta-dental/premium/" role="menuitem">
          PPO Premium &mdash; the gateway plan
        </a>

        <p class="cc-dd__eyebrow">Standard plans</p>
        <ul class="cc-dd__grid" role="list">
          <li><a href="/dental-insurance/ppo-plans/humana-extend-5000/"     role="menuitem">Humana Extend 5000</a></li>
          <li><a href="/dental-insurance/ppo-plans/uhc-primary-dental/"     role="menuitem">UnitedHealthcare Primary</a></li>
          <li><a href="/dental-insurance/ppo-plans/aetna-dental-direct/"    role="menuitem">Aetna Dental Direct</a></li>
          <li><a href="/dental-insurance/ppo-plans/ameritas-primestar/"     role="menuitem">Ameritas PrimeStar</a></li>
          <li><a href="/dental-insurance/ppo-plans/guardian-premier-ppo/"   role="menuitem">Guardian Premier PPO</a></li>
          <li><a href="/dental-insurance/ppo-plans/mutual-of-omaha-dental/" role="menuitem">Mutual of Omaha</a></li>
          <li><span class="cc-dd__soon">MetLife &mdash; coming soon</span></li>
        </ul>
        <a class="cc-dd__all" href="/dental-insurance/ppo-plans/#compare-matrix" role="menuitem">
          See the full 8-plan comparison &rarr;
        </a>
      </div>
    </li>

    <!-- …By treatment ▾, By timing ▾, Glossary ▾ follow the same pattern… -->

    <li><a href="/find-my-dentist" class="cc-subnav__cta">Find a dentist &rarr;</a></li>
    <li><a href="/dental-insurance/ppo-plans/#smart-match">Get covered</a></li>
  </ul>
</nav>
```

JS contract (≈30 lines, no deps): delegate `click`/`keydown` on `.cc-subnav`; toggle `aria-expanded` + `hidden`; track one `openPanel`; pointer-media query gates hover-intent timers; `Esc`/outside-click/`Tab`-out close. Note: no `mdash`/em-dash in **copy** — used here only in muted "coming soon" / spec labels, swap for commas in shipped strings per CLAUDE.md.

---

## Summary (~150 words)

Replace the flat 7-pill sub-nav with a 7-label browse bar: 4 simple anchors (Compare plans, Find a dentist, Get covered, plus the current page) and 3 text dropdowns — **Plans by carrier ▾**, **By treatment ▾**, **By timing ▾**, **Glossary ▾**. Each dropdown's panel is server-rendered plain `<a href>` markup that is always in the DOM; JS only toggles visibility, so all ~18 links stay crawlable and feed sitelinks. The carrier panel features Delta full-width (jade-tinted, with hub + Premium-gateway sub-links) above the 6 standard plans and a muted "MetLife coming soon," fixing the orphaned-Delta defect. Triggers are `<button aria-expanded>` so taps never navigate by accident. Open behavior: hover-intent on desktop, tap-toggle on touch, full keyboard/focus support; on mobile it collapses to an inline accordion so audience hubs stay co-navigable. Anchor text is descriptive ("Delta Dental PPO plans →") to maximize sitelink eligibility.

## Top 3 recommendations
1. **Keep every link in the DOM, JS toggles only.** The panels must be raw server-rendered `<a href>` (never fetched/injected) — this is the single thing that makes the dropdowns crawlable and is the same blocker that kills the JS-injected mega-nav. Triggers are `<button>`, not links.
2. **Make the carrier dropdown carry Delta.** Feature Delta full-width with its hub + Premium-gateway sub-links above the 6 standard plans; this dropdown alone resolves the hub's worst orphan (Delta) and supplies the descriptive anchors the sitelink algorithm rewards.
3. **One open-state + a mobile accordion.** Single `openPanel` (opening one closes others), hover-intent delays on desktop, and an inline-push accordion under 768px so the timing/audience hubs stop disappearing on mobile (the `display:none` zero-lateral-nav defect).
