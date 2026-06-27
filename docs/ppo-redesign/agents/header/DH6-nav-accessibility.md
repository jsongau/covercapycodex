# DH6 — Header Dropdown Navigation Accessibility Spec

**Scope:** WCAG 2.2 AA accessibility for the new header dropdown navigation on the Compare PPO main hub (`compare-ppo-dental-plans.html`). Covers the top-level header links and their text sub-menus.
**Standard:** WCAG 2.2 Level AA. SC of record: 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11, 2.4.13, 1.4.1, 1.4.11, 1.4.13, 2.3.3, 4.1.2.
**Source inputs:** `06-accessibility-performance.md` (focus-visible/reduced-motion/non-color rules), live nav (`.mnav`, `.di-hub-links` with `aria-current="page"`, themed `--green`/`--gold` tokens). Note: `05-APPROVED-DESIGN-SYSTEM.md` is referenced upstream but not present in the repo; tokens taken from the live `:root`.

---

## 1. Pattern choice — Disclosure, NOT a menu widget

**Use the disclosure pattern: an `aria-expanded` toggle `<button>` revealing a plain list of `<a href>` links.** Do **not** use the ARIA `role="menu"/menuitem` (application) pattern.

Rationale:
- The sub-menu is **navigation** (a list of page links), not a set of application commands. The APG explicitly recommends the disclosure pattern for nav; `role="menu"` is for actions and imposes a heavyweight keyboard contract (arrow-only, Home/End, type-ahead, `tabindex="-1"` roving) that breaks user expectations for links and is fragile to implement.
- Disclosure degrades gracefully: every item is a real link, crawlable (SEO §5 server-render rule) and usable with JS disabled.
- It is the simplest robust thing that passes 4.1.2 and 2.1.1.

**Hard rule:** every dropdown item is a real, focusable `<a href>`. No `<div onclick>`, no `<span role="link">`, no JS-only handlers. The top-level trigger is a `<button type="button">` (not a link) because it toggles a panel rather than navigating.

---

## 2. ARIA markup pattern

```html
<nav class="cc-nav" aria-label="Primary">
  <ul class="cc-nav__list">

    <!-- Simple top-level link (no children) -->
    <li>
      <a href="/find-my-dentist">Find a dentist</a>
    </li>

    <!-- Dropdown: disclosure button + link list -->
    <li class="cc-nav__group">
      <button type="button"
              class="cc-nav__toggle"
              id="nav-plans-btn"
              aria-expanded="false"
              aria-controls="nav-plans-menu">
        Compare plans
        <svg class="cc-nav__caret" aria-hidden="true" focusable="false" viewBox="0 0 16 16">
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </button>

      <ul class="cc-nav__menu" id="nav-plans-menu" role="list" hidden>
        <li><a href="/compare-ppo-dental-plans/" aria-current="page">Compare PPO plans</a></li>
        <li><a href="/dental-insurance-no-waiting-period/">No waiting period</a></li>
        <li><a href="/dental-insurance-immediate-coverage/">Need coverage now</a></li>
        <li><a href="/dental-insurance-glossary/">PPO terms glossary</a></li>
      </ul>
    </li>

  </ul>
</nav>
```

Notes:
- `aria-expanded` lives on the **button** and flips `true`/`false` in JS as the panel opens/closes. It is the single source of truth — the caret rotates from it via CSS (`[aria-expanded="true"] .cc-nav__caret`), not a separate class.
- `aria-controls` points to the panel `id` (association for AT).
- The panel is hidden with the **`hidden` attribute** (or `display:none`), which removes its links from the tab order natively when closed — no manual `tabindex` juggling, no off-screen focus trap.
- `aria-current="page"` marks the active hub item (see §5). Do not put `aria-current` on the toggle button.
- The caret `<svg>` is `aria-hidden="true" focusable="false"` so it is never announced or tabbed to.

---

## 3. Keyboard model

The trigger is a native `<button>`, so it is keyboard-operable for free. Menu items are native links. Minimum behavior:

| Key | On the toggle button | Inside an open panel |
|---|---|---|
| **Tab** | Moves to the button; if panel is open, next Tab moves to the **first link** in the panel (DOM order); Tab past the last link closes the panel and moves to the next top-level item | Tab moves through the links in order; Tab off the last link closes the panel |
| **Shift+Tab** | Standard reverse order | Moving back past the first link returns focus to the toggle button |
| **Enter / Space** | Toggle the panel open/closed; when opening, optionally move focus to first link | Activates the focused link (native) |
| **Esc** | (no-op / nothing open) | Closes the panel **and returns focus to the toggle button** (SC 2.1.2 no keyboard trap; matches APG disclosure) |
| **Down / Up arrow** (optional enhancement) | Down opens panel + focuses first link; Up opens + focuses last | Down/Up move between links; do not wrap unless desired |

