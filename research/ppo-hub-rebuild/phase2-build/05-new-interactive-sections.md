# 05 — New Interactive Sections
## Agent: new-interactive-sections | Phase 2.5 PPO Hub Rebuild | 2026-06-26

---

## Overview

Three new interactive sections are proposed. Each earns its place by doing one thing that static prose cannot: letting the visitor self-select their priority and get a personalized answer without leaving the page. All three are sourced exclusively from the eight SSOT files in `/data/plans/`. No math is invented. Premiums are labeled "~/estimate" throughout.

Insertion order in the final page:

```
[Hero]
[Scenario Finder]  ← existing
[Plan Stories]     ← existing
[Verify Band 1]    ← existing
*** NEW: Plan Strength Explorer   ← after Verify Band 1, before Compare Table ***
[Compare Table]    ← existing (8-col scrollable)
*** NEW: Compare Any Two          ← immediately after Compare Table ***
[Best For Grid]    ← existing
*** NEW: Coverage Row Explorer    ← immediately after Best For Grid ***
[Waiting Periods]  ← existing
[Verify Band 2]    ← existing
[FAQ]              ← existing
```

---

## Section A — Plan Strength Explorer

### Purpose

A visitor landing mid-funnel (from "best dental plan for implants" or "dental plan for seniors") often arrives knowing their priority but not which plan wins on that axis. The Scenario Finder handles timing-based selection; this section handles need-based selection. Seven segmented tabs map directly to the seven strength labels from 00-BRIEF.md. Clicking a tab swaps a single featured plan panel. The panel shows the one SSOT fact that proves why this plan wins that axis, plus a verify CTA.

SEO angle: Google's "People also ask" for dental insurance is heavily need-based ("best dental plan for braces", "which dental plan covers implants same day"). A labeled, answered section with structured content targeting each of these seven queries earns featured-snippet eligibility.

### Insertion Point

After `#verify-1` (the first verify band), before `#compare-table`. Slot as:

```html
<section id="plan-strength-explorer" aria-labelledby="pse-heading">
```

### UI States

Seven tabs in a segmented control (`role="tablist"`). Default tab on page load: "Fast activation". Clicking a tab:
1. Sets `aria-selected="true"` on the tab, `aria-selected="false"` on all others.
2. Swaps the panel content (text + key stat + CTA) with a 150ms crossfade.
3. Fires an analytics event.
4. The panel label updates to reflect the winning plan name.

On mobile, the tab strip scrolls horizontally (overflow-x: auto, no wrapping).

### SSOT-Sourced Panel Content (one per tab)

**Tab 1 — Fast activation**
- Winner: UnitedHealthcare Primary Dental
- Key stat: "Coverage can begin as soon as the day after your application is received."
- Source: `uhc-primary-dental.md` — activation field
- Caveat: "NOT guaranteed literal next business day" — panel says "as soon as the next day" (matches SSOT wording exactly)
- Supporting fact: ~$30/mo estimate, 100% preventive day one, $0 preventive deductible
- Skip-if: "Does not cover major work, implants, or orthodontics."

**Tab 2 — Kids braces**
- Winner: Guardian Premier PPO
- Key stat: "Child orthodontics covered at 60% after 12 months; $1,500 lifetime benefit."
- Source: `guardian-premier-ppo.md` — orthodontics field
- Supporting fact: ~$70/mo estimate, $3,000 annual max, 85% day-one basic (highest on shelf)
- Skip-if: "Adult orthodontics not covered on any Guardian individual plan."

**Tab 3 — Day-one major**
- Winner: Ameritas PrimeStar Care Complete
- Key stat: "Zero waiting period on all categories, including major work and implants."
- Source: `ameritas-primestar.md` — waiting_periods field ("NONE on any category")
- Supporting fact: ~$60/mo estimate, $2,000 max year one rising to $3,500, root canals and crowns covered from day one at 20% (rising to 50% after year one)
- Caveat: "Year-one major coverage is 20% in-network; rises to 50% after year one."

**Tab 4 — Implants**
- Winner: Humana Extend 5000
- Key stat: "$4,000 lifetime implant maximum. $5,000 annual maximum overall."
- Source: `humana-extend-5000.md` — implants field
- Supporting fact: ~$100/mo estimate, 50% year one / 60% year two+, $2,000/yr implant sub-cap
- Caveat: "6-month implant wait cannot be waived. One implant per tooth per 5 years."

**Tab 5 — High maximum**
- Winner: MetLife NCD Complete
- Key stat: "$10,000 annual maximum per person. One-time lifetime deductible of $100."
- Source: `metlife-ncd-complete.md` — annual_maximum and deductible fields
- Supporting fact: ~$100/mo estimate, no waiting periods on any category, basic 65/80/90 graduation, major 10/50/60 graduation
- Caveat: "Major coverage graduates to 60% only in year three. Premium is an estimate."

**Tab 6 — Seniors (65+)**
- Winner: Mutual of Omaha Dental Preferred
- Key stat: "No waiting period on major work. $5,000 annual maximum. $3,000 lifetime implant benefit."
- Source: `mutual-of-omaha-dental.md` — waiting_periods, annual_maximum, implants fields
- Supporting fact: ~$90/mo estimate, community-rated (age-neutral pricing), DenteMax Plus network (400,000+ locations), 80% basic day one
- Caveat: "Major coverage is 20% in year one, rising to 50% in year two. No orthodontic benefit."

**Tab 7 — Largest network**
- Winner: Delta Dental PPO Premium
- Key stat: "112,000+ in-network dentists at 278,000+ locations. Adult and child orthodontics both covered."
- Source: `delta-dental-ppo-premium.md` — network and orthodontics fields
- Supporting fact: ~$75/mo estimate, $2,000 annual max, $1,500 lifetime ortho per person
- Caveat: "Available in 16 states plus DC only. 6-month basic wait, 12-month major and ortho wait."

### Accessibility

- `role="tablist"` wrapping all seven tabs
- Each tab: `role="tab"`, `aria-selected`, `aria-controls="pse-panel"`
- Panel div: `role="tabpanel"`, `id="pse-panel"`, `aria-live="polite"` so screen readers announce content swap
- Arrow key navigation within tablist (left/right, wraps)
- Tab key exits the tablist to the panel

### Analytics Events

```javascript
gtag('event', 'pse_tab_click', {
  tab_label: 'Kids braces',   // human-readable tab name
  plan_winner: 'Guardian Premier PPO',
  section: 'plan_strength_explorer'
});
```

### No-JS Fallback

Without JS, the section renders as a visible `<dl>` list: seven `<dt>` need labels each followed by a `<dd>` with the winning plan name and key stat. All content remains readable. The tab styling degrades to a simple list. No information is hidden.

```html
<!-- no-js fallback class removed by JS on DOMContentLoaded -->
<section id="plan-strength-explorer" class="pse-noscript" ...>
```

### HTML + CSS + JS Skeleton

