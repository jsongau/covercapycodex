# CoverCapy Dental Insurance Glossary — A-Z Index Strategy
## SEO + UX Architecture Brief | June 2026

---

## 1. Term Inventory by Letter

Active letters (have terms): **A B C D E I M O P V W**
Inactive letters (no terms): F G H J K L N Q R S T U X Y Z

Total terms: 23
Total active letters: 11

| Letter | Terms |
|--------|-------|
| A | ADA fee schedule, Allowed amount, Annual maximum |
| B | Balance billing, Basic services |
| C | Calendar year reset, CDT codes, Coinsurance, CoverCapy rating |
| D | Day 1 activation, Deductible |
| E | Effective date |
| I | Implants, In-network dentist |
| M | Major services, Missing tooth clause |
| O | Out of pocket |
| P | Plan year, PPO dental insurance, Preventive care |
| V | Vision add-on |
| W | Waiting period, Whitening |

---

## 2. Anchor Link Strategy

### Exact `id` attributes for each term section

Every `<section>` wrapping a term entry gets two IDs: a letter-group anchor (for A-Z nav) and a term-specific anchor (for direct deep links and internal linking).

```html
<!-- Letter group anchor (A-Z nav points here) -->
<section id="letter-a">
  <!-- Term anchors within the group -->
  <article id="term-ada-fee-schedule">...</article>
  <article id="term-allowed-amount">...</article>
  <article id="term-annual-maximum">...</article>
</section>

<section id="letter-b">
  <article id="term-balance-billing">...</article>
  <article id="term-basic-services">...</article>
</section>

<section id="letter-c">
  <article id="term-calendar-year-reset">...</article>
  <article id="term-cdt-codes">...</article>
  <article id="term-coinsurance">...</article>
  <article id="term-covercapy-rating">...</article>
</section>

<section id="letter-d">
  <article id="term-day-1-activation">...</article>
  <article id="term-deductible">...</article>
</section>

<section id="letter-e">
  <article id="term-effective-date">...</article>
</section>

<section id="letter-i">
  <article id="term-implants">...</article>
  <article id="term-in-network-dentist">...</article>
</section>

<section id="letter-m">
  <article id="term-major-services">...</article>
  <article id="term-missing-tooth-clause">...</article>
</section>

<section id="letter-o">
  <article id="term-out-of-pocket">...</article>
</section>

<section id="letter-p">
  <article id="term-plan-year">...</article>
  <article id="term-ppo-dental-insurance">...</article>
  <article id="term-preventive-care">...</article>
</section>

<section id="letter-v">
  <article id="term-vision-add-on">...</article>
</section>

<section id="letter-w">
  <article id="term-waiting-period">...</article>
  <article id="term-whitening">...</article>
</section>
```

### Full term-to-anchor map

| Term | `id` attribute |
|------|---------------|
| ADA fee schedule | `term-ada-fee-schedule` |
| Allowed amount | `term-allowed-amount` |
| Annual maximum | `term-annual-maximum` |
| Balance billing | `term-balance-billing` |
| Basic services | `term-basic-services` |
| Calendar year reset | `term-calendar-year-reset` |
| CDT codes | `term-cdt-codes` |
| Coinsurance | `term-coinsurance` |
| CoverCapy rating | `term-covercapy-rating` |
| Day 1 activation | `term-day-1-activation` |
| Deductible | `term-deductible` |
| Effective date | `term-effective-date` |
| Implants | `term-implants` |
| In-network dentist | `term-in-network-dentist` |
| Major services | `term-major-services` |
| Missing tooth clause | `term-missing-tooth-clause` |
| Out of pocket | `term-out-of-pocket` |
| Plan year | `term-plan-year` |
| PPO dental insurance | `term-ppo-dental-insurance` |
| Preventive care | `term-preventive-care` |
| Vision add-on | `term-vision-add-on` |
| Waiting period | `term-waiting-period` |
| Whitening | `term-whitening` |

