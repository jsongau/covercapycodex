# 09 - UX Architecture: about.html

Workstream 9 of 10. This is the section-by-section visual and interaction blueprint for the
authoritative CoverCapy About page. It defers to 01-brand-narrative.md for voice and to the
CLAUDE.md design system for tokens. It assumes the page wraps in a single scoped `.about-page`
container, mounts the sitewide `/mega-nav.html` above and `/footer.html` below, and that the
footer (`footer-preview.html` / `/footer.css`) carries the patient-teal plus dentist-amber CTA
tiles, the 5-column directory, the nationwide rail, and all legal links. The About page must
hand off cleanly into that footer, not duplicate it.

Hard rules honored: no em-dashes, no roman numerals, no gradients-on-cards clutter, no
glassmorphism, no countdown timers. Motion is restrained and respects reduced-motion. One H1.

---

## 1. DESIGN FOUNDATION (carry these verbatim)

### Palette tokens (scoped to `.about-page :root`-equivalent)
Patient-leaning teal and warm cream ground, with copper/amber reserved for the dentist side
so the page reads the same two-audience language the footer uses.

```
--teal-night:#082A30   /* primary dark, bridge panel, ink */
--teal-700:#14525B     /* links, eyebrows, emphasis italics */
--teal-300:#5E8C92     /* overlines, open-accordion borders */
--mint:#5BE0A0         /* focus ring, quick-answer accent bar */
--mint-soft:#E6F7EE    /* selected / patient tint */
--cream-card:#FFFDF8   /* panels, cards */
--cream:#F6F0E6        /* page background */
--gold-soft:#F3E8CF    /* standard callout left-rule, pillar numerals */
--gold:#A98A4B         /* accreditation accent (matches footer --cc-gold) */
--ink:#082A30          /* body text */
--ink-soft:#56655F     /* secondary prose */
--ink-faint:#8A958F    /* labels, tertiary */
--body:#3A4A42         /* long prose */
--line:#E8E2D8         /* borders */
--capy-orange:#8F5F38  /* dentist accent (matches footer --cc-amber-700) */
--capy-orange-dark:#754625
```

Note: the live `about.html` already defines these correctly. The one thing to watch is that the
CTA buttons in the current build use subtle vertical button gradients (teal-to-deep-teal,
amber-to-deep-amber). Those match the footer button gradients exactly (`--cc-footer-btn--teal`,
`--cc-footer-btn--amber`) and are acceptable, because the "no gradients" rule in CLAUDE.md is
about gradients ON CARDS (decorative card fills), not solid button shading. Keep card faces flat
or near-flat; keep buttons matching the footer.

### Type
- Headlines: `'Fraunces', Georgia, serif`, weight 500, line-height ~1.1, letter-spacing -.01em.
  Italic Fraunces in `--teal-700` for one emphasized word per headline (mirror the existing
  "calmest"). Italic in `--gold` only when the word is about Accreditation.
- Body and UI: `'Hanken Grotesk', system-ui, sans-serif`. Eyebrows are Hanken, 700, .72rem,
  uppercase, letter-spacing .2em, in `--teal-700` (or `.amber` variant in `--capy-orange`).
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. Prose measure capped at
  62-66ch so it reads like a set magazine column, never edge-to-edge.

### Spacing and rhythm
- Section vertical padding: `74px 0` desktop, stepping to `52px 0` under 560px (as built).
- Content max width `--maxw: 1160px`, gutter `0 24px`.
- Alternate plain background and `.band` (a faint cream wash bounded by hairline `--line`
  top/bottom) section to section, so the eye gets a quiet beat between blocks. Never two bands
  in a row.
- Section heads cap at ~66ch with a 14px gap between eyebrow, H2, and lead.

This generous-negative-space, content-led, editorial-serif approach is the documented signature
of pages that "feel expensive": Hermes-style whitespace, Aesop-style content-led calm, and
oversized high-contrast serif headlines that read like a fashion magazine rather than a brand
microsite (Figma 2026 trends; IIAD; Vide Infra; Bootcamp/Medium, all accessed 2026-06-26).

---

## 2. SECTION-BY-SECTION WIREFRAME

