import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = [
  { to: "/heloc", label: "HELOC" },
  { to: "/fixed-second-mortgage", label: "Fixed Second" },
  { to: "/dscr-loans", label: "DSCR" },
  { to: "/bank-statement-loans", label: "Bank Statement" },
  { to: "/pnl-loans", label: "P&L" },
  { to: "/reverse-mortgages", label: "Reverse" },
  { to: "/commercial-loans", label: "Commercial" },
  { to: "/mortgage-analyzer", label: "Analyzer" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/privacy", label: "Privacy & SMS" },
  { to: "/terms", label: "Terms & SMS" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--muted-on-dark)",
        padding: "48px 0 40px",
        fontSize: ".88rem",
        marginTop: 48,
      }}
    >
      <div className="ctc-wrap">
        <p>
          <b style={{ color: "#fff", fontFamily: "var(--display)", fontSize: "1.1rem" }}>CTC Equity</b>{" "}
          &nbsp;·&nbsp; A DBA of{" "}
          <a
            href="https://www.emortgagecapital.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--tiffany-soft)" }}
          >
            EMortgage Capital, Inc.
          </a>{" "}
          &nbsp;·&nbsp; Nationwide lending, based in Orange County, CA
        </p>
        <p style={{ marginTop: 8 }}>
          <a href="tel:+19498777234" style={{ color: "var(--tiffany-soft)" }}>(949) 877-7234</a>{" "}
          &nbsp;·&nbsp;{" "}
          <a href="mailto:akhalessi@ctcequity.com" style={{ color: "var(--tiffany-soft)" }}>
            akhalessi@ctcequity.com
          </a>{" "}
          &nbsp;·&nbsp; 3750 S Susan St, Santa Ana, CA 92704
        </p>
        <p style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
          {FOOTER_LINKS.map((l, i) => (
            <span key={l.to}>
              <Link to={l.to} style={{ color: "var(--tiffany-soft)", textDecoration: "none" }}>
                {l.label}
              </Link>
              {i < FOOTER_LINKS.length - 1 && <span style={{ opacity: 0.5 }}> · </span>}
            </span>
          ))}
        </p>
        <div
          style={{
            fontSize: ".72rem",
            color: "rgba(233,242,247,.5)",
            marginTop: 18,
            borderTop: "1px solid var(--line-on-dark)",
            paddingTop: 14,
            lineHeight: 1.6,
          }}
        >
          <div style={{ marginBottom: 6 }}>
            ⌂ Equal Housing Lender &nbsp;·&nbsp; EMC Company NMLS #1416824
          </div>
          {/* TODO before launch: replace [LICENSED STATES] with EMC's actual license footprint. */}
          CTC Equity is a DBA of EMortgage Capital, Inc. (Company NMLS #1416824). Ahoo Khalessi,
          NMLS #2239510. Ben Mokri, NMLS #2279528. Licensed in:{" "}
          [LICENSED STATES — insert actual EMC license footprint before launch]. This is not a
          commitment to lend. All loans subject to credit approval, lender guidelines, and property
          qualification. Rates and program availability vary and are subject to change. Verify
          licensing at{" "}
          <a
            href="https://www.nmlsconsumeraccess.org"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--tiffany-soft)" }}
          >
            nmlsconsumeraccess.org
          </a>
          .
          <div style={{ marginTop: 10 }}>© {year} CTC Equity. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}