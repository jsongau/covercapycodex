# Mega-Nav Promo Hero Cards — Hospitality / Concierge Lens

**Designer brief:** Three left-column promo cards (~300px wide) anchoring the dropdown panels. The feeling we want is the front desk of a small hotel: someone looked up before you finished speaking, already knows the answer, and is unhurried about it. Warmth comes from specificity and rhythm, not adjectives.

**Shared system**
- Teal `#1B5E5A` / deep teal `#0E3F44`; ivory `#FFFDF9`; cream `#F4EDDF`; gold `#C9A24A` / `#8A6A23`; ink `#14242A`.
- Display: Fraunces (serif), used for the card headline only. UI/body: system sans.
- Card frame is shared so the three read as a set.

```css
.nav-promo {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 22px 20px;
  border-radius: 14px;
  background: var(--ivory, #FFFDF9);
  border: 1px solid #E9E1CF;          /* warm hairline, not grey */
  box-shadow: 0 1px 0 #FFFFFF inset, 0 10px 24px -18px rgba(14,63,68,.45);
  transition: box-shadow .22s ease, transform .22s ease, border-color .22s ease;
}
.nav-promo:hover { transform: translateY(-1px); box-shadow: 0 14px 30px -16px rgba(14,63,68,.5); border-color:#DFD4BD; }
.nav-promo .eyebrow {
  font: 600 11.5px/1 system-ui, sans-serif;
  letter-spacing: .08em; text-transform: none; color: var(--gold-deep,#8A6A23);
}
.nav-promo .title {
  font-family: Fraunces, Georgia, serif; font-weight: 500;
  font-size: 22px; line-height: 1.12; color: var(--ink,#14242A);
}
.nav-promo .body { font: 400 13.5px/1.5 system-ui, sans-serif; color:#3A4A4A; }
.nav-promo .cta {
  margin-top: 4px; align-self: flex-start;
  font: 600 13px/1 system-ui, sans-serif;
  padding: 11px 16px; border-radius: 999px;
  background: var(--teal,#1B5E5A); color: var(--ivory,#FFFDF9);
  border: 0; cursor: pointer; text-decoration: none;
  transition: background .18s ease, box-shadow .18s ease;
}
.nav-promo .cta:hover { background: var(--teal-deep,#0E3F44); box-shadow: 0 6px 16px -8px rgba(14,63,68,.6); }
.nav-promo .cta:focus-visible { outline: 2px solid var(--gold,#C9A24A); outline-offset: 2px; }
```

---

## Card A — Find a Dentist (concierge promo)

**Action:** `/find-my-dentist.html`

**Concept.** The "we'll make the call" desk. The promise is not a directory; it's that a person handles the matching against your plan. A small gold "open" dot signals a live, attended service.

**Layout.** Eyebrow → headline (2 lines) → one-sentence body → small attended-hours line in cream chip → CTA. A 3px teal rule sits flush along the card's left inner edge as a spine, the way a reception desk has an edge you walk up to.

```css
.promo-find { position: relative; }
.promo-find::before {           /* desk-edge spine */
  content:""; position:absolute; left:0; top:14px; bottom:14px; width:3px;
  border-radius:3px; background: linear-gradient(var(--teal,#1B5E5A), var(--teal-deep,#0E3F44));
}
.promo-find { padding-left: 26px; }
.promo-find .attended {
  display:inline-flex; align-items:center; gap:7px; align-self:flex-start;
  background: var(--cream,#F4EDDF); color:#46402E;
  font:500 12px/1 system-ui, sans-serif; padding:7px 11px; border-radius:999px;
}
.promo-find .dot { width:7px; height:7px; border-radius:50%; background:var(--gold,#C9A24A); box-shadow:0 0 0 3px rgba(201,162,74,.22); }
```

**Copy (compliant).**
- Eyebrow: `Find a dentist`
- Headline: `Tell us your plan. We do the matching.`
- Body: `Share your carrier and your zip. We line up nearby offices that take it and confirm they're taking new patients.`
- Chip: `Front desk attended weekdays 9 to 6`
- CTA: `Start with my plan`

**States.** Default as above. Hover: card lifts 1px, spine deepens. Focus: gold ring on CTA. The gold dot has a slow 2.4s opacity pulse (`@media (prefers-reduced-motion: reduce)` removes it).

**Rationale.** "We do the matching" assigns the labor to us, which is the core concierge tell. The attended-hours chip is concrete and human without inventing a stat. No forbidden words; CTA names the action in sentence case.

---

## Card B — Insurance featured plan (UnitedHealthcare Primary Dental)

**Action:** `/compare-ppo-dental-plans.html`

**Concept.** The "today's selection" card, like a hotel listing one room category by name. One plan, named, with the single fact that matters: preventive care covered in full from the first day. Restraint signals confidence.

