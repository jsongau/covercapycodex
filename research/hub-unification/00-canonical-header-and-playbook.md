# CoverCapy Hub Unification — Canonical Header System and Rollout Playbook

Updated June 2026. Source of truth for the shared header, sub-nav, breadcrumb, and footer
across every dental-insurance hub page (plan pages, guides, situational guides, glossary terms,
the di hub, and the compare page).

---

## 1. Packaging decision (and why)

**Approach chosen: a shared component file `components/hub-subnav.html`, mounted by the same
universal loader that already mounts `components/mega-nav.html` and `components/footer.html`.**

Why this over a copy-pasted inline block:

- The sub-nav CSS already lives in a shared stylesheet, `assets/css/hub-theme.css` (it defines the
  gold/jade tokens, `.toc` sticky bar, `.toc-prog` meter, `.toc-dd` dropdowns, the `.theme-switch`
  pill, and the divider-less `.crumb`). So the only thing that was being copy-pasted page to page
  was the sub-nav HTML plus ~80 lines of dropdown/theme/scroll JS. Extracting that into one mounted
  partial gives a single source of truth with zero per-page JS.
- The loader already replays inline `<script>` tags from injected partials (that is how
  `mega-nav.js` boots), so the partial can carry its own behaviour. The script is wrapped in an
  idempotent IIFE (`window.__ccHubSubnavInit` guard) so a double-mount cannot double-bind.
- It reuses the exact loader the compare page uses (the known-good one), so footer + nav + sub-nav
  all load through one tested path.

**Two shared files are the whole system:**

| File | Role |
|------|------|
| `assets/css/hub-theme.css` | All CSS: gold/jade tokens, `.toc` (sticky), `.toc-prog`, `.toc-dd` dropdowns, `.theme-switch`, `.crumb` breadcrumb. Already present, already shared. |
| `components/hub-subnav.html` | The sticky sub-nav HTML + its dropdown/theme/scroll JS. **New, the single source of truth.** |

The sub-nav links are GENERAL dental-insurance hub links (Compare, Plans, Explore, By Treatment,
By Situation, Insurance Terms) pointing at real absolute URLs that exist on disk. They are identical
on every page. **Only the per-page `.crumb` breadcrumb trail changes.**

---

## 2. The two sticky bars ("2x sticky")

1. **Mega-nav** (`components/mega-nav.html`) pins at the very top.
2. **Hub sub-nav** (`components/hub-subnav.html`) pins directly below it.
   `hub-theme.css` does this with `.toc{position:sticky;top:71px;...}` (drops to `top:67px` under
   1080px). The green scroll meter `.toc-prog` rides the top edge of this bar.

The breadcrumb `.crumb` is NOT sticky — it scrolls away under the two pinned bars. It is
divider-less by design (`hub-theme.css .crumb{...}` has no top border; the old `.bc` book-plate
breadcrumb with the gold divider is removed).

---

## 3. How to drop the canonical system into ANY hub/guide/plan/glossary page

### 3a. In `<head>` — required stylesheets

```html
<link rel="stylesheet" href="/assets/css/mega-nav.css">
<link rel="stylesheet" href="/assets/css/mega-nav-mobile.css">
<link rel="stylesheet" href="/assets/css/footer.css">
<link rel="stylesheet" href="/assets/css/hub-theme.css">
```

Keep the page on `<html lang="en" data-theme="gold">` — the sub-nav boots GOLD then slow-flips to
JADE ~1s after load (handled inside the partial).

GA tag (already standard sitewide):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XNBPGSZ1LZ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XNBPGSZ1LZ');</script>
```

### 3b. In `<body>` — the three mounts come FIRST, in order

```html
<body>
<div id="cc-nav-mount"></div>
<div id="cc-hub-subnav-mount"></div>
<!-- per-page breadcrumb: only this line changes page to page -->
<div class="crumb"><div class="wrap">
  <a href="https://www.covercapy.com/">Home</a> /
  <a href="https://www.covercapy.com/dental-insurance/">Dental insurance</a> /
  <span>This page title</span>
</div></div>

