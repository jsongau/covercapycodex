/* CoverCapy load-nav.js — v91 package
   Loads the modular mega nav from /components/mega-nav.html.
   Use on pages that do NOT already have the inline component loader.

   Recommended page usage:
   <div id="cc-nav-mount"></div>
   <script src="/assets/js/load-nav.js" defer></script>
*/
(function(){
  if (window.__CoverCapyLoadNavRunning) return;
  window.__CoverCapyLoadNavRunning = true;

  function addCssOnce(href){
    if (Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"]'), function(l){
      return (l.getAttribute('href') || '').split('?')[0] === href;
    })) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function addScriptOnce(src){
    return new Promise(function(resolve){
      if (Array.prototype.some.call(document.querySelectorAll('script[src]'), function(s){
        return (s.getAttribute('src') || '').split('?')[0] === src;
      })) return resolve(true);

      var script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = function(){ resolve(true); };
      script.onerror = function(){ console.warn('[CoverCapy] Could not load', src); resolve(false); };
      document.body.appendChild(script);
    });
  }

  function ensureMount(){
    var mount = document.getElementById('cc-nav-mount') ||
                document.getElementById('mega-nav-container') ||
                document.getElementById('covercapy-mega-nav');

    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'cc-nav-mount';
      document.body.insertBefore(mount, document.body.firstChild);
    }
    return mount;
  }

  function replayInlineScripts(wrapper){
    Array.prototype.slice.call(wrapper.querySelectorAll('script')).forEach(function(old){
      var fresh = document.createElement('script');
      for (var i = 0; i < old.attributes.length; i++) {
        fresh.setAttribute(old.attributes[i].name, old.attributes[i].value);
      }
      fresh.textContent = old.textContent || '';
      old.parentNode.replaceChild(fresh, old);
    });
  }

  async function init(){
    addCssOnce('/assets/css/mega-nav.css');
    addCssOnce('/assets/css/mega-nav-mobile.css');

    var mount = ensureMount();

    try {
      var res = await fetch('/components/mega-nav.html', { cache: 'no-cache' });
      if (!res.ok) throw new Error('/components/mega-nav.html returned ' + res.status);

      var wrapper = document.createElement('div');
      wrapper.innerHTML = await res.text();

      replayInlineScripts(wrapper);

      mount.replaceWith.apply(mount, Array.prototype.slice.call(wrapper.childNodes));

      await addScriptOnce('/assets/js/mega-nav.js');
    } catch (err) {
      console.warn('[CoverCapy] Mega nav failed to load:', err);
      mount.setAttribute('data-component-load-error', '/components/mega-nav.html');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
