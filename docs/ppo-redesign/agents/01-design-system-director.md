# Agent 01 — Design-System Director

> CoverCapy PPO hub-and-spoke redesign · Shared visual design language
> Mandate: 70% ZIP spec-first research-terminal + 30% CoverCapy editorial concierge warmth
> Target feel: **premium concierge clarity meets a modern insurance research terminal**
> Status of this file: **PROPOSED — feeds `05-APPROVED-DESIGN-SYSTEM.md`, awaiting style approval**

---

## 0. The core problem I found

There are **three** separate visual languages in the repo today, not two. Any "merge the ZIP with the live page" framing under-counts the drift:

| System | File | Background | Trust color | Gold | Headlines | Fonts loaded |
|---|---|---|---|---|---|---|
| **Live compare hub** | `compare-ppo-dental-plans.html` | warm paper `#F5F0E5` | green `#2E5E45` | `#C0902E` | Fraunces serif | Fraunces + Inter + Inter Tight |
| **Live find-a-dentist** | `find-my-dentist.html` | cream `#F6F0E6` | teal-night `#082A30` / mint `#5BE0A0` | `#B8924F` | Fraunces serif | Fraunces + Inter Tight |
| **ZIP redesign package** | `_redesign-package/*.html` | cool gray `#F6F8FA` | bright teal `#0E8C8B` | none (uses orange `#B26A00`) | **Inter only — no serif** | Fraunces loaded but never applied |

The two live pages already disagree on the primary trust color (`#2E5E45` green vs `#082A30` teal-night), on gold (`#C0902E` vs `#B8924F`), and on the paper hue. The ZIP is a different product entirely: a cool clinical SaaS terminal with bright teal and a semantic covered/partial/not-covered status palette, and **it abandons the serif** — Fraunces is in the `<head>` but every heading renders in `var(--font)` = Inter. That is the single biggest "looks like a different microsite" risk, and it is the first thing to reconcile.

The ZIP's strength is its **structure and semantics**, not its palette. We adopt the ZIP's spec-first architecture, its semantic coverage tokens, its spacing/radius/shadow scale, and its density discipline — and we re-skin all of it in the CoverCapy warm paper + green + gold + Fraunces identity. We do **not** adopt the ZIP's `#F6F8FA` gray surface or `#0E8C8B` bright teal as the page identity; those would make CoverCapy look like a generic insurance comparison SaaS, which the mandate explicitly forbids.

**Visual-system coherence score (current state): 4 / 10.** (Scoring + top-3 fixes in §11.)

---

## 1. Design principles (the non-negotiables)

1. **One CoverCapy skin, three densities.** Same tokens everywhere. The ZIP's terminal feel comes from *density and semantic color*, not from a separate palette.
2. **Warm paper is the page; cool is reserved for the spec terminal.** The page background, prose, and editorial sections stay warm. Inside comparison matrices and spec sheets a slightly cooler, denser "terminal surface" is permitted — but built from CoverCapy ink/line tokens, never the ZIP gray.
3. **Serif is the voice, sans is the data.** Fraunces carries identity and explanation; Inter Tight / Inter carries every number, label, and table cell. Numbers are never set in serif inside a comparison grid (they must align and scan).
4. **Specs before prose, but warmth frames them.** ZIP rule §3.1 holds: the standardized spec block is the first thing under the H1. CoverCapy editorial (verdict, why-it-matters, concierge reassurance) wraps *around* the specs, never in front of them.
5. **Status color is semantic and quiet.** Covered / partial / not-covered get a fixed, accessible color language. Verification status is a quiet line, never a loud per-cell badge (the ZIP's central fix).
6. **Carrier brand never repaints the page.** CoverCapy identity dominates; carriers get a logo, a 3px accent line, or a small badge only.
7. **Mr. Bara guides, never sits on data.** Smart Match, tooltips, empty/loading states, and one reassurance beside a high-friction CTA only.

---

## 2. Color tokens — the reconciled palette

### 2.1 How I reconciled it

- **Paper / cream foundation:** keep, lean toward the warmer compare-hub paper but unify the hue. The two live pages use `#F5F0E5` and `#F6F0E6` — close enough to merge. Chosen page paper: **`#F5F0E6`** (split-the-difference, slightly warm).
- **Deep trust color:** this is the one real decision. Compare hub uses forest green `#2E5E45`; find-a-dentist uses teal-night `#082A30`. **Recommendation: adopt teal-night `#082A30` as the deepest brand ink/panel, and keep green `#2E5E45` as the primary interactive "trust green."** Rationale: teal-night is the richer "concierge at night" anchor for panels, footers, and the deepest headings; green is the action/link color and reads as health/approval. This also nudges us toward the ZIP's teal family without importing its bright `#0E8C8B`.
- **Gold:** unify on **`#B8924F`** (find-a-dentist value) as the editorial accent — warmer and less mustard than the compare hub's `#C0902E`. Reserve gold for overlines, FAQ accents, the "best/recommended" marker, and Capy crown moments. Gold is **not** a status color.
- **Semantic coverage tokens:** adopt the ZIP's covered/partial/not-covered *concept* but recolor for warmth + AA contrast on paper. Covered uses the CoverCapy verified green family; partial uses a warm amber (not the ZIP's cool orange); not-covered uses a neutral warm gray.
- **Lines:** keep the warm line `#E3DAC8` / `#E8DFCF` family, not the ZIP cool `#DCE4EA`.

