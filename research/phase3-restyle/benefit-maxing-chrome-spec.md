# Benefit-Maxing Chrome Unification Spec
## Phase 3 Restyle | benefit-maxing-chrome-spec.md
## Written June 26, 2026 -- do not hand-edit output pages; apply via this spec only.

---

## 0. PURPOSE AND SCOPE

This spec tells an implementing agent **exactly** what to add to all 23 benefit-maxing pages so
every page carries the same sticky `.toc` sub-nav, `.crumb` breadcrumb, and `#cc-ts` Gold/Jade
toggle that already appear on `compare-ppo-dental-plans.html` and
`/dental-insurance/ppo-plans/index.html`.

**The sub-nav is IDENTICAL to those two pages: the same six dropdowns, the same labels, the
same hrefs.** No benefit-maxing-specific variant (no "Guides" dropdown, no "Tools" dropdown,
no "Dental Emergencies" dropdown). The markup in BLOCK A below is verbatim from
`compare-ppo-dental-plans.html` with `#anchor` hrefs in the Compare dropdown replaced by
absolute paths (exactly as done on `/dental-insurance/ppo-plans/index.html`) so links work
from any URL depth.

The 23 pages are listed in Section 5 with their per-page breadcrumb trail.

No page body, hero, or Fraunces typography is altered. Only the chrome (sub-nav, breadcrumb,
their CSS, and one JS block) is added.

---

## 1. TOKEN COLLISION ANALYSIS

### Compare-page `:root` tokens (the chrome depends on these)
```
--paper, --paper-2, --card, --ink, --ink-soft
--green, --green-d, --green-l
--sage, --sage-2
--muted, --line, --line-2
--gold, --rust
--panel, --panel-ink, --panel-soft, --panel-eye
--serif, --sans
--shadow
--toch   (52px -- touch target height, used by .toc height)
--radius (16px)
```

### Benefit-maxing `:root` tokens (already declared on every bm page)
```
--teal-night, --teal-700, --teal-300
--mint, --mint-soft
--gold          VALUE COLLISION: bm uses #B8924F; compare uses #B26A00
--gold-deep, --gold-soft
--cream-card, --cream, --paper
--ink           VALUE COLLISION: bm uses #082A30; compare uses #0F1B25
--ink-soft      VALUE COLLISION: bm uses #56655F; compare uses #33444F
--ink-faint, --body
--line          VALUE COLLISION: bm uses #E8E2D8; compare uses #DCE4EA
--line-2        bm does NOT declare --line-2
--sh-lg
--ff-serif, --ff-sans
```

### Collisions resolved

| Token | BM value | Compare value | Resolution |
|-------|----------|---------------|-----------|
| `--gold` | `#B8924F` | `#B26A00` | Add `--cc-gold:#B26A00` alias; use in chrome CSS |
| `--ink` | `#082A30` | `#0F1B25` | Add `--cc-ink:#0F1B25` alias; use in chrome CSS |
| `--ink-soft` | `#56655F` | `#33444F` | Add `--cc-ink-soft:#33444F` alias; use in chrome CSS |
| `--line` | `#E8E2D8` | `#DCE4EA` | Add `--cc-line:#DCE4EA` alias; use in chrome CSS |
| `--line-2` | not declared | `#C9D6DE` | Add `--cc-line-2:#C9D6DE` |
| `--green` | not declared | `#0A7E7D` | Add `--cc-green:#0A7E7D` |
| `--green-d` | not declared | `#0A6E6D` | Add `--cc-green-d:#0A6E6D` |
| `--green-l` | not declared | `#5E707B` | Add `--cc-green-l:#5E707B` |
| `--sage` | not declared | `#E2F4F3` | Add `--cc-sage:#E2F4F3` |
| `--muted` | not declared | `#5E707B` | Add `--cc-muted:#5E707B` |
| `--sans` | bm uses `--ff-sans` | compare uses `--sans` | Add `--sans:var(--ff-sans)` |
| `--toch` | not declared | `52px` | Add `--toch:52px` |
| `--paper` | `#FDFBF7` | `#F6F8FA` | **No collision in chrome** -- `.toc` bg is overridden by gold/jade theme rules; bm body keeps its own `--paper`. Add `--cc-paper:#fff` for toc default bg. |
| `--card` | not declared | `#FFFFFF` | Add `--cc-card:#FFFFFF` |
| `--shadow` | not declared | compare value | Add `--cc-shadow: 0 1px 2px rgba(15,27,37,.05),0 4px 12px -4px rgba(15,27,37,.10)` |

**Rule:** All chrome CSS below uses `--cc-*` aliased tokens only, never the raw compare token
names. This guarantees zero body-style bleedthrough. The bm pages keep their existing Fraunces
look unchanged.

