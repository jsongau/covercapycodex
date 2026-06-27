# HD03 — Delta Dental Branch in the Console Header

Agent: console / HD03
Scope: ANALYZE + SPEC only. No code shipped. Every claim grounded in real lines of
`/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`
unless marked PROPOSED.
No em-dashes in any shipped copy.

---

## 1. What exists today (grounded)

### The console header is the sticky TOC bar
Defined at line 118:
```
.toc{position:sticky;top:0;z-index:60;background:rgba(255,255,255,.92);backdrop-filter:saturate(180%) blur(10px);...}
```
Markup at lines 860 to 877. The link row is a flat `<nav class="toc-links" id="tocLinks">`
(line 866) of eight plain anchors:
```
Match a plan · Compare plans · By feature · By treatment · By situation · By carrier · Glossary · FAQ
```
`By carrier` (line 873) is a flat in-page jump to `#explore-carriers`. There is NO
dropdown, NO sub-menu, and NO Delta branch anywhere in the header today.

`.toc-links` styling (lines 126 to 129): horizontal flex, `overflow-x:auto`, anchors are
`var(--muted)` text with a 2px transparent bottom border that turns `var(--green)` on
hover/`.on`. There is no `position:relative` on the items, so nothing can anchor a popover yet.

### Delta is already featured, but only in the page body
Lines 1133 to 1143 hold a server-rendered branch block (`<!-- BRANCH GRID ... Delta hub
(sitelinks fuel) -->`). It contains a dark featured card:
```
1139: <a class="cc-branch-feat" href="/dental-insurance/ppo-plans/delta-dental/">
1141:   <span class="cc-branch-t"><em>Delta Dental</em>, the full hub</span>
1142:   <span class="cc-branch-d">Compare Delta Dental PPO plans, find an in-network ...</span>
1143:   <span class="cc-branch-go">Enter the Delta hub</span>
```
Card CSS at lines 1107 to 1118 (`.cc-branch-feat`, `.cc-branch-t/-d/-go`, plus the
`.cc-branch-grid` sibling list). This proves the visual language for a featured-Delta
block already exists. The mandate is to lift that language UP into the console dropdown so
Delta visually branches off from the flat standard-plan links.

### The flat standard-plan links (the comparison set)
Server-rendered static table, lines 957 to 964, links every carrier plan page:
Delta Dental PPO Premium, UnitedHealthcare Primary Dental, Aetna Dental Direct, Ameritas
PrimeStar Complete, Guardian Premier 2.0, Mutual of Omaha Dental Preferred, Humana
Extend 5000, MetLife NCD Complete. Delta is line 957, currently rendered as a peer in a
flat row, not branched.

### Color tokens available (lines 32 onward and 1107 onward)
- `--green:#0E8C8B`, `--green-d:#0A6E6D` (header accent)
- `--ink:#0F1B25`, `--muted:#5E707B`, `--line:#DCE4EA`, `--card:#FFFFFF`, `--sage:#E2F4F3`
- Featured-card tokens used by the existing Delta card: `--teal-night,#082A30`,
  `--gold,#D9B26A`, `--cream-card,#FFFDF8`, `--teal-700,#14525B`, `--teal-300,#5E8C92`.
The submenu reuses these so it matches both the header and the existing body card.

---

## 2. The Delta hub on disk (verified)

The mandate cited `dental-insurance/ppo-plans/delta-dental/` AND the source mirror at
`docs/ppo-redesign/_zip-21jun/delta/delta-dental/`. Both exist. The live serve path is the
former; all four sub-pages are present in both:

| Sub-page | Path (live) | `<title>` from source |
|----------|-------------|------------------------|
| Hub root | `/dental-insurance/ppo-plans/delta-dental/` | Delta Dental, Plans, PPO Dentists, Cost & Reviews |
| Premium | `/dental-insurance/ppo-plans/delta-dental/premium/` | Delta Dental PPO Individual Premium Plan, Coverage, Cost & Adult Ortho |
| Compare | `/dental-insurance/ppo-plans/delta-dental/compare/` | Is Delta Dental Good Insurance? Delta Dental vs Other PPO Plans |
| Over-65 | `/dental-insurance/ppo-plans/delta-dental/over-65/` | SCAN Health Plan Delta Dental Benefit, California & Washington (65+) |
| UC Students | `/dental-insurance/ppo-plans/delta-dental/uc-students/` | UC SHIP Dental and Delta Dental, Find a Dentist Near Your UC |

