/* ==========================================================================
   CoverCapy — Sitewide Footer Script
   Mobile column accordion ONLY. Layout is fully CSS-driven, so the footer
   works with JavaScript disabled (all links remain visible & navigable).
   Load with `defer`.
   ========================================================================== */
(function () {
  var footer = document.querySelector('.cc-footer');
  if (!footer) return;

  var mq = window.matchMedia('(max-width: 760px)');
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

  /* Reset state when crossing the mobile/desktop breakpoint */
  if (mq.addEventListener)      mq.addEventListener('change', closeAll);
  else if (mq.addListener)      mq.addListener(closeAll);

  closeAll();
})();
