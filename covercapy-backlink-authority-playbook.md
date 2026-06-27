# CoverCapy — Dentist Authority Backlink Playbook
## "The Ultimate Backlinker" Strategy | June 2026

---

## THE CORE PLAY

CoverCapy is the only platform that builds **outbound authority links TO dentists** while simultaneously capturing **inbound PageRank FROM those dentists**. Every T5 profile page:

1. Links to the dentist's own website (`sameAs` in schema + visible "Visit official website ↗" link)
2. Links to Google Maps for the practice location
3. Ranks for the dentist's own name + city search
4. Sends referral traffic to the dentist (visible in their Google Analytics)
5. Creates the conditions for natural reciprocal backlinks

This is a **flywheel backlink machine** — dentists discover CoverCapy through their own analytics, visit their profile, and naturally link back.

---

## WHY COVERCAPY OUTRANKS THE DENTIST'S OWN WEBSITE

A typical dental office website:
- DR score: 5–20
- Backlinks: 5–40 (mostly directory listings)
- Content: Homepage, Services, Contact. No insurance detail.
- Schema: Often none or broken
- Reviews: Some embed, often outdated

CoverCapy's T5 page for that same dentist:
- DR: Built on covercapy.com domain authority (+ growing)
- Content: Insurance networks, procedures, rating, reviews, FAQs, nearby offices, carrier-specific copy
- Schema: `Dentist` + `LocalBusiness` + `MedicalOrganization` + `FAQPage` + `BreadcrumbList` + `sameAs` (website + Google Maps)
- Internal links: Hub → Regional → Metro → City → T5 (full PageRank cascade)
- Title: `[Practice Name] | PPO Dentist [City], [State] — Insurance Verified | CoverCapy`

**Result:** Google sees CoverCapy's T5 page as a richer, more authoritative entity document about that practice than the practice's own About page.

---

## PART 1 — WHAT WE ALREADY BUILT (June 2026)

### ✓ T5 Page SEO Enhancements
Every dentist profile page now has:

**Title:** `[Name] | PPO Dentist [City], [State] — Insurance Verified | CoverCapy`
→ Starts with the exact practice name. Google sees this as a branded result.

**Meta description:** Names specific carriers, mentions reviews, has "free through CoverCapy" CTA.
→ Patients searching "[practice name] insurance" find our description more relevant than the practice's own.

**Schema `sameAs`:** Array containing both their website URL AND a Google Maps deep-link with exact lat/lon.
→ Google's Knowledge Graph uses `sameAs` to identify entities. We're now an authoritative mention of that entity.

**About prose block:** Two paragraphs using the exact practice name, city, state, carriers, procedures, and reviews in natural prose.
→ Keyword density + entity signals without stuffing. Google's NLP reads this as a factual document about a real place.

**FAQs:**
- "Does [Name] accept [Carrier 1/2/3]?" — targets "[practice] delta dental" long-tail
- "What is [Name]'s phone number?" — targets "[practice] phone number" voice search
- "Where is [Name] located?" — targets "[practice] address" and "[practice] near me"

**Internal link cascade:**
`/dental/california/` → `/dental/california/orange-county/` → `/dental/california/orange-county/fountain-valley/` → `/dental/california/orange-county/fountain-valley/kyt-dental-services/`

Each parent page links to children. PageRank flows down the chain. 6,400+ pages all linking into the same domain = significant authority.

---

## PART 2 — THE REFERRAL TRAFFIC LOOP (How Dentists Find You)

### Step 1: CoverCapy's T5 page ranks for "[Practice Name] [City]"
This happens within 30–90 days of indexing for practices with weak own-site SEO.

### Step 2: Dentist (or their office manager) sees covercapy.com in Google Analytics referral traffic
They're checking their analytics. They see `covercapy.com` sending them visitors. They click the source URL.

### Step 3: They land on their own CoverCapy profile
They see: their office name, rating, insurance networks, procedures, a "Claim this profile" CTA, and the outbound link to their own website saying "Visit official website ↗"

They think: *"Someone built a page about us that ranks. And they're sending patients to us. And it has a 'claim' button."*

### Step 4: They claim their profile OR they link to it
Option A: They claim. Upgrade path → Capy Accredited ($285/mo) → Platinum Elite ($1,499/mo)
Option B: They don't claim but they add "Find us on CoverCapy" to their website. **You get a backlink from a real local business website.** Relevant. High trust. Exactly what Google values.

### Step 5: Their backlink increases your domain authority
More DA → more T5 pages rank → more dentists discover you → more claims and backlinks. The flywheel spins.