```html
<!-- ============================================================
     PLAN STRENGTH EXPLORER  — slot after #verify-1
     ============================================================ -->
<section id="plan-strength-explorer" aria-labelledby="pse-heading" class="pse-wrap">
  <div class="pse-inner">
    <p class="section-overline">Find your plan by need</p>
    <h2 id="pse-heading">Which plan is strongest for your situation?</h2>
    <p class="pse-lede">Pick your top priority. We surface the one plan that wins on that axis, with the SSOT fact that proves it.</p>

    <!-- Tab strip -->
    <div class="pse-tabs" role="tablist" aria-label="Plan strength by need">
      <button role="tab" aria-selected="true"  aria-controls="pse-panel" id="pse-tab-0" class="pse-tab active" data-tab="0">Fast activation</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-1" class="pse-tab" data-tab="1">Kids braces</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-2" class="pse-tab" data-tab="2">Day-one major</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-3" class="pse-tab" data-tab="3">Implants</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-4" class="pse-tab" data-tab="4">High maximum</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-5" class="pse-tab" data-tab="5">Seniors / 65+</button>
      <button role="tab" aria-selected="false" aria-controls="pse-panel" id="pse-tab-6" class="pse-tab" data-tab="6">Largest network</button>
    </div>

    <!-- Swappable panel -->
    <div id="pse-panel" role="tabpanel" aria-live="polite" class="pse-panel">
      <!-- JS renders content here -->
    </div>

    <!-- No-JS fallback (hidden once JS runs) -->
    <dl class="pse-noscript-list" id="pse-noscript">
      <dt>Fast activation</dt><dd>UnitedHealthcare Primary Dental — coverage as soon as the day after application received. ~$30/mo estimate.</dd>
      <dt>Kids braces</dt><dd>Guardian Premier PPO — child ortho 60%, $1,500 lifetime. ~$70/mo estimate.</dd>
      <dt>Day-one major</dt><dd>Ameritas PrimeStar Care Complete — zero waiting period on major, root canals, implants. ~$60/mo estimate.</dd>
      <dt>Implants</dt><dd>Humana Extend 5000 — $4,000 lifetime implant max, $5,000 annual max. ~$100/mo estimate.</dd>
      <dt>High maximum</dt><dd>MetLife NCD Complete — $10,000 annual max, $100 lifetime deductible. ~$100/mo estimate.</dd>
      <dt>Seniors / 65+</dt><dd>Mutual of Omaha Dental Preferred — no major wait, $5,000 max, community-rated. ~$90/mo estimate.</dd>
      <dt>Largest network</dt><dd>Delta Dental PPO Premium — 112,000+ in-network dentists, adult + child ortho. ~$75/mo estimate. 16 states + DC only.</dd>
    </dl>
  </div>
</section>

<style>
/* Plan Strength Explorer */
.pse-wrap {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  margin: 48px 0;
  padding: 40px 36px;
}
.pse-inner { max-width: 780px; margin: 0 auto; }
.pse-tabs {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin: 24px 0 0;
  scrollbar-width: thin;
}
.pse-tab {
  flex-shrink: 0;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  color: var(--ink-2);
  cursor: pointer;
  font: 500 13px/1 var(--font);
  padding: 8px 16px;
  transition: background .15s, color .15s, border-color .15s;
  white-space: nowrap;
}
.pse-tab:hover {
  background: var(--teal-tint);
  border-color: var(--teal);
  color: var(--teal-strong);
}
.pse-tab[aria-selected="true"],
.pse-tab.active {
  background: var(--teal);
  border-color: var(--teal);
  color: #fff;
}
.pse-panel {
  margin-top: 20px;
  min-height: 160px;
  transition: opacity .15s;
}
.pse-panel.fading { opacity: 0; }
/* Panel inner layout */
.pse-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: start;
  border: 1px solid var(--line);
  border-left: 4px solid var(--teal);
  border-radius: 8px;
  padding: 24px;
  background: var(--surface);
}
.pse-card-left .pse-need-label {
  font: 500 11px/1 var(--font);
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 6px;
}
.pse-card-left .pse-plan-name {
  font: 600 20px/1.2 var(--serif);
  color: var(--ink);
  margin-bottom: 12px;
}
.pse-card-left .pse-key-stat {
  font: 500 15px/1.5 var(--font);
  color: var(--ink-2);
  margin-bottom: 10px;
}
.pse-card-left .pse-premium {
  font: 400 13px/1 var(--font);
  color: var(--ink-3);
}
.pse-card-left .pse-caveat {
  margin-top: 12px;
  font: 400 12px/1.5 var(--font);
  color: var(--ink-3);
  border-top: 1px solid var(--line-soft);
  padding-top: 10px;
}
.pse-card-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 160px;
}
.pse-card-right .pse-cta-primary {
  background: var(--teal);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font: 600 13px/1 var(--font);
  padding: 12px 16px;
  text-align: center;
  text-decoration: none;
  display: block;
  transition: background .15s;
}
.pse-card-right .pse-cta-primary:hover { background: var(--teal-strong); }
.pse-card-right .pse-cta-secondary {
  color: var(--teal);
  font: 500 12px/1 var(--font);
  text-align: center;
  text-decoration: none;
  display: block;
  padding: 6px;
}
/* No-JS fallback */
.pse-noscript-list { display: none; }
.pse-noscript-visible .pse-noscript-list { display: block; }
.pse-noscript-visible .pse-tabs,
.pse-noscript-visible .pse-panel { display: none; }
@media (max-width: 600px) {
  .pse-card { grid-template-columns: 1fr; }
  .pse-wrap { padding: 24px 16px; }
}
</style>

<script>
(function () {
  'use strict';

  var PSE_DATA = [
    {
      tab: 'Fast activation',
      plan: 'UnitedHealthcare Primary Dental',
      anchor: '#uhc',
      needLabel: 'Fastest activation',
      keyStat: 'Coverage can begin as soon as the day after your application is received.',
      premium: '~/estimate $30/mo',
      supporting: '100% preventive from day one, $0 preventive deductible, $50 deductible on basic only.',
      caveat: 'Major work, implants, and orthodontics are not covered on this plan. Not sold in New York.'
    },
    {
      tab: 'Kids braces',
      plan: 'Guardian Premier PPO',
      anchor: '#guardian',
      needLabel: 'Best for kids’ braces',
      keyStat: 'Child orthodontics covered at 60% after 12 months. $1,500 lifetime benefit per child.',
      premium: '~/estimate $70/mo',
      supporting: '$3,000 annual maximum. Highest day-one basic coverage on this shelf: 85% in-network.',
      caveat: 'Adult orthodontics is not covered on any Guardian individual plan. 12-month enrollment minimum.'
    },
    {
      tab: 'Day-one major',
      plan: 'Ameritas PrimeStar Care Complete',
      anchor: '#ameritas',
      needLabel: 'No waiting period on major',
      keyStat: 'Zero waiting period on all categories: preventive, basic, major, and implants all available from day one.',
      premium: '~/estimate $60/mo',
      supporting: '$2,000 annual max year one, rising to $3,500 after year one. Root canals and crowns covered day one.',
      caveat: 'Year-one major coverage is 20% in-network, rising to 50% after year one. Orthodontics not covered on Care Complete.'
    },
    {
      tab: 'Implants',
      plan: 'Humana Extend 5000',
      anchor: '#humana',
      needLabel: 'Highest lifetime implant benefit',
      keyStat: '$4,000 lifetime implant maximum. $5,000 annual maximum for all covered dental combined.',
      premium: '~/estimate $100/mo',
      supporting: 'Implant coverage 50% year one, 60% year two and after. $2,000 per-year implant sub-cap.',
      caveat: '6-month implant waiting period cannot be waived. One implant per tooth per 5 years. Orthodontics not covered.'
    },
    {
      tab: 'High maximum',
      plan: 'MetLife NCD Complete',
      anchor: '#metlife',
      needLabel: 'Highest annual maximum',
      keyStat: '$10,000 annual maximum per person. One-time lifetime deductible of $100 (paid once, never again).',
      premium: '~/estimate $100/mo',
      supporting: 'No waiting period on any category. Basic coverage graduates from 65% to 90% over three years. Major from 10% to 60%.',
      caveat: 'Major coverage reaches 60% only in year three. Orthodontics and whitening not covered.'
    },
    {
      tab: 'Seniors / 65+',
      plan: 'Mutual of Omaha Dental Preferred',
      anchor: '#moo',
      needLabel: 'Best for seniors',
      keyStat: 'No waiting period on major work. $5,000 annual maximum. $3,000 lifetime implant benefit. Community-rated premium.',
      premium: '~/estimate $90/mo',
      supporting: '80% basic coverage from day one. DenteMax Plus network: 400,000+ provider locations. Age-neutral pricing.',
      caveat: 'Major coverage is 20% in year one, rising to 50% in year two. Orthodontics and whitening not covered.'
    },
    {
      tab: 'Largest network',
      plan: 'Delta Dental PPO Premium',
      anchor: '#delta',
      needLabel: 'Largest provider network',
      keyStat: '112,000+ in-network dentists at 278,000+ locations. Both adult and child orthodontics covered.',
      premium: '~/estimate $75/mo',
      supporting: '$2,000 annual maximum. $1,500 lifetime orthodontic benefit per person. 50% adult and child ortho after 12 months.',
      caveat: 'Available in 16 states plus DC only. 6-month basic wait. 12-month major and orthodontic wait.'
    }
  ];

  var wrap = document.getElementById('plan-strength-explorer');
  if (!wrap) return;

  // Hide no-JS fallback
  var noscript = document.getElementById('pse-noscript');
  if (noscript) noscript.style.display = 'none';

  var panel = document.getElementById('pse-panel');
  var tabs  = wrap.querySelectorAll('.pse-tab');

  function renderPanel(idx) {
    var d = PSE_DATA[idx];
    panel.innerHTML =
      '<div class="pse-card">' +
        '<div class="pse-card-left">' +
          '<p class="pse-need-label">' + escHtml(d.needLabel) + '</p>' +
          '<p class="pse-plan-name">' + escHtml(d.plan) + '</p>' +
          '<p class="pse-key-stat">' + escHtml(d.keyStat) + '</p>' +
          '<p class="pse-premium">' + escHtml(d.premium) + '</p>' +
          '<p class="pse-premium" style="margin-top:6px;">' + escHtml(d.supporting) + '</p>' +
          '<p class="pse-caveat">' + escHtml(d.caveat) + '</p>' +
        '</div>' +
        '<div class="pse-card-right">' +
          '<a href="/find-my-dentist" class="pse-cta-primary">Verify my dentist</a>' +
          '<a href="' + d.anchor + '" class="pse-cta-secondary">See full plan story</a>' +
        '</div>' +
      '</div>';
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function activate(idx) {
    tabs.forEach(function (t, i) {
      t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      t.classList.toggle('active', i === idx);
    });
    panel.classList.add('fading');
    setTimeout(function () {
      renderPanel(idx);
      panel.classList.remove('fading');
    }, 150);
    if (typeof gtag === 'function') {
      gtag('event', 'pse_tab_click', {
        tab_label: PSE_DATA[idx].tab,
        plan_winner: PSE_DATA[idx].plan,
        section: 'plan_strength_explorer'
      });
    }
  }

  // Arrow key navigation
  tabs.forEach(function (tab, idx) {
    tab.addEventListener('click', function () { activate(idx); });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); activate((idx + 1) % tabs.length); tabs[(idx + 1) % tabs.length].focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((idx + tabs.length - 1) % tabs.length); tabs[(idx + tabs.length - 1) % tabs.length].focus(); }
    });
  });

  // Initial render
  renderPanel(0);
})();
</script>
```

