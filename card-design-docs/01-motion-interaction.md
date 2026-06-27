# Mega-Nav Hero Cards — Motion & Interaction Redesign

**Lens:** micro-interactions, reveal, hover/focus, easing, restraint.
**Author:** Motion / Interaction design
**Scope:** Three ~300px lead-column promo cards inside dropdown panels.

---

## Shared foundation

These rules apply to all three cards so the nav reads as one family.

### Tokens
```css
:root{
  --teal:#1B5E5A; --teal-deep:#0E3F44;
  --ivory:#FFFDF9; --cream:#F4EDDF;
  --gold:#C9A24A; --gold-deep:#8A6A23;
  --ink:#14242A;
  --ease:cubic-bezier(.16,1,.3,1);   /* the only easing curve we use */
}
```

### Card scaffold (common)
```css
.nav-hero{
  width:300px; position:relative; isolation:isolate;
  border-radius:14px; padding:20px 20px 18px;
  background:var(--ivory);
  border:1px solid color-mix(in oklab, var(--cream) 70%, var(--ink) 6%);
  display:grid; gap:10px;
  font-family:system-ui,-apple-system,Segoe UI,sans-serif;
  /* base resting shadow is almost nothing — restraint */
  box-shadow:0 1px 2px rgba(20,36,42,.04);
  transition:box-shadow .5s var(--ease), transform .5s var(--ease),
             border-color .5s var(--ease);
}
.nav-hero:hover{
  transform:translateY(-2px);
  box-shadow:0 10px 28px -14px rgba(14,63,68,.30);
  border-color:color-mix(in oklab, var(--gold) 40%, var(--cream));
}
.nav-hero .eyebrow{
  font:600 11px/1 system-ui; letter-spacing:.10em; text-transform:uppercase;
  color:var(--gold-deep);
}
.nav-hero .title{
  font-family:"Fraunces",Georgia,serif; font-weight:560;
  font-size:18px; line-height:1.22; color:var(--ink); margin:2px 0 0;
}
.nav-hero .support{ font:400 13px/1.45 system-ui; color:color-mix(in oklab,var(--ink) 70%,transparent); }
.nav-hero .cta{
  margin-top:4px; align-self:start;
  font:600 13px/1 system-ui; color:var(--teal-deep);
}
```

### Panel-open reveal (all cards)
The card is the first thing in the panel, so it leads the reveal — never a competing flourish.
```css
@media (prefers-reduced-motion:no-preference){
  [data-panel-open] .nav-hero{ animation:hero-in .42s var(--ease) both; }
  /* stagger inner rows so meaning lands top-to-bottom */
  [data-panel-open] .nav-hero > *{ animation:row-in .46s var(--ease) both; }
  [data-panel-open] .nav-hero > *:nth-child(1){ animation-delay:.02s; }
  [data-panel-open] .nav-hero > *:nth-child(2){ animation-delay:.06s; }
  [data-panel-open] .nav-hero > *:nth-child(3){ animation-delay:.10s; }
  [data-panel-open] .nav-hero > *:nth-child(4){ animation-delay:.14s; }
}
@keyframes hero-in{ from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:none} }
@keyframes row-in { from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:none} }
@media (prefers-reduced-motion:reduce){ .nav-hero,.nav-hero>*{animation:none!important} }
```

### Focus (keyboard parity, all cards)
The whole card is one link. Focus must equal hover so keyboard users get the same affordance.
```css
.nav-hero:focus-visible{
  outline:none; transform:translateY(-2px);
  box-shadow:0 10px 28px -14px rgba(14,63,68,.30),
             0 0 0 2px var(--ivory), 0 0 0 4px var(--gold);
}
```

### Restraint rules
- One easing curve. One hover lift distance (2px). One reveal stagger pattern.
- Motion only on open and on intent (hover/focus). Nothing loops, nothing auto-plays.
- All durations 250–500ms. Nothing snappier (feels nervous), nothing slower (feels stuck).

---

## Card A — Find a Dentist concierge promo

**Concept.** A quiet locator. On hover, a single map-pin glyph "drops" into place once — the only literal gesture, used because the card's job is proximity. Everything else stays still.

**Layout / structure.** Eyebrow / title / supporting line / CTA, single column. A 28px pin sits top-right, baseline-aligned to the eyebrow, on a faint cream disc. The pin is the accent; the text column is full-width beneath it.

**CSS sketch.**
```css
.cardA .pin{
  position:absolute; top:16px; right:16px; width:28px; height:28px;
  display:grid; place-items:center; border-radius:50%;
  background:var(--cream); color:var(--teal);
  transition:transform .45s var(--ease), background .45s var(--ease);
}
.cardA:hover .pin, .cardA:focus-visible .pin{
  background:color-mix(in oklab,var(--gold) 28%,var(--cream));
  animation:pin-drop .5s var(--ease);
}
@keyframes pin-drop{ 0%{transform:translateY(-3px)} 55%{transform:translateY(1px)} 100%{transform:none} }
.cardA .cta::after{ /* underline that draws from the left on intent */
  content:""; display:block; height:1.5px; width:0; margin-top:3px;
  background:var(--teal-deep); transition:width .4s var(--ease);
}
.cardA:hover .cta::after, .cardA:focus-visible .cta::after{ width:100%; }
```

