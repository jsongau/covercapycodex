#!/usr/bin/env node
/* ============================================================
   CoverCapy Vercel build step : delta-generate-plans.js
   Runs during `vercel build` on EVERY deploy and reaches Supabase
   from Vercel's build environment. Distinct from the Mac-only,
   gitignored seo-build/generate-plans.js that builds the /dental/ tree.

   Jobs (all fail-safe: on any error it warns and the build continues):
   1) Delta spokes (primary): generates pages under
      /dental-insurance/delta-dental/ from Supabase, per-city dentist
      pages, area pages, and UC-campus student pages.
   2) Shared: bakes active ppo_plans (all carriers) into
      compare-ppo-dental-plans.html between the PLANS_TABLE markers.
   3) Shared: merges generated URLs into the root sitemap.xml.

   Invoked by the Vercel Build Command (Project Settings). If this file
   is renamed, update that command in lockstep.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';

// REST API requires the JWT anon key (not the sb_publishable_ format)
const ANON_KEY = process.env.SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';

// Publishable key injected into browser-facing HTML (safe to commit – it's public)
const BROWSER_KEY = process.env.SUPABASE_PUBLISHABLE_KEY
  || 'sb_publishable_wlfujszvn2logC3KNL3MsA_AW1F42kf';

const PAGE = process.env.PLANS_PAGE || 'compare-ppo-dental-plans.html';

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fmtDate = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

async function main() {
  const res = await fetch(
    SUPABASE_URL + '/rest/v1/ppo_plans?is_active=eq.true&order=sort_order.asc'
    + '&select=plan_key,name,name_em,sub_carrier,monthly_text,cap_text,'
    + 'table_preventive,table_basic,table_major,table_implant,table_ortho,table_watch,plan_page,verified_at',
    { headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY } }
  );
  if (!res.ok) {
    console.warn('[generate-plans] WARNING: Supabase returned', res.status, ', deploying with existing HTML');
    return;
  }
  const plans = await res.json();
  if (!Array.isArray(plans) || plans.length === 0) {
    console.warn('[generate-plans] WARNING: No active plans returned, deploying with existing HTML');
    return;
  }
  console.log('[generate-plans] Loaded', plans.length, 'plans from Supabase');

  const rows = plans.map((p) => {
    const href = String(p.plan_page || '#').replace(/^\//, '');
    return `            <tr>
              <th scope="row"><a href="${esc(href)}">${esc(p.name)} ${esc(p.name_em)}</a><span class="sub">${esc(p.sub_carrier)}</span></th>
              <td>${esc(p.monthly_text).replace('/mo','')}</td>
              <td>${esc(p.cap_text)}</td>
              <td>${esc(p.table_preventive)}</td>
              <td>${esc(p.table_basic)}</td>
              <td>${esc(p.table_major)}</td>
              <td>${esc(p.table_implant)}</td>
              <td>${esc(p.table_ortho)}</td>
              <td class="watch">${esc(p.table_watch)}</td>
            </tr>`;
  }).join('\n');

  const newest = plans.map((p) => p.verified_at).sort().pop();
  const dateText = fmtDate(newest);

  let html = fs.readFileSync(PAGE, 'utf8');

  const T1 = '<!-- PLANS_TABLE_ROWS_START -->';
  const T2 = '<!-- PLANS_TABLE_ROWS_END -->';
  const t1 = html.indexOf(T1), t2 = html.indexOf(T2);
  if (t1 === -1 || t2 === -1) {
    console.warn('[generate-plans] WARNING: Table markers not found in', PAGE, ', deploying as-is');
    return;
  }
  html = html.slice(0, t1 + T1.length) + '\n' + rows + '\n            ' + html.slice(t2);

  html = html.replace(
    /(<!-- VERIFIED_DATE_START -->)([\s\S]*?)(<!-- VERIFIED_DATE_END -->)/g,
    `$1${dateText}$3`
  );

  const isoDate = newest;
  html = html.replace(/"dateModified":\s*"[0-9-]+"/, `"dateModified": "${isoDate}"`);
  html = html.replace(/"lastReviewed":\s*"[0-9-]+"/, `"lastReviewed": "${isoDate}"`);
  html = html.split('__SUPABASE_PUBLISHABLE_KEY__').join(BROWSER_KEY);

  fs.writeFileSync(PAGE, html);
  console.log('[generate-plans] Wrote', PAGE, '| verified', dateText);
}

/* ============================================================
   SEO SPOKE GENERATOR
   ============================================================ */

const BASE = '/dental-insurance/delta-dental';
const SITE = 'https://www.covercapy.com';
const OUT_ROOT = 'dental-insurance/delta-dental';
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const BUILD_TXT = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

const UC_CAMPUSES = [
  { name: 'UCLA', full: 'University of California, Los Angeles', slug: 'ucla', city: 'Los Angeles', lat: 34.0689, lng: -118.4452 },
  { name: 'UC Berkeley', full: 'University of California, Berkeley', slug: 'uc-berkeley', city: 'Berkeley', lat: 37.8719, lng: -122.2585 },
  { name: 'UC San Diego', full: 'University of California, San Diego', slug: 'uc-san-diego', city: 'La Jolla', lat: 32.8801, lng: -117.234 },
  { name: 'UC Irvine', full: 'University of California, Irvine', slug: 'uc-irvine', city: 'Irvine', lat: 33.6405, lng: -117.8443 },
  { name: 'UC Davis', full: 'University of California, Davis', slug: 'uc-davis', city: 'Davis', lat: 38.5382, lng: -121.7617 },
  { name: 'UC Santa Barbara', full: 'University of California, Santa Barbara', slug: 'uc-santa-barbara', city: 'Santa Barbara', lat: 34.414, lng: -119.8489 },
  { name: 'UC Riverside', full: 'University of California, Riverside', slug: 'uc-riverside', city: 'Riverside', lat: 33.9737, lng: -117.3281 },
  { name: 'UC Santa Cruz', full: 'University of California, Santa Cruz', slug: 'uc-santa-cruz', city: 'Santa Cruz', lat: 36.9914, lng: -122.0609 },
  { name: 'UC San Francisco', full: 'University of California, San Francisco', slug: 'uc-san-francisco', city: 'San Francisco', lat: 37.7631, lng: -122.4576 },
  { name: 'UC Merced', full: 'University of California, Merced', slug: 'uc-merced', city: 'Merced', lat: 37.3661, lng: -120.4214 }
];

// Common search abbreviation per campus. Only set where the acronym is genuinely the term
// students search (UCI, UCSD, UCSB, UCR, UCSC, UCSF). Where the full name is what people type
// (UC Berkeley, UC Davis, UC Merced) we leave it off so we never invent a fake acronym.
const UC_ABBR = { 'ucla': 'UCLA', 'uc-san-diego': 'UCSD', 'uc-irvine': 'UCI', 'uc-santa-barbara': 'UCSB', 'uc-riverside': 'UCR', 'uc-santa-cruz': 'UCSC', 'uc-san-francisco': 'UCSF' };

// Per-campus context for unique, keyword-rich content (enrollment figures verified fall 2024).
// nearbyAreas are real local neighborhoods/cities students search for dentists in (local SEO).
const UC_INFO = {
  'ucla': { enrollment: 'about 48,600 students (fall 2024)', founded: 1919, setting: 'the Westwood district of west Los Angeles', nearbyAreas: ['Westwood', 'Brentwood', 'Bel-Air', 'Santa Monica', 'West Los Angeles', 'Sawtelle'], blurb: 'UCLA sits in Westwood on the Westside of Los Angeles and enrolls roughly 48,600 students across its undergraduate and graduate programs, making it one of the largest UC campuses. Students live throughout Westwood, Brentwood, Santa Monica, and the West Los Angeles and Sawtelle neighborhoods, all of which have dense clusters of dental offices.', dentalNote: 'UCLA students enrolled in UC SHIP typically receive dental coverage through a Delta Dental PPO plan, with the specific benefits set each plan year by the campus.' },
  'uc-berkeley': { enrollment: 'about 46,000 students (fall 2024)', founded: 1868, setting: 'a city in the East Bay across from San Francisco', nearbyAreas: ['Downtown Berkeley', 'Southside', 'North Berkeley', 'Elmwood', 'Albany', 'Oakland'], blurb: 'UC Berkeley is in the East Bay city of Berkeley and enrolls about 46,000 undergraduate and graduate students, with many living in the Southside and Downtown Berkeley areas next to campus. Nearby Elmwood, North Berkeley, Albany, and neighboring Oakland round out the areas where students commonly search for a dentist.', dentalNote: 'UC Berkeley students on UC SHIP generally have dental coverage through a Delta Dental PPO plan, with details set each plan year by the campus.' },
  'uc-san-diego': { enrollment: 'about 45,000 students (fall 2024)', founded: 1960, setting: 'the La Jolla area of coastal San Diego', nearbyAreas: ['La Jolla', 'University City', 'Pacific Beach', 'Clairemont', 'Sorrento Valley', 'Del Mar'], blurb: 'UC San Diego is located in the La Jolla area along the coast of San Diego and enrolls around 45,000 students, a recent all-time high. Students cluster in La Jolla and University City, with Pacific Beach, Clairemont, Sorrento Valley, and Del Mar nearby for those looking for a dentist off campus.', dentalNote: 'UC San Diego students enrolled in UC SHIP typically have dental coverage through a Delta Dental PPO plan, with benefits set each plan year by the campus.' },
  'uc-irvine': { enrollment: 'about 37,300 students (fall 2024)', founded: 1965, setting: 'a planned city in Orange County', nearbyAreas: ['University Park', 'Woodbridge', 'Turtle Rock', 'Newport Beach', 'Costa Mesa', 'Tustin'], blurb: 'UC Irvine sits in the planned city of Irvine in central Orange County and enrolls roughly 37,300 students across its programs. Surrounding areas such as University Park, Woodbridge, Turtle Rock, and nearby Newport Beach, Costa Mesa, and Tustin are where students typically live and look for a dentist.', dentalNote: 'UC Irvine students on UC SHIP have dental coverage through the plan selected by the campus, and because the SHIP dental carrier has varied between providers over the years, students should confirm whether the current plan year uses Delta Dental.' },
  'uc-davis': { enrollment: 'about 41,200 students (fall 2024)', founded: 1905, setting: 'a college town in the Sacramento Valley', nearbyAreas: ['Downtown Davis', 'South Davis', 'West Davis', 'Woodland', 'Dixon', 'West Sacramento'], blurb: 'UC Davis is in the college town of Davis in the Sacramento Valley and enrolls a record of roughly 41,200 students, including large veterinary and medical programs. Students live across Downtown Davis, South Davis, and West Davis, and nearby Woodland, Dixon, and West Sacramento offer additional options for finding a dentist.', dentalNote: 'UC Davis students enrolled in UC SHIP typically receive dental coverage through a Delta Dental PPO plan, with the specifics set each plan year by the campus.' },
  'uc-santa-barbara': { enrollment: 'about 26,100 students (fall 2024)', founded: 1909, setting: 'a coastal campus next to Isla Vista', nearbyAreas: ['Isla Vista', 'Goleta', 'Santa Barbara', 'Ellwood', 'Montecito', 'Carpinteria'], blurb: 'UC Santa Barbara sits on the coast in the Santa Barbara area, immediately next to the student community of Isla Vista, and enrolls about 26,100 students. Isla Vista and neighboring Goleta house most students, while the city of Santa Barbara, Ellwood, Montecito, and Carpinteria are within reach for dental visits.', dentalNote: 'UC Santa Barbara students on UC SHIP generally have dental coverage through a Delta Dental PPO plan, with details set each plan year by the campus.' },
  'uc-riverside': { enrollment: 'about 26,400 students (fall 2024)', founded: 1954, setting: 'a city in the Inland Empire of Southern California', nearbyAreas: ['University District', 'Downtown Riverside', 'Canyon Crest', 'Moreno Valley', 'Corona', 'Jurupa Valley'], blurb: 'UC Riverside is in the Inland Empire city of Riverside and enrolls about 26,400 students, with a large share of California residents. The University District and Canyon Crest neighborhoods sit closest to campus, while Downtown Riverside, Moreno Valley, Corona, and Jurupa Valley are nearby for students searching for a dentist.', dentalNote: 'UC Riverside students enrolled in UC SHIP typically have dental coverage through a Delta Dental PPO plan, with benefits set each plan year by the campus.' },
  'uc-santa-cruz': { enrollment: 'about 19,900 students (fall 2024)', founded: 1965, setting: 'a coastal city on the Monterey Bay', nearbyAreas: ['Westside Santa Cruz', 'Downtown Santa Cruz', 'Live Oak', 'Capitola', 'Soquel', 'Scotts Valley'], blurb: 'UC Santa Cruz sits in the hills above the coastal city of Santa Cruz on the Monterey Bay and enrolls roughly 19,900 students. Students live across the Westside, Downtown Santa Cruz, and Live Oak, with Capitola, Soquel, and Scotts Valley nearby for dental appointments.', dentalNote: 'UC Santa Cruz students on UC SHIP generally have dental coverage through a Delta Dental PPO plan, with the details set each plan year by the campus.' },
  'uc-san-francisco': { enrollment: 'about 3,000 students, a graduate and health sciences campus', founded: 1864, setting: 'a health sciences campus in San Francisco', nearbyAreas: ['Parnassus Heights', 'Mission Bay', 'Inner Sunset', 'Cole Valley', 'Mission District', 'Potrero Hill'], blurb: 'UC San Francisco is a graduate and health sciences campus in San Francisco with about 3,000 students in medicine, dentistry, pharmacy, nursing, and graduate programs across its Parnassus Heights and Mission Bay sites. Students and trainees are spread across the Inner Sunset, Cole Valley, Mission District, and Potrero Hill, where dental offices are plentiful.', dentalNote: 'As a graduate and health sciences campus, UC San Francisco offers UC SHIP coverage that typically includes a Delta Dental PPO dental benefit, with specifics set each plan year by the campus.' },
  'uc-merced': { enrollment: 'about 9,100 students (fall 2024)', founded: 2005, setting: 'a city in the San Joaquin Valley of central California', nearbyAreas: ['Downtown Merced', 'North Merced', 'Bellevue Ranch', 'Atwater', 'Planada', 'Le Grand'], blurb: 'UC Merced is the newest UC campus, located in the San Joaquin Valley city of Merced, and enrolls about 9,100 students. Students live in North Merced near campus and in Downtown Merced and Bellevue Ranch, with Atwater, Planada, and Le Grand nearby in Merced County for those seeking a dentist.', dentalNote: 'UC Merced students enrolled in UC SHIP typically have dental coverage through a Delta Dental PPO plan, with benefits set each plan year by the campus.' }
};
const fmtList = (a) => a.length > 1 ? a.slice(0, -1).join(', ') + ', and ' + a[a.length - 1] : a[0];

