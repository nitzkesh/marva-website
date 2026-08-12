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
  closeLangMenu(); // opening the full-screen nav closes the language menu too
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

/* ── 2. Header language menu (globe button → dropdown) ───────────────────
   CSS-transition only (opacity + 4px translate); classList state drives
   both the visual toggle and aria-expanded, so the menu opens/closes
   correctly even if the transition itself never runs. ─────────────────── */
const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');
let langMenuOpen = false;

function openLangMenu() {
  langMenuOpen = true;
  langMenu?.classList.remove('opacity-0', '-translate-y-1', 'pointer-events-none');
  langToggle?.setAttribute('aria-expanded', 'true');
}

function closeLangMenu() {
  langMenuOpen = false;
  langMenu?.classList.add('opacity-0', '-translate-y-1', 'pointer-events-none');
  langToggle?.setAttribute('aria-expanded', 'false');
}

langToggle?.addEventListener('click', () => (langMenuOpen ? closeLangMenu() : openLangMenu()));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && langMenuOpen) closeLangMenu();
});
document.addEventListener('pointerdown', (e) => {
  if (!langMenuOpen) return;
  const target = e.target as Node;
  if (langToggle?.contains(target) || langMenu?.contains(target)) return;
  closeLangMenu();
});

/* ── 3. Header shadow on scroll ───────────────────────────────────────── */
const header = document.querySelector('.site-header');
function updateHeaderShadow() {
  header?.classList.toggle('header-scrolled', window.scrollY > 40);
}
updateHeaderShadow();
window.addEventListener('scroll', updateHeaderShadow);

/* ── 4. Click-to-expand cards (where-cards, testimonials, etc.) ────────── */
document.querySelectorAll<HTMLButtonElement>('.expand-trigger').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel?.classList.toggle('is-active', !expanded);
  });
});

/* ── 5. Advertiser-form conditional fields (delivery radios + save toggle)
   No-op on pages that don't have these elements yet. ────────────────── */
const prefPoints = document.getElementById('pref-points');
document.querySelectorAll<HTMLInputElement>('input[name="delivery"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    prefPoints?.classList.toggle('is-active', radio.checked && radio.value === 'distribute');
  });
});

const saveToggle = document.getElementById('save-toggle');
const saveBox = document.getElementById('save-box');
let saveOpen = false;
saveToggle?.addEventListener('click', () => {
  saveOpen = !saveOpen;
  saveBox?.classList.toggle('is-active', saveOpen);
  saveToggle.classList.toggle('bg-sky', saveOpen);
});

/* ── 6. Generalized form submit handler — every .marva-form on any page ── */
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

/* ── 7. Calm GSAP scroll reveals — every page, guarded by reduced-motion ──
   .who-line (home #who) and .how-card (advertisers #how) get their own
   bespoke ScrollTrigger sequences in their page's own script — excluded here
   so they don't double-fire. #who has no h2 at all (3 stacked <p> lines), so
   no exclusion is needed for it; .how-card was never an h2 either. ────── */
if (!reduced) {
  document.querySelectorAll<HTMLElement>('main h2').forEach((h2) => {
    gsap.from(h2, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: h2, start: 'top 80%' },
    });
  });

  ['.where-card', '.testimonial-card', '.why-card', '.option-card', '.tile-card'].forEach((selector) => {
    const cards = document.querySelectorAll<HTMLElement>(selector);
    if (!cards.length) return;
    const section = cards[0].closest('section');
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      clearProps: 'transform',
      scrollTrigger: { trigger: section || cards[0], start: 'top 80%' },
    });
  });
}
