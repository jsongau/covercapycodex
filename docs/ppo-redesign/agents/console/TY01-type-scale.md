# TY01 — Type Scale & Hierarchy

Agent: console / TY01
Scope: ANALYZE and SPEC only. No prototypes.
Target: `/compare-ppo-dental-plans.html` (the live, reskinned health-tech page)
References:
- ZIP plan page: `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`
- Spec: `docs/ppo-redesign/_zip-21jun/ppo/presentation-specs/04-plan-detail-spec.md`

---

## 1. What the live page does today (audited)

Token definitions, `compare-ppo-dental-plans.html`:

- L56: `--serif:'Inter Tight',system-ui,sans-serif;`
- L57: `--sans:'Inter',system-ui,sans-serif;`
- L23: loads Inter Tight 400/500/600/700 + Inter 400/500/600/700

Headings, L65-68:

- L65: `h1,h2,h3,h4{font-family:var(--serif);font-weight:700;line-height:1.14;letter-spacing:-.02em}`
- L66: `h1{font-size:clamp(32px,4.4vw,46px);font-weight:700}`
- L67: `h2{font-size:clamp(23px,2.8vw,30px);font-weight:700}`
- L68: `h3{font-size:21px}` (no explicit weight or line-height of its own, inherits 700 / 1.14)
- No `h4` rule beyond the shared L65 declaration.

Body / supporting type:

- L64: `body{font-family:var(--sans);font-size:16px;line-height:1.55}`
- L73: `.eyebrow{font-family:var(--sans);font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--green)}`
- L136: `.match-head .lede{font-size:19px;color:var(--ink-soft)}`
- L137: `.hub-trust{font-size:12.5px;line-height:1.7}`
- L147: `.mpanel h3{font-size:23px}` (local override, larger than the global 21px h3)
- L148: `.mpanel .sub{font-size:14px}`
- L149/.flab: `font-size:11px;letter-spacing:.13em;text-transform:uppercase`
- L164: `.budget-val{font-family:var(--serif);font-style:italic;font-size:26px}` (Inter Tight italic used as a "data display")
- L173: `.fitcard .pn{font-family:var(--serif);font-size:24px}`
- L176: `.fitcard .price{font-family:var(--serif);font-style:italic;font-size:20px}`

### Findings

1. The live page kept a two-family system (`--serif` Inter Tight, `--sans` Inter) even after the reskin. The token name `--serif` is now a misnomer: Inter Tight is a sans. This is fine functionally but the naming will confuse future agents.
2. The ZIP health-tech system (`humana-extend-5000.html` L49) is Inter ONLY, single `--font`. The live page diverges by reintroducing a display family. That is a legitimate console-vs-document distinction (see section 3), but it is currently undocumented and applied inconsistently.
3. Heading weights are flat: h1/h2/h3/h4 are all 700 (L65). The ZIP differentiates: h1/h2 are 700, h3 drops to 600 (humana L60-62). The live page's uniform 700 weakens the h2-to-h3 step and makes dense console sections feel heavier than they should.
4. h3 is double-defined: 21px globally (L68) but 23px inside `.mpanel` (L147) and effectively 24px on fit cards (L173). Three sizes are doing one job. No single h3 truth.
5. h4 has no size of its own. It silently inherits nothing useful and will render at the browser default while picking up the L65 family/weight. Any h4 in a spec sheet caption row is unspecified.
6. No `tabular-nums` anywhere. The ZIP defines `.tnum{font-variant-numeric:tabular-nums}` (humana L64) precisely because this is a numbers product: annual maximums, deductibles, percentages, prices. The live page renders all data in proportional figures, so columns of dollar amounts and percentages will not align vertically.
7. The eyebrow is heavier than the ZIP's: live `.18em` / 12px (L73) vs ZIP `.07em` / 11.5px (humana L66). The live tracking is wide and decorative; the ZIP tracking is tight and clinical. For a control console, the ZIP value reads more as an instrument label.

---

## 2. The console premise

This page is an insurance "control console": the buyer scans annual maximums, deductibles, coverage percentages, premiums, and waiting periods and makes a decision. Per spec 04 (section 1-2), the spec sheet is the focal element and "the premium is the largest number on the page." The type system must therefore do two jobs:

- Structure (Inter Tight): headings and section titles that frame the console.
- Data (Inter, tabular): every number, label, and value the buyer compares.

Prose is the optional tail (spec 04, section 8: "reads as a spec sheet first, with the essay as the optional tail"). So body type should be quiet and supporting, never the star.

---

## 3. Inter vs Inter Tight — the assignment

Keep both families, but assign them by ROLE, not by tag name, and document the split so it stops being accidental.

INTER TIGHT (`--serif`) — structure and display only:
- h1, h2 (page and section frames)
- The single large premium / price display ("largest number on the page")
- Big stat displays where the number is a headline, not a table cell (e.g. `.budget-val` L164, `.fitcard .pn` L173)

INTER (`--sans`) — everything else, and ALL tabular data:
- h3, h4, eyebrow, lede, body, small, caption
- The coverage grid (Preventive/Basic/Major %, waiting periods)
- Limit tiles (annual max, deductible, effective date — humana `.tile .tv` L149)
- Any value inside a label/value table
- All inline numbers in prose

Rule of thumb: if a number sits in a row or column that the eye scans against another number, it is Inter + tabular-nums. If a number is a solo hero, it may be Inter Tight. The coverage grid and limit tiles are NEVER Inter Tight — they must align.

Recommend renaming the tokens for clarity in a future pass (`--display` / `--text`), but that is optional and out of scope here; the CSS block below keeps the existing `--serif` / `--sans` names so it is drop-in.

---

## 4. Recommended type scale