---

## PART 3 — CONTENT AUTHORITY SIGNALS (Make the T5 Page Unbeatable)

### For each dentist profile to rank ABOVE their own website, the page needs:

#### Signal A — Entity Disambiguation
The `sameAs` array with their website + Google Maps is critical. Google uses co-references to build entity profiles. When CoverCapy's schema says "this page is about the same entity as kytdentalservices.com AND this Google Maps location," Google treats our page as an authoritative source about that entity.

**Implement:** Already done via the schema update in generate-plans.js.

#### Signal B — NAP Consistency
Name, Address, Phone must match EXACTLY what's on their Google Business Profile.

**Implement:** Pull address and phone from Supabase. If they don't match GBP, the page loses entity trust. Add a data quality check: flag dentists where our address doesn't match their GBP address.

#### Signal C — Review Signals
If we show their star rating and review count prominently, Google sees us as a relevant result when someone searches "[practice name] reviews."

**Implement:** Already done — rating badge in the hero, review count in schema AggregateRating, mentioned in the About prose.

#### Signal D — Local Business Signals
Hours, payment methods, languages spoken — if available. These are the signals Google's local pack uses.

**Implement (future):** Add `openingHoursSpecification` to schema when we have hours data. Add `hasMap` pointing to Google Maps.

#### Signal E — Topical Authority (Insurance-Specific)
A dental office's own website almost never says "We accept Guardian PPO, UnitedHealthcare Dental, Ameritas PrimeStar, and Delta Dental PPO" explicitly on one page. CoverCapy does. This makes our page more relevant for "[practice] guardian PPO" or "[practice] united healthcare dental" searches.

---

## PART 4 — OUTREACH TEMPLATE (Turn Dentists Into Backlink Sources)

Once 30+ T5 pages are indexing and starting to rank, run this outreach campaign.

### Email template for unclaimed dentists:

**Subject:** Your CoverCapy profile is getting visitors — claim it

**Body:**
```
Hi [Dr. Name / Office Manager Name],

I wanted to let you know that [Practice Name]'s profile on CoverCapy (covercapy.com) has been getting traffic.

We've built a page that shows your insurance networks, procedures, and ratings in one place:
[covercapy.com/dental/california/orange-county/fountain-valley/kyt-dental-services/]

A few things worth knowing:
– The page links to your website (kytdentalservices.com)
– It's showing up in Google searches for "[Practice Name] PPO"
– New patients have already used it to verify their coverage before calling your office

Claiming your free profile lets you:
– Confirm your insurance networks
– Update photos and contact info
– Receive patient verification requests directly
– Turn on appointment booking

Claim it here (free, takes 2 minutes): covercapy.com/claim/[slug]

If you'd prefer not to be listed, I can remove the page — just reply and I'll take care of it.

Best,
[Name]
CoverCapy Concierge Network
```

