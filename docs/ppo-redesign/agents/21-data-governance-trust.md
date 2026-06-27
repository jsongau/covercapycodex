# Agent 20 (file 21) — Data Governance, Editorial Trust & Compliance

> Scope: YMYL dental-insurance content. Founder fear = "too basic / worse than current."
> This memo defends the trust layer the current page already earns, names what the redesign
> still has to add, and lists what must NOT publish.
> Reviewed against: `compare-ppo-dental-plans.html` (live), `plan-data/*.md` (8 briefs),
> `PLAN-DATA-RECONCILIATION.md`, and `docs/ppo-redesign/_redesign-package/*.html`.

---

## VERDICT — score 6.5 / 10

The reconciliation file is genuinely good governance: it authors each number once, tags
confidence (`verified` / `state-specific` / `needs-doc`), and names open items. The MetLife
spoke is handled exactly right (`noindex,follow`, visible "under review", refuses to print a
percentage). The live page carries real trust furniture: a named reviewer, "Verified Jun 2026"
per card, an independent-marketplace disclaimer, a no-pay-for-placement statement, and a
rating-methodology tooltip. Those are strong signals a basic redesign could lose.

It is **not** a 9 because three governance failures are live right now: (1) the redesign hub and
the MoO spoke still print **$90/mo and "50% major after a 6-month wait,"** directly contradicting
the reconciliation file's own canonical values ($57; 20% Y1 → 50% Y2, no hard wait); (2) Ameritas
annual-max is stated as settled fact on two surfaces with two different numbers ($2,000→$3,500 vs
$2,500→$3,000) while the reconciliation file itself says `needs-doc`; (3) the named reviewer's
credential is asserted but not independently verifiable from anything in-repo, and is absent from
the redesign spokes. Until those are closed this is a "block the conflicting numbers, ship the rest"
state, not a green light.

---

## A. TRUST SIGNALS THAT MUST NOT BE LOST (preserve from current)

The redesign is structurally stronger but must inherit every one of these or it WILL feel "more basic":

1. **Named human reviewer + date line** — live page: "Plan data reviewed by Sarah Chen, licensed
   dental insurance consultant · Verified June 2026 · Updated quarterly · How we rate plans."
   The redesign spokes do NOT carry a reviewer byline. Add it to every spoke.
2. **Per-card "Verified Jun 2026" stamp** — present on live cards; keep a per-fact freshness date.
3. **Independent-marketplace / no-pay-for-placement statement** — present on both live and redesign
   methodology blocks. Keep verbatim intent; it is the single most important EEAT line on a YMYL
   money page.
4. **Rating-methodology disclosure** — the live tooltip names the exact inputs (coverage breadth,
   annual max, average wait, value per dollar) and "No carrier pays for this placement." Preserve.
5. **Full educational glossary with "why it matters"** — the live `GLOSS` set explains coinsurance,
   waiting period, missing-tooth, allowed-amount, MAC/U&C. This is the depth that makes the page
   credible vs a thin carrier clone. Do not trim.
6. **Honest "Reviewing / not recommended yet" state** — live page and redesign both surface MetLife
   as reviewing rather than hiding it. Keep this honesty mechanism for every unverified plan.
7. **Universal disclaimer** — "not an insurer, carrier, dentist, tax or medical provider…coverage
   depends on your exact policy, state, ZIP, effective date, network, exclusions…" Keep on every page.
8. **"Illustrative, confirmed at eligibility check" qualifier on premiums** — present on the redesign
   hub lead-in. Must appear adjacent to EVERY printed premium, not once at the top.

## B. WHAT MUST BE ADDED (to beat, not match, current)

1. **Per-fact source citation, visible.** The methodology promises "source URL, document date,
   state, retrieval date, reviewer status" per fact — but no spoke actually renders a source drawer
   with those fields filled. Build the source drawer and populate it, or the promise is hollow.
2. **Reviewer identity that survives scrutiny.** Either (a) make "Sarah Chen" a real, named,
   credentialed person with a linkable bio/license, or (b) change the wording to "CoverCapy
   editorial team" / "reviewed against carrier source documents." Do not assert a license you
   cannot evidence — that is the worst possible YMYL failure.
3. **A public corrections log + last-verified date per number.** Add `/dental-insurance/corrections/`
   and a "corrections history" field (already in the schema spec) rendered on each plan page.
4. **Explicit state-variability treatment.** Every `state-specific` fact (Delta whitening, MoO
   implant wait, premiums) must render as a range + "varies by state, we verify before you enrol,"
   never a single hard number.
5. **Trademark / non-affiliation line.** Add once per page footer: carrier names and plan names are
   trademarks of their owners; CoverCapy is independent and not affiliated with or endorsed by any
   carrier. (Currently implied by "independent" but never stated as a trademark notice.)
6. **Quote-assumption disclosure block.** Premiums are illustrative "from" figures assuming a
   specific age/state/tier — state the assumption set once, near the comparison table.

## C. THE LIVE HUB↔SPOKE DATA CONFLICTS (must resolve before publish)

