# H5 — Main-Hub Design Quality (T5 Jade)

> The PPO master hub is THE hub. Its design cannot be the weak link. Scheme is **T5 jade**,
> lifted verbatim from `find-my-dentist.html` and already retokened into `assets/ppo/ppo-system.css`.
> This spec governs hero, section rhythm, the carrier branch-grid, the short-glossary module,
> button hierarchy, the comparison instrument as centerpiece, and a verified do/don't.

---

## 0. The non-negotiable rule (the prior scheme broke this)

**THREE DISTINCT colors — CTA fill ≠ link ≠ body.** The earlier hub failed because body text was painted
the CTA color, flattening the page.

| Role | Token | Hex | Used for |
|------|-------|-----|----------|
| CTA fill | `--teal-night` | `#082A30` | primary button bg, matrix header band, deep panels |
| Link / mid accent | `--teal-700` | `#14525B` | links, glossary underline, eyebrow text |
| Body prose | `--body` | `#33453E` | **all running text — never the CTA color** |
| Secondary text | `--ink-soft` / `--muted` | `#56655F` | sub-labels, captions |
| Tertiary labels | `--ink-faint` | `#8A958F` | spec labels only, never long reading |

Headings use `--teal-night` (this is correct — they are voice, not body). The ban is on **prose** taking the
CTA color. Eyebrows/links live one step lighter at `--teal-700`. Body lives at `--body`. Three steps, always visible.

---

## 1. Hero treatment

A **calm concierge room**, not a SaaS banner. No gradient hero block, no glass.

- **Surface:** `--cream #F6F0E6` page paper; the hero sits directly on paper with a hairline `--line #E8E2D8` baseline, no card.
- **Eyebrow:** `.ppo .eyebrow` — Inter Tight 12px, `.18em` tracking, uppercase, `--teal-700`, with a 30px `--gold` hairline spark before it. ("PPO DENTAL · VERIFIED MARKET INVENTORY".)
- **H1:** Fraunces 500, `clamp(32px,5vw,44px)`, `--teal-night`, line-height 1.06, `-.005em`. Plan/market names may go italic `.it` (Fraunces 400 italic). Voice, not shout.
- **Lede:** `.lede` — Inter 18px, `--body`, max 60ch. One honest sentence: what the inventory is and that facts are verified-dated.
- **Hero CTAs:** primary `cc-btn cc-btn--green` (teal-night fill, white text) + ghost `cc-btn--ghost` (transparent, `--line-2` border, teal-night label). Pill, min 44px. Never two filled CTAs side by side.
- **Trust line under CTAs:** `.trust` 12.5px `--muted` — "Last verified June 2026 · illustrative · view sources". ONE quiet line, never per-cell badges.
- Mr. Bara may appear once here at ≤48px beside the primary CTA as quiet reassurance. Never as a hero illustration over the H1.

---

## 2. Section rhythm

Spacing scale `--sp-*` (4/8/12/16/20/24/32/40/56). Sections separated by `--sp-14 (56px)` vertical rhythm,
each opened by an **eyebrow + Fraunces H2** pair (`clamp(23px,3vw,27px)`). Order, top to bottom:

1. **Hero** (concierge room) — §1.
2. **Smart Match** — `.cc-match`, a *lens* on the data, two warm panels split by a `--line` rule. Comfort density.
3. **The comparison instrument** — `.cc-term` matrix. THE centerpiece (§5). Terminal density.
4. **Plan-card inventory** — `.cc-cards` spec-first cards (auto-fill, 255px min). Exactly one `.fit` "Most fitting" gold-ringed card.
5. **Carrier branch grid** — §3.
6. **Short-glossary module** — §4.
7. **Browse by treatment / timing** — `.cc-navcard` grid, hover lifts `translateY(-2px)` + border `--green`.
8. **Methodology / trust** — `.cc-method` card, gold left-rule, "how we verify" prose.

Rhythm alternates **comfort → terminal → comfort**: editorial breathes, the instrument is tight and engineered.
That contrast is what reads premium — a precise instrument resting inside a warm room.

---

## 3. Carrier branch-grid card

The carrier section answers "does my carrier work here" without letting any carrier repaint the page
(CoverCapy identity stays dominant — one logo + one quiet marker per carrier, no rainbow cards).

