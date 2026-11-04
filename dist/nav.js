(() => {
  document.body.dataset.navMode='bottom';
  const script = document.currentScript;
  const root = new URL('./', script.src);
  const href = (path = '') => new URL(path, root).href;
  const inDrawer = new URLSearchParams(location.search).has('drawer');
  const emailAddress = 'hello@vinnycustodio.com';
  const blurScript=document.createElement('script');
  blurScript.src=href('content-blur.js?v=5');document.head.append(blurScript);
  const iconScript = document.createElement('script');
  iconScript.src = href('iconoir-icons.js?v=2');
  document.head.append(iconScript);

  function showCopyToast(message='Email copied',detail=emailAddress,icon='✓') {
    let toast = document.querySelector('[data-copy-toast]');
    if (!toast) {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="copy-toast" data-copy-toast role="status" aria-live="polite">
          <span class="copy-toast-icon" aria-hidden="true">✓</span>
          <span><strong>Email copied</strong><small>${emailAddress}</small></span>
          <i class="copy-spark copy-spark-1" aria-hidden="true"></i>
          <i class="copy-spark copy-spark-2" aria-hidden="true"></i>
          <i class="copy-spark copy-spark-3" aria-hidden="true"></i>
        </div>`);
      toast = document.querySelector('[data-copy-toast]');
    }
    toast.querySelector('strong').textContent=message;
    toast.querySelector('small').textContent=detail;
    toast.querySelector('.copy-toast-icon').textContent=icon;
    const dock = document.querySelector('[data-app-nav]');
    const mobile=matchMedia('(max-width:760px)').matches;
    toast.classList.toggle('toast-mobile',mobile);
    toast.classList.remove('toast-detached');
    if(mobile){
      toast.classList.remove('toast-above');
      ['left','right','bottom','height'].forEach(property=>toast.style.removeProperty(property));
      dock?.style.setProperty('--toast-shift','0px');
      const detached=!dock||document.body.classList.contains('nav-before-reel')||document.body.classList.contains('mobile-menu-open');
      toast.classList.toggle('toast-detached',detached);
      (detached?document.body:dock).append(toast);
    }else if (dock) {
      dock.append(toast);
      const bounds = dock.getBoundingClientRect();
      const width = toast.offsetWidth;
      const overlap=48;
      const combinedWidth=bounds.width+width-overlap;
      const fitsRight=combinedWidth<=innerWidth-24;
      const shift=fitsRight ? (width-overlap)/2 : 0;
      dock.style.setProperty('--toast-shift',`${-shift}px`);
      toast.style.left = fitsRight ? 'calc(100% - 48px)' : 'auto';
      toast.style.right = fitsRight ? 'auto' : '0';
      toast.style.bottom = fitsRight ? '-1px' : 'calc(100% + 10px)';
      toast.style.height = `${dock.offsetHeight}px`;
      toast.classList.toggle('toast-above',!fitsRight);
    }
    toast.classList.remove('is-showing');
    void toast.offsetWidth;
    toast.classList.add('is-showing');
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(() => {
      toast.classList.remove('is-showing');
      dock?.style.setProperty('--toast-shift','0px');
    }, 2600);
  }

  async function copyEmail(source) {
    try {
      await navigator.clipboard.writeText(emailAddress);
    } catch {
      const input = document.createElement('textarea');
      input.value = emailAddress;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.append(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    const topContact=source?.closest('.hero-top-contact');
    if(topContact){
      let confirmation=topContact.querySelector('.top-email-confirmation');
      if(!confirmation){confirmation=document.createElement('div');confirmation.className='top-email-confirmation';confirmation.setAttribute('role','status');confirmation.setAttribute('aria-live','polite');confirmation.innerHTML='<div><p><span aria-hidden="true">✓</span> Email copied</p></div>';topContact.querySelector('.top-contact-options').append(confirmation)}
      requestAnimationFrame(()=>confirmation.classList.add('is-showing'));
      clearTimeout(confirmation.hideTimer);confirmation.hideTimer=setTimeout(()=>confirmation.classList.remove('is-showing'),2600);
    }else showCopyToast();
  }

  document.addEventListener('click', (event) => {
    const emailLink = event.target.closest('a[href^="mailto:"]');
    if (!emailLink) return;
    event.preventDefault();
    copyEmail(emailLink);
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.setAttribute('title', `Copy ${emailAddress}`);
  });

  document.querySelector('.page-header, .case-header')?.remove();
  document.querySelector('[data-nav-collapse]')?.remove();
  function applyTheme(theme) {
    if(document.body.classList.contains('about-page'))theme='dark';
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-option]').forEach(button => {
      const selected = button.dataset.themeOption === theme;
      button.setAttribute('aria-checked', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }
  applyTheme(localStorage.getItem('portfolio-theme') || 'light');
  addEventListener('storage', event => { if (event.key === 'portfolio-theme') applyTheme(event.newValue || 'light'); });
  if (inDrawer) return;
  const footer=document.querySelector('footer');
  if(footer){
    footer.className='site-footer';
    footer.innerHTML=`<h2>From scrappy ideas<br>to polished craft.</h2><p class="footer-copy">I work across SaaS, apps, and websites, shaping the strategy, system, and interface into one coherent product.</p><a class="footer-email" href="mailto:${emailAddress}">${emailAddress} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a><div class="footer-meta"><p>Based in Halifax, Canada</p><div><a href="https://www.linkedin.com/in/vinnycustodio/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://dribbble.com/vinnycustodio" target="_blank" rel="noreferrer">Dribbble ↗</a><a href="${href('styleguide.html')}">Styleguide</a></div><p>© ${new Date().getFullYear()} Vinny Custodio</p></div>`;
  }

  document.querySelector('.site-footer .footer-meta>div')?.insertAdjacentHTML('afterbegin', `<a href="${href('hire-me/')}">Mentorship</a>`);
  if (!document.querySelector('[data-app-nav]')) {
    document.body.insertAdjacentHTML('afterbegin', `
      <aside class="app-nav" data-app-nav aria-label="Portfolio navigation">
        <a class="vinny-logo" href="${href('#top')}" aria-label="Vinny Custodio, home"><span class="vinny-logo-short">Vny</span><span class="vinny-logo-full">Vinny Custodio</span></a>
        <nav class="nav-primary" aria-label="Primary navigation">
          <a href="${href('#work')}" data-nav-link="work" aria-label="Selected work" data-tooltip="Selected work"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 4v5"/></svg><span>Work</span></a>
          <a href="${href('about-me/')}" data-nav-link="about" aria-label="About me" data-tooltip="About me"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><span>About</span></a>
        </nav>
        <a class="nav-contact" href="mailto:hello@vinnycustodio.com" aria-label="Start a conversation" data-tooltip="Start a conversation"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H4zM4 7l8 6 8-6"/></svg><span>Start a conversation</span></a>
        <div class="nav-mode-control" aria-label="Navigation layout"><p>Navigation</p><div>
          <button type="button" data-nav-mode="side" aria-label="Use sidebar navigation" data-tooltip="Sidebar"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/></svg></button>
          <button type="button" data-nav-mode="bottom" aria-label="Use floating bottom navigation" data-tooltip="Floating dock"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 16h10"/></svg></button>
          <button type="button" data-nav-mode="top" aria-label="Use standard top navigation" data-tooltip="Top bar"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/></svg></button>
        </div></div>
      </aside>`);
  }

  document.querySelector('[data-app-nav]').insertAdjacentHTML('beforeend', `<button class="theme-toggle" data-theme-toggle type="button" aria-label="Switch to dark mode" aria-pressed="false"><svg class="theme-moon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z"/></svg><svg class="theme-sun" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg></button>`);
  applyTheme(localStorage.getItem('portfolio-theme') || 'light');
  const oldToggle = document.querySelector('[data-theme-toggle]');
  const sun = oldToggle.querySelector('.theme-sun').outerHTML;
  const moon = oldToggle.querySelector('.theme-moon').outerHTML;
  oldToggle.outerHTML = `<div class="theme-tabs" role="radiogroup" aria-label="Color theme"><button type="button" role="radio" data-theme-option="light" aria-label="Light mode" title="Light mode">${sun}</button><button type="button" role="radio" data-theme-option="dark" aria-label="Dark mode" title="Dark mode">${moon}</button></div>`;
  applyTheme(localStorage.getItem('portfolio-theme') || 'light');
  function chooseTheme(theme) {
    if(document.body.classList.contains('about-page')){showCopyToast('Cozy. Dark only.','Keeping the lights low.','💡');return;}
    const tabs = document.querySelector('.theme-tabs');
    const changed = document.documentElement.dataset.theme !== theme;
    if (changed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tabs.classList.remove('is-melting');
      void tabs.offsetWidth;
      tabs.classList.add('is-melting');
      clearTimeout(tabs.meltTimer);
      tabs.meltTimer=setTimeout(()=>tabs.classList.remove('is-melting'),650);
    }
    localStorage.setItem('portfolio-theme', theme);applyTheme(theme);
    document.querySelectorAll('iframe[data-drawer-frame]').forEach(frame => {try {frame.contentDocument.documentElement.dataset.theme=theme;} catch (_) {}});
  }
  document.querySelectorAll('[data-theme-option]').forEach(button => {
    button.addEventListener('click', () => chooseTheme(button.dataset.themeOption));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const theme = event.key === 'Home' ? 'light' : event.key === 'End' ? 'dark' : button.dataset.themeOption === 'light' ? 'dark' : 'light';
      chooseTheme(theme);document.querySelector(`[data-theme-option="${theme}"]`).focus();
    });
  });
  const contactLink = document.querySelector('.nav-contact');
  if (contactLink) {
    const contact = document.createElement('div');
    contact.className = 'contact-dropdown';
    contactLink.replaceWith(contact);
    contact.innerHTML = `<button type="button" class="nav-contact" data-contact-trigger aria-expanded="false" aria-controls="contact-options">${contactLink.querySelector('svg').outerHTML}<span>Get in contact</span></button><div class="contact-options" id="contact-options" inert><a href="mailto:${emailAddress}"><span>Copy email</span><small>${emailAddress}</small></a><a href="https://www.linkedin.com/in/vinnycustodio/" target="_blank" rel="noopener noreferrer"><span>LinkedIn ↗</span><small>Connect with me</small></a></div>`;
    const trigger=contact.querySelector('button'),options=contact.querySelector('.contact-options');
    function setOpen(open){contact.classList.toggle('is-open',open);trigger.setAttribute('aria-expanded',String(open));options.inert=!open;}
    trigger.addEventListener('click',()=>setOpen(trigger.getAttribute('aria-expanded')!=='true'));
    contact.querySelectorAll('.contact-options a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
    document.addEventListener('click',event=>{if(!contact.contains(event.target))setOpen(false)});
    contact.addEventListener('keydown',event=>{if(event.key==='Escape'){setOpen(false);trigger.focus()}if(event.key==='ArrowUp'&&event.target===trigger){event.preventDefault();setOpen(true);options.querySelector('a').focus()}});
    contact.addEventListener('focusout',()=>setTimeout(()=>{if(!contact.contains(document.activeElement))setOpen(false)},0));
  }
  document.querySelectorAll('.nav-mode-control,.nav-collapse').forEach(element=>element.remove());

  function setCurrentLink() {
    const path = location.pathname;
    let current = path.includes('/about-me/') ? 'about' : path === root.pathname || path.endsWith('/index.html') && path === `${root.pathname}index.html` ? (location.hash === '#about' ? 'experience' : '') : 'work';
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const active = link.dataset.navLink === current;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
  }

  setCurrentLink();
  function revealWork(){
    const section=document.getElementById('work');if(!section)return;
    window.scrollTo({top:0,behavior:'instant'});
    setTimeout(()=>{section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});history.replaceState(null,'','#work')},450);
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('.about-top-nav a,.app-nav a');
    if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const target=new URL(link.href);if(target.hash!=='#work')return;
    event.preventDefault();event.stopImmediatePropagation();
    const navigate=()=>{if(document.body.classList.contains('home-page'))revealWork();else{sessionStorage.setItem('portfolio-reveal-work','1');location.href=href('#top')}};
    if(window.portfolioCloseMobileMenu)window.portfolioCloseMobileMenu().then(navigate);else navigate();
  },true);
  if(document.body.classList.contains('home-page')&&sessionStorage.getItem('portfolio-reveal-work')){
    sessionStorage.removeItem('portfolio-reveal-work');
    if(document.readyState==='complete')revealWork();else window.addEventListener('load',revealWork,{once:true});
  }
  const primary=document.querySelector('.app-nav .nav-primary');
  if(primary&&!primary.querySelector('[data-nav-link="hire"]'))primary.insertAdjacentHTML('beforeend',`<a href="${href('hire-me/')}" data-nav-link="hire" data-tooltip="Mentorship" aria-label="Mentorship"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m13 2-9 12h7l-1 8 10-12h-8z"/></svg><span>Mentorship</span></a>`);
  if(primary&&!primary.closest('.dock-links')){
    const cluster=document.createElement('div');cluster.className='dock-links';primary.before(cluster);cluster.append(primary);
    const contact=document.querySelector('.app-nav .contact-dropdown');if(contact)cluster.append(contact);
  }
  if(!inDrawer){
    const chatStyle=document.createElement('link');chatStyle.rel='stylesheet';chatStyle.href=href('about-chat.css?v=3');document.head.append(chatStyle);
    const chatScript=document.createElement('script');chatScript.src=href('about-chat.js?v=5');document.head.append(chatScript);
    const sharedStyle=document.createElement('link');sharedStyle.rel='stylesheet';sharedStyle.href=href('about-top-nav.css?v=9');document.head.append(sharedStyle);
    const sharedNav=document.createElement('script');sharedNav.src=href('about-top-nav.js?v=8');document.head.append(sharedNav);
  }
  addEventListener('hashchange', setCurrentLink);
})();
