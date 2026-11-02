// Set entrance states before the browser paints any page content.
(() => {
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.documentElement.classList.add('motion-boot','hero-boot','hero-nav-boot');
  window.portfolioMotionFallback=setTimeout(()=>document.documentElement.classList.remove('motion-boot','hero-boot','hero-nav-boot'),4000);
})();
