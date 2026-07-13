/**
 * English copy. Not a literal translation of content.he.ts — matches the
 * Hebrew's register (young, direct, second person) and the brand voice rules
 * (concrete over vague, no over-promising the label, no trailing periods).
 * Locked strings (hero h1/sub/line, advertisers h1, "Marva", "HaTzinor") are
 * used verbatim per spec.
 */
import type { ContentBundle } from './content';

/* ─────────────────────────── Shared / chrome ─────────────────────────── */

const navLinks: ContentBundle['navLinks'] = [
  { label: 'Home', href: '/en/' },
  { label: 'For Advertisers', href: '/en/advertisers' },
  { label: 'For Distributors', href: '/en/distributors' },
  { label: 'Where to find us', href: '/en/#where' },
  { label: 'Contact', href: '/en/#inquiry' },
];

const headerContent: ContentBundle['headerContent'] = {
  menuAriaLabel: 'Navigation menu',
  logoAriaLabel: 'Marva — home',
  ctaLabel: 'Contact us',
  ctaHref: '/en/#inquiry',
};

const footerContent: ContentBundle['footerContent'] = {
  ctaLine: 'Got more questions? Talk to us:',
  phoneLabel: 'Phone',
  phone: '000-0000000',
  email: 'info@marva.co.il',
  navHeading: 'Navigation',
  navAriaLabel: 'Footer navigation',
};

const heroBottleAlt = 'Marva bottle with a brand label';
const formStartHeading = "Let's get started";

const ui: ContentBundle['ui'] = {
  moreDetailsLabel: 'More details',
  readMoreLabel: 'Read more',
};

/* ─────────────────────────────── HOME ──────────────────────────────── */

const homeMeta: ContentBundle['homeMeta'] = {
  title: 'Marva — Free Water',
  description: 'Advertisers pay for the product — you drink for free. Free mineral water whose label is your ad space',
};

const homeHero: ContentBundle['homeHero'] = {
  h1: 'Free Water',
  sub: 'Advertisers pay for the product — you drink for free',
  line: 'Positive advertising, free water — everyone wins',
  ctaLabel: 'I want to advertise',
  ctaHref: '/en/advertisers',
  bottleLabelLines: ['YOUR', 'BRAND', 'HERE'],
};

const conveyorLabel = 'Our partners and customers';

const conveyorChips: ContentBundle['conveyorChips'] = [
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Coming soon' },
  { text: 'Want to be here? Talk to us', href: '/en/#inquiry', isCta: true },
];

const whoStatement = {
  big: "Marva is a new advertising platform: free mineral water, and the label is your ad space",
};

const howHeading = 'How does it work?';

const howSteps: ContentBundle['howSteps'] = [
  { n: '01', icon: 'document', title: 'Get a quote', body: 'A quote based on your campaign details' },
  { n: '02', icon: 'megaphone', title: 'Design the label', body: 'Your label, designed' },
  { n: '03', icon: 'rocket', title: 'Off we go!', body: "Straight into your audience's hands" },
];

const whereHeading = 'Where do the bottles go?';

const whereCards: ContentBundle['whereCards'] = [
  {
    key: 'spots',
    illustration: 'beach',
    title: 'Strategic distribution points',
    body: 'Promenades, beaches, squares, and key hubs',
    long: 'We set up distribution points at the busiest hubs for your target audience',
    photoAlt: 'The Tel Aviv promenade along the beach',
  },
  {
    key: 'business',
    illustration: 'storefront',
    title: 'Businesses',
    body: 'Want free water bottles at your business?',
    long: 'Want to upgrade your customer experience? Talk to us and get free mineral water straight to your business, to hand out to customers',
    photoAlt: 'Water bottles on a coffee shop counter',
  },
  {
    key: 'events',
    illustration: 'event',
    title: 'Events',
    body: 'Sports and cultural events, conferences, talks, seminars, and weddings',
    long: 'Custom-labeled water bottles for your next event',
    photoAlt: 'People raising a toast at an event',
  },
  {
    key: 'market',
    illustration: 'supermarket',
    title: '"HaTzinor" supermarkets',
    body: 'On the shelves chain-wide',
    long: 'Put your brand on the shelf at "HaTzinor" supermarkets',
    photoAlt: 'A drinks shelf in a supermarket',
  },
];

const findSpotsHeading = 'Coming up next';