### 2.2 The unified token set

```css
:root{
  /* ---- Surfaces (warm, the page) ---- */
  --paper:        #F5F0E6;   /* page background */
  --paper-2:      #EFE8D9;   /* recessed rows, table label column */
  --card:         #FCFAF4;   /* cards, panels, modals */
  --cream-2:      #FBF6EC;   /* soft secondary card */

  /* ---- Terminal surface (the spec/compare zone — cooler but still warm-derived) ---- */
  --terminal:     #FBFAF6;   /* spec sheet / matrix cell base — quieter than card */
  --terminal-2:   #F1EEE6;   /* matrix label column, zebra */

  /* ---- Ink / text ---- */
  --teal-night:   #082A30;   /* deepest brand ink, panels, footer, top heading weight */
  --ink:          #21302A;   /* body headings, primary text */
  --ink-soft:     #3A4A42;   /* secondary text */
  --muted:        #6E7268;   /* labels, captions */
  --ink-faint:    #8A958F;   /* tertiary, disabled */

  /* ---- Trust green (primary action / link) ---- */
  --green:        #2E5E45;   /* primary buttons, links, active */
  --green-d:      #234A37;   /* hover / pressed */
  --green-l:      #5C7A66;   /* overline rules, soft accents */
  --sage:         #E6EDE3;   /* selected chips, soft fill */
  --sage-2:       #DCE6D8;

  /* ---- Gold (editorial accent only — never status) ---- */
  --gold:         #B8924F;
  --gold-2:       #D7B675;
  --gold-soft:    #F3E8CF;   /* warning / Delta-note background */

  /* ---- Semantic coverage status (the ZIP concept, CoverCapy-skinned, AA on paper) ---- */
  --covered:      #2F8F66;   --covered-ink:#1E5C42;  --covered-tint:#E7F3EC;
  --partial:      #A86B1E;   --partial-ink:#7A4A00;  --partial-tint:#F6EAD3;
  --notcov:       #6E7268;   --notcov-ink:#4A4F46;   --notcov-tint:#ECE8DE;

  /* ---- Signal ---- */
  --info:         #1E6FD9;   --info-tint:#E5EFFC;
  --danger:       #B0542E;   --danger-tint:#F5E6DC;  /* warm rust, not red */

  /* ---- Lines (warm) ---- */
  --line:         #E3DAC8;
  --line-2:       #D8CDB6;
  --line-soft:    #EFE8DA;
}
```

**Carrier accents** (used only as a 3px top-line / small badge, never a fill): store one accent hex per carrier in plan data (`carrier.accent`). It is applied to a single rule above the carrier name; the card body stays CoverCapy paper/card.

### 2.3 Rejected
- ❌ ZIP `--bg:#F6F8FA` / `--surface:#FFFFFF` cool gray as page identity → reads as generic SaaS.
- ❌ ZIP `--teal:#0E8C8B` bright teal as brand → too clinical/saturated; would clash with gold.
- ❌ ZIP `--partial:#B26A00` cool orange → swapped for warm `#A86B1E` to sit on paper.
- ❌ A per-carrier page palette → explicitly forbidden by the carrier color rule.

