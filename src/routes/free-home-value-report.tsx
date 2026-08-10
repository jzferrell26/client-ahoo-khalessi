import { createFileRoute } from "@tanstack/react-router";
import { HomeValueForm } from "@/components/site/HomeValueForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

const TITLE = "Free Home Value Report | CTC Equity";
const DESC =
  "Get a free, no-obligation virtual home value report from CTC Equity. See what your home is worth today and how much equity you can access — no appraisal, no cost.";

export const Route = createFileRoute("/free-home-value-report")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "Free Home Value Report | CTC Equity" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ctcequity.com/free-home-value-report" }],
  }),
  component: FreeHomeValueReportPage,
});

function FreeHomeValueReportPage() {
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
            <span className="eyebrow on-dark">Free · No obligation · No appraisal needed</span>
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
              Get a free virtual home value report from CTC Equity — a current estimate of your
              home's value and how much equity you may be able to access, without refinancing your
              first mortgage. It takes about 60 seconds and there's no cost or obligation.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
              {[
                "See your estimated home value and available equity",
                "Learn what you could access — up to $400K with no appraisal",
                "Prepared by a real team, licensed coast to coast",
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
              {["No cost", "No appraisal", "No obligation", "60-second form"].map((p) => (
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
              ))}
            </div>
          </div>

          <div id="get-report">
            <HomeValueForm />
          </div>
        </div>
      </header>

      <HowItWorks />

      <SiteFooter />
    </div>
  );
}

function HowItWorks() {
  const STEPS: { n: string; t: string; d: string }[] = [
    {
      n: "01",
      t: "Tell us about your property",
      d: "Enter your name, contact info, and the address of the home you want valued. That's the whole form.",
    },
    {
      n: "02",
      t: "We prepare your report",
      d: "We pull a current virtual valuation for your address and estimate the equity you may be able to tap.",
    },
    {
      n: "03",
      t: "You get your numbers",
      d: "Ahoo or a CTC Equity team member sends your free report and walks you through your options — no pressure.",
    },
  ];

  return (
    <section className="section">
      <div className="ctc-wrap">
        <div
          className="sec-head"
          style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          <span className="eyebrow">How it works</span>
          <h2>From address to answers in three simple steps.</h2>
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
          The home value report is a no-cost estimate for informational purposes only and is not an
          appraisal or an offer to lend. CTC Equity is a DBA of EMortgage Capital, Inc. (NMLS
          #1416824).
        </p>
      </div>
    </section>
  );
}
