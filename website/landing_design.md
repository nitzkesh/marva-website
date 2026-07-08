# Marva Landing Page — Design Direction

> **Superseded 2026-07-09.** This describes an earlier landing design (audience-fork layout,
> deep-sage palette) that has been replaced. The live site (`app/src/pages/index.astro`) and
> `brand-book/Marva_brand_foundation.md` are the current sources of truth; palette hexes below
> are the retired pre-reconciliation values. Kept as historical rationale only.

Design decisions locked before coding. Every choice answers: "why this, not the generic default?"

---

## Anti-defaults (what we're deliberately avoiding)

| Generic AI pattern | Our approach |
|---|---|
| Centered everything, symmetric grid | Asymmetric layouts, editorial alignment, RTL-native flow |
| Gradient blobs, glass cards | Organic leaf-derived shapes, solid brand colors, real depth via shadow + layering |
| Icon grids with emoji/SVG icons | Large typographic numbers, whitespace, real copy doing the work |
| Uniform card pairs | Asymmetric emphasis — different accent tints per audience |
| CSS `fadeIn` / `slideUp` reveals | GSAP ScrollTrigger with parallax, stagger, scrub — hardware-accelerated transforms only |
| Flat section boundaries | Organic SVG curves between sections (leaf-inspired undulation) |
| Tiny safe type, uniform scale | Dramatic fluid type scale — hero at ~4.5rem desktop, strong contrast between heading/body |

---

## Typography scale (fluid, clamp-based)

```
Hero H1:     clamp(2.75rem, 5vw + 1rem, 4.5rem)   — Rubik 700
Section H2:  clamp(1.75rem, 3vw + 0.5rem, 2.75rem) — Rubik 700
Card H3:     clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem) — Rubik 700
Body:        1rem / 1.125rem                         — Assistant 400
Small/meta:  0.875rem                                — Assistant 400
```

Line heights: headings 1.1, body 1.65, tight captions 1.4.

---

## Color rhythm (section backgrounds)

```
Header:       base (#FBFAF5) with backdrop-blur
Hero:         base, with oversized leaf silhouette in pale-sage (#EEF2E6) at 40% opacity
How it works: pale-sage (#EEF2E6) full bleed
Audience:     base
Distribution: ink (#5C7A4E) full bleed, inverted text
Order form:   pale-sage
Footer:       base, minimal
```

Accent usage: sage (#8CA87C) for decorative elements + step numbers. Sky (#8FC2DE) as secondary accent on the משווקים card to differentiate it from the מפרסמים card (which uses sage tint). Sand (#E6D8B8) for borders, dividers, subtle backgrounds.

---

## Section-by-section design

### 1. Header (sticky)
- Glass-effect: `backdrop-blur-sm`, base/80 opacity, thin sand border bottom
- Logo left (well, right in RTL), nav center-ish, CTA button right (left in RTL)
- **Mobile**: hamburger icon → full-screen overlay with large stacked nav links + leaf decoration
- GSAP: header shadow increases on scroll (subtle `boxShadow` tween tied to scroll)

### 2. Hero
- **Layout**: 2-column asymmetric grid (text 60% / image slot 40%), text on the right (RTL start)
- **Background**: large leaf SVG silhouette (simplified, single path) positioned top-left, 30-40% opacity in pale-sage, rotated ~15deg. Parallaxes at 0.3x scroll rate via GSAP
- **Type**: eyebrow in sage → H1 in massive fluid size → subhead → CTA row → trust line
- **GSAP entrance** (on load, not scroll): H1 words stagger up (y:40→0, opacity), 80ms apart. Subhead fades 200ms after last word. CTA slides up 100ms after subhead. Trust line fades last.
- Image slot: styled placeholder (dashed border, hatched bg, Hebrew description)

### 3. How it works (3 steps)
- Pale-sage background
- Centered H2, then 3-column grid
- Each step: oversized number (Rubik 700, 4xl, sage color) → heading → body text
- **GSAP**: steps stagger in from bottom (y:60→0, opacity:0→1) with 150ms intervals, triggered when section enters viewport. Numbers have a subtle scale pulse (1.0 → 1.05 → 1.0) after appearing.

### 4. Audience fork (למפרסמים / למשווקים)
- Centered section header + subhead
- 2-column grid with distinct card treatments:
  - **מפרסמים card**: white bg, sage-tinted left border (4px), subtle sage gradient at top
  - **משווקים card**: white bg, sky-tinted left border, subtle sky gradient at top
- Cards have check marks in their respective accent color
- **GSAP**: cards slide up with 120ms stagger, slight scale (0.97→1.0)

### 5. Distribution / Social proof
- Full-bleed ink (#5C7A4E) background — this is the dramatic dark section
- Inverted text (off-white)
- Location chips: pill-shaped, outlined in base/40, arranged in a centered flex-wrap row
- **GSAP**: section heading slides up, then chips stagger in (y:20, opacity) with 60ms intervals
- Subtle decorative leaf SVG in the background, very low opacity (0.05), large scale

### 6. Order form
- Pale-sage background for visual separation
- Centered H2 + subhead
- Form card: white, rounded-3xl, generous padding, subtle shadow
- **Form layout**: single column on mobile, two columns on desktop for the field pairs (name+id, contact+phone, etc.)
- **Fields**: clean bordered inputs with labels above (not floating — better for RTL/Hebrew). Focus ring in sage color.
- **Delivery method**: radio group with conditional sub-fields that animate open (GSAP height tween — exception to the no-height rule since it's a small form toggle, not a scroll animation)
- **Submit button**: full-width, ink bg, large padding, hover → ink-strong
- **Pre-tagging**: hidden field auto-set based on which CTA the user clicked (למפרסמים vs למשווקים)
- Email submission: placeholder endpoint (provider TBD)

### 7. Footer
- Minimal: logo, tagline, copyright
- Single row on desktop, stacked on mobile

---

## GSAP implementation plan

**Dependencies**: `gsap` (includes ScrollTrigger, ScrollToPlugin as free plugins)

**Architecture**: single `<script>` block in Layout.astro that:
1. Imports `gsap` and `ScrollTrigger`
2. Registers ScrollTrigger
3. Sets up all animations by targeting CSS classes/IDs
4. Uses `gsap.matchMedia()` for responsive animation differences (disable parallax on mobile for perf)

**Performance rules**:
- Only animate `x`, `y`, `scale`, `opacity`, `rotation` (GPU-composited properties)
- Exception: form conditional fields use `height` tween (small, user-triggered, not scroll-driven)
- Use `will-change: transform` sparingly (only on parallax elements)
- `ScrollTrigger.refresh()` after any layout change
- Disable complex parallax on `prefers-reduced-motion: reduce`

---

## Mobile nav

- Hamburger button (3 lines, animates to X on open via GSAP)
- Full-screen overlay: ink background, large nav links in Rubik 700, stacked vertically
- GSAP: overlay slides in from top (y: -100% → 0), links stagger in (y:20, opacity, 80ms each)
- Close on link click (smooth scroll to section) or X button

---

## Accessibility

- All animations respect `prefers-reduced-motion: reduce` — GSAP checks this, falls back to instant state
- Form inputs have proper `<label>` elements, not just placeholders
- Color contrast: all text/bg pairs meet WCAG AA (4.5:1) — already verified in brand foundation
- Focus-visible rings on interactive elements
- Skip-to-content link (hidden until focused)
