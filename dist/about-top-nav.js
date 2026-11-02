(() => {
  if(document.querySelector('.about-top-nav'))return;
  const root=new URL('./',document.currentScript.src);
  const href=path=>new URL(path,root).href;
  document.querySelector('.hero-identity')?.remove();
  const header=document.createElement('header');header.className='about-top-nav';
  const logo=document.querySelector('.app-nav .vinny-logo').cloneNode(true);
  logo.classList.add('top-brand-logo');
  logo.setAttribute('aria-label','Vinny Custodio, home');
  const brand=document.createElement('div');brand.className='about-top-brand';
  if(logo){logo.href=href('#top');brand.append(logo)}
  brand.insertAdjacentHTML('beforeend','<span>Product designer</span>');header.append(brand);
  const toggle=document.createElement('button');toggle.className='about-menu-toggle';toggle.type='button';toggle.setAttribute('aria-label','Open navigation');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','about-top-links');toggle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14M5 16h14"/></svg>';header.append(toggle);
  const nav=document.createElement('nav');nav.id='about-top-links';nav.setAttribute('aria-label','Top navigation');
  nav.innerHTML=`<a href="${href('#work')}">Work</a><a href="${href('about-me/')}">About</a><a href="${href('hire-me/')}">Mentorship</a><details><summary>Get in contact</summary><div><a href="mailto:hello@vinnycustodio.com">Copy email</a><a href="https://www.linkedin.com/in/vinnycustodio/" target="_blank" rel="noopener">LinkedIn ↗</a></div></details>`;header.append(nav);document.body.prepend(header);
  nav.querySelectorAll('a').forEach(link=>{if(new URL(link.href).pathname===location.pathname&&!new URL(link.href).hash)link.setAttribute('aria-current','page')});
  function close(){header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.querySelector('details').open=false}
  toggle.addEventListener('click',()=>{const open=!header.classList.contains('menu-open');header.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close()});
  document.addEventListener('click',event=>{if(!header.contains(event.target))close()});
  header.addEventListener('keydown',event=>{if(event.key==='Escape'){close();toggle.focus()}});
})();
