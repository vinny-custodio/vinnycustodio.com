// Adapted from the Sombra component supplied by Vinny. Static artwork is cached;
// only the containing layer's transform and opacity change during scroll.
(() => {
  const list = document.querySelector('.project-list');
  const stage = list?.querySelector('.project-deck-stage');
  if (!stage) return;
  const glow = document.createElement('div');
  glow.className = 'sombra-work';
  glow.setAttribute('aria-hidden', 'true');
  document.body.append(glow);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const reel = document.querySelector('.work-reel');
  let pending = false;
  const clamp = value => Math.max(0, Math.min(1, value));
  function draw() {
    pending = false;
    const bounds = list.getBoundingClientRect();
    const workReveal = clamp((innerHeight * .85 - bounds.top) / (innerHeight * .7));
    const heroReveal = reel ? clamp(reel.getBoundingClientRect().top / (innerHeight * .6)) : 0;
    const reveal = Math.max(workReveal, heroReveal);
    const eased = reveal * reveal * (3 - 2 * reveal);
    glow.style.opacity = String(eased);
    glow.style.transform = `translateY(${(1 - eased) * 48}px) scaleY(${.65 + eased * .35})`;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(draw); } }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  reduced.addEventListener('change', schedule);
  draw();
})();
