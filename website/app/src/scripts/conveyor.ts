/** All items travel at 34px/s and wrap outside the viewport, including the
 * wider contact link. The period includes every item's real width and gap. */
export function initConveyor() {
  document.querySelectorAll<HTMLElement>('[data-conveyor]').forEach((viewport) => {
    const items = [...viewport.querySelectorAll<HTMLElement>('.conveyor-chip')];
    if (!items.length) return;
    const measure = () => {
      const width = viewport.clientWidth;
      const widths = items.map(item => item.offsetWidth);
      const total = widths.reduce((sum, value) => sum + value, 0);
      const gap = Math.max(24, (width + Math.max(...widths) - total) / items.length);
      const period = total + items.length * gap;
      viewport.style.setProperty('--conveyor-width', `${width}px`);
      viewport.style.setProperty('--conveyor-end', `${width - period}px`);
      viewport.style.setProperty('--conveyor-duration', `${period / 34}s`);
      let offset = 0;
      items.forEach((item, index) => {
        if (document.dir !== 'ltr') offset += widths[index] + gap;
        item.style.setProperty('--conveyor-delay', `${-offset / 34}s`);
        if (document.dir === 'ltr') offset += widths[index] + gap;
      });
      viewport.dataset.ready = '';
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    items.forEach(item => observer.observe(item));
    // Bring the moving CTA into view for keyboard users before pausing it.
    viewport.addEventListener('focusin', (event) => {
      const link = event.target as HTMLElement;
      if (!link.matches('a:focus-visible')) return;
      const item = link.closest<HTMLElement>('.conveyor-chip')!;
      const animation = item.getAnimations()[0];
      if (!animation) return;
      const timing = animation.effect!.getTiming();
      const duration = Number(timing.duration);
      const distance = viewport.clientWidth - (viewport.clientWidth - item.offsetWidth) / 2;
      const phase = document.dir === 'ltr' ? duration - distance / 34 * 1000 : distance / 34 * 1000;
      const time = ((phase + timing.delay) % duration + duration) % duration;
      items.forEach(item => item.getAnimations().forEach(animation => { animation.currentTime = time; }));
      viewport.scrollLeft = 0;
    });
    document.addEventListener('astro:before-swap', () => observer.disconnect(), { once: true });
  });
}
