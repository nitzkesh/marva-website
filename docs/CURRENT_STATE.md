# Marva — current state, 2026-11-25

## Authority and reconciliation

The owner explicitly selected the live site as the source of truth, and asked for GitHub to be synchronized to it. The approved 2026-11-22 deployment was recovered from its immutable Pages URL, with all 1,023 public files checked against the deployment's original content hashes. These exact files now live in website/live/. This closes the production reproducibility gap by making the published static output the canonical editable and deployable source.

The earlier Astro code under website/app remains historical. It has not been certified to produce this output. Source component restoration is not implied by recovering HTML/CSS/JS. Deployment no longer builds that historical tree.

## Approved change

The Hebrew homepage Events card now says:
אירועי ספורט ותרבות, כנסים, הרצאות, סמינרים

Only the trailing word וחתונות was removed. The photos approved on November 22 remain present on both Hebrew and English homepages. The initial recovery validator reconstructs the original sentence and requires exact SHA-256 equality for every recovered file.

## Deployment

GitHub main -> validate website/live -> Cloudflare Pages marva-website. Existing domains: marva-water.com and www.marva-water.com. Only website/live, its validation script, and the deploy workflow trigger publication. The deployment workflow has read-only repository permissions.

The original full Cloudflare file manifest and per-file recovery report are retained under ops/. Thirty dot-prefixed internal build files are listed for provenance but are not public source inputs.

## Product and verification scope

The site retains the existing home, advertiser, distributor and privacy pages in Hebrew and English, intro animation, bottle animation, partner display, imagery, forms and links. Recovery is byte-for-byte except the approved text edit. Forms were not submitted. Existing placeholder content and social links were not changed.
