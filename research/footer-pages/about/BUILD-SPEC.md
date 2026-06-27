# BUILD-SPEC — about.html (single authoritative blueprint)
## Lead PM synthesis of workstreams 01 to 10. Build from THIS file only.

This is the one source of truth for the upgraded CoverCapy About page. Every conflict between
the 10 research packs has been resolved and the final decision stated inline. The constructor
should not need to open the source packs. Repo root:
`/Users/kytlegacy/covercapycodex ultimate 21JUN26`. Output file: `about.html` at repo root
(it already exists and is live; this spec UPGRADES it in place).

Canonical About URL: `https://www.covercapy.com/about`
Site origin: `https://www.covercapy.com`

---

## 0. DISK TRUTH (verified 2026-06-26, resolves agent disagreements)

The packs disagreed on two assets. Verified directly on disk:

| Asset | Pack claim | TRUTH ON DISK | Decision |
|---|---|---|---|
| `assets/images/covercapy-logo.svg` | WS6 "if it does not exist, add it"; WS9 says it exists | **EXISTS** (678 KB, valid `<svg>`, 3000x3000, viewBox `0 0 2250 2250`) | Logo asset is real. Schema MAY use it. |
| `assets/images/covercapy-logo.png` | (not disputed) | **EXISTS** (960 KB raster) | **Use the PNG in Organization `logo`** (Google prefers raster, crawlable, >112x112). SVG is heavy and filter-based. |
| `editorial-standards.html` | WS2 "does NOT yet exist" | **EXISTS** (10.3 KB, canonical `/editorial-standards`) | It exists. Link to it. WS2's gap note is stale. |
| `assets/og-hub.png` | WS9 "exists, safest og:image" | **EXISTS** (50 KB) | Use as `og:image`. |
| `reviewers/j-song.html` | WS5 reference | **EXISTS** | Real reviewer page; eligible IN-link source, not required on About. |
| Legal pages (insurance-disclaimer, advertising-disclosure, provider-listing, privacy, terms, carrier-watch, accessibility, contact) | WS5/WS7 | **ALL EXIST** | All linkable. |

Net effect: there are NO blocking missing assets. The logo and editorial-standards page are
both real, so the schema logo and the trust-section links are both safe to ship.

---

## 1. FINAL HEAD (paste-ready)

Keep the live title and OG block (already deployed and correct). Decisions:
- Title: keep current (52 chars, brand-led, correct for a navigational page). WS5 confirms.
- Meta description: tighten the live one. The live version starts "luxury concierge" (157 chars).
  Keep "luxury concierge" wording but the FINAL string below is 156 chars and leads with the
  definition. This is the build target.
- Keywords: keep live set (harmless, on-topic).
- Canonical: `https://www.covercapy.com/about` (no `.html`). Already correct.
- GA + AdSense + fonts: copy VERBATIM from the live page (shown below). Do not alter IDs.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>About CoverCapy: The PPO Dental Concierge | CoverCapy</title>
<meta name="description" content="CoverCapy is a concierge for PPO dental care: compare plans, estimate costs, verify coverage, and find in-network dentists. Our mission, the Capy standard, free for patients.">
<meta name="keywords" content="about CoverCapy, what is CoverCapy, CoverCapy mission, dental concierge platform, PPO dental concierge, find a PPO dentist, is CoverCapy an insurance company, dental care discovery platform, Capy Accreditation standard, dental concierge for patients">
<link rel="canonical" href="https://www.covercapy.com/about">

<!-- Open Graph / social -->
<meta property="og:type" content="website">
<meta property="og:title" content="About CoverCapy: The PPO Dental Concierge | CoverCapy">
<meta property="og:description" content="CoverCapy is a concierge for PPO dental care. Compare plans, estimate costs, verify coverage, and find a modern in-network dentist. We are a guidance platform, not an insurer.">
<meta property="og:url" content="https://www.covercapy.com/about">
<meta property="og:image" content="https://www.covercapy.com/assets/og-hub.png">

<!-- CoverCapy Google Analytics / Google tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XNBPGSZ1LZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XNBPGSZ1LZ');
</script>

<!-- CoverCapy Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8699915070570206" crossorigin="anonymous"></script>

