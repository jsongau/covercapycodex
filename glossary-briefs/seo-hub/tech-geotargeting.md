# Technical Geotargeting for a US-Only Site
## CoverCapy SEO Hub — Brief

**Category:** Technical SEO / International Targeting
**Applies to:** covercapy.com (all pages)
**Last updated:** June 2026

---

## The Core Question

CoverCapy serves only US patients seeking US PPO dental insurance. The domain is `.com`, which Google treats as a generic top-level domain (gTLD) with no inherent country signal. So how does Google know the site is US-specific, and what technical signals should be set to reinforce that?

The answer is simpler than it looks. The GSC geographic target tool is gone. Hreflang is irrelevant for a single-language, single-country site. Geo meta tags are ignored by Google. What actually works is a stack of content and schema signals that CoverCapy's generator already builds into every page.

---

## Should CoverCapy Use `hreflang="en-us"`?

No. Do not add hreflang tags.

Google's own documentation defines hreflang as a mechanism for resolving ambiguity when a site has **multiple alternate versions** of the same content for different languages or regions. Every hreflang tag requires a reciprocal return tag pointing back from the alternate version. A site with only one version, targeting one country, in one language has no ambiguity for hreflang to resolve. Google provides zero examples in its documentation of hreflang being used on a single-variant site.

A degenerate self-referencing `hreflang="en-us"` tag (pointing only to itself with no alternate) is technically malformed. Google's documentation states that tags without proper bidirectional links "may be ignored or not interpreted correctly." Adding 6,400+ malformed hreflang tags across the SEO page set would generate Search Console warnings, waste crawl budget, and provide no ranking benefit whatsoever.

Google also states directly: "Google doesn't use hreflang or the HTML lang attribute to detect the language of a page; instead, we use algorithms to determine the language." The visible English content on every CoverCapy page already tells Google what it needs to know.

The correct implementation is simply the `<html lang="en">` attribute in the `pageShell` wrapper. That is sufficient.

---

## What Happened to the GSC Geographic Target Setting?

The Google Search Console International Targeting report, which allowed `.com` site owners to manually declare a target country, was removed on **September 22, 2022**. Google announced the deprecation on August 24, 2022, with this rationale: "The ability to target search results to specific countries using Search Console country targeting was determined to have little value for the ecosystem, and is no longer supported."

There is no replacement tool. The feature is simply gone. For a US-only `.com` site, this changes nothing practically. Google now derives country relevance entirely from passive signals, which is how it handled most geotargeting inference already.

---

## Do Geo Meta Tags Help?

No. Google explicitly and officially ignores them.

From Google Search Central's Managing Multi-Regional and Multilingual Sites documentation (last updated December 10, 2025): "Google **ignores** locational meta tags (like `geo.position` or `distribution`) or geotargeting HTML attributes."

John Mueller (Google Search Advocate) has confirmed this, noting that geo meta tags are ignored because they are "generally incorrect" in practice, typically copy-pasted from templates with stale or wrong values. The affected tags include `geo.region`, `geo.placename`, `geo.position`, `ICBM`, and `distribution`.

Bing does use these tags. If Bing traffic is a priority, adding `<meta name="geo.region" content="US">` and `<meta name="geo.placename" content="United States">` is low cost. For Google, they have zero effect.

Do not add geo meta tags to CoverCapy pages for the purpose of Google geotargeting. They add build complexity with no Google payoff.

---

## How Google Actually Determines Target Country for a .com Site

Google's official documentation lists geotargeting signals in this order:

**1. Country-code TLD (ccTLD)** -- the strongest explicit signal. `.de`, `.ca`, `.co.uk` tell Google immediately. `.com` is a gTLD and carries no country association. Migrating to `.us` is not worth the risk.

**2. Hreflang annotations** -- for multi-regional and multilingual sites only. Not applicable to CoverCapy.

**3. GSC Geographic Target** -- removed September 2022. No longer available.

**4. Server IP location** -- weak and non-definitive. Google says: "Some websites use distributed CDNs or are hosted in a country with better webserver infrastructure, so it is not a definitive signal." Vercel's CDN is globally distributed, so this provides no signal either way. Google has confirmed it does not rely on this.

**5. "Other signals" (content and structured data)** -- this is where CoverCapy operates. Google groups these together: local addresses and phone numbers on the page, use of local language and currency, inbound links from local sites, and Google Business Profile data. This bucket is where a US-only `.com` site does its geotargeting work.

---

## How Schema.org Markup Supports US Geotargeting

