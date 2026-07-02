/* CoverCapy Mega Nav  -  behavior. Load once, before </body>, after the markup. */

/* CoverCapy Mega Nav v04 JUN 2026
   Purpose: navigation interactions + ZIP-only Platinum Elite lookup.
   Public Supabase anon key only; protect data with RLS and views/RPCs.
*/
(function () {
  'use strict';

  if (window.__CoverCapyMegaNav2Initialized) return;
  window.__CoverCapyMegaNav2Initialized = true;

  var SUPABASE_URL = 'https://hfvbeqlefwwjlrbyxpbj.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_wlfujszvn2logC3KNL3MsA_AW1F42kf';
  var PLATINUM_RADIUS_MILES = 18;

  var nav = document.getElementById('cc-nav');
  var backdrop = document.getElementById('cc-backdrop');
  var curtain = document.getElementById('cc-curtain');
  var links = Array.prototype.slice.call(document.querySelectorAll('.cc-link'));
  var closeTimer = null;

  function isDesktop() {
    return window.matchMedia('(min-width:1081px)').matches;
  }

  function setLinkAria(link, open) {
    var anchor = link.querySelector('.cc-link-anchor');
    if (anchor) anchor.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function openMega(link) {
    if (!link || !backdrop || !nav) return;
    clearTimeout(closeTimer);
    links.forEach(function (item) {
      if (item !== link) { item.classList.remove('is-open'); setLinkAria(item, false); }
    });
    link.classList.add('is-open');
    setLinkAria(link, true);
    backdrop.classList.add('show');
    nav.classList.add('dimmed');
    if (curtain) curtain.classList.add('show');
  }

  function closeMega() {
    links.forEach(function (item) { item.classList.remove('is-open'); setLinkAria(item, false); });
    if (backdrop) backdrop.classList.remove('show');
    if (nav) nav.classList.remove('dimmed');
    if (curtain) curtain.classList.remove('show');
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeMega, 160);
  }

  links.forEach(function (link) {
    var anchor = link.querySelector('.cc-link-anchor');
    var mega = link.querySelector('.cc-mega');
    var caret = link.querySelector('[data-toggle]');

    if (anchor) {
      anchor.setAttribute('aria-expanded', 'false');
      if (mega && mega.id) anchor.setAttribute('aria-controls', mega.id);
    }

    /* Hover = peek open (desktop only): reveals, never navigates. */
    link.addEventListener('mouseenter', function () {
      if (isDesktop()) openMega(link);
    });
    link.addEventListener('mouseleave', function () {
      if (isDesktop()) scheduleClose();
    });
    if (mega) {
      mega.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
      mega.addEventListener('mouseleave', function () { if (isDesktop()) scheduleClose(); });
    }
    /* Caret still toggles for redundancy. */
    if (caret) {
      caret.addEventListener('click', function (event) {
        if (!isDesktop()) return;
        event.preventDefault();
        event.stopPropagation();
        link.classList.contains('is-open') ? closeMega() : openMega(link);
      });
    }
    if (anchor) {
      /* TWO-STAGE: first click opens the panel (no navigation); a second click
         on the already-open item follows the href to the landing page.
         Cmd/Ctrl/Shift/middle click always opens in a new tab immediately. */
      anchor.addEventListener('click', function (event) {
        if (!isDesktop()) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
        if (!link.classList.contains('is-open')) {
          event.preventDefault();
          openMega(link);
        }
        /* else: already open -> allow default navigation to the section page */
      });
      anchor.addEventListener('focus', function () { if (isDesktop()) openMega(link); });
      anchor.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeMega();
          anchor.focus();
        } else if (event.key === 'ArrowDown' && isDesktop()) {
          event.preventDefault();
          if (!link.classList.contains('is-open')) openMega(link);
          var first = mega && mega.querySelector('a,button,input,select,textarea');
          if (first) first.focus();
        }
      });
    }
  });

  if (backdrop) backdrop.addEventListener('click', closeMega);
  if (curtain) {
    curtain.addEventListener('click', closeMega);
    curtain.addEventListener('mouseenter', closeMega);
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMega();
  });

  /* ---- Stacked-sticky support: publish live nav + sub-nav heights ----
     Pages may carry their own sticky sub-nav using top:var(--cc-nav-h).
     We keep --cc-nav-h (and --nav-h, used by the mega panels) truthful so
     the sub-nav re-pins correctly even as the header condenses. */
  (function () {
    var root = document.documentElement;
    var subnavEl; // cached
    function findSubnav() {
      if (subnavEl !== undefined) return subnavEl;
      subnavEl = document.querySelector('[data-cc-subnav], .cc-subnav, .page-subnav, .section-subnav');
      if (!subnavEl) {
        /* Generic: a page sub-nav is a sticky bar pinned at the nav height.
           Our pages now use top:var(--cc-nav-h); match any class name. */
        var navH = nav ? nav.offsetHeight : 68;
        var cands = document.querySelectorAll('nav,header,aside,div,ul,section');
        for (var i = 0; i < cands.length; i++) {
          var el = cands[i];
          if (el === nav || (nav && nav.contains(el))) continue;
          var cs = window.getComputedStyle(el);
          if (cs.position !== 'sticky') continue;
          var topPx = parseFloat(cs.top);
          if (isNaN(topPx)) continue;
          if (Math.abs(topPx - navH) <= 8 && el.offsetHeight > 0 && el.offsetHeight < 160) { subnavEl = el; break; }
        }
        subnavEl = subnavEl || null;
      }
      return subnavEl;
    }
    var lastNavH = -1, lastSubH = -1;
    function syncHeights() {
      if (!nav) return;
      var h = nav.offsetHeight;
      var sub = findSubnav();
      var sh = sub ? sub.offsetHeight : 0;
      /* Only write when changed: avoids redundant style churn and any chance
         of a ResizeObserver feedback loop. The nav's own height is a fixed
         CSS value (never var(--nav-h)), so this stays stable. */
      if (h !== lastNavH) {
        lastNavH = h;
        root.style.setProperty('--nav-h', h + 'px');
        root.style.setProperty('--cc-nav-h', h + 'px');
      }
      if (sh !== lastSubH) {
        lastSubH = sh;
        root.style.setProperty('--subnav-h', sh + 'px');
      }
    }
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(syncHeights);
      ro.observe(nav);
      var sub = findSubnav();
      if (sub) ro.observe(sub);
    }
    window.addEventListener('resize', syncHeights);
    window.addEventListener('orientationchange', syncHeights);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeights);
    syncHeights();

    /* ---- Premium condense on scroll + close panels on scroll ---- */
    var lastY = -1, ticking = false;
    function onScrollFrame() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y === lastY) return;
      var wasCondensed = nav.classList.contains('cc-condensed');
      nav.classList.toggle('cc-condensed', y > 40);
      if (nav.classList.contains('cc-condensed') !== wasCondensed) syncHeights();
      if (Math.abs(y - lastY) > 6 && document.querySelector('.cc-link.is-open')) closeMega();
      lastY = y;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScrollFrame); }
    }, { passive: true });
  })();

  /* ---- Gold / Jade theme toggle (universal, persists across pages) ---- */
  (function () {
    var html = document.documentElement;
    var KEY = 'cc-theme';
    function current() { return html.getAttribute('data-theme') === 'gold' ? 'gold' : 'jade'; }
    function syncSwitches() {
      var t = current();
      var switches = document.querySelectorAll('.cc-theme-switch');
      Array.prototype.forEach.call(switches, function (sw) {
        sw.setAttribute('data-active', t);
        sw.setAttribute('aria-checked', t === 'jade' ? 'true' : 'false');
      });
    }
    function applyTheme(t, animate) {
      if (animate) {
        var tag = document.getElementById('cc-theme-transition');
        if (!tag) { tag = document.createElement('style'); tag.id = 'cc-theme-transition'; document.head.appendChild(tag); }
        tag.textContent = 'html *{transition:background .5s ease,color .5s ease,border-color .5s ease,box-shadow .5s ease,fill .5s ease !important}';
        setTimeout(function () { if (tag) tag.textContent = ''; }, 650);
      }
      html.setAttribute('data-theme', t);
      try { localStorage.setItem(KEY, t); } catch (e) {}
      syncSwitches();
    }
    /* Init: a saved choice wins; otherwise respect what the page set, else jade. */
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'gold' || saved === 'jade') html.setAttribute('data-theme', saved);
    else if (!html.getAttribute('data-theme')) html.setAttribute('data-theme', 'jade');
    syncSwitches();
    var switches = document.querySelectorAll('.cc-theme-switch');
    Array.prototype.forEach.call(switches, function (sw) {
      sw.addEventListener('click', function () { applyTheme(current() === 'gold' ? 'jade' : 'gold', true); });
      sw.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); sw.click(); }
      });
    });
  })();

  function htmlEscape(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function starText(rating) {
    var count = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  function supabaseGet(path) {
    return fetch(SUPABASE_URL + '/rest/v1/' + path, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY
      }
    }).then(function (response) {
      return response.ok ? response.json() : [];
    }).catch(function () { return []; });
  }

  function supabaseRpc(functionName, body) {
    return fetch(SUPABASE_URL + '/rest/v1/rpc/' + functionName, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body || {})
    }).then(function (response) {
      return response.ok ? response.json() : [];
    }).catch(function () { return []; });
  }

  function locationLabel(location) {
    if (!location) return 'your area';
    return location.name || location.city || location.title || 'your area';
  }

  function zipArray(location) {
    if (!location) return [];
    var z = location.zip_codes || location.zips || location.zip || location.postal_code || '';
    if (Array.isArray(z)) return z.map(String).filter(Boolean);
    return String(z || '').replace(/[{}\[\]"]/g, '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function directoryBrowseLabel(searchTerm, location) {
    var term = String(searchTerm || '').trim();
    if (/^\d{5}$/.test(term)) return term;
    var zips = zipArray(location);
    if (zips.length === 1) return zips[0];
    return locationLabel(location && location.name ? location : { name: term || 'this area' });
  }

  function directoryBrowseText(searchTerm, location) {
    return 'Browse all dentists in ' + directoryBrowseLabel(searchTerm, location);
  }

  function locationSlug(location) {
    if (!location) return '';
    if (location.slug) return location.slug;
    var county = location.county ? slugify(location.county).replace(/-county$/, '') + '/' : '';
    return county + slugify(locationLabel(location));
  }

  function findLocationByZip(zip) {
    var query = 'search_locations?select=*&type=eq.city&zip_codes=cs.{'
      + encodeURIComponent(zip) + '}&limit=1';
    return supabaseGet(query).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function findLocationByCity(term) {
    var clean = String(term || '').trim();
    if (!clean) return Promise.resolve(null);
    var wildcard = '*' + clean.replace(/\s+/g, ' ') + '*';
    var query = 'search_locations?select=*&type=eq.city&city=ilike.'
      + encodeURIComponent(wildcard).replace(/%2A/g, '*')
      + '&limit=1';
    return supabaseGet(query).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function findFeaturedDentist(location) {
    if (!location || location.lat == null || location.lng == null) return Promise.resolve(null);
    return supabaseRpc('nav_featured_dentist', {
      in_lat: Number(location.lat),
      in_lng: Number(location.lng),
      radius_miles: PLATINUM_RADIUS_MILES
    }).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function directoryUrl(searchTerm, location) {
    var term = String(searchTerm || '').trim();
    var isZip = /^\d{5}$/.test(term);
    var radius = 8;
    return '/ppodentists.html?where=' + encodeURIComponent(term || '') + '&radius=' + radius + '&autosubmit=1';
  }

  function setZipStatus(message, detail) { /* ZIP state is now rendered inside the result card. */ }

  var lastFindSearchTerm = '';

  function setDirectoryCtas(zip, location) {
    var primary = document.getElementById('nav-find-cta');
    var secondary = document.getElementById('nav-find-all');
    var mainBrowse = document.getElementById('nav-browse-main');
    var term = zip || lastFindSearchTerm;
    var url = directoryUrl(term, location);
    var labelText = directoryBrowseText(term, location);
    var label = labelText + ' <span aria-hidden="true">→</span>';
    if (primary) {
      primary.href = url;
      primary.innerHTML = label;
      primary.classList.remove('cta-idle');
      primary.classList.add('cta-live');
      primary.removeAttribute('aria-disabled');
    }
    if (secondary) {
      secondary.href = url;
      secondary.innerHTML = label;
      secondary.classList.remove('is-disabled');
      secondary.removeAttribute('aria-disabled');
    }
    if (mainBrowse) {
      mainBrowse.href = url;
      mainBrowse.innerHTML = labelText + ' →';
      mainBrowse.classList.remove('is-disabled');
      mainBrowse.removeAttribute('aria-disabled');
    }
  }

  function setFindCard(html, showFallback) {
    var card = document.getElementById('find-featured');
    var fallback = document.getElementById('find-fallback-cta');
    if (card) card.innerHTML = html;
    if (fallback) fallback.hidden = !showFallback;
  }

  function loadingCard(term) {
    return '<div class="featured-banner found-featured-banner">◇ Checking Platinum Elite availability</div>'
      + '<div class="featured-body"><div class="featured-avatar cc-symbol-avatar">⌕</div><div class="featured-copy">'
      + '<div class="featured-name">Searching near ' + htmlEscape(term || 'your area') + '</div>'
      + '<div class="featured-meta">Loading the right column first. The directory opens only after you choose Search Dentists.</div>'
      + '</div></div>';
  }

  function introCard() {
    return '<div class="what-row"><span class="what-icon">♔</span><div><strong>Platinum Elite Dentists</strong><p>Top PPO offices appear first when available near your ZIP.</p></div></div>'
      + '<div class="what-row"><span class="what-icon">✓</span><div><strong>PPO Benefits Confirmed</strong><p>See which PPO plans are accepted before you call.</p></div></div>'
      + '<div class="what-row"><span class="what-icon">⌖</span><div><strong>Dentists Near You</strong><p>Open the full directory to keep searching.</p></div></div>'
      + '';
  }

  function openApplicationCard(city, searchTerm) {
    var term = String(searchTerm || '').trim();
    var place = city && city !== ('ZIP ' + term) ? htmlEscape(city) : htmlEscape(term || 'your area');
    var searchedLabel = /^\d{5}$/.test(term) ? 'ZIP searched' : 'Area searched';
    return '<div class="featured-banner spot-open">◇ Platinum Elite · Application Open</div>'
      + '<div class="zip-result-strip"><span class="zip-result-pin">⌖</span><span><small>' + searchedLabel + '</small><strong>'
      + htmlEscape(term || place) + (city && city !== ('ZIP ' + term) && city !== term ? ' · ' + htmlEscape(city) : '') + '</strong></span></div>'
      + '<div class="featured-body compact-open-body"><div class="featured-avatar cc-symbol-avatar">⌖</div><div class="featured-copy">'
      + '<div class="featured-name">No Platinum Elite dentist<br><span class="open-city-line">within '
      + PLATINUM_RADIUS_MILES + ' miles of ' + place + ', as of this moment</span></div>'
      + '<div class="featured-meta">This area is open. Secure it before another practice does.</div>'
      + '<div class="feature-lines open-opportunity-lines"><span>Appear first in local results</span><span>Serve PPO-ready patients nearby</span></div>'
      + '<a class="find-secure-cta" href="/dentistportal.html#platinum-elite">Secure this area <b>→</b></a>'
      + '</div></div>';
  }

  function dentistCard(dentist, location) {
    var address = String(dentist.address || '').trim();
    var street = address ? address.split(',')[0] : '';
    var rest = address ? address.split(',').slice(1).join(',').trim() : [dentist.city, dentist.zip].filter(Boolean).join(', ');
    var searchText = [dentist.practice_name, address || dentist.city || dentist.zip].filter(Boolean).join(' ');
    var mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(searchText);
    var rating = Number(dentist.rating || dentist.google_rating || 0);
    var reviews = dentist.review_count || dentist.google_review_count || '';
    var distance = dentist.distance_miles != null ? ' · ~' + dentist.distance_miles + ' mi away' : '';
    var profileUrl = dentist.profile_url || '/ppodentists.html';
    var phoneRaw = dentist.phone || '';
    var tel = String(phoneRaw).replace(/[^0-9+]/g, '');

    return '<div class="featured-banner found-featured-banner">◆ Platinum Elite found within '
      + PLATINUM_RADIUS_MILES + ' miles</div>'
      + '<div class="featured-body"><div class="featured-avatar cc-symbol-avatar">◆</div><div class="featured-copy">'
      + '<a class="featured-name feature-practice-link" href="' + htmlEscape(profileUrl) + '">' + htmlEscape(dentist.practice_name || 'Platinum Elite dentist') + '</a>'
      + (rating ? '<div class="featured-meta"><span class="featured-stars">' + starText(rating) + '</span> ' + rating.toFixed(1) + (reviews ? ' · ' + htmlEscape(reviews) + ' reviews' : '') + '</div>' : '')
      + '<a class="featured-loc feature-map-link" href="' + htmlEscape(mapUrl) + '" target="_blank" rel="noopener">'
      + htmlEscape(street) + '<br><span class="featured-address-line2">' + htmlEscape(rest) + '<span class="featured-mi">' + htmlEscape(distance) + '</span></span></a>'
      + (phoneRaw ? '<a class="feature-phone" href="tel:' + htmlEscape(tel) + '">' + htmlEscape(phoneRaw) + '</a>' : '')
      + '</div></div><div class="featured-actions">'
      + '<a class="featured-btn primary" href="' + htmlEscape(profileUrl) + '"><span class="btn-ico" aria-hidden="true">▣</span> Book</a>'
      + (phoneRaw ? '<a class="featured-btn secondary" href="tel:' + htmlEscape(tel) + '"><span class="btn-ico" aria-hidden="true">☎</span> Call</a>' : '<a class="featured-btn secondary" href="' + htmlEscape(profileUrl) + '">Profile</a>')
      + '</div>';
  }

  function renderFindPreview(term) {
    var isZip = /^\d{5}$/.test(term);
    var resolver = isZip ? findLocationByZip(term) : findLocationByCity(term);
    setFindCard(loadingCard(term), false);
    return resolver.then(function (location) {
      var area = location || (isZip ? { name: 'ZIP ' + term } : { name: term });
      lastFindSearchTerm = term;
      setDirectoryCtas(term, location);
      return findFeaturedDentist(location).then(function (dentist) {
        if (dentist) {
          setFindCard(dentistCard(dentist, location), false);
        } else {
          setFindCard(openApplicationCard(locationLabel(area), term), false);
        }
      });
    }).catch(function () {
      setFindCard(openApplicationCard(term, term), false);
    });
  }

  function runZipSearch() {
    var input = document.getElementById('nav-zip');
    if (!input) return;
    var term = input.value.trim().replace(/\s+/g, ' ');
    var isZip = /^\d{5}$/.test(term);
    var isArea = /^[a-zA-Z0-9][a-zA-Z0-9\s.'#,&-]{1,}$/.test(term);
    if (!isZip && !isArea) {
      setFindCard(introCard(), false);
      input.focus();
      return;
    }
    renderFindPreview(term);
  }

  var zipInput = document.getElementById('nav-zip');
  var zipButton = document.getElementById('nav-zip-btn');
  if (zipInput) {
    zipInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9a-zA-Z\s.'-]/g, '').slice(0, 64);
    });
    zipInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') runZipSearch();
    });
  }
  if (zipButton) zipButton.addEventListener('click', runZipSearch);

  document.querySelectorAll('.zip-chip[data-query]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var input = document.getElementById('nav-zip');
      if (!input) return;
      input.value = chip.getAttribute('data-query') || chip.textContent.trim();
      runZipSearch();
    });
  });

  document.querySelectorAll('.pf-pill').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.pf-pill').forEach(function (item) { item.classList.remove('on'); });
      button.classList.add('on');
      var data = {
        me: ['UnitedHealthcare Primary Dental', 'Fast activation, coverage in days', '/ppo-plans/uhc-primary-ppo.html'],
        family: ['Guardian Premier 2.0', 'Higher annual maximum for households', '/ppo-plans/guardian-premier-ppo.html'],
        senior: ['Humana Complete Dental', 'Popular for 65+ PPO planning', '/ppo-plans/humana-complete-dental.html'],
        ortho: ['Ameritas PrimeStar', 'Better fit for orthodontic planning', '/ppo-plans/ameritas-primestar.html']
      }[button.getAttribute('data-plan')] || [];
      var name = document.getElementById('pf-name');
      var benefit = document.getElementById('pf-benefit');
      var link = document.getElementById('pf-go');
      if (name) name.textContent = data[0] || 'Compare PPO plans';
      if (benefit) benefit.textContent = data[1] || 'Match by timing and treatment';
      if (link) link.href = data[2] || '/compare-ppo-dental-plans.html';
    });
  });


  document.addEventListener('click', function (event) {
    var idle = event.target && event.target.closest ? event.target.closest('#nav-find-cta.cta-idle,[aria-disabled="true"]') : null;
    if (idle) event.preventDefault();
  });

  function setupEstimator() {
    var minus = document.getElementById('est-minus');
    var plus = document.getElementById('est-plus');
    var qty = document.getElementById('est-qval');
    var slider = document.getElementById('est-slider');
    var full = document.getElementById('est-full');
    var ppo = document.getElementById('est-ppo');
    var save = document.getElementById('est-save');
    if (!qty || !slider || !full || !ppo || !save) return;

    function money(n) { return '$' + Math.round(n).toLocaleString(); }
    function getCount() {
      return Math.max(1, Math.min(6, Number(String(qty.textContent || '1').replace(/\D/g, '')) || Number(slider.value) || 1));
    }
    function setCount(next) {
      var count = Math.max(1, Math.min(6, Number(next) || 1));
      qty.textContent = '×' + count;
      slider.value = String(count);
      render();
    }
    function render() {
      var count = getCount();
      var cashPerCrown = 1800;
      var ppoPerCrown = 675;
      var cash = cashPerCrown * count;
      var network = ppoPerCrown * count;
      full.textContent = money(cash);
      ppo.textContent = money(network);
      save.textContent = money(cash - network);
      var pct = ((count - 1) / (6 - 1)) * 100;
      slider.style.background = 'linear-gradient(90deg,var(--emerald) 0%,var(--emerald) ' + pct + '%,var(--sand) ' + pct + '%,var(--sand) 100%)';
    }
    if (minus) minus.addEventListener('click', function () { setCount(getCount() - 1); });
    if (plus) plus.addEventListener('click', function () { setCount(getCount() + 1); });
    slider.addEventListener('input', function(){ setCount(slider.value); });
    setCount(slider.value || 1);
  }
  setupEstimator();

  var portalZip = document.getElementById('portal-zip');
  var portalBtn = document.getElementById('portal-zip-btn');
  function openPortalZip() {
    var zip = portalZip ? portalZip.value.replace(/\D/g, '').slice(0, 5) : '';
    window.location.href = '/claim-dentist-listing-profile.html' + (zip ? '?zip=' + encodeURIComponent(zip) : '');
  }
  if (portalZip) portalZip.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 5); });
  if (portalZip) portalZip.addEventListener('keydown', function (event) { if (event.key === 'Enter') openPortalZip(); });
  if (portalBtn) portalBtn.addEventListener('click', openPortalZip);

  var burger = document.getElementById('cc-burger');
  var drawer = document.getElementById('cc-drawer');
  var drawerClose = document.getElementById('cc-drawer-close');
  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('show');
    document.body.classList.add('cc-locked');
    if (burger) burger.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('show');
    document.body.classList.remove('cc-locked');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) burger.addEventListener('click', function(event){ event.preventDefault(); event.stopPropagation(); openDrawer(); });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('[data-acc]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var item = button.closest('.cc-dacc');
      if (!item) return;
      var isOpen = item.classList.contains('open') || item.classList.contains('is-open');
      item.classList.toggle('open', !isOpen);
      item.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  if (drawer) {
    drawer.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.getAttribute('data-cc-modal') === 'insurance') return;
        setTimeout(closeDrawer, 60);
      });
    });
  }

  var modal = document.getElementById('covercapy-universal-modal');
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cc-universal-modal-open');
  }
  document.querySelectorAll('[data-modal-close]').forEach(function (button) {
    button.addEventListener('click', closeModal);
  });
  document.querySelectorAll('[data-cc-modal="insurance"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!modal) return;
      event.preventDefault();
      var continueLink = modal.querySelector('.cc-universal-modal-continue');
      if (continueLink) continueLink.href = link.href;
      modal.classList.add('open');
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('cc-universal-modal-open');
    });
  });


  document.querySelectorAll('.dd-cov-curated .uhc-activation-card').forEach(function(card){
    card.addEventListener('mousemove', function(event){
      var r = card.getBoundingClientRect();
      card.style.setProperty('--cc-cta-x', ((event.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      card.style.setProperty('--cc-cta-y', ((event.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    card.addEventListener('mouseleave', function(){
      card.style.removeProperty('--cc-cta-x');
      card.style.removeProperty('--cc-cta-y');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
}());