---

## 3. A-Z Nav HTML (Complete)

Strategy: active letters are clickable links; inactive letters render as non-interactive, visually dimmed. All 26 letters appear so the nav is predictable and scannable.

```html
<nav class="glossary-az-nav" aria-label="Glossary A–Z navigation" id="glossary-az-nav">
  <ol class="az-list" role="list">
    <li><a href="#letter-a" class="az-link az-active-letter" data-letter="a">A</a></li>
    <li><a href="#letter-b" class="az-link az-active-letter" data-letter="b">B</a></li>
    <li><a href="#letter-c" class="az-link az-active-letter" data-letter="c">C</a></li>
    <li><a href="#letter-d" class="az-link az-active-letter" data-letter="d">D</a></li>
    <li><a href="#letter-e" class="az-link az-active-letter" data-letter="e">E</a></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">F</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">G</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">H</span></li>
    <li><a href="#letter-i" class="az-link az-active-letter" data-letter="i">I</a></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">J</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">K</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">L</span></li>
    <li><a href="#letter-m" class="az-link az-active-letter" data-letter="m">M</a></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">N</span></li>
    <li><a href="#letter-o" class="az-link az-active-letter" data-letter="o">O</a></li>
    <li><a href="#letter-p" class="az-link az-active-letter" data-letter="p">P</a></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">Q</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">R</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">S</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">T</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">U</span></li>
    <li><a href="#letter-v" class="az-link az-active-letter" data-letter="v">V</a></li>
    <li><a href="#letter-w" class="az-link az-active-letter" data-letter="w">W</a></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">X</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">Y</span></li>
    <li><span class="az-link az-inactive-letter" aria-disabled="true">Z</span></li>
  </ol>
</nav>
```

---

## 4. Sticky Nav Behavior

### Recommendation: Sticky, but offset-aware

With only 23 terms, the page is roughly 3,000-4,000px on mobile. Sticking the A-Z nav at the top is worth it -- users need letter orientation while scrolling.

**Stick point:** Activate stickiness after the page header and search bar scroll out of view (~120px from top). Use a sentinel element, not `position: sticky` alone, so the active-state JS can detect entry.

```css
/* A-Z nav sticky CSS */
.glossary-az-nav {
  position: sticky;
  top: 0;                    /* sticks at very top */
  z-index: 100;
  background: #FFFDF8;       /* --cream-card */
  border-bottom: 1px solid #E8E2D8;  /* --line */
  padding: 8px 0;
  transition: box-shadow 0.2s ease;
}

/* Add shadow when actively stuck (JS toggles this class) */
.glossary-az-nav.is-stuck {
  box-shadow: 0 2px 8px rgba(8, 42, 48, 0.08);
}

/* Scroll offset for anchor targets — prevent nav overlap */
[id^="letter-"] {
  scroll-margin-top: 64px;   /* matches nav height */
}
[id^="term-"] {
  scroll-margin-top: 72px;
}

/* Nav item base styles */
.az-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0 16px;
  justify-content: center;
}

.az-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.az-active-letter {
  color: #14525B;             /* --teal-700 */
  cursor: pointer;
}

.az-active-letter:hover {
  background: #E6F7EE;        /* --mint-soft */
  color: #082A30;             /* --teal-night */
}

/* Current letter — set by Intersection Observer JS */
.az-active-letter[aria-current="true"] {
  background: #082A30;        /* --teal-night */
  color: #5BE0A0;             /* --mint */
}

.az-inactive-letter {
  color: #8A958F;             /* --ink-faint */
  cursor: default;
  user-select: none;
}

/* Detect when nav is stuck using a sentinel */
.az-sentinel {
  height: 1px;
  margin-top: -1px;
  visibility: hidden;
}
```

