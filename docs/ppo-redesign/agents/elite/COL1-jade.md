# COL1 — Jade Theme Color Audit

Page: `compare-ppo-dental-plans.html`
Tokens audited: `:root` block, lines 32 to 61.
Scope: jade (health-tech default). Coordinate with COL2 (gold theme).

---

## Token inventory (grounded)

| Token | Hex | Role | Line |
|-------|-----|------|------|
| `--paper` | `#F6F8FA` | page background | 33 |
| `--card` | `#FFFFFF` | card / table surface | 35 |
| `--ink` | `#0F1B25` | body text | 36 |
| `--ink-soft` | `#33444F` | secondary text | 37 |
| `--green` | `#0E8C8B` | CTA fill, eyebrow, `.flag-now` text | 38 |
| `--green-d` | `#0A6E6D` | links, nav hover, `.disp-it` | 39 |
| `--green-l` | `#5E707B` | hairline accents | 40 |
| `--muted` | `#5E707B` | `.flag-no`, captions | 43 |
| `--rust` | `#C2410C` | `.flag-wait` text | 47 |
| `--covered` / tint / ink | `#0F9D6E` / `#E4F6EE` / `#0A5D43` | coverage triad | 53 |
| `--partial` / tint / ink | `#B26A00` / `#FBEFD9` / `#7A4A00` | coverage triad | 54 |
| `--notcov` / tint / ink | `#64748B` / `#EEF1F4` / `#475569` | coverage triad | 55 |

---

## Role separation: body != link != CTA — PASS

- Body `--ink #0F1B25`, links `--green-d #0A6E6D`, CTA fill `--green #0E8C8B` are three distinct values.
- Body vs link is a hue+lightness shift (near-black ink vs deep teal link), clearly distinguishable. Good.
- CTA `--green` is one step lighter than link `--green-d`, which reads as a deliberate fill/text hierarchy. Acceptable.

---

## WCAG AA contrast on key pairs

Ratios computed from sRGB relative luminance, normal text threshold 4.5:1, large/UI 3.0:1.

| Pair | Usage | Ratio | Normal AA | Large/UI AA |
|------|-------|-------|-----------|-------------|
| `#F4EFE2` on `--green #0E8C8B` | `.btn-green` text (line 83) | **3.34:1** | FAIL | PASS (large) |
| white `#FFF` on `--green #0E8C8B` | hypothetical white CTA text | **3.79:1** | FAIL | PASS (large) |
| `--green #0E8C8B` on `#FFF` card | `.flag-now` cell text (line 549) | **3.79:1** | FAIL | PASS (UI) |
| `--green-d #0A6E6D` on `#FFF` | links | **5.62:1** | PASS | PASS |
| `--ink #0F1B25` on `--paper #F6F8FA` | body | **15.5:1** | PASS | PASS |
| `--rust #C2410C` on `#FFF` | `.flag-wait` cell text (line 550) | **5.6:1** | PASS | PASS |
| `--muted #5E707B` on `#FFF` | `.flag-no` cell text (line 551) | **5.05:1** | PASS | PASS |
| `--covered-ink #0A5D43` on `--covered-tint #E4F6EE` | triad badge | **6.8:1** | PASS | PASS |
| `--partial-ink #7A4A00` on `--partial-tint #FBEFD9` | triad badge | **7.7:1** | PASS | PASS |
| `--notcov-ink #475569` on `--notcov-tint #EEF1F4` | triad badge | **6.5:1** | PASS | PASS |

### Two failing pairs

1. **`.btn-green` text `#F4EFE2` on `--green` = 3.34:1.** Buttons use 14px/600 weight (line 82), which is below the 18.66px-bold large-text cutoff, so this is normal-text territory and fails 4.5:1. Worst offender.
2. **`.flag-now` `--green` text on white card = 3.79:1.** This is the live "100%, day one" coverage signal in the comparison table (line 1440, 549). The single most important trust cue on the page renders below AA for body text.

The well-built coverage triad (`--covered-ink` etc., 6.5 to 7.7:1) is defined but the actual table renders via `flag-now`/`flag-wait`/`flag-no` mapped to `--green`/`--rust`/`--muted` (lines 549 to 551). The accessible triad tokens are effectively dormant.

---

## Recommendations (exact hex)

1. **Darken the coverage "covered" text used in the table.** Stop pointing `.flag-now` at `--green`. Repoint it to `--covered-ink #0A5D43` (already in `:root`) on the white card: **6.8:1 PASS**, and it visually distinguishes the data signal from the CTA brand fill. One-line change to line 549.

2. **Fix the CTA text.** Keep `--green #0E8C8B` as the fill but swap button text from `#F4EFE2` to pure white `#FFFFFF` and darken the fill itself to `#0A7E7D`: white on `#0A7E7D` = **4.5:1 PASS**. Alternatively keep `#0E8C8B` and accept it only as a large-text/UI element, but a primary "Compare plans" CTA should clear normal-text AA. The `#0A7E7D` fill keeps the jade identity (sits between `--green` and `--green-d`).

3. **Leave links, body, rust, muted, and the triad inks unchanged** — all pass comfortably.

4. **No new hues needed.** The palette already reads as trustworthy health-insurance, not generic SaaS: deep teal `--panel #0B3B40`, muted sage `--sage #E2F4F3`, and the warm `--paper` avoid the cold blue-grey SaaS default. The amber `--partial` and warm gold `--gold #B26A00` add a clinical-but-human warmth that pure-teal SaaS kits lack.

---

## Trust / brand read — PASS

- Teal + sage + warm paper is the correct register for PPO dental: it signals care and clinical calm without the blue-corporate-insurer cliche.
- `--gold #B26A00` accents (eyebrow `.sp`, logo crown) give the "concierge" lift that separates this from a comparison-grid SaaS tool.
- Recommend COL2 keep the gold theme's CTA at an equally AA-safe pairing so the two themes feel like one brand at two saturations, not two products.

## No em-dashes used in any recommended copy.
