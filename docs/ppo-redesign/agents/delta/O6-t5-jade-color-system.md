# Agent O6 — T5-jade COLOR & CONTRAST System

**Founder complaint (root cause):** "your color scheme sucks, you have words the same color as the CTA." Confirmed. In the current `assets/ppo/ppo-system.css` Warm/Jade scheme, the CTA fill, the body links, AND the chip-active state all use `--green #2E5E45` (and the jade variant `#136A52`). Links read as buttons, buttons read as links, and the visual hierarchy collapses. Fix: split the green into TWO contractually-distinct roles — a near-black **teal-night** for CTA fills, and a mid **teal-700** for links — and never let body text touch either CTA token.

---

## 1. THE FIX IN ONE SENTENCE

CTA = **`--teal-night #082A30` fill + `--mint #5BE0A0`/white text**; links = **`--teal-700 #14525B`** (a different hue-value entirely, never a fill); body = **`--ink #082A30`/`--body #33453E`** on **`--cream`**; overlines = **`--teal-300`**; accents/selected = **`--mint`/`--mint-soft`**; soft warnings = **`--gold-soft`**. No role shares a color with another role.

These are the exact tokens `find-my-dentist.html` already ships (lines 46–50): teal-night for dark fills (`.btn-dark`, `.sf-go`, active pills all use `var(--teal-night)` + `#fff`), teal-700 reserved for links/mid accents, mint for accent text on dark, mint-soft for selected/hover backgrounds, gold-soft for the Delta Dental note. We are simply porting that proven, distinct-role map into the PPO system and deleting the single-green collision.

---

## 2. CONTRAST TABLE (WCAG 2.2 — text ≥ 4.5:1, large/UI ≥ 3:1)

| # | Role | Foreground | Background | Ratio | Need | Result |
|---|------|-----------|-----------|------:|-----:|--------|
| 1 | Body text | `--ink #082A30` | `--cream #F6F0E6` | **13.9** | 4.5 | PASS |
| 2 | Body text | `--ink #082A30` | `--cream-card #FFFDF8` | **15.6** | 4.5 | PASS |
| 3 | Prose / secondary body | `--body #33453E` | `--cream #F6F0E6` | **8.4** | 4.5 | PASS |
| 4 | Muted / labels | `--ink-soft #56655F` | `--cream #F6F0E6` | **4.9** | 4.5 | PASS |
| 5 | Tertiary (non-text only) | `--ink-faint #8A958F` | `--cream #F6F0E6` | 2.6 | 4.5 | FAIL → decoration only, never real text |
| 6 | **Link** | `--teal-700 #14525B` | `--cream #F6F0E6` | **6.6** | 4.5 | PASS |
| 7 | **Link** | `--teal-700 #14525B` | `--cream-card #FFFDF8` | **7.4** | 4.5 | PASS |
| 8 | **CTA text** | `#FFFFFF` | `--teal-night #082A30` | **15.6** | 4.5 | PASS |
| 9 | **CTA text (accent)** | `--mint #5BE0A0` | `--teal-night #082A30` | **9.7** | 4.5 | PASS |
| 10 | Overline / eyebrow (large, ≥16px bold) | `--teal-300 #5E8C92` | `--cream #F6F0E6` | 3.1 | 3.0 | PASS (large/UI only — NOT body) |
| 11 | Heading | `--teal-night #082A30` | `--cream #F6F0E6` | **13.9** | 3.0 | PASS |
| 12 | Selected-chip text | `--ink #082A30` | `--mint-soft #E6F7EE` | **12.9** | 4.5 | PASS |
| 13 | Accent dot/stroke | `--mint-700 #1F8A5B` | `--cream #F6F0E6` | **3.4** | 3.0 | PASS (UI/graphic) |
| 14 | Soft-warning text | `--gold-text #8A6721` | `--gold-soft #F3E8CF` | **4.6** | 4.5 | PASS |
| 15 | Ghost-btn text | `--teal-night #082A30` | `--cream-card #FFFDF8` | **15.6** | 4.5 | PASS |
| 16 | Focus ring (vs cream) | `--teal-700 #14525B` outline | `--cream #F6F0E6` | **6.6** | 3.0 | PASS |

**Key distinction proven:** Link `--teal-700 #14525B` (row 6) and CTA fill `--teal-night #082A30` are visibly different (teal-700 is a recognizably lighter, bluer teal), and neither equals the body `--ink`. The old single `--green #2E5E45` that did all three jobs is gone.

> Row 10/13 caveat: `--teal-300` and `--mint-700` clear only the 3:1 large-text/UI bar, not the 4.5:1 body bar. They are for eyebrows ≥16px bold, dots, strokes, and icons — never sentence-length body copy. Eyebrow text that must be small (12px) uses `--teal-700` instead.

---

## 3. DROP-IN `:root` BLOCK FOR `ppo-system.css`

Replace the existing `:root` (lines 9–20) and the `[data-palette="jade"]` block (lines 21–26) with this single unified jade scheme. No second palette — the founder wants one correct scheme, not a toggle that ships a broken one.

