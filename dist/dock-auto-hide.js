/* Desktop work deck: tuck the dock away, reveal at the bottom edge. */
(() => {
 const section=document.querySelector('.home-page .project-list');
 const dock=document.querySelector('[data-app-nav]');
 if(!section||!dock)return;
 const desktop=matchMedia('(min-width:761px) and (hover:hover) and (pointer:fine)');
 const edge=document.createElement('div');edge.className='dock-reveal-edge';edge.setAttribute('aria-hidden','true');document.body.append(edge);
 let pending=false;
 function update(){pending=false;const r=section.getBoundingClientRect();const active=desktop.matches&&r.top<innerHeight*.55&&r.bottom>innerHeight*.55;document.body.classList.toggle('dock-in-work',active);if(!active)document.body.classList.remove('dock-edge-active');}
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
 edge.addEventListener('pointerenter',()=>document.body.classList.add('dock-edge-active'));
 edge.addEventListener('pointerleave',()=>document.body.classList.remove('dock-edge-active'));
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});desktop.addEventListener('change',schedule);new ResizeObserver(schedule).observe(section);update();
})();