A console wants a tight, deliberate scale (roughly 1.2 ratio in the heading range) so density reads as competence, not noise. Sizes below are tuned to sit between the live page (slightly large) and the ZIP (slightly small), landing on the console.

| Role | Family | Size (clamp) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| h1 | Inter Tight | `clamp(30px,3.6vw,40px)` | 700 | 1.12 | -.022em |
| h2 | Inter Tight | `clamp(22px,2.4vw,28px)` | 700 | 1.16 | -.02em |
| h3 | Inter | `clamp(17px,1.4vw,19px)` | 600 | 1.25 | -.012em |
| h4 | Inter | `15px` | 600 | 1.3 | -.006em |
| lede | Inter | `clamp(16px,1.5vw,18px)` | 400 | 1.55 | 0 |
| body | Inter | `15.5px` | 400 | 1.6 | 0 |
| small / caption | Inter | `13px` | 400 | 1.5 | 0 |
| eyebrow | Inter | `11.5px` | 600 | 1 | .08em (uppercase) |
| data value (tile/price-secondary) | Inter, tabular | `22px` | 700 | 1 | -.01em |
| premium hero | Inter Tight | `clamp(32px,4vw,40px)` | 700 | 1 | -.02em |
| table cell / grid figure | Inter, tabular | `14px` | 500-600 | 1.4 | 0 |

Rationale for the key moves:

- h3 drops from 700 to 600 and switches to Inter. This restores a real step down from h2 and signals "you are now inside a data block, not a page frame." Matches ZIP humana L62.
- h1 comes down from 46px max to 40px. The premium, not the H1, should be the biggest thing on the spec page (spec 04 section 2). A 46px H1 competes with it.
- lede comes down from 19px to ~18px max and loses no warmth; it is the one place prose is allowed breathing room.
- eyebrow tracking tightens from .18em to .08em to read as an instrument label, matching the ZIP.
- Every data role declares tabular-nums so dollar and percent columns align.

---

## 5. Copy-pasteable CSS block

Drop-in replacement for L64-68 plus the supporting tokens and helpers. Keeps existing `--serif` / `--sans` names. No em-dashes.

```css
/* ── Type scale: insurance control console ───────────────────── */
/* Inter Tight = structure + hero numbers. Inter = everything else + ALL tabular data. */

body{
  font-family:var(--sans);
  font-size:15.5px;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  font-feature-settings:"cv05","ss01";
}

/* tabular figures: apply to every comparable number */
.tnum,.cov-grid td,.tile .tv,.ss-amount,.budget-val,.fitcard .price{
  font-variant-numeric:tabular-nums;
}

/* headings — shared frame */
h1,h2,h3,h4{margin:0;color:var(--ink)}

/* h1, h2 = Inter Tight (display) */
h1{
  font-family:var(--serif);
  font-size:clamp(30px,3.6vw,40px);
  font-weight:700;
  line-height:1.12;
  letter-spacing:-.022em;
}
h2{
  font-family:var(--serif);
  font-size:clamp(22px,2.4vw,28px);
  font-weight:700;
  line-height:1.16;
  letter-spacing:-.02em;
}

/* h3, h4 = Inter (text) — step down into data blocks */
h3{
  font-family:var(--sans);
  font-size:clamp(17px,1.4vw,19px);
  font-weight:600;
  line-height:1.25;
  letter-spacing:-.012em;
}
h4{
  font-family:var(--sans);
  font-size:15px;
  font-weight:600;
  line-height:1.3;
  letter-spacing:-.006em;
}

/* lede — the one warm line of prose */
.lede{
  font-family:var(--sans);
  font-size:clamp(16px,1.5vw,18px);
  font-weight:400;
  line-height:1.55;
  color:var(--ink-soft);
}

/* eyebrow — instrument label, tight tracking */
.eyebrow{
  font-family:var(--sans);
  font-size:11.5px;
  font-weight:600;
  letter-spacing:.08em;
  text-transform:uppercase;
  line-height:1;
  color:var(--green);
}

/* small / caption / governance line */
.small,.caption,.hub-trust,.tile .tn{
  font-family:var(--sans);
  font-size:13px;
  font-weight:400;
  line-height:1.5;
  color:var(--muted);
}

/* hero premium — the largest number on the page (spec 04 §2) */
.ss-amount,.premium-hero{
  font-family:var(--serif);
  font-size:clamp(32px,4vw,40px);
  font-weight:700;
  line-height:1;
  letter-spacing:-.02em;
}

/* data value — limit tiles, secondary stats (Inter, not Tight) */
.tile .tv,.data-val{
  font-family:var(--sans);
  font-size:22px;
  font-weight:700;
  line-height:1;
  letter-spacing:-.01em;
  font-variant-numeric:tabular-nums;
}

/* grid / table figures — must align vertically */
.cov-grid td,.spec-table td{
  font-family:var(--sans);
  font-size:14px;
  font-weight:500;
  line-height:1.4;
  font-variant-numeric:tabular-nums;
}

/* normalize the divergent h3 overrides — let the global h3 win */
.mpanel h3,.fitcard .pn{font-size:clamp(17px,1.4vw,19px);font-weight:600}
```

Notes on adoption:
- Class names in the data selectors (`.cov-grid`, `.spec-table`, `.data-val`, `.premium-hero`) are the spec-04 vocabulary; map them to whatever the live markup actually uses, or add the classes when the spec sheet block is built.
- L147 `.mpanel h3{font-size:23px}` and L173 `.fitcard .pn{font-size:24px}` are deliberately overridden at the bottom so h3 has ONE truth.
- `.budget-val` (L164) and `.fitcard .price` (L176) may stay Inter Tight italic as display flourishes, but they pick up `tabular-nums` via the `.tnum` group so the figures stay even.
```
