/**
 * Content layer — all copy/data for every page lives here, typed and exported.
 * Pages/components import from this file. Goal: future copy edits = one-file change.
 *
 * Locale architecture: this file holds the shared TypeScript shape (interfaces),
 * the locale-independent constants (endpoints, keys, route paths), and the
 * `getContent(locale)` accessor. The actual copy lives in `content.he.ts`
 * (verbatim Hebrew, unchanged) and `content.en.ts` (English translations).
 */

import { heContent } from './content.he';
import { enContent } from './content.en';

export type Locale = 'he' | 'en';
export type PageKey = 'home' | 'advertisers' | 'distributors';

/* ─────────────────────────── Shared / chrome ─────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderContent {
  menuAriaLabel: string;
  logoAriaLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterContent {
  ctaLine: string;
  phoneLabel: string;
  phone: string;
  email: string;
  navHeading: string;
  navAriaLabel: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface UiStrings {
  moreDetailsLabel: string;
  readMoreLabel: string;
}

/* ─────────────────────────────── HOME ──────────────────────────────── */

export interface HomeHero {
  h1: string;
  sub: string;
  line: string;
  ctaLabel: string;
  ctaHref: string;
  /** 3 short lines overlaid on the hero bottle's label mockup. */
  bottleLabelLines: [string, string, string];
}

export interface ConveyorChip {
  text: string;
  href?: string;
  isCta?: boolean;
}

export interface HowStep {
  n: string;
  icon: 'document' | 'bottle' | 'rocket';
  title: string;
  body: string;
}

export interface WhereCard {
  key: string;
  illustration: 'beach' | 'storefront' | 'event' | 'supermarket';
  title: string;
  body: string;
  long: string;
  photoAlt: string;
}

export interface FindSpot {
  date: string;
  loc: string;
}

export interface Testimonial {
  badge: string;
  name: string;
  short: string;
  long: string;
}

export interface BigButton {
  label: string;
  href: string;
  tint: 'sage' | 'sky' | 'sand';
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
}

export interface WhyItem {
  icon: 'target' | 'label' | 'crowd' | 'megaphone';
  title: string;
  body: string;
}

export interface AdForm {
  subject: string;
  fromPage: string;
  thanks: string;
  error: string;
  fields: {
    businessName: FormFieldSpec;
    taxId: FormFieldSpec;
    contact: FormFieldSpec;
    phone: FormFieldSpec;
    email: FormFieldSpec;
    qty: FormFieldSpec;
    duration: FormFieldSpec;
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
  whoStatement: { big: string };
  howHeading: string;
  howSteps: HowStep[];
  whereHeading: string;
  whereCards: WhereCard[];
  findSpotsHeading: string;
  findSpots: FindSpot[];
  testimonialsHeading: string;
  testimonials: Testimonial[];
  bigButtons: BigButton[];
  inquiryTopics: string[];
  inquiryForm: InquiryForm;

  advertisersMeta: PageMeta;
  advertisersHero: HeroContent;
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

/**
 * Returns the full typed copy bundle for a locale. Pages/components call this
 * once and destructure what they need — no more importing individual consts.
 */
export function getContent(locale: Locale): ContentBundle {
  return locale === 'en' ? enContent : heContent;
}

/* ───────────────────── Locale-independent constants ───────────────────── */

export const web3formsAccessKey = 'f5ce1cab-5c12-409e-b135-3e1996fa181b';
export const web3formsEndpoint = 'https://api.web3forms.com/submit';

/* ───────────────────── Route ↔ locale path mapping ─────────────────────
   Hebrew stays at the root paths (unchanged URLs); English lives under /en/.
   Used by Layout (hreflang) and the Header/Footer locale toggle. */

const routesByPage: Record<PageKey, Record<Locale, string>> = {
  home: { he: '/', en: '/en/' },
  advertisers: { he: '/advertisers', en: '/en/advertisers' },
  distributors: { he: '/distributors', en: '/en/distributors' },
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
