# Health-Tech Design System Spec — Hub Restyle (Hub20 / Agent 01)

Source of truth (read in full):
- `docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html` — carrier/plan page, `<style>` lines 26-378
- `docs/ppo-redesign/_zip-21jun/ppo/index.html` — PPO hub page, `<style>` lines 26-318

GOAL: port the ZIP "HEALTH-TECH VISUAL SYSTEM (v5)" (Inter, single-teal, card-first, coverage-state colors) onto the LIVE hub, replacing the editorial Fraunces/jade luxury tokens. Premiums are FROZEN — this is visual-only. No em-dashes added to copy.

Both ZIP files declare the SAME header comment (humana lines 27-32, index lines 27-32): "Replaces editorial/luxury (Fraunces serif, brass/vellum) with a clinical, card-first, single-teal-accent system. Inter only." The `:root` block is byte-identical between the two files (humana 33-50, index 33-50), so the token set below is canonical for both.

---

## 1. FULL CSS TOKEN SET (`:root`) — copy-pasteable

From `index.html` lines 33-50 (identical in `humana-extend-5000.html` 33-50):

```css
:root{
  --bg:#F6F8FA; --surface:#FFFFFF; --surface-2:#F1F5F8; --surface-3:#E9EFF3;
  --ink:#0F1B25; --ink-2:#33444F; --ink-3:#5E707B; --ink-faint:#94A4AE;
  --line:#DCE4EA; --line-soft:#EAEFF3;
  --teal:#0E8C8B; --teal-strong:#0A6E6D; --teal-ink:#075453; --teal-tint:#E2F4F3; --teal-deep:#0B3B40;
  --covered:#0F9D6E; --covered-ink:#0A5D43; --covered-tint:#E4F6EE;
  --partial:#B26A00; --partial-ink:#7A4A00; --partial-tint:#FBEFD9;
  --notcov:#64748B; --notcov-ink:#475569; --notcov-tint:#EEF1F4;
  --info:#1E6FD9; --info-tint:#E5EFFC; --warning:#C2410C; --warning-tint:#FCEBE2;
  --danger:#C1352B; --danger-tint:#FBE9E7;
  --max:1160px; --rail:336px;
  --r-xs:6px; --r-sm:10px; --r-md:14px; --r-lg:18px; --r-pill:999px;
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px; --sp-6:32px; --sp-7:48px;
  --sh-1:0 1px 2px rgba(15,27,37,.05),0 1px 1px rgba(15,27,37,.04);
  --sh-2:0 4px 12px -4px rgba(15,27,37,.10);
  --sh-3:0 -8px 28px -10px rgba(15,27,37,.18);
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
}
```

Token groups:
- Surfaces (4): `--bg` page, `--surface` cards, `--surface-2`/`--surface-3` insets.
- Ink (4): `--ink` headings, `--ink-2` body, `--ink-3` secondary, `--ink-faint` labels.
- Lines (2): `--line` card borders, `--line-soft` internal dividers.
- Teal accent (5): `--teal` fills, `--teal-strong` link/hover, `--teal-ink` overlines, `--teal-tint` selected wash, `--teal-deep` dark chrome (alert/topbar dark/footer/sticky).
- Coverage states (3 sets of 3): `--covered*` green, `--partial*` amber, `--notcov*` slate. Plus `--info*` blue used as an "is-review" coverage state.
- Status: `--warning*` orange, `--danger*` red.
- Layout: `--max:1160px`, `--rail:336px`.
- Radii: `--r-xs:6 / --r-sm:10 / --r-md:14 / --r-lg:18 / --r-pill:999`.
- Spacing: `--sp-1..7` = 4/8/12/16/24/32/48.
- Shadows: `--sh-1` resting card, `--sh-2` hover lift, `--sh-3` sticky bar upward.
- Font: Inter only (loaded via `<link>` humana/index line 25, weights 400;500;600;700).

### Gold/Jade theme toggle (token override)
From `index.html` line 52 (identical humana line 52). `<html data-theme="jade">` is the default (`:root` above = Jade). `[data-theme="gold"]` overrides surfaces/ink/line and remaps `--teal*` to brass:

```css
[data-theme="gold"]{ --bg:#FBF7EF; --surface:#FFFCF6; --surface-2:#F6EFE2; --surface-3:#F0E7D5; --ink:#231B12; --ink-2:#4C4234; --ink-3:#857966; --ink-faint:#A89B85; --line:#E6DBC7; --line-soft:#EFE7D7; --teal:#B0894E; --teal-strong:#876632; --teal-ink:#7A5B2A; --teal-tint:#F3EAD6; --teal-deep:#0A2E33; }
html.theme-switching, html.theme-switching *{transition:background-color .4s ease,color .4s ease,border-color .4s ease!important}
```

NOTE: "Gold" here is a brass token remap inside the SAME Inter health-tech system — it is NOT the legacy Fraunces luxury skin. Do not confuse the two. The toggle markup is `.theme-switch`/`.ts-slider`/`.ts-label` (index 99-104).

---

## 2. BASE / RESET / TYPOGRAPHY (copy-pasteable)

From `index.html` 54-66 (identical humana 54-66):

```css
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}html,body{overflow-x:clip}
body{background:var(--bg);color:var(--ink-2);font-family:var(--font);font-size:16px;line-height:1.6;
  -webkit-font-smoothing:antialiased;font-feature-settings:"cv05","ss01";padding-bottom:84px}
a{color:var(--teal-strong);text-decoration:none}a:hover{text-decoration:underline;text-underline-offset:2px}
h1,h2,h3{color:var(--ink);letter-spacing:-.02em;line-height:1.18}
h1{font-size:clamp(28px,4vw,40px);font-weight:700}
h2{font-size:clamp(21px,2.5vw,26px);font-weight:700}
h3{font-size:16px;font-weight:600}
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px}
.tnum{font-variant-numeric:tabular-nums}
:focus-visible{outline:2px solid var(--teal);outline-offset:2px;border-radius:4px}
.eyebrow{font-size:11.5px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--teal-ink);margin-bottom:9px}
```

Key facts: all headings are Inter (NO serif), weight 700/600, tight tracking `-.02em`. `body` reserves `padding-bottom:84px` for the sticky bar. `.eyebrow` is the teal overline that replaces Fraunces italic accents.

---

## 3. `.card` SYSTEM

From `index.html` 68-70 (identical humana 68-70):

```css
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-1)}
.card-hover{transition:box-shadow .15s,border-color .15s,transform .15s}
.card-hover:hover{box-shadow:var(--sh-2);border-color:var(--teal);transform:translateY(-1px)}
```

Flat, single resting shadow, 14px radius, hover lifts 1px and borders go teal. NO gradients, NO glass.

---

## 4. `.btn` VARIANTS

From `index.html` 73-79 (identical humana 73-79):

```css
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-size:14.5px;font-weight:600;
  cursor:pointer;border:none;border-radius:var(--r-sm);padding:0 20px;min-height:48px;transition:.15s;text-decoration:none}
.btn svg{width:17px;height:17px;flex-shrink:0}
.btn-pri{background:var(--teal);color:#fff}.btn-pri:hover{background:var(--teal-strong);text-decoration:none}
.btn-out{background:var(--surface);color:var(--teal-strong);border:1px solid var(--line)}
.btn-out:hover{border-color:var(--teal);background:var(--teal-tint);text-decoration:none}
.btn-dark{background:var(--teal-deep);color:#fff}.btn-dark:hover{background:#0d474d;text-decoration:none}
```

Three variants: `.btn-pri` (teal fill, main CTA), `.btn-out` (white/outline), `.btn-dark` (deep-teal, used on the hub ZIP submit, index line 353). 48px min-height touch target.

---

## 5. `.chip` VARIANTS

From `index.html` 82-87 (identical humana 82-87):

