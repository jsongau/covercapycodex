# 11 -- Interaction Widgets Spec: PPO Plans Hub
## CoverCapy PPO Hub Rebuild | Research Program
**Spec:** 11 of 20
**Status:** Draft -- June 26, 2026
**Dependencies:** Specs 06, 08, 09, 10 (all read before writing this file)
**Rule:** No em-dashes. All plan facts trace to SSOT field citations. No heavy calculators. Light computation only. Member IDs never stored or referenced.

---

## Overview

This spec defines five interactive widgets for the `/dental-insurance/ppo-plans/` hub. Each widget is built from the design system already live on the Aetna Dental Direct page (`id="oral-care"`, `.chip`, `.btn`, `.card`, `.cvsx-tile` patterns) and the hub's Fraunces + Inter Tight typographic system. All widgets degrade gracefully without JavaScript. No widget stores personal health data. No widget accepts, displays, or processes member IDs.

The two most important widgets -- the scenario finder (Widget 2) and the family builder (Widget 3) -- include full skeleton HTML + CSS + JS structures at the end of this spec.

---

## Design System Reference (carry from Aetna page verbatim)

CSS variables in use across all widgets:

```css
--bg: #F6F8FA
--surface: #FFFFFF
--surface-2: #F1F5F8
--ink: #0F1B25
--ink-2: #33444F
--ink-3: #5E707B
--ink-faint: #94A4AE
--line: #DCE4EA
--teal: #0E8C8B
--teal-strong: #0A6E6D
--teal-ink: #075453
--teal-tint: #E2F4F3
--teal-deep: #0B3B40
--covered: #0F9D6E
--covered-tint: #E4F6EE
--partial: #B26A00
--partial-tint: #FBEFD9
--warning: #C2410C
--warning-tint: #FCEBE2
--r-sm: 10px
--r-md: 14px
--r-pill: 999px
```

Typography:
- Section labels and `.eyebrow`: Inter, 11.5px, 600 weight, 0.07em letter-spacing, uppercase
- Plan names and H2 section titles: Fraunces serif, weight 500 (hub version only)
- UI labels, body, chip text: Inter Tight / Inter

Component patterns reused verbatim:
- `.card` -- white surface, `--line` border, `--r-md` radius, `--sh-1` shadow
- `.btn .btn-pri` -- teal background, white text, `--r-sm` radius, 48px min-height
- `.btn .btn-out` -- outlined variant
- `.chip .chip.brand` -- teal-tint background, `--teal-ink` color
- `.chip .chip.warn` -- `--warning-tint` background for caveat chips
- `.cvsx-tile[aria-pressed]` -- selected state pattern from oral-care section: `--teal-tint` background, `--teal-strong` border, checkmark reveal

All aria and focus patterns follow the Aetna page: `:focus-visible` outline 2px solid `--teal`, `role="radiogroup"` / `role="radio"` / `aria-checked` for chooser groups, `aria-live="polite"` on all answer blocks.

---

## Widget 1 -- "Who Needs Coverage?" Chooser

### Purpose
First-screen entry. Converts a confused visitor into a typed buyer in one click before they read a single plan card. Sets household context that persists into the scenario finder (Widget 2). Mirrors the `.picker` pattern already in the hub but elevated: four radio-style pill buttons in a horizontal row, with a brief contextual answer block appearing below on selection.

### Placement
Inside the page hero, below the H1 and lede, above the primary CTA row. Section: `#coverage-chooser`.

### UI States

**State 0: Default (no selection)**
Four pill buttons in a horizontal row, wrapping on narrow viewports to a 2x2 grid:
```
[ Just me ]   [ Me + kids ]   [ Me + spouse ]   [ Whole family ]
```
Each button: `--surface` background, `--line` border, `--ink-2` text, `--r-pill` radius, 44px height, 14px font-weight 600.
No answer block visible.

**State 1: Button selected**
Active button: `--teal-deep` background, white text, border removed. `aria-checked="true"` applied.
Answer block animates in below the row (`max-height` transition, `opacity` 0 to 1, 200ms ease).

Answer block per selection (sourced from spec 10 Section 5 -- verify plan facts against SSOT before build):

- **Just me:** "Eight individual plans from about $30 to $100 per month. Pick by what your mouth needs in the next 12 months. Preventive only: start with UHC or Aetna. Major work coming: Ameritas or Mutual of Omaha. Planning implants: MetLife NCD."
- **Me + kids:** "Guardian Premier 2.0 is the only plan on this shelf with dependent orthodontics (children under 19, 60% in-network after a 12-month wait). Pair it with a lower-cost individual plan for your own preventive needs."
- **Me + spouse:** "Two individual policies often give each person their own annual maximum rather than sharing one. Use the scenario finder below to match each person's treatment plan to the right policy."
- **Whole family:** "Aetna caps the family deductible at $150 per calendar year. Guardian covers child braces. Humana bundles dental, vision, and hearing. The scenario finder below surfaces the right combination."

Below the answer text: one CTA link: "Show me the plans for this situation" (smooth-scrolls to `#scenario-finder`, passes `data-household` value via URLSearchParams-style storage in `sessionStorage`).

### Inputs and Outputs
- Input: one of four household-type buttons
- Output: `sessionStorage.setItem('cc_household', value)` where value is one of: `self`, `self_kids`, `couple`, `family`
- Downstream consumer: Widget 2 (scenario finder) reads `cc_household` on init to pre-select the Individual/Family segmented toggle and suppress irrelevant scenario chips

### Data Attributes
```html
<div id="coverage-chooser"
     role="radiogroup"
     aria-labelledby="chooser-label"
     data-widget="coverage-chooser">

  <button role="radio"
          aria-checked="false"
          data-value="self"
          class="chooser-btn">Just me</button>

  <button role="radio"
          aria-checked="false"
          data-value="self_kids"
          class="chooser-btn">Me + kids</button>

  <button role="radio"
          aria-checked="false"
          data-value="couple"
          class="chooser-btn">Me + spouse</button>

  <button role="radio"
          aria-checked="false"
          data-value="family"
          class="chooser-btn">Whole family</button>
</div>

<div id="chooser-answer"
     aria-live="polite"
     aria-atomic="true"
     hidden>
  <!-- answer text injected by JS -->
</div>
```

### Routing Logic
| Selection | `cc_household` value | Scenario finder pre-filter | Scenario finder toggle |
|---|---|---|---|
| Just me | `self` | Shows all 8 individual chips | Individual (default) |
| Me + kids | `self_kids` | Highlights "Braces for my kid" chip; pre-selects Family toggle | Family |
| Me + spouse | `couple` | No pre-filter; Individual toggle | Individual |
| Whole family | `family` | Family toggle pre-selected; shows 4 family scenario chips | Family |

### Accessibility
- `role="radiogroup"` on wrapper, `role="radio"` and `aria-checked` on each button
- `aria-labelledby` points to the "Who needs coverage?" label element
- `aria-live="polite"` and `aria-atomic="true"` on answer block
- Keyboard: arrow keys navigate between buttons within the group; Enter or Space selects; Tab exits the group
- `hidden` attribute (not `display:none` via class) on answer block until selection made
- No animation if `prefers-reduced-motion: reduce` (use `visibility` toggle only)
- Answer block text never contains plan premium estimates as guarantees; always uses "about $X/mo" phrasing

### Analytics Events
```javascript
// On button select:
gtag('event', 'widget_chooser_select', {
  widget: 'coverage_chooser',
  household: value,            // 'self' | 'self_kids' | 'couple' | 'family'
  page: 'ppo_hub'
});

// On CTA click:
gtag('event', 'widget_chooser_cta', {
  household: sessionStorage.getItem('cc_household'),
  page: 'ppo_hub'
});
```

### No-JS Fallback
The four buttons render as anchor links pointing to `#scenario-finder` with the household value as a hash parameter: `#scenario-finder?h=self`. The answer block is omitted. The scenario finder renders with all chips visible and no pre-selection. The page remains fully functional and scannable.

---

## Widget 2 -- Scenario Finder (2-Step Quiz)

### Purpose
Primary conversion surface. A 2-step quiz that accepts a situation (Step 1: life-event chip) and a timing signal (Step 2: how soon), then surfaces one or two best-fit plans with a plain-language answer block, a worked dollar example, a skip-if caveat, and a CTA to the plan story card below. This is the highest-priority widget on the page. Spec 09 patient testing identified the scenario result as the single highest-impact share trigger.

### Placement
Immediately below the hero section, above plan stories. Anchor: `#scenario-finder`. Section H2: "Start with your situation, not a brand name."

### UI States

**State 0: Default**
A segmented toggle at the top: `[ Individual ]  [ Family ]`
Below: 8 situation chip-cards arranged in a 2x4 grid (desktop) / 2-column grid (mobile). Each card is a `<button>` with icon, label, and hint line.

**State 1: Situation selected (Step 1 done)**
Selected chip-card: `--teal-tint` background, `--teal-strong` border, checkmark icon reveals (mirrors `cvsx-tile[aria-pressed="true"]` from oral-care section).
Step 2 appears below the chip grid with a smooth height transition:
```
"How soon do you need treatment?"
[ Right now (days to weeks) ]  [ In 3-6 months ]  [ Next year or later ]
```
Timing buttons: outlined pill style, same `.btn .btn-out` pattern.

**State 2: Both steps answered**
Answer block appears. State 1 and State 2 inputs remain visible and editable.
A "Reset" text link appears: "Start over" (clears state, collapses answer block).

**State 3: Family mode (toggle switched to Family)**
8 individual chips collapse. 4 family scenario cards replace them:
- Braces for a child (child under 19)
- Implant for one adult, maintenance for others
- Two adults, one big work year
- Whole family, CVS shoppers

Step 2 timing question and answer block logic remain the same.

### Situation Chips (Individual mode, Step 1)

