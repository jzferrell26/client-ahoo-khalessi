
## Goal

Convert the CTC Equity HTML prototypes into a TanStack Start app: homepage, all loan pages, FAQ, blog, mortgage analyzer, internal tools, plus the AI-discoverability (GEO) layer — robots.txt, llms.txt, sitemap, schema.

## Design system

Tokens added to `src/styles.css` (oklch with hex source-of-truth in comments):
- `--ink` #0e2a3d · `--navy` #163a52 · `--cyan` #1789b4 · `--teal` #0c5e79 · `--bright` #29b6d8 · `--tiffany` #0abab5 · `--tiffany-soft` #81d8d0 · `--sand` #f5f2ec.
- Mapped to shadcn `--background/--foreground/--primary/--accent/--muted/--border` so existing UI components inherit brand.
- Fonts via `<link>` in `__root.tsx`: Playfair Display (display), Archivo (body), IBM Plex Mono (data/eyebrows).
- Utility classes (`.eyebrow`, `.btn-primary/.btn-ghost/.btn-dark`, `.wrap`, `.sec-head`, hero gradient + horizon hairline, `.sand`/`.dark` sections, `.reveal` IntersectionObserver fade-in) added once in `src/styles.css`.

## Shared components (`src/components/site/`)

- `SiteNav`, `SiteFooter` (NAP block: CTC Equity / 3750 S Susan St, Santa Ana, CA 92704 / (949) 877-7234 / akhalessi@ctcequity.com; EMC NMLS #1416824 + Ahoo NMLS #2239510 disclosures; `[LICENSED STATES]` placeholder; sameAs links).
- `Hero`, `Section`, `SolutionCard`, `Stat`, `PillRow`, `AuthorByline` (Ahoo, NMLS #2239510, "Last updated" date), `FAQ` (`<details>` accordion + JSON-LD emitter), `LoanPageTemplate` (BLUF + highlights + FAQ + CTA — used for every loan route).
- `LeadForm` — keeps the prototype's exact markup and field names (`first`, `last`, `phone`, `email`, `goal`, `consent`, hidden `source`, hidden `consent_language`, computed `submitted_at`). On submit: `fetch(VITE_GHL_INBOUND_WEBHOOK_URL, ...)` per Jonathan's Option A spec, fire-and-forget, then swap to the thank-you state. Webhook URL read from `import.meta.env.VITE_GHL_INBOUND_WEBHOOK_URL` (set later as a Lovable secret). If unset, logs to console + still shows success UI so the form is never broken in preview.
- External CTAs as constants: `APPLY_NOW_AHOO = https://akhalessi.floify.com/apply-now`, `APPLY_NOW_BEN = https://benmokri.floify.com/apply-now`, plus Microsoft Bookings URLs (placeholders until provided).
- `JsonLd` helper + factories: `organizationSchema`, `localBusinessSchema` (Santa Ana coords), `personSchema('ahoo'|'ben')`, `financialServiceSchema`, `serviceSchema(name, desc, url)`, `faqPageSchema(qa[])`, `articleSchema(post)`.

## Route map (`src/routes/`)

Pages (each with unique `head()` — title, description, og:title, og:description, canonical; og:image only at leaves with hero art):

Public marketing:
- `index.tsx` — full homepage port.
- `heloc.tsx`, `fixed-second-mortgage.tsx`, `dscr-loans.tsx`, `bank-statement-loans.tsx`, `pnl-loans.tsx`, `reverse-mortgages.tsx`, `commercial-loans.tsx`, `fha-loans.tsx`, `va-loans.tsx`, `conventional-loans.tsx` — all use `LoanPageTemplate`; copy ported verbatim from each provided HTML, with FAQPage + Service + Person JSON-LD.
- `faq.tsx` — port `faq.html`, FAQPage JSON-LD spanning every Q&A.
- `mortgage-analyzer.tsx` — port `mortgage-analyzer.html` (client-side calculator, no backend; logic preserved verbatim).
- `blog.index.tsx` — index from `blog.html`.
- `blog.$slug.tsx` — dynamic post route; posts stored as TS modules in `src/content/blog/` (start with `heloc-without-refinancing.ts` from the provided file). Loader resolves slug, throws `notFound()` otherwise. Article + Person JSON-LD.
- Local SEO pages (reuse `LoanPageTemplate` + LocalBusiness schema, kept for follow-up turn): `orange-county-mortgage-broker.tsx`, `irvine-mortgage-broker.tsx`, `santa-ana-mortgage-broker.tsx`, `california-heloc.tsx`, `california-dscr-loans.tsx`.

Internal tools (no nav links, visible only via direct URL):
- `tools.blog-post-generator.tsx` — port the prompt-template generator (client-side only, copy-to-clipboard).
- `tools.ai-setup-checklist.tsx` — port the launch checklist as a static page.
- `tools.form-to-ghl.tsx` — port the GHL wiring handoff doc so Ahoo/Jonathan can reference it after launch.

## AI-discoverability layer

Static files under `public/`:
- `public/robots.txt` — allow GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot, Bingbot, plus default `Allow: /`; reference `Sitemap: https://ctcequity.com/sitemap.xml`.
- `public/llms.txt` — ship the provided content verbatim (with the typo on the Blog line fixed: missing `)`).

Server routes under `src/routes/api/public/`:
- `sitemap[.]xml.ts` — emits sitemap from a central `siteRoutes` constant (single source of truth for nav, footer, and sitemap).

Root JSON-LD (in `__root.tsx`):
- Organization / FinancialService with `areaServed: "United States"`, `hasMap` placeholder, `sameAs` placeholders for Zillow/Google/Experience.com.
- LocalBusiness with Santa Ana geo coordinates.
- Person schema for Ahoo (and Ben once details supplied).

Per-page JSON-LD rendered via `<script type="application/ld+json" dangerouslySetInnerHTML>` inside the route component (not `head()`).

## Lead-flow wiring

- LeadForm → GHL inbound webhook (Option A from Jonathan's spec). Webhook URL pulled from `VITE_GHL_INBOUND_WEBHOOK_URL`; placeholder + console log when missing. Consent text + timestamp + source captured exactly as the spec requires.
- "Apply Now" CTAs → Floify URLs (Ahoo / Ben) — already live.
- "Book an appointment" CTAs → Microsoft Bookings (placeholders until user provides URLs).
- Reviews widgets (Zillow / Google / Experience.com): empty containers with TODO comments; embed script paste-in is a follow-up task.

## Placeholders preserved verbatim (per "do not publish placeholder live" rule)

`[LICENSED STATES]`, `[AHOO ZILLOW PROFILE URL]`, `[confirm year]` on Scotsman Guide card, `[Ahoo Microsoft Bookings URL]`, `[Ben Microsoft Bookings URL]`, EMC logo slot — each marked with a code comment listing the file + line so Ahoo can swap in real values without a content audit.

## Out of scope this build (called out for follow-up)

- Lovable Cloud (not needed — form posts straight to GHL webhook, no DB).
- Real review-widget embeds, EMC logo asset, calendar booking URLs, finalized licensed-states list, EMC compliance-approved TCPA wording.
- Sitemap submission to Bing/Google (operational, not a code task).

## Build order (commits)

1. Design tokens, fonts, shared layout (`SiteNav`, `SiteFooter`, JSON-LD helpers), `LoanPageTemplate`, `LeadForm`.
2. Homepage end-to-end.
3. Priority loan pages: HELOC, Fixed Second, DSCR, Bank Statement.
4. Remaining loan pages: P&L, Reverse, Commercial, FHA, VA, Conventional.
5. FAQ + Mortgage Analyzer + Blog index + first post + dynamic slug route.
6. Internal tools pages (`/tools/*`).
7. `robots.txt`, `llms.txt`, sitemap server route, root JSON-LD, local SEO pages.

## Technical notes

- File-based routing with dot-separated filenames (`tools.blog-post-generator.tsx`, `blog.$slug.tsx`); strings in `createFileRoute("...")` use slashes.
- No `useEffect`/`fetch` for content — blog posts and route metadata are static TS in `src/content/`.
- All color references go through CSS variables — no hardcoded hex in JSX.
- `LoanPageTemplate` is data-driven (`{ title, bluf, highlights[], faq[], serviceSchema, lastUpdated }`) so adding the local SEO pages is a one-file-each task.
