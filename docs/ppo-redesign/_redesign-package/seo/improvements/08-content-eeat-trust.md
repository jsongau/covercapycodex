# SEO Improvement 08 — Content Depth, Quality & E-E-A-T (PPO Plan Pages)

**Scope:** 8 featured PPO plan pages + the PPO hub
**Priority:** **P0** (data verification) · **P1** (author/methodology) · **Effort:** High · **Score:** 6.0/10 → target **9.0/10**

> This is a **YMYL (Your Money or Your Life)** insurance topic. It is the **single biggest lever on overall page quality** and the trust ceiling for everything else in this set.

---

## Current state & audit evidence

**Depth is good.** Pages run **~1,500–1,950 words** of genuinely differentiated, plan-specific analysis. There is a visible **"Reviewed by the CoverCapy Plan Research desk / Last reviewed {date}"** line, a **sources drawer**, and a **corrections link**. That scaffolding is the right shape.

**Trust is the gap.** Three defects cap the score:

1. **Unverified data.** The underlying figures are **shelf-snapshots flagged "needs verification"** — presented to readers as if confirmed, but not yet checked against current carrier documents.
2. **Two live data conflicts** surfaced in audit:
   - **Delta whitening** — our DB says *"not covered"*, but Delta's own plan page shows **~80%** coverage.
   - **Guardian tier** — our **50% / no-implants** baseline conflicts with a public **"Advantage Premier 2.0"** showing **60%** plus **implant/ortho lifetime caps**.
   These are exactly the high-stakes, money-affecting facts Google's raters scrutinize on YMYL pages.
3. **No author/reviewer E-E-A-T.** "Plan Research desk" is an unnamed entity — **no named reviewer, no credentials, no author bio, no `author`/`reviewer` schema.** There is also no **methodology** page and no **affiliate disclosure** ("how we make money").
4. **No first-hand experience signals** and **no exact per-procedure costs** (only illustrative figures).

**Score rationale (6.0):** strong depth and a review/sources/corrections framework (+), but unverified figures, two unresolved factual conflicts, and zero credentialed authorship (−) — disqualifying for a top-tier YMYL score until fixed.

---

## Why it matters

- **YMYL + Google's Quality Rater Guidelines.** Insurance is explicitly YMYL. Raters are instructed to assign **Lowest** ratings to YMYL pages with inaccurate information or no evidence of expertise/trust. **Accuracy and credentialed authorship are not optional here** — they are the gate.
- **Experience + Expertise + Authoritativeness + Trust.** Trust is the center of E-E-A-T. **Verified data + a named credentialed reviewer + transparent monetization** are the three signals raters and algorithms read most directly on a comparison/marketplace page.
- **AI answer trust.** AI Overviews and assistants preferentially cite **dated, sourced, self-consistent** facts. A page that contradicts the carrier's own site (Delta whitening) will be **passed over or contradicted** — and risks being quoted *against* us.
- **Conversion trust.** A shopper who catches one wrong coverage figure distrusts the whole comparison. **Verified + disclosed + credentialed** directly lifts the free-verification conversion.

---

## Specific fixes (prioritized)

### 1. VERIFY the data — resolve conflicts — flip status  *(P0)*
- For each plan, pull the **current official carrier document** (plan brochure / SBC / EOC) **per state**, since terms vary by state.
- **Resolve the two conflicts:** correct **Delta whitening** to match Delta's current document; reconcile **Guardian** to the actual marketed tier (e.g., Advantage Premier 2.0: 60% + implant/ortho lifetime caps) or clearly scope which tier we describe.
- Flip **`verification_status`** in Supabase from `needs_verification` → `verified` **only per fact that is confirmed**, storing the **source document name + verification date**.
- Replace the generic review line with a **real cue**: *"Verified against {document name} on {date}."* Never show "verified" for a fact that is still a snapshot.

### 2. Author / reviewer E-E-A-T  *(P1)*
- Add a **named reviewer with real credentials** (e.g., a **licensed dental or insurance professional** — license type + state). Render an **author/reviewer bio block** with name, credential, and a one-line scope of expertise.
- Emit **`author`** and **`reviewer`** structured data tied to a stable **`Person` entity** (coordinate with the schema doc).
- Ship **"About our methodology"** and **"How we make money"** (affiliate disclosure) pages, **linked from every plan page and the hub**. Disclosure must be plain: independent marketplace, compensated when readers connect with a plan, compensation **does not change** the figures we report.