A "Find a Delta dentist" target is requested by the mandate. There is no dedicated
in-network finder page in the Delta hub folder; route it to the existing dentist search,
`/find-my-dentist?carrier=delta-dental` (the page already reads `?carrier=delta-dental`,
see line 2175 comment `Read URL params from hub referral (?carrier=delta-dental ...)`).

---

## 3. The gap

The flat `.toc-links` row treats Delta as one of eight equal text links and does not even
list carriers by name. Delta, the largest network in the United States (the body lede at
line 1138 already says so), gets no visual prominence in the console. We branch the
`By carrier` item into a hover/focus popover whose first child is a featured Delta card,
followed by the five Delta sub-page links, visually distinct from the flat plan links that
remain in the existing `#explore-carriers` body section.

---

## 4. PROPOSED markup — featured-Delta submenu in the console header

Replace the single flat anchor at line 873:
```
<a href="#explore-carriers">By carrier</a>
```
with a disclosure item that owns a popover. The item keeps the same visual weight as its
siblings; the branch only appears on hover or focus.

```html
<!-- PROPOSED: console-header carrier item with Delta branch -->
<div class="toc-item toc-has-menu">
  <button type="button"
          class="toc-disc"
          id="tocCarrierBtn"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="tocCarrierMenu">
    By carrier
    <svg class="toc-caret" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/>
    </svg>
  </button>

  <div class="toc-menu" id="tocCarrierMenu" role="menu"
       aria-labelledby="tocCarrierBtn" hidden>

    <!-- FEATURED DELTA BLOCK — branches off from the flat links below -->
    <a class="toc-delta-feat" role="menuitem"
       href="/dental-insurance/ppo-plans/delta-dental/">
      <span class="toc-delta-eye">Largest network in the United States</span>
      <span class="toc-delta-t"><em>Delta Dental</em>, the full hub</span>
      <span class="toc-delta-d">Plans, in-network dentists, cost and reviews in one place.</span>
      <span class="toc-delta-go">Enter the Delta hub</span>
    </a>

    <!-- DELTA SUB-PAGES -->
    <ul class="toc-delta-links" role="group" aria-label="Delta Dental pages">
      <li role="none"><a role="menuitem" href="/dental-insurance/ppo-plans/delta-dental/premium/">PPO Premium</a></li>
      <li role="none"><a role="menuitem" href="/dental-insurance/ppo-plans/delta-dental/compare/">Compare Delta</a></li>
      <li role="none"><a role="menuitem" href="/dental-insurance/ppo-plans/delta-dental/over-65/">Over 65, SCAN benefit</a></li>
      <li role="none"><a role="menuitem" href="/dental-insurance/ppo-plans/delta-dental/uc-students/">UC students</a></li>
      <li role="none"><a role="menuitem" href="/find-my-dentist?carrier=delta-dental">Find a Delta dentist</a></li>
    </ul>

    <!-- divider keeps Delta visually distinct from the flat standard-plan links -->
    <div class="toc-menu-div" role="separator"></div>
    <a class="toc-menu-all" role="menuitem" href="#explore-carriers">All carriers and plans</a>
  </div>
</div>
```

Notes:
- The trigger is a `<button>`, not an anchor, so it can carry `aria-expanded` and toggle
  on keyboard. `aria-haspopup="true"` and `aria-controls` wire it to the popover.
- The popover is `role="menu"`; the Delta sub-page list is a nested `role="group"` so
  assistive tech reads the five links as one set, distinct from the featured card and the
  trailing "All carriers and plans" fallback (which preserves the current `#explore-carriers`
  jump for anyone who wants the flat comparison).
- Copy carries no em-dashes. The em on "Delta Dental" matches the existing card at line 1141.

---

## 5. PROPOSED CSS

Reuses the header tokens and the existing featured-card palette so it reads as one system.

