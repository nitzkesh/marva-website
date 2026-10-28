---
name: marva-campaign-banner-rebuilt
description: "The home-page מחבקים מילואימניקים banner is now rebuilt in HTML/CSS (live text + two mark images), not the campaign's flat JPEG — how its cqw geometry was derived and what is deliberately NOT pixel-identical."
metadata: 
  node_type: memory
  type: project
  originSessionId: 27513505-2447-42e8-9b9b-acc43feb17c9
  modified: 2026-09-08T16:18:41.202Z
---

**As of 2026-09-08 the campaign banner is a rebuild, not an image.** This
reverses what round 6 shipped, where the official 970x250 / 300x250 artwork was
placed 1:1 as WebP *because Neria had rejected an earlier hand-built version*.
Nitzan asked for the rebuild directly, and on 2026-09-09 closed the question of
running it past Neria first as irrelevant — **do not raise it again.** It is
shipped. If Neria ever queries it himself, the answer is that the difference
from the version he rejected is that every measurement now comes off his own
files rather than being eyeballed.

**Why rebuild:** the image was 1x at 970px, so it was the only soft element on
the page on any retina screen; and at 970px it sat 37px proud of the
`max-w-4xl` (896px) buttons above it and #upcoming card below. Live text fixes
both. Assets went 91KB -> 60KB.

**The geometry is measured, not designed.** Everything in the `.miluim-*` block
in `global.css` is quoted in `cqw` against two reference grids — 970x250 wide,
300x250 narrow — so a value of N artwork-pixels is `N/970*100` cqw (or
`N/300*100` inside the container query). That is why the numbers look
arbitrary. **Re-derive them from the artwork; never nudge them by eye.**
Verified: wide headline 76.92% of plate (target 76.91), sub 62.46% (62.47);
narrow lines 121.1/174.4/95.5 against 122/172/96, sub 270.5 against 269, both
marks exact.

A **container query on `.miluim-banner`, not a media query** — the composition
has to switch on how wide the *plate* is. Threshold 560px is where the wide
cut's sub-headline drops under ~17px.

**What is deliberately not pixel-identical**
- **The typeface.** The campaign's face is a condensed heavy Hebrew sans, not a
  free font. Of every Google Hebrew face, matched on x-height, Heebo 900 is
  closest on metrics (2.2%) but reads far too light; **Rubik 900** — already the
  site's `--font-display` — matches the weight and colour best. Sized to match
  the *line width*, which leaves the x-height ~6% larger than the original.
  Matching width preserves the composition; that was the call.
- **The Keshet 12 + flag lockup** stays a 1x 163px raster. No larger source
  exists — see [[marva-miluimnik-badge-assets]].

**Three traps that cost real time here**
- `.miluim-plate` **must** set `font-family: var(--font-display)` explicitly.
  Inheriting from `body` gives Work Sans, which has **no Hebrew at all**, so it
  falls through to Assistant on /he and the system Hebrew face on /en — silently
  wrong metrics, and it looked plausible enough to nearly ship.
- **`.map()` emits adjacent elements with no text node between them**, so the
  headline's three `<span>`s rendered as one word on the wide cut. The fix is a
  leading space *inside* each span: it spaces the words while they are inline,
  and CSS trims it at the start of a line once they become blocks.
- **`direction: ltr` on the marks row.** Mark order is artwork, not text; a flex
  row inherits the page's RTL on /he and swaps the triangle and the lockup.

The entry animation is just `.miluim-plate` added to the existing
`ScrollTrigger.batch` list in `shared.ts` — the same 30px/0.6s/power2.out every
card on the site uses. The banner was previously the one home-page section that
never entered. Its motion **cannot be watched in the browser pane** (see
[[marva-motion-cannot-be-verified-in-browser-pane]]); verify statically by
checking that `gsap.set` applied `opacity:0; translate(0,30px)` to the plate.

**The header badge is gone entirely (2026-09-09).** It briefly picked up the new
384px triangle; then Nitzan said "we decided to go without the logo on the
header." Removing it was not a one-line delete - three things in `Header.astro`
were built around it:
- the right cluster's `dir="ltr"` wrapper and its `gap` existed only so the badge
  landed inboard of the CTA in both locales, and the `dir` const only existed to
  restate direction inside that wrapper. All gone; the cluster now mirrors the
  hamburger's wrapper.
- `logoShift` is `(cta - 40)px` below a breakpoint of `2*cta + logo + 32`, and
  the badge was ~51px of that cluster. Re-derived: /en/ 80px below 400px (was
  128px below 496px); **HE now needs no shift at any width** - its threshold
  falls to 301px, under the 320px floor.
- `wordmarkClass` hid the /en/ wordmark below 360px because the badge would not
  fit beside it. The true requirement is now 316px; it is set to 336px to leave
  ~10px for the fallback face rendering wider before Rubik swaps in.
Verified at 320/336/375/400 in both locales: no overflow, both gaps positive.
`miluim.badgeLabel` was deleted from both content JSONs too - the local editor
renders unmapped keys as live fields, so leaving it would have offered an input
that changes nothing.