---

## Section B — Compare Any Two

### Purpose

The existing 8-column comparison table answers "how do all plans compare?" A visitor who has already narrowed to two candidates wants a head-to-head without scrolling through six extra columns. This widget lets them pick two plans from two dropdowns and renders a clean 6-row side-by-side. It replaces a common user journey: "open two tabs, manually compare" — keeping the visitor on-page longer and reducing bounce.

SEO angle: "compare [Plan A] vs [Plan B] dental insurance" is a high-intent, moderately competitive SERP query. This section generates readable comparison content for any pair, which crawlers can index. With 8 plans there are 28 possible pairs; all 28 are renderable from the same data object.

### Insertion Point

Immediately after `#compare-table` (the existing 8-column scrollable table). Slot as:

```html
<section id="compare-two" aria-labelledby="c2-heading">
```

### UI States

Two `<select>` dropdowns side by side. Default state: Plan A = UnitedHealthcare, Plan B = Aetna Dental Direct (the two most common first queries). If the user selects the same plan in both dropdowns, the comparison panel is replaced with an inline validation message: "Pick two different plans to compare." The 6-row table renders immediately on change, no submit button needed (`change` event listener on both selects).

Six comparison rows (labels identical to the main compare table for scannability):
1. Monthly premium estimate
2. Annual maximum
3. Waiting periods (condensed: "Preventive / Basic / Major")
4. Implants
5. Orthodontics
6. Best for (one-sentence strength label)

Each cell shows the value from the PLANS_C2 data object. Cells where one plan has a meaningful advantage get a subtle highlight (teal tint background) on the winning cell. Advantage logic is simple and explicitly defined per row (see JS below) -- no floating-point scoring, just literal comparisons.

### SSOT-Sourced Data Object (all 8 plans)