```javascript
// Detect when nav becomes sticky using IntersectionObserver on sentinel
const sentinel = document.querySelector('.az-sentinel');
const nav = document.getElementById('glossary-az-nav');

const stickyObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('is-stuck', !entry.isIntersecting);
  },
  { threshold: 0 }
);

if (sentinel) stickyObserver.observe(sentinel);
```

**HTML placement:** Insert `<div class="az-sentinel"></div>` immediately before `<nav class="glossary-az-nav">`.

---

## 5. Mobile A-Z Behavior

### Recommendation: Horizontal scroll pill row (no dropdown)

A dropdown `<select>` breaks the visual rhythm and hides context. A two-column grid wastes vertical space. Horizontal scroll pills are the standard pattern (used by MDN, Dictionary.com, GOV.UK) and work with 26 letters in ~340px.

```css
/* Mobile overrides — applied below 640px */
@media (max-width: 639px) {
  .az-list {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    padding: 0 12px;
    gap: 4px;
    /* Smooth momentum scroll on iOS */
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;           /* Firefox */
  }

  .az-list::-webkit-scrollbar {
    display: none;                   /* Chrome/Safari */
  }

  .az-link {
    flex-shrink: 0;                  /* prevent squashing */
    width: 36px;
    height: 36px;
    font-size: 13px;
  }

  /* Fade edges to hint scrollability */
  .glossary-az-nav {
    position: relative;
  }

  .glossary-az-nav::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 24px;
    background: linear-gradient(to right, transparent, #FFFDF8);
    pointer-events: none;
  }

  /* scroll-margin adjustment for mobile (smaller nav height) */
  [id^="letter-"],
  [id^="term-"] {
    scroll-margin-top: 56px;
  }
}
```

**Bonus behavior:** When the Intersection Observer sets the active letter (section 6 below), scroll it into view within the nav pill row:

```javascript
function scrollNavToLetter(letter) {
  const link = document.querySelector(`.az-link[data-letter="${letter}"]`);
  if (link) {
    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}
```

---

## 6. Active State — Intersection Observer Approach

Track which letter section is currently in the viewport and update the A-Z nav highlight accordingly.

```javascript
(function () {
  const letterLinks = document.querySelectorAll('.az-link[data-letter]');
  const letterSections = document.querySelectorAll('[id^="letter-"]');

  // Map section id suffix to letter
  // e.g. "letter-a" -> "a"
  let currentLetter = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const letter = entry.target.id.replace('letter-', '');

          // Only update if changed
          if (letter === currentLetter) return;
          currentLetter = letter;

          // Clear all active states
          letterLinks.forEach((link) => {
            link.removeAttribute('aria-current');
          });

          // Set new active state
          const activeLink = document.querySelector(
            `.az-link[data-letter="${letter}"]`
          );
          if (activeLink) {
            activeLink.setAttribute('aria-current', 'true');
            // On mobile, scroll the active pill into view
            scrollNavToLetter(letter);
          }
        }
      });
    },
    {
      // Trigger when section top is within top 20% of viewport
      rootMargin: '-0px 0px -80% 0px',
      threshold: 0,
    }
  );

  letterSections.forEach((section) => observer.observe(section));

  function scrollNavToLetter(letter) {
    const link = document.querySelector(`.az-link[data-letter="${letter}"]`);
    if (link) {
      link.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }
})();
```

**Note on rootMargin:** `-0px 0px -80% 0px` means a section is considered "active" when its top edge crosses the upper 20% of the viewport -- which maps well to reading position. Adjust the 80% value if sections are very tall.

---

## 7. Search Within Glossary

### Recommendation: Yes, include a filter box above the A-Z nav

23 terms is the exact threshold where a search box transitions from unnecessary to helpful. A user landing from organic search on "what is a deductible" may want to quickly find adjacent terms. Keep it lightweight -- pure client-side JS filter, no server round-trip.

**Placement:** Above the A-Z nav, below the page H1 and intro paragraph. Full width on mobile, max 480px centered on desktop.

