/* CoverCapy Mega Nav + Universal Insurance/Booking Modal */
(function(){
  if(window.__CoverCapyMegaNavInitialized) return;
  window.__CoverCapyMegaNavInitialized = true;

(function(){
  "use strict";
  var nav=document.getElementById('cc-nav');
  var backdrop=document.getElementById('cc-backdrop');
  var links=Array.prototype.slice.call(document.querySelectorAll('.cc-link'));
  var openTimer=null,closeTimer=null,activeLink=null;
  var DESKTOP=function(){return window.matchMedia('(min-width:1081px)').matches;};

  var curtainBtn=document.getElementById('cc-curtain'),ccStage=document.getElementById('cc-stage');
  function openMega(link){
    clearTimeout(closeTimer);
    links.forEach(function(l){if(l!==link)l.classList.remove('is-open');});
    link.classList.add('is-open'); activeLink=link;
    backdrop.classList.add('show'); nav.classList.add('dimmed'); if(curtainBtn)curtainBtn.classList.add('show');
  }
  function closeMega(){
    links.forEach(function(l){l.classList.remove('is-open');});
    activeLink=null; backdrop.classList.remove('show'); nav.classList.remove('dimmed'); if(curtainBtn)curtainBtn.classList.remove('show');
  }
  function scheduleClose(){clearTimeout(closeTimer);closeTimer=setTimeout(closeMega,180);}

  links.forEach(function(link){
    var anchor=link.querySelector('.cc-link-anchor');
    var caret=link.querySelector('[data-toggle]');
    var mega=link.querySelector('.cc-mega');

    link.addEventListener('mouseenter',function(){if(!DESKTOP())return;clearTimeout(closeTimer);openTimer=setTimeout(function(){openMega(link);},55);});
    link.addEventListener('mouseleave',function(){if(!DESKTOP())return;clearTimeout(openTimer);scheduleClose();});
    if(mega){
      mega.addEventListener('mouseenter',function(){if(!DESKTOP())return;clearTimeout(closeTimer);});
      mega.addEventListener('mouseleave',function(){if(!DESKTOP())return;scheduleClose();});
    }
    if(caret){caret.addEventListener('click',function(e){if(!DESKTOP())return;e.preventDefault();e.stopPropagation();link.classList.contains('is-open')?closeMega():openMega(link);});}
    anchor.addEventListener('click',function(){if(DESKTOP())closeMega();});
    link.addEventListener('focusin',function(){if(DESKTOP())openMega(link);});
    anchor.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMega();anchor.focus();}});
  });

  function curtainClose(){
    var m=document.querySelector('.cc-link.is-open .cc-mega');
    if(!m||!ccStage){closeMega();return;}
    ccStage.style.height=m.offsetHeight+'px';
    ccStage.classList.remove('done');ccStage.classList.add('closing');
    setTimeout(function(){closeMega();ccStage.classList.add('done');},470);
    setTimeout(function(){ccStage.classList.remove('closing');ccStage.classList.remove('done');ccStage.style.height='0px';},780);
  }
  if(curtainBtn)curtainBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();curtainClose();});
  backdrop.addEventListener('click',closeMega);
  document.addEventListener('click',function(e){if(!e.target.closest('.cc-link')&&!e.target.closest('.cc-mega'))closeMega();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMega();});
  window.addEventListener('scroll',function(){if(activeLink)closeMega();},{passive:true});

  /* ZIP */
  var zip=document.getElementById('nav-zip'),zipBtn=document.getElementById('nav-zip-btn');
  var ZIP_DB={'92708':{city:'Fountain Valley',area:'Orange County',region:'West Coast',slug:'orange-county/fountain-valley'},'92728':{city:'Fountain Valley',area:'Orange County',region:'West Coast',slug:'orange-county/fountain-valley'},'92602':{city:'Irvine',area:'Orange County',region:'West Coast',slug:'orange-county/irvine'},'92604':{city:'Irvine',area:'Orange County',region:'West Coast',slug:'orange-county/irvine'},'92612':{city:'Irvine',area:'Orange County',region:'West Coast',slug:'orange-county/irvine'},'92618':{city:'Irvine',area:'Orange County',region:'West Coast',slug:'orange-county/irvine'},'92620':{city:'Irvine',area:'Orange County',region:'West Coast',slug:'orange-county/irvine'},'92660':{city:'Newport Beach',area:'Orange County',region:'West Coast',slug:'orange-county/newport-beach'},'92661':{city:'Newport Beach',area:'Orange County',region:'West Coast',slug:'orange-county/newport-beach'},'92663':{city:'Newport Beach',area:'Orange County',region:'West Coast',slug:'orange-county/newport-beach'},'92626':{city:'Costa Mesa',area:'Orange County',region:'West Coast',slug:'orange-county/costa-mesa'},'92627':{city:'Costa Mesa',area:'Orange County',region:'West Coast',slug:'orange-county/costa-mesa'},'92646':{city:'Huntington Beach',area:'Orange County',region:'West Coast',slug:'orange-county/huntington-beach'},'92647':{city:'Huntington Beach',area:'Orange County',region:'West Coast',slug:'orange-county/huntington-beach'},'92648':{city:'Huntington Beach',area:'Orange County',region:'West Coast',slug:'orange-county/huntington-beach'},'92649':{city:'Huntington Beach',area:'Orange County',region:'West Coast',slug:'orange-county/huntington-beach'},'92801':{city:'Anaheim',area:'Orange County',region:'West Coast',slug:'orange-county/anaheim'},'92802':{city:'Anaheim',area:'Orange County',region:'West Coast',slug:'orange-county/anaheim'},'92805':{city:'Anaheim',area:'Orange County',region:'West Coast',slug:'orange-county/anaheim'},'92806':{city:'Anaheim',area:'Orange County',region:'West Coast',slug:'orange-county/anaheim'},'92701':{city:'Santa Ana',area:'Orange County',region:'West Coast',slug:'orange-county/santa-ana'},'92703':{city:'Santa Ana',area:'Orange County',region:'West Coast',slug:'orange-county/santa-ana'},'92704':{city:'Santa Ana',area:'Orange County',region:'West Coast',slug:'orange-county/santa-ana'},'92705':{city:'Santa Ana',area:'Orange County',region:'West Coast',slug:'orange-county/santa-ana'},'91745':{area:'Los Angeles County',region:'West Coast',cities:[{city:'Hacienda Heights',slug:'los-angeles-county/hacienda-heights'},{city:'City of Industry',slug:'los-angeles-county/city-of-industry'}]},'91748':{city:'Rowland Heights',area:'Los Angeles County',region:'West Coast',slug:'los-angeles-county/rowland-heights'}};
  function regionFromPrefix(z){var n=parseInt(z.slice(0,3),10);if((n>=900&&n<=961)||(n>=970&&n<=994)||(n>=889&&n<=899))return 'West Coast';if((n>=850&&n<=865)||(n>=870&&n<=884)||(n>=750&&n<=799)||(n>=730&&n<=749))return 'Southwest';if((n>=600&&n<=629)||(n>=430&&n<=458)||(n>=480&&n<=499)||(n>=530&&n<=567)||(n>=460&&n<=479)||(n>=500&&n<=528)||(n>=630&&n<=658))return 'Midwest';if((n>=320&&n<=349)||(n>=300&&n<=319)||(n>=270&&n<=289)||(n>=370&&n<=385)||(n>=290&&n<=299)||(n>=350&&n<=369)||(n>=386&&n<=427))return 'South';if((n>=100&&n<=149)||(n>=10&&n<=89)||(n>=150&&n<=269))return 'East Coast';return 'West Coast';}
  var REGION_SLUG={'West Coast':'west-coast','Southwest':'southwest','Midwest':'midwest','South':'south','East Coast':'east-coast'};
  function highlightRegion(r){var cs=document.querySelectorAll('.region-card');for(var k=0;k<cs.length;k++){cs[k].classList.toggle('active',cs[k].getAttribute('data-region')===r);}}
  var CC_RECENT='cc_recent_cities';
  function ccGetRecent(){try{return JSON.parse(localStorage.getItem(CC_RECENT)||'[]');}catch(e){return window._ccRecent||[];}}
  function ccSetRecent(a){try{localStorage.setItem(CC_RECENT,JSON.stringify(a));}catch(e){window._ccRecent=a;}}
  function ccRenderRecent(){var el=document.getElementById('recent-chips');if(!el)return;var a=ccGetRecent();if(!a.length){el.innerHTML='<span class="recent-empty">Search a ZIP and your recent cities appear here.</span>';return;}el.innerHTML=a.map(function(r){return '<a class="recent-chip" href="/dentists/'+r.slug+'.html"><span class="rc-ic">\u25F7</span>'+r.city+'</a>';}).join('');}
  function ccAddRecent(city,slug){if(!city||!slug)return;var a=ccGetRecent().filter(function(r){return r.slug!==slug;});a.unshift({city:city,slug:slug});ccSetRecent(a.slice(0,5));ccRenderRecent();}
  if(!ccGetRecent().length){ccSetRecent([{city:'Fountain Valley',slug:'orange-county/fountain-valley'},{city:'Irvine',slug:'orange-county/irvine'},{city:'Costa Mesa',slug:'orange-county/costa-mesa'}]);}
  ccRenderRecent();
  var NEARBY={'Fountain Valley':[{name:'Huntington Beach',slug:'orange-county/huntington-beach'},{name:'Costa Mesa',slug:'orange-county/costa-mesa'},{name:'Santa Ana',slug:'orange-county/santa-ana'},{name:'Garden Grove',slug:'orange-county/garden-grove'},{name:'Westminster',slug:'orange-county/westminster'}],'Irvine':[{name:'Tustin',slug:'orange-county/tustin'},{name:'Costa Mesa',slug:'orange-county/costa-mesa'},{name:'Lake Forest',slug:'orange-county/lake-forest'},{name:'Newport Beach',slug:'orange-county/newport-beach'},{name:'Santa Ana',slug:'orange-county/santa-ana'}],'Anaheim':[{name:'Orange',slug:'orange-county/orange'},{name:'Fullerton',slug:'orange-county/fullerton'},{name:'Garden Grove',slug:'orange-county/garden-grove'},{name:'Santa Ana',slug:'orange-county/santa-ana'},{name:'Buena Park',slug:'orange-county/buena-park'}],'Costa Mesa':[{name:'Newport Beach',slug:'orange-county/newport-beach'},{name:'Irvine',slug:'orange-county/irvine'},{name:'Huntington Beach',slug:'orange-county/huntington-beach'},{name:'Santa Ana',slug:'orange-county/santa-ana'},{name:'Fountain Valley',slug:'orange-county/fountain-valley'}],'Huntington Beach':[{name:'Fountain Valley',slug:'orange-county/fountain-valley'},{name:'Costa Mesa',slug:'orange-county/costa-mesa'},{name:'Westminster',slug:'orange-county/westminster'},{name:'Newport Beach',slug:'orange-county/newport-beach'},{name:'Seal Beach',slug:'orange-county/seal-beach'}],'Newport Beach':[{name:'Costa Mesa',slug:'orange-county/costa-mesa'},{name:'Irvine',slug:'orange-county/irvine'},{name:'Huntington Beach',slug:'orange-county/huntington-beach'},{name:'Laguna Beach',slug:'orange-county/laguna-beach'},{name:'Tustin',slug:'orange-county/tustin'}]};
  var _feat=document.getElementById('find-featured');var FEAT_KYT_HTML=_feat?_feat.innerHTML:'';var KYT_MI={'Fountain Valley':1,'Costa Mesa':4,'Huntington Beach':5,'Santa Ana':6,'Newport Beach':8,'Irvine':9,'Anaheim':11,'Hacienda Heights':22,'City of Industry':23};function placementHTML(city){return '<div class="featured-banner">◆ Featured Dentist · Open spot</div>'+'<div class="featured-body"><div class="featured-avatar">✦</div><div class="featured-copy"><div class="featured-name">No Platinum Elite dentist<br>near '+city+'</div><div class="featured-meta">This featured spot is open. It could be your practice.</div><div class="feature-lines"><span>Featured in local searches</span><span>Patient rewards visibility</span></div></div></div>'+'<div class="featured-actions"><a class="featured-btn primary" href="/dentist-portal.html#platinum-elite">Apply for Platinum Elite</a><a class="featured-btn secondary" href="/claim-dentist-listing-profile.html">Claim your profile</a></div>';}function goZip(){var v=(zip.value||'').replace(/\D/g,'').slice(0,5);if(v.length!==5){toast('Enter a 5-digit ZIP');zip.focus();return;}var _b=document.getElementById('nav-zip-btn'),_t=document.getElementById('nav-zip-tag'),_f=document.getElementById('find-featured');if(_b){_b.disabled=true;_b.textContent='Searching\u2026';}if(_f){_f.className='featured-card promo-action-card';_f.innerHTML='<div class="featured-banner plan-feature-banner">\u25C6 Searching near '+v+'\u2026</div><div class="featured-body"><div class="featured-avatar feat-radar-av"><i></i><i></i><i></i><span class="feat-pin">\uD83D\uDCCD</span></div><div style="flex:1;min-width:0"><div class="sk-line" style="width:64%"></div><div class="sk-line" style="width:50%;margin-top:8px"></div><div class="sk-line" style="width:72%;margin-top:8px"></div></div></div><div class="featured-actions"><div class="sk-btn"></div><div class="sk-btn"></div></div>';}if(_t){_t.classList.add('show');_t.innerHTML='<div class="find-tag-eyebrow">Searching</div><span class="find-tag find-tag-loading"><span class="find-dots"><i></i><i></i><i></i></span>Checking accredited dentists near '+v+'</span><div class="find-tag-meta">One moment\u2026</div>';}setTimeout(function(){renderZip(v);if(_b){_b.disabled=false;_b.textContent='Search';}},1100);}
  function renderZip(v){var loc=ZIP_DB[v];var tagEl=document.getElementById('nav-zip-tag'),ctaEl=document.getElementById('nav-find-cta'),ctaAll=document.getElementById('nav-find-all'),nearLabel=document.getElementById('nav-near-label'),chips=document.getElementById('recent-chips'),feat=document.getElementById('find-featured');var cities=loc?(loc.cities||[{city:loc.city,slug:loc.slug}]):[];var area=loc?(loc.area||''):'',region=loc?(loc.region||''):'';function setCTAs(c){if(ctaEl){ctaEl.href='/ppodentists.html?zip='+encodeURIComponent(v)+(c.slug?'&city='+encodeURIComponent(c.slug):'');ctaEl.innerHTML='Browse Dentists Near '+c.city;ctaEl.classList.remove('cta-idle');ctaEl.classList.add('cta-live');ctaEl.classList.remove('cta-cue');void ctaEl.offsetWidth;ctaEl.classList.add('cta-cue');}if(ctaAll){ctaAll.href='/ppodentists.html?zip='+encodeURIComponent(v)+(c.slug?'&city='+encodeURIComponent(c.slug):'');}}var pick=cities.length?cities[0]:{city:'ZIP '+v,slug:''};var kytMi=(loc&&pick)?KYT_MI[pick.city]:null;var found=(loc&&kytMi!=null&&kytMi<=18);if(tagEl){var msg=found?'Platinum Elite dentist found near you':'Capy Accredited dentists available near you';var tagCls=found?'find-tag-found':'find-tag-none';var html='<div class="find-tag-eyebrow">Step 2 · Searched ZIP '+v+'</div>';if(cities.length>1){html+='<div class="find-pick" style="margin-top:2px">'+cities.map(function(c,idx){return '<button type="button" class="find-pick-chip'+(idx===0?' on':'')+'" data-slug="'+(c.slug||'')+'" data-city="'+c.city+'"><span class="find-tag-pin">\u{1F4CD}</span>'+c.city+'</button>';}).join('')+'</div><div class="find-tag-meta">'+msg+' \u00b7 pick your city, then click Browse to see them →</div>';}else if(cities.length===1){html+='<span class="find-tag '+tagCls+'"><span class="find-tag-pin">\u{1F4CD}</span>'+cities[0].city+'</span><div class="find-tag-meta">'+msg+(area?' \u00b7 '+area:'')+' \u00b7 click Browse to see them →</div>';}else{html+='<span class="find-tag '+tagCls+'"><span class="find-tag-pin">\u{1F4CD}</span>ZIP '+v+'</span><div class="find-tag-meta">ZIP '+v+' located \u00b7 '+msg+' \u00b7 click Browse to see them →</div>';}tagEl.innerHTML=html;tagEl.classList.add('show');var pks=tagEl.querySelectorAll('.find-pick-chip');Array.prototype.forEach.call(pks,function(b){b.addEventListener('click',function(){Array.prototype.forEach.call(pks,function(x){x.classList.remove('on');});b.classList.add('on');setCTAs({city:b.getAttribute('data-city'),slug:b.getAttribute('data-slug')});});});}setCTAs(pick);var _rdy=document.getElementById("nav-find-ready");if(_rdy)_rdy.hidden=false;if(cities.length)ccAddRecent(cities[0].city,cities[0].slug);if(feat){if(found){feat.className='featured-card promo-action-card dentist-feature-card';feat.innerHTML=FEAT_KYT_HTML;var _mel=document.getElementById('feat-mi');if(_mel)_mel.textContent=' \u00b7 ~'+kytMi+' mi away';}else{feat.className='featured-card promo-action-card open-spot-card';feat.innerHTML=placementHTML(cities.length?cities[0].city:'your area');}}var near=(loc&&typeof window.ccNearbyCities==='function'&&window.ccNearbyCities(v,loc))||(loc&&cities[0]&&NEARBY[cities[0].city])||[];if(nearLabel)nearLabel.textContent=near.length?'Cities nearby':'Recent searches';if(chips&&near.length){chips.innerHTML=near.slice(0,6).map(function(c){return '<a class="recent-chip" href="/ppodentists.html?city='+encodeURIComponent(c.slug||'')+'">'+c.name+'</a>';}).join('');}if(typeof window.ccLoadDentists==='function'){try{window.ccLoadDentists(v,loc||{});}catch(e){}}}
  if(zip){zip.addEventListener('input',function(){zip.value=zip.value.replace(/\D/g,'');});zip.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();goZip();}});zip.addEventListener('click',function(e){e.stopPropagation();});}
  if(zipBtn)zipBtn.addEventListener('click',function(e){e.stopPropagation();goZip();});

  var pzip=document.getElementById('portal-zip'),pzipBtn=document.getElementById('portal-zip-btn');
  function goPortalZip(){var v=(pzip.value||'').replace(/\D/g,'').slice(0,5);if(v.length!==5){toast('Enter a 5-digit ZIP');pzip.focus();return;}window.location.assign('/claim-dentist-listing-profile.html?zip='+v);}
  if(pzip){pzip.addEventListener('input',function(){pzip.value=pzip.value.replace(/\D/g,'');});pzip.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();goPortalZip();}});pzip.addEventListener('click',function(e){e.stopPropagation();});}
  if(pzipBtn)pzipBtn.addEventListener('click',function(e){e.stopPropagation();goPortalZip();});

  var ppoSwitch=document.getElementById('ppo-switch');
  if(ppoSwitch){
    var ppoOpts=ppoSwitch.querySelectorAll('.ppo-opt');
    var ppoLists=document.querySelectorAll('.ppo-points');
    ppoOpts.forEach(function(btn){
      btn.addEventListener('click',function(e){
        e.stopPropagation();
        var plan=btn.getAttribute('data-plan');
        ppoSwitch.classList.toggle('is-hmo',plan==='hmo');
        ppoOpts.forEach(function(o){o.classList.toggle('is-on',o===btn);});
        ppoLists.forEach(function(ul){ul.hidden=ul.getAttribute('data-for')!==plan;});
      });
    });
  }

  /* PLAN FINDER */
  var PF_MAP={
    me:['UnitedHealthcare Primary Dental','Fast activation, coverage in days','/ppo-plans/uhc-primary-ppo.html'],
    family:['Humana Extend 5000','Everyone covered under one plan','/family-ppo-dental-plans.html'],
    senior:['Ameritas Primestar Complete','Implants, crowns and major work covered','/ppo-dental-plans-seniors.html'],
    ortho:['Guardian Premier 2.0','Braces and Invisalign for children covered','/ppo-plans/orthodontics.html']
  };
  var pfPills=document.querySelectorAll('.pf-pill'),pfName=document.getElementById('pf-name'),pfBen=document.getElementById('pf-benefit'),pfGo=document.getElementById('pf-go');
  function pfSelect(key){var d=PF_MAP[key];if(!d||!pfName)return;pfName.textContent=d[0];pfBen.textContent=d[1];pfGo.setAttribute('href',d[2]);
    pfName.classList.remove('pf-fade');pfBen.classList.remove('pf-fade');void pfName.offsetWidth;pfName.classList.add('pf-fade');pfBen.classList.add('pf-fade');
    for(var i=0;i<pfPills.length;i++)pfPills[i].classList.toggle('on',pfPills[i].getAttribute('data-plan')===key);}
  for(var pi=0;pi<pfPills.length;pi++){pfPills[pi].addEventListener('click',function(e){e.stopPropagation();pfSelect(this.getAttribute('data-plan'));});}

  /* DRAWER */
  var burger=document.getElementById('cc-burger'),drawer=document.getElementById('cc-drawer'),closeBtn=document.getElementById('cc-drawer-close');
  function openDrawer(){drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');burger.classList.add('is-open');burger.setAttribute('aria-expanded','true');document.body.classList.add('cc-locked');}
  function closeDrawer(){drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');burger.classList.remove('is-open');burger.setAttribute('aria-expanded','false');document.body.classList.remove('cc-locked');}
  if(burger)burger.addEventListener('click',function(){drawer.classList.contains('is-open')?closeDrawer():openDrawer();});
  if(closeBtn)closeBtn.addEventListener('click',closeDrawer);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDrawer();});
  Array.prototype.slice.call(document.querySelectorAll('[data-acc]')).forEach(function(btn){
    btn.addEventListener('click',function(){
      var body=btn.nextElementSibling,isOpen=btn.classList.contains('is-active');
      document.querySelectorAll('.cc-dacc-btn.is-active').forEach(function(b){if(b!==btn){b.classList.remove('is-active');b.nextElementSibling.style.maxHeight=null;}});
      if(isOpen){btn.classList.remove('is-active');body.style.maxHeight=null;}else{btn.classList.add('is-active');body.style.maxHeight=body.scrollHeight+'px';}
    });
  });
  document.querySelectorAll('.cc-dacc-link,.cc-drawer-join,.cc-drawer-sign').forEach(function(a){a.addEventListener('click',closeDrawer);});

  /* toast (ZIP validation only) */
  var toastEl=null,toastTimer=null;
  function toast(msg){if(!toastEl){toastEl=document.createElement('div');toastEl.className='cc-toast';document.body.appendChild(toastEl);}toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){toastEl.classList.remove('show');},2400);}
})();

