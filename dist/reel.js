(() => {
  const reel = document.querySelector('.work-reel');
  if (!reel) return;
  const cutsRoot = reel.querySelector('.reel-cuts');
  const grid = reel.querySelector('.reel-grid');
  const count = reel.querySelector('.work-reel-count span');
  const label = reel.querySelector('.work-reel-label');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pool = [
    // Melon Trains — product and journey compositions only.
    'ywqyL1MKo8S3zFSTcg09614Y1dY.jpg', 'nlyUhLav2Izv7Lvb9RyK0NI90o.jpg', 'wMDuxwduRRcPvKbaw1RPywTEXQ.jpg',
    // RISD — homepage, editorial system, and Student Hub presentations.
    '79YLbk1Dy03yJ8stVhp6fEYpNc.jpg', 'UGkMiyJZvIEezPw0XOxYsOzC0.jpg', 'qYrEmXn8fNwyL7fTUe5FI7AXVhM.jpg',
    'M5vlm7Yj98COanCUS6OjEN5QMfY.jpg', 'PSoQ4HZHZRlbDx9LUZWQx9ttU.jpg',
    // Control Social — device mockups and visual-system compositions; political-news imagery excluded.
    '0BP3dvpGdAHShnlYYR1zEsOwW0.jpg', '7HjSpYJiFDjqV8xXInPBsKqU.jpg', 'BtGaQzUG8J3NJ3VbeHM5PAtsDs.jpg',
    'u59ToFkYXeJrKBDRDulE9R0w.jpg', '1OcZNTkxlM2nTrQiT7GnMzI1os.jpg',
    // Everkind — refreshed Figma presentation boards.
    'everkind/craft-hero.png', 'everkind/craft-journal.png', 'everkind/craft-conversation.png',
    'everkind/craft-meditations.png', 'everkind/craft-identity.png', 'everkind/craft-typography.png'
  ];
  const cutCount = Math.min(8, pool.length);
  const projects=[['melon-trains','Melon Trains'],['rhode-island-school-of-design','Rhode Island School of Design'],['control-social','CTRL'],['everkind','Everkind']];
  const metadata=Object.fromEntries(pool.map((file,i)=>[file,projects[i<3?0:i<8?1:i<13?2:3]]));
  function caseLink(file){const [slug,title]=metadata[file];return `<a class="reel-case-link" data-reel-case="${slug}" data-reel-name="${slug==='rhode-island-school-of-design'?'RISD':title}" href="${slug}/" aria-label="View ${title} case study"></a>`}
  const gridCount = Math.min(6, pool.length);
  let cuts = [];
  let ticking = false;
  let hasEntered = false;
  let activeIndex = -1;
  let lastProgress=-1;
  let lastHideNav=null;

  function shuffled(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }

  function asset(name) {
    return `assets/case-studies/${name}${name.startsWith('everkind/') ? '?edges=square1' : ''}`;
  }

  function layoutGrid() {
    const styles = getComputedStyle(grid);
    const columns = innerWidth <= 760 ? 2 : 3;
    const gap = parseFloat(styles.columnGap) || 0;
    const contentWidth = grid.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
    const columnWidth = (contentWidth - gap * (columns - 1)) / columns;
    grid.style.setProperty('--reel-row-height', `${Math.max(1, columnWidth * 9 / 16)}px`);
  }

  function normalizeGrid() {
    const figures = [...grid.querySelectorAll('figure')];
    const portrait = figures.find((figure) => figure.classList.contains('is-portrait'));
    if (portrait) {
      const landscape = figures.filter((figure) => figure !== portrait && !figure.classList.contains('is-portrait')).slice(0, 4);
      grid.replaceChildren(portrait, ...landscape);
      grid.classList.add('has-portrait');
    } else {
      figures.slice(6).forEach((figure) => figure.remove());
      grid.classList.remove('has-portrait');
    }
    layoutGrid();
  }

  function randomize() {
    lastProgress=-1;
    const sequence = shuffled(pool);
    const selectedCuts = sequence.slice(0, cutCount);
    const selectedGrid = shuffled(pool).slice(0, gridCount);
    cutsRoot.innerHTML = selectedCuts.map((name, index) => `
      <figure class="reel-cut${index === 0 ? ' is-active' : ''}">
        <img src="${asset(name)}" alt="" decoding="async"${index === 0 ? ' fetchpriority="high"' : ''}>${caseLink(name)}
      </figure>`).join('');
    grid.innerHTML = selectedGrid.map((name) => `<figure><img src="${asset(name)}" alt="" decoding="async">${caseLink(name)}</figure>`).join('');
    cuts = [...cutsRoot.querySelectorAll('.reel-cut')];
    activeIndex = 0;
    const gridImages = [...grid.querySelectorAll('img')];
    let imagesPending = gridImages.length;
    gridImages.forEach((image) => {
      const classify = () => {
        image.closest('figure').classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
        imagesPending -= 1;
        if (imagesPending === 0) normalizeGrid();
      };
      if (image.complete) classify(); else image.addEventListener('load', classify, { once: true });
    });
    requestAnimationFrame(layoutGrid);
    label.textContent = `Selected work · 01—${String(cuts.length).padStart(2, '0')}`;
    reel.querySelector('.work-reel-count').lastChild.textContent = ` / ${String(cuts.length).padStart(2, '0')}`;
    render();
  }

  function render() {
    const bounds = reel.getBoundingClientRect();
    const hideNav = bounds.top > 0;
    if(hideNav!==lastHideNav){
      document.body.classList.toggle('nav-before-reel', hideNav);
      const dock = document.querySelector('.app-nav');
      if (dock) dock.inert = hideNav;
      lastHideNav=hideNav;
    }
    const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
    ticking=false;
    if(progress===lastProgress)return;
    lastProgress=progress;
    const cutEnd = 0.64;
    const cutPosition = Math.min(0.999, progress / cutEnd) * cuts.length;
    const active = Math.min(cuts.length - 1, Math.floor(cutPosition));
    const cutProgress = Math.max(0, Math.min(1, progress / cutEnd));
    const gridProgress = Math.max(0, Math.min(1, (progress - cutEnd) / (1 - cutEnd)));
    const easedGrid = 1 - Math.pow(1 - gridProgress, 3);
    const nextActive = progress < cutEnd ? active : -1;
    if (nextActive !== activeIndex) {
      if (activeIndex >= 0) cuts[activeIndex]?.classList.remove('is-active');
      if (nextActive >= 0) cuts[nextActive]?.classList.add('is-active');
      activeIndex = nextActive;
    }
    cutsRoot.style.setProperty('--reel-scale', String(1 - cutProgress * 0.45));
    reel.style.color = '#fff';
    const counter=String(active + 1).padStart(2, '0');
    if(count.textContent!==counter)count.textContent=counter;
    grid.style.opacity = gridProgress > 0 ? '1' : '0';
    grid.style.transform = `scale(${1.65 - easedGrid * 0.65})`;
    reel.classList.toggle('is-grid', progress >= cutEnd);
    cuts.forEach((cut,i)=>{const hidden=i!==nextActive;if(cut.inert!==hidden)cut.inert=hidden});
    if(grid.inert!==(gridProgress===0))grid.inert=gridProgress===0;
    ticking = false;
  }

  function requestRender() {
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }

  function handleResize() {
    layoutGrid();
    requestRender();
  }

  randomize();
  if (reducedMotion) {
    reel.classList.add('is-grid');
    grid.style.opacity = '1';
    grid.style.transform = 'scale(1)';
    grid.inert = false;
    cuts.forEach(cut=>{cut.inert=true});
  } else {
    cutsRoot.addEventListener('load', requestRender, true);
    addEventListener('scroll', requestRender, { passive: true });
    addEventListener('resize', handleResize, { passive: true });
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        hasEntered = true;
      } else if (hasEntered) {
        randomize();
      }
    }, { threshold: 0.08 }).observe(reel);
  }
})();
