# Hub20 / 02 — Palette Resolution (DEFINITIVE)

Status: SPEC ONLY. No prototype. Premiums frozen. No em-dashes.
Decision authority: resolves the three-way palette conflict for the LIVE hub restyle.

---

## The conflict, grounded

Three palette systems exist in the repo:

**(a) ZIP carrier pages — "health-tech v5"**
`docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html` lines 33-52.
Single teal accent `--teal:#0E8C8B`, cool grey-white surfaces (`--bg:#F6F8FA`, `--surface:#FFFFFF`), Inter only, and a coverage-state triad `--covered:#0F9D6E` / `--partial:#B26A00` / `--notcov:#64748B`. Carries a `[data-theme="gold"]` override (line 52) that swaps the entire teal ramp for brass (`--teal:#B0894E`). This is the system that actually reads as health-insurance.

**(b) Delta ZIP — "Graphite & Jade"**
`docs/ppo-redesign/_zip-21jun/delta/COLOR-SCHEME.md`.
`--jade:#0FB5A6`, `--jade-deep:#0C8C81`, graphite ink, Fraunces serif headings. Self-described feel target (line 55): "boutique concierge / editorial magazine, not a healthcare portal." This DIRECTLY contradicts the stated goal. It is the luxury-editorial pole.

**(c) Live page — "cream / T5 editorial"**
`compare-ppo-dental-plans.html` lines 32-57.
`--paper:#F5F0E5` cream backgrounds, `--green:#2E5E45` forest green, `--ink:#21302A`, Fraunces serif. This is the most luxury-editorial of the three and the furthest from health-insurance.

### Why this is genuinely conflicted
1. The user wants the HEALTH-INSURANCE feel. Only system (a) delivers it. Systems (b) and (c) explicitly aim at luxury-editorial.
2. The user has separately demanded "T5 jade." But "T5 jade" in the live CSS is actually forest green `#2E5E45` on cream, not a jade/teal. The brand name and the hex do not agree. "Jade" must be honored as the intent (a cool blue-green primary), not the cream-green hex.
3. The user demands body text NEVER equals CTA color. In ZIP (a) this is already nearly true (body `--ink-2:#33444F`, CTA `--teal:#0E8C8B`) but LINKS also use teal (`a{color:var(--teal-strong)}` line 58), so links and CTA collapse into one color. That violates the three-distinct-colors requirement and must be fixed.
4. The gold/jade toggle (a) exists but its gold branch makes the PRIMARY/CTA color brass `#B0894E`, which reads luxury, not health. Keeping the toggle reintroduces the exact editorial feel we are trying to leave.

---

## RECOMMENDATION (one palette, no toggle)

Adopt the ZIP health-tech system (a) as the base because it is the only one that reads as health-insurance. Make three corrections:

1. **Drop the gold/jade theme toggle entirely.** A health-insurance hub needs one trustworthy identity. Brass is the luxury pole we are abandoning; a runtime swap to it undoes the whole restyle. Remove `[data-theme="gold"]` (line 52), the `.theme-switch` chrome (lines 98-104), and the toggle JS. Ship jade only. This also kills the "is the body the CTA color" ambiguity that the dual theme created.

2. **Split LINK off from CTA so three colors are distinct.** This is the load-bearing change. Today CTA and links are both teal. Introduce a dedicated link color that is a deeper, bluer teal so it is unmistakably not the button green-teal and not body ink.

3. **Honor "T5 jade" as intent.** The primary stays the cool blue-green teal `#0E8C8B` (a true jade family), satisfying "jade" while staying clinical. The cream `#F5F0E5` and forest `#2E5E45` of the old live page are retired.

### The three mandated distinct colors
| Role | Token | Hex | Distinct from |
|---|---|---|---|
| BODY text | `--ink-2` | `#33444F` | desaturated slate, not a brand hue |
| LINK / inline anchor | `--link` | `#0A6E6D` (renamed from teal-strong, used ONLY for links) | deeper + cooler than CTA |
| CTA / primary button | `--cta` | `#0E8C8B` (the jade primary) | brighter than link, saturated |

Body is slate (no chroma), link is deep teal, CTA is the brighter jade. Three perceptibly different colors; none shares a hex.

---

## FINAL :root TOKEN BLOCK (drop-in for the hub)

```css
:root{
  /* surfaces — cool clinical white/grey, retires cream */
  --bg:#F6F8FA; --surface:#FFFFFF; --surface-2:#F1F5F8; --surface-3:#E9EFF3;

  /* ink ramp — slate, no brand chroma in body text */
  --ink:#0F1B25;        /* headings */
  --ink-2:#33444F;      /* BODY TEXT — never the CTA color */
  --ink-3:#5E707B;      /* secondary */
  --ink-faint:#94A4AE;  /* labels, captions */

  /* lines */
  --line:#DCE4EA; --line-soft:#EAEFF3;

  /* JADE primary ramp (honors "T5 jade") */
  --cta:#0E8C8B;        /* PRIMARY BUTTON / CTA — the only saturated jade */
  --cta-hover:#0A6E6D;  /* button hover */
  --cta-ink:#FFFFFF;    /* text on CTA */
  --cta-tint:#E2F4F3;   /* jade wash chips/selected */
  --teal-deep:#0B3B40;  /* dark callout/alert band */

  /* LINK — distinct third color, used ONLY on anchors */
  --link:#0A6E6D;       /* deeper, cooler than CTA; not body, not button */
  --link-hover:#075453;

  /* coverage-state triad (health-insurance signal) */
  --covered:#0F9D6E; --covered-ink:#0A5D43; --covered-tint:#E4F6EE;
  --partial:#B26A00; --partial-ink:#7A4A00; --partial-tint:#FBEFD9;
  --notcov:#64748B;  --notcov-ink:#475569;  --notcov-tint:#EEF1F4;

  /* status */
  --info:#1E6FD9; --info-tint:#E5EFFC;
  --warning:#C2410C; --warning-tint:#FCEBE2;
  --danger:#C1352B;  --danger-tint:#FBE9E7;

  /* type — Inter only, retires Fraunces serif */
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
}
```

Note `--link` and `--cta-hover` share `#0A6E6D` by design: a link at rest looks like the button's hover-tone (familiar, clearly interactive) while never matching the button's resting fill. The three RESTING colors a user sees — body slate, link deep-teal, CTA jade — are all distinct.

### Required application rules
- `body{color:var(--ink-2)}` (line 56 pattern in ZIP) — body is slate.
- `a{color:var(--link)} a:hover{color:var(--link-hover)}` — REPLACE the ZIP's `a{color:var(--teal-strong)}` so links no longer share the CTA ramp.
- `.btn-pri{background:var(--cta);color:var(--cta-ink)}` `.btn-pri:hover{background:var(--cta-hover)}`.
- No `[data-theme]` attribute anywhere; delete the toggle markup and JS.
- Retire `--paper`, `--green`, Fraunces from the live hub `:root` (lines 32-53 of `compare-ppo-dental-plans.html`).

---

## What this drops / reconciles
- DROPPED: gold/jade toggle (luxury pole, reintroduces brass CTA).
- DROPPED: cream `#F5F0E5` + forest `#2E5E45` + Fraunces (old live editorial look).
- RECONCILED: "T5 jade" honored as the jade-family primary `#0E8C8B`, not the misnamed cream-green hex.
- RECONCILED: CTA / link / body now three separate hexes; the link/CTA collapse in the ZIP is fixed.
- KEPT: coverage-state triad — the single strongest health-insurance signal in the palette.
