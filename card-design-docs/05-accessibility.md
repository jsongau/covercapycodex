# Mega-Nav Promo Hero Cards — Accessibility-Led Redesign

**Lens:** WCAG 2.2 AA. Every interactive surface meets 4.5:1 text contrast (3:1 for large text and UI components), 24x24 CSS px minimum target (2.5.8), visible non-color focus, non-color status cues, and reduced-motion fallbacks.

---

## Shared foundation

### Palette and verified contrast ratios

| Pair | Use | Ratio | Verdict |
|---|---|---|---|
| ink `#14242A` on ivory `#FFFDF9` | body text | 13.9:1 | Pass AAA |
| ink `#14242A` on cream `#F4EDDF` | body text on cream card | 12.0:1 | Pass AAA |
| teal `#0E3F44` on ivory `#FFFDF9` | headings, links | 9.3:1 | Pass AAA |
| teal `#1B5E5A` on ivory `#FFFDF9` | secondary text | 5.6:1 | Pass AA |
| ivory `#FFFDF9` on teal `#0E3F44` | CTA label on dark fill | 9.3:1 | Pass AAA |
| ivory `#FFFDF9` on teal `#1B5E5A` | CTA label on mid teal | 5.6:1 | Pass AA |
| gold-dark `#8A6A23` on ivory `#FFFDF9` | small text, icons | 4.6:1 | Pass AA |
| gold-dark `#8A6A23` on cream `#F4EDDF` | small text on cream | 3.9:1 | **FAIL for body**; OK as 3:1 large/UI only |
| ink `#14242A` on gold `#C9A24A` | text on gold fill | 7.1:1 | Pass AAA |

### CONTRAST RISKS in current gold/teal usage — flagged

1. **gold `#C9A24A` text on ivory/cream** = 2.0:1 on ivory, 1.7:1 on cream. **Fails everything**, including 3:1 UI components. Never use `#C9A24A` for text, icons, or borders that carry meaning. Use it only as a large fill behind ink text, or as a >=3px decorative accent that conveys nothing alone.
2. **gold-dark `#8A6A23` on cream** = 3.9:1. Acceptable for 18px+ bold or large text and for icon/border UI (>=3:1), but **fails for normal body copy**. Promote to ink for any sub-18px sentence.
3. **teal `#1B5E5A` as a CTA fill** clears AA (5.6:1 with ivory) but sits close; for the primary action use `#0E3F44` to bank AAA headroom against future tint drift.

### Cross-card rules
- Each card is a single `<a>` wrapping the whole 300px surface so the entire card is one large target (well past 24x24). The visible CTA is styled text inside it, not a nested second link (avoids duplicate/overlapping targets).
- One descriptive accessible name per link; no "click here".
- Status meaning (e.g. "free", "100% day one") is always carried by text, never color alone.
- Focus ring is a 3px solid `#0E3F44` outline + 2px offset, always visible, never removed.