<!-- Sitewide CoverCapy shell presets: load before this page's CSS so nav/footer palette wins globally -->
<link rel="stylesheet" href="/mega-nav.css">
<link rel="stylesheet" href="/footer.css">

<!-- Fonts: distinctive editorial serif + clean modern sans -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,0,600;9..144,1,400;9..144,1,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

CHANGE vs live: (1) meta description shortened/refocused, (2) ADD `og:image`. Everything else
is verbatim-from-live.

---

## 2. FINAL JSON-LD (paste-ready, reconciled)

Ship FIVE separate `<script type="application/ld+json">` blocks in the head. This REPLACES the
live page's four blocks (which had no `@id` graph, an internal-only `sameAs`, and no logo).

Reconciliation decisions across WS3, WS5, WS6:
- **One Organization node** with stable `@id` `https://www.covercapy.com/#organization`, reused by
  AboutPage and WebSite (WS3 + WS6). Removes the duplicate Organization that the live page had.
- **`logo`**: include it (asset exists) using the **PNG** absolute URL. WS6 wanted it; WS3 wanted it;
  asset is real.
- **`sameAs`**: the two internal CoverCapy URLs are REMOVED from `sameAs` (WS3 is correct: sameAs is
  for external same-entity profiles only). No real external profiles exist yet, so **`sameAs` is
  OMITTED entirely** rather than shipped empty or shipped with internal links. The two internal
  pages move to `relatedLink` on the AboutPage (WS3 guidance: internal links belong in
  relatedLink / mainEntityOfPage, not sameAs).
- **`sameAs` rule honored**: where present anywhere it must be an ARRAY. We omit it, which also
  satisfies the rule. Add a real `sameAs` array later when LinkedIn/Crunchbase/Wikidata go live.
- **FAQPage**: 6 questions, EXACTLY matching the on-page accordion (WS10 recommended set). Answer
  text is word-for-word identical to the visible accordion (Section 3 of this spec).
- No invented founders, dates, headcount, address, or phone. `contactPoint` uses the real support
  email only.

### BLOCK 1 — Organization
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.covercapy.com/#organization",
  "name": "CoverCapy",
  "url": "https://www.covercapy.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.covercapy.com/assets/images/covercapy-logo.png"
  },
  "image": "https://www.covercapy.com/assets/images/covercapy-logo.png",
  "description": "CoverCapy is a concierge and discovery platform for PPO dental care. It helps people compare PPO dental plans, estimate treatment costs, verify coverage at a specific office, and find in-network dentists across the United States. CoverCapy is a guidance and discovery platform, not an insurance carrier or a dental practice.",
  "slogan": "Get cover today, see a dentist tomorrow.",
  "brand": { "@type": "Brand", "name": "Capy Accreditation" },
  "knowsAbout": [
    "PPO dental insurance",
    "Dental insurance plan comparison",
    "Dental coverage verification",
    "In-network dentist discovery",
    "Dental treatment cost estimation",
    "Dental PPO networks"
  ],
  "areaServed": { "@type": "Country", "name": "United States" },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "contact@covercapy.com",
    "areaServed": "US",
    "availableLanguage": "English"
  }
}
</script>
```
Note: `sameAs` intentionally absent (no real external profiles yet). Add later as an ARRAY when
LinkedIn / Crunchbase / Wikidata / GBP exist. Do NOT put internal URLs in `sameAs`.

### BLOCK 2 — AboutPage
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.covercapy.com/about#aboutpage",
  "url": "https://www.covercapy.com/about",
  "name": "About CoverCapy",
  "description": "CoverCapy is a dental concierge and discovery platform for PPO dental care. It helps people compare PPO plans, estimate costs, verify coverage, and find in-network dentists. This page explains the mission, the Capy Accreditation standard, and how CoverCapy helps patients and dentists.",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://www.covercapy.com/#website" },
  "about": { "@id": "https://www.covercapy.com/#organization" },
  "mainEntity": { "@id": "https://www.covercapy.com/#organization" },
  "relatedLink": [
    "https://www.covercapy.com/capy-accreditation",
    "https://www.covercapy.com/covercapy-network-effect"
  ]
}
</script>
```

