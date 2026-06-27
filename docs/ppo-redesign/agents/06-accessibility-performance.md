# Agent 06 — Accessibility (WCAG 2.2 AA) & Performance (Core Web Vitals)

**Scope:** Constraints the shared PPO design system must satisfy, plus where the current live page (`compare-ppo-dental-plans.html`) and the redesign package (`docs/ppo-redesign/_redesign-package/`) risk failing WCAG 2.2 AA and Core Web Vitals.
**Audited:** June 2026. Contrast ratios computed from extracted `:root` tokens against the WCAG relative-luminance formula. Component findings read directly from the HTML.
**Standard:** WCAG 2.2 Level AA. Targets: text contrast ≥ 4.5:1, large text / UI components / focus indicators ≥ 3:1, LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 0. Score & top fixes

**Current accessibility + performance: 5.5 / 10**

The redesign package is meaningfully stronger than the live page (it has `:focus-visible`, `prefers-reduced-motion`, `scope` on table headers, `<details>` accordions, text-labelled status cells, `aria-live`, `aria-pressed`). The live page regresses on the fundamentals (kills focus with `outline:none`, no reduced-motion, no table semantics, hover-only `title` tooltips, Google-Fonts dependency). Neither page yet passes contrast across the gold and teal accent palette, and the tooltip pattern in both is not keyboard/tap accessible. The shared system must adopt the redesign package's bones and fix the gaps below.

**Top 3 fixes (do these first):**

1. **Fix accent-color contrast.** Gold-as-text and the teal/gold/green button fills fail AA badly (gold text on paper is 2.54:1; white-on-gold button 2.89:1; redesign `--teal` button 4.08:1; warm-theme teal button 3.21:1). Apply the corrected hex table in §1. This is the single biggest AA blocker and it is zero-risk CSS.
2. **Make every focus state visible and never remove it.** The live page uses `outline:none` on inputs, range sliders, and selects (SC 2.4.7 / 2.4.11 fail). Adopt the redesign package's global `:focus-visible{outline:2px solid; outline-offset:2px}` and apply it to *every* interactive element, including the compare-tray controls and sticky-subnav links.
3. **Replace the hover-only tooltip with a tap+focus+hover pattern.** Both pages use a definition tooltip that only opens on hover (`title=` on live; `.tip:hover/:focus::after` with no `tabindex` on redesign). Glossary definitions must open on tap, keyboard focus, AND hover, be dismissible (SC 1.4.13), and use `aria-describedby`.

---

## 1. CONTRAST AUDIT

Ratios are computed against the WCAG formula. **FAIL = below the AA threshold for its role.** Corrected hex values are the minimum darkening that reaches the threshold against the same background; round to a clean token where the design system prefers.

### Live page (`compare-ppo-dental-plans.html`, default theme)

| Pair | Ratio | Need | Result | Corrected hex |
|---|---:|---:|---|---|
| `--ink #21302A` on `--paper #F5F0E5` | 12.15 | 4.5 | PASS | — |
| `--ink-soft #3A4A42` on paper | 8.26 | 4.5 | PASS | — |
| `--green #2E5E45` link on paper | 6.59 | 4.5 | PASS | — |
| white on `--green` button | 7.49 | 4.5 | PASS | — |
| `--muted #6E7268` on paper | 4.33 | 4.5 | **FAIL** | `#6B6F65` (4.52) |
| `--green-l #5C7A66` text on paper | 4.17 | 4.5 | **FAIL** | `#577360` (4.59) |
| `--gold #C0902E` as **text** on paper | 2.54 | 4.5 | **FAIL** | `#8A6721` (4.57) |
| `--gold` as text on `--card #FCFAF4` | 2.77 | 4.5 | **FAIL** | `#8A6721` |
| `--rust #B0542E` on paper | 4.45 | 4.5 | **FAIL** (borderline) | `#AE532D` (4.53) |
| white on `--gold #C0902E` **button** | 2.89 | 4.5 | **FAIL** | darken bg to `#957023` (4.55) **or** use ink text |
| `--line #E3DAC8` border on paper | 1.22 | 3.0 | **FAIL** as a *meaningful* UI boundary | `#D8CDB6` exists but is 1.5:1; use `--line-2`-darker `#C9BCA0` only where the border conveys state |

