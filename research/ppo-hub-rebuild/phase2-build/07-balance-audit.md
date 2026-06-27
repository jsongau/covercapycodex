# 07 Balance Audit: Plan Feature Balance on the PPO Hub
## Agent: 07-balance-audit | Date: 2026-06-26

---

## Purpose

Count every surface where each plan appears on `dental-insurance/ppo-plans/index.html`, identify over- and under-exposed plans relative to their actual strengths, and produce specific edit instructions for the integration pass.

---

## Section Key

| Code | Section |
|------|---------|
| LR | Left rail scenario nav links |
| HC | Hero chooser answer copy |
| SF | Scenario finder routing (ROUTES object: hero + runner appearances) |
| ST | Plan stories tour stops (the eight stop cards) |
| TB | Comparison table row |
| BF | Best-for grid card |
| RR | Right rail spotlight block |
| IN | In-flow mobile spotlight block |
| FK | FAQ body text (named plan mention) |
| RC | Related carrier cards |
| WP | Waiting periods prose section |
| CN | Carrier cards + related links section |

---

## Raw Surface Count by Plan

### Aetna Dental Direct

| Section | Appearances | Notes |
|---------|-------------|-------|
| LR | 2 | "A crown is coming" links stop-aetna; "Left a job with dental" also links stop-aetna. Two of eight left-rail nav slots point to Aetna. |
| HC | 1 | family chooser answer names Aetna first among family-relevant plans. |
| SF (hero) | 2 | hero for `cobra_gap/any` and `budget` runner-up context (aetna appears as runner in `preventive/any`). Counting only hero slots: cobra_gap/any = 1. Runner in preventive/any = 1. |
| SF (runner) | 1 | runner for `preventive/any`. |
| ST | 1 | Stop 02. |
| TB | 1 | One table row. |
| BF | 1 | "CVS rewards or pharmacy perks" card is dedicated to Aetna. |
| RR | 1 | The permanent CVS Health perk spotlight block in the right rail. |
| IN | 1 | The in-flow CVS spotlight block that renders immediately after stop-aetna in the mobile view. |
| FK | 2 | Named in "best plan for a family" FAQ answer (CVS perk mentioned) and in "best plan for seniors" FAQ (not named). Net: 2 named FAQ appearances. |
| RC | 1 | Carrier card. |
| **Total weighted surfaces** | **~14** | Two LR slots, one dedicated right-rail spotlight (permanent), one dedicated in-flow mobile spotlight, two FAQ mentions, best-for card, two SF routing slots. |

### UnitedHealthcare Primary Dental

| Section | Appearances |
|---------|-------------|
| LR | 1 | "I just need cleanings" |
| HC | 1 | self chooser mentions UHC first. |
| SF (hero) | 2 | hero for `preventive/any` and `budget/any`. |
| SF (runner) | 0 | |
| ST | 1 | Stop 01. |
| TB | 1 | |
| BF | 1 | "Cheapest option" card. |
| RR | 0 | |
| IN | 0 | |
| FK | 1 | Waiting periods prose mentions UHC as "brilliant" for maintenance year. |
| RC | 1 | |
| **Total** | **~9** | |

### Guardian Premier PPO

| Section | Appearances |
|---------|-------------|
| LR | 1 | "Braces for my kid" |
| HC | 1 | self_kids chooser names Guardian first. |
| SF (hero) | 2 | hero for `kids_ortho/planning` and `fam_kids_ortho/any`. |
| SF (runner) | 2 | runner for `major_work/planning` and `fam_cvs/any`. |
| ST | 1 | Stop 04. |
| TB | 1 | |
| BF | 1 | "Kids braces" card. |
| RR | 0 | |
| IN | 0 | |
| FK | 2 | Named in "best for family" and "best for family: worth it?" FAQ answers. |
| RC | 1 | |
| **Total** | **~12** | Strong on routing, no spotlight. |

### Ameritas PrimeStar Care Complete

| Section | Appearances |
|---------|-------------|
| LR | 1 | "Big work, no wait" |
| HC | 0 | |
| SF (hero) | 1 | hero for `major_work/urgent`. |
| SF (runner) | 2 | runner for `implant/urgent` and `senior/any`. |
| ST | 1 | Stop 03. |
| TB | 1 | |
| BF | 1 | "No waiting period" card. |
| RR | 0 | |
| IN | 0 | |
| FK | 1 | Named in "best for seniors" FAQ answer as alternative. |
| RC | 1 | |
| **Total** | **~9** | |

