# TY03 — Dual Theme: GOLD ↔ JADE within the health-tech system

Spec only. No code shipped. All line numbers reference the live
`/Users/kytlegacy/covercapycodex ultimate 21JUN26/compare-ppo-dental-plans.html`.

---

## 1. Current state (grounded)

| Item | Line | What it is |
|---|---|---|
| `<html lang="en" data-theme="gold">` | 2 | Page boots with `data-theme="gold"` set |
| `:root{...}` | 32-61 | JADE health-tech palette: `--green:#0E8C8B`, clinical surfaces, coverage triad at 52-55 |
| `#cc-ts,.theme-tog{display:none!important}` | 102 | Toggle hard-hidden by CSS |
| `.theme-switch` + `.ts-thumb` + `.ts-opt` CSS | 801-835 | Full pill-toggle styling EXISTS but is orphaned — no matching element renders in the body |
| `[data-theme="maison"]{...}` | 713-735 | Dark candlelit luxury theme (out of scope, leave as-is) |
| `[data-theme="gold"]{...}` | 736-759 | Warm CREAM editorial palette (`--paper:#F6F0E6`, `--green:#B8924F`). This is luxury-cream, NOT clinical. Violates the health-tech mandate. |
| `applyTheme(t,slow)` | 1934-1942 | Works; flips `data-theme`, drives transition, syncs `cc-ts` `data-active`/`aria-checked` |
| `initTheme()` | 1943-1946 | Retired — hides `cc-ts`, no toggle wired |
| `initTheme()` call | 2174 | Still called at boot |

### Two problems to reconcile
1. The page boots `data-theme="gold"` (line 2), so the **active palette is the cream editorial `[data-theme="gold"]` block**, not the `:root` JADE health-tech set. The user's "new health-tech default" is in `:root` but is being overridden. Default must flip to JADE.
2. `[data-theme="gold"]` is luxury-cream-editorial (cream paper, brass-on-cream). The mandate wants GOLD to stay **clinical / health-insurance**, a warm brass alternate on light clinical surfaces, NOT cream.

### Contrast invariants (must hold in BOTH themes)
- **body text != link != CTA.** Body = `--ink`. Link/eyebrow accent = `--green-d` (a deep tone). CTA fill = `--green` (a brighter tone). Three distinct values.
- **Coverage triad intact:** green `--covered` / amber `--partial` / grey `--notcov`, each with tint + ink. This is the health-insurance signal and is theme-independent (stays at the `:root` values, NOT re-tinted per theme), so a covered/partial/not-covered row reads identically in both themes.

---

## 2. JADE token set (health-tech default) — replaces `:root` 32-61

Keep `:root` essentially as-is (it is already the correct health-tech jade). Only confirm the
triad lives here so it is inherited by both themes. body=`--ink #0F1B25`, link=`--green-d #0A6E6D`,
CTA=`--green #0E8C8B` are three distinct values. PASS.

```css
:root{
  --paper:#F6F8FA;        /* clinical off-white page */
  --paper-2:#EAEFF3;
  --card:#FFFFFF;
  --ink:#0F1B25;          /* BODY text */
  --ink-soft:#33444F;
  --green:#0E8C8B;        /* CTA fill (teal) */
  --green-d:#0A6E6D;      /* LINK / eyebrow / hover */
  --green-l:#5E707B;
  --sage:#E2F4F3;
  --sage-2:#D3EBEA;
  --muted:#5E707B;
  --line:#DCE4EA;
  --line-2:#C9D6DE;
  --gold:#B26A00;         /* sparing warm accent only */
  --rust:#C2410C;
  --panel:#0B3B40;        /* dark teal callout */
  --panel-ink:#EAF6F5;
  --panel-soft:#9FC4C2;
  --panel-eye:#6FD0CC;
  /* coverage triad — theme-independent health-insurance signal */
  --covered:#0F9D6E; --covered-tint:#E4F6EE; --covered-ink:#0A5D43;
  --partial:#B26A00; --partial-tint:#FBEFD9; --partial-ink:#7A4A00;
  --notcov:#64748B;  --notcov-tint:#EEF1F4;  --notcov-ink:#475569;
  --serif:'Inter Tight',system-ui,sans-serif;
  --sans:'Inter',system-ui,sans-serif;
  --shadow:0 1px 2px rgba(15,27,37,.05),0 4px 12px -4px rgba(15,27,37,.10);
  --radius:14px; --toch:52px;
}
```

Verdict: JADE is correct as the live `:root`. No change beyond making it the boot default (see §4).

---

## 3. GOLD token set (warm BRASS clinical alternate) — REPLACES `[data-theme="gold"]` 736-759

Reframes GOLD from luxury-cream-editorial to a **warm brass health-tech** skin: light clinical
surfaces (warm-tinted, not cream), brass as the saturated brand color, dark slate ink for body.
Same structural intent as `:root`, recolored to brass. Coverage triad is NOT redeclared, so it
inherits the `:root` triad unchanged.

Contrast check: body=`--ink #1C1A14` (warm slate), link=`--green-d #8A5A12` (deep brass),
CTA=`--green #B07B1E` (brighter brass). Three distinct values, link != CTA != body. PASS.

