/**
 * Content layer — all copy/data for every page lives here, typed and exported.
 * Pages/components import from this file. Goal: future copy edits = one-file change.
 *
 * NOTE: advertisers/distributors copy is defined here per spec even though those
 * pages are stubbed out in this phase — the next build phase wires it into markup.
 */

/* ─────────────────────────── Shared / chrome ─────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'בית', href: '/' },
  { label: 'למפרסמים', href: '/advertisers' },
  { label: 'למשווקים', href: '/distributors' },
  { label: 'איפה תמצאו אותנו?', href: '/#where' },
  { label: 'צור קשר', href: '/#inquiry' },
];

export const footerContent = {
  ctaLine: 'לשאלות נוספות, דברו איתנו:',
  phone: '000-0000000',
  email: 'info@marva.co.il',
};

export const web3formsAccessKey = 'f5ce1cab-5c12-409e-b135-3e1996fa181b';
export const web3formsEndpoint = 'https://api.web3forms.com/submit';

/* ─────────────────────────────── HOME ──────────────────────────────── */

export const homeHero = {
  h1: 'מים בחינם',
  sub: 'המפרסמים משלמים על המוצר — אתם שותים בחינם',
  line: 'פרסום חיובי, מים בחינם — כולם מרוויחים',
  ctaLabel: 'אני רוצה לפרסם',
  ctaHref: '/advertisers',
};

export interface ConveyorChip {
  text: string;
  href?: string;
  isCta?: boolean;
}

export const conveyorLabel = 'השותפים והלקוחות שלנו';

export const conveyorChips: ConveyorChip[] = [
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'בקרוב' },
  { text: 'רוצים להיות כאן? דברו איתנו', href: '/#inquiry', isCta: true },
];

export const whoStatement = {
  big: 'מרווה היא פלטפורמת פרסום חדשה: מים מינרליים בחינם, שהתווית שלהם היא שטח הפרסום שלכם',
};

export interface HowStep {
  n: string;
  icon: 'document' | 'megaphone' | 'rocket';
  title: string;
  body: string;
}

export const howSteps: HowStep[] = [
  { n: '01', icon: 'document', title: 'קבלת הצעה', body: 'הצעה לפי פרטי הקמפיין שלכם' },
  { n: '02', icon: 'megaphone', title: 'עיצוב התווית', body: 'עיצוב התווית שלכם' },
  { n: '03', icon: 'rocket', title: 'יוצאים לדרך!', body: 'מגיעים לידיים של קהל היעד שלכם' },
];

export interface WhereCard {
  key: string;
  illustration: 'beach' | 'storefront' | 'event' | 'supermarket';
  title: string;
  body: string;
  long: string;
}

export const whereCards: WhereCard[] = [
  {
    key: 'spots',
    illustration: 'beach',
    title: 'נקודות חלוקה אסטרטגיות',
    body: 'טיילות, חופים, כיכרות ומוקדים מרכזיים',
    long: 'אנחנו מציבים עמדות חלוקה במוקדים הכי מרכזיים של קהל היעד שלכם',
  },
  {
    key: 'business',
    illustration: 'storefront',
    title: 'בתי עסק',
    body: 'רוצים בקבוקי מים בחינם בעסק שלכם?',
    long: 'רוצים לשדרג את חוויית הלקוח שלכם? דברו איתנו ותקבלו מים מינרליים בחינם ישירות לעסק שלכם, לחלוקה ללקוחות',
  },
  {
    key: 'events',
    illustration: 'event',
    title: 'אירועים',
    body: 'אירועי ספורט ותרבות, כנסים, הרצאות, סמינרים וחתונות',
    long: 'בקבוקי מים בהתאמה אישית לאירוע הבא שלכם',
  },
  {
    key: 'market',
    illustration: 'supermarket',
    title: 'סופרמרקטים "הצינור"',
    body: 'על המדפים בסניפי הרשת',
    long: 'שימו את המותג שלכם על המדפים בסופרמרקטים של רשת "הצינור"',
  },
];

export const findSpotsHeading = 'החלוקות הקרובות';

export const findSpots = [
  { date: 'א׳, 12.7', loc: 'טיילת תל אביב · מול גורדון' },
  { date: 'ג׳, 14.7', loc: 'חוף פרישמן' },
  { date: 'ה׳, 16.7', loc: 'כיכר הבימה' },
  { date: 'ו׳, 17.7', loc: 'שרונה מרקט' },
  { date: 'ש׳, 18.7', loc: 'דיזנגוף סנטר' },
];

export interface Testimonial {
  badge: string;
  name: string;
  short: string;
  long: string;
}

const testimonialPlaceholder: Testimonial = {
  badge: 'בקרוב',
  name: '◦ ◦ ◦',
  short: 'הסיפורים של הלקוחות הראשונים שלנו יופיעו כאן בקרוב',
  long: 'אנחנו בשלבי השקה — הממליצים הראשונים בדרך. רוצים להיות בין הראשונים? דברו איתנו',
};

export const testimonials: Testimonial[] = [
  { ...testimonialPlaceholder },
  { ...testimonialPlaceholder },
  { ...testimonialPlaceholder },
];

export interface BigButton {
  label: string;
  href: string;
  tint: 'sage' | 'sky' | 'sand';
}

export const bigButtons: BigButton[] = [
  { label: 'אני רוצה לפרסם', href: '/advertisers', tint: 'sage' },
  { label: 'אני רוצה לחלק בקבוקים', href: '/distributors', tint: 'sky' },
  { label: 'יש לי שאלה אחרת', href: '/#inquiry', tint: 'sand' },
];

export const inquiryTopics = ['פנייה כללית', 'פרסום', 'חלוקת בקבוקים', 'שיתופי פעולה', 'אחר'];

