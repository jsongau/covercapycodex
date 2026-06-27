# TY05 — Chips, Labels, Eyebrows, Pills

Audit + spec for `compare-ppo-dental-plans.html`. Health-tech tokens only. No em-dashes.

---

## 1. What exists today (grounded in real lines)

### Eyebrow (lines 73-75)
```css
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--sans);font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--green)}
.eyebrow::before{content:"";width:34px;height:1px;background:var(--green-l)}
.eyebrow .sp{color:var(--gold)}
```
Markup (line 884 etc.): `<span class="eyebrow"><span class="sp">&#10038;</span> The PPO dental plan hub &middot; 2026</span>`.
`&#10038;` is the six-petal florette glyph (✶), tinted gold via `.sp`. Used ~13 times across hero, section heads, rail, footer.

### Chips (lines 209-211) — sort toggles only
```css
.chip{border:1px solid var(--line-2);background:var(--card);border-radius:999px;padding:8px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:.12s}
.chip:hover{border-color:var(--green)}
.chip.sel{background:var(--green);color:#F4EFE2;border-color:var(--green)}
```
Used at lines 943-948 as the Featured / Best value / Most coverage sort row. There is no semantic chip variant set (no brand/neutral/info/warn) like the ZIP file has.

### Tags (lines 541-545, 382) — JS-injected plan badges
```css
.badges{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}
.tag{font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px}
.tag-sell{background:var(--sage);color:var(--green-d)}
.tag-vision{background:#ECE6F2;color:#6A5396}
.tag-review{background:var(--paper-2);color:var(--muted)}
.tag-age{background:var(--paper-2);color:var(--muted);border:1px solid var(--line-2)}
```
Injected at lines 1418, 1426 (Best selling, +Vision, Ages X & under, Effectiveness under review).

### Recommended label (line 218) — the closest thing to a ribbon today
```css
.cmp-plan .sc{align-self:flex-start;font-family:var(--serif);font-size:14px;background:var(--sage);color:var(--green-d);border-radius:7px;padding:2px 9px;margin-bottom:9px}
```
Injected line 1517 as "CoverCapy Recommended" with an info `&#9432;` glyph. It is a flat inline pill, not a corner ribbon, and it carries no visual hierarchy lift over a plain tag.

### Gaps
- No plan-shape pill (Preventive / Basic / Major-Full). "Preventive/Basic/Major" appear only as table column headers (line 955), never as a reusable coverage-shape chip.
- No coverage-state chips, even though the coverage triad tokens already exist (lines 52-55: `--covered`, `--partial`, `--notcov` plus tint/ink each).
- No semantic chip family. The ZIP reference has a clean four-variant set worth porting.

---

## 2. ZIP reference (humana-extend-5000.html, lines 82-87)
```css
.chip{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:5px 11px;border-radius:var(--r-pill);border:1px solid}
.chip svg{width:13px;height:13px}
.chip.brand{background:var(--teal-tint);color:var(--teal-ink);border-color:#BEE6E4}
.chip.neutral{background:var(--surface-2);color:var(--ink-3);border-color:var(--line)}
.chip.info{background:var(--info-tint);color:#1551A8;border-color:#C5DCF7}
.chip.warn{background:var(--warning-tint);color:var(--warning);border-color:#F3CDB9}
```
This is the model: a static informational chip (variant by class), distinct from the compare page's interactive sort `.chip`. The two collide on the class name `.chip`, so the new static family should namespace under `.ichip` (info-chip) to avoid breaking the sort toggles.

---

## 3. The ✶ glyph: health-insurance or editorial?

It reads **editorial**, not health-insurance. The six-petal florette is a decorative dingbat from the luxury/serif system (the same era as Fraunces brass/vellum the ZIP explicitly retired, line 28-31). Gold tint reinforces an editorial-luxury cue, which fights the "clinical, single-teal-accent" health-tech direction.

**Recommendation:** drop the gold florette. Replace the `.sp` glyph with a short teal tick rule, which is already half-built (the `::before` 34px line). Either:
- remove `.sp` entirely and keep only the `::before` tick (cleanest), or
- swap the florette for a 6x6 teal dot for a clinical marker.
Keep the uppercase tracked-out eyebrow text as-is. It is correct health-tech.

---

## 4. Copy-pasteable CSS block

Drop this into the `<style>` block after the existing chip rules (after line 211). It does not touch the interactive sort `.chip`, the eyebrow text, or the JS-injected `.tag` set, beyond retiring the glyph.

