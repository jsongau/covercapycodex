# CoverCapy Glossary — Local SEO Integration Design
**File:** glossary-briefs/seo-local-seo-tieins.md
**Updated:** 2026-06-20
**Scope:** Integration strategy between `/dental-insurance-glossary/` and the 6,400+ location/dentist pages across `/dental/{state}/{market}/{city}/{dentist-slug}/`

---

## Overview

The glossary and the location page network are currently two isolated asset groups. Connecting them with disciplined contextual linking, schema cross-references, and shared keyword targeting turns both into a self-reinforcing authority cluster. A user landing on a Los Angeles dentist profile who sees the phrase "in-network" linked to a clear definition stays on-site longer and enters the verification funnel with higher intent. A user landing on the glossary "waiting period" page who sees a CTA tied to "no-waiting-period dentists in Houston" converts at a measurably higher rate than a generic "find a dentist" button. This document designs every connection point between the two systems.

---

## 1. Contextual Term Placement — T5 Dentist Profile Pages

### Universal terms (appear on every T5 page regardless of dentist data)

These terms appear on every profile because they relate to the core value proposition of visiting any PPO dentist, regardless of that practice's specific services.

| Term slug | Anchor text (as it appears in copy) | Placement on page |
|---|---|---|
| `ppo` | "PPO dental insurance" | Hero subheadline or first sentence of About prose |
| `in-network` | "in-network" | Insurance networks section label, every instance in the first paragraph |
| `annual-maximum` | "annual maximum" | Eligibility CTA block copy |
| `deductible` | "deductible" | Eligibility CTA block copy |
| `coinsurance` | "your share of the cost" or "coinsurance" | About prose second paragraph |
| `waiting-period` | "waiting period" | Eligibility CTA block — only the first instance per page |
| `effective-date` | "coverage start date" | Eligibility CTA block when relevant |
| `out-of-pocket` | "out-of-pocket cost" | About prose or sticky bar supporting copy |
| `coverage-preventive` | "preventive care" | FAQ answer for coverage question |
| `coverage-basic` | "basic restorative work" | FAQ answer for coverage question |
| `allowed-amount` | "allowed amount" | FAQ answer: how is my cost calculated? |

### Procedure-conditional terms (appear only when dentist data matches)

These links fire only when the dentist's `procedures` array contains a matching value. This prevents irrelevant links and keeps every anchor text truthful.

| Condition (procedures array contains) | Term slug | Anchor text |
|---|---|---|
| "Implants" or "Dental Implants" | `implants` | "dental implants" in procedure pills or About prose |
| "Teeth Whitening" or "Whitening" | `whitening` | "teeth whitening" in procedure pills |
| "Crowns" or "Same-Day Crowns" | `coverage-major` | "major restorative coverage" in FAQ answer |
| "Root Canal" | `coverage-major` | "major restorative" in FAQ answer |
| "Orthodontics" or "Invisalign" | omit — no glossary term yet | — |
| "Pediatric Dentistry" | omit — no glossary term yet | — |

### Carrier-conditional terms (appear only when specific networks are listed)

| Condition (insurance_networks contains) | Term slug | Anchor text |
|---|---|---|
| Any carrier is listed | `balance-billing` | "balance billing" in the out-of-network FAQ answer |
| Delta Dental PPO or Delta Dental Premier | `ppo` | "Delta Dental PPO" linked once in the networks section |
| Any carrier + implants procedure | `missing-tooth` | "missing tooth clause" in the implants FAQ if present |

### Implementation rule for T5 pages

The `dentistProcedurePills()` function in `generate-plans.js` currently renders plain `<span class="proc-pill">` elements. Procedure pills that match the condition table above should be upgraded to `<a>` tags pointing to the glossary:

