# SEO Improvement 04 — Meta Descriptions (PPO Plan Pages)

**Scope:** 8 featured PPO plan pages + the PPO hub
**Priority:** P0 · **Effort:** Low · **Score:** 5.5/10 → target **8.5/10**

---

## Current state & audit evidence

All 8 plan-page meta descriptions and the hub run **205–262 characters**. Google
renders only **~155–160 characters** in the SERP, so **every page truncates** with
an ellipsis. The content that survives is the plan name and a benefit phrase; the
content that gets **cut is the call-to-action** — exactly the "We verify your exact
plan free" cue that drives our primary conversion (free eligibility verification).

The descriptions are otherwise **unique and compelling** — wording is genuinely
differentiated per carrier, not boilerplate. The defect is purely length: we are
burning our best clickable asset (the action cue) past the visible cutoff.

**Score rationale (5.5):** uniqueness and relevance are strong (+), but 100% of
pages truncate and lose the CTA (−), which is the single highest-leverage fix in
the on-page set.

---

## Why it matters

- Meta description is **not a direct ranking factor**, but it is the primary lever
  on **organic CTR**. A truncated, CTA-less snippet leaves clicks on the table for
  queries we already rank for.
- For **branded review/benefits/waiting-period queries**, searchers scan snippets
  for the specific spec they came for. A snippet that surfaces the *right* spec in
  the first ~120 chars wins the click over generic carrier copy.
- **AI Overviews / SERP snippet generation** increasingly lift a clean, factual,
  self-contained sentence. A tight 150–160 char description authored as a complete
  thought is more quotable than a run-on that depends on its truncated tail.

---

## Specific fixes

### 1. Character budget
Author every description to **150–160 characters** (hard ceiling 160). Front-load
the keyword and the differentiating spec in the **first ~120 chars** so meaning
survives even aggressive truncation.

### 2. The formula
> **[Carrier] [Plan] [intent keyword]** + **2–3 specs that matter for *this* plan**
> + **trust/action cue** ("We verify your exact plan free.")

Specs are plan-specific (the 1–2 things searchers actually compare): waiting period,
annual max, preventive coverage, ortho, "from $X/mo" framing. Pick the specs that
are this plan's selling point or most-asked question — not a fixed list.

### 3. Compliance guardrails (apply to every line)
- No "guaranteed coverage" / "guaranteed acceptance."
- Prices are **"from $X/mo"** or "illustrative" — never a hard national rate.
- Coverage figures are framed as plan terms to **verify**, not promises ("We verify
  your exact plan free" does the compliance *and* CTA work in one phrase).
- Reinforce **independent marketplace** positioning where space allows.

### 4. BEFORE → AFTER rewrites

> Replace bracketed tokens with live `ppo_plans` values. Each AFTER line is ~150
> chars; swap specifics to match real data before publishing.

**Hub — PPO dental plans**
- BEFORE *(truncates):* "Compare top PPO dental insurance plans side by side. See benefits, waiting periods, annual maximums, monthly costs and network details across leading carriers, then…"
- AFTER (151): `Compare top PPO dental plans side by side — benefits, waiting periods & annual maximums from leading carriers. We verify your exact plan free.`

**1. Delta Dental PPO**
- AFTER (154): `Delta Dental PPO review 2026: preventive at 100%, [waiting period], [$annual max] max, from $[X]/mo. Independent comparison — we verify your exact plan free.`

**2. Cigna Dental PPO**
- AFTER (152): `Cigna Dental PPO 2026 benefits: [waiting period] wait, [$annual max] annual max, ortho [yes/no], from $[X]/mo. We verify your exact plan free.`

**3. MetLife PPO**
- AFTER (150): `MetLife dental PPO 2026: preventive 100%, [waiting period], [$annual max] max, from $[X]/mo. Independent review — we verify your exact plan free.`

**4. Aetna Dental PPO**
- AFTER (153): `Aetna Dental PPO 2026 review: [waiting period] wait, [$annual max] max, [major %] on major work, from $[X]/mo. We verify your exact plan free.`

**5. Guardian Dental PPO**
- AFTER (155): `Guardian Dental PPO 2026: ortho [coverage], [$annual max] annual max, [waiting period], from $[X]/mo. Compare independently — we verify your plan free.`

**6. United Concordia PPO**
- AFTER (151): `United Concordia dental PPO 2026 benefits: [waiting period], [$annual max] max, preventive 100%, from $[X]/mo. We verify your exact plan free.`

**7. Humana Dental PPO**
- AFTER (152): `Humana Dental PPO 2026 review: [waiting period] wait, [$annual max] max, no-wait preventive, from $[X]/mo. Independent — we verify your plan free.`

**8. Ameritas Dental PPO**
- AFTER (154): `Ameritas Dental PPO 2026: [$annual max] annual max, [waiting period], implants [yes/no], from $[X]/mo. Compare independently — we verify your plan free.`

### 5. Template from Supabase
Generate at SSR/build from `ppo_plans` with a length guard:

```
`${carrier} ${plan_name} ${year} review: ${spec1}, ${spec2}, from $${price_from}/mo.
 We verify your exact plan free.`  // truncate-safe, ≤160 chars enforced
```

Choose `spec1/spec2` per row by priority order
(`waiting_period` → `annual_max` → `preventive_pct` → `ortho` → `price_from`),
emitting only non-null fields until the 160-char budget is hit. Always append the
fixed action cue last and **assert final length ≤ 160** at build time.

### 6. Uniqueness
Because specs and price differ per row, no two descriptions collide. Add a build
check that fails if any two generated descriptions are identical.

### 7. Author vs. auto-generate
**Author** all 8 plan pages and the hub (high-intent, conversion pages — control the
CTA). Let **Google auto-generate** only for low-value/utility pages outside this set.
Never leave a high-intent plan page to auto-generation.

---

## Implementation notes
- Generate descriptions in **SSR/build** straight from `ppo_plans`; do not hand-edit
  HTML per page (drift risk).
- Enforce the **160-char ceiling** and the **uniqueness** check in the build step.
- **MetLife page is `noindex`** — lower priority; still author for consistency and in
  case indexing is enabled later, but ship the indexed pages first.
- Keep the action cue string in one constant so compliance can update it globally.

---

## Acceptance criteria
- [ ] Every plan page + hub description is **≤ 160 characters** (no SERP truncation).
- [ ] Each is **unique** (build-time duplicate check passes).
- [ ] Each contains **primary keyword + 2–3 plan-specific specs + action cue** in the first ~120 chars.
- [ ] **Compliant:** no "guaranteed coverage"; prices use **"from $X"/illustrative**; figures framed as terms to verify.
- [ ] Action cue ("We verify your exact plan free.") is **fully visible**, not cut.
- [ ] Generated from `ppo_plans` at SSR/build with the **≤160 length assertion** in place.
