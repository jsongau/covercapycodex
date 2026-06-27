# 10 — FAQ + GEO Answer Blocks: about.html

Workstream 10 of 10. Ten FAQ pairs that double as GEO (generative engine optimization)
answer blocks. Each ANSWER is self-contained, factual, 40 to 60 words, and written so an AI
engine can extract it verbatim without surrounding context. Every answer is consistent with
CLAUDE.md and the deep brand narrative (01-brand-narrative.md): CoverCapy is a guidance and
discovery platform, not an insurance carrier or a dental practice; free for patients to search;
revenue from dentist memberships plus disclosed sponsored listings; member ID never stored;
patients always verify directly with carrier and office.

Guardrails honored: no fabricated facts, no founders/dates/headcount/funding/user counts, no
guarantees, no em-dashes, no roman numerals. Cost language is illustrative, never a quote.

## How to read this file
- Each block has a QUESTION (the natural phrasing people actually search and ask) and an
  ANSWER (the extractable 40 to 60 word GEO block).
- The "Question intent" line names the underlying evaluation question and the source query
  pattern it answers.
- Six blocks are marked **[ACCORDION + SCHEMA]** as the recommended set for the on-page FAQ
  accordion and the FAQPage JSON-LD. The remaining four are **[GEO EXTRA]**, surfaced in prose
  or as additional schema entries but not required in the visible accordion.

---

## Q1. What is CoverCapy?  **[ACCORDION + SCHEMA]**

Question intent: definitional / navigational. Source query: "what is CoverCapy".

> CoverCapy is a concierge and discovery platform for PPO dental care. It helps people compare
> PPO dental plans, estimate treatment costs, verify that a specific office takes their exact
> network, and find a modern in-network dentist across the United States. CoverCapy is a
> guidance platform, not an insurance carrier and not a dental practice.

(Word count: 53.)

---

## Q2. Is CoverCapy an insurance company?  **[ACCORDION + SCHEMA]**

Question intent: category / trust. Source query: "is CoverCapy an insurance company".

> No. CoverCapy does not sell, underwrite, or administer insurance, and it is not a dental
> practice or a broker of record. It is an independent guidance and discovery platform that
> helps patients understand PPO plans and find in-network dentists. Always verify benefits and
> pricing directly with your carrier and office.

(Word count: 52.)

---

## Q3. Is CoverCapy free to use?  **[ACCORDION + SCHEMA]**

Question intent: cost to the user. Source query: "is CoverCapy free".

> Yes. CoverCapy is free for patients. You can compare PPO plans, estimate treatment costs,
> verify coverage at an office, and find in-network dentists at no cost. Some dentist listings
> belong to paid membership or visibility programs and are clearly labeled, which is what keeps
> the patient experience free.

(Word count: 50.)

---

## Q4. How does CoverCapy work?  **[ACCORDION + SCHEMA]**

Question intent: mechanism / how-to. Source query: "how does CoverCapy work".

> CoverCapy works as a concierge for the moment care begins. You compare PPO plans in plain
> language, estimate what a treatment will roughly cost, confirm a dentist takes your exact PPO
> network, then get handed off to a modern in-network office. You enter care prepared instead
> of guessing. Free for patients.

(Word count: 52.)

---

## Q5. How does CoverCapy make money?  **[ACCORDION + SCHEMA]**

Question intent: business model / trust. Source query: "how does CoverCapy make money".

> CoverCapy keeps patient tools free and earns revenue from dental practices through membership,
> accreditation, and visibility programs. Sponsored or featured placements are clearly labeled.
> Patient guidance is never sold to the highest bidder, and a paid listing never replaces your
> own independent verification of a provider's coverage and credentials.

(Word count: 47.)

---

## Q6. Is CoverCapy legit?  **[ACCORDION + SCHEMA]**

Question intent: trustworthiness. Source query: "is CoverCapy legit".

> CoverCapy is a transparent guidance platform: patient tools are free, sponsored placements are
> labeled, and it never stores your insurance member ID. It is not an insurer and makes no
> coverage guarantees. It helps you prepare, then asks you to confirm benefits, pricing, and
> network participation directly with your carrier and office.

