# CoverCapy PPO — Design System

> **STATUS: APPROVED (June 2026).** Direction C "Warm Research Terminal", shipping two user-toggleable palettes — **Warm (default) + Jade**. Implemented in `assets/ppo/ppo-system.css` + `assets/ppo/ppo-hub.js`; reference build in `docs/ppo-redesign/hub-prototype.html`.
> Synthesized from the 6-agent design council (memos in `agents/`).
> This is the single visual authority for the PPO hub, plan spokes, carrier hubs,
> treatment/timing pages, and the brand surface. When a page disagrees with this file, this file wins.

## The decision in one line

> **Warm Research Terminal** — a calm concierge "room" (warm paper, Fraunces voice, gold hairlines) containing a precise comparison "instrument" (a dense, tabular, teal-night spec matrix). *Premium concierge clarity meets a modern insurance research terminal.* 70% spec-first / 30% editorial.

## Why (the council's shared finding)

The codebase currently runs **three** competing visual languages: the uploaded redesign is a cool clinical SaaS (`#F6F8FA` gray, bright teal `#0E8C8B`, Inter-only — it *loads* Fraunces but never applies it); the live hub is warm paper + forest green + gold + Fraunces; `find-my-dentist` is a third teal-night variant. The fix is one token set, one trust color decision, Fraunces re-enabled, and the redesign's superior *structure* reskinned warm. Council scores of the current state: visual coherence **4/10**, comparison UX 7.5, mobile/sticky 5, brand 6.5, decision-support 6.5, a11y+perf 5.5.

---

## 1. Color tokens (contrast-corrected to WCAG AA)

**Two shipping palettes, user-toggleable: Warm (default) and Jade (jewel-box alternate).** Same structure, type, and components — only the color tokens swap (Gold dropped per user, June 2026). Warm is the default `:root`; Jade overrides via `[data-palette="jade"]`. Jade = cooler cream `#F2F1EA`, deep-emerald panels `#0B3A33`, jade action `#136A52`, gold accent retained.

```css
:root{
  /* surfaces — warm concierge room */
  --paper:#F5F0E6; --paper-2:#EFE8D9; --card:#FCFAF4;
  /* the comparison instrument sits on a teal-night header band over --card */

  /* ink / trust */
  --teal-night:#082A30;   /* primary ink: headings, plan names, matrix header band, deep panels */
  --ink:#21302A;          /* sub-headings */
  --body:#3A4A42;         /* prose */
  --muted:#5F6359;        /* secondary text (darkened from #6E7268 → AA on paper) */
  --ink-faint:#6E7268;    /* least-important labels only, never on color */

  /* action / interactive */
  --green:#2E5E45;        /* links + primary button bg (white text = AA) */
  --green-d:#234A37;      /* hover */
  --green-l:#5C7A66;      /* decorative only — never text */

  /* accent — editorial, NOT body text or buttons */
  --gold:#B8924F;         /* hairline accents, eyebrow spark, small badge bg */
  --gold-text:#8A6721;    /* the ONLY gold allowed as readable text (AA on paper) */

  /* lines */
  --line:#E3DAC8; --line-2:#D8CDB6;

  /* semantic coverage (always paired with a non-color signal) */
  --cov-full:#2E5E45;     /* covered  → "100%" + ✓ */
  --cov-partial:#B07A2E;  /* reduced  → "20% → 50%" */
  --cov-none:#8A857B;     /* not covered → italic "Not covered" + — */
  --cov-best:#B8924F;     /* best-in-row → gold underline + a "Best" pill */

  /* status */
  --alert-bg:#F3E8CF;     /* gold-soft, e.g. MetLife "under review" banner */
}
```

**Banned color usages (council a11y findings):** gold as body text (`#C0902E` = 2.54:1 ✗), **white text on a gold button** (2.89:1 ✗), light-teal buttons (`#0E8C8B`/3.21:1 ✗), `--ink-faint` on white for anything that must be read. Buttons are **green with white text** or ghost; gold is decoration only.

## 2. Typography — two roles, never blurred

```css
--serif:'Fraunces',Georgia,serif;   /* VOICE: headings, plan names, pull quotes */
--sans:'Inter Tight',system-ui;     /* DATA + UI: specs, every comparable number (tabular-nums) */
--prose:'Inter',system-ui;          /* body prose */
```

- **Fraunces = voice.** Headlines, plan/carrier names, the concierge editorial. Re-enable it on the redesign pages (they ship it but never use it).
- **Inter Tight = data.** Every premium, %, max, waiting period. Always `font-variant-numeric:tabular-nums` so columns align.
- Scale: Display 44–56 · H1 34–44 · H2 26–32 · H3 20–23 · Body 16–17 · Data 14–15 · Caption 12–13. All Fraunces headings weight 400–500 (often italic for plan names).

## 3. Space, radius, elevation, density

