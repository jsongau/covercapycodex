# Agent 11 — Retention & Learning-System Specialist

## Memo to the CoverCapy PPO redesign council
**Scope:** how a user learns enough to decide without reading an encyclopedia; returning to saved
comparisons; treatment-specific learning paths; glossary tooltips; visited-state memory; progress
indicators; plan-renewal / annual-reset education; non-intrusive retention loops. Loyalty (Capy
Crowns / Diamonds) only where it is honest and non-manipulative.

**Founder's fear addressed head-on:** *"too basic / worse than current."* The current page is NOT
basic on learning. It already ships a genuinely strong education layer. The redesign's real risk is
**regression** — a spec-first "research terminal" that strips the warm, in-context teaching that makes
CoverCapy feel like a concierge rather than a price grid. This memo's first job is a preservation
contract; its second is a short list of additions that deepen retention without adding spam.

---

## PART A — WHAT THE CURRENT PAGE DOES WELL (do NOT lose this)

Evidence from `compare-ppo-dental-plans.html` + `assets/ppo/glossary.json` + `ppo-hub.js`:

1. **In-context "teaching moment" tooltips, not a glossary dump.** The page wraps the *first prose
   mention* of each glossary term in a `cc-tip` span (`compare-ppo-dental-plans.html` ~line 2061–2089)
   and also tags every coverage label in cards/matrix via `tipSpan(slug,label)` (lines 1360, 1433).
   Each tooltip carries three layers: **definition + "Why it matters" + a link to the full term
   guide**. That "Why it matters" line is the single most important learning asset on the page — it
   converts a definition into a decision. The redesign's `data-term` system (`ppo-hub.js` `initGlossary`
   reading `assets/ppo/glossary.json`) is the *correct* canonical replacement, but `glossary.json`
   today only stores `term` / `short` / `url` — **it drops the `why` field**. That is a regression.
   **KEEP:** the three-layer tooltip (definition, why-it-matters, full-guide link) and the
   first-mention auto-wrap behavior.

2. **A real glossary network, not a stub.** 24 term pages exist under `/dental-insurance-glossary/`
   (annual-maximum, deductible, coinsurance, waiting-period, effective-date, calendar-year, coverage
   tiers, balance-billing, allowed-amount, ada-fee, cdt…). Tooltips deep-link into them. This is a
   crawlable, reusable learning spine. **KEEP and reuse** across hub, carrier hubs, plan spokes,
   treatment pages — one `glossary.json`, never re-defined per page.

3. **Learning is layered by intent, so nobody must read everything.** Smart Match (need → timing →
   budget) teaches *by doing*; the "reading room" FAQ rail is categorized and collapsed by default;
   `MISTAKES`, `SITUATIONS`, `TREATMENTS`, and `ARTICLES` arrays (lines 1787–1800) give scannable
   pathways. A user can decide from Smart Match alone, or descend as far as they want. **KEEP** this
   progressive-disclosure ladder.

4. **A scroll progress indicator already exists** (`toc-prog` bar + scrollspy, line 1839) so the user
   sees how far the page goes and that it ends. **KEEP**; reuse as the sticky-subnav active-state.

5. **Treatment-and-situation entry points double as learning paths.** "I was laid off and lost
   dental," "My kid needs braces," "I need a crown this year" (`SITUATIONS`) preload Smart Match state.
   This is a learning path disguised as a shortcut. **KEEP** — and make it persist (Part B).

6. **Loyalty is already restrained and post-action.** Capy Diamonds/Crowns appear only in verify /
   nominate / book modals and one "rewards" line, tied to a real action (office responds, appointment
   kept). No points for "viewing." That is the ethical pattern. **KEEP** the rule: *rewards follow a
   completed real-world action, never a click or a "streak."*

**If the redesign loses items 1–6 it will feel worse than current, exactly as the founder fears.**
Make this a written preservation gate in `19-QA-ACCEPTANCE-SCORECARD.md`.

---

## PART B — WHAT MUST BE ADDED

The current page teaches well but **forgets the user instantly**. Nothing persists between visits, the
comparison cannot be saved or returned to, and there is no renewal/annual-reset education. These are
the retention gaps.

### B1. Restore `why` to `glossary.json` (blocking, trivial)
Add a `why` field to every term in `assets/ppo/glossary.json` and have `initGlossary` render it as the
gold "✦ Why it matters" line (markup already styled as `.cc-tooltip-why`). Without this the redesign
ships a *worse* tooltip than production. One-time data edit; highest value-per-effort fix on this list.

### B2. Saved / returnable comparisons (the #1 retention gap)
- **Persist the compare tray to `localStorage`** (the approved design system already mandates tray
  persistence — extend it to a *named, restorable* comparison). On return, show a quiet
  "Pick up where you left off — your 3 plans" restore chip below the hero. No login required.
- **"Save this comparison" → shareable URL** that encodes plan keys + Smart Match inputs in the query
  string (server-rendered-safe, deep-linkable, the master prompt already calls for URL state). This is
  the legitimate save/return loop: the user owns a link, not an inbox obligation.
- **"Email this comparison" stays optional and ungated.** Email is a *delivery choice*, never a wall
  before results (master prompt: no email before results). If given, it becomes the one permission for
  a *single* "your saved plans changed" follow-up — see B5.