```html
<div class="glossary-search-wrap">
  <label class="sr-only" for="glossary-search">Search glossary terms</label>
  <div class="glossary-search-inner">
    <svg class="glossary-search-icon" width="16" height="16" viewBox="0 0 16 16"
      fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" stroke="#8A958F" stroke-width="1.5"/>
      <path d="M10.5 10.5L14 14" stroke="#8A958F" stroke-width="1.5"
        stroke-linecap="round"/>
    </svg>
    <input
      type="search"
      id="glossary-search"
      class="glossary-search-input"
      placeholder="Search terms..."
      autocomplete="off"
      spellcheck="false"
      aria-controls="glossary-results-count"
    />
    <button class="glossary-search-clear" id="glossary-search-clear"
      aria-label="Clear search" hidden>
      ×
    </button>
  </div>
  <p class="glossary-results-count" id="glossary-results-count" aria-live="polite"
    aria-atomic="true"></p>
</div>
```

```css
.glossary-search-wrap {
  max-width: 480px;
  margin: 0 auto 24px;
}

.glossary-search-inner {
  position: relative;
  display: flex;
  align-items: center;
}

.glossary-search-icon {
  position: absolute;
  left: 12px;
  pointer-events: none;
}

.glossary-search-input {
  width: 100%;
  padding: 10px 40px 10px 36px;
  border: 1.5px solid #E8E2D8;       /* --line */
  border-radius: 8px;
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 15px;
  color: #082A30;                     /* --ink */
  background: #FFFDF8;                /* --cream-card */
  outline: none;
  transition: border-color 0.15s;
}

.glossary-search-input:focus {
  border-color: #14525B;              /* --teal-700 */
}

.glossary-search-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: #8A958F;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.glossary-results-count {
  font-size: 13px;
  color: #8A958F;                     /* --ink-faint */
  margin: 6px 0 0;
  text-align: right;
  min-height: 18px;
}

/* Hidden utility class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* Hide sections when search filters them out */
[id^="letter-"].glossary-hidden {
  display: none;
}

article.glossary-hidden {
  display: none;
}
```

```javascript
(function () {
  const input = document.getElementById('glossary-search');
  const clearBtn = document.getElementById('glossary-search-clear');
  const counter = document.getElementById('glossary-results-count');

  if (!input) return;

  // Index: map each article to its heading text for matching
  const articles = Array.from(document.querySelectorAll('[id^="term-"]'));

  function filterGlossary(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    articles.forEach((article) => {
      const heading = article.querySelector('h2, h3');
      const text = heading ? heading.textContent.toLowerCase() : '';
      const matches = !q || text.includes(q);

      article.classList.toggle('glossary-hidden', !matches);
      if (matches) visibleCount++;
    });

    // Hide/show letter group sections based on whether any child is visible
    document.querySelectorAll('[id^="letter-"]').forEach((section) => {
      const anyVisible = section.querySelector('[id^="term-"]:not(.glossary-hidden)');
      section.classList.toggle('glossary-hidden', !anyVisible);
    });

    // Update count
    if (q) {
      counter.textContent =
        visibleCount === 0
          ? 'No terms match'
          : `${visibleCount} term${visibleCount !== 1 ? 's' : ''} found`;
    } else {
      counter.textContent = '';
    }

    clearBtn.hidden = !q;
  }

  input.addEventListener('input', (e) => filterGlossary(e.target.value));

  clearBtn.addEventListener('click', () => {
    input.value = '';
    filterGlossary('');
    input.focus();
  });
})();
```

---

## 8. Back to Top

### Recommendation: Floating button, appears after 400px scroll, bottom-right

For a 23-term page, a "Back to top" link in the page footer is sufficient on desktop. On mobile, a floating button removes the need to scroll all the way back. The A-Z nav itself also partially solves this since sticking it at the top gives users navigation control without scrolling up.

