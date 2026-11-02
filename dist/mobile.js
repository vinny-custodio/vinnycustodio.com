(() => {
  const nav = document.querySelector('.hero-top-nav');
  if (!nav) return;
  const button = document.createElement('button');
  button.className = 'mobile-menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-label', 'Open navigation');
  button.setAttribute('aria-expanded', 'false');
  nav.id = 'hero-mobile-navigation';
  button.setAttribute('aria-controls', nav.id);
  button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 8h14M5 16h14"/></svg>';
  nav.before(button);
  function close() {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('mobile-menu-open');
  }
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('mobile-menu-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a,button')) close(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !button.contains(event.target)) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('mobile-menu-open')) { close(); button.focus(); } });
  addEventListener('scroll', () => { if (scrollY > 100) close(); }, {passive:true});
})();
