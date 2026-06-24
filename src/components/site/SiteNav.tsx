import { Link } from "@tanstack/react-router";

const NAV_LINKS: { to: string; label: string }[] = [
  { to: "/heloc", label: "HELOC" },
  { to: "/fixed-second-mortgage", label: "Fixed Second" },
  { to: "/dscr-loans", label: "DSCR" },
  { to: "/bank-statement-loans", label: "Self-Employed" },
  { to: "/mortgage-analyzer", label: "Analyzer" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

export const APPLY_NOW_AHOO = "https://akhalessi.floify.com/apply-now";

export function SiteNav() {
  return (
    <>
      <div
        style={{
          background: "var(--ink)",
          color: "rgba(233,242,247,.8)",
          fontFamily: "var(--mono)",
          fontSize: ".74rem",
          letterSpacing: ".06em",
          borderBottom: "1px solid var(--line-on-dark)",
        }}
      >
        <div className="ctc-wrap" style={{ display: "flex", gap: "22px", flexWrap: "wrap", padding: "8px 24px" }}>
          <span>
            <b style={{ color: "#fff" }}>Toll-Free:</b>{" "}
            <a href="tel:+18772270477" style={{ color: "var(--tiffany-soft)" }}>(877) 227-0477</a>
          </span>
          <span>
            <b style={{ color: "#fff" }}>Ahoo:</b>{" "}
            <a href="tel:+19498777234" style={{ color: "var(--tiffany-soft)" }}>(949) 877-7234</a>
          </span>
          <span>
            <b style={{ color: "#fff" }}>Ben:</b>{" "}
            <a href="tel:+19498892993" style={{ color: "var(--tiffany-soft)" }}>(949) 889-2993</a>
          </span>
        </div>
      </div>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(14,42,61,.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--line-on-dark)",
        }}
      >
        <div
          className="ctc-wrap"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}
        >
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: ".7rem", color: "#fff", textDecoration: "none" }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 9,
                background: "linear-gradient(135deg,var(--tiffany),var(--teal))",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--display)",
                fontWeight: 800,
                color: "#fff",
                fontSize: "1.05rem",
                letterSpacing: "-.04em",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.2)",
              }}
            >
              CC
            </span>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.15rem" }}>CTC Equity</span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: ".56rem",
                  letterSpacing: ".28em",
                  color: "var(--bright)",
                  marginTop: 3,
                }}
              >
                COAST TO COAST EQUITY
              </span>
            </span>
          </Link>
          <div
            style={{ display: "flex", alignItems: "center", gap: "1.4rem" }}
            className="ctc-nav-links"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ color: "rgba(233,242,247,.72)", fontSize: ".92rem", fontWeight: 500, textDecoration: "none" }}
                activeProps={{ style: { color: "#fff" } }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <a
              className="btn btn-ghost"
              href={APPLY_NOW_AHOO}
              target="_blank"
              rel="noopener"
              style={{ padding: ".55rem 1.1rem" }}
            >
              Apply Now
            </a>
            <Link to="/" hash="getstarted" className="btn btn-primary" style={{ padding: ".55rem 1.1rem" }}>
              Get My Options
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}