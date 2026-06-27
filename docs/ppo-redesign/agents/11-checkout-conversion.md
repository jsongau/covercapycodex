# Agent 10 — Checkout & Conversion-Flow Specialist

**Scope:** Smart Match completion → compare selection → plan-detail → quote/enrollment handoff → save/email → dentist verification → account timing → abandonment recovery → CTA naming & hierarchy → off-site carrier transitions → affiliate/compensation disclosure.
**Sources read:** `compare-ppo-dental-plans.html` (live), `_redesign-package/` (ZIP plan-card + plan-detail specs), `05-APPROVED-DESIGN-SYSTEM.md`, `00-MASTER-PROMPT.md`.
**Lens:** founder fears the redesign lands "too basic / worse than current." This memo protects what the live flow already does well and names what must be added.

---

## 1. What the current conversion flow does WELL (must NOT be lost)

The live page is further along on conversion than a "basic" rebuild would be. Concretely:

1. **Smart Match completes without a gate.** `score()` → `renderVerdict()` returns **one top match + one honest backup**, each with a *reason tied to the input* (`whyFitted`) and an explicit caution (e.g. "about a 12-month wait", "coverage ends at age 64"). No email is required to see results. This is the master prompt's required behavior and it is already correct. Do not regress to a quiz that emails results.
2. **`valueFrame()` — the emotional-but-honest payoff.** It converts coverage % + annual max + premium into "Plan covers **$1,440** toward a typical crown. After a $900/yr premium, you keep **$540** vs paying cash." This is the single strongest conversion asset on the page and the ZIP has *no equivalent*. **Preserve it verbatim.** It is honest (uses real fee benchmarks, caps at annual max, shows the premium subtracted) and it answers the only question a shopper has: "is this worth it?"
3. **The enroll interstitial (`openEnrollInterstitial`).** A genuine micro-conversion step between "Activate" and the off-site carrier site: confirms the activation date, offers a confirmation email, and — critically — lets the user **skip** ("No thanks, continue to {carrier}"). This is a soft, non-coercive email capture at the highest-intent moment. The ZIP jumps straight off-site with "View full plan / Verify free" and loses this. **Keep the interstitial pattern.**
4. **Compare tray with honest empty slots.** `renderCompareMatrix()` caps at 3, offers a `<select>` to fill empty slots, and shows "CoverCapy Recommended" with an *inline methodology tooltip* ("No carrier pays for this placement"). Trust is baked into the comparison instrument itself.
5. **Dentist hand-off is wired everywhere.** Every card, fit-card, brief and matrix column carries "Find {carrier} dentists →" → `carrierHubUrl()` → `/find-my-dentist?carrier=`. The site's real monetization (paid by dental offices, per the disclosure on line 921) is correctly the *terminal* CTA, not the plan click. This is the right business model wiring and must survive.
6. **Disclosure is already truthful and visible** ("Independent · no paid placement · CoverCapy is paid by the dental offices in our network, not by which plan you choose"). This is the affiliate-disclosure requirement already satisfied. Keep it; surface it near every off-site handoff, not only in the editorial band.
7. **Gathering-reviews path (MetLife NCD).** Plans not verified get "Notify me when it's verified" instead of "Activate" — an honest deferral that still captures intent. Preserve.

**The risk if these are dropped:** the redesign would look more polished but convert worse, exactly the founder's fear. The ZIP is a stronger *shopping* surface; the live page is a stronger *acting* surface. The merge must keep the live page's act layer.

---

## 2. What must be ADDED / fixed

