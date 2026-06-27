# LUX-10 — Color, Texture, Depth: Slide-Up Dentist Result Card

**Lens:** restrained surface depth. The card sits on ivory like a pressed paper coupon: soft layered shadows, a barely-there cream-to-ivory gradient, and a faint paper grain. Gold is the single accent, reserved for the Featured Platinum Elite tag and the rating row. Everything else lives in teal and ink.

**Single card:** teal #0E3F44 hairline frame, ivory face, two stacked shadows for lift. Name in Fraunces; rating, sources (Google, Yelp, Zocdoc), distance, address, phone in system sans. CTAs sentence-case: Book appointment / View dentist profile / Share.

**Two main-character cards:** equal in weight, told apart by surface, not size. Card A reads cooler (cream face, teal grain); Card B reads warmer (ivory face, faint gold grain). Same shadow depth, same gold tag, same type scale. Neither outranks the other; the eye chooses by texture.

Gold #C9A24A for tag fill and stars; #8A6A23 for gold text on light. Ink #14242A for body, teal #1B5E5A for links.

```css
:root{
  --teal:#1B5E5A; --teal-dk:#0E3F44;
  --ivory:#FBF7EE; --cream:#F4ECDC;
  --gold:#C9A24A; --gold-dk:#8A6A23;
  --ink:#14242A;
}
.dx-card{
  position:relative; border-radius:18px;
  border:1px solid color-mix(in srgb,var(--teal-dk) 22%,transparent);
  background:
    linear-gradient(180deg,var(--ivory) 0%,var(--cream) 100%);
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 8px 18px -10px rgba(14,63,68,.35),
    0 22px 40px -22px rgba(14,63,68,.30);
  color:var(--ink);
  font-family:system-ui,sans-serif;
}
.dx-card::before{ /* paper grain */
  content:""; position:absolute; inset:0; border-radius:inherit;
  pointer-events:none; opacity:.05; mix-blend-mode:multiply;
  background-image:radial-gradient(rgba(14,36,42,.7) .5px,transparent .5px);
  background-size:3px 3px;
}
.dx-card__name{ font-family:"Fraunces",serif; font-weight:500; color:var(--ink); }
.dx-tag{ /* Featured Platinum Elite */
  background:linear-gradient(180deg,var(--gold) 0%,var(--gold-dk) 140%);
  color:var(--ivory); font:600 12px/1 system-ui,sans-serif;
  padding:5px 10px; border-radius:999px; letter-spacing:.04em;
}
.dx-rating .star{ color:var(--gold); }
.dx-rating .src{ color:var(--teal); }   /* Google / Yelp / Zocdoc */
.dx-card a{ color:var(--teal); }

/* Two equal cards — differ by surface, not hierarchy */
.dx-card--a{ background:linear-gradient(180deg,var(--cream) 0%,#EFE6D2 100%); }
.dx-card--a::before{ background-image:radial-gradient(rgba(27,94,90,.6) .5px,transparent .5px); }
.dx-card--b{ background:linear-gradient(180deg,var(--ivory) 0%,var(--cream) 100%); }
.dx-card--b::before{ background-image:radial-gradient(rgba(138,106,35,.5) .5px,transparent .5px); }

.dx-cta{ /* sentence-case, no arrows in text */
  font:600 14px/1 system-ui,sans-serif; border-radius:12px;
}
.dx-cta--primary{ background:var(--teal-dk); color:var(--ivory); }
.dx-cta--ghost{ background:transparent; color:var(--teal); border:1px solid color-mix(in srgb,var(--teal) 35%,transparent); }
```