**Card anatomy** (build on `.cc-navcard` / `.cc-logo-plate`):
- **Logo plate:** `.cc-logo-plate` — 40px, white `#fff` plate, `--line` border, `--r-sm` radius, carrier SVG ≤78%. White plate isolates the carrier mark so the brand-colored logo never bleeds into the page.
- **Carrier name:** Fraunces 17px `--teal-night` (`.cc-navcard .n`).
- **One marker line:** Inter Tight 12.5px `--muted` (`.d`) — e.g. "Delta Dental PPO · 412 offices in-network · accepted at this market". Tabular-nums on the count.
- **Status pill (optional, quiet):** `.cc-badge--review` only when a carrier is under review — `--alert-bg #F3E8CF` bg, `--gold-text #8A6721` text, `--gold` border. Never a per-carrier color theme.
- **Grid:** `repeat(auto-fill,minmax(220px,1fr))`, gap 16px, on `--cream` paper. Cards are `--card #FFFDF8`, `--line` border, `--sh`. Hover: lift 2px + `--green` border. No gradients, no glass.
- **The one accent allowed:** a 3px top or left hairline in `--gold` if you want to differentiate a featured carrier — borrow `.cc-method`'s `border-left:3px solid var(--gold)`. That is the ceiling on carrier accenting.

---

## 4. Short-glossary module

A compact, inline-and-standalone glossary so dense spec terms (annual max, waiting period, UCR, basic vs major)
are one tap from a plain-language answer. Reuse the live tooltip system; add a standalone strip.

- **Inline term:** `.cc-gloss` — Inter Tight 600, `--teal-night` text, `--teal-700` **dotted** underline (this is why links and glossary read as *interactive* without being the CTA color). Hover → solid underline. `:focus-visible` gold ring. `cursor:help`.
- **Tooltip:** `.cc-tip` — `--teal-night` bg, `--paper` text, 13px Inter, `--r 10px`, `--sh-lg`. `<b>` in white Inter Tight for the term, `.why` italic `--paper-2` for the plain-English gloss, `.more` in `--gold` for "see full glossary". Tap + focus + hover, Esc to close, `aria-describedby` — never hover-only.
- **Standalone strip:** a `.cc-comfort` card, `--card` surface, listing 6–8 core terms as a two-column definition list: term in Inter Tight 600 `--teal-night`, definition in `--body`. Keeps the dense matrix readable without bloating it with parenthetical explanations.

---

## 5. The comparison instrument as centerpiece

This is the page's reason to exist; it must read as an **engineered instrument**, calm and exact, inside the warm room.

- **Frame:** `.cc-term` — `--card` surface, `--line-2` border, `--r 14`, `--sh-sm`, `overflow:auto`. Tight 8–12px padding (terminal density), not the lush 24px of the editorial sections. The density contrast is the signal.
- **Header band:** `thead th` sticky, `--teal-night #082A30` bg, white text, Inter Tight 12.5px 600 — the single darkest element on the page, anchoring the eye to the instrument.
- **Row labels:** `tbody th` sticky-left, `--paper-2 #EFE8D9` bg, `--ink` 12px. Five coverage rows always present: **Preventive · Basic · Major · Implants · Orthodontics.**
- **Cells:** Inter Tight 12.5px, `tabular-nums` so columns align to the decimal. `--body` text. Zebra via `color-mix(--paper 55% / --card)`.
- **Best-in-row:** `--gold` 2px underline + a `.pill` ("Best") in `--gold-text` on `--alert-bg`. **Never color alone** — a11y floor.
- **Not covered:** `--cov-none` italic + "—". Coverage semantics carry a glyph, not just a hue (`p-full`/`p-part`/`p-none`).
- **Year-1 / Later toggle:** `.cc-yrtog`, active segment `--teal-night` fill white text — reveals graduated rates without a second table.
- **Compare tray:** `.cc-tray`, sticky bottom, `--teal-night` bg `--paper` text, pin 2–4 plans. Beats the CTA bar in the collision contract; never stack two sticky bars.

**Why it reads as centerpiece:** it is the only teal-night-banded block in the flow, the only tabular type,
the only terminal-density region. Surrounded by airy Fraunces editorial, the dark precise grid pulls focus by contrast.

---

## 6. Button hierarchy

