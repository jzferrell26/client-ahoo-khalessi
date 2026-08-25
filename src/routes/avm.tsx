import { createFileRoute } from "@tanstack/react-router";
import { HomeValueForm } from "@/components/site/HomeValueForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Your Free Virtual Appraisal Report | CTC Equity";
const DESC =
  "Scan-to-request landing page for the CTC Equity mailer. Enter the code from your letter and get a free virtual appraisal (AVM) report for your property.";

/**
 * /avm — the MAILER + QR campaign landing page.
 *
 * Deliberately separate from /free-home-value-report:
 *   • /free-home-value-report is the ORGANIC page. It ranks in Google for
 *     "free home value report" and must not be touched or competed with.
 *   • /avm is the CAMPAIGN page the printed QR code points at. It carries the
 *     per-recipient mailer code (notice number) so an inbound scan can be tied
 *     back to the exact person the piece was mailed to.
 *
 * It is marked noindex,follow so it never competes with the organic page in
 * search while still passing link equity through its internal links.
 */
export const Route = createFileRoute("/avm")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      // Campaign landing page: keep it out of the index so it cannot cannibalise
      // /free-home-value-report, which already ranks organically.
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/avm" }],
  }),
  component: AvmPage,
});

function AvmPage() {
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
            <span className="eyebrow on-dark">You scanned it · Now claim your report</span>
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
              Get a copy of your complimentary virtual appraisal report
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
              You received a letter from CTC Equity because your property may have built significant
              equity. Enter the code from that letter below and we'll send you a current virtual
              appraisal (AVM) for your address, at no cost and with no obligation.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
              {[
                "See your estimated property value and available equity",
                "Access up to $400K without touching your first mortgage",
                "No appraisal required in many cases — funds in as little as 5 days",
              ].map((d) => (
                <div key={d} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--tiffany)", fontWeight: 700, fontSize: "1.1rem" }}>
                    ✓
                  </span>
                  <p style={{ color: "rgba(255,255,255,.92)", lineHeight: 1.5 }}>{d}</p>
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: 28,
                color: "rgba(255,255,255,.92)",
                fontSize: ".95rem",
                lineHeight: 1.6,
              }}
            >
              Prefer to talk it through? Call or text{" "}
              <a href="tel:+18772270477" style={{ color: "var(--tiffany-soft)", fontWeight: 700 }}>
                (877) 227-0477
              </a>
              .
            </p>
          </div>

          <div id="get-report">
            <HomeValueForm source="AVM Report Request — Mailer QR" noticeNumber />
          </div>
        </div>
      </header>

      <WhatHappensNext />

      <SiteFooter />
    </div>
  );
}

function WhatHappensNext() {
  const STEPS: { n: string; t: string; d: string }[] = [
    {
      n: "01",
      t: "Enter your mailer code",
      d: "The code printed on your letter pulls up the property details we already have on file, so the form takes seconds.",
    },
    {
      n: "02",
      t: "We run your valuation",
      d: "We pull a current virtual appraisal for your address and calculate the equity you may be able to access.",
    },
    {
      n: "03",
      t: "You get your numbers",
      d: "A licensed CTC Equity loan officer sends your report and walks you through the options — no pressure, no obligation.",
    },
  ];

  return (
    <section className="section">
      <div className="ctc-wrap">
        <div
          className="sec-head"
          style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <span className="eyebrow">What happens next</span>
          <h2>From mailer code to real numbers in three steps.</h2>
          <p>No full application, no cost, and no obligation to move forward.</p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 18,
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 26,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 800,
                  fontSize: "2rem",
                  color: "var(--tiffany)",
                }}
              >
                {s.n}
              </span>
              <h3
                style={{ fontFamily: "var(--display)", fontSize: "1.25rem", margin: "8px 0 8px" }}
              >
                {s.t}
              </h3>
              <p style={{ color: "#33485a", lineHeight: 1.6, fontSize: ".95rem" }}>{s.d}</p>
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
          The virtual appraisal report is a no-cost estimate for informational purposes only and is
          not an appraisal or an offer to lend. CTC Equity is a DBA of EMortgage Capital, Inc. (NMLS
          #1416824).
        </p>
      </div>
    </section>
  );
}
