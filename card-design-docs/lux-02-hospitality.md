# lux-02 · Hospitality materiality — slide-up dentist card

**Lens:** A concierge sliding a folded card across the desk. Warm paper, soft light, surfaces you want to touch — never heavy.

**Surface.** Ivory `#FFFDF9` card body on a cream `#F4EDDF` tray, lifted by a low diffuse shadow (not a drop edge). The rise should feel like paper settling, ~340ms ease-out.

**Featured Platinum Elite tag.** Small gold `#C9A24A` rule on ink `#14242A` ground, set in Fraunces small caps. The deeper gold `#8A6A23` carries the tag text for contrast.

**Type.** Name in Fraunces; rating, distance, address, phone in system sans, ink `#14242A` softened to ~70% for the address line. Aggregate rating leads; Google, Yelp, Zocdoc follow as quiet sourced marks.

**Single vs two-card.** One card centers, calm. Two cards: the first becomes the main character — wider, fuller shadow, teal `#1B5E5A` hairline; the second sits half a step back at 96% scale, slightly cooler.

**CTAs.** Book appointment (filled teal), View dentist profile (ink outline), Share (text). Sentence case, no arrows.

```css
.lux-card{
  background:#FFFDF9;
  border:1px solid rgba(20,36,42,.08);
  border-radius:18px;
  padding:22px 24px;
  box-shadow:0 1px 0 rgba(255,255,255,.7) inset, 0 18px 40px -28px rgba(14,63,68,.55);
  transform:translateY(0);
  transition:transform .34s ease-out, box-shadow .34s ease-out;
}
.lux-card--lead{                       /* main character */
  border-color:rgba(27,94,90,.35);
  box-shadow:0 26px 60px -30px rgba(14,63,68,.6);
}
.lux-card--behind{ transform:scale(.96); filter:saturate(.9); }
.lux-tag{
  font-family:Fraunces,serif; font-size:11px; letter-spacing:.14em;
  text-transform:uppercase; color:#8A6A23;
  background:#14242A; border:1px solid #C9A24A;
  padding:4px 10px; border-radius:999px;
}
.lux-cta{ background:#1B5E5A; color:#FFFDF9; border-radius:12px; padding:11px 18px; }
.lux-cta--ghost{ background:transparent; color:#14242A; border:1px solid rgba(20,36,42,.4); }
.lux-cta--share{ background:none; color:#0E3F44; text-decoration:underline; }
```