const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// State slug, replicated from the main T5 generator (seo-build/generate-plans.js -> stateSlug).
// Falls back to slugify(state) for any state not in the explicit map, so it always returns a value.
function stateSlug(s) {
  const m = {
    'California': 'california', 'Illinois': 'illinois', 'Texas': 'texas',
    'Florida': 'florida', 'Nevada': 'nevada', 'Arizona': 'arizona',
    'Pennsylvania': 'pennsylvania', 'Connecticut': 'connecticut',
    'Rhode Island': 'rhode-island', 'New Jersey': 'new-jersey',
    'New York': 'new-york', 'Georgia': 'georgia', 'Virginia': 'virginia',
  };
  return m[s] || slugify(s);
}

// Canonical T5 dentist-profile URL, built FROM PARTS exactly as the main generator does:
//   /dental/{stateSlug(state)}/{slugify(seo_area||market_area)}/{slugify(city)}/{slug||slugify(name)}/
// Each dentist row already carries state, market_area, seo_area and slug, so no markets-table join
// is needed (the main generator likewise derives mkSlug from slugify(seo_area||market_area)).
// Returns a root-relative path on success, or null when a required part is missing.
function t5Url(d) {
  const state = (d.state || '').trim();
  const market = (d.seo_area || d.market_area || '').trim();
  const city = (d.city || '').trim();
  const nameForSlug = d.practice_name || d.name || '';
  const dSlug = d.slug || slugify(nameForSlug);
  if (!state || !market || !city || !dSlug) return null;
  return `/dental/${stateSlug(state)}/${slugify(market)}/${slugify(city)}/${dSlug}/`;
}
// Office profile href: prefer the built-from-parts T5 URL; if parts are missing,
// fall back to the Delta directory (never the hub root, never the stale seo_path).
function officeProfileHref(d) {
  return t5Url(d) || (BASE + '/find-a-dentist/');
}
function haversine(a, b, c, d) {
  const R = 3958.8, dl = (c - a) * Math.PI / 180, dn = (d - b) * Math.PI / 180;
  const x = Math.sin(dl / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
function ratingTxt(d) {
  const r = Number(d.aggregate_rating || 0), n = Number(d.aggregate_review_count || 0);
  return r ? ('★ ' + r.toFixed(1) + (n ? ' (' + n.toLocaleString() + ')' : '')) : 'reviews pending';
}

const HEAD = (title, desc, canonical, jsonld, robots) => `<!doctype html>
<html lang="en-US"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XNBPGSZ1LZ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XNBPGSZ1LZ');</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots || 'index, follow, max-image-preview:large'}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8699915070570206" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/assets/css/mega-nav.css">
<link rel="stylesheet" href="/assets/css/mega-nav-mobile.css">
<link rel="stylesheet" href="/assets/css/footer.css">
<script type="application/ld+json">${jsonld}</script>
<style>
 :root{--bg:#fff;--panel:#F5F7F8;--graphite:#12161B;--ink:#161A1F;--muted:#5A636E;--line:rgba(18,22,27,.10);--line-strong:rgba(18,22,27,.20);--jade:#0FB5A6;--jade-deep:#0C8C81;--jade-ink:#08312D;--jade-tint:#E6F7F4;--rust:#C4573B;--serif:'Fraunces',Georgia,serif;--sans:'Inter',-apple-system,sans-serif;--shadow:0 1px 2px rgba(18,22,27,.05),0 18px 44px -26px rgba(18,22,27,.4);}
 *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
 #cc-nav-mount{min-height:64px}#cc-footer-mount{min-height:300px}
 h1,h2,h3,h4{font-family:var(--serif);font-weight:500;line-height:1.1;letter-spacing:-.015em;margin:0}a{color:inherit}
 .wrap{max-width:1080px;margin:0 auto;padding:0 26px}
 .sub{position:static;z-index:20;background:var(--panel);border-bottom:1px solid var(--line)}
 .sub .wrap{display:flex;align-items:center;gap:22px;height:58px}
 .brand{font-family:var(--serif);font-size:18px;font-weight:600;text-decoration:none;display:flex;align-items:center;gap:9px}
 .brand .mk{width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,var(--jade),var(--jade-deep))}
 .sub nav{display:flex;gap:20px;margin-left:auto;font-size:14px;font-weight:500}.sub nav a{color:var(--muted);text-decoration:none}.sub nav a:hover{color:var(--ink)}
 @media(max-width:860px){.sub nav{display:none}}
 .crumb{background:#fff;border-bottom:1px solid rgba(18,22,27,.10);font-size:12.5px;color:#5A636E}.crumb .wrap{padding-top:11px;padding-bottom:11px}.crumb a{color:var(--muted);text-decoration:none}.crumb a:hover{color:var(--jade-deep)}.crumb span{color:var(--jade-deep)}
 .hero{padding:18px 0 8px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--jade-deep)}
 h1.title{font-size:clamp(30px,4.4vw,46px);margin:12px 0 0}h1.title em{font-style:italic;color:var(--jade-deep);white-space:nowrap}h1.title .t-sub{display:block;font-size:.6em;font-style:normal;color:var(--muted);margin-top:4px}
 .cta-sub{font-size:13px;color:var(--muted);margin:10px 0 0}
 .lede{font-size:17.5px;color:var(--muted);max-width:680px;margin:16px 0 0}
 .facts{display:flex;flex-wrap:wrap;gap:0;border:1px solid var(--line);border-radius:12px;overflow:hidden;margin:22px 0 0;background:var(--bg)}
 .facts div{flex:1;min-width:130px;padding:14px 16px;border-right:1px solid var(--line)}.facts div:last-child{border-right:none}
 .facts b{font-family:var(--serif);font-size:21px;color:var(--jade-deep);display:block;line-height:1}.facts span{font-size:12px;color:var(--muted)}
 section.block{padding:40px 0;border-top:1px solid var(--line)}
 .sec-head{margin-bottom:20px}.sec-head h2{font-size:clamp(24px,3vw,32px)}.sec-head p{color:var(--muted);font-size:15px;margin:8px 0 0;max-width:640px}
 .offices{display:grid;gap:12px}
 .office{display:grid;grid-template-columns:54px 1fr auto;gap:16px;align-items:center;background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
 .office .av{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--jade),var(--jade-deep));color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:18px}
 .office h3{font-size:17px}.office .meta{font-size:13px;color:var(--muted);margin:3px 0 0}
 .office .net{font-size:11px;font-weight:600;color:var(--muted);background:var(--panel);padding:4px 9px;border-radius:999px;white-space:nowrap}
 .office .oinfo{min-width:0}.office .otop{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
 .office .orate{font-size:13.5px;margin:4px 0 1px}.office .orate .stars{color:var(--jade-deep);font-weight:700}.office .orate .rc{color:var(--muted)}.office .orate .newtag{color:var(--muted);font-size:12.5px}
 .tierbadge{font-size:10.5px;font-weight:700;letter-spacing:.02em;padding:3px 9px;border-radius:999px;white-space:nowrap}
 .tb-plat{background:#1b1606;color:#E9C766;border:1px solid #C8A84E}
 .tb-accr{background:var(--jade-tint);color:var(--jade-ink);border:1px solid var(--jade)}
 .tb-ver{background:var(--panel);color:var(--muted);border:1px solid var(--line-strong)}
 .office.feat-plat{border-color:#C8A84E;box-shadow:inset 0 0 0 1px #C8A84E,var(--shadow);background:linear-gradient(180deg,#fffdf4,#fff)}
 .office.feat-plat .av{background:linear-gradient(135deg,#E9C766,#C8A84E);color:#1b1606}
 .office.feat-accr{border-color:var(--jade);box-shadow:inset 0 0 0 1px var(--jade)}
 .oacts{display:flex;flex-direction:column;gap:6px;align-items:stretch;text-align:center}
 .net-pri{background:var(--jade);color:var(--jade-ink)}.net-sec{background:var(--panel);color:var(--ink);border:1px solid var(--line-strong)}.net.wide{grid-column:1/-1;text-align:center}
 .av-img{padding:0;overflow:hidden}.av-img img{width:100%;height:100%;object-fit:cover;border-radius:50%}
 .av{position:relative}.av-king,.av-queen{position:absolute;top:-4px;right:-4px;width:19px;height:19px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;border:2px solid #fff}
 .av-king{background:#C8A84E;color:#1b1606}.av-queen{background:var(--jade);color:#fff}
 .tb-pub{background:var(--panel);color:var(--muted);border:1px solid var(--line)}
 .otags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
 .otag{font-size:11px;font-weight:600;color:var(--jade-ink);background:var(--jade-tint);border-radius:999px;padding:3px 9px}
 .wkchip{font-size:11.5px;font-weight:600;color:var(--jade-deep)}
 .oclaim{font-size:11.5px;color:var(--muted);margin-top:9px;position:relative;z-index:2}.oclaim a{color:var(--jade-deep);font-weight:600;text-decoration:none}
 .office .oacts{display:grid;grid-template-columns:1fr 1fr;gap:6px;align-content:start}
 .citysplit{display:grid;grid-template-columns:minmax(0,1fr) 480px;gap:28px;align-items:start;border-top:1px solid var(--line);padding-top:26px;margin-top:6px}
 .uc-pin span{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--jade-deep);color:#fff;font-size:16px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)}
 .dot-u{background:var(--jade-deep)}
 .citylist{min-width:0}.citylist .block{padding-top:0;border-top:none}
 .citymapcol{position:sticky;top:var(--cc-nav-h,68px)}
 .ccmap{height:calc(100vh - 130px);min-height:440px;border:1px solid var(--line);border-radius:16px;background:var(--panel);overflow:hidden;z-index:0}
 .ccmap .leaflet-popup-content{font-family:var(--sans);font-size:13px}.ccmap a{color:var(--jade-deep);font-weight:600;text-decoration:none}
 .ccmap .leaflet-control-attribution{font-size:9px;opacity:.55}
 .maplabel{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11.5px;color:var(--muted);margin:0 0 8px}
 .maplabel .dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-left:8px;border:1.5px solid #fff;box-shadow:0 0 0 1px var(--line)}
 .maplabel .dot:first-child{margin-left:0}.dot-p{background:#C8A84E}.dot-a{background:#0FB5A6}.dot-d{background:#A9B2BC}
 .office{position:relative;transition:box-shadow .18s ease,border-color .18s ease}
 .office:hover,.office.is-hi{border-color:rgba(15,181,166,.45);box-shadow:var(--shadow)}
 .office.is-active{box-shadow:0 0 0 2px var(--jade),var(--shadow);border-color:var(--jade)}
 .av{background:var(--panel);color:var(--graphite)}
 .office.feat-plat .av{background:linear-gradient(135deg,#E9C766,#C8A84E);color:#1b1606}
 .office.feat-accr .av{background:var(--jade-tint);color:var(--jade-ink)}
 .otags{display:flex;flex-wrap:wrap;gap:5px;margin-top:7px}.otag{font-size:11.5px;color:var(--muted)}.otag:not(:last-child)::after{content:'·';margin-left:5px;color:var(--line-strong)}
 .nodelta{display:inline-block;margin-left:4px;color:var(--muted)}.nodelta a{color:var(--jade-deep);font-weight:600;text-decoration:none}
 .mapwrap{position:relative}
 .cc-pin{display:inline-flex;align-items:center;font:600 12px/1 var(--sans);padding:5px 9px;border-radius:999px;border:2px solid #fff;white-space:nowrap;box-shadow:0 2px 6px rgba(18,22,27,.28);cursor:pointer;transition:transform .12s}
 .cc-pin-p{background:#C8A84E;color:#1b1606}.cc-pin-a{background:var(--jade);color:#fff}.cc-pin-v{background:#7C8794;color:#fff}.cc-pin-d{background:#fff;color:var(--ink);border-color:var(--line-strong)}
 .cc-pin-on{transform:scale(1.16);box-shadow:0 5px 14px rgba(18,22,27,.4);z-index:1000}
 .cc-mapbtn{width:34px;height:34px;background:#fff;border:1px solid var(--line-strong);border-radius:9px;font-size:16px;line-height:1;cursor:pointer;color:var(--graphite);box-shadow:0 1px 3px rgba(18,22,27,.18);margin-bottom:6px;display:block}
 .cc-mapbtn:hover{border-color:var(--jade);color:var(--jade-deep)}
 .oname{color:inherit;text-decoration:none;position:relative;z-index:2}.oname:hover{color:var(--jade-deep)}
 .osave{position:absolute;top:12px;right:14px;z-index:2;width:30px;height:30px;border-radius:50%;border:1px solid var(--line);background:var(--bg);color:var(--muted);font-size:15px;line-height:1;cursor:pointer;transition:.15s}
 .osave:hover{border-color:var(--jade);color:var(--jade-deep)}.osave.on{color:#C4573B;border-color:#C4573B}
 .onom{position:relative;z-index:2;background:none;border:none;padding:0;margin-top:8px;color:var(--jade-deep);font:600 12.5px var(--sans);cursor:pointer;text-decoration:none}.onom:hover{text-decoration:underline}
 .nomline{font-size:13.5px;color:var(--muted);margin:16px 0 0;text-align:center}
 .cctray{position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--graphite);color:#fff;box-shadow:0 -8px 30px -12px rgba(0,0,0,.5)}
 .cctray-in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
 .cctray-n{font-size:14px}.cctray-n b{font-size:18px;font-family:var(--serif)}
 .cctray-acts{display:flex;align-items:center;gap:10px}.cctray .lnk{color:#cfd6dd}
 .ccmodal[hidden]{display:none}
 .ccmodal{position:fixed;inset:0;z-index:80;background:rgba(12,16,20,.55);display:flex;align-items:center;justify-content:center;padding:20px}
 .ccmodal-card{background:var(--bg);border-radius:18px;max-width:520px;width:100%;padding:28px;position:relative;box-shadow:var(--shadow)}
 .ccmodal-x{position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;color:var(--muted);cursor:pointer;line-height:1}
 .ccm-h{font-family:var(--serif);font-size:22px;margin:0 0 10px}.ccm-p{color:var(--muted);font-size:14.5px;margin:0 0 18px}
 .ccm-t{width:100%;border-collapse:collapse;font-size:14px}.ccm-t th{text-align:left;color:var(--muted);font-weight:600;font-size:12px;padding:6px 8px;border-bottom:1px solid var(--line)}.ccm-t td{padding:9px 8px;border-bottom:1px solid var(--line)}.ccm-t td a{color:var(--ink);text-decoration:none}.ccm-t .net{padding:6px 12px;font-size:12.5px}
 @media(max-width:880px){.cctray-acts .btn{padding:9px 14px;font-size:13px}.cctray-in{gap:10px}}
 .ostretch{position:absolute;inset:0;z-index:1;border-radius:14px}
 .office .oacts,.office .tierbadge{position:relative;z-index:2}
 .officescroll{max-height:calc(100vh - 250px);min-height:460px;overflow-y:auto;overflow-x:hidden;padding:8px 8px 4px 4px;-webkit-overflow-scrolling:touch;scrollbar-gutter:stable}
 .filterbar{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}
 .fchip{font-family:var(--sans);font-size:13px;font-weight:600;padding:7px 14px;border-radius:999px;border:1px solid var(--line-strong);background:var(--bg);color:var(--ink);cursor:pointer;transition:.15s}
 .fchip:hover{border-color:var(--jade)}.fchip.is-on{background:var(--graphite);color:#fff;border-color:var(--graphite)}
 .loadmore{margin:14px auto 0;display:block}.loadmore[hidden]{display:none}
 .searchmore{display:block;text-align:center;margin:12px auto 0;font-size:14px;font-weight:600;color:var(--jade-deep);text-decoration:none}.searchmore:hover{text-decoration:underline}
 .osave.on{color:#E0556B;border-color:#E0556B}
 .nomatch{color:var(--muted);font-size:14px;padding:18px 4px}.lnk{background:none;border:none;color:var(--jade-deep);font-weight:600;cursor:pointer;font-size:14px;padding:0}
 .planpromo{display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:linear-gradient(135deg,var(--jade-ink),var(--graphite));color:#fff;border-radius:18px;padding:24px 28px}
 .planpromo h3{font-family:var(--serif);font-size:22px;margin:0}.planpromo p{font-size:14px;opacity:.85;margin:6px 0 0;max-width:600px}.planpromo .btn{background:#fff;color:var(--jade-ink);white-space:nowrap}
 .browse{display:flex;flex-wrap:wrap;gap:9px}
 .browse a{font-size:13px;font-weight:600;color:var(--ink);background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:9px 15px;text-decoration:none}
 .browse a:hover{border-color:var(--jade);color:var(--jade-deep)}
 .uc-tear{filter:drop-shadow(0 3px 4px rgba(12,140,129,.5))}.uc-tear svg{display:block;overflow:visible}
 .uc-tear .ring{transform-box:fill-box;transform-origin:center;animation:ucpulse 3.2s ease-out infinite}
 @keyframes ucpulse{0%{transform:scale(.6);opacity:.4}70%{transform:scale(1.9);opacity:0}100%{opacity:0}}
 @media (prefers-reduced-motion:reduce){.uc-tear .ring{animation:none}}
 .officescroll .offices{gap:12px}
 .officescroll::-webkit-scrollbar{width:8px}.officescroll::-webkit-scrollbar-thumb{background:var(--line-strong);border-radius:8px}.officescroll::-webkit-scrollbar-track{background:transparent}
 @media(max-width:880px){.citysplit{grid-template-columns:1fr;gap:16px}.citymapcol{position:static;order:-1}.ccmap{height:300px;min-height:0}.officescroll{max-height:none;min-height:0;overflow:visible;padding-right:0}}
 .btn{font-family:var(--sans);font-weight:600;font-size:14.5px;border-radius:999px;padding:12px 22px;border:1px solid transparent;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
 .btn-jade{background:var(--jade);color:var(--jade-ink)}.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line-strong)}
 .cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
 .note{font-size:12.5px;color:var(--muted);margin-top:14px}
 .alloffices{list-style:none;padding:0;margin:18px 0 0;columns:2;column-gap:28px}
 @media(max-width:620px){.alloffices{columns:1}}
 .alloffices li{break-inside:avoid;padding:6px 0;border-bottom:1px solid var(--line);font-size:14px}
 .alloffices a{color:var(--ink);text-decoration:none}.alloffices a:hover{color:var(--jade-deep)}
 .linkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
 .lc{display:block;background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:18px;text-decoration:none;color:var(--ink);transition:transform .16s,box-shadow .2s}
 .lc:hover{transform:translateY(-2px);box-shadow:var(--shadow)}.lc .k{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--jade-deep)}.lc h3{font-size:17px;margin:8px 0 5px}.lc p{font-size:13px;color:var(--muted);margin:0}
 details.faq{border-top:1px solid var(--line);padding:14px 0}details.faq summary{font-family:var(--serif);font-size:17px;cursor:pointer;list-style:none}details.faq .body{font-size:14.5px;color:var(--muted);margin-top:8px}
 footer{border-top:1px solid var(--line);margin-top:30px;padding:26px 0;font-size:12.5px;color:var(--muted)}footer a{color:var(--jade-deep);text-decoration:none}
 .answer{background:var(--panel);border:1px solid var(--line);border-left:4px solid var(--jade);border-radius:14px;padding:22px 26px;margin-top:16px}.answer .q{font-family:var(--serif);font-size:21px}.answer .a{font-size:15.5px;margin-top:6px}.answer b{color:var(--jade-deep)}
 ol.verify-steps{counter-reset:vs;list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}
 ol.verify-steps li{position:relative;padding:14px 16px 14px 52px;background:var(--bg);border:1px solid var(--line);border-radius:12px;font-size:15px;line-height:1.5}
 ol.verify-steps li::before{counter-increment:vs;content:counter(vs,decimal-leading-zero);position:absolute;left:16px;top:13px;font-family:var(--serif);font-size:15px;font-weight:600;color:var(--jade-deep)}
 ol.verify-steps b{color:var(--ink)}
 table.cov{width:100%;border-collapse:collapse;margin-top:14px;font-size:14.5px}
 table.cov th,table.cov td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line)}
 table.cov thead th{font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);font-weight:700}
 table.cov tbody td:first-child{font-weight:600;color:var(--ink)}
 table.cov tbody td:nth-child(2){color:var(--jade-deep)}
 .ortho-pivot{margin-top:18px;background:var(--panel);border:1px solid var(--line);border-left:4px solid var(--jade);border-radius:14px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
 .ortho-pivot .op-text{flex:1;min-width:300px}
 .ortho-pivot h3{font-family:var(--serif);font-size:21px;margin:6px 0 8px}
 .ortho-pivot p{font-size:14.5px;color:var(--muted);margin:0;max-width:60ch}
 .ortho-pivot .cta{display:flex;flex-direction:column;gap:10px;flex-shrink:0}
 .ortho-pivot .cta .btn{white-space:nowrap;text-align:center;justify-content:center}
 @media(max-width:620px){.ortho-pivot .cta{flex-direction:row;flex-wrap:wrap}}
 .acct-cta{margin-top:14px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}
 .acct-cta .ac-text{flex:1;min-width:240px}
 .acct-cta h3{font-family:inherit;font-size:15px;line-height:1.4;font-weight:600;margin:0;color:var(--ink)}
 .acct-cta p{font-size:13px;color:var(--muted);margin:4px 0 0;max-width:62ch}
 .btn-sm{padding:8px 15px;font-size:13px;white-space:nowrap}
 /* ============================================================
    DELTA CLUSTER NAV  (self-contained, reusable, prefix dcn-)
    Graphite & Jade. Flush-left. Humana-style category dropdowns.
    Prefixed dcn- so it cannot collide with #cc-nav-mount or hubSetTier.
    ============================================================ */
 .dcn{position:sticky;top:var(--cc-nav-h,68px);z-index:8000;border-top:1px solid rgba(18,22,27,.10);border-bottom:1px solid rgba(18,22,27,.10);background:#fff}
 .dcn-bar{display:flex;align-items:center;gap:2px;max-width:1180px;margin:0;padding:0 32px;min-height:50px}
 .dcn-menu{display:flex;align-items:center;gap:2px}
 .dcn-item{position:relative}
 .dcn-trigger{display:inline-flex;align-items:center;gap:7px;font-family:'Inter',-apple-system,sans-serif;font-size:14px;font-weight:600;color:#161A1F;background:transparent;border:0;border-radius:8px;padding:8px 13px;cursor:pointer;line-height:1}
 .dcn-trigger:hover,.dcn-trigger:focus-visible,.dcn-trigger[aria-expanded="true"]{color:#0C8C81;background:#E6F7F4}
 .dcn-trigger:focus-visible{outline:2px solid #0FB5A6;outline-offset:2px}
 .dcn-caret{width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);margin-top:-2px;transition:transform .15s ease}
 .dcn-trigger[aria-expanded="true"] .dcn-caret{transform:rotate(-135deg);margin-top:2px}
 .dcn-cta{margin-left:10px;display:inline-flex;align-items:center;gap:8px;font-family:'Inter',-apple-system,sans-serif;font-size:14px;font-weight:600;text-decoration:none;color:#0C8C81;background:none;padding:9px 4px;white-space:nowrap}
 .dcn-cta:hover{color:#0C8C81}
 .dcn-pin{width:9px;height:9px;border-radius:50% 50% 50% 0;background:#0FB5A6;transform:rotate(-45deg);box-shadow:0 0 0 3px #E6F7F4;flex:0 0 auto}
 .dcn-panel{position:absolute;top:calc(100% + 7px);left:0;width:290px;background:#fff;border:1px solid rgba(18,22,27,.20);border-radius:12px;box-shadow:0 1px 2px rgba(18,22,27,.05),0 18px 44px -26px rgba(18,22,27,.4);padding:7px;z-index:60;display:none}
 .dcn-panel.dcn-open{display:block}
 .dcn-panel::before{content:"";position:absolute;top:-7px;left:20px;width:12px;height:12px;background:#fff;border-left:1px solid rgba(18,22,27,.20);border-top:1px solid rgba(18,22,27,.20);transform:rotate(45deg)}
 .dcn-link{display:block;text-decoration:none;color:#161A1F;padding:8px 11px;border-radius:9px}
 .dcn-link:hover,.dcn-link:focus-visible{background:#E6F7F4;outline:none}
 .dcn-link .dcn-t{display:block;font-family:'Inter',-apple-system,sans-serif;font-size:13.5px;font-weight:600;line-height:1.3;color:#161A1F}
 .dcn-link .dcn-d{display:block;font-size:11.5px;font-weight:400;color:#5A636E;margin-top:2px;line-height:1.4}
 .dcn-link:hover .dcn-t{color:#0C8C81}
 .dcn-mtoggle{display:none}
 @media(max-width:760px){
   .dcn-bar{flex-wrap:wrap;gap:0;min-height:0;padding:10px 24px;align-items:stretch}
   .dcn-mtoggle{display:inline-flex;align-items:center;gap:8px;margin-left:auto;font-family:'Inter',-apple-system,sans-serif;font-size:13.5px;font-weight:600;color:#161A1F;background:#fff;border:1px solid rgba(18,22,27,.20);border-radius:10px;padding:9px 14px;cursor:pointer}
   .dcn-mtoggle[aria-expanded="true"]{border-color:#0FB5A6;color:#0C8C81}
   .dcn-menu{display:none;flex-direction:column;align-items:stretch;width:100%;gap:0;margin-top:8px}
   .dcn.dcn-mopen .dcn-menu{display:flex}
   .dcn-item{border-top:1px solid rgba(18,22,27,.10)}
   .dcn-trigger{width:100%;justify-content:space-between;border-radius:0;padding:14px 4px;font-size:15px}
   .dcn-panel{position:static;display:none;width:auto;box-shadow:none;border:0;border-radius:0;padding:0 0 12px}
   .dcn-panel::before{display:none}
   .dcn-panel.dcn-open{display:block}
   .dcn-cta{display:none}
   .dcn.dcn-mopen .dcn-cta{display:inline-flex;margin:12px 0 2px;width:100%;justify-content:center}
 }
 @media(prefers-reduced-motion:reduce){.dcn-caret{transition:none}}
</style></head><body>
<div id="cc-nav-mount"></div>`;

// Compact Delta cluster dropdown nav, copied from the hub at /dental-insurance/delta-dental/.
// Absolute hrefs already point under the relocated hub. Emitted in all 4 builders right after
// the universal #cc-nav-mount and before the page breadcrumb. CSS lives in the shared <style>;
// behaviour script lives in FOOT.
const DCN_NAV = `<nav class="dcn" id="dcn" aria-label="Inside Delta Dental">
  <div class="dcn-bar">
    <button type="button" class="dcn-mtoggle" id="dcnMenuToggle" aria-expanded="false" aria-controls="dcnMenu">Menu</button>
    <div class="dcn-menu" id="dcnMenu">
      <div class="dcn-item">
        <button type="button" class="dcn-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="dcnPanelPlans">Plans <span class="dcn-caret" aria-hidden="true"></span></button>
        <div class="dcn-panel" id="dcnPanelPlans" role="region" aria-label="Plans">
          <a class="dcn-link" href="/dental-insurance/delta-dental/individual-plans/"><span class="dcn-t">Individual plans</span><span class="dcn-d">Premium vs Basic, side by side</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/premium/"><span class="dcn-t">Premium plan</span><span class="dcn-d">Full coverage breakdown</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/compare/"><span class="dcn-t">Compare carriers</span><span class="dcn-d">Delta vs MetLife, Cigna, Guardian</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/is-delta-good/"><span class="dcn-t">Is Delta good? Reviews</span><span class="dcn-d">Ratings and the honest verdict</span></a>
        </div>
      </div>
      <div class="dcn-item">
        <button type="button" class="dcn-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="dcnPanelNetworks">Networks <span class="dcn-caret" aria-hidden="true"></span></button>
        <div class="dcn-panel" id="dcnPanelNetworks" role="region" aria-label="Networks">
          <a class="dcn-link" href="/dental-insurance/delta-dental/networks/"><span class="dcn-t">HMO vs PPO vs Premier</span><span class="dcn-d">Three networks, three rule sets</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/find-a-dentist/"><span class="dcn-t">Find a dentist near you</span><span class="dcn-d">Who takes Delta, and how to confirm</span></a>
        </div>
      </div>
      <div class="dcn-item">
        <button type="button" class="dcn-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="dcnPanelMembers">Who it's for <span class="dcn-caret" aria-hidden="true"></span></button>
        <div class="dcn-panel" id="dcnPanelMembers" role="region" aria-label="Who it's for">
          <a class="dcn-link" href="/dental-insurance/delta-dental/over-65/"><span class="dcn-t">Seniors and Medicare</span><span class="dcn-d">Medicare Advantage dental options</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/uc-students/"><span class="dcn-t">UC students</span><span class="dcn-d">UC SHIP runs on Delta PPO</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/for-employers/"><span class="dcn-t">Employers</span><span class="dcn-d">Group PPO, Premier and DHMO</span></a>
        </div>
      </div>
      <div class="dcn-item">
        <button type="button" class="dcn-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="dcnPanelDentists">Use your plan <span class="dcn-caret" aria-hidden="true"></span></button>
        <div class="dcn-panel" id="dcnPanelDentists" role="region" aria-label="Use your plan">
          <a class="dcn-link" href="/dental-insurance/delta-dental/eligibility/"><span class="dcn-t">Payer IDs and eligibility</span><span class="dcn-d">Which Delta runs a plan, portals, payer IDs by state</span></a>
          <a class="dcn-link" href="/dental-insurance/delta-dental/for-dentists/"><span class="dcn-t">For dentists, contracting</span><span class="dcn-d">PPO vs Premier, credentialing, fees</span></a>
        </div>
      </div>
    </div>
    <a class="dcn-cta" href="/dental-insurance/delta-dental/find-a-dentist/"><span class="dcn-pin" aria-hidden="true"></span>Find a dentist</a>
  </div>
</nav>`;

// Universal CoverCapy footer mount + the shared component loader (mega-nav + footer). Absolute
// asset paths so it resolves from deep URLs like /dental-insurance/ppo-plans/delta-dental/students/uc-irvine/.
const FOOT = `
<p class="note" style="max-width:1080px;margin:0 auto;padding:18px 26px 0">Independent, paid by the dental offices in our network, not by which plan you choose. Not affiliated with Delta Dental Plans Association. Eligibility and in-network status are confirmed with the carrier and office before you book.</p>
<div id="cc-footer-mount" aria-label="CoverCapy footer mount"></div>
<script>
// Delta cluster nav behaviour (self-contained, prefix dcn)
(function(){
  var nav=document.getElementById('dcn');
  if(!nav)return;
  var items=Array.prototype.slice.call(nav.querySelectorAll('.dcn-item')),
      hoverOk=window.matchMedia('(min-width:761px)'),
      tmr=null,openItem=null;
  function panelOf(it){return it.querySelector('.dcn-panel');}
  function trigOf(it){return it.querySelector('.dcn-trigger');}
  function openOne(it){
    if(openItem&&openItem!==it)closeOne(openItem);
    var p=panelOf(it),t=trigOf(it);
    t.setAttribute('aria-expanded','true');
    p.classList.add('dcn-open');
    requestAnimationFrame(function(){p.classList.add('dcn-show');});
    openItem=it;
  }
  function closeOne(it){
    var p=panelOf(it),t=trigOf(it);
    t.setAttribute('aria-expanded','false');
    p.classList.remove('dcn-show');
    p.classList.remove('dcn-open');
    if(openItem===it)openItem=null;
  }
  function closeAll(){if(openItem)closeOne(openItem);}
  items.forEach(function(it){
    var t=trigOf(it);
    t.addEventListener('click',function(e){
      e.preventDefault();clearTimeout(tmr);
      (t.getAttribute('aria-expanded')==='true')?closeOne(it):openOne(it);
    });
    it.addEventListener('mouseenter',function(){if(hoverOk.matches){clearTimeout(tmr);openOne(it);}});
    it.addEventListener('mouseleave',function(){if(hoverOk.matches){tmr=setTimeout(function(){closeOne(it);},160);}});
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&openItem){var it=openItem;closeOne(it);trigOf(it).focus();}
  });
  document.addEventListener('click',function(e){
    if(openItem&&!nav.contains(e.target))closeAll();
  });
  var mt=document.getElementById('dcnMenuToggle');
  if(mt){
    mt.addEventListener('click',function(){
      var open=nav.classList.toggle('dcn-mopen');
      mt.setAttribute('aria-expanded',open?'true':'false');
      if(!open)closeAll();
    });
  }
})();
</script>
<script>
(function(){
  var components=[
    {mountId:'cc-nav-mount',html:'/components/mega-nav.html',script:'/assets/js/mega-nav.js'},
    {mountId:'cc-footer-mount',html:'/components/footer.html',script:'/assets/js/footer.js'}
  ];
  function loadScript(src){return new Promise(function(resolve){if(!src||document.querySelector('script[src="'+src+'"]'))return resolve();var s=document.createElement('script');s.src=src;s.defer=true;s.onload=function(){resolve();};s.onerror=function(){resolve();};document.body.appendChild(s);});}
  function replayScripts(scripts){scripts.forEach(function(old){if(!old.parentNode)return;var fresh=document.createElement('script');for(var i=0;i<old.attributes.length;i++){fresh.setAttribute(old.attributes[i].name,old.attributes[i].value);}fresh.textContent=old.textContent;old.parentNode.replaceChild(fresh,old);});}
  function injectComponent(c){var mount=document.getElementById(c.mountId);if(!mount)return Promise.resolve();return fetch(c.html,{cache:'no-cache'}).then(function(res){if(!res.ok)throw new Error(res.status);return res.text();}).then(function(txt){var wrapper=document.createElement('div');wrapper.innerHTML=txt;var injectedScripts=Array.prototype.slice.call(wrapper.querySelectorAll('script'));var parent=mount.parentNode;while(wrapper.firstChild)parent.insertBefore(wrapper.firstChild,mount);parent.removeChild(mount);replayScripts(injectedScripts);}).catch(function(err){console.warn('[CoverCapy loader] component failed:',c.html,err);});}
  function init(){var chain=Promise.resolve();components.forEach(function(c){chain=chain.then(function(){return injectComponent(c);});});chain.then(function(){components.forEach(function(c){loadScript(c.script);});});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
</script>
</body></html>`;

function tierInfo(d) {
  const s = String(d.accreditation_status || '').toLowerCase();
  if (s.indexOf('platinum') > -1) return { label: 'Platinum Elite', cls: 'feat-plat', badge: 'tb-plat', feat: true };
  if (s.indexOf('accredit') > -1) return { label: 'Capy Accredited', cls: 'feat-accr', badge: 'tb-accr', feat: true };
  if (s.indexOf('verified') > -1) return { label: 'Verified', cls: 'feat-ver', badge: 'tb-ver', feat: false };
  return { label: '', cls: '', badge: '', feat: false };
}
function ratingHtml(d) {
  const r = Number(d.aggregate_rating || 0), n = Number(d.aggregate_review_count || 0);
  if (!r) return '<span class="newtag">New · reviews pending</span>';
  return `<span class="stars">★ ${r.toFixed(1)}</span>${n ? ` <span class="rc">· ${n.toLocaleString()} review${n === 1 ? '' : 's'}</span>` : ''}`;
}
// Two tags from specialties + procedures + non-English languages (skip generic terms unless nothing else).
const GENERIC_TAGS = ['general dentistry', 'preventative dentistry', 'preventive dentistry', 'dentist', 'dentistry'];
function cardTags(d) {
  const pool = []
    .concat(Array.isArray(d.specialties) ? d.specialties : [])
    .concat(Array.isArray(d.procedures) ? d.procedures : [])
    .concat((Array.isArray(d.languages) ? d.languages : []).filter(l => !/^english$/i.test(String(l || ''))))
    .map(x => String(x || '').trim()).filter(Boolean);
  const seen = {}, good = [], generic = [];
  pool.forEach(x => { const k = x.toLowerCase(); if (seen[k]) return; seen[k] = 1; (GENERIC_TAGS.indexOf(k) > -1 ? generic : good).push(x); });
  const pick = good.concat(generic).slice(0, 2);
  return pick.length ? `<div class="otags">${pick.map(x => `<span class="otag">${esc(x)}</span>`).join('')}</div>` : '';
}
function avatarMarkup(d, ini) {
  const img = (d.image_url && /^https?:\/\//.test(String(d.image_url))) ? String(d.image_url) : '';
  if (img) return `<div class="av av-img"><img src="${esc(img)}" alt="" loading="lazy"></div>`;
  return `<div class="av" aria-hidden="true">${esc(ini || 'D')}</div>`;
}
function officeList(offices, showDist) {
  if (!offices.length) return '<p class="note">We’re still confirming Delta-friendly offices here. <a href="' + BASE + '/" style="color:var(--jade-deep);font-weight:600;">Search the full directory</a>.</p>';
  return '<div class="offices">' + offices.map(d => {
    const nm = d.practice_name || d.name || 'Dental Office';
    const ini = nm.replace(/^(Dr\.?\s+)/i, '').split(/\s+/).map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
    const prof = esc(officeProfileHref(d));
    const id = slugify(nm);
    const t = tierInfo(d);
    // Badge ONLY for earned, paid tiers, no operational "pending" labels in the patient view.
    const badge = t.feat ? `<span class="tierbadge ${t.badge}">${t.label}</span>` : '';
    const dist = (showDist && d.dist != null) ? `<span class="dist">${d.dist.toFixed(1)} mi</span>` : '';
    const wk = (d.open_weekends === true || String(d.open_weekends) === 'true') ? 1 : 0;
    const wkChip = wk ? ` · <span class="wkchip">${esc(d.weekend_hours_note || 'Open weekends')}</span>` : '';
    const tags = cardTags(d);
    const tslug = t.label === 'Platinum Elite' ? 'platinum-elite' : t.label === 'Capy Accredited' ? 'capy-accredited' : t.label === 'Verified' ? 'verified' : '';
    const rv = Number(d.aggregate_rating || 0);
    const nominate = t.feat ? '' : `<button type="button" class="onom" data-nom="${esc(id)}" data-nm="${esc(nm)}">Nominate this office</button>`;
    return `<article class="office ${t.cls}" data-id="${esc(id)}" data-nm="${esc(nm)}" data-prof="${prof}" data-rating="${rv}" data-tier="${tslug}" data-wknd="${wk}"><a class="ostretch" href="${prof}" aria-label="${esc(nm)}"></a><button type="button" class="osave" data-save="${esc(id)}" aria-label="Save ${esc(nm)}" title="Save">♡</button>${avatarMarkup(d, ini)}<div class="oinfo"><div class="otop"><h3><a class="oname" href="${prof}">${esc(nm)}</a></h3>${badge}</div><div class="orate">${ratingHtml(d)}</div><div class="meta">${esc(d.city || '')}${dist ? ' · ' + dist : ''}${wkChip}</div>${tags}${nominate}</div><div class="oacts"><a class="net net-pri" href="${prof}#verify">Verify PPO</a></div></article>`;
  }).join('') + '</div>';
}

// Plain crawlable <a> list for the "long tail" of a city's offices beyond the
// rich cards. Every entry points at its seo_path profile so no office is orphaned.
function restList(offices) {
  if (!offices.length) return '';
  const items = offices.map(d => {
    const nm = d.practice_name || d.name || 'Dental Office';
    const prof = esc(officeProfileHref(d));
    return `<li><a href="${prof}">${esc(nm)}${d.city ? `, ${esc(d.city)}` : ''}</a></li>`;
  }).join('');
  return `<ul class="alloffices">${items}</ul>`;
}

function relatedBlock() {
  return `<section class="block"><div class="sec-head"><span class="eyebrow">Keep exploring</span><h2>More on Delta Dental</h2></div>
  <div class="linkgrid">
    <a class="lc" href="${BASE}/premium/"><span class="k">Plan</span><h3>PPO Premium coverage</h3><p>What Delta pays, the waits, and the cost.</p></a>
    <a class="lc" href="${BASE}/compare/"><span class="k">Compare</span><h3>Is Delta Dental good?</h3><p>How Delta stacks up against other PPO plans.</p></a>
    <a class="lc" href="${BASE}/uc-students/"><span class="k">Students</span><h3>Delta for UC students</h3><p>Your UC SHIP dental, and dentists near every campus.</p></a>
    <a class="lc" href="${BASE}/"><span class="k">Hub</span><h3>Delta Dental hub</h3><p>Everything Delta Dental, in one place.</p></a>
  </div></section>`;
}

// Student FAQ set, written ONCE and rendered identically in visible HTML and FAQPage JSON-LD
// (Google requires parity). YMYL: the carrier itself varies by campus and plan year, so every
// answer is hedged ("most campuses", "most likely", "confirm your campus and plan year"). We never
// state a student's specific benefit as certain. No decorative arrows or dashes; never "chair".
function campusFaqs(c) {
  return [
    { q: `Do I have dental insurance as a ${c.name} student?`,
      a: `Almost certainly, yes. If you're on UC SHIP at ${c.full} and didn't waive it, dental is already part of your plan, usually through Delta Dental PPO. You don't buy it separately and it's not on your medical card. Waived SHIP? Then you're not covered, so do a quick check first.` },
    { q: `Is UC SHIP dental really Delta Dental?`,
      a: `On most UC campuses, yes. SHIP dental usually runs through Delta Dental PPO, but your campus sets the carrier and plan each year, so it's worth confirming yours. Some campuses or plan years differ, and if you waived SHIP you're not covered.` },
    { q: `How do I check if I'm covered?`,
      a: `You've got two easy options. Call a dental office near campus, tell them you're a ${c.name} student on UC SHIP, and give your full name and birthday. That's usually all an office needs to look you up. You can also create a free CoverCapy account and we'll verify your Delta Dental coverage and find you an in-network dentist. Either way, keep your UC SHIP or Delta Member ID handy in case it's needed.` },
    { q: `Do I need a referral?`,
      a: `No. Pick a Delta Dental PPO dentist, give the office your name and birthday (and your Member ID if they ask), and book directly. You don't need a referral to see a dentist on the PPO network.` },
    { q: `What will it cost me?`,
      a: `Less than you'd think. Cleanings and checkups are usually fully covered, so most students pay little or nothing for one. Bigger work is split with the plan after a small deductible, up to a yearly max of around $1,000. The exact percentages depend on your campus and plan year, so confirm yours with Delta Dental.` },
    { q: `Does my coverage pay for wisdom teeth?`,
      a: `Usually in part, not in full. Oral surgery like wisdom teeth removal is a shared-cost benefit and it counts toward your yearly max. Braces and Invisalign are often limited or left out of student plans, so check your specific benefit before you schedule anything big.` },
    { q: `I'm graduating or losing UC SHIP, what then?`,
      a: `You can keep Delta with your own plan so there's no gap in care. Take a look at the Delta Dental PPO individual plan, then find an in-network dentist in whatever city you're moving to.` }
  ];
}

function campusPage(c, offices, siblings, cityPageSlugs) {
  const wikiSlug = c.full.replace(/ /g, '_');
  const ab = UC_ABBR[c.slug] || c.name;
  const info = UC_INFO[c.slug];
  // Turn nearby-area names into links to their city dentist page when one exists (internal mesh).
  const linkArea = (a) => (cityPageSlugs && cityPageSlugs.has(slugify(a)))
    ? `<a href="${BASE}/dentists/${slugify(a)}/">${esc(a)}</a>` : esc(a);
  const areaListHtml = info ? (info.nearbyAreas.length > 1
    ? info.nearbyAreas.slice(0, -1).map(linkArea).join(', ') + ', and ' + linkArea(info.nearbyAreas[info.nearbyAreas.length - 1])
    : linkArea(info.nearbyAreas[0])) : '';
  const otherCampuses = (siblings && siblings.length ? siblings : UC_CAMPUSES.filter(x => x.slug !== c.slug)).slice(0, 6);
  const campusMesh = otherCampuses.length ? `<section class="block"><div class="sec-head"><span class="eyebrow">Other UC campuses</span><h2>Delta Dental dentists near another UC</h2></div>
  <div class="linkgrid">${otherCampuses.map(s => `<a class="lc" href="${BASE}/students/${s.slug}/"><span class="k">Campus</span><h3>${esc(s.name)}</h3><p>Delta Dental dentists near ${esc(s.name)} for UC SHIP students.</p></a>`).join('')}</div></section>` : '';
  const title = `Delta Dental Dentists Near ${c.name} | ${ab} Student Care`;
  const desc = `In-network Delta Dental PPO dentists near ${c.name}. How UC SHIP dental coverage works for ${ab} students, and how to confirm your benefits before you book.`;
  const canonical = `${SITE}${BASE}/students/${c.slug}/`;
  const faqs = campusFaqs(c);
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Dental Insurance', item: SITE + '/dental-insurance/' },
      { '@type': 'ListItem', position: 3, name: 'Delta Dental', item: SITE + BASE + '/' },
      { '@type': 'ListItem', position: 4, name: 'UC students', item: SITE + BASE + '/uc-students/' },
      { '@type': 'ListItem', position: 5, name: c.name } ] },
    Object.assign({ '@type': 'CollegeOrUniversity', '@id': canonical + '#campus', name: c.full, alternateName: c.name,
      address: { '@type': 'PostalAddress', addressLocality: c.city, addressRegion: 'CA', addressCountry: 'US' },
      sameAs: ['https://en.wikipedia.org/wiki/' + wikiSlug] }, info ? { foundingDate: String(info.founded) } : {}),
    { '@type': 'MedicalWebPage', '@id': canonical + '#webpage', url: canonical, name: title,
      about: { '@id': canonical + '#campus' }, mainEntity: { '@id': canonical + '#dentists' },
      lastReviewed: BUILD_DATE, reviewedBy: { '@type': 'Organization', name: 'CoverCapy Editorial' },
      medicalAudience: { '@type': 'MedicalAudience', audienceType: 'UC SHIP enrolled student' } },
    dentistItemList(offices, c.city, canonical + '#dentists'),
    carrierNode(),
    { '@type': 'FAQPage', '@id': canonical + '#faq', mainEntity: faqs.map(f => (
      { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } ] });
  const faqHtml = faqs.map((f, i) => `<details class="faq"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><div class="body">${esc(f.a)}</div></details>`).join('\n  ');
  return HEAD(title, desc, canonical, jsonld) + DCN_NAV + `<div class="wrap">
  <div class="crumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/dental-insurance/">Dental Insurance</a> / <a href="${BASE}/">Delta Dental</a> / <a href="${BASE}/uc-students/">UC students</a> / <span>${esc(c.name)}</span></div>
  <header class="hero"><span class="eyebrow">UC SHIP · Student dental</span>
  <h1 class="title">Delta Dental dentists near <em>${esc(c.name)}</em><span class="t-sub">For ${esc(ab)} students on UC SHIP</span></h1>
  <p class="lede">Looking for Delta Dental dentists near ${esc(c.name)}? If you're a ${esc(ab)} student on UC SHIP, you most likely already have dental insurance, usually through a <b>Delta Dental PPO</b> plan, with no plan to buy. Coverage can vary by campus and plan year, and waived students aren't covered, so confirm yours in seconds and know your share before you book. The in-network dentists near ${esc(c.city)} are below.</p>
  <div class="facts"><div><b>Insurance Included</b><span>unless you waived UC SHIP</span></div><div><b>Around $1,000</b><span>yearly max, varies by plan</span></div><div><b>Name and birthday</b><span>often all an office needs</span></div><div><b>Cleanings</b><span>usually fully covered</span></div></div>
  <div class="cta" style="margin-top:18px"><a class="btn btn-jade" href="#verify">Verify my coverage</a><a class="btn btn-ghost" href="#near">See in-network dentists</a></div>
  <p class="cta-sub">Know your share before you book, no surprise bill.</p></header>

  <section class="block"><div class="answer"><div class="q">Do I have dental insurance as a ${esc(c.name)} student?</div><div class="a"><b>Most likely, yes.</b> If you're on UC SHIP and didn't waive it, your dental coverage is already built in. On most UC campuses that's Delta Dental PPO. It's bundled with SHIP, so it's separate from your medical card and you never buy it on its own. The exception is students who waived SHIP, they're not covered. Because each campus sets its own plan year, it's smart to confirm yours before you book.</div></div></section>
${info ? `
  <section class="block"><div class="sec-head"><span class="eyebrow">About ${esc(c.name)}</span><h2>Finding a dentist near ${esc(c.name)}</h2></div>
  <p class="lede" style="max-width:760px">${esc(info.blurb)}</p>
  <p style="font-size:15px;color:var(--muted);max-width:760px;margin-top:14px">Students at ${esc(c.name)}, founded in ${info.founded} and home to ${esc(info.enrollment)}, commonly look for a dentist in ${areaListHtml}. Our directory maps Delta Dental PPO dentists across ${esc(c.city)} and these nearby areas, so you can find one close to where you live or take classes.</p>
  <p class="note">${esc(info.dentalNote)}</p></section>` : ''}

  <section class="block" id="verify"><div class="sec-head"><span class="eyebrow">Confirm in one call</span><h2>Check your coverage with just your name and birthday</h2><p>You don't need to dig up your card to get started. Many offices can look you up on the spot.</p></div>
  <ol class="verify-steps">
  <li><b>Call an office near campus, or tap Verify on any office below.</b> Tell them you're a ${esc(c.name)} student on UC SHIP, most likely Delta Dental PPO.</li>
  <li><b>Give your full name and birthday.</b> That's often all an office needs to look you up and confirm you're covered.</li>
  <li><b>Keep your UC SHIP or Delta Member ID handy as a backup,</b> just in case. You'll find it in your UC SHIP or Delta member account.</li>
  <li><b>Ask two quick things:</b> that you're covered this plan year, and that the office is in-network for your plan.</li>
  </ol>
  <div class="acct-cta"><div class="ac-text"><h3>Rather not call around? Create a free CoverCapy account and we'll verify your insurance for you.</h3><p>Tell us you're a ${esc(ab)} student on UC SHIP and we'll confirm your Delta Dental coverage and match you to an in-network dentist near ${esc(c.city)}.</p></div><a class="btn btn-jade btn-sm" href="${SITE}/join/">Create free account</a></div></section>

  <div class="citysplit">
  <div class="citylist"><section class="block" id="near" style="border-top:none;padding-top:6px"><div class="sec-head"><span class="eyebrow">Near campus</span><h2>In-network dentists near ${esc(c.name)}</h2><p>The closest offices in our directory, with Platinum Elite and Capy Accredited members first. Tap any one to see its profile and confirm your UC SHIP dental before you go.</p></div>
  <div class="officescroll" id="offscroll">${officeList(offices, true)}</div>
  <button type="button" class="btn btn-ghost loadmore" id="loadmore" hidden>Show more offices near ${esc(c.name)}</button>
  <a class="searchmore" href="${SITE}/find-my-dentist.html">Search every Delta dentist near ${esc(c.name)}</a></section></div>
  <aside class="citymapcol">${cityMap(offices, c.city, c.lat, c.lng, { la: c.lat, ln: c.lng, name: c.name })}</aside>
  </div>

  <section class="block"><div class="sec-head"><span class="eyebrow">Coverage at a glance</span><h2>What UC SHIP dental typically covers</h2></div>
  <table class="cov"><thead><tr><th>Service</th><th>In-network</th><th>You typically pay</th></tr></thead><tbody>
  <tr><td>Cleaning &amp; exam</td><td>Covered, often in full</td><td>Little to nothing</td></tr>
  <tr><td>X-rays</td><td>Covered</td><td>Little to nothing</td></tr>
  <tr><td>Fillings</td><td>Covered, shared cost</td><td>A coinsurance share</td></tr>
  <tr><td>Wisdom teeth &amp; oral surgery</td><td>Covered, shared cost</td><td>A share, up to the annual max</td></tr>
  <tr><td>Braces / Invisalign</td><td>Limited or excluded</td><td>Often most or all of the cost</td></tr>
  </tbody></table>
  <p class="note">This is the general shape of UC SHIP dental on most campuses. Your exact percentages, deductible, and yearly max (usually around $1,000) depend on your campus and plan year, so confirm those with Delta Dental.</p>
  <div class="ortho-pivot"><div class="op-text"><span class="eyebrow">Thinking about straightening your teeth?</span>
  <h3>An individual Delta Dental PPO plan can add adult ortho coverage</h3>
  <p>UC SHIP rarely covers braces or Invisalign for adults, so most students end up paying full price. An individual Delta Dental PPO plan includes <b>adult orthodontic coverage</b>, so you can spread the cost instead of paying all at once. Keep your student cleanings, add ortho alongside them, and carry the plan after you graduate. We'll walk you through it.</p></div>
  <div class="cta"><a class="btn btn-jade" href="${BASE}/">See the Delta Dental PPO plan</a><a class="btn btn-ghost" href="${BASE}/compare/">Compare plans</a></div></div></section>

  <section class="block"><div class="sec-head"><span class="eyebrow">Heading home</span><h2>Using your coverage when you're home for break</h2><p>Delta Dental PPO works wherever there's an in-network dentist, not just near campus. Find one in your hometown before you head back.</p></div>
  <div class="cta"><a class="btn btn-ghost" href="${SITE}/find-my-dentist.html">Find an in-network dentist anywhere</a></div></section>

  ${campusMesh}

  ${relatedBlock()}

  <section class="block"><div class="sec-head"><span class="eyebrow">UC SHIP dental FAQ</span><h2>${esc(c.name)} student dental questions</h2></div>
  ${faqHtml}</section>

  <p class="note" style="margin-top:18px">Last reviewed ${BUILD_TXT} by CoverCapy editorial. UC SHIP plan terms, including the dental carrier, are set by your campus and change each plan year, so verify yours before booking. This page is general information, not insurance or medical advice, and is not an offer of coverage. CoverCapy is independent and not affiliated with the University of California or Delta Dental Plans Association. Sources: your campus UC SHIP plan page and Delta Dental.</p>
  </div>
  <script>(function(){var sc=document.getElementById('offscroll');if(!sc)return;var cards=[].slice.call(sc.querySelectorAll('.office'));var lm=document.getElementById('loadmore');var shown=10;function ap(){cards.forEach(function(c,i){c.style.display=i<shown?'':'none';});if(lm)lm.hidden=cards.length<=shown;}if(lm)lm.addEventListener('click',function(){shown+=10;ap();lm.scrollIntoView({block:'nearest'});});ap();
  var KEY='cc_saved_${c.slug}';var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){}
  function paint(){cards.forEach(function(c){var b=c.querySelector('.osave');if(b)b.classList.toggle('on',!!saved[b.dataset.save]);});}
  document.addEventListener('click',function(e){var s=e.target.closest('.osave');if(s){e.preventDefault();e.stopPropagation();var id=s.dataset.save;if(saved[id])delete saved[id];else saved[id]=1;try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(e){}paint();return;}var n=e.target.closest('.onom');if(n){e.preventDefault();location.href='${SITE}/find-my-dentist.html?nominate='+encodeURIComponent(n.dataset.nm||'');}});paint();})();</script>` + FOOT;
}

// Delta Dental as a referenceable entity, linked from every spoke
const carrierNode = () => ({ '@type': 'Organization', '@id': SITE + BASE + '/#carrier', name: 'Delta Dental',
  sameAs: ['https://en.wikipedia.org/wiki/Delta_Dental', 'https://www.deltadental.com/'] });

// ItemList of real Dentist entities, never fabricate a rating
function dentistItemList(offices, city, id) {
  return { '@type': 'ItemList', '@id': id, itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: offices.length,
    itemListElement: offices.map((d, i) => {
      const item = { '@type': 'Dentist', name: d.practice_name || d.name || 'Dental Office',
        address: { '@type': 'PostalAddress', addressLocality: d.city || city, addressRegion: d.state || undefined, postalCode: String(d.zip || '') || undefined, addressCountry: 'US' },
        memberOf: { '@id': SITE + BASE + '/#carrier' } };
      if (d.seo_path) item.url = SITE + d.seo_path; else if (d.profile_url) item.url = d.profile_url;
      if (d.latitude != null && d.longitude != null) item.geo = { '@type': 'GeoCoordinates', latitude: +d.latitude, longitude: +d.longitude };
      // Rating sourced from Google (rating + review count). Emitted only when both exist.
      const r = Number(d.aggregate_rating || 0), n = Number(d.aggregate_review_count || 0);
      if (r > 0 && n > 0) item.aggregateRating = { '@type': 'AggregateRating', ratingValue: r, reviewCount: n, bestRating: 5, worstRating: 1 };
      if (Array.isArray(d.specialties) && d.specialties.length) item.medicalSpecialty = d.specialties.slice(0, 4);
      return { '@type': 'ListItem', position: i + 1, item };
    }) };
}

// Sibling "nearby cities" link cards
function nearbyBlock(siblings) {
  if (!siblings || !siblings.length) return '';
  return `<section class="block"><div class="sec-head"><span class="eyebrow">Nearby</span><h2>Delta dentists in nearby cities</h2></div>
  <div class="linkgrid">${siblings.map(s => `<a class="lc" href="${BASE}/dentists/${s.slug}/"><span class="k">City</span><h3>${esc(s.city)}</h3><p>${s.count} Delta-friendly office${s.count === 1 ? '' : 's'} in our directory.</p></a>`).join('')}</div></section>`;
}

// One FAQ set, reused IDENTICALLY in visible HTML and FAQPage JSON-LD (Google requires parity
// between markup and schema). Answers are 40–55 words, lead with a definitive sentence, the format
// AI Overviews lift verbatim, then add nuance. Variable benefits are hedged ("typically",
// "varies by plan") so we never state a member's specific coverage as fact (YMYL).
function cityFaqs(city, cnt, ratingLine) {
  return [
    { q: `How many Delta Dental PPO dentists are in ${city}?`,
      a: `Our directory lists ${cnt} Delta Dental PPO dentist${cnt === 1 ? '' : 's'} in ${city}.${ratingLine} Browse them by rating below, then tap any office and we’ll confirm they’re in-network for your specific Delta plan before you book, so you avoid a surprise out-of-network bill.` },
    { q: `How do I verify a ${city} dentist takes my Delta Dental plan?`,
      a: `Pick an office below and use Verify PPO. We check that the ${city} dentist is in-network for your exact Delta plan, since networks differ between Delta Dental PPO and DeltaCare USA. Confirming before you book is the only reliable way to lock in in-network rates.` },
    { q: `Does Delta Dental PPO have a waiting period?`,
      a: `Delta Dental PPO typically covers preventive care, cleanings and exams, from day one with no waiting period. Basic and major work like crowns can carry a waiting period of several months on some plans. Waiting periods vary by plan and employer, so confirm your plan’s exact terms.` },
    { q: `What’s the difference between Delta Dental PPO and DeltaCare USA in ${city}?`,
      a: `Delta Dental PPO lets you see any licensed dentist and pays the most in-network, with no referrals. DeltaCare USA is an HMO: you pick one primary ${city} dentist and need referrals for specialists. PPO offers more freedom; DeltaCare often costs less monthly. The two networks don’t overlap.` },
    { q: `Can I get Invisalign or braces with Delta Dental PPO in ${city}?`,
      a: `Many Delta Dental PPO plans include orthodontic coverage that can apply to Invisalign or braces, usually with a separate lifetime maximum. Coverage isn’t universal and some plans limit ortho to dependents. Confirm your plan’s orthodontic benefit first, then we’ll help you find a ${city} provider who offers it.` },
    { q: `Are Delta Dental PPO dentists in ${city} accepting new patients?`,
      a: `Most Delta Dental PPO offices in ${city} accept new patients, though availability shifts week to week. Each listing below shows ratings and tier, tap one to view the profile. When you verify your plan with us, we also confirm the office is open to new patients before you book.` }
  ];
}

// "People also search for in {City}", internal-linking related cluster modeled on Birdeye's
// city FAQ links. Anchors mirror real related-search queries; targets are existing hub spokes plus
// nearby-city pages (siblings), so the block self-populates and never dead-ends.
function peopleAlsoBlock(city, siblings) {
  const links = [
    { k: 'Plan', label: 'Delta Dental PPO coverage explained', href: `${BASE}/premium/` },
    { k: 'Compare', label: 'Delta Dental PPO vs DeltaCare USA', href: `${BASE}/compare/` },
    { k: 'Cost', label: 'Delta Dental PPO cost & waiting periods', href: `${BASE}/premium/#cost` },
    ...(siblings || []).slice(0, 3).map(s => ({ k: 'Nearby', label: `Delta dentists in ${s.city}`, href: `${BASE}/dentists/${s.slug}/` }))
  ];
  return `<section class="block"><div class="sec-head"><span class="eyebrow">Related searches</span><h2>People also search for in ${esc(city)}</h2></div>
  <div class="linkgrid">${links.map(l => `<a class="lc" href="${l.href}"><span class="k">${l.k}</span><h3>${esc(l.label)}</h3></a>`).join('')}</div></section>`;
}

const CITY_CARDS = 48;
// Lazy Leaflet map, CartoDB Positron basemap (clean/minimal, no terrain, no API key).
// Sits in a sticky right column; assets + init load only when scrolled near (keeps LCP fast).
function cityMap(offices, city, lat, lng, anchor) {
  const pts = offices.filter(d => d.latitude != null && d.longitude != null)
    .map((d, i) => ({ la: +d.latitude, ln: +d.longitude, n: (d.practice_name || d.name || 'Dental Office'),
      t: (function () { const s = String(d.accreditation_status || '').toLowerCase();
        return s.indexOf('platinum') > -1 ? 'p' : s.indexOf('accredit') > -1 ? 'a' : s.indexOf('verified') > -1 ? 'v' : 'd'; })(),
      r: Number(d.aggregate_rating || 0),
      id: slugify(d.practice_name || d.name || ('office-' + i)),
      u: officeProfileHref(d) }));
  if (!pts.length) return '';
  const c = (lat && lng) ? [lat, lng] : [pts[0].la, pts[0].ln];
  const data = JSON.stringify(pts).replace(/</g, '\\u003c');
  const anc = anchor && anchor.la != null ? JSON.stringify({ la: +anchor.la, ln: +anchor.ln, n: anchor.name || '' }).replace(/</g, '\\u003c') : 'null';
  const ancLegend = anchor && anchor.la != null ? `<span class="dot dot-u"></span>${esc(anchor.name || 'Campus')} ` : '';
  return `<div class="maplabel">${ancLegend}<span class="dot dot-p"></span>Platinum Elite <span class="dot dot-a"></span>Capy Accredited <span class="dot dot-d"></span>Listed</div>
  <div class="mapwrap"><div id="ccmap" class="ccmap" data-center="${c[0]},${c[1]}" role="img" aria-label="Map of Delta Dental PPO dentists in ${esc(city)}"></div></div>
  <script>window.__CCPINS=${data};window.__CCANCHOR=${anc};(function(){var L1='https://unpkg.com/leaflet@1.9.4/dist/leaflet.';function boot(){if(window.__ccmapdone)return;window.__ccmapdone=1;var css=document.createElement('link');css.rel='stylesheet';css.href=L1+'css';document.head.appendChild(css);var s=document.createElement('script');s.src=L1+'js';s.onload=draw;document.body.appendChild(s);}
  function pinHtml(p){var cls='cc-pin cc-pin-'+p.t;var lbl=p.r?('★ '+p.r.toFixed(1)):'●';return '<span class="'+cls+'">'+lbl+'</span>';}
  function draw(){var el=document.getElementById('ccmap');if(!el||!window.L)return;var ctr=(el.dataset.center||'').split(',').map(Number);var a=window.__CCANCHOR;var m=L.map('ccmap',{scrollWheelZoom:true,zoomControl:true}).setView(a?[a.la,a.ln]:ctr,a?14:12);L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd',attribution:'© OpenStreetMap © CARTO'}).addTo(m);var MK={},g=[];
  (window.__CCPINS||[]).forEach(function(p){var mk=L.marker([p.la,p.ln],{icon:L.divIcon({className:'cc-pinwrap',html:pinHtml(p),iconSize:[46,26],iconAnchor:[23,26],popupAnchor:[0,-24]}),riseOnHover:true});mk.bindPopup('<b>'+p.n+'</b>'+(p.r?'<br>★ '+p.r.toFixed(1):'')+(p.u?'<br><a href="'+p.u+'">View profile</a>':''));mk.on('click',function(){flash(p.id);});mk.on('mouseover',function(){hi(p.id,1);});mk.on('mouseout',function(){hi(p.id,0);});mk.addTo(m);MK[p.id]=mk;g.push([p.la,p.ln]);});
  function hi(id,on){var c=document.querySelector('.office[data-id="'+id+'"]');if(c)c.classList.toggle('is-hi',!!on);var mk=MK[id];if(mk&&mk._icon){var b=mk._icon.querySelector('.cc-pin');if(b)b.classList.toggle('cc-pin-on',!!on);}}
  function flash(id){var c=document.querySelector('.office[data-id="'+id+'"]');if(!c)return;if(c.style.display==='none'){var lm=document.getElementById('loadmore');if(lm){lm.click();}}c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('is-active');clearTimeout(c.__t);c.__t=setTimeout(function(){c.classList.remove('is-active');},1500);}
  var cards=[].slice.call(document.querySelectorAll('.office[data-id]'));var tmr;cards.forEach(function(c){var id=c.dataset.id;c.addEventListener('mouseenter',function(){hi(id,1);clearTimeout(tmr);tmr=setTimeout(function(){var mk=MK[id];if(mk&&!m.getBounds().contains(mk.getLatLng()))m.panTo(mk.getLatLng(),{animate:true,duration:.4});},120);});c.addEventListener('mouseleave',function(){hi(id,0);});});
  var Reset=L.Control.extend({options:{position:'topright'},onAdd:function(){var b=L.DomUtil.create('button','cc-mapbtn');b.type='button';b.title='Reset view';b.innerHTML='⤢';L.DomEvent.on(b,'click',function(e){L.DomEvent.stop(e);if(g.length>1){m.fitBounds(g,{padding:[34,34],maxZoom:15});}else{m.setView(ctr,13);}});return b;}});m.addControl(new Reset());
  var Geo=L.Control.extend({options:{position:'topright'},onAdd:function(){var b=L.DomUtil.create('button','cc-mapbtn');b.type='button';b.title='Use my location';b.innerHTML='◎';L.DomEvent.on(b,'click',function(e){L.DomEvent.stop(e);if(!navigator.geolocation)return;navigator.geolocation.getCurrentPosition(function(pos){var u=[pos.coords.latitude,pos.coords.longitude];L.circleMarker(u,{radius:7,color:'#fff',weight:2,fillColor:'#2D7FF9',fillOpacity:1}).addTo(m).bindPopup('You are here');m.flyTo(u,13);});});return b;}});m.addControl(new Geo());
  if(a){var tear='<div class="uc-tear"><svg width="36" height="48" viewBox="0 0 36 48"><circle class="ring" cx="18" cy="17" r="9" fill="#0FB5A6"/><path d="M18 2C10.3 2 4 8.3 4 16c0 9.6 14 30 14 30s14-20.4 14-30C32 8.3 25.7 2 18 2z" fill="#0C8C81" stroke="#fff" stroke-width="2.2"/><circle cx="18" cy="16" r="5" fill="#fff"/></svg></div>';var um=L.marker([a.la,a.ln],{zIndexOffset:1000,icon:L.divIcon({className:'uc-iconwrap',html:tear,iconSize:[36,48],iconAnchor:[18,46],popupAnchor:[0,-42]})});um.bindPopup('<b>'+a.n+'</b>').addTo(m);m.setView([a.la,a.ln],14);setTimeout(function(){m.invalidateSize();m.setView([a.la,a.ln],14);},220);}else if(g.length>1){try{m.fitBounds(g,{padding:[30,30],maxZoom:15});}catch(e){}}}
  var mEl=document.getElementById('ccmap');if('IntersectionObserver'in window&&mEl){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){boot();io.disconnect();}});},{rootMargin:'500px'});io.observe(mEl);}else{boot();}})();</script>`;
}
function cityPage(city, offices, meta) {
  meta = meta || {};
  // `offices` is the FULL tier-ranked set for the city. Top N render as rich
  // cards; the remainder render as a plain crawlable <a> list so every profile
  // (seo_path) is linked from exactly one indexable hub, no orphans.
  const cards = offices.slice(0, CITY_CARDS);
  const rest = offices.slice(CITY_CARDS);
  const cnt = meta.count || offices.length;
  const avg = meta.avgRating ? meta.avgRating.toFixed(1) : null;
  const wknd = meta.weekendCount || 0;
  const specs = (meta.topSpecialties || []).slice(0, 3);
  const area = meta.area || null, areaSlug = meta.areaSlug || null;
  const empty = offices.length === 0;
  const specLine = specs.length ? ` Common focus areas locally include ${specs.join(', ')}.` : '';
  const ratingLine = avg ? ` These offices average ${avg}★ across our directory.` : '';
  const wkndLine = wknd ? ` ${wknd} list weekend hours.` : '';
  const faqs = cityFaqs(city, cnt, ratingLine);
  const title = `Delta Dental Dentists in ${city} (${cnt}) · Find & Verify · CoverCapy`;
  const desc = `${cnt} Delta Dental PPO dentist${cnt === 1 ? '' : 's'} in ${city}.${ratingLine} Compare local offices by rating, see who takes Delta, and verify your plan before you book.`;
  const canonical = `${SITE}${BASE}/dentists/${slugify(city)}/`;
  const graph = [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Dental Insurance', item: SITE + '/dental-insurance/' },
      { '@type': 'ListItem', position: 3, name: 'Delta Dental', item: SITE + BASE + '/' },
      { '@type': 'ListItem', position: 4, name: 'Find a dentist', item: SITE + BASE + '/find-a-dentist/' },
      ...(area ? [{ '@type': 'ListItem', position: 5, name: area, item: SITE + BASE + '/areas/' + areaSlug + '/' }] : []),
      { '@type': 'ListItem', position: area ? 6 : 5, name: city } ] },
    carrierNode(),
    { '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, about: { '@id': SITE + BASE + '/#carrier' }, isPartOf: { '@id': SITE + '/#website' }, dateModified: BUILD_DATE, datePublished: BUILD_DATE },
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } ];
  if (!empty) graph.push(dentistItemList(cards, city, canonical + '#offices'));
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  const robots = empty ? 'noindex, follow' : null;
  return HEAD(title, desc, canonical, jsonld, robots) + DCN_NAV + `<div class="wrap">
  <div class="crumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/dental-insurance/">Dental Insurance</a> / <a href="${BASE}/">Delta Dental</a> / <a href="${BASE}/find-a-dentist/">Find a dentist</a>${area ? ` / <a href="${BASE}/areas/${areaSlug}/">${esc(area)}</a>` : ''} / <span>${esc(city)}</span></div>
  <header class="hero"><span class="eyebrow">Delta Dental PPO · ${esc(city)}</span>
  <h1 class="title">Delta Dental dentists in ${esc(city)}</h1>
  <p class="lede">${cnt} Delta Dental PPO office${cnt === 1 ? '' : 's'} in ${esc(city)}${avg ? `, rated ${avg}★ on average` : ''}. We confirm your plan is accepted before you book, at no cost. <span class="nodelta">No Delta yet? <a href="${BASE}/premium/">See the plan</a></span></p>
  <div class="facts"><div><b>${cnt}</b><span>offices in ${esc(city)}</span></div>${avg ? `<div><b>${avg}★</b><span>average rating</span></div>` : ''}${wknd ? `<div><b>${wknd}</b><span>open weekends</span></div>` : ''}<div><b>Free</b><span>plan verification</span></div></div></header>
  <div class="citysplit">
  <div class="citylist"><section class="block" style="border-top:none;padding-top:6px"><div class="sec-head"><span class="eyebrow">Local offices</span><h2>Dentists in ${esc(city)}</h2><p id="cccompass">${cnt} Delta Dental PPO office${cnt === 1 ? '' : 's'} in ${esc(city)}. Save the ones you like, then verify your plan.</p></div>
  <div class="officescroll" id="offscroll">${officeList(cards, false)}</div>
  <button type="button" class="btn btn-ghost loadmore" id="loadmore" hidden>Show more offices</button>
  <p class="nomline">Know a great office that should be here? <button type="button" class="onom" data-nom="" data-nm="">Nominate it</button> and earn Capy Diamonds when they join.</p>
  ${rest.length ? `<div class="sec-head" style="margin:30px 0 0"><h2 style="font-size:22px">Every Delta Dental PPO office in ${esc(city)}</h2></div>${restList(rest)}` : ''}
  <p class="note">We confirm in-network status with the office before you book. Last updated ${BUILD_TXT}.</p></section></div>
  <aside class="citymapcol">${cityMap(offices, city, meta.lat, meta.lng)}</aside>
  </div>
  <script>(function(){var sc=document.getElementById('offscroll');if(!sc)return;var cards=[].slice.call(sc.querySelectorAll('.office'));var lm=document.getElementById('loadmore');var shown=10;function ap(){cards.forEach(function(c,i){c.style.display=i<shown?'':'none';});if(lm)lm.hidden=cards.length<=shown;}if(lm)lm.addEventListener('click',function(){shown+=10;ap();});ap();})();</script>
  <section class="block"><div class="planpromo"><div><h3>New to Delta Dental?</h3><p>No Delta plan yet? You can still see any dentist here, but you save the most in-network. Explore our featured Delta Dental PPO™ Individual Premium plan and get covered before you book.</p></div><a class="btn" href="${BASE}/premium/">See the Delta PPO plan</a></div></section>
  <section class="block"><div class="answer"><div class="q">${esc(faqs[0].q)}</div><div class="a"><b>Our directory lists ${cnt} Delta Dental PPO office${cnt === 1 ? '' : 's'} in ${esc(city)}.</b> ${esc(faqs[0].a.replace(/^[^.]+\.\s*/, ''))}</div></div></section>
  ${peopleAlsoBlock(city, meta.siblings)}
  <section class="block"><div class="sec-head"><span class="eyebrow">Delta Dental PPO FAQ</span><h2>Common questions about Delta in ${esc(city)}</h2></div>
  ${faqs.map((f, i) => `<details class="faq"${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><div class="body">${esc(f.a)}</div></details>`).join('\n  ')}</section>
  ${nearbyBlock(meta.siblings)}
  ${relatedBlock()}
  </div>
  <div class="cctray" id="cctray" hidden><div class="wrap cctray-in"><span class="cctray-n"><b id="ccsavecount">0</b> saved</span><div class="cctray-acts"><button type="button" class="btn btn-jade" id="cccompare">Compare</button><a class="btn btn-ghost" id="ccemail" href="#">Email me these</a><button type="button" class="lnk" id="ccclear">Clear</button></div></div></div>
  <div class="ccmodal" id="ccmodal" hidden><div class="ccmodal-card"><button type="button" class="ccmodal-x" id="ccmodalx" aria-label="Close">×</button><div id="ccmodal-body"></div></div></div>
  <script>(function(){
    var KEY='ccsaved_'+location.pathname;var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){}
    var tray=document.getElementById('cctray'),cnt=document.getElementById('ccsavecount'),modal=document.getElementById('ccmodal'),mbody=document.getElementById('ccmodal-body');
    function ids(){return Object.keys(saved);}
    function sync(){var n=ids().length;if(cnt)cnt.textContent=n;if(tray)tray.hidden=n===0;document.body.style.paddingBottom=n?'72px':'';document.querySelectorAll('.osave').forEach(function(b){var on=!!saved[b.dataset.save];b.classList.toggle('on',on);b.textContent=on?'♥':'♡';b.setAttribute('aria-pressed',on);});}
    document.addEventListener('click',function(e){
      var s=e.target.closest('.osave');if(s){e.preventDefault();e.stopPropagation();var c=s.closest('.office');var id=s.dataset.save;if(saved[id]){delete saved[id];}else{saved[id]={nm:c.dataset.nm,prof:c.dataset.prof,r:c.dataset.rating};}localStorage.setItem(KEY,JSON.stringify(saved));sync();return;}
      var nm=e.target.closest('.onom');if(nm){e.preventDefault();openNom(nm.dataset.nm||'');return;}
    });
    function openModal(html){mbody.innerHTML=html;modal.hidden=false;}
    function closeModal(){modal.hidden=true;}
    document.getElementById('ccmodalx').addEventListener('click',closeModal);modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
    var compareBtn=document.getElementById('cccompare');if(compareBtn)compareBtn.addEventListener('click',function(){var rows=ids().map(function(id){var o=saved[id];return '<tr><td><a href="'+o.prof+'">'+o.nm+'</a></td><td>'+(o.r&&o.r!=='0'?'★ '+o.r:'n/a')+'</td><td><a class="net net-pri" href="'+o.prof+'#verify">Verify</a></td></tr>';}).join('');openModal('<h3 class="ccm-h">Your shortlist</h3><table class="ccm-t"><thead><tr><th>Office</th><th>Rating</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>');});
    var emailBtn=document.getElementById('ccemail');if(emailBtn)emailBtn.addEventListener('click',function(e){var body=ids().map(function(id){var o=saved[id];return o.nm+' '+location.origin+o.prof;}).join('%0D%0A');emailBtn.href='mailto:?subject=My%20Delta%20Dental%20shortlist%20in%20${encodeURIComponent(city)}&body='+body;});
    var clr=document.getElementById('ccclear');if(clr)clr.addEventListener('click',function(){saved={};localStorage.removeItem(KEY);sync();});
    function openNom(name){openModal('<h3 class="ccm-h">Nominate '+(name||'a dentist office')+'</h3><p class="ccm-p">We will invite this office to join CoverCapy as a Delta-friendly listing. Nominate through the finder to track it and earn Capy Diamonds when they join.</p><a class="btn btn-jade" href="/find-my-dentist">Nominate in the finder</a>');}
    sync();
  })();</script>` + FOOT;
}

