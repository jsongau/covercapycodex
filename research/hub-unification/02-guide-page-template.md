# Guide Page Template — Reading Layout Recipe

How to convert a situational `/guides/*` page (e.g. `guides/between-jobs/`) to read
like the PPO plan pages (`dental-insurance/ppo-plans/metlife-ncd-complete/`): a
constrained main reading column + sticky right rail, jade/cream tokens, unified header.

Reference template studied: `dental-insurance/ppo-plans/metlife-ncd-complete/index.html`
- `.wrap{max-width:var(--max)}` where `--max:1160px`
- `.layout{display:grid;grid-template-columns:minmax(0,1fr) var(--rail);gap:36px;align-items:start}` (`--rail:336px`)
- `.main-col` = stacked structured `section.card` blocks; `aside.rail` = sticky CTA + on-this-page + compare-with.

## Key insight: the shared CSS already exists

`/assets/css/hub-theme.css` already contains a complete `guide-*` mirror of the plan
layout (search "GUIDE PAGE READING LAYOUT"). Do NOT add per-page layout CSS. Reuse:

| Plan-page class | Guide equivalent (in hub-theme.css) |
|---|---|
| `.wrap` (max 1160) | `.guide-max` |
| `.layout` (grid + rail) | `.guide-layout` (`minmax(0,1fr) 336px`, gap 36) |
| `.main-col` | `.guide-main` (flex column, gap 18) |
| `.card.specsheet` section | `.guide-main .section` (card, radius 16, padded) |
| `.verdict` two-up cards | `.guide-cards` + `.guide-opt` + `.guide-facts` |
| `.rail` (sticky) | `.guide-rail` (sticky `top:var(--cc-nav-h,88px)`) |
| `.rc` / `.rc-top` | `.guide-rc` / `.guide-rc-top` (panel header) |
| `.progress` on-this-page | `.guide-toc` |
| compare-with rows | `.guide-rel` |
| `.inflow` (mobile rail) | `.guide-inflow` |
| FAQ accordion | `.guide-faq .faq-item/.faq-question/.faq-answer` |
| dark closing CTA | `.guide-cta-band` |
| related pills | `.rel-pills` + `.rel-pill` |
| ghost button | `.guide-ghost` |

All of these use jade/cream tokens (`--paper`, `--card`, `--ink`, `--green`, `--panel`,
`--panel-eye`, `--line`). No mint, no `#5BE0A0`.

## Recipe (repeatable for the other guide pages)

1. **Strip the legacy per-page `<style>` block.** Delete the old `:root` alias
   shims, `nav`, `.hero`, `.section-*`, `.sidebar-col`, `.sb-*`, `.di-hub` rules
   (these were the source of `#5BE0A0` and `var(--mint)`). Replace with a tiny
   page block — for between-jobs only a `.guide-hero` band:
   ```css
   .guide-hero{background:var(--paper);border-bottom:1px solid var(--line)}
   .guide-hero .guide-max{padding-top:40px;padding-bottom:34px}
   ```

2. **Keep the unified header verbatim** (already applied):
   `<div id="cc-nav-mount"></div>`, `<div id="cc-hub-subnav-mount"></div>`,
   shared stylesheets (`mega-nav.css`, `mega-nav-mobile.css`, `footer.css`,
   `hub-theme.css`), and the footer mount BEFORE the universal loader.

3. **Standardize breadcrumb** (divider-less, plain `/` separators):
   ```html
   <div class="crumb"><div class="wrap"><a href="https://www.covercapy.com/">Home</a> / <a href="https://www.covercapy.com/dental-insurance/">Dental insurance</a> / <span>Guides</span> / <span>{Page Title}</span></div></div>
   ```
   Home -> `/`, Dental insurance -> `/dental-insurance/`, Guides -> plain `<span>`,
   current page -> plain `<span>`. Mirror this in the `BreadcrumbList` JSON-LD
   (4 ListItems: Home, Dental insurance -> /dental-insurance/, Guides -> /guides/,
   current page).

4. **Hero band** outside the grid:
   `<section class="guide-hero"><div class="guide-max"><header class="guide-head">`
   with `.eyebrow`, the single `<h1>`, `.guide-sub`, and `.cta-row` (`.btn.btn-green`
   + `.btn.btn-ghost`).

5. **Reading layout**: `<main class="guide-max"><div class="guide-layout">`
   - `.guide-main` holds: `.guide-inflow` (mobile CTA), then each content block as
     `<section class="section" id="...">` with `.eyebrow` + `<h2>` + body. Two-up
     comparisons use `.guide-cards`/`.guide-opt`/`.guide-facts`. Tables wrap in
     `.table-wrap`. Prose uses `.prose p`. FAQ uses `.guide-faq`. Close with
     `.guide-cta-band` and a `.section.guide-related` pill row.
   - `.guide-rail` (`<aside>`) holds: a `.guide-rc` CTA card (`.guide-rc-top` dark
     panel + `.guide-rc-body` button + `.guide-rc-foot`), a `.guide-rc.plain.guide-toc`
     on-this-page list, a `.guide-rc.plain.guide-rel` related list, a page-info card,
     and a `.guide-ghost` find-a-dentist button.

6. **Heading hierarchy**: exactly one `<h1>` (in `.guide-head`); each section uses
   `<h2>`; option cards and rail use `<h3>`/`.rh`. No em-dashes anywhere (rewrite
   titles/headers using commas or colons).

7. **FAQ JS**: keep the existing `toggleFaq(btn)` — it toggles
   `btn.nextElementSibling` (`.faq-answer`). Wrapping the question text in a
   `<span>` does not break it because `.faq-answer` is still the next sibling.

## Validation (run from repo root; all must pass)

```bash
F=guides/between-jobs/index.html
grep -o "<h1" "$F" | wc -l        # exactly 1
grep -c "—" "$F"                   # 0 em-dashes
grep -ic "5BE0A0" "$F"             # 0
grep -c "var(--mint" "$F"          # 0
# footer mount precedes loader: cc-footer-mount line < UNIVERSAL COMPONENT LOADER line
grep -n "cc-footer-mount\|UNIVERSAL COMPONENT LOADER" "$F"
# JSON-LD parses
python3 -c "import re,json,sys;[json.loads(b) for b in re.findall(r'ld\+json\">(.*?)</script>',open('$F').read(),re.S)]"
# inline JS parses: extract non-src, non-ld+json <script> bodies and node new Function() them
```

Between-jobs results: 1 h1, 0 em-dashes, 0 `#5BE0A0`, 0 `var(--mint)`, footer mount
(line 407) before loader (line 408), both JSON-LD blocks parse, both inline JS blocks
parse via `new Function`.

## Notes / gotchas
- Build URLs/links from parts; keep www host + trailing slashes (already present here).
- The old meta description had a corrupted run-on ("cost less thanroll"); fixed to a
  clean sentence while converting.
- Only shared CSS additions are allowed in other files; for between-jobs no new
  hub-theme.css rules were needed — the `guide-*` system already covered it.
