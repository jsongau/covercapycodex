# 02 — Dynamic Right-Rail Architecture: Contextual Plan Spotlight

**Agent:** 02 of 15  
**Target file:** `dental-insurance/ppo-plans/index.html`  
**Workstream:** Phase 2.5 hub rebuild  
**Date:** 2026-06-26

---

## Overview

The static Aetna/CVS spotlight block (lines 1031-1036 in the current hub) is replaced by a single "plan spotlight" rail card whose content swaps in real time based on visitor context. Aetna is one of eight plans, never permanently featured. The persistent "Find my dentist" verify card stays above it, unchanged.

---

## Context Priority Model

Three event sources feed the rail, resolved in strict priority order. When a higher-priority signal fires, it wins immediately (with debounce). When context is lost or unavailable, a timed default rotation runs.

```
Priority 1 (highest): Scenario-finder result
  Source: render() fires applyMatch(route.hero)
  Signal: cc_hero_plan stored in sessionStorage

Priority 2: Left-rail scenario/filter selection
  Source: left-rail plan nav links (data-plan attr on .rl-nav a)
            filter pills (.filt-pill[aria-checked="true"])
  Signal: the plan slug most recently activated

Priority 3: IntersectionObserver scroll context
  Source: existing storyObs watching .tour-stop[data-plan]
  Signal: which plan story is currently centred in the viewport

Fallback (no context): default rotation
  Cycles through all 8 plans in a fixed sequence, 8-second dwell
  Pauses on user hover/focus
  Restarts from the beginning each session
```

---

## State Machine

```
STATE: { priority, slug, locked, rotationTimer, rotationIndex }

TRANSITIONS:
  ON scenario_result(slug)  -> set priority=1, slug=slug, locked=false
                               stopRotation(); swapCard(slug); debounce 0ms
  ON left_rail_select(slug) -> if(priority < 2) set priority=2, slug=slug
                               stopRotation(); swapCard(slug); debounce 0ms
  ON filter_activate()      -> derive slug from filter; if(priority < 2) same as above
  ON scroll_observe(slug)   -> if(priority < 3) set priority=3, slug=slug
                               swapCard(slug); debounce 400ms
  ON scenario_reset()       -> set priority=0; startRotation()
  ON page_load              -> if(cc_hero_plan in sessionStorage) restore priority=1
                               else startRotation()

DEBOUNCE: scroll events coalesced to 400ms; user clicks are instant (0ms)
LOCK: when user clicks "See full plan review" CTA in the card, set locked=true
      locked=true blocks priority <= 2 transitions until next scroll event
```

---

## PLAN_SPOTLIGHT Data Object

Pull this verbatim from SSOT files. All facts are SSOT-cited with the field name.

