# A6 - On-Page Optimization & Heading Architecture

Agent 6 of 10 | SEO Architect | compare-ppo-dental-plans.html
File: /Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html

---

## 1. Current heading outline (as built)

| Line | Level | Section | Text (rendered) |
|------|-------|---------|-----------------|
| 979  | H1 | #match | Match a PPO dental plan to the work ahead. |
| 992  | H3 | #match panel | Tell us about your visit |
| 1019 | H2 | #compare | Put any plans side by side |
| 1034 | H3 | #compare | All plans |
| 1072 | H2 | #shelf | Find a PPO plan by the coverage feature you need |
| 1087 | H2 | #dentists | A dentist who takes your plan, near you |
| 1112 | H2 | #treatment | Shopping for a specific procedure? |
| 1122 | H2 | #situation | Start where life put you |
| 1135 | H2 | #vision | Humana Extend 5000 includes vision |
| 1149 | H2 | #terms | The words that decide your bill |
| 1160 | H2 | #playbook | How to buy a PPO dental plan and avoid common mistakes |
| 1162 | H3 | #playbook | Five mistakes that cost money |
| 1163 | H3 | #playbook | Six questions before you buy |
| 1173 | H2 | #learn | Guides that answer the real question |
| 1220 | H2 | #explore-carriers | PPO dental plans, by carrier. |
| 1244 | H2 | #glossary-shelf | The terms that decide your bill. |
| 1268 | H2 | #faq | PPO dental insurance, answered. |

Note: JS-injected H3s also exist inside cards (treatGrid, situationGrid, dictGrid, artGrid, planGrid modal, glossary). Those are correctly nested under their parent H2 and are fine.

---

## 2. Verdict on structure

Good news: exactly **one H1**, and the document is overwhelmingly a clean H1 -> H2 -> H3 tree. No genuine heading-level skips in the static markup. The two H3s in #match and #compare both sit under a higher heading (H1 at 979, H2 at 1019), so no H1->H3 jump.

One real defect and several missed-keyword opportunities below.

---

## 3. HEADING-LEVEL SKIP / SEMANTIC FLAG

**Flag 1 (real): "#terms" and "#glossary-shelf" share a near-duplicate H2.**
- Line 1149 H2: "The words that decide your bill"
- Line 1244 H2: "The terms that decide your bill."

Two sibling H2s with the same phrasing ("...decide your bill") read as duplicate-content signal and confuse the outline. Differentiate them. Recommended literal replacements:
- Line 1149 -> `<h2>PPO dental insurance terms, in plain English</h2>`
- Line 1244 keep the glossary-shelf phrasing but add the keyword: `<h2>PPO dental insurance terms that <em>decide your bill</em></h2>`