### Humana Extend 5000

| Section | Appearances |
|---------|-------------|
| LR | 1 | "One implant ahead" |
| HC | 0 | family chooser mentions Humana in passing. |
| SF (hero) | 3 | hero for `major_work/soon`, `major_work/planning` (partial: listed as hero for `soon`), and `implant/soon`. |
| SF (runner) | 2 | runner for `fam_implant/any` and... checking: `fam_big_year/any` runner. Net runner appearances: `fam_implant` runner is metlife; `fam_big_year` runner is humana. Runner for `major_work/planning` is guardian. So humana runner: `fam_big_year/any`. And `implant/planning` runner. Net runner slots: 2. |
| ST | 1 | Stop 07. |
| TB | 1 | |
| BF | 1 | "Best for implants" card (linked primary from this card). |
| RR | 0 | |
| IN | 0 | |
| FK | 1 | "Best for family" FAQ mentions Humana for high max. |
| RC | 1 | |
| **Total** | **~12** | Three SF hero slots is strong. |

### MetLife NCD Complete

| Section | Appearances |
|---------|-------------|
| LR | 0 | Not in left rail scenario nav. |
| HC | 0 | |
| SF (hero) | 2 | hero for `implant/urgent` and `implant/planning`. |
| SF (runner) | 0 | |
| ST | 1 | Stop 05. |
| TB | 1 | |
| BF | 0 | Not featured as primary in any best-for card. The implant card links Humana primary, mentions MOO. |
| RR | 0 | |
| IN | 0 | |
| FK | 0 | Not named in FAQ body text. |
| RC | 1 | |
| **Total** | **~6** | Lowest count among plans with true differentiating strengths. No LR slot, no BF card, no FAQ name. |

### Mutual of Omaha Dental Preferred

| Section | Appearances |
|---------|-------------|
| LR | 1 | "Heavy year of work" |
| HC | 0 | |
| SF (hero) | 2 | hero for `senior/any` and `fam_big_year/any`. |
| SF (runner) | 3 | runner for `major_work/urgent`, `major_work/soon`, and `implant/soon`. |
| ST | 1 | Stop 06. |
| TB | 1 | |
| BF | 1 | "Best for seniors" card. |
| RR | 0 | |
| IN | 0 | |
| FK | 2 | Named as standout in "best for seniors" FAQ and mentioned in waiting periods prose as context. |
| RC | 1 | |
| **Total** | **~12** | Solid showing. Three runner slots is strong. |

### Delta Dental PPO Premium

| Section | Appearances |
|---------|-------------|
| LR | 1 | "Largest network" |
| HC | 0 | |
| SF (hero) | 1 | hero for `adult_ortho/planning`. |
| SF (runner) | 2 | runner for `kids_ortho/planning` and `fam_kids_ortho/any`. |
| ST | 1 | Stop 08. |
| TB | 1 | |
| BF | 1 | "Adult braces" card. |
| RR | 0 | |
| IN | 0 | |
| FK | 0 | Not named in FAQ body text. |
| RC | 1 | |
| **Total** | **~8** | Adequate but undersupported given that Delta is the only plan covering adult ortho and has the largest US network. No FAQ mention despite FAQ specifically asking "best for seniors" and "best for family." |

---

## Share of Voice Summary (Current State)

| Plan | Weighted Surface Count | Relative Share |
|------|----------------------|----------------|
| Aetna Dental Direct | ~14 | Over-featured |
| Guardian Premier PPO | ~12 | Fair |
| Humana Extend 5000 | ~12 | Fair |
| Mutual of Omaha | ~12 | Fair |
| UnitedHealthcare | ~9 | Slightly under for the entry-point plan |
| Ameritas PrimeStar | ~9 | Slightly under for a plan with a unique no-wait advantage |
| Delta Dental | ~8 | Under-featured for the network leader + adult ortho play |
| MetLife NCD Complete | ~6 | Most under-featured; the $10,000 ceiling is a major differentiator |

---

## Where Aetna Is Over-Featured

1. **Two left-rail scenario nav slots pointing to the same stop** (lines 363 and 366). "A crown is coming" points to `#stop-aetna`, which is misleading because Aetna does not cover implants and has a 12-month major wait that requires a prior-coverage waiver to eliminate. The crown-coming scenario should route to Ameritas or MOO, not Aetna.

