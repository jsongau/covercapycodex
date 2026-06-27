# DH4 — Header Visual Spec (T5 Jade) · Compare PPO Main Hub

**Agent:** DH4 (header visual design)
**Scope:** masthead + sticky sub-nav band + dropdown panel surface for `/compare-ppo-dental-plans/`
**Theme:** single T5 jade. Remove the gold/jade dev toggle.
**Date:** June 2026

---

## 0. SOURCE OF TRUTH

The brief's tokens are the **production T5 jade set** confirmed live in `find-my-dentist.html`
(`:root` lines 46–50), NOT the `[data-theme="jade"]` block currently in the compare page
(that block uses `#0FB5A6` teal-flat — wrong; it is a leftover dev experiment and must be retired
along with the toggle). Use these exact values everywhere:

```css
--teal-night:#082A30;   /* primary dark — CTA fills + dark sub-nav band */
--teal-700:#14525B;     /* links, link hover ink */
--teal-300:#5E8C92;     /* overlines, muted-on-dark eyebrow */
--mint:#5BE0A0;         /* accent — active pill, on-dark CTA text */
--mint-soft:#E6F7EE;    /* selected / hover wash on light */
--cream:#F6F0E6;        /* page + masthead surface */
--cream-card:#FFFDF8;   /* dropdown panel + raised card surface */
--gold:#B8924F;         /* hairline accent ONLY — never fills, never text body */
--ink:#082A30;          /* heading ink */
--body:#33453E;         /* body copy + nav labels on light */
--ink-faint:#8A958F;    /* tertiary labels */
--line:#E8E2D8;         /* light borders / hairlines */
```

**RULE (non-negotiable):** body text and links are **never** `--teal-night` (the CTA fill color).
Links = `--teal-700`. CTA fills = `--teal-night`. These never swap.

---

## 1. GLOBAL HEADER BAR (masthead)

The top brand bar. Light, calm, lets the sub-nav carry the wayfinding weight.

| Element | Token / value |
|---|---|
| Bar surface | `--cream` `#F6F0E6` |
| Bottom edge | `1px solid --line` `#E8E2D8` **+** inner `1px` of `--gold` at 28% (`rgba(184,146,79,.28)`) as the single hairline accent |
| Height | `74px` desktop · `60px` mobile |
| Inner width | `max-width:1200px`, `padding:0 28px` |
| Brand logo mark | capy bg fill `--teal-night`; foreground `--cream`; crown `--gold` |
| Brand wordmark "CoverCapy" | `Fraunces` 500, `20px`, ink `--ink`, `letter-spacing:.02em` |
| Brand sub-line "PPO DENTAL CONCIERGE" | `Inter Tight` 600, `11px`, `letter-spacing:.16em`, uppercase, `--ink-faint` |
| Primary nav links (mnav) | `Inter Tight` 500, `14.5px`, color `--body` `#33453E` |
| Nav link hover | color `--teal-700` `#14525B` (never teal-night) |
| "Sign in" utility | `Inter Tight` 500, `14px`, `--body`; hover `--teal-700` |

Do **not** put a filled CTA in the masthead — the CTA lives in the sub-nav so it stays sticky.

---

## 2. STICKY SUB-NAV BAND (the dark wayfinding rail)

This is the signature element that says **MAIN HUB**. Dark teal-night band, sticky under the
masthead, carrying section anchors as a horizontal rail with one mint active pill and one
mint-accented "Find a dentist" CTA at the right. Replaces both the old translucent `.toc` and the
separate `.di-hub` band — merge into one band.

| Element | Token / value |
|---|---|
| Band surface | `--teal-night` `#082A30` (solid, opaque — not translucent) |
| Top edge | `1px solid rgba(184,146,79,.22)` (gold hairline — ties to masthead) |
| Bottom edge | `1px solid rgba(255,255,255,.06)` |
| Position | `position:sticky; top:0; z-index:60` |
| Height | `52px` |
| Scroll progress bar | `2px` top strip, fill `--mint` `#5BE0A0`, width driven by scroll |
| Eyebrow label "✦ DENTAL INSURANCE" | `Inter Tight` 700, `11px`, `.14em`, uppercase; text `--teal-300` `#5E8C92`; the `✦` glyph in `--gold` `#B8924F` |
| Rail link (rest) | `Inter Tight` 500, `13.5px`, color `rgba(255,253,248,.72)` (cream @72%) |
| Rail link hover | color `#FFFDF8`; `2px` bottom border `rgba(91,224,160,.5)` |
| **Active pill** (current section / `aria-current`) | text `--teal-night` on a `--mint` `#5BE0A0` fill, radius `999px`, padding `5px 13px`, weight 600. This is the only mint **fill** in the bar |
| "Find a dentist →" CTA | fill `--teal-night`? No — on a dark band it must read as the action: fill `--mint` `#5BE0A0`, text `--teal-night`, weight 600, radius `999px`, padding `7px 15px`. Hover: `#6FE8AE` (mint lightened) |
| Rail overflow | horizontal scroll, hidden scrollbar, `scrollbar-width:none` |

