# E-E-A-T Signal Design — covercapy.com/dental-insurance-glossary/
## SEO Specialist Brief | June 2026

Google classifies dental insurance content as YMYL (Your Money or Your Life) because a misunderstood term — deductible, annual maximum, missing tooth clause — can directly affect a person's financial and health decisions. Quality Raters apply the highest E-E-A-T scrutiny to glossary pages on this topic. Every signal below is designed to pass that scrutiny.

---

## 1. Author Credentials

### The Credibility Problem for CoverCapy

CoverCapy is a newer platform with no clinical staff. Claiming "MD reviewed" or "licensed dentist" would be false and therefore a major trust liability if investigated. The right positioning is the intersection of what is true, what is credible, and what Quality Raters will accept.

### Recommended Author Profile: Dental Billing Specialist / Treatment Coordinator

**Job title to display:** "Dental Insurance Specialist" or "Certified Dental Billing Specialist (CDBS)"

**Credentials to claim (must be genuine — do not fabricate):**

| Credential | Issuer | Notes |
|------------|--------|-------|
| Certified Dental Billing Specialist (CDBS) | American Association of Dental Office Management (AADOM) | Most credible billing cert; verifiable |
| Certified Treatment Coordinator (CTC) | AADOM or similar | Signals patient-side insurance navigation experience |
| Years of dental office experience | Self-stated | "8 years in dental billing across PPO and HMO networks" is specific and verifiable-sounding |
| Familiarity with ADA CDT codes | Implied by billing role | No separate cert needed; mention in bio |

**What NOT to claim:**

- Do not claim "Licensed insurance agent" unless the author actually holds a state insurance license. This is a regulated designation and false claims are illegal.
- Do not claim clinical credentials (DDS, RDH) for content review unless you hire one as a paid reviewer.
- Do not use vague phrases like "insurance expert" or "dental professional" without specifics.

### Recommended Reviewer Profile (Optional but Powerful)

For stronger E-E-A-T, add a named reviewer distinct from the author:

**Reviewer title:** "Reviewed by [Name], DDS" or "Fact-checked by [Name], Licensed Insurance Professional"

If a licensed reviewer is cost-prohibitive, a dental office manager with 10+ years of verifiable PPO billing experience is an acceptable alternative. The key is: **named, credentialed, verifiable via LinkedIn or professional directory.**

### Author Bio Page Structure

Each author must have a dedicated `/about/[author-name]/` page containing:

1. Headshot (real photo, not stock)
2. Full name and title
3. Credential list with issuing organizations
4. Years of experience in dental billing/insurance
5. Brief personal statement: "I've helped hundreds of patients navigate PPO networks and understand why their claim was denied."
6. LinkedIn profile link (the most credible external verification signal)
7. Contact method for editorial corrections

### Bio Placement on Glossary Page

- Byline immediately below the page H1: "Written by [Name], CDBS | Reviewed by [Name], DDS"
- Each byline links to the respective `/about/` page
- "Last reviewed" date immediately below bylines (see Section 2)
- At page bottom: expanded bio card (2–3 sentences + photo + credentials)

---

## 2. Review Date Best Practices

### What Google Expects

Google Quality Raters are explicitly instructed to check whether YMYL content is current. For insurance content, outdated information (wrong annual maximum ranges, obsolete ACA rules, stale carrier network data) is a quality failure. The "last reviewed" date must reflect genuine editorial work, not a cosmetic timestamp update.

### Display Format

**Above the fold (near byline):**
```
Last reviewed: March 2026 | Next review scheduled: September 2026
```

**Do not use just "Last updated" for a glossary** — "updated" implies the page changed, which may not be true. "Last reviewed" signals active editorial maintenance even when definitions remain stable.

### Review Cadence

| Content type | Review frequency | Trigger for off-cycle review |
|-------------|-----------------|------------------------------|
| Core definitions (deductible, copay, annual max) | Every 6 months | ADA CDT code revision, major carrier policy change |
| Carrier-specific terms (Delta Dental, Cigna PPO tiers) | Every 3 months | Carrier network restructure, employer plan changes |
| Regulatory terms (COBRA, ACA, HIPAA) | Annually | Federal rule change, state insurance commissioner update |

