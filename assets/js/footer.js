/* CoverCapy — Sitewide Footer Script
   Footer layout fix + mobile column accordion. Safe to load on every page. */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function injectFullBleedFooterFix() {
    if (document.getElementById('cc-footer-fullbleed-fix')) return;

    var style = document.createElement('style');
    style.id = 'cc-footer-fullbleed-fix';
    style.textContent = `
      .cc-footer {
        width: 100vw !important;
        max-width: 100vw !important;
        margin-left: calc(50% - 50vw) !important;
        margin-right: calc(50% - 50vw) !important;
        padding: clamp(42px, 5vw, 72px) 0 0 !important;
        background:
          radial-gradient(circle at 12% 0%, rgba(61, 161, 161, 0.10), transparent 34%),
          radial-gradient(circle at 88% 8%, rgba(212, 154, 94, 0.12), transparent 36%),
          linear-gradient(180deg, #F8F3E8 0%, #F4F1E8 42%, #ECE6D6 100%) !important;
      }

      .cc-footer-shell {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        border-radius: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
        box-shadow: none !important;
        background: transparent !important;
        overflow: visible !important;
      }

      .cc-footer-cta,
      .cc-footer-main {
        width: min(1240px, calc(100% - 56px)) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .cc-footer-discovery {
        width: min(1240px, calc(100% - 56px)) !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-bottom: clamp(18px, 3vw, 30px) !important;
      }

      .cc-footer-legal {
        width: 100% !important;
        border-radius: 0 !important;
        padding-left: clamp(28px, 4vw, 56px) !important;
        padding-right: clamp(28px, 4vw, 56px) !important;
      }

      .cc-footer-legal-top,
      .cc-footer-trustline,
      .cc-footer-disclaimer {
        width: min(1240px, 100%) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .cc-footer-trustline {
        margin-bottom: 8px !important;
      }

      @media (max-width: 760px) {
        .cc-footer {
          padding: 32px 0 0 !important;
        }

        .cc-footer-shell {
          border-radius: 0 !important;
        }

        .cc-footer-cta,
        .cc-footer-main,
        .cc-footer-discovery {
          width: calc(100% - 24px) !important;
        }

        .cc-footer-legal {
          padding-left: 18px !important;
          padding-right: 18px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initFooterAccordion() {
    injectFullBleedFooterFix();

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
      if (btn.getAttribute('data-cc-footer-bound') === 'true') return;
      btn.setAttribute('data-cc-footer-bound', 'true');

      btn.addEventListener('click', function () {
        if (!mq.matches) return;
        var list = document.getElementById(btn.getAttribute('aria-controls'));
        if (!list) return;
        var open = list.classList.toggle('cc-footer-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    if (!footer.getAttribute('data-cc-footer-media-bound')) {
      footer.setAttribute('data-cc-footer-media-bound', 'true');
      if (mq.addEventListener) mq.addEventListener('change', reset);
      else if (mq.addListener) mq.addListener(reset);
    }

    reset();
  }

  onReady(initFooterAccordion);
})();
