# Marva — current production source

Updated 2026-11-25. The owner designated https://marva-water.com as the source of truth and requested that GitHub be reconciled to it.

## Edit and deploy

**website/live/** is the authoritative, deployable static website: HTML, CSS, JavaScript and assets. These are the actual published files recovered from Cloudflare Pages, not a new rendering of the outdated Astro checkout. Edit the relevant files here. Both Hebrew and English are included.

Run `node ops/check-live.mjs` to check required routes and local asset references. To preview locally, serve `website/live` with a static HTTP server. Merge changes to main to deploy that exact directory to the existing marva-website Pages project. Production access and domains are unchanged.

**website/app/** is preserved as historical Astro source. It does not reproduce the approved production site and is no longer the production build input. Do not deploy it or use the legacy editor publish operation. A future return to an Astro build requires a separate visual and functional reconciliation.

## Recovery evidence

- Immutable baseline: https://143b6a4f.marva-website.pages.dev
- Deployment: 143b6a4f-a48c-4b6e-abae-a04961649b4e, published 2026-11-22.
- Recovered 1,023 public files (76,921,539 bytes before the copy edit). Every file passed the original Cloudflare BLAKE3 content-hash check.
- 30 dot-prefixed build artifacts are recorded in the baseline manifest but intentionally excluded from the public deployment source.
- The sole visible change is removal of “וחתונות” from the Hebrew homepage events sentence. English content is unchanged.
- `ops/live-baseline.json` preserves the full original manifest.
- `ops/live-recovery-report.json` records each recovered file's SHA-256, size and original Cloudflare hash.
- `node ops/check-live.mjs --baseline` verifies the initial reconciliation byte-for-byte while allowing only that exact copy edit. This historical check is not appropriate after future approved edits.

See [current state](docs/CURRENT_STATE.md) and [brand book](brand-book/BRAND_BOOK.md). Preserve the existing site appearance and behavior for bounded edits.
