# Lux-08: Slide-up result card accessibility

## Contrast
- Gold #C9A24A on ivory/cream fails AA for text. Keep it decorative only (rating stars, hairlines, Featured tag fill). For the gold "Book appointment" button use ink-on-gold #8A6A23 text, or invert to teal #0E3F44 fill with ivory text.
- Body ink #14242A on ivory passes. Teal #1B5E5A on ivory passes for links and labels.

## Keyboard and focus
- Tab order top to bottom: card 1 (name link, Book, View profile, Share) then card 2, then Share and Close in the sheet header. Close is last but reachable; Esc also closes.
- Two stacked cards keep DOM order matching visual order. No positive tabindex.
- Visible focus-visible ring: 2px teal #1B5E5A plus 2px offset, never relying on color alone.

## Semantics and targets
- Each card is an `article` with an `h3` name; rating uses real text plus visually-hidden source label ("4.8, 212 Google reviews"). Featured Platinum Elite tag is text, not image. CTAs are real buttons or links, min 44px target. Address and phone use `address` and `tel:`.
- Honor `prefers-reduced-motion`: replace the slide-up with a fade and drop transforms.

```css
.card__book { background:#C9A24A; color:#8A6A23; min-height:44px; min-width:44px; }
.card a:focus-visible, .card button:focus-visible {
  outline:2px solid #1B5E5A; outline-offset:2px; border-radius:8px;
}
.gold-rule, .tag-featured { /* gold #C9A24A decorative only, never as text */ }
@media (prefers-reduced-motion: reduce) {
  .result-sheet { animation:none; transform:none; transition:opacity .2s ease; }
}
```
