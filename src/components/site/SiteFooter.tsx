import { Link } from "@tanstack/react-router";

const FOOTER_LINKS = [
  { to: "/heloc", label: "HELOC" },
  { to: "/million-dollar-heloc", label: "Million-Dollar HELOC" },
  { to: "/fixed-second-mortgage", label: "Fixed Second" },
  { to: "/dscr-loans", label: "DSCR" },
  { to: "/nationwide-investment-property-loans", label: "Investor Loans" },
  { to: "/bank-statement-loans", label: "Bank Statement" },
  { to: "/pnl-loans", label: "P&L" },
  { to: "/jumbo-loans", label: "Jumbo" },
  { to: "/non-qm-jumbo-loans", label: "Non-QM Jumbo" },
  { to: "/reverse-mortgages", label: "Reverse" },
  { to: "/business-purpose-bridge-loans", label: "Bridge" },
  { to: "/commercial-loans", label: "Commercial" },
  { to: "/mortgage-analyzer", label: "Analyzer" },
  { to: "/team", label: "Team" },
  { to: "/reviews", label: "Reviews" },
  { to: "/awards-accomplishments", label: "Awards" },
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
          &nbsp;·&nbsp; Serving residential borrowers through EMortgage Capital's applicable licensed footprint; based in Santa Ana, CA
        </p>
        <p style={{ marginTop: 8 }}>
          Toll-Free: <a href="tel:+18772270477" style={{ color: "var(--tiffany-soft)" }}>(877) 227-0477</a>{" "}
          &nbsp;·&nbsp; Ahoo: <a href="tel:+19498777234" style={{ color: "var(--tiffany-soft)" }}>(949) 877-7234</a>{" "}
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
          CTC Equity is a DBA of EMortgage Capital, Inc. (Company NMLS #1416824). Ahoo Khalessi,
          NMLS #2239510. Ben Mokri, NMLS #2279528. Bobby Khalessi, NMLS #1901225. Susan O'Donovan,
          NMLS #2302891. Dong-Jin Kim, NMLS #2615439. For the states in which EMortgage Capital is
          currently licensed, see{" "}
          <a
            href="https://www.emortgagecapital.com/licensing-and-disclosures"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--tiffany-soft)" }}
          >
            EMC's Licensing and Disclosures
          </a>
          . Eligible DSCR, commercial, investment-property, bridge and business-purpose financing may be available nationwide through participating lenders; residential consumer lending remains subject to applicable licensing. This is not a commitment to lend. All loans subject to credit approval, lender
          guidelines, and property qualification. Rates and program availability vary and are
          subject to change. Verify licensing at{" "}
          <a
            href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/1416824"
            target="_blank"
            rel="noopener noreferrer"
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
