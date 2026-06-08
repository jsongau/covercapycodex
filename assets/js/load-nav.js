
/* CoverCapy Mega Nav v04 JUN 2026
   Purpose: navigation interactions + ZIP-only Platinum Elite lookup.
   Public Supabase anon key only; protect data with RLS and views/RPCs.
*/
(function () {
  'use strict';

  if (window.__CoverCapyMegaNavInitialized) return;
  window.__CoverCapyMegaNavInitialized = true;

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

  function openMega(link) {
    if (!link || !backdrop || !nav) return;
    clearTimeout(closeTimer);
    links.forEach(function (item) {
      if (item !== link) item.classList.remove('is-open');
    });
    link.classList.add('is-open');
    backdrop.classList.add('show');
    nav.classList.add('dimmed');
    if (curtain) curtain.classList.add('show');
  }

  function closeMega() {
    links.forEach(function (item) { item.classList.remove('is-open'); });
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
    if (caret) {
      caret.addEventListener('click', function (event) {
        if (!isDesktop()) return;
        event.preventDefault();
        event.stopPropagation();
        link.classList.contains('is-open') ? closeMega() : openMega(link);
      });
    }
    if (anchor) {
      anchor.addEventListener('focus', function () { if (isDesktop()) openMega(link); });
      anchor.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          closeMega();
          anchor.focus();
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

  /* Scrolling the page down means the user is moving on, so close the (large) mega.
     Scrolling inside the mega's own overflow does not fire a window scroll, so reading a
     tall panel will not close it; only moving the page does. Desktop only. */
  var ccLastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
  window.addEventListener('scroll', function () {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (isDesktop()) {
      var open = links.some(function (l) { return l.classList.contains('is-open'); });
      if (open && y > ccLastScrollY + 3) closeMega();
    }
    ccLastScrollY = y;
  }, { passive: true });

  /* Leaving-site confirmation. Any outbound (different-host) link inside the find
     result card opens a third-party site, so we confirm first and then open it in a
     new tab. Links that stay on our own host (e.g. a dentist's CoverCapy profile)
     skip the notice and just open in a new tab. tel: and mailto: are left alone. */
  var ccLeaveUrl = '';
  var ccLeaveEls = null;
  function buildLeaveModal() {
    if (ccLeaveEls) return ccLeaveEls;
    var wrap = document.createElement('div');
    wrap.className = 'cc-leave';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="cc-leave-backdrop" data-leave-close></div>'
      + '<div class="cc-leave-card" role="dialog" aria-modal="true" aria-labelledby="cc-leave-h">'
      + '<div class="cc-leave-h" id="cc-leave-h">You\u2019re leaving CoverCapy</div>'
      + '<p class="cc-leave-p">This link opens a third-party site. '
      + 'CoverCapy doesn\u2019t operate it and isn\u2019t responsible for its content, '
      + 'availability, or anything you book or arrange there.</p>'
      + '<div class="cc-leave-dest" id="cc-leave-dest"></div>'
      + '<div class="cc-leave-actions">'
      + '<button type="button" class="cc-leave-cancel" data-leave-close>Go back</button>'
      + '<button type="button" class="cc-leave-go" id="cc-leave-go">Continue</button>'
      + '</div></div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) {
      if (e.target.closest('[data-leave-close]')) hideLeave();
    });
    wrap.querySelector('#cc-leave-go').addEventListener('click', function () {
      var u = ccLeaveUrl;
      hideLeave();
      if (u) window.open(u, '_blank', 'noopener,noreferrer');
    });
    ccLeaveEls = wrap;
    return wrap;
  }
  function showLeave(url, host) {
    var wrap = buildLeaveModal();
    ccLeaveUrl = url;
    var dest = wrap.querySelector('#cc-leave-dest');
    dest.textContent = host ? 'Continue to ' + host : '';
    dest.style.display = host ? '' : 'none';
    wrap.classList.add('is-open');
    wrap.setAttribute('aria-hidden', 'false');
  }
  function hideLeave() {
    if (!ccLeaveEls) return;
    ccLeaveEls.classList.remove('is-open');
    ccLeaveEls.setAttribute('aria-hidden', 'true');
    ccLeaveUrl = '';
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ccLeaveEls && ccLeaveEls.classList.contains('is-open')) hideLeave();
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var card = a.closest('#find-featured');
    if (!card) return;
    var raw = a.getAttribute('href') || '';
    if (!raw || raw.charAt(0) === '#') return;
    if (a.hasAttribute('data-leave-skip')) return; /* maps/directions open directly in a new tab */
    var u;
    try { u = new URL(raw, window.location.href); } catch (_) { return; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return; /* leave tel:/mailto: alone */
    var external = !!u.host && u.host !== window.location.host;
    e.preventDefault();
    if (external) {
      showLeave(u.href, u.host);
    } else {
      window.open(u.href, '_blank', 'noopener');
    }
  });

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

  function fmtRating(value) {
    var n = Number(value) || 0;
    return n ? (Math.round(n * 10) / 10).toFixed(1) : '';
  }

  function fmtCount(value) {
    var n = Number(value) || 0;
    return n ? n.toLocaleString('en-US') : '';
  }

  /* Source-rating block matching the live directory: an aggregate-total headline,
     then per-source chips (blue Google, red Yelp, yellow Zocdoc). Any source that is
     missing or zero is skipped, never shown as a 0. */
  function sourceRatingHTML(d) {
    var overall = Number(d.rating || 0) || Number(d.aggregate_rating || 0);
    var gR = Number(d.google_rating || 0), gC = Number(d.google_review_count || 0);
    var yR = Number(d.yelp_rating || 0), yC = Number(d.yelp_review_count || 0);
    var zR = Number(d.zocdoc_rating || 0), zC = Number(d.zocdoc_review_count || 0);
    var headR = overall || gR || yR || zR;
    if (!headR) return '';
    var total = gC + yC + zC;
    if (!total) total = Number(d.review_count || 0) || Number(d.aggregate_review_count || 0);
    function chip(name, cls, r, c) {
      if (!r) return '';
      return '<span class="fc2-src"><span class="fc2-dot ' + cls + '"></span>' + name
        + ' <span class="fc2-num">' + fmtRating(r) + (c ? ' &#183; ' + fmtCount(c) : '') + '</span></span>';
    }
    var chips = chip('Google', 'fc2-dot-google', gR, gC)
      + chip('Yelp', 'fc2-dot-yelp', yR, yC)
      + chip('Zocdoc', 'fc2-dot-zocdoc', zR, zC);
    return '<div class="fc2-ratings">'
      + '<div class="fc2-rating-main"><span class="fc2-stars">' + starText(headR) + '</span> <b>' + fmtRating(headR) + '</b>'
      + (total ? '<span class="fc2-rev">' + fmtCount(total) + ' reviews</span>' : '') + '</div>'
      + (chips ? '<div class="fc2-srcs">' + chips + '</div>' : '')
      + '</div>';
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

  /* ===== Find a Dentist: live suggestions + ZIP->city + expansion spot (v147) ===== */

  var findLink = document.querySelector('.cc-link[data-link="find"]');

  function supabaseSuggest(q) {
    return supabaseRpc('nav_search_suggest', { q: q, max_n: 8 });
  }

  function expansionSpotNear(lat, lng) {
    if (lat == null || lng == null) return Promise.resolve(null);
    return supabaseRpc('nav_expansion_spot', {
      in_lat: Number(lat), in_lng: Number(lng), radius_miles: PLATINUM_RADIUS_MILES
    }).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function featuredDentistNear(lat, lng) {
    if (lat == null || lng == null) return Promise.resolve(null);
    return supabaseRpc('nav_featured_dentist', {
      in_lat: Number(lat), in_lng: Number(lng), radius_miles: PLATINUM_RADIUS_MILES
    }).then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function featuredDentistByScope(scope, value) {
    return supabaseRpc('nav_featured_dentist_by_scope', { in_scope: scope, in_value: value })
      .then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  function citiesForZip(zip) {
    var q = 'search_locations?select=name,city,lat,lng,slug,local_area,market_area,state'
      + '&type=eq.city&zip_codes=cs.{' + encodeURIComponent(zip) + '}&order=name';
    return supabaseGet(q);
  }

  function highlight(text, q) {
    var t = htmlEscape(text);
    var qq = htmlEscape(String(q || '').trim());
    if (!qq) return t;
    var i = t.toLowerCase().indexOf(qq.toLowerCase());
    if (i < 0) return t;
    return t.slice(0, i) + '<b>' + t.slice(i, i + qq.length) + '</b>' + t.slice(i + qq.length);
  }

  /* ---- result card helpers ---- */
  function findCard() { return document.getElementById('find-featured'); }

  function setCard(html, stateClass) {
    var card = findCard();
    if (!card) return;
    card.className = 'find-result-card featured-card' + (stateClass ? ' ' + stateClass : '');
    card.innerHTML = html;
    var panel = document.getElementById('find-action-panel');
    if (panel) panel.style.display = (stateClass === 'is-empty') ? 'none' : '';
  }

  var ccBrowseUrl = '';
  var ccBrowseLabel = '';

  var SCOPE_RADIUS = { zip: 8, city: 25, local_area: 60, market_area: 120, state: 600 };

  function browseUrl(scope, value) {
    var radius = SCOPE_RADIUS[scope] || 25;
    return '/ppodentists.html?where=' + encodeURIComponent(value || '')
      + '&scope=' + encodeURIComponent(scope || 'city')
      + '&radius=' + radius + '&autosubmit=1';
  }

  function setBrowse(scope, value, label) {
    var url = browseUrl(scope, value);
    ccBrowseUrl = url;
    ccBrowseLabel = label || value || 'your area';
    var text = 'Browse all dentists in ' + (label || value);
    var main = document.getElementById('nav-browse-main');
    if (main) {
      main.href = url;
      main.innerHTML = htmlEscape(text) + ' <span class="browse-go" aria-hidden="true">&#8594;</span>';
      main.classList.remove('is-disabled');
      main.removeAttribute('aria-disabled');
    }
    var cta = document.getElementById('nav-find-cta');
    if (cta) {
      cta.href = url;
      cta.innerHTML = htmlEscape(text) + ' <span aria-hidden="true">&#8594;</span>';
      cta.classList.remove('cta-idle');
      cta.classList.add('cta-live');
      cta.removeAttribute('aria-disabled');
    }
    var foot = document.querySelector('.cc-foot-wait');
    if (foot) foot.textContent = 'Showing matches for ' + (label || value);
  }

  /* ---- card renderers ---- */
  function introCardHTML() {
    return '<div class="find-intro-banner"><span class="ib-dot">&#9670;</span> Platinum Elite appears first near you</div>'
      + '<div class="what-row"><span class="what-icon">&#9812;</span><div><strong>Platinum Elite Dentists</strong><p>Top PPO offices appear first when available near your area.</p></div></div>'
      + '<div class="what-row"><span class="what-icon">&#10003;</span><div><strong>PPO Benefits Confirmed</strong><p>See which PPO plans are accepted before you call.</p></div></div>'
      + '<div class="what-row"><span class="what-icon">&#9678;</span><div><strong>Dentists Near You</strong><p>Open the full list to keep searching.</p></div></div>';
  }

  function loadingCardHTML(label) {
    return '<div class="fc2-loading"><span class="fc2-spin" aria-hidden="true"></span>'
      + '<span class="fc2-loading-tx"><strong>Checking ' + htmlEscape(label || 'your area') + '</strong>'
      + '<span>Looking for a Platinum Elite office nearby</span></span></div>';
  }

  function foundCardHTML(d) {
    var name = d.practice_name || 'Platinum Elite dentist';
    var profile = d.profile_url || d.booking_url || d.website || '/ppodentists.html';
    var book = d.booking_url || d.profile_url || d.website || '/ppodentists.html';
    var rating = Number(d.rating || 0);
    var ratingLine = sourceRatingHTML(d);
    if (!ratingLine && d.rating_display) {
      ratingLine = '<div class="fc2-rating">' + htmlEscape(d.rating_display) + '</div>';
    }
    var addrLine1 = '', addrLine2 = '';
    if (d.address) {
      var ci = String(d.address).indexOf(',');
      if (ci > -1) { addrLine1 = d.address.slice(0, ci).trim(); addrLine2 = d.address.slice(ci + 1).trim(); }
      else { addrLine1 = String(d.address).trim(); }
    }
    if (!addrLine1 && !addrLine2) {
      addrLine1 = d.city || '';
      addrLine2 = [d.state, d.zip].filter(Boolean).join(' ');
      if (!addrLine1) { addrLine1 = addrLine2; addrLine2 = ''; }
    }
    var hasAddr = !!(addrLine1 || addrLine2);
    var mapsQuery = d.address || [name, d.city, d.zip].filter(Boolean).join(' ');
    var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapsQuery);
    var dist = d.distance_miles != null ? '<span class="fc2-mi"> &#183; ~' + d.distance_miles + ' mi away</span>' : '';
    var phoneRaw = d.phone || '';
    var tel = String(phoneRaw).replace(/[^0-9+]/g, '');
    return '<div class="fc2-banner">&#9670; Platinum Elite found near you</div>'
      + '<div class="fc2-body"><div class="fc2-avatar">&#9670;</div><div class="fc2-tx">'
      + '<a class="fc2-name" href="' + htmlEscape(profile) + '">' + htmlEscape(name) + '</a>'
      + ratingLine
      + ((hasAddr || phoneRaw) ? '<div class="fc2-meta">' : '')
      + (hasAddr
          ? '<a class="fc2-meta-row fc2-addr" href="' + htmlEscape(mapsUrl) + '" target="_blank" rel="noopener" data-leave-skip>'
            + '<span class="fc2-meta-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/></svg></span>'
            + '<span class="fc2-meta-tx">'
            + '<span class="fc2-addr-l1">' + htmlEscape(addrLine1) + (addrLine2 ? '' : dist) + '</span>'
            + (addrLine2 ? '<span class="fc2-addr-l2">' + htmlEscape(addrLine2) + dist + '<span class="fc2-addr-go" aria-hidden="true"> &#8599;</span></span>' : '')
            + '</span>'
            + '</a>'
          : (dist ? '<span class="fc2-meta-row"><span class="fc2-meta-ic"></span><span class="fc2-meta-tx">' + dist + '</span></span>' : ''))
      + (phoneRaw
          ? '<a class="fc2-meta-row fc2-tel" href="tel:' + htmlEscape(tel) + '">'
            + '<span class="fc2-meta-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3.99c0-.55.45-1 1-1h3.49c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.12.35.03.75-.24 1.02l-2.21 2.21z" fill="currentColor"/></svg></span>'
            + '<span class="fc2-meta-tx">' + htmlEscape(phoneRaw) + '</span>'
            + '</a>'
          : '')
      + ((hasAddr || phoneRaw) ? '</div>' : '')
      + '</div></div>'
      + '<div class="fc2-actions">'
      + '<a class="fc2-btn primary cta-sheen" href="' + htmlEscape(book) + '">Book</a>'
      + '<a class="fc2-btn secondary cta-sheen" href="' + htmlEscape(profile) + '">View profile</a>'
      + '</div>';
  }

  function expansionCardHTML(spot) {
    var place = [spot.city, spot.area].filter(Boolean).join(' \u00b7 ') || (spot.zip || 'this area');
    if (spot.dentist_name) {
      var profile = spot.profile_url || spot.website || '/ppodentists.html';
      var rating = Number(spot.rating || 0);
      var reviews = spot.review_count || '';
      var ratingLine = rating
        ? '<div class="exp-dentist-rating"><span class="st">' + starText(rating) + '</span> ' + rating.toFixed(1) + (reviews ? ' \u00b7 ' + htmlEscape(reviews) + ' reviews' : '') + '</div>'
        : '';
      return '<div class="exp-banner">&#9670; No Platinum Elite here yet</div>'
        + '<div class="exp-body">'
        + '<span class="exp-pin">&#9678; ' + htmlEscape(place) + '</span>'
        + '<div class="exp-h">Be the first in ' + htmlEscape(spot.city || 'this area') + '.</div>'
        + '<div class="exp-dentist"><div class="exp-avatar" aria-hidden="true">&#9670;</div>'
        + '<div class="exp-dentist-tx"><a class="exp-dentist-name" href="' + htmlEscape(profile) + '">' + htmlEscape(spot.dentist_name) + '</a>' + ratingLine
        + '<div class="exp-dentist-note">Already planning to expand here. Claim it first.</div></div></div>'
        + '</div>'
        + '<div class="exp-actions">'
        + '<a class="exp-cta claim" href="/dentist-portal.html#platinum-elite">Claim this area <span class="ar" aria-hidden="true">&#8594;</span></a>'
        + '<a class="exp-cta view" href="' + htmlEscape(profile) + '">View</a>'
        + '</div>';
    }
    return '<div class="exp-banner">&#9670; Platinum Elite spot open</div>'
      + '<div class="exp-body">'
      + '<span class="exp-pin">&#9678; ' + htmlEscape(place) + '</span>'
      + '<div class="exp-h">Be the first in ' + htmlEscape(spot.city || spot.area || 'this area') + '.</div>'
      + '</div>'
      + '<div class="exp-actions">'
      + '<a class="exp-cta claim" href="/dentist-portal.html#platinum-elite">Claim this area <span class="ar" aria-hidden="true">&#8594;</span></a>'
      + '</div>';
  }

  function openCardHTML(label) {
    var place = label || 'this area';
    var browseHref = ccBrowseUrl || '/ppodentists.html';
    return '<div class="find-intro-banner find-intro-calm"><span class="ib-dot">&#9671;</span> No Platinum Elite partner here yet</div>'
      + '<div class="open-wrap">'
      + '<div class="open-h">Let\u2019s find your PPO dentist.</div>'
      + '<div class="open-sub">There are PPO-friendly offices near <b>' + htmlEscape(place) + '</b>.<span class="open-sub-2">Open the list to see them, compare ratings, and book.</span></div>'
      + '<a class="find-browse-main open-browse" href="' + htmlEscape(browseHref) + '" data-leave-skip>Browse PPO dentists in ' + htmlEscape(place) + ' <span class="browse-go" aria-hidden="true">&#8594;</span></a>'
      + '<a class="open-dentist-link" href="/dentist-portal.html#platinum-elite">Are you a dentist? Claim this area &#8594;</a>'
      + '</div>';
  }

  function cityPickCardHTML(zip, cities) {
    var chips = cities.map(function (c, idx) {
      return '<button type="button" class="find-citychip" data-idx="' + idx + '">'
        + '<span class="cc-dot" aria-hidden="true"></span>' + htmlEscape(c.name || c.city) + '</button>';
    }).join('');
    return '<div class="find-intro-banner"><span class="ib-dot">&#9670;</span> More than one city</div>'
      + '<div class="find-citypick">'
      + '<div class="find-citypick-h">Which part of <span class="find-citypick-zip">' + htmlEscape(zip) + '</span>?</div>'
      + '<div class="find-citypick-chips">' + chips + '</div>'
      + '</div>';
  }

  function scopeCardHTML(scope, label) {
    var kindWord = { local_area: 'County / Local area', market_area: 'Regional market', state: 'Statewide' }[scope] || 'Area';
    var lead = { local_area: 'Browse every PPO office across', market_area: 'Browse PPO offices across the', state: 'Browse PPO offices across' }[scope] || 'Browse PPO offices in';
    var tail = scope === 'market_area' ? ' market' : '';
    return '<div class="scope-card">'
      + '<span class="scope-kindtag">' + htmlEscape(kindWord) + '</span>'
      + '<div class="scope-h">' + htmlEscape(lead) + ' <em>' + htmlEscape(label) + tail + '</em>.</div>'
      + '<div class="scope-sub">Open the full list to filter by city, rating, and PPO fit.</div>'
      + '<ul class="scope-list">'
      + '<li>Platinum Elite offices are shown first where available.</li>'
      + '<li>Every listed PPO office in this area is included.</li>'
      + '</ul>'
      + '</div>';
  }

  /* ---- orchestration ---- */
  function previewPoint(label, lat, lng) {
    setCard(loadingCardHTML(label), '');
    return featuredDentistNear(lat, lng).then(function (dentist) {
      if (dentist) { setCard(foundCardHTML(dentist), 'is-found'); return; }
      return expansionSpotNear(lat, lng).then(function (spot) {
        if (spot) { setCard(expansionCardHTML(spot), 'is-open'); }
        else { setCard(openCardHTML(label), 'is-empty'); }
      });
    }).catch(function () { setCard(openCardHTML(label), 'is-empty'); });
  }

  function resolveZip(zip) {
    setBrowse('zip', zip, zip);
    setCard(loadingCardHTML(zip), '');
    return citiesForZip(zip).then(function (rows) {
      var cities = (rows || []).filter(function (c) { return c && c.lat != null && c.lng != null; });
      if (cities.length === 0) {
        return previewPoint(zip, null, null);
      }
      if (cities.length === 1) {
        var only = cities[0];
        setBrowse('city', only.name || only.city, only.name || only.city);
        return previewPoint(only.name || only.city, only.lat, only.lng);
      }
      setCard(cityPickCardHTML(zip, cities), 'is-citypick');
      var card = findCard();
      if (card) {
        card.querySelectorAll('.find-citychip').forEach(function (chip) {
          chip.addEventListener('click', function () {
            var c = cities[Number(chip.getAttribute('data-idx')) || 0];
            if (!c) return;
            card.querySelectorAll('.find-citychip').forEach(function (x) { x.classList.remove('is-active'); });
            chip.classList.add('is-active');
            setBrowse('city', c.name || c.city, c.name || c.city);
            previewPoint(c.name || c.city, c.lat, c.lng);
          });
        });
      }
    }).catch(function () { previewPoint(zip, null, null); });
  }

  function resolveSelection(sel) {
    var scope = sel.scope || 'city';
    var value = sel.value;
    var label = sel.label || value;
    if (scope === 'zip') { resolveZip(value); return; }
    if (scope === 'city') {
      setBrowse('city', value, label);
      if (sel.lat != null && sel.lng != null && sel.lat !== '' && sel.lng !== '') {
        previewPoint(label, sel.lat, sel.lng);
      } else {
        setCard(openCardHTML(label), 'is-empty');
      }
      return;
    }
    // local_area | market_area | state: feature the matching Platinum Elite, else show the apply CTA
    setBrowse(scope, value, label);
    setCard(loadingCardHTML(label), '');
    featuredDentistByScope(scope, value).then(function (dentist) {
      if (dentist) { setCard(foundCardHTML(dentist), 'is-found'); }
      else { setCard(openCardHTML(label), 'is-empty'); }
    }).catch(function () { setCard(openCardHTML(label), 'is-empty'); });
  }

  function runFreeText(term) {
    var clean = String(term || '').trim().replace(/\s+/g, ' ');
    if (!clean) return;
    if (/^\d{5}$/.test(clean)) { resolveZip(clean); return; }
    setCard(loadingCardHTML(clean), '');
    supabaseSuggest(clean).then(function (rows) {
      rows = rows || [];
      if (!rows.length) {
        setBrowse('city', clean, clean);
        setCard(openCardHTML(clean), 'is-empty');
        return;
      }
      var exact = null, i;
      for (i = 0; i < rows.length; i++) {
        if (String(rows[i].label || '').toLowerCase() === clean.toLowerCase()) { exact = rows[i]; break; }
      }
      var pick = exact || rows[0];
      resolveSelection({
        scope: pick.browse_scope || pick.kind,
        value: pick.browse_value || pick.value || pick.label,
        label: pick.label,
        lat: pick.lat, lng: pick.lng
      });
    }).catch(function () {
      setBrowse('city', clean, clean);
      setCard(openCardHTML(clean), 'is-empty');
    });
  }

  /* ---- autocomplete dropdown ---- */
  var suggestBox = document.getElementById('nav-suggest');
  var zipInput = document.getElementById('nav-zip');
  var zipButton = document.getElementById('nav-zip-btn');

  function nearestCity(lat, lng) {
    return supabaseRpc('nav_nearest_city', { in_lat: Number(lat), in_lng: Number(lng) })
      .then(function (rows) { return rows && rows[0] ? rows[0] : null; });
  }

  var locateBtn = document.getElementById('nav-locate');
  function pinCurrentLocation() {
    if (!navigator.geolocation) { if (zipInput) zipInput.focus(); return; }
    if (locateBtn) locateBtn.classList.add('locating');
    hideSuggest();
    setCard(loadingCardHTML('your area'), '');
    navigator.geolocation.getCurrentPosition(function (pos) {
      var lat = pos.coords.latitude, lng = pos.coords.longitude;
      nearestCity(lat, lng).then(function (c) {
        if (locateBtn) locateBtn.classList.remove('locating');
        var near = c && Number(c.distance_miles || 999) <= 45 ? (c.name || c.city) : null;
        if (near) {
          if (zipInput) zipInput.value = near;
          setBrowse('city', near, near);
          previewPoint(near, lat, lng);
        } else {
          if (zipInput) zipInput.value = '';
          if (c) setBrowse('city', c.name || c.city, c.name || c.city);
          previewPoint('your area', lat, lng);
        }
      }).catch(function () {
        if (locateBtn) locateBtn.classList.remove('locating');
        previewPoint('your area', lat, lng);
      });
    }, function () {
      if (locateBtn) locateBtn.classList.remove('locating');
      setCard(introCardHTML(), '');
      if (zipInput) zipInput.focus();
    }, { enableHighAccuracy: false, timeout: 9000, maximumAge: 300000 });
  }
  if (locateBtn) locateBtn.addEventListener('click', function (e) { e.preventDefault(); pinCurrentLocation(); });
  var suggestItems = [];
  var activeIndex = -1;
  var suggestTimer = null;
  var lastQuery = '';

  var KIND_GLYPH = { zip: '#', city: '\u2302', local_area: '\u25C6', market_area: '\u2756', state: '\u2605' };
  var KIND_TAG = { zip: 'ZIP', city: 'City', local_area: 'Area', market_area: 'Market', state: 'State' };

  function positionSuggest() {
    if (!suggestBox || !zipInput) return;
    suggestBox.style.left = zipInput.offsetLeft + 'px';
    suggestBox.style.top = (zipInput.offsetTop + zipInput.offsetHeight + 6) + 'px';
    suggestBox.style.width = zipInput.offsetWidth + 'px';
  }

  function hideSuggest() {
    if (!suggestBox) return;
    suggestBox.hidden = true;
    suggestBox.innerHTML = '';
    suggestItems = [];
    activeIndex = -1;
    if (zipInput) zipInput.setAttribute('aria-expanded', 'false');
  }

  function setActive(idx) {
    var nodes = suggestBox ? suggestBox.querySelectorAll('.cc-suggest-item') : [];
    if (!nodes.length) return;
    if (idx < 0) idx = nodes.length - 1;
    if (idx >= nodes.length) idx = 0;
    activeIndex = idx;
    nodes.forEach(function (n, i) {
      if (i === idx) { n.classList.add('is-active'); n.scrollIntoView({ block: 'nearest' }); }
      else { n.classList.remove('is-active'); }
    });
  }

  function renderSuggest(items, q) {
    if (!suggestBox) return;
    suggestItems = items || [];
    activeIndex = -1;
    if (!suggestItems.length) {
      suggestBox.innerHTML = '<div class="cc-suggest-empty">No matches. Try a ZIP, city, area, or state.</div>';
      suggestBox.hidden = false;
      positionSuggest();
      if (zipInput) zipInput.setAttribute('aria-expanded', 'true');
      return;
    }
    var html = suggestItems.map(function (it) {
      var kind = it.kind || it.browse_scope || 'city';
      var glyph = KIND_GLYPH[kind] || '\u25CF';
      var tag = KIND_TAG[kind] || '';
      var sub = it.sublabel ? '<span class="cc-suggest-sub">' + htmlEscape(it.sublabel) + '</span>' : '';
      return '<button type="button" class="cc-suggest-item sg-' + kind + '" role="option"'
        + ' data-scope="' + htmlEscape(it.browse_scope || kind) + '"'
        + ' data-value="' + htmlEscape(it.browse_value || it.value || it.label) + '"'
        + ' data-label="' + htmlEscape(it.label) + '"'
        + ' data-lat="' + (it.lat != null ? htmlEscape(it.lat) : '') + '"'
        + ' data-lng="' + (it.lng != null ? htmlEscape(it.lng) : '') + '">'
        + '<span class="cc-suggest-badge" aria-hidden="true">' + glyph + '</span>'
        + '<span class="cc-suggest-tx"><span class="cc-suggest-label">' + highlight(it.label, q) + '</span>' + sub + '</span>'
        + '<span class="cc-suggest-kind">' + tag + '</span>'
        + '<span class="cc-suggest-go" aria-hidden="true">&#8594;</span>'
        + '</button>';
    }).join('');
    suggestBox.innerHTML = html;
    suggestBox.hidden = false;
    positionSuggest();
    if (zipInput) zipInput.setAttribute('aria-expanded', 'true');
    suggestBox.querySelectorAll('.cc-suggest-item').forEach(function (node) {
      node.addEventListener('mousedown', function (e) { e.preventDefault(); });
      node.addEventListener('click', function () {
        var scope = node.getAttribute('data-scope');
        var value = node.getAttribute('data-value');
        var label = node.getAttribute('data-label');
        var lat = node.getAttribute('data-lat');
        var lng = node.getAttribute('data-lng');
        if (zipInput) zipInput.value = label;
        hideSuggest();
        resolveSelection({ scope: scope, value: value, label: label, lat: lat === '' ? null : lat, lng: lng === '' ? null : lng });
      });
    });
  }

  function requestSuggest(q) {
    var clean = String(q || '').trim();
    var hasDigit = /\d/.test(clean);
    if (!clean || (!hasDigit && clean.length < 2)) { hideSuggest(); return; }
    lastQuery = clean;
    supabaseSuggest(clean).then(function (rows) {
      if (clean !== lastQuery) return;
      renderSuggest(rows || [], clean);
    }).catch(function () { hideSuggest(); });
  }

  if (zipInput) {
    zipInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9a-zA-Z\s.'#,&-]/g, '').slice(0, 64);
      clearTimeout(closeTimer);
      clearTimeout(suggestTimer);
      var v = this.value;
      suggestTimer = setTimeout(function () { requestSuggest(v); }, 150);
    });
    zipInput.addEventListener('focus', function () {
      if (findLink) openMega(findLink);
      if (this.value.trim()) requestSuggest(this.value);
    });
    zipInput.addEventListener('keydown', function (event) {
      var open = suggestBox && !suggestBox.hidden && suggestItems.length;
      if (event.key === 'ArrowDown') { if (open) { event.preventDefault(); setActive(activeIndex + 1); } }
      else if (event.key === 'ArrowUp') { if (open) { event.preventDefault(); setActive(activeIndex - 1); } }
      else if (event.key === 'Enter') {
        event.preventDefault();
        if (open && activeIndex >= 0) {
          var nodes = suggestBox.querySelectorAll('.cc-suggest-item');
          if (nodes[activeIndex]) { nodes[activeIndex].click(); return; }
        }
        hideSuggest();
        runFreeText(this.value);
      } else if (event.key === 'Escape') {
        if (open) { hideSuggest(); } else { closeMega(); }
      }
    });
    zipInput.addEventListener('blur', function () {
      setTimeout(hideSuggest, 180);
    });
  }

  if (zipButton) {
    zipButton.addEventListener('click', function () {
      hideSuggest();
      if (zipInput) runFreeText(zipInput.value);
    });
  }

  if (suggestBox) {
    suggestBox.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
  }

  window.addEventListener('resize', function () { if (suggestBox && !suggestBox.hidden) positionSuggest(); });

  document.addEventListener('click', function (event) {
    if (!suggestBox || suggestBox.hidden) return;
    var inSearch = event.target.closest && event.target.closest('.zip-search-card');
    if (!inSearch) hideSuggest();
  });

  document.querySelectorAll('.zip-chip[data-query]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var value = chip.getAttribute('data-query') || chip.textContent.trim();
      if (zipInput) zipInput.value = value;
      hideSuggest();
      runFreeText(value);
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
      var cashPerCrown = 1600;
      var ppoFirstCrown = 850;   // first crown includes a one-time $50 deductible
      var ppoAddlCrown = 800;    // each additional crown
      var cash = cashPerCrown * count;
      var network = ppoFirstCrown + ppoAddlCrown * (count - 1);
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

  /* For Dentists: search the practice by name, then open a claim modal for the match. */
  var portalName = document.getElementById('portal-name');
  var portalNameBtn = document.getElementById('portal-name-btn');
  var portalSuggest = document.getElementById('portal-suggest');
  var pfItems = [];
  var pfTimer = null;
  var pfLastQ = '';
  var ccClaimEls = null;

  function pfTierLabel(t) {
    if (t === 'platinum_elite') return 'Platinum Elite';
    if (t === 'capy_accredited') return 'Capy Accredited';
    return 'Listed';
  }
  function pfHide() {
    if (portalSuggest) { portalSuggest.hidden = true; portalSuggest.innerHTML = ''; }
    if (portalName) portalName.setAttribute('aria-expanded', 'false');
  }
  function pfRender(items, q) {
    if (!portalSuggest) return;
    pfItems = items || [];
    if (!pfItems.length) {
      portalSuggest.innerHTML = '<div class="cc-suggest-empty">No match yet. '
        + '<a class="pf-add" href="/claim-dentist-listing-profile.html">Add your practice &#8594;</a></div>';
      portalSuggest.hidden = false;
      if (portalName) portalName.setAttribute('aria-expanded', 'true');
      return;
    }
    portalSuggest.innerHTML = pfItems.map(function (it, i) {
      var loc = [it.city, it.state].filter(Boolean).join(', ');
      return '<button type="button" class="cc-suggest-item pf-item" role="option" data-i="' + i + '">'
        + '<span class="cc-suggest-badge" aria-hidden="true">&#9670;</span>'
        + '<span class="cc-suggest-tx"><span class="cc-suggest-label">' + highlight(it.practice_name, q) + '</span>'
        + (loc ? '<span class="cc-suggest-sub">' + htmlEscape(loc) + '</span>' : '') + '</span>'
        + '<span class="cc-suggest-kind pf-kind-' + htmlEscape(it.membership_tier || 'listed') + '">' + htmlEscape(pfTierLabel(it.membership_tier)) + '</span>'
        + '</button>';
    }).join('');
    portalSuggest.hidden = false;
    if (portalName) portalName.setAttribute('aria-expanded', 'true');
    portalSuggest.querySelectorAll('.pf-item').forEach(function (node) {
      node.addEventListener('mousedown', function (e) { e.preventDefault(); });
      node.addEventListener('click', function () {
        var it = pfItems[Number(node.getAttribute('data-i'))];
        pfHide();
        if (it) openClaimModal(it);
      });
    });
  }
  function pfRequest(q) {
    var clean = String(q || '').trim();
    if (clean.length < 2) { pfHide(); return; }
    pfLastQ = clean;
    supabaseRpc('nav_practice_search', { in_q: clean, max_n: 8 }).then(function (rows) {
      if (clean !== pfLastQ) return;
      pfRender(rows || [], clean);
    }).catch(function () { pfHide(); });
  }
  function claimRatingChips(it) {
    return sourceRatingHTML(it);
  }
  function buildClaimModal() {
    if (ccClaimEls) return ccClaimEls;
    var wrap = document.createElement('div');
    wrap.className = 'cc-claim';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="cc-claim-backdrop" data-claim-close></div>'
      + '<div class="cc-claim-card" role="dialog" aria-modal="true" aria-labelledby="cc-claim-h">'
      + '<button type="button" class="cc-claim-x" data-claim-close aria-label="Close">\u00d7</button>'
      + '<div class="cc-claim-eye">Found your practice</div>'
      + '<div class="cc-claim-h" id="cc-claim-h"></div>'
      + '<div class="cc-claim-loc" id="cc-claim-loc"></div>'
      + '<div class="cc-claim-rate" id="cc-claim-rate"></div>'
      + '<p class="cc-claim-p">Claim this listing to manage your page and reach PPO patients who already know what they want. '
      + 'We confirm you\u2019re with the practice before it\u2019s yours.</p>'
      + '<div class="cc-claim-actions">'
      + '<a class="cc-claim-view" id="cc-claim-view" href="#" target="_blank" rel="noopener">View profile</a>'
      + '<a class="cc-claim-go" id="cc-claim-go" href="#">Claim this profile</a>'
      + '</div></div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) { if (e.target.closest('[data-claim-close]')) hideClaim(); });
    ccClaimEls = wrap;
    return wrap;
  }
  function openClaimModal(it) {
    var wrap = buildClaimModal();
    wrap.querySelector('#cc-claim-h').textContent = it.practice_name || 'Your practice';
    var loc = [it.city, it.state].filter(Boolean).join(', ');
    var locEl = wrap.querySelector('#cc-claim-loc');
    locEl.textContent = loc; locEl.style.display = loc ? '' : 'none';
    var rEl = wrap.querySelector('#cc-claim-rate');
    rEl.innerHTML = claimRatingChips(it); rEl.style.display = rEl.innerHTML ? '' : 'none';
    var profile = it.profile_url || '/ppodentists.html';
    var claim = '/claim-dentist-listing-profile.html' + (it.slug ? '?practice=' + encodeURIComponent(it.slug) : '');
    wrap.querySelector('#cc-claim-view').setAttribute('href', profile);
    wrap.querySelector('#cc-claim-go').setAttribute('href', claim);
    wrap.classList.add('is-open');
    wrap.setAttribute('aria-hidden', 'false');
  }
  function hideClaim() {
    if (!ccClaimEls) return;
    ccClaimEls.classList.remove('is-open');
    ccClaimEls.setAttribute('aria-hidden', 'true');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ccClaimEls && ccClaimEls.classList.contains('is-open')) hideClaim();
  });
  if (portalName) {
    portalName.addEventListener('input', function () {
      var v = this.value;
      clearTimeout(pfTimer);
      pfTimer = setTimeout(function () { pfRequest(v); }, 160);
    });
    portalName.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); if (pfItems.length) { pfHide(); openClaimModal(pfItems[0]); } else pfRequest(this.value); }
      else if (e.key === 'Escape') pfHide();
    });
    portalName.addEventListener('blur', function () { setTimeout(pfHide, 180); });
  }
  if (portalNameBtn) portalNameBtn.addEventListener('click', function () {
    if (pfItems.length) { pfHide(); openClaimModal(pfItems[0]); }
    else pfRequest(portalName ? portalName.value : '');
  });

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




