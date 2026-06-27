# 10 — UX Flow and Wireframe: PPO Plans Hub Rebuild
## /dental-insurance/ppo-plans/ — Scenario-First, Three-Column Layout
### CoverCapy PPO Hub Rebuild Program | Spec 10 of 20

---

## 1. DESIGN INTENT AND EMOTIONAL DIRECTION

This page is not a comparison table with a hero image bolted on. It is a guided conversation that starts with the visitor's situation and ends with a named plan, a verified dentist, and enough confidence to act.

Emotional register: calm authority, like a knowledgeable friend who happens to know dental insurance cold. Not a sales page, not a government portal, not a price-comparison grid. The register is boutique hotel concierge meets independent editorial guide. The visitor should feel helped, not sold.

Visual direction:
- Ground color: `--paper` (#FFFCF6). Off-white, warm, slightly textured in feel even though it is flat.
- Typography hierarchy: Fraunces serif for every H1, H2, and plan name. Inter Tight for all UI, labels, metadata, and body prose.
- Accent gold (`--gold-deep`, `--gold-soft`) for overlines, eyebrows, and scenario entry markers.
- Teal family (`--deep`, `--deep-2`, `--teal`) for CTAs, link text, and trust signals.
- Cards sit on white against the warm paper background. No gradients on plan cards. No glassmorphism. No countdown timers.
- White space is generous. The three-column layout creates visual breathing room, not clutter.
- Mobile collapses both rails into an inline stack; scenario finder becomes a full-width drawer.

---

## 2. THREE-COLUMN LAYOUT OVERVIEW

### Desktop (viewport >= 1080px)

```
+-------------------------------------------------------------+
|  MEGA NAV (full width, shared component)                    |
+-------------------------------------------------------------+
|  BREADCRUMB: Home > Dental Insurance > PPO Plans            |
+------------------+------------------------+-----------------+
|                  |                        |                 |
|  LEFT RAIL       |  CENTER CONTENT        |  RIGHT RAIL     |
|  240px fixed     |  flex, max 680px       |  240px fixed    |
|                  |                        |                 |
|  (sticky after   |  (scrolls normally)    |  (sticky after  |
|  hero passes     |                        |  hero passes    |
|  viewport top)   |                        |  viewport top)  |
|                  |                        |                 |
+------------------+------------------------+-----------------+
|  FOOTER (full width, shared component)                      |
+-------------------------------------------------------------+
```

Column gutters: 28px each side of center column.
Total canvas: min(1160px, 100% - 40px), centered.
Left rail: 220px. Right rail: 220px. Center column: remaining space, max ~680px.

### Mobile (viewport < 768px)

Single column. Left rail content collapses to a horizontal pill-strip scenario nav below the hero. Right rail content stacks as inline cards between plan stories and the FAQ. Sticky bar replaces sticky rail elements. See Section 10 for full mobile spec.

---

## 3. LEFT RAIL SPECIFICATION

### Purpose
Scenario navigation, jump links, "for who" filtering, and a persistent plan-finder shortcut. The left rail is the site's memory of where the visitor is in the page and what kind of buyer they are.

### Rail contents (top to bottom, stacks in this order)

**Block L1 — Scenario Nav (sticky from hero-bottom)**
Label: "YOUR SITUATION" (12px, uppercase, letter-spaced, `--gold-deep`)
A vertical list of 8 scenario chips, one per life event. Active chip highlights in `--mint-soft` with a teal-left border. Clicking a chip scrolls center column to that plan's "story" card.

```
[ ] I just need cleanings        --> #stop-uhc
[ ] A crown is coming            --> #stop-aetna (waiver note)
[ ] Big work, no wait            --> #stop-ameritas
[ ] Braces for my kid            --> #stop-guardian
[ ] Left a job with dental       --> #stop-aetna
[ ] One implant ahead            --> #stop-humana / #stop-moo
[ ] Heavy year of work           --> #stop-moo / #stop-metlife
[ ] Largest network              --> #stop-delta
```

Interaction: single-select. On click, highlight chip + smooth-scroll center column to plan anchor. No page reload.

**Block L2 — Jump Links (section nav)**
Label: "ON THIS PAGE" (12px, uppercase, `--ink-faint`)
Vertical list of anchor links matching center column H2 sections. Active section highlights as visitor scrolls.

```
Who is this for?
The scenario finder
Plan stories (all 8)
Compare the shelf
Best for your need
How waiting periods work
Verify your dentist
FAQ
```

**Block L3 — Coverage Type Filter (below jump links)**
Label: "FILTER BY NEED" (12px, uppercase, `--ink-faint`)
Four pill toggles (multi-select allowed):
- Preventive only
- Basic + major
- Implants
- Ortho / braces

When toggled, plan story cards in the center column that do not match dim to 40% opacity. No page reload. Pure CSS class toggle via JS.

**Block L4 — Plan Finder Shortcut (bottom of rail, not sticky)**
A compact card (border, `--cream-card` background):
- Label: "Not sure where to start?"
- One-sentence teaser: "Answer 3 questions and we match you to a plan."
- Button: "Open Plan Finder" (scrolls to scenario finder widget in center column)
- Small capybara icon (SVG, 24px, `--teal-300`)

---

## 4. RIGHT RAIL SPECIFICATION

### Purpose
Feature placements, Aetna/CVS perks spotlight, Capy Rewards teaser, dentist-verify shortcut, and a soft monetization lane. The right rail earns its space by adding information that is relevant without being interrupting.

### Rail contents (top to bottom, stacks in this order)

**Block R1 — Dentist Verify CTA (sticky, top of rail)**
A compact card with teal border:
- Eyebrow: "STEP 1 BEFORE YOU BUY" (11px, uppercase, `--teal-300`)
- Headline: "Does your dentist take this plan?" (Fraunces, 17px)
- Body: "We verify it free, before any money moves." (14px, `--ink-soft`)
- Button: "Find my dentist" (full width, `--deep` background, white text)
- Subtext: "6,400+ verified PPO offices" (12px, `--ink-faint`)

This card is the highest-value real estate on the right rail. It is always visible when the visitor is reading plan stories.

**Block R2 — Aetna + CVS ExtraCare Spotlight**
Placed adjacent to the Aetna plan story in the center column (positioned via sticky context so it aligns when visitor is at that scroll position, falls back to static if alignment is complex).
- Eyebrow: "CVS HEALTH PERK" (11px, `--gold-deep`)
- Headline: "Aetna members get $10/mo CVS Reward + 20% off CVS Health brand"
- Body: One sentence, verified against SSOT before build.
- Link: "See the full Aetna plan review"
- Background: `--gold-faint`, border `--gold-soft`, radius 18px.

**Block R3 — Capy Rewards Teaser**
- Eyebrow: "CAPY REWARDS" (11px, `--teal-300`)
- Headline: "Earn Capy points when you verify and enroll through CoverCapy"
- Body: "Points unlock discounts with accredited providers. Free to join." (14px)
- CTA link: "See how Capy Rewards work" (anchor, not modal)
- Icon: small capybara (SVG, 28px)
- Background: `--teal-faint`, border `--teal-mist`, radius 18px.
- Note: This is a soft teaser only. No fabricated point values until Capy Rewards is launched.

**Block R4 — Family Builder Shortcut**
- Label: "PLANNING FOR A FAMILY?" (11px, uppercase, `--ink-faint`)
- Teaser: "Guardian for braces. Aetna for CVS. Humana for implants. All three in one household?"
- CTA: "Open the family scenario finder" (scrolls center column to family-mode toggle)
- Background: white, border `--line`, radius 18px.

**Block R5 — Share + Save (bottom of rail)**
- Label: "SHARE THIS GUIDE" (11px, uppercase, `--ink-faint`)
- Row of share targets: Copy link, Email, Text
- Below: "Bookmark for later" (uses navigator.share if available, fallback to copy link)
- Purpose: retention and shareability (from 00-INDEX goal: highly shareable)

---

## 5. HERO SECTION (CENTER COLUMN)

### Purpose
Convert a confused visitor into a scenario-aware one within 8 seconds. Scenario-first entry replaces the current plan-first headline.

### Hero layout

```
+----------------------------------------------+
| EYEBROW: CoverCapy · PPO Plans, Guided       |
|                                              |
| H1 (Fraunces, 38-46px, max 22ch):           |
| "Which PPO dental plan fits                 |
|  YOUR situation?"                            |
|                                              |
| LEDE (Inter Tight, 17px, max 58ch):         |
| [One sentence naming the concierge          |
|  approach, verified plans, scenario-first]  |
|                                              |
| META PILLS ROW:                              |
| [8 plans verified] [From ~$30/mo] [June 2026]|
|                                              |
| WHO NEEDS COVERAGE? CHOOSER (see below)     |
|                                              |
| CTA ROW:                                     |
| [Find my plan - primary] [Compare table]    |
|                                              |
+----------------------------------------------+
```

### "Who needs coverage?" chooser (inline hero widget)

This is the hero's scenario-first entry. It is not a full wizard, it is a 4-button membership selector that gates the scenario finder below it.

Label: "Who needs coverage?" (14px, 700 weight, `--ink-soft`)

Four pill buttons (horizontal row, wraps on narrow):
```
[ Just me ]  [ Me + kids ]  [ Me + spouse ]  [ Whole family ]
```

On select:
- Button highlights (active state: `--deep` bg, white text, border none)
- A brief inline answer block appears below the chooser row (same pattern as current `.picker-answer` but richer):

  - "Just me": "Eight individual plans from $30 to $100/mo. Pick by what your mouth needs in the next 12 months, not by brand."
  - "Me + kids": "Guardian Premier 2.0 is the only plan with dependent ortho. Pair it with a second individual plan for you if braces are in the plan."
  - "Me + spouse": "Two individual policies often beat one family plan on this shelf. Use the scenario finder to run the math for your two treatment plans."
  - "Whole family": "Aetna's CVS perks, Humana's loyalty economics, and Guardian's ortho coverage are the three family-relevant plans. See the family scenario section below."

- CTA below the answer block: "Show me the right plans for this" (scrolls to scenario finder, pre-selects household type)

Accessibility: `role="radiogroup"` on the chooser div, each button is `role="radio"` with `aria-checked`. Answer block has `aria-live="polite"`.

---

## 6. SCENARIO FINDER SECTION (CENTER COLUMN)

### Purpose
Conversion. This is the top-of-funnel interactive widget. It replaces the current `.picker` section but is richer: it accepts household type from the hero chooser and adds treatment context.

### Placement
Immediately below the hero, above plan stories. Section anchor: `#scenario-finder`.

### Layout

```
+----------------------------------------------+
| H2 (Fraunces): "Start with your situation,  |
|  not a brand name"                           |
|                                              |
| STEP 1: [situation chips, same 8 as left rail|
|          but displayed as 2x4 grid of cards] |
|                                              |
| STEP 2 (appears after Step 1 selection):    |
| "How soon do you need treatment?"           |
| [ Right now ] [ In 3-6 months ] [ Next year ]|
|                                              |
| ANSWER BLOCK (appears after Step 2):        |
| Plan name, one-line story, key number,       |
| "Skip it if" note, CTA to plan story below  |
|                                              |
| Secondary: "Not sure? See all 8 plan stories |
| below and decide for yourself."             |
+----------------------------------------------+
```

Situation chips (Step 1) are full-card buttons (not just text pills), each card shows:
- Icon glyph (SVG, 20px, `--teal-300`)
- Label (15px, 700, `--deep`)
- One-line hint (13px, `--ink-mute`)

Chip labels and hints:
| Chip | Hint |
|------|------|
| Cleanings + checkups | Maintenance only, no work coming |
| Crown is coming | Major work within 12 months |
| Implant ahead | One or more missing/failing teeth |
| Braces for my kid | Dependent under 19 |
| Left a job with dental | Had coverage in last 90 days |
| Big work year | Crown, root canal, multiple procedures |
| Seniors / 65+ | Medicare-adjacent or retired |
| Largest network | My dentist matters most |

The "Seniors / 65+" chip maps to Mutual of Omaha with its "no-wait major, lifetime implant, selectable max" positioning. This is new content not in the current page.

The "Largest network" chip maps to Delta Dental hub.

### Answer block structure (reuses `.picker-answer` styling, slightly expanded)

```
+-------------------------------------+
| EYEBROW: OUR RECOMMENDATION        |
| Plan name (Fraunces, 20px)         |
| "The story in one sentence"        |
|                                     |
| KEY FACT PILL: [e.g. 6-mo wait]   |
|                                     |
| Skip if: [short caveat]            |
|                                     |
| [Read the full plan story below]   |
| [Open side-by-side comparison]     |
+-------------------------------------+
```

Family/individual toggle:
A segmented toggle sits above Step 1 chips: `[ Individual ] [ Family ]`
- Individual (default): shows 8 chips as above.
- Family: collapses to 4 family-specific scenarios:
  - "Braces for a child" (Guardian)
  - "Implant for one adult + maintenance for the rest" (Humana + UHC combo suggestion)
  - "Two adults, one big work year" (MOO or MetLife)
  - "Whole family, CVS shoppers" (Aetna)

Family mode surfaces the family deductible and family maximum math from spec 07-family-economics.md once that data is verified. Until then, a note: "Family pricing varies by carrier. We'll add family rate math here when carriers publish 2026 group rates."

---

## 7. PLAN STORIES SECTION (CENTER COLUMN)

### Purpose
SEO and trust. These are the plan narratives that are the strongest differentiation on the page. They must be preserved and enhanced, not truncated.

### Placement
Below scenario finder. Section anchor: `#plan-stories`.

Section header:
```
H2: "Eight PPO plans, each with a story"
LEDE: "Walk the shelf from cheapest to strongest. 
       Each stop tells you who the plan was built for 
       and who should keep walking."
```

### Plan story card (`.tour-stop`) redesign

Current `.tour-stop` is a good foundation. The rebuild adds:

1. A "match indicator" bar at the top of each card: appears only if visitor has completed scenario finder, shows "Matches your situation" (green) or "Not your best match" (muted) based on scenario selection.

2. A compact right-sidebar panel inside each card (desktop only, 200px wide, floated right inside the card):
   ```
   +---------------------+
   | QUICK FACTS         |
   | ~$X/mo              |
   | $Y,000 annual max   |
   | Waiting: [summary]  |
   | Implants: [Y/N]     |
   | Ortho: [Y/N]        |
   +---------------------+
   | [Verify dentist]    |
   | [Full review]       |
   +---------------------+
   ```
   This mini-panel is the conversion surface inside each card. The CTA "Verify my dentist takes this plan" links to `/find-my-dentist` with a `?plan=` query param pre-set to the carrier slug.

3. Card numbering eyebrow updated from "Stop 01 of 07" to "Stop 01 of 08" (Delta Dental included as Stop 08 via its hub feature card, which already exists in the current page).

4. The "Skip it if:" line is styled as its own component: bordered note box, gold-faint background, bold label, more visible than current inline `<p>`.

Order of plan story cards (cheapest to strongest, preserving current logic):
1. UHC Primary Dental (#stop-uhc)
2. Aetna Dental Direct (#stop-aetna)
3. Ameritas PrimeStar Complete (#stop-ameritas)
4. Guardian Premier 2.0 (#stop-guardian)
5. MetLife NCD Complete (#stop-metlife)
6. Mutual of Omaha Dental Preferred (#stop-moo)
7. Humana Extend 5000 (#stop-humana)
8. Delta Dental PPO (hub feature card, #stop-delta)

---

## 8. COMPARISON TABLE SECTION (CENTER COLUMN)

### Purpose
SEO entity coverage and GEO citation (AI systems frequently surface comparison tables). Retain and improve current table.

### Changes from current
- Table becomes horizontally scrollable on all viewports via a `<div class="table-scroll">` wrapper.
- Add a "Best for" column (rightmost): short label per plan (e.g. "Maintenance", "Waiver play", "No waits", "Kids braces", "High ceiling", "One big implant", "Fastest implant", "Largest network").
- "Verify dentist" column becomes "Verify" with an icon button, not a text link.
- Table caption: "8 PPO dental plans compared, verified June 2026. Premiums estimated, vary by state and age."
- Schema: `ItemList` wrapping each row as a `ListItem` with `url` pointing to plan review page. Already implemented in current head scripts; verify it matches 8 plans.

### Section CTA
Below table:
```
[ Compare plans interactively ]  (links to /compare-ppo-dental-plans)
[ Find a dentist who takes your plan ]  (links to /find-my-dentist)
```

---

## 9. BEST FOR SCENARIOS GRID (CENTER COLUMN)

### Purpose
SEO (answer "best PPO dental plan for [need]" queries). Retention (reference section visitors bookmark).

### Changes from current
Current `.scenarios` grid is good. Rebuild adds:
- An 8th card for "Best for seniors / 65+" pointing to Mutual of Omaha.
- A "Family" mode toggle above the grid: `[ Individual ] [ Family ]`. In family mode, grid shows 4 family-scenario cards.
- Each scenario card gets a plan logo placeholder (32px colored icon, not carrier logo, just a plan-color dot) for visual differentiation.

Grid: `auto-fit, minmax(260px, 1fr)`, 3-across on desktop, 2-across on tablet, 1-across on mobile.

---

## 10. WAITING PERIODS EXPLAINER (CENTER COLUMN)

### Purpose
Education and trust. Reduces post-enrollment surprise and complaint. Aligns with "helpful friend" positioning.

### Changes from current
The current "Waiting periods: the clock is the product" section is excellent prose. Rebuild adds:

A visual timeline diagram below the prose (inline SVG or HTML/CSS):

```
TIMELINE: What each plan covers, month by month

Month:    0       3       6       12      24
          |       |       |       |       |
UHC       [Prev 100%][Basic 50%][--no major--]
Aetna     [Prev][----Basic (waiver possible)----][Major 50%]
Ameritas  [Prev][Basic 80-90%][Major 20-50%]
Guardian  [Prev][Basic 85%][---------][Major 50%][Ortho 50%]
MetLife   [Prev][-----------Major opens 6mo, graduated-----]
MOO       [Prev][Basic 80%][---------------][Major/Implant 50%]
Humana    [Prev][--][Basic 50% at 3mo][Major/Implant 50% at 6mo]
```

Each row is a colored horizontal bar. Color from plan's position on shelf (UHC = lightest, Humana = darkest). Bars are CSS `div` elements with `width` set as percentage of 24-month timeline. No JavaScript dependency; it degrades gracefully to text.

---

## 11. VERIFY CTA BAND (CENTER COLUMN)

### Purpose
Conversion. The single highest-priority action: verify dentist acceptance before enrolling.

### Changes from current
The current `.verify-band` (dark teal gradient) is retained. Rebuild version:
- Moves slightly: placed immediately AFTER plan stories and BEFORE the comparison table, not after FAQ.
- Second verify band is placed after FAQ (same component, second instance).
- The band headline changes to: "The step everyone skips and we will not let you."
- Adds a secondary input: a small inline search bar with placeholder "Enter your dentist's name or city" that routes to `/find-my-dentist?q=` on submit. This is a higher-conversion entry point than a generic button.

---

## 12. FAMILY SECTION (CENTER COLUMN, NEW)

### Purpose
Conversion for family buyers; SEO for "family dental insurance PPO" queries; addresses family economics from spec 07.

### Placement
After best-for-scenarios grid, before FAQ.

### Layout

```
+----------------------------------------------+
| H2: "Planning for more than just yourself"  |
|                                              |
| LEDE: "Individual PPO plans on this shelf   |
|  can be stacked for a family. Here is what  |
|  the numbers look like for the most common  |
|  family combinations."                      |
|                                              |
| FAMILY SCENARIO CARDS (2-column grid)       |
|                                              |
| [Card: Kids braces + parent maintenance]    |
| Guardian (kid) + UHC (parent)               |
| "Guardian ortho at 50% for your 13-year-old |
|  while UHC keeps your own checkups at $30." |
|                                              |
| [Card: One adult implant + partner basic]   |
| Humana (implant adult) + Ameritas (partner) |
| "Humana opens implant coverage at 6 months. |
|  Ameritas covers your partner from day one  |
|  with no waits."                            |
|                                              |
| [Card: Aetna CVS family]                   |
| Aetna for both adults                       |
| "Two Aetna policies: two CVS $10 monthly   |
|  rewards, both waivable if leaving jobs     |
|  within 90 days."                           |
|                                              |
| [Card: Heavy year for two]                 |
| Mutual of Omaha for both                    |
| "$5,000 cap each, 80% basics from day one. |
|  Two independent maximums do not share a   |
|  family ceiling."                           |
|                                              |
| NOTE: "Family deductible structures and     |
|  family maximum caps vary by carrier.       |
|  Verify with the carrier before enrolling." |
+----------------------------------------------+
```

Note: all plan facts in this section must be verified against SSOT files before build per CLAUDE.md rule 13.

---

## 13. FAQ SECTION (CENTER COLUMN)

### Purpose
SEO (FAQPage schema) and GEO (AI citation). Current FAQ is strong. Rebuild adds two new questions:

- "Is dental insurance worth it for a family?" (answer: depends on treatment plan, family deductible structure, and whether ortho is in scope)
- "Which PPO dental plan is best for seniors over 65?" (answer: Mutual of Omaha, its lifetime implant benefit, selectable max, and no-wait major. Verify against SSOT before writing answer text.)

Remove em-dash occurrences in current FAQ answers (there are several). Replace with commas, colons, or sentence breaks.

---

## 14. EDITORIAL FOOTER AND RELATED LINKS (CENTER COLUMN)

### Changes from current
- Current `.editorial` note retained. Update verified date to match actual rebuild date.
- Current `.related` link strip retained and extended:
  - Add: "PPO Plans for Seniors"
  - Add: "Family Dental Insurance"
  - Add: "Delta Dental Plans"
  - Add: "Dental Treatment Cost Estimator"
  - Keep existing: "Compare PPO Plans", "Find PPO Dentists", "Monthly Financing"

---

## 15. STICKY ELEMENTS

### Desktop sticky behavior

**Left rail** (Scenario Nav, Block L1): becomes sticky after hero scrolls past viewport top. `position: sticky; top: 24px`. Scenario nav highlights active chip as center column scrolls through plan story cards (IntersectionObserver on each `.tour-stop`).

**Right rail** (Dentist Verify CTA, Block R1): same sticky behavior. `position: sticky; top: 24px`. Remains visible while visitor reads plan stories.

**No sticky header** within the page (mega nav handles that at site level).

### Mobile sticky element

A sticky bar at the BOTTOM of the viewport on mobile only:
```
+-------------------------------------------------------+
| [Scenario finder]    [Verify dentist]    [Compare]    |
+-------------------------------------------------------+
```
Three icon-labeled buttons. The bar appears after the hero scrolls past viewport top and disappears when footer comes into view.
Height: 52px. Background: `--deep`. Text: white. Icons: 18px SVG.
`aria-label="Quick actions"`. Dismissible via a small X if user explicitly taps X (preference stored in sessionStorage).

---

## 16. FULL SCROLL NARRATIVE (desktop, top to bottom)

This is the intended experience from page load to footer.

| Scroll position | What visitor sees | Purpose |
|----------------|-------------------|---------|
| 0 — above fold | Hero: scenario-first headline, "Who needs coverage?" 4-button chooser, meta pills, CTAs. Left rail: scenario nav visible. Right rail: verify card visible. | Orient, scenario-first entry, immediate CTA |
| Fold + 1 screen | Scenario finder widget: situation chips, timing picker, answer block. | Conversion: match visitor to plan before they read |
| +2 screens | Plan story cards begin. UHC (Stop 1) visible. Scenario nav in left rail highlights "Cleanings" chip. Right rail verify card still sticky. | SEO, trust, story narrative |
| +4 screens | Aetna (Stop 2). Right rail CVS ExtraCare spotlight aligns. | Feature placement, conversion |
| +6 screens | Ameritas (Stop 3), Guardian (Stop 4). Left rail "filter by need" is visible if visitor scrolls left rail. | SEO coverage, scenario match |
| +8 screens | FIRST verify band (dark teal). Strong conversion interrupt. | Conversion |
| +9 screens | Comparison table. Horizontal scroll on desktop if narrow. | SEO entity table, GEO citation |
| +10 screens | Best-for scenarios grid. | SEO "best for [need]" queries |
| +11 screens | Family section (new). | Family buyer conversion, SEO |
| +12 screens | Waiting periods explainer + visual timeline. | Trust, education |
| +13 screens | SECOND verify band. | Conversion (late-funnel) |
| +14 screens | FAQ (10 questions, 2 new). Right rail share/save block now visible. | SEO FAQPage schema, GEO |
| +15 screens | Editorial note, related links, carrier cards grid. | Internal linking, retention |
| Bottom | Footer (shared component). | |

---

## 17. MOBILE LAYOUT (viewport < 768px)

Single column. Full width minus 20px side padding.

**Hero**: Same content, hero chooser buttons wrap to 2x2 grid.

**Left rail collapses to**: A horizontal pill strip below hero, labeled "Jump to:". Shows scenario chips as small horizontal pills, scrollable horizontally via `overflow-x: auto`. Scenario nav disappears from left position; its content becomes the pill strip.

**Right rail collapses to**: Blocks inserted inline at relevant positions:
- R1 (Verify CTA): inserted between scenario finder and plan stories.
- R2 (CVS spotlight): inserted inside the Aetna plan story card.
- R3 (Capy Rewards): inserted after the family section.
- R4 (Family Builder): inserted before the family section.
- R5 (Share/Save): inserted after FAQ.

**Plan story cards**: Full width. The mini quick-facts panel (desktop: floated right) becomes a collapsible `<details>` block at the bottom of each card on mobile, labeled "Quick facts +".

**Comparison table**: Horizontally scrollable. Column order resequenced for mobile: Plan name, Monthly, Annual max, Implants, Ortho, Waiting periods. "Best for" column dropped on mobile (too wide).

**Sticky bottom bar** (mobile only): described in Section 15.

**Scenario finder**: situation chips become a 2x4 grid (2 per row). Answer block expands below grid with a smooth height transition.

---

## 18. ACCESSIBILITY NOTES

- `role="radiogroup"` + `role="radio"` + `aria-checked` on all chooser/chip groups.
- `aria-live="polite"` on all answer blocks that update after interaction.
- All `.faq details/summary` elements: `summary` has `list-style:none` and custom `::after` content; add `aria-expanded` state via JS.
- All sticky rails: `aria-label` attributes on landmark divs. Left rail: `<aside aria-label="Scenario navigation">`. Right rail: `<aside aria-label="Plan resources">`.
- Comparison table: `<caption>` with full descriptive text. `scope="col"` on all `<th>`. `scope="row"` on plan name cells.
- Timeline diagram: alternative `<table>` fallback inside `<noscript>` or as a hidden visually-available table for screen readers.
- Color contrast: all body text and UI labels must meet WCAG AA (4.5:1 minimum) against their backgrounds. `--ink-mute` (#6E8590) on `--paper` (#FFFCF6) passes at 3.1:1 for large text only; use `--ink-soft` (#3C5560) for any body text that must pass at full body size.
- Focus order: left rail, then center column (top to bottom), then right rail. On mobile, focus follows DOM order which is center column only.
- All icon-only buttons in sticky mobile bar have `aria-label` text.
- `prefers-reduced-motion`: timeline animation (if any) and scroll behavior should respect `@media (prefers-reduced-motion: reduce)`.

---

## 19. COMPONENT REUSE MAP

Components from the current page that carry forward unchanged or near-unchanged:

| Current component | Class | Carry forward? | Change in rebuild |
|------------------|-------|---------------|-------------------|
| `.tour-stop` plan card | Yes | Add mini quick-facts panel, match indicator |
| `.picker` chooser | Yes | Upgrade to 2-step finder, add family mode |
| `.picker-answer` | Yes | Expand with key fact pill and skip-if note |
| `.verify-band` | Yes | Move placement, add inline search input, keep two instances |
| `.faq details/summary` | Yes | Add 2 new questions, remove em-dashes |
| `.scenarios` grid | Yes | Add 8th card, add family toggle |
| `.vs-cards` carrier grid | Yes | No change, keep at bottom |
| `.related` link strip | Yes | Add 3 new links |
| `.ai-summary` block | Yes | Update for 8 plans, reposition or expand |
| `.cmp-wide` table | Yes | Add "Best for" column, horizontal scroll wrapper |
| `.pill` meta pills | Yes | No change |
| `.btn` styles | Yes | No change |
| Breadcrumb `.crumbs` | Yes | No change |
| Mega nav / footer mounts | Yes | No change |

Components new in rebuild:
- Left rail aside with sticky scenario nav and jump links
- Right rail aside with sticky verify card and feature blocks
- Family/individual toggle (segmented control)
- Situation chip cards (Step 1 of scenario finder, richer than current picker buttons)
- Mini quick-facts panel inside tour-stop cards
- Match indicator bar on tour-stop cards
- Visual timeline diagram (waiting periods section)
- Family scenario cards (4-card grid, new section)
- Mobile sticky bottom bar

---

## 20. SECTION-TO-PURPOSE MAP

| Section | SEO | Conversion | Retention |
|---------|-----|------------|-----------|
| Hero + "Who needs coverage?" chooser | H1 entity signal | Scenario entry reduces bounce | Share hook: "find the right plan for me" |
| Scenario finder widget | Answer "best plan for [situation]" queries | Primary conversion surface | -- |
| Plan story cards (8) | Core SEO content, plan name + city entity signals | CTA in each card | Bookmark-worthy narrative |
| Comparison table | Structured data, citation target for AI | Enables side-by-side decision | -- |
| Best-for scenarios grid | Answers "best plan for [need]" long-tail queries | Lower-funnel, late-deciders | -- |
| Family section | New keyword surface: "family dental insurance PPO" | Family buyer conversion | Multi-seat share trigger |
| Waiting periods explainer | Answer "dental insurance waiting period" queries | Trust = conversion | -- |
| Verify CTA bands (x2) | -- | Direct conversion (find dentist) | -- |
| FAQ | FAQPage schema, GEO citation block | Clears purchase objections | -- |
| Related links + carrier cards | Internal linking silo | Next-page navigation | Return visit: bookmark the hub |
| Left rail (scenario nav) | -- | Navigate to best-fit plan | Persistent during scroll |
| Right rail (verify CTA) | -- | Persistent conversion CTA | -- |
| Right rail (CVS/Capy/Share) | -- | Feature awareness | Share trigger, Capy retention hook |

---

## 21. WHAT NOT TO BUILD (constraints from 00-INDEX and CLAUDE.md)

- No em-dashes anywhere on the page.
- No fabricated plan statistics or invented premium numbers outside the 8 SSOT files.
- No heavy calculator (spec 11 handles light widgets only).
- No countdown timers, no "only 3 spots left" urgency fabrications.
- No glassmorphism on any card.
- No gradient fills on plan story cards (gradient allowed on verify band and page hero backgrounds only per current design).
- No roman numerals in any list.
- No Capy Crowns icons inside modals or the right rail until the Capy Rewards program has real launch specs.
- No storing member IDs (not relevant to this page but noted for any verify flow that touches this hub).
- No `d.seo_path` patterns in any link built by the generator for hub pages.
- Plan facts: verify every number against the SSOT in `/data/plans/{slug}.md` before writing it into this page. If a fact is disputed between the current hub and a SSOT file, the SSOT wins after re-verification.

---

*Spec 10 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are approved.*
