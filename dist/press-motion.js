(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const selector = 'button:not(.case-drawer-backdrop), .nav-primary a, .nav-contact, .hero-action, .hero-contact';
  const animations = new WeakMap();
  function animate(element, release) {
    if (element.closest('.work-filters')) return;
    if (reduced.matches || !element.animate) return;
    const current = getComputedStyle(element).scale;
    animations.get(element)?.cancel();
    if(element.matches('.nav-contact')){
      const animation=element.animate([{scale:current==='none'?'1':current},{scale:release?'1':'.98'}],{duration:release?200:110,easing:'ease-out',fill:release?'none':'forwards'});
      animations.set(element,animation);return;
    }
    const animation = element.animate(release ? [
      {scale:current === 'none' ? '.96' : current, offset:0},
      {scale:'1.045', offset:.42},
      {scale:'.992', offset:.72},
      {scale:'1', offset:1},
    ] : [{scale:'1'},{scale:'.955'}], {
      duration:release ? 430 : 110,
      easing:release ? 'cubic-bezier(.2,.7,.25,1)' : 'ease-out',
      fill:release ? 'none' : 'forwards',
    });
    animations.set(element, animation);
  }
  let pressed = null;
  document.addEventListener('pointerdown', event => {
    if(event.button !== 0) return;
    pressed=event.target.closest(selector);
    if(pressed) animate(pressed,false);
  });
  function release(){if(pressed){animate(pressed,true);pressed=null;}}
  document.addEventListener('pointerup',release);
  document.addEventListener('pointercancel',release);
  addEventListener('blur',release);
  document.addEventListener('keydown', event => {
    if(event.repeat || !['Enter',' '].includes(event.key))return;
    const element=event.target.closest(selector);
    if(element)animate(element,false);
  });
  document.addEventListener('keyup', event => {
    if(!['Enter',' '].includes(event.key))return;
    const element=event.target.closest(selector);
    if(element)animate(element,true);
  });
})();