---

## 3. Typography

### 3.1 The two-role system

| Role | Family | Used for |
|---|---|---|
| **Voice (serif)** | `'Fraunces', Georgia, serif`, weight 400–500, italic for emphasis | H1–H3, plan/carrier names, the CoverCapy verdict, editorial ledes, FAQ titles, prices in *editorial* contexts (hero rec card) |
| **Data (sans)** | `'Inter Tight', 'Inter', system-ui, sans-serif` | every spec value, table cell, coverage %, premium *inside a matrix*, labels, eyebrows, buttons, nav, badges, microcopy |

**Hard rule (resolves the ZIP conflict):** restore Fraunces on all headings. The ZIP dropping serif is rejected. But **numbers that must align and be scanned** (comparison matrix cells, spec-sheet values, coverage grid) are set in Inter Tight tabular figures, not Fraunces. Serif prices are allowed only in the single hero recommendation card and plan-identity H1, where they read as editorial, not as a column to diff.

Standardize the font loads (the two live pages load slightly different Fraunces axes; the ZIP loads Fraunces and never uses it). One canonical load:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3.2 Type scale

| Token | Size | Font | Use |
|---|---|---|---|
| `--t-display` | `clamp(40px, 5.6vw, 64px)` / wght 400 | Fraunces | hub H1 only |
| `--t-h1` | `clamp(32px, 4vw, 44px)` / wght 400–500 | Fraunces | plan/carrier/page H1 |
| `--t-h2` | `clamp(26px, 3.2vw, 38px)` | Fraunces | section heads |
| `--t-h3` | `21px` | Fraunces | card titles, FAQ titles |
| `--t-lede` | `17–19px` / 1.6 | Inter | section intros, ledes |
| `--t-body` | `15–16px` / 1.55 | Inter | prose |
| `--t-data` | `13.5px` / 1.3 | Inter Tight | spec/table values |
| `--t-data-sm` | `12.5px` | Inter Tight | dense matrix cells |
| `--t-label` | `11–12px` / .14em tracking / uppercase | Inter | eyebrows, column heads, labels |
| `--t-price-xl` | `clamp(28px, 3vw, 38px)` | Inter Tight, tabular | premium in cards/spec sheet |

- **Tabular numbers everywhere numbers compare:** `font-variant-numeric: tabular-nums;` on `.matrix`, `.spec-sheet`, `.coverage-grid`, prices.
- **Eyebrow pattern** (keep from live): green/gold uppercase label with a short rule before it.
- Serif gets `letter-spacing:-.01em`; sans data gets `letter-spacing:0`.

---

## 4. Spacing, radii, border, elevation

### 4.1 Spacing scale (adopt the ZIP's, it's cleaner than the live ad-hoc paddings)

```css
--sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px; --sp-6:32px; --sp-7:48px; --sp-8:64px;
--max:1160px;     /* content width — ZIP 1160 over live 1200; tighter = more scannable */
--rail:336px;     /* sticky rail / compare side panel */
```
- Section vertical rhythm: comfortable sections `--sp-8` (64px) top/bottom; compact/terminal sections `--sp-6` (32px).
- Page gutter: 28px desktop, 16px mobile.

### 4.2 Radii (reconcile — live uses 16px everywhere; ZIP has a graded scale; adopt the graded scale)

```css
--r-xs:6px;   /* chips, badges, inline pills inside dense cells */
--r-sm:10px;  /* inputs, small controls, coverage cells */
--r-md:14px;  /* cards, spec sheet, table container */
--r-lg:18px;  /* hero entry card, modals, FAQ entries */
--r-pill:999px; /* buttons, filter chips, carrier badges */
```
Rule: **density dictates radius.** Dense/terminal components use `--r-sm`/`--r-md`; editorial/explanatory components use `--r-lg`. No 24px+ "SaaS pricing card" rounding anywhere (forbidden by mandate).

