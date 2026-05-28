/* CoverCapy — Sitewide Footer Script  (mobile column accordion) */

/* CoverCapy footer — mobile accordion only. Progressive: works without JS. */
  (function () {
    var footer = document.querySelector('.cc-footer');
    if (!footer) return;

    var mq = window.matchMedia('(max-width: 760px)');
    var toggles = footer.querySelectorAll('.cc-footer-col-toggle');

    function reset() {
      toggles.forEach(function (btn) {
        var list = document.getElementById(btn.getAttribute('aria-controls'));
        if (!list) return;
        btn.setAttribute('aria-expanded', 'false');
        list.classList.remove('cc-footer-open');
      });
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!mq.matches) return; /* desktop heading is non-interactive */
        var list = document.getElementById(btn.getAttribute('aria-controls'));
        if (!list) return;
        var open = list.classList.toggle('cc-footer-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    if (mq.addEventListener)      mq.addEventListener('change', reset);
    else if (mq.addListener)      mq.addListener(reset);
    reset();
  })();
