# DH1 — Compare PPO Main-Hub Hero / Masthead Redesign

**Agent:** Design Agent DH1
**Scope:** Hero/masthead + copy for `compare-ppo-dental-plans.html` (THE main hub)
**Theme:** Jade — CTA `--teal-night #082A30`, links `--teal-700 #14525B`, accent `--mint #5BE0A0`, body `--ink`. Body color must never equal CTA color.
**Voice:** Fraunces serif headlines (weight 400-500, italic for emphasis spans), Inter body. Concierge / boutique, never healthcare-portal.
**Hard rules:** No em-dashes. No generic "three answers / eight PPOs evaluated" filler. Answer-first sentence for AI/snippets. Italic emphasis carries the line, not punctuation.

---

## What the hero must do

The hero has to set up the entire page job in one read:
1. **Match** — narrow 8 PPOs to the right one for the work ahead (Smart Match).
2. **Compare** — 8 PPOs checked on what decides the bill.
3. **Branch** — route to carriers / Delta Dental / glossary / find-a-dentist.

It also has to carry **independence** (no paid placement) as the differentiator, and a trust line (reviewed + last updated) done with restraint, not as a buried footnote.

---

## RECOMMENDED — Direction 1: "The matched plan" (lead with the job, hero left + Smart Match right)

This is the recommendation. It is answer-first, names the mechanism (match a plan to the treatment), and earns the Smart Match panel sitting beside it instead of below a wall of prose.

> **Eyebrow:** `THE PPO DENTAL PLAN HUB · 2026`
>
> **H1:** Match a PPO dental plan to the *work ahead.*
>
> **Subhead:** Eight individual PPO plans, checked on the four things that decide your bill: coverage for what you need, the annual maximum, the waiting period, and the monthly price. We narrow them to the one plan suited to your treatment, then point you to a top in-network dentist nearby. No carrier pays for placement.
>
> **Answer-first sentence (for AI / featured snippets, place as first body `<p>` or schema description):** CoverCapy is an independent hub that compares the eight major individual PPO dental plans for 2026 and matches you to the one that best fits your treatment and budget, with no paid placement by any carrier.
>
> **Trust line (elegant, single styled row under subhead):** Independent, no paid placement. Reviewed by dental billing specialists and former treatment coordinators. Last updated June 2026. [How we choose plans →]
>
> **Primary CTA:** `Match my plan` (scrolls to / focuses `#match`, `--teal-night` fill, `--mint` accent on hover)
> **Secondary CTA:** `Compare all eight →` (ghost, `--teal-700` text, → to `#compare`)

**Why it wins:** "Match a PPO dental plan to the work ahead" is the page in five words, it is unique to CoverCapy (the matching engine), and "the work ahead" is concrete where "find your fit" was hollow. The four-thing list replaces the dead "three answers" count with the actual decision criteria, which is also strong snippet bait. The italic *work ahead* gives Fraunces something to do.

### Masthead layout for Direction 1
**Hero left + Smart Match right (two-column, ~`52% / 48%` at desktop, stack at `1000px`).**
- **Left column:** eyebrow, H1, subhead, trust line, then the two CTAs in a row, then the `Browse by` branch nav (Plan vs plan · Coverage feature · Procedure · Life event · Carrier · Delta Dental · Glossary · Find a dentist) as small `--teal-700` links.
- **Right column:** the existing Smart Match planner (`#match` left/right panels) lifted up to sit IN the hero, framed in a `--cream-card` panel with a thin `--mint`-tinted top rule and the `Your CoverCapy match` verdict label. This makes the masthead *do the thing it promises* above the fold instead of describing it.
- Branch nav anchors double as the page's wayfinding and feed internal links / sitelinks.

---

## Direction 2: "Independent by design" (lead with the differentiator, hero → answer block → match)

For if the founder wants independence to hit first and the planner to stay full-width below.

