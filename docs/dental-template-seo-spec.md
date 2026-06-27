# Elite SEO template spec for /dental/ pages (generator)

Goal: maximize current and future organic + AI-search visibility for every generated dentist
page (profiles and city/market hubs), applied uniformly by `seo-build/generate-plans.js`.
This is the synthesis of ten specialist lenses: dental SEO, dentist/local SEO, city-search
SEO, Google SERP-display SEO, dentist meta-description SEO, GEO (AI answer engines), AI
indexing, in-network-insurance SEO, schema/structured-data, and internal-link architecture.

Differentiation rule (already decided):
- `/dental/...` = CITY intent (these are programmatic; they own "PPO dentist {city}").
- `/dentists/...` = bespoke pages, MARKET + "top-rated/best" intent. Do not change here.

Conventions used below (generator fields): `d.name`, `d.slug`, `d.city`, `d.state`,
`d.address`, `d.phone`, `d.website`, `d.latitude`, `d.longitude`, `d.insurance_networks[]`,
`d.procedures[]`, `d.weighted_rating`, `d.google_review_count`, `d.open_weekends`,
`d.doctor_name`, `market.market_area`, `market.seo_area`, `BASE_URL`, `stateSlug()`,
`slugify()`.

---

## 0. Shared helpers to add

```js
const ST = { 'California':'CA','Texas':'TX','Florida':'FL','Arizona':'AZ','Nevada':'NV',
  'Illinois':'IL','Washington':'WA','Oregon':'OR','New York':'NY','Georgia':'GA' /* extend */ };
const abbr = s => ST[s] || s;

// Hard clamp so Google never truncates mid-word. Titles ~60, descriptions ~158.
function clamp(str, max){ str = str.replace(/\s+/g,' ').trim();
  if (str.length <= max) return str;
  return str.slice(0, max).replace(/[\s,;:.-]+\S*$/,'').trim(); }

// Oxford-free carrier phrase, capped at 3 for readability.
function carrierPhrase(nets){ if(!nets||!nets.length) return '';
  const a = nets.slice(0,3); return a.length===1 ? a[0]
    : a.slice(0,-1).join(', ')+' and '+a[a.length-1]; }

// Star + count only when real, so we never fabricate ratings.
function ratingBit(d){ const r=parseFloat(d.weighted_rating), c=parseInt(d.google_review_count,10);
  return (r>=3 && c>0) ? { star:r.toFixed(1), count:c } : null; }

// Honest "Top-Rated" gate. Only label a page top-rated when it genuinely earns it
// (rating AND enough review volume). ~48% of the directory qualifies at 4.5/15.
function ratingTier(d){ const r=parseFloat(d.weighted_rating), c=parseInt(d.google_review_count,10);
  if (r>=4.7 && c>=15) return 'top';    // "Top-Rated"
  if (r>=4.5 && c>=10) return 'high';   // "Highly Rated"
  return null; }                        // no superlative — never claim it

// Sibling cities in the same market_area, nearest first by lat/long when available.
// `allInMarket` = array of {city, latitude, longitude} the generator already has per market.
function nearbyCities(d, allInMarket, n=4){
  const others = allInMarket.filter(x => slugify(x.city)!==slugify(d.city));
  if (d.latitude && d.longitude){
    others.sort((a,b)=>dist(d,a)-dist(d,b));
  }
  const seen=new Set(), out=[];
  for(const x of others){ const k=slugify(x.city); if(!seen.has(k)){seen.add(k);out.push(x.city);} if(out.length>=n) break; }
  return out;
}
function dist(a,b){ const dx=(a.latitude-b.latitude), dy=(a.longitude-b.longitude); return dx*dx+dy*dy; }
```

---

## 1. Titles (front-load keyword, brand last, ~60 char budget)

Google truncates ~60 chars / ~600px, so the brand tail is sacrificial. Keyword + city must
live in the first 50 chars.

```js
// T5 dentist profile — honest rating modifier when earned (CTR + truthful)
function titleProfile(d){
  const city=d.city, st=abbr(d.state), tier=ratingTier(d);
  const mod = tier==='top' ? 'Top-Rated ' : tier==='high' ? 'Highly Rated ' : '';
  return clamp(`${d.name} | ${mod}PPO Dentist in ${city}, ${st} | CoverCapy`, 65);
}

// T4c city hub  (count drives CTR + specificity; omit if <2)
function titleCityHub(city, st, count){
  const lead = count>=2 ? `PPO Dentists in ${city}, ${st} — ${count} In-Network Offices`
                        : `PPO Dentists in ${city}, ${st} — In-Network Dental Offices`;
  return clamp(`${lead} | CoverCapy`, 65);
}

// T4a market/metro hub
function titleMarketHub(market, st, count){
  return clamp(`PPO Dentists in ${market}, ${st} — ${count?count+' ':''}In-Network Offices | CoverCapy`, 65);
}
```