```javascript
// Example: procedure pill with conditional glossary link
const PROC_GLOSSARY_MAP = {
  'Implants':          '/dental-insurance-glossary/#implants',
  'Dental Implants':   '/dental-insurance-glossary/#implants',
  'Teeth Whitening':   '/dental-insurance-glossary/#whitening',
  'Whitening':         '/dental-insurance-glossary/#whitening',
  'Crowns':            '/dental-insurance-glossary/#coverage-major',
  'Same-Day Crowns':   '/dental-insurance-glossary/#coverage-major',
  'Root Canal':        '/dental-insurance-glossary/#coverage-major',
};

function dentistProcedurePills(procedures) {
  const shown = procedures.filter(p => p && p.length < 40).slice(0, 16);
  return shown.map(p => {
    const href = PROC_GLOSSARY_MAP[p];
    return href
      ? `<a href="${href}" class="proc-pill proc-pill--linked" rel="noopener">${esc(p)}</a>`
      : `<span class="proc-pill">${esc(p)}</span>`;
  }).join('');
}
```

Style rule: linked procedure pills get `text-decoration: none` and a subtle `--teal-700` color so they read as navigable without breaking the pill aesthetic.

### Where NOT to link on T5 pages

- Do not link "in-network" more than once per page. First instance only.
- Do not link the same glossary term from two different anchor texts on the same page.
- Do not link from within modal copy (`#t5-verify-scrim`, `#t5-exit-scrim`). Modal focus should stay on conversion.
- Do not link from within the sticky bar.
- Do not link from breadcrumb text.

---

## 2. City-Level Glossary Hooks — Metro and City Hub Pages (T3/T4)

### Principle

Hub pages serve a dual role: they rank for "[PPO dentist in {city}]" and they function as internal link hubs that distribute authority down to T5 pages. Glossary integration at this tier captures the long-tail intersection of insurance education queries and local intent queries in a single page.

### Metro hub pages (T4a) — e.g., `/dental/california/los-angeles/`

Add a "How PPO insurance works in {market}" prose section below the dentist card grid. This section runs 80-120 words and anchors three to four glossary terms naturally:

```
PPO dental insurance in Los Angeles gives you access to contracted offices across the metro 
without requiring referrals. Every office listed here is verified as PPO-participating, which 
means you pay the [in-network] contracted rate rather than the office's retail fee. Your 
[annual maximum] — typically $1,000 to $2,000 — resets each January, so patients planning 
major work like crowns or implants often time procedures across two calendar years to maximize 
coverage. If you recently started a new job or bought individual coverage, check whether a 
[waiting period] applies before scheduling anything beyond a cleaning.
```

Bracketed terms become `<a href="/dental-insurance-glossary/#in-network">` etc.

### City pages (T4c) — e.g., `/dental/california/los-angeles/west-hollywood/`

Add a single "Insurance quick-guide for {city} patients" block — 60-80 words — in the right rail or below the dentist grid. This block links two terms maximum to avoid over-optimization:

```
Most dental insurance in West Hollywood is PPO-based, meaning you can see any licensed 
dentist on this list and pay the contracted [in-network] rate. If your plan has a 
[waiting period] for crowns or root canals, CoverCapy surfaces that before you book — 
so you never sit down in the chair before knowing your out-of-pocket.
```

### Which hub page types get which terms

| Page tier | Mandatory terms | Optional (if space allows) |
|---|---|---|
| T3 state hub | `ppo`, `in-network` | `annual-maximum`, `waiting-period` |
| T3.5 regional hub | `ppo`, `in-network`, `waiting-period` | `deductible`, `coinsurance` |
| T4a metro hub | `in-network`, `annual-maximum`, `waiting-period` | `balance-billing`, `allowed-amount` |
| T4b local area hub | `in-network`, `waiting-period` | `coverage-preventive` |
| T4c city page | `in-network`, `waiting-period` | `ppo` (first mention on page) |

### Do not add glossary blocks to

- The hero section of any hub page. Hero copy must stay conversion-focused.
- The dentist card titles or descriptions — keep those scannable and clean.
- Mobile sticky bars on hub pages.

---

## 3. Term-Location Intersections — High-Value Keyword Combos

These are the keyword pairs where glossary content and location content overlap in search intent. Each pair represents a query where a user is thinking about both a specific insurance concept and a specific geography at the same time. CoverCapy can capture these through three mechanisms: (a) glossary page geo-specific examples, (b) hub page insurance copy, and (c) programmatic city-level FAQ answers.

### Tier 1 — highest volume + strongest CoverCapy coverage

