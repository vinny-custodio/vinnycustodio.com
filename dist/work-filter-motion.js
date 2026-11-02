// Two spring-driven shapes merge through an SVG alpha threshold.
// Technique reference: https://www.paragon-ui.com/docs/gooey-nav
(() => {
  const group=document.querySelector('.work-filters');
  if(!group)return;
  const buttons=[...group.querySelectorAll('button')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const ns='http://www.w3.org/2000/svg';
  const backgrounds=buttons.map(()=>{const p=document.createElement('span');p.className='work-filter-background';p.setAttribute('aria-hidden','true');group.prepend(p);return p});
  const svg=document.createElementNS(ns,'svg');
  svg.classList.add('work-filter-liquid');svg.setAttribute('aria-hidden','true');
  svg.innerHTML='<defs><filter id="work-filter-liquid-merge" x="-20%" y="-80%" width="140%" height="260%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8"/></filter></defs><g filter="url(#work-filter-liquid-merge)"><rect/><rect/></g>';
  group.prepend(svg);
  const rects=[...svg.querySelectorAll('rect')];
  let frame=0,last=0,target=null,states=[],trailRelease=0;
  let active=group.querySelector('[aria-pressed="true"]');
  function box(button){return {x:button.offsetLeft,y:button.offsetTop,w:button.offsetWidth,h:button.offsetHeight}}
  function paint(){
    states.forEach((s,i)=>{
      const r=rects[i];
      let shape=s;
      if(i===1){
        const lead=states[0],leadCenter=lead.x+lead.w/2;
        const center=s.x+s.w/2;
        const separation=Math.abs(center-leadCenter);
        const amount=Math.min(1,separation/40);
        const w=s.w*(1-.65*amount),h=s.h*(1-.6*amount);
        // Keep the small tail joined to the leading pill's rounded edge.
        const reach=lead.w/2+w*.18;
        const joinedCenter=leadCenter+Math.max(-reach,Math.min(reach,center-leadCenter));
        shape={x:joinedCenter-w/2,y:lead.y+lead.h/2-h/2,w,h};
      }
      for(const [key,attr]of [['x','x'],['y','y'],['w','width'],['h','height']])r.setAttribute(attr,shape[key]);
      r.setAttribute('rx',shape.h/2);
    });
    // Keep labels readable while the liquid is travelling between choices.
    buttons.forEach(button=>{
      const center=button.offsetLeft+button.offsetWidth/2;
      const covered=states.some(s=>center>s.x+12&&center<s.x+s.w-12);
      button.classList.toggle('liquid-covered',covered);
    });
  }
  function measure(){
    cancelAnimationFrame(frame);frame=0;trailRelease=0;
    buttons.forEach((button,i)=>{const b=box(button),p=backgrounds[i];p.style.width=b.w+'px';p.style.height=b.h+'px';p.style.transform='translate('+b.x+'px,'+b.y+'px)'});
    // Keep the SVG sized to the pills, never its own overflowing filter bounds.
    const paddingRight=parseFloat(getComputedStyle(group).paddingRight)||0;
    svg.style.width=Math.max(group.clientWidth,...buttons.map(button=>button.offsetLeft+button.offsetWidth+paddingRight))+'px';
    svg.style.height=group.clientHeight+'px';
    target=box(active);
    states=[0,1].map(()=>({...target,vx:0,vy:0,vw:0,vh:0}));
    paint();
  }
  function tick(now){
    const dt=Math.min((now-last)/1000,1/30);last=now;
    let moving=false;
    states.forEach((s,i)=>{
      // Geometry narrows the trailing shape in paint, without changing the spring.
      if(i===1 && now<trailRelease){
        moving=true;return;
      }
      const stiffness=i?330:420,damping=i?36:36,mass=i?.85:.7;
      // Small integration steps keep the critically damped movement stable.
      for(let j=0;j<4;j++)for(const key of ['x','y','w','h']){
        const v='v'+key,step=dt/4;
        s[v]+=((target[key]-s[key])*stiffness-damping*s[v])/mass*step;
        s[key]+=s[v]*step;
      }
      for(const key of ['x','y','w','h'])if(Math.abs(target[key]-s[key])>.05||Math.abs(s['v'+key])>.1)moving=true;
    });
    if(!moving)states=states.map(()=>({...target,vx:0,vy:0,vw:0,vh:0}));
    paint();
    frame=moving?requestAnimationFrame(tick):0;
  }
  group.addEventListener('click',event=>{
    const next=event.target.closest('button');
    if(!buttons.includes(next)||next===active)return;
    active=next;target=box(next);trailRelease=performance.now()+65;
    if(reduced.matches){measure();return;}
    if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}
  });
  new ResizeObserver(measure).observe(group);
  document.fonts?.ready.then(measure);
  reduced.addEventListener('change',measure);
  measure();
})();