| Chip label | Hint | Icon (inline SVG description) | Scenario key |
|---|---|---|---|
| Cleanings + checkups | Maintenance only, no work planned | Tooth with sparkle | `preventive` |
| Crown or root canal | Major work within 12 months | Crown shape | `major_work` |
| Implant ahead | Missing or failing tooth | Screw/post | `implant` |
| Braces for my kid | Dependent child, under 19 | Braces bracket | `kids_ortho` |
| Adult braces or Invisalign | Straightening for myself | Aligner | `adult_ortho` |
| Left a job with dental | Had coverage within 90 days | Briefcase | `cobra_gap` |
| Turning 65 or retiring | Medicare does not cover dental | Sunglasses | `senior` |
| Lowest possible price | Budget is the main filter | Dollar sign | `budget` |

### Timing Options (Step 2)

| Option | Value | Effect on routing |
|---|---|---|
| Right now (days to weeks) | `urgent` | Weights no-wait plans; surfaces Ameritas, MOO, MetLife NCD for major/implant scenarios |
| In 3-6 months | `soon` | Allows 6-month wait plans; surfaces Humana for major/implant |
| Next year or later | `planning` | Unlocks 12-month wait plans; Guardian and Delta Dental become eligible for ortho scenarios |

### Routing Logic (Individual mode)

All plan assignments sourced from spec 08 PART 3 summary table and spec 06 scenario matrix. Every plan fact in the answer block must be verified against the named SSOT field before the page is built.

| Scenario chip | Timing | Hero plan | Runner-up | Key SSOT field(s) |
|---|---|---|---|---|
| `preventive` | any | UHC Primary Dental | Aetna Dental Direct | `coverage_preventive`, `monthly_premium` |
| `major_work` | urgent | Ameritas PrimeStar | Mutual of Omaha | `waiting_periods: "None"`, `coverage_major` |
| `major_work` | soon | Humana Extend 5000 | Mutual of Omaha | `waiting_periods` (6-month), `coverage_major` |
| `major_work` | planning | Humana Extend 5000 | Guardian Premier | `coverage_major`, `annual_maximum` |
| `implant` | urgent | MetLife NCD Complete | Ameritas PrimeStar | `implants`, `annual_maximum: "$10,000"`, `waiting_periods: "None"` |
| `implant` | soon | Humana Extend 5000 | Mutual of Omaha | `implants` (6-month, cannot waive) |
| `implant` | planning | MetLife NCD Complete | Humana Extend 5000 | `implants`, `annual_maximum` |
| `kids_ortho` | planning only | Guardian Premier 2.0 | Delta Dental PPO Premium | `orthodontics` (12-month wait required; urgent/soon show warning, not a plan match) |
| `kids_ortho` | urgent or soon | [Warning card -- see below] | -- | 12-month wait; no plan on shelf covers ortho without a wait |
| `adult_ortho` | planning only | Delta Dental PPO Premium | (none on shelf) | `orthodontics: "Adults AND dependent children..."` |
| `adult_ortho` | urgent or soon | [Warning card -- see below] | -- | 12-month wait; no plan on shelf covers adult ortho without a wait |
| `cobra_gap` | any | Aetna Dental Direct | UHC Primary Dental | `waiting_periods` waiver (90-day prior coverage), `monthly_premium` |
| `senior` | any | Mutual of Omaha Dental Preferred | Ameritas PrimeStar | `monthly_premium: "Community-rated"`, `waiting_periods: "NONE"`, `annual_maximum` |
| `budget` | any | UHC Primary Dental | Aetna Dental Direct | `monthly_premium: "~$30/mo"` |

**Warning card (ortho + urgent/soon timing):**
Shown instead of a plan match. Gold-faint background (`--partial-tint`), warning chip. Text: "Both plans on this shelf that cover orthodontics require a 12-month waiting period before the benefit applies. There is no way to waive this wait for orthodontics. If your child's treatment starts within 12 months, the ortho benefit will not apply. You can still enroll now to have the wait run, then use the benefit starting in month 13."

**COBRA gap special handling:**
If scenario is `cobra_gap`, the answer block includes a secondary note: "The Aetna waiting period waiver applies only if all enrolled family members had dental coverage within the past 90 days. Confirm your prior coverage dates before enrolling." Source: `aetna-dental-direct.md` `waiting_periods` waiver field.

**State-availability flags (must be shown in answer block, not suppressed):**
- If hero plan is UHC Primary Dental: append chip `chip.warn`: "Not available in NY"
- If hero plan is Delta Dental PPO Premium: append chip `chip.warn`: "Available in 16 states + DC only"
- If hero plan is Ameritas PrimeStar: append chip `chip.warn`: "Not available in MA"

### Routing Logic (Family mode)

| Family chip | Hero plan | Runner-up | Key SSOT fields |
|---|---|---|---|
| Braces for a child | Guardian Premier 2.0 | Delta Dental PPO Premium | `orthodontics` (Guardian: child-only, 60% in-network; `do_not`: never list adult ortho as covered on Guardian) |
| Implant for one adult + maintenance | MetLife NCD Complete | Humana Extend 5000 | `implants`, `annual_maximum: "$10,000"` (MetLife); pair with UHC for the maintenance-only member |
| Two adults, big work year | Mutual of Omaha Dental Preferred | Humana Extend 5000 | `annual_maximum: "$5,000"` (both); `waiting_periods: "NONE"` (MOO) |
| Whole family, CVS shoppers | Aetna Dental Direct | Guardian Premier 2.0 | `cvs_extracare_plus`, `deductible: "$50 individual, $150 family per CALENDAR YEAR"` |

### Answer Block Structure

```
+------------------------------------------------+
| EYEBROW: "BEST FIT FOR YOUR SITUATION"         |
|                                                |
| [Plan name -- Fraunces 20px]                  |
| One-sentence story from plan's SSOT voice     |
|                                                |
| [Key fact chip: e.g. "No waiting period"]     |
| [Caveat chip: e.g. "20% in year one"]         |
|                                                |
| DOLLAR EXAMPLE (plain text, not a calculator) |
| "For a $1,200 crown in year one, this plan     |
|  would pay about $240 (20%). In year two:     |
|  about $600 (50%)."                           |
|                                                |
| SKIP IF: [bordered note box, gold-faint bg]   |
| "Not the right pick if you need major work    |
|  covered in the next 6 months..."             |
|                                                |
| [Read the full plan story] (scrolls to        |
|  plan anchor: #stop-{plan-slug})              |
| [See all 8 plans] (scrolls to #plan-stories)  |
|                                                |
| [Share this recommendation] (see Widget 5)    |
+------------------------------------------------+
```

Dollar examples are pre-written static strings per plan per scenario, NOT calculated dynamically. The dollar amounts use representative procedure costs (crown: $1,200, implant: $4,000) cited in the spec. They are labeled "approximate" and "for illustration." No dynamic input accepted -- this is explicitly a light-computation implementation.

Pre-written dollar examples (source: representative US procedure costs; label as estimates in copy):

| Plan | Scenario | Dollar example string |
|---|---|---|
| Ameritas PrimeStar | major_work | "For a $1,200 crown: plan pays about $240 in year one (20% in-network). In year two: about $600 (50%)." |
| Mutual of Omaha | major_work | "For a $1,200 crown: plan pays about $240 in year one (20%). In year two: about $600 (50%)." |
| Humana Extend 5000 | major_work | "For a $1,200 crown after the 6-month wait: plan pays about $600 in year one (50%), about $720 in year two (60%)." |
| MetLife NCD Complete | implant | "For a $4,000 implant: plan pays about $400 in year one (10%). In year two: about $2,000 (50%), up to the $3,000 annual implant cap." |
| Ameritas PrimeStar | implant | "For a $4,000 implant: plan pays up to $1,000 in year one (implant sub-cap). In year two: up to $1,500. Both sub-caps count against your annual maximum." |
| Humana Extend 5000 | implant | "For a $4,000 implant after the 6-month wait: plan pays about $2,000 in year one (50%), up to $2,000 annual implant cap." |
| UHC Primary Dental | preventive | "Two cleanings and an exam per year: $0 out of pocket in-network. That is the plan. Major work (crowns, root canals) is not covered on this tier." |
| Aetna Dental Direct | cobra_gap | "With the prior-coverage waiver, major work (like a crown) is available immediately at 50%. For a $1,200 crown: plan pays about $600. Confirm waiver eligibility with Aetna before booking." |
| Guardian Premier 2.0 | kids_ortho | "Guardian contributes up to $750 per benefit year toward braces, $1,500 lifetime per child. On a $6,000 case over two years: plan pays about $1,500 total (25% of cost). The ortho wait is 12 months and cannot be waived." |
| Delta Dental PPO Premium | adult_ortho | "On a $5,800 Invisalign case: Delta pays up to $1,500 lifetime (minus the $50 ortho deductible). Your estimated out-of-pocket for ortho: about $4,350. The plan also covers cleanings and fillings." |
| Mutual of Omaha | senior | "Community-rated pricing: your premium stays stable as you age. For a $4,000 implant: plan pays about $800 in year one (20%), about $2,000 in year two (50%), subject to the $3,000 lifetime implant cap." |

### Data Model

```javascript
// Stored in sessionStorage only. Never persisted. Never includes health identifiers.
sessionStorage.setItem('cc_scenario', JSON.stringify({
  household: 'self',         // from Widget 1
  situation: 'major_work',   // Step 1 chip value
  timing: 'urgent',          // Step 2 value
  hero_plan: 'ameritas-primestar',
  runner_up: 'mutual-of-omaha-dental',
  timestamp: Date.now()      // for session-share mechanic (Widget 5)
}));
```

Data attributes on chips:
```html
<button class="sfc-chip card"
        role="radio"
        aria-checked="false"
        data-situation="major_work"
        data-label="Crown or root canal">
```