const findSpots: ContentBundle['findSpots'] = [
  { date: 'Sun, Jul 12', loc: 'Tel Aviv Promenade · opposite Gordon' },
  { date: 'Tue, Jul 14', loc: 'Frishman Beach' },
  { date: 'Thu, Jul 16', loc: 'Habima Square' },
  { date: 'Fri, Jul 17', loc: 'Sarona Market' },
  { date: 'Sat, Jul 18', loc: 'Dizengoff Center' },
];

const testimonialsHeading = 'What people say';

const testimonialPlaceholder: ContentBundle['testimonials'][number] = {
  badge: 'Coming soon',
  name: '◦ ◦ ◦',
  short: "Our first customers' stories will show up here soon",
  long: "We're just launching — the first reviews are on their way. Want to be one of the first? Talk to us",
};

const testimonials: ContentBundle['testimonials'] = [
  { ...testimonialPlaceholder },
  { ...testimonialPlaceholder },
  { ...testimonialPlaceholder },
];

const bigButtons: ContentBundle['bigButtons'] = [
  { label: 'I want to advertise', href: '/en/advertisers', tint: 'sage' },
  { label: 'I want to distribute bottles', href: '/en/distributors', tint: 'sky' },
  { label: 'I have another question', href: '/en/#inquiry', tint: 'sand' },
];

const inquiryTopics: string[] = ['General inquiry', 'Advertising', 'Bottle distribution', 'Partnerships', 'Other'];

const inquiryForm: ContentBundle['inquiryForm'] = {
  heading: "Let's talk",
  subject: 'New website inquiry — General',
  fromPage: 'home',
  thanks: "Thanks! We've got your message and will be in touch soon",
  error: 'Something went wrong sending this. Try again or email us at info@marva.co.il',
  fields: {
    name: { label: 'Full name', placeholder: 'Full name' },
    email: { label: 'Email', placeholder: 'name@email.com' },
    phone: { label: 'Phone', placeholder: '050-1234567' },
    topicLabel: 'Topic',
    message: { label: 'Message', placeholder: 'Tell us how we can help' },
    submitLabel: 'Send',
  },
};

/* ─────────────────────────── ADVERTISERS ──────────────────────────────── */

const advertisersHero: ContentBundle['advertisersHero'] = {
  h1: 'The next label is yours',
  sub: "A water bottle in hand is media people can't ignore — and the audience says thank you for it",
  ctaLabel: 'Get a quote',
  ctaHref: '#ad-form',
};

const advertisersMeta: ContentBundle['advertisersMeta'] = {
  title: 'Marva — For Advertisers',
  description: advertisersHero.sub,
};

const labelPromo: ContentBundle['labelPromo'] = {
  heading: 'The label — your stage',
  caption: 'True-to-scale proportions of a 210×42 mm label, including the mandatory zones',
  ariaLabel: "A mockup of a bottle label at true 210 by 42 millimeter proportions: your brand zone takes up most of the label, with the mandatory regulatory zone at the edge",
  regulatoryZoneLabel: 'Mandatory zone',
  brandZoneLabel: 'Your brand zone',
  brandZonePlaceholder: 'Your design here',
};

const advertiserOptions: ContentBundle['advertiserOptions'] = [
  { title: 'Full creative freedom', body: 'Put whatever you want on your zone of the label. Any background you choose — logo, slogan, coupon code, discount barcode, image, or anything else' },
  { title: 'Half the label, half the cost', body: 'Split the label with another advertiser and pay less' },
  { title: 'You choose how to distribute', body: 'We hand them out at the points you choose, or you get the bottles and distribute them yourself' },
];

const whyAdvertiseHeading = 'Why advertise with us?';

const whyAdvertise: ContentBundle['whyAdvertise'] = [
  { icon: 'crowd', title: 'High demand for everyone', body: 'Demand for free mineral water is high and constant, no matter the target audience' },
  { icon: 'target', title: 'Real audience targeting', body: 'You choose where, when, and who gets the bottles — down to the exact distribution point' },
  { icon: 'megaphone', title: 'Advertising people remember', body: "Your exposure travels through whoever's holding the bottle, the people around them, and the media" },
  { icon: 'label', title: 'An exclusive stage', body: 'The whole stage is yours. No crowded feed, no competing ads on the same screen' },
];

