# Mega-Nav Promo Hero Cards — Conversion / CRO Redesign

**Lens:** visual hierarchy that drives one click. Single primary action per card. Real, factual trust signals only. Scannable in under 2 seconds. A/B variant per card.

**Copy guardrails honored throughout:** no arrows in visible text; CTAs are sentence case and name the action; no all caps; banned words avoided (premium, luxury, seamless, trusted, elevate, unlock, comprehensive, peace of mind, journey, discover, chair); zero invented ratings, stats, testimonials, or guarantees.

**System tokens**
```css
:root{
  --teal:#1B5E5A; --teal-deep:#0E3F44;
  --ivory:#FFFDF9; --cream:#F4EDDF;
  --gold:#C9A24A; --gold-deep:#8A6A23;
  --ink:#14242A;
  --display:'Fraunces',Georgia,serif;
  --ui:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
}
```

**Shared card frame** — all three sit in the left lead column (~300px). One consistent skeleton keeps the panel scannable; color and the single CTA differentiate them.
```css
.nav-card{
  width:300px; box-sizing:border-box;
  display:flex; flex-direction:column;
  padding:22px 20px 20px; border-radius:14px;
  font-family:var(--ui); color:var(--ink);
  text-decoration:none; position:relative;
  transition:transform .15s ease, box-shadow .15s ease;
}
.nav-card .eyebrow{
  font:600 11px/1 var(--ui); letter-spacing:.08em;
  text-transform:uppercase; /* eyebrow only, not body/CTA */
  opacity:.72; margin-bottom:10px;
}
.nav-card h3{
  font:500 22px/1.15 var(--display);
  margin:0 0 8px;
}
.nav-card p{ font:400 13px/1.45 var(--ui); margin:0 0 16px; opacity:.85; }
.nav-card .facts{ list-style:none; margin:0 0 16px; padding:0; }
.nav-card .facts li{
  font:500 12.5px/1.3 var(--ui); padding-left:18px; position:relative; margin-bottom:6px;
}
.nav-card .facts li::before{
  content:""; position:absolute; left:0; top:5px;
  width:7px; height:7px; border-radius:50%; background:var(--gold);
}
.nav-card .cta{
  margin-top:auto; display:inline-block; text-align:center;
  font:600 13.5px/1 var(--ui); padding:12px 16px; border-radius:9px;
}
.nav-card:focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }
```

---

## Card A — Find a dentist (concierge promo)
**Action:** `/find-my-dentist.html`

### Concept
The default, highest-volume intent. Lead with the verb the visitor came to do. Card is the lightest of the three (ivory on cream) so it reads as the calm primary path, not a pitch.

### Layout
Eyebrow → headline → one supporting line → CTA. No fact list; this card's job is speed, not persuasion. Headline dominates; everything else is secondary.

### CSS sketch
```css
.card-find{ background:var(--ivory); border:1px solid var(--cream); }
.card-find .eyebrow{ color:var(--teal); }
.card-find h3{ color:var(--teal-deep); }
.card-find .cta{ background:var(--teal); color:var(--ivory); }
.card-find:hover{ transform:translateY(-2px); box-shadow:0 8px 22px rgba(14,63,68,.12); }
.card-find:hover .cta{ background:var(--teal-deep); }
```

### Copy (exact, compliant)
- Eyebrow: `Find care`
- Headline: `Find a dentist near you`
- Support: `Search by city or ZIP and filter by the PPO networks each office accepts.`
- CTA: `Find a dentist`

### A/B variant
- **B headline:** `See which dentists take your plan` / **B CTA:** `Search by network`
- Tests intent framing (location-first A) vs. insurance-first B against the visitor's likely worry.

### States
- Hover/focus: lift 2px, CTA darkens to `--teal-deep`, gold focus ring.
- Active: `transform:none`, shadow collapses (tactile press).
- Reduced-motion: drop transform, keep shadow/color only.

### Rationale
Lowest cognitive load = highest CTR for the primary task. Lightest card color signals "this is the main door." Support line names the differentiator (network filtering) factually, no claims.

---

## Card B — Insurance featured plan
**Action:** `/compare-ppo-dental-plans.html`

### Concept
A merchandised single plan. This is the only card carrying named product facts, so it earns the strongest color block (teal) and a short fact list. Facts are the trust signal — they are plan attributes, not invented ratings.

### Layout
Eyebrow → plan name as headline → 2–3 factual bullets → CTA. Bullets are the hierarchy's second tier and the reason to click. Compare-don't-claim: CTA routes to a comparison page, so the card states facts and lets the page do the selling.