2. **Permanent right-rail CVS spotlight** (lines 1031-1036). The right rail is visible on every scroll position. The CVS block is hardcoded and static. It fires for every visitor regardless of their expressed interest. This gives Aetna a permanent right-rail billboard while all other plans have zero right-rail representation.

3. **Dedicated in-flow mobile spotlight immediately after stop-aetna** (lines 598-606). This is a second Aetna-specific block that appears in the center column on mobile, meaning mobile users see two Aetna promotions in sequence.

4. **SSOT citation for Aetna's actual unique strength**: `aetna-dental-direct.md` lists the prior-coverage waiver and CVS ExtraCare Plus as the plan's primary differentiators. Both are narrow: the waiver serves job-changers specifically, and the CVS perk is excluded in nine states. Neither justifies two left-rail slots, a permanent right-rail block, and an in-flow mobile block. SSOT field: `do_not` in aetna-dental-direct.md confirms the perk is not offered in nine states and must not be presented as universal. A permanent, top-of-rail spotlight violates the spirit of that flag.

---

## Where Plans Are Under-Featured vs. Their Strengths

### MetLife NCD Complete (most under-featured)
- **Primary strength** (SSOT `metlife-ncd-complete.md`): $10,000 annual maximum (highest on shelf), no waiting periods, one-time $100 lifetime deductible, $3,000/yr implant cap within the annual max, graduated major coverage rewarding multi-year plans.
- **Missing surfaces**: No left-rail scenario slot. No best-for grid card dedicated to MetLife. Not named in any FAQ answer body text.
- **Problem**: The $10,000 ceiling is the only plan on the shelf that can absorb a multi-procedure year without a cap problem. That is a search-intent magnet ("highest dental insurance maximum") with zero FAQ or best-for representation.

### Delta Dental PPO Premium (under-featured for network + adult ortho)
- **Primary strength** (SSOT `delta-dental-ppo-premium.md`): Largest PPO network in the country (Delta Dental), one of the few individual plans covering adult orthodontics (50%, $1,500 lifetime), strong name recognition.
- **Missing surfaces**: Not named in any FAQ answer body text despite "best for family" and "best for adult braces" FAQs existing. Only one SF hero slot (adult ortho, planning timing) and two runner slots.
- **Problem**: Delta's network advantage is the reason many people trust it by name. Not naming it in the FAQ body on "what is the largest dental network" or "best plan for Invisalign" is a missed SERP signal.

### Ameritas PrimeStar (under-featured for the no-wait angle)
- **Primary strength** (SSOT `ameritas-primestar.md`): No waiting period on any category including implants from day one, benefits grow annually ($2,000 to $3,500 max, 20% to 50% major, $1,000 to $1,500 implant). Age-neutral pricing.
- **Missing surfaces**: Not in hero chooser copy. Only one SF hero slot (major_work/urgent). Not named in the "no waiting period" FAQ answer despite that FAQ existing and Ameritas being the lead recommendation in the best-for card for "no waiting period."
- **Problem**: The scenario finder routes `major_work/urgent` to Ameritas but `implant/urgent` goes to MetLife instead. A user with an urgent implant need might be better served by Ameritas day-one implant access (at 20%) than MetLife's 10% year-one major rate. The routing undervalues Ameritas.

### UnitedHealthcare Primary Dental (minor under-featuring)
- **Primary strength** (SSOT `uhc-primary-dental.md`): Fastest activation (next business day), lowest premium (~$30/mo), 100% preventive day-one.
- **Missing surface**: The left rail scenario "I just need cleanings" is the right link, but there is no "fastest activation" angle surfaced anywhere as a standalone spotlight. A visitor searching "dental insurance that starts immediately" would benefit from a named strength block.

---

## Target Share of Voice (Rebalanced)

Total weighted surface budget: maintain ~85-90 surfaces across all plans for the 8-plan shelf.

| Plan | Current | Target | Delta |
|------|---------|--------|-------|
| Aetna Dental Direct | ~14 | ~9 | -5 |
| Guardian Premier PPO | ~12 | ~11 | -1 |
| Humana Extend 5000 | ~12 | ~11 | -1 |
| Mutual of Omaha | ~12 | ~11 | -1 |
| UnitedHealthcare | ~9 | ~10 | +1 |
| Ameritas PrimeStar | ~9 | ~11 | +2 |
| Delta Dental | ~8 | ~10 | +2 |
| MetLife NCD Complete | ~6 | ~11 | +5 |