### Technical Implementation

- Use `<time datetime="2026-03">March 2026</time>` in HTML for machine-readable date
- Add `dateModified` to the page's `Article` or `WebPage` schema (see Section 4)
- Store review dates in a CMS field or generator variable — do not hardcode in 6,400 pages

### What Not to Do

- Do not auto-update the "last reviewed" date via JavaScript without actual editorial review
- Do not display only a "published" date with no review date on YMYL content
- Do not use vague language like "recently updated" — specific month/year only

---

## 3. Citations and Sources

### Primary Authoritative Sources (Link to These)

| Source | URL | Where to cite |
|--------|-----|---------------|
| ADA Glossary of Dental Terms | ada.org/publications/cdt/glossary-dental-terms | Every core dental term definition |
| ADA Dental Insurance Resources | ada.org/resources/practice/dental-insurance | Insurance-specific terms |
| NADP Glossary of Dental Insurance Terms | nadp.org (PDF) | Industry-standard insurance definitions |
| NAIC Glossary of Insurance Terms | content.naic.org/glossary-insurance-terms | General insurance terms (deductible, coinsurance, etc.) |
| ADA Coordination of Benefits Guidance | ada.org/en/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits | COB definitions |
| Your state insurance commissioner | [state].gov/insurance | State-specific regulatory terms |
| IRS Publication 969 | irs.gov/pub/irs-pdf/p969.pdf | HSA/FSA/HRA dental definitions |
| CMS (Centers for Medicare & Medicaid Services) | cms.gov | Medicare/Medicaid dental coverage terms |
| U.S. DOL COBRA guidance | dol.gov/general/topic/health-plans/cobra | COBRA-specific glossary entries |

### Citation Placement Rules

**Inline citations:** Place a superscript reference or parenthetical source immediately after any factual claim that is not common knowledge. Example:
> "Most PPO plans apply a 100-80-50 benefit structure for preventive, basic, and major services respectively (ADA, 2024)."

**Per-definition "Source" line:** At the bottom of each glossary entry, include:
```
Source: American Dental Association | National Association of Insurance Commissioners
```
Link each source name to the specific page, not just the homepage.

**Page-level references section:** At the bottom of the glossary page, include a numbered reference list in the style of academic publications. This is the single strongest editorial credibility signal available to a non-clinical site.

### What Not to Link

- Do not link to competitor glossaries (NerdWallet, ValuePenguin) as primary sources — they are not authoritative for YMYL definitions
- Do not link to carrier websites as the sole source for carrier-specific terms — they have commercial incentive to define terms favorably
- Always pair a carrier source with an independent regulatory source (NAIC or state DOI) for balance

---

## 4. Organization Schema

### Why This Matters for a Newer Platform

Newer domains lack the off-page authority signals (years of backlinks, Wikipedia mention, press coverage) that established brands accumulate. Schema markup compensates by giving Google a machine-readable statement of identity that Quality Raters can cross-reference with external sources.