---

## BLOCK A -- Sub-nav HTML

**Where it goes:** Insert immediately after `<div id="cc-nav-mount"></div>`, before any other
content element (before `.crumb`, before `<nav class="cc-journey">`, before `<main>`).

**What to remove first:** Nothing -- just insert after the mount div.

**Note on the inner wrapper:** The div uses `class="wrap"` (not `class="toc-wrap"`). This is
verbatim from compare. The CSS in BLOCK B targets `.toc .wrap` to scope the flex layout.

**Note on IDs:** IDs are kept exactly as they are on compare: `ddCompareWrap`, `ddCompareBtn`,
`ddCompare`, `ddPlansWrap`, `ddPlansBtn`, `ddPlans`, `ddDeltaFly`, `ddDelta`, `ddExploreWrap`,
`ddExploreBtn`, `ddExplore`, `ddTreatWrap`, `ddTreatBtn`, `ddTreat`, `ddSitWrap`, `ddSitBtn`,
`ddSit`, `ddGlossWrap`, `ddGlossBtn`, `ddGloss`, `cc-ts`, `tocProg`. A single page never has
two sub-navs so there is no ID collision. Do NOT rename to `ddBm*`.

```html
<!-- STICKY SUB-NAV: verbatim from compare-ppo-dental-plans.html / ppo-plans/index.html chrome -->
<div class="toc">
  <div class="toc-prog" id="tocProg"></div>
  <div class="wrap">
    <div class="theme-switch" id="cc-ts" data-active="gold" role="switch" aria-checked="false" tabindex="0" aria-label="Switch color theme, Gold or Jade">
      <span class="ts-thumb"></span>
      <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
      <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
    </div>
    <div class="toc-dd" id="ddCompareWrap">
      <button class="toc-dd-btn" id="ddCompareBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddCompare">Compare <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddCompare" role="menu" aria-label="Compare plans">
        <a href="/compare-ppo-dental-plans" role="menuitem">Compare side by side</a>
        <div class="dd-lbl">By coverage tier</div>
        <a href="/compare-ppo-dental-plans#tier-essentials" role="menuitem">Essentials, budget-first</a>
        <a href="/compare-ppo-dental-plans#tier-full" role="menuitem">Full coverage, most popular</a>
        <a href="/compare-ppo-dental-plans#tier-maximum" role="menuitem">Maximum protection, highest limits</a>
      </div>
    </div>
    <div class="toc-dd" id="ddPlansWrap">
      <button class="toc-dd-btn" id="ddPlansBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddPlans">Plans <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddPlans" role="menu" aria-label="PPO plans by carrier">
        <div class="dd-lbl">Plans by carrier</div>
        <a href="/dental-insurance/ppo-plans/uhc-primary-dental/" role="menuitem">UnitedHealthcare</a>
        <a href="/dental-insurance/ppo-plans/aetna-dental-direct/" role="menuitem">Aetna</a>
        <a href="/dental-insurance/ppo-plans/ameritas-primestar/" role="menuitem">Ameritas</a>
        <a href="/dental-insurance/ppo-plans/guardian-premier-ppo/" role="menuitem">Guardian</a>
        <a href="/dental-insurance/ppo-plans/mutual-of-omaha-dental/" role="menuitem">Mutual of Omaha</a>
        <a href="/dental-insurance/ppo-plans/humana-extend-5000/" role="menuitem">Humana</a>
        <a href="/dental-insurance/ppo-plans/metlife-ncd-complete/" role="menuitem">MetLife</a>
        <div class="dd-fly" id="ddDeltaFly">
          <button class="dd-fly-btn" aria-expanded="false" aria-haspopup="true" aria-controls="ddDelta">Delta Dental <svg class="dd-fly-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
          <div class="dd-fly-panel" id="ddDelta" role="menu" aria-label="Delta Dental hub">
            <a href="/dental-insurance/ppo-plans/delta-dental-ppo-premium/" role="menuitem"><b>PPO Premium plan</b></a>
            <a href="/dental-insurance/delta-dental/compare/" role="menuitem">Is Delta Dental good?</a>
            <a href="/dental-insurance/delta-dental/over-65/" role="menuitem">Delta for over 65</a>
            <a href="/dental-insurance/delta-dental/uc-students/" role="menuitem">Delta for UC students</a>
          </div>
        </div>
        <a class="dd-all" href="/dental-insurance/ppo-plans/" role="menuitem">All carriers and plans</a>
      </div>
    </div>
    <div class="toc-dd" id="ddExploreWrap">
      <button class="toc-dd-btn" id="ddExploreBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddExplore">Explore <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddExplore" role="menu" aria-label="Explore the hub">
        <div class="dd-lbl">Guides and tools</div>
        <a href="/dental-insurance/" role="menuitem">Dental insurance overview</a>
        <a href="/dental-treatment-cost-estimator.html" role="menuitem">Treatment cost estimator</a>
        <a href="/dental-insurance/ppo-plans/" role="menuitem">All carriers and plans</a>
        <div class="dd-lbl">By situation</div>
        <a href="/guides/no-waiting-period/" role="menuitem">No waiting period</a>
        <a href="/guides/immediate-coverage/" role="menuitem">Coverage that starts now</a>
        <a href="/guides/between-jobs/" role="menuitem">Between jobs</a>
        <a href="/guides/self-employed/" role="menuitem">Self-employed</a>
      </div>
    </div>
    <div class="toc-dd" id="ddTreatWrap">
      <button class="toc-dd-btn" id="ddTreatBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddTreat">By Treatment <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddTreat" role="menu" aria-label="By treatment">
        <a href="/compare-ppo-dental-plans#treatment" role="menuitem">Compare plans by procedure</a>
        <div class="dd-lbl">Procedures</div>
        <a href="/guides/implants/" role="menuitem">Implants</a>
        <a href="/guides/crowns/insurance-coverage.html" role="menuitem">Crowns</a>
        <a href="/guides/root-canals/" role="menuitem">Root canals</a>
        <a href="/guides/dentures/" role="menuitem">Dentures</a>
        <a href="/guides/braces-invisalign/" role="menuitem">Braces and Invisalign</a>
        <a href="/guides/whitening/" role="menuitem">Whitening</a>
      </div>
    </div>
    <div class="toc-dd" id="ddSitWrap">
      <button class="toc-dd-btn" id="ddSitBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddSit">By Situation <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddSit" role="menu" aria-label="By situation">
        <a href="/compare-ppo-dental-plans#situation" role="menuitem">Match plans by life event</a>
        <div class="dd-lbl">Life situations</div>
        <a href="/guides/immediate-coverage/" role="menuitem">Lost my benefits</a>
        <a href="/guides/no-waiting-period/" role="menuitem">Need coverage now</a>
        <a href="/guides/between-jobs/" role="menuitem">Between jobs</a>
        <a href="/guides/self-employed/" role="menuitem">Self-employed</a>
      </div>
    </div>
    <div class="toc-dd" id="ddGlossWrap">
      <button class="toc-dd-btn" id="ddGlossBtn" aria-expanded="false" aria-haspopup="true" aria-controls="ddGloss">Insurance Terms <svg class="dd-car" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2"/></svg></button>
      <div class="toc-dd-panel" id="ddGloss" role="menu" aria-label="PPO glossary terms">
        <div class="dd-lbl">Key terms</div>
        <a href="/guides/glossary/annual-maximum/" role="menuitem">Annual maximum</a>
        <a href="/guides/glossary/waiting-period/" role="menuitem">Waiting period</a>
        <a href="/guides/glossary/deductible/" role="menuitem">Deductible</a>
        <a href="/guides/glossary/coinsurance/" role="menuitem">Coinsurance</a>
        <a href="/guides/glossary/in-network/" role="menuitem">In-network</a>
        <a href="/guides/glossary/coverage-major/" role="menuitem">Major services</a>
        <a href="/guides/glossary/missing-tooth/" role="menuitem">Missing tooth clause</a>
        <a href="/guides/glossary/out-of-pocket/" role="menuitem">Out of pocket</a>
        <a href="/guides/glossary/effective-date/" role="menuitem">Effective date</a>
        <a href="/guides/glossary/balance-billing/" role="menuitem">Balance billing</a>
        <a class="dd-all" href="/guides/glossary/" role="menuitem">All terms, A to Z</a>
      </div>
    </div>
  </div>
</div>
```