(function(){
  var s=document.getElementById('est-slider'); if(!s) return;
  var qv=document.getElementById('est-qval'),full=document.getElementById('est-full'),ppo=document.getElementById('est-ppo'),save=document.getElementById('est-save');
  var TYP=1800, FIRST=675, ADD=600;
  function money(n){return '$'+n.toLocaleString('en-US');}
  function upd(){
    var n=parseInt(s.value,10);
    qv.textContent='\u00d7'+n;
    var f=TYP*n, pp=FIRST+ADD*(n-1);
    full.textContent=money(f);
    ppo.textContent=money(pp);
    save.textContent=money(f-pp);
    var pct=(n-1)/5*100;
    s.style.background='linear-gradient(90deg,var(--emerald) 0%,var(--emerald) '+pct+'%,var(--sand) '+pct+'%)';
  }
  s.addEventListener('input',upd);
  var minus=document.getElementById('est-minus'),plus=document.getElementById('est-plus');
  function step(d){var n=Math.min(6,Math.max(1,parseInt(s.value,10)+d));s.value=n;upd();}
  if(minus)minus.addEventListener('click',function(){step(-1);});
  if(plus)plus.addEventListener('click',function(){step(1);});
  upd();
})();

/* CoverCapy i18n - full-page translation.
   Layer 1 (DICT/HTML): curated, instant, offline - nav, hero, section headers, italic titles.
   Layer 2 (machine translation): auto-translates EVERYTHING else live, cached in localStorage.
   PRODUCTION: for best quality + dynamic modals, set window.ccMT = async (text,lang)=>{ ...call your Gemini / Google Cloud Translation backend... return translated; }
   It overrides the default provider below. window.ccI18nReport shows coverage after each switch. */
