async function loadNav() {
  const navMount = document.querySelector("[data-mega-nav]");

  if (!navMount) return;

  const response = await fetch("/components/mega-nav.html");

  if (!response.ok) {
    console.error("Could not load mega nav:", response.status);
    return;
  }

  navMount.innerHTML = await response.text();

  const script = document.createElement("script");
  script.src = "/assets/js/mega-nav.js";
  script.defer = true;
  document.body.appendChild(script);
}

loadNav();
