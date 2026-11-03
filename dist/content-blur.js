(() => {
  if(window.portfolioContentBlur)return;
  window.portfolioContentBlur=true;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const seen=new WeakSet(),animated=new WeakSet();
  function reveal(target){
    if(animated.has(target)||(target.matches('.project')&&(target.hidden||target.getAttribute('aria-hidden')==='true')))return;
    if(target.matches('.project')){const bounds=target.getBoundingClientRect();if(bounds.bottom<0||bounds.top>innerHeight||bounds.right<0||bounds.left>innerWidth)return;}
    const surface=target.matches('.project')?target.querySelector(':scope > a'):target;if(!surface)return;
    animated.add(target);observer.unobserve(target);
    const animation=surface.animate([{filter:'blur(7px)'},{filter:'blur(0px)'}],{duration:850,easing:'cubic-bezier(.2,.7,.2,1)'});animation.onfinish=()=>animation.cancel();
  }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(!isIntersecting)return;
      reveal(target);
    });
  },{threshold:0,rootMargin:'0px 0px -24px 0px'});
  const selector='.project,.hire-offer,.case-image,.case-animation,.case-body main h1,.case-body main h2,.case-body main p,.about-page main img';
  function scan(root=document){
    const elements=[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
    elements.forEach(element=>{
      if(seen.has(element)||element.closest('.work-reel,.project-info')||(element.matches('.project')&&matchMedia('(max-width:760px)').matches))return;
      seen.add(element);observer.observe(element);
    });
  }
  scan();
  // Reel counters and other changing text must not trigger full-page rescans.
  const mutations=new MutationObserver(records=>records.forEach(record=>{if(record.type==='attributes'){if(record.target.matches('.project')&&record.target.getAttribute('aria-hidden')==='false')reveal(record.target);return;}record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)})}));
  mutations.observe(document.querySelector('main')||document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-hidden']});
})();
