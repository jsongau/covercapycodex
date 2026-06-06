/* ==========================================================================
   CoverCapy — Sitewide "Leaving CoverCapy" external-link modal
   Self-contained. Include once per page (or let footer.js auto-load it).
   Intercepts clicks on real <a href> links that point off covercapy.com,
   shows a short disclaimer, then opens the destination in a new tab.

   Scope / notes:
   - Only http/https <a href> links are intercepted. tel:, mailto:, #anchors,
     javascript: and internal/covercapy.com links are ignored.
   - To exempt a specific link, add data-cc-noleave (or rel="... noleave").
   - It does NOT wrap window.open(), so JS-driven navigations (e.g. the search
     page's openWebsite()/booking flows) are intentionally untouched.
   ========================================================================== */
(function () {
  if (window.__ccLeavingInit) return;        // guard against double-load
  window.__ccLeavingInit = true;

  var CANON = 'covercapy.com';

  function externalURL(a) {
    if (!a || !a.getAttribute) return null;
    if (a.hasAttribute('data-cc-noleave')) return null;
    var rel = (a.getAttribute('rel') || '').toLowerCase();
    if (rel.split(/\s+/).indexOf('noleave') !== -1) return null;
    var raw = a.getAttribute('href');
    if (!raw) return null;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return null; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null; // tel:, mailto:, javascript:, #...
    var host = u.hostname.replace(/^www\./, '').toLowerCase();
    var cur  = location.hostname.replace(/^www\./, '').toLowerCase();
    if (host === cur || host === CANON || host.endsWith('.' + CANON)) return null; // internal
    return u;
  }

  var ov, hostEl, goBtn, pending = null, lastFocus = null;

  function build() {
    if (document.getElementById('ccLeave')) { ov = document.getElementById('ccLeave'); return; }

    var css = document.createElement('style');
    css.setAttribute('data-cc-leaving-css', '');
    css.textContent = [
      '.cc-leave-ov{position:fixed;inset:0;z-index:2147482000;display:none;align-items:center;justify-content:center;padding:20px}',
      '.cc-leave-ov.show{display:flex}',
      '.cc-leave-bd{position:absolute;inset:0;background:rgba(8,42,48,.45);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}',
      ".cc-leave-card{position:relative;width:min(440px,100%);background:#fff;border:1px solid var(--line2,#e7e0d4);border-radius:20px;box-shadow:0 24px 60px rgba(8,42,48,.28);padding:26px 26px 22px;font-family:'Inter Tight',ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;transform:translateY(8px) scale(.98);transition:transform .2s ease,opacity .2s ease;opacity:0}",
      '.cc-leave-ov.show .cc-leave-card{transform:none;opacity:1}',
      '.cc-leave-ey{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold,#B8924F);margin-bottom:10px}',
      ".cc-leave-card h2{font-family:'Fraunces',Georgia,serif;font-size:23px;line-height:1.12;color:var(--ink,#082A30);margin:0 0 8px;font-weight:600}",
      '.cc-leave-card p{font-size:14.5px;line-height:1.5;color:var(--soft,#4a5b5c);margin:0 0 6px}',
      '.cc-leave-host{display:block;margin:10px 0 4px;padding:10px 12px;border:1px solid var(--line2,#e7e0d4);border-radius:10px;background:var(--cream,#FBF6EC);font-size:13.5px;font-weight:600;color:var(--ink,#082A30);word-break:break-all}',
      '.cc-leave-actions{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}',
      '.cc-leave-btn{flex:1;min-width:140px;min-height:48px;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;border:1px solid transparent;font-family:inherit;transition:transform .12s ease,box-shadow .12s ease}',
      '.cc-leave-btn:hover{transform:translateY(-1px)}',
      '.cc-leave-go{background:var(--ink,#082A30);color:#fff;box-shadow:0 10px 22px rgba(8,42,48,.22)}',
      '.cc-leave-stay{background:#fff;border-color:var(--line,#d7cebb);color:var(--ink,#082A30)}',
      '.cc-leave-x{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;border:1px solid var(--line2,#e7e0d4);background:#fff;color:var(--soft,#4a5b5c);font-size:18px;line-height:1;cursor:pointer;display:grid;place-items:center}',
      '@media(max-width:560px){.cc-leave-actions{flex-direction:column-reverse}.cc-leave-btn{width:100%}}'
    ].join('');
    document.head.appendChild(css);

    ov = document.createElement('div');
    ov.className = 'cc-leave-ov';
    ov.id = 'ccLeave';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'ccLeaveTitle');
    ov.innerHTML =
      '<div class="cc-leave-bd" data-cc-leave-close></div>' +
      '<div class="cc-leave-card">' +
        '<button class="cc-leave-x" type="button" aria-label="Close" data-cc-leave-close>&times;</button>' +
        '<span class="cc-leave-ey">External link</span>' +
        '<h2 id="ccLeaveTitle">You&rsquo;re leaving CoverCapy</h2>' +
        '<p>This link takes you to a website outside of CoverCapy. We don&rsquo;t control its content. It will open in a new tab.</p>' +
        '<span class="cc-leave-host" id="ccLeaveHost"></span>' +
        '<div class="cc-leave-actions">' +
          '<button class="cc-leave-btn cc-leave-stay" type="button" data-cc-leave-close>Stay on CoverCapy</button>' +
          '<button class="cc-leave-btn cc-leave-go" type="button" id="ccLeaveGo">Continue</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    hostEl = ov.querySelector('#ccLeaveHost');
    goBtn  = ov.querySelector('#ccLeaveGo');

    ov.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-cc-leave-close')) close();
    });
    goBtn.addEventListener('click', function () {
      var u = pending; close();
      if (u) window.open(u.href, '_blank', 'noopener');
    });
  }

  function onKey(e) { if (e.key === 'Escape') close(); }

  function open(u) {
    build();
    pending = u;
    hostEl.textContent = u.hostname.replace(/^www\./, '') + (u.pathname && u.pathname !== '/' ? u.pathname : '');
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

  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = (t && t.closest) ? t.closest('a[href]') : null;
    if (!a) return;
    var u = externalURL(a);
    if (!u) return;
    e.preventDefault();
    e.stopPropagation();
    lastFocus = a;
    open(u);
  }, true); // capture phase: run before component/link handlers

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build, { once: true });
  } else {
    build();
  }
})();
