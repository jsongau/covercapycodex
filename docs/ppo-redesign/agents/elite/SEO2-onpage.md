# SEO Architect 2 — On-Page, Content Depth, E-E-A-T Audit

**Page:** `/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`
**Topic class:** YMYL (Your Money or Your Life — insurance). E-E-A-T is the ranking ceiling here, not a nice-to-have.
**Scope:** Analyze and spec only. Premiums are FROZEN. No em-dashes anywhere in recommended copy.

---

## 1. Current state (grounded in real lines)

| Element | Current | Line |
|---|---|---|
| `<title>` | `Compare PPO Dental Plans 2026: Delta Dental, Aetna, Guardian, UHC & More \| CoverCapy` (84 chars) | 6 |
| Meta description | `Compare 8 PPO dental plans for 2026: Delta Dental, Guardian, UHC, Humana & Ameritas. See waiting periods, annual maximums, and monthly cost side by side.` (~152 chars) | 7 |
| H1 | `Match a PPO dental plan to the work ahead.` | 974 |
| Trust line | `Independent, no paid placement · reviewed by dental billing specialists · updated June 2026` | 976 |
| Reviewer bar | `Plan data reviewed by **Sarah Chen**, licensed dental insurance consultant` + `SC` avatar + `Verified June 2026 · Updated quarterly · How we rate plans` | 1017-1024 |
| H2 outline | Put any plans side by side (1014); Find a PPO plan by the coverage feature you need (1067); A dentist who takes your plan, near you (1082); Shopping for a specific procedure? (1107); Start where life put you (1117); Humana Extend includes vision (1130); How to buy a PPO dental plan and avoid common mistakes (1154); Guides that answer the real question (1167); PPO dental plans, by carrier (1209); The terms that decide your bill (1233); PPO dental insurance, answered (1258) | various |

There is a server-rendered crawlable comparison `<table>` (1042-1055), a 10-term glossary (1234-1245), a buyer's playbook, an FAQ, and a by-carrier branch grid. Crawlable content depth is actually strong. The weak points are the title, the H1's keyword absence, and fabricated/vague E-E-A-T.

---

## 2. Critical findings

### 2.1 Fabricated reviewer — FLAG, remove or replace (lines 1017-1024)
`Sarah Chen, licensed dental insurance consultant` with an `SC` avatar and a "Verified" timestamp is a fabricated reviewer entity. On a YMYL page this is an E-E-A-T liability: an invented credentialed person presented as having reviewed financial product data is exactly the pattern reviewer guidelines and FTC endorsement rules penalize. The vague `reviewed by dental billing specialists` on line 976 has the same problem in softer form — an unnamed, unverifiable authority claim.

**Do not invent a person.** Two honest paths:
- **(a) Real named entity.** If a real, credentialed person at CoverCapy will stand behind the data, name them with a real title, a link to a bio/`/about/` page, and an `author`/`reviewer` schema entity (`Person` with `jobTitle`, `url`, optional `sameAs` to LinkedIn). This is the strongest option.
- **(b) Organizational authorship.** If no named individual is available, attribute to the organization honestly: `Compiled and verified by the CoverCapy plan research team` with a link to a methodology page. Drop the fake avatar and the singular "consultant" framing.

Either way, replace `dental billing specialists` (976) and `Sarah Chen` (1021) with the same honest entity so the page tells one consistent story.

### 2.2 Title is carrier-stuffed and over length (line 6, 84 chars)
Four carrier names plus "& More" pushes past the ~60 char SERP truncation point; "Delta Dental, Aetna, Guardian, UHC" gets cut and reads as keyword stuffing. The primary query ("compare PPO dental plans") is buried behind the year and brand list. Lead with the keyword, keep one differentiator, cut the brand list (the on-page table and branch grid already carry brand relevance).

### 2.3 H1 has no keyword (line 974)
`Match a PPO dental plan to the work ahead.` is good brand voice but the head term "PPO dental plans" appears only as a fragment and "compare" is absent. The H1 should carry the primary intent without losing the concierge tone.

---

## 3. Literal recommendations

