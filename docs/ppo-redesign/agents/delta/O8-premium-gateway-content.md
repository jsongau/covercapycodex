# O8 — Delta Dental PPO Premium: Gateway Content & Conversion Plan

**Page:** `/dental-insurance/ppo-plans/delta-dental/premium/index.html`
**Role:** The GATEWAY into the entire Delta Dental hub. Not a standalone leaf. It is the doorway that routes into: the Delta hub index, over-65 / SCAN, uc-students / UC SHIP, and compare.
**Color:** T5 jade. Teal-night (`--graphite #12161B`) on CTAs, teal-700 / jade-deep (`--jade-deep #0C8C81`) on links, mint/jade (`--jade #0FB5A6`) as accent. Body text (`--ink`, `--muted`) is NEVER the CTA color.
**Frozen:** All premiums and dollar figures already on the page are founder-frozen. Render them, do not change them. Individual ~$73/mo (~$877/yr). Family ~$181/mo (~$2,177/yr). $2,000 annual max, $50/$150 deductible, $1,500 ortho lifetime, 300 Crowns / $150 Diamonds.
**Claims source:** `plan-data/delta-dental-ppo.md` (verified brief). Flag every state-specific item.

---

## 1. The framing — "doorway, not destination"

Premium is the single best-converting page in the hub, so it carries the most search traffic and the most intent. But a sizable slice of visitors should NOT buy Premium first — they are seniors who already hold Delta via SCAN, or UC students who already hold Delta via UC SHIP. The gateway job is to **sell Premium to the right buyer AND route the wrong-fit buyer sideways into the sub-hub that actually serves them.** A bounce that lands on over-65 or uc-students is a win, not a loss.

One-line internal framing to carry through the copy:
> "Delta Dental PPO Premium is your door into Delta's full network — plus the senior (SCAN) and student (UC SHIP) options if a Premium policy is not what you actually need."

---

## 2. Answer-first opening (already strong — keep, tighten)

The page leads with an AI-answer block that directly answers the top query. KEEP this pattern. It is the right answer-first move.

- **Q (H-level):** "Does Delta Dental PPO Premium cover Invisalign for adults?"
- **A (first sentence = the answer):** "Yes." Then: adults + dependent children at 50%, up to $1,500 lifetime, after a ~6-month wait that's waived with proof of prior coverage; implants at 50%; whitening covered.
- **Fact strip (4 cells):** `50%` adult ortho & implants · `$2,000` annual maximum · `Yes` whitening covered · `~6 mo` waits, waivable.
- **Jump chips:** See all waiting periods · Find Invisalign dentists · Compare vs other plans.

**FLAG — state-specific:** the "Yes, whitening covered" cell and the ortho wait both lean on California/typical terms. Per the verified brief, whitening is state-specific (often ~25-50%, 6-mo wait, ages 16+, NOT offered everywhere) and waits "vary by state." The fact strip should not present whitening as a flat nationwide "Yes." Recommended softening: `Yes*` with the asterisk resolving to "in many states — verify yours." Keep the dollar figures frozen; this is a claim-accuracy fix, not a price change.

---

## 3. Spec sheet content (the price card + benefits)

The sticky jade-top price card is the spec sheet. Content to render (all frozen):

| Line | Value | Notes |
|------|-------|-------|
| Headline | Delta Dental PPO™ — Premium tier | |
| Toggle | Individual / Family | Individual default |
| Price (ind) | ~$73/mo · ~$877/yr · cancel anytime | FROZEN |
| Price (fam) | ~$181/mo · ~$2,177/yr | FROZEN |
| Feature 1 | $2,000 annual maximum — above the typical $1,000–$1,500 | brief-verified |
| Feature 2 | Adult & child orthodontics + implants at 50% | the differentiator |
| Feature 3 | 100% preventive, no waiting period | brief-verified |
| Feature 4 | 6-month wait on basic, major & ortho — waived with proof of prior coverage | see flag below |
| Feature 5 | No missing-tooth clause | see flag below |
| Crowns | Earn 300 Capy Crowns on activation | FROZEN |
| Disclaimer | Prices vary by age & ZIP. Marketing illustration, not the policy. | keep |

