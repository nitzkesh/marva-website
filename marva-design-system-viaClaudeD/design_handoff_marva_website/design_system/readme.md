# Marva Design System

**Marva (מרווה)** is an Israeli company that gives away free mineral water — the bottle's label is the ad space. Advertisers pay for the label design + distribution; Marva produces, designs, and hands the bottles out for free at beaches, the Tel Aviv promenade, events, and businesses. Publishers/retailers can also order branded bottles as a giveaway for their own customers. The name **מרווה** means "sage" (the plant) and also evokes "quenches thirst."

## Sources

- `uploads/primary-logo-viaGPT.png` — the original concept lockup (leaf mark + MARVA/מרווה wordmark). **The production mark is now the Recraft-derived `marva-mark.svg`** (shipped at `website/app/public/marva-mark.svg`, mirrored into `assets/logos/` here); this PNG was the earlier concept source.
- `uploads/marva-brand-concept-viaGPT (3).png` — brand concept sheet ("Option 4 — Bauhaus TLV"): palette, typography direction, personality, do's/don'ts, imagery style. **Used as the only source for visual foundations** (color, type, motifs, vibe).
- GitHub repo [`nitzkesh/marva-website`](https://github.com/nitzkesh/marva-website) — an in-progress marketing site build. This design system was reconciled to the SHIPPED site (2026-07-14): the live repo's `website/app/src/styles/global.css` @theme is now the runtime source of truth for design tokens, and this folder mirrors it (the earlier concept-sheet palette it read has been superseded). Its `brand-book/` and `website/` markdown files contain real, specific Hebrew product copy, voice rules, and page structure that this design system's **content fundamentals** and **website UI kit** draw on. Explore it further yourself for: `brand-book/Marva_voice_and_messaging.md` (full voice rules), `website/Marva_site_copy.md` and `website/landing_design.md` (site copy + layout direction), `Marva_delivery_plan.md` (the underlying business/ops plan).

## Index

- `styles.css` — root stylesheet, imports every token file below. Link this one file.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — CSS custom properties.
- `assets/logos/` — logo lockup, mark-only tile.
- `assets/imagery/` — lifestyle/mockup photography cropped from the concept sheet.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups) shown in the Design System tab.
- `components/core/` — `Button`, `Badge`, `Card`, `Input` (see Components below).
- `ui_kits/website/` — click-through recreation of the Marva marketing landing page.
- `SKILL.md` — portable skill file for use in Claude Code.

## Components

Standard set authored from brand guidelines alone (no attached component library/Figma defines the inventory):

- **Button** — pill CTA, `primary`/`secondary`/`ghost` variants.
- **Badge** — pill tag, used for personality traits and distribution-point chips.
- **Card** — white surface with optional top accent stripe (used instead of a left-border accent).
- **Input** — labeled text field, label-above (RTL-friendly), sage focus ring.

### Intentional additions
None beyond the standard set — kept deliberately small since only one product surface (marketing site) currently exists.

## Typography — locked fonts

Marva's official typefaces are **Rubik** (display/headings/Hebrew wordmark), **Work Sans** (Latin body/UI), and **Assistant** (Hebrew body), declared in `tokens/fonts.css` (`@font-face` + Google Fonts `@import`) and referenced through the `--font-display` / `--font-body` / `--font-hebrew` tokens.

- Display → **Rubik** (700/900) — geometric, bold, wide-set caps; carries Hebrew (which the wordmark מרווה requires).
- Body → **Work Sans** (400/600) — neutral, highly legible grotesque.
- Hebrew body → **Assistant** (400/600) — Work Sans is Latin-only, so Hebrew body text uses Assistant.

The brand concept sheet originally named **Knockout Bauhaus** (display) and **Neue Haas Grotesk** (body) — both commercial, Latin-only, and Hebrew-incapable, so Rubik + Work Sans are the chosen, locked replacements. For fully offline/self-hosted production, drop `.woff2` files into `assets/fonts/` and repoint the `src:` URLs in `tokens/fonts.css` (rendering is identical).

## Content fundamentals

**Voice:** young · Israeli · sustainable · Tel-Aviv/coastal · fresh, not corporate. The test: *would a sharp 25-year-old Tel-Aviv marketer say this, or does it sound like a bank?*

**The name:** מרווה = sage (the plant), and by sound evokes "quenches thirst" — use it as brand rationale (name + sage color + leaf mark all point at one idea), not as a slogan. No pun tagline is used.

**Rules:**
1. Speak to the client's *exposure*, not the water. Lead with "your brand in everyone's hand," not "refreshing mineral water."
2. Concrete over vague — name the beach, the promenade, the event ("מחלקים בחופים, בטיילת ובאירועים"), not "maximum exposure."
3. Warm, not salesy — no exclamation-mark spam, no fake urgency.
4. Short sentences — Hebrew reads dense; one idea per line.
5. Honest scope — the advertiser owns the background + a defined design zone, **not** the whole label (kosher mark, deposit mark, barcode, mineral table are legally fixed). Say "הרקע ואזור עיצוב מוגדר שלכם," never "הכל על התווית שלכם."
6. Sustainability is a quiet undertone, not a shout — sage implies natural; the bottle is still PET plastic, so don't over-claim eco-virtue.

**Do / Don't** (from the source voice doc):
- Do: "המותג שלכם, ביד של כולם" · Don't: "!!!פרסום מטורף במחיר הכי זול"
- Do: "נקודות חלוקה בחופים ובטיילת ת״א" · Don't: "חשיפה בכל מקום בארץ" (vague)
- Do: "הרקע ואזור עיצוב מוגדר הם שלכם" · Don't: "הכל על התווית שלכם" (over-promise)

