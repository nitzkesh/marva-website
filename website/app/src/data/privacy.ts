/**
 * Privacy-policy copy — both locales, typed, rendered by PrivacyPage.astro.
 * Deliberately NOT part of the content.*.json CMS bundles: legal text changes
 * via a reviewed git edit, not a casual editor save. Structure mirrors the
 * content layer's locale pattern (one typed object per locale + accessor).
 */

import type { Locale, PageMeta } from './content';

export interface PrivacySection {
  heading: string;
  /** Paragraphs rendered before the bullet list (if any). */
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraphs rendered after the bullet list (closing lines). */
  afterBullets?: string[];
}

export interface PrivacyContact {
  heading: string;
  lead: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
}

export interface PrivacyContent {
  meta: PageMeta;
  title: string;
  updatedLine: string;
  /** EN only: "translation for convenience, Hebrew prevails" note. */
  translationNote?: string;
  intro: string[];
  sections: PrivacySection[];
  contact: PrivacyContact;
}

const he: PrivacyContent = {
  meta: {
    title: 'מרווה: מדיניות פרטיות',
    description: 'איך מרווה אוספת ומשתמשת במידע שנמסר באתר, ומה הזכויות שלכם',
  },
  title: 'מדיניות פרטיות',
  updatedLine: 'עודכן לאחרונה: יולי 2026',
  intro: [
    'מרווה מפעילה את האתר marva-water.com, פלטפורמת פרסום שמחלקת מים מינרלים בחינם, במימון מפרסמים. העמוד הזה מסביר איזה מידע נאסף באתר, איך אנחנו משתמשים בו ומה הזכויות שלכם.',
  ],
  sections: [
    {
      heading: 'מי אנחנו ולמי המדיניות מיועדת',
      paragraphs: [
        'למרווה שני קהלים: עסקים שמתעניינים בפרסום או בחלוקת בקבוקים (וממלאים טפסים באתר), והציבור הרחב שמקבל את הבקבוקים בחינם.',
        'חשוב לדעת: מי שמקבל בקבוק לא נדרש למסור שום פרט: אין רישום, אין אפליקציה ואין איסוף מידע על מי ששותה. המידע האישי שנאסף באתר מגיע רק מטפסי הפנייה העסקיים.',
      ],
    },
    {
      heading: 'איזה מידע נמסר בטפסים',
      paragraphs: [
        'כשאתם ממלאים טופס באתר (פנייה כללית, טופס מפרסמים או טופס משווקים), אתם מוסרים לנו מרצונכם:',
      ],
      bullets: [
        'פרטי קשר: שם מלא או איש קשר, טלפון ואימייל',
        'פרטי עסק: שם העסק, סוג העסק ומיקומו',
        'פרטי קמפיין: כמות בקבוקים, התאריך הרצוי, אופן החלוקה ונקודות חלוקה מועדפות',
        'כל מה שתכתבו בשדות ההודעה וההערות',
        'מאיזה עמוד באתר נשלחה הפנייה',
      ],
    },
    {
      heading: 'מידע טכני ועוגיות',
      paragraphs: [
        'האתר עצמו לא מפעיל כלי אנליטיקה, לא שותל עוגיות פרסום ולא עוקב אחריכם. ספקיות התשתית שלנו (Cloudflare: אחסון האתר, ו-Google Fonts: טעינת גופנים) מעבדות באופן אוטומטי נתונים טכניים בסיסיים כמו כתובת IP, כנדרש להצגת האתר ולאבטחתו.',
      ],
    },
    {
      heading: 'מה אנחנו עושים עם המידע',
      paragraphs: ['אנחנו משתמשים במידע אך ורק לצרכים העסקיים של מרווה:'],
      bullets: [
        'מענה לפנייה שלכם',
        'שליחת ערכת מדיה (מדיה קיט), מחירים והצעות לקמפיין',
        'ניהול וביצוע של שיתופי פעולה: קמפיינים של מפרסמים ונקודות חלוקה של משווקים',
        'עדכונים על מרווה שרלוונטיים לפנייה שלכם. אפשר להסיר את עצמכם בכל רגע במענה למייל',
      ],
      afterBullets: [
        'אנחנו לא מוכרים, לא משכירים ולא מעבירים את הפרטים שלכם לגורמים שלישיים למטרות השיווק שלהם.',
      ],
    },
    {
      heading: 'עם מי המידע משותף',
      paragraphs: ['המידע עובר רק דרך ספקי השירות שמפעילים את התשתית שלנו:'],
      bullets: [
        'Web3Forms: השירות שמעביר את הטפסים מהאתר לתיבת המייל שלנו',
        'Google (Gmail): תיבת המייל שבה הפניות מתקבלות ומנוהלות',
        'Cloudflare: אחסון והגשה של האתר',
      ],
      afterBullets: [
        'הספקים האלה מעבדים את המידע רק לצורך מתן השירות שלהם. מעבר לזה, נמסור מידע רק אם נידרש לכך על פי דין.',
      ],
    },
    {
      heading: 'אבטחה ושמירת מידע',
      paragraphs: [
        'האתר מוגש בחיבור מוצפן (HTTPS), ואנחנו נוקטים אמצעים סבירים כדי להגן על המידע מפני גישה לא מורשית. עם זאת, אין העברת מידע באינטרנט שמאובטחת במאה אחוז.',
        'אנחנו שומרים את פרטי הפנייה כל עוד הם דרושים לטיפול בה או לניהול ההתקשרות, או כפי שמחייב הדין.',
      ],
    },
    {
      heading: 'הזכויות שלכם',
      paragraphs: [
        'בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, יש לכם זכות לעיין במידע שנאסף עליכם, לבקש לתקן אותו ולבקש למחוק אותו. כדי לממש את הזכויות, כתבו לנו למייל שמופיע למטה, ואנחנו נטפל בבקשה בהקדם.',
      ],
    },
    {
      heading: 'שינויים במדיניות',
      paragraphs: [
        'נעדכן את המדיניות הזו מעת לעת לפי הצורך. הגרסה העדכנית תמיד תופיע בעמוד הזה, עם תאריך העדכון האחרון.',
      ],
    },
  ],
  contact: {
    heading: 'יצירת קשר',
    lead: 'לשאלות על פרטיות או למימוש הזכויות שלכם:',
    emailLabel: 'אימייל',
    email: 'marvawater.info@gmail.com',
    phoneLabel: 'טלפון',
    phone: '054-5244339',
  },
};

