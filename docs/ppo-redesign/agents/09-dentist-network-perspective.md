# Agent 08/09 — Dentist & Network-Operations Perspective

> CoverCapy PPO redesign · Written as dentist, office manager, insurance verification specialist, treatment coordinator.
> Lens: the founder fears the redesign reads "too basic / worse than current." This memo names what the live `find-my-dentist.html` and `compare-ppo-dental-plans.html` already do well on the dentist/verification/network axis that must NOT be lost, and what must be ADDED to make the network layer credible to both patients and offices.
> Score: **6.5 / 10** (current state of the network/verification layer).

---

## 0. Evidence inspected

- `plan-data/*.md` — the authoritative network names per carrier (source of truth).
- `compare-ppo-dental-plans.html` — embedded `PLANS` JSON (lines ~1137–1144), the for-dentists CTA card (~1655–1659), the dentist search section (`#dentists`).
- `find-my-dentist.html` — the 3-step Verify PPO modal (`#m-verify`, ~2160–2312), tier badges (`Verified PPO`, `Public Directory`, `Pending Profile Claim`, `Capy Accredited`, `Platinum Elite`), the `la-accepted` "Accepts" chip, the nominate-an-office flow (~2392).
- `docs/ppo-redesign/_redesign-package/presentation-specs/05-component-and-content-checklist.md` — approved microcopy (`Find dentists in this network`, `Verify my exact plan free`).
- `05-APPROVED-DESIGN-SYSTEM.md` — verification = ONE quiet line, never per-cell badges.

---

## 1. CANONICAL NETWORK NAMES (the single most important deliverable of this agent)

This is where the current build is **factually wrong and must be corrected before launch.** The `compare-ppo-dental-plans.html` `PLANS` object invents `network` values that do not match the authoritative `plan-data/*.md` briefs. A dentist or office manager reading "Guardian PPO" or "Mutual of Omaha PPO (TruAssure)" on the hub, then "DentalGuard Preferred" / "DenteMax Plus" in the brief, immediately distrusts the whole site — these are the names they credential against and look up on the carrier portal.

| Carrier | Exact plan/tier | **Authoritative network name (plan-data, use this)** | Wrong value currently in compare-page JSON |
|---|---|---|---|
| Delta Dental | PPO (Premium tier) | **Delta Dental PPO** (+ Delta Dental Premier as a separate, broader-access tier) | "Delta Dental PPO" ✓ (acceptable, but must name Premier separately) |
| UnitedHealthcare | Primary Dental / DentalWise | **National Options PPO 30** | ✗ "UnitedHealthcare Dental PPO" |
| Aetna | Dental Direct Preferred PPO | **Aetna Dental PPO** (a.k.a. Aetna PDN / Dental PPO) | "Aetna Dental PPO" ✓ |
| Ameritas | PrimeStar Care Complete | **Ameritas Classic PPO** ("Classic (PPO) network") | ✗ "Ameritas PrimeStar Network" |
| Guardian | Premier 2.0 | **DentalGuard Preferred (DGP)** | ✗ "Guardian PPO" |
| Mutual of Omaha | Dental Preferred | **DenteMax Plus** (a.k.a. Dental Health Alliance / DHA) | ✗ "Mutual of Omaha PPO (TruAssure)" — *invented; not in the brief* |
| Humana | Extend 5000 | **Humana Dental nationwide network** (Humana Extend PPO) | "Humana Extend PPO" ≈ (acceptable; align wording) |
| MetLife | NCD Complete | **MetLife PDP Plus** | "MetLife PDP Plus" ✓ |

**Rule for the redesign:** the carrier-brand network name is a *fact* and must come from the canonical plan-data object, never be authored a second time in a template (no-data-drift rule). Render it on: the plan card network row, the comparison "Network" row, the plan-detail spec sheet, and the carrier-hub "Network" anchor. **CRITICAL DISTINCTION the redesign must teach:** the *network* (DentalGuard Preferred, National Options PPO 30, DenteMax Plus) is what a dentist participates in — it is **not** the same as the carrier brand or the marketed plan name. A patient verifies against the *network*, not "Guardian."

---

## 2. "Carrier" vs "product network" — the education gap to ADD

Patients and even office staff conflate three things. The redesign should make this explicit in one small, reusable explainer (glossary tooltip + carrier-hub "Network" section):

1. **Carrier / brand** — Guardian, MetLife, Mutual of Omaha. The company that sells the policy.
2. **Product / plan tier** — Premier 2.0, NCD Complete, Dental Preferred. What the patient buys.
3. **Provider network** — DentalGuard Preferred, PDP Plus, DenteMax Plus. The contracted dentist roster the plan reimburses at the in-network rate.

