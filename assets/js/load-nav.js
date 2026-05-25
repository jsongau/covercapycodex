fetch('/components/mega-nav.html')
  .then(res => {
    if (!res.ok) throw new Error('Mega nav not found at /components/mega-nav.html');
    return res.text();
  })
  .then(html => {
    const target = document.getElementById('site-nav') || document.getElementById('covercapy-mega-nav');
    if (!target) throw new Error('Missing nav target div. Add <div id="site-nav"></div>');
    target.innerHTML = html;

    const script = document.createElement('script');
    script.src = '/assets/js/mega-nav.js';
    script.defer = true;
    document.body.appendChild(script);
  })
  .catch(err => console.error('CoverCapy mega nav load error:', err));