| Level | Class | Fill | Text | When |
|-------|-------|------|------|------|
| Primary CTA | `.cc-btn--green` | `--teal-night #082A30` (hover `--teal-deep #0C3A42`) | `#fff` | one per section max: "Get covered", "Match me", "Verify here" |
| Secondary / ghost | `.cc-btn--ghost` | transparent, `--line-2` border | `--teal-night` | "Compare all", "How we verify" |
| Tertiary / link | bare `a` | none | `--teal-700` | inline navigation, "view sources" |
| Toggle (on) | `.cc-yrtog button.on`, `.cc-filter:checked` | `--teal-night` / `--mint-soft` | white / `--ink` | state, not navigation |

Rule: **at most one filled `--teal-night` button visible per viewport region.** Everything else is ghost or link.
Focus ring is always `2px solid var(--gold-text)` offset 2px — never `outline:none`.

---

## 7. DO / DON'T with verified contrast pairs

All pairs below were checked; each load-bearing pair is **≥ AA (4.5:1 text / 3:1 large+UI)**.

**DO — verified pairs:**
- `--body #33453E` on `--cream #F6F0E6` → **8.0:1** ✓ (body prose)
- `--teal-700 #14525B` on `--cream #F6F0E6` → **6.3:1** ✓ (links, eyebrows)
- `--teal-night #082A30` on `--cream #F6F0E6` → **12.2:1** ✓ (headings)
- white `#fff` on `--teal-night #082A30` button → **13.9:1** ✓ (primary CTA + matrix header)
- `--muted #56655F` on `--cream #F6F0E6` → **4.9:1** ✓ (trust line, captions)
- `--gold-text #8A6721` on `--alert-bg #F3E8CF` → **4.6:1** ✓ ("Best" pill, review badge)
- `--cov-full #136A52` on `--card #FFFDF8` → **5.2:1** ✓ (covered specs)
- `--paper #F6F0E6` on `--teal-night #082A30` tooltip → **11.6:1** ✓ (tip body)

**DON'T (each is a real failure to avoid):**
- ✗ Body prose in `--teal-night` (the CTA color) — kills the three-tier separation; this was the prior scheme's failure.
- ✗ `--ink-faint #8A958F` on `--cream` for anything you must read → **2.7:1** ✗ — labels only.
- ✗ The ZIP's bright teal `#0E8C8B` on white → **3.2:1** ✗ — never a button or text color.
- ✗ White text on a gold/`--gold` button → ~2.9:1 ✗.
- ✗ `--gold #B8924F` as readable text on paper → ~2.8:1 ✗ — hairlines and badge bg only; use `--gold-text` when gold must be read.
- ✗ Per-cell "needs verification" badges, per-carrier repaints, glass, gradients on cards, stacked sticky bars, hover-only tooltips, a mascot hero.

---

## 8. Where the ZIP looks clinical, and how T5 jade fixes it

The redesign package (`_redesign-package/index.html`) reads as **cool clinical SaaS**:

| ZIP (clinical) | T5 jade (premium) |
|----------------|-------------------|
| `--bg:#F6F8FA` blue-gray surface, white `#FFFFFF` cards | warm `--cream #F6F0E6` paper, `--card #FFFDF8` cards — a room, not a dashboard |
| bright `--teal:#0E8C8B` CTA (3.2:1, fails AA) | `--teal-night #082A30` fill, 13.9:1 — deep, calm, passes |
| blue info chips `#1551A8`, multi-hue status system | one warm `--gold-text`/`--alert-bg` status, `--mint-soft` for "on" — restrained |
| Inter only (ships Fraunces, never applies it) | Fraunces = voice on every heading + plan name; Inter Tight tabular = data |
| even white surfaces everywhere, uniform density | comfort↔terminal density contrast; the dark matrix band is the engineered centerpiece |
| logo plates as colored chips letting carriers theme | white isolating logo plate, CoverCapy stays the dominant identity |

The ZIP's **structure** (matrix, compare tray, spec cards, sticky subnav) is strong and is kept. T5 jade reskins it warm:
it keeps spec-first density while trading clinical blue-gray + low-contrast teal for a concierge paper room with a
deep teal-night instrument. Premium comes from the **density contrast and the three-tier color discipline**, not from
adding ornament — the page is calmer *and* denser than the ZIP at the same time.
