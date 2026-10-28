# Marva — technology reference
As of 2026-10-28. This distinguishes deployed observations from source declarations.

| Layer | Evidence | Confidence |
|---|---|---|
| Site framework | Live /_astro/ assets; local Astro app | Astro deployed; exact live version not established |
| Styling | Live global CSS; source @tailwindcss/vite and Tailwind | Token-based CSS; Tailwind declared in source |
| Animation | Live gsap / ScrollTrigger bundles | Observed deployed |
| Fonts | Google Fonts: Rubik, Assistant, Work Sans | Observed deployed |
| Delivery | Cloudflare scripts/beacon on live page; source Pages deploy workflow | Cloudflare observed; exact current deployment route not certified |
| Local content editor | website/editor/server.mjs, Express ^4.21.0 | Repository-only tool, port 5599 |
| Forms | Source endpoint api.web3forms.com/submit; live forms visible | Source provider identified; live delivery not tested |
| Local site preview | Astro, port 4321 | Source declaration |
| Content model | content.he.json, content.en.json, sections.json, content.ts | Source declaration; not proven identical to live content |

## Declared source dependencies, not guaranteed live versions
At baseline 79e0cae605b23d0a505becdef0d1bafe733d06b1:
Astro ^7.0.6; Tailwind CSS and @tailwindcss/vite ^4.3.2; GSAP ^3.15.0; Motion ^13.1.1; tw-animate-css ^1.4.0; Wrangler ^4.108.0.
Node requirement >=22.12.0; deploy workflow requests Node 24.
A package range is not a resolved version. The lockfile and actual production build must be reconciled before upgrade/deployment claims.

## Source layout
website/app/src/pages: Hebrew and English routes.
website/app/src/components: page/section UI.
website/app/src/styles/global.css: source design tokens.
website/app/src/data/content.ts: typed accessor/shared constants.
website/app/src/data/content.he.json and content.en.json: locale copy.
website/app/src/data/sections.json: section visibility.
website/app/public: static assets.
website/editor: local editing UI/server.

## Operations
The current repository workflow deploys after matching pushes to main, using npm ci, npm run build, then Wrangler Pages deploy to marva-website.
Do not deploy the inspected checkout now: production contains newer/different assets and font behavior. Obtain the live-source revision first.
The editor has a publish control; avoid it until source parity is verified. Previewing the local code is not proof of production parity.
Marva editor and preview can run independently of portfolio-ai. No investment tool, broker credential or Mission Control service is required.

## Boundaries
No online checkout observed. No backend database, CRM, analytics correctness, form delivery or production runtime version was verified. Do not import old Base44/Next.js/Netlify alternatives as current architecture.
