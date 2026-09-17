/**
 * Shared chrome/interaction JS — imported once by Layout.astro so every page
 * (home, advertisers, distributors) gets nav overlay, header shadow, expand
 * cards, generalized form submission, and the calm GSAP reveals for free.
 * Everything that moves is guarded by prefers-reduced-motion.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { web3formsAccessKey, web3formsEndpoint } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hygiene fix: ScrollTrigger caches trigger positions at init, before the
// async Google Fonts (Rubik, Work Sans, Assistant) have swapped in. A late
// font swap can shift heading sizes/line heights, so cached positions can be
// slightly off. Re-measure once fonts are ready — doesn't change what's
// hidden/shown, just keeps trigger math accurate.
document.fonts.ready.then(() => ScrollTrigger.refresh());

/* ── 1. Full-screen nav overlay (all viewport sizes) ─────────────────── */
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('nav-overlay');
const navOverlayLinks = navOverlay?.querySelectorAll('a');
const hamburgerLines = document.querySelectorAll<HTMLElement>('.hamburger-line');
let navOpen = false;

function openNav() {
  navOpen = true;
  navOverlay?.classList.remove('opacity-0', 'pointer-events-none');
  hamburger?.setAttribute('aria-expanded', 'true');
  if (hamburgerLines[0]) hamburgerLines[0].style.transform = 'translateY(8px) rotate(45deg)';
  if (hamburgerLines[1]) hamburgerLines[1].style.opacity = '0';
  if (hamburgerLines[2]) hamburgerLines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navOpen = false;
  navOverlay?.classList.add('opacity-0', 'pointer-events-none');
  hamburger?.setAttribute('aria-expanded', 'false');
  if (hamburgerLines[0]) hamburgerLines[0].style.transform = '';
  if (hamburgerLines[1]) hamburgerLines[1].style.opacity = '';
  if (hamburgerLines[2]) hamburgerLines[2].style.transform = '';
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => (navOpen ? closeNav() : openNav()));
navOverlayLinks?.forEach((a) => a.addEventListener('click', closeNav));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navOpen) closeNav();
});

/* ── 2. Header shadow on scroll ───────────────────────────────────────── */
const header = document.querySelector('.site-header');
function updateHeaderShadow() {
  header?.classList.toggle('header-scrolled', window.scrollY > 40);
}
updateHeaderShadow();
window.addEventListener('scroll', updateHeaderShadow);

/* ── 3. Click-to-expand cards (where-cards, testimonials, etc.) ────────── */
document.querySelectorAll<HTMLButtonElement>('.expand-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel?.classList.toggle('is-active', !expanded);
  });
});

/* ── 4. Advertiser-form conditional fields (delivery radios + save toggle)
   No-op on pages that don't have these elements yet. ────────────────── */
const prefPoints = document.getElementById('pref-points');
document.querySelectorAll<HTMLInputElement>('input[name="delivery"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    prefPoints?.classList.toggle('is-active', radio.checked && radio.value === 'distribute');
  });
});

/* The preferred-date field is a native <input type="date">, so the browser
   supplies the calendar. All we add is the floor: `min` is set at RUNTIME,
   never baked into the HTML, because this is a static build — a build-time
   date would go stale the day after a deploy and start accepting dates that
   are already in the past. Local date parts, not toISOString(): Israel is
   UTC+2/+3, so an ISO string taken after midnight local resolves to
   yesterday. The existing checkValidity() in the submit handler below turns
   a `min` violation into a native browser message for free. */
const startDate = document.querySelector<HTMLInputElement>('input[name="start_date"]');
if (startDate) {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  startDate.min = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
}

const saveToggle = document.getElementById('save-toggle');
const saveBox = document.getElementById('save-box');
let saveOpen = false;
saveToggle?.addEventListener('click', () => {
  saveOpen = !saveOpen;
  saveBox?.classList.toggle('is-active', saveOpen);
  saveToggle.classList.toggle('bg-sky', saveOpen);
});

/* ── 5. Generalized form submit handler — every .marva-form on any page ── */
const sendingLabel = document.documentElement.lang === 'en' ? 'Sending…' : 'שולח...';

document.querySelectorAll<HTMLFormElement>('.marva-form').forEach((form) => {
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = submitBtn?.textContent ?? '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const errorEl = form.parentElement?.querySelector('.form-error');
    errorEl?.classList.add('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = sendingLabel;
    }

    const payload = new FormData(form);
    payload.append('access_key', web3formsAccessKey);
    payload.append('subject', form.dataset.subject || 'פנייה חדשה מהאתר');

    try {
      const res = await fetch(web3formsEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'submit failed');

      form.classList.add('hidden');
      const thanks = form.parentElement?.querySelector('.form-thanks');
      thanks?.classList.remove('hidden');
    } catch {
      errorEl?.classList.remove('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });
});

/* ── 6. Calm GSAP scroll reveals — every page, guarded by reduced-motion ──
   Keep the who-story headline readable throughout its own explanatory scene. */
if (!reduced) {
  document.querySelectorAll<HTMLElement>('main h2:not(#who-title)').forEach((h2) => {
    gsap.from(h2, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: h2, start: 'top 80%' },
    });
  });

  // Each card reveals off its OWN position (via ScrollTrigger.batch), not its
  // section's top edge — on a phone, where cards stack vertically, a
  // section-level trigger fires while the cards are still off screen, so by
  // the time the reader scrolls to them they're already static ("header
  // appears, then dead content"). batch() gives every card its own trigger
  // but still groups same-frame entries (e.g. a desktop row) into one
  // staggered reveal, matching the old side-by-side behaviour there.
  // .miluim-plate is a single block rather than a row of cards, so it just
  // takes the same reveal on its own - the campaign banner used to be the
  // one section on the home page that never entered.
  ['.where-card', '.testimonial-card', '.why-card', '.option-card', '.tile-card', '.miluim-plate'].forEach((selector) => {
    const cards = document.querySelectorAll<HTMLElement>(selector);
    if (!cards.length) return;
    gsap.set(cards, { y: 30, opacity: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 85%',
      onEnter: (batch) => {
        const elements = batch as HTMLElement[];
        // Some card types (.where-card) carry a Tailwind hover-lift transition
        // on `transform` (transition-[transform,box-shadow]). Left alone, that
        // CSS transition intercepts every transform GSAP writes each tick and
        // re-interpolates it over its own 200ms, smearing/lagging the reveal
        // instead of playing GSAP's 0.6s power2.out curve. Suspend the
        // transition for the reveal only, then hand it back once the reveal
        // has fully settled so the hover lift keeps its 200ms ease.
        elements.forEach((el) => {
          el.style.transition = 'none';
        });
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          overwrite: true,
          clearProps: 'transform',
          onComplete: () => {
            elements.forEach((el) => {
              // Force a reflow while transition is still 'none' so removing
              // the inline transform above (clearProps) isn't itself picked
              // up and animated the instant the transition is restored.
              void el.offsetHeight;
              el.style.transition = '';
            });
          },
        });
      },
    });
  });
}
