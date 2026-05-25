function initMegaNav() {
  const navLinks = document.querySelectorAll('.cc-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      navLinks.forEach(item => item.classList.remove('is-open'));
      link.classList.add('is-open');
    });

    link.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!link.matches(':hover')) {
          link.classList.remove('is-open');
        }
      }, 120);
    });

    link.addEventListener('click', e => {
      e.preventDefault();

      const alreadyOpen = link.classList.contains('is-open');

      navLinks.forEach(item => item.classList.remove('is-open'));

      if (!alreadyOpen) {
        link.classList.add('is-open');
      }
    });
  });

  console.log('Mega nav dropdowns ready');
}

window.initMegaNav = initMegaNav;
