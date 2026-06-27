/* ==========================================================================
   CoverCapy #page-start landing fix
   --------------------------------------------------------------------------
   Use this when hero-slider.html is injected after page load.

   Why:
   A URL like /dental-treatment-cost-estimator.html#page-start can load before
   the shared hero HTML is injected. This script waits until the real
   <div id="page-start"> exists, then scrolls to it.

   Install:
   Paste this at the bottom of the shared JS file that loads on every page,
   usually /assets/js/load-nav.js or /assets/js/footer.js.

   Do not use #cc-land-content anymore.
   ========================================================================== */

(function () {
  'use strict';

  function shouldLand() {
    return window.location.hash === '#page-start';
  }

  function landNow() {
    if (!shouldLand()) return false;

    var target = document.getElementById('page-start');
    if (!target) return false;

    target.scrollIntoView({
      behavior: 'auto',
      block: 'start'
    });

    return true;
  }

  function scheduleLanding() {
    if (!shouldLand()) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    var tries = 0;
    var maxTries = 40;

    var timer = setInterval(function () {
      tries += 1;

      if (landNow() || tries >= maxTries) {
        clearInterval(timer);
      }
    }, 100);

    setTimeout(landNow, 500);
    setTimeout(landNow, 1000);
    setTimeout(landNow, 1600);
    setTimeout(landNow, 2400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleLanding);
  } else {
    scheduleLanding();
  }

  window.addEventListener('load', scheduleLanding);
  window.addEventListener('hashchange', scheduleLanding);

  if ('MutationObserver' in window) {
    var observer = new MutationObserver(function () {
      if (shouldLand()) {
        landNow();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    setTimeout(function () {
      observer.disconnect();
    }, 5000);
  }
})();