### Accessibility
- Step 1 chips: `role="radiogroup"` wrapper, each chip `role="radio"` + `aria-checked`
- Step 2 timing buttons: separate `role="radiogroup"`, each `role="radio"` + `aria-checked`
- Answer block: `aria-live="polite"`, `aria-atomic="false"` (so screen readers read incrementally)
- Warning card: `role="alert"` instead of `aria-live="polite"` (urgent warning pattern)
- "Skip if" box: `role="note"` with `aria-label="Caveat: when to skip this plan"`
- Reset button: `aria-label="Clear scenario selections and start over"`
- `prefers-reduced-motion`: suppress `max-height` transition; toggle `hidden` attribute directly
- Color is never the sole indicator of state (chip selected state also uses border + checkmark icon + text change)

### Analytics Events
```javascript
// Step 1 chip selected:
gtag('event', 'scenario_step1', {
  widget: 'scenario_finder',
  situation: chipValue,
  household: sessionStorage.getItem('cc_household') || 'unknown'
});

// Step 2 timing selected:
gtag('event', 'scenario_step2', {
  widget: 'scenario_finder',
  situation: chipValue,
  timing: timingValue
});

// Answer block rendered:
gtag('event', 'scenario_result', {
  widget: 'scenario_finder',
  hero_plan: heroPlan,
  runner_up: runnerUpPlan || 'none',
  situation: chipValue,
  timing: timingValue
});

// CTA click (read full plan story):
gtag('event', 'scenario_cta_plan', {
  plan: heroPlan,
  cta_label: 'read_plan_story'
});

// Reset click:
gtag('event', 'scenario_reset', {
  widget: 'scenario_finder'
});
```

### No-JS Fallback
The widget renders as a visible section with anchor links to each plan story card. The chips render as `<a>` tags pointing to the plan anchor (`#stop-uhc`, `#stop-aetna`, etc.). Step 2 and the answer block are hidden via `<noscript>` CSS (`display:none`). A static text block is visible in `<noscript>`: "See the plan stories below to find the right match for your situation. Each plan story includes a 'Skip it if' note."

---

## Widget 3 -- Family Builder

### Purpose
Help multi-member households see, at a glance, which plan combination covers the household's distinct needs. Light interaction only: add members (up to 4), tag each with a primary need, and see a recommended per-member plan assignment and a high-level family economics note. No premium math is computed. No combined family total is displayed (to avoid false precision). No member data is stored beyond the session.

### Placement
Inside the "Planning for more than just yourself" section, anchored at `#family-builder`. Placement: after the best-for-scenarios grid, before FAQ.

### UI States

**State 0: Default**
Header and a single "+ Add a family member" button. A placeholder card shows "Add at least two members to see a combination."

**State 1: Members added**
Each member is a card with two fields:
1. Who: `[ Adult ]  [ Child ]` (segmented toggle, `role="radiogroup"`)
2. Primary need: a dropdown (native `<select>`) with 6 options:
   - Cleanings only
   - Fillings / cavities likely
   - Crown or root canal coming
   - Implant needed
   - Braces (child, under 19)
   - Braces (adult)

A small "Remove" link on each card.

Up to 4 members. "+ Add another member" button disappears at 4. Below the members: "See combination" button.

**State 2: Combination shown**
Below the member cards, a recommendation panel appears. For each member: plan name + one-sentence rationale. Below the per-member assignments: a "family economics note" (static, not calculated):

```
Family economics note:
Each person holds an individual policy with their own annual maximum.
Premiums and deductibles are per person. No family maximum is shared
unless you enroll all members on the same carrier's family plan
(if offered). Verify family plan options directly with the carrier.
```

This note is required. Per spec 08 Part 4 flag: Ameritas's family-deductible cap applies only on the WA Advantage Plus brochure; do not show a nationwide family-max calculation.

**State 3: Reset**
"Start over" clears all members and returns to State 0.

### Per-Member Plan Assignment Logic

Logic is a direct lookup against the scenario-to-plan table from spec 08. No arithmetic. No premium lookup.

| Who | Primary need | Assigned plan | Rationale chip |
|---|---|---|---|
| Adult | Cleanings only | UHC Primary Dental | "~$30/mo, 100% preventive day one" |
| Adult | Fillings / cavities | Guardian Premier 2.0 | "85% day-one basic, highest on shelf" |
| Adult | Crown or root canal | Ameritas PrimeStar | "No wait, major day one at 20% year one" |
| Adult | Implant needed | MetLife NCD Complete | "$10,000 max, $3,000/yr implant cap, no wait" |
| Adult | Braces (adult) | Delta Dental PPO Premium | "Only plan covering adult ortho; 16 states + DC" |
| Child | Cleanings only | Aetna Dental Direct | "100% preventive, $150 family deductible cap" |
| Child | Fillings / cavities | Guardian Premier 2.0 | "85% day-one basic" |
| Child | Braces (child, under 19) | Guardian Premier 2.0 | "60% in-network child ortho after 12-month wait" |
| Adult 65+ (age flag from "Who" toggle -- add a third option: Senior 65+) | Any | Mutual of Omaha Dental Preferred | "Community-rated, no major waits, $5,000 selectable max" |

**Conflict flags shown inline (not hidden):**
- If adult selects "Braces (adult)" and state availability cannot be confirmed: show `chip.warn`: "Delta Dental PPO Premium individual plans sold in 16 states + DC. Confirm your state."
- If child "Braces" timing is urgent/soon: show `chip.warn`: "12-month wait on all ortho plans. Enroll now to start the clock."
- If any member selects "Implant needed": show note: "Implant plans vary significantly by wait period and lifetime cap. Compare MetLife NCD ($3,000/yr cap, no wait) vs Mutual of Omaha ($3,000 lifetime cap, no wait) before enrolling."

### Data Model
```html
<div id="family-builder"
     data-widget="family-builder"
     data-member-count="0">

  <div class="fb-member-card"
       data-index="0"
       data-who="adult"
       data-need="cleanings_only">
    <!-- fields inside -->
  </div>
</div>
```

```javascript
// On "See combination" click, analytics only. No health data stored.
const members = [...document.querySelectorAll('.fb-member-card')].map(el => ({
  who: el.dataset.who,
  need: el.dataset.need
}));

gtag('event', 'family_builder_result', {
  widget: 'family_builder',
  member_count: members.length,
  needs_mix: members.map(m => m.need).join(',')
});
```

### Accessibility
- Each member card: `<fieldset>` with `<legend>` "Family member [N]"
- Who toggle: `role="radiogroup"` inside the fieldset
- Primary need: native `<select>` with `<label>`
- Recommendation panel: `aria-live="polite"` on the container
- Remove button: `aria-label="Remove family member [N]"`
- Add member button: updates `aria-label` when limit is reached: `aria-label="Maximum 4 members reached"`

### Analytics Events
```javascript
gtag('event', 'family_builder_add_member', { member_index: n });
gtag('event', 'family_builder_remove_member', { member_index: n });
gtag('event', 'family_builder_see_combination', {
  member_count: n,
  needs: needsArray.join(',')
});
```

### No-JS Fallback
The section renders as static HTML: the 4 family scenario cards already specified in spec 10 Section 12 (Kids braces + parent maintenance; One adult implant + partner basic; Aetna CVS family; Heavy year for two). The interactive builder is wrapped in a `<div class="fb-interactive">` that is hidden by default and revealed by JS. The static scenario cards are always in the DOM.

---

## Widget 4 -- Plan Matcher / Filter

### Purpose
Allow visitors who are already scanning plan story cards to narrow the 8-card shelf by a specific need without leaving the plan stories section. Dimming non-matching cards is faster than a separate filter page and keeps narrative context intact. Reuses the left rail "Filter by need" pill toggles from spec 10 Section 3 Block L3 as the primary control; the center column responds to selection.

### Placement
Primary control: Left rail, Block L3 (`#filter-by-need`). Secondary control: a compact horizontal pill strip that appears at the top of the `#plan-stories` section on mobile (where the left rail is not visible). The filter strip is labeled "Filter plans:" and renders the same 4 options as horizontal pills.

### Filter Options (multi-select, each a toggle pill)

| Filter label | `data-filter` value | Plans that match |
|---|---|---|
| Preventive only | `preventive` | UHC Primary Dental, Aetna Dental Direct |
| Basic + major | `basic_major` | Ameritas PrimeStar, Guardian Premier, Humana Extend 5000, Mutual of Omaha, MetLife NCD, Delta Dental PPO |
| Implants | `implants` | Ameritas PrimeStar, MetLife NCD, Humana Extend 5000, Mutual of Omaha |
| Ortho / braces | `ortho` | Guardian Premier 2.0 (child), Delta Dental PPO Premium (child + adult) |

Filter logic: multi-select allowed. A `.tour-stop` card that does NOT match any active filter dims to 40% opacity (`opacity:0.4; pointer-events:none`). A card that matches any active filter remains full opacity. If no filter is active, all cards are full opacity.

The filter is applied via class toggling only. No DOM nodes removed. No content changes.

### Data Attributes on `.tour-stop` cards

```html
<section class="tour-stop"
         id="stop-uhc"
         data-plan="uhc-primary-dental"
         data-filters="preventive">

<section class="tour-stop"
         id="stop-guardian"
         data-plan="guardian-premier-ppo"
         data-filters="basic_major ortho">

<section class="tour-stop"
         id="stop-metlife"
         data-plan="metlife-ncd-complete"
         data-filters="basic_major implants">
```

Full `data-filters` map:

| Plan | `data-filters` value |
|---|---|
| UHC Primary Dental | `preventive` |
| Aetna Dental Direct | `preventive basic_major` |
| Ameritas PrimeStar | `basic_major implants` |
| Guardian Premier 2.0 | `basic_major ortho` |
| MetLife NCD Complete | `basic_major implants` |
| Mutual of Omaha | `basic_major implants` |
| Humana Extend 5000 | `basic_major implants` |
| Delta Dental PPO Premium | `basic_major ortho` |