---

## BLOCK B -- CSS additions

**Where it goes:** Append at the **end of the existing `<style>` tag** in `<head>`. Do not
replace any existing CSS. Append only.

```css
/* ============================================================
   CHROME UNIFICATION -- compare-style sub-nav + crumb
   Tokens are aliased with --cc- prefix to avoid collision
   with existing benefit-maxing token values.
   ============================================================ */
:root {
  --cc-green:#0A7E7D; --cc-green-d:#0A6E6D; --cc-green-l:#5E707B;
  --cc-sage:#E2F4F3; --cc-sage-2:#D3EBEA;
  --cc-muted:#5E707B;
  --cc-ink:#0F1B25; --cc-ink-soft:#33444F;
  --cc-gold:#B26A00;
  --cc-line:#DCE4EA; --cc-line-2:#C9D6DE;
  --cc-card:#FFFFFF;
  --cc-paper:#FFFFFF;
  --cc-shadow:0 1px 2px rgba(15,27,37,.05),0 4px 12px -4px rgba(15,27,37,.10);
  --sans:var(--ff-sans);
  --toch:52px;
}

/* ---- sticky sub-nav ---- */
.toc{position:sticky;top:var(--cc-nav-h,68px);z-index:60;background:var(--cc-card);border-bottom:1px solid var(--cc-line);transition:background .45s ease}
@media(max-width:1080px){.toc{top:72px}}
.toc-prog{height:2px;background:var(--cc-green);width:0;transition:width .1s linear}
.toc .wrap{display:flex;align-items:center;gap:2px;height:var(--toch);flex-wrap:nowrap;max-width:none;margin:0;padding-left:26px;padding-right:26px}
.toc .theme-switch,.toc .toc-dd{flex:0 0 auto}
.toc .theme-switch{order:99;margin-left:auto}
@media(max-width:900px){
  .toc .wrap{overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;scrollbar-width:none}
  .toc .wrap::-webkit-scrollbar{display:none}
}

/* dropdown buttons */
.toc-dd{position:relative;flex-shrink:0}
.toc-dd-btn{display:inline-flex;align-items:center;gap:7px;font:600 14px var(--sans);color:var(--cc-ink);background:transparent;border:0;cursor:pointer;padding:8px 13px;border-radius:8px;white-space:nowrap;line-height:1}
.toc-dd-btn:hover,.toc-dd-btn[aria-expanded=true]{background:var(--cc-sage);color:var(--cc-green-d)}
.dd-car{width:9px;height:9px;transition:transform .15s}
.toc-dd-btn[aria-expanded=true] .dd-car{transform:rotate(180deg)}

/* dropdown panels */
.toc-dd-panel{position:absolute;top:calc(100% + 7px);left:0;width:290px;min-width:290px;background:var(--cc-card);border:1px solid rgba(18,22,27,.20);border-radius:12px;box-shadow:var(--cc-shadow);padding:7px;opacity:0;transform:translateY(-6px);pointer-events:none;transition:opacity .15s,transform .15s;z-index:80;overflow:visible}
.toc-dd-panel::before{content:"";position:absolute;top:-7px;left:20px;width:12px;height:12px;background:var(--cc-card);border-left:1px solid rgba(18,22,27,.20);border-top:1px solid rgba(18,22,27,.20);transform:rotate(45deg)}
.toc-dd-panel[data-open]{opacity:1;transform:none;pointer-events:auto}
.toc-dd-panel a{display:block;font:600 13.5px var(--sans);color:var(--cc-ink);padding:8px 11px;border-radius:9px;text-decoration:none;line-height:1.3}
.toc-dd-panel a:hover{background:var(--cc-sage);color:var(--cc-green-d)}
.toc-dd-panel a span{display:block;color:var(--cc-muted);font-size:11.5px;font-weight:400;margin-top:2px;line-height:1.4}
@media(max-width:900px){.toc-dd-panel{position:fixed;left:12px;right:12px;min-width:0;top:calc(var(--toch) + 4px)}}

/* dropdown section label + footer link */
.dd-lbl{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--cc-muted);padding:8px 11px 4px}
.dd-all{border-top:1px solid var(--cc-line);margin-top:6px;color:var(--cc-green-d)!important;font-weight:600}

/* Delta fly-out (nested inside Plans panel) */
.dd-fly{position:relative}
.dd-fly-btn{display:flex;justify-content:space-between;align-items:center;width:100%;gap:12px;font:600 13.5px var(--sans);color:var(--cc-ink);background:none;border:0;cursor:pointer;padding:9px 11px;border-radius:8px;text-align:left}
.dd-fly-btn:hover,.dd-fly-btn[aria-expanded=true]{background:var(--cc-sage);color:var(--cc-green-d)}
.dd-fly-car{width:11px;height:11px;flex-shrink:0}
.dd-fly-panel{position:absolute;top:-9px;left:calc(100% + 6px);min-width:230px;background:var(--cc-card);border:1px solid var(--cc-line);border-top:2px solid var(--cc-green);border-radius:14px;box-shadow:0 18px 44px rgba(15,27,37,.16);padding:8px;opacity:0;transform:translateX(-6px);pointer-events:none;transition:.15s;z-index:90}
.dd-fly-panel[data-open]{opacity:1;transform:none;pointer-events:auto}
.dd-fly-panel a{display:block;font:500 13.5px var(--sans);color:var(--cc-ink);padding:8px 11px;border-radius:8px;text-decoration:none}
.dd-fly-panel a:hover{background:var(--cc-sage);color:var(--cc-green-d)}
@media(max-width:900px){.dd-fly-panel{position:static;left:auto;top:auto;box-shadow:none;border:0;border-top:1px solid var(--cc-line);border-radius:0;padding:4px 0 4px 16px;opacity:1;transform:none;pointer-events:auto;min-width:0}}

/* ---- breadcrumb ---- */
.crumb{background:var(--cc-card);border-bottom:0;font-size:12.5px;color:var(--cc-muted)}
.crumb .wrap{padding:11px 26px}
.crumb a{color:var(--cc-muted);text-decoration:none}
.crumb a:hover{color:var(--cc-green-d)}
.crumb span{color:var(--cc-ink);font-weight:600}

/* ---- Gold/Jade theme toggle pill ---- */
.theme-switch{
  position:relative;display:inline-flex;align-items:center;
  background:#1a1a1a;border:1.5px solid rgba(255,255,255,.08);border-radius:999px;
  padding:4px;cursor:pointer;user-select:none;flex-shrink:0;height:38px;
  box-shadow:0 2px 12px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.06);
  transition:border-color .35s,box-shadow .35s;
}
.theme-switch:hover{border-color:rgba(184,146,79,.5);box-shadow:0 2px 12px rgba(0,0,0,.32),0 0 0 3px rgba(184,146,79,.14),inset 0 1px 0 rgba(255,255,255,.06)}
.ts-thumb{
  position:absolute;top:4px;left:4px;
  width:calc(50% - 4px);height:calc(100% - 8px);border-radius:999px;
  background:#B8924F;
  box-shadow:0 3px 10px rgba(184,146,79,.55),0 1px 3px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.22);
  transition:transform 1.8s cubic-bezier(.34,1.18,.64,1),background .7s ease;will-change:transform;
}
.theme-switch[data-active="jade"] .ts-thumb{transform:translateX(100%)}
.ts-opt{
  position:relative;z-index:1;display:flex;align-items:center;gap:5px;
  padding:0 16px;height:100%;
  font:700 11.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;
  color:rgba(255,255,255,.35);transition:color .35s;white-space:nowrap;
}
.ts-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;transition:opacity .35s;opacity:0}
.ts-opt.ts-gold .ts-dot{background:#B8924F}
.ts-opt.ts-jade .ts-dot{background:#0FB5A6}
.theme-switch[data-active="gold"] .ts-opt.ts-gold{color:#fff}
.theme-switch[data-active="gold"] .ts-opt.ts-gold .ts-dot{opacity:1}
.theme-switch[data-active="jade"] .ts-opt.ts-jade{color:#fff}
.theme-switch[data-active="jade"] .ts-opt.ts-jade .ts-dot{opacity:1}
@keyframes ts-pulse{
  0%,100%{box-shadow:0 2px 12px rgba(0,0,0,.32),0 0 0 0 rgba(184,146,79,0),inset 0 1px 0 rgba(255,255,255,.06)}
  50%{box-shadow:0 2px 12px rgba(0,0,0,.32),0 0 0 6px rgba(184,146,79,.18),inset 0 1px 0 rgba(255,255,255,.06)}
}
.theme-switch.flipping{animation:ts-pulse 1.8s ease-in-out}

/* Gold theme overrides -- toc only, scoped tightly */
[data-theme="gold"] .toc{background:#FBF6EC}
[data-theme="gold"] .toc-dd-btn:hover,[data-theme="gold"] .toc-dd-btn[aria-expanded=true]{background:#F6EEDA;color:#8A6212}
[data-theme="gold"] .toc-dd-panel a:hover{background:#F6EEDA;color:#8A6212}
[data-theme="gold"] .dd-fly-btn:hover,[data-theme="gold"] .dd-fly-btn[aria-expanded=true]{background:#F6EEDA;color:#8A6212}
[data-theme="gold"] .toc-prog{background:#C9A24A}
[data-theme="gold"] .crumb{background:#FBF6EC}
[data-theme="gold"] .crumb a:hover{color:#8A6212}
[data-theme="gold"] .crumb span{color:#15202E}

/* Jade theme overrides -- toc only, scoped tightly */
[data-theme="jade"] .toc{background:#fff}
[data-theme="jade"] .toc-prog{background:#0FB5A6}
[data-theme="jade"] .toc-dd-btn:hover,[data-theme="jade"] .toc-dd-btn[aria-expanded=true]{background:rgba(15,181,166,.10);color:#0C8C81}
[data-theme="jade"] .toc-dd-panel a:hover{background:rgba(15,181,166,.10);color:#0C8C81}
[data-theme="jade"] .dd-fly-btn:hover,[data-theme="jade"] .dd-fly-btn[aria-expanded=true]{background:rgba(15,181,166,.10);color:#0C8C81}
[data-theme="jade"] .dd-fly-panel{border-top-color:#0FB5A6}
[data-theme="jade"] .crumb{background:#fff}
[data-theme="jade"] .crumb a:hover{color:#0C8C81}
```

