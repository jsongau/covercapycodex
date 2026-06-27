# 09 — UX and Interactive Elements

Interactive experiences turn a static explainer into a tool people return to and link to (a GEO and backlink asset). Each element below maps to a real decision the reader is trying to make. All should honor the CoverCapy design system (Fraunces headlines, Inter Tight body, teal/mint/cream tokens — no gradients, no glassmorphism, no em-dashes in copy).

---

## 1. Savings calculator (the hero interactive)

**Purpose:** convert the abstract "save 15–50%" into the reader's own dollars.

**Inputs:** pick the procedures you expect this year (crown, root canal, implant, cleaning ×N, filling, extraction, braces, veneers, whitening). Optionally enter your ZIP for a "fees vary by area" disclaimer.

**Output:** three-column result —
1. Full price (no plan)
2. With Aetna Dental Access (using the sample fee schedule from `03`)
3. Net savings after the ~$175 membership fee

**Honesty rules baked in:** label outputs "estimated — actual fees vary by dentist and ZIP," use the real sample fee schedule, and show the membership fee as a line item so net savings are honest. For preventive-only selections, surface a gentle "a PPO that covers cleanings at 100% may save you more — compare PPO plans" nudge. *This is the trust move competitors won't make.*

**Conversion tie-in:** result card ends with "Verify a dentist near you accepts this →" (`/find-my-dentist`) and "Prefer insurance? Compare PPO plans →" (`/compare-ppo-dental-plans`).

---

## 2. "Savings plan vs PPO" decision tree / quiz

**Purpose:** route each reader to the honest answer using the logic in `07`.

**Flow (3–5 questions):**
1. Do you need a specific procedure soon, or mostly routine care?
2. If a procedure — which? (crown / implant / root canal / braces / cosmetic / dentures)
3. Do you currently have dental insurance? (yes-active / yes-maxed-out / no / just lost it)
4. Do you have a dentist you want to keep seeing?

**Outcomes** (each a confident, plain-language verdict + next step):
- "A savings plan likely fits — here's why, and let's confirm your dentist takes it."
- "A PPO likely fits you better — compare CoverCapy's plans."
- "Both could help — here's how to stack them."
- Always ends at a CoverCapy tool, never a dead end.

---

## 3. Before/after cost comparison slider

**Purpose:** a single dramatic, screenshot-able visual.

A horizontal slider or toggle that flips one procedure between "without plan" and "with plan" — e.g., a crown sliding from **$1,500 → $949**. Animate the number. This is the kind of element that gets embedded and cited.

---

## 4. Treatment-cost estimator (procedure picker)

**Purpose:** answer "what would *my* crown/implant cost?"

A searchable list of common procedures with the sample fee schedule. Pick a procedure → see full vs discounted price and the dollar saving, with the "fees vary" disclaimer. Doubles as a glossary surface (hover a procedure name for a plain definition — feeds the DefinedTermSet schema).

---

## 5. Family savings calculator

**Purpose:** show the no-annual-cap advantage across a household.

Add family members and their expected needs (kids' cleanings, one child's braces, a parent's crown). Output shows total household savings with no cap, contrasted against a capped PPO's annual/lifetime maximums. Especially powerful for the ortho-across-siblings case.

---

## 6. Coverage timeline visualization

**Purpose:** make "no waiting period" viscerally clear.

Two parallel timelines: a new PPO (preventive now, basic at ~6 months, major at ~12 months) vs Aetna Dental Access (everything available in ~1–4 days). The visual gap *is* the argument.

---

## 7. "Does my dentist accept it?" verification integration (the CoverCapy moat)

**Purpose:** solve the category's #1 friction and #1 abandonment trigger directly on the page.

Inline search box → "Check if a dentist near you accepts Aetna Dental Access" → routes into `/find-my-dentist`. Competitors send people to a generic self-serve lookup and wish them luck; CoverCapy turns verification into a guided, concierge step. This is the highest-converting and most defensible interaction on the page — it should appear at least twice (mid-page and near the CTA).

---

## 8. "Is it a scam?" myth-buster module

**Purpose:** capture the high-volume trust queries and disarm fear.

A short expandable set: "It's not insurance — here's what it actually is," "Why the discount is real (and how dentists still profit)," "What the complaints are really about (billing/renewal)," "How to avoid the common mistakes." Pulls directly from `00-dentist-economics.md` and `06-pros-cons.md`. Honest, calm, citation-friendly.

---

## Interaction design principles

- **Every interactive ends in a route,** not a dead end — verify a dentist, compare PPO plans, or read the honest verdict.
- **Show the membership fee** in every savings calculation so net numbers are trustworthy.
- **Always disclaim** "estimated, varies by dentist and ZIP" on fee outputs.
- **No dark patterns** — no countdown timers, no fake scarcity, no pre-checked upsells. Calm, concierge, premium.
- **Mobile-first:** sliders and pickers must work cleanly on touch; the savings calculator is the priority element to perfect on small screens.
- **Performance:** keep interactives self-contained (no heavy frameworks) so the page stays fast — speed is both a ranking and a luxury-feel signal.

---

## Build priority (if shipping in phases)

1. Savings calculator (hero) + dentist verification box — these carry the page.
2. Decision tree / quiz.
3. Before/after slider + coverage timeline (visual, shareable).
4. Family calculator + treatment estimator + myth-buster (depth and authority).