| Keyword combo | Target page | Mechanism |
|---|---|---|
| in-network dentist Los Angeles | T4a metro hub + glossary `in-network` | Glossary page cites LA market in real-world example; metro hub links to glossary |
| dental waiting period California | T3 state hub + glossary `waiting-period` | State hub adds "California PPO timing" note; glossary page uses CA example |
| PPO dentist near me Houston | T4a metro hub Dallas/Houston + glossary `ppo` | Glossary `ppo` page CTA links to Houston metro hub |
| annual maximum reset New York | T4a metro hub New York + glossary `annual-maximum` | Metro hub FAQ answer on timing; glossary page uses NYC example |
| how to use dental insurance first time Chicago | T4a metro hub Chicago + glossary `in-network` + `deductible` | Metro hub "first-timer" FAQ; glossary cross-links |
| dental implants covered PPO Florida | T4c city pages in Florida + glossary `implants` + `missing-tooth` | Glossary `implants` links to FL market; FL city pages with implant-offering dentists link to `implants` |
| Delta Dental PPO vs Premier Texas | T4a Dallas/Houston + glossary `ppo` | Glossary `ppo` page carrier comparison; TX metro hubs link to `ppo` definition |
| no waiting period dental insurance Phoenix | Landing page `/dental-insurance-no-waiting-period/` + AZ metro hub + glossary `waiting-period` | Three-way triangle: landing page links to glossary + AZ hub; AZ hub links to landing page + glossary |
| balance billing dentist Nevada | NV hub pages + glossary `balance-billing` | NV hubs add balance billing callout; glossary `balance-billing` links to NV search page |
| deductible reset January dentist New Jersey | NJ state hub + glossary `calendar-year` | NJ hub FAQ; glossary `calendar-year` cites NJ example |

### Tier 2 — moderate volume, strong local signal

| Keyword combo | Term slug(s) | Location page |
|---|---|---|
| implant dentist PPO coverage Beverly Hills | `implants`, `coverage-major` | T4c Beverly Hills |
| missing tooth clause dental insurance | `missing-tooth` | T4a metro hubs with high implant-dentist density |
| coinsurance dental crown explanation | `coinsurance`, `coverage-major` | T4a hubs FAQ |
| ADA fee schedule what does it mean | `ada-fee` | No specific location hook; keep on glossary only |
| dentist that takes United Healthcare PPO | `in-network` | T4a UHC-heavy markets (LA, Houston, Chicago, Dallas) |
| allowed amount dental bill | `allowed-amount` | No specific location hook; keep on glossary only |
| plan year vs calendar year dental | `plan-year`, `calendar-year` | Metro hubs FAQ |
| dental rating star meaning CoverCapy | `rating` | T5 pages (rating badge tooltip) |
| whitening covered by PPO | `whitening` | T5 pages with whitening procedure only |

### How to embed geo-specific content in glossary pages

Each glossary term page should include one "Local context" pull-quote or example that names a real CoverCapy market. This creates the geographic footprint for local intent queries to land on glossary pages. Pattern:

```
[Real-world example block on glossary page for "waiting-period"]
A patient in Houston, Texas who starts a new individual PPO plan in January and needs 
a crown in February will likely hit a 12-month waiting period. CoverCapy surfaces this 
timing risk before you book. Find verified PPO dentists in Houston who accept your 
specific plan — and know your benefit window before you sit in the chair.
[CTA: "Find PPO dentists in Houston →" linking to /dental/texas/houston/]
```

This pattern — one city example + one CTA per term page — runs for the five priority markets (see section 7). Other markets can be added over time.

---

## 4. Breadcrumb Integration

### Glossary page breadcrumb

The glossary page and each term page should carry a breadcrumb that does not reference location pages, because the glossary is a national resource, not a local one. Referencing location pages in the glossary breadcrumb would create misleading schema.

Correct breadcrumb for the main glossary index:
```
Home > Dental Insurance Glossary
```

Correct breadcrumb for a term page:
```
Home > Dental Insurance Glossary > {Term Name}
```

