---
name: marva-label-print-fidelity
description: "The MarvaLabel demo must mirror the supplier print file exactly; resolve visual complaints by measuring the print, not redesigning"
metadata: 
  node_type: memory
  type: project
  originSessionId: fef272e3-0160-4558-877e-241745afb038
  modified: 2026-07-24T15:50:45.581Z
---

The bottle-label demo (`website/app/src/components/MarvaLabel.astro`, shown on the
advertisers page) is a pixel-measured replica of the supplier print file
`brand-book/שבלונה ואלי.pdf`. Print fidelity is the invariant Nitzan cares about:
when he reports something "off" about the label, he means it deviates from the
print — measure the print and match it, don't restyle. (2026-07-24: "text squeezed
to half" turned out to mean the source column stopped at 10.9em vs the print's
15.27em bottom; fix was band-matching type sizes, confirmed via /grilling.)

**Why:** the demo's sales pitch is "this is the real label"; any visible deviation
undermines it.

**How to apply:** rasterize the PDF via WinRT (no poppler on this machine; note the
output comes out 1.5× the requested width from DPI scaling), scan ink bands with a
per-row dark-pixel count, and compare against the render in strip-% units (1em =
1% of strip width, label height 16.51em). Headless Chrome screenshots differ from
the Browser-pane by the scrollbar width (~15px) — anchor on drawn geometry (e.g.
the deposit-box border), not on pane-measured page coordinates. The browser pane
cannot composite screenshots in headless sessions — use `chrome.exe --headless=new
--screenshot` instead. Print ink-band targets are recorded in the RIGHT CLUSTER
comment in MarvaLabel.astro.