Order matches the approved 03-content-outline.md and the live build, refined for the luxury
editorial register and for the handoff into the footer. Each entry gives purpose, layout,
visual treatment, hierarchy, and motion.

### 0. Mega-nav mount (sitewide, above the page)
`<div id="covercapy-mega-nav" data-include="/mega-nav.html">`. Out of page scope. Page CSS must
never restyle it (already guarded by the `.about-page` scope).

---

### 1. HERO  (plain background, generous top air)
- **Purpose:** Define the company in one editorial breath and give the GEO-extractable answer.
- **Layout:** Single left-aligned column, no hero image, no two-column split. The restraint of a
  text-only hero on cream is the luxury signal here. Width capped ~62ch for the lead.
- **Elements, top to bottom:**
  1. Eyebrow: `CoverCapy / About` (use a thin middot, not a slash glyph, to feel editorial).
  2. H1, oversized Fraunces: "We turn the messiest moment in dental care into the *calmest*."
     (italic teal on "calmest"). `clamp(2.4rem, 5.4vw, 4rem)`.
  3. Lead paragraph, `--ink-soft`, one concise sentence on what CoverCapy is.
  4. Tagline line in italic Fraunces `--teal-700`: "Get cover today, see a dentist tomorrow."
  5. Hero CTA row: primary teal button "Compare PPO dental plans", ghost button "Find an
     in-network dentist". Pill buttons, 15px x 28px, matching footer button styling.
  6. Quick-answer card (the TL;DR / GEO block): `--cream-card` panel, hairline border, a single
     4px `--mint` left rule, small uppercase label "In one line", then the 2-sentence definition
     that names "not an insurance carrier or a dental practice" and "free for patients". Max
     width ~760px. This is the block AI answer engines lift, so it sits high and is plain text.
- **Hierarchy:** H1 dominates; everything else is quiet support. No competing visual weight.
- **Motion:** None on the hero. The hero should be fully present on load (no fade-in), both for
  perceived speed and because the first paint of a premium page should feel solid, not animated
  in. (Restraint principle: every animation earns its place; School of Motion; metabole.studio,
  accessed 2026-06-26.)

---

### 2. THE PROBLEM  (`.band`)  "People do not shop for insurance. They shop for a moment."
- **Purpose:** Establish the founding insight and the three unknowns; earn trust before any ask.
- **Layout:** `two-col` grid, `1.25fr / .85fr`. Left: 3 short prose paragraphs (the life-event
  thesis, the three questions in bold inline, the gap framing). Right: an "Is / Is not"
  clarifier panel.
- **Visual treatment of the clarifier:** flat `--cream-card` panel, hairline border, small
  uppercase header "What CoverCapy is". Rows separated by hairlines. Each row leads with a tiny
  pill tag: `Is` (teal tint) or `Is not` (neutral gray tint). This is a quiet, magazine-sidebar
  device, not a card with shadow drama. It does double duty as the "not an insurer" disclosure
  in a visually calm way.
- **Hierarchy:** Prose is the lead; the clarifier is a reference aside. On the bolded three
  questions, keep them inline-bold inside the paragraph rather than a bulleted list, to preserve
  the editorial read.
- **Motion:** `.reveal` fade-and-rise on the section head, the prose block, and the clarifier,
  each as one unit (not per-line, which would feel busy). 24px rise, ~.7s ease, triggered by
  IntersectionObserver at ~12% threshold, fire-once.

---

### 3. THE APPROACH  (plain background)  "A concierge, not a portal."
- **Purpose:** The what-we-do triad. Translate the promise into three pillars.
- **Layout:** Section head (eyebrow, H2, one-line lead), then a 3-up pillar grid
  (`repeat(auto-fit, minmax(240px, 1fr))`, 18px gap).
- **Pillars:** Coverage clarity / Cost honesty / Verified discovery. Each pillar card:
  flat `--cream-card`, hairline border, soft shadow only (no gradient fill). A small circular
  numeral chip (Fraunces, `--gold` on `--gold-soft`) top-left, then H3, then 2-line description.
  On "Verified discovery", include the plain-language "coverage check for dental, run before the
  visit, member ID never stored" line.