Schema for term page breadcrumb:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "CoverCapy", "item": "https://covercapy.com/" },
    { "@type": "ListItem", "position": 2, "name": "Dental Insurance Glossary", "item": "https://covercapy.com/dental-insurance-glossary/" },
    { "@type": "ListItem", "position": 3, "name": "{Term Name}", "item": "https://covercapy.com/dental-insurance-glossary/#{slug}" }
  ]
}
```

### Location page breadcrumbs referencing the glossary

Location page breadcrumbs should NOT include glossary links — breadcrumbs communicate page hierarchy, not related content. Glossary links belong in body copy, FAQ answers, and prose sections, not in breadcrumb navigation.

The existing T5 breadcrumb (Home > State > Market > City > Dentist) is correct as-is. Do not modify it.

### Cross-referencing via body copy instead

The practical equivalent of a breadcrumb reference from location pages to the glossary is a labeled footer link block. At the bottom of every T5 page, above the footer but below the nearby offices rail, add a "Related insurance terms" section:

```html
<section class="related-terms-rail" aria-label="Insurance glossary">
  <h2 class="section-label">Understand your PPO benefits</h2>
  <div class="term-links">
    <a href="/dental-insurance-glossary/#in-network">What "in-network" means for your bill</a>
    <a href="/dental-insurance-glossary/#annual-maximum">How your annual maximum works</a>
    <a href="/dental-insurance-glossary/#waiting-period">Waiting periods explained</a>
    <!-- conditional: only if dentist has implants procedure -->
    <a href="/dental-insurance-glossary/#implants">Does PPO cover dental implants?</a>
  </div>
</section>
```

This gives Google a clear, labelled internal link from T5 pages to the glossary without polluting breadcrumb schema.

---

## 5. Schema Cross-Linking — Organization and LocalBusiness to Glossary

### Problem to solve

Google uses `sameAs`, `mainEntityOfPage`, and `mentions` schema properties to build topical authority relationships. Currently, T5 pages have `Dentist + LocalBusiness + MedicalOrganization` schema with `availableService` entries. These services are not linked to any authoritative definition. Adding `mentions` with `DefinedTerm` pointers to the glossary signals that CoverCapy is the authority defining these dental insurance concepts in the context of these dentist profiles.

### Recommended schema additions for T5 pages

Add a `mentions` array to the existing `WebPage` schema node:

```json
{
  "@type": "WebPage",
  "@id": "{canonical}#webpage",
  "mentions": [
    {
      "@type": "DefinedTerm",
      "name": "In-Network Dentist",
      "url": "https://covercapy.com/dental-insurance-glossary/#in-network",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "CoverCapy Dental Insurance Glossary",
        "url": "https://covercapy.com/dental-insurance-glossary/"
      }
    },
    {
      "@type": "DefinedTerm",
      "name": "PPO Dental Insurance",
      "url": "https://covercapy.com/dental-insurance-glossary/#ppo",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "CoverCapy Dental Insurance Glossary",
        "url": "https://covercapy.com/dental-insurance-glossary/"
      }
    }
    // add waiting-period, annual-maximum conditionally
  ]
}
```

This is the correct schema pattern for a page that defines or explains terms. `DefinedTermSet` positions the CoverCapy glossary as the canonical definitional resource, and `mentions` on the T5 `WebPage` node creates a machine-readable link between local dental offices and the insurance concepts they deal in.

### Recommended schema for the glossary index page

The glossary index at `/dental-insurance-glossary/` should carry:

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://covercapy.com/dental-insurance-glossary/#termset",
  "name": "CoverCapy Dental Insurance Glossary",
  "description": "Plain-language definitions of dental insurance terms for PPO patients — in-network, annual maximum, waiting period, and more.",
  "url": "https://covercapy.com/dental-insurance-glossary/",
  "publisher": {
    "@type": "Organization",
    "name": "CoverCapy",
    "url": "https://covercapy.com"
  },
  "hasPart": [
    { "@type": "DefinedTerm", "name": "PPO", "url": "https://covercapy.com/dental-insurance-glossary/#ppo" },
    { "@type": "DefinedTerm", "name": "In-Network", "url": "https://covercapy.com/dental-insurance-glossary/#in-network" },
    { "@type": "DefinedTerm", "name": "Waiting Period", "url": "https://covercapy.com/dental-insurance-glossary/#waiting-period" },
    { "@type": "DefinedTerm", "name": "Annual Maximum", "url": "https://covercapy.com/dental-insurance-glossary/#annual-maximum" },
    { "@type": "DefinedTerm", "name": "Deductible", "url": "https://covercapy.com/dental-insurance-glossary/#deductible" },
    { "@type": "DefinedTerm", "name": "Coinsurance", "url": "https://covercapy.com/dental-insurance-glossary/#coinsurance" },
    { "@type": "DefinedTerm", "name": "Balance Billing", "url": "https://covercapy.com/dental-insurance-glossary/#balance-billing" },
    { "@type": "DefinedTerm", "name": "Allowed Amount", "url": "https://covercapy.com/dental-insurance-glossary/#allowed-amount" },
    { "@type": "DefinedTerm", "name": "Dental Implants Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#implants" },
    { "@type": "DefinedTerm", "name": "Missing Tooth Clause", "url": "https://covercapy.com/dental-insurance-glossary/#missing-tooth" },
    { "@type": "DefinedTerm", "name": "Calendar Year Reset", "url": "https://covercapy.com/dental-insurance-glossary/#calendar-year" },
    { "@type": "DefinedTerm", "name": "Plan Year", "url": "https://covercapy.com/dental-insurance-glossary/#plan-year" },
    { "@type": "DefinedTerm", "name": "Effective Date", "url": "https://covercapy.com/dental-insurance-glossary/#effective-date" },
    { "@type": "DefinedTerm", "name": "Day 1 Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#day-one" },
    { "@type": "DefinedTerm", "name": "Preventive Care Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#coverage-preventive" },
    { "@type": "DefinedTerm", "name": "Basic Restorative Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#coverage-basic" },
    { "@type": "DefinedTerm", "name": "Major Restorative Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#coverage-major" },
    { "@type": "DefinedTerm", "name": "Out-of-Pocket Cost", "url": "https://covercapy.com/dental-insurance-glossary/#out-of-pocket" },
    { "@type": "DefinedTerm", "name": "CDT Codes", "url": "https://covercapy.com/dental-insurance-glossary/#cdt" },
    { "@type": "DefinedTerm", "name": "ADA Fee Schedule", "url": "https://covercapy.com/dental-insurance-glossary/#ada-fee" },
    { "@type": "DefinedTerm", "name": "Teeth Whitening Coverage", "url": "https://covercapy.com/dental-insurance-glossary/#whitening" },
    { "@type": "DefinedTerm", "name": "Vision Add-On", "url": "https://covercapy.com/dental-insurance-glossary/#vision" },
    { "@type": "DefinedTerm", "name": "CoverCapy Rating", "url": "https://covercapy.com/dental-insurance-glossary/#rating" }
  ]
}
```

