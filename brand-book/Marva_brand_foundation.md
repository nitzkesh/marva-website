# Marva — Brand Foundation

*Brand strategy + the map to the canonical design sources. This doc holds the brand's
**intent and rules** — it deliberately does **not** keep its own copy of the design tokens
(hex values, font stacks). Those live in code and the design system, so each value has one
home and can't drift.*

> **Source-of-truth hierarchy (reconciled 2026-07-14):**
> 1. **Runtime truth — `website/app/src/styles/global.css` `@theme`.** The tokens the live
>    site actually renders from. A value only counts as shipped once it's here.
> 2. **Design workspace — `marva-design-system-viaClaudeD/…/design_system/`.** The tracked
>    design system (built in the Claude Design desktop app) where the brand is designed and
>    documented; mirrored to `global.css`.
> 3. **This doc.** Brand strategy, rules, and an index to the two above — no duplicated values.
>
> Retired along the way: a greener sage, a deep-sage `#5C7A4E` anchor, a "פרסום שמרווה"
> tagline, and (in the design system) a paler concept-sheet sky/sand — all superseded.

---

## The core idea

**מרווה = sage** (the Salvia plant, in Hebrew). The name, the primary color, and the logo
direction all point at one thing: a fresh, natural, Tel-Aviv plant. Lean into it — it makes
the brand coherent instead of arbitrary.

**Personality:** young · Israeli · sustainable · Tel-Aviv / coastal · fresh, not corporate.

**One-line essence:** free water that carries your message — a positive, natural, city gimmick.

**Tagline / descriptor:** *מים בחינם, המותג שלכם, בידיים של כולם.*

---

## Palette — rules (values live in code)

**Canonical values:** `global.css` `@theme` (runtime) and the design system's
`tokens/colors.css` (documentation). Don't copy hexes into this doc.

Usage ratio: **45% sage · 30% sky · 15% sand · 10% black/white**, over an off-white base,
with **black** as the text/CTA anchor.

**Rules:**
- Sage, sky, and sand are all light — they are *fills*, never text colors on light backgrounds.
- Text is **black** on light backgrounds; on a black or any brand-color fill, text and the
  logo go **off-white**. Buttons are **black fill + off-white text** (the CTA anchor).
- `sage-deep` is for *small* accents only (links, the 01/02/03 numerals, distribution dates) —
  never long body text.
- Check every text/background pair hits **WCAG AA (4.5:1)** before shipping.

---

## Typography — rules (stacks live in code)

**Canonical stacks + Google Fonts import:** `global.css` (`--font-display` / `--font-body`)
and the design system's `tokens/fonts.css`. Don't copy the stacks into this doc.

- **Headings / logo wordmark:** **Rubik** — geometric, modern, excellent Hebrew, reads young/TLV.
- **Body / UI:** **Work Sans** for Latin; **Assistant** for Hebrew body (Work Sans is
  Latin-only, so Hebrew body needs a real Hebrew face).
- All three are free on Google Fonts.
- **RTL is not optional.** The site and label are Hebrew — set `dir="rtl"` and `lang="he"` on
  the root, and check every layout mirrors correctly (nav, cards, form fields, directional icons).

---

## Logo *(finalized 2026-07-09, Recraft-derived)*

The mark is a **Bauhaus-style sprout** built from three flat color blocks: a **sage leaf**
(main, right, with a white central vein), a smaller **sky-blue lobe** (left), and a **sand
quarter-circle base**. On-strategy — מרווה *means* sage.

**Shipped assets** (`Marva/website/app/public/`, mirrored into the design system's `assets/logos/`):
- `marva-mark.svg` — full-color mark (scalable; header, footer, label, favicon source).
- `marva-mark-white.svg` — reversed (off-white) version for black / sage / any saturated fill.
- `favicon.svg` — the mark, browser-tab icon.

**Recraft-derived (2026-07-09, Session 7)** — generated in Recraft, delivered as a flattened
lockup; the 3 leaf color paths were isolated and cropped to a clean viewBox. It's the real
production vector, not a stand-in — no further Figma/Recraft step is pending.

**Lockup:**
- **Mark colors:** sage / sky / sand (per the palette), vein white. On a `sage-tint` tile for
  avatars; use `marva-mark-white.svg` on dark / brand fills.
- **Wordmark:** מרווה in **Rubik 700**, black; a Latin **MARVA** (Rubik 700) lockup is optional
  for international / advertiser decks. On dark / brand fills the wordmark goes off-white.
- **Placement — locked:** leaf **leading** (to the right of the word, first in RTL order) — as
  implemented in `src/components/Logo.astro`.

**Not producible in code (flag):** photorealistic mockups (bottle, tote, business card) carrying
the mark — any *new* mockup needs an image-generation tool, not code.

---

## Index / reference

- **Runtime:** `Marva/website/app/` (Astro + Tailwind, Hebrew/RTL + `/en/`, Cloudflare Pages at
  marva-water.com). Tokens in `src/styles/global.css`; primitives in `src/components/`; pages in
  `src/pages/`.
- **Design system:** `Marva/marva-design-system-viaClaudeD/…/design_system/` — the tracked
  forward design source, reconciled to `global.css` (2026-07-14). Its `readme.md` documents
  palette, type, voice, and visual foundations; its `tokens/` mirror `global.css`.
- **Voice & copy rules:** `Marva_voice_and_messaging.md`. **Logo usage rules:** `Marva_logo_usage.md`.

---

*Change flow: design in the design system → port the change into `global.css` `@theme` (the
runtime truth) → the site ships it. This doc tracks intent and rules, never raw values.*