(function(){
  var DICT = {"What does PPO dental insurance cover?": {"zh": "PPO 牙科保险保障哪些项目？", "es": "¿Qué cubre el seguro dental PPO?"}, "Dental costs: with vs without insurance": {"zh": "牙科费用：有保险与无保险对比", "es": "Costos dentales: con y sin seguro"}, "See the savings": {"zh": "看看能省多少", "es": "Vea el ahorro"}, "How to lower your dental costs": {"zh": "如何降低您的牙科费用", "es": "Cómo reducir sus costos dentales"}, "Proven ways to save": {"zh": "经过验证的省钱方法", "es": "Formas comprobadas de ahorrar"}, "Is dental insurance worth it?": {"zh": "牙科保险值得买吗？", "es": "¿Vale la pena el seguro dental?"}, "When it pays off": {"zh": "何时划算", "es": "Cuándo conviene"}, "Free Whitening Session": {"zh": "免费美白疗程", "es": "Sesión de blanqueamiento gratis"}, "Invisalign Promo": {"zh": "Invisalign 优惠", "es": "Promo Invisalign"}, "Member-exclusive rate": {"zh": "会员专属价格", "es": "Tarifa exclusiva para miembros"}, "Botox for TMJ": {"zh": "TMJ 肉毒治疗", "es": "Bótox para ATM"}, "Therapeutic jaw relief": {"zh": "缓解颉部紧张", "es": "Alivio terapéutico de mandíbula"}, "+700 Crowns for you, a welcome bonus for them": {"zh": "您获得 +700 皇冠，对方获得欢迎奖励", "es": "+700 Crowns para usted, un bono de bienvenida para ellos"}, "Your local results": {"zh": "您的本地结果", "es": "Sus resultados locales"}, "Enter a ZIP": {"zh": "输入邮编", "es": "Ingrese un código postal"}, "We'll show your city and the dentists nearby.": {"zh": "我们会显示您的城市以及附近的牙医。", "es": "Le mostraremos su ciudad y los dentistas cercanos."}, "Platinum Elite · Featured Dentist": {"zh": "白金尊享 · 特色牙医", "es": "Platinum Elite · Dentista destacado"}, "General & Cosmetic Dentistry": {"zh": "综合与美容牙科", "es": "Odontología general y estética"}, "212 Google reviews": {"zh": "212 条谷歌评价", "es": "212 reseñas de Google"}, "Call": {"zh": "致电", "es": "Llamar"}, "Apply for Capy Accreditation": {"zh": "激活会员", "es": "Activar membresía"}, "Find a PPO dentist near you.": {"zh": "查找您附近接受 PPO 的牙医。", "es": "Encuentre un dentista PPO cerca de usted."}, "Enter your ZIP. We'll find your city, the areas nearby, and the PPO dentists around you.": {"zh": "输入您的邮编。我们会找到您所在的城市、附近区域，以及您周边接受 PPO 的牙医。", "es": "Ingrese su código postal. Encontraremos su ciudad, las áreas cercanas y los dentistas PPO a su alrededor."}, "Accepts your PPO": {"zh": "接受您的 PPO", "es": "Acepta su PPO"}, "Compare PPO Plans": {"zh": "激活保障", "es": "Activar cobertura"}, "Where patients look first": {"zh": "患者最先看到的地方", "es": "Donde los pacientes miran primero"}, "Patient rewards visibility": {"zh": "患者奖励可见度", "es": "Visibilidad de recompensas para pacientes"}, "By application": {"zh": "需申请", "es": "Por solicitud"}, "Cost guides": {"zh": "费用指南", "es": "Guías de costos"}, "Preventive, basic & major": {"zh": "预防、基础与重大项目", "es": "Preventivo, básico y mayor"}, "How 0% dental financing works": {"zh": "0% 牙科分期如何运作", "es": "Cómo funciona el financiamiento dental al 0%"}, "Spread the cost, no interest": {"zh": "分摊费用，零利息", "es": "Reparta el costo, sin intereses"}, "How it works": {"zh": "使用流程", "es": "Cómo funciona"}, "Enter your ZIP": {"zh": "输入您的邮编", "es": "Ingrese su código postal"}, "Plan ahead": {"zh": "提前规划", "es": "Planifique con tiempo"}, "Time it around your benefits": {"zh": "围绕您的福利安排时间", "es": "Planéelo según sus beneficios"}, "Use your annual maximum before it resets.": {"zh": "在年度额度重置前充分利用。", "es": "Use su máximo anual antes de que se reinicie."}, "Start with the basics": {"zh": "从基础项目开始", "es": "Comience por lo básico"}, "Preventive care now prevents major work later.": {"zh": "现在做好预防，避免日后的大型治疗。", "es": "El cuidado preventivo ahora evita trabajos mayores después."}, "Stage major treatment": {"zh": "分阶段进行大型治疗", "es": "Escalone los tratamientos mayores"}, "Split big cases across benefit years.": {"zh": "将大型病例分摄到不同福利年度。", "es": "Reparta los casos grandes entre años de beneficios."}, "Estimate by treatment": {"zh": "按治疗项目估算", "es": "Estimar por tratamiento"}, "Crown": {"zh": "牙冠", "es": "Corona"}, "Implant": {"zh": "种植牙", "es": "Implante"}, "Root canal": {"zh": "根管", "es": "Endodoncia"}, "Monthly Payment Options": {"zh": "月供方案", "es": "Opciones de Pago Mensual"}, "Smart Timing Strategy": {"zh": "智慧时机策略", "es": "Estrategia de Tiempo Inteligente"}, "Exclusive placement · 1 of 1": {"zh": "独家展位 · 仅此一席", "es": "Espacio exclusivo · 1 de 1"}, "Become our financing partner": {"zh": "成为我们的融资合作伙伴", "es": "Conviértase en nuestro socio de financiamiento"}, "One brand, featured inside every estimate a patient sees.": {"zh": "一个品牌，呈现在患者看到的每一份费用估算中。", "es": "Una marca, presente en cada estimación que ve el paciente."}, "By application · reserved for one": {"zh": "需申请 · 仅留一席", "es": "Por solicitud · reservado para uno"}, "Basic": {"zh": "基础", "es": "Básico"}, "Major": {"zh": "大型", "es": "Mayor"}, "Crowns, implants, root canals": {"zh": "牙冠、种植牙、根管", "es": "Coronas, implantes, endodoncias"}, "Treatment": {"zh": "治疗费用", "es": "Tratamiento"}, "Insurance covers": {"zh": "保险报销", "es": "El seguro cubre"}, "You pay": {"zh": "您支付", "es": "Usted paga"}, "Spread at 0% APR": {"zh": "0% 年利率分期", "es": "Reparta al 0% de interés"}, "/mo": {"zh": "/月", "es": "/mes"}, "Insurance knocks it down. 0% financing spreads the rest.": {"zh": "保险先减一笔，0% 分期再摊余款。", "es": "El seguro lo reduce. El financiamiento al 0% reparte el resto."}, "Showing offices near": {"zh": "正在显示附近诊所", "es": "Mostrando consultorios cerca de"}, "Searching near": {"zh": "正在搜索附近", "es": "Buscando cerca de"}, "Find dentists nearby": {"zh": "查找附近牙医", "es": "Buscar dentistas cercanos"}, "See all dentists nearby": {"zh": "查看附近所有牙医", "es": "Ver todos los dentistas cercanos"}, "See all dentists": {"zh": "查看所有牙医", "es": "Ver todos los dentistas"}, "Nearby cities": {"zh": "周边城市", "es": "Ciudades cercanas"}, "Search": {"zh": "搜索", "es": "Buscar"}, "See featured dentists": {"zh": "查看精选牙医", "es": "Ver dentistas destacados"}, "Enter your ZIP. We'll pinpoint your city, show the cities around it, and surface the Capy Accredited offices nearby.": {"zh": "输入您的邮编。我们将定位您所在的城市、显示周边城市，并呈现附近的 Capy 认证诊所。", "es": "Ingrese su código postal. Localizaremos su ciudad, mostraremos las ciudades cercanas y presentaremos los consultorios Capy Acreditados cercanos."}, "No paid placement": {"zh": "无付费排名", "es": "Sin posiciones pagadas"}, "Real patient reviews": {"zh": "真实患者评价", "es": "Reseñas de pacientes reales"}, "Capy Accredited": {"zh": "Capy 认证", "es": "Capy Acreditado"}, "Capy Accredited badge": {"zh": "Capy 认证徽章", "es": "Insignia Capy Acreditado"}, "Featured in local city searches": {"zh": "在本地城市搜索中精选展示", "es": "Destacado en búsquedas de la ciudad"}, "Priority placement": {"zh": "优先展示", "es": "Posición prioritaria"}, "The badge patients recognize first.": {"zh": "患者会按此徽章筛选。", "es": "La insignia que los pacientes filtran."}, "The Standard": {"zh": "标准版", "es": "El Estándar"}, "Apply": {"zh": "立即申请", "es": "Solicitar"}, "Listed": {"zh": "已收录", "es": "Listado"}, "Verified, indexed, findable.": {"zh": "已验证、已索引、可查找。", "es": "Verificado, indexado, localizable."}, "Apply for Platinum Elite": {"zh": "申请铂金精英", "es": "Solicitar Platinum Elite"}, "Featured Promotion": {"zh": "精选推广", "es": "Promoción Destacada"}, "Feature your promotion to PPO patients": {"zh": "向 PPO 患者展示您的优惠", "es": "Destaque su promoción ante pacientes PPO"}, "Share a patient-friendly offer with people planning care.": {"zh": "把优惠展示给刚刚激活保障的患者。", "es": "Muestre una oferta a los pacientes que acaban de activar su cobertura."}, "Requires Capy Accreditation": {"zh": "需要 Capy 认证", "es": "Requiere Acreditación Capy"}, "About": {"zh": "关于我们", "es": "Nosotros"}, "Get Coverage": {"zh": "获取保障", "es": "Obtener Cobertura"}, "Estimate Costs": {"zh": "费用估算", "es": "Estimar Costos"}, "Find My Dentist": {"zh": "查找牙医", "es": "Buscar Dentista"}, "Patient Rewards": {"zh": "患者奖励", "es": "Recompensas"}, "Dentist Portal": {"zh": "牙医门户", "es": "Portal Dentistas"}, "Sign in": {"zh": "登录", "es": "Iniciar Sesión"}, "Join Free": {"zh": "免费加入", "es": "Únete Gratis"}, "Concierge Dental Network": {"zh": "尊享牙科网络", "es": "Red Dental Concierge"}, "Compare coverage, estimate cost, and find a trusted PPO dentist before the chair reclines, so fewer surprises follow you home.": {"zh": "不再有账单冲击，也没有来自网络之外的意外收费。在就诊之前，比较保障、估算费用，并找到值得信赖的 PPO 牙医。", "es": "Sin sustos en la factura ni cargos sorpresa fuera de su red. Compare la cobertura, estime el costo y encuentre un dentista PPO de confianza antes de reclinar la silla."}, "PPO Coverage Guidance": {"zh": "PPO 保障指南", "es": "Guía de Cobertura PPO"}, "PPO Dentist Discovery": {"zh": "PPO 牙医发现", "es": "Descubrir Dentistas PPO"}, "Treatment Cost Guidance": {"zh": "牙科费用指南", "es": "Guía de Costos de Tratamiento"}, "PPO insurance": {"zh": "PPO 牙科保险", "es": "Seguro PPO"}, "By treatment": {"zh": "按治疗项目", "es": "Por Tratamiento"}, "Plan & pay": {"zh": "方案与支付", "es": "Plan y Pago"}, "Local Rewards": {"zh": "本地奖励", "es": "Recompensas Locales"}, "Practice Growth": {"zh": "诊所增长", "es": "Crecimiento del Consultorio"}, "What makes us different": {"zh": "我们的不同之处", "es": "Lo que nos diferencia"}, "Carriers and networks": {"zh": "承保公司与网络", "es": "Aseguradoras y redes"}, "Guides & Trust": {"zh": "指南与信任", "es": "Guías y Confianza"}, "Why patients trust us": {"zh": "患者为何信赖我们", "es": "Por qué los pacientes confían en nosotros"}, "See your number": {"zh": "查看您的数字", "es": "Vea su cifra"}, "Who's it for?": {"zh": "适合谁？", "es": "¿Para quién es?"}, "Plan finder": {"zh": "方案查找器", "es": "Buscador de planes"}, "New here?": {"zh": "初次来访？", "es": "¿Nuevo aquí?"}, "Why join": {"zh": "为何加入", "es": "Por qué unirse"}, "Individual": {"zh": "个人", "es": "Individual"}, "Family": {"zh": "家庭", "es": "Familia"}, "Child Orthodontics": {"zh": "儿童正畸", "es": "Ortodoncia Infantil"}, "Fast PPO Activation": {"zh": "快速激活 PPO", "es": "Activación Rápida de PPO"}, "Fast activation, coverage in days": {"zh": "快速激活，数日内生效", "es": "Activación rápida, cobertura en días"}, "Not sure which plan?": {"zh": "不确定选哪个方案？", "es": "¿No sabe qué plan elegir?"}, "Crowns & Root Canals": {"zh": "牙冠与根管", "es": "Coronas y Endodoncias"}, "Dental Implants": {"zh": "种植牙", "es": "Implantes Dentales"}, "Emergency Dental": {"zh": "急诊牙科", "es": "Dental de Emergencia"}, "Cleaning & Preventive": {"zh": "洁牙与预防", "es": "Limpieza y Prevención"}, "Aetna Dental PPO": {"zh": "Aetna 牙科 PPO", "es": "Aetna PPO Dental"}, "Ameritas Dental PPO": {"zh": "Ameritas 牙科 PPO", "es": "Ameritas PPO Dental"}, "Guardian Dental PPO": {"zh": "Guardian 牙科 PPO", "es": "Guardian PPO Dental"}, "Mutual of Omaha Dental PPO": {"zh": "Mutual of Omaha 牙科 PPO", "es": "Mutual of Omaha PPO Dental"}, "Humana Dental PPO": {"zh": "Humana 牙科 PPO", "es": "Humana PPO Dental"}, "UnitedHealthcare Primary PPO": {"zh": "UnitedHealthcare 首选 PPO", "es": "UnitedHealthcare PPO Principal"}, "Estimate common treatments, compare PPO savings, and plan monthly payments before your appointment.": {"zh": "估算常见治疗费用，比较 PPO 节省，并在就诊前规划月供。", "es": "Estime tratamientos comunes, compare el ahorro PPO y planifique pagos mensuales antes de su cita."}, "Treatment Cost Estimator": {"zh": "牙科费用估算器", "es": "Estimador de Costos de Tratamiento"}, "Crowns, implants, root canals and more": {"zh": "牙冠、种植牙、根管治疗等", "es": "Coronas, implantes, endodoncias y más"}, "How it works": {"zh": "了解原理", "es": "Cómo funciona"}, "How many?": {"zh": "数量？", "es": "¿Cuántas?"}, "Typical cost": {"zh": "常规费用", "es": "Costo típico"}, "with PPO": {"zh": "使用 PPO", "es": "con PPO"}, "You save": {"zh": "为您节省", "es": "Usted ahorra"}, "See your full breakdown": {"zh": "查看完整明细", "es": "Vea el desglose completo"}, "Crown Cost": {"zh": "牙冠费用", "es": "Costo de Corona"}, "Implant Cost": {"zh": "种植牙费用", "es": "Costo de Implante"}, "Root Canal Cost": {"zh": "根管治疗费用", "es": "Costo de Endodoncia"}, "Run My Estimate": {"zh": "开始估算", "es": "Calcular mi Estimado"}, "Monthly Payments": {"zh": "月供支付", "es": "Pagos Mensuales"}, "Dentist informed": {"zh": "牙医审核", "es": "Revisado por dentistas"}, "Educational estimates": {"zh": "仅供参考估算", "es": "Estimaciones educativas"}, "Updated 2026": {"zh": "2026 年更新", "es": "Actualizado 2026"}, "Full calculator": {"zh": "完整计算器", "es": "Calculadora completa"}, "Plan my treatment": {"zh": "规划我的治疗", "es": "Planear mi tratamiento"}, "Compare all PPO plans": {"zh": "比较所有 PPO 方案", "es": "Comparar todos los planes PPO"}, "Compare all plans": {"zh": "比较所有方案", "es": "Comparar todos los planes"}, "All carriers": {"zh": "所有承保公司", "es": "Todas las aseguradoras"}, "All rewards": {"zh": "所有奖励", "es": "Todas las recompensas"}, "Full directory": {"zh": "完整目录", "es": "Directorio completo"}, "Compare & match": {"zh": "比较并匹配", "es": "Comparar y combinar"}, "See How It Works": {"zh": "了解运作方式", "es": "Vea Cómo Funciona"}, "Explore the Network": {"zh": "探索网络", "es": "Explore la Red"}, "Browse PPO Dentists": {"zh": "浏览 PPO 牙医", "es": "Explorar Dentistas PPO"}, "Claim Free Profile": {"zh": "领取免费档案", "es": "Reclamar Perfil Gratis"}, "Redeem Free Whitening": {"zh": "兑换免费美白", "es": "Canjear Blanqueamiento Gratis"}, "West Coast": {"zh": "西海岸", "es": "Costa Oeste"}, "Southwest": {"zh": "西南部", "es": "Suroeste"}, "Midwest": {"zh": "中西部", "es": "Medio Oeste"}, "South": {"zh": "南部", "es": "Sur"}, "East Coast": {"zh": "东海岸", "es": "Costa Este"}, "Refer a Friend": {"zh": "推荐好友", "es": "Refiera a un Amigo"}, "Refer a friend": {"zh": "推荐好友", "es": "Refiera a un amigo"}, "Your balance:": {"zh": "您的余额：", "es": "Su saldo:"}, "Capy Crowns Membership": {"zh": "Capy Crowns 会员", "es": "Membresía Capy Crowns"}, "Platinum Elite": {"zh": "铂金精英", "es": "Platinum Elite"}, "Is your practice listed?": {"zh": "您的诊所已收录了吗？", "es": "¿Está su consultorio en la lista?"}, "The Concierge Difference": {"zh": "尊享式的不同", "es": "La Diferencia Concierge"}, "How CoverCapy Works": {"zh": "CoverCapy 如何运作", "es": "Cómo Funciona CoverCapy"}, "Inquire": {"zh": "咨询", "es": "Consultar"}, "Close": {"zh": "关闭", "es": "Cerrar"}};
  var HTML = {"hero_h1": {"zh": "看清您的牙科保险<em>实际</em>能报销多少。", "es": "Vea lo que su seguro dental <em>realmente</em> paga."}, "est_title": {"zh": "<em>预约前</em>先了解您的牙科费用。", "es": "Conozca el costo dental <em>antes</em> de reservar."}, "cov_title": {"zh": "<em>安心</em>激活 PPO 保障。", "es": "Active su cobertura PPO con <em>confianza.</em>"}, "about_title": {"zh": "牙科护理，从保障到<em>预约</em>全程指引。", "es": "Atención dental, guiada desde la cobertura hasta la <em>reserva.</em>"}, "find_title": {"zh": "在<em>您附近</em>找到值得信赖的 PPO 牙医。", "es": "Encuentre un dentista PPO de confianza <em>cerca de usted.</em>"}, "est_aside": {"zh": "先制定您<em>自己</em>的治疗方案和费用估算，做到心中有数，再与诊所谈付款。", "es": "Arme primero su <em>propio</em> plan de tratamiento y estimación de costos, para llegar informado antes de cualquier conversación sobre financiamiento."}, "rew_title": {"zh": "免费美白 <em>疗程</em>", "es": "Sesión de Blanqueamiento <em>Gratis</em>"}, "port_title": {"zh": "让新的 PPO <em>患者</em>发现您。", "es": "Sea descubierto por nuevos <em>pacientes</em> PPO."}, "port_alt": {"zh": "更聪明地<em>经营您的牙科诊所。</em>", "es": "Una forma más inteligente de <em>gestionar su consultorio.</em>"}, "cov_sub": {"zh": "为您<em>匹配</em>契合治疗需求与时机的 PPO 保障。", "es": "Le <em>conectamos</em> con la cobertura PPO ideal para su tratamiento y momento."}, "find_aside": {"zh": "每一家精选诊所都经我们团队审核，并由<em>真实患者</em>评分。", "es": "Cada consultorio destacado es revisado por nuestro equipo y calificado por <em>pacientes reales.</em>"}, "port_aside": {"zh": "Tier 02 及以上的每个会员资格都经我们团队审核。<em>精心甄选</em>，绝非众包。", "es": "Cada membresía de Nivel 02 o superior es revisada por nuestro equipo. <em>Seleccionada</em>, nunca por la multitud."}, "about_video": {"zh": "两分钟快速了解 CoverCapy 如何引导您从<em>获得保障</em>走向就诊。", "es": "Un resumen rápido de dos minutos sobre cómo CoverCapy le guía desde la <em>cobertura</em> hasta la silla."}};
  var LANGS = {en:"English", es:"Español", "zh-hans":"简体中文", "zh-hant":"繁體中文"};
  var MMPAIR = {es:"en|es", "zh-hans":"en|zh-CN", "zh-hant":"en|zh-TW"};
  var MEMO = {es:{}, "zh-hans":{}, "zh-hant":{}};
  try{ var sv=JSON.parse(localStorage.getItem("ccI18nMemo")||"{}"); MEMO.es=sv.es||{}; MEMO["zh-hans"]=sv["zh-hans"]||sv.zh||{}; MEMO["zh-hant"]=sv["zh-hant"]||{}; }catch(e){}
  /* v67 hero curated dictionary */
  Object.assign(DICT, {"Get covered today.": {"es": "Obtén cobertura hoy.", "zh-hans": "今天获得保障。", "zh-hant": "今天取得保障。"}, "Book a dentist": {"es": "Reserva un dentista", "zh-hans": "预约牙医", "zh-hant": "預約牙醫"}, "tomorrow.": {"es": "mañana.", "zh-hans": "明天就能看牙。", "zh-hant": "明天就能看牙。"}, "CoverCapy is the": {"es": "CoverCapy es la", "zh-hans": "CoverCapy 是", "zh-hant": "CoverCapy 是"}, "concierge layer": {"es": "capa concierge", "zh-hans": "礼宾服务层", "zh-hant": "禮賓服務層"}, "between insurance confusion and great dental care. Activate a real PPO plan in": {"es": "entre la confusión del seguro y una gran atención dental. Activa un plan PPO real en", "zh-hans": "连接保险困惑与优质牙科护理。最快可在", "zh-hant": "連接保險困惑與優質牙科照護。最快可在"}, "one business day": {"es": "un día hábil", "zh-hans": "一个工作日内", "zh-hant": "一個工作日內"}, "Walk into your first appointment fully covered, with no waiting on cleanings, exams, or basic care.": {"es": "带着更清晰的保障走进第一次预约，洁牙、检查和基础护理无需等待。", "zh-hans": "第一次预约前就清楚保障范围，洁牙、检查与基础护理无需等待。", "zh-hant": "第一次預約前就清楚保障範圍，洗牙、檢查與基礎護理無需等待。"}, "Start My Coverage Today": {"es": "Activar cobertura hoy", "zh-hans": "今天启动保障", "zh-hant": "今天啟動保障"}, "Already insured? Find a dentist": {"es": "¿Ya tienes seguro? Encuentra un dentista", "zh-hans": "已有保险？查找牙医", "zh-hant": "已有保險？查找牙醫"}, "Trusted and reviewed by 2,000+ CoverCapy users": {"es": "Confiado y reseñado por más de 2,000 usuarios de CoverCapy", "zh-hans": "已有 2,000+ CoverCapy 用户信任与评价", "zh-hant": "已有 2,000+ CoverCapy 使用者信任與評價"}, "Active in as little as 1 business day": {"es": "Activo en tan solo 1 día hábil", "zh-hans": "最快 1 个工作日生效", "zh-hant": "最快 1 個工作日生效"}, "Activate Now": {"es": "Activar ahora", "zh-hans": "立即启动", "zh-hant": "立即啟動"}, "Primary": {"es": "Principal", "zh-hans": "基础", "zh-hant": "基礎"}, "Dental": {"es": "Dental", "zh-hans": "牙科", "zh-hant": "牙科"}, "no waiting period": {"es": "sin periodo de espera", "zh-hans": "无等待期", "zh-hant": "無等待期"}, "$50 deductible": {"es": "deducible de $50", "zh-hans": "$50 免赔额", "zh-hant": "$50 自負額"}, "100% preventive": {"es": "100% preventivo", "zh-hans": "100% 预防护理", "zh-hant": "100% 預防護理"}, "exams, cleanings, x-rays": {"es": "exámenes, limpiezas, radiografías", "zh-hans": "检查、洁牙、X 光", "zh-hant": "檢查、洗牙、X 光"}, "day one": {"es": "día uno", "zh-hans": "第一天", "zh-hant": "第一天"}, "50% basic restorative": {"es": "50% restaurativo básico", "zh-hans": "50% 基础修复", "zh-hant": "50% 基礎修復"}, "fillings, simple repairs": {"es": "empastes, reparaciones simples", "zh-hans": "补牙、简单修复", "zh-hant": "補牙、簡單修復"}, "Member ID issued on signup": {"es": "ID de miembro emitido al registrarse", "zh-hans": "注册后发放会员 ID", "zh-hant": "註冊後發放會員 ID"}, "instant": {"es": "instantáneo", "zh-hans": "即时", "zh-hant": "即時"}, "estimated first preventive visit": {"es": "primera visita preventiva estimada", "zh-hans": "预计首次预防护理", "zh-hant": "預估首次預防護理"}, "cleanings, exams, x-rays": {"es": "limpiezas, exámenes, radiografías", "zh-hans": "洁牙、检查、X 光", "zh-hant": "洗牙、檢查、X 光"}, "dentist-ready member info": {"es": "información lista para el dentista", "zh-hans": "牙医可用的会员信息", "zh-hant": "牙醫可用的會員資訊"}, "per month · cancel anytime": {"es": "por mes · cancela cuando quieras", "zh-hans": "每月 · 可随时取消", "zh-hant": "每月 · 可隨時取消"}});

  function saveMemo(){ try{ localStorage.setItem("ccI18nMemo", JSON.stringify(MEMO)); }catch(e){} }
  function dictLang(lang){ return (lang==="zh-hans" || lang==="zh-hant") ? "zh" : lang; }
  function langName(lang){
    return {
      en:"English",
      es:"Spanish",
      "zh-hans":"Simplified Mandarin Chinese",
      "zh-hant":"Traditional Mandarin Chinese"
    }[lang] || "English";
  }
  function shortLangName(lang){
    return {
      en:"English",
      es:"Español",
      "zh-hans":"简体中文",
      "zh-hant":"繁體中文"
    }[lang] || "English";
  }
  function setLangFoot(lang, busy){
    var foot=document.getElementById("cc-lang-foot");
    var widget=document.getElementById("cc-translation-widget");
    var widgetText=document.getElementById("cc-translation-widget-text");
    if(foot) foot.textContent = lang === "en" ? "Choose site language" : "Language selected: " + shortLangName(lang);
    if(widget && widgetText){
      if(busy && lang && lang !== "en"){
        widgetText.innerHTML = '<span class="cc-translation-line">Translating to</span><span class="cc-translation-language">' + shortLangName(lang) + '</span>';
        widget.hidden = false;
        widget.setAttribute("aria-hidden","false");
        requestAnimationFrame(function(){ widget.classList.add("show"); });
      } else {
        widget.classList.remove("show");
        widget.setAttribute("aria-hidden","true");
        setTimeout(function(){ if(!widget.classList.contains("show")) widget.hidden = true; }, 320);
      }
    }
  }
  var origT=[], origH=[];
  function translatable(s){
    s=s.trim();
    if(s.length<2) return false;
    if(!/[A-Za-z]/.test(s)) return false;
    if(/^[A-Z]{2,4}([ .\u00b7/|&-]+[A-Z]{2,4})*$/.test(s)) return false;
    return true;
  }
  function skip(node){
    var p=node.parentElement;
    while(p){
      var t=p.tagName;
      if(t==="SCRIPT"||t==="STYLE"||t==="NOSCRIPT") return true;
      if(p.hasAttribute("data-i18n-skip")||p.hasAttribute("data-i18n-html")) return true;
      p=p.parentElement;
    }
    return false;
  }
  function buildIndex(){
    var w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), byKey={}, n;
    while(n=w.nextNode()){
      if(!n.nodeValue || !n.nodeValue.trim()) continue;
      if(skip(n)) continue;
      var k=n.nodeValue.trim();
      (byKey[k]=byKey[k]||[]).push(n);
    }
    return byKey;
  }
  function setNode(n, val){
    if(n.__en===undefined){ n.__en=n.nodeValue; origT.push({n:n, en:n.nodeValue}); }
    var key=n.__en.trim();
    n.nodeValue = n.__en.replace(key, val);
  }
  function restoreEN(){
    origT.forEach(function(c){ c.n.nodeValue=c.en; });
    origH.forEach(function(c){ c.el.innerHTML=c.en; });
  }
  function applyHTML(lang){
    document.querySelectorAll("[data-i18n-html]").forEach(function(el){
      if(el.__en===undefined){ el.__en=el.innerHTML; origH.push({el:el, en:el.innerHTML}); }
      var k=el.getAttribute("data-i18n-html"), dk=dictLang(lang), t=HTML[k] && (HTML[k][lang] || HTML[k][dk]);
      if(t) el.innerHTML=t;
    });
  }
  async function defaultMT(text, lang){
    var url="https://api.mymemory.translated.net/get?q="+encodeURIComponent(text)+"&langpair="+MMPAIR[lang];
    var r=await fetch(url); var j=await r.json();
    var t=j && j.responseData && j.responseData.translatedText;
    if(t && !/MYMEMORY|QUERY LENGTH|QUOTA|INVALID|PLEASE/i.test(t)) return t;
    return null;
  }
  async function mt(text, lang){
    var fn=(typeof window.ccMT==="function") ? window.ccMT : defaultMT;
    try{ return await fn(text, lang); }catch(e){ return null; }
  }
  function fetchPool(list, lang, byKey){
    return new Promise(function(resolve){
      var i=0, active=0;
      function pump(){
        if(i>=list.length && active===0){ resolve(); return; }
        while(active<5 && i<list.length){
          (function(key){
            active++;
            mt(key, lang).then(function(val){
              if(val){ MEMO[lang][key]=val; (byKey[key]||[]).forEach(function(n){ setNode(n, val); }); }
              active--; pump();
            }).catch(function(){ active--; pump(); });
          })(list[i++]);
        }
      }
      pump();
    });
  }
  function setBusy(b){ var w=document.getElementById("cc-lang"); if(w) w.classList.toggle("translating", b); setLangFoot(window.ccLang || "en", b); }
  async function setLang(lang){
    if(lang==="zh") lang="zh-hans";
    restoreEN();
    window.ccLang=lang;
    document.documentElement.setAttribute("lang", lang);
    var cur=document.getElementById("cc-lang-cur"); if(cur) cur.textContent=LANGS[lang]||"EN";
    setLangFoot(lang, false);
    document.querySelectorAll(".cc-lang-opt").forEach(function(o){ o.classList.toggle("is-active", o.getAttribute("data-lang")===lang); });
    try{ localStorage.setItem("cc-lang", lang); }catch(e){}
    if(lang==="en"){ setLangFoot(lang, false); return; }
    applyHTML(lang);
    var byKey=buildIndex();
    Object.keys(byKey).forEach(function(key){
      var dk=dictLang(lang), t=(DICT[key] && (DICT[key][lang] || DICT[key][dk])) || MEMO[lang][key];
      if(t) byKey[key].forEach(function(n){ setNode(n, t); });
    });
    var list=Object.keys(byKey).filter(function(key){
      var dk=dictLang(lang); return translatable(key) && !(DICT[key] && (DICT[key][lang] || DICT[key][dk])) && !MEMO[lang][key];
    });
    setBusy(true);
    await fetchPool(list, lang, byKey);
    var leftover=list.filter(function(k){ return !MEMO[lang][k]; });   // double-check / retry pass
    if(leftover.length) await fetchPool(leftover, lang, byKey);
    saveMemo(); setBusy(false);
    var uncovered=list.filter(function(k){ return !MEMO[lang][k]; });
    window.ccI18nReport={ language:lang, machineTranslated:(list.length-uncovered.length), uncovered:uncovered };
    if(uncovered.length) console.log("[i18n] uncovered ("+uncovered.length+"):", uncovered);
  }
  window.ccSetLang=setLang; window.ccLang="en";
  var wrap=document.getElementById("cc-lang"), btn=document.getElementById("cc-lang-btn");
  if(btn && wrap){
    btn.addEventListener("click", function(e){ e.stopPropagation(); var o=wrap.classList.toggle("open"); btn.setAttribute("aria-expanded", o?"true":"false"); });
    document.querySelectorAll(".cc-lang-opt").forEach(function(o){
      o.addEventListener("click", function(e){ e.stopPropagation(); setLang(o.getAttribute("data-lang")); wrap.classList.remove("open"); btn.setAttribute("aria-expanded","false"); });
    });
    document.addEventListener("click", function(e){ if(!wrap.contains(e.target)) wrap.classList.remove("open"); });
    document.addEventListener("keydown", function(e){ if(e.key==="Escape") wrap.classList.remove("open"); });
  }
  try{ var s=localStorage.getItem("cc-lang"); if(s==="zh") s="zh-hans"; if(s && s!=="en") setLang(s); else setLangFoot("en", false); }catch(e){}
})();

