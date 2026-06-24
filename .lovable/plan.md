## Plan: Incorporate provided robots.txt and sitemap.xml

Use the client's exact files as the source of truth for crawler rules and sitemap entries, replacing what was outlined in the prior build plan.

### robots.txt
- Write `public/robots.txt` verbatim from the upload (includes explicit allow blocks for GPTBot, OAI-SearchBot, ChatGPT-User, Perplexity, Claude, anthropic-ai, Google-Extended, Applebot(-Extended), CCBot, Googlebot, Bingbot, plus `Sitemap: https://ctcequity.com/sitemap.xml`).
- Skip the generated robots variant from the earlier plan.

### sitemap.xml
- Serve via TanStack server route at `src/routes/sitemap[.]xml.ts` (per project convention) rather than a static file, so future route/blog changes can extend it.
- Seed `BASE_URL = "https://ctcequity.com"` and `entries` from the uploaded XML (15 URLs, all `lastmod 2026-06-01`, with the exact `changefreq`/`priority` values provided).
- Blog dynamic entries: keep the single `heloc-without-refinancing` slug hard-coded for now; when the blog content module is added, swap to iterating posts.

### Rest of the build plan
Unchanged from the previously approved scope (design tokens, shared components, all route pages, llms.txt, JSON-LD, lead form → GHL webhook, Floify/Bookings CTAs, placeholders). Only the robots + sitemap pieces are replaced by the uploaded files.

### Note
The uploaded sitemap hard-codes `https://ctcequity.com` — this overrides the "no project URL yet, use empty BASE_URL" default. If you'd rather keep it env-driven until DNS is live, say so and I'll switch to `BASE_URL = ""`.
