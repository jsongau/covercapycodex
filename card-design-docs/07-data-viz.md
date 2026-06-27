# Mega-Nav Promo Hero Cards — Data-Viz Redesign

**Lens:** small, honest visual-proof elements. Every mark either encodes a real value, is clearly labeled illustrative, or is a pure geometric motif carrying no numeric claim. No invented stats. No banned words. No arrows in visible text. CTAs in sentence case, naming the action.

**Shared tokens**
```css
--teal:#1B5E5A; --teal-deep:#0E3F44;
--ivory:#FFFDF9; --cream:#F4EDDF;
--gold:#C9A24A; --gold-deep:#8A6A23;
--ink:#14242A;
--font-display:'Fraunces',serif;
--font-ui:system-ui,-apple-system,sans-serif;
```
Card frame (all three): ~300px wide, ivory ground, 1px `--cream` border, 16px radius, 20px padding. Display type Fraunces; labels/CTAs system sans. Viz sits top-left as a quiet badge, ~64px, never louder than the headline.

---

## Card A — Find a dentist (concierge)
**Action:** `/find-my-dentist.html`

### Concept
A coverage-radius motif: concentric rings around a center pin, reading as "search outward from where you are." Pure geometry, no number attached, so it cannot misstate a count or distance.

### Viz element — coverage rings
Three nested rings, center dot, one faint dashed outer ring suggesting the search expands. Teal on ivory, gold center.

```css
.viz-radius{width:64px;height:64px;position:relative}
.viz-radius .ring{position:absolute;inset:0;margin:auto;border-radius:50%;border:1.5px solid var(--teal)}
.viz-radius .r1{width:18px;height:18px;opacity:.9}
.viz-radius .r2{width:36px;height:36px;opacity:.55}
.viz-radius .r3{width:60px;height:60px;opacity:.28;border-style:dashed}
.viz-radius .pin{position:absolute;inset:0;margin:auto;width:8px;height:8px;
  border-radius:50%;background:var(--gold)}
```

### Layout
Rings top-left. Overline (sans, gold-deep, 11px tracked). Headline (Fraunces, 22px, ink, two lines max). One support line (sans, 14px). CTA text link bottom-left.

### Copy
- Overline: `Concierge`
- Headline: `Find a dentist near you`
- Support: `Tell us your area and your plan. We match you to offices that take it.`
- CTA: `Find a dentist`

### States
- Rest: r3 dashed, static.
- Hover: r3 scales to 1.08 over 240ms ease; gold pin brightens. Card border shifts `--cream` to `--gold` at 30% opacity.
- Focus-visible: 2px gold-deep outline on whole card, rings unchanged.
- Reduced-motion: no scale; hover only swaps border color.

### Rationale
Rings imply spatial reach without printing a mileage or office count, so nothing can become false as inventory changes. Concentric form reads instantly as "search around me," reinforcing the concierge match without decorative noise.

---

## Card B — Insurance featured plan
**Action:** `/compare-ppo-dental-plans.html`
**Real fact used:** UnitedHealthcare Primary Dental, preventive care covered 100% from day one.

### Concept
A single coverage meter encoding the one verifiable number: 100% preventive on day one. The bar is full because the figure is full. Labeled "Preventive care" so the 100% is scoped honestly and never reads as total plan coverage.

### Viz element — coverage meter
A horizontal track that fills completely, with the value and scope printed beside it. The 100% is the real, named figure; nothing else is quantified.

```css
.viz-meter{width:100%}
.viz-meter .label{font:600 11px var(--font-ui);letter-spacing:.06em;
  color:var(--gold-deep);text-transform:none}
.viz-meter .track{height:8px;border-radius:6px;background:var(--cream);overflow:hidden;margin:6px 0 4px}
.viz-meter .fill{height:100%;width:100%;border-radius:6px;
  background:linear-gradient(90deg,var(--teal),var(--teal-deep))}
.viz-meter .val{font:500 13px var(--font-display);color:var(--ink)}
```
Note: gradient here is on a meter fill (data ink), not a decorative card surface.

### Layout
Plan name first (Fraunces, 18px). Carrier line (sans, 13px, ink 70%). Meter block. Then CTA. Tier badge ("Featured plan") top-right in gold-deep on cream, 10px.

### Copy
- Badge: `Featured plan`
- Plan name: `UnitedHealthcare Primary Dental`
- Meter label: `Preventive care, day one`
- Meter value: `100%`
- Support: `Cleanings and exams covered in full from your first day on the plan.`
- CTA: `Compare dental plans`

### States
- Rest: fill static at 100%.
- Hover: fill animates left-to-right wipe (0 to 100% over 500ms) once, reinforcing "full." Border to gold 30%.
- Focus-visible: gold-deep card outline.
- Reduced-motion: fill renders at 100% with no wipe.

### Rationale
One meter, one honest number, scoped by its label so 100% can never be misread as whole-plan coverage. A full bar that fills to full is the rare case where the animation is literally true, which is why it is allowed.

---

## Card C — For dentists, claim your profile
**Action:** `/claim-dentist-listing-profile.html`
**Real facts:** free; review within 3 days.

### Concept
A three-step indicator (claim, verify, live) with a labeled 3-day note. The dots show process, not progress, so they make no claim about the user's own status. The "3 days" is the one real figure and is printed as text, not encoded in a misleading bar.

### Viz element — steps dots
Three connected nodes, the first filled (the action you take now), the rest outlined.

```css
.viz-steps{display:flex;align-items:center;gap:0}
.viz-steps .node{width:12px;height:12px;border-radius:50%;
  border:1.5px solid var(--teal);background:var(--ivory)}
.viz-steps .node.done{background:var(--teal)}
.viz-steps .seg{width:18px;height:1.5px;background:var(--teal);opacity:.45}
.viz-steps .cap{font:600 11px var(--font-ui);color:var(--gold-deep);margin-left:8px}
```

### Layout
Steps row top-left, with caption `3 steps` beside it. Headline (Fraunces, 20px). Support line naming free + timing. CTA link. Small step legend under support: `Claim · Verify · Live`.

### Copy
- Overline: `For dentists`
- Headline: `Claim your profile`
- Steps caption: `3 steps`
- Step legend: `Claim · Verify · Live`
- Support: `It is free. We review each claim within 3 days.`
- CTA: `Claim your listing`

### States
- Rest: first node filled, others outlined.
- Hover: second then third node fill in sequence (120ms apart), previewing the path; resets on leave. Border to gold 30%.
- Focus-visible: gold-deep card outline.
- Reduced-motion: no sequential fill; only the first node stays filled.

### Rationale
Step dots communicate "short, defined process" without asserting where any given dentist sits in it. The single real figure (3 days) and the price (free) stay as plain text, so nothing numeric is encoded in a way that could drift from the truth.

---

## Cross-card compliance check
- No arrows anywhere in visible text. ✓
- CTAs sentence case, each names its action (find / compare / claim). ✓
- No banned words. ✓
- Only real or scoped values: A has none, B uses the named 100% preventive day-one fact, C uses free + 3-day. ✓ No invented ratings or counts.
- Gradients used only as data ink (Card B meter fill), never as decorative card surfaces. ✓
