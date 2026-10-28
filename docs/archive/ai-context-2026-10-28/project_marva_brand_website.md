---
name: project-marva-brand-website
description: "Marva brand book + website build — 5-session plan, stack, Figma file key, current progress"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9ef3ed01-c5c7-4340-9097-d05aa7be9909
  modified: 2026-07-22T13:27:33.486Z
---

**Marva** (מרווה = sage) — Israeli bottle-advertising company: produces mineral water
whose label IS the ad space, gives bottles away free for exposure. Nitzan is building its
**brand book + website** (context folder: `C:\AI\nitz-workspace\Marva`). Two customer
types drive everything: מפרסם (advertiser, Marva distributes) + משווק (publisher, hands
out bottles themselves) — NOT the manufacturer (supplier).

**Approved 5-session arc:**
1. Logo + brand system (voice/messaging + logo usage docs + Figma lockup)
2. Label mockups (real supplier artboards: Mei Eden 210×42mm, Ein Gedi 214×41mm, locked
   regulatory zone) + assemble brand-book PDF
3. Website scaffold + content (Astro+Tailwind, Hebrew/RTL) — copy for sections 2–5 drafted
   from scratch by me (Neria's "existing" copy doesn't exist; only hero is written)
4. Order form (mirrors טופס הזמנה, emails submission, no payment processor) + launch
5. Templates (Quote/NDA/advertising-IP agreement — drafts pending lawyer) + IG social kit

**Stack:** Astro + Tailwind + Cloudflare Pages (free), Base44 fallback. Figma MCP for brand
(I drive it), Canva fallback. **Recraft** for the leaf mark = Nitzan's manual step (I have
no Recraft access; AI-only logo isn't copyrightable, human finish = ownership). Fonts:
Rubik (Bold=700 headings/wordmark) + Assistant (body) — both free Google Fonts, Hebrew.
Palette: sage #8CA87C, sky #8FC2DE, sand #E6D8B8, ink/deep-sage #5C7A4E (text+CTA),
ink-strong #2E332B, base off-white #FBFAF5.

**Figma file:** "Marva — Brand Book", key `cVHo8FDdaXGU9crTcVKYza`. Figma account seat is
"view" tier but personal drafts are still editable. Path parser needs SPACE-separated
vector path data (commas throw). **Figma MCP hit the Starter-plan tool-call rate limit
mid-Session-1 (blocks reads too, account-wide) and was still blocked as of Session 2** —
check before assuming it's usable; Nitzan was going to check figma.com/pricing himself.
**Nitzan's working theory (as of Session 3, unconfirmed): the limit is a daily reset, not
hourly — plan to retry Figma the next calendar day, not just after a short wait.**

**Canva MCP is unsafe for anything with Hebrew text** — confirmed via test: its AI
Magic-Design layout engine corrupted מרווה into a garbage string (ריהשהת) in one placement
on an otherwise-correct design. Don't use Canva for Hebrew wordmarks/copy; browser-rendered
HTML (real text, no AI shaping) is safe and is the fallback pipeline now in use.

**Working pipeline while Figma is down:** plain HTML/CSS + headless Chrome
(`chrome.exe --headless --print-to-pdf` / `--screenshot`), fonts pulled live from Google
Fonts (confirmed working, needs network + `--virtual-time-budget` to let fonts load).
Gotcha: local `file://` images silently fail to load specifically in `--print-to-pdf`
mode (worked fine in `--screenshot` mode) — inline SVGs directly as markup and embed PNGs
as base64 data URIs instead of `<img src="file://...">`. Second gotcha: raw SVGs (e.g. from
Recraft) carry hardcoded `width`/`height` attributes that override CSS container sizing —
strip them (keep `viewBox`) before inlining, or the image renders at native/huge size and
blows out page layout.

**RTL/bidi gotcha (recurring — check every doc):** mixing an English aside in parentheses
directly inside RTL-direction Hebrew text (e.g. `חשיפה בכל מקום בארץ (vague)`) triggers the
Unicode bidi algorithm's bracket-mirroring rule and the parens render swapped/backwards.
Fix: wrap the English parenthetical in `<span dir="ltr">(vague)</span>` to isolate it.
Found and fixed in the brand book's voice & tone table.

**Real supplier files matter — go find them before approximating.** Session 2 started by
proxying the label constraints from delivery-plan prose (assumed "locked zone = right
third"). Partway through, Nitzan dropped the actual supplier print specs into the folder
(`Marva/brand-book/שבלונה מי עדן.pdf`, `שבלונה עין גדי.pdf` — note **folder was renamed
Brand→brand-book, Website→website** mid-session). The real files show mandatory content
spanning **nearly the full label width on both suppliers**, not just a third — the
delivery-plan's model was a simplification. Corrected assumption (confirmed by Nitzan):
Marva commissions a **wholly custom label layout per client** (same physical spec +
mandatory content, freely arranged), not "print into the leftover gap of an existing
label." Still open: confirm this with Neria; decide if Ein Gedi (adds a full Arabic
declaration block) is in scope alongside Mei Eden.

**Don't use third-party Claude Desktop patches/mods** — Nitzan surfaced
github.com/shraga100/claude-desktop-rtl-patch for an RTL bug; investigated via `gh repo
view` and declined: it repacks the Desktop app's files with admin/UAC elevation, installs
a self-signed cert into the Windows trust store, and can add a persistent background
scheduled task. Also irrelevant here — it patches the Desktop chat UI, not documents
rendered via headless Chrome (separate rendering pipeline entirely).

**Session 1 done:** wrote [voice/messaging] + [logo usage] docs in Marva/brand-book/; built
a vector leaf-mark placeholder + מרווה lockup (4 variants) in Figma; picked a Recraft leaf
(Option 1 — filled, already tilted) once Nitzan generated 3 candidates.

**Session 2 done:** brand book assembled as a 9-page PDF via the Chrome pipeline above —
brand essence, logo lockup + misuse rules, palette (HEX/RGB + approximate CMYK, flagged as
approximate), typography, voice & tone, corrected label artboards, status/open-items page.
Leaf mark still the placeholder pending Figma; bottle application mockup (curved wrap)
still not attempted — flat HTML can't fake it convincingly, needs a real mockup tool once
Figma's back.