export const inquiryForm = {
  heading: 'בואו נדבר',
  subject: 'פנייה חדשה מהאתר — פנייה כללית',
  fromPage: 'home',
  thanks: 'תודה! קיבלנו את הפנייה ונחזור אליכם בקרוב',
  error: 'משהו השתבש בשליחה. נסו שוב או כתבו לנו ל־info@marva.co.il',
};

/* ─────────────────────────── ADVERTISERS ──────────────────────────────
   Copy defined here for the next build phase; advertisers.astro is a stub
   in this phase. */

export const advertisersHero = {
  h1: 'התווית הבאה היא שלכם',
  sub: 'בקבוק מים ביד הוא מדיה שאי אפשר להתעלם ממנה — והקהל עוד אומר תודה',
  ctaLabel: 'להצעת מחיר',
  ctaHref: '#ad-form',
};

export const labelPromo = {
  heading: 'כל התווית — הבמה שלכם',
  caption: 'פרופורציות אמיתיות של תווית 210×42 מ״מ, כולל אזורי החובה',
  regulatoryZoneLabel: 'אזור חובה',
  brandZoneLabel: 'אזור המותג שלכם',
  brandZonePlaceholder: 'העיצוב שלכם כאן',
};

export interface AdvertiserOption {
  title: string;
  body: string;
}

export const advertiserOptions: AdvertiserOption[] = [
  { title: 'חופש עיצובי מלא', body: 'אפשר לשים על התווית כל מה שבא לכם. כל רקע שתבחרו — לוגו, סלוגן, קוד קופון, ברקוד הנחה, תמונה, או כל דבר אחר' },
  { title: 'חצי תווית, חצי עלות', body: 'אפשר לחלוק את התווית עם מפרסם אחר ולשלם פחות' },
  { title: 'אתם בוחרים איך להפיץ', body: 'אנחנו מחלקים בנקודות שתבחרו, או שאתם מקבלים את הבקבוקים ומחלקים בעצמכם' },
];

export interface WhyItem {
  icon: 'target' | 'label' | 'crowd' | 'megaphone';
  title: string;
  body: string;
}

export const whyAdvertise: WhyItem[] = [
  { icon: 'crowd', title: 'ביקוש גבוה אצל כולם', body: 'הביקוש למים מינרליים בחינם גבוה וקבוע, בלי תלות בקהל יעד ספציפי' },
  { icon: 'target', title: 'קהל ממוקד באמת', body: 'אתם בוחרים איפה, מתי ולמי הבקבוקים מחולקים — עד רמת נקודת החלוקה' },
  { icon: 'megaphone', title: 'פרסומת שזוכרים', body: 'החשיפה שלכם עוברת דרך מי שמחזיק בבקבוק, הסביבה הקרובה שלו והתקשורת' },
  { icon: 'label', title: 'במה בלעדית', body: 'הבמה כולה שלכם. בלי פיד עמוס, בלי מודעות מתחרות באותו מסך' },
];

export const adForm = {
  subject: 'פנייה חדשה מהאתר — מפרסם',
  fromPage: 'advertisers',
  thanks: 'תודה! קיבלנו את הפנייה ונחזור אליכם בקרוב',
  error: 'משהו השתבש בשליחה. נסו שוב או כתבו לנו ל־info@marva.co.il',
};

/* ─────────────────────────── DISTRIBUTORS ──────────────────────────────
   Copy defined here for the next build phase; distributors.astro is a stub
   in this phase. Terminology: משווקים (never מפיצים). */

export const distributorsHero = {
  h1: 'המים עלינו. הלקוחות שלכם',
  sub: 'קבלו בקבוקי מים ממותגים בחינם, חלקו ללקוחות שלכם — ותנו להם סיבה טובה לחזור',
  ctaLabel: 'אני רוצה לחלק',
  ctaHref: '#dist-form',
};

export interface WhyDistributeItem {
  keyword: string;
  body: string;
  accent: 'sage' | 'sky' | 'sand';
}

export const whyDistribute: WhyDistributeItem[] = [
  { keyword: 'אפס עלות', body: 'המפרסמים כבר שילמו על הבקבוקים. אתם רק מגישים אותם — בלי לקנות מלאי ובלי סיכון', accent: 'sage' },
  { keyword: 'לקוחות מרוצים', body: 'מים קרים בחינם הם שדרוג שירות שאנשים זוכרים — ומספרים עליו הלאה', accent: 'sky' },
  { keyword: 'תנועה וחשיפה', body: 'נקודת חלוקה מושכת אליה קהל. יותר אנשים בדלת שלכם, יותר הזדמנויות למכור', accent: 'sand' },
];

export const distributorTypesHeading = 'מי יכול לחלק?';

export const distributorTypes: string[] = [
  'חדרי כושר וסטודיו',
  'מסעדות ובתי קפה',
  'מפיקי אירועים',
  'מלונות והוסטלים',
  'אוניברסיטאות ומכללות',
  'משרדים וחללי עבודה',
  'מועדוני ספורט וחוגים',
  'חנויות ומרכזי קניות',
  'בריכות וחופים',
  'פסטיבלים ושווקים',
  'מרפאות ומכוני בריאות',
  'מספרות ומכוני יופי',
];

export const distributorTypesClosing = 'לא מצאתם את עצמכם ברשימה? אם יש לכם קהל — דברו איתנו';

export const distForm = {
  subject: 'פנייה חדשה מהאתר — משווק',
  fromPage: 'distributors',
  thanks: 'תודה! קיבלנו את הפנייה ונחזור אליכם בקרוב',
  error: 'משהו השתבש בשליחה. נסו שוב או כתבו לנו ל־info@marva.co.il',
};
