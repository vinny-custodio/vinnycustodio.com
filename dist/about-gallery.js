(() => {
 const rail=document.querySelector('.photo-rail'),track=rail?.querySelector('.photo-rail-track');if(!track)return;
 const images=[...track.querySelectorAll('img')].filter(image=>!image.hasAttribute('aria-hidden'));
 track.replaceChildren();
 images.forEach((image,index)=>{
  const card=document.createElement('figure');card.className='about-photo';card.style.setProperty('--rest','-1deg');card.append(image);
  if(image.src.includes('L4bx8xM1qFI7EV8Yq9Y04rVrWps')){card.classList.add('about-photo-car');const caption=document.createElement('figcaption');caption.textContent='I detach car parts, never components.';card.append(caption)}
  track.append(card);
 });
 [...track.children].forEach(card=>{const copy=card.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;track.append(copy)});
})();
