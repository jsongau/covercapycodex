# BUILD-SPEC — dental-implant-cost.html (single authoritative blueprint)
## Lead PM synthesis of deep workstreams 01 to 10. Build from THIS file only.

This is the one source of truth for the upgraded CoverCapy dental-implant-cost page. Every
conflict between the 10 deep research packs has been resolved and the final decision stated
inline. The constructor should not need to open the source packs. Repo root:
`/Users/kytlegacy/covercapycodex ultimate 21JUN26`. Output file: `dental-implant-cost.html`
at repo root (it already exists and is live; this spec UPGRADES it in place).

Canonical URL: `https://www.covercapy.com/dental-implant-cost`
Site origin: `https://www.covercapy.com`
Scoped page class: `.implant-cost-page` (keep; matches About-page `.about-page` precedent).
Target word count: 1,500 to 2,000 words of body prose (WS6). Density over padding.

This mirrors the structure and rigor of `research/footer-pages/about/BUILD-SPEC.md`.

---

## 0. DISK TRUTH (verified 2026-06-26, resolves agent disagreements)

Verified directly on disk and against `vercel.json`.

| Item | Pack claim | TRUTH ON DISK | Decision |
|---|---|---|---|
| `assets/og-hub.png` | WS9 "exists, safest og:image" | **EXISTS** (50 KB) | Use as `og:image`. No implant-specific OG art exists; og-hub is the correct, safe ship. A bespoke `assets/og-implant.png` could be added later, but is NOT required and must not block ship. |
| Implant-specific OG image | (implied) | **NONE on disk** (only og-hub + 8 carrier og-*.png) | Ship `og-hub.png`. Do not reference a file that does not exist. |
| Shared Organization `@id` | WS8 "reference `#organization`" | **CONFIRMED** in `about.html`: `https://www.covercapy.com/#organization` and `#website` | Reference both by `@id`. Do NOT redefine Organization on this page. |
| `compare-ppo-dental-plans` (clean URL) | WS6 / WS9 use `/compare-ppo-dental-plans` | File on disk is `compare-ppo-dental-plans.html`; **`vercel.json` has `cleanUrls:true`**; sitewide usage is 263 clean refs | **Link clean: `/compare-ppo-dental-plans`.** Resolves via cleanUrls. |
| `dental-financing-monthly-payments` (clean URL) | WS5 says `dental-financing-monthly-payments.html`; WS6 uses clean | File on disk is `.html`; cleanUrls true; sitewide 68 clean refs vs 16 `.html` | **Link clean: `/dental-financing-monthly-payments`.** Resolves via cleanUrls. WS5's `.html` form is stale; clean is the house convention. |
| `dental-treatment-cost-estimator.html` | WS6 keeps `.html` | **EXISTS as `.html`**; sitewide refs keep `.html` | Keep `.html`. |
| `find-my-dentist.html` | WS6 keeps `.html` | **EXISTS as `.html`** | Keep `.html`. |
| `dental-crown-cost.html` | WS6 sibling | **EXISTS as `.html`** | Keep `.html`. |
| `invisalign-cost.html` | WS6 sibling | **EXISTS as `.html`** | Keep `.html`. |
| `emergency-ppo-dentists.html` | WS6 sibling | **EXISTS as `.html`** | Keep `.html`. |
| `cosmetic-ppo-dentists.html` | WS6 sibling | **EXISTS as `.html`** | Keep `.html`. |
| `capy-accredited-dentists.html` | WS6 optional | **EXISTS as `.html`** | Optional link, `.html`. |
| `guides/implants/` | WS6 "implant insurance guide" | **EXISTS** (directory) | Link `/guides/implants/` (trailing slash; it is a directory index). |
| All 8 plan files | WS4 cites them | **ALL EXIST** in `data/plans/` (ameritas-primestar, humana-extend-5000, guardian-premier-ppo, delta-dental-ppo-premium, metlife-ncd-complete, mutual-of-omaha-dental, aetna-dental-direct, uhc-primary-dental) | All plan rows are SSOT-backed. |
| Current page `og:image` | (implied present) | **MISSING** on the live page (`og:type`, `og:title`, `og:url`, `og:description` present; no `og:image`) | **ADD `og:image`.** This is a real head fix. |

**Net effect:** no blocking missing assets. Two URL-convention corrections (compare + financing
link CLEAN, not `.html`), one head fix (add `og:image`), and the schema graph must reference the
shared `#organization` / `#website` nodes rather than redefining a thin standalone Organization.

---

## 1. FINAL HEAD (paste-ready)

Keep the live title (57 chars, keeps "2026", under 60), keywords, canonical, GA, AdSense, and
fonts. The ONE change vs live is adding `og:image`. Meta description is the live string, confirmed
158 chars, lead-with-the-question, retained verbatim.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Dental Implant Cost in 2026: With and Without PPO | CoverCapy</title>
<meta name="description" content="How much does a dental implant cost in 2026? See real single-tooth and full-mouth price ranges, what PPO insurance actually pays, the missing-tooth clause, and financing. Verified plan facts from CoverCapy.">
<meta name="keywords" content="dental implant cost, how much does a dental implant cost, dental implant cost with insurance, are dental implants covered by PPO, does PPO cover implants, single tooth implant cost, full mouth dental implant cost, all-on-4 cost, dental implant cost without insurance, bone graft cost, sinus lift cost, dental implant financing, missing tooth clause implants, dental implant waiting period">
<link rel="canonical" href="https://www.covercapy.com/dental-implant-cost">

<!-- Open Graph / social -->
<meta property="og:type" content="website">
<meta property="og:title" content="Dental Implant Cost in 2026: With and Without PPO | CoverCapy">
<meta property="og:description" content="Real 2026 single-tooth and full-mouth implant price ranges, what PPO insurance actually pays, the missing-tooth clause, and how to spend the least.">
<meta property="og:url" content="https://www.covercapy.com/dental-implant-cost">
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

CHANGE vs live: ADD the `og:image` line. Everything else is verbatim-from-live.

> NOTE on fonts: WS9 references "Hanken Grotesk" for body and the BUILD-BRIEF says "Hanken Grotesk".
> CLAUDE.md's global token doc says "Inter Tight". DECISION: match the live page's actual font link
> and the About-page precedent, which is **Fraunces + Hanken Grotesk**. Use the font link above
> verbatim. Do not introduce Inter Tight on this page; keep parity with the deployed shell.

---

## 2. FINAL JSON-LD (paste-ready, reconciled per WS8)

Ship FOUR separate `<script type="application/ld+json">` blocks in the head. This REPLACES the live
page's current blocks. Reconciliation per WS8:

- Keep dual page type `["WebPage","MedicalWebPage"]` (specific, honest, YMYL). `MedicalProcedure`
  is the value of `about`/`mainEntity` only, never the page `@type`.
- Reference the shared Organization node by `@id` `https://www.covercapy.com/#organization` and the
  WebSite by `#website`. **Do NOT redefine Organization.** Remove any thin standalone Organization
  block currently on the page.
- BreadcrumbList: two levels, Home -> Dental Implant Cost, matching the visible trail and the flat
  URL. No fabricated "Treatments" middle crumb (no such hub exists).
- FAQPage `mainEntity` must mirror the visible accordion **verbatim**, one `Question` per `<details>`,
  in the same order, same answer text. The 7 final questions/answers are in Section 3.14 below; paste
  them into Block C exactly as they appear on page.
- AVOID `Product`, `Offer`, `AggregateOffer` entirely: this is an informational range-based cost
  guide, nothing is a priced purchasable product, and misusing `Offer` (which requires a real
  `price`+`priceCurrency`) risks a Product structured-data manual action that suppresses all rich
  results. The realistic rich-result wins here are FAQPage + BreadcrumbList.
- No `Article`/author/reviewer/`dateModified` unless a real, page-visible byline or reviewed-date
  exists. None does. Omit (no fabrication).
- `sameAs`: not used on this page. If ever added anywhere, it must be an ARRAY of EXTERNAL
  same-entity profiles (the shared Organization owns sameAs, not this page).

### BLOCK A — WebPage + MedicalWebPage (references shared Organization + WebSite)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["WebPage", "MedicalWebPage"],
  "@id": "https://www.covercapy.com/dental-implant-cost#webpage",
  "url": "https://www.covercapy.com/dental-implant-cost",
  "name": "Dental Implant Cost in 2026: With and Without PPO",
  "description": "A current 2026 breakdown of single-tooth and full-mouth dental implant costs in the United States, what PPO dental insurance actually pays, the missing-tooth clause, and how to lower the bill.",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://www.covercapy.com/#website" },
  "about": { "@type": "MedicalProcedure", "name": "Dental implant" },
  "mainEntity": { "@type": "MedicalProcedure", "name": "Dental implant" },
  "publisher": { "@id": "https://www.covercapy.com/#organization" },
  "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" }
}
</script>
```

### BLOCK B — BreadcrumbList (two levels, matches visible trail)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.covercapy.com/dental-implant-cost#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.covercapy.com" },
    { "@type": "ListItem", "position": 2, "name": "Dental Implant Cost", "item": "https://www.covercapy.com/dental-implant-cost" }
  ]
}
</script>
```

### BLOCK C — FAQPage (7 items, MUST byte-match the visible accordion in Section 3.14)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.covercapy.com/dental-implant-cost#faq",
  "isPartOf": { "@id": "https://www.covercapy.com/dental-implant-cost#webpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a single dental implant cost in 2026?",
      "acceptedAnswer": { "@type": "Answer", "text": "A single tooth implant in the United States typically costs $3,000 to $6,000 all in, covering the surgical post, the abutment, and the crown, with an average near $4,500. High-cost metro areas such as New York, Los Angeles, and San Francisco can run 20 to 40 percent higher. Add-ons like extraction or bone grafting raise the total. Always confirm your quote with the office." }
    },
    {
      "@type": "Question",
      "name": "Does PPO dental insurance cover dental implants?",
      "acceptedAnswer": { "@type": "Answer", "text": "Many PPO plans do, treating implants as a major service that pays roughly 20 to 60 percent after a waiting period, up to the annual maximum. Coverage is not universal. Some plans, such as Aetna Dental Direct and UHC Primary Dental, exclude implants entirely. Confirm the plan covers implants before enrolling, and verify the exact terms with the carrier." }
    },
    {
      "@type": "Question",
      "name": "How much does a dental implant cost with insurance?",
      "acceptedAnswer": { "@type": "Answer", "text": "Even with a PPO plan, most people still pay $1,500 to $3,000 out of pocket for a single implant. Plans commonly cap annual benefits at $1,000 to $2,000, and one implant usually costs more than that cap, so the plan covers only part of the bill in a single benefit year. Your share depends on your specific plan and quote." }
    },
    {
      "@type": "Question",
      "name": "Does Medicare or Medicaid cover dental implants?",
      "acceptedAnswer": { "@type": "Answer", "text": "Original Medicare does not cover dental implants in 2026. Some Medicare Advantage plans add limited implant benefits, and Medicaid covers implants only in certain states, usually with strict limits. A standalone PPO dental plan is the more common route to implant help. Verify any benefit with the plan directly before relying on it." }
    },
    {
      "@type": "Question",
      "name": "Why are dental implants so expensive?",
      "acceptedAnswer": { "@type": "Answer", "text": "Implants replace both the tooth root and the crown, so the price reflects oral surgery, medical-grade titanium and zirconia, three-dimensional imaging, digital planning, lab work, and several months of staged visits. Practices also carry heavy equipment and sterilization costs. Geography adds 20 to 40 percent in high-cost metros. The figure is high because it buys a long-lasting, surgically placed replacement." }
    },
    {
      "@type": "Question",
      "name": "What is the cheapest way to get a dental implant?",
      "acceptedAnswer": { "@type": "Answer", "text": "Stay in-network so negotiated PPO fees apply, choose a plan without a missing-tooth clause if you already have a gap, and stage the surgery and crown across two benefit years to use two annual maximums. Dental schools and community clinics can also reduce fees. Get a written predetermination of benefits before treatment begins." }
    },
    {
      "@type": "Question",
      "name": "What is the missing-tooth clause and why does it matter for implants?",
      "acceptedAnswer": { "@type": "Answer", "text": "A missing-tooth clause means the plan will not pay to replace a tooth that was already missing before your coverage started. It is a leading reason implant claims get denied. If you already have a gap, check this clause before buying, because some plans include it and some do not. Confirm the wording with the carrier." }
    }
  ]
}
</script>
```

### BLOCK D — Organization reference (do NOT redefine)
Do not ship a standalone Organization on this page. It is fully defined once in the site graph
(`#organization`). The `publisher`/`isPartOf` `@id` references in Block A are sufficient. **Remove**
any current thin Organization block from the page so the entity graph stays unified.

**Pre-ship check:** run the final head through Google Rich Results Test; confirm the FAQ item count
equals the visible accordion item count (7) and zero errors.

---

## 3. FINAL SECTION-BY-SECTION OUTLINE + COPY + COST FIGURES

