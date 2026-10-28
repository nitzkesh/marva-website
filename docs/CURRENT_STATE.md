# Marva — current state, 2026-10-28
## Authority
Nitzan chose the live website as the latest approved version on 2026-10-28. Priority: explicit new owner decisions -> observed live website -> current derived documents -> repository source only where matched. Earlier plans never override the site.
The brand book describes the digital brand. Supplier label templates remain the authority for production dimensions and mandatory print areas; they cannot be reconstructed from a website.

## Evidence inspected
Live pages: https://marva-water.com/ ; /advertisers/ ; /distributors/ ; /en/.
Observed CSS: /_astro/global.BSF3U-jq.css and /_astro/HomePage.COpbaBpP.css.
Observed assets: /marva-mark.svg, /intro/bauhaus.webp, /intro/dune.webp, /intro/noma.webp, /intro/tide.webp, /bottle/concepts/tide/desktop/frame-000.webp, partner images.
Live Hebrew body computed font: Assistant, Work Sans, Segoe UI, system-ui, sans-serif. Headings: Rubik.
Live palette values match the key sage/sky/sand/ink/base values in BRAND_BOOK.md.
Repository baseline: 79e0cae605b23d0a505becdef0d1bafe733d06b1, dated 2026-09-17. GitHub main and local main pointed to this commit before the docs refresh.

## Important source gap
The deployed site has a Bauhaus entry scene, bottle concepts and intro assets absent from the inspected local public directories. The local global.css declares Work Sans before Assistant; live Hebrew computes Assistant first. Matching Git commit IDs do not establish that production was built from that commit.
Do not run the local editor's publish operation, push website/app changes, or manually deploy this checkout until the actual live-source revision is recovered and compared.
The automatic deploy definition reacts to website/app/** and its own workflow file. This refresh deliberately changes documentation outside those paths.

## Product as observed
- Home: Bauhaus opening, free-water message, bottle demonstration, Cinema City/Kapayim partner display, strategic locations/events, audience choices, reservist badge, upcoming placeholders, inquiry form.
- Advertisers: label advertising, shared-label option, choice of self-distribution or Marva distribution, three-step quote/design/distribution sequence, campaign inquiry.
- Distributors: advertiser-funded bottles, free-stock message, service/traffic benefits, business-type list, distribution inquiry.
- English home and navigation exist; brand examples partly retain Hebrew text.
- Public contact: 054-5244339; marvawater.info@gmail.com; Instagram marvawater.il.
- Upcoming locations show Soon/TBA rather than confirmed events.
- TikTok, YouTube, LinkedIn and Facebook links currently resolve to 404 routes. Do not turn these into claimed active channels.

## What was not tested
No form was submitted, no email sent, no deployment performed, no server started. Inquiry delivery, analytics accuracy, source/build provenance, live dependency versions, legal claims and print compliance were not certified.
The advertiser counters were seen during animation; no ROI/exposure number is adopted as a verified brand fact.