**Benefits pods (4):** 100% Preventive · 80% Basic · 50% Major & implants · 50% Orthodontics (adults & children — "the differentiator").

**FLAGS — reconcile page vs brief:**
- **Waiting periods:** the page shows a flat "~6 months" for basic/major/implant/ortho. The verified brief says **Basic 6 mo, Major/implants/ortho 12 mo**. This is a material discrepancy. The brief is the source of truth for claims. RECOMMENDED: either correct the page timeline to brief terms (6/12/12/12) OR keep the page's CA-specific 6-mo figure but the `*` footnote must explicitly say "California / typical individual terms; other states 12 months on major, implants and orthodontics — verified before enrollment." Do not silently present 6 months nationwide. Numbers that are *premium prices* stay frozen; *waiting-period claims* are not prices and must match the brief or be state-flagged.
- **Missing-tooth clause:** page says "No missing-tooth clause." Brief says a missing-tooth exclusion was ADDED to PPO Premium (except California) for renewals from Aug 1, 2025. RECOMMENDED: scope this claim to California, e.g. "No missing-tooth clause in California (other states may apply one on 2025+ renewals — we verify yours)." This is the single highest-risk claim on the page.

---

## 4. Delta's true differentiators (lead with these, all brief-verified)

1. **Largest network in the US.** 112,000+ dentists at 278,000+ locations on the PPO network; combined PPO + Premier networks = largest by location count. This is the strongest "door into Delta's full network" line — use it in the hero/answer area, not buried.
2. **Adult orthodontics.** One of the very few individual PPOs covering adults (not just dependent children) at 50%, ~$1,000–$1,500 lifetime. This is *the* reason people choose Premium and should remain the emotional spine of the page (the dark "Adult orthodontics, actually covered" panel).
3. **1st-or-15th activation.** Delta is the ONLY major individual dental carrier offering 15th-of-month activation. This is a genuine, under-used differentiator and is currently absent from the page. ADD a short spec line / micro-section: "Start on the 1st or the 15th — Delta is the only major individual carrier that lets you activate mid-month, so you don't wait weeks for coverage to begin." Pair with the verify CTA. (A one-time non-refundable application fee applies in most states — disclose.)
4. **$2,000 annual maximum** — above the $1,000–$1,500 typical of individual plans.
5. **AM Best A (Excellent), 60+ years, largest US carrier by plan count** — one trust line in the disclaimer/footer band.

---

## 5. Routes into the sub-hubs (the gateway's core job)

Every route below already has CSS hooks on the page. The content plan: make the routes unmissable and intent-matched, not just a footer afterthought.

| Destination | URL | Entry point on Premium page | Copy angle |
|-------------|-----|------------------------------|------------|
| Delta hub index | `/dental-insurance/ppo-plans/delta-dental/` | Breadcrumb + sub-nav "Delta Hub" + mega-nav logo | "Everything Delta, in one place" |
| Compare | `/dental-insurance/ppo-plans/delta-dental/compare/` | Answer jump chip · waiting-period rust CTA · related grid · FAQ | "Is Delta good? See it vs UHC, Guardian, Ameritas" |
| Over-65 / SCAN | `/dental-insurance/ppo-plans/delta-dental/over-65/` | Jade SCAN callout band + dedicated FAQ + footer | "65+ in CA/WA? You may already have Delta via SCAN — don't double-buy" |
| UC students / UC SHIP | `/dental-insurance/ppo-plans/delta-dental/uc-students/` (and `/students/{campus}/`) | **MISSING on Premium page — ADD** | "On UC SHIP? Your student dental is almost certainly Delta PPO already" |
| Find a dentist | `#dentists` (in-page tabs) | Hero secondary CTA + price-card ghost CTA | "First, find & verify my dentist" |

