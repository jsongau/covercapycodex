# U5 — Delta Dental Hub: End-to-End User Journey Maps

> Agent U5 (UX). Three audiences mapped from entry on the **PPO Premium gateway**
> → explore the hub → land on the right sub-hub → dentist finder / verify → enrol handoff.
> Canonical journey (per `04-SYNTHESIS-AND-DECISIONS.md`):
> **need → timing → budget → plan → tradeoffs → verify → dentist → [ENROL]**.
> Color = T5 jade (`teal-night #082A30`, `teal-700 #14525B` links, `mint #5BE0A0`).
> Body text must differ from CTA. Builds on U1's IA map. Sources: the 5 live Delta
> pages + `find-my-dentist.html`.

---

## Summary (~150 words)

Three buyers enter on **Premium** (the gateway), the page most arrivals land on. From
there each diverges: the **general buyer** stays on Premium, runs the find→verify→nominate
tool deck, then is handed off; the **senior** must self-route to **Over-65/SCAN** (Premium
under-surfaces it — a real drop-off risk); the **UC student** routes to **UC-Students/UC
SHIP** with a Leaflet campus map and campus leaves. All three converge on the same
**find-a-dentist + verify** mechanism and hit the **same wall**: the journey dead-ends at
"verify / nominate." The only forward path is an **offsite "Enroll on Delta Dental" link**
(deltadentalins.com) on Premium — there is **no on-site enrol/checkout step**, so coverage
selection, predetermination, and "see a dentist tomorrow" never close on CoverCapy. The
gateway also fails to surface Over-65 and UC-Students laterally, forcing audience
self-identification through the hub grid. Fixing the missing enrol step and gateway
audience-surfacing is the highest-leverage work.

Legend: `◆` decision point · `⚠` drop-off risk · `[CTA]` primary call-to-action · `‹module›` UI component used · `❌ GAP` missing step.

---

## Journey Map 1 — General Buyer ("Is Delta good, and can I use my dentist?")

```
ENTRY: Premium gateway  /delta-dental/premium/
  ‹hero + benefits table› → answers "most complete coverage Delta sells"
  [CTA: "Find a dentist"]  ·  secondary [CTA: "Compare vs other plans"]
        │
        ▼
◆ Q1 NEED/TIMING — "When does each benefit start?"
  ‹waiting-period showcase (#waiting)›  ·  ‹benefits tab›
        │  unsure if Delta is right →┐
        ▼                            ▼
   stays on Premium            EXPLORE: Compare  /delta-dental/compare/
                               ‹card-tap selector pick() — Delta locked baseline vs 5›
                               ◆ Q2 TRADEOFFS — "Delta vs your pick"
                               [CTA: "Get covered" / "Lock in your dentist"]
                               ⚠ Compare has NO breadcrumb / no self-locate (U1 §6)
                                     │ returns to gateway
        ▼◀───────────────────────────┘
◆ Q3 BUDGET — ‹cost estimator tab (#cost, costProc/costYou/costFull)›
  illustrative cost-per-procedure  [CTA stays: "Find a dentist"]
        │
        ▼
DENTIST: Find-a-dentist  ‹Premium #dentists tab› → deep-links find-my-dentist.html
  ‹search/finder + dentist cards›
  [CTA: "Verify my dentist" / "Verify PPO"]
        │
        ▼
◆ Q4 VERIFY — ‹verify modal #m-verify: carrier tiles → contact → member-id badge → send›
  member ID never stored · POSTs /api/verify-ppo (Phase B)
  ‹nominate engine (#nominate)› if dentist not listed
  [CTA: "Confirm nomination & verify"]
        │
        ▼  ✅ "we'll verify & notify you"  ← SUCCESS STATE of current journey
        │
   ❌ GAP — NO on-site ENROL / CHECKOUT step
        │   only forward path:
        ▼
OFFSITE: [CTA: "Enroll in this plan on Delta Dental"]
  → www1.deltadentalins.com (utm: delta-premium-enroll), target=_blank
  ⚠ buyer leaves CoverCapy un-converted; "see a dentist tomorrow" promise unclosed
```
**Drop-off risks:** (1) verify "success" feels like an end-state, not a step → buyer
stalls; (2) the only enrol is an external Delta link — equity + conversion leak; (3)
Compare can't self-locate so a buyer who detours there may not return.

---

## Journey Map 2 — Senior (Over-65 / SCAN)

```
ENTRY: Premium gateway  /delta-dental/premium/
  ‹hero› speaks to individual buyers, NOT seniors
  ⚠ Premium does NOT surface Over-65 in body or sub-nav (U1 §6.5) — senior must
    self-route via hub grid or a Compare cross-link
        │
        ▼
◆ Q1 "Am I on SCAN?"  — senior must discover the SCAN path
  route A: hub explore-grid card "Delta for seniors"
  route B: Compare → ‹callout "On Medicare? You may already have Delta — through SCAN"›
           [CTA: "See the SCAN Delta benefit"]
        │
        ▼
SUB-HUB: Over-65  /delta-dental/over-65/
  ‹explainer "How the SCAN Delta Dental benefit works"›
  ◆ Q2 PLAN — ‹DeltaCare USA (HMO) vs optional PPO buy-up comparison›
        │
        ▼
DENTIST: ‹local #find "Find a Delta dentist for your SCAN plan"›
  [CTA: "Find your Delta dentist"]  → find-my-dentist.html / Premium #dentists
        │
        ▼
◆ Q3 VERIFY/BOOK — concierge framing
  [CTA: "Have us find & book one" → premium/#nominate]
  ‹nominate engine› = "have CoverCapy find and book one for you"
  ⚠ Over-65 sub-nav (Set B-ish) omits Find-a-Dentist parity (U1 §6.2)
        │
        ▼  ✅ "we'll find & book" handoff
        │
   ❌ GAP — NO enrol step for the PPO buy-up; no SCAN-eligibility confirmation flow
        │   fallback: ‹"Not on SCAN, or want your own coverage?"› →
        ▼
   Premium gateway (individual PPO) → re-enters Map 1's same dead-end
```
**Drop-off risks:** (1) gateway never signals "seniors → here," so SCAN-eligible
arrivals bounce before finding their hub; (2) the HMO-vs-PPO-buy-up decision has no
guided enrol — concierge "we book" handoff has no eligibility/checkout close; (3)
lateral nav can't reach the dentist finder from Over-65.

