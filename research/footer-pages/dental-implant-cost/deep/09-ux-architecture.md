# 09 — UX Architecture & Wireframe

## Flagship `dental-implant-cost.html` | Workstream 9 of 10

Research only. No HTML produced. This is the section-by-section blueprint the build agent
should follow so the implant-cost page reads as a CoverCapy luxury-editorial cost guide,
not a SaaS pricing page or a healthcare portal. It assumes the existing scoped class
`.implant-cost-page`, the existing palette tokens, and the existing component vocabulary
(`.tldr`, `.section-head`, `.prose`, `table`, `.checklist`, `.callout`, `.example`,
`.steps`, `details.faq`, `.related-grid`, `.cta-band`, `.src`, `.page-legal`).

Everything below is consistent with `CLAUDE.md` ("what NOT to build") and the BUILD-BRIEF.
The current `dental-implant-cost.html` is already close; this document upgrades it into a
fuller, more trustworthy, GEO-optimized cost page and specifies the parts it is missing
(at-a-glance summary, dedicated single-tooth vs full-arch tables, a "why quotes vary"
add-on table, a featured-plan coverage table read straight from `data/plans/`, a
financing/ways-to-save split, a related-cost rail, and an optional sticky concierge bar).

---

## 0. North-star principles (apply to every section)

1. **Editorial magazine, not a price grid.** Generous whitespace, one idea per band,
   serif headlines (Fraunces 500), body in Hanken Grotesk. Cost figures are presented as
   honest *ranges*, never single false-precision numbers. This matches the comparison-page
   and About-page voice.
2. **GEO-first.** The most extractable answer (headline cost figure + one-sentence quick
   answer) sits at the very top, in plain prose, mirrored verbatim in the `FAQPage` and
   `MedicalWebPage` schema, so AI Overviews and ChatGPT lift it cleanly. Every table caption
   restates its key number in a sentence so an answer engine can quote it without parsing the
   table grid.
3. **Trust is the conversion lever, not urgency.** No countdown timers, no "only 3 left",
   no fake scarcity (CLAUDE.md forbids these and 2026 cost-page research confirms trust
   beats manufactured urgency on health-cost content). Trust signals: sourced figures with
   access dates, a "facts come from verified plan files" micro-note, the scoped legal note,
   and the "CoverCapy is not an insurer" disclaimer near the final CTA.
4. **Single source of truth for plan numbers.** Every figure in the featured-plan coverage
   table is read from `data/plans/*.md` (see workstream that owns plan reconciliation). The
   build agent must never type a premium, maximum, waiting period, or coinsurance number that
   is not in those files. National *cost* ranges (what a procedure costs in the market) come
   from the sourced research packs, not `data/plans/`.
5. **Motion restraint.** Reuse the About page's `.reveal` IntersectionObserver fade-up
   (opacity + 24px translateY, 0.7s ease) on section heads and cards only. No parallax, no
   auto-playing carousels, no number count-up animations on cost figures (count-up animations
   read as gimmicky on health-cost content and hurt the "calm concierge" feel). All motion is
   killed under `prefers-reduced-motion: reduce`, which is already in the page CSS.

---

## 1. SECTION-BY-SECTION WIREFRAME

Order, top to bottom. Each entry: purpose, layout, components, and the GEO/trust note.

### 1.1 Breadcrumb
- `nav.crumb`: Home / **Dental Implant Cost**. Matches existing. Mirrors `BreadcrumbList` schema.
- Sits in `.wrap`, small, `--ink-faint`. No band.

### 1.2 Hero (`section.hero`, id `top`)
- **Eyebrow:** `CoverCapy · Cost Guide`.
- **H1 (one per page):** keyword-led, e.g. *"How Much Does a Dental Implant Cost?"* Fraunces
  `clamp(2.3rem,5.4vw,3.9rem)`. Italic emphasis allowed on one word (e.g. *cost*) per About-page pattern.
