/* CoverCapy omega-nav2 — behavior. Generated from nav-prototype-v3.html. */
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
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
    root.style.setProperty('--cc-scroll', pct.toFixed(2) + '%');
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
     Find a Dentist: static autosuggest (cities + market areas +
     states, generated from the /dental/ tree) with handoff to
     /find-my-dentist.html?where=... — that page prefills the
     search box and auto-runs the search (ccNavPrefill).
     The old inline results dock is gone: every search navigates.
     ============================================================ */
  (function(){
    var input=document.getElementById('cc-find-input');
    var btn=document.getElementById('cc-find-btn');
    var omni=document.getElementById('cc-omni');

    /* CC_GEO_DATA: { "State": { "Market Area": ["City", "*Local Area", ...] } }
       "*" prefix marks a local-area hub rather than a single city. */
    var CC_GEO_DATA={"Arizona":{"Central Arizona":["Casa Grande","Coolidge","Eloy","Florence","Globe","Kearny","Maricopa","Payson","San Tan Valley","Superior"],"East Valley":["Apache Junction","Chandler","Gilbert","Guadalupe","Mesa","Queen Creek","Tempe"],"Northern Arizona":["Camp Verde","Chinle","Chino Valley","Cottonwood","Eagar","Flagstaff","Holbrook","Page","Pinetop Lakeside","Prescott","Prescott Valley","Sedona","Show Low","Snowflake","Springerville","St Johns","Taylor","Tuba City","Williams","Winslow"],"Phoenix":["Anthem","Phoenix"],"Scottsdale":["Cave Creek","Fountain Hills","Paradise Valley","Scottsdale"],"Southern Arizona":["Benson","Bisbee","Clifton","Douglas","Nogales","Pima","Safford","Sierra Vista","Thatcher","Willcox"],"Tucson Metro":["Catalina","Green Valley","Marana","Oro Valley","Sahuarita","South Tucson","Tucson","Vail"],"West Valley":["Avondale","Buckeye","El Mirage","Glendale","Goodyear","Litchfield Park","Peoria","Sun City","Sun City West","Surprise","Tolleson","Wickenburg"],"Western Arizona":["Bullhead City","Fort Mohave","Kingman","Lake Havasu City","Parker"],"Yuma Region":["San Luis","Somerton","Wellton","Yuma"]},"California":{"Bay Area":["Alameda","Belmont","Berkeley","Burlingame","Campbell","Concord","Cupertino","Daly City","Dublin","Fairfax","Foster City","Fremont","Hayward","Livermore","Los Altos","Los Gatos","Menlo Park","Millbrae","Milpitas","Mountain View","Novato","Oakland","Palo Alto","Pleasanton","Redwood City","San Bruno","San Carlos","San Francisco","San Jose","San Leandro","San Lorenzo","San Mateo","San Rafael","Santa Clara","South San Francisco","Sunnyvale","Vallejo","Walnut Creek"],"Central Coast":["Salinas","San Luis Obispo","Santa Barbara","Santa Cruz"],"Central Valley":["Bakersfield","Fresno","Modesto","Stockton","Visalia"],"Chula Vista South Bay":[],"Coronado Island":[],"East Bay":[],"East County":[],"Glendale Burbank":[],"Long Beach Gateway Cities":[],"Los Angeles":["Alhambra","Arcadia","Azusa","Baldwin Park","Beverly Hills","Bradbury","Burbank","Carson","Cerritos","City of Industry","Claremont","Covina","Culver City","Diamond Bar","Downey","Duarte","El Monte","El Segundo","Encino","Gardena","Glendale","Glendora","Hacienda Heights","Hawthorne","Hermosa Beach","Irwindale","La Canada Flintridge","La Mirada","La Puente","La Verne","Lakewood","Lawndale","Long Beach","Los Angeles","Manhattan Beach","Monrovia","Monterey Park","North Hollywood","Palos Verdes Estates","Pasadena","Pomona","Rancho Palos Verdes","Redondo Beach","Rolling Hills Estates","Rosemead","Rowland Heights","San Dimas","San Gabriel","San Marino","San Pedro","Santa Monica","Sierra Madre","South El Monte","South Pasadena","Studio City","Temple City","Toluca Lake","Torrance","Valley Glen","Walnut","West Covina","Whittier","Woodland Hills"],"Napa Sonoma":["Napa","Petaluma","Santa Rosa"],"North Bay":[],"North County":[],"Northern California":[],"Orange County":["Aliso Viejo","Anaheim","Anaheim Hills","Brea","Buena Park","Costa Mesa","Coto de Caza","Cypress","Dana Point","Foothill Ranch","Fountain Valley","Fullerton","Garden Grove","Huntington Beach","Irvine","La Habra","Laguna Beach","Laguna Hills","Laguna Niguel","Laguna Woods","Lake Forest","Los Alamitos","Mission Viejo","Newport Beach","Orange","Placentia","Rancho Santa Margarita","San Clemente","Santa Ana","Seal Beach","Tustin","Villa Park","Westminster","Yorba Linda"],"Peninsula":[],"Pomona Valley":[],"Riverside":["Banning","Beaumont","Canyon Lake","Corona","Hemet","Jurupa Valley","Lake Elsinore","Menifee","Moreno Valley","Murrieta","Norco","Perris","Riverside","San Jacinto","Temecula","Wildomar"],"Sacramento":["Elk Grove","Roseville","Sacramento"],"San Bernardino":["Adelanto","Apple Valley","Banning","Beaumont","Canyon Lake","Chino","Chino Hills","Colton","Corona","Fontana","Grand Terrace","Hemet","Hesperia","Highland","Jurupa Valley","Lake Elsinore","Loma Linda","Menifee","Montclair","Moreno Valley","Murrieta","Norco","Ontario","Perris","Rancho Cucamonga","Redlands","Rialto","Riverside","San Bernardino","San Jacinto","Temecula","Upland","Victorville","Wildomar","Yucaipa"],"San Diego":["Alpine","Bonita","Carlsbad","Chula Vista","Coronado","Del Mar","El Cajon","Encinitas","Escondido","Imperial Beach","La Jolla","La Mesa","Lakeside","Lemon Grove","National City","Oceanside","Poway","Ramona","Rancho Bernardo","San Diego","San Marcos","San Ysidro","Santee","Solana Beach","Spring Valley","Vista"],"San Fernando Valley":[],"San Gabriel Valley":[],"Silicon Valley":[],"South Bay":[],"Southern California":[],"Temecula Murrieta":[],"Tri Valley Contra Costa":[],"Westside":[]},"Connecticut":{"Fairfield County":["Bethel","Bridgeport","Danbury","Greenwich","Norwalk","Shelton","Stamford","Stratford"],"Hartford":["Berlin","Bristol","East Windsor","Enfield","Hartford","Manchester","New Britain","Newington","Southington","Suffield","Vernon","West Hartford","Windsor"],"Litchfield County":["Litchfield","New Milford","Torrington","Winchester"],"New Haven":["East Haven","Hamden","Meriden","Milford","New Haven","North Haven","West Haven","Woodbridge"],"New London":["Groton","New London","Waterford"],"Norwich":["Montville","Norwich"],"Waterbury":["Middlebury","Naugatuck","Prospect","Waterbury"]},"Florida":{"Boca Raton":[],"Bradenton":[],"Daytona Beach":["Daytona Beach","New Smyrna Beach","Ormond Beach"],"Florida Keys":["Islamorada","Key Largo","Key West","Marathon","Tavernier"],"Fort Lauderdale":["Davie","Deerfield Beach","Fort Lauderdale","Hallandale Beach","Hollywood","Plantation","Pompano Beach","Sunrise"],"Fort Walton Destin":[],"Jacksonville":["Atlantic Beach","Fernandina Beach","Jacksonville","Jacksonville Beach","Neptune Beach","Orange Park","Ponte Vedra Beach","St Augustine"],"Jacksonville Beaches":[],"Key West":[],"Miami":["Aventura","Coconut Grove","Coral Gables","Doral","Florida City","Hialeah","Homestead","Miami","Miami Beach"],"Miami Beach":[],"Naples":[],"Naples Fort Myers":["Bonita Springs","Cape Coral","Estero","Fort Myers","Marco Island","Naples","North Fort Myers"],"Orlando":["Altamonte Springs","Kissimmee","Orlando","Sanford","Windermere","Winter Park"],"Palm Beach":["Boca Raton","Boynton Beach","Delray Beach","Lake Worth Beach","Palm Beach Gardens","Wellington","West Palm Beach"],"Panhandle Gulf Coast":["Destin","Fort Walton Beach","Gulf Breeze","Navarre","Niceville","Panama City Beach","Pensacola"],"Pensacola":[],"Sarasota":["Bradenton","Englewood","North Port","Osprey","Sarasota","Venice"],"Space Coast":["Cocoa Beach","Melbourne","Palm Bay","Titusville"],"Tampa Bay":["Brandon","Clearwater","Dunedin","Largo","Madeira Beach","Palm Harbor","Riverview","Safety Harbor","St Pete Beach","St Petersburg","Tampa","Tarpon Springs","Temple Terrace","Treasure Island","Wesley Chapel"],"Treasure Coast":["Vero Beach"]},"Illinois":{"Chicago":["Chicago"]},"Nevada":{"Henderson":[],"Lake Tahoe":["Incline Village","Stateline"],"Las Vegas":["Blue Diamond","Boulder City","Bunkerville","Enterprise","Henderson","Indian Springs","Las Vegas","Laughlin","Logandale","Mesquite","North Las Vegas","Overton","Pahrump","Paradise","Spring Valley","Summerlin","Sunrise Manor","Whitney","Winchester"],"Northeastern Nevada":["Battle Mountain","Carlin","Elko","Ely","Ruth","Spring Creek","Wells","West Wendover","Winnemucca"],"Reno":["Carson City","Cold Springs","Dayton","Fallon","Fernley","Gardnerville","Lovelock","Minden","Reno","Silver Springs","Smith Valley","Spanish Springs","Sparks","Sun Valley","Verdi","Virginia City","Yerington"],"Reno Sparks":[],"Summerlin":[]},"New Jersey":{"Bergen County":["Fort Lee","Hackensack"],"Jersey City":["Bayonne","Harrison","Hoboken","Jersey City","Kearny","Union City","West New York"],"Jersey Shore":["Absecon","Egg Harbor","Galloway","Hamilton","Margate","Pleasantville","Ventnor"],"Middlesex County":["Cromwell","East Brunswick","Edison","Franklin","Metuchen","Middletown","New Brunswick","North Brunswick","Perth Amboy","Sayreville","South Amboy","South Brunswick","South Plainfield","Woodbridge"],"Morris County":["East Hanover","Morristown","Parsippany"],"Newark":["City of Orange","East Orange","Newark","West Caldwell","West Orange"],"Ocean County":["Brick","Lakewood","Toms River"],"Passaic County":["Clifton","Passaic","Paterson","Wayne"],"South Jersey":["Camden","Cherry Hill","Collingswood","Pennsauken","Voorhees"],"Trenton":["Ewing","Hamilton","Trenton"],"Union County":["Elizabeth","Fanwood","Linden","North Plainfield","Plainfield","Roselle Park","Union"],"Vineland":["Millville","Vineland"]},"New York":{"Albany":["Albany","Ballston Spa","Cohoes","Saratoga Springs","Schenectady","Troy","Watervliet"],"Binghamton":["Binghamton","Endicott","Johnson City","Vestal"],"Buffalo":["Buffalo","Cheektowaga","Depew","Jamestown","Kenmore","Lakewood","Niagara Falls","North Tonawanda","Tonawanda","Williamsville"],"Elmira":["Elmira","Horseheads"],"Hudson Valley":["Middletown","Nanuet","New City","New Windsor","Newburgh","Poughkeepsie","Spring Valley"],"Ithaca":["Ithaca"],"Long Island":["Babylon","Baldwin","Bay Shore","Bethpage","Brentwood","Commack","Franklin Square","Freeport","Hauppauge","Hempstead","Hicksville","Huntington","Huntington Station","Island Park","Jericho","Levittown","Long Beach","Merrick","North Babylon","Patchogue","Plainview","West Babylon","West Hempstead","West Islip","Westbury"],"New York City":["Astoria","Bronx","Brooklyn","Flushing","Forest Hills","Jackson Heights","New York","Queens Village","Staten Island"],"North Country":["Plattsburgh","Watertown"],"Rochester":["Brighton","Greece","Irondequoit","Rochester"],"Syracuse":["North Syracuse","Syracuse"],"Utica":["New Hartford","Rome","Utica"],"Westchester":["Bronxville","Harrison","Mount Vernon","New Rochelle","White Plains","Yonkers"]},"North Carolina":{"Cape Fear Coast":["Wilmington"],"Charlotte Metro":["Charlotte","Concord","Gastonia","Huntersville","Kannapolis","Matthews","Monroe","Mooresville","Salisbury"],"Eastern North Carolina":["Goldsboro","Greenville","Jacksonville","New Bern","Rocky Mount","Wilson"],"Piedmont Triad":["Burlington","Greensboro","High Point","Winston Salem"],"Research Triangle":["Apex","Cary","Chapel Hill","Durham","Holly Springs","Raleigh","Wake Forest"],"Sandhills":["Fayetteville"],"Western North Carolina":["Arden","Asheville","Hickory"]},"Nv":{"Henderson":[],"Las Vegas":["Blue Diamond","Boulder City","Bunkerville","Enterprise","Henderson","Indian Springs","Las Vegas","Laughlin","Logandale","Mesquite","North Las Vegas","Overton","Pahrump","Paradise","Spring Valley","Summerlin","Sunrise Manor","Whitney","Winchester"],"Summerlin":[]},"Ohio":{"Cincinnati":["Blue Ash","Cincinnati","Fairfield","Loveland","Madeira","Montgomery","Norwood","Springdale","West Chester"],"Cleveland":["Beachwood","Berea","Cleveland","Cleveland Heights","Euclid","Fairview Park","Garfield Heights","Lakewood","Lyndhurst","Maple Heights","Mayfield Heights","Mentor","North Olmsted","North Royalton","Olmsted Falls","Rocky River","Solon","Strongsville","Twinsburg","University Heights","Westlake","Willoughby"],"Columbus":["Bexley","Blacklick","Canal Winchester","Columbus","Dublin","Gahanna","Grove City","Hilliard","New Albany","Powell","Reynoldsburg","Upper Arlington","Westerville","Worthington"]},"Pennsylvania":{"Altoona":["Altoona","Duncansville","Hollidaysburg"],"Chambersburg":["Chambersburg"],"Erie":["Erie"],"Harrisburg":["Boiling Springs","Carlisle","Harrisburg","Mechanicsburg"],"Johnstown":["Johnstown"],"Lancaster":["Lancaster"],"Lebanon":["Fredericksburg","Lebanon"],"Lehigh Valley":["Allentown","Bethlehem","Easton"],"Philadelphia":["Andalusia","Bensalem","Bristol","Conshohocken","Doylestown","Fairless Hills","Feasterville Trevose","King of Prussia","Langhorne","Levittown","Media","Norristown","Philadelphia","Plymouth Meeting","Pottstown","Radnor","Thorndale","Wayne","West Chester"],"Pittsburgh":["Bethel Park","Cranberry Township","Greensburg","Mars","Monroeville","Pittsburgh","Warrendale","Washington"],"Pottsville":["Pottsville","Saint Clair"],"Reading":["Reading","Wyomissing"],"Scranton Wilkes Barre":["Forty Fort","Hazleton","Kingston","Scranton","Wilkes Barre"],"State College":["State College"],"Williamsport":["Duboistown","Montoursville","Muncy","Williamsport"],"York":["York"]},"Rhode Island":{"Newport":["Barrington","Bristol","Jamestown","Middletown","Newport","Portsmouth","Tiverton","Warren"],"Providence":["Central Falls","Cranston","East Providence","Johnston","North Providence","Pawtucket","Providence"],"South County":["Charlestown","Narragansett","North Kingstown","South Kingstown","Westerly"],"Warwick":["Coventry","East Greenwich","Warwick","West Warwick"],"Woonsocket":["Burrillville","Cumberland","Glocester","Lincoln","North Smithfield","Scituate","Smithfield","Woonsocket"]},"Texas":{"Abilene":["Abilene"],"Abilene San Angelo":["*Abilene","*San Angelo"],"Amarillo":["Amarillo"],"Austin":["Austin","Bee Cave","Cedar Park","Georgetown","Pflugerville","Round Rock","West Lake Hills"],"Beaumont":["*Beaumont"],"Beaumont Port Arthur":["Beaumont"],"Brazos Valley":["*Bryan"],"Bryan College Station":["Bryan"],"Central Texas":["*Killeen","*Temple","*Waco"],"Corpus Christi":["Corpus Christi"],"Dallas":["Allen","Carrollton","Dallas","Denton","Flower Mound","Frisco","Garland","Grand Prairie","Irving","Lewisville","Mckinney","Mesquite","Plano","Richardson"],"East Texas":["Longview","Tyler"],"El Paso":["El Paso"],"Fort Worth":["Arlington","Bedford","Euless","Fort Worth","Haltom City","Keller","Mansfield","North Richland Hills"],"Houston":["Baytown","Conroe","Houston","League City","Pasadena","Pearland","Sugar Land"],"Killeen Temple":["Killeen","Temple"],"Laredo":["Laredo"],"Lubbock":["Lubbock"],"Permian Basin":["Midland","Odessa"],"Rio Grande Valley":["Brownsville","Edinburg","Harlingen","Mcallen","Mission","Pharr"],"San Angelo":["San Angelo"],"San Antonio":["New Braunfels","San Antonio"],"Waco":["Waco"],"Wichita Falls":["Wichita Falls"]},"Washington":{"Bellingham":["Bellingham"],"Eastside":["Bellevue","Bothell","Kirkland","Redmond"],"Kitsap":["Bremerton","Port Orchard","Silverdale"],"North Sound":["Arlington","Edmonds","Everett","Lynnwood","Marysville","Mill Creek","Shoreline"],"Olympia":["Lacey","Olympia","Tumwater"],"Seattle":["Seattle"],"South King County":["Auburn","Burien","Covington","Federal Way","Kent","Maple Valley","Renton"],"Spokane":["Greenacres","Spokane","Spokane Valley"],"Tacoma":["Lakewood","Puyallup","Tacoma"],"Tri Cities":["Kennewick","Pasco","Richland","West Richland"],"Vancouver":["Vancouver"],"Wenatchee":["East Wenatchee","Wenatchee"],"Yakima":["Union Gap","Yakima"]}};

    var LOCS=[];
    (function(){
      for(var st in CC_GEO_DATA){
        LOCS.push({label:st,sub:'State',kind:'state'});
        var mks=CC_GEO_DATA[st];
        for(var mk in mks){
          LOCS.push({label:mk,sub:st,kind:'market_area'});
          for(var i=0;i<mks[mk].length;i++){
            var c=mks[mk][i], isArea=c.charAt(0)==='*';
            if(isArea) c=c.slice(1);
            LOCS.push({label:c,sub:mk+', '+st,kind:isArea?'local_area':'city'});
          }
        }
      }
    })();

    function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}

    /* ---------- handoff ---------- */
    function findUrl(where){ return '/find-my-dentist.html?where='+encodeURIComponent(String(where||'').trim()); }
    function go(where){
      var v=String(where||'').trim(); if(!v) return;
      if(btn){ btn.classList.add('is-busy'); btn.setAttribute('aria-busy','true'); var tx=btn.querySelector('.zip-btn-tx'); if(tx) tx.textContent='Opening'; }
      window.location.href=findUrl(v);
    }

    /* mobile drawer search shares the same handoff */
    var dIn=document.getElementById('cc-drawer-find-input');
    var dBtn=document.getElementById('cc-drawer-find-btn');
    if(dBtn) dBtn.addEventListener('click',function(){ if(dIn) go(dIn.value); });
    if(dIn) dIn.addEventListener('keydown',function(e){ if(e.key==='Enter'){ e.preventDefault(); go(dIn.value); } });

    /* zip chips navigate the same way */
    Array.prototype.forEach.call(document.querySelectorAll('.zip-chip[data-q]'),function(c){
      c.addEventListener('click',function(e){ e.preventDefault(); if(input) input.value=c.getAttribute('data-q'); go(c.getAttribute('data-q')); });
    });

    if(!input||!btn||!omni) return;

    /* ---------- suggest: starts-with first, then contains ---------- */
    var KIND_RANK={city:0,local_area:1,market_area:2,state:3};
    function suggest(q){
      q=String(q||'').trim().toLowerCase(); if(!q) return [];
      var starts=[],contains=[];
      for(var i=0;i<LOCS.length;i++){
        var p=LOCS[i].label.toLowerCase().indexOf(q);
        if(p===0) starts.push(LOCS[i]);
        else if(p>0) contains.push(LOCS[i]);
      }
      function cmp(a,b){ return (KIND_RANK[a.kind]-KIND_RANK[b.kind])||(a.label.length-b.label.length)||a.label.localeCompare(b.label); }
      starts.sort(cmp); contains.sort(cmp);
      return starts.concat(contains).slice(0,8);
    }

    /* ---------- omni rendering + keyboard nav ---------- */
    var KIND_GLYPH={zip:'#',city:'⌂',local_area:'◆',market_area:'❖',state:'★'};
    var KIND_TAG={zip:'ZIP',city:'City',local_area:'Area',market_area:'Market',state:'State'};
    var tmr=null, active=-1, items=[];
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
        var glyph=KIND_GLYPH[x.kind]||'●';
        var tag=KIND_TAG[x.kind]||'';
        var sub=x.sub?'<span class="cc-omni-s">'+esc(x.sub)+'</span>':'';
        return '<button type="button" class="cc-omni-item" data-i="'+i+'" role="option">'
          +'<span class="cc-omni-b t-'+x.kind+'">'+glyph+'</span>'
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
      input.value=x.label; hideOmni(); go(x.label);
    }
    input.addEventListener('input',function(){
      var t=input.value.trim(); clearTimeout(tmr);
      if(t.length<2||/^\d/.test(t)){hideOmni();return;} /* ZIPs: no local list, Enter still searches */
      tmr=setTimeout(function(){renderOmni(suggest(t),t);},180);
    });
    input.addEventListener('keydown',function(e){
      var open=!omni.hidden&&items.length;
      if(e.key==='ArrowDown'){if(open){e.preventDefault();active=(active+1)%items.length;mark();}return;}
      if(e.key==='ArrowUp'){if(open){e.preventDefault();active=(active-1+items.length)%items.length;mark();}return;}
      if(e.key==='Enter'){e.preventDefault();if(open&&active>-1){pick(active);return;}hideOmni();go(input.value);return;}
      if(e.key==='Escape'){hideOmni();return;}
    });
    document.addEventListener('click',function(e){ if(!omni.contains(e.target)&&e.target!==input) hideOmni(); });
    btn.addEventListener('click',function(){ hideOmni(); go(input.value); });
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
