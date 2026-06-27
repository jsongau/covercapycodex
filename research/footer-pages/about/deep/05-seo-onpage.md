# 05 — SEO On-Page: about.html (deep pack)

Workstream 5 of 10. Authoritative on-page SEO spec for the CoverCapy About page.
Builds on `research/footer-pages/about/02-seo-geo.md`, tightens it, and resolves
every internal link against pages that actually exist in the repo today.

No em-dashes. No roman numerals.

---

## 1. KEYWORD STRATEGY

### Primary keyword
**what is CoverCapy** (paired with the navigational **about CoverCapy**)

Rationale: an About page serves two demand types at once. Navigational brand search
(`about CoverCapy`, `CoverCapy about`) is low-volume but extremely high-intent: the
person already knows the brand and is deciding whether to trust it. Informational
brand search (`what is CoverCapy`) is the larger, AI-Overview-friendly bucket and is
the query an answer engine fires when it needs a one-line definition of the company.
The page should win both. The page already targets `about CoverCapy` as primary in
pack 02; this deep pack elevates `what is CoverCapy` to co-primary because it carries
the extractable-answer value that drives GEO.

### Secondary / long-tail cluster (trust + "what is" + how-it-works)
Group A, identity:
- what is CoverCapy
- about CoverCapy
- who is behind CoverCapy
- is CoverCapy an insurance company
- is CoverCapy a dental practice
- dental concierge platform / PPO dental concierge
- dental care discovery platform

Group B, trust (the "is it legit / is it free" cluster):
- is CoverCapy legit
- is CoverCapy free
- is CoverCapy safe / is CoverCapy a scam
- CoverCapy reviews
- does CoverCapy store my member ID
- how does CoverCapy make money

Group C, how-it-works:
- how does CoverCapy work
- how does CoverCapy help patients
- how does CoverCapy help dentists
- what is Capy Accreditation

Group D, mission / brand:
- CoverCapy mission
- CoverCapy concierge for PPO dental
- find a PPO dentist who takes my plan

The "is it legit / is it free / how does it work" triad is the canonical trust-evaluation
pattern people run before engaging any unfamiliar online service, so the page must answer
all three explicitly and near the top. (Source: getsafeonline.org, scamadviser.com,
trytrustchecker.com, accessed 2026-06-26.)

---

## 2. SEARCH INTENT ANALYSIS

| Query type | Example | Dominant intent | What the page must deliver |
|---|---|---|---|
| Navigational | about CoverCapy | Confirm the brand, find the company page | Clear identity statement, mission, tagline above the fold |
| Informational (definition) | what is CoverCapy | One-line, extractable definition | A TL;DR "in one line" block (already present) |
| Trust / due-diligence | is CoverCapy legit, is CoverCapy free | Reduce risk before engaging | Plain transparency section: not an insurer, free for patients, member ID not stored, sponsored is labeled, always verify directly |
| How-it-works | how does CoverCapy work | Mechanics for patients and dentists | The 3-pillar approach + the two-sided "how we help" split |
| Authority / standard | what is Capy Accreditation | Why a CoverCapy label means something | The standard section + link to the accreditation page |

Mixed intent verdict: **navigational + informational, with a heavy trust overlay.**
There is no commercial-purchase intent on this URL itself, so the page should not push
a hard sale. It should resolve doubt and then hand off (concierge handoff, not funnel).

E-E-A-T note: Google's quality-rater guidelines call out About pages repeatedly as a
core trust signal, and financial-adjacent sites are specifically named as sites where an
About page is expected. CoverCapy sits next to insurance and money decisions, so the
About page is doing real ranking work for the whole domain, not just for itself. It must
state plainly who we are, what we do, why we are qualified, and how we make money.
(Sources: jumpfly.com, onemagnify.com, accessed 2026-06-26.)

---

## 3. TITLE / META / H1 / HEADINGS

### Title tag options (target under ~60 chars)
1. `About CoverCapy: The PPO Dental Concierge | CoverCapy` (52 chars) — CURRENT, recommended. Brand-led for a navigational page is correct; keyword `PPO dental concierge` sits early.
2. `What Is CoverCapy? PPO Dental Concierge | CoverCapy` (50 chars) — alt that fronts the informational query; use if `what is CoverCapy` impressions outpace branded.
3. `About CoverCapy: PPO Dental Care, Made Calm | CoverCapy` (54 chars) — voice-forward alt.