### LocalBusiness schema — add `knowsAbout`

On T5 pages, adding `knowsAbout` to the `Dentist` schema node links the practice to the insurance terms it accepts. This is a light signal but costs nothing to implement:

```json
{
  "@type": ["Dentist", "LocalBusiness", "MedicalOrganization"],
  "knowsAbout": [
    "https://covercapy.com/dental-insurance-glossary/#ppo",
    "https://covercapy.com/dental-insurance-glossary/#in-network"
  ]
}
```

Only add the two universal terms here. Do not list every glossary term — keep the `knowsAbout` array meaningful.

---

## 6. Anchor Text Matrix

### T5 pages linking TO the glossary

This table defines the exact anchor text to use for each glossary term when linking from T5 body copy. Anchor text must be natural prose, not keyword-stuffed. Each link appears once per page.

| Glossary slug | Preferred anchor text | Acceptable variant | Never use |
|---|---|---|---|
| `ppo` | "PPO dental insurance" | "preferred provider organization (PPO)" | "click here for PPO info", "PPO plan" (too short) |
| `in-network` | "in-network" | "in-network dentist" | "in network" (no hyphen), "contracted provider" |
| `annual-maximum` | "annual maximum" | "annual benefit maximum" | "max", "yearly limit", "annual cap" |
| `deductible` | "deductible" | "annual deductible" | "copay" (wrong term), "your share" |
| `waiting-period` | "waiting period" | "plan waiting period" | "probation period", "delay" |
| `coinsurance` | "coinsurance" | "your coinsurance percentage" | "copay" (different concept), "cost-sharing" alone |
| `balance-billing` | "balance billing" | "out-of-network balance billing" | "surprise bill" (imprecise) |
| `allowed-amount` | "allowed amount" | "contracted allowed amount" | "approved amount", "usual and customary" |
| `coverage-major` | "major restorative coverage" | "major dental work" | "big procedures", "expensive coverage" |
| `coverage-basic` | "basic restorative" | "basic dental coverage" | "simple procedures" |
| `coverage-preventive` | "preventive care" | "preventive coverage" | "routine care" alone without link |
| `implants` | "dental implants" | "implant coverage" | "fake teeth", "implant procedure" alone |
| `missing-tooth` | "missing tooth clause" | "missing-tooth exclusion" | "existing tooth problem" |
| `whitening` | "teeth whitening" | "whitening coverage" | "cosmetic whitening" (redundant) |
| `calendar-year` | "calendar year reset" | "January reset" | "year-end" alone |
| `out-of-pocket` | "out-of-pocket cost" | "your out-of-pocket" | "what you pay" without link |
| `day-one` | "day-one coverage" | "same-day activation" | "immediate coverage" alone (use the term slug page instead) |
| `effective-date` | "coverage effective date" | "your start date" | "enrollment date" (different concept) |
| `rating` | "CoverCapy rating" | "weighted patient rating" | "stars", "score" alone |

