# Marva — Brand Foundation

*The locked design decisions that seed the brand book, the website, and every template. This is the single source of truth — the site and docs pull from here.*

---

## The core idea

**מרווה = sage** (the Salvia plant, in Hebrew). The name, the primary color, and the logo direction all point at one thing: a fresh, natural, Tel-Aviv plant. Lean into it — it makes the brand coherent instead of arbitrary.

**Personality:** young · Israeli · sustainable · Tel-Aviv / coastal · fresh, not corporate.

**One-line essence:** free water that carries your message — a positive, natural, city gimmick.

---

## Palette

Usage ratio: **50% sage · 30% sky · 20% sand**, over an off-white base, with deep sage as the text/CTA anchor.

| Role | Name | HEX | Notes |
|---|---|---|---|
| Primary | Sage leaf | `#8CA87C` | Surfaces, fills, brand blocks |
| Secondary | Sky | `#8FC2DE` | Accents, water cues, links-on-dark |
| Neutral accent | Sand | `#E6D8B8` | Warm backgrounds, section breaks |
| **Ink / CTA** | Deep sage | `#5C7A4E` | **Body text, buttons, headings — the contrast anchor** |
| Base | Off-white | `#FBFAF5` | Page background (softer than #FFF) |

**Accessibility rule:** sage, sky, and sand are all light — never put text directly on them in a light tone. Text = deep sage (`#5C7A4E`) or a near-black warm ink (`#2E332B`). Buttons = deep sage fill with off-white text. Check every text/background pair hits WCAG AA (4.5:1) before shipping.

CSS custom properties (ready to paste):

```css
:root{
  --sage:#8CA87C;
  --sky:#8FC2DE;
  --sand:#E6D8B8;
  --ink:#5C7A4E;      /* deep sage — text + CTA */
  --ink-strong:#2E332B; /* warm near-black for long body copy */
  --base:#FBFAF5;
}
```

Tailwind (add to `theme.extend.colors`):

```js
colors:{
  sage:'#8CA87C', sky:'#8FC2DE', sand:'#E6D8B8',
  ink:'#5C7A4E', 'ink-strong':'#2E332B', base:'#FBFAF5',
}
```

---

## Typography (Hebrew-first, both free on Google Fonts)

- **Headings / logo wordmark:** **Rubik** (700 / 500) — geometric, modern, excellent Hebrew, reads young/TLV.
- **Body / UI:** **Assistant** (400 / 600) — clean, made for Hebrew, highly legible at small sizes.

Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&family=Assistant:wght@400;600&display=swap');
```

Fallback stack: `'Rubik', 'Assistant', 'Segoe UI', system-ui, sans-serif`.

**RTL is not optional.** The site and label are Hebrew — set `dir="rtl"` and `lang="he"` on the root, and check every layout mirrors correctly (nav, cards, form fields, icons that imply direction).

---

## Logo direction *(confirmed)*

Neria's rough concept — a **wordmark מרווה with a small sage leaf** — is the direction. It's already on-strategy: מרווה *means* sage, so name + color + mark all point at one idea. It just needs rebuilding cleanly (the rough version is a low-res raster in a generic font) and pulling onto the real palette.

**Locked lockup:**
- **Mark:** a single sage leaf (or small two-leaf sprig), sage green `#8CA87C`, with a subtle central vein. Must work **standalone** — that's the favicon and the Instagram avatar. On a pale-sage tile (`#EEF2E6`) for avatar use.
- **Wordmark:** מרווה in **Rubik 700**, deep sage `#5C7A4E`. Consider a Latin "MARVA" lockup for advertiser/international decks.
- **Placement to test:** leaf leading vs. trailing the word; single leaf vs. sprig.
- **Deliverables for the brand book:** SVG + transparent PNG, in both the full lockup and mark-only versions.

**Build workflow (mark in Recraft → wordmark in Figma):**
1. Generate the **leaf mark only** in Recraft (Vector engine, batch of 6–8). Never let AI render the Hebrew — it mangles the glyphs.
2. Take the best 1–2 into **Figma**, simplify the paths, fix spacing.
3. Set **מרווה in Rubik 700** in Figma and lock it beside the mark.
4. Export SVG + PNG. The hand-finishing is also what makes the mark properly *ownable* (see plan §5).

**Recraft prompts (mark only — copy-paste):**

*Primary (filled leaf):*
> Minimalist flat vector logo mark of a single sage leaf, smooth clean geometry, soft organic almond shape gently tilted, one subtle central vein, solid sage green fill #8CA87C, no text, no letters, no wordmark, centered on transparent background, modern botanical brand icon, balanced negative space, crisp at small sizes

*Variant (sage sprig):*
> Minimalist flat vector logo mark of a small sage sprig with two or three leaves on a thin stem, clean simple curves, solid sage green #8CA87C, no text, transparent background, modern natural brand icon, works as a favicon

*Variant (line style):*
> Single continuous line-art logo mark of one sage leaf, uniform stroke weight, deep sage outline #5C7A4E, no fill, no text, transparent background, minimal elegant botanical icon

*Tip:* set up a Recraft Brand Kit with the sage/sky/sand palette first, so color stays consistent across generations.

---

## What this unlocks

With palette + type + logo direction locked, two tracks can run in parallel:
1. **Finish the brand book** (Phase 1) — logo finalized, mockups on the *real* label artboards, misuse rules, applications.
2. **Scaffold the website** (Phase 3) — structure, RTL, and these exact tokens can be built now with a placeholder logo; drop the final SVG in at the end.

---

## Claude Code — session-start prompt (copy-paste to begin the build)

> I'm building a marketing landing page for **Marva** (מרווה), an Israeli company that puts advertisers' designs on free water-bottle labels. Scaffold an **Astro + Tailwind CSS** project, **Hebrew / RTL** (`dir="rtl"`, `lang="he"`), deployable to Cloudflare Pages.
>
> **Brand tokens** (add to Tailwind config): sage `#8CA87C`, sky `#8FC2DE`, sand `#E6D8B8`, ink `#5C7A4E` (text + CTA), ink-strong `#2E332B`, base `#FBFAF5`. Fonts via Google Fonts: **Rubik** (700/500, headings) + **Assistant** (400/600, body). Base background is off-white `#FBFAF5`; buttons are deep-sage fill with off-white text.
>
> **Page structure (single landing page):**
> 1. Hero — headline, subhead, primary CTA, sage-leaf logo placeholder.
> 2. How it works — 3 steps (choose design → we produce & give away free → your brand gets seen).
> 3. A fork into two audience sections: **למפרסמים** (advertisers — want exposure, Marva distributes) and **למשווקים** (publishers/distributors — hand bottles to their own customers). Each has its own benefits list and its own CTA into the order form.
> 4. Social proof / distribution points (beaches, Tel Aviv promenade, Habima, Dizengoff, Sarona).
> 5. **Order form** mirroring these fields: business name, ח.פ./ע.מ, contact, phone, email, desired bottle quantity, campaign duration, start date, delivery method (Option 1: Marva supplies to client / Option 2: Marva distributes — with the conditional sub-fields), notes. On submit, email the data to Marva (no payment processor). Pre-tag which audience section the visitor came from.
> 6. Footer.
>
> Teach me as you go — explain the project structure and each decision before writing the code, since I'm new to this. Start by scaffolding the project and showing me the folder layout.

---

*Everything here is a starting point — adjust any value once you see it in context. The palette especially will want small tuning against the real logo.*
