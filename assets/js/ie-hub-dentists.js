/**
 * CoverCapy — IE Hub Dentist Grid
 * Fetches Inland Empire dentists (Chino Hills + Chino) from Supabase,
 * sorts Platinum Elite first, then by google_review_count.
 * Paginates at 9/page.
 *
 * Required elements:
 *   <div id="cc-ie-grid"></div>
 *   <p  id="cc-ie-note"></p>   (optional)
 */
(function () {
  'use strict';

  const SUPABASE_URL  = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';

  const PER_PAGE = 9;
  const IE_CITIES = ['Chino Hills', 'Chino'];

  function citySlug(city) { return city.toLowerCase().replace(/\s+/g, '-'); }
  function profileUrl(d)   { return `/dentists/california/inland-empire/${citySlug(d.city)}/${d.slug}/`; }

  function stars(r) {
    r = Math.round(parseFloat(r) || 0);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  }

  // ── Tier helpers ──────────────────────────────────────────────────────────
  function isPlatinumElite(d) {
    return d.membership_tier === 'platinum_elite' || d.featured_tier === 'platinum_elite';
  }

  function tierBadge(d) {
    if (isPlatinumElite(d)) {
      return `<span class="cc-oc-tier cc-oc-tier--platinum">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Platinum Elite
      </span>`;
    }
    if (d.is_featured) {
      return `<span class="cc-oc-tier cc-oc-tier--featured">Featured</span>`;
    }
    return `<span class="cc-oc-tier cc-oc-tier--basic">Directory Listing</span>`;
  }

  function networkBadges(d) {
    const nets = Array.isArray(d.insurance_networks) ? d.insurance_networks.filter(n => n !== 'PPO Friendly') : [];
    if (!nets.length) return '';
    const shown = nets.slice(0, 4);
    return `<div class="cc-oc-nets">${shown.map(n => `<span class="cc-oc-net">${n}</span>`).join('')}${nets.length > 4 ? `<span class="cc-oc-net cc-oc-net--more">+${nets.length - 4} more</span>` : ''}</div>`;
  }

  // ── Card HTML ─────────────────────────────────────────────────────────────
  function cardHTML(d) {
    const url = profileUrl(d);
    const elite = isPlatinumElite(d);

    const ratingRow = d.google_rating
      ? `<div class="cc-oc-rating">
           <span class="cc-oc-stars" aria-label="${d.google_rating} stars">${stars(d.google_rating)}</span>
           <span class="cc-oc-rating-txt">${d.google_rating} (${d.google_review_count || 0})</span>
         </div>` : '';

    const tags = (d.specialties || []).slice(0, 3)
      .map(t => `<span class="cc-oc-tag">${t}</span>`).join('');

    return `<div class="cc-oc-card${elite ? ' cc-oc-card--elite' : ''}">
  <div class="cc-oc-card-head">
    <h3 class="cc-oc-name"><a href="${url}">${d.practice_name}</a></h3>
    ${tierBadge(d)}
  </div>
  <p class="cc-oc-city">${d.city}, CA${d.zip ? ' · ' + d.zip : ''}</p>
  ${ratingRow}
  ${networkBadges(d)}
  ${tags ? `<div class="cc-oc-tags">${tags}</div>` : ''}
  <div class="cc-oc-foot">
    <a href="${url}" class="cc-oc-profile-link">View Profile →</a>
    ${elite ? `<span class="cc-oc-verified-mark">✓ Verified</span>` : ''}
  </div>
</div>`;
  }

  // ── Pagination renderer ───────────────────────────────────────────────────
  function renderPage(container, noteEl, elite, rest, page) {
    const all = [...elite, ...rest];
    const totalPages = Math.ceil(all.length / PER_PAGE);
    const slice = all.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

    let sectionLabel = '';
    if (page === 0 && elite.length > 0) {
      sectionLabel = `<p class="cc-oc-section-label">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#B8924F" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="vertical-align:middle;margin-right:4px">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Platinum Elite Offices — Verified &amp; Accredited
      </p>`;
    }

    let cards = '';
    let crossedBoundary = (page * PER_PAGE) >= elite.length;
    slice.forEach((d, i) => {
      const globalIdx = page * PER_PAGE + i;
      if (!crossedBoundary && globalIdx === elite.length) {
        cards += `<div class="cc-oc-section-break">
          <hr class="cc-oc-hr">
          <p class="cc-oc-section-label" style="margin-top:20px">All PPO offices in Inland Empire</p>
        </div>`;
        crossedBoundary = true;
      }
      cards += cardHTML(d);
    });

    const pager = totalPages > 1 ? `
<div class="cc-oc-pager">
  <button class="cc-oc-pg-btn" ${page === 0 ? 'disabled' : ''} data-page="${page - 1}">← Prev</button>
  <span class="cc-oc-pg-info">Page ${page + 1} of ${totalPages}</span>
  <button class="cc-oc-pg-btn" ${page >= totalPages - 1 ? 'disabled' : ''} data-page="${page + 1}">Next →</button>
</div>` : '';

    container.innerHTML = `${sectionLabel}<div class="cc-oc-grid">${cards}</div>${pager}`;

    container.querySelectorAll('.cc-oc-pg-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        renderPage(container, noteEl, elite, rest, parseInt(btn.dataset.page, 10));
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if (noteEl) {
      noteEl.textContent = elite.length > 0
        ? `${elite.length} Platinum Elite office${elite.length !== 1 ? 's' : ''} · ${all.length} total offices in CoverCapy's IE directory · page ${page + 1} of ${totalPages}`
        : `${all.length} offices in CoverCapy's Inland Empire directory`;
    }
  }

  // ── CSS (shared with oc-hub — same class names) ───────────────────────────
  const CSS = `
.cc-oc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}
@media(max-width:900px){.cc-oc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.cc-oc-grid{grid-template-columns:1fr}}
.cc-oc-card{background:#fff;border-radius:12px;padding:20px 18px;border:1.5px solid #e8e3d8;display:flex;flex-direction:column;gap:9px;transition:box-shadow .18s,border-color .18s}
.cc-oc-card:hover{box-shadow:0 6px 22px rgba(8,42,48,.1)}
.cc-oc-card--elite{border-color:#c9a96e;background:linear-gradient(135deg,#fffdf7 0%,#fff8ec 100%)}
.cc-oc-card-head{display:flex;flex-direction:column;gap:6px}
.cc-oc-name{font-size:15px;font-weight:700;margin:0;line-height:1.3}
.cc-oc-name a{color:#082A30;text-decoration:none}
.cc-oc-name a:hover{text-decoration:underline;color:#0d5c6e}
.cc-oc-tier{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px;width:fit-content;letter-spacing:.03em}
.cc-oc-tier--platinum{background:#FFF3D6;color:#8a6200;border:1px solid #e8c96a}
.cc-oc-tier--featured{background:#E6F4F1;color:#0D7A6B}
.cc-oc-tier--basic{background:#f5f1ea;color:#6b5832}
.cc-oc-city{font-size:12px;color:#6b7880;margin:0}
.cc-oc-rating{display:flex;align-items:center;gap:6px}
.cc-oc-stars{color:#B8924F;font-size:12px;letter-spacing:1px}
.cc-oc-rating-txt{font-size:12px;color:#7a8a8e}
.cc-oc-nets{display:flex;flex-wrap:wrap;gap:4px;margin-top:2px}
.cc-oc-net{font-size:10px;background:#E6F4F1;color:#0D7A6B;border-radius:10px;padding:2px 8px;font-weight:700}
.cc-oc-net--more{background:#f5f1ea;color:#6b5832}
.cc-oc-tags{display:flex;flex-wrap:wrap;gap:5px}
.cc-oc-tag{font-size:11px;background:#f4f1ea;color:#4a3e2a;border-radius:10px;padding:2px 9px;font-weight:600}
.cc-oc-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:8px;flex-wrap:wrap}
.cc-oc-profile-link{font-size:13px;font-weight:700;color:#082A30;text-decoration:none}
.cc-oc-profile-link:hover{text-decoration:underline}
.cc-oc-verified-mark{font-size:11px;font-weight:700;color:#0D7A6B}
.cc-oc-section-label{font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#7a8a8e;margin:0 0 14px;display:flex;align-items:center;gap:4px}
.cc-oc-section-break{grid-column:1/-1;padding-top:8px}
.cc-oc-hr{border:none;border-top:1px solid #e8e3d8;margin:8px 0 0}
.cc-oc-pager{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px;padding-top:20px;border-top:1px solid #e8e3d8}
.cc-oc-pg-btn{background:#082A30;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.cc-oc-pg-btn:hover:not([disabled]){background:#0d3d47}
.cc-oc-pg-btn[disabled]{opacity:.35;cursor:not-allowed}
.cc-oc-pg-info{font-size:13px;color:#6b7880;font-weight:600}
.cc-oc-loading{padding:60px 0;text-align:center;color:#7a8a8e;font-size:14px}
.cc-oc-error{padding:20px;background:#fef2f2;border-radius:10px;font-size:13px;color:#991b1b}
`;

  // ── Supabase fetch ────────────────────────────────────────────────────────
  async function fetchAll() {
    const cityParam = IE_CITIES.map(c => `"${c}"`).join(',');
    const url = `${SUPABASE_URL}/rest/v1/dentists`
      + `?select=slug,practice_name,city,zip,phone,google_rating,google_review_count,insurance_networks,specialties,membership_tier,featured_tier,is_featured`
      + `&city=in.(${IE_CITIES.join(',')})`
      + `&order=google_review_count.desc.nullslast`
      + `&limit=200`;

    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const rows = await res.json();

    // Deduplicate by slug (take first occurrence)
    const seen = new Set();
    return rows.filter(d => {
      if (seen.has(d.slug)) return false;
      seen.add(d.slug);
      return true;
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function injectCSS() {
    if (!document.getElementById('cc-oc-style')) {
      const s = document.createElement('style');
      s.id = 'cc-oc-style';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  async function init() {
    const grid = document.getElementById('cc-ie-grid');
    if (!grid) return;

    const noteEl = document.getElementById('cc-ie-note');
    injectCSS();
    grid.innerHTML = `<div class="cc-oc-loading">Loading Inland Empire dental offices…</div>`;

    try {
      const rows = await fetchAll();
      const elite = rows.filter(isPlatinumElite);
      const rest  = rows.filter(d => !isPlatinumElite(d));
      renderPage(grid, noteEl, elite, rest, 0);
    } catch (err) {
      console.warn('CoverCapy ie-hub-dentists:', err);
      grid.innerHTML = `<div class="cc-oc-error">Could not load live data. Please refresh or try again.</div>`;
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