### BLOCK 3 — WebSite
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.covercapy.com/#website",
  "url": "https://www.covercapy.com",
  "name": "CoverCapy",
  "description": "Concierge and discovery platform for PPO dental care. Compare PPO plans, estimate treatment costs, verify coverage, and find in-network dentists.",
  "inLanguage": "en-US",
  "publisher": { "@id": "https://www.covercapy.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.covercapy.com/find-my-dentist?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### BLOCK 4 — BreadcrumbList
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com" },
    { "@type": "ListItem", "position": 2, "name": "About CoverCapy", "item": "https://www.covercapy.com/about" }
  ]
}
</script>
```

### BLOCK 5 — FAQPage (6 items, MUST match the visible accordion word-for-word)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.covercapy.com/about#faq",
  "isPartOf": { "@id": "https://www.covercapy.com/about#aboutpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CoverCapy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CoverCapy is a concierge and discovery platform for PPO dental care. It helps people compare PPO dental plans, estimate treatment costs, verify that a specific office takes their exact network, and find a modern in-network dentist across the United States. CoverCapy is a guidance platform, not an insurance carrier and not a dental practice."
      }
    },
    {
      "@type": "Question",
      "name": "Is CoverCapy an insurance company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. CoverCapy does not sell, underwrite, or administer insurance, and it is not a dental practice or a broker of record. It is an independent guidance and discovery platform that helps patients understand PPO plans and find in-network dentists. Always verify benefits and pricing directly with your carrier and office."
      }
    },
    {
      "@type": "Question",
      "name": "Is CoverCapy free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. CoverCapy is free for patients. You can compare PPO plans, estimate treatment costs, verify coverage at an office, and find in-network dentists at no cost. Some dentist listings belong to paid membership or visibility programs and are clearly labeled, which is what keeps the patient experience free."
      }
    },
    {
      "@type": "Question",
      "name": "How does CoverCapy work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CoverCapy works as a concierge for the moment care begins. You compare PPO plans in plain language, estimate what a treatment will roughly cost, confirm a dentist takes your exact PPO network, then get handed off to a modern in-network office. You enter care prepared instead of guessing. Free for patients."
      }
    },
    {
      "@type": "Question",
      "name": "How does CoverCapy make money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CoverCapy keeps patient tools free and earns revenue from dental practices through membership, accreditation, and visibility programs. Sponsored or featured placements are clearly labeled. Patient guidance is never sold to the highest bidder, and a paid listing never replaces your own independent verification of a provider's coverage and credentials."
      }
    },
    {
      "@type": "Question",
      "name": "Is CoverCapy legit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CoverCapy is a transparent guidance platform: patient tools are free, sponsored placements are labeled, and it never stores your insurance member ID. It is not an insurer and makes no coverage guarantees. It helps you prepare, then asks you to confirm benefits, pricing, and network participation directly with your carrier and office."
      }
    }
  ]
}
</script>
```

FAQ RECONCILIATION: the live page shipped 7 FAQs (with "help patients" + "help dentists" but no
"how does it work" / "is it legit"). WS10's strongest-6 set REPLACES that. The two dropped Qs
("help patients", "help dentists") are already answered in the visible Patients/Dentists split
(Section 3, blocks 4 and 5), so no content is lost. The 6 schema Qs above are the ONLY visible
accordion items, in this exact order, with these exact answers.

---

## 3. FINAL PAGE OUTLINE + COPY (section by section)

Section order, layout, and motion follow WS9. Final copy follows WS8 (refined). Use the live
`.about-page` CSS (Section 6); only the content/structure below changes.

Render rules: a word in *asterisks* is set italic display (Fraunces, `--teal-700`). `[LABEL]`
markers are guides, never literal text. No em-dashes. No roman numerals.

### S0. Mega-nav mount (sitewide, out of scope)
`<div id="covercapy-mega-nav" data-include="/mega-nav.html"></div>`

### S1. HERO (plain bg, text only, no motion, generous top air)
- Eyebrow: `CoverCapy · About` (use middot `&middot;`, not a slash).
- H1 (the ONE H1): `We turn the messiest moment in dental care into the *calmest*.`
- Lead: `CoverCapy is a concierge for PPO dental care. We help you understand your coverage, see what a visit will really cost, and find a modern dentist who takes your exact plan. We meet you at the moment care actually begins, then hand you off cleanly to a real office.`
- Tagline (italic Fraunces, teal): `Get cover today, see a dentist tomorrow.`
- Hero CTA row: primary teal `Compare PPO dental plans` -> `/compare-ppo-dental-plans`;
  ghost `Find an in-network dentist` -> `/find-my-dentist.html`.

