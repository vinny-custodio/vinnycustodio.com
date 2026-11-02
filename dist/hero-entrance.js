(() => {
  const title=document.querySelector('.hero h1');
  if(!title)return;
  const root=document.documentElement;
  const heroLines=['Crafty','User-Centred','Data-Informed'];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const badge=document.querySelector('.hero-sticker');
  function complete(){title.dataset.entranceComplete='true';title.dispatchEvent(new Event('hero:entered'));}
  async function prepare(){
    if(!reduced)await Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,1200))]);
    // If the safety timeout has already revealed the page, never replay entry.
    const animate=!reduced&&root.classList.contains('hero-boot');
    title.replaceChildren();
    const entrances=[];
    heroLines.forEach((word,index)=>{
      const mask=document.createElement('span');mask.className='hero-line-mask';
      const line=document.createElement('span');line.className='hero-line';line.textContent=word;mask.append(line);title.append(mask);
      if(index<heroLines.length-1)title.append(document.createTextNode(' '));
      if(animate){const entry=line.animate([{transform:'translateY(110%)',opacity:0,filter:'blur(8px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0px)'}],{duration:1100,delay:120+index*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});entrances.push(entry);entry.onfinish=()=>entry.cancel();}
    });
    if(animate){
      if(badge){const entry=badge.animate([{opacity:0,translate:'0 22px'},{opacity:1,translate:'0 0'}],{duration:1400,delay:480,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});entry.onfinish=()=>entry.cancel();}
      [document.querySelector('.hero-foot p'),document.querySelector('.hero-label')].forEach((element,index)=>{
        const entry=element?.animate([{transform:'translateY(18px)',opacity:0,filter:'blur(6px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0px)'}],{duration:900,delay:1080+index*140,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
        if(entry)entry.onfinish=()=>entry.cancel();
      });
    }
    root.classList.remove('hero-boot');
    if(entrances.length)Promise.allSettled(entrances.map(entry=>entry.finished)).then(complete);else complete();
  }
  prepare().catch(()=>{root.classList.remove('hero-boot');complete();});
})();
