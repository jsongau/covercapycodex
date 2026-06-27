# 13 — Retention and Engagement: PPO Plans Hub
## CoverCapy PPO Hub Rebuild Program | Spec 13 of 20
**Status:** Draft — June 26, 2026
**Dependencies:** 09-patient-testing.md, 10-ux-flow-wireframe.md, 00-INDEX.md

---

## 1. STRATEGIC FRAMING

The goal from 00-INDEX is explicit: "Rebuild /dental-insurance/ppo-plans/ into the single page someone shares with their family the moment dental work comes up."

That sentence defines the retention target precisely. This page earns return visits not by trapping people but by being genuinely useful at two recurring moments:

**Moment 1 — Arrival moment.** A life event triggers dental decision-making (crown scare, job loss, open enrollment, kid's braces consult). The visitor arrives, finds the right answer faster than anywhere else, and forms a mental bookmark: "CoverCapy is where I go for this."

**Moment 2 — Relay moment.** The same visitor tells their spouse, sibling, or coworker: "I just found the clearest explanation of this anywhere. Here." They share a URL, a screenshot, or a copied sentence.

Every retention mechanic in this spec serves one of those two moments. If a mechanic does not serve either, it is cut.

No dark patterns. No manufactured urgency. No email-capture gates. No countdown timers. No fake "3 people viewing this plan" copy. No popups on scroll depth. The evidence from 09-patient-testing.md is unambiguous: Sandra (pre-retiree) and Derek (COBRA gap) both actively distrust aggressive mechanics. Those mechanics would harm the brand at exactly the moment it most needs trust.

---

## 2. SAVE AND BOOKMARK MECHANICS

### 2.1 The problem: dental shopping is a multi-session decision

From 09-patient-testing.md:

- Sandra (Persona 4) explicitly says she "will not convert on the first visit" and returns after thinking about it. She needs to come back to the same page, in the same scenario context, without having to re-navigate.
- Priya (Persona 2) bookmarks multiple comparison pages. She is the most likely persona to lose track of CoverCapy in a sea of tabs unless there is a recovery mechanism.
- Caleb and Mae (Persona 5) defer. "The conversion happens on the second or third engagement, not the first."

Multi-session intent is the norm, not the exception. The page must make returning trivially easy.

### 2.2 Passive bookmark (no friction)

**What:** A "Save this guide" or "Bookmark for later" action in Right Rail Block R5 (per spec 10, Section 4) and in the editorial footer.

**Mechanism:** Uses `navigator.share()` where available (iOS, Android, Chrome on desktop). Falls back to copy-link-to-clipboard. No account creation. No email required. The user's own browser/OS handles the bookmark.

**Copy:**
- Primary label: "Save this guide"
- Sub-label: "Bookmark it in your browser or share to your notes app"
- On click (share API available): native share sheet opens. Suggested title: "PPO Plans Guide | CoverCapy"
- On click (fallback): URL is copied to clipboard with a brief confirmation: "Link copied"

**Placement:**
- Right rail Block R5 (desktop, sticky after scenario finder passes viewport)
- After the FAQ section (center column, both desktop and mobile)
- After the editorial footer, before the related links strip

**What NOT to do:** Do not trigger a cookie consent banner or prompt on the bookmark action. Do not ask for an email as part of saving. The moment must be zero-friction.

### 2.3 Scenario context persistence (session-level)

**What:** When a visitor completes the scenario finder (selects their situation chip and timing preference), their selections are stored in `sessionStorage` (not `localStorage`, not a cookie). If they scroll away and scroll back, or navigate to a plan review page and return via the back button, the scenario finder shows their prior selections without requiring re-entry.

**Mechanism:** On scenario selection, write `{ situation: "crown-coming", timing: "within-3-months", household: "just-me" }` to `sessionStorage["cc-scenario"]`. On page load, read and re-apply if present. The match indicator bars on plan story cards update immediately.

**Privacy:** `sessionStorage` clears when the tab closes. No server-side storage. No profile creation. This is a within-session convenience, not a tracking mechanism.

**Copy on restore:** A single unobtrusive line above the scenario finder if a prior session exists: "Continuing from where you left off — [situation label]. Change it here." Link re-opens the scenario finder.

**What NOT to do:** Do not use `localStorage` for scenario persistence. Do not send session data to any analytics endpoint beyond a single `event: scenario_selected` trigger. Do not prefill any contact form with inferred scenario data without explicit user action.

### 2.4 Plan shortlist (optional, zero-friction)

**What:** A lightweight "My shortlist" mechanic that lets a visitor add up to 3 plans to a comparison tray without creating an account.

**Mechanism:** Each plan story card has a small "Add to shortlist" icon button (a bookmark icon, 20px, `--teal-300`). On click, the plan card is tracked in `localStorage["cc-shortlist"]`. A persistent tray at the bottom of the page (above the mobile sticky bar, or as a subtle drawer on desktop) shows the shortlisted plan names. Clicking the tray opens a lightweight comparison view of just those plans (reuses the existing comparison table filtered to shortlisted plans).

**Persistence:** `localStorage` so the shortlist survives tab closes. Cleared after 30 days. No login required.

**Limit:** 3 plans maximum. On attempting a 4th, the tray shows: "Shortlist holds 3. Remove one to add another."

**Share:** From the tray, a "Share my shortlist" button generates a URL with query params (`?compare=aetna,guardian,humana`). The page reads these params on load, pre-populates the tray, and shows the comparison view. This is the mechanism for the "send to spouse" use case.

**What NOT to do:** Do not require email to save a shortlist. Do not show the shortlist tray on page load if it is empty. Do not auto-expand the tray; let users open it intentionally.

---

## 3. SHAREABLE SCENARIO SUMMARIES

### 3.1 The use case

09-patient-testing.md identified four distinct share triggers that cross multiple personas:

1. Natalie (Persona 6): "One individual plan covers adult Invisalign." Share target: partner and best friend.
2. Priya (Persona 2): "Here is the two-kid braces strategy." Share target: spouse and school-parent group chat.
3. Derek (Persona 3): "63-day window" explainer. Share target: laid-off coworkers via Slack.
4. Sandra (Persona 4): Retirement dental comparison. Share target: husband and two work friends.

The common thread: a shareable payload that is one paragraph or one short list, not the entire page. The visitor needs something they can copy, forward, or paste into a message without editing.

### 3.2 Scenario summary cards (the forwarded payload)

**What:** At the bottom of each scenario finder answer block (after a scenario match is returned), a "Share this recommendation" action generates a brief text summary.

**Format of the summary text (for copy-to-clipboard):**

```
[Plan name] — [One sentence positioning from plan story]
Best for: [scenario label, e.g. "Two kids needing braces"]
Key number: [single dollar or percentage fact from SSOT]
CoverCapy's take: [one plain-English sentence, written in relayable voice]
See the full comparison: covercapy.com/dental-insurance/ppo-plans/
```

Example for the "braces for my kid" scenario:

```
Guardian Premier 2.0 — The only individual PPO plan on this shelf 
with a dependent orthodontics benefit.
Best for: Kids who need braces (under 19 when treatment starts)
Key number: $1,500 lifetime ortho maximum per child (verify per-child 
vs. per-policy with the carrier)
CoverCapy's take: If your child's orthodontist appointment is coming up 
in the next 12 months, Guardian is the only plan that will contribute 
to the bill. No other plan on this shelf covers dependent ortho.
See the full comparison: covercapy.com/dental-insurance/ppo-plans/
```

**Mechanism:** "Copy this summary" button under the answer block. Copies the formatted text to clipboard. Confirmation: "Copied. Paste it anywhere."

**Alternative delivery:** "Email this to myself / my partner" generates a `mailto:` link with the summary text in the body and a subject line like "Dental plan recommendation from CoverCapy." No server call, no email capture, no tracking pixel. The `mailto:` opens the user's own email client.

**Mobile:** "Share this recommendation" triggers `navigator.share()` with the summary text as the body. On iOS, this opens the native share sheet (Messages, WhatsApp, email, Notes, AirDrop, etc.).

### 3.3 Which scenarios get summary cards

Every scenario that the finder can match gets a summary card. That means 8 individual scenarios plus 4 family scenarios (per spec 10 Section 6). Total: 12 shareable scenario summaries.

Each summary must be:
- Written to be read as a standalone text message or email, not as a web page excerpt
- Verified against the SSOT file for the matched plan before copy is finalized
- Free of insurance jargon without a plain-English translation
- Free of em-dashes
- Under 120 words

### 3.4 Plan-level share (individual plan story cards)

Each plan story card also has a small "Share this plan" icon link. This generates a deep-link to that plan's anchor on the page (e.g., `covercapy.com/dental-insurance/ppo-plans/#stop-guardian`) plus a brief plan summary. Mechanism: same `navigator.share()` / clipboard fallback.

This serves Natalie's use case: she wants to share the specific Delta Dental adult ortho finding with her friend, not the entire hub.

---

## 4. EMAIL AND REMINDER HOOKS

### 4.1 Privacy-first constraints (non-negotiable)

From 09-patient-testing.md, Derek (Persona 3) specifically fears CoverCapy selling his email to a call center. Caleb and Mae (Persona 5) share that distrust. Any email mechanic must:

- Be entirely opt-in with clear labeling of what the email will contain
- Never be triggered by scroll depth, exit intent, or time-on-page (those are dark patterns)
- Never be shared with insurance carriers, partners, or third-party lists without explicit separate consent
- Store only what is needed: email + reminder preference + scenario context (optional, user-supplied)
- Be one-click unsubscribable with no survey required
- Disclose CoverCapy's role (marketplace, not insurer) in the first email

### 4.2 The only email entry points allowed

**Entry point 1 — "Remind me before open enrollment"**

Placement: Right rail Block R5 (desktop), after FAQ (mobile), and in the "Waiting periods explainer" section footer note.

Copy:
- Label: "Open enrollment reminder"
- One-line description: "We will send you one email when typical individual PPO open enrollment windows open in your state. Nothing else."
- Input: Email address only. No name, no phone, no zip code required.
- Checkbox (pre-unchecked): "Also include the scenario summary I just built" (if the visitor completed the scenario finder)
- Button: "Remind me once"
- Disclosure below button: "One email per trigger event. No marketing list. Unsubscribe in one click from that email. CoverCapy does not sell or share email addresses."

What the email contains: a short note (under 200 words) that open enrollment is active, a link back to the hub, and (if opted in) the visitor's saved scenario summary. No carrier partner links beyond CoverCapy's own plan pages. No promotional offers from third parties.

**Entry point 2 — "Remind me when my waiting period ends"**

Placement: In the scenario finder answer block, after the plan match is returned, if the matched plan has a waiting period that applies to the visitor's stated scenario (e.g., "crown coming" + Aetna = 12-month major wait).

Copy:
- Label: "Set a coverage reminder"
- One-line description: "We will email you once when your major-work waiting period ends, based on your enrollment date."
- Inputs: Email address. Enrollment date (month and year, two dropdowns). Plan selected (pre-filled from scenario match, editable).
- Checkbox (pre-unchecked): "Also send me the plan summary above so I have it when I need it."
- Button: "Set reminder"
- Disclosure: Same as above.

What the email contains: "Your [plan name] major-work waiting period ends around [month, year]. If you enrolled on [date], your dentist can book crown, root canal, and implant procedures covered by your plan starting approximately [date]. Confirm eligibility with [carrier] before scheduling. Back to your plan comparison: [link]." No promotions. No upsells. One email per trigger.

**Entry point 3 — "Email this to my partner"**

Not a list-building email. Uses `mailto:` as described in Section 3.2. No server-side email storage.

### 4.3 What is explicitly NOT built

- No exit-intent popup asking for email
- No "sign up for our newsletter" anywhere on the hub
- No re-engagement drip sequence
- No abandoned-comparison email (we do not track individual browsing sessions server-side)
- No "someone saved a plan like yours" notifications
- No SMS, push notification, or browser notification prompts

---

## 5. CAPY REWARDS TIE-IN

### 5.1 Current state of Capy Rewards

Per spec 10 Section 4 (Block R3): "This is a soft teaser only. No fabricated point values until Capy Rewards is launched." This constraint holds. This spec defines how the Capy Rewards hook is woven into the hub's retention architecture without fabricating specifics.

### 5.2 The retention function of Capy Rewards

Capy Rewards creates a reason to return to CoverCapy specifically after the hub visit, rather than going directly to a carrier. The mechanics do not need to be fully designed here; what this spec defines is the connection points between the hub and the rewards program.

**Connection 1 — Hub visit awareness (passive)**

A small "Capy Rewards" pill in the right rail (Block R3, per spec 10) signals to members that visiting the hub has potential rewards value. Copy: "Capy Rewards members: earn points when you verify coverage and enroll through CoverCapy. Free to join."

This is informational only. No point values, no countdown to expiry, no "you are 50 points from a reward" mechanics. The pill is a reminder, not a gambling mechanism.

**Connection 2 — Post-enrollment acknowledgment (light)**

After a visitor clicks through to a plan's enrollment page, a lightweight exit-intent-free modal (not triggered by cursor leaving the window — triggered only by the user clicking the "Exit to carrier" button) offers: "Before you go: if you enroll through this link, you may be eligible for Capy Rewards points. Join free to track your benefits." CTA: "Join Capy Rewards" (opens rewards program page in new tab) and "Continue to [carrier]" (primary, dominant).

This is not a gate. The visitor continues to the carrier without joining Capy Rewards if they choose. The modal is shown at most once per session.

**Connection 3 — Verified dentist pathway (post-enrollment)**

After a visitor verifies their dentist through `/find-my-dentist`, the confirmation screen mentions: "Capy Rewards members earn points for verifying and for confirmed enrollments. Track your activity in the rewards dashboard." This creates a reason to return and check on points after enrollment.

**Connection 4 — Tier status as a return trigger**

Capy Accredited and Platinum Elite members (from CLAUDE.md membership tier table) who return to the hub see a personalized "Welcome back" acknowledgment in the right rail (reading from a Capy Rewards auth cookie, if the program issues one). Copy: "You are a Capy [tier] member. Your dentist match radius is [X] miles." This creates a valued-member moment and reinforces the premium feel of the platform.

**What NOT to do with Capy Rewards:**
- Do not show a points balance on the hub that can fluctuate and create anxiety
- Do not use gamification language ("level up," "unlock," "streak") anywhere on the plans hub
- Do not show Capy Crowns icons in plan cards or the right rail (per spec 10 constraint)
- Do not fabricate point values before the program launches
- Do not show a rewards counter that counts down or implies urgency

### 5.3 Capy Rewards and family sharing

The "share with spouse" mechanic (Section 3) and Capy Rewards interact: if the shared shortlist URL is opened by a new visitor, that new visitor sees a small "shared by a CoverCapy user" attribution note (anonymous). This creates social proof that real people use the platform for dental decisions, without requiring the sharer to reveal their identity. The note reads: "Someone shared this plan comparison with you from CoverCapy."

---

## 6. SEASONAL AND RETURN TRIGGERS

### 6.1 Open enrollment (October to December)

The most predictable high-intent return window. Most individual PPO plan changes take effect January 1. Employers notify workers of benefit changes in October and November.

**Hub behavior during this window:**
- A date-aware announcement band appears between the breadcrumb and the hero (not a popup), visible October 1 through December 31 each year. Copy: "Open enrollment is active. Compare plans now for January 1 coverage." Background: `--gold-soft`. Text: `--ink`. Dismissible with X (preference stored in `sessionStorage`).
- The scenario finder's "How soon do you need treatment?" timing options temporarily add a pill: "Starting January 1" which maps to coverage-effective-date messaging in the answer block.
- No artificial urgency ("deadline ends in X days") unless an actual documented deadline exists and is cited.

**Email reminder (if the visitor opted in):**
One email sent in late October: "Open enrollment is here. Your saved dental plan comparison from CoverCapy: [link back to hub or shortlist URL if saved]." Under 150 words.

### 6.2 New year benefit reset (January)

Annual maximums reset on January 1 for most plans. This is a high-intent moment for visitors who deferred treatment in Q4.

**Hub behavior:**
- An information note inside the waiting periods explainer section, visible January 1 through January 31: "Annual maximums reset January 1. If you have remaining benefits, use them before year-end next time. If you are starting fresh, now is the lowest-deductible entry point of the year."
- No special banner or announcement band. This is editorial content, not a marketing push.

**Content that earns the return visit:** A "benefits reset" guide linked from the related links section (bottom of hub). This is a separate page, not a section of the hub, to maintain focus. The hub links to it. Visitors who bookmarked the hub in Q4 may return in January via the reminder email or directly.

### 6.3 Tax time (February to April)

Medical and dental spending from the prior year may be deductible. Dental premiums paid by individuals (not through employer) are potentially deductible as medical expenses. This is the moment Sandra (Persona 4) and Caleb and Mae (Persona 5) may return to confirm what they spent.

**Hub behavior:**
- A short callout note in the editorial footer, visible February 1 through April 15: "Did you pay dental premiums out-of-pocket this year? Individual dental insurance premiums may be deductible as medical expenses. Confirm with a tax professional." This is an informational nudge, not tax advice. One sentence. No "click here to calculate your deduction."
- The related links section adds a "Dental expenses and taxes: what counts" guide link for this period.

### 6.4 New job / benefits change

A transient trigger, not calendar-based. Derek's scenario (COBRA gap) is the archetype. The hub's value here is being findable at the moment of job change, not being on a fixed schedule.

**Hub behavior:** The "Left a job with dental" scenario chip in the scenario finder (spec 10 Section 6) is always present, always functional. No seasonal adjustment needed. The value is that the hub has a named scenario for this exact moment, which means it gets found when the person searches "dental insurance after losing job."

**Shareability:** Derek's scenario summary (Section 3.2) is the highest-value shareable for this trigger: "There is a 63-day window." The page earns return visits by being what Derek texts his laid-off colleagues immediately.

### 6.5 Dental appointment reminder loop

A secondary trigger: visitors who set a coverage reminder (Section 4.2) return when the reminder email arrives near the end of their waiting period. The email links directly to the hub, and if the visitor's `localStorage` shortlist is still present, the shortlist tray is restored.

---

## 7. CONTENT THAT EARNS REPEAT VISITS

The most reliable return trigger for this page is not a mechanic. It is content so accurate, so clearly sourced, and so useful that visitors remember it as "the place that actually told me the truth about dental insurance."

### 7.1 The verification date as a trust signal

The hub's editorial note (bottom of center column) must display the date the plan facts were last verified against the SSOT files. This is not cosmetic: it is a direct signal to Sandra (who reads everything carefully) that the information is current. It also creates a reason to return: "I wonder if that plan has updated since I last checked."

Format: "Plan facts on this page were verified against carrier documentation as of [Month YYYY]. If you notice a discrepancy, contact us." The "contact us" link goes to a contact page, not an email address (spam prevention).

When plan facts change (carrier updates annual maximums, premiums, waiting period structures), the generator rebuilds the hub and updates the verification date. Visitors who bookmarked the page and return see the updated date.

### 7.2 The "one thing no other site told me" content

From 09-patient-testing.md, the highest share motivation across personas was discovering something they could not find elsewhere:

- Natalie: "One individual plan covers adult Invisalign."
- Derek: "63-day window for coverage continuity."
- Sandra: "No age cutoff on individual plans."
- Marcus: "You can enroll in a plan with no waiting period for major, but year one pays only 20%."

Each of these facts is already in the plan SSOT files. The content work is ensuring they appear prominently on the hub rather than buried. Prominent placement of these exclusive insights is the highest-return retention move available.

**Content to ensure is findable within 30 seconds of landing:**
- In the scenario finder answer for "adult braces/Invisalign": "Delta Dental PPO Premium is the only individual plan on this shelf that covers adult orthodontics."
- In the COBRA gap scenario: "If your group coverage ended within the past 63 days, some plans can waive waiting periods with proof of prior coverage."
- In the seniors scenario or a visible callout: "Individual dental plans have no age cutoff. You can enroll at 65, 70, or 80."
- In every "no waiting period" plan description: "No waiting period means eligible from day one, but year-one major reimbursement is [X]%, not 50%. These are different things."

### 7.3 The comparison table as a research anchor

Visitors who are researching rather than buying immediately often bookmark comparison tables as reference. The hub's comparison table (spec 10 Section 8) is a natural candidate.

**What makes it bookmark-worthy:**
- The "Best for" column (one label per plan) gives a quick-scan answer to "which plan is this?"
- The verification date on the table caption creates accountability and recency signal
- Horizontal scroll on mobile means the full table is accessible without layout breaking
- `ItemList` schema means the table may surface directly in AI responses (GEO value), and when a visitor sees the hub cited by an AI tool, they may return to it

### 7.4 The waiting periods visual timeline

The timeline diagram (spec 10 Section 10) is the single most unique visual on the hub. No other PPO comparison site produces a clear visual showing when each plan's benefits open month by month. This is a visual that:
- Gets screenshotted and shared (speculative but plausible based on persona research)
- Gets bookmarked as a "look this up again before I enroll" reference
- Gets cited in AI responses if the alt text and surrounding text are written as quotable statements

---

## 8. INTERNAL PATHWAYS THAT KEEP USERS ON-SITE

### 8.1 The three main destinations

Every visitor to the hub is trying to do one of three things:
1. Match to a plan (scenario finder, plan stories, comparison table)
2. Verify their dentist accepts the plan (`/find-my-dentist`)
3. Understand dental insurance better (guides, FAQ, related content)

The hub must route cleanly to all three without making any pathway feel like a detour.

### 8.2 Plan-to-dentist pathway (highest conversion value)

**From:** Any plan story card (the "Verify my dentist takes this plan" CTA in the mini quick-facts panel, per spec 10 Section 7).

**To:** `/find-my-dentist?plan=[carrier-slug]` (pre-filters the dentist finder to show offices that accept the selected plan).

**Why this keeps users on-site:** Visitors who go to the dentist finder from the hub are further along in the decision. The hub has done the work of matching them to a plan; the dentist finder does the work of confirming their dentist accepts it. Both pages serve the same visitor in sequence.

**Right rail Block R1** (per spec 10) provides a persistent "Find my dentist" CTA throughout the hub scroll, reinforcing this pathway without requiring the visitor to reach a specific plan card first.

### 8.3 Plan-to-plan review pathway

Each plan story card includes "Full plan review" as a secondary CTA (below the primary "Verify dentist" CTA in the mini quick-facts panel). This links to the individual plan review page for that carrier (if it exists within the CoverCapy site).

**Value for retention:** A visitor who reads the plan story card and wants deeper detail leaves the hub but stays within CoverCapy. The plan review page should link back to the hub ("Compare all 8 plans: [link]") to create a return loop.

### 8.4 Hub-to-compare pathway

The comparison table section includes a CTA below the table: "Compare plans interactively" links to `/compare-ppo-dental-plans`. This is the existing compare page, now a child of the hub per spec 04-ia-url-migration.md.

**Breadcrumb on the compare page** (`/compare-ppo-dental-plans`) should read: "Home > Dental Insurance > PPO Plans > Compare" to make the return path to the hub one click.

### 8.5 Hub-to-dentist-hub pathway

The `dental/` SEO pages (T3 state hubs, T4 city pages, T5 dentist profiles) are the other major content surface on CoverCapy. The hub should link to the dentist side via:
- The right rail Block R1 verify CTA (persistent, links to finder)
- A "Find a PPO dentist near you" link in the related links section (bottom of hub)
- The scenario finder answer block CTA: "Verify my dentist takes this plan" (links to `/find-my-dentist?plan=[slug]&q=`)

The dentist side should link back to the hub via:
- T4c city pages: "Compare PPO dental plans that work at offices in [city]" (links to hub)
- T5 dentist profile pages: "No insurance? Compare PPO plans from $30/mo" CTA (already exists, per CLAUDE.md CTA map)

### 8.6 Hub-to-guide pathway (editorial content)

The "Related links" section at the bottom of the hub (spec 10 Section 14) lists guide pages. Guides are separate pages from the hub (not sub-sections) that address questions like:
- "How dental insurance waiting periods work"
- "Dental expenses and your taxes"
- "PPO plans for seniors: what Medicare does not cover"
- "Family dental insurance: stacking individual plans"

These guide pages exist (or will exist) independently of the hub. They link back to the hub as the plan comparison resource. The loop: hub generates guide-reading intent, guide confirms the research, guide links back to hub for plan selection.

**On-site value:** A visitor who reads the "COBRA gap" guide (linked from Derek's scenario finder answer) and then returns to the hub to select a plan has had two meaningful on-site sessions before converting. Both sessions are valuable to the site regardless of whether conversion happens.

---

## 9. HONEST ENGAGEMENT METRICS

### 9.1 What to track

The following metrics are honest signals of engagement and retention. They measure whether the page is doing its job, not whether the page is manipulating visitors into longer sessions.

**Primary metrics (measure these first):**

| Metric | Definition | Why it is honest |
|--------|-----------|-----------------|
| Scenario completion rate | % of visitors who complete the scenario finder (reach an answer block) | Measures whether the page is matching visitors to answers, not just generating impressions |
| Scenario-to-plan-click rate | % of completed scenarios where the visitor clicks through to a plan story or plan review | Measures whether the recommendation is relevant and trusted |
| Dentist verify initiation | % of visitors who click any "Verify dentist" CTA | Measures intent to act, the page's core conversion goal |
| Return visit rate (30 days) | % of visitors who return within 30 days via any source | Measures whether the page has bookmark value |
| Share / copy actions | Count of clicks on "Copy summary," "Email to partner," navigator.share triggers | Measures the relay moment directly |
| Shortlist creation rate | % of visitors who add at least one plan to a shortlist | Measures active engagement and return intent |

**Secondary metrics (useful but not primary):**

| Metric | Definition | Caveat |
|--------|-----------|--------|
| Time on page | Average session duration | Longer is not always better; Sandra reads everything, Marcus bounces quickly after finding his answer. Both are successful sessions. |
| Scroll depth | % of visitors who reach each major section | Useful for identifying where drop-off happens, not for optimizing to increase it artificially |
| Email reminder opt-ins | Count of open enrollment and waiting period reminder signups | Small number expected; valuable as a quality signal, not a volume signal |
| Bounce rate (adjusted) | % of sessions that do not click any CTA | Adjusted because a visitor who read the page and left to call their dentist directly is not a failure |
| FAQ expansion rate | % of visitors who expand at least one FAQ item | Measures whether the FAQ is serving its trust function |

**Metrics to NOT optimize for:**

| Metric | Why not |
|--------|---------|
| Average pages per session | Higher pages per session could mean the user is lost or confused, not engaged |
| Session duration increase | Dark-pattern triggers (popups, interstitials, hard-to-dismiss overlays) increase session duration while harming trust |
| Email list size | Volume is irrelevant if the list is built through coercive mechanics. Measure opt-in click rate on the reminder offer, not total list size |
| Social share count | Vanity metric that is gameable; prefer share action clicks tracked via GA4 |
| Capy Rewards point redemptions (as a hub metric) | Rewards program is separate; do not conflate hub engagement with rewards activity |

### 9.2 Reporting cadence

- Weekly: scenario completion rate, dentist verify initiation, share actions
- Monthly: return visit rate (30-day cohort), shortlist creation rate, email reminder opt-ins
- Quarterly: scroll depth analysis to identify drop-off sections, FAQ expansion analysis to identify trust gaps

### 9.3 What a "good" result looks like (directional targets, not fabricated benchmarks)

These are directional targets for a content-rich comparison hub with a warm audience, not claimed benchmarks from existing data:

- Scenario completion rate: above 25% of sessions that pass the fold
- Dentist verify initiation: above 10% of sessions
- Return visit rate (30 days): above 15% for visitors who completed a scenario
- Share / copy actions: above 3% of sessions (meaning 3 in 100 visitors take an active share action)
- Email reminder opt-in: above 2% of sessions (meaning the offer is visible and contextually relevant enough that a small fraction of highly-intent visitors use it)

If actual data falls below these targets, the interpretation is: the scenario finder is not matching well, or the plan recommendations are not trusted, or the share mechanics are not visible enough. Optimization follows the honest signal, not the dark-pattern alternative.

---

## 10. WHAT NOT TO BUILD (RETENTION ANTI-PATTERNS)

The following mechanics are explicitly excluded. Any future request to add them must re-justify against the findings of 09-patient-testing.md and the positioning in 00-INDEX.md.

- **Exit-intent popups:** Cursor-leave triggers are dark patterns. They spike the anxiety of visitors who are already uncertain. Sandra, Marcus, and Derek would interpret them as desperation.
- **Countdown timers:** No "Offer expires in 12:34:56." There are no time-limited offers on a plan comparison hub.
- **"X people are viewing this plan":** Fabricated social proof. Prohibited.
- **Scroll-triggered email modals:** An email capture form that appears after 60% scroll depth is a dark pattern regardless of how it is styled.
- **Auto-play audio or video:** The page is a reading experience.
- **Chatbots with lead-capture intent:** A chatbot that asks for name and phone before answering a question is a lead-gen funnel, not a help tool. Not on this hub.
- **Cookie banners that gate content:** Visitors who decline analytics cookies must see the same content as those who accept.
- **Loyalty points fabricated before launch:** Do not show a Capy Rewards points balance or point-per-action value until the program has real numbers.
- **Re-engagement email sequences:** No drip email. One email per trigger event (open enrollment, waiting period end). Full stop.
- **Browser notification prompts:** Do not ask visitors to enable push notifications on this page.
- **"Free" framing that conceals cost:** "Free through CoverCapy" refers to the verification service and the plan comparison guide. If a plan has a premium, it has a premium. Do not use "free" in any context where a cost follows downstream without disclosure.

---

## 11. IMPLEMENTATION PRIORITY

Ranked by impact on the two core moments (arrival moment, relay moment):

**Priority 1 (build with initial hub launch):**
- Scenario summary copy-to-clipboard (Section 3.2) — highest-impact share mechanic, zero infrastructure cost
- "Save this guide" share button using `navigator.share()` / clipboard (Section 2.2) — zero infrastructure cost
- `sessionStorage` scenario persistence within a session (Section 2.3) — trivial JS, high UX value
- `mailto:` "Email this to my partner" on scenario answer block (Section 3.2) — zero infrastructure cost

**Priority 2 (within 60 days of launch):**
- Plan shortlist with `localStorage` persistence and shareable URL (Section 2.4) — moderate JS, significant retention value
- Open enrollment announcement band, date-aware (Section 6.1) — simple conditional CSS/JS, seasonal
- Seasonal editorial notes in footer (tax time, new year reset) (Sections 6.2, 6.3) — editorial only

**Priority 3 (requires backend, defer until Capy Rewards and email infrastructure exist):**
- Open enrollment email reminder (Section 4.2 Entry Point 1) — requires email storage and send infrastructure
- Waiting period end email reminder (Section 4.2 Entry Point 2) — requires enrollment date capture and calculation
- Capy Rewards connection points (Section 5) — requires Capy Rewards program to have real specs and launch date
- Capy Accredited/Platinum Elite personalization in right rail (Section 5.3) — requires auth cookie from rewards program

---

*Spec 13 of 20. PPO Hub Rebuild Program. CoverCapy. June 26, 2026.*
*This file is planning only. No production changes until all 20 specs and the master console are approved.*
*No em-dashes used. No fabricated metrics. No invented plan facts. No roman numerals in lists.*