Schema markup does not function as a primary geotargeting signal in the same sense as hreflang or ccTLD. It operates in the "other signals" bucket alongside plain content signals. But within that bucket, it is the most structured and machine-readable expression of US specificity.

**`addressCountry: "US"`** in every `PostalAddress` block tells Google's entity resolver the physical location of the business. The correct format is ISO 3166-1 alpha-2. This appears in the T5 dentist profile schema inside the `address` object and helps Google disambiguate which entity is being described. It is a contribution to E-E-A-T, not a country-targeting override.

**`areaServed`** on `LocalBusiness`, `Organization`, and `Service` schema tells Google what geographic territory a business serves. This is meaningful for local pack ranking (surfacing in results for queries within that territory) rather than for country-level geotargeting. On T5 pages, declaring `"areaServed"` with the city or metro name helps the dentist profile surface in localized queries. On state hub pages, `"areaServed": {"@type": "State", "name": "California"}` is semantically accurate. On the homepage or the `Organization` entity, `"areaServed": "United States"` accurately reflects scope and may carry additional weight in AI-driven search features that read structured data to understand service scope.

**`geo` coordinates (latitude/longitude)** in `LocalBusiness` schema are the most direct geographic signal for individual dentist profiles. Combined with a US `addressRegion` and `postalCode`, they provide a precise, machine-readable location signal that reinforces every other US content signal on the page.

**`BreadcrumbList` schema** with a geographic hierarchy (State, Metro, City, Dentist) builds a structured geographic context for every T5 page. Google reads breadcrumb schema to understand a page's position in a site's geographic hierarchy, which reinforces the locality of the content.

---

## What CoverCapy's Generator Already Gets Right

The T5 generator already implements the correct geotargeting stack without any changes needed:

- US city, state, and ZIP in visible page text (H1, address block, office info grid)
- US phone format `(NXX) NXX-XXXX` in visible text and schema `telephone`
- `LocalBusiness` + `Dentist` + `MedicalOrganization` schema with `addressCountry: "US"`, `addressRegion`, `addressLocality`, `postalCode`, and `geo` coordinates
- `BreadcrumbList` schema with state, metro, city, and dentist levels
- `areaServed` on individual dentist profiles
- City and state names in `<title>`, `<meta name="description">`, H1, and canonical URL
- Geographic slug hierarchy in URLs: `/dental/{state}/{market-area}/{city}/{dentist}/`

These collectively constitute the "other signals" stack that Google relies on for `.com` domain geotargeting. No additional geo meta tags, no hreflang, no GSC manual override.

---

## Summary: What to Do and What to Skip

| Action | Do it? | Reason |
|---|---|---|
| Add `hreflang="en-us"` to all pages | No | Single-language, single-country site; degenerate self-referencing tags are malformed |
| Set GSC geographic target to United States | No | Tool removed September 2022; no longer exists |
| Add `geo.region` / `geo.placename` meta tags | No (for Google) | Explicitly ignored by Google; Bing-only benefit |
| Add `addressCountry: "US"` in schema | Yes (already done) | Contributes to entity clarity and E-E-A-T |
| Add `areaServed` in LocalBusiness schema | Yes (already done) | Supports local pack ranking within declared territory |
| Add `geo` coordinates in schema | Yes (already done) | Most direct geographic signal for local search |
| Keep `<html lang="en">` in pageShell | Yes (already done) | Correct and sufficient language signal |
| Include US city/state in title, H1, meta description | Yes (already done) | Core "other signals" content geotargeting |

---

## Sources

- [Managing Multi-Regional and Multilingual Sites — Google Search Central](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) (updated December 10, 2025)
- [Tell Google about localized versions of your page — Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [The International Targeting report is deprecated — Google Support](https://support.google.com/webmasters/answer/12474899?hl=en)
- [Google Search Console to remove International Targeting report — Search Engine Land](https://searchengineland.com/google-search-console-to-remove-international-targeting-report-387477)
- [Hreflang: The Easy Guide for Beginners — Ahrefs](https://ahrefs.com/blog/hreflang-tags/)
- [Hreflang Implementation Guide — LinkGraph](https://www.linkgraph.com/blog/hreflang-implementation-guide/)
- [Google Also Ignores Geo-Meta Tags, But Bing Lives By Them — Search Engine Roundtable](https://www.seroundtable.com/archives/020870.html)
- [Google: Geotargeting Promotes While Hreflang Does Not Promote — Search Engine Roundtable](https://www.seroundtable.com/google-geotargeting-promotes-hreflang-swaps-23841.html)
- [LocalBusiness Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Organization Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [schema.org/areaServed](https://schema.org/areaServed)