- **Headline cost figure (NEW, GEO quick-answer):** directly under the H1, a single large
  serif line that states the dominant number as a range, e.g.
  *"A single implant runs about $3,000 to $6,000, all in."* This is the figure an AI engine
  and a skimming patient both grab first. Style it as a `.lead`-sized serif statement, not a
  badge. Keep it factual; the supporting nuance lives in the TL;DR block just below.
- **Lead paragraph:** the 2026-breakdown promise (what one tooth and a full mouth cost, what
  PPO pays, how to spend least). Max ~64ch.
- **Hero CTAs (`.hero-cta`):** primary `Compare PPO plans that cover implants` →
  `/compare-ppo-dental-plans`; ghost `Estimate your out-of-pocket cost` →
  `/dental-treatment-cost-estimator.html`. Two CTAs max in the hero; button copy states the
  outcome ("Compare PPO plans that cover implants" beats "Get started" per 2026 CTA research).
- **Micro-note (`.micro-note`):** the "facts drawn from verified CoverCapy plan files / cost
  figures are 2026 national ranges, not quotes" line. This is a quiet trust signal directly
  under the CTAs.
- Hero is on the page's soft `::before` radial-gradient ground (no carded gradient panel),
  consistent with About.

### 1.3 TL;DR / Quick answer (`.tldr`)
- Full-width band card, mint left-border, serif body text. One short paragraph that is the
  canonical extractable answer and is mirrored verbatim into the first `FAQPage` answer:
  single implant typically $3,000–$6,000; PPO pays ~20–60% after a waiting period, capped by
  the annual maximum and sometimes blocked by a missing-tooth clause; plan on $1,500–$3,000
  out of pocket even with coverage.
- Label "Quick answer" in `--teal-700` uppercase. This is the single most important GEO block;
  keep it self-contained (no pronouns that need earlier context).

### 1.4 At-a-glance cost summary (NEW)
- **Purpose:** give a skimmer the four numbers that matter before any deep table: single tooth,
  single tooth with PPO, full arch (All-on-4), full mouth. This is the "scannable summary above
  the detailed table" that 2026 cost-page UX recommends.
- **Layout:** a 4-up "stat card" grid, reusing the `.steps`/`.pillar` card pattern
  (`grid-template-columns:repeat(auto-fit,minmax(240px,1fr))`). Each card: a small uppercase
  label (`--teal-300`), the range in Fraunces (large), and one line of context.
  - Card 1: *Single implant, all in* — $3,000 to $6,000.
  - Card 2: *Single implant, with PPO* — about $1,500 to $3,000 out of pocket.
  - Card 3: *Full arch (All-on-4)* — $20,000 to $35,000 per arch.
  - Card 4: *Full mouth, both arches* — $30,000 to $50,000+.