**Flag 2 (minor): #match panel H3 at 992 ("Tell us about your visit") precedes the page's first H2 (1019).**
This is technically a forward reference (H3 appears in DOM before any H2). It is under the H1 so it is not an invalid skip, but outline crawlers prefer the first sub-heading after an H1 to be an H2. Acceptable to leave, but cleaner to demote it to a non-heading element (it is a form-panel label, decorative, not a content section). Recommend changing `<h3>Tell us about your visit</h3>` to a styled `<p class="mpanel-lab">` or `<div class="flab">`-style label so the outline goes H1 -> H2(#compare) cleanly.

---

## 4. KEYWORD PLACEMENT AUDIT (decorative -> earn keyword value)

Target cluster: "compare PPO dental plans", "PPO dental insurance", "annual maximum / waiting period / premium", "in-network PPO dentist".

H1 (979) "Match a PPO dental plan to the work ahead." — Strong. Contains "PPO dental plan." Distinct from the title. Keep.

The following H2s are **decorative / brand-voice only** and carry no target keyword. They should be rewritten to earn keyword value while keeping the boutique tone:

| Line | Current (decorative) | Recommended literal replacement |
|------|----------------------|----------------------------------|
| 1019 | Put any plans side by side | Compare PPO dental plans side by side |
| 1112 | Shopping for a specific procedure? | PPO dental plans by procedure |
| 1122 | Start where life put you | PPO dental plans by life situation |
| 1160 | How to buy a PPO dental plan and avoid common mistakes | Keep. Already keyword-rich and intent-matched. |
| 1173 | Guides that answer the real question | PPO dental insurance guides |
| 1268 | PPO dental insurance, answered. | Keep. Strong, already carries the keyword. |

Headings already pulling keyword weight (keep as-is): 1072 (#shelf), 1087 (#dentists, "takes your plan, near you" supports the dentist-match intent), 1135 (#vision, branded "Humana Extend 5000"), 1220 (#explore-carriers, "PPO dental plans, by carrier").

The two #playbook H3s (1162/1163, "Five mistakes...", "Six questions...") are fine as scannable list labels and need no keyword change.

Net: 1019, 1112, 1122, 1173 are the four decorative H2s worth converting. They sit directly above crawlable card grids and a static comparison table, so the keyword in the H2 will reinforce the body content beneath it.

---

## 5. Recommended ideal outline (after edits)

```
H1  Match a PPO dental plan to the work ahead.          (#match)
H2  Compare PPO dental plans side by side               (#compare)
  H3 All plans
H2  Find a PPO plan by the coverage feature you need    (#shelf)
H2  A dentist who takes your plan, near you             (#dentists)
H2  PPO dental plans by procedure                       (#treatment)
H2  PPO dental plans by life situation                  (#situation)
H2  Humana Extend 5000 includes vision                  (#vision)
H2  PPO dental insurance terms, in plain English        (#terms)
H2  How to buy a PPO dental plan and avoid common mistakes (#playbook)
  H3 Five mistakes that cost money
  H3 Six questions before you buy
H2  PPO dental insurance guides                          (#learn)
H2  PPO dental plans, by carrier                         (#explore-carriers)
H2  PPO dental insurance terms that decide your bill     (#glossary-shelf)
H2  PPO dental insurance, answered.                      (#faq)
```
One H1, fully nested, every section H2 now carries a target keyword, no duplicate sibling phrasing, no skips. (#match panel H3 demoted to a non-heading label as noted in Flag 2.)

---

## 6. IMAGE ALT TEXT

The page has no content `<img>` in the static markup audited; the only image references are the OpenStreetMap dentist tiles injected by JS in dentist cards and the OG/Twitter share image (not on-page). Action items:
- **OG image (line 16/20):** when dentist-card map tiles are injected, ensure each carries `alt="Map of {dentist name}, {city}"` (confirm in the card render JS, not in scope of this static file region). 
- **Inline SVG icons** (e.g. search glyph line 1094) correctly use `aria-hidden="true"` — no alt needed, leave as-is.
- No decorative `&#10038;` eyebrow glyphs need alt (they are text in spans, screen-reader-skippable via context). Fine.

---

## 7. OG / TWITTER / SOCIAL CARD COMPLETENESS

Current tags (lines 11-20):

Present: og:type, og:site_name, og:title, og:description, og:url, og:image, twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image.

**Missing / mismatched — recommended additions:**

1. **og:title and twitter:title do not match the new <title>.** Page title is now "Compare PPO Dental Plans 2026: Independent | CoverCapy" but og:title (13) and twitter:title (18) still say "Compare PPO Dental Plans & Find a Dentist | CoverCapy". Not fatal, but align the social title with the positioning. Recommend updating both to: `Compare PPO Dental Plans 2026: Independent | CoverCapy` (or a share-optimized variant without the year if testing CTR).

2. **og:image:width and og:image:height missing.** Add for reliable card rendering:
   ```html
   <meta property="og:image:width" content="1200" />
   <meta property="og:image:height" content="630" />
   ```
   (Confirm the actual PNG at /og/compare-ppo-dental-plans.png is 1200x630; summary_large_image expects 1.91:1.)

3. **og:image:alt missing.** Add:
   ```html
   <meta property="og:image:alt" content="CoverCapy independent PPO dental plan comparison, premium, annual maximum and waiting period side by side" />
   ```

4. **twitter:image:alt missing.** Add:
   ```html
   <meta name="twitter:image:alt" content="Compare PPO dental plans on premium, annual maximum and waiting period" />
   ```

5. **og:locale missing.** Add:
   ```html
   <meta property="og:locale" content="en_US" />
   ```

6. **twitter:site / twitter:creator missing.** If a CoverCapy X handle exists, add `<meta name="twitter:site" content="@covercapy" />` for attribution. Optional.

7. **og:url uses www subdomain** (`https://www.covercapy.com/...`) while CLAUDE.md / canonical convention is `covercapy.com`. Confirm canonical (not audited in this region) and og:url agree on host to avoid a canonical/social mismatch. Pick one host and make og:url match canonical exactly.

---

## 8. Summary of edits to ship

- Rewrite 4 decorative H2s (1019, 1112, 1122, 1173) to carry target keywords.
- De-duplicate the two "decide your bill" H2s (1149 vs 1244).
- Demote #match panel H3 (992) to a non-heading label.
- Align og:title/twitter:title with new <title>.
- Add og:image:width, og:image:height, og:image:alt, twitter:image:alt, og:locale.
- Reconcile og:url host with the canonical.
- Add map-tile alt text in the dentist-card render JS.
