# TYP1 — Typographic Hierarchy & Scale

Role: Typography Expert 1 (structural hierarchy & scale). Page audited:
`/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`.
All findings grounded in real lines. No em-dashes. Coordinates with TYP2 (numbers/legibility) by owning structure only.

---

## 1. Current state (grounded)

Tokens (lines 56-57):
- `--serif: 'Inter Tight', system-ui, sans-serif` — despite the name this is a sans. It is the condensed-ish display companion to Inter, used today for all headings and prices.
- `--sans: 'Inter', system-ui, sans-serif` — body and UI.

Heading block (lines 65-68):
```
h1,h2,h3,h4{font-family:var(--serif);font-weight:700;line-height:1.14;margin:0;letter-spacing:-.02em}
h1{font-size:clamp(32px,4.4vw,46px);font-weight:700}
h2{font-size:clamp(23px,2.8vw,30px);font-weight:700}
h3{font-size:21px}
```
Issues:
- `h3` and `h4` collapse: h3 is a fixed 21px and h4 is unstyled, so it inherits h3's 21px. No fourth step exists.
- A single flat `-.02em` tracking is applied from 46px display down to 21px and to any h4. Display sizes want tighter (-.025/-.03em); sub-30px sizes want looser. One value cannot serve both.
- Everything is weight 700. A credible insurance hub needs a quieter authority: 700 reads slightly shouty at h1 display size. The luxury reference (Fraunces in CLAUDE.md) is weight 500. We can borrow that restraint with Inter Tight at 600 for the largest step.
- `line-height:1.14` is correct for the 46px display but too tight for a wrapping 23-30px h2 and for any 18-19px sub-head; those want ~1.2.

Eyebrows (line 73): `font-size:12px; letter-spacing:.18em; weight 600; uppercase`. Solid, but tracking is uneven across the page — `.flab` uses .13em (181), `.verdict-label` .1em (201), `.cmp-corner` .06em (246), `.ft-th` .04em (327), `.dd-eye`/`.dd-lbl` .12em (124/129). No system. An elite hub reads as designed when eyebrow tracking is rule-based, not per-component guesswork.

Lede (line 168): `.match-head .lede{font-size:19px;color:var(--ink-soft);max-width:62ch}`. Section sub copy (235) is 17px, (283) `.sec-sub` 14px, (289) faq lede 14px. Three different "intro paragraph" sizes with no logic.

Card/matrix headings:
- `.mpanel h3` 23px (179), `.fitcard .pn` 24px serif (205), `.cmp-plan .pn` 17px serif (249), `.cmp-empty .ce-msg` 16px serif (264), `.fq-title` 19px serif (314), `.cred h2` 30px (226). These are all "card title" roles landing on 16/17/19/23/24/30 with no shared rhythm.

---

## 2. Recommended type scale

Modular scale, ratio ~1.22 (minor third) anchored at 16px body, fluid via `clamp`. Roles, not arbitrary px.

| Role | Selector(s) | Family | Size | Weight | LH | Tracking |
|------|-------------|--------|------|--------|----|----------|
| Display / h1 | `h1` | Inter Tight | clamp(34px,4.4vw,52px) | 600 | 1.06 | -.025em |
| Section / h2 | `h2`, `.cred h2` | Inter Tight | clamp(24px,2.8vw,32px) | 650 | 1.14 | -.02em |
| Card title / h3 | `h3`, `.mpanel h3`, `.fitcard .pn`, `.fq-title` | Inter Tight | clamp(19px,1.6vw,22px) | 600 | 1.2 | -.015em |
| Sub-head / h4 | `h4` | Inter Tight | 16px | 600 | 1.3 | -.01em |
| Lede (one role) | `.match-head .lede`, `.sec-head p` | Inter | clamp(17px,1.5vw,19px) | 400 | 1.55 | 0 |
| Body | `body`, `p` | Inter | 16px | 400 | 1.55 | 0 |
| Small / meta | `.sec-sub`, `.faq-rail .lede`, captions | Inter | 14px | 400 | 1.6 | 0 |
| Eyebrow L | `.eyebrow` | Inter | 12px | 600 | 1 | .16em |
| Eyebrow S | `.flab`,`.verdict-label`,`.cmp-corner`,`.ft-th`,`.dd-lbl`,`.dd-eye` | Inter | 11px | 600 | 1.1 | .12em |