**Layout.** Slightly richer surface (deep-teal header band, ivory body) so it reads as the featured pick of the panel. Header band carries eyebrow + plan name in Fraunces. Body holds one fact line and a fine-print line, then CTA. Gold underline tucked beneath the plan name.

```css
.promo-plan { padding:0; overflow:hidden; }
.promo-plan .band {
  background: linear-gradient(160deg, var(--teal,#1B5E5A), var(--teal-deep,#0E3F44));
  color: var(--ivory,#FFFDF9); padding:18px 22px 16px;
}
.promo-plan .band .eyebrow { color: var(--gold,#C9A24A); }
.promo-plan .band .title { color: var(--ivory,#FFFDF9); margin-top:6px; }
.promo-plan .band .rule { width:34px; height:2px; background:var(--gold,#C9A24A); border-radius:2px; margin-top:10px; }
.promo-plan .inner { padding:16px 22px 20px; display:flex; flex-direction:column; gap:12px; }
.promo-plan .fact { font:500 14px/1.45 system-ui,sans-serif; color:var(--ink,#14242A); }
.promo-plan .fact b { color: var(--teal-deep,#0E3F44); }
.promo-plan .fine { font:400 12px/1.45 system-ui,sans-serif; color:#6A6450; }
```

**Copy (compliant).**
- Eyebrow: `Featured plan`
- Headline: `UnitedHealthcare Primary Dental`
- Fact: `Cleanings and exams are covered in full starting **day one**. No waiting period on preventive visits.`
- Fine: `Other services follow the plan's schedule. See full terms before you enroll.`
- CTA: `See plan details`

**States.** Hover lifts the whole card; band gradient shifts a touch deeper. CTA hover/focus per shared rules. If used in a "compare" context the CTA may swap to `Compare this with others` (still sentence case, no arrows).

**Rationale.** Naming the carrier and stating one verifiable benefit beats a wall of features. The fine-print line is a hospitality move: tell the guest the limits up front so nothing feels oversold. "Day one" is the plan's own term, not an invented stat.

---

## Card C — For Dentists (claim your profile)

**Action:** `/claim-dentist-listing-profile.html`

**Concept.** The "your name is already on the door" card, addressed to the practice owner. Tone shifts from guest-facing to peer-to-peer host: respectful, low-pressure, with the two facts an owner asks first, cost and timing.

**Layout.** Cream surface to set it apart from the two patient cards. Headline, short body, then a two-row fact list (free / reviewed in three business days) with small gold ticks. CTA at base. A faint Fraunces ampersand or initial watermark in the top-right corner adds tactile warmth at low opacity.

```css
.promo-claim { background: var(--cream,#F4EDDF); border-color:#E3D7BD; position:relative; }
.promo-claim .mark {
  position:absolute; top:10px; right:16px; font-family:Fraunces,serif; font-weight:500;
  font-size:46px; line-height:1; color:rgba(138,106,35,.10); pointer-events:none; user-select:none;
}
.promo-claim .facts { list-style:none; margin:2px 0 0; padding:0; display:flex; flex-direction:column; gap:8px; }
.promo-claim .facts li { display:flex; align-items:flex-start; gap:9px; font:500 13px/1.4 system-ui,sans-serif; color:#3A3528; }
.promo-claim .tick { flex:0 0 auto; width:16px; height:16px; margin-top:1px; color:var(--gold-deep,#8A6A23); }
.promo-claim .cta { background:var(--gold-deep,#8A6A23); }
.promo-claim .cta:hover { background:#6F551B; }
.promo-claim .cta:focus-visible { outline-color:var(--teal,#1B5E5A); }
```

**Copy (compliant).**
- Eyebrow: `For dentists`
- Headline: `Claim the profile for your practice.`
- Body: `Confirm your hours, the plans you take, and how patients reach you, so the listing reads the way you'd say it at the front desk.`
- Facts:
  - `Free to claim and keep.`
  - `Reviewed within three business days.`
- CTA: `Claim my profile`

**States.** Hover lifts card; gold CTA darkens. Focus ring is teal here for contrast against the gold button. Watermark stays static (decorative, no motion).

**Rationale.** Gold CTA distinguishes the audience switch without a new layout language. The two facts answer the owner's real questions instead of selling; "reviewed within three business days" is a process commitment, not a rating. "Reads the way you'd say it at the front desk" carries the hospitality voice into a B2B card.

---

## Set-level notes
- Three cards, one frame, three surfaces (ivory / teal-banded / cream) so the eye reads them as a curated row, not a stack of ads.
- Only one element animates per card (gold dot on A); everything else is a calm lift on hover. Honors `prefers-reduced-motion`.
- Every CTA names its action in sentence case, no arrows, none of the banned words. Gold is used as an accent and for the owner CTA only, keeping it meaningful rather than decorative everywhere.
