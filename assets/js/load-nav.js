/* CoverCapy Mega Nav Loader
   Usage:
   <div id="mega-nav-container"></div>
   <script src="/assets/js/load-nav.js"></script>
*/
(function(){
  var container = document.getElementById('mega-nav-container') || document.getElementById('covercapy-mega-nav');
  if(!container){
    container = document.createElement('div');
    container.id = 'mega-nav-container';
    document.body.insertBefore(container, document.body.firstChild);
  }

  function addCssOnce(href){
    var exists = Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function(l){
      return (l.getAttribute('href') || '').indexOf(href) !== -1;
    });
    if(!exists){
      var link=document.createElement('link');
      link.rel='stylesheet';
      link.href=href;
      document.head.appendChild(link);
    }
  }

  function addScriptOnce(src, cb){
    var existing = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(s){
      return (s.getAttribute('src') || '').indexOf(src) !== -1;
    });
    if(existing){ if(cb) cb(); return; }
    var script=document.createElement('script');
    script.src=src;
    script.defer=true;
    if(cb) script.onload=cb;
    document.body.appendChild(script);
  }

  addCssOnce('/assets/css/mega-nav.css');
  addCssOnce('/assets/css/mega-nav-mobile.css');

  var paths = ['/mega-nav.html', '/assets/includes/mega-nav.html'];
  var i = 0;

  function tryFetch(){
    fetch(paths[i], {cache:'no-cache'})
      .then(function(r){ if(!r.ok) throw new Error('Mega nav not found at ' + paths[i]); return r.text(); })
      .then(function(html){
        container.innerHTML = html;
        addScriptOnce('/assets/js/mega-nav.js');
      })
      .catch(function(){
        i++;
        if(i < paths.length) tryFetch();
        else console.error('CoverCapy mega nav failed to load.');
      });
  }

  tryFetch();
})();
