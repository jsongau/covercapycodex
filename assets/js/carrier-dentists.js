/**
 * CoverCapy — Carrier Dentist Grid
 * Queries Supabase live for dentists in OC, splits into confirmed in-network
 * vs. unconfirmed, and replaces the static #dentist-grid placeholder.
 *
 * Pages set: <div id="cc-dentist-grid" data-carrier="Delta Dental"></div>
 */
(function () {
  'use strict';

  const SUPABASE_URL = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';

  // OC cities we have profile pages for
  const OC_CITIES = ['Fountain Valley','Huntington Beach','Westminster','Garden Grove','Costa Mesa'];

  // City name → URL slug
  function citySlug(city) {
    return city.toLowerCase().replace(/\s+/g, '-');
  }

  // Practice slug is already stored in the dentists.slug column
  function profileUrl(d) {
    return `/dentists/california/orange-county/${citySlug(d.city)}/${d.slug}/`;
  }

  // Rating stars (filled ★ up to rating, rest ☆)
  function stars(rating) {
    const r = parseFloat(rating) || 0;
    let s = '';
    for (let i = 1; i <= 5; i++) s += i <= Math.round(r) ? '★' : '☆';
    return s;
  }

  function renderCard(d, carrier, confirmed) {
    const url = profileUrl(d);
    const badge = confirmed
      ? `<span class="cc-dc-badge-in">✓ In-Network · ${carrier}</span>`
      : `<span class="cc-dc-badge-unconf">Verify with office</span>`;

    const ratingHtml = d.google_rating
      ? `<span class="cc-dc-stars" aria-label="${d.google_rating} stars">${stars(d.google_rating)}</span>
         <span class="cc-dc-rating">${d.google_rating} (${d.google_review_count || 0} reviews)</span>`
      : '';

    const tagsHtml = (d.specialties || []).slice(0, 3)
      .map(t => `<span class="cc-dc-tag">${t}</span>`).join('');

    const nominateBtn = !confirmed
      ? `<button class="cc-dc-nominate" data-ppo-verify
           data-practice="${(d.practice_name||'').replace(/"/g,'&quot;')}"
           data-city="${d.city}"
           data-carrier="${carrier}"
           data-phone="${d.phone || ''}">Request Verification →</button>`
      : '';

    return `
<div class="cc-dc-card${confirmed ? ' cc-dc-confirmed' : ''}">
  <div class="cc-dc-top">
    <h3 class="cc-dc-name"><a href="${url}">${d.practice_name}</a></h3>
    ${badge}
  </div>
  <p class="cc-dc-city">${d.city}, CA · ${d.zip || ''}</p>
  ${ratingHtml ? `<div class="cc-dc-rating-row">${ratingHtml}</div>` : ''}
  ${tagsHtml ? `<div class="cc-dc-tags">${tagsHtml}</div>` : ''}
  <div class="cc-dc-footer">
    <a href="${url}" class="cc-dc-link">View Profile →</a>
    ${nominateBtn}
  </div>
</div>`;
  }

  const CSS = `
.cc-dc-section{margin:0}
.cc-dc-header{margin-bottom:8px}
.cc-dc-confirmed-section{margin-bottom:36px}
.cc-dc-unconf-section{margin-bottom:36px}
.cc-dc-subtitle{font-size:13px;color:#6b7880;margin:0 0 16px;line-height:1.5}
.cc-dc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.cc-dc-card{background:#fff;border-radius:12px;padding:18px 16px;border:1.5px solid #e8e3d8;display:flex;flex-direction:column;gap:8px;transition:box-shadow .18s}
.cc-dc-card:hover{box-shadow:0 6px 20px rgba(8,42,48,.08)}
.cc-dc-confirmed{border-color:#a8d8ce}
.cc-dc-top{display:flex;flex-direction:column;gap:6px}
.cc-dc-name{font-size:15px;font-weight:700;margin:0}
.cc-dc-name a{color:#082A30;text-decoration:none}
.cc-dc-name a:hover{text-decoration:underline}
.cc-dc-badge-in{display:inline-flex;align-items:center;gap:4px;background:#E6F4F1;color:#0D7A6B;font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px;width:fit-content}
.cc-dc-badge-unconf{display:inline-flex;align-items:center;background:#f5f0e8;color:#6b5c2e;font-size:11px;font-weight:600;border-radius:20px;padding:3px 10px;width:fit-content}
.cc-dc-city{font-size:12px;color:#6b7880;margin:0}
.cc-dc-rating-row{display:flex;align-items:center;gap:6px}
.cc-dc-stars{color:#B8924F;font-size:13px;letter-spacing:1px}
.cc-dc-rating{font-size:12px;color:#6b7880}
.cc-dc-tags{display:flex;flex-wrap:wrap;gap:6px}
.cc-dc-tag{font-size:11px;background:#f4f1ea;color:#4a3e2a;border-radius:10px;padding:2px 9px;font-weight:600}
.cc-dc-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:4px;flex-wrap:wrap}
.cc-dc-link{font-size:13px;font-weight:700;color:#082A30;text-decoration:none}
.cc-dc-link:hover{text-decoration:underline}
.cc-dc-nominate{font-size:12px;background:transparent;border:1.5px solid #082A30;color:#082A30;border-radius:6px;padding:5px 10px;cursor:pointer;font-weight:600}
.cc-dc-nominate:hover{background:#082A30;color:#fff}
.cc-dc-divider{border:none;border-top:1px solid #e8e3d8;margin:28px 0}
.cc-dc-section-label{font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#7a8a8e;margin:0 0 12px}
.cc-dc-loading{padding:40px 0;text-align:center;color:#7a8a8e;font-size:14px}
.cc-dc-error{padding:20px;background:#fef2f2;border-radius:10px;font-size:13px;color:#991b1b}
`;

  async function fetchCarrierDentists(carrier) {
    // Fetch ALL OC dentists (our directory is small; filter client-side for flexibility)
    const cityFilter = OC_CITIES.map(c => `"${c}"`).join(',');
    const url = `${SUPABASE_URL}/rest/v1/dentists` +
      `?select=slug,practice_name,city,zip,phone,google_rating,google_review_count,insurance_networks,specialties` +
      `&city=in.(${OC_CITIES.join(',')})` +
      `&order=google_review_count.desc.nullslast` +
      `&limit=50`;

    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`,
      }
    });

    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const rows = await res.json();

    // Split: confirmed = insurance_networks contains carrier
    const confirmed = rows.filter(d =>
      Array.isArray(d.insurance_networks) && d.insurance_networks.includes(carrier)
    );
    const unconfirmed = rows.filter(d =>
      !Array.isArray(d.insurance_networks) || !d.insurance_networks.includes(carrier)
    );

    return { confirmed, unconfirmed };
  }

  function render(container, carrier, confirmed, unconfirmed) {
    const confirmedHtml = confirmed.length
      ? `<div class="cc-dc-confirmed-section">
           <p class="cc-dc-section-label">✓ Confirmed In-Network for ${carrier} in Orange County</p>
           <div class="cc-dc-grid">${confirmed.map(d => renderCard(d, carrier, true)).join('')}</div>
         </div>`
      : '';

    const unconfHtml = unconfirmed.length
      ? `${confirmed.length ? '<hr class="cc-dc-divider">' : ''}
         <div class="cc-dc-unconf-section">
           <p class="cc-dc-section-label">${confirmed.length ? 'Other offices — verify ' + carrier + ' acceptance' : 'OC dental offices — verify ' + carrier + ' acceptance'}</p>
           <p class="cc-dc-subtitle">${carrier} network participation for these offices hasn't been confirmed in CoverCapy. Click "Request Verification" to send the office a message asking them to confirm.</p>
           <div class="cc-dc-grid">${unconfirmed.map(d => renderCard(d, carrier, false)).join('')}</div>
         </div>`
      : '';

    container.innerHTML = confirmedHtml + unconfHtml;

    const note = document.getElementById('cc-dc-note');
    if (note) {
      note.textContent = confirmed.length > 0
        ? `${confirmed.length} office${confirmed.length > 1 ? 's' : ''} confirmed in-network for ${carrier} · ${unconfirmed.length} additional offices in directory — verify before scheduling`
        : `${unconfirmed.length} offices in CoverCapy's OC directory — ${carrier} acceptance must be verified directly with each office`;
    }
  }

  function injectStyles() {
    if (document.getElementById('cc-dc-style')) return;
    const s = document.createElement('style');
    s.id = 'cc-dc-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  async function init() {
    const container = document.getElementById('cc-dentist-grid');
    if (!container) return;

    const carrier = container.dataset.carrier;
    if (!carrier) return;

    injectStyles();

    // Loading state
    container.innerHTML = `<div class="cc-dc-loading">Loading dentist data…</div>`;

    try {
      const { confirmed, unconfirmed } = await fetchCarrierDentists(carrier);
      render(container, carrier, confirmed, unconfirmed);
    } catch (err) {
      console.warn('CoverCapy carrier-dentists:', err);
      // Graceful fallback — show static content if it exists, else error
      const staticFallback = document.getElementById('cc-dentist-grid-fallback');
      if (staticFallback) {
        container.innerHTML = staticFallback.innerHTML;
      } else {
        container.innerHTML = `<div class="cc-dc-error">Could not load live data. Please refresh or verify directly with each office.</div>`;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
