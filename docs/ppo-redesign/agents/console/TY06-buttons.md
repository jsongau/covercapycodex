# TY06 — Button & CTA System (Console)

Scope: audit of buttons/CTAs in `compare-ppo-dental-plans.html`, compared to the ZIP reference
`docs/ppo-redesign/_zip-21jun/ppo/humana-extend-5000.html`. Analysis + spec only. No code shipped.

---

## 1. Current state (compare-ppo-dental-plans.html)

Grounded in real lines:

| Line | Selector | Definition |
|------|----------|------------|
| 82 | `.btn` | `inline-flex; gap:8px; font-weight:600; font-size:14px; radius:999px; padding:12px 22px; border:1px solid transparent; transition:.15s` |
| 83-84 | `.btn-green` | `background:var(--green); color:#F4EFE2`; hover `var(--green-d)` |
| 85-86 | `.btn-ghost` | `transparent; border-color:var(--line-2); color:var(--ink)`; hover swaps border + text to green |
| 87-88 | `.btn-ink` | `background:var(--ink); color:var(--paper)`; hover `filter:brightness(.92)` |
| 89 | `.btn-sm` | `padding:9px 16px; font-size:13px` |
| 124-125 | `.toc-cta` | sticky sub-menu pill: `background:var(--green); color:#fff; font-size:13px; padding:9px 16px`; hover `var(--green-d)` |
| 396-397 | `.btn-cta` | inverted card CTA: `background:#F4EFE2; color:var(--green-d); font-weight:700; width:100%` |
| 709-710 | `.modal-actions` | `display:flex; gap:10px; margin-top:18px`; children `.btn{flex:1}` |
| 421 | mobile `.fit-cta .btn` | `min-height:48px` (only here) |
| 432 | mobile `.pcard-cta .btn` | `min-height:46px` |

### Findings / gaps
1. **No base touch target.** `.btn` has only `padding:12px 22px` and no `min-height`. At 14px/600 line height the rendered height lands near 42-44px, but it is not guaranteed. `min-height` appears ONLY in two mobile media-query overrides (48px, 46px). Desktop buttons can fall below 44px.
2. **`.toc-cta` and `.btn-cta` are orphan one-offs** that re-declare green fill outside the `.btn` family. `.toc-cta` uses `color:#fff` where `.btn-green` uses `#F4EFE2` — two greens-on-green tokens diverge.
3. **No `:active` and no `:focus-visible` anywhere.** Keyboard and pressed states are undefined across every button.
4. **Color reservation is implied but not enforced.** Green is the primary CTA fill, yet `.btn-ghost:hover` recolors text to green and the design uses green for links elsewhere — the primary-action color leaks into non-CTA roles.
5. **Theme overrides exist** (lines 721/748/779) that only re-tint `.btn-green` text per theme — good, but the orphans (`.toc-cta`, `.btn-cta`) are not themed.

---

## 2. ZIP reference (humana-extend-5000.html)

Grounded in real lines:

| Line | Selector | Definition |
|------|----------|------------|
| 74 | base `.btn` | `cursor:pointer; border:none; border-radius:var(--r-sm); padding:0 20px; min-height:48px; text-decoration:none` |
| 76 | `.btn-pri` | `background:var(--teal); color:#fff`; hover `var(--teal-strong)` |
| 77-78 | `.btn-out` | `background:var(--surface); color:var(--teal-strong); border:1px solid var(--line)`; hover `border-color:var(--teal); background:var(--teal-tint)` |
| 79 | `.btn-dark` | `background:var(--teal-deep); color:#fff`; hover `#0d474d` |

Key differences vs. compare page:
- ZIP bakes **`min-height:48px` into the base** `.btn` — one source of truth, every button is touch-safe.
- ZIP uses **`padding:0 20px` + min-height** (vertical centering via min-height) rather than vertical padding — cleaner height control.
- ZIP secondary is a true **outline** (`.btn-out`) with surface fill, not a transparent ghost.
- Every hover pins `text-decoration:none` because ZIP buttons can be `<a>` tags.