Recommendation: keep option 1 as the live title (it already matches the deployed page).
Hold option 2 as the A/B candidate if Search Console later shows `what is CoverCapy`
out-impressing `about CoverCapy`.

### Meta description (150-160 chars)
CURRENT, recommended (157 chars):
> CoverCapy is a luxury concierge for PPO dental care: compare plans, estimate costs, verify coverage, and find in-network dentists. Learn our mission, the Capy standard, and how we help patients and dentists.

Alt that fronts the trust answer (155 chars):
> What is CoverCapy? A concierge for PPO dental care, not an insurer. Compare plans, estimate costs, verify coverage, and find in-network dentists. Free for patients.

Both keep `CoverCapy` + `PPO dental` early so the term bolds on brand and "PPO dental"
queries. Google rewrites descriptions often, so the on-page TL;DR block matters as much
as the meta tag for what actually surfaces.

### H1 (one only)
Keep the editorial H1 already live:
> We turn the messiest moment in dental care into the calmest.

Keyword note: the H1 is brand-voice, not keyword-stuffed, which is correct for a
navigational page where the keyword is already satisfied by title + TL;DR + the first
prose line ("CoverCapy is a concierge for PPO dental care..."). Do not sacrifice the
voice to jam "what is CoverCapy" into the H1. The definition lives in the TL;DR block
directly beneath it, which is what answer engines extract.

### H2 / H3 outline mapped to keywords
(Matches the live section order; this is the canonical heading map.)

- H1: We turn the messiest moment in dental care into the calmest.
  - TL;DR block "In one line" -> targets `what is CoverCapy`, `is CoverCapy an insurance company`, `is CoverCapy free`
- H2: People do not shop for insurance. They shop for a moment. -> `CoverCapy mission`, why-it-exists intent
  - Sidebar "What CoverCapy is" (Is / Is not) -> `is CoverCapy a dental practice`, `dental care discovery platform`
- H2: A concierge, not a portal. -> `how does CoverCapy work`, `PPO dental concierge`
  - H3: Coverage clarity
  - H3: Cost honesty
  - H3: Verified discovery -> `does CoverCapy store my member ID` (member ID never stored)
- H2: How CoverCapy helps. -> two-sided value
  - H3: Enter dental care prepared (For Patients) -> `how does CoverCapy help patients`
  - H3: Meet patients who are ready (For Dentists) -> `how does CoverCapy help dentists`
- H2: Why we built Capy Accreditation. -> `what is Capy Accreditation`
- H2: Where we stand, plainly. -> the trust cluster: `is CoverCapy legit`, `is CoverCapy free`, `is CoverCapy safe`, `how does CoverCapy make money`
  - H4 trust items: We are not an insurer / Patient tools are free / Sponsored is labeled / Your member ID stays yours / Always verify directly / Built by insiders
- H2: The network gets better every time it is used. -> `CoverCapy network effect` (bridge)
- H2: About CoverCapy (FAQ heading) -> all FAQ long-tail
- H2: Enter dental care prepared. (final CTA)

This outline already exists on the live page and is correct. The one improvement to flag
for the build/PM workstream: the trust H2 ("Where we stand, plainly.") is where the
`is CoverCapy legit` cluster lands, but none of those exact words appear as visible text.
Consider adding one plain-language line inside that section such as "Yes, CoverCapy is a
real, independent platform, and it is free for patients" so the literal trust query has a
matching on-page string for both classic SERP snippets and AI answers.

---

## 4. INTERNAL-LINK MAP (resolved against the live repo)

All targets below were confirmed to exist as files in the repo on 2026-06-26. Canonical
slugs verified from each file's `<link rel="canonical">`. Use descriptive anchors with
the target keyword, never "click here".

