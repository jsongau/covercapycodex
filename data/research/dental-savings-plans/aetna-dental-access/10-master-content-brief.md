# 10 — Master Content Brief

The build spec that ties the other documents into one page. This is what an agent or writer follows to produce the Aetna Dental Access HTML page. Read `00`–`09` first; this is the assembly instruction.

---

## Page identity

- **Working title (H1):** "Aetna Dental Access, Explained: Is This Dental Savings Plan Worth It?"
- **Title tag:** `Aetna Dental Access Review 2026: Savings Plan vs PPO — Is It Worth It? | CoverCapy`
- **Meta description:** Aetna Dental Access is a dental savings plan, not insurance — no waiting periods, no annual maximum, ~15–50% off. See real fee examples, who it's best (and worst) for, and whether a PPO would save you more.
- **URL (proposed):** `/dental-savings-plans/aetna-dental-access/` (a new pillar tree, parallel to the `/dental/` geo tree).
- **Primary keyword:** aetna dental access. **Secondary:** is aetna dental access worth it, dental savings plan vs ppo, aetna dental access reviews.

---

## The voice (non-negotiable)

Calm, trustworthy, conversational, concierge. Someone who spent years inside dental offices helping real patients understand their options. Educate first, sell second. **Avoid:** AI-sounding copy, buzzwords, "game-changing," "unlock," "revolutionary," exaggerated marketing, em-dashes in body copy, roman numerals in lists. Reduce dental anxiety in every sentence.

---

## Answer-first opening (first 200 words — critical for GEO)

Open with the quotable verdict so AI assistants and skim-readers get the answer immediately:

> Aetna Dental Access is a dental savings plan, not insurance. You pay one annual fee (about $155–$175 for an individual) and then pay a discounted price directly to participating dentists — with no waiting periods, no annual maximum, and no deductible. It's worth it when you need real dental work soon, especially major or cosmetic work a PPO would delay, cap, or exclude. It's usually not the best choice if you're healthy and only need cleanings, since a PPO that covers preventive care at 100% tends to win there. The smartest move is to confirm your dentist accepts it and estimate your year's dental needs before enrolling.

---

## Page structure (in order)

1. **Hero + answer-first verdict** (above). CTA: "Check if a dentist near you accepts it" + "Compare PPO plans instead."
2. **What it actually is** — from `01`. The warehouse-club analogy. The "membership, not insurance" definition box.
3. **Savings calculator (hero interactive)** — from `09`. Reader's own dollars, early.
4. **Real fee examples** — from `03`. The fee table. Three worked examples (crown, root canal, ortho).
5. **What you get / structural features** — the no-no-no-no list (no max, no wait, no deductible, no pre-existing exclusion) + cosmetic included.
6. **Pricing** — from `04`. Verified range, the "same network, different price by retailer" honesty point, the $20 fee, cancellation window.
7. **Savings plan vs PPO** — from `05`. The comparison table + decision tree interactive + worked head-to-head.
8. **Who it's best and worst for** — from `07`. Persona cards + routing.
9. **"Why your dentist says yes to a discount"** — from `00`. The signature original section. Builds trust, kills the scam fear, strengthens the dentist value prop.
10. **Is it a scam? / myth-buster** — from `06` + `09`. Honest cons, billing-complaint context, how to avoid mistakes.
11. **Who actually runs it** — from `02`. The two-layer structure, Aetna vs Vital Savings, DPO transparency.
12. **FAQ accordion** — from `08`. The full Q&A set, marked up as FAQPage schema.
13. **Decision CTA block** — verify a dentist (`/find-my-dentist`) OR compare PPO plans (`/compare-ppo-dental-plans`). Concierge framing: "Not sure? CoverCapy helps you choose."
14. **Related** — link to sibling carrier pages (`11`) and the future savings-plans pillar.

---

## Schema to ship (from `08`)

Article/BlogPosting (with dateModified) + FAQPage + BreadcrumbList + Table (comparison + fee schedule) + HowTo ("how to use it at the dentist") + DefinedTermSet (glossary) + Organization (with named author/reviewer for E-E-A-T). Never let schema and visible content disagree.

---

## Internal links to place

- `/find-my-dentist` — every acceptance/verification mention (the moat). At least twice.
- `/compare-ppo-dental-plans` — every "a PPO may be better" mention (conversion path). PPO facts from `/data/plans/` only.
- `/dental/{state}/{city}/` — senior/affordable/near-me sections.
- Sibling savings-plan carrier pages — once built.

---

## Hard accuracy rules (do not violate)

1. **Never publish an `[UNCERTAIN]` number** without re-verifying at the cited source on publish day. That includes: exact prices, network size (sources disagree: 213,000 / 226,000 / 300,000 — cite the specific page and date), auto-renewal terms, and the Medicare-card branding.
2. **State "not insurance" explicitly** and note it does not meet ACA minimum creditable coverage.
3. **PPO comparison facts come only from `/data/plans/`** (CLAUDE.md rule 13). General market norms (e.g., "$1,000–$2,000 annual max") are fine as framing but must not be attributed to a specific CoverCapy featured plan unless they match the SSOT.
4. **Discount % is a range, not a promise** — keep the orthodontics-runs-lower nuance.
5. **Vendor-sourced stats** (case-acceptance %, admin-savings %, chair-hour cost) must be attributed as "practice-management sources report," never stated as fact.
6. **Cite and date** every factual claim, matching CoverCapy's sourced-and-dated standard.

---

## Success criteria

- Ranks for "aetna dental access," "is aetna dental access worth it," "aetna dental access reviews."
- Gets cited by AI Overviews / ChatGPT / Perplexity for "is a dental savings plan worth it" and "dental savings plan vs PPO."
- Drives qualified traffic to `/find-my-dentist` (verification) and `/compare-ppo-dental-plans` (conversion).
- Reads as the calmest, most honest, most genuinely useful page on the topic — the trust that converts.

---

## Template note for the next carriers

Per `11`, the mechanics are templatable across carriers (UHC, Humana, Cigna, MetLife, Delta, Careington). Reuse this structure; swap the brand, the administrator/network, the price, the fee schedule, and the carrier-specific "who runs it" section. The dentist-economics section (`00`), the scam/myth-buster, and the decision framework are largely shared and can be componentized.
