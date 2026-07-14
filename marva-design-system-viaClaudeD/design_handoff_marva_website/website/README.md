# Website UI Kit

Recreation of Marva's marketing landing page. Copy, section order, and structure follow the client's own spec (`uploads/website-edits-EN.pdf`); styling uses this design system's tokens and components. Backgrounds are limited to white / off-white / sand per the brief, with black type where color isn't needed.

Sections (chronological, RTL Hebrew):
1. **Hero** — "מים בחינם" / "המותג שלכם, ביד של כולם", Bauhaus geometric accents, no photo.
2. **Who we are** — text + bottle mockup with a blank "המותג שלכם כאן" label (mark left of מרווה at the bottom).
3. **Where the bottles go** — 4 parallel cards.
4. **How it works** — 3 numbered cards.
5. **Three routes** — buttons that jump to the forms hub and pre-select a panel.
6. **Partners** — placeholder ("בקרוב").
7. **Testimonials** — placeholder ("בקרוב").
8. **Forms hub** — panel switcher with three panels: *bottles for my business* (short lead form), *where to find us* (date + location list), *advertise* (full quote form; the Marva-distributes option is labelled "אנחנו מחלקים את הבקבוקים עבורכם", plus an "אני רוצה לחסוך בעלויות" toggle that reveals the half-label shared-advertiser option).
- **Ending** — logo, "לשאלות נוספות, דברו איתנו", phone + email placeholders, Instagram link and two placeholder social slots.

Files: `Header/Hero/WhoAreWe/WhereBottlesGo/HowItWorks/ThreeButtons/Placeholders/Forms/Ending.jsx`, composed in `App.jsx`. `panel` state lives in `App` so the section-5 buttons and header CTA can route into the forms hub.
