(() => {
  const notch=document.querySelector('.reel-scroll-notch');
  if(!notch)return;
  const arrow=notch.querySelector('svg');
  arrow.classList.add('notch-arrow');
  const shape=document.createElement('canvas');
  shape.classList.add('notch-liquid');
  shape.setAttribute('aria-hidden','true');
  const ratio=Math.min(devicePixelRatio||1,2);
  shape.width=249*ratio;shape.height=100*ratio;
  const ctx=shape.getContext('2d');
  if(!ctx)return;
  notch.prepend(shape);notch.classList.add('has-liquid-motion');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const sombraImage=new Image();
  sombraImage.src=new URL('assets/sombra-work.svg?v=blue1',document.currentScript.src).href;
  sombraImage.onload=()=>paint();
  let stretch=1,velocity=0,frame=0,last=0,previousY=scrollY;
  function paint(){
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,249,100);
    ctx.translate(48,0);
    const depth=1+Math.tanh(stretch-1)*1.25;
    const y=value=>value*4.5*depth;
    const shoulder=Math.tanh(stretch-1)*42;
    ctx.beginPath();ctx.moveTo(-48,-2);ctx.lineTo(11-shoulder,0);
    ctx.bezierCurveTo(24.125-shoulder*.75,0,36.715-shoulder*.4,y(1.15893),46-shoulder*.2,y(3.22182));
    ctx.bezierCurveTo(65.329,y(7.51759),96.671,y(7.51759),116+shoulder*.2,y(3.22182));
    ctx.bezierCurveTo(125.285+shoulder*.4,y(1.15893),137.875+shoulder*.75,0,151+shoulder,0);
    ctx.lineTo(201,0);ctx.lineTo(201,-2);ctx.closePath();
    ctx.fillStyle=document.documentElement.dataset.theme==='dark' ? getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()||'#111114' : '#fff';
    ctx.fill();
    const glow=document.querySelector('.sombra-work');
    if(glow&&sombraImage.complete&&sombraImage.naturalWidth){
      const bounds=glow.getBoundingClientRect();
      const local=shape.getBoundingClientRect();
      const opacity=parseFloat(getComputedStyle(glow).opacity)||0;
      const dark=document.documentElement.dataset.theme==='dark';
      ctx.save();ctx.clip();ctx.translate(-48,0);
      ctx.globalAlpha=opacity*(dark?.1:.13);
      // Match the fixed artwork's 150% x 110% background sizing and bottom alignment.
      ctx.drawImage(sombraImage,bounds.left-bounds.width*.25-local.left,bounds.bottom-bounds.height*1.1-local.top,bounds.width*1.5,bounds.height*1.1);
      ctx.restore();
    }
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