```css
.chip{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:5px 11px;border-radius:var(--r-pill);border:1px solid}
.chip svg{width:13px;height:13px}
.chip.brand{background:var(--teal-tint);color:var(--teal-ink);border-color:#BEE6E4}
.chip.neutral{background:var(--surface-2);color:var(--ink-3);border-color:var(--line)}
.chip.info{background:var(--info-tint);color:#1551A8;border-color:#C5DCF7}
.chip.warn{background:var(--warning-tint);color:var(--warning);border-color:#F3CDB9}
```

Pill chips, 4 variants: `brand` (teal), `neutral` (grey), `info` (blue), `warn` (amber). Border colors are hard-coded tints (`#BEE6E4`, `#C5DCF7`, `#F3CDB9`) not tokens — port them verbatim.

---

## 6. COVERAGE-STATE STYLING (the system's centerpiece)

The hub uses a SHARED `.cov-cell` block (index 129-135) PLUS a `.pc-strip .ps-dot` variant inside plan cards (index 240-245). The humana page has `.cov-cell` only (humana 168-172, no `is-review`).

```css
/* index.html 129-135 — shared coverage cell */
.cov-cell{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;padding:4px 11px;border-radius:var(--r-pill)}
.cov-cell svg{width:13px;height:13px}
.cov-cell.is-covered{background:var(--covered-tint);color:var(--covered-ink)}
.cov-cell.is-partial{background:var(--partial-tint);color:var(--partial-ink)}
.cov-cell.is-none{background:var(--notcov-tint);color:var(--notcov-ink)}
.cov-cell.is-review{background:var(--info-tint);color:#1551A8}
```

State semantics (declared in index lead-in copy, line 386): green = covered in full, amber/partial = partial coinsurance, grey/none = not covered, blue/review = needs verification. Read by icon + color + text in under 3s (per header comment humana 31). In the matrix the cells show literal text like `50%`, `Not covered`, `80%` (index 422-426).

The plan-card mini "strip" reuses the same four states as 24px round dots:

```css
/* index.html 240-245 */
.pc-strip .ps-dot{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%}
.pc-strip .ps-dot svg{width:13px;height:13px}
.pc-strip .ps-dot.is-covered{background:var(--covered-tint);color:var(--covered-ink)}
.pc-strip .ps-dot.is-partial{background:var(--partial-tint);color:var(--partial-ink)}
.pc-strip .ps-dot.is-none{background:var(--notcov-tint);color:var(--notcov-ink)}
.pc-strip .ps-dot.is-review{background:var(--info-tint);color:#1551A8}
```

---

## 7. TOP CHROME — alert / topbar / crumb / review-bar

From `index.html` 90-115 (alert/topbar/crumb identical to humana 90-108; review-bar is hub-only):

```css
/* top chrome */
.alert{background:var(--teal-deep);color:#EAF6F5;text-align:center;padding:9px 16px;font-size:13.5px;position:sticky;top:0;z-index:200}
.alert a{color:#9BE0DC;font-weight:600;text-decoration:underline;text-underline-offset:2px}
.topbar{background:var(--surface);border-bottom:1px solid var(--line)}
.topbar .wrap{display:flex;align-items:center;gap:10px;height:60px}
.topbar .mk{width:30px;height:30px;border-radius:8px;background:var(--teal);display:grid;place-items:center;color:#fff}
.topbar b{font-size:18px;font-weight:700;color:var(--ink)}
.topbar .nav{margin-left:auto;display:flex;gap:22px;align-items:center}
.topbar .nav a{font-size:14px;color:var(--ink-2);font-weight:500}.topbar .nav a:hover{color:var(--teal-strong)}
/* theme toggle (gold to jade) */
.theme-switch{position:relative;display:inline-flex;align-items:center;background:rgba(0,0,0,.08);border-radius:20px;padding:2px;cursor:pointer;user-select:none;flex-shrink:0}
.ts-slider{position:absolute;top:2px;left:2px;width:calc(50% - 2px);height:calc(100% - 4px);background:var(--teal);border-radius:18px;box-shadow:0 1px 3px rgba(0,0,0,.18);transition:transform .35s cubic-bezier(.4,0,.2,1)}
.theme-switch[data-active="jade"] .ts-slider{transform:translateX(100%)}
.ts-label{position:relative;z-index:1;padding:4px 13px;font-size:11px;font-weight:600;letter-spacing:.04em;min-width:34px;text-align:center;transition:color .35s;color:var(--ink-3)}
.theme-switch[data-active="gold"] .ts-gold{color:#fff}
.theme-switch[data-active="jade"] .ts-jade{color:#fff}
@media(max-width:680px){.topbar .nav>a{display:none}.topbar .nav{gap:0}}
.crumb{background:var(--surface);border-bottom:1px solid var(--line-soft);font-size:12.5px;color:var(--ink-3)}
.crumb .wrap{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:11px 24px}
.crumb a{color:var(--ink-3)}.crumb a:hover{color:var(--teal-strong)}.crumb .sep{color:var(--ink-faint)}.crumb b{color:var(--ink);font-weight:600}

/* review-bar — HUB ONLY (index 110-115) */
.review-bar{background:var(--surface-2);border-bottom:1px solid var(--line)}
.review-bar .wrap{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;padding:11px 24px;font-size:12.5px;color:var(--ink-3)}
.review-bar .rv{display:flex;align-items:center;gap:7px}
.review-bar .rv svg{width:14px;height:14px;color:var(--teal);flex-shrink:0}
.review-bar b{color:var(--ink);font-weight:600}.review-bar a{color:var(--teal-strong);font-weight:600}
```

