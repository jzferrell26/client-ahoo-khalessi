import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/content/blog";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Blog | CTC Equity — Home Equity, DSCR & Self-Employed Financing";
const DESC =
  "Plain answers on home equity, DSCR, and self-employed financing — the same questions people ask AI, answered first.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div>
      <SiteNav />
      <header className="hero-grad" style={{ position: "relative", padding: "72px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <div style={{ fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted-on-dark)", marginBottom: 14 }}>
            <Link to="/" style={{ color: "var(--tiffany-soft)" }}>Home</Link> / Blog
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3rem)", color: "#fff", marginBottom: 18 }}>
            The CTC Equity Blog
          </h1>
          <p style={{ color: "var(--muted-on-dark)", fontSize: "1.1rem", maxWidth: "44em", lineHeight: 1.6 }}>
            Plain answers on home equity, DSCR, and self-employed financing — the same questions
            people ask AI, answered first. New posts are written to be found and cited.
          </p>
        </div>
      </header>
      <main style={{ padding: "60px 0" }}>
        <div className="ctc-wrap-narrow" style={{ display: "grid", gap: 18 }}>
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 26,
                textDecoration: "none",
                color: "var(--ink)",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--cyan)" }}>
                {p.tag} · {p.displayDate}
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "1.5rem", margin: "10px 0 8px" }}>
                {p.title}
              </h2>
              <p style={{ color: "#33485a", lineHeight: 1.6 }}>{p.description}</p>
              <span style={{ color: "var(--cyan)", fontWeight: 600, marginTop: 12, display: "inline-block" }}>
                Read article →
              </span>
            </Link>
          ))}
          {[
            { tag: "Coming soon", title: "DSCR loans explained: buy a rental with no income docs", desc: "How DSCR qualification works, what ratio you need, and why investors use it to keep buying." },
            { tag: "Coming soon", title: "Self-employed and declined? How bank statement loans work", desc: "Qualify on deposits instead of tax returns — what you need and who it's for." },
          ].map((p) => (
            <div key={p.title} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 26, opacity: 0.6 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted-ink)" }}>
                {p.tag}
              </span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "1.5rem", margin: "10px 0 8px" }}>{p.title}</h2>
              <p style={{ color: "#33485a", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}