- **GEO note:** add a one-sentence lead-in above the grid ("Here is the whole picture in four
  numbers, before the detail") so an answer engine can lift the summary as a definition list.
- **Style guidance:** these cards are NOT gradient-on-card (forbidden). Flat `--cream-card`
  background, 1px `--line` border, `--shadow-sm`, the same hover lift as `.step`. The range
  number is the only large element; keep it from competing with the H1 by using a slightly
  smaller serif size (~1.6rem) than the hero figure.

### 1.5 What you are paying for: the pieces of a single implant
- Keep the existing prose intro (implant vs bridge, staged over months, stacked charges).
- **Single-tooth component table** (the existing one, refined): Component | Typical 2026 range,
  with a highlighted `tr.total` row "Total, single tooth, all in | $3,000 to $6,000".
- Follow with the high-cost-metro paragraph (NYC / LA / Chicago 20–40% higher).
- `.src` line with the sourced cost links + access date.

### 1.6 What moves the number up or down (price drivers)
- `section.band`. `.checklist` of drivers: geography, who places it (oral surgeon /
  periodontist vs GP), materials (zirconia vs titanium/porcelain), preparatory surgery
  (extraction / bone graft / sinus lift), and how many teeth. Matches existing.
- This is the qualitative bridge into the add-on table.

### 1.7 Why quotes vary: add-on / preparatory cost table (NEW, distinct from 1.5)
- **Purpose:** the single biggest source of "the quote was higher than I expected" is
  preparatory work billed on top of the implant. Give it its own table so patients can
  self-diagnose why two quotes differ. This is the "why quotes vary" table the brief asks for.
- **Table:** Add-on / variable | Typical 2026 range | When it applies.
  - Tooth extraction — $300 to $800+ — if the failing tooth is still in place.
  - Bone graft (socket) — $300 to $1,200 — if the jawbone needs volume to hold the post.
  - Sinus lift / major graft — $1,500 to $5,000 — upper-back implants near the sinus.
  - Specialist placement (oral surgeon / periodontist) — adds a premium over a GP fee.
  - Premium materials (zirconia post / crown) — adds several hundred dollars per unit.
  - High-cost metro (NYC, LA, Chicago) — adds roughly 20% to 40% over the national range.
- A third "When it applies" column is what makes this table genuinely useful and is the part
  competitors usually omit. Keep ranges, never single numbers.
- `.src` line.

### 1.8 Full mouth and All-on-4 (full-arch table)
- Keep the existing full-arch section: prose on fixed full-arch designs, then the per-arch
  table (All-on-4 acrylic $20k–$35k; premium zirconia $35k–$90k+; both arches $30k–$50k;
  more implants per arch +$5k–$15k). `.src` line.
- Caption sentence restating the headline: "A full mouth, both arches, commonly runs
  $30,000 to $50,000."

### 1.9 With vs without PPO (comparison block)
- `section.band`. This is the emotional core: the same implant, two outcomes.
- **Primary device — a two-column compare block (NEW, alongside the existing plan table).**
  A simple side-by-side card pair ("Paying cash" vs "With a PPO plan") using the About-page
  `.split` two-card pattern (one teal-tinted, one neutral) is clearer for a skimmer than a
  table and is what 2026 cost-page research means by "with vs without comparison". Each card:
  a headline number, 3 short bullets, and the net out-of-pocket line.
  - *Paying cash:* full sticker ($3,000–$6,000), no negotiated fee, no benefit offset.
  - *With a PPO plan:* negotiated in-network fee, plan pays ~20–60% of major work, but capped
    by the annual maximum and possibly blocked by the missing-tooth clause → still ~$1,500–$3,000.
- **Keep the worked example panel (`.example`, teal):** the $4,500 implant at 50% with a
  $1,500 annual maximum → plan pays $1,500, you owe ~$3,000. This concretizes the two-column
  block. Highly quotable; keep it.
- Close with the link sentence to `/compare-ppo-dental-plans` and the estimator.

### 1.10 Featured-plan coverage table (read from `data/plans/`)
- The existing 5-row plan table (Ameritas PrimeStar, Humana Extend 5000, Guardian Premier 2.0,
  Delta Dental PPO Premium, and the Aetna/UHC "not covered" row). **Every cell must be
  reconciled against `data/plans/*.md` before build** — the build agent reads each plan file
  and copies coverage %, waiting period, and caps exactly. If a plan and this table disagree,
  the plan file wins (per CLAUDE.md SSOT rule).
- **Responsive behavior:** this is the widest table (4 columns of dense text). See §2.2 — on
  mobile it becomes a stacked "card per plan" layout with `data-label` row labels, NOT a
  horizontally-squashed grid.
- Place a short intro paragraph above it explaining the two killers (annual maximum +
  missing-tooth clause) so the table has narrative context.
- Add a "View every plan side by side →" link to `/compare-ppo-dental-plans` immediately after
  the table (the table is a teaser, the compare page is the full tool).

### 1.11 The missing-tooth clause (the trap)
- Keep as its own section with the `.callout` (gold-soft left border). This is a differentiator;
  most cost pages never mention it. Keep the "read this before you buy a plan" framing and the
  two short paragraphs. Link out to `/compare-ppo-dental-plans` and the deeper implant guide.

### 1.12 Financing + ways to save (split into two clear sub-blocks) (NEW structure)
- **Purpose:** the brief asks for financing AND ways-to-save as distinct, both present.
- **Sub-block A — How to make your plan pay the most** (`.checklist`): stay in-network,
  stage across two benefit years, get a predetermination of benefits, choose a plan without a
  missing-tooth clause if a gap already exists, buy coverage before the gap exists. (Existing.)
- **Sub-block B — Financing an implant** (`.checklist`): CareCredit promotional plans (with
  the honest deferred-interest caveat), in-house office plans, third-party patient lenders
  (Cherry / Proceed / Sunbit, soft prequalification), HSA/FSA pre-tax dollars. (Existing.)
- Keep both, but give each its own `.section-head` so they read as two tools, not one wall.
  Link sub-block B to `/dental-financing-monthly-payments`. `.src` line under financing.

### 1.13 How CoverCapy helps (concierge 3-step)
- `section.band`. The existing `.steps` 3-card flow: (1) compare plans that truly cover
  implants, (2) find an in-network dentist, (3) verify coverage before you commit. Keep the
  numbered serif `.num` chips and the hover lift.
- Follow with a `.hero-cta` pair (compare plans / find a dentist).

### 1.14 FAQ accordion
- `details.faq` accordion, 7 questions, mirroring the `FAQPage` schema 1:1 (single-implant
  cost, does PPO cover implants, cost with insurance, missing-tooth clause, full-mouth cost,
  financing, cheapest way, waiting period). Each answer 40–60 words, self-contained for GEO.
- Native `details/summary` (no JS dependency); rotating `+`/`×` `.ic` chip. Already correct in
  the page. Ensure the visible answer text byte-matches the schema answer text.

### 1.15 Related cost-pages rail
- `section.band`, `.related-grid` of `.rel-card`s. Cross-link the sibling new pages per the
  internal-link moat: Dental crown cost, Invisalign cost, Emergency PPO dentists, Cosmetic PPO
  dentists, the in-depth implant insurance guide, and the treatment cost estimator. Descriptive
  anchor text with the target keyword (never "click here"). Matches existing.

### 1.16 Final CTA band
- `.cta-band` (teal gradient, the one place a gradient is allowed because it is a full band,
  not a card). H2 "Get the most from your implant coverage", supporting line ending with the
  brand tagline "Get cover today, see a dentist tomorrow.", and two CTAs (compare plans /
  see financing options). Keep.

### 1.17 Scoped legal note
- `.page-legal` inside the scoped `#implant-cost-page` wrapper (so it inherits page type sizing
  but the footer that follows is OUTSIDE the scope and untouched). Cost figures are 2026
  national ranges not a quote; plan facts reflect verified plan files and can change by state /
  contract / benefit year; CoverCapy is not an insurer and gives no dental or financial advice;
  confirm coverage, waiting periods, missing-tooth clause, and annual maximum with the carrier
  and dentist. Keep the existing wording — it is already compliant and em-dash-free.

### 1.18 Footer mount
- `<div id="covercapy-footer" data-include="/footer.html"></div>` OUTSIDE the
  `.implant-cost-page` scope, exactly as About does, so footer presets are never overridden.

---

## 2. COMPONENT & TABLE STYLING GUIDANCE

### 2.1 Tables — desktop
- Reuse the existing `table` styling: `border-collapse:collapse`, `--panel` background, 1px
  `--line` border, `--r-md` radius with `overflow:hidden`, `--shadow-sm`. `thead th` is the
  small uppercase `--cream` label row. `tr.total` highlighted in `--mint-soft`. Excluded /
  "not covered" cells use the `td.excl` `--gold-deep` treatment (already present).
- Keep dense text left-aligned and `vertical-align:top` so multi-line cells line up cleanly.
- **Range bars (optional enhancement):** for the at-a-glance summary or the single-tooth table
  you MAY add a thin horizontal "range bar" under each price range — a slim track
  (`--line`/`--mint-soft`) with a filled segment showing where the typical range sits on a
  0→max scale. If used: pure CSS (a flex track with a `::before` fill), `aria-hidden="true"`
  (the text range is the accessible source of truth), heights ≤8px, no animation. Range bars
  must never replace the numeric range text; they only decorate it. If they add visual noise,
  drop them — the editorial look favors restraint.

### 2.2 Tables — mobile (≤760px / introduce a ≤640px stack tier)
- The current page only shrinks font and padding at 760px. That is fine for the two-column
  cost tables but **not** for the 4-column featured-plan table, which becomes unreadable when
  squeezed. 2026 responsive-table research is explicit: do not ship a shrunken desktop grid;
  use a deliberate responsive pattern.
- **Recommended pattern — "stacked cards" for the plan table only:** at ≤640px, set the plan
  table's `thead` to visually hidden (`position:absolute;width:1px;height:1px;clip:rect(...)`,
  not `display:none`, so screen readers keep the header association), make each `tr` a bordered
  card (`display:block`, `--cream-card`, `--r-md`, margin-bottom), and each `td` a labeled row
  via a `data-label` attribute surfaced with `td::before{content:attr(data-label)}` in
  `--ink-faint` uppercase. The build agent adds `data-label="Plan"` / `"Implant coverage"` /
  `"Waiting period"` / `"Caps and notes"` to that table's cells.
