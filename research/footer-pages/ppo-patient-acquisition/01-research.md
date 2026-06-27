# 01 — Research: PPO Patient Acquisition

Audience: dentists and practice owners. Page positions CoverCapy as a PPO patient acquisition
channel built on the "first dentist after coverage purchase" moat. All external facts carry a
source URL + 2026 access date. Present ranges, never single false-precision numbers.

## The CoverCapy moat (internal facts, from repo)
- Positioning: "Get cover today, see a dentist tomorrow." CoverCapy sells PPO coverage and then
  routes the newly covered patient to a dentist.
  Source: repo `CLAUDE.md`, accessed 2026-06-26.
- The moat: be the first PPO dentist a patient sees right after they buy/activate coverage.
  Source: repo `dentist-portal.html` / `capy-practice-membership.html` meta+OG copy:
  "Get discovered when newly covered PPO patients are choosing which dental practice to book first"
  and "find, trust, and book your dental practice after coverage activation",
  accessed 2026-06-26.
- Membership tiers and search radius (the acquisition surface):
  free $0 / 8mi, capy_accredited ~$285/mo / 10mi, platinum_elite $1,499/mo / 18mi.
  Capy Crowns score is the ranking tiebreaker.
  Source: repo `CLAUDE.md` Membership Tiers, accessed 2026-06-26.
- The PPO verification wizard captures intent at the moment of coverage; member ID is never stored
  (only `member_id_provided: boolean`).
  Source: repo `CLAUDE.md` T5 page + verification spec, accessed 2026-06-26.

## Acquisition economics (external benchmarks)

1. Patient acquisition cost (PAC): $150–$350 per new general patient; $250–$500 cosmetic;
   $300–$500+ in competitive metros. PAC up 25–40% since 2020.
   Source: Dentplicity, "Dental Patient Acquisition Cost Benchmarks (2026 Data)",
   https://dentplicity.com/blog/dental-patient-acquisition-cost-benchmarks — accessed 2026-06-26.
   Corroborated: Incept Health,
   https://www.incept-health.com/insights/whats-the-average-cost-per-acquisition-cpa-for-new-dental-patients
   — accessed 2026-06-26.

2. Pay-per-booking marketplaces (Zocdoc): $35–$110 per new-patient booking, charged at booking
   whether or not the patient shows.
   Source: Zocdoc Help Center,
   https://www.zocdoc.com/provider-help/en/articles/10859404-understanding-zocdoc-pricing-and-billing
   — accessed 2026-06-26.

3. Lifetime value (LTV) of a dental patient: commonly cited around $6,700; consultant estimates
   range widely from roughly $4,800 up to $10,000+ depending on retention, acceptance, referrals.
   A general PPO patient is often modeled at $500–$800 per year in revenue.
   Source: Delmain, "Average Lifetime Value of a Dental Patient",
   https://delmain.co/blog/average-lifetime-value-dental-patient/ — accessed 2026-06-26.
   Corroborated: Dandy learning center,
   https://www.meetdandy.com/learning-center/articles/whats-the-lifetime-value-of-a-dental-patient/
   — accessed 2026-06-26.

4. Why PPO patients are high value: in-network negotiated rates reduce friction at the point of
   decision; predictable out-of-pocket cost raises treatment acceptance versus uninsured patients.
   Source: Edental Market, "What Is PPO Insurance",
   https://www.edentalmarket.com/what-is-ppo-insurance — accessed 2026-06-26.
   ADA plan overview (context on PPO structure):
   https://www.ada.org/resources/practice/dental-insurance/dental-plan-overview — accessed 2026-06-26.

## Economic framing used on the page (ranges only)
- A new PPO patient costs $150–$350 to acquire through ads, or $35–$110 per booking on a
  marketplace, while carrying an LTV commonly modeled near $6,700 (range ~$4,800 to $10,000+).
  The LTV-to-acquisition ratio is the argument: the channel pays for itself across a single
  retained patient. Do not state a guaranteed return; CoverCapy does not promise patient volume.

## Funnel (internal logic)
Patient buys/activates PPO coverage -> verification moment -> directory + search routes them to a
nearby participating dentist -> Featured / accredited offices surface first -> patient books.
The practice is acquiring a patient who already holds active, in-network-friendly coverage.
