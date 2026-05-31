/* ==========================================================================
   CoverCapy Hero Slider Loader Example
   --------------------------------------------------------------------------
   Only use this if your existing project does NOT already load hero-slider.html.
   If you already have a loader, do not duplicate it.

   This loads /components/hero-slider.html into:
   <div id="cc-hero-mount"></div>
   ========================================================================== */

(function () {
  'use strict';

  var mount = document.getElementById('cc-hero-mount');
  if (!mount) return;

  fetch('/components/hero-slider.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      mount.innerHTML = html;

      if (window.location.hash === '#page-start') {
        setTimeout(function () {
          var target = document.getElementById('page-start');
          if (target) {
            target.scrollIntoView({
              behavior: 'auto',
              block: 'start'
            });
          }
        }, 150);
      }
    })
    .catch(function (err) {
      console.error('CoverCapy hero slider failed to load:', err);
    });
})();
