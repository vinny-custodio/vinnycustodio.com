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
  const taxonomy={'design-engineering':['design-engineering'],'everkind':['app'],'melon-trains':['saas','app'],'melon-flight':['saas'],'melon-checkout':['saas'],'qatar-2022':['website'],'rhode-island-school-of-design':['website'],'design-labs':['saas'],'university-of-mary-washington':['website'],'control-social':['ui-concepts'],'vista-app':['ui-concepts'],'pantrx':['ui-concepts'],'georgia-department-of-agriculture':['website']};
  const empty=document.createElement('section');empty.className='work-empty';empty.hidden=true;empty.setAttribute('aria-labelledby','work-empty-title');
  empty.innerHTML=`<div class="work-empty-art" aria-hidden="true">
    <svg class="work-empty-spark" viewBox="0 0 100 100"><path d="M43 4h14v27l19-19 10 10-19 21h29v14H67l19 21-10 10-19-19v27H43V69L24 88 14 78l19-21H4V43h29L14 22l10-10 19 19Z"/></svg>
    <svg class="work-empty-bolt" viewBox="0 0 100 100"><path d="M56 5H76L68 40H94L30 96L39 58H10Z"/></svg>
    <svg class="work-empty-star" viewBox="0 0 100 100"><path d="M50 3C58 34 66 42 97 50 66 58 58 66 50 97 42 66 34 58 3 50 34 42 42 34 50 3Z"/></svg>
  </div><div class="work-empty-copy"><h3 id="work-empty-title">A little code. A lot of craft.</h3><p>Design engineering experiments.<br>Nothing to show here just yet.</p><button type="button" class="work-empty-back">Explore all work <span aria-hidden="true">→</span></button></div>`;
  empty.querySelector('.work-empty-back').addEventListener('click',()=>document.querySelector('[data-work-filter="all"]').click());list.before(empty);
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
      measureCards();
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
  const cardWidths=new WeakMap(),exitDistances=new WeakMap();
  const previousState=new WeakMap();
  let deckRange=1,deckInView=true,ticking=false;
  function measureCards(){
    const stageWidth=stage.clientWidth;
    allProjects.forEach(project=>{if(!project.hidden){const width=project.offsetWidth;cardWidths.set(project,width);exitDistances.set(project,Math.max(112,(innerWidth/Math.max(1,width||stageWidth)+1)*50+12))}});
    // svh keeps the scroll geometry stable when mobile browser chrome collapses.
    deckRange=Math.max(1,list.offsetHeight-stage.offsetHeight);
    lastDeckProgress=-1;requestDeckUpdate();
  }
  const geometryObserver=new ResizeObserver(measureCards);geometryObserver.observe(stage);geometryObserver.observe(list);
  const viewportObserver=new IntersectionObserver(([entry])=>{deckInView=entry.isIntersecting;if(deckInView)requestDeckUpdate()},{rootMargin:'200px'});viewportObserver.observe(list);
  measureCards();

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
    const spreadPositions = gather<1?Array.from({length:projects.length}, (_,i) => [-96,-31,39,106,-66,76,-132,139,5][i] ?? (i % 2 ? 1 : -1) * (145 + i * 9)):[];
    const spreadCenter=gather<1?(Math.min(...spreadPositions)+Math.max(...spreadPositions))/2:0;

    projects.forEach((project, index) => {
      let xPercent = 0;
      let yPercent = 0;
      let rotation = index % 2 ? 1 : -1;
      let scale = 1;
      let zIndex = 20;
      let interactive = false;

      const exitDistance=exitDistances.get(project)||150;
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
      const visible=gather<1||(index>=current&&index<=current+4);
      const previous=previousState.get(project)||{};
      if(previous.visible!==visible){project.style.visibility=visible?'visible':'hidden';project.style.willChange=visible?'transform':'auto'}
      if(previous.interactive!==interactive){
        project.style.pointerEvents=interactive?'auto':'none';
        project.classList.toggle('is-deck-active',interactive);
        project.setAttribute('aria-hidden',String(!interactive));
        cardLinks.get(project).tabIndex=interactive?0:-1;
      }
      if(previous.zIndex!==zIndex)project.style.zIndex=String(zIndex);
      const transform=visible?`translate3d(${xPercent.toFixed(3)}%,${yPercent.toFixed(3)}%,0) rotate(${rotation.toFixed(3)}deg) scale(${scale.toFixed(5)})`:previous.transform;
      if(visible&&previous.transform!==transform)project.style.transform=transform;
      previousState.set(project,{visible,interactive,zIndex,transform});
    });
  }

  function updateDeck() {
    const bounds = list.getBoundingClientRect();
    renderDeck(Math.max(0,Math.min(1,-bounds.top/deckRange)));
    ticking = false;
  }
  function requestDeckUpdate() {
    if(ticking||!deckInView||list.hidden)return;
    ticking = true;
    requestAnimationFrame(updateDeck);
  }

  updateDeck();
  addEventListener('scroll', requestDeckUpdate, { passive: true });
  addEventListener('resize',measureCards,{passive:true});
})();

// Batch geometry reads and pause experience work while its section is offscreen.
(() => {
  if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const section=document.querySelector('.home-page .about-section');if(!section)return;
  const items=[...section.querySelectorAll('.timeline li')];
  const tilts=[-2.2,1.6,-1.1,2.4,-1.8,.9,-2.5,1.7],offsets=[-12,16,-7,13,-16,8,-10,14];
  let visible=false,pending=false,geometry=[];
  const setters=items.map((item,index)=>{item.style.setProperty('--experience-index',index);gsap.set(item,{x:0,y:0,rotation:index%2?.3:-.3});return {x:gsap.quickSetter(item,'x','px'),rotation:gsap.quickSetter(item,'rotation','deg')};});
  function measure(){geometry=items.map(item=>({top:parseFloat(getComputedStyle(item).top)||100,height:item.offsetHeight}));schedule();}
  function update(){
    pending=false;if(!visible)return;
    const tops=items.map(item=>item.getBoundingClientRect().top);
    items.slice(0,-1).forEach((item,index)=>{
      const {top,height}=geometry[index],overlap=top+height-tops[index+1];
      const progress=Math.max(0,Math.min(1,(overlap-height*.35)/(height*.6))),eased=progress*progress*(3-2*progress),rest=index%2?.3:-.3;
      setters[index].x(offsets[index%offsets.length]*eased);setters[index].rotation(rest+(tilts[index%tilts.length]-rest)*eased);
    });
  }
  function schedule(){if(visible&&!pending){pending=true;requestAnimationFrame(update)}}
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule()},{rootMargin:'200px'}).observe(section);
  const sizes=new ResizeObserver(measure);items.forEach(item=>sizes.observe(item));
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure,{passive:true});measure();
})();