> **Eyebrow:** `INDEPENDENT PPO DENTAL · NO PAID PLACEMENT`
>
> **H1:** The only PPO plan comparison *no carrier paid for.*
>
> **Subhead:** Eight individual PPO dental plans, ranked on coverage, annual maximum, waiting periods, and price, then matched to your treatment and a top in-network dentist near you. We are paid by the dental offices in our network, never by the plan you pick.
>
> **Answer-first sentence:** CoverCapy independently compares the eight major individual PPO dental plans for 2026 and recommends one based on your treatment and budget, with zero paid placement from insurers.
>
> **Trust line:** Reviewed by dental billing specialists and former treatment coordinators. Last updated June 2026. [How we choose plans →]
>
> **Primary CTA:** `Find my plan` (→ `#match`)
> **Secondary CTA:** `How we stay independent →` (→ `#benefits`)

**Layout:** **Hero (centered, full-width) → short answer block → full-width Smart Match.** Hero is text-only and bold; a one-line answer band (the answer-first sentence, large, in a `--cream` strip) sits between hero and planner; Smart Match runs full bleed below. Use when you want the headline to land uninterrupted. Risk: the planner drops below the fold, weakening the "we do it here" proof.

---

## Direction 3: "Start with the treatment" (concierge voice, hero left + Smart Match right)

Most on-brand to the T5 concierge tone; softest on SEO keyword in the H1.

> **Eyebrow:** `PPO DENTAL, MATCHED · 2026`
>
> **H1:** Start with the treatment. *We will find the plan.*
>
> **Subhead:** Tell us the procedure on your schedule, your timing, and a monthly budget. We weigh eight individual PPO plans on coverage, annual maximum, waiting periods, and price, and return the one that fits, plus a backup if your timing changes.
>
> **Answer-first sentence:** CoverCapy matches you to the best individual PPO dental plan for your specific treatment by comparing the eight major 2026 carriers independently, with no paid placement.
>
> **Trust line:** Independent, no paid placement. Reviewed by billing specialists and former treatment coordinators. Updated June 2026. [How we choose plans →]
>
> **Primary CTA:** `Start the match` (→ `#match`)
> **Secondary CTA:** `See the eight plans →` (→ `#compare`)

**Layout:** same hero-left + Smart-Match-right two-column as Direction 1. The H1 reads as an invitation, which suits the boutique voice, but buries "compare PPO dental plans" out of the headline, so keep the keyword strong in `<title>` and the subhead.

---

## Top 3 recommendations

1. **Ship Direction 1.** "Match a PPO dental plan to the *work ahead*" is the clearest statement of the page's unique job, it is answer-first, and it kills the "three answers / eight PPOs evaluated" filler. Italic emphasis does the punch with zero em-dashes.

2. **Use the hero-left + Smart Match-right masthead.** Lifting the planner into the hero makes the page demonstrate the match above the fold instead of describing it, which is both better UX and a stronger first impression for the founder. Keep the planner panel in `--cream-card` with a `--mint` top accent so it reads as the hero's centerpiece, not a sidebar.

3. **Demote the trust line to a single elegant row, never a paragraph.** One line, `--ink-faint`, dot-separated: independence + who reviewed + last updated + a `--teal-700` "How we choose plans →" link. It signals credibility without competing with the H1. Replace the literal "three answers" count everywhere with the four real decision criteria (coverage, annual maximum, waiting period, price), which reads as substance and performs as snippet bait.

### Token / rule check
- CTA fill `--teal-night #082A30`; CTA hover accent `--mint #5BE0A0`; body text `--ink`; branch + trust links `--teal-700 #14525B`. Body ≠ CTA color confirmed.
- Branch nav must expose carriers, Delta Dental, glossary, and find-a-dentist anchors so the hub fans out correctly.
- No em-dashes used anywhere in the copy above. Emphasis is carried by Fraunces italic spans (`work ahead`, `no carrier paid for`, `We will find the plan`).
