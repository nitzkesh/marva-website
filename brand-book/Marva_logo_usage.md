# Marva — Logo Usage Rules

*Brand-book section. The rules any designer/developer follows to use the Marva logo
correctly without asking. These rules apply to the **final** logo file — they're locked
now so the Recraft→Figma production step (below) has a target to hit. Colors/fonts pull
from [Marva_brand_foundation.md](./Marva_brand_foundation.md).*

---

## 1. The logo has three forms

| Form | What it is | Where it's used |
|---|---|---|
| **Full lockup** | sage-leaf mark **+** מרווה wordmark (Rubik 700, deep sage `#5C7A4E`) | Site header, deck covers, letterhead, footer |
| **Mark only** | the sage leaf alone, `#8CA87C`, with its central vein | Favicon, IG avatar, app icon, watermark |
| **Latin lockup** *(optional)* | leaf + "MARVA" (Rubik 700) | Advertiser / international decks only |

**Leaf placement — *locked*:** leaf **leading** — it sits to the **right** of the wordmark
(first in RTL reading order). The leaf-trailing (left) version is retired as an alternate;
use leading everywhere. The optional Latin "MARVA" lockup may place the leaf left to read
in Latin order.

---

## 2. Clear space

Define one unit **L = the width of the leaf mark.** Keep a margin of **at least ½ L** of
empty space on all four sides of the logo — nothing (text, image edge, other logo) enters
that zone.

```
        ↕ ½L
  ┌─────────────────┐
½L│   🌿  מרווה      │½L
  └─────────────────┘
        ↕ ½L
```

*Why: crowding kills a small logo's legibility and cheapens the brand. ½ L is a simple,
teachable rule — measure the leaf, halve it, that's your margin.*

---

## 3. Minimum sizes

Below these, the leaf's central vein and the Hebrew glyphs break up.

| Form | Digital (min) | Print (min) |
|---|---|---|
| Full lockup | **120 px** wide | **25 mm** wide |
| Mark only | **24 px** | **8 mm** |
| Favicon (simplified) | 16–32 px — **solid leaf, drop the vein** below 24 px | — |

---

## 4. Backgrounds — where the logo is allowed to sit

| Background | Full lockup | Mark only |
|---|---|---|
| Off-white base `#FBFAF5` | ✅ default | ✅ |
| Pale-sage tile `#EEF2E6` | ✅ | ✅ **preferred for avatars** |
| White `#FFFFFF` | ✅ | ✅ |
| Sage `#8CA87C` / sky `#8FC2DE` / sand `#E6D8B8` fill | ⚠️ wordmark must switch to **off-white** `#FBFAF5` for contrast | ✅ leaf in off-white |
| Photo / busy background | ❌ unless behind a solid or ½-opacity brand-color panel | ❌ same rule |

**Contrast is the hard rule** (from the brand foundation): sage/sky/sand are all light —
deep-sage text on them fails WCAG AA. On any brand-color fill, the logo goes **off-white**,
not deep sage. Check 4.5:1 before shipping.

---

## 5. Misuse — never do these

1. **Don't stretch or squash** — scale proportionally only.
2. **Don't recolor** the leaf outside the palette (no blue leaf, no gradient-of-the-week).
3. **Don't rotate or tilt** the lockup.
4. **Don't add effects** — no drop shadows, bevels, outer glow, outlines.
5. **Don't re-typeset the wordmark** in another font. מרווה is **Rubik 700** — always.
   *(This is also the IP rule: never let an AI image tool render the Hebrew — it mangles
   glyphs and weakens ownership. The wordmark is set as real text in Figma.)*
6. **Don't crowd it** — respect the ½ L clear space (§2).
7. **Don't put it on a low-contrast or busy background** (§4).
8. **Don't recreate the leaf** freehand — use the exported master SVG only.

---

## 6. Deliverable files (what Session 1–2 exports)

For each of full lockup + mark-only:
- **SVG** (vector, primary — scales infinitely, tiny file, what the website uses)
- **Transparent PNG** at 1×/2×/3× (for tools that can't take SVG)
- On both off-white and pale-sage tile backgrounds

Plus: **favicon** (`.ico` + 32/16 px PNG, simplified solid leaf) and a **512×512 IG
avatar** (mark on `#EEF2E6`).

*Term note — **SVG** ("Scalable Vector Graphic"): a logo stored as math (curves), not
pixels, so it's razor-sharp at any size and edits cleanly. **PNG**: a pixel image with
transparency, for places SVG isn't accepted. Always prefer SVG for the web.*

---

## 7. Production workflow (the Recraft → Figma step)

Per the brand foundation, the mark is built like this — **this is the one part that needs
you at the keyboard**, because AI-only logos may not be copyrightable and the hand-finish
is what makes it ownable:

1. **You, in Recraft** (Vector engine, batch of 6–8) — generate the **leaf mark only**,
   using the prompts already written in
   [Marva_brand_foundation.md §Recraft prompts](./Marva_brand_foundation.md). Never let it
   render Hebrew.
2. **Me + you, in Figma** — take the best 1–2 leaves, simplify the paths, set **מרווה in
   Rubik 700**, lock the lockup, export SVG + PNG.

There's already a usable rough leaf at [marva-website-logo.pdf](./marva-website-logo.pdf)
— good color and gesture, but raster. We can build the lockup structure from it now as a
working placeholder and swap in your clean Recraft SVG when it's ready; nothing downstream
breaks (the website scaffolds against a placeholder by design).

---

*Rules are locked; the asset is what we finish next. Tune sizes/placement once the real
lockup is in front of us.*
