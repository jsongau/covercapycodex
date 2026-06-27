# TY08 — Links & Interactive Affordances

Audit + spec for `compare-ppo-dental-plans.html`. Health-tech reskin. ANALYZE/SPEC only, no edits applied. No em-dashes.

---

## 1. Current state (grounded in real lines)

### Base reset
- **Line 70:** `a{color:inherit;text-decoration:none}` — every anchor inherits its parent text color and has no underline by default. This is the root problem: an inline link inside body prose is **indistinguishable from body text**. There is no global link treatment at all.
- **Line 64:** `body{... color:var(--ink) ...}` where `--ink:#0F1B25` (line 36). Body text is near-black.

### Token reality (light theme, lines 33-45)
- `--green:#0E8C8B` (line 38), `--green-d:#0A6E6D` (line 39) — these are BOTH the CTA fill family AND the current link color family.
- `--ink:#0F1B25`, `--ink-soft:#33444F`, `--muted:#5E707B`, `--line-2:#C9D6DE`, `--paper:#F6F8FA`.

### The CTA-fill collision (the user's repeated demand)
The buttons and primary CTAs fill with `--green` / `--green-d`:
- `.btn-green{background:var(--green)...}` (line 83-84)
- `.toc-cta` (line 124-125), `.omni-go` gradient (line 567), `.ft-mob-cta` (line 335), `.dcard-cta` gradient (line 388), `.btn-cta` (line 396).

The existing inline links use the **same** `--green` / `--green-d`:
- `.hub-trust a{color:var(--green)...}` (line 138-139)
- `.rec-empty a{color:var(--green-d)...}` (line 370)
- `.dc-claim a{color:var(--green)...}` (line 627)
- `.toc-links a` (nav-style, uses `--muted` -> `--ink` on hover, line 128-129)
- inline `<a href="#faq" style="color:var(--green)">` (line 1599)

**Problem:** link color == CTA fill color. A green text link reads as a flattened/ghost button, and against `--paper` there is no separation between "this is a clickable inline link" and "this is the big green Action." The user wants link, body text, and CTA fill all visually distinct from each other.

### Glossary tooltip term
- **Line 238:** `.cc-tip{cursor:help;border-bottom:1px dotted var(--green);color:inherit;transition:color .18s,border-color .18s;white-space:nowrap}`
- **Line 239:** `.cc-tip:hover{color:var(--green)}`
- Themed overrides: line 765 (gold), line 798 (jade) only swap the dotted border color.
- JS hover/click handlers at lines 2260-2262 drive the tooltip. The dotted underline is `--green` again, so it also collides with CTA fill.

### Focus-visible
- **There is NO `:focus-visible` rule anywhere** (confirmed: 0 matches). Only scattered component `:focus` rules that REMOVE the outline: `.cmp-empty .ce-sel:focus{outline:none...}` (line 235), `.he-zip input:focus{outline:none...}` (line 362), `.omni-input:focus{outline:none...}` (line 573), `input[type=range]{...outline:none}` (line 166). Keyboard users get no consistent visible focus ring; several inputs actively strip it. This is an a11y gap.

---

## 2. Spec — single, consistent treatment

### Design intent
Three distinct visual roles, none matching another:

| Role | Color | Treatment |
|------|-------|-----------|
| Body text | `--ink` / `--ink-soft` | none |
| Inline link | NEW `--link` (cool blue, distinct from green CTA and from ink) | underline, offset |
| CTA fill | `--green` / `--green-d` | solid button fill |

Introduce a dedicated link token so links never borrow the CTA green again. A cool clinical blue suits the health-tech palette and is unmistakably "link," not "button" (which stays green).

### New tokens (add to the `:root` token block near lines 33-45)
```css
  --link:#1668B8;        /* inline link — cool clinical blue, distinct from --green CTA and --ink body */
  --link-d:#0F4F8F;      /* link hover — deeper blue */
  --link-visited:#6E54B5;/* visited — muted violet, still clearly not body text */
  --focus-ring:#1668B8;  /* focus-visible ring, matches link blue */
```
Add matching overrides inside `[data-theme="gold"]` (near line 740) and `[data-theme="jade"]` (near line 771) so the link blue survives theme switches. Suggested:
```css
[data-theme="gold"]{ --link:#2E6FB0; --link-d:#1F5490; --link-visited:#7A5FB8; --focus-ring:#2E6FB0; }
[data-theme="jade"]{ --link:#1E8FD6; --link-d:#1570AC; --link-visited:#7560C0; --focus-ring:#1E8FD6; }
```

