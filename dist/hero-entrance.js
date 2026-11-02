(() => {
  const title=document.querySelector('.hero h1');
  if(!title)return;
  const heroLines=['Crafty','User-Centred','Data-Informed'];
  title.innerHTML=heroLines.join('<br>');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const badge=document.querySelector('.hero-sticker');
  if(badge)badge.style.opacity='0';
  async function prepare(){
    await document.fonts.ready;
    const words=heroLines;
    title.replaceChildren();
    words.forEach((word,index)=>{const span=document.createElement('span');span.textContent=word;title.append(span);if(index<words.length-1)title.append(document.createTextNode(' '));});
    const rows=heroLines.map(line=>({words:[line]}));
    title.replaceChildren();
    rows.forEach((row,index)=>{
      const mask=document.createElement('span');mask.className='hero-line-mask';
      const line=document.createElement('span');line.className='hero-line';line.textContent=row.words.join(' ');mask.append(line);title.append(mask);
      if(index<rows.length-1)title.append(document.createTextNode(' '));
      line.animate([{transform:'translateY(110%)',opacity:0,filter:'blur(8px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0px)'}],{duration:1100,delay:120+index*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
    });
    const afterHeading=120+(rows.length-1)*130+700;
    if(badge){
      const entrance=badge.animate([{opacity:0,translate:"0 22px"},{opacity:1,translate:"0 0"}],{duration:1400,delay:480,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"});
      entrance.onfinish=()=>{badge.style.opacity="1";entrance.cancel()};
    }
    [document.querySelector('.hero-foot p'),document.querySelector('.hero-label')].forEach((element,index)=>{
      const animation=element?.animate([{transform:'translateY(18px)',opacity:0,filter:'blur(6px)'},{transform:'translateY(0)',opacity:1,filter:'blur(0px)'}],{duration:900,delay:afterHeading+index*140,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
      if(animation)animation.onfinish=()=>animation.cancel();
    });
    // Preserve line boxes after entry so following content never shifts.
  }
  prepare();
})();
