---
name: marva-motion-cannot-be-verified-in-browser-pane
description: "GSAP/ScrollTrigger motion on the Marva site cannot be verified in the Claude browser pane — rAF is suspended while the pane is hidden, so tweens freeze at their `from` state and look broken when they are fine."
metadata: 
  node_type: memory
  type: project
  originSessionId: 4f2540e9-0c2c-4da9-8273-8e97d3c0febc
  modified: 2026-08-12T08:22:34.484Z
---

When the Claude browser pane is not displayed it stops compositing frames, so
`requestAnimationFrame` never fires. GSAP's ticker runs on rAF, so every
ScrollTrigger reveal on the Marva site sits frozen at its `.from()` state
(`opacity: 0`, `translateY(30)`) and screenshots fail with "the Browser pane is
not displayed". This looks exactly like broken animations but is not.

**How to tell it apart:** call `ScrollTrigger.refresh()` then read the trigger's
`progress`. If progress is correct (e.g. 0.938) while the element is still at
`opacity: 0`, the trigger logic is fine and only the ticker is dead. A stale
`t.scroll()` returning 0 while `window.scrollY` is non-zero is the same artifact,
not a wrong scroller — `t.scroller` is `window` and `document.scrollingElement`
is `HTML`, both correct.

**How to apply:** verify motion *statically* — trigger start/end values, the
server-rendered final state in `dist/*.html`, and computed layout after
neutralising the animation with
`.kpi-item,.kpi-icon{opacity:1!important;transform:none!important}` injected as a
style tag. Then tell Nitzan explicitly that the motion itself needs his eyes.
Never report site animations as broken from this environment, and don't "fix"
working ScrollTrigger code based on it.

Corollary: the advertisers page's `MarvaLabel` pin (`pin: true`, `scrub: 1`) will
look like it breaks sibling reveals here. It does not — that comparison came from
the same dead-ticker signal. `?label-static` is the repo's own QA escape that
disables the pin. See [[marva-label-print-fidelity]].

**Stronger workaround than static-only checking (found 2026-08-19):** the timing
itself CAN be proved headlessly. Import the app's own gsap from
`website/app/node_modules/gsap/index.js` in a Node script, rebuild the timeline
exactly as the component builds it (plain objects stand in for the DOM nodes —
scheduling does not care), then read `tl.getChildren()` start times and step the
playhead with `tl.time(t)` in small increments. Stepping matters: `tl.progress(1)`
jumps in one tick and every `.call()` callback fires inside that jump, which reads
as all of them firing at the end. Note gsap is bundled ESM in this app, so
`window.gsap` does NOT exist in the page and the live timeline cannot be
introspected from the browser pane at all.