---

## BLOCK C -- Breadcrumb HTML

**Where it goes:** Insert immediately after the BLOCK A sub-nav (`.toc`), before
`<nav class="cc-journey">`.

**What to remove (old breadcrumbs):**
- On `benefit-maxing/index.html`: find and remove `<nav class="bm-crumbs" ...>...</nav>`
- On `benefit-maxing/guides/*/index.html`: find and remove `<nav class="cr-crumbs" ...>...</nav>`
- On `benefit-maxing/smart-timing-protocol/index.html`: find and remove whatever breadcrumb nav exists

**Template (substitute the per-page trail from the table below):**

```html
<!-- UNIFIED BREADCRUMB -- replace page-specific nav -->
<div class="crumb">
  <div class="wrap">
    <!-- INSERT PER-PAGE TRAIL EXACTLY AS SHOWN IN SECTION 5 TABLE -->
  </div>
</div>
```

Note: the crumb uses `<div class="crumb">` and `<div class="wrap">` to match compare's markup
exactly (line 1435 of compare-ppo-dental-plans.html).

### Per-page breadcrumb trail table (all 23 pages)

Use the exact inner HTML shown in the "Trail (inner HTML of .wrap)" column.

| # | File path | Trail (inner HTML of .wrap) |
|---|-----------|----------------------------|
| 1 | `benefit-maxing/index.html` | `<a href="/">Home</a> / <span>Benefit Maxing</span>` |
| 2 | `benefit-maxing/smart-timing-protocol/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Smart Timing Protocol</span>` |
| 3 | `benefit-maxing/guides/implants/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Dental Implants</span>` |
| 4 | `benefit-maxing/guides/crowns/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Dental Crowns</span>` |
| 5 | `benefit-maxing/guides/root-canals/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Root Canals</span>` |
| 6 | `benefit-maxing/guides/fillings/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Fillings</span>` |
| 7 | `benefit-maxing/guides/dentures/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Dentures</span>` |
| 8 | `benefit-maxing/guides/bridges/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Dental Bridges</span>` |
| 9 | `benefit-maxing/guides/braces-invisalign/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Braces and Invisalign</span>` |
| 10 | `benefit-maxing/guides/whitening/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Teeth Whitening</span>` |
| 11 | `benefit-maxing/guides/extractions/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Tooth Extractions</span>` |
| 12 | `benefit-maxing/guides/deep-cleaning/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Deep Cleaning</span>` |
| 13 | `benefit-maxing/guides/dental-emergencies/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <span>Dental Emergencies</span>` |
| 14 | `benefit-maxing/guides/dental-emergencies/cracked-tooth/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Cracked Tooth</span>` |
| 15 | `benefit-maxing/guides/dental-emergencies/tooth-abscess/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Tooth Abscess</span>` |
| 16 | `benefit-maxing/guides/dental-emergencies/knocked-out-tooth/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Knocked-Out Tooth</span>` |
| 17 | `benefit-maxing/guides/dental-emergencies/severe-toothache/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Severe Toothache</span>` |
| 18 | `benefit-maxing/guides/dental-emergencies/lost-filling-or-crown/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Lost Filling or Crown</span>` |
| 19 | `benefit-maxing/guides/dental-emergencies/dental-pain-relief/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Dental Pain Relief</span>` |
| 20 | `benefit-maxing/guides/dental-emergencies/dental-anxiety/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Dental Anxiety</span>` |
| 21 | `benefit-maxing/guides/dental-emergencies/emergency-dental-exam/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Emergency Dental Exam</span>` |
| 22 | `benefit-maxing/guides/dental-emergencies/emergency-dental-cost/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Emergency Dental Cost</span>` |
| 23 | `benefit-maxing/guides/dental-emergencies/emergency-dental-insurance/index.html` | `<a href="/">Home</a> / <a href="/benefit-maxing/">Benefit Maxing</a> / <a href="/benefit-maxing/guides/dental-emergencies/">Dental Emergencies</a> / <span>Emergency Dental Insurance</span>` |