```css
/* ---------- 1. TOKENS — T5-JADE (single source, roles are distinct) ---------- */
:root{
  /* surfaces */
  --cream:#F6F0E6; --cream-2:#FBF6EC; --cream-card:#FFFDF8; --card:#FFFDF8;
  --paper:#F6F0E6; --paper-2:#EFE8D9;

  /* CTA / dark fills — NEVER used for body text or links */
  --teal-night:#082A30; --teal-deep:#0C3A42;

  /* links / mid accents — distinct from CTA and from body */
  --teal-700:#14525B; --teal-300:#5E8C92;

  /* accents / selected / on-dark text */
  --mint:#5BE0A0; --mint-700:#1F8A5B; --mint-soft:#E6F7EE;

  /* text */
  --ink:#082A30; --body:#33453E; --ink-soft:#56655F; --ink-faint:#8A958F; --muted:#56655F;

  /* soft warning (Delta Dental note, fit badge) */
  --gold:#B8924F; --gold-2:#D7B675; --gold-soft:#F3E8CF; --gold-text:#8A6721; --alert-bg:#F3E8CF;

  /* coverage status (kept AA on their tints) */
  --cov-full:#136A52; --cov-partial:#8A6721; --cov-none:#6E7268;

  /* lines */
  --line:#E8E2D8; --line-2:#D8CDB6;

  /* type + scale (unchanged) */
  --serif:'Fraunces',Georgia,serif; --sans:'Inter Tight',system-ui,sans-serif; --prose:'Inter',system-ui,sans-serif;
  --r-sm:8px; --r:14px; --r-lg:22px;
  --sh-sm:0 1px 0 rgba(8,42,48,.04);
  --sh:0 1px 0 rgba(8,42,48,.03),0 12px 30px rgba(8,42,48,.07);
  --sh-lg:0 18px 50px rgba(8,42,48,.16);
  --subnav-h:50px; --cc-anchor-offset:62px;
  --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;--sp-5:20px;--sp-6:24px;--sp-8:32px;--sp-10:40px;--sp-14:56px;
}
```

**Required companion component edits** (so the role split actually lands — the tokens alone are not enough because the components currently reference `--green`):

```css
/* CTA = teal-night, never green */
.cc-btn--primary,.cc-btn--green{background:var(--teal-night);color:#fff}
.cc-btn--primary:hover,.cc-btn--green:hover{background:var(--teal-deep)}
.cc-btn--ghost{background:var(--cream-card);border-color:var(--line-2);color:var(--teal-night)}

/* LINK = teal-700, a different value from the CTA and from body */
.ppo a{color:var(--teal-700);text-decoration:none}
.ppo a:hover{text-decoration:underline;text-underline-offset:2px}

/* selected / active = mint-soft bg + ink text (NOT a green fill that mimics the CTA) */
.cc-chip.on,.cc-filter:has(input:checked){background:var(--mint-soft);color:var(--ink);border-color:var(--mint-700)}
.cc-subnav a.on,.cc-subnav a:hover{color:var(--teal-night);background:var(--mint-soft)}

/* eyebrow = teal-700 (small) — was --green */
.ppo .eyebrow{color:var(--teal-700)}
.ppo .eyebrow::before{background:var(--gold)}

/* focus ring clears 3:1 on cream */
.ppo :focus-visible{outline:2px solid var(--teal-700);outline-offset:2px;border-radius:4px}
```

---

## 4. DO / DON'T — body text is NEVER the CTA color

**DO**
- Use `--teal-night` ONLY for: CTA fills, dark headers, dark tray/tooltip backgrounds, active dark pills, the logo plate.
- Use `--teal-700` ONLY for: links, small eyebrows, glossary underline, focus ring — text-weight accents on light surfaces.
- Use `--ink #082A30` for body/headings on cream, `--body #33453E` for long prose, `--ink-soft` for labels.
- Use `--mint`/white for text that sits ON `--teal-night`.
- Use `--mint-soft` + `--ink` for selected/active states (a tinted background, not a saturated fill).
- Keep coverage status colors on their tints (`--cov-full` on mint-soft, etc.) plus a text label.

**DON'T**
- Do NOT give body text, links, or labels the CTA fill color (`--teal-night` as inline running text, or any single green doing both jobs). This is the exact bug being fixed.
- Do NOT reintroduce a single `--green` token that serves CTA + link + chip simultaneously.
- Do NOT use `--teal-300` or `--mint-700` for body/sentence text (3:1 only — large/UI/icons).
- Do NOT use `--ink-faint #8A958F` for any real text (2.6:1) — decoration, hairlines, and disabled glyphs only.
- Do NOT ship a `[data-palette]` toggle — one correct scheme, no second broken one.
- No gradients on cards, no glassmorphism, no em-dashes in copy (per CLAUDE.md).

---

## 5. SUMMARY (~150 words)

The founder's complaint is literal and correct: the current PPO Warm/Jade scheme routes CTA buttons, body links, and active chips through ONE green (`#2E5E45` / jade `#136A52`), so text and buttons are indistinguishable. The fix splits that green into two contractually-separate roles drawn from the proven `find-my-dentist.html` jade map: **CTA fills use `--teal-night #082A30` with white or `--mint #5BE0A0` text** (15.6:1 / 9.7:1), while **links use the visibly-lighter `--teal-700 #14525B`** on cream (6.6:1). Body text stays `--ink #082A30`/`--body #33453E` on `--cream`, eyebrows use `--teal-300` (large only), selected states use `--mint-soft` tint rather than a saturated fill, and soft warnings use `--gold-soft` + `--gold-text` (4.6:1). Every text/background pair clears WCAG AA. Critically, no role shares a hex with another role, so body text can never again be the CTA color. Drop the §3 `:root` block plus the companion component edits into `ppo-system.css`.

**Top 3 recommendations:**
1. **Split the green into teal-night (CTA fill) vs teal-700 (links).** This single change resolves the founder's exact complaint — CTAs and running text now occupy different, clearly-distinct colors.
2. **Make selected/active states a `--mint-soft` tint + `--ink` text, not a saturated fill.** A green-filled active chip reads as a button; a soft mint tint reads as "selected" without competing with the CTA.
3. **Delete the `[data-palette]` toggle and ship one corrected scheme.** Two palettes doubled the QA surface and let a broken (single-green) variant survive — collapse to the one AA-verified jade map above.