---

## 3. Console button spec

Recommended naming for the console keeps the existing `.btn-*` family but adopts the ZIP discipline.

| Role | Class | Fill | Text | Use |
|------|-------|------|------|-----|
| Primary | `.btn-green` | teal/green | cream | the ONE main action per view (verify, get plan) |
| Secondary | `.btn-ghost` (→ outline) | surface | ink | secondary nav, dismiss, compare |
| Dark | `.btn-ink` | ink/deep | paper | dark-band CTAs, masthead |
| Small | `.btn-sm` | (modifier) | — | dense rows, card footers |

Rules:
- **Min touch target 48px** baked into base `.btn` (44px is the floor; 48px is the standard). Remove the per-media-query `min-height` overrides.
- **Every interactive button defines hover, active, and focus-visible.** Active darkens/insets; focus-visible draws a 2px ring offset from the button.
- **Primary CTA color is reserved.** The green/teal fill is for primary actions ONLY. Body text, links, and prose never use it as a fill; secondary buttons never use it as a fill. (Outline hover may tint, links use the link token, not the CTA token.)
- **Fold the orphans in:** `.toc-cta` becomes `.btn-green.btn-sm`; `.btn-cta` (inverted card CTA) becomes a documented `.btn-green--invert` modifier, not a standalone rule.
- **`text-decoration:none` on base + hover** so anchor-buttons stay clean.

---

## 4. Copy-pasteable CSS block

```css
/* ===== Console button system ===== */
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-family:var(--sans); font-weight:600; font-size:14px;
  border-radius:999px; padding:0 22px; min-height:48px;   /* 48px touch target, 44px floor */
  border:1px solid transparent; cursor:pointer; text-decoration:none;
  transition:background .15s, border-color .15s, color .15s, box-shadow .15s;
}
.btn:focus-visible{
  outline:none;
  box-shadow:0 0 0 2px var(--paper), 0 0 0 4px var(--green);
}
.btn-sm{ min-height:40px; padding:0 16px; font-size:13px; }

/* Primary — RESERVED color. Only the single main action per view. */
.btn-green{ background:var(--green); color:#F4EFE2; }
.btn-green:hover{ background:var(--green-d); text-decoration:none; }
.btn-green:active{ background:var(--green-d); filter:brightness(.94); }

/* Inverted primary (on dark/green bands) — replaces orphan .btn-cta */
.btn-green--invert{ background:#F4EFE2; color:var(--green-d); font-weight:700; border-color:transparent; }
.btn-green--invert:hover{ background:#fff; }

/* Secondary — outline. Never uses the reserved primary fill. */
.btn-ghost{ background:var(--paper); border-color:var(--line-2); color:var(--ink); }
.btn-ghost:hover{ border-color:var(--green); background:var(--mint-soft, #E6F7EE); color:var(--ink); text-decoration:none; }
.btn-ghost:active{ background:var(--line); }

/* Dark — for ink bands / masthead. */
.btn-ink{ background:var(--ink); color:var(--paper); }
.btn-ink:hover{ filter:brightness(.92); text-decoration:none; }
.btn-ink:active{ filter:brightness(.86); }

/* Sticky sub-menu CTA — was the orphan .toc-cta. Now just a sized primary. */
.toc-cta{ /* prefer markup: class="btn btn-green btn-sm" */ }

/* Modal actions row */
.modal-actions{ display:flex; gap:10px; margin-top:18px; }
.modal-actions .btn{ flex:1; }
```

Notes on the block:
- `min-height:48px` lives on `.btn` only; delete the line 421 / 432 mobile overrides once adopted.
- `--mint-soft` referenced for ghost hover; falls back to `#E6F7EE` if the token is absent on this page.
- No em-dashes, no gradients, primary color used as fill in exactly one rule (`.btn-green`) plus its inverted partner.
