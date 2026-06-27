# HD05 — Restore the GOLD <-> JADE Theme Toggle in the Console

Target file: `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`
Scope: ANALYZE / SPEC only. All line numbers reference the file as read on 2026-06-21.

---

## 1. Current state (grounded in real lines)

The toggle was not deleted, it was muted in three places. The machinery is mostly intact.

- **HTML root** carries the default theme: `<html lang="en" data-theme="gold">` (line 2). The mandate wants JADE as the health-tech default, so this attribute must flip to `jade`.
- **Kill switch CSS** at line 102 hides any toggle outright:
  `#cc-ts,.theme-tog{display:none!important}`
  This `!important` rule will override anything, so it must be removed (or scoped off the new element).
- **The toggle markup itself is gone from the console.** The `.toc` sticky console header (lines 858-878) contains only `.toc-brand`, `.toc-links` (`#tocLinks`), and `.toc-cta`. There is no `.theme-switch` node in the DOM, so `document.getElementById('cc-ts')` at line 1933 resolves to `null`.
- **`applyTheme(t, slow)`** (lines 1934-1942) is healthy and reusable: it injects a transient `#cc-theme-transition` style tag for a smooth cross-fade, sets `data-theme` on `<html>`, mirrors `data-active` + `aria-checked` onto `ccTs`, then clears the transition after the duration. No change needed except that `ccTs` must exist.
- **`initTheme()`** (lines 1943-1946) is the disabled stub. It currently just hides `ccTs` and asserts a single palette:
  ```js
  function initTheme(){
    // Single health-tech theme. The gold/jade toggle is retired; :root is the only palette.
    if(ccTs){ccTs.style.display='none';}
  }
  ```
  This is what we replace. It is called once at boot (line 2174 area).
- **The toggle CSS is fully present and untouched** (lines 800-835): `.theme-switch`, `.ts-thumb`, `.ts-opt` (`.ts-gold` / `.ts-jade`), `.ts-dot`, the `data-active="jade"` thumb slide (`transform:translateX(100%)`, line 817), per-theme thumb color (line 816), and the `ts-pulse` flip animation (lines 831-835). The thumb transition at line 814 is `transform 1.8s cubic-bezier(.34,1.18,.64,1)` — a deliberately slow, smooth slide. We keep it.