```html
<!-- Place just before </body> -->
<button class="back-to-top" id="back-to-top" aria-label="Back to top" hidden>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" stroke-width="1.75"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
```

```css
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #082A30;        /* --teal-night */
  color: #5BE0A0;             /* --mint */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(8, 42, 48, 0.25);
  transition: opacity 0.2s, transform 0.2s;
  z-index: 200;
}

.back-to-top:hover {
  background: #14525B;        /* --teal-700 */
  transform: translateY(-2px);
}

.back-to-top[hidden] {
  display: none;
}

@media (max-width: 639px) {
  .back-to-top {
    bottom: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}
```

```javascript
(function () {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const SHOW_AFTER_PX = 400;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < SHOW_AFTER_PX;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
```

**Footer text link (desktop supplement):**
```html
<p class="glossary-footer-top">
  <a href="#glossary-az-nav">Back to A–Z index</a>
</p>
```

---

## 9. SEO Implications of Anchor Links

### Do anchor links (#term-ppo) help or hurt?

**They help when used correctly.** Detailed analysis:

#### Benefits
- Google crawls and indexes fragment URLs. Sitelinks in SERPs can deep-link to `#term-ppo-dental-insurance`.
- Internal links from other pages using `#term-deductible` pass PageRank to the parent page AND send a topical relevance signal for that specific term.
- Users who land via a shared anchor link see exactly the term they looked up, reducing bounce.
- Schema (`FAQPage`, `DefinedTermSet`) can reference anchor URLs for individual term definitions.

#### Risks to avoid
- Do not use fragment URLs in canonical tags or sitemaps -- the sitemap entry should be `https://covercapy.com/dental-insurance-glossary/` without a fragment. Googlebot handles fragments separately.
- Do not use JavaScript-driven hash routing that changes the URL bar dynamically -- this confuses crawlers. Static `id` anchors on server-rendered HTML are fine.
- Duplicate content is not a concern with anchors on a single page.

#### Best practices
- Link from T5 dentist pages to relevant glossary terms using anchor links. Example: in the deductible section of an insurance modal, link to `covercapy.com/dental-insurance-glossary/#term-deductible`.
- Use descriptive anchor text ("what is a dental deductible"), not generic ("click here").
- Add `rel="noopener"` only for external links. Internal anchor links need no special attributes.
- Include a `DefinedTerm` or `FAQPage` schema block on the glossary page; Google may render rich results for definition queries.

