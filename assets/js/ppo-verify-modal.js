/**
 * CoverCapy PPO Verification / Nomination Engine
 * Shows a modal letting users request in-network verification from a dental office.
 *
 * Usage: add data-ppo-verify to any button, with data attrs:
 *   data-ppo-verify
 *   data-practice="KYT Dental Services"
 *   data-city="Fountain Valley"
 *   data-phone="(833) 598-3368"          (optional — pre-fills office phone)
 *   data-email=""                          (optional — pre-fills office email)
 *   data-carrier="Cigna"                  (optional — pre-selects carrier)
 */
(function () {
  'use strict';

  // ── Carrier lists ─────────────────────────────────────────────────────────
  const CC_CARRIERS = [
    { id: 'delta-dental', label: 'Delta Dental' },
    { id: 'guardian',     label: 'Guardian' },
    { id: 'aetna',        label: 'Aetna' },
    { id: 'cigna',        label: 'Cigna' },
    { id: 'metlife',      label: 'MetLife' },
    { id: 'ameritas',     label: 'Ameritas' },
  ];

  const OTHER_CARRIERS = [
    'UnitedHealthcare', 'Humana', 'Mutual of Omaha', 'Principal',
    'Sun Life', 'Anthem', 'Blue Cross Blue Shield', 'Assurant',
    'Renaissance', 'Spirit Dental', 'Other'
  ];

  // ── Modal HTML ─────────────────────────────────────────────────────────────
  function buildModal(practice, city, prefillCarrier, prefillPhone, prefillEmail) {
    const id = 'cc-pv-modal';

    const ccChips = CC_CARRIERS.map(c => `
      <button type="button" class="cc-pv-chip${prefillCarrier === c.label ? ' selected' : ''}"
              data-carrier="${c.label}">${c.label}</button>
    `).join('');

    const otherOptions = OTHER_CARRIERS.map(c =>
      `<option value="${c}"${prefillCarrier === c ? ' selected' : ''}>${c}</option>`
    ).join('');

    return `
<div id="${id}" class="cc-pv-overlay" role="dialog" aria-modal="true" aria-labelledby="cc-pv-title">
  <div class="cc-pv-modal">
    <button class="cc-pv-close" aria-label="Close">&times;</button>

    <h2 id="cc-pv-title" class="cc-pv-heading">Verify PPO at ${practice}</h2>
    <p class="cc-pv-sub">Ask ${practice} to confirm they're in-network for your PPO. CoverCapy sends the request for you and notifies you when they reply.</p>

    <!-- Step 1 -->
    <div class="cc-pv-step">
      <span class="cc-pv-step-num">1</span>
      <span class="cc-pv-step-label">Your PPO plan</span>
    </div>

    <div class="cc-pv-plan-toggle">
      <button type="button" class="cc-pv-plan-btn" data-plan="covercapy">
        <strong>I'm getting PPO through CoverCapy</strong>
        <small>Pick a plan we feature</small>
      </button>
      <button type="button" class="cc-pv-plan-btn active" data-plan="own">
        <strong>I already have PPO</strong>
        <small>Choose your carrier</small>
      </button>
    </div>

    <div id="cc-pv-own-section">
      <p class="cc-pv-carrier-label">SELECT YOUR CURRENT PPO CARRIER</p>
      <div class="cc-pv-chips" id="cc-pv-chips">
        ${ccChips}
      </div>
      <div class="cc-pv-other-row">
        <label for="cc-pv-other-select" class="sr-only">Other carrier</label>
        <select id="cc-pv-other-select" class="cc-pv-select">
          <option value="">— Other carrier —</option>
          ${otherOptions}
        </select>
      </div>
    </div>

    <div id="cc-pv-cc-section" style="display:none;">
      <p class="cc-pv-carrier-label">COVERCAPY PPO PLANS</p>
      <div class="cc-pv-chips" id="cc-pv-cc-chips">
        ${CC_CARRIERS.map(c => `<button type="button" class="cc-pv-chip" data-carrier="${c.label}">${c.label}</button>`).join('')}
      </div>
    </div>

    <!-- Step 2 -->
    <div class="cc-pv-step">
      <span class="cc-pv-step-num">2</span>
      <span class="cc-pv-step-label">Where should we send it?</span>
    </div>

    <div class="cc-pv-fields">
      <div class="cc-pv-field-group">
        <label for="cc-pv-email">Office email</label>
        <input type="email" id="cc-pv-email" placeholder="front.desk@office.com" value="${prefillEmail || ''}">
      </div>
      <div class="cc-pv-field-group">
        <label for="cc-pv-phone">Office phone <span class="cc-pv-opt">(optional)</span></label>
        <input type="tel" id="cc-pv-phone" placeholder="(555) 555-5555" value="${prefillPhone || ''}">
      </div>
    </div>
    <p class="cc-pv-field-hint">Add the office's email so we can send your request. Don't have it on hand? A phone number works too.</p>

    <!-- Step 3 -->
    <div class="cc-pv-step">
      <span class="cc-pv-step-num">3</span>
      <span class="cc-pv-step-label">Preview your message</span>
    </div>

    <div class="cc-pv-preview" id="cc-pv-preview">
      <p>Hi ${practice},</p>
      <p>I found your practice on CoverCapy (covercapy.com) and I'd like to book a visit. I currently have <span id="cc-pv-carrier-preview">[select a carrier above]</span> PPO dental coverage.</p>
      <p>Could you confirm whether your office is in-network for this plan and accepting new patients?</p>
      <p>Thank you!</p>
    </div>

    <button type="button" class="cc-pv-send" id="cc-pv-send" disabled>Send verification request</button>

    <p class="cc-pv-cta-line">CoverCapy sends the request to the office on your behalf. <a href="/sign-up" class="cc-pv-cta-link">Create a free account</a> to be notified when they reply &amp; earn Capy Crowns toward free whitening.</p>

    <div id="cc-pv-success" class="cc-pv-success" style="display:none;">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#E6F4F1"/><path d="M12 20l6 6 10-12" stroke="#0D7A6B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <p><strong>Request sent!</strong></p>
      <p>We'll notify you when ${practice} responds. Check back or <a href="/sign-up">create an account</a> to get email updates.</p>
    </div>
  </div>
</div>`;
  }

  // ── CSS ────────────────────────────────────────────────────────────────────
  const CSS = `
.cc-pv-overlay{position:fixed;inset:0;background:rgba(8,42,48,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .2s}
.cc-pv-overlay.open{opacity:1;pointer-events:all}
.cc-pv-modal{background:#FDFBF7;border-radius:16px;padding:32px 28px 24px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 24px 60px rgba(8,42,48,.18)}
.cc-pv-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:#082A30;line-height:1;padding:4px 8px;border-radius:6px}
.cc-pv-close:hover{background:#f0ede6}
.cc-pv-heading{font-family:'Fraunces',Georgia,serif;font-size:22px;color:#082A30;margin:0 0 8px}
.cc-pv-sub{font-size:14px;color:#4a6268;margin:0 0 20px;line-height:1.5}
.cc-pv-step{display:flex;align-items:center;gap:10px;margin:20px 0 12px;font-weight:700;color:#082A30;font-size:15px}
.cc-pv-step-num{width:26px;height:26px;border-radius:50%;background:#082A30;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0}
.cc-pv-plan-toggle{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.cc-pv-plan-btn{border:1.5px solid #d4cfc6;border-radius:10px;background:#fff;padding:12px 14px;cursor:pointer;text-align:left;transition:border-color .15s,background .15s}
.cc-pv-plan-btn strong{display:block;font-size:14px;color:#082A30;margin-bottom:2px}
.cc-pv-plan-btn small{font-size:12px;color:#7a8a8e}
.cc-pv-plan-btn.active{border-color:#082A30;background:#f4f1ea}
.cc-pv-carrier-label{font-size:11px;font-weight:700;letter-spacing:.06em;color:#7a8a8e;text-transform:uppercase;margin:0 0 10px}
.cc-pv-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.cc-pv-chip{border:1.5px solid #d4cfc6;border-radius:20px;background:#fff;padding:6px 14px;font-size:13px;font-weight:600;color:#082A30;cursor:pointer;transition:all .15s}
.cc-pv-chip:hover{border-color:#082A30}
.cc-pv-chip.selected{background:#082A30;color:#fff;border-color:#082A30}
.cc-pv-other-row{margin-top:6px}
.cc-pv-select{width:100%;border:1.5px solid #d4cfc6;border-radius:8px;padding:8px 12px;font-size:13px;color:#082A30;background:#fff;cursor:pointer}
.cc-pv-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px}
@media(max-width:480px){.cc-pv-fields,.cc-pv-plan-toggle{grid-template-columns:1fr}}
.cc-pv-field-group label{display:block;font-size:12px;font-weight:600;color:#082A30;margin-bottom:5px}
.cc-pv-opt{font-weight:400;color:#7a8a8e}
.cc-pv-field-group input{width:100%;border:1.5px solid #d4cfc6;border-radius:8px;padding:9px 12px;font-size:13px;color:#082A30;box-sizing:border-box}
.cc-pv-field-group input:focus,.cc-pv-select:focus{outline:2px solid #082A30;outline-offset:1px;border-color:#082A30}
.cc-pv-field-hint{font-size:12px;color:#7a8a8e;margin:0 0 20px;line-height:1.5}
.cc-pv-preview{background:#f5f2ea;border-radius:10px;padding:16px 18px;font-size:13px;color:#082A30;line-height:1.6;margin-bottom:18px}
.cc-pv-preview p{margin:0 0 10px}
.cc-pv-preview p:last-child{margin-bottom:0}
#cc-pv-carrier-preview{font-weight:700}
.cc-pv-send{width:100%;background:#082A30;color:#fff;border:none;border-radius:10px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;margin-bottom:14px}
.cc-pv-send:hover:not(:disabled){background:#0d3d47}
.cc-pv-send:disabled{opacity:.45;cursor:not-allowed}
.cc-pv-cta-line{font-size:12px;color:#7a8a8e;text-align:center;line-height:1.5;margin:0}
.cc-pv-cta-link{color:#082A30;font-weight:700}
.cc-pv-success{text-align:center;padding:20px 0 10px}
.cc-pv-success p{margin:6px 0;font-size:14px;color:#082A30}
.cc-pv-success a{color:#082A30;font-weight:700}
`;

  // ── Controller ─────────────────────────────────────────────────────────────
  function initModal() {
    // Inject CSS once
    if (!document.getElementById('cc-pv-style')) {
      const s = document.createElement('style');
      s.id = 'cc-pv-style';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    // Remove any existing modal
    const old = document.getElementById('cc-pv-modal');
    if (old) old.remove();
  }

  function openModal(practice, city, prefillCarrier, prefillPhone, prefillEmail) {
    initModal();

    document.body.insertAdjacentHTML('beforeend',
      buildModal(practice, city, prefillCarrier, prefillPhone, prefillEmail)
    );

    const overlay = document.getElementById('cc-pv-modal');
    const sendBtn = document.getElementById('cc-pv-send');
    const previewCarrier = document.getElementById('cc-pv-carrier-preview');
    const otherSelect = document.getElementById('cc-pv-other-select');

    let selectedCarrier = prefillCarrier || '';

    // Open
    requestAnimationFrame(() => overlay.classList.add('open'));

    // Focus trap
    overlay.querySelector('.cc-pv-close').focus();

    // Close handlers
    function closeModal() {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 200);
      document.removeEventListener('keydown', escHandler);
    }

    overlay.querySelector('.cc-pv-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    function escHandler(e) { if (e.key === 'Escape') closeModal(); }
    document.addEventListener('keydown', escHandler);

    // Plan toggle
    overlay.querySelectorAll('.cc-pv-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        overlay.querySelectorAll('.cc-pv-plan-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const plan = btn.dataset.plan;
        document.getElementById('cc-pv-own-section').style.display = plan === 'own' ? '' : 'none';
        document.getElementById('cc-pv-cc-section').style.display = plan === 'covercapy' ? '' : 'none';
      });
    });

    function setCarrier(name) {
      selectedCarrier = name;
      previewCarrier.textContent = name || '[select a carrier above]';
      // Update send button
      const contact = document.getElementById('cc-pv-email').value.trim() ||
                      document.getElementById('cc-pv-phone').value.trim();
      sendBtn.disabled = !(selectedCarrier && contact);
    }

    // Chip selection (all chip groups)
    overlay.querySelectorAll('.cc-pv-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        overlay.querySelectorAll('.cc-pv-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        otherSelect.value = '';
        setCarrier(chip.dataset.carrier);
      });
    });

    // Other select
    otherSelect.addEventListener('change', () => {
      if (otherSelect.value) {
        overlay.querySelectorAll('.cc-pv-chip').forEach(c => c.classList.remove('selected'));
        setCarrier(otherSelect.value);
      }
    });

    // Contact fields enable send
    ['cc-pv-email', 'cc-pv-phone'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const contact = document.getElementById('cc-pv-email').value.trim() ||
                        document.getElementById('cc-pv-phone').value.trim();
        sendBtn.disabled = !(selectedCarrier && contact);
      });
    });

    // Initialize carrier preview if pre-filled
    if (prefillCarrier) {
      previewCarrier.textContent = prefillCarrier;
    }

    // Send
    sendBtn.addEventListener('click', () => {
      const email = document.getElementById('cc-pv-email').value.trim();
      const phone = document.getElementById('cc-pv-phone').value.trim();

      // Show loading
      sendBtn.textContent = 'Sending…';
      sendBtn.disabled = true;

      // POST to Supabase edge function (or fall back to mailto)
      const payload = {
        practice,
        city,
        carrier: selectedCarrier,
        office_email: email,
        office_phone: phone,
        source_url: window.location.href,
      };

      fetch('/api/ppo-verify-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(r => {
          if (!r.ok) throw new Error('network');
          return r.json();
        })
        .catch(() => {
          // Fallback: open mailto if API not available
          const subject = encodeURIComponent(`PPO In-Network Verification Request — ${selectedCarrier}`);
          const body = encodeURIComponent(
            `Hi ${practice},\n\nI found your practice on CoverCapy (covercapy.com) and I'd like to book a visit. I currently have ${selectedCarrier} PPO dental coverage.\n\nCould you confirm whether your office is in-network for this plan and accepting new patients?\n\nThank you!`
          );
          if (email) {
            window.open(`mailto:${email}?subject=${subject}&body=${body}`);
          } else if (phone) {
            window.open(`tel:${phone.replace(/\D/g, '')}`);
          }
        })
        .finally(() => {
          // Show success
          overlay.querySelector('.cc-pv-modal').querySelectorAll(':not(#cc-pv-success):not(.cc-pv-close)').forEach(el => {
            if (el.parentElement.id === 'cc-pv-modal' || el === overlay.querySelector('.cc-pv-modal')) return;
            el.style.display = 'none';
          });
          // Simpler: just replace inner content
          const modal = overlay.querySelector('.cc-pv-modal');
          modal.innerHTML = `
            <button class="cc-pv-close" aria-label="Close">&times;</button>
            <div class="cc-pv-success" style="padding:40px 20px;text-align:center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="margin-bottom:12px"><circle cx="24" cy="24" r="24" fill="#E6F4F1"/><path d="M14 24l8 8 13-16" stroke="#0D7A6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <p style="font-size:18px;font-weight:700;color:#082A30;margin:0 0 8px">Request sent!</p>
              <p style="font-size:14px;color:#4a6268;line-height:1.5">We'll notify you when <strong>${practice}</strong> responds.<br><a href="/sign-up" style="color:#082A30;font-weight:700">Create a free account</a> to get email updates &amp; earn Capy Crowns toward free whitening.</p>
            </div>`;
          modal.querySelector('.cc-pv-close').addEventListener('click', closeModal);
        });
    });
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.CoverCapyVerify = { open: openModal };

  // ── Auto-bind data-ppo-verify buttons ─────────────────────────────────────
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-ppo-verify]');
    if (!btn) return;
    e.preventDefault();
    openModal(
      btn.dataset.practice || document.title.split('|')[0].trim(),
      btn.dataset.city || '',
      btn.dataset.carrier || '',
      btn.dataset.phone || '',
      btn.dataset.email || ''
    );
  });
})();