function areaPage(area, slug, childCities) {
  const totalOffices = childCities.reduce((s, c) => s + c.count, 0);
  const title = `Delta Dental Dentists in ${area} · ${childCities.length} Cities · CoverCapy`;
  const desc = `Delta Dental PPO dentists across ${area}: ${totalOffices} offices in ${childCities.length} cities. Browse by city, compare ratings, and verify your Delta plan before booking.`;
  const canonical = `${SITE}${BASE}/areas/${slug}/`;
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Dental Insurance', item: SITE + '/dental-insurance/' },
      { '@type': 'ListItem', position: 3, name: 'Delta Dental', item: SITE + BASE + '/' },
      { '@type': 'ListItem', position: 4, name: area } ] },
    carrierNode(),
    { '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, about: { '@id': SITE + BASE + '/#carrier' }, isPartOf: { '@id': SITE + '/#website' } },
    { '@type': 'ItemList', numberOfItems: childCities.length, itemListElement: childCities.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.city, url: SITE + BASE + '/dentists/' + c.slug + '/' })) } ] });
  return HEAD(title, desc, canonical, jsonld) + DCN_NAV + `<div class="wrap">
  <div class="crumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/dental-insurance/">Dental Insurance</a> / <a href="${BASE}/">Delta Dental</a> / <span>${esc(area)}</span></div>
  <header class="hero"><span class="eyebrow">Delta Dental PPO · ${esc(area)}</span>
  <h1 class="title">Delta Dental dentists across <em>${esc(area)}</em></h1>
  <p class="lede"><b>${totalOffices} Delta-friendly offices</b> across <b>${childCities.length} cities</b> in ${esc(area)}. Pick your city to compare local offices, then have us confirm your Delta plan before you book.</p>
  <div class="cta" style="margin-top:18px"><a class="btn btn-jade" href="${BASE}/#dentists">Search by ZIP</a><a class="btn btn-ghost" href="${BASE}/premium/">See the Delta plan</a></div></header>
  <section class="block"><div class="sec-head"><span class="eyebrow">By city</span><h2>Cities in ${esc(area)}</h2><p>Choose a city to see Delta Dental PPO offices there.</p></div>
  <div class="linkgrid">${childCities.map(c => `<a class="lc" href="${BASE}/dentists/${c.slug}/"><span class="k">City</span><h3>${esc(c.city)}</h3><p>${c.count} Delta-friendly office${c.count === 1 ? '' : 's'}.</p></a>`).join('')}</div></section>
  ${relatedBlock()}
  </div>` + FOOT;
}

