fetch('/components/mega-nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('site-nav').innerHTML = html;
  });
