(() => {
  const notch=document.querySelector('.reel-scroll-notch');
  if(!notch)return;
  const arrow=notch.querySelector('svg');
  arrow.classList.add('notch-arrow');
  const surface=document.querySelector('.work-reel-sticky');
  if(!surface)return;
  notch.classList.add('has-liquid-motion');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let stretch=1,velocity=0,frame=0,last=0,previousY=scrollY;
  function paint(){
    const depth=1+Math.tanh(stretch-1)*1.25;
    const y=value=>value*4.5*depth;
    const shoulder=Math.tanh(stretch-1)*42;
    const path=`M-48 -2H${11-shoulder}V0C${24.125-shoulder*.75} 0 ${36.715-shoulder*.4} ${y(1.15893)} ${46-shoulder*.2} ${y(3.22182)}C65.329 ${y(7.51759)} 96.671 ${y(7.51759)} ${116+shoulder*.2} ${y(3.22182)}C${125.285+shoulder*.4} ${y(1.15893)} ${137.875+shoulder*.75} 0 ${151+shoulder} 0H201V-2Z`;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-43.5 0 249 100"><path d="${path}" fill="black"/></svg>`;
    surface.style.setProperty('--reel-notch-mask',`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
    arrow.style.transform=`translateY(${(depth-1)*-20}px) rotate(${velocity*1.8}deg)`;
  }
  function tick(now){
    const dt=Math.min((now-last)/1000,1/30);last=now;
    for(let i=0;i<4;i++){velocity+=((1-stretch)*105-velocity*6.5)*dt/4;stretch+=velocity*dt/4;}
    const moving=Math.abs(velocity)>.005||Math.abs(stretch-1)>.001;
    if(!moving){stretch=1;velocity=0;}
    paint();frame=moving?requestAnimationFrame(tick):0;
  }
  addEventListener('scroll',()=>{
    const delta=scrollY-previousY;previousY=scrollY;
    if(reduced.matches)return;
    const bounds=notch.getBoundingClientRect();
    if(bounds.top>innerHeight||bounds.bottom<0)return;
    velocity=Math.max(-7,Math.min(7,velocity+Math.max(-90,Math.min(90,delta))*.07));
    if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}
  },{passive:true});
  reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;stretch=1;velocity=0;paint()});
  new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  paint();
})();