### Copy-pasteable CSS block
```css
/* ---- TY08: links & interactive affordances ---- */

/* Default text links (prose / inline). Overrides the bare a{color:inherit} on line 70. */
a{ color:inherit; text-decoration:none; }              /* keep for nav/card/button anchors */

/* Prose / content links get the real link treatment via an explicit class
   OR scope it to article body. Use .lnk for inline prose links. */
.lnk,
.hub-trust a,
.rec-empty a,
.dc-claim a{
  color:var(--link);
  text-decoration:underline;
  text-decoration-thickness:1px;
  text-underline-offset:2px;
  text-decoration-color:color-mix(in srgb, var(--link) 45%, transparent);
  border-bottom:0;                 /* drop the old --line-2 / --green underlines */
  transition:color .15s ease, text-decoration-color .15s ease;
}
.lnk:hover,
.hub-trust a:hover,
.rec-empty a:hover,
.dc-claim a:hover{
  color:var(--link-d);
  text-decoration-color:var(--link-d);   /* underline solidifies on hover */
}
.lnk:visited,
.hub-trust a:visited,
.rec-empty a:visited{
  color:var(--link-visited);
}

/* Nav-style links (.toc-links a) stay green-accented, NOT blue, since they are
   chrome, not prose. Leave lines 128-129 as-is; documented intentional exception. */

/* Glossary term — keep dotted underline, but use --link so it is distinct from
   green CTAs while still reading as "interactive". */
.cc-tip{
  cursor:help;
  color:inherit;                          /* term stays in body color until hover */
  border-bottom:1px dotted var(--link);
  transition:color .18s, border-color .18s;
  white-space:nowrap;
}
.cc-tip:hover,
.cc-tip:focus-visible{
  color:var(--link-d);
  border-bottom-color:var(--link-d);
}

/* Consistent focus-visible ring for ALL interactive elements.
   Replaces the scattered outline:none with an accessible, visible ring. */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible,
.cc-tip:focus-visible,
.goal:focus-visible,
.tchip:focus-visible,
.chip:focus-visible,
.he-chip:focus-visible,
.hw-chip:focus-visible{
  outline:2px solid var(--focus-ring);
  outline-offset:2px;
  border-radius:6px;                      /* soft ring on rectangular controls */
}

/* Inputs that currently kill the outline (lines 235, 362, 573, 166) should keep
   outline:none for :focus (mouse) but show the ring on :focus-visible. */
.ce-sel:focus-visible,
.he-zip input:focus-visible,
.omni-input:focus-visible,
input[type=range]:focus-visible{
  outline:2px solid var(--focus-ring);
  outline-offset:2px;
}
```

### Selectors to change (exact lines)
| Line | Selector | Change |
|------|----------|--------|
| 33-45 | `:root` token block | ADD `--link`, `--link-d`, `--link-visited`, `--focus-ring` |
| 70 | `a{color:inherit;text-decoration:none}` | KEEP as the bare default; add `.lnk` + prose-link rules above it |
| 138-139 | `.hub-trust a` / `:hover` | swap `--green` to `--link`; replace `border-bottom` with `text-decoration` |
| 370 | `.rec-empty a` | swap `--green-d` to `--link`; drop `border-bottom:1px solid var(--line-2)` |
| 627 | `.dc-claim a` | swap `--green` to `--link` |
| 1599 | inline `<a href="#faq" style="color:var(--green)">` | change inline style to `var(--link)` or add `class="lnk"` and drop inline color |
| 238-239 | `.cc-tip` / `:hover` | dotted border + hover -> `--link` / `--link-d`; add `:focus-visible` |
| 765, 798 | themed `.cc-tip` border-color | will inherit new themed `--link`; can delete or keep pointing at `--link` |
| 166, 235, 362, 573 | `outline:none` inputs | scope outline-removal to `:focus`, add `:focus-visible` ring |
| 128-129 | `.toc-links a` | LEAVE unchanged (nav chrome, intentional green accent) |

---

## 3. Notes / guardrails
- `.toc-links a`, `.hub-branches a`, `.dc-web`, `.fcol a`, `.reviewer-link`, `.he-link`, `.pl-trigger`, `.fq-act` are component/chrome links (nav, pill, footer, button-like). They keep green or their existing treatment by design; do NOT blanket-apply `.lnk`. Only PROSE inline links get blue.
- The base `a{color:inherit}` is deliberately preserved so the thousands of structural anchors (cards, nav, CTAs) are not accidentally underlined blue. Prose links opt in via `.lnk` or the three explicit prose selectors.
- All new colors are tokens, no inline hex in copy. No em-dashes used.
- Result: body text = `--ink`, inline link = blue `--link`, CTA fill = green `--green`. Three roles, three colors, zero collision.
