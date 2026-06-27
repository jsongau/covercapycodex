# Result Card — Art Direction

**Lens.** A single page from a fashion title: generous margins, one accent, type that breathes. Ivory `#FFFDF9` stage, cards in cream `#F4EDDF` rising on a slow ease-out. Gold `#C9A24A` is the only color allowed to speak; teal carries text and frames.

**Hierarchy.** The Fraunces practice name is the headline, set large in ink `#14242A`. Above it, a hairline gold tag reads "Featured Platinum Elite" in tracked sans caps. Below, a quiet metadata stack: rating with Google, Yelp, and Zocdoc split inline; the distance line; address; phone. Numbers stay sans for clarity; the name stays serif for voice.

**Two offices.** When two fall in range, both are full-bleed and identical in weight, stacked with a wide gap. No winner, no shrinking. Equal billing reads as confidence.

**Actions.** Three plain buttons, sentence case: Book appointment (filled teal), View dentist profile, Share. No icons competing with the type.

**Restraint.** One rule line per card, no shadows beyond a soft lift, no gradients.

```css
.lux-card {
  background: #F4EDDF;
  color: #14242A;
  border-radius: 14px;
  padding: 28px 26px;
  box-shadow: 0 18px 48px rgba(14,63,68,.14);
  transform: translateY(24px);
  opacity: 0;
  animation: lux-rise .5s cubic-bezier(.2,.7,.2,1) forwards;
}
.lux-stack { display: grid; gap: 22px; } /* two equal cards */
.lux-tag {
  font: 600 11px/1 system-ui, sans-serif;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #8A6A23;
  padding-bottom: 4px;
  border-bottom: 1px solid #C9A24A;
  display: inline-block;
}
.lux-name {
  font: 500 27px/1.15 "Fraunces", serif;
  margin: 14px 0 8px;
}
.lux-meta { font: 400 14px/1.6 system-ui, sans-serif; color: #14242A; }
.lux-rating b { color: #8A6A23; }
.lux-distance { color: #1B5E5A; font-weight: 600; }
.lux-actions { display: flex; gap: 12px; margin-top: 20px; }
.lux-btn {
  font: 600 14px/1 system-ui, sans-serif;
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid #1B5E5A;
  background: #FFFDF9;
  color: #0E3F44;
  cursor: pointer;
}
.lux-btn--book { background: #1B5E5A; color: #FFFDF9; border-color: #0E3F44; }
@keyframes lux-rise { to { transform: translateY(0); opacity: 1; } }
```
