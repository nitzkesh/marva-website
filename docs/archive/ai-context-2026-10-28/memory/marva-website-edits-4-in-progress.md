---
name: marva-website-edits-4-in-progress
description: "Marva repo working-copy state — main == origin/main == f9982f6 (2026-08-23), everything pushed and live, nothing open; Dependabot guards deps and actions; the MAIN working copy sometimes carries uncommitted parallel edits (Grok) while worktrees stay clean, so localhost and live can differ. Which copy port 4321 serves depends on session CWD. astro dev hanging without binding has two causes, not one."
metadata: 
  node_type: memory
  type: project
  originSessionId: a7ad654e-6c75-4fb4-8148-660e752945ee
  modified: 2026-08-22T11:08:16.380Z
---

**2026-08-23 — everything pushed and live.** `main` == `origin/main` == `cc00031`.
Five commits: Valley partner logo on the home conveyor (approved by Valley), then
an infra pass — actions v4→v7, lockfile refresh clearing 9 advisories (8 high, via
undici and svgo), least-privilege token + deploy concurrency + Node 22→24, and
Dependabot plus the two security headers Cloudflare does not set. All deploys
green, all verified live.

**Dependabot guards this repo** (npm weekly on `/website/app`, github-actions
monthly; minor/patch grouped, majors alone). Its first PR — motion 12->13 — was
reviewed side by side on two dev servers, approved by Nitzan, merged and deployed.

**Conveyor belt has three invariants that are easy to break.** All documented in
`global.css` and `HomePage.astro`; re-measure if the chip set changes.
(1) Loop period (one track width) must exceed the ~1104px viewport or a chip shows
twice at once — Hebrew binds, its chips being far narrower than English; 5 chips
forced the md+ gap 80px->112px.
(2) Speed, not duration, must stay constant — a fixed 35s over a narrower mobile
track gave 0.356px/frame, which reads as chips stepping. Corrected 2026-09-01:
duration needs a LOCALE axis too, not just a breakpoint one. EN chips have always
summed wider than HE's, so one duration per breakpoint can only ever be right for
one locale (EN was silently running 8% fast). Now four values keyed on
locale x breakpoint, all at ~34px/s: HE 36s desktop / 23s mobile, EN 39s / 26s.
(4) NEW, and the nastiest: a media query contributes NOTHING to specificity, so
`html[lang='en'] .conveyor-marquee` (0,2,1) outranks the reduced-motion block's
bare `.conveyor-marquee` (0,1,0) and source order cannot save it. Any
locale-scoped conveyor rule MUST be repeated inside the
`prefers-reduced-motion: reduce` block or the belt keeps scrolling on /en/ for
readers who asked it to stop. This sat latent for months — EN overrode only
animation-name, and the shorthand still forced duration to 0s, so nothing moved;
adding a real animation-duration at that specificity is what armed it.
(3) Track copies must stay at 2, not 4 — four made the mobile marquee 8979 device
px wide at 3x, past the 8192 max texture size on many mobile GPUs, so the
compositor tiled it and the per-cycle snap exposed unrastered tiles as a one-frame
blank. Two copies (4490 device px) is the minimum that still covers the viewport,
and it is only sufficient BECAUSE invariant (1) holds.

**Useful technique:** deterministic frame sampling via
`chrome --headless=new --virtual-time-budget=N --screenshot`, then comparing ink
counts and pairwise pixel diffs, distinguishes a real geometry/coverage gap from a
rasterisation artifact. Always check consecutive frames actually DIFFER, or the
test is vacuous. Compositing itself cannot be measured here — headless renders in
software, and a control animation that must composite reports main-thread too.

**Deliberately not done, with reasons** (do not "fix" these without thinking):
CSP — the Cloudflare edge injects its own inline scripts (email obfuscation, bot
challenge), so a strict policy breaks the live site. HSTS — effectively
irreversible, belongs in the Cloudflare dashboard. npm caching in CI — ~10s saved
on a 28s build, not worth the cache-poisoning surface. A sitemap needs an i18n
hreflang decision for the he/en pair, so it is not a drive-by.

