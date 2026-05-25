<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CoverCapy · Mega Nav Component (load-nav.html)</title>

  <!-- ════════════════════════════════════════════════════════════════
       CoverCapy · MEGA NAV · LOADER PAGE
       This file demonstrates how to load the mega nav as a reusable
       component on any page. Pairs with:
         · mega-nav.html   — the nav markup
         · mega-nav.css    — the nav styles (includes @import for fonts)
         · mega-nav.js     — the nav behavior (hover, dropdowns, calc, etc.)

       To use on another page, copy the <head> font preconnects, the CSS
       <link>, the <div id="mega-nav-mount"> mount point, and the loader
       <script> at the bottom into that page.
       ════════════════════════════════════════════════════════════════ -->

  <!-- Preconnect to Google Fonts for faster paint (the CSS @imports Fraunces + Inter Tight) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Mega nav styles -->
  <link rel="stylesheet" href="mega-nav.css">

  <style>
    /* Demo-only styles for the placeholder body below the nav.
       Safe to delete when integrating into a real page. */
    .demo-body{
      max-width: 980px;
      margin: 0 auto;
      padding: 80px 24px 120px;
      font-family: Georgia, "Iowan Old Style", "Hoefler Text", Cambria, serif;
      color: #0B2A38;
    }
    .demo-body h1{
      font-weight: 400;
      font-size: clamp(34px, 5vw, 48px);
      letter-spacing: -0.01em;
      margin: 0 0 18px;
    }
    .demo-body h1 em{
      font-style: italic;
      color: #2E7D76;
    }
    .demo-body p{
      color: #476477;
      font-size: 17px;
      line-height: 1.65;
      margin: 0 0 14px;
    }
    .demo-body code{
      background: #EFF8F5;
      color: #123F52;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.92em;
    }
    .demo-card{
      margin-top: 36px;
      padding: 24px 26px;
      border: 1px solid #DCEFF7;
      border-radius: 14px;
      background: #FAF8F4;
    }
    .demo-card h2{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #5DA7A0;
      margin: 0 0 12px;
    }
    .demo-card pre{
      margin: 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #123F52;
      overflow-x: auto;
      white-space: pre;
    }
    #mega-nav-error{
      max-width: 980px;
      margin: 24px auto;
      padding: 16px 20px;
      background: #FEF2F2;
      border: 1px solid #FECACA;
      color: #991B1B;
      border-radius: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 13px;
      display: none;
    }
  </style>
</head>
<body>

  <!-- ════════════════════════════════════════════════════════════════
       MOUNT POINT — mega-nav.html gets injected here at runtime.
       ════════════════════════════════════════════════════════════════ -->
  <div id="mega-nav-mount"></div>

  <!-- Error surface (hidden unless the loader fails) -->
  <div id="mega-nav-error"></div>

  <!-- ════════════════════════════════════════════════════════════════
       DEMO BODY — delete this <main> when integrating into a real page.
       ════════════════════════════════════════════════════════════════ -->
  <main class="demo-body">
    <h1>Mega Nav · <em>component demo</em></h1>
    <p>
      This page loads the CoverCapy mega navigation as a reusable component from three sibling files:
      <code>mega-nav.html</code> (markup), <code>mega-nav.css</code> (styles), and <code>mega-nav.js</code> (behavior).
      Hover any link in the nav above to confirm the dropdowns render and interact correctly.
    </p>
    <p>
      To use the nav on another page, you have two integration options:
    </p>

    <div class="demo-card">
      <h2>Option A · Fetch loader (recommended for multi-page sites)</h2>
<pre>&lt;link rel="stylesheet" href="mega-nav.css"&gt;
&lt;div id="mega-nav-mount"&gt;&lt;/div&gt;
&lt;script&gt;
  fetch('mega-nav.html')
    .then(r =&gt; r.text())
    .then(html =&gt; {
      const start = html.indexOf('&lt;nav');
      document.getElementById('mega-nav-mount').innerHTML =
        start &gt; 0 ? html.slice(start) : html;
      const s = document.createElement('script');
      s.src = 'mega-nav.js';
      s.onload = () =&gt; {
        if (typeof updateCrownProgress === 'function') updateCrownProgress(300);
        const t = document.querySelector('.calc-treat');
        if (t) { t.classList.add('is-active');
                 t.style.borderColor = 'var(--g)';
                 t.style.background  = 'var(--gll)'; }
      };
      document.body.appendChild(s);
    });
&lt;/script&gt;</pre>
    </div>

    <div class="demo-card">
      <h2>Option B · Paste &amp; link (simplest, one page at a time)</h2>
<pre>&lt;link rel="stylesheet" href="mega-nav.css"&gt;
&lt;!-- paste the entire &lt;nav&gt;...&lt;/nav&gt; from mega-nav.html here --&gt;
&lt;script src="mega-nav.js" defer&gt;&lt;/script&gt;</pre>
    </div>

    <p style="margin-top:30px;font-size:14px;color:#7892A3;">
      Hosted as a static site (e.g. GitHub Pages) all four files live in the same directory. No build step required.
    </p>
  </main>

  <!-- ════════════════════════════════════════════════════════════════
       LOADER — fetches mega-nav.html, injects it, then loads mega-nav.js.
       Manually re-runs the init steps that mega-nav.js wires to
       DOMContentLoaded (which has already fired by the time fetch resolves).
       ════════════════════════════════════════════════════════════════ -->
  <script>
    (function(){
      var mount   = document.getElementById('mega-nav-mount');
      var errBox  = document.getElementById('mega-nav-error');

      function showError(msg){
        errBox.style.display = 'block';
        errBox.textContent = 'Mega nav loader: ' + msg;
        console.error('[mega-nav]', msg);
      }

      fetch('mega-nav.html', { cache: 'no-cache' })
        .then(function(r){
          if(!r.ok) throw new Error('HTTP ' + r.status + ' fetching mega-nav.html');
          return r.text();
        })
        .then(function(html){
          // Strip the leading HTML comment header so only the <nav>...</nav> ends up in the DOM.
          var start = html.indexOf('<nav');
          mount.innerHTML = start > 0 ? html.slice(start) : html;

          // Append mega-nav.js. The IIFE inside will query .cc-link successfully
          // because the nav is already in the DOM at this point.
          var s = document.createElement('script');
          s.src = 'mega-nav.js';
          s.onload = function(){
            // mega-nav.js attaches a DOMContentLoaded listener for initial state.
            // That event has already fired on this page, so we replay it manually:
            try {
              if(typeof updateCrownProgress === 'function') updateCrownProgress(300);
              var firstTreat = document.querySelector('.calc-treat');
              if(firstTreat){
                firstTreat.classList.add('is-active');
                firstTreat.style.borderColor = 'var(--g)';
                firstTreat.style.background  = 'var(--gll)';
              }
            } catch(e){ console.warn('[mega-nav] init replay:', e); }
          };
          s.onerror = function(){ showError('Failed to load mega-nav.js. Confirm it sits beside load-nav.html.'); };
          document.body.appendChild(s);
        })
        .catch(function(err){
          showError(err.message + '. Confirm mega-nav.html sits beside load-nav.html. ' +
                    'Note: fetch() requires the page to be served over http(s) — opening load-nav.html ' +
                    'directly via file:// will be blocked by most browsers.');
        });
    })();
  </script>

</body>
</html>
