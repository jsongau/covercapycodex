# MASTER BUILD PROMPT — Delta Dental Premium Hub Refinement (Opus 4.8)

Paste this into a fresh Opus 4.8 session, attach `DELTA-HUB-REFINEMENT.md` and `CoverCapy_Writing_Style_Anti_AI_Rules.md`, and point it at the repo. It refines the EXISTING hub; it does not rebuild from zero.

---

## ROLE
You are a team working as one on a single deliverable: refining the Delta Dental Premium hub at `dental-insurance/ppo-plans/delta-dental/premium/index.html`. Stay inside this one file unless adding interlinks on the sibling plan page.

Assemble and use these specialists (think as each, then synthesize — do NOT have them write raw HTML separately; one final integrated file):
- **GEO/AI-SEO architect** — JSON-LD @graph, FAQ parity, answer-first blocks, speakable, interlink map, meta.
- **Dental insurance analyst** — every number matches the verified-facts table; no invented coverage; whitening labeled state-specific.
- **UX/interaction designer** — the signature waiting-period timeline, member-perks card grid, mobile cluster-nav, reduced-motion fallbacks. Preserve the existing serif + jade editorial style.
- **Conversion copywriter (anti-AI voice)** — concise, no filler ("in plain English," "made simple"), CTAs verb+object 2–5 words, perks framed as "savings, not insurance."
- **QA engineer** — runs the validation harness; blocks ship on any failure.

## NON-NEGOTIABLE CONSTRAINTS
1. **Keep the existing visual style.** Refinement, not reskin.
2. **Verified facts only** (from `DELTA-HUB-REFINEMENT.md` §1). Every price = ~$75. Basic wait 6mo; major/implants/ortho 12mo (waivable with prior coverage). Max $2,000 **calendar year**, resets Jan 1. Deductible $50/$150 calendar year. Ortho 50% / $1,500 lifetime / separate $50 deductible. Network 112,000+/278,000+ (do not inflate). Whitening = state-specific, never an unconditional promise.
3. **No gamification** (no Capy Crowns), no countdowns, no invented urgency, no dead `#` links.
4. **Universal nav + footer** stay (`#cc-nav-mount` / `#cc-footer-mount` + loader). Breadcrumb above the Delta cluster sub-nav.
5. **Anti-AI writing rules** binding: no arrows, no em-dash separators, never "chair," no banned words; estimates labeled; perks = "discount, not insurance"; medical content educational.

## WHAT TO BUILD (see refinement spec §2–4)
1. Lock verified facts; consistency-grep the whole file.
2. JSON-LD @graph: WebPage(lastReviewed/reviewedBy) + FAQPage (8 seed Qs, visible↔schema verbatim parity) + BreadcrumbList + speakable. Optional Product/Offer marked illustrative.
3. Five answer-first "extras" modules the plan page lacks:
   - **Member perks** (SmileWay 4 cleanings/yr at 100% for chronic conditions; LASIK/QualSight ~35% off; Amplifon hearing ~66% off; teledentistry; LifePerks) — card grid, "savings not insurance" footnote.
   - **Adult orthodontics** explainer (50%, $1,500 lifetime, $50 ortho deductible, 12-mo waivable wait, Invisalign = braces) → link braces guide.
   - **Network / find a PPO dentist** (PPO vs Premier; pay least in-network) → existing `#dentists` search + verify flow.
   - **Calendar-year + ~9-day activation** clarity module.
   - **Signature interaction:** waiting-period timeline (Day 1 preventive → 6mo basic → 12mo major/implants/ortho) with a "prior coverage waives the wait" toggle that collapses bars to Day 1. Reduced-motion = static labeled bars.
4. Interlinks: hub↔plan page (both directions), hub→compare, hub→over-65, hub→braces guide, hub→implants, hub→dental+vision, hub→emergency hub. Inline "see the full coverage breakdown" link to `/delta-dental/`.
5. Meta tuned to Delta Premium intent (title keeps ~$75 not $73).

## VALIDATION (QA must run before declaring done)
- JSON-LD: every `application/ld+json` block parses.
- JS: concatenate inline scripts, `node --check`, passes.
- FAQ parity: count of visible `<summary>`/Q blocks == schema `Question` count, text matches.
- `grep` shows: no `→`/`➜`/`—` (outside allowed classes), no banned marketing words, no `$73`/`$877`, no "Capy Crowns," no `6‑month wait on basic, major`, every wait correct, every price `~$75`.
- All internal links resolve to real files (`/delta-dental/`, `/compare/`, `/over-65/`, `/benefit-maxing/guides/braces-invisalign/`, `/best-dental-insurance-for-implants/`, `/dental-and-vision-insurance/`, `/benefit-maxing/guides/dental-emergencies/`).
- Page renders with universal nav at top, breadcrumb, then Delta cluster sub-nav, then content, then universal footer.

## DEFINITION OF DONE
One refined `premium/index.html` that keeps the style, fixes every factual inconsistency, adds the five extras + the signature timeline, carries full schema with FAQ parity, interlinks both directions with the plan page, and passes the full validation harness. Then summarize what changed and stop.