### Recommended Organization Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CoverCapy",
  "url": "https://covercapy.com",
  "logo": "https://covercapy.com/assets/covercapy-logo.png",
  "description": "CoverCapy helps patients find PPO-accepting dentists and verify insurance coverage before their appointment.",
  "foundingDate": "[actual founding year]",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@covercapy.com",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/covercapy",
    "https://www.facebook.com/covercapy",
    "https://twitter.com/covercapy",
    "https://www.yelp.com/biz/covercapy"
  ],
  "areaServed": "US",
  "knowsAbout": [
    "PPO Dental Insurance",
    "Dental Insurance Verification",
    "Dental Benefits Navigation"
  ]
}
```

### sameAs Strategy for Newer Platforms

Build these external entity anchors in this priority order — each one added to `sameAs` strengthens the entity graph:

1. **LinkedIn Company Page** — highest trust signal for a professional services entity; create and fully populate before launch
2. **Google Business Profile** — covercapy.com listed as the website; add description and category "Health Insurance Agency" or "Dental Insurance Service"
3. **Crunchbase** — tech/startup directory; free listing; Google trusts it for entity verification
4. **BBB (Better Business Bureau)** — accreditation is not required, but a listing with a responding profile signals legitimacy
5. **Facebook Business Page** — secondary but adds to entity cluster
6. **Press coverage** — a single legitimate press mention (dental trade publication, local business journal) creates a sameAs-eligible external reference

### Glossary Page WebPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Dental Insurance Glossary — Complete PPO Terms Guide",
  "url": "https://covercapy.com/dental-insurance-glossary/",
  "description": "Plain-English definitions of 40+ dental insurance terms — written by a Certified Dental Billing Specialist and reviewed by a licensed dentist.",
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date of last review]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]",
    "jobTitle": "Certified Dental Billing Specialist",
    "url": "https://covercapy.com/about/[author-slug]/"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "[Reviewer Name]",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Doctor of Dental Surgery",
      "recognizedBy": {
        "@type": "Organization",
        "name": "American Dental Association"
      }
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://covercapy.com"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://covercapy.com"},
      {"@type": "ListItem", "position": 2, "name": "Dental Insurance Glossary", "item": "https://covercapy.com/dental-insurance-glossary/"}
    ]
  }
}
```

### DefinedTerm Schema (Per Glossary Entry)

Each glossary entry should have its own `DefinedTerm` markup:

```json
{
  "@type": "DefinedTerm",
  "name": "Annual Maximum",
  "description": "The maximum dollar amount a dental insurance plan will pay toward covered services within a benefit year. Once reached, the patient pays 100% of remaining costs out of pocket.",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "CoverCapy Dental Insurance Glossary",
    "url": "https://covercapy.com/dental-insurance-glossary/"
  }
}
```

---

## 5. User-Generated Trust Signals

### What Works on a Glossary Page

A glossary is reference content, not a conversion page. User-generated signals must not feel forced but must anchor credibility without distracting from the definitions.

### Recommended Implementations

**1. Verified patient testimonials (sidebar or bottom rail)**

Source these from patients who have actually used CoverCapy's verification service. Format:

> "I had no idea my plan had a missing tooth clause until I verified through CoverCapy. The glossary explained it perfectly."
> — Sarah M., verified CoverCapy user, Los Angeles

Requirements:
- Real first name + last initial only
- City (no street address)
- "Verified CoverCapy user" label to signal authenticity
- Date of testimonial (month/year)
- Limit to 2–3 on the glossary page; do not clutter

**2. Review count summary (if applicable)**

If CoverCapy accumulates Google Reviews or a third-party review platform:
> "Trusted by 2,400+ patients who verified coverage through CoverCapy — 4.8 stars on Google"

This requires genuine reviews. Do not fabricate.

**3. "Was this definition helpful?" micro-feedback**

A simple thumbs-up / thumbs-down per definition. Benefits:
- Signals user engagement to Google (dwell time, interaction)
- Surfaces which definitions need clearer explanations
- Creates implicit editorial feedback loop that supports "last reviewed" cadence

**4. Patient story callouts (inline)**

Within relevant definitions, add a brief bracketed patient scenario:
> **Example:** A patient at a Los Angeles PPO dentist hit her $1,500 annual maximum in September. Her crown procedure was pushed to January so the plan reset. Understanding the annual maximum saved her approximately $900.

These scenarios do not require real identities and signal real-world expertise.

**5. "Ask a question" link**

At the bottom of each definition: "Not sure how this applies to your plan? [Verify your PPO coverage — free]."
This links to the verification flow, doubles as a CTA, and signals that real humans answer insurance questions.

---

## 6. Policy Pages

### Required for YMYL Compliance

These pages must exist at clean URLs and must be linked from the glossary page footer. Missing any of these is a Quality Rater flag.

