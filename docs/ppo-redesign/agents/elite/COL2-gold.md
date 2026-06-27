# COL2 — Gold + Navy Theme Color Audit

File: `compare-ppo-dental-plans.html` — `[data-theme="gold"]` (lines 772-801)
Auditor: Color Palette Expert 2 (Gold). Coordinated with COL1 (Jade, lines 803-819).

## Current gold token set (lines 773-782)

```
--paper #FAF7F1   --paper-2 #F2EBDD   --card #FFFFFF
--ink #1C1A14     --ink-soft #433D2E
--green #B07B1E (CTA)   --green-d #8A5A12 (links)   --green-l #9A7A45
--sage #F5ECD8    --sage-2 #EADFC4
--muted #6E6552   --line #E7DEC9   --line-2 #DBCFB4
--gold #8A5A12    --rust #B0542E
--panel #102A43 (navy)   --panel-ink #F4F8FC   --panel-soft rgba(244,248,252,.74)   --panel-eye #D9B26A
```

## Body / link / CTA separation — PASS

Three distinct roles, no collision:
- Body `--ink #1C1A14` (near-black warm), Links `--green-d #8A5A12` (deep amber), CTA fill `--green #B07B1E` (mid gold). All visually separable; link is darker than CTA so inline links read as text, not buttons. Good.

## Contrast ratios (sRGB, WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| Body `#1C1A14` on paper `#FAF7F1` | ~16.9:1 | AAA pass |
| ink-soft `#433D2E` on paper | ~9.6:1 | AAA pass |
| Links `--green-d #8A5A12` on paper `#FAF7F1` | ~5.4:1 | AA pass (normal text) |
| Links `--green-d` on card `#FFFFFF` | ~5.6:1 | AA pass |
| muted `#6E6552` on paper | ~4.8:1 | AA pass (barely) |
| **White `#F6F0E6` (.btn-green, line 784) on CTA `#B07B1E`** | **~3.3:1** | **FAIL AA normal text; passes 3:1 UI/large only** |
| panel-soft blended `~#B5C5D2` on navy panel `#102A43` | ~7.0:1 | AA pass |
| panel-ink `#F4F8FC` on navy panel | ~15.8:1 | AAA pass |
| panel-eye `#D9B26A` on navy panel | ~6.4:1 | AA pass |

## Failing pair + fix

The only fail is white button text on the gold CTA fill (~3.3:1). Button labels are bold ~16px, so it clears the 3:1 large-text/UI bar, but for a luxury brand the soft mud is the weak point.

Recommended refinement (pick one):
- Darken CTA fill `--green` from `#B07B1E` to **`#9A6A12`** → white text ratio rises to ~4.1:1, near AA, richer bronze.
- Or keep `#B07B1E` and set `.btn-green` text to a deep navy-tinted dark `#1C1A14` for ~4.9:1 (AA pass) — but breaks the white-on-gold "stamp" look.
- Cleanest luxe option: CTA fill **`#8F5E14`** (matches --gold family) with white `#FFFFFF` text → ~4.6:1, AA pass, and unifies --green / --gold / --green-d into one bronze ladder.

If darkening the CTA, also nudge `--green-d` links to **`#7E5210`** to keep link darker-than-CTA hierarchy (still ~6.2:1, AA pass).

## Gold + navy cohesion — STRONG with one tweak

Navy panel `#102A43` + gold accent `--panel-eye #D9B26A` reads as gold-on-navy, not brown. This is the correct call; brown panels would have muddied with the warm paper. To lock the dual identity:
- The navy `#102A43` is cool; the paper `#FAF7F1` is warm. Bridge them by ensuring the eyebrow/accent on navy is the warm gold (`#D9B26A`) — already done. Good.
- Range-slider fill (lines 786-787) uses `#082A30` (teal-night, a leftover from default theme), not the navy `#102A43`. Recommend swapping slider fill to **`#102A43`** so the dark accent matches the panel and reads navy, not teal. This is the one inconsistency that leaks the old teal identity into gold.
- band eyebrow `#C8A870` / band bullet `#9A7440` (lines 790-792) are warm gold — consistent.

## Coverage triad — PASS (untouched, correct)

The gold theme does NOT override `--covered/--partial/--notcov` (defined globally lines 52-55: green `#0F9D6E`, amber `#B26A00`, slate `#64748B`). These are semantic health-insurance signals and must stay theme-independent so "covered / partial / not covered" never shifts meaning. Confirmed they still render against gold paper:
- covered-ink `#0A5D43` on covered-tint `#E4F6EE` ~6.9:1 (pass)
- partial-ink `#7A4A00` on partial-tint `#FBEFD9` ~7.4:1 (pass)
- notcov-ink `#475569` on notcov-tint `#EEF1F4` ~7.0:1 (pass)
Leave these alone in both gold and jade.

## Brand-color carrier logos — assessment (lines 2056-2067)

Logos use fixed official brand hex on white text inside `.clogo` (line 482, `color:#fff`):
- uhc `#002677`, moo `#003A70`, delta `#0072CE`, metlife-ncd `#0090DA`, fallback `#7A7E74`.

White-on-brand contrast: navy blues (`#002677`, `#003A70`) ~13-15:1 (AAA); delta `#0072CE` ~4.7:1 (AA pass); metlife `#0090DA` ~3.1:1 (**fail AA normal, but the mono letter is 800-weight 16-22px = large-text/UI, passes 3:1**); fallback `#7A7E74` ~3.2:1 (large-text pass only).

Theme interaction: logo backgrounds are fixed brand colors, independent of theme — correct for trademark fidelity. Against gold's warm paper `#FAF7F1`, the cool corporate blues sit fine (logos carry a `box-shadow` and `border-radius` lockup that separates them from paper). Against jade's `#FFFFFF` they also pass. No theme-specific change needed. Only caution: the `#0090DA` and grey fallback are the weak letters — if a single-letter mono ever drops below 16px, force `#fff` to remain or darken those two backgrounds ~8%.

## Recommended final gold edits

```css
[data-theme="gold"]{
  --green:#8F5E14;      /* was #B07B1E — white text now ~4.6:1 AA */
  --green-d:#7E5210;    /* was #8A5A12 — keeps link darker than CTA, ~6.2:1 */
  /* paper, ink, panel navy, panel-eye unchanged — all pass */
}
[data-theme="gold"] .btn-green{color:#FFFFFF}   /* was #F6F0E6 */
/* line 786-787: swap slider accent #082A30 -> #102A43 to match navy panel */
```