---

## BLOCK D -- Sub-nav script

**Where it goes:** Insert this `<script>` block immediately **before** the component-loader
`<script>` block (the one that fetches `/components/mega-nav.html`).

It is idempotent: the `window.__bmTocInit` guard prevents double-execution if the script
is accidentally included twice.

**Note on fly-out ID:** The fly-out is `ddDeltaFly` (matching compare exactly). Do NOT use
`ddBmDeltaFly`. Same for all other IDs -- they stay as compare's original names.

```html
<script>
/* BM CHROME: sub-nav dropdowns + progress bar + Gold/Jade theme toggle
   Idempotent: guarded by window.__bmTocInit */
(function(){
  if(window.__bmTocInit)return;
  window.__bmTocInit=true;

  /* ---- progress bar ---- */
  var prog=document.getElementById('tocProg');
  if(prog){
    window.addEventListener('scroll',function(){
      var h=document.documentElement.scrollHeight-window.innerHeight;
      prog.style.width=(h>0?(window.scrollY/h*100):0)+'%';
    },{passive:true});
  }

  /* ---- TOC dropdowns ---- */
  var dds=[].slice.call(document.querySelectorAll('.toc-dd'));
  if(dds.length){
    function closeAll(except){
      dds.forEach(function(d){
        if(d!==except){
          var b=d.querySelector('.toc-dd-btn'),p=d.querySelector('.toc-dd-panel');
          if(b)b.setAttribute('aria-expanded','false');
          if(p)p.removeAttribute('data-open');
        }
      });
    }
    var T=null;
    dds.forEach(function(d){
      var btn=d.querySelector('.toc-dd-btn'),panel=d.querySelector('.toc-dd-panel');
      if(!btn||!panel)return;
      function openDD(){clearTimeout(T);closeAll(d);btn.setAttribute('aria-expanded','true');panel.setAttribute('data-open','');}
      function closeDD(){btn.setAttribute('aria-expanded','false');panel.removeAttribute('data-open');}
      btn.addEventListener('click',function(e){e.stopPropagation();btn.getAttribute('aria-expanded')==='true'?closeDD():openDD();});
      if(matchMedia('(hover:hover)').matches){
        d.addEventListener('mouseenter',function(){clearTimeout(T);openDD();});
        d.addEventListener('mouseleave',function(){clearTimeout(T);T=setTimeout(closeDD,450);});
      }
    });
    document.addEventListener('click',function(e){if(!e.target.closest('.toc-dd'))closeAll(null);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll(null);});

    /* Delta fly-out (inside Plans dropdown) */
    var fly=document.getElementById('ddDeltaFly');
    if(fly){
      var fb=fly.querySelector('.dd-fly-btn'),fp=fly.querySelector('.dd-fly-panel'),FT=null;
      function fclose(){fb.setAttribute('aria-expanded','false');fp.removeAttribute('data-open');}
      function fopen(){clearTimeout(FT);fb.setAttribute('aria-expanded','true');fp.setAttribute('data-open','');}
      fb.addEventListener('click',function(e){e.stopPropagation();fb.getAttribute('aria-expanded')==='true'?fclose():fopen();});
      if(matchMedia('(hover:hover)').matches){
        fly.addEventListener('mouseenter',function(){clearTimeout(FT);fopen();});
        fly.addEventListener('mouseleave',function(){clearTimeout(FT);FT=setTimeout(fclose,450);});
      }
    }
  }

  /* ---- Gold/Jade theme toggle ---- */
  var ccHtml=document.documentElement,ccTs=document.getElementById('cc-ts');
  function applyTheme(t,slow){
    var dur=slow?'1.4s':'0.45s';
    var st=document.getElementById('cc-bm-theme-transition');
    if(!st){st=document.createElement('style');st.id='cc-bm-theme-transition';document.head.appendChild(st);}
    st.textContent='html,html *{transition:background '+dur+' ease,color '+dur+' ease,border-color '+dur+' ease,box-shadow '+dur+' ease !important}';
    ccHtml.setAttribute('data-theme',t);
    if(ccTs){ccTs.setAttribute('data-active',t);ccTs.setAttribute('aria-checked',t==='jade'?'true':'false');}
    setTimeout(function(){if(st)st.textContent='';},slow?1600:600);
  }
  if(ccTs){
    ccTs.setAttribute('data-active','gold');
    ccTs.setAttribute('aria-checked','false');
    ccTs.addEventListener('click',function(){
      applyTheme(ccHtml.getAttribute('data-theme')==='gold'?'jade':'gold',false);
    });
    ccTs.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();ccTs.click();}
    });
    window.addEventListener('load',function(){
      setTimeout(function(){applyTheme('jade',true);},1000);
    });
  }
})();
</script>
```

