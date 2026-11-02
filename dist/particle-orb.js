(() => {
  const canvas = document.querySelector('[data-particle-orb]');
  if (!canvas) return;
  const context = canvas.getContext('2d', { alpha: true });
  const stage = canvas.closest('.hero-reel-sequence') || canvas.closest('.particle-stage');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particleCount = innerWidth < 760 ? 8000 : 14000;
  const particles = [];
  let width = 0, height = 0, radius = 0, pixelRatio = 1;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  let cursorVelocityX = 0, cursorVelocityY = 0, pointerActive = false;
  let lastTargetX = 0, lastTargetY = 0;
  let rotation = 0, frame = 0, seed = 28473;

  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (let index = 0; index < particleCount; index += 1) {
    const y = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const shell = random() < 0.72;
    const distance = shell ? 0.82 + random() * 0.18 : Math.cbrt(random()) * 0.82;
    const ring = Math.sqrt(1 - y * y);
    particles.push({
      x: Math.cos(angle) * ring * distance,
      y: y * distance,
      z: Math.sin(angle) * ring * distance,
      phase: random() * Math.PI * 2,
      size: 0.38 + random() * 0.62,
      drift: 0.6 + random() * 0.8
    });
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    pixelRatio = Math.min(devicePixelRatio || 1, 2);
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    radius = Math.min(width, height) * 0.39;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function rotate(point, turnX, turnY) {
    const cosY = Math.cos(turnY), sinY = Math.sin(turnY);
    const x = point.x * cosY - point.z * sinY;
    const z = point.x * sinY + point.z * cosY;
    const cosX = Math.cos(turnX), sinX = Math.sin(turnX);
    return { x, y: point.y * cosX - z * sinX, z: point.y * sinX + z * cosX };
  }

  function draw() {
    const bounds = stage.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
    pointerX += (targetX - pointerX) * 0.14;
    pointerY += (targetY - pointerY) * 0.14;
    cursorVelocityX *= 0.86;
    cursorVelocityY *= 0.86;
    if (!reducedMotion) rotation += 0.0017;
    context.clearRect(0, 0, width, height);

    const cx = width / 2, cy = height / 2;
    const easedProgress = progress * progress * (3 - 2 * progress);
    const scale = 0.84 + easedProgress * 3.25;
    const blowout = Math.max(0, (progress - 0.46) / 0.54);
    const scatter = blowout * blowout * 0.52;
    const visibility = 1 - Math.max(0, (progress - 0.78) / 0.22) * 0.82;

    particles.forEach((particle) => {
      const turned = rotate(particle, -0.14 + pointerY * 0.07, rotation + pointerX * 0.08);
      const breath = Math.sin(rotation * 3.5 * particle.drift + particle.phase) * 0.008;
      const burstBias = 0.35 + Math.abs(Math.sin(particle.phase * 1.7));
      const distance = 1 + breath + scatter * burstBias;
      const perspective = 1 + turned.z * 0.075;
      let x = cx + turned.x * radius * scale * distance * perspective;
      let y = cy + turned.y * radius * scale * distance * perspective;

      const cursorX = width * (pointerX + 1) / 2;
      const cursorY = height * (pointerY + 1) / 2;
      const dx = cursorX - x;
      const dy = cursorY - y;
      const pointerDistance = Math.hypot(dx, dy);
      const influence = pointerActive ? Math.max(0, 1 - pointerDistance / (radius * 0.38)) : 0;
      if (influence) {
        const pull = influence * influence * 0.24;
        x += dx * pull + cursorVelocityX * radius * influence * 0.9;
        y += dy * pull + cursorVelocityY * radius * influence * 0.9;
      }

      const depth = (turned.z + 1) / 2;
      const dot = particle.size * (0.72 + depth * 0.78);
      context.beginPath();
      context.arc(x, y, dot, 0, Math.PI * 2);
      context.fillStyle = `rgba(93,161,214,${(0.13 + depth * 0.68) * visibility})`;
      context.fill();
    });

    if (!reducedMotion) frame = requestAnimationFrame(draw);
  }

  function setPointer(event) {
    const bounds = canvas.getBoundingClientRect();
    const nextX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const nextY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    cursorVelocityX += (nextX - lastTargetX) * 0.72;
    cursorVelocityY += (nextY - lastTargetY) * 0.72;
    targetX = nextX;
    targetY = nextY;
    lastTargetX = nextX;
    lastTargetY = nextY;
    pointerActive = true;
  }

  addEventListener('resize', resize, { passive: true });
  addEventListener('pointermove', setPointer, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointerActive = false; cursorVelocityX = 0; cursorVelocityY = 0; });
  addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
  resize();
  draw();
})();
