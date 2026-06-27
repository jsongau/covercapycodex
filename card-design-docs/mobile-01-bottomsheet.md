# Mobile 01 — `.cc-dock` → Bottom Sheet

**Goal:** On phones, the centered `width:min(430px)` dock becomes a full-width bottom sheet that sits **above** index.html's twin CTA bar (~64px) and never covers it.

**Mechanism:** Add `--cc-cta-bar-h` (default `0`). On index only, set it on `body` to `72px`. The sheet and its collapsed mini-bar both offset from `bottom: calc(var(--cc-cta-bar-h) + env(safe-area-inset-bottom))`.

**Layout rules:**
- Full-width, rounded top corners only, fixed to bottom (above CTA bar).
- Drag handle: 36×4px pill, centered, in a non-scrolling header.
- Height capped at `100dvh` minus top nav (~56px) and the CTA bar; content scrolls internally; header/handle stay pinned.
- Use `dvh` (not `vh`) for mobile-browser chrome. Apply safe-area insets on sides and bottom.
- The 2-office switch/slider lives inside the scroll region.
- Collapsed mini-bar uses the same bottom offset so it also clears the CTA bar.

```css
@media (max-width: 600px) {
  :root { --cc-nav-h: 56px; }              /* default; index sets --cc-cta-bar-h:72px on <body> */

  .cc-dock {
    left: 0; right: 0; width: 100%;
    margin: 0;
    bottom: calc(var(--cc-cta-bar-h, 0px) + env(safe-area-inset-bottom));
    border-radius: 18px 18px 0 0;
    max-height: calc(100dvh - var(--cc-nav-h) - var(--cc-cta-bar-h, 0px));
    display: flex; flex-direction: column;
    padding: 0 max(12px, env(safe-area-inset-left)) 0 max(12px, env(safe-area-inset-right));
    box-shadow: 0 -8px 28px rgba(8,42,48,.18);
  }

  /* Pinned, non-scrolling header with drag handle */
  .cc-dock__handle {
    flex: 0 0 auto;
    padding: 10px 0 6px;
    display: flex; justify-content: center;
    touch-action: none;
  }
  .cc-dock__handle::before {
    content: ""; width: 36px; height: 4px;
    border-radius: 4px; background: var(--line);
  }

  /* Scrolling body — card + 2-office switch live here */
  .cc-dock__body {
    flex: 1 1 auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    padding-bottom: 16px;
  }

  /* Collapsed mini-bar clears the CTA bar too */
  .cc-dock--mini {
    bottom: calc(var(--cc-cta-bar-h, 0px) + env(safe-area-inset-bottom));
    max-height: 64px;
  }
}
```
