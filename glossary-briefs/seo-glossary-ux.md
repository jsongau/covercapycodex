# UX Architecture: covercapy.com/dental-insurance-glossary/
## CoverCapy Glossary Page — Design Brief
**Version:** 1.0 | **Date:** June 2026 | **Author:** UX/CRO Design

---

## 1. Page Layout Wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [NAV BAR — logo left, "Find a Dentist" + "Compare Plans" right]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  HERO                                                (cream bg)     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Overline: PPO DENTAL INSURANCE                               │  │
│  │  H1: The Dental Insurance Glossary                            │  │
│  │  Subhead: Plain-language definitions for every term you       │  │
│  │  encounter when comparing PPO dental plans and verifying      │  │
│  │  your coverage.                                               │  │
│  │                                                               │  │
│  │  [Editorial byline + last-reviewed date]                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STICKY A-Z JUMP NAV (sticks on scroll below hero)  (white bg)     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  A  B  C  D  E  F  G  H  I  J  K  L  M                       │  │
│  │  N  O  P  Q  R  S  T  U  V  W  X  Y  Z                       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  INLINE CTA BAND #1 — after letter B or C (~25% scroll)            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  "Ready to verify your PPO coverage? It's free."             │  │
│  │  [Find a dentist in my network →]   [Compare plans →]        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  TERM GRID — 2-column desktop, 1-column mobile                     │
│  ┌──────────────────────────┐  ┌──────────────────────────┐        │
│  │  TERM CARD               │  │  TERM CARD               │        │
│  │  [letter anchor]         │  │  [letter anchor]         │        │
│  │  H2: Term Name           │  │  H2: Term Name           │        │
│  │  Definition paragraph    │  │  Definition paragraph    │        │
│  │  [+ Why this matters]    │  │  [+ Why this matters]    │        │
│  │  Related: [term] [term]  │  │  Related: [term] [term]  │        │
│  └──────────────────────────┘  └──────────────────────────┘        │
│                                                                     │
│  [ ... all terms A through M ... ]                                  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  INLINE CTA BAND #2 — midpoint (~50% scroll, between M and N)      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  "Confused about which plan covers your dentist?"            │  │
│  │  [Verify my insurance — free →]                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  [ ... terms N through Z ... ]                                      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FAQ SECTION                              (cream-card bg)           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  H2: Frequently Asked Questions                               │  │
│  │  [accordion items — 6 to 8 questions]                        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  BOTTOM CTA SECTION                       (teal-night bg)           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  H2: Get cover today. See a dentist tomorrow.                │  │
│  │  [Find a dentist in my network →]   [Compare plans →]        │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. A-Z Jump Navigation

