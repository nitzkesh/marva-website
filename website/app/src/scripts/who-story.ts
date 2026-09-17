import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** A complete screen → floating ad → bottle story. The CSS fallback is the
 * finished bottle; loading, reduced motion and resizing never hide the copy. */
export function initWhoStory() {
  const section = document.getElementById('who');
  if (!section) return;
  const scene = section.querySelector<HTMLElement>('.who-scene')!;
  const photo = scene.querySelector<HTMLImageElement>('.who-bottle-photo img')!;
  const replay = section.querySelector<HTMLButtonElement>('.who-replay')!;
  let played = false;
  const media = gsap.matchMedia();

  media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
    delete section.dataset.step;
    section.dataset.playback = 'complete';
    if (context.conditions?.reduced) { replay.hidden = true; return; }
    const pick = (selector: string) => scene.querySelector<HTMLElement>(selector)!;
    const phone = pick('.who-phone'), bottle = pick('.who-bottle-photo');
    const label = pick('.who-label'), slot = pick('.who-ad-slot');
    const curve = pick('.who-label-curvature'), shine = pick('.who-label-shine');
    const ground = pick('.who-ground'), disc = pick('.who-disc');
    const dots = [...scene.querySelectorAll<HTMLElement>('.who-orbit span')];
    const animated = [phone, bottle, label, curve, shine, ground, disc, ...dots];
    let timeline: gsap.core.Timeline | undefined;
    let trigger: ScrollTrigger | undefined;
    let alive = true;
    let ready = false;

    const finish = () => {
      gsap.set(animated, { clearProps: 'transform,opacity' });
      section.dataset.step = '2';
      section.dataset.playback = 'complete';
    };
    const prepare = () => {
      gsap.set(animated, { clearProps: 'transform,opacity' });
      const target = label.getBoundingClientRect(), source = slot.getBoundingClientRect();
      const x = source.x + source.width / 2 - target.x - target.width / 2;
      const y = source.y + source.height / 2 - target.y - target.height / 2;
      const scale = source.width / target.width;
      // Uniform scale keeps the logo and lettering undistorted on the screen.
      gsap.set(label, { x, y, scale });
      gsap.set(phone, { opacity: 1 });
      gsap.set([bottle, curve, ground, ...dots], { opacity: 0 });
      gsap.set(bottle, { y: 24, scale: .96 });
      gsap.set(disc, { opacity: .12, scale: .94 });
      gsap.set(shine, { xPercent: 0, opacity: 0 });
      section.dataset.step = '0';
      return { x, y, scale };
    };

    const play = context.add('play', () => {
      if (!ready) return;
      timeline?.kill();
      const from = prepare();
      played = true;
      section.dataset.playback = 'playing';
      timeline = gsap.timeline({ onComplete: finish });
      timeline
        // Give the first scene time to read before the ad leaves the screen.
        .fromTo(phone, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'power3.out' }, 0)
        .fromTo(label, { opacity: 0 }, { opacity: 1, duration: .45 }, .15)
        .set(section, { attr: { 'data-step': '1' } }, 1.1)
        .to(label, { y: from.y - 30, scale: from.scale * 1.06, duration: .65, ease: 'power3.inOut' }, 1.1)
        .to(phone, { y: 30, rotation: -6, scale: .94, opacity: 0, duration: .85, ease: 'power3.inOut' }, 1.2)
        .to(label, { x: 0, y: 0, scale: 1, duration: 1.2, ease: 'power3.inOut' }, 1.9)
        .to(bottle, { y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, 2.05)
        .to(curve, { opacity: 1, duration: .65 }, 2.5)
        .to(ground, { opacity: 1, duration: .65 }, 2.5)
        .to(disc, { opacity: .28, scale: 1, duration: 1, ease: 'power3.out' }, 2.2)
        .set(section, { attr: { 'data-step': '2' } }, 3.1)
        .fromTo(dots, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .06, ease: 'power3.out' }, 3.1)
        .set(shine, { opacity: 1 }, 3.25)
        .to(shine, { xPercent: 450, duration: 1, ease: 'power3.inOut' }, 3.25)
        .to(shine, { opacity: 0, duration: .2 }, 4.15);
    });
    const onReplay = () => { trigger?.kill(); play(); };
    const onVisibility = () => {
      if (section.dataset.playback === 'playing') timeline?.paused(document.hidden);
    };
    replay.addEventListener('click', onReplay);
    document.addEventListener('visibilitychange', onVisibility);

    Promise.all([photo.decode().catch(() => {}), document.fonts.ready]).then(() => {
      if (!alive || !photo.naturalWidth) return;
      ready = true;
      replay.hidden = false;
      context.add(() => {
        if (played) { finish(); return; }
        prepare();
        section.dataset.playback = 'ready';
        trigger = ScrollTrigger.create({ trigger: scene, start: 'top 65%', once: true, onEnter: play });
      });
    });

    // Within a breakpoint the ad-slot geometry can still change. Settle an
    // active story on resize; refresh the measured starting pose if unplayed.
    let width = scene.clientWidth;
    const observer = new ResizeObserver(() => {
      if (scene.clientWidth === width || !ready) return;
      width = scene.clientWidth;
      context.add(() => {
        if (played) { timeline?.kill(); finish(); }
        else prepare();
      });
    });
    observer.observe(scene);
    return () => {
      alive = false;
      observer.disconnect();
      replay.removeEventListener('click', onReplay);
      document.removeEventListener('visibilitychange', onVisibility);
      replay.hidden = true;
      delete section.dataset.step;
    };
  });
  document.addEventListener('astro:before-swap', () => media.revert(), { once: true });
}