- **Hierarchy:** Three equal cards; the numerals give reading order without shouting.
- **Motion:** Cards rise-in on scroll (staggered by ~60ms is acceptable but optional; keep it
  subtle). Hover: `translateY(-5px)` plus a slightly deeper shadow, ~.25s. No tilt, no glow, no
  border color flash. GPU-friendly transform/opacity only.

---

### 4 + 5. HOW IT WORKS, SPLIT FOR PATIENTS AND DENTISTS  (`.band`)  "How CoverCapy helps."
- **Purpose:** The two-audience split, mirroring the footer's teal/amber duality so the page and
  footer feel like one system.
- **Layout:** Section head, then a `1fr / 1fr` split of two large cards.
- **Patient card (left):** teal-accented. Flat near-white face with a faint patient tint
  (`--mint-soft` at low opacity is fine as a barely-there wash, not a loud gradient), a 3px
  top rule in translucent `--teal-700`. Eyebrow "For Patients", H3 "Enter dental care prepared.",
  a 4-item checklist (compare, estimate, verify, find), a one-line "free for patients, not your
  insurer and not your dentist" reassurance, then two actions: teal button "Compare PPO plans"
  and ghost "Estimate treatment costs".
- **Dentist card (right):** copper/amber-accented. Same structure, 3px top rule in translucent
  `--capy-orange`, eyebrow in amber "For Dentists", H3 "Meet patients who are ready.", 4-item
  list (verified profile, coverage-aware patients, earn Accreditation, fair labeled visibility),
  the "placement is reviewed and labeled, never sold as guaranteed volume" honesty line, then
  amber button "Dentist portal" and ghost "Claim a free practice profile".
- **List bullets:** small rotated-square markers (teal on patient, amber on dentist), not check
  emoji. Keeps it editorial.
- **Hierarchy:** Two balanced cards; their button colors are the only strong color on the page,
  which is intentional and matches the footer CTAs so the eye learns "teal equals patient, amber
  equals dentist" before it reaches the footer.
- **Motion:** Reveal each card as a unit. No hover lift needed here (these are dense panels, not
  clickable tiles); keep them still so the buttons read as the only interactive targets.

---

### 6. THE STANDARD, CAPY ACCREDITATION  (plain background)
- **Purpose:** Explain why a credential exists; this is the trust differentiator.
- **Layout:** Section head, then 2 prose paragraphs (max 66ch), then a single quoted callout,
  then a small internal-links rail.
- **Visual treatment:**
  - Prose with one inline underlined link to `/capy-accreditation.html` (teal, 3px underline
    offset).
  - **Standards callout:** a wider flat panel with a 4px `--gold` left rule and a faint warm wash
    toward `--mint-soft`/white. The line inside is set in Fraunces at ~1.18rem: "When you see a
    Capy Accredited office, you are seeing a practice CoverCapy has actually reviewed, not just
    one that wrote nice words about itself." This pull-quote treatment is the editorial flourish
    of the section; it earns the larger type because it carries the whole differentiator.
  - **Links rail:** pill links to "The Capy Accreditation standard",
    "Browse Capy Accredited dentists", "Platinum Elite dentists". Flat pills, hairline border,
    hover shifts border and text to `--teal-700`.
- **Selectivity language:** keep "membership begins a review, it does not grant the credential"
  and the approve / conditionally approve / improve / decline outcomes in the prose. Do not build
  a fake "approval meter" widget here (the accreditation page owns that interactive); the About
  page states it in calm prose.
- **Motion:** Reveal head, prose, callout, and rail as separate units in sequence.

---

### 7. TRUST AND TRANSPARENCY  (`.band`)  "Where we stand, plainly."  (principle cards)
- **Purpose:** The standards band plus trust strip, six plain commitments. This is where the page
  earns its "authoritative" claim and pre-answers the legal and GEO questions.
- **Layout:** Section head, then a `repeat(auto-fit, minmax(260px, 1fr))` grid of 6 trust items.
- **Cards:** flat `--cream-card`, hairline border, soft shadow. Each: a short Fraunces H4 label
  and 1 to 2 lines of plain prose. The six:
  1. We are not an insurer.
  2. Patient tools are free.
  3. Sponsored is labeled.
  4. Your member ID stays yours.
  5. Always verify directly.
  6. Built by insiders.
