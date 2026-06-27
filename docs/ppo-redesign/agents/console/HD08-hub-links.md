# HD08 - Console Header Hub Links

Spec only. Goal: turn the compare-ppo-dental-plans.html console header into a real hub by giving it an Explore dropdown of crawlable links to real on-disk destinations. Every href below was verified against the working tree. Nothing is invented.

## Current state (grounded)

File: `compare-ppo-dental-plans.html`. The console header is the `.toc-*` bar at lines 862 to 876.

- Line 862: brand link to `/compare-ppo-dental-plans/`
- Lines 867 to 874: `.toc-links` are all in-page anchors only (`#match`, `#compare`, `#shelf`, `#treatment`, `#situation`, `#explore-carriers`, `#glossary-shelf`, `#faq`). None leave the page.
- Line 876: the only real cross-page link, `.toc-cta` to `/find-my-dentist`.

A separate footer resource hub already exists at lines 1086 to 1097 with real links, so the slugs there are a trustworthy reference. The header does not surface any of them.

## Verified link table

All paths confirmed present on disk. Slug and trailing-slash form taken from each target's own canonical tag where one exists.

| Label | href | On disk | Canonical form |
|---|---|---|---|
| Dental insurance overview | `/dental-insurance/` | `dental-insurance/index.html` | trailing slash |
| All carriers (PPO plans hub) | `/dental-insurance/ppo-plans/` | `dental-insurance/ppo-plans/index.html` | trailing slash |
| Glossary index | `/dental-insurance-glossary/` | `dental-insurance-glossary/index.html` | trailing slash |
| Glossary: PPO | `/dental-insurance-glossary/ppo/` | `dental-insurance-glossary/ppo/index.html` | trailing slash (verified) |
| Glossary: implants | `/dental-insurance-glossary/implants/` | `dental-insurance-glossary/implants/index.html` | trailing slash (verified) |
| Glossary: waiting period | `/dental-insurance-glossary/waiting-period/` | `dental-insurance-glossary/waiting-period/` | trailing slash |
| Glossary: annual maximum | `/dental-insurance-glossary/annual-maximum/` | `dental-insurance-glossary/annual-maximum/` | trailing slash |
| Glossary: deductible | `/dental-insurance-glossary/deductible/` | `dental-insurance-glossary/deductible/` | trailing slash |
| Situation: no waiting period | `/dental-insurance-no-waiting-period/` | `dental-insurance-no-waiting-period/index.html` | trailing slash |
| Situation: immediate coverage | `/dental-insurance-immediate-coverage/` | `dental-insurance-immediate-coverage/index.html` | trailing slash |
| Situation: between jobs | `/dental-insurance-between-jobs/` | `dental-insurance-between-jobs/index.html` | trailing slash |
| Situation: self-employed | `/dental-insurance-for-self-employed/` | `dental-insurance-for-self-employed/index.html` | trailing slash |
| Treatment: crowns guide | `/guides/crowns/cost-with-insurance.html` | `guides/crowns/cost-with-insurance.html` | flat .html file |
| Find a dentist | `/find-my-dentist` | `find-my-dentist.html` | NO trailing slash (its own canonical) |
| Cost estimator | `/dental-treatment-cost-estimator.html` | `dental-treatment-cost-estimator.html` | flat .html, canonical keeps `.html` |
| Compare plans (this page) | `/compare-ppo-dental-plans/` | `compare-ppo-dental-plans.html` | trailing slash |

### Glossary terms available on disk (full set, all `/dental-insurance-glossary/<term>/`)
ada-fee, allowed-amount, annual-maximum, balance-billing, calendar-year, cdt, coinsurance, coverage-basic, coverage-major, coverage-preventive, day-one, deductible, effective-date, implants, in-network, missing-tooth, out-of-pocket, plan-year, ppo, rating, vision, waiting-period, whitening.

The Explore menu should surface a curated handful (PPO, implants, waiting period, annual maximum, deductible) plus a "See all terms" link to the index, rather than all 23.

### Carrier pages available under `/dental-insurance/ppo-plans/`
aetna-dental-direct, ameritas-primestar, delta-dental, guardian-premier-ppo, humana-extend-5000, mutual-of-omaha-dental, uhc-primary-dental (each a directory with index.html). The header should link to the carriers hub index, not enumerate all seven.

## MISSING / flagged targets (do not link)