- **Simpler tables** (single-tooth, add-on, full-arch — all 2 to 3 columns) can stay as true
  tables; if any feels tight, wrap it in a `div` with `overflow-x:auto` and
  `-webkit-overflow-scrolling:touch` plus a faint right-edge fade to signal scrollability.
  Horizontal scroll is acceptable for genuine data tables per accessibility guidance, but the
  4-column plan table is better stacked.

### 2.3 Cards
- Stat cards, step cards, related cards: flat `--cream-card`, 1px `--line`, `--shadow-sm`,
  hover `translateY(-3 to -5px)` + `--shadow-md`. NO gradient fills on cards, NO glassmorphism
  / backdrop-blur (both forbidden by CLAUDE.md). The only gradients on the page are the page
  `::before` ground, the `.tldr`/`.callout`/`.example` accent panels, and the final `.cta-band`.

### 2.4 Buttons / CTAs
- `.btn-primary` = `--teal-night` fill, `--mint` text, pill, lift on hover. `.btn-ghost` =
  `--cream-card`, `--teal-700` text, `--line` border. Two CTAs per cluster max. Button copy
  always names the outcome.

### 2.5 Optional sticky concierge bar (NEW, optional)
- A slim fixed bar pinned to the bottom of the viewport once the user scrolls past the hero,
  echoing the comparison-page / T5 sticky-bar pattern but in cost-page voice.
