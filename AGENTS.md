# Marva — agent instructions

Updated 2026-11-25 at the owner's direction. Read README.md and docs/CURRENT_STATE.md first.

The approved live site https://marva-water.com is the design and behavior authority. GitHub's active production source is website/live/, recovered and verified from the live deployment. Edit that directory for published changes; deploy.yml publishes it directly after validation.

website/app/ and the local editor are historical Astro tooling and are not a production build source. Do not run their publish operations. Keep original framework source, recovered static source, live observations and untested assumptions distinct.

Use node ops/check-live.mjs before publishing. The optional --baseline mode verifies the 2026-11-25 initial recovery only. Preserve Hebrew/English behavior and unrelated content. Never submit inquiry forms merely to test.