---

## 5. IMPLEMENTATION INSTRUCTIONS (per page)

Apply these edits in order for each of the 23 files:

1. **`<html>` tag:** Add `data-theme="gold"` if not already present.

2. **`<style>` in `<head>`:** Append the full CSS from BLOCK B at the very end of the existing
   `<style>` block. Do not create a new `<style>` tag -- append inside the existing one.

3. **After `<div id="cc-nav-mount"></div>`:** Insert BLOCK A (the `.toc` sub-nav) verbatim.

4. **After the `.toc` block:** Insert BLOCK C (the `.crumb` breadcrumb) using the per-page
   trail from the table above.
   - Remove the old breadcrumb at the same time:
     - `.bm-crumbs` nav on `benefit-maxing/index.html`
     - `.cr-crumbs` nav on all guide pages
     - Whatever breadcrumb nav exists on `benefit-maxing/smart-timing-protocol/index.html`

5. **Keep `<nav class="cc-journey">` in place.** It goes after `.crumb` and before `<main>`.
   Do not remove it.

6. **Before the component-loader script:** Insert BLOCK D (the JS block).

7. **Do NOT touch:**
   - `<div id="cc-nav-mount"></div>` itself
   - `<div id="cc-footer-mount"></div>`
   - The component-loader script (only insert BLOCK D before it, not inside it)
   - Schema JSON-LD blocks
   - Any existing body CSS, Fraunces typography, or `.bm-*` / `.cr-*` styles