- **Treatment notes:** No icons required; if icons are wanted, use thin single-weight line marks
  in `--teal-700`, never filled illustrative icons, to stay editorial. The honesty of plain text
  here is itself the luxury signal (content-led, Aesop register).
- **Hierarchy:** All six equal. This grid intentionally reads like a printed code of conduct.
- **Motion:** Reveal the grid as one unit, or a gentle stagger. No hover transform (these are
  statements, not actions).

---

### 8. THE NETWORK BRIDGE  (plain background)  "The network gets better every time it is used."
- **Purpose:** The one moment of visual drama and the single dark panel on the page; the "bigger
  idea" editorial bridge to the network-effect essay.
- **Layout:** One full-width dark panel inside the wrap, generous internal padding (44px desktop,
  30px mobile).
- **Visual treatment:** This is the deliberate exception to the cream palette: a deep teal panel
  (`--teal-night` to `#0E3F44`), white-on-dark text, eyebrow in `--mint`. It is a panel, not a
  card grid, so a tonal background here is on-brand (the "no gradients on cards" rule targets
  small content cards, not a single hero-scale feature panel). One mint text-link with an arrow:
  "Read how the CoverCapy network compounds". This dark beat resets the eye before the FAQ and
  signals "this is the thesis."
- **Hierarchy:** The dark panel is the visual peak of the page; everything after it steps back
  down toward the footer.
- **Motion:** Reveal the panel as one unit. The arrow link nudges right ~3px on hover. No
  parallax, no animated background (vestibular safety; W3C 2.3.3).

---

### 9. FAQ ACCORDION  (`.band`)  "About CoverCapy"
- **Purpose:** Mirror the FAQPage schema; answer the high-intent and AI-answer-engine questions.
- **Layout:** Centered section head, then a single-column accordion, max width ~880px, centered.
- **Accordion:** native `<details>/<summary>` (works without JS, accessible by default).
  Each row: flat `--cream-card`, hairline border, Fraunces summary at ~1.08rem, a circular plus
  marker on the right that rotates 45deg to an x and fills `--teal-700` when open. Open state
  border shifts to `--teal-300`. Answer text in `--ink-soft`, 40 to 60 words, written as a
  standalone factual answer (so it is liftable by AI Overviews independent of the question).
- **Questions (7, matching schema):** What is CoverCapy / Is it an insurance company / Is it free
  / How does it help patients / How does it help dentists / What is Capy Accreditation / How does
  CoverCapy make money.
- **Hierarchy:** Quiet, dense, scannable. The plus markers are the only ornament.
- **Motion:** The marker rotation and the open transition only. Do not animate `max-height` with
  a long ease that causes layout thrash; a short reveal is fine. Respect reduced-motion.
- **Accessibility:** `<details>` gives keyboard and screen-reader support for free. Ensure the
  summary has a visible focus ring (`--mint`, 3px, 3px offset).

---

### 10. FINAL CTA  (plain background, centered)  "Enter dental care prepared."
- **Purpose:** Last in-page conversion beat before the footer takes over.
- **Layout:** Centered eyebrow, H2, one-line subhead, then a centered 3-button row:
  teal "Compare PPO plans", ghost "Find a dentist", amber "Dentist portal".
- **Treatment:** No card, no panel, just air and type. The triple-button row restates the two
  audiences (teal+ghost patient, amber dentist) one final time.
- **Handoff note:** Because the sitewide footer ALSO carries a patient CTA tile and a dentist CTA
  tile immediately below, keep this final CTA tight and do not over-repeat. One clean line plus
  the three buttons is enough; the footer completes the call to action. Avoid a heavy CTA band
  here that would collide visually with the footer's CTA tiles.
- **Motion:** Reveal as one unit. No pulsing buttons, no timers.

---

### 11. PAGE LEGAL NOTE  (scoped, small)
- A single small-print paragraph echoing the footer disclaimer truthfully: not an insurer, broker
  of record, or dental practice; sponsored placements labeled; Capy Accreditation is a private
  credential, not a government certification or guarantee; always verify directly. `--ink-faint`,
  .78rem. This sits inside `.about-page` scope, above the footer mount, so the footer's own
  fineprint is not duplicated visually right against it.

