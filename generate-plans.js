#!/usr/bin/env node
/* ============================================================
   CoverCapy build step : generate-plans.js
   Pulls active rows from public.ppo_plans and bakes them into
   the static comparison table + verified date inside
   compare-ppo-dental-plans.html, between HTML markers.

   Usage (Vercel build command, before any other build steps):
     SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx node generate-plans.js

   The same env var also gets injected into the page where the
   __SUPABASE_PUBLISHABLE_KEY__ token appears, so the key never
   needs to be committed to the repo.
   ============================================================ */

const fs = require('fs');

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
    console.error('[generate-plans] Supabase returned', res.status, await res.text());
    process.exit(1);
  }
  const plans = await res.json();
  if (!Array.isArray(plans) || plans.length === 0) {
    console.error('[generate-plans] No active plans returned. Aborting so the live table is not blanked.');
    process.exit(1);
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

  // 1. Splice table rows between markers
  const T1 = '<!-- PLANS_TABLE_ROWS_START -->';
  const T2 = '<!-- PLANS_TABLE_ROWS_END -->';
  const t1 = html.indexOf(T1), t2 = html.indexOf(T2);
  if (t1 === -1 || t2 === -1) {
    console.error('[generate-plans] Table markers not found in', PAGE);
    process.exit(1);
  }
  html = html.slice(0, t1 + T1.length) + '\n' + rows + '\n            ' + html.slice(t2);

  // 2. Splice verified date everywhere the marker pair appears
  html = html.replace(
    /(<!-- VERIFIED_DATE_START -->)([\s\S]*?)(<!-- VERIFIED_DATE_END -->)/g,
    `$1${dateText}$3`
  );

  // 3. Update dateModified + lastReviewed in JSON-LD to the verified date
  const isoDate = newest;
  html = html.replace(/"dateModified":\s*"[0-9-]+"/, `"dateModified": "${isoDate}"`);
  html = html.replace(/"lastReviewed":\s*"[0-9-]+"/, `"lastReviewed": "${isoDate}"`);

  // 4. Inject the publishable key token (browser-facing)
  html = html.split('__SUPABASE_PUBLISHABLE_KEY__').join(BROWSER_KEY);

  fs.writeFileSync(PAGE, html);
  console.log('[generate-plans] Wrote', PAGE, '| verified', dateText);
}

main().catch((e) => { console.error('[generate-plans]', e); process.exit(1); });