**Resulting element order after `<div id="cc-nav-mount"></div>` (top to bottom):**
1. `<div class="toc">` (BLOCK A -- sticky sub-nav)
2. `<div class="crumb">` (BLOCK C -- breadcrumb)
3. `<nav class="cc-journey">` (existing workflow stepper -- kept as-is)
4. `<main>` content begins

---

## 6. DIFF SUMMARY -- WHAT CHANGES VS WHAT STAYS

| Element | Action |
|---------|--------|
| Fraunces hero typography | Untouched |
| `.bm-*` body CSS | Untouched |
| `.cr-*` body CSS | Untouched |
| `.cc-journey` workflow stepper | Kept, positioned after `.crumb` |
| Existing `.bm-crumbs` / `.cr-crumbs` | Removed, replaced by unified `.crumb` |
| `<div id="cc-nav-mount">` | Kept; `.toc` inserted immediately after |
| `<div id="cc-footer-mount">` | Untouched |
| `:root` token values on `--gold`, `--ink`, `--ink-soft`, `--line` | Untouched; chrome uses `--cc-*` aliases |
| Component loader script | Untouched; JS block inserted before it |
| Schema JSON-LD | Untouched |

---

## 7. TOKEN COLLISION VERDICT (summary)

Five token names collide (same name, different value) between the compare chrome and the
benefit-maxing body: `--gold`, `--ink`, `--ink-soft`, `--line`, and implicitly `--paper`.
All five are resolved by the `--cc-*` aliasing strategy in BLOCK B. The chrome CSS never
references the bare colliding names. The body CSS never references `--cc-*`. Zero bleedthrough
in either direction.

