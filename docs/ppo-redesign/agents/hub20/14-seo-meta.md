# 14 — SEO Meta Fixes for the LIVE PPO Hub

**Page:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html` (lines 3–20, `<head>`)
**Canonical:** `https://www.covercapy.com/compare-ppo-dental-plans/`
**Scope:** Apply ZIP SEO fixes (docs 03 title, 04 meta, 09 OG/social) to the live hub head.
**Status:** ANALYZE / SPEC only. Premiums frozen. No em-dashes.

---

## 1. Audit of the current live `<head>` (lines 3–20)

| Tag | Current value | Length | Verdict |
|---|---|---|---|
| `<title>` (line 6) | `Compare PPO Dental Plans 2026: Delta Dental, Aetna, Guardian, UHC & More \| CoverCapy` | **84 chars** | FAIL — truncates (~50–60 budget). Carrier-list stuffing burns pixels; brand drops. |
| `<meta description>` (line 7) | `Compare 8 PPO dental plans for 2026: Delta Dental, Guardian, UHC, Humana & Ameritas. See waiting periods, annual maximums, and monthly cost side by side.` | **150 chars** | PASS on length, but no action/verify cue (Doc 04 wants the "we verify your exact plan free" CTA). |
| `og:type` (11) | `website` | — | PASS (hub keeps `website` per Doc 09). |
| `og:site_name` (12) | `CoverCapy` | — | PASS. |
| `og:title` (13) | `Compare PPO Dental Plans & Find a Dentist \| CoverCapy` | 53 | OK but inconsistent with `<title>`. |
| `og:description` (14) | present, 158 chars | — | PASS, but not synced to meta description (Doc 09 wants sync). |
| `og:url` (15) | canonical | — | PASS. |
| `og:image` (16) | `https://www.covercapy.com/og/compare-ppo-dental-plans.png` | — | PRESENT but no `og:image:width/height/alt`; ZIP ships `og-hub.png`. |
| `og:locale` | **absent** | — | FAIL — Doc 09 requires `en_US`. |
| `twitter:card` (17) | `summary_large_image` | — | PASS. |
| `twitter:title/description/image` (18–20) | present | — | PASS, but no `twitter:image:alt`; not synced. |

**Net:** The live hub is in better shape than the audited baseline (it already has og:image + a full Twitter card). The remaining gaps vs the ZIP spec are: (1) title too long at 84 chars, (2) meta description missing the verify CTA, (3) `og:locale` missing, (4) OG/Twitter image dimension + alt tags missing, (5) OG/meta descriptions not synced.

---

## 2. Corrected tags (grounded in ZIP docs)

### Title — keyword-first, ≤60 chars
Doc 03 explicitly names the hub model: `Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy` (**57 chars**). Keyword-first ("Compare 2026 PPO Dental Plans"), one value modifier ("Costs & Benefits"), brand last. This replaces the 84-char carrier-stuffed title.

### Meta description — ~150 chars with verify CTA
Doc 04 hub AFTER line, adapted to the live carrier framing, ending in the fixed action cue:
`Compare top 2026 PPO dental plans side by side: benefits, waiting periods, annual maximums and monthly cost. We verify your exact plan free.` (**138 chars** — under the 160 ceiling, CTA fully visible.)

### OG / Twitter — full set, synced, with og-hub.png
- `og:type` stays `website` (hub, per Doc 09).
- Add `og:locale = en_US`.
- Sync `og:title` + `twitter:title` to the new `<title>`.
- Sync `og:description` + `twitter:description` to the new meta description.
- Point image at the ZIP asset `og-hub.png` (absolute https URL).
- Add `og:image:width 1200`, `og:image:height 630`, `og:image:alt`, `twitter:image:alt`.

> Image path note: the ZIP ships `og-hub.png`. Deploy it to `/og/og-hub.png` at the web root so the absolute URL resolves: `https://www.covercapy.com/og/og-hub.png`. (The current live file references `og/compare-ppo-dental-plans.png` — confirm which asset actually exists at deploy before swapping; spec below uses the ZIP `og-hub.png`.)

---

## 3. Literal replacement `<head>` snippet (lines 6–20)

```html
<title>Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy</title>
<meta name="description" content="Compare top 2026 PPO dental plans side by side: benefits, waiting periods, annual maximums and monthly cost. We verify your exact plan free." />
<link rel="canonical" href="https://www.covercapy.com/compare-ppo-dental-plans/" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="theme-color" content="#2E5E45" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="CoverCapy" />
<meta property="og:locale" content="en_US" />
<meta property="og:title" content="Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy" />
<meta property="og:description" content="Compare top 2026 PPO dental plans side by side: benefits, waiting periods, annual maximums and monthly cost. We verify your exact plan free." />
<meta property="og:url" content="https://www.covercapy.com/compare-ppo-dental-plans/" />
<meta property="og:image" content="https://www.covercapy.com/og/og-hub.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="CoverCapy PPO dental plans comparison card: benefits, waiting periods, annual maximums and monthly cost." />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy" />
<meta name="twitter:description" content="Compare top 2026 PPO dental plans side by side: benefits, waiting periods, annual maximums and monthly cost. We verify your exact plan free." />
<meta name="twitter:image" content="https://www.covercapy.com/og/og-hub.png" />
<meta name="twitter:image:alt" content="CoverCapy PPO dental plans comparison card." />
```

---

## 4. Compliance check (Doc 04 guardrails)
- No "guaranteed coverage" language. OK.
- No hard national price; the line does not state a rate. OK.
- Coverage figures framed as terms to verify via the action cue. OK.
- No em-dashes (uses colon + period). OK.
- Title front-loads primary keyword; brand last and optional. OK (57 chars, brand fits).

## 5. Deploy note
This is the LIVE hub file, hand-edited directly (it is NOT under `/dental/` and is NOT generated by `seo-build/generate-plans.js`). Confirm `og-hub.png` is deployed at `/og/og-hub.png` before publishing, or repoint the image to the existing `compare-ppo-dental-plans.png` to avoid a broken unfurl.