```javascript
var PLAN_SPOTLIGHT = {
  'uhc-primary-dental': {
    eyebrow: 'Fastest to activate',
    headline: 'Start for about $1 a day, preventive from day one',
    fact: 'Coverage can begin as soon as the day after your application is received',
    // Source: uhc-primary-dental.md > activation field
    // (Golden Rule policy language "day after receipt by Golden Rule Insurance Company")
    factLabel: 'Activation',
    url: '/dental-insurance/ppo-plans/uhc-primary-dental/',
    verifyUrl: '/find-my-dentist?plan=uhc-primary-dental',
    anchor: '#stop-uhc',
    doNotNote: 'Do not say guaranteed next business day. SSOT: "coverage can start as soon as the day after."'
  },
  'guardian-premier-ppo': {
    eyebrow: 'Best for families with kids',
    headline: '85% on fillings from day one, plus child braces covered',
    fact: '85% in-network on fillings and extractions from day one, the highest day-one basic payout on the CoverCapy shelf',
    // Source: guardian-premier-ppo.md > coverage_basic field
    factLabel: 'Day-one basic coverage',
    url: '/dental-insurance/ppo-plans/guardian-premier-ppo/',
    verifyUrl: '/find-my-dentist?plan=guardian-premier-ppo',
    anchor: '#stop-guardian',
    doNotNote: 'Do not say adult orthodontics is covered. Child ortho only, dependents under 19. SSOT: orthodontics field.'
  },
  'ameritas-primestar': {
    eyebrow: 'Zero waiting periods',
    headline: 'Root canals and crowns eligible from day one',
    fact: 'No waiting periods on any category, including implants. Coverage can begin as soon as tomorrow',
    // Source: ameritas-primestar.md > waiting_periods field ("None on any category") + activation field
    factLabel: 'Waiting periods',
    url: '/dental-insurance/ppo-plans/ameritas-primestar/',
    verifyUrl: '/find-my-dentist?plan=ameritas-primestar',
    anchor: '#stop-ameritas',
    doNotNote: 'Do not call activation instant or same-day coverage. Next-day is the earliest effective date. SSOT: activation field.'
  },
  'humana-extend-5000': {
    eyebrow: 'Highest implant ceiling',
    headline: '$4,000 lifetime implant coverage, $5,000 annual max',
    fact: 'Dental implant lifetime maximum $4,000 per person, within a $5,000 calendar-year plan maximum',
    // Source: humana-extend-5000.md > implants field
    // ("dental implant annual maximum $2,000 per person and lifetime maximum $4,000 per person")
    factLabel: 'Implant lifetime max',
    url: '/dental-insurance/ppo-plans/humana-extend-5000/',
    verifyUrl: '/find-my-dentist?plan=humana-extend-5000',
    anchor: '#stop-humana',
    doNotNote: 'Do not omit the $2,000-per-year implant sub-maximum. Lifetime cap is $4,000 but each year is capped at $2,000. SSOT: implants field.'
  },
  'metlife-ncd-complete': {
    eyebrow: 'Highest annual maximum',
    headline: '$10,000 a year and a one-time $100 lifetime deductible',
    fact: '$10,000 per calendar year annual maximum, $100 lifetime deductible, no waiting periods on any service',
    // Source: metlife-ncd-complete.md > annual_maximum ("$10,000 per calendar year per person") +
    //         deductible ("$100 lifetime") + waiting_periods ("None on preventive, basic or major")
    factLabel: 'Annual maximum',
    url: '/dental-insurance/ppo-plans/metlife-ncd-complete/',
    verifyUrl: '/find-my-dentist?plan=metlife-ncd-complete',
    anchor: '#stop-metlife',
    doNotNote: 'Do not state implant cap as lifetime. Implants capped at $3,000 per calendar year within the $10,000 max. SSOT: implants field.'
  },
  'mutual-of-omaha-dental': {
    eyebrow: 'Best for seniors 65+',
    headline: 'No waiting periods, community-rated pricing, $5,000 option',
    fact: 'No waiting period on preventive, basic or major; community-rated pricing that does not rise with age; selectable $5,000 annual maximum',
    // Source: mutual-of-omaha-dental.md > waiting_periods ("NONE. Benefits available on day one") +
    //         annual_maximum ("Selectable $1,500/$3,000/$5,000") + monthly_premium (community-rated field)
    factLabel: 'Waiting periods / pricing model',
    url: '/dental-insurance/ppo-plans/mutual-of-omaha-dental/',
    verifyUrl: '/find-my-dentist?plan=mutual-of-omaha-dental',
    anchor: '#stop-moo',
    doNotNote: 'Do not claim guaranteed next-day activation (unverified). Do not state flat major rate; first year is 20%, rising to 50% year two. SSOT: coverage_major field.'
  },
  'delta-dental-ppo-premium': {
    eyebrow: 'Largest network + adult braces',
    headline: '112,000+ dentist locations, adult and child orthodontics covered',
    fact: '112,000+ dentists at 278,000+ locations on the PPO network, with adult and child orthodontics at 50% up to a $1,500 lifetime maximum',
    // Source: delta-dental-ppo-premium.md > network field ("112,000+ dentists, 278,000+ locations") +
    //         orthodontics field ("Adults AND dependent children at 50%....$1,500 lifetime")
    factLabel: 'Network size',
    url: '/dental-insurance/ppo-plans/delta-dental-ppo-premium/',
    verifyUrl: '/find-my-dentist?plan=delta-dental-ppo-premium',
    anchor: '#stop-delta',
    doNotNote: 'Delta sold in 16 states + DC only. Do not imply national availability. SSOT: sources field + do_not list.'
  },
  'aetna-dental-direct': {
    eyebrow: 'Comes with a CVS membership',
    headline: '$10 monthly CVS reward and 20% off CVS Health brand products',
    fact: 'CVS ExtraCare Plus included free: $10 monthly bonus reward plus 20% off CVS Health brand products (non-sale), where available',
    // Source: aetna-dental-direct.md > cvs_extracare_plus field
    // ("$10 monthly bonus reward...20% off CVS Health brand products (non-sale items only)")
    factLabel: 'CVS ExtraCare Plus perk',
    url: '/dental-insurance/ppo-plans/aetna-dental-direct/',
    verifyUrl: '/find-my-dentist?plan=aetna-dental-direct',
    anchor: '#stop-aetna',
    doNotNote: 'Not available in GA, LA, MN, MO, NY, NJ, OK, TX, VA. Do not state as nationwide cash. SSOT: cvs_extracare_plus field.'
  }
};

/* Default rotation order: distribute plan types evenly across session */
var ROTATION_ORDER = [
  'uhc-primary-dental',
  'guardian-premier-ppo',
  'ameritas-primestar',
  'humana-extend-5000',
  'metlife-ncd-complete',
  'mutual-of-omaha-dental',
  'delta-dental-ppo-premium',
  'aetna-dental-direct'
];
```

