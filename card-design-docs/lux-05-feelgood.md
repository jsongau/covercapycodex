# lux-05 — Feel-good slide-up result card

## Emotional intent
The card should land like a warm welcome, not a sales hit. A dentist visit can carry quiet nerves, so this surface stays calm and reassuring: soft ivory ground, a gentle teal-to-cream lift as it rises, and a slow ease so nothing snaps at you. Confidence comes from clarity, not pressure.

## Single "main character" card
One office, given room to breathe. Lead with the name in Fraunces, then a soft gold **Featured Platinum Elite** tag set small and friendly. Rating sits beside its source (Google, Yelp, Zocdoc) so it reads as honest, not boastful. Distance and address feel like a helpful nudge; phone is one warm tap away. CTAs in sentence case: Book appointment, View dentist profile, Share.

## Two-card layout
Side by side, equal warmth, no winner-loser framing. Same gentle rise, a hair of stagger so they feel alive. Keep gold accents quiet so neither shouts.

## Small delights
A faint warmth glow under the gold tag, rating stars that fill on entry, a soft tap ripple on Book appointment.

```css
.lux-card {
  --teal: #1B5E5A; --teal-deep: #0E3F44;
  --ivory: #FBF7EE; --cream: #F3EAD8;
  --gold: #C9A24A; --gold-deep: #8A6A23; --ink: #14242A;
  background: linear-gradient(180deg, var(--ivory), var(--cream));
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(14,63,68,.14);
  font-family: system-ui, sans-serif; color: var(--ink);
  transform: translateY(28px); opacity: 0;
  animation: lux-rise .55s cubic-bezier(.22,.61,.36,1) forwards;
}
.lux-card h3 { font-family: 'Fraunces', serif; color: var(--teal-deep); }
.lux-card .tag {
  background: var(--gold); color: #14242A;
  box-shadow: 0 0 0 0 rgba(201,162,74,.45);
  animation: lux-warmth 2.6s ease-in-out infinite;
}
.lux-card .cta-book { background: var(--teal); color: var(--ivory); }
.lux-card + .lux-card { animation-delay: .09s; }
@keyframes lux-rise { to { transform: translateY(0); opacity: 1; } }
@keyframes lux-warmth { 50% { box-shadow: 0 0 14px 2px rgba(201,162,74,.28); } }
```
