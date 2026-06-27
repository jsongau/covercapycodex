# Mobile 04 — Result Sheet Accessibility & Safe-Area

**Role & labeling.** Mark the sheet `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing at the sheet title. If the sheet is non-blocking (page stays scrollable behind), drop `aria-modal` and use `role="region"` + `aria-label="Dentist results"` so it does not falsely trap AT.

**Focus.** On open, move focus to the sheet (or its heading via `tabindex="-1"`). Trap Tab inside while modal. Cache the trigger element; on close, restore focus to it. Esc and the close button both dismiss.

**Close button.** Minimum 44x44px hit area, `aria-label="Close results"`, visible focus ring.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, disable the slide `transform`/`transition` — fade or appear instantly.

**Contrast.** Body and small text must hit 4.5:1. Use `--ink` (#082A30) on ivory `--cream-card`; never gold `--gold-soft` text on ivory for small copy. Mint is button text on dark only.

**Safe area.** Pad with `env(safe-area-inset-bottom/top)` so CTAs clear the home indicator and notch.

**Pager.** Announce position via `aria-live="polite"`: "Office 2 of 3".

```html
<section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-h" tabindex="-1">
  <button class="sheet__close" aria-label="Close results">×</button>
  <h2 id="sheet-h">Dentist results</h2>
  <p class="sr-only" aria-live="polite">Office 2 of 3</p>
</section>
```
```css
.sheet{
  background:var(--cream-card); color:var(--ink);
  transform:translateY(0); transition:transform .28s ease;
  padding-bottom:calc(16px + env(safe-area-inset-bottom));
  padding-top:env(safe-area-inset-top);
}
.sheet[hidden]{transform:translateY(100%)}
.sheet__close{min-width:44px;min-height:44px}
.sheet__close:focus-visible{outline:2px solid var(--teal-700);outline-offset:2px}
.sr-only{position:absolute;width:1px;height:1px;clip:rect(0 0 0 0);overflow:hidden}
@media (prefers-reduced-motion:reduce){
  .sheet{transition:none;transform:none}
}
```