// Original-data study page: Delta Dental dentist access near every UC campus. Built from real
// directory data at build time. Designed as a citeable, link-worthy asset (data journalism angle)
// to earn authority for a new YMYL domain. `stats` is an array of per-campus measurements.
function ucStudyPage(stats) {
  const canonical = `${SITE}${BASE}/uc-dental-access/`;
  const title = `Delta Dental Dentist Access Near Every UC Campus | CoverCapy Study`;
  const desc = `We mapped in-network Delta Dental PPO dentists near all 10 University of California campuses. See offices within 2 and 5 miles, nearest office, and average rating by campus.`;
  const ranked = stats.slice().sort((a, b) => b.w2 - a.w2);
  const most = ranked[0], fewest = ranked[ranked.length - 1];
  const totalOffices = stats.reduce((s, x) => s + x.w5, 0);
  const rows = ranked.map(s => `<tr><td><a href="${BASE}/students/${s.slug}/">${esc(s.name)}</a></td><td>${esc(s.city)}</td><td>${s.w2}</td><td>${s.w5}</td><td>${s.nearest != null ? s.nearest.toFixed(1) + ' mi' : 'n/a'}</td><td>${s.avg ? '★ ' + s.avg.toFixed(2) : 'n/a'}</td></tr>`).join('');
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Dental Insurance', item: SITE + '/dental-insurance/' },
      { '@type': 'ListItem', position: 3, name: 'Delta Dental', item: SITE + BASE + '/' },
      { '@type': 'ListItem', position: 4, name: 'UC students', item: SITE + BASE + '/uc-students/' },
      { '@type': 'ListItem', position: 5, name: 'Campus access' } ] },
    { '@type': 'Dataset', name: 'Delta Dental PPO dentist access near University of California campuses',
      description: desc, creator: { '@type': 'Organization', name: 'CoverCapy' }, dateModified: BUILD_DATE,
      measurementTechnique: 'Haversine distance from each campus to geocoded in-network dental offices',
      variableMeasured: ['Offices within 2 miles', 'Offices within 5 miles', 'Nearest office distance', 'Average office rating'] },
    { '@type': 'Article', headline: title, datePublished: BUILD_DATE, dateModified: BUILD_DATE,
      author: { '@type': 'Organization', name: 'CoverCapy Editorial' },
      publisher: { '@type': 'Organization', name: 'CoverCapy' }, mainEntityOfPage: canonical } ] });
  return HEAD(title, desc, canonical, jsonld) + DCN_NAV + `<div class="wrap">
  <div class="crumb"><a href="${SITE}/">Home</a> / <a href="${SITE}/dental-insurance/">Dental Insurance</a> / <a href="${BASE}/">Delta Dental</a> / <a href="${BASE}/uc-students/">UC students</a> / <span>Campus access</span></div>
  <header class="hero"><span class="eyebrow">CoverCapy data study</span>
  <h1 class="title">Delta Dental dentist access near <em>every UC campus</em></h1>
  <p class="lede">Most University of California students on UC SHIP have dental coverage through Delta Dental PPO, but how easy is it to actually find an in-network dentist near campus? We mapped geocoded in-network offices around all 10 UC campuses and measured how many sit within walking and short-drive distance.</p>
  <div class="facts"><div><b>10</b><span>UC campuses mapped</span></div><div><b>${totalOffices.toLocaleString()}</b><span>offices within 5 miles</span></div><div><b>${esc(most.name)}</b><span>most offices within 2 miles</span></div><div><b>${esc(fewest.name)}</b><span>fewest within 2 miles</span></div></div></header>

  <section class="block"><div class="sec-head"><span class="eyebrow">The data</span><h2>In-network Delta dentists by UC campus</h2><p>Ranked by the number of in-network offices within 2 miles of campus. Tap a campus for the full list and map.</p></div>
  <table class="cov"><thead><tr><th>Campus</th><th>City</th><th>Within 2 mi</th><th>Within 5 mi</th><th>Nearest</th><th>Avg rating</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="note">Source: CoverCapy directory of geocoded in-network Delta Dental PPO offices, ${BUILD_TXT}. Distances are straight-line (haversine) from each campus center. Counts reflect offices in our directory and are not a complete census of every dentist. In-network status for your specific UC SHIP plan is confirmed before booking.</p></section>

  <section class="block"><div class="sec-head"><span class="eyebrow">What we found</span><h2>Key findings</h2></div>
  <p style="font-size:15.5px;max-width:760px">${esc(most.name)} students have the densest access, with ${most.w2} in-network offices within 2 miles of campus, while ${esc(fewest.name)} students have the fewest at ${fewest.w2}. Across all 10 campuses, our directory maps ${totalOffices.toLocaleString()} in-network Delta Dental PPO offices within 5 miles. Wherever you are, the nearest office and a campus map are one tap away on each campus page below.</p></section>

  <section class="block"><div class="sec-head"><span class="eyebrow">By campus</span><h2>See the dentists near your UC</h2></div>
  <div class="linkgrid">${ranked.map(s => `<a class="lc" href="${BASE}/students/${s.slug}/"><span class="k">Campus</span><h3>${esc(s.name)}</h3><p>${s.w5} Delta Dental offices within 5 miles.</p></a>`).join('')}</div></section>

  <p class="note" style="margin-top:18px">Last reviewed ${BUILD_TXT} by CoverCapy editorial. CoverCapy is independent and not affiliated with the University of California or Delta Dental Plans Association. Coverage and carrier vary by campus and plan year, so confirm yours before booking.</p>
  </div>` + FOOT;
}