Two real consequences worth a sentence each on carrier hubs:
- **Leased / shared networks:** Mutual of Omaha's "Dental Preferred" actually pays through **DenteMax Plus / DHA** — a third-party rented network. A dentist may be "in DenteMax" without ever having heard of Mutual of Omaha. This is exactly why "does this office take my plan" cannot be answered by brand alone.
- **Delta's two-tier network:** Delta Dental **PPO** vs Delta Dental **Premier** reimburse at different allowed amounts. A dentist can be Premier-only (broader access, higher allowed amount, lower patient savings) and the patient assumes "in-network." This must be visible, not hidden behind "Delta Dental PPO."

---

## 3. "Accepts" vs truly "in-network" — the current site's biggest liability AND its biggest opportunity

### What's there now
- `find-my-dentist.html` uses the verb **"accepts"** throughout ("We'll confirm this office *accepts* it", the green `la-accepted` "Accepts" chip).
- Most directory records carry `insurance_networks: ["PPO verification pending"]` or `[]`, with copy "Confirm your specific PPO plan with the office before scheduling."
- Tier badges: `Verified PPO`, `Public Directory Listing`, `Pending Profile Claim`.

### Why this is a liability (verification-specialist view)
"**Accepts**" and "**in-network**" are not the same thing, and the FTC/state-DOI line between them matters:
- **Accepts / files / is out-of-network:** the office will *bill* your insurer but is **not contracted** — you are subject to **balance billing** up to the dentist's full fee; the plan reimburses against its **allowed amount (MAC or U&C)** only.
- **In-network / participating / contracted:** the dentist signed the carrier's fee schedule, **cannot balance-bill** above the allowed amount, and the patient gets the real savings.

The master prompt explicitly bans `"in-network" labels without exact network evidence`. The current green "Accepts" chip risks implying contracted status the site cannot prove. **This is the single highest-risk pattern to fix.**

