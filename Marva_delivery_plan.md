# Marva — Build & Delivery Plan

*A brand book, landing page, document templates, and social presence for a bottle-advertising company — built with AI tooling, on a ~$300/month budget, by someone learning as they go.*

---

## 0. Read this first: scope reality

From Neria's material, the model is clearer than "brokerage." **Marva produces mineral water where the bottle label *is* the ad space, and gives the bottles away free to the public** to create exposure for whoever's on the label. Marva earns per deal when a client signs up for a batch. The bottles themselves come from established Israeli manufacturers (the Mei Eden and Ein Gedi templates Neria sent are real supplier print specs) — so the manufacturer is a **supplier**, not a customer, and not a website audience.

There are two *customer* types, and they're the axis the whole site turns on:

- **מפרסם — Advertiser:** a brand that wants pure exposure (logo, coupon, slogan, QR/discount code) on bottles distributed widely. They typically want Marva to handle distribution across high-traffic points.
- **משווק — Publisher / Distributor:** a business (café, gym, hotel, event, retail chain) that wants to *hand out* branded bottles to its own customers as a value-add / gimmick. They typically take supply of the bottles and distribute them themselves.

This maps exactly onto the two delivery options already in your order form: **Option 1 (Marva supplies bottles to the client, client distributes)** = the publisher path; **Option 2 (Marva distributes on the client's behalf at strategic points)** = the advertiser path. The website, the pitch, and the order form all need to respect that split.

That model shapes every deliverable — especially the website (a **B2B lead/order site**, not a shopping cart) and the contracts (they must license the advertiser's logo, per §5).

**The stack (settled):**

| Tool | Role in *this* project |
|---|---|
| Claude Code | Writing, editing, and debugging the website code (primary build assistant) |
| Astro + Tailwind CSS | Website framework + styling (RTL Hebrew) |
| Cloudflare Pages | Hosting the live site (free, commercial use OK) |
| Base44 | Fallback no-code builder if a deadline gets tight |
| Recraft | Logo — generates true editable **SVG** vectors (the sage-leaf mark); ~$10–20/mo, commercial rights on paid tier |
| Figma | Free — clean up the Recraft SVG + set the Hebrew wordmark (מרווה in Rubik); assemble the final lockup |
| Nano Banana (Gemini image) | IG graphics, label/bottle mockups, quick concept exploration |
| Rubik + Assistant (Google Fonts) | Type system — free, strong Hebrew |
| Green Invoice / EZcount | Israeli tax invoices (חשבונית מס) via SHAAM — issued by Neria at signing (see §4b) |
| Canva (optional) | Brand-book layout + IG post templates |

**Deliberately not used:** LangGraph, LangSmith, and Hugging Face. Those are AI-agent / ML tooling — they belong to your *portfolio-research agent* track, not this one. Leaving them out is the single biggest time-saver here: this is a **web + design + docs** project, not an **AI-agent** project.

**One caution on the logo tools:** never let AI render the Hebrew. Generate only the *mark* in Recraft/Nano Banana; set מרווה yourself in Rubik in Figma — AI models mangle Hebrew glyphs, and the human cleanup step is also what strengthens your ownership of the mark (see §5).

---

## 1. What "production level" means for each deliverable

Set the bar concretely so you know when you're done.

**Brand book** — A single PDF (10–20 pages) that any designer or developer could pick up and reproduce the brand correctly without asking you a question. Not just "a logo" — a *system*.

**Website** — A live, responsive, fast, **Hebrew / RTL** landing page on Marva's own domain, over HTTPS, with working analytics and a working order-form flow (see §4b). "Similar framework to freewater.io" should mean *similar structure and UX patterns* (hero → how it works → social proof → CTA), **not a copy of their code or design** (see §5). Note this is a right-to-left Hebrew site — that's a real build consideration (fonts, layout mirroring, form fields), not an afterthought.

**Two audiences, one site:** the site speaks to both the **מפרסם (advertiser)** and the **משווק (publisher/distributor)** — *not* the manufacturer. Neria's site copy already has the two pitches written ("כמפרסם" and "כמשווק" sections). Don't blend them into one generic page: use a shared hero + "how it works," then a fork — "למפרסמים" / "למשווקים" — each with its own benefits (his copy maps straight onto these) and each leading into the same order form, pre-tagged with which path the visitor came from. A single blended pitch reads as vague to both.

**Templates** — Reusable, branded, fill-in-the-blank documents (Quote, NDA, and the ones you're missing — see below), consistent with the brand book.

**Social** — An Instagram profile with a coherent grid, a set of reusable post/story templates, and a bank of hooks/captions — production means "someone could run this account for a month from what you built."

---

## 2. Two stack options

Both fit the budget and both are legitimate. Pick based on how much you want to *learn coding* vs. *ship fast*.

### Option A — No-code-first (fastest, least technical)

> **Best if:** you want a production site live in ~1–2 weeks and care more about the *business outcome* than about writing code this round.

- **Site build:** Base44 (describe the site in prompts, it generates full-stack)
- **Payments:** deal-signing + invoicing flow (see §4b/§6 — no online checkout in v1)
- **Hosting/domain:** handled inside Base44 (custom domain on Builder tier)
- **Brand assets:** Nano Banana + Canva for the brand book and IG templates
- **Docs:** Google Docs / Canva Docs from the brand, exported to PDF

**Pros:** Fastest path; hosting, SSL, and database are handled for you; low chance of breaking things.
**Cons:** Credit system can burn fast when you re-prompt the same fix repeatedly; backend/database is locked to Base44 (frontend code exports to GitHub, backend does not) — so migrating later means rebuilding the backend. Fine for a landing page; a real constraint if the site grows into a full app.

### Option B — Code-first / true vibe-coding (more control, more learning)

> **Best if:** you want the reps in real code, full ownership of the codebase, and no vendor lock-in.

- **Framework:** **Astro** (ideal for a fast, mostly-static marketing site) or **Next.js** (if you want a heavier app later)
- **Styling:** Tailwind CSS
- **Build assistant:** Claude Code *or* Codex (pick one as your daily driver — running both in parallel just doubles the subscription)
- **Payments:** none online in v1 — the site collects a "request a proposal" lead, the deal is signed, then invoiced (see §4b for why this isn't a Stripe-only decision in Israel)
- **Hosting:** **Cloudflare Pages** (free tier allows commercial use) or **Netlify**; use **Vercel Pro** only if you specifically want its DX and can spend the $20/mo
- **Domain:** any registrar (Cloudflare, Namecheap)
- **Brand assets / IG:** same as Option A

**Pros:** You own 100% of the code; no credit anxiety; the closest thing to "getting production-level done while learning." Astro sites are extremely fast and cheap to host.
**Cons:** You'll hit and have to debug real web issues (DNS, build errors, responsive breakpoints). That's the point — but it's slower for a first-timer.

**My recommendation for you:** Given you explicitly want to "mistake, learn, and get something production-level done," do **Option B with Astro + Tailwind + Claude Code, hosted on Cloudflare Pages, with an email-based order form** (no online payments in v1). Keep Base44 in your back pocket as a fallback if a deadline gets tight.

---

## 3. Cost & time estimate

### Monthly recurring (either option, USD)

| Item | Option A (no-code) | Option B (code) |
|---|---|---|
| Site builder / AI assistant | Base44 Builder ~$40 | Claude Pro or ChatGPT Plus ~$20 |
| Hosting | included in Base44 | Cloudflare Pages **$0** (or Vercel Pro $20) |
| Domain | ~$1–2 (≈$12–15/yr) | ~$1–2 (≈$12–15/yr) |
| Israeli invoicing tool (Green Invoice / EZcount, for compliant חשבונית מס) | ~$10–20/mo | ~$10–20/mo |
| Recraft (logo SVG; short-term — cancel after) | ~$10–20 | ~$10–20 |
| Figma | **$0** (free tier) | **$0** |
| Image gen (Nano Banana / Google AI) | free tier, or ~$20 | free tier, or ~$20 |
| Design tool (Canva Pro, optional) | ~$13 | ~$13 |
| Business email (Google Workspace, optional) | ~$6–7 | ~$6–7 |
| **Typical loaded total** | **~$90–110/mo** | **~$70–100/mo** |

**You are comfortably under $300/month.** Fonts (Rubik + Assistant) are free, and Recraft is a short-term cost you can drop once the logo's final. Reserve the headroom for **one-off costs**: stock photography, or a single heavier Base44 month.

### Time (part-time, learning as you go)

| Phase | Option A | Option B |
|---|---|---|
| Brand book | 4–6 days | 4–6 days |
| Website | 4–7 days | 10–18 days |
| Templates | 2–3 days | 2–3 days |
| Social kit | 2–3 days | 2–3 days |
| **To production** | **~2–3 weeks** | **~4–6 weeks** |

The brand book, templates, and social kit take about the same time either way — the fork is entirely in the website.

---

## 4. Fields to deep-dive on

### 4a. How to build a brand book (what it must cover)

Mental model: a brand book is a **rulebook that makes the brand reproducible by strangers.** Minimum sections:

1. **Logo** — primary lockup, secondary/stacked versions, icon-only mark, clear-space rules, minimum size, and an explicit "misuse" page (don't stretch, don't recolor, don't put on busy backgrounds).
2. **Color palette** — primary + secondary + neutrals, each with **HEX (web), RGB (screen), and CMYK (print)** values, plus usage ratios (e.g. "60% white, 30% brand blue, 10% accent").
3. **Typography** — heading font, body font, web-safe fallbacks, sizes/weights, and — critically — the **license** for each font (see §5).
4. **Imagery & photography style** — the *feel* of photos (bright/clean vs. moody), do's and don'ts.
5. **Iconography & graphic elements** — line style, corner radius, any patterns.
6. **Voice & tone / messaging** — how Marva talks, its tagline, 2–3 boilerplate descriptions of the business.
7. **Applications / mockups** — the brand *on the actual product*. For Marva this is **essential**: show the Marva mark on a water bottle, and show how a *client's* ad sits on the label alongside it. This is the deliverable that proves the brand works in the real business.

Because Marva's whole product is "an advertiser's design printed on a bottle label," build the brand system knowing it has to co-exist gracefully with (a) arbitrary third-party logos *and* (b) a large block of mandatory content it cannot touch.

### 4a-bis. The label constraints (from the real supplier templates — important)

Neria's Mei Eden and Ein Gedi templates are the ground truth for what a label actually allows, and they contradict one line in the current site copy:

- **Fixed dimensions.** The Mei Eden label is **210mm × 42mm**; Ein Gedi is ~**214mm × 41mm**. There are fixed margins/seam zones (e.g. ~4mm + 4mm + 7.5mm on one edge, 7.5mm on the other). Every mockup and design template must be built to these exact sizes, not a made-up rectangle.
- **A locked regulatory zone.** Roughly the right third of the label is **legally mandatory and non-removable**: natural-mineral-water declaration, the mineral composition table (calcium, nitrates, magnesium, etc.), **kosher-for-Passover certification + rabbinical logos**, deposit notice (**חייב בפיקדון 30 אג׳**), volume (500 מ״ל), barcode (e.g. 7290000688077), recycling/PET marks, "store in a cool dry place," and best-before text. None of this can be covered by an advertiser's art.
- **A defined free zone.** The advertiser's real canvas is the **background of the whole label plus the open left/center area**. That's still generous — logo, slogan, coupon code, discount barcode, image — but it is *not* "the entire label."
- **Print-spec reality.** These are **6-colour print jobs** (CMYK + a spot **Pantone 281c** + White Base + transparent), prepared by a print studio. Advertiser artwork has to be delivered as print-ready files that fit this spec — which is exactly why your order form correctly says the design template (שבלונה) is issued *after* a quote is approved.

**Action items this creates:**
1. In the brand book's **Applications** section, mock the label using the *real* template layout — show the locked zone greyed/labelled and the free zone where the ad goes. That single honest mockup will do more to sell the concept (and set client expectations) than a fantasy "anything goes" bottle.
2. **Fix the site copy.** Neria's "מה אפשר לשים על התווית? — הכל" ("what can go on the label? — anything") over-promises. Reword to something like: *"הרקע של כל התווית ואזור עיצוב מוגדר הם שלכם — לוגו, סלוגן, קופון, תמונה. פרטי החובה (כשרות, פיקדון, ברקוד, הרכב מינרלי) נשארים קבועים לפי דרישות היצרן והרגולציה."* Honest scope up front prevents an angry client at proof stage.
3. Keep a **master label template file** (one per supplier size) as the canonical artboard everyone designs into.

You don't need to *manage* the manufacturing — the supplier does the printing — but you absolutely need to *design within* these constraints, because they define the product.

### 4b. Website terms you need to understand

Learn these so you can talk to tools (and to your friend) fluently:

- **Domain / DNS** — the address, and the settings that point it at your host.
- **Hosting** — where the site's files live and get served from.
- **Static vs. dynamic / SSG** — a marketing landing page is mostly *static* (pre-built pages), which is why Astro is a great fit: fast and cheap.
- **Responsive design** — looks right on phone, tablet, desktop.
- **SSL / HTTPS** — the padlock; mandatory for a payment site (hosts give it free).
- **Hero / above the fold / CTA** — the top section, what's visible without scrolling, and the "call to action" button.
- **Conversion** — the % of visitors who take the action you want (request a deal / pay).
- **Framework / component / Tailwind** — the code scaffolding, reusable UI pieces, and the styling system.
- **Deployment / CI/CD** — pushing your code live, automatically, when you update it.
- **Payment processor** — Stripe; **Payment Link** (a hosted pay page, zero code) vs. **Checkout** vs. **Invoicing** (best for negotiated B2B deals).
- **Favicon, SEO basics, analytics** — the tab icon, being findable on Google, and measuring traffic.

**Confirmed:** it's sign-then-invoice for now — online payment gets added later, at scale. So the site's job is **capturing a structured order, not taking payment.** And you're not starting from scratch: Neria's order form (טופס הזמנה) already defines the flow and fields. The website version should mirror it:

- **Client details:** business name, ח.פ./ע.מ (company/registered-dealer number), contact name, phone, email.
- **Campaign details:** desired bottle quantity, campaign duration, requested start date.
- **Delivery method — the advertiser/publisher fork made concrete:**
  - **Option 1 – Marva supplies bottles to the client** (client's address; Marva supplies only, not responsible for distribution afterward) → the **publisher/משווק** path.
  - **Option 2 – Distribution via Marva** (number of distribution points, area, duration) → the **advertiser/מפרסם** path.
- **Order & payment terms:** the form already states the design template (שבלונה) is issued **after** Marva sends a quote and the client approves it, and that the order is subject to the signed advertising-content & IP agreement. Keep that exact sequence: **order form → quote → approval → design template released → design → proof/approval → print.**

Build this as a **web form that emails the submission to Marva** (or drops it into a simple form service / sheet) — no payment processor needed in v1. The signed order form + agreement is what makes it binding; the actual tax invoice is separate (below).

**The invoicing tool itself needs a closer look because your friend is an Israeli ("Hebrew") supplier.** Israel is mid-rollout of mandatory e-invoicing: real tax invoices (חשבונית מס) above a threshold must be cleared in real time through the Tax Authority's SHAAM system and carry an official allocation number, and that mandatory threshold is **dropping to 10,000 NIS in January 2026 and 5,000 NIS in June 2026** — squarely in the range of a bottle-advertising deal. A generic PDF from Stripe Invoicing (or from you, in a doc template) is **not** a valid tax invoice under Israeli law once a deal crosses that line; it needs the Hebrew "חשבונית מס" / "עוסק מורשה" designations and, above the threshold, a Tax-Authority allocation number. **Practical fix:** don't build the "invoice" yourself — have your friend issue it through a local Israeli invoicing tool (Green Invoice, EZcount, or iCount) that's already wired into SHAAM. Your website's document template (§5) should be the **Quote/Proposal and the Order Form**, not the legal tax invoice; the actual tax invoice comes from that compliant tool at signing time.

---

## 5. Copyright & IP cautions (the part that actually bites)

You wrote "IP addresses" — I think you mean **IP = intellectual property** (a networking IP address isn't a legal concern here). Here's what to watch:

**Fonts.** Font files are licensed, and licenses are *specific*: a "desktop" license ≠ a "webfont" license ≠ an "app-embedding" license. Downloading a random font file and shipping it on a commercial site can be infringement. **Safe path:** use **Google Fonts** (free, open-source, cleared for commercial and web use) for both the brand book and the site. If you want a premium font, buy the correct *webfont* license explicitly.

**The freewater.io "clone."** Taking *inspiration* from their structure and UX flow is fine — layout patterns and ideas aren't protectable. **Copying their actual code, design, copy, or images is not.** Write original copy, use your own colors/type/assets, and build the layout yourself (or with your AI tool). Don't scrape their site.

**AI-generated logo — the important one.** You can use AI-generated images (Recraft, Nano Banana) commercially, **but a purely AI-generated image may not be copyrightable**, which means Marva may not be able to *stop a competitor from using a near-identical logo*. For a throwaway graphic that's fine; for a **brand's core logo** it's a real weakness. The fix is baked into the chosen workflow: generate the mark in Recraft, then **meaningfully clean it up and set the Hebrew wordmark yourself in Figma** — that human authorship strengthens ownership. Use at least Recraft's paid tier (the free tier makes generations public). Also: AI can accidentally reproduce a real brand's logo — check outputs before using them.

**Client logos on the bottles (Marva-specific, don't skip).** The entire product is printing *other companies' trademarks* on bottles. Marva needs **written permission/license to use each client's marks**, plus indemnity language (the client warrants they own the logo and are allowed to advertise it). This belongs as a clause in the advertising/service agreement — see templates below.

**Stock images.** Use properly licensed sources (Unsplash license, or paid stock). Never pull images off Google Images.

**Trademark ≠ copyright.** Before your friend invests heavily in the name "Marva," do a quick trademark search in the relevant country to check nobody else holds it; consider registering it. (Copyright protects the *artwork*; trademark protects the *brand name/logo in a market*.)

> **Not legal advice.** The NDA and the advertising agreement are legal documents — AI-generated templates are a *starting draft*, not a finished contract. Have a lawyer in the relevant jurisdiction review the mark-license, liability, and indemnity terms before anyone signs. This matters more because you're based in Israel and the business/clients may sit under different law.

**Templates you'll actually need** (Neria already drafted the Order Form — the rest complete the set):
- **Order form** (client + campaign + delivery-method + signatures) — *already drafted*; just needs branding + a web version
- **Quote / proposal** (per-batch pricing) — your branded template; *not* the legal tax invoice
- **NDA** (mutual)
- **Advertising / service agreement** — the core contract, with the **advertiser trademark-license + indemnity clause** (the order form already references this "הסכם אישור שימוש בתוכן פרסומי וקניין רוחני" — so it must actually exist)
- **Design template / master label artboard** — one print-ready template per supplier size (Mei Eden 210×42mm, Ein Gedi ~214×41mm) with the locked regulatory zone marked, released to the client after quote approval
- *(Not a template you build: the actual חשבונית מס tax invoice, which should come from a SHAAM-connected tool like Green Invoice/EZcount at signing — see §4b)*

---

## 6. Step-by-step plan with dependency gates

Each phase has an **infrastructure gate** — something that must be settled before the next phase can start. Don't skip gates; that's where beginners get stuck.

### Phase 0 — Decisions & accounts *(before anything)*
- Confirm with the friend: payment model (invoice vs. instant checkout), legal jurisdiction, final business name.
- **Gate:** Business name locked + quick trademark check done → *nothing visual should be produced before the name is final, or you'll redo the logo.*

### Phase 1 — Brand book
- **Logo:** generate the sage-leaf *mark* in Recraft (SVG) → clean up + set the Hebrew wordmark (מרווה in Rubik) in Figma → export SVG + PNG. Lock colors + fonts (Rubik + Assistant), write voice/tagline, and produce **label mockups using the real supplier artboards** (locked zone marked, free zone shown). Assemble the PDF.
- **Gate:** Brand book approved by the friend → *the website, the order form, and the label design template all pull colors, fonts, and logo from here. Building the site first means restyling it twice.*

### Phase 2 — Domain & hosting setup
- Buy the domain; set up the host (Cloudflare Pages / Base44); confirm HTTPS works on a placeholder page.
- **Gate:** Domain resolves over HTTPS → *you can't deploy or test the site on a domain that isn't live and secure.*

### Phase 3 — Website build
- Build the shared Hebrew/RTL hero + "how it works," then the **"למפרסמים" (advertiser) / "למשווקים" (publisher)** fork using Neria's existing copy, each leading into the order form. Style from the brand book; make it responsive; wire analytics.
- **Gate:** Site works on mobile + desktop, renders correctly RTL, and passes a real content review → *don't wire the order form to a broken page.*

### Phase 4 — Order form & invoicing tool setup
- Build the web order form mirroring טופס הזמנה (client details, campaign details, the two delivery options, terms), emailing submissions to Marva — no payment processor in v1. Separately, set your friend up on a SHAAM-connected Israeli invoicing tool (Green Invoice/EZcount) for issuing real חשבונית מס tax invoices once deals are signed.
- **Gate:** A test order submission arrives correctly, and the invoicing tool is confirmed working → *this is the revenue path; test it before launch, not after.*

### Phase 5 — Templates
- Brand the existing order form; build Quote, NDA, the advertising/IP agreement (with mark-license clause), and the master label artboards. Send the contracts for legal review.
- **Gate:** Contracts reviewed → *don't let the friend sign a client using an unreviewed agreement — especially since the order form already references it.*

### Phase 6 — Social kit & launch
- Set up the IG profile, build the grid + reusable post/story templates + a hook/caption bank, then go live.
- **Gate:** Launch checklist (analytics live, payments tested, contracts ready, IG populated) → done.

---

## 7. Confirmed answers & what Neria's files changed

1. **Payment model:** sign-then-invoice; online payment deferred until scale. → Site captures an order, not a payment (§4b).
2. **Business name:** final and trademark-checked. → Brand book (Phase 1) can start immediately.
3. **Label constraints:** the supplier templates (Mei Eden / Ein Gedi) define fixed sizes, a locked regulatory zone, and a 6-colour print spec. → Mockups and the design template must be built to the real artboards; the site copy's "anything on the label" needs correcting (§4a-bis).
4. **Two audiences = מפרסם (advertiser) + משווק (publisher/distributor)**, *not* manufacturer — matching the two delivery options in the order form. → Site forks "למפרסמים / למשווקים" (§1).
5. **Order form:** already drafted by Neria. → Web version mirrors it; the design template is released only after quote approval (§4b).
6. **The site is Hebrew / RTL.** → Factor into font choice and layout from day one.

**Still open:** which legal jurisdiction governs the contracts (Israel, presumably — confirm before the NDA/agreement go to legal review in Phase 5). And the advertising-content & IP agreement the order form already references **must actually be written**, or clients are signing against a document that doesn't exist.

---

### Bottom line
Go **Option B (Astro + Tailwind + Claude Code, Cloudflare Pages)** to maximize learning while staying production-grade, with Base44 as a fallback. The site is a **Hebrew/RTL two-audience page** — למפרסמים (advertisers) / למשווקים (publishers) — ending in the order form, not a checkout. Sequence it **brand → domain/hosting → site → order form + invoicing tool → templates → social**, respecting each gate. Budget lands around **$70–90/month**, well inside $300. The things to *not* wing: the **label constraints** (design to the real supplier artboards, fix the "anything on the label" copy), the **AI-logo ownership** question, the **advertiser-trademark license + the IP agreement the order form already references**, and issuing real tax invoices through a **SHAAM-connected tool**. Everything else is safe to learn by doing.