### 4.3 Borders
- Default hairline: `1px solid var(--line)`.
- Emphasis / matrix header underline: `2px solid var(--green)`.
- Carrier accent: `3px solid var(--carrier-accent)` top rule only.
- Status callouts (Delta note, warnings): `1px solid var(--line)` + a `3px` left rule in `--gold` (info) or `--partial` (caution).
- Never use shadow as the only separator in dense zones — use lines. Borders do the structural work in the terminal; shadows are reserved for lift.

### 4.4 Elevation / shadow (warm-tinted, three steps)

```css
--sh-1:0 1px 2px rgba(8,42,48,.05), 0 1px 1px rgba(8,42,48,.04);          /* resting card */
--sh-2:0 4px 14px rgba(8,42,48,.07), 0 1px 0 rgba(8,42,48,.03);           /* hover / raised card */
--sh-3:0 18px 50px rgba(8,42,48,.10);                                      /* hero entry, modals */
--sh-tray:0 -8px 28px -10px rgba(8,42,48,.18);                             /* sticky compare tray (upward) */
```
Shadows are tinted with teal-night `rgba(8,42,48,…)`, not neutral black — keeps lift warm. **No glassmorphism / floating glass panels.** Sticky bars use a solid `--paper` at 93% + a 1px line, not heavy blur stacks.

---

## 5. Density modes

Two explicit modes, switchable by a wrapper class. This is how we honor "dense where comparison needs density, spacious where explanation needs calm."

| | **Compact (terminal)** | **Comfortable (editorial)** |
|---|---|---|
| Class | `.cc-compact` | `.cc-comfort` (default) |
| Used in | comparison matrix, spec sheet, coverage grid, plan-card library, carrier plan-to-plan matrix | hero, Smart Match, verdict, prose, FAQ, methodology, treatment explanation |
| Cell/row padding | `8–12px` (`--sp-2`/`--sp-3`) | `16–24px` (`--sp-4`/`--sp-5`) |
| Font | `--t-data` / `--t-data-sm`, tabular | `--t-body` / `--t-lede` |
| Radius | `--r-sm` / `--r-md` | `--r-md` / `--r-lg` |
| Separators | lines, zebra (`--terminal-2`) | whitespace + soft `--sh-1` |
| Line-height | 1.3 | 1.55–1.68 |
| Color temp | cooler terminal surfaces, semantic status | warm paper, sage, gold |

Rule: a single page flows comfort → compact → comfort. The matrix is an island of density inside a calm page; it must visibly read as "the instrument," set off by the `--terminal` surface and a `2px --green` header underline.

---

## 6. Component styling principles

### 6.1 Cards
- **Plan card (compact):** `--card` bg, `1px --line`, `--r-md`, `--sh-1`; carrier 3px accent top-rule; carrier name in `--t-label` muted; plan name in Fraunces `--t-h3`; **premium is the largest element** (`--t-price-xl`, Inter Tight, `--green-d`) with a small `illustrative` qualifier; then annual-max + deductible as a 2-up; then the 5-row coverage strip; `+ Compare` toggle + `View full plan`. Hover: lift to `--sh-2`, no transform jump.
- **Recommended/Smart-Match card (comfortable):** elevated `--sh-3`, `--r-lg`, green or sage-headed; price may be serif here; carries "why this ranked first" prose + one tradeoff. This is the *only* place editorial price styling is allowed.
- **No gradients on standard cards** (forbidden). Gradient is allowed ONLY on the deep teal-night "for dentists" provider card and the hero panel — never on plan/spec cards.
- **No random pastel cards, no rainbow carrier cards** (forbidden).

### 6.2 Tables (the comparison matrix + feature table)
- Real `<table>` semantics with `<th scope>` (a11y, per checklist §2). Never a div-grid for coverage.
- Structure: `row = spec, column = plan`. Label column = `--terminal-2` recessed, sticky-left on mobile. Header row sticky under the subnav, `2px --green` underline.
- Cells: `--t-data` Inter Tight tabular, vertically centered, `--sp-3` padding in compact.
- **Best-in-row** marker: a small `best` token (Inter, `--gold` text on `--gold-soft`), plus the value styled `--covered-ink` — never color alone (WCAG 1.4.1). Caption: "best spec ≠ best plan for you."
- **Not covered** always renders the words, set `--notcov-ink` on `--notcov-tint`.
- Cap visible columns at 3–4; beyond that the matrix becomes the filterable plan-card library.
- Mobile: horizontal scroll-snap with sticky label column + prev/next buttons (non-swipe equivalent required).
- Zebra via `--terminal` / `--terminal-2`, not shadows.