```javascript
var PLANS_C2 = {
  uhc: {
    name: 'UnitedHealthcare Primary Dental',
    premium: '~/estimate $30/mo',
    max: '$1,000/yr',
    maxNum: 1000,
    waits: 'Preventive: none | Basic: none | Major: not covered',
    implants: 'Not covered',
    ortho: 'Not covered',
    bestFor: 'Lowest cost, fast activation, preventive and basic only'
  },
  aetna: {
    name: 'Aetna Dental Direct',
    premium: '~/estimate $50/mo',
    max: '$1,250/yr',
    maxNum: 1250,
    waits: 'Preventive: none | Basic: 6 months | Major: 12 months',
    implants: 'Not covered',
    ortho: 'Not covered',
    bestFor: 'CVS ExtraCare rewards (~$120/yr value) plus solid basic coverage'
  },
  ameritas: {
    name: 'Ameritas PrimeStar Care Complete',
    premium: '~/estimate $60/mo',
    max: '$2,000 yr 1 / $3,500 yr 2+',
    maxNum: 2000,
    waits: 'Preventive: none | Basic: none | Major: none',
    implants: 'Covered day one; 20% yr 1, 50% yr 2+; $1,000/$1,500 sub-cap',
    ortho: 'Not covered',
    bestFor: 'No waiting period on anything, including root canals and implants'
  },
  guardian: {
    name: 'Guardian Premier PPO',
    premium: '~/estimate $70/mo',
    max: '$3,000/yr',
    maxNum: 3000,
    waits: 'Preventive: none | Basic: none | Major: 12 months',
    implants: 'Covered 60%; $1,250 lifetime max; 12-month wait',
    ortho: 'Child only: 60%, $1,500 lifetime; 12-month wait',
    bestFor: 'Kids braces, highest day-one basic coverage (85%)'
  },
  metlife: {
    name: 'MetLife NCD Complete',
    premium: '~/estimate $100/mo',
    max: '$10,000/yr',
    maxNum: 10000,
    waits: 'Preventive: none | Basic: none | Major: none',
    implants: 'Covered; 10% yr 1, 50% yr 2, 60% yr 3+; $3,000/yr sub-cap',
    ortho: 'Not covered',
    bestFor: 'Highest annual maximum, one-time lifetime deductible of $100'
  },
  moo: {
    name: 'Mutual of Omaha Dental Preferred',
    premium: '~/estimate $90/mo',
    max: '$5,000/yr',
    maxNum: 5000,
    waits: 'Preventive: none | Basic: none | Major: none',
    implants: 'Covered as major; 20% yr 1, 50% yr 2+; $3,000 lifetime sub-cap',
    ortho: 'Not covered',
    bestFor: 'Seniors, community-rated pricing, no major wait, large DenteMax Plus network'
  },
  humana: {
    name: 'Humana Extend 5000',
    premium: '~/estimate $100/mo',
    max: '$5,000/yr',
    maxNum: 5000,
    waits: 'Preventive: none | Basic: 90 days | Major: 6 months',
    implants: 'Covered; 50% yr 1, 60% yr 2+; $2,000/yr and $4,000 lifetime sub-caps',
    ortho: 'Not covered',
    bestFor: 'Highest implant lifetime benefit ($4,000), whitening allowance ($200/arch)'
  },
  delta: {
    name: 'Delta Dental PPO Premium',
    premium: '~/estimate $75/mo',
    max: '$2,000/yr',
    maxNum: 2000,
    waits: 'Preventive: none | Basic: 6 months | Major: 12 months',
    implants: 'Covered 50% after 12 months; shared $2,000 annual max',
    ortho: 'Adult and child: 50%, $1,500 lifetime; 12-month wait',
    bestFor: 'Largest provider network (112,000+ dentists), adult and child orthodontics'
  }
};
```

### Advantage Logic (explicit, no invented scoring)

- Monthly premium: lower `premiumNum` wins (highlight lower)
- Annual maximum: higher `maxNum` wins (highlight higher)
- Waiting periods: plan with "none" on all three categories wins; tie if equal; no highlight if both have waits
- Implants: plan that covers implants wins over "Not covered"; if both cover, no highlight (tie)
- Orthodontics: plan that covers ortho wins over "Not covered"; if both cover, no highlight (tie)
- Best for: no highlight (subjective)

### Accessibility

- Both selects have visible `<label>` elements associated via `for`/`id`
- The comparison table uses `<th scope="col">` for plan name headers and `<th scope="row">` for row labels
- `aria-live="polite"` on the table wrapper announces changes to screen readers
- The validation message "Pick two different plans to compare" is rendered inside the `aria-live` region

### Analytics Events

```javascript
gtag('event', 'c2_compare', {
  plan_a: 'guardian',
  plan_b: 'delta',
  section: 'compare_any_two'
});
```

### No-JS Fallback

Without JS, both selects and the empty panel are hidden via a `<noscript>` block that shows a static paragraph directing the user to the full comparison table above: "Use the comparison table above to evaluate all eight plans side by side."

### HTML + CSS + JS Skeleton