> Note on `--line`: a purely decorative divider is exempt (SC 1.4.11 applies to *components and graphical objects that convey meaning*). But any border that is the **only** thing distinguishing an input, a selected card, or a table cell boundary must reach 3:1. Selected/active states must not rely on a 1.2:1 border.

### Live page — `gold` theme variant (`[data-theme="gold"]`)

| Pair | Ratio | Need | Result | Corrected |
|---|---:|---:|---|---|
| `--green #B8924F` link/text on `--paper #F6F0E6` | 2.55 | 4.5 | **FAIL** | `#846938` (4.56) |
| white on `--green #B8924F` button | 2.89 | 4.5 | **FAIL** | darken bg `#8F713D` (4.57) or ink text |

The gold theme reuses a light gold for the primary "green" role, so it fails for **links, button fills, and any text** that uses the brand token. This theme is not AA-shippable as-is.

### Redesign package — light theme (`_redesign-package/compare-ppo-dental-plans.html`)

| Pair | Ratio | Need | Result | Corrected |
|---|---:|---:|---|---|
| `--ink #0F1B25` on `--bg #F6F8FA` | 16.39 | 4.5 | PASS | — |
| `--ink-3 #5E707B` on `--surface #FFFFFF` | 5.15 | 4.5 | PASS | — |
| covered `#0A5D43` on covered-tint `#E4F6EE` | 7.04 | 4.5 | PASS | — |
| partial `#7A4A00` on partial-tint `#FBEFD9` | 6.57 | 4.5 | PASS | — |
| notcov `#475569` on notcov-tint `#EEF1F4` | 6.68 | 4.5 | PASS | — |
| tooltip text `#EAF6F5` on `--teal-deep #0B3B40` | 11.09 | 4.5 | PASS | — |
| `--teal-strong #0A6E6D` on surface | 6.06 | 4.5 | PASS | — |
| `--teal #0E8C8B` link / button fill on surface | 4.08 | 4.5 | **FAIL** | `#0D8382` (4.58) — or use `--teal-strong` for text/links |
| white on `--teal` button | 4.08 | 4.5 | **FAIL** | darken to `#0D8382` |
| `--partial #B26A00` if used as text on white | 4.24 | 4.5 | **FAIL** | use `--partial-ink #7A4A00` for text |
| `--ink-faint #94A4AE` on bg | 2.41 | 4.5 | **FAIL** for any real text | `#677279` (4.63); keep `#94A4AE` only for non-text decoration |

The status-color system here is the strong part of the package — the `-ink` variants are all built for AA on their tints. The only color bug is `--teal` itself being used as both a body link/fill and a label; promote `--teal-strong` for those roles.

### Redesign package — warm-paper theme

| Pair | Ratio | Need | Result | Corrected |
|---|---:|---:|---|---|
| `--teal-strong #876632` on `--surface #FFFCF6` | 5.16 | 4.5 | PASS | — |
| `--teal #B0894E` on surface | 3.14 | 4.5 | **FAIL** | `#8E6E3F` (4.61) |
| white on `--teal #B0894E` button | 3.21 | 4.5 | **FAIL** | darken bg `#927140` (4.51) or ink text |
| `--ink-3 #857966` on surface | 4.16 | 4.5 | **FAIL** (borderline) | `#7E7260` (4.59) |

**Rule for the shared system:** Every brand/accent token gets a **`-text` (or `-ink`) variant** guaranteed ≥ 4.5:1 on paper *and* on card/surface. The bright accent (`--gold`, `--teal`, warm `--teal`) is reserved for **fills behind sufficiently dark/light text, large display type ≥ 24px, and 3:1 UI strokes** — never for body text.