As of 2026-08-19 `origin/main` == `09fa5aa` (KPI 1s cadence + label manufacturer
redaction), and the main working copy was clean apart from `.claude/launch.json` —
no parallel Grok edits were present that round, so the trap below did not bite. Deploy is GitHub Actions →
Cloudflare Pages, triggered on push to `main` touching `website/app/**`. So
**live == whatever is PUSHED to origin/main** — committing locally deploys nothing.

**After a deploy, the edge serves stale HTML for a minute or two.** Right after the
run goes green, some pages can still reference the old asset. Re-check with a
cache-buster query (`?cb=$RANDOM`) before concluding the deploy was partial — that
hits origin. Deleted assets also keep returning 200 from the edge for a while even
though origin 404s.

**`astro dev` starting but never binding port 4321 has THREE causes — check all.**
(a) A fresh `.claude/worktrees/*` checkout has no `node_modules`; run `npm ci` in
`website/app`. (b) Confirmed 2026-08-20: with `node_modules` fully present it still
hung twice, silently — the real cause was zombie `node.exe` processes left by a
killed session plus a corrupt `node_modules/.vite`. `preview_logs` shows only the
npm banner and nothing else, and `netstat -ano | grep :4321` shows nothing bound.
Fix: `preview_stop`, check `tasklist //FI "IMAGENAME eq node.exe"` for strays, then
`rm -rf website/app/node_modules/.vite website/app/.astro` and restart — bound in
~3s after that. Do not stop at "node_modules exists, so that's not it."

(c) Confirmed 2026-09-09, and the one to suspect FIRST now: **Astro 7 daemonizes.**
`astro dev` forks a detached background server and the foreground command returns
immediately — see `website/app/CLAUDE.md`. So `preview_start` never holds the real
server: `preview_logs` shows only the npm banner (plus a stray client-side
`[vite] connected.`), `preview_stop` kills the wrapper and can leave the daemon,
and the harness's port bookkeeping goes stale — it reported 4321 "in use by
another chat" while `netstat` showed nothing bound at all. Daemon state lives in
`website/app/.astro`, which is why the cause-(b) `rm -rf` fixes this too, by
accident. Diagnose with `node node_modules/astro/bin/astro.mjs dev status` from
`website/app` (NOT `node_modules/astro/astro.js` — that path does not exist); it
prints the real port and pid. Manage with `astro dev stop|status|logs`. Ports are
whatever the daemon actually took, so read them rather than assuming 4321.

**The trap that keeps recurring: localhost ≠ live.** Which copy port 4321 serves is
NOT fixed — corrected 2026-08-20: `preview_start` resolves `.claude/launch.json`
relative to the session CWD, so a session running inside a worktree serves the
WORKTREE, and only a session rooted at `C:\AI\nitz-workspace\Marva` serves the main
copy. Determine it, don't assume it. Nitzan runs Grok in parallel on that same working copy when his Claude
usage runs out, so the main copy routinely carries uncommitted edits while any
`.claude/worktrees/*` checkout is clean at HEAD. That difference is exactly what
Nitzan means when he says "the localhost edit website is not the same version of
the live one."

**Why:** two agents share one working tree, and only one of them commits.

**How to apply:** at the start of any Marva session, run `git -C
"C:\AI\nitz-workspace\Marva" status --short` **against the main repo path, not the
worktree** — a clean worktree tells you nothing about what localhost is serving.
Then read `git -C "C:\AI\nitz-workspace\Marva" diff` in full before editing any file
it touches; the parallel edits are usually attempts at the same issues you were
just asked to fix, and they may be wrong, partial, or contradict the brief. Back
the diff up to `.scratch/backups/*.patch` before replacing it — that makes the
overwrite reversible and removes the need to block on asking.
Reading the actual file content is the only reliable detection; `git diff --stat`
line counts have failed to reveal a full rewrite before. See
[[marva-motion-cannot-be-verified-in-browser-pane]] and
[[marva-label-print-fidelity]].