**FLAG — gap:** the Delta hub index links to **uc-students / UC SHIP**, but the Premium page does NOT. For a true gateway, ADD a UC SHIP routing band mirroring the SCAN band (same `.scan` style is fine, or a `.lc` card): "On UC SHIP? You likely already have Delta Dental PPO — find a dentist near your campus" → uc-students hub. This closes the gateway loop so both sideways audiences (seniors + students) are caught.

---

## 6. FAQ set (keep existing 6, add 2)

Existing (keep, with claim fixes from §3 applied):
1. Does Premium cover adult Invisalign? — Yes, 50%, $1,500 lifetime, ~6-mo waivable wait.
2. What are the waiting periods? — none preventive; basic/major/implant/ortho per brief (apply §3 flag).
3. Is there a missing-tooth clause? — apply §3 California-scoping flag.
4. What's the annual maximum and deductible? — $2,000 / $50 ind / $150 fam.
5. Where is this plan available? — 16 states + DC (AL, CA, DE, FL, GA, LA, MD, MS, MT, NV, NY, PA, TX, UT, WV, DC).
6. 65+ on Medicare in CA? — maybe not first; routes to SCAN over-65 hub.

ADD:
7. **When does my coverage start?** — Delta is the only major individual carrier offering 1st-OR-15th-of-month activation; pick the 1st or 15th, a one-time application fee applies in most states. (Differentiator #3 — surfaces the 1st/15th fact in FAQ where it earns featured-snippet eligibility.)
8. **I'm a UC student — do I need to buy this?** — Probably not; UC SHIP dental is most likely already Delta Dental PPO. Routes to uc-students hub. (Mirrors the SCAN FAQ for the student audience.)

---

## 7. CTA ladder (jade discipline)

Primary action color = teal-night/graphite buttons and jade buttons; links = jade-deep. Order of priority down the page:

1. **Find a Delta dentist** (`#dentists`) — the CoverCapy-owned action. Hero secondary + price-card ghost CTA: "First, find & verify my dentist." This is the conversion CoverCapy monetizes (offices pay), so it should never sit below the external enroll button in visual weight on the in-page experience.
2. **Check pricing / enroll** — price-card jade button "Enroll in this plan on Delta Dental" (external, UTM-tagged, frozen). Keep as the hard-conversion path for ready buyers.
3. **Verify my dentist** — jade button inside the Verify tab; the trust step that de-risks the enroll.
4. **Are you 65+?** — SCAN dark button "See the SCAN Delta benefit" → over-65.
5. **Are you a UC student?** — ADD: "Find a dentist near your campus" → uc-students (new band per §5 flag).
6. **Cost estimator + Nominate** — secondary engagement tabs; Nominate carries the Diamonds reward.

Rule: no single screen should show two equally-weighted jade CTAs competing. Hero = one jade enroll + one ghost find; price card = one jade enroll + one ghost find. Sideways routes (SCAN/UC SHIP) use the dark/graphite button so they read as "different audience," not "buy now."

---

## 8. Net recommendations (priority order)

1. **Fix the three claim discrepancies vs the verified brief** before anything else: waiting periods (6 vs 12 month on major/implant/ortho), missing-tooth clause (CA-only), and whitening ("Yes" → state-flagged). These are accuracy/liability issues; prices stay frozen but claims must match the brief or be state-flagged.
2. **Add the UC SHIP / uc-students route** (band + FAQ #8). It's the one gateway exit the Premium page is missing and the hub index already has — without it the "doorway into the whole hub" thesis has a hole.
3. **Surface the 1st/15th activation differentiator** (spec line + FAQ #7). It's a true, unique, conversion-relevant Delta fact that's currently absent and pairs naturally with the verify CTA.
