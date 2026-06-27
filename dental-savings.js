/* ============================================================
   CoverCapy — Dental Savings Plans, shared carrier-page script
   A configurable quote estimator + FAQ behavior for every
   /dental-savings-plans/{carrier}/ page.

   Each page defines, before this script loads:
     window.CC_CARRIER = {
       savingsLow: 20,      // low end of the plan's stated savings %
       savingsHigh: 60,     // high end of the plan's stated savings %
       presets: [           // typical US procedure costs for the chips
         { label: 'Cleaning + exam', amt: 220 },
         { label: 'Crown', amt: 1300 },
         ...
       ]
     };
   FAQ uses native <details>, so no JS is required for it.
   ============================================================ */
(function(){
  var cfg = window.CC_CARRIER || {};
  var lo = +cfg.savingsLow || 20;
  var hi = +cfg.savingsHigh || 50;
  if(hi < lo){ var t = lo; lo = hi; hi = t; }

  var fmt = function(n){ return '$' + Math.round(n).toLocaleString('en-US'); };
  var range = function(a, b){
    a = Math.round(a); b = Math.round(b);
    return (a === b) ? fmt(a) : (fmt(a) + ' to ' + fmt(b));
  };

  var input = document.getElementById('estQuote');
  var chips = document.getElementById('estChips');
  var memberEl = document.getElementById('estMember');
  var saveEl = document.getElementById('estSave');
  if(!input || !memberEl || !saveEl){ return; }

  function calc(){
    var q = parseFloat(input.value) || 0;
    if(q <= 0){
      memberEl.textContent = '$0';
      saveEl.textContent = '$0';
      return;
    }
    // higher discount = lower member price
    var memberLow = q * (1 - hi/100);
    var memberHigh = q * (1 - lo/100);
    var saveLow = q * (lo/100);
    var saveHigh = q * (hi/100);
    memberEl.textContent = range(memberLow, memberHigh);
    saveEl.textContent = range(saveLow, saveHigh);
  }

  // build preset chips
  if(chips && Array.isArray(cfg.presets)){
    cfg.presets.forEach(function(p){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = p.label + ' (~' + fmt(p.amt) + ')';
      b.addEventListener('click', function(){
        input.value = p.amt;
        calc();
        input.focus();
      });
      chips.appendChild(b);
    });
  }

  input.addEventListener('input', calc);
  calc();
})();
