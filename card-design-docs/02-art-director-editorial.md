# Mega-Nav Promo Hero Cards — Art Director Redesign

**Lens:** editorial print sensibility. Typography as structure, whitespace as confidence, color used sparingly and with intent. Three cards, each ~300px wide, stacked in the left lead column of a dropdown panel.

---

## Shared foundations

### Palette (system)
| Token | Value | Role |
|---|---|---|
| `--teal` | `#1B5E5A` | primary fields, ink on ivory |
| `--teal-deep` | `#0E3F44` | deepest ground, card C base |
| `--ivory` | `#FFFDF9` | default card ground |
| `--cream` | `#F4EDDF` | warm panel, dividers |
| `--gold` | `#C9A24A` | hairlines, the single accent stroke |
| `--gold-ink` | `#8A6A23` | gold-on-ivory text (contrast-safe) |
| `--ink` | `#14242A` | body, headline ink |

### Type system
- **Display:** Fraunces, optical size high, weight 500, slight negative tracking. Italics reserved for one editorial flourish per card (the plan name, the offer noun).
- **UI/Label:** system sans, weight 600 for eyebrows, 500 for CTAs, letter-spacing `0.14em` on eyebrows only.
- **Scale (per card):**
  - Eyebrow / kicker: 11px sans, 0.14em tracking, `--gold-ink` or `--teal-300` equivalent
  - Display headline: 24–26px Fraunces, line-height 1.05
  - Supporting line: 13px sans, line-height 1.5, `--ink` at 78% opacity
  - CTA: 13px sans, 500

### Grid (all three)
- Card: 300 × ~210px, internal padding 22px.
- A single vertical baseline column governs left edges; the gold hairline and the eyebrow share that 22px margin.
- One **structural hairline** per card (1px gold, 28% opacity) sets the editorial register — never a box, never a full border.
- Bottom CTA sits on its own baseline with 18px of air above it. No button chrome by default; the CTA reads as a typeset line with a gold underline that animates on hover.

### Binding copy compliance
No arrows in text. CTAs sentence case, naming the action. No all caps. None of the prohibited words. No invented stats — only the one factual claim supplied (100% preventive day one) and the supplied offer terms (free, 3-day review).

---

## Card A — Find a dentist (concierge)

**Action:** `/find-my-dentist.html`

### Concept
The "contents page" of the panel. Quiet ivory ground, generous top whitespace, a serif headline that behaves like a magazine section opener. Concierge tone carried by restraint, not ornament.

### Layout / grid
- Ground: `--ivory`.
- Top 22px: eyebrow on the baseline column.
- Gold hairline (40px wide, left-aligned) directly under the eyebrow — a section rule, not a divider.
- Headline occupies the upper-middle, two lines max.
- Supporting line drops to a second baseline band with 12px gap.
- CTA pinned to bottom baseline.

### Type treatment
- Eyebrow: `Find care` — 11px sans, `--gold-ink`, 0.14em.
- Headline: 26px Fraunces 500, `--ink`. One word set in italic to add editorial rhythm.
- Supporting: 13px sans, `--ink` 78%.

### Exact copy
- Eyebrow: `Find care`
- Headline: `A dentist matched to your *plan*` *(italic on "plan")*
- Supporting: `Tell us your carrier and city. We line up offices that take it.`
- CTA: `Find a dentist`

### CSS sketch
```css
.nav-card--find {
  background: var(--ivory);
  padding: 22px;
  color: var(--ink);
}
.nav-card__eyebrow {
  font: 600 11px/1 system-ui, sans-serif;
  letter-spacing: .14em;
  color: var(--gold-ink);
}
.nav-card__rule {
  width: 40px; height: 1px;
  background: var(--gold); opacity: .55;
  margin: 12px 0 16px;
}
.nav-card__h {
  font: 500 26px/1.05 'Fraunces', serif;
  letter-spacing: -.01em;
}
.nav-card__h em { font-style: italic; }
.nav-card__sub {
  font: 400 13px/1.5 system-ui, sans-serif;
  color: rgba(20,36,42,.78);
  margin-top: 10px;
}
.nav-card__cta {
  display: inline-block; margin-top: 18px;
  font: 500 13px/1 system-ui, sans-serif;
  color: var(--teal);
  border-bottom: 1px solid transparent;
  transition: border-color .18s ease;
}
.nav-card--find:hover .nav-card__cta { border-color: var(--gold); }
```

### States
- **Default:** flat ivory.
- **Hover (whole card is the link):** ground warms to `--cream`; CTA underline draws in gold; gold rule extends 40px → 56px (160ms ease).
- **Focus-visible:** 2px `--teal` outline, 3px offset.
- **Active:** ground holds `--cream`, no shift.

### Rationale
Card A is the entry point, so it should feel like white space and intent. The italic single word and the short rule read as typesetting, not decoration. Ivory keeps it the calmest of the three so the offer cards (B, C) can carry color weight without the panel feeling busy.

---

## Card B — Featured plan (insurance)

**Action:** `/compare-ppo-dental-plans.html`

### Concept
The "featured product" plate. Teal field flips the contrast so this card reads as the panel's anchor. The plan name is treated like a masthead; the one factual claim gets its own typeset line, isolated, like a pull quote.

### Layout / grid
- Ground: `--teal` with a 6px `--teal-deep` spine on the left edge (the only structural color block in the set).
- Eyebrow top-left in `--cream`.
- Plan name as two-line display, ivory.
- A short gold hairline separates name from the claim line.
- Claim line set apart, ivory at full weight — the single number is the focal point.
- CTA on ivory text with gold underline on hover.

