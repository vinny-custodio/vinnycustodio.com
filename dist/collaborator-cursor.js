(() => {
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const regions=[...document.querySelectorAll('.brand-marquee,.home-page .about-section')];
  if(!regions.length)return;
  const cursor=document.createElement('div');cursor.className='collaborator-cursor';cursor.setAttribute('aria-hidden','true');
  cursor.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="M2 2L21 10.5L12 13L9.5 22L2 2Z" fill="currentColor" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg><span></span>';
  document.body.append(cursor);
  const label=cursor.querySelector('span');
  let x=0,y=0,pending=false,hasPointer=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const prompts=['See more about','Get to know','Explore','Take a closer look at','Discover','Go behind the design of'];
  const reelLabels=new WeakMap();
  let promptBag=[],lastPrompt='',labelWidth=220;
  function reelLabel(region){
    if(!reelLabels.has(region)){
      if(!promptBag.length){
        promptBag=[...prompts];
        for(let i=promptBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[promptBag[i],promptBag[j]]=[promptBag[j],promptBag[i]]}
        if(promptBag.at(-1)===lastPrompt)[promptBag[0],promptBag[promptBag.length-1]]=[promptBag.at(-1),promptBag[0]];
      }
      lastPrompt=promptBag.pop();
      reelLabels.set(region,`${lastPrompt} ${region.dataset.reelName}`);
    }
    return reelLabels.get(region);
  }
  let currentRegion=null,settleTimer;
  function paint(){
    pending=false;
    const target=hasPointer&&fine.matches?document.elementFromPoint(x,y):null;
    const region=target?.closest('[data-reel-case],.brand-marquee,.home-page .about-section');
    const show=Boolean(region)&&(region.matches('[data-reel-case]')||!target.closest('a,button,input,select,textarea,summary'));
    cursor.classList.toggle('is-visible',show);
    regions.forEach(r=>r.classList.toggle('has-collaborator-cursor',show&&r===region));
    if(!show){currentRegion=null;return;}
    if(region!==currentRegion){
      const isReel=region.matches('[data-reel-case]');
      label.textContent=isReel?reelLabel(region):region.matches('.brand-marquee')?'Clients I worked with':'10+ years of experience';
      labelWidth=label.offsetWidth+32;
      const card=isReel?document.querySelector(`.project > a[href="${region.dataset.reelCase}/"]`)?.closest('.project'):null;
      const accent=card?getComputedStyle(card).getPropertyValue('--accent').trim():'#5544ff';
      cursor.style.color=accent;
      label.style.background=accent;
      label.style.color=isReel&&region.dataset.reelCase==='everkind'?'#202027':'#fff';
      if(!reduced.matches){
        label.getAnimations().forEach(a=>a.cancel());
        label.animate([{transform:'translateY(8px) scale(.75) rotate(-6deg)'},{transform:'translateY(-2px) scale(1.06) rotate(2deg)',offset:.65},{transform:'translateY(0) scale(1) rotate(0deg)'}],{duration:460,easing:'cubic-bezier(.2,.8,.2,1)'});
      }
      currentRegion=region;
    }
    cursor.style.transform=`translate3d(${x}px,${y}px,0)`;
    cursor.classList.toggle('label-left',x>innerWidth-labelWidth);
    cursor.classList.toggle('label-above',y>innerHeight-70);
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(paint)}}
  document.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;hasPointer=true;
    if(!reduced.matches&&currentRegion){label.style.rotate=`${Math.max(-5,Math.min(5,(event.clientX-x)*.15))}deg`;clearTimeout(settleTimer);settleTimer=setTimeout(()=>{label.style.rotate='0deg'},100)}
    x=event.clientX;y=event.clientY;schedule()},{passive:true});
  document.addEventListener('pointerleave',()=>{hasPointer=false;schedule()});
  addEventListener('blur',()=>{hasPointer=false;schedule()});
  addEventListener('scroll',schedule,{passive:true});
  fine.addEventListener('change',schedule);
})();