### B3. Visited-state memory (calm, useful, not creepy)
- Mark plan cards / term links the user has already opened with a subtle "Viewed" affordance (a hairline
  check, not a color flood) using `localStorage`. This lowers re-reading load on return — the core of
  "decide without an encyclopedia."
- Remember the last Smart Match inputs and last density mode (`cc-comfort` / `cc-terminal`) so a
  returning user lands in their own context. Reuse the existing `cc-palette` localStorage pattern.
- **Guardrail:** all memory is local, dismissible, and stated ("We remember your picks on this device").
  No cross-device tracking implied without an account.

### B4. Treatment-specific learning paths (make `SITUATIONS`/`TREATMENTS` a guided sequence)
Today these are one-click presets. Upgrade to a **3-step path** per treatment: *what insurance covers
for this → effective-date vs. waiting-period for this tier → best-fit plans (filtered comparison) →
questions to ask + find a dentist*. This is the treatment-page anatomy from the master prompt; the hub
should **link into it**, and a "progress dots" indicator (1 of 3) should show the path has an end. Each
step reuses canonical plan data and glossary tooltips — no new content engine.

### B5. Plan-renewal & annual-reset education (currently MISSING, high trust value)
The glossary defines `calendar-year` reset, but nothing *teaches the user to act on it*. Add a small,
honest module (on plan pages and a glossary term guide, optionally surfaced post-decision):
- "Your benefits reset every January 1. Unused annual maximum does **not** roll over."
- "Sequence a crown across two plan years to stretch a $1,000 max." (a concrete numeric example)
- For users who saved a comparison **with consent**, exactly **one** dated, useful nudge per year:
  *"Open enrollment / your reset is near — here's how your saved plans changed."* This is the only
  recurring outbound message the system should ever send. It is calendar-anchored and genuinely useful,
  which is the line between retention and spam.

### B6. Non-intrusive retention loops — the rules
- **No streaks, no countdowns, no "X people viewing," no daily points.** (Master prompt + design
  system already ban fake urgency; extend the ban to engagement-farming loops.)
- Retention = *making return valuable*, not *making leaving costly*: saved link, restored picks,
  remembered context, one annual reset reminder. That is the entire loop.
- **Account creation stays a convenience, never a gate.** Offer it *after* a real action (saved
  comparison, verification sent) with a clear benefit ("keep your verifications and rewards in one
  place" — copy already exists at line 1008), echoing the existing post-action loyalty pattern.

### B7. Loyalty tie-in (only where honest)
Keep Capy Crowns/Diamonds **exactly** where they are: post-verification, post-nomination, post-kept-
appointment. **Do not** award them for learning, comparing, or saving — gamifying education cheapens
the concierge tone and invites manipulation complaints. The one allowed expansion: a Diamond when a
**dentist office actually confirms** a verification (a real outcome), which also closes the
verification trust loop.

---

## PART C — ACCEPTANCE CRITERIA / RISKS

**Acceptance:**
- `glossary.json` has `why` on every term; tooltips render definition + why + guide link; ≥1 tooltip
  per coverage row survives in the redesigned matrix.
- Compare tray persists; a saved comparison is restorable via URL and via on-return restore chip; no
  email required to save.
- Visited memory + last-inputs + density mode persist locally and are dismissible.
- A renewal/annual-reset learning module exists with a numeric example.
- Zero engagement-farming patterns; at most one consented, calendar-anchored annual email.
- Loyalty rewards remain attached to completed real-world actions only.

**Risks:** (1) the spec-first terminal aesthetic crowds out the warm in-line teaching — mitigate by
making tooltips and the "why" line non-negotiable in the matrix. (2) Save/email could drift into a
lead-capture wall — guard with "results before email, always." (3) localStorage memory reading as
surveillance — mitigate with an explicit, dismissible "remembered on this device" note.

---

## SCORE

**Current retention & learning quality: 6 / 10.**
Teaching-in-context, the three-layer tooltips, the glossary network, intent-layered disclosure, the
progress bar, and *restrained, post-action* loyalty are genuinely above category norm — strong bones.
It loses points because it has **no memory**: comparisons can't be saved or returned to, nothing
persists between visits, treatment paths don't show progress to an end, and the highest-trust learning
topic (annual reset / renewal, "use it or lose it") is defined in the glossary but never *taught as an
action*. The redesign can reach 8.5+ purely by adding persistence and the renewal module — provided it
does not regress the in-context teaching it already has (notably the dropped `why` field).

## TOP 3 RECOMMENDATIONS
1. **Restore the three-layer tooltip and add `why` back to `glossary.json`** — without it the redesign
   ships a *worse* learning experience than production. Trivial effort, highest value, blocking.
2. **Ship saved/returnable comparisons** — persist the tray, encode picks + Smart Match inputs in a
   shareable URL, add an on-return "pick up where you left off" restore chip, keep email optional. This
   is the single biggest retention gap.
3. **Add a plan-renewal / annual-reset learning module** (with a concrete max-stretching example) and
   make it the *only* recurring outbound touch — one consented, calendar-anchored reminder per year.
   This is high-trust education and the entire ethical retention loop in one move.