### Plan Matcher "Best for" Scenario Match Indicator

Each `.tour-stop` card gets a match indicator bar at the top, implemented as a `<div class="match-bar">` that is hidden by default and revealed if the visitor has completed Widget 2 (scenario finder).

```javascript
// After scenario finder produces a result:
const heroSlug = sessionStorage.getItem('cc_hero_plan'); // e.g. 'ameritas-primestar'
document.querySelectorAll('.tour-stop').forEach(card => {
  const indicator = card.querySelector('.match-bar');
  if (!indicator) return;
  if (card.dataset.plan === heroSlug) {
    indicator.textContent = 'Matches your situation';
    indicator.className = 'match-bar match-yes';
  } else {
    indicator.textContent = 'Not your best match';
    indicator.className = 'match-bar match-no';
  }
  indicator.hidden = false;
});
```

Match bar styles:
```css
.match-bar { display:none; padding:5px 16px; font-size:12px; font-weight:600;
             border-radius: var(--r-sm) var(--r-sm) 0 0; }
.match-bar.match-yes { background: var(--covered-tint); color: var(--covered); display:block; }
.match-bar.match-no  { background: var(--surface-2);   color: var(--ink-faint); display:block; }
```

### Accessibility
- Filter pills: `role="group"` wrapper with `aria-label="Filter plans by need"`, each pill `role="checkbox"` + `aria-checked`
- When a plan card is dimmed: `aria-hidden="true"` is NOT applied (screen reader users should still be able to read dimmed plans); instead `aria-disabled="true"` on the card element conveys reduced relevance
- A live region below the filter strip announces the count: `aria-live="polite"`: "Showing 3 of 8 plans"

### Analytics Events
```javascript
gtag('event', 'plan_filter_toggle', {
  widget: 'plan_matcher',
  filter: filterValue,
  active: isActive,      // true = turned on, false = turned off
  visible_count: n       // number of plans currently visible
});
```

### No-JS Fallback
Filter pills render as anchor links pointing to the first matching plan card. Example: "Preventive only" links to `#stop-uhc`. The dimming behavior is absent. All plan cards are visible at full opacity. The match indicator bar is not rendered in the `<noscript>` path.

---

## Widget 5 -- Share / Save Mechanic

### Purpose
Retention and shareability. Two functions: (a) share the hub or a specific scenario recommendation, and (b) bookmark/save for later without requiring account creation. The share mechanic is the per-scenario shareable summary identified as the highest share trigger in spec 09 (all personas expressed willingness to share a one-paragraph scenario match they could forward).

### Placement
- **Right rail, Block R5** (`#share-save`): General hub share, always visible
- **Scenario finder answer block**: "Share this recommendation" inline link (appears after State 2)
- **Below FAQ section**: "Share this guide with your family" full-width CTA strip

### Share Targets and Mechanic

Three targets. No third-party share widget library. Native browser APIs only.

**1. Copy link**
`navigator.clipboard.writeText(url)`. On success: button label changes to "Copied!" for 2 seconds (setTimeout), then resets. On failure (clipboard not permitted): shows the URL in a `<input type="text" readonly>` for manual copy.

**2. Email**
`window.location.href = 'mailto:?subject=...&body=...'`. Subject and body generated from scenario context if Widget 2 has been used; otherwise generic hub URL. Subject: "PPO dental plan recommendation -- CoverCapy." Body: the plain-text equivalent of the scenario answer block, plus the URL.

Example body for major_work + urgent scenario:
```
Based on your situation (crown or root canal needed soon), CoverCapy recommends:

Ameritas PrimeStar Care Complete
No waiting periods on any service. Coverage can start as soon as the day after you apply.
For a $1,200 crown in year one: plan pays about $240 (20% in-network).
In year two: about $600 (50%).

Skip it if: You need 50% reimbursement immediately; the 20% year-one rate applies on day one.

Read the full plan story:
https://www.covercapy.com/dental-insurance/ppo-plans/#stop-ameritas

Verified by CoverCapy -- June 2026.
CoverCapy is an independent educational marketplace, not an insurer.
```

**3. Text / native share**
`navigator.share({ title, text, url })` if available (`typeof navigator.share === 'function'`). On unsupported browsers: button is hidden. The text payload is the same plain-text scenario summary as the email body.

**Save for later (bookmark)**
A "Bookmark this page" button calls `navigator.share({ url })` on mobile, or opens a tooltip on desktop: "Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark this page." This avoids requiring account creation. sessionStorage preserves scenario context for the current session only.

### Scenario-Specific Share Text Generation

```javascript
function buildShareText(scenario) {
  // scenario = object from sessionStorage 'cc_scenario'
  const templates = {
    'ameritas-primestar_major_work_urgent':
      'No waiting periods on crowns and root canals...',
    // one static template per plan+scenario+timing combination
    // pre-written, not generated -- avoids dynamic string composition errors
  };
  return templates[`${scenario.hero_plan}_${scenario.situation}_${scenario.timing}`]
    || genericShareText();
}
```

Templates are pre-written for the 12 high-traffic scenario combinations. For combinations without a template, the generic share text (hub URL + description) is used.

### UI Components (right rail Block R5)

```html
<div id="share-save" class="card" style="padding:18px 20px" aria-label="Share this guide">
  <p class="eyebrow">SHARE THIS GUIDE</p>
  <div class="share-row">
    <button class="btn btn-out share-btn" data-share="copy"
            aria-label="Copy link to this guide">
      <!-- clipboard SVG --> Copy link
    </button>
    <button class="btn btn-out share-btn" data-share="email"
            aria-label="Share by email">
      <!-- email SVG --> Email
    </button>
    <button class="btn btn-out share-btn js-only" data-share="native"
            aria-label="Share via device share menu"
            hidden>
      <!-- share SVG --> Share
    </button>
  </div>
  <p style="font-size:12px;color:var(--ink-3);margin-top:12px">
    We do not sell your information.
    <a href="/privacy">Privacy policy</a>
  </p>
</div>
```

### Inline Scenario Share (inside Widget 2 answer block)

A single text link below the answer block CTAs:

```html
<button class="share-scenario-link"
        aria-label="Share this plan recommendation by email or link">
  Share this recommendation
</button>
```

On click: if `navigator.share` available, calls `navigator.share` with scenario text. Otherwise calls `mailto:`. Never triggers a modal or overlay. No animation beyond the button label flash ("Shared!" for 1.5 seconds).

### Accessibility
- All share buttons have explicit `aria-label` text (not icon-only)
- `data-share` native button reveals itself only after JS confirms `navigator.share` support (prevents a broken button rendering in no-share browsers)
- "Copied!" state: `aria-live="assertive"` on a visually hidden span that receives the "Copied!" text on success
- No modal or overlay introduced by this widget

### Analytics Events
```javascript
gtag('event', 'share_click', {
  widget: 'share_save',
  method: method,           // 'copy' | 'email' | 'native'
  context: context,         // 'rail' | 'scenario_result' | 'faq_footer'
  has_scenario: !!sessionStorage.getItem('cc_scenario')
});

gtag('event', 'bookmark_prompt', {
  context: 'rail'
});
```

### No-JS Fallback
The right rail share block shows only the Email link (rendered as a plain `<a href="mailto:...">`) and the Copy link button is hidden. The inline scenario share link is hidden. The "Share this guide" heading and the privacy note remain visible.

---

## Skeleton HTML + CSS + JS: Widget 2 (Scenario Finder)

This skeleton is implementation-ready. Replace `/* FILL */` comments with the full routing table and answer text from this spec before build. All dollar examples are static strings, not computed values.

