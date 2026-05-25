/* ────────────────────────────────────────────────────────────────
   CoverCapy · load-nav.js
   Fetches the mega-nav and hero-slider HTML partials from
   /components/ and injects them into their placeholders in
   index.html. Runs after this script tag is parsed.
   ──────────────────────────────────────────────────────────────── */

(function () {
  // Map of placeholder id  →  partial path
  const partials = [
    { id: 'mega-nav-placeholder',    src: 'components/mega-nav.html'   },
    { id: 'hero-slider-placeholder', src: 'components/hero-slider.html' }
  ];

  partials.forEach(({ id, src }) => {
    const mount = document.getElementById(id);
    if (!mount) {
      console.warn(`[load-nav] No element with id="${id}" found.`);
      return;
    }

    fetch(src, { cache: 'no-cache' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status} fetching ${src}`);
        return r.text();
      })
      .then(html => {
        // Strip any leading comment header so only the real markup is injected.
        const navStart  = html.indexOf('<nav');
        const sectStart = html.indexOf('<section');
        const divStart  = html.indexOf('<div');
        const candidates = [navStart, sectStart, divStart].filter(i => i >= 0);
        const start = candidates.length ? Math.min(...candidates) : 0;

        mount.innerHTML = start > 0 ? html.slice(start) : html;

        // Let other scripts know this partial is in the DOM
        mount.dispatchEvent(new CustomEvent('partial:loaded', { bubbles: true }));
      })
      .catch(err => {
        console.error('[load-nav]', err.message);
        mount.innerHTML =
          `<!-- load-nav.js failed to load ${src}: ${err.message} -->`;
      });
  });
})();