- **Content:** left = a one-line value cue ("Estimate your implant cost, free"); right = one
  primary action `Find a PPO dentist` → `/find-my-dentist.html` and optionally a ghost
  `Estimate my cost` → `/dental-treatment-cost-estimator.html`.
- **Behavior:** hidden until the hero leaves the viewport (IntersectionObserver on `#top`, the
  same observer family already used for `.reveal`), slides up once. Never covers content on
  desktop (sits as a thin bar, ~56–64px). On mobile it becomes a single full-width thumb-target
  button row (44px min height). Must be dismissible (a small `×`) and must respect
  `prefers-reduced-motion` (appear without the slide). Must not overlap the footer: hide it
  (add a `.hidden` class) when the footer enters view, reusing the footer's documented
  `.cc-side-rail` hide hook if convenient, or its own observer on `#covercapy-footer`.
- **Restraint rule:** if it competes visually with the hero CTAs or feels pushy, ship the page
  without it. The hero + per-section CTAs already carry conversion; the sticky bar is a bonus,
  not a crutch. No countdown, no scarcity copy on it ever.

---

## 3. MOTION

- Section heads and cards: `.reveal` fade-up (opacity 0→1, `translateY(24px)`→0, 0.7s ease),
  triggered by IntersectionObserver at ~0.12 threshold, unobserved after firing. Copy this
  pattern verbatim from About (`initAboutPage`), renamed `initImplantCostPage`, gated behind
  `window.CoverCapyShellReady`.