**Brand book is now Hebrew-only (v0.3, Nitzan's explicit call)** — every heading/sentence/
label translated, English glosses deleted. Exception (Nitzan didn't object): font names
(Rubik/Assistant), hex/RGB/CMYK codes, and acronyms (RTL, WCAG, SVG, PNG, QR, CMYK) stay
Latin — literal values + standard industry shorthand even in Hebrew docs. This Hebrew-only
scope is the **shipped Brand Book PDF only** — the working reference docs
(voice/messaging.md, logo-usage.md) keep their Hebrew+English-gloss format, unchanged.
Current file: `Marva/brand-book/Marva_Brand_Book_v0.3_HE.pdf` (source:
`Marva_Brand_Book_source.html`, still has `__LEAF_SVG__`/`__LABEL_PNG_B64__` placeholders —
regenerate via the substitute.py-style script, not by hand). Old English v0.2 PDF left in
place, not deleted, in case Nitzan wants to diff/reference it.

**Critical Hebrew/RTL bidi gotcha — the parenthesis-mirroring "fix" from before was only
half the story:**
1. **Pure-Hebrew parentheticals mirroring is CORRECT, not a bug** — e.g. `(מעורפל)`
   rendering with visually-swapped bracket glyphs in RTL flow is standard, expected Hebrew
   typography (matches Word/Google Docs Hebrew behavior). Don't "fix" this.
2. **The real bug: multi-char Latin/numeric tokens (hex codes, font names, code
   snippets, filenames) embedded INLINE within flowing Hebrew prose get their internal
   character order scrambled** in Chrome's print-to-pdf export — e.g. `#5C7A4E` →
   `E4A7C.#5`, `Rubik 700` → `700 Rubik`, `Marva_voice_and_messaging.md` fully reversed.
   CSS `dir="ltr"` + `unicode-bidi:isolate` alone does NOT reliably fix this for PDF
   export, even with explicit LRM (U+200E) marks added around the span.
3. **What actually works:** the LTR token must be on its own fully isolated line/block
   (via `<br>` or a separate block element), with **no Hebrew text following it on that
   same line** — matches how the palette page's hex/RGB/CMYK values (already on their own
   line per swatch) rendered correctly from the start. Inline "Hebrew ... LTR ... Hebrew"
   on one line is the failure pattern; "Hebrew sentence.<br>LTR token" is the safe pattern.
   Caveat: this isolation-via-`<br>` fix did NOT work inside a `display:flex` container
   (page 9's status `<li>`) — safest fallback there was just removing the inline LTR
   token from that context entirely (already documented in full elsewhere in the doc).
4. **Practice for any future Hebrew doc in this project:** never let a hex code, font
   name, filename, or code snippet sit mid-sentence next to Hebrew words — always give it
   its own line, checked by re-reading the actual rendered PDF (not assuming), since text
   extraction and visual rendering both showed the same corruption (they correlate; text
   extraction can be trusted as a proxy for visual bugs in this pipeline).

**Session 3 in progress — website scaffold built and verified, paused for a usage-limit
reset (5h Claude limit, not Figma-related).** Design-approach discussion happened before
coding: goal is to avoid the generic "AI-built" look (symmetric centered everything, icon
grids instead of real photography, no type hierarchy) by leaning on Marva's already-locked
brand system (leaf shape language, Rubik/Assistant scale, sage/sky/sand) plus real
photography later instead of stock icon grids. **Site structure deliberately mirrors
freewater.io's section flow** (hero → value prop → how-it-works/pillars → social proof →
CTA) — already legally scoped in `Marva_delivery_plan.md §5`: structure/UX inspiration is
fine, copying their code/copy/images is not. Confirmed via live fetch of freewater.io
(WebFetch worked; claude-in-chrome screenshot attempts timed out repeatedly — their site
never reaches document_idle, likely persistent video/animation — don't burn time retrying
that, WebFetch's text summary is the fallback). **Imagery decision: empty/placeholder image
slots for this build** (styled hatched dashed-border boxes with a Hebrew description of
what belongs there) — Nitzan explicitly deferred sourcing real/AI photography to a later
session, don't proactively generate images.

**Website stack built:** Astro + Tailwind v4 (CSS-first `@theme` config, not
`tailwind.config.js`) scaffolded at `Marva/website/app` (kept separate from the reference
docs `Marva_site_copy.md` / logo pdf at `Marva/website/` root). Brand tokens (sage/sky/
sand/ink/base) live in `src/styles/global.css` as Tailwind v4 theme vars → generates
`bg-sage`, `text-ink` etc. utility classes directly. Dev server registered in the
workspace-root `.claude/launch.json` as config name `marva-website`, port 4321 — use
`preview_start` with that name, not raw `npm run dev`.

**Two real bugs hit and fixed during scaffolding (both worth knowing before touching this
project again):**
1. **CSS `@import` ordering** — Tailwind v4's `@import "tailwindcss"` expands inline at
   build time; any `@import` (e.g. Google Fonts) written *after* it in source ends up
   textually after the expanded content, violating "imports must precede all other rules"
   and silently failing. Fix: put all external `@import`s *before* `@import "tailwindcss"`.
2. **Astro's dev toolbar overlay hangs `preview_screenshot`** — the floating dev-toolbar
   icon (bottom of screen in dev mode) made the Preview tool's screenshot capture time out
   repeatedly (~30s each) even though the page itself rendered fine (confirmed via
   `preview_eval` and `preview_snapshot` working throughout). Fix: `devToolbar: { enabled:
   false }` in `astro.config.mjs`, **requires a full server restart** (stop + start the
   preview), not just HMR, to take effect.

**Session 3 built and verified (accessibility-tree + screenshot, desktop + mobile):**
sticky header, hero (locked copy, asymmetric blob-shape instead of centered gradient —
avoids the generic-AI look), 3-step "how it works," למפרסמים/למשווקים fork as two cards
(confirmed correct RTL grid ordering: first-in-DOM card lands on the *right*), distribution
section naming real places (חופי ת״א, טיילת ת״א, הבימה, דיזנגוף, שרונה) with **no
fabricated stats** — deliberately flagged in the copy itself that exposure numbers come
later, to avoid shipping false advertising claims. Order-form section is a stub only
(honest placeholder text saying the real form + email wiring is next session) — matches
the 5-session plan's boundary (order form is Session 4's job, not 3's).

**Known gap, not yet fixed:** no mobile navigation menu — nav links just disappear below
the `md` breakpoint with no hamburger fallback. Flagged to Nitzan, not yet actioned.

**Session 4 done — full page rebuild + real order form:**
- **GSAP installed** (`gsap` npm package) — replaces the old CSS `.reveal` +
  IntersectionObserver pattern. All animations use hardware-accelerated transforms
  (`y`, `opacity`, `scale`) via ScrollTrigger. Hero has a staggered entrance timeline,
  leaf shapes parallax on scroll, each section fades in on scroll-enter.
- **Mobile nav added** — hamburger button (below `md` breakpoint), full-screen ink overlay
  with large nav links. Open/close animated via GSAP (hamburger lines → X transform).
  Closes on link click, locks body scroll when open.
- **Organic wave section dividers** — 5 SVG waves between sections (path + background-color
  technique: SVG element has section-A's color as CSS `background`, path fills with
  section-B's color, creating an organic curved boundary). Section color rhythm:
  base → pale-sage → base → ink (dark) → pale-sage → base.
- **Audience cards differentiated** — מפרסמים has sage accent gradient top bar + sage check
  marks; משווקים has sky accent + sky check marks. Both have shadow-sm and sand borders.
- **Real order form built** (replaces the Session 3 stub):
  - Fields: שם העסק*, ח.פ./ע.מ, איש קשר*, טלפון* (dir=ltr), אימייל* (dir=ltr),
    כמות בקבוקים (select: 100–10000+), משך קמפיין (select), תאריך התחלה (date input),
    אופן ההפצה* (radio: הפצה דרך מרווה / מרווה מספקת ללקוח), הערות (textarea).
  - **Conditional sub-fields**: selecting "הפצה דרך מרווה" shows distribution points +
    area; selecting "מרווה מספקת" shows delivery address. Toggle via CSS max-height
    transition (not GSAP — keeps it simple).
  - **Source tracking**: hidden `source` field auto-set when user clicks a specific CTA
    (data-source="advertiser" pre-selects "הפצה דרך מרווה" radio, data-source="publisher"
    pre-selects "מרווה מספקת").
  - **Submit handler**: validates via `checkValidity()`, logs data to console, hides form,
    shows success message. **Email endpoint is a TODO** — provider TBD (Nitzan deferred).
  - Success message: white card with check icon + "הבקשה נשלחה בהצלחה" + reassurance text.
- **Design doc written**: `Marva/website/landing_design.md` — anti-default decisions,
  typography scale, color rhythm, section-by-section specs, GSAP animation plan, a11y rules.
- **`prefers-reduced-motion` respected**: all GSAP animations skip when user has reduce-motion
  enabled; content remains visible.
- **preview_screenshot still times out** on this Astro 7 dev server (same as Session 3,
  even with devToolbar disabled). All verification done via preview_snapshot, preview_inspect,
  and preview_eval — content, styling, interactions, and form submission all confirmed working.

**Site is now LIVE** at https://marva-website.pages.dev (Cloudflare Pages free tier, static
site, project name `marva-website`, account nitzanweizmann1@gmail.com). Deployed via
`npx wrangler pages deploy dist --project-name=marva-website --force`. Custom domain not
yet purchased — discussed `.co.il` as the natural fit (Israeli audience/business) vs `.com`,
pending confirmation of Marva's ח.פ./ע.מ. business registration for `.co.il` eligibility.

**Deploy gotcha (worth knowing before redeploying):** running `wrangler pages deploy`
without `--force` on a fresh Cloudflare login auto-delegates to Cloudflare's newer unified
"Workers" deploy path (`astro add cloudflare` wizard), which silently: added the
`@astrojs/cloudflare` SSR adapter to `astro.config.mjs`, added unwanted KV (`SESSION`) +
Images bindings, generated a `wrangler.jsonc`, and rewrote `package.json` scripts —  then
failed anyway (blocked on registering a `workers.dev` subdomain, which needs an interactive
prompt). **Reverted all of it** (removed the adapter/bindings, deleted `wrangler.jsonc`,
restored plain static config) since this is a static marketing site with no need for
SSR/KV/Images. Fix going forward: always deploy with the explicit classic-Pages path —
`wrangler pages deploy dist --project-name=marva-website --force` — and if `.wrangler/`
has a stale `deploy/config.json` redirect from a prior failed attempt, delete the whole
`.wrangler/` folder before retrying (it caches a broken redirect otherwise). Project itself
must exist first via `wrangler pages project create marva-website` if deploying to a brand
new project name.

**Redeploy recipe (once form provider is picked and any content changes are made):**
```
cd Marva/website/app
npm run build
npx wrangler pages deploy dist --project-name=marva-website --force
```
`package.json`'s `deploy` script now runs both steps in one `npm run deploy`.

**Auto-deploy pipeline set up and verified working (same session):** Marva project is now
under git — repo initialized at the `Marva/` root (not just `website/app/`), pushed to
GitHub as **github.com/nitzkesh/marva-website** (private), default branch `main`. Git
identity had none set on this machine at all; set globally per Nitzan's choice
(nitzanweizmann1@gmail.com / "Nitzan Weizmann").

**Why GitHub Actions instead of Cloudflare's native git integration:** confirmed via
Cloudflare's own docs that a Pages project created via direct-upload (which is what our
initial `wrangler pages deploy` did) **can never be converted to git-integration** — that
choice is permanent per-project. Recreating from git would mean deleting the working
`marva-website` project. Chose the equivalent-but-non-destructive path instead: a GitHub
Actions workflow (`Marva/.github/workflows/deploy.yml`) that runs `npm ci && npm run build
&& wrangler pages deploy` on every push to `main` touching `website/app/**`. Same outcome
(push → auto-live) without touching the existing project or its live URL.

**Secret handling:** `CLOUDFLARE_API_TOKEN` (scoped to Account → Cloudflare Pages → Edit)
was created and added as a GitHub repo secret **by Nitzan directly** in the GitHub UI —
never pasted into chat or handled by me, per the workspace's absolute secrets rule. The
Cloudflare **account ID** (`8648b92ed2c23dd6065cdb4d74df01fd`) is hardcoded in the workflow
file since it's not sensitive (not a credential, just an identifier).

**Verified end-to-end** (2026-07-08): made a trivial test edit, pushed, watched via `gh run
watch`, confirmed the change appeared live at marva-website.pages.dev within ~15 seconds,
then reverted the same way. **The pipeline works — any future push to `main` that touches
`website/app/**` auto-deploys, no manual `npm run deploy` needed anymore** (that script
still exists in package.json as a manual fallback if GitHub Actions is ever down).

**Post-Session-4 additions (live):** added a **testimonials** section (`#testimonials`,
3 dashed placeholder cards) and a **partners/מותגים** section (`#partners`, 5 logo
placeholder slots) as a social-proof cluster between the audience fork and distribution.
Contact section (`#quote`) **split into two options via a segmented toggle**: "צור קשר"
(quick — email + WhatsApp, placeholder for now) and "להשאיר פרטים" (the existing detailed
form). Default visible panel = the form (so the live section isn't empty and CTAs land on
it); any `[data-source]` CTA calls `showPanel('form')` before pre-filling. Panel state is
plain `.hidden` toggling + `.contact-toggle-btn.is-active` styling (CSS in global.css).
Also removed the "פרסום שמרווה" catchphrase from hero eyebrow + footer (new catchphrase
TBD) and changed the distribution heading "איפה נמצא אותנו" → "איפה למצוא אותנו".

**Placeholder content still to fill (empty-by-design right now):** testimonials cards,
partner logos, and the quick-contact email + WhatsApp values.

**Tried and reverted (same session, Nitzan's explicit call):** built an animated demo-bottle
SVG for the hero image slot — flat vector 500ml bottle with label zones matching the real
Mei Eden 210×42mm proportions (seam/regulatory/ad-zone split), red "YOUR AD HERE" in the
free zone, GSAP idle float + ad-zone pulse. **Reverted** — "not what I meant" and "too
complicated for my remaining usage." Hero image slot is back to the plain dashed
placeholder. **Don't rebuild this speculatively** — if a bottle/label visual comes up again,
confirm the concept and scope tightly before building, rather than assuming this same
approach is wanted.

**Loose end, not yet resolved:** a file `marva-brand-concept-viaGPT.png` (1.8MB) appeared in
the `Marva/` root during this session — not created by me, presumably dropped in by Nitzan
(maybe a ChatGPT-generated reference image). It got swept into a commit via `git add -A`
before I noticed it. Flagged to Nitzan; no answer yet on whether it should stay in the repo,
be moved, or be removed.

**CI note:** the GitHub Actions deploy logs a non-blocking warning that Node 20 (targeted by
`actions/checkout@v4` + `actions/setup-node@v4`) is deprecated and auto-forced onto Node 24.
Still works; bump those actions to v5 when convenient.

**Session 5 done — new design-system rewire (Bauhaus TLV one-pager + geometric leaf logo).**
Nitzan supplied a revised brand sheet (2 images: a Bauhaus design-system one-pager with
fonts/palette/usage-ratio, + a final primary-logo sheet). Changes made to `website/app`:
- **Copyright check (the gating ask):** the specced display font **Knockout** (Hoefler/
  Monotype) and body font **Neue Haas Grotesk** (Linotype/Monotype) are **both paid,
  license-required, and neither has Hebrew glyphs** — unusable for a Hebrew-first RTL site
  regardless of budget. (Listing them in a brand book is fine; the violation is only if you
  embed/serve the actual font files.) **Replaced with free SIL-OFL, Hebrew-capable subs
  Nitzan picked:** display = **Montserrat** (Latin) + **Heebo** (Hebrew, per-glyph
  fallback); body = **Assistant** (kept). So `--font-heading: 'Montserrat','Heebo',…`,
  `--font-body: 'Assistant',…`. This **supersedes the old Rubik+Assistant** pairing.
- **Palette adopted in full (supersedes the old warm off-white/deep-sage values):** sage
  `#A8BFAF`, sky `#8CC4E7`, sand `#E6D9C3`, pale-sage `#EDF3EF`, **base=white `#FFFFFF`**,
  **ink & ink-strong both collapse to charcoal `#111111`** (new system has no deep-green).
  Added `sage-deep #8CA697` / `sky-deep #6FB2DC` for button hovers. Usage ratio (guidance):
  Sage 45% / Sky 30% / Sand 15% / Black-White 10%. **Discrepancy flagged:** the two sheets
  disagree on sky/sand hex (logo sheet says sky `#A6C9E8`/sand `#E6DCC6`) — took the
  design-system one-pager as source of truth since it carries the ratios.
- **CTAs remapped** from `bg-ink` (old deep sage) → **sage** (global + advertiser card) and
  **sky** (publisher card, matching its accent), always **charcoal text** (white fails
  contrast on these light pastels). The dark distribution section keeps `bg-ink` (now pure
  `#111` charcoal, intentional). Decorative bg-leaf hexes in index.astro recolored to new
  tokens.
- **New geometric leaf mark** (sky petal + sage leaf + sand quarter-base, Bauhaus "Geometric
  Balance" concept) written as a hand-built SVG (viewBox 0 0 64 64) into BOTH
  `public/favicon.svg` (the live one, used by Logo.astro via `<img src="/favicon.svg">`) and
  the orphaned `src/assets/leaf.svg`. **This replaced the old organic Recraft leaf
  placeholder.** Dark-bg logo still uses the `brightness-0 invert` CSS trick → clean white
  knockout (matches tote/business-card mockups). **Still a stand-in — the definitive
  production vector is Nitzan's Recraft/Figma step (AI-only-logo copyrightability rule).**
- **Verified** via preview_inspect/eval/snapshot (screenshots still hang on this dev server,
  same as Sessions 3–4): all tokens resolve (charcoal/sage/sky/white), Montserrat+Heebo+
  Assistant all loaded, favicon leaf renders 24×24, full page structure + Hebrew copy intact,
  no console/build errors. **NOT yet committed/redeployed** — pushing to `main` auto-deploys
  via GitHub Actions, so left for Nitzan's go.
- **Open sub-choice flagged:** the large ambient background-leaf silhouettes in the hero/
  nav/distribution are still the OLD organic teardrop shape (just recolored), not the new
  geometric mark — left as soft ambient texture; swap to geometric later if wanted.

**Session 6 done — full rewrite to the `marva-design-system-viaClaudeD` handoff + brand reconciliation. This OVERRIDES the Session-5 font/palette/structure facts above.** Nitzan delivered a design-system zip (`Marva/marva-design-system-viaClaudeD/`, tokens + prototype + 4 core components) and asked to rewrite the landing page to it, using me as orchestrator delegating builds to Sonnet 5 with a review gate. Current canonical state:
- **Single source of truth is now `brand-book/Marva_brand_foundation.md`** — reconciled 2026-07-09 to mirror `website/app/src/styles/global.css` `@theme` (same token names). The design-system zip is a point-in-time reference the foundation supersedes on conflict. Other brand-book docs (logo_usage, voice) + `Marva_site_copy.md` + `landing_design.md` updated or banner-marked "superseded".
- **Fonts (supersede Montserrat/Heebo):** display/headings/wordmark = **Rubik**; Latin body = **Work Sans**; **Hebrew body = Assistant** (Work Sans is Latin-only). Stack: display `'Rubik',…`; body `'Work Sans','Assistant',…`.
- **Palette (adopted from the logo sheet `primary-logo-viaGPT.png` swatches):** sage `#A8BFAE`, sky `#A6C9E8`, sand `#E6DCC6`, ink `#111111`, base off-white `#FBFAF6`, surface `#FFFFFF`, sage-deep `#7FA089`, tints `#EEF2EC`/`#EAF4FA`/`#F7F1E5`, muted `#5B6660`, border `#E3E0D8`. **CTA anchor = black fill + off-white text** (supersedes the Session-5 sage/sky CTAs).
- **Page structure fully replaced** → 8 sections per handoff: Hero ("מים בחינם" / "המותג שלכם, ביד של כולם"), Who-we-are (bottle + blank label), Where-bottles-go (4 accent cards), How-it-works (3 numbered), 3 route buttons, Partners/Testimonials "בקרוב" placeholders, Forms hub (3-tab: business/find/advertise with conditional delivery field + "לחסוך בעלויות" toggle), footer. **The old audience-fork + dark-distribution + wave-divider layout is GONE** (preserved in git history). Kept mobile nav + calm GSAP reveals + validation.
- **New logo (supersedes the Session-5 geometric favicon leaf):** three-block Bauhaus sprout = sage leaf (white vein) + sky lobe + sand base, hand-built SVG at `public/marva-mark.svg` (full-color) + `marva-mark-white.svg` (reversed) + `favicon.svg`. `Logo.astro` uses `/marva-mark.svg`. Old `marva-mark.png` deleted. A Recraft/Figma vector master can drop in over `marva-mark.svg` later, no downstream break. **Nitzan flagged (2026-07-09): the current SVG's shapes are out of proportion / inaccurate — accepted as a stopgap only. Nitzan will recreate the mark in Recraft and hand it to Claude to re-derive ALL file versions (full-color SVG + reversed white + favicon + site wiring). Expect this as a follow-up task; swap over `marva-mark.svg` etc., no downstream break.**
- **Tagline "פרסום שמרווה" fully retired** — removed from all editable text files (voice, site_copy, design-system readme, brand-book HTML source). Only the two brand-book PDFs (binary) still contain it — clear on next regeneration. **New descriptor: "מים בחינם, המותג שלכם, בידיים של כולם"** (recorded in foundation). NOTE: shipped hero still says "ביד של כולם" (singular) — align to "בידיים" (plural) during the content-extraction step.
- **Preview screenshots WORK this session** (the Session 3–5 hang is gone) — but navigating the preview to a bare static `.html` in `public/` reliably hangs the renderer; view raw `.svg` or the app directly instead. Verified: RTL, tabs, routing, conditional fields, form submit, mobile nav, Assistant loading, new mark in header/footer/label — all working; production build clean. **NOT committed/redeployed** — left for Nitzan's go (push to `main` auto-deploys).
- **Next planned (agreed): Step 2 = extract all copy/data into `src/data/content.ts`** (content layer) so future copy/section edits are one-file changes — the "cheap future alterations" goal Nitzan set.
- **Flagged, needs image tool not code:** photorealistic mockups (bottle/tote/business-card) carrying the new mark — the sheet already shows them; net-new ones need generation.

**Session 7 done (2026-07-09) — Recraft logo swap + hero bottle visual + landing animations, shipped live (commit `25cfea8`).**

- **Logo mark finalized (supersedes the Session-6 hand-built Bauhaus sprout SVG).** Nitzan
  delivered the Recraft export (`image.svg`) — a FLATTENED lockup: full-canvas cream bg rect
  + the 3-color leaf mark + baked-in black wordmark letter paths, no transparency. Per his
  call (icon-only), I isolated JUST the 3 leaf color paths (dropped bg rect + wordmark),
  cropped viewBox to `132 0 172 178`, wrote to `public/marva-mark.svg` (full color: sage
  `#A4B9A3`, sky `#A2C4DE`, sand `#E2D3BA` — note these are the Recraft export's own hues,
  slightly off the design-system tokens), `marva-mark-white.svg` (reversed, `#FBFAF6` fills),
  and `favicon.svg`. Old `marva-website-logo.pdf`s deleted. Committed + deployed (`462d768`,
  `0ed95ce`). **This is the real Recraft-derived mark now — the long-standing "AI-only logo
  isn't copyrightable, needs Nitzan's Recraft finish" step is DONE.**
- **Animation stack:** installed `motion` (motion.dev vanilla) + `gsap` (already present).
  **`tailwindcss-animate` from the prompt is v3-only and incompatible with our Tailwind v4
  CSS-first setup — substituted `tw-animate-css`** (v4-native successor, `@import
  "tw-animate-css";` AFTER `@import "tailwindcss";`). tw-animate-css is currently INSTALLED
  BUT UNUSED (Example 3 needed only the existing `shadow-card-hover`; Example 2 was dropped) —
  Nitzan chose to keep it staged for future micro-interactions.
- **Orchestration pattern proven:** built a **Sonnet `animator` subagent**, Opus (me)
  orchestrating + reviewing under maker-checker. Agent file: **`C:\AI\nitz-workspace\.claude\
  agents\animator.md`** (workspace-level → auto-loads every session in this workspace,
  `model: sonnet`, tools Read/Write/Edit/Glob/Grep/Bash, READ/BUILD-only — never commits or
  deploys). It earned its keep: caught a real bug — GSAP `from()` leaves an inline `transform`
  after the reveal, and inline styles beat CSS `:hover`, so the card hover-lift would've been
  silently dead; fixed with `clearProps:'transform'`. **Agent is ready for reuse next session.**
- **New hero (LIVE, replaced the text-only Session-6 hero):** Nitzan generated a
  photorealistic blank-label 1024×1536 bottle PNG externally (I have NO reliable in-harness
  image generator — Canva is unsafe for Hebrew + poor product-render quality + an external
  paid call; established pattern = Nitzan generates from my prompt, drops the PNG in, I wire
  it). Asset at `public/hero-bottle.png`. Layout = two-column (bottle left, copy right). The
  label is TEXT-ONLY overlaid directly on the bottle's own blank label (no white box — that
  floating-square look was the earlier reject): `המותג / שלכם / כאן` stacked one word per
  line + icon-only Marva mark bottom-left. PNG isn't transparent, so the grey bg is
  **feathered into the page** via a radial `mask-image` (kept `שלכם` plural to match the hero
  line, flagged; Nitzan had typed `שלך`).
- **Animations shipped + verified:** Example 1 = Motion **spring hero load** (copy staggers
  up, bottle springs in `scale .9→1`, one-shot, `transform`/`opacity` only, `stiffness:260
  damping:24`). Example 3 = **Tailwind tactile card hover** (`hover:-translate-y-1` +
  `shadow-card-hover`, 200ms) on `.where-card`/`.how-card`. Both `prefers-reduced-motion`-
  guarded (hidden state set in JS only inside `if(!reduced)` → no FOUC). Example 2
  (scrollytelling) intentionally DROPPED by Nitzan (needs a real map asset; not worth it now).
- **Radial "orbit" hero — mockup built, DEFERRED (Nitzan out of usage, wants more tweaks).**
  Concept (adapts o-scs.com's centered-headline + rotating-logo-ring archetype into Marva's
  voice): centered headline, the real bottle at the CENTER, **8 brand-colored vector
  mini-bottles at varied tilts orbiting on a ring** (mini-bottles instead of fake partner
  logos — his call, keeps it honest), soft blurred sage/sky/sand gradient blobs behind. Spin
  plan: ring rotates ~45–60s/turn, each mini-bottle counter-rotates to keep its tilt (calmer
  than tumbling); mini-bottles scale/fade in staggered on entrance; center bottle springs in;
  reduced-motion freezes it. Was a throwaway `/radial-hero` route (deleted). **Rebuild from
  this spec next time if wanted; it's a v2 candidate to REPLACE the current hero, not add to it.**

**New gotchas learned this session (all confirmed, worth obeying):**
1. **Astro scoped `<style>` blocks silently don't apply here** — the label overlay's scoped
   rules (`position:absolute`, `flex-col`) computed to `static`/`block`, collapsing the
   layout. FIX: use Tailwind utility classes (or inline `style`) for page markup in this
   project — never a component `<style>` block. (Reconfirms the Session-3 "everything is
   Tailwind utilities" rule; this is now a hard rule.)
2. **Tailwind v4 JIT doesn't scan a BRAND-NEW Astro route's novel arbitrary classes until a
   full dev-server RESTART** — a new route's `w-[190px]` etc. silently didn't generate (the
   element stretched to its container); HMR wasn't enough. FIX: after creating a new route
   with novel arbitrary utilities, `preview_stop` + `preview_start` (not just save).
3. **Headless-Chrome `--virtual-time-budget` does NOT settle Motion springs** — screenshots
   even at 4000ms virtual time caught the hero mid-animation (looked "stuck"). Real-time load
   settles fine (verify via `preview_eval` reading computed `opacity`/`transform`, not a
   virtual-time screenshot).
4. **Headless-Chrome capture recipe (preview_screenshot still hangs on this dev server):**
   `chrome.exe --headless=new --disable-gpu --window-size=W,H --virtual-time-budget=6000
   --user-data-dir=<scratch\cprofile> --screenshot=<WINDOWS path> http://localhost:4321/<route>`.
   Needs `--headless=new` + a `--user-data-dir` + Windows-style output path, or it throws
   "Access is denied" writing the PNG. This is the reliable capture path now.
5. **Pasted images don't hit disk** — a chat-pasted image isn't findable on the filesystem;
   have Nitzan SAVE assets to a path (he dropped `Marva/hero-bottle.png`, I copied to public/).

**Session 8 done (2026-07-09, autonomous run) — FULL 3-PAGE REBUILD per Nitzan's
`website-edits (1).pdf` (Downloads), shipped live (commit `ef12e5a`). SUPERSEDES the
Session-6 single-page structure.** Fable 5 orchestrated; Sonnet `general-purpose` worker
built pages (2 phases, maker-checker), `animator` agent did motion (3 rounds). Current state:
- **3 routes:** `/` (hero w/ eco-waves + partners conveyor marquee + honest "בקרוב" chips,
  full-screen who-statement w/ word cascade, how-it-works w/ vector icons + scroll sequence,
  4 expandable where-cards w/ flat SVG illustrations + findSpots list, testimonial
  placeholder quote-cards (no fake people — real quotes = data swap), 3 big route buttons,
  general inquiry form `#inquiry`), `/advertisers` (hero, label-strip SVG mockup at true
  210:42 proportions w/ auto-pan on overflow, 3 option cards, why-advertise no-fake-stats,
  ad form), `/distributors` (hero, 3 why-cards, 12-type grid, dist form).
- **All copy lives in `src/data/content.ts`** (the Session-6 "content layer" goal — done).
  New shared components: Header (hamburger LEFT all sizes, logo centered, צור קשר right),
  Footer, ExpandCard. Shared JS: `src/scripts/shared.ts` (nav/forms/reveals, imported by
  Layout), `hero-spring.ts`.
- **3 Web3Forms forms** (access key `f5ce1cab-5c12-409e-b135-3e1996fa181b`, public by design,
  → nitzanweizmann1@gmail.com): general/מפרסם/משווק subjects + from_page tracking. General
  form tested end-to-end live. **Web3Forms free tier REJECTS server-side curl POSTs**
  (client-side/browser only) — test via the browser form, not curl.
- **Gotchas hit:** Tailwind v4 has no `inset-inline-end-2` utility (use `end-2`); preview
  tab snaps back to localhost if navigated to an external URL; synthetic preview_click
  sometimes fails to activate form submission (dispatch a `SubmitEvent` via preview_eval
  instead — untrusted-click artifact, not a site bug).
- **Done-signal:** "all is done, check it out" + link sent through the new general inquiry
  form per Nitzan's instruction. PushNotification attempted (Remote Control inactive — he
  hadn't set it up yet; setup instructions were given earlier that session).

**Open items / next-session tasks:**
- Partner conveyor chips, testimonial quotes, footer phone → real content when available.
- Real photography / product mockups for the where-card illustrations (PDF wanted
  AI/stock images — vector placeholders shipped instead, flagged as judgment call).
- **Radial hero v2 (if Nitzan wants it):** refine the mockup (tighten center-bottle halo,
  drop/lighten the ring-guide circle, maybe all-vector center for style unity), then animate
  the slow spin + staggered entrance and wire it in to REPLACE the live hero. Spec above;
  spawn the `animator` for the build.
- Example 2 scrollytelling — still deferred, needs a real map asset.
- Fill testimonials, partner logos, quick-contact email/WhatsApp placeholders.
- Wire form email submission to a provider (Formspree / Web3Forms / Cloudflare Worker — TBD).
- Buy + connect a custom domain (`.co.il` leaning, pending business-registration check).
- Real photography to replace remaining image-slot placeholders.
- Templates (Quote/NDA/advertising-IP agreement — pending lawyer review).
- IG social kit.
- Housekeeping: bump GitHub Actions `checkout`/`setup-node` v4→v5 (Node-20 deprecation
  warning, non-blocking); decide fate of the stray root `marva-brand-concept-viaGPT (2/3).png`;
  keep-or-drop unused `tw-animate-css`.

**Session 9 done (2026-07-10) — real photos wired in, brand book regenerated to v0.4, catchphrase options drafted.** Nitzan dropped 6 real photos into `Marva/photos-for-website/` (untracked, not deployed) between sessions. Fable 5 handled this session directly (no subagent delegation — scoped enough for inline work).

- **Photos wired (4 of 6):** viewed all 6 with the Read tool before wiring anything (worth doing — filenames aren't proof of content). `tlv-vibes.jpg` (real, authentic TLV boardwalk/lifeguard-station scene) → spots card; `coffee-shop_2.png` (staged mockup, blank-label bottles, Bali-resort-style café, NOT actually Tel Aviv or Marva-branded) → business card; `social-event.jpg` (real wedding/toast scene) → events card; `supermarket.jpg` (real beverage-aisle shot) → market card. **Flagged to Nitzan but shipped anyway:** the coffee-shop and social-event photos are generic stock-style category illustrations, not real Marva distribution points — same illustrative role the old flat-SVG placeholders played, just higher fidelity; not misrepresented as real client sites. **Not wired (spares, no clean slot):** `coffee-shop.png` (alt crop of the same staged shot) and `water-bottle.jpg` (abstract blue-toned macro condensation shot — no location, cool tone clashes with the warm sage/sky/sand palette). Don't place these speculatively; ask Nitzan or wait for a clear slot.
- **Optimization pipeline:** `sharp` is already present in `website/app/node_modules` (Astro pulls it in for `astro:assets` even though the project doesn't use that component yet) — no install needed. One-off Node script resized to max 1200×1200 (fit:inside) + WebP quality 80: **6000×4000 originals (~3.7MB each) → ~60-200KB WebP**, ~96% size reduction across the 4 wired images. Output to new `website/app/public/photos/`. Swapped the `illustrations` SVG-string record in `index.astro` for a `cardPhotos` record of `{src, alt}` with real Hebrew alt text; container markup (`aspect-video overflow-hidden` + `object-cover`) unchanged. Verified via dev server: RTL card order correct (first-in-DOM lands right, reconfirms the Session-3 finding), all 4 images 200 OK, no console errors.
- **`photos-for-website/` added to `.gitignore`** (bulky raw source photos, same treatment as the design-system zip — optimized WebP copies actually used by the site live in `public/photos/` and get committed there).
- **Brand book regenerated to v0.4** (`Marva_Brand_Book_v0.4_HE.pdf`, old v0.3 kept per existing practice) — the doc had drifted badly behind two design-system overhauls (Sessions 5+6) and the Recraft logo swap (Session 7): still showed the old greener palette, Rubik-only fonts (no Work Sans), the leaf mark captioned as "pending Figma cleanup" when the real Recraft mark had already shipped, and a 50/30/20 usage ratio. Rewrote `Marva_Brand_Book_source.html`: new palette (8 swatches: sage/sage-deep/sky/sky-deep/sand/sand-deep/ink/base, CMYK approximations recomputed), added a Work Sans typography row, real `marva-mark.svg` injected (not a placeholder caption), status page rewritten (leaf mark + live site marked done; Neria confirmation + Ein Gedi scope + templates + IG kit + real testimonial/partner content still pending).
- **New reusable build script: `brand-book/build-pdf.js`** — closes a gap flagged in earlier-session memory ("regenerate via the substitute.py-style script" was referenced but never actually saved to disk). Does the `__LEAF_SVG__`/`__LABEL_PNG_B64__` substitution + headless-Chrome `--print-to-pdf` in one step. Usage: `node build-pdf.js <output-filename.pdf>` from `brand-book/`. Uses `--headless=new` + a scratch `--user-data-dir` (`.chrome-profile/`, gitignored) per the established reliable-capture recipe.
- **New bidi/RTL finding (extends the existing gotcha list):** the known "LTR token must be fully isolated on its own line, no Hebrew following on the same line" fix applies beyond hex codes/font names/filenames — **domain names/URLs need it too, for a second, separate reason.** A bare inline `marva-website.pages.dev` mid-Hebrew-sentence didn't character-scramble in this instance (verified via `pypdf` text extraction of the actual generated PDF — Python's `pypdf` package is available and can extract text from these PDFs for exactly this kind of check, even though it garbles the Hebrew itself via `�` replacement chars, the embedded Latin substrings extract cleanly and are a valid corruption check), but the **hyphen in "marva-website" was treated as a soft line-break point**, splitting the domain awkwardly across two lines mid-word. Isolating it on its own line (same fix as the character-scrambling bug) also fixes this distinct wrapping issue. **Practice going forward: isolate ANY multi-char Latin token on its own line, not just the ones known to scramble** — cheap insurance, and covers this second failure mode the original finding didn't anticipate. Also confirmed: a screenshot of the live-rendered HTML is *not* a valid proxy for the `--print-to-pdf`-specific scrambling bug (they're different rendering paths) — only checking the actual PDF (via `pypdf` text extraction, since `pdftoppm`/poppler isn't installed here so the Read tool can't render PDF pages directly) validates it.
- **Fixed two other stale docs found while sourcing facts for the PDF:** `Marva_brand_foundation.md` §Logo and `Marva_logo_usage.md` §1/§7 both still described the mark as a placeholder "hand-built SVG" with a Recraft/Figma step framed as *future* work — stale since Session 7 already shipped the real Recraft-derived mark. Corrected both (mark is production-final, no pending vector step).
- **Catchphrase options drafted** (to replace the retired "פרסום שמרווה" pun-tagline) and presented in-chat, not yet written to any file — Nitzan hasn't picked one. Once chosen: update the brand book cover tagline (currently the safe placeholder "מים מינרליים בחינם"), `Marva_brand_foundation.md`'s descriptor line, and consider whether it belongs anywhere on the live site.
- **Not committed/pushed** — photos + brand book + doc fixes are all verified locally but the git status was left dirty on purpose; pushing to `main` auto-deploys the live site (Cloudflare Pages Action), and the base harness rule is to never push without explicit sign-off even when build work itself was pre-approved. Left for Nitzan's go, matching established practice from prior sessions.

**Session 10 done (2026-07-11→13, delegate workflow) — doc templates + Neria batches 3+4 + EN locale + email signature, ALL LIVE (commits 6d9e370→e4b43c5).** Fable orchestrated, Sonnet workers built, maker-checker throughout (the workspace `delegate` skill at `.claude/skills/delegate/`).

- **Doc-template system shipped & committed (`doc-templates/`):** 8 Google-Docs-ready .docx (Report/Letter/Memo/Quote × HE/EN) + PDFs + import guide, generated by `build_templates.py` (one command regenerates all + runs a render-measured QA suite via pymupdf). Tagline/footer contacts are single constants (~line 804). Approved proof archived in `approved-backup/`. **Key OOXML learnings baked into the script:** theme font attrs beat literal rFonts (strip them); Hebrew needs w:cs/szCs/bCs everywhere; with w:bidi Word flips jc left/right logically (omit jc, let RTL default); tables need bidiVisual; table jc is also logical under bidiVisual (jc=right → visual left for RTL).
- **Fonts on this machine:** Rubik/Assistant/Work Sans installed USER-level as static instances (fontTools instancer from variable). **Never install variable Google Fonts TTFs on Windows** — GDI registers the default-instance name ("Rubik Light"), docs asking for "Rubik" silently fall back to Calibri; worse, install-then-replace mid-session poisons DirectWrite's cache with ghost typefaces that survive process restarts — only a sign-out/reboot clears it. **Nitzan closed this (2026-07-13): local Calibri-rendered PDF previews are acceptable, no relog required** — the .docx files themselves are correct (verified via Word font-embedding); Google Docs renders true fonts. Don't re-raise. (If PDFs are ever regenerated post-relogin, `python build_templates.py` flips i1-i3 green automatically.)
- **Neria's website-edits batches 3+4 live** (specs: Downloads/website-edits-3.pdf + -4.pdf; Neria's specs are English translations of Hebrew intent — write final copy in natural Hebrew, map section names back to code). Sitewide style rule now in force: **no trailing periods on display copy**. Hero pair: "המפרסמים משלמים על המוצר — אתם שותים בחינם" / "פרסום חיובי, מים בחינם — כולם מרוויחים". **Foundation doc's tagline line is now stale** (site hero moved on; docs keep old tagline — Nitzan said he'll sync templates manually). Batch 4: how-steps reworked (bottle icon replaced megaphone; step-02 copy "מעצבים את התווית עבורכם כיצד שתרצו" — "כיצד שתרצו" was flagged as stilted; **Nitzan closed it 2026-07-13: Neria's verbatim stands, don't re-raise**), #where split into cards-section + new #upcoming section ("נקודות חלוקה יפורסמו בקרוב", 6 placeholder rows — real dates restorable from git), distributors hero 2-line h1 (type is now `string | [string,string]`), advertisers label-demo hidden behind `showLabelDemo=false` const (markup preserved), quote-card title "חוסכים בעלויות, מתחלקים בתווית".
- **EN locale LIVE:** route-based `/en/{,advertisers,distributors}`, HE untouched at `/`. Content split: `content.he.ts`/`content.en.ts` typed bundles + `getContent(locale)`; pages extracted to `components/pages/*Page.astro` wrappers. Header/footer toggle (EN⇄עברית), MARVA Latin wordmark on EN, `html[lang="en"]` body font → Work Sans, hreflang triplet with ABSOLUTE urls (`site:` now set in astro.config — Google ignores relative hreflang), conveyor marquee direction-mirrored for LTR. EN tagline locked: **"Hydrate for free. Elevate your brand."** (Nitzan-approved after my grammar/voice fix of his draft). Locked EN strings: hero "Free Water" pair, "The next label is yours", "HaTzinor" transliteration.
- **Email signature shipped** (`email-signature/signature.html` + INSTALL.md; mark hosted at marva-website.pages.dev/sig/marva-mark-sig.png): table-based all-inline Gmail HTML, EN tagline, sage-deep links. "Co-Founder, Marva" title **confirmed OK by Nitzan (2026-07-13)**.
- **Footer phone fixed (commit e2a1271):** 054-5244339 live on both locales. Templates-vs-site tagline divergence: Nitzan's manual concern, not tracked — don't re-raise.
- **Email open item CLOSED (2026-07-13, commit 4755770):** Marva now has a real address **marvawater.info@gmail.com** — live in the footer (as a mailto link) + all 3 form error messages, both locales; dead info@marva.co.il fully gone. **Instagram wired:** footer IG button (was href=#) → instagram.com/marvawater.il, new tab. Also that day (commits 55c99d5, e2a1271): hero tightened — sub is now "המפרסמים משלמים על הבקבוק — אתם שותים" (EN "Advertisers pay for the bottle — you drink"), the "פרסום חיובי..." line DELETED (HomeHero.line now optional in the type), metas track it; footer phone 054-5244339. **No tracked open items remain from Session 10.** (Still-empty-by-design: testimonials/partners "בקרוב"; 2 dashed social placeholder circles next to the IG button. Form submissions now arrive at **marvawater.info@gmail.com** (new Web3Forms key `eea51799-...` in content.ts, commit f09622e, browser-tested end-to-end; the old personal-inbox key is retired). Instagram: **instagram.com/marvawater.il**. Verify note: pages.dev edge-caches HTML briefly — cache-bust with ?cb= when live-verifying right after deploy.)

**Session 11 done (2026-07-14) — custom domain marva-water.com wired live.** Nitzan bought `marva-water.com` at **box.co.il** (Israeli registrar). Chose Cloudflare-nameservers path (needed for the apex; he had no email/services on the domain so it was safe). He did the account actions himself: added the site to Cloudflare, set the 2 CF nameservers at box.co.il, attached the custom domain to the Pages project.
- **Two gotchas hit:** (1) He'd fetched `developers.cloudflare.com/agent-setup/prompt.md` expecting a domain-setup runbook — it's actually Cloudflare's guide to install their MCP servers/skills into coding agents (plugin installs + OAuth logins); unrelated, did NOT execute it. (2) He first attached marva-water.com to an OLD Pages project (served a Session-6-era build: title "מרווה — המותג שלכם, ביד של כולם", `/en/` 404'd). Diagnosed via curl (public site, no dashboard needed): compared content markers + `/en/` status + DNS-over-HTTPS (`dns.google/resolve`) across pages.dev vs the domain. Fix: he removed it from the old project, re-added to `marva-website`. Now apex serves current (title "מרווה — מים בחינם", `/en/` 200, CF-Cache-Status DYNAMIC).
- **Cloudflare dashboard is UNDRIVABLE by claude-in-chrome** — its SPA never reaches document_idle, so screenshot/read_page/get_page_text all time out. Dashboard steps must be handed to Nitzan with precise instructions; diagnosis is done via curl/DNS-over-HTTPS against the public site instead. (No Cloudflare API token available locally either — it's GH-Actions-secret-only.)
- **Shipped (commits 56ad64c, d890e25):** `astro.config.mjs` `site:` → `https://marva-water.com` (drives absolute hreflang, verified live). Email signature (image src + link), INSTALL.md, and brand-book source line swapped pages.dev→marva-water.com. pages.dev stays a working alias.
- **OPEN (Nitzan's dashboard clicks): `www.marva-water.com` was never added (NXDOMAIN)** — add it as a second custom domain on `marva-website` (or a www→apex redirect). Also: doc-templates `build_templates.py:813 CONTACT_SITE` still says pages.dev — left for his manual template sync; regenerate with `python build_templates.py` after changing.
- **Noticed, untouched:** `instagram-landing-page-design/` + `.zip` and `one-pager/` appeared in `Marva/` (his next task, likely an IG landing page + one-pager). Not committed.

**Design-system folder REPURPOSED as the forward design source (2026-07-14, same session).** Nitzan clarified `marva-design-system-viaClaudeD/` is NOT stale-to-delete — he built it in the **Claude Design desktop app** and wants it as his forward design workspace. It WAS behind the shipped site (July-9 snapshot: concept-sheet palette sky `#A3D0EC`/sand `#E6D9C3`, no Assistant, pre-Recraft logo, React not Astro — it had locked to the *concept-sheet* image while the live site locked to the *logo-sheet* swatches, which is why they diverged). **Reconciled it to shipped:** tokens now sky `#A6C9E8`/sand `#E6DCC6`/sage `#A8BFAE`; Assistant added as Hebrew body (fonts.css @import + typography `--font-body`); real `marva-mark.svg`+white copied into `assets/logos/`; readme narrative flipped (global.css @theme = runtime truth, folder mirrors it — it previously told readers to IGNORE the repo palette). Its React `components/` + `website/` prototype were deliberately NOT synced (dead vs the live Astro site); tokens + readme are the shared truth. **DO NOT propose deleting this folder.** Still gitignored (5.2M, no node_modules). **Source-of-truth hierarchy (locked 2026-07-14):** (1) **`global.css @theme` = the single runtime truth** — a value ships only when it's here; (2) the design-system folder = the design workspace (mirrors global.css); (3) `Marva_brand_foundation.md` = rules/strategy index, holds NO duplicated values. Change flow: design in the folder → port into global.css → ship. Don't re-introduce hex values into foundation.md.

**Cleanup DONE (2026-07-14, committed + pushed):** removed `email-signature/`, `doc-templates/`, old brand-book PDFs (v0.2/v0.3), logo-experiment SVGs, AND the two supplier label-spec PDFs (`שבלונה מי עדן/עין גדי` — Mei Eden/Ein Gedi print templates; Nitzan chose to delete them, **recoverable from git history** if label dimensions are ever needed again). Also deleted orphan `website/app/src/assets/leaf.svg` (dead Session-5 leaf). **`Marva_brand_foundation.md` slimmed to a rules-and-pointers index** — the duplicated palette hex table, `@theme` block, and font stacks were removed; it now states the source-of-truth hierarchy and points at global.css + the design system instead of carrying its own copies (kills the drift risk). v0.4 brand-book PDF still present.

**Session 12 done (2026-07-16, delegate workflow) — localhost CMS "marva-editor" shipped (commits d8e53d5, 218b99f, 91aacf3; NOT pushed).** Nitzan can now edit site copy + hide/show sections himself, no chat round-trips.
- **Content seam:** copy moved from `content.he.ts`/`content.en.ts` (deleted) to **`content.he.json`/`content.en.json`**; `content.ts` keeps interfaces + `getContent` and casts the JSON (`as ContentBundle`). JSON was generated mechanically (Node 24 runs TS directly; byte-fidelity proven by regenerating from git HEAD and diffing). New **`sections.json`** = per-page boolean flags (home: hero/conveyor/who/how/where/upcoming/testimonials/bigButtons/inquiry; advertisers: hero/labelPromo/whyAdvertise/adForm; distributors: hero/whyDistribute/whoCanDistribute/distForm), wired into the 3 page components with the old `showTestimonials` idiom (that const is gone; `showLabelDemo` on advertisers is separate and untouched). Refactor proven output-identical: all 6 HTML pages byte-identical modulo asset names, CSS byte-identical.
- **Editor app at `Marva/website/editor/`** (Express, own package.json): `npm start` → **http://localhost:5599** (binds 127.0.0.1), auto-spawns astro dev :4321 (kills the tree on exit; `MARVA_NO_DEV=1` skips, `MARVA_DATA_DIR` overrides target). API: GET /api/state|status|devlogs, PUT /api/content/:locale + /api/sections with root-key-set validation + atomic tmp+rename writes. UI = vanilla no-build terminal design (tokens: bg #0B0C0C, fg #EDEEE8, phosphor-sage accent #A8C77E state-only; Cascadia/Consolas + **Miriam Fixed** for Hebrew fallback; bracket-token buttons, box-drawing tree, vim status bar, typewriter header). Manifest-driven forms: dir="auto" everywhere, enum selects, array add/del/reorder, bottleLabelLines fixed 3-tuple, hero h1 textarea (newline → 2-line tuple). Explicit WRITE (Ctrl+S) / REVERT(confirm) / snapshot dirty-tracking; astro HMR makes saves appear in the preview iframe instantly. Launch config `marva-editor` added to workspace `.claude/launch.json`.
- **Verified live end-to-end** (edit→WRITE→disk+rendered site, section toggle off/on, locale switch EN, array reorder, REVERT both paths, viewport presets, 42px collapsed preview strip). NOT visually verified: Hebrew-in-Miriam-Fixed aesthetics, resize drag-handle, beforeunload.
- **Gotchas (new, confirmed):** (1) **Tailwind v4 auto content-scan walks the whole git root** — sibling dirs (editor node_modules pre-gitignore, an untracked dist-pre-refactor snapshot) leaked utility classes into site CSS; fixed with `@import "tailwindcss" source("../../")` in global.css + gitignoring `website/editor/node_modules/`. Any new untracked junk under `website/app/` itself STILL pollutes the scan — keep scratch outside or gitignore it. (2) Buttons are inline-block by default: under `white-space:pre` two width-100% buttons share one unbreakable line → focus h-scrolls the container (tree bug, fixed with display:block). (3) Browser-pane screenshots hang while a cross-origin localhost iframe is live in the page (DOM tools all work; one capture succeeded with pane collapsed). Native confirm() dialogs get auto-CANCELLED by the pane — stub window.confirm to test accept paths. (4) form_input DOES dispatch real input events (dirty-tracking picked it up).
- **Open:** push to main when Nitzan says go (auto-deploys; sections.json/JSON content then drive the LIVE build); possible v2 ideas — git-status indicator in the editor, nested-key validation on /api/sections, drag-resize polish. www subdomain + template-sync items from Session 11 still open.

**Session 12b done (2026-07-16, delegate workflow) — editor v2: per-card hide, PUBLISH button, locale mirroring (commits c709b60, 126e7be; NOT pushed).**
- **Per-item hidden flag (site):** all ten object-array item types take optional `hidden:true`; renders go through `visible()` in content.ts (Header/Footer navLinks included). Market where-card's hardcoded filter → `hidden:true` in both JSONs (output proven identical). GOTCHA: Tailwind's scanner reads bare words in TS comments as class candidates — a comment containing standalone "filter" added a dead `.filter` utility to site CSS; reworded. Watch comment wording near class-like tokens.
- **Editor v2:** item-card `[x]`/`[ ]` visibility switch; structural ops (hide/add/del/reorder) mirror across he/en when arrays are length-parallel, else current-locale-only + status-bar warning. `[ PUBLISH ]` → inline confirm strip → `POST /api/publish`: stages ONLY the 3 content paths, commits "content: edits via marva-editor (…)", pushes origin main (no force, GIT_TERMINAL_PROMPT=0, 409 in-flight guard); `GET /api/publish/status` = dirty files + ahead count; `MARVA_REPO_DIR` env for tests (smoke uses a local bare origin — offline push testing works). Offline banner distinguishes editor-server-down vs astro-down; astro child auto-respawns (verified by real tree-kill, back in ~4s; 3x/5min breaker); `MARVA_ASTRO_PORT` env makes smoke deterministic (32/32). META/SEO fields carry "not visible on the page" hints (Nitzan edited meta descriptions expecting visible change — source of his "didn't work" report).
- **Nitzan used the editor live mid-session** (hid+reordered the business where-card both locales, fixed מינרליים→מינרלים in whoStatement, reworded howSteps step-2 "איך שתרצו" — his call, supersedes the "Neria verbatim stands" note for that string). His content edits left UNCOMMITTED by design — the PUBLISH button commits+pushes them when he clicks.
- **Known limitation (flag if it bites):** two simultaneous editor clients can clobber each other — a stale tab's WRITE overwrites newer disk state (full-object PUT, no etag). v3 candidate: mtime/etag check on PUT. Also `git push origin main` regardless of current branch (repo lives on main; status returns branch for a future guard).

**Session 13 done (2026-07-17, delegate workflow) — privacy-policy page + form consent gate, commit `a9bf7ee`, PUSHED + LIVE (verified on marva-water.com: /privacy + /en/privacy 200, consent checkbox + footer link in production HTML).** Two open items CLOSED by Nitzan same day, don't re-raise: **www.marva-water.com is DONE** (he added it, verified 200) and **domain mailbox = not necessary** (Gmail stays; his explicit call).
- New `/privacy` + `/en/privacy` (PrivacyPage.astro + thin route wrappers); copy lives in typed `src/data/privacy.ts` — deliberately OUTSIDE the CMS JSONs (legal text changes via reviewed git edits, not editor saves). `PageKey` widened with `'privacy'` → hreflang + locale toggle worked with zero Header/Layout changes. Footer: muted privacy link (toggle-style classes) after the locale toggle.
- All 3 forms: `required` `privacy_consent` checkbox (value=`agreed` → lands in each Web3Forms lead email as a consent record) directly above submit. Enforcement = the existing native `checkValidity()`/`reportValidity()` path in shared.ts — ZERO JS changes. Chose active-warning over disabled-submit (a11y).
- New chrome strings went into content JSONs under EXISTING roots only (`ui.consentPre`, `ui.consentLinkLabel`, `footerContent.privacyLabel`) — verified the editor round-trips unknown nested keys safely (UI PUTs the object it loaded; server `keySetDiff` validates ROOT keys against the on-disk file at save time). Caveat: the strings don't appear in the editor's form UI (not added to its manifest) — editing them is a git/chat change for now.
- Policy copy deliberately deviates from Nitzan's `privacy-policy-draft.pdf`: dropped the analytics-collection claim (site runs no analytics/tracking; states that + discloses Cloudflare/Google Fonts IP processing), softened the newsletter clause (none exists), real contact `marvawater.info@gmail.com` (draft's `hello@marva-water.com` doesn't exist), added the dual-sided "no data collected on bottle recipients" statement, named processors (Web3Forms/Gmail/Cloudflare), rights per Israel's Privacy Protection Law 5741-1981, EN page carries a "Hebrew prevails" note. **NOT lawyer-reviewed — joins the pending-lawyer templates batch.**
- Verified: build 6→8 pages (rerun independently); DOM-verified the consent gate on all 3 forms across both locales (with everything else filled, `privacy_consent` is the sole invalid field; checked → form valid); hreflang absolute pairs + cross-locale toggle on the privacy pages confirmed; HE policy page + advertisers-form screenshots captured.
- **Screenshot-capture state this session:** browser-pane screenshots hung again (the Session-6 "it works now" didn't hold). Headless-Chrome recipe still works, with new findings: fragment-URL (`#anchor`) captures render blank, `--force-prefers-reduced-motion` also produced blanks, but a TALL viewport (e.g. `--window-size=1280,3200`) renders below-fold sections fine (GSAP scroll reveals fire for in-viewport elements under virtual time; only the Motion-spring hero + who-cascade stay mid-animation, as already known).
- Push (auto-deploys) left for Nitzan's explicit go, as always.

**Cookie-consent banner: evaluated and deliberately SKIPPED (2026-07-17, Nitzan agreed) — do not add one.** The site is verified cookieless (no Set-Cookie from Cloudflare or Google Fonts, no document.cookie/localStorage anywhere in site JS, no analytics/pixels/embeds), Israel has no banner law, and the policy's "מידע טכני ועוגיות" section already discloses the true state. Re-open ONLY if the site gains analytics/marketing pixels (policy must be amended FIRST — it promises no analytics), third-party embeds (YouTube/Maps/IG), or real EU targeting. Cloudflare Web Analytics is the pre-vetted cookieless option if traffic numbers are ever wanted (still needs the policy edit).

**Session 14 done (2026-07-22) — label-unroll demo on the advertisers page (commits c6fbc9e → 669602e, PUSHED + LIVE on marva-water.com/advertisers, deploy verified; note: curl the live site with -L — Pages 308-redirects /advertisers to /advertisers/).** New `MarvaLabel.astro`: GSAP ScrollTrigger pin (`center center`, `+=600`, `scrub:1`) unrolls the real bottle label at true 210:42 print proportions inside the "כל התווית — הבמה שלכם" section, under the 3 option cards, no header (his placement call). v1 was a 3-equal-panel brand showcase on the homepage; his review re-specced it via a /grilling session into an advertiser SPACE demo — homepage placement + `sections.home.labelShowcase` key fully removed again.
- **BUSINESS DECISION (grill-confirmed 2026-07-22): the demo claims ~50% of the label as client space** — zones mark 9% / client 50% / mandatory 41%, derived by measuring Nitzan's uploaded Emek HaMaayanot 500ml label print (the CURRENT supplier label; chat-pasted image, not on disk) and compressing every regulatory piece rightward at true footprint. **Open risk he accepted knowingly: the brand-book artboards' supplier-verified Mei Eden split gives the client only ~24% (50mm/210)** — the 50% story assumes Neria approves a custom re-layout (same open item as Session 2). If supplier says no, the demo overpromises ~2×; revisit ZONES + CSS widths in MarvaLabel.astro.
- Other grill decisions: mandatory panel = REAL pieces at true sizes (trilingual minerals table HCO₃ 293 … pH 7.8, פיקדון 30 אג׳ box, PETE/recyclable/tidyman SVGs, kosher, 500 מ״ל, producer, storage fine print); left = ringed transparent-bg mark ON white label paper; same animation all screen sizes, proportions sacred, illegible-at-phone-scale fine ("they can zoom", `text-size-adjust:none` set so mobile browsers don't inflate it).
- Center text + aria are the CMS keys `labelPromo.brandZonePlaceholder` (now "המותג שלכם כאן"/"Your brand here") + `labelPromo.ariaLabel` (rewritten) — shared with the still-dormant `showLabelDemo` SVG mockup, passed in as props from AdvertisersPage. Reduced-motion/no-JS = strip renders pre-unrolled (sides' static CSS positions ARE the end state; only the animation tucks them via `fromTo`).
- **Geometry that took two attempts (keep for future edits):** zones tile [0,9][9,59][59,100]; sides start tucked exactly `xPercent ±100` behind the client zone's edges, and the whole `.marva-label-track` glides `xPercent 16→0` concurrently so the lone client card starts viewport-centered AND the finished strip ends viewport-centered (bottle-rotation feel). First attempt anchored the client zone at left-25% ("centered") — end state overlapped the mandatory panel 16% under it; caught by DOM-measuring the end state, not by eye.
- **Scoped-`<style>` correction:** the Session-7 hard rule "Astro scoped style blocks silently don't apply in this project" did NOT reproduce — MarvaLabel's scoped block verifiably applies (computed styles confirmed). Don't rewrite working scoped CSS to utilities out of fear; the old failure was likely something else.
- **Browser-pane verification gotchas (new, confirmed):** with the pane hidden, rAF never fires → GSAP ticker/ScrollTrigger freeze (scrub stuck at stale progress) AND `setTimeout` throttles to ~1s (tick-loops blow the 30s tool timeout). Reliable headless recipe: `scrollTo → ScrollTrigger.update() → trigger.getTween().progress(1)` — fully synchronous scrub verification. Also: a page loaded while the pane is collapsed (width 0) poisons pin measurements (inline `width:0` locked on the pinned element) — force-reload once the viewport is sane; a synthetic same-size `resize` event does NOT trigger ST refresh. Vite-dev module singletons are importable in-page via their `performance.getEntriesByType('resource')` URL (same instance as the bundle — `ST.getAll()` works).
- **v4 SUPERSEDES v3 (commit 669602e): pixel-MEASURED from the real supplier print.** Nitzan saved `brand-book/שבלונה ואלי.pdf` (823.94×136.06 pt) and deleted the artboards (superseded). Pipeline that worked: WinRT PDF render via PowerShell (`Windows.Data.Pdf` + DataReader stream copy — `System.IO.WindowsRuntime` Add-Type FAILS on this machine; pure-ASCII .ps1 only, Hebrew in a PS 5.1 script file breaks parsing) → 7500×1239 raster → programmatic edge/color detection (GetPixel darkest/modal in rects; beware window-edge artifacts — a bound reported AT the search-window limit is pollution). Measured truth: zones left 30 / blank-middle 41.7 / right 28.3; table 18.83–29.27% × 4.52–72.96%; deposit box 83.71–92% (light-blue gradient fill) with BLACK recycling marks under it; source col 72–83%; logo circle ~7.4% dia; trailing ~8% seam margin at the right end. Ink `#2A3443` (single ink everywhere), bands `#ACD2E6` on Ca/Mg/Na/F, table body has a subtle top→bottom blue wash. בד"ץ + מיוצר בישראל emblems + recycle marks = REAL CROPS from the scan at `website/app/public/label/*.png` (don't redraw). Verification loop: headless capture of `?label-static` → PowerShell strip-locate/crop → stacked composite vs scan → Read compare.
- **Two CSS traps found (reusable):** (1) em offsets on an element that sets its own `font-size` resolve against THAT size — geometry must use a dedicated `--u` var (`calc(strip/100)`), never em, on font-sized positioned elements. (2) A `min(92vw,…)`-wide flex child inside the section's `max-w-6xl px-6` column gets FLEX-SHRUNK while `font-size: calc(92vw/100)` keeps the unshrunk value → all em geometry silently scales (was ×16/15). Fix: stage is `container-type: inline-size` and `--strip-w: min(92cqw, 1200px)` — cqw = actual available width, width ≡ 100×--u at every viewport.
- **v3 story (superseded by v4 above, kept for history — commit 9db160e): the demo became a FAITHFUL REPLICA of the printed label, not a re-layout.** Nitzan rejected v2's compressed-right arrangement — the requirement is "resemble the PNG as much as possible, elements PERFECTLY in their printed locations". Zones measured from the scan: left cluster 30.5% (logo circle + black registration block at corner + best-before/storage/kosher+stamp column + trilingual minerals table), the label's own BLANK MIDDLE 42% (= the ad zone, carries the CMS placeholder), right cluster 27.5% (recycling icons | deposit 30 אג׳ + תכולה 500 מ״ל + producer fine print | source-declaration block, RTL-rightmost). Print-blue `--lbl-blue #1E6EB4`, `--font-body`, strip aspect 1663:262 per the scan. The 50%-claim discussion is moot — the demo now shows the label's real blank middle (~42%) as-is. Tuck = exactly xPercent ±100 (clusters adjacent to middle); track glide −1.5%→0. **`?label-static` query param renders the strip pre-unrolled with no pin — the QA hook for headless screenshot verification (capture → PowerShell System.Drawing crop → Read → compare vs the scan; loop until it matches). Chat-pasted PNGs still aren't on disk — the scan lives only in-conversation; if pixel-perfect tuning is ever needed, have Nitzan save the label PNG into the repo.** Known approximations (acceptable, flagged to him): kosher stamp simplified (double-ring oval), recyclable roundel is arc-text not the hand graphic, tidyman stylized, web fonts ≠ print typeface.

Related: [[reference-rules-files]].


