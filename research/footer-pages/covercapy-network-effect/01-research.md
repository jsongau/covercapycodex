# 01 — Research: covercapy-network-effect.html

A thought-leadership / editorial explainer of CoverCapy's moat and flywheel. Internal moat
theory comes from CLAUDE.md and the brand pages. External concepts (network effects, marketplace
flywheels, dental acquisition economics) are cited below.

## Internal moat theory (source: CLAUDE.md, index.html, capy-accreditation.html, footer-preview.html)
Five interlocking loops that make the network compound:

1. Eligibility verification ("Plaid for dental eligibility")
   - A patient can verify whether a specific office takes their exact PPO network before the
     visit. Member ID is never stored (only member_id_provided: boolean). This removes the
     single biggest source of dental anxiety: "will this office actually take my plan."
   - Every verification is a clean, high-intent signal of demand for a specific office.

2. First-dentist-after-purchase
   - The dentist a patient is matched to right after they get covered tends to become their
     dentist. Being the verified, in-network, modern office at that moment is durable.
   - This converts a one-time coverage event into a long-term patient relationship for the office.

3. Patient-recruits-dentist loop (dentist nomination)
   - Patients can nominate the office they love. Demand pulls supply onto the platform: a
     trusted office gets invited by the people who already trust it, not by cold sales.

4. Gamification (Capy Crowns / Diamonds)
   - Participation, profile completeness, accreditation, and patient trust indicators feed a
     reward and ranking layer (Capy Crowns score is a documented tiebreaker in CLAUDE.md).
     This raises supply-side engagement, which improves demand-side quality.

5. Accreditation standard as a quality ratchet
   - Capy Accreditation reviews offices to a published standard. Higher average quality on the
     supply side raises trust on the demand side, which attracts more patients, which makes the
     network more valuable to join. Reviewed, labeled, never sold as guaranteed placement.

Why it compounds: each verified office and each prepared patient improves the next match.
Data from verifications and matches makes recommendations sharper over time (a data network
effect layered on the two-sided marketplace effect).

## External concepts (cited)

1. Network effects = demand-side economies of scale; each new participant raises utility for
   all others. A marketplace flywheel is a positive feedback loop where more supply improves
   the experience for demand, attracting more demand, attracting more supply.
   - Source: Stripe Atlas, "Andrew Chen on marketplaces" — https://stripe.com/guides/atlas/andrew-chen-marketplaces (accessed 2026-06-26)
   - Source: Cobbleweb, "Grow the value of your marketplace with powerful network effects" — https://www.cobbleweb.co.uk/grow-marketplace-value-with-network-effects/ (accessed 2026-06-26)

2. Flywheel vs network effect distinction: a flywheel is supply-side / operational compounding;
   a network effect is demand-side. A network effect is often one loop inside a larger flywheel;
   the value is in identifying every loop and how they interlock.
   - Source: Metavert, "Flywheel Economics vs Network Effects" — https://www.metavert.io/compare/flywheel-economics-vs-network-effects (accessed 2026-06-26)
   - Source: Think Insights, "Flywheel Effect" (Jim Collins origin) — https://thinkinsights.net/strategy/flywheel-effect (accessed 2026-06-26)

3. Data network effect framing (the network IS the product; value compounds through connection):
   - Source: Modern Data 101 (Medium), "The Network is the Product: Data Network Flywheel" — https://medium.com/@community_md101/the-network-is-the-product-data-network-flywheel-compound-through-connection-9bf3f94d1d6c (accessed 2026-06-26)

4. Dental acquisition economics (why a built-in demand loop is valuable to offices):
   - Healthcare patient acquisition averages ~$286 per lead; ~36% of patients left a provider in
     the last two years due to dissatisfaction; geographic density beats dispersion for referrals.
   - Source: Patientdesk.ai, "Complete 2026 Guide to Dental Patient Acquisition Strategies" — https://www.patientdesk.ai/blog/complete-2026-guide-to-dental-patient-acquisition-strategies (accessed 2026-06-26)
   - Source: CT Acquisitions, "Dental DSO PE Roll-Up Tracker: 2026 Platforms" (consolidation /
     PPO-density context) — https://ctacquisitions.com/dental-dso-pe-rollup-tracker-2026/ (accessed 2026-06-26)

## Guardrails
- Do not claim achieved user/dentist counts, GMV, retention, or funding. Keep loops described
  as designed mechanisms and aspirations, not proven metrics.
- Capy Crowns / Diamonds, nomination, and rankings are real product concepts per CLAUDE.md but
  framed as mechanisms; never promise a ranking position or patient volume.
- CoverCapy is not an insurer or a dental practice. Placement is reviewed and labeled.