### What to ADD — a verification state machine (do NOT lose, make rigorous)
Replace the binary "Accepts / pending" with an honest, evidence-backed status ladder, shown as ONE quiet line per office (consistent with the design system's "one governance line" rule), never a loud per-row badge:

| State | Meaning | UI label | Evidence required |
|---|---|---|---|
| `in_network_verified` | Office confirmed contracted in the named network, dated | **"In-network · {Network} · confirmed Jun 2026"** | Office reply or carrier portal check on file |
| `accepts_unverified` | Office bills the carrier but contract status unconfirmed | **"Files {Carrier} claims — network status unconfirmed"** | none / patient-reported |
| `verification_pending` | Request sent, awaiting office | **"We're confirming this for you"** | open verification_request |
| `out_of_network` | Bills but not contracted | **"Out-of-network — you may be balance-billed"** | confirmed OON |
| `unknown` | No data | **"Ask us to verify"** | — |

This is *more* sophisticated than the current site, directly answers the founder's "not too basic" fear, and is defensible. The verification modal already collects the carrier and emails the office — wire its reply back into this state, dated.

---

## 4. Reimbursement / allowed-amount context — the missing decision layer

The plan briefs already contain the gold the redesign must surface (and the live compare page largely hides in prose):
- **Allowed amount basis** differs by plan: MAC vs U&C / 90th-percentile. This decides how much a patient owes out-of-network. The canonical schema has `MAC/U&C basis` and `out-of-network reimbursement basis` fields — render them on the plan-detail "Fine print" table, not buried.
- **Year-1 reimbursement reality** is the network story patients actually feel: a $2,000 crown reimburses ~$400 at Ameritas/MoO (20%), ~$300 at UHC (15%), ~$200 at MetLife NCD (~10% — why it stays `gathering-reviews`), and $0 under Delta/Guardian's 12-month major wait. **This is the most decision-relevant network fact on the entire site** and must be a first-class, scannable row, with the "best in-network does NOT mean fully covered Day 1" caveat.
- The compare page's own copy is strong here ("in-network providers are bound to fee-schedule pricing", ADA fee-schedule glossary) — **keep that**, elevate it from glossary prose to a "What in-network actually saves you" explainer beside the network row.

---

## 5. The provider-side branch — keep it, don't let it hijack patient pages

### What's already good (preserve)
- `compare-ppo-dental-plans.html` has a **dedicated For-dentists CTA card** (`dcc-eye: "For dentists"`, `/for-dentists`, "Claim your free listing", "Compare tiers") sitting *inside the dentist grid* — correctly low-priority, not in the patient hero.
- `find-my-dentist.html` has a **"nominate an office"** flow ("we'll invite the office to join and confirm the PPO plans they accept") — a clean, non-intrusive provider-acquisition loop driven by patient demand.
- Tier system (`free` / `capy_accredited` / `platinum_elite`) and badges already exist and are restrained.

### What to ADD (a real provider cluster, per master prompt §Dentist/provider branches)
Build a separate `/for-dentists/` (or `/dental-insurance/ppo-plans/network/`) cluster — **not** linked from any patient primary CTA — covering:
1. How dentists join a PPO network (credentialing basics, fee-schedule signing).
2. Contracted fees & allowed amounts (MAC vs U&C) from the *office* P&L angle.
3. PPO participation tradeoffs (volume vs write-off).
4. How patients verify network status (so offices know what CoverCapy is telling patients).
5. **How a practice claims its CoverCapy profile.**
6. **The explicit disclaimer the master prompt requires:** *"Joining CoverCapy is not the same as joining a carrier PPO network. CoverCapy membership is a directory/marketing relationship; carrier participation is a separate contract with the insurer."* This sentence must appear verbatim near every "Claim your listing" CTA so the tiers (`capy_accredited`, `platinum_elite`) are never mistaken for "in-network" status.

### Guardrail
Provider CTAs stay in: the for-dentists cluster, the bottom of dentist directory grids, and footer. They **never** appear in: the Smart Match flow, the comparison matrix, the plan-detail spec sheet, or any patient hero. (Matches master-prompt CTA hierarchy: provider = lowest tier.)

---

## 6. What the CURRENT pages do well that MUST NOT be lost

1. **A real dentist-verification pathway that emails the office for the patient** — the 3-step Verify modal (carrier → contact → send) with encrypted member-ID handling and `member_id_provided: boolean` (never storing the ID). This is genuinely differentiated; most comparison sites stop at a quote handoff. Keep it as the bridge from "which plan" to "which dentist."
2. **The nominate-an-office demand loop** — patient-pulled provider acquisition. Rare and valuable.
3. **Tiered, honest directory states** (`Verified PPO` vs `Public Directory Listing` vs `Pending Profile Claim`) — already avoids over-claiming. Refine the wording (§3), don't delete the concept.
4. **Provider acquisition kept off the patient critical path** — the for-dentists card is correctly demoted.
5. **The independence disclosure** — "CoverCapy is paid by the dental offices in our network, not by which plan you choose." This is the ethical backbone of the network model and must stay prominent on hub + carrier hubs.
6. **ADA fee-schedule / in-network savings education in the glossary** — the conceptual foundation for everything in §4.

## 7. What must be ADDED

1. **Fix the network names** (§1) — highest priority, pure data correction, blocks launch.
2. **Verification state machine** (§3) replacing the binary "Accepts" chip with dated, evidence-backed states.
3. **Carrier vs network education** (§2) — one explainer, surfaced on carrier hubs + tooltip.
4. **Allowed-amount / Year-1-reimbursement row** (§4) as a first-class scannable fact.
5. **The `/for-dentists/` cluster** (§5) with the explicit "CoverCapy ≠ carrier network" disclaimer.
6. **A "Find dentists in this network" CTA** (approved microcopy already exists) on every plan card/detail, routing to `find-my-dentist` pre-filtered by the **network name**, not the carrier brand.

---

## 8. Risks / acceptance criteria

**Risks**
- Over-claiming "in-network" without evidence → FTC/state-DOI exposure and dentist distrust. (Mitigated by §3 state machine.)
- Data drift between hub JSON and plan-data network names → already present; must be killed by a single canonical source.
- Provider CTAs creeping into patient flow → erodes the "we're paid by offices, not by your plan choice" trust line.

**Acceptance criteria**
- [ ] Every surface renders the **plan-data** network name from one canonical object; build test fails on mismatch.
- [ ] No green "Accepts/in-network" state without a dated evidence record; default is the honest "files claims — status unconfirmed" / "ask us to verify."
- [ ] Carrier hubs name the network AND distinguish it from the brand (Delta PPO vs Premier; MoO via DenteMax).
- [ ] Year-1 reimbursement + allowed-amount basis are scannable rows, with the "in-network ≠ fully covered Day 1" caveat.
- [ ] Provider CTAs appear only in provider/low-priority contexts; the "CoverCapy ≠ carrier network" disclaimer sits beside every claim/membership CTA.
- [ ] Verify modal reply writes back into the dentist verification state, dated.

---

## 9. Score

**Network/verification layer: 6.5 / 10.**
Strong, differentiated bones (real verification handoff, nominate loop, honest tiers, demoted provider CTA, independence disclosure). Held back by **factually wrong network names**, an over-claiming "Accepts" chip that blurs accepts-vs-in-network, and reimbursement/allowed-amount facts buried in prose. Fix those three and this becomes the part of the site no competitor matches.