function writePage(rel, html) {
  const full = path.join(process.cwd(), rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

async function fetchCampuses() {
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/map_anchors?select=name,slug,city,latitude,longitude&subcategory=eq.uc&order=importance_score.desc',
      { headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY } });
    if (!r.ok) return [];
    return (await r.json()).filter(x => x.slug && x.latitude != null).map(x => {
      const m = String(x.name).match(/\(([^)]+)\)\s*$/);
      return { name: m ? m[1] : x.name, full: String(x.name).replace(/\s*\([^)]*\)\s*$/, ''), slug: x.slug, city: x.city || (m ? m[1] : x.name), lat: +x.latitude, lng: +x.longitude };
    });
  } catch (e) { return []; }
}

// ---- IndexNow: notify Bing (and thus ChatGPT and Copilot, which lean on Bing's index) ----
// The public key file lives at /<key>.txt at the site root. IndexNow keys are public by design.
const INDEXNOW_KEY = '253f8df6855ac49519ccd58490f9983c';
const INDEXNOW_HOST = 'www.covercapy.com';
const DELTA_CORE_URLS = [
  '/dental-insurance/delta-dental/',
  '/dental-insurance/delta-dental/deltacare-hmo-vs-ppo/',
  '/dental-insurance/delta-dental/networks/',
  '/dental-insurance/delta-dental/individual-plans/',
  '/dental-insurance/delta-dental/premium/',
  '/dental-insurance/delta-dental/compare/',
  '/dental-insurance/delta-dental/is-delta-good/',
  '/dental-insurance/delta-dental/over-65/',
  '/dental-insurance/delta-dental/eligibility/',
  '/dental-insurance/delta-dental/find-a-dentist/',
  '/dental-insurance/delta-dental/uc-students/',
  '/dental-insurance/delta-dental/for-employers/',
  '/dental-insurance/delta-dental/for-dentists/',
  '/dental-insurance/delta-dental/does-delta-dental-cover-implants/',
  '/dental-insurance/delta-dental/delta-dental-waiting-periods/',
  '/dental-insurance/delta-dental/delta-dental-annual-maximum/',
  '/dental-insurance/delta-dental/how-to-check-delta-dental-coverage/',
  '/dental-insurance/delta-dental/enrollment-timing/',
  '/dental-insurance/delta-dental/federal-employees/',
  '/dental-insurance/delta-dental/small-business/'
];
async function pingIndexNow() {
  if (typeof fetch !== 'function') { console.warn('[indexnow] no global fetch, skipping'); return; }
  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: DELTA_CORE_URLS.map((u) => `https://${INDEXNOW_HOST}${u}`)
  };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
      signal: ctrl.signal
    });
    console.log('[indexnow] submitted', body.urlList.length, 'Delta URLs, status', res.status);
  } finally { clearTimeout(t); }
}