### S1b. QUICK ANSWER (the GEO-extractable block, sits high, plain text, mint left rule)
- Label: `In one line`
- Body (lock this wording, it is the canonical entity sentence + scope):
  `CoverCapy is a concierge and discovery platform for PPO dental care, not an insurance carrier or a dental practice. We help you compare PPO dental plans, estimate treatment costs, verify whether a dentist takes your exact PPO network, and find a modern, in-network office across the United States. It is free for patients.`

### S2. THE PROBLEM (`.band`, two-col: prose left, Is/Is-not clarifier right)
- Eyebrow: `Why We Exist`
- H2 (question-adjacent, keep voice): `People do not shop for insurance. They shop for a moment.`
- Prose p1: `A cracked tooth on a Sunday night. A new baby and a first set of benefits no one has read yet. A wedding photo six weeks away. A move to a city where you know no one. A job change that quietly swapped one dental plan for another. These are the moments that send people looking for a dentist. Almost no one wakes up wanting to study a carrier brand.`
- Prose p2 (three questions inline-bold): `At that moment, three questions arrive at once: <b>Am I actually covered. What will this really cost me. And who near me takes my exact plan.</b> The honest answer is usually a shrug. Every practice online describes itself with the same words, gentle, modern, advanced, caring, and those words are easy to write and hard to confirm from a website.`
- Prose p3: `The friction is not a lack of dentists or a lack of insurance. It is the gap between the two, at the exact moment a person needs an answer. Dental offices feel it too. Reaching the right patient is expensive, and people leave when the experience is confusing rather than clear. CoverCapy exists to close that gap with a calm, prepared handoff.`
- Clarifier panel header: `What CoverCapy is`
  - Is: `A concierge that clarifies coverage, cost, and in-network fit before you go.`
  - Is: `A discovery layer for modern, in-network PPO dentists across the United States.`
  - Is not: `An insurance carrier, broker of record, or a dental practice.`
  - Is not: `A generic comparison grid or a plain healthcare directory.`

### S3. THE APPROACH / WHAT WE DO (plain bg, 3 pillar cards)
- Eyebrow: `Our Approach`
- H2: `A concierge, not a portal.`
- Lead: `We do not hand you a spreadsheet and wish you luck. We sit beside you the way a good concierge would, then hand you off cleanly to a real dentist.`
- Pillar 1 `Coverage clarity`: `We translate PPO plans into plain language, so you know what your plan does and does not cover before you sit in the chair, not after the bill arrives.`
- Pillar 2 `Cost honesty`: `We help you estimate what you will actually owe, in ranges rather than false precision, so the bill is never the surprise. The numbers are illustrative, never a quote.`
- Pillar 3 `Verified discovery`: `We confirm a dentist takes your exact PPO network, and surface modern, in-network offices near you. Think of it as a coverage check for dental, run before the visit, with your member ID never stored.`

NOTE: WS8 lists a 4th pillar ("clean handoff"). DECISION: keep the live 3-pillar grid (3-up
reads better and the handoff idea is already in the hero lead and the network bridge). The
handoff is covered, do not add a 4th card.

### S4 + S5. HOW IT WORKS, two-audience split (`.band`, teal patient card + amber dentist card)
- Eyebrow: `Two Sides, One Standard`
- H2: `How CoverCapy works.` (changed from live "How CoverCapy helps." to match the GEO query
  "how does CoverCapy work")
- PATIENT card (teal): eyebrow `For Patients`; H3 `Enter dental care prepared.`
  - `Compare PPO dental plans without the jargon.`
  - `Estimate what a treatment will really cost, in honest ranges.`
  - `Verify a dentist takes your exact PPO network before you go.`
  - `Find a modern, in-network office near you.`
  - reassurance line: `Free for patients. We are a guidance platform, not your insurer and not your dentist, and your member ID stays yours.`
  - CTAs: teal `Compare PPO plans` -> `/compare-ppo-dental-plans`; ghost `Estimate treatment costs` -> `/dental-treatment-cost-estimator.html`