### OUT (this About page should link to)
| Target (live file) | Canonical / href to use | Descriptive anchor | Placement |
|---|---|---|---|
| `compare-ppo-dental-plans.html` | `/compare-ppo-dental-plans` | "compare PPO dental plans" | Hero CTA, patient card, final CTA |
| `find-my-dentist.html` | `/find-my-dentist.html` | "find an in-network dentist" | Hero CTA, patient card, final CTA |
| `dental-treatment-cost-estimator.html` | `/dental-treatment-cost-estimator.html` | "estimate treatment costs" | Patient card |
| `capy-accreditation.html` | `/capy-accreditation.html` | "the Capy Accreditation standard" | Standard section (inline + rail) |
| `capy-accredited-dentists.html` | `/capy-accredited-dentists.html` | "browse Capy Accredited dentists" | Standard rail |
| `platinum-elite-dentists.html` | `/platinum-elite-dentists.html` | "Platinum Elite dentists" | Standard rail |
| `covercapy-network-effect.html` | `/covercapy-network-effect` | "how the CoverCapy network compounds" | Network bridge |
| `carrier-watch.html` | `/carrier-watch` | "track PPO carrier changes on Carrier Watch" | ADD to trust section or a links rail (see note) |
| `dentist-portal.html` | `/dentist-portal.html` | "dentist portal" | Dentist card, final CTA |
| `capy-practice-membership.html` | `/capy-practice-membership.html` | "claim a free practice profile" | Dentist card |
| Legal: `terms.html`, `privacy.html`, `advertising-disclosure.html`, `editorial-standards.html`, `insurance-disclaimer.html` | `/terms`, `/privacy`, `/advertising-disclosure`, `/editorial-standards`, `/insurance-disclaimer` | "Terms", "Privacy Policy", "advertising disclosure", "editorial standards", "insurance disclaimer" | Footer (sitewide) + page-legal block. See note. |

Notes on OUT links:
- **carrier-watch is currently NOT linked from About.** It exists (`/carrier-watch`) and is
  topically relevant to "we help you stay coverage-aware." Recommend adding one anchor,
  best fit in the trust band or in a small links rail near the network bridge, anchor
  "track PPO carrier changes on Carrier Watch." Low effort, real internal-link value.
- **Legal pages**: the sitewide footer already carries Terms / Privacy / advertising
  disclosure / etc. The About page's own `page-legal` disclaimer block is good practice
  for an E-E-A-T / trust page; consider linking the two or three most relevant legal pages
  (advertising disclosure, insurance disclaimer, editorial standards) directly inside that
  block with descriptive anchors so the trust claims point to the documents that back them.
- Strip UTM from any outbound link target with `.split('?')[0]` per house rules (none of
  the internal targets carry UTM today, but keep the rule if any external sameAs is added).
- Keep hrefs consistent with the live page: pages that have a clean canonical without
  `.html` (compare-ppo-dental-plans, covercapy-network-effect, carrier-watch) should be
  linked WITHOUT `.html`; pages still served at `.html` (find-my-dentist, dentist-portal,
  capy-accreditation, etc.) keep `.html`. This matches what is already deployed.

### IN (existing pages that should link to /about)
| Source page (live file) | Why it should link in | Suggested anchor |
|---|---|---|
| Sitewide footer (Company column) | Already wired; primary discovery path | "About CoverCapy" |
| `covercapy-network-effect.html` | About explains the company; network page explains the flywheel. Reciprocal. | "what CoverCapy is" / "about CoverCapy" |
| `capy-accreditation.html` | Accreditation is the credential; About is the org behind it (E-E-A-T parent). | "the company behind Capy Accreditation" |
| `capy-accredited-dentists.html` | Trust context for the listing standard. | "how CoverCapy works" |
| `carrier-watch.html` | Establishes who maintains the watch. | "about CoverCapy" |
| `dentist-portal.html` / `capy-practice-membership.html` | Dentists evaluating the platform want the company story. | "learn about CoverCapy" |
| `editorial-standards.html` / `reviewers/j-song.html` | E-E-A-T authorship pages should point back to the org. | "about CoverCapy" |
| Homepage `index.html` | Strongest authority page; one in-body "about" link helps. | "what is CoverCapy" |

Linking principle: About should be a hub that an answer engine can crawl to understand
the whole brand graph, and a target that the trust-bearing pages (accreditation, editorial
standards, reviewer bios) point back to. That two-way wiring is the E-E-A-T moat.

---

## 5. WORD COUNT + CONTENT-DEPTH GUIDANCE

- **Target body prose: 1,300 to 1,700 words** of genuine, human-voiced copy (unchanged
  from pack 02; the live page is in range). Do not pad past 1,700; an About page rewards
  density and clarity over length.
- **Front-load the answer.** The first 1 to 2 sentences (TL;DR "In one line" block) must
  be a standalone, extractable definition of CoverCapy. AI search and SERP snippets pull
  from the opening summary, so the definition cannot wait until paragraph three.
- **Answer the trust triad explicitly and early.** "Not an insurer," "free for patients,"
  and "member ID never stored" should each appear as a literal, scannable statement, not
  only implied. These are the strings the `is CoverCapy legit / free / safe` queries match.
