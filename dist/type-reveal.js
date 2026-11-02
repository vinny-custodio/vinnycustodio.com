(() => {
  const root=document.documentElement;
  if(document.body.classList.contains('case-body')){root.classList.remove('motion-boot');return;}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){root.classList.remove('motion-boot');return;}
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.add('type-is-visible');
      observer.unobserve(target);
    });
  }, {threshold:.12, rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('main h1, main h2, main h3, main p:not(.work-reel-label):not(.work-reel-count):not(.particle-caption), .site-footer h2, .site-footer .footer-copy').forEach(element => {
    if (element.closest('.hero, .project-list, .timeline, .work-reel')) return;
    element.classList.add('type-reveal');
    observer.observe(element);
  });
  root.classList.remove('motion-boot');
})();
