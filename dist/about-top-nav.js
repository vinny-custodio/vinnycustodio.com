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
  const mobile=matchMedia('(max-width:760px)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const backgroundState=new Map();
  let closePromise=null,closeTimer=0;
  const hamburger='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14M5 16h14"/></svg>';
  const cross='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  function restoreBackground(){backgroundState.forEach((value,element)=>element.inert=value);backgroundState.clear();}
  function close(restoreFocus=false){
    if(closePromise)return closePromise;
    if(!header.classList.contains('menu-open'))return Promise.resolve();
    header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.innerHTML=hamburger;
    if(mobile.matches){
      header.classList.add('menu-closing');nav.inert=true;
      closePromise=new Promise(resolve=>{closeTimer=setTimeout(()=>{header.classList.remove('menu-closing');document.body.classList.remove('mobile-menu-open');header.removeAttribute('role');header.removeAttribute('aria-modal');header.removeAttribute('aria-label');nav.inert=false;nav.querySelector('details').open=false;restoreBackground();closePromise=null;if(restoreFocus)toggle.focus({preventScroll:true});resolve();},reduced.matches?0:480)});
      return closePromise;
    }
    nav.querySelector('details').open=false;return Promise.resolve();
  }
  window.portfolioCloseMobileMenu=close;
  function open(){
    if(closePromise)return;
    header.classList.add('menu-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');toggle.innerHTML=cross;
    if(mobile.matches){
      document.body.classList.add('mobile-menu-open');header.setAttribute('role','dialog');header.setAttribute('aria-modal','true');header.setAttribute('aria-label','Navigation');
      [...document.body.children].filter(element=>element!==header&&!['SCRIPT','STYLE','LINK'].includes(element.tagName)).forEach(element=>{backgroundState.set(element,element.inert);element.inert=true});
      nav.querySelector('a').focus({preventScroll:true});
    }
  }
  toggle.addEventListener('click',()=>header.classList.contains('menu-open')?close(true):open());
  header.addEventListener('click',event=>{
    const link=event.target.closest('a');if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const target=new URL(link.href);
    if(target.protocol==='mailto:')return;
    if(mobile.matches&&target.origin===location.origin&&!link.target){
      event.preventDefault();
      close().then(()=>{if(target.pathname===location.pathname&&target.hash){document.querySelector(target.hash)?.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});history.replaceState(null,'',target.hash)}else location.href=target.href});
    }else close();
  });
  document.addEventListener('click',event=>{if(!event.composedPath().includes(header))close()});
  header.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();close(true);return;}
    if(event.key==='Tab'&&mobile.matches&&header.classList.contains('menu-open')){
      const focusable=[...header.querySelectorAll('a[href],button,summary')].filter(element=>element.getClientRects().length&&!element.closest('details:not([open])>div'));
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    }
  });
  mobile.addEventListener('change',()=>{clearTimeout(closeTimer);closePromise=null;header.classList.remove('menu-open','menu-closing');document.body.classList.remove('mobile-menu-open');header.removeAttribute('role');header.removeAttribute('aria-modal');header.removeAttribute('aria-label');nav.inert=false;restoreBackground();toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.innerHTML=hamburger;});
})();