```css
/* ── TY05: eyebrow tick (retire gold florette) ── */
.eyebrow .sp{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--green);font-size:0;line-height:0}
/* If keeping the leading rule only, delete .sp from markup and this rule. */

/* ── TY05: static info chips (ZIP family, namespaced to avoid sort-chip clash) ── */
.ichip{display:inline-flex;align-items:center;gap:5px;font-family:var(--sans);font-size:12px;font-weight:600;line-height:1;padding:5px 11px;border-radius:999px;border:1px solid}
.ichip svg{width:13px;height:13px}
.ichip.brand{background:var(--sage);color:var(--green-d);border-color:var(--sage-2)}
.ichip.neutral{background:var(--paper-2);color:var(--muted);border-color:var(--line)}
.ichip.info{background:#E5EFFC;color:#1551A8;border-color:#C5DCF7}
.ichip.warn{background:#FCEBE2;color:var(--rust);border-color:#F3CDB9}

/* ── TY05: plan-shape pill (Preventive / Basic / Major-Full) ── */
.shape-pill{display:inline-flex;align-items:center;gap:6px;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:4px 10px;border-radius:999px;border:1px solid}
.shape-pill::before{content:"";width:7px;height:7px;border-radius:50%}
.shape-pill.preventive{background:var(--covered-tint);color:var(--covered-ink);border-color:var(--covered-tint)}
.shape-pill.preventive::before{background:var(--covered)}
.shape-pill.basic{background:var(--partial-tint);color:var(--partial-ink);border-color:var(--partial-tint)}
.shape-pill.basic::before{background:var(--partial)}
.shape-pill.major{background:var(--notcov-tint);color:var(--notcov-ink);border-color:var(--notcov-tint)}
.shape-pill.major::before{background:var(--notcov)}

/* ── TY05: coverage chips (read the triad by icon + color + text) ── */
.cov-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--sans);font-size:12px;font-weight:600;padding:5px 11px;border-radius:999px;border:1px solid}
.cov-chip.covered{background:var(--covered-tint);color:var(--covered-ink);border-color:var(--covered-tint)}
.cov-chip.partial{background:var(--partial-tint);color:var(--partial-ink);border-color:var(--partial-tint)}
.cov-chip.notcov{background:var(--notcov-tint);color:var(--notcov-ink);border-color:var(--notcov-tint)}

/* ── TY05: recommended ribbon (replaces the flat .sc inline pill) ── */
.rec-ribbon{position:absolute;top:0;right:0;display:inline-flex;align-items:center;gap:5px;
  font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  color:#F4EFE2;background:var(--green);padding:5px 12px;border-bottom-left-radius:12px;
  box-shadow:var(--shadow);z-index:2}
.rec-ribbon svg{width:12px;height:12px}
/* parent card needs position:relative;overflow:hidden for the corner anchor */
```

---

## 5. Where each is used

| Component | Markup | Location in page |
|-----------|--------|------------------|
| Eyebrow tick | retire `.sp` glyph, keep `.eyebrow` text | all ~13 eyebrows (lines 884, 924, 977, 992, 1018, 1028, 1040, 1065, 1078, 1136, 1160, 1185) |
| `.ichip` brand/neutral/info/warn | `<span class="ichip info">No-wait preventive</span>` | rail plan cards, feature-grid cells, by-situation cards. Replaces ad-hoc `.tag-*` where the badge is informational not promotional |
| `.shape-pill preventive/basic/major` | `<span class="shape-pill preventive">Preventive 100%</span>` | each plan row/card to summarize the coverage shape at a glance, and as a legend above the compare table (line 955 header region) |
| `.cov-chip covered/partial/notcov` | `<span class="cov-chip covered">Covered</span>` | inside expanded plan detail and treatment-by-procedure section (lines 1018-1028) to render the triad as chips |
| `.rec-ribbon` | `<span class="rec-ribbon">CoverCapy Recommended</span>` on a `position:relative` card | replaces line 1517 inline `.sc` for live/featured plans; keep the `&#9432;` methodology tooltip adjacent in body, not in the ribbon |

### Migration notes
- `.shape-pill` and `.cov-chip` reuse the existing triad tokens (lines 52-55), so they carry the health-insurance signal already approved in the design system.
- Keep the interactive sort row on `.chip` untouched. New static chips use `.ichip` to prevent the `:hover{border-color}` / `cursor:pointer` sort behavior from leaking onto labels.
- The `.sc` recommended pill uses `var(--serif)` (line 218). The ribbon switches to `var(--sans)` uppercase for a clinical, non-editorial read consistent with retiring the florette.