---

## Plan Strength Matrix

| Plan | Primary Strength | SSOT Field | Scenarios/Sections to Feature It |
|------|----------------|-----------|----------------------------------|
| UHC Primary Dental | Fastest activation, lowest cost, day-one preventive | `activation: next_business_day`, `premium_est: ~30/mo` | LR "I need coverage fast" slot; hero chooser self answer first; SF hero preventive + budget |
| Aetna Dental Direct | Prior-coverage waiver (job changers); CVS perk | `prior_coverage_waiver: 90_days`, `cvs_extra_care_plus: true` | One LR slot (cobra_gap); SF hero cobra_gap; one contextual spotlight (not permanent); BF CVS card |
| Ameritas PrimeStar | No-wait on all categories including implants day-one; growing benefits | `waiting_preventive: 0`, `waiting_basic: 0`, `waiting_major: 0`, `major_yr1: 20pct_rising_to_50` | LR "Big work, no wait" + add "No wait, immediate"; SF hero major_work/urgent AND implant/urgent (add); BF "no waits" card; add to "no waiting period" FAQ answer as primary citation |
| Guardian Premier PPO | Only plan with dependent ortho; highest day-one basic (85%) | `dependent_ortho: true`, `basic_day1: 85pct` | LR "Braces for my kid"; SF hero kids_ortho/planning + fam_kids_ortho; BF kids braces card; FAQ family answer |
| MetLife NCD Complete | Highest annual max ($10,000); no wait; graduated major good for multi-year plans | `annual_max: 10000`, `waiting_major: 0_graduated`, `implant_cap_per_yr: 3000` | Add LR "Heavy work, high ceiling" slot; add BF "Highest annual maximum" card; name in FAQ "best for family" if heavy work; add to "no waiting period" FAQ (with graduated caveat) |
| Mutual of Omaha | Senior-optimized: no wait major, community-rated, $5,000 max, $3,000 lifetime implant | `community_rated: true`, `annual_max: 5000_selectable`, `implant_lifetime: 3000` | LR "Heavy year of work" + "Seniors / turning 65"; SF hero senior + fam_big_year; BF seniors card; FAQ seniors answer primary |
| Humana Extend 5000 | Fastest covered implant path (6-month wait, half industry standard); dental+vision+hearing bundle | `implant_wait: 6_months`, `bundle: dental_vision_hearing` | LR "One implant ahead"; SF hero major_work/soon + implant/soon; BF implants card primary; FAQ implant answer |
| Delta Dental PPO | Largest PPO network; adult + child ortho; name recognition | `network: delta_dental_ppo_largest_us`, `adult_ortho: true`, `availability: 16_states_dc` | LR "Largest network"; SF hero adult_ortho; BF adult braces card; add to FAQ "largest dental network" mention; add to FAQ "best for family" (network angle); add network fact to waiting periods prose |

---

## Specific Edits: What to Demote from Aetna

### 1. Remove one of the two left-rail slots pointing to Aetna (line 366)
Current: `<a href="#stop-aetna" data-plan="aetna-dental-direct">Left a job with dental</a>`
This slot is legitimate for cobra_gap. Keep it. But the slot at line 363:
Current: `<a href="#stop-aetna" data-plan="aetna-dental-direct">A crown is coming</a>`
A visitor with a crown coming is better served by Ameritas or MOO. Change this slot to point to `#stop-ameritas` or `#stop-moo` and relabel to "No wait on major work" linking to Ameritas, or add a MetLife slot for "Highest ceiling."

Proposed replacement:
- Replace "A crown is coming" pointing to Aetna with "No wait, any work" pointing to `#stop-ameritas` (data-plan="ameritas-primestar").
- This leaves Aetna with one LR slot ("Left a job with dental"), which matches its actual unique strength.

### 2. Replace the permanent right-rail CVS spotlight with a rotating plan strength block
Current lines 1031-1036: hardcoded Aetna/CVS spotlight in the right rail, always visible.
Demote: this block should only activate when a user's IntersectionObserver fires on `#stop-aetna`, or when the scenario finder routes to Aetna. When no plan is in context, display a neutral "Step 2: verify your dentist" block instead (which already exists above it and is better).
Implementation note for agent 06 (plan-strength-spotlights): the right-rail slot should swap its content based on IntersectionObserver and scenario selection. The Aetna CVS block becomes one of eight rotating content blocks, not the default.