#### Recommended schema for the glossary page
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Dental Insurance Glossary",
  "url": "https://covercapy.com/dental-insurance-glossary/",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "PPO Dental Insurance",
      "url": "https://covercapy.com/dental-insurance-glossary/#term-ppo-dental-insurance",
      "description": "A Preferred Provider Organization plan that lets you see any licensed dentist but pays more when you stay in-network."
    }
    // ... repeat for all 23 terms
  ]
}
```

---

## 10. Individual Pages vs. One-Page Glossary: SEO Tradeoff Analysis

### Should CoverCapy create individual pages per term?

For example: `/dental-insurance-glossary/ppo-dental-insurance/` vs. keeping everything on `/dental-insurance-glossary/`

### Current state: 23 terms, one page

At 23 terms, the single-page approach is the right call now. Here is the full tradeoff:

| Factor | One Page | Individual Pages |
|--------|----------|-----------------|
| Crawl budget | Efficient -- 1 URL | 23+ extra URLs to crawl and index |
| Internal link equity | Concentrated on one URL | Distributed across 24 URLs |
| Time to rank | Faster -- one URL earns all signals | Each page must independently earn authority |
| User experience | Scannable, no back/forward navigation | Deep-link sharing is cleaner per term |
| Rich snippets | FAQPage/DefinedTermSet on one URL | Possible per-term schema, but same outcome |
| Topical authority | One strong page beats 23 thin pages | Only works if each page has 500+ unique words |
| Maintenance | Update one file | Manage 24 files, 24 canonical URLs |

**Recommendation: Keep one page now. Plan to split only if 3 conditions are met:**
1. The glossary grows beyond ~60 terms (at which point one-page UX degrades).
2. Individual terms generate enough search volume to justify standalone targeting (check GSC after 6 months).
3. Each individual page can be written to 500+ words with unique intro, related terms, examples, and FAQs -- not just a copied definition.

**Hybrid path to consider in 6 months:**
- Keep the glossary index at `/dental-insurance-glossary/` (all 23 terms, stays the hub).
- Create individual pages only for high-volume terms: `deductible`, `ppo-dental-insurance`, `waiting-period`, `annual-maximum`. These have clear search intent ("what is a dental deductible") and can support standalone 800-word pages.
- Individual pages link back to the glossary as canonical hub; glossary index links out to expanded pages.

---

## 11. Complete Page HTML Structure (Outline)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Dental Insurance Glossary: 23 Key Terms Explained | CoverCapy</title>
  <meta name="description" content="Clear definitions for dental insurance terms — deductible, PPO, annual maximum, waiting period, and 19 more. Understand your plan before your first appointment.">
  <link rel="canonical" href="https://covercapy.com/dental-insurance-glossary/">
  <!-- DefinedTermSet + FAQPage schema in <script type="application/ld+json"> -->
</head>
<body>

  <!-- Page header -->
  <header class="glossary-header">
    <nav aria-label="Breadcrumb">
      <!-- Home / Dental Insurance Glossary -->
    </nav>
    <h1>Dental Insurance Glossary</h1>
    <p class="glossary-intro">23 terms that explain how PPO dental plans actually work.</p>
  </header>

  <!-- Search box -->
  <!-- (glossary-search-wrap from section 7) -->

  <!-- Sticky sentinel + A-Z nav -->
  <div class="az-sentinel"></div>
  <nav class="glossary-az-nav" id="glossary-az-nav" aria-label="Glossary A–Z navigation">
    <!-- (az-list from section 3) -->
  </nav>

  <!-- Main content -->
  <main id="main-content">
    <section id="letter-a">
      <h2 class="letter-heading" aria-label="Terms starting with A">A</h2>
      <article id="term-ada-fee-schedule">
        <h3>ADA Fee Schedule</h3>
        <!-- definition, example, related terms -->
      </article>
      <!-- ... -->
    </section>
    <!-- repeat for B through W -->
  </main>

  <!-- Footer -->
  <footer class="glossary-footer">
    <p class="glossary-footer-top"><a href="#glossary-az-nav">Back to A–Z index</a></p>
    <!-- site footer -->
  </footer>

  <!-- Back to top button -->
  <!-- (back-to-top from section 8) -->

  <!-- Scripts (inline, at end of body) -->
  <script>
    // Sticky nav detection (section 4)
    // Active state observer (section 6)
    // Search filter (section 7)
    // Back to top (section 8)
  </script>

</body>
</html>
```

---

## 12. Implementation Priority

| Priority | Item | Why |
|----------|------|-----|
| P0 | Anchor IDs on all 23 term articles | Required for all navigation to function |
| P0 | A-Z nav HTML with active/inactive states | Core UX |
| P0 | `scroll-margin-top` on letter and term sections | Prevents nav from covering target on jump |
| P1 | Sticky nav + `is-stuck` shadow | Orientation during scroll |
| P1 | Mobile horizontal scroll pills | Usable on iPhone without layout cost |
| P1 | Intersection Observer active state | Low-effort high-polish |
| P1 | DefinedTermSet schema | SEO rich result eligibility |
| P2 | Search filter box | Helpful but not critical at 23 terms |
| P2 | Back to top floating button | Nice on mobile, not critical at this length |
| P3 | Individual term pages | Only if GSC data justifies it after 6 months |
