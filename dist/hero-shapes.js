(() => {
 const topNav=document.querySelector('.hero-top-nav');
 if(topNav){
  document.querySelectorAll('.app-nav .nav-primary a').forEach(link=>{const copy=link.cloneNode(true);copy.removeAttribute('data-nav-link');copy.removeAttribute('data-tooltip');topNav.append(copy)});
  if(!topNav.querySelector('a[href$="hire-me/"]'))topNav.insertAdjacentHTML('beforeend','<a href="hire-me/"><span>Mentorship</span></a>');
  topNav.insertAdjacentHTML('beforeend','<details class="hero-top-contact"><summary>Get in contact <span aria-hidden="true">↗</span></summary><div class="top-contact-options"><a href="mailto:hello@vinnycustodio.com">Copy email</a><a href="https://www.linkedin.com/in/vinnycustodio/" target="_blank" rel="noopener">LinkedIn ↗</a></div></details>');
  const contact=topNav.querySelector('details'),trigger=contact.querySelector('summary'),panel=contact.querySelector('.top-contact-options');
  let closing=null,timer;
  function close(){clearTimeout(timer);if(!contact.open)return;closing?.cancel();closing=panel.animate([{transform:'translateY(0) scale(1)'},{transform:'translateY(-12px) scale(.96)'}],{duration:280,easing:'cubic-bezier(.2,.8,.2,1)'});closing.onfinish=()=>{contact.open=false;closing=null};}
  trigger.addEventListener('click',event=>{event.preventDefault();if(contact.open){close()}else{closing?.cancel();contact.open=true;panel.animate([{transform:'translateY(-12px) scale(.96)'},{transform:'translateY(0) scale(1)'}],{duration:280,easing:'cubic-bezier(.2,.8,.2,1)'})}});
  document.addEventListener('click',event=>{if(!contact.contains(event.target))close()});
  contact.addEventListener('keydown',event=>{if(event.key==='Escape'){close();trigger.focus()}});
  contact.addEventListener('focusout',()=>setTimeout(()=>{if(!contact.contains(document.activeElement))close()},0));
  panel.addEventListener('click',event=>{const link=event.target.closest('a');if(link){if(link.href.startsWith('mailto:')){clearTimeout(timer);timer=setTimeout(close,2700)}else close()}});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelector('.hero-identity')?.animate([{opacity:0},{opacity:1}],{duration:850,delay:100,easing:'ease-out',fill:'backwards'});
 }
 document.documentElement.classList.remove('hero-nav-boot');
 const title=document.querySelector('.hero h1');if(!title)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const paths=[
  '<path d="M56 5H76L68 40H94L30 96L39 58H10Z"/>',
  '<path d="M43 4h14v27l19-19 10 10-19 21h29v14H67l19 21-10 10-19-19v27H43V69L24 88 14 78l19-21H4V43h29L14 22l10-10 19 19Z"/>',
  '<path d="M50 3C58 34 66 42 97 50 66 58 58 66 50 97 42 66 34 58 3 50 34 42 42 34 50 3Z"/>',
  '<path d="M50 10C72-5 92 17 81 36 108 46 99 76 77 76 76 103 45 109 36 84 11 97-6 69 14 50-6 30 17 7 36 19 40 13 44 10 50 10Z"/>',
  '<rect x="13" y="13" width="74" height="74" rx="24" transform="rotate(15 50 50)"/>'
 ];
 const dataPaths=[
  '<rect x="9" y="57" width="21" height="34" rx="7"/><rect x="39" y="32" width="21" height="59" rx="7"/><rect x="69" y="8" width="21" height="83" rx="7"/>',
  '<path d="M50 5v45h45A45 45 0 1 1 50 5Z"/><path d="M60 5a40 40 0 0 1 35 35H60Z"/>',
  '<circle cx="18" cy="76" r="9"/><circle cx="40" cy="58" r="9"/><circle cx="62" cy="65" r="9"/><circle cx="81" cy="24" r="9"/><circle cx="24" cy="35" r="6"/><circle cx="57" cy="22" r="6"/>',
  '<path d="m20 68 24-37 35 40" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"/><circle cx="20" cy="68" r="14"/><circle cx="44" cy="31" r="14"/><circle cx="79" cy="71" r="14"/>',
  '<path d="m10 76 24-26 20 10 31-40M64 20h21v23" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>'
 ];
 let index=0,dataIndex=0;
 const workTitle=document.querySelector('#work-title');
 if(workTitle){
  workTitle.classList.add('work-shape-heading');
  workTitle.setAttribute('aria-label','My Work');
  workTitle.innerHTML='My<span class="work-scroll-motif" aria-hidden="true"></span>Work';
  const motif=workTitle.querySelector('.work-scroll-motif');
  let lastStep=-1,pending=false;
  function updateMotif(){
   pending=false;const rect=workTitle.getBoundingClientRect();
   if(rect.bottom<0||rect.top>innerHeight)return;
   const step=reduced.matches?0:Math.max(0,Math.floor((innerHeight-rect.top)/110));
   if(step===lastStep)return;lastStep=step;
   motif.innerHTML=`<svg viewBox="0 0 100 100">${paths[step%paths.length]}</svg>`;
   motif.style.color=['#5047f8','#ffd000','#8c78ff','#5c9bff','#ffba26'][step%5];
   if(!reduced.matches){motif.getAnimations().forEach(animation=>animation.cancel());motif.animate([{transform:'rotate(-18deg) scale(.35)'},{transform:'rotate(7deg) scale(1.12)',offset:.65},{transform:'rotate(0) scale(1)'}],{duration:420,easing:'cubic-bezier(.22,.8,.3,1)'});}
  }
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateMotif)}},{passive:true});
  updateMotif();
 }
 function split(){
  if(title.querySelector('.hero-letter'))return;
  const existingLines=title.querySelectorAll('.hero-line');
  if(existingLines.length){
   existingLines.forEach(line=>{const text=line.textContent;line.replaceChildren();[...text].forEach(letter=>{const span=document.createElement('span');span.className='hero-letter';span.textContent=letter;span.setAttribute('aria-hidden','true');line.append(span)})});
   title.setAttribute('aria-label','Crafty User-Centred Data-Informed');return;
  }
  const lines=title.innerText.split(/\n/).filter(Boolean);title.replaceChildren();
  lines.forEach((line,i)=>{if(i)title.append(document.createElement('br'));[...line].forEach(letter=>{const span=document.createElement('span');span.className='hero-letter';span.textContent=letter;if(/data.informed/i.test(line))span.dataset.shapeSet='data';span.setAttribute('aria-hidden','true');title.append(span)})});
  title.setAttribute('aria-label',lines.join(' '));
 }
 function pop(event){
  const letter=event.target.closest('.hero-letter');if(!letter||letter.querySelector('.hero-hover-shape')||!letter.textContent.trim())return;
  const shape=document.createElement('span');shape.className='hero-hover-shape';shape.setAttribute('aria-hidden','true');
  const path=paths[index%paths.length];index++;
  shape.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true">${path}</svg>`;
  shape.style.color=['#5047f8','#ffd000','#8c78ff','#5c9bff','#ffba26'][index%5];letter.append(shape);letter.classList.add('is-shape');
  if(!reduced.matches)shape.animate([{transform:'translate(-50%,-50%) rotate(-18deg) scale(.35)'},{transform:'translate(-50%,-50%) rotate(7deg) scale(1.12)',offset:.65},{transform:'translate(-50%,-50%) rotate(0) scale(1)'}],{duration:420,easing:'cubic-bezier(.22,.8,.3,1)'});
 }
 function restore(event){const letter=event.target.closest('.hero-letter');if(!letter||letter.contains(event.relatedTarget))return;letter.classList.remove('is-shape');letter.querySelector('.hero-hover-shape')?.remove()}
 // A quiet scroll hint: one letter per line, only while the hero is visible.
 if(!reduced.matches){
  let pendingScroll=false,lastSwap=0,lastY=scrollY;const active=new Map();
  function clearScrollLetter(letter){active.delete(letter);letter.classList.remove('is-shape');letter.querySelector('.hero-hover-shape')?.remove();}
  function swapOnScroll(){
   pendingScroll=false;if(document.hidden||!title.querySelector('.hero-letter'))return;
   const rect=title.getBoundingClientRect(),now=performance.now();
   if(rect.bottom<40||rect.top>innerHeight-40||now-lastSwap<2000||Math.abs(scrollY-lastY)<35)return;
   lastSwap=now;lastY=scrollY;
   const lines=[...title.querySelectorAll('.hero-line')];
   const groups=lines.length?lines.map(line=>[...line.querySelectorAll('.hero-letter')]):[...Array(3)].map((_,i)=>[...title.querySelectorAll('.hero-letter')].filter((_,n)=>n%3===i));
   groups.slice(0,3).forEach((group,lineIndex)=>{
    const candidates=group.filter(letter=>/[a-z]/i.test(letter.textContent)&&!letter.querySelector('.hero-hover-shape'));
    if(!candidates.length)return;const letter=candidates[Math.floor(Math.random()*candidates.length)];
    active.set(letter,setTimeout(()=>{
     if(document.hidden||!letter.isConnected){active.delete(letter);return;}
     index=Math.floor(Math.random()*paths.length);pop({target:letter});
     active.set(letter,setTimeout(()=>clearScrollLetter(letter),1250));
    },lineIndex*240));
   });
  }
  addEventListener('scroll',()=>{if(!pendingScroll){pendingScroll=true;requestAnimationFrame(swapOnScroll)}},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){active.forEach((timer,letter)=>{clearTimeout(timer);clearScrollLetter(letter)})}});
 }
 title.addEventListener('pointerover',pop);title.addEventListener('pointerdown',pop);
 title.addEventListener('pointerout',restore);
 title.addEventListener('pointerup',event=>{if(event.pointerType!=='mouse')restore(event)});
 title.addEventListener('pointercancel',restore);
 if(reduced.matches||title.dataset.entranceComplete==='true')split();else title.addEventListener('hero:entered',split,{once:true});
})();