## 2. Meta descriptions (answer-first, 150–158, carrier + rating + nearby + CTA)

Answer-first wording is what AI Overviews and featured snippets lift. Always include: who/what,
city, accepted carriers (real), rating (only if real), one nearby city (relevance + internal
intent), and a verify/booking CTA.

```js
function descProfile(d, nearby){
  const city=d.city, st=abbr(d.state), r=ratingBit(d), cp=carrierPhrase(d.insurance_networks);
  let s = `${d.name} is an in-network PPO dentist in ${city}, ${st}`;
  if (cp) s += `, accepting ${cp}`;
  s += '.';
  if (r) s += ` Rated ${r.star}★ from ${r.count} reviews.`;
  s += ` See services, hours${nearby&&nearby[0]?`, nearby ${nearby[0]} dentists,`:','} and verify your PPO coverage free with CoverCapy.`;
  return clamp(s, 158);
}

function descCityHub(city, st, count, topCarriers, nearby){
  let s = `Compare ${count} in-network PPO dentists in ${city}, ${st}.`;
  if (topCarriers) s += ` See offices accepting ${topCarriers}, with reviews and hours.`;
  s += ` Verify your coverage free before booking.`;
  if (nearby&&nearby.length) s += ` Nearby: ${nearby.slice(0,3).join(', ')}.`;
  return clamp(s, 158);
}
```

## 3. Head block (canonical, robots, OG, Twitter, geo, dates)

Google Analytics on EVERY page. AdSense ONLY on pages that clear a content threshold (to avoid
the "low-value/scaled content" AdSense + core-update risk on thin directory pages).

```html
<!-- Google Analytics (all pages) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XNBPGSZ1LZ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XNBPGSZ1LZ');</script>
```

```js
// AdSense gate: emit the AdSense script ONLY when the page is substantive.
function adsenseTag(d, isHub, hubCount){
  const r = ratingBit(d);
  const rich = isHub
    ? (hubCount >= 4)                                   // hub: 4+ offices listed
    : (r && (d.procedures||[]).length >= 3 && (d.insurance_networks||[]).length >= 1);
  return rich
    ? '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8699915070570206" crossorigin="anonymous"></script>'
    : '';
}
```

```html
<title>${title}</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="${BASE_URL}${path}" />        <!-- self-canonical, trailing slash -->
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
<meta property="og:type" content="${isProfile?'business.business':'website'}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${BASE_URL}${path}" />
<meta property="og:image" content="${BASE_URL}/og-hub.png" />
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="CoverCapy" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${BASE_URL}/og-hub.png" />
<!-- Local geo signals (profiles only) -->
<meta name="geo.region" content="US-${abbr(d.state)}" />
<meta name="geo.placename" content="${d.city}" />
<meta name="geo.position" content="${d.latitude};${d.longitude}" />
<meta name="ICBM" content="${d.latitude}, ${d.longitude}" />
```

## 4. JSON-LD @graph (profiles) — the structured-data + GEO core

One `@graph` with: Dentist (+ LocalBusiness/MedicalBusiness), AggregateRating (conditional),
FAQPage, BreadcrumbList, and `areaServed` covering the city + nearby cities. Never emit
`aggregateRating` unless `ratingBit(d)` is truthy (fabricated ratings are a manual action).