### 3. First-hand experience signals  *(P1)*
- Show **how we verified**: a short "What we confirmed and where" block, **verification screenshots** or document references, and **member-relevant scenarios** (e.g., "for a major restorative claim, this plan's waiting period means…").
- **Do not invent testimonials or member quotes.** Experience here = our **real verification process**, not fabricated reviews.

### 4. Source transparency  *(P1)*
- **Surface the sources-drawer content** as visible, dated citations: official plan document, publisher, and **date accessed/verified** per source.
- Add a **per-fact "last verified {date}"** micro-cue next to the high-stakes figures (annual max, waiting period, major %, implants/ortho).

### 5. Freshness  *(P2)*
- Emit **`dateModified`** and show a **visible review cadence** (e.g., "Reviewed quarterly").
- Keep a short **update log** ("2026-06: corrected Delta whitening; reconciled Guardian tier") to demonstrate active maintenance.

### 6. Exact-cost trust  *(P2)*
- Do **not** scrape or invent "exact" per-procedure prices. Add a **FAIR Health estimated-fee layer** plus a **pre-treatment-estimate** prompt ("ask your dentist for a pre-treatment estimate; we verify your exact plan free"). This satisfies cost intent **without** unverifiable hard numbers.

### 7. Avoid thin/duplicate across the 8  *(ongoing)*
- Each page must carry **materially unique analysis** (already mostly true). Guard against the verification pass flattening pages into a shared template — preserve per-plan interpretation, not just per-plan numbers.

---

## Implementation notes

- **DB-driven trust.** Verification is a **data property, not page copy**: `verification_status`, `verified_against` (document), `verified_on` (date), and per-fact source rows live in `ppo_plans` (or a joined `plan_sources` table). The page **renders the cue from the data** — so a fact can never display "verified" unless the row says so.
- **Reviewer as an entity.** Store the reviewer `Person` (name, credential, license, profile URL) once and reference it across pages so author/reviewer schema stays consistent and updatable.
- **Disclosure pages** are shared routes linked globally from the plan template and hub.
- **Compliance:** independent positioning throughout; **no guaranteed-coverage language**; pricing stays **"from $X / illustrative"**; every coverage figure framed as a term to **verify**, with the verification cue doing compliance + trust work in one line.

---

## Priority & effort

| Workstream | Priority | Effort |
|---|---|---|
| Verify data per state + resolve Delta/Guardian conflicts + flip `verification_status` | **P0** | High |
| Named credentialed reviewer + author/reviewer schema + methodology & disclosure pages | **P1** | Medium |
| Per-fact dated sources + first-hand verification signals | P1 | Medium |
| Freshness (`dateModified`, cadence, update log) | P2 | Low |
| FAIR Health estimated-fee + pre-treatment-estimate layer | P2 | Medium |

---

## Acceptance criteria

- [ ] **All 8 plans' figures verified** against current official carrier documents **per state**; `verification_status` flipped per confirmed fact.
- [ ] **Delta whitening conflict resolved** (matches Delta's current document) and **Guardian tier reconciled** (correct %, implant/ortho caps, or scoped tier).
- [ ] Visible **"Verified against {document} on {date}"** cue renders **from the data**, never hard-coded.
- [ ] **Named reviewer with real credentials** (license type + state) + **author bio block** on every plan page.
- [ ] **`author` and `reviewer` schema** emitted and tied to a stable `Person` entity.
- [ ] **"About our methodology"** and **"How we make money" (affiliate disclosure)** pages exist and are **linked from every plan page + the hub**.
- [ ] **Sources are dated** (document, publisher, date verified) and surfaced; **per-fact "last verified"** present on high-stakes figures.
- [ ] **Freshness shown:** `dateModified` emitted + visible review cadence + update log.
- [ ] **Exact-cost intent met without invented numbers** (FAIR Health estimate + pre-treatment-estimate prompt).
- [ ] **Compliant throughout:** independent, no guaranteed-coverage language, "from $X / illustrative" pricing, figures framed as terms to verify.
- [ ] **No fabricated testimonials**; experience signals are real verification artifacts.
