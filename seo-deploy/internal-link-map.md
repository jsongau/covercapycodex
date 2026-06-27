# Internal Link Map: Benefit Maxing + Smart Timing Protocol

Goal: build one intentional topic cluster with two entities. The hub is the parent;
the protocol is the named method inside it. Vary anchor text. Use descriptive,
crawlable `<a href>` elements. Never use identical exact-match anchors everywhere.

Canonical targets:
- Hub: `https://www.covercapy.com/benefit-maxing/`
- Protocol: `https://www.covercapy.com/benefit-maxing/smart-timing-protocol/`

---

## Pages that should link TO the Benefit Maxing hub

| Source page | Suggested anchor text (rotate, do not repeat one) | Context |
|---|---|---|
| Homepage | maximize dental insurance benefits | Primary nav promo or "popular resources" block |
| PPO plan comparison hub (`/compare-ppo-dental-plans`) | use dental benefits before they reset | After the comparison, "what next" rail |
| Dental treatment cost estimator (`/dental-treatment-cost-estimator`) | CoverCapy Benefit Maxing | Result-page "what to do with this number" |
| Dental financing page (`/dental-financing-monthly-payments`) | check remaining dental benefits | Intro: settle insurance before financing |
| Annual maximum glossary (`/guides/glossary/annual-maximum/`) | annual maximum planning | "See it in practice" link |
| Deductible glossary (`/guides/glossary/deductible/`) | use dental benefits before they reset | Related reading |
| Waiting period glossary (`/guides/glossary/waiting-period/`) | maximize dental insurance benefits | Related reading |
| In network vs out of network guide | check what your plan may still pay | Body link |
| Treatment guide pages (crowns, root canals, fillings, etc.) | the Benefit Maxing hub | Breadcrumb parent + body |
| Individual PPO plan pages (UHC Primary Dental, Ameritas PrimeStar, Humana Extend 5000) | plan your benefits around the reset | "How to use this plan" block |
| Dentist directory (`/find-my-dentist`) | benefit maxing before you book | Contextual, where appropriate only |

Anchor pool to rotate: "maximize dental insurance benefits", "use dental benefits
before they reset", "check remaining dental benefits", "CoverCapy Benefit Maxing",
"annual maximum planning".

---

## Pages that should link TO the Smart Timing Protocol

| Source page | Suggested anchor text (rotate) | Context |
|---|---|---|
| Benefit Maxing hub | Learn the Smart Timing Protocol | Section 6 preview CTA (already in place) |
| Annual maximum guide / glossary | sequence treatment across benefit periods | When explaining maximum resets |
| Benefit period guide / glossary | plan treatment around a benefit reset | Body |
| Crown insurance guide | ask about using two annual maximums | When a crown is part of larger work |
| Root canal insurance guide | treatment timing and annual maximums | Financing/coverage section |
| Bridge insurance guide | sequence treatment across benefit periods | Multi-unit work context |
| Implant insurance guide | plan treatment around a benefit reset | Staged treatment context |
| Treatment cost estimator result explanation | ask about using two annual maximums | When estimate exceeds remaining maximum |
| Higher annual maximum plan pages (e.g. Humana Extend 5000) | the Smart Timing Protocol | "Why a bigger maximum helps" |

Anchor pool to rotate: "Smart Timing Protocol", "sequence treatment across benefit
periods", "ask about using two annual maximums", "plan treatment around a benefit
reset", "treatment timing and annual maximums".

---

## Bidirectional links already wired in the delivered HTML

- Hub -> Protocol: hero router Option B, hub directory "Use benefits before they reset",
  move 05, Section 6 preview CTA, final action secondary CTA.
- Protocol -> Hub: "Return to the Benefit Maxing hub" (appears twice), plus the
  relationship statement "Smart Timing Protocol is part of CoverCapy Benefit Maxing."

## Linking rules
- Keep one descriptive anchor per link; avoid empty or "click here" links.
- Do not point a "Verify my benefits" label at the dentist search. The hub routes
  verification-style intent to the cost estimator and to dentists who can verify.
- Confirm every internal destination returns HTTP 200 before publishing.