### Glossary pages linking TO location pages

Each glossary term page should link to at most two location pages — one metro hub in the market most relevant to the term's real-world example, and one search/find page. Do not link glossary pages to T5 dentist profiles directly — that creates a deep internal link from a high-authority educational page to a transactional profile page that may feel manipulative to Google and confusing to users.

| Glossary slug | Link to | Anchor text | Notes |
|---|---|---|---|
| `ppo` | `/dental/california/los-angeles/` | "PPO dentists in Los Angeles" | LA has the largest CoverCapy dentist coverage |
| `ppo` | `/find-my-dentist` | "Find a PPO dentist near you" | Secondary CTA |
| `in-network` | `/find-my-dentist` | "Find in-network dentists near you" | Primary CTA after cost comparison table |
| `in-network` | `/dental/texas/houston/` | "verified in-network dentists in Houston" | Local example |
| `waiting-period` | `/dental-insurance-no-waiting-period/` | "dental plans with no waiting period" | Cross-property link to situation landing page |
| `waiting-period` | `/dental/california/` | "PPO dentists in California" | Match the state example in the brief |
| `annual-maximum` | `/dental/new-york/new-york/` | "in-network dentists in New York" | NY is the highest-cost metro for annual max exhaustion |
| `deductible` | `/find-my-dentist` | "Verify your deductible status before you book" | Conversion CTA |
| `coinsurance` | `/find-my-dentist` | "Calculate your coinsurance before booking" | Conversion CTA |
| `balance-billing` | `/dental/nevada/` | "Nevada PPO dentists" | NV has notable out-of-network billing issues |
| `implants` | `/dental/florida/miami/` | "PPO implant dentists in Miami" | High implant-seeking market |
| `implants` | `/dental-insurance-no-waiting-period/` | "PPO plans covering implants from day one" | Situation cross-link |
| `missing-tooth` | `/dental/florida/` | "Florida PPO dentists covering implants" | FL implant market |
| `coverage-major` | `/compare-ppo-dental-plans` | "Compare PPO plans covering major work" | Cross-link to comparison page |
| `day-one` | `/dental-insurance-immediate-coverage/` | "Get dental coverage starting today" | Situation page cross-link |
| `whitening` | `/compare-ppo-dental-plans` | "Compare plans — most exclude whitening" | Drives comparison page visit |
| `rating` | `/find-my-dentist` | "See ratings for dentists near you" | Light conversion CTA |
| `calendar-year` | `/dental/new-jersey/` | "New Jersey PPO dentists" | NJ example in brief |
| `ada-fee` | `/find-my-dentist` | "See what your dentist charges vs. the ADA schedule" | Conversion-oriented |
| `allowed-amount` | `/compare-ppo-dental-plans` | "Compare allowed amounts across PPO plans" | Comparison page |

---

## 7. Priority Markets — Top 5 for Glossary Integration

Selection criteria: (a) highest estimated monthly search volume for "PPO dentist [city]" + insurance education queries, (b) CoverCapy dentist coverage confirmed in `dental/` directory, (c) above-average patient confusion around insurance terms in that market (correlates with high percentage of out-of-network billing disputes and employer plan switching rates).

