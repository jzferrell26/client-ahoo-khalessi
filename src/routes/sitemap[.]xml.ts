import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/content/blog";

// TODO: switch BASE_URL to the live custom domain once published.
const BASE_URL = "https://ctcequity.com";

type Entry = { path: string; lastmod?: string; changefreq?: string; priority?: string };

const DEFAULT_LASTMOD = "2026-06-01";

const STATIC: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/heloc", changefreq: "monthly", priority: "0.9" },
  { path: "/fixed-second-mortgage", changefreq: "monthly", priority: "0.9" },
  { path: "/dscr-loans", changefreq: "monthly", priority: "0.9" },
  { path: "/bank-statement-loans", changefreq: "monthly", priority: "0.8" },
  { path: "/pnl-loans", changefreq: "monthly", priority: "0.7" },
  { path: "/reverse-mortgages", changefreq: "monthly", priority: "0.7" },
  { path: "/commercial-loans", changefreq: "monthly", priority: "0.7" },
  { path: "/fha-loans", changefreq: "monthly", priority: "0.6" },
  { path: "/va-loans", changefreq: "monthly", priority: "0.6" },
  { path: "/conventional-loans", changefreq: "monthly", priority: "0.6" },
  { path: "/mortgage-analyzer", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [
          ...STATIC,
          ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly", priority: "0.7" })),
        ];
        const urls = entries
          .map((e) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <lastmod>${e.lastmod ?? DEFAULT_LASTMOD}</lastmod>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          urls,
          "</urlset>",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});