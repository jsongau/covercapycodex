/* CoverCapy "Reading Room" FAQ engine — portable.
   Reads window.CC_FAQS = [[question, answerHTML, catId, jumpHref?, jumpLabel?], ...]
   and window.CC_FAQ_CATS = [[catId, catName], ...] (first should be ['all','Every question']).
   Renders into #cc-faq-cats and #cc-faq-entries, wires toggle/filter/open-all, emits FAQPage schema. */
(function () {
  var ROMAN = ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'];
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function pad2(n){ return String(n).length < 2 ? '0' + n : String(n); }

  function render(){
    var FAQS = window.CC_FAQS || [];
    if (!FAQS.length) return;
    var CATS = window.CC_FAQ_CATS || [['all', 'Every question']];
    var catsEl = document.getElementById('cc-faq-cats');
    var listEl = document.getElementById('cc-faq-entries');
    if (!catsEl || !listEl) return;

    // If the FAQ was server/build-time rendered into static HTML, do NOT rebuild
    // (keeps content crawlable, avoids a flash) and skip the duplicate FAQPage schema
    // (the static page already ships one). We only wire up the interactive handlers below.
    var prerendered = listEl.children.length > 0;

    var cnt = function (c){ return c === 'all' ? FAQS.length : FAQS.filter(function (f){ return f[2] === c; }).length; };
    if (!prerendered) {
    catsEl.innerHTML = CATS.map(function (c, i){
      return '<button class="cc-faq-cat' + (i === 0 ? ' active' : '') + '" type="button" data-cat="' + c[0] + '">' +
        '<span class="cc-faq-cat-num">' + ROMAN[i] + '.</span>' +
        '<span class="cc-faq-cat-name">' + esc(c[1]) + '</span>' +
        '<span class="cc-faq-cat-count">' + pad2(cnt(c[0])) + '</span></button>';
    }).join('');

    listEl.innerHTML = FAQS.map(function (f, i){
      var act = (f[3] && f[4]) ? '<a class="cc-fq-act" href="' + f[3] + '">' + esc(f[4]) + ' &rarr;</a>' : '';
      return '<article class="cc-fq' + (i === 0 ? ' open' : '') + '" data-cat="' + (f[2] || 'all') + '">' +
        '<button class="cc-fq-q" type="button" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
        '<span class="cc-fq-num" aria-hidden="true">' + ROMAN[i] + '.</span>' +
        '<span class="cc-fq-title">' + esc(f[0]) + '</span>' +
        '<span class="cc-fq-ind" aria-hidden="true">+</span></button>' +
        '<div class="cc-fq-a"><div class="cc-fq-a-inner"><div class="cc-fq-a-pad"><p>' + f[1] + '</p>' + act + '</div></div></div></article>';
    }).join('');
    }

    catsEl.querySelectorAll('.cc-faq-cat').forEach(function (b){
      b.addEventListener('click', function (){
        catsEl.querySelectorAll('.cc-faq-cat').forEach(function (c){ c.classList.remove('active'); });
        b.classList.add('active');
        var cat = b.dataset.cat;
        listEl.querySelectorAll('.cc-fq').forEach(function (f){ f.classList.toggle('hide', cat !== 'all' && f.dataset.cat !== cat); });
      });
    });
    listEl.querySelectorAll('.cc-fq-q').forEach(function (q){
      q.addEventListener('click', function (){
        var fq = q.closest('.cc-fq'); if (!fq) return;
        var open = fq.classList.toggle('open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    var oa = document.getElementById('cc-faq-openall');
    if (oa) oa.addEventListener('click', function (){
      var es = Array.prototype.slice.call(listEl.querySelectorAll('.cc-fq:not(.hide)'));
      var any = es.some(function (f){ return !f.classList.contains('open'); });
      es.forEach(function (f){ f.classList.toggle('open', any); var q = f.querySelector('.cc-fq-q'); if (q) q.setAttribute('aria-expanded', any ? 'true' : 'false'); });
      var l = oa.querySelector('.lbl'); if (l) l.textContent = any ? 'Close all answers' : 'Open all answers';
    });

    if (!prerendered) try {
      var sd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(function (f){
        var tmp = document.createElement('div'); tmp.innerHTML = f[1];
        return { "@type": "Question", "name": f[0], "acceptedAnswer": { "@type": "Answer", "text": (tmp.textContent || '').trim() } };
      })};
      var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(sd); document.head.appendChild(sc);
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
