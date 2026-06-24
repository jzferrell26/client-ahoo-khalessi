import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/content/blog";
import { JsonLd, articleSchema } from "@/components/site/JsonLd";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article not found | CTC Equity" }] };
    return {
      meta: [
        { title: `${post.title} | CTC Equity` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `https://ctcequity.com/blog/${post.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div style={{ padding: 60, textAlign: "center" }}>
      <h1>Article not found</h1>
      <p>
        <Link to="/blog">Back to blog</Link>
      </p>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  return (
    <div>
      <SiteNav />
      <header className="hero-grad" style={{ position: "relative", padding: "72px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <div style={{ fontFamily: "var(--mono)", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted-on-dark)", marginBottom: 14 }}>
            <Link to="/" style={{ color: "var(--tiffany-soft)" }}>Home</Link>{" / "}
            <Link to="/blog" style={{ color: "var(--tiffany-soft)" }}>Blog</Link>{" / Article"}
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3rem)", color: "#fff", marginBottom: 18 }}>
            {post.title}
          </h1>
          <p style={{ color: "var(--muted-on-dark)", fontSize: "1.1rem", maxWidth: "44em", lineHeight: 1.6 }}>
            {post.description}
          </p>
        </div>
      </header>
      <main style={{ padding: "60px 0" }}>
        <div className="ctc-wrap-narrow">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".78rem",
              color: "var(--muted-ink)",
              borderBottom: "1px solid var(--line)",
              paddingBottom: 16,
              marginBottom: 28,
            }}
          >
            By <b style={{ color: "var(--ink)" }}>Ahoo Khalessi</b>, Division Manager & Loan
            Officer, NMLS #2239510 &nbsp;·&nbsp; {post.displayDate}
          </div>
          <article style={{ color: "#33485a", lineHeight: 1.75, fontSize: "1.05rem" }}>
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: "1.5rem",
                      color: "var(--ink)",
                      margin: "28px 0 12px",
                    }}
                  >
                    {block.content as string}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} style={{ marginBottom: 16, paddingLeft: "1.2rem" }}>
                    {(block.content as string[]).map((li, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  style={{ marginBottom: 16 }}
                  dangerouslySetInnerHTML={{ __html: block.content as string }}
                />
              );
            })}
          </article>
          <div
            style={{
              background: "linear-gradient(120deg,var(--cyan),var(--teal))",
              color: "#fff",
              borderRadius: 16,
              padding: 34,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: 10 }}>
              See what your equity can do
            </h2>
            <p style={{ marginBottom: 18 }}>No-appraisal options up to $400K — up to $4M — 160+ lenders.</p>
            <Link to="/" hash="getstarted" className="btn" style={{ background: "#fff", color: "var(--teal)" }}>
              Get My Options
            </Link>
          </div>
        </div>
      </main>
      <JsonLd data={articleSchema(post)} />
      <SiteFooter />
    </div>
  );
}