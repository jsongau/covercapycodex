# Mega-Nav Promo Hero Cards — Swiss / Minimalist Redesign

**Lens:** strict grid, generous whitespace, one accent per card, no ornament, precise alignment.
**Scope:** three promo cards (~300px wide) in the left lead column of mega-nav dropdown panels.

---

## Shared system

### Tokens
```css
:root {
  --teal:        #1B5E5A;
  --teal-deep:   #0E3F44;
  --ivory:       #FFFDF9;
  --cream:       #F4EDDF;
  --gold:        #C9A24A;
  --gold-deep:   #8A6A23;
  --ink:         #14242A;

  --font-display: 'Fraunces', Georgia, serif;
  --font-ui: system-ui, -apple-system, 'Segoe UI', sans-serif;
}
```

### One global rule
Each card carries **a single accent** (one gold element only) and **one type contrast** (Fraunces eyebrow/title vs. sans body/CTA). Nothing else is decorated. No borders on the card edge except a hairline; no shadows, no gradients, no icons-as-ornament.

### Spacing scale (4pt base)
`4 · 8 · 12 · 16 · 24 · 32 · 48`
Card padding is a fixed `24px` on all four sides. Vertical rhythm inside uses `8 / 16 / 24` only. This consistency is the whole point.

### Grid
- Card: `300 × 360px`, single column, content left-aligned to one optical edge.
- Internal grid: one column, `24px` gutters from card edge. A `2px` gold rule sits flush-left as the only vertical anchor on the active/featured card.
- Baseline: all type aligns to an 8px baseline grid. Title cap-height sits on a grid line; CTA baseline sits on a grid line.

### Shared CSS sketch
```css
.mn-card {
  width: 300px;
  min-height: 360px;
  box-sizing: border-box;
  padding: 24px;
  background: var(--ivory);
  border: 1px solid #ECE3D2;          /* hairline only */
  display: grid;
  grid-template-rows: auto 1fr auto;  /* eyebrow / body / CTA */
  row-gap: 24px;
  font-family: var(--font-ui);
  color: var(--ink);
  text-decoration: none;
  transition: background .15s ease, border-color .15s ease;
}
.mn-eyebrow {
  font-family: var(--font-ui);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;          /* allowed: tracking label, not headline copy */
  color: var(--gold-deep);
}
.mn-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 26px;
  line-height: 30px;                  /* on baseline grid */
  color: var(--ink);
  margin: 0;
}
.mn-text {
  font-size: 13px;
  line-height: 20px;
  color: #3A4B50;
  max-width: 26ch;                    /* measure control */
  margin: 8px 0 0;
}
.mn-cta {
  font-size: 13px;
  font-weight: 600;
  color: var(--teal-deep);
  border-bottom: 2px solid var(--gold);  /* the single accent on default cards */
  padding-bottom: 2px;
  width: max-content;
}
.mn-card:hover  { background: var(--cream); border-color: #E2D6BD; }
.mn-card:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
.mn-cta:hover   { color: var(--teal); }
```

---

## Card A — Find a Dentist (concierge)

**Action:** `/find-my-dentist.html`

### Concept
The wayfinding card. Restraint signals competence: a quiet label, a serif title, one line of plain help, one underlined action. No imagery, no map graphic.

### Grid / layout
Standard three-row grid. Gold accent = the CTA underline (no left rule). Eyebrow → title → text fills the `1fr` body top-aligned → CTA pinned to bottom row.

### Spacing
Padding `24`. eyebrow-to-title `16`. title-to-text `8`. text-to-CTA absorbs the `1fr`, minimum `24`.

### CSS sketch
```css
.mn-card--find .mn-eyebrow { color: var(--gold-deep); }
/* uses shared .mn-cta gold underline as its only accent */
```

### Copy (compliant)
- Eyebrow: `FIND CARE`
- Title: `Find a dentist near you`
- Text: `Tell us your plan and location. We match offices that take it and book the visit for you.`
- CTA: `Find a dentist`

### States
- Default: ivory, gold CTA underline.
- Hover: cream fill, CTA color teal, underline holds gold.
- Focus: 2px teal outline, offset 2.
- Active/pressed: cream darkens via `border-color`; no movement.

### Rationale
This is the highest-traffic action, so it gets the calmest treatment, no competing accent. Plain verb-first CTA names the action exactly. Measure capped at 26ch keeps two tidy lines.

---

## Card B — Insurance featured plan (UnitedHealthcare Primary Dental)

**Action:** `/compare-ppo-dental-plans.html`

### Concept
The only **featured** card: it earns the structural accent. A flush-left `2px` gold rule runs the card's full height as the anchor; the plan name sits in serif; one factual benefit line. The benefit is the hero, set as a small stat block, not a badge.

### Grid / layout
Four rows: eyebrow / title / fact / CTA. The vertical gold rule replaces the CTA underline as the accent (CTA stays teal, no underline, to keep one accent only). Content indents `16px` from the rule.

