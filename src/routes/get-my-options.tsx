import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Get My Options | Compare Mortgage Options — CTC Equity";
const DESC =
  "Tell us your situation and get real mortgage options across 160+ lenders — HELOCs, fixed seconds, DSCR, bank statement and self-employed loans. No cost, no obligation.";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does “get my options” actually mean?",
    a: "You tell us the property and what you are trying to do. We compare your scenario across our lender network and come back with the specific programs you qualify for, with real numbers, instead of a single rate quote from a single bank.",
  },
  {
    q: "Do I have to refinance my first mortgage?",
    a: "No. Most homeowners who come to us want to keep the low first mortgage they already have. A HELOC or a fixed second mortgage lets you access your equity while leaving your first mortgage completely untouched.",
  },
  {
    q: "Can I get options if I am self-employed?",
    a: "Yes. Self-employed borrowers are one of our specialties. Bank statement loans, profit and loss (P&L) loans, and 1099 income loans all qualify you on real deposits and business income rather than tax-return income alone.",
  },
  {
    q: "Does asking for options affect my credit score?",
    a: "Reviewing your options does not require a hard credit pull. We can walk through programs and estimated numbers first, and only move to a full application once you decide something is worth pursuing.",
  },
  {
    q: "How long does it take?",
    a: "The form takes about 60 seconds. A licensed loan officer typically comes back the same or next business day with your options. On equity products, funds can be available in as little as 5 days.",
  },
];

/**
 * /get-my-options — the general-inquiry intake page.
 *
 * Deliberately SEPARATE from /avm (the mailer/QR valuation request). This page is
 * for a borrower who wants to compare loan programs; /avm is for a borrower who
 * wants a property valuation. They post to two different GHL webhooks via
 * /api/lead (lead_kind: "get_my_options" vs "avm_report_request") so the two lead
 * types land in their own pipelines.
 *
 * Unlike /avm this page IS indexable — it adds a new topical surface rather than
 * competing with an existing one.
 */
export const Route = createFileRoute("/get-my-options")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/get-my-options" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: GetMyOptionsPage,
});

function GetMyOptionsPage() {
  return (
    <div>
      <SiteNav />

      <header className="hero-grad" style={{ position: "relative", padding: "64px 0 72px" }}>
        <div
          className="ctc-wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr .95fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow on-dark">160+ lenders · One conversation</span>
            <h1
              style={{
                fontFamily: "var(--display)",
                fontWeight: 700,
                fontSize: "clamp(2.2rem,4.6vw,3.4rem)",
                lineHeight: 1.06,
                letterSpacing: "-.015em",
                margin: "16px 0 0",
                color: "#fff",
              }}
            >
              Get my options
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--muted-on-dark)",
                marginTop: 20,
                maxWidth: "32em",
                lineHeight: 1.6,
              }}
            >
              Tell us the property and what you are trying to accomplish. We will shop your scenario
              across our lender network and come back with the programs you actually qualify for,
              not one rate from one bank.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
              {[
                "Keep your low first mortgage — tap equity with a HELOC or fixed second",
                "Self-employed? Qualify on bank statements, P&L, or 1099 income",
                "Investors welcome — DSCR, bridge, fix & flip, and commercial",
              ].map((d) => (
                <div key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--tiffany)", fontWeight: 700, fontSize: "1.1rem" }}>
                    ✓
                  </span>
                  <p style={{ color: "rgba(255,255,255,.92)", lineHeight: 1.5 }}>{d}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 30 }}>
              {["No cost", "No obligation", "60-second form", "Licensed coast to coast"].map(
                (p) => (
                  <span
                    key={p}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: ".72rem",
                      letterSpacing: ".06em",
                      padding: ".4rem .8rem",
                      borderRadius: 999,
                      border: "1px solid var(--line-on-dark)",
                      color: "var(--bright)",
                      fontWeight: 600,
                    }}
                  >
                    {p}
                  </span>
                ),
              )}
            </div>
          </div>

          <div id="options-form">
            <LeadForm source="Website — Get My Options Page" />
          </div>
        </div>
      </header>

      <Faq />

      <SiteFooter />
    </div>
  );
}

function Faq() {
  return (
    <section className="section">
      <div className="ctc-wrap">
        <div
          className="sec-head"
          style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <span className="eyebrow">Common questions</span>
          <h2>What people ask before they send this form.</h2>
        </div>
        <div style={{ display: "grid", gap: 14, maxWidth: "52em", marginInline: "auto" }}>
          {FAQS.map((f) => (
            <div
              key={f.q}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <h3 style={{ fontFamily: "var(--display)", fontSize: "1.12rem", marginBottom: 8 }}>
                {f.q}
              </h3>
              <p style={{ color: "#33485a", lineHeight: 1.65, fontSize: ".95rem" }}>{f.a}</p>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            color: "var(--muted-ink)",
            fontSize: ".82rem",
            marginTop: 28,
            maxWidth: "44em",
            marginInline: "auto",
            lineHeight: 1.6,
          }}
        >
          Program availability depends on credit, income, property type, and state. CTC Equity is a
          DBA of EMortgage Capital, Inc. (NMLS #1416824).
        </p>
      </div>
    </section>
  );
}