const adForm: ContentBundle['adForm'] = {
  subject: 'New website inquiry — Advertiser',
  fromPage: 'advertisers',
  thanks: "Thanks! We've got your message and will be in touch soon",
  error: 'Something went wrong sending this. Try again or email us at info@marva.co.il',
  fields: {
    businessName: { label: 'Business name', placeholder: 'e.g. Corner Café' },
    taxId: { label: 'Business ID', placeholder: '123456789' },
    contact: { label: 'Contact person', placeholder: 'Full name' },
    phone: { label: 'Phone', placeholder: '050-1234567' },
    email: { label: 'Email', placeholder: 'name@company.com' },
    qty: { label: 'Desired bottle quantity', placeholder: 'e.g. 5,000' },
    duration: { label: 'Campaign length', placeholder: 'e.g. one month' },
    startDate: { label: 'Preferred start date' },
    deliveryLabel: 'Distribution method',
    deliveryOptionSupply: 'You receive the bottles directly, with no distribution from Marva',
    deliveryOptionDistribute: 'We distribute the bottles for you',
    prefPoints: { label: 'Preferred distribution points', placeholder: 'e.g. Tel Aviv Promenade, Gordon Beach' },
    saveToggleLabel: "I'd like to cut costs",
    saveBoxCopy: 'You can advertise on half a label with someone else and pay less',
    splitLabelCheckbox: "I want to share the label with another advertiser (you won't know who you're sharing it with)",
    submitLabel: 'Send inquiry',
  },
};

/* ─────────────────────────── DISTRIBUTORS ──────────────────────────────── */

const distributorsHero: ContentBundle['distributorsHero'] = {
  h1: "The water's on us. The customers are yours",
  sub: 'Get free branded water bottles, hand them to your customers — and give them a good reason to come back',
  ctaLabel: 'I want to distribute',
  ctaHref: '#dist-form',
};

const distributorsMeta: ContentBundle['distributorsMeta'] = {
  title: 'Marva — For Distributors',
  description: distributorsHero.sub,
};

const whyDistributeHeading = 'Why work with us?';

const whyDistribute: ContentBundle['whyDistribute'] = [
  { keyword: 'Zero cost', body: 'Advertisers already paid for the bottles. You just hand them out — no inventory to buy, no risk', accent: 'sage' },
  { keyword: 'Happy customers', body: 'Free cold water is a service upgrade people remember — and tell others about', accent: 'sky' },
  { keyword: 'Foot traffic and exposure', body: 'A distribution point draws a crowd. More people through your door, more chances to sell', accent: 'sand' },
];

const distributorTypesHeading = 'Who can distribute?';

const distributorTypes: string[] = [
  'Gyms and studios',
  'Restaurants and cafés',
  'Event producers',
  'Hotels and hostels',
  'Universities and colleges',
  'Offices and coworking spaces',
  'Sports clubs and classes',
  'Shops and malls',
  'Pools and beaches',
  'Festivals and markets',
  'Clinics and wellness centers',
  'Salons and beauty studios',
];

const distributorTypesClosing = "Don't see yourself on the list? If you've got an audience, talk to us";

const distForm: ContentBundle['distForm'] = {
  subject: 'New website inquiry — Distributor',
  fromPage: 'distributors',
  thanks: "Thanks! We've got your message and will be in touch soon",
  error: 'Something went wrong sending this. Try again or email us at info@marva.co.il',
  fields: {
    businessName: { label: 'Business name', placeholder: 'e.g. Corner Café' },
    businessType: { label: 'Business type', placeholder: 'e.g. café, gym' },
    contact: { label: 'Contact person', placeholder: 'Full name' },
    phone: { label: 'Phone', placeholder: '050-1234567' },
    email: { label: 'Email', placeholder: 'name@company.com' },
    location: { label: 'Business location', placeholder: 'City · address' },
    qty: { label: 'Estimated bottles per month', placeholder: 'e.g. 500' },
    notes: { label: 'Notes', placeholder: 'Tell us about your business and your audience' },
    submitLabel: 'Send inquiry',
  },
};

export const enContent: ContentBundle = {
  heroBottleAlt,
  formStartHeading,
  ui,
  navLinks,
  headerContent,
  footerContent,
  homeMeta,
  homeHero,
  conveyorLabel,
  conveyorChips,
  whoStatement,
  howHeading,
  howSteps,
  whereHeading,
  whereCards,
  findSpotsHeading,
  findSpots,
  testimonialsHeading,
  testimonials,
  bigButtons,
  inquiryTopics,
  inquiryForm,
  advertisersMeta,
  advertisersHero,
  labelPromo,
  advertiserOptions,
  whyAdvertiseHeading,
  whyAdvertise,
  adForm,
  distributorsMeta,
  distributorsHero,
  whyDistributeHeading,
  whyDistribute,
  distributorTypesHeading,
  distributorTypes,
  distributorTypesClosing,
  distForm,
};