### 6.3 Coverage grid (Preventive/Basic/Major/Implants/Ortho)
- Five rows, fixed order, every surface, every time. Columns: % and waiting period.
- Each cell = a `cov-cell` pill: covered → `--covered-ink`/`--covered-tint`; partial → `--partial-ink`/`--partial-tint`; not covered → `--notcov`. Waiting period shown as a small `--danger` (warm rust) sub-line, e.g. `50% · 12-mo wait`.

### 6.4 Buttons (one hierarchy across all page types)

| Button | Style | Use |
|---|---|---|
| `.btn-pri` | `--green` bg, `#F4EFE2` text, `--r-pill` | primary action ("Verify my exact plan free", "Find my best-fit plan", "Compare (3)") |
| `.btn-ink` | `--teal-night` bg, `--paper` text | high-emphasis dark alt on light cards (sparingly) |
| `.btn-ghost` | transparent, `1px --line-2`, `--ink`; hover → green border+text | secondary ("View full plan", "Read sources") |
| `.btn-link` | underline-on-hover, `--green-d` | tertiary inline actions |

- All buttons Inter, wght 600, `--r-pill`, min tap target 44–48px (`--toch:52px` preserved on mobile bars).
- One primary per decision zone. No more than one sticky primary + one compare tray on screen at once.
- **No fake-urgency styling, no countdown chrome** (forbidden).

### 6.5 Badges / pills / chips
- **Filter chip:** `--card` bg, `1px --line-2`, `--r-pill`; selected → `--green` bg / cream text.
- **Plan-shape badge:** `--sage`/`--green-d` (Preventive · Basic · Major/Full).
- **Status / governance:** quiet single line — `Last verified Jun 20, 2026 · illustrative · view sources` in `--muted`, with `view sources` opening the source drawer. **Never a per-cell "Needs verification" badge** (the ZIP's #1 fix — verification is metadata, not a billboard).
- **Carrier badge:** small, logo + name, optional 1px accent border. Never a colored fill block.
- **Glossary tooltip trigger:** dotted `--green` underline on the term; tooltip is the dark teal card (keep the live `cc-tooltip` styling) — but tooltips must also open on tap/focus, not hover-only (forbidden + a11y).

### 6.6 Source drawer / accordions
- Source drawer: right-side or expand-in-place, `--card`, `--r-md`, lists source title / type / effective date / date checked / confidence. The home of all provenance.
- FAQ accordion: keep the live "reading room" pattern (Fraunces titles, gold numerals, `grid-template-rows 0fr→1fr` animation) but respect `prefers-reduced-motion`.

---

## 7. Carrier-brand & Mr. Bara rules (restated for design)

- **Carrier:** logo + 3px accent top-rule + optional small badge. No page repaint, no rainbow grid, no per-carrier color system.
- **Mr. Bara:** Smart Match guide, glossary/tooltips, loading/empty states, verification guidance, one reassurance beside a high-friction CTA. **Never** over prices, coverage matrices, exclusions, disclosures, source lists, or primary spec tables. No giant mascot hero on plan pages.

---

## 8. Motion
- Transitions `.12s–.2s` ease for hover/selection; `.3s–.5s` for accordion/drawer reveals.
- No parallax, no decorative auto-animation, no gradient shimmer.
- All non-essential motion gated behind `@media (prefers-reduced-motion: reduce)`.
- Sticky elements must not cause content jump on activation (reserve space / measure height — the live find-a-dentist already measures `--rail-h` in JS; reuse that pattern).

---

## 9. DO / DON'T (concrete, with tokens)

### DO
- ✅ Use `--paper #F5F0E6` as the page; reserve `--terminal`/`--terminal-2` for the matrix and spec sheet.
- ✅ Set every comparable number in `Inter Tight` with `tabular-nums`; keep Fraunces for headings and plan names.
- ✅ Restore Fraunces on all ZIP-derived layouts (the ZIP currently renders headings in Inter — fix it).
- ✅ Render coverage as a 5-row grid of `cov-cell` pills using `--covered/--partial/--notcov`, words + color, never color alone.
- ✅ Carry verification in ONE quiet `--muted` governance line → `view sources` drawer.
- ✅ Apply carrier color only as a `3px` accent top-rule.
- ✅ Use the graded radius scale (`--r-sm` dense → `--r-lg` editorial); tint shadows with `rgba(8,42,48,…)`.
- ✅ Cap side-by-side at 3–4 columns; switch to the filterable card library beyond that.
- ✅ Keep ≥44px tap targets, sticky-header offsets via `scroll-margin-top`, and reduced-motion fallbacks.

### DON'T
- ❌ Don't ship the ZIP gray `#F6F8FA` surface or bright teal `#0E8C8B` as page identity → generic SaaS.
- ❌ Don't set comparison numbers in Fraunces (they won't align/scan).
- ❌ Don't stamp "Needs verification" on every tile/cell.
- ❌ Don't use gradients on plan/spec/coverage cards (only the teal-night provider card + hero panel).
- ❌ Don't use 24px+ pill rounding on plan cards (no SaaS-pricing look).
- ❌ Don't use glassmorphism/heavy blur stacks; sticky bars = solid `--paper` 93% + 1px line.
- ❌ Don't give each carrier hub its own color system; don't rainbow the carrier index.
- ❌ Don't use hover-only definitions; tooltips open on tap/focus too.
- ❌ Don't put Mr. Bara over prices, matrices, exclusions, disclosures, or sources.
- ❌ Don't run two competing sticky bars; one subnav + one compare tray max.
- ❌ Don't bury the plan inventory under long editorial essays (specs-before-prose).
- ❌ Don't use color as the only status signal (every `Not covered` / `best` carries a word).
- ❌ Don't use fake countdowns, false scarcity, or "guaranteed savings" chrome.

