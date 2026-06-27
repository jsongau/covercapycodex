/* CoverCapy omega-nav2 behavior — generated from nav-prototype-v3.html */
(function(){
  'use strict';
  var DESKTOP = function(){ return window.matchMedia('(min-width:1081px)').matches; };
  var root = document.documentElement;
  var nav = document.getElementById('ccNav');
  var subnav = document.getElementById('subNav');
  var backdrop = document.getElementById('ccBackdrop');
  var items = Array.prototype.slice.call(document.querySelectorAll('.cc-item'));
  var closeTimer = null, openItem = null;

  /* ---------- live sticky heights ---------- */
  var lastNavH = -1, lastSubH = -1;
  function syncHeights(){
    var h = nav.offsetHeight, sh = subnav ? subnav.offsetHeight : 0;
    if (h !== lastNavH){ lastNavH = h; root.style.setProperty('--nav-h', h + 'px'); root.style.setProperty('--cc-nav-h', h + 'px'); }
    if (sh !== lastSubH){ lastSubH = sh; root.style.setProperty('--subnav-h', sh + 'px'); }
  }
  if (window.ResizeObserver){
    var ro = new ResizeObserver(syncHeights);
    ro.observe(nav); if (subnav) ro.observe(subnav);
  }
  window.addEventListener('resize', syncHeights);
  window.addEventListener('orientationchange', syncHeights);
  syncHeights();

  /* ---------- condense on scroll + subnav stuck shadow ---------- */
  var lastY = -1;
  function onScroll(){
    var y = window.scrollY;
    if (y === lastY) return; lastY = y;
    nav.classList.toggle('is-condensed', y > 40);
    if (subnav){
      var top = subnav.getBoundingClientRect().top;
      subnav.classList.toggle('is-stuck', Math.abs(top - nav.offsetHeight) < 2);
    }
    if (openItem) closeMega(); // close panels on scroll
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- mega open / close ---------- */
  function openMega(item){
    if (!item) return;
    clearTimeout(closeTimer);
    items.forEach(function(it){ if (it!==item){ it.classList.remove('is-open'); setAria(it,false); } });
    item.classList.add('is-open'); setAria(item,true);
    backdrop.classList.add('show');
    openItem = item;
    try{ document.dispatchEvent(new CustomEvent('cc:mega-open',{detail:{key:item.getAttribute('data-key')}})); }catch(e){}
  }
  function closeMega(){
    items.forEach(function(it){ it.classList.remove('is-open'); setAria(it,false); });
    backdrop.classList.remove('show');
    openItem = null;
  }
  function setAria(item, open){
    var a = item.querySelector('.cc-top');
    if (a) a.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closeMega, 160); }

  items.forEach(function(item){
    var top = item.querySelector('.cc-top');
    var mega = item.querySelector('.cc-mega');

    /* hover = peek (desktop only, reveal not navigate) */
    item.addEventListener('mouseenter', function(){ if (DESKTOP()) openMega(item); });
    item.addEventListener('mouseleave', function(){ if (DESKTOP()) scheduleClose(); });
    if (mega){
      mega.addEventListener('mouseenter', function(){ clearTimeout(closeTimer); });
      mega.addEventListener('mouseleave', function(){ if (DESKTOP()) scheduleClose(); });
    }

    /* TWO-STAGE click: 1st opens (no nav), 2nd navigates */
    top.addEventListener('click', function(e){
      if (!DESKTOP()) return;                 // mobile uses drawer
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; // power-user new tab
      if (!item.classList.contains('is-open')){
        e.preventDefault();
        openMega(item);
      }
      /* if already open: do nothing here, let the <a href> navigate */
    });

    /* keyboard: ArrowDown moves into panel */
    top.addEventListener('keydown', function(e){
      if (e.key === 'ArrowDown' && DESKTOP()){
        e.preventDefault();
        if (!item.classList.contains('is-open')) openMega(item);
        var first = mega && mega.querySelector('a,button,input');
        if (first) first.focus();
      }
    });

    /* Concierge Hairline: draw the gold underline from the cursor's entry side */
    top.addEventListener('pointerenter', function(e){
      var r = top.getBoundingClientRect();
      top.style.setProperty('--cc-origin', ((e.clientX - r.left) / r.width * 100) + '%');
    });
    top.addEventListener('focus', function(){ if(!top.matches(':hover')) top.style.setProperty('--cc-origin','50%'); });
  });

  /* close interactions */
  backdrop.addEventListener('click', closeMega);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && openItem){ var t = openItem.querySelector('.cc-top'); closeMega(); if (t) t.focus(); }
  });
  document.addEventListener('focusout', function(e){
    if (openItem && !openItem.contains(e.relatedTarget)) { /* allow into panel; close when leaving item subtree */
      if (e.relatedTarget && !openItem.contains(e.relatedTarget)) closeMega();
    }
  });

  /* ---------- sub-nav scroll-spy ---------- */
  var spy = Array.prototype.slice.call(document.querySelectorAll('.subnav a'));
  var targets = spy.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          spy.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#'+en.target.id); });
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    targets.forEach(function(t){ io.observe(t); });
  }

  /* ---------- mobile drawer ---------- */
  var drawer = document.getElementById('ccDrawer');
  var burger = document.getElementById('ccBurger');
  var drawerX = document.getElementById('ccDrawerX');
  var scrollY = 0;
  function openDrawer(){
    scrollY = window.scrollY;
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
    backdrop.classList.add('show'); burger.setAttribute('aria-expanded','true');
    document.body.style.position='fixed'; document.body.style.top = (-scrollY)+'px'; document.body.style.width='100%';
    var f = drawer.querySelector('button,a,input'); if (f) f.focus();
    document.addEventListener('keydown', trap);
  }
  function closeDrawer(){
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
    backdrop.classList.remove('show'); burger.setAttribute('aria-expanded','false');
    document.body.style.position=''; document.body.style.top=''; document.body.style.width='';
    window.scrollTo(0, scrollY);
    document.removeEventListener('keydown', trap);
    burger.focus();
  }
  function trap(e){
    if (e.key === 'Escape'){ closeDrawer(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.slice.call(drawer.querySelectorAll('button,a,input')).filter(function(el){return el.offsetParent!==null;});
    if (!f.length) return;
    var first=f[0], last=f[f.length-1];
    if (e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
  burger.addEventListener('click', openDrawer);
  drawerX.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', function(){ if (drawer.classList.contains('open')) closeDrawer(); });

  /* drawer accordions */
  Array.prototype.slice.call(document.querySelectorAll('.cc-acc-btn')).forEach(function(btn){
    btn.addEventListener('click', function(){
      var acc = btn.parentElement;
      var body = acc.querySelector('.cc-acc-body');
      var open = acc.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight+'px' : '0px';
    });
  });


  /* ============================================================
     Find a Dentist: omni autocomplete + ZIP to city (multi-city) +
     Card 4 result in a money.com-style collapsible bottom dock.
     Ported from components/mega-nav.html (real Supabase logic),
     with file:// demo fallbacks so the preview works offline.
     ============================================================ */
  (function(){
    var SUPA='https://hfvbeqlefwwjlrbyxpbj.supabase.co';
    var KEY='sb_publishable_wlfujszvn2logC3KNL3MsA_AW1F42kf';
    var R=18; /* PLATINUM_RADIUS_MILES */
    var input=document.getElementById('cc-find-input');
    var btn=document.getElementById('cc-find-btn');
    var omni=document.getElementById('cc-omni');
    var dock=document.getElementById('cc-find-dock');
    var dockBd=document.getElementById('cc-find-dock-bd');
    var dockX=document.getElementById('cc-find-dock-x');
    var dockMini=document.getElementById('cc-find-dock-mini');
    var dockMiniNm=document.getElementById('cc-find-dock-mini-nm');
    var dockMiniRt=document.getElementById('cc-find-dock-mini-rt');
    var dockMiniBk=document.getElementById('cc-find-dock-mini-bk');
    if(!input||!btn||!omni||!dock||!dockBd) return;

    /* ---------- file:// demo fallbacks (Supabase blocks the null origin) ---------- */
    var DEMO_SUGGEST_ZIP={
      '9440':[
        {label:'94401',sublabel:'San Mateo, CA',kind:'zip',browse_scope:'zip',browse_value:'94401'},
        {label:'94402',sublabel:'San Mateo, CA',kind:'zip',browse_scope:'zip',browse_value:'94402'},
        {label:'94403',sublabel:'San Mateo, CA',kind:'zip',browse_scope:'zip',browse_value:'94403'}
      ]
    };
    var DEMO_SUGGEST_TEXT=[
      {label:'Los Angeles County',sublabel:'California, county / area',kind:'local_area',browse_scope:'local_area',browse_value:'Los Angeles County',lat:34.0522,lng:-118.2437},
      {label:'Orange County',sublabel:'California, county / area',kind:'local_area',browse_scope:'local_area',browse_value:'Orange County'},
      {label:'Irvine',sublabel:'California, city',kind:'city',browse_scope:'city',browse_value:'Irvine',lat:33.6846,lng:-117.8265},
      {label:'Beverly Hills',sublabel:'California, city',kind:'city',browse_scope:'city',browse_value:'Beverly Hills',lat:34.0736,lng:-118.4004},
      {label:'Houston',sublabel:'Texas, city',kind:'city',browse_scope:'city',browse_value:'Houston',lat:29.7604,lng:-95.3698}
    ];
    var DEMO_CITIES_BY_ZIP={
      '91745':[
        {name:'City of Industry',city:'City of Industry',lat:34.0197,lng:-117.9587,state:'California'},
        {name:'Hacienda Heights',city:'Hacienda Heights',lat:33.9931,lng:-117.9686,state:'California'}
      ]
    };
    function demoCityForZip(zip){
      if(DEMO_CITIES_BY_ZIP[zip]) return DEMO_CITIES_BY_ZIP[zip];
      var map={'90210':{name:'Beverly Hills',lat:34.0901,lng:-118.4065,state:'California'},
        '92708':{name:'Fountain Valley',lat:33.7092,lng:-117.9536,state:'California'},
        '92697':{name:'Irvine',lat:33.6405,lng:-117.8443,state:'California'},
        '94401':{name:'San Mateo',lat:37.5741,lng:-122.3194,state:'California'}};
      var c=map[zip]||{name:'San Mateo',lat:37.5630,lng:-122.3255,state:'California'};
      c.city=c.name; return [c];
    }
    var DEMO_KYT={practice_name:'KYT Dental Services',rating:5.0,
      google_rating:5.0,google_review_count:132,yelp_rating:5.0,yelp_review_count:132,
      zocdoc_rating:5.0,zocdoc_review_count:464,review_count:728,
      address:'11180 Warner Ave Suite 251, Fountain Valley, CA 92708',city:'Fountain Valley',state:'CA',zip:'92708',
      distance_miles:1.1,phone:'(833) 598-3368',
      profile_url:'/dental/california/orange-county/fountain-valley/kyt-dental-services/'};
    var DEMO_ABRI={practice_name:'Abri Dental, Beverly Hills',rating:4.8,
      google_rating:4.9,google_review_count:74,yelp_rating:3.0,yelp_review_count:6,
      review_count:80,address:'50 N La Cienega Blvd #217, Beverly Hills, CA 90211',
      city:'Beverly Hills',state:'CA',zip:'90211',distance_miles:1.5,phone:'(310) 275-0032',
      profile_url:'/dental/california/los-angeles/beverly-hills/abri-dental/'};
    var DEMO_ABRI_BURBANK={practice_name:'Abri Dental, Burbank',rating:4.9,
      google_rating:4.9,google_review_count:118,yelp_rating:4.5,yelp_review_count:41,
      review_count:159,address:'3808 W Riverside Dr, Burbank, CA 91505',
      city:'Burbank',state:'CA',zip:'91505',distance_miles:11.2,phone:'(818) 558-0142',
      profile_url:'/dental/california/los-angeles/burbank/abri-dental/'};
    /* Demo offices only appear in their real home areas. Any other search returns
       [] so the preview shows the truthful "no Platinum Elite within range" card,
       instead of teleporting a demo office into a far-away ZIP with a fake distance.
       (file:// only — over http the live RPC does real radius + haversine.) */
    function demoDentistsFor(label){
      var s=String(label||'').toLowerCase();
      if(s.indexOf('los angeles')>-1||s.indexOf('la county')>-1) return [clone(DEMO_ABRI),clone(DEMO_ABRI_BURBANK)];
      if(s.indexOf('beverly')>-1||s.indexOf('90210')>-1||s.indexOf('90211')>-1||s.indexOf('burbank')>-1||s.indexOf('91505')>-1) return [clone(DEMO_ABRI),clone(DEMO_ABRI_BURBANK)];
      if(s.indexOf('fountain valley')>-1||s.indexOf('orange county')>-1||s.indexOf('92708')>-1||s.indexOf('kyt')>-1) return [clone(DEMO_KYT)];
      return [];
    }
    function clone(o){return JSON.parse(JSON.stringify(o));}

    /* ---------- helpers (ported) ---------- */
    function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
    function rxq(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
    function fmtRating(v){var n=Number(v)||0;return n?(Math.round(n*10)/10).toFixed(1):'';}
    function fmtCount(v){var n=Number(v)||0;return n?n.toLocaleString('en-US'):'';}
    function starText(r){var c=Math.max(0,Math.min(5,Math.round(Number(r)||0)));return '★'.repeat(c)+'☆'.repeat(5-c);}
    /* fetch wrappers: resolve null on network failure so callers fall back to demo */
    function withTimeout(p,ms){return Promise.race([p,new Promise(function(res){setTimeout(function(){res(null);},ms||2800);})]);}
    function get(p){return withTimeout(fetch(SUPA+'/rest/v1/'+p,{headers:{apikey:KEY,Authorization:'Bearer '+KEY}}).then(function(r){return r.ok?r.json():[];}).catch(function(){return null;}));}
    function rpc(fn,b){return withTimeout(fetch(SUPA+'/rest/v1/rpc/'+fn,{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:JSON.stringify(b||{})}).then(function(r){return r.ok?r.json():[];}).catch(function(){return null;}));}

    function supabaseSuggest(q){
      return rpc('nav_search_suggest',{q:q,max_n:8}).then(function(rows){
        if(rows===null){ /* demo */
          var s=String(q||'').trim();
          if(/^\d/.test(s)){ var k=s.slice(0,4); return DEMO_SUGGEST_ZIP[k]||DEMO_SUGGEST_ZIP['9440']; }
          var f=DEMO_SUGGEST_TEXT.filter(function(x){return x.label.toLowerCase().indexOf(s.toLowerCase())>-1;});
          return f.length?f:DEMO_SUGGEST_TEXT;
        }
        return rows;
      });
    }
    function citiesForZip(zip){
      var q='search_locations?select=name,city,lat,lng,slug,local_area,market_area,state'
        +'&type=eq.city&zip_codes=cs.{'+encodeURIComponent(zip)+'}&order=name';
      return get(q).then(function(rows){ return rows===null?demoCityForZip(zip):rows; });
    }
    function featuredDentistsNear(lat,lng,label){
      if(lat==null||lng==null) return Promise.resolve([]);
      return rpc('nav_featured_dentist',{in_lat:Number(lat),in_lng:Number(lng),radius_miles:R}).then(function(rows){
        var demo=demoDentistsFor(label);
        if(rows===null){ demo.forEach(function(d){d.__demo=true;}); return demo; }
        rows=rows||[];
        /* PREVIEW ONLY: the live nav_featured_dentist RPC returns a single office,
           so for areas where the demo has more (e.g. Los Angeles County), use the
           demo set to show the multi-office slider. On production, swap this for a
           real "all Platinum Elite within radius" RPC. */
        if(rows.length<demo.length){ demo.forEach(function(d){d.__demo=true;}); return demo; }
        return rows;
      });
    }

    /* ---------- sourceRatingHTML (ported, Card 4 chip markup) ---------- */
    var SRC_COLOR={Google:'#1a73e8',Yelp:'#d32323',Zocdoc:'#f5b400'};
    function sourceRatingHTML(d){
      var overall=Number(d.rating||0)||Number(d.aggregate_rating||0);
      var gR=Number(d.google_rating||0),gC=Number(d.google_review_count||0);
      var yR=Number(d.yelp_rating||0),yC=Number(d.yelp_review_count||0);
      var zR=Number(d.zocdoc_rating||0),zC=Number(d.zocdoc_review_count||0);
      var headR=overall||gR||yR||zR;
      if(!headR) return {rating:'',sources:'',head:0,total:0};
      var total=gC+yC+zC;
      if(!total) total=Number(d.review_count||0)||Number(d.aggregate_review_count||0);
      function chip(name,r,c){
        if(!r) return '';
        return '<span class="card-4__source"><span class="card-4__dot" style="background:'+SRC_COLOR[name]+'"></span>'
          +name+' '+fmtRating(r)+(c?' ('+fmtCount(c)+')':'')+'</span>';
      }
      var chips=chip('Google',gR,gC)+chip('Yelp',yR,yC)+chip('Zocdoc',zR,zC);
      var ratingLine='<div class="card-4__rating"><span class="card-4__stars" aria-hidden="true">'+starText(headR)+'</span>'
        +'<span class="card-4__score">'+fmtRating(headR)+'</span>'
        +(total?'<span class="card-4__count">'+fmtCount(total)+' reviews</span>':'')+'</div>';
      return {rating:ratingLine,sources:chips?'<div class="card-4__sources">'+chips+'</div>':'',head:headR,total:total};
    }

    /* ---------- browse URL (ZIP/city pre-filled, autosubmit) ---------- */
    function browseUrl(where){ return '/find-my-dentist.html?where='+encodeURIComponent(where||'')+'&autosubmit=1'; }

    /* ---------- omni autocomplete ---------- */
    var KIND_GLYPH={zip:'#',city:'⌂',local_area:'◆',market_area:'❖',state:'★'};
    var KIND_TAG={zip:'ZIP',city:'City',local_area:'Area',market_area:'Market',state:'State'};
    var tmr=null, active=-1, items=[], lastQuery='';
    function hideOmni(){omni.hidden=true;omni.innerHTML='';input.setAttribute('aria-expanded','false');active=-1;items=[];}
    function mark(){Array.prototype.forEach.call(omni.querySelectorAll('.cc-omni-item'),function(el,i){el.classList.toggle('on',i===active);if(i===active)el.scrollIntoView({block:'nearest'});});}
    function highlight(text,q){
      var t=esc(text),qq=esc(String(q||'').trim());
      if(!qq) return t;
      var i=t.toLowerCase().indexOf(qq.toLowerCase());
      if(i<0) return t;
      return t.slice(0,i)+'<b>'+t.slice(i,i+qq.length)+'</b>'+t.slice(i+qq.length);
    }
    function renderOmni(list,term){
      list=(list||[]).filter(Boolean);
      if(!list.length){hideOmni();return;}
      items=list;active=-1;
      omni.innerHTML=list.map(function(x,i){
        var kind=x.kind||x.browse_scope||'city';
        var glyph=KIND_GLYPH[kind]||'●';
        var tag=KIND_TAG[kind]||'';
        var sub=x.sublabel?'<span class="cc-omni-s">'+esc(x.sublabel)+'</span>':'';
        return '<button type="button" class="cc-omni-item" data-i="'+i+'" role="option">'
          +'<span class="cc-omni-b t-'+kind+'">'+glyph+'</span>'
          +'<span class="cc-omni-tx"><span class="cc-omni-l">'+highlight(x.label,term)+'</span>'+sub+'</span>'
          +'<span class="cc-omni-k">'+tag+'</span></button>';
      }).join('');
      omni.hidden=false;input.setAttribute('aria-expanded','true');
      Array.prototype.forEach.call(omni.querySelectorAll('.cc-omni-item'),function(el){
        el.addEventListener('mousedown',function(e){e.preventDefault();pick(+el.getAttribute('data-i'));});
      });
    }
    function pick(i){
      var x=items[i]; if(!x) return;
      input.value=x.label; hideOmni();
      resolveSelection({scope:x.browse_scope||x.kind,value:x.browse_value||x.value||x.label,label:x.label,lat:x.lat,lng:x.lng});
    }
    function requestSuggest(q){
      var clean=String(q||'').trim();
      var hasDigit=/\d/.test(clean);
      if(!clean||(!hasDigit&&clean.length<2)){hideOmni();return;}
      lastQuery=clean;
      supabaseSuggest(clean).then(function(rows){
        if(clean!==lastQuery) return;
        renderOmni(rows||[],clean);
      });
    }
    input.addEventListener('input',function(){
      var t=input.value.trim(); clearTimeout(tmr);
      if(t.length<2){hideOmni();return;}
      tmr=setTimeout(function(){requestSuggest(t);},180);
    });
    input.addEventListener('keydown',function(e){
      var open=!omni.hidden&&items.length;
      if(e.key==='ArrowDown'){if(open){e.preventDefault();active=(active+1)%items.length;mark();}return;}
      if(e.key==='ArrowUp'){if(open){e.preventDefault();active=(active-1+items.length)%items.length;mark();}return;}
      if(e.key==='Enter'){e.preventDefault();if(open&&active>-1){pick(active);return;}hideOmni();runFreeText(input.value);return;}
      if(e.key==='Escape'){if(open){hideOmni();}else{closeDock();}return;}
    });
    document.addEventListener('click',function(e){ if(!omni.contains(e.target)&&e.target!==input) hideOmni(); });

    /* ---------- Card 4 renderers ---------- */
    var lastDentist=null;
    function loadingHTML(label){
      return '<section class="card-4"><div class="card-4__load">'
        +'<div class="card-4__load-k">Checking Platinum Elite availability</div>'
        +'<div class="card-4__load-s">Searching near '+esc(label||'your area')+'</div></div></section>';
    }
    function cardHTML(d,originLabel,note,showDist){
      var name=d.practice_name||'Platinum Elite dentist';
      var profile=d.profile_url||d.booking_url||d.website||'/find-my-dentist.html';
      var book=d.booking_url||d.profile_url||d.website||'/find-my-dentist.html';
      var sr=sourceRatingHTML(d);
      var addr=d.address||[d.city,d.state,d.zip].filter(Boolean).join(', ');
      var street=addr,region='';
      var ci=String(addr).indexOf(',');
      if(ci>-1){street=addr.slice(0,ci).trim();region=addr.slice(ci+1).trim();}
      var mapsUrl='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent((name+' '+addr).trim());
      var tel=String(d.phone||'').replace(/[^0-9+]/g,'');
      var dist=(d.distance_miles!=null)?(Math.round(Number(d.distance_miles)*10)/10):null;
      var origin=originLabel?('from '+originLabel):'nearby';
      var distTag=(dist!=null)?'<div class="card-4__distrow"><span class="card-4__dist">'+dist+' mi '+esc(origin)+'</span></div>':'';
      return '<section class="card-4" role="dialog" aria-label="'+esc(name)+'">'
        +'<div class="card-4__body">'
        +'<div class="card-4__top"><span class="card-4__feat">Featured Platinum Elite</span></div>'
        +'<a class="card-4__name" href="'+esc(profile)+'">'+esc(name)+'</a>'
        +sr.rating+sr.sources
        +'<div class="card-4__contact">'
        +(addr?'<a class="card-4__addr" href="'+esc(mapsUrl)+'" target="_blank" rel="noopener">'
            +'<span class="card-4__addr-pin" aria-hidden="true"></span>'
            +'<span><p class="card-4__street">'+esc(street)+'</p>'
            +(region?'<p class="card-4__region">'+esc(region)+'</p>':'')
            +((showDist!==false&&dist!=null)?'<span class="card-4__dist">'+dist+' mi '+esc(origin)+'</span>':'')
            +'</span></a>':'<span></span>')
        +'<div class="card-4__contact-r">'
            +(d.phone?'<a class="card-4__phone" href="tel:'+esc(tel)+'">'+esc(d.phone)+'</a>':'')
            +'<button type="button" class="card-4__share" data-name="'+esc(name)+'" data-url="'+esc(profile)+'"><svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><circle cx="18" cy="5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="19" r="2.4" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="11" x2="16" y2="6.5" stroke="currentColor" stroke-width="1.8"/><line x1="8" y1="13" x2="16" y2="17.5" stroke="currentColor" stroke-width="1.8"/></svg> Share</button>'
        +'</div>'
        +'</div>'
        +'<div class="card-4__cta">'
        +'<a class="card-4__btn card-4__btn--primary" href="'+esc(book)+'">Book appointment</a>'
        +'<a class="card-4__btn card-4__btn--ghost" href="'+esc(profile)+'">View dentist profile</a>'
        +'</div>'
        +(note?'<div class="card-4__note">'+esc(note)+'</div>':'')
        +'</div></section>';
    }
    function noneHTML(label){
      return '<section class="card-4">'
        +'<div class="card-4__body">'
        +'<div class="card-4__top"><span class="card-4__feat">PPO dentists near '+esc(label||'you')+'</span></div>'
        +'<div class="card-4__name" style="font-size:21px;line-height:1.18">Browse PPO dentists<br><span class="ah-city">in '+esc(label||'this area')+'</span></div>'
        +'<p class="card-4__region" style="margin:0 0 16px">No Platinum Elite office within '+R+' miles yet.<br>You can still see every PPO dentist in the area.</p>'
        +'<div class="card-4__cta">'
        +'<a class="card-4__btn card-4__btn--primary" href="'+esc(browseUrl(label))+'">Browse all dentists in '+esc(label||'your area')+'</a>'
        +'</div>'
        +'<a class="card-4__subtle" href="/claim-dentist-listing-profile.html">Are you a dentist in '+esc(label||'this area')+'? Claim your profile</a>'
        +'</div></section>';
    }
    function cityPickHTML(zip,cities){
      var chips=cities.map(function(c,idx){
        return '<button type="button" class="card-4__chip" data-idx="'+idx+'">'+esc(c.name||c.city)+'</button>';
      }).join('');
      return '<section class="card-4"><div class="card-4__pick">'
        +'<div class="card-4__pick-k">More than one city</div>'
        +'<h3 class="card-4__pick-h">Which part of <em>'+esc(zip)+'</em>?</h3>'
        +'<div class="card-4__chips">'+chips+'</div>'
        +'<a class="card-4__btn card-4__btn--ghost" href="'+esc(browseUrl(zip))+'">Browse all dentists in '+esc(zip)+'</a>'
        +'</div></section>';
    }

    /* ---------- dock + collapse ---------- */
    function setBtnBusy(b){
      if(!btn) return;
      btn.classList.toggle('is-busy',!!b);
      btn.setAttribute('aria-busy',b?'true':'false');
      var tx=btn.querySelector('.zip-btn-tx');
      if(tx) tx.textContent=b?'Searching':'Search';
    }
    function setDock(html){
      dockBd.innerHTML=html; dock.classList.add('show');dock.classList.remove('is-collapsed'); dock.setAttribute('aria-hidden','false');
      setBtnBusy(/card-4__load/.test(html));
    }
    /* ---- dynamic right-column aside ---- */
    var aside=document.getElementById('cc-find-aside');
    var asideDefault=aside?aside.innerHTML:'';
    /* Both aside cards share one format; only the color modifier differs. */
    /* aside cards use the same luxury concierge card (.mega-hero) as the default */
    function asideCard(mod,eyebrow,line1,line2,cta,href){
      return '<a class="mega-hero cc-aside-h'+mod+'" href="'+esc(href)+'">'
        +'<span class="cc-aside-h-tx">'
        +'<span class="mega-hero-k">'+eyebrow+'</span>'
        +'<span class="mega-hero-t">'+line1+'<br><span class="ah-city">'+line2+'</span></span>'
        +'</span>'
        +'<span class="mega-hero-cta">'+cta+'</span></a>';
    }
    function asideFound(label){
      if(!aside) return;
      aside.innerHTML=
        asideCard('','Keep looking','More PPO dentists','in '+esc(label||'your area'),'Browse all dentists',browseUrl(label||''))
       +asideCard(' mega-hero--featured','For dentists','Get featured to PPO patients','near '+esc(label||'you'),'Get featured','/dentist-portal.html#platinum-elite');
    }
    function asideNone(label){
      if(!aside) return;
      aside.innerHTML=
        asideCard('','No Platinum Elite within 18 miles','Browse PPO dentists','in '+esc(label||'your area'),'Browse all dentists',browseUrl(label||''))
       +asideCard(' mega-hero--featured','For dentists, free','Be the first Platinum Elite office','near '+esc(label||'you'),'Claim your profile','/claim-dentist-listing-profile.html');
    }
    function asideReset(){ if(aside) aside.innerHTML=asideDefault; }
    var chipsBrowse=document.getElementById('cc-chips-browse');
    function setChipsBrowse(label){ if(!chipsBrowse) return; if(label){ chipsBrowse.textContent='Browse all dentists in '+label; chipsBrowse.href=browseUrl(label); chipsBrowse.hidden=false; } else { chipsBrowse.hidden=true; } }
    function showNone(label){
      /* no office to book: clear any prior result so scrolling can't re-collapse
         into a stale "N Platinum Elite offices near <old area>" bar */
      lastDentist=null; multiNav=null;
      setDock(noneHTML(label)); asideNone(label); setChipsBrowse(label);
      if(dockMiniNm) dockMiniNm.innerHTML='';
      if(dockMiniRt) dockMiniRt.innerHTML='';
    }
    function reviewCount(d){ return Number(d.review_count||0)||Number(d.aggregate_review_count||0)||((Number(d.google_review_count)||0)+(Number(d.yelp_review_count)||0)+(Number(d.zocdoc_review_count)||0)); }
    var multiNav=null; /* {prev,next} for keyboard arrows */
    function showResults(list,originLabel,note,scope){
      list=(list||[]).filter(Boolean); if(!list.length){ showNone(originLabel); return; }
      var isCity=(scope==='city'||scope==='zip'||scope==null);
      multiNav=null;
      if(list.length===1){
        lastDentist=list[0];
        setDock('<div class="card-stack">'+cardHTML(list[0],originLabel,'',isCity)+'</div>');
      } else {
        lastDentist=list[0];
        setDock('<div class="card-switch" id="cc-switch"></div>');
        wireSwitch(list,originLabel,isCity);
      }
      asideFound(originLabel);
      var sr=sourceRatingHTML(list[0]);
      if(dockMiniNm) dockMiniNm.innerHTML=list.length>1?(list.length+' Platinum Elite offices<br><span class="ah-city">near '+esc(originLabel||'you')+'</span>'):esc(list[0].practice_name||'Platinum Elite dentist');
      if(dockMiniRt) dockMiniRt.innerHTML=(list.length===1&&sr.head)?(fmtRating(sr.head)+' <span class="s">★</span>'):'';
      if(dockMiniBk) dockMiniBk.dataset.href=list[0].booking_url||list[0].profile_url||list[0].website||'/find-my-dentist.html';
    }
    /* Switch between the two (concept 3): a toggle flips the single shown office.
       Nearest only when the search has a precise center (city or ZIP). A pager
       appears only when there are more than two offices. Left/Right keys move. */
    function wireSwitch(list,label,isCity){
      var box=dockBd.querySelector('#cc-switch'); if(!box) return;
      var mode=isCity?'near':'reviews';
      function sortBy(m){ var l=list.slice(); if(m==='near'){ l.sort(function(a,b){return (Number(a.distance_miles)||1e9)-(Number(b.distance_miles)||1e9);}); } else { l.sort(function(a,b){return reviewCount(b)-reviewCount(a);}); } return l; }
      var usePager=(list.length>2)||(!isCity);
      var idx=0;
      /* compact sort toggle, injected into each card's rating row (city only) */
      var toggleHTML=isCity?'<div class="cm-mini" role="group" aria-label="Sort offices"><button type="button" class="cm-mini-opt" data-sort="near">Nearest</button><button type="button" class="cm-mini-opt" data-sort="reviews">Most reviews</button></div>':'';
      function injectToggle(){
        if(!toggleHTML) return;
        [].slice.call(box.querySelectorAll('.card-4__rating')).forEach(function(row){
          if(row.querySelector('.cm-mini')) return;
          row.classList.add('card-4__rating--toggle');
          row.insertAdjacentHTML('beforeend',toggleHTML);
        });
        [].slice.call(box.querySelectorAll('.cm-mini-opt')).forEach(function(o){
          o.classList.toggle('on',o.getAttribute('data-sort')===mode);
          o.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); mode=o.getAttribute('data-sort'); idx=0; render(); });
        });
      }
      function render(){
        var sorted=sortBy(mode);
        var body;
        if(usePager){
          body='<div class="cs-view"><div class="cs-track" id="cw-track">'+sorted.map(function(d){return '<div class="cs-slide">'+cardHTML(d,label,'',isCity)+'</div>';}).join('')+'</div></div>'
            +'<div class="cs-nav"><button class="cs-arw cs-prev" aria-label="Previous office">&#8249;</button><div class="cs-dots" id="cw-dots">'+sorted.map(function(_,j){return '<button class="cs-dot'+(j===0?' on':'')+'" data-i="'+j+'"></button>';}).join('')+'</div><button class="cs-arw cs-next" aria-label="Next office">&#8250;</button></div>';
        } else {
          body='<div class="cw-card">'+cardHTML(sorted[0],label,'',isCity)+'</div>';
        }
        box.innerHTML=body;
        injectToggle();
        if(usePager){
          var track=box.querySelector('#cw-track'), dots=box.querySelector('#cw-dots');
          var prev=box.querySelector('.cs-prev'), next=box.querySelector('.cs-next');
          function go(k){ idx=Math.max(0,Math.min(sorted.length-1,k)); track.style.transform='translateX(-'+(idx*100)+'%)'; [].slice.call(dots.children).forEach(function(d,j){d.classList.toggle('on',j===idx);}); if(prev)prev.disabled=(idx===0); if(next)next.disabled=(idx===sorted.length-1); }
          if(prev) prev.addEventListener('click',function(){go(idx-1);});
          if(next) next.addEventListener('click',function(){go(idx+1);});
          [].slice.call(dots.children).forEach(function(d){ d.addEventListener('click',function(){go(+d.getAttribute('data-i'));}); });
          go(0);
          multiNav={prev:function(){go(idx-1);},next:function(){go(idx+1);}};
        } else {
          /* exactly two, city: arrows flip the toggle */
          multiNav={prev:function(){mode='near';idx=0;render();},next:function(){mode='reviews';idx=0;render();}};
        }
      }
      render();
    }
    function closeDock(){ dock.classList.remove('show','is-collapsed'); dock.setAttribute('aria-hidden','true'); lastDentist=null; multiNav=null; asideReset(); setChipsBrowse(null); }
    function expandDock(){ dock.classList.remove('is-collapsed'); }
    function collapseDock(){ if(lastDentist) dock.classList.add('is-collapsed'); }
    /* minimize the result card when the user switches to another mega-nav tab */
    document.addEventListener('cc:mega-open',function(e){ if(e.detail&&e.detail.key!=='find') collapseDock(); });
    if(dockX) dockX.addEventListener('click',closeDock);
    /* share a dentist */
    if(dockBd) dockBd.addEventListener('click',function(e){
      var btn=e.target.closest&&e.target.closest('.card-4__share'); if(!btn) return;
      e.preventDefault();
      var name=btn.getAttribute('data-name')||'PPO dentist';
      var path=btn.getAttribute('data-url')||'/find-my-dentist.html';
      var url=(location.protocol==='file:'?'https://covercapy.com':location.origin)+path;
      if(navigator.share){ navigator.share({title:name,text:name+' on CoverCapy',url:url}).catch(function(){}); return; }
      var done=function(){ btn.classList.add('copied'); var t=btn.querySelector('svg'); btn.lastChild.textContent=' Link copied'; setTimeout(function(){btn.classList.remove('copied');btn.lastChild.textContent=' Share';},1800); };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done).catch(done); } else { done(); }
    });
    if(dockMini){
      dockMini.addEventListener('click',function(e){ if(e.target===dockMiniBk) return; expandDock(); });
      dockMini.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();expandDock();} });
    }
    if(dockMiniBk) dockMiniBk.addEventListener('click',function(e){ e.stopPropagation(); var h=dockMiniBk.dataset.href; if(h) window.location.href=h; });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&dock.classList.contains('show')) closeDock(); });
    document.addEventListener('keydown',function(e){
      if(!dock.classList.contains('show')||!multiNav) return;
      if(/INPUT|TEXTAREA/.test((e.target&&e.target.tagName)||'')) return;
      if(e.key==='ArrowLeft'){ e.preventDefault(); multiNav.prev(); }
      else if(e.key==='ArrowRight'){ e.preventDefault(); multiNav.next(); }
    });
    /* touch: swipe left/right to move between offices, swipe down to dismiss */
    (function(){
      if(!dockBd) return; var sx=0,sy=0,on=false;
      dockBd.addEventListener('touchstart',function(e){ var t=e.touches[0]; sx=t.clientX; sy=t.clientY; on=true; },{passive:true});
      dockBd.addEventListener('touchend',function(e){ if(!on) return; on=false; var t=e.changedTouches[0]; var dx=t.clientX-sx, dy=t.clientY-sy;
        if(multiNav && Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) multiNav.next(); else multiNav.prev(); return; }
        if(dy>70 && Math.abs(dy)>Math.abs(dx) && dockBd.scrollTop<=0){ closeDock(); }
      },{passive:true});
    })();

    /* collapse on scroll down once a result is shown; expand on scroll up */
    var lastScroll=window.scrollY;
    window.addEventListener('scroll',function(){
      if(!dock.classList.contains('show')||!lastDentist) return;
      var y=window.scrollY;
      if(y>lastScroll+8){ collapseDock(); }
      else if(y<lastScroll-8){ expandDock(); }
      lastScroll=y;
    },{passive:true});

    /* ---------- orchestration (ported) ---------- */
    function previewPoint(label,lat,lng,scope){
      setDock(loadingHTML(label));
      return featuredDentistsNear(lat,lng,label).then(function(ds){
        if(ds&&ds.length){ showResults(ds,label,ds[0].__demo?'Preview sample. Live results load on the site.':'',scope); }
        else { showNone(label); }
      });
    }
    function resolveZip(zip){
      setDock(loadingHTML(zip));
      return citiesForZip(zip).then(function(rows){
        var cities=(rows||[]).filter(function(c){return c&&c.lat!=null&&c.lng!=null;});
        if(cities.length===0){ return previewPoint(zip,null,null,'zip'); }
        if(cities.length===1){ var o=cities[0]; return previewPoint(o.name||o.city||zip,o.lat,o.lng,'city'); }
        setDock(cityPickHTML(zip,cities));
        dockBd.querySelectorAll('.card-4__chip').forEach(function(chip){
          chip.addEventListener('click',function(){
            var c=cities[Number(chip.getAttribute('data-idx'))||0]; if(!c) return;
            previewPoint(c.name||c.city,c.lat,c.lng,'city');
          });
        });
      });
    }
    function resolveSelection(sel){
      var scope=sel.scope||'city';
      var value=sel.value;
      var label=sel.label||value;
      if(scope==='zip'){ resolveZip(value); return; }
      if(sel.lat!=null&&sel.lng!=null&&sel.lat!==''&&sel.lng!==''){ previewPoint(label,sel.lat,sel.lng,scope); return; }
      /* no centroid: try to resolve a city centroid via demo/REST, else show none */
      setDock(loadingHTML(label));
      get('search_locations?select=name,city,lat,lng&type=eq.city&city=ilike.'+encodeURIComponent(value||label)+'&limit=1').then(function(rows){
        if(rows===null){ previewPoint(label,34.05,-118.24,scope); return; } /* demo centroid */
        var loc=rows&&rows[0];
        if(loc&&loc.lat!=null){ previewPoint(label,loc.lat,loc.lng,scope); }
        else { showNone(label); }
      });
    }
    function runFreeText(term){
      var clean=String(term||'').trim().replace(/\s+/g,' ');
      if(!clean) return;
      hideOmni();
      if(/^\d{5}$/.test(clean)){ resolveZip(clean); return; }
      setDock(loadingHTML(clean));
      supabaseSuggest(clean).then(function(rows){
        rows=rows||[];
        if(!rows.length){ showNone(clean); return; }
        var exact=null;
        for(var i=0;i<rows.length;i++){ if(String(rows[i].label||'').toLowerCase()===clean.toLowerCase()){ exact=rows[i]; break; } }
        var pick=exact||rows[0];
        resolveSelection({scope:pick.browse_scope||pick.kind,value:pick.browse_value||pick.value||pick.label,label:pick.label,lat:pick.lat,lng:pick.lng});
      });
    }

    btn.addEventListener('click',function(){ hideOmni(); runFreeText(input.value); });
    document.querySelectorAll('.zip-chip[data-q]').forEach(function(c){
      c.addEventListener('click',function(e){ e.preventDefault(); input.value=c.getAttribute('data-q'); hideOmni(); runFreeText(c.getAttribute('data-q')); });
    });
  })();
})();