(function(){
  var modal=document.getElementById('covercapy-universal-modal');
  if(!modal) return;

  var COVER_CAPY_UNIVERSAL_MODALS = {
    insurance: {
      uhc: {
        eyebrow: 'Before you activate coverage',
        title: 'You\'re heading to<br/><em>UnitedHealthcare</em>.',
        body: 'We\'ll open UnitedHealthcare\'s official enrollment page in a new tab. You can review the Primary Dental plan, check eligibility, and activate coverage directly with the carrier. <strong>CoverCapy never sees or stores</strong> your payment, insurance, or login details.',
        disclosuresLabel: 'Before you activate coverage',
        disclosures: [
          'CoverCapy is an <strong>independent guide</strong>. We\'re not a broker, agent, or affiliate of UnitedHealthcare.',
          'We <strong>don\'t earn a commission</strong> or referral fee on any plan you activate through this site.',
          'The destination is governed by <strong>UnitedHealthcare\'s terms</strong>, not ours. Pricing, eligibility, and plan details can change without notice.',
          'We make <strong>no guarantees</strong> about coverage limits, waiting periods, or in-network status. Verify everything with UnitedHealthcare before enrolling.',
          'By continuing, you acknowledge that <strong>CoverCapy is not liable</strong> for outcomes, denials, billing decisions, or transactions that happen after you leave this site.'
        ],
        cancelLabel: 'Wait, tell me more',
        continueLabel: 'Continue to UnitedHealthcare',
        continueUrl: 'https://www.uhc.com/shop/individuals-families/en/quote/census?leadsourcename=UHC-Website-Dental',
        trackingSlug: 'uhc-primary-dental',
        provider: 'uhc'
      }
    },
    booking: {
      kyt: {
        eyebrow: 'Before you book',
        title: 'You\'re booking with<br/><em>KYT Dental Services</em>.',
        body: 'We\'ll open KYT Dental Services\' official booking page in a new tab. CoverCapy is an <strong>independent concierge directory</strong> — we help you discover and compare practices, but the schedule, accepted plans, fees, and treatment decisions are handled by the dental office.',
        disclosuresLabel: 'Before you book',
        disclosures: [
          'CoverCapy is an <strong>independent concierge directory</strong>. We don\'t run the dental office, manage the schedule, or process payments.',
          '<strong>Availability, accepted plans, fees, and treatment decisions</strong> are controlled by KYT Dental Services directly.',
          'Insurance benefits remain subject to <strong>plan terms, eligibility, waiting periods, exclusions, and carrier rules</strong>.',
          'We make <strong>no guarantees</strong> about in-network status or the price of any procedure quoted at the office.',
          'Please <strong>confirm appointment, coverage, and out-of-pocket details</strong> with KYT Dental Services before any treatment.'
        ],
        cancelLabel: 'Stay on CoverCapy',
        continueLabel: 'Continue to KYT Dental Services',
        continueUrl: 'https://www.kytdentalservices.com/booking',
        trackingSlug: 'kyt-dental-services-booking',
        provider: 'kyt'
      }
    }
  };

  window.COVER_CAPY_UNIVERSAL_MODALS = COVER_CAPY_UNIVERSAL_MODALS;

  var slot=function(name){return modal.querySelector('[data-modal-slot="' + name + '"]');};
  var eyebrowEl=slot('eyebrow');
  var titleEl=slot('title');
  var bodyEl=slot('body');
  var disclosuresLbl=slot('disclosures-label');
  var disclosuresWrap=slot('disclosures');
  var cancelLabelEl=slot('cancel-label');
  var continueLabelEl=slot('continue-label');
  var continueEl=modal.querySelector('.cc-universal-modal-continue');
  var lastFocus=null;

  function closeMega(){
    document.querySelectorAll('.cc-link.is-open').forEach(function(el){el.classList.remove('is-open');});
    var bd=document.querySelector('.cc-backdrop'); if(bd) bd.classList.remove('show');
  }

  function getConfig(type, provider){
    return COVER_CAPY_UNIVERSAL_MODALS[type] && provider && COVER_CAPY_UNIVERSAL_MODALS[type][provider];
  }

  function textFrom(el, fallback){
    return (el && el.textContent ? el.textContent.replace(/\s+/g,' ').trim() : '') || fallback;
  }

  function cleanUrl(url){
    return url || '#';
  }

  function slugify(s){
    return String(s || 'booking').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'booking';
  }

  function getPracticeName(trigger){
    if(!trigger) return 'the dental office';
    var card = trigger.closest('.featured-card, .dentist-feature-card, [data-cc-booking-card]');
    var fromData = trigger.getAttribute('data-cc-booking-practice') ||
                   trigger.getAttribute('data-practice-name') ||
                   trigger.getAttribute('data-provider-name') ||
                   (card && (card.getAttribute('data-cc-booking-practice') || card.getAttribute('data-practice-name')));
    if(fromData) return fromData;
    var nameEl = card && card.querySelector('.featured-name, .practice-name, [data-practice-name]');
    return textFrom(nameEl, 'the dental office');
  }

  function buildGenericBookingConfig(trigger, provider){
    var practice = getPracticeName(trigger);
    var href = trigger && trigger.getAttribute('href') ? trigger.getAttribute('href') : '#';
    var providerKey = provider || slugify(practice);
    var tracking = (trigger && trigger.getAttribute('data-track-outbound')) || ('booking-' + providerKey);
    return {
      eyebrow: 'Before you book',
      title: 'You\'re booking with<br/><em>' + practice + '</em>.',
      body: 'We\'ll open ' + practice + '\'s booking page in a new tab. CoverCapy is an <strong>independent concierge directory</strong> — we help you discover and compare practices, but the schedule, accepted plans, fees, and treatment decisions are handled by the dental office.',
      disclosuresLabel: 'Before you book',
      disclosures: [
        'CoverCapy is an <strong>independent concierge directory</strong>. We don\'t run the dental office, manage the schedule, or process payments.',
        '<strong>Availability, accepted plans, fees, and treatment decisions</strong> are controlled by ' + practice + ' directly.',
        'Insurance benefits remain subject to <strong>plan terms, eligibility, waiting periods, exclusions, and carrier rules</strong>.',
        'We make <strong>no guarantees</strong> about in-network status or the price of any procedure quoted at the office.',
        'Please <strong>confirm appointment, coverage, and out-of-pocket details</strong> with the dental office before any treatment.'
      ],
      cancelLabel: 'Stay on CoverCapy',
      continueLabel: 'Continue to ' + practice,
      continueUrl: cleanUrl(href),
      trackingSlug: tracking,
      provider: providerKey
    };
  }

  function isFeatureBookingButton(el){
    if(!el || !el.matches) return false;
    if(el.getAttribute('data-cc-modal') === 'booking') return true;
    if(!el.closest('.dentist-feature-card, [data-cc-booking-card]')) return false;
    var label = textFrom(el, '');
    return /book|appointment|schedule/i.test(label);
  }

  function openUniversalModal(type, provider, override){
    var config = override || getConfig(type, provider);
    if(!config) return false;

    if(eyebrowEl) eyebrowEl.innerHTML=config.eyebrow || (type === 'booking' ? 'Before you book' : 'Before you activate coverage');
    if(titleEl) titleEl.innerHTML=config.title || '';
    if(bodyEl) bodyEl.innerHTML=config.body || '';
    if(disclosuresLbl) disclosuresLbl.textContent=config.disclosuresLabel || 'A note before you go';
    if(cancelLabelEl) cancelLabelEl.textContent=config.cancelLabel || 'Stay on CoverCapy';
    if(continueLabelEl) continueLabelEl.textContent=config.continueLabel || 'Continue';

    if(disclosuresWrap && Array.isArray(config.disclosures)){
      var roman=['i.','ii.','iii.','iv.','v.','vi.','vii.','viii.'];
      disclosuresWrap.innerHTML=config.disclosures.map(function(item,idx){
        return '<div class="cc-universal-modal-disclosure"><span class="num">' + (roman[idx] || ((idx+1)+'.')) + '</span><span>' + item + '</span></div>';
      }).join('');
    }

    if(continueEl){
      if(config.continueUrl) continueEl.href=config.continueUrl;
      if(config.provider) continueEl.dataset.provider=config.provider;
      if(type) continueEl.dataset.modalType=type;
      if(config.trackingSlug) continueEl.dataset.trackOutbound=config.trackingSlug;
    }

    lastFocus=document.activeElement;
    closeMega();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('cc-universal-modal-open');
    var closeBtn=modal.querySelector('[data-modal-close]');
    if(closeBtn) setTimeout(function(){closeBtn.focus();},40);
    return true;
  }

  function closeUniversalModal(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('cc-universal-modal-open');
    if(lastFocus && typeof lastFocus.focus==='function') lastFocus.focus();
  }

  window.CoverCapyUniversalModal = {
    open: openUniversalModal,
    close: closeUniversalModal,
    configs: COVER_CAPY_UNIVERSAL_MODALS,
    buildBookingConfig: buildGenericBookingConfig
  };

  document.addEventListener('click',function(e){
    var trigger=e.target.closest('[data-cc-modal], .dentist-feature-card .featured-btn.primary, [data-cc-booking-card] .featured-btn.primary');
    if(trigger){
      var type=trigger.getAttribute('data-cc-modal');
      var provider=trigger.getAttribute('data-cc-modal-provider') || trigger.getAttribute('data-cc-booking-provider');
      var config=null;

      if(type === 'insurance'){
        config = getConfig(type, provider);
      } else if(type === 'booking' || isFeatureBookingButton(trigger)){
        type = 'booking';
        config = getConfig(type, provider) || buildGenericBookingConfig(trigger, provider);
      }

      if(config){
        e.preventDefault();
        e.stopPropagation();
        openUniversalModal(type, provider, config);
        return;
      }
    }
    if(e.target.closest('[data-modal-close]')){e.preventDefault(); closeUniversalModal();}
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && modal.classList.contains('is-open')) closeUniversalModal();
  });
})();

})();