### Title (<= 60 chars) — keyword first, one differentiator
```
Compare PPO Dental Plans 2026: Independent Side-by-Side
```
(54 chars. "Compare PPO Dental Plans 2026" front-loaded; "Independent" is the trust differentiator that matches the page's no-paid-placement positioning. Brand "| CoverCapy" can be appended by the template if the budget allows, but at 54 chars the core already fits; if appended, "Compare PPO Dental Plans 2026 | CoverCapy" at 41 chars is the safe fallback.)

### Meta description (~150 chars)
```
Compare 8 PPO dental plans on premium, annual maximum, waiting period and coverage. Independent, no paid placement. See which fits your treatment.
```
(146 chars. Keeps the four decision factors from the lede on line 975, keeps "no paid placement" trust signal, ends with an intent-matching benefit. Drops the brand list since brands are crawlable on-page.)

### H1 — keyword present, tone kept
```
Compare PPO dental plans, matched to the work ahead.
```
(Keeps the distinctive "work ahead" phrasing from line 974 while front-loading "Compare PPO dental plans" so the head term sits in the H1. The existing `<br>` + `disp-it` span split can wrap after the comma.)

---

## 4. H2 / H3 outline to fully cover intent

The existing sections are good but the ordering and a few gaps leave intent uncovered. Recommended outline (reuse existing sections where noted):

- **H1** Compare PPO dental plans, matched to the work ahead.
  - H2 What is a PPO dental plan? *(NEW — definition block, see 5.1)*
  - H2 Put any plans side by side *(existing, 1014)*
    - H3 All plans *(existing, 1029)*
    - H3 How we rate plans: our methodology *(NEW — see 5.2; the "How we rate plans" link on 1022 currently points to `#methodology` which is just the section head on 1012, there is no actual methodology content)*
  - H2 PPO vs DHMO vs discount plan: which do you need? *(NEW — comparison/disambiguation, see 5.4)*
  - H2 Find a PPO plan by the coverage feature you need *(existing, 1067)*
  - H2 Shopping for a specific procedure? *(existing, 1107)*
  - H2 Start where life put you *(existing, 1117)*
  - H2 How to buy a PPO dental plan and avoid common mistakes *(existing, 1154)*
  - H2 PPO dental plans, by carrier *(existing, 1209)*
  - H2 The terms that decide your bill *(existing glossary, 1233)*
  - H2 PPO dental insurance, answered *(existing FAQ, 1258)*

---

## 5. Content blocks to add for depth

### 5.1 Definition block (top, after the match tool)
A 60-90 word plain-English answer to "what is a PPO dental plan" — the page currently assumes the reader already knows. This wins the definitional/featured-snippet intent and gives the page a clean topical opening. Define PPO, contrast briefly with the network being optional, and link to the in-network glossary term (1238).

### 5.2 Real "How we rate plans" methodology block
The link on line 1022 promises "How we rate plans" but `#methodology` (1012) has no methodology content beneath it. Add a genuine methodology block: what four factors are weighted (premium, annual maximum, waiting period, coverage tiers — already named on 975), where the plan data comes from, how often it is refreshed (the page claims "Updated quarterly"), and a frank note that premiums are illustrative and vary by state (the table caption on 1043 already says this — surface it here too). This is the single highest-leverage E-E-A-T addition: it converts the trust *claims* into a verifiable *method*.

### 5.3 Last-updated + author/reviewer line (page-level)
Add a visible, machine-readable last-updated and byline near the H1, backed by schema:
- `dateModified` and `datePublished` in the page's `Article`/`WebPage` schema.
- An `author` (organization or named real person per 2.1) and, if a real reviewer exists, a `reviewedBy` `Person`.
- Keep the visible "updated June 2026" (976) but tie it to the schema `dateModified` so the claim is structured, not just decorative.

### 5.4 PPO vs DHMO vs discount disambiguation
A short comparison block (table or three cards) so the page captures the upstream "what kind of dental plan" intent and internally routes confused shoppers. Currently the page assumes the PPO decision is already made.

### 5.5 FAQ schema check
The FAQ section (1253-1267) is JS-rendered into `#faqList`. Confirm `FAQPage` JSON-LD is emitted server-side or inlined; JS-only FAQ content with no static schema risks not being picked up. If the answers are crawlable in the static HTML, good; if injected only on load, mirror them into a static `FAQPage` block.

---

## 6. Word count note
Visible static prose is thin relative to the interactivity (much of the body is the match tool, sortbars, and JS-rendered grids). The crawlable backbone (static table 1042-1055, glossary 1234-1245, branch grid 1217-1224) is solid, but the definitional, methodology, and PPO-vs-DHMO blocks in section 5 are what move this from "tool page" to "authority hub" for a YMYL query. Target the additions at substance, not padding.

---

## 7. Honest entity recommendation (summary of 2.1)
Pick ONE and apply consistently to lines 976 and 1021:
- Preferred: a real named CoverCapy team member with a real title, a `/about/`-linked bio, and `Person` schema.
- Acceptable: `CoverCapy plan research team` with a methodology-page link and `Organization` author schema.
- Not acceptable: keep "Sarah Chen" or "dental billing specialists" as written. Both are unverifiable on a YMYL page.
