/* ==========================================================================
   CoverCapy — Sitewide Footer Script
   (1) Mobile column accordion (<= 900px). Layout is fully CSS-driven, so the
       footer works with JS disabled: every link stays in the DOM (crawlable)
       and, with JS off, columns simply render expanded.
   (2) Optional: fade out a fixed side-scroll rail while the footer is in view
       so it never overlaps the CTA cards. Opt in by giving the rail the class
       `cc-side-rail` (or set CC_SIDE_RAIL_SELECTOR before this script loads).
   Load with `defer`.
   ========================================================================== */
(function () {
  var footer = document.querySelector('.cc-footer');
  if (!footer) return;

  /* ---------- (1) Mobile accordion ---------- */
  var mq = window.matchMedia('(max-width: 900px)');
  var toggles = footer.querySelectorAll('.cc-footer-col-toggle');

  function closeAll() {
    toggles.forEach(function (btn) {
      var list = document.getElementById(btn.getAttribute('aria-controls'));
      if (!list) return;
      btn.setAttribute('aria-expanded', 'false');
      list.classList.remove('cc-footer-open');
    });
  }

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!mq.matches) return; /* desktop headings are non-interactive */
      var list = document.getElementById(btn.getAttribute('aria-controls'));
      if (!list) return;
      var open = list.classList.toggle('cc-footer-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  if (mq.addEventListener)      mq.addEventListener('change', closeAll);
  else if (mq.addListener)      mq.addListener(closeAll);
  closeAll();

  /* ---------- (2) Optional side-rail hide ---------- */
  /* Set window.CC_SIDE_RAIL_SELECTOR = '.your-rail'; before this file to target
     an existing rail. Defaults to '.cc-side-rail'. No-op if none is found or
     IntersectionObserver is unsupported. */
  var railSelector = window.CC_SIDE_RAIL_SELECTOR || '.cc-side-rail';
  var rail = document.querySelector(railSelector);
  if (rail && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        rail.classList.toggle('cc-side-rail-hidden', entry.isIntersecting);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    io.observe(footer);
  }
})();