---

## 2. COMPONENT ACCESSIBILITY REQUIREMENTS

### 2.1 Comparison matrix (the most important table)

Current redesign markup already has `<thead>` and `scope` on `<th>` — keep that. Required additions:

- **`<caption>`** describing the table (e.g. "PPO plan coverage comparison — preventive, basic, major, implants, orthodontics"). Currently **missing** in both pages. SC 1.3.1.
- **`scope="col"`** on every column header (plan names) and **`scope="row"`** on the first cell of each row (the benefit category). The current package puts `scope` on header cells but the leading row label must be a `<th scope="row">`, not a `<td>`.
- The matrix is a **data table**, so it must keep real `<table>/<thead>/<tbody>/<th>/<td>` semantics. Do **not** rebuild it as CSS grid `<div>`s. If a responsive transform is needed, change layout with CSS only and preserve the table roles, or supply explicit ARIA grid roles (`role="table/row/columnheader/rowheader/cell"`).
- **Sticky header + sticky first column** (already present via `position:sticky; top:60px / left:0`) must not orphan the header from its scope association — `scope` handles this for screen readers regardless of visual stickiness, which is correct. Verify the sticky offsets account for the sticky subnav so no header is visually clipped.
- **Each data cell carries a text label**, not color alone (see §3). The package does this (`50%`, `Not covered`) — enforce it as a rule.
- **Horizontal scroll container** must be keyboard-scrollable: give the scroll wrapper `tabindex="0"`, `role="region"`, and an `aria-label` (SC 2.1.1) so keyboard users can reach off-screen columns.

### 2.2 Accordions

- The redesign uses native `<details>/<summary>` — **preferred**; it is keyboard- and SR-accessible for free. Keep it.
- If a custom accordion is ever used instead, the trigger must be a `<button>` with `aria-expanded` and `aria-controls`; the panel `id` must match. The live page already uses `aria-expanded` in a few places (lines 1808–2060) — make that the universal pattern.
- Open/close must be operable by Enter **and** Space, and the disclosure indicator (caret) must rotate via CSS, not be the only affordance.
- Do not trap focus inside an open panel; Tab must continue to the next control.

### 2.3 Tabs

- Use the APG tab pattern: container `role="tablist"`, each tab `role="tab"` with `aria-selected` and `aria-controls`; each panel `role="tabpanel"` with `aria-labelledby`.
- **Arrow-key navigation** between tabs (Left/Right), with roving `tabindex` (active tab `tabindex="0"`, others `-1`). Tab key moves *into* the panel, not between tabs.
- Active tab must be distinguished by **more than color** — add an underline/weight change (SC 1.4.1).
- Server-render the active tab's panel content (it holds plan facts — see §5).

### 2.4 Tooltips / glossary definitions — **must change in both pages**

Current state is the worst a11y gap:
- Live page: `title=` attributes (5 of them) — hover/long-press only, invisible to keyboard, not stylable, fails SC 1.4.13.
- Redesign: `.tip:hover::after, .tip:focus::after` on a `<span class="tip">` with **no `tabindex`** — `:focus` never fires for keyboard users, and there is **no tap path** on touch.

Required pattern for the shared system:
- Trigger is a real focusable element: `<button class="tip">` or `<span class="tip" tabindex="0" role="button">`.
- Definition shows on **hover, keyboard focus, AND tap/click** (1.4.13 requires it not be hover-only).
- **Hoverable & persistent:** the tooltip stays while the pointer moves onto it and is **dismissible with Esc** without moving focus (SC 1.4.13).
- Associate with `aria-describedby` pointing to the tooltip `id` so SR announces it.
- Never put essential plan facts *only* in a tooltip; tooltips are progressive enhancement.
- `cursor:help` is fine but not a substitute for the affordances above.

### 2.5 Compare tray (sticky, `position:fixed; bottom:0`)

