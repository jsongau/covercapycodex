/* ============================================================
   CoverCapy PPO — Shared hub interaction module
   Enhancement only. Plan FACTS are server-rendered in the HTML;
   this reads the same canonical data from <script id="cc-plans" type="application/json">
   and powers: palette toggle, subnav scroll-spy, Smart Match (a lens), and the
   Year-1/Later matrix toggle. No second data source — no drift.
   ============================================================ */
(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s));};
  var money=function(n){return '$'+Number(n).toLocaleString();};

  /* ---- canonical data (server-rendered JSON) ---- */
  function plans(){
    var el=$('#cc-plans'); if(!el) return [];
    try{ return JSON.parse(el.textContent)||[]; }catch(e){ return []; }
  }

  /* ---- palette toggle (Warm / Jade) ---- */
  function initPalette(){
    $$('[data-cc-pal]').forEach(function(b){
      b.addEventListener('click',function(){
        document.documentElement.setAttribute('data-palette', b.getAttribute('data-cc-pal'));
        $$('[data-cc-pal]').forEach(function(x){ x.setAttribute('aria-pressed', x===b?'true':'false'); });
        try{ localStorage.setItem('cc-palette', b.getAttribute('data-cc-pal')); }catch(e){}
      });
    });
    try{ var p=localStorage.getItem('cc-palette'); if(p){ document.documentElement.setAttribute('data-palette',p);
      $$('[data-cc-pal]').forEach(function(x){ x.setAttribute('aria-pressed', x.getAttribute('data-cc-pal')===p?'true':'false'); }); } }catch(e){}
  }

  /* ---- sticky subnav scroll-spy ---- */
  function initSubnav(){
    var secs=$$('section[id]'); if(!secs.length||!('IntersectionObserver' in window)) return;
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ var id=en.target.id;
        $$('.cc-subnav a').forEach(function(a){ a.classList.toggle('on', a.getAttribute('href')==='#'+id); }); } });
    },{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){ io.observe(s); });
  }

  /* ---- coverage cell helpers (Year 1 or later years) ---- */
  function covText(c,yr){ if(!c) return 'Not covered'; var pct=(yr===2&&c[2]!=null)?c[2]:c[0]; var w=c[1]===0?'day 1':c[1]+'-mo'; return pct+'% · '+w; }
  function majPct(p,yr){ var c=p.cov&&p.cov.major; if(!c) return -1; return (yr===2&&c[2]!=null)?c[2]:c[0]; }

  /* ---- comparison matrix: Year-1 / Later toggle ---- */
  function initMatrix(){
    var tbl=$('#cc-cmp'), tog=$('#cc-yrtog'); if(!tbl) return;
    var P=plans(); var YR=1;
    function draw(){
      var cols=(typeof window.ccPlanPasses==='function')?P.filter(window.ccPlanPasses):P; if(!cols.length) cols=P;
      var minFrom=Math.min.apply(null,cols.map(function(p){return p.from;}));
      var maxMax=Math.max.apply(null,cols.map(function(p){return p.max;}));
      var maxMaj=Math.max.apply(null,cols.map(function(p){return majPct(p,YR);}));
      var head='<thead><tr><th class="rh">Spec</th>'+cols.map(function(p){return '<th>'+p.car+'<br><span style="font-weight:400;opacity:.8">'+p.nm+'</span></th>';}).join('')+'</tr></thead>';
      function row(label,fn){ return '<tr><th scope="row">'+label+'</th>'+cols.map(fn).join('')+'</tr>'; }
      function cell(v,best){ return best?'<td class="best"><span class="v">'+v+'</span><span class="pill">BEST</span></td>':'<td>'+v+'</td>'; }
      var b='';
      b+=row('From / mo',function(p){return cell(money(p.from),p.from===minFrom);});
      b+=row('Annual maximum',function(p){return cell(money(p.max)+((p.max2&&YR===2)?' → '+money(p.max2):''),p.max===maxMax);});
      b+=row('Deductible',function(p){return '<td>'+money(p.ded)+'</td>';});
      b+=row('Preventive',function(p){return '<td>'+covText(p.cov.prev,YR)+'</td>';});
      b+=row('Basic',function(p){return '<td>'+covText(p.cov.basic,YR)+'</td>';});
      b+=row('Major',function(p){return cell(covText(p.cov.major,YR),majPct(p,YR)===maxMaj&&maxMaj>0);});
      b+=row('Implants',function(p){return '<td>'+covText(p.cov.implant,YR)+'</td>';});
      b+=row('Orthodontics',function(p){return '<td>'+(p.cov.ortho?covText(p.cov.ortho,YR):'<span class="na">Not covered</span>')+'</td>';});
      b+=row('Coverage starts',function(p){return '<td>'+p.eff+'</td>';});
      b+=row('Network',function(p){return '<td style="font-size:11.5px">'+p.net+'</td>';});
      tbl.innerHTML='<caption class="cc-sr-only">PPO dental plans compared by specification</caption>'+head+'<tbody>'+b+'</tbody>';
    }
    if(tog){ tog.addEventListener('click',function(e){ var btn=e.target.closest('button[data-y]'); if(!btn)return;
      YR=+btn.getAttribute('data-y'); $$('button',tog).forEach(function(x){x.classList.toggle('on',x===btn);}); draw(); }); }
    document.addEventListener('cc-filter-change',draw);
    draw();
  }

  /* ---- Smart Match (a lens on the same data) ---- */
  var NEEDS={prev:'cleaning',basic:'filling',major:'crown / root canal',implant:'implant',ortho:'braces'};
  function initMatch(){
    var box=$('#cc-verdict'); if(!box) return;
    var P=plans(); var st={need:'major',time:0,budget:70};
    function score(p){ var c=p.cov[st.need]; if(!c) return null; var s=50,why=[],cau=''; var pct=c[0],w=c[1];
      s+=pct*0.4;
      if(w>st.time){ s-=(w-st.time)*7; cau='about a '+w+'-month wait before that is covered'; }
      else { s+=14; why.push(w===0?'covered from day one':'your timing clears the '+w+'-month wait'); }
      if(p.from>st.budget) s-=(p.from-st.budget)*1.1; else s+=8;
      s+=p.max/300; if(p.review) s-=40;
      why.push(pct+'% on '+NEEDS[st.need]);
      return {s:s,why:why.join(' · '),cau:cau}; }
    function render(){
      var scored=P.map(function(p){return {p:p,r:score(p)};}).filter(function(x){return x.r;}).sort(function(a,b){return b.r.s-a.r.s;});
      if(!scored.length){ box.innerHTML='<p style="color:var(--muted)">No plan covers that yet — try another need.</p>'; return; }
      function card(x,top){ return '<div class="cc-vplan'+(top?' top':'')+'"><div style="display:flex;justify-content:space-between;align-items:center">'+
        '<span class="nm">'+x.p.car+' '+x.p.nm+'</span><span class="tab" style="font-weight:700;color:var(--teal-night)">'+money(x.p.from)+'<small style="color:var(--muted)">/mo</small></span></div>'+
        '<div class="why">'+(top?'<b>Closest fit.</b> ':'<b>Backup.</b> ')+x.r.why+(x.r.cau?' · <span class="cau">'+x.r.cau+'</span>':'')+'</div></div>'; }
      box.innerHTML=card(scored[0],true)+(scored[1]?card(scored[1],false):'')+
        '<p style="font-family:var(--sans);font-size:11.5px;color:var(--muted);margin-top:12px">Pricing and availability need a location-specific quote.</p>';
    }
    document.addEventListener('click',function(e){
      var n=e.target.closest('[data-need]'); if(n){ st.need=n.getAttribute('data-need'); $$('[data-need]').forEach(function(x){x.classList.toggle('on',x===n);}); render(); }
      var t=e.target.closest('[data-time]'); if(t){ st.time=+t.getAttribute('data-time'); $$('[data-time]').forEach(function(x){x.classList.toggle('on',x===t);}); render(); }
    });
    var bud=$('#cc-budget'); if(bud){ bud.addEventListener('input',function(){ st.budget=+bud.value; var v=$('#cc-budget-val'); if(v)v.textContent=money(st.budget); render(); }); }
    render();
  }

  /* ---- glossary tooltips: hover + focus + tap, Esc to dismiss ---- */
  function initGlossary(){
    var GL={}; var gle=$('#cc-glossary'); if(gle){ try{ var gj=JSON.parse(gle.textContent); GL=gj.terms||gj||{}; }catch(e){} }
    var terms=$$('.cc-gloss[data-tip],.cc-gloss[data-term]'); if(!terms.length) return;
    var tip=document.createElement('div'); tip.className='cc-tip'; tip.setAttribute('role','tooltip'); tip.id='cc-tip'; document.body.appendChild(tip);
    var cur=null;
    function place(t){
      var r=t.getBoundingClientRect(), tw=tip.offsetWidth, th=tip.offsetHeight;
      var left=Math.max(8,Math.min(window.innerWidth-tw-8, r.left+window.scrollX+r.width/2-tw/2));
      var top=r.top+window.scrollY-th-9; if(top<window.scrollY+4) top=r.bottom+window.scrollY+9;
      tip.style.left=left+'px'; tip.style.top=top+'px';
    }
    function show(t){ cur=t;
      var key=t.getAttribute('data-term'), d=(key&&GL[key])?GL[key]:null;
      var label=(d&&d.term)?d.term:t.textContent.trim();
      var def=d?(d.def||d.short||''):(t.getAttribute('data-tip')||'');
      var why=d?d.why:''; var url=d?d.url:t.getAttribute('data-more');
      tip.innerHTML='<b>'+label+'.</b> '+def+(why?'<span class="why">Why it matters: '+why+'</span>':'')+(url?'<a class="more" href="'+url+'">Read the full guide →</a>':'');
      t.setAttribute('aria-describedby','cc-tip'); tip.classList.add('show'); place(t);
    }
    function hide(){ tip.classList.remove('show'); if(cur){ cur.removeAttribute('aria-describedby'); cur=null; } }
    terms.forEach(function(t){
      if(t.tagName!=='BUTTON'){ t.setAttribute('tabindex','0'); t.setAttribute('role','button'); }
      t.addEventListener('mouseenter',function(){show(t);});
      t.addEventListener('mouseleave',function(){ setTimeout(function(){ if(!tip.matches(':hover')) hide(); },80); });
      t.addEventListener('focus',function(){show(t);});
      t.addEventListener('blur',hide);
      t.addEventListener('click',function(e){ e.preventDefault(); cur===t?hide():show(t); });
      t.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); cur===t?hide():show(t); } });
    });
    tip.addEventListener('mouseleave',hide);
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') hide(); });
    window.addEventListener('scroll',function(){ if(cur) hide(); },{passive:true});
  }

  /* ---- analytics: one delegated listener pushes every data-ev to dataLayer ---- */
  function initAnalytics(){
    window.dataLayer=window.dataLayer||[];
    document.addEventListener('click',function(e){ var el=e.target.closest('[data-ev]'); if(!el) return;
      window.dataLayer.push({event:el.getAttribute('data-ev'),plan:el.getAttribute('data-key')||el.getAttribute('data-name')||null,ts:Date.now()}); });
  }

  /* ---- feature filter (implants / nowait / ortho / cheap) ---- */
  function planPasses(p,f){
    if(f==='nowait') return !!(p.cov&&((p.cov.major&&p.cov.major[1]===0)||(p.cov.basic&&p.cov.basic[1]===0)));
    if(f==='implants') return !!(p.cov&&p.cov.implant);
    if(f==='ortho') return !!(p.cov&&p.cov.ortho);
    if(f==='cheap') return p.from<=50;
    return true;
  }
  function initFilter(){
    var box=$('.cc-toolbar');
    window.ccActiveFilters=function(){ return box?$$('input[data-filter]:checked',box).map(function(i){return i.getAttribute('data-filter');}):[]; };
    window.ccPlanPasses=function(p){ return window.ccActiveFilters().every(function(f){return planPasses(p,f);}); };
    if(box) box.addEventListener('change',function(){ document.dispatchEvent(new CustomEvent('cc-filter-change')); });
  }

  /* ---- compare tray: pin up to 4 plans ---- */
  function initTray(){
    var tray=$('#cc-tray'); if(!tray) return; var picked=[];
    function render(){ tray.classList.toggle('show',picked.length>0);
      tray.innerHTML='<span class="lbl">Comparing</span>'+picked.map(function(k){ var p=(plans().filter(function(x){return x.k===k;})[0])||{car:k,nm:''};
        return '<span class="chip">'+p.car+' '+p.nm+' <button data-untray="'+k+'" aria-label="Remove">×</button></span>'; }).join('')+
        '<a class="cc-btn cc-btn--green go" href="#compare" data-ev="comparison_open">Compare '+picked.length+' →</a>'; }
    document.addEventListener('change',function(e){ var cb=e.target.closest('[data-cmp]'); if(!cb) return;
      var k=cb.getAttribute('data-cmp');
      if(cb.checked){ if(picked.length>=4){ cb.checked=false; return; } if(picked.indexOf(k)<0) picked.push(k); }
      else picked=picked.filter(function(x){return x!==k;}); render(); });
    tray.addEventListener('click',function(e){ var b=e.target.closest('[data-untray]'); if(!b) return; var k=b.getAttribute('data-untray');
      picked=picked.filter(function(x){return x!==k;}); var cb=document.querySelector('[data-cmp="'+k+'"]'); if(cb) cb.checked=false; render(); });
  }

  function init(){ initPalette(); initSubnav(); initMatrix(); initMatch(); initGlossary(); initAnalytics(); initFilter(); initTray(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