<!-- ... page body / main content ... -->
```

### 3c. Footer mount + the working loader — place BOTH just before `</body>`, mount BEFORE loader

```html
<div id="cc-footer-mount"></div>
<script>
(function(){
  var components=[
    {mountId:'cc-nav-mount',         html:'/components/mega-nav.html',  script:'/assets/js/mega-nav.js'},
    {mountId:'cc-hub-subnav-mount',  html:'/components/hub-subnav.html', script:null},
    {mountId:'cc-footer-mount',      html:'/components/footer.html',     script:'/assets/js/footer.js'}
  ];
  var loadScript=function(src){return new Promise(function(resolve){
    if(!src||document.querySelector('script[src="'+src+'"]'))return resolve();
    var s=document.createElement('script');s.src=src;s.defer=true;s.onload=function(){resolve()};s.onerror=function(){resolve()};
    document.body.appendChild(s);
  });};
  var replayScripts=function(scripts){scripts.forEach(function(old){
    if(!old.parentNode)return;
    var fresh=document.createElement('script');
    for(var i=0;i<old.attributes.length;i++)fresh.setAttribute(old.attributes[i].name,old.attributes[i].value);
    fresh.textContent=old.textContent;
    old.parentNode.replaceChild(fresh,old);
  });};
  var injectComponent=async function(c){
    var mount=document.getElementById(c.mountId);if(!mount)return;
    try{
      var res=await fetch(c.html,{cache:'no-cache'});
      if(!res.ok)throw new Error(c.html+' '+res.status);
      var wrapper=document.createElement('div');wrapper.innerHTML=await res.text();
      var injected=Array.from(wrapper.querySelectorAll('script'));
      var parent=mount.parentNode;
      while(wrapper.firstChild)parent.insertBefore(wrapper.firstChild,mount);
      parent.removeChild(mount);
      replayScripts(injected);
    }catch(e){console.warn('[CoverCapy loader]',c.html,e);}
  };
  var init=async function(){
    for(var i=0;i<components.length;i++)await injectComponent(components[i]);
    for(var i=0;i<components.length;i++)await loadScript(components[i].script);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
</script>
</body>
```

### 3d. What to REMOVE from each old page

- The dark `.di-hub` "Dental Insurance" pill bar and its CSS.
- Any second bespoke `<nav>` (e.g. the dark teal "CoverCapy / Find a Dentist / Compare Plans" bar).
- The old `.bc` book-plate breadcrumb (with the gold divider) — replace with the divider-less `.crumb`.
- Any inline copies of the toc dropdown JS, the Gold/Jade theme JS, and the standalone inline
  nav-loader / footer-loader IIFEs — all of that now lives in `components/hub-subnav.html` and the
  single universal loader.
- Any duplicate footer mount.

---

## 4. The footer bug (cause + fix)

**Symptom:** the footer did not render on the guide pages (e.g. `guides/between-jobs/index.html`).

**Cause:** ordering. In `between-jobs`, the universal loader script ran near the end of `<body>`,
but `<div id="cc-footer-mount"></div>` was placed AFTER the loader script. The loader calls
`init()` immediately when `document.readyState !== 'loading'` (which it is, by the time an inline
script that late in the body executes). At that instant `document.getElementById('cc-footer-mount')`
returns `null` because the mount had not yet been parsed, so `injectComponent` returned early and
the footer was never fetched. The nav loaded fine only because its mount sat ABOVE the loader.

The working pages (compare page, glossary `in-network`) put every mount BEFORE the loader, so the
element exists when `init()` runs.

**Fix (now the canonical rule):** every mount div — nav, hub-subnav, footer — must appear in the
DOM BEFORE the loader `<script>`. In `between-jobs` the footer mount was relocated from after the
loader to immediately before it. The canonical system enforces this ordering.

---

## 5. Files changed in this pass

- **Added** `components/hub-subnav.html` — the shared sticky sub-nav partial (HTML + dropdown/theme/scroll JS).
- **Edited** `guides/glossary/in-network/index.html` — swapped the inline toc for the mount,
  `.bc` -> `.crumb` (divider-less), replaced the inline theme/dropdown/nav/footer scripts with the
  single universal 3-component loader.
- **Edited** `guides/between-jobs/index.html` — removed `.di-hub` bar + the bespoke dark `<nav>`,
  added the canonical mount + `.crumb`, linked `hub-theme.css` + `footer.css`, relocated the footer
  mount before the loader (footer-bug fix), replaced bespoke theme/loader JS with the universal loader.
- `compare-ppo-dental-plans.html` and `find-my-dentist.html` were NOT modified (reference + app pages).

---

## 6. Rollout playbook for the remaining pages

Apply section 3 to each page below. The sub-nav and loader are byte-identical everywhere; only the
`.crumb` trail differs. Spot-check each page after: footer renders, both bars sticky, theme flips
gold -> jade, exactly one `<h1>`.

| Group | Count | Path pattern | Breadcrumb trail (`.crumb`) |
|-------|-------|--------------|------------------------------|
| Dental-insurance hub | 1 | `/dental-insurance/index.html` | Home / Dental insurance |
| Plan pages | 9 | `/dental-insurance/ppo-plans/<carrier>/` | Home / Dental insurance / PPO plans / <Carrier plan> |
| Top guides | 9 | `/guides/<topic>/` (implants, crowns, root-canals, dentures, braces-invisalign, whitening, no-waiting-period, immediate-coverage, ...) | Home / Dental insurance / Guides / <Topic> |
| Situational guides | 11 | `/guides/<situation>/` (between-jobs done, self-employed, ...) | Home / Dental insurance / Guides / <Situation> |
| Glossary terms | 23 | `/guides/glossary/<term>/` (in-network done, ...) | Home / Dental insurance / Glossary / <Term> |

Recommended order: glossary terms first (smallest, most uniform — clone the `in-network` pattern),
then plan pages, then guides. Batch with a script that (a) ensures the four head stylesheets,
(b) replaces any `.di-hub`/`.bc`/inline-toc/bespoke-nav with the mount + `.crumb`, (c) ensures the
footer mount precedes the single universal loader, (d) drops inline theme/dropdown/loader JS.

### Validation gate (run on every page before shipping)
- `python3 -c "import json; json.loads(<each ld+json block>)"` — JSON-LD parses.
- `node -e "new Function(<each inline script>)"` — inline JS parses.
- Exactly one `<h1>`.
- Grep `position:sticky` resolves (via `hub-theme.css`), both `cc-nav-mount` and
  `cc-hub-subnav-mount` and `cc-footer-mount` present and ordered before the loader.
- No em-dashes in copy. www host + trailing slashes in `.crumb` links. URLs built from parts.

Do NOT hand-edit anything under `dental/` (generated). This system is for the static hub/guide/
plan/glossary pages only.
