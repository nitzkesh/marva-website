# Marva — Brand Foundation

*The locked design decisions that seed the brand book, the website, and every template.
This is the **single source of truth** — the site and docs pull from here.*

> **Reconciled 2026-07-09.** The website was built to the "Bauhaus TLV" design system and a
> **black** text/CTA anchor is canonical. Palette swatches match the approved brand sheet
> `Marva/primary-logo-viaGPT.png`. The token **names** below match the code exactly
> (`app/src/styles/global.css` `@theme`) so the doc and the codebase share one vocabulary:
> change a value in one place, update the other. Earlier drafts used a greener sage, a
> deep-sage `#5C7A4E` anchor, and a "פרסום שמרווה" tagline — all retired.

---

## The core idea

**מרווה = sage** (the Salvia plant, in Hebrew). The name, the primary color, and the logo
direction all point at one thing: a fresh, natural, Tel-Aviv plant. Lean into it — it makes
the brand coherent instead of arbitrary.

**Personality:** young · Israeli · sustainable · Tel-Aviv / coastal · fresh, not corporate.

**One-line essence:** free water that carries your message — a positive, natural, city gimmick.

**Tagline / descriptor (current):** *מים בחינם, המותג שלכם, בידיים של כולם.*

---

## Palette

Usage ratio: **45% sage · 30% sky · 15% sand · 10% black/white**, over an off-white base,
with **black** as the text/CTA anchor.

Sage, sky, and sand are all light — they are *fills*, never text colors on light backgrounds.

