/**
 * CoverCapy — Huntington Beach City Hub Dentist Grid
 * Fetches HB dentists from Supabase, Platinum Elite first, then by review count.
 */
(function () {
  'use strict';

  const SUPABASE_URL  = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';
  const PER_PAGE = 9;

  function stars(r) { r = Math.round(parseFloat(r)||0); return '★'.repeat(r)+'☆'.repeat(5-r); }
  function isPlatinum(d) { return d.membership_tier==='platinum_elite'||d.featured_tier==='platinum_elite'; }
  function profileUrl(d) { return `/dentists/california/orange-county/huntington-beach/${d.slug}/`; }

  function tierBadge(d) {
    if (isPlatinum(d)) return `<span class="cc-hb-tier cc-hb-tier--plat"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Platinum Elite</span>`;
    if (d.is_featured) return `<span class="cc-hb-tier cc-hb-tier--feat">Featured</span>`;
    return `<span class="cc-hb-tier cc-hb-tier--basic">Directory Listing</span>`;
  }

  function netBadges(d) {
    const nets = Array.isArray(d.insurance_networks) ? d.insurance_networks.filter(n=>n!=='PPO Friendly') : [];
    if (!nets.length) return '';
    const shown = nets.slice(0,4);
    return `<div class="cc-hb-nets">${shown.map(n=>`<span class="cc-hb-net">${n}</span>`).join('')}${nets.length>4?`<span class="cc-hb-net cc-hb-net--more">+${nets.length-4}</span>`:''}</div>`;
  }

  function cardHTML(d) {
    const url = profileUrl(d);
    const elite = isPlatinum(d);
    const ratingRow = d.google_rating ? `<div class="cc-hb-rating"><span class="cc-hb-stars">${stars(d.google_rating)}</span><span class="cc-hb-rtxt">${d.google_rating} (${d.google_review_count||0})</span></div>` : '';
    const tags = (d.specialties||[]).slice(0,3).map(t=>`<span class="cc-hb-tag">${t}</span>`).join('');
    const wknd = d.open_weekends ? `<div class="cc-hb-wknd">📅 ${d.weekend_hours_note||'Weekend hours available'}</div>` : '';
    return `<div class="cc-hb-card${elite?' cc-hb-card--elite':''}">
  <div class="cc-hb-head"><h3 class="cc-hb-name"><a href="${url}">${d.practice_name}</a></h3>${tierBadge(d)}</div>
  <p class="cc-hb-addr">${d.address||d.city+', CA'}</p>
  ${ratingRow}
  ${netBadges(d)}
  ${tags?`<div class="cc-hb-tags">${tags}</div>`:''}
  ${wknd}
  <div class="cc-hb-foot"><a href="${url}" class="cc-hb-link">View Profile</a>${d.phone?`<a href="tel:${d.phone.replace(/\D/g,'')}" class="cc-hb-call">${d.phone}</a>`:''}</div>
</div>`;
  }

  function renderPage(container, noteEl, elite, rest, page) {
    const all = [...elite,...rest];
    const totalPages = Math.ceil(all.length/PER_PAGE);
    const slice = all.slice(page*PER_PAGE,(page+1)*PER_PAGE);
    let cards='', crossed=(page*PER_PAGE)>=elite.length;
    slice.forEach((d,i)=>{
      const idx=page*PER_PAGE+i;
      if(!crossed&&idx===elite.length){cards+=`<div class="cc-hb-break"><hr class="cc-hb-hr"><p class="cc-hb-sec-label">All Huntington Beach PPO dental offices</p></div>`;crossed=true;}
      cards+=cardHTML(d);
    });
    const pager=totalPages>1?`<div class="cc-hb-pager"><button class="cc-hb-pgbtn"${page===0?' disabled':''} data-page="${page-1}">← Prev</button><span class="cc-hb-pginfo">Page ${page+1} of ${totalPages}</span><button class="cc-hb-pgbtn"${page>=totalPages-1?' disabled':''} data-page="${page+1}">Next →</button></div>`:'';
    container.innerHTML=`${elite.length&&page===0?`<p class="cc-hb-sec-label"><svg width="10" height="10" viewBox="0 0 24 24" fill="#B8924F"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Platinum Elite — Verified &amp; Accredited</p>`:''}<div class="cc-hb-grid">${cards}</div>${pager}`;
    container.querySelectorAll('.cc-hb-pgbtn:not([disabled])').forEach(btn=>{
      btn.addEventListener('click',()=>{renderPage(container,noteEl,elite,rest,parseInt(btn.dataset.page,10));container.scrollIntoView({behavior:'smooth',block:'start'});});
    });
    if(noteEl) noteEl.textContent=`${all.length} offices in CoverCapy's Huntington Beach directory`;
  }

  const CSS=`
.cc-hb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:20px 0}
@media(max-width:900px){.cc-hb-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.cc-hb-grid{grid-template-columns:1fr}}
.cc-hb-card{background:#fff;border-radius:12px;padding:20px 18px;border:1.5px solid #e8e3d8;display:flex;flex-direction:column;gap:8px;transition:box-shadow .18s,border-color .18s}
.cc-hb-card:hover{box-shadow:0 6px 22px rgba(8,42,48,.1)}
.cc-hb-card--elite{border-color:#c9a96e;background:linear-gradient(135deg,#fffdf7 0%,#fff8ec 100%)}
.cc-hb-head{display:flex;flex-direction:column;gap:5px}
.cc-hb-name{font-size:15px;font-weight:700;margin:0;line-height:1.3}
.cc-hb-name a{color:#082A30;text-decoration:none}
.cc-hb-name a:hover{text-decoration:underline;color:#0d5c6e}
.cc-hb-tier{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px;width:fit-content}
.cc-hb-tier--plat{background:#FFF3D6;color:#8a6200;border:1px solid #e8c96a}
.cc-hb-tier--feat{background:#E6F4F1;color:#0D7A6B}
.cc-hb-tier--basic{background:#f5f1ea;color:#6b5832}
.cc-hb-addr{font-size:12px;color:#6b7880;margin:0}
.cc-hb-rating{display:flex;align-items:center;gap:6px}
.cc-hb-stars{color:#B8924F;font-size:12px;letter-spacing:1px}
.cc-hb-rtxt{font-size:12px;color:#7a8a8e}
.cc-hb-nets{display:flex;flex-wrap:wrap;gap:4px}
.cc-hb-net{font-size:10px;background:#E6F4F1;color:#0D7A6B;border-radius:10px;padding:2px 8px;font-weight:700}
.cc-hb-net--more{background:#f5f1ea;color:#6b5832}
.cc-hb-tags{display:flex;flex-wrap:wrap;gap:4px}
.cc-hb-tag{font-size:11px;background:#f4f1ea;color:#4a3e2a;border-radius:10px;padding:2px 9px;font-weight:600}
.cc-hb-wknd{font-size:11.5px;color:#4a6a5a;font-weight:600}
.cc-hb-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:8px;flex-wrap:wrap}
.cc-hb-link{font-size:13px;font-weight:700;color:#082A30;text-decoration:none}
.cc-hb-link:hover{text-decoration:underline}
.cc-hb-call{font-size:12px;color:#0D7A6B;font-weight:600;text-decoration:none}
.cc-hb-call:hover{text-decoration:underline}
.cc-hb-sec-label{font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:#7a8a8e;margin:0 0 14px;display:flex;align-items:center;gap:4px}
.cc-hb-break{grid-column:1/-1;padding-top:8px}
.cc-hb-hr{border:none;border-top:1px solid #e8e3d8;margin:8px 0 0}
.cc-hb-pager{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px;padding-top:20px;border-top:1px solid #e8e3d8}
.cc-hb-pgbtn{background:#082A30;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.cc-hb-pgbtn:hover:not([disabled]){background:#0d3d47}
.cc-hb-pgbtn[disabled]{opacity:.35;cursor:not-allowed}
.cc-hb-pginfo{font-size:13px;color:#6b7880;font-weight:600}
.cc-hb-loading{padding:60px 0;text-align:center;color:#7a8a8e;font-size:14px}
.cc-hb-error{padding:20px;background:#fef2f2;border-radius:10px;font-size:13px;color:#991b1b}
`;

  async function fetchAll() {
    const url = `${SUPABASE_URL}/rest/v1/dentists`
      + `?select=slug,practice_name,city,zip,address,phone,google_rating,google_review_count,insurance_networks,specialties,languages,open_weekends,weekend_hours_note,membership_tier,featured_tier,is_featured`
      + `&city=eq.Huntington Beach&state=eq.CA`
      + `&order=google_review_count.desc.nullslast`
      + `&limit=50`;
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` } });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return res.json();
  }

  function injectCSS() {
    if (!document.getElementById('cc-hb-style')) {
      const s = document.createElement('style'); s.id='cc-hb-style'; s.textContent=CSS; document.head.appendChild(s);
    }
  }

  async function init() {
    const grid = document.getElementById('cc-hb-grid');
    if (!grid) return;
    const noteEl = document.getElementById('cc-hb-note');
    injectCSS();
    grid.innerHTML = `<div class="cc-hb-loading">Loading Huntington Beach dental offices…</div>`;
    try {
      const rows = await fetchAll();
      const elite = rows.filter(isPlatinum);
      const rest  = rows.filter(d => !isPlatinum(d));
      renderPage(grid, noteEl, elite, rest, 0);
    } catch(err) {
      console.warn('CoverCapy hb-hub-dentists:', err);
      grid.innerHTML = `<div class="cc-hb-error">Could not load live data. Please refresh or try again.</div>`;
    }
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