Eight further tokens exist on the compare page but not on benefit-maxing pages
(`--green`, `--green-d`, `--green-l`, `--sage`, `--muted`, `--line-2`, `--card`, `--toch`,
`--sans`, `--shadow`). All are added as `--cc-*` aliases or as the literal `--toch` and `--sans`
assignments which are safe to add (benefit-maxing pages do not declare these names).

---

## 8. SUB-NAV IDENTITY VERIFICATION

The sub-nav in BLOCK A is identical to `compare-ppo-dental-plans.html` and
`/dental-insurance/ppo-plans/index.html` on these points:

| Point | BLOCK A | compare-ppo-dental-plans.html |
|-------|---------|-------------------------------|
| Dropdown count | 6 | 6 |
| Labels | Compare, Plans, Explore, By Treatment, By Situation, Insurance Terms | Same |
| Plans carriers | UHC, Aetna, Ameritas, Guardian, Mutual of Omaha, Humana, MetLife + Delta fly-out | Same |
| Delta fly-out links | PPO Premium, Is Delta good?, Over 65, UC students | Same |
| Insurance Terms links | 10 glossary terms + "All terms A to Z" | Same |
| Element IDs | ddCompareWrap/Btn/ddCompare, ddPlansWrap/Btn/ddPlans, ddDeltaFly/ddDelta, ddExploreWrap/Btn/ddExplore, ddTreatWrap/Btn/ddTreat, ddSitWrap/Btn/ddSit, ddGlossWrap/Btn/ddGloss | Same |
| Inner wrapper class | `class="wrap"` | `class="wrap"` |
| Compare dropdown hrefs | Absolute `/compare-ppo-dental-plans` paths | Local `#` anchors (page-local only) |

The only intentional difference from compare's own markup: the Compare dropdown uses absolute
paths (`/compare-ppo-dental-plans`, `/compare-ppo-dental-plans#tier-essentials`, etc.) instead
of page-local `#` anchors, matching exactly what `/dental-insurance/ppo-plans/index.html` does.
This is correct for cross-site consistency from any URL depth.
