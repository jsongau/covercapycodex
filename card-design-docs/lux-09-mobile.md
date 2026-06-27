# Lux-09 — Mobile Dentist Result Dock

Slide-up bottom sheet for small screens. Holds one or two Featured Platinum Elite cards as a vertical snap-scroll.

## Behavior
- Sheet rises from the bottom edge, resting at 88% height; a drag handle (40px ivory pill) sits centered at top for grab-and-pull.
- Drag down past 35% to dismiss; flick up to lock full height.
- On inward scroll the sheet collapses to a 64px gold-edged bar showing the top card name plus rating; tap to re-expand.
- Two cards stack vertically with `scroll-snap-type: y mandatory`, each card a full snap stop so one card fills the thumb zone at a time.

## Card content
Featured Platinum Elite tag (gold #C9A24A on teal), name in Fraunces, rating with Google, Yelp, Zocdoc marks, distance, address, phone.

## Actions (thumb-reachable, bottom third)
Book appointment (filled teal), View dentist profile, Share. Sentence-case, no arrows.

## Safe area
Sheet padding respects `env(safe-area-inset-bottom)` so CTAs clear the home indicator.

```css
.dock-sheet{
  position:fixed;left:0;right:0;bottom:0;
  max-height:88dvh;background:var(--ivory,#FBF7EE);
  border-radius:20px 20px 0 0;
  box-shadow:0 -8px 28px rgba(20,36,42,.22);
  padding-bottom:calc(16px + env(safe-area-inset-bottom));
  transform:translateY(0);transition:transform .28s cubic-bezier(.2,.7,.2,1);
}
.dock-handle{
  width:40px;height:4px;margin:10px auto 6px;border-radius:99px;
  background:#E6DEC9;
}
.dock-scroll{
  overflow-y:auto;scroll-snap-type:y mandatory;
  -webkit-overflow-scrolling:touch;
}
.dock-card{scroll-snap-align:start;scroll-snap-stop:always;}
.dock-sheet[data-state="bar"]{
  transform:translateY(calc(88dvh - 64px));
  border-top:2px solid var(--gold,#C9A24A);
}
.dock-tag{background:#0E3F44;color:#C9A24A;font:600 11px/1 system-ui;}
.dock-name{font:500 20px/1.2 "Fraunces",serif;color:#14242A;}
.dock-book{background:#1B5E5A;color:#FBF7EE;border-radius:12px;}
```