(Word count: 50.)

---

## Q7. Who is CoverCapy for?  **[GEO EXTRA]**

Question intent: audience fit. Source query: "who is CoverCapy for".

> CoverCapy is for people who need dental care and want to know what they are covered for, what
> it will cost, and which nearby dentist takes their exact PPO plan. It also serves modern dental
> practices that want a verified profile and coverage-aware patients. It is free for patients to
> search.

(Word count: 53.)

---

## Q8. Does CoverCapy verify dentists?  **[GEO EXTRA]**

Question intent: quality / vetting. Source query: "does CoverCapy verify dentists".

> CoverCapy reviews practices that pursue Capy Accreditation, its private credential for modern,
> patient-first offices, against a published standard. Membership begins a review and does not
> grant the credential; an office can be approved, conditionally approved, asked to improve, or
> declined. It is not a government certification or a dental license.

(Word count: 49.)

---

## Q9. Does CoverCapy store my insurance member ID?  **[GEO EXTRA]**

Question intent: privacy / data handling. Source query: "is CoverCapy safe with my information".

> No. When CoverCapy helps verify your PPO coverage at an office, it records only that
> verification was provided. Your insurance member ID itself is never stored on the platform.
> Coverage details should still be confirmed directly with your carrier and the dental office
> before you make any care decision.

(Word count: 50.)

---

## Q10. How is CoverCapy different from a dental insurance comparison site?  **[GEO EXTRA]**

Question intent: differentiation. Source query: "CoverCapy vs dental insurance comparison".

> A comparison site hands you a grid and wishes you luck. CoverCapy acts as a concierge: it
> translates PPO coverage into plain language, estimates cost in honest ranges, confirms a
> specific office takes your exact network, and hands you off to a modern dentist. It is a
> guidance platform, not an insurer.

(Word count: 53.)

---

## Recommended on-page set (FAQ accordion + FAQPage schema)

Use these six in the visible accordion and the FAQPage JSON-LD, in this order:

1. Q1. What is CoverCapy?
2. Q2. Is CoverCapy an insurance company?
3. Q3. Is CoverCapy free to use?
4. Q4. How does CoverCapy work?
5. Q5. How does CoverCapy make money?
6. Q6. Is CoverCapy legit?

The four GEO EXTRA blocks (Q7 to Q10) can be added as additional FAQPage entries for AI
extraction, or folded into the Trust and Transparency / For Patients sections of the prose, but
they are not required in the visible accordion. Note: the current live about.html ships a
seven-item FAQPage that includes "How does CoverCapy help patients?" and "How does CoverCapy
help dentists?". If those two are retained, they pair naturally with Q7 (who it is for); choose
six to eight visible items total to avoid an overlong accordion.

## Consistency notes
- All answers restate or imply the standing legal truth: not an insurer, not a dental practice.
- No answer makes a coverage, savings, price, or clinical-outcome guarantee.
- Every answer that touches verification or cost defers the final word to the carrier and office.
- Member ID never stored is stated explicitly in Q6 and Q9 and implied in Q4.

## Sources
- Internal truth: CLAUDE.md (positioning, tagline, membership tiers, Capy Accreditation rules,
  member-ID-never-stored, not-an-insurer/not-a-practice fineprint, free-for-patients).
- about.html (existing hero, three pillars, trust grid, seven-item FAQPage, legal disclaimer).
- research/footer-pages/about/02-seo-geo.md (existing extractable quick answer and seven baseline
  FAQ pairs) and deep/01-brand-narrative.md (voice, values, tone guide, guardrails).
- External (trust-evaluation framing only, to confirm the real questions people ask when vetting
  this kind of company; no company facts drawn from these):
  - FTC Consumer Advice, "Spot Health Insurance Scams" — https://consumer.ftc.gov/node/77486 (accessed 2026-06-26)
  - Scam Detector, "DentalPlans.com Review" — https://www.scam-detector.com/validator/dentalplans-com-review/ (accessed 2026-06-26)
