/**
 * CoverCapy — Carrier Dentist Grid + Featured City
 * Queries Supabase live, paginates at 9/page, renders featured city spotlight.
 *
 * Required elements on carrier pages:
 *   <div id="cc-dentist-grid" data-carrier="Delta Dental"></div>
 *   <p  id="cc-dc-note" class="listing-note rv"></p>
 *   <div id="cc-featured-city"></div>   ← city spotlight, populated dynamically
 */
(function () {
  'use strict';

  const SUPABASE_URL  = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';

  const PER_PAGE = 9;

  // OC cities with profile pages — expand as Jay adds cities
  const OC_CITIES = ['Fountain Valley','Huntington Beach','Westminster','Garden Grove','Costa Mesa'];

  // City name → hub URL slug (carrier-specific city pages not built yet — link to dentist profiles)
  const CITY_HUBS = {
    'Fountain Valley':  '/ppo-dentists/california/orange-county/fountain-valley/',
    'Huntington Beach': null,
    'Westminster':      null,
    'Garden Grove':     null,
    'Costa Mesa':       null,
  };

  function citySlug(city) { return city.toLowerCase().replace(/\s+/g, '-'); }
  function profileUrl(d)   { return `/dentists/california/orange-county/${citySlug(d.city)}/${d.slug}/`; }

  function stars(r) {
    r = Math.round(parseFloat(r) || 0);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  // ── Card HTML ─────────────────────────────────────────────────────────────
  function cardHTML(d, carrier, confirmed) {
    const url   = profileUrl(d);
    const badge = confirmed
      ? `<span class="cc-dc-badge cc-dc-badge--in">✓ In-Network · ${carrier}</span>`
      : `<span class="cc-dc-badge cc-dc-badge--unconf">Verify with office</span>`;

    const ratingRow = d.google_rating
      ? `<div class="cc-dc-rating-row">
           <span class="cc-dc-stars" aria-label="${d.google_rating} out of 5 stars">${stars(d.google_rating)}</span>
           <span class="cc-dc-rating-txt">${d.google_rating} (${d.google_review_count || 0} reviews)</span>
         </div>` : '';

    const tags = (d.specialties || []).slice(0, 3)
      .map(t => `<span class="cc-dc-tag">${t}</span>`).join('');

    const verifyBtn = !confirmed
      ? `<button class="cc-dc-verify-btn" data-ppo-verify
             data-practice="${(d.practice_name||'').replace(/"/g,'&quot;')}"
             data-city="${d.city}" data-carrier="${carrier}"
             data-phone="${d.phone||''}">Request Verification →</button>` : '';

    return `<div class="cc-dc-card${confirmed ? ' cc-dc-card--confirmed' : ''}">
  <div class="cc-dc-card-top">
    <h3 class="cc-dc-name"><a href="${url}">${d.practice_name}</a></h3>
    ${badge}
  </div>
  <p class="cc-dc-city">${d.city}, CA · ${d.zip||''}</p>
  ${ratingRow}
  ${tags ? `<div class="cc-dc-tags">${tags}</div>` : ''}
  <div class="cc-dc-footer">
    <a href="${url}" class="cc-dc-profile-link">View Profile →</a>
    ${verifyBtn}
  </div>
</div>`;
  }

  // ── Featured city spotlight ───────────────────────────────────────────────
  function renderFeaturedCity(container, carrier, allRows) {
    // Pick the city with the most confirmed dentists, fall back to most total
    const byCity = {};
    allRows.forEach(d => {
      if (!byCity[d.city]) byCity[d.city] = { confirmed: [], others: [] };
      const isConfirmed = Array.isArray(d.insurance_networks) && d.insurance_networks.includes(carrier);
      byCity[d.city][isConfirmed ? 'confirmed' : 'others'].push(d);
    });

    // Sort cities: most confirmed first, then most total
    const sorted = Object.entries(byCity).sort(([, a], [, b]) =>
      (b.confirmed.length - a.confirmed.length) || ((b.confirmed.length + b.others.length) - (a.confirmed.length + a.others.length))
    );

    if (!sorted.length) { container.style.display = 'none'; return; }

    const [featCity, { confirmed, others }] = sorted[0];
    const spotlight = [...confirmed, ...others].slice(0, 3);
    const hubUrl = CITY_HUBS[featCity];
    const allLink = hubUrl
      ? `<a href="${hubUrl}" class="cc-fc-all-link rv">See all ${featCity} PPO dentists →</a>`
      : '';

    container.innerHTML = `
<div class="container">
  <p class="eyebrow rv">Featured City</p>
  <h2 class="section-h2 rv">${carrier} PPO dentists in ${featCity}, CA</h2>
  <p class="body-p rv">Showing ${spotlight.length} of ${confirmed.length + others.length} dental offices in CoverCapy's ${featCity} directory.
  ${confirmed.length > 0 ? `<strong>${confirmed.length} confirmed in-network</strong> for ${carrier}.` : `Use "Request Verification" to ask any office about ${carrier} acceptance.`}</p>
  <div class="dentist-grid rv">${spotlight.map(d => {
    const isConf = Array.isArray(d.insurance_networks) && d.insurance_networks.includes(carrier);
    return cardHTML(d, carrier, isConf);
  }).join('')}</div>
  ${allLink}
</div>`;
  }

  // ── Paginator ─────────────────────────────────────────────────────────────
  function renderPage(container, noteEl, carrier, confirmed, unconfirmed, page) {
    const all = [
      ...confirmed.map(d => ({ d, confirmed: true })),
      ...unconfirmed.map(d => ({ d, confirmed: false })),
    ];
    const totalPages = Math.ceil(all.length / PER_PAGE);
    const slice = all.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

    // Section label
    const confirmedOnPage = slice.filter(x => x.confirmed).length;
    let sectionLabel = '';
    if (page === 0 && confirmed.length > 0) {
      sectionLabel = `<p class="cc-dc-section-label">✓ Confirmed In-Network for ${carrier}</p>`;
    } else if (page === 0 && confirmed.length === 0) {
      sectionLabel = `<p class="cc-dc-section-label">OC dental offices — verify ${carrier} acceptance</p>`;
    }

    // Separator between confirmed and unconfirmed within a page
    let cards = '';
    let passedConfirmed = (page * PER_PAGE) >= confirmed.length;
    slice.forEach((item, i) => {
      const globalIdx = page * PER_PAGE + i;
      if (!passedConfirmed && globalIdx === confirmed.length) {
        cards += `<div class="cc-dc-section-break">
          <hr class="cc-dc-hr">
          <p class="cc-dc-section-label" style="margin-top:24px">Other offices — verify ${carrier} acceptance</p>
          <p class="cc-dc-sub-note">${carrier} network participation hasn't been confirmed for these offices. Click "Request Verification" to ask them directly.</p>
        </div>`;
        passedConfirmed = true;
      }
      cards += cardHTML(item.d, carrier, item.confirmed);
    });

    // Pagination controls
    const pager = totalPages > 1 ? `
<div class="cc-dc-pager">
  <button class="cc-dc-pg-btn" ${page === 0 ? 'disabled' : ''} data-page="${page - 1}">← Prev</button>
  <span class="cc-dc-pg-info">Page ${page + 1} of ${totalPages}</span>
  <button class="cc-dc-pg-btn" ${page >= totalPages - 1 ? 'disabled' : ''} data-page="${page + 1}">Next →</button>
</div>` : '';

    container.innerHTML = `${sectionLabel}<div class="cc-dc-grid">${cards}</div>${pager}`;

    // Wire pager buttons
    container.querySelectorAll('.cc-dc-pg-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextPage = parseInt(btn.dataset.page, 10);
        renderPage(container, noteEl, carrier, confirmed, unconfirmed, nextPage);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Note
    if (noteEl) {
      noteEl.textContent = confirmed.length > 0
        ? `${confirmed.length} office${confirmed.length !== 1 ? 's' : ''} confirmed in-network for ${carrier} · ${unconfirmed.length} additional offices — verify before scheduling · showing page ${page + 1} of ${totalPages}`
        : `${all.length} offices in CoverCapy's OC directory — ${carrier} acceptance must be verified directly with each office`;
    }
  }

  // ── CSS ───────────────────────────────────────────────────────────────────
  const CSS = `
.cc-dc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}
@media(max-width:900px){.cc-dc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.cc-dc-grid{grid-template-columns:1fr}}
.cc-dc-card{background:#fff;border-radius:12px;padding:18px 16px;border:1.5px solid #e8e3d8;display:flex;flex-direction:column;gap:8px;transition:box-shadow .18s,border-color .18s}
.cc-dc-card:hover{box-shadow:0 6px 22px rgba(8,42,48,.1)}
.cc-dc-card--confirmed{border-color:#a8d8ce}
.cc-dc-card-top{display:flex;flex-direction:column;gap:6px}
.cc-dc-name{font-size:15px;font-weight:700;margin:0;line-height:1.3}
.cc-dc-name a{color:#082A30;text-decoration:none}
.cc-dc-name a:hover{text-decoration:underline;color:#0d5c6e}
.cc-dc-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;border-radius:20px;padding:3px 11px;width:fit-content;line-height:1.5}
.cc-dc-badge--in{background:#E6F4F1;color:#0D7A6B}
.cc-dc-badge--in::before{content:'';width:6px;height:6px;border-radius:50%;background:#0D7A6B;flex-shrink:0}
.cc-dc-badge--unconf{background:#f5f1ea;color:#6b5832}
.cc-dc-city{font-size:12px;color:#6b7880;margin:0}
.cc-dc-rating-row{display:flex;align-items:center;gap:6px}
.cc-dc-stars{color:#B8924F;font-size:12px;letter-spacing:1px}
.cc-dc-rating-txt{font-size:12px;color:#7a8a8e}
.cc-dc-tags{display:flex;flex-wrap:wrap;gap:5px}
.cc-dc-tag{font-size:11px;background:#f4f1ea;color:#4a3e2a;border-radius:10px;padding:2px 9px;font-weight:600}
.cc-dc-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:6px;flex-wrap:wrap}
.cc-dc-profile-link{font-size:13px;font-weight:700;color:#082A30;text-decoration:none}
.cc-dc-profile-link:hover{text-decoration:underline}
.cc-dc-verify-btn{font-size:12px;background:transparent;border:1.5px solid #082A30;color:#082A30;border-radius:6px;padding:5px 10px;cursor:pointer;font-weight:600;white-space:nowrap;transition:all .15s}
.cc-dc-verify-btn:hover{background:#082A30;color:#fff}
.cc-dc-section-label{font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#7a8a8e;margin:0 0 12px}
.cc-dc-sub-note{font-size:12px;color:#7a8a8e;margin:0 0 16px;line-height:1.5}
.cc-dc-section-break{grid-column:1/-1;padding-top:8px}
.cc-dc-hr{border:none;border-top:1px solid #e8e3d8;margin:8px 0 0}
.cc-dc-pager{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px;padding-top:20px;border-top:1px solid #e8e3d8}
.cc-dc-pg-btn{background:#082A30;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.cc-dc-pg-btn:hover:not([disabled]){background:#0d3d47}
.cc-dc-pg-btn[disabled]{opacity:.35;cursor:not-allowed}
.cc-dc-pg-info{font-size:13px;color:#6b7880;font-weight:600}
.cc-dc-loading{padding:60px 0;text-align:center;color:#7a8a8e;font-size:14px}
.cc-dc-error{padding:20px;background:#fef2f2;border-radius:10px;font-size:13px;color:#991b1b}
/* Featured city reuses .dentist-grid + .dentist-card from carrier page CSS */
.cc-fc-all-link{display:inline-block;margin-top:20px;font-size:14px;font-weight:700;color:#B8924F;text-decoration:none}
.cc-fc-all-link:hover{text-decoration:underline}
`;

  // ── Supabase fetch ────────────────────────────────────────────────────────
  async function fetchAll() {
    const url = `${SUPABASE_URL}/rest/v1/dentists`
      + `?select=slug,practice_name,city,zip,phone,google_rating,google_review_count,insurance_networks,specialties`
      + `&city=in.(${OC_CITIES.join(',')})`
      + `&order=google_review_count.desc.nullslast`
      + `&limit=200`;

    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return res.json();
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function injectCSS() {
    if (!document.getElementById('cc-dc-style')) {
      const s = document.createElement('style');
      s.id = 'cc-dc-style';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  async function init() {
    const grid = document.getElementById('cc-dentist-grid');
    if (!grid) return;

    const carrier    = grid.dataset.carrier;
    const noteEl     = document.getElementById('cc-dc-note');
    const citySpot   = document.getElementById('cc-featured-city');

    if (!carrier) return;
    injectCSS();

    grid.innerHTML = `<div class="cc-dc-loading">Loading live network data…</div>`;

    try {
      const rows = await fetchAll();

      const confirmed   = rows.filter(d => Array.isArray(d.insurance_networks) && d.insurance_networks.includes(carrier));
      const unconfirmed = rows.filter(d => !Array.isArray(d.insurance_networks) || !d.insurance_networks.includes(carrier));

      renderPage(grid, noteEl, carrier, confirmed, unconfirmed, 0);

      if (citySpot) renderFeaturedCity(citySpot, carrier, rows);

    } catch (err) {
      console.warn('CoverCapy carrier-dentists:', err);
      grid.innerHTML = `<div class="cc-dc-error">Could not load live data. Please refresh or verify directly with each office.</div>`;
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