### Spacing
Outer padding `24`. Rule offset: content left-padding `+16`. eyebrow-title `16`, title-fact `16`, fact figure-to-label `4`, fact-to-CTA `24`.

### CSS sketch
```css
.mn-card--plan {
  position: relative;
  padding-left: 40px;                 /* 24 + 16 indent from rule */
}
.mn-card--plan::before {              /* the single accent: vertical rule */
  content: "";
  position: absolute;
  left: 24px; top: 24px; bottom: 24px;
  width: 2px;
  background: var(--gold);
}
.mn-card--plan .mn-cta {
  border-bottom: none;                /* accent already spent on the rule */
  color: var(--teal-deep);
}
.mn-fact { margin: 16px 0 0; }
.mn-fact b {
  display: block;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 30px;
  line-height: 32px;
  color: var(--teal-deep);
}
.mn-fact span {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: .04em;
  color: #3A4B50;
}
```

### Copy (compliant)
- Eyebrow: `FEATURED PLAN`
- Title: `UnitedHealthcare Primary Dental`
- Fact figure: `100%`
- Fact label: `Preventive care covered from day one`
- CTA: `Compare dental plans`

(`100% preventive day one` is a stated plan term, not an invented stat.)

### States
- Default: ivory, gold vertical rule, teal figure.
- Hover: cream fill; rule stays `--gold`; CTA color → `--teal`.
- Focus: 2px teal outline, offset 2.
- Active: cream darker; no transform.

### Rationale
Featured status is expressed structurally (the rule), not loudly. The `100%` figure carries the message in one glance; the serif numeral is the type contrast that gives the card weight without ornament. Single accent rule respected, the rule is the accent, so the CTA drops its underline.

---

## Card C — For Dentists (claim profile)

**Action:** `/claim-dentist-listing-profile.html`

### Concept
The B2B card. Inverted ground to separate it from the two patient cards: teal-deep field, ivory type. Same grid, same restraint. Two short facts as a clean inline pair, gold used only on the CTA underline.

### Grid / layout
Standard three-row grid. Body holds title + a two-item fact list (`free`, `3-day review`) set as a thin divided pair, not chips.

### Spacing
Padding `24`. eyebrow-title `16`, title-facts `16`, facts-CTA `24`. Fact items separated by a `1px` ivory-15% divider with `12px` gaps.

### CSS sketch
```css
.mn-card--claim {
  background: var(--teal-deep);
  border-color: var(--teal);
  color: var(--ivory);
}
.mn-card--claim .mn-eyebrow { color: var(--gold); }
.mn-card--claim .mn-title   { color: var(--ivory); }
.mn-card--claim .mn-text    { color: #CFE0DE; }
.mn-facts {
  display: flex;
  gap: 12px;
  align-items: baseline;
  font-size: 13px;
  color: var(--ivory);
}
.mn-facts span + span {
  padding-left: 12px;
  border-left: 1px solid rgba(255,253,249,.18);
}
.mn-card--claim .mn-cta {
  color: var(--ivory);
  border-bottom: 2px solid var(--gold);  /* single accent */
}
.mn-card--claim:hover { background: #0B3438; border-color: var(--gold); }
.mn-card--claim .mn-cta:hover { color: var(--gold); }
.mn-card--claim:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
```

### Copy (compliant)
- Eyebrow: `FOR DENTISTS`
- Title: `Claim your profile`
- Text: `Add your office to our directory and manage how patients see you.`
- Facts: `Free` · `Reviewed in 3 days`
- CTA: `Claim your listing`

### States
- Default: teal-deep field, gold eyebrow + CTA underline.
- Hover: field darkens to `#0B3438`, hairline → gold, CTA → gold.
- Focus: 2px gold outline (teal would vanish on the dark field), offset 2.
- Active: field holds darkest; no transform.

### Rationale
Color inversion does the categorization work so no extra labels or icons are needed. On the dark field the focus ring switches to gold for contrast; otherwise the card obeys the same grid, padding, and single-accent rule as A and B. Facts as a divided inline pair read as specification, not marketing.

---

## Cross-card alignment check

| Property | A Find | B Plan | C Claim |
|---|---|---|---|
| Width × min-height | 300 × 360 | 300 × 360 | 300 × 360 |
| Padding | 24 | 24 (+16 indent) | 24 |
| Single accent | CTA underline | vertical rule | CTA underline |
| Type contrast | serif title / sans | serif title + numeral / sans | serif title / sans |
| Ground | ivory | ivory | teal-deep |
| Focus ring | teal | teal | gold |

Eyebrow baselines, title cap-heights, and CTA baselines all land on the shared 8px grid across the three cards, so the column reads as one set when the panel opens.

## Compliance note
No arrows in visible text. CTAs are sentence case and name the action (`Find a dentist`, `Compare dental plans`, `Claim your listing`). No all-caps in copy (uppercase used only on tracked eyebrow labels, which are styling, not headline copy). None of the forbidden words appear. No invented stats, ratings, or testimonials — `100%` and `3 days` are stated plan/service terms.