**Why mint fills on the dark band, not teal-night:** the band itself is teal-night, so a
teal-night CTA would vanish. On dark surfaces the mint accent becomes the action color — this is
the same inversion used on T5 hero CTAs in find-my-dentist. Body/links rule is preserved: nothing
in the *light* regions ever uses mint or teal-night for text/links.

---

## 3. DROPDOWN PANEL SURFACE

For any sub-nav item that opens a menu (e.g. "By feature", "Browse by").

| Element | Token / value |
|---|---|
| Panel surface | `--cream-card` `#FFFDF8` |
| Border | `1px solid --line` `#E8E2D8` |
| Hairline accent | `2px` top inset bar in `--gold` `#B8924F` (the single gold accent on the panel) |
| Radius | `16px` |
| Shadow | `0 1px 0 rgba(8,42,48,.04), 0 18px 44px rgba(8,42,48,.14)` |
| Offset from band | `8px` gap below the band |
| Item label | `Inter Tight` 500, `14px`, `--body` |
| Item hover | bg `--mint-soft` `#E6F7EE`, label `--teal-700`, radius `10px` |
| Item description (if 2-line) | `12.5px`, `--ink-faint` |
| Section heading inside panel | `Fraunces` 500, `13px`, `.06em`, uppercase, `--teal-300`? No — on light use `--ink-faint`. Keep `--teal-300` for *on-dark* only |

---

## 4. TYPE & SPACING SUMMARY

- **Brand / headings:** `'Fraunces', Georgia, serif`, weight 500 (400 for the big H1), italic for emphasis only.
- **Nav / UI / labels:** `'Inter Tight', system-ui, sans-serif`.
- **Rhythm:** masthead `74px`, sub-nav `52px` → total sticky stack `52px` after scroll (masthead scrolls away, band pins). Inner gutter `28px`. Rail link gap `26px`. Pill padding `5–7px × 13–15px`.

---

## 5. DELETE: gold/jade dev toggle

Remove all of the following from `compare-ppo-dental-plans.html`:

- `<html data-theme="gold">` → set to plain `<html lang="en">` (no theme attr).
- `.theme-switch`, `.ts-thumb`, `.ts-opt`, `.ts-wrap`, `.ts-gold`, `.ts-jade`, `.ts-dot` CSS + markup (lines ~790–807 + the `#cc-ts` block ~853–859).
- All `[data-theme="gold"]`, `[data-theme="maison"]`, `[data-theme="jade"]` selector blocks (~703–807).
- The toggle JS: `applyTheme(...)` listener and `ccTs` handler (~1869–1877).
- Fold the chosen jade values **directly into `:root`** so there is one scheme, no switching.

---

## 6. DO / DON'T

**DO**
- Keep the masthead light (`--cream`) and the sub-nav dark (`--teal-night`) — the contrast is what reads as "premium main hub."
- Use `--gold` only as hairlines (masthead edge, panel top inset). One gold thread, nothing more.
- Use `--mint` for the single active pill fill and the "Find a dentist" CTA on the dark band.
- Links `--teal-700`; CTA fills `--teal-night` (light contexts) / `--mint` (on dark).

**DON'T**
- Don't make any body text or link `--teal-night` (that's the CTA color).
- Don't use the `#0FB5A6` flat-teal from the old `[data-theme="jade"]` block — it is retired.
- Don't fill nav chips or cards with gold, and don't use gold for text.
- Don't make the sub-nav band translucent/blurred — solid teal-night only; translucency reads cheap.
- Don't add gradients, glassmorphism, em-dashes, or a second accent color.
- Don't ship more than one mint fill in the band (active pill + CTA are the two intentional accents; rest is cream-on-teal).