- The tray slides in via `transform:translateY` — when hidden it must be **`aria-hidden` / `inert`** so its buttons are not in the tab order while off-screen (avoids an invisible focus trap).
- When it appears, set `aria-live="polite"` on a status node announcing "2 plans selected" (the package already uses `aria-live` near line 811 — wire it to the tray).
- Remove/clear buttons need discernible names (`aria-label="Remove {plan} from comparison"`), not an icon alone.
- The tray must **not overlap or hide focused content**: add `scroll-padding-bottom`/body padding equal to the tray height so a focused control at page bottom is never covered (SC 2.4.11 focus-not-obscured).
- Touch targets ≥ 24×24 CSS px minimum (SC 2.5.8); the design already uses `--toch:52px` which is excellent — keep ≥ 44px for primary actions.

### 2.6 Sticky subnav — focus order & behavior

- Server-rendered `<a href="#section">` anchors in a `<nav aria-label="On-page sections">`. Real anchors, not JS-only handlers (SC 2.1.1, and crawlability — §5).
- **Focus order must follow DOM order**; because it is `position:sticky` (not reordered in source) this is satisfied — do not use `order`/flex reordering that desyncs visual and tab order (SC 2.4.3).
- Active-section state must be conveyed by **text weight/underline + `aria-current="true"`**, not color alone.
- `scroll-margin-top` on every target section equal to (sticky header + subnav height) so anchored content is not hidden under the sticky bars (SC 2.4.11).
- Horizontal-scroll overflow on mobile must be keyboard-reachable and must not trap focus.
- **One primary sticky subnav + one compare tray maximum.** Stacked sticky bars that consume the viewport fail reflow/2.4.11 on small screens. The alert banner (`position:sticky;top:0`) + subnav + tray is already three sticky layers — collapse the alert into the flow or make it dismissible.

### 2.7 Forms & validation (Smart Match, ZIP input)