```html
<!-- ============================================================
     COMPARE ANY TWO  — slot immediately after #compare-table
     ============================================================ -->
<section id="compare-two" aria-labelledby="c2-heading" class="c2-wrap">
  <div class="c2-inner">
    <p class="section-overline">Quick head-to-head</p>
    <h2 id="c2-heading">Compare any two plans</h2>
    <p class="c2-lede">Pick two plans. Six key rows, side by side.</p>

    <noscript><p style="color:var(--ink-3);font-size:14px;">Use the comparison table above to evaluate all eight plans side by side.</p></noscript>

    <div class="c2-selects">
      <div class="c2-select-group">
        <label for="c2-plan-a" class="c2-select-label">Plan A</label>
        <select id="c2-plan-a" class="c2-select">
          <option value="uhc">UnitedHealthcare Primary Dental</option>
          <option value="aetna" selected>Aetna Dental Direct</option>
          <option value="ameritas">Ameritas PrimeStar Care Complete</option>
          <option value="guardian">Guardian Premier PPO</option>
          <option value="metlife">MetLife NCD Complete</option>
          <option value="moo">Mutual of Omaha Dental Preferred</option>
          <option value="humana">Humana Extend 5000</option>
          <option value="delta">Delta Dental PPO Premium</option>
        </select>
      </div>
      <div class="c2-vs-badge" aria-hidden="true">vs</div>
      <div class="c2-select-group">
        <label for="c2-plan-b" class="c2-select-label">Plan B</label>
        <select id="c2-plan-b" class="c2-select">
          <option value="uhc">UnitedHealthcare Primary Dental</option>
          <option value="aetna">Aetna Dental Direct</option>
          <option value="ameritas">Ameritas PrimeStar Care Complete</option>
          <option value="guardian" selected>Guardian Premier PPO</option>
          <option value="metlife">MetLife NCD Complete</option>
          <option value="moo">Mutual of Omaha Dental Preferred</option>
          <option value="humana">Humana Extend 5000</option>
          <option value="delta">Delta Dental PPO Premium</option>
        </select>
      </div>
    </div>

    <div id="c2-result" aria-live="polite" class="c2-result">
      <!-- JS renders table here -->
    </div>
  </div>
</section>

<style>
.c2-wrap {
  margin: 48px 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 40px 36px;
}
.c2-inner { max-width: 780px; margin: 0 auto; }
.c2-selects {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin: 24px 0;
  flex-wrap: wrap;
}
.c2-select-group { flex: 1; min-width: 200px; }
.c2-select-label {
  display: block;
  font: 500 12px/1 var(--font);
  color: var(--ink-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.c2-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font: 500 14px/1.2 var(--font);
  cursor: pointer;
  appearance: auto;
}
.c2-select:focus { outline: 2px solid var(--teal); outline-offset: 2px; }
.c2-vs-badge {
  font: 700 16px/1 var(--serif);
  color: var(--ink-3);
  padding-bottom: 12px;
  flex-shrink: 0;
}
.c2-result { overflow-x: auto; }
.c2-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  font: 400 14px/1.5 var(--font);
}
.c2-table th, .c2-table td {
  padding: 12px 14px;
  border: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}
.c2-table thead th {
  background: var(--surface-2);
  font: 600 14px/1.2 var(--font);
  color: var(--ink);
}
.c2-table thead th:first-child { background: transparent; border: none; }
.c2-table tbody th {
  background: var(--surface-2);
  font: 500 13px/1.3 var(--font);
  color: var(--ink-2);
  width: 140px;
}
.c2-table td.c2-win {
  background: var(--covered-tint);
  color: var(--covered-ink);
  font-weight: 500;
}
.c2-error {
  padding: 16px;
  background: var(--warning-tint);
  border: 1px solid var(--partial);
  border-radius: 8px;
  color: var(--partial-ink);
  font: 500 14px/1.4 var(--font);
}
@media (max-width: 600px) {
  .c2-wrap { padding: 24px 16px; }
  .c2-selects { flex-direction: column; }
  .c2-vs-badge { padding-bottom: 0; }
}
</style>

<script>
(function () {
  'use strict';

  var PLANS_C2 = {
    uhc:     { name:'UnitedHealthcare Primary Dental', premiumLabel:'~/estimate $30/mo', premiumNum:30, maxLabel:'$1,000/yr', maxNum:1000, waits:'Preventive: none | Basic: none | Major: not covered', implants:'Not covered', ortho:'Not covered', bestFor:'Lowest cost, fast activation, preventive and basic only' },
    aetna:   { name:'Aetna Dental Direct', premiumLabel:'~/estimate $50/mo', premiumNum:50, maxLabel:'$1,250/yr', maxNum:1250, waits:'Preventive: none | Basic: 6 months | Major: 12 months', implants:'Not covered', ortho:'Not covered', bestFor:'CVS ExtraCare rewards plus solid basic coverage' },
    ameritas:{ name:'Ameritas PrimeStar Care Complete', premiumLabel:'~/estimate $60/mo', premiumNum:60, maxLabel:'$2,000 yr 1 / $3,500 yr 2+', maxNum:2000, waits:'Preventive: none | Basic: none | Major: none', implants:'Covered day one; 20% yr 1, 50% yr 2+; $1,000/$1,500 sub-cap', ortho:'Not covered', bestFor:'No waiting period on anything, including root canals and implants' },
    guardian:{ name:'Guardian Premier PPO', premiumLabel:'~/estimate $70/mo', premiumNum:70, maxLabel:'$3,000/yr', maxNum:3000, waits:'Preventive: none | Basic: none | Major: 12 months', implants:'Covered 60%; $1,250 lifetime max; 12-month wait', ortho:'Child only: 60%, $1,500 lifetime; 12-month wait', bestFor:'Kids braces, highest day-one basic coverage (85%)' },
    metlife: { name:'MetLife NCD Complete', premiumLabel:'~/estimate $100/mo', premiumNum:100, maxLabel:'$10,000/yr', maxNum:10000, waits:'Preventive: none | Basic: none | Major: none', implants:'Covered; 10% yr 1, 50% yr 2, 60% yr 3+; $3,000/yr sub-cap', ortho:'Not covered', bestFor:'Highest annual maximum ($10,000), one-time lifetime deductible of $100' },
    moo:     { name:'Mutual of Omaha Dental Preferred', premiumLabel:'~/estimate $90/mo', premiumNum:90, maxLabel:'$5,000/yr', maxNum:5000, waits:'Preventive: none | Basic: none | Major: none', implants:'Covered as major; 20% yr 1, 50% yr 2+; $3,000 lifetime sub-cap', ortho:'Not covered', bestFor:'Seniors, community-rated pricing, no major wait, large network' },
    humana:  { name:'Humana Extend 5000', premiumLabel:'~/estimate $100/mo', premiumNum:100, maxLabel:'$5,000/yr', maxNum:5000, waits:'Preventive: none | Basic: 90 days | Major: 6 months', implants:'Covered; 50% yr 1, 60% yr 2+; $2,000/yr and $4,000 lifetime sub-caps', ortho:'Not covered', bestFor:'Highest implant lifetime benefit ($4,000), whitening allowance ($200/arch)' },
    delta:   { name:'Delta Dental PPO Premium', premiumLabel:'~/estimate $75/mo', premiumNum:75, maxLabel:'$2,000/yr', maxNum:2000, waits:'Preventive: none | Basic: 6 months | Major: 12 months', implants:'Covered 50% after 12 months; shared $2,000 annual max', ortho:'Adult and child: 50%, $1,500 lifetime; 12-month wait', bestFor:'Largest provider network (112,000+ dentists), adult and child orthodontics' }
  };

  var selA = document.getElementById('c2-plan-a');
  var selB = document.getElementById('c2-plan-b');
  var result = document.getElementById('c2-result');
  if (!selA || !selB || !result) return;

  // Default selections
  selA.value = 'aetna';
  selB.value = 'guardian';

  function render() {
    var ka = selA.value;
    var kb = selB.value;
    if (ka === kb) {
      result.innerHTML = '<p class="c2-error">Pick two different plans to compare.</p>';
      return;
    }
    var a = PLANS_C2[ka];
    var b = PLANS_C2[kb];

    // Advantage flags (true = A wins, false = B wins, null = tie)
    var advPremium = a.premiumNum < b.premiumNum ? 'a' : (b.premiumNum < a.premiumNum ? 'b' : null);
    var advMax     = a.maxNum > b.maxNum ? 'a' : (b.maxNum > a.maxNum ? 'b' : null);
    var aHasNoWait = a.waits.indexOf('Major: none') !== -1;
    var bHasNoWait = b.waits.indexOf('Major: none') !== -1;
    var advWaits   = (aHasNoWait && !bHasNoWait) ? 'a' : (!aHasNoWait && bHasNoWait) ? 'b' : null;
    var aImplants  = a.implants !== 'Not covered';
    var bImplants  = b.implants !== 'Not covered';
    var advImpl    = (aImplants && !bImplants) ? 'a' : (!aImplants && bImplants) ? 'b' : null;
    var aOrtho     = a.ortho !== 'Not covered';
    var bOrtho     = b.ortho !== 'Not covered';
    var advOrtho   = (aOrtho && !bOrtho) ? 'a' : (!aOrtho && bOrtho) ? 'b' : null;

    function cls(adv, side) { return adv === side ? ' class="c2-win"' : ''; }

    result.innerHTML =
      '<table class="c2-table">' +
        '<thead><tr>' +
          '<th></th>' +
          '<th scope="col">' + escHtml(a.name) + '</th>' +
          '<th scope="col">' + escHtml(b.name) + '</th>' +
        '</tr></thead>' +
        '<tbody>' +
          '<tr><th scope="row">Monthly premium</th><td' + cls(advPremium,'a') + '>' + escHtml(a.premiumLabel) + '</td><td' + cls(advPremium,'b') + '>' + escHtml(b.premiumLabel) + '</td></tr>' +
          '<tr><th scope="row">Annual maximum</th><td' + cls(advMax,'a') + '>' + escHtml(a.maxLabel) + '</td><td' + cls(advMax,'b') + '>' + escHtml(b.maxLabel) + '</td></tr>' +
          '<tr><th scope="row">Waiting periods</th><td' + cls(advWaits,'a') + '>' + escHtml(a.waits).replace(/\|/g,'<br>') + '</td><td' + cls(advWaits,'b') + '>' + escHtml(b.waits).replace(/\|/g,'<br>') + '</td></tr>' +
          '<tr><th scope="row">Implants</th><td' + cls(advImpl,'a') + '>' + escHtml(a.implants) + '</td><td' + cls(advImpl,'b') + '>' + escHtml(b.implants) + '</td></tr>' +
          '<tr><th scope="row">Orthodontics</th><td' + cls(advOrtho,'a') + '>' + escHtml(a.ortho) + '</td><td' + cls(advOrtho,'b') + '>' + escHtml(b.ortho) + '</td></tr>' +
          '<tr><th scope="row">Best for</th><td>' + escHtml(a.bestFor) + '</td><td>' + escHtml(b.bestFor) + '</td></tr>' +
        '</tbody>' +
      '</table>';

    if (typeof gtag === 'function') {
      gtag('event', 'c2_compare', { plan_a: ka, plan_b: kb, section: 'compare_any_two' });
    }
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  selA.addEventListener('change', render);
  selB.addEventListener('change', render);
  render(); // initial
})();
</script>
```

