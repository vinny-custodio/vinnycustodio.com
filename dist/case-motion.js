(() => {
  if (!window.gsap || !window.ScrollTrigger) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = gsap.utils.toArray('.case-media-row, .case-animation, .case-overview, .case-section');

  if (reduced) {
    gsap.set(['.case-hero > *', ...targets], { clearProps: 'all' });
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .fromTo('.case-hero .eyebrow', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .55 })
    .fromTo('.case-hero h1', { autoAlpha: 0, y: 58, scale: .965, transformOrigin: '50% 100%' }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15 }, '-=.25')
    .fromTo('.case-intro', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .8 }, '-=.62')
    .fromTo('.case-facts > div', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .09 }, '-=.45');

  targets.forEach((target) => {
    const isText = target.matches('.case-overview, .case-section');
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        start: isText ? 'top 98%' : 'top 88%',
        fastScrollEnd: true,
        onLeave: () => timeline.progress(1),
        once: true,
      },
    });

    const images=target.matches('.case-media-row') ? [...target.querySelectorAll('.case-image')] : [];
    timeline.fromTo(images.length ? images : target, {
      autoAlpha: 0,
      y: isText ? 18 : 82,
      scale: isText ? 1 : .92,
      transformOrigin: '50% 100%',
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: isText ? .4 : 1.05,
      stagger: images.length > 1 ? .09 : 0,
      ease: 'power3.out',
      clearProps: 'transform',
    });
  });

  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
