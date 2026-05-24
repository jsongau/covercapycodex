fetch('/components/mega-nav.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('site-nav').innerHTML = html;
  });