---

## 10. Migration notes (for the implementer)
1. Add the unified `:root` block (§2.2 + §4) to a single shared token sheet; both live pages and all new spoke/hub pages reference it.
2. Reconcile the two live pages first: compare-hub adopts `--gold #B8924F` and `--teal-night` panels; find-a-dentist keeps its tokens (already aligned to this set) — they converge, not diverge.
3. Port the ZIP layouts (spec sheet, matrix, compare tray, coverage grid) but swap their `:root` for the unified one and re-enable Fraunces on headings.
4. Introduce `.cc-compact` / `.cc-comfort` density wrappers and the `--terminal` surface.
5. Replace every per-cell verification badge with one governance line + source drawer.

---

## 11. Score & top 3 fixes

### Current visual-system coherence: **4 / 10**
Why not lower: each individual surface is internally polished, uses a warm-trust direction, and the live pages share Fraunces + a paper/green/gold instinct. Why not higher: three competing token sets, two different primary trust colors and golds across the two live pages, and a ZIP package that is a fully separate cool-SaaS language with the serif disabled. A user moving hub → plan page → find-a-dentist today crosses three microsites.

### Top 3 things to fix (in order)
1. **Collapse to ONE token set and ONE trust-color decision.** Adopt `--teal-night #082A30` (deep panels/ink) + `--green #2E5E45` (action/link) + `--gold #B8924F` (editorial accent) across all surfaces. This single move kills most of the incoherence.
2. **Re-enable Fraunces on the ZIP layouts and split serif-vs-sans by role.** Headings/plan names = Fraunces; all comparable numbers = Inter Tight tabular. The ZIP shipping Inter-only headings is the loudest "different product" tell.
3. **Reskin the ZIP from cool-gray/bright-teal to warm paper + semantic coverage tokens, and kill the per-cell verification badges.** Keep the ZIP's structure (spec-first, matrix, compare tray, 5-row coverage grid) — replace its palette with CoverCapy's and reduce verification to one quiet governance line per plan.

---

*Output of Agent 01. Feeds `docs/ppo-redesign/05-APPROVED-DESIGN-SYSTEM.md`. PROPOSED — awaiting style direction approval (see `03-STYLE-DIRECTIONS-A-B-C.md` / `04-STYLE-DECISION-MATRIX.md`).*