const en: PrivacyContent = {
  meta: {
    title: 'Marva: Privacy Policy',
    description: 'How Marva collects and uses information submitted on this site, and your rights',
  },
  title: 'Privacy Policy',
  updatedLine: 'Last updated: July 2026',
  translationNote:
    'This is a convenience translation. If the English and Hebrew versions differ, the Hebrew version prevails.',
  intro: [
    'Marva operates marva-water.com, an advertising platform that hands out free, advertiser-funded mineral water. This page explains what information the site collects, how we use it, and your rights.',
  ],
  sections: [
    {
      heading: 'Who we are and who this policy covers',
      paragraphs: [
        'Marva serves two audiences: businesses interested in advertising or distributing bottles (who fill out forms on this site), and the general public who receive the bottles for free.',
        'If you receive a bottle, we ask nothing of you: no sign-up, no app, and no data collection about who drinks. The only personal information this site collects comes from the business inquiry forms.',
      ],
    },
    {
      heading: 'Information you share in the forms',
      paragraphs: [
        'When you fill out a form on this site (general inquiry, advertiser form, or distributor form), you voluntarily share:',
      ],
      bullets: [
        'Contact details: full name or contact person, phone, and email',
        'Business details: business name, business type and location',
        'Campaign details: bottle quantities, preferred date, distribution method and preferred distribution points',
        'Anything you write in the message and notes fields',
        'Which page of the site the inquiry was sent from',
      ],
    },
    {
      heading: 'Technical data and cookies',
      paragraphs: [
        'The site itself runs no analytics, sets no advertising cookies, and does not track you. Our infrastructure providers (Cloudflare: hosting, and Google Fonts: font delivery) automatically process basic technical data such as IP addresses, as required to serve and secure the site.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: ["We use the information strictly for Marva's business:"],
      bullets: [
        'Responding to your inquiry',
        'Sending our media kit, pricing, and campaign proposals',
        'Managing and running partnerships: advertiser campaigns and distributor points',
        'Occasional Marva updates relevant to your inquiry: opt out anytime by replying',
      ],
      afterBullets: [
        'We do not sell, rent, or share your details with third parties for their marketing purposes.',
      ],
    },
    {
      heading: 'Who we share it with',
      paragraphs: ['Your information passes only through the service providers that run our infrastructure:'],
      bullets: [
        'Web3Forms: the service that delivers form submissions to our inbox',
        'Google (Gmail): the mailbox where inquiries are received and managed',
        'Cloudflare: website hosting and delivery',
      ],
      afterBullets: [
        'These providers process the information only to provide their service. Beyond that, we disclose information only if required by law.',
      ],
    },
    {
      heading: 'Security and retention',
      paragraphs: [
        'The site is served over an encrypted connection (HTTPS), and we take reasonable measures to protect your information from unauthorized access. That said, no transmission over the internet is ever 100% secure.',
        'We keep inquiry details for as long as they are needed to handle the inquiry or manage the relationship, or as the law requires.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        "Under Israel's Protection of Privacy Law, 5741-1981, you may review the information we hold about you, ask us to correct it, or ask us to delete it. To exercise these rights, email us at the address below and we will handle your request promptly.",
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'We will update this policy from time to time as needed. The current version will always appear on this page, with its last-updated date.',
      ],
    },
  ],
  contact: {
    heading: 'Contact',
    lead: 'For privacy questions or to exercise your rights:',
    emailLabel: 'Email',
    email: 'marvawater.info@gmail.com',
    phoneLabel: 'Phone',
    phone: '054-5244339',
  },
};

export function getPrivacy(locale: Locale): PrivacyContent {
  return locale === 'en' ? en : he;
}