- **Spacing scale:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72.
- **Radius:** `--r-sm:8` · `--r:14` · `--r-lg:24` (cards). No giant SaaS pill cards; the matrix uses tight 8px.
- **Elevation:** soft warm shadows only — `--sh-sm` hairline, `--sh` cards, `--sh-lg` tray/drawer. No glassmorphism, no neon glows.
- **Two density modes:**
  - `.cc-comfort` — 24–32px padding, generous line-height. For explanation, Smart Match, editorial, brand.
  - `.cc-terminal` — 8–12px padding, tabular type, hairline rows. For the comparison matrix and dense spec blocks. This is the "instrument" — it should look engineered, calm, and exact inside the warm page.

## 4. Components

- **Plan card (spec-first):** carrier logo (small) + Fraunces plan name + plan-shape tag → the headline spec row (From $/mo · annual max · deductible · effective) → the 100/80/50 + implants + ortho grid → one-line "best for" → CTAs. Exactly **one** card may carry a "Most fitting" ribbon (kill the live page's two `bestSelling` flags). Premium is the largest, boldest number.
- **Comparison matrix (the instrument):** row = spec, column = plan, teal-night sticky header band, sticky first column on mobile, `tabular-nums`. Mark **best-in-row** with a gold underline + "Best" pill (never color alone). `Not covered` = muted italic + "—". Five coverage rows always present: **Preventive · Basic · Major · Implants · Orthodontics** (the redesign currently drops Preventive + Ortho — restore them). A Year-1 / Later toggle reveals graduated rates.
- **Smart Match = a lens, not a quiz.** The 30% CoverCapy layer (need → timing → budget) re-ranks and annotates the *same* canonical data and table; it returns one top match + one honest backup, each with a reason tied to the input and one caution. One scoring function, one `PLANS` object — no second engine.
- **Buttons:** primary = green bg / white text; secondary = ghost (border `--line-2`, teal-night text). Min 44px touch height. Visible `:focus-visible` ring always (never `outline:none`).
- **Badges/pills:** small, quiet — plan shape, "Most fitting", "Under review". Gold-soft bg, `--gold-text` or teal-night text.
- **Source drawer + verification:** ONE muted line per plan — `Last verified June 2026 · illustrative · view sources` — opening a drawer with per-fact provenance. **Never** a "Needs verification" badge on every cell (the #1 noise complaint).
- **Sticky subnav (one reusable component):** 52px, sits below the (normal-flow) mega-nav at `top:var(--cc-alert-h)`, sticky-in-flow (no content jump), condensed-after-scroll, IntersectionObserver `aria-current` active state, "More ▾" overflow on desktop / horizontal scroll + edge-fade on mobile. ≤8 labels per page type. One `--cc-anchor-offset` scroll-margin token everywhere.
- **Compare tray:** pin 2–4 plans, `localStorage`-persisted, hidden under 2 picks. **Collision contract:** top subnav + at most one bottom element (tray beats CTA bar); both hidden under the mobile hamburger drawer; `body` padded by live tray height.

## 5. Mr. Bara (the capybara) rules

Allowed only, small (24–64px): in Smart Match, glossary tooltips, loading/empty states, the verify step, and as quiet reassurance beside one high-friction CTA. **Forbidden** over: prices, coverage matrices, exclusions, legal text, source lists, primary spec tables. He is a concierge, not a mascot hero.

## 6. Carrier-brand restraint

CoverCapy's system is the dominant identity. A carrier may appear as: one logo + one small accent line/badge/comparison marker. Carriers **never** repaint the page, theme per-carrier, or get their own color system. No rainbow carrier cards.

## 7. Accessibility & performance floor (non-negotiable)

WCAG 2.2 AA. Visible focus everywhere; comparison table uses `<caption>` + `scope`; tooltips are tap+focus+hover + `aria-describedby` + Esc (never hover-only); status never color-only; `prefers-reduced-motion` honored. **Plan facts server-rendered in the initial HTML** (names, premiums-with-qualifiers, maxes, deductibles, coverage, waits, networks) — JS only enhances sort/filter/match. Self-host Fraunces + Inter Tight and the carrier SVGs; eager + `fetchpriority=high` on the LCP element.

## 8. DO / DON'T

**DO:** one warm token set · Fraunces for voice + Inter Tight tabular for data · the matrix as a calm dense instrument · quiet single verification line · green buttons · gold as hairline accent · one "Most fitting" plan · server-rendered facts.

**DON'T:** cool-gray SaaS surfaces · bright/low-contrast teal · white-on-gold buttons · per-cell verification badges · per-carrier repaints / rainbow cards · giant mascot heroes · long editorial before the plan inventory · hover-only tooltips · two scoring engines · JS-only plan facts · stacked sticky bars.

---

_Approve this and it becomes `APPROVED`; then implementation follows `START-HERE-PPO-REDESIGN.md`. Until then, no production page is rebuilt (per the master prompt's process rule)._