### Type treatment
- Eyebrow: 11px sans, `--cream`, 0.14em.
- Plan name: 24px Fraunces 500, `--ivory`, italic on "Primary Dental" to mark it as the named entity.
- Claim: 13px sans, `--ivory`; the figure `100%` rendered 15px to lift it without a chart or badge.

### Exact copy
- Eyebrow: `Featured plan`
- Plan name: `UnitedHealthcare *Primary Dental*` *(italic on "Primary Dental")*
- Claim: `100% preventive care, covered from day one.`
- CTA: `Compare dental plans`

### CSS sketch
```css
.nav-card--plan {
  background: var(--teal);
  border-left: 6px solid var(--teal-deep);
  padding: 22px;
  color: var(--ivory);
}
.nav-card--plan .nav-card__eyebrow { color: var(--cream); }
.nav-card--plan .nav-card__h {
  font: 500 24px/1.08 'Fraunces', serif;
  color: var(--ivory); margin-top: 12px;
}
.nav-card--plan .nav-card__h em { font-style: italic; }
.nav-card--plan .nav-card__rule {
  width: 36px; height: 1px; background: var(--gold);
  opacity: .8; margin: 14px 0;
}
.nav-card__claim {
  font: 400 13px/1.5 system-ui, sans-serif;
  color: var(--ivory);
}
.nav-card__claim b {
  font-weight: 600; font-size: 15px;
}
.nav-card--plan .nav-card__cta {
  color: var(--ivory); margin-top: 16px;
  border-bottom: 1px solid transparent;
}
.nav-card--plan:hover .nav-card__cta { border-color: var(--gold); }
```

### States
- **Default:** flat teal.
- **Hover:** ground deepens toward `--teal-deep`; gold rule brightens to full opacity; CTA underline draws in.
- **Focus-visible:** 2px `--gold` outline, 3px offset (gold reads better than teal on the teal field).
- **Active:** holds `--teal-deep`.

### Rationale
Flipping to teal makes B the visual anchor without enlarging it — contrast does the hierarchy work, not size. Isolating the `100%` on its own line, slightly larger, lets the one real fact carry weight without a fabricated badge or rating. The left spine is the only solid color block in the trio, which keeps B reading as "featured" against A and C.

---

## Card C — Claim your profile (for dentists)

**Action:** `/claim-dentist-listing-profile.html`

### Concept
The "trade notice" — addressed to a different reader (practices, not patients), so it earns a distinct register: the deepest ground in the set with gold as the active accent. Reads like the back-of-book professional listing in a magazine.

### Layout / grid
- Ground: `--teal-deep`.
- Eyebrow in `--gold` to signal the audience shift.
- Headline two lines, ivory.
- The two offer terms (free, 3-day review) set as a single typeset line — no pills, no boxes — separated by a thin gold mid-dot.
- CTA bottom baseline, gold text on the dark ground.

### Type treatment
- Eyebrow: 11px sans, `--gold`, 0.14em.
- Headline: 24px Fraunces 500, `--ivory`, italic on "yours".
- Offer line: 12px sans, `--cream`; gold `·` separator.
- CTA: 13px sans, `--gold`, underline animates on hover.

### Exact copy
- Eyebrow: `For dentists`
- Headline: `Make this listing *yours*` *(italic on "yours")*
- Offer line: `Free to claim · reviewed within 3 days`
- CTA: `Claim your profile`

### CSS sketch
```css
.nav-card--claim {
  background: var(--teal-deep);
  padding: 22px;
  color: var(--ivory);
}
.nav-card--claim .nav-card__eyebrow { color: var(--gold); }
.nav-card--claim .nav-card__h {
  font: 500 24px/1.08 'Fraunces', serif;
  color: var(--ivory); margin-top: 12px;
}
.nav-card--claim .nav-card__h em { font-style: italic; }
.nav-card__offer {
  font: 400 12px/1.5 system-ui, sans-serif;
  color: var(--cream); margin-top: 14px;
}
.nav-card__offer .dot { color: var(--gold); margin: 0 6px; }
.nav-card--claim .nav-card__cta {
  color: var(--gold); margin-top: 16px;
  border-bottom: 1px solid transparent;
}
.nav-card--claim:hover .nav-card__cta { border-color: var(--gold); }
```

### States
- **Default:** flat deep teal.
- **Hover:** offer line brightens `--cream` → `--ivory`; CTA gold underline draws in; eyebrow holds.
- **Focus-visible:** 2px `--gold` outline, 3px offset.
- **Active:** subtle 1px inset gold hairline at top edge to confirm press.

### Rationale
A different reader deserves a different register; the deep ground plus gold-forward accents quietly says "this part is for you, the practice." Setting the two offer terms as one typeset line with a gold mid-dot keeps the claim factual and uncluttered — no manufactured urgency, no badge furniture. Gold leading the eyebrow and CTA gives C an identity distinct from B's ivory-on-teal while staying inside the same system.

---

## The trio as a set
Stacked top to bottom: **A ivory → B teal → C deep teal.** The descending value creates a deliberate editorial gradient down the column, and the gold hairline recurs as the connective motif across all three. Patients meet light-to-mid cards; practices land on the dark footer card. One accent (gold), one display face (Fraunces), one structural device (the hairline) — repeated, never decorated.
