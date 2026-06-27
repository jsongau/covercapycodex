# Mega-Nav Promo Hero Cards — Mobile-First Redesign

Three promo cards live in the mega-nav. On mobile they render as full-width blocks stacked in the slide-out drawer; on desktop they sit in a ~300px column beside the link lists. This doc designs them mobile-first and scales up.

## Shared principles

- **One column always.** Cards never go side-by-side; they stack in both contexts. This means a single responsive component, no breakpoint reflow of internal structure.
- **Thumb reach.** Primary CTA is the full bottom edge of each card so it falls in the lower-screen thumb zone of the drawer. Whole card is also tappable as a fallback target.
- **Tap targets.** Every interactive element is min 48px tall. Card-to-card vertical gap is 16px so adjacent CTAs can't be mis-tapped.
- **Condensed but legible.** Body copy capped at ~2 lines mobile; eyebrow 12px, title 18-20px Fraunces, body 14px, CTA 16px.
- **Type.** Fraunces serif for titles only. System sans for eyebrow, body, CTA.

### Shared tokens

```css
:root{
  --teal:#1B5E5A; --teal-deep:#0E3F44;
  --ivory:#FFFDF9; --cream:#F4EDDF;
  --gold:#C9A24A; --gold-deep:#8A6A23;
  --ink:#14242A;
}
.nav-promo{
  display:flex; flex-direction:column;
  border-radius:14px; overflow:hidden;
  width:100%; margin-bottom:16px;
  font-family:system-ui,-apple-system,sans-serif;
}
.nav-promo:last-child{margin-bottom:0;}
.nav-promo__eyebrow{
  font-size:12px; letter-spacing:.04em; font-weight:600;
  text-transform:none; /* no all caps */
}
.nav-promo__title{
  font-family:'Fraunces',serif; font-weight:500;
  font-size:20px; line-height:1.15; margin:6px 0 8px;
}
.nav-promo__body{font-size:14px; line-height:1.4; margin:0 0 14px;}
.nav-promo__cta{
  display:block; min-height:48px; line-height:48px;
  text-align:center; font-size:16px; font-weight:600;
  text-decoration:none; border-radius:0; /* flush bottom edge */
}
@media (min-width:1024px){
  .nav-promo{max-width:300px;}
  .nav-promo__title{font-size:18px;}
}
```

The whole card carries a click handler routing to the same action as the CTA, so a tap anywhere works; the CTA is the explicit affordance.

---

## Card A — Find a Dentist concierge promo

**Action:** `/find-my-dentist.html`

### Concept
Warm entry point. Teal-deep field, ivory text, gold CTA bar. Reads as the "start here" card, so it sits first in the drawer stack (top reading order, but CTA still bottom-of-card in thumb zone).

### Layout
- **Mobile (drawer, full width):** eyebrow, title, one-line body, full-width gold CTA bar pinned to card bottom. Padding 18px sides, CTA flush to edges.
- **Desktop (300px col):** same stack, title drops to 18px, padding 16px. CTA stays full card width.

### Tap targets
- CTA bar: full card width x 48px.
- Card body: tappable fallback.

### CSS sketch
```css
.promo-a{background:var(--teal-deep); color:var(--ivory); padding:18px 18px 0;}
.promo-a .nav-promo__eyebrow{color:var(--gold);}
.promo-a .nav-promo__cta{
  background:var(--gold); color:var(--teal-deep);
  margin:0 -18px; /* bleed to card edges */
}
.promo-a .nav-promo__cta:hover{background:#d8b25e;}
.promo-a .nav-promo__cta:active{background:var(--gold-deep); color:var(--ivory);}
@media (min-width:1024px){
  .promo-a{padding:16px 16px 0;}
  .promo-a .nav-promo__cta{margin:0 -16px;}
}
```

### Copy (compliant)
- Eyebrow: `Concierge help`
- Title: `Find a dentist near you`
- Body: `We match you to in-network offices and handle the back and forth.`
- CTA: `Find a dentist`

### States
- Default / hover (lighter gold) / active (gold-deep fill, ivory text) / focus-visible: 2px ivory outline offset 2px.

### Rationale
First card, highest-intent action. Gold-on-teal CTA is the strongest contrast pairing in the system, so the most common task gets the loudest button without color invention.

---

## Card B — Insurance featured plan

**Action:** `/compare-ppo-dental-plans.html`