- DENTIST card (amber): eyebrow `For Dentists`; H3 `Meet patients who are ready.`
  - `A clean, verified profile that earns patient trust.`
  - `Coverage-aware patients who arrive ready to book.`
  - `Earn Capy Accreditation through a real review.`
  - `Upgrade visibility on a fair, clearly labeled ladder.`
  - honesty line: `Placement is reviewed and labeled, never sold as a guaranteed number of patients.`
  - CTAs: amber `Dentist portal` -> `/dentist-portal.html`; ghost `Claim a free practice profile` -> `/capy-practice-membership.html`

### S6. THE STANDARD, Capy Accreditation (plain bg, prose + gold pull-quote + links rail)
- Eyebrow: `The Standard`
- H2: `Why we built Capy Accreditation.`
- Prose p1 (inline link on "Capy Accreditation"): `Claims are easy. Verification is the hard part, and it is the part a patient cannot do alone from a website. So we built a standard. Capy Accreditation is a private CoverCapy credential that reviews practices against published markers of modern, technology forward, patient first care. It replaces vague promises with reviewed signals.`
  - inline link href: `/capy-accreditation.html`, anchor text `Capy Accreditation`.
- Prose p2: `It is selective by design. Membership begins a review, it does not grant the credential. An office can be approved, conditionally approved, asked to improve first, or declined. If every office automatically qualified, the credential would mean nothing, and that is exactly the point. It is not a government certification and not a dental license, and it never replaces your own check of a provider's credentials.`
- Pull-quote callout (gold left rule, Fraunces ~1.18rem): `When you see a Capy Accredited office, you are seeing a practice CoverCapy has actually reviewed, not just one that wrote nice words about itself.`
- Links rail (pills): `The Capy Accreditation standard` -> `/capy-accreditation.html`;
  `Browse Capy Accredited dentists` -> `/capy-accredited-dentists.html`;
  `Platinum Elite dentists` -> `/platinum-elite-dentists.html`.

### S7. TRUST + TRANSPARENCY (`.band`, 6 plain principle cards) — strengthened per WS2/WS5/WS7
- Eyebrow: `Trust And Transparency`
- H2: `Where we stand, plainly.`
- Add ONE literal legitimacy line directly under the H2 (WS5 rec, matches "is CoverCapy legit"
  query): `Yes, CoverCapy is a real, independent platform, and it is free for patients. Here is exactly how we operate, so you can judge for yourself.`
- 6 cards (titles are H4):
  1. `We are not an insurer` — `CoverCapy does not sell, underwrite, or administer insurance, and we are not a dental practice. We are an independent guidance and discovery platform. See our insurance disclaimer.` (link "insurance disclaimer" -> `/insurance-disclaimer.html`)
  2. `Patient tools are free` — `Comparing plans, estimating costs, verifying coverage, and finding dentists are free for patients. Our revenue comes from practice programs, not from you.`
  3. `Sponsored is labeled` — `Some listings are part of paid membership or visibility programs. When a placement is sponsored or featured, it is clearly labeled. See our advertising disclosure.` (link "advertising disclosure" -> `/advertising-disclosure.html`)
  4. `Your member ID stays yours` — `When we verify coverage, we record only that verification was provided. The member ID itself is never stored on our platform. See our Privacy Policy.` (link "Privacy Policy" -> `/privacy.html`)
  5. `Always verify directly` — `We help you prepare, but benefits, pricing, network participation, and credentials should always be confirmed directly with your carrier and the office before you make a care decision.`
  6. `Built by insiders` — `CoverCapy is built with a working knowledge of how dental offices and PPO networks actually operate, from eligibility checks to estimates to the money conversation at the front desk, so the guidance reflects the real chair-side experience.`
