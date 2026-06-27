/* ============================================================================
   CoverCapy — Concierge external-link send-off
   Self-contained. Include once per page (or let footer.js auto-load it).
   Intercepts clicks on <a href> links that point off covercapy.com and shows
   a branded concierge handoff before opening the destination in a new tab.

   Contract (unchanged from v1):
   - Only http/https <a href> links are intercepted. tel:, mailto:, #anchors,
     javascript: and internal/covercapy.com links are ignored.
   - To exempt a link: data-cc-noleave (or rel="... noleave").
   - Links with data-cc-modal are skipped (the universal insurance modal owns them).
   - Public API: window.ccLeavingConfirm(href)
   ========================================================================== */
(function () {
  if (window.__ccLeavingInit) return;
  window.__ccLeavingInit = true;

  var CANON = 'covercapy.com';
  var ov = null, pending = null, lastFocus = null, goBtn = null;

  function brandFromHost(host) {
    var h = host.replace(/^www\./, '');
    var base = h.split('.')[0];
    var KNOWN = {
      uhc: 'UnitedHealthcare', aetna: 'Aetna', dentaldirect: 'Aetna',
      myplan: 'Ameritas', ameritas: 'Ameritas', guardiandirect: 'Guardian',
      guardianlife: 'Guardian', mutualofomaha: 'Mutual of Omaha', humana: 'Humana'
    };
    if (KNOWN[base]) return KNOWN[base];
    return base.charAt(0).toUpperCase() + base.slice(1);
  }

  function injectStyles() {
    if (document.getElementById('cc-leave-styles')) return;
    var css = [
      '.cc-leave-ov{position:fixed;inset:0;z-index:21000;display:grid;place-items:center;padding:22px;background:rgba(14,46,51,.46);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease}',
      '.cc-leave-ov.show{opacity:1;visibility:visible;pointer-events:auto}',
      '.cc-leave-card{position:relative;width:min(560px,calc(100vw - 36px));max-height:calc(100vh - 44px);overflow:auto;border:1px solid rgba(20,36,42,.12);border-radius:24px;background:linear-gradient(180deg,#FFFDF9,#FBF6EC);box-shadow:0 28px 80px rgba(8,42,48,.32);padding:30px 30px 26px;transform:translateY(10px) scale(.985);transition:transform .26s cubic-bezier(.16,1,.3,1)}',
      '.cc-leave-ov.show .cc-leave-card{transform:translateY(0) scale(1)}',
      '.cc-leave-close{position:absolute;top:14px;right:14px;width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(20,36,42,.14);border-radius:50%;background:transparent;color:#4a5b5c;cursor:pointer;font-size:15px;line-height:1;transition:all .18s ease}',
      '.cc-leave-close:hover{background:rgba(27,94,90,.08);color:#0E3F44;transform:translateY(-1px)}',
      '.cc-leave-eyebrow{display:flex;align-items:center;gap:8px;font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8A6A30;margin-bottom:12px;padding-right:40px}',
      '.cc-leave-eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:#B8924F;box-shadow:0 0 0 4px rgba(184,146,79,.16)}',
      ".cc-leave-card h2{font-family:'Fraunces',Georgia,serif;font-weight:600;font-size:clamp(26px,4vw,34px);line-height:1.1;letter-spacing:-.015em;color:#0F1F26;margin:0 0 10px}",
      '.cc-leave-card h2 em{font-style:italic;color:#1B5E5A}',
      '.cc-leave-lede{font-size:14.5px;line-height:1.6;color:#3C5560;margin:0 0 16px;max-width:56ch}',
      '.cc-leave-lede strong{color:#0E3F44}',
      '.cc-leave-notes{border:1px solid rgba(184,146,79,.28);border-radius:16px;background:linear-gradient(160deg,#FBF6EC,rgba(231,240,236,.4));padding:14px 16px;margin:0 0 18px}',
      '.cc-leave-note{display:flex;gap:10px;padding:7px 0;border-top:1px solid rgba(20,36,42,.07);font-size:12.8px;line-height:1.5;color:#3C5560}',
      '.cc-leave-note:first-child{border-top:none;padding-top:0}',
      ".cc-leave-note .n{font-family:'Fraunces',Georgia,serif;font-style:italic;color:#8A6A30;font-size:13px}",
      '.cc-leave-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}',
      '.cc-leave-go{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 22px;border:none;border-radius:999px;background:linear-gradient(135deg,#1B5E5A,#0E3F44);color:#fff;font-family:inherit;font-size:14px;font-weight:800;cursor:pointer;box-shadow:0 10px 24px rgba(14,63,68,.26);transition:transform .15s ease}',
      '.cc-leave-go:hover{transform:translateY(-2px)}',
      '.cc-leave-stay{display:inline-flex;align-items:center;gap:6px;border:none;background:transparent;color:#556A67;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;padding:10px 4px;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(85,106,103,.35)}',
      '.cc-leave-stay:hover{color:#0E3F44}',
      '.cc-leave-foot{margin-top:14px;font-size:11px;color:#6E8590;letter-spacing:.02em}'
    ].join('\n');
    var s = document.createElement('style');
    s.id = 'cc-leave-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildModal() {
    if (ov) return;
    injectStyles();
    ov = document.createElement('div');
    ov.className = 'cc-leave-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'cc-leave-title');
    ov.innerHTML =
      '<div class="cc-leave-card" role="document">' +
        '<button type="button" class="cc-leave-close" aria-label="Stay on CoverCapy">&#10005;</button>' +
        '<div class="cc-leave-eyebrow">CoverCapy Concierge &middot; Walking you over</div>' +
        '<h2 id="cc-leave-title">We’ll walk you over to <em data-leave-brand>the carrier</em>.</h2>' +
        '<p class="cc-leave-lede">You’re heading to <strong data-leave-brand2>their</strong> official site, which opens in a new tab. Take your time there — <strong>this page stays open</strong>, exactly where you left it.</p>' +
        '<div class="cc-leave-notes" aria-label="Before you go">' +
          '<div class="cc-leave-note"><span class="n">i.</span><span>CoverCapy <strong>never sees or stores</strong> your payment, insurance, or login details. Anything you enter over there stays with them.</span></div>' +
          '<div class="cc-leave-note"><span class="n">ii.</span><span>We’re an <strong>independent concierge</strong> — not a broker or affiliate — and we don’t earn a commission on anything you do next.</span></div>' +
          '<div class="cc-leave-note"><span class="n">iii.</span><span>Buying a plan? <strong>Verify your dentist accepts it first.</strong> Our <a href="/ppodentists.html" style="color:#1B5E5A;font-weight:700">dentist finder</a> takes two minutes.</span></div>' +
        '</div>' +
        '<div class="cc-leave-actions">' +
          '<button type="button" class="cc-leave-stay">Stay with CoverCapy</button>' +
          '<button type="button" class="cc-leave-go">Continue to <span data-leave-brand3>site</span> &rarr;</button>' +
        '</div>' +
        '<p class="cc-leave-foot" data-leave-host></p>' +
      '</div>';
    document.body.appendChild(ov);
    goBtn = ov.querySelector('.cc-leave-go');
    goBtn.addEventListener('click', function () {
      if (pending) window.open(pending, '_blank', 'noopener');
      close();
    });
    ov.querySelector('.cc-leave-stay').addEventListener('click', close);
    ov.querySelector('.cc-leave-close').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  }

  function onKey(e) { if (e.key === 'Escape') close(); }

  function show(href) {
    buildModal();
    var u;
    try { u = new URL(href, location.href); } catch (e) { return; }
    pending = href;
    lastFocus = document.activeElement;
    var brand = brandFromHost(u.hostname);
    ov.querySelector('[data-leave-brand]').textContent = brand;
    ov.querySelector('[data-leave-brand2]').textContent = brand + '’s';
    ov.querySelector('[data-leave-brand3]').textContent = brand;
    ov.querySelector('[data-leave-host]').textContent = 'Destination: ' + u.hostname.replace(/^www\./, '');
    ov.classList.add('show');
    document.addEventListener('keydown', onKey);
    setTimeout(function () { try { goBtn.focus(); } catch (e) {} }, 20);
  }

  function close() {
    if (!ov) return;
    ov.classList.remove('show');
    pending = null;
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function isExternal(a) {
    var href = a.getAttribute('href');
    if (!href) return false;
    if (/^(#|tel:|mailto:|javascript:)/i.test(href)) return false;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return false; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    var host = u.hostname.replace(/^www\./, '').toLowerCase();
    var cur = location.hostname.replace(/^www\./, '').toLowerCase();
    if (host === cur || host === CANON || host.endsWith('.' + CANON)) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.hasAttribute('data-cc-noleave')) return;
    if (a.hasAttribute('data-cc-modal')) return; /* universal insurance modal owns these */
    if ((a.getAttribute('rel') || '').indexOf('noleave') !== -1) return;
    if (!isExternal(a)) return;
    e.preventDefault();
    show(a.href);
  }, true);

  /* Public API: route a JS-driven navigation through the concierge modal.
     Internal/covercapy URLs open immediately without the modal. */
  window.ccLeavingConfirm = function (href) {
    var u;
    try { u = new URL(href, location.href); } catch (e) { window.open(href, '_blank', 'noopener'); return; }
    var host = u.hostname.replace(/^www\./, '').toLowerCase();
    var cur = location.hostname.replace(/^www\./, '').toLowerCase();
    if ((u.protocol !== 'http:' && u.protocol !== 'https:') || host === cur || host === CANON || host.endsWith('.' + CANON)) {
      window.open(href, '_blank', 'noopener');
      return;
    }
    show(href);
  };
})();
