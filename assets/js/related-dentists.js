/**
 * CoverCapy Related Dentists Renderer
 * Generates related dentist blocks for hub and profile pages.
 * Requires: seo-dentist-graph.js loaded first (CC namespace).
 * Version: 1.0
 */
(function() {
  "use strict";

  const CC = window.CC;

  /* ─── CARD HTML ─── */
  function renderCard(d, dist) {
    const url    = CC.dentistUrl(d);
    const rating = d.google_rating ? `★ ${d.google_rating} (${d.google_reviews || "?"} reviews)` : "Rating pending";
    const sat    = d.has_saturday ? " · Sat available" : "";
    const distTxt = dist != null ? ` · ${dist.toFixed(1)} mi` : "";
    return `
<a class="related-card rv" href="${url}">
  <span class="rc-name">${d.practice_name}</span>
  <span class="rc-city">${d.city}, CA${distTxt}${sat}</span>
  <span class="rc-rating">${rating}</span>
</a>`;
  }

  /* ─── BLOCK RENDERER ─── */
  function renderBlock(title, dentists, opts = {}) {
    if (!dentists.length) return "";
    const cards = dentists.slice(0, opts.max || 6).map(d => renderCard(d, d._dist)).join("");
    return `
<div class="related-block rv">
  <h3>${title}</h3>
  <div class="related-cards">${cards}</div>
</div>`;
  }

  /* ─── MAIN: POPULATE CONTAINERS ─── */
  CC.renderRelatedBlocks = function(config) {
    /*
      config: {
        city?: string,
        lat?: number,
        lng?: number,
        carrier?: string,
        specialty?: string[],
        language?: string,
        excludeSlug?: string,
        containerId: string
      }
    */
    const el = document.getElementById(config.containerId);
    if (!el) return;

    const exclude = config.excludeSlug;
    const filter  = d => d.slug !== exclude;

    let html = "";

    // 1. Same city
    if (config.city) {
      const cityDentists = CC.getDentistsByCity(config.city).filter(filter);
      html += renderBlock(`PPO Dentists in ${config.city}`, cityDentists, { max: 6 });
    }

    // 2. Nearby (within 10 miles)
    if (config.lat && config.lng) {
      const nearby = CC.getNearby(config.lat, config.lng, 10).filter(filter);
      html += renderBlock("Nearby PPO Dental Offices", nearby, { max: 6 });
    }

    // 3. Same carrier
    if (config.carrier) {
      const carrierDentists = CC.getDentistsByCarrier(config.carrier).filter(filter);
      html += renderBlock(`Other ${config.carrier} PPO Dentists Nearby`, carrierDentists, { max: 4 });
    }

    // 4. Same specialty
    if (config.specialty && config.specialty.length) {
      config.specialty.forEach(sp => {
        const spDentists = CC.getDentistsBySpecialty(sp).filter(filter);
        const label = sp.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
        html += renderBlock(`More ${label} Dentists in Orange County`, spDentists, { max: 4 });
      });
    }

    // 5. Same language
    if (config.language) {
      const langDentists = CC.getDentistsByLanguage(config.language).filter(filter);
      html += renderBlock(`${config.language}-Speaking Dentists Nearby`, langDentists, { max: 4 });
    }

    el.innerHTML = html;

    // Trigger reveal on newly injected cards
    if (window.CC && window.CC.observeReveal) {
      el.querySelectorAll(".rv").forEach(CC.observeReveal);
    }
  };

})();