### Design Intent
The jump nav is the primary wayfinding tool on a long scroll page. It must feel editorial (like a print dictionary's tab index), not like a filter pill bank. Letters that have no terms are visually muted but not removed, so the alphabet remains spatially predictable.

### Desktop — Horizontal letter row

```html
<nav class="az-nav" aria-label="Jump to letter">
  <ul role="list">
    <li><a href="#az-a" class="az-nav__letter">A</a></li>
    <li><a href="#az-b" class="az-nav__letter">B</a></li>
    <li><a href="#az-c" class="az-nav__letter">C</a></li>
    <!-- ... -->
    <li><span class="az-nav__letter az-nav__letter--empty" aria-hidden="true">X</span></li>
    <!-- empty = no terms; span, not <a>; aria-hidden so screen readers skip -->
    <!-- ... -->
    <li><a href="#az-z" class="az-nav__letter">Z</a></li>
  </ul>
</nav>
```

**CSS behavior (desktop):**
```css
.az-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid var(--line);  /* --line: #E8E2D8 */
  padding: 10px 0;
}

.az-nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0 16px;
}

.az-nav__letter {
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--teal-700);       /* #14525B */
  text-decoration: none;
  padding: 5px 9px;
  border-radius: 4px;
  transition: background 150ms;
}

.az-nav__letter:hover,
.az-nav__letter.is-active {
  background: var(--mint-soft);  /* #E6F7EE */
  color: var(--teal-night);      /* #082A30 */
}

.az-nav__letter--empty {
  color: var(--ink-faint);       /* #8A958F */
  cursor: default;
}
```

### Mobile — Horizontal scroll strip (single row)

On mobile the alphabet wraps into a single horizontally-scrollable row. The user does NOT see a grid of letters; they scroll left-right. This keeps the nav compact and thumb-reachable.

```css
@media (max-width: 640px) {
  .az-nav ul {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .az-nav ul::-webkit-scrollbar { display: none; }

  .az-nav__letter {
    flex-shrink: 0;
    font-size: 14px;
    padding: 6px 11px;
  }
}
```

**Active-letter tracking:** a small `IntersectionObserver` watches each `#az-{letter}` anchor and adds `is-active` to the corresponding nav letter as the user scrolls. On mobile the nav strip auto-scrolls to keep the active letter in view.

---

## 3. Term Card Design

### Card HTML structure

```html
<section id="az-a" class="term-letter-group">
  <h2 class="term-letter-heading" aria-label="Terms starting with A">A</h2>

  <article class="term-card" id="term-annual-maximum">
    <h3 class="term-card__name">Annual Maximum</h3>
    <p class="term-card__definition">
      The most your dental plan will pay for covered services in a calendar year.
      Once you reach this amount, you pay 100% of remaining costs out of pocket
      until the benefit year resets.
    </p>

    <details class="term-card__why">
      <summary class="term-card__why-toggle">Why this matters</summary>
      <div class="term-card__why-body">
        <p>
          Most PPO plans set the annual maximum between $1,000 and $2,000.
          If you need a crown and a root canal in the same year, you could
          hit that ceiling quickly. Comparing annual maximums across plans
          is one of the most reliable ways to gauge real-world value.
        </p>
      </div>
    </details>

    <div class="term-card__related">
      <span class="term-card__related-label">Related:</span>
      <a href="#term-benefit-year" class="term-card__related-link">Benefit Year</a>
      <a href="#term-deductible" class="term-card__related-link">Deductible</a>
      <a href="#term-out-of-pocket-maximum" class="term-card__related-link">Out-of-Pocket Maximum</a>
    </div>

    <a href="/compare-ppo-dental-plans" class="term-card__cta">
      Compare plans by annual maximum →
    </a>
  </article>

  <!-- next term card ... -->
</section>
```

### Card visual specs

| Element | Token / Value |
|---|---|
| Card background | `--cream-card: #FFFDF8` |
| Card border | `1px solid var(--line)` (#E8E2D8) |
| Card padding | `24px` desktop, `16px` mobile |
| Card border-radius | `6px` (subtle, not pill-shaped) |
| No box-shadow | Flat, editorial. Shadow = SaaS. |
| Term letter heading (A, B, C...) | Fraunces 500, 48px, `--teal-300` (#5E8C92), left-aligned, border-bottom `--line` |
| Term name H3 | Fraunces 500, 22px, `--teal-night` (#082A30) |
| Definition paragraph | Inter Tight, 16px, `--body` (#3A4A42), line-height 1.65 |
| "Why this matters" toggle | Inter Tight, 13px, `--teal-700` (#14525B), no underline, cursor pointer |
| "Why this matters" body | Inter Tight, 15px, `--ink-soft` (#56655F) |
| Related label | Inter Tight, 12px uppercase, `--ink-faint` (#8A958F), letter-spacing 0.06em |
| Related links | Inter Tight, 13px, `--teal-700`, underline on hover |
| Card CTA link | Inter Tight, 13px, `--teal-700`, right-arrow, no underline by default, underline on hover |

### "Why this matters" expand behavior

Use the native `<details>` / `<summary>` element. This requires zero JS, is accessible out of the box, and avoids animation complexity on a long page.

- **Default state:** collapsed. The expand chevron (CSS `::after` on summary) rotates 90deg on open.
- **No auto-expand.** Users choose what to read. This keeps the page scannable.
- **Do NOT use hover tooltips for definitions.** The page is content-first; tooltips hide value and are inaccessible on mobile.

### Cross-term click behavior

Clicking a related-term link navigates to `#term-{slug}` on the same page. The target term card receives a brief highlight (background flash to `--gold-soft` #F3E8CF, 600ms, no JS animation library needed -- use CSS `@keyframes`). This confirms to the user which card they landed on.

```css
.term-card:target {
  animation: term-highlight 600ms ease-out;
}
@keyframes term-highlight {
  0%   { background: var(--gold-soft); }  /* #F3E8CF */
  100% { background: var(--cream-card); }
}
```

---

## 4. Visual Hierarchy

| Tier | Element | Typeface | Size | Weight | Color |
|---|---|---|---|---|---|
| 1 | H1 page title | Fraunces | 48px desktop / 34px mobile | 500 | `--teal-night` |
| 2 | Letter divider (A, B, C...) | Fraunces | 48px desktop / 36px mobile | 500 | `--teal-300` |
| 3 | Term name (H3) | Fraunces | 22px desktop / 19px mobile | 500 | `--teal-night` |
| 4 | Definition body | Inter Tight | 16px | 400 | `--body` |
| 5 | "Why this matters" body | Inter Tight | 15px | 400 | `--ink-soft` |
| 6 | Related terms, CTA links | Inter Tight | 13px | 500 | `--teal-700` |
| 7 | Overline, meta labels | Inter Tight | 12px uppercase | 600 | `--teal-300` |
| 8 | Byline / date | Inter Tight | 13px | 400 | `--ink-faint` |

**Rule:** Fraunces is for named things (page title, letter dividers, term names). Inter Tight is for everything functional (definitions, labels, links, CTAs). Never use Fraunces for paragraph copy.

**Emphasis within definitions:** use `<em>` for a term name when referencing it inline. This renders as italic Fraunces-feel in context without adding a heading.

---

## 5. Sticky Behavior

### What sticks: the A-Z jump nav only

The A-Z jump nav sticks to the top of the viewport as the user scrolls past the hero. Nothing else sticks. Reasoning:

- A sticky jump nav directly serves the primary user job: navigate to a specific term in a 60-term+ glossary.
- A sticky CTA bar would compete with the nav and feel aggressive on a reference/research page. Users on a glossary are in information-gathering mode, not decision mode. Interrupting that flow kills trust.
- "Back to top" is not needed: the sticky jump nav already resets orientation. If the user wants the top, they scroll up.

### Sticky nav height budget

The nav must be no taller than 48px on desktop, 44px on mobile. If it grows taller it eats too much content viewport. Letters should never wrap to more than two rows.

### When nav scrolls off the top: hero exit transition

When the hero scrolls off, the nav transitions from `position: relative` (within document flow) to `position: sticky` with a 1px border-bottom shadow line (`box-shadow: 0 1px 0 var(--line)`) so the separation between nav and content is always legible.

---

## 6. CTA Placement

Three CTA positions. Each serves a different intent stage.

### CTA Band #1 — Early (after letter B or C, ~20-25% scroll)
**Target user:** arrived via SEO, scanning top of alphabet, still warm.
**Message:** "Ready to verify your PPO coverage? It's free."
**Actions:**
- Primary: `[Find a dentist in my network →]` — links to `/find-my-dentist`
- Secondary: `[Compare PPO plans →]` — links to `/compare-ppo-dental-plans`

**Visual:** Full-width band, `--mint-soft` (#E6F7EE) background, left-aligned text, buttons side by side. No card border. Feels like an editorial callout, not an ad.

### CTA Band #2 — Mid (between M and N, ~50% scroll)
**Target user:** deep in research, now thinking about application.
**Message:** "Confused about which plan covers your dentist?"
**Action:**
- Single CTA: `[Verify my insurance — free →]` — links to `/find-my-dentist`

**Visual:** Full-width band, `--cream` (#F6F0E6) background. Single centered CTA. More focused than Band #1.

### CTA Section — Bottom (after Z, before FAQ)
**Target user:** finished reading, decision-ready.
**Message:** "Get cover today. See a dentist tomorrow." (brand tagline, Fraunces H2)
**Actions:**
- Primary button (filled mint on teal): `Find a dentist in my network →`
- Secondary button (outlined): `Compare PPO plans →`

**Visual:** Full-width section, `--teal-night` (#082A30) background. White headline, `--mint` (#5BE0A0) primary button text on dark background. This is the highest-intent slot on the page.

### Term card micro-CTAs
Each term card contains one contextual text link at the bottom. The link copy matches the term:
- "Annual Maximum" card: "Compare plans by annual maximum →"
- "In-Network" card: "Find in-network dentists near you →"
- "Waiting Period" card: "See plans with no waiting period →"

These link to either `/compare-ppo-dental-plans` or `/find-my-dentist` depending on which is more relevant to the term. They are `--teal-700` text links, not buttons. This keeps card density low.

---

## 7. Color Assignments

| Page Element | CSS Token | Hex |
|---|---|---|
| Page background (body) | `--cream` | #F6F0E6 |
| Hero background | `--cream` | #F6F0E6 |
| Term card background | `--cream-card` | #FFFDF8 |
| Term card border | `--line` | #E8E2D8 |
| Letter divider heading (A, B...) | `--teal-300` | #5E8C92 |
| H1, H3 term names | `--teal-night` | #082A30 |
| Overline text | `--teal-300` | #5E8C92 |
| Definition body copy | `--body` | #3A4A42 |
| "Why this matters" body | `--ink-soft` | #56655F |
| Byline, last-reviewed date | `--ink-faint` | #8A958F |
| Related term links, card CTAs | `--teal-700` | #14525B |
| A-Z nav background | White (#fff) | |
| A-Z nav active letter bg | `--mint-soft` | #E6F7EE |
| A-Z nav active letter text | `--teal-night` | #082A30 |
| A-Z inactive letter | `--ink-faint` | #8A958F |
| "Why this matters" toggle | `--teal-700` | #14525B |
| Term highlight on anchor jump | `--gold-soft` | #F3E8CF |
| CTA Band #1 background | `--mint-soft` | #E6F7EE |
| CTA Band #2 background | `--cream` | #F6F0E6 |
| Bottom CTA section bg | `--teal-night` | #082A30 |
| Bottom CTA section headline | White | #fff |
| Bottom CTA primary button bg | `--mint` | #5BE0A0 |
| Bottom CTA primary button text | `--teal-night` | #082A30 |
| FAQ section background | `--cream-card` | #FFFDF8 |
| FAQ border | `--line` | #E8E2D8 |

**What not to use:**
- No gradients anywhere.
- No box-shadows on cards (flat editorial look).
- Do not use `--gold-soft` for anything other than the anchor-jump highlight and Delta Dental-style warnings.
- Do not use `--mint` as a background on cards or sections (reserve for buttons and accents only).

---

## 8. Interaction Design

### "Why this matters" expand/collapse
- Implemented with native `<details>` / `<summary>`.
- Default: collapsed for all terms.
- Toggle label: "Why this matters" with a chevron `▾` that rotates to `▴` when open.
- No JS animation. CSS transition on `max-height` can be added if desired but is optional.
- Screen reader behavior: the `<details>` element is natively announced as "expandable region."

### Hover states
- **Term card:** no hover lift, no shadow change. Flat cards stay flat. The hover state is limited to: subtle background shift from `--cream-card` to a barely-there `#F5F0EB` (3% darker cream). This signals interactivity without breaking the editorial feel.
- **Related term links:** underline on hover, color shifts from `--teal-700` to `--teal-night`.
- **CTA links in cards:** underline on hover.
- **A-Z nav letters:** background pill fills with `--mint-soft`.
- **No CSS tooltips.** All definitions are on the page; there is no secondary tooltip layer.

### Cross-term navigation (anchor jump)
1. User clicks a related-term link (e.g., "Deductible" from inside the Annual Maximum card).
2. Browser jumps to `#term-deductible`.
3. CSS `:target` rule fires a 600ms `--gold-soft` background flash on the landed card.
4. The A-Z nav active letter updates via IntersectionObserver.

### FAQ accordion
- Standard `<details>` / `<summary>` pattern, same as "Why this matters."
- All FAQ items collapsed by default.
- FAQPage JSON-LD schema is emitted from all visible FAQ items.

### No hover tooltips, no popovers, no modals on this page
The glossary is a reference document. Interruptions (modals, popovers, chat widgets) degrade the reading experience and hurt time-on-page signals. All content is inline. The only modal on the site is the PPO verification wizard on T5 dentist pages.

---

## 9. Trust Signals

### Editorial byline block (in hero)
Location: below the H1 subhead, before the jump nav.

```html
<div class="glossary-byline">
  <span class="glossary-byline__author">Editorial team, CoverCapy</span>
  <span class="glossary-byline__divider" aria-hidden="true">·</span>
  <time class="glossary-byline__date" datetime="2026-06">Last reviewed June 2026</time>
</div>
```

Styling: Inter Tight, 13px, `--ink-faint`. No avatar, no photo. The brand voice is institutional, not personal.

### Citation links in "Why this matters" sections
Where a definition references a regulatory source (e.g., ADA, NAIC, CMS) include a plain inline link:

```html
Per <a href="https://www.ada.org/..." rel="noopener noreferrer" class="term-card__cite">ADA guidelines ↗</a>
```

Style: same as body copy weight, `--teal-700`, no special icon other than the arrow. No footnote superscript numbers (too academic for the brand voice).

### "Free to use" trust micro-copy
Below each CTA band, one line in `--ink-faint`, 12px:
"No login required. No cost. CoverCapy is free for patients."

This directly addresses the biggest objection on a dental insurance page.

### Schema markup
Emit the following on the glossary page:
- `FAQPage` JSON-LD using all visible FAQ section items.
- `WebPage` JSON-LD with `dateModified` matching last-reviewed date.
- `BreadcrumbList`: Home → Dental Insurance Glossary.

Do NOT emit a `MedicalWebPage` type unless the content is clinically reviewed by a licensed provider. Use `WebPage` to stay accurate.

---

## 10. Mobile-First Considerations

### Layout changes: mobile vs. desktop

| Element | Desktop | Mobile |
|---|---|---|
| Term grid columns | 2 columns | 1 column (full width) |
| Letter divider (A, B...) | 48px, beside term column | 36px, full-width row above cards |
| A-Z jump nav | Wrapping flex row, centered | Single-row horizontal scroll, flush left |
| Hero H1 | 48px | 34px |
| Term name H3 | 22px | 19px |
| Card padding | 24px | 16px |
| CTA Band buttons | Side by side | Stacked, full width |
| Bottom CTA buttons | Side by side | Stacked, full width |
| FAQ section | Max-width 760px centered | Full bleed with 16px horizontal padding |

### Mobile-specific behavior

**A-Z nav horizontal scroll:** the nav strip does not wrap on mobile. Users scroll it horizontally to reach later letters. A very faint right-side gradient fade (`--line` to transparent) hints at scroll affordance.

**"Why this matters" expand on mobile:** the full expanded content is displayed within the card flow. There is no fixed-height scroll container inside a card on mobile (avoids scroll-within-scroll UX trap).

**Sticky nav on mobile:** the nav sticks at the top, but at 44px max height. Because mobile viewport is short, the sticky nav consumes a smaller fraction of screen compared to desktop.

**Touch targets:** all interactive elements (letter links, summary toggles, related-term links, card CTAs) have a minimum touch target of 44x44px per WCAG 2.5.5.

**Performance:** term cards are plain HTML with no lazy-loaded images. The only images on the page are the CoverCapy logo and any optional decorative illustration in the hero. Both are served as SVG or WebP with explicit width/height to prevent layout shift.

**No infinite scroll, no JS-loaded pagination.** The entire glossary is on one page. This maximizes SEO crawlability and lets users use browser find (Cmd+F) to locate terms instantly -- a key desktop and mobile behavior for reference pages.

---

## Recommended Term Set (Seed List)

Approximately 40 to 60 terms covering the PPO dental insurance decision journey:

**A:** Annual Maximum, Allowed Amount, Assignment of Benefits  
**B:** Benefit Period, Benefit Year, Basic Services  
**C:** Coinsurance, Copayment, Coverage Category, Coordination of Benefits (COB)  
**D:** Deductible, Delta Dental, Diagnostic Services, Dual Coverage  
**E:** Effective Date, Exclusions, Explanation of Benefits (EOB)  
**F:** Fee Schedule, Frequency Limitations  
**G:** Grace Period, Group Plan  
**H:** HIPAA, HMO vs PPO  
**I:** In-Network, Individual Plan, Insurance Carrier  
**L:** Lifetime Maximum, Limitations  
**M:** Major Services, Member ID  
**N:** Non-Covered Services, Non-Participating Provider, Network  
**O:** Open Enrollment, Orthodontic Coverage, Out-of-Network, Out-of-Pocket Maximum  
**P:** Participating Provider, Predetermination, Preventive Services, PPO  
**R:** Reimbursement Rate, Rollover Maximum  
**S:** Signature on File, Standby Coverage, Subscriber  
**T:** Table of Allowance, Termination Date  
**U:** UCR (Usual, Customary and Reasonable)  
**W:** Waiting Period  

Each term maps to at least one CTA: comparison (for plan-feature terms like Annual Maximum, Waiting Period) or dentist search (for provider-related terms like In-Network, Participating Provider).

---

*This document defines UX architecture only. Copy, final term definitions, and generated HTML are handled separately in the generator pipeline.*