Chrome stack order (markup index 322-345): `.alert` (deep-teal sticky bar) → `.topbar` (white, 60px, teal logo mark + Inter wordmark + nav + theme toggle) → `.crumb` (breadcrumb) → `.review-bar` ("Maintained by CoverCapy Plan Research desk").

---

## 8. HUB LAYOUT, MODULES, AND HUB-ONLY COMPONENTS

The hub is single-column with `.wrap` + `.module` rhythm (NO right rail — the rail at index `--rail:336px` is declared but the hub markup uses full-width `.module` sections; the rail/`.layout` grid lives only in the humana plan page, humana 111-112 & 322-344).

```css
/* index.html 154-174 — hub hero + module rhythm */
.hub-hd{background:linear-gradient(180deg,var(--surface),var(--bg));border-bottom:1px solid var(--line);padding:32px 0 34px}
.hub-hd .ph-indep{display:inline-flex;align-items:center;gap:8px;margin-bottom:14px;font-size:12px;font-weight:600;color:var(--teal-ink);background:var(--teal-tint);border:1px solid #BEE6E4;border-radius:var(--r-pill);padding:6px 13px}
.hub-hd h1{max-width:20ch}
.hub-hd .sub{font-size:16px;color:var(--ink-2);margin-top:13px;max-width:64ch;line-height:1.62}
.hub-zip{display:flex;gap:9px;margin-top:18px;max-width:440px}
.hub-zip input{flex:1;font-size:15px;font-family:inherit;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-radius:var(--r-sm);padding:0 14px;min-height:48px}
.hub-zip input:focus{outline:2px solid var(--teal);outline-offset:1px;border-color:var(--teal)}
.module{border-top:1px solid var(--line);padding:34px 0;scroll-margin-top:116px}
.module:first-child{border-top:none}
.module .lead-in{font-size:15px;color:var(--ink-3);margin-bottom:18px;max-width:72ch;line-height:1.62}
.prose p{font-size:15.5px;line-height:1.74;color:var(--ink-2);margin-bottom:13px}.prose b{color:var(--ink);font-weight:600}
```

NOTE on hero gradient: `.hub-hd` uses `linear-gradient(180deg,var(--surface),var(--bg))` (index 155). This is a subtle surface-to-bg gradient on the hero band only — it does NOT violate the "no gradients on CARDS" rule.