### 3. Remove the in-flow mobile CVS spotlight block (lines 598-606)
The block is embedded in the center column immediately after `#stop-aetna`. On mobile this creates two consecutive Aetna promotions: the stop-aetna card itself, then the CVS in-flow block. Remove this in-flow block. The mobile experience should use the rotating spotlight mechanism from agent 06 instead, which will show the Aetna CVS block when the user is scrolled near stop-aetna.

### 4. Keep Aetna's best-for card ("CVS rewards / pharmacy perks")
This card (lines 900-905) is fair and accurate. It is narrow and specific. Keep it. The card correctly names the perk and links to the full Aetna review. No change needed.

### 5. Keep Aetna's cobra_gap SF routing
`cobra_gap/any -> hero: aetna-dental-direct` is correct and should remain. The prior-coverage waiver is Aetna's most important and unique functional advantage. This is the one scenario where Aetna is genuinely the right pick over all others.

---

## Specific Edits: What to Elevate

### MetLife NCD Complete

**Add a left-rail scenario slot:**
Add to the `rl-nav` block:
`<a href="#stop-metlife" data-plan="metlife-ncd-complete">Heavy work, high ceiling</a>`
This gives MetLife its first LR slot and addresses the visitor who knows they have a lot of work coming.

**Add a best-for grid card:**
Insert a new `bf-card` for MetLife in the best-for grid:
- Header: "Which dental insurance has the highest annual maximum?"
- Copy: "MetLife NCD Complete carries the highest ceiling on this shelf at $10,000, with no waiting periods and a one-time $100 lifetime deductible. Major coverage is graduated, so time large procedures for year two or three when it pays 50% to 60%."
- Link: `/dental-insurance/ppo-plans/metlife-ncd-complete/`

**Add to FAQ body text:**
In "Is dental insurance worth buying in 2026?" (line 970), add a mention that MetLife's $10,000 ceiling significantly reduces risk on multi-procedure years, citing it by name.

In "Which PPO dental plan is best for a family in 2026?" (line 967), add MetLife as the ceiling pick when multiple adults face major work.

### Ameritas PrimeStar

**Change `implant/urgent` routing from MetLife to Ameritas:**
Current: `implant/urgent -> hero: metlife-ncd-complete`
MetLife pays only 10% on major in year one; for urgent implant needs that is nearly nothing. Ameritas pays 20% day one with no wait, which is better for urgent access even though it is lower than MetLife year-two 50%.
Change to: `implant/urgent -> hero: ameritas-primestar, runner: mutual-of-omaha-dental`
SSOT basis: `ameritas-primestar.md` confirms no waiting period on implants from day one.

**Add Ameritas to FAQ "no waiting period" answer:**
In "What is a dental insurance waiting period and how can I avoid one?" (line 965), Ameritas is not named in the body text despite being the primary BF card for "no waiting periods." Add: "Ameritas PrimeStar Care Complete covers every service category from day one, including implants, with no waiting period of any kind."

**Add an Ameritas mention to the hero chooser `self` answer:**
Current: "preventive only starts with UHC or Aetna; major work coming points to Ameritas or Mutual of Omaha"
This is actually fine. Keep as is.

### Delta Dental PPO Premium

**Add Delta to FAQ answers:**
In "What is the best PPO dental plan for a family in 2026?" (line 967): Add Delta as the network choice when the family's dentist already takes Delta ("if your dentist already accepts Delta, it is the only plan covering both adult and child orthodontics on one policy").

In "Which dental insurance is best for seniors over 65?" (line 969): Delta is not a natural fit here; do not force it.

Add a new FAQ question if agent 09 (schema) and 10 (SERP) agree: "Which dental insurance has the largest network?" with Delta as the primary answer. This is a high-volume search query and has no dedicated FAQ answer currently.

**Add Delta to the waiting periods prose:**
The waiting periods section (lines 927-931) names UHC, Humana, Aetna, Guardian, and Delta by reference but not explicitly. Explicitly name Delta's 12-month ortho wait and acknowledge it as the correct trade-off for adult ortho coverage, since that is the only plan offering it. This benefits the visitor planning for adult braces.

### UnitedHealthcare Primary Dental