```html
<!-- ═══════════════════════════════════════════════
     SCENARIO FINDER WIDGET
     Anchor: #scenario-finder
     Reads: sessionStorage 'cc_household'
     Writes: sessionStorage 'cc_scenario'
     ═══════════════════════════════════════════════ -->
<section id="scenario-finder" aria-labelledby="sf-heading">
<style>
#scenario-finder{padding:32px 0}
#scenario-finder .sf-toggle{display:flex;gap:4px;background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-pill);padding:3px;width:fit-content;margin-bottom:24px}
#scenario-finder .sf-toggle-btn{padding:8px 20px;border-radius:var(--r-pill);font-size:14px;font-weight:600;color:var(--ink-3);background:transparent;border:none;cursor:pointer;transition:.15s}
#scenario-finder .sf-toggle-btn[aria-pressed="true"]{background:var(--surface);color:var(--ink);box-shadow:var(--sh-1)}
#scenario-finder .sf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
@media(max-width:640px){#scenario-finder .sf-grid{grid-template-columns:repeat(2,1fr)}}
#scenario-finder .sf-chip{position:relative;display:flex;flex-direction:column;gap:5px;padding:14px 14px 12px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);cursor:pointer;font:inherit;color:var(--ink-2);text-align:left;transition:border-color .15s,background .15s;min-height:80px}
#scenario-finder .sf-chip:hover{border-color:var(--teal)}
#scenario-finder .sf-chip[aria-checked="true"]{background:var(--teal-tint);border-color:var(--teal-strong)}
#scenario-finder .sf-chip-label{font-size:14px;font-weight:600;color:var(--ink);line-height:1.3}
#scenario-finder .sf-chip-hint{font-size:12px;color:var(--ink-3);line-height:1.4}
#scenario-finder .sf-chip-check{position:absolute;top:10px;right:10px;width:18px;height:18px;border-radius:50%;background:var(--teal-strong);display:none;align-items:center;justify-content:center}
#scenario-finder .sf-chip[aria-checked="true"] .sf-chip-check{display:flex}

#scenario-finder .sf-step2{overflow:hidden;max-height:0;opacity:0;transition:max-height .25s ease,opacity .2s ease}
#scenario-finder .sf-step2.visible{max-height:200px;opacity:1}
@media(prefers-reduced-motion:reduce){#scenario-finder .sf-step2{transition:none}}
#scenario-finder .sf-timing-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;margin-bottom:4px}
#scenario-finder .sf-timing-btn{padding:9px 18px;border-radius:var(--r-pill);font-size:13.5px;font-weight:600;color:var(--ink-2);background:var(--surface);border:1px solid var(--line);cursor:pointer;transition:.15s}
#scenario-finder .sf-timing-btn:hover{border-color:var(--teal)}
#scenario-finder .sf-timing-btn[aria-checked="true"]{background:var(--teal-tint);border-color:var(--teal-strong);color:var(--teal-ink)}

#scenario-finder .sf-answer{margin-top:24px;padding:22px 24px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-1);display:none}
#scenario-finder .sf-answer.visible{display:block}
#scenario-finder .sf-answer .eyebrow{color:var(--teal-ink);margin-bottom:8px}
#scenario-finder .sf-plan-name{font-size:20px;font-weight:700;color:var(--ink);margin-bottom:4px}
#scenario-finder .sf-story{font-size:15px;color:var(--ink-2);margin-bottom:12px}
#scenario-finder .sf-chips-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
#scenario-finder .sf-dollar{font-size:14px;color:var(--ink-2);background:var(--surface-2);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:14px;line-height:1.55}
#scenario-finder .sf-skipif{background:var(--partial-tint);border:1px solid var(--partial);border-radius:var(--r-sm);padding:10px 14px;font-size:13.5px;color:var(--partial-ink);margin-bottom:16px}
#scenario-finder .sf-skipif strong{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}
#scenario-finder .sf-cta-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
#scenario-finder .sf-reset{font-size:13px;color:var(--ink-3);cursor:pointer;background:none;border:none;text-decoration:underline;padding:0;margin-top:14px;display:block}

/* Warning card variant */
#scenario-finder .sf-answer.warning{background:var(--partial-tint);border-color:var(--partial)}
</style>

<h2 id="sf-heading" style="font-size:clamp(21px,2.5vw,26px);font-weight:700;margin-bottom:8px">
  Start with your situation, not a brand name
</h2>
<p style="font-size:16px;color:var(--ink-2);margin-bottom:24px;max-width:56ch">
  Answer two quick questions. We match you to the plan built for your situation,
  with honest math, not just a percentage.
</p>

<!-- Segmented toggle: Individual / Family -->
<div class="sf-toggle" role="group" aria-label="Coverage type">
  <button class="sf-toggle-btn" id="sf-individual" aria-pressed="true"
          data-mode="individual">Individual</button>
  <button class="sf-toggle-btn" id="sf-family" aria-pressed="false"
          data-mode="family">Family</button>
</div>

<!-- Step 1: Situation chips -->
<div role="radiogroup" aria-labelledby="sf-step1-label" id="sf-chip-grid" class="sf-grid">
  <p id="sf-step1-label" class="eyebrow" style="grid-column:1/-1;margin-bottom:0">
    Step 1: What is your situation?
  </p>

  <!-- Individual chips -->
  <div class="sf-individual-chips" style="display:contents">
    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="preventive" data-label="Cleanings + checkups">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C8 2 5 5 5 9c0 2.4 1.1 4.5 2.8 5.9L9 22h6l1.2-7.1C17.9 13.5 19 11.4 19 9c0-4-3-7-7-7z"/>
      </svg>
      <span class="sf-chip-label">Cleanings + checkups</span>
      <span class="sf-chip-hint">Maintenance only, no work planned</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="major_work" data-label="Crown or root canal">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 3h14l-1 8H6L5 3z"/><path d="M9 11v10m6-10v10"/>
      </svg>
      <span class="sf-chip-label">Crown or root canal</span>
      <span class="sf-chip-hint">Major work within 12 months</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="implant" data-label="Implant ahead">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="2" x2="12" y2="22"/><path d="M8 6h8M7 10h10"/>
      </svg>
      <span class="sf-chip-label">Implant ahead</span>
      <span class="sf-chip-hint">Missing or failing tooth</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="kids_ortho" data-label="Braces for my kid">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="4" y="9" width="16" height="6" rx="3"/><line x1="8" y1="9" x2="8" y2="15"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="16" y1="9" x2="16" y2="15"/>
      </svg>
      <span class="sf-chip-label">Braces for my kid</span>
      <span class="sf-chip-hint">Dependent child, under 19</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="adult_ortho" data-label="Adult braces or Invisalign">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 8c0-3 2-5 6-5s6 2 6 5v8c0 3-2 5-6 5s-6-2-6-5V8z"/>
      </svg>
      <span class="sf-chip-label">Adult braces or Invisalign</span>
      <span class="sf-chip-hint">Straightening for myself</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="cobra_gap" data-label="Left a job with dental">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
      <span class="sf-chip-label">Left a job with dental</span>
      <span class="sf-chip-hint">Had coverage within 90 days</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="senior" data-label="Turning 65 or retiring">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
      <span class="sf-chip-label">Turning 65 or retiring</span>
      <span class="sf-chip-hint">Medicare does not cover dental</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>

    <button class="sf-chip" role="radio" aria-checked="false"
            data-situation="budget" data-label="Lowest possible price">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
      <span class="sf-chip-label">Lowest possible price</span>
      <span class="sf-chip-hint">Budget is the main filter</span>
      <span class="sf-chip-check" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
    </button>
  </div><!-- end .sf-individual-chips -->
</div><!-- end #sf-chip-grid -->

<!-- Step 2: Timing -->
<div class="sf-step2" id="sf-step2" aria-hidden="true">
  <p class="eyebrow" style="margin-bottom:4px">Step 2: How soon do you need treatment?</p>
  <div class="sf-timing-row"
       role="radiogroup"
       aria-labelledby="sf-step2-label">
    <span id="sf-step2-label" class="sr-only">How soon do you need treatment?</span>
    <button class="sf-timing-btn" role="radio" aria-checked="false"
            data-timing="urgent">Right now (days to weeks)</button>
    <button class="sf-timing-btn" role="radio" aria-checked="false"
            data-timing="soon">In 3 to 6 months</button>
    <button class="sf-timing-btn" role="radio" aria-checked="false"
            data-timing="planning">Next year or later</button>
  </div>
</div>

<!-- Answer block -->
<div class="sf-answer" id="sf-answer"
     aria-live="polite"
     aria-atomic="false"
     role="region"
     aria-label="Plan recommendation">
  <!-- Injected by JS -->
</div>

<script>
(function(){
  // ── ROUTING TABLE ──────────────────────────────────────────────────
  // Source: spec 08 PART 3 summary table. All facts must be verified
  // against /data/plans/{slug}.md SSOT before production build.
  // ────────────────────────────────────────────────────────────────────
  var ROUTES = {
    preventive:  { any:     { hero:'uhc-primary-dental',          runner:'aetna-dental-direct' } },
    major_work:  { urgent:  { hero:'ameritas-primestar',          runner:'mutual-of-omaha-dental' },
                   soon:    { hero:'humana-extend-5000',          runner:'mutual-of-omaha-dental' },
                   planning:{ hero:'humana-extend-5000',          runner:'guardian-premier-ppo' } },
    implant:     { urgent:  { hero:'metlife-ncd-complete',        runner:'ameritas-primestar' },
                   soon:    { hero:'humana-extend-5000',          runner:'mutual-of-omaha-dental' },
                   planning:{ hero:'metlife-ncd-complete',        runner:'humana-extend-5000' } },
    kids_ortho:  { urgent:  { warning: true },
                   soon:    { warning: true },
                   planning:{ hero:'guardian-premier-ppo',        runner:'delta-dental-ppo-premium' } },
    adult_ortho: { urgent:  { warning: true },
                   soon:    { warning: true },
                   planning:{ hero:'delta-dental-ppo-premium',    runner: null } },
    cobra_gap:   { any:     { hero:'aetna-dental-direct',         runner:'uhc-primary-dental' } },
    senior:      { any:     { hero:'mutual-of-omaha-dental',      runner:'ameritas-primestar' } },
    budget:      { any:     { hero:'uhc-primary-dental',          runner:'aetna-dental-direct' } }
  };

  // ── PLAN DATA ────────────────────────────────────────────────────────
  // All facts cited to SSOT field. Premium figures are estimates only.
  // Dollar examples are pre-written static strings (no computation).
  // ────────────────────────────────────────────────────────────────────
  var PLANS = {
    'uhc-primary-dental': {
      name: 'UHC Primary Dental',
      anchor: '#stop-uhc',
      story: 'The least expensive plan on this shelf: about $30 per month with 100% preventive from day one and no major work waiting period to worry about -- because major work is not covered on this tier.',
      keyFact: '~$30/mo estimate',
      caveat: 'Major work (crowns, root canals, implants) is not covered on this tier. If a crown is coming, this is not the plan.',
      dollar: 'Two cleanings and one exam per year: $0 out of pocket in-network. Fillings: 50% from day one. Crown: not covered.',
      stateFlag: 'Not available in New York'
    },
    'aetna-dental-direct': {
      name: 'Aetna Dental Direct',
      anchor: '#stop-aetna',
      story: 'The everyday balanced plan with a CVS bonus: 100% preventive, 80% basic, 50% major, and a free CVS ExtraCare Plus membership that includes a $10 per month CVS rewards credit.',
      keyFact: '~$50/mo estimate',
      caveat: 'Implants and orthodontics are not covered on any Dental Direct tier. Basic work has a 6-month wait unless you had dental coverage within the past 90 days.',
      dollar: 'For a filling (basic, $200): plan pays about $160 (80%) after the 6-month wait and deductible. Implants: not covered.',
      stateFlag: 'CVS ExtraCare Plus not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA'
    },
    'ameritas-primestar': {
      name: 'Ameritas PrimeStar Care Complete',
      anchor: '#stop-ameritas',
      story: 'The only plan on this shelf with zero waiting periods on every service including major work and implants. Coverage can start as soon as the day after you apply.',
      keyFact: 'No waiting periods on anything',
      caveat: 'Major work pays 20% in year one (not 50%). For a $1,200 crown, the plan pays about $240 in year one. The 50% rate arrives in year two.',
      dollar: 'For a $1,200 crown in year one: plan pays about $240 (20% in-network). In year two: about $600 (50%). Not available in Massachusetts.',
      stateFlag: 'Not available in Massachusetts'
    },
    'guardian-premier-ppo': {
      name: 'Guardian Premier 2.0',
      anchor: '#stop-guardian',
      story: 'The plan with the highest day-one filling coverage on the shelf -- 85% in-network -- and the only individual plan that covers dependent child orthodontics.',
      keyFact: '85% day-one basic',
      caveat: '12-month wait on major work, implants, and child orthodontics. Adult orthodontics is not covered on any Guardian individual plan. A 12-month re-enrollment lockout applies if you cancel.',
      dollar: 'Child braces ($6,000 case): Guardian contributes up to $1,500 lifetime ($750 per benefit year). Estimated plan contribution over two years: $1,500 (25% of cost).',
      stateFlag: null
    },
    'humana-extend-5000': {
      name: 'Humana Extend 5000',
      anchor: '#stop-humana',
      story: 'The high-ceiling plan: $5,000 annual maximum with dental, vision, and hearing bundled on one policy. Major work opens after a 6-month wait at 50%, rising to 60% in year two.',
      keyFact: '$5,000 annual maximum',
      caveat: 'Orthodontics is not covered (explicit exclusion). Implant wait is 6 months and cannot be waived. Annual implant sub-cap: $2,000 per person.',
      dollar: 'For a $1,200 crown after the 6-month wait: plan pays about $600 in year one (50%). About $720 in year two (60%).',
      stateFlag: null
    },
    'mutual-of-omaha-dental': {
      name: 'Mutual of Omaha Dental Preferred',
      anchor: '#stop-moo',
      story: 'Community-rated pricing that does not rise with age, a selectable $5,000 annual maximum, and no waiting periods on major work. The plan built for the retirement-age buyer.',
      keyFact: 'Community-rated, no major waits',
      caveat: 'Major work pays 20% in year one (not 50%). For a $1,200 crown, the plan pays about $240 in year one. The 50% rate arrives in year two. Activation timing is unverified; confirm start date with the carrier.',
      dollar: 'For a $1,200 crown in year one: about $240 (20%). In year two: about $600 (50%). For a $4,000 implant: lifetime implant cap is $3,000 (Preferred tier).',
      stateFlag: null
    },
    'metlife-ncd-complete': {
      name: 'MetLife NCD Complete',
      anchor: '#stop-metlife',
      story: 'The highest annual ceiling on the shelf: $10,000 per year with a one-time $100 lifetime deductible, no waiting periods, and a $3,000 annual implant sub-cap.',
      keyFact: '$10,000 annual maximum',
      caveat: 'Major work pays only 10% in year one (the lowest year-one rate on the shelf). For a $1,200 crown, the plan pays about $120 in year one. The 50% rate arrives in year two, 60% in year three.',
      dollar: 'For a $4,000 implant in year one: plan pays about $400 (10%). In year two: about $2,000 (50%), up to the $3,000 annual implant cap.',
      stateFlag: null
    },
    'delta-dental-ppo-premium': {
      name: 'Delta Dental PPO Premium',
      anchor: '#stop-delta',
      story: 'The largest dentist network on the shelf -- 112,000+ dentists, 278,000+ locations -- and the only individual plan that covers adult orthodontics including Invisalign.',
      keyFact: '112,000+ dentists in-network',
      caveat: 'Available as an individual plan in 16 states plus DC only. All waiting periods are 12 months (major, implants, ortho). Annual maximum is $2,000 per person per year.',
      dollar: 'Adult Invisalign ($5,800 case): Delta pays up to $1,500 lifetime (minus $50 ortho deductible). Estimated out-of-pocket for orthodontics: about $4,350. The plan also covers cleanings and fillings.',
      stateFlag: 'Available in 16 states + DC only as an individual plan'
    }
  };

  var WARNING_ORTHO = '<p class="eyebrow" style="color:var(--warning)">IMPORTANT: 12-MONTH WAIT ON ALL ORTHO PLANS</p>' +
    '<p style="font-size:15px;color:var(--ink-2)">Both plans on this shelf that cover orthodontics require a 12-month waiting period before the benefit applies. ' +
    'There is no way to waive this wait for orthodontics. If treatment starts within 12 months, the ortho benefit will not apply. ' +
    'You can enroll now to start the clock and use the benefit from month 13 onward.</p>' +
    '<p style="margin-top:12px;font-size:14px;color:var(--ink-3)">Plans that cover ortho: <a href="#stop-guardian">Guardian Premier 2.0</a> (children under 19) and ' +
    '<a href="#stop-delta">Delta Dental PPO Premium</a> (adults and children, 16 states + DC).</p>';

  // ── STATE ─────────────────────────────────────────────────────────────
  var state = { situation: null, timing: null };

  // ── HELPERS ───────────────────────────────────────────────────────────
  function qs(sel, ctx){ return (ctx||document).querySelector(sel); }
  function qsa(sel, ctx){ return [...((ctx||document).querySelectorAll(sel))]; }

  function setChipActive(chip, group){
    qsa('[role="radio"]', group).forEach(function(b){
      b.setAttribute('aria-checked','false');
    });
    chip.setAttribute('aria-checked','true');
  }

  function showStep2(){
    var s2 = qs('#sf-step2');
    s2.classList.add('visible');
    s2.setAttribute('aria-hidden','false');
  }

  function buildAnswerHTML(route, situation, timing){
    if(route.warning){
      return '<div role="alert">' + WARNING_ORTHO + '</div>';
    }
    var plan = PLANS[route.hero];
    var runner = route.runner ? PLANS[route.runner] : null;
    if(!plan) return '';

    var flags = '';
    if(plan.stateFlag){
      flags += '<span class="chip chip.warn" style="display:inline-flex;margin-right:6px">' + plan.stateFlag + '</span>';
    }
    if(runner && runner.stateFlag){
      flags += '<span class="chip chip.warn" style="display:inline-flex">' + runner.stateFlag + '</span>';
    }

    var runnerHTML = runner ?
      '<p style="margin-top:14px;font-size:13.5px;color:var(--ink-3)">Runner-up: <a href="' + runner.anchor + '">' + runner.name + '</a></p>' : '';

    return '<p class="eyebrow">BEST FIT FOR YOUR SITUATION</p>' +
      '<p class="sf-plan-name">' + plan.name + '</p>' +
      '<p class="sf-story">' + plan.story + '</p>' +
      '<div class="sf-chips-row">' +
        '<span class="chip brand">' + plan.keyFact + '</span>' +
        (flags ? flags : '') +
      '</div>' +
      '<div class="sf-dollar">' + plan.dollar + '</div>' +
      '<div class="sf-skipif" role="note" aria-label="Caveat: when to skip this plan">' +
        '<strong>Skip it if:</strong>' + plan.caveat +
      '</div>' +
      '<div class="sf-cta-row">' +
        '<a href="' + plan.anchor + '" class="btn btn-pri" style="font-size:14px;min-height:44px">' +
          'Read the full plan story' +
        '</a>' +
        '<a href="#plan-stories" class="btn btn-out" style="font-size:14px;min-height:44px">' +
          'See all 8 plans' +
        '</a>' +
      '</div>' +
      runnerHTML +
      '<button class="sf-reset" id="sf-reset-btn" aria-label="Clear scenario selections and start over">' +
        'Start over' +
      '</button>';
  }

  function tryRender(){
    if(!state.situation || !state.timing) return;
    var situationRoutes = ROUTES[state.situation];
    if(!situationRoutes) return;
    var route = situationRoutes[state.timing] || situationRoutes['any'];
    if(!route) return;

    var answerEl = qs('#sf-answer');
    answerEl.innerHTML = buildAnswerHTML(route, state.situation, state.timing);
    answerEl.classList.add('visible');
    if(route.warning){ answerEl.classList.add('warning'); }
    else { answerEl.classList.remove('warning'); }

    // Store for Widget 5 (share) and Widget 4 (match indicator)
    if(!route.warning && route.hero){
      try {
        sessionStorage.setItem('cc_scenario', JSON.stringify({
          household: sessionStorage.getItem('cc_household') || 'unknown',
          situation: state.situation,
          timing: state.timing,
          hero_plan: route.hero,
          runner_up: route.runner || null,
          timestamp: Date.now()
        }));
        sessionStorage.setItem('cc_hero_plan', route.hero);
      } catch(e){}
    }

    // Analytics
    if(typeof gtag === 'function'){
      gtag('event','scenario_result',{
        widget:'scenario_finder',
        hero_plan: route.hero || 'warning',
        situation: state.situation,
        timing: state.timing
      });
    }

    // Scroll into view
    answerEl.scrollIntoView({behavior:'smooth',block:'nearest'});

    // Wire reset
    var resetBtn = qs('#sf-reset-btn');
    if(resetBtn){
      resetBtn.addEventListener('click', function(){
        state.situation = null;
        state.timing = null;
        qsa('[role="radio"]',qs('#sf-chip-grid')).forEach(function(b){b.setAttribute('aria-checked','false');});
        qsa('[role="radio"]',qs('#sf-step2')).forEach(function(b){b.setAttribute('aria-checked','false');});
        var s2 = qs('#sf-step2');
        s2.classList.remove('visible');
        s2.setAttribute('aria-hidden','true');
        answerEl.classList.remove('visible','warning');
        answerEl.innerHTML = '';
        if(typeof gtag === 'function'){ gtag('event','scenario_reset',{widget:'scenario_finder'}); }
      });
    }

    // Update match indicator bars on plan cards (Widget 4)
    if(!route.warning && route.hero){
      qsa('.tour-stop').forEach(function(card){
        var bar = card.querySelector('.match-bar');
        if(!bar) return;
        if(card.dataset.plan === route.hero){
          bar.textContent = 'Matches your situation';
          bar.className = 'match-bar match-yes';
        } else {
          bar.textContent = 'Not your best match';
          bar.className = 'match-bar match-no';
        }
        bar.hidden = false;
      });
    }
  }

  // ── EVENT LISTENERS ────────────────────────────────────────────────
  // Step 1 chips
  qsa('#sf-chip-grid .sf-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      setChipActive(chip, qs('#sf-chip-grid'));
      state.situation = chip.dataset.situation;
      state.timing = null; // reset timing on new situation
      qsa('[role="radio"]', qs('#sf-step2')).forEach(function(b){b.setAttribute('aria-checked','false');});
      showStep2();
      if(typeof gtag === 'function'){
        gtag('event','scenario_step1',{widget:'scenario_finder',situation:chip.dataset.situation});
      }
      // Auto-scroll step 2 into view
      qs('#sf-step2').scrollIntoView({behavior:'smooth',block:'nearest'});
    });
    // Keyboard support within radiogroup
    chip.addEventListener('keydown', function(e){
      var chips = qsa('#sf-chip-grid .sf-chip');
      var idx = chips.indexOf(chip);
      if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
        e.preventDefault();
        chips[(idx+1)%chips.length].focus();
      }
      if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
        e.preventDefault();
        chips[(idx-1+chips.length)%chips.length].focus();
      }
    });
  });

  // Step 2 timing buttons
  qsa('#sf-step2 .sf-timing-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      setChipActive(btn, qs('#sf-step2'));
      state.timing = btn.dataset.timing;
      if(typeof gtag === 'function'){
        gtag('event','scenario_step2',{widget:'scenario_finder',situation:state.situation,timing:state.timing});
      }
      tryRender();
    });
    btn.addEventListener('keydown', function(e){
      var btns = qsa('#sf-step2 .sf-timing-btn');
      var idx = btns.indexOf(btn);
      if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
        e.preventDefault(); btns[(idx+1)%btns.length].focus();
      }
      if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
        e.preventDefault(); btns[(idx-1+btns.length)%btns.length].focus();
      }
    });
  });

  // Read household from Widget 1 and pre-set mode
  try {
    var hh = sessionStorage.getItem('cc_household');
    if(hh === 'family' || hh === 'self_kids'){
      qs('#sf-family').setAttribute('aria-pressed','true');
      qs('#sf-individual').setAttribute('aria-pressed','false');
      /* FILL: swap chip grid to family mode chips */
    }
  } catch(e){}

})();
</script>
</section>
<!-- end #scenario-finder -->
```