```js
function dentistGraph(d, path, nearby, faqs){
  const r = ratingBit(d);
  const g = [{
    "@type": ["Dentist","MedicalBusiness","LocalBusiness"],
    "@id": `${BASE_URL}${path}#dentist`,
    "name": d.name,
    "url": `${BASE_URL}${path}`,
    "telephone": d.phone || undefined,
    "image": `${BASE_URL}/og-hub.png`,
    "address": { "@type":"PostalAddress", "streetAddress": d.address||undefined,
                 "addressLocality": d.city, "addressRegion": abbr(d.state), "addressCountry":"US" },
    "geo": (d.latitude&&d.longitude) ? { "@type":"GeoCoordinates","latitude":d.latitude,"longitude":d.longitude } : undefined,
    "hasMap": (d.latitude&&d.longitude) ? `https://www.google.com/maps/search/?api=1&query=${d.latitude},${d.longitude}` : undefined,
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, PPO Dental Insurance",
    "areaServed": [d.city, ...(nearby||[])].map(c => ({ "@type":"City", "name": c })),
    "availableService": (d.procedures||[]).slice(0,8).map(p => ({ "@type":"MedicalProcedure", "name": p })),
    "memberOf": { "@type":"Organization", "name":"CoverCapy PPO Network", "@id":`${BASE_URL}/#organization` },
    "sameAs": [ d.website ? d.website.split('?')[0] : null,
                (d.latitude&&d.longitude) ? `https://www.google.com/maps/search/?api=1&query=${d.latitude},${d.longitude}` : null ].filter(Boolean)
  }];
  if (d.open_weekends) g[0].openingHoursSpecification = [{ "@type":"OpeningHoursSpecification",
     "dayOfWeek":["Saturday"], "opens":"09:00","closes":"15:00" }];
  if (r) g[0].aggregateRating = { "@type":"AggregateRating", "ratingValue": r.star, "reviewCount": r.count,
     "bestRating":"5","worstRating":"1" };
  // FAQPage (3 Qs: carrier acceptance, new patients, verification) — answer-first for AI.
  g.push({ "@type":"FAQPage", "mainEntity": faqs.map(f => ({ "@type":"Question","name":f.q,
     "acceptedAnswer":{ "@type":"Answer","text":f.a } })) });
  // BreadcrumbList: Home > State > Market > City > Office
  g.push({ "@type":"BreadcrumbList", "itemListElement": breadcrumbItems(d, path) });
  return { "@context":"https://schema.org", "@graph": g };
}
```

City/market hubs use an `ItemList` of the dentist offices + `BreadcrumbList` + a `FAQPage`
("How many PPO dentists are in {city}?", "Which carriers do they accept?", "How do I verify?").

## 5. On-page content (humans + GEO/AI indexing)

- H1: profile `${d.name} — PPO Dentist in ${d.city}, ${abbr(d.state)}`; city hub
  `PPO Dentists in ${city}, ${st}`.
- First paragraph is ANSWER-FIRST (one sentence an AI can lift): "{name} is an in-network PPO
  dentist in {city}, {state} that accepts {carriers}." Put it above the fold, before any UI.
- Entity coverage: name the procedures (`d.procedures`) and carriers (`d.insurance_networks`)
  in prose, not just pills, so the page is entity-dense for both Google and LLMs.
- In-network insurance block: list accepted carriers with a "Verify my coverage — free" CTA.
- NEARBY CITIES rail (city + internal-link equity, the requested "nearby cities" signal):
  render visible links to the nearest sibling-city hubs and back to the market hub.

```js
function nearbyRail(nearby, market, st){
  const links = nearby.map(c => `<a href="${BASE_URL}/dental/${stateSlug(d.state)}/${market.seo_area}/${slugify(c)}/">PPO dentists in ${c}</a>`).join('');
  return `<nav class="nearby" aria-label="Nearby cities"><h2>PPO dentists near ${d.city}</h2>${links}
    <a href="${BASE_URL}/dental/${stateSlug(d.state)}/${market.seo_area}/">All ${market.market_area} PPO dentists</a></nav>`;
}
```

This is the single biggest programmatic-SEO lever: dense city-to-city internal linking inside
a market builds a crawlable mesh and distributes authority, and the `areaServed` + nearby
prose makes each page rank for "PPO dentist near {nearby city}" too.

## 6. Implementation order in generate-plans.js

1. Add the helpers in section 0 (and a per-market `allInMarket` city list, computed once).
2. Replace the head builder for T5/T4 with sections 1–3.
3. Replace the schema builder with section 4 (`dentistGraph` / hub `ItemList`).
4. Add the answer-first intro + `nearbyRail` to `buildDentistPage` / `buildCityPage`.
5. Keep building URLs from parts (never `d.seo_path`). Self-canonical, trailing slash.
6. Rebuild from repo ROOT, regenerate `dental/sitemap-dental.xml`, commit, push.

## 7. QA checklist (run after rebuild on a 20-page sample)

- [ ] Title ≤ ~60 visible chars, keyword + city in first 50, brand last.
- [ ] Description 150–158 chars, answer-first, real carriers, CTA, one nearby city.
- [ ] Self-canonical with trailing slash; OG/Twitter present; geo meta on profiles.
- [ ] JSON-LD validates; `aggregateRating` present ONLY when a real rating exists.
- [ ] `areaServed` lists city + nearby; `availableService` lists real procedures.
- [ ] BreadcrumbList matches the visible breadcrumb exactly.
- [ ] Nearby-city rail links resolve (no 404) and point to existing city hubs only.
- [ ] No fabricated ratings, counts, or carriers anywhere.

## 8. Future-ranking / GEO notes

- Answer-first first paragraph + FAQPage = eligibility for AI Overviews and "people also ask".
- Keep one consistent fact per office across profile, hub, and `llms.txt`; contradictions get
  a page dropped from AI answers.
- The nearby-city mesh compounds over time: as more city hubs exist, each new page inherits
  internal links, which is the main driver of programmatic-SEO ranking growth.
- Re-check Search Console "Pages" indexed ratio after rollout; thin city hubs with <2 offices
  should be `noindex` until they have offices, to protect crawl budget and site quality.

Sources informing this spec: dental/local SEO meta + schema best practice (60-char titles,
150-160 descriptions, Dentist/LocalBusiness/FAQ/Review schema, nearby-city/neighborhood
targeting, AI-Overview answer-first copy), 2026 guidance.