```css
/* ===== GOLD: warm brass clinical alternate (health-tech, not cream-editorial) ===== */
[data-theme="gold"]{
  --paper:#FAF7F1;        /* warm clinical off-white, NOT cream #F6F0E6 */
  --paper-2:#F0EBE0;
  --card:#FFFFFF;         /* keep cards crisp white = clinical, not #FFFDF8 */
  --ink:#1C1A14;          /* BODY text — warm slate */
  --ink-soft:#4A4334;
  --green:#B07B1E;        /* CTA fill — brighter brass */
  --green-d:#8A5A12;      /* LINK / eyebrow / hover — deep brass */
  --green-l:#7A6B52;
  --sage:#F4ECDB;         /* brass wash */
  --sage-2:#ECE0C8;
  --muted:#6E6353;
  --line:#E6DECE;
  --line-2:#D6CBB4;
  --gold:#B07B1E;         /* accent ties to brass brand */
  --rust:#B5502A;
  --panel:#2B2410;        /* deep brass-brown callout (parallels jade --panel) */
  --panel-ink:#FAF6EC;
  --panel-soft:#C9BD9C;
  --panel-eye:#E0BB60;
  /* coverage triad NOT redeclared — inherits :root so green/amber/grey signal is identical */
  --shadow:0 1px 2px rgba(28,26,20,.05),0 4px 12px -4px rgba(28,26,20,.12);
}
[data-theme="gold"] body{background:var(--paper)}
[data-theme="gold"] .btn-green{color:#FAF7F1}              /* light text on brass CTA */
[data-theme="gold"] .goal.sel,[data-theme="gold"] .tchip.sel{color:#FAF7F1}
[data-theme="gold"] input[type=range]{background:linear-gradient(90deg,var(--green) var(--pct,50%),#E0D8CC var(--pct,50%))}
[data-theme="gold"] input[type=range]::-webkit-slider-thumb{background:var(--green);border-color:var(--card)}
[data-theme="gold"] .omni-input:focus{border-color:var(--green);box-shadow:0 0 0 3px rgba(176,123,30,.15)}
[data-theme="gold"] .band .eyebrow{color:var(--green-d)}
[data-theme="gold"] .band .eyebrow::before{background:var(--green-d);opacity:.7}
[data-theme="gold"] .reward,[data-theme="gold"] .modal .diamond{background:var(--sage);color:var(--ink)}
[data-theme="gold"] .reward b,[data-theme="gold"] .modal .diamond b{color:var(--green-d)}
[data-theme="gold"] .mpanel.right{background:linear-gradient(180deg,#F7F0E2,var(--card))}
```

Note: the old block at 736-759 set `--ink:#082A30` (teal) and `--panel:#082A30` — those carried
teal into the "gold" theme and mixed the two brand colors. The replacement keeps GOLD self-consistent
in brass while body/link/CTA stay three distinct brass tones.

---

## 4. Minimal JS + markup to re-enable the toggle, default JADE

### 4a. Flip the boot default (line 2)
```html
<html lang="en" data-theme="jade">
```
There is currently no `[data-theme="jade"]` block, which is correct: `jade` is the `:root`
default and needs no override block. Setting `data-theme="jade"` simply means "use :root and
drive the toggle thumb to the jade position." Do NOT boot `gold`.

### 4b. Un-hide the toggle (line 102)
Remove `#cc-ts` from the hide rule (keep `.theme-tog` hidden — that is the old legacy toggle):
```css
.theme-tog{display:none!important}
```

### 4c. Add the live toggle element (the CSS at 801-835 already styles it; only the markup is missing)
Place inside `.mact` in the masthead:
```html
<button id="cc-ts" class="theme-switch" data-active="jade" role="switch"
        aria-checked="true" aria-label="Switch color theme" type="button">
  <span class="ts-thumb" aria-hidden="true"></span>
  <span class="ts-opt ts-gold"><span class="ts-dot"></span>Gold</span>
  <span class="ts-opt ts-jade"><span class="ts-dot"></span>Jade</span>
</button>
```

### 4d. Rewrite `initTheme()` (replace 1943-1946)
`applyTheme()` (1934-1942) already does all the work and already syncs `cc-ts`. Only `initTheme`
needs to stop hiding the switch and wire the click + restore the saved choice.
```javascript
function initTheme(){
  if(!ccTs) return;
  var saved = (function(){try{return localStorage.getItem('cc-theme');}catch(e){return null;}})();
  applyTheme(saved === 'gold' ? 'gold' : 'jade', false);   // default JADE
  ccTs.addEventListener('click', function(){
    var next = ccHtml.getAttribute('data-theme') === 'gold' ? 'jade' : 'gold';
    ccTs.classList.add('flipping');
    setTimeout(function(){ccTs.classList.remove('flipping');}, 1800);
    applyTheme(next, true);
    try{localStorage.setItem('cc-theme', next);}catch(e){}
  });
}
```
`initTheme()` is already called at line 2174 — no new call site needed.

---

## 5. Invariant verification table

| Theme | body `--ink` | link `--green-d` | CTA `--green` | body!=link!=CTA | triad |
|---|---|---|---|---|---|
| JADE | `#0F1B25` | `#0A6E6D` | `#0E8C8B` | PASS | inherited `:root` |
| GOLD | `#1C1A14` | `#8A5A12` | `#B07B1E` | PASS | inherited `:root` |

Both themes read as health-insurance: clinical light surfaces, white cards, the green/amber/grey
coverage triad unchanged. GOLD is warm brass, not cream-editorial.
