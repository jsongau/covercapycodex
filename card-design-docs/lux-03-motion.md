# lux-03 — Slide-up dentist result card: motion

**Scope:** single result card and the two "main character" cards (Featured Platinum Elite tag, name, rating with Google / Yelp / Zocdoc, distance, address, phone, and the actions Book appointment, View dentist profile, Share).

## Reveal
Cards rise from 18px with a soft fade over 520ms on a gentle ease-out. When two cards land together, the second is delayed 90ms so they stagger instead of snapping in unison. The Platinum Elite tag settles 120ms after its card, a small confirming beat in gold.

## Hover depth
On hover the card lifts 4px and the shadow deepens from a 10px to a 22px spread; the ink border warms toward teal. Buttons get a 1px press on click.

## Share feedback
On share, a small "Link copied" pill fades up beside the button for 1.6s in cream over teal, then fades out. No motion fires for users who prefer reduced motion: reveals become instant fades, hover lifts flatten, the pill simply appears and clears.

```css
:root{--teal:#1B5E5A;--teal-deep:#0E3F44;--ivory:#FFFDF6;--cream:#F4ECD8;--gold:#C9A24A;--gold-deep:#8A6A23;--ink:#14242A;}
.dcard{transform:translateY(18px);opacity:0;animation:rise .52s cubic-bezier(.22,.61,.36,1) forwards;
  background:var(--ivory);border:1px solid color-mix(in srgb,var(--ink) 12%,transparent);border-radius:16px;
  transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;box-shadow:0 10px 22px -16px var(--ink);}
.dcard:nth-of-type(2){animation-delay:.09s;}
.dcard:hover{transform:translateY(-4px);box-shadow:0 22px 40px -22px var(--ink);border-color:color-mix(in srgb,var(--teal) 40%,transparent);}
.dcard .tag{opacity:0;animation:rise .4s ease-out .12s forwards;color:var(--gold-deep);background:var(--cream);}
.dcard button:active{transform:translateY(1px);}
.share-pill{opacity:0;transform:translateY(6px);background:var(--teal);color:var(--cream);
  border-radius:999px;padding:4px 10px;font:500 13px/1 system-ui;}
.share-pill.show{animation:pill 1.6s ease forwards;}
@keyframes rise{to{transform:translateY(0);opacity:1;}}
@keyframes pill{0%{opacity:0;transform:translateY(6px);}14%,80%{opacity:1;transform:translateY(0);}100%{opacity:0;}}
@media (prefers-reduced-motion:reduce){
  .dcard,.dcard .tag{animation:fade .2s ease forwards;transform:none;}
  .dcard:hover{transform:none;}
  .share-pill.show{animation:none;opacity:1;transform:none;}
  @keyframes fade{to{opacity:1;}}
}