- Hover: card lift only. FAQ chip rotate. Sticky bar single slide-up (optional).
- **Forbidden:** cost-figure count-up animations, parallax, auto-advancing carousels,
  full-page scroll-jacking, animated gradients. All transitions disabled under
  `prefers-reduced-motion: reduce` (rule already present in the page CSS — keep it).

---

## 4. ACCESSIBILITY

- **One H1**, logical H2/H3 nesting per section. Section landmarks via `<section>` + an
  `aria-label` or a visible heading.
- **Breadcrumb:** `nav[aria-label="Breadcrumb"]` (present).
- **Tables:** real `<table>/<thead>/<th scope="col">` so header-cell association survives the
  mobile stack. Add `scope="col"` to header cells (the current page omits scope — add it). The
  visually-hidden header technique (clip, not `display:none`) preserves this on mobile.
- **Range bars (if used):** `aria-hidden="true"`; the numeric text is the accessible value.
- **FAQ:** native `details/summary` is keyboard-accessible by default; do not replace with a
  custom JS accordion. Ensure the `+`/`×` glyph is `aria-hidden` (it is decorative; the summary
  text is the label).
- **Focus:** keep the existing `:focus-visible{outline:3px solid var(--mint);outline-offset:3px}`.
  Ensure the optional sticky bar's buttons and its dismiss `×` are in the tab order and have
  visible focus.
- **Color contrast:** body text `--body #3A4A42` on cream grounds passes AA. The teal-night
  `.cta-band` / `.example` use `#EAF6F1`-class light text on dark teal — verify ≥4.5:1 (it
  passes). Do not put `--ink-faint #8A958F` on white for anything load-bearing (it is fine for
  source-note / label text only).
- **Tap targets:** all CTAs and the sticky-bar controls ≥44×44px on mobile (2026 mobile
  guidance; 58% of cost-page traffic is mobile).
- **Reduced motion:** honored globally (present).
- **No text baked into images.** All cost figures are live HTML text so they are selectable,
  translatable, and machine-readable (also a GEO win).

---

## 5. MOBILE BEHAVIOR (summary)

- Single-column flow throughout; `.wrap` keeps 24px gutters.
- Hero figure and H1 reflow with `clamp()` (already sized).
- At-a-glance stat cards: `auto-fit minmax(240px,1fr)` collapses to 1-up on narrow phones.
- The 4-column plan table → stacked labeled cards at ≤640px (§2.2). 2–3 column tables stay as
  tables, scroll-wrapped only if tight.
- Hero CTAs go full-width at ≤560px (add the About-page rule `.hero-cta .btn{width:100%}` if
  not present).