/* CoverCapy Rewards quest: tappable steps, filling meter, refer-gated unlock, confetti */
(function () {
  var rew = document.querySelector('.cc-link[data-link="rewards"]');
  if (!rew) return;
  var panel = rew.querySelector('.cc-mega.dd-rew');
  if (!panel) return;

  var steps = Array.prototype.slice.call(panel.querySelectorAll('.rw-step'));
  var trackNum = document.getElementById('rw-track-num');
  var trackFill = document.getElementById('rw-track-fill');
  var referCta = document.getElementById('rw-refer-cta');
  var referBtn = document.getElementById('rw-refer-btn');
  var cele = document.getElementById('rw-cele');
  var celeX = document.getElementById('rw-cele-x');
  var celeCount = document.getElementById('rw-cele-count');
  var featBal = panel.querySelector('.rw-feat-bal');
  var featMeter = panel.querySelector('.rw-feat-meter i');
  var featLeft = panel.querySelector('.rw-feat-left');

  var BASE = 300, GOAL = 2000, PTS = { 2: 500, 3: 500, 4: 700 };
  var total = BASE, done = {}, armed = false;
  var STORE_KEY = 'cc_rw_quest_v1';
  function readSaved() { try { var s = window.localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
  function writeSaved() { try { var a = []; for (var s = 2; s <= 4; s++) { if (done[s]) a.push(s); } window.localStorage.setItem(STORE_KEY, JSON.stringify({ steps: a, celebrated: !!done[4] })); } catch (e) {} }
  function clearSaved() { try { window.localStorage.removeItem(STORE_KEY); } catch (e) {} }

  function reduceMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function fmt(n) { return n.toLocaleString('en-US'); }
  function pct(n) { return Math.min(100, Math.round(n / GOAL * 100)); }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

  function paintMeter() {
    if (trackNum) trackNum.textContent = fmt(total);
    if (trackFill) trackFill.style.width = pct(total) + '%';
    if (featBal) featBal.innerHTML = 'Balance <strong>' + fmt(total) + ' \u265A</strong> of 2,000';
    if (featMeter) featMeter.style.width = pct(total) + '%';
    if (featLeft) { var rem = GOAL - total; featLeft.textContent = rem > 0 ? (fmt(rem) + ' \u265A to your free whitening') : 'Free whitening ready to claim'; }
  }

  function nextStep() { for (var s = 2; s <= 4; s++) { if (!done[s]) return s; } return null; }

  function paintNext() {
    var n = nextStep();
    steps.forEach(function (el) {
      el.classList.remove('is-next');
      var s = +el.getAttribute('data-step');
      if (s >= 2 && !done[s] && s === n && !(s === 4 && armed)) el.classList.add('is-next');
    });
  }

  function elForStep(s) { for (var i = 0; i < steps.length; i++) { if (+steps[i].getAttribute('data-step') === s) return steps[i]; } return null; }

  function completeStep(s) {
    if (done[s]) return;
    done[s] = true;
    var el = elForStep(s);
    if (el) { el.classList.add('done'); var num = el.querySelector('.rw-step-num'); if (num) num.textContent = '\u2713'; }
    total += (PTS[s] || 0);
    paintMeter();
    paintNext();
    writeSaved();
  }

  function activate(el) {
    var s = +el.getAttribute('data-step');
    if (s < 2 || done[s]) return;
    if (s !== nextStep()) return;
    if (s === 4) {
      armed = true;
      paintNext();
      if (referCta) { referCta.hidden = false; referCta.classList.add('show'); }
      if (referBtn) { try { referBtn.focus(); } catch (e) {} }
      return;
    }
    completeStep(s);
  }

  steps.forEach(function (el) {
    el.addEventListener('click', function () { activate(el); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); activate(el); } });
  });

  function countUp(node, from, to, dur) {
    if (!node) return;
    if (reduceMotion()) { node.textContent = fmt(to); return; }
    var t0 = null;
    function tick(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / dur); node.textContent = fmt(Math.round(from + (to - from) * easeOut(p))); if (p < 1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  function showCele(animateCount) {
    fireConfetti();
    if (cele) { cele.hidden = false; cele.classList.add('show'); cele.setAttribute('aria-hidden', 'false'); }
    if (animateCount) countUp(celeCount, 1300, GOAL, 1100); else if (celeCount) celeCount.textContent = '2,000';
  }
  function hideCele() {
    if (cele) { cele.classList.remove('show'); cele.hidden = true; cele.setAttribute('aria-hidden', 'true'); }
    stopConfetti();
  }
  function unlock() {
    if (done[4]) return;
    completeStep(4);
    if (referCta) { referCta.classList.remove('show'); referCta.hidden = true; }
    showCele(true);
  }
  if (referBtn) referBtn.addEventListener('click', unlock);
  if (celeX) celeX.addEventListener('click', hideCele);

  /* featured-card "Refer a friend" mirrors the quest unlock once steps are complete */
  var featRefer = panel.querySelector('.reward-feature-card .featured-btn.secondary');
  if (featRefer) featRefer.addEventListener('click', function (e) {
    if (done[2] && done[3] && !done[4]) { e.preventDefault(); unlock(); }
    else if (done[4]) { e.preventDefault(); showCele(false); }
  });

  /* ---- share sheet ---- */
  var shareLink = 'https://covercapy.com/r/CAPY300';
  var shareMsg = 'I just unlocked free teeth whitening on CoverCapy. Book a PPO dentist and we both score Crowns: ';
  var copyBtn = document.getElementById('rw-share-copy');
  var linkInput = document.getElementById('rw-share-link');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(shareLink); }
      else if (linkInput) { linkInput.removeAttribute('readonly'); linkInput.select(); document.execCommand('copy'); linkInput.setAttribute('readonly', ''); }
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1600);
    } catch (e) {}
  });
  Array.prototype.slice.call(panel.querySelectorAll('.rw-share-app')).forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-share'), url = '', msg = encodeURIComponent(shareMsg + shareLink);
      if (navigator.share && (k === 'sms' || k === 'whatsapp' || k === 'instagram')) { try { navigator.share({ title: 'CoverCapy', text: shareMsg, url: shareLink }); return; } catch (e) {} }
      if (k === 'sms') url = 'sms:&body=' + msg;
      else if (k === 'whatsapp') url = 'https://wa.me/?text=' + msg;
      else if (k === 'instagram') { try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareLink); } catch (e) {} url = 'https://www.instagram.com/'; }
      else if (k === 'email') url = 'mailto:?subject=' + encodeURIComponent('Free whitening on CoverCapy') + '&body=' + msg;
      if (url) window.open(url, '_blank', 'noopener');
    });
  });

  /* ---- confetti ---- */
  var cvs = null, ctx = null, parts = [], raf = null, endAt = 0;
  function ensureCanvas() {
    if (cvs) return;
    cvs = document.createElement('canvas'); cvs.className = 'rw-confetti';
    document.body.appendChild(cvs); ctx = cvs.getContext('2d');
    sizeCanvas(); window.addEventListener('resize', sizeCanvas);
  }
  function sizeCanvas() { if (!cvs) return; cvs.width = window.innerWidth; cvs.height = window.innerHeight; }
  function fireConfetti() {
    if (reduceMotion()) return;
    ensureCanvas(); cvs.style.display = 'block';
    var colors = ['#5BE0A0', '#B8924F', '#8B6FB8', '#1B5E5A', '#F2C14E', '#E0853B', '#7BD8B6'];
    parts = [];
    for (var i = 0; i < 160; i++) parts.push({
      x: window.innerWidth * (0.2 + 0.6 * Math.random()),
      y: window.innerHeight * 0.32 + (Math.random() * 40 - 20),
      vx: (Math.random() - 0.5) * 9, vy: -(6 + Math.random() * 9),
      g: 0.22 + Math.random() * 0.12, s: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      c: colors[(Math.random() * colors.length) | 0], shape: Math.random() < 0.5 ? 'r' : 'c'
    });
    endAt = performance.now() + 2600;
    if (!raf) raf = requestAnimationFrame(drawConfetti);
  }
  function drawConfetti(ts) {
    if (!ctx) { raf = null; return; }
    var now = ts || performance.now(), alive = false;
    var fade = Math.max(0, Math.min(1, (endAt - now) / 700));
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    parts.forEach(function (p) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr;
      if (p.y < cvs.height + 30) alive = true;
      ctx.save(); ctx.globalAlpha = (now > endAt - 700 ? fade : 1); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.shape === 'r') ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); else { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 7); ctx.fill(); }
      ctx.restore();
    });
    if (alive && now < endAt) raf = requestAnimationFrame(drawConfetti); else { raf = null; stopConfetti(); }
  }
  function stopConfetti() { if (raf) { cancelAnimationFrame(raf); raf = null; } if (ctx && cvs) { ctx.clearRect(0, 0, cvs.width, cvs.height); cvs.style.display = 'none'; } }

  /* ---- persistence: progress survives the dropdown opening and closing; ---- */
  /* ---- a page refresh only wipes it once the celebration has been reached ---- */
  function markDone(s) {
    if (s < 2 || s > 4 || done[s]) return;
    done[s] = true;
    var el = elForStep(s);
    if (el) { el.classList.add('done'); var num = el.querySelector('.rw-step-num'); if (num) num.textContent = '\u2713'; }
    total += (PTS[s] || 0);
  }

  (function init() {
    var saved = readSaved();
    if (saved && saved.celebrated) {
      clearSaved();
    } else if (saved && saved.steps && saved.steps.length) {
      saved.steps.forEach(markDone);
    }
    paintMeter();
    paintNext();
  }());
}());