- **`/ppo-plans/`** as requested in the mandate does NOT exist as a top-level directory. The real carrier hub is `/dental-insurance/ppo-plans/`. Use that. Do not create a `/ppo-plans/` route.
- **Cost estimator has no clean route.** It is a flat file and its own canonical is `/dental-treatment-cost-estimator.html` with the extension. Link exactly that string. Do not use `/cost-estimator/` or a trailing slash; neither exists.
- **Find a dentist has no trailing slash.** Its canonical is `/find-my-dentist` (no slash, no `.html`). Match it. `find-my-dentist-v2.html` also exists but is not the canonical destination; do not link it.
- **"By treatment" has no dedicated landing hub.** There is no single treatment index page. The only real treatment content is under `/guides/crowns/` (a set of flat `.html` files) plus glossary procedure terms (implants, whitening). Spec the treatment group to point at these real pages, not at an invented `/treatments/` route.

## Spec: console Explore dropdown

Add a single "Explore" trigger to `.toc-links`, opening a grouped panel. Keep existing in-page anchors; the dropdown adds cross-page reach. Groups: By treatment, By situation, Glossary, Find a dentist, Cost estimator, All carriers. Markup is plain `<a href>` so every link is crawlable even if JS is off (the panel is hidden with CSS, links remain in the DOM).

```html
<!-- insert inside <nav class="toc-links" id="tocLinks"> after the in-page anchors -->
<div class="toc-explore" data-explore>
  <button type="button" class="toc-explore-trigger" aria-expanded="false" aria-controls="exploreMenu">
    Explore
  </button>
  <div class="toc-explore-menu" id="exploreMenu" role="menu" hidden>

    <div class="explore-group" role="group" aria-label="By treatment">
      <p class="explore-head">By treatment</p>
      <a role="menuitem" href="/guides/crowns/cost-with-insurance.html">Crowns and insurance</a>
      <a role="menuitem" href="/dental-insurance-glossary/implants/">Implants explained</a>
      <a role="menuitem" href="/dental-insurance-glossary/whitening/">Whitening coverage</a>
    </div>

    <div class="explore-group" role="group" aria-label="By situation">
      <p class="explore-head">By situation</p>
      <a role="menuitem" href="/dental-insurance-no-waiting-period/">No waiting period</a>
      <a role="menuitem" href="/dental-insurance-immediate-coverage/">Need coverage now</a>
      <a role="menuitem" href="/dental-insurance-between-jobs/">Between jobs</a>
      <a role="menuitem" href="/dental-insurance-for-self-employed/">Self-employed</a>
    </div>

    <div class="explore-group" role="group" aria-label="Glossary">
      <p class="explore-head">Glossary</p>
      <a role="menuitem" href="/dental-insurance-glossary/ppo/">PPO</a>
      <a role="menuitem" href="/dental-insurance-glossary/waiting-period/">Waiting period</a>
      <a role="menuitem" href="/dental-insurance-glossary/annual-maximum/">Annual maximum</a>
      <a role="menuitem" href="/dental-insurance-glossary/deductible/">Deductible</a>
      <a role="menuitem" href="/dental-insurance-glossary/">See all terms</a>
    </div>

    <div class="explore-group" role="group" aria-label="Tools">
      <p class="explore-head">Tools and people</p>
      <a role="menuitem" href="/find-my-dentist">Find a dentist</a>
      <a role="menuitem" href="/dental-treatment-cost-estimator.html">Cost estimator</a>
      <a role="menuitem" href="/dental-insurance/ppo-plans/">All carriers</a>
      <a role="menuitem" href="/dental-insurance/">Dental insurance overview</a>
    </div>

  </div>
</div>
```

Minimal toggle behavior (no framework):

```html
<script>
(function () {
  var wrap = document.querySelector('[data-explore]');
  if (!wrap) return;
  var btn = wrap.querySelector('.toc-explore-trigger');
  var menu = wrap.querySelector('.toc-explore-menu');
  function close() { btn.setAttribute('aria-expanded', 'false'); menu.hidden = true; }
  function toggle() {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  }
  btn.addEventListener('click', toggle);
  document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
</script>
```

Style notes (use existing CSS tokens, no gradients, no glassmorphism, no em-dashes in copy):
- `.toc-explore-menu` positioned absolute under the trigger, background `--cream-card`, border `--line`, four-column on desktop and stacked on mobile.
- `.explore-head` uses overline treatment, color `--teal-300`.
- Links inherit `--teal-700` for the link color used elsewhere in the header.

## Implementation note

This page is hand-maintained (it is NOT in `/dental/` and not generator output), so edits go directly into `compare-ppo-dental-plans.html`. The footer hub at lines 1086 to 1097 already proves these slugs resolve in production; the Explore menu reuses the same verified paths and extends them with the carriers hub, treatment guides, glossary terms, and the cost estimator that the header currently omits.