| Fact | Live compare | Redesign hub | Redesign spoke | Reconciliation (canonical) | Status |
|---|---|---|---|---|---|
| **MoO premium** | (live JSON corrected) | **$90 est.** | spoke shows **~$90** | **~$57** ($5,000 tier) | ❌ redesign stale |
| **MoO major** | 20%→50% no wait (corrected) | — | spoke: **"50% after 6-mo wait"** | **20% Y1 → 50% Y2, no hard wait** | ❌ spoke wrong |
| **MoO implant wait** | — | — | spoke: "50% after 12-mo wait" | 20%→50%, no hard wait; some states 6–12mo | ⚠ state-specific, soften |
| **Ameritas annual max** | $2,000→**$3,500** | — | — | **needs-doc** ($2,000–$2,500 / $2,500–$3,000) | ❌ asserted as fact, unverified |
| **Ameritas premium** | $60 | — | — | $54–60 | ⚠ minor, align |
| **Delta whitening** | null (none) | — | — | state-specific ~25–50%, 6-mo, 16+ | ⚠ don't claim "none" universally |
| **Guardian major / whitening** | 50% / 50% w/ 6-mo | — | — | **needs-doc** (major 50 vs 60; whitening Diamond-tier only) | ❌ overstated |
| **Aetna annual max** | $1,250 | — | spoke: **$1,500** | ~$1,000–$1,250 | ❌ internal disagreement |

**Root cause:** the reconciliation file explicitly flags the redesign package "still shows MoO $90;
sync before going live" — that sync has not happened. The redesign was built before the June
corrections landed in the live JSON. One canonical `plans.json` must drive every surface (the live
page already moved its facts into `#plans-data` JSON — extend that single source to the spokes).

## D. AETNA / METLIFE STATUS

- **Aetna Dental Direct** — a brief now EXISTS (`aetna-dental-direct.md`), but the reconciliation
  table still tags it `needs-doc (no brief yet)` and the spoke's annual-max ($1,500) disagrees with
  both the brief (~$1,000–$1,250) and the live JSON ($1,250). Reconcile the three before publish;
  update the reconciliation row to reflect the brief now exists.
- **MetLife NCD Complete** — handled correctly: `noindex,follow`, visible "under review," refuses to
  print basic/major percentages, FAQ on the hub flags "still gathering reviews." Keep `noindex` until
  verified. This is the model the other unverified facts should follow.

## E. THE "FROZEN PREMIUMS" DECISION

Recommendation: **do NOT freeze premiums as hard numbers.** Premiums are age-, state-, ZIP- and
tier-variable; the live page already frames them as illustrative "from" snapshots confirmed at
eligibility check. Freezing a single premium into the page (and worse, into `Offer.price` schema)
creates a false-certainty / bait risk on a YMYL page and goes stale silently. Decision: keep them
**illustrative ranges with a visible "illustrative, varies by state, verified at check" qualifier on
every instance**, and do NOT emit `Offer.price` structured data with a frozen value. If a single
display number is required for scannability, show a "from $X/mo" range anchor, never a flat price.

## F. DISCLAIMER PLACEMENT

- Universal disclaimer: keep at page foot on hub AND every spoke (present on both today — good).
- Premium qualifier: must sit **inline next to each premium**, not only in the lead-in.
- "Not an endorsement / no pay for placement": keep in the methodology block AND as the spoke
  `<details>` "Is this an endorsement?" pattern (the Aetna spoke already does this well — replicate).
- "Coverage not confirmed until verified for your state": repeat next to every coverage grid.

## G. DO-NOT-PUBLISH LIST (hard gates)

1. **Do not publish MoO at $90/mo or "50% major after 6-month wait"** anywhere. Canonical = ~$57 /
   20% Y1→50% Y2 / no hard wait. (Redesign hub + spoke currently violate this.)
2. **Do not publish a single hard Ameritas annual-max** ($2,000→$3,500 or $2,500→$3,000) until the
   official PrimeStar product guide is pulled. It is `needs-doc`. Show "grows in Year 2, confirm at
   check" with no fixed Y2 figure, or hold the number.
3. **Do not publish Guardian major % or whitening as settled** (50/50) — `needs-doc`. Whitening is a
   Diamond-tier allowance, not a Premier 2.0 benefit; printing it on Premier 2.0 is an overstatement.
4. **Do not publish "Delta has no whitening" or "Delta 80% whitening"** as universal — it is
   state-specific (~25–50%, 6-mo wait, ages 16+, not every state).
5. **Do not let MetLife NCD Complete leave `noindex`** or print any basic/major coinsurance until
   verified against an official document.
6. **Do not assert "Sarah Chen, licensed dental insurance consultant"** unless the person and license
   are real and evidenceable. If not, rewrite the byline. (A fabricated credentialed reviewer is the
   single highest-liability item on the whole project.)
7. **Do not emit `Offer.price` / `AggregateRating` schema** with invented or frozen values — only
   real, sourced figures, and never a star rating CoverCapy did not actually compute from disclosed
   inputs.
8. **Do not print "in-network" / "accepted" for a dentist** without exact network-name evidence.
9. **Do not state any contractual effective date marked "confirm"** (MoO especially) as fact — use
   "as soon as the next business day, confirm at enrolment."

---

## ACCEPTANCE CRITERIA (pass/fail before launch)
- [ ] Every printed plan fact traces to one `plans.json`; no surface disagrees with reconciliation.
- [ ] Reviewer byline is truthful and present on hub + all spokes.
- [ ] Each plan page renders source URL, doc date, state, retrieval date, last-verified, corrections.
- [ ] All `needs-doc` facts are held or shown as ranges, never hard numbers.
- [ ] Premium qualifier inline on every premium; no `Offer.price` with frozen values.
- [ ] MetLife stays `noindex`; trademark/non-affiliation notice on every page.
- [ ] MoO numbers corrected across hub + spoke before any deploy.