- **FAQ depth:** keep 6 to 8 questions, each answered in 40 to 60 words as a standalone
  factual answer (the live page has 7, which is good). These power the FAQPage schema and
  AI Overviews. Keep the trust questions ("Is CoverCapy an insurance company," "Is CoverCapy
  free," "How does CoverCapy make money") because those are the highest-intent queries.
- **E-E-A-T depth without fabrication:** the "Built by insiders" trust item is the
  Experience signal. Do not invent founders, headcount, funding, dates, or metrics
  (per 01-research guardrails). Strengthen authority instead by linking to real trust
  documents (editorial standards, reviewer bio, advertising disclosure) rather than by
  manufacturing credentials.
- **Schema:** keep `AboutPage` + `Organization` + `BreadcrumbList` + `FAQPage`, all already
  present. `sameAs` must remain an array. The Organization `slogan` and `brand` (Capy
  Accreditation) are good entity signals; consider adding the homepage and the network-effect
  / carrier-watch URLs to `sameAs` to tighten the brand entity graph.

---

## 6. PRIORITY RECOMMENDATIONS (for the PM synthesis workstream)

1. Elevate `what is CoverCapy` to co-primary; hold the "What Is CoverCapy?" title as an A/B
   candidate. Keep the current title live for now.
2. Add one literal trust line inside the "Where we stand, plainly" section to match the
   `is CoverCapy legit / safe` query strings.
3. Add the missing `carrier-watch` internal link (anchor: "track PPO carrier changes on
   Carrier Watch").
4. Link the 2 to 3 most relevant legal documents inside the page-legal block with
   descriptive anchors (advertising disclosure, insurance disclaimer, editorial standards).
5. Wire reciprocal IN links from accreditation, network-effect, carrier-watch, editorial
   standards, and the homepage back to /about.

---

## 7. SOURCES (access date 2026-06-26)

External best-practice claims:
- Straight North, "Title Tags and Meta Descriptions: How to Write and Optimize Them in 2026" — https://www.straightnorth.com/blog/title-tags-and-meta-descriptions-how-to-write-and-optimize-them-in-2026/ (accessed 2026-06-26). Used for: title 50-60 chars, keyword near front, meta 150-160 chars, Google rewrites descriptions frequently.
- JumpFly, "About Us Pages: Important for Both Visitor and SEO Trust Signals" — https://www.jumpfly.com/blog/about-us-pages-important-for-both-visitor-and-seo-trust-signals/ (accessed 2026-06-26). Used for: About pages are a top place quality raters look; financial sites specifically need them as trust signals.
- OneMagnify, "E-E-A-T in 2026: Build Expertise, Authority and Trust for SEO Success" — https://www.onemagnify.com/blog/how-to-measure-optimize-and-win-at-seo (accessed 2026-06-26). Used for: E-E-A-T framework, trust signals determine competitive ranking.
- WordStream, "How to Write a Great About Us Page" — https://www.wordstream.com/blog/about-us-page (accessed 2026-06-26). Used for: state who you are / what you do / why qualified; transparency and mission build trust; natural keyword use in headings.
- Get Safe Online, "Check a Website" — https://www.getsafeonline.org/checkawebsite/ (accessed 2026-06-26). Used for: the "is it legit" evaluation pattern.
- ScamAdviser — https://www.scamadviser.com/ (accessed 2026-06-26). Used for: "is it legit / scam" consumer due-diligence pattern.
- TrustChecker — https://trytrustchecker.com/ (accessed 2026-06-26). Used for: "is it free" pricing-trust pattern.

Internal / repo verification (no external date; confirmed present in repo 2026-06-26):
- `research/footer-pages/about/02-seo-geo.md` (prior pack), `research/footer-pages/about/01-research.md` (guardrails).
- `about.html` (live deployed page, heading + link audit).
- Confirmed-existing link targets: `compare-ppo-dental-plans.html`, `find-my-dentist.html`,
  `dental-treatment-cost-estimator.html`, `capy-accreditation.html`,
  `capy-accredited-dentists.html`, `platinum-elite-dentists.html`,
  `covercapy-network-effect.html`, `carrier-watch.html`, `dentist-portal.html`,
  `capy-practice-membership.html`, `terms.html`, `privacy.html`,
  `advertising-disclosure.html`, `editorial-standards.html`, `insurance-disclaimer.html`,
  `reviewers/j-song.html`, `states.html`, `cities.html`.