---

## Skeleton HTML + CSS + JS: Widget 3 (Family Builder)

```html
<!-- ═══════════════════════════════════════════════
     FAMILY BUILDER WIDGET
     Anchor: #family-builder
     Writes: analytics only. No personal data stored.
     ═══════════════════════════════════════════════ -->
<section id="family-builder" aria-labelledby="fb-heading" data-widget="family-builder">
<style>
#family-builder{padding:32px 0}
#family-builder .fb-members{display:flex;flex-direction:column;gap:12px;margin-bottom:16px}
#family-builder .fb-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:18px 20px}
#family-builder .fb-card legend{font-size:14px;font-weight:600;color:var(--ink);margin-bottom:14px}
#family-builder .fb-who-toggle{display:flex;gap:6px;margin-bottom:14px}
#family-builder .fb-who-btn{padding:7px 16px;border-radius:var(--r-pill);font-size:13.5px;font-weight:600;background:var(--surface);border:1px solid var(--line);color:var(--ink-2);cursor:pointer;transition:.15s}
#family-builder .fb-who-btn[aria-checked="true"]{background:var(--teal-tint);border-color:var(--teal-strong);color:var(--teal-ink)}
#family-builder .fb-need-label{font-size:12.5px;font-weight:600;color:var(--ink-3);margin-bottom:5px;display:block}
#family-builder select.fb-need{width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:var(--r-sm);font:inherit;font-size:14px;color:var(--ink);background:var(--surface);cursor:pointer}
#family-builder .fb-remove{display:block;margin-top:10px;font-size:12.5px;color:var(--ink-3);background:none;border:none;cursor:pointer;padding:0;text-decoration:underline}
#family-builder .fb-add-btn{padding:10px 22px;border-radius:var(--r-pill);font-size:14px;font-weight:600;background:var(--surface);border:1px solid var(--line);color:var(--ink-2);cursor:pointer;display:flex;align-items:center;gap:6px;transition:.15s}
#family-builder .fb-add-btn:hover{border-color:var(--teal);color:var(--teal-strong)}
#family-builder .fb-see-btn{display:inline-flex;align-items:center;padding:12px 24px;background:var(--teal-deep);color:#fff;border:none;border-radius:var(--r-sm);font:inherit;font-size:15px;font-weight:600;cursor:pointer;margin-top:14px}
#family-builder .fb-result{margin-top:20px;display:none}
#family-builder .fb-result.visible{display:block}
#family-builder .fb-result-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:18px 20px;margin-bottom:10px}
#family-builder .fb-result-name{font-size:16px;font-weight:700;color:var(--ink);margin-bottom:4px}
#family-builder .fb-result-plan{font-size:14px;color:var(--teal-strong);font-weight:600;margin-bottom:4px}
#family-builder .fb-result-note{font-size:13.5px;color:var(--ink-2)}
#family-builder .fb-econ-note{background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-sm);padding:14px 16px;font-size:13.5px;color:var(--ink-3);margin-top:12px}
#family-builder .fb-reset{font-size:13px;color:var(--ink-3);background:none;border:none;cursor:pointer;text-decoration:underline;padding:0;margin-top:12px;display:block}
</style>

<h2 id="fb-heading" style="font-size:clamp(21px,2.5vw,26px);font-weight:700;margin-bottom:8px">
  Build your family's dental plan combination
</h2>
<p style="font-size:16px;color:var(--ink-2);margin-bottom:24px;max-width:60ch">
  Add each family member and their primary dental need. We show which plan fits each person best.
  No math is computed. No information is stored.
</p>

<div class="fb-members" id="fb-members-list" aria-label="Family members">
  <!-- Member cards inserted by JS -->
  <p id="fb-placeholder" style="font-size:15px;color:var(--ink-3);padding:16px 0">
    Add at least two members to see a plan combination.
  </p>
</div>

<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
  <button class="fb-add-btn" id="fb-add-btn"
          aria-label="Add a family member">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
    Add a family member
  </button>

  <button class="fb-see-btn" id="fb-see-btn"
          style="display:none"
          aria-label="See recommended plans for this family combination">
    See combination
  </button>
</div>

<!-- Result panel -->
<div class="fb-result" id="fb-result" aria-live="polite" aria-atomic="false">
  <!-- Injected by JS -->
</div>

<script>
(function(){
  // Plan assignments per (who, need). Source: spec 08 Part 2.
  // All rationale text must be verified against /data/plans/*.md SSOT before build.
  var ASSIGNMENTS = {
    'adult_cleanings_only':     { plan:'UHC Primary Dental',           anchor:'#stop-uhc',      chip:'~$30/mo, 100% preventive day one', flag:null },
    'adult_fillings':           { plan:'Guardian Premier 2.0',         anchor:'#stop-guardian', chip:'85% day-one basic (highest on shelf)', flag:null },
    'adult_major_work':         { plan:'Ameritas PrimeStar',           anchor:'#stop-ameritas', chip:'No wait, 20% major day one', flag:'Not available in MA' },
    'adult_implant':            { plan:'MetLife NCD Complete',         anchor:'#stop-metlife',  chip:'$10,000 max, $3,000/yr implant cap', flag:null },
    'adult_adult_ortho':        { plan:'Delta Dental PPO Premium',     anchor:'#stop-delta',    chip:'Only plan with adult ortho', flag:'16 states + DC only' },
    'senior_cleanings_only':    { plan:'Mutual of Omaha Dental Preferred', anchor:'#stop-moo',  chip:'Community-rated, no waits', flag:null },
    'senior_fillings':          { plan:'Mutual of Omaha Dental Preferred', anchor:'#stop-moo',  chip:'80% basic from day one, no waits', flag:null },
    'senior_major_work':        { plan:'Mutual of Omaha Dental Preferred', anchor:'#stop-moo',  chip:'No major wait, $5,000 selectable max', flag:null },
    'senior_implant':           { plan:'Mutual of Omaha Dental Preferred', anchor:'#stop-moo',  chip:'No implant wait, $3,000 lifetime implant cap', flag:null },
    'child_cleanings_only':     { plan:'Aetna Dental Direct',          anchor:'#stop-aetna',    chip:'100% preventive, $150 family deductible cap', flag:'CVS perk not in 9 states' },
    'child_fillings':           { plan:'Guardian Premier 2.0',         anchor:'#stop-guardian', chip:'85% day-one basic', flag:null },
    'child_kids_ortho':         { plan:'Guardian Premier 2.0',         anchor:'#stop-guardian', chip:'60% in-network child ortho, $1,500 lifetime max', flag:'12-month wait, cannot be waived for ortho' }
  };

  var MAX_MEMBERS = 4;
  var members = [];
  var memberCounter = 0;

  function getKey(who, need){ return who + '_' + need; }

  function addMemberCard(){
    if(members.length >= MAX_MEMBERS) return;
    memberCounter++;
    var idx = members.length;
    var id = 'fb-member-' + memberCounter;
    members.push({ id: id, who: 'adult', need: 'cleanings_only' });

    var placeholder = document.getElementById('fb-placeholder');
    if(placeholder) placeholder.style.display = 'none';

    var fieldset = document.createElement('fieldset');
    fieldset.className = 'fb-card';
    fieldset.id = id;
    fieldset.innerHTML =
      '<legend>Family member ' + memberCounter + '</legend>' +
      '<div class="fb-who-toggle" role="radiogroup" aria-label="Member type">' +
        '<button class="fb-who-btn" role="radio" aria-checked="true" data-who="adult" data-member="' + id + '">Adult</button>' +
        '<button class="fb-who-btn" role="radio" aria-checked="false" data-who="senior" data-member="' + id + '">Senior 65+</button>' +
        '<button class="fb-who-btn" role="radio" aria-checked="false" data-who="child" data-member="' + id + '">Child</button>' +
      '</div>' +
      '<label class="fb-need-label" for="' + id + '-need">Primary dental need</label>' +
      '<select class="fb-need" id="' + id + '-need" data-member="' + id + '">' +
        '<option value="cleanings_only">Cleanings only</option>' +
        '<option value="fillings">Fillings / cavities likely</option>' +
        '<option value="major_work">Crown or root canal coming</option>' +
        '<option value="implant">Implant needed</option>' +
        '<option value="kids_ortho">Braces (child, under 19)</option>' +
        '<option value="adult_ortho">Braces (adult)</option>' +
      '</select>' +
      '<button class="fb-remove" aria-label="Remove family member ' + memberCounter + '" data-member="' + id + '">Remove</button>';

    document.getElementById('fb-members-list').appendChild(fieldset);

    // Wire who-toggle
    fieldset.querySelectorAll('.fb-who-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        fieldset.querySelectorAll('.fb-who-btn').forEach(function(b){ b.setAttribute('aria-checked','false'); });
        btn.setAttribute('aria-checked','true');
        var m = members.find(function(x){ return x.id === id; });
        if(m) m.who = btn.dataset.who;
        // Filter select options by who
        var sel = fieldset.querySelector('select.fb-need');
        var kidsOrthoOpt = sel.querySelector('[value="kids_ortho"]');
        var adultOrthoOpt = sel.querySelector('[value="adult_ortho"]');
        if(btn.dataset.who === 'child'){
          if(kidsOrthoOpt) kidsOrthoOpt.style.display = '';
          if(adultOrthoOpt) adultOrthoOpt.style.display = 'none';
        } else {
          if(kidsOrthoOpt) kidsOrthoOpt.style.display = 'none';
          if(adultOrthoOpt) adultOrthoOpt.style.display = '';
        }
      });
    });

    // Wire need select
    fieldset.querySelector('select.fb-need').addEventListener('change', function(e){
      var m = members.find(function(x){ return x.id === id; });
      if(m) m.need = e.target.value;
    });

    // Wire remove
    fieldset.querySelector('.fb-remove').addEventListener('click', function(){
      fieldset.remove();
      members = members.filter(function(m){ return m.id !== id; });
      updateAddBtn();
      updateSeeBtn();
      if(members.length === 0){
        var ph = document.getElementById('fb-placeholder');
        if(ph) ph.style.display = '';
        document.getElementById('fb-result').classList.remove('visible');
      }
    });

    updateAddBtn();
    updateSeeBtn();
    if(typeof gtag === 'function'){
      gtag('event','family_builder_add_member',{ member_index: members.length });
    }
  }

  function updateAddBtn(){
    var btn = document.getElementById('fb-add-btn');
    if(!btn) return;
    if(members.length >= MAX_MEMBERS){
      btn.disabled = true;
      btn.setAttribute('aria-label','Maximum 4 members reached');
    } else {
      btn.disabled = false;
      btn.setAttribute('aria-label','Add a family member');
    }
  }

  function updateSeeBtn(){
    var btn = document.getElementById('fb-see-btn');
    if(!btn) return;
    btn.style.display = members.length >= 2 ? 'inline-flex' : 'none';
  }

  function renderResult(){
    var resultEl = document.getElementById('fb-result');
    if(!resultEl) return;
    var html = '';
    members.forEach(function(m, i){
      var key = getKey(m.who, m.need);
      var assignment = ASSIGNMENTS[key];
      var memberLabel = m.who === 'child' ? 'Child' : (m.who === 'senior' ? 'Senior 65+' : 'Adult');
      var needLabel = {
        cleanings_only: 'cleanings only',
        fillings: 'fillings / cavities',
        major_work: 'crown or root canal',
        implant: 'implant',
        kids_ortho: 'braces (child)',
        adult_ortho: 'braces (adult)'
      }[m.need] || m.need;

      if(!assignment){
        html += '<div class="fb-result-card">' +
          '<p class="fb-result-name">Member ' + (i+1) + ': ' + memberLabel + ' (' + needLabel + ')</p>' +
          '<p class="fb-result-note">No specific match on this shelf. See all plan stories below.</p>' +
          '</div>';
        return;
      }
      var flagHTML = assignment.flag ?
        '<span class="chip warn" style="display:inline-flex;font-size:11.5px;margin-top:6px">' + assignment.flag + '</span>' : '';
      html += '<div class="fb-result-card">' +
        '<p class="fb-result-name">Member ' + (i+1) + ': ' + memberLabel + ' (' + needLabel + ')</p>' +
        '<p class="fb-result-plan"><a href="' + assignment.anchor + '">' + assignment.plan + '</a></p>' +
        '<p class="fb-result-note">' + assignment.chip + '</p>' +
        (flagHTML ? flagHTML : '') +
        '</div>';
    });
    html += '<div class="fb-econ-note">' +
      '<strong>Family economics note:</strong> Each person holds an individual policy with their own annual maximum and deductible. ' +
      'Premiums and deductibles are per person. No family maximum is shared unless you enroll all members on the same carrier\'s family plan (if offered). ' +
      'Verify family plan options directly with each carrier before enrolling.' +
      '</div>' +
      '<button class="fb-reset" id="fb-reset-btn" aria-label="Clear family builder and start over">Start over</button>';

    resultEl.innerHTML = html;
    resultEl.classList.add('visible');

    var resetBtn = document.getElementById('fb-reset-btn');
    if(resetBtn){
      resetBtn.addEventListener('click', function(){
        document.getElementById('fb-members-list').querySelectorAll('.fb-card').forEach(function(el){ el.remove(); });
        members = [];
        memberCounter = 0;
        document.getElementById('fb-placeholder').style.display = '';
        resultEl.classList.remove('visible');
        resultEl.innerHTML = '';
        updateAddBtn();
        updateSeeBtn();
      });
    }

    if(typeof gtag === 'function'){
      gtag('event','family_builder_see_combination',{
        member_count: members.length,
        needs: members.map(function(m){ return m.who+'_'+m.need; }).join(',')
      });
    }

    resultEl.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }

  // Wire buttons
  document.getElementById('fb-add-btn').addEventListener('click', addMemberCard);
  document.getElementById('fb-see-btn').addEventListener('click', renderResult);

  // Seed one card
  addMemberCard();

})();
</script>
</section>
<!-- end #family-builder -->
```