**Add "fastest activation" language to SF hero story for preventive:**
Current PLANS object story for UHC: "The least expensive plan on this shelf: about $30 a month with 100% preventive from day one and no major work waiting period to worry about, because major work is not covered on this tier."
The story does not mention next-business-day activation speed, which is the UHC SSOT's most differentiated claim.
Add: "Member ID arrives by email and coverage activates the next business day after enrollment, the fastest on-ramp on this shelf."
SSOT field: `activation: next_business_day` from `uhc-primary-dental.md`.

---

## Scenario Finder Routing Rebalanced

| Situation | Timing | Current Hero | Current Runner | Proposed Hero | Proposed Runner | Rationale |
|-----------|--------|-------------|----------------|---------------|-----------------|-----------|
| preventive | any | uhc | aetna | uhc | aetna | No change. |
| major_work | urgent | ameritas | moo | ameritas | moo | No change. |
| major_work | soon | humana | moo | humana | moo | No change. |
| major_work | planning | humana | guardian | metlife | humana | MetLife's $10K ceiling is the right pick for planned major work over time; humana as runner. |
| implant | urgent | metlife | ameritas | ameritas | moo | MetLife year-one major = 10%; Ameritas day-one at 20% with no wait is better for urgency. |
| implant | soon | humana | moo | humana | moo | No change. |
| implant | planning | metlife | humana | metlife | humana | No change. MetLife $3K/yr implant cap + $10K ceiling is strongest for planned implant. |
| kids_ortho | urgent | warning | -- | warning | -- | No change. |
| kids_ortho | soon | warning | -- | warning | -- | No change. |
| kids_ortho | planning | guardian | delta | guardian | delta | No change. |
| adult_ortho | urgent | warning | -- | warning | -- | No change. |
| adult_ortho | soon | warning | -- | warning | -- | No change. |
| adult_ortho | planning | delta | null | delta | null | No change. |
| cobra_gap | any | aetna | uhc | aetna | uhc | No change. Aetna waiver is the correct answer here. |
| senior | any | moo | ameritas | moo | ameritas | No change. |
| budget | any | uhc | aetna | uhc | aetna | No change. |
| fam_kids_ortho | any | guardian | delta | guardian | delta | No change. |
| fam_implant | any | metlife | humana | humana | metlife | For families with one adult implant, Humana's 6-month path is more actionable; MetLife as runner for ceiling. |
| fam_big_year | any | moo | humana | metlife | humana | MetLife $10K ceiling handles two adults' big work; humana as runner. |
| fam_cvs | any | aetna | guardian | aetna | guardian | No change. Aetna CVS perk is correct for CVS family. |

---

## Left Rail Scenario Nav Rebalanced (8 slots for 8 plans)

Current 8 slots: UHC, Aetna (crown), Ameritas, Guardian, Aetna (cobra), Humana, MOO, Delta.
Two slots link Aetna; MetLife has zero slots.