### Concept
Product spotlight. Cream card with a small teal plan badge row so the carrier and the day-one benefit read at a glance. Lower visual weight than A (cream vs teal-deep) so the stack has hierarchy.

### Layout
- **Mobile:** eyebrow, title (plan name), a compact key-fact line ("100% preventive day one") as a teal chip, body, teal CTA bar at bottom.
- **Desktop:** identical; chip wraps under title if needed at 300px.

### Tap targets
- CTA bar: full width x 48px.
- Chip is non-interactive (decorative), so no accidental target.

### CSS sketch
```css
.promo-b{background:var(--cream); color:var(--ink); padding:18px 18px 0;}
.promo-b .nav-promo__eyebrow{color:var(--gold-deep);}
.promo-b .promo-b__chip{
  display:inline-block; font-size:12px; font-weight:600;
  color:var(--ivory); background:var(--teal);
  padding:5px 10px; border-radius:999px; margin:0 0 10px;
}
.promo-b .nav-promo__cta{
  background:var(--teal); color:var(--ivory); margin:0 -18px;
}
.promo-b .nav-promo__cta:hover{background:#226e69;}
.promo-b .nav-promo__cta:active{background:var(--teal-deep);}
@media (min-width:1024px){
  .promo-b{padding:16px 16px 0;}
  .promo-b .nav-promo__cta{margin:0 -16px;}
}
```

### Copy (compliant)
- Eyebrow: `Featured plan`
- Title: `UnitedHealthcare Primary Dental`
- Chip: `100% preventive, day one`
- Body: `Cleanings and checkups covered from your first day on the plan.`
- CTA: `Compare dental plans`

### States
- Default / hover / active (teal-deep) / focus-visible: 2px teal outline offset 2px. Chip has no state.

### Rationale
The day-one preventive fact is the only claim, stated as a plan attribute, no invented numbers. Cream background separates it from the two action cards so the featured plan reads as content, not a second concierge button.

---

## Card C — For Dentists claim profile

**Action:** `/claim-dentist-listing-profile.html`

### Concept
Audience-switch card for practice owners. Ivory card with gold-deep title and a teal outline CTA so it visually signals "different audience" and sits last in the stack.

### Layout
- **Mobile:** small eyebrow flag ("For dental offices"), title, two facts inline ("Free" + "3-day review") as a thin meta line, outline CTA at bottom.
- **Desktop:** same; meta line wraps to two lines under 300px if needed.

### Tap targets
- CTA: full width x 48px. Outline style still meets target via full bar.
- Meta line non-interactive.

### CSS sketch
```css
.promo-c{
  background:var(--ivory); color:var(--ink);
  border:1px solid var(--cream); padding:18px 18px 0;
}
.promo-c .nav-promo__eyebrow{color:var(--teal);}
.promo-c .nav-promo__title{color:var(--gold-deep);}
.promo-c .promo-c__meta{
  font-size:13px; color:var(--ink); margin:0 0 14px;
}
.promo-c .promo-c__meta b{color:var(--teal);}
.promo-c .nav-promo__cta{
  background:transparent; color:var(--teal);
  border-top:1px solid var(--teal);
  box-shadow:inset 0 0 0 0 var(--teal); margin:0 -18px;
}
.promo-c .nav-promo__cta:hover{background:rgba(27,94,90,.08);}
.promo-c .nav-promo__cta:active{background:var(--teal); color:var(--ivory);}
@media (min-width:1024px){
  .promo-c{padding:16px 16px 0;}
  .promo-c .nav-promo__cta{margin:0 -16px;}
}
```

### Copy (compliant)
- Eyebrow: `For dental offices`
- Title: `Claim your profile`
- Meta: `Free to list. Listings reviewed within 3 business days.`
- CTA: `Claim your listing`

### States
- Default (outline) / hover (faint teal wash) / active (solid teal fill, ivory text) / focus-visible: 2px teal outline offset 2px.

### Rationale
Outline + ivory = lowest weight, correct for a secondary audience that most nav visitors will skip. "3 business days" is a process fact, not a rating or testimonial. Last in stack keeps the consumer path (A then B) above the owner path.

---

## Drawer assembly (mobile)

```css
.nav-drawer__promos{padding:16px; display:flex; flex-direction:column;}
```
Cards stack A, B, C top to bottom. Because each CTA is the card's bottom edge and cards are 16px apart, the three primary buttons land in a clean vertical rhythm reachable as the user scrolls the drawer. On desktop the same markup drops into the 300px column with no structural change, only reduced padding and title size.