---

## Implementation Priority Order

| Priority | Widget | Reason |
|---|---|---|
| 1 | Widget 2 -- Scenario Finder | Highest conversion impact; replaces current `.picker`; addresses every persona in spec 09 |
| 2 | Widget 1 -- Coverage Chooser | Hero entry; feeds Widget 2 context; low implementation cost; high first-impression impact |
| 3 | Widget 4 -- Plan Matcher / Filter | Adds match indicator bars to plan cards once Widget 2 is live; low additional cost |
| 4 | Widget 3 -- Family Builder | Medium implementation; high value for family buyer segment; important SEO topic |
| 5 | Widget 5 -- Share / Save | Low complexity; high retention and shareability impact; implement after core conversion widgets |

---

## What NOT to Build

Following constraints from 00-INDEX, CLAUDE.md, and spec 10 Section 21:

- No heavy calculator. No premium comparison slider. No dynamic premium lookups.
- No member ID field anywhere in any widget.
- No countdown timers or "limited time" urgency mechanics.
- No glassmorphism or gradient fills on widget cards.
- No em-dashes in any widget copy.
- No fabricated plan statistics. Every dollar example uses representative procedure costs labeled as approximate.
- No storage of health data, personal identifiers, or dental treatment information beyond sessionStorage for session-scoped UX state.
- No family maximum calculation displayed as a precise figure (the family economics note uses plain language only).
- No guarantee of plan availability, premium, or coverage in any widget copy.

