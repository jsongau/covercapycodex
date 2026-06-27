# DH9 — Header Dropdown & Sub-Nav Motion Spec

**Agent:** DH9 (microinteraction & motion)
**Scope:** Header dropdown sub-menu, sticky sub-nav active-pill, nav item hover/tap, sticky-band condense-on-scroll, reduced-motion fallbacks.
**Theme:** T5 jade (greens) — aligned to compare-ppo header tokens.
**Date:** June 2026

---

## CONTEXT (current state)

Source of truth: `compare-ppo-dental-plans.html` header.

- `.mnav a` items carry a caret `.ca` (font-size 9px, opacity .5) — implies a dropdown but **no panel is currently built**. DH9 specs the panel motion so DH-impl can wire it.
- `.toc` is the sticky compact sub-nav (`position:sticky;top:0;z-index:60`) with a `.toc-prog` 2px progress bar and `.toc-links a` items that use a bottom `border-color` as the active marker (`.on` / `:hover`).
- All easing must read as *settle*, never *spring*. No bounce, no glassmorphism beyond the existing `.toc` backdrop-blur, no animation longer than 180ms.

**Tokens reused:** `--green:#2E5E45`, `--green-l:#5C7A66`, `--ink-soft:#3A4A42`, `--line`, `--card`, `--shadow`.

---

## MOTION PRINCIPLES

1. **One property does the work, one supports it.** Opacity carries presence; a 4–6px translate adds direction. Never animate width/height/layout.
2. **Open is slightly slower than the eye expects; close is faster.** Open ~140ms, close ~110ms — closing should feel like getting out of the way.
3. **GPU-only transforms** (`transform`, `opacity`). No `top`/`left`/`margin` transitions.
4. **Easing = ease-out for entrances, ease-in for exits.** Standard cubic-beziers below — no overshoot curves.
5. **Active state is a transition, not an animation.** The sub-nav pill/underline *slides* between items; it never fades in place.

### Shared easing tokens (add to `:root`)
```css
--ease-out:  cubic-bezier(.22,.61,.36,1);   /* entrances, settle */
--ease-in:   cubic-bezier(.55,.06,.68,.19);  /* exits */
--ease-soft: cubic-bezier(.4,0,.2,1);        /* state slides (pill) */
```

---

## 1. DROPDOWN OPEN / CLOSE

Fade + slight downward translate. Panel anchored under the `.mnav` item.

```css
.mnav-panel{
  opacity:0;
  transform:translateY(-6px);
  pointer-events:none;
  transition:opacity 140ms var(--ease-out),
             transform 140ms var(--ease-out);
  /* surface */
  background:var(--card);
  border:1px solid var(--line);
  border-radius:14px;
  box-shadow:var(--shadow);
}
.mnav-item[aria-expanded="true"] .mnav-panel,
.mnav-panel.open{
  opacity:1;
  transform:translateY(0);
  pointer-events:auto;
}
/* close is faster + ease-in */
.mnav-panel.closing{
  transition:opacity 110ms var(--ease-in),
             transform 110ms var(--ease-in);
  opacity:0;
  transform:translateY(-4px);
}
/* caret rotates with the panel */
.mnav-item .ca{transition:transform 140ms var(--ease-out),opacity 140ms var(--ease-out)}
.mnav-item[aria-expanded="true"] .ca{transform:rotate(180deg);opacity:.9}
```

- **Hover-intent delay:** open after **90ms** hover, close after **180ms** of leave (prevents flicker when crossing the gap between trigger and panel). Implement in JS via `setTimeout`, not CSS.
- **Inner items** may stagger by **20ms each, capped at 3 items**, fading from `opacity:0;translateY(-3px)`. Optional, drop on reduced-motion. Keep total stagger ≤60ms.

---

## 2. STICKY SUB-NAV ACTIVE PILL

The `.toc-links` active marker should **slide** between items rather than each border fading independently. Two valid implementations:

**A. Sliding underline (preferred, matches current border style)** — a single absolutely-positioned 2px bar under `.toc-links`, moved by `transform:translateX()` + `width`:
```css
.toc-ink{
  position:absolute;bottom:0;height:2px;background:var(--green);
  transition:transform 200ms var(--ease-soft), width 200ms var(--ease-soft);
}
```

**B. Per-link fallback** (no JS) — keep current `border-color`, just give it a transition:
```css
.toc-links a{border-bottom:2px solid transparent;
  transition:color 130ms var(--ease-soft), border-color 130ms var(--ease-soft);}
.toc-links a:hover,.toc-links a.on{color:var(--ink);border-color:var(--green)}
```

Color crossfade on the *label* runs **130ms** regardless of method.

---

## 3. NAV ITEM HOVER / TAP FEEDBACK

```css
.mnav a{transition:color 130ms var(--ease-soft);}
.mnav a:hover{color:var(--green);}
/* tap: brief, no movement on touch */
.mnav a:active{transition:color 60ms var(--ease-in);}
```

