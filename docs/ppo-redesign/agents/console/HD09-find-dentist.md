# HD09 - Find-a-Dentist in the Control Console

Page: `compare-ppo-dental-plans.html`
Scope: ANALYZE / SPEC only. Grounded in real lines.

---

## 1. What exists today

### The sticky console (`.toc`)
- `.toc` is the sticky control header: `position:sticky; top:0; z-index:60` (line 118), height `var(--toch)`, flex row with `gap:18px` (line 120).
- Inside `.toc .wrap` (line 861): brand (`.toc-brand`, line 862), section links (`.toc-links`, line 866), and one CTA pill.
- The existing Find-a-dentist pill: `<a class="toc-cta" href="/find-my-dentist">Find a dentist</a>` (line 876).
- `.toc-cta` styling (lines 124-125, 130): green pill, `margin-left:auto`, `border-radius:999px`, `flex-shrink:0`. Note line 130 re-declares `.toc-cta` as `display:flex` with `margin-left:18px` (a later override; the effective right-alignment still comes from the section being the last flex child plus `margin-left:auto` on line 124, but the two rules conflict and the console agent should treat line 130 as the live layout rule).

### The real search section (`#dentists`, line 989)
- Omni-input block: `#dentLoc` (line 998, the location text input), `#dentGo` (line 999, the search button), `#dentMenu` (line 1004, the autocomplete listbox).
- Search logic lives in two places:
  - `attachOmni($('#dentLoc'), $('#dentMenu'))` (line 2199) - wires typeahead/autocomplete onto the input.
  - `#dentGo` click handler (line 2200) routes to `find-my-dentist.html?loc=<encoded value>`.
- So the canonical route is `find-my-dentist.html?loc=...`, NOT the bare `/find-my-dentist` the console pill currently links to. The console pill and the real search disagree on destination.

### Precedent for scroll-and-focus (line 2018)
There is already a working pattern that scrolls to `#dentists` and focuses `#dentLoc`:
```js
const dent=$('#heroDentist');
if(dent)dent.addEventListener('click',()=>{
  const t=$('#dentists');
  if(t)t.scrollIntoView({behavior:'smooth'});
  const loc=$('#dentLoc');
  if(loc)setTimeout(()=>loc.focus(),420);
});
```
This is the model to reuse. It already proves the scroll-then-delayed-focus timing (420ms) works against this layout.

---

## 2. Decision: scroll-to-existing-input, NOT a duplicate console input

**Recommendation: keep a single prominent pill control that scrolls to `#dentists` and focuses `#dentLoc`. Do not embed a second live location input in the console.**

Why scroll-and-focus beats a console-embedded input:

1. **No duplicated search logic.** `attachOmni` binds autocomplete to one input/menu pair. A second console input would need its own `attachOmni($('#tocDentLoc'), $('#tocDentMenu'))` instance and its own `#dentGo`-style router. That is two code paths to keep in sync (CLAUDE.md: reuse, do not duplicate). The mandate explicitly says reuse, do not duplicate the search logic.
2. **Autocomplete menu has nowhere to go.** `#dentMenu` is an absolutely/relatively positioned dropdown inside the `.omni` block. In a 48-56px sticky bar, a typeahead dropdown would either be clipped by the bar or float detached over page content, both ugly and fragile across breakpoints.
3. **Space budget.** The console already carries brand + 8 section links (`.toc-links` is horizontally scrollable, line 126) + the CTA. A text input wide enough to type a city/ZIP into would crowd the links out, especially since `.toc-links` already overflow-scrolls.
4. **The precedent already exists and works.** `#heroDentist` (line 2018) does exactly this. Matching that pattern keeps behaviour consistent and the focus timing proven.
5. **One source of truth for the destination.** Routing stays entirely inside the `#dentGo` handler (line 2200). The console never constructs the `find-my-dentist.html?loc=` URL itself, so the route can never drift.

**Upgrade, do not replace, the existing `.toc-cta` pill.** Today it is an `<a href="/find-my-dentist">` that hard-navigates away. We change it to a button that scrolls to the in-page search, so the console keeps the user on the hub and lands them in the working omni-input.

---

## 3. Spec

### 3a. Markup (replace line 876)

