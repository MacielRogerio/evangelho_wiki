// A single clock keeps the arrival pulse ahead of both departing beams.
export function setupGoldenLight(hero) {
  if (!hero) return () => {};
  const target = hero.querySelector('.bible-presence');
  const svg = hero.querySelector('.golden-light');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs) => {
    const node = document.createElementNS(ns, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
  };
  const beams = [...svg.querySelectorAll('[data-beam]')].map((group, index) => {
    const guide = group.querySelector('path');
    const length = guide.getTotalLength();
    const trails = ['mist', 'gold', 'core', 'thread'].map(layer => {
      const path = make('path', {d: guide.getAttribute('d'), class: `beam-${layer}`});
      if (layer === 'thread') path.setAttribute('transform', 'translate(-2 2)');
      group.append(path);
      return path;
    });
    const tip = make('circle', {r: 2.2, class: 'beam-tip'});
    // Deterministic dust spread along the curve, rather than a few moving dots.
    const particles = Array.from({length: 180}, (_, i) => {
      const progress = (i + .5) / 180;
      const point = guide.getPointAtLength(progress * length);
      const next = guide.getPointAtLength(Math.min(length, progress * length + 1));
      const angle = Math.atan2(next.y - point.y, next.x - point.x);
      const seed = Math.sin((i + 1) * 127.1 + index * 311.7) * 43758.5453;
      const random = seed - Math.floor(seed);
      const spread = (random - .5) * 24;
      const node = make('circle', {r: .45 + random * .8, class: 'beam-particle'});
      node.setAttribute('cx', point.x - Math.sin(angle) * spread);
      node.setAttribute('cy', point.y + Math.cos(angle) * spread);
      return {node, progress, brightness: .25 + random * .65};
    });
    group.append(...particles.map(p => p.node), tip);
    return {group, guide, length, trails, tip, particles, start: index ? 1380 + (index - 1) * 40 : 180, duration: index ? 850 : 1000};
  });
  const pulses = [...svg.querySelectorAll('[data-pulse]')];
  let frame = 0, running = false;
  const clamp = n => Math.max(0, Math.min(1, n));
  const pulse = (t, start, duration) => {
    const p = (t - start) / duration;
    return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p) * .85;
  };
  const reset = () => {
    beams.forEach(b => b.group.style.opacity = 0);
    pulses.forEach(p => p.style.opacity = 0);
    running = false;
    delete hero.dataset.goldenPlaying;
  };
  const play = event => {
    if (event.type === 'pointerenter' && (event.pointerType === 'touch' || !fine.matches)) return;
    if (running || getComputedStyle(svg).display === 'none') return;
    running = true;
    hero.dataset.goldenPlaying = 'true';
    const start = performance.now();
    const still = reduced.matches;
    const tick = now => {
      const t = now - start;
      if (still) {
        pulses.forEach(p => p.style.opacity = pulse(t, 0, 650) * .65);
      } else {
        [pulse(t, 0, 950), pulse(t, 1160, 1250), pulse(t, 2230, 1100), pulse(t, 2270, 1100)].forEach((v, i) => pulses[i].style.opacity = v);
        beams.forEach(b => {
          const p = (t - b.start) / b.duration;
          const head = clamp(p) * b.length;
          // Preserve the entire drawn arc at uniform intensity, then fade in place.
          const fade = clamp((t - b.start - b.duration) / 1100);
          b.group.style.opacity = p > 0 ? Math.min(1, p * 10) * (1 - fade) : 0;
          b.trails.forEach(path => {
            path.style.strokeDasharray = `${head} ${b.length + 1}`;
            path.style.strokeDashoffset = 0;
          });
          const point = b.guide.getPointAtLength(head);
          b.tip.setAttribute('cx', point.x);
          b.tip.setAttribute('cy', point.y);
          b.tip.style.opacity = p <= 1 ? 1 : 0;
          b.particles.forEach(({node, progress, brightness}, i) => {
            const revealed = clamp((p - progress) * 12);
            node.style.opacity = revealed * brightness * (.85 + .15 * Math.sin(t / 180 + i));
          });
        });
      }
      if (t < (still ? 650 : 3400)) frame = requestAnimationFrame(tick);
      else reset();
    };
    frame = requestAnimationFrame(tick);
  };
  target.addEventListener('pointerenter', play);
  // The artwork is not a control; no extra keyboard stop is introduced.
  if (target.matches('a, button, [tabindex="0"]')) target.addEventListener('focus', play);
  return () => {
    cancelAnimationFrame(frame);
    target.removeEventListener('pointerenter', play);
    target.removeEventListener('focus', play);
    reset();
  };
}
