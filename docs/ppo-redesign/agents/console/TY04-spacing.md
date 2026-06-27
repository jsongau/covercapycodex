# TY04 — Spacing, Rhythm & Density Audit

Target file: `compare-ppo-dental-plans.html`
Reference system: `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`

Scope: spacing only. No color, type, or copy changes. No em-dashes used in this memo.

---

## 1. The core problem

The live compare page is built on an editorial rhythm: large section padding, wide gutters inside cards, and generous grid gaps. That reads as airy and confident for a marketing page, but a health-insurance "control console" should feel denser and more systematic. The ZIP plan-detail system already encodes that density with a real token scale.

The live page has NO spacing tokens. Every value is a hardcoded literal (`padding:34px`, `gap:26px`, `section{padding:62px 0}`). The ZIP system defines a 7-step scale and reuses it. Adopting that scale is the single highest-leverage change.

---

## 2. Side-by-side: what each system actually uses

### ZIP reference scale (humana-extend-5000.html:45)
```css
--sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px; --sp-6:32px; --sp-7:48px;
```
ZIP density anchors:
- `.wrap` max-width via `--max`, gutter `padding:0 24px` (line 63)
- `.layout` section rhythm: `padding:26px 0 60px`, inter-card `gap:18px` (lines 111-112)
- `.card` is unpadded; padded sections live inside at `padding:20px 22px` (lines 503, 554, 566) or tighter `6px 22px` (line 587)
- Internal grids: `.lim-grid gap:11px` (261), `.tgrid gap:11px` (269), `.altg gap:12px` (277), `.verdict gap:14px` (200)
- Tiles/rows: `.tile padding:15px 18px` (147), `.covrow padding:13px 24px` (160), `.calc-opt padding:11px 13px` (228)

ZIP card padding clusters around 14-22px. Grid gaps cluster around 11-14px. That is the density target.

### Live compare page (compare-ppo-dental-plans.html)
| Element | Line | Current value | Verdict |
|---|---|---|---|
| `.wrap` max-width / gutter | 72 | `1200px / 0 28px` | wide gutter |
| `section` | 78 | `padding:62px 0` | too airy |
| `.mpanel` (card pad) | 145 | `padding:34px` | too loose |
| `.match-grid` gap | 144 | `gap:26px` | too loose |
| `.goalgrid` gap | 150 | `gap:10px` | OK |
| `.fitcard` | 170 | `padding:24px` | slightly loose |
| `.cred` | 191 | `padding:30px 34px; gap:32px` | too loose |
| `.sec-head` margin | 201 | `margin-bottom:26px` | loose |
| `.cmp-grid` cells | 214-225 | `padding:16px 14px / 12px 14px` | already dense, keep |
| `.faq-grid` gap | 253 | `gap:50px` | very loose |
| `.hero-wrap` gap | 346 | `gap:48px` | loose |
| `.hero-entry` | 352 | `padding:26px 26px 22px` | loose |
| `.match-head` margin | 133 | `margin:0 auto 36px` | loose |

The live page sits roughly one full step (8px) wider than ZIP at almost every level. `.faq-grid` at 50px and `section` at 62px are the two biggest offenders.

---

## 3. Recommendation: adopt the ZIP scale, then snap values down one step

Introduce the same `--sp-1..7` tokens into the compare page, plus two console-specific section tokens so the airy editorial cadence becomes a consistent denser rhythm. Rule of thumb applied below: anything currently at 26-34px drops to 24px or 20px; section padding drops from 62 to 44; the 50px faq gap drops to 32; the 28px gutter drops to 24 to match ZIP.

This tightens density by roughly 20-30% in the loose zones while leaving the already-dense `.cmp-grid` comparison table untouched (it is the console centerpiece and should not get tighter).

---

## 4. Copy-pasteable CSS block

Add the token block to `:root`, then the overrides after the existing rules so they win on cascade.

```css
/* ---- TY04: console spacing scale (mirrors ZIP _zip-21jun) ---- */
:root{
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px;
  --sp-5:24px; --sp-6:32px; --sp-7:48px;
  --sec-pad:44px;     /* section vertical rhythm, was 62 */
  --gutter:24px;      /* wrap gutter, was 28 */
}

/* shell + rhythm */
.wrap{padding:0 var(--gutter)}
section{padding:var(--sec-pad) 0}

/* primary match console */
.match-head{margin:0 auto var(--sp-5)}        /* 36 -> 24 */
.match-grid{gap:var(--sp-5)}                   /* 26 -> 24 */
.mpanel{padding:var(--sp-5)}                   /* 34 -> 24 */
.goalgrid{margin-bottom:var(--sp-5)}           /* 26 -> 24 */
.tline{margin-bottom:var(--sp-5)}              /* 26 -> 24 */

/* verdict / fit */
.fitcard{padding:var(--sp-5);margin-bottom:var(--sp-4)}   /* 24 / 16 */

/* credibility band */
.cred{padding:var(--sp-5) var(--sp-6);gap:var(--sp-6)}    /* 30/34 -> 24/32 */
.cred-stats{gap:var(--sp-4) var(--sp-5)}                  /* 20/26 -> 16/24 */

/* section heads */
.sec-head{margin-bottom:var(--sp-5)}           /* 26 -> 24 */

/* faq: biggest density win */
.faq-grid{gap:var(--sp-6)}                      /* 50 -> 32 */
.faq-entries{gap:var(--sp-3)}                   /* 14 -> 12 */
.fq-q{padding:var(--sp-5)}                      /* 22 -> 24, keep generous tap target */
.fq-a-pad{padding:0 var(--sp-5) var(--sp-5) 78px}

/* hero */
.hero-wrap{gap:var(--sp-6)}                     /* 48 -> 32 */
.hero-entry{padding:var(--sp-5) var(--sp-5) var(--sp-4)} /* 26/26/22 -> 24/24/16 */

/* leave .cmp-grid table cells AS-IS (16px 14px / 12px 14px already console-dense) */
```

Notes:
- The mobile `@media(max-width:600px)` block (lines 402-436) already tightens to 14-18px and should be left alone; these overrides only affect desktop.
- `.faq-grid` mobile rule (line 342) sets `gap:30px`; after this change it can drop to `var(--sp-5)` for consistency if desired but is non-critical.
- Snapping everything to the 8px scale means future spacing decisions reference one ladder instead of inventing literals.
