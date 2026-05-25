(function () {
  function initMegaNav() {
    const nav = document.querySelector('.cc-nav');
    if (!nav) return;

    const links = Array.from(document.querySelectorAll('.cc-link'));
    const dropdowns = Array.from(document.querySelectorAll('.cc-dropdown'));

    let closeTimer = null;

    function closeAll() {
      links.forEach(link => link.classList.remove('is-open'));
    }

    function openLink(link) {
      clearTimeout(closeTimer);
      links.forEach(item => {
        if (item !== link) item.classList.remove('is-open');
      });
      link.classList.add('is-open');
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        closeAll();
      }, 180);
    }

    links.forEach(link => {
      const dropdown = link.querySelector('.cc-dropdown');

      link.addEventListener('mouseenter', () => {
        openLink(link);
      });

      link.addEventListener('mouseleave', () => {
        scheduleClose();
      });

      link.addEventListener('focusin', () => {
        openLink(link);
      });

      link.addEventListener('click', event => {
        const clickedInsideDropdown = event.target.closest('.cc-dropdown');

        if (clickedInsideDropdown) {
          return;
        }

        event.preventDefault();

        const alreadyOpen = link.classList.contains('is-open');
        closeAll();

        if (!alreadyOpen) {
          openLink(link);
        }
      });

      if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
          clearTimeout(closeTimer);
          openLink(link);
        });

        dropdown.addEventListener('mouseleave', () => {
          scheduleClose();
        });

        dropdown.addEventListener('click', event => {
          event.stopPropagation();
        });
      }
    });

    document.addEventListener('click', event => {
      if (!event.target.closest('.cc-nav')) {
        closeAll();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeAll();
      }
    });

    // Find Dentist region tabs
    const regions = Array.from(document.querySelectorAll('[data-region]'));
    const panels = Array.from(document.querySelectorAll('[data-region-panel]'));

    regions.forEach(region => {
      region.addEventListener('click', event => {
        event.preventDefault();

        const target = region.getAttribute('data-region');

        regions.forEach(item => item.classList.remove('is-active'));
        region.classList.add('is-active');

        panels.forEach(panel => {
          const match = panel.getAttribute('data-region-panel') === target;
          panel.style.display = match ? '' : 'none';
          panel.classList.toggle('is-active', match);
        });
      });
    });

    // Location / area active states
    const activeGroups = [
      '.find-location',
      '.find-area',
      '.find-city',
      '.find-closest'
    ];

    activeGroups.forEach(selector => {
      const items = Array.from(document.querySelectorAll(selector));

      items.forEach(item => {
        item.addEventListener('click', event => {
          const href = item.getAttribute('href');

          if (!href || href === '#') {
            event.preventDefault();
          }

          items.forEach(i => i.classList.remove('is-active'));
          item.classList.add('is-active');
        });
      });
    });

    // Mobile menu support, only if your HTML has these classes
    const mobileToggle = document.querySelector('.cc-mobile-toggle');
    const mobileMenu = document.querySelector('.cc-mobile-menu');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
        mobileToggle.classList.toggle('is-open');
      });
    }

    console.log('CoverCapy mega nav initialized');
  }

  window.initMegaNav = initMegaNav;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMegaNav);
  } else {
    initMegaNav();
  }
})();