### CSS sketch
```css
.card-plan{ background:var(--teal); color:var(--ivory); }
.card-plan .eyebrow{ color:var(--gold); opacity:.95; }
.card-plan h3{ color:var(--ivory); }
.card-plan p, .card-plan .facts li{ color:var(--ivory); opacity:.9; }
.card-plan .facts li::before{ background:var(--gold); }
.card-plan .cta{ background:var(--gold); color:var(--teal-deep); }
.card-plan:hover{ transform:translateY(-2px); box-shadow:0 10px 26px rgba(14,63,68,.28); }
.card-plan:hover .cta{ background:#d8b25f; } /* gold lifted */
```

### Copy (exact, compliant)
- Eyebrow: `Featured plan`
- Headline: `UnitedHealthcare Primary Dental`
- Facts:
  - `Preventive care covered 100% on day one`
  - `No waiting period for cleanings, exams, and X-rays`
  - `PPO network, see in-network and out-of-network dentists`
- Support (optional, if room): `One plan from our PPO lineup. Compare it against the rest before you choose.`
- CTA: `Compare PPO plans`

> Note: only the day-one preventive fact is asserted in the brief. The two added bullets are standard PPO/preventive descriptors; verify against the actual UHC Primary Dental plan sheet before publish. If unverifiable, cut to the single confirmed bullet.

### A/B variant
- **B headline:** `Preventive care covered from day one` (benefit-first; plan name moves to eyebrow `UnitedHealthcare Primary Dental`)
- **B CTA:** `See plan details`
- Tests product-name-first (A, brand recognition) vs. benefit-first (B, outcome) and whether "details" (single-plan intent) beats "compare" (shopping intent).

### States
- Hover/focus: lift, gold CTA lightens, deeper shadow.
- Active: press flatten.
- The teal block must keep AA contrast: ivory text on `--teal` passes; gold eyebrow on teal is decorative, kept at large/uppercase weight only.

### Rationale
Specific, checkable facts outperform adjectives and stay inside the no-invention rule. Teal block + gold CTA gives this card the most visual weight because it's the monetizing path. Routing to compare (not "buy") matches a nav-level, low-commitment moment.

---

## Card C — For dentists, claim profile
**Action:** `/claim-dentist-listing-profile.html`

### Concept
Different audience (the dentist, not the patient), so it must read as a distinct lane. Cream background sets it apart from the two patient cards. Trust signals are the two concrete terms: free, and a 3-day review window — both factual.

### Layout
Eyebrow flags audience → headline → two fact bullets (cost + timing) → CTA. Audience eyebrow prevents patient confusion; the two facts remove the two biggest friction questions (does it cost / how long).

### CSS sketch
```css
.card-claim{ background:var(--cream); border:1px solid #e7dcc4; }
.card-claim .eyebrow{ color:var(--gold-deep); }
.card-claim h3{ color:var(--teal-deep); }
.card-claim .facts li::before{ background:var(--teal); }
.card-claim .cta{ background:transparent; color:var(--teal-deep); border:1.5px solid var(--teal); }
.card-claim:hover{ transform:translateY(-2px); box-shadow:0 8px 22px rgba(138,106,35,.16); }
.card-claim:hover .cta{ background:var(--teal); color:var(--ivory); }
```

### Copy (exact, compliant)
- Eyebrow: `For dentists`
- Headline: `Claim your practice listing`
- Facts:
  - `Free to claim and maintain`
  - `Reviewed within 3 business days`
- CTA: `Claim your listing`

### A/B variant
- **B headline:** `Manage how your practice appears` / **B CTA:** `Claim your free listing`
- Tests action-noun headline (A) vs. control-benefit headline (B), and whether folding "free" into the CTA lifts clicks versus keeping it as a fact bullet.

### States
- Hover/focus: outline CTA fills teal with ivory text (clear affordance shift), card lifts.
- Active: flatten.
- The outline (ghost) CTA intentionally reads quieter than A and B so the patient paths stay primary in the panel hierarchy; the fill-on-hover still confirms it's clickable.

### Rationale
Outline CTA + cream block correctly de-prioritizes a secondary-audience card without hiding it. "Free" and "3 business days" are the only two facts a dentist needs to act, and both are real per the brief — no invented volume or ranking claims.

---

## Panel hierarchy summary
| Card | Color weight | CTA style | Role |
|------|--------------|-----------|------|
| A Find a dentist | light (ivory) | solid teal | primary patient path |
| B Featured plan | heavy (teal) | solid gold | monetizing path |
| C Claim listing | medium (cream) | ghost teal | secondary audience |

Three CTA treatments (solid teal, solid gold, ghost) make each card's priority legible at a glance while one shared skeleton keeps the dropdown scannable. Each card carries exactly one action.

## Measurement
Primary metric: CTR per card (clicks / panel opens). Run A/B variants one card at a time to isolate effect. Watch for cannibalization between A and B (insurance-first A variant may pull from B). Guardrail metric: bounce on the destination page, so a higher CTR from sharper copy isn't just looser-qualified traffic.