---

## Section C — Coverage Row Explorer

### Purpose

"What does X% coverage actually mean for my crown?" is the most common comprehension gap in dental insurance. Visitors understand percentages in the abstract but cannot easily translate "50% major after 12 months" into "your out-of-pocket cost on a $1,200 crown." This section presents an interactive row of coverage scenarios: the visitor picks a procedure type (Cleaning / Filling / Crown / Root canal / Implant / Braces), and the section reveals how each plan handles that procedure, presented as a scannable card row with a simplified cost estimate alongside the SSOT coverage percentage.

SEO angle: "how much does dental insurance cover for a crown" and related procedure-cost queries drive significant organic traffic. An interactive answered section targeting each procedure type earns rich-result eligibility via FAQ schema and positions the page for "Patients also ask" captures.

This section is LIGHTER than the other two: no comparison table, just a 4-row visual that answers one question at a time. It does not require the visitor to pick a plan first.

### Insertion Point

Immediately after `#best-for` (the Best For Grid), before `#waiting` (Waiting Periods editorial prose). The waiting-periods section that follows provides the editorial depth that contextualizes what the explorer just surfaced. Slot as:

```html
<section id="coverage-explorer" aria-labelledby="cex-heading">
```

### UI States

Six procedure buttons in a segmented control. Default: "Crown". Clicking a button swaps four coverage rows beneath it. Each row shows:
- Plan name (abbreviated)
- Coverage percentage from SSOT (labeled as from verified data)
- A simplified cost estimate cell: "Your share on a $X average" where X is a realistic national average for that procedure (sourced from ADA / FAIR Health public data, labeled "national avg estimate")
- A wait badge: "No wait" (green) or "X-month wait" (amber)

### SSOT Coverage Values Per Procedure

All percentages are the plan-pays percentage from the relevant SSOT field. Cost estimates use round numbers from publicly reported ADA/FAIR Health averages; labeled as "~/national avg estimate." The member-pays cost = (100% - plan_pays%) x avg_cost, rounded to nearest $10.

**Cleaning (preventive)**
All eight plans: 100% in-network, no wait, no deductible.
Row: "All 8 plans cover routine cleanings at 100% in-network from day one."
No individual breakdown needed; renders as a single full-width callout.

**Filling (basic)**
Avg cost estimate: ~$200.
| Plan | Plan pays | Your share (est) | Wait |
|------|-----------|------------------|------|
| UHC Primary | 50% yr 1 | ~/~$100 | No wait |
| Aetna | 80% | ~/~$40 | 6 months |
| Ameritas | 80% yr 1 | ~/~$40 | No wait |
| Guardian | 85% | ~/~$30 | No wait |
| MetLife NCD | 65% yr 1 | ~/~$70 | No wait |
| MOO | 80% | ~/~$40 | No wait |
| Humana | 80% | ~/~$40 | 90 days |
| Delta Dental | 80% | ~/~$40 | 6 months |

**Crown (major)**
Avg cost estimate: ~$1,200.
| Plan | Plan pays | Your share (est) | Wait |
|------|-----------|------------------|------|
| UHC Primary | Not covered | Full cost | -- |
| Aetna | 50% | ~/~$600 | 12 months |
| Ameritas | 20% yr 1 | ~/~$960 | No wait |
| Guardian | 60% | ~/~$480 | 12 months |
| MetLife NCD | 10% yr 1 | ~/~$1,080 | No wait |
| MOO | 20% yr 1 | ~/~$960 | No wait |
| Humana | 50% yr 1 | ~/~$600 | 6 months |
| Delta Dental | 50% | ~/~$600 | 12 months |

Note: MetLife yr-1 major is 10%; yr-2 50%; yr-3+ 60%. MOO yr-1 is 20%; yr-2+ 50%. Panel shows yr-1 figures with a footnote.

**Root canal (major)**
Avg cost estimate: ~$1,000.
Same major percentages as Crown. UHC not covered.

**Implant**
Avg cost estimate: ~$3,500 (surgical placement + crown; FAIR Health).
| Plan | Plan pays | Your share (est) | Wait |
|------|-----------|------------------|------|
| UHC Primary | Not covered | Full cost | -- |
| Aetna | Not covered | Full cost | -- |
| Ameritas | 20% yr 1 | ~/~$2,800 | No wait |
| Guardian | 60% | ~/~$1,400 | 12 months |
| MetLife NCD | 10% yr 1 | ~/~$3,150 | No wait |
| MOO | 20% yr 1 | ~/~$2,800 | No wait |
| Humana | 50% yr 1 | ~/~$1,750 | 6 months (cannot waive) |
| Delta Dental | 50% | ~/~$1,750 | 12 months |

**Braces (orthodontics)**
Avg cost estimate: ~$5,000.
| Plan | Plan pays | Your share (est) | Wait |
|------|-----------|------------------|------|
| UHC Primary | Not covered | Full cost | -- |
| Aetna | Not covered | Full cost | -- |
| Ameritas | Not covered | Full cost | -- |
| Guardian | 60% child only | ~/~$2,000 | 12 months |
| MetLife NCD | Not covered | Full cost | -- |
| MOO | Not covered | Full cost | -- |
| Humana | Not covered | Full cost | -- |
| Delta Dental | 50% adult + child | ~/~$2,500 | 12 months |

Footnote on "Your share" cells: "Estimate only. Actual cost depends on your dentist's fee, your location, and whether you have met your annual deductible. Source: national average figures."

### Accessibility

- Procedure buttons: `role="radiogroup"` + `role="radio"` per button, `aria-checked`
- `aria-live="polite"` on the rows container
- The footnote is associated via `aria-describedby` on each estimate cell
- The "Not covered" state uses `--notcov` color token (never red, which implies error)
- Wait badges use `--covered` (green) for no-wait and `--partial` (amber) for waits to match the existing design system

### Analytics Events

```javascript
gtag('event', 'cex_procedure_select', {
  procedure: 'crown',
  section: 'coverage_explorer'
});
```