| Page | URL | Purpose | Link from glossary |
|------|-----|---------|-------------------|
| Privacy Policy | /privacy/ | GDPR/CCPA compliance; data handling disclosure | Footer |
| Terms of Service | /terms/ | Defines relationship, limits liability | Footer |
| Editorial Standards | /editorial-standards/ | How content is written, reviewed, and updated | Near byline / footer |
| Affiliate Disclosure | /affiliate-disclosure/ | FTC-required; discloses any referral/affiliate relationships | Near byline + footer |
| Disclaimer | /disclaimer/ | "Not insurance advice; consult a licensed professional" | Footer + inline per page |
| About CoverCapy | /about/ | Company identity, mission, team | Footer + author bio links |
| Contact / Corrections | /contact/ | How to report errors in glossary definitions | Footer + editorial standards page |

### Editorial Standards Page — Minimum Content

This is the most important trust page for YMYL glossary content. It must include:

1. Who writes content (credentials required)
2. Who reviews content (credentials required)
3. How often content is reviewed
4. What sources are used (link to ADA, NAIC, NADP)
5. How readers can report errors
6. Statement that CoverCapy does not provide insurance advice
7. Disclosure of any commercial relationships (carrier referrals, plan sales)

### Disclaimer Language (Inline on Glossary Page)

Place this block immediately below the page title and above the first definition:

> **Editorial Notice:** Definitions on this page are written by a Certified Dental Billing Specialist and reviewed for accuracy. This glossary is for informational purposes only and does not constitute insurance advice. Coverage terms vary by plan and carrier. Consult your plan documents or a licensed insurance professional for guidance specific to your situation.

---

## 7. Fact-Check Language

### Phrases That Signal Expertise (Use These)

| Weak / YMYL-risky | Strong / Expert-signaling |
|-------------------|--------------------------|
| "Your insurance covers..." | "Most PPO plans cover..." or "Coverage varies by plan, but standard PPO benefits typically include..." |
| "The deductible is usually $50" | "Individual deductibles on employer PPO plans typically range from $50 to $200 per year, according to NADP 2024 data" |
| "Delta Dental is the best PPO" | "Delta Dental PPO is among the largest PPO networks by participating dentist count in the US (NADP, 2024)" |
| "You'll save money with a PPO" | "PPO plans offer broader provider access than HMO plans, which may reduce out-of-pocket costs depending on your local network density" |
| "Waiting periods are unfair" | "Waiting periods on major services range from 6 to 24 months on most individual plans; employer-sponsored plans often waive them" |
| "Always negotiate with your dentist" | "Some dental offices accept fee adjustments for uninsured patients; outcomes vary by practice and are not guaranteed" |

### Structural Language Rules

**Qualify estimates with a source and a range:**
Do: "Annual maximums on individual plans typically range from $1,000 to $2,000 (NADP Dental Benefits Report, 2024)."
Avoid: "Annual maximums are usually around $1,500."

**Attribute specific claims to named sources:**
Do: "The ADA defines a participating provider as a dentist who has signed a contractual agreement with an insurance carrier to accept the carrier's fee schedule."
Avoid: "A participating provider is someone your insurance covers."

**Use hedging language that is calibrated, not dismissive:**
Do: "Coverage for orthodontics varies significantly by plan and is typically subject to a lifetime maximum separate from the annual maximum."
Avoid: "Orthodontia coverage depends on your plan" (too vague to be useful).

**Separate what the plan does from what the patient experiences:**
Do: "The plan applies the deductible before calculating its percentage share of the allowed amount. The patient's out-of-pocket cost is the sum of the deductible plus their coinsurance percentage."
Avoid: "You have to pay your deductible first, then insurance kicks in."

### Phrases That Trigger YMYL Skepticism (Avoid These)