---

## Journey Map 3 — UC Student (UC SHIP)

```
ENTRY: Premium gateway  /delta-dental/premium/
  ⚠ Premium does NOT surface UC-Students in body or sub-nav (U1 §6.1 — orphaned)
    student must route via hub grid card "UC SHIP dental"
        │
        ▼
SUB-HUB: UC-Students  /delta-dental/uc-students/  "Your UC student dental is [covered]"
  ‹explainer "From enrolled to in the appointment"›
        │
        ▼
◆ Q1 WHICH CAMPUS — ‹Leaflet campus map + campus <select> run()›  ·  ?uc={slug} deep-link
  [CTA: "Map dentists near my UC"]
        │
        ├──▶ ‹campus leaf  /students/{campus}/  ×10 (ucla…merced)›
        │     ⚠ leaves linked from hub + uc-students only → orphan risk (U1 §6.3)
        ▼
DENTIST: ‹"Delta dentists near your UC campus" finder›  → find-my-dentist.html
  [CTA: "Verify PPO"]
        │
        ▼
◆ Q2 VERIFY — ‹verify/nominate modal openM()›
  [CTA: "Verify PPO" / "Nominate a dentist"]
        │
        ▼  ✅ verify handoff
        │
   ❌ GAP — students already enrolled via UC SHIP, so no purchase; BUT post-grad
        │   continuity has no enrol step
        ▼
POST-GRAD: ‹Related "More on Delta Dental"›
  [CTA: "Delta Dental PPO Individual Premium Plan"] → Premium → re-enters Map 1 dead-end
```
**Drop-off risks:** (1) gateway orphans UC-Students from sub-nav — students can't reach
their hub laterally; (2) campus leaves may strand users with no breadcrumb back; (3)
post-grad "keep your coverage" funnel ends at the same missing enrol step.

---

## The shared wall (all three audiences)

```
… → VERIFY (find-my-dentist #m-verify / Premium #nominate) → ✅ "we verify & notify"
                                                                       │
                                                          ❌ MISSING ENROL STEP
                                                                       │
                                              only exit: offsite Delta "Enroll" link
```
Per `04-SYNTHESIS-AND-DECISIONS.md` (Agent 07): the live journey **"dead-ends at verify —
no buy step."** The single on-ramp forward is an **external** `deltadentalins.com` enroll
link on Premium. There is no CoverCapy-side: plan selection confirm, predetermination,
total-cost Y1/Y2 view, or saved/returnable cart. This is the conversion cliff for every
persona.

---

## CTA-by-stage matrix

| Stage | General buyer | Senior (SCAN) | UC student |
|---|---|---|---|
| Entry (Premium) | Find a dentist | *(should be: "Over 65? Start here")* | *(should be: "UC student? Start here")* |
| Explore | Compare vs other plans | See the SCAN Delta benefit | Map dentists near my UC |
| Budget/Plan | cost estimator tab | HMO vs PPO buy-up | (covered by UC SHIP) |
| Dentist | Find a dentist (#dentists) | Find your Delta dentist | Verify PPO |
| Verify | Verify my dentist / Confirm nomination | Have us find & book one | Verify PPO / Nominate |
| **Enrol** | ❌ → offsite "Enroll on Delta Dental" | ❌ (no SCAN buy-up enrol) | ❌ (no post-grad enrol) |

---

## Top 3 recommendations

1. **Build the on-site enrol/checkout step — the journey's missing close.** Insert a
   CoverCapy enrol stage after verify for all three personas: plan-confirm + total-cost
   Y1/Y2 + predetermination flag, then the Delta handoff as the *final* step, not the
   *only* step. This is the highest-leverage fix (Agents 07/11) — today every persona
   dead-ends at verify and leaks to an external link un-converted.
2. **Make the gateway self-segment the three audiences.** Premium under-surfaces Over-65
   and orphans UC-Students (U1 §6.1/6.5). Add an "Is this you?" rail (Senior on SCAN ·
   UC student · Individual) on Premium + the unified ≤8-label sub-nav including
   `Over 65` and `UC Students`, so seniors/students don't bounce before reaching their hub.
3. **Unify the verify→nominate→book handoff and instrument it as a step, not an
   end-state.** Give the verify success screen a forward CTA ("Next: choose & enrol") and
   make Compare + campus leaves self-locating (breadcrumb + schema, U1 §6.3/6.4) so
   detouring users return rather than drop.
```