```css
/* PROPOSED: console-header Delta branch */
.toc-item{position:relative;display:flex;align-items:center}
.toc-disc{display:inline-flex;align-items:center;gap:5px;background:none;border:0;
  font:inherit;font-size:13.5px;font-weight:500;color:var(--muted);cursor:pointer;
  padding:4px 0;border-bottom:2px solid transparent}
.toc-has-menu:hover .toc-disc,
.toc-disc[aria-expanded="true"]{color:var(--ink);border-color:var(--green)}
.toc-caret{width:11px;height:11px;transition:transform .18s ease}
.toc-disc[aria-expanded="true"] .toc-caret{transform:rotate(180deg)}

/* popover */
.toc-menu{position:absolute;left:0;top:calc(100% + 10px);width:300px;
  background:var(--card);border:1px solid var(--line);border-radius:14px;
  box-shadow:0 18px 48px rgba(15,27,37,.16);padding:12px;z-index:70}
.toc-menu[hidden]{display:none}
/* hover-intent fallback for pointer users; JS still drives keyboard */
.toc-has-menu:hover .toc-menu{display:block}

/* featured Delta card — same language as .cc-branch-feat at line 1107 */
.toc-delta-feat{display:block;background:var(--teal-night,#082A30);color:#fff;
  border-radius:12px;padding:14px 15px;text-decoration:none;transition:background .2s ease}
.toc-delta-feat:hover{background:#0C3A42}
.toc-delta-eye{display:block;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--gold,#D9B26A)}
.toc-delta-t{display:block;font-size:18px;font-weight:600;margin:4px 0 2px;color:#fff}
.toc-delta-t em{font-style:italic}
.toc-delta-d{display:block;font-size:12.5px;color:#CFE0DA;max-width:34ch}
.toc-delta-go{display:inline-block;margin-top:8px;font-size:12.5px;font-weight:600;
  color:var(--gold,#D9B26A)}

/* sub-page links — flat, but inside the branch */
.toc-delta-links{list-style:none;margin:10px 0 0;padding:0}
.toc-delta-links a{display:block;padding:8px 9px;border-radius:8px;font-size:13.5px;
  color:var(--ink);text-decoration:none}
.toc-delta-links a:hover,.toc-delta-links a:focus-visible{background:var(--sage,#E2F4F3);
  color:var(--green-d);outline:none}

.toc-menu-div{height:1px;background:var(--line);margin:10px 2px}
.toc-menu-all{display:block;padding:6px 9px;font-size:12.5px;color:var(--muted);
  text-decoration:none}
.toc-menu-all:hover{color:var(--ink)}

@media (max-width:760px){
  .toc-menu{position:fixed;left:8px;right:8px;width:auto;top:calc(var(--toch) + 8px)}
}
```

---

## 6. PROPOSED behavior (keyboard + focus)

Pointer users get the CSS `:hover` reveal. For keyboard and screen-reader parity, JS on
`#tocCarrierBtn`:
- click / Enter / Space toggles `aria-expanded` and the `hidden` attribute on the menu;
- ArrowDown from the button moves focus into the first `[role="menuitem"]`;
- ArrowUp / ArrowDown cycle the menuitems; Escape closes and returns focus to the button;
- a document click outside `.toc-has-menu` closes the menu and resets `aria-expanded`.
This mirrors the existing omni-menu keyboard handler at lines 1844 to 1852
(`attachOmni`, ArrowDown / ArrowUp / Enter / Escape), so the pattern is already in the file.

---

## 7. Acceptance checks
1. Header still renders eight top-level items; only "By carrier" gains a caret and popover.
2. Hovering or focusing "By carrier" reveals a dark featured Delta card above five Delta links.
3. The five links resolve to the four verified hub sub-pages plus `/find-my-dentist?carrier=delta-dental`.
4. Delta is visually distinct (dark card + gold accent) from the flat plan links, which stay in `#explore-carriers`.
5. `aria-haspopup`, `aria-expanded`, `aria-controls`, `role="menu"`, and the nested `role="group"` are present.
6. No em-dashes in any added copy. The `<em>` on Delta Dental matches line 1141.
7. Tokens used are the ones already defined at lines 32 onward and 1107 onward; no new color values invented.
