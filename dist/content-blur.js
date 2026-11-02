(() => {
  if(window.portfolioContentBlur)return;
  window.portfolioContentBlur=true;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const seen=new WeakSet();
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(!isIntersecting)return;
      observer.unobserve(target);
      // Animate only the contents, leaving scroll-driven card transforms untouched.
      const surface=target.matches('.project')?target.querySelector(':scope > a'):target;
      if(!surface)return;
      const animation=surface.animate([{filter:'blur(7px)'},{filter:'blur(0px)'}],{duration:850,easing:'cubic-bezier(.2,.7,.2,1)'});
      animation.onfinish=()=>animation.cancel();
    });
  },{threshold:0,rootMargin:'0px 0px -24px 0px'});
  const selector='.project,.hire-offer,.case-image,.case-animation,.case-body main h1,.case-body main h2,.case-body main p,.about-page main img';
  function scan(root=document){
    const elements=[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
    elements.forEach(element=>{
      if(seen.has(element)||element.closest('.work-reel,.project-info'))return;
      seen.add(element);observer.observe(element);
    });
  }
  scan();
  // Reel counters and other changing text must not trigger full-page rescans.
  const mutations=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)})));
  mutations.observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
})();
