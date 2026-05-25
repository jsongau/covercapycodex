document.addEventListener('click', function(e){
  const link = e.target.closest('.cc-link');

  document.querySelectorAll('.cc-link').forEach(item => {
    if (item !== link) item.classList.remove('is-open');
  });

  if (link && !e.target.closest('.cc-dropdown')) {
    e.preventDefault();
    link.classList.toggle('is-open');
  }
});