**Two audiences, one voice:** למפרסמים (advertisers) — emphasize reach & audience control ("בוחרים את הקהל, אנחנו מחלקים"). למשווקים (publishers/distributors) — emphasize the giveaway gimmick ("נותנים ללקוחות שלכם בקבוק ממותג במתנה"). Keep a shared hero, then fork — never blend into one generic pitch.

**Language:** Hebrew is the shipping language; site is RTL (`dir="rtl" lang="he"`). English is used only in the Latin "MARVA" lockup for international/advertiser decks. No emoji in the source materials — tone stays visual/typographic, not emoji-driven.

## Visual foundations

**Palette** (from the concept sheet, Option 4 "Bauhaus TLV"): Sage `#A8BFAE` (45% usage — calm, natural), Sky `#A6C9E8` (30% — clean, trustworthy), Sand `#E6DCC6` (15% — warm, Mediterranean), Charcoal Black `#111111` (10%, text + CTA anchor), White/off-white base. Sage/sky/sand are all light — never place text directly on them without checking contrast; the system defaults to black text on brand fills and reserves black-fill buttons as the CTA anchor.

**Type:** Display in bold geometric caps (Rubik, substituting Knockout Bauhaus) for the wordmark and headlines; clean grotesque (Work Sans, substituting Neue Haas Grotesk) for body/UI. Personality: bold, iconic headlines; highly readable, neutral body.

**Motifs — Bauhaus geometry:** the logo mark itself is built from Bauhaus primitives — a quarter-circle leaf shape, straight-edged rectangle, layered flat color blocks (no gradients, no bevels). Supporting graphic elements per the concept sheet: solid geometric shapes (square, quarter-circle/circle), dot grids, thin rule lines, and a single gentle wave motif (nods to water/coastline). No drop shadows or outer glow on the mark itself.

**Backgrounds:** flat solid brand-color fills or off-white — no gradients, no photographic full-bleed hero treatments in the source materials. Pale tints (sage/sky/sand at ~10% mix into off-white) are appropriate for section breaks and avatar tiles.

**Imagery:** real, candid, natural-light photography — Tel Aviv promenade, beach, palm trees, cyclists — "real moments... honest and unposed" per the concept sheet's do's/don'ts. Warm, sunny, coastal color temperature; no black & white, no heavy grain or filters. Mockups (tote bag, business card, billboard, truck livery, bottle-in-hand) show the brand applied physically, not on-screen.

**Animation:** the attachments show no animation direction (static brand sheet). Keep transitions simple and calm if added: short fades/opacity and gentle translateY on entrance, no bounce/elastic easing — consistent with the "warm, not salesy, no fake urgency" voice rule.

**Hover / press states:** none specified in the attachments; this system defaults to a subtle darken + 1px lift on hover (`Button`), and no dedicated press/active treatment beyond the browser default — flag if a real interactive spec becomes available.

**Borders & shadows:** the concept sheet's own do's/don'ts explicitly say *don't use heavy effects or gradients*. Cards use a soft, low-opacity ambient shadow (`--shadow-card`) rather than borders as the primary separation cue; borders (1px, `--color-border-default`) are reserved for form inputs and dividers.

**Corner radii:** modest throughout UI chrome (6–20px) — the brand's "roundness" already lives in the leaf mark and circular/quarter-circle motifs, so buttons use a pill radius (call-to-action emphasis) while cards and inputs stay closer to rectangular.

**Layout:** no fixed/sticky chrome specified in the attachments (the concept sheet is a static brand sheet, not a site build) — the website UI kit here uses a simple non-sticky header consistent with the "calm, not corporate" voice.

**Transparency & blur:** not used in the source materials — no glassmorphism, no backdrop-blur.

## Iconography

The concept sheet shows a small **minimal line-icon set** (bottle, people, pin, calendar, megaphone) described as "minimal line icons with consistent stroke and geometric feel" — no icon font or SVG sprite was provided in the attachments, and no icon system exists in the primary logo file. No emoji or Unicode-glyph icons are used anywhere in the source materials.

**This system does not fabricate icon SVGs.** Where an icon is needed (e.g. in the UI kit), use a close CDN match with the same minimal stroke-based style — [Lucide](https://lucide.dev) (via `unpkg.com/lucide`) is the recommended substitute: outline-only, consistent 2px stroke, geometric forms, matching the concept sheet's description. Flagged as a substitution — if the real icon set/sprite exists, attach it and this system will switch to it.

## Caveats & what's substituted

1. **Fonts**: Knockout Bauhaus + Neue Haas Grotesk are not available; substituted with Rubik + Work Sans (Google Fonts). Attach real font files to switch.
2. **Icons**: no icon asset was provided; the UI kit uses Lucide (CDN) as a close stylistic match. Attach real icon SVGs/sprite to switch.
3. **Only one logo source image** was provided (a mockup sheet, not isolated master files) — the lockup and mark-only crops in `assets/logos/` are cropped directly from that sheet, at the resolution it was supplied. If cleaner master SVG/PNG exports exist, attach them for crisper reproduction at large sizes.
4. **Reconciled to the shipped site (2026-07-14):** originally all visual foundations were read off the two uploaded images (not a live product), and the repo's palette/type were intentionally not used. That has been reversed — the shipped `global.css` @theme is now the source of truth and this system mirrors it (sky `#A6C9E8`, sand `#E6DCC6`, sage `#A8BFAE`; Rubik + Work Sans + Assistant).