---

## Rail Card HTML Template

Replace the existing `.spot.cvs` block in the right rail (after the `.rc.rc-verify` card, before `.spot.capy`). The verify card above is NOT changed.

```html
<!-- PLAN SPOTLIGHT RAIL CARD (dynamic; JS controls content) -->
<div class="rc rc-spotlight" id="rail-spotlight" aria-live="polite" aria-label="Plan spotlight">
  <div class="rc-spot-inner" aria-atomic="true">

    <!-- Eyebrow label = plan strength category -->
    <div class="rc-spot-eyebrow" id="spot-eyebrow"><!-- e.g. "Fastest to activate" --></div>

    <!-- Headline = 1-line strength hook -->
    <p class="rc-spot-headline" id="spot-headline"><!-- e.g. "Start for about $1 a day, preventive from day one" --></p>

    <!-- SSOT-cited fact line -->
    <p class="rc-spot-fact" id="spot-fact"><!-- e.g. "Coverage can begin as soon as the day after your application is received" --></p>
    <div class="rc-spot-fact-label" id="spot-fact-label"><!-- e.g. "Activation" --></div>

    <!-- CTA row -->
    <div class="rc-spot-ctas">
      <a class="btn btn-pri rc-spot-story" id="spot-cta-story" href="#">See full plan story</a>
      <a class="rc-spot-verify" id="spot-cta-verify" href="#">Verify my dentist</a>
    </div>

    <!-- Context indicator: shows what triggered this spotlight -->
    <div class="rc-spot-context" id="spot-context-label" aria-hidden="true">
      <!-- e.g. "Based on your scenario selection" or "Scrolling past this plan" -->
    </div>

    <!-- Progress dots: 8 plans, one dot per plan, shows rotation position -->
    <div class="rc-spot-dots" id="spot-dots" aria-hidden="true">
      <!-- JS inserts 8 <button> dots when in rotation mode; hides in context mode -->
    </div>

  </div>
</div>
```

---

## CSS Additions

Add inside the existing `<style>` block. Uses only existing design tokens.