- Every input has a programmatically associated `<label>` (not placeholder-only). SC 1.3.1 / 3.3.2.
- Errors: `aria-invalid`, `aria-describedby` → error text, and the error is **text + icon**, not red border alone (SC 1.4.1 / 3.3.1). Move focus or announce via `aria-live="assertive"`.
- Range slider (`input[type=range]`) currently has `outline:none` — restore a visible focus ring and ensure it is operable by arrow keys (native — just don't break it).

---

## 3. NON-COLOR STATUS SIGNALS (SC 1.4.1)

Status must never be conveyed by color or background tint alone. Required encodings:

| State | Color (allowed as reinforcement) | **Required non-color signal** |
|---|---|---|
| **Covered** | covered-tint / covered-ink | Text label ("100%", "Covered") **+** check glyph/`<svg>` with `aria-hidden` and an SR label, e.g. `aria-label="Covered"` |
| **Partial** | partial-tint / partial-ink | Percent text ("50%") **+** half/partial icon; the number *is* the signal |
| **Not covered** | notcov-tint / notcov-ink | Literal text **"Not covered"** (the package does this — keep) **+** dash/✕ icon. Never an empty colored cell |
| **Under review / unknown** | info-tint | Text "Under review" + info icon; do not leave blank |
| **Best in row** | covered-tint pill (`best-tok`) | **Uppercase text token "BEST"** + star/trophy icon + `aria-label="Best value in this row"`. The package's `best-tok` already uses uppercase text + svg — keep; just add the SR label |
| **Verified / verification status** | green badge | Text "Verified {date}" + check icon; "Needs verification" gets text + warning icon, not just a yellow dot |
| **Selected plan** (compare) | accent border/tint | Add a check icon + `aria-pressed="true"` on the select control + visible "Selected" text/checkmark, not border color alone |

The redesign package is already compliant on covered/partial/none (visible text in every cell) and best-tok (uppercase text). The live page's pill/dot patterns and the compare "selected" state need the text/icon reinforcement and an `aria-pressed`/SR label.

---

## 4. REDUCED-MOTION & FOCUS-VISIBLE RULES

**Reduced motion (SC 2.3.3):**
- The redesign package has the correct global guard:
  `@media(prefers-reduced-motion:reduce){*{transition-duration:.001ms!important; scroll-behavior:auto!important}}`
  Adopt it system-wide.
- **The live page has NONE** — this is a gap. Add the same guard. Specifically neutralize: the compare-tray `transform .26s` slide, any accordion height animation, theme-toggle transitions, and `scroll-behavior:smooth` anchor jumps.
- No auto-playing/looping motion, no parallax, no content that moves > 5s without a pause control.

**Focus-visible (SC 2.4.7 / 2.4.11 / 2.4.13):**
- System default: `:focus-visible{outline:2px solid var(--teal-strong); outline-offset:2px; border-radius:4px}` (the package already ships `2px solid var(--teal)` — bump to `--teal-strong` so the **focus ring itself clears 3:1** on every surface).
- **Never `outline:none` without a replacement.** The live page violates this on inputs, selects, and the range slider. Either keep the outline or provide an equally visible ring (the live page's `box-shadow:0 0 0 3px rgba(...)` ring is acceptable *if* the ring color reaches 3:1 — verify per theme).
- Focus ring must reach **≥ 3:1 against the adjacent background** (SC 2.4.13 focus appearance) and be ≥ 2px thick.
- Focus must **not be obscured** by sticky header, subnav, or compare tray (SC 2.4.11) — enforce `scroll-margin` and tray body-padding from §2.

---

## 5. PERFORMANCE / CWV CONSTRAINTS THE DESIGN MUST HONOR

These derive from the redesign package's own CWV/indexability docs (`seo/improvements/10-...` and `01-...`) and the master prompt's **Server-rendering rule**.

1. **Server-render all plan facts (hard rule).** Plan names, carriers, premiums (with qualifiers), annual maximums, deductibles, coverage tiers, waiting periods, effective-date language, network names, and the comparison-matrix cells must be in the initial HTML and visible in `view-source:` with JS disabled. JS may enhance sort/filter/compare/pin only. **No client-side `useEffect`/Supabase fetch for crawlable plan content** — that returns an empty shell to Google and AI crawlers (GPTBot/ClaudeBot/PerplexityBot). This is also an a11y win: SR users get content without waiting on JS.
2. **LCP element is the hero heading + carrier/header logo.** Keep it in initial HTML, not JS-gated. Header logo: `loading="eager" fetchpriority="high"`, **never `loading="lazy"`** on the above-the-fold logo. Reserve its box with explicit `width`/`height` to avoid CLS. Target **LCP < 2.5s**.
3. **Self-host fonts.** The live page loads Fraunces + Inter + Inter Tight from Google Fonts (`fonts.googleapis.com`) — a render-blocking third-party round trip and FOIT risk on LCP text. Self-host the **Latin `woff2` subset** of only the weights used, `font-display:swap`, and `<link rel="preload" as="font" type="font/woff2" crossorigin>` the LCP weight(s). Drop the Google preconnects once removed.
4. **Self-host logos, drop Clearbit hotlinks.** Carrier logos hotlinked from `logo.clearbit.com` are a reliability + CLS + indexability liability. Serve `/assets/logos/{carrier}.svg` (SVG preferred), sized, with a build-time monogram fallback rather than runtime `onerror`.
5. **Image budget.** Pages are intentionally near-zero media (CSS-drawn UI) — **keep it that way.** Only allowed images: self-hosted carrier logos and optional per-plan OG share images. No icon-image sprites, no decorative background images, no hero photography. Any genuinely below-fold image is `loading="lazy"` with reserved dimensions.
6. **CLS < 0.1.** Reserve space for: logos, the sticky bars (so they don't reflow content when they engage — `position:sticky` should not cause jump), theme-toggle (apply saved theme via a tiny inline pre-paint script to avoid a flash/shift), and any tooltip that must not push layout (position it absolutely/`::after`, as the package already does).
7. **INP < 200ms.** Keep JS minimal and `defer` non-critical scripts. Sort/filter/compare handlers must be lightweight; avoid layout-thrashing on every keystroke in Smart Match.
8. **Caching/CDN.** Hashed filenames + long `Cache-Control: max-age, immutable` for CSS/JS/font/logos behind a CDN.
9. **No second JS-only render of the matrix.** The comparison table must be the same server-rendered DOM the JS enhances — not a JS rebuild — so crawlers and SR users see identical, stable content (also prevents data drift across surfaces).

---

## 6. DO / DON'T

**DO**
- Adopt the redesign package's a11y bones system-wide: `:focus-visible`, reduced-motion guard, `scope` headers, `<details>` accordions, text-labelled status cells, `aria-pressed`, `aria-live`.
- Add a `<caption>` to the comparison table and make row labels `<th scope="row">`.
- Provide an AA `-text`/`-ink` variant for every accent token; reserve bright accents for fills/large type/3:1 strokes.
- Make tooltips open on tap + focus + hover, dismissible with Esc, with `aria-describedby`.
- Keep one sticky subnav + one compare tray maximum; apply `scroll-margin-top` and tray body-padding.
- Server-render every plan fact; self-host fonts and logos; eager + `fetchpriority` the LCP logo.
- Encode every status with text + icon, never color alone.

**DON'T**
- Don't use `outline:none` anywhere without an equivalent visible replacement.
- Don't ship the gold theme or any `--teal`-as-text/button color without the §1 corrections.
- Don't use `title=` or hover-only tooltips for glossary definitions.
- Don't rebuild the comparison matrix as `<div>` grid without table/ARIA semantics.
- Don't lazy-load the above-the-fold logo or load fonts from a third party.
- Don't stack three sticky layers (alert + subnav + tray) over the mobile viewport.
- Don't leave the compare tray's buttons in the tab order while it is hidden off-screen.
- Don't gate any plan fact behind JavaScript.

---

## 7. Acceptance criteria (for QA scorecard)

- [ ] All text/background pairs ≥ 4.5:1 (≥ 3:1 large text & UI) across **every** theme, using §1 corrected hexes.
- [ ] Visible `:focus-visible` ring ≥ 2px, ≥ 3:1, on every interactive element; no naked `outline:none`.
- [ ] Comparison table has `<caption>`, `scope="col"`/`scope="row"`, scroll region is keyboard-reachable.
- [ ] Tooltips open on tap + focus + hover, are Esc-dismissible and `aria-describedby`-linked.
- [ ] Every coverage/verification/best state has a text + icon signal (color-independent).
- [ ] `prefers-reduced-motion` guard present and neutralizes tray slide, accordion, smooth-scroll, theme transition.
- [ ] Compare tray is `inert`/`aria-hidden` when hidden; announces selection via `aria-live`; never obscures focused content.
- [ ] One sticky subnav + one tray; `scroll-margin-top` prevents anchored-content clipping.
- [ ] All plan facts in `view-source:` (JS disabled); LCP < 2.5s, CLS < 0.1, INP < 200ms on hub + a plan page.
- [ ] Fonts self-hosted (subset woff2, `font-display:swap`, preloaded); carrier logos self-hosted, LCP logo eager + `fetchpriority="high"` with reserved dimensions.

---

*Token sources: live `:root` in `compare-ppo-dental-plans.html` (lines 32–57, plus `[data-theme]` variants ~704–765); redesign `:root` in `_redesign-package/compare-ppo-dental-plans.html` (lines 34–42 light, ~52 warm). Contrast computed via WCAG relative-luminance. CWV/render rules cross-referenced to `seo/improvements/10-images-media-core-web-vitals.md`, `01-indexability-crawlability.md`, and `00-MASTER-PROMPT.md` (Server-rendering rule, Avoid list).*
