# Mobile 02 — Touch Interactions: Dentist Result Sheet

Slide-up sheet. 2 offices: a **Nearest / Most reviews** segmented toggle. 3+ offices: a horizontal pager (full-width slides, dots + chevrons).

## Touch behaviors
- **Swipe left/right** on the pager track moves between offices. Threshold ~40px; horizontal intent only (ignore if `|dy| > |dx|`). Calls existing `prev()` / `next()` — never bypasses them, so dots/chevrons/keyboard stay in sync.
- **Swipe down** on the drag-handle area dismisses the sheet via existing `close()` (threshold ~60px downward).
- **passive listeners** on move where we don't `preventDefault`; only block default once horizontal swipe is locked to avoid scroll-fighting.

## Accessibility / targets
- Do not replace click/keydown handlers — touch is additive.
- All tap targets `min-height/width: 44px`: toggle options, chevrons, dots, Book, Share.
- Keep `aria-selected` on toggle, `aria-current` on active dot; chevrons keep `aria-label`.
- Respect `prefers-reduced-motion` for the slide transition.

```js
// Pager swipe -> existing prev()/next()
const track = document.querySelector('.cc-pager-track');
let x0=0,y0=0,lock=null;
track.addEventListener('touchstart',e=>{const t=e.touches[0];x0=t.clientX;y0=t.clientY;lock=null;},{passive:true});
track.addEventListener('touchmove',e=>{const t=e.touches[0],dx=t.clientX-x0,dy=t.clientY-y0;
  if(lock===null&&(Math.abs(dx)>8||Math.abs(dy)>8))lock=Math.abs(dx)>Math.abs(dy)?'x':'y';
  if(lock==='x')e.preventDefault();},{passive:false});
track.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-x0;
  if(lock==='x'&&Math.abs(dx)>40)(dx<0?next:prev)();},{passive:true});

// Swipe-down on handle -> close()
const handle=document.querySelector('.cc-sheet-handle');
let hy=0;
handle.addEventListener('touchstart',e=>{hy=e.touches[0].clientY;},{passive:true});
handle.addEventListener('touchend',e=>{if(e.changedTouches[0].clientY-hy>60)close();},{passive:true});
```

```css
.cc-pager-track{touch-action:pan-y;} /* let vertical scroll through, we own horizontal */
.cc-sheet-handle{min-height:44px;touch-action:none;}
.cc-toggle-opt,.cc-pager-chevron,.cc-pager-dot,.cc-btn-book,.cc-btn-share{min-width:44px;min-height:44px;}
.cc-pager-dot[aria-current="true"]{background:var(--mint);} /* #5BE0A0 */
@media (prefers-reduced-motion:reduce){.cc-pager-track{transition:none;}}
```
