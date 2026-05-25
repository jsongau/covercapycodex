/* ════════════════════════════════════════════════════════════════
   CoverCapy MEGA NAV — dynamic loader
   Fetches /mega-nav.html, injects it into #mega-nav-placeholder,
   then calls window.initMegaNav() once it's available.

   Designed to work on:
     • Vercel / Netlify / GitHub Pages (static hosting)
     • Local file:// (with a small caveat — fetch on file:// fails
       in most browsers, so use a dev server like `npx serve`)
   ════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  // Skip if already loaded (e.g. defensive double-include).
  if(window.__megaNavLoaderRan) return;
  window.__megaNavLoaderRan = true;

  function ready(fn){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function whenInitAvailable(callback, attempts){
    // Polls briefly for window.initMegaNav, in case mega-nav.js hasn't
    // finished parsing yet (both scripts use `defer` so under normal
    // conditions it's already there — this is just belt-and-suspenders).
    attempts = attempts || 0;
    if(typeof window.initMegaNav === 'function'){
      callback();
    } else if(attempts < 50){
      setTimeout(function(){ whenInitAvailable(callback, attempts + 1); }, 40);
    } else {
      console.error('[megaNav] window.initMegaNav never appeared — is /assets/js/mega-nav.js loaded?');
    }
  }

  function inject(html){
    var placeholder = document.getElementById('mega-nav-placeholder');
    if(!placeholder){
      console.warn('[megaNav] no #mega-nav-placeholder element on this page; skipping.');
      return;
    }
    // Replace placeholder contents with the fetched nav markup.
    placeholder.innerHTML = html;

    whenInitAvailable(function(){
      try {
        window.initMegaNav();
      } catch(err){
        console.error('[megaNav] initMegaNav threw:', err);
      }
    });
  }

  function load(){
    // Relative path so it works equally on `/` and on `/subpath/` deployments.
    fetch('mega-nav.html', { credentials: 'same-origin' })
      .then(function(res){
        if(!res.ok) throw new Error('HTTP ' + res.status + ' fetching mega-nav.html');
        return res.text();
      })
      .then(inject)
      .catch(function(err){
        console.error('[megaNav] failed to load mega-nav.html:', err);
        // Friendly fallback so the page isn't headless.
        var placeholder = document.getElementById('mega-nav-placeholder');
        if(placeholder){
          placeholder.innerHTML =
            '<div style="padding:14px 28px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:13px;color:#7E9298;background:#FAF8F4;border-bottom:1px solid rgba(18,63,82,.10)">' +
              'CoverCapy navigation could not load. Refresh the page or check the network tab.' +
            '</div>';
        }
      });
  }

  ready(load);
})();