### 1. Los Angeles, California

**Why:** Largest CoverCapy coverage in the database (southern-california directory contains the most market entries of any state). LA patients are heavy PPO users split between Delta Dental PPO, Aetna, and Cigna. The market has above-average premium sensitivity, meaning patients are more likely to research terms like "in-network" and "allowed amount" before choosing a dentist.

**Terms to integrate first:** `in-network`, `ppo`, `balance-billing`, `allowed-amount`

**Glossary actions:**
- `ppo` page cites a Los Angeles crown example
- `in-network` page links to `/dental/california/los-angeles/`
- `balance-billing` page cites West Hollywood example (out-of-network billing is a documented issue in premium LA zip codes)

**Hub page actions:**
- `/dental/california/los-angeles/` gets the "How PPO insurance works in LA" prose block
- High-implant cities (Beverly Hills, West Hollywood, Santa Monica) — T5 pages with implants procedure get `implants` + `missing-tooth` links

**Search opportunity:** "in-network dentist Beverly Hills", "PPO dentist West Hollywood accepts Delta Dental", "dental implants covered PPO Los Angeles"

---

### 2. Houston, Texas

**Why:** Texas has the second-largest number of market directories in the CoverCapy `dental/` output. Houston is a high-churn employer market (energy sector), meaning patients frequently switch plans and encounter waiting periods. The "dental waiting period new job" query has measurable volume tied to the city.

**Terms to integrate first:** `waiting-period`, `in-network`, `effective-date`, `deductible`

**Glossary actions:**
- `waiting-period` page uses a Houston new-job scenario (aligns with existing Austin example but swap for Houston)
- `in-network` page links to `/dental/texas/houston/`
- `effective-date` page uses Houston employer enrollment example

**Hub page actions:**
- `/dental/texas/houston/` gets a "New to your Houston employer plan?" FAQ block with links to `waiting-period` and `effective-date`
- `/dental/texas/dallas/` gets the same treatment — Dallas is also strong coverage

**Search opportunity:** "dental waiting period new job Houston", "how long to use Delta Dental Houston", "effective date new dental insurance Texas"

---

### 3. Miami, Florida

**Why:** Florida has a large retiree and snowbird population that is disproportionately affected by the `missing-tooth` clause and implant coverage gaps. Miami metro also has above-average interest in cosmetic dentistry, making `whitening` and the coverage exclusion for cosmetics a relevant integration point. CoverCapy has confirmed Florida coverage across Miami, Fort Lauderdale, Boca Raton, and Naples.

**Terms to integrate first:** `implants`, `missing-tooth`, `coverage-major`, `whitening`

**Glossary actions:**
- `implants` page uses a Miami example (patient who had a tooth extracted before new plan started)
- `missing-tooth` page links to `/dental/florida/miami/`
- `whitening` page links to `/dental/florida/miami/` with copy noting that Miami dental offices frequently offer whitening as an elective add-on not covered by PPO

**Hub page actions:**
- `/dental/florida/miami/` gets a "What your PPO covers in Miami" block noting that implants are major coverage, whitening is excluded, and missing tooth clauses apply to teeth lost before your plan started
- T5 pages in Miami with `Implants` in procedures array get `implants` + `missing-tooth` linked proc pills

**Search opportunity:** "dental implants covered by insurance Miami", "missing tooth clause Florida PPO", "PPO that covers implants Florida no waiting period"

---

### 4. New York (New York City metro)

**Why:** NYC patients have among the highest dental costs in the country relative to PPO allowed amounts. The gap between retail fees and contracted rates is pronounced, making `allowed-amount`, `balance-billing`, and `annual-maximum` highly relevant search terms in this market. CoverCapy has confirmed New York coverage in the dental directory.

**Terms to integrate first:** `allowed-amount`, `balance-billing`, `annual-maximum`, `coinsurance`

**Glossary actions:**
- `allowed-amount` page uses a New York crown example (high retail fee vs. contracted rate contrast is sharpest here)
- `annual-maximum` page links to `/dental/new-york/new-york/`
- `balance-billing` page notes that NYC has a high density of out-of-network-only specialists