Proposed 8 slots (one plan each):
1. "I just need cleanings" -> UHC (keep)
2. "No wait on any work" -> Ameritas (replace "A crown is coming" -> Aetna)
3. "Braces for my kid" -> Guardian (keep)
4. "Left a job with dental" -> Aetna (keep; this is Aetna's correct scenario)
5. "One implant ahead" -> Humana (keep)
6. "Seniors / turning 65" -> MOO (rename from "Heavy year of work" to match MOO's #1 strength)
7. "Heavy work, high ceiling" -> MetLife (new slot, replaces the removed Aetna duplicate)
8. "Largest network" -> Delta (keep)

This gives every plan exactly one left-rail scenario entry, matched to its primary SSOT strength.

---

## Best-For Grid Rebalanced (9 cards: 8 plans + 1 family note anchor)

Current 8 cards:
1. Kids braces (Guardian)
2. Adult braces (Delta)
3. Seniors (MOO)
4. No waiting period (Ameritas)
5. Dental implants (Humana primary, MOO secondary)
6. CVS rewards (Aetna)
7. Family (Guardian, Aetna, Humana, MOO mixed)
8. Cheapest (UHC)

MetLife has zero dedicated cards. The $10,000 ceiling is the highest-search-volume differentiator with no dedicated card.

Proposed addition:
Add card 9 (or replace the generic "family" card which links to a family note not a plan):
- "Which plan has the highest annual maximum?" -> MetLife NCD Complete
- Copy: "MetLife NCD Complete sets the shelf ceiling at $10,000 with no waiting periods and a one-time $100 lifetime deductible. Major coverage is graduated, starting low in year one and reaching 50% to 60% by year three. Best for adults managing a multi-year treatment plan."
- Link: `/dental-insurance/ppo-plans/metlife-ncd-complete/`

---

## FAQ Balance Check

| FAQ Question | Plans Named in Body |
|-------------|---------------------|
| What is PPO dental insurance? | None specific |
| PPO vs HMO? | None specific |
| What does PPO cover? | None specific |
| How much does it cost? | None (range only) |
| Can you use without referral? | None specific |
| Waiting periods and how to avoid? | None specific (should name Ameritas) |
| In-network vs out-of-network? | None specific |
| Best for family 2026? | Guardian, Aetna, Humana, MOO. MetLife and Delta missing. |
| Is dental insurance worth it for a family? | Guardian, MOO. Ameritas missing. |
| Best for seniors over 65? | MOO primary, Ameritas secondary. Good. |
| Is dental insurance worth buying 2026? | None specific. MetLife should appear. |

Edits needed:
- "Waiting periods" FAQ: name Ameritas as the no-wait plan.
- "Best for family" FAQ: add MetLife for high-ceiling multi-adult situations; add Delta for network / adult braces.
- "Worth buying 2026" FAQ: mention MetLife's $10K ceiling as the risk-reduction ceiling play.

---

## Summary of Integration-Pass Edit Instructions

| Priority | Action | Section | Plan Affected |
|----------|--------|---------|---------------|
| P1 | Remove duplicate Aetna LR slot; add MetLife LR slot | Left rail nav | Aetna (-1), MetLife (+1) |
| P1 | Convert permanent right-rail CVS spotlight to rotating contextual block | Right rail | Aetna (-permanent) |
| P1 | Remove in-flow mobile CVS spotlight block | In-flow | Aetna (-1 dedicated block) |
| P1 | Add MetLife best-for grid card ("highest annual maximum") | Best-for grid | MetLife (+1 card) |
| P1 | Change `implant/urgent` routing from MetLife to Ameritas | SF routing | MetLife (-1 hero), Ameritas (+1 hero) |
| P1 | Change `major_work/planning` routing from Humana to MetLife | SF routing | MetLife (+1 hero), Humana (-1 hero, becomes runner) |
| P1 | Change `fam_big_year/any` routing from MOO to MetLife | SF routing | MetLife (+1 hero), MOO (becomes runner) |
| P2 | Add Ameritas to "waiting periods" FAQ body text by name | FAQ | Ameritas (+1) |
| P2 | Add MetLife to "best for family" and "worth buying" FAQ body text | FAQ | MetLife (+2) |
| P2 | Add Delta to "best for family" FAQ body text (network + adult ortho angle) | FAQ | Delta (+1) |
| P2 | Add "fastest activation" language to UHC SF story from SSOT | SF PLANS object | UHC (strength clarity) |
| P2 | Rename MOO LR slot to "Seniors / turning 65" from "Heavy year of work" | Left rail | MOO (strength clarity) |
| P3 | Add proposed "largest network" FAQ question with Delta as primary answer | FAQ | Delta (+1 dedicated question) |
| P3 | Add Delta mention to waiting periods prose for adult ortho planning context | Waiting periods prose | Delta (+1) |

---

## SSOT Strength Reference for Integration Pass

| Plan | Key Differentiator Fields (SSOT) |
|------|----------------------------------|
| UHC | activation: next_business_day; premium_est: ~30/mo; no major coverage |
| Aetna | prior_coverage_waiver: 90_days; cvs_extra_care_plus; do_not: 9-state perk exclusion |
| Ameritas | waiting_any_category: none; major_yr1: 20pct; max_grows: $2000-$3500; age_neutral |
| Guardian | dependent_ortho: child_only; basic_day1: 85pct; implant_lifetime_cap: 1250 |
| MetLife | annual_max: 10000; waiting: none_graduated; major_yr1: 10pct; implant_per_yr: 3000 |
| MOO | community_rated: true; annual_max: 5000_selectable; implant_lifetime: 3000; no_wait_major |
| Humana | implant_wait: 6_months; annual_max: 5000; bundle: dental_vision_hearing; missing_tooth_clause |
| Delta | network: largest_us_ppo; adult_ortho: true; availability: 16_states_dc; annual_max: 2000 |