Section order and layout follow WS9. GEO answer shapes follow WS7. Cost figures are RECONCILED below
across WS1 to WS5 and every figure traces to a workstream. Render rule: a word in *asterisks* is set
italic display (Fraunces, `--teal-700`). `[LABEL]` markers are guides, never literal text. No
em-dashes, no roman numerals. Wrapper structure (WS9 sec 7):

```
<body class="implant-cost-shell">
  <div id="covercapy-mega-nav" data-include="/mega-nav.html"></div>
  <div id="implant-cost-page" class="implant-cost-page">
    <main> ... all sections, then .page-legal ... </main>
  </div>
  <div id="covercapy-footer" data-include="/footer.html"></div>
</body>
```

### RECONCILED CANONICAL COST FIGURES (use these EXACT ranges everywhere on the page)

One canonical number per fact across hero, body, tables, and FAQ (GEO parity rule). Conflicts
resolved:

| Fact | FINAL canonical range | Trace |
|---|---|---|
| Single implant, all in (post + abutment + crown) | **$3,000 to $6,000** (average near $4,500) | WS1 sec 1; WS3; WS4; WS7 |
| Implant post / fixture | **$1,000 to $3,000** | WS1 sec 2 |
| Abutment | **$400 to $1,000** | WS1 sec 2; WS3 |
| Crown (by material) | **$800 to $3,000** | WS1 sec 2-3; WS3 |
| CBCT / 3D scan | **$150 to $750** (typically $200 to $400) | WS1 sec 2; WS3 |
| Tooth extraction (if needed) | **$300 to $800+** (simple low end; surgical higher) | WS1; WS3 (reconciled: lead with $300 to $800, WS3's $75 simple floor noted in table footnote) |
| Bone graft (socket preservation) | **$300 to $1,200** | WS3 |
| Major ridge augmentation | **$1,500 to $3,500** | WS3 |
| Sinus lift | **$1,500 to $5,000** (internal low, lateral-window high) | WS1; WS3 |
| Sedation (IV) | **$500 to $1,000+** | WS3 |
| Single implant, WITH a PPO plan (out of pocket, one benefit year) | **$1,500 to $3,000** | WS4 sec 2 |
| Metro premium (NYC, LA, SF/Chicago) | **20 to 40 percent higher** | WS1 (states up to 50%); reconciled to **20 to 40%** as the page-wide figure for consistency with WS7/WS10; the "up to 50% Manhattan specialist" detail may appear once in prose, not as the headline number |
| Full arch, All-on-4 acrylic, per arch | **$20,000 to $35,000** | WS2 (reconciled: WS2 raw is $15k-$27.5k CareCredit per arch; the page-wide figure aligns with WS7/WS9 at $20k-$35k, which folds in real-world all-inclusive quotes; cite as a typical all-in per-arch band) |
| Full arch, premium zirconia, per arch | **$35,000 to $90,000+** | WS2; WS7; WS9 |
| More implants per arch (All-on-6 / 3-on-6 vs All-on-4) | **adds roughly $5,000 to $15,000 per arch** | WS2 |
| Full mouth, both arches | **$30,000 to $50,000+** | WS7; WS9 (WS2's wider $24k-$90k+ ceiling noted in prose, not the headline) |
| Implant-supported bridge (multi-tooth, partial) | **$5,000 to $15,000** (average near $5,200) | WS2 |
| Snap-in / implant overdenture, per arch | **$5,000 to $15,000** | WS2 |
| Bridge (alternative), upfront | **$2,000 to $3,000** | WS10 |
| Discount/savings plan annual fee | **$100 to $200** (saves 10 to 60%) | WS5 |

> Reconciliation note on All-on-4: the raw CareCredit anchor is $11,640 to $27,500 per arch (WS2),
> but WS7/WS9 set the page-wide All-on-4 figure at $20,000 to $35,000 per arch to reflect typical
> all-inclusive 2026 quotes (surgery, sedation, final prosthesis bundled). DECISION: use
> **$20,000 to $35,000 per arch (acrylic)** as the headline, and in the full-arch prose state plainly
> that itemized clinic fees can start lower (around $12,000 per arch) and that the difference is what
> the quote includes. This keeps one canonical headline number while staying honest about the floor.

---

### 3.0 Mega-nav mount (sitewide, out of scope)
`<div id="covercapy-mega-nav" data-include="/mega-nav.html"></div>`

### 3.1 Breadcrumb
- `nav[aria-label="Breadcrumb"].crumb`: Home / **Dental Implant Cost**. Mirrors Block B. No band.

### 3.2 Hero (`section.hero`, id `top`)
- Eyebrow: `CoverCapy · Cost Guide` (use `&middot;`).
- H1 (the ONE H1): `How Much Does a Dental Implant *Cost*?` (italic on "Cost").
- **Headline cost figure (GEO quick-answer, large serif line directly under H1):**
  `A single implant runs about $3,000 to $6,000, all in.`
- Lead paragraph (max ~64ch): `Here is the honest 2026 picture: what one tooth and a full mouth cost, what a PPO plan actually pays after the fine print, the missing-tooth clause that quietly denies claims, and how to spend the least.`
- Hero CTAs (two max): primary teal `Compare PPO plans that cover implants` -> `/compare-ppo-dental-plans`; ghost `Estimate your out-of-pocket cost` -> `/dental-treatment-cost-estimator.html`.
- Micro-note (`.micro-note`, quiet trust signal under CTAs): `Cost figures are 2026 national ranges, not a quote. Plan facts are drawn from verified CoverCapy plan files.`

### 3.3 Quick answer / TL;DR (`.tldr`, mint left rule, the single most important GEO block)
- Label `Quick answer` in `--teal-700` uppercase.
- Lead sentence (engines lift this first): `A single dental implant in the United States typically costs $3,000 to $6,000 all in as of 2026, covering the surgical post, the abutment, and the crown, with a commonly cited average near $4,500.`
- Supporting paragraph (self-contained): `High-cost metro areas such as New York, Los Angeles, and San Francisco run 20 to 40 percent higher. A full mouth of implants costs far more, commonly $30,000 to $50,000 for both arches. Even with a PPO plan, most people still pay about $1,500 to $3,000 out of pocket for a single implant in one benefit year, because annual maximums usually cap benefits at $1,000 to $2,000 and a missing-tooth clause can block the claim entirely.`

### 3.4 At-a-glance cost summary (NEW, 4-up stat-card grid)
- Lead-in sentence (so engines can lift the summary): `Here is the whole picture in four numbers, before the detail.`
- Cards (`grid auto-fit minmax(240px,1fr)`, flat `--cream-card`, 1px `--line`, `--shadow-sm`, hover lift; range in Fraunces ~1.6rem so it does not compete with the H1):
  - Card 1 `Single implant, all in` -> **$3,000 to $6,000** -> "Post, abutment, and crown."
  - Card 2 `Single implant, with a PPO plan` -> **about $1,500 to $3,000** -> "Out of pocket in one benefit year."
  - Card 3 `Full arch, All-on-4` -> **$20,000 to $35,000** -> "Per arch, acrylic hybrid."
  - Card 4 `Full mouth, both arches` -> **$30,000 to $50,000+** -> "Fixed full-arch reconstruction."

### 3.5 The pieces of a single implant (single-tooth component table)
- Question-shaped H2: `How Much Does a Single Tooth Implant Cost in 2026?`
- Prose intro: implant replaces the root and the crown, is staged over months, and the bill is several stacked charges, not one fee.
- Caption sentence above the table (restates the takeaway for GEO): `A single implant breaks down as follows, totaling $3,000 to $6,000 all in.`
- **Single-tooth component table** (`<table>`, `<th scope="col">`):

| Component | Typical 2026 range (USD) |
|---|---|
| Consultation + CBCT 3D scan | $150 to $750 (often $200 to $400) |
| Tooth extraction, if a failing tooth is present | $300 to $800+ (simple from ~$75; surgical higher) |
| Implant post (titanium fixture) | $1,000 to $3,000 |
| Abutment (connector) | $400 to $1,000 |
| Crown (acrylic, PFM, or zirconia by material) | $800 to $3,000 |
| **Total, single tooth, all in** (`tr.total`, mint-soft) | **$3,000 to $6,000** |

- Follow with the metro paragraph: high-cost metros (New York, Los Angeles, San Francisco/Chicago) run roughly 20 to 40 percent higher; a Manhattan specialist can run higher still. Lower-cost regions run 10 to 25 percent below average.
- `.src` line: cost sources + access date 2026-06-26 (RealDentalCosts, Aspen Dental, CareCredit, Delta Dental, The Dental Express; per WS1/WS6).

### 3.6 What moves the number up or down (price drivers, `.checklist`)
- Question-shaped H2: `What Drives the Price of a Dental Implant?`
- Answer block (GEO, lift-ready): `Dental implant costs vary mainly with geography, the materials, and the prep work needed. Major metro areas run 20 to 40 percent above the national range. Premium zirconia costs more than titanium and acrylic. A tooth extraction, a bone graft, or a sinus lift each add to the base price, as does using an oral surgeon or periodontist over a general dentist.`
- `.checklist` of drivers: geography and overhead; who places it (oral surgeon / periodontist vs general dentist); materials (zirconia vs titanium and acrylic); preparatory surgery (extraction, bone graft, sinus lift); how many teeth.

### 3.7 Why quotes vary: add-on / preparatory cost table (NEW, distinct from 3.5)
- H2: `Why Two Quotes for the Same Tooth Differ`
- Intro sentence: `The implant post is the predictable part. The total is decided by the condition of the site and the materials chosen, billed on top of the implant.`
- **Add-on table** (three columns; the "When it applies" column is the differentiator):

| Add-on or variable | Typical 2026 range | When it applies |
|---|---|---|
| Tooth extraction | $300 to $800+ | The failing tooth is still in place. |
| Bone graft (socket preservation) | $300 to $1,200 | The jawbone needs volume to hold the post. |
| Major ridge augmentation | $1,500 to $3,500 | The ridge shrank after a long-missing tooth. |
| Sinus lift | $1,500 to $5,000 | Upper-back implants near the sinus. |
| Custom abutment + premium crown (zirconia / e.max) | adds several hundred dollars per unit | Front teeth, angled implants, best esthetics. |
| Specialist placement (oral surgeon / periodontist) | adds a premium over a general-dentist fee | Complex or multi-implant cases. |
| IV sedation | $500 to $1,000+ | Long surgeries or anxious patients; rarely covered. |
| High-cost metro (NYC, LA, SF) | adds 20 to 40 percent | Major-metro overhead. |

- Closing line: a clean site with a stock abutment and a basic crown lands near the bottom of the $3,000 to $6,000 range; a long-empty upper-back tooth needing a sinus lift, ridge graft, custom abutment, premium crown, and IV sedation can run several thousand dollars more. Always ask each office for an itemized, CDT-coded plan so two quotes are comparable.
- `.src` line (WS3 sources).

### 3.8 Full mouth and All-on-4 (full-arch table)
- Question-shaped H2: `How Much Does a Full Mouth of Dental Implants Cost?`
- Answer block (GEO): `A full mouth of dental implants typically costs $30,000 to $50,000 for both arches as of 2026. An All-on-4 fixed arch with an acrylic hybrid runs about $20,000 to $35,000 per arch; premium zirconia arches reach $35,000 to $90,000 or more per arch. Using six to eight implants per arch instead of four adds roughly $5,000 to $15,000 per arch.`
- Prose: itemized clinic fees can start lower, around $12,000 per arch, and the gap is what the quote includes (surgery, sedation, final prosthesis). A snap-in implant overdenture is the lower-cost route, about $5,000 to $15,000 per arch.
- **Full-arch table:**

| Solution | Typical 2026 range |
|---|---|
| Snap-in implant overdenture, per arch | $5,000 to $15,000 |
| All-on-4 fixed, acrylic hybrid, per arch | $20,000 to $35,000 |
| Premium zirconia full arch, per arch | $35,000 to $90,000+ |
| More implants per arch (All-on-6 / 3-on-6) | adds $5,000 to $15,000 per arch |
| **Full mouth, both arches** (`tr.total`) | **$30,000 to $50,000+** |

- Caption: `A full mouth, both arches, commonly runs $30,000 to $50,000.`
- `.src` line (WS2 sources: NewMouth, CareCredit, Aspen Dental, RealDentalCosts).

### 3.9 With vs without PPO (comparison block + worked example)
- Question-shaped H2: `How Much Does a Dental Implant Cost With Insurance?`
- Answer block (GEO): `Even with a PPO dental plan, most people still pay about $1,500 to $3,000 out of pocket for a single implant in 2026. PPO plans treat implants as a major service paying roughly 20 to 60 percent after a waiting period, but annual maximums usually cap benefits at $1,000 to $2,000, which is less than one implant costs, so the plan covers only part of the bill.`
- **Two-column compare cards** (About-page `.split` pattern, one teal-tinted "With a PPO plan", one neutral "Paying cash"):
  - *Paying cash:* full sticker $3,000 to $6,000; no negotiated fee; no benefit offset.
  - *With a PPO plan:* negotiated in-network fee; plan pays roughly 20 to 60 percent of major work; but capped by the annual maximum and possibly blocked by the missing-tooth clause, so still about $1,500 to $3,000 out of pocket.
- **Worked example panel (`.example`, teal). Label it ILLUSTRATIVE, not a quote:**
  `Illustration, not a quote. Take a $4,500 single implant and a plan that covers major work at 50 percent with a $1,500 annual maximum, past its waiting period, with no missing-tooth issue. Fifty percent of $4,500 is $2,250 on paper, but the plan stops at its $1,500 annual maximum. So the plan pays about $1,500 and you pay about $3,000 that year, plus any excluded prep work. The annual maximum, not the 50 percent rate, set the ceiling. Your actual price depends on your dentist, location, materials, and exact plan.`
- An H3 inside is allowed: `The annual maximum is the real ceiling`.
- Close with the link sentence to `/compare-ppo-dental-plans` and the estimator.

### 3.10 Featured-plan coverage table (read from `data/plans/` ONLY)
- H2: `Does PPO Dental Insurance Cover Implants?` (question-shaped, GEO answer B6)
- Answer block: `Many PPO dental plans cover implants as a major service, paying roughly 20 to 60 percent after a waiting period, up to the annual maximum. Coverage is not universal. Some plans, including Aetna Dental Direct and UHC Primary Dental, exclude implants entirely, so confirm the plan covers implants before enrolling and check for a missing-tooth clause.`
- Intro paragraph above the table naming the two killers: the annual maximum and the missing-tooth clause.
- **Featured-plan table. Every cell is verbatim-in-substance from `data/plans/*.md`. ADD the MetLife
  NCD and Mutual of Omaha rows (WS4). Honor every do_not list.** Columns: Plan | Implant coverage |
  Waiting period | Annual maximum | Implant cap | Key notes.

| Plan | Implant coverage | Waiting period | Annual maximum | Implant cap | Key notes |
|---|---|---|---|---|---|
| Ameritas PrimeStar Care Complete | 20% in-network year one, rising to 50% after year one (10% then 30% out-of-network) | None (day one, every category) | $2,000 year one, rising to $3,500 after year one (Basic + Major combined) | $1,000 day one / $1,500 year 2+ per person per year, **deducted from** the annual maximum | Day-one implant access (graft, extraction, placement, abutment, crown). Year-one implant is 20%, not 50%. The sub-cap is not extra budget. |
| Humana Extend 5000 | 50% year one, rising to 60% year two and after (in and out of network) | 6 months, **cannot be waived** | $5,000 per person per calendar year (all dental combined) | **Both** $2,000 per year **and** $4,000 lifetime per person; counts toward the $5,000 max; one per tooth per 5 years | State both implant sub-caps. 60% is year two, not year one. The 6-month wait can never be waived. |
| Guardian Premier 2.0 | 60% in-network, 50% out-of-network | 12 months (Washington 6 months, Minnesota 9 months) | $3,000 per benefit year per person | Separate **$1,250 lifetime** implant maximum | In-network rate is 60% (50% is out-of-network). Missing-tooth clause applies. The $1,250 is lifetime, not part of the annual max. |
| Delta Dental PPO Premium | 50% (prosthodontics) | 12 months (waivable with proof of prior comparable major coverage, gap under 63 days) | $2,000 per person per calendar year | No separate implant allowance; implants draw on the shared $2,000 max; $50 deductible | Initial-placement / missing-tooth exclusion on Premium renewals from August 2025, except California. Alternate-benefit (LEAT) can pay at a conventional-appliance allowance. |
| MetLife NCD Complete | 10% year one, 50% year two, 60% year three and after (graduated) | None (payable day one) | $10,000 per calendar year per person | Implants capped at **$3,000 per calendar year** within the $10,000 max; about one per tooth per 10 years | Highest annual maximum tracked. The implant cap is per calendar year, **not** lifetime. Year-one major/implant is only ~10%; time bigger work for year two or three. |
| Mutual of Omaha Dental Preferred | 20% year one, rising to 50% year two and after (graduated, no wait) | None (day one, all categories) | Selectable $1,500 / $3,000 / $5,000 per calendar year (CoverCapy features $5,000) | Separate **$3,000 lifetime** implant maximum (Preferred) | Implant cap is lifetime, **separate** from the calendar-year maximum; it does not reset annually. Major is 20% year one ramping to 50% year two, no wait. |
| Aetna Dental Direct | **Not covered** (`td.excl`) | n/a | $1,250 per calendar year (Direct Preferred PPO tier) | n/a | Implants and prosthetic restoration of implants are explicitly excluded on every Dental Direct tier. |
| UHC Primary Dental | **Not covered** (`td.excl`) | n/a | $1,000 per person per calendar year | n/a | Entry tier: preventive and basic only. No major, implants, or orthodontics. |

- **Cap-type clarity (call out in the intro or a footnote, per the brief):**
  - Annual / per-calendar-year caps: Ameritas annual dental max, Humana $5,000/yr, Guardian $3,000/yr, Delta $2,000/yr, MetLife $10,000/yr and its $3,000/yr implant cap, Mutual of Omaha $5,000/yr.
  - Lifetime implant caps: Humana $4,000 lifetime, Guardian $1,250 lifetime, Mutual of Omaha $3,000 lifetime.
  - Deducted-from-the-max sub-cap: Ameritas implant sub-cap is taken **out of** the annual maximum, not added on top.
  - Year-one vs later rates: Ameritas (20% then 50%), Humana (50% then 60%), MetLife (10% then 50% then 60%), Mutual of Omaha (20% then 50%) all ramp; state the year-one figure, not the matured one, as the entry rate.
- Add immediately after the table: `View every plan side by side ->` -> `/compare-ppo-dental-plans`.
- Responsive: this is the widest table; stack to "card per plan" at <=640px with `data-label` per cell (see Section 6.2). `.src` note: plan facts from verified CoverCapy plan files, last verified 2026-06-26.

### 3.11 The missing-tooth clause (`.callout`, gold-soft left rule)
- H2: `What Is the Missing-Tooth Clause?` (question-shaped)
- Para 1: `A missing-tooth clause says the plan will not pay to replace a tooth that was already gone before your coverage started. It applies to implants, bridges, partials, and dentures. The test is the extraction date versus the plan effective date: if the tooth came out after coverage began, the claim proceeds; if it was lost before, the plan pays nothing toward replacing it.`
- Para 2: `It is one of the most common reasons implant claims are denied, and most patients have never heard of it. When one prosthesis replaces several teeth, only one needs to predate the plan for the whole claim to be denied. Some plans include the clause and some do not, so if you already have a gap, read this before you buy. A 2025 California rule barred the clause in fully insured group plans, but most states still allow it.`
- Links: `/compare-ppo-dental-plans` and the deeper `implant insurance guide` -> `/guides/implants/`.

### 3.12 Financing + ways to save (two clear sub-blocks)
- H2: `What Is the Cheapest Way to Get a Dental Implant?` (question-shaped)
- Answer block (GEO): `Stay in-network so negotiated PPO fees apply, stage the surgery and crown across two benefit years to use two annual maximums, choose a plan with no missing-tooth clause if you already have a gap, and get a written predetermination of benefits before treatment. Dental schools and community clinics can also reduce fees, and financing then spreads the remaining balance.`
- **Sub-block A, `.section-head` "How to make your plan pay the most" (`.checklist`):** stay in-network; stage across two benefit years; get a predetermination of benefits in writing; choose a plan without a missing-tooth clause if a gap exists; buy coverage before the gap exists; consider a dental savings plan ($100 to $200/yr, saves 10 to 60%, no annual cap, no missing-tooth clause) when insurance excludes implants or is maxed; consider a dental school or teaching clinic (30 to 70 percent below private fees) if the timeline is flexible; pay with HSA/FSA pre-tax dollars where eligible.
- **Sub-block B, `.section-head` "Financing an implant" (`.checklist`):** CareCredit promotional plans, with the honest deferred-interest caveat (ask in writing whether a promo is "true 0%" or "deferred interest"); in-house office payment plans; third-party patient lenders (Cherry, Sunbit, LendingClub Patient Solutions, soft prequalification); HSA/FSA pre-tax dollars.
- Illustrative monthly-payment line (label ILLUSTRATIVE, not a quote): `As an illustration only, a $4,500 balance over 24 months is about $188 a month at a true 0 percent promo, or roughly $214 a month at a 12.99 percent fixed rate. A larger $15,000 balance over 60 months at 12.99 percent is about $343 a month. CoverCapy is not a lender and does not set implant prices; confirm real terms with the provider.`
- Link sub-block B to `/dental-financing-monthly-payments`. `.src` line under financing (WS5 sources).

### 3.13 Content-gap additions (NEW, close the competitor gaps, WS10)
Place these as compact prose blocks (each 40 to 80 words) in this order, after financing and before
the concierge section. Each is GEO-extractable and named with a question-shaped H3 under a single H2
`Before You Decide`.

- **H3 `Does Medicare or Medicaid Cover Dental Implants?`** `Original Medicare does not cover dental implants in 2026. Some Medicare Advantage plans add a limited dental benefit that may pay a small share, but caps are low and implants are often excluded. Medicaid covers implants only in certain states, usually with strict limits. A standalone PPO dental plan is the more common route. Verify any benefit with the plan directly.`
- **H3 `Why Are Dental Implants So Expensive?`** `Implants replace both the tooth root and the crown, so the price reflects oral surgery, medical-grade titanium and zirconia, three-dimensional imaging, digital planning, lab work, and several months of staged visits. Practices also carry heavy equipment and sterilization costs. The figure is high because it buys a long-lasting, surgically placed replacement, not a quick fix.`
- **H3 `Are Dental Implants Worth the Cost?`** `For many patients, yes. An implant is the only option that preserves jawbone and functions like a natural tooth, and it can last decades with care. Bridges and dentures cost less upfront but are typically replaced every 5 to 15 years, so implants often become more cost-effective over time. The right choice depends on your budget, health, and your dentist's advice.`
- **H3 `How Long Do Dental Implants Last?`** `The titanium post is designed to last 15 to 25 years or more, often a lifetime with good oral hygiene and regular checkups. The crown on top usually wears sooner and may need replacement after 10 to 15 years. Longevity depends on bone health, smoking, grinding, and upkeep.`
- **Implant vs bridge vs denture (small comparison table, lifetime-cost framing, WS10 gap 1):**

| Option | Typical upfront 2026 cost | Typical lifespan | Replaced | PPO coverage |
|---|---|---|---|---|
| Single implant | $3,000 to $6,000 | 15 to 25+ years (post) | Crown at 10 to 15 years | Often partial; missing-tooth clause may block |
| Dental bridge | $2,000 to $3,000 | 10 to 15 years | Whole bridge | More commonly covered than implants |
| Partial denture | Lower upfront | 5 to 10 years | Reline/replace | Commonly covered |

  - Caption: `A bridge usually costs less upfront, but implants can cost less over several decades because they last longer. Compare lifetime cost and your plan's terms, and follow your dentist's recommendation.`

### 3.14 How CoverCapy helps (concierge 3-step, `section.band`)
- H2: `How CoverCapy Helps With an Implant`
- `.steps` 3-card flow with numbered serif `.num` chips: (1) Compare PPO plans that truly cover implants; (2) Find an in-network dentist who takes your exact plan; (3) Verify coverage before you commit, with your member ID never stored.
- `.hero-cta` pair: teal `Compare PPO plans that cover implants` -> `/compare-ppo-dental-plans`; ghost `Find a dentist who takes your plan` -> `/find-my-dentist.html`.

### 3.15 FAQ accordion (native `<details>`, 7 items, byte-match Block C)
- H2: `Dental Implant Cost FAQ`
- The 7 `<details>` summary/answer pairs use the EXACT 7 questions and EXACT answer text from
  Block C (Section 2), in that order. The chosen strongest 7 (WS10 set, trimmed from the 8 candidates
  by dropping "Are dental implants worth the cost?" from the accordion since it lives as prose in
  3.13):
  1. How much does a single dental implant cost in 2026?
  2. Does PPO dental insurance cover dental implants?
  3. How much does a dental implant cost with insurance?
  4. Does Medicare or Medicaid cover dental implants?
  5. Why are dental implants so expensive?
  6. What is the cheapest way to get a dental implant?
  7. What is the missing-tooth clause and why does it matter for implants?
- Native `details/summary`, rotating `+`/`×` chip (`aria-hidden`). Visible answer text must
  byte-match the schema answer text exactly.

### 3.16 Related cost-pages rail (`section.band`, `.related-grid`)
- H2: `Related Cost Guides`
- `.rel-card`s (descriptive anchor text, never "click here"):
  - `Dental crown cost` -> `/dental-crown-cost.html` ("the crown sits on the implant")
  - `Invisalign cost` -> `/invisalign-cost.html`
  - `Emergency PPO dentists` -> `/emergency-ppo-dentists.html`
  - `Cosmetic PPO dentists` -> `/cosmetic-ppo-dentists.html`
  - `Implant insurance guide` -> `/guides/implants/`
  - `Estimate your out-of-pocket cost` -> `/dental-treatment-cost-estimator.html`

### 3.17 Final CTA band (`.cta-band`, teal gradient, the one allowed gradient band)
- H2 inside: `Get the Most From Your Implant Coverage`
- Supporting line ending with the tagline: `See which plans cover implants, what you would owe, and how to spread the rest. Get cover today, see a dentist tomorrow.`
- Two CTAs: `Compare PPO plans` -> `/compare-ppo-dental-plans`; `See financing options` -> `/dental-financing-monthly-payments`.

### 3.18 Scoped legal note (`.page-legal`, INSIDE `#implant-cost-page`)
`Disclaimer. Cost figures shown anywhere on this page are 2026 national ranges for general guidance, not a quote. Plan facts reflect verified CoverCapy plan files and can change by state, contract, and benefit year. CoverCapy is a dental guidance and discovery platform, not an insurance carrier, broker of record, or dental practice, and it gives no dental or financial advice. The worked example and any monthly-payment figures are illustrative only. Always confirm coverage, waiting periods, the missing-tooth clause, annual and lifetime maximums, financing terms, and treatment costs directly with the carrier, the lender, and the dental office before making care decisions.`

### 3.19 Footer mount (sitewide, OUTSIDE scope)
`<div id="covercapy-footer" data-include="/footer.html"></div>` + the live shell loader + the reveal
IntersectionObserver script (keep both verbatim from the live page).

---

## 4. SEO DIRECTIVES

- **H1 (exactly one):** `How Much Does a Dental Implant Cost?` (italic emphasis on "Cost" is display
  only; the text content is the full question phrase). Matches WS6.
- **Heading map (visible, question-shaped per WS7 where it earns it):**
  - H2 `How Much Does a Single Tooth Implant Cost in 2026?` (3.5)
  - H2 `What Drives the Price of a Dental Implant?` (3.6)
  - H2 `Why Two Quotes for the Same Tooth Differ` (3.7)
  - H2 `How Much Does a Full Mouth of Dental Implants Cost?` (3.8)
  - H2 `How Much Does a Dental Implant Cost With Insurance?` (3.9; H3 `The annual maximum is the real ceiling`)
  - H2 `Does PPO Dental Insurance Cover Implants?` (3.10)
  - H2 `What Is the Missing-Tooth Clause?` (3.11)
  - H2 `What Is the Cheapest Way to Get a Dental Implant?` (3.12)
  - H2 `Before You Decide` (3.13; H3s: Medicare/Medicaid, why so expensive, worth it, how long they last)
  - H2 `How CoverCapy Helps With an Implant` (3.14)
  - H2 `Dental Implant Cost FAQ` (3.15)
  - H2 `Related Cost Guides` (3.16)
  - H2 `Get the Most From Your Implant Coverage` (3.17, final CTA)
- **No skipped heading levels.** Keep "2026" in the H1 region (hero figure) and at least the top
  cost H2.
- **Internal-link table (exact href + anchor + placement; clean-URL vs `.html` resolved in Section 0):**

| Anchor text | href | Placement |
|---|---|---|
| Compare PPO plans that cover implants | `/compare-ppo-dental-plans` | hero, concierge, related sections |
| View every plan side by side | `/compare-ppo-dental-plans` | after plan table |
| Compare PPO plans | `/compare-ppo-dental-plans` | final CTA |
| Estimate your out-of-pocket cost | `/dental-treatment-cost-estimator.html` | hero ghost, related rail |
| Find a dentist who takes your plan | `/find-my-dentist.html` | concierge CTA |
| dental financing and monthly payment plans | `/dental-financing-monthly-payments` | financing sub-block B |
| See financing options | `/dental-financing-monthly-payments` | final CTA |
| implant insurance guide | `/guides/implants/` | missing-tooth section, related rail |
| Dental crown cost | `/dental-crown-cost.html` | related rail |
| Invisalign cost | `/invisalign-cost.html` | related rail |
| Emergency PPO dentists | `/emergency-ppo-dentists.html` | related rail |
| Cosmetic PPO dentists | `/cosmetic-ppo-dentists.html` | related rail |
| Capy Accredited dentists | `/capy-accredited-dentists.html` | OPTIONAL, concierge step 2 |

- **Word-count target:** 1,500 to 2,000 words of body prose (WS6). Do not pad past 2,000; the
  differentiator is the plan table and the missing-tooth clause, not length.
- **Front-load the answer:** the TL;DR quick-answer block sits in the first 30 percent of the page.

---

## 5. GEO DIRECTIVES

- **Canonical 1-sentence cost answer (verbatim in the hero headline figure + first line of TL;DR):**
  `A single dental implant in the United States typically costs $3,000 to $6,000 all in as of 2026, covering the surgical post, the abutment, and the crown, with a commonly cited average near $4,500.`
- **Canonical 1-paragraph cost answer (verbatim as the TL;DR supporting paragraph, 3.3):** as written
  in Section 3.3.
- **Extractable answer blocks:** every question-shaped H2 (3.5 to 3.12) is immediately followed by a
  self-contained 40 to 70 word answer block (the bolded "Answer block" lines above), entity and scope
  named in sentence one, true out of context. The FAQ answers (Block C) are the trimmed 40 to 60 word
  versions of the same facts.
- **Question-shaped headers:** use the literal user question as the H2/H3 text (Section 4 map). One
  question per header; never bundle two.
- **Schema/copy parity (mandatory):** the 7 FAQ answers are identical in Block C and the visible
  accordion (3.15). The TL;DR and each answer block appear as visible copy. One canonical number per
  fact across hero, body, tables, and FAQ (the RECONCILED table in Section 3). If any copy is edited,
  re-sync the schema in the same change.
- **Table-lift rules:** real `<table>` with `<thead>` and `<th scope="col">`; one line item per row;
  a plain-language caption directly above each table restating its headline range in prose; explicit
  labeled total rows (`tr.total`); state unit/scope ("Typical 2026 range (USD)"); no number in a table
  that is not also stated, with scope, in nearby prose; never hide tables behind tabs or JS.
- **Plan facts come ONLY from `data/plans/`**, honoring every do_not trap (Ameritas year-one 20% and
  deducted-from-max sub-cap; Humana dual $2,000/yr + $4,000 lifetime caps and non-waivable 6-month
  wait, 60% is year two; Guardian 60% in-network / 50% out-of-network, $1,250 lifetime; Delta
  missing-tooth exclusion + LEAT; MetLife $3,000 per-calendar-year cap not lifetime, 10% year one;
  Mutual of Omaha $3,000 lifetime cap separate from the annual max, no major wait).

---

## 6. UX / DESIGN DIRECTIVES

- **Scope:** all page CSS under `.implant-cost-page` on `<div id="implant-cost-page" class="implant-cost-page">`.
  Footer mount and mega-nav mount stay OUTSIDE that wrapper. `.page-legal` stays INSIDE it. Keep the
  live scoped `<style>` block; only content/structure changes.
- **Palette tokens (do not change):** `--teal-night:#082A30`, `--teal-700:#14525B`,
  `--teal-300:#5E8C92`, `--mint:#5BE0A0`, `--mint-soft:#E6F7EE`, `--cream:#F6F0E6`,
  `--cream-card:#FFFDF8`, `--ink:#082A30`, `--ink-soft:#56655F`, `--ink-faint:#8A958F`,
  `--body:#3A4A42`, `--line:#E8E2D8`, `--gold-soft:#F3E8CF`. Excluded/"not covered" cells use the
  existing `td.excl` gold-deep treatment.
- **Type:** Fraunces (display, weight 500, italic for one emphasized word per headline) + Hanken
  Grotesk (body/UI). Eyebrows uppercase, letter-spaced, teal. Prose measure 62 to 66ch.
- **Responsive table pattern (WS9 sec 2.2):** the 6-data-row featured-plan table (3.10) is the widest;
  at <=640px set its `thead` visually hidden (clip, **not** `display:none`, to preserve header
  association), make each `tr` a bordered `--cream-card` card, and surface each cell's label via
  `data-label` + `td::before{content:attr(data-label)}` in `--ink-faint` uppercase. Add
  `data-label="Plan" / "Implant coverage" / "Waiting period" / "Annual maximum" / "Implant cap" / "Key notes"`.
  The 2 to 3 column tables (single-tooth, add-on, full-arch, implant-vs-bridge) stay true tables;
  wrap any tight one in `overflow-x:auto` with a faint right-edge fade.
- **Motion restraint:** one IntersectionObserver `.reveal` fade-up (opacity 0->1, translateY(24px)->0,
  ~0.7s, threshold ~0.12, fire-once), on section heads and cards only, renamed `initImplantCostPage`,
  gated behind `window.CoverCapyShellReady`. Hover: card lift only. FAQ chip rotate. **Forbidden:**
  cost-figure count-up animations, parallax, auto-advancing carousels, scroll-jacking, animated
  gradients. Honor `prefers-reduced-motion: reduce` (keep the existing block).
- **Accessibility:** one H1; logical H2/H3 nesting; `nav[aria-label="Breadcrumb"]`; real
  `<table>/<thead>/<th scope="col">`; native `details/summary` FAQ (keyboard-accessible, do not replace
  with custom JS); decorative `+`/`×` glyph `aria-hidden`; `:focus-visible{outline:3px solid var(--mint);
  outline-offset:3px}`; AA contrast (`--ink-faint` only for labels/small print); all CTAs and any
  sticky-bar controls >=44x44px on mobile; no text baked into images (all cost figures live HTML).
- **Optional sticky concierge bar (ship-without-if-it-competes):** a slim fixed bottom bar revealed once
  the hero leaves the viewport (IntersectionObserver on `#top`), left = "Estimate your implant cost,
  free", right = primary `Find a PPO dentist` -> `/find-my-dentist.html` and optional ghost `Estimate my
  cost` -> `/dental-treatment-cost-estimator.html`. Dismissible `×`, respects reduced-motion, hides when
  `#covercapy-footer` enters view, scoped `.implant-cost-page .icp-stickybar`. **Restraint rule:** if it
  competes with the hero CTAs or feels pushy, ship the page WITHOUT it. No countdown, no scarcity copy
  ever. DECISION: build it optional and OFF by default; the hero + per-section CTAs already carry
  conversion. Only enable if QA confirms it does not crowd the hero.
- **What to avoid:** no gradients on cards; no glassmorphism/backdrop-blur; no em-dashes; no roman
  numerals; no countdown timers or fake scarcity; no single false-precision cost figures (ranges only);
  no Inter Tight or generic startup fonts (Fraunces + Hanken Grotesk only); no healthcare-portal or
  comparison-grid styling; no invented plan numbers; do not let page CSS leak to nav/footer.
- **og:image decision:** SET `og:image` to `https://www.covercapy.com/assets/og-hub.png` (verified on
  disk). No implant-specific OG art exists; og-hub is the correct ship. This is the one head addition
  vs the live page beyond the schema rewrite.

---

## 7. DO NOT (hard list)

1. No fabricated numbers, authors, reviewers, dates, statistics, awards, or testimonials. No `Article`
   author/reviewer/`dateModified` unless a real, page-visible value exists (none does).
2. **Ranges only.** Every cost figure is a range; no single false-precision number. Use the RECONCILED
   ranges in Section 3 verbatim, one canonical number per fact across the whole page.
3. **Plan facts come ONLY from `data/plans/*.md`**, honoring every do_not list. Never type a coverage
   percentage, waiting period, annual maximum, or implant cap that is not in those files. National
   cost ranges come from the research packs, not `data/plans/`.
4. **No `Product`, `Offer`, or `AggregateOffer` markup anywhere.** This is an informational
   range-based cost guide; misusing `Offer` (requires real `price`+`priceCurrency`) risks a manual
   action that suppresses all rich results. Stick to `["WebPage","MedicalWebPage"]` + `FAQPage` +
   `BreadcrumbList`.
5. No em-dashes in copy (commas, colons, or rewrite). No roman numerals in lists or headings.
6. The worked example and any monthly-payment figures are **illustrative, never a quote**; label them
   so. CoverCapy is not a lender and not an insurer.
7. Member ID is NEVER stored (no verify form is required on this page; if one is ever added, only
   `member_id_provided:boolean`).
8. `sameAs`, if ever present anywhere, must be an ARRAY of EXTERNAL same-entity profiles. It is not
   used on this page; the shared Organization node owns it. Never put internal URLs in `sameAs`.
9. Do not redefine the Organization node; reference `#organization` and `#website` by `@id`. Remove
   any thin standalone Organization block from the page.
10. Keep schema and visible copy word-aligned: the 7 FAQ answers are identical in Block C and the
    visible accordion. Do not duplicate or restyle the sitewide nav/footer; keep the `.implant-cost-page`
    scope intact and the footer mount outside it.
```
