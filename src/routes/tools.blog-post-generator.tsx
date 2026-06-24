import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tools/blog-post-generator")({
  head: () => ({
    meta: [
      { title: "Blog Post Generator | CTC Equity (internal)" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Page,
});

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s: string) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}
function bodyToHtml(raw: string) {
  const lines = raw.split(/\n/);
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  const flushP = () => {
    if (para.length) {
      out.push("<p>" + para.join(" ") + "</p>");
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      out.push("<ul>" + list.map((li) => "<li>" + li + "</li>").join("") + "</ul>");
      list = [];
    }
  };
  lines.forEach((ln) => {
    const t = ln.trim();
    if (t === "") {
      flushP();
      flushList();
      return;
    }
    if (t.startsWith("## ")) {
      flushP();
      flushList();
      out.push("<h2>" + inline(t.slice(3)) + "</h2>");
      return;
    }
    if (t.startsWith("- ")) {
      flushP();
      list.push(inline(t.slice(2)));
      return;
    }
    para.push(inline(t));
  });
  flushP();
  flushList();
  return out.join("\n");
}

function Page() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("Ahoo Khalessi");
  const [body, setBody] = useState("");
  const [out, setOut] = useState("");

  function generate() {
    const finalTitle = title.trim() || "Untitled post";
    const finalSlug = (slug.trim() || finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    const bodyHtml = bodyToHtml(body);
    const data = {
      slug: finalSlug,
      title: finalTitle,
      description: summary,
      tag: "Home Equity",
      datePublished: new Date().toISOString().slice(0, 10),
      displayDate: date.trim() || new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      author,
      bodyHtml,
    };
    const tsModule = `// Paste this into src/content/blog.ts (add to POSTS array)
{
  slug: ${JSON.stringify(data.slug)},
  title: ${JSON.stringify(data.title)},
  description: ${JSON.stringify(data.description)},
  tag: ${JSON.stringify(data.tag)},
  datePublished: ${JSON.stringify(data.datePublished)},
  displayDate: ${JSON.stringify(data.displayDate)},
  body: [
    // Hand-translate the HTML below into the structured body array,
    // or paste raw paragraphs and headings as { type: "p" } / { type: "h2" } items.
  ],
}

/* Rendered HTML preview:

${data.bodyHtml}

*/`;
    setOut(tsModule);
  }

  function copyOut() {
    if (out && typeof navigator !== "undefined") void navigator.clipboard.writeText(out);
  }
  function downloadOut() {
    if (typeof window === "undefined") return;
    const blob = new Blob([out], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "post"}.ts`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ background: "var(--sand)", minHeight: "100vh" }}>
      <header className="hero-grad" style={{ position: "relative", padding: "40px 0" }}>
        <div className="ctc-wrap-narrow">
          <span className="eyebrow on-dark">Internal tool · CTC Equity</span>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "10px 0 8px" }}>
            Blog Post Generator
          </h1>
          <p style={{ color: "var(--muted-on-dark)", maxWidth: "46em" }}>
            Draft a post, click Generate, and copy the TypeScript module to paste into{" "}
            <code>src/content/blog.ts</code>. Use <code>## Heading</code> and <code>- bullet</code>{" "}
            in the body; blank lines split paragraphs.
          </p>
        </div>
      </header>
      <main style={{ padding: "34px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 26 }}>
            <FormRow>
              <FormField label="Post title">
                <input value={title} onChange={(e) => setTitle(e.target.value)} style={inp} placeholder="How a fixed second mortgage works" />
              </FormField>
            </FormRow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <FormField label="URL slug" hint="letters, numbers, hyphens">
                <input value={slug} onChange={(e) => setSlug(e.target.value)} style={inp} placeholder="fixed-second-mortgage-explained" />
              </FormField>
              <FormField label="Display date">
                <input value={date} onChange={(e) => setDate(e.target.value)} style={inp} placeholder="June 2026" />
              </FormField>
            </div>
            <FormField label="One-line summary" hint="shows under the title + used by search/AI">
              <input value={summary} onChange={(e) => setSummary(e.target.value)} style={inp} />
            </FormField>
            <FormField label="Author">
              <input value={author} onChange={(e) => setAuthor(e.target.value)} style={inp} />
            </FormField>
            <FormField label="Body">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{ ...inp, minHeight: 240, fontFamily: "var(--mono)", fontSize: ".9rem", lineHeight: 1.5 }}
                placeholder={"Short answer first...\n\n## A section heading\n\nA paragraph explaining it.\n\n- a bullet\n- another bullet"}
              />
            </FormField>
            <button className="btn btn-primary" type="button" onClick={generate} style={{ marginTop: 12 }}>
              Generate post module
            </button>
            {out && (
              <div style={{ marginTop: 18 }}>
                <FormField label="Generated TypeScript">
                  <textarea readOnly value={out} style={{ ...inp, minHeight: 300, background: "var(--ink)", color: "#cfe8ef", fontFamily: "var(--mono)", fontSize: ".82rem" }} />
                </FormField>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-primary" type="button" onClick={copyOut}>
                    Copy
                  </button>
                  <button className="btn btn-dark" type="button" onClick={downloadOut}>
                    Download .ts
                  </button>
                </div>
              </div>
            )}
          </div>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link to="/" style={{ color: "var(--cyan)" }}>← Back to site</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

const inp: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .85rem",
  borderRadius: 10,
  border: "1.5px solid var(--line)",
  fontFamily: "var(--body)",
  fontSize: "1rem",
  background: "#fff",
  color: "var(--ink)",
};

function FormRow({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 6 }}>{children}</div>;
}
function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 14 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: ".92rem", marginBottom: 6 }}>
        {label}{" "}
        {hint && <span style={{ fontWeight: 400, color: "var(--muted-ink)", fontSize: ".82rem" }}>· {hint}</span>}
      </label>
      {children}
    </div>
  );
}