/* v67 full-page/dynamic content translation watchdog
   Reruns the chosen language after asynchronously loaded components like the hero slider are injected or updated. */
(function(){
  var running=false, debounceTimer=null, lastLang=null;

  function hasEnglishText(node){
    if(!node) return false;
    if(node.nodeType===3) return /[A-Za-z]{2,}/.test(node.nodeValue || "");
    if(node.nodeType!==1) return false;
    if(node.closest && node.closest('#cc-lang, .cc-lang, #cc-translation-widget, .cc-translation-widget, script, style, noscript')) return false;
    return /[A-Za-z]{2,}/.test(node.textContent || "");
  }

  function run(){
    var lang=window.ccLang;
    if(!lang || lang==="en" || typeof window.ccSetLang!=="function") return;
    if(running) return;
    running=true;
    lastLang=lang;
    Promise.resolve(window.ccSetLang(lang)).catch(function(err){
      console.warn("[CoverCapy i18n] retranslate failed", err);
    }).finally(function(){
      setTimeout(function(){ running=false; }, 900);
    });
  }

  function schedule(delay){
    var lang=window.ccLang;
    if(!lang || lang==="en" || typeof window.ccSetLang!=="function") return;
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(run, delay || 900);
  }

  function scheduledPasses(){
    [350, 1100, 2200, 4200, 7000].forEach(function(ms){
      setTimeout(function(){ if(window.ccLang && window.ccLang!=="en") run(); }, ms);
    });
  }

  window.ccRetranslatePage = function(){ schedule(30); };

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", scheduledPasses, {once:true});
  } else {
    scheduledPasses();
  }
  window.addEventListener("load", scheduledPasses, {once:true});

  if("MutationObserver" in window){
    var obs=new MutationObserver(function(muts){
      if(running) return;
      if(!window.ccLang || window.ccLang==="en") return;
      for(var i=0;i<muts.length;i++){
        var m=muts[i];
        if(m.type==="childList"){
          for(var j=0;j<m.addedNodes.length;j++){
            if(hasEnglishText(m.addedNodes[j])){ schedule(900); return; }
          }
        }
      }
    });
    function attach(){
      if(document.body) obs.observe(document.body,{childList:true,subtree:true});
    }
    if(document.body) attach();
    else document.addEventListener("DOMContentLoaded", attach, {once:true});
  }
})();
