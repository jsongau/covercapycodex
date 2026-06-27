# HD10 — Console Synthesis (blueprint to implement from)

Role: synthesis lead. Consolidated CONSOLE SPEC + exact, low-risk edit plan for the
sticky `.toc` block in `compare-ppo-dental-plans.html`. Analysis/spec only, no prototypes.
No em-dashes anywhere in shipped copy.

---

## 0. Ground truth (verified against the live file)

- `.toc` CSS: lines 117 to 130. Note: `.toc-cta` is declared TWICE (line 124 and
  line 130). Line 130 wins for `display/gap/margin-left`; line 124 wins for the rest
  via specificity-equal-last. This is a latent bug to clean up during the edit.
- `.toc` markup: lines 858 to 878. Structure today is a single-row `.wrap`:
  `toc-prog` (progress) + `toc-brand` + `nav.toc-links#tocLinks` (8 anchors) + `a.toc-cta` (Find a dentist).
- Mega-nav mounts ABOVE the toc at `#cc-nav-mount` (line 856, min-height 72px line 30),
  injected by the loader at line 2276. The toc is the SECOND bar and is the one that
  sticks (`position:sticky;top:0`, line 118).
- Scroll-spy: `scrollspy()` lines 1923 to 1930. It selects `#tocLinks a`, filters to
  hrefs starting with `#`, observes each target section, toggles `.on`. Progress bar
  writes `#tocProg` width on scroll. KEY FACT: spy keys off anchor children of
  `#tocLinks`, so any wrapper we add inside or around is safe AS LONG AS the in-page
  anchors keep their `#`-hrefs and the `#tocLinks`/`#tocProg` IDs survive.
- Compare Set: `const compare=new Set(['uhc'])` line 1412. Fully independent of the
  header DOM. The console must NOT touch it; any compare affordance in the console is a
  link/scroll target only (HD07 owns real wiring).
- Data island and schema builder (lines ~1900 to 1921) are independent of the header.
- Responsive: at max-width 1000px the MEGA-nav's `.mnav` and `.mact .sign` hide (line
  845). The toc has no mobile rule yet; `.toc-links` already scrolls horizontally
  (overflow-x:auto, scrollbar hidden, lines 126 to 127).

---

## 1. Final console layout (two-tier sticky bar)

The console is the `.toc` bar reframed as a control console. It stays a SECOND bar under
the mega-nav. Two tiers INSIDE the sticky `.toc`, stacked, both sticky as one unit.

```
┌─ .toc (sticky, top:0) ───────────────────────────────────────────────┐
│ [toc-prog  #tocProg  2px progress]                                    │
│                                                                        │
│ TIER 1  .toc-wrap-a    (identity + primary action)                    │
│   toc-brand "PPO Plan Hub" (left)                                     │
│   ......................................... flex spacer .............  │
│   toc-tools (right cluster, HD05/HD06/HD07 own contents):             │
│     [Plans dropdown ▾]  [Find a dentist →  .toc-cta]                  │
│                                                                        │
│ TIER 2  .toc-wrap-b    (navigation rail)                              │
│   nav.toc-links #tocLinks  (8 section anchors, scroll-spy)           │
└────────────────────────────────────────────────────────────────────┘
```

Element placement (every element accounted for):

| Element | Tier | Owner | Notes |
|---|---|---|---|
| `#tocProg` progress | top edge, spans full width | HD10 | unchanged ID/behavior |
| `.toc-brand` PPO Plan Hub | Tier 1 left | HD10 | unchanged markup |
| Plans dropdown ▾ | Tier 1 right cluster | HD02 | new control, button + menu |
| Delta flagship branch | inside Plans dropdown | HD03 | primary + secondary route |
| Gold/Jade toggle | OMIT per master doc | HD05 | master decision: drop toggle. If kept, Tier 1 far right, before CTA |
| Filters/Sort entry | Tier 1 OR Tier 2 right | HD06 | scrolls to `#compare`; not new state |
| Compare (N) chip | Tier 1 right, near CTA | HD07 | read-only display of `compare.size`; click scrolls to `#compare` |
| Hub links (8 anchors) | Tier 2 `#tocLinks` | HD08 | unchanged anchors, scroll-spy intact |
| Find a dentist CTA | Tier 1 far right | HD09 | `.toc-cta`, route `/find-my-dentist` |

Master-doc constraints honored: gold/jade toggle and Fraunces are dropped (decision 2);
no em-dashes (decision 4); premiums display-only (not a header concern); preserve
crawlable hub nav. The 8 anchors stay as the crawlable nav rail.

---

## 2. Ordered, low-risk edit sequence for `.toc`

Principle: preserve `#tocProg`, `#tocLinks`, and every `#`-anchor. Wrap, do not rebuild.
Add tiers as new wrappers; never remove the IDs the JS depends on.

### Step A — markup: split the single `.wrap` into two tier wrappers (lines 859 to 878)
Replace the inner content of `<div class="toc">` while keeping `#tocProg` and `#tocLinks`:

