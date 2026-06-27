# 03 — Title Tags (PPO Plan Pages)

## Current state & audit evidence

Every featured plan page ships a title in the **82–96 character** range. Example:

> `UnitedHealthcare Primary Dental Review 2026: Benefits, Waiting Periods & Limits | CoverCapy` — **95 chars**

Google renders titles at roughly **50–60 characters (~600px)** before truncating with an ellipsis. At 82–96 chars, **all 8 plan titles truncate** in the SERP. The `| CoverCapy` brand token and most of the value modifier (`Waiting Periods & Limits`) are cut, so the snippet the user actually sees stops mid-phrase and loses the brand entirely.

The **hub title is 57 chars** and renders fully — it is already correct and is the model to follow.

**Score: 6.5/10 → Target: 8.5/10**

## Why it matters

- **CTR:** A clean, fully-visible title reads as relevant and trustworthy; a truncated `…Waiting Per` fragment reads as broken and depresses click-through.
- **Front-loading:** Google weights words near the start of the title. `{Carrier} {Plan} Review` must lead so the primary branded keyword survives truncation in any edge case.
- **Branded vs non-branded:** These pages target branded intent (`unitedhealthcare primary dental review`). The carrier + plan name are the keyword and belong first — not the `CoverCapy` brand, which is non-load-bearing for ranking and can drop on long names.
- **Wasted pixels:** Characters past ~60 cost render budget without ranking benefit — stuffing 4 modifiers helps no one when 2 get cut.

## Specific fixes

**1. Length budget:** `≤60 characters / ~575px`. Reserve ~5px of headroom for wide glyphs.

**2. Front-load primary keyword:** `{Carrier} {Plan} Review` always first.

**3. Reusable template (pick by name length):**

- Standard: `{Carrier} {Plan} Review (2026) | CoverCapy`
- Long names (drop brand): `{Carrier} {Plan} Plan Review (2026)`

**4. Pixel nuance:** Char count is a proxy, not truth. `W`/`M`/`m` are wide; `i`/`l`/`t`/`(`/`)`/`|` are narrow. A 60-char title heavy in `W`/`M` can exceed 575px. Validate width, not just length, in a SERP simulator.

**5. Modifier strategy (one modifier, mapped to intent):**
- `Review` → comparison / evaluation intent (default for plan pages)
- `Cost` → price intent (use where the carrier is short enough to add it)
- `Waiting Periods` → reserved for any future deep-dive sub-pages, not the main plan page

### BEFORE → AFTER (all ≤60 chars)

| Page | After | Chars |
|---|---|---|
| UnitedHealthcare Primary Dental | `UnitedHealthcare Primary Dental Review (2026)` | 45 |
| Cigna Dental 1500 | `Cigna Dental 1500 Review (2026) | CoverCapy` | 43 |
| Delta Dental PPO | `Delta Dental PPO Plan Review (2026) | CoverCapy` | 47 |
| Guardian Direct | `Guardian Direct Dental Review (2026) | CoverCapy` | 48 |
| Humana Loyalty Plus | `Humana Loyalty Plus Dental Review (2026) | CoverCapy` | 52 |
| Ameritas PrimeStar | `Ameritas PrimeStar Dental Review (2026) | CoverCapy` | 51 |
| Spirit Dental Network | `Spirit Dental Network Plan Review (2026) | CoverCapy` | 52 |
| MetLife NCD *(noindex)* | `MetLife NCD Dental Review (2026) | CoverCapy` | 44 |
| Hub | `Compare 2026 PPO Dental Plans, Costs & Benefits | CoverCapy` | 57 |

> Long carrier names (`UnitedHealthcare`) drop `| CoverCapy` to stay ≤60. Short ones keep the brand. The hub keeps its existing 57-char title — no change needed.

### Generating from Supabase

Build titles in the SSR/build layer from `ppo_plans` fields so they stay templated and unique:

```
carrier = ppo_plans.carrier_name
plan    = ppo_plans.plan_name
base    = `${carrier} ${plan} Review (2026)`
title   = (charLen(base) + 12 <= 60)   // 12 = " | CoverCapy"
            ? `${base} | CoverCapy`
            : base
```

Keep one source string per page keyed on the plan slug; do not hand-author. This guarantees **uniqueness** (carrier+plan is unique) and prevents boilerplate drift. Add a build-time assertion that fails if any rendered title exceeds 60 chars or duplicates another.

## Implementation notes

- Generate in the build/SSR layer directly from `ppo_plans` — no per-page hardcoding.
- Enforce uniqueness and the ≤60 budget with a build-time check.
- **MetLife NCD is `noindex` (under review)** — fix it for consistency but it is lowest priority since it cannot rank.

## Priority & effort

**Priority: P0.** **Effort: Low** (one template + a generator function in the existing render path).

## Acceptance criteria

- [ ] All 8 plan titles + hub are **≤60 characters**.
- [ ] No title **truncates** in a SERP simulator (validate by **pixel width ≤575px**, not just char count).
- [ ] Every title is **unique** (no duplicate/boilerplate strings).
- [ ] Primary keyword `{Carrier} {Plan} Review` appears **first**.
- [ ] Brand `| CoverCapy` is **last and optional** — dropped only on long carrier names to fit budget.
- [ ] Titles are **generated from `ppo_plans`** in the build/SSR layer, not hardcoded.
- [ ] Build fails if any title exceeds the budget or collides.
