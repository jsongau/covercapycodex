# lux-07 — Slide-up Result Card Typography

Editorial type system for the slide-up dentist card: single result and two "main character" cards.

## Type roles
- **Featured tag** — small-caps, Fraunces 11px, tracking +0.14em, gold #C9A24A on teal #0E3F44. One hairline rule under it.
- **Name** — Fraunces 500, 26px / 30px leading, tracking -0.01em, ink #14242A. Drops to 22px on the two-up card.
- **Rating + sources** — system sans 13px; numerals tabular. "Google · Yelp · Zocdoc" as small-caps labels, ink-soft.
- **Distance / address / phone** — system sans 13px, tabular numerals so digits align across stacked rows.
- **Hairline rules** — 1px #8A6A23 at 24% opacity, separating tag, body, and CTA band.
- **CTAs** — sentence-case, system sans 14px, tracking +0.02em: "Book appointment", "View dentist profile", "Share".

Palette: teal #1B5E5A/#0E3F44, ivory, cream, gold #C9A24A/#8A6A23, ink #14242A.

```css
.card-tag{font-family:"Fraunces",serif;font-size:11px;font-variant:small-caps;
  letter-spacing:.14em;color:#C9A24A;background:#0E3F44}
.card-name{font-family:"Fraunces",serif;font-weight:500;font-size:26px;
  line-height:30px;letter-spacing:-.01em;color:#14242A}
.card-name--twoup{font-size:22px;line-height:26px}
.card-meta,.card-rating{font-family:system-ui,sans-serif;font-size:13px;
  font-variant-numeric:tabular-nums;color:#14242A}
.card-source{font-variant:small-caps;letter-spacing:.06em;color:#5A6E70}
.card-rule{height:1px;background:#8A6A23;opacity:.24;border:0}
.card-cta{font:14px/1 system-ui,sans-serif;letter-spacing:.02em;text-transform:none}
```