Hub-only major components (port these blocks verbatim from index.html):
- Comparison matrix `table.cmp` + `.cmp-tools` + `.cmp-scroll` (index 176-209): sticky thead (`top:60px`), sticky first column, sortable segmented control, `.best-tok` "Best price" pill (`--covered-tint`).
- Carrier index `.carrier-grid`/`.carrier-card` (index 211-218): 2-col grid of carrier cards.
- Plan-card library `.plancard` + `.pc-strip`/`.ps-dot` + `.conf` confidence pills (index 220-251).
- Nav grids `.nav-grid`/`.nav-card`, `.relrow` chip links (index 253-266).
- Method/transparency `.method`/`.method-card`/`.disclaimer` (index 268-279).
- FAQ `details.faq` (index 281-290).
- Sticky bar `.sticky` (index 293-300), footer (index 302-307).

---

## 9. CONFLICTS WITH THE LIVE PAGE'S CURRENT FRAUNCES/JADE TOKENS

The live hub today uses the CLAUDE.md luxury token set (Fraunces serif headings, jade/cream/brass). Direct conflicts to resolve when porting:

1. FONT — live uses `'Fraunces', serif` for headlines + `'Inter Tight'` for body. ZIP system is Inter-only (no serif, no Inter Tight). The `<link>` must change to Inter weights 400;500;600;700 (index line 25). REMOVE all Fraunces declarations and italic-practice-name styling. This is the single biggest visual change.

2. COLOR TOKEN NAMES COLLIDE BUT MEAN DIFFERENT THINGS — live tokens are `--teal-night:#082A30`, `--teal-700:#14525B`, `--teal-300:#5E8C92`, `--mint:#5BE0A0`, `--cream-card:#FFFDF8`, `--cream:#F6F0E6`, `--gold-soft:#F3E8CF`, `--ink:#082A30`, `--ink-soft:#56655F`, `--ink-faint:#8A958F`, `--body:#3A4A42`, `--line:#E8E2D8`. The ZIP redefines `--ink`, `--ink-faint`, and `--line` with DIFFERENT values (`--ink:#0F1B25` vs `#082A30`; `--line:#DCE4EA` vs `#E8E2D8`). Any live CSS still referencing the old meaning of these three names will shift. Audit live rules using `--ink`, `--ink-faint`, `--line` before swapping the `:root`.

3. NO MINT ACCENT — the ZIP system has no `--mint`. The live mint accent (button text on dark) is replaced by white `#fff` on `--teal`/`--teal-deep`. Anything keyed to `--mint`/`--mint-soft` must be remapped to `--teal`/`--teal-tint`.

4. BACKGROUND PALETTE FLIP — live is warm cream (`--cream #F6F0E6`, `--cream-card #FFFDF8`); ZIP is cool clinical grey-white (`--bg #F6F8FA`, `--surface #FFFFFF`). Cream surfaces must become white/grey surfaces.

5. NO GOLD-SOFT WARNING TINT — live `--gold-soft #F3E8CF` (Delta Dental note) maps to ZIP `--warning-tint #FCEBE2` / `--partial-tint #FBEFD9` depending on intent.

6. THEME TOGGLE SEMANTICS — both call a control "Gold/Jade", but ZIP "Gold" is a brass token remap WITHIN the Inter system (index 52), not the legacy Fraunces luxury skin. If the live page wires a real luxury theme to that toggle, the wiring/markup must be replaced with the ZIP `.theme-switch` block (index 99-104) and `[data-theme="gold"]` override (index 52).

7. NEW COVERAGE-STATE TOKENS DID NOT EXIST IN LIVE — `--covered/--partial/--notcov` (+ ink/tint variants) and `--info` are net-new. They are the heart of the health-tech read; add them wholesale. No live equivalent to migrate.

8. SHADOW/RADIUS/SPACING SCALES ARE NEW NAMED TOKENS — `--sh-1..3`, `--r-xs..pill`, `--sp-1..7`. If live used inline/ad-hoc shadows and radii, standardize onto these.

PORT STRATEGY: replace the entire live `<style>` `:root` + base/typography/card/btn/chip/coverage/chrome blocks with sections 1-7 above verbatim, swap the font `<link>`, then layer the hub-only modules from section 8. Keep all premium NUMBERS in markup untouched.
