import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import ctcLogo from "@/assets/ctc-logo.png.asset.json";
import emcLogo from "@/assets/emc-logo.png.asset.json";

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
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
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
          <span className="ctc-topbar-extra">
            <b style={{ color: "#fff" }}>Ahoo:</b>{" "}
            <a href="tel:+19498777234" style={{ color: "var(--tiffany-soft)" }}>(949) 877-7234</a>
          </span>
          <span className="ctc-topbar-extra">
            <b style={{ color: "#fff" }}>Ben:</b>{" "}
            <a href="tel:+19498892993" style={{ color: "var(--tiffany-soft)" }}>(949) 889-2993</a>
          </span>
          {/* Kept visible at all widths: the DBA line is compliance-relevant co-branding. */}
          <span style={{ marginLeft: "auto" }}>
            A DBA of{" "}
            <a
              href="https://www.emortgagecapital.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--tiffany-soft)" }}
            >
              EMortgage Capital, Inc.
            </a>{" "}
            · NMLS #1416824
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
          <a
            href={APPLY_NOW_AHOO}
            target="_blank"
            rel="noopener"
            onClick={closeMenu}
            aria-label="Apply now with CTC Equity, a DBA of EMortgage Capital Inc."
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
              <img
                src={ctcLogo.url}
                alt=""
                className="ctc-logo-img"
                style={{ height: 38, width: "auto", objectFit: "contain", display: "block" }}
              />
              <img
                src={emcLogo.url}
                alt=""
                className="emc-logo-img"
                style={{ height: 34, width: "auto", objectFit: "contain", display: "block" }}
              />
            </span>

            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: ".56rem",
                letterSpacing: ".08em",
                color: "var(--bright)",
                marginTop: 4,
                lineHeight: 1.2,
              }}
            >
              CTC Equity is a DBA of EMortgage Capital Inc.
            </span>
          </a>

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
          <div className="btn-row-inline" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <a
              className="btn btn-ghost ctc-nav-apply"
              href={APPLY_NOW_AHOO}
              target="_blank"
              rel="noopener"
              style={{ padding: ".55rem 1.1rem" }}
            >
              Apply Now
            </a>
            <Link
              to="/"
              hash="getstarted"
              onClick={closeMenu}
              className="btn btn-primary ctc-nav-apply"
              style={{ padding: ".55rem 1.1rem" }}
            >
              Get My Options
            </Link>
            <button
              type="button"
              className="ctc-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              style={{
                background: "transparent",
                border: "1px solid var(--line-on-dark)",
                color: "#fff",
                width: 44,
                height: 44,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span aria-hidden="true" style={{ display: "block", position: "relative", width: 20, height: 14 }}>
                <span style={menuBar(open ? "top-open" : "top")} />
                <span style={menuBar(open ? "mid-open" : "mid")} />
                <span style={menuBar(open ? "bot-open" : "bot")} />
              </span>
            </button>
          </div>
        </div>
        {open && (
          <div
            style={{
              background: "var(--ink)",
              borderTop: "1px solid var(--line-on-dark)",
              padding: "14px 18px 22px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 8px",
                    borderBottom: "1px solid var(--line-on-dark)",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <a
                className="btn btn-ghost"
                href={APPLY_NOW_AHOO}
                target="_blank"
                rel="noopener"
                onClick={closeMenu}
                style={{ justifyContent: "center" }}
              >
                Apply Now
              </a>
              <Link
                to="/"
                hash="getstarted"
                onClick={closeMenu}
                className="btn btn-primary"
                style={{ justifyContent: "center" }}
              >
                Get My Options
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function menuBar(state: string): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    left: 0,
    height: 2,
    width: "100%",
    background: "#fff",
    borderRadius: 2,
    transition: "transform .2s ease, opacity .2s ease, top .2s ease",
  };
  switch (state) {
    case "top": return { ...base, top: 0 };
    case "mid": return { ...base, top: 6 };
    case "bot": return { ...base, top: 12 };
    case "top-open": return { ...base, top: 6, transform: "rotate(45deg)" };
    case "mid-open": return { ...base, top: 6, opacity: 0 };
    case "bot-open": return { ...base, top: 6, transform: "rotate(-45deg)" };
    default: return base;
  }
}