| Role | Token | HEX | Notes |
|---|---|---|---|
| Primary | `sage` | `#A8BFAE` | Surfaces, fills, brand blocks, logo mark leaf |
| — accent | `sage-deep` | `#7FA089` | Small accents only: links, step numerals, dates |
| Secondary | `sky` | `#A6C9E8` | Accents, water cues, the "save costs" panel, logo lobe |
| — deep | `sky-deep` | `#5FA8D3` | Darker sky for hover/emphasis |
| Neutral accent | `sand` | `#E6DCC6` | Warm section backgrounds, hover on route buttons, logo base |
| — deep | `sand-deep` | `#D8C39F` | Darker sand |
| **Ink / CTA** | `ink` | `#111111` | **Body text, headings, buttons — the contrast anchor** |
| Page base | `base` | `#FBFAF6` | Page background (softer than pure #FFF) |
| Card surface | `surface` | `#FFFFFF` | Cards, the forms panel |
| Inverse text | `inverse` | `#FBFAF6` | Text/logo on black or brand-color fills |
| Muted text | `muted` | `#5B6660` | Secondary/placeholder-ish copy |
| Border | `border` | `#E3E0D8` | Input borders, dividers |
| Tints | `sage-tint` / `sky-tint` / `sand-tint` | `#EEF2EC` / `#EAF4FA` / `#F7F1E5` | Pale section backgrounds & tiles |

**Accessibility rule:** text is **black `#111111`** on light backgrounds; on a black or any
brand-color fill, text and the logo go **off-white `#FBFAF6`**. Buttons are **black fill +
off-white text** (the CTA anchor). `sage-deep #7FA089` is for *small* accents only (links,
the 01/02/03 numerals, the distribution dates) — never long body text. Check every
text/background pair hits WCAG AA (4.5:1) before shipping.

CSS custom properties / Tailwind `@theme` (this is what `app/src/styles/global.css` ships):

```css
@theme {
  --color-sage:      #A8BFAE;
  --color-sage-deep: #7FA089;
  --color-sky:       #A6C9E8;
  --color-sky-deep:  #5FA8D3;
  --color-sand:      #E6DCC6;
  --color-sand-deep: #D8C39F;
  --color-ink:       #111111;  /* text + CTA anchor */
  --color-base:      #FBFAF6;  /* page background */
  --color-surface:   #FFFFFF;  /* card surface */
  --color-inverse:   #FBFAF6;  /* text on dark/brand fills */
  --color-muted:     #5B6660;
  --color-border:    #E3E0D8;
  --color-sage-tint: #EEF2EC;
  --color-sky-tint:  #EAF4FA;
  --color-sand-tint: #F7F1E5;
}
```

---

## Typography (Hebrew-first, all free on Google Fonts)

- **Headings / logo wordmark:** **Rubik** (900 / 700 / 500 / 400) — geometric, modern,
  excellent Hebrew, reads young/TLV. Rubik covers Hebrew, so it also carries Hebrew headings.
- **Body / UI:** **Work Sans** (400 / 500 / 600) for Latin/UI; **Assistant** (400 / 600) for
  Hebrew body — a proper Hebrew face (Work Sans is Latin-only, so Hebrew body needs it).

Google Fonts import (shipped):

```css
@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600&family=Rubik:wght@400;500;700;900&family=Work+Sans:wght@400;500;600&display=swap');
```

Fallback stacks: display `'Rubik','Segoe UI',system-ui,sans-serif` · body
`'Work Sans','Assistant','Segoe UI',system-ui,sans-serif` (Latin → Work Sans, Hebrew → Assistant).

**RTL is not optional.** The site and label are Hebrew — set `dir="rtl"` and `lang="he"` on the
root, and check every layout mirrors correctly (nav, cards, form fields, icons that imply
direction).

---

## Logo *(finalized 2026-07-09)*

The mark is a **Bauhaus-style sprout** built from three flat color blocks: a **sage leaf**
(main, right, with a white central vein), a smaller **sky-blue lobe** (left), and a **sand
quarter-circle base**. On-strategy — מרווה *means* sage. The approved direction is the brand
sheet `Marva/primary-logo-viaGPT.png`.

**Shipped assets** (`Marva/website/app/public/`):
- `marva-mark.svg` — full-color mark (scalable; header, footer, label, favicon source).
- `marva-mark-white.svg` — reversed (off-white) version for black / sage / any saturated fill.
- `favicon.svg` — the mark, browser-tab icon.

These are clean **hand-built SVGs** interpreting the approved raster sheet — crisp at any size.
A higher-fidelity **Recraft → Figma vector master** may replace `marva-mark.svg` later with
zero downstream breakage (header/footer/label/favicon all reference the one file).

**Lockup:**
- **Mark colors:** sage `#A8BFAE`, sky `#A6C9E8`, sand `#E6DCC6`, vein white. On a `sage-tint
  #EEF2EC` tile for avatars; use `marva-mark-white.svg` on dark/brand fills.
- **Wordmark:** מרווה in **Rubik 700**, **black `#111111`**; a Latin **MARVA** (Rubik 700)
  lockup is optional for international/advertiser decks. On dark/brand fills the wordmark goes
  off-white `#FBFAF6`.
- **Placement — locked:** leaf **leading** (to the right of the word, first in RTL order) — as
  implemented in `src/components/Logo.astro`.

**Not producible in code (flag):** photorealistic mockups (bottle, tote, business card) carrying
the mark — the approved sheet already shows them, but any *new* mockup needs an image-generation
tool, not code.

---

## Reference implementation

The canonical build of these tokens is the live site — treat it as the visual source of truth
alongside this doc:
- **Site:** `Marva/website/app/` (Astro + Tailwind, Hebrew/RTL, Cloudflare Pages). Tokens live
  in `src/styles/global.css`; primitives in `src/components/` (`Button`, `Card`, `Input`,
  `Badge`, `Logo`); the page is `src/pages/index.astro`.
- **Design system handoff (point-in-time):** `Marva/marva-design-system-viaClaudeD/` — the
  package the site was built from. Reference, not a living doc; this file supersedes it on any
  conflict.

Voice and copy rules live in `Marva_voice_and_messaging.md`; logo usage rules in
`Marva_logo_usage.md`. Both pull palette + type from here.

---

*Values are locked but tunable — adjust here first, then mirror into `global.css`, so the two
never drift.*
