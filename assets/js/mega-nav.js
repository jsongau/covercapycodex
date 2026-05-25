(function () {
  function closeAll() {
    document.querySelectorAll('.cc-link').forEach(el => el.classList.remove('is-open'));
    document.querySelectorAll('.cc-dropdown').forEach(el => el.classList.remove('is-open'));
  }

  function initMegaNav() {
    document.querySelectorAll('.cc-link').forEach(link => {
      const dropdown = link.querySelector('.cc-dropdown') || link.nextElementSibling;

      link.addEventListener('mouseenter', () => {
        closeAll();
        link.classList.add('is-open');
        if (dropdown) dropdown.classList.add('is-open');
      });

      link.addEventListener('click', e => {
        e.preventDefault();
        const open = link.classList.contains('is-open');
        closeAll();
        if (!open) {
          link.classList.add('is-open');
          if (dropdown) dropdown.classList.add('is-open');
        }
      });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.cc-nav')) closeAll();
    });
  }

  window.initMegaNav = initMegaNav;
  initMegaNav();
})();