**Why this works:**
1. Leads with value (they're getting traffic)
2. Shows them the exact URL (curiosity click)
3. Mentions you're already linking to them (reciprocity)
4. The claim CTA is specific ("2 minutes")
5. The opt-out offer reduces friction and almost nobody takes it

### Outreach volume target:
- Week 1: 20 SoCal dentists
- Week 2: 50 SoCal dentists
- Month 2: 200 SoCal dentists
- Month 3: Begin Texas, Florida, New York dentists

Expect 5–15% claim rate. Even non-claimers often check their profile and sometimes add the backlink naturally.

---

## PART 5 — GOOGLE SEARCH CONSOLE STRATEGY

### Submit the dental sitemap NOW:

Go to: https://search.google.com/search-console
Add URL: `covercapy.com/dental/sitemap-dental.xml`

This triggers indexing of all 6,400+ pages within days instead of weeks.

### Monitor for dentist name searches:

In GSC → Performance → Search type: Web → Queries:
Search for: queries containing specific practice names.

Within 30-60 days you'll start seeing impressions for "[Practice Name] [City]" queries. This is your ranking signal.

### Target: Page 1 for practice name within 60 days

If a T5 page has:
- Practice name in title tag
- Practice name in H1
- Practice name 3+ times in body
- Schema `sameAs` pointing to their website
- Outbound link to their website
- Rating + reviews
- Internal links from 3+ parent pages

...it should rank in the top 5 for the exact practice name + city query.

---

## PART 6 — THE STRUCTURED BACKLINK ACQUISITION MAP

### Tier 1 — Internal PageRank (Already Built)
```
covercapy.com (root)
└── /dental/ (dental hub)
    └── /dental/california/ (T3 state hub)
        └── /dental/california/los-angeles/ (T4a metro hub)
            └── /dental/california/los-angeles/west-hollywood/ (T4c city)
                └── /dental/california/los-angeles/west-hollywood/smiles-dental/ (T5 dentist)
```
Every T3 links to every T4. Every T4 links to every T5. That's thousands of internal links feeding each T5 page.

### Tier 2 — Social Proof Links (Earn These First)
These are easy, fast, and help domain authority:
- Yelp: List CoverCapy as a dental resource
- Reddit (r/personalfinance, r/Frugal, r/Dentistry): Answer questions about dental insurance, cite CoverCapy
- Quora: "How do I find a dentist that accepts my PPO?" → Answer with CoverCapy recommendation
- Medium/Substack: "How We Helped 500 Patients Verify Their Dental Insurance" — publish content, link back

### Tier 3 — Dental Industry Links (High Value, Slow)
- Dental school alumni directories
- Local Chamber of Commerce listings
- NADP (National Association of Dental Plans) — get listed as a member resource
- California Dental Association — patient resources section
- Local city health department "dental resources" pages

### Tier 4 — Reciprocal Links (The Flywheel)
When dentists claim their profile and upgrade to Capy Accredited, require (or strongly recommend) a "Verified on CoverCapy" badge on their website. This is standard practice (Zocdoc, Healthgrades, etc. all do this).

Design a badge: "✓ Insurance Verified on CoverCapy" — link to their CoverCapy profile.

Every single claimed dentist = 1 relevant local business backlink.

At 100 claimed dentists: 100 backlinks from real dental offices.
At 500 claimed dentists: 500 backlinks. Domain authority compounds fast.

---

## PART 7 — PAGE QUALITY SIGNALS TO ADD NEXT

These make T5 pages harder for competitors to replicate:

### 1. "Last verified" badge with date
```html
<span class="verified-date">Coverage data verified: June 2026</span>
```
Shows recency. Google rewards fresh, maintained content.

### 2. Patient count signal (when available)
"47 patients have requested coverage verification at this office through CoverCapy."
(Pull from `verification_requests` table count)

### 3. "Nearby alternatives" section
If a practice has a 3.8 rating, show 2–3 nearby offices with higher ratings.
This keeps the patient on CoverCapy even if they don't book the featured office.
Signals comprehensive coverage to Google.

### 4. Insurance plan detail table
For each carrier, show what plan tiers they accept (PPO vs Premier vs DHMO).
Nobody else does this at scale. Extremely high-value for searchers.
Requires more Supabase data — add columns: `carrier_tiers` JSON.

### 5. Author byline
"Profile maintained by CoverCapy Concierge Team · Last updated June 2026"
E-E-A-T signal. Google rewards pages with identifiable editorial ownership.

---

## EXECUTION ORDER (30 days)

| Day | Action |
|-----|--------|
| 1–2 | Run `node generate-plans.js --dentist-pages` to rebuild all T5 pages with new SEO |
| 2 | `git push` → Vercel auto-deploys 6,400+ pages |
| 3 | Submit `covercapy.com/dental/sitemap-dental.xml` to Google Search Console |
| 4–7 | Google indexes the sitemap. T5 pages start appearing in GSC |
| 7–14 | Monitor GSC for practice name query impressions |
| 14 | Begin SoCal dentist outreach (20 offices/week) |
| 14–21 | First claims start coming in |
| 21 | Add "Verified on CoverCapy" badge to claimed dentist offer |
| 21–30 | First reciprocal backlinks from claimed dentist websites |
| 30 | GSC: should see T5 pages ranking for 200+ practice name queries |

---

## METRICS TO TRACK

| Metric | Week 1 | Week 4 | Month 3 |
|--------|--------|--------|---------|
| T5 pages indexed | 0 | 2,000+ | 5,776 |
| GSC practice name impressions | 0 | 500+ | 5,000+ |
| GSC practice name clicks | 0 | 50+ | 500+ |
| Outreach emails sent | 0 | 80 | 400 |
| Profile claims | 0 | 4–8 | 20–40 |
| Backlinks from dental offices | 0 | 0–2 | 8–15 |
| Avg T5 position for practice name | unranked | 8–15 | 3–8 |

---

## THE ULTIMATE MOAT STATEMENT

In 6 months, CoverCapy will be the de facto secondary website for every dental office in its covered markets. Dentists who search for their own practice will find CoverCapy ranking alongside them — or above them. Patients who can't find a practice's website will find CoverCapy instead. The platform that controls the SEO layer between dentist and patient controls patient acquisition. That's the moat.
