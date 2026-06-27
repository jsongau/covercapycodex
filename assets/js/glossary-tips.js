/* ============================================================================
   CoverCapy — Shared glossary tooltip + auto-linker (cc-tip engine)
   Ported verbatim from the compare-ppo hub so term pages behave identically.
   - TIPS: canonical short definitions (title / body / why it matters)
   - autoTip(): wraps the FIRST prose mention of every OTHER glossary term in a
     hover tooltip that links to that term's page, strengthening internal links
     back into the glossary and the compare-ppo hub.
   - Tooltip engine: floating card, hover on desktop, tap on touch.
   The page's own term is skipped (derived from the canonical/path).
   ============================================================================ */
/* FAQ accordion — glossary term pages call onclick="toggleFaq(this)".
   Answers carry the `hidden` attribute; reveal by toggling it (+ .open for any CSS hook). */
window.toggleFaq = function (btn) {
  var expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  var a = btn.nextElementSibling;
  if (!a) return;
  if (expanded) { a.setAttribute('hidden', ''); a.classList.remove('open'); }
  else { a.removeAttribute('hidden'); a.classList.add('open'); }
};

(function () {
  var TIPS = {
    'ppo': { t: 'PPO dental insurance', b: 'Preferred Provider Organization. Flexible plans that work with any licensed dentist, with the lowest cost when you choose in-network providers.', w: 'PPO is the dominant individual dental model, and the freedom to keep your dentist is the main reason to pick one.' },
    'waiting-period': { t: 'Waiting period', b: 'A delay between enrollment and when a tier of coverage activates. Basic services like fillings typically wait 0 to 3 months, major work like crowns and root canals 6 to 12 months. Preventive care usually has no wait.', w: 'No-wait plans charge more in premium; long-wait plans charge less but lock you out of major coverage early.' },
    'annual-maximum': { t: 'Annual maximum', b: 'The most a PPO will pay for covered services in one plan year. Once you hit it, all further treatment that year is 100% out of pocket. It resets each plan year.', w: 'A $1,000 cap means insurance can never pay you more than $1,000 that year. Higher-cap plans cost more but unlock larger reimbursements.' },
    'deductible': { t: 'Deductible', b: 'Your first out-of-pocket dollars on covered restorative services before insurance starts reimbursing, usually around $50. Preventive cleanings and exams are usually exempt.', w: 'It raises your true out-of-pocket on the first covered treatment of the year, a number most patients miss when comparing plans.' },
    'coinsurance': { t: 'Coinsurance', b: 'Your percentage share of the allowed amount after the deductible. Typical PPO tiers are 100% preventive, 80% basic, 50% major. Some plans pay 20% on major in Year 1 and step up to 50% in Year 2.', w: 'Coinsurance is what insurance is actually worth on a procedure. Cheap plans look good until you see they only pay 50% on the work you need.' },
    'in-network': { t: 'In-network dentist', b: 'A dentist contracted with your PPO carrier to accept negotiated rates and file claims for you. In-network means lower bills and less paperwork.', w: 'Choosing in-network is the single biggest lever for reducing your out-of-pocket cost.' },
    'out-of-pocket': { t: 'Out of pocket', b: 'The amount you may still pay after insurance benefits are applied.', w: 'This is the number patients usually care about most.' },
    'balance-billing': { t: 'Balance billing', b: 'When an out-of-network dentist bills you the difference between their full fee and what the plan allows.', w: 'Staying in-network protects you from balance billing, so confirm acceptance before you book.' },
    'missing-tooth': { t: 'Missing tooth clause', b: 'An exclusion in many PPOs that denies coverage for replacing teeth lost before the policy effective date, subject to the replacement limitations in your certificate.', w: 'Request a pretreatment estimate before scheduling implant work on a tooth you lost before the plan started.' },
    'calendar-year': { t: 'Calendar year reset', b: 'Annual benefits restart on January 1 regardless of when you enrolled. A December cleaning bills against this year; a January cleaning bills against next.', w: 'Knowing your reset date lets you sequence care so nothing is wasted.' },
    'plan-year': { t: 'Plan year', b: 'A 12-month benefit cycle. Most PPO plans follow the calendar year and reset January 1. Some reset 12 months from your enrollment date. Confirm with your carrier which applies.', w: 'Knowing which type your plan follows helps you time treatment around the reset.' },
    'effective-date': { t: 'Effective date', b: 'The day your coverage officially begins after enrollment. Some carriers start the next business day; Guardian activates on the 1st of the following month.', w: 'Effective dates determine when you can actually use your benefits.' },
    'day-one': { t: 'Day 1 activation', b: 'Coverage usable immediately, with no waiting period for that tier. Preventive care is almost always day one; a few plans extend it to basic or major work.', w: 'If you need care now, day-one activation is the difference between a useful plan and a useless one.' },
    'allowed-amount': { t: 'Allowed amount', b: 'The maximum negotiated fee a PPO carrier accepts for a procedure, usually lower than the dentist’s full fee.', w: 'The gap between the full fee and the allowed amount is what the PPO negotiates away on your behalf.' },
    'ada-fee': { t: 'ADA fee schedule', b: 'Standard procedure pricing the ADA publishes. In-network PPO dentists contract to charge no more than the allowed amount.', w: 'The cost-versus-coverage math only works because in-network providers are bound to fee-schedule pricing.' },
    'cdt': { t: 'CDT codes', b: 'Current Dental Terminology codes, the standardized billing codes for every procedure. Same code, same payout, regardless of practice.', w: 'They are how PPO reimbursements get calculated, so an estimate by code is portable between offices.' },
    'coverage-preventive': { t: 'Preventive care', b: 'Cleanings, exams, x-rays, and oral cancer screening. Almost always covered 100% with no waiting period.', w: 'Preventive care is the cheapest dental investment you can make.' },
    'coverage-basic': { t: 'Basic services', b: 'Procedures like fillings, simple extractions, and basic perio. Typically 80% covered, sometimes rising in Year 2.', w: 'Basic services are the most common dental treatment, so this rate drives most of your real cost.' },
    'coverage-major': { t: 'Major services', b: 'More involved treatment, like crowns, bridges, root canals, and dentures. Often starts at 20 to 50% and improves in Year 2 on phased plans.', w: 'Major coverage rates determine your out-of-pocket on the most expensive procedures.' },
    'implants': { t: 'Implants', b: 'Titanium posts placed in the jawbone to replace lost teeth. Major-service coverage and waiting periods apply, and a missing-tooth clause can limit older losses.', w: 'Implants are a major investment, so plan timing and the missing-tooth clause are crucial.' },
    'whitening': { t: 'Whitening', b: 'Cosmetic brightening of the teeth. Coverage is rare in PPO dental. Guardian covers it as a benefit, and Humana offers a flat yearly allowance.', w: 'If whitening matters to you, it narrows your plan choice, so it is worth flagging before you enroll.' },
    'vision': { t: 'Vision add-on', b: 'Eye-exam and eyewear benefits bundled with a dental plan. Included on Humana Extend, and an opt-in add-on on most others.', w: 'If you wear glasses or contacts, a bundle can beat buying vision separately.' },
    'rating': { t: 'CoverCapy rating', b: 'A 0 to 100 score we compute per live plan from coverage breadth, annual maximum, average waiting period, and value.', w: 'It is a fast way to compare plans on the same yardstick before you read the fine print.' },
    'copay': { t: 'Copay, your share after insurance', b: 'The part of a covered treatment you pay after the plan pays its share. On dental PPO plans this is usually a coinsurance percentage, for example you pay about half of a crown after the plan pays the other half, up to your annual maximum.', w: 'After the plan pays its share, the copay is what is left. It can often be spread into monthly payments, sometimes at 0% APR.' }
  };

  /* Ordered so multi-word patterns match before their substrings. */
  var PATS = [
    [/\bmissing[‑\- ]tooth clause\b/i, 'missing-tooth'],
    [/\bout[‑\- ]of[‑\- ]pocket\b/i, 'out-of-pocket'],
    [/\bin[‑\- ]network\b/i, 'in-network'],
    [/\bwaiting periods?\b/i, 'waiting-period'],
    [/\bannual maximums?\b/i, 'annual-maximum'],
    [/\bannual (?:cap|max)\b/i, 'annual-maximum'],
    [/\bbalance billing\b/i, 'balance-billing'],
    [/\bcalendar year\b/i, 'calendar-year'],
    [/\bplan year\b/i, 'plan-year'],
    [/\beffective date\b/i, 'effective-date'],
    [/\bday[‑\- ]one\b/i, 'day-one'],
    [/\bday 1\b/i, 'day-one'],
    [/\ballowed amount\b/i, 'allowed-amount'],
    [/\bADA fee schedule\b/i, 'ada-fee'],
    [/\bCDT codes?\b/i, 'cdt'],
    [/\bpreventive (?:care|services)\b/i, 'coverage-preventive'],
    [/\bbasic services\b/i, 'coverage-basic'],
    [/\bmajor services\b/i, 'coverage-major'],
    [/\bremaining copay\b/i, 'copay'],
    [/\bcopays?\b/i, 'copay'],
    [/\bcoinsurance\b/i, 'coinsurance'],
    [/\bdeductibles?\b/i, 'deductible'],
    [/\bimplants?\b/i, 'implants'],
    [/\bwhitening\b/i, 'whitening'],
    [/\bPPO\b/, 'ppo']
  ];

  function currentTerm() {
    if (window.CC_PAGE_TERM) return window.CC_PAGE_TERM;
    var m = (location.pathname || '').match(/\/guides\/glossary\/([^\/]+)\/?/);
    return m ? m[1] : '';
  }

  function autoTip() {
    var self = currentTerm();
    var used = {};
    var roots = ['.content', 'article.prose .content', 'article.prose'].map(function (s) { return document.querySelector(s); }).filter(Boolean);
    if (!roots.length) return;
    var root = roots[0];
    function blocked(el) {
      while (el) {
        if (el.classList && el.classList.contains('cc-tip')) return true;
        var t = el.tagName;
        if (t === 'SCRIPT' || t === 'STYLE' || t === 'BUTTON' || t === 'SELECT' || t === 'OPTION' || t === 'A' || t === 'H1' || t === 'TABLE') return true;
        el = el.parentElement;
      }
      return false;
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], cur;
    while ((cur = walker.nextNode())) { if (cur.nodeValue.trim() && !blocked(cur.parentElement)) nodes.push(cur); }
    nodes.forEach(function (node) {
      for (var i = 0; i < PATS.length; i++) {
        var re = PATS[i][0], slug = PATS[i][1];
        if (slug === self || used[slug] || !TIPS[slug]) continue;
        var m = node.nodeValue.match(re);
        if (!m) continue;
        used[slug] = 1;
        var v = node.nodeValue, before = v.slice(0, m.index), match = m[0], after = v.slice(m.index + match.length);
        var x = TIPS[slug], span = document.createElement('span');
        span.className = 'cc-tip';
        span.dataset.tipTitle = x.t; span.dataset.tipBody = x.b; if (x.w) span.dataset.tipWhy = x.w;
        span.dataset.tipLink = '/guides/glossary/' + slug + '/';
        span.textContent = match;
        var frag = document.createDocumentFragment();
        frag.append(document.createTextNode(before), span, document.createTextNode(after));
        node.parentNode.replaceChild(frag, node);
        break;
      }
    });
  }

  /* ---------------- tooltip engine ---------------- */
  var tip = null, curEl = null, hideT = null;
  var touch = window.matchMedia && matchMedia('(hover:none)').matches;
  function ensure() {
    if (tip) return tip;
    tip = document.createElement('div'); tip.className = 'cc-tooltip';
    tip.innerHTML = '<div class="cc-tooltip-title"></div><div class="cc-tooltip-body"></div><div class="cc-tooltip-why"></div><a class="cc-tooltip-link">See full definition</a><div class="cc-tooltip-arrow"></div>';
    document.body.appendChild(tip);
    tip.addEventListener('mouseenter', function () { clearTimeout(hideT); });
    tip.addEventListener('mouseleave', hide);
    return tip;
  }
  function show(el) {
    var t = ensure(); clearTimeout(hideT); curEl = el;
    t.querySelector('.cc-tooltip-title').textContent = el.dataset.tipTitle || '';
    t.querySelector('.cc-tooltip-body').textContent = el.dataset.tipBody || '';
    var why = t.querySelector('.cc-tooltip-why');
    if (el.dataset.tipWhy) { why.style.display = ''; why.textContent = el.dataset.tipWhy; } else { why.style.display = 'none'; }
    var lk = t.querySelector('.cc-tooltip-link');
    if (el.dataset.tipLink) { lk.style.display = ''; lk.setAttribute('href', el.dataset.tipLink); } else { lk.style.display = 'none'; }
    t.classList.add('visible'); position(el, t);
  }
  function hide() { clearTimeout(hideT); hideT = setTimeout(function () { if (tip) tip.classList.remove('visible'); curEl = null; }, 130); }
  function position(el, t) {
    var r = el.getBoundingClientRect(), tw = t.offsetWidth, th = t.offsetHeight;
    var top = r.top - th - 12, left = r.left + r.width / 2 - tw / 2;
    t.dataset.flipped = 'false';
    if (top < 8) { top = r.bottom + 12; t.dataset.flipped = 'true'; }
    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    t.style.top = top + 'px'; t.style.left = left + 'px';
    var a = t.querySelector('.cc-tooltip-arrow'); a.style.left = (r.left + r.width / 2 - left - 5) + 'px';
  }
  document.addEventListener('mouseover', function (e) { if (touch) return; var el = e.target.closest && e.target.closest('.cc-tip'); if (el) show(el); });
  document.addEventListener('mouseout', function (e) { if (touch) return; var el = e.target.closest && e.target.closest('.cc-tip'); if (!el) return; var to = e.relatedTarget; if (to && to.closest && (to.closest('.cc-tip') === el || to.closest('.cc-tooltip'))) return; hide(); });
  document.addEventListener('click', function (e) { if (!touch) return; var el = e.target.closest && e.target.closest('.cc-tip'); if (el) { e.preventDefault(); if (curEl === el) hide(); else show(el); } else if (!(e.target.closest && e.target.closest('.cc-tooltip'))) hide(); });
  window.addEventListener('scroll', function () { if (curEl && tip && tip.classList.contains('visible')) position(curEl, tip); }, true);
  window.addEventListener('resize', function () { if (curEl) hide(); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoTip);
  else autoTip();
})();