### No-JS Fallback

Without JS, the section renders as a static `<details>` accordion: one `<details>` per procedure, each containing the full table. All content is accessible without interaction.

### HTML + CSS + JS Skeleton

```html
<!-- ============================================================
     COVERAGE ROW EXPLORER  — slot after #best-for
     ============================================================ -->
<section id="coverage-explorer" aria-labelledby="cex-heading" class="cex-wrap">
  <div class="cex-inner">
    <p class="section-overline">What does it actually pay?</p>
    <h2 id="cex-heading">How much does each plan cover for common procedures?</h2>
    <p class="cex-lede">Pick a procedure. See what each plan pays and your estimated share based on national average costs.</p>
    <p class="cex-disclaimer" id="cex-disc">Cost estimates use national averages and are not guarantees. Actual costs vary by dentist, location, and whether your deductible is met.</p>

    <!-- Procedure selector -->
    <div class="cex-procs" role="radiogroup" aria-label="Select a procedure">
      <button role="radio" aria-checked="false" class="cex-proc" data-proc="cleaning">Cleaning</button>
      <button role="radio" aria-checked="false" class="cex-proc" data-proc="filling">Filling</button>
      <button role="radio" aria-checked="true"  class="cex-proc active" data-proc="crown">Crown</button>
      <button role="radio" aria-checked="false" class="cex-proc" data-proc="rootcanal">Root canal</button>
      <button role="radio" aria-checked="false" class="cex-proc" data-proc="implant">Implant</button>
      <button role="radio" aria-checked="false" class="cex-proc" data-proc="braces">Braces</button>
    </div>

    <!-- Result rows -->
    <div id="cex-rows" aria-live="polite" class="cex-rows">
      <!-- JS renders here -->
    </div>

    <!-- No-JS fallback -->
    <noscript>
      <p>Enable JavaScript to use the interactive explorer. Key facts: all 8 plans cover cleanings at 100%. Guardian has the highest day-one filling rate (85%). Ameritas is the only plan with zero waiting period on crowns and root canals. Only Guardian and Delta Dental cover orthodontics.</p>
    </noscript>
  </div>
</section>

<style>
.cex-wrap {
  margin: 48px 0;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 40px 36px;
}
.cex-inner { max-width: 780px; margin: 0 auto; }
.cex-disclaimer {
  font: 400 12px/1.5 var(--font);
  color: var(--ink-faint);
  margin: 8px 0 20px;
}
.cex-procs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.cex-proc {
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  color: var(--ink-2);
  cursor: pointer;
  font: 500 13px/1 var(--font);
  padding: 8px 18px;
  transition: background .15s, color .15s;
}
.cex-proc:hover { background: var(--teal-tint); border-color: var(--teal); color: var(--teal-strong); }
.cex-proc[aria-checked="true"], .cex-proc.active {
  background: var(--teal);
  border-color: var(--teal);
  color: #fff;
}
.cex-rows { transition: opacity .15s; }
.cex-rows.fading { opacity: 0; }

/* Cleaning full-width callout */
.cex-callout {
  background: var(--covered-tint);
  border: 1px solid var(--covered);
  border-radius: 10px;
  padding: 20px 24px;
  color: var(--covered-ink);
  font: 500 15px/1.5 var(--font);
}

/* Rows table */
.cex-table {
  width: 100%;
  border-collapse: collapse;
  font: 400 14px/1.4 var(--font);
}
.cex-table th, .cex-table td {
  padding: 10px 12px;
  border: 1px solid var(--line);
  vertical-align: middle;
}
.cex-table thead th {
  background: var(--surface-2);
  font: 600 13px/1 var(--font);
  color: var(--ink-2);
  text-transform: uppercase;
  letter-spacing: .04em;
}
.cex-table tbody tr:hover { background: var(--surface-2); }
.cex-badge-nowait {
  background: var(--covered-tint);
  color: var(--covered-ink);
  border-radius: 12px;
  font: 600 11px/1 var(--font);
  padding: 3px 8px;
  white-space: nowrap;
}
.cex-badge-wait {
  background: var(--partial-tint);
  color: var(--partial-ink);
  border-radius: 12px;
  font: 600 11px/1 var(--font);
  padding: 3px 8px;
  white-space: nowrap;
}
.cex-badge-none {
  background: var(--notcov-tint);
  color: var(--notcov-ink);
  border-radius: 12px;
  font: 600 11px/1 var(--font);
  padding: 3px 8px;
}
.cex-footnote {
  font: 400 12px/1.5 var(--font);
  color: var(--ink-faint);
  margin-top: 10px;
}
@media (max-width: 600px) {
  .cex-wrap { padding: 24px 16px; }
  .cex-table { font-size: 12px; }
  .cex-table th, .cex-table td { padding: 8px 8px; }
}
</style>

<script>
(function () {
  'use strict';

  // SSOT-sourced data. Plan pays % = what the insurance pays.
  // memberShare = round((1 - planPays) * avgCost / 10) * 10
  // notCovered = true means plan does not cover this procedure at all.
  var CEX_DATA = {
    cleaning: { label: 'Cleaning (preventive)', avg: null, fullWidth: 'All 8 plans cover routine cleanings at 100% in-network from day one, with no deductible and no waiting period. This benefit does not count against your annual maximum on most plans.', rows: [] },
    filling: {
      label: 'Filling (basic service)', avg: 200,
      rows: [
        { plan:'UHC Primary',     pct:'50% year 1',  share:100, wait:'No wait' },
        { plan:'Aetna',           pct:'80%',          share:40,  wait:'6 months' },
        { plan:'Ameritas',        pct:'80% year 1',   share:40,  wait:'No wait' },
        { plan:'Guardian',        pct:'85%',          share:30,  wait:'No wait' },
        { plan:'MetLife NCD',     pct:'65% year 1',   share:70,  wait:'No wait' },
        { plan:'Mutual of Omaha', pct:'80%',          share:40,  wait:'No wait' },
        { plan:'Humana',          pct:'80%',          share:40,  wait:'90 days' },
        { plan:'Delta Dental',    pct:'80%',          share:40,  wait:'6 months' }
      ]
    },
    crown: {
      label: 'Crown (major service)', avg: 1200,
      footnote: 'MetLife NCD major coverage graduates: 10% year 1, 50% year 2, 60% year 3+. Mutual of Omaha: 20% year 1, 50% year 2+. Estimates shown for year one.',
      rows: [
        { plan:'UHC Primary',     notCovered:true,   wait:'--' },
        { plan:'Aetna',           pct:'50%',          share:600,  wait:'12 months' },
        { plan:'Ameritas',        pct:'20% year 1',   share:960,  wait:'No wait' },
        { plan:'Guardian',        pct:'60%',          share:480,  wait:'12 months' },
        { plan:'MetLife NCD',     pct:'10% year 1',   share:1080, wait:'No wait' },
        { plan:'Mutual of Omaha', pct:'20% year 1',   share:960,  wait:'No wait' },
        { plan:'Humana',          pct:'50% year 1',   share:600,  wait:'6 months' },
        { plan:'Delta Dental',    pct:'50%',          share:600,  wait:'12 months' }
      ]
    },
    rootcanal: {
      label: 'Root canal (major service)', avg: 1000,
      footnote: 'MetLife NCD major coverage graduates: 10% year 1, 50% year 2, 60% year 3+. Mutual of Omaha: 20% year 1, 50% year 2+. Estimates shown for year one.',
      rows: [
        { plan:'UHC Primary',     notCovered:true,   wait:'--' },
        { plan:'Aetna',           pct:'50%',          share:500,  wait:'12 months' },
        { plan:'Ameritas',        pct:'20% year 1',   share:800,  wait:'No wait' },
        { plan:'Guardian',        pct:'60%',          share:400,  wait:'12 months' },
        { plan:'MetLife NCD',     pct:'10% year 1',   share:900,  wait:'No wait' },
        { plan:'Mutual of Omaha', pct:'20% year 1',   share:800,  wait:'No wait' },
        { plan:'Humana',          pct:'50% year 1',   share:500,  wait:'6 months' },
        { plan:'Delta Dental',    pct:'50%',          share:500,  wait:'12 months' }
      ]
    },
    implant: {
      label: 'Implant (surgical + crown)', avg: 3500,
      footnote: 'Implant estimates are for surgical placement plus crown combined. Sub-caps apply: Ameritas $1,000/$1,500 sub-cap deducted from annual max; Humana $2,000/yr and $4,000 lifetime; MetLife $3,000/yr; Mutual of Omaha $3,000 lifetime; Guardian $1,250 lifetime. Estimates do not reflect sub-cap limits. Year-one figures shown.',
      rows: [
        { plan:'UHC Primary',     notCovered:true,   wait:'--' },
        { plan:'Aetna',           notCovered:true,   wait:'--' },
        { plan:'Ameritas',        pct:'20% year 1',   share:2800, wait:'No wait' },
        { plan:'Guardian',        pct:'60%',          share:1400, wait:'12 months' },
        { plan:'MetLife NCD',     pct:'10% year 1',   share:3150, wait:'No wait' },
        { plan:'Mutual of Omaha', pct:'20% year 1',   share:2800, wait:'No wait' },
        { plan:'Humana',          pct:'50% year 1',   share:1750, wait:'6 months (cannot waive)' },
        { plan:'Delta Dental',    pct:'50%',          share:1750, wait:'12 months' }
      ]
    },
    braces: {
      label: 'Braces / orthodontics', avg: 5000,
      footnote: 'Guardian covers child orthodontics only (dependents under 19). Delta Dental PPO Premium covers both adult and child. All other plans listed here do not cover orthodontics.',
      rows: [
        { plan:'UHC Primary',     notCovered:true,   wait:'--' },
        { plan:'Aetna',           notCovered:true,   wait:'--' },
        { plan:'Ameritas',        notCovered:true,   wait:'--' },
        { plan:'Guardian',        pct:'60% (child only)', share:2000, wait:'12 months' },
        { plan:'MetLife NCD',     notCovered:true,   wait:'--' },
        { plan:'Mutual of Omaha', notCovered:true,   wait:'--' },
        { plan:'Humana',          notCovered:true,   wait:'--' },
        { plan:'Delta Dental',    pct:'50% (adult + child)', share:2500, wait:'12 months' }
      ]
    }
  };

  var rowsEl  = document.getElementById('cex-rows');
  var buttons = document.querySelectorAll('.cex-proc');
  if (!rowsEl || !buttons.length) return;

  function waitBadge(w) {
    if (!w || w === '--') return '<span class="cex-badge-none">N/A</span>';
    if (w === 'No wait') return '<span class="cex-badge-nowait">No wait</span>';
    return '<span class="cex-badge-wait">' + escHtml(w) + '</span>';
  }

  function render(proc) {
    var d = CEX_DATA[proc];
    if (!d) return;

    if (d.fullWidth) {
      rowsEl.innerHTML = '<div class="cex-callout">' + escHtml(d.fullWidth) + '</div>';
      return;
    }

    var avgStr = d.avg ? '$' + d.avg.toLocaleString() : '';
    var html = '<table class="cex-table">' +
      '<thead><tr>' +
        '<th scope="col">Plan</th>' +
        '<th scope="col">Plan pays</th>' +
        '<th scope="col">Your share on ' + avgStr + ' avg (~/estimate)</th>' +
        '<th scope="col">Wait</th>' +
      '</tr></thead><tbody>';

    d.rows.forEach(function (r) {
      if (r.notCovered) {
        html += '<tr><td>' + escHtml(r.plan) + '</td>' +
          '<td><span class="cex-badge-none">Not covered</span></td>' +
          '<td style="color:var(--notcov-ink);">Full cost</td>' +
          '<td>' + waitBadge(r.wait) + '</td></tr>';
      } else {
        html += '<tr><td>' + escHtml(r.plan) + '</td>' +
          '<td>' + escHtml(r.pct) + '</td>' +
          '<td>~/~$' + r.share.toLocaleString() + '</td>' +
          '<td>' + waitBadge(r.wait) + '</td></tr>';
      }
    });

    html += '</tbody></table>';
    if (d.footnote) {
      html += '<p class="cex-footnote" aria-describedby="cex-disc">' + escHtml(d.footnote) + '</p>';
    }
    rowsEl.innerHTML = html;

    if (typeof gtag === 'function') {
      gtag('event', 'cex_procedure_select', { procedure: proc, section: 'coverage_explorer' });
    }
  }

  function activate(btn) {
    buttons.forEach(function (b) {
      b.setAttribute('aria-checked', 'false');
      b.classList.remove('active');
    });
    btn.setAttribute('aria-checked', 'true');
    btn.classList.add('active');
    rowsEl.classList.add('fading');
    setTimeout(function () {
      render(btn.dataset.proc);
      rowsEl.classList.remove('fading');
    }, 150);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { activate(btn); });
  });

  // Default: crown
  var defaultBtn = document.querySelector('.cex-proc[data-proc="crown"]');
  if (defaultBtn) activate(defaultBtn);

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();
</script>
```

---

## Summary of All Three Sections

| Section | ID | Slot | Primary gain |
|---------|----|------|-------------|
| Plan Strength Explorer | `#plan-strength-explorer` | After `#verify-1` | Need-based self-selection; 7 SERP query targets |
| Compare Any Two | `#compare-two` | After `#compare-table` | 28 possible pair comparisons on-page; reduces bounce |
| Coverage Row Explorer | `#coverage-explorer` | After `#best-for` | Procedure-cost comprehension; 6 additional SERP targets |

Each section:
- Sources facts only from the 8 SSOT `.md` files (no invented numbers)
- Uses existing CSS design tokens exclusively (no new color variables)
- Degrades gracefully without JavaScript
- Fires named `gtag` events for analytics
- Meets WCAG 2.1 AA via radiogroup/tablist patterns, `aria-live` regions, and visible labels
- Contains no em-dashes, no roman numerals in copy, and no stored user data beyond sessionStorage
- Respects all SSOT `do_not` flags (UHC not in NY noted, Delta 16 states noted, implant wait caveats present, adult ortho Guardian exclusion present, MOO activation unverified so omitted)
