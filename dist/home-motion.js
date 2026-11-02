(() => {
  const list = document.querySelector('.project-list');
  let projects = [...document.querySelectorAll('.project')];
  if (!list || !projects.length) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  projects.forEach((project, index) => {
    project.classList.add('is-visible');
    const meta = project.querySelector('.project-info div > p');
    if (meta) {
      const [, categories = ''] = meta.textContent.split('·').map((item) => item.trim());
      const tags = categories.split('/').map((item) => item.trim()).filter(Boolean);
      meta.className = 'project-kicker';
      meta.innerHTML = `<span class="project-tags">${tags.map((tag) => /W3 Gold/i.test(tag) ? '<span class="award-pill">✦ W3 Gold winner</span>' : `<span>${tag}</span>`).join('')}</span>`;
    }
    project.style.setProperty('--card-rest', `${index % 2 ? 1 : -1}deg`);
  });

  const allProjects=[...projects];
  let lastDeckProgress=-1;
  const taxonomy={'everkind':['app'],'melon-trains':['saas','app'],'melon-flight':['saas'],'melon-checkout':['saas'],'qatar-2022':['website'],'rhode-island-school-of-design':['website'],'design-labs':['saas'],'university-of-mary-washington':['website'],'control-social':['ui-concepts'],'vista-app':['ui-concepts'],'pantrx':['ui-concepts'],'georgia-department-of-agriculture':['website']};
  const empty=document.createElement('p');empty.className='work-empty';empty.textContent='Design engineering work is on its way.';empty.hidden=true;empty.setAttribute('role','status');list.before(empty);
  document.querySelectorAll('[data-work-filter]').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.workFilter;
    if(button.getAttribute('aria-pressed')==='true')return;
    const filterGroup=button.closest('.work-filters');
    const anchorTop=filterGroup.getBoundingClientRect().top;
    const page=document.documentElement;
    const previousBehavior=page.style.scrollBehavior;
    const previousAnchoring=page.style.overflowAnchor;
    page.style.scrollBehavior='auto';page.style.overflowAnchor='none';
    document.querySelectorAll('[data-work-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    const next=allProjects.filter(project=>{const slug=project.querySelector('a').getAttribute('href').split('/')[0];return filter==='all'||taxonomy[slug]?.includes(filter)});
    allProjects.forEach(project=>{project.getAnimations().forEach(animation=>animation.cancel());project.hidden=!next.includes(project)});
    projects=next;
    lastDeckProgress=-1;
    empty.hidden=projects.length>0;
    list.hidden=projects.length===0;
    if(!reduced){
      list.style.height=`${projects.length*82+180}svh`;
      updateDeck();
      projects.forEach((project,index)=>{const end=project.style.transform;project.animate([{transform:`translate(${index%2?8:-8}%,8%) rotate(${index%2?7:-7}deg) scale(.94)`},{transform:end}],{duration:650,delay:index*45,easing:'cubic-bezier(.22,.8,.25,1)',fill:'backwards'})});
    }
    // Refreshing pinned sections can restore an obsolete scroll position.
    // Keep the clicked filter at the same viewport coordinate after relayout.
    window.ScrollTrigger?.refresh();
    const restore=()=>{
      const delta=filterGroup.getBoundingClientRect().top-anchorTop;
      if(Math.abs(delta)>.5)window.scrollTo({top:window.scrollY+delta,behavior:'instant'});
    };
    restore();
    requestAnimationFrame(()=>{
      restore();
      page.style.scrollBehavior=previousBehavior;page.style.overflowAnchor=previousAnchoring;
      if(!reduced)updateDeck();
    });
  }));
  if (reduced) {
    list.classList.add('project-list-static');
    return;
  }

  const stage = document.createElement('div');
  stage.className = 'project-deck-stage';
  list.prepend(stage);
  projects.forEach((project) => stage.append(project));
  list.style.height = `${projects.length * 82 + 180}svh`;
  const cardLinks=new WeakMap(allProjects.map(project=>[project,project.querySelector('a')]));
  const cardWidths=new WeakMap();
  function measureCards(){allProjects.forEach(project=>{if(!project.hidden)cardWidths.set(project,project.offsetWidth)});lastDeckProgress=-1;requestDeckUpdate()}
  new ResizeObserver(measureCards).observe(stage);
  allProjects.forEach(project=>cardWidths.set(project,project.offsetWidth));

  function renderDeck(progress) {
    if(!projects.length)return;
    if(progress===lastDeckProgress)return;
    lastDeckProgress=progress;
    const gatherEnd = .14;
    const gather = Math.min(1, progress / gatherEnd);
    const settled = gather * gather * (3 - 2 * gather);
    const position = Math.max(0, (progress - gatherEnd) / (1 - gatherEnd)) * (projects.length - 1);
    const current = Math.min(projects.length - 1, Math.floor(position));
    const transition = current === projects.length - 1 ? 0 : position - current;
    const section=list.closest('.work-section');
    section.style.setProperty('--work-tint','#ffffff');
    section.style.setProperty('--work-heading','#272735');
    const spreadPositions = gather<1?Array.from({length:projects.length}, (_,i) => [-96,-31,39,106,-66,76,-132,139,5][i] ?? (i % 2 ? 1 : -1) * (145 + i * 9)):[];
    const spreadCenter=gather<1?(Math.min(...spreadPositions)+Math.max(...spreadPositions))/2:0;

    projects.forEach((project, index) => {
      let xPercent = 0;
      let yPercent = 0;
      let rotation = index % 2 ? 1 : -1;
      let scale = 1;
      let zIndex = 20;
      let interactive = false;

      const exitDistance = Math.max(112, (innerWidth / Math.max(1, cardWidths.get(project)||stage.clientWidth) + 1) * 50 + 12);
      if (index < current) {
        xPercent = -exitDistance;
        yPercent = -4;
        rotation -= 13;
        scale = .92;
        zIndex = 0;
      } else if (index === current) {
        xPercent = -exitDistance * transition;
        yPercent = -4 * transition;
        rotation += -13 * transition;
        scale = 1 - .08 * transition;
        zIndex = 40;
        interactive = transition < .55;
      } else {
        const depth = index - position;
        const visibleDepth = Math.min(depth, 4);
        xPercent = visibleDepth * 4.2;
        yPercent = visibleDepth * 4.5;
        rotation = (index % 2 ? 1 : -1) * (1 + visibleDepth * 1.65);
        scale = 1 - visibleDepth * .018;
        zIndex = 30 - (index - current);

        if (index === current + 1) {
          zIndex = 39;
          interactive = transition >= .55;
        }
      }

      // A broad, irregular spread gathers into the same physical deck.
      if (gather < 1) {
        const spreadX = spreadPositions[index] - spreadCenter;
        const spreadY = [5, -13, 7, -9, 23, 25][index % 6];
        const spreadRotation = [-15, -7, 10, 17, 6, -11][index % 6];
        xPercent = spreadX * (1 - settled) + xPercent * settled;
        yPercent = spreadY * (1 - settled) + yPercent * settled;
        rotation = spreadRotation * (1 - settled) + rotation * settled;
        scale = .68 * (1 - settled) + scale * settled;
        interactive = gather < .15 || index === 0;
      }
      project.style.visibility = index < current && gather >= 1 ? 'hidden' : 'visible';
      project.style.pointerEvents = interactive ? 'auto' : 'none';
      project.classList.toggle('is-deck-active', interactive);
      project.setAttribute('aria-hidden', interactive ? 'false' : 'true');
      const link=cardLinks.get(project);
      if(link.tabIndex!==(interactive?0:-1))link.tabIndex = interactive ? 0 : -1;
      project.style.zIndex = String(zIndex);
      project.style.transform = `translate(${xPercent}%,${yPercent}%) rotate(${rotation}deg) scale(${scale})`;
    });
  }

  let ticking = false;
  function updateDeck() {
    const bounds = list.getBoundingClientRect();
    const range = Math.max(1, list.offsetHeight - innerHeight);
    renderDeck(Math.max(0, Math.min(1, -bounds.top / range)));
    ticking = false;
  }
  function requestDeckUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateDeck);
  }

  updateDeck();
  addEventListener('scroll', requestDeckUpdate, { passive: true });
  addEventListener('resize', requestDeckUpdate, { passive: true });
})();