1. **"Activate" overstates reality — rename, do not delete.** The live CTA says **Activate**, but the handoff `enrollUrl()` mostly opens the *carrier's* enrollment site. "Activate" implies CoverCapy completes enrollment and implies same-day coverage, which is the master prompt's banned "misleading activation-today language." **Replace with "Check official pricing →" / "Continue to {carrier} →"** at the off-site boundary, and reserve activation-date language for the interstitial where it is qualified ("Coverage can start: {activation}").
2. **No Save / Email comparison.** The compare matrix has no persistence and no share. Add: **Save this comparison** (localStorage, per the design system's compare-tray contract) and **Email this comparison** (optional, low-priority secondary CTA). This is the master prompt's named secondary CTA and a primary abandonment-recovery lever — a shopper who can't decide today returns to a saved set instead of starting over.
3. **Compare tray is not persisted across sessions.** `compare` is an in-memory `Set` seeded with `['uhc']`. The approved design system requires a `localStorage`-persisted tray. Persist it; it doubles as silent abandonment recovery.
4. **Plan-detail click is collapsed into a modal.** Live "Plan brief" opens `openModal` (a JS-only modal). The ZIP and master prompt require **server-rendered individual plan pages** at `/dental-insurance/ppo-plans/{carrier}/{plan}/`. The hub card's primary CTA should be **"View full plan →"** (to the crawlable detail page), with the modal kept only as a fast-preview secondary. This fixes both SEO (server-rendered facts) and the conversion ladder (detail page is where enrollment intent is highest).
5. **Account creation has no defined moment.** There is no sign-up in the flow today. Recommended timing: **never before results, never as a gate.** Offer account creation only (a) optionally inside the enroll-confirmation interstitial ("save my plans + verification status"), and (b) at dentist-verification, where an account has real utility (tracking the verification request). Default unchecked. Never pre-check, never gate Smart Match or compare.
6. **Off-site transitions need an interstitial everywhere, not only on Activate.** Any link leaving to a carrier (`CARRIER_URLS`) should pass through the confirm-step that (a) restates the activation/effective wording with qualifiers, (b) restates the independence disclosure, (c) opens `target="_blank"`. This is the single highest-leverage trust + ethics control.
7. **Abandonment recovery beyond email.** Add: saved-comparison localStorage restore on return; a non-intrusive "Pick up where you left off" restore of the last Smart Match `state` (goal/time/budget) via URL or session, which the master prompt explicitly permits ("preserve choices in the URL or session state").
8. **`bestSelling` flags must go.** Two plans carry `bestSelling:true` (UHC, Guardian) rendering a "Best selling" tag — invented popularity, banned by both the design system ("kill the live page's two bestSelling flags") and the ethical rule. Replace with **at most one** evidence-based "Most fitting" ribbon driven by Smart Match, or remove entirely.

---

## 3. The primary conversion + exact CTA ladder

**Primary conversion (the one the business is paid for):**
> **Verified dentist hand-off** — a matched, in-network PPO dentist via `/find-my-dentist`. Plan selection is an *assisting* conversion, not the terminal one. (CoverCapy is paid by offices, not by plan choice — line 921.)

**Assisting conversions, in journey order:** Smart Match completed → plan compared → plan-detail viewed → comparison saved/emailed → quote/enroll handoff → dentist search → dentist verification → (optional) account created.

**The CTA ladder (one primary per surface, ghost secondary, provider quarantined):**

| Tier | Label | Action | Where |
|---|---|---|---|
| **Primary** | **Find my best-fit plan** | Run Smart Match | Hub hero |
| **Primary** | **View full plan →** | Server-rendered detail page | Plan card, fit-card, matrix column |
| **Primary** | **Compare selected plans** | Scroll to / open matrix | Tray, card |
| **Primary** | **Find in-network dentists →** | `/find-my-dentist?carrier=` | Detail page, matrix, hub bridge — *the money CTA* |
| **Primary** | **Verify my dentist & network — free** | Verification flow | Detail page, dentist bridge |
| **Secondary (ghost)** | View plan brief | Fast-preview modal | Card |
| **Secondary (ghost)** | Save this comparison | localStorage | Tray |
| **Secondary (ghost)** | Email this comparison | Optional email | Tray |
| **Secondary (ghost)** | Check official pricing → / Continue to {carrier} → | Interstitial → off-site (NOT "Activate") | Detail page, brief |
| **Secondary (ghost)** | Read the source documents | Source drawer | Detail page |
| **Provider (low-priority module only)** | How PPO networks work for dentists · Claim this office | Provider cluster | Footer / dedicated provider context only — never competes with patient task |

**Rule:** exactly one primary visual weight per viewport; the off-site carrier CTA is *secondary*, because the page's job is to send a confident shopper to a dentist, not to bounce them to a carrier.

---

## 4. Ethical guardrails (enforced)

- **No fake countdowns / no false scarcity** — none present today; keep it that way.
- **No "activation today" unless true** — rename "Activate" (§2.1); only the interstitial states a date, and only the qualified per-plan `activation` value.
- **No invented popularity** — remove `bestSelling` tags (§2.8).
- **No prechecked consent / dark-pattern defaults** — account + email opt-ins default OFF and skippable (the live "No thanks, continue" pattern is the model).
- **Member ID never stored** — verification captures `member_id_provided: boolean` only (per CLAUDE.md). Carries into any account-creation step.
- **Disclosure at every off-site boundary** — independence + "paid by offices, not by plan" restated in the interstitial, not buried.
- **"In-network" only with exact network evidence** — already uses exact `network` names; preserve.

---

## 5. Acceptance criteria

- [ ] Smart Match shows results with zero gating; top + backup each carry a reason and a caution.
- [ ] `valueFrame()` preserved on the top match.
- [ ] No "Activate" label at an off-site boundary; off-site links pass through a disclosure + qualified-date interstitial, `target="_blank"`.
- [ ] Compare tray persists via localStorage; Save + Email comparison present as secondaries.
- [ ] Hub card primary = "View full plan →" to a server-rendered detail URL; modal demoted to preview.
- [ ] Account creation never gates results or compare; opt-ins default off.
- [ ] `bestSelling` tags removed; ≤1 evidence-based "Most fitting" ribbon.
- [ ] Independence/compensation disclosure visible at every quote handoff.
- [ ] Dentist hand-off (`/find-my-dentist?carrier=`) reachable as a primary CTA from every plan surface.

---

## 6. Score: **6.5 / 10**

The live flow is genuinely strong where it counts — ungated Smart Match, the honest `valueFrame` payoff, the skippable enroll interstitial, and dentist hand-off wired throughout — so it is *not* basic and a careless rebuild would lose ground. It loses points for: the misleading "Activate" label at the off-site boundary, invented "Best selling" tags, no save/email/persistence, plan detail trapped in a JS-only modal, and undefined account timing. Fixing those is additive, not a teardown.

## Top 3 recommendations

1. **Rename "Activate" → "Check official pricing / Continue to {carrier}" and route every off-site link through the disclosure + qualified-date interstitial.** Highest-leverage ethics + trust fix; removes the banned "activation-today" implication without losing the interstitial's email capture.
2. **Preserve `valueFrame()` and the ungated one-match-plus-backup Smart Match exactly — port them into the ZIP structure.** These are the conversion assets the ZIP lacks and the reason the current page outperforms a "basic" rebuild.
3. **Add persisted compare tray + Save/Email comparison, demote the plan modal to a preview behind a server-rendered "View full plan →" detail page, and delete the `bestSelling` tags.** Closes the abandonment-recovery gap, fixes the SEO/handoff ladder, and removes the invented-popularity dark pattern in one pass.