**Token sets (coordinate with TY03 dual-theme agent):** three palettes are defined — `gold` (lines 737-746), `jade` (lines 768+), and a legacy `maison` (lines 713+). Both `gold` and `jade` already maintain body != link != CTA separation: body text is `--ink` (#082A30), links resolve through `--green` per theme, and the CTA (`.btn-green`) gets an explicit contrast color (`#F6F0E6` for gold line 748, `#FFFFFF` for jade line 779). The toggle only flips `data-theme`; it does not redefine tokens, so it stays compatible as long as TY03 keeps both palettes' body/link/CTA distinct. This memo introduces no new color values.

---

## 2. Where the toggle lives in the new console

Mount it inside the `.toc` `.wrap` (line 861), right-aligned, immediately before `.toc-cta` (line 876). That places it at the far right of the console next to the primary action, compact and out of the link flow. The toggle is `height:38px` and `flex-shrink:0`, matching the console's compact rhythm.

```
.toc > .wrap
  ├─ a.toc-brand        (left)
  ├─ nav.toc-links      (center, flexes)
  ├─ div.theme-switch   ← NEW: right-aligned, before CTA
  └─ a.toc-cta          (right edge)
```

If `.wrap` is not already `display:flex` with the links taking `flex:1`, add a small spacing rule so the switch sits tight to the CTA. A `margin-left:auto` on `.theme-switch` (or on `.toc-links`) pins everything after the brand to the right. Use whichever the existing `.toc .wrap` layout already implies; do not restructure the console.

---

## 3. Markup to insert (the 2-state switch)

Insert directly before line 876 (`<a class="toc-cta" ...>`):

```html
<div class="theme-switch" id="cc-ts" role="switch"
     aria-label="Color theme: Jade health-tech or Gold concierge"
     aria-checked="false" data-active="jade" tabindex="0">
  <span class="ts-thumb" aria-hidden="true"></span>
  <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
  <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
</div>
```

Notes:
- `id="cc-ts"` matches the existing `ccTs` reference (line 1933) and the existing `applyTheme` plumbing (line 1940) with zero JS rename.
- **Order matters.** The CSS thumb starts at `left:4px` and slides `translateX(100%)` only for `data-active="jade"` (line 817). To make JADE the default-left position, JADE is the **first** `.ts-opt` and the thumb's resting state covers it. Set `data-active="jade"` so the thumb sits over the first slot. (The legacy CSS assumed gold-first; with jade as the left/first option the `translateX(100%)` rule should target `gold` instead. See section 5 CSS patch.)
- `role="switch"` + `aria-checked` makes it a real toggle for assistive tech. Keyboard support is wired in section 4.
- No em-dashes in the visible copy.

---

## 4. JS — replace the disabled `initTheme` (lines 1943-1946)

Replace the stub with a wiring function. `applyTheme` is reused unchanged.

```js
function initTheme(){
  if(!ccTs) return;
  ccTs.style.display='';                 // undo any leftover hide
  var THEME='jade';                      // JADE = health-tech default
  applyTheme(THEME, false);              // paint default, no slow fade on boot
  function flip(){
    THEME = (THEME==='jade') ? 'gold' : 'jade';
    ccTs.classList.add('flipping');
    applyTheme(THEME, true);             // slow 1.4s cross-fade on user flip
    setTimeout(function(){ ccTs.classList.remove('flipping'); }, 1800);
  }
  ccTs.addEventListener('click', flip);
  ccTs.addEventListener('keydown', function(e){
    if(e.key===' '||e.key==='Enter'||e.key==='Spacebar'){ e.preventDefault(); flip(); }
  });
  // Persistence: in-memory only. No localStorage in this build.
  // THEME lives in this closure for the page session and resets on reload.
}
```

Behavior:
- On boot, `applyTheme('jade', false)` sets `data-theme="jade"` and `data-active="jade"` with a fast 0.45s transition (effectively instant on first paint).
- Each click/keypress flips the closure var, runs `applyTheme(..., true)` for the deliberate 1.4s luxury cross-fade (the `#cc-theme-transition` style tag handles all elements), and pulses the switch via `.flipping`.
- **Memory-only persistence:** the active theme is the `THEME` closure variable. There is no `localStorage`, `sessionStorage`, or cookie write, satisfying the no-localStorage constraint. State survives in-page navigation/interactions but resets on full reload back to JADE.

---

## 5. Required CSS edits

1. **Remove the kill switch.** Delete `#cc-ts` from line 102. Either drop the whole rule if `.theme-tog` is also retired, or narrow it to `.theme-tog{display:none!important}`. As long as `#cc-ts` stays in that `!important` selector the toggle can never show.

2. **Fix the default thumb side for JADE-first.** The legacy rule assumed GOLD on the left. With JADE as the first option, flip the slide target at line 817:
   ```css
   /* was: .theme-switch[data-active="jade"] .ts-thumb{transform:translateX(100%)} */
   .theme-switch[data-active="gold"] .ts-thumb{transform:translateX(100%)}
   ```
   And mirror the active-label rules (lines 827-830) so JADE-active lights the first slot and GOLD-active lights the second. The thumb default color should be jade; line 816 already paints jade under `[data-theme="jade"]`, so the resting thumb is correct once `data-theme="jade"` is the boot default.

3. **Flip the HTML default** at line 2: `<html lang="en" data-theme="jade">` so first paint is health-tech jade even before JS runs (avoids a gold flash).

4. **Right-align in console.** Add `margin-left:auto` to `.theme-switch` (or ensure `.toc-links{flex:1}`) so it pins to the right edge beside `.toc-cta`. Add a small gap (`margin-right:10px`) between the switch and the CTA.

---

## 6. Smooth-transition guarantee

The cross-fade is already centralized: `applyTheme` injects
`html,html *{transition:background <dur> ease,color <dur> ease,border-color <dur> ease,box-shadow <dur> ease !important}`
(line 1938), applies for 1.4s on user flips, then self-clears (line 1941) so the transition does not linger and slow normal interaction. The thumb itself slides on its own 1.8s spring (line 814). No extra transition CSS is needed beyond the existing `.theme-switch` / `.ts-thumb` rules.

---

## 7. Net change list (for the implementer)

- Line 2: `data-theme="gold"` -> `data-theme="jade"`.
- Line 102: remove `#cc-ts` from the `display:none!important` selector.
- Line 817 + 827-830: invert active-side logic so JADE is the default left slot.
- Before line 876: insert the `#cc-ts` `.theme-switch` markup.
- Add `margin-left:auto` (+ small right gap) to `.theme-switch`.
- Lines 1943-1946: replace `initTheme` stub with the wiring function in section 4.
- No new tokens, no new colors, no localStorage, no em-dashes.