Rules:
- **No keyboard trap (2.1.2):** Tab and Shift+Tab must always be able to leave the menu. Esc must always escape and restore focus to the button.
- **Arrow keys are a progressive enhancement only.** Because items are real links and the panel is `hidden`-toggled, Tab alone already satisfies 2.1.1. Arrow support is nice-to-have, not required for AA.
- **Click/tap outside** the open panel closes it (pointer parity). A `pointerdown` on `document` outside `.cc-nav__group` sets `aria-expanded="false"`.
- **Never hover-only.** Opening on hover is allowed as an *enhancement* on pointer devices, but the panel MUST be fully operable by keyboard and by tap. The disclosure button click is the canonical open path; hover must not be the only way in (SC 2.1.1 / 1.4.13 spirit). On touch, the first tap opens (it must not immediately navigate or instantly close).

---

## 4. Focus management & visible focus ring

- **Visible focus on every interactive element** — the toggle buttons and all links. Never `outline:none` without an equal replacement (SC 2.4.7).
- Focus ring per the system rule, using the AA-safe gold text token for the ring color:

```css
.cc-nav__toggle:focus-visible,
.cc-nav__menu a:focus-visible {
  outline: 2px solid var(--gold-text);   /* #8A6721 — AA-corrected gold, clears 3:1 */
  outline-offset: 2px;
  border-radius: 4px;
}
```
  - **Ring contrast (SC 2.4.13):** ring ≥ 2px and ≥ 3:1 against the adjacent surface. Bright brand `--gold #C0902E` is **2.54:1 as a line on paper — do not use it for the ring.** Use `--gold-text #8A6721` (the AA `-text` variant), which clears 3:1. On the dark teal hub-nav strip (`.di-hub`), use a light ring (`#F4EFE2` / mint) instead so it clears 3:1 against teal.
- **Focus not obscured (SC 2.4.11):** the header is sticky; the open panel must render **above** page content (`z-index` over the sticky header, never clipped by `overflow:hidden`) so a focused link is fully visible.
- **Focus restoration:** closing via Esc returns focus to the toggle button. Opening must not silently steal focus unless the user pressed Enter/Space/Down to open (then move to first link). A hover-open must NOT move focus.
- **Roving tabindex is NOT used** — links are normal tab stops; the `hidden` attribute handles closed-panel exclusion.

---

## 5. `aria-current` for the active hub

- The link to the page the user is on gets `aria-current="page"` (matches the existing live `.di-hub-links` and `<a ... aria-current="page">Compare plans</a>` pattern).
- If a **parent** group contains the active page, you MAY also reflect that on the group toggle, but the page-level signal is `aria-current="page"` on the leaf link only. Do not put `aria-current="page"` on more than one link.
- **Active state must not rely on color alone (SC 1.4.1):** pair `aria-current="page"` with a non-color signal — bold weight + an underline or left border. The live hub already does this (`background` + `border-color` change on `[aria-current="page"]`); keep a text-weight/underline cue too.

---

## 6. Screen-reader labels

- `<nav aria-label="Primary">` on the header nav. If a second nav exists (resource hub strip), give it a distinct label (`aria-label="Dental insurance resource hub"`, already present) so the two `<nav>` landmarks are distinguishable.
- Each toggle button's **accessible name is its visible text** ("Compare plans"). The caret svg is `aria-hidden`, so it does not pollute the name. Do not add a redundant `aria-label` that duplicates or contradicts the visible label (2.5.3 label-in-name).
- `aria-expanded` conveys open/closed state to AT automatically — no extra "expanded/collapsed" text needed.
- Links use their visible text as the name. If two links share text across groups, disambiguate with visible context, not hidden `aria-label`, where possible.

---

## 7. Reduced motion for the dropdown reveal

- Default reveal may use a short transform/opacity fade (≤ ~150ms). Under reduced-motion, the panel appears instantly with no slide:

```css
.cc-nav__menu {
  transition: opacity .14s ease, transform .14s ease;
}
@media (prefers-reduced-motion: reduce) {
  .cc-nav__menu { transition: none; }
  *,*::before,*::after { transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```
- This honors the system-wide guard from audit §4 (the live page currently ships NO reduced-motion guard — add it). Caret rotation must also be neutralized under reduced motion.
- No auto-opening, no looping/parallax motion on the nav.

---

## 8. Acceptance criteria (QA)

- [ ] Every dropdown item is a real `<a href>`; top-level toggles are `<button type="button">`.
- [ ] Disclosure pattern: `aria-expanded` on button, `aria-controls` → panel `id`, panel `hidden` when closed.
- [ ] Operable by keyboard (Tab/Enter/Space), tap, AND hover — never hover-only. No keyboard trap.
- [ ] Esc closes the panel and returns focus to the toggle button.
- [ ] Visible `:focus-visible` ring ≥ 2px, ≥ 3:1, using `--gold-text` (light ring on dark teal strip) — no naked `outline:none`.
- [ ] Active hub link has `aria-current="page"` + a non-color (weight/underline) cue.
- [ ] `<nav aria-label="…">` on each nav landmark; toggle accessible name = visible text; caret svg `aria-hidden`.
- [ ] `prefers-reduced-motion` neutralizes the reveal transition and caret rotation.
- [ ] Open panel renders above sticky header, not clipped, focused link never obscured (2.4.11).