---

## Glossary Hook (for Spec 09 Comprehension Blockers)

Spec 09 identified insurance jargon as a top comprehension blocker. Each widget's answer block and result panel must link ambiguous terms to inline tooltip definitions, not a separate glossary page. Recommended terms to tooltip on first use per page session:

| Term | Plain-language definition (max 20 words) |
|---|---|
| Major services | Crowns, root canals, dentures, bridges. The expensive work after something goes wrong. |
| Basic services | Fillings and simple extractions. The middle tier between cleanings and major work. |
| Coinsurance | The percentage the plan pays after your deductible. You pay the rest. |
| Annual maximum | The most the plan will pay in one calendar year across all covered services. |
| Waiting period | The months between enrollment and when a service category becomes covered. |
| Lifetime maximum | A cap that does not reset each year. Ortho and implant caps are often lifetime, not annual. |
| Community-rated | Pricing that does not change based on your age. You pay the same rate at 65 as at 35. |
| Creditable coverage | Prior dental insurance that a carrier will recognize to waive your waiting period. |

Tooltip implementation: a `<button>` with `class="glossary-trigger"` wrapping the term, rendering a `role="tooltip"` popover on click/focus. No page navigation. No modal overlay.

---

*End of 11-interaction-widgets-spec.md*
*Spec 11 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are approved.*
*All plan facts must be verified against `/data/plans/{slug}.md` SSOT files before any page copy is finalized.*
