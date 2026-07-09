/**
 * One-shot Motion spring hero entrance — reused by advertisers.astro and
 * distributors.astro. Same pattern as the home hero (index.astro): .hero-copy
 * children stagger up while the sibling .hero-visual springs in. Call once
 * from a page's own <script> tag. Reduced-motion guarded (no-ops entirely,
 * so elements stay in their natural visible state — no hidden state is ever
 * set outside this guard, so there's no FOUC).
 */
import { animate, stagger } from 'motion';

export function heroSpring() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const heroCopyChildren = document.querySelectorAll<HTMLElement>('.hero-copy > *');
  const heroVisual = document.querySelector<HTMLElement>('.hero-visual');

  const springTransition = { type: 'spring' as const, stiffness: 260, damping: 24, mass: 0.9 };

  if (heroCopyChildren.length) {
    animate(
      heroCopyChildren,
      { opacity: [0, 1], y: [16, 0] },
      { delay: stagger(0.08), ...springTransition },
    );
  }

  if (heroVisual) {
    animate(
      heroVisual,
      { opacity: [0, 1], scale: [0.9, 1], y: [16, 0] },
      { delay: 0.15, ...springTransition },
    );
  }
}
