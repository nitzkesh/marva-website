---
name: marva-miluimnik-badge-assets
description: "Where the עסק של מילואימניק (reservist-owned business) artwork on the Marva site comes from — biz.tovm.org asset URLs, how each shipped asset was cut, and the two distortions hiding in the campaign's own files."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 27513505-2447-42e8-9b9b-acc43feb17c9
  modified: 2026-09-08T16:18:09.987Z
---

Marva holds the **עסק של מילואימניק** certificate (issued to נריה בן אריה,
בעל העסק מרווה). The awarding body is **מחבקים מילואימניקים** (Efrat & Hanoch
Daum), campaign run jointly with **קשת 12**. Portal: `biz.tovm.org`
(`miluim.hanochdaum.com` 301-redirects there). WebFetch gets 403; plain `curl`
with a desktop User-Agent works fine, and so does the browser pane.

**Asset URLs**
- Triangle mark, full size: `biz.tovm.org/wp-content/uploads/2025/02/logo.jpg`
  — **1078x1004** on a white plate. (The `-300x279` / `-768x715` / `-1024x954`
  variants are WordPress thumbnails of it.)
- Banner kit: `biz.tovm.org/biz_doc_banners/` — 970x250, 728x90, 320x50,
  300x250, each `_ben` (male) / `_bat` (female), plus two ZIPs holding nothing
  but those JPEGs. **970px wide is the largest the campaign publishes.**
- Campaign share card: `ix.stories.sc/2025/11/26/1764166608880-1257b75b-7ed5-44ed-a63e-b5db8444c3c5.jpg`
  — **1200x630**, linked from `story.mako.co.il/business_of_miluimnikim`. Carries
  the same lockup 34% larger than the banner does.
- Certificate montage: `2025/11/docs.png` (1144x810). Lockup is *smaller* there
  than on the banner — not a useful source.
- Keshet 12's own logo as vector: Wikimedia Commons `File:Keshet12 2018.svg`
  (620x604). Same nine-colour palette as the campaign stripe, to within 1-2 per
  channel. The "12" is punched out of the white plate path as subpaths 1..3, so
  clipping the rainbow group to those three yields a transparent, exact "12".

**How the three shipped assets in `public/miluim/` were made**
- `miluim-triangle.webp` (384x320) — from `logo.jpg`, which is the mark
  photographed askew: base tilted -8.34°, apex 112px left of the base midpoint.
  Every place the campaign *uses* it, it is upright, so one affine fitted on the
  three corners (apex = mean x of the top 1% of ink rows; BL = argmax(y-x);
  BR = argmax(y+x)) straightens it. Then un-multiplied off the white plate:
  `alpha = (255-min(rgb) - 14)/241`, colour `(c - (1-a)*255)/a`, near-white
  snapped to fully clear so JPEG noise leaves no haze.
- `miluim-keshet.webp` (163x70) — cut from the **970x250 banner**, not the
  bigger share card. See the flag distortion below.
- `miluim-paper.webp` (208x208) — the banner's own left margin (x 0..103,
  y 60..163), 4-way mirrored. Keep the patch clear of x>=109: the headline's ink
  starts there and mirrored letter fragments read as a repeating motif.

**Two distortions in the campaign's own files, both verified by measurement**
1. **The banner squashes the flag, not the "12".** The "12" glyph is undistorted
   everywhere (w/h of the "1": 0.364 on the 970 banner, 0.353 on the 300 cut,
   0.360 on the share card, 0.366 in Keshet's vector). But the flag is a third
   shorter on the banner — 1.03 "1"-heights against the share card's 1.37 —
   while lockup *width* matches to within 1%. So the bigger share-card lockup
   cannot simply be scaled into the banner's box: that squashes the "12" by 25%.
   That is why the shipped cut comes from the 970px banner and stays 1x.
2. **The triangle is not squashed** — base/height 1.229 (970 cut), 1.259 (300
   cut), 1.204 (share card), 1.208 (the straightened asset). All within noise.

**The saluting soldier exists at only ~123px anywhere public.** It appears only
on the certificate, never on the four banners. Neria settled on the **triangle**
after three rounds; the soldier extraction was deleted.

**As of 2026-09-09 the mark renders in exactly one place: inside the home-page
banner.** The header badge was dropped. `miluim-triangle.webp` is still needed -
do not delete it with the badge.

**No outbound link** to biz.tovm.org anywhere on the site: Nitzan vetoed it.

**How to apply:** the Keshet 12 + flag lockup is the one element that cannot be
sharpened from public sources. If it ever needs to be crisp, either ask Nitzan
for the campaign's source files via Neria, or composite it — Keshet's Wikimedia
vector for the "12" over a flag raster — rather than hunting for a bigger JPEG.
There isn't one.

See [[marva-campaign-banner-rebuilt]] for what the site actually renders now.