### 12. Footer mount (sitewide, below the page)
`<div id="covercapy-footer" data-include="/footer.html">`. Out of page scope. The page's last
visual gesture (centered final CTA plus quiet legal line) should leave enough whitespace that the
footer's first row (brand plus the two CTA tiles) reads as a fresh module, not a continuation.

---

## 3. COMPONENT SPEC NOTES (cross-cutting)

### Buttons
- Three variants only: `btn-primary` (teal), `btn-ghost` (cream face, teal text, hairline
  border), `btn-amber` (copper). Pill radius, 15px x 28px, Hanken 700. Hover: `translateY(-2px)`
  plus deeper shadow, .18s. These mirror the footer buttons one-to-one so the system is coherent
  top to bottom.

### Cards
- All content cards flat-faced (`--cream-card` or a barely-there single-direction wash on the
  patient/dentist split only), hairline `--line` border, soft shadow (`0 2px 14px` resting).
  No glassmorphism (no `backdrop-filter` blur on content), no multi-stop decorative gradients on
  small cards, no neon borders. The single dark network-bridge panel is the deliberate exception.

### Eyebrows and section heads
- Every section opens with an uppercase Hanken eyebrow in teal (or amber on the dentist card),
  then a Fraunces H2. This consistent overline-then-serif pattern is the spine of the editorial
  rhythm and should not vary section to section.

### Pull-quote / callout
- Reserve larger Fraunces type (1.18rem+) for exactly two moments: the Accreditation callout and
  the network-bridge headline. Scarcity of the device is what makes it feel premium.

---

## 4. MOTION SYSTEM (restraint)

- **Mechanism:** one IntersectionObserver, `.reveal` class, threshold ~.12, fire-once
  (`unobserve` after intersect). Reveal = opacity 0 to 1 plus 24px translateY to 0, ~.7s ease.
  Use Intersection Observer rather than scroll listeners, and animate only `transform` and
  `opacity` (compositor-safe, GPU-friendly).
- **What animates:** section heads, prose blocks, cards, panels, as whole units. Card hover lift
  on the approach pillars only. Accordion marker rotation. The bridge arrow nudge.
- **What never animates:** the hero (present on load), backgrounds, anything driven by scroll
  position (no parallax, no pinning, no scrubbing). Background motion can trigger vestibular
  reactions and reads as gimmicky, not luxury (W3C WCAG 2.3.3; metabole.studio).
- **Reduced motion:** a `@media (prefers-reduced-motion: reduce)` block must disable all
  transitions and animations and force `.reveal` to its final visible state
  (`opacity:1; transform:none`). This is already present in the live build and is a WCAG 2.1
  requirement, not a nice-to-have (W3C; OpenReplay; Motion.dev, accessed 2026-06-26).

---

## 5. ACCESSIBILITY NOTES

- **Headings:** exactly one H1 (the hero). Every section uses H2; cards use H3/H4. No skipped
  levels. The FAQ uses `<summary>` text, not headings, inside `<details>` so it stays a native
  disclosure widget.
- **Focus:** visible `:focus-visible` ring everywhere: 3px `--mint`, 3px offset, 6px radius
  (already in build). Confirm it shows on buttons, accordion summaries, inline links, and pill
  links.