- Plan-facts-vs-listing split (WS7's load-bearing consistency point): the wording above keeps
  "sponsored placement can move where a dentist appears" separate from "what we say a plan covers
  is never bought." That distinction is preserved by card 3 (placement) plus the editorial
  standards link (plan facts). Optionally add the anchor `editorial standards`
  (-> `/editorial-standards.html`) inside card 3 after "advertising disclosure." Editorial
  standards page EXISTS, so this link is safe.

### S8. NETWORK BRIDGE (plain bg wrap, single deep-teal panel, the visual peak)
- Eyebrow (mint on dark): `The Bigger Idea`
- H2 (white): `The network gets better every time it is used.`
- Body: `Every verified office and every prepared patient makes the next match a little better. A patient who arrives knowing their network and their likely cost is a better patient for the office, and an office that has been reviewed and confirmed is a safer choice for the next patient. That is why CoverCapy is built as a network rather than a list. It is a quiet flywheel, and it is the reason the guidance compounds rather than going stale.`
- Mint text link: `Read how the CoverCapy network compounds →` -> `/covercapy-network-effect.html`

### S9. FAQ ACCORDION (`.band`, native `<details>`, 6 items, centered, max ~880px)
- Eyebrow: `Questions`
- H2: `About CoverCapy`
- The 6 `<details>` summary+answer pairs use the EXACT 6 questions and EXACT answer text from
  the FAQPage JSON-LD in Section 2 (Block 5), in that order. Word-for-word parity is mandatory.

### S10. FINAL CTA (plain bg, centered, airy, 3 buttons)
- Eyebrow: `Get Started`
- H2: `Enter dental care prepared.`
- Subhead: `Compare a plan, estimate a cost, or find a modern dentist who takes your exact PPO network. It takes a few minutes, it is free for patients, and you walk in knowing where you stand.`
- Buttons: teal `Compare PPO plans` -> `/compare-ppo-dental-plans`; ghost `Find a dentist` ->
  `/find-my-dentist.html`; amber `Dentist portal` -> `/dentist-portal.html`.
- Keep tight; the sitewide footer carries its own CTA tiles. Do not over-repeat.

### S11. PAGE LEGAL NOTE (scoped small print, above footer)
`Disclaimer. CoverCapy is a dental guidance and discovery platform. It is not an insurance carrier, broker of record, or dental practice, and it does not provide insurance or dental care. Some listings or links may be sponsored, and sponsored or featured placements are labeled. Capy Accreditation is a private CoverCapy credential and is not a government certification, dental license, or guarantee of clinical outcomes. Cost figures shown anywhere on CoverCapy are illustrative and are not a quote. Always verify benefits, pricing, provider participation, credentials, availability, and treatment costs directly with the carrier and dental office before making care decisions.`
- Optionally end with inline links: `Terms` -> `/terms.html`, `Privacy` -> `/privacy.html`,
  `advertising disclosure` -> `/advertising-disclosure.html`, `insurance disclaimer` ->
  `/insurance-disclaimer.html`, `editorial standards` -> `/editorial-standards.html`.

### S12. Footer mount (sitewide, out of scope)
`<div id="covercapy-footer" data-include="/footer.html"></div>` + the live shell loader + reveal
IntersectionObserver script (keep both verbatim from live).

---

## 4. SEO DIRECTIVES

- **H1 (exactly one):** `We turn the messiest moment in dental care into the calmest.` (editorial,
  brand-voice; the keyword definition lives in the quick-answer block, which is correct).
- **Heading map (visible H2s, several question-shaped per WS3/WS5):**
  - H2 `People do not shop for insurance. They shop for a moment.`
  - H2 `A concierge, not a portal.` (H3s: Coverage clarity / Cost honesty / Verified discovery)
  - H2 `How CoverCapy works.` (H3s: Enter dental care prepared. / Meet patients who are ready.)
  - H2 `Why we built Capy Accreditation.`
  - H2 `Where we stand, plainly.` (H4s: the 6 trust titles)
  - H2 `The network gets better every time it is used.`
  - H2 `About CoverCapy` (FAQ)
  - H2 `Enter dental care prepared.` (final CTA)
- **No skipped heading levels.** FAQ uses `<summary>` text, not headings.
- **Internal-link list (exact href + anchor). HREF CONVENTION RESOLVED:** match what is deployed.
  Clean-URL (no `.html`) for pages whose live canonical drops `.html`; keep `.html` for the rest.
  Verified against each target file's canonical on 2026-06-26.

| Anchor text | href | Placement |
|---|---|---|
| Compare PPO dental plans | `/compare-ppo-dental-plans` | hero, patient card, final CTA |
| Find an in-network dentist | `/find-my-dentist.html` | hero |
| Find a dentist | `/find-my-dentist.html` | final CTA |
| Estimate treatment costs | `/dental-treatment-cost-estimator.html` | patient card |
| Capy Accreditation | `/capy-accreditation.html` | standard prose (inline) |
| The Capy Accreditation standard | `/capy-accreditation.html` | standard rail |
| Browse Capy Accredited dentists | `/capy-accredited-dentists.html` | standard rail |
| Platinum Elite dentists | `/platinum-elite-dentists.html` | standard rail |
| Dentist portal | `/dentist-portal.html` | dentist card, final CTA |
| Claim a free practice profile | `/capy-practice-membership.html` | dentist card |
| Read how the CoverCapy network compounds | `/covercapy-network-effect.html` | network bridge |
| insurance disclaimer | `/insurance-disclaimer.html` | trust card 1, legal note |
| advertising disclosure | `/advertising-disclosure.html` | trust card 3, legal note |
| Privacy Policy / Privacy | `/privacy.html` | trust card 4, legal note |
| editorial standards | `/editorial-standards.html` | trust card 3 (optional), legal note |
| Terms | `/terms.html` | legal note |
| track PPO carrier changes on Carrier Watch | `/carrier-watch` | OPTIONAL: trust band or a small rail (WS5 rec; low effort) |

  Conventions confirmed on disk: `/compare-ppo-dental-plans`, `/covercapy-network-effect`,
  `/carrier-watch`, `/editorial-standards` are clean (no `.html`). `/find-my-dentist.html`,
  `/dentist-portal.html`, `/capy-accreditation.html`, `/capy-practice-membership.html`,
  `/capy-accredited-dentists.html`, `/platinum-elite-dentists.html`,
  `/dental-treatment-cost-estimator.html`, `/advertising-disclosure.html`,
  `/insurance-disclaimer.html`, `/privacy.html`, `/terms.html` keep `.html`.
- **Word-count target:** 1,200 to 1,400 words of body prose (WS5 says 1,300 to 1,700, WS8 drafted
  ~1,180). DECISION: aim ~1,300, do not pad past 1,400. Density over length.
- **Front-load the answer:** the quick-answer block must sit in the first 30% of the page.

---

## 5. GEO DIRECTIVES

- **Canonical 1-sentence entity description (use verbatim in the quick-answer block, S1b):**
  `CoverCapy is a concierge and discovery platform for PPO dental care that helps people compare PPO plans, estimate treatment costs, verify whether a dentist takes their exact network, and find a modern in-network dentist across the United States.`
- **Canonical 1-paragraph entity description (use in Organization schema `description`, already in
  Block 1):** as written in Section 2 Block 1.
- **Extractable answer blocks:** every FAQ answer (Section 2 Block 5) is a self-contained 40 to 60
  word block, entity named in sentence 1, true out of context. The quick-answer block is the
  primary lift target.
- **Question-shaped headers:** keep `How CoverCapy works.` and the FAQ questions verbatim. These
  match real assistant queries.
- **The four "is NOT" disambiguation facts** appear in plain body prose (clarifier panel S2 + FAQ
  Q2 + quick answer + legal note), not only in schema. Required because adjacent entities (Delta
  Dental, brokers, practices) are strong; state the boundary loudly.
- **Schema/copy parity:** no schema claim without a matching visible sentence. The FAQ answers are
  identical in schema and accordion.
- **Category language is fixed:** always "concierge and discovery platform for PPO dental care."
  Do not vary it page to page.

---

## 6. UX / DESIGN DIRECTIVES

- **Scope:** all page CSS under `.about-page` on `<div id="about-page" class="about-page">`. Never
  restyle nav/footer. KEEP the live `<style>` block as-is (it already implements everything below).
- **Palette tokens (already in live CSS, do not change):** `--teal-night:#082A30`,
  `--teal-700:#14525B`, `--teal-300:#5E8C92`, `--mint:#5BE0A0`, `--mint-soft:#E6F7EE`,
  `--cream:#F6F0E6`, `--cream-card:#FFFDF8`, `--ink:#082A30`, `--ink-soft:#56655F`,
  `--ink-faint:#8A958F`, `--body:#3A4A42`, `--line:#E8E2D8`, `--gold-soft:#F3E8CF`,
  `--gold:#A98A4B`, `--capy-orange:#8F5F38`, `--capy-orange-dark:#754625`.
- **Type:** Fraunces (display, weight 500, italic for one emphasized word per headline) + Hanken
  Grotesk (body/UI). Eyebrows: Hanken 700, .72rem, uppercase, letter-spacing .2em, teal (amber
  on dentist card). `text-wrap: balance` on headings, `pretty` on paragraphs. Prose measure
  62 to 66ch.
- **Section rhythm:** `74px 0` desktop, `52px 0` under 560px. Alternate plain bg and `.band`,
  never two bands in a row (current order already alternates correctly).
- **Components:** 3 button variants only (btn-primary teal, btn-ghost cream, btn-amber copper),
  pill radius. Flat `--cream-card` cards with hairline `--line` border + soft shadow. The single
  deep-teal network-bridge panel is the ONLY tonal feature panel. Footer-matched button gradients
  are allowed (they are button shading, not card fills). Pull-quote / large Fraunces reserved for
  exactly two moments: the accreditation callout and the bridge headline.
- **Motion restraint:** one IntersectionObserver, `.reveal` (opacity + 24px rise, ~.7s, threshold
  .12, fire-once). Hero never animates (present on load). Pillar cards may hover-lift
  (translateY(-5px)). Accordion marker rotates. Bridge arrow nudges. NO parallax, scroll-jacking,
  pinning, animated backgrounds, countdown timers, or pulsing CTAs.
- **Accessibility:** exactly one H1; no skipped levels; native `<details>` FAQ; visible
  `:focus-visible` ring (3px `--mint`, 3px offset); AA contrast (`--ink-faint` only for labels and
  small print, never body); bridge text >= rgba(255,255,255,.82); 44px+ tap targets; descriptive
  link text (never "click here"); reduced-motion block disables transitions and forces `.reveal`
  visible.
- **Mobile:** two-col + split collapse to one column at 900px; hero/final-CTA buttons full-width at
  560px; reading order on stack = prose before clarifier, patient card before dentist card; FAQ
  accordion summary wraps gracefully with right-aligned plus marker.
- **What to avoid:** no gradients on content cards; no glassmorphism / backdrop-filter; no
  em-dashes; no roman numerals; no countdown timers or urgency; no invented founders / dates /
  metrics / awards / testimonials; no clinical-outcome guarantees; no SF Pro / generic startup
  fonts; no duplicating the footer; no second dark band against the footer.
- **Imagery decision:** zero or one accent image. Recommended: NO body imagery (type carries it;
  Hermes/Aesop register). The wordmark lives in the nav, do not re-place a large logo in the hero.
- **og:image decision:** SET `og:image` to `https://www.covercapy.com/assets/og-hub.png` (asset
  verified to exist). This is the one head addition vs the live page beyond the schema rewrite.

---

## 7. DO NOT (hard list)

1. No fabricated founders, dates, headcount, funding, user counts, dentist counts (the only
   allowed scale fact is "6,400+ pages"), awards, testimonials, review counts, or star ratings of
   CoverCapy itself.
2. No em-dashes anywhere in copy. Use commas, colons, or rewrite.
3. No roman numerals in any list or heading.
4. No plan prices, premiums, deductibles, or coverage percentages on this page (SSOT is
   `data/plans/`; About states none). Cost language is illustrative, never a quote.
5. `sameAs`, if ever present, must be an ARRAY of EXTERNAL same-entity profiles. It is OMITTED here
   (no real external profiles yet). Never put internal URLs in `sameAs` (they go in `relatedLink`).
6. Member ID is NEVER stored; state only that verification was provided.
7. No insurer / broker / carrier language; no benefit, price, savings, appointment, or
   clinical-outcome guarantees; Capy Accreditation is a private credential, not a government
   certification, dental license, or industry endorsement.
8. No "all plans / all dentists" completeness claims; no fake security badges (HIPAA, SOC 2,
   bank-grade) unless a real control exists (none documented); no fake "as seen in" / partner logos.
9. Keep schema and visible copy word-aligned (no schema drift); the 6 FAQ answers must be identical
   in the accordion and the FAQPage JSON-LD.
10. Do not duplicate or restyle the sitewide nav/footer; do not break the `.about-page` scope.