**Hub page actions:**
- `/dental/new-york/new-york/` gets a "What to know about dental costs in NYC" prose block: notes that in-network matters more in NYC than anywhere else because the gap between retail and contracted rates is widest; links to `balance-billing` and `allowed-amount`
- FAQ answer: "Are most NYC dentists in-network?" — links to `in-network`

**Search opportunity:** "in-network dentist Manhattan PPO", "balance billing dentist New York", "dental annual maximum NYC", "PPO dentist that takes United Healthcare New York"

---

### 5. Phoenix, Arizona

**Why:** Arizona is confirmed in the CoverCapy dental directory. Phoenix is the fastest-growing large metro in the US by population, with a high percentage of residents who recently relocated and are navigating new employer plans for the first time. This drives above-average search volume for "how does dental insurance work" + local queries. The market also has strong appetite for no-waiting-period plans (large contingent of freelancers and gig workers).

**Terms to integrate first:** `waiting-period`, `day-one`, `ppo`, `deductible`

**Glossary actions:**
- `day-one` page uses a Phoenix example (freelancer buying individual PPO)
- `waiting-period` page links to `/dental-insurance-no-waiting-period/` landing page with mention of AZ availability
- `ppo` page links to `/dental/arizona/phoenix/`

**Hub page actions:**
- `/dental/arizona/phoenix/` gets a "First time buying dental insurance in Phoenix?" block: explains waiting periods, links to `waiting-period` and `day-one`; secondary CTA to `/dental-insurance-no-waiting-period/`
- FAQ: "What is the best dental insurance for new Arizona residents?" — links to `ppo` and `waiting-period`

**Search opportunity:** "dental insurance no waiting period Phoenix", "first time dental insurance Arizona", "PPO dentist Phoenix accepting new patients", "day one dental coverage Arizona"

---

## Implementation Priority and Sequencing

### Phase 1 — Schema and glossary page build (no generator changes required)
1. Build `/dental-insurance-glossary/` with `DefinedTermSet` schema (task #52).
2. Add geo-specific examples and CTAs to the 5 priority market term pages listed above.
3. Add location CTAs to `ppo`, `in-network`, `waiting-period`, `implants`, `missing-tooth` term pages.

### Phase 2 — Generator: T5 procedure pill links (one generator change)
1. Add `PROC_GLOSSARY_MAP` to `dentistProcedurePills()` in `generate-plans.js`.
2. Add "Related insurance terms" rail to `buildDentistPage()` output — 3-4 links, conditional on procedures.
3. Add `mentions` array to `WebPage` schema node in `buildDentistPage()`.
4. Rebuild T5 pages.

### Phase 3 — Generator: hub page prose blocks (hub template changes)
1. Add "How PPO insurance works in {market}" prose block to `buildMetroHub()`.
2. Add "Insurance quick-guide" sidebar block to `buildCityPage()`.
3. Add 2 glossary term links to each hub page's FAQ answers for the 5 priority markets.
4. Rebuild hub pages.

### Phase 4 — Ongoing: new market rollout
Extend the geo-specific examples in glossary term pages to the next tier of markets: Chicago, Dallas, San Diego, San Jose, Orlando. Follow the same pattern: one real-world example, one CTA linking to the relevant market hub.

---

## Enforcement Rules (copy into CLAUDE.md if desired)

- Never link the same glossary term from two anchor texts on the same T5 page. One link per term per page.
- Never link from within modal copy. Modal focus stays on conversion.
- Never use "click here" as anchor text for any glossary link.
- Procedure pills that link to the glossary must use `rel="noopener"` and retain the `.proc-pill` class for visual consistency.
- Glossary pages must not link directly to T5 dentist profile pages. Link to metro hubs or city pages only.
- `knowsAbout` in LocalBusiness schema gets at most two glossary URLs: `ppo` and `in-network`. Do not list every term.
- The "Related insurance terms" T5 rail must use the heading "Understand your PPO benefits" — not "Glossary", "Learn more", or "See also".
- All glossary anchor URLs use hash fragments on the single-page glossary: `/dental-insurance-glossary/#slug`, not separate subdirectory URLs, unless the glossary is built as individual term pages at `/dental-insurance-glossary/{slug}/`.