```css
/* ── PLAN SPOTLIGHT RAIL CARD ── */
.rc-spotlight {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  box-shadow: var(--sh-1);
  overflow: hidden;
  transition: box-shadow .15s, border-color .15s;
}
.rc-spotlight:focus-within {
  box-shadow: var(--sh-2);
  border-color: var(--teal);
}
.rc-spot-inner {
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rc-spot-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .09em;
  text-transform: uppercase;
  color: var(--teal-ink);
  background: var(--teal-tint);
  padding: 4px 9px;
  border-radius: var(--r-pill);
  display: inline-block;
  width: fit-content;
  transition: opacity .25s;
}
.rc-spot-headline {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
  margin: 0;
  transition: opacity .25s;
}
.rc-spot-fact {
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
  margin: 0;
  padding: 10px 12px;
  background: var(--surface-2);
  border-left: 3px solid var(--teal);
  border-radius: 0 var(--r-xs) var(--r-xs) 0;
  transition: opacity .25s;
}
.rc-spot-fact-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--ink-faint);
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-top: -6px;
}
.rc-spot-ctas {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}
.rc-spot-story {
  font-size: 13.5px;
  min-height: 40px;
  padding: 0 16px;
  width: 100%;
  justify-content: center;
}
.rc-spot-verify {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--teal-strong);
  text-align: center;
  padding: 4px 0;
  text-decoration: none;
}
.rc-spot-verify:hover { text-decoration: underline; text-underline-offset: 2px; }
.rc-spot-context {
  font-size: 11px;
  color: var(--ink-faint);
  text-align: center;
  padding-top: 4px;
  min-height: 16px;
}
.rc-spot-dots {
  display: flex;
  gap: 6px;
  justify-content: center;
  padding-top: 2px;
}
.rc-spot-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: var(--line);
  padding: 0;
  transition: background .2s;
}
.rc-spot-dot.active { background: var(--teal); }
/* Swap animation */
.spot-swapping .rc-spot-eyebrow,
.spot-swapping .rc-spot-headline,
.spot-swapping .rc-spot-fact { opacity: 0; }
```

---

## JavaScript State Machine (Full Implementation)

Drop this block immediately after the existing `applyMatch()` function (around line 1319 in the current file), before `/* ── WIDGET 4: filter by need ── */`.

