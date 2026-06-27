# 14 -- Rails and Monetization Spec: PPO Plans Hub Rebuild
## Left Rail + Right Rail: Full Module Definitions, Ad Slot System, Mobile Behavior
### CoverCapy PPO Hub Rebuild Program | Spec 14 of 20

**File:** `research/ppo-hub-rebuild/14-rails-monetization.md`
**Created:** 2026-06-26
**Status:** PLANNING ONLY. No production changes until all 20 specs and the master console are complete and approved.
**Rule:** No em-dashes. No fabricated stats. All plan facts from `/data/plans/*.md` SSOTs only. Preserve all CSS tokens from CLAUDE.md.

---

## 1. OVERVIEW AND PRINCIPLE

The three-column layout established in spec 10 (UX flow) creates two persistent side lanes flanking the center content column. These lanes must earn their space every scroll-centimeter. They are not sidebars in the 2010 sense -- they are contextual, scroll-aware modules that respond to what the visitor is reading in the center column.

**Left rail purpose:** Guide the visitor through the page and tell them where they are. It is the site's memory of the visitor's reading position and declared scenario. It earns attention by being useful navigation, not decoration.

**Right rail purpose:** Deliver value-adjacent content at the right moment. Verified dentist CTA, Aetna + CVS perks when Aetna is in view, Capy Rewards teaser, family builder shortcut, share/save, and tasteful placement of house and partner features. It earns trust by not feeling like ads.

**Monetization philosophy:** CoverCapy is positioned as luxury concierge, not price-comparison aggregator. Any ad or feature placement must feel editorially relevant. House promotions are labeled as such. Third-party AdSense slots appear only in defined positions, never mid-narrative. No incentivized clicks. No countdown timers. No intrusive overlays. Placement logic is scenario-aware so the right content appears at the right scroll position.

---

## 2. LEFT RAIL -- FULL MODULE SPECIFICATION

