# lux-04 — Slide-up result card conversion

## Goal
Move the user to book without pressure. One obvious primary action, calm secondaries, honest trust signals.

## Hierarchy
- **Featured Platinum Elite** tag sits top-left in gold on ivory, small caps, decorative only.
- Name in Fraunces. Below it: rating value, star row, and source labels (Google, Yelp, Zocdoc) in muted ink so the number reads as earned, not boastful.
- Distance and address on one line, phone beneath.
- **Book appointment** is the single filled teal button, full width. **View dentist profile** and **Share** are quiet text buttons below it, equal weight to each other, lighter than the primary.

## Two equal cards
Stack them, do not place side by side. Give each its own Book appointment button so neither becomes a comparison grid. Differentiate by real data already present (distance, rating, sources) instead of adding a winner badge. A short label such as "Closest" or "Most reviewed" on each card lets the user pick a reason and act, which defuses choice paralysis.

## Trust
Show the aggregate rating with star marks and the named sources only when data exists. Never round up or fabricate counts.

```css
.lux-card{background:var(--ivory,#FBF7EE);border:1px solid rgba(20,36,42,.08);border-radius:18px;padding:22px;font-family:system-ui,sans-serif;color:#14242A}
.lux-card .tag{font:600 11px/1 system-ui;letter-spacing:.08em;text-transform:uppercase;color:#8A6A23;background:rgba(201,162,74,.14);padding:5px 9px;border-radius:999px}
.lux-card h3{font-family:Fraunces,Georgia,serif;font-weight:560;font-size:20px;margin:12px 0 4px}
.lux-card .sources{color:#0E3F44;opacity:.7;font-size:13px}
.lux-card .meta{color:#14242A;opacity:.85;font-size:14px;margin:6px 0 16px}
.lux-card .book{display:block;width:100%;background:#1B5E5A;color:#FBF7EE;border:0;border-radius:12px;padding:14px;font:600 15px/1 system-ui;cursor:pointer}
.lux-card .book:hover{background:#0E3F44}
.lux-card .secondary{display:flex;gap:18px;margin-top:12px}
.lux-card .secondary button{background:none;border:0;color:#1B5E5A;font:500 14px/1 system-ui;cursor:pointer;padding:4px 0}
.lux-card .reason{color:#8A6A23;font:600 12px/1 system-ui;letter-spacing:.04em}
```