```javascript
/* ══════════════════════════════════════════════════════
   PLAN SPOTLIGHT RAIL ENGINE
   Priority: 1=scenario result > 2=left-rail > 3=scroll > 0=rotation
   ══════════════════════════════════════════════════════ */
(function(){
  var PLAN_SPOTLIGHT = {
    'uhc-primary-dental': {
      eyebrow: 'Fastest to activate',
      headline: 'Start for about $1 a day, preventive from day one',
      fact: 'Coverage can begin as soon as the day after your application is received',
      factLabel: 'Activation',
      url: '/dental-insurance/ppo-plans/uhc-primary-dental/',
      verifyUrl: '/find-my-dentist?plan=uhc-primary-dental'
    },
    'guardian-premier-ppo': {
      eyebrow: 'Best for families with kids',
      headline: '85% on fillings from day one, plus child braces covered',
      fact: '85% in-network on fillings and extractions from day one, the highest day-one basic payout on this shelf',
      factLabel: 'Day-one basic coverage',
      url: '/dental-insurance/ppo-plans/guardian-premier-ppo/',
      verifyUrl: '/find-my-dentist?plan=guardian-premier-ppo'
    },
    'ameritas-primestar': {
      eyebrow: 'Zero waiting periods',
      headline: 'Root canals and crowns eligible from day one',
      fact: 'No waiting periods on any category, including implants. Coverage can begin as soon as tomorrow',
      factLabel: 'Waiting periods',
      url: '/dental-insurance/ppo-plans/ameritas-primestar/',
      verifyUrl: '/find-my-dentist?plan=ameritas-primestar'
    },
    'humana-extend-5000': {
      eyebrow: 'Highest implant ceiling',
      headline: '$4,000 lifetime implant coverage, $5,000 annual max',
      fact: 'Dental implant lifetime maximum $4,000 per person, within a $5,000 calendar-year plan maximum',
      factLabel: 'Implant lifetime max',
      url: '/dental-insurance/ppo-plans/humana-extend-5000/',
      verifyUrl: '/find-my-dentist?plan=humana-extend-5000'
    },
    'metlife-ncd-complete': {
      eyebrow: 'Highest annual maximum',
      headline: '$10,000 a year and a one-time $100 lifetime deductible',
      fact: '$10,000 per calendar year annual maximum, $100 lifetime deductible, no waiting periods on any service',
      factLabel: 'Annual maximum',
      url: '/dental-insurance/ppo-plans/metlife-ncd-complete/',
      verifyUrl: '/find-my-dentist?plan=metlife-ncd-complete'
    },
    'mutual-of-omaha-dental': {
      eyebrow: 'Best for seniors 65+',
      headline: 'No waiting periods, community-rated pricing, $5,000 option',
      fact: 'No waiting period on any category; community-rated pricing that does not rise with age; selectable $5,000 annual maximum',
      factLabel: 'Waiting periods + pricing model',
      url: '/dental-insurance/ppo-plans/mutual-of-omaha-dental/',
      verifyUrl: '/find-my-dentist?plan=mutual-of-omaha-dental'
    },
    'delta-dental-ppo-premium': {
      eyebrow: 'Largest network + adult braces',
      headline: '112,000+ dentist locations, adult and child orthodontics covered',
      fact: '112,000+ dentists at 278,000+ locations on the PPO network, with adult and child orthodontics at 50% up to a $1,500 lifetime maximum',
      factLabel: 'Network size',
      url: '/dental-insurance/ppo-plans/delta-dental-ppo-premium/',
      verifyUrl: '/find-my-dentist?plan=delta-dental-ppo-premium'
    },
    'aetna-dental-direct': {
      eyebrow: 'Comes with a CVS membership',
      headline: '$10 monthly CVS reward and 20% off CVS Health brand products',
      fact: 'CVS ExtraCare Plus included free: $10 monthly bonus reward plus 20% off CVS Health brand products (non-sale), where available',
      factLabel: 'CVS ExtraCare Plus perk',
      url: '/dental-insurance/ppo-plans/aetna-dental-direct/',
      verifyUrl: '/find-my-dentist?plan=aetna-dental-direct'
    }
  };

  var ROTATION_ORDER = [
    'uhc-primary-dental','guardian-premier-ppo','ameritas-primestar','humana-extend-5000',
    'metlife-ncd-complete','mutual-of-omaha-dental','delta-dental-ppo-premium','aetna-dental-direct'
  ];

  var CONTEXT_LABELS = {
    1: 'Based on your scenario selection',
    2: 'Based on your filter selection',
    3: 'Scrolling past this plan',
    0: 'Rotating through all 8 plans'
  };

  var spotCard = document.getElementById('rail-spotlight');
  if(!spotCard) return; /* rail not present (mobile hidden) */

  var state = { priority: 0, slug: null, locked: false, rotationTimer: null, rotationIndex: 0 };

  /* Build rotation dots once */
  var dotsEl = document.getElementById('spot-dots');
  if(dotsEl){
    ROTATION_ORDER.forEach(function(slug, i){
      var btn = document.createElement('button');
      btn.className = 'rc-spot-dot';
      btn.setAttribute('aria-label', 'Show ' + (PLAN_SPOTLIGHT[slug] ? PLAN_SPOTLIGHT[slug].eyebrow : slug));
      btn.setAttribute('data-dot', i);
      btn.addEventListener('click', function(){
        stopRotation();
        state.priority = 0;
        state.slug = ROTATION_ORDER[i];
        state.rotationIndex = i;
        swapCard(state.slug, 0, true);
        /* resume rotation from this index after 12s */
        state.rotationTimer = setTimeout(function(){ startRotation(i); }, 12000);
      });
      dotsEl.appendChild(btn);
    });
  }

  function updateDots(activeIndex, isRotating){
    if(!dotsEl) return;
    dotsEl.hidden = !isRotating;
    dotsEl.querySelectorAll('.rc-spot-dot').forEach(function(btn, i){
      btn.classList.toggle('active', i === activeIndex);
    });
  }

  function swapCard(slug, priority, skipAnimation){
    var data = PLAN_SPOTLIGHT[slug]; if(!data) return;
    priority = priority !== undefined ? priority : state.priority;
    var isRotation = (priority === 0);

    if(skipAnimation || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
      writeCard(slug, data, priority, isRotation);
      return;
    }
    /* Fade out, write, fade in */
    spotCard.classList.add('spot-swapping');
    setTimeout(function(){
      writeCard(slug, data, priority, isRotation);
      spotCard.classList.remove('spot-swapping');
    }, 220);
  }

  function writeCard(slug, data, priority, isRotation){
    var eyebrow = document.getElementById('spot-eyebrow');
    var headline = document.getElementById('spot-headline');
    var fact = document.getElementById('spot-fact');
    var factLabel = document.getElementById('spot-fact-label');
    var ctaStory = document.getElementById('spot-cta-story');
    var ctaVerify = document.getElementById('spot-cta-verify');
    var contextEl = document.getElementById('spot-context-label');

    if(eyebrow) eyebrow.textContent = data.eyebrow || '';
    if(headline) headline.textContent = data.headline || '';
    if(fact) fact.textContent = data.fact || '';
    if(factLabel) factLabel.textContent = data.factLabel || '';
    if(ctaStory){ ctaStory.href = data.url || '#'; }
    if(ctaVerify){ ctaVerify.href = data.verifyUrl || '/find-my-dentist'; }
    if(contextEl){
      contextEl.textContent = isRotation ? '' : (CONTEXT_LABELS[priority] || '');
      contextEl.hidden = isRotation;
    }

    var dotIndex = ROTATION_ORDER.indexOf(slug);
    updateDots(dotIndex, isRotation);

    /* Mark spotlight with active slug for external reference */
    spotCard.setAttribute('data-active-plan', slug);
  }

  function stopRotation(){
    if(state.rotationTimer){ clearInterval(state.rotationTimer); state.rotationTimer = null; }
  }

  function startRotation(fromIndex){
    stopRotation();
    state.priority = 0;
    state.locked = false;
    fromIndex = fromIndex !== undefined ? fromIndex : 0;
    state.rotationIndex = fromIndex;
    state.slug = ROTATION_ORDER[state.rotationIndex];
    swapCard(state.slug, 0, true);
    state.rotationTimer = setInterval(function(){
      if(spotCard.matches(':hover') || spotCard.querySelector(':focus')) return; /* pause on hover/focus */
      state.rotationIndex = (state.rotationIndex + 1) % ROTATION_ORDER.length;
      state.slug = ROTATION_ORDER[state.rotationIndex];
      swapCard(state.slug, 0, false);
    }, 8000);
  }

  /* ── Priority 1: Scenario finder result ── */
  /* Hook into the existing applyMatch() call. applyMatch() fires inside render()
     which also writes cc_hero_plan to sessionStorage. We listen for the custom
     event dispatched below, or fall back to sessionStorage polling. */
  document.addEventListener('cc:scenario_result', function(e){
    if(!e.detail || !e.detail.slug) return;
    stopRotation();
    state.priority = 1;
    state.slug = e.detail.slug;
    state.locked = false;
    swapCard(state.slug, 1);
  });

  /* If page loaded with a prior scenario in sessionStorage, restore it */
  (function(){
    try{
      var stored = sessionStorage.getItem('cc_hero_plan');
      if(stored && PLAN_SPOTLIGHT[stored]){
        state.priority = 1;
        state.slug = stored;
        swapCard(stored, 1, true);
        return;
      }
    }catch(e){}
    startRotation(0);
  })();

  /* ── Priority 2a: Left-rail plan nav click ── */
  document.querySelectorAll('.rl-nav a[data-plan]').forEach(function(link){
    link.addEventListener('click', function(){
      if(state.locked || state.priority > 2) return;
      var slug = link.getAttribute('data-plan');
      if(!PLAN_SPOTLIGHT[slug]) return;
      stopRotation();
      state.priority = 2;
      state.slug = slug;
      swapCard(slug, 2);
    });
  });

  /* ── Priority 2b: Filter pill activation ── */
  /* Map filter values to the plan that best represents each filter */
  var FILTER_TO_PLAN = {
    'no-wait':    'ameritas-primestar',
    'implants':   'humana-extend-5000',
    'kids-ortho': 'guardian-premier-ppo',
    'adult-ortho':'delta-dental-ppo-premium',
    'seniors':    'mutual-of-omaha-dental',
    'budget':     'uhc-primary-dental',
    'high-max':   'metlife-ncd-complete',
    'vision':     'humana-extend-5000'
  };
  document.querySelectorAll('.filt-pill').forEach(function(p){
    p.addEventListener('click', function(){
      if(state.locked || state.priority > 2) return;
      /* Derive the dominant active filter */
      var active = [];
      document.querySelectorAll('.filt-pill[aria-checked="true"]').forEach(function(x){
        active.push(x.getAttribute('data-filter'));
      });
      /* Use the first active filter that has a mapped plan */
      var matched = null;
      for(var i=0; i<active.length; i++){
        if(FILTER_TO_PLAN[active[i]]){ matched = FILTER_TO_PLAN[active[i]]; break; }
      }
      if(!matched) return;
      stopRotation();
      state.priority = 2;
      state.slug = matched;
      swapCard(matched, 2);
    });
  });

  /* ── Priority 3: IntersectionObserver on .tour-stop (scroll context) ── */
  /* Extends the existing storyObs; fires at lower priority than 1 and 2 */
  var scrollDebounce = null;
  if('IntersectionObserver' in window){
    var spotObs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        if(state.priority > 3) return; /* scenario or filter has already fired */
        var slug = en.target.getAttribute('data-plan');
        if(!slug || !PLAN_SPOTLIGHT[slug]) return;
        if(scrollDebounce) clearTimeout(scrollDebounce);
        scrollDebounce = setTimeout(function(){
          if(state.priority <= 3){
            stopRotation();
            state.priority = 3;
            state.slug = slug;
            swapCard(slug, 3);
          }
        }, 400);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.tour-stop[data-plan]').forEach(function(c){ spotObs.observe(c); });
  }

  /* ── Scenario reset: drop back to rotation ── */
  var sfResetBtn = document.getElementById('sf-reset');
  if(sfResetBtn){
    sfResetBtn.addEventListener('click', function(){
      try{ sessionStorage.removeItem('cc_hero_plan'); sessionStorage.removeItem('cc_scenario'); }catch(e){}
      state.priority = 0;
      state.locked = false;
      startRotation(0);
    });
  }

  /* ── CTA click lock: keep card stable after user engages ── */
  var storyBtn = document.getElementById('spot-cta-story');
  if(storyBtn){
    storyBtn.addEventListener('click', function(){
      state.locked = true;
      /* unlock on next scroll intersection */
    });
  }

  /* ── Expose dispatch hook for existing render() to call ── */
  /* In render() inside WIDGET 2, add one line at the end of the function,
     just after applyMatch(route.hero):

       document.dispatchEvent(new CustomEvent('cc:scenario_result', {detail:{slug:route.hero}}));

     This is the only required change to the existing JS. */

})();
```

