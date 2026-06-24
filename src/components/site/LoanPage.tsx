import { Link } from "@tanstack/react-router";
import { FaqList } from "./FaqList";
import { JsonLd, faqPageSchema, serviceSchema, type FaqItem } from "./JsonLd";
import { SiteFooter } from "./SiteFooter";
import { SiteNav, APPLY_NOW_AHOO } from "./SiteNav";

export type LoanPageProps = {
  crumb: string;
  h1: string;
  lede: React.ReactNode;
  chips: { num: string; label: string }[];
  serviceName: string;
  serviceDescription: string;
  lastUpdated?: string;
  body: React.ReactNode;
  faq: FaqItem[];
  related: { to: string; label: string }[];
};

export function LoanPage(props: LoanPageProps) {
  return (
    <div>
      <SiteNav />

      <header className="hero-grad" style={{ position: "relative", padding: "72px 0 60px" }}>
        <div className="ctc-wrap-narrow">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".7rem",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--muted-on-dark)",
              marginBottom: 14,
            }}
          >
            <Link to="/" style={{ color: "var(--tiffany-soft)" }}>
              Home
            </Link>{" "}
            / {props.crumb}
          </div>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: "clamp(2rem,4.4vw,3.2rem)",
              lineHeight: 1.08,
              color: "#fff",
              marginBottom: 18,
            }}
          >
            {props.h1}
          </h1>
          <p
            style={{
              color: "var(--muted-on-dark)",
              fontSize: "1.1rem",
              maxWidth: "44em",
              lineHeight: 1.6,
            }}
          >
            {props.lede}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            {props.chips.map((c) => (
              <span
                key={c.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid var(--line-on-dark)",
                  borderRadius: 999,
                  padding: ".5rem .9rem",
                  fontFamily: "var(--mono)",
                  fontSize: ".78rem",
                  color: "#fff",
                }}
              >
                <b style={{ color: "var(--tiffany-soft)" }}>{c.num}</b>{" "}
                <span style={{ color: "var(--muted-on-dark)" }}>{c.label}</span>
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <Link to="/" hash="getstarted" className="btn btn-primary">
              Get My Options
            </Link>
            <Link to="/mortgage-analyzer" className="btn btn-ghost">
              Try the Mortgage Analyzer
            </Link>
          </div>
        </div>
      </header>

      <main style={{ padding: "60px 0 40px" }}>
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
            Reviewed by <b style={{ color: "var(--ink)" }}>Ahoo Khalessi</b>, Division Manager &
            Loan Officer, NMLS #2239510 &nbsp;·&nbsp; Last updated {props.lastUpdated ?? "June 2026"}
          </div>

          {props.body}

          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "1.6rem", marginBottom: 12 }}>
              Common questions
            </h2>
            <FaqList items={props.faq} />
          </section>

          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "1.4rem", marginBottom: 14 }}>
              Related
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {props.related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  style={{
                    background: "var(--sand)",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: ".55rem 1.1rem",
                    color: "var(--ink)",
                    fontWeight: 600,
                    fontSize: ".92rem",
                    textDecoration: "none",
                  }}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </section>

          <div
            style={{
              background: "linear-gradient(120deg,var(--cyan),var(--teal))",
              color: "#fff",
              borderRadius: 18,
              padding: 36,
              textAlign: "center",
              marginTop: 44,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--display)",
                fontSize: "1.6rem",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              Tell us your scenario. We'll find the option.
            </h2>
            <p style={{ color: "rgba(255,255,255,.88)", marginBottom: 18 }}>
              Access to 160+ lenders, nationwide and local. Real options in minutes — no full
              application to start.
            </p>
            <div
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}
            >
              <Link to="/" hash="getstarted" className="btn" style={{ background: "#fff", color: "var(--teal)" }}>
                Get My Options
              </Link>
              <a className="btn btn-ghost" href={APPLY_NOW_AHOO} target="_blank" rel="noopener">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </main>

      <JsonLd data={serviceSchema(props.serviceName, props.serviceDescription)} />
      <JsonLd data={faqPageSchema(props.faq)} />
      <SiteFooter />
    </div>
  );
}