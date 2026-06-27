# Mobile 05 — Search-to-Result Flow (Phones, ≤1080px)

## Feel
Calm concierge handoff, not a page reload. User taps the drawer's ZIP/city field, picks an omni suggestion, and the answer rises to meet them. The drawer's job ends the moment a search resolves.

## Behaviour
- **Drawer:** the slide-in nav holds the ZIP/city input + omni autocomplete. Suggestions are full-width rows, min 48px tall, finger-tappable, and the list scrolls inside the drawer (never the page behind).
- **On select:** drawer closes (slide out + scrim fade), result mounts as a **full-width bottom sheet over the page** — not inside the drawer. It is the page's foreground; the drawer is gone.
- **Stacking order:** page < existing bottom CTAs < scrim < result sheet. The sheet sits ABOVE the sticky bottom CTAs and visually replaces them while open; CTAs return on dismiss.
- **Sheet:** rounded top, drag handle, swipe-down or tap-scrim to dismiss, internal scroll, max-height 88vh.
- **Browse all dentists / claim cards:** stack to one column, full-bleed, 16px gutters, generous tap targets; claim card CTA goes full-width below its copy.

## CSS
```css
@media (max-width: 1080px) {
  .uni-drawer { position: fixed; inset: 0 auto 0 0; width: min(86vw, 360px); }
  .omni-suggestions { max-height: 60vh; overflow-y: auto; -webkit-overflow-scrolling: touch; }
  .omni-suggestion { min-height: 48px; display: flex; align-items: center; }

  .result-sheet {
    position: fixed; left: 0; right: 0; bottom: 0;
    width: 100%; max-height: 88vh; overflow-y: auto;
    border-radius: 18px 18px 0 0; z-index: 1200; /* > sticky CTAs */
    transform: translateY(100%); transition: transform .28s ease;
  }
  .result-sheet.open { transform: translateY(0); }
  .result-scrim { position: fixed; inset: 0; z-index: 1100; }

  body.sheet-open .sticky-cta { visibility: hidden; }

  .browse-grid, .claim-cards { grid-template-columns: 1fr; gap: 16px; padding: 0 16px; }
  .claim-card .cta { width: 100%; }
}
```
