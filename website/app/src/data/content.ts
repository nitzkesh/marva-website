/**
 * Content layer — all copy/data for every page lives here, typed and exported.
 * Pages/components import from this file. Goal: future copy edits = one-file change.
 *
 * Locale architecture: this file holds the shared TypeScript shape (interfaces),
 * the locale-independent constants (endpoints, keys, route paths), and the
 * `getContent(locale)` accessor. The actual copy lives in `content.he.json`
 * (verbatim Hebrew, unchanged) and `content.en.json` (English translations) —
 * edited by hand or via the local editor at `website/editor`. Section-level
 * show/hide flags live in `sections.json`, consumed by the page components.
 */

import heJson from './content.he.json';
import enJson from './content.en.json';

export type Locale = 'he' | 'en';
export type PageKey = 'home' | 'advertisers' | 'distributors' | 'privacy';

/* ─────────────────────────── Shared / chrome ─────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
  /** When true, the item is skipped at render time (set via the local editor). */
  hidden?: boolean;
}

export interface HeaderContent {
  menuAriaLabel: string;
  logoAriaLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterContent {
  contactHeading: string;
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  navHeading: string;
  navAriaLabel: string;
  langHeading: string;
  policyHeading: string;
  privacyLabel: string;
  /** Rights line at the foot of the footer, © glyph included. */
  rights: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface UiStrings {
  moreDetailsLabel: string;
  readMoreLabel: string;
  /** Consent line shown above every form's submit button; link text is separate. */
  consentPre: string;
  consentLinkLabel: string;
}

/* ─────────────────────────────── HOME ──────────────────────────────── */

export interface HomeHero {
  h1: string;
  sub: string;
  /** Optional lighter line under the sub; omit to render sub → CTA directly. */
  line?: string;
  ctaLabel: string;
  ctaHref: string;
  /** 3 short lines overlaid on the hero bottle's label mockup. */
  bottleLabelLines: [string, string, string];
}

export interface ConveyorChip {
  text: string;
  href?: string;
  isCta?: boolean;
  /**
   * Partner logo shown in place of the text — public-root path, e.g.
   * `/partners/x.png`. `text` stays the chip's accessible name (the img alt).
   */
  logo?: string;
  hidden?: boolean;
}

/**
 * The reservist-owned-business credential, now only the campaign banner on the
 * home page under the "what's next" buttons. A `badgeLabel` sat here too, for a
 * mark-only badge in the header on all 10 pages; the badge came out on
 * 2026-09-09 and the string went with it rather than linger as a field the
 * editor still offers but nothing renders.
 */
export interface MiluimContent {
  /**
   * The banner's accessible name, in the reader's own language.
   *
   * The plate is `role="img"`, so this REPLACES its subtree rather than
   * supplementing it: the Hebrew inside is the campaign's own credential
   * wording, reproduced untranslated (see `miluimBannerText`), and an English
   * visitor would otherwise be read Hebrew with no context. It therefore has to
   * carry the banner's entire message on its own.
   */
  bannerAlt: string;
}

export interface HowStep {
  n: string;
  icon: 'document' | 'bottle' | 'rocket';
  title: string;
  body: string;
  hidden?: boolean;
}

export interface WhereCard {
  key: string;
  illustration: 'beach' | 'storefront' | 'event' | 'supermarket';
  title: string;
  body: string;
  long: string;
  photoAlt: string;
  hidden?: boolean;
}

export interface FindSpot {
  date: string;
  loc: string;
  hidden?: boolean;
}

export interface Testimonial {
  badge: string;
  name: string;
  short: string;
  long: string;
  hidden?: boolean;
}

export interface BigButton {
  label: string;
  href: string;
  tint: 'sage' | 'sky' | 'sand';
  hidden?: boolean;
}

export interface FormFieldSpec {
  label: string;
  placeholder?: string;
}

export interface InquiryForm {
  heading: string;
  subject: string;
  fromPage: string;
  thanks: string;
  error: string;
  fields: {
    name: FormFieldSpec;
    email: FormFieldSpec;
    phone: FormFieldSpec;
    topicLabel: string;
    message: FormFieldSpec;
    submitLabel: string;
  };
}

/* ─────────────────────────── ADVERTISERS ──────────────────────────────── */

export interface HeroContent {
  /** Plain string for a single-line hero, or a 2-tuple for a deliberate two-line render. */
  h1: string | [string, string];
  sub: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * One headline figure in the advertisers-page KPI band. `number` counts up on
 * scroll-in; leave it empty for a statement KPI that carries no figure — the
 * label then takes the whole slot.
 */
export interface Kpi {
  icon: 'roi' | 'impressions' | 'value';
  number: string;
  /** Rendered tight against the number once it lands, e.g. "%". */
  suffix: string;
  /**
   * Bold lead line for a statement KPI (one with no `number`), sized to match
   * the numeric KPIs' big figure so every card in the row carries the same
   * two-line rhythm. Only meaningful when `number` is empty; ignored otherwise.
   */
  headline?: string;
  label: string;
  hidden?: boolean;
}

export interface LabelPromo {
  heading: string;
  caption: string;
  ariaLabel: string;
  regulatoryZoneLabel: string;
  brandZoneLabel: string;
  brandZonePlaceholder: string;
}

export interface AdvertiserOption {
  title: string;
  body: string;
  hidden?: boolean;
}

export interface WhyItem {
  icon: 'target' | 'label' | 'crowd' | 'megaphone';
  title: string;
  body: string;
  hidden?: boolean;
}

export interface AdForm {
  subject: string;
  fromPage: string;
  thanks: string;
  error: string;
  fields: {
    businessName: FormFieldSpec;
    contact: FormFieldSpec;
    phone: FormFieldSpec;
    email: FormFieldSpec;
    qty: FormFieldSpec;
    startDate: FormFieldSpec;
    deliveryLabel: string;
    deliveryOptionSupply: string;
    deliveryOptionDistribute: string;
    prefPoints: FormFieldSpec;
    saveToggleLabel: string;
    saveBoxCopy: string;
    splitLabelCheckbox: string;
    submitLabel: string;
  };
}

/* ─────────────────────────── DISTRIBUTORS ──────────────────────────────── */

export interface WhyDistributeItem {
  keyword: string;
  body: string;
  accent: 'sage' | 'sky' | 'sand';
  hidden?: boolean;
}

export interface DistForm {
  subject: string;
  fromPage: string;
  thanks: string;
  error: string;
  fields: {
    businessName: FormFieldSpec;
    businessType: FormFieldSpec;
    contact: FormFieldSpec;
    phone: FormFieldSpec;
    email: FormFieldSpec;
    location: FormFieldSpec;
    qty: FormFieldSpec;
    notes: FormFieldSpec;
    submitLabel: string;
  };
}

/* ─────────────────────────── FULL BUNDLE ──────────────────────────────── */

export interface ContentBundle {
  heroBottleAlt: string;
  formStartHeading: string;
  ui: UiStrings;

  navLinks: NavLink[];
  headerContent: HeaderContent;
  footerContent: FooterContent;

  homeMeta: PageMeta;
  homeHero: HomeHero;
  conveyorLabel: string;
  conveyorChips: ConveyorChip[];
  miluim: MiluimContent;
  whoStatement: { lines: string[] };
  howHeading: string;
  howSteps: HowStep[];
  whereHeading: string;
  whereCards: WhereCard[];
  findSpotsHeading: string;
  findSpots: FindSpot[];
  testimonialsHeading: string;
  testimonials: Testimonial[];
  bigButtonsHeading: string;
  bigButtons: BigButton[];
  inquiryTopics: string[];
  inquiryForm: InquiryForm;

  advertisersMeta: PageMeta;
  advertisersHero: HeroContent;
  kpiHeading: string;
  kpis: Kpi[];
  labelPromo: LabelPromo;
  advertiserOptions: AdvertiserOption[];
  whyAdvertiseHeading: string;
  whyAdvertise: WhyItem[];
  adForm: AdForm;

  distributorsMeta: PageMeta;
  distributorsHero: HeroContent;
  whyDistributeHeading: string;
  whyDistribute: WhyDistributeItem[];
  distributorTypesHeading: string;
  distributorTypes: string[];
  distributorTypesClosing: string;
  distForm: DistForm;
}

const heContent = heJson as ContentBundle;
const enContent = enJson as ContentBundle;

/**
 * Returns the full typed copy bundle for a locale. Pages/components call this
 * once and destructure what they need — no more importing individual consts.
 */
export function getContent(locale: Locale): ContentBundle {
  return locale === 'en' ? enContent : heContent;
}

/** Render-time visibility gate: drops items hidden via the editor. */
export function visible<T extends { hidden?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.hidden);
}

/* ───────────────────── Locale-independent constants ───────────────────── */

export const web3formsAccessKey = 'eea51799-a797-45ab-8f7e-1021844d2bc7';
export const web3formsEndpoint = 'https://api.web3forms.com/submit';

/* ───────────────────── Route ↔ locale path mapping ─────────────────────
   Hebrew stays at the root paths (unchanged URLs); English lives under /en/.
   Used by Layout (hreflang) and the Header/Footer locale toggle. */

const routesByPage: Record<PageKey, Record<Locale, string>> = {
  home: { he: '/', en: '/en/' },
  advertisers: { he: '/advertisers', en: '/en/advertisers' },
  distributors: { he: '/distributors', en: '/en/distributors' },
  privacy: { he: '/privacy', en: '/en/privacy' },
};

/** The URL of `page` in `locale` — i.e. "where am I". */
export function canonicalHref(page: PageKey, locale: Locale): string {
  return routesByPage[page][locale];
}

/** The URL of the SAME page in the OTHER locale — what the toggle links to. */
export function altLocaleHref(page: PageKey, locale: Locale): string {
  const other: Locale = locale === 'he' ? 'en' : 'he';
  return routesByPage[page][other];
}

/**
 * The campaign banner's own wording - Hebrew in both locales, deliberately not
 * translatable, which is why it sits here among the locale-independent
 * constants rather than in content.he.json / content.en.json.
 *
 * It is the text of a credential issued by מחבקים מילואימניקים, reproduced
 * exactly as the campaign publishes it; an English rendering would be a
 * certification wording they never issued. English readers are not left
 * without it - the plate takes `miluim.bannerAlt` as its accessible name, and
 * that IS per-locale.
 *
 * The headline is three phrases, not one string, because the campaign's
 * 300x250 cut breaks it over exactly these three lines while the 970x250 cut
 * sets the same three inline (see .miluim-head in global.css).
 */
export const miluimBannerText = {
  headlineLines: ['עסק של', 'מילואימניק', 'לפניך!'],
  sub: 'אם קונים, אז מעסק במילואים',
};

/**
 * Language names for the switcher. Endonyms — a language is always offered in
 * its own language, never translated — so these are locale-independent and
 * deliberately live here rather than in the per-locale copy files.
 */
export const localeNames: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
};

/** Both locales in a stable order, for rendering the language menu. */
export const locales: Locale[] = ['he', 'en'];