- Optional sticky bar collapses to one full-width thumb button.
- Reduce section padding (`section{padding:40px 0}` at 760px is already there; consider
  `52px` at 560px to match About's rhythm).

---

## 6. WHAT TO AVOID (per CLAUDE.md + BUILD-BRIEF)

- No **em-dashes** in copy (commas / colons / rewrite). No **roman numerals** in lists.
- No **gradients on cards**, no **glassmorphism / backdrop-blur** on content.
- No **countdown timers**, no fake scarcity, no manufactured urgency on cost content.
- No **Capy Crowns** references in any modal-style UI (there are no modals on this page).
- No **invented plan numbers** — every premium / maximum / waiting period / coinsurance comes
  from `data/plans/*.md`; national cost ranges come from the sourced research packs.
- No **single false-precision cost figures** — always ranges.
- No **SF Pro / generic startup fonts** — Fraunces (headlines) + Hanken Grotesk (body) only.
- No **healthcare-portal or insurance-comparison-grid styling** — keep the boutique-editorial feel.
- Do not let page CSS leak to the nav/footer — everything stays scoped under `.implant-cost-page`,
  and the footer mount stays OUTSIDE that wrapper.
- `sameAs` in any schema stays an **array**. Strip UTM from any outbound site URL with
  `.split('?')[0]` (not relevant on this static page but honor it if a dynamic link is added).
- Do not store any member ID anywhere (no verify form is required on this page; if one is added,
  only `member_id_provided:boolean`).

---

## 7. SCOPED CLASS RECOMMENDATION

**Keep `.implant-cost-page`.** It is already in use on the live page, already declares the full
token set in its scoped block, and matches the About-page `.about-page` precedent. Keep the
wrapper structure exactly:

```
<body class="implant-cost-shell">
  <div id="covercapy-mega-nav" data-include="/mega-nav.html"></div>
  <div id="implant-cost-page" class="implant-cost-page">
    <main> ... all page sections, then .page-legal ... </main>
  </div>
  <div id="covercapy-footer" data-include="/footer.html"></div>
</body>
```

- All page CSS stays prefixed `.implant-cost-page ...` so it cannot recolor or resize the
  sitewide mega-nav or footer (which load `/mega-nav.css` + `/footer.css` first in `<head>`).
- The `.page-legal` lives INSIDE `#implant-cost-page`; the footer mount lives OUTSIDE it.
- If the optional sticky bar is added, scope it as `.implant-cost-page .icp-stickybar` (or
  place it inside the wrapper) so its styles stay contained.

---

## 8. SOURCES

UX / conversion patterns for 2026 cost and pricing pages (accessed 2026-06-26):

- Figma — Pricing Page Best Practices + Examples:
  https://www.figma.com/resource-library/pricing-page-best-practices/
- Userpilot — 13 Pricing Page Best Practices to Boost Conversion Rates:
  https://userpilot.com/blog/pricing-page-best-practices/
- UserGuiding — 12 Best Practices for High Converting Pricing Pages:
  https://userguiding.com/blog/pricing-page-best-practice
- InfluenceFlow — SaaS Pricing Page Best Practices Guide 2026:
  https://influenceflow.io/resources/saas-pricing-page-best-practices-complete-guide-for-2026/
- PipelineRoad — SaaS Pricing Page Best Practices: What Actually Converts in 2026:
  https://pipelineroad.com/agency/blog/saas-pricing-page-best-practices

Responsive / accessible data-table patterns (accessed 2026-06-26):

- Lullabot — Responsive HTML Tables: Presenting Data in an Accessible Way:
  https://www.lullabot.com/articles/responsive-html-tables-presenting-data-accessible-way
- Smashing Magazine — Accessible Front-End Patterns For Responsive Tables (Parts 1 & 2):
  https://www.smashingmagazine.com/2022/12/accessible-front-end-patterns-responsive-tables-part1/
  https://www.smashingmagazine.com/2022/12/accessible-front-end-patterns-responsive-tables-part2/
- NinjaTables — Mobile-First Design Principles for Data Tables:
  https://ninjatables.com/mobile-first-table-design-principles/
- 618Media — HTML Tables in Responsive Design: Do's and Don'ts (2026):
  https://618media.com/en/blog/html-tables-in-responsive-design/
- U.S. Web Design System (USWDS) — Table component (accessibility baseline):
  https://designsystem.digital.gov/components/table/

Internal references (repo, accessed 2026-06-26):

- `CLAUDE.md` — design tokens, "what NOT to build", plan-facts SSOT rule.
- `research/footer-pages/BUILD-BRIEF.md` — shared page structure, schema, internal-link map.
- `about.html` — house CSS patterns, `.reveal` motion, scoped-class precedent, legal-note pattern.
- `dental-implant-cost.html` — current page, the baseline this wireframe upgrades.
- `footer-preview.html` — footer the page must remain compatible with (mount outside scope).
- `data/plans/*.md` — single source of truth for every featured-plan coverage figure.