Family decisions (Inter vs Inter Tight):
- Inter Tight: every structural heading (h1-h4) and card titles. Its tighter set widths hold authority at display size and pack neatly in narrow card columns (e.g. `.cmp-plan .pn` 249).
- Inter: all running prose, ledes, eyebrows, meta, UI labels, and buttons. Inter's open apertures keep small UI legible.
- Weight system: 600 is the heading default; 650 (variable) only on h2 where it must out-rank a 600 card title sitting nearby. Drop the blanket 700 — it currently flattens all four levels into one voice. (Prices/numerals are TYP2's call; do not change `.pr`, `.ft-price-big`, `.budget-val` weights here.)

Tracking law (resolves the per-component drift):
- Negative tracking scales with size: >32px = -.025em, 22-32px = -.02em, 16-22px = -.015em.
- Uppercase eyebrows: only two values, .16em (12px) and .12em (11px). Retire .18/.13/.1/.06/.04em.

---

## 3. Copy-pasteable CSS (keyed to existing selectors)

Drop in after line 68 (it overrides the current `h1-h4` block intentionally; keep that block or replace it).

```css
/* ===== TYP1: structural hierarchy ===== */
h1,h2,h3,h4{font-family:var(--serif);margin:0}

h1{
  font-size:clamp(34px,4.4vw,52px);
  font-weight:600;
  line-height:1.06;
  letter-spacing:-.025em;
}
h2{
  font-size:clamp(24px,2.8vw,32px);
  font-weight:650;
  line-height:1.14;
  letter-spacing:-.02em;
}
h3{
  font-size:clamp(19px,1.6vw,22px);
  font-weight:600;
  line-height:1.2;
  letter-spacing:-.015em;
}
h4{
  font-size:16px;
  font-weight:600;
  line-height:1.3;
  letter-spacing:-.01em;
}

/* card titles inherit the h3 voice rather than inventing sizes */
.mpanel h3{font-size:clamp(19px,1.6vw,22px);font-weight:600;line-height:1.2;letter-spacing:-.015em;margin-bottom:4px}
.fitcard .pn{font-size:clamp(20px,1.7vw,24px);line-height:1.1;letter-spacing:-.015em}
.fq-title{font-size:clamp(18px,1.5vw,20px);line-height:1.3;letter-spacing:-.015em}
.cred h2{font-size:clamp(24px,2.8vw,32px);letter-spacing:-.02em}
.cmp-plan .pn{font-size:clamp(16px,1.3vw,18px);line-height:1.12;letter-spacing:-.01em}
.cmp-empty .ce-msg{font-size:16px;line-height:1.3;letter-spacing:-.01em}

/* one lede role */
.match-head .lede,
.sec-head p{
  font-family:var(--sans);
  font-size:clamp(17px,1.5vw,19px);
  font-weight:400;
  line-height:1.55;
  letter-spacing:0;
  color:var(--ink-soft);
}

/* eyebrow law: only two tracking values */
.eyebrow{font-family:var(--sans);font-weight:600;font-size:12px;line-height:1;letter-spacing:.16em;text-transform:uppercase}
.flab,.verdict-label,.cmp-corner,.ft-th,
.dd-lbl,.dd-eye,.faq-cat-count,.ft-mob-lbl,.cmp-empty .ce-slot{
  font-size:11px;font-weight:600;line-height:1.1;letter-spacing:.12em;text-transform:uppercase;
}
```

Notes:
- `.cred h2` (line 226) currently overrides to 30px; the rule above re-folds it into the h2 step so the dark credibility band matches section heads elsewhere.
- `.fitcard .pn` (205) and `.cmp-plan .pn` (249) carry prices via `.car`/`.price` children — sizing here is the practice-name structure only; numeral treatment stays with TYP2.
- The eyebrow consolidation rule preserves each component's color (set elsewhere); it only normalizes size/weight/tracking/case.

---

## 4. Why this reads as an elite insurance hub

- Four genuinely distinct heading steps (52 / 32 / 22 / 16) instead of today's effective two (46 and 21-everything-else). Hierarchy is legible at a glance, which is what signals editorial care on a 6,400-page property.
- Weight 600/650 instead of blanket 700 lowers the visual "volume" to a calm, advisory register — closer to the boutique-concierge feel in CLAUDE.md than to a deals-site shout.
- Size-aware tracking removes the slightly amateur look of fixed -.02em on small headings, and the two-value eyebrow law replaces six ad hoc tracking values with a rule.
- One lede size (clamp 17-19) gives every section the same confident entry rhythm.