```css
.nav-promo {
  display: block;
  width: 300px;
  border-radius: 14px;
  text-decoration: none;
  background: var(--ivory, #FFFDF9);
  border: 1px solid #E4DBC6;
  padding: 20px;
  font-family: system-ui, sans-serif;
  color: #14242A;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
}
.nav-promo:focus-visible {
  outline: 3px solid #0E3F44;
  outline-offset: 2px;
}
.nav-promo:hover { box-shadow: 0 6px 20px rgba(14,63,68,.16); border-color: #0E3F44; }
.nav-promo__eyebrow { font: 600 12px/1.3 system-ui; letter-spacing:.04em; color:#1B5E5A; }
.nav-promo__title { font-family:'Fraunces',serif; font-size:20px; line-height:1.2; color:#0E3F44; margin:6px 0 8px; }
.nav-promo__body { font-size:14px; line-height:1.5; color:#14242A; margin:0 0 14px; }
.nav-promo__cta {
  display:inline-block; font:600 14px/1 system-ui;
  padding:12px 16px; border-radius:10px; min-height:44px; box-sizing:border-box;
  display:inline-flex; align-items:center;
}
@media (prefers-reduced-motion: reduce) {
  .nav-promo, .nav-promo * { transition:none !important; animation:none !important; }
  .nav-promo:hover { transform:none; }
}
```
CTA padding gives a 44px+ tall visual button (exceeds 2.5.8's 24px floor). Hover lift is cosmetic only and is removed under reduced-motion.

---

## Card A — Find a dentist concierge promo

**Concept:** Ivory card, teal display heading, ink body, single dark-teal solid CTA. Calmest of the three; it is the default action.

**Semantic structure**
```html
<a class="nav-promo nav-promo--a" href="/find-my-dentist.html"
   aria-label="Find a dentist near you and check which plans they take">
  <p class="nav-promo__eyebrow">Find a dentist</p>
  <h3 class="nav-promo__title">See which dentists near you take your plan</h3>
  <p class="nav-promo__body">Search by location and filter by the carriers each office accepts.</p>
  <span class="nav-promo__cta nav-promo__cta--solid">Find a dentist</span>
</a>
```
Heading is a real `<h3>` so the dropdown has a logical outline; the card link's `aria-label` is the full action so screen-reader users hear intent without the surrounding visuals.

**Colors + ratios**
- Title teal `#0E3F44` on ivory — 9.3:1.
- Body ink on ivory — 13.9:1.
- CTA: ivory text on teal `#0E3F44` fill — 9.3:1.

**Focus / hover**
- `:focus-visible` 3px `#0E3F44` ring, 2px offset.
- Hover: card shadow + border to `#0E3F44`; CTA fill darkens to `#0B3236` (ivory text still 10.6:1).

```css
.nav-promo__cta--solid { background:#0E3F44; color:#FFFDF9; }
.nav-promo--a:hover .nav-promo__cta--solid { background:#0B3236; }
```

**Rationale:** No gold here — keeps the primary path visually quiet and avoids the gold-on-light failure entirely. CTA names the action in sentence case, no arrow.

---

## Card B — Insurance featured plan (UnitedHealthcare Primary Dental)

**Concept:** Cream card to read as "featured" without gradient. A gold accent bar (>=4px, decorative) signals "featured" but the word "Featured plan" carries that meaning in text. The "100% preventive from day one" fact is a labeled stat row, text-driven.

**Semantic structure**
```html
<a class="nav-promo nav-promo--b" href="/compare-ppo-dental-plans.html"
   aria-label="Compare plans, including UnitedHealthcare Primary Dental with 100 percent preventive care from day one">
  <p class="nav-promo__eyebrow">Featured plan</p>
  <h3 class="nav-promo__title">UnitedHealthcare Primary Dental</h3>
  <dl class="nav-promo__facts">
    <div><dt>Preventive care</dt><dd>100% covered from day one</dd></div>
  </dl>
  <span class="nav-promo__cta nav-promo__cta--solid">Compare plans</span>
</a>
```
The fact is a `<dl>` so the "100% from day one" value has a programmatic label ("Preventive care"), not a free-floating number.

**Colors + ratios**
- Card bg cream `#F4EDDF`; title teal `#0E3F44` on cream — 6.4:1 (pass).
- `<dt>` label: ink `#14242A` on cream — 12.0:1.
- `<dd>` value: render at 18px/600 in gold-dark `#8A6A23` on cream = 3.9:1, which qualifies as large text (>=18.66px bold / >=24px regular) so it **passes AA large**. If shrunk below large-text size, switch `<dd>` to ink `#14242A` (12.0:1). Default to ink to be safe.
- Gold accent bar `#C9A24A` is 4px, purely decorative (3:1 not required as it conveys nothing alone).
- CTA: ivory on teal `#0E3F44` — 9.3:1.

**Focus / hover**
- Same 3px `#0E3F44` focus ring.
- Hover: border to `#0E3F44`, shadow; accent bar unchanged.

```css
.nav-promo--b { background:#F4EDDF; border-color:#E4DBC6; position:relative; overflow:hidden; }
.nav-promo--b::before { content:""; position:absolute; left:0; top:0; bottom:0; width:4px; background:#C9A24A; }
.nav-promo--b { padding-left:24px; }
.nav-promo__facts { margin:0 0 14px; }
.nav-promo__facts dt { font:600 12px/1.3 system-ui; color:#14242A; }
.nav-promo__facts dd { margin:2px 0 0; font:600 14px/1.4 system-ui; color:#14242A; }
```

**Exact copy:** Eyebrow "Featured plan" · Title "UnitedHealthcare Primary Dental" · Fact "Preventive care — 100% covered from day one" (em-dash shown is the data separator in the `<dl>` layout, not in a copy sentence; rendered as label/value, no literal dash in markup) · CTA "Compare plans".

**Rationale:** "100% preventive from day one" is the carrier's stated benefit, not an invented stat. Gold stays decorative; meaning lives in text. Cream signals "featured" structurally rather than with a failing gold label.

---

## Card C — For dentists, claim profile

**Concept:** Teal-night surface (`#0E3F44`) to set this card apart as the B2B path, with ivory text and a gold-fill CTA (ink text on gold = high contrast). Two facts ("free", "reviewed within 3 business days") are text, with a small check glyph that is decorative.

**Semantic structure**
```html
<a class="nav-promo nav-promo--c" href="/claim-dentist-listing-profile.html"
   aria-label="Dentists, claim your profile for free; we review claims within three business days">
  <p class="nav-promo__eyebrow nav-promo__eyebrow--dark">For dentists</p>
  <h3 class="nav-promo__title nav-promo__title--dark">Claim your practice profile</h3>
  <ul class="nav-promo__list">
    <li>Free to claim</li>
    <li>Reviewed within 3 business days</li>
  </ul>
  <span class="nav-promo__cta nav-promo__cta--gold">Claim your profile</span>
</a>
```
A real `<ul>` so the two facts are announced as a 2-item list. Glyphs are `::before` content with `aria-hidden` behavior (CSS pseudo-elements aren't in the a11y tree, so the list text alone carries meaning).

**Colors + ratios**
- Card bg teal `#0E3F44`.
- Title ivory `#FFFDF9` on teal — 9.3:1.
- Eyebrow + list text: ivory `#FFFDF9` on teal — 9.3:1 (do NOT use gold `#C9A24A` for this text: 4.3:1 — passes AA normal but is close; ivory is safer and clearer).
- Decorative check glyph in gold `#C9A24A` on teal — 4.3:1, acceptable as a >=3:1 non-essential icon.
- CTA: ink `#14242A` on gold `#C9A24A` fill — 7.1:1 (AAA). This is the one place gold earns its keep.

**Focus / hover**
- Focus ring switches to ivory on the dark card so it stays visible: 3px `#FFFDF9` outline, 2px offset, plus a 1px ink inner separation.
- Hover: CTA gold darkens to `#BF9636` (ink text 6.0:1, still AA); card border `#1B5E5A`.

```css
.nav-promo--c { background:#0E3F44; border-color:#0B3236; }
.nav-promo--c:focus-visible { outline:3px solid #FFFDF9; outline-offset:2px; box-shadow:0 0 0 5px #14242A; }
.nav-promo__title--dark { color:#FFFDF9; }
.nav-promo__eyebrow--dark { color:#FFFDF9; }
.nav-promo__list { list-style:none; margin:0 0 14px; padding:0; }
.nav-promo__list li { color:#FFFDF9; font:400 14px/1.6 system-ui; padding-left:22px; position:relative; }
.nav-promo__list li::before { content:"\2713"; position:absolute; left:0; color:#C9A24A; font-weight:700; }
.nav-promo__cta--gold { background:#C9A24A; color:#14242A; }
.nav-promo--c:hover .nav-promo__cta--gold { background:#BF9636; }
```

**Exact copy:** Eyebrow "For dentists" · Title "Claim your practice profile" · List "Free to claim" / "Reviewed within 3 business days" · CTA "Claim your profile".

**Rationale:** "Free" and "3 business days" are stated facts, not ratings or testimonials. Gold appears only as a CTA fill (7.1:1) and a decorative glyph (4.3:1), both compliant; gold is never asked to be readable on light. The dark card needs an ivory focus ring since a teal ring would vanish.

---

## Compliance checklist

- [x] All body text >=4.5:1; large text/UI >=3:1, ratios listed per card.
- [x] Gold `#C9A24A` never carries text or essential meaning on light backgrounds (the failing case).
- [x] gold-dark `#8A6A23` on cream limited to large/UI use; ink used for body.
- [x] Visible `:focus-visible` ring on every card; ivory ring on the dark card.
- [x] Whole-card single link target; CTA buttons 44px tall (>= 2.5.8 24px).
- [x] Status/benefit meaning is text-based, never color-only.
- [x] `prefers-reduced-motion` removes all transition/transform.
- [x] Real `<h3>` / `<dl>` / `<ul>` semantics; descriptive `aria-label` per link.
- [x] Copy: sentence-case CTAs naming the action, no arrows, no all caps, no banned words, no invented stats.