async function genSpokes() {
  const sel = 'select=practice_name,name,slug,doctor_name,city,state,market_area,seo_area,local_area,zip,latitude,longitude,aggregate_rating,aggregate_review_count,specialties,procedures,languages,insurance_networks,phone,booking_url,website,image_url,pending_display_label,profile_url,seo_path,open_weekends,weekend_hours_note,accreditation_status';
  // Supabase REST caps each response at 1000 rows, paginate with Range until a short page.
  const PER = 1000; let offset = 0, all = [];
  for (;;) {
    const res = await fetch(SUPABASE_URL + '/rest/v1/dentists?' + sel + '&latitude=not.is.null&order=id.asc&limit=' + PER + '&offset=' + offset,
      { headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY } });
    if (!res.ok) throw new Error('dentists REST ' + res.status);
    const page = (await res.json()).filter(d => d.latitude != null && d.longitude != null);
    all = all.concat(page);
    if (page.length < PER) break;
    offset += PER;
  }
  console.log('[gen-spokes] loaded', all.length, 'geocoded dentists');

  const urls = [];
  // Set of city slugs that will get a /dentists/{slug}/ page (>=4 geocoded offices), so campus
  // pages can deep-link their "nearby areas" to a real city dentist page where one exists.
  const cityCounts = {};
  all.forEach(d => { const k = (d.city || '').trim(); if (k) cityCounts[k] = (cityCounts[k] || 0) + 1; });
  const cityPageSlugs = new Set(Object.keys(cityCounts).filter(k => cityCounts[k] >= 4).map(k => slugify(k)));
  // UC campus student pages (slugs sourced from Supabase map_anchors)
  let campuses = await fetchCampuses();
  if (!campuses.length) campuses = UC_CAMPUSES;
  const ucStats = [];
  for (const c of campuses) {
    const withDist = all.map(d => ({ ...d, dist: haversine(c.lat, c.lng, +d.latitude, +d.longitude) })).sort((a, b) => a.dist - b.dist);
    const near = withDist.filter(d => d.dist <= 9).slice(0, 18);
    const sibs = campuses.filter(x => x.slug !== c.slug)
      .map(x => ({ ...x, d: haversine(c.lat, c.lng, x.lat, x.lng) }))
      .sort((a, b) => a.d - b.d);
    writePage(`${OUT_ROOT}/students/${c.slug}/index.html`, campusPage(c, near, sibs, cityPageSlugs));
    urls.push(`${BASE}/students/${c.slug}/`);
    const w5set = withDist.filter(d => d.dist <= 5);
    const rated = w5set.filter(d => Number(d.aggregate_rating || 0) > 0);
    ucStats.push({ name: c.name, slug: c.slug, city: c.city,
      w2: withDist.filter(d => d.dist <= 2).length, w5: w5set.length,
      nearest: withDist.length ? withDist[0].dist : null,
      avg: rated.length ? rated.reduce((s, d) => s + Number(d.aggregate_rating), 0) / rated.length : 0 });
  }
  // UC dental access data study (link-worthy original-data asset)
  if (ucStats.length) {
    writePage(`${OUT_ROOT}/uc-dental-access/index.html`, ucStudyPage(ucStats));
    urls.push(`${BASE}/uc-dental-access/`);
  }
  // City pages: every city with >=4 geocoded offices (no cap)
  const byCity = {};
  all.forEach(d => { const k = (d.city || '').trim(); if (k) (byCity[k] = byCity[k] || []).push(d); });
  const mostCommon = (arr) => { const m = {}; arr.forEach(v => { if (v) m[v] = (m[v] || 0) + 1; }); return Object.keys(m).sort((a, b) => m[b] - m[a])[0] || null; };
  // Tier-first ranking (matches the live finder): Platinum Elite > Capy Accredited > Verified > default,
  // then rating, then review volume.
  const tierRank = (d) => { const s = String(d.accreditation_status || '').toLowerCase();
    return s.indexOf('platinum') > -1 ? 4 : s.indexOf('accredit') > -1 ? 3 : s.indexOf('verified') > -1 ? 2 : 1; };
  const score = (d) => tierRank(d) * 1000000 + Number(d.aggregate_rating || 0) * 100 + Math.log((d.aggregate_review_count || 0) + 1);

  // Build per-city metadata (count, centroid, avg rating, weekend count, specialties, area)
  const cityMeta = {};
  Object.keys(byCity).forEach(k => {
    const rows = byCity[k];
    if (rows.length < 4) return;
    const lat = rows.reduce((s, d) => s + (+d.latitude), 0) / rows.length;
    const lng = rows.reduce((s, d) => s + (+d.longitude), 0) / rows.length;
    const rated = rows.filter(d => Number(d.aggregate_rating || 0) > 0);
    const avgRating = rated.length ? rated.reduce((s, d) => s + Number(d.aggregate_rating), 0) / rated.length : 0;
    const weekendCount = rows.filter(d => d.open_weekends === true || d.open_weekends === 'true').length;
    const specCounts = {};
    rows.forEach(d => (Array.isArray(d.specialties) ? d.specialties : []).forEach(s => { if (s) specCounts[s] = (specCounts[s] || 0) + 1; }));
    const topSpecialties = Object.keys(specCounts).sort((a, b) => specCounts[b] - specCounts[a]).slice(0, 3);
    const area = mostCommon(rows.map(d => (d.local_area || '').trim()).filter(Boolean));
    cityMeta[k] = { city: k, slug: slugify(k), count: rows.length, lat, lng, avgRating, weekendCount, topSpecialties, area, areaSlug: area ? slugify(area) : null };
  });
  const cityKeys = Object.keys(cityMeta);

  // Nearest-city siblings via centroid haversine
  cityKeys.forEach(k => {
    const c = cityMeta[k];
    cityMeta[k].siblings = cityKeys.filter(o => o !== k)
      .map(o => ({ ...cityMeta[o], dist: haversine(c.lat, c.lng, cityMeta[o].lat, cityMeta[o].lng) }))
      .sort((a, b) => a.dist - b.dist).slice(0, 5)
      .map(o => ({ city: o.city, slug: o.slug, count: o.count }));
  });

  // Emit city pages
  for (const k of cityKeys) {
    const c = cityMeta[k];
    // Full tier-ranked set, cityPage renders top N as cards and the rest as a
    // crawlable link list, so every office profile is reachable from this hub.
    const ranked = byCity[k].slice().sort((a, b) => score(b) - score(a));
    writePage(`${OUT_ROOT}/dentists/${c.slug}/index.html`, cityPage(c.city, ranked, c));
    urls.push(`${BASE}/dentists/${c.slug}/`);
    // Sitemap: also emit every office profile URL (canonical T5, built from parts) for this city.
    ranked.forEach(d => { const u = t5Url(d); if (u) urls.push(u); });
  }

  // Area pages: group cities by local_area, >=2 child cities
  const byArea = {};
  cityKeys.forEach(k => { const c = cityMeta[k]; if (c.area) (byArea[c.area] = byArea[c.area] || []).push(c); });
  let areaCount = 0;
  Object.keys(byArea).forEach(area => {
    const kids = byArea[area].sort((a, b) => b.count - a.count);
    if (kids.length < 2) return;
    const slug = slugify(area);
    writePage(`${OUT_ROOT}/areas/${slug}/index.html`, areaPage(area, slug, kids));
    urls.push(`${BASE}/areas/${slug}/`);
    areaCount++;
  });
  console.log('[gen-spokes] wrote', cityKeys.length, 'city pages,', areaCount, 'area pages,', urls.length, 'total spoke pages');

  // Sitemap: merge generated URLs into sitemap.xml (before </urlset>)
  try {
    const today = new Date().toISOString().slice(0, 10);
    const uniqUrls = [...new Set(urls)];
    const entries = uniqUrls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`).join('\n');
    let sm;
    if (fs.existsSync('sitemap.xml')) {
      sm = fs.readFileSync('sitemap.xml', 'utf8');
      const M = '<!-- CC_SPOKES -->';
      if (sm.includes(M)) {
        sm = sm.replace(new RegExp(M + '[\\s\\S]*?' + M), M + '\n' + entries + '\n  ' + M);
      } else if (sm.includes('</urlset>')) {
        sm = sm.replace('</urlset>', M + '\n' + entries + '\n  ' + M + '\n</urlset>');
      }
    } else {
      sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
    }
    fs.writeFileSync('sitemap.xml', sm);
    console.log('[gen-spokes] sitemap updated with', urls.length, 'urls');
  } catch (e) { console.warn('[gen-spokes] sitemap skip:', e.message); }

  // Notify IndexNow of the core Delta pages on every deploy (fail-safe; never blocks the build).
  try { await pingIndexNow(); } catch (e) { console.warn('[indexnow] skip:', e.message); }
}

main().catch((e) => { console.warn('[generate-plans] WARNING:', e.message, ', deploying with existing HTML'); })
  .finally(() => genSpokes().catch((e) => console.warn('[gen-spokes] WARNING:', e.message, ', skipping generated spokes')));