Replace:
```html
<a class="toc-cta" href="/find-my-dentist">Find a dentist</a>
```
with:
```html
<button class="toc-cta" id="tocFindDent" type="button"
        aria-label="Find a dentist near you">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
  </svg>
  <span>Find a dentist</span>
</button>
```
Notes:
- Reuses the same search-glyph SVG already used on `#dentGo` (line 1000) so the pill visually reads as "search," reinforcing where it lands.
- A `<button type="button">` (not an anchor) because the action is in-page focus, not navigation. This also kills the bad `/find-my-dentist` URL.
- Keeps `class="toc-cta"` so existing pill styling (lines 124-125, 130) applies unchanged.

### 3b. CSS (additive, do not alter the token values)

`.toc-cta` already supplies the green pill, radius, padding and `flex-shrink:0`. Add only icon sizing and a button reset, since the element was an `<a>` before:

```css
.toc-cta{appearance:none;cursor:pointer;font:inherit}
.toc-cta svg{width:14px;height:14px;flex-shrink:0}
.toc-cta:focus-visible{outline:2px solid var(--green-d);outline-offset:2px}
```
- `appearance:none; cursor:pointer; font:inherit` normalise the native `<button>` so it matches the old anchor look.
- `:focus-visible` keyboard ring uses the existing `--green-d` token (CLAUDE.md: do not invent colors).
- No new color tokens, no gradient, no glassmorphism.

### 3c. JS (reuse the existing input; mirror the `#heroDentist` precedent)

Add alongside the existing wire-up block, immediately after line 2200 (where `#dentGo` is bound), so `attachOmni` has already run on `#dentLoc`:

```js
// Console "Find a dentist" pill -> reuse the live #dentists omni-input.
// Reuses attachOmni-wired #dentLoc; never duplicates search logic.
const tocFind=$('#tocFindDent');
if(tocFind)tocFind.addEventListener('click',()=>{
  const sec=$('#dentists');
  if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  const loc=$('#dentLoc');
  if(loc)setTimeout(()=>{loc.focus({preventScroll:true});},420);
});
```
Why this is correct:
- `attachOmni($('#dentLoc'),$('#dentMenu'))` (line 2199) has already bound autocomplete to `#dentLoc`; focusing it gives the user the fully wired input with typeahead and the `#dentGo` router behind it. Zero search logic re-implemented.
- 420ms delay matches the proven `#heroDentist` timing (line 2018) so focus fires after the smooth scroll settles, avoiding the browser yanking the viewport on `.focus()`. `preventScroll:true` is added belt-and-braces.
- `block:'start'` aligns the section top under the sticky bar; if the `var(--toch)` bar overlaps the heading, add `scroll-margin-top:var(--toch)` to `#dentists` rather than offsetting in JS.

Optional refinement (DRY the precedent): if you want one helper, extract the shared body and call it from both `#heroDentist` (line 2018) and `#tocFindDent`:
```js
function goToDentSearch(){
  const sec=$('#dentists'); if(sec)sec.scrollIntoView({behavior:'smooth',block:'start'});
  const loc=$('#dentLoc'); if(loc)setTimeout(()=>loc.focus({preventScroll:true}),420);
}
```
Then both handlers become `el.addEventListener('click',goToDentSearch)`. This removes the current duplication between line 2018 and the new pill.

### 3d. Suggested anchor offset (one line, optional)
```css
#dentists{scroll-margin-top:calc(var(--toch) + 12px)}
```
Keeps the "Find a dentist" eyebrow (line 992) clear of the sticky console after the scroll.

---

## 4. Risk / watch-outs
- Line 130 re-declares `.toc-cta` and conflicts with line 124. Converting to a `<button>` does not fix that pre-existing duplicate rule; flag it but do not silently rewrite both rules under this ticket.
- Do not point the pill back at `find-my-dentist.html?loc=` directly. Routing stays in the `#dentGo` handler (line 2200) so there is a single source of truth for the destination.
- No em-dashes in any added copy. Pill label stays "Find a dentist."
- `$` is the page's existing query helper (used throughout, e.g. lines 2018, 2199-2200); reuse it, do not introduce `document.querySelector` inline.