---

## Required Modification to Existing JS

In the current `render()` function (around line 1303), after the existing `applyMatch(route.hero)` call, add a single line:

```javascript
/* ADD this immediately after: applyMatch(route.hero); */
document.dispatchEvent(new CustomEvent('cc:scenario_result', {detail:{slug:route.hero}}));
```

Also in the existing `resetFinder()` function, after `applyMatch('')`, add:

```javascript
/* ADD after: applyMatch(''); */
document.dispatchEvent(new CustomEvent('cc:scenario_reset'));
```

And register the reset listener at the top of the spotlight IIFE already handles `sf-reset` click, so the `CustomEvent` approach is optional for the reset but recommended for clean separation.

---

## Graceful Fallback Checklist

| Scenario | Behavior |
|---|---|
| JS disabled | Static `.rc-spot-inner` content should be pre-filled with `uhc-primary-dental` data server-side (or pick the most broadly applicable plan as the noscript default). |
| IntersectionObserver not supported (old browsers) | Falls back to default rotation only; no scroll-based swaps. |
| `prefers-reduced-motion` | `swapCard()` skips the fade; writes content directly. |
| sessionStorage blocked | Priority 1 restoration skipped; starts rotation from index 0. |
| Plan slug in PLAN_SPOTLIGHT missing | `swapCard()` returns early; current card content unchanged. |
| User on mobile (`.rail-r` hidden at <=1080px) | `spotCard` is null; IIFE returns immediately. Rail engine does not run. |
| All 8 plans visible with no filter | Rotation cycles showing each plan for 8 seconds, pausing on hover or focus. |