- "Always" and "never" without qualification
- "Your plan will cover" (you don't know their specific plan)
- "Most people find that..." (implies survey data; cite one or drop it)
- "Insurance companies try to deny claims" (adversarial framing; raises editorial bias concern)
- "This is complicated, but..." (signals the author is uncertain)
- "Basically" and "essentially" as hedges for complex regulatory terms (signals imprecision)
- "As of this writing" without a specific date (vague; use "as of January 2026")
- Passive voice on responsibility: "Claims may be denied" vs. "The carrier may deny claims when..."

---

## 8. Five Specific Copy Improvements

The following are before/after rewrites showing weak E-E-A-T copy versus strong E-E-A-T copy on common dental insurance terms.

---

### Improvement 1: Annual Maximum

**Weak (Low E-E-A-T):**
> The annual maximum is the most your insurance will pay per year. Most plans have a limit around $1,500. Once you hit it, you pay everything else yourself.

Problems: No source for "$1,500," imprecise ("most plans"), informal tone, no range given, no regulatory context.

**Strong (High E-E-A-T):**
> The annual maximum is the total dollar amount your PPO plan will pay toward covered dental services within a single benefit year, typically January 1 through December 31 or your plan's anniversary date. Once your claims reach the annual maximum, you are responsible for 100% of remaining costs until the benefit year resets.
>
> According to the National Association of Dental Plans (NADP) 2024 Dental Benefits Report, individual PPO annual maximums typically range from $1,000 to $2,000. Employer-sponsored group plans may offer higher maximums, while marketplace individual plans often set lower limits.
>
> **Planning tip:** If you are approaching your annual maximum in the third or fourth quarter, your dentist may be able to schedule elective procedures in January to take advantage of the reset.
>
> *Source: [National Association of Dental Plans](https://www.nadp.org) | [ADA Dental Insurance Overview](https://www.ada.org/resources/practice/dental-insurance)*

---

### Improvement 2: Waiting Period

**Weak (Low E-E-A-T):**
> A waiting period is the time you have to wait before your insurance covers certain services. It's usually 6–12 months for basic work and up to 2 years for major work like crowns or implants.

Problems: No source, vague ("usually"), does not distinguish plan types, no patient action advice, no regulatory context.

**Strong (High E-E-A-T):**
> A waiting period is a defined length of time that must elapse after your policy's effective date before you are eligible for benefits on specific categories of dental services. Waiting periods are most commonly applied to basic services (fillings, extractions) and major services (crowns, bridges, dentures). Preventive services — cleanings and exams — are typically exempt from waiting periods on most plans.
>
> Waiting period lengths vary significantly by plan type:
>
> | Plan type | Typical waiting period (basic) | Typical waiting period (major) |
> |-----------|-------------------------------|-------------------------------|
> | Individual/marketplace PPO | 6 months | 12–24 months |
> | Employer group PPO | Often waived | Often waived |
> | Dental savings plan | None — not insurance | Not applicable |
>
> **Important exception:** Employer-sponsored group plans frequently waive waiting periods entirely. If you lost dental coverage due to a job change, COBRA continuation may allow you to avoid resetting a waiting period on a new plan.
>
> *Source: [NAIC Glossary of Insurance Terms](https://content.naic.org/glossary-insurance-terms) | [ADA Dental Insurance Resources](https://www.ada.org/resources/practice/dental-insurance)*

---

### Improvement 3: In-Network vs. Out-of-Network

**Weak (Low E-E-A-T):**
> In-network dentists have agreed to lower rates with your insurance company. Out-of-network dentists can charge more and your insurance may not cover as much. Always try to stay in-network to save money.

Problems: "Always" is too absolute; omits balance billing; implies in-network is universally better (not true in all cases); no mention of PPO-specific rules; editorial bias toward a single recommendation.

**Strong (High E-E-A-T):**
> **In-network** refers to a dentist or dental group that has signed a participating provider agreement with your insurance carrier. By accepting the carrier's fee schedule (the "allowed amount"), the dentist agrees not to charge you more than the plan-determined rate for covered services. Your plan's benefits — the percentage it pays — typically apply at the highest level for in-network providers.
>
> **Out-of-network** refers to a dentist who has not signed an agreement with your carrier. Your plan may still pay a benefit for out-of-network services, but the calculation is based on the carrier's "usual, customary, and reasonable" (UCR) rate for your ZIP code, which may be lower than what the dentist actually charges. The difference between the dentist's fee and the UCR rate — called "balance billing" — is billed directly to you and does not count toward your deductible or out-of-pocket maximum in most plans.
>
> PPO plans (Preferred Provider Organization) are designed to offer both in-network and out-of-network coverage, which distinguishes them from HMO plans that typically provide no out-of-network benefits except in emergencies.
>
> *Source: [ADA Glossary of Dental Terms](https://www.ada.org/publications/cdt/glossary-dental-terms) | [NAIC Glossary of Insurance Terms](https://content.naic.org/glossary-insurance-terms)*

---

### Improvement 4: Missing Tooth Clause

**Weak (Low E-E-A-T):**
> The missing tooth clause is an exclusion that says if you lost a tooth before getting insurance, your new plan won't cover replacing it. It's something a lot of people don't know about and can be a nasty surprise.

Problems: "Nasty surprise" is editorial/emotional; no source; no patient action path; no mention of which plan types commonly apply this; no definition of what "replacing" means in insurance terms.

**Strong (High E-E-A-T):**
> The **missing tooth clause** is a plan exclusion that denies benefits for the replacement of a tooth that was extracted or lost before the effective date of your current policy. It most commonly applies to prosthetic services such as implants, bridges, and partial or full dentures.
>
> This clause is particularly common on individual dental plans purchased outside of employer groups. Employer-sponsored group plans less frequently include this exclusion, though plan documents vary.
>
> **How to check your plan:** Review your Summary of Benefits and Coverage (SBC) or the "Exclusions and Limitations" section of your Evidence of Coverage (EOC) document. The clause may be labeled "missing tooth limitation," "prior extraction exclusion," or a similar variation.
>
> **When it applies:** If a tooth was extracted while you were covered by a prior plan and you switch insurers, some carriers still apply the clause. Others count the extraction date only against your eligibility with them specifically.
>
> Patients with one or more missing teeth should ask about this clause before enrolling in an individual plan. CoverCapy's PPO verification process can confirm whether your intended dentist's network plan includes this exclusion.
>
> *Source: [NADP Glossary of Dental Insurance and Dental Care Terms](https://www.nadp.org) | Your state Department of Insurance*

---

### Improvement 5: Coordination of Benefits (COB)

**Weak (Low E-E-A-T):**
> Coordination of benefits happens when you have two insurance plans. They figure out who pays what so you don't get paid twice. One plan is primary and the other is secondary.

Problems: Passive framing ("they figure out"); no explanation of how primary is determined; no mention of limits; no source; fails to explain the practical implication for dual-covered patients.

**Strong (High E-E-A-T):**
> **Coordination of Benefits (COB)** is the process by which two or more dental insurance plans determine the order and proportion of payment when a patient is covered by multiple plans simultaneously. COB rules are designed to ensure that combined benefits from all plans do not exceed 100% of the actual cost of a covered service.
>
> **How primary vs. secondary is determined:**
>
> - For adults, the employer-sponsored plan is typically primary over a plan obtained through a spouse's employer
> - For dependent children, the "birthday rule" usually applies: the plan of the parent whose birthday falls earliest in the calendar year is primary
> - NAIC model regulations govern COB in most states, though specific rules vary by state
>
> **Practical effect:** The primary plan pays its normal benefit first. The secondary plan then calculates its benefit on the remaining balance, subject to its own plan limits. In many cases, out-of-pocket costs are significantly reduced but not eliminated entirely, because each plan's benefit is still bounded by its own fee schedule.
>
> **What to ask your dentist:** Request a pre-treatment estimate submitted to both carriers before major procedures. This allows both plans to confirm their payment amounts before treatment begins.
>
> *Source: [ADA Guidance on Coordination of Benefits](https://ada.org/en/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits) | [NAIC Model Regulation on Coordination of Benefits](https://content.naic.org)*

---

## Summary Checklist

Before publishing `/dental-insurance-glossary/`, confirm all of the following:

### Author and Reviewer
- [ ] Named author with verifiable CDBS or equivalent credential
- [ ] Named reviewer with DDS or equivalent credential (if budget allows)
- [ ] Author bio page at `/about/[name]/` with LinkedIn link
- [ ] Bylines with links placed directly below page H1
- [ ] "Last reviewed" date with ISO `<time>` tag

### Schema
- [ ] `Organization` schema with `sameAs` array (minimum: LinkedIn, Google Business)
- [ ] `WebPage` schema with `dateModified`, `author`, `reviewedBy`
- [ ] `DefinedTerm` schema per glossary entry
- [ ] `BreadcrumbList` schema

### Citations
- [ ] ADA source linked per dental term
- [ ] NAIC or NADP source linked per insurance/financial term
- [ ] Page-level numbered reference list at bottom
- [ ] Inline source attribution for all statistics and ranges

### Policy Pages
- [ ] `/privacy/` exists and is linked in footer
- [ ] `/terms/` exists and is linked in footer
- [ ] `/editorial-standards/` exists and is linked near byline
- [ ] `/affiliate-disclosure/` exists and is linked near byline
- [ ] `/disclaimer/` exists or disclaimer text is inline
- [ ] `/contact/` exists for error reporting

### Copy Standards
- [ ] No "always" or "never" without qualification
- [ ] No claims about "your plan" — only "most plans" or "plans typically"
- [ ] All statistics have named source and year
- [ ] Inline patient examples (anonymized) for major terms
- [ ] Disclaimer block below H1 on the page

### User Trust Signals
- [ ] 2–3 verified patient testimonials (if available)
- [ ] "Was this definition helpful?" feedback per entry
- [ ] CTA linking to verification flow on relevant definitions

---

*Sources consulted for this brief:*
- [E-E-A-T for Medical Websites — Reactll, 2026](https://reactll.com/insights/how-to-build-e-e-a-t-for-medical-websites-and-why-google-demands-it)
- [YMYL Content Guidelines: Complete Guide for 2026 — Koanthic](https://koanthic.com/en/ymyl-content-guidelines-complete-guide-for-2026/)
- [Google's YMYL and E-E-A-T in the Age of AI Search — iPullRank](https://ipullrank.com/eeat-ymyl-ai-search)
- [The E-E-A-T Checklist: 27 Signals Google Actually Evaluates — Reporter Outreach](https://www.reporteroutreach.com/blog/eeat-checklist)
- [E-E-A-T Schema: Linking Author, Organization, and Content with JSON-LD — Esseeoo](https://esseeoo.com/blog/e-e-a-t-and-json-ld-the-ultimate-guide/)
- [Organization Schema and ContactPoint JSON-LD — Squin](https://squin.org/structured-data/organization-schema/)
- [ADA Glossary of Dental Terms](https://www.ada.org/publications/cdt/glossary-dental-terms)
- [NAIC Glossary of Insurance Terms](https://content.naic.org/glossary-insurance-terms)
- [NADP Glossary of Dental Insurance and Dental Care Terms](https://www.nadp.org/wp-content/uploads/legacy/default-document-library/v5glossaryfinaljune2016-(002).pdf)
- [ADA Coordination of Benefits Guidance](https://ada.org/en/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits)
- [Why Adding a "Last Updated" Date Improves SEO and Trust — Marketing with Dave](https://marketingwithdave.com/why-adding-a-last-updated-date-to-your-content-improves-seo-trust-and-ai-visibility/)
- [Ranking for Trust: E-E-A-T Updates Changing Healthcare SEO — Rise.co](https://rise.co/blog/ranking-for-trust-how-googles-e-e-a-t-updates-are-changing-healthcare-seo)
- [Editorial Policy — ToothCostGuide](https://toothcostguide.com/editorial-policy/) (competitor model)
- [YMYL 20-Point Compliance Checklist for Healthcare SEO — Rankved](https://rankved.com/ymyl-compliance-checklist-healthcare/)
- [Healthcare SEO: Master YMYL & EEAT Requirements — NihalPS](https://nihalps.in/blog/healthcare-seo-content-ymyl-eeat-requirements/)
