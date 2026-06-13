/**
 * CoverCapy — Dentist Profile Engine
 * Works on any /dentists/.../{slug}/ page.
 * Reads slug from URL, fetches Supabase, patches:
 *   - Tier badge + hero CTA area
 *   - Insurance network cards
 *   - Aggregate review meter (Google · Yelp · Zocdoc · CoverCapy)
 *   - CoverCapy review submission form (signed-in users only)
 *   - Ledger sidebar rows
 */
(function () {
  'use strict';

  const SUPABASE_URL  = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdmJlcWxlZnd3amxyYnl4cGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTk1NzQsImV4cCI6MjA5NTIzNTU3NH0.AIP9Y5rQ4Ey5gbvxZT5jEVfCL7mxEAJX0KfX50JWmDQ';

  // ── Slug + region from URL ────────────────────────────────────────────────
  function slugFromUrl() {
    // /dentists/california/{region}/{city}/{slug}/
    const parts = window.location.pathname.replace(/\/$/, '').split('/');
    return parts[parts.length - 1] || null;
  }

  function regionFromUrl() {
    // parts: ['','dentists','california','orange-county','city','slug']
    const parts = window.location.pathname.replace(/\/$/, '').split('/');
    return parts[3] || 'orange-county'; // fallback to OC
  }

  // ── Auth check (Supabase session in localStorage) ─────────────────────────
  function getSession() {
    try {
      const raw = localStorage.getItem(`sb-${SUPABASE_URL.split('//')[1].split('.')[0]}-auth-token`);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user || null;
    } catch { return null; }
  }

  // ── Fetch dentist ─────────────────────────────────────────────────────────
  async function fetchDentist(slug) {
    const url = `${SUPABASE_URL}/rest/v1/dentists?slug=eq.${encodeURIComponent(slug)}&select=*&limit=1`;
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    const rows = await res.json();
    return rows[0] || null;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function isPlatinumElite(d) {
    return d.membership_tier === 'platinum_elite' || d.featured_tier === 'platinum_elite';
  }
  function isCapyAccredited(d) {
    return isPlatinumElite(d) || d.accreditation_status === 'Capy Accredited' || d.is_claimed;
  }

  function stars(r, max = 5) {
    const filled = Math.round(parseFloat(r) || 0);
    return '★'.repeat(Math.min(filled, max)) + '☆'.repeat(Math.max(max - filled, 0));
  }

  // ── 1. Tier badge ─────────────────────────────────────────────────────────
  function patchTierBadge(d) {
    const el = document.getElementById('prof-tier-badge');
    if (!el) return;

    if (isPlatinumElite(d)) {
      el.innerHTML = `
        <span class="pdp-badge pdp-badge--platinum">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Platinum Elite · Verified &amp; Accredited
        </span>
        <span class="pdp-badge-sub">CoverCapy accredited · Last verified June 2026</span>`;
    } else {
      el.innerHTML = `<span class="pdp-badge pdp-badge--public">Public Directory Listing</span>
        <span class="pdp-badge-sub">Last updated: June 2026</span>`;
    }
  }

  // ── 2. CTAs ───────────────────────────────────────────────────────────────
  function patchCTAs(d) {
    const el = document.getElementById('prof-cta-area');
    if (!el) return;

    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent((d.address || d.practice_name) + ' ' + (d.city || '') + ' CA')}`;
    const phone = d.phone || '';
    const website = d.website_url || d.website || '';

    // Universal CTA order: Verify PPO (primary) → Call → Website → Directions
    el.innerHTML = `
      <a href="/verify-ppo-benefits/" class="btn btn-primary">Verify PPO Coverage <span class="arr">→</span></a>
      ${phone ? `<a href="tel:${phone.replace(/\D/g,'')}" class="btn btn-gold">Call Office</a>` : ''}
      ${website ? `<a href="${website}" target="_blank" rel="noopener noreferrer" class="btn btn-line">Visit Website →</a>` : ''}
      <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-line">Get Directions →</a>`;
    if (isPlatinumElite(d)) {
      el.innerHTML += `<a href="#prof-review-section" class="btn btn-line">Leave a Review →</a>`;
    }
  }

  // ── 3. Insurance networks ─────────────────────────────────────────────────
  const PROMOTED = ['Delta Dental', 'Guardian', 'Aetna', 'Cigna', 'MetLife', 'Humana', 'Ameritas'];

  function patchNetworks(d) {
    const el = document.getElementById('prof-networks');
    if (!el) return;

    const region = regionFromUrl(); // e.g. 'orange-county' or 'inland-empire'
    const confirmed = (d.insurance_networks || []).filter(n => n !== 'PPO Friendly');
    const elite = isPlatinumElite(d);

    const cards = PROMOTED.map(carrier => {
      const isIn = confirmed.includes(carrier);
      const carrierSlug = carrier.toLowerCase().replace(/\s+/g, '-');
      return `<div class="cpc${isIn ? ' cpc--in' : ''}">
  <div class="cpc-name">${carrier}</div>
  <span class="cpc-badge${isIn ? ' cpc-badge--in' : ''}">
    ${isIn ? '✓ In-Network' : elite ? '✗ Out-of-Network' : 'Verify with office'}
  </span>
  ${isIn
    ? `<p class="cpc-note">Confirmed in-network${elite ? ' · Verified by CoverCapy' : ''}.</p>`
    : `<p class="cpc-note">${elite ? 'This office does not participate in this network.' : 'Contact the office to verify current PPO acceptance.'}</p>`}
  <a class="cpc-link" href="/ppo-dentists/california/${region}/${carrierSlug}/">Browse ${carrier} dentists →</a>
</div>`;
    });

    el.innerHTML = cards.join('');

    if (confirmed.length > 0) {
      const note = document.getElementById('prof-networks-note');
      if (note) note.textContent = `${confirmed.length} carrier${confirmed.length !== 1 ? 's' : ''} confirmed in-network${elite ? ' · CoverCapy verified' : ''}.`;
    }
  }

  // ── 4. Review meter ───────────────────────────────────────────────────────
  // Platinum Elite: full aggregate (Google + Yelp + Zocdoc + CoverCapy)
  // Everyone else: Google only (if available)
  function patchReviewMeter(d) {
    const el = document.getElementById('prof-review-meter');
    if (!el) return;

    const elite = isPlatinumElite(d);

    const allSources = [
      { name: 'Google',    rating: d.google_rating,  count: d.google_review_count,  url: d.google_maps_url || null, color: '#4285F4' },
      { name: 'Yelp',      rating: d.yelp_rating,    count: d.yelp_review_count,    url: d.yelp_url || null,        color: '#d32323' },
      { name: 'Zocdoc',    rating: d.zocdoc_rating,  count: d.zocdoc_review_count,  url: d.zocdoc_url || null,      color: '#00658E' },
      { name: 'CoverCapy', rating: d.capy_rating,    count: d.capy_review_count,    url: '#prof-review-section',    color: '#B8924F' },
    ];

    // Non-elite: Google only
    const sources = (elite ? allSources : allSources.slice(0, 1))
      .filter(s => s.rating && parseFloat(s.rating) > 0);

    if (!sources.length) {
      el.closest('section') && (el.closest('section').style.display = 'none');
      return;
    }

    const scoreDisplay = elite
      ? (parseFloat(d.aggregate_rating) || 0)
      : parseFloat(sources[0].rating) || 0;

    const totalCount = sources.reduce((acc, s) => acc + (parseInt(s.count) || 0), 0);
    const label = elite
      ? `${totalCount.toLocaleString()} reviews across all platforms`
      : `${totalCount.toLocaleString()} Google review${totalCount !== 1 ? 's' : ''}`;

    const rows = sources.map(s => {
      const r = parseFloat(s.rating) || 0;
      const pct = (r / 5) * 100;
      const cnt = parseInt(s.count) || 0;
      const linkHtml = s.url
        ? (s.url.startsWith('#')
            ? `<a href="${s.url}" class="pdp-rm-link">Write →</a>`
            : `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="pdp-rm-link">View →</a>`)
        : '';
      return `<div class="pdp-rm-row">
  <span class="pdp-rm-source">${s.name}</span>
  <div class="pdp-rm-bar-wrap"><div class="pdp-rm-bar" style="--pct:${pct}%;--clr:${s.color}"></div></div>
  <span class="pdp-rm-score">${r.toFixed(1)}</span>
  <span class="pdp-rm-count">${cnt > 0 ? `(${cnt.toLocaleString()})` : ''}</span>
  ${linkHtml}
</div>`;
    }).join('');

    el.innerHTML = `
<div class="pdp-rm-header">
  <div class="pdp-rm-agg">
    <span class="pdp-rm-agg-score">${scoreDisplay.toFixed(1)}</span>
    <span class="pdp-rm-agg-stars" aria-label="${scoreDisplay} out of 5">${stars(scoreDisplay)}</span>
    <span class="pdp-rm-agg-total">${label}</span>
  </div>
</div>
<div class="pdp-rm-rows">${rows}</div>
${elite ? '' : '<p style="font-size:12px;color:var(--ink-soft);margin-top:16px">Upgrade to Platinum Elite to display your full review profile across Google, Yelp, Zocdoc, and CoverCapy.</p>'}`;
  }

  // ── 5. CoverCapy review form ──────────────────────────────────────────────
  function patchReviewForm(d) {
    const el = document.getElementById('prof-review-section');
    if (!el) return;

    const user = getSession();
    const elite = isPlatinumElite(d);

    if (!elite) {
      el.style.display = 'none';
      return;
    }

    if (!user) {
      el.innerHTML = `
<div class="pdp-review-gate">
  <p class="eyebrow">Patient Reviews</p>
  <h2>Leave a CoverCapy Review</h2>
  <p style="color:var(--ink-soft);font-size:16px;margin-bottom:20px">Sign in to your CoverCapy account to leave a verified review for KYT Dental Services. Reviews are submitted for approval before publishing.</p>
  <a href="https://www.covercapy.com/sign-in?redirect=${encodeURIComponent(window.location.href)}" class="btn btn-primary">Sign In to Review <span class="arr">→</span></a>
  <a href="https://www.covercapy.com/create-account" class="btn btn-line" style="margin-left:10px">Create Account</a>
</div>`;
      return;
    }

    el.innerHTML = `
<div class="wrap">
  <p class="eyebrow rv">Patient Reviews</p>
  <h2 class="rv rv-d1">Leave a CoverCapy Review</h2>
  <p class="rv rv-d2" style="color:var(--ink-soft);font-size:16px;max-width:60ch;margin-bottom:28px">Signed in as <strong>${user.email}</strong>. Reviews are submitted for approval before publishing. Capy Crowns are awarded for approved reviews.</p>

  <form id="pdp-review-form" class="pdp-review-form rv rv-d1">
    <div class="pdp-rf-stars-row">
      <label class="pdp-rf-label">Your Rating</label>
      <div class="pdp-rf-star-picker" role="radiogroup" aria-label="Rating">
        ${[5,4,3,2,1].map(n => `
        <label class="pdp-rf-star-label" title="${n} star${n!==1?'s':''}">
          <input type="radio" name="rating" value="${n}" ${n===5?'checked':''} required>
          <span>★</span>
        </label>`).join('')}
      </div>
    </div>
    <div class="pdp-rf-field">
      <label class="pdp-rf-label" for="pdp-rf-visit">Type of visit</label>
      <select id="pdp-rf-visit" name="visit_type" class="pdp-rf-input" required>
        <option value="">Select…</option>
        <option value="General checkup / cleaning">General checkup / cleaning</option>
        <option value="Cosmetic dentistry">Cosmetic dentistry</option>
        <option value="Dental implants">Dental implants</option>
        <option value="Emergency visit">Emergency visit</option>
        <option value="Invisalign / orthodontics">Invisalign / orthodontics</option>
        <option value="Crown or bridge">Crown or bridge</option>
        <option value="Root canal">Root canal</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="pdp-rf-field">
      <label class="pdp-rf-label" for="pdp-rf-insurance">PPO plan used</label>
      <select id="pdp-rf-insurance" name="insurance" class="pdp-rf-input">
        <option value="">Select (optional)…</option>
        ${['Delta Dental','Guardian','Aetna','Cigna','MetLife','Ameritas','Other PPO','No insurance / self-pay'].map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
    </div>
    <div class="pdp-rf-field">
      <label class="pdp-rf-label" for="pdp-rf-body">Your review</label>
      <textarea id="pdp-rf-body" name="review" class="pdp-rf-input" rows="5" minlength="40" maxlength="1000" placeholder="Share your experience — wait times, staff, treatment quality, insurance process…" required></textarea>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:4px">Minimum 40 characters. Reviews are moderated before publishing.</p>
    </div>
    <button type="submit" class="btn btn-primary" id="pdp-rf-submit">Submit Review <span class="arr">→</span></button>
    <p id="pdp-rf-status" style="margin-top:14px;font-size:14px;display:none"></p>
  </form>
</div>`;

    document.getElementById('pdp-review-form').addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = document.getElementById('pdp-rf-submit');
      const status = document.getElementById('pdp-rf-status');
      btn.disabled = true;
      btn.textContent = 'Submitting…';
      status.style.display = 'none';

      const formData = new FormData(e.target);
      const rating = formData.get('rating');
      const visitType = formData.get('visit_type');
      const insurance = formData.get('insurance');
      const review = formData.get('review');

      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/form_submissions`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON,
            'Authorization': `Bearer ${SUPABASE_ANON}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            type: 'capy_review',
            status: 'pending',
            office_slug: d.slug,
            practice_name: d.practice_name,
            office_city: d.city,
            patient_email: user.email,
            ppo_carrier: insurance || null,
            treatment_interest: visitType,
            message: review,
            source_page_url: window.location.href,
            details: {
              rating: parseInt(rating),
              visit_type: visitType,
              reviewer_user_id: user.id,
            }
          })
        });

        if (res.ok || res.status === 201) {
          e.target.innerHTML = `
<div style="text-align:center;padding:32px 0;">
  <div style="font-size:40px;margin-bottom:12px">🦫</div>
  <h3 style="color:var(--teal-night);margin-bottom:8px">Review submitted!</h3>
  <p style="color:var(--ink-soft);font-size:16px">Your review is pending approval. Once approved, it will appear on this profile and you'll earn Capy Crowns toward your next reward.</p>
</div>`;
        } else {
          throw new Error(`Status ${res.status}`);
        }
      } catch (err) {
        btn.disabled = false;
        btn.textContent = 'Submit Review →';
        status.style.display = 'block';
        status.style.color = '#991b1b';
        status.textContent = 'Something went wrong. Please try again or contact support.';
        console.warn('CoverCapy review submit:', err);
      }
    });
  }

  // ── 6. Ledger sidebar patch ───────────────────────────────────────────────
  function patchLedger(d) {
    const map = {
      'prof-ledger-specialties':  (d.specialties || []).join(', ') || '—',
      'prof-ledger-doctor':       d.doctor_name || '—',
      'prof-ledger-phone':        d.phone || '—',
      'prof-ledger-networks':     (d.insurance_networks || []).filter(n=>n!=='PPO Friendly').join(', ') || 'Verify with office',
      'prof-ledger-weekend':      d.open_weekends ? 'Open weekends' : (d.weekend_hours_note || 'Verify with office'),
      'prof-ledger-tier':         isPlatinumElite(d) ? '⭐ Platinum Elite' : 'Public Directory Listing',
      'prof-ledger-languages':    (d.languages || []).join(', ') || 'English',
    };
    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  }

  // ── CSS ───────────────────────────────────────────────────────────────────
  const CSS = `
/* Tier badges */
.pdp-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:5px 14px;border:1.5px solid transparent}
.pdp-badge--platinum{background:#FFF3D6;color:#7a5200;border-color:#e8c96a}
.pdp-badge--public{background:#f5f1ea;color:#6b5832;border-color:#e8e3d8}
.pdp-badge-sub{font-size:12px;color:var(--ink-soft);margin-left:8px}

/* Insurance carrier cards */
.carrier-profile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}
@media(max-width:900px){.carrier-profile-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.carrier-profile-grid{grid-template-columns:1fr}}
.cpc{background:#fff;border:1.5px solid #e8e3d8;border-radius:12px;padding:16px 16px 14px;display:flex;flex-direction:column;gap:6px;transition:box-shadow .18s,border-color .18s}
.cpc:hover{box-shadow:0 4px 16px rgba(8,42,48,.08)}
.cpc--in{border-color:#a8d8ce !important;background:linear-gradient(135deg,#f5fdfb 0%,#edf9f5 100%)}
.cpc-name{font-size:14px;font-weight:800;color:var(--teal-night)}
.cpc-badge{display:inline-flex;align-items:center;font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px;width:fit-content;background:#f5f1ea;color:#6b5832;border:1px solid #e8e3d8}
.cpc-badge--in{background:#E6F4F1 !important;color:#0D7A6B !important;border-color:#a8d8ce !important}
.cpc-note{font-size:13px;color:var(--ink-soft);margin:0;flex:1}
.cpc-link{font-size:12px;font-weight:700;color:var(--gold-deep);text-decoration:none;margin-top:auto}
.cpc-link:hover{text-decoration:underline}

/* Review meter */
.pdp-rm-header{margin-bottom:20px}
.pdp-rm-agg{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.pdp-rm-agg-score{font-family:"Fraunces",serif;font-size:52px;font-weight:700;color:var(--teal-night);line-height:1}
.pdp-rm-agg-stars{font-size:22px;color:#B8924F;letter-spacing:2px}
.pdp-rm-agg-total{font-size:14px;color:var(--ink-soft)}
.pdp-rm-rows{display:flex;flex-direction:column;gap:12px}
.pdp-rm-row{display:grid;grid-template-columns:80px 1fr 42px 70px 60px;align-items:center;gap:10px}
@media(max-width:560px){.pdp-rm-row{grid-template-columns:70px 1fr 36px;}.pdp-rm-count,.pdp-rm-link{display:none}}
.pdp-rm-source{font-size:13px;font-weight:700;color:var(--teal-night)}
.pdp-rm-bar-wrap{height:8px;background:#e8e3d8;border-radius:999px;overflow:hidden}
.pdp-rm-bar{height:100%;width:var(--pct);background:var(--clr);border-radius:999px;transition:width .8s cubic-bezier(.22,.8,.3,1)}
.pdp-rm-score{font-size:14px;font-weight:800;color:var(--teal-night);text-align:center}
.pdp-rm-count{font-size:12px;color:var(--ink-soft)}
.pdp-rm-link{font-size:12px;font-weight:700;color:var(--gold-deep);text-decoration:none;white-space:nowrap}
.pdp-rm-link:hover{text-decoration:underline}

/* Review form */
.pdp-review-gate{text-align:center;padding:40px 20px}
.pdp-review-form{display:flex;flex-direction:column;gap:20px;max-width:640px}
.pdp-rf-label{display:block;font-size:13px;font-weight:700;color:var(--teal-night);margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase}
.pdp-rf-field{display:flex;flex-direction:column}
.pdp-rf-input{border:1.5px solid #e8e3d8;border-radius:8px;padding:10px 12px;font-size:15px;font-family:inherit;color:var(--ink);background:#fff;transition:border-color .15s}
.pdp-rf-input:focus{outline:none;border-color:var(--teal-night)}
.pdp-rf-stars-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.pdp-rf-star-picker{display:flex;flex-direction:row-reverse;gap:4px}
.pdp-rf-star-picker input{display:none}
.pdp-rf-star-label{font-size:28px;color:#ddd;cursor:pointer;transition:color .1s}
.pdp-rf-star-picker label:hover ~ label span,.pdp-rf-star-picker label:hover span,.pdp-rf-star-picker input:checked ~ label span,.pdp-rf-star-picker input:checked + label span{color:#B8924F}
`;

  function injectCSS() {
    if (!document.getElementById('pdp-style')) {
      const s = document.createElement('style');
      s.id = 'pdp-style';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  async function init() {
    const slug = slugFromUrl();
    if (!slug || !document.getElementById('prof-tier-badge')) return;

    injectCSS();

    try {
      const d = await fetchDentist(slug);
      if (!d) return;

      patchTierBadge(d);
      patchCTAs(d);
      patchNetworks(d);
      patchReviewMeter(d);
      patchReviewForm(d);
      patchLedger(d);

    } catch (err) {
      console.warn('CoverCapy dentist-profile.js:', err);
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