---

## Integration Notes

1. **Remove** the existing `.spot.cvs` block (lines 1031-1036 in the current file). The new `#rail-spotlight` replaces it.
2. **Keep** `.spot.capy` (Capy Rewards block) below the spotlight.
3. **Keep** the share block below `.spot.capy` unchanged.
4. The `.spot` CSS class still applies to the `.spot.capy` block. Add `.rc-spotlight` as a new class independent of `.spot`.
5. Do not move or alter the `.rc.rc-verify` verify card above the spotlight.
6. The `PLAN_SPOTLIGHT` object is self-contained inside the IIFE. It does not conflict with the existing `PLANS` object used by the scenario finder.
7. No localStorage is used. sessionStorage is used only for `cc_hero_plan` (already set by the existing `render()` function).

---

## SSOT Fact Citation Map

| Plan slug | Fact cited | SSOT field |
|---|---|---|
| uhc-primary-dental | "day after your application is received" | `activation` |
| guardian-premier-ppo | "85% in-network...from day one" | `coverage_basic` |
| ameritas-primestar | "No waiting periods on any category, including implants" | `waiting_periods` |
| humana-extend-5000 | "$4,000 lifetime implant...within a $5,000 calendar-year" | `implants` |
| metlife-ncd-complete | "$10,000 per calendar year...no waiting periods" | `annual_maximum`, `waiting_periods` |
| mutual-of-omaha-dental | "No waiting period...community-rated...selectable $5,000" | `waiting_periods`, `monthly_premium`, `annual_maximum` |
| delta-dental-ppo-premium | "112,000+ dentists at 278,000+ locations...adult and child orthodontics at 50%....$1,500 lifetime" | `network`, `orthodontics` |
| aetna-dental-direct | "$10 monthly bonus reward...20% off CVS Health brand products (non-sale)" | `cvs_extracare_plus` |

---

## Do-Not Violations to Guard Against During Integration

- Do not use UHC's "next business day" as a guaranteed promise. SSOT wording is "as soon as the day after."
- Do not state Ameritas activation as instant or same-day. Next-day is the earliest selectable effective date.
- Do not state MOO activation timing at all. It is unverified in the SSOT.
- Do not state Humana implant as a single flat cap. Two caps apply: $2,000 per year AND $4,000 lifetime.
- Do not state MetLife implant cap as lifetime. It is $3,000 per calendar year.
- Do not show CVS perk without the "where available" qualifier. Not in 9 states.
- Do not show Delta Dental without the 16-states caveat if geographic targeting is ambiguous.
- No em-dashes in any copy. Use commas, colons, or short sentences.