### Rail dimensions (desktop, viewport >= 1080px)
- Width: 220px
- Position: sticky after hero bottom passes viewport top (`position: sticky; top: 24px`)
- Container: `<aside aria-label="Scenario navigation and page guide">`
- Max height: `calc(100vh - 48px)`; overflows with `overflow-y: auto; scrollbar-width: thin`
- Background: transparent (shows page background, `--paper` #FFFCF6)
- No box shadow or border on the rail container itself

---

### Block L1 -- Scenario Navigation ("YOUR SITUATION")

**Purpose:** Persistent scenario-first entry. Lets the visitor declare their life-event at any scroll position and jump to the matching plan story. Active-section tracking creates a feeling of "this page knows where I am."

**Label:** "YOUR SITUATION" -- 11px, uppercase, letter-spacing 0.08em, color `--teal-300` (#5E8C92)

**Content:** 8 scenario chips, vertical list, one per life event:

| Chip label | Scroll target | Section anchor |
|---|---|---|
| I just need cleanings | UHC plan story | `#stop-uhc` |
| A crown is coming | Aetna plan story | `#stop-aetna` |
| Big work, no wait | Ameritas plan story | `#stop-ameritas` |
| Braces for my kid | Guardian plan story | `#stop-guardian` |
| Left a job with dental | Aetna plan story (waiver note) | `#stop-aetna` |
| One implant ahead | Humana and MOO plan stories | `#stop-humana` |
| Heavy year of work | MOO and MetLife plan stories | `#stop-moo` |
| Largest network | Delta Dental hub card | `#stop-delta` |

**Chip anatomy:**
- Height: 36px; padding: 8px 12px
- Typography: Inter Tight, 13px, weight 500
- Color default: `--ink-soft` (#56655F)
- Color active: `--deep` (--teal-night, #082A30)
- Background default: transparent
- Background active: `--mint-soft` (#E6F7EE)
- Left border active: 3px solid `--teal-700` (#14525B)
- Border radius: 8px
- Cursor: pointer

**Interaction:**
- Single-select only
- On click: highlight chip + smooth-scroll center column to target anchor (`scroll-behavior: smooth`; respects `prefers-reduced-motion`)
- On scroll: IntersectionObserver watches each `.tour-stop` in center column; when a plan story enters 40% of viewport, the corresponding chip(s) in L1 activate automatically
- Note: "A crown is coming" and "Left a job with dental" both map to `#stop-aetna`; clicking either highlights the Aetna chip and "Left a job..." highlights the waiver subtext inside the Aetna card
- `role="radiogroup"` on the chip list; each chip is `role="radio"` with `aria-checked` toggled by JS

**Placement priority:** TOP of left rail. First module the visitor sees.

**Sticky behavior:** Sticks to `top: 24px` once hero bottom has scrolled past viewport top. Remains sticky until page footer enters viewport.

**Mobile behavior:** Collapses entirely from left position. Content repurposed as a horizontal pill-strip scenario nav inserted below the hero (full-width, `overflow-x: auto`, labeled "Jump to:"). Chips become smaller horizontal pills (11px, 700 weight, `--deep` text, `--mint-soft` background active state). The left rail `<aside>` is `display:none` at < 768px; the horizontal strip is a separate DOM element inserted into the center-column flow.

---

### Block L2 -- Jump Links ("ON THIS PAGE")

**Purpose:** Standard on-page navigation for visitors who want to jump to a specific section without using the scenario nav. Useful for return visitors and for GEO (AI systems may read this section list as a content map).

**Label:** "ON THIS PAGE" -- 11px, uppercase, letter-spacing 0.08em, color `--ink-faint` (#8A958F)

**Content:** Anchor links matching center column H2 sections, in page order:

```
Who is this for?
The scenario finder
Plan stories (8 plans)
Compare the shelf
Best for your need
Family coverage
How waiting periods work
Verify your dentist
FAQ
```

**Link anatomy:**
- Typography: Inter Tight, 12px, weight 400
- Color default: `--teal-700` (#14525B)
- Color active (scroll-tracked): `--deep` (#082A30), weight 600
- No underline on default; underline on `:hover`
- Active section indicated by a 2px left border on the active link's list item, color `--mint` (#5BE0A0)
- Line height: 28px (generous for tap targets)
- Active-section tracking: same IntersectionObserver used for L1 scenario chips triggers both L1 and L2 active states simultaneously

**Placement priority:** Second module, below L1 Scenario Nav. Separated from L1 by a 20px gap and a 1px `--line` (#E8E2D8) horizontal rule.

**Sticky behavior:** Scrolls with the rail container (rail itself is sticky). Jump links are not independently sticky.

**Mobile behavior:** Hidden at < 768px. Jump navigation is handled by the horizontal pill strip (L1 content) and the mobile sticky bottom bar.

---

### Block L3 -- Coverage Type Filter ("FILTER BY NEED")

**Purpose:** Let visitors who do not know their scenario narrow the plan story cards by treatment type. A functional filter that dims non-matching cards rather than hiding them, preserving the full-page context.

**Label:** "FILTER BY NEED" -- 11px, uppercase, letter-spacing 0.08em, color `--ink-faint` (#8A958F)

**Content:** 4 pill toggles, multi-select allowed:

| Toggle | Plans matched |
|---|---|
| Preventive only | UHC |
| Basic + major | Aetna, Ameritas, MetLife, Humana, MOO, Delta |
| Implants | Humana, MOO |
| Ortho / braces | Guardian (kids), Delta (adults) |

**Toggle anatomy:**
- Height: 30px; padding: 6px 14px; border-radius: 20px (full pill)
- Typography: Inter Tight, 12px, weight 500
- Default: border 1px solid `--line` (#E8E2D8), background white, text `--ink-soft`
- Active: background `--mint-soft` (#E6F7EE), border 1px solid `--teal-700`, text `--deep`
- Stacked vertically (not horizontal row) to fit 220px rail width

**Filter behavior:**
- Pure JS class toggle on `.tour-stop` cards in center column
- Non-matching cards: `opacity: 0.38; pointer-events: none; transition: opacity 200ms`
- All pills deselected: all cards at full opacity (reset state)
- No page reload, no URL change, no server call
- A "Clear filters" text link appears below the toggles when any filter is active (12px, `--teal-700`)

**Placement priority:** Third module, below L2 Jump Links. 16px gap above.

**Sticky behavior:** Scrolls with the rail container (rail is sticky; L3 stays in view throughout plan stories section).

**Mobile behavior:** Hidden at < 768px. Filter functionality is replaced on mobile by the scenario finder widget answer block (center column), which pre-selects matching plans after Step 2.

---

### Block L4 -- Plan Finder Shortcut (not sticky)

**Purpose:** Catch visitors who have scrolled past the hero scenario finder without engaging it. A persistent low-friction re-entry point.

**Content:**
- Label: "Not sure where to start?" (Inter Tight, 13px, weight 600, `--ink`)
- Body: "Answer 3 questions and we match you to a plan." (Inter Tight, 12px, `--ink-soft`)
- CTA button: "Open Plan Finder" -- full width, height 36px, background `--teal-700` (#14525B), text white 13px weight 600, border-radius 8px
- On click: smooth-scrolls center column to `#scenario-finder`
- Small capybara SVG icon, 20px, `--teal-300`, displayed above the label text, left-aligned

**Card anatomy:**
- Background: `--cream-card` (#FFFDF8)
- Border: 1px solid `--line` (#E8E2D8)
- Border-radius: 16px
- Padding: 16px

**Placement priority:** BOTTOM of left rail. Below L3. Not sticky (scrolls with the page once the rail container's max height is reached). If the rail container overflows (all four blocks together exceed `calc(100vh - 48px)`), L4 scrolls inside the rail's `overflow-y: auto`.

**Mobile behavior:** Hidden at < 768px. Re-entry handled by mobile sticky bottom bar "Scenario finder" button.

---

## 3. RIGHT RAIL -- FULL MODULE SPECIFICATION

### Rail dimensions (desktop, viewport >= 1080px)
- Width: 220px
- Position: sticky after hero bottom passes viewport top (`position: sticky; top: 24px`)
- Container: `<aside aria-label="Plan resources and partner perks">`
- Max height: `calc(100vh - 48px)`; overflows with `overflow-y: auto; scrollbar-width: thin`
- Background: transparent
- Modules are distinct cards separated by 12px gaps

---

### Block R1 -- Dentist Verify CTA (sticky, top priority)

**Purpose:** Highest-conversion CTA on the entire page. Keeps the dentist verification action visible at all times while the visitor is reading plan stories. A visitor who finds a plan they like should be able to immediately check whether their dentist accepts it without losing scroll position.

**Classification:** House promotion. Not an ad. No AdSense involvement.

**Content:**
- Eyebrow: "STEP 1 BEFORE YOU BUY" -- 11px, uppercase, letter-spacing 0.08em, color `--teal-300`
- Headline: "Does your dentist take this plan?" -- Fraunces, 17px, weight 500, color `--deep` (#082A30)
- Body: "We verify it free, before any money moves." -- Inter Tight, 13px, `--ink-soft`
- Primary button: "Find my dentist" -- full width, height 40px, background `--deep` (#082A30), text white 13px weight 600, border-radius 10px
- Links to: `/find-my-dentist`
- Subtext: "6,400+ verified PPO offices" -- 11px, `--ink-faint`, centered below button

**Card anatomy:**
- Background: white
- Border: 2px solid `--teal-700` (#14525B)
- Border-radius: 18px
- Padding: 18px 16px

**Placement priority:** TOP of right rail. Always the first right-rail element visible.

**Sticky behavior:** Sticks at `top: 24px` with the rail container. Remains visible throughout the plan stories section. Scrolls out of view only when the right rail's own content grows taller than the viewport and the visitor reaches the bottom of the rail stack.

**Show/hide rule:** Always visible on desktop from the moment the hero passes viewport top until the footer enters the viewport.

**Mobile behavior:** Hidden from right-rail position. Inserted as a standalone card between the scenario finder section and the plan stories section in the center column mobile stack (before Stop 1, UHC). Full-width, same card anatomy.

---

### Block R2 -- Aetna + CVS ExtraCare Spotlight

**Purpose:** Feature placement that is contextually relevant: appears in the right rail aligned to the Aetna plan story card in the center column. Reinforces the CVS angle without interrupting the plan narrative. Bridges to the shopping module (R2b) defined below.

**Classification:** House feature. Not an ad. The CVS ExtraCare Plus perk is a verified plan benefit (SSOT: `aetna-dental-direct.md`, field `cvs_extracare_plus`).

**Content:**
- Eyebrow: "CVS HEALTH PERK" -- 11px, uppercase, color `--gold-deep` (use existing gold token from design system; nearest token: `--gold-soft` border, eyebrow text at a darker gold -- if `--gold-deep` is not yet in the token set, define it as #A07A30 as a local token only on this component)
- Headline: "Aetna members get $10/mo in CVS rewards + 20% off CVS Health brand items." -- Inter Tight, 14px, weight 600, `--ink`
- Body: "Included on Direct Preferred and Core tiers. Requires one-time registration. Not available in 9 states (GA, LA, MN, MO, NY, NJ, OK, TX, VA)." -- Inter Tight, 12px, `--ink-soft`
- Link: "See the full Aetna plan details" -- `--teal-700`, 12px, underlined on hover, links to `/dental-insurance/ppo-plans/aetna-dental-direct/`
- "Up to $120/yr value" pill: 11px, background `--gold-soft` (#F3E8CF), border 1px solid `--gold-soft`, border-radius 20px, padding 3px 10px, inline below headline

**Card anatomy:**
- Background: `--gold-soft` (#F3E8CF) at 40% opacity (use `rgba(243,232,207,0.4)`)
- Border: 1px solid `--gold-soft` (#F3E8CF)
- Border-radius: 18px
- Padding: 16px

**Placement priority:** Second module in right rail. Static position in the DOM (below R1 Verify CTA).

**Sticky / scroll-alignment rule:**
- On desktop, this card is positioned statically in the right rail's DOM order (not absolutely positioned)
- The rail itself is sticky so the card naturally aligns roughly with Aetna's position in the center as the visitor scrolls
- If the rail is taller than the viewport, this card may scroll within the rail's `overflow-y: auto` area
- Do NOT attempt pixel-perfect alignment to the Aetna card via `position: absolute` or JS transforms (too fragile across viewports); the contextual label "CVS HEALTH PERK" with the nearby Aetna mention is sufficient contextual cue

**Show/hide rule:** Always visible on desktop when the right rail is active. No scenario-conditional hiding (the CVS angle is relevant to any visitor who is a potential Aetna buyer).

**Mobile behavior:** Removed from right rail position. Inserted inline inside the Aetna plan story card (`.tour-stop#stop-aetna`) as a sub-card, placed immediately after the plan's "Quick facts" mini-panel. Same card anatomy. Full width of the plan card's content area.

---

### Block R2b -- CVS Oral-Care Shopping Module

**Purpose:** Convert the Aetna CVS perk from a text mention into a tactile, shoppable moment. Replicates the "shopping express" pattern from the Aetna plan page (the gamified 6-tile product carousel with a live $10-reward meter). On the hub page this is a compact version (3 tiles, condensed), with a link to the full Aetna plan page for the full experience.

**Classification:** House feature / editorial. The CVS.com links are affiliate-neutral category links (plain category URLs, not UTM-tagged, not affiliate-linked). No AdSense involvement. No incentivized clicks.

**SSOT reference:** `aetna-dental-direct.md`, field `do_not` last two bullets: illustrative prices ($3.99 toothbrush, $5.99 toothpaste, $5.49 mouthwash), link to `https://www.cvs.com/shop/personal-care/oral-care` (plain category URL). Prices are illustrative only and must be labeled as such.

**Content:**
- Module header: "Your $10 CVS reward goes far" -- Inter Tight, 13px, weight 600, `--ink`
- Subheader: "Illustrative CVS Health brand prices, June 2026" -- 10px, `--ink-faint`
- 3 product tiles (compact, 68px wide each, displayed in a flex row):
  - Tile 1: Toothbrush -- ~$3.99
  - Tile 2: Toothpaste -- ~$5.99
  - Tile 3: Mouthwash -- ~$5.49
  - Each tile: product name (11px, `--ink`), illustrative price (11px, weight 600, `--teal-700`)
  - All prices prefixed with "~" to signal approximate
- Reward meter: a simple bar showing "$10 reward" as a visual (static bar, no JS calculation needed; this is illustrative, not a real-time calculator)
- CTA link: "Shop all CVS Health oral care at CVS.com" -- 12px, `--teal-700`, underlined, `href="https://www.cvs.com/shop/personal-care/oral-care"`, opens in `_blank` with `rel="noopener noreferrer"`
- Secondary link: "See the full Aetna + CVS details" -- 11px, `--ink-soft`, links to Aetna plan page

**Card anatomy:**
- Background: white
- Border: 1px solid `--gold-soft` (#F3E8CF)
- Border-radius: 14px
- Padding: 14px
- Sits immediately below R2 (Aetna CVS Spotlight card), separated by 8px

**Show/hide rule:** Same as R2. Always visible on desktop when the right rail is active.

**Mobile behavior:** Collapsed and replaced by a single "Shop CVS oral care" link inside the Aetna inline card (R2 mobile version). The full 3-tile module does not appear on mobile; the full shopping experience is on the Aetna plan page.

**AdSense policy note:** These are plain category links to CVS.com. They are NOT affiliate links and NOT incentivized. CoverCapy is NOT paid per click. They are editorial product illustrations that demonstrate the plan perk. No policy conflict with AdSense.

---

### Block R3 -- Capy Rewards Teaser

**Purpose:** Build awareness of the Capy Rewards loyalty program and create a retention hook. Visitors who are close to a decision are the right audience. This is a soft teaser only; no fabricated point values until the Capy Rewards program has real launch specs.

**Classification:** House promotion. Not an ad. Must be clearly labeled as a CoverCapy program.

**Content:**
- Eyebrow: "CAPY REWARDS" -- 11px, uppercase, color `--teal-300`
- Headline: "Earn Capy points when you verify and enroll through CoverCapy." -- Fraunces, 15px, weight 500, `--deep`
- Body: "Points unlock discounts with accredited providers. Free to join." -- Inter Tight, 12px, `--ink-soft`
- CTA link: "See how Capy Rewards work" -- `--teal-700`, 12px, anchor link (destination TBD pending Capy Rewards launch page; placeholder `href="#capy-rewards"` until the page exists)
- Icon: small capybara SVG, 24px, `--teal-300`, positioned top-right of card or inline before headline

**Fabrication guard:** No specific point values, no dollar equivalents, no "earn X points per dollar" claims. The program spec is pending. Only the existence of the program and its general mechanics (verify, enroll, earn, redeem with accredited providers) are stated.

**Card anatomy:**
- Background: light teal tint -- `rgba(91,224,160,0.10)` (approximation of a `--teal-faint` token if not defined; do not invent a new token name without design system approval -- use inline style or a local class only)
- Border: 1px solid `--teal-300` (#5E8C92)
- Border-radius: 18px
- Padding: 16px

**Placement priority:** Third module in right rail. Below R2b CVS Shopping Module.

**Sticky behavior:** Scrolls within the rail container if rail overflows viewport height.

**Show/hide rule:** Always visible. Not scenario-conditional.

**Mobile behavior:** Hidden from right rail position. Inserted inline after the Family Section in the center column mobile stack (before FAQ). Full width, same card anatomy.

---

### Block R4 -- Family Builder Shortcut

**Purpose:** Catch family buyers who are in the plan stories section but have not yet reached the Family Section of the center column. Provides a fast path to family scenario content.

**Classification:** House navigation. No monetization.

**Content:**
- Label: "PLANNING FOR A FAMILY?" -- 11px, uppercase, `--ink-faint`
- Body: "Guardian for braces. Aetna for CVS perks. Humana for implants. All three in one household?" -- Inter Tight, 12px, `--ink-soft`
- CTA: "Open the family scenario finder" -- 12px, `--teal-700`, underlined, scrolls center column to `#family-section`

**Card anatomy:**
- Background: white
- Border: 1px solid `--line` (#E8E2D8)
- Border-radius: 18px
- Padding: 16px

**Placement priority:** Fourth module in right rail. Below R3.

**Sticky behavior:** Scrolls within the rail container.

**Show/hide rule:** Always visible on desktop. (Scenario-conditional variant: if visitor has selected a "family" scenario in the scenario finder, this card can update its headline to "Your family scenario is ready below" and its CTA link becomes `#family-section` with the relevant tab pre-selected. Implementation detail deferred to spec 11.)

**Mobile behavior:** Hidden from right rail position. Inserted inline before the Family Section in the center column mobile stack. Full width.

---

### Block R5 -- Share and Save Block

**Purpose:** Conversion to return visitor and referral. The hub is explicitly designed to be shared ("ooo CoverCapy, let's see which plan fits my situation"). Make sharing frictionless.

**Classification:** Retention / UX. Not an ad.

**Content:**
- Label: "SHARE THIS GUIDE" -- 11px, uppercase, `--ink-faint`
- Share buttons (row, icon + label each):
  - "Copy link" -- clipboard icon, on click: `navigator.clipboard.writeText(window.location.href)`, shows "Copied!" for 1.5s
  - "Email" -- envelope icon, `href="mailto:?subject=CoverCapy%20PPO%20Plans%20Guide&body=..."`, pre-filled with page title and URL
  - "Text" -- message icon, `href="sms:?body=..."` (mobile-only; hidden on desktop unless `navigator.share` is available)
- Below buttons: "Bookmark for later" text link -- if `navigator.share` is available, calls `navigator.share()` with title/URL; fallback to "Copy link" behavior
- All icons: 16px SVG, `--teal-700`
- All labels: 11px, `--ink-soft`

**Card anatomy:**
- Background: transparent
- Border: none
- Padding: 12px 0 0 0 (minimal; this is a light block, not a full card)

**Placement priority:** BOTTOM of right rail. Below R4. Not sticky.

**Mobile behavior:** Hidden from right rail position. Inserted inline after FAQ in the center column mobile stack. Full width. On mobile, `navigator.share()` is used as the primary action with "Share this guide" as a single button if the browser supports it.

---

## 4. AD SLOT SYSTEM

### 4.1 Philosophy and constraints

CoverCapy carries Google AdSense on plan pages. The hub page may carry it too, but placement must be:
1. Non-intrusive (never mid-narrative, never between a plan name and its story)
2. Never incentivized (no "click this ad to earn rewards" or any implied reward for clicking)
3. Clearly distinguishable from editorial content (Google-required "Advertisement" label present)
4. Policy-safe under AdSense Program Policies (no encouragement to click, no misleading placement near navigation)
5. Tasteful to the luxury concierge positioning (no banner stacking, no pop-unders, no sticky ad units)

**House promotions vs. third-party ads:** All R1 through R5 rail blocks are house promotions (CoverCapy editorial and CoverCapy program content). They are NOT Google AdSense units and MUST NOT carry Google's "Advertisement" label. AdSense units are ONLY in the designated slots defined below in section 4.2.

---

### 4.2 Defined ad slots

Three ad slots are defined for the hub page. No more than three AdSense units per page load (Google recommends limiting units to maintain relevance and page speed).

---

#### Ad Slot A -- Right Rail, Between R4 and R5 (desktop only)

**Location:** In the right rail, after the Family Builder Shortcut (R4) and before the Share/Save block (R5).

**Size:** 220x90px (fluid within 220px rail width; this is a non-standard size, use `data-ad-format="fluid"` with `data-ad-layout-key` if the slot is responsive, or target a 220x90 custom rectangle unit if allowed by AdSense account settings. If fluid format is not available at this width, use `data-ad-format="auto"` with `style="display:block; width:220px; max-height:90px;"` and let AdSense fill the best-fitting unit.)

**Label:** "Advertisement" -- 10px, `--ink-faint`, above the ad unit, not clickable

**Targeting logic:**
- Default: general dental-insurance category
- When visitor has selected a scenario chip in L1 (Scenario Nav), the page appends a `data-scenario` attribute to the ad slot. The AdSense auto-targeting will read the page context; no custom targeting parameter is passed to AdSense (this would require AdSense advanced setup). For now, targeting is page-level contextual only.
- No house promotion within this slot. If AdSense returns no fill, the slot is hidden (no blank white space): `<ins>` element's parent div has `min-height: 0` and is hidden if child `<ins>` is empty.

**Rotation:** Controlled by Google AdSense automatically.

**Mobile behavior:** Hidden at < 768px. Slot A does not appear on mobile.

---

#### Ad Slot B -- Center Column, Between Plan Stories and Comparison Table (desktop + mobile)

**Location:** In the center column, after the last plan story card (#stop-delta, Stop 8) and before the comparison table section. This is the natural scroll pause between two major sections.

**Size:** Responsive banner. `data-ad-format="auto"` with `style="display:block;"`. On desktop renders up to 728x90 (leaderboard) or 336x280 (large rectangle) depending on AdSense fill. On mobile renders up to 320x100 (large mobile banner) or 300x250 (medium rectangle).

**Label:** "Advertisement" -- 10px, `--ink-faint`, above the ad unit

**Targeting logic:** Page-level contextual. The center column page content (8 named dental plans, comparison language, dental insurance keywords) provides strong contextual signal for AdSense.

**When to show:** Always shown. This is the primary AdSense revenue slot on the hub page.

**What NOT to place near it:** Do not place a "Verify my dentist" house CTA immediately above or below Slot B (avoid confusion between house CTA and ad). Maintain at least 48px of neutral padding (section break or whitespace) between Slot B and any CTA button.

**Mobile behavior:** Active on mobile. Placed between plan stories and comparison table in the single-column stack.

---

#### Ad Slot C -- Center Column, After FAQ, Before Editorial Footer (desktop + mobile)

**Location:** After the FAQ section and before the editorial note and related links strip. The visitor who has read to the FAQ is near the end of their consideration journey.

**Size:** Responsive. `data-ad-format="auto"`. Same fill behavior as Slot B.

**Label:** "Advertisement" -- 10px, `--ink-faint`

**Targeting logic:** Page-level contextual. The FAQ section above (dental insurance waiting periods, family coverage, seniors, plan comparison) provides strong late-funnel intent signals.

**When to show:** Always shown.

**Mobile behavior:** Active on mobile. Inserted after FAQ in the single-column stack.

---

### 4.3 Ad slot sizes summary

| Slot | Location | Desktop size | Mobile size | Notes |
|---|---|---|---|---|
| A | Right rail, below R4 | 220x90 (fluid) | Hidden | Rail-only unit |
| B | Center column, after Stop 8, before table | Up to 728x90 or 336x280 (auto) | Up to 320x100 or 300x250 | Primary revenue unit |
| C | Center column, after FAQ | Up to 728x90 or 336x280 (auto) | Up to 320x100 or 300x250 | Late-funnel intent unit |

---

### 4.4 AdSense policy compliance checklist

- [x] Each unit carries an "Advertisement" label above it (not inside the `<ins>` tag; above the container)
- [x] No ad unit is placed inside a plan story card or between a plan headline and its body text
- [x] No ad unit is placed inside a navigation element (left rail scenario nav, jump links)
- [x] No ad unit is adjacent to a CTA button in a way that could cause accidental clicks (48px minimum separation enforced)
- [x] No content implies or suggests that clicking an ad earns rewards, points, or any benefit
- [x] No ad unit is inside a modal or overlay
- [x] Slot A does not appear on mobile (avoids cramped layout that could lead to accidental clicks)
- [x] Maximum 3 AdSense units per page load
- [x] All units use standard Google AdSense code (`<ins class="adsbygoogle">`) with `data-ad-client` and `data-ad-slot` populated from the existing AdSense account (same account used on plan pages)
- [x] No sticky/floating ad units

---

## 5. SCROLL-POSITION AWARENESS AND MODULE ACTIVATION RULES

The right rail modules R2 (Aetna CVS Spotlight) and R2b (CVS Shopping Module) are described above as always-visible in the rail. However, their eyebrow copy and border treatment should feel most relevant when the visitor is in the Aetna zone. The following activation rule manages emphasis without requiring complex JS:

**R2 / R2b emphasis rule:**
- Default state: visible, standard opacity (1.0)
- "Aetna in view" state: when IntersectionObserver reports `#stop-aetna` is >= 30% in viewport, add CSS class `.rail-spotlight-active` to R2 and R2b
- `.rail-spotlight-active` adds: border-width 2px (from 1px), box-shadow `0 2px 12px rgba(163, 122, 48, 0.12)`, slight scale transform `transform: scale(1.01)` (subtle, not bouncy)
- When `#stop-aetna` exits the viewport, `.rail-spotlight-active` class is removed; transition: `all 300ms ease`
- `prefers-reduced-motion`: skip the scale transform; only border-width change applies

**L1 Scenario Nav active-chip rule:**
- IntersectionObserver with `threshold: 0.4` on each `.tour-stop`
- When a `.tour-stop` intersects, find its matching chip(s) in L1 and add `.chip-active` class
- Only one chip is active at a time. If two tour-stops partially overlap (during scroll transition), the lower one (closer to viewport top center) takes precedence
- L2 Jump Links use the same observer; `li.active` class added to the matching jump link

**L3 Filter reset on scenario-finder answer:**
- If the visitor receives an answer in the scenario finder widget (center column), JS fires a custom event `cc:scenarioAnswer` with `{plans: ['aetna']}` (or whichever plans match)
- L3 filter toggles the matching filter pill to active state automatically, dimming non-matching plan cards
- The visitor can override by clicking a different pill or clicking "Clear filters"

---

## 6. MOBILE BEHAVIOR -- CONSOLIDATED SPEC

At viewport width < 768px, both rail `<aside>` elements are `display: none`. Their content is redistributed into the center column DOM in the following order and positions:

| Original block | Mobile position in center column |
|---|---|
| L1 Scenario Nav | Horizontal pill strip, inserted after the hero section, before the scenario finder widget |
| L2 Jump Links | Hidden on mobile (coverage handled by bottom sticky bar) |
| L3 Coverage Filter | Hidden on mobile (coverage handled by scenario finder answer block) |
| L4 Plan Finder Shortcut | Hidden on mobile (coverage handled by bottom sticky bar) |
| R1 Dentist Verify CTA | Card inserted between scenario finder and plan stories (Stop 1, UHC) |
| R2 Aetna CVS Spotlight | Inline sub-card inside `.tour-stop#stop-aetna`, after quick-facts panel |
| R2b CVS Shopping Module | Condensed single "Shop oral care at CVS" link inside R2 mobile sub-card |
| R3 Capy Rewards Teaser | Card inserted after the Family Section, before FAQ |
| R4 Family Builder Shortcut | Card inserted before the Family Section |
| R5 Share and Save | Block inserted after FAQ section |
| Ad Slot A | Hidden on mobile |
| Ad Slot B | Active (between plan stories and comparison table) |
| Ad Slot C | Active (after FAQ) |

**Mobile sticky bottom bar** (per spec 10, Section 15):
```
+-------------------------------------------------------+
| [Scenario finder]    [Verify dentist]    [Compare]    |
+-------------------------------------------------------+
```
- Height: 52px. Background: `--deep` (#082A30). Text: white.
- Three icon-labeled buttons:
  - "Scenario finder" scrolls to `#scenario-finder`
  - "Verify dentist" links to `/find-my-dentist`
  - "Compare" scrolls to `#compare-table`
- Appears after hero scrolls past viewport top
- Disappears when footer enters the viewport
- Dismissible: small X at far right, preference stored in `sessionStorage` key `cc_bar_dismissed`. Bar stays dismissed for the session only (resets on new tab/return visit).
- `aria-label="Quick actions"` on the bar container
- Each button has `aria-label` with descriptive text (not just icon)

---

## 7. HOUSE VS. THIRD-PARTY DISTINCTION -- LABEL SYSTEM

To avoid visitor confusion and AdSense policy issues, a consistent labeling system applies:

| Content type | Visual treatment |
|---|---|
| House promotion (R1, R3, R4, R5) | No "Advertisement" label. May carry a "CoverCapy" badge (a small capybara wordmark, 10px, `--teal-300`) in the top-right corner of the card if needed for clarity |
| Editorial feature (R2, R2b, L4) | No label. Content is purely informational/navigational based on verified SSOT plan facts |
| Google AdSense unit (Slots A, B, C) | "Advertisement" text in 10px `--ink-faint` immediately above the `<ins>` container. This text is outside the `<ins>` tag and is visible at all times. |
| Future partner integrations | If a true third-party partner placement (not AdSense) is introduced in the rail, it must carry "Sponsored" in 10px `--ink-faint` above the unit. Do not introduce third-party partner placements without updating this spec first. |

---

## 8. REVENUE ESTIMATION AND PRIORITY ORDER

Priority order for right rail real estate (highest to lowest):

1. R1 -- Dentist Verify CTA (conversion, primary business objective)
2. R2 + R2b -- Aetna CVS Spotlight + Shopping Module (editorial feature, brand differentiation)
3. R3 -- Capy Rewards Teaser (retention, program awareness)
4. Ad Slot A (revenue, right rail, desktop only)
5. R4 -- Family Builder Shortcut (navigation, conversion)
6. R5 -- Share and Save (retention, shareability)

If AdSense returns no fill for Slot A, R4 and R5 shift up naturally (no empty space). The rail does not have a reserved empty zone for ads -- the slot collapses when empty.

---

## 9. IMPLEMENTATION NOTES FOR BUILD AGENT

1. Left rail and right rail are static `<aside>` elements in the HTML. They are NOT generated by `seo-build/generate-plans.js` (the hub page is not a generated page). Edit the hub page HTML directly.
2. All IntersectionObserver logic is inline `<script>` at the bottom of the hub page body, before `</body>`. No external JS dependency introduced.
3. CSS for rail modules is inline `<style>` in the hub page `<head>` or a dedicated `<style>` block, reusing existing CSS tokens from the page. Do not introduce new external stylesheets.
4. The CVS oral-care URL is `https://www.cvs.com/shop/personal-care/oral-care` (plain category URL, no query parameters, no UTM tags, no affiliate parameters). Per SSOT `do_not`: "the brand-filter /q/CVS_Health/br URLs redirect server-side, so use plain category URLs."
5. All rail module cards follow the card radius conventions in the design system: 14px to 18px border-radius as specified per module above.
6. `--gold-deep` is referenced in spec 10 as an existing eyebrow color. If this token does not exist in the current token set, use `#A07A30` as a local inline style value and flag it for the design system to formalize.
7. Capy Rewards CTA link is a placeholder (`#capy-rewards`) until the rewards program page is live. Do not fabricate a rewards page URL.
8. The three AdSense slots use the same `data-ad-client` value already in use on the plan pages. The `data-ad-slot` values are new slots to be created in the AdSense console for the hub page. Do not reuse plan-page slot IDs.
9. Test the right rail overflow behavior: if all R1 through R5 cards plus Slot A render fully, the total height will exceed most laptop viewport heights. The rail `overflow-y: auto` handles this. Confirm the capybara icon in R3 does not distort the rail width at 220px.
10. `sessionStorage` key for mobile sticky bar dismissal: `cc_bar_dismissed`. Value: `"1"`. Check this key on DOMContentLoaded and suppress the bar if set.

---

*Spec 14 of 20. PPO Hub Rebuild Program. CoverCapy. June 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are complete and approved.*