```html
<div class="toc">
  <div class="toc-prog" id="tocProg"></div>
  <div class="wrap toc-wrap-a">
    <a class="toc-brand" href="/compare-ppo-dental-plans/" aria-label="CoverCapy PPO dental plan hub">
      <span class="mk"><svg ...>...</svg></span>
      PPO Plan Hub
    </a>
    <div class="toc-tools">
      <!-- HD02 Plans dropdown button + menu mounts here -->
      <!-- HD07 Compare (N) chip mounts here (read-only) -->
      <a class="toc-cta" href="/find-my-dentist">Find a dentist</a>
    </div>
  </div>
  <div class="wrap toc-wrap-b">
    <nav class="toc-links" id="tocLinks" aria-label="Hub sections">
      <a href="#match">Match a plan</a>
      <a href="#compare">Compare plans</a>
      <a href="#shelf">By feature</a>
      <a href="#treatment">By treatment</a>
      <a href="#situation">By situation</a>
      <a href="#explore-carriers">By carrier</a>
      <a href="#glossary-shelf">Glossary</a>
      <a href="#faq">FAQ</a>
    </nav>
  </div>
</div>
```
This keeps all 8 anchors and both IDs. Scroll-spy and progress need zero JS change.

### Step B — CSS: add tier layout, fix the double `.toc-cta`, set `--toch`
- Remove the duplicate `.toc-cta` (line 130). Keep ONE clean `.toc-cta` definition.
- `.toc` keeps sticky/blur. `.wrap` height var `--toch` now applies per tier; total
  sticky height is `2 * --toch` (or set distinct heights). Add:
```css
.toc-wrap-a{display:flex;align-items:center;gap:18px;height:var(--toch)}
.toc-wrap-b{display:flex;align-items:center;height:calc(var(--toch) - 8px);
            border-top:1px solid var(--line-soft)}
.toc-tools{display:flex;align-items:center;gap:12px;margin-left:auto;flex-shrink:0}
.toc-links{flex:1}  /* already overflow-x:auto */
```
- Confirm any `scroll-margin-top` / anchor offset accounts for the now-taller two-tier
  sticky bar so in-page jumps do not hide section headings under the console.

### Step C — JS: nothing required for spy/progress; only additive wiring
- Scroll-spy (1923 to 1930): NO CHANGE. It still finds `#tocLinks a`.
- HD07 Compare chip: add a tiny read-only updater that sets the chip label to
  `compare.size` wherever `render()` already runs. Do NOT mutate `compare` from the
  header. Chip click = `location.hash='#compare'` (or smooth scroll), nothing more.
- HD02 Plans dropdown: self-contained open/close + focus trap; routes are plain links.
  No coupling to compare Set or data island.

---

## 3. Must-verify items

Routes (confirm real, no 404s):
- `/find-my-dentist` — master doc agent 15 says trailing-slash it. Confirm slash policy
  vs `vercel.json trailingSlash:false` (master "Flags" section). Pick ONE and apply to
  the CTA href.
- `/compare-ppo-dental-plans/` brand href — same slash decision.
- Delta flagship: PRIMARY "See the PPO Premium plan" + SECONDARY "Explore the Delta hub"
  (`delta-dental/` exists, agent 18). Do NOT ship `/compare/is-{carrier}-good/` (404).
- Plans dropdown carrier links must resolve to built pages only.

ARIA / a11y:
- `nav.toc-links` keeps `aria-label="Hub sections"`; Tier-1 tools cluster needs its own
  label or role if it becomes a nav.
- Plans dropdown: `aria-expanded`, `aria-controls`, `role="menu"`/`menuitem`, Esc closes,
  focus returns to trigger.
- Compare chip: `aria-live="polite"` on the count so the number announces on change.
- Progress bar `#tocProg`: decorative, ensure `aria-hidden` or no semantic role.
- Focus order: brand to tools to nav rail reads logically.

Mobile (verify at 1000px and 620px):
- Mega-nav `.mnav`/`.mact .sign` already hide at 1000px (line 845); console becomes the
  primary nav surface on mobile. Confirm the two-tier console does not eat excessive
  vertical space; consider collapsing Tier 1 tools (dropdown + CTA + chip) without
  hiding the CTA.
- `.toc-links` horizontal scroll already works; verify swipe still smooth under the new
  Tier-2 wrapper and the scroll-spy `.on` underline stays visible.
- Verify `2 * --toch` sticky height plus mega-nav (72px) does not over-consume the
  small-screen viewport; tune `--toch` or hide Tier 2 brand redundancy if needed.

Regression guards (do not break):
- `#tocProg`, `#tocLinks`, and all 8 `#`-anchors must survive verbatim.
- `compare` Set (line 1412) untouched by header DOM/JS.
- Data island + schema builder (lines ~1900 to 1921) untouched.
- No em-dashes in any added copy. No Fraunces, no gold/jade toggle (master decisions).
