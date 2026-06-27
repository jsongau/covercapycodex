# Mobile 03 — Result Card Density (`.card-4`, <480px)

## Intent
Keep the concierge calm on phones. Reduce, don't crush. Everything snaps to an 8px grid so the eye reads top-to-bottom without effort.

## Type scale
- Featured tag: 11px, +0.06em tracking, uppercase, `--teal-300`.
- Practice name (Fraunces): drop ~26px to **21–22px**, line-height 1.2, weight 500.
- Rating number: 15px; source chips (Google/Yelp/Zocdoc): 12px.
- Address / distance / phone row: 13px, `--ink-soft`.
- Button labels: 15px, weight 500.

## Spacing & density
- Card padding 16px; internal gaps 8px / 12px on the 8px grid.
- Source chips `flex-wrap` so they spill to a second line cleanly, 6px gap.
- Address row stays inline if it fits; below ~360px or when cramped, stack to one item per line with 4px gaps.
- Two CTAs become **full-width, stacked**, min-height 46px, 8px between, Book on top.

```css
@media (max-width: 480px) {
  .card-4 { padding: 16px; border-radius: 14px; }
  .card-4 .featured-tag { font-size: 11px; letter-spacing: .06em; margin-bottom: 8px; }
  .card-4 .practice-name { font-size: 21px; line-height: 1.2; margin: 0 0 8px; }
  .card-4 .rating-row { gap: 8px; margin-bottom: 8px; }
  .card-4 .rating-row .rating-value { font-size: 15px; }
  .card-4 .source-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .card-4 .source-chip { font-size: 12px; padding: 4px 8px; }
  .card-4 .meta-row {
    display: flex; flex-wrap: wrap; gap: 4px 12px;
    font-size: 13px; color: var(--ink-soft); margin: 8px 0 12px;
  }
  .card-4 .card-actions { display: flex; flex-direction: column; gap: 8px; }
  .card-4 .card-actions .btn {
    width: 100%; min-height: 46px; font-size: 15px; font-weight: 500;
  }
}

@media (max-width: 360px) {
  .card-4 .meta-row { flex-direction: column; gap: 4px; }
}
```