- **Desktop hover:** color shift `--ink-soft → --green` over **130ms**. No translate (translate is reserved for the dropdown panel — keeps the bar feeling stable).
- **Touch/tap:** color snaps in **60ms** on `:active`, releases on the standard 130ms. No hover-translate on touch devices.
- **CTA buttons** (`.btn`) keep their existing `transition:.15s` — leave untouched; consistent with site-wide buttons.

---

## 4. STICKY-BAND CONDENSE-ON-SCROLL

The `.toc` band condenses when the user scrolls past the hero. Animate **height, padding, and font-size via a `.condensed` class** — transition only the cheap-ish properties and accept a one-time reflow (band is fixed-position, isolated, so cost is negligible). Prefer transitioning `--toch` height + label scale.

```css
.toc{transition:height 160ms var(--ease-out),
              box-shadow 160ms var(--ease-out),
              background-color 160ms var(--ease-out);}
.toc.condensed{
  height:46px;                              /* from 52px (--toch) */
  box-shadow:0 6px 18px rgba(33,48,42,.08); /* lift appears only when condensed */
}
.toc.condensed .toc-links{font-size:12.5px;transition:font-size 160ms var(--ease-out);}
```

- Trigger via `IntersectionObserver` on the hero (not a scroll listener) — toggles `.condensed`. **Add a 1px hysteresis / `rootMargin` buffer** so it doesn't thrash at the threshold.
- `.toc-prog` progress bar keeps its existing `transition:width .1s linear` — correct for a continuous scroll readout; do not change.
- The condensed lift (box-shadow) is the *only* new shadow — no shadow in the resting state, matching the founder's "flat until it matters" feel.

---

## 5. `prefers-reduced-motion` FALLBACKS

All motion collapses to **instant, opacity-only, zero transform**.

```css
@media (prefers-reduced-motion: reduce){
  .mnav-panel,
  .mnav-panel.closing,
  .mnav-item .ca,
  .toc, .toc.condensed .toc-links,
  .toc-ink, .toc-links a,
  .mnav a{
    transition-duration:0ms !important;
    transition-delay:0ms !important;
  }
  .mnav-panel{transform:none !important;}
  .mnav-panel.open,.mnav-item[aria-expanded="true"] .mnav-panel{transform:none !important;}
  .mnav-item[aria-expanded="true"] .ca{transform:none !important;} /* caret swaps glyph, no spin */
  .toc-ink{display:none;}            /* fall back to per-link border (method B) */
  .toc-links a{transition:none;}
  /* inner-item stagger disabled — items appear together */
}
```

- Dropdown still **fades** (presence cue retained) but never translates. If even fade is undesirable, set panel `opacity:1` on open instantly — acceptable.
- Caret: swap to a static rotated glyph rather than animating rotation.
- Active pill: drop the sliding `.toc-ink`, revert to instant `border-color` on `.on`.

---

## TIMING TABLE

| Interaction | Property animated | Duration | Easing | Reduced-motion |
|---|---|---|---|---|
| Dropdown open | opacity + translateY(-6→0) | 140ms | `--ease-out` | instant fade, no translate |
| Dropdown close | opacity + translateY(0→-4) | 110ms | `--ease-in` | instant |
| Hover-intent open delay | — (JS) | 90ms delay | — | 0ms (immediate) |
| Hover-intent close delay | — (JS) | 180ms delay | — | 0ms |
| Caret rotate | transform rotate(180deg) | 140ms | `--ease-out` | glyph swap, no spin |
| Inner-item stagger | opacity + translateY(-3→0) | 20ms/item, ≤60ms | `--ease-out` | disabled |
| Sub-nav active pill slide | transform translateX + width | 200ms | `--ease-soft` | none (per-link border) |
| Sub-nav label crossfade | color | 130ms | `--ease-soft` | instant |
| Nav item hover | color | 130ms | `--ease-soft` | instant |
| Nav item tap (`:active`) | color | 60ms | `--ease-in` | instant |
| Sticky-band condense | height + box-shadow + bg | 160ms | `--ease-out` | instant |
| Condensed label shrink | font-size | 160ms | `--ease-out` | instant |
| Scroll progress bar | width | 100ms | linear | unchanged |

---

## TOP 3 RECOMMENDATIONS

1. **Slide the sub-nav active marker, don't fade per-link borders (method A).** This single sliding underline is the highest-impact "interactive feel" upgrade for the least cost — one element, two GPU properties. It's the detail that reads as premium versus a static border swap.

2. **Use hover-intent JS delays (90ms open / 180ms close), not pure CSS `:hover`.** Caret-style dropdowns flicker badly when the cursor crosses the gap to the panel. The asymmetric delay is what makes the dropdown feel deliberate rather than twitchy — and it costs ~10 lines of JS.

3. **Trigger condense with `IntersectionObserver` + hysteresis, not a scroll handler — and keep the resting band shadowless.** The shadow appearing *only* when condensed is the founder's "flat until it matters" cue; an IO with a `rootMargin` buffer prevents threshold-thrash that would otherwise make the lift strobe on/off near the fold.
