const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: .12 });
  reveals.forEach((element) => observer.observe(element));
}

const drawer = document.querySelector('[data-case-drawer]');
const panel = drawer?.querySelector('.case-drawer-panel');
const frame = drawer?.querySelector('[data-drawer-frame]');
const drawerTitle = drawer?.querySelector('[data-drawer-title]');
const drawerTags = drawer?.querySelector('[data-drawer-tags]');
const openPage = drawer?.querySelector('[data-drawer-open]');
let trigger = null;
let triggerCard = null;
let resetTimer;
let motionTimer;

function closeDrawer() {
  if (!drawer?.classList.contains('is-open')) return;
  clearTimeout(motionTimer);
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    if (frame) frame.src = 'about:blank';
    document.body.classList.remove('drawer-open');
    trigger?.focus({ preventScroll: true });
    triggerCard = null;
  }, reducedMotion ? 0 : 1320);
}

function openDrawer(link) {
  if (!drawer || !panel || !frame || !drawerTitle || !openPage) return;
  clearTimeout(resetTimer);
  clearTimeout(motionTimer);
  trigger = link;
  triggerCard = link.closest('.project');

  const target = new URL(link.href, location.href);
  target.searchParams.set('drawer', '1');
  drawerTitle.textContent = link.querySelector('h3')?.textContent || link.ariaLabel || 'Case study';
  if (drawerTags) drawerTags.innerHTML = link.querySelector('.project-tags')?.innerHTML || '';
  frame.onload = () => {
    try {
      const doc=frame.contentDocument;
      const title=doc.querySelector('[data-title]');
      if(!title)return;
      const loadedURL=new URL(frame.contentWindow.location.href);
      const currentCard=[...document.querySelectorAll('.project > a')].find(card=>new URL(card.href).pathname.replace(/\/$/,'')===loadedURL.pathname.replace(/\/$/,''));
      drawerTitle.textContent=title.textContent;
      const cardTags=currentCard?.querySelector('.project-tags');
      if(cardTags){
        doc.querySelector('.case-header-tags')?.remove();
        const tags=doc.createElement('div');tags.className='case-header-tags';
        tags.innerHTML=cardTags.innerHTML;
        title.before(tags);
      }
      if(drawerTags)drawerTags.innerHTML=doc.querySelector('.case-header-tags')?.innerHTML || '';
      loadedURL.searchParams.delete('drawer');
      openPage.href=loadedURL.href;
    } catch (_) {}
  };
  openPage.href = link.href;
  frame.src = target.href;
  drawer.setAttribute('aria-hidden', 'false');
  if(triggerCard&&!reducedMotion){
    link.animate([
      {scale:'1',offset:0},
      {scale:'.985',offset:.3},
      {scale:'1',offset:1}
    ],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  motionTimer = setTimeout(() => {document.body.classList.add('drawer-open');drawer.classList.add('is-open')}, reducedMotion ? 0 : 130);
  setTimeout(() => {if(drawer.classList.contains('is-open'))drawer.querySelector('.case-drawer-panel [data-drawer-close]')?.focus({ preventScroll: true })}, reducedMotion ? 0 : 1500);
}
document.addEventListener('click',event=>{
  const link=event.target.closest('[data-reel-case]');
  if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  if(!drawer)return;
  event.preventDefault();openDrawer(link);
});

document.querySelectorAll('.project > a').forEach((link) => link.addEventListener('click', (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openDrawer(link);
}));

drawer?.querySelectorAll('[data-drawer-close]').forEach((button) => button.addEventListener('click', closeDrawer));
addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeDrawer();
});

addEventListener('message', (event) => {
  if (event.origin !== location.origin || !drawer?.classList.contains('is-open')) return;
  if (event.data?.type === 'close-case-drawer') closeDrawer();
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