// Experience cards slide into a layered stack, reversing naturally on scroll up.
(() => {
  if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const items=[...document.querySelectorAll('.home-page .timeline li')];
  items.forEach((item, index) => {
    item.style.setProperty('--experience-index',index);
    const tilts=[-2.2,1.6,-1.1,2.4,-1.8,.9,-2.5,1.7];
    const offsets=[-12,16,-7,13,-16,8,-10,14];
    const restingTilt=index%2?.3:-.3;
    gsap.set(item,{x:0,y:0,rotation:restingTilt});
    const next=items[index+1];
    if(next){
      const setX=gsap.quickSetter(item,'x','px'),setRotation=gsap.quickSetter(item,'rotation','deg');
      let pending=false;
      function update(){
        pending=false;
        const top=parseFloat(getComputedStyle(item).top)||100;
        const nextTop=next.getBoundingClientRect().top;
        // Stay perfectly level until the next card actually covers this card.
        const overlap=top+item.offsetHeight-nextTop;
        const progress=Math.max(0,Math.min(1,(overlap-item.offsetHeight*.35)/(item.offsetHeight*.6)));
        const eased=progress*progress*(3-2*progress);
        setX(offsets[index%offsets.length]*eased);setRotation(restingTilt+(tilts[index%tilts.length]-restingTilt)*eased);
      }
      function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
      addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
      update();
    }
  });
})();