/* ───────── */

/* Geo drill-down: choose a state, narrow into its real sector hubs */
(function(){
  var CC_GEO={
    california:{label:'California',r:[['Orange County','orange-county'],['Los Angeles','los-angeles'],['San Gabriel Valley','san-gabriel-valley'],['San Fernando Valley','san-fernando-valley'],['Riverside','riverside'],['San Bernardino','san-bernardino'],['San Diego','san-diego'],['Bay Area','bay-area'],['Sacramento','sacramento']]},
    texas:{label:'Texas',r:[['Houston','houston'],['Dallas','dallas'],['Fort Worth','fort-worth'],['Austin','austin'],['San Antonio','san-antonio'],['El Paso','el-paso'],['Rio Grande Valley','rio-grande-valley']]},
    florida:{label:'Florida',r:[['Miami','miami'],['Fort Lauderdale','fort-lauderdale'],['Palm Beach','palm-beach'],['Orlando','orlando'],['Tampa Bay','tampa-bay'],['Jacksonville','jacksonville'],['Naples & Fort Myers','naples-fort-myers']]},
    'new-york':{label:'New York',r:[['New York City','new-york-city'],['Long Island','long-island'],['Westchester','westchester'],['Hudson Valley','hudson-valley'],['Buffalo','buffalo'],['Rochester','rochester'],['Albany','albany']]},
    arizona:{label:'Arizona',r:[['Phoenix','phoenix'],['Scottsdale','scottsdale'],['East Valley','east-valley'],['West Valley','west-valley'],['Tucson Metro','tucson-metro'],['Northern Arizona','northern-arizona']]},
    washington:{label:'Washington',r:[['Seattle','seattle'],['Eastside','eastside'],['Tacoma','tacoma'],['South King County','south-king-county'],['Spokane','spokane'],['Vancouver','vancouver']]},
    nevada:{label:'Nevada',r:[['Las Vegas','las-vegas'],['Henderson','henderson'],['Summerlin','summerlin'],['Reno','reno'],['Lake Tahoe','lake-tahoe']]},
    'new-jersey':{label:'New Jersey',r:[['Newark','newark'],['Jersey City','jersey-city'],['Bergen County','bergen-county'],['Middlesex County','middlesex-county'],['Ocean County','ocean-county'],['Jersey Shore','jersey-shore']]},
    pennsylvania:{label:'Pennsylvania',r:[['Philadelphia','philadelphia'],['Pittsburgh','pittsburgh'],['Lehigh Valley','lehigh-valley'],['Harrisburg','harrisburg'],['Lancaster','lancaster'],['Scranton & Wilkes-Barre','scranton-wilkes-barre']]},
    'north-carolina':{label:'North Carolina',r:[['Charlotte Metro','charlotte-metro'],['Research Triangle','research-triangle'],['Piedmont Triad','piedmont-triad'],['Cape Fear Coast','cape-fear-coast'],['Sandhills','sandhills']]},
    connecticut:{label:'Connecticut',r:[['Fairfield County','fairfield-county'],['Hartford','hartford'],['New Haven','new-haven'],['Litchfield County','litchfield-county'],['New London','new-london']]},
    'rhode-island':{label:'Rhode Island',r:[['Providence','providence'],['Newport','newport'],['Warwick','warwick'],['South County','south-county']]},
    ohio:{label:'Ohio',r:[['Columbus','columbus'],['Cleveland','cleveland'],['Cincinnati','cincinnati']]},
    illinois:{label:'Illinois',r:[['Chicago','chicago']]}
  };
  var sel=document.getElementById('ccGeoState'), box=document.getElementById('ccGeoRegions'), all=document.getElementById('ccGeoAll');
  if(!sel||!box||!all) return;
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  function render(st){
    var d=CC_GEO[st]; if(!d) return;
    box.innerHTML=d.r.map(function(x){return '<a class="geo-chip" href="/dental/'+st+'/'+x[1]+'/">'+esc(x[0])+'</a>';}).join('');
    all.setAttribute('href','/dental/'+st+'/'); all.textContent='All '+d.label+' areas';
  }
  sel.addEventListener('change',function(){render(sel.value);});
  render(sel.value);
})();
