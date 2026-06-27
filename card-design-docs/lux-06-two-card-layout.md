# Lux-06 — Two-Card Dock Layout

## Intent
When a county-level search returns two Platinum Elite offices in range, both are co-leads. Neither dominates. The dock is a calm, ivory slide-up panel where two identical cards sit side by side as equal main characters.

## Stack header
Set above the cards in Fraunces serif, ink #14242A: "2 Platinum Elite offices near Los Angeles County." A thin gold #C9A24A hairline underline anchors it. The count is literal and quiet, no flourish.

## Two-card balance
- Cards share one format, one width, one height. Use `align-items: stretch` so the shorter card matches the taller; ragged bottoms break the equality.
- A 20px gap reads as deliberate breathing room, not a seam.
- Both carry the same gold "Featured Platinum Elite" tag, same rating row (Google, Yelp, Zocdoc), same three actions (Book appointment, View dentist profile, Share) in cream-backed buttons.

## Scroll behavior
The dock caps its height; the card row scrolls within. Tall cards keep equal height and scroll together as a unit, never independently.

## Single result
One card centers at the same width, flanked by a soft cream note: "One office matched your range." It reads chosen, not sparse.

```css
.cc-dock{background:#FFFDF9;border-top:1px solid #C9A24A;padding:20px;max-height:78vh;overflow:hidden;display:flex;flex-direction:column}
.cc-dock__head{font-family:Fraunces,serif;color:#14242A;font-size:19px;padding-bottom:12px;border-bottom:1px solid #C9A24A}
.cc-cards{display:grid;grid-template-columns:repeat(2,minmax(430px,1fr));gap:20px;align-items:stretch;overflow-y:auto;padding-top:16px}
.cc-cards--single{grid-template-columns:minmax(430px,560px);justify-content:center}
.cc-card{display:flex;flex-direction:column;background:#FFFDF9;border:1px solid #F4EDDF;border-radius:14px;padding:22px}
.cc-card__tag{align-self:flex-start;font:600 12px/1 system-ui;letter-spacing:.06em;text-transform:uppercase;color:#8A6A23;background:#F4EDDF;padding:6px 11px;border-radius:999px}
.cc-card__name{font-family:Fraunces,serif;color:#0E3F44;font-size:22px;margin:12px 0 6px}
.cc-card__actions{margin-top:auto;display:flex;gap:10px}
.cc-card__actions button{flex:1;font:600 14px system-ui;color:#1B5E5A;background:#F4EDDF;border:0;border-radius:10px;padding:11px}
.cc-note{align-self:center;color:#8A6A23;background:#F4EDDF;border-radius:10px;padding:10px 16px;font:500 14px system-ui;margin-top:14px}
```
