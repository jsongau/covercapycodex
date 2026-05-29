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

/* ==========================================================================
   Legal modals — one reusable dialog, content swapped per trigger.
   Esc / overlay-click / close-button all dismiss; focus returns to opener;
   focus trapped while open. Triggers: [data-legal-modal].
   ========================================================================== */
(function () {
  var legalModalContent = {
    privacy: {
      title: "Privacy Notice",
      body: "" +
        "<p>CoverCapy may collect information that users submit through forms, quote flows, plan comparison tools, dentist request forms, contact forms, and related site experiences.</p>" +
        "<ul>" +
          "<li>Information may be used to help users compare dental insurance options, estimate treatment costs, request dentists, improve the platform, and communicate with users.</li>" +
          "<li>CoverCapy does not sell personal information to advertisers.</li>" +
          "<li>Users should avoid submitting sensitive medical information unless specifically requested through a secure workflow.</li>" +
          "<li>CoverCapy may use analytics, performance tools, and advertising measurement tools to understand site usage and improve the experience.</li>" +
        "</ul>" +
        "<p>For privacy questions, users may contact CoverCapy through the contact options provided on the website.</p>"
    },
    terms: {
      title: "Terms of Use",
      body: "" +
        "<p>CoverCapy provides informational tools, plan comparison resources, dentist discovery resources, and concierge-style navigation for dental insurance and dental care planning.</p>" +
        "<ul>" +
          "<li>Use of this site does not create a dentist-patient, insurance-agent, broker, legal, financial, or medical advisory relationship unless separately agreed in writing.</li>" +
          "<li>Users are responsible for verifying plan details, provider participation, pricing, waiting periods, exclusions, eligibility, and final costs directly with the carrier and provider.</li>" +
          "<li>CoverCapy may update site content, links, tools, provider listings, plan references, and educational resources at any time.</li>" +
          "<li>Users agree not to misuse the platform, submit false information, interfere with site operations, or rely on the site as a substitute for professional advice.</li>" +
        "</ul>"
    },
    insurance: {
      title: "Insurance Disclaimer",
      body: "" +
        "<p>CoverCapy is not an insurance carrier. Dental insurance information shown on this site is for educational planning and comparison support.</p>" +
        "<ul>" +
          "<li>Plan details, pricing, benefits, provider networks, waiting periods, exclusions, annual maximums, deductibles, and availability may change.</li>" +
          "<li>Treatment cost estimates are not guarantees of coverage, reimbursement, approval, or final patient responsibility.</li>" +
          "<li>Coverage activation timing may vary by carrier, plan, application, payment status, and eligibility requirements.</li>" +
          "<li>Users should verify all plan details with the insurance carrier and dental office before enrollment, scheduling, or treatment.</li>" +
          "<li>No content on this site should be interpreted as a promise that a specific procedure will be covered or paid by insurance.</li>" +
        "</ul>"
    },
    advertising: {
      title: "Advertising Disclosure",
      body: "" +
        "<p>CoverCapy may receive compensation from insurance partners, dental practices, lead partners, advertising partners, sponsored listings, affiliate relationships, or other commercial arrangements.</p>" +
        "<ul>" +
          "<li>Compensation may influence placement, presentation, prominence, or availability of certain offers, listings, buttons, or recommendations.</li>" +
          "<li>CoverCapy aims to present information in a useful and transparent way, but users should consider that sponsored relationships may exist.</li>" +
          "<li>Sponsored, featured, or promoted listings do not guarantee clinical quality, insurance acceptance, treatment outcome, pricing, or availability.</li>" +
          "<li>Users should independently evaluate providers, plans, and offers before making decisions.</li>" +
        "</ul>"
    },
    provider: {
      title: "Provider Listing Notice",
      body: "" +
        "<p>Provider listings on CoverCapy may include claimed profiles, sponsored listings, patient-requested offices, publicly available information, or practices that apply for CoverCapy programs.</p>" +
        "<ul>" +
          "<li>\u201CCapy Accredited,\u201D \u201CFeatured,\u201D \u201CPlatinum Elite,\u201D or similar labels are CoverCapy platform designations and should not be interpreted as guarantees of clinical outcome.</li>" +
          "<li>Users must verify provider credentials, license status, insurance participation, availability, pricing, treatment recommendations, and office policies directly with the dental office.</li>" +
          "<li>CoverCapy does not control treatment decisions made by independent dental providers.</li>" +
          "<li>Provider information may change and may not always be complete, current, or error-free.</li>" +
          "<li>Inclusion in the CoverCapy directory does not imply employment, partnership, endorsement, or ownership unless specifically stated.</li>" +
        "</ul>"
    },
    accessibility: {
      title: "Accessibility Statement",
      body: "" +
        "<p>CoverCapy aims to make its website usable, readable, and accessible for as many people as possible.</p>" +
        "<ul>" +
          "<li>CoverCapy intends to improve keyboard navigation, readable contrast, semantic structure, responsive layouts, and assistive technology compatibility.</li>" +
          "<li>Some content, tools, or third-party integrations may not yet be fully optimized for every assistive technology.</li>" +
          "<li>Users who experience accessibility barriers may contact CoverCapy through the contact options provided on the website.</li>" +
          "<li>CoverCapy will make reasonable efforts to improve access and usability as the platform evolves.</li>" +
        "</ul>"
    }
  };

  var modalOverlay = document.getElementById("legalModalOverlay");
  var modal = modalOverlay ? modalOverlay.querySelector(".legal-modal") : null;
  var modalTitle = document.getElementById("legalModalTitle");
  var modalBody = document.getElementById("legalModalBody");
  var closeButton = modalOverlay ? modalOverlay.querySelector(".legal-modal-close") : null;
  var modalTriggers = document.querySelectorAll("[data-legal-modal]");
  var lastFocusedElement = null;

  if (!modalOverlay || !modal || !modalTitle || !modalBody || !closeButton) return;

  function getFocusableElements() {
    return modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openLegalModal(key, opener) {
    var content = legalModalContent[key];
    if (!content) return;

    lastFocusedElement = opener || document.activeElement;

    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body +
      '<div class="legal-modal-note">This notice is provided for general informational purposes and should be reviewed by qualified legal counsel before public launch.</div>';

    modalOverlay.classList.add("is-open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("legal-modal-open");

    window.setTimeout(function () { closeButton.focus(); }, 0);
  }

  function closeLegalModal() {
    modalOverlay.classList.remove("is-open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("legal-modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openLegalModal(trigger.getAttribute("data-legal-modal"), trigger);
    });
  });

  closeButton.addEventListener("click", closeLegalModal);

  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) closeLegalModal();
  });

  document.addEventListener("keydown", function (event) {
    if (!modalOverlay.classList.contains("is-open")) return;

    if (event.key === "Escape") { closeLegalModal(); return; }

    if (event.key === "Tab") {
      var focusable = Array.prototype.slice.call(getFocusableElements());
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
})();