- **Color contrast:** body `--ink`/`--ink-soft` on cream clears WCAG AA. Verify `--ink-faint`
  (#8A958F) is used only for non-essential labels and small print, never for primary reading
  text, since it is borderline against cream for body copy. The white-on-dark bridge panel must
  keep text at >=rgba(255,255,255,.82) for AA.
- **Semantics:** `<main>` wraps the page body; each block is a `<section>` with an
  `aria-label` or a heading; the FAQ is native `<details>`; CTAs are real `<a>` links with
  descriptive text (never "click here"), satisfying the internal-link anchor rule.
- **Motion:** reduced-motion fully respected (section 4).
- **Targets:** buttons and accordion summaries comfortably exceed 44px tap height on mobile.
- **Images (if added):** any brand art must carry meaningful `alt` or `alt=""` plus
  `aria-hidden` if purely decorative, and `onerror` graceful hide (the site's house pattern for
  the logo and map tiles).

---

## 6. MOBILE NOTES

- **Breakpoints (match house build):** `two-col` and `split` collapse to one column at 900px;
  section padding drops to `52px 0` and hero to `44px 0 36px` at 560px; hero and final CTA
  buttons go full width at 560px.
- **Reading order on stack:** in the Problem section, prose first then clarifier; in the split,
  patient card first then dentist card. This keeps the patient-first priority on small screens.
- **Pillars and trust grid:** `auto-fit minmax` naturally reflows to a single column; ensure gaps
  stay >=14px so cards do not crowd.
- **FAQ:** native accordion is ideal on mobile; ensure summary line wraps gracefully and the plus
  marker stays right-aligned and tappable.
- **Footer handoff:** the sitewide footer already collapses its 3-up top row and 5-up directory
  into stacked cards and an accordion at 900px, and full-width buttons at 720px. The About page's
  final CTA going full-width at 560px matches that, so the transition into the footer stays
  consistent on phones.
- **Type:** `clamp()` headline sizes already scale down; verify the H1 does not overflow at
  ~360px (it should, given `clamp(2.4rem, 5.4vw, 4rem)`).

---

## 7. IMAGERY AND ASSET SUGGESTIONS  (use sparingly, editorial restraint)

The repo has real brand art at `/assets/images/`. A luxury editorial About page should stay
mostly typographic; use imagery as a single accent, not a gallery. Available and on-brand:

- `/assets/images/covercapy-logo.svg` (and `.png` fallback): already used by the mega-nav
  (`onerror` falls back to text). Do NOT re-place a large logo in the hero; the wordmark lives in
  the nav. At most, the logo could appear small and quiet beside the page-legal note or be left
  off the page body entirely.
- `/assets/images/mr-bara.png`, `capya-nobg.png`, `capya.png`: the capybara concierge brand
  character ("Mr. Bara"). If any single piece of art is used, a small, calm capybara mark works
  best as a quiet accent in ONE place, for example a modest figure beside the hero quick-answer
  or a small mark introducing the network-bridge ("the bigger idea"). Use a transparent-background
  version (`-nobg`) so it sits on cream cleanly. Keep it small and tasteful; the brand is boutique
  concierge, and an oversized mascot would read as playful SaaS, not luxury. Provide real `alt`
  text such as "CoverCapy concierge mark".
- `/assets/images/capybara3.png` ... `capybara6.png`, `captaincapymap.png`: additional character
  art and a map illustration. The map (`captaincapymap.png`) could very subtly support the
  network-bridge or a nationwide-discovery mention if one is added, but it is optional and should
  not compete with the type. Avoid stacking multiple character images.
- `/assets/images/platinum-elite-nobg.png`, `platinum.png`, `capy-accreditation.jpg`: these
  belong to the Accreditation and Platinum pages. Do not import the Platinum/Accreditation seals
  into the About page; the About page links to those pages and states the standard in prose. Using
  the seal here would over-claim and clutter the calm.

**Open Graph image:** the page currently sets no `og:image`. Recommend adding one for social and
AI-surface previews. `/assets/og-hub.png` exists as a generic hub OG card and is the safest
choice; alternatively a dedicated About OG could be produced later. This is a small, optional
enhancement, not required for the page to function.

**Overall imagery stance:** zero or one accent image. The documented luxury pattern is whitespace
and type doing the work (Hermes/Aesop register), so the strongest version of this page may use no
body imagery at all beyond the nav logo, letting the Fraunces headlines and the single dark
bridge panel carry all the visual interest.

---

## 8. WHAT TO AVOID  (per CLAUDE.md and BUILD-BRIEF)

- No gradients on content cards. (Single dark feature panel and footer-matched button shading are
  the only allowed tonal fills.)
- No glassmorphism: no `backdrop-filter` blur on page content, no frosted cards.
- No em-dashes in copy; use commas, colons, or rewrite.
- No roman numerals in any list or heading.
- No countdown timers, no scarcity or urgency framing, no pulsing or attention-grabbing CTAs.
- No invented founders, dates, headcount, funding, user counts, dentist counts beyond the
  existing "6,400+ pages" fact, awards, or testimonials.
- No clinical-outcome guarantees; Accreditation is a reviewed private credential, stated as such.
- No scroll-jacking, parallax, pinning, or animated backgrounds (vestibular safety; reads cheap).
- No second dark band stacked against the footer that would muddy the handoff; keep the final CTA
  airy.
- No duplication of the footer (its CTA tiles, directory, nationwide rail, and legal links are
  sitewide; the About page should not rebuild them).
- No SF Pro / generic startup fonts; Fraunces + Hanken Grotesk only.

---

## 9. ONE-SCREEN SUMMARY (build order)

1. Hero (text only, quick-answer GEO block, no motion)
2. The Problem `.band` (two-col prose + Is/Is not clarifier)
3. The Approach (3 pillar cards: clarity, honesty, verified discovery)
4+5. Patients/Dentists split (teal card + amber card, footer-matched)
6. The Standard (prose + gold pull-quote callout + links rail)
7. Trust + Transparency `.band` (6 plain principle cards)
8. Network bridge (single deep-teal panel, the visual peak)
9. FAQ `.band` (native details accordion, 7 Q&A, schema-mirrored)
10. Final CTA (centered, 3 buttons, airy handoff to footer)
11. Page legal note (scoped small print)
12. Footer mount (sitewide)

Alternate plain/band backgrounds, one H1, restrained reveal-on-scroll, reduced-motion honored,
imagery near-zero. The page should feel like a calm, well-set magazine feature that states what
CoverCapy is, proves it with a transparency code, and hands off cleanly into the concierge footer.

---

## SOURCES

Internal:
- CLAUDE.md (design tokens, fonts, "what NOT to build", luxury positioning, member-ID rule,
  6,400+ pages fact).
- research/footer-pages/BUILD-BRIEF.md (page structure, palette, font, schema, hard rules).
- about.html (live build: scoped CSS, section order, reveal observer, reduced-motion block).
- capy-accredited-dentists.html / capy-accreditation context (house scaffolding, FAQ accordion
  pattern, scoped-CSS discipline).
- footer-preview.html and /footer.css (footer that sits below: teal/amber CTA tiles, 5-column
  directory, nationwide rail, legal band, 900px/720px/480px breakpoints).
- research/footer-pages/about/01-brand-narrative.md, 01-research.md, 02-seo-geo.md,
  03-content-outline.md (voice, mission, FAQ, section order).
- assets/images/ inventory (covercapy-logo.svg/.png, mr-bara.png, capya/-nobg.png,
  capybara3-6.png, captaincapymap.png, platinum-elite-nobg.png, platinum.png,
  capy-accreditation.jpg) and assets/og-hub.png.

External (all accessed 2026-06-26):
- Figma, "Top Web Design Trends for 2026." https://www.figma.com/resource-library/web-design-trends/
- IIAD, "The UI/UX of Luxury: Why Some Websites Just Feel Expensive."
  https://www.iiad.edu.in/the-circle/why-some-websites-just-feel-expensive/
- Vide Infra, "Luxury eCommerce UX design best practices and a case study."
  https://videinfra.com/blog/luxury-ecommerce-ux-best-practices-and-a-case-study
- Said Yigit Camlica, "The simplicity of luxury: UX / UI designs of luxury brands," Bootcamp/Medium.
  https://medium.com/design-bootcamp/the-simplicity-of-luxury-ux-ui-designs-of-luxury-brands-89eadfa4a02e
- metabole.studio, "Scrollytelling: complete guide for premium narrative websites."
  https://metabole.studio/en/blog/scrollytelling
- School of Motion, "10 Websites with Great Animation in 2026."
  https://www.schoolofmotion.com/blog/10-websites-with-great-animation-in-2026
- W3C WAI, "Understanding Success Criterion 2.3.3: Animation from Interactions."
  https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- OpenReplay, "Using prefers-reduced-motion for Accessible Animation."
  https://blog.openreplay.com/prefers-reduced-motion-accessible-animation/
- Motion (motion.dev), "Create accessible animations in React."
  https://motion.dev/docs/react-accessibility