**Copy (exact, compliant).**
- Eyebrow: `Concierge search`
- Title: `Platinum Elite offices show first near you`
- Supporting: `Search by city and PPO carrier to see verified offices nearby.`
- CTA: `Find a PPO dentist`

**Interaction / states.** Rest: flat, pin on cream. Hover/focus: card lifts 2px, pin drops once and warms to gold-cream, CTA underline draws left-to-right. Active: lift settles to 1px (press feel). Reduced-motion: pin and underline appear instantly in end state.

**Rationale.** The single pin-drop signals "location" without a busy map; warming the disc to gold ties hover to the brand accent so the gesture reads intentional, not decorative.

---

## Card B — Insurance featured plan

**Concept.** A featured plan reads like a clean spec line, not an ad. Reveal emphasizes the "100% preventive day one" fact by letting it settle a beat after the title. Hover lifts a thin gold rule under the eyebrow — a bookmark, not a banner.

**Layout / structure.** Eyebrow / title / supporting line / CTA. A 2px gold rule sits directly under the eyebrow, scaling from the left. The title carries the plan name; the supporting line isolates the one factual benefit.

**CSS sketch.**
```css
.cardB .eyebrow{ position:relative; padding-bottom:6px; }
.cardB .eyebrow::after{
  content:""; position:absolute; left:0; bottom:0; height:2px; width:36px;
  background:var(--gold); transform-origin:left; transform:scaleX(.6);
  transition:transform .45s var(--ease), background .45s var(--ease);
}
.cardB:hover .eyebrow::after, .cardB:focus-visible .eyebrow::after{
  transform:scaleX(1); background:var(--gold-deep);
}
.cardB .support strong{ /* the fact gets weight + its own reveal beat */
  color:var(--teal-deep); font-weight:600;
}
[data-panel-open] .cardB .support{ animation-delay:.16s; } /* lands just after title */
```

**Copy (exact, compliant).**
- Eyebrow: `Featured plan`
- Title: `UnitedHealthcare Primary Dental`
- Supporting: `100% preventive coverage starting day one, no waiting period.`
- CTA: `Compare PPO plans`

**Interaction / states.** Rest: short gold rule at 60% width. Hover/focus: rule extends full and deepens to gold-deep, card lifts 2px. On open, the benefit line resolves a beat after the title so the eye lands plan name then benefit. Reduced-motion: rule sits at full width, no stagger.

**Rationale.** Splitting plan name (title) from the benefit (supporting) keeps each fact scannable; the extending rule gives a featured feel through one restrained motion instead of a badge or color block.

---

## Card C — For Dentists claim

**Concept.** An invitation to act. The card frames an empty profile slot that "fills in" on hover — a one-line preview row tints from cream toward teal, suggesting the claimed state without faking data.

**Layout / structure.** Eyebrow / title / supporting line / a single placeholder "profile row" / CTA. The placeholder row is a thin cream bar with a soft initial chip on the left; on intent it warms toward teal to imply ownership.

**CSS sketch.**
```css
.cardC .slot{
  display:flex; align-items:center; gap:8px;
  padding:8px 10px; border-radius:9px; background:var(--cream);
  transition:background .45s var(--ease);
}
.cardC .slot .chip{
  width:20px; height:20px; border-radius:50%;
  background:color-mix(in oklab,var(--teal) 18%,var(--cream));
  transition:background .45s var(--ease), color .45s var(--ease);
  display:grid; place-items:center; font:600 11px/1 system-ui; color:var(--teal-deep);
}
.cardC .slot .line{ height:8px; flex:1; border-radius:4px;
  background:color-mix(in oklab,var(--ink) 12%,transparent);
  transition:background .45s var(--ease); }
.cardC:hover .slot, .cardC:focus-visible .slot{
  background:color-mix(in oklab,var(--teal) 8%,var(--ivory)); }
.cardC:hover .slot .chip, .cardC:focus-visible .slot .chip{
  background:var(--teal); color:var(--ivory); }
.cardC:hover .slot .line, .cardC:focus-visible .slot .line{
  background:color-mix(in oklab,var(--teal) 30%,transparent); }
```

**Copy (exact, compliant).**
- Eyebrow: `Free, 3-day review`
- Title: `Claim your practice profile`
- Supporting: `Add your hours, carriers, and photos. Most listings go live within three days.`
- CTA: `Claim profile`

**Interaction / states.** Rest: muted cream slot, neutral chip and line (the "unclaimed" look). Hover/focus: slot warms to faint teal, chip fills solid teal with ivory mark, the line tints teal — the profile reads as "yours." Active: slot holds the warmed state during press. Reduced-motion: warmed state shown statically with no transition.

**Rationale.** The fill-in metaphor makes the value tangible without inventing names, ratings, or counts; one synchronized color shift does the persuading, keeping the card honest and calm.

---

## Build notes
- All three share the scaffold, easing, reveal stagger, and focus rules — only the accent gesture differs per card.
- No arrows, no all-caps in body copy (eyebrow uppercase is styling, not literal caps), no banned vocabulary, no invented metrics.
- Every hover effect has a `:focus-visible` twin and a `prefers-reduced-motion` fallback.
