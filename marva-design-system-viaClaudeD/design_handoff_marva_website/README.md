# Handoff: Marva Marketing Website

## Overview
Build the production **Marva (מרווה)** marketing landing page — an Israeli company that gives away free mineral water whose bottle label is paid advertising space. This package contains a working, high-fidelity HTML/React prototype of the full landing page plus the Marva design system it's built on. The task is to reimplement this page in a real production stack (the client's brief targets **Astro + Tailwind, Hebrew/RTL, deployable to Cloudflare Pages**) on top of what's already designed here.

## About the design files
The files in `website/` are a **design reference** — a React-in-HTML prototype (loaded via Babel in the browser) showing the intended look, copy, and behavior. They are **not** the production codebase. Recreate these designs in the target environment using its own patterns (Astro components + Tailwind), not by shipping the Babel/CDN HTML. The `design_system/` folder is the source of truth for tokens, fonts, components, and brand rules — port these into the target project's config (Tailwind theme + font setup + component primitives).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy (Hebrew), section order, and interactions are final. Recreate pixel-accurately. The one soft spot: the §2 bottle "label" is an HTML overlay positioned over a supplied photo — in production, prefer a clean bottle render or a proper label mockup.

## Language & direction
Hebrew, **RTL** (`dir="rtl" lang="he"`). All shipping copy is Hebrew; English here is reference only.

## Screens / Views
Single landing page, sections in order:

1. **Hero (§1)** — off-white bg, Bauhaus geometric accents (quarter-circle sage, sky circle, sand square). H1 "מים בחינם" (Rubik 900), bold line "המותג שלכם, ביד של כולם", body "מפרסמים משלמים על הבקבוקים, אנשים שותים בחינם", primary CTA "אני רוצה לפרסם" → scrolls to Forms hub (advertise panel).
2. **Who we are (§2)** — sand-tint bg, 2-col: heading "מי אנחנו?" + paragraph on the right of a bottle mockup. The bottle shows a blank white label reading "המותג שלכם כאן" with the Marva mark to the LEFT of "מרווה" at the label bottom.
3. **Where the bottles go (§3)** — white bg, heading "לאן הבקבוקים מגיעים?", 4 equal cards (each `Card` with a top accent stripe): distribution points (beaches/promenades/TLV) · businesses (to chain branches) · events (sports/culture/conferences/weddings) · "הצינור" supermarkets (on shelves).
4. **How it works (§4)** — sand-tint bg, heading "איך זה עובד?", 3 numbered cards: 01 קבלת הצעת מחיר · 02 עיצוב התווית · 03 יוצאים לדרך!
5. **Three routes (§5)** — white bg, 3 big buttons (sand-tint, hover→sand): "אני רוצה בקבוקים לעסק שלי" · "איפה תמצאו אותנו?" · "אני רוצה לפרסם". Each scrolls to the Forms hub and pre-selects the matching panel.
6. **Partners (§6)** — sand-tint bg, heading "שותפים", dashed placeholder "בקרוב". (Leave empty for now.)
7. **Testimonials (§7)** — white bg, heading "ממליצים", dashed placeholder "בקרוב". (Leave empty for now.)
8. **Forms hub (§8)** — sand-tint bg, heading "בואו נתחיל", white card with a 3-tab panel switcher:
   - **business** — fields: שם העסק, איש קשר ותפקיד, טלפון, מיקום העסק, כמות בקבוקים משוערת לחודש; submit "תחזרו אליי".
   - **find** — "איפה תמצאו אותנו?": a date + location list of upcoming distribution points (updatable data).
   - **advertise** — full quote form (שם העסק, ח.פ./ע.מ, איש קשר, טלפון, אימייל, כמות, משך קמפיין, תאריך התחלה). Delivery radios: "אתם מחלקים בעצמכם" / **"אנחנו מחלקים את הבקבוקים עבורכם"** (latter reveals a preferred-points field). Plus a toggle button "אני רוצה לחסוך בעלויות" → reveals the sentence "אפשר לפרסם על חצי תווית יחד עם מישהו אחר ולשלם פחות" and a checkbox "אני רוצה לפרסם יחד עם מישהו אחר (לא תדעו מי המפרסם שחולק איתכם את התווית)". Submit "שליחת פנייה".
- **Ending (footer)** — off-white bg: Marva logo, "לשאלות נוספות, דברו איתנו:", phone placeholder `000-0000000`, email `info@marva.co.il`, Instagram link + two dashed placeholder social slots.

## Interactions & behavior
- CTAs and the §5 buttons set the active forms panel (state lifted to `App`) then smooth-scroll to `#forms` via `window.scrollTo` (do NOT use scrollIntoView).
- Forms are mock: submit swaps the panel body for a Hebrew thank-you message. Wire real submission (email endpoint, no payment processor) in production.
- Delivery radio conditionally shows a preferred-points input; the save-costs toggle conditionally shows the shared-label sentence + checkbox.
- Buttons: hover darkens/lifts 1px. Keep transitions calm (short fades/translateY), no bounce.

## State management
- `panel` ('business' | 'find' | 'advertise') lifted to `App`, passed to `Forms` and the routing callbacks.
- Local per-panel state: delivery method, save-costs open, submitted flag.

## Design tokens (see `design_system/tokens/`)
- Colors: sage `#A8BFAF`, sky `#A3D0EC`, sand `#E6D9C3`, black/ink `#111111`, off-white base `#FBFAF6`, white surface `#FFFFFF`; tints sage `#EEF2EC` / sky `#EAF4FA` / sand `#F7F1E5`; deep sage `#7FA089` (accents/hover). Usage ratio 45 sage / 30 sky / 15 sand / 10 black. Text on light brand fills stays black for AA contrast; primary CTA is black fill + off-white text.
- Fonts (LOCKED): **Rubik** (display/Hebrew, 400–900) + **Work Sans** (body, 400–600). See `design_system/tokens/fonts.css`.
- Spacing: 4px base scale (4/8/12/16/24/32/48/64/96). Radii: 6/10/20/pill. Shadow: soft ambient card shadow, no heavy effects/gradients.

## Components (see `design_system/components/core/`)
`Button` (primary/secondary/ghost, pill), `Badge` (tone pill), `Card` (white surface, optional top accent stripe), `Input` (label-above, sage focus ring, RTL-friendly). Port these as Tailwind/Astro components.

## Assets (see `design_system/assets/`)
- `logos/marva-mark.png` (leaf mark), `marva-lockup-cream.png`, `marva-mark-on-sage.png`.
- `imagery/lifestyle-bottle-promenade.png` (used in §2), plus tote/business-card mocks.
- Icons: Instagram from Lucide (lucide-static CDN). No custom icon set was provided.
- ⚠️ Logos are cropped from a single supplied mockup sheet (raster). Request clean SVG/PNG masters for production-crisp reproduction.

## Files
- `website/` — the prototype: `index.html` (entry) + `App.jsx`, `Header/Hero/WhoAreWe/WhereBottlesGo/HowItWorks/ThreeButtons/Placeholders/Forms/Ending.jsx`, `icons.js`, `README.md`.
- `design_system/` — `styles.css`, `tokens/`, `components/core/`, `assets/`, and the full design-system `readme.md` (brand voice, content rules, visual foundations, iconography).

Start from `design_system/readme.md` (brand + rules) and `website/README.md` (section-by-section), then implement.
